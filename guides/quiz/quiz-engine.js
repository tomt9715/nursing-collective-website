/**
 * QuizEngine — Interactive NCLEX-style quiz engine
 * The Nursing Collective
 *
 * Renders start screen, question cards, feedback, and results.
 * Supports Practice Mode (rationale after each question) and
 * Exam Mode (rationale at the end).
 *
 * CSP-compliant: all event handling via delegated data attributes.
 */

class QuizEngine {
    constructor(config) {
        this.container = document.getElementById(config.containerId);
        this.questions = config.questions || [];
        this.guideName = config.guideName || 'Study Guide';
        this.guideSlug = config.guideSlug || '';
        this.category = config.category || '';
        this.categoryColor = config.categoryColor || '#2E86AB';
        this.estimatedMinutes = config.estimatedMinutes || Math.max(5, Math.round(this.questions.length * 1.5));

        // State
        this.mode = null;           // 'practice' | 'exam'
        this.phase = 'start';       // 'start' | 'quiz' | 'results'
        this.currentIndex = 0;
        this.answers = new Map();   // questionId -> user answer (string or array)
        this.results = new Map();   // questionId -> { correct, userAnswer, correctAnswer }
        this.submitted = new Set(); // question IDs that have been submitted
        this.activeQuestions = [];   // current question set (may be subset for review-missed)
        this.isReviewMode = false;
        this._shuffledOptions = new Map(); // questionId -> shuffled options array

        this._boundBeforeUnload = this._handleBeforeUnload.bind(this);
        this._boundClickHandler = this._handleClick.bind(this);
        this._boundKeyHandler = this._handleKeydown.bind(this);
    }

    // ── Public API ──────────────────────────────────────────

    init() {
        this.container.innerHTML = '';
        this.container.addEventListener('click', this._boundClickHandler);
        this.container.addEventListener('keydown', this._boundKeyHandler);
        this._renderStartScreen();
    }

    startQuiz(mode) {
        this.mode = mode;
        this.phase = 'quiz';
        this.currentIndex = 0;
        this.answers.clear();
        this.results.clear();
        this.submitted.clear();
        this.activeQuestions = [...this.questions];
        this.isReviewMode = false;
        this._shuffleAllOptions();
        window.addEventListener('beforeunload', this._boundBeforeUnload);
        this._renderQuestion();
    }

    submitAnswer() {
        const q = this.activeQuestions[this.currentIndex];
        if (!q || this.submitted.has(q.id)) return;

        const userAnswer = this._getUserAnswer(q);
        if (userAnswer === null) return;

        this.answers.set(q.id, userAnswer);
        this.submitted.add(q.id);

        const isCorrect = this._checkAnswer(q, userAnswer);
        const isPartial = !isCorrect && q.type === 'sata' && this._hasSATAPartialCredit(q, userAnswer);
        this.results.set(q.id, {
            correct: isCorrect,
            partial: isPartial,
            userAnswer: userAnswer,
            correctAnswer: q.correct
        });

        this._showSubmitFeedback(q, userAnswer, isCorrect, isPartial);
    }

