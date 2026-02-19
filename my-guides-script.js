(function() {
    'use strict';

    // ── Guide catalog: 21 completed guides ─────────────────────
    var GUIDE_CATALOG = [
        {
            category: 'Cardiovascular',
            emoji: '\u2764\ufe0f',
            icon: 'fa-heartbeat',
            colorClass: 'icon-cardiovascular',
            guides: [
                { name: 'Heart Failure', file: 'heart-failure' },
                { name: 'Myocardial Infarction', file: 'myocardial-infarction' },
                { name: 'Arrhythmias', file: 'arrhythmias' },
                { name: 'Hypertension', file: 'hypertension' },
                { name: 'Coronary Artery Disease', file: 'coronary-artery-disease' },
                { name: 'Peripheral Vascular Disease', file: 'peripheral-vascular-disease' }
            ],
            comingSoon: ['Valvular Heart Disease', 'Shock', 'Cardiac Medications', 'Heart Sounds & Murmurs']
        },
        {
            category: 'Respiratory',
            emoji: '\ud83e\udec1',
            icon: 'fa-lungs',
            colorClass: 'icon-respiratory',
            guides: [
                { name: 'COPD', file: 'copd' },
                { name: 'Asthma', file: 'asthma' },
                { name: 'Pneumonia', file: 'pneumonia' },
                { name: 'Tuberculosis', file: 'tuberculosis' },
                { name: 'Oxygen Therapy', file: 'oxygen-therapy' },
                { name: 'Chest Tubes', file: 'chest-tubes' }
            ],
            comingSoon: ['Mechanical Ventilation', 'Pulmonary Embolism', 'ARDS', 'Tracheostomy Care']
        },
        {
            category: 'Endocrine',
            emoji: '\ud83e\ude78',
            icon: 'fa-vial',
            colorClass: 'icon-endocrine',
            guides: [
                { name: 'Diabetes Mellitus', file: 'diabetes-mellitus' },
                { name: 'Thyroid Disorders', file: 'thyroid-disorders' },
                { name: 'Adrenal Disorders', file: 'adrenal-disorders' },
                { name: 'Pituitary Disorders', file: 'pituitary-disorders' }
            ],
            comingSoon: ['DKA vs HHS', 'SIADH vs Diabetes Insipidus']
        },
        {
            category: 'Neurological',
            emoji: '\ud83e\udde0',
            icon: 'fa-brain',
            colorClass: 'icon-neurological',
            guides: [
                { name: 'Stroke', file: 'stroke' }
            ],
            comingSoon: ['Seizures / Epilepsy', 'TBI / Increased ICP', 'Spinal Cord Injury', 'Meningitis', "Parkinson's Disease"]
        },
        {
            category: 'Gastrointestinal',
            emoji: '\ud83d\udd2c',
            icon: 'fa-stomach',
            colorClass: 'icon-gi',
            guides: [
                { name: 'GI Bleeding', file: 'gi-bleeding' }
            ],
            comingSoon: ['Liver Cirrhosis', "Crohn's vs UC", 'Pancreatitis', 'Bowel Obstruction']
        },
        {
            category: 'Musculoskeletal',
            emoji: '\ud83e\uddb4',
            icon: 'fa-bone',
            colorClass: 'icon-musculoskeletal',
            guides: [
                { name: 'Fractures', file: 'fractures' },
                { name: 'Hip & Knee Replacement', file: 'hip-knee-replacement' }
            ],
            comingSoon: ['Osteoporosis', 'RA vs Osteoarthritis', 'Amputation']
        },
        {
            category: 'Fundamentals',
            emoji: '\ud83d\udccb',
            icon: 'fa-clipboard-check',
            colorClass: 'icon-fundamentals',
            guides: [
                { name: 'Assessment Skills', file: 'assessment-skills' }
            ],
            comingSoon: ['Infection Control', 'IV Therapy', 'Delegation & Prioritization', 'Patient Safety', 'Wound Care']
        }
    ];

    // ── Count totals ────────────────────────────────────────────
    var totalAvailable = 0;
    var totalComingSoon = 0;
    GUIDE_CATALOG.forEach(function(cat) {
        totalAvailable += cat.guides.length;
        totalComingSoon += (cat.comingSoon || []).length;
    });

    // ── Build HTML ──────────────────────────────────────────────
    function renderLibrary() {
        var container = document.getElementById('guide-library');
        if (!container) return;

        var html = '';

        // Stats summary
        html += '<div class="guide-library-stats">';
        html += '<div class="guide-library-stat"><i class="fas fa-book-open"></i> <strong>' + totalAvailable + '</strong> guides available</div>';
        html += '<div class="guide-library-stat"><i class="fas fa-clock"></i> <strong>' + totalComingSoon + '</strong> coming soon</div>';
        html += '<div class="guide-library-stat"><i class="fas fa-layer-group"></i> <strong>' + GUIDE_CATALOG.length + '</strong> categories</div>';
        html += '</div>';

        // Category sections
        GUIDE_CATALOG.forEach(function(cat) {
            var totalInCat = cat.guides.length + (cat.comingSoon || []).length;

            html += '<div class="guide-category">';
            html += '<div class="guide-category-header">';
            html += '<span class="guide-category-emoji">' + cat.emoji + '</span>';
            html += '<h2 class="guide-category-title">' + cat.category + '</h2>';
            html += '<span class="guide-category-count">' + cat.guides.length + ' of ' + totalInCat + ' guides</span>';
            html += '</div>';

            html += '<div class="guide-grid">';

            // Available guides
            cat.guides.forEach(function(guide) {
                html += '<a href="guides/' + guide.file + '.html" class="guide-card">';
                html += '<div class="guide-card-icon ' + cat.colorClass + '"><i class="fas ' + cat.icon + '"></i></div>';
                html += '<div class="guide-card-info">';
                html += '<div class="guide-card-name">' + guide.name + '</div>';
                html += '<div class="guide-card-meta">Study Guide</div>';
                html += '</div>';
                html += '<i class="fas fa-chevron-right guide-card-arrow"></i>';
                html += '</a>';
            });

            // Coming soon
            (cat.comingSoon || []).forEach(function(name) {
                html += '<div class="guide-card coming-soon">';
                html += '<div class="guide-card-icon ' + cat.colorClass + '" style="opacity:.4"><i class="fas ' + cat.icon + '"></i></div>';
                html += '<div class="guide-card-info">';
                html += '<div class="guide-card-name">' + name + '</div>';
                html += '<div class="guide-card-meta">Study Guide</div>';
                html += '</div>';
                html += '<span class="coming-soon-badge">Coming Soon</span>';
                html += '</div>';
            });

            html += '</div>'; // .guide-grid
            html += '</div>'; // .guide-category
        });

        container.innerHTML = html;
    }

    // ── Init ────────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderLibrary);
    } else {
        renderLibrary();
    }
})();
