/**
 * API Service Layer
 * Centralized API service with automatic token refresh and error handling
 * Used across dashboard, settings, and authentication pages
 */

// API Configuration - auto-detect environment
const API_URL = (function() {
    const hostname = window.location.hostname;
    if (hostname === 'thenursingcollective.pro' || hostname === 'www.thenursingcollective.pro') {
        return 'https://api.thenursingcollective.pro';
    }
    // Staging: preview branches, localhost, and any non-production host
    console.log('[API] Using staging backend');
    return 'https://staging-backend-production-365a.up.railway.app';
})();

/**
 * Centralized API calling function with automatic token refresh
 * @param {string} endpoint - API endpoint (e.g., '/user/profile')
 * @param {object} options - Fetch options (method, body, etc.)
 * @param {boolean} isRetry - Internal flag to prevent infinite retry loops
 * @returns {Promise<object>} - Response data
 */
async function apiCall(endpoint, options = {}, isRetry = false) {
    const token = localStorage.getItem('accessToken');

    // Default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Add authorization header if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include' // Include cookies for httpOnly refresh token
        });

        // Handle 401 Unauthorized - Token expired
        if (response.status === 401 && !isRetry) {
            console.log('Access token expired, attempting refresh...');

            try {
                // Attempt to refresh the token
                await refreshToken();

                // Retry the original request with new token
                return await apiCall(endpoint, options, true);

            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Refresh failed, logout user
                performLogout();
                throw new Error('Session expired. Please login again.');
            }
        }

        // Parse response
        const data = await response.json();

        // Handle other errors
        if (!response.ok) {
            throw new Error(data.error || `Request failed with status ${response.status}`);
        }

        return data;

    } catch (error) {
        // Network or parsing error
        if (error.message.includes('Session expired')) {
            throw error;
        }
        console.error('API call error:', error);

        // Report to Sentry with context
        if (typeof captureError === 'function') {
            captureError(error, {
                endpoint: endpoint,
                method: options.method || 'GET',
                hasToken: !!token
            });
        }

        throw error;
    }
}

/**
 * Refresh the access token using the httpOnly cookie refresh token
 * @returns {Promise<string>} - New access token
 */
async function refreshToken() {
    try {
        // Refresh token is sent automatically via httpOnly cookie
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Include httpOnly cookie with refresh token
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Token refresh failed');
        }

        // Update access token (refresh token stays in httpOnly cookie)
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('tokenTimestamp', Date.now().toString());

        console.log('Token refreshed successfully');
        return data.access_token;

    } catch (error) {
        console.error('Token refresh error:', error);
        throw error;
    }
}

// Flag to prevent multiple logout redirects
let isLoggingOut = false;

/**
 * Logout function with cross-tab synchronization
 * Calls backend to revoke refresh token and clear httpOnly cookie
 */
async function performLogout() {
    // Prevent redirect loop
    if (isLoggingOut) {
        console.log('Logout already in progress');
        return;
    }
    isLoggingOut = true;

    try {
        // Call backend to revoke session and clear httpOnly cookie
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Include httpOnly cookie
        });
    } catch (error) {
        // Log error but continue with local cleanup
        console.error('Backend logout error:', error);
    }

    // Clear all local auth data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenTimestamp');

    // Set logout flag for cross-tab sync
    localStorage.setItem('logoutEvent', Date.now().toString());

    // Redirect to login
    window.location.href = 'login.html';
}

/**
 * Check if user is authenticated (has token in storage)
 * Note: This only checks token presence, not validity.
 * Use ensureValidToken() for a full validity check with refresh.
 * @returns {boolean} - True if user has access token stored
 */
function isAuthenticated() {
    return !!localStorage.getItem('accessToken');
}

/**
 * Check if the stored access token is likely expired
 * Uses tokenTimestamp to estimate without decoding the JWT
 * @returns {boolean} - True if token is likely expired
 */
function isTokenStale() {
    const timestamp = localStorage.getItem('tokenTimestamp');
    if (!timestamp) return true; // No timestamp = assume stale
    const ageMs = Date.now() - parseInt(timestamp, 10);
    // Access tokens expire in 15 min (900s). Treat as stale after 14 min.
    return ageMs > 14 * 60 * 1000;
}

/**
 * Ensure the user has a valid (non-expired) access token.
 * If the token is stale, attempts a silent refresh using the httpOnly cookie.
 * @returns {Promise<boolean>} - True if user has a valid token, false if session is dead
 */
