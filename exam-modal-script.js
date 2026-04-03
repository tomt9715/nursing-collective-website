/**
 * Exam Modal — add/edit exams for a specific class.
 * Opened from the Exam Countdown widget or Study Plan widget.
 * Supports topic entry + review sheet upload with AI extraction.
 */

(function () {
    'use strict';

    var currentExam = null;   // { class_id, exam_id (null if new), exam_name, exam_date, topics }
    var currentClassId = null;
    var isEditing = false;

    // ── Open / Close ────────────────────────────────────────

    window.openExamModal = function (classId, examData) {
        var overlay = document.getElementById('exam-modal-overlay');
        if (!overlay) return;

        currentClassId = classId || null;
        isEditing = !!(examData && examData.exam_id);

        currentExam = {
            exam_id: (examData && examData.exam_id) || null,
            exam_name: (examData && examData.exam_name) || '',
            exam_date: (examData && examData.exam_date) || '',
            topics: (examData && examData.topics) || []
        };

        var title = document.getElementById('em-title');
        if (title) title.textContent = isEditing ? 'Edit Exam' : 'Add Exam';

        populateClassDropdown();
        renderExamForm();

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus the exam name input
        setTimeout(function () {
            var nameInput = document.getElementById('em-exam-name');
            if (nameInput && !isEditing) nameInput.focus();
        }, 200);
    };

    window.closeExamModal = function () {
        var overlay = document.getElementById('exam-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        currentExam = null;
        currentClassId = null;
    };

    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('exam-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeExamModal();
            });
        }
        on('em-close', 'click', closeExamModal);
        on('em-save', 'click', handleSaveExam);
        on('em-delete', 'click', handleDeleteExam);
    });

    // ── Populate class dropdown ─────────────────────────────

    async function populateClassDropdown() {
        var select = document.getElementById('em-class-select');
        if (!select) return;

        select.innerHTML = '<option value="">Loading...</option>';

        try {
            var setupRes = await apiCall('/api/semester/setup');
            if (!setupRes || !setupRes.classes || !setupRes.classes.length) {
                select.innerHTML = '<option value="">No classes found — set up your semester first</option>';
                return;
            }

            var html = '<option value="">Select a class</option>';
            setupRes.classes.forEach(function (cls) {
                var selected = cls.id === currentClassId ? ' selected' : '';
                html += '<option value="' + cls.id + '"' + selected + '>' + esc(cls.class_name) + '</option>';
            });
            select.innerHTML = html;

        } catch (err) {
            console.error('[ExamModal] Failed to load classes:', err);
            select.innerHTML = '<option value="">Failed to load classes</option>';
        }
    }

    // ── Render exam form ────────────────────────────────────

    function renderExamForm() {
        var nameInput = document.getElementById('em-exam-name');
        var dateInput = document.getElementById('em-exam-date');
        var deleteBtn = document.getElementById('em-delete');

        if (nameInput) nameInput.value = currentExam.exam_name;
        if (dateInput) dateInput.value = currentExam.exam_date;
        if (deleteBtn) deleteBtn.classList.toggle('hidden', !isEditing);

        renderTopics();
        checkPastDate(dateInput);

        // Date change listener
        if (dateInput && !dateInput._emWired) {
            dateInput._emWired = true;
            dateInput.addEventListener('change', function () {
                currentExam.exam_date = this.value;
                checkPastDate(this);
            });
        }

        // Name change listener
        if (nameInput && !nameInput._emWired) {
            nameInput._emWired = true;
            nameInput.addEventListener('change', function () {
                currentExam.exam_name = this.value.trim();
            });
        }
    }

    function renderTopics() {
        var container = document.getElementById('em-topic-tags');
        if (!container) return;

        var html = '';
        (currentExam.topics || []).forEach(function (t, i) {
            html += '<span class="sm-topic-tag">' + esc(t) +
                '<button class="sm-topic-rm" data-rm="' + i + '">&times;</button></span>';
        });
        html += '<input type="text" class="sm-topic-input" id="em-topic-input" placeholder="Type a topic + Enter, or upload a review sheet below">';

        container.innerHTML = html;

        // Topic remove
        container.querySelectorAll('.sm-topic-rm').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentExam.topics.splice(parseInt(this.dataset.rm, 10), 1);
                renderTopics();
            });
        });

        // Topic add on Enter
        var input = document.getElementById('em-topic-input');
        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    e.preventDefault();
                    currentExam.topics.push(this.value.trim());
                    renderTopics();
                }
            });
        }

        attachUploadListeners();
    }

    // ── Review sheet upload ─────────────────────────────────

    function attachUploadListeners() {
        var zone = document.getElementById('em-upload-zone');
        var fileInput = document.getElementById('em-upload-file');
        if (!zone || !fileInput || zone._emWired) return;
        zone._emWired = true;

        zone.addEventListener('click', function () { fileInput.click(); });

        fileInput.addEventListener('change', function () {
            if (this.files.length > 0) handleUpload(this.files[0]);
            this.value = '';
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
            if (e.dataTransfer.files.length > 0) handleUpload(e.dataTransfer.files[0]);
        });
    }

    async function handleUpload(file) {
        var zone = document.getElementById('em-upload-zone');
        if (!zone) return;

        // Validate
        var ext = file.name.split('.').pop().toLowerCase();
        if (ext !== 'pdf' && ext !== 'docx') {
            showUploadMsg(zone, 'error', 'Only PDF and DOCX files');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showUploadMsg(zone, 'error', 'File too large (max 10MB)');
            return;
        }

        // Extracting state
        zone.classList.add('extracting');
        zone.querySelector('.em-upload-text').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Extracting topics from ' + esc(file.name) + '...';

        try {
            var token = localStorage.getItem('accessToken');
            var formData = new FormData();
            formData.append('file', file);

            // Use global API_URL from api-service.js; don't use apiCall() since
            // it sets Content-Type: application/json which breaks FormData uploads
            var response = await fetch(API_URL + '/api/semester/extract-topics', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                body: formData
            });

            var data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Extraction failed');

            var topics = data.topics || [];
            if (topics.length === 0) {
                showUploadMsg(zone, 'error', 'No topics found in file');
                return;
            }

            // Add extracted topics (skip duplicates)
            var existingLower = currentExam.topics.map(function (t) { return t.toLowerCase(); });
            var added = 0;
            topics.forEach(function (t) {
                if (existingLower.indexOf(t.toLowerCase()) === -1) {
                    currentExam.topics.push(t);
                    existingLower.push(t.toLowerCase());
                    added++;
                }
            });

            renderTopics();

            var msg = added + ' topic' + (added === 1 ? '' : 's') + ' extracted';
            if (data.ai_processing) {
                msg += ' — generating study materials in the background';
            }
            showUploadMsg(zone, 'done', msg);

        } catch (err) {
            console.error('[ExamModal] Upload failed:', err);
            showUploadMsg(zone, 'error', err.message || 'Could not read file');
        }
    }

    function showUploadMsg(zone, state, msg) {
        zone.classList.remove('extracting', 'drag-over');
        zone.classList.add(state);
        zone.querySelector('.em-upload-text').innerHTML = '<i class="fas fa-' +
            (state === 'done' ? 'check' : 'exclamation-circle') + '"></i> ' + msg;

        setTimeout(function () {
            zone.classList.remove(state);
            zone.querySelector('.em-upload-text').innerHTML =
                '<i class="fas fa-cloud-arrow-up"></i> Drop review sheet or <u>browse</u>';
        }, state === 'done' ? 3000 : 2500);
    }

    // ── Save exam ───────────────────────────────────────────

    async function handleSaveExam() {
        var nameInput = document.getElementById('em-exam-name');
        var dateInput = document.getElementById('em-exam-date');
        var classSelect = document.getElementById('em-class-select');

        // Sync latest values
        if (nameInput) currentExam.exam_name = nameInput.value.trim();
        if (dateInput) currentExam.exam_date = dateInput.value;

        var classId = classSelect ? parseInt(classSelect.value, 10) : currentClassId;

        // Validate
        if (!classId) {
            if (typeof showAlert === 'function') showAlert('Missing Info', 'Please select a class.', 'warning');
            return;
        }
        if (!currentExam.exam_name) {
            if (typeof showAlert === 'function') showAlert('Missing Info', 'Please enter an exam name.', 'warning');
            return;
        }

        var btn = document.getElementById('em-save');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'; }

        // Auto-match topics to guides (silent)
        var guideMappings = {};
        if (currentExam.topics.length > 0) {
            try {
                var mapData = await apiCall('/api/semester/map-topics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topics: currentExam.topics })
                });
                var mappings = mapData.mappings || {};
                Object.keys(mappings).forEach(function (t) {
                    if (mappings[t] && mappings[t].guide_id) guideMappings[t] = mappings[t].guide_id;
                });
            } catch (err) {
                console.warn('[ExamModal] Guide mapping failed, saving without:', err);
            }
        }

        var payload = {
            class_id: classId,
            exam_name: currentExam.exam_name,
            exam_date: currentExam.exam_date || null,
            topics: currentExam.topics,
            guide_mappings: guideMappings
        };

        try {
            if (isEditing && currentExam.exam_id) {
                await apiCall('/api/semester/exams/' + currentExam.exam_id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                await apiCall('/api/semester/exams', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            closeExamModal();
            // Refresh dashboard widgets
            if (typeof loadStudyPlan === 'function') loadStudyPlan();
            if (typeof loadExamCountdown === 'function') loadExamCountdown();

        } catch (err) {
            console.error('[ExamModal] Save failed:', err);
            if (typeof showAlert === 'function') {
                showAlert('Save Failed', 'Something went wrong. Please try again.', 'error');
            }
        }

        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check"></i> Save Exam'; }
    }

    // ── Delete exam ─────────────────────────────────────────

    async function handleDeleteExam() {
        if (!isEditing || !currentExam.exam_id) return;

        var confirmed = typeof showConfirm === 'function'
            ? await showConfirm('Delete Exam', 'This will remove this exam and its topics. Are you sure?', 'warning')
            : confirm('Delete this exam?');

        if (!confirmed) return;

        try {
            await apiCall('/api/semester/exams/' + currentExam.exam_id, { method: 'DELETE' });
            closeExamModal();
            if (typeof loadStudyPlan === 'function') loadStudyPlan();
            if (typeof loadExamCountdown === 'function') loadExamCountdown();
        } catch (err) {
            console.error('[ExamModal] Delete failed:', err);
            if (typeof showAlert === 'function') {
                showAlert('Error', 'Failed to delete exam.', 'error');
            }
        }
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

    function checkPastDate(el) {
        if (!el) return;
        var existing = el.parentElement.querySelector('.em-past-date-warn');
        if (existing) existing.remove();

        if (!el.value) return;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var picked = new Date(el.value + 'T00:00:00');
        if (picked < today) {
            var warn = document.createElement('span');
            warn.className = 'em-past-date-warn';
            warn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Past date';
            el.parentElement.appendChild(warn);
        }
    }

})();
