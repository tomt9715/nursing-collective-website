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

    // ── Stripe Elements appearance — warm light theme ──
    // https://docs.stripe.com/elements/appearance-api
    //
    // Stripe renders its fields inside an iframe, so CSS cannot reach them —
    // these values ARE the styling. Keep them in step with css/tokens.css or
    // the card input will not match the payment panel around it.
    const STRIPE_APPEARANCE = {
        theme: 'stripe',
        labels: 'floating',
        variables: {
            colorPrimary: '#0e9a8f',
            colorBackground: '#ffffff',
            colorText: '#2b2621',
            colorTextSecondary: '#6a6157',
            colorTextPlaceholder: '#8a8073',
            colorDanger: '#d64545',
            colorIconTab: '#6a6157',
            colorIconTabSelected: '#0e9a8f',
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontSizeBase: '15px',
            spacingUnit: '4px',
            borderRadius: '8px',
        },
        rules: {
            '.Input': {
                backgroundColor: '#ffffff',
                border: '1px solid rgba(58,44,26,0.17)',
                boxShadow: 'none',
                color: '#2b2621',
                padding: '12px 14px',
            },
            '.Input:hover': {
                borderColor: 'rgba(58,44,26,0.28)',
            },
            '.Input:focus': {
                borderColor: '#0e9a8f',
                boxShadow: '0 0 0 2px rgba(14,154,143,0.18)',
            },
            '.Input--invalid': {
                borderColor: '#d64545',
                boxShadow: 'none',
            },
            '.Label': {
                color: '#6a6157',
                fontWeight: '500',
                fontSize: '13px',
            },
            '.Tab': {
                backgroundColor: '#ffffff',
                border: '1px solid rgba(58,44,26,0.17)',
                boxShadow: 'none',
                color: '#6a6157',
            },
            '.Tab:hover': {
                color: '#2b2621',
                borderColor: 'rgba(58,44,26,0.28)',
            },
            '.Tab--selected': {
                backgroundColor: '#ffffff',
                borderColor: '#0e9a8f',
                color: '#2b2621',
            },
            '.TabIcon--selected': {
                fill: '#0e9a8f',
            },
            '.Block': {
                backgroundColor: '#ffffff',
                borderColor: 'rgba(58,44,26,0.17)',
            },
            '.AccordionItem': {
                backgroundColor: '#ffffff',
                border: '1px solid rgba(58,44,26,0.17)',
            },
            '.Error': {
                color: '#d64545',
                fontSize: '13px',
            },
            '.PickerItem': {
                backgroundColor: '#ffffff',
                color: '#2b2621',
                borderColor: 'rgba(58,44,26,0.17)',
            },
            '.PickerItem--selected': {
                borderColor: '#0e9a8f',
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

    function showError(message, options) {
        const loadingEl = $('payment-loading');
        const formEl = $('payment-form');
        const errorEl = $('payment-error');
        const msgEl = $('payment-error-msg');
        const titleEl = errorEl ? errorEl.querySelector('h3') : null;
        const ctaEl = errorEl ? errorEl.querySelector('a.btn') : null;
        const iconEl = errorEl ? errorEl.querySelector('i') : null;

        if (loadingEl) loadingEl.classList.add('hidden');
        if (formEl) formEl.classList.add('hidden');
        if (msgEl && message) msgEl.textContent = message;

        const opts = options || {};
        if (titleEl && opts.title) titleEl.textContent = opts.title;
        if (iconEl && opts.icon) {
            iconEl.className = opts.icon;
            iconEl.style.color = opts.iconColor || '';
        }
        if (ctaEl) {
            if (opts.ctaText) ctaEl.textContent = opts.ctaText;
            if (opts.ctaHref) ctaEl.setAttribute('href', opts.ctaHref);
        }

        if (errorEl) errorEl.classList.remove('hidden');
    }

    function showAlreadyOwned(message) {
        showError(message, {
            title: 'You\'re already covered',
            icon: 'fas fa-check-circle',
            iconColor: '#0fbcad',
            ctaText: 'Go to Dashboard',
            ctaHref: 'dashboard.html',
        });
    }

    function showUseUpgrade(message) {
        showError(message, {
            title: 'Use the upgrade option',
            icon: 'fas fa-arrow-up-right-from-square',
            iconColor: '#0fbcad',
            ctaText: 'Open Settings',
            ctaHref: 'settings.html#subscription',
        });
    }

    function showNeedsAiSub(message) {
        showError(message, {
            title: 'AI plan required',
            icon: 'fas fa-robot',
            iconColor: '#8b5cf6',
            ctaText: 'See AI plans',
            ctaHref: 'pricing.html?tier=ai',
        });
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

    function renderFulfilledState() {
        // The order was fulfilled server-side (100%-off coupon) — there's no
        // Stripe payment to take. Hide the unused PaymentElement but keep
        // the terms checkbox + submit button so the user still clicks
        // through deliberately.
        const paymentSections = document.querySelectorAll('.payment-section');
        paymentSections.forEach(s => {
            if (s.querySelector('#payment-element')) s.classList.add('hidden');
        });
        const submitLabel = document.getElementById('submit-btn-label');
        const submitMsg = document.getElementById('submit-message');
        if (submitLabel) submitLabel.textContent = 'Complete purchase · $0';
        if (submitMsg) {
            submitMsg.textContent = 'Your coupon covers the full cost — agree to the terms and click below to activate your access.';
        }
    }

    function redirectToFreeSuccess(planId) {
        // Mirror the success URL structure Stripe would have produced.
        // For credit add-ons, success.html polls /api/ai/credits; for everything
        // else it polls /api/subscription-status.
        const isCreditAddon = planId.startsWith('ai-credits');
        const target = new URL(`${window.location.origin}/success.html`);
        target.searchParams.set('type', isCreditAddon ? 'credits' : 'subscription');
        target.searchParams.set('plan', planId);
        target.searchParams.set('free', '1');
        window.location.href = target.toString();
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
            // No clientSecret = nothing to mount. This happens when the
            // intent was fulfilled server-side (100%-off coupons), in which
            // case we're about to redirect anyway. Bail before Stripe throws.
            if (!clientSecret) return;
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
            if (err.code === 'already_owned') {
                showAlreadyOwned(err.message);
            } else if (err.code === 'use_upgrade_flow') {
                showUseUpgrade(err.message);
            } else if (err.code === 'ai_subscription_required') {
                showNeedsAiSub(err.message);
            } else {
                showError(err.message || 'Something went wrong while preparing your payment.');
            }
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

                // 100%-off path: backend fulfilled the order without Stripe.
                // Swap the form into a "ready to confirm" state instead of
                // auto-navigating — user still clicks Complete purchase.
                if (newIntent.fulfilled) {
                    if (promoStatus) {
                        promoStatus.textContent = 'Code applied — your coupon covers 100% of the cost.';
                        promoStatus.className = 'promo-status success';
                    }
                    if (promoApplyBtn) {
                        promoApplyBtn.textContent = 'Applied';
                        promoApplyBtn.disabled = true;
                    }
                    if (promoInput) promoInput.disabled = true;
                    renderFulfilledState();
                    return;
                }

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

            // If the order was already fulfilled (100%-off coupon), don't try
            // to confirm a non-existent PaymentIntent — just redirect.
            if (currentIntent && currentIntent.fulfilled) {
                redirectToFreeSuccess(planId);
                return;
            }

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
