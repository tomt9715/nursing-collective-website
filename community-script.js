/**
 * Community Hub — fetch live Discord stats, featured channels + FAQ accordion
 */
(function () {
    'use strict';

    // Use the global API_URL const set by api-service.js (loaded before this script)
    var apiBase = (typeof API_URL !== 'undefined') ? API_URL : '';

    // ── Fetch Discord stats ───────────────────────────────────────
    function fetchStats() {
        fetch(apiBase + '/api/community/stats')
            .then(function (res) { return res.json(); })
            .then(function (data) {
                // Hero pills
                if (data.member_count != null) {
                    var el = document.getElementById('stat-members-count');
                    if (el) el.textContent = data.member_count.toLocaleString();
                    var pill = document.getElementById('stat-members');
                    if (pill) pill.classList.add('visible');
                }

                if (data.online_count != null) {
                    var el = document.getElementById('stat-online-count');
                    if (el) el.textContent = data.online_count.toLocaleString();
                    var pill = document.getElementById('stat-online');
                    if (pill) pill.classList.add('visible');
                }

                // Stat cards
                if (data.member_count != null) {
                    var card = document.getElementById('stat-card-members');
                    var val = document.getElementById('stat-card-members-val');
                    if (card && val) {
                        val.textContent = data.member_count.toLocaleString();
                        card.classList.add('visible');
                    }
                }

                if (data.online_count != null) {
                    var card = document.getElementById('stat-card-online');
                    var val = document.getElementById('stat-card-online-val');
                    if (card && val) {
                        val.textContent = data.online_count.toLocaleString();
                        card.classList.add('visible');
                    }
                }

                if (data.channel_count != null) {
                    var card = document.getElementById('stat-card-channels');
                    var val = document.getElementById('stat-card-channels-val');
                    if (card && val) {
                        val.textContent = data.channel_count.toLocaleString();
                        card.classList.add('visible');
                    }
                }
            })
            .catch(function () {
                // Stats stay hidden on failure — graceful degradation
            });
    }

    // ── Fetch featured channels ───────────────────────────────────

    // Curated list of channels to feature (by name, in priority order)
    var FEATURED_CHANNELS = [
        'general-chat', 'nclex-prep', 'study-buddy-finder',
        'clinical-tips', 'help-desk', 'patho-pharm',
        'med-surge', 'wins-and-progress', 'break-room'
    ];

    // Friendly descriptions for channels without topics
    var CHANNEL_DESCRIPTIONS = {
        'general-chat': 'Chat about anything nursing-related with your peers',
        'nclex-prep': 'Share tips, questions, and strategies for NCLEX success',
        'study-buddy-finder': 'Find study partners and form study groups',
        'clinical-tips': 'Share and learn clinical skills from fellow students',
        'help-desk': 'Get help with nursing questions or server support',
        'patho-pharm': 'Discuss pathophysiology and pharmacology topics',
        'med-surge': 'Medical-surgical nursing discussions and resources',
        'wins-and-progress': 'Celebrate your achievements and milestones',
        'break-room': 'Take a break and hang out with the community',
        'fundamentals': 'Nursing fundamentals questions and discussions',
        'ob-maternity': 'OB and maternity nursing topics',
        'pediatrics': 'Pediatric nursing discussions',
        'mental-health': 'Mental health nursing topics and support',
        'suggestions-box': 'Share your ideas to make the community better'
    };

    function fetchChannels() {
        fetch(apiBase + '/api/community/channels')
            .then(function (res) { return res.json(); })
            .then(function (data) {
                var channels = data.channels || [];
                if (channels.length === 0) return;

                // Build lookup by name
                var byName = {};
                for (var i = 0; i < channels.length; i++) {
                    byName[channels[i].name] = channels[i];
                }

                // Pick featured channels in priority order
                var featured = [];
                for (var j = 0; j < FEATURED_CHANNELS.length; j++) {
                    var ch = byName[FEATURED_CHANNELS[j]];
                    if (ch && featured.length < 6) {
                        featured.push(ch);
                    }
                }

                // Fallback: if curated list didn't match, take first 6 non-system channels
                if (featured.length === 0) {
                    featured = channels.filter(function (c) {
                        return c.name !== 'rules' && c.name !== 'start-here' && c.name !== 'faq';
                    }).slice(0, 6);
                }

                if (featured.length === 0) return;

                var grid = document.getElementById('community-discussions-grid');
                var wrapper = document.getElementById('community-discussions');
                if (!grid || !wrapper) return;

                var html = '';
                for (var k = 0; k < featured.length; k++) {
                    var fc = featured[k];
                    var displayName = '#' + fc.name;
                    var description = fc.topic || CHANNEL_DESCRIPTIONS[fc.name] || fc.category || 'Join the conversation';
                    var categoryBadge = fc.category
                        ? '<span class="community-channel-badge">' + escapeHTML(fc.category) + '</span>'
                        : '';

                    html +=
                        '<div class="community-channel-card">' +
                            '<div class="community-channel-icon"><i class="fas fa-hashtag"></i></div>' +
                            '<div class="community-channel-info">' +
                                '<div class="community-channel-name">' + escapeHTML(displayName) + '</div>' +
                                '<div class="community-channel-topic">' + escapeHTML(description) + '</div>' +
                                categoryBadge +
                            '</div>' +
                        '</div>';
                }

                grid.innerHTML = html;
                wrapper.classList.add('visible');
            })
            .catch(function () {
                // Featured channels stay hidden on failure
            });
    }

    // ── Helpers ───────────────────────────────────────────────────
    function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ── FAQ accordion ─────────────────────────────────────────────
    function initFAQ() {
        var faqList = document.getElementById('community-faq-list');
        if (!faqList) return;

        faqList.addEventListener('click', function (e) {
            var btn = e.target.closest('.community-faq-question');
            if (!btn) return;

            var item = btn.parentElement;
            var answer = item.querySelector('.community-faq-answer');
            var isOpen = item.classList.contains('open');

            // Close all open items
            var openItems = faqList.querySelectorAll('.community-faq-item.open');
            for (var i = 0; i < openItems.length; i++) {
                openItems[i].classList.remove('open');
                openItems[i].querySelector('.community-faq-question').setAttribute('aria-expanded', 'false');
                openItems[i].querySelector('.community-faq-answer').style.maxHeight = '0';
            }

            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    }

    // ── Init ──────────────────────────────────────────────────────
    function init() {
        fetchStats();
        fetchChannels();
        initFAQ();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
