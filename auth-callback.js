// Auth Callback Script
// Handles OAuth callback processing for Google/Discord sign in

// DEBUG: Log that auth-callback.js is running
console.log('=== AUTH CALLBACK SCRIPT LOADED ===');
console.log('Auth callback: Current URL:', window.location.href);

// Parse URL parameters
// Note: refresh_token is now set as an httpOnly cookie by the backend, not in URL
const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');
const error = urlParams.get('error');
const orderToClaim = urlParams.get('order'); // Order to claim after OAuth login

// Check for stored redirect from before OAuth (e.g., checkout flow)
const storedRedirect = sessionStorage.getItem('authRedirect');

// Safely resolve redirect URL — only allow our own subdomains for full URLs
function resolveRedirect(value) {
    if (!value) return null;
    if (value.startsWith('http')) {
        try {
            const url = new URL(value);
            if (url.hostname.endsWith('.thenursingcollective.pro') || url.hostname === 'thenursingcollective.pro') {
                return value;
            }
        } catch (e) { /* invalid URL */ }
        return null; // reject external URLs
    }
    return `${value}.html`;
}

const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const errorMessage = document.getElementById('error-message');

// Track when page loaded to ensure minimum display time
const pageLoadTime = Date.now();
const MIN_LOADING_TIME = 500; // 0.5 seconds minimum - just enough to avoid flashing

// Helper function to ensure minimum loading time before redirect
async function redirectWithMinTime(redirectFn) {
    const elapsedTime = Date.now() - pageLoadTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

    if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
    }

    redirectFn();
}

function showError(message) {
    loadingState.style.display = 'none';
    errorState.style.display = 'block';
    errorMessage.textContent = message;
}

// Initialize auth callback processing
function initAuthCallback() {
    // Check for errors in URL
    if (error) {
        console.error('OAuth error:', error);
        showError('Authentication failed. Please try again.');
    }
    // Check if access token is present (refresh token comes via httpOnly cookie)
    else if (!accessToken) {
        console.error('Missing access token in callback URL');
        showError('Authentication incomplete. Missing access token.');
    }
    // Success - store access token and redirect (refresh token is in httpOnly cookie)
    else {
        console.log('OAuth callback successful, storing access token');

        try {
            // Store access token (refresh token is set as httpOnly cookie by backend)
            localStorage.setItem('accessToken', accessToken);

            // Fetch user data
            fetch(`${API_URL}/user/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Include httpOnly cookies
            })
            .then(response => response.json())
            .then(async data => {
                if (data.user) {
                    // Store user data
                    localStorage.setItem('user', JSON.stringify(data.user));
                    console.log('User data stored:', data.user.email);

                    // Determine redirect URL based on priority:
                    // 1. Stored redirect from before OAuth (e.g., checkout)
                    // 2. Order to claim
                    // 3. Default to dashboard
                    let redirectUrl = 'dashboard.html';

                    if (storedRedirect) {
                        var resolved = resolveRedirect(storedRedirect);
                        if (resolved) redirectUrl = resolved;
                        sessionStorage.removeItem('authRedirect');
                    } else if (orderToClaim) {
                        redirectUrl = `dashboard.html?order=${encodeURIComponent(orderToClaim)}`;
                    }

                    console.log('Redirecting to:', redirectUrl);

                    // Redirect with minimum loading time
                    redirectWithMinTime(() => {
                        window.location.href = redirectUrl;
                    });
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Still redirect even if user fetch fails
                // The target page can try to fetch user data again
                let redirectUrl = 'dashboard.html';

                if (storedRedirect) {
                    var resolved = resolveRedirect(storedRedirect);
                    if (resolved) redirectUrl = resolved;
                    sessionStorage.removeItem('authRedirect');
                } else if (orderToClaim) {
                    redirectUrl = `dashboard.html?order=${encodeURIComponent(orderToClaim)}`;
                }

                redirectWithMinTime(() => {
                    window.location.href = redirectUrl;
                });
            });

        } catch (error) {
            console.error('Error storing tokens:', error);
            showError('Failed to complete sign in. Please try again.');
        }
    }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initAuthCallback);
