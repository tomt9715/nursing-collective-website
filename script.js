// Force scroll to top on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Immediate scroll to top
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Page loader
window.addEventListener('load', function() {
    // Ensure we're at top when page loads
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const pageLoader = document.getElementById('page-loader');
    setTimeout(() => {
        pageLoader.classList.add('hidden');
        // Final scroll to top after loader hides
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 300);
});

// Simple website functionality without auto-scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Update nav based on auth state
    updateNavAuthState();

    // Smooth scrolling for navigation links (only when clicked)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just '#' or invalid
            if (!targetId || targetId === '#') {
                return;
            }

            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('mobile-open');
            navLinks.classList.toggle('mobile-open');

            // Update aria-expanded for accessibility
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);

            const icon = this.querySelector('i');
            if (!isOpen) {
                icon.className = 'fas fa-times';
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fas fa-bars';
                // Restore body scroll
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on links
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('mobile-open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                // Restore body scroll
                document.body.style.overflow = '';
            }
        });
    }

    // Simple navbar background change on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar shadow
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
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
                    formGroup.innerHTML = '<p style="color: var(--secondary-color); font-weight: 600; font-size: 1.1rem;"><i class="fas fa-check-circle"></i> Thanks for subscribing! You\'re all set.</p>';
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

    // User menu dropdown toggle
    // Note: dashboard.html and settings.html use their own scripts for this
    const hasOwnScript = window.location.pathname.includes('dashboard') || window.location.pathname.includes('settings');
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuBtn && userDropdown && !hasOwnScript) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });

        // Close dropdown when clicking a link inside it
        userDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                userDropdown.classList.remove('active');
            });
        });
    }
});

// ============================================
// PROFESSIONAL SAAS ENHANCEMENTS
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .command-card, .guide-card, .problem-side, .solution-side');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-element');
        animateOnScroll.observe(el);
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent.trim();
                // Only animate if it's purely numeric (no special characters)
                if (/^\d+$/.test(text)) {
                    const number = parseInt(text);
                    stat.textContent = '0';
                    animateCounter(stat, number);
                }
                // Otherwise leave as-is (preserves "24/7", "100%", "Instant", etc.)
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Update navigation based on authentication state
function updateNavAuthState() {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    const navLinks = document.querySelector('.nav-links');

    if (!navLinks) return;

    // Get nav elements
    const navDashboardLink = document.getElementById('nav-dashboard-link');
    const userMenu = document.getElementById('user-menu');
    const dropdownGuestContent = document.getElementById('dropdown-guest-content');
    const dropdownUserContent = document.getElementById('dropdown-user-content');

    if (isLoggedIn) {
        // Show dashboard link
        if (navDashboardLink) navDashboardLink.style.display = 'inline';

        // Switch dropdown to logged-in content
        if (dropdownGuestContent) dropdownGuestContent.style.display = 'none';
        if (dropdownUserContent) dropdownUserContent.style.display = 'block';

        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                // Build display name from first_name + last_name, or fall back to email prefix
                let userName = 'User';
                if (user.first_name || user.last_name) {
                    userName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
                } else if (user.name || user.displayName || user.full_name) {
                    userName = user.name || user.displayName || user.full_name;
                } else if (user.email) {
                    userName = user.email.split('@')[0];
                }
                const userEmail = user.email || user.user_email || '';

                const dropdownUserName = document.getElementById('dropdown-user-name');
                const dropdownUserEmail = document.getElementById('dropdown-user-email');

                if (dropdownUserName) dropdownUserName.textContent = userName;
                if (dropdownUserEmail) dropdownUserEmail.textContent = userEmail;

                // Update user avatar with initial (same as dashboard)
                const userAvatar = document.querySelector('.user-avatar');
                const initial = user.first_name ? user.first_name.charAt(0).toUpperCase() :
                               (userName ? userName.charAt(0).toUpperCase() : 'U');
                if (userAvatar) {
                    userAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${initial}</span>`;
                }

                // Update user avatar large in dropdown
                const userAvatarLarge = document.querySelector('.user-avatar-large');
                if (userAvatarLarge) {
                    userAvatarLarge.innerHTML = `<span style="font-weight: 600; font-size: 24px;">${initial}</span>`;
                }
            } catch (e) {
                console.error('Error parsing user data:', e);
            }
        }

        // Setup logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn && !logoutBtn.hasAttribute('data-logout-attached')) {
            logoutBtn.setAttribute('data-logout-attached', 'true');
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Use centralized logout function from api-service.js
                if (typeof performLogout === 'function') {
                    performLogout();
                } else {
                    // Fallback if api-service.js not loaded
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    window.location.href = 'login.html';
                }
            });
        }
    } else {
        // Ensure dashboard link hidden, show guest content in dropdown
        if (navDashboardLink) navDashboardLink.style.display = 'none';
        if (dropdownGuestContent) dropdownGuestContent.style.display = 'block';
        if (dropdownUserContent) dropdownUserContent.style.display = 'none';
    }

    // Fallback for pages without the new nav structure - just change Login to Dashboard
    const loginLink = navLinks.querySelector('a[href="login.html"]:not(#nav-login-link)');
    if (loginLink && isLoggedIn) {
        loginLink.href = 'dashboard.html';
        loginLink.textContent = 'Dashboard';
    }
}

