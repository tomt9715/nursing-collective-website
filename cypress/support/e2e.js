// ***********************************************************
// This file is processed and loaded automatically before test files.
// Use it to put global configuration and custom commands.
// ***********************************************************

// Import commands
import './commands';

// Hide fetch/XHR requests from command log (reduces noise)
const app = window.top;
if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
}

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error for debugging
    console.error('Uncaught exception:', err.message);

    // Return false to prevent the error from failing the test
    // Only do this for known errors that don't affect test validity
    if (err.message.includes('ResizeObserver loop')) {
        return false;
    }

    // Let other errors fail the test
    return true;
});

// Log test info
beforeEach(() => {
    cy.log(`**Running:** ${Cypress.currentTest.title}`);
});
