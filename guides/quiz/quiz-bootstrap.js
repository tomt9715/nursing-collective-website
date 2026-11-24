/**
 * Quiz bootstrap and themed error states — extracted from an inline <script>
 * in quiz.html on 24 Nov 2026.
 *
 * It lived inline, which meant any Content-Security-Policy worth having would
 * have blocked it (the whole point of the policy is that script-src does not
 * need 'unsafe-inline'). Moving it out also lets quiz.html defer its scripts
 * like every other page.
 *
 * Behaviour is unchanged: same IIFE, same renderer, same dynamic loads.
 */
(function () {
        'use strict';

        // ── Themed empty/error state renderer ─────────────
        // Replaces the body content with a navy/teal themed page that matches
        // the rest of the app (navbar + centered message card + footer).
        function escapeHtml(s) {
            return String(s == null ? '' : s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
        function renderError(opts) {
            var icon = opts.icon || 'fa-circle-question';
            var eyebrow = opts.eyebrow || '';
            var title = opts.title || 'Quiz Not Found';
            var message = opts.message || '';
            var ctas = (opts.ctas || []).map(function (cta) {
                var cls = 'qep-btn' + (cta.primary ? ' qep-btn-primary' : '');
                var iconHtml = cta.icon ? '<i class="fas ' + escapeHtml(cta.icon) + '"></i> ' : '';
                return '<a class="' + cls + '" href="' + escapeHtml(cta.href) + '">' + iconHtml + escapeHtml(cta.label) + '</a>';
            }).join('');

            document.body.classList.add('quiz-error-active');
            document.body.innerHTML =
                '<nav class="qep-navbar"><div class="qep-nav-inner">' +
                    '<a href="../../index.html" class="qep-nav-brand" aria-label="The Nursing Collective home">' +
                        '<img src="../../assets/images/the-nursing-collective-logo-on-light.svg" alt="The Nursing Collective">' +
                    '</a>' +
                    '<div class="qep-nav-links">' +
                        '<a href="../../dashboard.html">Dashboard</a>' +
                        '<a href="../../my-guides.html">My Guides</a>' +
                        '<a href="../../resources.html">Resources</a>' +
                    '</div>' +
                '</div></nav>' +
                '<main class="qep-main"><div class="qep-card">' +
                    '<div class="qep-icon"><i class="fas ' + escapeHtml(icon) + '"></i></div>' +
                    (eyebrow ? '<div class="qep-eyebrow">' + escapeHtml(eyebrow) + '</div>' : '') +
                    '<h1 class="qep-title">' + escapeHtml(title) + '</h1>' +
                    '<p class="qep-message">' + message + '</p>' +
                    '<div class="qep-cta-row">' + ctas + '</div>' +
                '</div></main>' +
                '<footer class="qep-footer"><div class="qep-footer-inner">' +
                    '<p>&copy; 2026 The Nursing Collective &middot; ' +
                        '<a href="../../privacy.html">Privacy</a>' +
                        '<a href="../../terms.html">Terms</a>' +
                        '<a href="../../contact.html">Contact</a>' +
                    '</p>' +
                '</div></footer>';
        }

        // Parse URL query string
        var params = new URLSearchParams(window.location.search);

        // ── AI Quiz Mode ──────────────────────────────────
        if (params.get('source') === 'ai') {
            var raw = sessionStorage.getItem('aiQuizData');
            if (!raw) {
                renderError({
                    icon: 'fa-clock-rotate-left',
                    eyebrow: 'Session expired',
                    title: 'Quiz Session Expired',
                    message: 'This quiz session has expired or the page was refreshed. Open the guide again and restart its quiz to keep going.',
                    ctas: [
                        { label: 'Browse Study Guides', href: '../../my-guides.html', icon: 'fa-book-open', primary: true },
                        { label: 'Go to Dashboard', href: '../../dashboard.html' }
                    ]
                });
                return;
            }
            try {
                window._aiQuizData = JSON.parse(raw);
                // Keep sessionStorage for "Go Again" pool rotation — quiz engine cleans up when pools are exhausted
            } catch (e) {
                renderError({
                    icon: 'fa-triangle-exclamation',
                    eyebrow: 'Something went wrong',
                    title: 'Failed to Load Quiz',
                    message: 'We couldn&rsquo;t read the quiz data for this session. Open the guide again and restart its quiz.',
                    ctas: [
                        { label: 'Browse Study Guides', href: '../../my-guides.html', icon: 'fa-book-open', primary: true },
                        { label: 'Go to Dashboard', href: '../../dashboard.html' }
                    ]
                });
                return;
            }
            document.body.setAttribute('data-product-id', 'ai-generated');
            document.body.setAttribute('data-guide-name', window._aiQuizData.guideName || 'AI Practice Questions');
            document.title = (window._aiQuizData.guideName || 'AI Practice Questions') + ' Quiz - The Nursing Collective';
            var initScript = document.createElement('script');
            initScript.src = 'quiz-init.js?v=quiz-light-20261123';
            document.body.appendChild(initScript);
            return;
        }

        // ── Normal Topic Flow ─────────────────────────────
        var topic = params.get('topic');

        if (!topic || !/^[a-z0-9-]+$/.test(topic)) {
            renderError({
                icon: 'fa-circle-question',
                eyebrow: '404 &middot; Quiz not found',
                title: 'Quiz Not Found',
                message: 'No topic was specified for this quiz. Open a quiz from one of your study guides, or browse the full library to find one.',
                ctas: [
                    { label: 'Browse Study Guides', href: '../../my-guides.html', icon: 'fa-book-open', primary: true },
                    { label: 'Go to Dashboard', href: '../../dashboard.html' }
                ]
            });
            return;
        }

        // Set body data attributes (used by quiz-init.js for access check)
        document.body.setAttribute('data-product-id', topic);

        // Dynamically load the question data script
        var script = document.createElement('script');
        script.src = 'data/' + topic + '-questions.js';
        script.onload = function () {
            // Find the quiz data global (pattern: *QuizData)
            var quizData = null;
            var keys = Object.keys(window);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].endsWith('QuizData') && window[keys[i]] && window[keys[i]].questions) {
                    quizData = window[keys[i]];
                    break;
                }
            }

            if (!quizData) {
                renderError({
                    icon: 'fa-triangle-exclamation',
                    eyebrow: 'Something went wrong',
                    title: 'Failed to Load Quiz',
                    message: 'We loaded the question file but couldn&rsquo;t find any questions inside it. Try a different guide, or contact support if this keeps happening.',
                    ctas: [
                        { label: 'Browse Study Guides', href: '../../my-guides.html', icon: 'fa-book-open', primary: true },
                        { label: 'Go to Dashboard', href: '../../dashboard.html' }
                    ]
                });
                return;
            }

            // Set guide name on body (for content-gate)
            document.body.setAttribute('data-guide-name', quizData.guideName || topic);

            // Update page title
            document.title = (quizData.guideName || topic) + ' Quiz - The Nursing Collective';

            // Load quiz-init.js (handles access verification + engine bootstrap)
            var initScript = document.createElement('script');
            initScript.src = 'quiz-init.js?v=quiz-light-20261123';
            document.body.appendChild(initScript);

            // Load content-gate.js after init
            var gateScript = document.createElement('script');
            gateScript.src = '../../content-gate.js?v=quizbank-20261123';
            document.body.appendChild(gateScript);
        };

        script.onerror = function () {
            renderError({
                icon: 'fa-circle-question',
                eyebrow: '404 &middot; Quiz not found',
                title: 'Quiz Not Found',
                message: 'No quiz exists for &ldquo;<strong>' + escapeHtml(topic) + '</strong>.&rdquo; Double-check the URL, or browse our full study guide library to find what you&rsquo;re looking for.',
                ctas: [
                    { label: 'Browse Study Guides', href: '../../my-guides.html', icon: 'fa-book-open', primary: true },
                    { label: 'Go to Dashboard', href: '../../dashboard.html' }
                ]
            });
        };

        document.body.appendChild(script);
    })();
