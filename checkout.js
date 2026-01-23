/**
 * FlorenceBot Pro Checkout
 * Handles cart-based checkout with Stripe Embedded Checkout.
 * Supports both authenticated users and guest checkout.
 */

// Configuration
const PAYMENT_API_URL = 'https://florencebotpro-production.up.railway.app';
const AUTH_API_URL = 'https://api.thenursingcollective.pro';

// Global state
let stripe = null;
let checkout = null; // Stripe embedded checkout instance
let cartItems = [];
let cartSubtotal = 0;
let isUserAuthenticated = false;
let singleProductMode = false;
let currentProduct = null;

// Category display names
const CATEGORY_NAMES = {
    'medsurg': 'Medical-Surgical Nursing',
    'pharmacology': 'Pharmacology',
    'fundamentals': 'Fundamentals of Nursing',
    'maternal': 'Maternal/OB Nursing',
    'pediatrics': 'Pediatric Nursing',
    'mental-health': 'Mental Health Nursing',
    'subscription': 'Subscription'
};

/**
 * Initialize the checkout page
 */
async function initCheckout() {
    // Check if user is authenticated
    isUserAuthenticated = typeof isAuthenticated === 'function' ? isAuthenticated() : !!localStorage.getItem('accessToken');

    // Show sign-in prompt for guest users
    const signInPrompt = document.getElementById('signin-prompt');
    if (signInPrompt && !isUserAuthenticated) {
        signInPrompt.style.display = 'block';
    }

    // Pre-fill email if user is authenticated
    if (isUserAuthenticated) {
        const user = typeof getCurrentUser === 'function' ? getCurrentUser() : JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email) {
            document.getElementById('email').value = user.email;
        }
    }

    try {
        // Initialize Stripe
        await initStripe();

        // Check for single product mode (legacy URL param)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');

        if (productId) {
            // Single product mode - legacy support
            singleProductMode = true;
            await loadSingleProduct(productId);
        } else {
            // Cart mode - load from cart
            await loadCartItems();
        }

        // Check if it's a subscription (single product mode only)
        if (singleProductMode && currentProduct && currentProduct.type === 'subscription') {
            setupSubscriptionFlow();
        } else {
            // Setup embedded checkout
            setupEmbeddedCheckout();
        }
    } catch (error) {
        console.error('Checkout initialization error:', error);

        // Report checkout errors to Sentry (critical path)
        if (typeof captureError === 'function') {
            captureError(error, {
                action: 'checkout_init',
                singleProductMode: singleProductMode,
                cartItemCount: cartItems.length,
                isAuthenticated: isUserAuthenticated
            });
        }

        showError('Failed to initialize checkout. Please try again later.');
    } finally {
        // Hide page loader after initialization (success or failure)
        hidePageLoader();
    }
}

/**
 * Hide the page loader
 */
function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
}

/**
 * Initialize Stripe with publishable key from API
 */
async function initStripe() {
    try {
        const response = await fetch(`${PAYMENT_API_URL}/api/config`);
        if (!response.ok) {
            throw new Error('Failed to fetch Stripe configuration');
        }

        const config = await response.json();
        stripe = Stripe(config.publishableKey);
    } catch (error) {
        console.error('Stripe initialization error:', error);

        // Report Stripe init failures (critical)
        if (typeof captureError === 'function') {
            captureError(error, { action: 'stripe_init' });
        }

        throw new Error('Failed to initialize payment system');
    }
}

/**
 * Load single product (legacy mode)
 */
