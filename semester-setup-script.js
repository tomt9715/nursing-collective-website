/**
 * Semester Setup Modal — quick class entry.
 * Students add their classes here. Exams are added later via the exam modal.
 */

(function () {
    'use strict';

    var DRAFT_KEY = 'semesterSetupDraft';
    var classes = [];
    var isEditMode = false;

    // Common nursing class names for autocomplete suggestions
    var COMMON_CLASSES = [
        // Fundamentals & Foundations
        'Fundamentals of Nursing',
        'Health Assessment',
        'Nursing Skills Lab',
        // Med-Surg
        'Med-Surg I',
        'Med-Surg II',
        'Med-Surg III',
        'Adult Health I',
        'Adult Health II',
        // Pharm & Patho
        'Pharmacology',
        'Pathophysiology',
        'Pharmacology & Pathophysiology',
        // Maternal & Peds
        'Maternity Nursing',
        'Pediatric Nursing',
        'Maternity & Pediatrics',
        'OB Nursing',
        'Women\'s Health Nursing',
        // Mental Health
        'Mental Health Nursing',
        'Psychiatric Nursing',
        'Psych Nursing',
        // Community & Leadership
        'Community Health Nursing',
        'Public Health Nursing',
        'Nursing Leadership',
        'Nursing Management',
        'Nursing Leadership & Management',
        // Critical Care & Emergency
        'Critical Care Nursing',
        'ICU Nursing',
        'Emergency Nursing',
        // Other common
        'Nutrition',
        'Ethics in Nursing',
        'Evidence-Based Practice',
        'Nursing Research',
        'Gerontology',
        'Anatomy & Physiology I',
        'Anatomy & Physiology II',
        'Microbiology',
        'NCLEX Review'
    ];

    // ── Modal open/close ────────────────────────────────────

    window.openSemesterModal = async function () {
        var overlay = document.getElementById('semester-modal-overlay');
        if (!overlay) return;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Try to load existing data
        try {
            var setupRes = await apiCall('/api/semester/setup');
            if (setupRes && setupRes.has_setup && setupRes.classes && setupRes.classes.length > 0) {
                // Edit mode — populate from existing data
                isEditMode = true;
                classes = setupRes.classes.map(function (cls) {
                    return {
                        id: cls.id,
                        class_name: cls.class_name || '',
                        instructor: cls.instructor || '',
                        semester: cls.semester || '',
                        exams: (cls.exams || []).map(function (e) {
                            return {
                                id: e.id,
                                exam_name: e.exam_name || '',
                                exam_date: e.exam_date || '',
                                topics: e.topics || [],
                                is_completed: e.is_completed || false
                            };
                        }),
                        source: 'existing'
                    };
                });

                // Set semester dropdown
                var semSelect = document.getElementById('sm-semester-select');
                if (semSelect && classes[0].semester) {
                    semSelect.value = classes[0].semester;
                }

                var title = document.getElementById('sm-step-1-title');
                if (title) title.textContent = 'Edit Your Classes';
            } else {
                // New setup — check for saved draft first
                isEditMode = false;
                var draft = loadDraft();
                if (draft && draft.classes && draft.classes.length > 0) {
                    classes = draft.classes;
                    var semSelect = document.getElementById('sm-semester-select');
                    if (semSelect && draft.semester) semSelect.value = draft.semester;
                } else {
                    classes = [createEmptyClass()];
                }
                var title = document.getElementById('sm-step-1-title');
                if (title) title.textContent = 'Add Your Classes';
            }
        } catch (err) {
            console.error('[Semester] Failed to load existing data:', err);
            isEditMode = false;
            if (classes.length === 0) classes = [createEmptyClass()];
        }

        showPanel('sm-step-1');
    };

    window.closeSemesterModal = function () {
        var overlay = document.getElementById('semester-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        on('open-semester-modal-btn', 'click', openSemesterModal);
        on('edit-semester-link', 'click', function (e) {
            e.preventDefault();
            openSemesterModal();
        });
        on('semester-modal-close', 'click', closeSemesterModal);

        var overlay = document.getElementById('semester-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeSemesterModal();
            });
        }

        on('sm-to-step-2', 'click', handleSave);
        on('sm-add-class', 'click', addEmptyClass);
        on('sm-start-over', 'click', resetWizard);
        on('sm-clear-all', 'click', handleClearAll);
        on('sm-done', 'click', function () {
            closeSemesterModal();
            if (typeof loadStudyPlan === 'function') loadStudyPlan();
            if (typeof loadExamCountdown === 'function') loadExamCountdown();
        });
    });

    // ── Navigation ─────────────────────────────────���────────

    function showPanel(panelId) {
        ['sm-step-1', 'sm-step-success'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        var panel = document.getElementById(panelId);
        if (panel) panel.classList.remove('hidden');

        var startOver = document.getElementById('sm-start-over');
        if (startOver) {
            startOver.classList.toggle('hidden', classes.length <= 1 && panelId === 'sm-step-1');
        }

        // Show "Clear All" only in edit mode on step 1
        var clearAll = document.getElementById('sm-clear-all');
        if (clearAll) {
            clearAll.classList.toggle('hidden', !isEditMode || panelId !== 'sm-step-1');
        }

        if (panelId === 'sm-step-1') renderClassesEditor();

        var modal = document.querySelector('.semester-modal');
        if (modal) modal.scrollTop = 0;
    }

    function resetWizard() {
        classes = [createEmptyClass()];
        isEditMode = false;
        var title = document.getElementById('sm-step-1-title');
        if (title) title.textContent = 'Add Your Classes';
        showPanel('sm-step-1');
    }

    async function handleClearAll() {
        var confirmed = typeof showConfirm === 'function'
            ? await showConfirm('Clear All Classes', 'This will remove all your classes, exams, and study plan. Are you sure?', 'warning')
            : confirm('This will remove all your classes, exams, and study plan. Are you sure?');

        if (!confirmed) return;

        try {
            await apiCall('/api/semester/clear', { method: 'DELETE' });
            clearDraft();
            closeSemesterModal();
            if (typeof loadStudyPlan === 'function') loadStudyPlan();
            if (typeof loadExamCountdown === 'function') loadExamCountdown();
            classes = [];
            isEditMode = false;
        } catch (err) {
            console.error('[Semester] Clear failed:', err);
            if (typeof showAlert === 'function') {
                showAlert('Error', 'Failed to clear semester data.', 'error');
            }
        }
    }

    // ── Step 1: Add Classes & Exams ─────────────────────────

    function renderClassesEditor() {
        var container = document.getElementById('sm-classes-editor');
        if (!container) return;
        var html = '';

        classes.forEach(function (cls, ci) {
            html += '<div class="sm-class-card">';
            html += '<div class="sm-cc-header">';
            html += '<input type="text" class="sm-cc-name" value="' + attr(cls.class_name) + '" placeholder="Search or type a class name" data-field="class_name" data-ci="' + ci + '" list="sm-class-options" autocomplete="off">';
            if (classes.length > 1) {
                html += '<button class="sm-cc-delete" data-del-class="' + ci + '" title="Remove class"><i class="fas fa-trash-alt"></i></button>';
            }
            html += '</div>';
            html += '</div>';
        });

        // Add datalist for class name suggestions (once)
        html += '<datalist id="sm-class-options">';
        COMMON_CLASSES.forEach(function (name) {
            html += '<option value="' + attr(name) + '">';
        });
        html += '</datalist>';

        container.innerHTML = html;
        attachEditorListeners(container);
    }

    function attachEditorListeners(c) {
        c.querySelectorAll('.sm-cc-name').forEach(function (el) {
            el.addEventListener('change', function () {
                classes[parseInt(this.dataset.ci, 10)][this.dataset.field] = this.value.trim();
                saveDraft();
            });
        });
        c.querySelectorAll('[data-del-class]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                classes.splice(parseInt(this.dataset.delClass, 10), 1);
                renderClassesEditor();
            });
        });
    }

    function addEmptyClass() {
        syncInputs();
        classes.push(createEmptyClass());
        renderClassesEditor();
        // Scroll to the new class
        var container = document.getElementById('sm-classes-editor');
        if (container) container.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function createEmptyClass() {
        return { class_name: '', instructor: '', semester: '', exams: [{ exam_name: '', exam_date: '', topics: [] }], source: 'manual' };
    }

    function syncInputs() {
        document.querySelectorAll('.sm-cc-name').forEach(function (el) {
            classes[parseInt(el.dataset.ci, 10)].class_name = el.value.trim();
        });
    }

    // ── Save: Validate → Auto-match → Save ────────────────

    async function handleSave() {
        syncInputs();

        // Filter out classes with no name
        classes = classes.filter(function (c) { return c.class_name.trim(); });
        if (!classes.length) {
            if (typeof showAlert === 'function') {
                showAlert('Missing Info', 'Please enter at least one class name.', 'warning');
            } else {
                alert('Please enter at least one class name.');
            }
            return;
        }

        // Show saving state on button
        var btn = document.getElementById('sm-to-step-2');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        }

        var semSelect = document.getElementById('sm-semester-select');
        var semester = semSelect ? semSelect.value : '';

        // Save classes only (no exams — those are added via the exam modal)
        var payload = classes.map(function (cls) {
            return {
                class_name: cleanClassName(cls.class_name),
                instructor: cls.instructor || '',
                semester: semester,
                exams: []
            };
        });

        try {
            await apiCall('/api/semester/confirm-syllabus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classes: payload })
            });

            clearDraft();
            showPanel('sm-step-success');

        } catch (err) {
            console.error('[Semester] Save failed:', err);
            if (typeof showAlert === 'function') {
                showAlert('Save Failed', 'Something went wrong. Please try again.', 'error');
            } else {
                alert('Failed to save. Please try again.');
            }
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check"></i> Save Classes';
            }
        }
    }

    // ── Text cleanup ────────────────────────────────────────

    function cleanClassName(name) {
        // Trim extra spaces
        name = name.replace(/\s+/g, ' ').trim();
        if (!name) return '';

        // If it matches a known class (case-insensitive), use the canonical version
        var lower = name.toLowerCase();
        for (var i = 0; i < COMMON_CLASSES.length; i++) {
            if (COMMON_CLASSES[i].toLowerCase() === lower) return COMMON_CLASSES[i];
        }

        // Title case: capitalize first letter of each word, preserve Roman numerals & acronyms
        return name.replace(/\b\w+/g, function (word) {
            // Preserve all-caps words (II, III, IV, ICU, OB, NCLEX, etc.)
            if (word === word.toUpperCase() && word.length <= 5) return word;
            // Lowercase connectors
            if (['and', 'of', 'in', 'the', 'for'].indexOf(word.toLowerCase()) !== -1) return word.toLowerCase();
            // Capitalize first letter
            return word.charAt(0).toUpperCase() + word.slice(1);
        // Ensure first word is always capitalized
        }).replace(/^(\w)/, function (c) { return c.toUpperCase(); });
    }

    // ── Helpers ──────────────────────────────────────────────

    function on(id, event, handler) {
        var el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    }

    function esc(s) {
        var d = document.createElement('div');
        d.textContent = s || '';
        return d.innerHTML;
    }

    function attr(s) {
        return (s || '').replace(/"/g, '&quot;');
    }

    function saveDraft() {
        try {
            syncInputs();
            var semEl = document.getElementById('sm-semester-select');
            localStorage.setItem(DRAFT_KEY, JSON.stringify({
                classes: classes,
                semester: semEl ? semEl.value : '',
                ts: Date.now()
            }));
        } catch (e) { /* quota exceeded, ignore */ }
    }

    function loadDraft() {
        try {
            var raw = localStorage.getItem(DRAFT_KEY);
            if (!raw) return null;
            var draft = JSON.parse(raw);
            // Expire drafts older than 7 days
            if (Date.now() - (draft.ts || 0) > 7 * 86400000) {
                localStorage.removeItem(DRAFT_KEY);
                return null;
            }
            return draft;
        } catch (e) { return null; }
    }

    function clearDraft() {
        localStorage.removeItem(DRAFT_KEY);
    }

})();
