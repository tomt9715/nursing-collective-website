// Guide Page JavaScript - Loads and renders content with access control
// Uses backend API for access verification

// HTML guides that should redirect to /guides/{id}.html
const htmlGuides = ['heart-failure', 'assessment-skills', 'myocardial-infarction', 'copd', 'stroke', 'gi-bleeding', 'fractures', 'hip-knee-replacement', 'arrhythmias', 'hypertension', 'coronary-artery-disease', 'peripheral-vascular-disease', 'asthma', 'pneumonia', 'oxygen-therapy', 'tuberculosis', 'chest-tubes'];

// Check if this guide has an HTML version and redirect immediately
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guideId = urlParams.get('id');
    if (guideId && htmlGuides.includes(guideId)) {
        window.location.replace(`guides/${guideId}.html`);
    }
})();

// Store current PDF URL for printing
let currentPdfUrl = null;

// Get guide ID from URL parameter
function getGuideId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Guide metadata for free preview markdown guides (legacy)
// New premium PDF guides use API product catalog
const legacyGuidesMetadata = {
    'electrolytes': {
        title: 'Electrolyte Management Guide',
        subtitle: 'Essential electrolyte ranges, nursing interventions, and clinical priorities for safe patient care',
        category: 'Lab Values',
        readTime: '8 min',
        difficulty: 'Intermediate',
        file: 'content/guides/electrolytes.md',
        price: 5.99,
        isFree: true
    },
    'vital-signs': {
        title: 'Vital Signs Assessment Guide',
        subtitle: 'Comprehensive reference for normal ranges, assessment techniques, and critical values across all age groups',
        category: 'Clinical Skills',
        readTime: '7 min',
        difficulty: 'Beginner',
        file: 'content/guides/vital-signs.md',
        price: 5.99,
        isFree: true
    },
    'critical-lab-values': {
        title: 'Critical Laboratory Values',
        subtitle: 'Life-threatening laboratory values requiring immediate provider notification and intervention',
        category: 'Lab Values',
        readTime: '6 min',
        difficulty: 'Intermediate',
        file: 'content/guides/critical-lab-values.md',
        price: 5.99,
        isFree: true
    },
    'isolation-precautions': {
        title: 'Isolation Precautions Guide',
        subtitle: 'PPE requirements, room placement, and infection control protocols for all isolation types',
        category: 'Safety',
        readTime: '9 min',
        difficulty: 'Intermediate',
        file: 'content/guides/isolation-precautions.md',
        price: 5.99,
        isFree: true
    },
    'medication-math': {
        title: 'Medication Dosage Calculations',
        subtitle: 'Essential drug calculation formulas with step-by-step examples and practice problems for safe medication administration',
        category: 'Medications',
        readTime: '12 min',
        difficulty: 'Advanced',
        file: 'content/guides/medication-math.md',
        price: 5.99,
        isFree: true
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

// Category display names
const categoryDisplayNames = {
    'med-surg': 'Medical-Surgical',
    'medsurg': 'Medical-Surgical',
    'pharmacology': 'Pharmacology',
    'fundamentals': 'Fundamentals',
    'maternal': 'Maternal/OB',
    'maternity': 'Maternal/OB',
    'pediatrics': 'Pediatrics',
    'mental-health': 'Mental Health',
    'lab-values': 'Lab Values',
    'clinical-skills': 'Clinical Skills',
    'safety': 'Safety',
    'medications': 'Medications'
};

// Complete product catalog with categories
const productCatalog = {
    // Cardiovascular
    'heart-failure': { name: 'Heart Failure Guide', category: 'med-surg', price: 5.99 },
    'myocardial-infarction': { name: 'Myocardial Infarction Guide', category: 'med-surg', price: 5.99 },
    'arrhythmias': { name: 'Arrhythmias Guide', category: 'med-surg', price: 5.99 },
    'hypertension': { name: 'Hypertension Guide', category: 'med-surg', price: 5.99 },
    'coronary-artery-disease': { name: 'Coronary Artery Disease Guide', category: 'med-surg', price: 5.99 },
    'peripheral-vascular-disease': { name: 'Peripheral Vascular Disease Guide', category: 'med-surg', price: 5.99 },
    // Respiratory
    'copd': { name: 'COPD Guide', category: 'med-surg', price: 5.99 },
    'asthma': { name: 'Asthma Guide', category: 'med-surg', price: 5.99 },
    'pneumonia': { name: 'Pneumonia Guide', category: 'med-surg', price: 5.99 },
    'oxygen-therapy': { name: 'Oxygen Therapy Guide', category: 'clinical-skills', price: 5.99 },
    'tuberculosis': { name: 'Tuberculosis Guide', category: 'med-surg', price: 5.99 },
    'chest-tubes': { name: 'Chest Tubes Guide', category: 'clinical-skills', price: 5.99 },
    // Endocrine
    'diabetes-type1': { name: 'Diabetes Type 1 Guide', category: 'med-surg', price: 5.99 },
    'diabetes-type2': { name: 'Diabetes Type 2 Guide', category: 'med-surg', price: 5.99 },
    'thyroid-disorders': { name: 'Thyroid Disorders Guide', category: 'med-surg', price: 5.99 },
    'adrenal-disorders': { name: 'Adrenal Disorders Guide', category: 'med-surg', price: 5.99 },
    'pituitary-disorders': { name: 'Pituitary Disorders Guide', category: 'med-surg', price: 5.99 },
    // Neurological
    'stroke': { name: 'Stroke Guide', category: 'med-surg', price: 5.99 },
    'seizures': { name: 'Seizures Guide', category: 'med-surg', price: 5.99 },
    'spinal-cord-injury': { name: 'Spinal Cord Injury Guide', category: 'med-surg', price: 5.99 },
    'traumatic-brain-injury': { name: 'Traumatic Brain Injury Guide', category: 'med-surg', price: 5.99 },
    'meningitis': { name: 'Meningitis Guide', category: 'med-surg', price: 5.99 },
    'parkinsons-ms': { name: 'Parkinson\'s & MS Guide', category: 'med-surg', price: 5.99 },
    // Renal
    'acute-kidney-injury': { name: 'Acute Kidney Injury Guide', category: 'med-surg', price: 5.99 },
    'chronic-kidney-disease': { name: 'Chronic Kidney Disease Guide', category: 'med-surg', price: 5.99 },
    'dialysis': { name: 'Dialysis Guide', category: 'med-surg', price: 5.99 },
    'urinary-tract-infections': { name: 'UTI Guide', category: 'med-surg', price: 5.99 },
    'kidney-stones': { name: 'Kidney Stones Guide', category: 'med-surg', price: 5.99 },
    'fluid-electrolytes': { name: 'Fluid & Electrolytes Guide', category: 'lab-values', price: 5.99 },
    // GI
    'gi-bleeding': { name: 'GI Bleeding Guide', category: 'med-surg', price: 5.99 },
    'bowel-obstruction': { name: 'Bowel Obstruction Guide', category: 'med-surg', price: 5.99 },
    'liver-disease': { name: 'Liver Disease Guide', category: 'med-surg', price: 5.99 },
    'pancreatitis': { name: 'Pancreatitis Guide', category: 'med-surg', price: 5.99 },
    'inflammatory-bowel-disease': { name: 'IBD Guide', category: 'med-surg', price: 5.99 },
    'gerd-peptic-ulcer': { name: 'GERD & Peptic Ulcer Guide', category: 'med-surg', price: 5.99 },
    // Musculoskeletal
    'fractures': { name: 'Fractures Guide', category: 'med-surg', price: 5.99 },
    'arthritis': { name: 'Arthritis Guide', category: 'med-surg', price: 5.99 },
    'hip-knee-replacement': { name: 'Hip & Knee Replacement Guide', category: 'med-surg', price: 5.99 },
    'osteoporosis': { name: 'Osteoporosis Guide', category: 'med-surg', price: 5.99 },
    'amputation-care': { name: 'Amputation Care Guide', category: 'med-surg', price: 5.99 },
    // Mental Health (only items in store)
    'eating-disorders': { name: 'Eating Disorders Guide', category: 'mental-health', price: 5.99 },
    'depression-anxiety': { name: 'Depression & Anxiety Guide', category: 'mental-health', price: 5.99 },
    'crisis-intervention': { name: 'Crisis Intervention Guide', category: 'mental-health', price: 5.99 },
    'therapeutic-communication': { name: 'Therapeutic Communication Guide', category: 'mental-health', price: 5.99 },
    'substance-abuse': { name: 'Substance Abuse Guide', category: 'mental-health', price: 5.99 },
    // Pharmacology
    'cardiac-medications': { name: 'Cardiac Medications Guide', category: 'pharmacology', price: 5.99 },
    'antibiotics-antivirals': { name: 'Antibiotics & Antivirals Guide', category: 'pharmacology', price: 5.99 },
    'pain-management': { name: 'Pain Management Guide', category: 'pharmacology', price: 5.99 },
    'iv-medications': { name: 'IV Medications Guide', category: 'pharmacology', price: 5.99 },
    'psychotropic-medications': { name: 'Psychotropic Medications Guide', category: 'pharmacology', price: 5.99 },
    'emergency-medications': { name: 'Emergency Medications Guide', category: 'pharmacology', price: 5.99 },
    // Fundamentals
    'assessment-skills': { name: 'Assessment Skills Guide', category: 'fundamentals', price: 5.99 },
    'infection-control': { name: 'Infection Control Guide', category: 'fundamentals', price: 5.99 },
    'documentation-charting': { name: 'Documentation & Charting Guide', category: 'fundamentals', price: 5.99 },
    'patient-safety': { name: 'Patient Safety Guide', category: 'fundamentals', price: 5.99 },
    'mobility-transfers': { name: 'Mobility & Transfers Guide', category: 'fundamentals', price: 5.99 },
    // Maternity
    'labor-delivery': { name: 'Labor & Delivery Guide', category: 'maternity', price: 5.99 },
    'postpartum-care': { name: 'Postpartum Care Guide', category: 'maternity', price: 5.99 },
    'high-risk-pregnancy': { name: 'High-Risk Pregnancy Guide', category: 'maternity', price: 5.99 },
    'antepartum-care': { name: 'Antepartum Care Guide', category: 'maternity', price: 5.99 },
    // Pediatrics
    'growth-development': { name: 'Growth & Development Guide', category: 'pediatrics', price: 5.99 },
    'pediatric-emergencies': { name: 'Pediatric Emergencies Guide', category: 'pediatrics', price: 5.99 },
    'infant-care': { name: 'Infant Care Guide', category: 'pediatrics', price: 5.99 },
    'adolescent-health': { name: 'Adolescent Health Guide', category: 'pediatrics', price: 5.99 },
    // Legacy free guides
    'electrolytes': { name: 'Electrolyte Management Guide', category: 'lab-values', price: 5.99 },
    'vital-signs': { name: 'Vital Signs Assessment Guide', category: 'clinical-skills', price: 5.99 },
    'critical-lab-values': { name: 'Critical Laboratory Values', category: 'lab-values', price: 5.99 },
    'isolation-precautions': { name: 'Isolation Precautions Guide', category: 'safety', price: 5.99 },
    'medication-math': { name: 'Medication Dosage Calculations', category: 'medications', price: 5.99 }
};

// Check guide access via API
async function checkGuideAccessAPI(guideId) {
    try {
        // Use apiCall if available, otherwise make direct fetch
        if (typeof apiCall === 'function') {
            const response = await apiCall(`/api/guides/${guideId}/access`);
            return response;
        } else {
            const token = localStorage.getItem('accessToken');
            const headers = {
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}/api/guides/${guideId}/access`, {
                headers
            });
            return await response.json();
        }
    } catch (error) {
        console.error('Error checking guide access:', error);
        return { success: false, error: 'network_error' };
    }
}

// Get guide content via API
async function getGuideContentAPI(guideId) {
    try {
        if (typeof apiCall === 'function') {
            return await apiCall(`/api/guides/${guideId}/content`);
        } else {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${API_URL}/api/guides/${guideId}/content`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        }
    } catch (error) {
        console.error('Error getting guide content:', error);
        return { success: false, error: 'network_error' };
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    const guideId = getGuideId();

    if (!guideId) {
        window.location.href = 'guides.html';
        return;
    }

    // Check if this is a legacy free guide
    const legacyMetadata = legacyGuidesMetadata[guideId];
    if (legacyMetadata && legacyMetadata.isFree) {
        await loadLegacyGuide(guideId, legacyMetadata);
        return;
    }

    // For premium guides, check access via API
    await loadPremiumGuide(guideId);
});

// Load legacy free markdown guide
async function loadLegacyGuide(guideId, metadata) {
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

    // Load full content (free guides show everything)
    await loadMarkdownContent(metadata.file, true, guideId);

    // Render related guides
    renderRelatedGuides(guideId);

    // Setup print button
    document.getElementById('btn-print').addEventListener('click', () => {
        if (currentPdfUrl) {
            // Open PDF in new tab for printing
            window.open(currentPdfUrl, '_blank');
        } else {
            window.print();
        }
    });

    // Hide loader
    hideLoader();
}

// Load premium guide with access control
async function loadPremiumGuide(guideId) {
    const contentElement = document.getElementById('guide-content');

    // If guide isn't in our product catalog and isn't a legacy guide, show not found immediately
    if (!productCatalog[guideId]) {
        showGuideNotFound();
        hideLoader();
        return;
    }

    // Show loading state
    contentElement.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div class="loader-spinner"></div>
            <p style="margin-top: 20px; color: var(--guide-text-light);">Checking access...</p>
        </div>
    `;

    // Check access via API
    const accessResponse = await checkGuideAccessAPI(guideId);

    if (!accessResponse.success && accessResponse.error === 'unauthorized') {
        // Not logged in - show login prompt
        showLoginPrompt(guideId, accessResponse);
        hideLoader();
        return;
    }

    if (!accessResponse.success && accessResponse.error === 'not_found') {
        // Guide not found
        showGuideNotFound();
        hideLoader();
        return;
    }

    // Update page metadata — use catalog name as primary, API name as fallback
    const catalogProduct = productCatalog[guideId];
    const productName = accessResponse.product_name || (catalogProduct ? catalogProduct.name : 'Study Guide');
    const category = categoryDisplayNames[accessResponse.category] || accessResponse.category || 'Study Guide';

    document.title = `${productName} - The Nursing Collective`;
    document.getElementById('guide-category').textContent = category;
    document.getElementById('guide-title').textContent = productName;
    document.getElementById('guide-subtitle').textContent = accessResponse.description || 'Comprehensive nursing study guide';
    document.getElementById('guide-read-time').textContent = '15-20 min';
    document.getElementById('guide-difficulty').textContent = 'Intermediate';
    document.getElementById('breadcrumb-current').textContent = productName;

    if (accessResponse.has_access) {
        // User has access - load content
        await loadSubscriberContent(guideId, accessResponse);
    } else {
        // User doesn't have access - show subscribe prompt
        showSubscribePrompt(guideId, accessResponse);
    }

    // Render related guides from same category
    renderRelatedGuides(guideId, accessResponse.category);

    // Setup print button
    document.getElementById('btn-print').addEventListener('click', () => {
        if (currentPdfUrl) {
            // Open PDF in new tab for printing
            window.open(currentPdfUrl, '_blank');
        } else {
            window.print();
        }
    });

    hideLoader();
}

// Show login prompt for unauthorized users
function showLoginPrompt(guideId, accessResponse) {
    const contentElement = document.getElementById('guide-content');
    const catalogProduct = productCatalog[guideId];
    const productName = accessResponse.product_name || (catalogProduct ? catalogProduct.name : 'Study Guide');
    const loginUrl = accessResponse.login_url || `login.html?redirect=/guide.html?id=${guideId}`;

    // Update header with product info
    document.getElementById('guide-title').textContent = productName;
    document.getElementById('guide-subtitle').textContent = 'Login required to access this content';
    document.getElementById('breadcrumb-current').textContent = productName;

    contentElement.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; max-width: 500px; margin: 0 auto;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                <i class="fas fa-lock" style="font-size: 2rem; color: #d97706;"></i>
            </div>
            <h2 style="margin-bottom: 16px; color: var(--text-primary);">Login Required</h2>
            <p style="color: var(--text-secondary); margin-bottom: 32px; font-size: 1.1rem;">
                Please log in to access this study guide.
            </p>
            <a href="${loginUrl}" class="btn btn-primary btn-lg" style="padding: 16px 48px; font-size: 1.1rem; border-radius: 12px;">
                <i class="fas fa-sign-in-alt me-2"></i>Log In to Continue
            </a>
            <p style="margin-top: 24px; color: var(--text-secondary);">
                Don't have an account? <a href="signup.html?redirect=/guide.html?id=${guideId}" style="color: var(--primary-color); font-weight: 600;">Sign Up</a>
            </p>
        </div>
    `;
}

// Show subscribe prompt for users without access
function showSubscribePrompt(guideId, accessResponse) {
    const contentElement = document.getElementById('guide-content');
    const catalogProduct = productCatalog[guideId];
    const productName = accessResponse.product_name || (catalogProduct ? catalogProduct.name : 'Study Guide');
    const description = accessResponse.description || 'Comprehensive nursing study guide with evidence-based content.';
    const subscribeUrl = accessResponse.subscribe_url || 'pricing.html';

    contentElement.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                <i class="fas fa-lock" style="font-size: 2rem; color: #d97706;"></i>
            </div>
            <h2 style="margin-bottom: 16px; color: var(--text-primary);">Subscription Required</h2>

            <h3 style="margin-bottom: 12px; color: var(--primary-color);">${productName}</h3>

            <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 1rem; max-width: 450px; margin-left: auto; margin-right: auto;">
                ${description}
            </p>

            <div style="background: var(--background-light); border-radius: 16px; padding: 24px; margin-bottom: 32px; text-align: left;">
                <p style="font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">Subscribe to unlock all guides:</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: var(--text-secondary);">
                        <i class="fas fa-check-circle" style="color: #10b981;"></i>
                        Unlimited access to all 60+ study guides
                    </li>
                    <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: var(--text-secondary);">
                        <i class="fas fa-check-circle" style="color: #10b981;"></i>
                        NCLEX-style practice questions
                    </li>
                    <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: var(--text-secondary);">
                        <i class="fas fa-check-circle" style="color: #10b981;"></i>
                        Downloadable PDF format for offline study
                    </li>
                    <li style="display: flex; align-items: center; gap: 12px; color: var(--text-secondary);">
                        <i class="fas fa-check-circle" style="color: #10b981;"></i>
                        Plans starting at $14.99/month
                    </li>
                </ul>
            </div>

            <a href="${subscribeUrl}" class="btn btn-primary btn-lg" style="padding: 16px 48px; font-size: 1.1rem; border-radius: 12px;">
                <i class="fas fa-crown me-2"></i>View Subscription Plans
            </a>
        </div>
    `;
}

// Show guide not found error
function showGuideNotFound() {
    const contentElement = document.getElementById('guide-content');

    document.getElementById('guide-title').textContent = 'Guide Not Found';
    document.getElementById('guide-subtitle').textContent = 'The requested study guide could not be found';
    document.getElementById('breadcrumb-current').textContent = 'Not Found';

    contentElement.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #fee2e2, #fecaca); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #dc2626;"></i>
            </div>
            <h2 style="margin-bottom: 16px;">Guide Not Found</h2>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">
                The requested study guide could not be found. It may have been moved or removed.
            </p>
            <a href="study-guides.html" class="btn btn-primary">
                <i class="fas fa-arrow-left me-2"></i>Browse All Guides
            </a>
        </div>
    `;
}

// Load subscriber content (PDF viewer)
async function loadSubscriberContent(guideId, accessResponse) {
    const contentElement = document.getElementById('guide-content');
    const productName = accessResponse.product_name || guideId;

    // Get the content URL from API
    const contentResponse = await getGuideContentAPI(guideId);

    if (!contentResponse.success) {
        contentElement.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div class="alert alert-warning" style="max-width: 500px; margin: 0 auto;">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    ${contentResponse.message || 'Unable to load guide content. Please try again later.'}
                </div>
                <button onclick="location.reload()" class="btn btn-primary mt-3">
                    <i class="fas fa-redo me-2"></i>Try Again
                </button>
            </div>
        `;
        return;
    }

    const guide = contentResponse.guide;
    const downloadUrl = guide.content_url;
    const expiresIn = guide.expires_in_minutes || 60;

    // Store PDF URL for printing
    currentPdfUrl = downloadUrl;

    // Add owned badge to action buttons area
    const actionsContainer = document.querySelector('.guide-actions');
    if (actionsContainer) {
        const ownedBadge = document.createElement('span');
        ownedBadge.className = 'guide-owned-badge';
        ownedBadge.innerHTML = `<i class="fas fa-check-circle"></i> ${accessResponse.access_type === 'subscription' ? 'Premium Access' : 'Owned'}`;
        actionsContainer.appendChild(ownedBadge);
    }

    // Show PDF viewer
    contentElement.innerHTML = `
        <div class="guide-pdf-container" style="background: var(--background-light); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 16px;">
                <div>
                    <h3 style="margin: 0; color: var(--text-primary); font-weight: 600;">${guide.product_name}</h3>
                    <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 0.9rem;">
                        PDF Study Guide
                    </p>
                </div>
                <a href="${downloadUrl}" target="_blank" class="btn btn-primary" download>
                    <i class="fas fa-download me-2"></i>Download PDF
                </a>
            </div>

            <div class="pdf-embed-wrapper" style="background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color);">
                <iframe
                    src="${downloadUrl}#toolbar=1&navpanes=0&scrollbar=1"
                    style="width: 100%; height: 800px; border: none;"
                    title="${guide.product_name} PDF Viewer"
                ></iframe>
            </div>

            <p style="margin-top: 16px; font-size: 0.85rem; color: var(--text-secondary); text-align: center;">
                <i class="fas fa-info-circle me-1"></i>
                Download link expires in ${expiresIn} minutes. Refresh the page to get a new link.
            </p>
        </div>

        <div style="background: var(--background-light); border-radius: 12px; padding: 20px; text-align: center;">
            <p style="margin: 0 0 12px; color: var(--text-secondary);">
                <i class="fas fa-question-circle me-1"></i>Need help or have questions?
            </p>
            <a href="https://discord.gg/y2Mh77wAV2" target="_blank" class="btn btn-outline-primary">
                <i class="fab fa-discord me-2"></i>Join our Discord Community
            </a>
        </div>
    `;
}

// Load and render markdown content (for legacy free guides)
async function loadMarkdownContent(file, hasAccess, guideId) {
    const contentElement = document.getElementById('guide-content');

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Failed to load guide');

        const markdown = await response.text();

        let contentToRender = markdown;
        let previewBadge = '';

        // Free guide - show full content badge
        previewBadge = `
            <div class="alert alert-success d-flex align-items-center mb-4" style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); border: none; border-radius: 12px;">
                <i class="fas fa-gift me-3" style="font-size: 1.5rem; color: #059669;"></i>
                <div>
                    <h5 class="mb-1" style="color: #059669; font-weight: 600;">Free Study Guide</h5>
                    <p class="mb-0" style="font-size: 0.9rem;">This guide is free for all nursing students. Enjoy the complete content!</p>
                </div>
            </div>
        `;

        // Parse markdown
        const html = typeof marked.parse === 'function'
            ? marked.parse(contentToRender)
            : marked(contentToRender);

        contentElement.innerHTML = previewBadge + html;

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
                <a href="study-guides.html" class="btn btn-primary" style="margin-top: 20px; display: inline-block;">
                    <i class="fas fa-arrow-left"></i> Back to All Guides
                </a>
            </div>
        `;
    }
}

// Render related guides based on category
function renderRelatedGuides(currentGuideId, currentCategory) {
    const container = document.getElementById('related-guides-grid');
    const section = document.getElementById('related-guides-section');

    console.log('renderRelatedGuides called:', { currentGuideId, currentCategory });
    console.log('Container found:', !!container, 'Section found:', !!section);

    if (!container || !section) {
        console.log('Container or section not found, exiting');
        return;
    }

    // Get the category of the current guide from our catalog
    const currentProduct = productCatalog[currentGuideId];

    // Normalize category - handle both API formats and catalog formats
    let category = currentCategory;

    // If API category has underscores, convert to hyphens to match our catalog
    if (category && category.includes('_')) {
        category = category.replace(/_/g, '-');
    }

    // Fallback to catalog category if API category doesn't exist or doesn't match
    if (!category || !Object.values(productCatalog).some(p => p.category === category)) {
        category = currentProduct ? currentProduct.category : null;
    }

    console.log('Using category:', category, 'Product from catalog:', currentProduct);

    if (!category) {
        console.log('No category found, hiding section');
        section.style.display = 'none';
        return;
    }

    // Get purchased guides from localStorage
    const purchasedGuides = JSON.parse(localStorage.getItem('purchasedGuides') || '[]');

    // Find other guides in the same category (excluding current)
    const relatedGuides = Object.entries(productCatalog)
        .filter(([id, product]) => product.category === category && id !== currentGuideId)
        .slice(0, 8); // Limit to 8 related guides

    console.log('Found related guides:', relatedGuides.length, relatedGuides.map(([id]) => id));

    if (relatedGuides.length === 0) {
        console.log('No related guides found, hiding section');
        section.style.display = 'none';
        return;
    }

    // Update section title
    const sectionTitle = section.querySelector('h3');
    if (sectionTitle) {
        sectionTitle.textContent = `More ${categoryDisplayNames[category] || category} Guides`;
    }

    // Get icon for guide based on product ID (same mapping as store/dashboard)
    const getGuideIcon = (productId) => {
        const iconMap = {
            // Cardiovascular
            'heart-failure': 'heart-failure.webp',
            'myocardial-infarction': 'heart-attack.webp',
            'arrhythmias': 'arrhythmias.webp',
            'hypertension': 'hypertension.webp',
            'coronary-artery-disease': 'cad.webp',
            'peripheral-vascular-disease': 'pad.webp',
            // Respiratory
            'copd': 'copd.webp',
            'asthma': 'asthma.webp',
            'pneumonia': 'pneumonia.webp',
            'oxygen-therapy': 'oxygen.webp',
            'tuberculosis': 'tb.webp',
            'chest-tubes': 'chest.webp',
            // Endocrine
            'diabetes-type1': 'type-1.webp',
            'diabetes-type2': 'type-2.webp',
            'thyroid-disorders': 'thyroid.webp',
            'adrenal-disorders': 'adrenal.webp',
            'pituitary-disorders': 'pituitary.webp',
            // Neurological
            'stroke': 'stroke.webp',
            'seizures': 'seizure.webp',
            'spinal-cord-injury': 'spinal-cord-injury.webp',
            'traumatic-brain-injury': 'brain-injury.webp',
            'meningitis': 'meningitis.webp',
            'parkinsons-ms': 'shaking.webp',
            // Renal
            'acute-kidney-injury': 'kidney-acute.webp',
            'chronic-kidney-disease': 'kidney-disease.webp',
            'dialysis': 'kidney-dialysis.webp',
            'urinary-tract-infections': 'urinary-tract-infection.webp',
            'kidney-stones': 'kidney.webp',
            'fluid-electrolytes': 'chemical.webp',
            // Gastrointestinal
            'gi-bleeding': 'gi-bleeding.webp',
            'bowel-obstruction': 'bowel-obstruction.webp',
            'liver-disease': 'liver.webp',
            'pancreatitis': 'intestines.webp',
            'inflammatory-bowel-disease': 'intestines.webp',
            'gerd-peptic-ulcer': 'ulcer.webp',
            // Musculoskeletal
            'fractures': 'broken-bone.webp',
            'arthritis': 'arthritis.webp',
            'hip-knee-replacement': 'prothesis.webp',
            'osteoporosis': 'osteoporosis.webp',
            'amputation-care': 'amputation.webp',
            // Mental Health (only eating-disorders has icon currently)
            'eating-disorders': 'eating-disorders.webp'
        };
        const iconFile = iconMap[productId];
        return iconFile ? `assets/images/guide-icons/${iconFile}` : null;
    };

    // Get a short description for the guide
    const getGuideDesc = (guideId) => {
        const descMap = {
            // Mental Health
            'depression-anxiety': 'Assessment, interventions, and therapeutic communication for mood disorders.',
            'substance-abuse': 'Withdrawal protocols, detox nursing care, and patient education.',
            'eating-disorders': 'Anorexia, bulimia, and binge eating interventions.',
            'crisis-intervention': 'De-escalation techniques, safety protocols, and emergency interventions.',
            'therapeutic-communication': 'Effective communication strategies for psychiatric nursing care.'
        };
        return descMap[guideId] || 'Comprehensive nursing study guide with clinical applications.';
    };

    // Render carousel
    container.innerHTML = `
        <div class="related-guides-carousel">
            <button class="carousel-btn carousel-prev" onclick="scrollRelatedGuides(-1)" aria-label="Previous">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel-track">
                ${relatedGuides.map(([guideId, product]) => {
                    const isOwned = purchasedGuides.includes(guideId);
                    const categoryClass = product.category || 'default';
                    const categoryName = categoryDisplayNames[product.category] || product.category || 'Study Guide';
                    return `
                        <div class="related-guide-card ${isOwned ? 'owned' : ''}">
                            <div class="related-guide-header">
                                ${isOwned
                                    ? `<span class="related-owned-badge"><i class="fas fa-check"></i> OWNED</span>`
                                    : `<span class="related-price-badge">$${product.price.toFixed(2)}</span>`
                                }
                                <div class="related-guide-icon">
                                    ${getGuideIcon(guideId)
                                        ? `<img src="${getGuideIcon(guideId)}" alt="${categoryName}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-book-medical\\' style=\\'font-size: 28px; color: white;\\'></i>';">`
                                        : `<i class="fas fa-book-medical" style="font-size: 28px; color: white;"></i>`
                                    }
                                </div>
                            </div>
                            <div class="related-guide-body">
                                <div class="related-guide-title-row">
                                    <h4>${product.name}</h4>
                                    <span class="category-badge ${categoryClass}">${categoryName}</span>
                                </div>
                                <p class="related-guide-desc">${getGuideDesc(guideId)}</p>
                                <div class="related-guide-actions">
                                    ${isOwned
                                        ? `<a href="${htmlGuides.includes(guideId) ? `guides/${guideId}.html` : `guide.html?id=${guideId}`}" class="btn-view-guide"><i class="fas fa-book-reader"></i> Open Guide</a>`
                                        : `<a href="pricing.html" class="btn-subscribe-guide"><i class="fas fa-rocket"></i> Subscribe</a>`
                                    }
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <button class="carousel-btn carousel-next" onclick="scrollRelatedGuides(1)" aria-label="Next">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;

    section.style.display = 'block';
}

// Scroll related guides carousel
function scrollRelatedGuides(direction) {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const cardWidth = 320; // card width + gap
    track.scrollBy({
        left: direction * cardWidth * 2,
        behavior: 'smooth'
    });
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
