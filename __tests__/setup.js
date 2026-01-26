/**
 * Jest Setup File
 * Runs before all tests
 */

// Mock localStorage
const localStorageMock = {
    store: {},
    getItem: function(key) {
        return this.store[key] || null;
    },
    setItem: function(key, value) {
        this.store[key] = String(value);
    },
    removeItem: function(key) {
        delete this.store[key];
    },
    clear: function() {
        this.store = {};
    }
};

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
});

// Mock sessionStorage
Object.defineProperty(global, 'sessionStorage', {
    value: localStorageMock
});

// Mock window.location
delete global.window.location;
global.window.location = {
    href: 'http://localhost/',
    origin: 'http://localhost',
    pathname: '/',
    search: '',
    hash: '',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn()
};

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
    })
);

// Mock console methods to reduce noise in tests (optional)
// Uncomment if you want cleaner test output
// global.console = {
//     ...console,
//     log: jest.fn(),
//     debug: jest.fn(),
//     info: jest.fn(),
//     warn: jest.fn(),
//     error: jest.fn(),
// };

// Reset mocks and localStorage between tests
beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
    fetch.mockClear();
});

// Custom matchers
expect.extend({
    toBeValidPrice(received) {
        const pass = typeof received === 'number' && received >= 0 && Number.isFinite(received);
        if (pass) {
            return {
                message: () => `expected ${received} not to be a valid price`,
                pass: true
            };
        } else {
            return {
                message: () => `expected ${received} to be a valid price (non-negative finite number)`,
                pass: false
            };
        }
    }
});
