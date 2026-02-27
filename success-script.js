// Success Page JavaScript
// Payment verification and order confirmation

// Use API_URL from api-service.js (auto-detects production vs staging)

// Polling configuration
const POLL_INTERVAL = 3000; // 3 seconds
const MAX_POLL_TIME = 30000; // 30 seconds
let pollStartTime = null;
let pollTimer = null;

/**
 * Initialize success page
 */
async function initSuccessPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const paymentIntent = urlParams.get('payment_intent');
    const orderNumber = urlParams.get('order_number');
    const purchaseType = urlParams.get('type'); // 'subscription' for subscription purchases

    console.log('Success page params:', { sessionId, paymentIntent, orderNumber, purchaseType });

    if (!sessionId && !paymentIntent) {
        showErrorState('No payment information found. Please check your email for order confirmation.');
        return;
    }

    // Handle subscription purchases differently
    // Detect subscription by type param OR presence of plan param
    const planId = urlParams.get('plan');
    const isSubscription = purchaseType === 'subscription' || purchaseType === 'plan_change' || planId;

    if (purchaseType === 'plan_change') {
        // Plan changes: user already has an active subscription, so polling would
        // immediately find the OLD plan.  Show a dedicated success state instead.
        await handlePlanChangeSuccess();
    } else if (isSubscription) {
        await verifySubscription(sessionId);
    } else {
        await verifyPayment(paymentIntent, sessionId);
    }
}

/**
 * Verify subscription payment via Stripe checkout session
 */
async function verifySubscription(sessionId) {
    try {
        // Poll for subscription status - webhook may take a moment to process
        showPendingState();

        // If access token is missing or stale after Stripe redirect, refresh it first
        if (!localStorage.getItem('accessToken')) {
            try {
                await refreshToken();
            } catch (e) {
                console.warn('Token refresh failed — user may need to log in again');
            }
        }

        // If still not authenticated after refresh attempt, show account creation prompt
        // instead of polling uselessly for 30 seconds
        if (!localStorage.getItem('accessToken')) {
            showGuestSubscriptionSuccess();
            return;
        }

        pollStartTime = Date.now();

        const checkStatus = async () => {
            const elapsed = Date.now() - pollStartTime;

            if (elapsed >= MAX_POLL_TIME) {
                showSubscriptionTimeoutState();
                return;
            }

            try {
                // Check if the user now has an active subscription
                // Use apiCall() for automatic token refresh on 401
                const data = await apiCall('/api/subscription-status');
                console.log('Subscription status check:', data);

                if (data.has_access && data.subscription) {
                    showSubscriptionSuccess(data.subscription);
                    return;
                }

                // Not ready yet, keep polling
                setTimeout(checkStatus, POLL_INTERVAL);
            } catch (error) {
                console.error('Subscription status check error:', error);
                setTimeout(checkStatus, POLL_INTERVAL);
            }
        };

        // Start polling
        checkStatus();

    } catch (error) {
        console.error('Subscription verification error:', error);
        showErrorState('Unable to verify subscription. Please check your dashboard or contact support.');
    }
}

/**
 * Handle plan change success — user already has an active subscription,
 * so we skip polling (it would find the old plan) and show a tailored message.
 */
async function handlePlanChangeSuccess() {
    // Quick auth check
    if (!localStorage.getItem('accessToken')) {
        try { await refreshToken(); } catch (e) { /* ignore */ }
    }

    const container = document.getElementById('success-content');
    container.innerHTML = `
        <div class="success-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            <i class="fas fa-check"></i>
        </div>
        <h1 class="success-title">Plan Changed Successfully!</h1>
        <p class="success-message">
            Your subscription plan has been updated. The change may take a moment to appear in your settings.
        </p>
        <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: left;">
            <h4 style="margin: 0 0 8px 0; font-size: 1rem; color: var(--text-primary);"><i class="fas fa-info-circle" style="color: #10b981; margin-right: 8px;"></i>What to expect</h4>
            <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
                Your new plan is active immediately. A confirmation email has been sent to your inbox. If you don't see the update in your settings within a few minutes, try refreshing the page.
            </p>
        </div>
        <div class="success-actions" style="margin-top: 24px;">
            <a href="settings.html" class="btn btn-primary btn-large">
                <i class="fas fa-cog"></i>
                Go to Settings
            </a>
            <a href="dashboard.html" class="btn btn-light">
                <i class="fas fa-book-open"></i>
                Go to Dashboard
            </a>
        </div>
        <div class="email-note">
            <i class="fas fa-envelope"></i>
            <p>A confirmation email with your updated plan details has been sent to your email address.</p>
        </div>
    `;
}

