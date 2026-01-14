// Guides data with metadata
const guidesData = [
    {
        id: 'electrolytes',
        title: 'Electrolyte Cheat Sheet',
        description: 'Essential electrolyte ranges, nursing interventions, and clinical priorities. Includes sodium, potassium, calcium, magnesium, and phosphorus management.',
        category: 'lab-values',
        icon: '⚡',
        file: 'content/guides/electrolytes.md',
        topics: ['Sodium', 'Potassium', 'Calcium', 'Magnesium', 'Phosphorus'],
        readTime: '8 min',
        difficulty: 'Intermediate'
    },
    {
        id: 'vital-signs',
        title: 'Vital Signs Quick Reference',
        description: 'Normal ranges, assessment techniques, and critical values for all age groups. Covers heart rate, blood pressure, respiratory rate, temperature, and oxygen saturation.',
        category: 'clinical-skills',
        icon: '💓',
        file: 'content/guides/vital-signs.md',
        topics: ['Heart Rate', 'Blood Pressure', 'Respiratory Rate', 'Temperature', 'SpO₂'],
        readTime: '7 min',
        difficulty: 'Beginner'
    },
    {
        id: 'critical-lab-values',
        title: 'Critical Lab Values',
        description: 'Life-threatening lab values that require immediate notification and intervention. Essential reference for clinical practice and NCLEX preparation.',
        category: 'lab-values',
        icon: '🧪',
        file: 'content/guides/critical-lab-values.md',
        topics: ['Critical Values', 'Lab Ranges', 'Emergency Response'],
        readTime: '6 min',
        difficulty: 'Intermediate'
    },
    {
        id: 'isolation-precautions',
        title: 'Isolation Precautions Guide',
        description: 'Comprehensive guide to standard, contact, droplet, and airborne precautions. Includes PPE requirements and infection control protocols.',
        category: 'safety',
        icon: '🛡️',
        file: 'content/guides/isolation-precautions.md',
        topics: ['Standard Precautions', 'Contact', 'Droplet', 'Airborne', 'PPE'],
        readTime: '9 min',
        difficulty: 'Intermediate'
    },
    {
        id: 'medication-math',
        title: 'Medication Math Made Simple',
        description: 'Essential drug calculations with step-by-step examples and practice problems. Covers dosage calculations, IV rates, and weight-based dosing.',
        category: 'medications',
        icon: '🧮',
        file: 'content/guides/medication-math.md',
        topics: ['Dosage Calculations', 'IV Flow Rates', 'Weight-Based Dosing', 'Conversions'],
        readTime: '12 min',
        difficulty: 'Advanced'
    }
];

// State management
let currentFilter = 'all';
let searchQuery = '';
let currentGuideContent = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderGuides();
    setupEventListeners();
    hideLoader();
});

// Setup all event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('guide-search');
    const clearSearchBtn = document.getElementById('clear-search');

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
        filterAndRenderGuides();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        filterAndRenderGuides();
    });

    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.category;
            filterAndRenderGuides();
        });
    });

    // Modal controls
    const modal = document.getElementById('guide-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Filter and render guides based on search and category
function filterAndRenderGuides() {
    const filtered = guidesData.filter(guide => {
        // Category filter
        const categoryMatch = currentFilter === 'all' || guide.category === currentFilter;

        // Search filter
        const searchMatch = !searchQuery ||
            guide.title.toLowerCase().includes(searchQuery) ||
            guide.description.toLowerCase().includes(searchQuery) ||
            guide.topics.some(topic => topic.toLowerCase().includes(searchQuery));

        return categoryMatch && searchMatch;
    });

    renderGuides(filtered);
}

// Render guide cards
function renderGuides(guides = guidesData) {
    const guidesGrid = document.getElementById('guides-grid');
    const noResults = document.getElementById('no-results');
    const showingCount = document.getElementById('showing-count');

    // Update count
    showingCount.textContent = `Showing ${guides.length} of ${guidesData.length}`;

    if (guides.length === 0) {
        guidesGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    guidesGrid.style.display = 'grid';
    noResults.style.display = 'none';

    guidesGrid.innerHTML = guides.map(guide => `
        <div class="guide-card category-${guide.category}" data-guide-id="${guide.id}">
            <div class="guide-card-header">
                <div class="guide-icon">${guide.icon}</div>
                <span class="guide-category">${formatCategory(guide.category)}</span>
            </div>
            <div class="guide-card-body">
                <h3>${guide.title}</h3>
                <p class="guide-description">${guide.description}</p>
                <div class="guide-topics">
                    ${guide.topics.slice(0, 3).map(topic => `
                        <span class="topic-tag">${topic}</span>
                    `).join('')}
                    ${guide.topics.length > 3 ? `<span class="topic-tag">+${guide.topics.length - 3} more</span>` : ''}
                </div>
            </div>
            <div class="guide-card-footer">
                <div class="guide-meta">
                    <span><i class="fas fa-clock"></i> ${guide.readTime}</span>
                    <span><i class="fas fa-signal"></i> ${guide.difficulty}</span>
                </div>
                <span class="read-guide">
                    Read Guide <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    `).join('');

    // Add click listeners to cards
    document.querySelectorAll('.guide-card').forEach(card => {
        card.addEventListener('click', () => {
            const guideId = card.dataset.guideId;
            openGuide(guideId);
        });
    });
}

// Format category name for display
function formatCategory(category) {
    return category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Open guide in modal
async function openGuide(guideId) {
    const guide = guidesData.find(g => g.id === guideId);
    if (!guide) return;

    const modal = document.getElementById('guide-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalBody = document.getElementById('modal-body');

    // Update modal header
    modalTitle.textContent = guide.title;
    modalCategory.textContent = formatCategory(guide.category);
    modalCategory.className = `modal-category category-${guide.category} guide-category`;

    // Show loading state
    modalBody.innerHTML = '<div style="text-align: center; padding: 40px;"><div class="loader-spinner"></div><p style="margin-top: 20px; color: var(--text-secondary);">Loading guide...</p></div>';

    // Open modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Fetch and render markdown content
    try {
        const response = await fetch(guide.file);
        if (!response.ok) throw new Error('Failed to load guide');

        const markdown = await response.text();
        const html = marked.parse(markdown);

        // Render the content
        modalBody.innerHTML = html;
        modalBody.scrollTop = 0;
    } catch (error) {
        console.error('Error loading guide:', error);
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-primary); margin-bottom: 10px;">Failed to Load Guide</h3>
                <p style="color: var(--text-secondary);">We couldn't load this guide. Please try again later.</p>
            </div>
        `;
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('guide-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Hide page loader
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
}

// Configure marked.js options
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
    });
}

// Add keyboard shortcut hint
console.log('%c💡 Keyboard Shortcuts', 'font-size: 14px; font-weight: bold; color: #2563eb;');
console.log('%c/ - Focus search', 'font-size: 12px; color: #6b7280;');
console.log('%cEsc - Close modal', 'font-size: 12px; color: #6b7280;');
