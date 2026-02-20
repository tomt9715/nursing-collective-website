// ============================================
// DARK MODE MANAGER - Light/Dark/System modes
// ============================================

class DarkModeManager {
    constructor() {
        // Mode can be 'light', 'dark', or 'system'
        this.mode = 'system';
        // Actual applied theme is always 'light' or 'dark'
        this.appliedTheme = 'light';
        this.init();
    }

    init() {
        // Load saved preference
        this.loadPreferences();

        // Apply initial theme
        this.applyTheme();

        // Set up theme selector buttons
        this.setupThemeSelector();

        // Watch for system preference changes
        this.watchSystemPreference();
    }

    loadPreferences() {
        const savedMode = localStorage.getItem('themeMode');

        if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
            this.mode = savedMode;
        } else {
            // Check shared cookie (syncs across subdomains)
            const cookieMode = this._readCookie('themeMode');
            if (cookieMode && ['light', 'dark', 'system'].includes(cookieMode)) {
                this.mode = cookieMode;
                localStorage.setItem('themeMode', cookieMode);
            } else {
                this.mode = 'system';
            }
        }
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme() {
        // Determine actual theme to apply
        if (this.mode === 'system') {
            this.appliedTheme = this.getSystemTheme();
        } else {
            this.appliedTheme = this.mode;
        }

        // Apply to document
        document.documentElement.setAttribute('data-theme', this.appliedTheme);

        // Update UI
        this.updateThemeSelector();

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: this.appliedTheme, mode: this.mode }
        }));
    }

    setMode(newMode) {
        if (['light', 'dark', 'system'].includes(newMode)) {
            this.mode = newMode;
            localStorage.setItem('themeMode', newMode);
            this._writeCookie('themeMode', newMode);
            this.applyTheme();
        }
    }

    setupThemeSelector() {
        // Handle clicks on theme option buttons
        document.querySelectorAll('[data-theme-mode]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const mode = btn.dataset.themeMode;
                this.setMode(mode);
            });
        });
    }

    updateThemeSelector() {
        // Update active state on theme selector buttons
        document.querySelectorAll('[data-theme-mode]').forEach(btn => {
            const isActive = btn.dataset.themeMode === this.mode;
            btn.classList.toggle('active', isActive);
        });

        // Update the theme indicator icon if it exists
        const indicator = document.getElementById('theme-mode-indicator');
        if (indicator) {
            const icons = {
                'light': 'fa-sun',
                'dark': 'fa-moon',
                'system': 'fa-desktop'
            };
            indicator.className = `fas ${icons[this.mode]}`;
        }
    }

    watchSystemPreference() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', () => {
            // Only re-apply if in system mode
            if (this.mode === 'system') {
                this.applyTheme();
            }
        });

        // Chrome on macOS can report a stale prefers-color-scheme value
        // when the OS appearance is set to Auto. Re-check when the tab
        // becomes visible again and periodically to catch delayed updates.
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.mode === 'system') {
                const current = this.getSystemTheme();
                if (current !== this.appliedTheme) {
                    this.applyTheme();
                }
            }
        });

        // Also re-check on window focus (covers switching between apps)
        window.addEventListener('focus', () => {
            if (this.mode === 'system') {
                const current = this.getSystemTheme();
                if (current !== this.appliedTheme) {
                    this.applyTheme();
                }
            }
        });

        // Chrome on macOS can cache a stale prefers-color-scheme value
        // when Auto appearance is used. Poll every 60s to catch delayed
        // updates that the 'change' event missed.
        this._systemCheckInterval = setInterval(() => {
            if (this.mode === 'system') {
                const current = this.getSystemTheme();
                if (current !== this.appliedTheme) {
                    this.applyTheme();
                }
            }
        }, 60000);

        // Sync when another tab on this origin changes themeMode
        window.addEventListener('storage', (e) => {
            if (e.key === 'themeMode' && e.newValue && e.newValue !== this.mode) {
                this.mode = e.newValue;
                this._writeCookie('themeMode', e.newValue);
                this.applyTheme();
            }
        });
    }

    // ── Shared cookie helpers (syncs across subdomains) ──

    _writeCookie(name, value) {
        const domain = location.hostname.includes('thenursingcollective.pro')
            ? '.thenursingcollective.pro'
            : '';
        const domainStr = domain ? ';domain=' + domain : '';
        document.cookie = name + '=' + encodeURIComponent(value)
            + domainStr + ';path=/;max-age=31536000;SameSite=Lax;Secure';
    }

    _readCookie(name) {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
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
