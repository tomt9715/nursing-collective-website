(function() {
    'use strict';

    var ICON_BASE = 'assets/images/guide-icons/';
    var CATEGORY_ICON_BASE = 'assets/images/study-guide-page/';

    // ── Class-based guide catalog ────────────────────────────────
    var CLASS_CATALOG = [
        {
            id: 'fundamentals',
            name: 'Fundamentals of Nursing',
            classIcon: 'fundamentals-of-nursing-class-icon',
            description: 'Core nursing skills, assessment techniques, and clinical foundations.',
            gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            topics: [
                {
                    category: 'Assessment & Clinical Skills',
                    categoryIcon: 'assessment-icon',
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
            ]
        },
        {
            id: 'med-surg',
            name: 'Medical-Surgical Nursing',
            classIcon: 'medical-surgical-nursing-class-icon',
            description: 'Cardiovascular, respiratory, neurological, GI, endocrine, and musculoskeletal conditions.',
            gradient: 'linear-gradient(135deg, #2E86AB, #1e6b8a)',
            topics: [
                {
                    category: 'Cardiovascular',
                    categoryIcon: 'cardiovascular-icon',
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
                    categoryIcon: 'respiratory-icon',
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
                    categoryIcon: 'endocrine-icon',
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
                    categoryIcon: 'neurological-icon',
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
                    categoryIcon: 'gastrointestinal-icon',
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
                    categoryIcon: 'musculoskeletal-icon',
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
                }
            ]
        },
        {
            id: 'maternal-newborn',
            name: 'Maternal-Newborn Nursing',
            classIcon: 'maternal-newborn-nursing-class-icon',
            description: 'Antepartum, labor & delivery, postpartum, newborn care, high-risk pregnancy, and women\'s health.',
            gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
            topics: [
                {
                    category: 'Maternal-Newborn',
                    categoryIcon: 'maternal-newborn-icon',
                    icon: 'fa-baby',
                    colorClass: 'icon-maternal',
                    guides: [
                        { name: 'Antepartum Care', file: 'antepartum-care' }
                    ],
                    comingSoon: [
                        { name: 'Labor & Delivery', icon: 'labor-delivery' },
                        { name: 'Postpartum Care', icon: 'postpartum-care' },
                        { name: 'High-Risk Pregnancy', icon: 'high-risk-pregnancy' },
                        { name: 'Newborn Care & Transitioning', icon: 'newborn-care' },
                        { name: 'High-Risk Newborn', icon: 'high-risk-newborn' },
                        { name: "Women's Health & GYN Disorders", icon: 'womens-health-gyn' },
                        { name: 'STIs & Reproductive Infections', icon: 'stis-reproductive-infections' }
                    ]
                }
            ]
        },
        {
            id: 'pediatrics',
            name: 'Pediatric Nursing',
            classIcon: 'pediatric-nursing-class-icon',
            description: 'Growth & development, pediatric emergencies, and age-specific care.',
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
            topics: [
                {
                    category: 'Pediatric Nursing',
                    categoryIcon: 'pediatric-icon',
                    icon: 'fa-child',
                    colorClass: 'icon-pediatrics',
                    guides: [],
                    comingSoon: [
                        { name: 'Growth & Development', icon: 'growth-development' },
                        { name: 'Pediatric Emergencies', icon: 'pediatric-emergencies' },
                        { name: 'Infant Care', icon: 'infant-care' },
                        { name: 'Adolescent Health', icon: 'adolescent-health' }
                    ]
                }
            ]
        },
        {
            id: 'mental-health',
            name: 'Mental Health Nursing',
            classIcon: 'mental-health-nursing-class-icon',
            description: 'Therapeutic communication, crisis intervention, and psychiatric disorders.',
            gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
            topics: [
                {
                    category: 'Psychiatric Nursing',
                    categoryIcon: 'psychiatric-icon',
                    icon: 'fa-comments',
                    colorClass: 'icon-mental-health',
                    guides: [],
                    comingSoon: [
                        { name: 'Depression & Anxiety', icon: 'depression-anxiety' },
                        { name: 'Crisis Intervention', icon: 'crisis-intervention' },
                        { name: 'Therapeutic Communication', icon: 'therapeutic-communication' },
                        { name: 'Substance Abuse', icon: 'substance-abuse' },
                        { name: 'Eating Disorders', icon: 'eating-disorders' }
                    ]
                }
            ]
        },
        {
            id: 'pharmacology',
            name: 'Pharmacology',
            classIcon: 'pharmacology-class-icon',
            description: 'Drug classes, medication administration, and pharmacological principles.',
            gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            topics: [
                {
                    category: 'Pharmacology',
                    categoryIcon: 'pharmacology-icon',
                    icon: 'fa-pills',
                    colorClass: 'icon-pharmacology',
                    guides: [],
                    comingSoon: [
                        { name: 'Cardiac Medications', icon: 'cardiac-medications' },
                        { name: 'Antibiotics & Antivirals', icon: 'antibiotics-antivirals' },
                        { name: 'Pain Management', icon: 'pain-management' },
                        { name: 'IV Medications', icon: 'iv-medications' },
                        { name: 'Psychotropic Medications', icon: 'psychotropic-medications' },
                        { name: 'Emergency Medications', icon: 'emergency-medications' }
                    ]
                }
            ]
        }
    ];

    // ── Compute counts ───────────────────────────────────────────
    var totalAvailable = 0;
    var totalComingSoon = 0;

    CLASS_CATALOG.forEach(function(cls) {
        var avail = 0, soon = 0;
        cls.topics.forEach(function(t) {
            avail += t.guides.length;
            soon += (t.comingSoon || []).length;
        });
        cls.guideCounts = { available: avail, comingSoon: soon };
        totalAvailable += avail;
        totalComingSoon += soon;
    });

    // ── Render: Class Landing (Level 1) ──────────────────────────
    function renderLanding() {
        var container = document.getElementById('guide-library');
        if (!container) return;

        var html = '';

        // Stats bar
        html += '<div class="guide-library-stats">';
        html += '<div class="guide-library-stat"><i class="fas fa-book-open"></i> <strong>' + totalAvailable + '</strong> guides available</div>';
        html += '<div class="guide-library-stat"><i class="fas fa-clock"></i> <strong>' + totalComingSoon + '</strong> coming soon</div>';
        html += '<div class="guide-library-stat"><i class="fas fa-graduation-cap"></i> <strong>' + CLASS_CATALOG.length + '</strong> classes</div>';
        html += '</div>';

        // Class cards
        html += '<div class="class-card-grid">';
        CLASS_CATALOG.forEach(function(cls) {
            var counts = cls.guideCounts;
            html += '<div class="class-card" data-class-id="' + cls.id + '" role="button" tabindex="0">';
            html += '<div class="class-card-icon">';
            html += '<img src="' + CATEGORY_ICON_BASE + cls.classIcon + '.webp" alt="" class="class-card-img" loading="lazy">';
            html += '</div>';
            html += '<div class="class-card-body">';
            html += '<h2 class="class-card-title">' + cls.name + '</h2>';
            html += '<p class="class-card-desc">' + cls.description + '</p>';
            html += '<div class="class-card-meta">';
            if (counts.available > 0) {
                html += '<span class="class-card-stat"><i class="fas fa-book-open"></i> ' + counts.available + ' available</span>';
            }
            if (counts.comingSoon > 0) {
                html += '<span class="class-card-stat"><i class="fas fa-clock"></i> ' + counts.comingSoon + ' coming soon</span>';
            }
            html += '</div>';
            html += '</div>';
            html += '<i class="fas fa-chevron-right class-card-arrow"></i>';
            html += '</div>';
        });
        html += '</div>';

        container.innerHTML = html;
        animateIn(container);
        bindClassCards();
    }

    // ── Render: Class Detail (Level 2) ───────────────────────────
    function renderDetail(classId) {
        var cls = null;
        for (var i = 0; i < CLASS_CATALOG.length; i++) {
            if (CLASS_CATALOG[i].id === classId) { cls = CLASS_CATALOG[i]; break; }
        }
        if (!cls) { renderLanding(); return; }

        var container = document.getElementById('guide-library');
        if (!container) return;

        var html = '';

        // Breadcrumb
        html += '<div class="guide-nav-breadcrumb">';
        html += '<button class="breadcrumb-back" data-navigate-back>';
        html += '<i class="fas fa-arrow-left"></i> All Classes';
        html += '</button>';
        html += '<i class="fas fa-chevron-right breadcrumb-sep"></i>';
        html += '<span class="breadcrumb-current">' + cls.name + '</span>';
        html += '</div>';

        // Class header
        html += '<div class="class-detail-header">';
        html += '<div class="class-detail-icon">';
        html += '<img src="' + CATEGORY_ICON_BASE + cls.classIcon + '.webp" alt="" class="class-detail-img" loading="lazy">';
        html += '</div>';
        html += '<div>';
        html += '<h1 class="class-detail-title">' + cls.name + '</h1>';
        var subtitleParts = [];
        if (cls.topics.length > 1) subtitleParts.push(cls.topics.length + ' topics');
        if (cls.guideCounts.available > 0) subtitleParts.push(cls.guideCounts.available + ' available');
        if (cls.guideCounts.comingSoon > 0) subtitleParts.push(cls.guideCounts.comingSoon + ' coming soon');
        html += '<p class="class-detail-subtitle">' + subtitleParts.join(' &middot; ') + '</p>';
        html += '</div>';
        html += '</div>';

        // Topic sections
        cls.topics.forEach(function(topic) {
            var totalInTopic = topic.guides.length + (topic.comingSoon || []).length;

            html += '<div class="guide-category">';
            html += '<div class="guide-category-header">';
            html += '<img src="' + CATEGORY_ICON_BASE + topic.categoryIcon + '.webp" alt="" class="guide-category-icon" loading="lazy">';
            html += '<h2 class="guide-category-title">' + topic.category + '</h2>';
            html += '<span class="guide-category-count">' + topic.guides.length + ' of ' + totalInTopic + ' guides</span>';
            html += '</div>';

            html += '<div class="guide-grid">';

            // Available guides
            topic.guides.forEach(function(guide) {
                html += '<a href="guides/' + guide.file + '.html" class="guide-card">';
                html += '<div class="guide-card-icon ' + topic.colorClass + '">';
                html += '<img src="' + ICON_BASE + guide.file + '.webp" alt="" class="guide-card-img" loading="lazy">';
                html += '</div>';
                html += '<div class="guide-card-info">';
                html += '<div class="guide-card-name">' + guide.name + '</div>';
                html += '<div class="guide-card-meta">Study Guide</div>';
                html += '</div>';
                html += '<i class="fas fa-chevron-right guide-card-arrow"></i>';
                html += '</a>';
            });

            // Coming soon
            (topic.comingSoon || []).forEach(function(item) {
                html += '<div class="guide-card coming-soon">';
                html += '<div class="guide-card-icon ' + topic.colorClass + '">';
                if (item.icon) {
                    html += '<img src="' + ICON_BASE + item.icon + '.webp" alt="" class="guide-card-img" loading="lazy">';
                } else {
                    html += '<i class="fas ' + topic.icon + '"></i>';
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
        animateIn(container);
        bindBackButton();
    }

    // ── Animation ────────────────────────────────────────────────
    function animateIn(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        requestAnimationFrame(function() {
            el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // ── Event binding ────────────────────────────────────────────
    function bindClassCards() {
        document.querySelectorAll('.class-card[data-class-id]').forEach(function(card) {
            card.addEventListener('click', function() {
                window.location.hash = this.getAttribute('data-class-id');
            });
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.hash = this.getAttribute('data-class-id');
                }
            });
        });
    }

    function bindBackButton() {
        var btn = document.querySelector('[data-navigate-back]');
        if (btn) {
            btn.addEventListener('click', function() {
                window.location.hash = '';
            });
        }
    }

    // ── Hash router ──────────────────────────────────────────────
    var validIds = CLASS_CATALOG.map(function(c) { return c.id; });

    function route() {
        var hash = window.location.hash.replace('#', '');
        if (hash && validIds.indexOf(hash) !== -1) {
            renderDetail(hash);
        } else {
            renderLanding();
        }
        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', route);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', route);
    } else {
        route();
    }
})();