async function ensureValidToken() {
    if (!isAuthenticated()) return false;
    if (!isTokenStale()) return true; // Token is fresh, no action needed

    // Token looks expired — try a silent refresh
    try {
        await refreshToken();
        return true;
    } catch (e) {
        // Refresh failed — session is truly expired, clean up
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenTimestamp');
        return false;
    }
}

/**
 * Get current user from localStorage
 * @returns {object} - User object or empty object
 */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
}

/**
 * Update current user in localStorage
 * @param {object} userData - User data to store
 */
function setCurrentUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

/**
 * Require authentication - redirect to login if not authenticated.
 * Tries a silent token refresh for returning users with stale tokens.
 * Returns a promise so callers can await it before rendering.
 */
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return Promise.resolve(false);
    }

    // If token looks stale, try refreshing before proceeding
    if (isTokenStale()) {
        return ensureValidToken().then(function(valid) {
            if (!valid) {
                window.location.href = 'login.html';
            }
            return valid;
        });
    }

    return Promise.resolve(true);
}

// Listen for cross-tab logout events
window.addEventListener('storage', function(e) {
    if (e.key === 'logoutEvent' && e.newValue) {
        // Another tab logged out, clear local data and redirect
        // (httpOnly cookie was already cleared by the first tab's backend call)
        console.log('Logout detected in another tab');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenTimestamp');
        window.location.href = 'login.html';
    }
});

// =============================================================================
// PROFILE PICTURE HELPERS
// =============================================================================

/**
 * Get the full image URL for a profile picture value.
 * @param {string} profilePicture - Either a default icon filename or a full URL
 * @returns {string} Full URL to the image
 */
function getProfilePictureUrl(profilePicture) {
    if (!profilePicture) profilePicture = 'robot.png';

    // If it's already a full URL (custom upload), return as-is
    if (profilePicture.startsWith('http://') || profilePicture.startsWith('https://')) {
        return profilePicture;
    }

    // Otherwise it's a default icon filename
    // Determine base path based on current page depth
    var basePath = '';
    if (window.location.pathname.includes('/quiz-bank/')) {
        basePath = '../';
    } else if (window.location.pathname.includes('/guides/')) {
        basePath = '../';
    }
    return basePath + 'assets/images/default-profile/' + profilePicture;
}

/**
 * Render a profile picture <img> element as HTML string.
 * @param {string} profilePicture - The profile_picture value from user data
 * @param {string} size - CSS class suffix: 'sm' (28px), 'md' (40px), 'lg' (64px), 'xl' (96px)
 * @param {string} alt - Alt text
 * @returns {string} HTML string
 */
function renderProfilePicture(profilePicture, size, alt) {
    var url = getProfilePictureUrl(profilePicture);
    var safeUrl = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    var safeAlt = (alt || 'Profile').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return '<img src="' + safeUrl + '" alt="' + safeAlt + '" class="profile-pic profile-pic--' + (size || 'md') + '" loading="lazy">';
}

// =============================================================================
// SUBSCRIPTION SERVICE
// =============================================================================

/**
 * Check if the current user has an active subscription
 * @returns {Promise<{hasAccess: boolean, subscription: object|null}>}
 */
async function checkSubscriptionStatus() {
    if (!isAuthenticated()) {
        return { hasAccess: false, subscription: null };
    }

    try {
        const data = await apiCall('/api/subscription-status');
        return {
            hasAccess: data.has_access,
            subscription: data.subscription
        };
    } catch (error) {
        console.error('Error checking subscription status:', error);
        return { hasAccess: false, subscription: null };
    }
}

/**
 * Get available subscription plans
 * @returns {Promise<object>} - Plans object
 */
async function getSubscriptionPlans() {
    try {
        const response = await fetch(`${API_URL}/api/subscription-plans`);
        const data = await response.json();
        return data.plans;
    } catch (error) {
        console.error('Error fetching subscription plans:', error);
        return {};
    }
}

/**
 * Create a subscription checkout session
 * @param {string} planId - Plan ID (monthly-access, semester-access, lifetime-access)
 * @param {string} email - Customer email
 * @returns {Promise<{url: string}>} - Checkout URL
 */
