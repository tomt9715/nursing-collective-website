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
            var data = raw ? JSON.parse(raw) : {};
            // Version migration — add marker on first load
            if (!data._version) {
                data._version = 2;
                _saveAll(data);
            }
            return data;
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

    // ── Chapter Helpers ────────────────────────────────────

    function _getChapterForTopic(topicId) {
        if (!QUIZ_BANK_REGISTRY || !QUIZ_BANK_REGISTRY.chapters) return null;
        for (var c = 0; c < QUIZ_BANK_REGISTRY.chapters.length; c++) {
            var ch = QUIZ_BANK_REGISTRY.chapters[c];
            for (var t = 0; t < ch.topics.length; t++) {
                if (ch.topics[t].id === topicId) return ch;
            }
        }
        return null;
    }

    function _getAvailableTopics(chapter) {
        return chapter.topics.filter(function (t) { return t.file !== null; });
    }

    function _computeTopicCap(chapter) {
        var available = _getAvailableTopics(chapter);
        if (available.length === 0) return 80;
        return Math.ceil(80 / available.length);
    }

    function _computeChapterPoints(chapter) {
        var cap = _computeTopicCap(chapter);
        var available = _getAvailableTopics(chapter);
        var all = _loadAll();
        var total = 0;
        available.forEach(function (t) {
            var topicData = all[t.id];
            var raw = topicData ? (topicData.points || 0) : 0;
            total += Math.min(raw, cap);
        });
        return total;
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

        // Compute chapter state BEFORE earning points
        var chapter = _getChapterForTopic(topicId);
        var oldChapterPoints = chapter ? _computeChapterPoints(chapter) : 0;
        var oldChapterLevel = _calculateLevel(oldChapterPoints);

        // Points only go UP
        topic.points += pointsEarned;
        topic.level = _calculateLevel(topic.points);
        topic.setsCompleted++;
        topic.lastPracticed = _todayString();

        _saveAll(all);

        // Compute chapter state AFTER earning points
        var topicCap = chapter ? _computeTopicCap(chapter) : 80;
        var newChapterPoints = chapter ? _computeChapterPoints(chapter) : topic.points;
        var newChapterLevel = _calculateLevel(newChapterPoints);
        var cappedTopicPoints = Math.min(topic.points, topicCap);

        // Check if topic is at its cap (effective points earned for chapter may be 0)
        var effectiveChapterGain = newChapterPoints - oldChapterPoints;

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
            pointsToNext: _pointsToNextLevel(topic.points),

            // Chapter-level fields
            chapterId: chapter ? chapter.id : null,
            chapterLabel: chapter ? chapter.label : null,
            topicCap: topicCap,
            cappedTopicPoints: cappedTopicPoints,
            topicAtCap: cappedTopicPoints >= topicCap,
            chapterPoints: newChapterPoints,
            oldChapterLevel: oldChapterLevel,
            newChapterLevel: newChapterLevel,
            chapterLeveledUp: newChapterLevel > oldChapterLevel,
            chapterLevelName: LEVEL_NAMES[newChapterLevel] || 'Unknown',
            chapterPointsToNext: _pointsToNextLevel(newChapterPoints),
            effectiveChapterGain: effectiveChapterGain
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

    /**
     * Get chapter mastery computed from per-topic capped points.
     * Accepts a chapterId string (looks up registry) or a chapter object.
     */
    function getChapterMastery(chapterIdOrObj) {
        var chapter = typeof chapterIdOrObj === 'string'
            ? _findChapterById(chapterIdOrObj)
            : chapterIdOrObj;

        if (!chapter) {
            return {
                chapterLevel: 0, chapterLevelName: LEVEL_NAMES[0], chapterPoints: 0,
                topicCap: 80, pointsToNext: LEVEL_THRESHOLDS[1],
                topicBreakdown: [], availableCount: 0, totalCount: 0
            };
        }

        var available = _getAvailableTopics(chapter);
        var cap = _computeTopicCap(chapter);
        var all = _loadAll();
        var chapterPts = 0;
        var breakdown = [];

        available.forEach(function (t) {
            var topicData = all[t.id];
            var raw = topicData ? (topicData.points || 0) : 0;
            var capped = Math.min(raw, cap);
            chapterPts += capped;
            breakdown.push({
                topicId: t.id,
                label: t.label,
                rawPoints: raw,
                cappedPoints: capped,
                atCap: raw >= cap
            });
        });

        var level = _calculateLevel(chapterPts);
        return {
            chapterLevel: level,
            chapterLevelName: LEVEL_NAMES[level] || 'Unknown',
            chapterPoints: chapterPts,
            topicCap: cap,
            pointsToNext: _pointsToNextLevel(chapterPts),
            topicBreakdown: breakdown,
            availableCount: available.length,
            totalCount: chapter.topics.length
        };
    }

    function _findChapterById(chapterId) {
        if (!QUIZ_BANK_REGISTRY || !QUIZ_BANK_REGISTRY.chapters) return null;
        for (var i = 0; i < QUIZ_BANK_REGISTRY.chapters.length; i++) {
            if (QUIZ_BANK_REGISTRY.chapters[i].id === chapterId) return QUIZ_BANK_REGISTRY.chapters[i];
        }
        return null;
    }

    function getOverallStats() {
        var all = _loadAll();

        // Aggregate question/set stats from per-topic data
        var totalAnswered = 0;
        var totalCorrect = 0;
        var totalSets = 0;
        var topicKeys = Object.keys(all);
        topicKeys.forEach(function (id) {
            if (id === '_version') return; // skip metadata
            var t = all[id];
            if (!t || !t.totalQuestionsAnswered) return;
            totalAnswered += t.totalQuestionsAnswered;
            totalCorrect += t.totalCorrect;
            totalSets += t.setsCompleted;
        });

        // Chapter-level stats
        var chapterLevelSum = 0;
        var chaptersMastered = 0;
        var chaptersWithData = 0;
        var weakestChapters = [];
        var strongestChapters = [];

        if (QUIZ_BANK_REGISTRY && QUIZ_BANK_REGISTRY.chapters) {
            QUIZ_BANK_REGISTRY.chapters.forEach(function (ch) {
                var available = _getAvailableTopics(ch);
                if (available.length === 0) return; // skip chapters with no questions

                var cm = getChapterMastery(ch);
                chapterLevelSum += cm.chapterLevel;
                chaptersWithData++;
                if (cm.chapterLevel >= 10) chaptersMastered++;

                weakestChapters.push({ id: ch.id, label: ch.label, level: cm.chapterLevel, points: cm.chapterPoints });
                strongestChapters.push({ id: ch.id, label: ch.label, level: cm.chapterLevel, points: cm.chapterPoints });
            });
        }

        weakestChapters.sort(function (a, b) { return a.points - b.points; });
        strongestChapters.sort(function (a, b) { return b.points - a.points; });

        var streakData = _loadStreak();

        return {
            chaptersPracticed: chaptersWithData,
            chaptersMastered: chaptersMastered,
            totalQuestionsAnswered: totalAnswered,
            totalCorrect: totalCorrect,
            accuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
            totalSetsCompleted: totalSets,
            averageLevel: chaptersWithData > 0 ? Math.round((chapterLevelSum / chaptersWithData) * 10) / 10 : 0,
            streak: streakData.currentStreak,
            lastPracticedDate: streakData.lastPracticedDate,
            weakestChapters: weakestChapters.slice(0, 3),
            strongestChapters: strongestChapters.slice(0, 3)
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

    // ── Server Sync (cross-device progress) ──────────────

    var RETRY_QUEUE_KEY = 'nursingCollective_retryQueue';
    var BOOKMARKS_KEY = 'nursingCollective_bookmarks';

    function _isLoggedIn() {
        return !!localStorage.getItem('accessToken');
    }

    function _laterDate(a, b) {
        if (!a) return b;
        if (!b) return a;
        return a > b ? a : b;
    }

    function _mergeQuestionHistory(localH, remoteH) {
        var merged = {};
        var allQIds = {};
        var k;
        for (k in localH) { if (localH.hasOwnProperty(k)) allQIds[k] = true; }
        for (k in remoteH) { if (remoteH.hasOwnProperty(k)) allQIds[k] = true; }

        for (k in allQIds) {
            if (!allQIds.hasOwnProperty(k)) continue;
            var l = localH[k];
            var r = remoteH[k];
            if (!l) { merged[k] = r; continue; }
            if (!r) { merged[k] = l; continue; }
            merged[k] = {
                seen: l.seen || r.seen,
                lastResult: (l.timesSeen || 0) >= (r.timesSeen || 0) ? l.lastResult : r.lastResult,
                timesSeen: Math.max(l.timesSeen || 0, r.timesSeen || 0),
                timesCorrect: Math.max(l.timesCorrect || 0, r.timesCorrect || 0)
            };
        }
        return merged;
    }

    function _mergeRetryQueues(localRQ, remoteRQ) {
        var merged = {};
        var allScopes = {};
        var k;
        for (k in localRQ) { if (localRQ.hasOwnProperty(k)) allScopes[k] = true; }
        for (k in remoteRQ) { if (remoteRQ.hasOwnProperty(k)) allScopes[k] = true; }

        for (k in allScopes) {
            if (!allScopes.hasOwnProperty(k)) continue;
            var l = localRQ[k];
            var r = remoteRQ[k];
            if (!l) { merged[k] = r; continue; }
            if (!r) { merged[k] = l; continue; }

            var sessionCounter = Math.max(l.sessionCounter || 0, r.sessionCounter || 0);

            // Merge queue arrays by questionId
            var queueMap = {};
            var i, entry;
            var lQueue = l.queue || [];
            var rQueue = r.queue || [];
            for (i = 0; i < lQueue.length; i++) {
                entry = lQueue[i];
                queueMap[entry.questionId] = entry;
            }
            for (i = 0; i < rQueue.length; i++) {
                entry = rQueue[i];
                var existing = queueMap[entry.questionId];
                if (!existing || (entry.attempts || 0) > (existing.attempts || 0)) {
                    queueMap[entry.questionId] = entry;
                }
            }

            var mergedQueue = [];
            for (var qId in queueMap) {
                if (queueMap.hasOwnProperty(qId)) mergedQueue.push(queueMap[qId]);
            }

            merged[k] = { sessionCounter: sessionCounter, queue: mergedQueue };
        }
        return merged;
    }

    function _mergeFromServer(serverData) {
        if (!serverData) return;

        // Merge mastery data
        var local = _loadAll();
        var remote = serverData.mastery_data || {};
        var merged = {};

        var allTopics = {};
        var k;
        for (k in local) { if (local.hasOwnProperty(k) && k !== '_version') allTopics[k] = true; }
        for (k in remote) { if (remote.hasOwnProperty(k) && k !== '_version') allTopics[k] = true; }

        // Preserve version marker
        merged._version = Math.max(local._version || 1, remote._version || 1);

        for (k in allTopics) {
            if (!allTopics.hasOwnProperty(k)) continue;
            var l = local[k];
            var r = remote[k];

            if (!l) { merged[k] = r; continue; }
            if (!r) { merged[k] = l; continue; }

            // Both exist: higher values win (points only go up)
            merged[k] = {
                points: Math.max(l.points || 0, r.points || 0),
                level: 0,
                totalQuestionsAnswered: Math.max(l.totalQuestionsAnswered || 0, r.totalQuestionsAnswered || 0),
                totalCorrect: Math.max(l.totalCorrect || 0, r.totalCorrect || 0),
                setsCompleted: Math.max(l.setsCompleted || 0, r.setsCompleted || 0),
                questionHistory: _mergeQuestionHistory(l.questionHistory || {}, r.questionHistory || {}),
                lastPracticed: _laterDate(l.lastPracticed, r.lastPracticed)
            };
            merged[k].level = _calculateLevel(merged[k].points);
        }

        _saveAll(merged);

        // Merge streak
        var localStreak = _loadStreak();
        var remoteStreak = serverData.streak_data || { currentStreak: 0, lastPracticedDate: null };
        var mergedStreak = {
            currentStreak: Math.max(localStreak.currentStreak || 0, remoteStreak.currentStreak || 0),
            lastPracticedDate: _laterDate(localStreak.lastPracticedDate, remoteStreak.lastPracticedDate)
        };
        _saveStreak(mergedStreak);

        // Merge retry queue
        try {
            var localRetry = JSON.parse(localStorage.getItem(RETRY_QUEUE_KEY) || '{}');
            var remoteRetry = serverData.retry_queue || {};
            var mergedRetry = _mergeRetryQueues(localRetry, remoteRetry);
            localStorage.setItem(RETRY_QUEUE_KEY, JSON.stringify(mergedRetry));
        } catch (e) {
            console.warn('[Mastery] Failed to merge retry queue:', e);
        }

        // Merge bookmarks (union by questionId, keep earliest savedAt)
        try {
            var localBM = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
            var remoteBM = serverData.bookmarks || [];
            var bmMap = {};
            var i, bm;
            for (i = 0; i < localBM.length; i++) {
                bm = localBM[i];
                bmMap[bm.questionId] = bm;
            }
            for (i = 0; i < remoteBM.length; i++) {
                bm = remoteBM[i];
                if (!bmMap[bm.questionId]) {
                    bmMap[bm.questionId] = bm;
                }
            }
            var mergedBM = [];
            for (var qId in bmMap) {
                if (bmMap.hasOwnProperty(qId)) mergedBM.push(bmMap[qId]);
            }
            localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(mergedBM));
        } catch (e) {
            console.warn('[Mastery] Failed to merge bookmarks:', e);
        }
    }

    /**
     * Push current localStorage progress to the server (fire-and-forget).
     */
    function syncToServer() {
        if (!_isLoggedIn()) return;
        if (typeof apiCall !== 'function') return;

        var retryQueue;
        try {
            retryQueue = JSON.parse(localStorage.getItem(RETRY_QUEUE_KEY) || '{}');
        } catch (e) {
            retryQueue = {};
        }

        var bookmarks;
        try {
            bookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
        } catch (e) {
            bookmarks = [];
        }

        var payload = {
            mastery_data: _loadAll(),
            streak_data: _loadStreak(),
            retry_queue: retryQueue,
            bookmarks: bookmarks
        };

        apiCall('/api/quiz/progress', {
            method: 'PUT',
            body: JSON.stringify(payload)
        }).then(function (resp) {
            console.log('[Mastery] Synced to server at', resp.updated_at);
        }).catch(function (err) {
            console.warn('[Mastery] Server sync failed (non-blocking):', err.message);
        });
    }

    /**
     * Pull server progress and merge into localStorage.
     * Returns a Promise<boolean> — true if data was merged.
     */
    function pullFromServer() {
        if (!_isLoggedIn()) return Promise.resolve(false);
        if (typeof apiCall !== 'function') return Promise.resolve(false);

        return apiCall('/api/quiz/progress', { method: 'GET' })
            .then(function (serverData) {
                if (serverData && serverData.updated_at) {
                    _mergeFromServer(serverData);
                    // Push merged result back so server has the combined data
                    syncToServer();
                    return true;
                }
                // No server data yet — push local data up
                syncToServer();
                return false;
            })
            .catch(function (err) {
                console.warn('[Mastery] Pull from server failed:', err.message);
                return false;
            });
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
        getTopicCap: function (chapterId) {
            var ch = _findChapterById(chapterId);
            return ch ? _computeTopicCap(ch) : 80;
        },

        // Server sync
        syncToServer: syncToServer,
        pullFromServer: pullFromServer,

        // Utility
        resetAll: resetAll
    };
})();
