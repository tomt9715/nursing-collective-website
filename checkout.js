/**
 * FlorenceBot Pro Checkout
 * Handles Stripe Payment Element integration for embedded payments.
 */

// Configuration - Update this URL after deploying the API to Railway
const API_BASE_URL = 'https://florencebotpro-production.up.railway.app';

// Global state
let stripe = null;
let elements = null;
let paymentElement = null;
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
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (!productId) {
        showError('No product selected. Please go back to the store and select a product.');
        return;
    }

    try {
        // Initialize Stripe first
        await initStripe();

        // Load product details
        await loadProductDetails(productId);

        // Check if it's a subscription product
        if (currentProduct && currentProduct.type === 'subscription') {
            // For subscriptions, show redirect notice and setup redirect flow
            setupSubscriptionFlow();
        } else {
            // For one-time purchases, create payment intent and mount payment element
            await createPaymentIntent();
        }
    } catch (error) {
        console.error('Checkout initialization error:', error);
        showError('Failed to initialize checkout. Please try again later.');
    }
}

/**
 * Initialize Stripe with publishable key from API
 */
async function initStripe() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/config`);
        if (!response.ok) {
            throw new Error('Failed to fetch Stripe configuration');
        }

        const config = await response.json();
        stripe = Stripe(config.publishableKey);
    } catch (error) {
        console.error('Stripe initialization error:', error);
        throw new Error('Failed to initialize payment system');
    }
}

/**
 * Load product details from API
 */
async function loadProductDetails(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/product/${productId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Product not found');
            }
            throw new Error('Failed to load product details');
        }

        currentProduct = await response.json();
        displayProductDetails(currentProduct);
    } catch (error) {
        console.error('Product loading error:', error);
        throw error;
    }
}

/**
 * Display product details in the order summary
 */
function displayProductDetails(product) {
    const productDetailsEl = document.getElementById('product-details');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    // Build product details HTML
    let html = `
        <div class="product-info">
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <span class="product-category">
                <i class="fas fa-tag"></i>
                ${CATEGORY_NAMES[product.category] || product.category}
            </span>
            <div class="product-price">$${product.price.toFixed(2)}${product.interval ? '/month' : ''}</div>
        </div>
    `;

    // Add package includes if applicable
    if (product.includes && product.includes.length > 0) {
        html += `
            <div class="package-includes">
                <h4>Includes:</h4>
                <ul>
                    ${product.includes.map(item => `
                        <li>
                            <i class="fas fa-check"></i>
                            ${escapeHtml(formatProductName(item))}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    productDetailsEl.innerHTML = html;

    // Update totals
    subtotalEl.textContent = `$${product.price.toFixed(2)}`;
    totalEl.textContent = `$${product.price.toFixed(2)}`;
}

/**
 * Create payment intent for one-time purchases
 */
async function createPaymentIntent() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value || '';

    try {
        const response = await fetch(`${API_BASE_URL}/api/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: currentProduct.id,
                email: email || 'pending@checkout.com'  // Placeholder until user enters email
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create payment intent');
        }

        const data = await response.json();

        // Initialize Elements with the client secret
        const appearance = getStripeAppearance();
        elements = stripe.elements({
            clientSecret: data.clientSecret,
            appearance: appearance,
        });

        // Create and mount the Payment Element
        paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');

        // Enable submit button once element is ready
        paymentElement.on('ready', () => {
            document.getElementById('submit-button').disabled = false;
        });

        // Handle real-time validation errors
        paymentElement.on('change', (event) => {
            if (event.error) {
                showError(event.error.message);
            } else {
                hideError();
            }
        });

    } catch (error) {
        console.error('Payment intent creation error:', error);
        showError(error.message || 'Failed to initialize payment. Please try again.');
    }
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
 * Handle form submission
 */
async function handleSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('button-spinner');
    const emailInput = document.getElementById('email');

    // Validate email
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
        // Handle subscription redirect
        if (currentProduct.type === 'subscription') {
            await handleSubscriptionCheckout(email);
            return;
        }

        // Handle one-time payment
        // First, update the payment intent with the correct email
        const updateResponse = await fetch(`${API_BASE_URL}/api/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: currentProduct.id,
                email: email
            }),
        });

        if (!updateResponse.ok) {
            const error = await updateResponse.json();
            throw new Error(error.error || 'Failed to process payment');
        }

        const paymentData = await updateResponse.json();

        // Confirm payment with the new client secret
        const { error: confirmError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success.html?product=${currentProduct.id}`,
                receipt_email: email,
            },
            redirect: 'if_required',
        });

        if (confirmError) {
            throw new Error(confirmError.message);
        }

        // If we reach here without redirect, payment succeeded
        // This can happen with some payment methods that don't require redirect
        window.location.href = `${window.location.origin}/success.html?product=${currentProduct.id}&payment_intent=${paymentData.paymentIntentId}`;

    } catch (error) {
        console.error('Payment error:', error);
        showError(error.message || 'Payment failed. Please try again.');

        // Reset button state
        submitButton.disabled = false;
        buttonText.textContent = currentProduct.type === 'subscription' ? 'Continue to Checkout' : 'Complete Purchase';
        spinner.style.display = 'none';
        submitButton.classList.remove('processing');
    }
}

/**
 * Handle subscription checkout redirect
 */
async function handleSubscriptionCheckout(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/create-subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: currentProduct.id,
                email: email,
                success_url: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}&product=${currentProduct.id}`,
                cancel_url: `${window.location.origin}/checkout.html?product=${currentProduct.id}`,
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
 * Get Stripe Elements appearance configuration
 */
function getStripeAppearance() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    return {
        theme: isDarkMode ? 'night' : 'stripe',
        variables: {
            colorPrimary: '#2E86AB',
            colorBackground: isDarkMode ? '#1f2937' : '#ffffff',
            colorText: isDarkMode ? '#f9fafb' : '#1f2937',
            colorDanger: '#ef4444',
            fontFamily: '"Source Sans 3", -apple-system, BlinkMacSystemFont, sans-serif',
            borderRadius: '8px',
            spacingUnit: '4px',
        },
        rules: {
            '.Input': {
                border: isDarkMode ? '2px solid #374151' : '2px solid #e5e7eb',
                boxShadow: 'none',
            },
            '.Input:focus': {
                border: '2px solid #2E86AB',
                boxShadow: '0 0 0 3px rgba(46, 134, 171, 0.15)',
            },
            '.Label': {
                fontWeight: '600',
            },
        },
    };
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
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format product slug to readable name
 */
function formatProductName(slug) {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initCheckout();

    // Setup form submission handler
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handleSubmit);

    // Listen for theme changes to update Stripe appearance
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Stripe Elements will be recreated if needed after theme change
            // For now, page reload handles this automatically
        });
    }
});

// Re-initialize if user navigates back
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page was loaded from cache (back button)
        initCheckout();
    }
});
