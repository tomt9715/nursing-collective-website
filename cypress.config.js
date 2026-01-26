import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // Base URL for the site (update for local dev or preview)
        baseUrl: 'http://localhost:5173',

        // Spec pattern
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

        // Support file
        supportFile: 'cypress/support/e2e.js',

        // Viewport settings
        viewportWidth: 1280,
        viewportHeight: 720,

        // Timeouts
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 30000,

        // Screenshots and videos
        screenshotOnRunFailure: true,
        video: false, // Set to true for CI/CD

        // Retry configuration
        retries: {
            runMode: 2,
            openMode: 0
        },

        // Environment variables
        env: {
            // Add test environment variables here
            apiUrl: 'https://florencebot-backend-production.up.railway.app',
        },

        setupNodeEvents(on, config) {
            // Implement node event listeners here
            on('task', {
                log(message) {
                    console.log(message);
                    return null;
                }
            });

            return config;
        }
    },

    // Component testing (optional, for future)
    component: {
        devServer: {
            framework: 'vanilla',
            bundler: 'vite'
        }
    }
});
