/**
 * flatpickr-init — auto-upgrade every <input type="date"> with a themed
 * flatpickr calendar. Watches the DOM so modals / setup wizards that inject
 * date inputs later get upgraded automatically.
 *
 * Keeps the original input's value in ISO (Y-m-d) so existing change handlers
 * still work. The visible altInput shows a friendlier "Apr 24, 2026" format
 * and inherits the original input's className for styling.
 */
(function () {
    'use strict';

    if (typeof flatpickr === 'undefined') return;

    var BASE = {
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'M j, Y',
        allowInput: false,
        disableMobile: true,
        monthSelectorType: 'static'
    };

    function init(el) {
        if (!el || el._flatpickr) return;
        if (el.dataset && el.dataset.noFp === 'true') return;
        try {
            var opts = Object.assign({}, BASE);
            if (el.className) opts.altInputClass = el.className + ' flatpickr-alt';
            flatpickr(el, opts);
        } catch (e) {
            // Swallow — a broken picker shouldn't break the page
        }
    }

    function initAll(root) {
        (root || document).querySelectorAll('input[type="date"]').forEach(init);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { initAll(); });
    } else {
        initAll();
    }

    // Pick up date inputs that show up after load (modals, dynamic rows)
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
            m.addedNodes.forEach(function (node) {
                if (node.nodeType !== 1) return;
                if (node.matches && node.matches('input[type="date"]')) {
                    init(node);
                }
                if (node.querySelectorAll) initAll(node);
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