async function createSubscriptionCheckout(planId, email) {
    const response = await fetch(`${API_URL}/api/create-subscription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            plan_id: planId,
            email: email,
            success_url: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
            cancel_url: `${window.location.origin}/pricing.html`
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
    }

    return data;
}

// =============================================================================
// CONTENT ACCESS CONTROL
// =============================================================================

/**
 * Content classification for gating
 */
const CONTENT_ACCESS = {
    // Free content - accessible without login
    free: [
        '/resources/how-to-study.html',
        '/resources/not-overwhelmed.html',
        '/resources/time-management.html',
        '/resources/care-plans.html',
        '/resources/feeling-like-failing.html'
    ],
    // Paid content - requires active subscription
    paid: [
        // Study guides
        '/guides/',
        // Clinical confidence
        '/resources/first-semester-clinicals.html',
        '/resources/night-before-clinicals.html',
        '/resources/clinical-bag.html',
        '/resources/head-to-toe-assessment.html',
        '/resources/clinical-skills.html',
        '/resources/clinical-safety.html',
        '/resources/when-you-dont-know.html',
        // Quick reference tools
        '/resources/lab-values.html',
        '/resources/vital-signs.html',
        '/resources/medications.html',
        '/resources/documentation-phrases.html',
        '/resources/abbreviations.html'
    ]
};

/**
 * Check if a path requires a subscription
 * @param {string} path - Page path (e.g., '/guides/heart-failure.html')
 * @returns {boolean}
 */
function requiresSubscription(path) {
    // Normalize path
    const normalizedPath = path.startsWith('/') ? path : '/' + path;

    // Check if it's explicitly free
    if (CONTENT_ACCESS.free.some(freePath => normalizedPath === freePath)) {
        return false;
    }

    // Check if it matches paid content patterns
    return CONTENT_ACCESS.paid.some(paidPath => {
        if (paidPath.endsWith('/')) {
            // Directory pattern - check if path starts with it
            return normalizedPath.startsWith(paidPath);
        }
        return normalizedPath === paidPath;
    });
}

/**
 * Check access and redirect if needed
 * Call this on paid content pages
 * @returns {Promise<boolean>} - True if user has access
 */
async function checkContentAccess() {
    const path = window.location.pathname;

    // Check if this content requires subscription
    if (!requiresSubscription(path)) {
        return true; // Free content
    }

    // Check subscription status
    const { hasAccess } = await checkSubscriptionStatus();

    if (!hasAccess) {
        // Store the intended destination for redirect after subscription
        sessionStorage.setItem('redirectAfterSubscribe', path);

        // Show paywall or redirect to pricing
        showPaywall();
        return false;
    }

    return true;
}

/**
 * Show paywall modal/overlay for non-subscribers
 */
function showPaywall() {
    // Check if paywall already exists
    if (document.getElementById('paywall-overlay')) {
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'paywall-overlay';
    overlay.innerHTML = `
        <div class="paywall-content">
            <div class="paywall-icon">
                <i class="fas fa-lock"></i>
            </div>
            <h2>Premium Content</h2>
            <p>This study guide is available to subscribers. Get unlimited access to all guides, clinical resources, and quick reference tools.</p>
            <div class="paywall-pricing">
                <div class="paywall-price">Starting at <strong>$14.99/month</strong></div>
                <div class="paywall-or">or</div>
                <div class="paywall-price"><strong>$119</strong> for lifetime access</div>
            </div>
            <div class="paywall-buttons">
                <a href="/pricing.html" class="btn btn-primary btn-lg">View Plans</a>
                <a href="/resources.html" class="btn btn-outline-secondary">Browse Free Resources</a>
            </div>
            ${!isAuthenticated() ? '<p class="paywall-login">Already a subscriber? <a href="/login.html">Log in</a></p>' : ''}
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #paywall-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .paywall-content {
            background: var(--card-background, #fff);
            border-radius: 20px;
            padding: 48px;
            max-width: 500px;
            text-align: center;
        }
        .paywall-icon {
            font-size: 48px;
            color: var(--primary-color, #2E86AB);
            margin-bottom: 24px;
        }
        .paywall-content h2 {
            font-size: 28px;
            margin-bottom: 16px;
            color: var(--text-primary, #1a1a1a);
        }
        .paywall-content p {
            color: var(--text-secondary, #666);
            margin-bottom: 24px;
            line-height: 1.6;
        }
        .paywall-pricing {
            background: var(--background-light, #f5f5f5);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .paywall-price {
            font-size: 18px;
            color: var(--text-primary, #1a1a1a);
        }
        .paywall-or {
            color: var(--text-secondary, #666);
            font-size: 14px;
            margin: 8px 0;
        }
        .paywall-buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .paywall-buttons .btn {
            width: 100%;
        }
        .paywall-login {
            margin-top: 16px;
            font-size: 14px;
        }
        .paywall-login a {
            color: var(--primary-color, #2E86AB);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}