    nextQuestion() {
        if (this.currentIndex < this.activeQuestions.length - 1) {
            this.currentIndex++;
            this._renderQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.phase = 'results';
        window.removeEventListener('beforeunload', this._boundBeforeUnload);
        this._renderResultsScreen();
    }

    retakeQuiz() {
        this.activeQuestions = this._shuffleArray([...this.questions]);
        this.isReviewMode = false;
        this.phase = 'quiz';
        this.currentIndex = 0;
        this.answers.clear();
        this.results.clear();
        this.submitted.clear();
        this._shuffleAllOptions();
        window.addEventListener('beforeunload', this._boundBeforeUnload);
        this._renderQuestion();
    }

    reviewMissed() {
        const missed = this.activeQuestions.filter(q => {
            const r = this.results.get(q.id);
            return r && !r.correct;
        });
        if (missed.length === 0) return;

        this.activeQuestions = missed;
        this.isReviewMode = true;
        this.phase = 'quiz';
        this.currentIndex = 0;
        this.answers.clear();
        this.results.clear();
        this.submitted.clear();
        this._shuffleAllOptions();
        window.addEventListener('beforeunload', this._boundBeforeUnload);
        this._renderQuestion();
    }

    destroy() {
        window.removeEventListener('beforeunload', this._boundBeforeUnload);
        this.container.removeEventListener('click', this._boundClickHandler);
        this.container.removeEventListener('keydown', this._boundKeyHandler);
    }

    // ── Event Handling ──────────────────────────────────────

    _handleClick(e) {
        // Action buttons
        const actionBtn = e.target.closest('[data-quiz-action]');
        if (actionBtn) {
            e.preventDefault();
            const action = actionBtn.dataset.quizAction;
            switch (action) {
                case 'start-practice': this.startQuiz('practice'); break;
                case 'start-exam': this.startQuiz('exam'); break;
                case 'submit': this.submitAnswer(); break;
                case 'next': this.nextQuestion(); break;
                case 'retake': this.retakeQuiz(); break;
                case 'review-missed': this.reviewMissed(); break;
                case 'back-to-start': this.phase = 'start'; this._renderStartScreen(); break;
            }
            return;
        }

        // Option selection
        const option = e.target.closest('.quiz-option');
        if (option && !option.classList.contains('quiz-option--disabled')) {
            const input = option.querySelector('input');
            if (!input) return;

            if (input.type === 'radio') {
                // Deselect all, select this one
                this.container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('quiz-option--selected'));
                option.classList.add('quiz-option--selected');
                input.checked = true;
            } else {
                // Toggle checkbox
                input.checked = !input.checked;
                option.classList.toggle('quiz-option--selected', input.checked);
            }
            this._updateSubmitButton();
            return;
        }

        // Results accordion toggle
        const resultSummary = e.target.closest('.quiz-result-summary');
        if (resultSummary) {
            const item = resultSummary.closest('.quiz-result-item');
            if (item) {
                item.classList.toggle('quiz-result-item--expanded');
                const expanded = item.classList.contains('quiz-result-item--expanded');
                resultSummary.setAttribute('aria-expanded', expanded);
            }
            return;
        }
    }

    _handleKeydown(e) {
        // Option keyboard selection
        const option = e.target.closest('.quiz-option');
        if (option && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            option.click();
            return;
        }
    }

    _handleBeforeUnload(e) {
        if (this.phase === 'quiz' && this.answers.size > 0) {
            e.preventDefault();
            e.returnValue = '';
        }
    }

    // ── Rendering: Start Screen ─────────────────────────────

