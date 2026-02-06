// Study Guides Page JavaScript
// Handles preview modal with placeholder content for Heart Failure and Eating Disorders

// Guide preview content (realistic placeholder - preview of full guide)
const guidePreviewContent = {
    'heart-failure': {
        title: 'Heart Failure',
        storeUrl: 'pricing.html#heart-failure',
        content: `
# Heart Failure Study Guide

## Overview
Heart failure (HF) is a complex clinical syndrome resulting from structural or functional cardiac disorders that impair the heart's ability to fill with or eject blood effectively. This guide covers the essential concepts every nursing student needs to master.

---

## Types of Heart Failure

### Left-Sided Heart Failure
The most common form, occurring when the left ventricle cannot effectively pump blood to the systemic circulation.

**Systolic Dysfunction (HFrEF)**
- Ejection Fraction < 40%
- Impaired contractility
- The heart cannot pump blood forward effectively

**Diastolic Dysfunction (HFpEF)**
- Ejection Fraction ≥ 50%
- Impaired relaxation and filling
- The heart cannot fill properly during diastole

### Clinical Manifestations of Left-Sided HF
- **Pulmonary congestion**: Dyspnea, orthopnea, paroxysmal nocturnal dyspnea (PND)
- **Crackles/rales** in lung bases
- **S3 heart sound** (ventricular gallop)
- **Cough** - may be dry or produce pink, frothy sputum
- **Fatigue and weakness**

---

## Right-Sided Heart Failure
Often results from left-sided failure. The right ventricle cannot effectively pump blood to the pulmonary circulation.

### Clinical Manifestations
- **Peripheral edema** (dependent edema, pitting)
- **Jugular venous distension (JVD)**
- **Hepatomegaly** and hepatojugular reflux
- **Ascites**
- **Weight gain** from fluid retention

---

## Key Assessment Findings

### FACES Mnemonic for HF Symptoms
- **F**atigue
- **A**ctivities limited
- **C**hest congestion/cough
- **E**dema
- **S**hortness of breath

---

*This is a free preview. Subscribe for full access including:*
- *In-depth content and detailed explanations*
- *Key nursing interventions and priorities*
- *Clinical pearls and memory aids*
- *Printable study materials*
        `
    },
    'eating-disorders': {
        title: 'Eating Disorders',
        storeUrl: 'pricing.html#eating-disorders',
        content: `
# Eating Disorders Study Guide

## Overview
Eating disorders are serious mental health conditions characterized by persistent disturbances in eating behaviors and related thoughts and emotions. Early recognition and intervention are critical for positive outcomes.

---

## Types of Eating Disorders

### Anorexia Nervosa
A potentially life-threatening disorder characterized by self-starvation and excessive weight loss.

**Key Diagnostic Criteria:**
- Restriction of energy intake leading to significantly low body weight
- Intense fear of gaining weight or becoming fat
- Disturbance in body image perception
- BMI < 18.5 kg/m² (adults)

**Subtypes:**
- **Restricting type**: Weight loss through dieting, fasting, or excessive exercise
- **Binge-eating/purging type**: Episodes of binge eating or purging behaviors

### Physical Assessment Findings
- **Vital signs**: Bradycardia, hypotension, hypothermia
- **Lanugo** (fine body hair)
- **Dry, yellow skin**
- **Hair loss**
- **Amenorrhea** (in females)
- **Muscle wasting**

---

### Bulimia Nervosa
Characterized by recurrent episodes of binge eating followed by compensatory behaviors.

**Key Features:**
- Binge eating episodes (consuming large amounts in short time)
- Sense of lack of control during binges
- Compensatory behaviors: self-induced vomiting, laxative abuse, excessive exercise
- Self-evaluation unduly influenced by body shape/weight

**Physical Signs:**
- **Russell's sign**: Calluses on knuckles from self-induced vomiting
- **Dental erosion** from stomach acid
- **Parotid gland enlargement** ("chipmunk cheeks")
- **Electrolyte imbalances** (especially hypokalemia)

---

## Nursing Priorities

### Safety First
1. Monitor for **refeeding syndrome** in severely malnourished patients
2. Assess for **suicidal ideation** (high comorbidity with depression)
3. Monitor **vital signs** and **cardiac rhythm**
4. Track **electrolytes** - especially potassium, phosphorus, magnesium

---

*This is a free preview. Subscribe for full access including:*
- *In-depth content and detailed explanations*
- *Key nursing interventions and priorities*
- *Clinical pearls and memory aids*
- *Printable study materials*
        `
    }
};

// Current guide being previewed
let currentPreviewGuide = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setupPreviewButtons();
    setupModalClose();
    hideLoader();
});

// Setup preview button click handlers
function setupPreviewButtons() {
    const previewButtons = document.querySelectorAll('.btn-preview');

    previewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const guideId = button.dataset.guideId;
            openPreviewModal(guideId);
        });
    });
}

// Setup modal close handlers
function setupModalClose() {
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.getElementById('preview-modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closePreviewModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePreviewModal();
            }
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePreviewModal();
        }
    });
}

// Open preview modal with content
function openPreviewModal(guideId) {
    const guide = guidePreviewContent[guideId];
    if (!guide) {
        console.error('Guide not found:', guideId);
        return;
    }

    currentPreviewGuide = guideId;

    const modal = document.getElementById('preview-modal');
    const titleEl = document.getElementById('preview-modal-title');
    const bodyEl = document.getElementById('preview-modal-body');
    const subscribeBtn = document.getElementById('btn-subscribe-modal');

    // Update title
    titleEl.textContent = guide.title + ' - Free Preview';

    // Update subscribe button link
    if (subscribeBtn) {
        subscribeBtn.href = guide.storeUrl;
    }

    // Parse markdown to HTML
    let html;
    if (typeof marked !== 'undefined') {
        html = typeof marked.parse === 'function'
            ? marked.parse(guide.content)
            : marked(guide.content);
    } else {
        // Fallback: basic markdown conversion
        html = guide.content
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/---/g, '<hr>');
        html = '<p>' + html + '</p>';
    }

    // Render content
    bodyEl.innerHTML = `
        <div class="preview-notice">
            <i class="fas fa-info-circle"></i>
            <span>You're viewing a free preview. Subscribe for full access to all content.</span>
        </div>
        <div class="preview-content markdown-body">
            ${html}
        </div>
        <div class="preview-fade-overlay">
            <div class="preview-unlock-prompt">
                <i class="fas fa-lock"></i>
                <p>Continue reading with full access...</p>
                <a href="${guide.storeUrl}" class="btn btn-primary">
                    <i class="fas fa-crown"></i> View Subscription Plans
                </a>
            </div>
        </div>
    `;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close preview modal
function closePreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentPreviewGuide = null;
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

// Configure marked.js if available
if (typeof marked !== 'undefined') {
    if (typeof marked.setOptions === 'function') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
    } else if (typeof marked.use === 'function') {
        marked.use({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
    }
}
