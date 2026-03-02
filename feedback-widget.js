/**
 * Feedback Widget
 * Floating button with slide-up panel for feedback and bug reports
 * Supports both authenticated and guest users
 */
(function () {
    'use strict';

    let panelOpen = false;
    let currentTab = 'feedback'; // 'feedback' or 'bug'
    let selectedRating = 0;

    // Build the widget DOM
    function createWidget() {
        // Floating button
        const fab = document.createElement('button');
        fab.className = 'feedback-fab';
        fab.setAttribute('aria-label', 'Send feedback');
        fab.setAttribute('title', 'Send feedback');
        fab.innerHTML = '<i class="fas fa-comment-dots"></i>';

        // Panel
        const panel = document.createElement('div');
        panel.className = 'feedback-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Feedback form');
        panel.innerHTML = buildPanelHTML();

        document.body.appendChild(fab);
        document.body.appendChild(panel);

        // Bind events
        fab.addEventListener('click', togglePanel);
        bindPanelEvents(panel);

        // Watch for cookie banner
        observeCookieBanner(fab, panel);

        return { fab, panel };
    }

    function buildPanelHTML() {
        return `
            <div class="feedback-header">
                <h3><i class="fas fa-comment-dots"></i> Send Feedback</h3>
                <button class="feedback-close" aria-label="Close feedback panel">&times;</button>
            </div>
            <div class="feedback-tabs">
                <button class="feedback-tab active" data-tab="feedback">
                    <i class="fas fa-star"></i> Feedback
                </button>
                <button class="feedback-tab" data-tab="bug">
                    <i class="fas fa-bug"></i> Bug Report
                </button>
            </div>
            <div class="feedback-body">
                ${buildFeedbackForm()}
            </div>
        `;
    }

    function buildFeedbackForm() {
        return `
            <form class="feedback-form" id="feedback-form">
                <label class="feedback-label">How's your experience?</label>
                <div class="feedback-stars" role="radiogroup" aria-label="Rating">
                    ${[1,2,3,4,5].map(n => `
                        <button type="button" class="feedback-star" data-rating="${n}" aria-label="${n} star${n > 1 ? 's' : ''}">
                            <i class="fas fa-star"></i>
                        </button>
                    `).join('')}
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
                <label class="feedback-label">Describe the bug</label>
                <textarea class="feedback-textarea" placeholder="What happened? What did you expect to happen?" maxlength="5000" required></textarea>
                <button type="submit" class="feedback-submit">
                    <i class="fas fa-bug"></i> Report Bug
                </button>
            </form>
        `;
    }

    function togglePanel() {
        const panel = document.querySelector('.feedback-panel');
        panelOpen = !panelOpen;
        panel.classList.toggle('open', panelOpen);

        if (panelOpen) {
            // Focus the textarea when opened
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

        // Update tab buttons
        document.querySelectorAll('.feedback-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // Swap form
        const body = document.querySelector('.feedback-body');
        body.innerHTML = tab === 'feedback' ? buildFeedbackForm() : buildBugForm();

        // Re-bind form events
        bindFormEvents();
    }

    function bindPanelEvents(panel) {
        // Close button
        panel.querySelector('.feedback-close').addEventListener('click', closePanel);

        // Tab switching
        panel.querySelectorAll('.feedback-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                switchTab(this.dataset.tab);
            });
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panelOpen) closePanel();
        });

        // Close on click outside
        document.addEventListener('click', function (e) {
            if (!panelOpen) return;
            const panel = document.querySelector('.feedback-panel');
            const fab = document.querySelector('.feedback-fab');
            if (!panel.contains(e.target) && !fab.contains(e.target)) {
                closePanel();
            }
        });

        // Bind form-specific events
        bindFormEvents();
    }

    function bindFormEvents() {
        // Star rating
        document.querySelectorAll('.feedback-star').forEach(star => {
            star.addEventListener('click', function () {
                selectedRating = parseInt(this.dataset.rating);
                document.querySelectorAll('.feedback-star').forEach((s, i) => {
                    s.classList.toggle('active', i < selectedRating);
                });
            });
        });

        // Form submission
        const form = document.getElementById('feedback-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const textarea = document.querySelector('.feedback-textarea');
        const message = textarea.value.trim();
        if (!message) return;

        const submitBtn = document.querySelector('.feedback-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const payload = {
            type: currentTab,
            message: message,
            page_url: window.location.href,
            browser_info: navigator.userAgent.substring(0, 500)
        };

        if (currentTab === 'feedback') {
            payload.rating = selectedRating || null;
        } else {
            const catEl = document.getElementById('bug-category');
            payload.category = catEl ? catEl.value : null;
        }

        try {
            // Use apiCall if available (has token handling), otherwise raw fetch
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

            // Track event if available
            if (typeof trackBetaEvent === 'function') {
                trackBetaEvent('feedback_submitted', { type: currentTab });
            }
        } catch (err) {
            console.error('[Feedback] Submit error:', err);
            showResult(false);
        }
    }

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

        // Reset after delay
        setTimeout(() => {
            if (success) closePanel();
            // Reset form
            currentTab = 'feedback';
            selectedRating = 0;
            const body = document.querySelector('.feedback-body');
            if (body) body.innerHTML = buildFeedbackForm();
            // Reset tabs
            document.querySelectorAll('.feedback-tab').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === 'feedback');
            });
            bindFormEvents();
        }, success ? 2000 : 4000);
    }

    function observeCookieBanner(fab, panel) {
        // Check if cookie banner exists and is visible
        function checkBanner() {
            const banner = document.querySelector('.cookie-consent-banner');
            const visible = banner && banner.classList.contains('visible');
            fab.classList.toggle('cookie-banner-visible', visible);
            panel.classList.toggle('cookie-banner-visible', visible);
        }

        // Initial check
        checkBanner();

        // Watch for changes
        const observer = new MutationObserver(checkBanner);
        const target = document.querySelector('.cookie-consent-banner');
        if (target) {
            observer.observe(target, { attributes: true, attributeFilter: ['class'] });
        }

        // One-time fallback check for dynamically injected banners
        setTimeout(checkBanner, 5000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
})();
