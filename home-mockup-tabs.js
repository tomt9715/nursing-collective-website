/**
 * Makes the hero mockup widget on index.html interactive:
 * clicking a tab swaps in the cards for that tab's panel.
 */
(function () {
    'use strict';

    var root = document.querySelector('.hero-mockup');
    if (!root) return;

    var tabs = root.querySelectorAll('[role="tab"]');
    var panels = root.querySelectorAll('[role="tabpanel"]');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = tab.getAttribute('data-tab');

            tabs.forEach(function (t) {
                var active = t === tab;
                t.classList.toggle('active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
                t.setAttribute('tabindex', active ? '0' : '-1');
            });

            panels.forEach(function (p) {
                p.hidden = p.getAttribute('data-panel') !== target;
            });
        });
    });
})();
