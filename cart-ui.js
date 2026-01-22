/**
 * Cart UI - Shopping Cart Interface Components
 * Handles cart drawer, toasts, and button states
 */

/**
 * CartUI class - manages cart user interface
 */
class CartUI {
    constructor() {
        this.drawer = null;
        this.overlay = null;
        this.badge = null;
        this.toastContainer = null;
        this.isInitialized = false;
    }

    /**
     * Initialize cart UI components
     */
    init() {
        if (this.isInitialized) return;

        this.createDrawer();
        this.createToastContainer();
        this.bindEvents();
        this.subscribeToCart();
        this.isInitialized = true;

        // Update badge on init
        this.updateBadge();
    }

    /**
     * Create cart drawer HTML
     */
    createDrawer() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'cart-overlay';
        this.overlay.id = 'cart-overlay';

        // Create drawer
        this.drawer = document.createElement('div');
        this.drawer.className = 'cart-drawer';
        this.drawer.id = 'cart-drawer';
        this.drawer.innerHTML = `
            <div class="cart-drawer-header">
                <h2><i class="fas fa-shopping-cart"></i> Your Cart</h2>
                <button class="cart-close-btn" aria-label="Close cart">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-items-container" id="cart-items-container">
                <!-- Items rendered dynamically -->
            </div>
            <div class="cart-drawer-footer">
                <div class="cart-discount-section" id="cart-discount-section" style="display: none;">
                    <div class="cart-original-price">
                        <span>Original Price</span>
                        <span id="cart-original-price">$0.00</span>
                    </div>
                    <div class="cart-savings">
                        <span><i class="fas fa-tag"></i> Bundle Discount</span>
                        <span id="cart-savings" class="savings-amount">-$0.00</span>
                    </div>
                </div>
                <div class="cart-progress-section" id="cart-progress-section">
                    <!-- Progress bars rendered dynamically -->
                </div>
                <div class="cart-subtotal">
                    <span class="cart-subtotal-label">Total</span>
                    <span class="cart-subtotal-value" id="cart-subtotal">$0.00</span>
                </div>
                <button class="cart-checkout-btn" id="cart-checkout-btn">
                    <i class="fas fa-lock"></i>
                    Proceed to Checkout
                </button>
                <button class="cart-continue-btn" id="cart-continue-btn">
                    <i class="fas fa-arrow-left"></i>
                    Continue Shopping
                </button>
            </div>
        `;

