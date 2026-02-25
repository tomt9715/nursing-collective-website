// Pricing Page JavaScript
// Subscription-based Access System with Standard / AI-Powered tier toggle

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================================
    // TIER TOGGLE (Standard vs AI-Powered)
    // ==========================================================================

    let currentTier = 'standard'; // Default tier
    const tierToggleBtns = document.querySelectorAll('.tier-toggle-btn');
    const tierDescription = document.getElementById('tier-toggle-description');
    const creditAddonSection = document.getElementById('credit-addon-section');
    const upgradeBanner = document.getElementById('upgrade-banner');

    // ==========================================================================
    // TOAST NOTIFICATION HELPER
    // ==========================================================================
    function showPricingToast(message, type = 'error') {
        let container = document.querySelector('.pricing-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'pricing-toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = `pricing-toast ${type}`;
        const icon = type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'pricingToastOut 0.3s ease forwards';
            toast.addEventListener('animationend', () => toast.remove());
        }, 4000);
    }

    const tierDescriptions = {
        'standard': 'Full access to 50+ study guides, clinical resources, and quick reference tools.',
        'ai-powered': 'Everything in Standard plus AI-powered study tools and personalized learning.'
    };

    const tierButtonLabels = {
        'standard': {
            'monthly': 'Get Started',
            'semester': 'Get Semester Access',
            'lifetime': 'Get Lifetime Access'
        },
        'ai-powered': {
            'monthly': 'Unlock AI Tools',
            'semester': 'Get AI Semester',
            'lifetime': 'Get AI Lifetime'
        }
    };

    tierToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedTier = this.getAttribute('data-tier');
            if (selectedTier === currentTier) return;

            currentTier = selectedTier;

            // Update toggle button active state
            tierToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update description text
            if (tierDescription) {
                tierDescription.textContent = tierDescriptions[selectedTier];
            }

            // Fire energy ripple when switching to AI
            if (selectedTier === 'ai-powered') {
                fireEnergyRipple(this);
            }

            // Update pricing cards
            updatePricingCards(selectedTier);

            // Show/hide credit add-on section
            if (creditAddonSection) {
                creditAddonSection.classList.toggle('hidden', selectedTier !== 'ai-powered');
            }
        });
    });

    function updatePricingCards(tier) {
        const isAI = tier === 'ai-powered';

        // Update prices
        document.querySelectorAll('.pricing-card-amount').forEach(el => {
            el.textContent = isAI ? el.dataset.aiPrice : el.dataset.standardPrice;
        });

        // Update interval text
        document.querySelectorAll('.pricing-card-interval').forEach(el => {
            el.innerHTML = isAI ? el.dataset.aiInterval : el.dataset.standardInterval;
        });

        // Toggle feature lists
        document.querySelectorAll('.standard-features').forEach(el => {
            el.style.display = isAI ? 'none' : 'block';
        });
        document.querySelectorAll('.ai-features').forEach(el => {
            el.style.display = isAI ? 'block' : 'none';
        });

        // Update button data-plan attributes and labels
        document.querySelectorAll('.btn-pricing[data-standard-plan]').forEach(btn => {
            const card = btn.closest('.pricing-card');
            const cardType = card ? card.dataset.card : '';
            btn.setAttribute('data-plan', isAI ? btn.dataset.aiPlan : btn.dataset.standardPlan);
            if (tierButtonLabels[tier] && tierButtonLabels[tier][cardType]) {
                btn.textContent = tierButtonLabels[tier][cardType];
            }
        });

        // Add/remove AI styling on cards (force re-trigger animation)
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.remove('ai-tier');
            if (isAI) {
                // Force reflow to re-trigger CSS animation
                void card.offsetWidth;
                card.classList.add('ai-tier');
            }
        });

        // Toggle AI items in "What's Included" section
        document.querySelectorAll('.ai-included-item').forEach(el => {
            el.style.display = isAI ? 'block' : 'none';
        });

        // Update "What's Included" title
        const whatsIncludedTitle = document.getElementById('whats-included-title');
        if (whatsIncludedTitle) {
            whatsIncludedTitle.textContent = isAI
                ? 'What You Get With AI-Powered Access'
                : 'What You Get With Full Access';
        }
    }

    // ==========================================================================
    // AI ENERGY RIPPLE EFFECT
    // ==========================================================================
    function fireEnergyRipple(toggleBtn) {
        const container = document.querySelector('.pricing-unified-container');
        if (!container) return;

        const ripple = document.createElement('div');
        ripple.className = 'ai-energy-ripple';

        // Position ripple at the toggle button center
        const btnRect = toggleBtn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        ripple.style.left = (btnRect.left + btnRect.width / 2 - containerRect.left) + 'px';
        ripple.style.top = (btnRect.top + btnRect.height / 2 - containerRect.top) + 'px';

        container.appendChild(ripple);

        // Remove after animation completes
        ripple.addEventListener('animationend', () => ripple.remove());
    }

    // ==========================================================================
    // UPGRADE BANNER (for existing Standard subscribers)
    // ==========================================================================

    // Track user's current subscription for upgrade detection
    let userSubscription = null;

    // Check if user has an active Standard subscription to show upgrade banner
    function checkUpgradeBanner() {
        if (!isAuthenticated || !isAuthenticated()) return;

        // Fetch subscription status to determine if user has Standard plan
        const apiUrl = (typeof apiService !== 'undefined' && apiService.baseUrl)
            ? apiService.baseUrl
            : (window.location.hostname === 'thenursingcollective.pro'
                ? 'https://api.thenursingcollective.pro'
                : 'https://staging-backend-production-365a.up.railway.app');

        const token = localStorage.getItem('access_token');
        if (!token) return;

        fetch(`${apiUrl}/api/subscription-status`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(r => r.json())
        .then(data => {
            if (data.has_access && data.subscription) {
                userSubscription = data.subscription;

                if (!data.subscription.is_ai_plan) {
                    // User has Standard plan — show upgrade banner
                    if (upgradeBanner) {
                        upgradeBanner.classList.remove('hidden');

                        // Update banner text with specific upgrade price
                        const bannerText = upgradeBanner.querySelector('.upgrade-banner-msg');
                        if (bannerText) {
                            const planId = data.subscription.plan_id;
                            let priceText = '+$10/month';
                            if (planId === 'semester-access') priceText = '+$30 one-time';
                            else if (planId === 'lifetime-access') priceText = '+$50 one-time';
                            bannerText.textContent = `Already a subscriber? Upgrade to AI-Powered for just ${priceText}!`;
                        }
                    }
                }
            }
        })
        .catch(() => {}); // Silently fail
    }

    checkUpgradeBanner();

    // Upgrade banner button switches to AI-Powered tier
    const upgradeBannerBtn = document.getElementById('upgrade-banner-btn');
    if (upgradeBannerBtn) {
        upgradeBannerBtn.addEventListener('click', function() {
            const aiToggle = document.querySelector('.tier-toggle-btn[data-tier="ai-powered"]');
            if (aiToggle) aiToggle.click();
            // Scroll to plans
            const plansSection = document.getElementById('plans');
            if (plansSection) {
                plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ==========================================================================
    // SUBSCRIPTION PLAN BUTTONS
    // ==========================================================================

    // Use event delegation for plan buttons (since data-plan changes dynamically)
    document.addEventListener('click', async function(e) {
        const button = e.target.closest('[data-plan]');
        if (!button || !button.classList.contains('btn-pricing')) return;

        const planId = button.getAttribute('data-plan');
        await handleSubscriptionClick(planId, button);
    });

    const ctaSubscribeBtn = document.getElementById('cta-subscribe-btn');
    if (ctaSubscribeBtn) {
        ctaSubscribeBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            const planId = currentTier === 'ai-powered' ? 'ai-monthly-access' : 'monthly-access';
            await handleSubscriptionClick(planId, this);
        });
    }

    async function handleSubscriptionClick(planId, button) {
        // Require authentication before checkout
        if (typeof isAuthenticated === 'function' && !isAuthenticated()) {
            showAuthModal(planId);
            return;
        }

        // Check if this is an upgrade scenario:
        // User has active Standard plan and is clicking an AI plan
        const isUpgrade = userSubscription
            && !userSubscription.is_ai_plan
            && planId.startsWith('ai-')
            && !planId.startsWith('ai-credits');

        // Get user email (pre-fills Stripe checkout)
        let email = '';
        const user = typeof getCurrentUser === 'function' ? getCurrentUser() : JSON.parse(localStorage.getItem('user') || '{}');
        email = user.email || user.user_email || '';

        // Show loading state on button
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (isUpgrade ? 'Processing upgrade...' : 'Redirecting to checkout...');
        button.disabled = true;

        try {
            if (isUpgrade) {
                // Use the upgrade endpoint for reduced pricing
                const data = await createUpgradeCheckout();

                if (data.upgraded) {
                    // Monthly upgrade completed instantly (no redirect)
                    showPricingToast('Upgrade complete! Your AI tools are now active.', 'success');
                    // Refresh page after a moment to update UI
                    setTimeout(() => window.location.reload(), 2000);
                    return;
                } else if (data.url) {
                    // Semester/Lifetime: redirect to Stripe checkout
                    window.location.href = data.url;
                } else {
                    throw new Error('Unexpected upgrade response');
                }
            } else {
                // Normal checkout flow
                const data = await createSubscriptionCheckout(planId, email);
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error('No checkout URL returned');
                }
            }
        } catch (error) {
            console.error('Checkout error:', error);
            showPricingToast(error.message || 'Unable to start checkout. Please try again.');
        } finally {
            // Always re-enable the button so it's never stuck disabled
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }

    // Legacy cleanup: remove any stale intendedPlan from before direct-checkout flow
    sessionStorage.removeItem('intendedPlan');

    // ==========================================================================
    // PRE-CHECKOUT AUTH MODAL
    // ==========================================================================

    function showAuthModal(planId) {
        // Remove existing modal if any
        const existing = document.getElementById('pricing-auth-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'pricing-auth-overlay';
        overlay.className = 'pricing-auth-overlay';

        const modal = document.createElement('div');
        modal.className = 'pricing-auth-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-label', 'Create an account');

        modal.innerHTML = `
            <button class="pricing-auth-close" aria-label="Close">&times;</button>
            <div class="pricing-auth-header">
                <div class="pricing-auth-icon">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <h2 class="pricing-auth-title">Create an account</h2>
                <p class="pricing-auth-subtitle">Sign up for free to access your study guides, track progress, and manage your subscription.</p>
            </div>
            <div class="pricing-auth-body">
                <button class="auth-btn google" data-modal-auth="google">
                    <svg class="auth-icon" width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    <span class="auth-btn-text">Continue with Google</span>
                </button>
                <button class="auth-btn discord" data-modal-auth="discord">
                    <i class="fab fa-discord auth-icon"></i>
                    <span class="auth-btn-text">Continue with Discord</span>
                </button>
                <div class="auth-divider"><span>or</span></div>
                <button class="auth-btn email" data-modal-auth="email">
                    <i class="fas fa-envelope auth-icon"></i>
                    <span class="auth-btn-text">Continue with Email</span>
                </button>
            </div>
            <div class="pricing-auth-footer">
                <p>Already have an account? <a href="#" data-modal-auth="signin">Sign in</a></p>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Force reflow then add active class for animation
        void overlay.offsetWidth;
        overlay.classList.add('active');

        // --- Event listeners (no inline onclick) ---

        // Close button
        modal.querySelector('.pricing-auth-close').addEventListener('click', closeAuthModal);

        // Overlay click (outside modal)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeAuthModal();
        });

        // Escape key
        function handleEscape(e) {
            if (e.key === 'Escape') closeAuthModal();
        }
        document.addEventListener('keydown', handleEscape);

        function closeAuthModal() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
            // Wait for fade-out animation
            setTimeout(() => overlay.remove(), 200);
        }

        // Google button
        modal.querySelector('[data-modal-auth="google"]').addEventListener('click', function() {
            startOAuthFromModal(planId, 'google', this);
        });

        // Discord button
        modal.querySelector('[data-modal-auth="discord"]').addEventListener('click', function() {
            startOAuthFromModal(planId, 'discord', this);
        });

        // Email button → redirect to login page
        modal.querySelector('[data-modal-auth="email"]').addEventListener('click', function() {
            sessionStorage.setItem('pendingCheckoutPlan', planId);
            window.location.href = 'login.html?redirect=pricing&signup=true';
        });

        // Sign in link
        modal.querySelector('[data-modal-auth="signin"]').addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.setItem('pendingCheckoutPlan', planId);
            window.location.href = 'login.html?redirect=pricing';
        });
    }

    async function startOAuthFromModal(planId, provider, button) {
        // Store pending plan and redirect target
        sessionStorage.setItem('pendingCheckoutPlan', planId);
        sessionStorage.setItem('authRedirect', 'pricing');

        // Show loading state
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin auth-icon"></i> <span class="auth-btn-text">Connecting...</span>';
        button.disabled = true;

        try {
            // Fetch OAuth URL from backend (same endpoint as auth-script.js)
            const response = await fetch(`${API_URL}/auth/oauth/${provider}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            });

            const data = await response.json();

            if (data.authorization_url) {
                window.location.href = data.authorization_url;
            } else {
                throw new Error('No authorization URL returned');
            }
        } catch (error) {
            console.error('OAuth error:', error);
            button.innerHTML = originalHTML;
            button.disabled = false;
            showPricingToast('Unable to connect. Please try again.');
        }
    }

    // ==========================================================================
    // AUTO-SELECT AI TIER FROM URL PARAM (e.g. ?tier=ai from dashboard)
    // ==========================================================================

    (function checkTierParam() {
        var params = new URLSearchParams(window.location.search);
        var tier = params.get('tier');
        if (tier === 'ai') {
            var aiToggle = document.querySelector('.tier-toggle-btn[data-tier="ai-powered"]');
            if (aiToggle && !aiToggle.classList.contains('active')) {
                aiToggle.click();
            }
            // Scroll down so the tier toggle + pricing cards are front and center
            setTimeout(function() {
                var toggle = document.querySelector('.tier-toggle-container');
                if (toggle) {
                    var headerOffset = 80; // account for fixed nav
                    var top = toggle.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }, 500);
        }
    })();

    // ==========================================================================
    // AUTO-SCROLL TO CREDIT ADD-ONS FROM URL PARAM (e.g. ?addon=credits)
    // ==========================================================================

    (function checkAddonParam() {
        var params = new URLSearchParams(window.location.search);
        if (params.get('addon') === 'credits') {
            // Activate AI tier (credit add-ons only show in AI tier)
            var aiToggle = document.querySelector('.tier-toggle-btn[data-tier="ai-powered"]');
            if (aiToggle && !aiToggle.classList.contains('active')) {
                aiToggle.click();
            }
            // Scroll to credit add-on section
            setTimeout(function() {
                var creditSection = document.getElementById('credit-addon-section');
                if (creditSection) {
                    var headerOffset = 80;
                    var top = creditSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }, 500);
        }
    })();

    // ==========================================================================
    // AUTO-CHECKOUT ON RETURN FROM AUTH
    // ==========================================================================

    (async function checkPendingCheckout() {
        const pendingPlan = sessionStorage.getItem('pendingCheckoutPlan');
        if (!pendingPlan) return;

        // Only proceed if user is now authenticated
        if (typeof isAuthenticated !== 'function' || !isAuthenticated()) return;

        // Clear immediately to prevent re-triggering
        sessionStorage.removeItem('pendingCheckoutPlan');

        // If AI plan, ensure AI toggle is active
        if (pendingPlan.startsWith('ai-')) {
            const aiToggle = document.querySelector('.tier-toggle-btn[data-tier="ai-powered"]');
            if (aiToggle && !aiToggle.classList.contains('active')) {
                aiToggle.click();
                // Small delay to let tier toggle update data-plan attributes
                await new Promise(r => setTimeout(r, 100));
            }
        }

        // Find matching button (may need updated data-plan from tier toggle)
        const matchingBtn = document.querySelector(`.btn-pricing[data-plan="${pendingPlan}"]`);

        // Auto-trigger checkout
        await handleSubscriptionClick(pendingPlan, matchingBtn || document.createElement('button'));
    })();

    // ==========================================================================
    // FREE GUIDE PDF DOWNLOAD
    // ==========================================================================

    const freeGuideButtons = document.querySelectorAll('[data-free-guide]');

    freeGuideButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const guideId = this.getAttribute('data-free-guide');
            const originalText = this.innerHTML;

            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
            this.disabled = true;

            try {
                const apiUrl = (typeof apiService !== 'undefined' && apiService.baseUrl)
                    ? apiService.baseUrl
                    : 'https://api.thenursingcollective.pro';

                const response = await fetch(`${apiUrl}/api/guides/free/${guideId}/pdf`, {
                    method: 'GET'
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Failed to generate PDF');
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `TNC-${guideId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);

            } catch (error) {
                console.error('Free guide PDF download error:', error);
                this.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
                showPricingToast('Unable to download PDF. Please try again or contact support.');
            }
        });
    });

    // ==========================================================================
    // FAQ ACCORDION
    // ==========================================================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const isActive = item.classList.contains('active');

                // Close all items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.display = 'none';
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                });

                // Open this item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.display = 'block';
                    const icon = question.querySelector('i');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // Set initial aria-expanded="false" on all FAQ buttons
    faqItems.forEach(item => {
        const q = item.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
    });

    // Open first FAQ by default
    if (faqItems.length > 0) {
        const firstQuestion = faqItems[0].querySelector('.faq-question');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        const firstIcon = faqItems[0].querySelector('.faq-question i');
        faqItems[0].classList.add('active');
        if (firstQuestion) firstQuestion.setAttribute('aria-expanded', 'true');
        if (firstAnswer) firstAnswer.style.display = 'block';
        if (firstIcon) firstIcon.style.transform = 'rotate(180deg)';
    }

    // ==========================================================================
    // ANIMATIONS
    // ==========================================================================

    // Only apply scroll-reveal if IntersectionObserver is supported and
    // the element is NOT already in view (prevents invisible-on-load bug).
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        const animateTargets = [
            ...document.querySelectorAll('.pricing-card'),
            ...document.querySelectorAll('.stat-item')
        ];

        animateTargets.forEach(el => {
            const rect = el.getBoundingClientRect();
            // If element is already visible in the viewport, don't hide it
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                return; // Already in view — skip animation setup
            }
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ==========================================================================
    // SMOOTH SCROLL
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        // Skip non-scroll anchors (logout, empty hash, etc.)
        if (!href || href === '#' || href === '#logout' || href.startsWith('#signup')) return;

        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // If no matching target, let the browser handle normally
        });
    });

    // ==========================================================================
    // INDIVIDUAL GUIDES FILTER (kept for backwards compatibility)
    // ==========================================================================

    const filterButtons = document.querySelectorAll('.guide-filter-btn');
    const guideItems = document.querySelectorAll('.guide-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => {
                btn.style.background = 'transparent';
                btn.style.color = 'var(--text-primary)';
                btn.style.borderColor = 'var(--border-color)';
                btn.classList.remove('active');
            });

            this.style.background = 'var(--primary-color)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--primary-color)';
            this.classList.add('active');

            guideItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
