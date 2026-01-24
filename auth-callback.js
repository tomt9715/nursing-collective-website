// Auth Callback Script
// Handles OAuth callback processing for Google/Discord sign in

// CRITICAL: Capture guest cart IMMEDIATELY before any other code runs
// This must happen before tokens are stored (which changes auth state)
// and before cart-service.js DOMContentLoaded can interfere
const GUEST_CART_KEY_CAPTURE = 'florencebot_guest_cart';
let capturedGuestCart = null;

// DEBUG: Log that auth-callback.js is running
console.log('=== AUTH CALLBACK SCRIPT LOADED ===');
console.log('Auth callback: Current URL:', window.location.href);

try {
    const storedGuestCart = localStorage.getItem(GUEST_CART_KEY_CAPTURE);
    console.log('Auth callback: Raw guest cart from localStorage:', storedGuestCart);

    // DEBUG: Also log all localStorage keys to see what's there
    console.log('Auth callback: All localStorage keys:', Object.keys(localStorage));

    if (storedGuestCart) {
        capturedGuestCart = JSON.parse(storedGuestCart);
        console.log('Auth callback: Parsed guest cart:', JSON.stringify(capturedGuestCart));
        console.log('Auth callback: Guest cart has', capturedGuestCart.items?.length || 0, 'items');
    } else {
        console.log('Auth callback: NO GUEST CART FOUND in localStorage');
    }
} catch (e) {
    console.error('Auth callback: Failed to capture guest cart:', e);
}

// Parse URL parameters
// Note: refresh_token is now set as an httpOnly cookie by the backend, not in URL
const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');
const error = urlParams.get('error');
const orderToClaim = urlParams.get('order'); // Order to claim after OAuth login

// Check for stored redirect from before OAuth (e.g., checkout flow)
const storedRedirect = sessionStorage.getItem('authRedirect');

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
            fetch('https://api.thenursingcollective.pro/auth/me', {
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

                    // Store guest cart item IDs BEFORE merging so checkout can identify newly added items
                    // Use the capturedGuestCart that was read at script load time (before any interference)
                    console.log('Auth callback: Using captured guest cart:', JSON.stringify(capturedGuestCart));

                    if (capturedGuestCart && capturedGuestCart.items && capturedGuestCart.items.length > 0) {
                        const newlyAddedIds = capturedGuestCart.items.map(item => item.product_id);
                        sessionStorage.setItem('newlyAddedCartItems', JSON.stringify(newlyAddedIds));
                        console.log('Auth callback: Stored newly added item IDs in sessionStorage:', newlyAddedIds);
                        // Verify it was stored
                        const verification = sessionStorage.getItem('newlyAddedCartItems');
                        console.log('Auth callback: Verification - sessionStorage now contains:', verification);
                    } else {
                        console.log('Auth callback: No guest cart items found to store');
                        console.log('Auth callback: capturedGuestCart value:', capturedGuestCart);
                        console.log('Auth callback: capturedGuestCart.items:', capturedGuestCart?.items);
                    }

                    // Now merge guest cart with user's cart via API
                    try {
                        if (typeof cartManager !== 'undefined') {
                            console.log('Auth callback: Merging guest cart after OAuth login...');
                            await cartManager.mergeGuestCart();
                            console.log('Auth callback: Guest cart merged successfully');
                        } else {
                            console.warn('Auth callback: cartManager not defined');
                        }
                    } catch (cartError) {
                        console.error('Cart merge error (non-fatal):', cartError);
                        // Continue with redirect even if cart merge fails
                    }

                    // Determine redirect URL based on priority:
                    // 1. Stored redirect from before OAuth (e.g., store, checkout)
                    // 2. Order to claim
                    // 3. Default to dashboard
                    let redirectUrl = 'dashboard.html';

                    if (storedRedirect) {
                        // Redirect back to the page user came from (store, checkout, etc.)
                        redirectUrl = `${storedRedirect}.html`;
                        // Clear the stored redirect
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
                    redirectUrl = `${storedRedirect}.html`;
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
