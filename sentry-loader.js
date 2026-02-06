// Deferred Sentry loading for faster page load
// Loads Sentry SDK after page is interactive
function loadSentry() {
    var script = document.createElement('script');
    script.src = 'https://browser.sentry-cdn.com/8.40.0/bundle.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = function() {
        var initScript = document.createElement('script');
        initScript.src = 'sentry-init.js';
        document.body.appendChild(initScript);
    };
    document.body.appendChild(script);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSentry);
} else {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadSentry);
    } else {
        setTimeout(loadSentry, 1);
    }
}
