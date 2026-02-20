/**
 * QuizHistory — Score history & performance tracking module
 * The Nursing Collective
 *
 * localStorage-based session history (capped at 200 entries).
 * Records each completed session and provides data for charts & stats.
 * Syncs with backend when user is logged in.
 */
var QuizHistory = (function () {
    'use strict';

    var STORAGE_KEY = 'nursingCollective_quizHistory';
    var MAX_ENTRIES = 200;

    // ── Read / Write ─────────────────────────────────────

    function _load() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            var data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return [];
        }
    }

    function _save(entries) {
        try {
            // Cap at MAX_ENTRIES — keep the newest
            if (entries.length > MAX_ENTRIES) {
                entries = entries.slice(entries.length - MAX_ENTRIES);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        } catch (e) {
            // localStorage full — prune oldest half and retry
            try {
                entries = entries.slice(Math.floor(entries.length / 2));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            } catch (e2) { /* give up */ }
        }
    }

    // ── Public API ───────────────────────────────────────

    /**
     * Record a completed quiz session.
     * @param {Object} session
     * @param {string} session.topicId     — e.g. 'heart-failure'
     * @param {string} session.topicName   — e.g. 'Heart Failure'
     * @param {string} session.category    — e.g. 'Cardiovascular'
     * @param {string} session.mode        — 'practice' | 'exam'
     * @param {number} session.score       — percentage 0-100
     * @param {number} session.correct     — number of correct answers
     * @param {number} session.total       — total questions
     * @param {number} session.timeSeconds — total time in seconds
     * @param {Object} session.confidence  — { low: N, medium: N, high: N }
     */
    function recordSession(session) {
        var entries = _load();
        entries.push({
            id: _generateId(),
            topicId: session.topicId || '',
            topicName: session.topicName || '',
            category: session.category || '',
            mode: session.mode || 'practice',
            score: session.score || 0,
            correct: session.correct || 0,
            total: session.total || 0,
            timeSeconds: session.timeSeconds || 0,
            confidence: session.confidence || { low: 0, medium: 0, high: 0 },
            timestamp: Date.now()
        });
        _save(entries);

        // Attempt backend sync
        _syncToServer(entries[entries.length - 1]);
    }

    /**
     * Get session history for a specific topic.
     * @param {string} topicId
     * @param {number} [limit=10]
     * @returns {Array}
     */
    function getTopicHistory(topicId, limit) {
        limit = limit || 10;
        var entries = _load();
        return entries
            .filter(function (e) { return e.topicId === topicId; })
            .slice(-limit);
    }

    /**
     * Get all session history.
     * @param {number} [limit=50]
     * @returns {Array}
     */
    function getAllHistory(limit) {
        limit = limit || 50;
        return _load().slice(-limit);
    }

    /**
     * Get performance stats for a topic.
     * @param {string} topicId
     * @returns {Object} { attempts, avgScore, bestScore, lastScore, totalTime }
     */
    function getTopicStats(topicId) {
        var entries = _load().filter(function (e) { return e.topicId === topicId; });
        if (entries.length === 0) {
            return { attempts: 0, avgScore: 0, bestScore: 0, lastScore: 0, totalTime: 0 };
        }

        var totalScore = 0;
        var bestScore = 0;
        var totalTime = 0;
        entries.forEach(function (e) {
            totalScore += e.score;
            if (e.score > bestScore) bestScore = e.score;
            totalTime += (e.timeSeconds || 0);
        });

        return {
            attempts: entries.length,
            avgScore: Math.round(totalScore / entries.length),
            bestScore: bestScore,
            lastScore: entries[entries.length - 1].score,
            totalTime: totalTime
        };
    }

    /**
     * Render an SVG line chart of score history for a topic.
     * @param {string} topicId
     * @param {number} [limit=10]
     * @returns {string} SVG HTML string (empty string if no history)
     */
    function renderScoreChart(topicId, limit) {
        limit = limit || 10;
        var entries = getTopicHistory(topicId, limit);
        if (entries.length < 2) return '';

        var W = 320;
        var H = 120;
        var PAD = 24;
        var plotW = W - PAD * 2;
        var plotH = H - PAD * 2;
        var n = entries.length;
        var stepX = plotW / (n - 1);

        // Build path
        var points = entries.map(function (e, i) {
            var x = PAD + i * stepX;
            var y = PAD + plotH - (e.score / 100) * plotH;
            return { x: x, y: y, score: e.score };
        });

        var pathD = 'M ' + points.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');

        // Area fill
        var areaD = pathD + ' L ' + points[points.length - 1].x + ' ' + (PAD + plotH) + ' L ' + points[0].x + ' ' + (PAD + plotH) + ' Z';

        // Grid lines at 25%, 50%, 75%
        var gridLines = [25, 50, 75].map(function (pct) {
            var y = PAD + plotH - (pct / 100) * plotH;
            return '<line x1="' + PAD + '" y1="' + y + '" x2="' + (W - PAD) + '" y2="' + y + '" stroke="var(--quiz-border)" stroke-width="0.5" stroke-dasharray="3,3"/>' +
                   '<text x="' + (PAD - 4) + '" y="' + (y + 3) + '" font-size="9" fill="var(--quiz-text-light)" text-anchor="end">' + pct + '%</text>';
        }).join('');

        // Data dots
        var dots = points.map(function (p) {
            var color = p.score >= 90 ? 'var(--quiz-correct)' : p.score >= 70 ? 'var(--quiz-primary)' : 'var(--quiz-incorrect)';
            return '<circle cx="' + p.x + '" cy="' + p.y + '" r="4" fill="' + color + '" stroke="var(--quiz-card-bg)" stroke-width="2"/>';
        }).join('');

        // Score labels on first and last points
        var labelFirst = '<text x="' + points[0].x + '" y="' + (points[0].y - 8) + '" font-size="10" fill="var(--quiz-text-secondary)" text-anchor="middle" font-weight="600">' + points[0].score + '%</text>';
        var labelLast = '<text x="' + points[points.length - 1].x + '" y="' + (points[points.length - 1].y - 8) + '" font-size="10" fill="var(--quiz-text-primary)" text-anchor="middle" font-weight="700">' + points[points.length - 1].score + '%</text>';

        return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="quiz-score-chart" xmlns="http://www.w3.org/2000/svg">' +
            gridLines +
            '<defs><linearGradient id="qsc-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--quiz-primary)" stop-opacity="0.2"/><stop offset="100%" stop-color="var(--quiz-primary)" stop-opacity="0"/></linearGradient></defs>' +
            '<path d="' + areaD + '" fill="url(#qsc-grad)"/>' +
            '<path d="' + pathD + '" fill="none" stroke="var(--quiz-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            dots +
            labelFirst +
            labelLast +
            '</svg>';
    }

    /**
     * Render topic performance stats card.
     * @param {string} topicId
     * @returns {string} HTML string (empty if no history)
     */
    function renderTopicStats(topicId) {
        var stats = getTopicStats(topicId);
        if (stats.attempts === 0) return '';

        var timeStr = _formatTime(Math.round(stats.totalTime / stats.attempts));

        return '<div class="quiz-history-stats">' +
            '<div class="quiz-history-stat"><div class="quiz-history-stat-value">' + stats.attempts + '</div><div class="quiz-history-stat-label">Attempts</div></div>' +
            '<div class="quiz-history-stat"><div class="quiz-history-stat-value">' + stats.avgScore + '%</div><div class="quiz-history-stat-label">Average</div></div>' +
            '<div class="quiz-history-stat"><div class="quiz-history-stat-value">' + stats.bestScore + '%</div><div class="quiz-history-stat-label">Best</div></div>' +
            '<div class="quiz-history-stat"><div class="quiz-history-stat-value">' + timeStr + '</div><div class="quiz-history-stat-label">Avg Time</div></div>' +
            '</div>';
    }

    // ── Backend Sync ─────────────────────────────────────

    function _syncToServer(session) {
        // Only sync if user is logged in (accessToken present) and apiCall exists
        var token = localStorage.getItem('accessToken');
        if (!token || typeof window.apiCall !== 'function') return;

        try {
            window.apiCall('/api/quiz/sessions', {
                method: 'POST',
                body: JSON.stringify({
                    topic_id: session.topicId,
                    category: session.category,
                    mode: session.mode,
                    score: session.score,
                    correct_count: session.correct,
                    total_count: session.total,
                    time_seconds: session.timeSeconds,
                    confidence_breakdown: session.confidence
                })
            }).catch(function () {
                // Silently fail — local data is the source of truth
            });
        } catch (e) {
            // apiCall not available — skip
        }
    }

    /**
     * Pull server history and merge with local data.
     * Call on page load when user is logged in.
     * @param {string} topicId - optional, to pull for a specific topic
     */
    function pullFromServer(topicId) {
        var token = localStorage.getItem('accessToken');
        if (!token || typeof window.apiCall !== 'function') return;

        var url = '/api/quiz/sessions?limit=50';
        if (topicId) url += '&topic_id=' + encodeURIComponent(topicId);

        try {
            window.apiCall(url, { method: 'GET' }).then(function (data) {
                if (!data || !Array.isArray(data.sessions)) return;

                var localEntries = _load();
                var localTimestamps = new Set(localEntries.map(function (e) { return e.timestamp; }));

                data.sessions.forEach(function (s) {
                    var ts = new Date(s.created_at).getTime();
                    // Only merge entries we don't already have locally
                    if (!localTimestamps.has(ts)) {
                        localEntries.push({
                            id: s.id || _generateId(),
                            topicId: s.topic_id || '',
                            topicName: s.topic_name || '',
                            category: s.category || '',
                            mode: s.mode || 'practice',
                            score: s.score || 0,
                            correct: s.correct_count || 0,
                            total: s.total_count || 0,
                            timeSeconds: s.time_seconds || 0,
                            confidence: s.confidence_breakdown || { low: 0, medium: 0, high: 0 },
                            timestamp: ts,
                            fromServer: true
                        });
                    }
                });

                // Sort by timestamp and save
                localEntries.sort(function (a, b) { return a.timestamp - b.timestamp; });
                _save(localEntries);
            }).catch(function () { /* ignore */ });
        } catch (e) {
            // apiCall not available
        }
    }

    // ── Helpers ──────────────────────────────────────────

    function _generateId() {
        return 'qs_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    function _formatTime(totalSeconds) {
        var mins = Math.floor(totalSeconds / 60);
        var secs = totalSeconds % 60;
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // ── Expose ──────────────────────────────────────────

    return {
        recordSession: recordSession,
        getTopicHistory: getTopicHistory,
        getAllHistory: getAllHistory,
        getTopicStats: getTopicStats,
        renderScoreChart: renderScoreChart,
        renderTopicStats: renderTopicStats,
        pullFromServer: pullFromServer
    };
})();
