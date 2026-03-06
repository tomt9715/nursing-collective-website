/**
 * Homepage redirect for logged-in users.
 *
 * If the visitor has a 'user' key in localStorage (i.e. is logged in),
 * redirect them to the dashboard immediately — before the page paints.
 *
 * Bypass: add ?home=true to the URL to stay on the homepage.
 * Only runs on index.html / the site root.
 */
(function () {
    'use strict';
    try {
        if (new URLSearchParams(window.location.search).has('home')) return;
        if (!localStorage.getItem('user')) return;
        window.location.replace('dashboard.html');
    } catch (e) { /* localStorage unavailable — do nothing */ }
})();