/**
 * Show subscription success state
 */
function showSubscriptionSuccess(subscription) {
    clearGuestCart(); // Clear any legacy cart items

    const container = document.getElementById('success-content');
    const isLoggedIn = isUserLoggedIn();

    // Determine plan display name
    const planNames = {
        'monthly-access': 'Monthly Access',
        'semester-access': 'Semester Access',
        'lifetime-access': 'Lifetime Access',
        'ai-monthly-access': 'AI-Powered Monthly',
        'ai-semester-access': 'AI-Powered Semester',
        'ai-lifetime-access': 'AI-Powered Lifetime',
        'ai-credits-small': 'AI Credits - Small Pack',
        'ai-credits-large': 'AI Credits - Large Pack'
    };
    const planName = planNames[subscription.plan_id] || subscription.plan_name || 'Subscription';
    const isAIPlan = subscription.plan_id && subscription.plan_id.startsWith('ai-') && !subscription.plan_id.startsWith('ai-credits');
    const isCreditAddon = subscription.plan_id && subscription.plan_id.startsWith('ai-credits');

    // Format expiration date if exists
    let accessInfo = '';
    if (subscription.expires_at) {
        const expiresDate = new Date(subscription.expires_at);
        accessInfo = `Your access is valid until ${expiresDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.`;
    } else {
        accessInfo = 'You have lifetime access to all premium content.';
    }

    // AI features callout
    const aiIncluded = isAIPlan ? `
                <li><i class="fas fa-robot" style="color: #8b5cf6; margin-right: 4px;"></i> AI-powered note uploads</li>
                <li><i class="fas fa-robot" style="color: #8b5cf6; margin-right: 4px;"></i> AI-generated NCLEX questions</li>
                <li><i class="fas fa-robot" style="color: #8b5cf6; margin-right: 4px;"></i> AI summaries &amp; gap analysis</li>` : '';

    const successTitle = isCreditAddon ? 'Credits Added!' : (isAIPlan ? 'Welcome to AI-Powered!' : 'Welcome to Premium!');
    const successMessage = isCreditAddon
        ? `Your ${escapeHtml(planName)} has been added to your account. Your additional credits are available immediately.`
        : `Your ${escapeHtml(planName)} subscription is now active. You have unlimited access to all study guides, clinical resources, and quick reference tools.${isAIPlan ? ' Plus AI-powered study tools!' : ''}`;
    const successIconGradient = isAIPlan ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    const successIcon = isCreditAddon ? 'fa-plus-circle' : (isAIPlan ? 'fa-robot' : 'fa-crown');

    container.innerHTML = `
        <div class="success-icon" style="background: ${successIconGradient};">
            <i class="fas ${successIcon}"></i>
        </div>
        <h1 class="success-title">${successTitle}</h1>
        <p class="success-message">${successMessage}</p>

        <div class="order-details">
            <h3>${isCreditAddon ? 'Purchase Details' : 'Subscription Details'}</h3>
            <div class="order-item">
                <span class="order-item-label">Plan</span>
                <span class="order-item-value">${escapeHtml(planName)}</span>
            </div>
            <div class="order-item">
                <span class="order-item-label">Status</span>
                <span class="order-item-value" style="color: #10b981;"><i class="fas fa-check-circle"></i> Active</span>
            </div>
            ${!isCreditAddon ? `<div class="order-item">
                <span class="order-item-label">Access</span>
                <span class="order-item-value">${accessInfo}</span>
            </div>` : ''}
        </div>

        <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: left;">
            <h4 style="margin: 0 0 12px 0; font-size: 1rem; color: var(--text-primary);"><i class="fas fa-lightbulb" style="color: #10b981; margin-right: 8px;"></i>What's included:</h4>
            <ul style="margin: 0; padding-left: 20px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8;">
                <li>50+ comprehensive study guides</li>
                <li>Clinical confidence resources</li>
                <li>Quick reference tools</li>
                <li>New guides added regularly</li>
                ${aiIncluded}
            </ul>
        </div>

        <div class="success-actions">
            ${!localStorage.getItem('onboarding_tour_seen') ? `
            <button class="btn btn-primary btn-large" id="start-tour-btn">
                <i class="fas fa-map-signs"></i>
                Take a Quick Tour
            </button>
            <a href="dashboard.html" class="btn btn-light">
                <i class="fas fa-arrow-right"></i>
                Skip to Dashboard
            </a>
            ` : `
            <a href="dashboard.html" class="btn btn-primary btn-large">
                <i class="fas fa-book-open"></i>
                Start Studying
            </a>
            <a href="dashboard.html" class="btn btn-light">
                <i class="fas fa-list"></i>
                Go to Dashboard
            </a>
            `}
        </div>

        <div class="email-note">
            <i class="fas fa-envelope"></i>
            <p>A confirmation email with your subscription details has been sent to your email address.</p>
        </div>
    `;

    // Attach tour button listener
    const tourBtn = container.querySelector('#start-tour-btn');
    if (tourBtn) {
        tourBtn.addEventListener('click', function() {
            showOnboardingTour(isAIPlan);
        });
    }
}

