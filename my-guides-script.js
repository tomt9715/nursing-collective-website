(function() {
    'use strict';

    var ICON_BASE = 'assets/images/guide-icons/';

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
            comingSoon: [
                { name: 'Valvular Heart Disease' },
                { name: 'Shock' },
                { name: 'Cardiac Medications', icon: 'cardiac-medications' },
                { name: 'Heart Sounds & Murmurs' }
            ]
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
            comingSoon: [
                { name: 'Mechanical Ventilation' },
                { name: 'Pulmonary Embolism' },
                { name: 'ARDS' },
                { name: 'Tracheostomy Care' }
            ]
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
            comingSoon: [
                { name: 'DKA vs HHS', icon: 'type-1' },
                { name: 'SIADH vs Diabetes Insipidus', icon: 'pituitary' }
            ]
        },
        {
            category: 'Neurological',
            emoji: '\ud83e\udde0',
            icon: 'fa-brain',
            colorClass: 'icon-neurological',
            guides: [
                { name: 'Stroke', file: 'stroke' }
            ],
            comingSoon: [
                { name: 'Seizures / Epilepsy', icon: 'seizures' },
                { name: 'TBI / Increased ICP', icon: 'traumatic-brain-injury' },
                { name: 'Spinal Cord Injury', icon: 'spinal-cord-injury' },
                { name: 'Meningitis', icon: 'meningitis' },
                { name: "Parkinson's Disease", icon: 'parkinsons-ms' }
            ]
        },
        {
            category: 'Gastrointestinal',
            emoji: '\ud83d\udd2c',
            icon: 'fa-stomach',
            colorClass: 'icon-gi',
            guides: [
                { name: 'GI Bleeding', file: 'gi-bleeding' }
            ],
            comingSoon: [
                { name: 'Liver Cirrhosis', icon: 'liver-disease' },
                { name: "Crohn's vs UC", icon: 'inflammatory-bowel-disease' },
                { name: 'Pancreatitis', icon: 'pancreatitis' },
                { name: 'Bowel Obstruction', icon: 'bowel-obstruction' }
            ]
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
            comingSoon: [
                { name: 'Osteoporosis', icon: 'osteoporosis' },
                { name: 'RA vs Osteoarthritis', icon: 'arthritis' },
                { name: 'Amputation', icon: 'amputation-care' }
            ]
        },
        {
            category: 'Fundamentals',
            emoji: '\ud83d\udccb',
            icon: 'fa-clipboard-check',
            colorClass: 'icon-fundamentals',
            guides: [
                { name: 'Assessment Skills', file: 'assessment-skills' }
            ],
            comingSoon: [
                { name: 'Infection Control', icon: 'infection-control' },
                { name: 'IV Therapy', icon: 'iv-medications' },
                { name: 'Delegation & Prioritization' },
                { name: 'Patient Safety', icon: 'patient-safety' },
                { name: 'Wound Care' }
            ]
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

            // Available guides — use guide-specific image icon
            cat.guides.forEach(function(guide) {
                html += '<a href="guides/' + guide.file + '.html" class="guide-card">';
                html += '<div class="guide-card-icon ' + cat.colorClass + '">';
                html += '<img src="' + ICON_BASE + guide.file + '.webp" alt="" class="guide-card-img" loading="lazy">';
                html += '</div>';
                html += '<div class="guide-card-info">';
                html += '<div class="guide-card-name">' + guide.name + '</div>';
                html += '<div class="guide-card-meta">Study Guide</div>';
                html += '</div>';
                html += '<i class="fas fa-chevron-right guide-card-arrow"></i>';
                html += '</a>';
            });

            // Coming soon — use image icon if available, otherwise Font Awesome fallback
            (cat.comingSoon || []).forEach(function(item) {
                html += '<div class="guide-card coming-soon">';
                html += '<div class="guide-card-icon ' + cat.colorClass + '">';
                if (item.icon) {
                    html += '<img src="' + ICON_BASE + item.icon + '.webp" alt="" class="guide-card-img" loading="lazy">';
                } else {
                    html += '<i class="fas ' + cat.icon + '"></i>';
                }
                html += '</div>';
                html += '<div class="guide-card-info">';
                html += '<div class="guide-card-name">' + item.name + '</div>';
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
