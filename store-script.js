// Store Page JavaScript
// Sidebar Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-item');
    const guideCards = document.querySelectorAll('.guide-card');
    const categoryTitle = document.getElementById('category-title');
    const categoryDescription = document.getElementById('category-description');

    // Category metadata
    const categories = {
        'all': {
            title: 'All Study Guides',
            description: 'Browse our complete collection of nursing study guides'
        },
        'med-surg': {
            title: 'Medical-Surgical Nursing',
            description: 'Complex disease management and critical care guides'
        },
        'pharmacology': {
            title: 'Pharmacology',
            description: 'Drug classes, calculations, and medication safety guides'
        },
        'fundamentals': {
            title: 'Fundamentals of Nursing',
            description: 'Essential skills and foundation nursing concepts'
        },
        'maternity': {
            title: 'Maternal & OB Nursing',
            description: 'Pregnancy, labor, delivery, and postpartum care guides'
        },
        'pediatrics': {
            title: 'Pediatric Nursing',
            description: 'Child development, pediatric conditions, and family care guides'
        },
        'mental-health': {
            title: 'Mental Health Nursing',
            description: 'Psychiatric disorders, therapeutic techniques, and crisis intervention guides'
        }
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active state on filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update category header
            if (categories[filter]) {
                categoryTitle.textContent = categories[filter].title;
                categoryDescription.textContent = categories[filter].description;
            }

            // Filter guide cards with animation
            guideCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    // Show card with fade-in animation
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    // Trigger animation
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide card
                    card.style.display = 'none';
                }
            });

            // Scroll to top of guides grid smoothly
            const storeContent = document.querySelector('.store-content');
            if (storeContent && filter !== 'all') {
                storeContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
