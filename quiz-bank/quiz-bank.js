/**
 * Quiz Bank Engine
 * The Nursing Collective
 *
 * Handles:
 *  - Hub page rendering (mastery overview, quick start, chapter browser, custom builder)
 *  - Quiz session (question rendering, feedback, results with mastery integration)
 *
 * Supports Single, Ordering, Matrix question types.
 * Ported rendering from guide quiz engine, adapted for mastery tracking.
 * CSP-compliant: all events via delegation on data attributes.
 */

var QuizBank = (function () {
    'use strict';

    // ── State ──────────────────────────────────────────────

    var _root = null;              // #quiz-bank-root element
    var _view = 'hub';             // 'hub' | 'quiz' | 'results'
    var _mode = null;              // 'practice' | 'exam'
    var _currentQuestions = [];     // active question set
    var _currentIndex = 0;
    var _answers = {};             // questionId -> userAnswer
    var _results = {};             // questionId -> { correct, userAnswer, correctAnswer }
    var _submitted = {};           // questionId -> true
    var _setSize = 5;
    var _currentTopicId = null;
    var _currentTopicLabel = null;
    var _currentChapterId = null;
    var _isCustom = false;         // custom quiz builder session
    var _orderingSequence = [];    // ordering click order
    var _shuffledOptions = {};     // questionId -> { options, letterMap }
    var _boundClickHandler = null;
    var _boundKeyHandler = null;
    var _boundBeforeUnload = null;

    // ── Init ───────────────────────────────────────────────

    function init() {
        _root = document.getElementById('quiz-bank-root');
        if (!_root) return;

        _boundClickHandler = _handleClick;
        _boundKeyHandler = _handleKeydown;
        _boundBeforeUnload = _handleBeforeUnload;

        _root.addEventListener('click', _boundClickHandler);
        _root.addEventListener('keydown', _boundKeyHandler);

        renderHub();
    }

    // ══════════════════════════════════════════════════════
    //  HUB PAGE
    // ══════════════════════════════════════════════════════

    function renderHub() {
        _view = 'hub';
        window.removeEventListener('beforeunload', _boundBeforeUnload);
        window.scrollTo({ top: 0 });

        var stats = MasteryTracker.getOverallStats();
        var hasData = stats.totalSetsCompleted > 0;
        var totalTopics = _countTotalTopics();
        var chaptersInProgress = MasteryTracker.getChaptersInProgress();
        var totalAvailableQuestions = _getTotalAvailableQuestions();

        var html = '';

        // ── Section A: Mastery Overview ──────────────────
        html += '<section class="qb-section qb-mastery-overview">';
        html += '<h2 class="qb-section-title"><i class="fas fa-chart-line"></i> My Mastery Overview</h2>';

        if (hasData) {
            html += '<div class="qb-stats-grid">';
            html += _statCard('fas fa-layer-group', 'Average Level', stats.averageLevel.toFixed(1), MasteryTracker.getMasteryColorClass(Math.floor(stats.averageLevel)));
            html += _statCard('fas fa-book-open', 'Chapters Started', chaptersInProgress + ' of 15', '');
            html += _statCard('fas fa-trophy', 'Topics Mastered', stats.topicsMastered + ' of ' + totalTopics, '');
            html += _statCard('fas fa-question-circle', 'Questions Answered', stats.totalQuestionsAnswered.toLocaleString(), '');
            html += _statCard('fas fa-bullseye', 'Accuracy', stats.accuracy + '%', '');
            html += _statCard('fas fa-fire', 'Study Streak', stats.streak + ' day' + (stats.streak !== 1 ? 's' : ''), '');
            html += '</div>';

            // Weakest & strongest
            if (stats.weakestTopics.length > 0) {
                html += '<div class="qb-weak-strong">';
                html += '<div class="qb-weak-col">';
                html += '<div class="qb-weak-strong-title"><i class="fas fa-exclamation-triangle"></i> Weakest Topics</div>';
                stats.weakestTopics.forEach(function (t) {
                    var label = MasteryTracker.getTopicLabel(t.id);
                    var color = MasteryTracker.getMasteryColor(t.level);
                    html += '<div class="qb-weak-item">';
                    html += '<span class="qb-weak-name">' + _esc(label) + '</span>';
                    html += '<span class="qb-weak-level" style="color:' + color + '">Level ' + t.level + '</span>';
                    html += '</div>';
                });
                html += '</div>';

                html += '<div class="qb-strong-col">';
                html += '<div class="qb-weak-strong-title"><i class="fas fa-star"></i> Strongest Topics</div>';
                stats.strongestTopics.forEach(function (t) {
                    var label = MasteryTracker.getTopicLabel(t.id);
                    var color = MasteryTracker.getMasteryColor(t.level);
                    html += '<div class="qb-weak-item">';
                    html += '<span class="qb-weak-name">' + _esc(label) + '</span>';
                    html += '<span class="qb-weak-level" style="color:' + color + '">Level ' + t.level + '</span>';
                    html += '</div>';
                });
                html += '</div>';
                html += '</div>';
            }
        } else {
            html += '<div class="qb-empty-state">';
            html += '<div class="qb-empty-icon"><i class="fas fa-rocket"></i></div>';
            html += '<div class="qb-empty-title">Start your first quiz to begin tracking mastery</div>';
            html += '<div class="qb-empty-desc">Complete question sets to earn mastery points across 15 chapters and 129 topics.</div>';
            html += '</div>';
        }
        html += '</section>';

        // ── Section B: Quick Start Cards ─────────────────
        html += '<section class="qb-section qb-quick-start">';
        html += '<h2 class="qb-section-title"><i class="fas fa-bolt"></i> Quick Start</h2>';
        html += '<div class="qb-quick-cards">';

        var noQuestions = totalAvailableQuestions === 0;

        html += _quickCard(
            'fas fa-play-circle', 'Quick 10',
            '10 questions weighted toward weak topics',
            noQuestions, 'quick-10'
        );
        html += _quickCard(
            'fas fa-crosshairs', 'Weak Spot Focus',
            'Drill your 3 lowest mastery topics',
            noQuestions, 'weak-focus'
        );
        html += _quickCard(
            'fas fa-sliders-h', 'Build Custom Quiz',
            'Choose chapters, topics, difficulty & more',
            false, 'scroll-builder'
        );

        html += '</div>';
        html += '</section>';

        // ── Section C: Browse by Chapter ─────────────────
        html += '<section class="qb-section qb-chapters">';
        html += '<h2 class="qb-section-title"><i class="fas fa-book"></i> Browse by Chapter</h2>';

        QUIZ_BANK_REGISTRY.chapters.forEach(function (chapter) {
            var topicIds = chapter.topics.map(function (t) { return t.id; });
            var chapterMastery = MasteryTracker.getChapterMastery(topicIds);
            var availableTopics = chapter.topics.filter(function (t) { return t.file !== null; }).length;
            var totalTopicsInChapter = chapter.topics.length;

            html += '<div class="qb-chapter" data-chapter-id="' + _esc(chapter.id) + '">';
            html += '<button class="qb-chapter-header" data-qb-action="toggle-chapter" data-chapter="' + _esc(chapter.id) + '" aria-expanded="false">';
            html += '<span class="qb-chapter-emoji">' + chapter.emoji + '</span>';
            html += '<span class="qb-chapter-label">' + _esc(chapter.label) + '</span>';
            html += '<span class="qb-chapter-meta">' + totalTopicsInChapter + ' topics</span>';

            if (availableTopics > 0) {
                var mastColor = MasteryTracker.getMasteryColor(Math.floor(chapterMastery.averageLevel));
                html += '<span class="qb-chapter-mastery" style="color:' + mastColor + '">Level ' + chapterMastery.averageLevel.toFixed(1) + '</span>';
            } else {
                html += '<span class="qb-chapter-badge qb-badge-coming-soon"><i class="fas fa-lock"></i> Coming Soon</span>';
            }

            html += '<i class="fas fa-chevron-down qb-chapter-arrow"></i>';
            html += '</button>';

            html += '<div class="qb-chapter-topics">';
            chapter.topics.forEach(function (topic) {
                var topicMastery = MasteryTracker.getTopicMastery(topic.id);
                var hasQuestions = topic.file !== null;
                var masteryBarPct = Math.min(100, (topicMastery.points / 80) * 100);

                html += '<div class="qb-topic' + (hasQuestions ? '' : ' qb-topic--locked') + '">';
                html += '<div class="qb-topic-info">';
                html += '<span class="qb-topic-name">' + _esc(topic.label) + '</span>';

                if (hasQuestions) {
                    var topicColor = MasteryTracker.getMasteryColor(topicMastery.level);
                    html += '<div class="qb-topic-mastery-row">';
                    html += '<div class="qb-topic-bar"><div class="qb-topic-bar-fill" style="width:' + masteryBarPct + '%;background:' + topicColor + '"></div></div>';
                    html += '<span class="qb-topic-level" style="color:' + topicColor + '">Lv ' + topicMastery.level + '</span>';
                    html += '</div>';
                } else {
                    html += '<span class="qb-topic-coming-soon"><i class="fas fa-lock"></i> Coming Soon</span>';
                }

                html += '</div>';

                if (hasQuestions) {
                    html += '<button class="qb-topic-start" data-qb-action="start-topic" data-topic="' + _esc(topic.id) + '" data-chapter="' + _esc(chapter.id) + '">Practice <i class="fas fa-arrow-right"></i></button>';
                }

                if (topic.hasGuide && topic.guideUrl) {
                    html += '<a href="../guides/' + _esc(topic.guideUrl) + '" class="qb-topic-guide-link" title="Study Guide"><i class="fas fa-book-open"></i></a>';
                }

                html += '</div>';
            });
            html += '</div>';
            html += '</div>';
        });

        html += '</section>';

        // ── Section D: Custom Quiz Builder ───────────────
        html += '<section class="qb-section qb-builder" id="qb-builder">';
        html += '<h2 class="qb-section-title"><i class="fas fa-sliders-h"></i> Custom Quiz Builder</h2>';

        html += '<div class="qb-builder-form">';

        // Chapters multi-select
        html += '<div class="qb-builder-group">';
        html += '<label class="qb-builder-label">Chapters</label>';
        html += '<div class="qb-builder-chips" id="qb-chapter-chips">';
        QUIZ_BANK_REGISTRY.chapters.forEach(function (chapter) {
            var availCount = chapter.topics.filter(function (t) { return t.file !== null; }).length;
            html += '<button class="qb-chip" data-qb-action="toggle-chip" data-chip-type="chapter" data-chip-value="' + _esc(chapter.id) + '"' + (availCount === 0 ? ' disabled' : '') + '>';
            html += chapter.emoji + ' ' + _esc(chapter.label);
            if (availCount === 0) html += ' (0)';
            html += '</button>';
        });
        html += '</div>';
        html += '</div>';

        // Topics within selected chapters
        html += '<div class="qb-builder-group">';
        html += '<label class="qb-builder-label">Topics <span class="qb-builder-hint">(select chapters first)</span></label>';
        html += '<div class="qb-builder-chips" id="qb-topic-chips">';
        html += '<div class="qb-builder-placeholder">Select one or more chapters above to see available topics.</div>';
        html += '</div>';
        html += '</div>';

        // Difficulty
        html += '<div class="qb-builder-group">';
        html += '<label class="qb-builder-label">Difficulty</label>';
        html += '<div class="qb-builder-chips" id="qb-difficulty-chips">';
        ['Knowledge', 'Application', 'Analysis'].forEach(function (d) {
            html += '<button class="qb-chip qb-chip--active" data-qb-action="toggle-chip" data-chip-type="difficulty" data-chip-value="' + d.toLowerCase() + '">' + d + '</button>';
        });
        html += '</div>';
        html += '</div>';

        // Question types
        html += '<div class="qb-builder-group">';
        html += '<label class="qb-builder-label">Question Types</label>';
        html += '<div class="qb-builder-chips" id="qb-type-chips">';
        [['Single', 'single'], ['Ordering', 'ordering'], ['Matrix', 'matrix']].forEach(function (pair) {
            html += '<button class="qb-chip qb-chip--active" data-qb-action="toggle-chip" data-chip-type="qtype" data-chip-value="' + pair[1] + '">' + pair[0] + '</button>';
        });
        html += '</div>';
        html += '</div>';

        // Set size
        html += '<div class="qb-builder-group">';
        html += '<label class="qb-builder-label">Set Size</label>';
        html += '<div class="qb-builder-chips">';
        html += '<button class="qb-chip qb-chip--active" data-qb-action="set-size" data-size="5">5 Questions</button>';
        html += '<button class="qb-chip" data-qb-action="set-size" data-size="10">10 Questions</button>';
        html += '<button class="qb-chip" data-qb-action="set-size" data-size="15">15 Questions</button>';
        html += '<button class="qb-chip" data-qb-action="set-size" data-size="max">Max (<span id="qb-builder-max-count">0</span>)</button>';
        html += '</div>';
        html += '</div>';

        // Toggles
        html += '<div class="qb-builder-group">';
        html += '<label class="qb-builder-label">Preferences</label>';
        html += '<div class="qb-builder-toggles">';
        html += '<label class="qb-toggle"><input type="checkbox" id="qb-pref-weak" checked> Prioritize weak topics</label>';
        html += '<label class="qb-toggle"><input type="checkbox" id="qb-pref-unseen" checked> Unseen questions first</label>';
        html += '</div>';
        html += '</div>';

        // Mode
        html += '<div class="qb-builder-group">';
        html += '<label class="qb-builder-label">Mode</label>';
        html += '<div class="qb-builder-chips">';
        html += '<button class="qb-chip qb-chip--active" data-qb-action="set-mode" data-mode="practice">Practice</button>';
        html += '<button class="qb-chip" data-qb-action="set-mode" data-mode="exam">Exam</button>';
        html += '</div>';
        html += '</div>';

        // Match count & start
        html += '<div class="qb-builder-footer">';
        html += '<div class="qb-builder-count" id="qb-match-count">0 questions match</div>';
        html += '<button class="qb-btn qb-btn--primary qb-btn--lg" data-qb-action="start-custom" disabled>Start Quiz</button>';
        html += '</div>';

        html += '</div>';
        html += '</section>';

        _root.innerHTML = html;

        // Update match count
        _updateBuilderCount();
    }

    // ── Hub Helpers ────────────────────────────────────────

    function _statCard(icon, label, value, colorClass) {
        return '<div class="qb-stat-card ' + (colorClass || '') + '">' +
            '<div class="qb-stat-icon"><i class="' + icon + '"></i></div>' +
            '<div class="qb-stat-value">' + value + '</div>' +
            '<div class="qb-stat-label">' + _esc(label) + '</div>' +
            '</div>';
    }

    function _quickCard(icon, title, desc, disabled, action) {
        var cls = 'qb-quick-card' + (disabled ? ' qb-quick-card--disabled' : '');
        return '<button class="' + cls + '" data-qb-action="' + action + '"' + (disabled ? ' disabled' : '') + '>' +
            '<div class="qb-quick-icon"><i class="' + icon + '"></i></div>' +
            '<div class="qb-quick-title">' + _esc(title) + '</div>' +
            '<div class="qb-quick-desc">' + (disabled ? 'Questions coming soon!' : _esc(desc)) + '</div>' +
            '</button>';
    }

    function _countTotalTopics() {
        var count = 0;
        QUIZ_BANK_REGISTRY.chapters.forEach(function (c) { count += c.topics.length; });
        return count;
    }

    function _getTotalAvailableQuestions() {
        // Count topics that have question files
        var count = 0;
        QUIZ_BANK_REGISTRY.chapters.forEach(function (c) {
            c.topics.forEach(function (t) {
                if (t.file !== null) count++;
            });
        });
        return count; // rough proxy — actual question count would come from loaded files
    }

    function _updateBuilderCount() {
        var countEl = document.getElementById('qb-match-count');
        var startBtn = _root.querySelector('[data-qb-action="start-custom"]');
        if (!countEl || !startBtn) return;

        var count = MasteryTracker.countAvailableQuestions(_getBuilderFilters());
        countEl.textContent = count + ' question' + (count !== 1 ? 's' : '') + ' match';
        startBtn.disabled = count === 0;

        // Update the Max button count
        var maxCountEl = document.getElementById('qb-builder-max-count');
        if (maxCountEl) maxCountEl.textContent = count;
    }

    function _getBuilderFilters() {
        var chapters = [];
        var topics = [];
        var difficulties = [];
        var types = [];

        _root.querySelectorAll('#qb-chapter-chips .qb-chip--active').forEach(function (el) {
            chapters.push(el.dataset.chipValue);
        });
        _root.querySelectorAll('#qb-topic-chips .qb-chip--active').forEach(function (el) {
            topics.push(el.dataset.chipValue);
        });
        _root.querySelectorAll('#qb-difficulty-chips .qb-chip--active').forEach(function (el) {
            difficulties.push(el.dataset.chipValue);
        });
        _root.querySelectorAll('#qb-type-chips .qb-chip--active').forEach(function (el) {
            types.push(el.dataset.chipValue);
        });

        return { chapters: chapters, topics: topics, difficulties: difficulties, types: types };
    }

    function _updateTopicChips() {
        var container = document.getElementById('qb-topic-chips');
        if (!container) return;

        var selectedChapters = [];
        _root.querySelectorAll('#qb-chapter-chips .qb-chip--active').forEach(function (el) {
            selectedChapters.push(el.dataset.chipValue);
        });

        if (selectedChapters.length === 0) {
            container.innerHTML = '<div class="qb-builder-placeholder">Select one or more chapters above to see available topics.</div>';
            return;
        }

        var html = '';
        QUIZ_BANK_REGISTRY.chapters.forEach(function (chapter) {
            if (selectedChapters.indexOf(chapter.id) === -1) return;
            chapter.topics.forEach(function (topic) {
                var hasQuestions = topic.file !== null;
                html += '<button class="qb-chip' + (hasQuestions ? ' qb-chip--active' : '') + '" data-qb-action="toggle-chip" data-chip-type="topic" data-chip-value="' + _esc(topic.id) + '"' + (!hasQuestions ? ' disabled' : '') + '>';
                html += _esc(topic.label);
                if (!hasQuestions) html += ' (0)';
                html += '</button>';
            });
        });

        container.innerHTML = html || '<div class="qb-builder-placeholder">No topics available in selected chapters.</div>';
    }

    // ══════════════════════════════════════════════════════
    //  QUIZ SESSION
    // ══════════════════════════════════════════════════════

    function _startQuiz(questions, topicId, topicLabel, chapterId, mode, setSize) {
        if (!questions || questions.length === 0) return;

        _view = 'quiz';
        _mode = mode || 'practice';
        var effectiveSize = (setSize === 'max' || !setSize) ? questions.length : Math.min(setSize, questions.length);
        _setSize = effectiveSize;
        _currentQuestions = questions.slice(0, effectiveSize);
        _currentIndex = 0;
        _answers = {};
        _results = {};
        _submitted = {};
        _currentTopicId = topicId;
        _currentTopicLabel = topicLabel;
        _currentChapterId = chapterId;

        _shuffleAllOptions();
        window.addEventListener('beforeunload', _boundBeforeUnload);
        _renderQuestion();
    }

    function _renderQuestion() {
        var q = _currentQuestions[_currentIndex];
        if (!q) return;

        var total = _currentQuestions.length;
        var num = _currentIndex + 1;
        var pct = (num / total) * 100;

        // Running score
        var correctSoFar = 0;
        var answeredSoFar = 0;
        Object.keys(_results).forEach(function (id) {
            answeredSoFar++;
            if (_results[id].correct) correctSoFar++;
        });

        var typeName = _getTypeName(q);
        var typeClass = _getTypeClass(q);

        // Reset ordering
        if (q.type === 'ordering') {
            _orderingSequence = [];
        }

        var optionsHtml = '';
        var submitLabel = 'Submit Answer';
        var instructionHtml = '';

        if (q.type === 'ordering') {
            submitLabel = 'Submit Order';
            instructionHtml = '<span class="qb-q-instruction qb-q-instruction--ordering">Click items in the correct order.</span>';
            optionsHtml = _renderOrderingOptions(q);
        } else if (q.type === 'matrix') {
            submitLabel = 'Submit Answers';
            instructionHtml = '<span class="qb-q-instruction qb-q-instruction--matrix">Select one answer per row.</span>';
            optionsHtml = _renderMatrixOptions(q);
        } else {
            var shuffled = _getShuffledOptions(q.id) || q.options;
            optionsHtml = '<div class="qb-options" role="radiogroup" aria-label="Answer options">';
            shuffled.forEach(function (opt) {
                var displayLetter = _getDisplayLetter(q.id, opt.id);
                optionsHtml += '<label class="qb-option" tabindex="0" role="radio" aria-checked="false">';
                optionsHtml += '<input type="radio" name="qb-q-' + _esc(q.id) + '" value="' + _esc(opt.id) + '" tabindex="-1">';
                optionsHtml += '<span class="qb-option-marker"></span>';
                optionsHtml += '<span class="qb-option-letter">' + displayLetter.toUpperCase() + '.</span>';
                optionsHtml += '<span class="qb-option-text">' + _esc(opt.text) + '</span>';
                optionsHtml += '</label>';
            });
            optionsHtml += '</div>';
        }

        var scoreHtml = answeredSoFar > 0
            ? '<span class="qb-progress-score">' + correctSoFar + '/' + answeredSoFar + ' correct</span>'
            : '';

        var html = '<div class="qb-quiz-view">';
        html += '<div class="qb-progress">';
        html += '<div class="qb-progress-header">';
        html += '<span class="qb-progress-text">Question ' + num + ' of ' + total + '</span>';
        html += scoreHtml;
        html += '<span class="qb-progress-mode qb-progress-mode--' + _mode + '">' + (_mode === 'practice' ? 'Practice' : 'Exam') + '</span>';
        html += '</div>';
        html += '<div class="qb-progress-track"><div class="qb-progress-fill" style="width:' + pct + '%"></div></div>';
        html += '</div>';

        html += '<div class="qb-question-card">';
        html += '<div class="qb-q-header">';
        html += '<span class="qb-q-badge">' + num + '</span>';
        html += '<span class="qb-q-type ' + typeClass + '">' + typeName + '</span>';
        html += '<span class="qb-q-difficulty">' + _capitalize(q.difficulty) + '</span>';
        html += '</div>';
        html += '<div class="qb-q-stem">' + _esc(q.stem) + instructionHtml + '</div>';
        html += optionsHtml;
        html += '<div class="qb-actions"><button class="qb-btn qb-btn--primary" data-qb-action="submit" disabled>' + submitLabel + '</button></div>';
        html += '<div id="qb-feedback-area"></div>';
        html += '</div>';
        html += '</div>';

        _root.innerHTML = html;
    }

    function _renderOrderingOptions(q) {
        var shuffled = _getShuffledOptions(q.id) || q.options;
        var html = '<div class="qb-ordering-area"><div class="qb-ordering-items">';
        shuffled.forEach(function (opt) {
            html += '<div class="qb-ordering-item" data-ordering-id="' + _esc(opt.id) + '" tabindex="0" role="button" aria-label="' + _esc(opt.text) + '">';
            html += '<span class="qb-ordering-badge"></span>';
            html += '<span class="qb-ordering-text">' + _esc(opt.text) + '</span>';
            html += '</div>';
        });
        html += '</div>';
        html += '<button class="qb-ordering-clear" data-qb-action="clear-ordering" type="button"><i class="fas fa-undo"></i> Clear Order</button>';
        html += '</div>';
        return html;
    }

    function _renderMatrixOptions(q) {
        var cols = q.columns || [];
        var html = '<div class="qb-matrix-wrapper"><table class="qb-matrix-table">';
        html += '<thead><tr><th class="qb-matrix-finding-header">Finding</th>';
        cols.forEach(function (col) {
            html += '<th class="qb-matrix-col-header">' + _esc(col) + '</th>';
        });
        html += '</tr></thead><tbody>';
        q.rows.forEach(function (row) {
            html += '<tr class="qb-matrix-row" data-matrix-row="' + _esc(row.id) + '">';
            html += '<td class="qb-matrix-finding">' + _esc(row.text) + '</td>';
            cols.forEach(function (col) {
                html += '<td class="qb-matrix-cell" role="radio" tabindex="0" aria-checked="false">';
                html += '<input type="radio" name="qb-matrix-' + _esc(q.id) + '-' + _esc(row.id) + '" value="' + _esc(col) + '" tabindex="-1">';
                html += '<span class="qb-matrix-radio-marker"></span>';
                html += '</td>';
            });
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        return html;
    }

    // ── Submit & Feedback ──────────────────────────────────

    function _submitAnswer() {
        var q = _currentQuestions[_currentIndex];
        if (!q || _submitted[q.id]) return;

        var userAnswer = _getUserAnswer(q);
        if (userAnswer === null) return;

        _answers[q.id] = userAnswer;
        _submitted[q.id] = true;

        var isCorrect = _checkAnswer(q, userAnswer);
        _results[q.id] = {
            correct: isCorrect,
            userAnswer: userAnswer,
            correctAnswer: q.type === 'matrix' ? _getMatrixCorrectMap(q) : q.correct
        };

        _showSubmitFeedback(q, userAnswer, isCorrect);
    }

    function _getUserAnswer(q) {
        if (q.type === 'ordering') {
            if (_orderingSequence.length !== q.options.length) return null;
            return _orderingSequence.slice();
        } else if (q.type === 'matrix') {
            var answer = {};
            var complete = true;
            q.rows.forEach(function (row) {
                var checked = _root.querySelector('input[name="qb-matrix-' + q.id + '-' + row.id + '"]:checked');
                if (checked) {
                    answer[row.id] = checked.value;
                } else {
                    complete = false;
                }
            });
            return complete ? answer : null;
        } else {
            var checked = _root.querySelector('input[name="qb-q-' + q.id + '"]:checked');
            return checked ? checked.value : null;
        }
    }

    function _checkAnswer(q, userAnswer) {
        if (q.type === 'ordering') {
            if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return false;
            return userAnswer.length === q.correct.length &&
                userAnswer.every(function (v, i) { return v === q.correct[i]; });
        }
        if (q.type === 'matrix') {
            if (!userAnswer || typeof userAnswer !== 'object') return false;
            return q.rows.every(function (row) { return userAnswer[row.id] === row.correct; });
        }
        return userAnswer === q.correct;
    }

    function _getMatrixCorrectMap(q) {
        var map = {};
        q.rows.forEach(function (row) { map[row.id] = row.correct; });
        return map;
    }

    function _showSubmitFeedback(q, userAnswer, isCorrect) {
        // Disable interactions
        if (q.type === 'ordering') {
            _root.querySelectorAll('.qb-ordering-item').forEach(function (item) {
                item.classList.add('qb-ordering-item--disabled');
                var optId = item.dataset.orderingId;
                var userIdx = userAnswer.indexOf(optId);
                var correctIdx = q.correct.indexOf(optId);
                if (userIdx !== -1 && userIdx === correctIdx) {
                    item.classList.add('qb-ordering-item--correct');
                } else if (userIdx !== -1) {
                    item.classList.add('qb-ordering-item--incorrect');
                }
            });
        } else if (q.type === 'matrix') {
            var correctMap = _getMatrixCorrectMap(q);
            _root.querySelectorAll('.qb-matrix-row').forEach(function (row) {
                var rowId = row.dataset.matrixRow;
                row.querySelectorAll('.qb-matrix-cell').forEach(function (cell) {
                    cell.classList.add('qb-matrix-cell--disabled');
                });
                var userVal = userAnswer ? userAnswer[rowId] : null;
                if (userVal === correctMap[rowId]) {
                    row.classList.add('qb-matrix-row--correct');
                } else {
                    row.classList.add('qb-matrix-row--incorrect');
                    row.querySelectorAll('.qb-matrix-cell').forEach(function (cell) {
                        var radio = cell.querySelector('input[type="radio"]');
                        if (radio && radio.value === correctMap[rowId]) {
                            cell.classList.add('qb-matrix-cell--correct-answer');
                        }
                    });
                }
            });
        } else {
            _root.querySelectorAll('.qb-option').forEach(function (opt) {
                opt.classList.add('qb-option--disabled');
                var input = opt.querySelector('input');
                var val = input ? input.value : '';
                if (val === q.correct) opt.classList.add('qb-option--correct');
                else if (val === userAnswer) opt.classList.add('qb-option--incorrect');
                opt.classList.remove('qb-option--selected');
            });
        }

        // Hide submit
        var actions = _root.querySelector('.qb-actions');
        if (actions) actions.innerHTML = '';

        // Build feedback
        var feedbackArea = document.getElementById('qb-feedback-area');
        if (!feedbackArea) return;

        var isLast = _currentIndex >= _currentQuestions.length - 1;
        var feedbackHtml = '';

        if (_mode === 'practice') {
            feedbackHtml = _buildPracticeFeedback(q, userAnswer, isCorrect);
        } else {
            var cls = isCorrect ? 'qb-exam-indicator--correct' : 'qb-exam-indicator--incorrect';
            var icon = isCorrect ? 'fa-check' : 'fa-times';
            var text = isCorrect ? 'Correct' : 'Incorrect';
            feedbackHtml = '<div class="qb-exam-indicator ' + cls + '"><i class="fas ' + icon + '"></i> ' + text + '</div>';
        }

        feedbackArea.innerHTML = feedbackHtml;

        // Report question link (shown after every answered question)
        var reportLink = document.createElement('div');
        reportLink.className = 'qb-report-link';
        reportLink.innerHTML = '<button class="qb-report-btn" data-qb-action="report-question" data-question-id="' + _esc(q.id) + '"><i class="fas fa-flag"></i> Report this question</button>';
        feedbackArea.appendChild(reportLink);

        // Sticky next bar
        var existing = _root.querySelector('.qb-sticky-next');
        if (existing) existing.remove();
        var nextLabel = isLast ? '<i class="fas fa-chart-bar"></i> See Results' : 'Next Question <i class="fas fa-arrow-right"></i>';
        var nextClass = isLast ? 'qb-btn--success' : 'qb-btn--primary';
        var sticky = document.createElement('div');
        sticky.className = 'qb-sticky-next';
        sticky.innerHTML = '<button class="qb-btn ' + nextClass + '" data-qb-action="next">' + nextLabel + '</button>';
        _root.appendChild(sticky);
    }

    function _buildPracticeFeedback(q, userAnswer, isCorrect) {
        var statusClass = isCorrect ? 'qb-feedback--correct' : 'qb-feedback--incorrect';
        var statusIcon = isCorrect ? 'fa-check-circle' : 'fa-times-circle';
        var statusText = isCorrect ? 'Correct!' : 'Incorrect';

        var html = '<div class="qb-feedback ' + statusClass + '">';
        html += '<div class="qb-feedback-header"><i class="fas ' + statusIcon + '"></i> ' + statusText + '</div>';

        // Ordering: show side-by-side comparison
        if (q.type === 'ordering' && !isCorrect) {
            html += '<div class="qb-ordering-compare">';
            html += '<div class="qb-ordering-compare-header">';
            html += '<div class="qb-ordering-compare-col-title qb-ordering-compare-col-title--yours">Your Order</div>';
            html += '<div class="qb-ordering-compare-col-title qb-ordering-compare-col-title--correct">Correct Order</div>';
            html += '</div>';

            var maxLen = Math.max(userAnswer.length, q.correct.length);
            for (var step = 0; step < maxLen; step++) {
                var userOptId = userAnswer[step];
                var correctOptId = q.correct[step];
                var userOpt = userOptId ? q.options.find(function (o) { return o.id === userOptId; }) : null;
                var correctOpt = correctOptId ? q.options.find(function (o) { return o.id === correctOptId; }) : null;
                var isStepCorrect = userOptId === correctOptId;

                html += '<div class="qb-ordering-compare-row">';

                // Your answer
                html += '<div class="qb-ordering-compare-cell ' + (isStepCorrect ? 'qb-ordering-compare-cell--correct' : 'qb-ordering-compare-cell--incorrect') + '">';
                html += '<span class="qb-ordering-compare-num">' + (step + 1) + '</span>';
                html += '<span class="qb-ordering-compare-text">' + _esc(userOpt ? userOpt.text : '—') + '</span>';
                html += '<span class="qb-ordering-compare-icon"><i class="fas ' + (isStepCorrect ? 'fa-check' : 'fa-times') + '"></i></span>';
                html += '</div>';

                // Correct answer
                html += '<div class="qb-ordering-compare-cell qb-ordering-compare-cell--correct">';
                html += '<span class="qb-ordering-compare-num">' + (step + 1) + '</span>';
                html += '<span class="qb-ordering-compare-text">' + _esc(correctOpt ? correctOpt.text : '—') + '</span>';
                html += '</div>';

                html += '</div>'; // row

                // Per-step rationale (if available)
                if (correctOptId && q.rationale && q.rationale[correctOptId]) {
                    html += '<div class="qb-ordering-step-rationale">';
                    html += '<span class="qb-ordering-step-rationale-label">Step ' + (step + 1) + ':</span> ';
                    html += _esc(q.rationale[correctOptId]);
                    html += '</div>';
                }
            }

            html += '</div>'; // compare
        }

        // Matrix partial
        if (q.type === 'matrix' && !isCorrect) {
            var correctMap = _getMatrixCorrectMap(q);
            var correctRows = q.rows.filter(function (row) { return userAnswer && userAnswer[row.id] === correctMap[row.id]; }).length;
            html += '<div class="qb-matrix-partial"><i class="fas fa-info-circle"></i> You got ' + correctRows + ' of ' + q.rows.length + ' rows correct.</div>';
        }

        // Rationale
        if (q.rationale && q.rationale.correct) {
            html += '<div class="qb-feedback-section">';
            html += '<div class="qb-feedback-label">Why ' + (isCorrect ? 'this is correct' : 'the correct answer is right') + '</div>';
            html += '<div class="qb-feedback-text">' + _esc(q.rationale.correct) + '</div>';
            html += '</div>';
        }

        // Test-taking tip
        if (q.testTakingTip) {
            html += '<div class="qb-feedback-tip">';
            html += '<div class="qb-feedback-tip-label"><i class="fas fa-lightbulb"></i> Test-Taking Tip</div>';
            html += '<div class="qb-feedback-tip-text">' + _esc(q.testTakingTip) + '</div>';
            html += '</div>';
        }

        // Review link for wrong answers
        if (!isCorrect && q.relatedGuide) {
            var href = '../guides/' + _esc(q.relatedGuide);
            if (q.relatedGuideSection) href += '#' + _esc(q.relatedGuideSection);
            html += '<a href="' + href + '" class="qb-feedback-review" target="_blank">';
            html += '<i class="fas fa-book"></i> Review this in the Study Guide <i class="fas fa-external-link-alt" style="font-size:0.75rem"></i>';
            html += '</a>';
        }

        html += '</div>';
        return html;
    }

    // ── Next & Results ─────────────────────────────────────

    function _nextQuestion() {
        if (_currentIndex < _currentQuestions.length - 1) {
            _currentIndex++;
            _renderQuestion();
        } else {
            _showResults();
        }
    }

    function _showResults() {
        _view = 'results';
        window.removeEventListener('beforeunload', _boundBeforeUnload);

        // Record mastery
        var resultEntries = _currentQuestions.map(function (q) {
            var r = _results[q.id];
            return { questionId: q.id, correct: r ? r.correct : false };
        });

        var masteryResult = null;
        if (_currentTopicId) {
            masteryResult = MasteryTracker.recordSetResult(_currentTopicId, resultEntries);
        }

        var total = _currentQuestions.length;
        var correctCount = 0;
        _currentQuestions.forEach(function (q) {
            if (_results[q.id] && _results[q.id].correct) correctCount++;
        });
        var pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
        var missedCount = total - correctCount;

        // Score ring
        var circumference = 2 * Math.PI * 62;
        var offset = circumference - (pct / 100) * circumference;
        var perfTier = pct >= 90 ? 'excellent' : pct >= 70 ? 'good' : 'needs-work';
        var perfMsg = pct === 100 ? 'Perfect score! You nailed every question.'
            : pct >= 90 ? 'Excellent! Keep building that mastery!'
            : pct >= 70 ? 'Good work! Review missed questions to strengthen weak areas.'
            : 'Keep practicing! 70%+ needed for mastery points.';

        var html = '<div class="qb-results">';

        // Score ring
        html += '<div class="qb-results-header">';
        html += '<div class="qb-score-ring-wrap"><div class="qb-score-ring">';
        html += '<svg viewBox="0 0 140 140"><circle class="qb-score-ring-bg" cx="70" cy="70" r="62"></circle>';
        html += '<circle class="qb-score-ring-fill qb-score-ring-fill--' + perfTier + '" cx="70" cy="70" r="62" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '"></circle>';
        html += '</svg>';
        html += '<div class="qb-score-center"><div class="qb-score-value">' + correctCount + '/' + total + '</div><div class="qb-score-label">correct</div></div>';
        html += '</div></div>';
        html += '<div class="qb-score-pct">' + pct + '%</div>';
        html += '<div class="qb-perf-msg">' + _esc(perfMsg) + '</div>';
        html += '</div>';

        // Mastery update
        if (masteryResult) {
            html += '<div class="qb-mastery-result">';
            if (masteryResult.pointsEarned > 0) {
                html += '<div class="qb-mastery-points">+' + masteryResult.pointsEarned + ' points &rarr; ' + _esc(_currentTopicLabel || _currentTopicId) + '</div>';
            } else {
                html += '<div class="qb-mastery-points qb-mastery-points--zero">Below 70% &mdash; no mastery points earned</div>';
            }

            if (masteryResult.leveledUp) {
                html += '<div class="qb-level-up">';
                html += '<i class="fas fa-arrow-up"></i> ' + _esc(_currentTopicLabel || _currentTopicId) + ' &rarr; Level ' + masteryResult.newLevel + ' (' + _esc(masteryResult.levelName) + ')!';
                html += '</div>';
            }

            if (masteryResult.pointsToNext > 0 && masteryResult.pointsToNext <= 5) {
                html += '<div class="qb-near-level">' + masteryResult.pointsToNext + ' point' + (masteryResult.pointsToNext !== 1 ? 's' : '') + ' from Level ' + (masteryResult.newLevel + 1) + '!</div>';
            }
            html += '</div>';
        }

        // Quit mid-set warning (shouldn't appear here but just in case)

        // Per-question breakdown
        html += '<div class="qb-results-breakdown">';
        html += '<div class="qb-results-breakdown-title">Question Breakdown</div>';
        _currentQuestions.forEach(function (q, i) {
            var r = _results[q.id];
            if (!r) return;
            var icon = r.correct ? 'fa-check' : 'fa-times';
            var iconCls = r.correct ? 'qb-result-icon--correct' : 'qb-result-icon--incorrect';
            var stemTrunc = q.stem.length > 120 ? q.stem.substring(0, 120) + '...' : q.stem;

            html += '<div class="qb-result-item">';
            html += '<button class="qb-result-summary" data-qb-action="toggle-result" aria-expanded="false">';
            html += '<span class="qb-result-icon ' + iconCls + '"><i class="fas ' + icon + '"></i></span>';
            html += '<span class="qb-result-stem">' + _esc(stemTrunc) + '</span>';
            html += '<i class="fas fa-chevron-down qb-result-expand-icon"></i>';
            html += '</button>';
            html += '<div class="qb-result-detail">';
            html += '<div class="qb-result-detail-inner">';

            // Rationale
            if (q.rationale && q.rationale.correct) {
                html += '<div class="qb-result-rationale">' + _esc(q.rationale.correct) + '</div>';
            }

            // Review link for wrong
            if (!r.correct && q.relatedGuide) {
                var href = '../guides/' + _esc(q.relatedGuide);
                if (q.relatedGuideSection) href += '#' + _esc(q.relatedGuideSection);
                html += '<a href="' + href + '" class="qb-result-review-link" target="_blank"><i class="fas fa-book"></i> Review in Study Guide</a>';
            }

            html += '</div></div>';
            html += '</div>';
        });
        html += '</div>';

        // Action buttons
        html += '<div class="qb-results-actions">';
        if (missedCount > 0) {
            html += '<button class="qb-btn qb-btn--primary" data-qb-action="review-missed"><i class="fas fa-redo"></i> Review Missed (' + missedCount + ')</button>';
        }
        html += '<button class="qb-btn qb-btn--secondary" data-qb-action="back-to-hub"><i class="fas fa-th-large"></i> Back to Quiz Hub</button>';
        html += '</div>';

        html += '</div>';

        _root.innerHTML = html;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ── Update Submit Button ───────────────────────────────

    function _updateSubmitButton() {
        var btn = _root.querySelector('[data-qb-action="submit"]');
        if (!btn) return;
        var q = _currentQuestions[_currentIndex];
        if (!q) return;

        if (q.type === 'ordering') {
            btn.disabled = _orderingSequence.length !== q.options.length;
        } else if (q.type === 'matrix') {
            var totalRows = q.rows.length;
            var answered = _root.querySelectorAll('.qb-matrix-table input[type="radio"]:checked').length;
            btn.disabled = answered !== totalRows;
        } else {
            btn.disabled = _getUserAnswer(q) === null;
        }
    }

    // ══════════════════════════════════════════════════════
    //  EVENT HANDLING
    // ══════════════════════════════════════════════════════

    function _handleClick(e) {
        // Action buttons
        var actionBtn = e.target.closest('[data-qb-action]');
        if (actionBtn) {
            e.preventDefault();
            var action = actionBtn.dataset.qbAction;

            switch (action) {
                case 'toggle-chapter':
                    _toggleChapter(actionBtn);
                    break;
                case 'start-topic':
                    _handleStartTopic(actionBtn);
                    break;
                case 'submit':
                    _submitAnswer();
                    break;
                case 'next':
                    _nextQuestion();
                    break;
                case 'back-to-hub':
                    renderHub();
                    break;
                case 'review-missed':
                    _handleReviewMissed();
                    break;
                case 'quick-10':
                    _handleQuick10();
                    break;
                case 'weak-focus':
                    _handleWeakFocus();
                    break;
                case 'scroll-builder':
                    var builder = document.getElementById('qb-builder');
                    if (builder) builder.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'toggle-chip':
                    _handleToggleChip(actionBtn);
                    break;
                case 'set-size':
                    _handleSetSize(actionBtn);
                    break;
                case 'set-mode':
                    _handleSetMode(actionBtn);
                    break;
                case 'start-custom':
                    _handleStartCustom();
                    break;
                case 'toggle-preconfig-type':
                    _handleTogglePreconfigType(actionBtn);
                    break;
                case 'set-preconfig-size':
                    _handleSetPreconfigSize(actionBtn);
                    break;
                case 'set-preconfig-mode':
                    _handleSetPreconfigMode(actionBtn);
                    break;
                case 'start-preconfig':
                    _handleStartPreconfig(actionBtn);
                    break;
                case 'clear-ordering':
                    _orderingSequence = [];
                    _updateOrderingDisplay();
                    _updateSubmitButton();
                    break;
                case 'toggle-result':
                    var item = actionBtn.closest('.qb-result-item');
                    if (item) {
                        item.classList.toggle('qb-result-item--expanded');
                        actionBtn.setAttribute('aria-expanded', item.classList.contains('qb-result-item--expanded'));
                    }
                    break;
                case 'report-question':
                    _showReportModal(actionBtn.dataset.questionId);
                    break;
                case 'submit-report':
                    _submitReport();
                    break;
                case 'close-report':
                    _closeReportModal();
                    break;
                case 'select-report-reason':
                    _selectReportReason(actionBtn);
                    break;
                case 'quit-quiz':
                    if (confirm('Incomplete sets don\'t count toward mastery. Are you sure you want to quit?')) {
                        renderHub();
                    }
                    break;
            }
            return;
        }

        // Ordering item click
        var orderItem = e.target.closest('.qb-ordering-item');
        if (orderItem && !orderItem.classList.contains('qb-ordering-item--disabled')) {
            var optId = orderItem.dataset.orderingId;
            if (!optId) return;
            var idx = _orderingSequence.indexOf(optId);
            if (idx !== -1) {
                _orderingSequence.splice(idx, 1);
            } else {
                _orderingSequence.push(optId);
            }
            _updateOrderingDisplay();
            _updateSubmitButton();
            return;
        }

        // Matrix cell click
        var matrixCell = e.target.closest('.qb-matrix-cell');
        if (matrixCell && !matrixCell.classList.contains('qb-matrix-cell--disabled')) {
            var radio = matrixCell.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                var row = matrixCell.closest('tr');
                if (row) {
                    row.querySelectorAll('.qb-matrix-cell').forEach(function (c) { c.classList.remove('qb-matrix-cell--selected'); });
                    matrixCell.classList.add('qb-matrix-cell--selected');
                }
                _updateSubmitButton();
            }
            return;
        }

        // Option click (single)
        var option = e.target.closest('.qb-option');
        if (option && !option.classList.contains('qb-option--disabled')) {
            var input = option.querySelector('input');
            if (!input) return;
            _root.querySelectorAll('.qb-option').forEach(function (o) { o.classList.remove('qb-option--selected'); });
            option.classList.add('qb-option--selected');
            input.checked = true;
            _updateSubmitButton();
            return;
        }
    }

    function _handleKeydown(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            var option = e.target.closest('.qb-option');
            if (option) { e.preventDefault(); option.click(); return; }
            var orderItem = e.target.closest('.qb-ordering-item');
            if (orderItem) { e.preventDefault(); orderItem.click(); return; }
            var matrixCell = e.target.closest('.qb-matrix-cell');
            if (matrixCell) { e.preventDefault(); matrixCell.click(); return; }
        }
    }

    function _handleBeforeUnload(e) {
        if (_view === 'quiz' && Object.keys(_answers).length > 0) {
            e.preventDefault();
            e.returnValue = '';
        }
    }

    // ── Pre-Quiz Config Panel ─────────────────────────────

    function _renderPreQuizPanel(topicId, chapterId) {
        _view = 'config';
        window.scrollTo({ top: 0 });

        // Look up topic/chapter info
        var topicLabel = MasteryTracker.getTopicLabel(topicId);
        var chapterInfo = _getChapterInfo(chapterId);
        var topicMastery = MasteryTracker.getTopicMastery(topicId);
        var masteryColor = MasteryTracker.getMasteryColor(topicMastery.level);

        var html = '<div class="qb-preconfig">';

        // Header
        html += '<button class="qb-preconfig-back" data-qb-action="back-to-hub"><i class="fas fa-arrow-left"></i> Back to Quiz Hub</button>';
        html += '<div class="qb-preconfig-header">';
        if (chapterInfo) html += '<span class="qb-preconfig-chapter">' + chapterInfo.emoji + ' ' + _esc(chapterInfo.label) + '</span>';
        html += '<h2 class="qb-preconfig-title">' + _esc(topicLabel) + '</h2>';
        html += '<div class="qb-preconfig-mastery" style="color:' + masteryColor + '">Level ' + topicMastery.level + ' &mdash; ' + _esc(topicMastery.levelName) + '</div>';
        html += '</div>';

        // Config card
        html += '<div class="qb-preconfig-card">';

        // Question types
        html += '<div class="qb-preconfig-group">';
        html += '<label class="qb-preconfig-label"><i class="fas fa-th-list"></i> Question Types</label>';
        html += '<div class="qb-preconfig-chips">';
        [['Multiple Choice', 'single'], ['Ordering', 'ordering'], ['Matrix', 'matrix']].forEach(function (pair) {
            html += '<button class="qb-chip qb-chip--active" data-qb-action="toggle-preconfig-type" data-ptype="' + pair[1] + '">' + pair[0] + '</button>';
        });
        html += '</div>';
        html += '</div>';

        // Set size — count available questions for this topic
        var topicQuestionCount = _countQuestionsForTopic(topicId);
        html += '<div class="qb-preconfig-group">';
        html += '<label class="qb-preconfig-label"><i class="fas fa-hashtag"></i> Number of Questions</label>';
        html += '<div class="qb-preconfig-chips">';
        html += '<button class="qb-chip qb-chip--active" data-qb-action="set-preconfig-size" data-psize="5">5</button>';
        html += '<button class="qb-chip" data-qb-action="set-preconfig-size" data-psize="10">10</button>';
        html += '<button class="qb-chip" data-qb-action="set-preconfig-size" data-psize="15">15</button>';
        html += '<button class="qb-chip" data-qb-action="set-preconfig-size" data-psize="max">Max (' + topicQuestionCount + ')</button>';
        html += '</div>';
        html += '</div>';

        // Mode
        html += '<div class="qb-preconfig-group">';
        html += '<label class="qb-preconfig-label"><i class="fas fa-cog"></i> Mode</label>';
        html += '<div class="qb-preconfig-chips">';
        html += '<button class="qb-chip qb-chip--active" data-qb-action="set-preconfig-mode" data-pmode="practice">Practice</button>';
        html += '<button class="qb-chip" data-qb-action="set-preconfig-mode" data-pmode="exam">Exam</button>';
        html += '</div>';
        html += '<div class="qb-preconfig-mode-hint" id="qb-preconfig-mode-hint">Shows rationale after each question.</div>';
        html += '</div>';

        // Start
        html += '<button class="qb-btn qb-btn--primary qb-btn--lg qb-preconfig-start" data-qb-action="start-preconfig" data-topic="' + _esc(topicId) + '" data-chapter="' + _esc(chapterId) + '"><i class="fas fa-play"></i> Start Quiz</button>';

        html += '</div>'; // card
        html += '</div>'; // preconfig

        _root.innerHTML = html;

        // Store config state
        _root._preconfigTypes = ['single', 'ordering', 'matrix'];
        _root._preconfigSize = 5;
        _root._preconfigMode = 'practice';
    }

    function _getChapterInfo(chapterId) {
        if (!QUIZ_BANK_REGISTRY || !QUIZ_BANK_REGISTRY.chapters) return null;
        for (var i = 0; i < QUIZ_BANK_REGISTRY.chapters.length; i++) {
            if (QUIZ_BANK_REGISTRY.chapters[i].id === chapterId) return QUIZ_BANK_REGISTRY.chapters[i];
        }
        return null;
    }

    // ── Action Handlers ────────────────────────────────────

    function _toggleChapter(btn) {
        var chapterEl = btn.closest('.qb-chapter');
        if (!chapterEl) return;
        var isOpen = chapterEl.classList.toggle('qb-chapter--open');
        btn.setAttribute('aria-expanded', isOpen);
    }

    function _handleStartTopic(btn) {
        var topicId = btn.dataset.topic;
        var chapterId = btn.dataset.chapter;
        _renderPreQuizPanel(topicId, chapterId);
    }

    function _handleToggleChip(btn) {
        if (btn.disabled) return;
        btn.classList.toggle('qb-chip--active');

        // If chapter chip, update topic chips
        if (btn.dataset.chipType === 'chapter') {
            _updateTopicChips();
        }

        _updateBuilderCount();
    }

    function _handleSetSize(btn) {
        btn.parentElement.querySelectorAll('.qb-chip').forEach(function (c) { c.classList.remove('qb-chip--active'); });
        btn.classList.add('qb-chip--active');
        _setSize = btn.dataset.size === 'max' ? 'max' : (parseInt(btn.dataset.size, 10) || 10);
    }

    function _handleSetMode(btn) {
        btn.parentElement.querySelectorAll('.qb-chip').forEach(function (c) { c.classList.remove('qb-chip--active'); });
        btn.classList.add('qb-chip--active');
        _mode = btn.dataset.mode || 'practice';
    }

    function _handleTogglePreconfigType(btn) {
        btn.classList.toggle('qb-chip--active');
        // Update stored types
        var types = [];
        _root.querySelectorAll('[data-qb-action="toggle-preconfig-type"].qb-chip--active').forEach(function (el) {
            types.push(el.dataset.ptype);
        });
        _root._preconfigTypes = types;
    }

    function _handleSetPreconfigSize(btn) {
        btn.parentElement.querySelectorAll('.qb-chip').forEach(function (c) { c.classList.remove('qb-chip--active'); });
        btn.classList.add('qb-chip--active');
        _root._preconfigSize = btn.dataset.psize === 'max' ? 'max' : parseInt(btn.dataset.psize, 10);
    }

    function _handleSetPreconfigMode(btn) {
        btn.parentElement.querySelectorAll('.qb-chip').forEach(function (c) { c.classList.remove('qb-chip--active'); });
        btn.classList.add('qb-chip--active');
        _root._preconfigMode = btn.dataset.pmode;
        var hint = document.getElementById('qb-preconfig-mode-hint');
        if (hint) {
            hint.textContent = btn.dataset.pmode === 'practice'
                ? 'Shows rationale after each question.'
                : 'No feedback until the end. Simulates real exam conditions.';
        }
    }

    function _handleStartPreconfig(btn) {
        var topicId = btn.dataset.topic;
        var chapterId = btn.dataset.chapter;
        var types = _root._preconfigTypes || ['single', 'ordering', 'matrix'];
        var size = _root._preconfigSize || 10;
        var mode = _root._preconfigMode || 'practice';

        if (types.length === 0) {
            alert('Please select at least one question type.');
            return;
        }

        var questions = _getQuestionsForTopic(topicId, types);
        if (questions.length === 0) {
            alert('Questions for this topic are coming soon!');
            return;
        }

        _shuffleArray(questions);
        var topicLabel = MasteryTracker.getTopicLabel(topicId);
        _isCustom = false;
        _startQuiz(questions, topicId, topicLabel, chapterId, mode, size);
    }

    function _handleStartCustom() {
        if (!window.QUIZ_BANK_QUESTIONS || window.QUIZ_BANK_QUESTIONS.length === 0) {
            alert('No questions are available yet. Questions are coming soon!');
            return;
        }

        var filters = _getBuilderFilters();
        var questions = window.QUIZ_BANK_QUESTIONS.filter(function (q) {
            if (filters.topics && filters.topics.length > 0) {
                if (filters.topics.indexOf(q.topic) === -1) return false;
            }
            if (filters.chapters && filters.chapters.length > 0) {
                if (filters.chapters.indexOf(q.category) === -1) return false;
            }
            if (filters.difficulties && filters.difficulties.length > 0) {
                if (filters.difficulties.indexOf(q.difficulty) === -1) return false;
            }
            if (filters.types && filters.types.length > 0) {
                if (filters.types.indexOf(q.type) === -1) return false;
            }
            return true;
        });

        if (questions.length === 0) {
            alert('No questions match your filters. Try adjusting your selections.');
            return;
        }

        _shuffleArray(questions);

        var mode = _mode || 'practice';
        var size = _setSize;
        _isCustom = true;
        _startQuiz(questions, null, 'Custom Quiz', null, mode, size);
    }

    // ── Report Question ──────────────────────────────────

    var _reportQuestionId = null;
    var _reportReason = null;

    function _showReportModal(questionId) {
        _reportQuestionId = questionId;
        _reportReason = null;

        // Find the question stem for context
        var q = null;
        for (var i = 0; i < _currentQuestions.length; i++) {
            if (_currentQuestions[i].id === questionId) { q = _currentQuestions[i]; break; }
        }
        var stemPreview = q ? (q.stem.length > 80 ? q.stem.substring(0, 80) + '...' : q.stem) : questionId;

        var overlay = document.createElement('div');
        overlay.className = 'qb-report-overlay';
        overlay.id = 'qb-report-overlay';
        overlay.innerHTML =
            '<div class="qb-report-modal">' +
                '<div class="qb-report-header">' +
                    '<h3><i class="fas fa-flag"></i> Report Question</h3>' +
                    '<button class="qb-report-close" data-qb-action="close-report"><i class="fas fa-times"></i></button>' +
                '</div>' +
                '<div class="qb-report-body">' +
                    '<div class="qb-report-question-preview">' + _esc(stemPreview) + '</div>' +
                    '<p class="qb-report-prompt">What\'s wrong with this question?</p>' +
                    '<div class="qb-report-reasons">' +
                        '<button class="qb-report-reason" data-qb-action="select-report-reason" data-reason="inaccurate"><i class="fas fa-exclamation-circle"></i> Inaccurate information</button>' +
                        '<button class="qb-report-reason" data-qb-action="select-report-reason" data-reason="wrong-answer"><i class="fas fa-times-circle"></i> Wrong correct answer</button>' +
                        '<button class="qb-report-reason" data-qb-action="select-report-reason" data-reason="unclear"><i class="fas fa-question-circle"></i> Unclear or confusing</button>' +
                        '<button class="qb-report-reason" data-qb-action="select-report-reason" data-reason="typo"><i class="fas fa-spell-check"></i> Typo or grammar error</button>' +
                        '<button class="qb-report-reason" data-qb-action="select-report-reason" data-reason="other"><i class="fas fa-ellipsis-h"></i> Other</button>' +
                    '</div>' +
                    '<textarea class="qb-report-details" id="qb-report-details" placeholder="Add details (optional)..." rows="3"></textarea>' +
                    '<button class="qb-btn qb-btn--primary qb-report-submit" data-qb-action="submit-report" disabled><i class="fas fa-paper-plane"></i> Submit Report</button>' +
                    '<div class="qb-report-status" id="qb-report-status"></div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        // Overlay is outside _root, so add its own click delegation
        overlay.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-qb-action]');
            if (!btn) return;
            var action = btn.dataset.qbAction;
            if (action === 'select-report-reason') { _selectReportReason(btn); }
            else if (action === 'submit-report') { _submitReport(); }
            else if (action === 'close-report') { _closeReportModal(); }
        });

        // Animate in
        requestAnimationFrame(function () { overlay.classList.add('qb-report-overlay--visible'); });
    }

    function _selectReportReason(btn) {
        _reportReason = btn.dataset.reason;
        // Toggle active state
        var reasons = document.querySelectorAll('.qb-report-reason');
        for (var i = 0; i < reasons.length; i++) { reasons[i].classList.remove('qb-report-reason--active'); }
        btn.classList.add('qb-report-reason--active');
        // Enable submit
        var submitBtn = document.querySelector('.qb-report-submit');
        if (submitBtn) submitBtn.disabled = false;
    }

    function _closeReportModal() {
        var overlay = document.getElementById('qb-report-overlay');
        if (overlay) {
            overlay.classList.remove('qb-report-overlay--visible');
            setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 200);
        }
        _reportQuestionId = null;
        _reportReason = null;
    }

    function _submitReport() {
        if (!_reportQuestionId || !_reportReason) return;

        var detailsEl = document.getElementById('qb-report-details');
        var details = detailsEl ? detailsEl.value.trim() : '';
        var statusEl = document.getElementById('qb-report-status');
        var submitBtn = document.querySelector('.qb-report-submit');

        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'; }

        // Find question data for context
        var q = null;
        if (window.QUIZ_BANK_QUESTIONS) {
            for (var i = 0; i < window.QUIZ_BANK_QUESTIONS.length; i++) {
                if (window.QUIZ_BANK_QUESTIONS[i].id === _reportQuestionId) { q = window.QUIZ_BANK_QUESTIONS[i]; break; }
            }
        }

        var payload = {
            question_id: _reportQuestionId,
            reason: _reportReason,
            details: details,
            topic: q ? q.topic : null,
            category: q ? q.category : null,
            stem_preview: q ? q.stem.substring(0, 150) : null
        };

        // Send to backend
        if (typeof apiCall === 'function') {
            apiCall('/api/quiz/report', {
                method: 'POST',
                body: JSON.stringify(payload)
            }).then(function () {
                if (statusEl) { statusEl.className = 'qb-report-status qb-report-status--success'; statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Report submitted. Thank you!'; }
                setTimeout(_closeReportModal, 1500);
            }).catch(function () {
                // Fallback: save locally if API fails
                _saveReportLocally(payload);
                if (statusEl) { statusEl.className = 'qb-report-status qb-report-status--success'; statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Report saved. Thank you!'; }
                setTimeout(_closeReportModal, 1500);
            });
        } else {
            // No apiCall available — save locally
            _saveReportLocally(payload);
            if (statusEl) { statusEl.className = 'qb-report-status qb-report-status--success'; statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Report saved. Thank you!'; }
            setTimeout(_closeReportModal, 1500);
        }
    }

    function _saveReportLocally(payload) {
        try {
            var reports = JSON.parse(localStorage.getItem('qb_pending_reports') || '[]');
            payload.reported_at = new Date().toISOString();
            reports.push(payload);
            localStorage.setItem('qb_pending_reports', JSON.stringify(reports));
        } catch (e) { /* silent */ }
    }

    function _countQuestionsForTopic(topicId) {
        if (!window.QUIZ_BANK_QUESTIONS) return 0;
        return window.QUIZ_BANK_QUESTIONS.filter(function (q) {
            return q.topic === topicId;
        }).length;
    }

    function _getQuestionsForTopic(topicId, types) {
        if (!window.QUIZ_BANK_QUESTIONS) return [];
        return window.QUIZ_BANK_QUESTIONS.filter(function (q) {
            if (q.topic !== topicId) return false;
            if (types && types.length > 0 && types.indexOf(q.type) === -1) return false;
            return true;
        });
    }

    function _handleQuick10() {
        if (!window.QUIZ_BANK_QUESTIONS || window.QUIZ_BANK_QUESTIONS.length === 0) return;
        var questions = window.QUIZ_BANK_QUESTIONS.slice();
        _shuffleArray(questions);
        _isCustom = true;
        _startQuiz(questions, null, 'Quick 10', null, 'practice', 10);
    }

    function _handleWeakFocus() {
        if (!window.QUIZ_BANK_QUESTIONS || window.QUIZ_BANK_QUESTIONS.length === 0) return;
        var stats = MasteryTracker.getOverallStats();
        var weakTopicIds = stats.weakestTopics.map(function (t) { return t.id; });
        var questions;
        if (weakTopicIds.length > 0) {
            questions = window.QUIZ_BANK_QUESTIONS.filter(function (q) {
                return weakTopicIds.indexOf(q.topic) !== -1;
            });
        }
        if (!questions || questions.length === 0) {
            questions = window.QUIZ_BANK_QUESTIONS.slice();
        }
        _shuffleArray(questions);
        _isCustom = true;
        _startQuiz(questions, null, 'Weak Spot Focus', null, 'practice', 20);
    }

    function _handleReviewMissed() {
        // Filter to missed questions only and restart (doesn't count as set)
        var missed = _currentQuestions.filter(function (q) {
            var r = _results[q.id];
            return r && !r.correct;
        });
        if (missed.length === 0) return;

        // Start a review session (won't record mastery)
        _view = 'quiz';
        _currentQuestions = missed;
        _currentIndex = 0;
        _answers = {};
        _results = {};
        _submitted = {};
        _currentTopicId = null; // null = no mastery recording
        _shuffleAllOptions();
        window.addEventListener('beforeunload', _boundBeforeUnload);
        _renderQuestion();
    }

    // ── Ordering Display ───────────────────────────────────

    function _updateOrderingDisplay() {
        _root.querySelectorAll('.qb-ordering-item').forEach(function (item) {
            var optId = item.dataset.orderingId;
            var idx = _orderingSequence.indexOf(optId);
            var badge = item.querySelector('.qb-ordering-badge');
            if (idx !== -1) {
                item.classList.add('qb-ordering-item--numbered');
                if (badge) badge.textContent = idx + 1;
            } else {
                item.classList.remove('qb-ordering-item--numbered');
                if (badge) badge.textContent = '';
            }
        });
    }

    // ── Option Shuffling ───────────────────────────────────

    function _shuffleAllOptions() {
        _shuffledOptions = {};
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        _currentQuestions.forEach(function (q) {
            if (q.type === 'matrix') {
                // Don't shuffle matrix rows
                return;
            }
            var arr = q.options.slice();
            _shuffleArray(arr);
            var letterMap = {};
            arr.forEach(function (opt, i) { letterMap[opt.id] = letters[i]; });
            _shuffledOptions[q.id] = { options: arr, letterMap: letterMap };
        });
    }

    function _getShuffledOptions(questionId) {
        var data = _shuffledOptions[questionId];
        return data ? data.options : null;
    }

    function _getDisplayLetter(questionId, optionId) {
        var data = _shuffledOptions[questionId];
        if (data && data.letterMap[optionId]) return data.letterMap[optionId];
        return optionId;
    }

    // ── Utility ────────────────────────────────────────────

    function _esc(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function _capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function _shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    function _getTypeName(q) {
        if (q.type === 'ordering') return 'Ordering';
        if (q.type === 'matrix') return 'Matrix';
        return 'Single Best Answer';
    }

    function _getTypeClass(q) {
        if (q.type === 'ordering') return 'qb-q-type--ordering';
        if (q.type === 'matrix') return 'qb-q-type--matrix';
        return 'qb-q-type--single';
    }

    // ── Public API ─────────────────────────────────────────

    return {
        init: init,
        renderHub: renderHub
    };
})();
