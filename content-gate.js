/**
 * Content Gating Script
 * Include this on any page that requires subscription access
 * Must be loaded AFTER api-service.js
 */

(function() {
    'use strict';

    // Configuration - matches CONTENT_ACCESS in api-service.js
    const API_URL = 'https://api.thenursingcollective.pro';

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

    // Check subscription status
    async function checkSubscription() {
        if (!isAuthenticated()) {
            return { hasAccess: false, subscription: null };
        }

        try {
            const response = await fetch(`${API_URL}/api/subscription-status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (!response.ok) {
                return { hasAccess: false, subscription: null };
            }

            const data = await response.json();
            return {
                hasAccess: data.has_access,
                subscription: data.subscription
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
                    <div class="paywall-price"><strong>$119</strong> for lifetime access</div>
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
                background: rgba(0, 0, 0, 0.92);
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
                background: #ffffff;
                border-radius: 20px;
                padding: 48px;
                max-width: 480px;
                width: 100%;
                text-align: center;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                animation: paywallSlideUp 0.3s ease;
            }
            @keyframes paywallSlideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .paywall-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #2E86AB, #A23B72);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 24px;
            }
            .paywall-icon i {
                font-size: 36px;
                color: white;
            }
            .paywall-modal h2 {
                font-family: 'Outfit', sans-serif;
                font-size: 28px;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 12px;
            }
            .paywall-modal > p {
                color: #6b7280;
                font-size: 1rem;
                line-height: 1.6;
                margin-bottom: 24px;
            }
            .paywall-pricing {
                background: #f9fafb;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
            }
            .paywall-price {
                font-size: 1.1rem;
                color: #1f2937;
            }
            .paywall-price strong {
                color: #2E86AB;
            }
            .paywall-divider {
                color: #9ca3af;
                font-size: 0.85rem;
                margin: 8px 0;
            }
            .paywall-actions {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .paywall-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 14px 24px;
                border-radius: 10px;
                font-weight: 600;
                font-size: 1rem;
                text-decoration: none;
                transition: all 0.2s ease;
            }
            .paywall-btn-primary {
                background: linear-gradient(135deg, #2E86AB, #236b8a);
                color: white;
            }
            .paywall-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(46, 134, 171, 0.4);
            }
            .paywall-btn-secondary {
                background: #f3f4f6;
                color: #4b5563;
            }
            .paywall-btn-secondary:hover {
                background: #e5e7eb;
            }
            .paywall-login {
                margin-top: 20px;
                font-size: 0.9rem;
                color: #6b7280;
            }
            .paywall-login a {
                color: #2E86AB;
                text-decoration: none;
                font-weight: 600;
            }
            .paywall-login a:hover {
                text-decoration: underline;
            }
            @media (max-width: 480px) {
                .paywall-modal {
                    padding: 32px 24px;
                }
                .paywall-modal h2 {
                    font-size: 24px;
                }
                .paywall-icon {
                    width: 64px;
                    height: 64px;
                }
                .paywall-icon i {
                    font-size: 28px;
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
            console.log('[ContentGate] Free content - no gating required');
            return;
        }

        // Only gate guides for now (can expand later)
        if (!isPaidGuide(path)) {
            console.log('[ContentGate] Not a gated path');
            return;
        }

        console.log('[ContentGate] Checking subscription for:', path);

        // Check subscription status
        const { hasAccess } = await checkSubscription();

        if (!hasAccess) {
            console.log('[ContentGate] No access - showing paywall');
            // Store intended destination for redirect after subscription
            sessionStorage.setItem('redirectAfterSubscribe', path);
            showPaywall();
        } else {
            console.log('[ContentGate] Access granted');
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContentGate);
    } else {
        initContentGate();
    }
})();
