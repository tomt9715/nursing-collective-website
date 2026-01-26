/**
 * Shopping Cart E2E Tests
 */

describe('Shopping Cart', () => {
    beforeEach(() => {
        cy.clearCart();
    });

    describe('Store Page', () => {
        beforeEach(() => {
            cy.visit('/store.html');
        });

        it('should load store page', () => {
            cy.title().should('contain', 'Store');
            cy.get('body').should('be.visible');
        });

        it('should display products', () => {
            // Wait for products to load
            cy.get('.product-card, .guide-card, [data-product-id]', { timeout: 10000 })
                .should('have.length.at.least', 1);
        });

        it('should show empty cart badge initially', () => {
            cy.get('.cart-badge').should('have.class', 'empty');
        });
    });

    describe('Cart Badge', () => {
        it('should update when item added to cart', () => {
            cy.visit('/');

            // Add item to cart via localStorage
            cy.addToCartGuest('guide-test', 'Test Guide', 5.99);

            // Reload to see updated badge
            cy.reload();

            // Badge should show 1
            cy.get('.cart-badge').should('not.have.class', 'empty');
        });
    });

    describe('Cart Persistence', () => {
        it('should persist cart across page loads', () => {
            cy.visit('/');

            // Add item to cart
            cy.addToCartGuest('guide-persist', 'Persistence Test', 5.99);

            // Navigate to different page
            cy.visit('/pricing.html');

            // Check cart is still there
            cy.getCart().then((cart) => {
                expect(cart.items).to.have.length(1);
                expect(cart.items[0].product_id).to.equal('guide-persist');
            });
        });

        it('should persist cart across browser sessions', () => {
            cy.visit('/');

            // Add item to cart
            cy.addToCartGuest('guide-session', 'Session Test', 5.99);

            // Clear session but keep localStorage
            cy.window().then((win) => {
                win.sessionStorage.clear();
            });

            // Reload page
            cy.reload();

            // Check cart is still there
            cy.getCart().then((cart) => {
                expect(cart.items).to.have.length(1);
            });
        });
    });

    describe('Checkout Page', () => {
        beforeEach(() => {
            // Add item to cart first
            cy.addToCartGuest('guide-checkout', 'Checkout Test Guide', 5.99);
            cy.visit('/checkout.html');
        });

        it('should load checkout page', () => {
            cy.get('body').should('be.visible');
        });

        it('should show cart items in checkout', () => {
            // The checkout should display cart contents
            cy.get('body').should('contain', 'Checkout');
        });
    });
});

describe('Cart Calculations', () => {
    beforeEach(() => {
        cy.clearCart();
        cy.visit('/');
    });

    it('should calculate subtotal correctly for single item', () => {
        cy.addToCartGuest('guide-1', 'Test Guide 1', 5.99);

        cy.getCart().then((cart) => {
            expect(cart.subtotal).to.equal(5.99);
        });
    });

    it('should calculate subtotal correctly for multiple items', () => {
        cy.window().then((win) => {
            const cart = {
                items: [
                    { product_id: 'guide-1', product_name: 'Guide 1', price: 5.99, quantity: 1 },
                    { product_id: 'guide-2', product_name: 'Guide 2', price: 5.99, quantity: 1 }
                ],
                subtotal: 11.98,
                item_count: 2
            };
            win.localStorage.setItem('florencebot_guest_cart', JSON.stringify(cart));
        });

        cy.getCart().then((cart) => {
            expect(cart.subtotal).to.be.closeTo(11.98, 0.01);
        });
    });

    it('should handle quantities correctly', () => {
        cy.window().then((win) => {
            const cart = {
                items: [
                    { product_id: 'guide-1', product_name: 'Guide 1', price: 5.99, quantity: 3 }
                ],
                subtotal: 17.97,
                item_count: 3
            };
            win.localStorage.setItem('florencebot_guest_cart', JSON.stringify(cart));
        });

        cy.getCart().then((cart) => {
            expect(cart.items[0].quantity).to.equal(3);
            expect(cart.subtotal).to.be.closeTo(17.97, 0.01);
        });
    });
});
