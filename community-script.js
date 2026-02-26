/**
 * Community Hub — fetch live Discord stats + FAQ accordion
 */
(function () {
    'use strict';

    // ── Fetch Discord stats ───────────────────────────────────────
    function fetchStats() {
        var API_URL = window.API_URL || '';

        fetch(API_URL + '/api/community/stats')
            .then(function (res) { return res.json(); })
            .then(function (data) {
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
            })
            .catch(function () {
                // Stats stay hidden on failure — graceful degradation
            });
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
        initFAQ();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