/**
 * Show onboarding tour carousel
 * @param {boolean} isAIPlan - Whether the user purchased an AI-powered plan
 */
function showOnboardingTour(isAIPlan) {
    const container = document.getElementById('success-content');

    // Define tour steps
    const steps = [
        {
            icon: 'fa-th-large',
            gradient: 'linear-gradient(135deg, #2E86AB 0%, #1a6b8a 100%)',
            title: 'Your Dashboard',
            description: 'Your dashboard is your home base. Everything you need is organized right there.',
            highlights: [
                { icon: 'fa-book-open', text: 'Access all your study guides in one place' },
                { icon: 'fa-crown', text: 'View your subscription status and plan details' },
                { icon: 'fa-cog', text: 'Manage your account settings anytime' }
            ]
        },
        {
            icon: 'fa-book-medical',
            gradient: 'linear-gradient(135deg, #A23B72 0%, #7d2d58 100%)',
            title: 'Study Guides',
            description: 'Browse 50+ guides organized by nursing category — from Cardiac to Pharmacology.',
            highlights: [
                { icon: 'fa-search', text: 'Search and filter by topic or category' },
                { icon: 'fa-lightbulb', text: 'Each guide has clinical pearls and FlorenceBot tips' },
                { icon: 'fa-bookmark', text: 'Sidebar navigation to jump between sections' }
            ]
        },
        {
            icon: 'fa-download',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            title: 'Download & Study Anywhere',
            description: 'Take your guides with you — download PDFs for offline studying during clinicals.',
            highlights: [
                { icon: 'fa-file-pdf', text: 'Download any guide as a print-friendly PDF' },
                { icon: 'fa-mobile-alt', text: 'Guides are mobile-friendly for studying on the go' },
                { icon: 'fa-sync-alt', text: 'New guides added regularly — check back often' }
            ]
        }
    ];

    // Add AI step if applicable
    if (isAIPlan) {
        steps.push({
            icon: 'fa-robot',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            title: 'AI-Powered Tools',
            description: 'Your AI plan unlocks smart study tools that adapt to how you learn.',
            highlights: [
                { icon: 'fa-upload', text: 'Upload your notes for AI-powered analysis' },
                { icon: 'fa-question-circle', text: 'Generate custom NCLEX practice questions' },
                { icon: 'fa-chart-line', text: 'Get personalized study recommendations' }
            ]
        });
    }

    // Final "You're all set" step
    steps.push({
        icon: 'fa-rocket',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        title: "You're All Set!",
        description: "That's the quick tour. Head to your dashboard to start exploring your study guides.",
        highlights: [
            { icon: 'fa-discord', text: 'Join our Discord community for study tips and support' },
            { icon: 'fa-envelope', text: 'Check your email for your welcome message' },
            { icon: 'fa-star', text: 'Bookmark your dashboard for easy access' }
        ],
        isFinal: true
    });

    let currentStep = 0;

    function renderTour() {
        // Build progress dots
        const dotsHtml = steps.map((_, i) => {
            let cls = 'tour-dot';
            if (i === currentStep) cls += ' active';
            else if (i < currentStep) cls += ' completed';
            return `<div class="${cls}"></div>`;
        }).join('');

        // Build all step content (only active one visible)
        const stepsHtml = steps.map((step, i) => {
            const highlightsHtml = step.highlights.map(h =>
                `<div class="tour-highlight">
                    <i class="fas ${h.icon}"></i>
                    <span>${h.text}</span>
                </div>`
            ).join('');

            return `
                <div class="tour-step ${i === currentStep ? 'active' : ''}" data-step="${i}">
                    <div class="tour-icon" style="background: ${step.gradient};">
                        <i class="fas ${step.icon}"></i>
                    </div>
                    <h2 class="tour-title">${step.title}</h2>
                    <p class="tour-description">${step.description}</p>
                    <div class="tour-highlights">
                        ${highlightsHtml}
                    </div>
                </div>
            `;
        }).join('');

        // Build navigation
        const step = steps[currentStep];
        let navHtml = '';
        if (step.isFinal) {
            navHtml = `
                <div class="tour-nav" style="justify-content: center;">
                    <a href="dashboard.html" class="btn btn-primary btn-large" style="min-width: 200px;">
                        <i class="fas fa-book-open"></i>
                        Go to Dashboard
                    </a>
                </div>
            `;
        } else {
            navHtml = `
                <div class="tour-nav">
                    ${currentStep > 0
                        ? `<button class="btn btn-light" id="tour-back"><i class="fas fa-arrow-left"></i> Back</button>`
                        : `<button class="tour-skip" id="tour-skip">Skip tour</button>`
                    }
                    <span class="tour-step-count">${currentStep + 1} of ${steps.length}</span>
                    <button class="btn btn-primary" id="tour-next">Next <i class="fas fa-arrow-right"></i></button>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="onboarding-tour">
                <div class="tour-progress">${dotsHtml}</div>
                ${stepsHtml}
                ${navHtml}
            </div>
        `;

        // Attach event listeners
        const nextBtn = container.querySelector('#tour-next');
        const backBtn = container.querySelector('#tour-back');
        const skipBtn = container.querySelector('#tour-skip');

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    renderTour();
                }
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (currentStep > 0) {
                    currentStep--;
                    renderTour();
                }
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', function() {
                localStorage.setItem('onboarding_tour_seen', 'true');
                window.location.href = 'dashboard.html';
            });
        }
    }

    // Mark tour as seen
    localStorage.setItem('onboarding_tour_seen', 'true');

    // Render the first step
    renderTour();
}

