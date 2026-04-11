/**
 * Feedback Widget
 * Floating button with slide-up panel for feedback and bug reports
 * Supports both authenticated and guest users
 *
 * Features:
 * - Emoji reactions for feedback rating
 * - Screenshot attachment for bug reports (base64)
 * - Character counters on textareas
 * - Category validation on bug reports
 * - Auto-captures page title and auth status
 * - Keyboard accessible (arrow keys for emoji, Enter/Space for screenshot)
 */
(function () {
    'use strict';

    let panelOpen = false;
    let currentTab = 'bug'; // 'bug' or 'feedback'
    let selectedRating = 0;
    let screenshotBase64 = null;

    // ─── Widget creation ───────────────────────────────────────

    function createWidget() {
        const fab = document.createElement('button');
        fab.className = 'feedback-fab';
        fab.setAttribute('aria-label', 'Send feedback');
        fab.setAttribute('title', 'Send feedback');
        fab.innerHTML = '<i class="fas fa-comment-dots"></i>';

        const panel = document.createElement('div');
        panel.className = 'feedback-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Feedback form');
        panel.innerHTML = buildPanelHTML();

        document.body.appendChild(fab);
        document.body.appendChild(panel);

        fab.addEventListener('click', togglePanel);
        bindPanelEvents(panel);
        observeCookieBanner(fab, panel);

        return { fab, panel };
    }

    // ─── HTML builders ─────────────────────────────────────────

    function buildPanelHTML() {
        return `
            <div class="feedback-header">
                <h3><i class="fas fa-comment-dots"></i> Send Feedback</h3>
                <button class="feedback-close" aria-label="Close feedback panel">&times;</button>
            </div>
            <div class="feedback-tabs">
                <button class="feedback-tab" data-tab="feedback">
                    <i class="fas fa-star"></i> Feedback
                </button>
                <button class="feedback-tab active" data-tab="bug">
                    <i class="fas fa-bug"></i> Bug Report
                </button>
            </div>
            <div class="feedback-body">
                ${buildBugForm()}
            </div>
        `;
    }

    function buildFeedbackForm() {
        return `
            <form class="feedback-form" id="feedback-form">
                <label class="feedback-label">How's your experience?</label>
                <div class="feedback-emoji-group" role="radiogroup" aria-label="Rating">
                    <button type="button" class="feedback-emoji" data-rating="1"
                        role="radio" aria-checked="false" aria-label="Frustrated" tabindex="0">
                        <span class="feedback-emoji-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5" stroke-linecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5" stroke-linecap="round"/></svg></span>
                        <span class="feedback-emoji-label">Poor</span>
                    </button>
                    <button type="button" class="feedback-emoji" data-rating="2"
                        role="radio" aria-checked="false" aria-label="Below average" tabindex="-1">
                        <span class="feedback-emoji-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5" stroke-linecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5" stroke-linecap="round"/></svg></span>
                        <span class="feedback-emoji-label">Fair</span>
                    </button>
                    <button type="button" class="feedback-emoji" data-rating="3"
                        role="radio" aria-checked="false" aria-label="Okay" tabindex="-1">
                        <span class="feedback-emoji-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5" stroke-linecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5" stroke-linecap="round"/></svg></span>
                        <span class="feedback-emoji-label">Okay</span>
                    </button>
                    <button type="button" class="feedback-emoji" data-rating="4"
                        role="radio" aria-checked="false" aria-label="Good" tabindex="-1">
                        <span class="feedback-emoji-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5" stroke-linecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5" stroke-linecap="round"/></svg></span>
                        <span class="feedback-emoji-label">Good</span>
                    </button>
                    <button type="button" class="feedback-emoji" data-rating="5"
                        role="radio" aria-checked="false" aria-label="Great" tabindex="-1">
                        <span class="feedback-emoji-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5" stroke-linecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5" stroke-linecap="round"/></svg></span>
                        <span class="feedback-emoji-label">Great</span>
                    </button>
                </div>
                <label class="feedback-label">Tell us more</label>
                <textarea class="feedback-textarea" placeholder="What do you like? What could be better?" maxlength="5000" required></textarea>
                <button type="submit" class="feedback-submit">
                    <i class="fas fa-paper-plane"></i> Send Feedback
                </button>
            </form>
        `;
    }

    function buildBugForm() {
        return `
            <form class="feedback-form" id="feedback-form">
                <label class="feedback-label">Bug category</label>
                <select class="feedback-select" id="bug-category">
                    <option value="">Select a category...</option>
                    <option value="display">Display / Visual Issue</option>
                    <option value="login">Login / Account</option>
                    <option value="payment">Payment / Billing</option>
                    <option value="guides">Study Guides</option>
                    <option value="download">Downloads</option>
                    <option value="performance">Slow / Performance</option>
                    <option value="other">Other</option>
                </select>
                <label class="feedback-label">What happened?</label>
                <textarea class="feedback-textarea" placeholder="Describe the bug \u2014 what did you expect to happen?" maxlength="5000" required></textarea>
                <label class="feedback-label">Steps to reproduce <span style="font-weight:400;color:var(--text-light,#9ca3af)">(optional)</span></label>
                <textarea class="feedback-textarea feedback-textarea-sm" id="bug-steps" placeholder="What were you doing when this happened?" maxlength="2000"></textarea>
                <div class="feedback-screenshot-row">
                    <label class="feedback-label">Screenshot <span style="font-weight:400;color:var(--text-light,#9ca3af)">(optional)</span></label>
                    <label class="feedback-screenshot-trigger" tabindex="0" role="button" aria-label="Choose screenshot file">
                        <i class="fas fa-camera"></i>
                        <span class="feedback-screenshot-text">Click to add screenshot</span>
                        <input type="file" accept="image/*" class="feedback-screenshot-input" />
                    </label>
                    <div class="feedback-screenshot-preview" style="display:none">
                        <img class="feedback-screenshot-img" alt="Screenshot preview" />
                        <button type="button" class="feedback-screenshot-remove" aria-label="Remove screenshot">&times;</button>
                    </div>
                    <div class="feedback-screenshot-error" style="display:none"></div>
                </div>
                <button type="submit" class="feedback-submit">
                    <i class="fas fa-bug"></i> Report Bug
                </button>
            </form>
        `;
    }

    // ─── Panel open/close ──────────────────────────────────────

    function togglePanel() {
        const panel = document.querySelector('.feedback-panel');
        panelOpen = !panelOpen;
        panel.classList.toggle('open', panelOpen);

        if (panelOpen) {
            setTimeout(() => {
                const ta = panel.querySelector('.feedback-textarea');
                if (ta) ta.focus();
            }, 300);
        }
    }

    function closePanel() {
        panelOpen = false;
        const panel = document.querySelector('.feedback-panel');
        if (panel) panel.classList.remove('open');
    }

    function switchTab(tab) {
        if (tab === currentTab) return;
        currentTab = tab;
        selectedRating = 0;
        screenshotBase64 = null;

        document.querySelectorAll('.feedback-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        const body = document.querySelector('.feedback-body');
        body.innerHTML = tab === 'feedback' ? buildFeedbackForm() : buildBugForm();

        bindFormEvents();
    }

    // ─── Event binding ─────────────────────────────────────────

    function bindPanelEvents(panel) {
        panel.querySelector('.feedback-close').addEventListener('click', closePanel);

        panel.querySelectorAll('.feedback-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                switchTab(this.dataset.tab);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panelOpen) closePanel();
        });

        document.addEventListener('click', function (e) {
            if (!panelOpen) return;
            const panel = document.querySelector('.feedback-panel');
            const fab = document.querySelector('.feedback-fab');
            if (!panel.contains(e.target) && !fab.contains(e.target)) {
                closePanel();
            }
        });

        bindFormEvents();
    }

    function bindFormEvents() {
        // Emoji rating
        document.querySelectorAll('.feedback-emoji').forEach(emoji => {
            emoji.addEventListener('click', function () {
                selectedRating = parseInt(this.dataset.rating);
                document.querySelectorAll('.feedback-emoji').forEach(e => {
                    const isSelected = e === this;
                    e.classList.toggle('active', isSelected);
                    e.setAttribute('aria-checked', isSelected ? 'true' : 'false');
                    e.setAttribute('tabindex', isSelected ? '0' : '-1');
                });
            });
        });

        // Emoji keyboard navigation (arrow keys)
        const emojiGroup = document.querySelector('.feedback-emoji-group');
        if (emojiGroup) {
            emojiGroup.addEventListener('keydown', function (e) {
                const emojis = Array.from(this.querySelectorAll('.feedback-emoji'));
                const current = emojis.indexOf(document.activeElement);
                if (current === -1) return;

                let next = -1;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    next = (current + 1) % emojis.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    next = (current - 1 + emojis.length) % emojis.length;
                }

                if (next !== -1) {
                    e.preventDefault();
                    emojis[current].setAttribute('tabindex', '-1');
                    emojis[next].setAttribute('tabindex', '0');
                    emojis[next].focus();
                }
            });
        }

        // Category validation — remove error on change
        const catEl = document.getElementById('bug-category');
        if (catEl) {
            catEl.addEventListener('change', function () {
                this.classList.remove('feedback-select--error');
            });
        }

        // Screenshot handlers
        const screenshotInput = document.querySelector('.feedback-screenshot-input');
        if (screenshotInput) {
            screenshotInput.addEventListener('change', handleScreenshotSelect);
        }
        const removeBtn = document.querySelector('.feedback-screenshot-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', removeScreenshot);
        }
        // Keyboard support for screenshot trigger
        const trigger = document.querySelector('.feedback-screenshot-trigger');
        if (trigger) {
            trigger.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.querySelector('.feedback-screenshot-input').click();
                }
            });
        }

        // Character counters
        document.querySelectorAll('.feedback-textarea').forEach(createCharCounter);

        // Form submission
        const form = document.getElementById('feedback-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    }

    // ─── Character counter ─────────────────────────────────────

    function createCharCounter(textarea) {
        const counter = document.createElement('div');
        counter.className = 'feedback-char-counter';
        const max = parseInt(textarea.getAttribute('maxlength')) || 5000;

        function update() {
            const len = textarea.value.length;
            counter.textContent = len + ' / ' + max;
            counter.classList.toggle('feedback-char-counter--warn', len >= max * 0.9);
        }

        update();
        textarea.addEventListener('input', update);
        textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    }

    // ─── Screenshot handling ───────────────────────────────────

    function handleScreenshotSelect(e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const errorEl = document.querySelector('.feedback-screenshot-error');

        // Validate type
        if (!file.type.startsWith('image/')) {
            showScreenshotError('Please select an image file.');
            e.target.value = '';
            return;
        }

        // Validate size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            showScreenshotError('Image must be under 2MB.');
            e.target.value = '';
            return;
        }

        if (errorEl) errorEl.style.display = 'none';

        const reader = new FileReader();
        reader.onload = function (evt) {
            screenshotBase64 = evt.target.result;
            const preview = document.querySelector('.feedback-screenshot-preview');
            const img = document.querySelector('.feedback-screenshot-img');
            const trigger = document.querySelector('.feedback-screenshot-trigger');

            if (img) img.src = screenshotBase64;
            if (preview) preview.style.display = '';
            if (trigger) trigger.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    function showScreenshotError(msg) {
        const errorEl = document.querySelector('.feedback-screenshot-error');
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.style.display = '';
        }
    }

    function removeScreenshot() {
        screenshotBase64 = null;
        const preview = document.querySelector('.feedback-screenshot-preview');
        const trigger = document.querySelector('.feedback-screenshot-trigger');
        const input = document.querySelector('.feedback-screenshot-input');

        if (preview) preview.style.display = 'none';
        if (trigger) trigger.style.display = '';
        if (input) input.value = '';
    }

    // ─── Form submission ───────────────────────────────────────

    async function handleSubmit(e) {
        e.preventDefault();

        const textarea = document.querySelector('.feedback-textarea');
        const message = textarea.value.trim();
        if (!message) return;

        // Category validation for bug reports
        if (currentTab === 'bug') {
            const catEl = document.getElementById('bug-category');
            if (catEl && !catEl.value) {
                catEl.classList.add('feedback-select--error');
                catEl.focus();
                return;
            }
        }

        const submitBtn = document.querySelector('.feedback-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const payload = {
            type: currentTab,
            message: message,
            page_url: window.location.href,
            page_title: document.title.substring(0, 200),
            is_authenticated: !!(localStorage.getItem('accessToken')),
            browser_info: navigator.userAgent.substring(0, 500),
            screen_size: window.innerWidth + 'x' + window.innerHeight
        };

        if (currentTab === 'feedback') {
            payload.rating = selectedRating || null;
        } else {
            const catEl = document.getElementById('bug-category');
            payload.category = catEl ? catEl.value : null;
            const stepsEl = document.getElementById('bug-steps');
            payload.steps_to_reproduce = stepsEl ? stepsEl.value.trim() : null;

            if (screenshotBase64) {
                payload.screenshot = screenshotBase64;
            }
        }

        try {
            let response;
            if (typeof apiCall === 'function') {
                response = await apiCall('/api/feedback/', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            } else {
                const apiUrl = typeof API_URL !== 'undefined' ? API_URL : 'https://staging-backend-production-365a.up.railway.app';
                const res = await fetch(apiUrl + '/api/feedback/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                response = await res.json();
            }

            showResult(true);

            if (typeof trackBetaEvent === 'function') {
                trackBetaEvent('feedback_submitted', { type: currentTab });
            }
        } catch (err) {
            console.error('[Feedback] Submit error:', err);
            showResult(false);
        }
    }

    // ─── Result display ────────────────────────────────────────

    function showResult(success) {
        const body = document.querySelector('.feedback-body');
        body.innerHTML = `
            <div class="feedback-result">
                <div class="feedback-result-icon ${success ? 'success' : 'error'}">
                    <i class="fas ${success ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                </div>
                <h4>${success ? 'Thank you!' : 'Something went wrong'}</h4>
                <p>${success ? 'Your feedback helps us improve the platform.' : 'Please try again later or email us at support@thenursingcollective.pro'}</p>
            </div>
        `;

        setTimeout(() => {
            if (success) closePanel();
            // Reset state
            currentTab = 'bug';
            selectedRating = 0;
            screenshotBase64 = null;
            const body = document.querySelector('.feedback-body');
            if (body) body.innerHTML = buildBugForm();
            document.querySelectorAll('.feedback-tab').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === 'bug');
            });
            bindFormEvents();
        }, success ? 3000 : 4000);
    }

    // ─── Cookie banner observer ────────────────────────────────

    function observeCookieBanner(fab, panel) {
        let bannerObserver = null;

        function checkBanner() {
            const banner = document.querySelector('.cookie-consent-banner');
            const visible = banner && banner.classList.contains('visible');
            fab.classList.toggle('cookie-banner-visible', visible);
            panel.classList.toggle('cookie-banner-visible', visible);

            if (banner && !bannerObserver) {
                bannerObserver = new MutationObserver(checkBanner);
                bannerObserver.observe(banner, { attributes: true, attributeFilter: ['class'] });
            }
        }

        checkBanner();

        const bodyObserver = new MutationObserver(function () {
            checkBanner();
            if (!document.querySelector('.cookie-consent-banner')) {
                if (bannerObserver) {
                    bannerObserver.disconnect();
                    bannerObserver = null;
                }
            }
        });
        bodyObserver.observe(document.body, { childList: true });
    }

    // ─── Public API ────────────────────────────────────────────

    window.openFeedbackWidget = function (tab) {
        if (tab && tab !== currentTab) switchTab(tab);
        if (!panelOpen) togglePanel();
    };

    // ─── Init ──────────────────────────────────────────────────

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
})();
