// Pricing Page JavaScript
// Class-based Package System with Tier Toggle

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pricing script loaded');

    // Tier Toggle functionality
    const tierToggles = document.querySelectorAll('.tier-toggle');
    const tierDescription = document.getElementById('tier-description');
    let currentTier = 'full'; // Default to Full tier

    tierToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const selectedTier = this.getAttribute('data-tier');

            // Update active state on toggle buttons
            tierToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update current tier
            currentTier = selectedTier;

            // Switch tier description content
            if (tierDescription) {
                const fullContent = tierDescription.querySelector('.full-tier-content');
                const liteContent = tierDescription.querySelector('.lite-tier-content');

                if (selectedTier === 'full') {
                    fullContent.style.display = 'block';
                    liteContent.style.display = 'none';
                } else {
                    fullContent.style.display = 'none';
                    liteContent.style.display = 'block';
                }
            }

            // Update all price displays
            const fullPrices = document.querySelectorAll('.full-price');
            const litePrices = document.querySelectorAll('.lite-price');

            fullPrices.forEach(price => {
                price.style.display = selectedTier === 'full' ? 'block' : 'none';
            });

            litePrices.forEach(price => {
                price.style.display = selectedTier === 'lite' ? 'block' : 'none';
            });

            // Update button text
            const buttonTexts = document.querySelectorAll('.btn-text');
            buttonTexts.forEach(btnText => {
                if (selectedTier === 'full') {
                    btnText.textContent = 'Get Full Package';
                } else {
                    btnText.textContent = 'Get Lite Package';
                }
            });

            console.log('Switched to tier:', selectedTier);
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('FAQ clicked:', index);

                const isActive = item.classList.contains('active');

                // First, close all items (including this one)
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                    }
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Then, if this item wasn't active before, open it
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    const icon = question.querySelector('i');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }

                console.log('Item active:', item.classList.contains('active'));
            });
        }
    });

    // Optional: Open first FAQ by default
    if (faqItems.length > 0) {
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        const firstIcon = faqItems[0].querySelector('.faq-question i');
        faqItems[0].classList.add('active');
        if (firstAnswer) firstAnswer.style.display = 'block';
        if (firstIcon) firstIcon.style.transform = 'rotate(180deg)';
        console.log('First FAQ opened by default');
    }

    // Add ripple effect to pricing CTAs
    const ctaButtons = document.querySelectorAll('.pricing-cta');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation when pricing cards come into view
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

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(stat);
    });

    // Pricing CTA click handlers (placeholder - replace with actual payment integration)
    document.querySelectorAll('.pricing-cta.primary, .pricing-cta.secondary').forEach(button => {
        if (!button.hasAttribute('onclick')) {
            button.addEventListener('click', function() {
                const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;

                // For now, just show an alert
                // Replace this with your actual payment integration (Stripe, PayPal, etc.)
                if (planName.includes('Free')) {
                    window.location.href = 'https://discord.gg/y2Mh77wAV2';
                } else {
                    showAlert('Coming Soon', `Checkout for ${planName} plan will be available soon!\n\nThis will integrate with your payment provider (Stripe, PayPal, etc.)`, 'info');
                    // window.location.href = '/checkout?plan=' + encodeURIComponent(planName);
                }
            });
        }
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
