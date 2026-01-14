// Force scroll to top on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Page loader
window.addEventListener('load', function() {
    const pageLoader = document.getElementById('page-loader');
    setTimeout(() => {
        pageLoader.classList.add('hidden');
    }, 300);
});

// Simple website functionality without auto-scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links (only when clicked)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking on links
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('mobile-open');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    }

    // Simple navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    const floatingCta = document.getElementById('floating-cta');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar shadow
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }

        // Floating CTA visibility - show after scrolling past hero
        if (scrollTop > 600) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('newsletter-email');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const email = emailInput.value;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';

            // ConvertKit via Cloudflare Worker
            const WORKER_URL = 'https://florencebot-newsletter.tomt9715.workers.dev';

            try {
                const response = await fetch(WORKER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email
                    })
                });

                if (response.ok) {
                    // Success message
                    const formGroup = newsletterForm.querySelector('.form-group');
                    formGroup.innerHTML = '<p style="color: var(--secondary-color); font-weight: 600; font-size: 1.1rem;"><i class="fas fa-check-circle"></i> Thanks for subscribing! Check your email for confirmation.</p>';
                } else {
                    throw new Error('Subscription failed');
                }
            } catch (error) {
                console.error('Newsletter error:', error);

                // Show error message
                const formGroup = newsletterForm.querySelector('.form-group');
                formGroup.innerHTML = '<p style="color: #ef4444; font-weight: 600; font-size: 1.1rem;"><i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.</p>';

                // Reset form after 3 seconds
                setTimeout(() => {
                    formGroup.innerHTML = `
                        <input type="email" placeholder="Enter your email address" required class="newsletter-input" id="newsletter-email" value="${email}">
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    `;
                }, 3000);
            }
        });
    }
});

console.log('🏥 FlorenceBot Pro Website - Ready!');