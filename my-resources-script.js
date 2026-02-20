(function() {
    'use strict';

    // ── Resource catalog ───────────────────────────────────────────
    var RESOURCES = [
        // Survival Guides (free)
        { id: 'how-to-study', title: 'How to Study for Nursing Exams', desc: 'Why re-reading notes doesn\'t work for nursing exams and what to do instead.', icon: 'fa-graduation-cap', category: 'survival', free: true },
        { id: 'not-overwhelmed', title: 'How to Not Be Overwhelmed', desc: 'Practical strategies for managing the fire hose of information in nursing school.', icon: 'fa-mountain', category: 'survival', free: true },
        { id: 'time-management', title: 'Time Management', desc: 'How to prioritize what matters and protect your time when you can\'t do everything.', icon: 'fa-clock', category: 'survival', free: true },
        { id: 'care-plans', title: 'How to Write a Care Plan', desc: 'A step-by-step approach to care plans that actually makes sense.', icon: 'fa-clipboard-list', category: 'survival', free: true },
        { id: 'feeling-like-failing', title: "When You Feel Like You're Failing", desc: 'For those moments when you wonder if you\'re cut out for this.', icon: 'fa-heart', category: 'survival', free: true },
        // Clinical Confidence (premium)
        { id: 'first-semester-clinicals', title: 'First Semester Clinicals', desc: 'What to expect, how to prepare, and how to survive your first clinical rotation.', icon: 'fa-hospital', category: 'clinical', free: false },
        { id: 'head-to-toe-assessment', title: 'Head-to-Toe Assessment', desc: 'A systematic approach to physical assessment you can actually remember.', icon: 'fa-user-md', category: 'clinical', free: false },
        { id: 'clinical-skills', title: 'Clinical Skills', desc: 'Essential nursing skills broken down into clear, confident steps.', icon: 'fa-hand-holding-medical', category: 'clinical', free: false },
        { id: 'clinical-safety', title: 'Clinical Safety', desc: 'Patient safety priorities, error prevention, and what to do when things go wrong.', icon: 'fa-shield-alt', category: 'clinical', free: false },
        { id: 'clinical-bag', title: 'Clinical Bag Essentials', desc: 'Everything you need in your bag for clinical days, organized by priority.', icon: 'fa-briefcase-medical', category: 'clinical', free: false },
        { id: 'night-before-clinicals', title: 'Night Before Clinicals', desc: 'Your prep checklist and what to review the night before clinical rotations.', icon: 'fa-moon', category: 'clinical', free: false },
        { id: 'when-you-dont-know', title: "When You Don't Know", desc: 'How to handle clinical situations when you\'re unsure what to do next.', icon: 'fa-question-circle', category: 'clinical', free: false },
        // Quick Reference (premium)
        { id: 'lab-values', title: 'Lab Values', desc: 'Normal ranges, critical values, and what abnormal results mean by system.', icon: 'fa-vial', category: 'reference', free: false },
        { id: 'vital-signs', title: 'Vital Signs', desc: 'Normal ranges by age, assessment tips, and when to escalate concerns.', icon: 'fa-heartbeat', category: 'reference', free: false },
        { id: 'medications', title: 'Medications', desc: 'Common drug classes, key side effects, and nursing considerations at a glance.', icon: 'fa-pills', category: 'reference', free: false },
        { id: 'documentation-phrases', title: 'Documentation Phrases', desc: 'Copy-ready charting phrases organized by assessment area and situation.', icon: 'fa-file-medical', category: 'reference', free: false },
        { id: 'abbreviations', title: 'Abbreviations', desc: 'Common medical abbreviations and acronyms you\'ll see in clinical and on exams.', icon: 'fa-spell-check', category: 'reference', free: false }
    ];

    var CATEGORIES = [
        { key: 'survival', title: 'Survival Guides', icon: 'fa-lightbulb' },
        { key: 'clinical', title: 'Clinical Confidence', icon: 'fa-stethoscope' },
        { key: 'reference', title: 'Quick Reference Tools', icon: 'fa-bolt' }
    ];

    // ── Compute totals ─────────────────────────────────────────────
    var totalFree = 0;
    var totalPremium = 0;
    RESOURCES.forEach(function(r) {
        if (r.free) totalFree++;
        else totalPremium++;
    });

    // ── Render ─────────────────────────────────────────────────────
    function renderResources(hasAccess) {
        var container = document.getElementById('my-resources-library');
        if (!container) return;

        var html = '';

        // Stats bar
        html += '<div class="res-library-stats">';
        html += '<div class="res-library-stat"><i class="fas fa-book-reader"></i> <strong>' + RESOURCES.length + '</strong> resources</div>';
        html += '<div class="res-library-stat"><i class="fas fa-unlock"></i> <strong>' + totalFree + '</strong> free</div>';
        html += '<div class="res-library-stat"><i class="fas fa-crown"></i> <strong>' + totalPremium + '</strong> premium</div>';
        html += '</div>';

        // Category sections
        CATEGORIES.forEach(function(cat) {
            var items = RESOURCES.filter(function(r) { return r.category === cat.key; });

            html += '<div class="res-section">';
            html += '<div class="res-section-header">';
            html += '<div class="res-section-icon ' + cat.key + '"><i class="fas ' + cat.icon + '"></i></div>';
            html += '<h2 class="res-section-title">' + cat.title + '</h2>';
            html += '<span class="res-section-count">' + items.length + ' guides</span>';
            html += '</div>';

            html += '<div class="res-section-grid">';
            items.forEach(function(item) {
                var canAccess = item.free || hasAccess;
                var href = canAccess ? 'resources/' + item.id + '.html' : 'pricing.html';
                var lockedClass = canAccess ? '' : ' locked';

                html += '<a href="' + href + '" class="res-page-card' + lockedClass + '">';
                html += '<div class="res-page-card-icon ' + item.category + '">';
                html += '<i class="fas ' + item.icon + '"></i>';
                html += '</div>';
                html += '<div class="res-page-card-info">';
                html += '<div class="res-page-card-title">' + item.title + '</div>';
                html += '<div class="res-page-card-desc">' + item.desc + '</div>';
                html += '</div>';

                if (item.free) {
                    html += '<span class="res-page-badge free">Free</span>';
                } else if (!canAccess) {
                    html += '<i class="fas fa-lock res-page-lock"></i>';
                }

                html += '</a>';
            });
            html += '</div>'; // .res-section-grid
            html += '</div>'; // .res-section
        });

        container.innerHTML = html;

        // Fade in
        container.style.opacity = '0';
        container.style.transform = 'translateY(12px)';
        requestAnimationFrame(function() {
            container.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        });
    }

    // ── Init ───────────────────────────────────────────────────────
    async function init() {
        try {
            var subStatus = await checkSubscriptionStatus();
            renderResources(subStatus.hasAccess);
        } catch (e) {
            console.error('Error loading resources:', e);
            var container = document.getElementById('my-resources-library');
            if (container) {
                container.innerHTML = '<div style="text-align:center;padding:60px 24px;color:#94a3b8;">' +
                    '<i class="fas fa-exclamation-circle" style="font-size:1.5rem;margin-bottom:12px;display:block;"></i>' +
                    'Unable to load resources. Please try refreshing.' +
                    '</div>';
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
