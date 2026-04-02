/**
 * Exam Countdown Widget — shows upcoming exams with days remaining.
 * Shares semester data with study-plan-widget.js via a cached API call.
 */

(function () {
    'use strict';

    window.loadExamCountdown = async function () {
        var content = document.getElementById('exam-countdown-content');
        var editLink = document.getElementById('edit-exams-link');
        if (!content) return;

        try {
            var setupRes = await apiCall('/api/semester/setup');

            if (!setupRes || !setupRes.has_setup) {
                content.innerHTML = buildEmptyState();
                attachEmptyListeners();
                return;
            }

            if (editLink) editLink.classList.remove('hidden');
            if (editLink) {
                editLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (typeof openSemesterModal === 'function') openSemesterModal();
                });
            }

            renderExams(setupRes.classes);

        } catch (err) {
            console.error('[ExamCountdown] Failed to load:', err);
            content.innerHTML = buildEmptyState();
            attachEmptyListeners();
        }
    };

    function renderExams(classes) {
        var content = document.getElementById('exam-countdown-content');
        if (!content) return;

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        // Collect all upcoming exams with dates
        var exams = [];
        (classes || []).forEach(function (cls) {
            (cls.exams || []).forEach(function (exam) {
                if (exam.is_completed || !exam.exam_date) return;
                var examDate = new Date(exam.exam_date + 'T00:00:00');
                var diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
                if (diff < 0) return; // past exams
                exams.push({
                    name: exam.exam_name,
                    className: cls.class_name,
                    date: examDate,
                    days: diff
                });
            });
        });

        // Sort by soonest first
        exams.sort(function (a, b) { return a.days - b.days; });

        // Show up to 4 exams
        var visible = exams.slice(0, 4);

        if (visible.length === 0) {
            content.innerHTML = '<div class="ec-empty">No upcoming exams. Add exam dates to see countdowns here.</div>';
            return;
        }

        var html = '<div class="ec-list">';
        visible.forEach(function (exam) {
            var urgency = exam.days <= 1 ? 'urgent' : exam.days <= 3 ? 'soon' : exam.days <= 7 ? 'near' : 'normal';
            var dayText = exam.days === 0 ? 'Today' : exam.days === 1 ? 'Tomorrow' : exam.days + ' days';
            var dateStr = exam.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            // Progress bar: 30 days = 0%, 0 days = 100%
            var pct = Math.min(100, Math.max(0, ((30 - exam.days) / 30) * 100));

            html += '<div class="ec-item">' +
                '<div class="ec-item-top">' +
                    '<div class="ec-item-info">' +
                        '<span class="ec-item-name">' + esc(exam.name) + '</span>' +
                        '<span class="ec-item-class">' + esc(exam.className) + '</span>' +
                    '</div>' +
                    '<div class="ec-item-days ' + urgency + '">' + dayText + '</div>' +
                '</div>' +
                '<div class="ec-bar-track">' +
                    '<div class="ec-bar-fill ' + urgency + '" style="width:' + pct + '%"></div>' +
                '</div>' +
                '<div class="ec-item-date">' + dateStr + '</div>' +
            '</div>';
        });
        html += '</div>';

        if (exams.length > 4) {
            html += '<div class="ec-more">+' + (exams.length - 4) + ' more exam' + (exams.length - 4 !== 1 ? 's' : '') + '</div>';
        }

        content.innerHTML = html;
    }

    function buildEmptyState() {
        return '<div class="ec-empty-state">' +
            '<div class="ec-empty-icon"><i class="fas fa-calendar-plus"></i></div>' +
            '<p class="ec-empty-text">Add your exam dates to see countdowns here.</p>' +
            '<button class="ec-empty-btn" id="ec-setup-btn"><i class="fas fa-plus"></i> Set Up Semester</button>' +
        '</div>';
    }

    function attachEmptyListeners() {
        var btn = document.getElementById('ec-setup-btn');
        if (btn) {
            btn.addEventListener('click', function () {
                if (typeof openSemesterModal === 'function') openSemesterModal();
            });
        }
    }

    function esc(s) {
        var d = document.createElement('div');
        d.textContent = s || '';
        return d.innerHTML;
    }

})();
