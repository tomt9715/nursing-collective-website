/**
 * Quiz Bank Initialization
 * Bootstraps the QuizBank hub after DOM is ready.
 */
(function () {
    'use strict';

    function boot() {
        if (typeof QuizBank !== 'undefined' && QuizBank.init) {
            QuizBank.init();
        } else {
            console.error('[QuizBank] QuizBank not loaded');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
