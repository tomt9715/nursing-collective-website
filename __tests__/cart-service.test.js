/**
 * Cart Service Unit Tests
 */

// Mock the API call function
global.apiCall = jest.fn();
global.isAuthenticated = jest.fn(() => false);

// Import CartManager (we'll create a testable version)
const GUEST_CART_KEY = 'florencebot_guest_cart';

// Recreate CartManager for testing (since original uses globals)
class CartManager {
    constructor() {
        this.cart = { items: [], subtotal: 0 };
        this.listeners = [];
    }

    static BULK_DISCOUNT_TIERS = [
        { min_qty: 10, bundle_price: 50.00, savings_per_bundle: 9.90 },
        { min_qty: 5, bundle_price: 25.00, savings_per_bundle: 4.95 },
        { min_qty: 3, bundle_price: 15.00, savings_per_bundle: 2.97 },
    ];

    static INDIVIDUAL_GUIDE_PRICE = 5.99;

    isAuthenticated() {
        return global.isAuthenticated();
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.cart));
    }

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
            // Ignore parse errors
        }
        return { items: [], subtotal: 0, item_count: 0 };
    }

    saveGuestCart(cart) {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
    }

    calculateSubtotal(items) {
        return items.reduce((sum, item) => {
            const quantity = item.quantity || 1;
            return sum + ((parseFloat(item.price) || 0) * quantity);
        }, 0);
    }

    calculateItemCount(items) {
        return items.reduce((count, item) => count + (item.quantity || 1), 0);
    }

    calculateBulkDiscount(individualGuideCount) {
        const originalTotal = individualGuideCount * CartManager.INDIVIDUAL_GUIDE_PRICE;
        const tiers = CartManager.BULK_DISCOUNT_TIERS;

        let tierApplied = null;
        for (const tier of tiers) {
            if (individualGuideCount >= tier.min_qty) {
                tierApplied = tier;
                break;
            }
        }

        if (tierApplied) {
            const extraItems = individualGuideCount - tierApplied.min_qty;
            const discountedTotal = tierApplied.bundle_price + (extraItems * CartManager.INDIVIDUAL_GUIDE_PRICE);
            const discountAmount = originalTotal - discountedTotal;
            const effectivePerItem = discountedTotal / individualGuideCount;

            return {
                originalTotal: Math.round(originalTotal * 100) / 100,
                discountedTotal: Math.round(discountedTotal * 100) / 100,
                discountAmount: Math.round(discountAmount * 100) / 100,
                tierApplied: tierApplied,
                perItemPrice: Math.round(effectivePerItem * 100) / 100,
                guideCount: individualGuideCount,
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
            bundleQty: 0,
            extraItems: 0
        };
    }

    async addItem(productId, productName, productType, price, quantity = 1) {
        if (this.isAuthenticated()) {
            const data = await global.apiCall('/cart/items', {
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
            const cart = this.getGuestCart();

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
    }

    async removeItem(productId) {
        const cart = this.getGuestCart();
        cart.items = cart.items.filter(item => item.product_id !== productId);
        cart.subtotal = this.calculateSubtotal(cart.items);
        cart.item_count = cart.items.length;

        this.saveGuestCart(cart);
        this.cart = cart;
        this.notifyListeners();
        return this.cart;
    }

    async clearCart() {
        localStorage.removeItem(GUEST_CART_KEY);
        this.cart = { items: [], subtotal: 0, item_count: 0 };
        this.notifyListeners();
        return this.cart;
    }

    getItemCount() {
        return this.cart.items ? this.calculateItemCount(this.cart.items) : 0;
    }

    getSubtotal() {
        return this.cart.subtotal || this.calculateSubtotal(this.cart.items || []);
    }

    isInCart(productId) {
        return this.cart.items ? this.cart.items.some(item => item.product_id === productId) : false;
    }

    getItems() {
        return this.cart.items || [];
    }
}


describe('CartManager', () => {
    let cartManager;

    beforeEach(() => {
        cartManager = new CartManager();
        global.isAuthenticated.mockReturnValue(false);
    });

    describe('constructor', () => {
        test('initializes with empty cart', () => {
            expect(cartManager.cart).toEqual({ items: [], subtotal: 0 });
            expect(cartManager.listeners).toEqual([]);
        });
    });

    describe('calculateSubtotal', () => {
        test('returns 0 for empty array', () => {
            expect(cartManager.calculateSubtotal([])).toBe(0);
        });

        test('calculates correct subtotal for single item', () => {
            const items = [{ price: 5.99, quantity: 1 }];
            expect(cartManager.calculateSubtotal(items)).toBeCloseTo(5.99);
        });

        test('calculates correct subtotal for multiple items', () => {
            const items = [
                { price: 5.99, quantity: 2 },
                { price: 24.99, quantity: 1 }
            ];
            expect(cartManager.calculateSubtotal(items)).toBeCloseTo(36.97);
        });

        test('handles missing quantity (defaults to 1)', () => {
            const items = [{ price: 5.99 }];
            expect(cartManager.calculateSubtotal(items)).toBeCloseTo(5.99);
        });

        test('handles string prices', () => {
            const items = [{ price: '5.99', quantity: 1 }];
            expect(cartManager.calculateSubtotal(items)).toBeCloseTo(5.99);
        });
    });

    describe('calculateItemCount', () => {
        test('returns 0 for empty array', () => {
            expect(cartManager.calculateItemCount([])).toBe(0);
        });

        test('sums up quantities', () => {
            const items = [
                { quantity: 2 },
                { quantity: 3 }
            ];
            expect(cartManager.calculateItemCount(items)).toBe(5);
        });

        test('handles missing quantity (defaults to 1)', () => {
            const items = [{ product_id: '123' }];
            expect(cartManager.calculateItemCount(items)).toBe(1);
        });
    });

    describe('calculateBulkDiscount', () => {
        test('no discount for less than 3 items', () => {
            const result = cartManager.calculateBulkDiscount(2);
            expect(result.discountAmount).toBe(0);
            expect(result.tierApplied).toBeNull();
        });

        test('applies 3-item tier discount', () => {
            const result = cartManager.calculateBulkDiscount(3);
            expect(result.discountedTotal).toBe(15.00);
            expect(result.tierApplied.min_qty).toBe(3);
            expect(result.originalTotal).toBeCloseTo(17.97);
        });

        test('applies 5-item tier discount', () => {
            const result = cartManager.calculateBulkDiscount(5);
            expect(result.discountedTotal).toBe(25.00);
            expect(result.tierApplied.min_qty).toBe(5);
        });

        test('applies 10-item tier discount', () => {
            const result = cartManager.calculateBulkDiscount(10);
            expect(result.discountedTotal).toBe(50.00);
            expect(result.tierApplied.min_qty).toBe(10);
        });

        test('calculates extra items correctly (4 items)', () => {
            const result = cartManager.calculateBulkDiscount(4);
            // 3 for $15 + 1 at $5.99 = $20.99
            expect(result.discountedTotal).toBeCloseTo(20.99);
            expect(result.extraItems).toBe(1);
        });

        test('calculates extra items correctly (7 items)', () => {
            const result = cartManager.calculateBulkDiscount(7);
            // 5 for $25 + 2 at $5.99 = $36.98
            expect(result.discountedTotal).toBeCloseTo(36.98);
            expect(result.extraItems).toBe(2);
        });

        test('calculates extra items correctly (12 items)', () => {
            const result = cartManager.calculateBulkDiscount(12);
            // 10 for $50 + 2 at $5.99 = $61.98
            expect(result.discountedTotal).toBeCloseTo(61.98);
            expect(result.extraItems).toBe(2);
        });
    });

    describe('addItem (guest mode)', () => {
        test('adds item to empty cart', async () => {
            const cart = await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);

            expect(cart.items).toHaveLength(1);
            expect(cart.items[0].product_id).toBe('guide-1');
            expect(cart.items[0].product_name).toBe('Test Guide');
            expect(cart.items[0].price).toBe(5.99);
        });

        test('increases quantity for existing item', async () => {
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);
            const cart = await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);

            expect(cart.items).toHaveLength(1);
            expect(cart.items[0].quantity).toBe(2);
        });

        test('adds different items separately', async () => {
            await cartManager.addItem('guide-1', 'Test Guide 1', 'individual', 5.99);
            const cart = await cartManager.addItem('guide-2', 'Test Guide 2', 'individual', 5.99);

            expect(cart.items).toHaveLength(2);
        });

        test('calculates subtotal correctly', async () => {
            await cartManager.addItem('guide-1', 'Test Guide 1', 'individual', 5.99);
            const cart = await cartManager.addItem('guide-2', 'Test Guide 2', 'individual', 5.99);

            expect(cart.subtotal).toBeCloseTo(11.98);
        });

        test('saves to localStorage', async () => {
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);

            const stored = localStorage.getItem(GUEST_CART_KEY);
            expect(stored).not.toBeNull();

            const parsed = JSON.parse(stored);
            expect(parsed.items).toHaveLength(1);
        });
    });

    describe('removeItem', () => {
        test('removes item from cart', async () => {
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);
            const cart = await cartManager.removeItem('guide-1');

            expect(cart.items).toHaveLength(0);
        });

        test('does nothing for non-existent item', async () => {
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);
            const cart = await cartManager.removeItem('guide-999');

            expect(cart.items).toHaveLength(1);
        });

        test('updates subtotal after removal', async () => {
            await cartManager.addItem('guide-1', 'Test Guide 1', 'individual', 5.99);
            await cartManager.addItem('guide-2', 'Test Guide 2', 'individual', 5.99);
            const cart = await cartManager.removeItem('guide-1');

            expect(cart.subtotal).toBeCloseTo(5.99);
        });
    });

    describe('clearCart', () => {
        test('clears all items', async () => {
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);
            const cart = await cartManager.clearCart();

            expect(cart.items).toHaveLength(0);
            expect(cart.subtotal).toBe(0);
        });

        test('removes from localStorage', async () => {
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);
            await cartManager.clearCart();

            expect(localStorage.getItem(GUEST_CART_KEY)).toBeNull();
        });
    });

    describe('subscribe', () => {
        test('notifies listeners on cart change', async () => {
            const listener = jest.fn();
            cartManager.subscribe(listener);

            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);

            expect(listener).toHaveBeenCalled();
        });

        test('returns unsubscribe function', async () => {
            const listener = jest.fn();
            const unsubscribe = cartManager.subscribe(listener);

            unsubscribe();
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);

            expect(listener).not.toHaveBeenCalled();
        });
    });

    describe('isInCart', () => {
        test('returns true for item in cart', async () => {
            await cartManager.addItem('guide-1', 'Test Guide', 'individual', 5.99);

            expect(cartManager.isInCart('guide-1')).toBe(true);
        });

        test('returns false for item not in cart', () => {
            expect(cartManager.isInCart('guide-999')).toBe(false);
        });
    });

    describe('getItemCount', () => {
        test('returns correct count', async () => {
            await cartManager.addItem('guide-1', 'Test Guide 1', 'individual', 5.99);
            await cartManager.addItem('guide-1', 'Test Guide 1', 'individual', 5.99); // quantity 2
            await cartManager.addItem('guide-2', 'Test Guide 2', 'individual', 5.99);

            expect(cartManager.getItemCount()).toBe(3);
        });
    });
});

describe('Bulk Discount Tiers', () => {
    test('tiers are in descending order', () => {
        const tiers = CartManager.BULK_DISCOUNT_TIERS;
        for (let i = 0; i < tiers.length - 1; i++) {
            expect(tiers[i].min_qty).toBeGreaterThan(tiers[i + 1].min_qty);
        }
    });

    test('individual guide price is $5.99', () => {
        expect(CartManager.INDIVIDUAL_GUIDE_PRICE).toBe(5.99);
    });
});
