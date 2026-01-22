/**
 * Cart Service - Shopping Cart Manager
 * Handles cart operations for both authenticated users (API) and guests (localStorage)
 */

// localStorage key for guest cart
const GUEST_CART_KEY = 'florencebot_guest_cart';

/**
 * CartManager class - manages shopping cart state
 */
class CartManager {
    constructor() {
        this.cart = { items: [], subtotal: 0 };
        this.listeners = [];
    }

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        return typeof isAuthenticated === 'function' ? isAuthenticated() : !!localStorage.getItem('accessToken');
    }

    /**
     * Subscribe to cart changes
     * @param {function} callback - Function to call when cart changes
     * @returns {function} - Unsubscribe function
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    /**
     * Notify all listeners of cart changes
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.cart));
    }

    /**
     * Get cart from appropriate source (API or localStorage)
     * @returns {Promise<object>} - Cart data
     */
    async getCart() {
        try {
            if (this.isAuthenticated()) {
                // Fetch from API
                const data = await apiCall('/cart');
                this.cart = {
                    items: data.items || [],
                    subtotal: data.subtotal || 0,
                    item_count: data.item_count || 0
                };
            } else {
                // Get from localStorage
                this.cart = this.getGuestCart();
            }
            this.notifyListeners();
            return this.cart;
        } catch (error) {
            console.error('Failed to get cart:', error);
            // Fall back to guest cart on error
            this.cart = this.getGuestCart();
            this.notifyListeners();
            return this.cart;
        }
    }

    /**
     * Get guest cart from localStorage
     * @returns {object} - Cart data
     */
    getGuestCart() {
        try {
            const stored = localStorage.getItem(GUEST_CART_KEY);
            if (stored) {
                const cart = JSON.parse(stored);
                return {
                    items: cart.items || [],
                    subtotal: this.calculateSubtotal(cart.items || []),
                    item_count: (cart.items || []).length
                };
            }
        } catch (e) {
            console.error('Failed to parse guest cart:', e);
        }
        return { items: [], subtotal: 0, item_count: 0 };
    }

    /**
     * Save guest cart to localStorage
     * @param {object} cart - Cart data
     */
    saveGuestCart(cart) {
        try {
            localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error('Failed to save guest cart:', e);
        }
    }

    /**
     * Calculate subtotal from items (accounts for quantity)
     * @param {array} items - Cart items
     * @returns {number} - Subtotal
     */
    calculateSubtotal(items) {
        return items.reduce((sum, item) => {
            const quantity = item.quantity || 1;
            return sum + ((parseFloat(item.price) || 0) * quantity);
        }, 0);
    }

    /**
     * Calculate total item count (accounts for quantity)
     * @param {array} items - Cart items
     * @returns {number} - Total item count
     */
    calculateItemCount(items) {
        return items.reduce((count, item) => count + (item.quantity || 1), 0);
    }

    /**
     * Bulk discount tiers for individual guides
     * Must match backend products.py BULK_DISCOUNT_TIERS
     * Tiers are fixed bundles - extra items beyond the tier are charged at full price
     */
    static BULK_DISCOUNT_TIERS = [
        { min_qty: 10, bundle_price: 50.00, savings_per_bundle: 9.90 },
        { min_qty: 5, bundle_price: 25.00, savings_per_bundle: 4.95 },
        { min_qty: 3, bundle_price: 15.00, savings_per_bundle: 2.97 },
    ];

    static INDIVIDUAL_GUIDE_PRICE = 5.99;

    /**
     * Calculate bulk discount for individual guides
     * Tiers are fixed bundles: 3 for $15, 5 for $25, 10 for $50
     * Extra items beyond a tier are charged at full price ($5.99)
     * Example: 4 guides = $15 + $5.99 = $20.99
     * Example: 7 guides = $25 + (2 × $5.99) = $36.98
     * Example: 12 guides = $50 + (2 × $5.99) = $61.98
     * @param {number} individualGuideCount - Total number of individual guides
     * @returns {object} - Discount info
     */
    calculateBulkDiscount(individualGuideCount) {
        const originalTotal = individualGuideCount * CartManager.INDIVIDUAL_GUIDE_PRICE;
        const tiers = CartManager.BULK_DISCOUNT_TIERS; // [10, 5, 3] - highest to lowest

        // Find the best applicable tier (highest quantity that applies)
        let tierApplied = null;
        for (const tier of tiers) {
            if (individualGuideCount >= tier.min_qty) {
                tierApplied = tier;
                break;
            }
        }

        if (tierApplied) {
            // Calculate: tier bundle price + (extra items × full price)
            const extraItems = individualGuideCount - tierApplied.min_qty;
            const discountedTotal = tierApplied.bundle_price + (extraItems * CartManager.INDIVIDUAL_GUIDE_PRICE);
            const discountAmount = originalTotal - discountedTotal;

            // Calculate effective per-item price for display
            const effectivePerItem = discountedTotal / individualGuideCount;

            return {
                originalTotal: Math.round(originalTotal * 100) / 100,
                discountedTotal: Math.round(discountedTotal * 100) / 100,
                discountAmount: Math.round(discountAmount * 100) / 100,
                tierApplied: tierApplied,
                perItemPrice: Math.round(effectivePerItem * 100) / 100,
                guideCount: individualGuideCount,
                savingsLabel: `Save $${tierApplied.savings_per_bundle.toFixed(2)}`,
                bundleQty: tierApplied.min_qty,
                extraItems: extraItems
            };
        }

        return {
            originalTotal: Math.round(originalTotal * 100) / 100,
            discountedTotal: Math.round(originalTotal * 100) / 100,
            discountAmount: 0,
            tierApplied: null,
            perItemPrice: CartManager.INDIVIDUAL_GUIDE_PRICE,
            guideCount: individualGuideCount,
            savingsLabel: null,
            bundleQty: 0,
            extraItems: 0
        };
    }

    /**
     * Get discount info for the current cart
     * @returns {object} - Discount details for the cart
     */
    getDiscountInfo() {
        const items = this.cart.items || [];

        // Count individual guides (by total quantity)
        let individualGuideCount = 0;
        let otherItemsTotal = 0;

        for (const item of items) {
            const quantity = item.quantity || 1;
            if (item.product_type === 'individual') {
                individualGuideCount += quantity;
            } else {
                otherItemsTotal += (parseFloat(item.price) || 0) * quantity;
            }
        }

        const bulkDiscount = this.calculateBulkDiscount(individualGuideCount);

        return {
            individualGuideCount,
            bulkDiscount,
            otherItemsTotal,
            originalSubtotal: bulkDiscount.originalTotal + otherItemsTotal,
            discountedSubtotal: bulkDiscount.discountedTotal + otherItemsTotal,
            totalDiscount: bulkDiscount.discountAmount,
            hasDiscount: bulkDiscount.discountAmount > 0,
            nextTierInfo: this.getNextTierInfo(individualGuideCount)
        };
    }

    /**
     * Get info about the next discount tier (for upsell messaging)
     * @param {number} currentCount - Current number of individual guides
     * @returns {object|null} - Next tier info or null
     */
    getNextTierInfo(currentCount) {
        // Find the next tier that isn't yet reached
        const tiers = CartManager.BULK_DISCOUNT_TIERS.slice().reverse(); // Start from lowest [3, 5, 10]
        for (const tier of tiers) {
            if (currentCount < tier.min_qty) {
                const needed = tier.min_qty - currentCount;
                return {
                    tier: {
                        min_qty: tier.min_qty,
                        bundle_price: tier.bundle_price,
                        savings_label: `Save $${tier.savings_per_bundle.toFixed(2)}`
                    },
                    guidesNeeded: needed,
                    message: `Add ${needed} more guide${needed > 1 ? 's' : ''} to get ${tier.min_qty} for $${tier.bundle_price}!`
                };
            }
        }
        return null; // Already at highest tier
    }

    /**
     * Add item to cart
     * @param {string} productId - Product ID
     * @param {string} productName - Product name
     * @param {string} productType - Product type (individual, lite-package, full-package)
     * @param {number} price - Product price
     * @param {number} quantity - Quantity to add (default 1)
     * @returns {Promise<object>} - Updated cart
     */
    async addItem(productId, productName, productType, price, quantity = 1) {
        try {
            if (this.isAuthenticated()) {
                // Add via API
                const data = await apiCall('/cart/items', {
                    method: 'POST',
                    body: JSON.stringify({
                        product_id: productId,
                        product_name: productName,
                        product_type: productType,
                        price: price,
                        quantity: quantity
                    })
                });
                this.cart = data.cart || { items: [], subtotal: 0 };
            } else {
                // Add to localStorage
                const cart = this.getGuestCart();

                // Check if already in cart - if so, increase quantity
                const existingItem = cart.items.find(item => item.product_id === productId);
                if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 1) + quantity;
                } else {
                    cart.items.push({
                        product_id: productId,
                        product_name: productName,
                        product_type: productType,
                        price: parseFloat(price),
                        quantity: quantity,
                        added_at: new Date().toISOString()
                    });
                }

                cart.subtotal = this.calculateSubtotal(cart.items);
                cart.item_count = this.calculateItemCount(cart.items);

                this.saveGuestCart(cart);
                this.cart = cart;
            }
            this.notifyListeners();
            return this.cart;
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            throw error;
        }
    }

    /**
     * Update item quantity in cart
     * @param {string} productId - Product ID
     * @param {number} quantity - New quantity
     * @returns {Promise<object>} - Updated cart
     */
    async updateQuantity(productId, quantity) {
        try {
            if (quantity < 1) {
                return await this.removeItem(productId);
            }

            if (this.isAuthenticated()) {
                // Update via API
                const data = await apiCall(`/cart/items/${productId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ quantity: quantity })
                });
                this.cart = data.cart || { items: [], subtotal: 0 };
            } else {
                // Update in localStorage
                const cart = this.getGuestCart();
                const item = cart.items.find(item => item.product_id === productId);

                if (item) {
                    item.quantity = quantity;
                    cart.subtotal = this.calculateSubtotal(cart.items);
                    cart.item_count = this.calculateItemCount(cart.items);
                    this.saveGuestCart(cart);
                    this.cart = cart;
                }
            }
            this.notifyListeners();
            return this.cart;
        } catch (error) {
            console.error('Failed to update item quantity:', error);
            throw error;
        }
    }

    /**
     * Remove item from cart
     * @param {string} productId - Product ID to remove
     * @returns {Promise<object>} - Updated cart
     */
    async removeItem(productId) {
        try {
            if (this.isAuthenticated()) {
                // Remove via API
                const data = await apiCall(`/cart/items/${productId}`, {
                    method: 'DELETE'
                });
                this.cart = data.cart || { items: [], subtotal: 0 };
            } else {
                // Remove from localStorage
                const cart = this.getGuestCart();
                cart.items = cart.items.filter(item => item.product_id !== productId);
                cart.subtotal = this.calculateSubtotal(cart.items);
                cart.item_count = cart.items.length;

                this.saveGuestCart(cart);
                this.cart = cart;
            }
            this.notifyListeners();
            return this.cart;
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            throw error;
        }
    }

    /**
     * Clear all items from cart
     * @returns {Promise<object>} - Empty cart
     */
    async clearCart() {
        try {
            if (this.isAuthenticated()) {
                // Clear via API
                await apiCall('/cart', {
                    method: 'DELETE'
                });
            } else {
                // Clear localStorage
                localStorage.removeItem(GUEST_CART_KEY);
            }
            this.cart = { items: [], subtotal: 0, item_count: 0 };
            this.notifyListeners();
            return this.cart;
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        }
    }

    /**
     * Merge guest cart into user's cart on login
     * @returns {Promise<object>} - Merged cart
     */
    async mergeGuestCart() {
        try {
            const guestCart = this.getGuestCart();

            if (guestCart.items.length === 0) {
                // No guest items to merge, just fetch user's cart
                return await this.getCart();
            }

            if (!this.isAuthenticated()) {
                console.warn('Cannot merge cart: user not authenticated');
                return guestCart;
            }

            // Merge via API
            const data = await apiCall('/cart/merge', {
                method: 'POST',
                body: JSON.stringify({
                    items: guestCart.items
                })
            });

            // Clear guest cart after successful merge
            localStorage.removeItem(GUEST_CART_KEY);

            this.cart = data.cart || { items: [], subtotal: 0 };
            this.notifyListeners();
            return this.cart;
        } catch (error) {
            console.error('Failed to merge cart:', error);
            // On error, still try to get the user's cart
            return await this.getCart();
        }
    }

    /**
     * Sync cart from server (for authenticated users)
     * @returns {Promise<object>} - Current cart
     */
    async syncFromServer() {
        if (!this.isAuthenticated()) {
            return this.getGuestCart();
        }
        return await this.getCart();
    }

    /**
     * Get item count (total quantity of all items)
     * @returns {number} - Number of items in cart
     */
    getItemCount() {
        return this.cart.items ? this.calculateItemCount(this.cart.items) : 0;
    }

    /**
     * Get subtotal
     * @returns {number} - Cart subtotal
     */
    getSubtotal() {
        return this.cart.subtotal || this.calculateSubtotal(this.cart.items || []);
    }

    /**
     * Check if product is in cart
     * @param {string} productId - Product ID to check
     * @returns {boolean}
     */
    isInCart(productId) {
        return this.cart.items ? this.cart.items.some(item => item.product_id === productId) : false;
    }

    /**
     * Get cart items
     * @returns {array} - Cart items
     */
    getItems() {
        return this.cart.items || [];
    }

    /**
     * Create checkout session
     * @param {string} email - Customer email (required for guest checkout)
     * @param {string} successUrl - URL to redirect to on success
     * @param {string} cancelUrl - URL to redirect to on cancel
     * @returns {Promise<object>} - Checkout session data with URL
     */
    async createCheckoutSession(email = null, successUrl = null, cancelUrl = null) {
        try {
            const payload = {};

            if (!this.isAuthenticated()) {
                // Guest checkout - send items and email
                if (!email) {
                    throw new Error('Email is required for guest checkout');
                }
                payload.items = this.getItems();
                payload.email = email;
            }

            if (successUrl) payload.success_url = successUrl;
            if (cancelUrl) payload.cancel_url = cancelUrl;

            const data = await apiCall('/cart/checkout/create-session', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            return data;
        } catch (error) {
            console.error('Failed to create checkout session:', error);
            throw error;
        }
    }

    /**
     * Get user's purchase history
     * @returns {Promise<array>} - List of purchases
     */
    async getPurchases() {
        if (!this.isAuthenticated()) {
            return { purchases: [], product_ids: [] };
        }

        try {
            return await apiCall('/cart/purchases');
        } catch (error) {
            console.error('Failed to get purchases:', error);
            return { purchases: [], product_ids: [] };
        }
    }

    /**
     * Check if user has purchased a product
     * @param {string} productId - Product ID to check
     * @returns {Promise<boolean>}
     */
    async hasPurchased(productId) {
        if (!this.isAuthenticated()) {
            return false;
        }

        try {
            const data = await apiCall(`/cart/purchases/check/${productId}`);
            return data.purchased || false;
        } catch (error) {
            console.error('Failed to check purchase:', error);
            return false;
        }
    }

    /**
     * Get user's order history
     * @returns {Promise<array>} - List of orders
     */
    async getOrders() {
        if (!this.isAuthenticated()) {
            return { orders: [] };
        }

        try {
            return await apiCall('/cart/orders');
        } catch (error) {
            console.error('Failed to get orders:', error);
            return { orders: [] };
        }
    }
}

// Create singleton instance
const cartManager = new CartManager();

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await cartManager.getCart();
    } catch (e) {
        console.error('Failed to initialize cart:', e);
    }
});

// Export for module usage (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CartManager, cartManager };
}
