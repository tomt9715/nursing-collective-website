/**
 * Sidebar Widgets — Daily Goal + Subscription
 *
 * Injected on any page with the .dash-sidebar shell so the sidebar feels
 * consistent across dashboard / my-guides / my-resources / settings / etc.
 * Dashboard.html ships the widgets inline + populated by dashboard-script.js
 * — this module detects that and skips injection there to avoid double-work.
 *
 * Standalone: depends only on api-service.js (apiCall, checkSubscriptionStatus,
 * isAuthenticated). No dependency on dashboard-script.js globals.
 */
(function () {
    'use strict';

    var PLAN_LABELS = {
        'monthly-access': 'Monthly',
        'semester-access': 'Semester',
        'lifetime-access': 'Lifetime',
        'ai-monthly-access': 'AI-Powered Monthly',
        'ai-semester-access': 'AI-Powered Semester',
        'ai-lifetime-access': 'AI-Powered Lifetime'
    };

    function init() {
        var sidebar = document.querySelector('.dash-sidebar');
        if (!sidebar) return;
        // Dashboard already has widgets in markup — leave it to dashboard-script.js.
        if (document.getElementById('sidebar-goal-widget') ||
            document.getElementById('sidebar-sub-widget')) {
            return;
        }
        if (typeof isAuthenticated === 'function' && !isAuthenticated()) {
            // Not logged in — these pages typically gate themselves; skip widgets either way.
            return;
        }

        sidebar.insertAdjacentHTML('beforeend',
            buildGoalWidgetHtml() + buildSubWidgetHtml()
        );

        updateGoalWidget();
        updateSubWidget();
    }

    function buildGoalWidgetHtml() {
        return '' +
            '<div class="sidebar-goal-widget" id="sidebar-goal-widget" style="display:none">' +
                '<div class="sidebar-goal-header">' +
                    '<span class="sidebar-goal-title"><i class="fas fa-bullseye"></i> Today\'s Goal</span>' +
                '</div>' +
                '<div class="sidebar-goal-ring-container">' +
                    '<svg class="sidebar-goal-ring" viewBox="0 0 48 48" width="48" height="48">' +
                        '<circle class="sidebar-goal-track" cx="24" cy="24" r="20" fill="none" stroke-width="4"/>' +
                        '<circle class="sidebar-goal-fill" id="goal-ring-fill" cx="24" cy="24" r="20" fill="none" stroke-width="4" ' +
                            'stroke-dasharray="125.66" stroke-dashoffset="125.66" stroke-linecap="round" ' +
                            'transform="rotate(-90 24 24)"/>' +
                    '</svg>' +
                    '<span class="sidebar-goal-count" id="goal-count-text">0/5</span>' +
                '</div>' +
                '<div class="sidebar-goal-label" id="goal-label-text">sets completed</div>' +
            '</div>';
    }

    function buildSubWidgetHtml() {
        return '' +
            '<div class="sidebar-sub-widget" id="sidebar-sub-widget">' +
                '<div class="sidebar-sub-cta">' +
                    '<div class="skeleton-loader">' +
                        '<div class="skeleton skeleton-card" style="height:60px;border-radius:8px"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    // ── Goal widget ─────────────────────────────────────────────────
    async function updateGoalWidget() {
        var widget = document.getElementById('sidebar-goal-widget');
        var ringFill = document.getElementById('goal-ring-fill');
        var countText = document.getElementById('goal-count-text');
        var labelText = document.getElementById('goal-label-text');
        if (!widget || !ringFill || !countText) return;

        var hasAccess = true;
        try {
            if (typeof checkSubscriptionStatus === 'function') {
                var status = await checkSubscriptionStatus();
                hasAccess = !!(status && status.hasAccess);
            }
        } catch (e) { /* fall through, show normally */ }

        widget.style.display = '';

        // Free user — paywall CTA, mirrors dashboard behaviour (see #14).
        if (!hasAccess) {
            widget.classList.add('sidebar-goal-widget--locked');
            widget.classList.remove('goal-complete');
            var lockedC = 2 * Math.PI * 20;
            ringFill.setAttribute('stroke-dasharray', lockedC.toFixed(2));
            ringFill.setAttribute('stroke-dashoffset', lockedC.toFixed(2));
            countText.textContent = '0/5';
            if (labelText) {
                labelText.innerHTML = '<a href="pricing.html" class="sidebar-goal-link">' +
                    'Subscribe to start your streak <i class="fas fa-arrow-right"></i></a>';
            }
            return;
        }
        widget.classList.remove('sidebar-goal-widget--locked');

        var DAILY_GOAL = 5;
        var todayCount = await getTodayQuizCount();

        var circumference = 2 * Math.PI * 20;
        var completed = Math.min(todayCount, DAILY_GOAL);
        var offset = circumference - (completed / DAILY_GOAL) * circumference;
        ringFill.setAttribute('stroke-dasharray', circumference.toFixed(2));
        ringFill.setAttribute('stroke-dashoffset', offset.toFixed(2));
        countText.textContent = todayCount + '/' + DAILY_GOAL;

        if (todayCount >= DAILY_GOAL) {
            widget.classList.add('goal-complete');
            labelText.textContent = 'Goal reached!';
        } else {
            widget.classList.remove('goal-complete');
            labelText.textContent = todayCount === 0 ? 'Start a quiz set!' : 'sets completed';
        }
    }

    async function getTodayQuizCount() {
        if (typeof apiCall !== 'function') return 0;
        try {
            var resp = await apiCall('/api/quiz/sessions?limit=100');
            var sessions = (resp && resp.sessions) || [];
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            var todayKey = today.toISOString().split('T')[0];
            var count = 0;
            sessions.forEach(function (s) {
                if (!s.created_at) return;
                var d = new Date(s.created_at);
                if (isNaN(d.getTime())) return;
                if (d.toISOString().split('T')[0] === todayKey) count++;
            });
            return count;
        } catch (e) {
            return 0;
        }
    }

    // ── Subscription widget ─────────────────────────────────────────
    async function updateSubWidget() {
        var widget = document.getElementById('sidebar-sub-widget');
        if (!widget) return;
        if (typeof checkSubscriptionStatus !== 'function') {
            widget.innerHTML = '';
            return;
        }

        try {
            var result = await checkSubscriptionStatus();
            var subscription = result && result.subscription;

            if (subscription) {
                var planName = PLAN_LABELS[subscription.plan_id] || subscription.plan_name || 'Plan';
                var isActive = subscription.is_active;
                var isLifetime = subscription.plan_id === 'lifetime-access' ||
                                 subscription.plan_id === 'ai-lifetime-access';
                var isCancelling = subscription.cancel_at_period_end;
                var isAiPlan = subscription.plan_id && subscription.plan_id.indexOf('ai-') === 0;

                var statusClass = 'active';
                var statusText = 'Active';
                var statusIcon = 'fa-check-circle';
                if (isActive && isCancelling) {
                    var daysLeft = subscription.expires_at
                        ? Math.ceil((new Date(subscription.expires_at) - new Date()) / 86400000)
                        : 999;
                    if (daysLeft <= 30) {
                        statusClass = 'cancelling';
                        statusText = 'Ending Soon';
                        statusIcon = 'fa-clock';
                    }
                } else if (!isActive) {
                    statusClass = 'expired';
                    statusText = 'Expired';
                    statusIcon = 'fa-times-circle';
                }

                var detailText = '';
                if (isLifetime) {
                    detailText = '<strong>Lifetime</strong> — never expires';
                } else if (subscription.expires_at) {
                    var isMonthly = subscription.plan_id === 'monthly-access' ||
                                    subscription.plan_id === 'ai-monthly-access';
                    var label = isCancelling ? 'Access until' : (isMonthly ? 'Renews' : 'Expires');
                    detailText = label + ' <strong>' + formatExpiryDate(subscription.expires_at) + '</strong>';
                }

                var actionHtml = '';
                if (!isActive) {
                    actionHtml = '<a href="pricing.html" class="sidebar-sub-resubscribe">' +
                        '<i class="fas fa-rocket"></i> Resubscribe</a>';
                } else if (!isAiPlan) {
                    var upgradePrice = '+$10/mo';
                    if (subscription.plan_id === 'semester-access') upgradePrice = '+$30';
                    else if (subscription.plan_id === 'lifetime-access') upgradePrice = '+$50';
                    // Opens upgrade-modal.js in place — no nav to /pricing or /settings.
                    // If upgrade-modal.js isn't loaded on this page, falls back to settings.
                    actionHtml = '<button type="button" class="sidebar-sub-upgrade" data-sidebar-upgrade="1">' +
                        '<i class="fas fa-bolt"></i> Upgrade to AI · ' + upgradePrice + '</button>';
                }

                widget.className = 'sidebar-sub-widget';
                widget.innerHTML =
                    '<div class="sidebar-sub-header">' +
                        '<div class="sidebar-sub-plan"><i class="fas fa-crown"></i> ' + escapeHtml(planName) + '</div>' +
                        '<span class="sidebar-sub-status ' + statusClass + '">' +
                            '<i class="fas ' + statusIcon + '"></i> ' + statusText +
                        '</span>' +
                    '</div>' +
                    '<div class="sidebar-sub-divider"></div>' +
                    '<div class="sidebar-sub-detail">' + detailText + '</div>' +
                    actionHtml;

                // Wire the upgrade button to open the in-place modal.
                // Falls back to /settings.html?upgrade=ai if the modal module
                // isn't loaded on this page.
                var upgradeBtn = widget.querySelector('[data-sidebar-upgrade="1"]');
                if (upgradeBtn) {
                    upgradeBtn.addEventListener('click', function () {
                        if (typeof window.openUpgradeAiModal === 'function') {
                            window.openUpgradeAiModal();
                        } else {
                            window.location.href = 'settings.html?upgrade=ai';
                        }
                    });
                }
            } else {
                widget.className = 'sidebar-sub-widget no-sub';
                widget.innerHTML =
                    '<div class="sidebar-sub-cta">' +
                        '<i class="fas fa-crown"></i>' +
                        '<p>Unlock all study guides and resources</p>' +
                        '<a href="pricing.html" class="btn btn-primary btn-sm">View Plans <i class="fas fa-arrow-right"></i></a>' +
                    '</div>';
            }
        } catch (e) {
            console.error('[SidebarWidgets] sub widget failed:', e);
            widget.innerHTML = '';
        }
    }

    function formatExpiryDate(iso) {
        try {
            var d = new Date(iso);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (e) { return iso; }
    }

    function escapeHtml(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
