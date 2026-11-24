/**
 * Homepage E2E Tests
 */

describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('Page Load', () => {
        it('should load the homepage successfully', () => {
            cy.title().should('contain', 'The Nursing Collective');
            cy.get('body').should('be.visible');
        });

        it('should display the hero section', () => {
            cy.get('.hero').should('be.visible');
            cy.get('.hero h1').should('contain', 'Nursing School Success Hub');
        });

        it('should display the navigation', () => {
            cy.get('.navbar').should('be.visible');
            cy.get('.nav-logo').should('be.visible');
        });

        it('should display the features section', () => {
            cy.get('.features').should('be.visible');
            cy.get('.feature-card').should('have.length.at.least', 3);
        });

        it('should display the footer', () => {
            cy.get('.footer').should('be.visible');
            cy.get('.footer-brand').should('contain', 'The Nursing Collective');
        });
    });

    describe('Navigation', () => {
        it('should navigate to Study Guides page', () => {
            cy.get('.nav-links').contains('Study Guides').click();
            cy.url().should('include', 'study-guides');
        });

        it('should navigate to Pricing page', () => {
            cy.get('.nav-links').contains('Pricing').click();
            cy.url().should('include', 'pricing');
        });

        it('should navigate to Login page', () => {
            cy.get('.nav-links').contains('Login').click();
            cy.url().should('include', 'login');
        });

        it('should have working Discord link in CTA', () => {
            cy.get('.hero-buttons a').first()
                .should('have.attr', 'href')
                .and('include', 'discord.gg');
        });
    });

    describe('Mobile Responsiveness', () => {
        beforeEach(() => {
            cy.viewport('iphone-x');
        });

        it('should show mobile menu button', () => {
            cy.get('#mobile-menu-btn').should('be.visible');
        });

        it('should hide desktop nav links', () => {
            cy.get('.nav-links').should('not.be.visible');
        });

        it('should open mobile menu on click', () => {
            cy.get('#mobile-menu-btn').click();
            cy.get('.nav-links').should('have.class', 'mobile-open');
            cy.get('.nav-links').should('be.visible');
        });

        it('should close mobile menu on second click', () => {
            cy.get('#mobile-menu-btn').click();
            cy.get('.nav-links').should('have.class', 'mobile-open');

            cy.get('#mobile-menu-btn').click();
            cy.get('.nav-links').should('not.have.class', 'mobile-open');
        });

        it('should show Home link in mobile menu', () => {
            cy.get('#mobile-menu-btn').click();
            cy.get('.nav-link-home').should('be.visible');
        });
    });

    describe('Accessibility', () => {
        it('should have skip link', () => {
            cy.get('.skip-link').should('exist');
        });

        it('should have proper heading hierarchy', () => {
            cy.get('h1').should('have.length', 1);
            cy.get('h2').should('have.length.at.least', 1);
        });

        it('should have alt text on logo', () => {
            cy.get('.nav-logo').should('have.attr', 'alt');
        });
    });

    describe('SEO', () => {
        it('should have meta description', () => {
            cy.get('meta[name="description"]').should('have.attr', 'content');
        });

        it('should have Open Graph tags', () => {
            cy.get('meta[property="og:title"]').should('exist');
            cy.get('meta[property="og:description"]').should('exist');
            cy.get('meta[property="og:image"]').should('exist');
        });

        it('should have structured data', () => {
            cy.get('script[type="application/ld+json"]').should('exist');
        });
    });
});
