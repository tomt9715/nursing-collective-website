/**
 * Study Session Page — Focused study experience
 * Loads the daily study plan and renders compact topic rows with action buttons,
 * progress tracking, and time budget controls.
 *
 * URL params:
 *   ?exam=<name>&class=<class>&date=<YYYY-MM-DD>  → filter to one exam
 *   (no params) → show full daily plan
 */

(function () {
    'use strict';

    // ── State ────────────────────────────────────────
    var BUDGET_OPTIONS = [
        { mins: 30,  label: '30m',  desc: 'nearest exam only' },
        { mins: 60,  label: '1hr',  desc: 'nearest exam + 1 more' },
        { mins: 120, label: '2hr',  desc: '2 nearest exams' },
        { mins: 180, label: '3hr',  desc: 'all upcoming exams' }
    ];
    var timeBudget = parseInt(localStorage.getItem('studyPlanTimeBudget') || '60', 10);
    var completedTopics = [];
    var allTasks = [];
    var planData = null;

    // ── DOM refs ─────────────────────────────────────
    var headerEl, controlsEl, progressEl, topicsEl;

    // ── URL params ───────────────────────────────────
    var params = (function () {
        var sp = new URLSearchParams(window.location.search);
        var exam = sp.get('exam');
        var cls = sp.get('class');
        var date = sp.get('date');
        if (exam) return { exam: exam, class: cls || '', date: date || '' };
        return null;
    })();

    // ── Init ─────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', async function () {
        headerEl = document.getElementById('ss-header');
        controlsEl = document.getElementById('ss-controls');
        progressEl = document.getElementById('ss-progress');
        topicsEl = document.getElementById('ss-topics');

        var hasAuth = await requireAuth();
        if (!hasAuth) return;

        initUploadModal();
        await fetchAndRender();
    });

    // ── Upload Modal ─────────────────────────────────

    var uploadModalState = { topicName: '', rowIdx: -1 };

    function initUploadModal() {
        var modalHtml =
            '<div class="ss-upload-overlay" id="ss-upload-overlay">' +
                '<div class="ss-upload-modal">' +
                    '<div class="ss-upload-modal-header">' +
                        '<div>' +
                            '<h3>Upload Notes</h3>' +
                            '<div class="ss-upload-topic-label" id="ss-upload-topic-label"></div>' +
                        '</div>' +
                        '<button class="ss-upload-close" id="ss-upload-close">&times;</button>' +
                    '</div>' +
                    '<div class="ss-upload-body" id="ss-upload-body">' +
                        '<div class="ss-upload-dropzone" id="ss-upload-dropzone">' +
                            '<input type="file" id="ss-upload-input" accept=".pdf,.docx,.pptx" hidden>' +
                            '<i class="fas fa-cloud-arrow-up"></i>' +
                            '<strong>Drag & drop your notes</strong>' +
                            '<span>or click to browse</span>' +
                            '<span class="ss-upload-formats">PDF, DOCX, PPTX &middot; Max 25 MB</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        var overlay = document.getElementById('ss-upload-overlay');
        var closeBtn = document.getElementById('ss-upload-close');
        var dropzone = document.getElementById('ss-upload-dropzone');
        var fileInput = document.getElementById('ss-upload-input');

        // Close modal
        closeBtn.addEventListener('click', closeUploadModal);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeUploadModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) closeUploadModal();
        });

        // Click to browse
        dropzone.addEventListener('click', function () { fileInput.click(); });
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) handleFile(this.files[0]);
        });

        // Drag and drop
        dropzone.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        dropzone.addEventListener('dragleave', function () {
            this.classList.remove('drag-over');
        });
        dropzone.addEventListener('drop', function (e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
            }
        });
    }

    function openUploadModal(topicName, rowIdx) {
        uploadModalState.topicName = topicName;
        uploadModalState.rowIdx = rowIdx;

        var label = document.getElementById('ss-upload-topic-label');
        if (label) label.textContent = 'for: ' + topicName;

        // Reset to dropzone state
        var body = document.getElementById('ss-upload-body');
        var dropzone = document.getElementById('ss-upload-dropzone');
        var fileInput = document.getElementById('ss-upload-input');
        if (dropzone) dropzone.style.display = '';
        if (fileInput) fileInput.value = '';
        // Remove any previous state elements
        var prevState = body.querySelector('.ss-upload-state');
        if (prevState) prevState.remove();

        document.getElementById('ss-upload-overlay').classList.add('active');
    }

    function closeUploadModal() {
        document.getElementById('ss-upload-overlay').classList.remove('active');
    }

    async function handleFile(file) {
        // Validate
        var validTypes = ['application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        var ext = file.name.split('.').pop().toLowerCase();
        if (['pdf', 'docx', 'pptx'].indexOf(ext) === -1) {
            showUploadError('Please upload a PDF, DOCX, or PPTX file.');
            return;
        }
        if (file.size > 25 * 1024 * 1024) {
            showUploadError('File is too large. Maximum 25 MB.');
            return;
        }

        // Show uploading state
        showUploadState('uploading', 'Uploading ' + file.name + '...', 'This may take a moment');

        try {
            var formData = new FormData();
            formData.append('file', file);
            if (uploadModalState.topicName) {
                formData.append('topic_name', uploadModalState.topicName);
            }

            var token = localStorage.getItem('accessToken');
            var headers = {};
            if (token) headers['Authorization'] = 'Bearer ' + token;

            var response = await fetch(
                (typeof API_URL !== 'undefined' ? API_URL : '') + '/api/ai/upload',
                { method: 'POST', headers: headers, body: formData, credentials: 'include' }
            );

            var data = await response.json();

            if (!response.ok) {
                showUploadError(data.error || data.message || 'Upload failed. Please try again.');
                return;
            }

            // Show processing state
            showUploadState('processing', 'Processing your notes...', 'Generating study materials');

            // Poll for completion
            if (data.upload_id) {
                pollUploadStatus(data.upload_id);
            } else {
                showUploadSuccess(null);
            }

        } catch (err) {
            console.error('[StudySession] Upload failed:', err);
            showUploadError('Upload failed. Please check your connection and try again.');
        }
    }

    function pollUploadStatus(uploadId) {
        var attempts = 0;
        var maxAttempts = 60; // 2 minutes at 2s intervals

        var interval = setInterval(async function () {
            attempts++;
            try {
                var data = await apiCall('/api/ai/documents/' + uploadId + '/status');
                if (data.status === 'ready') {
                    clearInterval(interval);
                    showUploadSuccess(uploadId);
                } else if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    // Still show success — processing continues in background
                    showUploadSuccess(uploadId);
                }
            } catch (err) {
                // Keep polling on transient errors
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    showUploadSuccess(uploadId);
                }
            }
        }, 2000);
    }

    function showUploadState(type, text, subtext) {
        var body = document.getElementById('ss-upload-body');
        var dropzone = document.getElementById('ss-upload-dropzone');
        if (dropzone) dropzone.style.display = 'none';

        var prevState = body.querySelector('.ss-upload-state');
        if (prevState) prevState.remove();

        var iconClass = type === 'uploading' ? 'fas fa-spinner fa-spin uploading' :
                        type === 'processing' ? 'fas fa-cog fa-spin processing' :
                        'fas fa-check-circle success';

        var html = '<div class="ss-upload-state">' +
            '<i class="' + iconClass + '"></i>' +
            '<div class="ss-upload-state-text">' + escapeHtml(text) + '</div>' +
            '<div class="ss-upload-state-sub">' + escapeHtml(subtext) + '</div>' +
            '<div class="ss-upload-progress-bar"><div class="ss-upload-progress-fill"></div></div>' +
            '</div>';

        body.insertAdjacentHTML('beforeend', html);
    }

    function showUploadSuccess(uploadId) {
        var body = document.getElementById('ss-upload-body');
        var prevState = body.querySelector('.ss-upload-state');
        if (prevState) prevState.remove();

        var html = '<div class="ss-upload-state">' +
            '<i class="fas fa-check-circle success"></i>' +
            '<div class="ss-upload-state-text">Notes uploaded!</div>' +
            '<div class="ss-upload-state-sub">Your study materials are being generated.</div>' +
            '<button class="ss-upload-done-btn" id="ss-upload-done-btn">' +
            '<i class="fas fa-check"></i> Done</button>' +
            '</div>';

        body.insertAdjacentHTML('beforeend', html);

        // Update the topic row to show "Notes" link
        if (uploadId && uploadModalState.rowIdx >= 0) {
            var row = topicsEl.querySelector('[data-idx="' + uploadModalState.rowIdx + '"]');
            if (row) {
                var actions = row.querySelector('.ss-topic-actions');
                if (actions) {
                    // Replace Upload button with Notes button
                    var uploadBtn = actions.querySelector('.ss-action-link.muted');
                    if (uploadBtn) {
                        uploadBtn.className = 'ss-action-link';
                        uploadBtn.dataset.href = 'ai-tools.html?doc=' + uploadId;
                        uploadBtn.innerHTML = '<i class="fas fa-file-alt"></i> Notes';
                        uploadBtn.title = 'View your uploaded notes';
                    }
                }
            }
        }

        var doneBtn = document.getElementById('ss-upload-done-btn');
        if (doneBtn) {
            doneBtn.addEventListener('click', closeUploadModal);
        }
    }

    function showUploadError(message) {
        var body = document.getElementById('ss-upload-body');
        var prevState = body.querySelector('.ss-upload-state');
        if (prevState) prevState.remove();
        var prevError = body.querySelector('.ss-upload-error');
        if (prevError) prevError.remove();

        // Show dropzone again
        var dropzone = document.getElementById('ss-upload-dropzone');
        if (dropzone) dropzone.style.display = '';

        body.insertAdjacentHTML('beforeend',
            '<div class="ss-upload-error"><i class="fas fa-exclamation-circle"></i> ' + escapeHtml(message) + '</div>');
    }

    // ── Data fetching ────────────────────────────────

    async function fetchAndRender(forceRefresh) {
        try {
            var endpoint = forceRefresh
                ? '/api/semester/daily-plan/refresh'
                : '/api/semester/daily-plan?time_budget=' + timeBudget;

            var data;
            if (forceRefresh) {
                data = await apiCall(endpoint, {
                    method: 'POST',
                    body: JSON.stringify({ time_budget: timeBudget })
                });
            } else {
                data = await apiCall(endpoint);
            }

            planData = data;
            var tasks = (data.plan && data.plan.tasks) ? data.plan.tasks : [];

            if (params) {
                tasks = tasks.filter(function (t) {
                    return (t.exam_name || '') === params.exam &&
                           (t.class_name || '') === params.class &&
                           (t.exam_date || '') === params.date;
                });
            }

            allTasks = tasks;
            completedTopics = [];

            renderHeader();
            renderControls();
            renderProgress();
            renderTopics();

        } catch (err) {
            console.error('[StudySession] Failed to load:', err);
            renderError();
        }
    }

    // ── Header ───────────────────────────────────────

    function renderHeader() {
        if (!headerEl) return;
        var html = '';

        if (params) {
            var urgency = getUrgency(params.date);
            var dayText = getDayText(params.date);

            html += '<h1 class="ss-header-title">' +
                escapeHtml(params.exam) +
                (dayText ? ' <span class="ss-countdown-pill ' + urgency.cls + '">' +
                    '<i class="fas fa-clock"></i> ' + dayText + '</span>' : '') +
                '</h1>';
            html += '<div class="ss-header-meta">' +
                '<span>' + escapeHtml(params.class) + '</span>';
            if (params.date) {
                html += '<span>&middot;</span><span>' + formatDate(params.date) + '</span>';
            }
            html += '</div>';
        } else {
            html += '<h1 class="ss-header-title">' +
                '<i class="fas fa-calendar-day" style="color:var(--primary-color)"></i> ' +
                'Today\'s Study Plan</h1>';

            if (planData && planData.plan && planData.plan.next_exam) {
                var ne = planData.plan.next_exam;
                var neDayText = getDayText(ne.exam_date);
                html += '<div class="ss-header-meta">' +
                    '<span>Next up: <strong>' + escapeHtml(ne.exam_name) + '</strong> — ' +
                    escapeHtml(ne.class_name) + '</span>';
                if (neDayText) html += '<span>&middot;</span><span>' + neDayText + '</span>';
                html += '</div>';
            }
        }

        headerEl.innerHTML = html;
    }

    // ── Controls (time budget + context) ─────────────

    function renderControls() {
        if (!controlsEl) return;
        var html = '<div class="ss-controls-row">';
        html += '<span class="time-label">I have</span>';
        BUDGET_OPTIONS.forEach(function (opt) {
            var active = opt.mins === timeBudget ? ' active' : '';
            html += '<button class="time-btn' + active + '" data-time="' + opt.mins + '">' + opt.label + '</button>';
        });
        html += '<button class="refresh-btn" title="Refresh plan"><i class="fas fa-sync-alt"></i></button>';
        html += '</div>';

        // Context message explaining the current selection
        var currentOpt = BUDGET_OPTIONS.find(function (o) { return o.mins === timeBudget; });
        var examGroups = groupByExam(allTasks);
        var examCount = examGroups.length;
        var topicCount = allTasks.length;

        html += '<div class="ss-budget-context">';
        html += '<i class="fas fa-info-circle"></i> ';
        html += 'Showing <strong>' + topicCount + ' topic' + (topicCount !== 1 ? 's' : '') + '</strong>';
        if (examCount > 0) {
            html += ' across <strong>' + examCount + ' exam' + (examCount !== 1 ? 's' : '') + '</strong>';
        }
        if (currentOpt) {
            html += ' &middot; ' + currentOpt.label + ' focuses on ' + currentOpt.desc;
        }
        html += '</div>';

        controlsEl.innerHTML = html;

        // Time budget listeners
        controlsEl.querySelectorAll('.time-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var newTime = parseInt(this.dataset.time, 10);
                if (newTime === timeBudget) return;
                timeBudget = newTime;
                localStorage.setItem('studyPlanTimeBudget', newTime.toString());
                controlsEl.querySelectorAll('.time-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                fetchAndRender(true);
            });
        });

        var refreshBtn = controlsEl.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function () {
                var self = this;
                self.classList.add('spinning');
                fetchAndRender(true).then(function () {
                    self.classList.remove('spinning');
                });
            });
        }
    }

    // ── Progress ─────────────────────────────────────

    function renderProgress() {
        if (!progressEl) return;
        if (allTasks.length === 0) {
            progressEl.style.display = 'none';
            return;
        }

        progressEl.style.display = '';
        var done = completedTopics.length;
        var total = allTasks.length;
        var pct = total > 0 ? Math.round((done / total) * 100) : 0;

        progressEl.innerHTML =
            '<div class="ss-progress-bar-wrap"><div class="ss-progress-bar" style="width:' + pct + '%"></div></div>' +
            '<div class="ss-progress-label">' + done + ' of ' + total + ' topic' + (total !== 1 ? 's' : '') + ' reviewed</div>';
    }

    // ── Topic list ───────────────────────────────────

    function renderTopics() {
        if (!topicsEl) return;

        if (allTasks.length === 0) {
            topicsEl.innerHTML =
                '<div class="ss-empty">' +
                    '<div class="ss-empty-icon"><i class="fas fa-clipboard-list"></i></div>' +
                    '<div class="ss-empty-title">No study tasks yet</div>' +
                    '<div class="ss-empty-text">Add upcoming exams with topics from your dashboard, and we\'ll build your personalized study plan.</div>' +
                    '<a href="dashboard.html" class="sp-start-btn"><i class="fas fa-arrow-left"></i> Back to Dashboard</a>' +
                '</div>';
            return;
        }

        var html = '';
        var examGroups = groupByExam(allTasks);

        examGroups.forEach(function (group) {
            var dayText = getDayText(group.exam_date);
            var urgency = getUrgency(group.exam_date);
            var topicCount = group.tasks.length;

            // Exam group header
            html += '<div class="ss-exam-section">';
            html += '<div class="ss-exam-header ' + urgency.cls + '">';
            html += '<div class="ss-exam-header-info">';
            html += '<span class="ss-exam-header-name">' + escapeHtml(group.exam_name) + '</span>';
            html += '<span class="ss-exam-header-class">' + escapeHtml(group.class_name) + '</span>';
            html += '</div>';
            html += '<div class="ss-exam-header-right">';
            if (dayText) {
                html += '<span class="ss-countdown-pill ' + urgency.cls + '">' + dayText + '</span>';
            }
            html += '<span class="ss-exam-topic-count">' + topicCount + ' topic' + (topicCount !== 1 ? 's' : '') + '</span>';
            html += '</div></div>';

            // Compact topic rows
            html += '<div class="ss-topic-list">';
            group.tasks.forEach(function (task) {
                html += buildTopicRow(task, group);
            });
            html += '</div></div>';
        });

        topicsEl.innerHTML = html;
        attachTopicListeners();
    }

    function buildTopicRow(task, group) {
        var idx = allTasks.indexOf(task);
        var isDone = completedTopics.indexOf(idx) !== -1;
        var hasNotes = task.matched_documents && task.matched_documents.length > 0;
        var hasGuide = !!task.guide_id;

        // Filter out redundant reasons (exam countdown is in the header)
        var uniqueReasons = (task.reasons || []).filter(function (r) {
            return r.indexOf('exam in') === -1 &&
                   r.indexOf('exam tomorrow') === -1 &&
                   r.indexOf('no matching guide') === -1;
        });

        var html = '<div class="ss-topic-row' + (isDone ? ' ss-topic-done' : '') + '" data-idx="' + idx + '">';

        // Checkbox
        html += '<button class="ss-check-btn" title="Mark as reviewed">' +
            '<i class="fas fa-' + (isDone ? 'check-circle' : 'circle') + '"></i></button>';

        // Topic name + optional reason tag
        html += '<div class="ss-topic-info">';
        html += '<span class="ss-topic-name">' + escapeHtml(task.topic_name || 'Study Topic') + '</span>';
        if (uniqueReasons.length > 0) {
            html += '<span class="ss-reason-tag">' + escapeHtml(uniqueReasons[0]) + '</span>';
        }
        html += '</div>';

        // Action buttons (compact inline)
        html += '<div class="ss-topic-actions">';
        if (hasNotes) {
            var docId = task.matched_documents[0].id;
            html += '<button class="ss-action-link" data-href="ai-tools.html?doc=' + docId + '" title="View your uploaded notes">' +
                '<i class="fas fa-file-alt"></i> Notes</button>';
        }
        if (hasGuide) {
            var guideLink = task.link || ('guides/' + task.guide_id + '.html');
            html += '<button class="ss-action-link primary" data-href="' + escapeHtml(guideLink) + '" title="Open study guide">' +
                '<i class="fas fa-book-open"></i> Guide</button>';
        }
        if (!hasNotes) {
            html += '<button class="ss-action-link muted ss-upload-trigger" data-topic="' + escapeHtml(task.topic_name || '') + '" data-row-idx="' + idx + '" title="Upload your notes for this topic">' +
                '<i class="fas fa-upload"></i> Upload</button>';
        }
        // Related guides inline
        if (!hasGuide && task.related_guides && task.related_guides.length > 0) {
            task.related_guides.forEach(function (rg) {
                html += '<button class="ss-action-link" data-href="guides/' + escapeHtml(rg.id) + '.html" title="Related guide: ' + escapeHtml(rg.name) + '">' +
                    '<i class="fas fa-book-open"></i> ' + escapeHtml(rg.name) + '</button>';
            });
        }
        html += '</div>';

        html += '</div>';
        return html;
    }

    function attachTopicListeners() {
        // Upload triggers → open modal instead of navigating
        topicsEl.querySelectorAll('.ss-upload-trigger').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var topicName = this.dataset.topic || '';
                var rowIdx = parseInt(this.dataset.rowIdx, 10);
                openUploadModal(topicName, rowIdx);
            });
        });

        // Other action links → open in new tab
        topicsEl.querySelectorAll('.ss-action-link:not(.ss-upload-trigger)').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var href = this.dataset.href;
                if (href) window.open(href, '_blank');
            });
        });

        // Check buttons → toggle completion
        topicsEl.querySelectorAll('.ss-check-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var row = this.closest('.ss-topic-row');
                if (!row) return;
                var idx = parseInt(row.dataset.idx, 10);
                var icon = this.querySelector('i');

                var pos = completedTopics.indexOf(idx);
                if (pos === -1) {
                    completedTopics.push(idx);
                    row.classList.add('ss-topic-done');
                    if (icon) { icon.classList.remove('fa-circle'); icon.classList.add('fa-check-circle'); }
                } else {
                    completedTopics.splice(pos, 1);
                    row.classList.remove('ss-topic-done');
                    if (icon) { icon.classList.remove('fa-check-circle'); icon.classList.add('fa-circle'); }
                }
                renderProgress();
            });
        });

        // Clicking the row itself toggles too
        topicsEl.querySelectorAll('.ss-topic-row').forEach(function (row) {
            row.addEventListener('click', function () {
                var btn = this.querySelector('.ss-check-btn');
                if (btn) btn.click();
            });
        });
    }

    // ── Error state ──────────────────────────────────

    function renderError() {
        if (headerEl) headerEl.innerHTML = '';
        if (controlsEl) controlsEl.innerHTML = '';
        if (progressEl) progressEl.style.display = 'none';
        if (topicsEl) {
            topicsEl.innerHTML =
                '<div class="ss-empty">' +
                    '<div class="ss-empty-icon"><i class="fas fa-exclamation-triangle"></i></div>' +
                    '<div class="ss-empty-title">Something went wrong</div>' +
                    '<div class="ss-empty-text">Failed to load your study plan. Please try again.</div>' +
                    '<button class="sp-start-btn" id="ss-retry-btn"><i class="fas fa-redo"></i> Try Again</button>' +
                '</div>';

            var retryBtn = document.getElementById('ss-retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', function () {
                    topicsEl.innerHTML =
                        '<div class="ss-skeleton-card"><div class="skeleton-box" style="width:40px;height:40px;border-radius:10px;flex-shrink:0"></div>' +
                        '<div style="flex:1"><div class="skeleton-box" style="width:60%;height:16px;margin-bottom:8px"></div>' +
                        '<div class="skeleton-box" style="width:40%;height:12px"></div></div></div>';
                    fetchAndRender();
                });
            }
        }
    }

    // ── Utilities ────────────────────────────────────

    function groupByExam(tasks) {
        var groups = [];
        var map = {};
        tasks.forEach(function (task) {
            var key = (task.exam_name || 'General') + '|' + (task.class_name || '') + '|' + (task.exam_date || '');
            if (!map[key]) {
                map[key] = {
                    exam_name: task.exam_name || 'General Study',
                    class_name: task.class_name || '',
                    exam_date: task.exam_date || null,
                    tasks: []
                };
                groups.push(map[key]);
            }
            map[key].tasks.push(task);
        });
        groups.sort(function (a, b) {
            if (!a.exam_date && !b.exam_date) return 0;
            if (!a.exam_date) return 1;
            if (!b.exam_date) return -1;
            return a.exam_date.localeCompare(b.exam_date);
        });
        return groups;
    }

    function getUrgency(dateStr) {
        if (!dateStr) return { cls: 'normal', days: null };
        var days = Math.ceil((new Date(dateStr + 'T00:00:00') - new Date().setHours(0, 0, 0, 0)) / 86400000);
        var cls = days <= 1 ? 'urgent' : days <= 3 ? 'soon' : days <= 7 ? 'near' : 'normal';
        return { cls: cls, days: days };
    }

    function getDayText(dateStr) {
        if (!dateStr) return '';
        var u = getUrgency(dateStr);
        if (u.days === null) return '';
        if (u.days <= 0) return 'Today!';
        if (u.days === 1) return 'Tomorrow';
        return 'in ' + u.days + ' days';
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        var d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

})();
