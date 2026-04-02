/**
 * Semester Setup Modal — 3-step wizard inside the dashboard.
 * 1. Upload syllabus or manual entry
 * 2. Review & edit classes/exams
 * 3. Confirm topic-to-guide mappings
 */

(function () {
    'use strict';

    var classes = [];
    var guideMappings = {};

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

    // ── Modal open/close ────────────────────────────────────

    window.openSemesterModal = function () {
        var overlay = document.getElementById('semester-modal-overlay');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeSemesterModal = function () {
        var overlay = document.getElementById('semester-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        // Open modal triggers
        on('open-semester-modal-btn', 'click', openSemesterModal);
        on('edit-semester-link', 'click', function (e) {
            e.preventDefault();
            openSemesterModal();
        });

        // Close modal
        on('semester-modal-close', 'click', closeSemesterModal);
        var overlay = document.getElementById('semester-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeSemesterModal();
            });
        }

        initStep1();
        initNavigation();
    });

    // ── Navigation ──────────────────────────────────────────

    function initNavigation() {
        on('sm-to-step-2', 'click', function () { goToStep(2); });
        on('sm-to-step-3', 'click', handleStep2Submit);
        on('sm-back-to-1', 'click', function () { goToStep(1); });
        on('sm-back-to-2', 'click', function () { goToStep(2); });
        on('sm-finish', 'click', handleFinish);
        on('sm-add-class', 'click', addEmptyClass);
        on('sm-done', 'click', function () {
            closeSemesterModal();
            if (typeof loadStudyPlan === 'function') loadStudyPlan();
            if (typeof loadExamCountdown === 'function') loadExamCountdown();
        });
        on('sm-start-over', 'click', resetWizard);
    }

    function goToStep(step) {
        ['sm-step-1', 'sm-step-2', 'sm-step-3', 'sm-step-success'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        var panel = document.getElementById('sm-step-' + step);
        if (panel) panel.classList.remove('hidden');

        document.querySelectorAll('.sm-step').forEach(function (el) {
            var s = parseInt(el.dataset.step, 10);
            el.classList.toggle('active', s === step);
            el.classList.toggle('completed', s < step);
        });

        // Show "Start Over" once there's data to reset
        var startOver = document.getElementById('sm-start-over');
        if (startOver) {
            startOver.classList.toggle('hidden', classes.length === 0 && step === 1);
        }

        if (step === 2) renderClassesEditor();

        var modal = document.querySelector('.semester-modal');
        if (modal) modal.scrollTop = 0;
    }

    function resetWizard() {
        classes = [];
        guideMappings = {};

        // Reset step 1 UI
        var zone = document.getElementById('sm-upload-zone');
        var status = document.getElementById('sm-upload-status');
        var extracted = document.getElementById('sm-extracted');
        var actions = document.getElementById('sm-step-1-actions');
        var input = document.getElementById('sm-file-input');

        if (zone) zone.classList.remove('hidden');
        if (status) status.classList.add('hidden');
        if (extracted) extracted.classList.add('hidden');
        if (actions) actions.style.display = 'none';
        if (input) input.value = '';

        var startOver = document.getElementById('sm-start-over');
        if (startOver) startOver.classList.add('hidden');

        goToStep(1);
    }

    // ── Step 1: Upload or Manual ────────────────────────────

    function initStep1() {
        var zone = document.getElementById('sm-upload-zone');
        var input = document.getElementById('sm-file-input');
        var browse = zone ? zone.querySelector('.sm-upload-browse') : null;

        if (zone) {
            zone.addEventListener('click', function (e) {
                if (e.target.closest('.sm-upload-browse')) return;
                input.click();
            });
            zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('dragover'); });
            zone.addEventListener('dragleave', function () { zone.classList.remove('dragover'); });
            zone.addEventListener('drop', function (e) {
                e.preventDefault();
                zone.classList.remove('dragover');
                if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files[0]);
            });
        }

        if (browse) {
            browse.addEventListener('click', function (e) { e.stopPropagation(); input.click(); });
        }

        if (input) {
            input.addEventListener('change', function () {
                if (this.files.length) handleFileUpload(this.files[0]);
            });
        }

        on('sm-manual-btn', 'click', function () {
            classes.push(createEmptyClass());
            goToStep(2);
        });

        on('sm-add-another', 'click', function () {
            input.value = '';
            input.click();
        });
    }

    async function handleFileUpload(file) {
        var ext = file.name.toLowerCase().split('.').pop();
        if (ext !== 'pdf' && ext !== 'docx') { alert('Please upload a PDF or DOCX file.'); return; }
        if (file.size > 10 * 1024 * 1024) { alert('File too large (max 10MB).'); return; }

        var zone = document.getElementById('sm-upload-zone');
        var status = document.getElementById('sm-upload-status');
        var statusText = document.getElementById('sm-upload-status-text');

        zone.classList.add('hidden');
        status.classList.remove('hidden');
        statusText.textContent = 'Analyzing ' + file.name + '...';

        try {
            var formData = new FormData();
            formData.append('file', file);

            // Raw fetch needed for FormData — apiCall forces Content-Type: application/json
            var token = localStorage.getItem('accessToken');
            var res = await fetch(API_URL + '/api/semester/extract-syllabus', {
                method: 'POST',
                headers: token ? { 'Authorization': 'Bearer ' + token } : {},
                body: formData,
                credentials: 'include'
            });

            var data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            if (!data || !data.extraction) throw new Error('No extraction data');

            var ex = data.extraction;
            classes.push({
                class_name: ex.class_name || 'Unnamed Class',
                instructor: ex.instructor || '',
                semester: ex.semester || '',
                exams: (ex.exams || []).map(function (e) {
                    return { exam_name: e.exam_name || '', exam_date: e.exam_date || '', topics: e.topics || [] };
                }),
                source: 'syllabus',
                filename: file.name
            });

            status.classList.add('hidden');
            renderExtractedSummary();
            document.getElementById('sm-step-1-actions').style.display = '';

        } catch (err) {
            console.error('[Semester] Extraction failed:', err);
            status.classList.add('hidden');
            zone.classList.remove('hidden');
            alert('Failed to extract syllabus. Try again or enter manually.');
        }
    }

    function renderExtractedSummary() {
        var container = document.getElementById('sm-extracted');
        var list = document.getElementById('sm-extracted-list');
        var count = document.getElementById('sm-extracted-count');

        container.classList.remove('hidden');
        count.textContent = classes.length + ' class' + (classes.length !== 1 ? 'es' : '') + ' found';

        var html = '';
        classes.forEach(function (cls, i) {
            var examCount = cls.exams ? cls.exams.length : 0;
            var topicCount = 0;
            if (cls.exams) cls.exams.forEach(function (e) { topicCount += (e.topics || []).length; });

            html += '<div class="sm-extracted-card">';
            html += '<div class="sm-ec-icon"><i class="fas fa-book"></i></div>';
            html += '<div class="sm-ec-info"><strong>' + esc(cls.class_name) + '</strong>';
            html += '<span>' + examCount + ' exam' + (examCount !== 1 ? 's' : '') + ', ' + topicCount + ' topics</span></div>';
            html += '<button class="sm-ec-remove" data-idx="' + i + '"><i class="fas fa-times"></i></button>';
            html += '</div>';
        });
        list.innerHTML = html;

        list.querySelectorAll('.sm-ec-remove').forEach(function (btn) {
            btn.addEventListener('click', function () {
                classes.splice(parseInt(this.dataset.idx, 10), 1);
                if (classes.length === 0) {
                    container.classList.add('hidden');
                    document.getElementById('sm-upload-zone').classList.remove('hidden');
                    document.getElementById('sm-step-1-actions').style.display = 'none';
                } else {
                    renderExtractedSummary();
                }
            });
        });
    }

    // ── Step 2: Review & Edit ───────────────────────────────

    function renderClassesEditor() {
        var container = document.getElementById('sm-classes-editor');
        var html = '';

        classes.forEach(function (cls, ci) {
            html += '<div class="sm-class-card">';
            html += '<div class="sm-cc-header">';
            html += '<input type="text" class="sm-cc-name" value="' + attr(cls.class_name) + '" placeholder="Class name" data-field="class_name" data-ci="' + ci + '">';
            html += '<input type="text" class="sm-cc-instructor" value="' + attr(cls.instructor || '') + '" placeholder="Instructor (optional)" data-field="instructor" data-ci="' + ci + '">';
            html += '<button class="sm-cc-delete" data-del-class="' + ci + '"><i class="fas fa-trash-alt"></i></button>';
            html += '</div>';
            html += '<div class="sm-cc-exams"><h4>Exams</h4>';

            (cls.exams || []).forEach(function (exam, ei) {
                html += '<div class="sm-exam-row" data-ci="' + ci + '" data-ei="' + ei + '">';
                html += '<div class="sm-exam-top">';
                html += '<input type="text" class="sm-exam-name" value="' + attr(exam.exam_name) + '" placeholder="Exam name" data-field="exam_name">';
                html += '<input type="date" class="sm-exam-date" value="' + attr(exam.exam_date || '') + '" data-field="exam_date">';
                html += '<button class="sm-exam-delete" data-del-exam="' + ci + '-' + ei + '"><i class="fas fa-times"></i></button>';
                html += '</div>';
                html += '<div class="sm-exam-topics"><label>Topics:</label>';
                html += '<div class="sm-topic-tags">';
                (exam.topics || []).forEach(function (t, ti) {
                    html += '<span class="sm-topic-tag">' + esc(t) + '<button class="sm-topic-rm" data-rm="' + ci + '-' + ei + '-' + ti + '">&times;</button></span>';
                });
                html += '<input type="text" class="sm-topic-input" placeholder="Add topic + Enter" data-ci="' + ci + '" data-ei="' + ei + '">';
                html += '</div></div></div>';
            });

            html += '<button class="sm-add-exam" data-add-exam="' + ci + '"><i class="fas fa-plus"></i> Add Exam</button>';
            html += '</div></div>';
        });

        container.innerHTML = html;
        attachEditorListeners(container);
    }

    function attachEditorListeners(c) {
        c.querySelectorAll('.sm-cc-name, .sm-cc-instructor').forEach(function (el) {
            el.addEventListener('change', function () {
                classes[parseInt(this.dataset.ci, 10)][this.dataset.field] = this.value.trim();
            });
        });
        c.querySelectorAll('.sm-exam-name, .sm-exam-date').forEach(function (el) {
            el.addEventListener('change', function () {
                var row = this.closest('.sm-exam-row');
                classes[parseInt(row.dataset.ci, 10)].exams[parseInt(row.dataset.ei, 10)][this.dataset.field] = this.value.trim();
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
        c.querySelectorAll('.sm-topic-input').forEach(function (el) {
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    e.preventDefault();
                    classes[parseInt(this.dataset.ci, 10)].exams[parseInt(this.dataset.ei, 10)].topics.push(this.value.trim());
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
        return { class_name: '', instructor: '', semester: '', exams: [{ exam_name: 'Exam 1', exam_date: '', topics: [] }], source: 'manual' };
    }

    // ── Step 2 → 3: Map topics ──────────────────────────────

    async function handleStep2Submit() {
        // Sync inputs
        document.querySelectorAll('.sm-cc-name, .sm-cc-instructor').forEach(function (el) {
            classes[parseInt(el.dataset.ci, 10)][el.dataset.field] = el.value.trim();
        });
        document.querySelectorAll('.sm-exam-name, .sm-exam-date').forEach(function (el) {
            var row = el.closest('.sm-exam-row');
            classes[parseInt(row.dataset.ci, 10)].exams[parseInt(row.dataset.ei, 10)][el.dataset.field] = el.value.trim();
        });

        classes = classes.filter(function (c) { return c.class_name.trim(); });
        if (!classes.length) { alert('Please add at least one class name.'); return; }

        var allTopics = [];
        classes.forEach(function (cls) {
            (cls.exams || []).forEach(function (exam) {
                (exam.topics || []).forEach(function (t) {
                    if (allTopics.indexOf(t) === -1) allTopics.push(t);
                });
            });
        });

        goToStep(3);

        if (!allTopics.length) {
            guideMappings = {};
            document.getElementById('sm-mappings-editor').innerHTML = '<div class="sm-mapping-empty">No topics to match. You can still save your class schedule.</div>';
            return;
        }

        var editor = document.getElementById('sm-mappings-editor');
        editor.innerHTML = '<div class="sm-mapping-loading"><i class="fas fa-spinner fa-spin"></i> Matching topics...</div>';

        try {
            var data = await apiCall('/api/semester/map-topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topics: allTopics })
            });
            guideMappings = data.mappings || {};
        } catch (err) {
            console.error('[Semester] Mapping failed:', err);
            allTopics.forEach(function (t) { guideMappings[t] = { guide_id: null, confidence: 0, source: 'none' }; });
        }

        renderMappingsEditor();
    }

    function renderMappingsEditor() {
        var editor = document.getElementById('sm-mappings-editor');
        var topics = Object.keys(guideMappings);
        if (!topics.length) {
            editor.innerHTML = '<div class="sm-mapping-empty">No topics to match.</div>';
            return;
        }

        var html = '<div class="sm-mappings-list">';
        topics.forEach(function (topic) {
            var m = guideMappings[topic];
            var conf = m.confidence || 0;
            var cls = conf >= 0.8 ? 'high' : conf >= 0.5 ? 'med' : 'low';
            var icon = conf >= 0.8 ? 'fa-check-circle' : conf >= 0.5 ? 'fa-question-circle' : 'fa-times-circle';

            html += '<div class="sm-map-row">';
            html += '<span class="sm-map-status ' + cls + '"><i class="fas ' + icon + '"></i></span>';
            html += '<span class="sm-map-topic">' + esc(topic) + '</span>';
            html += '<select class="sm-map-select" data-topic="' + attr(topic) + '">';
            html += '<option value="">No guide match</option>';
            Object.keys(availableGuides).forEach(function (gid) {
                html += '<option value="' + gid + '"' + (gid === m.guide_id ? ' selected' : '') + '>' + esc(availableGuides[gid]) + '</option>';
            });
            html += '</select></div>';
        });
        html += '</div>';
        editor.innerHTML = html;

        editor.querySelectorAll('.sm-map-select').forEach(function (sel) {
            sel.addEventListener('change', function () {
                guideMappings[this.dataset.topic].guide_id = this.value || null;
                guideMappings[this.dataset.topic].confidence = this.value ? 1.0 : 0;
                guideMappings[this.dataset.topic].source = this.value ? 'user_confirmed' : 'none';
            });
        });
    }

    // ── Finish ──────────────────────────────────────────────

    async function handleFinish() {
        var btn = document.getElementById('sm-finish');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        var payload = classes.map(function (cls) {
            return {
                class_name: cls.class_name,
                instructor: cls.instructor,
                semester: cls.semester,
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

            ['sm-step-1', 'sm-step-2', 'sm-step-3'].forEach(function (id) {
                var el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });
            document.getElementById('sm-step-success').classList.remove('hidden');
            document.querySelectorAll('.sm-step').forEach(function (el) {
                el.classList.add('completed');
                el.classList.remove('active');
            });
        } catch (err) {
            console.error('[Semester] Save failed:', err);
            alert('Failed to save. Please try again.');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-check"></i> Save & Get My Plan';
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

    function attr(s) {
        return (s || '').replace(/"/g, '&quot;');
    }

})();
