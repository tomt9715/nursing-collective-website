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

        it('should display the navigation', () => {
            cy.get('.navbar').should('be.visible');
            cy.get('.nav-logo').should('be.visible');
        });

        it('should display the footer', () => {
            cy.get('.footer').should('be.visible');
            // .footer-brand in the old markup; the redesign renamed it.
            cy.get('.footer-brand-name').should('contain', 'The Nursing Collective');
        });
    });

    describe('Navigation', () => {
        it('should navigate to the study guide library', () => {
            cy.get('.nav-links').contains('Study Guides').click();
            // The link still reads "Study Guides", but study-guides.html was
            // deleted on 24 Nov 2026 and the library is my-guides.html. The
            // old spec asserted the old URL, which is why it failed.
            cy.url().should('include', 'my-guides');
        });

        it('should navigate to Pricing page', () => {
            cy.get('.nav-links').contains('Pricing').click();
            cy.url().should('include', 'pricing');
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

        // Replaces a spec that asserted an aria-label on #theme-toggle. That
        // button went with dark mode, and the test went with it. Pinning a
        // single selector was the weakness: it tested one element rather than
        // the rule, so removing the element silently removed the coverage.
        //
        // This checks the rule instead — every button a user can see has to
        // announce itself somehow — so it keeps working as the page changes
        // and fails the moment a nameless icon button appears.
        // The account button is icon-only and opens a menu, so it needs both
        // a name and an honest open/closed state. aria-expanded is set in the
        // markup but kept in step by a MutationObserver in script.js, because
        // four different scripts toggle that dropdown — a static value here
        // would tell a screen reader the menu is shut while it is open.
        it('keeps the account button named and its menu state honest', () => {
            cy.get('#user-menu-btn')
                .should('have.attr', 'aria-label', 'Account menu')
                .and('have.attr', 'aria-haspopup', 'true')
                .and('have.attr', 'aria-expanded', 'false');

            cy.get('#user-menu-btn').click({ force: true });
            cy.get('#user-dropdown').should('have.class', 'active');
            cy.get('#user-menu-btn').should('have.attr', 'aria-expanded', 'true');

            cy.get('body').click(5, 5);
            cy.get('#user-dropdown').should('not.have.class', 'active');
            cy.get('#user-menu-btn').should('have.attr', 'aria-expanded', 'false');
        });

        it('gives every visible button an accessible name', () => {
            cy.get('button:visible').each(($btn) => {
                const el = $btn[0];
                // The order the accessible-name algorithm uses, loosely:
                // aria-labelledby, aria-label, visible text, then title.
                const labelledBy = el.getAttribute('aria-labelledby');
                const name =
                    (labelledBy && (Cypress.$('#' + labelledBy).text() || '').trim()) ||
                    (el.getAttribute('aria-label') || '').trim() ||
                    ($btn.text() || '').trim() ||
                    (el.getAttribute('title') || '').trim();

                expect(
                    name,
                    `button needs an accessible name: ${el.outerHTML.slice(0, 120)}`
                ).to.not.equal('');
            });
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
