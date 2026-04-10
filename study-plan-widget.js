/**
 * Study Plan Widget — "What Should I Study Today?"
 * Always visible on dashboard. Shows empty state with setup CTA
 * when no semester data exists, or the daily plan when it does.
 */

(function () {
    'use strict';

    var WIDGET_ID = 'study-plan-widget';
    var currentTimeBudget = parseInt(localStorage.getItem('studyPlanTimeBudget') || '60', 10);

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

    function renderPlan(plan) {
        var content = document.getElementById('study-plan-content');
        if (!content) return;

        var html = '';

        if (plan.tasks && plan.tasks.length > 0) {
            // Group tasks by exam
            var examGroups = [];
            var examMap = {};
            plan.tasks.forEach(function (task) {
                var key = (task.exam_name || 'General') + '|' + (task.class_name || '') + '|' + (task.exam_date || '');
                if (!examMap[key]) {
                    examMap[key] = {
                        exam_name: task.exam_name || 'General Study',
                        class_name: task.class_name || '',
                        exam_date: task.exam_date || null,
                        tasks: []
                    };
                    examGroups.push(examMap[key]);
                }
                examMap[key].tasks.push(task);
            });

            // Sort groups: soonest exam first
            examGroups.sort(function (a, b) {
                if (!a.exam_date && !b.exam_date) return 0;
                if (!a.exam_date) return 1;
                if (!b.exam_date) return -1;
                return a.exam_date.localeCompare(b.exam_date);
            });

            // Render compact launchpad cards (one per exam)
            examGroups.forEach(function (group) {
                var daysUntil = null;
                var urgency = 'normal';
                var dayText = '';
                if (group.exam_date) {
                    daysUntil = Math.ceil((new Date(group.exam_date + 'T00:00:00') - new Date().setHours(0,0,0,0)) / 86400000);
                    urgency = daysUntil <= 0 ? 'urgent' : daysUntil <= 1 ? 'urgent' : daysUntil <= 3 ? 'soon' : daysUntil <= 7 ? 'near' : 'normal';
                    dayText = daysUntil <= 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : 'in ' + daysUntil + ' days';
                }

                var taskCount = group.tasks.length;
                var sessionUrl = 'study-session.html?exam=' + encodeURIComponent(group.exam_name) +
                    '&class=' + encodeURIComponent(group.class_name) +
                    (group.exam_date ? '&date=' + encodeURIComponent(group.exam_date) : '');

                html += '<div class="sp-launchpad-card ' + urgency + '">';
                html += '<div class="sp-launchpad-info">';
                html += '<div class="sp-launchpad-name">' + group.exam_name + '</div>';
                html += '<div class="sp-launchpad-meta">';
                html += '<span>' + group.class_name + '</span>';
                if (dayText) {
                    html += '<span>&middot;</span><span class="sp-day-pill ' + urgency + '">' + dayText + '</span>';
                }
                html += '<span>&middot;</span><span>' + taskCount + ' topic' + (taskCount !== 1 ? 's' : '') + ' today</span>';
                html += '</div>';

                // Topic name previews (first 2)
                var previewNames = group.tasks.slice(0, 2).map(function (t) { return t.topic_name; });
                var previewText = previewNames.join(', ') + (taskCount > 2 ? '...' : '');
                html += '<div class="sp-launchpad-topics">' + previewText + '</div>';

                html += '</div>';
                html += '<a href="' + sessionUrl + '" class="sp-start-btn">Start Studying <i class="fas fa-arrow-right"></i></a>';
                html += '</div>';
            });

            // General "View Full Plan" link
            html += '<a href="study-session.html" class="sp-start-all">' +
                '<i class="fas fa-calendar-check"></i> View Full Study Plan</a>';

        } else {
            // No tasks — guide user to add exams
            html += '<div class="sp-empty-state">' +
                '<div class="sp-empty-icon"><i class="fas fa-clipboard-list"></i></div>' +
                '<div class="sp-empty-text">' +
                    '<p class="sp-empty-title">Add your exams to get started</p>' +
                    '<p class="sp-empty-desc">Add upcoming exams with topics from the Exam Countdown widget, and we\'ll build your personalized daily study plan.</p>' +
                '</div>' +
            '</div>';
        }

        content.innerHTML = html;
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
