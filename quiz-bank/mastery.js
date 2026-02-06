/**
 * Mastery Tracking System
 * The Nursing Collective — Quiz Bank
 *
 * Tracks per-topic mastery via localStorage.
 * Points are earned by completing question SETS (10 or 20).
 * Points only go UP — never lose previously earned points.
 *
 * Structured for future migration to backend storage.
 */

var MasteryTracker = (function () {
    'use strict';

    var STORAGE_KEY = 'nursingCollective_mastery';
    var STREAK_KEY = 'nursingCollective_streak';

    // Level thresholds (index = level, value = points required)
    var LEVEL_THRESHOLDS = [0, 2, 6, 12, 20, 30, 40, 50, 60, 70, 80];

    var LEVEL_NAMES = [
        'Starting',          // 0
        'Beginner',          // 1
        'Familiar',          // 2
        'Developing',        // 3
        'Competent',         // 4
        'Proficient',        // 5
        'Advanced',          // 6
        'Expert',            // 7
        'Master',            // 8
        'Elite',             // 9
        'Complete Mastery'   // 10
    ];

    // ── Storage ────────────────────────────────────────────

    function _loadAll() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            console.error('[Mastery] Failed to load data:', e);
            return {};
        }
    }

    function _saveAll(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('[Mastery] Failed to save data:', e);
        }
    }

    function _loadStreak() {
        try {
            var raw = localStorage.getItem(STREAK_KEY);
            return raw ? JSON.parse(raw) : { currentStreak: 0, lastPracticedDate: null };
        } catch (e) {
            return { currentStreak: 0, lastPracticedDate: null };
        }
    }

    function _saveStreak(streakData) {
        try {
            localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
        } catch (e) {
            console.error('[Mastery] Failed to save streak:', e);
        }
    }

    // ── Topic Data ─────────────────────────────────────────

    function _getTopicData(topicId) {
        var all = _loadAll();
        return all[topicId] || null;
    }

    function _ensureTopicData(topicId) {
        var all = _loadAll();
        if (!all[topicId]) {
            all[topicId] = {
                points: 0,
                level: 0,
                totalQuestionsAnswered: 0,
                totalCorrect: 0,
                setsCompleted: 0,
                questionHistory: {},
                lastPracticed: null
            };
            _saveAll(all);
        }
        return all[topicId];
    }

    // ── Level Calculation ──────────────────────────────────

    function _calculateLevel(points) {
        var level = 0;
        for (var i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (points >= LEVEL_THRESHOLDS[i]) {
                level = i;
                break;
            }
        }
        return level;
    }

    function _pointsForLevel(level) {
        if (level < 0 || level >= LEVEL_THRESHOLDS.length) return 0;
        return LEVEL_THRESHOLDS[level];
    }

    function _pointsToNextLevel(points) {
        var currentLevel = _calculateLevel(points);
        if (currentLevel >= 10) return 0;
        return LEVEL_THRESHOLDS[currentLevel + 1] - points;
    }

    // ── Set Scoring ────────────────────────────────────────

    function _calculateSetPoints(correctCount, totalCount) {
        if (totalCount === 0) return 0;
        var pct = (correctCount / totalCount) * 100;
        if (pct >= 90) return 3;
        if (pct >= 80) return 2;
        if (pct >= 70) return 1;
        return 0;
    }

    // ── Streak ─────────────────────────────────────────────

    function _todayString() {
        return new Date().toISOString().split('T')[0];
    }

    function _updateStreak() {
        var streakData = _loadStreak();
        var today = _todayString();

        if (streakData.lastPracticedDate === today) {
            // Already practiced today, no change
            return streakData.currentStreak;
        }

        // Check if yesterday was the last practice day
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yesterdayStr = yesterday.toISOString().split('T')[0];

        if (streakData.lastPracticedDate === yesterdayStr) {
            streakData.currentStreak++;
        } else {
            // Streak broken — start fresh
            streakData.currentStreak = 1;
        }

        streakData.lastPracticedDate = today;
        _saveStreak(streakData);
        return streakData.currentStreak;
    }

    // ── Question Selection ─────────────────────────────────

    /**
     * Select questions for a set based on repetition rules:
     * 1. Within a set: NEVER repeat
     * 2. Prioritize unseen questions first
     * 3. Then questions student got WRONG
     * 4. Then cycle all in shuffled order
     */
    function selectQuestions(allQuestions, topicId, setSize) {
        var topicData = _getTopicData(topicId) || { questionHistory: {} };
        var history = topicData.questionHistory || {};

        // Categorize questions
        var unseen = [];
        var seenWrong = [];
        var seenCorrect = [];

        allQuestions.forEach(function (q) {
            var h = history[q.id];
            if (!h || !h.seen) {
                unseen.push(q);
            } else if (h.lastResult !== 'correct') {
                seenWrong.push(q);
            } else {
                seenCorrect.push(q);
            }
        });

        // Shuffle each pool
        _shuffleArray(unseen);
        _shuffleArray(seenWrong);
        _shuffleArray(seenCorrect);

        // Build set: unseen first, then wrong, then correct
        var selected = [];
        var pools = [unseen, seenWrong, seenCorrect];

        for (var p = 0; p < pools.length && selected.length < setSize; p++) {
            for (var i = 0; i < pools[p].length && selected.length < setSize; i++) {
                selected.push(pools[p][i]);
            }
        }

        // Final shuffle so it's not predictable
        _shuffleArray(selected);
        return selected;
    }

    // ── Record Set Results ─────────────────────────────────

    /**
     * Record a completed set. Returns result object:
     * { pointsEarned, newPoints, oldLevel, newLevel, leveledUp, levelName, streak }
     */
    function recordSetResult(topicId, results) {
        var all = _loadAll();
        if (!all[topicId]) {
            all[topicId] = {
                points: 0,
                level: 0,
                totalQuestionsAnswered: 0,
                totalCorrect: 0,
                setsCompleted: 0,
                questionHistory: {},
                lastPracticed: null
            };
        }
        var topic = all[topicId];
        var oldLevel = topic.level;

        // Count correct
        var correctCount = 0;
        var totalCount = results.length;

        results.forEach(function (r) {
            topic.totalQuestionsAnswered++;
            if (r.correct) {
                topic.totalCorrect++;
                correctCount++;
            }

            // Update question history
            if (!topic.questionHistory[r.questionId]) {
                topic.questionHistory[r.questionId] = {
                    seen: true,
                    lastResult: r.correct ? 'correct' : 'incorrect',
                    timesSeen: 1,
                    timesCorrect: r.correct ? 1 : 0
                };
            } else {
                var qh = topic.questionHistory[r.questionId];
                qh.seen = true;
                qh.lastResult = r.correct ? 'correct' : 'incorrect';
                qh.timesSeen++;
                if (r.correct) qh.timesCorrect++;
            }
        });

        // Calculate points earned from this set
        var pointsEarned = _calculateSetPoints(correctCount, totalCount);

        // Points only go UP
        topic.points += pointsEarned;
        topic.level = _calculateLevel(topic.points);
        topic.setsCompleted++;
        topic.lastPracticed = _todayString();

        _saveAll(all);

        // Update streak
        var streak = _updateStreak();

        return {
            correctCount: correctCount,
            totalCount: totalCount,
            accuracy: totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0,
            pointsEarned: pointsEarned,
            newPoints: topic.points,
            oldLevel: oldLevel,
            newLevel: topic.level,
            leveledUp: topic.level > oldLevel,
            levelName: LEVEL_NAMES[topic.level] || 'Unknown',
            streak: streak,
            pointsToNext: _pointsToNextLevel(topic.points)
        };
    }

    // ── Query Methods ──────────────────────────────────────

    function getTopicMastery(topicId) {
        var data = _getTopicData(topicId);
        if (!data) {
            return {
                points: 0,
                level: 0,
                levelName: LEVEL_NAMES[0],
                totalQuestionsAnswered: 0,
                totalCorrect: 0,
                accuracy: 0,
                setsCompleted: 0,
                lastPracticed: null,
                pointsToNext: LEVEL_THRESHOLDS[1]
            };
        }
        return {
            points: data.points,
            level: data.level,
            levelName: LEVEL_NAMES[data.level] || 'Unknown',
            totalQuestionsAnswered: data.totalQuestionsAnswered,
            totalCorrect: data.totalCorrect,
            accuracy: data.totalQuestionsAnswered > 0
                ? Math.round((data.totalCorrect / data.totalQuestionsAnswered) * 100)
                : 0,
            setsCompleted: data.setsCompleted,
            lastPracticed: data.lastPracticed,
            pointsToNext: _pointsToNextLevel(data.points)
        };
    }

    function getChapterMastery(chapterTopicIds) {
        if (!chapterTopicIds || chapterTopicIds.length === 0) {
            return { averageLevel: 0, averageLevelName: LEVEL_NAMES[0] };
        }
        var sum = 0;
        chapterTopicIds.forEach(function (topicId) {
            var m = getTopicMastery(topicId);
            sum += m.level;
        });
        var avg = sum / chapterTopicIds.length;
        var roundedAvg = Math.round(avg * 10) / 10; // 1 decimal
        var displayLevel = Math.floor(avg);
        return {
            averageLevel: roundedAvg,
            averageLevelName: LEVEL_NAMES[displayLevel] || LEVEL_NAMES[0]
        };
    }

    function getOverallStats() {
        var all = _loadAll();
        var topicIds = Object.keys(all);

        var totalAnswered = 0;
        var totalCorrect = 0;
        var totalSets = 0;
        var levelSum = 0;
        var masteredCount = 0; // Level 10
        var practicedCount = 0;
        var weakest = [];
        var strongest = [];

        topicIds.forEach(function (id) {
            var t = all[id];
            totalAnswered += t.totalQuestionsAnswered;
            totalCorrect += t.totalCorrect;
            totalSets += t.setsCompleted;
            levelSum += t.level;
            if (t.level >= 10) masteredCount++;
            if (t.setsCompleted > 0) practicedCount++;

            weakest.push({ id: id, level: t.level, points: t.points });
            strongest.push({ id: id, level: t.level, points: t.points });
        });

        // Sort weakest (lowest first) — only include topics that have been practiced
        weakest = weakest.filter(function (w) { return true; }); // include all with data
        weakest.sort(function (a, b) { return a.points - b.points; });

        // Sort strongest (highest first)
        strongest.sort(function (a, b) { return b.points - a.points; });

        var streakData = _loadStreak();

        return {
            topicsPracticed: practicedCount,
            topicsMastered: masteredCount,
            totalQuestionsAnswered: totalAnswered,
            totalCorrect: totalCorrect,
            accuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
            totalSetsCompleted: totalSets,
            averageLevel: practicedCount > 0 ? Math.round((levelSum / practicedCount) * 10) / 10 : 0,
            streak: streakData.currentStreak,
            lastPracticedDate: streakData.lastPracticedDate,
            weakestTopics: weakest.slice(0, 3),
            strongestTopics: strongest.slice(0, 3)
        };
    }

    function getChaptersInProgress() {
        var all = _loadAll();
        if (!QUIZ_BANK_REGISTRY || !QUIZ_BANK_REGISTRY.chapters) return 0;

        var chaptersStarted = 0;
        QUIZ_BANK_REGISTRY.chapters.forEach(function (chapter) {
            var hasProgress = chapter.topics.some(function (topic) {
                return all[topic.id] && all[topic.id].setsCompleted > 0;
            });
            if (hasProgress) chaptersStarted++;
        });
        return chaptersStarted;
    }

    // ── Mastery Color ──────────────────────────────────────

    function getMasteryColor(level) {
        if (level >= 9) return '#a855f7';  // Purple/gold
        if (level >= 6) return '#059669';  // Green
        if (level >= 3) return '#f59e0b';  // Yellow/amber
        return '#ef4444';                   // Red/orange
    }

    function getMasteryColorClass(level) {
        if (level >= 9) return 'mastery-gold';
        if (level >= 6) return 'mastery-green';
        if (level >= 3) return 'mastery-yellow';
        return 'mastery-red';
    }

    // ── Question Counting ──────────────────────────────────

    /**
     * Count available questions for given filters.
     * Used by the custom quiz builder.
     */
    function countAvailableQuestions(filters) {
        // This will be populated once question data files exist
        // For now, always returns 0
        if (!window.QUIZ_BANK_QUESTIONS) return 0;

        var questions = window.QUIZ_BANK_QUESTIONS;
        return questions.filter(function (q) {
            if (filters.topics && filters.topics.length > 0) {
                if (filters.topics.indexOf(q.topic) === -1) return false;
            }
            if (filters.chapters && filters.chapters.length > 0) {
                if (filters.chapters.indexOf(q.category) === -1) return false;
            }
            if (filters.difficulties && filters.difficulties.length > 0) {
                if (filters.difficulties.indexOf(q.difficulty) === -1) return false;
            }
            if (filters.types && filters.types.length > 0) {
                if (filters.types.indexOf(q.type) === -1) return false;
            }
            return true;
        }).length;
    }

    // ── Utility ────────────────────────────────────────────

    function _shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    /**
     * Look up topic label from registry
     */
    function getTopicLabel(topicId) {
        if (!QUIZ_BANK_REGISTRY || !QUIZ_BANK_REGISTRY.chapters) return topicId;
        for (var c = 0; c < QUIZ_BANK_REGISTRY.chapters.length; c++) {
            var topics = QUIZ_BANK_REGISTRY.chapters[c].topics;
            for (var t = 0; t < topics.length; t++) {
                if (topics[t].id === topicId) return topics[t].label;
            }
        }
        return topicId;
    }

    /**
     * Reset all mastery data (for testing)
     */
    function resetAll() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STREAK_KEY);
    }

    // ── Public API ─────────────────────────────────────────

    return {
        // Constants
        LEVEL_THRESHOLDS: LEVEL_THRESHOLDS,
        LEVEL_NAMES: LEVEL_NAMES,

        // Core
        selectQuestions: selectQuestions,
        recordSetResult: recordSetResult,

        // Queries
        getTopicMastery: getTopicMastery,
        getChapterMastery: getChapterMastery,
        getOverallStats: getOverallStats,
        getChaptersInProgress: getChaptersInProgress,
        getMasteryColor: getMasteryColor,
        getMasteryColorClass: getMasteryColorClass,
        getTopicLabel: getTopicLabel,
        countAvailableQuestions: countAvailableQuestions,

        // Utility
        resetAll: resetAll
    };
})();
