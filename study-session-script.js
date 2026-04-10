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

        await fetchAndRender();
    });

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
            html += '<button class="ss-action-link muted" data-href="ai-tools.html" title="Upload your notes for AI study tools">' +
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
        // Action links → open in new tab
        topicsEl.querySelectorAll('.ss-action-link').forEach(function (btn) {
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
