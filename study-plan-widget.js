/**
 * Study Plan Widget — "What Should I Study Today?"
 * Fetches the daily plan from the API and renders it on the dashboard.
 * Handles time budget selection and plan refresh.
 */

(function () {
    'use strict';

    const WIDGET_ID = 'study-plan-widget';
    const SETUP_PROMPT_ID = 'semester-setup-prompt';
    let currentTimeBudget = parseInt(localStorage.getItem('studyPlanTimeBudget') || '30', 10);

    /**
     * Load the study plan widget on the dashboard.
     * Called from dashboard-script.js during loadDashboardSections().
     */
    window.loadStudyPlan = async function () {
        const widget = document.getElementById(WIDGET_ID);
        const prompt = document.getElementById(SETUP_PROMPT_ID);
        if (!widget) return;

        // Check if user has semester setup
        try {
            const setupRes = await apiCall('/api/semester/setup');
            if (!setupRes || !setupRes.has_setup) {
                // Show setup prompt, hide widget
                widget.classList.add('hidden');
                if (prompt) prompt.classList.remove('hidden');
                return;
            }

            // Hide setup prompt, show widget
            if (prompt) prompt.classList.add('hidden');
            widget.classList.remove('hidden');

            // Fetch daily plan
            await fetchAndRenderPlan();

        } catch (err) {
            console.error('[StudyPlan] Failed to load:', err);
            widget.classList.add('hidden');
        }
    };

    async function fetchAndRenderPlan(forceRefresh) {
        const content = document.getElementById('study-plan-content');
        if (!content) return;

        // Show loading skeleton
        content.innerHTML = buildSkeleton();

        try {
            let data;
            if (forceRefresh) {
                data = await apiCall('/api/semester/daily-plan/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ time_budget: currentTimeBudget })
                });
            } else {
                data = await apiCall(`/api/semester/daily-plan?time_budget=${currentTimeBudget}`);
            }

            if (!data || !data.plan) {
                content.innerHTML = '<div class="study-plan-empty">Unable to load study plan.</div>';
                return;
            }

            renderPlan(data.plan, data.time_budget_minutes);

        } catch (err) {
            console.error('[StudyPlan] Fetch failed:', err);
            content.innerHTML = '<div class="study-plan-empty">Failed to load study plan. Try refreshing.</div>';
        }
    }

    function renderPlan(plan, timeBudget) {
        const content = document.getElementById('study-plan-content');
        if (!content) return;

        let html = '';

        // Exam countdown banner
        if (plan.next_exam && plan.next_exam.days_until <= 7) {
            const days = plan.next_exam.days_until;
            const urgency = days <= 1 ? 'urgent' : days <= 3 ? 'soon' : 'upcoming';
            html += `
                <div class="exam-countdown ${urgency}">
                    <i class="fas fa-clock"></i>
                    <span><strong>${plan.next_exam.exam_name}</strong> (${plan.next_exam.class_name}) — ${days === 0 ? 'Today!' : days === 1 ? 'Tomorrow!' : `in ${days} days`}</span>
                </div>
            `;
        }

        // Task list
        if (plan.tasks && plan.tasks.length > 0) {
            html += '<div class="study-plan-tasks">';
            plan.tasks.forEach(function (task, i) {
                const icon = getTaskIcon(task.task_type);
                const badge = task.reasons && task.reasons.length > 0
                    ? `<span class="task-reason-badge">${task.reasons[0]}</span>`
                    : '';

                const linkAttr = task.link
                    ? `data-navigate="${task.link}"`
                    : '';
                const clickable = task.link ? 'clickable' : '';

                html += `
                    <div class="study-plan-task ${clickable}" ${linkAttr}>
                        <div class="task-number">${i + 1}</div>
                        <div class="task-icon ${task.task_type}"><i class="${icon}"></i></div>
                        <div class="task-info">
                            <div class="task-description">${task.description}</div>
                            <div class="task-meta">
                                <span class="task-class">${task.class_name}</span>
                                ${badge}
                            </div>
                        </div>
                        ${task.link ? '<div class="task-arrow"><i class="fas fa-chevron-right"></i></div>' : ''}
                    </div>
                `;
            });
            html += '</div>';
        } else if (plan.message) {
            html += `<div class="study-plan-empty">${plan.message}</div>`;
        } else {
            html += '<div class="study-plan-empty">No study tasks for today. You\'re all caught up!</div>';
        }

        // Time budget selector
        html += `
            <div class="time-selector">
                <span class="time-label">I have</span>
                ${[15, 30, 45, 60].map(function (mins) {
                    const active = mins === currentTimeBudget ? 'active' : '';
                    return `<button class="time-btn ${active}" data-time="${mins}">${mins}m</button>`;
                }).join('')}
                <button class="refresh-btn" title="Refresh plan"><i class="fas fa-sync-alt"></i></button>
            </div>
        `;

        content.innerHTML = html;

        // Attach event listeners
        content.querySelectorAll('.study-plan-task.clickable').forEach(function (el) {
            el.addEventListener('click', function () {
                const url = this.dataset.navigate;
                if (url) window.location.href = url;
            });
        });

        content.querySelectorAll('.time-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const newTime = parseInt(this.dataset.time, 10);
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
                this.classList.add('spinning');
                var self = this;
                fetchAndRenderPlan(true).then(function () {
                    self.classList.remove('spinning');
                });
            });
        }
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
            rows += `
                <div class="study-plan-task skeleton">
                    <div class="task-number skeleton-box" style="width:24px;height:24px;border-radius:50%"></div>
                    <div class="task-icon skeleton-box" style="width:36px;height:36px;border-radius:8px"></div>
                    <div class="task-info">
                        <div class="skeleton-box" style="width:70%;height:16px;border-radius:4px;margin-bottom:6px"></div>
                        <div class="skeleton-box" style="width:40%;height:12px;border-radius:4px"></div>
                    </div>
                </div>
            `;
        }
        return '<div class="study-plan-tasks">' + rows + '</div>';
    }

})();