    _renderStartScreen() {
        this.phase = 'start';
        window.removeEventListener('beforeunload', this._boundBeforeUnload);

        const difficultyCount = this._getDifficultyBreakdown();
        const total = this.questions.length;

        this.container.innerHTML = `
            <a href="../${this.guideSlug}.html" class="quiz-back-link">
                <i class="fas fa-arrow-left"></i> Back to Study Guide
            </a>
            <div class="quiz-start">
                <div class="quiz-start-header">
                    <span class="quiz-start-badge" style="background: ${this._escapeAttr(this.categoryColor)}">${this._escapeHtml(this.category)}</span>
                    <h1 class="quiz-start-title">${this._escapeHtml(this.guideName)} Quiz</h1>
                    <p class="quiz-start-subtitle">NCLEX-Style Practice Questions</p>
                </div>

                <div class="quiz-start-stats">
                    <span class="quiz-stat"><i class="fas fa-question-circle"></i> ${total} Questions</span>
                    <span class="quiz-stat"><i class="fas fa-clock"></i> ~${this.estimatedMinutes} min</span>
                    <span class="quiz-stat"><i class="fas fa-layer-group"></i> ${this._getTypeCount()} Types</span>
                </div>

                <div class="quiz-difficulty-breakdown">
                    <div class="quiz-difficulty-title">Question Complexity</div>
                    <div class="quiz-difficulty-bars">
                        ${this._renderDifficultyRow('Knowledge', difficultyCount.knowledge, total, 'knowledge')}
                        ${this._renderDifficultyRow('Application', difficultyCount.application, total, 'application')}
                        ${this._renderDifficultyRow('Analysis', difficultyCount.analysis, total, 'analysis')}
                    </div>
                </div>

                <div class="quiz-start-modes">
                    <button class="quiz-mode-btn quiz-mode-btn--practice" data-quiz-action="start-practice">
                        <div class="quiz-mode-icon"><i class="fas fa-book-open"></i></div>
                        <div class="quiz-mode-info">
                            <div class="quiz-mode-name">Practice Mode</div>
                            <div class="quiz-mode-desc">See rationale after each question</div>
                        </div>
                    </button>
                    <button class="quiz-mode-btn quiz-mode-btn--exam" data-quiz-action="start-exam">
                        <div class="quiz-mode-icon"><i class="fas fa-clipboard-check"></i></div>
                        <div class="quiz-mode-info">
                            <div class="quiz-mode-name">Exam Mode</div>
                            <div class="quiz-mode-desc">All rationales shown at the end</div>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }

    _renderDifficultyRow(label, count, total, level) {
        const pct = total > 0 ? (count / total) * 100 : 0;
        return `
            <div class="quiz-difficulty-row">
                <span class="quiz-difficulty-label">${label}</span>
                <div class="quiz-difficulty-bar">
                    <div class="quiz-difficulty-fill quiz-difficulty-fill--${level}" style="width: ${pct}%"></div>
                </div>
                <span class="quiz-difficulty-count">${count}</span>
            </div>
        `;
    }

    // ── Rendering: Question ─────────────────────────────────

    _renderQuestion() {
        const q = this.activeQuestions[this.currentIndex];
        if (!q) return;

        const total = this.activeQuestions.length;
        const num = this.currentIndex + 1;
        const pct = (num / total) * 100;
        const isSATA = q.type === 'sata';
        const inputType = isSATA ? 'checkbox' : 'radio';
        const typeName = this._getTypeName(q);
        const typeClass = this._getTypeClass(q);
        const reviewLabel = this.isReviewMode ? ' (Review)' : '';

        this.container.innerHTML = `
            <a href="../${this.guideSlug}.html" class="quiz-back-link">
                <i class="fas fa-arrow-left"></i> Back to Study Guide
            </a>
            <div class="quiz-progress">
                <div class="quiz-progress-header">
                    <span class="quiz-progress-text">Question ${num} of ${total}${reviewLabel}</span>
                    <span class="quiz-progress-mode quiz-progress-mode--${this.mode}">${this.mode === 'practice' ? 'Practice' : 'Exam'}</span>
                </div>
                <div class="quiz-progress-track">
                    <div class="quiz-progress-fill" style="width: ${pct}%"></div>
                </div>
            </div>
            <div class="quiz-question">
                <div class="quiz-question-header">
                    <span class="quiz-question-badge">${num}</span>
                    <span class="quiz-question-type ${typeClass}">${typeName}</span>
                    <span class="quiz-question-difficulty">${this._capitalize(q.difficulty)}</span>
                </div>
                <div class="quiz-question-stem">
                    ${this._escapeHtml(q.stem)}
                    ${isSATA ? '<span class="quiz-sata-instruction">Select all that apply.</span>' : ''}
                </div>
                ${this.mode === 'practice' && q.labValues && q.labValues.length > 0 ? this._renderLabReference(q.labValues) : ''}
                <div class="quiz-options" role="${isSATA ? 'group' : 'radiogroup'}" aria-label="Answer options">
                    ${(this._getShuffledOptions(q.id) || q.options).map((opt, idx) => this._renderOption(q, opt, inputType, idx)).join('')}
                </div>
                <div class="quiz-actions">
                    <button class="quiz-btn quiz-btn--primary" data-quiz-action="submit" disabled>
                        ${isSATA ? 'Submit Answers' : 'Submit Answer'}
                    </button>
                </div>
                <div id="quiz-feedback-area"></div>
            </div>
        `;

        // Focus the question stem for screen readers
        const stem = this.container.querySelector('.quiz-question-stem');
        if (stem) stem.setAttribute('tabindex', '-1');
        if (stem) stem.focus({ preventScroll: true });
    }

    _renderOption(q, opt, inputType, positionIndex) {
        const isCheckbox = inputType === 'checkbox';
        const displayLetter = this._getDisplayLetter(q.id, opt.id);
        return `
            <label class="quiz-option ${isCheckbox ? 'quiz-option--checkbox' : ''}" tabindex="0" role="${isCheckbox ? 'checkbox' : 'radio'}" aria-checked="false">
                <input type="${inputType}" name="quiz-q-${q.id}" value="${this._escapeAttr(opt.id)}" tabindex="-1">
                <span class="quiz-option-marker"></span>
                <span class="quiz-option-letter">${displayLetter.toUpperCase()}.</span>
                <span class="quiz-option-text">${this._escapeHtml(opt.text)}</span>
            </label>
        `;
    }

    _renderLabReference(labValues) {
        const rows = labValues.map(lv =>
            `<tr><td class="quiz-lab-name">${this._escapeHtml(lv.name)}</td><td class="quiz-lab-normal">${this._escapeHtml(lv.normal)}</td></tr>`
        ).join('');
        return `
            <div class="quiz-lab-reference" aria-label="Lab reference values">
                <div class="quiz-lab-header"><i class="fas fa-flask"></i> Reference Ranges</div>
                <table class="quiz-lab-table">
                    <thead><tr><th>Lab Value</th><th>Normal Range</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    _updateSubmitButton() {
        const btn = this.container.querySelector('[data-quiz-action="submit"]');
        if (!btn) return;
        const q = this.activeQuestions[this.currentIndex];
        if (!q) return;

        const hasSelection = this._getUserAnswer(q) !== null;
        btn.disabled = !hasSelection;
    }

    _getUserAnswer(q) {
        if (q.type === 'sata') {
            const checked = this.container.querySelectorAll(`input[name="quiz-q-${q.id}"]:checked`);
            if (checked.length === 0) return null;
            return Array.from(checked).map(el => el.value).sort();
        } else {
            const checked = this.container.querySelector(`input[name="quiz-q-${q.id}"]:checked`);
            return checked ? checked.value : null;
        }
    }

    // ── Submit Feedback ─────────────────────────────────────

    _showSubmitFeedback(q, userAnswer, isCorrect, isPartial) {
        // Disable all options
        this.container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.add('quiz-option--disabled');
            const input = opt.querySelector('input');
            const val = input ? input.value : '';

            if (q.type === 'sata') {
                const userSelected = Array.isArray(userAnswer) && userAnswer.includes(val);
                const isAnswerCorrect = Array.isArray(q.correct) && q.correct.includes(val);

                if (userSelected && isAnswerCorrect) {
                    opt.classList.add('quiz-option--correct');
                } else if (userSelected && !isAnswerCorrect) {
                    opt.classList.add('quiz-option--incorrect');
                } else if (!userSelected && isAnswerCorrect) {
                    opt.classList.add('quiz-option--missed');
                }
                opt.classList.remove('quiz-option--selected');
            } else {
                if (val === q.correct) {
                    opt.classList.add('quiz-option--correct');
                } else if (val === userAnswer) {
                    opt.classList.add('quiz-option--incorrect');
                }
                opt.classList.remove('quiz-option--selected');
            }

            // Update ARIA role state
            opt.setAttribute('aria-checked', input && input.checked ? 'true' : 'false');
        });