        // Append to body
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.drawer);

        // Find badge
        this.badge = document.querySelector('.cart-badge');
    }

    /**
     * Create toast notification container
     */
    createToastContainer() {
        this.toastContainer = document.createElement('div');
        this.toastContainer.className = 'cart-toast-container';
        this.toastContainer.id = 'cart-toast-container';
        document.body.appendChild(this.toastContainer);
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Close button
        const closeBtn = this.drawer.querySelector('.cart-close-btn');
        closeBtn.addEventListener('click', () => this.closeDrawer());

        // Overlay click
        this.overlay.addEventListener('click', () => this.closeDrawer());

        // Checkout button
        const checkoutBtn = this.drawer.querySelector('#cart-checkout-btn');
        checkoutBtn.addEventListener('click', () => this.handleCheckout());

        // Continue shopping button
        const continueBtn = this.drawer.querySelector('#cart-continue-btn');
        continueBtn.addEventListener('click', () => this.closeDrawer());

        // Cart icon click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-icon-container')) {
                this.toggleDrawer();
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.drawer.classList.contains('active')) {
                this.closeDrawer();
            }
        });
    }

    /**
     * Subscribe to cart changes
     */
    subscribeToCart() {
        if (typeof cartManager !== 'undefined') {
            cartManager.subscribe((cart) => {
                this.renderCart(cart);
                this.updateBadge();
            });
        }
    }

    /**
     * Open cart drawer
     */
    openDrawer() {
        this.drawer.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderCart(cartManager.cart);
    }

    /**
     * Close cart drawer
     */
    closeDrawer() {
        this.drawer.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Toggle cart drawer
     */
    toggleDrawer() {
        if (this.drawer.classList.contains('active')) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }

    /**
     * Render cart contents
     * @param {object} cart - Cart data
     */
    renderCart(cart) {
        const container = document.getElementById('cart-items-container');
        const subtotalEl = document.getElementById('cart-subtotal');
        const checkoutBtn = document.getElementById('cart-checkout-btn');
        const discountSection = document.getElementById('cart-discount-section');
        const originalPriceEl = document.getElementById('cart-original-price');
        const savingsEl = document.getElementById('cart-savings');

        if (!container) return;

        const items = cart.items || [];

        if (items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <img src="assets/images/bag.png" alt="Empty cart" class="cart-empty-img">
                    <h3>Your cart is empty</h3>
                    <p>Add study guides to get started!</p>
                    <a href="store.html" class="btn btn-primary" onclick="cartUI.closeDrawer()">
                        Browse Guides
                    </a>
                </div>
            `;
            subtotalEl.textContent = '$0.00';
            checkoutBtn.disabled = true;
            if (discountSection) discountSection.style.display = 'none';
            const progressSection = document.getElementById('cart-progress-section');
            if (progressSection) progressSection.innerHTML = '';
        } else {
            container.innerHTML = items.map(item => this.renderCartItem(item)).join('');

            // Calculate discount info
            const discountInfo = cartManager.getDiscountInfo();

            if (discountInfo.hasDiscount) {
                // Show discount breakdown
                if (discountSection) {
                    discountSection.style.display = 'block';
                    originalPriceEl.textContent = `$${discountInfo.originalSubtotal.toFixed(2)}`;
                    savingsEl.textContent = `-$${discountInfo.totalDiscount.toFixed(2)}`;
                }
                subtotalEl.textContent = `$${discountInfo.discountedSubtotal.toFixed(2)}`;
            } else {
                // No discount - hide discount section
                if (discountSection) discountSection.style.display = 'none';
                subtotalEl.textContent = `$${discountInfo.originalSubtotal.toFixed(2)}`;
            }

            // Render discount progress bars
            this.renderProgressBars(discountInfo);

            checkoutBtn.disabled = false;

            // Add remove button listeners
            container.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const productId = e.currentTarget.dataset.productId;
                    await this.removeItem(productId);
                });
            });

            // Add quantity control listeners
            container.querySelectorAll('.qty-decrease').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const productId = e.currentTarget.dataset.productId;
                    const item = items.find(i => i.product_id === productId);
                    if (item) {
                        const newQty = (item.quantity || 1) - 1;
                        await this.updateQuantity(productId, newQty);
                    }
                });
            });

            container.querySelectorAll('.qty-increase').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const productId = e.currentTarget.dataset.productId;
                    const item = items.find(i => i.product_id === productId);
                    if (item) {
                        const newQty = (item.quantity || 1) + 1;
                        await this.updateQuantity(productId, newQty);
                    }
                });
            });
        }
    }

    /**
     * Render a single cart item
     * @param {object} item - Cart item data
     * @returns {string} - HTML string
     */
    renderCartItem(item) {
        const typeLabel = this.getTypeLabel(item.product_type);
        const iconClass = this.getTypeIcon(item.product_type);
        const quantity = item.quantity || 1;
        const itemTotal = (parseFloat(item.price) * quantity).toFixed(2);

        return `
            <div class="cart-item" data-product-id="${this.escapeHtml(item.product_id)}">
                <div class="cart-item-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${this.escapeHtml(item.product_name)}</div>
                    <div class="cart-item-type">${typeLabel}</div>
                    <div class="cart-item-quantity-controls">
                        <button class="qty-btn qty-decrease" data-product-id="${this.escapeHtml(item.product_id)}" aria-label="Decrease quantity">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-value">${quantity}</span>
                        <button class="qty-btn qty-increase" data-product-id="${this.escapeHtml(item.product_id)}" aria-label="Increase quantity">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-price-section">
                    <div class="cart-item-price">$${itemTotal}</div>
                    ${quantity > 1 ? `<div class="cart-item-unit-price">$${parseFloat(item.price).toFixed(2)} each</div>` : ''}
                </div>
                <button class="cart-item-remove" data-product-id="${this.escapeHtml(item.product_id)}" aria-label="Remove item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }

    /**
     * Get human-readable type label
     * @param {string} type - Product type
     * @returns {string}
     */
    getTypeLabel(type) {
        const labels = {
            'individual': 'Study Guide',
            'lite-package': 'Lite Package',
            'full-package': 'Full Package'
        };
        return labels[type] || type;
    }

    /**
     * Get icon class for product type
     * @param {string} type - Product type
     * @returns {string}
     */
    getTypeIcon(type) {
        const icons = {
            'individual': 'fas fa-file-medical',
            'lite-package': 'fas fa-book-medical',
            'full-package': 'fas fa-books-medical'
        };
        return icons[type] || 'fas fa-file';
    }

    /**
     * Update cart badge count
     */
    updateBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = cartManager ? cartManager.getItemCount() : 0;

        badges.forEach(badge => {
            badge.textContent = count;
            if (count === 0) {
                badge.classList.add('empty');
            } else {
                badge.classList.remove('empty');
            }
        });
    }

    /**
     * Render discount progress bars
     * @param {object} discountInfo - Discount info from cartManager
     */
    renderProgressBars(discountInfo) {
        const progressSection = document.getElementById('cart-progress-section');
        if (!progressSection) return;

        const currentCount = discountInfo.individualGuideCount;
        const tiers = CartManager.BULK_DISCOUNT_TIERS.slice().reverse(); // 3, 5, 10

        let html = '';

        // Find which tier we're working towards or have achieved
        let previousTierQty = 0;

        for (let i = 0; i < tiers.length; i++) {
            const tier = tiers[i];
            const nextTier = tiers[i + 1];

            if (currentCount >= tier.min_qty) {
                // Already achieved this tier
                if (nextTier) {
                    // Show current tier unlocked + progress to next tier
                    const progress = ((currentCount - tier.min_qty) / (nextTier.min_qty - tier.min_qty)) * 100;
                    const remaining = nextTier.min_qty - currentCount;
                    html = this.createProgressBarWithCurrentTier(
                        Math.min(progress, 100),
                        remaining,
                        nextTier.min_qty,
                        nextTier.savings_label,
                        tier.min_qty,
                        tier.savings_label
                    );
                } else {
                    // At max tier - show completed state
                    html = this.createCompletedBar();
                }
                break;
            } else if (currentCount > previousTierQty || i === 0) {
                // Working towards this tier
                const startFrom = previousTierQty;
                const progress = startFrom === 0
                    ? (currentCount / tier.min_qty) * 100
                    : ((currentCount - startFrom) / (tier.min_qty - startFrom)) * 100;
                const remaining = tier.min_qty - currentCount;
                html = this.createProgressBar(
                    Math.max(0, Math.min(progress, 100)),
                    remaining,
                    tier.min_qty,
                    tier.savings_label,
                    currentCount === 0
                );
                break;
            }

            previousTierQty = tier.min_qty;
        }

        progressSection.innerHTML = html;
    }

    /**
     * Create a progress bar HTML (no current tier unlocked yet)
     */
    createProgressBar(progress, remaining, tierQty, savingsLabel, isEmpty) {
        const message = isEmpty
            ? `Add ${remaining} guides to unlock bundle pricing!`
            : `${remaining} more guide${remaining !== 1 ? 's' : ''} for ${tierQty}-pack deal!`;

        return `
            <div class="cart-discount-progress">
                <div class="progress-header">
                    <span class="progress-message">
                        <i class="fas fa-gift"></i> ${message}
                    </span>
                    <span class="progress-savings">${savingsLabel}</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-tiers">
                    <span class="tier-label">${tierQty}-pack: $${tierQty === 3 ? '15' : tierQty === 5 ? '25' : '50'}</span>
                </div>
            </div>
        `;
    }

    /**
     * Create a progress bar showing current tier unlocked + progress to next
     */
    createProgressBarWithCurrentTier(progress, remaining, nextTierQty, nextSavingsLabel, currentTierQty, currentSavingsLabel) {
        return `
            <div class="cart-discount-progress has-current-tier">
                <div class="current-tier-badge">
                    <i class="fas fa-check-circle"></i> ${currentTierQty}-pack unlocked! (${currentSavingsLabel})
                </div>
                <div class="progress-header">
                    <span class="progress-message">
                        <i class="fas fa-arrow-up"></i> ${remaining} more for ${nextTierQty}-pack!
                    </span>
                    <span class="progress-savings">${nextSavingsLabel}</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
    }

    /**
     * Create completed max tier bar
     */
    createCompletedBar() {
        return `
            <div class="cart-discount-progress completed">
                <div class="progress-header">
                    <span class="progress-message">
                        <i class="fas fa-check-circle"></i> Max bundle discount unlocked!
                    </span>
                    <span class="progress-savings">Save $9.90</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: 100%"></div>
                </div>
            </div>
        `;
    }

    /**
     * Animate badge on item add
     */
    animateBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            badge.classList.add('added');
            setTimeout(() => badge.classList.remove('added'), 300);
        });
    }

    /**
     * Remove item from cart
     * @param {string} productId - Product ID
     */
    async removeItem(productId) {
        try {
            await cartManager.removeItem(productId);
            this.updateAddToCartButtons();
        } catch (error) {
            this.showToast('error', 'Error', error.message || 'Failed to remove item.');
        }
    }

    /**
     * Update item quantity
     * @param {string} productId - Product ID
     * @param {number} quantity - New quantity
     */
    async updateQuantity(productId, quantity) {
        try {
            await cartManager.updateQuantity(productId, quantity);
            this.updateAddToCartButtons();
        } catch (error) {
            this.showToast('error', 'Error', error.message || 'Failed to update quantity.');
        }
    }

    /**
     * Handle checkout button click
     */
    handleCheckout() {
        this.closeDrawer();
        window.location.href = 'checkout.html';
    }

    /**
     * Show toast notification
     * @param {string} type - 'success' or 'error'
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     */
    showToast(type, title, message) {
        const toast = document.createElement('div');
        toast.className = `cart-toast ${type}`;
        toast.innerHTML = `
            <div class="cart-toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-circle'}"></i>
            </div>
            <div class="cart-toast-content">
                <div class="cart-toast-title">${this.escapeHtml(title)}</div>
                <div class="cart-toast-message">${this.escapeHtml(message)}</div>
            </div>
            <button class="cart-toast-close" aria-label="Dismiss">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add close handler
        toast.querySelector('.cart-toast-close').addEventListener('click', () => {
            this.removeToast(toast);
        });

        this.toastContainer.appendChild(toast);

        // Auto-remove after 4 seconds
        setTimeout(() => this.removeToast(toast), 4000);
    }

    /**
     * Remove toast with animation
     * @param {HTMLElement} toast - Toast element
     */
    removeToast(toast) {
        if (!toast.parentElement) return;
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }

    /**
     * Add item to cart (called from store page buttons)
     * @param {string} productId - Product ID
     * @param {string} productName - Product name
     * @param {string} productType - Product type
     * @param {number} price - Product price
     * @param {HTMLElement} button - Button element (optional)
     * @param {number} quantity - Quantity to add (default 1)
     */
    async addToCart(productId, productName, productType, price, button = null, quantity = 1) {
        if (button) {
            button.classList.add('adding');
            button.disabled = true;
        }

        try {
            await cartManager.addItem(productId, productName, productType, price, quantity);

            // Show checkmark feedback on button briefly
            if (button) {
                button.classList.remove('adding');
                button.classList.add('just-added');
                button.innerHTML = '<i class="fas fa-check"></i> Added!';

                // Reset button after brief delay
                setTimeout(() => {
                    button.classList.remove('just-added');
                    this.updateAddToCartButtons();
                }, 1500);
            }

            this.animateBadge();

            // Open the cart drawer instead of showing toast
            this.openDrawer();

        } catch (error) {
            this.showToast('error', 'Error', error.message || 'Failed to add item to cart.');
            if (button) {
                button.classList.remove('adding');
                button.disabled = false;
            }
        }
    }

    /**
     * Update all add-to-cart button states
     */
    updateAddToCartButtons() {
        const buttons = document.querySelectorAll('.add-to-cart-btn');
        const cartItems = cartManager ? cartManager.getItems() : [];
        const cartItemMap = {};
        cartItems.forEach(item => {
            cartItemMap[item.product_id] = item.quantity || 1;
        });

        buttons.forEach(button => {
            const productId = button.dataset.productId;

            if (button.classList.contains('purchased')) {
                // Already purchased - keep disabled
                return;
            }

            if (cartItemMap[productId]) {
                // Item is in cart - show quantity and allow adding more
                const qty = cartItemMap[productId];
                button.classList.add('in-cart');
                button.innerHTML = `<i class="fas fa-cart-plus"></i> Add Another (${qty} in cart)`;
                button.disabled = false;
            } else {
                // Not in cart - show normal add button
                button.classList.remove('in-cart');
                button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                button.disabled = false;
            }
        });
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} str - String to escape
     * @returns {string}
     */
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Create singleton instance
const cartUI = new CartUI();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure cart-service is loaded
    setTimeout(() => {
        cartUI.init();
    }, 100);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CartUI, cartUI };
}
