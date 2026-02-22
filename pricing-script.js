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

    const tierDescriptions = {
        'standard': 'Full access to 50+ study guides, clinical resources, and quick reference tools.',
        'ai-powered': 'Everything in Study Guides plus AI tools: upload your notes, get AI summaries, NCLEX questions, and gap analysis.'
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

        // Add/remove AI styling on cards
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.toggle('ai-tier', isAI);
        });
    }

    // ==========================================================================
    // UPGRADE BANNER (for existing Standard subscribers)
    // ==========================================================================

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
            if (data.has_access && data.subscription && !data.subscription.is_ai_plan) {
                // User has Standard plan — show upgrade banner
                if (upgradeBanner) {
                    upgradeBanner.classList.remove('hidden');
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
        // Check if user is logged in
        if (!isAuthenticated()) {
            sessionStorage.setItem('intendedPlan', planId);
            window.location.href = '/login.html?redirect=pricing';
            return;
        }

        // Get user email for Stripe checkout
        const user = typeof getCurrentUser === 'function' ? getCurrentUser() : JSON.parse(localStorage.getItem('user') || '{}');
        const email = user.email || user.user_email || '';

        if (!email) {
            alert('Unable to determine your email. Please log out and log back in.');
            return;
        }

        // Show loading state on button
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting to checkout...';
        button.disabled = true;

        try {
            const data = await createSubscriptionCheckout(planId, email);
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            button.innerHTML = originalText;
            button.disabled = false;
            alert('Unable to start checkout. Please try again.');
        }
    }

    // Check if user came back after login with an intended plan
    const intendedPlan = sessionStorage.getItem('intendedPlan');
    if (intendedPlan && isAuthenticated()) {
        sessionStorage.removeItem('intendedPlan');

        // If it's an AI plan, switch to AI-Powered tier first
        if (intendedPlan.startsWith('ai-')) {
            const aiToggle = document.querySelector('.tier-toggle-btn[data-tier="ai-powered"]');
            if (aiToggle) aiToggle.click();
        }

        // Find and click the button for the intended plan
        setTimeout(() => {
            const planButton = document.querySelector(`[data-plan="${intendedPlan}"]`);
            if (planButton) {
                planButton.click();
            }
        }, 500);
    }

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
                alert('Unable to download PDF. Please try again or contact support.');
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
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.display = 'none';
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                });

                // Open this item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    const icon = question.querySelector('i');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // Open first FAQ by default
    if (faqItems.length > 0) {
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        const firstIcon = faqItems[0].querySelector('.faq-question i');
        faqItems[0].classList.add('active');
        if (firstAnswer) firstAnswer.style.display = 'block';
        if (firstIcon) firstIcon.style.transform = 'rotate(180deg)';
    }

    // ==========================================================================
    // ANIMATIONS
    // ==========================================================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(stat);
    });

    // ==========================================================================
    // SMOOTH SCROLL
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
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
