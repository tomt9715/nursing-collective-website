// Guide Page JavaScript - Loads and renders markdown content

// Get guide ID from URL parameter
function getGuideId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Guide metadata
const guidesMetadata = {
    'electrolytes': {
        title: 'Electrolyte Management Guide',
        subtitle: 'Essential electrolyte ranges, nursing interventions, and clinical priorities for safe patient care',
        category: 'Lab Values',
        readTime: '8 min',
        difficulty: 'Intermediate',
        file: 'content/guides/electrolytes.md'
    },
    'vital-signs': {
        title: 'Vital Signs Assessment Guide',
        subtitle: 'Comprehensive reference for normal ranges, assessment techniques, and critical values across all age groups',
        category: 'Clinical Skills',
        readTime: '7 min',
        difficulty: 'Beginner',
        file: 'content/guides/vital-signs.md'
    },
    'critical-lab-values': {
        title: 'Critical Laboratory Values',
        subtitle: 'Life-threatening laboratory values requiring immediate provider notification and intervention',
        category: 'Lab Values',
        readTime: '6 min',
        difficulty: 'Intermediate',
        file: 'content/guides/critical-lab-values.md'
    },
    'isolation-precautions': {
        title: 'Isolation Precautions Guide',
        subtitle: 'PPE requirements, room placement, and infection control protocols for all isolation types',
        category: 'Safety',
        readTime: '9 min',
        difficulty: 'Intermediate',
        file: 'content/guides/isolation-precautions.md'
    },
    'medication-math': {
        title: 'Medication Dosage Calculations',
        subtitle: 'Essential drug calculation formulas with step-by-step examples and practice problems for safe medication administration',
        category: 'Medications',
        readTime: '12 min',
        difficulty: 'Advanced',
        file: 'content/guides/medication-math.md'
    }
};

// Related guides mapping
const relatedGuidesMap = {
    'electrolytes': ['critical-lab-values', 'vital-signs'],
    'vital-signs': ['electrolytes', 'critical-lab-values'],
    'critical-lab-values': ['electrolytes', 'isolation-precautions'],
    'isolation-precautions': ['vital-signs', 'medication-math'],
    'medication-math': ['critical-lab-values', 'vital-signs']
};

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    const guideId = getGuideId();

    if (!guideId || !guidesMetadata[guideId]) {
        // Redirect to guides page if invalid ID
        window.location.href = 'guides.html';
        return;
    }

    const metadata = guidesMetadata[guideId];

    // Update page title
    document.title = `${metadata.title} - FlorenceBot Pro`;

    // Update header
    document.getElementById('guide-category').textContent = metadata.category;
    document.getElementById('guide-title').textContent = metadata.title;
    document.getElementById('guide-subtitle').textContent = metadata.subtitle;
    document.getElementById('guide-read-time').textContent = metadata.readTime;
    document.getElementById('guide-difficulty').textContent = metadata.difficulty;

    // Update breadcrumb
    document.getElementById('breadcrumb-current').textContent = metadata.title;

    // Load and render markdown content
    await loadGuideContent(metadata.file);

    // Render related guides
    renderRelatedGuides(guideId);

    // Setup print button
    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });

    // Hide loader
    hideLoader();
});

// Load and render markdown content
async function loadGuideContent(file) {
    const contentElement = document.getElementById('guide-content');

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Failed to load guide');

        const markdown = await response.text();
        const html = marked.parse(markdown);

        contentElement.innerHTML = html;

        // Smooth scroll to anchor links
        contentElement.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    } catch (error) {
        console.error('Error loading guide:', error);
        contentElement.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f59e0b; margin-bottom: 20px;"></i>
                <h2 style="margin-bottom: 10px;">Failed to Load Guide</h2>
                <p style="color: var(--guide-text-light);">We couldn't load this study guide. Please try again later.</p>
                <a href="guides.html" class="btn btn-primary" style="margin-top: 20px; display: inline-block;">
                    <i class="fas fa-arrow-left"></i> Back to All Guides
                </a>
            </div>
        `;
    }
}

// Render related guides
function renderRelatedGuides(currentGuideId) {
    const relatedGuides = relatedGuidesMap[currentGuideId] || [];
    const container = document.getElementById('related-guides-grid');

    if (relatedGuides.length === 0) {
        document.getElementById('related-guides-section').style.display = 'none';
        return;
    }

    container.innerHTML = relatedGuides.map(guideId => {
        const metadata = guidesMetadata[guideId];
        return `
            <a href="guide.html?id=${guideId}" class="related-guide-card">
                <h4>${metadata.title}</h4>
                <p>${metadata.subtitle.substring(0, 80)}...</p>
            </a>
        `;
    }).join('');
}

// Hide page loader
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300);
    }
}

// Configure marked.js
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
    });
}
