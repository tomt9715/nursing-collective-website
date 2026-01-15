// Dashboard Page JavaScript
// User menu toggle and dashboard interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard script loaded');

    // User menu dropdown toggle
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuBtn && userDropdown) {
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

        // Close dropdown when clicking a link
        userDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Handle logout
                if (this.getAttribute('href') === '#logout') {
                    e.preventDefault();
                    if (confirm('Are you sure you want to logout?')) {
                        // In production, clear session/auth tokens
                        alert('Logout successful! Redirecting to home page...');
                        window.location.href = 'index.html';
                    }
                }
                userDropdown.classList.remove('active');
            });
        });
    }

    // Animate stats on load
    animateStats();

    // Add smooth scroll for guide cards
    const guideCards = document.querySelectorAll('.guide-item');
    guideCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Animate dashboard stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.user-stats .number');

    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue);

        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = Math.ceil(numericValue / 30);
            const duration = 1000; // 1 second
            const stepTime = duration / (numericValue / increment);

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(counter);
                }
                stat.textContent = currentValue + (isPercentage ? '%' : '');
            }, stepTime);
        }
    });
}
