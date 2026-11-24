/**
 * Account menu — one handler per page, and an honest aria-expanded.
 *
 * script.js binds the dropdown for most pages, while dashboard, settings and
 * admin bind it themselves. When both bind, each click toggles twice and the
 * menu never opens: that was admin.html's state until 24 Nov 2026, because
 * the guard in script.js listed only dashboard and settings.
 *
 * admin-user.html is the trap in the other direction — its path contains
 * "admin" but admin-user-script.js does not bind the dropdown, so widening
 * the guard carelessly leaves it with no handler at all. Both are covered
 * here so neither mistake can return unnoticed.
 */
describe('Account menu opens on every page that has it', () => {
    const pages = ['/admin.html', '/admin-user.html', '/dashboard.html', '/settings.html', '/index.html'];
    pages.forEach((page) => {
        it('opens and closes on ' + page, () => {
            cy.visit(page);
            cy.get('#user-menu-btn').should('have.attr', 'aria-expanded', 'false');
            cy.get('#user-menu-btn').click({force: true});
            cy.get('#user-dropdown').should('have.class', 'active');
            cy.get('#user-menu-btn').should('have.attr', 'aria-expanded', 'true');
            cy.get('body').click(5, 5);
            cy.get('#user-dropdown').should('not.have.class', 'active');
            cy.get('#user-menu-btn').should('have.attr', 'aria-expanded', 'false');
        });
    });
});
