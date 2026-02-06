/**
 * Practice Questions — Reusable toggle/reveal logic for NCLEX Challenge sections.
 * Loaded on any guide page that has practice questions.
 * All interactivity via data attributes (CSP-compliant, no inline handlers).
 */
(function () {
    'use strict';

    function init() {
        // Toggle individual answer reveals
        document.querySelectorAll('[data-toggle-answer]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = btn.getAttribute('data-toggle-answer');
                var answer = document.getElementById(targetId);
                if (!answer) return;

                var isHidden = answer.classList.contains('pq-answer--hidden');
                answer.classList.toggle('pq-answer--hidden', !isHidden);
                answer.classList.toggle('pq-answer--visible', isHidden);
                btn.textContent = isHidden ? 'Hide Answer' : 'Show Answer';
                btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
            });

            // Keyboard accessibility
            btn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });

        // "Show All / Hide All" master toggle
        document.querySelectorAll('[data-toggle-all-answers]').forEach(function (masterBtn) {
            masterBtn.addEventListener('click', function () {
                var section = masterBtn.closest('.practice-questions');
                if (!section) return;

                var answers = section.querySelectorAll('.pq-answer');
                var buttons = section.querySelectorAll('[data-toggle-answer]');
                var anyHidden = false;

                answers.forEach(function (a) {
                    if (a.classList.contains('pq-answer--hidden')) anyHidden = true;
                });

                // If any are hidden, show all; otherwise hide all
                answers.forEach(function (a) {
                    a.classList.toggle('pq-answer--hidden', !anyHidden);
                    a.classList.toggle('pq-answer--visible', anyHidden);
                });
                buttons.forEach(function (b) {
                    b.textContent = anyHidden ? 'Hide Answer' : 'Show Answer';
                    b.setAttribute('aria-expanded', anyHidden ? 'true' : 'false');
                });

                masterBtn.textContent = anyHidden ? 'Hide All Answers' : 'Show All Answers';
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