        // Hide submit, show next
        const actions = this.container.querySelector('.quiz-actions');
        if (actions) {
            const isLast = this.currentIndex >= this.activeQuestions.length - 1;
            actions.innerHTML = `
                <button class="quiz-btn ${isLast ? 'quiz-btn--success' : 'quiz-btn--primary'}" data-quiz-action="next">
                    ${isLast ? '<i class="fas fa-chart-bar"></i> See Results' : 'Next Question <i class="fas fa-arrow-right"></i>'}
                </button>
            `;
        }

        // Show feedback
        const feedbackArea = document.getElementById('quiz-feedback-area');
        if (!feedbackArea) return;

        if (this.mode === 'practice') {
            feedbackArea.innerHTML = this._buildPracticeFeedback(q, userAnswer, isCorrect, isPartial);
        } else {
            feedbackArea.innerHTML = this._buildExamIndicator(isCorrect, isPartial);
        }

        // Focus feedback for accessibility
        const feedback = feedbackArea.firstElementChild;
        if (feedback) {
            feedback.setAttribute('tabindex', '-1');
            feedback.focus({ preventScroll: false });
        }
    }

    _buildPracticeFeedback(q, userAnswer, isCorrect, isPartial) {
        let statusClass, statusIcon, statusText;
        if (isCorrect) {
            statusClass = 'quiz-feedback--correct';
            statusIcon = 'fa-check-circle';
            statusText = 'Correct!';
        } else if (isPartial) {
            statusClass = 'quiz-feedback--partial';
            statusIcon = 'fa-star-half-alt';
            statusText = 'Almost There!';
        } else {
            statusClass = 'quiz-feedback--incorrect';
            statusIcon = 'fa-times-circle';
            statusText = 'Incorrect';
        }

        let html = `<div class="quiz-feedback ${statusClass}">`;
        html += `<div class="quiz-feedback-header"><i class="fas ${statusIcon}"></i> ${statusText}</div>`;

        // SATA partial credit info
        if (q.type === 'sata' && !isCorrect) {
            const partial = this._getSATAPartialCredit(q, userAnswer);
            html += `<div class="quiz-sata-partial"><i class="fas fa-info-circle"></i> ${partial}</div>`;
        }

        // Correct answer rationale
        if (q.rationale && q.rationale.correct) {
            html += `<div class="quiz-feedback-section">`;
            html += `<div class="quiz-feedback-label">Why ${isCorrect ? 'this is correct' : 'the correct answer is right'}</div>`;
            html += `<div class="quiz-feedback-text">${this._escapeHtml(q.rationale.correct)}</div>`;
            html += `</div>`;
        }

        // Wrong answer rationales
        const wrongRationales = this._getWrongRationales(q, userAnswer);
        if (wrongRationales.length > 0) {
            html += `<div class="quiz-feedback-section">`;
            html += `<div class="quiz-feedback-label">${q.type === 'sata' ? 'Option explanations' : 'Why the other options are wrong'}</div>`;
            wrongRationales.forEach(r => {
                const letter = this._getDisplayLetter(q.id, r.id);
                html += `<div class="quiz-feedback-rationale-item"><strong>${letter.toUpperCase()}.</strong> ${this._escapeHtml(r.text)}</div>`;
            });
            html += `</div>`;
        }

        // Test-taking tip
        if (q.testTakingTip) {
            html += `
                <div class="quiz-feedback-tip">
                    <div class="quiz-feedback-tip-label"><i class="fas fa-lightbulb"></i> Test-Taking Tip</div>
                    <div class="quiz-feedback-tip-text">${this._escapeHtml(q.testTakingTip)}</div>
                </div>
            `;
        }

        // Review link (wrong) or engagement link (correct)
        if (!isCorrect && q.guideSectionId) {
            html += `
                <a href="../${this.guideSlug}.html#${this._escapeAttr(q.guideSectionId)}" class="quiz-feedback-review" target="_blank">
                    <i class="fas fa-book"></i> Review: ${this._escapeHtml(q.guideSection || 'Study Guide')} <i class="fas fa-external-link-alt" style="font-size:0.75rem"></i>
                </a>
            `;
        }

        html += `</div>`;
        return html;
    }

    _buildExamIndicator(isCorrect, isPartial) {
        let cls, icon, text;
        if (isCorrect) {
            cls = 'quiz-exam-indicator--correct';
            icon = 'fa-check';
            text = 'Correct';
        } else if (isPartial) {
            cls = 'quiz-exam-indicator--partial';
            icon = 'fa-star-half-alt';
            text = 'Partially Correct';
        } else {
            cls = 'quiz-exam-indicator--incorrect';
            icon = 'fa-times';
            text = 'Incorrect';
        }
        return `<div class="quiz-exam-indicator ${cls}"><i class="fas ${icon}"></i> ${text}</div>`;
    }

    // ── Rendering: Results ──────────────────────────────────

    _renderResultsScreen() {
        const total = this.activeQuestions.length;
        const correctCount = Array.from(this.results.values()).filter(r => r.correct).length;
        const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
        const circumference = 2 * Math.PI * 62; // r=62 for 160px ring
        const offset = circumference - (pct / 100) * circumference;
        const perfTier = pct >= 90 ? 'excellent' : pct >= 70 ? 'good' : 'needs-work';
        const perfMsg = this._getPerformanceMessage(pct);
        const missedCount = total - correctCount;

        const isPerfect = pct === 100;

        let html = `
            <a href="../${this.guideSlug}.html" class="quiz-back-link">
                <i class="fas fa-arrow-left"></i> Back to Study Guide
            </a>
            <div class="quiz-results ${isPerfect ? 'quiz-celebration' : ''}">
                ${isPerfect ? '<canvas class="quiz-confetti-canvas" id="quiz-confetti"></canvas>' : ''}
                <div class="quiz-results-header">
                    <div class="quiz-score-ring-wrap">
                        <div class="quiz-score-ring">
                            <svg viewBox="0 0 140 140">
                                <circle class="quiz-score-ring-bg" cx="70" cy="70" r="62"></circle>
                                <circle class="quiz-score-ring-fill quiz-score-ring-fill--${perfTier}" cx="70" cy="70" r="62"
                                    stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"></circle>
                            </svg>
                            <div class="quiz-score-center">
                                <div class="quiz-score-value">${correctCount}/${total}</div>
                                <div class="quiz-score-label">correct</div>
                            </div>
                        </div>
                    </div>
                    <div class="quiz-score-percentage">${pct}%</div>
                    <div class="quiz-performance-msg">${this._escapeHtml(perfMsg)}</div>
                </div>
        `;

        // Celebration banner for perfect scores
        if (isPerfect) {
            const celebMsg = this.mode === 'practice'
                ? 'You\'re ready to test yourself under real exam conditions. Try Exam Mode to simulate the NCLEX experience!'
                : 'You aced every question under exam conditions. This topic is locked in!';
            html += `
                <div class="quiz-celebration-banner">
                    <div class="quiz-celebration-icon">&#127881;</div>
                    <div class="quiz-celebration-title">Congratulations!</div>
                    <div class="quiz-celebration-subtitle">${celebMsg}</div>
                </div>
            `;
        }

        // Next step CTA based on mode and score
        if (this.mode === 'practice' && pct >= 70) {
            html += `
                <div class="quiz-next-step">
                    <div class="quiz-next-step-icon"><i class="fas fa-clipboard-check"></i></div>
                    <div class="quiz-next-step-content">
                        <div class="quiz-next-step-title">${isPerfect ? 'Challenge Yourself' : 'Ready for the Next Level?'}</div>
                        <div class="quiz-next-step-desc">${isPerfect
                            ? 'Take Exam Mode — no rationales, no hints, just like the real NCLEX.'
                            : 'Try Exam Mode to test yourself without rationales, simulating real test conditions.'}</div>
                    </div>
                    <button class="quiz-btn quiz-btn--primary" data-quiz-action="start-exam">
                        <i class="fas fa-graduation-cap"></i> Exam Mode
                    </button>
                </div>
            `;
        } else if (this.mode === 'exam' && pct >= 90) {
            html += `
                <div class="quiz-next-step">
                    <div class="quiz-next-step-icon"><i class="fas fa-th-list"></i></div>
                    <div class="quiz-next-step-content">
                        <div class="quiz-next-step-title">Keep the Momentum Going</div>
                        <div class="quiz-next-step-desc">You're crushing it! Try a quiz on another topic to broaden your knowledge.</div>
                    </div>
                    <a href="../../study-guides.html" class="quiz-btn quiz-btn--primary">
                        <i class="fas fa-arrow-right"></i> More Quizzes
                    </a>
                </div>
            `;
        }

        // Weak areas
        if (missedCount > 0) {
            const weakSections = this._getWeakAreas();
            if (weakSections.length > 0) {
                html += `
                    <div class="quiz-weak-areas">
                        <div class="quiz-weak-areas-title"><i class="fas fa-exclamation-triangle"></i> Areas to Review</div>
                        <ul class="quiz-weak-area-list">
                            ${weakSections.map(s => `
                                <li class="quiz-weak-area-item">
                                    <span class="quiz-weak-area-name">${this._escapeHtml(s.name)}</span>
                                    <a href="../${this.guideSlug}.html#${this._escapeAttr(s.id)}" class="quiz-weak-area-link" target="_blank">
                                        Review <i class="fas fa-arrow-right"></i>
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
        }

        // Per-question breakdown
        html += `
            <div class="quiz-results-breakdown">
                <div class="quiz-results-breakdown-title">Question Breakdown</div>
                ${this.activeQuestions.map((q, i) => this._renderResultItem(q, i)).join('')}
            </div>
        `;

        // Action buttons
        html += `<div class="quiz-results-actions">`;
        if (missedCount > 0) {
            html += `<button class="quiz-btn quiz-btn--primary" data-quiz-action="review-missed">
                <i class="fas fa-redo"></i> Review Missed (${missedCount})
            </button>`;
        }
        html += `
                <button class="quiz-btn quiz-btn--secondary" data-quiz-action="retake">
                    <i class="fas fa-sync-alt"></i> Retake Full Quiz
                </button>
                <a href="../${this.guideSlug}.html" class="quiz-btn quiz-btn--secondary">
                    <i class="fas fa-book"></i> Back to Study Guide
                </a>
                <a href="../../study-guides.html" class="quiz-btn quiz-btn--secondary">
                    <i class="fas fa-th-list"></i> Try Another Quiz
                </a>
            </div>
        </div>`;

        this.container.innerHTML = html;

        // Launch confetti for perfect scores
        if (isPerfect) {
            this._launchConfetti();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    _renderResultItem(q, index) {
        const result = this.results.get(q.id);
        if (!result) return '';

        const isCorrect = result.correct;
        const isPartial = result.partial;
        let iconClass, icon;
        if (isCorrect) {
            iconClass = 'quiz-result-icon--correct';
            icon = 'fa-check';
        } else if (isPartial) {
            iconClass = 'quiz-result-icon--partial';
            icon = 'fa-star-half-alt';
        } else {
            iconClass = 'quiz-result-icon--incorrect';
            icon = 'fa-times';
        }
        const truncatedStem = q.stem.length > 120 ? q.stem.substring(0, 120) + '...' : q.stem;

        let userAnswerDisplay, correctAnswerDisplay;
        if (q.type === 'sata') {
            const ua = Array.isArray(result.userAnswer) ? result.userAnswer : [];
            userAnswerDisplay = ua.map(a => this._getDisplayLetter(q.id, a).toUpperCase()).join(', ') || 'None';
            correctAnswerDisplay = Array.isArray(q.correct) ? q.correct.map(a => this._getDisplayLetter(q.id, a).toUpperCase()).join(', ') : '';
        } else {
            userAnswerDisplay = result.userAnswer ? this._getDisplayLetter(q.id, result.userAnswer).toUpperCase() : 'None';
            correctAnswerDisplay = q.correct ? this._getDisplayLetter(q.id, q.correct).toUpperCase() : '';
        }

        let detailHtml = `
            <div class="quiz-result-detail-inner">
                <div class="quiz-result-answer-row">
                    <span class="quiz-result-your-answer">Your answer: <strong>${this._escapeHtml(userAnswerDisplay)}</strong></span>
                    <span class="quiz-result-correct-answer">Correct: <strong>${this._escapeHtml(correctAnswerDisplay)}</strong></span>
                </div>
        `;

        // Rationale (always shown in results, for both modes)
        if (q.rationale && q.rationale.correct) {
            detailHtml += `<div class="quiz-result-rationale">${this._escapeHtml(q.rationale.correct)}</div>`;
        }

        // Review link for wrong answers
        if (!isCorrect && q.guideSectionId) {
            detailHtml += `
                <a href="../${this.guideSlug}.html#${this._escapeAttr(q.guideSectionId)}" class="quiz-result-review-link" target="_blank">
                    <i class="fas fa-book"></i> Review: ${this._escapeHtml(q.guideSection || 'Study Guide')}
                </a>
            `;
        }

        detailHtml += `</div>`;

        return `
            <div class="quiz-result-item">
                <button class="quiz-result-summary" aria-expanded="false">
                    <span class="quiz-result-icon ${iconClass}"><i class="fas ${icon}"></i></span>
                    <span class="quiz-result-stem">${this._escapeHtml(truncatedStem)}</span>
                    <i class="fas fa-chevron-down quiz-result-expand-icon"></i>
                </button>
                <div class="quiz-result-detail">${detailHtml}</div>
            </div>
        `;
    }

    // ── Confetti Animation ────────────────────────────────────

    _launchConfetti() {
        const canvas = document.getElementById('quiz-confetti');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        const colors = ['#059669', '#10b981', '#2E86AB', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444'];
        const pieces = [];
        const count = 80;

        for (let i = 0; i < count; i++) {
            pieces.push({
                x: canvas.width * Math.random(),
                y: -20 - Math.random() * 200,
                w: 6 + Math.random() * 6,
                h: 4 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vy: 2 + Math.random() * 3,
                vx: (Math.random() - 0.5) * 2,
                rot: Math.random() * 360,
                rv: (Math.random() - 0.5) * 8,
                opacity: 1
            });
        }

        let frame = 0;
        const maxFrames = 300; // ~5 seconds at 60fps

        const animate = () => {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let alive = false;
            pieces.forEach(p => {
                p.y += p.vy;
                p.x += p.vx;
                p.rot += p.rv;
                p.vy += 0.05; // gravity
                if (frame > maxFrames - 60) {
                    p.opacity = Math.max(0, p.opacity - 0.02);
                }

                if (p.opacity > 0 && p.y < canvas.height + 20) {
                    alive = true;
                    ctx.save();
                    ctx.globalAlpha = p.opacity;
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rot * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.restore();
                }
            });

            if (alive && frame < maxFrames) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        requestAnimationFrame(animate);
    }

    // ── Scoring Helpers ─────────────────────────────────────

    _checkAnswer(q, userAnswer) {
        if (q.type === 'sata') {
            if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return false;
            const sortedUser = [...userAnswer].sort();
            const sortedCorrect = [...q.correct].sort();
            return sortedUser.length === sortedCorrect.length &&
                   sortedUser.every((v, i) => v === sortedCorrect[i]);
        }
        return userAnswer === q.correct;
    }

    _hasSATAPartialCredit(q, userAnswer) {
        if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return false;
        const correctSelected = userAnswer.filter(a => q.correct.includes(a)).length;
        return correctSelected > 0;
    }

    _getSATAPartialCredit(q, userAnswer) {
        if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return '';
        const correctSelected = userAnswer.filter(a => q.correct.includes(a)).length;
        const totalCorrect = q.correct.length;
        const wrongExtras = userAnswer.filter(a => !q.correct.includes(a)).length;

        let msg = `You selected ${correctSelected} of ${totalCorrect} correct answer${totalCorrect > 1 ? 's' : ''}`;
        if (wrongExtras > 0) {
            msg += ` and included ${wrongExtras} incorrect option${wrongExtras > 1 ? 's' : ''}`;
        }
        return msg;
    }

    _getWrongRationales(q, userAnswer) {
        if (!q.rationale) return [];
        const rationales = [];

        q.options.forEach(opt => {
            const key = opt.id;
            if (key === 'correct') return;

            if (q.type === 'sata') {
                // For SATA, show all option rationales
                if (q.rationale[key]) {
                    rationales.push({ id: key, text: q.rationale[key] });
                }
            } else {
                // For single answer, show rationales for non-correct options
                if (key !== q.correct && q.rationale[key]) {
                    rationales.push({ id: key, text: q.rationale[key] });
                }
            }
        });

        return rationales;
    }

    _getPerformanceMessage(pct) {
        if (pct === 100) return 'Perfect score! You nailed every single question.';
        if (pct >= 90) return 'Excellent! You\'ve mastered this topic. Keep up the great work!';
        if (pct >= 70) return 'Good work! Review the topics below to strengthen your understanding.';
        return 'Keep studying! Use the review links below to revisit key concepts, then try again.';
    }

    _getWeakAreas() {
        const sectionMap = new Map();
        this.activeQuestions.forEach(q => {
            const result = this.results.get(q.id);
            if (result && !result.correct && q.guideSectionId) {
                const key = q.guideSectionId;
                if (!sectionMap.has(key)) {
                    sectionMap.set(key, { id: q.guideSectionId, name: q.guideSection || q.guideSectionId });
                }
            }
        });
        return Array.from(sectionMap.values());
    }

    _getDifficultyBreakdown() {
        const counts = { knowledge: 0, application: 0, analysis: 0 };
        this.questions.forEach(q => {
            const d = (q.difficulty || '').toLowerCase();
            if (counts.hasOwnProperty(d)) counts[d]++;
        });
        return counts;
    }

    _getTypeCount() {
        const types = new Set();
        this.questions.forEach(q => {
            if (q.subtype === 'priority') types.add('priority');
            else types.add(q.type);
        });
        return types.size;
    }

    _getTypeName(q) {
        if (q.subtype === 'priority') return 'Priority';
        if (q.type === 'sata') return 'Select All That Apply';
        return 'Single Best Answer';
    }

    _getTypeClass(q) {
        if (q.subtype === 'priority') return 'quiz-question-type--priority';
        if (q.type === 'sata') return 'quiz-question-type--sata';
        return 'quiz-question-type--single';
    }

    // ── Utility ─────────────────────────────────────────────

    _capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    _escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    _escapeAttr(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    _shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    _shuffleAllOptions() {
        this._shuffledOptions.clear();
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        this.activeQuestions.forEach(q => {
            const shuffled = this._shuffleArray([...q.options]);
            // Map: original option id -> display letter based on new position
            const letterMap = {};
            shuffled.forEach((opt, i) => {
                letterMap[opt.id] = letters[i];
            });
            this._shuffledOptions.set(q.id, { options: shuffled, letterMap: letterMap });
        });
    }

    _getDisplayLetter(questionId, optionId) {
        const data = this._shuffledOptions.get(questionId);
        if (data && data.letterMap[optionId]) {
            return data.letterMap[optionId];
        }
        return optionId; // fallback to original
    }

    _getShuffledOptions(questionId) {
        const data = this._shuffledOptions.get(questionId);
        return data ? data.options : null;
    }
}
