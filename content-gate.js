/**
 * Content Gating Script
 * Include this on any page that requires subscription access
 * Must be loaded AFTER api-service.js
 */

(function() {
    'use strict';

    // Configuration - auto-detect environment (matches api-service.js pattern)
    const API_URL = (function() {
        const hostname = window.location.hostname;
        if (hostname === 'thenursingcollective.pro' || hostname === 'www.thenursingcollective.pro') {
            return 'https://api.thenursingcollective.pro';
        }
        return 'https://staging-backend-production-365a.up.railway.app';
    })();

    // Free content paths that don't require gating
    const FREE_PATHS = [
        '/resources/how-to-study.html',
        '/resources/not-overwhelmed.html',
        '/resources/time-management.html',
        '/resources/care-plans.html',
        '/resources/feeling-like-failing.html'
    ];

    // Check if user is authenticated
    function isAuthenticated() {
        return !!localStorage.getItem('accessToken');
    }

    // Normalize path for comparison
    function normalizePath(path) {
        // Remove leading/trailing slashes and normalize
        let normalized = path.replace(/^\/+|\/+$/g, '');
        // Add leading slash back
        return '/' + normalized;
    }

    // Check if current path is free content
    function isFreePath(path) {
        const normalized = normalizePath(path);
        return FREE_PATHS.some(freePath => normalized === freePath);
    }

    // Check if current path is a paid guide
    function isPaidGuide(path) {
        const normalized = normalizePath(path);
        return normalized.startsWith('/guides/') && normalized.endsWith('.html');
    }

    // Check if user is an admin (admins always have access)
    async function checkAdmin() {
        if (!isAuthenticated()) return false;
        try {
            const data = await apiService.get('/api/user/profile');
            return data && data.user && data.user.is_admin === true;
        } catch (e) {
            return false;
        }
    }

    // Check subscription status (uses apiService for automatic token refresh)
    async function checkSubscription() {
        if (!isAuthenticated()) {
            return { hasAccess: false, subscription: null };
        }

        try {
            // Admin users always have access
            const [subData, isAdmin] = await Promise.all([
                apiService.get('/api/subscription-status'),
                checkAdmin()
            ]);

            return {
                hasAccess: subData.has_access || isAdmin,
                subscription: subData.subscription
            };
        } catch (error) {
            console.error('Subscription check error:', error);
            return { hasAccess: false, subscription: null };
        }
    }

    // Show paywall overlay
    function showPaywall() {
        // Don't show if already showing
        if (document.getElementById('content-paywall')) {
            return;
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'content-paywall';
        overlay.innerHTML = `
            <div class="paywall-modal">
                <div class="paywall-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h2>Premium Content</h2>
                <p>This study guide is available to subscribers. Get unlimited access to all guides, clinical resources, and quick reference tools.</p>
                <div class="paywall-pricing">
                    <div class="paywall-price">Starting at <strong>$14.99/month</strong></div>
                    <div class="paywall-divider">or</div>
                    <div class="paywall-price"><strong>$149</strong> for lifetime access</div>
                </div>
                <div class="paywall-actions">
                    <a href="/pricing.html" class="paywall-btn paywall-btn-primary">View Subscription Plans</a>
                    <a href="/resources.html" class="paywall-btn paywall-btn-secondary">Browse Free Resources</a>
                </div>
                ${!isAuthenticated() ? '<p class="paywall-login">Already a subscriber? <a href="/login.html">Log in</a></p>' : ''}
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.id = 'content-paywall-styles';
        style.textContent = `
            #content-paywall {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(13,27,42,0.85);
                -webkit-backdrop-filter: blur(8px);
                backdrop-filter: blur(8px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: paywallFadeIn 0.3s ease;
            }
            @keyframes paywallFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .paywall-modal {
                background: #162032;
                border: 0.5px solid rgba(255,255,255,0.12);
                border-radius: 14px;
                padding: 40px 36px;
                max-width: 440px;
                width: 100%;
                text-align: center;
                animation: paywallSlideUp 0.3s ease;
            }
            @keyframes paywallSlideUp {
                from { transform: translateY(12px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .paywall-icon {
                width: 52px;
                height: 52px;
                background: rgba(15,188,173,0.12);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            }
            .paywall-icon i {
                font-size: 22px;
                color: #0fbcad;
            }
            .paywall-modal h2 {
                font-family: 'DM Serif Display', serif;
                font-size: 22px;
                font-weight: 400;
                color: #e8edf2;
                margin-bottom: 8px;
            }
            .paywall-modal > p {
                color: #8a9bb0;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 24px;
            }
            .paywall-pricing {
                background: rgba(255,255,255,0.04);
                border: 0.5px solid rgba(255,255,255,0.07);
                border-radius: 10px;
                padding: 16px;
                margin-bottom: 24px;
            }
            .paywall-price {
                font-family: 'Outfit', sans-serif;
                font-size: 14px;
                color: #8a9bb0;
            }
            .paywall-price strong {
                color: #0fbcad;
                font-weight: 600;
            }
            .paywall-divider {
                font-family: 'DM Mono', monospace;
                color: #5f7085;
                font-size: 11px;
                letter-spacing: 0.06em;
                margin: 8px 0;
            }
            .paywall-actions {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .paywall-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 10px 22px;
                border-radius: 8px;
                font-family: 'Outfit', sans-serif;
                font-weight: 600;
                font-size: 13px;
                text-decoration: none;
                transition: all 0.15s;
            }
            .paywall-btn-primary {
                background: #0fbcad;
                color: #0d1b2a;
            }
            .paywall-btn-primary:hover {
                background: #0a9086;
            }
            .paywall-btn-secondary {
                background: transparent;
                color: #8a9bb0;
                border: 0.5px solid rgba(255,255,255,0.12);
            }
            .paywall-btn-secondary:hover {
                border-color: rgba(255,255,255,0.2);
                color: #e8edf2;
            }
            .paywall-login {
                margin-top: 16px;
                font-size: 13px;
                color: #5f7085;
            }
            .paywall-login a {
                color: #0fbcad;
                text-decoration: none;
                font-weight: 500;
            }
            .paywall-login a:hover {
                color: #0a9086;
            }
            @media (max-width: 480px) {
                .paywall-modal {
                    padding: 32px 24px;
                }
                .paywall-modal h2 {
                    font-size: 20px;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
    }

    // Initialize content gating
    async function initContentGate() {
        const path = window.location.pathname;

        // Skip if free content
        if (isFreePath(path)) {
            return;
        }

        // Only gate guides for now (can expand later)
        if (!isPaidGuide(path)) {
            return;
        }

        // Check subscription status
        const { hasAccess } = await checkSubscription();

        if (!hasAccess) {
            // Store intended destination for redirect after subscription
            sessionStorage.setItem('redirectAfterSubscribe', path);
            showPaywall();
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContentGate);
    } else {
        initContentGate();
    }
})();
