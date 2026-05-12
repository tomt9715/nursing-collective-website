/**
 * Checkout Page Script — Stripe Elements / PaymentElement
 *
 * Migrated off Stripe Embedded Checkout (which can't be fully dark-themed) to
 * Stripe Elements with PaymentElement so the payment form renders inside our
 * own navy panel using a custom appearance config.
 *
 * Flow:
 *   1. Read ?plan=<id> from the URL.
 *   2. Require auth — bounce to login with return-to if not signed in.
 *   3. Fetch plan details + publishable key + create the intent in parallel.
 *      Backend returns a clientSecret for either:
 *        - a PaymentIntent (semester / lifetime / credit add-ons), or
 *        - a Subscription's latest_invoice.payment_intent (monthly plans
 *          created with payment_behavior='default_incomplete').
 *   4. Mount PaymentElement with a dark appearance config.
 *   5. On submit: validate the terms checkbox, then call stripe.confirmPayment
 *      with a return_url back to success.html. Stripe handles 3DS / redirects.
 *   6. Webhooks fulfill the order; success.html polls /api/subscription-status.
 */

(function () {
    'use strict';

    // ── Plan-specific copy + features for the order summary ──
    const PLAN_DETAILS = {
        'monthly-access': {
            billing: 'Billed monthly',
            submitMessage: 'Your plan gives you instant access to all study guides. You can cancel anytime from your dashboard.',
            features: [
                'Full access to all study guides',
                'Unlimited practice questions',
                'Cancel anytime from your dashboard',
            ],
        },
        'semester-access': {
            billing: 'One-time payment · 4 months access',
            submitMessage: 'Your purchase gives you 4 months of full access to all study guides and resources.',
            features: [
                'Full access for one semester',
                'Unlimited practice questions',
                'No auto-renewal',
            ],
        },
        'lifetime-access': {
            billing: 'One-time payment · Lifetime access',
            submitMessage: 'Your purchase gives you permanent access to all current and future study guides and resources.',
            features: [
                'Permanent access to all current & future content',
                'Unlimited practice questions',
                'No subscription, no auto-renewal',
            ],
        },
        'ai-monthly-access': {
            billing: 'Billed monthly',
            submitMessage: 'Your plan gives you instant access to all study guides plus AI tools. You can cancel anytime from your dashboard.',
            features: [
                'Everything in Standard, plus AI study tools',
                'Smart study plans and weak-spot tracking',
                'Cancel anytime from your dashboard',
            ],
        },
        'ai-semester-access': {
            billing: 'One-time payment · 4 months access',
            submitMessage: 'Your purchase gives you 4 months of full access with AI study tools.',
            features: [
                'Everything in Standard for 4 months',
                'AI study tools with enhanced limits',
                'No auto-renewal',
            ],
        },
        'ai-lifetime-access': {
            billing: 'One-time payment · Lifetime access',
            submitMessage: 'Your purchase gives you permanent access with the highest AI tool limits.',
            features: [
                'Lifetime access to all content',
                'AI study tools with the highest limits',
                'No subscription, no auto-renewal',
            ],
        },
        'ai-credits-small': {
            billing: 'One-time credit pack',
            submitMessage: 'Credits will be added to your account instantly after payment.',
            features: ['Credits added to your account instantly'],
        },
        'ai-credits-large': {
            billing: 'One-time credit pack',
            submitMessage: 'Credits will be added to your account instantly after payment.',
            features: ['Credits added to your account instantly'],
        },
    };

    // ── Stripe Elements appearance — navy/teal dark theme ──
    // https://docs.stripe.com/elements/appearance-api
    const STRIPE_APPEARANCE = {
        theme: 'night',
        labels: 'floating',
        variables: {
            colorPrimary: '#0fbcad',
            colorBackground: '#162032',
            colorText: '#e8edf2',
            colorTextSecondary: '#8a9bb0',
            colorTextPlaceholder: '#5f7085',
            colorDanger: '#e05252',
            colorIconTab: '#8a9bb0',
            colorIconTabSelected: '#0fbcad',
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontSizeBase: '15px',
            spacingUnit: '4px',
            borderRadius: '8px',
        },
        rules: {
            '.Input': {
                backgroundColor: '#1e2d3e',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: 'none',
                color: '#e8edf2',
                padding: '12px 14px',
            },
            '.Input:hover': {
                borderColor: 'rgba(255,255,255,0.22)',
            },
            '.Input:focus': {
                borderColor: '#0fbcad',
                boxShadow: '0 0 0 2px rgba(15,188,173,0.18)',
            },
            '.Input--invalid': {
                borderColor: '#e05252',
                boxShadow: 'none',
            },
            '.Label': {
                color: '#8a9bb0',
                fontWeight: '500',
                fontSize: '13px',
            },
            '.Tab': {
                backgroundColor: '#1e2d3e',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: 'none',
                color: '#8a9bb0',
            },
            '.Tab:hover': {
                color: '#e8edf2',
                borderColor: 'rgba(255,255,255,0.22)',
            },
            '.Tab--selected': {
                backgroundColor: '#1e2d3e',
                borderColor: '#0fbcad',
                color: '#e8edf2',
            },
            '.TabIcon--selected': {
                fill: '#0fbcad',
            },
            '.Block': {
                backgroundColor: '#1e2d3e',
                borderColor: 'rgba(255,255,255,0.12)',
            },
            '.AccordionItem': {
                backgroundColor: '#1e2d3e',
                border: '1px solid rgba(255,255,255,0.12)',
            },
            '.Error': {
                color: '#e05252',
                fontSize: '13px',
            },
            '.PickerItem': {
                backgroundColor: '#1e2d3e',
                color: '#e8edf2',
                borderColor: 'rgba(255,255,255,0.12)',
            },
            '.PickerItem--selected': {
                borderColor: '#0fbcad',
            },
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
        const formEl = $('payment-form');
        const errorEl = $('payment-error');
        const msgEl = $('payment-error-msg');
        if (loadingEl) loadingEl.classList.add('hidden');
        if (formEl) formEl.classList.add('hidden');
        if (msgEl && message) msgEl.textContent = message;
        if (errorEl) errorEl.classList.remove('hidden');
    }

    function showFormError(message) {
        const el = $('form-error');
        if (!el) return;
        if (message) {
            el.textContent = message;
            el.classList.remove('hidden');
        } else {
            el.textContent = '';
            el.classList.add('hidden');
        }
    }

    function formatPrice(amount) {
        if (typeof amount !== 'number') return '—';
        return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
    }

    function renderOrderSummary(product, planId, intent) {
        const details = PLAN_DETAILS[planId] || { billing: '', features: [], submitMessage: '' };
        const nameEl = $('summary-plan-name');
        const descEl = $('summary-plan-desc');
        const subtotalEl = $('summary-subtotal');
        const billingEl = $('summary-billing');
        const billingRow = $('summary-billing-row');
        const totalEl = $('summary-total');
        const featuresEl = $('summary-features');

        if (nameEl) nameEl.textContent = product.name || planId;
        if (descEl) descEl.textContent = product.description || '';

        const originalPrice = (intent && typeof intent.originalAmount === 'number') ? intent.originalAmount : product.price;
        const finalPrice = (intent && typeof intent.amount === 'number') ? intent.amount : product.price;

        if (subtotalEl) subtotalEl.textContent = formatPrice(originalPrice);
        if (totalEl) totalEl.textContent = formatPrice(finalPrice);

        if (details.billing) {
            if (billingEl) billingEl.textContent = details.billing;
        } else if (billingRow) {
            billingRow.style.display = 'none';
        }

        if (featuresEl && details.features.length) {
            // Plain text (escaping not strictly necessary since features are
            // hard-coded strings, but defensive against future edits).
            featuresEl.innerHTML = '';
            details.features.forEach(text => {
                const li = document.createElement('li');
                const i = document.createElement('i');
                i.className = 'fas fa-check';
                const span = document.createElement('span');
                span.textContent = text;
                li.appendChild(i);
                li.appendChild(span);
                featuresEl.appendChild(li);
            });
        }

        // Update the message shown above the submit button
        const submitMsgEl = $('submit-message');
        if (submitMsgEl && details.submitMessage) {
            submitMsgEl.textContent = details.submitMessage;
        }

        // Update CTA label based on plan type
        const submitBtnLabel = $('submit-btn-label');
        if (submitBtnLabel) {
            if (intent && intent.type === 'subscription') {
                submitBtnLabel.textContent = `Subscribe · ${formatPrice(finalPrice)}/mo`;
            } else {
                submitBtnLabel.textContent = `Pay ${formatPrice(finalPrice)}`;
            }
        }
    }

    function renderDiscount(intent) {
        const row = $('summary-discount-row');
        const valueEl = $('summary-discount');
        if (!row || !valueEl) return;
        if (intent && intent.discount) {
            const d = intent.discount;
            const label = d.type === 'percent' ? `−${d.value}%` : `−$${d.value.toFixed(2)}`;
            valueEl.textContent = label;
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
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

        let stripe, elements, paymentElement, currentIntent, product, publishableKey;

        function mountPaymentElement(clientSecret) {
            // Stripe Elements doesn't allow updating clientSecret on an
            // existing instance — destroy and recreate when the intent
            // changes (e.g., after applying a promo code).
            if (paymentElement) {
                try { paymentElement.unmount(); } catch (e) { /* noop */ }
            }
            elements = stripe.elements({
                clientSecret,
                appearance: STRIPE_APPEARANCE,
                fonts: [
                    { cssSrc: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap' },
                ],
            });
            paymentElement = elements.create('payment', {
                layout: { type: 'tabs', defaultCollapsed: false },
                defaultValues: { billingDetails: { email } },
            });
            paymentElement.mount('#payment-element');
            paymentElement.on('ready', () => {
                const loadingEl = $('payment-loading');
                const formEl = $('payment-form');
                if (loadingEl) loadingEl.classList.add('hidden');
                if (formEl) formEl.classList.remove('hidden');
            });
            paymentElement.on('change', (event) => {
                showFormError(event.error ? event.error.message : '');
            });
        }

        try {
            // 3. Fetch product, publishable key, and create the initial intent in parallel.
            [product, publishableKey, currentIntent] = await Promise.all([
                fetchProduct(planId),
                fetchPublishableKey(),
                createCheckoutIntent(planId, email),
            ]);

            if (!window.Stripe) {
                throw new Error('Stripe.js failed to load. Please disable any ad-blockers and refresh.');
            }
            if (!currentIntent.clientSecret) {
                throw new Error('Checkout could not be initialized (missing client secret).');
            }

            renderOrderSummary(product, planId, currentIntent);
            renderDiscount(currentIntent);

            // 4. Mount Stripe Elements with our dark appearance.
            stripe = Stripe(publishableKey);
            mountPaymentElement(currentIntent.clientSecret);
        } catch (err) {
            console.error('Checkout init failed:', err);
            showError(err.message || 'Something went wrong while preparing your payment.');
            return;
        }

        // ── Promo code handling ──
        const promoInput = $('promo-input');
        const promoApplyBtn = $('promo-apply');
        const promoStatus = $('promo-status');

        async function applyPromoCode() {
            if (!promoInput) return;
            const code = (promoInput.value || '').trim().toUpperCase();
            if (!code) {
                if (promoStatus) {
                    promoStatus.textContent = 'Enter a code first.';
                    promoStatus.className = 'promo-status error';
                }
                return;
            }

            if (promoApplyBtn) {
                promoApplyBtn.disabled = true;
                promoApplyBtn.textContent = 'Applying…';
            }
            if (promoStatus) {
                promoStatus.textContent = '';
                promoStatus.className = 'promo-status';
            }

            try {
                // Re-create the intent with the promo code so the amount/coupon is applied.
                const newIntent = await createCheckoutIntent(planId, email, code);
                if (!newIntent.discount) {
                    throw new Error('That promo code isn\'t valid or has expired.');
                }

                currentIntent = newIntent;
                renderOrderSummary(product, planId, currentIntent);
                renderDiscount(currentIntent);

                // Re-mount Elements with the new clientSecret.
                mountPaymentElement(currentIntent.clientSecret);

                if (promoStatus) {
                    const d = currentIntent.discount;
                    const label = d.type === 'percent' ? `${d.value}% off` : `$${d.value.toFixed(2)} off`;
                    promoStatus.textContent = `Code applied — ${label}.`;
                    promoStatus.className = 'promo-status success';
                }
                if (promoInput) promoInput.disabled = true;
                if (promoApplyBtn) {
                    promoApplyBtn.textContent = 'Applied';
                    promoApplyBtn.disabled = true;
                }
            } catch (err) {
                if (promoStatus) {
                    promoStatus.textContent = err.message || 'Could not apply promo code.';
                    promoStatus.className = 'promo-status error';
                }
                if (promoApplyBtn) {
                    promoApplyBtn.disabled = false;
                    promoApplyBtn.textContent = 'Apply';
                }
            }
        }

        if (promoApplyBtn) {
            promoApplyBtn.addEventListener('click', applyPromoCode);
        }
        if (promoInput) {
            promoInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    applyPromoCode();
                }
            });
        }

        // ── Form submission ──
        const form = $('payment-form');
        const submitBtn = $('submit-btn');
        const submitSpinner = $('submit-spinner');
        const submitLabel = $('submit-btn-label');
        const termsCheckbox = $('terms-checkbox');

        if (!form || !submitBtn) {
            console.error('Checkout form elements missing');
            return;
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            showFormError('');

            if (termsCheckbox && !termsCheckbox.checked) {
                showFormError('Please agree to the Terms of Service and Privacy Policy to continue.');
                termsCheckbox.focus();
                return;
            }

            submitBtn.disabled = true;
            if (submitSpinner) submitSpinner.classList.remove('hidden');
            const previousLabel = submitLabel ? submitLabel.textContent : '';
            if (submitLabel) submitLabel.textContent = 'Processing…';

            try {
                const returnUrl = new URL(`${window.location.origin}/success.html`);
                // Credit add-ons don't create a Subscription record, so the
                // success page should poll the credit balance instead of
                // /api/subscription-status. Tag the redirect so success.html
                // can route correctly.
                const isCreditAddon = planId.startsWith('ai-credits');
                returnUrl.searchParams.set('type', isCreditAddon ? 'credits' : 'subscription');
                returnUrl.searchParams.set('plan', planId);

                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: returnUrl.toString(),
                        receipt_email: email,
                    },
                });

                // If confirmPayment redirects, we never reach this line. If it
                // returns, an error occurred (validation, card declined, etc.)
                if (error) {
                    if (error.type === 'validation_error') {
                        showFormError(error.message || 'Please complete all required payment fields.');
                    } else {
                        showFormError(error.message || 'We couldn\'t process your payment. Please try again.');
                    }
                }
            } catch (err) {
                console.error('Payment confirmation error:', err);
                showFormError('Something went wrong while submitting your payment. Please try again.');
            } finally {
                submitBtn.disabled = false;
                if (submitSpinner) submitSpinner.classList.add('hidden');
                if (submitLabel) submitLabel.textContent = previousLabel || 'Pay';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