async function loadSingleProduct(productId) {
    try {
        const response = await fetch(`${PAYMENT_API_URL}/api/product/${productId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Product not found');
            }
            throw new Error('Failed to load product details');
        }

        currentProduct = await response.json();
        currentProduct.product_id = productId;

        // Convert to cart item format
        cartItems = [{
            product_id: productId,
            product_name: currentProduct.name,
            product_type: currentProduct.type,
            price: currentProduct.price
        }];
        cartSubtotal = currentProduct.price;

        displayCartItems();
    } catch (error) {
        console.error('Product loading error:', error);
        showError('Product not found. Please go back to the store and select a product.');
    }
}

/**
 * Load cart items from cartManager
 */
async function loadCartItems() {
    try {
        // Wait for cartManager to be available
        if (typeof cartManager === 'undefined') {
            throw new Error('Cart system not loaded');
        }

        // Get cart from cartManager
        const cart = await cartManager.getCart();

        if (!cart.items || cart.items.length === 0) {
            // Empty cart - show message and redirect
            showEmptyCartMessage();
            return;
        }

        cartItems = cart.items;
        cartSubtotal = cart.subtotal || cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        displayCartItems();
    } catch (error) {
        console.error('Cart loading error:', error);
        showError('Failed to load your cart. Please try again.');
    }
}

/**
 * Show empty cart message
 */
function showEmptyCartMessage() {
    const productDetailsEl = document.getElementById('product-details');
    productDetailsEl.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <i class="fas fa-shopping-bag" style="font-size: 3rem; color: var(--text-light); margin-bottom: 16px;"></i>
            <h3 style="color: var(--text-primary); margin-bottom: 8px;">Your cart is empty</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">Add some study guides to get started!</p>
            <a href="store.html" class="btn btn-primary">
                <i class="fas fa-shopping-cart"></i> Browse Store
            </a>
        </div>
    `;

    // Hide payment form
    document.querySelector('.payment-form-container').style.display = 'none';
}

/**
 * Display cart items in the order summary
 */
function displayCartItems() {
    const productDetailsEl = document.getElementById('product-details');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    if (cartItems.length === 0) {
        showEmptyCartMessage();
        return;
    }

    // Build cart items HTML
    let html = '<div class="cart-items-checkout">';

    cartItems.forEach(item => {
        const typeLabel = getTypeLabel(item.product_type);
        const quantity = item.quantity || 1;
        const itemTotal = parseFloat(item.price) * quantity;
        html += `
            <div class="checkout-item">
                <div class="checkout-item-icon">
                    <i class="fas fa-file-medical"></i>
                </div>
                <div class="checkout-item-details">
                    <div class="checkout-item-name">${escapeHtml(item.product_name)}</div>
                    <div class="checkout-item-type">${typeLabel}${quantity > 1 ? ` × ${quantity}` : ''}</div>
                </div>
                <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });

    html += '</div>';

    // Add item count summary
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    html += `
        <div class="checkout-item-count" style="margin-top: 12px; font-size: 0.9rem; color: var(--text-secondary);">
            ${totalItems} item${totalItems !== 1 ? 's' : ''} in your order
        </div>
    `;

    productDetailsEl.innerHTML = html;

    // Calculate discounts using cartManager
    const discountInfo = cartManager.getDiscountInfo();

    // Update the order totals section with discount info
    updateOrderTotals(discountInfo);

    // Add inline styles for checkout items
    addCheckoutItemStyles();
}

/**
 * Update order totals section to show discounts
 */
function updateOrderTotals(discountInfo) {
    const orderTotalEl = document.querySelector('.order-total');
    if (!orderTotalEl) return;

    let html = '';

    if (discountInfo.hasDiscount) {
        // Show original price with strikethrough
        html += `
            <div class="total-row" style="color: var(--text-secondary);">
                <span>Original Price</span>
                <span style="text-decoration: line-through;">$${discountInfo.originalSubtotal.toFixed(2)}</span>
            </div>
            <div class="total-row discount-row" style="color: #10b981; font-weight: 600;">
                <span><i class="fas fa-tag" style="margin-right: 6px;"></i>Bundle Discount</span>
                <span>-$${discountInfo.totalDiscount.toFixed(2)}</span>
            </div>
        `;
    } else {
        // Regular subtotal
        html += `
            <div class="total-row">
                <span>Subtotal</span>
                <span id="subtotal">$${discountInfo.originalSubtotal.toFixed(2)}</span>
            </div>
        `;
    }

    // Final total
    const finalTotal = discountInfo.hasDiscount ? discountInfo.discountedSubtotal : discountInfo.originalSubtotal;
    html += `
        <div class="total-row total-final">
            <span>Total</span>
            <span id="total">$${finalTotal.toFixed(2)}</span>
        </div>
    `;

    // Show savings message or progress bar
    if (discountInfo.hasDiscount) {
        html += `
            <div class="checkout-savings-message" style="
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 8px;
                padding: 12px;
                margin-top: 16px;
                text-align: center;
            ">
                <i class="fas fa-check-circle" style="color: #10b981; margin-right: 6px;"></i>
                <span style="color: #10b981; font-weight: 600;">
                    You're saving $${discountInfo.totalDiscount.toFixed(2)} with our bundle deal!
                </span>
            </div>
        `;
    } else if (discountInfo.nextTierInfo && discountInfo.individualGuideCount > 0 && !discountInfo.hasPackage) {
        // Show progress bar for users close to a discount (only if no packages in cart)
        const tier = discountInfo.nextTierInfo.tier;
        const remaining = discountInfo.nextTierInfo.guidesNeeded;
        const progress = (discountInfo.individualGuideCount / tier.min_qty) * 100;
        html += `
            <div class="checkout-upsell" style="
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.03));
                border: 1px solid rgba(99, 102, 241, 0.2);
                border-radius: 8px;
                padding: 14px;
                margin-top: 16px;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 0.85rem; font-weight: 600; color: #6366f1;">
                        <i class="fas fa-gift" style="margin-right: 6px;"></i>
                        ${remaining} more guide${remaining !== 1 ? 's' : ''} for ${tier.min_qty}-pack deal!
                    </span>
                    <span style="font-size: 0.8rem; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 3px 8px; border-radius: 12px;">
                        ${tier.savings_label}
                    </span>
                </div>
                <div style="height: 6px; background: rgba(99, 102, 241, 0.15); border-radius: 3px; overflow: hidden;">
                    <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 3px;"></div>
                </div>
                <div style="text-align: right; margin-top: 6px;">
                    <a href="store.html" style="font-size: 0.75rem; color: #6366f1; text-decoration: none;">
                        <i class="fas fa-plus" style="margin-right: 4px;"></i>Add more guides
                    </a>
                </div>
            </div>
        `;
    }

    orderTotalEl.innerHTML = html;

    // Store the final total for checkout
    cartSubtotal = finalTotal;
}

/**
 * Add inline styles for checkout items (to avoid needing to modify CSS file)
 */
function addCheckoutItemStyles() {
    if (document.getElementById('checkout-item-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'checkout-item-styles';
    styleEl.textContent = `
        .cart-items-checkout {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .checkout-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: var(--background-light);
            border-radius: 8px;
        }
        .checkout-item-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .checkout-item-icon i {
            color: white;
            font-size: 1rem;
        }
        .checkout-item-details {
            flex: 1;
            min-width: 0;
        }
        .checkout-item-name {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.95rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .checkout-item-type {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        .checkout-item-price {
            font-weight: 600;
            color: var(--primary-color);
            font-size: 0.95rem;
        }
        #checkout-container {
            min-height: 400px;
        }
    `;
    document.head.appendChild(styleEl);
}

/**
 * Get human-readable type label
 */
function getTypeLabel(type) {
    const labels = {
        'individual': 'Study Guide',
        'lite-package': 'Lite Package',
        'full-package': 'Full Package'
    };
    return labels[type] || type || 'Study Guide';
}

/**
 * Setup embedded checkout - loads Stripe immediately for authenticated users,
 * shows email field for guests with payment form visible
 */
async function setupEmbeddedCheckout() {
    const paymentElementContainer = document.getElementById('payment-element');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const emailInput = document.getElementById('email');

    // If user is authenticated, load checkout immediately
    if (isUserAuthenticated && emailInput.value) {
        await initEmbeddedCheckout(emailInput.value);
        return;
    }

    // For guests, show loading state then load checkout with placeholder
    paymentElementContainer.innerHTML = `
        <div id="checkout-container" style="min-height: 400px; display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center;">
                <div class="spinner spinner-primary" style="margin-bottom: 12px;"></div>
                <p style="color: var(--text-secondary);">Loading secure payment form...</p>
            </div>
        </div>
    `;

    // Update button for guests
    buttonText.textContent = 'Complete Purchase';
    submitButton.disabled = false;

    // Load embedded checkout for guests (email will be collected before final submit)
    await initEmbeddedCheckoutForGuest();
}

/**
 * Initialize the Stripe embedded checkout for authenticated users (with email)
 */
async function initEmbeddedCheckout(email) {
    const submitButton = document.getElementById('submit-button');
    const paymentElementContainer = document.getElementById('payment-element');

    try {
        // Prepare payload with email for authenticated users
        const payload = {
            email: email,
            return_url: `${window.location.origin}/success.html`
        };

        // Call checkout API to get client secret
        const response = await fetch(`${AUTH_API_URL}/cart/checkout/create-embedded-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create checkout session');
        }

        const data = await response.json();

        // Initialize embedded checkout
        checkout = await stripe.initEmbeddedCheckout({
            clientSecret: data.clientSecret,
        });

        // Clear container and mount checkout
        paymentElementContainer.innerHTML = '<div id="checkout-container"></div>';
        checkout.mount('#checkout-container');

        // Hide the form elements since Stripe handles everything
        document.getElementById('email').closest('.form-group').style.display = 'none';
        submitButton.style.display = 'none';

        // Hide the "Card Information" label
        const cardLabel = paymentElementContainer.closest('.form-group').querySelector('label');
        if (cardLabel) cardLabel.style.display = 'none';

    } catch (error) {
        console.error('Embedded checkout error:', error);
        showError(error.message || 'Failed to load payment form. Please try again.');
        showFallbackMessage(paymentElementContainer);
    }
}

/**
 * Initialize the Stripe embedded checkout for guest users (no email required upfront)
 * Stripe will collect the email in its embedded form
 */
async function initEmbeddedCheckoutForGuest() {
    const submitButton = document.getElementById('submit-button');
    const paymentElementContainer = document.getElementById('payment-element');

    try {
        // Prepare payload without email - Stripe will collect it
        const payload = {
            return_url: `${window.location.origin}/success.html`,
            items: cartItems.map(item => ({
                product_id: item.product_id,
                product_name: item.product_name,
                product_type: item.product_type,
                price: item.price,
                quantity: item.quantity || 1
            }))
        };

        // Call checkout API to get client secret
        const response = await fetch(`${AUTH_API_URL}/cart/checkout/create-embedded-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create checkout session');
        }

        const data = await response.json();

        // Initialize embedded checkout
        checkout = await stripe.initEmbeddedCheckout({
            clientSecret: data.clientSecret,
        });

        // Clear container and mount checkout
        paymentElementContainer.innerHTML = '<div id="checkout-container"></div>';
        checkout.mount('#checkout-container');

        // Hide the custom email field since Stripe will collect it
        document.getElementById('email').closest('.form-group').style.display = 'none';
        submitButton.style.display = 'none';

        // Hide the "Card Information" label
        const cardLabel = paymentElementContainer.closest('.form-group').querySelector('label');
        if (cardLabel) cardLabel.style.display = 'none';

    } catch (error) {
        console.error('Embedded checkout error:', error);
        showError(error.message || 'Failed to load payment form. Please try again.');
        showFallbackMessage(paymentElementContainer);
    }
}

/**
 * Show fallback message when checkout fails to load
 */
function showFallbackMessage(container) {
    container.innerHTML = `
        <div id="checkout-container">
            <div style="padding: 20px; text-align: center; color: var(--text-secondary); background: var(--background-light); border-radius: 12px;">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 12px; color: var(--error-color);"></i>
                <p style="margin-bottom: 8px;">Failed to load payment form.</p>
                <p style="font-size: 0.85rem;">Please refresh the page and try again.</p>
            </div>
        </div>
    `;
}

/**
 * Setup subscription flow (redirect to Stripe Checkout)
 */
function setupSubscriptionFlow() {
    const subscriptionNotice = document.getElementById('subscription-notice');
    const paymentElementContainer = document.getElementById('payment-element');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');

    // Show subscription notice
    subscriptionNotice.style.display = 'flex';

    // Hide payment element and show redirect message
    paymentElementContainer.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
            <i class="fas fa-external-link-alt" style="font-size: 2rem; margin-bottom: 12px; color: var(--primary-color);"></i>
            <p>You'll be redirected to Stripe's secure checkout to complete your subscription.</p>
        </div>
    `;

    // Update button text
    buttonText.textContent = 'Continue to Checkout';
    submitButton.disabled = false;
}

/**
 * Handle form submission (only used for subscriptions now)
 */
async function handleSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('button-spinner');
    const emailInput = document.getElementById('email');

    // For subscriptions, we still need email validation
    if (singleProductMode && currentProduct && currentProduct.type === 'subscription') {
        const email = emailInput.value.trim();
        if (!email || !isValidEmail(email)) {
            showError('Please enter a valid email address.');
            emailInput.classList.add('error');
            emailInput.focus();
            return;
        }
        emailInput.classList.remove('error');

        // Disable button and show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Processing...';
        spinner.style.display = 'inline-block';
        submitButton.classList.add('processing');

        try {
            await handleSubscriptionCheckout(email);
        } catch (error) {
            console.error('Checkout error:', error);
            showError(error.message || 'Checkout failed. Please try again.');

            // Reset button state
            submitButton.disabled = false;
            buttonText.textContent = 'Continue to Checkout';
            spinner.style.display = 'none';
            submitButton.classList.remove('processing');
        }
    }
}

/**
 * Handle subscription checkout redirect
 */
async function handleSubscriptionCheckout(email) {
    try {
        const response = await fetch(`${PAYMENT_API_URL}/api/create-subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: currentProduct.product_id,
                email: email,
                success_url: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}&product=${currentProduct.product_id}`,
                cancel_url: `${window.location.origin}/checkout.html?product=${currentProduct.product_id}`,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create subscription checkout');
        }

        const data = await response.json();

        // Redirect to Stripe Checkout
        window.location.href = data.url;

    } catch (error) {
        throw error;
    }
}

/**
 * Show error message
 */
function showError(message) {
    const errorEl = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    errorText.textContent = message;
    errorEl.style.display = 'flex';

    // Scroll to error
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Hide error message
 */
function hideError() {
    const errorEl = document.getElementById('error-message');
    errorEl.style.display = 'none';
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure cart service is loaded
    setTimeout(() => {
        initCheckout();
    }, 100);

    // Setup form submission handler
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handleSubmit);
});

// Re-initialize if user navigates back
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page was loaded from cache (back button)
        // Destroy existing checkout if any
        if (checkout) {
            checkout.destroy();
            checkout = null;
        }
        setTimeout(() => initCheckout(), 100);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (checkout) {
        checkout.destroy();
    }
});
