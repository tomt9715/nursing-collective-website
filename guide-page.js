// Guide Page JavaScript - Loads and renders markdown content

// Get guide ID from URL parameter
function getGuideId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Guide metadata with pricing
// All guides show 10% preview, full access costs $5.99 per guide
const guidesMetadata = {
    'electrolytes': {
        title: 'Electrolyte Management Guide',
        subtitle: 'Essential electrolyte ranges, nursing interventions, and clinical priorities for safe patient care',
        category: 'Lab Values',
        readTime: '8 min',
        difficulty: 'Intermediate',
        file: 'content/guides/electrolytes.md',
        price: 5.99
    },
    'vital-signs': {
        title: 'Vital Signs Assessment Guide',
        subtitle: 'Comprehensive reference for normal ranges, assessment techniques, and critical values across all age groups',
        category: 'Clinical Skills',
        readTime: '7 min',
        difficulty: 'Beginner',
        file: 'content/guides/vital-signs.md',
        price: 5.99
    },
    'critical-lab-values': {
        title: 'Critical Laboratory Values',
        subtitle: 'Life-threatening laboratory values requiring immediate provider notification and intervention',
        category: 'Lab Values',
        readTime: '6 min',
        difficulty: 'Intermediate',
        file: 'content/guides/critical-lab-values.md',
        price: 5.99
    },
    'isolation-precautions': {
        title: 'Isolation Precautions Guide',
        subtitle: 'PPE requirements, room placement, and infection control protocols for all isolation types',
        category: 'Safety',
        readTime: '9 min',
        difficulty: 'Intermediate',
        file: 'content/guides/isolation-precautions.md',
        price: 5.99
    },
    'medication-math': {
        title: 'Medication Dosage Calculations',
        subtitle: 'Essential drug calculation formulas with step-by-step examples and practice problems for safe medication administration',
        category: 'Medications',
        readTime: '12 min',
        difficulty: 'Advanced',
        file: 'content/guides/medication-math.md',
        price: 5.99
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

// Check if user has purchased this specific guide
function checkGuideAccess(guideId) {
    // Check if user has purchased this guide
    // TODO: This will need to check against backend when payment system is implemented
    const purchasedGuides = JSON.parse(localStorage.getItem('purchasedGuides') || '[]');
    return purchasedGuides.includes(guideId);
}

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
    document.title = `${metadata.title} - The Nursing Collective`;

    // Update header
    document.getElementById('guide-category').textContent = metadata.category;
    document.getElementById('guide-title').textContent = metadata.title;
    document.getElementById('guide-subtitle').textContent = metadata.subtitle;
    document.getElementById('guide-read-time').textContent = metadata.readTime;
    document.getElementById('guide-difficulty').textContent = metadata.difficulty;

    // Update breadcrumb
    document.getElementById('breadcrumb-current').textContent = metadata.title;

    // Check access and load appropriate content
    const hasAccess = checkGuideAccess(guideId);
    await loadGuideContent(metadata.file, hasAccess, guideId);

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
async function loadGuideContent(file, hasAccess, guideId) {
    const contentElement = document.getElementById('guide-content');

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Failed to load guide');

        const markdown = await response.text();

        let contentToRender = markdown;
        let previewBadge = '';

        // Show preview for users who haven't purchased
        if (!hasAccess) {
            contentToRender = extractFreePreview(markdown);

            // Add preview badge
            previewBadge = `
                <div class="alert alert-info d-flex align-items-center mb-4" style="background: linear-gradient(135deg, #e0f2fe, #dbeafe); border: none; border-radius: 12px;">
                    <i class="fas fa-eye me-3" style="font-size: 1.5rem; color: var(--primary-color);"></i>
                    <div>
                        <h5 class="mb-1" style="color: var(--primary-color); font-weight: 600;">Free Preview (10% of Content)</h5>
                        <p class="mb-0" style="font-size: 0.9rem;">You're viewing a preview. Purchase the full guide for $${guidesMetadata[guideId].price.toFixed(2)} to access all content, practice questions, and test-taking strategies.</p>
                    </div>
                </div>
            `;
        } else {
            // User has purchased - show full content badge
            previewBadge = `
                <div class="alert alert-success d-flex align-items-center mb-4" style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); border: none; border-radius: 12px;">
                    <i class="fas fa-check-circle me-3" style="font-size: 1.5rem; color: #059669;"></i>
                    <div>
                        <h5 class="mb-1" style="color: #059669; font-weight: 600;">Full Access - Purchased</h5>
                        <p class="mb-0" style="font-size: 0.9rem;">You own this guide! You're viewing the complete content with all practice questions and clinical pearls.</p>
                    </div>
                </div>
            `;
        }

        // Parse markdown - handle both marked() and marked.parse() API
        const html = typeof marked.parse === 'function'
            ? marked.parse(contentToRender)
            : marked(contentToRender);


        // Add purchase CTA at bottom only if user doesn't have access
        let purchaseCTA = '';
        if (!hasAccess) {
            const guideTitle = guidesMetadata[guideId].title;
            const guidePrice = guidesMetadata[guideId].price.toFixed(2);

            purchaseCTA = `
                <div class="premium-cta-section" style="margin-top: 60px; padding: 50px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 20px; color: white; text-align: center;">
                    <div class="mb-4">
                        <i class="fas fa-lock" style="font-size: 3rem; opacity: 0.9;"></i>
                    </div>
                    <h2 class="mb-3" style="font-weight: 700;">Unlock the Complete Guide</h2>
                    <p class="mb-4" style="font-size: 1.1rem; opacity: 0.95; max-width: 600px; margin: 0 auto;">
                        Get instant access to the full <strong>${guideTitle}</strong> with:
                    </p>
                    <div class="row g-3 mb-4" style="max-width: 700px; margin: 0 auto;">
                        <div class="col-md-6">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-check-circle me-2 mt-1"></i>
                                <span style="text-align: left;">Complete guide content (100%)</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-check-circle me-2 mt-1"></i>
                                <span style="text-align: left;">NCLEX-style practice questions</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-check-circle me-2 mt-1"></i>
                                <span style="text-align: left;">Detailed answer explanations</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-check-circle me-2 mt-1"></i>
                                <span style="text-align: left;">Test-taking strategies</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-check-circle me-2 mt-1"></i>
                                <span style="text-align: left;">Clinical pearls & mnemonics</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-check-circle me-2 mt-1"></i>
                                <span style="text-align: left;">Printable study cards (PDF)</span>
                            </div>
                        </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; max-width: 400px; margin: 0 auto 30px;">
                        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 8px;">$${guidePrice}</div>
                        <div style="font-size: 1rem; opacity: 0.9;">One-time payment • Lifetime access</div>
                    </div>
                    <button class="btn btn-light btn-lg px-5 mb-3" onclick="alert('Payment integration coming soon! Guide will cost $${guidePrice}')" style="border-radius: 12px; font-weight: 600; color: var(--primary-color); font-size: 1.1rem;">
                        <i class="fas fa-shopping-cart"></i> Purchase Full Guide - $${guidePrice}
                    </button>
                    <p class="mb-0" style="font-size: 0.9rem; opacity: 0.8;">
                        <i class="fas fa-shield-alt"></i> Secure payment • <i class="fas fa-download"></i> Instant access • <i class="fas fa-sync"></i> Free updates
                    </p>
                </div>
            `;
        }

        contentElement.innerHTML = previewBadge + html + purchaseCTA;

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

// Extract free preview (first ~10% of content)
function extractFreePreview(markdown) {
    // Split by main sections (##)
    const sections = markdown.split(/(?=^##\s)/m);

    // Take title + first section only (about 10% of content)
    const previewSections = sections.slice(0, 2).join('');

    // Remove any NCLEX-specific sections and advanced content
    let preview = previewSections
        .replace(/###?\s*NCLEX.*?(?=###|$)/gis, '')
        .replace(/###?\s*Test-Taking.*?(?=###|$)/gis, '')
        .replace(/###?\s*Clinical Pearls.*?(?=###|$)/gis, '')
        .replace(/###?\s*Practice Questions.*?(?=###|$)/gis, '');

    return preview;
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

// Configure marked.js - do this before DOMContentLoaded
if (typeof marked !== 'undefined') {
    if (typeof marked.setOptions === 'function') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
    } else if (typeof marked.use === 'function') {
        // Newer marked.js API
        marked.use({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
    }
}
