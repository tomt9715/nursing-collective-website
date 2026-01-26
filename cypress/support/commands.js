// ***********************************************
// Custom Cypress Commands
// ***********************************************

/**
 * Custom command to check if page loaded successfully
 */
Cypress.Commands.add('pageLoaded', () => {
    cy.get('body').should('be.visible');
    cy.get('.page-loader').should('not.be.visible');
});

/**
 * Custom command to wait for navigation to complete
 */
Cypress.Commands.add('waitForNavigation', () => {
    cy.get('.navbar').should('be.visible');
});

/**
 * Custom command to toggle dark mode
 */
Cypress.Commands.add('toggleDarkMode', () => {
    cy.get('#theme-toggle').click();
});

/**
 * Custom command to check dark mode is active
 */
Cypress.Commands.add('assertDarkMode', (shouldBeDark = true) => {
    cy.get('html').should(shouldBeDark ? 'have.attr' : 'not.have.attr', 'data-theme', 'dark');
});

/**
 * Custom command to add item to cart (guest)
 */
Cypress.Commands.add('addToCartGuest', (productId, productName, price) => {
    cy.window().then((win) => {
        const cart = {
            items: [{
                product_id: productId,
                product_name: productName,
                product_type: 'individual',
                price: price,
                quantity: 1,
                added_at: new Date().toISOString()
            }],
            subtotal: price,
            item_count: 1
        };
        win.localStorage.setItem('florencebot_guest_cart', JSON.stringify(cart));
    });
});

/**
 * Custom command to clear cart
 */
Cypress.Commands.add('clearCart', () => {
    cy.window().then((win) => {
        win.localStorage.removeItem('florencebot_guest_cart');
    });
});

/**
 * Custom command to get cart from localStorage
 */
Cypress.Commands.add('getCart', () => {
    return cy.window().then((win) => {
        const cart = win.localStorage.getItem('florencebot_guest_cart');
        return cart ? JSON.parse(cart) : { items: [], subtotal: 0 };
    });
});

/**
 * Custom command to check cart badge count
 */
Cypress.Commands.add('assertCartCount', (count) => {
    if (count === 0) {
        cy.get('.cart-badge').should('have.class', 'empty');
    } else {
        cy.get('.cart-badge').should('contain', count.toString());
    }
});

/**
 * Custom command to accept cookies
 */
Cypress.Commands.add('acceptCookies', () => {
    cy.get('#cookie-accept-btn').click();
});

/**
 * Custom command to reject cookies
 */
Cypress.Commands.add('rejectCookies', () => {
    cy.get('#cookie-reject-btn').click();
});

/**
 * Custom command to check element is visible on mobile
 */
Cypress.Commands.add('mobileView', () => {
    cy.viewport('iphone-x');
});

/**
 * Custom command to check element is visible on tablet
 */
Cypress.Commands.add('tabletView', () => {
    cy.viewport('ipad-2');
});

/**
 * Custom command to check element is visible on desktop
 */
Cypress.Commands.add('desktopView', () => {
    cy.viewport(1280, 720);
});

/**
 * Custom command to open mobile menu
 */
Cypress.Commands.add('openMobileMenu', () => {
    cy.get('#mobile-menu-btn').click();
    cy.get('.nav-links').should('have.class', 'mobile-open');
});

/**
 * Custom command to close mobile menu
 */
Cypress.Commands.add('closeMobileMenu', () => {
    cy.get('#mobile-menu-btn').click();
    cy.get('.nav-links').should('not.have.class', 'mobile-open');
});
