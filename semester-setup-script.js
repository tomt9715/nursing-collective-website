/**
 * Semester Setup Wizard — 3-step flow:
 * Step 1: Add classes
 * Step 2: Add exams per class (with blueprint upload)
 * Step 3: Done — summary + Start Studying
 */

(function () {
    'use strict';

    var DRAFT_KEY = 'semesterSetupDraft';
    var classes = [];
    var isEditMode = false;
    var savedClasses = []; // {id, class_name} after Step 1 save
    var examEntries = {};  // classId → [{name, date, topics, file}]

    // Common nursing class names for autocomplete suggestions
    var COMMON_CLASSES = [
        'Fundamentals of Nursing', 'Health Assessment', 'Nursing Skills Lab',
        'Med-Surg I', 'Med-Surg II', 'Med-Surg III', 'Adult Health I', 'Adult Health II',
        'Pharmacology', 'Pathophysiology', 'Pharmacology & Pathophysiology',
        'Maternity Nursing', 'Pediatric Nursing', 'Maternity & Pediatrics',
        'OB Nursing', 'Women\'s Health Nursing',
        'Mental Health Nursing', 'Psychiatric Nursing', 'Psych Nursing',
        'Community Health Nursing', 'Public Health Nursing',
        'Nursing Leadership', 'Nursing Management', 'Nursing Leadership & Management',
        'Critical Care Nursing', 'ICU Nursing', 'Emergency Nursing',
        'Nutrition', 'Ethics in Nursing', 'Evidence-Based Practice',
        'Nursing Research', 'Gerontology',
        'Anatomy & Physiology I', 'Anatomy & Physiology II', 'Microbiology', 'NCLEX Review'
    ];

    // ── Modal open/close ────────────────────────────────────

    window.openSemesterModal = async function () {
        var overlay = document.getElementById('semester-modal-overlay');
        if (!overlay) return;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        try {
            var setupRes = await apiCall('/api/semester/setup');
            if (setupRes && setupRes.has_setup && setupRes.classes && setupRes.classes.length > 0) {
                isEditMode = true;
                classes = setupRes.classes.map(function (cls) {
                    return {
                        id: cls.id,
                        class_name: cls.class_name || '',
                        instructor: cls.instructor || '',
                        semester: cls.semester || '',
                        exams: (cls.exams || []).map(function (e) {
                            return {
                                id: e.id, exam_name: e.exam_name || '',
                                exam_date: e.exam_date || '', topics: e.topics || [],
                                is_completed: e.is_completed || false
                            };
                        }),
                        source: 'existing'
                    };
                });
                var semSelect = document.getElementById('sm-semester-select');
                if (semSelect && classes[0].semester) semSelect.value = classes[0].semester;
                var title = document.getElementById('sm-step-1-title');
                if (title) title.textContent = 'Edit Your Classes';
            } else {
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
            console.error('[Semester] Failed to load:', err);
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
        on('edit-semester-link', 'click', function (e) { e.preventDefault(); openSemesterModal(); });
        on('semester-modal-close', 'click', closeSemesterModal);

        var overlay = document.getElementById('semester-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeSemesterModal();
            });
        }

        on('sm-to-step-2', 'click', handleSaveClasses);
        on('sm-add-class', 'click', addEmptyClass);
        on('sm-start-over', 'click', resetWizard);
        on('sm-clear-all', 'click', handleClearAll);
        on('sm-back-to-step-1', 'click', function () { showPanel('sm-step-1'); });
        on('sm-to-step-3', 'click', handleFinishSetup);
        on('sm-skip-exams', 'click', function () { showSuccessPanel(0); });
        on('sm-done', 'click', function () {
            closeSemesterModal();
            if (typeof loadStudyPlan === 'function') loadStudyPlan();
            if (typeof loadExamCountdown === 'function') loadExamCountdown();
        });
    });

    // ── Navigation ──────────────────────────────────────────

    var ALL_PANELS = ['sm-step-1', 'sm-step-2', 'sm-step-success'];
    var STEP_MAP = { 'sm-step-1': 1, 'sm-step-2': 2, 'sm-step-success': 3 };

    function showPanel(panelId) {
        ALL_PANELS.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        var panel = document.getElementById(panelId);
        if (panel) panel.classList.remove('hidden');

        // Update step indicator
        var currentStep = STEP_MAP[panelId] || 1;
        updateStepIndicator(currentStep);

        // Show/hide buttons based on panel
        var startOver = document.getElementById('sm-start-over');
        if (startOver) startOver.classList.toggle('hidden', classes.length <= 1 && panelId === 'sm-step-1');

        var clearAll = document.getElementById('sm-clear-all');
        if (clearAll) clearAll.classList.toggle('hidden', !isEditMode || panelId !== 'sm-step-1');

        if (panelId === 'sm-step-1') renderClassesEditor();
        if (panelId === 'sm-step-2') renderExamsEditor();

        var modal = document.querySelector('.semester-modal');
        if (modal) modal.scrollTop = 0;
    }

    function updateStepIndicator(currentStep) {
        var dots = document.querySelectorAll('.sm-step-dot');
        var lines = document.querySelectorAll('.sm-step-line');

        dots.forEach(function (dot) {
            var step = parseInt(dot.dataset.step, 10);
            dot.classList.remove('active', 'completed');
            if (step === currentStep) dot.classList.add('active');
            else if (step < currentStep) dot.classList.add('completed');
        });

        lines.forEach(function (line, i) {
            line.classList.toggle('completed', (i + 1) < currentStep);
        });
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
            if (typeof showAlert === 'function') showAlert('Error', 'Failed to clear semester data.', 'error');
        }
    }

    // ── Step 1: Add Classes ─────────────────────────────────

    function renderClassesEditor() {
        var container = document.getElementById('sm-classes-editor');
        if (!container) return;
        var html = '';
        classes.forEach(function (cls, ci) {
            html += '<div class="sm-class-card">';
            html += '<div class="sm-cc-header">';
            html += '<div class="sm-cc-name-wrap">';
            html += '<input type="text" class="sm-cc-name" value="' + attr(cls.class_name) + '" placeholder="Start typing a class name..." data-field="class_name" data-ci="' + ci + '" autocomplete="off">';
            html += '<div class="sm-cc-suggest" id="sm-suggest-' + ci + '"></div>';
            html += '</div>';
            if (classes.length > 1) {
                html += '<button class="sm-cc-delete" data-del-class="' + ci + '" title="Remove class"><i class="fas fa-trash-alt"></i></button>';
            }
            html += '</div></div>';
        });
        container.innerHTML = html;
        attachEditorListeners(container);
    }

    function attachEditorListeners(c) {
        c.querySelectorAll('.sm-cc-name').forEach(function (el) {
            var ci = parseInt(el.dataset.ci, 10);
            var suggestBox = document.getElementById('sm-suggest-' + ci);

            el.addEventListener('input', function () {
                var val = this.value.trim().toLowerCase();
                if (val.length < 2) { if (suggestBox) suggestBox.innerHTML = ''; return; }

                var matches = COMMON_CLASSES.filter(function (name) {
                    return name.toLowerCase().indexOf(val) !== -1;
                }).slice(0, 6);

                if (matches.length === 0 || (matches.length === 1 && matches[0].toLowerCase() === val)) {
                    if (suggestBox) suggestBox.innerHTML = '';
                    return;
                }

                var html = '';
                matches.forEach(function (name) {
                    html += '<div class="sm-cc-suggest-item" data-value="' + attr(name) + '">' + esc(name) + '</div>';
                });
                if (suggestBox) suggestBox.innerHTML = html;

                suggestBox.querySelectorAll('.sm-cc-suggest-item').forEach(function (item) {
                    item.addEventListener('mousedown', function (e) {
                        e.preventDefault();
                        el.value = this.dataset.value;
                        classes[ci].class_name = this.dataset.value;
                        suggestBox.innerHTML = '';
                        saveDraft();
                    });
                });
            });

            el.addEventListener('blur', function () {
                classes[ci].class_name = this.value.trim();
                saveDraft();
                setTimeout(function () { if (suggestBox) suggestBox.innerHTML = ''; }, 150);
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
        var container = document.getElementById('sm-classes-editor');
        if (container) container.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function createEmptyClass() {
        return { class_name: '', instructor: '', semester: '', exams: [], source: 'manual' };
    }

    function syncInputs() {
        document.querySelectorAll('.sm-cc-name').forEach(function (el) {
            classes[parseInt(el.dataset.ci, 10)].class_name = el.value.trim();
        });
    }

    // ── Step 1 → Step 2: Save Classes ───────────────────────

    async function handleSaveClasses() {
        syncInputs();
        classes = classes.filter(function (c) { return c.class_name.trim(); });
        if (!classes.length) {
            if (typeof showAlert === 'function') showAlert('Missing Info', 'Please enter at least one class name.', 'warning');
            else alert('Please enter at least one class name.');
            return;
        }

        var btn = document.getElementById('sm-to-step-2');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'; }

        var semSelect = document.getElementById('sm-semester-select');
        var semester = semSelect ? semSelect.value : '';

        var payload = classes.map(function (cls) {
            return {
                class_name: cleanClassName(cls.class_name),
                instructor: cls.instructor || '',
                semester: semester,
                exams: []
            };
        });

        try {
            var response = await apiCall('/api/semester/confirm-syllabus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classes: payload })
            });

            clearDraft();

            // Fetch the saved classes with their IDs
            var setupRes = await apiCall('/api/semester/setup');
            savedClasses = (setupRes.classes || []).map(function (c) {
                return { id: c.id, class_name: c.class_name };
            });

            // Initialize empty exam entries per class
            examEntries = {};
            savedClasses.forEach(function (c) {
                examEntries[c.id] = [{ name: '', date: '', topics: [], uploading: false }];
            });

            showPanel('sm-step-2');

        } catch (err) {
            console.error('[Semester] Save failed:', err);
            if (typeof showAlert === 'function') showAlert('Save Failed', 'Something went wrong. Please try again.', 'error');
            else alert('Failed to save. Please try again.');
        }

        if (btn) { btn.disabled = false; btn.innerHTML = 'Next: Add Exams <i class="fas fa-arrow-right"></i>'; }
    }

    // ── Step 2: Add Exams Per Class ─────────────────────────

    function renderExamsEditor() {
        var container = document.getElementById('sm-exams-editor');
        if (!container) return;

        var html = '';
        savedClasses.forEach(function (cls) {
            var entries = examEntries[cls.id] || [];
            html += '<div class="sm-exam-card" data-class-id="' + cls.id + '">';
            html += '<div class="sm-exam-card-header">';
            html += '<span class="sm-exam-class-name">' + esc(cls.class_name) + '</span>';
            html += '<button class="sm-add-exam-in-class" data-add-for="' + cls.id + '"><i class="fas fa-plus"></i> Add Exam</button>';
            html += '</div>';
            html += '<div class="sm-exam-entries" id="sm-exams-for-' + cls.id + '">';

            entries.forEach(function (entry, ei) {
                html += buildExamEntry(cls.id, ei, entry);
            });

            html += '</div></div>';
        });

        container.innerHTML = html;
        attachExamListeners();
    }

    function buildExamEntry(classId, idx, entry) {
        var html = '<div class="sm-exam-entry" data-class-id="' + classId + '" data-exam-idx="' + idx + '">';
        html += '<div class="sm-exam-entry-row">';
        html += '<input type="text" class="sm-exam-name-input" placeholder="Exam name (e.g. Exam 1, Midterm)" value="' + attr(entry.name) + '">';
        html += '<input type="date" class="sm-exam-date-input" value="' + attr(entry.date) + '">';

        var entries = examEntries[classId] || [];
        if (entries.length > 1) {
            html += '<button class="sm-exam-entry-remove" data-remove-class="' + classId + '" data-remove-idx="' + idx + '" title="Remove"><i class="fas fa-times"></i></button>';
        }

        html += '</div>';

        // Upload zone
        html += '<div class="sm-exam-upload-zone" data-upload-class="' + classId + '" data-upload-idx="' + idx + '">';
        html += '<input type="file" class="sm-exam-file-input" accept=".pdf,.docx" hidden>';
        if (entry.uploading) {
            html += '<i class="fas fa-spinner fa-spin"></i> Extracting topics...';
        } else {
            html += '<i class="fas fa-cloud-arrow-up"></i> Drop exam blueprint or <u>browse</u>';
        }
        html += '</div>';

        // Topics preview
        if (entry.topics && entry.topics.length > 0) {
            html += '<div class="sm-exam-topics-preview">';
            entry.topics.forEach(function (t) {
                html += '<span class="sm-exam-topic-chip">' + esc(t) + '</span>';
            });
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    function attachExamListeners() {
        // Add exam buttons
        document.querySelectorAll('.sm-add-exam-in-class').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var classId = parseInt(this.dataset.addFor, 10);
                syncExamInputs();
                if (!examEntries[classId]) examEntries[classId] = [];
                examEntries[classId].push({ name: '', date: '', topics: [], uploading: false });
                renderExamsEditor();
            });
        });

        // Remove exam buttons
        document.querySelectorAll('.sm-exam-entry-remove').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var classId = parseInt(this.dataset.removeClass, 10);
                var idx = parseInt(this.dataset.removeIdx, 10);
                syncExamInputs();
                if (examEntries[classId]) examEntries[classId].splice(idx, 1);
                renderExamsEditor();
            });
        });

        // Upload zones — click to browse
        document.querySelectorAll('.sm-exam-upload-zone').forEach(function (zone) {
            var fileInput = zone.querySelector('.sm-exam-file-input');
            zone.addEventListener('click', function () { if (fileInput) fileInput.click(); });

            if (fileInput) {
                fileInput.addEventListener('change', function () {
                    if (this.files && this.files[0]) {
                        var classId = parseInt(zone.dataset.uploadClass, 10);
                        var idx = parseInt(zone.dataset.uploadIdx, 10);
                        handleBlueprintUpload(this.files[0], classId, idx);
                    }
                });
            }

            // Drag and drop
            zone.addEventListener('dragover', function (e) { e.preventDefault(); this.classList.add('drag-over'); });
            zone.addEventListener('dragleave', function () { this.classList.remove('drag-over'); });
            zone.addEventListener('drop', function (e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    var classId = parseInt(zone.dataset.uploadClass, 10);
                    var idx = parseInt(zone.dataset.uploadIdx, 10);
                    handleBlueprintUpload(e.dataTransfer.files[0], classId, idx);
                }
            });
        });
    }

    function syncExamInputs() {
        document.querySelectorAll('.sm-exam-entry').forEach(function (entry) {
            var classId = parseInt(entry.dataset.classId, 10);
            var idx = parseInt(entry.dataset.examIdx, 10);
            if (!examEntries[classId] || !examEntries[classId][idx]) return;
            var nameInput = entry.querySelector('.sm-exam-name-input');
            var dateInput = entry.querySelector('.sm-exam-date-input');
            if (nameInput) examEntries[classId][idx].name = nameInput.value.trim();
            if (dateInput) examEntries[classId][idx].date = dateInput.value;
        });
    }

    async function handleBlueprintUpload(file, classId, idx) {
        var ext = file.name.split('.').pop().toLowerCase();
        if (['pdf', 'docx'].indexOf(ext) === -1) {
            if (typeof showAlert === 'function') showAlert('Invalid File', 'Please upload a PDF or DOCX file.', 'warning');
            return;
        }

        syncExamInputs();
        if (examEntries[classId] && examEntries[classId][idx]) {
            examEntries[classId][idx].uploading = true;
        }
        renderExamsEditor();

        try {
            var formData = new FormData();
            formData.append('file', file);

            var token = localStorage.getItem('accessToken');
            var headers = {};
            if (token) headers['Authorization'] = 'Bearer ' + token;

            var response = await fetch(
                (typeof API_URL !== 'undefined' ? API_URL : '') + '/api/semester/extract-topics',
                { method: 'POST', headers: headers, body: formData, credentials: 'include' }
            );

            var data = await response.json();

            if (response.ok && data.topics) {
                if (examEntries[classId] && examEntries[classId][idx]) {
                    // Merge new topics with existing (deduplicate)
                    var existing = examEntries[classId][idx].topics.map(function (t) { return t.toLowerCase(); });
                    data.topics.forEach(function (t) {
                        if (existing.indexOf(t.toLowerCase()) === -1) {
                            examEntries[classId][idx].topics.push(t);
                            existing.push(t.toLowerCase());
                        }
                    });
                    examEntries[classId][idx].uploading = false;
                }
            } else {
                if (examEntries[classId] && examEntries[classId][idx]) {
                    examEntries[classId][idx].uploading = false;
                }
                if (typeof showAlert === 'function') showAlert('Extraction Failed', data.error || 'Could not extract topics.', 'error');
            }
        } catch (err) {
            console.error('[Semester] Blueprint upload failed:', err);
            if (examEntries[classId] && examEntries[classId][idx]) {
                examEntries[classId][idx].uploading = false;
            }
        }

        renderExamsEditor();
    }

    // ── Step 2 → Step 3: Save Exams ─────────────────────────

    async function handleFinishSetup() {
        syncExamInputs();

        var btn = document.getElementById('sm-to-step-3');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'; }

        var examsSaved = 0;

        try {
            for (var classId in examEntries) {
                var entries = examEntries[classId];
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (!entry.name.trim()) continue; // Skip empty exam names

                    // Map topics to guides (silent, best-effort)
                    var guideMappings = {};
                    if (entry.topics.length > 0) {
                        try {
                            var mapRes = await apiCall('/api/semester/map-topics', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ topics: entry.topics })
                            });
                            if (mapRes && mapRes.mappings) {
                                for (var topic in mapRes.mappings) {
                                    var m = mapRes.mappings[topic];
                                    if (m && m.guide_id) guideMappings[topic] = m.guide_id;
                                }
                            }
                        } catch (e) {
                            console.warn('[Semester] Topic mapping failed:', e);
                        }
                    }

                    // Save exam
                    await apiCall('/api/semester/exams', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            class_id: parseInt(classId, 10),
                            exam_name: entry.name.trim(),
                            exam_date: entry.date || null,
                            topics: entry.topics,
                            guide_mappings: guideMappings
                        })
                    });
                    examsSaved++;
                }
            }
        } catch (err) {
            console.error('[Semester] Exam save failed:', err);
            if (typeof showAlert === 'function') showAlert('Save Failed', 'Some exams may not have saved. You can add them later from your dashboard.', 'error');
        }

        if (btn) { btn.disabled = false; btn.innerHTML = 'Finish Setup <i class="fas fa-check"></i>'; }

        showSuccessPanel(examsSaved);
    }

    function showSuccessPanel(examsSaved) {
        var summary = document.getElementById('sm-success-summary');
        if (summary) {
            var classCount = savedClasses.length;
            var text = classCount + ' class' + (classCount !== 1 ? 'es' : '');
            if (examsSaved > 0) {
                text += ' and ' + examsSaved + ' exam' + (examsSaved !== 1 ? 's' : '') + ' set up';
            } else {
                text += ' saved. You can add exams anytime from your dashboard.';
            }
            summary.textContent = text;
        }

        // Refresh widgets
        if (typeof loadStudyPlan === 'function') loadStudyPlan();
        if (typeof loadExamCountdown === 'function') loadExamCountdown();

        showPanel('sm-step-success');
    }

    // ── Text cleanup ────────────────────────────────────────

    function cleanClassName(name) {
        name = name.replace(/\s+/g, ' ').trim();
        if (!name) return '';

        var lower = name.toLowerCase();
        for (var i = 0; i < COMMON_CLASSES.length; i++) {
            if (COMMON_CLASSES[i].toLowerCase() === lower) return COMMON_CLASSES[i];
        }

        return name.replace(/\b\w+/g, function (word) {
            if (word === word.toUpperCase() && word.length <= 5) return word;
            if (['and', 'of', 'in', 'the', 'for'].indexOf(word.toLowerCase()) !== -1) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1);
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
        } catch (e) { /* quota exceeded */ }
    }

    function loadDraft() {
        try {
            var raw = localStorage.getItem(DRAFT_KEY);
            if (!raw) return null;
            var draft = JSON.parse(raw);
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
