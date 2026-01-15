// ============================================
// MANUAL DARK MODE TOGGLE
// ============================================

class DarkModeManager {
    constructor() {
        this.theme = 'light';
        this.init();
    }

    init() {
        // Load saved preference or use system preference
        this.loadPreferences();

        // Apply initial theme
        this.applyInitialTheme();

        // Set up toggle button
        this.setupToggleButton();

        // Watch for system preference changes (only if user hasn't set a preference)
        this.watchSystemPreference();
    }

    loadPreferences() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            // User has a saved preference
            this.theme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.theme = prefersDark ? 'dark' : 'light';
        }
    }

    applyInitialTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleButton();
    }

    setupToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        // Toggle between light and dark
        this.theme = this.theme === 'light' ? 'dark' : 'light';

        // Apply the new theme
        this.applyTheme();

        // Save user's preference
        localStorage.setItem('theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleButton();

        // Dispatch event for other components that might need to know
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: this.theme }
        }));
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-label',
                this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
    }

    watchSystemPreference() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', (e) => {
            // Only apply system preference if user hasn't set a manual preference
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }
}

// Initialize dark mode manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkModeManager = new DarkModeManager();
    });
} else {
    window.darkModeManager = new DarkModeManager();
}

console.log('🌓 Dark Mode Manager loaded - Manual toggle mode');
