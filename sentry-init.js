/**
 * Sentry Error Tracking Initialization
 * The Nursing Collective
 *
 * This file initializes Sentry for frontend error tracking.
 * Load this script FIRST, before other JavaScript files.
 */

(function() {
    // Configuration
    const SENTRY_DSN = 'https://20565c8c7d62e106f2ad153305cd0d87@o4510760021590016.ingest.us.sentry.io/4510760027684864';
    const ENVIRONMENT = window.location.hostname === 'thenursingcollective.pro' ? 'production' : 'development';
    const RELEASE = '1.0.0'; // Update this with each release

    // Only initialize in production or if DSN is configured
    if (SENTRY_DSN === 'YOUR_SENTRY_DSN_HERE') {
        console.log('[Sentry] DSN not configured - error tracking disabled');
        return;
    }

    // Initialize Sentry
    if (typeof Sentry !== 'undefined') {
        Sentry.init({
            dsn: SENTRY_DSN,
            environment: ENVIRONMENT,
            release: RELEASE,

            // Performance monitoring (optional - uses quota)
            tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev

            // Session replay for debugging (optional - uses quota)
            replaysSessionSampleRate: 0, // Disabled to save quota
            replaysOnErrorSampleRate: ENVIRONMENT === 'production' ? 0.1 : 0, // 10% of errors in prod

            // Filter out known non-issues
            ignoreErrors: [
                // Browser extensions
                'top.GLOBALS',
                'originalCreateNotification',
                'canvas.contentDocument',
                'MyApp_RemoveAllHighlights',
                'http://tt.teleport.com',
                'atomicFindClose',

                // Facebook/social widgets
                'fb_xd_fragment',

                // Chrome extensions
                /^chrome:\/\//i,
                /^chrome-extension:\/\//i,

                // Network errors that aren't actionable
                'Network request failed',
                'Failed to fetch',
                'NetworkError',
                'Load failed',

                // User cancelled
                'AbortError',
                'The operation was aborted',

                // Stripe handled errors
                'StripeError',
            ],

            // Don't send errors from these URLs
            denyUrls: [
                // Chrome extensions
                /extensions\//i,
                /^chrome:\/\//i,
                /^chrome-extension:\/\//i,

                // Firefox extensions
                /^moz-extension:\/\//i,

                // Safari extensions
                /^safari-extension:\/\//i,

                // Third-party scripts
                /cloudflareinsights\.com/i,
                /googletagmanager\.com/i,
                /google-analytics\.com/i,
            ],

            // Add context before sending
            beforeSend(event, hint) {
                // Don't send errors in development unless DSN is configured
                if (ENVIRONMENT === 'development' && SENTRY_DSN === 'YOUR_SENTRY_DSN_HERE') {
                    return null;
                }

                // Add user context if available
                try {
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    if (user.id || user.email) {
                        event.user = {
                            id: user.id,
                            email: user.email,
                            username: user.name || user.display_name
                        };
                    }
                } catch (e) {
                    // Ignore errors reading user data
                }

                // Add page context
                event.tags = event.tags || {};
                event.tags.page = window.location.pathname;
                event.tags.theme = document.documentElement.getAttribute('data-theme') || 'light';

                return event;
            }
        });

        // Set initial context
        Sentry.setTag('site', 'thenursingcollective');

        console.log(`[Sentry] Initialized (${ENVIRONMENT})`);
    } else {
        console.warn('[Sentry] SDK not loaded');
    }
})();

/**
 * Helper function to manually capture errors with context
 * Usage: captureError(error, { action: 'checkout', productId: '123' })
 */
function captureError(error, context = {}) {
    if (typeof Sentry !== 'undefined') {
        Sentry.withScope(function(scope) {
            Object.entries(context).forEach(([key, value]) => {
                scope.setExtra(key, value);
            });
            Sentry.captureException(error);
        });
    } else {
        console.error('[Error]', error, context);
    }
}

/**
 * Helper function to track user actions for debugging
 * Usage: trackAction('add_to_cart', { productId: '123', price: 5.99 })
 */
function trackAction(action, data = {}) {
    if (typeof Sentry !== 'undefined') {
        Sentry.addBreadcrumb({
            category: 'user-action',
            message: action,
            data: data,
            level: 'info'
        });
    }
}
