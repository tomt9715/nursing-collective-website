/**
 * Study Plan Widget — "What Should I Study Today?"
 * Always visible on dashboard. Shows empty state with setup CTA
 * when no semester data exists, or the daily plan when it does.
 */

(function () {
    'use strict';

    var WIDGET_ID = 'study-plan-widget';
    var currentTimeBudget = parseInt(localStorage.getItem('studyPlanTimeBudget') || '30', 10);

    /**
     * Load the study plan widget on the dashboard.
     * Called from dashboard-script.js during loadDashboardSections().
     */
    window.loadStudyPlan = async function () {
        var widget = document.getElementById(WIDGET_ID);
        if (!widget) return;

        var content = document.getElementById('study-plan-content');
        var editLink = document.getElementById('edit-semester-link');

        try {
            var setupRes = await apiCall('/api/semester/setup');

            if (!setupRes || !setupRes.has_setup) {
                // No semester data — show empty state
                if (editLink) editLink.classList.add('hidden');
                if (content) content.innerHTML = buildEmptyState();
                attachEmptyStateListeners();
                return;
            }

            // Has semester data — show edit link and fetch plan
            if (editLink) editLink.classList.remove('hidden');
            await fetchAndRenderPlan();

        } catch (err) {
            console.error('[StudyPlan] Failed to load:', err);
            if (content) content.innerHTML = buildEmptyState();
            attachEmptyStateListeners();
        }
    };

    function buildEmptyState() {
        return '' +
            '<div class="sp-empty-state">' +
                '<div class="sp-empty-icon"><i class="fas fa-calendar-plus"></i></div>' +
                '<div class="sp-empty-text">' +
                    '<p class="sp-empty-title">No study plan yet</p>' +
                    '<p class="sp-empty-desc">Add your classes and exam dates to get personalized daily recommendations.</p>' +
                '</div>' +
                '<button class="sp-empty-btn" id="sp-setup-btn">' +
                    '<i class="fas fa-plus"></i> Set Up Semester' +
                '</button>' +
            '</div>';
    }

    function attachEmptyStateListeners() {
        var btn = document.getElementById('sp-setup-btn');
        if (btn) {
            btn.addEventListener('click', function () {
                if (typeof openSemesterModal === 'function') openSemesterModal();
            });
        }
    }

    async function fetchAndRenderPlan(forceRefresh) {
        var content = document.getElementById('study-plan-content');
        if (!content) return;

        content.innerHTML = buildSkeleton();

        try {
            var data;
            if (forceRefresh) {
                data = await apiCall('/api/semester/daily-plan/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ time_budget: currentTimeBudget })
                });
            } else {
                data = await apiCall('/api/semester/daily-plan?time_budget=' + currentTimeBudget);
            }

            if (!data || !data.plan) {
                content.innerHTML = '<div class="sp-empty-state"><p class="sp-empty-desc">Unable to load study plan.</p></div>';
                return;
            }

            renderPlan(data.plan, data.time_budget_minutes);

        } catch (err) {
            console.error('[StudyPlan] Fetch failed:', err);
            content.innerHTML = '<div class="sp-empty-state"><p class="sp-empty-desc">Failed to load study plan. Try refreshing.</p></div>';
        }
    }

    function renderPlan(plan, timeBudget) {
        var content = document.getElementById('study-plan-content');
        if (!content) return;

        var html = '';

        // Exam countdown
        if (plan.next_exam && plan.next_exam.days_until <= 7) {
            var days = plan.next_exam.days_until;
            var urgency = days <= 1 ? 'urgent' : days <= 3 ? 'soon' : 'upcoming';
            html += '<div class="exam-countdown ' + urgency + '">' +
                '<i class="fas fa-clock"></i> ' +
                '<span><strong>' + plan.next_exam.exam_name + '</strong> (' + plan.next_exam.class_name + ') — ' +
                (days === 0 ? 'Today!' : days === 1 ? 'Tomorrow!' : 'in ' + days + ' days') +
                '</span></div>';
        }

        // Task list
        if (plan.tasks && plan.tasks.length > 0) {
            html += '<div class="study-plan-tasks">';
            plan.tasks.forEach(function (task, i) {
                var icon = getTaskIcon(task.task_type);
                var badge = task.reasons && task.reasons.length > 0
                    ? '<span class="task-reason-badge">' + task.reasons[0] + '</span>'
                    : '';
                var hasNotes = task.matched_documents && task.matched_documents.length > 0;
                var hasGuide = !!task.guide_id;

                html += '<div class="study-plan-task">' +
                    '<div class="task-number">' + (i + 1) + '</div>' +
                    '<div class="task-icon ' + task.task_type + '"><i class="' + icon + '"></i></div>' +
                    '<div class="task-info">' +
                        '<div class="task-description">' + task.topic_name + '</div>' +
                        '<div class="task-meta">' +
                            '<span class="task-class">' + task.class_name + '</span>' +
                            badge +
                        '</div>' +
                    '</div>' +
                    '<div class="task-actions">' +
                        buildTaskActions(task, hasNotes, hasGuide) +
                    '</div>' +
                    '</div>';
            });
            html += '</div>';
        } else if (plan.message) {
            html += '<div class="sp-empty-state"><p class="sp-empty-desc">' + plan.message + '</p></div>';
        } else {
            html += '<div class="sp-empty-state"><p class="sp-empty-desc">No study tasks for today. You\'re all caught up!</p></div>';
        }

        // Time budget selector
        html += '<div class="time-selector">' +
            '<span class="time-label">I have</span>';
        [15, 30, 45, 60].forEach(function (mins) {
            var active = mins === currentTimeBudget ? 'active' : '';
            html += '<button class="time-btn ' + active + '" data-time="' + mins + '">' + mins + 'm</button>';
        });
        html += '<button class="refresh-btn" title="Refresh plan"><i class="fas fa-sync-alt"></i></button></div>';

        content.innerHTML = html;

        // Event listeners for action buttons
        content.querySelectorAll('.task-action-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var href = this.dataset.href;
                if (href) window.location.href = href;
            });
        });

        content.querySelectorAll('.time-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var newTime = parseInt(this.dataset.time, 10);
                if (newTime === currentTimeBudget) return;
                currentTimeBudget = newTime;
                localStorage.setItem('studyPlanTimeBudget', newTime.toString());
                content.querySelectorAll('.time-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                fetchAndRenderPlan(true);
            });
        });

        var refreshBtn = content.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function () {
                var self = this;
                self.classList.add('spinning');
                fetchAndRenderPlan(true).then(function () { self.classList.remove('spinning'); });
            });
        }
    }

    function buildTaskActions(task, hasNotes, hasGuide) {
        var html = '';

        if (hasNotes) {
            var docId = task.matched_documents[0].id;
            html += '<button class="task-action-btn primary" data-href="ai-tools.html?doc=' + docId + '">' +
                '<i class="fas fa-file-alt"></i> Your Notes</button>';
        }

        if (hasGuide) {
            var guideLink = task.link || ('guides/' + task.guide_id + '.html');
            var btnClass = hasNotes ? 'secondary' : 'primary';
            html += '<button class="task-action-btn ' + btnClass + '" data-href="' + guideLink + '">' +
                '<i class="fas fa-book-open"></i> Our Guide</button>';
        }

        if (!hasNotes) {
            var uploadClass = hasGuide ? 'tertiary' : 'primary';
            html += '<button class="task-action-btn ' + uploadClass + '" data-href="ai-tools.html">' +
                '<i class="fas fa-upload"></i> Upload Notes</button>';
        }

        return html;
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

    function buildSkeleton() {
        var rows = '';
        for (var i = 0; i < 3; i++) {
            rows += '<div class="study-plan-task skeleton">' +
                '<div class="task-number skeleton-box" style="width:24px;height:24px;border-radius:50%"></div>' +
                '<div class="task-icon skeleton-box" style="width:36px;height:36px;border-radius:8px"></div>' +
                '<div class="task-info">' +
                    '<div class="skeleton-box" style="width:70%;height:16px;border-radius:4px;margin-bottom:6px"></div>' +
                    '<div class="skeleton-box" style="width:40%;height:12px;border-radius:4px"></div>' +
                '</div></div>';
        }
        return '<div class="study-plan-tasks">' + rows + '</div>';
    }

})();
