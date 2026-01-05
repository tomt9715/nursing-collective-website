// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
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

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background blur effect when scrolling
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-secondary')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = stat.textContent;
            const isNumber = /^\d+$/.test(target.replace('+', ''));
            
            if (isNumber) {
                const targetNum = parseInt(target.replace('+', ''));
                let current = 0;
                const increment = targetNum / 50;
                
                const updateCount = () => {
                    if (current < targetNum) {
                        current += increment;
                        stat.textContent = Math.floor(current) + '+';
                        setTimeout(updateCount, 30);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCount();
            }
        });
    };

    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 1000); // Start after typing effect
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    if (heroSection) {
        statsObserver.observe(heroSection);
    }

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

    // Form handling (for future contact forms)
    const handleFormSubmission = (formId, successMessage) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add your form submission logic here
                console.log('Form submitted:', new FormData(form));
                
                // Show success message
                alert(successMessage || 'Thank you for your message!');
                form.reset();
            });
        }
    };

    // Initialize any forms
    handleFormSubmission('contact-form', 'Thank you for reaching out! We\'ll get back to you soon.');
});

// Add loading states for external links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href*="discord"]')) {
        const button = e.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Discord...';
        button.style.pointerEvents = 'none';
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.pointerEvents = 'auto';
        }, 3000);
    }
});

// Performance optimization: Lazy load images when added
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
lazyLoadImages();

// Add error handling for Discord invite links
const checkDiscordInvite = async (inviteCode) => {
    try {
        // This would typically check if the invite is valid
        console.log('Checking Discord invite:', inviteCode);
        return true;
    } catch (error) {
        console.error('Discord invite check failed:', error);
        return false;
    }
};

// Console message for developers
console.log(`
🏥 FlorenceBot Pro Website
Built with ❤️ for nursing students

If you're a developer interested in contributing to nursing education tools,
reach out to us at support@florencebot.pro

Tech Stack: Vanilla HTML/CSS/JS
Hosting: Cloudflare Pages
Domain: florencebot.pro
`);

export { lazyLoadImages, checkDiscordInvite };