/* v2 — force Cloudflare Pages redeploy after stale single-file glitch */
/**
 * AI Section Quiz — inline AI-generated practice questions on guide pages.
 *
 * Adds a small "AI Quiz" pill into the heading of each <section> on a
 * published study guide. Clicking it calls the backend's
 * /api/ai/guide/<guide_id>/section-quiz endpoint, which generates
 * questions on-the-fly the first time and serves a cached result for
 * every subsequent user (no credit cost — see backend's guide_ai_routes).
 *
 * Loaded by guide-script.js after access verification passes, so pills
 * only render for users with valid guide access.
 *
 * CSP-compliant: no inline event handlers, no inline scripts.
 */
(function () {
    'use strict';

    var API_URL = (function () {
        var h = window.location.hostname;
        if (h === 'thenursingcollective.pro' || h === 'www.thenursingcollective.pro') {
            return 'https://api.thenursingcollective.pro';
        }
        return 'https://staging-backend-production-365a.up.railway.app';
    })();

    var QUESTION_COUNT = 10;
    var MIN_SECTION_CHARS = 300;

    // Sections that are themselves quizzes or non-content shells — don't add a
    // pill to these.
    var SKIP_SECTION_IDS = ['practice-questions', 'cross-references', 'references'];

    function getGuideId() {
        // Prefer the body data attribute every guide page already sets —
        // works for both /guides/<id>.html and Cloudflare's clean
        // /guides/<id> URLs.
        var fromBody = document.body && document.body.dataset && document.body.dataset.productId;
        if (fromBody) return fromBody;
        var m = window.location.pathname.match(/\/guides\/([a-z0-9_-]+?)(?:\.html)?\/?$/i);
        return m ? m[1] : null;
    }

    function getAuthToken() {
        return localStorage.getItem('accessToken');
    }

    // ── Markdown parser ─────────────────────────────────────
    // Duplicates parseAIQuizMarkdown() from ai-tools-script.js. Cohesion
    // item: extract into a shared module (UX_AUDIT_TODO #5).

    function parseAIQuizMarkdown(markdown) {
        if (!markdown) return [];
        var parts = markdown.split(/^## Question \d+\s*/gm);
        parts.shift();
        var questions = [];
        var qid = 0;
        for (var i = 0; i < parts.length; i++) {
            var block = parts[i];
            if (!block || !block.trim()) continue;
            var isSATA = /\(Select All That Apply\)|Select All That Apply/i.test(block);
            block = block.replace(/\(Select All That Apply\)/gi, '').trim();
            var lines = block.split('\n');
            var stemLines = [];
            var optionStart = -1;
            for (var j = 0; j < lines.length; j++) {
                if (/^[A-E]\.\s/.test(lines[j].trim())) { optionStart = j; break; }
                stemLines.push(lines[j]);
            }
            var stem = stemLines.join('\n').trim();
            stem = stem.replace(/^\**\s*Question Type:[^\n]*$/gim, '').trim();
            if (!stem || optionStart === -1) continue;
            var options = [];
            for (var k = optionStart; k < lines.length; k++) {
                var m = lines[k].trim().match(/^([A-E])\.\s+(.+)$/);
                if (m) options.push({ id: m[1].toLowerCase(), text: m[2].trim() });
            }
            var correct = null;
            var ansMatch = block.match(/>\s*\*{0,2}Answer:?\*{0,2}:?\s*(.+)/i);
            if (ansMatch) {
                var raw = ansMatch[1].trim();
                if (isSATA) {
                    correct = raw.split(/\s*,\s*/).map(function (l) {
                        return l.trim().replace(/[^a-eA-E]/g, '').toLowerCase();
                    }).filter(function (l) { return /^[a-e]$/.test(l); }).sort();
                    if (!correct.length) correct = null;
                } else {
                    var sm = raw.match(/^([A-E])/i);
                    correct = sm ? sm[1].toLowerCase() : null;
                }
            }
            var rationale = null;
            var ratMatch = block.match(/>\s*\*{0,2}Rationale:?\*{0,2}:?\s*(.+)/i);
            if (ratMatch) rationale = ratMatch[1].trim();
            var concept = null;
            var conMatch = block.match(/>\s*\*{0,2}Concept:?\*{0,2}:?\s*(.+)/i);
            if (conMatch) concept = conMatch[1].trim();
            if (options.length < 2 || !correct) continue;
            if (isSATA && Array.isArray(correct)) {
                var valid = options.map(function (o) { return o.id; });
                if (!correct.every(function (l) { return valid.indexOf(l) !== -1; })) continue;
            }
            qid++;
            questions.push({
                id: 'ai-q-' + qid,
                type: isSATA ? 'sata' : 'single',
                subtype: null,
                difficulty: 'application',
                stem: stem,
                options: options,
                correct: correct,
                rationale: { correct: rationale || 'See the study guide for detailed rationale.' },
                testTakingTip: null,
                guideSection: concept || null,
                guideSectionId: null
            });
        }
        return questions;
    }

    // ── Toast (minimal) ─────────────────────────────────────

    function showToast(msg, type) {
        var existing = document.querySelector('.ai-sq-toast');
        if (existing) existing.remove();
        var t = document.createElement('div');
        t.className = 'ai-sq-toast ai-sq-toast--' + (type || 'info');
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(function () {
            t.classList.add('ai-sq-toast--show');
        }, 10);
        setTimeout(function () {
            t.classList.remove('ai-sq-toast--show');
            setTimeout(function () { t.remove(); }, 250);
        }, 4000);
    }

    // ── API call + navigation ───────────────────────────────

    function extractSectionText(sectionEl) {
        // Clone so we can strip non-content children without mutating the page.
        var clone = sectionEl.cloneNode(true);
        var strippable = clone.querySelectorAll('script, style, button, nav, .ai-sq-pill');
        for (var i = 0; i < strippable.length; i++) {
            strippable[i].parentNode.removeChild(strippable[i]);
        }
        return (clone.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function launchQuiz(guideId, sectionId, sectionTitle, sectionEl, pillEl) {
        var token = getAuthToken();
        if (!token) {
            showToast('Please sign in to use AI quiz.', 'error');
            return;
        }

        var sectionText = extractSectionText(sectionEl);

        var originalHTML = pillEl.innerHTML;
        pillEl.disabled = true;
        pillEl.innerHTML = '<span class="ai-sq-spinner"></span> Generating…';

        fetch(API_URL + '/api/ai/guide/' + encodeURIComponent(guideId) + '/section-quiz', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section_id: sectionId,
                section_title: sectionTitle,
                section_text: sectionText,
                question_count: QUESTION_COUNT
            })
        }).then(function (resp) {
            if (resp.status === 403) {
                showToast('Subscribe to unlock AI quizzes.', 'error');
                pillEl.disabled = false;
                pillEl.innerHTML = originalHTML;
                return null;
            }
            if (!resp.ok) {
                return resp.json().catch(function () { return {}; }).then(function (body) {
                    throw new Error(body.error || ('HTTP ' + resp.status));
                });
            }
            return resp.json();
        }).then(function (data) {
            if (!data) return;
            if (!data.content) {
                throw new Error('No content returned');
            }
            var questions = parseAIQuizMarkdown(data.content);
            if (!questions || !questions.length) {
                throw new Error('Could not parse questions');
            }
            var payload = {
                questions: questions,
                questionsPerRound: questions.length,
                guideName: sectionTitle + ' — AI Practice',
                guideSlug: 'ai-guide-' + guideId + '-' + sectionId,
                category: 'AI Generated',
                categoryColor: '#8b5cf6',
                estimatedMinutes: Math.max(3, Math.round(questions.length * 1.5)),
                isAIGenerated: true,
                sectionTitle: sectionTitle
            };
            try {
                sessionStorage.setItem('aiQuizData', JSON.stringify(payload));
                sessionStorage.setItem('aiQuizRound', '0');
            } catch (e) {
                showToast('Could not start quiz (storage full).', 'error');
                pillEl.disabled = false;
                pillEl.innerHTML = originalHTML;
                return;
            }
            window.location.href = 'quiz/quiz.html?source=ai-guide&guide=' +
                encodeURIComponent(guideId) + '&section=' + encodeURIComponent(sectionId);
        }).catch(function (err) {
            console.error('[AI Section Quiz] error:', err);
            showToast(err.message || 'Could not generate quiz. Please try again.', 'error');
            pillEl.disabled = false;
            pillEl.innerHTML = originalHTML;
        });
    }

    // ── Pill injection ──────────────────────────────────────

    function makePill(guideId, sectionId, sectionTitle, sectionEl) {
        var pill = document.createElement('button');
        pill.className = 'ai-sq-pill';
        pill.type = 'button';
        pill.setAttribute('aria-label', 'Generate AI practice questions for ' + sectionTitle);
        pill.innerHTML = '<span class="ai-sq-pill-icon" aria-hidden="true">✨</span> AI Quiz';
        pill.addEventListener('click', function () {
            launchQuiz(guideId, sectionId, sectionTitle, sectionEl, pill);
        });
        return pill;
    }

    function injectPills(config) {
        var guideId = getGuideId();
        if (!guideId) return;

        var configById = {};
        if (config && Array.isArray(config.sections)) {
            config.sections.forEach(function (s) { configById[s.id] = s; });
        }

        var sections = document.querySelectorAll('section[id]');
        sections.forEach(function (section) {
            var id = section.id;
            if (!id || SKIP_SECTION_IDS.indexOf(id) !== -1) return;
            if (section.querySelector(':scope > .ai-sq-pill')) return;
            if ((section.textContent || '').length < MIN_SECTION_CHARS) return;

            var heading = section.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > header h1, :scope > header h2');
            var title = (configById[id] && configById[id].title) ||
                (heading ? heading.textContent.trim() : id);

            var pill = makePill(guideId, id, title, section);
            if (heading && heading.parentNode === section) {
                heading.insertAdjacentElement('afterend', pill);
            } else {
                section.insertBefore(pill, section.firstChild);
            }
        });
    }

    function injectStyles() {
        if (document.getElementById('ai-sq-styles')) return;
        var style = document.createElement('style');
        style.id = 'ai-sq-styles';
        style.textContent =
            '.ai-sq-pill{display:inline-flex;align-items:center;gap:6px;' +
                'background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:#fff;' +
                'border:none;border-radius:999px;padding:6px 14px;font-size:0.85rem;' +
                'font-weight:600;cursor:pointer;margin:8px 0 16px;' +
                'box-shadow:0 2px 8px rgba(139,92,246,0.3);' +
                'font-family:"Inter","Outfit",system-ui,sans-serif;' +
                'transition:transform 0.15s ease, box-shadow 0.15s ease;}' +
            '.ai-sq-pill:hover:not(:disabled){transform:translateY(-1px);' +
                'box-shadow:0 4px 12px rgba(139,92,246,0.4);}' +
            '.ai-sq-pill:disabled{opacity:0.7;cursor:wait;}' +
            '.ai-sq-pill-icon{font-size:0.95rem;}' +
            '.ai-sq-spinner{display:inline-block;width:12px;height:12px;' +
                'border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;' +
                'border-radius:50%;animation:ai-sq-spin 0.7s linear infinite;' +
                'vertical-align:-2px;margin-right:4px;}' +
            '@keyframes ai-sq-spin{to{transform:rotate(360deg);}}' +
            '.ai-sq-toast{position:fixed;bottom:24px;left:50%;' +
                'transform:translate(-50%,20px);background:#1f2937;color:#fff;' +
                'padding:12px 20px;border-radius:8px;font-size:0.9rem;' +
                'font-family:"Inter",system-ui,sans-serif;z-index:10000;' +
                'opacity:0;transition:opacity 0.2s ease, transform 0.2s ease;' +
                'box-shadow:0 8px 24px rgba(0,0,0,0.2);max-width:90vw;}' +
            '.ai-sq-toast--show{opacity:1;transform:translate(-50%,0);}' +
            '.ai-sq-toast--error{background:#dc2626;}' +
            '[data-theme="dark"] .ai-sq-pill{box-shadow:0 2px 8px rgba(139,92,246,0.5);}';
        document.head.appendChild(style);
    }

    // ── Public entry point ──────────────────────────────────

    window.initializeAISectionQuiz = function (config) {
        injectStyles();
        injectPills(config);
    };
})();
