// Pricing Page JavaScript
// FAQ Accordion functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pricing script loaded');

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('FAQ clicked:', index);

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                console.log('Item active:', item.classList.contains('active'));
            });
        }
    });

    // Optional: Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
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
