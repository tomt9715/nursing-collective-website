// Auth Callback Script
// Handles OAuth callback processing for Google/Discord sign in

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');
const refreshToken = urlParams.get('refresh_token');
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
    // Check if tokens are present
    else if (!accessToken || !refreshToken) {
        console.error('Missing tokens in callback URL');
        showError('Authentication incomplete. Missing tokens.');
    }
    // Success - store tokens and redirect
    else {
        console.log('OAuth callback successful, storing tokens');

        try {
            // Store tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Fetch user data
            fetch('https://api.thenursingcollective.pro/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(async data => {
                if (data.user) {
                    // Store user data
                    localStorage.setItem('user', JSON.stringify(data.user));
                    console.log('User data stored:', data.user.email);

                    // Merge guest cart with user's cart after OAuth login
                    try {
                        if (typeof cartManager !== 'undefined') {
                            console.log('Auth callback: Merging guest cart after OAuth login...');

                            // Before merging, store guest cart item IDs so checkout can identify newly added items
                            const guestCart = cartManager.getGuestCart();
                            console.log('Auth callback: Guest cart found:', JSON.stringify(guestCart));

                            if (guestCart.items && guestCart.items.length > 0) {
                                const newlyAddedIds = guestCart.items.map(item => item.product_id);
                                sessionStorage.setItem('newlyAddedCartItems', JSON.stringify(newlyAddedIds));
                                console.log('Auth callback: Stored newly added item IDs:', newlyAddedIds);
                            } else {
                                console.log('Auth callback: No guest cart items to store');
                            }

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
