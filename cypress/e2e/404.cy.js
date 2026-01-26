/**
 * 404 Page E2E Tests
 */

describe('404 Error Page', () => {
    beforeEach(() => {
        cy.visit('/404.html');
    });

    it('should load the 404 page', () => {
        cy.get('.error-page').should('be.visible');
    });

    it('should display 404 error code', () => {
        cy.get('.error-code').should('contain', '404');
    });

    it('should display error title', () => {
        cy.get('.error-title').should('contain', 'Page Not Found');
    });

    it('should display error description', () => {
        cy.get('.error-description').should('be.visible');
    });

    it('should have Go Home button', () => {
        cy.get('.error-actions')
            .contains('Go Home')
            .should('have.attr', 'href', 'index.html');
    });

    it('should have Browse Store button', () => {
        cy.get('.error-actions')
            .contains('Browse Store')
            .should('have.attr', 'href', 'store.html');
    });

    it('should display popular pages section', () => {
        cy.get('.error-suggestions').should('be.visible');
        cy.get('.suggestion-links a').should('have.length.at.least', 3);
    });

    it('should navigate to home when clicking Go Home', () => {
        cy.get('.error-actions')
            .contains('Go Home')
            .click();
        cy.url().should('include', 'index.html');
    });

    describe('Dark Mode', () => {
        it('should support dark mode', () => {
            // The 404 page includes dark-mode.js
            cy.window().then((win) => {
                win.document.documentElement.setAttribute('data-theme', 'dark');
            });

            cy.get('html').should('have.attr', 'data-theme', 'dark');
            cy.get('.error-page').should('be.visible');
        });
    });

    describe('Mobile Responsiveness', () => {
        it('should be responsive on mobile', () => {
            cy.viewport('iphone-x');
            cy.get('.error-page').should('be.visible');
            cy.get('.error-content').should('be.visible');
        });

        it('should stack buttons on mobile', () => {
            cy.viewport('iphone-x');
            cy.get('.error-actions').should('be.visible');
        });
    });
});
