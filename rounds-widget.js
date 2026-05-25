/*
 * Today's Rounds — dashboard widget.
 *
 * Pulls today's daily scenario from /api/rounds/daily and renders it
 * tier-aware:
 *   - No subscription:  hide the widget entirely (no upsell noise here
 *                       — pricing surfaces own that conversation)
 *   - Standard, not played:  scenario preview + Play CTA
 *   - Standard, played:      stars + result chips + view-debrief link
 *   - AI-Powered:            scenario preview + Play CTA (same as
 *                            Standard; AI users replay through the
 *                            main page rather than the widget)
 *
 * Defined as a window-scoped function so dashboard-script.js can call it
 * the same way it calls loadStudyPlan / loadExamCountdown.
 */
(function () {
    'use strict';

    function _escape(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function starsHtml(stars) {
        var html = '';
        for (var i = 0; i < 3; i++) {
            html += '<i class="fas fa-star ' + (i < (stars || 0) ? 'on' : 'off') + '"></i>';
        }
        return html;
    }

    function renderPlayed(daily, result) {
        var ccLabel = result.condition_correct ? 'Right call' : 'Wrong call';
        var acLabel = result.action_correct ? 'Right action' : 'Wrong action';
        return (
            '<div class="rounds-widget-played">' +
                '<div class="rounds-widget-stars">' + starsHtml(result.stars) + '</div>' +
                '<div class="rounds-widget-played-meta">' +
                    '<div class="rounds-widget-played-title">' + _escape(daily.title) + '</div>' +
                    '<div class="rounds-widget-played-chips">' +
                        '<span class="rw-chip ' + (result.condition_correct ? 'ok' : 'miss') + '">' + _escape(ccLabel) + '</span>' +
                        '<span class="rw-chip ' + (result.action_correct ? 'ok' : 'miss') + '">' + _escape(acLabel) + '</span>' +
                        (result.efficiency_pct != null ? '<span class="rw-chip">' + result.efficiency_pct + '% efficient</span>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="rounds-widget-footer">' +
                '<span class="rounds-widget-note">' +
                    '<i class="fas fa-check-circle"></i> Played today — new scenario tomorrow' +
                '</span>' +
                '<a class="rounds-widget-cta secondary" href="rounds.html">View debrief <i class="fas fa-arrow-right"></i></a>' +
            '</div>'
        );
    }

    function renderAvailable(daily) {
        var meta = '';
        if (daily.specialty) meta += _escape(daily.specialty);
        if (daily.specialty && daily.difficulty) meta += ' · ';
        if (daily.difficulty) {
            meta += '<span class="rw-pill diff-' + _escape((daily.difficulty || '').toLowerCase()) + '">' +
                    _escape(daily.difficulty) + '</span>';
        }
        return (
            '<div class="rounds-widget-card">' +
                '<div class="rounds-widget-meta">' + meta + '</div>' +
                '<div class="rounds-widget-title">' + _escape(daily.title) + '</div>' +
                (daily.blurb ? '<div class="rounds-widget-blurb">' + _escape(daily.blurb) + '</div>' : '') +
            '</div>' +
            '<div class="rounds-widget-footer">' +
                '<span class="rounds-widget-note">' +
                    '<i class="fas fa-bolt"></i> ~5 min · clinical reasoning' +
                '</span>' +
                '<a class="rounds-widget-cta" href="rounds.html">Play Rounds <i class="fas fa-arrow-right"></i></a>' +
            '</div>'
        );
    }

    function renderEmpty() {
        return (
            '<div class="rounds-widget-empty">' +
                '<i class="fas fa-clipboard-list"></i>' +
                '<span>No scenarios available right now — check back soon.</span>' +
            '</div>'
        );
    }

    async function loadTodaysRounds() {
        var widget = document.getElementById('rounds-today-widget');
        var content = document.getElementById('rounds-today-content');
        if (!widget || !content) return;

        // No subscription → don't render the widget at all. The dashboard
        // already has enough upsell surface (paywalled pricing card,
        // upgrade-modal triggers). Keeping this surface clean.
        if (!window.isAuthenticated || !window.isAuthenticated()) {
            widget.hidden = true;
            return;
        }

        try {
            var data = await window.apiCall('/api/rounds/daily');
            if (!data.has_access) {
                widget.hidden = true;
                return;
            }
            if (!data.daily) {
                widget.hidden = false;
                content.innerHTML = renderEmpty();
                return;
            }
            widget.hidden = false;
            if (data.played_today && data.today_result) {
                content.innerHTML = renderPlayed(data.daily, data.today_result);
            } else {
                content.innerHTML = renderAvailable(data.daily);
            }
        } catch (err) {
            // Non-blocking — Rounds widget is optional, hide on failure
            console.warn('Today\'s Rounds widget failed to load:', err);
            widget.hidden = true;
        }
    }

    // Expose for dashboard-script.js's orchestration
    window.loadTodaysRounds = loadTodaysRounds;
})();
