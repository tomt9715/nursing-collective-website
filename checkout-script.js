/**
 * Checkout Page Script
 * Mounts Stripe Embedded Checkout for the selected plan.
 *
 * Flow:
 *   1. Read ?plan=<id> from the URL
 *   2. Require auth — bounce to login.html with return-to param if not signed in
 *   3. Fetch plan details (for the order summary) and the Stripe publishable key
 *      in parallel with creating the embedded checkout session
 *   4. Initialize Stripe.js and mount the embedded form
 *   5. On payment completion, Stripe redirects to the return_url (success.html)
 */

(function () {
    'use strict';

    // ── Plan-specific copy + features for the order summary ──
    const PLAN_DETAILS = {
        'monthly-access': {
            billing: 'Billed monthly',
            features: [
                'Full access to all study guides',
                'Unlimited practice questions',
                'Cancel anytime from your dashboard',
            ],
        },
        'semester-access': {
            billing: 'One-time payment · 4 months access',
            features: [
                'Full access for one semester',
                'Unlimited practice questions',
                'No auto-renewal',
            ],
        },
        'lifetime-access': {
            billing: 'One-time payment · Lifetime access',
            features: [
                'Permanent access to all current & future content',
                'Unlimited practice questions',
                'No subscription, no auto-renewal',
            ],
        },
        'ai-monthly-access': {
            billing: 'Billed monthly',
            features: [
                'Everything in Standard, plus AI study tools',
                'Smart study plans and weak-spot tracking',
                'Cancel anytime from your dashboard',
            ],
        },
        'ai-semester-access': {
            billing: 'One-time payment · 4 months access',
            features: [
                'Everything in Standard for 4 months',
                'AI study tools with enhanced limits',
                'No auto-renewal',
            ],
        },
        'ai-lifetime-access': {
            billing: 'One-time payment · Lifetime access',
            features: [
                'Lifetime access to all content',
                'AI study tools with the highest limits',
                'No subscription, no auto-renewal',
            ],
        },
        'ai-credits-small': {
            billing: 'One-time credit pack',
            features: ['Credits added to your account instantly'],
        },
        'ai-credits-large': {
            billing: 'One-time credit pack',
            features: ['Credits added to your account instantly'],
        },
    };

    function $(id) { return document.getElementById(id); }

    function hidePageLoader() {
        const loader = $('page-loader');
        if (loader) {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 320);
        }
    }

    function showError(message) {
        const loadingEl = $('payment-loading');
        const errorEl = $('payment-error');
        const msgEl = $('payment-error-msg');
        if (loadingEl) loadingEl.classList.add('hidden');
        if (msgEl && message) msgEl.textContent = message;
        if (errorEl) errorEl.classList.remove('hidden');
    }

    function formatPrice(amount) {
        if (typeof amount !== 'number') return '—';
        const dollars = Number.isInteger(amount) ? amount : amount.toFixed(2);
        return `$${dollars}`;
    }

    function renderOrderSummary(product, planId) {
        const details = PLAN_DETAILS[planId] || { billing: '', features: [] };
        const nameEl = $('summary-plan-name');
        const descEl = $('summary-plan-desc');
        const subtotalEl = $('summary-subtotal');
        const billingEl = $('summary-billing');
        const billingRow = $('summary-billing-row');
        const totalEl = $('summary-total');
        const featuresEl = $('summary-features');

        if (nameEl) nameEl.textContent = product.name || planId;
        if (descEl) descEl.textContent = product.description || '';

        const priceStr = formatPrice(product.price);
        if (subtotalEl) subtotalEl.textContent = priceStr;
        if (totalEl) totalEl.textContent = priceStr;

        if (details.billing) {
            if (billingEl) billingEl.textContent = details.billing;
        } else if (billingRow) {
            billingRow.style.display = 'none';
        }

        if (featuresEl && details.features.length) {
            featuresEl.innerHTML = details.features
                .map(f => `<li><i class="fas fa-check"></i><span>${f}</span></li>`)
                .join('');
        }
    }

    async function fetchPublishableKey() {
        const resp = await fetch(`${API_URL}/api/config`);
        if (!resp.ok) throw new Error('Could not load payment configuration');
        const data = await resp.json();
        if (!data.publishableKey) throw new Error('Stripe publishable key missing');
        return data.publishableKey;
    }

    async function fetchProduct(planId) {
        const resp = await fetch(`${API_URL}/api/product/${encodeURIComponent(planId)}`);
        if (!resp.ok) {
            const data = await resp.json().catch(() => ({}));
            throw new Error(data.error || `Plan "${planId}" not found`);
        }
        return resp.json();
    }

    async function init() {
        hidePageLoader();

        // 1. Plan from URL
        const params = new URLSearchParams(window.location.search);
        const planId = params.get('plan');
        if (!planId) {
            showError('No plan was selected. Head back to the pricing page to pick one.');
            return;
        }

        // 2. Auth guard — unauthenticated users go to login then bounce back
        if (typeof isAuthenticated === 'function' && !isAuthenticated()) {
            const returnTo = encodeURIComponent(`/checkout.html?plan=${encodeURIComponent(planId)}`);
            window.location.href = `login.html?return=${returnTo}`;
            return;
        }

        const user = typeof getCurrentUser === 'function' ? getCurrentUser() : {};
        const email = user.email || user.user_email || '';
        if (!email) {
            showError('We could not find your email. Please sign in again.');
            return;
        }

        try {
            // 3. Fetch product details, Stripe key, and create the session in parallel.
            //    (Network round-trips overlap — checkout shows up faster.)
            const [product, publishableKey, session] = await Promise.all([
                fetchProduct(planId),
                fetchPublishableKey(),
                createEmbeddedSubscriptionCheckout(planId, email),
            ]);

            renderOrderSummary(product, planId);

            if (!window.Stripe) {
                throw new Error('Stripe.js failed to load. Please disable any ad-blockers and refresh.');
            }
            if (!session.clientSecret) {
                throw new Error('Checkout session is missing a client secret.');
            }

            const stripe = Stripe(publishableKey);
            const checkout = await stripe.initEmbeddedCheckout({
                clientSecret: session.clientSecret,
            });

            const loadingEl = $('payment-loading');
            if (loadingEl) loadingEl.remove();
            checkout.mount('#checkout-mount');
        } catch (err) {
            console.error('Checkout init failed:', err);
            showError(err.message || 'Something went wrong while preparing your payment.');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