/**
 * Show success state for unauthenticated users (guest subscription purchase)
 * Prompts them to create an account to activate their subscription.
 */
function showGuestSubscriptionSuccess() {
    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="success-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            <i class="fas fa-check"></i>
        </div>
        <h1 class="success-title">Payment Successful!</h1>
        <p class="success-message">
            Your payment was received! To activate your subscription and start studying, create an account or sign in using the same email you used at checkout.
        </p>

        <div class="guest-warning">
            <div class="guest-warning-header">
                <i class="fas fa-info-circle" style="color: var(--primary-color);"></i>
                <h4>One more step</h4>
            </div>
            <p>Create a free account to access your study guides, track your progress, and manage your subscription. Use the same email you entered during checkout so we can link your payment.</p>
        </div>

        <div class="success-actions" style="margin-top: 24px;">
            <a href="login.html?redirect=dashboard&signup=true" class="btn btn-primary btn-large">
                <i class="fas fa-user-plus"></i>
                Create Account
            </a>
            <a href="login.html?redirect=dashboard" class="btn btn-light">
                <i class="fas fa-sign-in-alt"></i>
                Already have an account? Sign in
            </a>
        </div>

        <div class="email-note">
            <i class="fas fa-envelope"></i>
            <p>A confirmation email with your receipt has been sent to your email address. If you need help, contact <a href="mailto:support@thenursingcollective.pro">support@thenursingcollective.pro</a>.</p>
        </div>
    `;
}

/**
 * Show subscription timeout state
 */
function showSubscriptionTimeoutState() {
    // Safety net: if user is not logged in, show guest prompt instead
    if (!isUserLoggedIn()) {
        showGuestSubscriptionSuccess();
        return;
    }

    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="pending-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            <i class="fas fa-clock" style="animation: none;"></i>
        </div>
        <h1 class="success-title">Almost There!</h1>
        <p class="success-message">
            Your payment was received and your subscription is being activated. This may take a moment to process.
        </p>
        <div class="email-note">
            <i class="fas fa-info-circle"></i>
            <p>Your subscription should be active within a few minutes. Try refreshing your dashboard. If you don't have access after 5 minutes, please contact support.</p>
        </div>
        <div class="success-actions" style="margin-top: 24px;">
            <a href="dashboard.html" class="btn btn-primary btn-large">
                <i class="fas fa-book-open"></i>
                Go to Dashboard
            </a>
            <a href="https://discord.gg/y2Mh77wAV2" class="btn btn-light">
                <i class="fab fa-discord"></i>
                Contact Support
            </a>
        </div>
    `;
}

