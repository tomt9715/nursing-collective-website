/**
 * Study Session Page — Focused study experience
 * Loads the daily study plan and renders topic cards with action buttons,
 * progress tracking, and time budget controls.
 *
 * URL params:
 *   ?exam=<name>&class=<class>&date=<YYYY-MM-DD>  → filter to one exam
 *   (no params) → show full daily plan
 */

(function () {
    'use strict';

    // ── State ────────────────────────────────────────
    var timeBudget = parseInt(localStorage.getItem('studyPlanTimeBudget') || '30', 10);
    var completedTopics = [];   // indices of marked-done cards (session-only)
    var allTasks = [];          // current filtered task list
    var planData = null;        // raw API response

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

            // Filter to specific exam if params present
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
            // Specific exam
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
            // Full daily plan
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

    // ── Controls (time budget) ───────────────────────

    function renderControls() {
        if (!controlsEl) return;
        var html = '<span class="time-label">I have</span>';
        [15, 30, 45, 60].forEach(function (mins) {
            var active = mins === timeBudget ? ' active' : '';
            html += '<button class="time-btn' + active + '" data-time="' + mins + '">' + mins + 'm</button>';
        });
        html += '<button class="refresh-btn" title="Refresh plan"><i class="fas fa-sync-alt"></i></button>';

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

        // Refresh listener
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

    // ── Topic cards ──────────────────────────────────

    function renderTopics() {
        if (!topicsEl) return;

        if (allTasks.length === 0) {
            topicsEl.innerHTML =
                '<div class="ss-empty">' +
                    '<div class="ss-empty-icon"><i class="fas fa-check-circle"></i></div>' +
                    '<div class="ss-empty-title">You\'re all caught up!</div>' +
                    '<div class="ss-empty-text">No study tasks for today. Enjoy the break or add more exams from your dashboard.</div>' +
                    '<a href="dashboard.html" class="sp-start-btn"><i class="fas fa-arrow-left"></i> Back to Dashboard</a>' +
                '</div>';
            return;
        }

        var html = '';

        // If showing full plan (no exam filter), group by exam with dividers
        if (!params) {
            var examGroups = groupByExam(allTasks);
            examGroups.forEach(function (group, gi) {
                if (examGroups.length > 1) {
                    var dayText = getDayText(group.exam_date);
                    html += '<div class="ss-exam-divider">' +
                        '<span class="ss-exam-divider-name">' + escapeHtml(group.exam_name) +
                        ' — ' + escapeHtml(group.class_name) +
                        (dayText ? ' (' + dayText + ')' : '') + '</span>' +
                        '<div class="ss-exam-divider-line"></div></div>';
                }
                group.tasks.forEach(function (task) {
                    html += buildTopicCard(task);
                });
            });
        } else {
            allTasks.forEach(function (task) {
                html += buildTopicCard(task);
            });
        }

        topicsEl.innerHTML = html;
        attachTopicListeners();
    }

    function buildTopicCard(task) {
        var idx = allTasks.indexOf(task);
        var isDone = completedTopics.indexOf(idx) !== -1;
        var icon = getTaskIcon(task.task_type);
        var hasNotes = task.matched_documents && task.matched_documents.length > 0;
        var hasGuide = !!task.guide_id;

        var html = '<div class="ss-topic-card' + (isDone ? ' ss-topic-done' : '') + '" data-idx="' + idx + '">';

        // Icon
        html += '<div class="task-icon ' + (task.task_type || '') + '"><i class="' + icon + '"></i></div>';

        // Body
        html += '<div class="ss-topic-body">';
        html += '<div class="ss-topic-name">' + escapeHtml(task.topic_name || 'Study Topic') + '</div>';

        // Reason badges
        if (task.reasons && task.reasons.length > 0) {
            html += '<div class="ss-task-reasons">';
            task.reasons.forEach(function (r) {
                html += '<span class="ss-reason-badge">' + escapeHtml(r) + '</span>';
            });
            html += '</div>';
        }

        // Action buttons
        html += '<div class="ss-topic-actions">';
        html += buildActions(task, hasNotes, hasGuide);
        html += '</div>';

        html += '</div>'; // .ss-topic-body

        // Done button
        html += '<button class="ss-done-btn" title="Mark as reviewed"><i class="fas fa-check"></i></button>';

        html += '</div>'; // .ss-topic-card
        return html;
    }

    function buildActions(task, hasNotes, hasGuide) {
        var html = '';

        if (hasNotes) {
            var docId = task.matched_documents[0].id;
            html += '<button class="task-action-btn primary" data-href="ai-tools.html?doc=' + docId + '">' +
                '<i class="fas fa-file-alt"></i> Your Notes</button>';
        }

        if (hasGuide) {
            var guideLink = task.link || ('guides/' + task.guide_id + '.html');
            var btnClass = hasNotes ? 'secondary' : 'primary';
            html += '<button class="task-action-btn ' + btnClass + '" data-href="' + escapeHtml(guideLink) + '">' +
                '<i class="fas fa-book-open"></i> Our Guide</button>';
        }

        if (!hasNotes) {
            var uploadClass = hasGuide ? 'tertiary' : 'primary';
            html += '<button class="task-action-btn ' + uploadClass + '" data-href="ai-tools.html">' +
                '<i class="fas fa-upload"></i> Upload Notes</button>';
        }

        return html;
    }

    function attachTopicListeners() {
        // Action buttons → navigate
        topicsEl.querySelectorAll('.task-action-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var href = this.dataset.href;
                if (href) window.location.href = href;
            });
        });

        // Done buttons → toggle completion
        topicsEl.querySelectorAll('.ss-done-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var card = this.closest('.ss-topic-card');
                if (!card) return;
                var idx = parseInt(card.dataset.idx, 10);

                var pos = completedTopics.indexOf(idx);
                if (pos === -1) {
                    completedTopics.push(idx);
                    card.classList.add('ss-topic-done');
                } else {
                    completedTopics.splice(pos, 1);
                    card.classList.remove('ss-topic-done');
                }
                renderProgress();
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

    function getTaskIcon(taskType) {
        switch (taskType) {
            case 'practice_quiz': return 'fas fa-brain';
            case 'start_guide': return 'fas fa-book-open';
            case 'review_guide': return 'fas fa-book-reader';
            case 'uncovered_topic': return 'fas fa-flag';
            default: return 'fas fa-tasks';
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

})();
