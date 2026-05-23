/**
 * Resources page auth-aware redirect
 *
 * Loaded early (synchronously, before content paints) on resources.html
 * so signed-in users get bounced to /my-resources.html — their in-app
 * catalog — rather than the public marketing landing.
 *
 * Anons stay on /resources.html and see the marketing version.
 *
 * Escape hatch: append ?marketing=1 to the URL to view the public page
 * even when signed in (useful for sharing or QA).
 */
(function () {
    try {
        if (window.location.search.indexOf('marketing=1') !== -1) return;
        if (localStorage.getItem('accessToken')) {
            window.location.replace('my-resources.html');
        }
    } catch (e) {
        // localStorage unavailable (private mode, etc.) — fall through and render marketing.
    }
})();