/**
 * Verify payment status using the verify endpoint
 * NOTE: This is legacy code for one-time guide purchases (pre-subscription model).
 * The /cart/orders/verify endpoint may no longer exist on the backend since cart
 * routes were removed. Subscription payments use verifySubscription() instead.
 * Kept for backwards compatibility with any old checkout sessions still in flight.
 */
async function verifyPayment(paymentIntent, sessionId) {
    try {
        // Build query params
        const params = new URLSearchParams();
        if (paymentIntent) params.append('payment_intent', paymentIntent);
        if (sessionId) params.append('session_id', sessionId);

        // Legacy endpoint - cart routes may have been removed from the backend
        const response = await fetch(`${API_URL}/cart/orders/verify?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('Verify response:', data);

        if (data.success && data.order) {
            // Payment verified successfully
            showSuccessState(data.order);
        } else if (data.status === 'pending') {
            // Payment is processing - show pending state and start polling
            showPendingState();
            startPolling(paymentIntent, sessionId);
        } else {
            // Not found or error
            showErrorState(data.message || 'Payment could not be verified. Please contact support if you believe this is an error.');
        }
    } catch (error) {
        console.error('Verification error:', error);
        showErrorState('Unable to verify payment status. Please check your email for confirmation.');
    }
}

/**
 * Start polling for order status
 */
function startPolling(paymentIntent, sessionId) {
    pollStartTime = Date.now();

    pollTimer = setInterval(async () => {
        const elapsed = Date.now() - pollStartTime;

        if (elapsed >= MAX_POLL_TIME) {
            // Stop polling after max time
            clearInterval(pollTimer);
            showTimeoutState();
            return;
        }

        await verifyPayment(paymentIntent, sessionId);
    }, POLL_INTERVAL);
}

/**
 * Stop polling
 */
function stopPolling() {
    if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
    }
}

/**
 * Clear legacy guest cart data from localStorage
 * Also clears the newlyAddedCartItems from sessionStorage
 */
function clearGuestCart() {
    try {
        localStorage.removeItem('florencebot_guest_cart');
        sessionStorage.removeItem('newlyAddedCartItems');
        console.log('Legacy guest cart and newlyAddedCartItems cleared');
    } catch (e) {
        console.error('Failed to clear guest cart:', e);
    }
}

/**
 * Check if user is logged in
 */
function isUserLoggedIn() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        return !!accessToken;
    } catch (e) {
        return false;
    }
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text, buttonElement) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.classList.add('copied');
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.classList.remove('copied');
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.classList.add('copied');
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.classList.remove('copied');
        }, 2000);
    }
}

/**
 * Show pending state while waiting for webhook
 */
function showPendingState() {
    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="pending-icon">
            <i class="fas fa-sync-alt"></i>
        </div>
        <h1 class="success-title">Processing your payment...</h1>
        <p class="success-message">
            This usually takes just a moment. Please wait...
        </p>
        <div class="loading-state" style="padding: 20px 0;">
            <div class="spinner spinner-primary"></div>
        </div>
    `;
}

/**
 * Show timeout state when polling takes too long
 */
function showTimeoutState() {
    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="pending-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);">
            <i class="fas fa-clock" style="animation: none;"></i>
        </div>
        <h1 class="success-title">Taking longer than expected</h1>
        <p class="success-message">
            Your payment is being processed. Your order confirmation will be sent to your email shortly.
        </p>
        <div class="email-note">
            <i class="fas fa-envelope"></i>
            <p>Please check your email for your order number and access instructions. If you don't receive an email within a few minutes, please contact support.</p>
        </div>
        <div class="success-actions" style="margin-top: 24px;">
            <a href="https://discord.gg/y2Mh77wAV2" class="btn btn-primary btn-large">
                <i class="fab fa-discord"></i>
                Contact Support
            </a>
            <a href="index.html" class="btn btn-light">
                <i class="fas fa-home"></i>
                Back to Home
            </a>
        </div>
    `;
}

/**
 * Show success state
 */
function showSuccessState(order) {
    // Stop polling if active
    stopPolling();

    // Clear legacy cart data
    clearGuestCart();

    const container = document.getElementById('success-content');
    const isLoggedIn = isUserLoggedIn();
    const isGuest = !order.user_id;

    // Build items HTML
    let itemsHtml = '';
    let totalPrice = 0;
    if (order.items && order.items.length > 0) {
        itemsHtml = order.items.map(item => {
            totalPrice += item.price;
            return `
                <div class="order-item">
                    <span class="order-item-label">${escapeHtml(item.product_name)}</span>
                    <span class="order-item-value">$${parseFloat(item.price).toFixed(2)}</span>
                </div>
            `;
        }).join('');
    }

    // Check if there's a bundle discount
    const hasDiscount = order.discount_amount && parseFloat(order.discount_amount) > 0;
    const originalSubtotal = order.subtotal ? parseFloat(order.subtotal) : totalPrice;
    const discountAmount = hasDiscount ? parseFloat(order.discount_amount) : 0;

    // Build discount section HTML
    let discountHtml = '';
    if (hasDiscount) {
        discountHtml = `
            <div class="order-item" style="color: var(--text-secondary);">
                <span class="order-item-label">Original Price</span>
                <span class="order-item-value" style="text-decoration: line-through; color: var(--text-secondary);">$${originalSubtotal.toFixed(2)}</span>
            </div>
            <div class="order-item" style="color: #f59e0b;">
                <span class="order-item-label"><i class="fas fa-tag" style="margin-right: 6px;"></i>Bundle Discount</span>
                <span class="order-item-value" style="color: #f59e0b; font-weight: 600;">-$${discountAmount.toFixed(2)}</span>
            </div>
        `;
    }

    // Determine message based on item count and build item names
    const itemCount = order.items ? order.items.length : 1;
    let confirmationMessage = '';
    if (order.items && order.items.length > 0) {
        const itemNames = order.items.map(item => item.product_name);
        if (itemNames.length === 1) {
            confirmationMessage = `Thank you for subscribing! ${escapeHtml(itemNames[0])} is now available.`;
        } else if (itemNames.length === 2) {
            confirmationMessage = `Thank you for subscribing! ${escapeHtml(itemNames[0])} and ${escapeHtml(itemNames[1])} are now available.`;
        } else {
            // 3+ items - list first two and say "and X more"
            const moreCount = itemNames.length - 2;
            confirmationMessage = `Thank you for subscribing! ${escapeHtml(itemNames[0])}, ${escapeHtml(itemNames[1])}, and ${moreCount} more ${moreCount === 1 ? 'guide is' : 'guides are'} now available.`;
        }
    } else {
        confirmationMessage = 'Thank you for subscribing! Your study guide is now available.';
    }

    let actionsHtml = '';
    let guestWarningHtml = '';

    if (isGuest) {
        // Guest user - show prominent order number and account creation prompts
        const rawOrderNumber = order.order_number || '';
        const escapedOrderNumber = escapeHtml(rawOrderNumber);
        // Extract just the number part after "TNC-" for easier pasting into claim form
        const orderNumberForCopy = rawOrderNumber.startsWith('TNC-')
            ? rawOrderNumber.substring(4)
            : rawOrderNumber;
        guestWarningHtml = `
            <div class="guest-warning">
                <div class="guest-warning-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important: Save your order number</h4>
                </div>
                <p>To access your study guides, create an account or log in and enter this order number.</p>
                <div class="order-number-display">
                    <div class="order-number-label">Your Order Number</div>
                    <div class="order-number-value" id="order-number-value">${escapedOrderNumber}</div>
                </div>
                <button class="copy-btn" id="copy-order-btn">
                    <i class="fas fa-copy"></i>
                    Copy to Clipboard
                </button>
            </div>
        `;
        // Store order number without TNC- prefix for copy function (easier to paste into claim form)
        window._orderNumberToCopy = orderNumberForCopy;

        const orderParam = encodeURIComponent(order.order_number);
        actionsHtml = `
            <a href="login.html?tab=signup&order=${orderParam}" class="btn btn-primary btn-large">
                <i class="fas fa-user-plus"></i>
                Create Account
            </a>
            <a href="login.html?order=${orderParam}" class="btn btn-light">
                <i class="fas fa-sign-in-alt"></i>
                Already have an account? Log in
            </a>
        `;
    } else {
        // Logged-in user - show dashboard link
        actionsHtml = `
            <a href="dashboard.html" class="btn btn-primary btn-large">
                <i class="fas fa-book-open"></i>
                Go to My Dashboard
            </a>
            <a href="resources.html" class="btn btn-light">
                <i class="fas fa-book-open"></i>
                Browse Resources
            </a>
        `;
    }

    // Build savings message if discount applied
    let savingsMessageHtml = '';
    if (hasDiscount) {
        savingsMessageHtml = `
            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 16px; text-align: center;">
                <i class="fas fa-check-circle" style="color: #f59e0b; margin-right: 6px;"></i>
                <span style="color: #f59e0b; font-weight: 600;">You saved $${discountAmount.toFixed(2)} with our bundle deal!</span>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check"></i>
        </div>
        <h1 class="success-title">Payment Successful!</h1>
        <p class="success-message">
            ${confirmationMessage}
        </p>

        ${savingsMessageHtml}

        <div class="order-details">
            <h3>Order Details</h3>
            <div class="order-item">
                <span class="order-item-label">Order Number</span>
                <span class="order-item-value">${escapeHtml(order.order_number)}</span>
            </div>
            ${itemsHtml}
            ${discountHtml}
            <div class="order-item" style="border-top: 2px solid var(--border-color); padding-top: 12px; margin-top: 8px;">
                <span class="order-item-label" style="font-weight: 600;">Total Paid</span>
                <span class="order-item-value" style="font-size: 1.1rem;">$${parseFloat(order.total).toFixed(2)}</span>
            </div>
            ${order.customer_email ? `
            <div class="order-item">
                <span class="order-item-label">Email</span>
                <span class="order-item-value">${escapeHtml(order.customer_email)}</span>
            </div>
            ` : ''}
        </div>

        ${guestWarningHtml}

        <div class="success-actions">
            ${actionsHtml}
        </div>

        <div class="email-note">
            <i class="fas fa-envelope"></i>
            <p>A confirmation email has been sent to ${order.customer_email ? escapeHtml(order.customer_email) : 'your email address'} with your receipt and access instructions.</p>
        </div>
    `;

    // Attach event listener for copy button
    const copyBtn = container.querySelector('#copy-order-btn');
    if (copyBtn && window._orderNumberToCopy) {
        copyBtn.addEventListener('click', function() {
            copyToClipboard(window._orderNumberToCopy, this);
        });
    }
}

/**
 * Show error state
 */
function showErrorState(message) {
    // Stop polling if active
    stopPolling();

    const container = document.getElementById('success-content');

    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-circle"></i>
            <h1 class="success-title">Something Went Wrong</h1>
            <p class="success-message">${escapeHtml(message)}</p>
            <div class="success-actions">
                <a href="https://discord.gg/y2Mh77wAV2" class="btn btn-primary btn-large">
                    <i class="fab fa-discord"></i>
                    Contact Support
                </a>
                <a href="index.html" class="btn btn-light">
                    <i class="fas fa-home"></i>
                    Back to Home
                </a>
            </div>
        </div>
    `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initSuccessPage);

// Page loader
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
});
