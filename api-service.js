/**
 * API Service Layer
 * Centralized API service with automatic token refresh and error handling
 * Uses HttpOnly cookies for secure JWT storage
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
    // Default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include' // Include HttpOnly cookies
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
        throw error;
    }
}

/**
 * Refresh the access token using HttpOnly cookie
 * @returns {Promise<void>}
 */
async function refreshToken() {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Send refresh token cookie
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Token refresh failed');
        }

        console.log('Token refreshed successfully');

    } catch (error) {
        console.error('Token refresh error:', error);
        throw error;
    }
}

/**
 * Logout function - calls API to clear cookies and clears local state
 */
async function performLogout() {
    try {
        // Call logout endpoint to clear HttpOnly cookies
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout API call failed:', error);
    }

    // Clear local user data
    localStorage.removeItem('user');

    // Set logout flag for cross-tab sync
    localStorage.setItem('logoutEvent', Date.now().toString());

    // Redirect to login
    window.location.href = 'login.html';
}

/**
 * Check if user is authenticated by verifying with server
 * @returns {Promise<boolean>} - True if user has valid session
 */
async function checkAuthentication() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            credentials: 'include'
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

/**
 * Synchronous check if user data exists locally
 * Note: This doesn't guarantee valid session, use checkAuthentication() for that
 * @returns {boolean}
 */
function isAuthenticated() {
    return !!localStorage.getItem('user');
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
async function requireAuth() {
    const isValid = await checkAuthentication();
    if (!isValid) {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

/**
 * Require authentication (synchronous version for initial page load)
 * Redirects immediately if no user data, then verifies with server
 */
function requireAuthSync() {
    if (!localStorage.getItem('user')) {
        window.location.href = 'login.html';
        return;
    }
    // Verify with server in background
    checkAuthentication().then(isValid => {
        if (!isValid) {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        }
    });
}

// Listen for cross-tab logout events
window.addEventListener('storage', function(e) {
    if (e.key === 'logoutEvent' && e.newValue) {
        // Another tab logged out, clear local data and redirect
        console.log('Logout detected in another tab');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
});
