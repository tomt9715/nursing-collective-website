/**
 * Smart back-link rewriter for resource & guide pages.
 *
 * Default href in HTML is ../resources.html (public).
 * If the user is logged in (localStorage 'user' exists),
 * rewrite all "Back to Resources" links to ../my-resources.html
 * so they return to the dashboard resources page instead.
 */
(function () {
    'use strict';
    try {
        var user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        var links = document.querySelectorAll(
            'a.back-link[href="../resources.html"], ' +
            'a.cta-btn-secondary[href="../resources.html"]'
        );
        for (var i = 0; i < links.length; i++) {
            links[i].href = '../my-resources.html';
        }
    } catch (e) { /* localStorage unavailable or parse error — keep defaults */ }
})();
