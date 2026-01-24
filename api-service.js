/**
 * API Service Layer
 * Centralized API service with automatic token refresh and error handling
 * Used across dashboard, settings, and authentication pages
 */

// API Configuration
const API_URL = 'https://api.thenursingcollective.pro';

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
 * Check if user is authenticated
 * @returns {boolean} - True if user has valid access token
 */
function isAuthenticated() {
    return !!localStorage.getItem('accessToken');
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
 * Require authentication - redirect to login if not authenticated
 */
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
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
