/**
 * Google Analytics 4 Integration
 * Works with Cookie Consent system for GDPR compliance
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Analytics: https://analytics.google.com
 * 2. Create a GA4 property for your website
 * 3. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 4. Replace 'G-XXXXXXXXXX' below with your actual Measurement ID
 */

const Analytics = {
    // GA4 Measurement ID
    measurementId: 'G-JET68BQMLT',

    // Track if analytics has been initialized
    initialized: false,

    /**
     * Initialize Google Analytics
     * Called when user consents to analytics cookies
     */
    init() {
        if (this.initialized || this.measurementId === 'G-XXXXXXXXXX') {
            if (this.measurementId === 'G-XXXXXXXXXX') {
                console.warn('Analytics: Please set your GA4 Measurement ID in analytics.js');
            }
            return;
        }

        // Load gtag.js
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };

        // Default consent to denied (GDPR compliant)
        gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_personalization': 'denied',
            'ad_user_data': 'denied'
        });

        gtag('js', new Date());
        gtag('config', this.measurementId, {
            // Anonymize IP for privacy
            'anonymize_ip': true,
            // Don't send page view on initial load (we'll send it after consent check)
            'send_page_view': false
        });

        this.initialized = true;

        // Check if consent was already given
        if (typeof CookieConsent !== 'undefined' && CookieConsent.hasConsent('analytics')) {
            this.enableAnalytics();
        }
    },

    /**
     * Enable analytics tracking (after consent)
     */
    enableAnalytics() {
        if (!this.initialized) return;

        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });

        // Send initial page view
        this.trackPageView();
    },

    /**
     * Track page view
     * @param {string} pagePath - Optional custom page path
     * @param {string} pageTitle - Optional custom page title
     */
    trackPageView(pagePath = null, pageTitle = null) {
        if (!this.initialized || typeof gtag === 'undefined') return;

        gtag('event', 'page_view', {
            page_path: pagePath || window.location.pathname,
            page_title: pageTitle || document.title,
            page_location: window.location.href
        });
    },

    /**
     * Track custom event
     * @param {string} eventName - Event name
     * @param {object} params - Event parameters
     */
    trackEvent(eventName, params = {}) {
        if (!this.initialized || typeof gtag === 'undefined') return;

        gtag('event', eventName, params);
    },

    /**
     * Track button click
     * @param {string} buttonName - Button identifier
     * @param {string} category - Event category
     */
    trackClick(buttonName, category = 'engagement') {
        this.trackEvent('click', {
            event_category: category,
            event_label: buttonName
        });
    },

    /**
     * Track form submission
     * @param {string} formName - Form identifier
     */
    trackFormSubmit(formName) {
        this.trackEvent('form_submit', {
            event_category: 'forms',
            event_label: formName
        });
    },

    /**
     * Track add to cart
     * @param {object} item - Product information
     */
    trackAddToCart(item) {
        this.trackEvent('add_to_cart', {
            currency: 'USD',
            value: item.price,
            items: [{
                item_id: item.product_id,
                item_name: item.product_name,
                price: item.price,
                quantity: item.quantity || 1
            }]
        });
    },

    /**
     * Track remove from cart
     * @param {object} item - Product information
     */
    trackRemoveFromCart(item) {
        this.trackEvent('remove_from_cart', {
            currency: 'USD',
            value: item.price,
            items: [{
                item_id: item.product_id,
                item_name: item.product_name,
                price: item.price,
                quantity: item.quantity || 1
            }]
        });
    },

    /**
     * Track begin checkout
     * @param {array} items - Cart items
     * @param {number} value - Cart total
     */
    trackBeginCheckout(items, value) {
        this.trackEvent('begin_checkout', {
            currency: 'USD',
            value: value,
            items: items.map(item => ({
                item_id: item.product_id,
                item_name: item.product_name,
                price: item.price,
                quantity: item.quantity || 1
            }))
        });
    },

    /**
     * Track purchase completion
     * @param {string} transactionId - Transaction/order ID
     * @param {array} items - Purchased items
     * @param {number} value - Total value
     */
    trackPurchase(transactionId, items, value) {
        this.trackEvent('purchase', {
            transaction_id: transactionId,
            currency: 'USD',
            value: value,
            items: items.map(item => ({
                item_id: item.product_id,
                item_name: item.product_name,
                price: item.price,
                quantity: item.quantity || 1
            }))
        });
    },

    /**
     * Track login
     * @param {string} method - Login method (google, discord, email)
     */
    trackLogin(method) {
        this.trackEvent('login', {
            method: method
        });
    },

    /**
     * Track signup
     * @param {string} method - Signup method (google, discord, email)
     */
    trackSignUp(method) {
        this.trackEvent('sign_up', {
            method: method
        });
    },

    /**
     * Track search
     * @param {string} searchTerm - Search query
     */
    trackSearch(searchTerm) {
        this.trackEvent('search', {
            search_term: searchTerm
        });
    },

    /**
     * Track content view (e.g., viewing a guide)
     * @param {string} contentType - Type of content
     * @param {string} contentId - Content identifier
     * @param {string} contentName - Content name
     */
    trackContentView(contentType, contentId, contentName) {
        this.trackEvent('view_item', {
            items: [{
                item_id: contentId,
                item_name: contentName,
                item_category: contentType
            }]
        });
    },

    /**
     * Set user ID for cross-device tracking
     * @param {string} userId - User identifier (should be hashed/anonymized)
     */
    setUserId(userId) {
        if (!this.initialized || typeof gtag === 'undefined') return;

        gtag('config', this.measurementId, {
            'user_id': userId
        });
    }
};

// Listen for cookie consent changes
window.addEventListener('cookieConsentUpdated', (event) => {
    if (event.detail.analytics) {
        Analytics.enableAnalytics();
    }
});

// Initialize analytics on page load
document.addEventListener('DOMContentLoaded', () => {
    Analytics.init();
});

// Export for use in other scripts
window.Analytics = Analytics;

/**
 * Track a beta-specific event to both GA4 and our own backend.
 * @param {string} eventName - Allowlisted event name (e.g. 'guide_opened')
 * @param {object} eventData - Optional extra data
 */
function trackBetaEvent(eventName, eventData = {}) {
    // Send to GA4
    if (Analytics.initialized) {
        Analytics.trackEvent('beta_' + eventName, eventData);
    }

    // Send to our backend
    const payload = {
        event_name: eventName,
        event_data: eventData,
        page_url: window.location.href,
        session_id: sessionStorage.getItem('tnc_session_id') || generateSessionId()
    };

    const apiUrl = typeof API_URL !== 'undefined' ? API_URL : 'https://staging-backend-production-365a.up.railway.app';
    const token = localStorage.getItem('accessToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;

    fetch(apiUrl + '/api/analytics/event', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    }).catch(function() { /* silently fail — analytics should never block UX */ });
}

function generateSessionId() {
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('tnc_session_id', id);
    return id;
}

window.trackBetaEvent = trackBetaEvent;
