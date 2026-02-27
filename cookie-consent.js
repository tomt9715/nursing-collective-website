/**
 * Cookie Consent Manager
 * GDPR/CCPA compliant cookie consent banner
 */

const CookieConsent = {
    // Configuration
    config: {
        cookieName: 'tnc_cookie_consent',
        cookieExpiry: 365, // days
        privacyPolicyUrl: 'privacy.html'
    },

    // Cookie categories
    categories: {
        necessary: {
            name: 'Necessary',
            description: 'Essential cookies for the website to function properly.',
            required: true
        },
        analytics: {
            name: 'Analytics',
            description: 'Help us understand how visitors interact with our website.',
            required: false
        },
        marketing: {
            name: 'Marketing',
            description: 'Used to deliver personalized advertisements.',
            required: false
        }
    },

    /**
     * Initialize cookie consent
     */
    init() {
        // Check if consent already given
        const consent = this.getConsent();

        if (!consent) {
            // Show banner after short delay for better UX
            setTimeout(() => this.showBanner(), 1000);
        } else {
            // Apply saved preferences
            this.applyConsent(consent);
        }
    },

    /**
     * Get saved consent from cookie
     */
    getConsent() {
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith(this.config.cookieName + '='));

        if (cookie) {
            try {
                return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
            } catch (e) {
                return null;
            }
        }
        return null;
    },

    /**
     * Save consent to cookie
     */
    saveConsent(preferences) {
        const consent = {
            timestamp: new Date().toISOString(),
            preferences: preferences
        };

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + this.config.cookieExpiry);

        document.cookie = `${this.config.cookieName}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax; Secure`;

        this.applyConsent(consent);
        this.hideBanner();
    },

    /**
     * Apply consent preferences
     */
    applyConsent(consent) {
        const prefs = consent.preferences;

        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: prefs
        }));

        // Enable/disable analytics based on consent
        if (prefs.analytics) {
            this.enableAnalytics();
        }

        // Enable/disable marketing based on consent
        if (prefs.marketing) {
            this.enableMarketing();
        }
    },

    /**
     * Enable analytics tracking
     */
    enableAnalytics() {
        // Google Analytics initialization would go here
        // This is a placeholder - implement based on your analytics provider
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }

        // Microsoft Clarity — only loads after analytics consent
        this.initClarity();
    },

    /**
     * Initialize Microsoft Clarity session recording
     * Replace CLARITY_PROJECT_ID with your actual project ID from clarity.ms
     */
    initClarity() {
        var clarityId = 'vo4ri9cj8q';
        if (!clarityId) return;

        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script",clarityId);
    },

    /**
     * Enable marketing cookies
     */
    enableMarketing() {
        // Marketing cookie initialization would go here
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_personalization': 'granted',
                'ad_user_data': 'granted'
            });
        }
    },

    /**
     * Show cookie consent banner
     */
    showBanner() {
        // Create banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-labelledby', 'cookie-consent-title');
        banner.setAttribute('aria-describedby', 'cookie-consent-description');

        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3 id="cookie-consent-title">
                        <i class="fas fa-cookie-bite"></i>
                        Cookie Preferences
                    </h3>
                    <p id="cookie-consent-description">
                        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                        You can choose which cookies you'd like to accept.
                        <a href="${this.config.privacyPolicyUrl}" class="cookie-link">Learn more</a>
                    </p>
                </div>

                <div class="cookie-consent-options" id="cookie-options" style="display: none;">
                    <div class="cookie-option">
                        <label class="cookie-checkbox">
                            <input type="checkbox" id="cookie-necessary" checked disabled>
                            <span class="checkmark"></span>
                            <span class="cookie-label">
                                <strong>Necessary</strong>
                                <small>Essential for the website to function</small>
                            </span>
                        </label>
                    </div>
                    <div class="cookie-option">
                        <label class="cookie-checkbox">
                            <input type="checkbox" id="cookie-analytics">
                            <span class="checkmark"></span>
                            <span class="cookie-label">
                                <strong>Analytics</strong>
                                <small>Help us improve our website</small>
                            </span>
                        </label>
                    </div>
                    <div class="cookie-option">
                        <label class="cookie-checkbox">
                            <input type="checkbox" id="cookie-marketing">
                            <span class="checkmark"></span>
                            <span class="cookie-label">
                                <strong>Marketing</strong>
                                <small>Personalized advertisements</small>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="cookie-consent-actions">
                    <button type="button" class="cookie-btn cookie-btn-settings" id="cookie-settings-btn">
                        <i class="fas fa-cog"></i> Customize
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-reject" id="cookie-reject-btn">
                        Reject All
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-accept" id="cookie-accept-btn">
                        Accept All
                    </button>
                </div>

                <div class="cookie-consent-save" id="cookie-save-container" style="display: none;">
                    <button type="button" class="cookie-btn cookie-btn-save" id="cookie-save-btn">
                        Save Preferences
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add event listeners
        this.attachEventListeners();

        // Animate in
        requestAnimationFrame(() => {
            banner.classList.add('visible');
        });
    },

    /**
     * Hide cookie consent banner
     */
    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('visible');
            setTimeout(() => banner.remove(), 300);
        }
    },

    /**
     * Attach event listeners to banner buttons
     */
    attachEventListeners() {
        // Accept all
        document.getElementById('cookie-accept-btn').addEventListener('click', () => {
            this.saveConsent({
                necessary: true,
                analytics: true,
                marketing: true
            });
        });

        // Reject all (only necessary)
        document.getElementById('cookie-reject-btn').addEventListener('click', () => {
            this.saveConsent({
                necessary: true,
                analytics: false,
                marketing: false
            });
        });

        // Show settings
        document.getElementById('cookie-settings-btn').addEventListener('click', () => {
            const options = document.getElementById('cookie-options');
            const saveContainer = document.getElementById('cookie-save-container');
            const settingsBtn = document.getElementById('cookie-settings-btn');

            if (options.style.display === 'none') {
                options.style.display = 'block';
                saveContainer.style.display = 'block';
                settingsBtn.innerHTML = '<i class="fas fa-times"></i> Hide Options';
            } else {
                options.style.display = 'none';
                saveContainer.style.display = 'none';
                settingsBtn.innerHTML = '<i class="fas fa-cog"></i> Customize';
            }
        });

        // Save preferences
        document.getElementById('cookie-save-btn').addEventListener('click', () => {
            this.saveConsent({
                necessary: true,
                analytics: document.getElementById('cookie-analytics').checked,
                marketing: document.getElementById('cookie-marketing').checked
            });
        });
    },

    /**
     * Reset consent (for testing or settings page)
     */
    resetConsent() {
        document.cookie = `${this.config.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        location.reload();
    },

    /**
     * Check if specific category is consented
     */
    hasConsent(category) {
        const consent = this.getConsent();
        return consent && consent.preferences && consent.preferences[category];
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
} else {
    CookieConsent.init();
}

// Export for use in other scripts
window.CookieConsent = CookieConsent;
