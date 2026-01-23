// Success Page JavaScript
// Payment verification and order confirmation

// Configuration - Main backend API URL for cart/order operations
const API_BASE_URL = 'https://api.thenursingcollective.pro';

// Polling configuration
const POLL_INTERVAL = 3000; // 3 seconds
const MAX_POLL_TIME = 30000; // 30 seconds
let pollStartTime = null;
let pollTimer = null;

/**
 * Initialize success page
 */
async function initSuccessPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const paymentIntent = urlParams.get('payment_intent');
    const orderNumber = urlParams.get('order_number');

    console.log('Success page params:', { sessionId, paymentIntent, orderNumber });

    if (!sessionId && !paymentIntent) {
        showErrorState('No payment information found. Please check your email for order confirmation.');
        return;
    }

    await verifyPayment(paymentIntent, sessionId);
}

/**
 * Verify payment status using the new verify endpoint
 */
async function verifyPayment(paymentIntent, sessionId) {
    try {
        // Build query params
        const params = new URLSearchParams();
        if (paymentIntent) params.append('payment_intent', paymentIntent);
        if (sessionId) params.append('session_id', sessionId);

        const response = await fetch(`${API_BASE_URL}/cart/orders/verify?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('Verify response:', data);

        if (data.success && data.order) {
            // Payment verified successfully
            showSuccessState(data.order);
        } else if (data.status === 'pending') {
            // Payment is processing - show pending state and start polling
            showPendingState();
            startPolling(paymentIntent, sessionId);
        } else {
            // Not found or error
            showErrorState(data.message || 'Payment could not be verified. Please contact support if you believe this is an error.');
        }
    } catch (error) {
        console.error('Verification error:', error);
        showErrorState('Unable to verify payment status. Please check your email for confirmation.');
    }
}

/**
 * Start polling for order status
 */
function startPolling(paymentIntent, sessionId) {
    pollStartTime = Date.now();

    pollTimer = setInterval(async () => {
        const elapsed = Date.now() - pollStartTime;

        if (elapsed >= MAX_POLL_TIME) {
            // Stop polling after max time
            clearInterval(pollTimer);
            showTimeoutState();
            return;
        }

        await verifyPayment(paymentIntent, sessionId);
    }, POLL_INTERVAL);
}

/**
 * Stop polling
 */
function stopPolling() {
    if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
    }
}

/**
 * Clear the guest cart from localStorage after successful purchase
 */
function clearGuestCart() {
    try {
        localStorage.removeItem('florencebot_guest_cart');
        console.log('Guest cart cleared after successful purchase');
    } catch (e) {
        console.error('Failed to clear guest cart:', e);
    }
}

/**
 * Check if user is logged in
 */
function isUserLoggedIn() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        return !!accessToken;
    } catch (e) {
        return false;
    }
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text, buttonElement) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.classList.add('copied');
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.classList.remove('copied');
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.classList.add('copied');
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.classList.remove('copied');
        }, 2000);
    }
}

/**
 * Show pending state while waiting for webhook
 */
function showPendingState() {
    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="pending-icon">
            <i class="fas fa-sync-alt"></i>
        </div>
        <h1 class="success-title">Processing your payment...</h1>
        <p class="success-message">
            This usually takes just a moment. Please wait...
        </p>
        <div class="loading-state" style="padding: 20px 0;">
            <div class="spinner spinner-primary"></div>
        </div>
    `;
}

/**
 * Show timeout state when polling takes too long
 */
function showTimeoutState() {
    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="pending-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);">
            <i class="fas fa-clock" style="animation: none;"></i>
        </div>
        <h1 class="success-title">Taking longer than expected</h1>
        <p class="success-message">
            Your payment is being processed. Your order confirmation will be sent to your email shortly.
        </p>
        <div class="email-note">
            <i class="fas fa-envelope"></i>
            <p>Please check your email for your order number and access instructions. If you don't receive an email within a few minutes, please contact support.</p>
        </div>
        <div class="success-actions" style="margin-top: 24px;">
            <a href="https://discord.gg/y2Mh77wAV2" class="btn btn-primary btn-large">
                <i class="fab fa-discord"></i>
                Contact Support
            </a>
            <a href="store.html" class="btn btn-light">
                <i class="fas fa-arrow-left"></i>
                Back to Store
            </a>
        </div>
    `;
}

/**
 * Show success state
 */
function showSuccessState(order) {
    // Stop polling if active
    stopPolling();

    // Clear guest cart on successful purchase
    clearGuestCart();

    const container = document.getElementById('success-content');
    const isLoggedIn = isUserLoggedIn();
    const isGuest = !order.user_id;

    // Build items HTML
    let itemsHtml = '';
    let totalPrice = 0;
    if (order.items && order.items.length > 0) {
        itemsHtml = order.items.map(item => {
            totalPrice += item.price;
            return `
                <div class="order-item">
                    <span class="order-item-label">${escapeHtml(item.product_name)}</span>
                    <span class="order-item-value">$${parseFloat(item.price).toFixed(2)}</span>
                </div>
            `;
        }).join('');
    }

    // Check if there's a bundle discount
    const hasDiscount = order.discount_amount && parseFloat(order.discount_amount) > 0;
    const originalSubtotal = order.subtotal ? parseFloat(order.subtotal) : totalPrice;
    const discountAmount = hasDiscount ? parseFloat(order.discount_amount) : 0;

    // Build discount section HTML
    let discountHtml = '';
    if (hasDiscount) {
        discountHtml = `
            <div class="order-item" style="color: var(--text-secondary);">
                <span class="order-item-label">Original Price</span>
                <span class="order-item-value" style="text-decoration: line-through; color: var(--text-secondary);">$${originalSubtotal.toFixed(2)}</span>
            </div>
            <div class="order-item" style="color: #10b981;">
                <span class="order-item-label"><i class="fas fa-tag" style="margin-right: 6px;"></i>Bundle Discount</span>
                <span class="order-item-value" style="color: #10b981; font-weight: 600;">-$${discountAmount.toFixed(2)}</span>
            </div>
        `;
    }

    // Determine message based on item count
    const itemCount = order.items ? order.items.length : 1;
    const guideText = itemCount === 1 ? 'Your study guide is' : 'Your study guides are';

    let actionsHtml = '';
    let guestWarningHtml = '';

    if (isGuest) {
        // Guest user - show prominent order number and account creation prompts
        const escapedOrderNumber = escapeHtml(order.order_number);
        guestWarningHtml = `
            <div class="guest-warning">
                <div class="guest-warning-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important: Save your order number</h4>
                </div>
                <p>To access your study guides, create an account or log in and enter this order number.</p>
                <div class="order-number-display">
                    <div class="order-number-label">Your Order Number</div>
                    <div class="order-number-value" id="order-number-value">${escapedOrderNumber}</div>
                </div>
                <button class="copy-btn" data-order-number="${escapedOrderNumber}">
                    <i class="fas fa-copy"></i>
                    Copy to Clipboard
                </button>
            </div>
        `;

        const orderParam = encodeURIComponent(order.order_number);
        actionsHtml = `
            <a href="login.html?tab=signup&order=${orderParam}" class="btn btn-primary btn-large">
                <i class="fas fa-user-plus"></i>
                Create Account
            </a>
            <a href="login.html?order=${orderParam}" class="btn btn-light">
                <i class="fas fa-sign-in-alt"></i>
                Already have an account? Log in
            </a>
        `;
    } else {
        // Logged-in user - show dashboard link
        actionsHtml = `
            <a href="dashboard.html" class="btn btn-primary btn-large">
                <i class="fas fa-book-open"></i>
                Go to My Dashboard
            </a>
            <a href="store.html" class="btn btn-light">
                <i class="fas fa-shopping-bag"></i>
                Continue Shopping
            </a>
        `;
    }

    // Build savings message if discount applied
    let savingsMessageHtml = '';
    if (hasDiscount) {
        savingsMessageHtml = `
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 16px; text-align: center;">
                <i class="fas fa-check-circle" style="color: #10b981; margin-right: 6px;"></i>
                <span style="color: #10b981; font-weight: 600;">You saved $${discountAmount.toFixed(2)} with our bundle deal!</span>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check"></i>
        </div>
        <h1 class="success-title">Payment Successful!</h1>
        <p class="success-message">
            Thank you for your purchase! ${guideText} now available.
        </p>

        ${savingsMessageHtml}

        <div class="order-details">
            <h3>Order Details</h3>
            <div class="order-item">
                <span class="order-item-label">Order Number</span>
                <span class="order-item-value">${escapeHtml(order.order_number)}</span>
            </div>
            ${itemsHtml}
            ${discountHtml}
            <div class="order-item" style="border-top: 2px solid var(--border-color); padding-top: 12px; margin-top: 8px;">
                <span class="order-item-label" style="font-weight: 600;">Total Paid</span>
                <span class="order-item-value" style="font-size: 1.1rem;">$${parseFloat(order.total).toFixed(2)}</span>
            </div>
            ${order.customer_email ? `
            <div class="order-item">
                <span class="order-item-label">Email</span>
                <span class="order-item-value">${escapeHtml(order.customer_email)}</span>
            </div>
            ` : ''}
        </div>

        ${guestWarningHtml}

        <div class="success-actions">
            ${actionsHtml}
        </div>

        <div class="email-note">
            <i class="fas fa-envelope"></i>
            <p>A confirmation email has been sent to ${order.customer_email ? escapeHtml(order.customer_email) : 'your email address'} with your receipt and access instructions.</p>
        </div>
    `;

    // Attach event listener for copy button using event delegation
    const copyBtn = container.querySelector('.copy-btn[data-order-number]');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            copyToClipboard(this.dataset.orderNumber, this);
        });
    }
}

/**
 * Show error state
 */
function showErrorState(message) {
    // Stop polling if active
    stopPolling();

    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-circle"></i>
            <h1 class="success-title">Something Went Wrong</h1>
            <p class="success-message">${escapeHtml(message)}</p>
            <div class="success-actions">
                <a href="https://discord.gg/y2Mh77wAV2" class="btn btn-primary btn-large">
                    <i class="fab fa-discord"></i>
                    Contact Support
                </a>
                <a href="store.html" class="btn btn-light">
                    <i class="fas fa-arrow-left"></i>
                    Back to Store
                </a>
            </div>
        </div>
    `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initSuccessPage);

// Page loader
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
});
