/**
 * Quiz Page Initialization
 * Handles access verification and QuizEngine bootstrap.
 * Adapted from guide-script.js access control pattern.
 * CSP-compliant: no inline scripts.
 */
(function () {
    'use strict';

    var PRODUCT_ID = document.body.dataset.productId || '';
    var GUIDE_NAME = document.body.dataset.guideName || '';

    var API_URL = (function () {
        var hostname = window.location.hostname;
        if (hostname === 'thenursingcollective.pro' || hostname === 'www.thenursingcollective.pro') {
            return 'https://api.thenursingcollective.pro';
        }
        return 'https://staging-backend-production-365a.up.railway.app';
    })();

    // Apply saved theme preference (or default to light)
    var savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (savedMode === 'system') {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    function getAuthToken() {
        return localStorage.getItem('accessToken');
    }

    // ── Access Denied Overlay ───────────────────────────────

    function showAccessDenied(message, showLogin) {
        var root = document.getElementById('quiz-root');
        if (root) root.innerHTML = '';

        var overlay = document.createElement('div');
        overlay.className = 'quiz-access-denied';
        overlay.innerHTML =
            '<div class="quiz-access-denied-content">' +
                '<div class="quiz-access-denied-icon"><i class="fas fa-lock"></i></div>' +
                '<h2>Access Restricted</h2>' +
                '<p class="quiz-access-denied-msg"></p>' +
                '<div class="quiz-access-denied-actions">' +
                    (showLogin ? '<a href="../../login.html?redirect=guides/' + PRODUCT_ID + '" class="quiz-btn quiz-btn--primary"><i class="fas fa-sign-in-alt"></i> Sign In</a>' : '') +
                    '<a href="../../dashboard.html" class="quiz-btn quiz-btn--secondary"><i class="fas fa-arrow-left"></i> Go to Dashboard</a>' +
                    '<a href="../../pricing.html" class="quiz-btn quiz-btn--secondary"><i class="fas fa-rocket"></i> View Plans</a>' +
                '</div>' +
            '</div>';

        // Set message text safely (avoid XSS)
        overlay.querySelector('.quiz-access-denied-msg').textContent = message;

        // Inline the overlay styles (style element, not inline attribute — CSP allows 'unsafe-inline' for styles)
        var style = document.createElement('style');
        style.textContent =
            '.quiz-access-denied{display:flex;align-items:center;justify-content:center;min-height:80vh;padding:20px;}' +
            '.quiz-access-denied-content{background:#fff;border-radius:16px;padding:48px;text-align:center;max-width:480px;box-shadow:0 10px 40px rgba(0,0,0,0.1);}' +
            '.quiz-access-denied-icon{width:80px;height:80px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;}' +
            '.quiz-access-denied-icon i{font-size:36px;color:#fff;}' +
            '.quiz-access-denied-content h2{font-family:"Outfit",sans-serif;font-size:1.75rem;color:#1f2937;margin-bottom:12px;}' +
            '.quiz-access-denied-content p{color:#6b7280;font-size:1.05rem;line-height:1.6;margin-bottom:32px;}' +
            '.quiz-access-denied-actions{display:flex;flex-direction:column;gap:12px;}';
        document.head.appendChild(style);

        document.body.appendChild(overlay);
    }

    // ── Token Refresh ───────────────────────────────────────

    function refreshAccessToken() {
        return fetch(API_URL + '/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(function (res) {
            if (!res.ok) throw new Error('Token refresh failed');
            return res.json();
        }).then(function (data) {
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('tokenTimestamp', Date.now().toString());
            return data.access_token;
        });
    }

    // ── Access Verification ─────────────────────────────────

    function verifyAccess(isRetry) {
        var token = getAuthToken();
        if (!token) {
            showAccessDenied('Please sign in to access this quiz. An active subscription is required.', true);
            return Promise.resolve(false);
        }

        return fetch(API_URL + '/api/guides/purchased', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(function (response) {
            if (response.status === 401 && !isRetry) {
                return refreshAccessToken().then(function () {
                    return verifyAccess(true);
                }).catch(function () {
                    showAccessDenied('Your session has expired. Please sign in again.', true);
                    return false;
                });
            }
            if (!response.ok) throw new Error('Failed to verify access');
            return response.json();
        }).then(function (data) {
            if (typeof data === 'boolean') return data; // Returned from retry
            var guides = data.purchased_guides || [];
            var hasAccess = data.has_premium || data.all_guides_access ||
                guides.some(function (g) { return g.product_id === PRODUCT_ID; });

            if (!hasAccess) {
                showAccessDenied('You don\'t have access to this quiz. Please subscribe to unlock all guides and quizzes.', false);
                return false;
            }
            return true;
        }).catch(function (err) {
            console.error('Access verification error:', err);
            showAccessDenied('Unable to verify your access. Please try again or contact support.', false);
            return false;
        });
    }

    // ── Error State ─────────────────────────────────────────

    function showError(message) {
        var root = document.getElementById('quiz-root');
        if (!root) return;
        root.innerHTML =
            '<div class="quiz-error">' +
                '<p><i class="fas fa-exclamation-triangle"></i> ' + message + '</p>' +
                '<a href="../' + PRODUCT_ID + '.html"><i class="fas fa-arrow-left"></i> Return to Study Guide</a>' +
            '</div>';
    }

    // ── Server Sync ──────────────────────────────────────────

    /**
     * Pull cross-device progress from the server before quiz starts.
     * Ensures mastery + quiz history reflect data from all devices.
     */
    function pullServerProgress(topicId) {
        var promises = [];

        // Pull mastery data (mastery, streak, bookmarks, retry queue, confidence)
        if (typeof MasteryTracker !== 'undefined' && typeof MasteryTracker.pullFromServer === 'function') {
            promises.push(
                MasteryTracker.pullFromServer().catch(function () { return false; })
            );
        }

        // Pull quiz session history for this topic
        if (typeof QuizHistory !== 'undefined' && typeof QuizHistory.pullFromServer === 'function') {
            try {
                QuizHistory.pullFromServer(topicId);
            } catch (e) { /* non-blocking */ }
        }

        return Promise.all(promises).catch(function () { return []; });
    }

    /**
     * Sync progress to server on page unload (best-effort).
     * Uses keepalive fetch for reliability when the page is closing.
     */
    function setupUnloadSync() {
        window.addEventListener('beforeunload', function () {
            if (typeof MasteryTracker !== 'undefined' && typeof MasteryTracker.syncToServer === 'function') {
                MasteryTracker.syncToServer();
            }
        });
    }

    // ── Initialize ──────────────────────────────────────────

    function init() {
        // Set up unload sync for all quiz modes
        setupUnloadSync();

        // ── AI Quiz Mode (skip access verification) ──────────
        if (window._aiQuizData) {
            var aiData = window._aiQuizData;
            if (!aiData.questions || !aiData.questions.length) {
                showError('No valid questions found in AI quiz data.');
                return;
            }
            // Pool rotation: split questions into rounds
            var perRound = aiData.questionsPerRound || aiData.questions.length;
            var currentRound = parseInt(sessionStorage.getItem('aiQuizRound') || '0', 10);
            var allQuestions = aiData.questions;
            var roundStart = currentRound * perRound;
            var roundQuestions = allQuestions.slice(roundStart, roundStart + perRound);
            // If we've run out of pools, wrap back to the start
            if (roundQuestions.length === 0) {
                currentRound = 0;
                roundStart = 0;
                roundQuestions = allQuestions.slice(0, perRound);
                sessionStorage.setItem('aiQuizRound', '0');
            }
            var totalRounds = Math.ceil(allQuestions.length / perRound);
            var hasNextRound = (currentRound + 1) < totalRounds;

            var quiz = new QuizEngine({
                containerId: 'quiz-root',
                questions: roundQuestions,
                guideName: aiData.guideName || 'AI Practice Questions',
                guideSlug: aiData.guideSlug || 'ai-generated',
                category: aiData.category || 'AI Generated',
                categoryColor: aiData.categoryColor || '#3b82f6',
                estimatedMinutes: aiData.estimatedMinutes || Math.max(5, Math.round(perRound * 1.5)),
                backUrl: '../../ai-tools.html',
                backLabel: 'Back to AI Tools',
                isAIGenerated: true,
                aiPoolInfo: {
                    currentRound: currentRound,
                    totalRounds: totalRounds,
                    hasNextRound: hasNextRound,
                    questionsPerRound: perRound,
                    totalQuestions: allQuestions.length
                }
            });
            quiz.init();
            return;
        }

        verifyAccess(false).then(function (hasAccess) {
            if (!hasAccess) return;

            // Find quiz data global variable (pattern: *QuizData)
            var quizData = null;
            var keys = Object.keys(window);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].endsWith('QuizData') && window[keys[i]] && window[keys[i]].questions) {
                    quizData = window[keys[i]];
                    break;
                }
            }

            if (!quizData || !quizData.questions || quizData.questions.length === 0) {
                showError('Unable to load quiz questions. Please refresh the page or try again later.');
                return;
            }

            // Pull server progress before starting quiz (non-blocking — quiz starts even if pull fails)
            pullServerProgress(quizData.guideSlug).then(function () {
                var quiz = new QuizEngine({
                    containerId: 'quiz-root',
                    questions: quizData.questions,
                    guideName: quizData.guideName,
                    guideSlug: quizData.guideSlug,
                    category: quizData.category,
                    categoryColor: quizData.categoryColor,
                    estimatedMinutes: quizData.estimatedMinutes
                });

                quiz.init();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
