/**
 * Jest Configuration for The Nursing Collective
 */

export default {
    // Use jsdom environment for DOM testing
    testEnvironment: 'jsdom',

    // Look for test files in __tests__ folder or files with .test.js suffix
    testMatch: [
        '**/__tests__/**/*.js',
        '**/*.test.js'
    ],

    // Ignore these directories
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/css/'
    ],

    // Coverage settings
    collectCoverageFrom: [
        '*.js',
        '!jest.config.js',
        '!vite.config.js',
        '!postcss.config.cjs',
        '!eslint.config.js',
        '!sentry-init.js',
        '!worker.js'
    ],

    // Coverage thresholds (start low, increase over time)
    coverageThreshold: {
        global: {
            branches: 20,
            functions: 20,
            lines: 20,
            statements: 20
        }
    },

    // Setup files to run before tests
    setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],

    // Module name mapping for imports
    moduleNameMapper: {
        // Handle CSS imports (mock them)
        '\\.(css|less|scss|sass)$': '<rootDir>/__tests__/mocks/styleMock.js',
        // Handle image imports
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__tests__/mocks/fileMock.js'
    },

    // Transform settings
    transform: {},

    // Verbose output
    verbose: true,

    // Clear mocks between tests
    clearMocks: true,

    // Restore mocks after each test
    restoreMocks: true
};
