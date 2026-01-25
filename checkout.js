/**
 * FlorenceBot Pro Checkout - Stripe Elements Implementation
 *
 * Uses Stripe Elements (CardElement) for a fully customizable payment form.
 * Card data never touches our servers - goes directly to Stripe.
 * We collect customer info (name, email, address) and send it with the payment.
 */

// API_URL is declared in api-service.js and available globally

// Global state
let stripe = null;
let elements = null;
let paymentElement = null;
let cartItems = [];
let cartSubtotal = 0;
let isUserAuthenticated = false;
let singleProductMode = false;
let currentProduct = null;
let clientSecret = null;
let paymentElementComplete = false;

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

// Track if user wants to use a different email
let useAccountEmail = true;
let accountEmail = null;

// Promo code state
let appliedPromo = null;
let promoDiscount = 0;
let promoDiscountType = null; // 'percent' or 'amount'

/**
 * Initialize the checkout page
 */
async function initCheckout() {
    // Check if user is authenticated
    isUserAuthenticated = typeof isAuthenticated === 'function' ? isAuthenticated() : !!localStorage.getItem('accessToken');

    const signInPrompt = document.getElementById('signin-prompt');
    const userInfoBanner = document.getElementById('user-info-banner');
    const userEmailDisplay = document.getElementById('user-email-display');
    const emailInput = document.getElementById('email');
    const emailGroup = document.getElementById('email-group');
    const useDifferentEmailBtn = document.getElementById('use-different-email-btn');

    if (isUserAuthenticated) {
        // IMPORTANT: Hide sign-in prompt first thing when authenticated
        // Use .hidden class to override bundle.min.css !important rules
        if (signInPrompt) {
            signInPrompt.classList.add('hidden');
        }

        // User is signed in - get user data from localStorage
        let user = typeof getCurrentUser === 'function' ? getCurrentUser() : JSON.parse(localStorage.getItem('user') || '{}');

        // Get email from user object - try different possible property names
        accountEmail = user.email || user.user_email || user.email_address || '';

        // If user data is incomplete (no email), try to fetch fresh data from API
        if (!accountEmail) {
            console.log('User email missing from localStorage, fetching from API...');
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.user) {
                        user = data.user;
                        // Update localStorage with fresh data
                        localStorage.setItem('user', JSON.stringify(user));
                        accountEmail = user.email || user.user_email || user.email_address || '';
                        console.log('Fetched fresh user data:', { email: accountEmail });
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        console.log('Checkout auth state:', { isAuthenticated: true, user, accountEmail });

        // Show user info banner
        if (userInfoBanner) {
            userInfoBanner.style.display = 'flex';
        }

        // Display user email in the banner
        if (userEmailDisplay) {
            userEmailDisplay.textContent = accountEmail || 'your account';
        }

        // Pre-fill and lock email field
        if (emailInput && accountEmail) {
            emailInput.value = accountEmail;
            emailInput.readOnly = true;
            if (emailGroup) {
                emailGroup.classList.add('email-locked');
            }
            // Update hint text for locked email
            const emailHint = document.getElementById('email-hint');
            if (emailHint) {
                emailHint.textContent = 'Your receipt and guide access will be sent to this email.';
            }
        }

        // Show "use different email" button
        if (useDifferentEmailBtn) {
            useDifferentEmailBtn.style.display = 'inline-flex';
            useDifferentEmailBtn.addEventListener('click', toggleEmailEdit);
        }

        // Pre-fill name if available
        const nameField = document.getElementById('name');
        if (nameField) {
            let fullName = '';
            if (user.first_name || user.last_name) {
                fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
            } else if (user.name || user.displayName || user.full_name) {
                fullName = user.name || user.displayName || user.full_name;
            }
            if (fullName) {
                nameField.value = fullName;
            }
        }

        // Update navbar for authenticated user
        updateNavbarForAuth(user);
    } else {
        console.log('Checkout auth state:', { isAuthenticated: false });

        // Guest user - show sign-in prompt (remove hidden class to show it)
        if (signInPrompt) {
            signInPrompt.classList.remove('hidden');
        }
        // Ensure user info banner is hidden for guests
        if (userInfoBanner) {
            userInfoBanner.style.display = 'none';
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

        // Don't setup payment if cart is empty
        if (cartItems.length === 0) {
            // Cart is empty - showEmptyCartMessage was already called
            return;
        }

        // Check if it's a subscription (single product mode only)
        if (singleProductMode && currentProduct && currentProduct.type === 'subscription') {
            setupSubscriptionFlow();
        } else {
            // Setup Stripe Elements for card payment
            await setupStripeElements();
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
        const response = await fetch(`${API_URL}/api/config`);
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
        const response = await fetch(`${API_URL}/api/product/${productId}`);
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
            <img src="assets/images/bag.webp" alt="Empty cart" style="width: 64px; height: 64px; margin-bottom: 16px; opacity: 0.6;">
            <h3 style="color: var(--text-primary); margin-bottom: 8px;">Your cart is empty</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">Add some study guides to get started!</p>
            <a href="store.html" class="btn btn-primary">
                <i class="fas fa-shopping-cart"></i> Browse Store
            </a>
        </div>
    `;

    // Reset order totals to $0.00
    const orderTotalEl = document.querySelector('.order-total');
    if (orderTotalEl) {
        orderTotalEl.innerHTML = `
            <div class="total-row">
                <span>Subtotal</span>
                <span id="subtotal">$0.00</span>
            </div>
            <div class="total-row total-final">
                <span>Total</span>
                <span id="total">$0.00</span>
            </div>
        `;
    }

    // Hide promo code section when cart is empty (use !important to override inline styles)
    const promoSection = document.getElementById('promo-section');
    if (promoSection) {
        promoSection.style.setProperty('display', 'none', 'important');
    }

    // Hide the item count if present
    const itemCountEl = document.querySelector('.checkout-item-count');
    if (itemCountEl) {
        itemCountEl.style.display = 'none';
    }

    // Disable the submit button and show disabled state
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.disabled = true;
    }

    // Show a message in the payment method section that cart is empty
    const paymentElementDOM = document.getElementById('payment-element');
    const paymentElementWrapper = document.getElementById('payment-element-wrapper');
    if (paymentElementDOM) {
        paymentElementDOM.innerHTML = `
            <div style="text-align: center; padding: 30px 20px; color: var(--text-secondary); background: var(--background-light); border-radius: 8px;">
                <i class="fas fa-shopping-cart" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5; display: block;"></i>
                <p style="margin: 0; font-size: 0.9rem;">Add items to your cart to continue</p>
            </div>
        `;
    }
    // Remove any styling classes from wrapper that might cause visual issues
    if (paymentElementWrapper) {
        paymentElementWrapper.classList.remove('loading', 'complete', 'invalid');
    }
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

    // Check if there are newly added items from OAuth login merge
    let newlyAddedIds = [];
    try {
        const stored = sessionStorage.getItem('newlyAddedCartItems');
        console.log('Cart separation - sessionStorage newlyAddedCartItems:', stored);
        if (stored) {
            newlyAddedIds = JSON.parse(stored);
            console.log('Cart separation - parsed newlyAddedIds:', newlyAddedIds);
        }
    } catch (e) {
        console.error('Error parsing newly added cart items:', e);
    }

    // Debug: log cart items to compare IDs
    console.log('Cart separation - cart items:', cartItems.map(i => ({ id: i.product_id, name: i.product_name })));

    // Debug: Check which items will be separated
    console.log('Cart separation - checking matches...');
    cartItems.forEach(item => {
        const isNewlyAdded = newlyAddedIds.includes(item.product_id);
        console.log(`  - "${item.product_id}" (${item.product_name}): ${isNewlyAdded ? 'NEWLY ADDED' : 'previous session'}`);
    });

    // Separate items into previous session vs newly added
    const previousItems = [];
    const newItems = [];

    cartItems.forEach(item => {
        if (newlyAddedIds.includes(item.product_id)) {
            newItems.push(item);
        } else {
            previousItems.push(item);
        }
    });

    // Only show separation if we have both categories
    const showSeparation = newlyAddedIds.length > 0 && previousItems.length > 0 && newItems.length > 0;
    console.log('Cart separation - showSeparation:', showSeparation, `(newlyAddedIds: ${newlyAddedIds.length}, previousItems: ${previousItems.length}, newItems: ${newItems.length})`);

    // Build cart items HTML with scroll wrapper
    const needsScroll = cartItems.length > 4;
    let html = '<div class="cart-items-wrapper">';
    html += '<div class="cart-items-checkout">';

    // Helper function to render a single item
    const renderItem = (item) => {
        const typeLabel = getTypeLabel(item.product_type);
        const quantity = item.quantity || 1;
        const itemTotal = parseFloat(item.price) * quantity;
        const iconPath = getProductIconPath(item.product_id, item.product_type);

        // Use custom icon image with fallback to Font Awesome if image fails to load
        const iconHtml = `<img src="${iconPath}" alt="${escapeHtml(item.product_name)}" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><i class="fas fa-file-medical" style="display: none; color: var(--primary-color); font-size: 1.2rem; width: 100%; height: 100%; align-items: center; justify-content: center;"></i>`;

        return `
            <div class="checkout-item" data-product-id="${escapeHtml(item.product_id)}">
                <div class="checkout-item-icon" style="background: var(--background-light); padding: 4px;">
                    ${iconHtml}
                </div>
                <div class="checkout-item-details">
                    <div class="checkout-item-name">${escapeHtml(item.product_name)}</div>
                    <div class="checkout-item-type">${typeLabel}${quantity > 1 ? ` × ${quantity}` : ''}</div>
                </div>
                <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
                <button type="button" class="checkout-item-remove" data-product-id="${escapeHtml(item.product_id)}" title="Remove item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    };

    if (showSeparation) {
        // Show newly added items FIRST with a header
        html += `
            <div class="cart-section-header" style="
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                margin-bottom: 8px;
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
                border-radius: 8px;
                border-left: 3px solid #10b981;
            ">
                <i class="fas fa-plus-circle" style="color: #10b981; font-size: 0.85rem;"></i>
                <span style="font-size: 0.85rem; font-weight: 600; color: #10b981;">Just Added</span>
                <span style="font-size: 0.75rem; color: #6ee7b7; margin-left: auto;">${newItems.length} item${newItems.length !== 1 ? 's' : ''}</span>
            </div>
        `;

        newItems.forEach(item => {
            html += renderItem(item);
        });

        // Show previous session items below
        html += `
            <div class="cart-section-header" style="
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                margin-top: 16px;
                margin-bottom: 8px;
                background: linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(107, 114, 128, 0.05));
                border-radius: 8px;
                border-left: 3px solid #6b7280;
            ">
                <i class="fas fa-history" style="color: #6b7280; font-size: 0.85rem;"></i>
                <span style="font-size: 0.85rem; font-weight: 600; color: #6b7280;">From Previous Session</span>
                <span style="font-size: 0.75rem; color: #9ca3af; margin-left: auto;">${previousItems.length} item${previousItems.length !== 1 ? 's' : ''}</span>
            </div>
        `;

        previousItems.forEach(item => {
            html += renderItem(item);
        });

        // Keep sessionStorage - it will be cleared when items are removed or purchased
    } else {
        // No separation needed - just render all items
        cartItems.forEach(item => {
            html += renderItem(item);
        });

        // Keep sessionStorage - it will be cleared when items are removed or purchased
    }

    html += '</div>';

    // Add scroll indicator if there are more than 4 items
    if (needsScroll) {
        html += `
            <div class="cart-scroll-indicator">
                <i class="fas fa-chevron-down"></i>
                <span>Scroll for more</span>
            </div>
        `;
    }

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

    // Attach remove button event listeners
    attachRemoveButtonListeners();

    // Setup scroll indicator behavior
    setupScrollIndicator();
}

/**
 * Setup scroll indicator to hide when user scrolls
 */
function setupScrollIndicator() {
    const cartList = document.querySelector('.cart-items-checkout');
    const indicator = document.querySelector('.cart-scroll-indicator');

    if (!cartList || !indicator) return;

    // Check if scrolling is actually needed
    if (cartList.scrollHeight <= cartList.clientHeight) {
        indicator.classList.add('hidden');
        return;
    }

    cartList.addEventListener('scroll', function() {
        // Hide indicator once user has scrolled a bit
        if (cartList.scrollTop > 20) {
            indicator.classList.add('hidden');
        } else {
            indicator.classList.remove('hidden');
        }
    });
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
            <div class="total-row discount-row" style="color: #f59e0b; font-weight: 600;">
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
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
                border: 1px solid rgba(245, 158, 11, 0.2);
                border-radius: 8px;
                padding: 12px;
                margin-top: 16px;
                text-align: center;
            ">
                <i class="fas fa-check-circle" style="color: #f59e0b; margin-right: 6px;"></i>
                <span style="color: #f59e0b; font-weight: 600;">
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
        .cart-items-wrapper {
            position: relative;
        }
        .cart-items-checkout {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 450px;
            overflow-y: auto;
            padding-right: 4px;
        }
        .cart-items-checkout::-webkit-scrollbar {
            width: 6px;
        }
        .cart-items-checkout::-webkit-scrollbar-track {
            background: var(--background-light);
            border-radius: 3px;
        }
        .cart-items-checkout::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 3px;
        }
        .cart-items-checkout::-webkit-scrollbar-thumb:hover {
            background: var(--text-secondary);
        }
        .cart-scroll-indicator {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 12px 0 4px;
            background: linear-gradient(to bottom, transparent, var(--card-bg) 40%);
            color: var(--text-secondary);
            font-size: 0.8rem;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .cart-scroll-indicator i {
            font-size: 0.7rem;
            animation: bounce 1.5s infinite;
        }
        .cart-scroll-indicator.hidden {
            opacity: 0;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
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
        .checkout-item-remove {
            background: none;
            border: none;
            padding: 8px;
            cursor: pointer;
            color: var(--text-secondary);
            border-radius: 6px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .checkout-item-remove:hover {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }
        .checkout-item-remove i {
            font-size: 0.85rem;
        }
    `;
    document.head.appendChild(styleEl);
}

/**
 * Attach event listeners to remove buttons
 */
function attachRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll('.checkout-item-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            if (!productId) return;

            // Add removing animation
            const item = this.closest('.checkout-item');
            if (item) {
                item.style.opacity = '0.5';
                item.style.pointerEvents = 'none';
            }

            try {
                // Remove from cart
                await cartManager.removeItem(productId);

                // Update local cartItems array
                cartItems = cartItems.filter(ci => ci.product_id !== productId);

                // Update sessionStorage to remove this item from newly added list
                try {
                    const storedNewlyAdded = sessionStorage.getItem('newlyAddedCartItems');
                    if (storedNewlyAdded) {
                        let newlyAddedIds = JSON.parse(storedNewlyAdded);
                        newlyAddedIds = newlyAddedIds.filter(id => id !== productId);
                        if (newlyAddedIds.length > 0) {
                            sessionStorage.setItem('newlyAddedCartItems', JSON.stringify(newlyAddedIds));
                        } else {
                            // No more newly added items, clear the storage
                            sessionStorage.removeItem('newlyAddedCartItems');
                        }
                    }
                } catch (e) {
                    console.error('Error updating newlyAddedCartItems:', e);
                }

                // Check if cart is now empty
                if (cartItems.length === 0) {
                    // Clear sessionStorage since cart is empty
                    sessionStorage.removeItem('newlyAddedCartItems');
                    // Destroy payment element FIRST (before showEmptyCartMessage modifies the DOM)
                    if (paymentElement) {
                        paymentElement.destroy();
                        paymentElement = null;
                        elements = null;
                    }
                    // Now show empty cart message (after Stripe element is destroyed)
                    showEmptyCartMessage();
                } else {
                    // Re-display cart items
                    displayCartItems();

                    // Recreate payment intent with new total
                    await recreatePaymentIntentWithPromo();
                }
            } catch (error) {
                console.error('Error removing item:', error);
                // Restore item appearance
                if (item) {
                    item.style.opacity = '1';
                    item.style.pointerEvents = 'auto';
                }
                showError('Failed to remove item. Please try again.');
            }
        });
    });
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
 * Get product icon image path based on product ID
 * All products (guides and packages) use custom icons from assets/images/guide-icons/
 * Icon files should be named to match product IDs: {product_id}.webp
 */
function getProductIconPath(productId, productType) {
    // All products use custom icons - individual guides and packages alike
    // Icons should be named: {product_id}.webp (e.g., diabetes-type2.webp, pediatrics-full.webp)
    return `assets/images/guide-icons/${productId}.webp`;
}

/**
 * Get Font Awesome icon class for packages
 */
function getPackageIcon(productType) {
    const icons = {
        'lite-package': 'fas fa-book-medical',
        'full-package': 'fas fa-box-open'
    };
    return icons[productType] || 'fas fa-file-medical';
}

/**
 * Setup Stripe Elements with Payment Element
 * Supports Apple Pay, Google Pay, Link, and Cards
 */
async function setupStripeElements() {
    const submitButton = document.getElementById('submit-button');
    const paymentMessageEl = document.getElementById('payment-message');

    try {
        // Create a PaymentIntent on the server
        const paymentIntentData = await createPaymentIntent();
        clientSecret = paymentIntentData.clientSecret;

        // Create Stripe Elements instance with appearance options
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const appearance = getStripeAppearance(isDarkMode);

        elements = stripe.elements({
            clientSecret,
            appearance,
            loader: 'auto'
        });

        // Create and mount the Payment Element
        // This automatically shows Apple Pay, Google Pay, Link, and Cards
        paymentElement = elements.create('payment', {
            layout: {
                type: 'tabs',
                defaultCollapsed: false
            },
            // Pre-fill billing details from form
            defaultValues: {
                billingDetails: {
                    name: document.getElementById('name')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    address: {
                        line1: document.getElementById('address')?.value || '',
                        line2: document.getElementById('address2')?.value || '',
                        city: document.getElementById('city')?.value || '',
                        state: document.getElementById('state')?.value || '',
                        postal_code: document.getElementById('zip')?.value || '',
                        country: document.getElementById('country')?.value || 'US'
                    }
                }
            }
        });

        paymentElement.mount('#payment-element');

        // Get wrapper element for styling
        const paymentWrapper = document.getElementById('payment-element-wrapper');
        const paymentStatusIndicator = document.getElementById('payment-status-indicator');

        // Handle Payment Element events
        paymentElement.on('change', (event) => {
            if (event.error) {
                paymentMessageEl.textContent = event.error.message;
                paymentWrapper.classList.add('invalid');
                paymentWrapper.classList.remove('complete');
            } else {
                paymentMessageEl.textContent = '';
                paymentWrapper.classList.remove('invalid');
            }

            // Update complete state
            paymentElementComplete = event.complete;
            if (event.complete) {
                paymentWrapper.classList.add('complete');
                // Only show "Payment method ready" indicator for card payments
                const isCardPayment = event.value?.type === 'card';
                if (paymentStatusIndicator) {
                    paymentStatusIndicator.style.display = isCardPayment ? 'flex' : 'none';
                }
            } else {
                paymentWrapper.classList.remove('complete');
                if (paymentStatusIndicator) paymentStatusIndicator.style.display = 'none';
            }

            // Enable submit button when payment element is complete
            updateSubmitButton(event.complete);
        });

        // Handle loading state
        paymentElement.on('loaderstart', () => {
            paymentWrapper.classList.add('loading');
        });

        paymentElement.on('ready', () => {
            paymentWrapper.classList.remove('loading');
        });

        // Listen for theme changes to update appearance
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const newIsDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
                    const newAppearance = getStripeAppearance(newIsDarkMode);
                    elements.update({ appearance: newAppearance });
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });

        // Enable submit button (form validation will handle the rest)
        submitButton.disabled = false;

    } catch (error) {
        console.error('Stripe Elements setup error:', error);
        showError(error.message || 'Failed to load payment form. Please refresh the page.');
    }
}

/**
 * Create a PaymentIntent on the server
 */
async function createPaymentIntent() {
    const headers = {
        'Content-Type': 'application/json'
    };

    // Add auth header if authenticated
    if (isUserAuthenticated) {
        headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    }

    const payload = {
        items: cartItems.map(item => ({
            product_id: item.product_id,
            product_name: item.product_name,
            product_type: item.product_type,
            price: item.price,
            quantity: item.quantity || 1
        })),
        return_url: `${window.location.origin}/success.html`
    };

    // Add promo code if applied
    if (appliedPromo) {
        payload.promo_code = appliedPromo.code;
    }

    const response = await fetch(`${API_URL}/cart/checkout/create-payment-intent`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment session');
    }

    return await response.json();
}

/**
 * Get Stripe appearance config based on theme
 */
function getStripeAppearance(isDarkMode) {
    return {
        theme: isDarkMode ? 'night' : 'stripe',
        variables: {
            colorPrimary: '#2E86AB',
            colorBackground: isDarkMode ? '#1e1e2e' : '#ffffff',
            colorText: isDarkMode ? '#f5f5f5' : '#1a1a1a',
            colorDanger: '#ef4444',
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
            borderRadius: '8px'
        }
    };
}

/**
 * Get Card Element styling based on theme
 */
function getCardElementStyle(isDarkMode) {
    return {
        base: {
            color: isDarkMode ? '#f5f5f5' : '#1a1a1a',
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: isDarkMode ? '#6b7280' : '#9ca3af'
            }
        },
        invalid: {
            color: '#ef4444',
            iconColor: '#ef4444'
        }
    };
}

/**
 * Update submit button state
 */
function updateSubmitButton(paymentComplete) {
    const submitButton = document.getElementById('submit-button');
    const form = document.getElementById('payment-form');

    // Check if form is valid (all required fields filled)
    const formValid = form.checkValidity();

    // Update global state
    paymentElementComplete = paymentComplete;

    submitButton.disabled = !(paymentComplete && formValid);
}

/**
 * Setup subscription flow (redirect to Stripe Checkout)
 */
function setupSubscriptionFlow() {
    const subscriptionNotice = document.getElementById('subscription-notice');
    const cardSection = document.querySelector('.form-section:last-of-type');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const buttonIcon = document.getElementById('button-icon');

    // Show subscription notice
    subscriptionNotice.style.display = 'flex';

    // Hide card section - subscriptions use Stripe Checkout
    if (cardSection) {
        cardSection.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
                <i class="fas fa-external-link-alt" style="font-size: 2rem; margin-bottom: 12px; color: var(--primary-color);"></i>
                <p>You'll be redirected to Stripe's secure checkout to complete your subscription.</p>
            </div>
        `;
    }

    // Update button
    buttonText.textContent = 'Continue to Checkout';
    buttonIcon.className = 'fas fa-external-link-alt';
    submitButton.disabled = false;
}

/**
 * Handle form submission
 */
async function handleSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const buttonIcon = document.getElementById('button-icon');
    const spinner = document.getElementById('button-spinner');

    // Get form values
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const address2 = document.getElementById('address2').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const country = document.getElementById('country').value;

    // Validate email
    if (!email || !isValidEmail(email)) {
        showError('Please enter a valid email address.');
        document.getElementById('email').focus();
        return;
    }

    // Validate required fields
    if (!name || !address || !city || !state || !zip) {
        showError('Please fill in all required fields.');
        return;
    }

    hideError();

    // Handle subscription checkout (redirect to Stripe)
    if (singleProductMode && currentProduct && currentProduct.type === 'subscription') {
        submitButton.disabled = true;
        buttonText.textContent = 'Redirecting...';
        buttonIcon.style.display = 'none';
        spinner.style.display = 'inline-block';

        try {
            await handleSubscriptionCheckout(email);
        } catch (error) {
            console.error('Subscription checkout error:', error);
            showError(error.message || 'Failed to start checkout. Please try again.');

            submitButton.disabled = false;
            buttonText.textContent = 'Continue to Checkout';
            buttonIcon.style.display = 'inline-block';
            buttonIcon.className = 'fas fa-external-link-alt';
            spinner.style.display = 'none';
        }
        return;
    }

    // Disable button and show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Processing...';
    buttonIcon.style.display = 'none';
    spinner.style.display = 'inline-block';

    try {
        // Confirm the payment using the Payment Element
        // This handles all payment methods: Cards, Apple Pay, Google Pay, Link
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success.html`,
                receipt_email: email,
                payment_method_data: {
                    billing_details: {
                        name: name,
                        email: email,
                        address: {
                            line1: address,
                            line2: address2 || null,
                            city: city,
                            state: state,
                            postal_code: zip,
                            country: country
                        }
                    }
                }
            },
            redirect: 'if_required' // Only redirect if necessary (3D Secure, wallet auth, etc.)
        });

        if (error) {
            // Show error to customer
            if (error.type === 'card_error' || error.type === 'validation_error') {
                showError(error.message);
            } else {
                showError('An unexpected error occurred. Please try again.');
            }

            // Also show in payment message area
            const paymentMessageEl = document.getElementById('payment-message');
            if (paymentMessageEl) {
                paymentMessageEl.textContent = error.message;
            }

            // Report payment errors
            if (typeof captureError === 'function') {
                captureError(error, {
                    action: 'payment_confirmation',
                    errorType: error.type,
                    errorCode: error.code
                });
            }

            // Reset button
            submitButton.disabled = false;
            buttonText.textContent = 'Complete Purchase';
            buttonIcon.style.display = 'inline-block';
            buttonIcon.className = 'fas fa-lock';
            spinner.style.display = 'none';
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment succeeded without redirect - redirect to success page
            buttonText.textContent = 'Payment Successful!';

            // Clear cart
            if (typeof cartManager !== 'undefined') {
                await cartManager.clearCart();
            }

            // Redirect to success page
            window.location.href = `success.html?payment_intent=${paymentIntent.id}`;
        } else if (paymentIntent && paymentIntent.status === 'requires_action') {
            // 3D Secure or other authentication required
            // Stripe.js handles this automatically in most cases
            buttonText.textContent = 'Authenticating...';
        } else if (paymentIntent && paymentIntent.status === 'processing') {
            // Some payment methods (like bank transfers) take time
            buttonText.textContent = 'Processing...';
            // Redirect to success page to show pending state
            window.location.href = `success.html?payment_intent=${paymentIntent.id}`;
        } else {
            // Unexpected status or redirect happened
            showError('Payment processing. Please wait...');
        }
        // Note: If redirect happened, user is taken to return_url automatically

    } catch (error) {
        console.error('Payment error:', error);
        showError('Payment failed. Please try again.');

        if (typeof captureError === 'function') {
            captureError(error, { action: 'payment_submission' });
        }

        submitButton.disabled = false;
        buttonText.textContent = 'Complete Purchase';
        buttonIcon.style.display = 'inline-block';
        buttonIcon.className = 'fas fa-lock';
        spinner.style.display = 'none';
    }
}

/**
 * Handle subscription checkout redirect
 */
async function handleSubscriptionCheckout(email) {
    const response = await fetch(`${API_URL}/api/create-subscription`, {
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
 * Update navbar to show authenticated state
 */
function updateNavbarForAuth(user) {
    const navLoginLink = document.getElementById('nav-login-link');
    const navDashboardLink = document.getElementById('nav-dashboard-link');
    const userMenu = document.getElementById('user-menu');
    const dropdownUserName = document.getElementById('dropdown-user-name');
    const dropdownUserEmail = document.getElementById('dropdown-user-email');

    // Hide login link, show dashboard link
    if (navLoginLink) {
        navLoginLink.style.display = 'none';
    }
    if (navDashboardLink) {
        navDashboardLink.style.display = 'inline';
    }

    // Show user menu
    if (userMenu) {
        userMenu.style.display = 'block';

        // Build display name from first_name + last_name, or fall back to email prefix
        let userName = 'User';
        if (user.first_name || user.last_name) {
            userName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        } else if (user.name || user.displayName || user.full_name) {
            userName = user.name || user.displayName || user.full_name;
        } else if (user.email) {
            userName = user.email.split('@')[0];
        }
        const userEmail = user.email || user.user_email || '';

        if (dropdownUserName) {
            dropdownUserName.textContent = userName;
        }
        if (dropdownUserEmail) {
            dropdownUserEmail.textContent = userEmail;
        }

        // Setup user menu toggle
        const userMenuBtn = document.getElementById('user-menu-btn');
        const userDropdown = document.getElementById('user-dropdown');

        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userMenu.contains(e.target)) {
                    userDropdown.classList.remove('active');
                }
            });
        }

        // Setup logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Use centralized logout function from api-service.js
                if (typeof performLogout === 'function') {
                    performLogout();
                } else {
                    // Fallback if api-service.js not loaded
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    window.location.href = 'login.html';
                }
            });
        }
    }
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

/**
 * Toggle email field between locked (account email) and editable (different email)
 */
function toggleEmailEdit() {
    const emailInput = document.getElementById('email');
    const emailGroup = document.getElementById('email-group');
    const useDifferentEmailBtn = document.getElementById('use-different-email-btn');
    const emailHint = document.getElementById('email-hint');

    if (useAccountEmail) {
        // Switch to editable mode
        useAccountEmail = false;
        emailInput.readOnly = false;
        emailInput.value = '';
        emailInput.placeholder = 'Enter a different email address';
        emailInput.focus();
        emailGroup.classList.remove('email-locked');
        useDifferentEmailBtn.innerHTML = '<i class="fas fa-undo"></i> Use account email';
        emailHint.textContent = 'Enter the email where you want your receipt sent.';
    } else {
        // Switch back to account email
        useAccountEmail = true;
        emailInput.value = accountEmail;
        emailInput.readOnly = true;
        emailInput.placeholder = 'your@email.com';
        emailGroup.classList.add('email-locked');
        useDifferentEmailBtn.innerHTML = '<i class="fas fa-edit"></i> Use a different email';
        emailHint.textContent = 'Your receipt and guide access will be sent to this email.';
    }
}

/**
 * Initialize promo code functionality
 */
function initPromoCode() {
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const removePromoBtn = document.getElementById('remove-promo-btn');
    const promoCodeInput = document.getElementById('promo-code');

    if (!applyPromoBtn || !promoCodeInput) return;

    // Apply promo code
    applyPromoBtn.addEventListener('click', () => validateAndApplyPromo());

    // Allow enter key to apply promo
    promoCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateAndApplyPromo();
        }
    });

    // Remove promo code
    if (removePromoBtn) {
        removePromoBtn.addEventListener('click', () => removePromoCode());
    }
}

/**
 * Validate and apply promo code
 */
async function validateAndApplyPromo() {
    const promoCodeInput = document.getElementById('promo-code');
    const promoMessage = document.getElementById('promo-message');
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const promoCode = promoCodeInput.value.trim().toUpperCase();

    if (!promoCode) {
        showPromoMessage('Please enter a promo code', 'error');
        return;
    }

    // Show loading state
    applyPromoBtn.disabled = true;
    applyPromoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    promoMessage.textContent = '';
    promoMessage.className = 'promo-message';

    try {
        const response = await fetch(`${API_URL}/cart/checkout/validate-promo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promo_code: promoCode,
                subtotal: cartSubtotal * 100 // Convert to cents
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showPromoMessage(data.error || 'Invalid promo code', 'error');
            return;
        }

        // Successfully validated - apply the promo
        appliedPromo = {
            code: promoCode,
            promo_id: data.promo_id,
            coupon_id: data.coupon_id,
            name: data.name,
            discount_type: data.discount_type,
            discount_value: data.percent_off || data.amount_off,
            discount_amount: data.discount_amount // Already in dollars from backend
        };
        promoDiscount = appliedPromo.discount_amount;
        promoDiscountType = data.discount_type;

        // Update UI
        applyPromoSuccess();

        // Update order totals to reflect promo discount
        updateOrderTotalsWithPromo();

        // Recreate the payment intent with the promo code
        await recreatePaymentIntentWithPromo();

    } catch (error) {
        console.error('Promo validation error:', error);
        showPromoMessage('Failed to validate promo code. Please try again.', 'error');
    } finally {
        applyPromoBtn.disabled = false;
        applyPromoBtn.innerHTML = 'Apply';
    }
}

/**
 * Show promo message (success or error)
 */
function showPromoMessage(message, type) {
    const promoMessage = document.getElementById('promo-message');
    promoMessage.textContent = message;
    promoMessage.className = `promo-message ${type}`;
}

/**
 * Apply promo success - update UI
 */
function applyPromoSuccess() {
    const promoSection = document.getElementById('promo-section');
    const promoApplied = document.getElementById('promo-applied');
    const promoAppliedText = document.getElementById('promo-applied-text');
    const promoInputInline = promoSection ? promoSection.querySelector('.promo-input-inline') : null;

    // Hide input, show applied badge
    if (promoInputInline) promoInputInline.style.display = 'none';
    if (promoApplied) promoApplied.style.display = 'flex';

    // Format the discount text
    let discountText = appliedPromo.code;
    if (appliedPromo.discount_type === 'percent') {
        discountText += ` (${appliedPromo.discount_value}% off)`;
    } else {
        discountText += ` ($${appliedPromo.discount_amount.toFixed(2)} off)`;
    }
    if (promoAppliedText) promoAppliedText.textContent = discountText;
}

/**
 * Remove promo code
 */
async function removePromoCode() {
    const promoSection = document.getElementById('promo-section');
    const promoApplied = document.getElementById('promo-applied');
    const promoInputInline = promoSection ? promoSection.querySelector('.promo-input-inline') : null;
    const promoCodeInput = document.getElementById('promo-code');
    const promoMessage = document.getElementById('promo-message');

    // Reset promo state
    appliedPromo = null;
    promoDiscount = 0;
    promoDiscountType = null;

    // Reset UI
    if (promoApplied) promoApplied.style.display = 'none';
    if (promoInputInline) promoInputInline.style.display = 'flex';
    if (promoCodeInput) promoCodeInput.value = '';
    if (promoMessage) {
        promoMessage.textContent = '';
        promoMessage.className = 'promo-message';
    }

    // Update order totals
    updateOrderTotalsWithPromo();

    // Recreate payment intent without promo
    await recreatePaymentIntentWithPromo();
}

/**
 * Update order totals to show promo discount
 */
function updateOrderTotalsWithPromo() {
    const orderTotalEl = document.querySelector('.order-total');
    if (!orderTotalEl) return;

    // Get base discount info from cart
    const discountInfo = cartManager.getDiscountInfo();
    const baseSubtotal = discountInfo.hasDiscount ? discountInfo.discountedSubtotal : discountInfo.originalSubtotal;

    let html = '';

    // Show bundle discount if applicable
    if (discountInfo.hasDiscount) {
        html += `
            <div class="total-row" style="color: var(--text-secondary);">
                <span>Original Price</span>
                <span style="text-decoration: line-through;">$${discountInfo.originalSubtotal.toFixed(2)}</span>
            </div>
            <div class="total-row discount-row" style="color: #f59e0b; font-weight: 600;">
                <span><i class="fas fa-tag" style="margin-right: 6px;"></i>Bundle Discount</span>
                <span>-$${discountInfo.totalDiscount.toFixed(2)}</span>
            </div>
        `;
    } else {
        html += `
            <div class="total-row">
                <span>Subtotal</span>
                <span id="subtotal">$${discountInfo.originalSubtotal.toFixed(2)}</span>
            </div>
        `;
    }

    // Show promo discount if applied
    if (appliedPromo && promoDiscount > 0) {
        html += `
            <div class="total-row promo-discount-row" style="color: #f59e0b; font-weight: 600;">
                <span><i class="fas fa-ticket-alt" style="margin-right: 6px;"></i>Promo: ${appliedPromo.code}</span>
                <span>-$${promoDiscount.toFixed(2)}</span>
            </div>
        `;
    }

    // Calculate final total
    const finalTotal = Math.max(0, baseSubtotal - promoDiscount);

    html += `
        <div class="total-row total-final">
            <span>Total</span>
            <span id="total">$${finalTotal.toFixed(2)}</span>
        </div>
    `;

    // Show savings message
    const totalSavings = (discountInfo.hasDiscount ? discountInfo.totalDiscount : 0) + promoDiscount;
    if (totalSavings > 0) {
        html += `
            <div class="checkout-savings-message" style="
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
                border: 1px solid rgba(245, 158, 11, 0.2);
                border-radius: 8px;
                padding: 12px;
                margin-top: 16px;
                text-align: center;
            ">
                <i class="fas fa-check-circle" style="color: #f59e0b; margin-right: 6px;"></i>
                <span style="color: #f59e0b; font-weight: 600;">
                    You're saving $${totalSavings.toFixed(2)} on this order!
                </span>
            </div>
        `;
    }

    orderTotalEl.innerHTML = html;

    // Update cartSubtotal for payment
    cartSubtotal = finalTotal;
}

/**
 * Recreate payment intent with or without promo code
 */
async function recreatePaymentIntentWithPromo() {
    try {
        const paymentIntentData = await createPaymentIntent();
        clientSecret = paymentIntentData.clientSecret;

        // Update Stripe Elements with new client secret
        if (paymentElement) {
            // We need to destroy and recreate Elements with new client secret
            paymentElement.destroy();
            paymentElement = null;
            elements = null;

            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            const appearance = getStripeAppearance(isDarkMode);

            elements = stripe.elements({
                clientSecret,
                appearance,
                loader: 'auto'
            });

            paymentElement = elements.create('payment', {
                layout: {
                    type: 'tabs',
                    defaultCollapsed: false
                },
                defaultValues: {
                    billingDetails: {
                        name: document.getElementById('name')?.value || '',
                        email: document.getElementById('email')?.value || '',
                        address: {
                            line1: document.getElementById('address')?.value || '',
                            line2: document.getElementById('address2')?.value || '',
                            city: document.getElementById('city')?.value || '',
                            state: document.getElementById('state')?.value || '',
                            postal_code: document.getElementById('zip')?.value || '',
                            country: document.getElementById('country')?.value || 'US'
                        }
                    }
                }
            });

            paymentElement.mount('#payment-element');

            // Re-attach event listeners with wrapper styling
            const paymentWrapper = document.getElementById('payment-element-wrapper');
            const paymentStatusIndicator = document.getElementById('payment-status-indicator');

            paymentElement.on('change', (event) => {
                const paymentMessageEl = document.getElementById('payment-message');
                if (event.error) {
                    paymentMessageEl.textContent = event.error.message;
                    paymentWrapper.classList.add('invalid');
                    paymentWrapper.classList.remove('complete');
                } else {
                    paymentMessageEl.textContent = '';
                    paymentWrapper.classList.remove('invalid');
                }

                paymentElementComplete = event.complete;
                if (event.complete) {
                    paymentWrapper.classList.add('complete');
                    // Only show "Payment method ready" indicator for card payments
                    const isCardPayment = event.value?.type === 'card';
                    if (paymentStatusIndicator) {
                        paymentStatusIndicator.style.display = isCardPayment ? 'flex' : 'none';
                    }
                } else {
                    paymentWrapper.classList.remove('complete');
                    if (paymentStatusIndicator) paymentStatusIndicator.style.display = 'none';
                }

                updateSubmitButton(event.complete);
            });

            paymentElement.on('loaderstart', () => {
                paymentWrapper.classList.add('loading');
            });

            paymentElement.on('ready', () => {
                paymentWrapper.classList.remove('loading');
            });
        }
    } catch (error) {
        console.error('Error recreating payment intent:', error);
        showError('Failed to update payment. Please refresh the page.');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure cart service is loaded
    setTimeout(() => {
        initCheckout();
        initPromoCode();
    }, 100);

    // Setup form submission handler
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handleSubmit);

    // Add input listeners for form validation
    const requiredInputs = paymentForm.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Trigger button state update using global paymentElementComplete state
            updateSubmitButton(paymentElementComplete);
        });
    });
});

// Re-initialize if user navigates back
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page was loaded from cache (back button)
        // Destroy existing payment element if any
        if (paymentElement) {
            paymentElement.destroy();
            paymentElement = null;
            elements = null;
        }
        setTimeout(() => initCheckout(), 100);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (paymentElement) {
        paymentElement.destroy();
    }
});
