/**
 * Semester Setup Wizard — 3-step process:
 * 1. Upload syllabus or manual entry
 * 2. Review & edit classes/exams
 * 3. Confirm topic-to-guide mappings
 */

(function () {
    'use strict';

    // State: array of class objects collected across steps
    var classes = [];
    var guideMappings = {}; // { topicName: { guide_id, confidence, source } }

    // Available guides for dropdown (populated from mapping response)
    var availableGuides = {
        'heart-failure': 'Heart Failure',
        'myocardial-infarction': 'Myocardial Infarction',
        'arrhythmias': 'Arrhythmias',
        'hypertension': 'Hypertension',
        'coronary-artery-disease': 'Coronary Artery Disease',
        'peripheral-vascular-disease': 'Peripheral Vascular Disease',
        'copd': 'COPD',
        'asthma': 'Asthma',
        'pneumonia': 'Pneumonia',
        'tuberculosis': 'Tuberculosis',
        'oxygen-therapy': 'Oxygen Therapy',
        'chest-tubes': 'Chest Tubes',
        'stroke': 'Stroke',
        'seizures': 'Seizures',
        'diabetes-mellitus': 'Diabetes Mellitus',
        'thyroid-disorders': 'Thyroid Disorders',
        'hip-knee-replacement': 'Hip & Knee Replacement',
        'fractures': 'Fractures',
        'assessment-skills': 'Assessment Skills',
        'antepartum-care': 'Antepartum Care',
        'sepsis': 'Sepsis',
        'gi-bleeding': 'GI Bleeding'
    };

    document.addEventListener('DOMContentLoaded', function () {
        initStep1();
        initNavigation();
        initDataNavigate();
    });

    // ── Navigation between steps ────────────────────────────

    function initNavigation() {
        on('btn-to-step-2', 'click', function () { goToStep(2); });
        on('btn-to-step-3', 'click', function () { handleStep2Submit(); });
        on('btn-back-to-1', 'click', function () { goToStep(1); });
        on('btn-back-to-2', 'click', function () { goToStep(2); });
        on('btn-finish', 'click', handleFinish);
        on('btn-add-class', 'click', addEmptyClass);
    }

    function initDataNavigate() {
        document.querySelectorAll('[data-navigate]').forEach(function (el) {
            el.addEventListener('click', function () {
                window.location.href = this.dataset.navigate;
            });
        });
    }

    function goToStep(step) {
        for (var i = 1; i <= 3; i++) {
            var panel = document.getElementById('step-' + i);
            if (panel) panel.classList.toggle('hidden', i !== step);
        }
        document.getElementById('step-success').classList.add('hidden');

        // Update progress indicators
        document.querySelectorAll('.wizard-step').forEach(function (el) {
            var s = parseInt(el.dataset.step, 10);
            el.classList.toggle('active', s === step);
            el.classList.toggle('completed', s < step);
        });

        if (step === 2) renderClassesEditor();
        window.scrollTo(0, 0);
    }

    // ── Step 1: Upload or Manual Entry ──────────────────────

    function initStep1() {
        var zone = document.getElementById('syllabus-upload-zone');
        var input = document.getElementById('syllabus-file-input');

        if (zone) {
            zone.addEventListener('click', function () { input.click(); });

            zone.addEventListener('dragover', function (e) {
                e.preventDefault();
                zone.classList.add('dragover');
            });

            zone.addEventListener('dragleave', function () {
                zone.classList.remove('dragover');
            });

            zone.addEventListener('drop', function (e) {
                e.preventDefault();
                zone.classList.remove('dragover');
                if (e.dataTransfer.files.length > 0) {
                    handleFileUpload(e.dataTransfer.files[0]);
                }
            });
        }

        if (input) {
            input.addEventListener('change', function () {
                if (this.files.length > 0) handleFileUpload(this.files[0]);
            });
        }

        on('btn-manual-entry', 'click', function () {
            classes.push(createEmptyClass());
            showStep1Actions();
            goToStep(2);
        });

        on('btn-add-another-upload', 'click', function () {
            input.value = '';
            input.click();
        });
    }

    async function handleFileUpload(file) {
        var status = document.getElementById('upload-status');
        var statusText = document.getElementById('upload-status-text');
        var zone = document.getElementById('syllabus-upload-zone');

        // Validate
        var ext = file.name.toLowerCase().split('.').pop();
        if (ext !== 'pdf' && ext !== 'docx') {
            alert('Please upload a PDF or DOCX file.');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('File is too large. Maximum size is 10MB.');
            return;
        }

        // Show spinner
        zone.classList.add('hidden');
        status.classList.remove('hidden');
        statusText.textContent = 'Analyzing ' + file.name + '...';

        try {
            var formData = new FormData();
            formData.append('file', file);

            var data = await apiCall('/api/semester/extract-syllabus', {
                method: 'POST',
                body: formData
            });

            if (!data || !data.extraction) {
                throw new Error('No extraction data returned');
            }

            // Add extracted class to our state
            var extracted = data.extraction;
            classes.push({
                class_name: extracted.class_name || 'Unnamed Class',
                instructor: extracted.instructor || '',
                semester: extracted.semester || '',
                exams: (extracted.exams || []).map(function (exam) {
                    return {
                        exam_name: exam.exam_name || '',
                        exam_date: exam.exam_date || '',
                        topics: exam.topics || []
                    };
                }),
                source: 'syllabus',
                filename: file.name
            });

            // Show extracted summary
            status.classList.add('hidden');
            renderExtractedSummary();
            showStep1Actions();

        } catch (err) {
            console.error('[Semester] Syllabus extraction failed:', err);
            status.classList.add('hidden');
            zone.classList.remove('hidden');
            alert('Failed to extract syllabus. Please try again or enter your classes manually.');
        }
    }

    function renderExtractedSummary() {
        var container = document.getElementById('extracted-classes');
        var list = document.getElementById('extracted-list');
        var count = document.getElementById('extracted-count');

        container.classList.remove('hidden');
        count.textContent = classes.length + ' class' + (classes.length !== 1 ? 'es' : '') + ' found';

        var html = '';
        classes.forEach(function (cls, i) {
            var examCount = cls.exams ? cls.exams.length : 0;
            var topicCount = 0;
            if (cls.exams) cls.exams.forEach(function (e) { topicCount += (e.topics || []).length; });

            html += '<div class="extracted-class-card">';
            html += '<div class="ecc-icon"><i class="fas fa-book"></i></div>';
            html += '<div class="ecc-info">';
            html += '<strong>' + escHtml(cls.class_name) + '</strong>';
            html += '<span>' + examCount + ' exam' + (examCount !== 1 ? 's' : '') + ', ' + topicCount + ' topics</span>';
            if (cls.filename) html += '<span class="ecc-source"><i class="fas fa-file-pdf"></i> ' + escHtml(cls.filename) + '</span>';
            html += '</div>';
            html += '<button class="ecc-remove" data-remove-class="' + i + '" title="Remove"><i class="fas fa-times"></i></button>';
            html += '</div>';
        });

        list.innerHTML = html;

        // Remove buttons
        list.querySelectorAll('[data-remove-class]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(this.dataset.removeClass, 10);
                classes.splice(idx, 1);
                renderExtractedSummary();
                if (classes.length === 0) {
                    container.classList.add('hidden');
                    document.getElementById('syllabus-upload-zone').classList.remove('hidden');
                    document.getElementById('step-1-actions').style.display = 'none';
                }
            });
        });
    }

    function showStep1Actions() {
        document.getElementById('step-1-actions').style.display = '';
    }

    // ── Step 2: Review & Edit Classes ───────────────────────

    function renderClassesEditor() {
        var container = document.getElementById('classes-editor');
        var html = '';

        classes.forEach(function (cls, ci) {
            html += '<div class="class-edit-card" data-class-index="' + ci + '">';
            html += '<div class="cec-header">';
            html += '<input type="text" class="cec-name-input" value="' + escAttr(cls.class_name) + '" placeholder="Class name" data-field="class_name" data-ci="' + ci + '">';
            html += '<input type="text" class="cec-instructor-input" value="' + escAttr(cls.instructor || '') + '" placeholder="Instructor (optional)" data-field="instructor" data-ci="' + ci + '">';
            html += '<button class="cec-delete" data-delete-class="' + ci + '" title="Delete class"><i class="fas fa-trash-alt"></i></button>';
            html += '</div>';

            html += '<div class="cec-exams">';
            html += '<h4>Exams</h4>';

            (cls.exams || []).forEach(function (exam, ei) {
                html += renderExamEditor(ci, ei, exam);
            });

            html += '<button class="btn-add-exam" data-add-exam="' + ci + '"><i class="fas fa-plus"></i> Add Exam</button>';
            html += '</div>';
            html += '</div>';
        });

        container.innerHTML = html;
        attachEditorListeners(container);
    }

    function renderExamEditor(ci, ei, exam) {
        var html = '<div class="exam-edit-row" data-ci="' + ci + '" data-ei="' + ei + '">';
        html += '<div class="eer-top">';
        html += '<input type="text" class="eer-name" value="' + escAttr(exam.exam_name) + '" placeholder="Exam name" data-field="exam_name">';
        html += '<input type="date" class="eer-date" value="' + escAttr(exam.exam_date || '') + '" data-field="exam_date">';
        html += '<button class="eer-delete" data-delete-exam="' + ci + '-' + ei + '" title="Delete exam"><i class="fas fa-times"></i></button>';
        html += '</div>';

        html += '<div class="eer-topics">';
        html += '<label>Topics:</label>';
        html += '<div class="topic-tags" data-ci="' + ci + '" data-ei="' + ei + '">';
        (exam.topics || []).forEach(function (topic, ti) {
            html += '<span class="topic-tag">' + escHtml(topic) + '<button class="topic-remove" data-remove-topic="' + ci + '-' + ei + '-' + ti + '">&times;</button></span>';
        });
        html += '<input type="text" class="topic-input" placeholder="Add topic..." data-ci="' + ci + '" data-ei="' + ei + '">';
        html += '</div>';
        html += '</div>';

        html += '</div>';
        return html;
    }

    function attachEditorListeners(container) {
        // Class field changes
        container.querySelectorAll('.cec-name-input, .cec-instructor-input').forEach(function (input) {
            input.addEventListener('change', function () {
                var ci = parseInt(this.dataset.ci, 10);
                var field = this.dataset.field;
                classes[ci][field] = this.value.trim();
            });
        });

        // Exam field changes
        container.querySelectorAll('.eer-name, .eer-date').forEach(function (input) {
            input.addEventListener('change', function () {
                var row = this.closest('.exam-edit-row');
                var ci = parseInt(row.dataset.ci, 10);
                var ei = parseInt(row.dataset.ei, 10);
                var field = this.dataset.field;
                classes[ci].exams[ei][field] = this.value.trim();
            });
        });

        // Delete class
        container.querySelectorAll('[data-delete-class]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var ci = parseInt(this.dataset.deleteClass, 10);
                classes.splice(ci, 1);
                renderClassesEditor();
            });
        });

        // Delete exam
        container.querySelectorAll('[data-delete-exam]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var parts = this.dataset.deleteExam.split('-');
                var ci = parseInt(parts[0], 10);
                var ei = parseInt(parts[1], 10);
                classes[ci].exams.splice(ei, 1);
                renderClassesEditor();
            });
        });

        // Add exam
        container.querySelectorAll('[data-add-exam]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var ci = parseInt(this.dataset.addExam, 10);
                classes[ci].exams.push({ exam_name: '', exam_date: '', topics: [] });
                renderClassesEditor();
            });
        });

        // Remove topic
        container.querySelectorAll('[data-remove-topic]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var parts = this.dataset.removeTopic.split('-');
                var ci = parseInt(parts[0], 10);
                var ei = parseInt(parts[1], 10);
                var ti = parseInt(parts[2], 10);
                classes[ci].exams[ei].topics.splice(ti, 1);
                renderClassesEditor();
            });
        });

        // Add topic on Enter
        container.querySelectorAll('.topic-input').forEach(function (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    e.preventDefault();
                    var ci = parseInt(this.dataset.ci, 10);
                    var ei = parseInt(this.dataset.ei, 10);
                    classes[ci].exams[ei].topics.push(this.value.trim());
                    renderClassesEditor();
                }
            });
        });
    }

    function addEmptyClass() {
        classes.push(createEmptyClass());
        renderClassesEditor();
    }

    function createEmptyClass() {
        return {
            class_name: '',
            instructor: '',
            semester: '',
            exams: [{ exam_name: 'Exam 1', exam_date: '', topics: [] }],
            source: 'manual'
        };
    }

    // ── Step 2 → Step 3: Get topic mappings ─────────────────

    async function handleStep2Submit() {
        // Sync any unsaved input values
        document.querySelectorAll('.cec-name-input, .cec-instructor-input').forEach(function (el) {
            var ci = parseInt(el.dataset.ci, 10);
            classes[ci][el.dataset.field] = el.value.trim();
        });
        document.querySelectorAll('.eer-name, .eer-date').forEach(function (el) {
            var row = el.closest('.exam-edit-row');
            var ci = parseInt(row.dataset.ci, 10);
            var ei = parseInt(row.dataset.ei, 10);
            classes[ci].exams[ei][el.dataset.field] = el.value.trim();
        });

        // Validate: at least one class with a name
        var validClasses = classes.filter(function (c) { return c.class_name.trim(); });
        if (validClasses.length === 0) {
            alert('Please add at least one class name.');
            return;
        }
        classes = validClasses;

        // Collect all unique topics
        var allTopics = [];
        classes.forEach(function (cls) {
            (cls.exams || []).forEach(function (exam) {
                (exam.topics || []).forEach(function (topic) {
                    if (allTopics.indexOf(topic) === -1) allTopics.push(topic);
                });
            });
        });

        if (allTopics.length === 0) {
            // No topics to map — skip to finish
            guideMappings = {};
            goToStep(3);
            renderMappingsEmpty();
            return;
        }

        // Call mapping API
        goToStep(3);
        var editor = document.getElementById('mappings-editor');
        editor.innerHTML = '<div class="mapping-loading"><i class="fas fa-spinner fa-spin"></i> Matching topics to study guides...</div>';

        try {
            var data = await apiCall('/api/semester/map-topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topics: allTopics })
            });

            guideMappings = data.mappings || {};
            renderMappingsEditor();

        } catch (err) {
            console.error('[Semester] Topic mapping failed:', err);
            // Fall back to empty mappings
            allTopics.forEach(function (t) {
                guideMappings[t] = { guide_id: null, confidence: 0, source: 'none' };
            });
            renderMappingsEditor();
        }
    }

    // ── Step 3: Confirm Guide Mappings ──────────────────────

    function renderMappingsEditor() {
        var editor = document.getElementById('mappings-editor');
        var topics = Object.keys(guideMappings);

        if (topics.length === 0) {
            renderMappingsEmpty();
            return;
        }

        var html = '<div class="mappings-list">';
        topics.forEach(function (topic) {
            var mapping = guideMappings[topic];
            var guideId = mapping.guide_id;
            var confidence = mapping.confidence || 0;
            var statusClass = confidence >= 0.8 ? 'high' : confidence >= 0.5 ? 'medium' : 'low';
            var statusIcon = confidence >= 0.8 ? 'fa-check-circle' : confidence >= 0.5 ? 'fa-question-circle' : 'fa-times-circle';

            html += '<div class="mapping-row">';
            html += '<div class="mapping-topic">';
            html += '<span class="mapping-status ' + statusClass + '"><i class="fas ' + statusIcon + '"></i></span>';
            html += '<span>' + escHtml(topic) + '</span>';
            html += '</div>';
            html += '<div class="mapping-guide">';
            html += '<select class="mapping-select" data-topic="' + escAttr(topic) + '">';
            html += '<option value="">No guide match</option>';

            Object.keys(availableGuides).forEach(function (gid) {
                var selected = gid === guideId ? ' selected' : '';
                html += '<option value="' + gid + '"' + selected + '>' + escHtml(availableGuides[gid]) + '</option>';
            });

            html += '</select>';
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';

        editor.innerHTML = html;

        // Listen for dropdown changes
        editor.querySelectorAll('.mapping-select').forEach(function (sel) {
            sel.addEventListener('change', function () {
                var topic = this.dataset.topic;
                guideMappings[topic].guide_id = this.value || null;
                guideMappings[topic].source = this.value ? 'user_confirmed' : 'none';
                guideMappings[topic].confidence = this.value ? 1.0 : 0;
            });
        });
    }

    function renderMappingsEmpty() {
        var editor = document.getElementById('mappings-editor');
        editor.innerHTML = '<div class="mapping-empty"><p>No exam topics found to match. You can add topics in Step 2, or continue to save your class schedule.</p></div>';
    }

    // ── Finish: Save everything ─────────────────────────────

    async function handleFinish() {
        var btn = document.getElementById('btn-finish');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        // Build guide_mappings per exam from the global guideMappings
        var payload = classes.map(function (cls) {
            return {
                class_name: cls.class_name,
                instructor: cls.instructor,
                semester: cls.semester,
                exams: (cls.exams || []).map(function (exam) {
                    var examMappings = {};
                    (exam.topics || []).forEach(function (topic) {
                        var m = guideMappings[topic];
                        if (m && m.guide_id) {
                            examMappings[topic] = m.guide_id;
                        }
                    });
                    return {
                        exam_name: exam.exam_name,
                        exam_date: exam.exam_date || null,
                        topics: exam.topics || [],
                        guide_mappings: examMappings
                    };
                })
            };
        });

        try {
            await apiCall('/api/semester/confirm-syllabus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classes: payload })
            });

            // Show success
            for (var i = 1; i <= 3; i++) {
                document.getElementById('step-' + i).classList.add('hidden');
            }
            document.getElementById('step-success').classList.remove('hidden');
            document.querySelectorAll('.wizard-step').forEach(function (el) {
                el.classList.add('completed');
                el.classList.remove('active');
            });

        } catch (err) {
            console.error('[Semester] Save failed:', err);
            alert('Failed to save. Please try again.');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-check"></i> Save & Get My Study Plan';
        }
    }

    // ── Helpers ──────────────────────────────────────────────

    function on(id, event, handler) {
        var el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    }

    function escHtml(str) {
        var div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    function escAttr(str) {
        return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

})();
