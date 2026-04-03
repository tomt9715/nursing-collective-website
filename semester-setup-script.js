/**
 * Semester Setup Modal — 2-step manual entry wizard.
 * Step 1: Add classes with exams (name, date, topics)
 * Step 2: Confirm topic-to-guide mappings
 */

(function () {
    'use strict';

    var DRAFT_KEY = 'semesterSetupDraft';
    var classes = [];
    var guideMappings = {};
    var isEditMode = false;

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
        guideMappings = {};
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
            guideMappings = {};
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
            html += '<input type="text" class="sm-cc-name" value="' + attr(cls.class_name) + '" placeholder="Class name (e.g. Med-Surg I)" data-field="class_name" data-ci="' + ci + '">';
            if (classes.length > 1) {
                html += '<button class="sm-cc-delete" data-del-class="' + ci + '" title="Remove class"><i class="fas fa-trash-alt"></i></button>';
            }
            html += '</div>';

            html += '<div class="sm-cc-exams"><h4>Exams</h4>';

            (cls.exams || []).forEach(function (exam, ei) {
                html += '<div class="sm-exam-row" data-ci="' + ci + '" data-ei="' + ei + '">';
                html += '<div class="sm-exam-top">';
                html += '<input type="text" class="sm-exam-name" value="' + attr(exam.exam_name) + '" placeholder="Exam name (e.g. Exam 1)" data-field="exam_name">';
                html += '<input type="date" class="sm-exam-date" value="' + attr(exam.exam_date || '') + '" data-field="exam_date">';
                html += '<button class="sm-exam-delete" data-del-exam="' + ci + '-' + ei + '" title="Remove exam"><i class="fas fa-times"></i></button>';
                html += '</div>';
                html += '<div class="sm-exam-topics"><label>Topics on this exam:</label>';
                html += '<div class="sm-topic-tags">';
                (exam.topics || []).forEach(function (t, ti) {
                    html += '<span class="sm-topic-tag">' + esc(t) + '<button class="sm-topic-rm" data-rm="' + ci + '-' + ei + '-' + ti + '">&times;</button></span>';
                });
                html += '<input type="text" class="sm-topic-input" placeholder="Type a topic + Enter" data-ci="' + ci + '" data-ei="' + ei + '">';
                html += '</div>';
                html += '<div class="sm-topic-upload" data-ci="' + ci + '" data-ei="' + ei + '">';
                html += '<input type="file" class="sm-topic-file" accept=".pdf,.docx" hidden>';
                html += '<i class="fas fa-cloud-arrow-up"></i> ';
                html += '<span>Drop review sheet or <u>browse</u></span>';
                html += '</div>';
                html += '</div></div>';
            });

            html += '<button class="sm-add-exam" data-add-exam="' + ci + '"><i class="fas fa-plus"></i> Add Exam</button>';
            html += '</div></div>';
        });

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
        c.querySelectorAll('.sm-exam-name, .sm-exam-date').forEach(function (el) {
            el.addEventListener('change', function () {
                var row = this.closest('.sm-exam-row');
                classes[parseInt(row.dataset.ci, 10)].exams[parseInt(row.dataset.ei, 10)][this.dataset.field] = this.value.trim();
                saveDraft();
            });
        });
        c.querySelectorAll('[data-del-class]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                classes.splice(parseInt(this.dataset.delClass, 10), 1);
                renderClassesEditor();
            });
        });
        c.querySelectorAll('[data-del-exam]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var p = this.dataset.delExam.split('-');
                classes[parseInt(p[0], 10)].exams.splice(parseInt(p[1], 10), 1);
                renderClassesEditor();
            });
        });
        c.querySelectorAll('[data-add-exam]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                classes[parseInt(this.dataset.addExam, 10)].exams.push({ exam_name: '', exam_date: '', topics: [] });
                renderClassesEditor();
            });
        });
        c.querySelectorAll('.sm-topic-rm').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var p = this.dataset.rm.split('-');
                classes[parseInt(p[0], 10)].exams[parseInt(p[1], 10)].topics.splice(parseInt(p[2], 10), 1);
                renderClassesEditor();
            });
        });
        c.querySelectorAll('.sm-exam-date').forEach(function (el) {
            checkPastDate(el);
            el.addEventListener('change', function () {
                checkPastDate(this);
            });
        });
        c.querySelectorAll('.sm-topic-input').forEach(function (el) {
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    e.preventDefault();
                    classes[parseInt(this.dataset.ci, 10)].exams[parseInt(this.dataset.ei, 10)].topics.push(this.value.trim());
                    saveDraft();
                    renderClassesEditor();
                }
            });
        });

        // Review sheet upload zones
        c.querySelectorAll('.sm-topic-upload').forEach(function (zone) {
            var fileInput = zone.querySelector('.sm-topic-file');
            var ci = parseInt(zone.dataset.ci, 10);
            var ei = parseInt(zone.dataset.ei, 10);

            zone.addEventListener('click', function () { fileInput.click(); });

            fileInput.addEventListener('change', function () {
                if (this.files.length > 0) handleReviewSheetUpload(this.files[0], ci, ei, zone);
            });

            zone.addEventListener('dragover', function (e) {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            zone.addEventListener('dragleave', function () {
                zone.classList.remove('drag-over');
            });
            zone.addEventListener('drop', function (e) {
                e.preventDefault();
                zone.classList.remove('drag-over');
                if (e.dataTransfer.files.length > 0) {
                    handleReviewSheetUpload(e.dataTransfer.files[0], ci, ei, zone);
                }
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
        document.querySelectorAll('.sm-exam-name, .sm-exam-date').forEach(function (el) {
            var row = el.closest('.sm-exam-row');
            if (row) {
                classes[parseInt(row.dataset.ci, 10)].exams[parseInt(row.dataset.ei, 10)][el.dataset.field] = el.value.trim();
            }
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

        // Collect all unique topics for auto-matching
        var allTopics = [];
        classes.forEach(function (cls) {
            (cls.exams || []).forEach(function (exam) {
                (exam.topics || []).forEach(function (t) {
                    if (allTopics.indexOf(t) === -1) allTopics.push(t);
                });
            });
        });

        // Auto-match topics to guides (silent, no user review)
        guideMappings = {};
        if (allTopics.length) {
            try {
                var data = await apiCall('/api/semester/map-topics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topics: allTopics })
                });
                guideMappings = data.mappings || {};
            } catch (err) {
                console.error('[Semester] Auto-matching failed (saving without mappings):', err);
            }
        }

        await doSave(btn);
    }

    async function doSave(btn) {
        var semSelect = document.getElementById('sm-semester-select');
        var semester = semSelect ? semSelect.value : '';

        var payload = classes.map(function (cls) {
            return {
                class_name: cls.class_name,
                instructor: cls.instructor,
                semester: semester,
                exams: (cls.exams || []).map(function (exam) {
                    var em = {};
                    (exam.topics || []).forEach(function (t) {
                        var m = guideMappings[t];
                        if (m && m.guide_id) em[t] = m.guide_id;
                    });
                    return { exam_name: exam.exam_name, exam_date: exam.exam_date || null, topics: exam.topics || [], guide_mappings: em };
                })
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
                btn.innerHTML = '<i class="fas fa-check"></i> Save & Get My Plan';
            }
        }
    }

    // ── Review sheet topic extraction ────────────────────────

    async function handleReviewSheetUpload(file, ci, ei, zone) {
        // Validate file type
        var ext = file.name.split('.').pop().toLowerCase();
        if (ext !== 'pdf' && ext !== 'docx') {
            showUploadError(zone, 'Only PDF and DOCX files');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showUploadError(zone, 'File too large (max 10MB)');
            return;
        }

        // Show extracting state
        zone.classList.add('extracting');
        zone.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Extracting topics...</span>';

        try {
            var token = localStorage.getItem('auth_token');
            var formData = new FormData();
            formData.append('file', file);

            var API_URL = (typeof apiService !== 'undefined' && apiService.baseUrl)
                ? apiService.baseUrl
                : (typeof window.API_BASE_URL === 'string' ? window.API_BASE_URL : '');

            var response = await fetch(API_URL + '/api/semester/extract-topics', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                body: formData
            });

            var data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Extraction failed');
            }

            var topics = data.topics || [];
            if (topics.length === 0) {
                showUploadError(zone, 'No topics found in file');
                return;
            }

            // Add extracted topics (skip duplicates)
            var existing = classes[ci].exams[ei].topics || [];
            var existingLower = existing.map(function (t) { return t.toLowerCase(); });
            var added = 0;
            topics.forEach(function (t) {
                if (existingLower.indexOf(t.toLowerCase()) === -1) {
                    existing.push(t);
                    existingLower.push(t.toLowerCase());
                    added++;
                }
            });
            classes[ci].exams[ei].topics = existing;
            saveDraft();

            // Brief success state, then re-render
            zone.classList.remove('extracting');
            zone.classList.add('done');
            zone.innerHTML = '<i class="fas fa-check"></i> <span>' + added + ' topic' + (added === 1 ? '' : 's') + ' added</span>';
            setTimeout(function () { renderClassesEditor(); }, 1200);

        } catch (err) {
            console.error('[Semester] Topic extraction failed:', err);
            showUploadError(zone, err.message || 'Could not read file');
        }
    }

    function showUploadError(zone, msg) {
        zone.classList.remove('extracting');
        zone.classList.add('error');
        zone.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span>' + esc(msg) + '</span>';
        setTimeout(function () { renderClassesEditor(); }, 2500);
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

    function checkPastDate(el) {
        var existing = el.parentElement.querySelector('.sm-past-date-warn');
        if (existing) existing.remove();

        if (!el.value) return;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var picked = new Date(el.value + 'T00:00:00');
        if (picked < today) {
            var warn = document.createElement('span');
            warn.className = 'sm-past-date-warn';
            warn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Past date';
            el.parentElement.appendChild(warn);
        }
    }

})();
