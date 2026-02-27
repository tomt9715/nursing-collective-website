/**
 * QuizEngine — Interactive NCLEX-style quiz engine
 * The Nursing Collective
 *
 * Renders start screen, question cards, feedback, and results.
 * Supports Practice Mode (rationale after each question) and
 * Exam Mode (rationale at the end).
 *
 * Question types: single, ordering, matrix (+ priority subtype).
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
        this.backUrl = config.backUrl || ('../' + this.guideSlug + '.html');
        this.backLabel = config.backLabel || 'Back to Study Guide';
        this.isAIGenerated = config.isAIGenerated || false;
        this.aiPoolInfo = config.aiPoolInfo || null; // { currentRound, totalRounds, hasNextRound, questionsPerRound, totalQuestions }

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
        this._orderingSequence = [];       // ordering type: array of selected option IDs in click order

        // Timer state
        this.sessionStartTime = null;
        this.sessionElapsed = 0;
        this._timerInterval = null;
        this.timerMode = 'elapsed';      // 'elapsed' | 'countdown'
        this.countdownSeconds = 0;
        this.totalTimeSeconds = 0;

        // Session size
        this.selectedSessionSize = this.questions.length;

        // Flag for review
        this.flaggedQuestions = new Set();
        this._reviewedFlags = false;

        // Confidence tracking
        this.confidenceRatings = new Map(); // questionId -> 'low' | 'medium' | 'high'
        this._pendingFeedback = null;       // stores feedback data while confidence prompt is shown

        // Resume state
        this._saveKey = 'nursingCollective_quizState_' + (config.guideSlug || '');

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
        this.flaggedQuestions.clear();
        this._reviewedFlags = false;
        this.confidenceRatings.clear();
        this._pendingFeedback = null;
        const sessionSize = this.selectedSessionSize || this.questions.length;
        this.activeQuestions = this._selectQuestionsWithReask(sessionSize);
        this.isReviewMode = false;
        this._shuffleAllOptions();

        // Timer (exam mode only — practice mode has no timer)
        this.sessionStartTime = Date.now();
        this.sessionElapsed = 0;
        this.timerMode = (mode === 'exam') ? 'countdown' : 'none';
        this.countdownSeconds = (mode === 'exam') ? this.activeQuestions.length * 90 : 0;
        if (mode === 'exam') this._startTimer();

        this._clearSavedState();
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
        const isPartial = !isCorrect && (
            (q.type === 'matrix' && this._hasMatrixPartialCredit(q, userAnswer)) ||
            (q.type === 'ordering' && this._hasOrderingPartialCredit(q, userAnswer)) ||
            (q.type === 'sata' && this._hasSATAPartialCredit(q, userAnswer))
        );
        // Calculate partial score fraction (e.g., 3 of 5 correct positions = 0.6)
        let partialScore = 0;
        if (isPartial && q.type === 'ordering') {
            partialScore = this._getOrderingPartialScore(q, userAnswer);
        } else if (isPartial && q.type === 'matrix') {
            const correctRows = q.options.filter(opt => userAnswer[opt.id] === q.correct[opt.id]).length;
            partialScore = correctRows / q.options.length;
        } else if (isPartial && q.type === 'sata') {
            partialScore = this._getSATAPartialScore(q, userAnswer);
        }
        this.results.set(q.id, {
            correct: isCorrect,
            partial: isPartial,
            partialScore: isCorrect ? 1 : partialScore,
            userAnswer: userAnswer,
            correctAnswer: q.correct
        });

        this._showSubmitFeedback(q, userAnswer, isCorrect, isPartial);
        this._saveState();
    }

    nextQuestion() {
        if (this.currentIndex < this.activeQuestions.length - 1) {
            this.currentIndex++;
            this._renderQuestion();
            this._saveState();
        } else if (this.flaggedQuestions.size > 0 && !this._reviewedFlags) {
            this._showFlagReviewPrompt();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.phase = 'results';
        this._stopTimer();
        this.totalTimeSeconds = Math.round((Date.now() - this.sessionStartTime) / 1000);
        this._clearSavedState();
        window.removeEventListener('beforeunload', this._boundBeforeUnload);

        // Record session in history
        if (typeof QuizHistory !== 'undefined' && !this.isReviewMode) {
            var correctCount = 0;
            this.results.forEach(function (r) {
                if (r.correct) correctCount++;
                else if (r.partial && r.partialScore) correctCount += r.partialScore;
            });
            correctCount = Math.round(correctCount * 100) / 100; // clean float
            var total = this.activeQuestions.length;
            QuizHistory.recordSession({
                topicId: this.guideSlug,
                topicName: this.guideName,
                category: this.category,
                mode: this.mode,
                score: total > 0 ? Math.round((correctCount / total) * 100) : 0,
                correct: correctCount,
                total: total,
                timeSeconds: this.totalTimeSeconds,
                confidence: this._getConfidenceBreakdown()
            });
        }

        // Save confidence tracker (re-ask guessing/somewhat-sure questions next time)
        this._saveConfidenceTracker();

        // Record mastery points (exam mode only, not AI quizzes)
        if (typeof MasteryTracker !== 'undefined' && !this.isReviewMode && this.mode === 'exam' && !this.isAIGenerated) {
            const masteryResults = [];
            this.activeQuestions.forEach(q => {
                const r = this.results.get(q.id);
                if (r) {
                    masteryResults.push({ questionId: q.id, correct: r.correct });
                }
            });
            if (masteryResults.length > 0) {
                MasteryTracker.recordSetResult(this.guideSlug, masteryResults);
                // Sync to server if logged in
                if (typeof MasteryTracker.syncToServer === 'function') {
                    MasteryTracker.syncToServer();
                }
            }
        }

        this._renderResultsScreen();
    }

    retakeQuiz() {
        const retakeSize = this.selectedSessionSize || this.questions.length;
        this.activeQuestions = this._selectQuestionsWithReask(retakeSize);
        this.isReviewMode = false;
        this.phase = 'quiz';
        this.currentIndex = 0;
        this.answers.clear();
        this.results.clear();
        this.submitted.clear();
        this.flaggedQuestions.clear();
        this._reviewedFlags = false;
        this.confidenceRatings.clear();
        this._pendingFeedback = null;
        this._shuffleAllOptions();

        this.sessionStartTime = Date.now();
        this.sessionElapsed = 0;
        this.countdownSeconds = (this.mode === 'exam') ? this.activeQuestions.length * 90 : 0;
        this._startTimer();
        this._clearSavedState();

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
        this.flaggedQuestions.clear();
        this._reviewedFlags = false;
        this.confidenceRatings.clear();
        this._pendingFeedback = null;
        this._shuffleAllOptions();

        this.sessionStartTime = Date.now();
        this.sessionElapsed = 0;
        this.countdownSeconds = 0;
        this.timerMode = 'none';

        window.addEventListener('beforeunload', this._boundBeforeUnload);
        this._renderQuestion();
    }

    goAgain() {
        if (!this.aiPoolInfo) return;
        // Advance to the next round and reload the quiz page
        const nextRound = this.aiPoolInfo.currentRound + 1;
        sessionStorage.setItem('aiQuizRound', String(nextRound));
        // Reload the page — quiz.html will re-read sessionStorage and quiz-init.js will slice the next pool
        window.location.reload();
    }

    async _explainQuestion(questionId, btn) {
        // Find the question
        const q = this.questions.find(q => q.id === questionId) ||
                  this.activeQuestions.find(q => q.id === questionId);
        if (!q) return;

        // Get the container (now a sibling panel of .quiz-question-main)
        const container = document.getElementById('explain-' + questionId);
        if (!container) return;

        const questionCard = container.closest('.quiz-question');

        // If already loaded, just toggle visibility
        if (container.dataset.loaded === 'true') {
            const isHiding = container.style.display !== 'none';
            container.style.display = isHiding ? 'none' : 'block';
            btn.classList.toggle('quiz-explain-btn--active');
            btn.innerHTML = isHiding
                ? '<i class="fas fa-graduation-cap"></i> Explain This Question'
                : '<i class="fas fa-graduation-cap"></i> Hide Explanation';
            if (questionCard) {
                if (isHiding) questionCard.classList.remove('quiz-question--has-explain');
                else questionCard.classList.add('quiz-question--has-explain');
            }
            return;
        }

        // Show loading state
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating explanation...';
        container.style.display = 'block';
        container.innerHTML = '<div class="quiz-explain-content">' +
            '<div class="quiz-explain-header"><i class="fas fa-graduation-cap"></i> AI Explanation</div>' +
            '<div class="quiz-explain-body quiz-explain-body--streaming"></div></div>';

        // Trigger side-by-side layout
        if (questionCard) questionCard.classList.add('quiz-question--has-explain');

        const bodyEl = container.querySelector('.quiz-explain-body');

        // Build request payload
        const result = this.results.get(q.id);
        const payload = {
            stem: q.stem,
            options: q.options,
            correct: q.correct,
            userAnswer: result ? result.userAnswer : null,
            isCorrect: result ? result.correct : false,
            rationale: q.rationale ? q.rationale.correct : '',
        };

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(API_URL + '/api/ai/explain-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? {'Authorization': 'Bearer ' + token} : {}),
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || 'Request failed');
            }

            // Read SSE stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // Parse SSE events from buffer
                const lines = buffer.split('\n');
                buffer = lines.pop(); // keep incomplete line in buffer

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    try {
                        const data = JSON.parse(line.slice(6));
                        if (data.error) throw new Error(data.error);
                        if (data.done) break;
                        if (data.text) {
                            fullText += data.text;
                            bodyEl.innerHTML = this._renderMarkdown(fullText);
                        }
                    } catch (parseErr) {
                        // Re-throw SSE error events; ignore JSON parse errors
                        if (parseErr.message && parseErr.message !== 'Request failed'
                            && !parseErr.message.startsWith('Unexpected')) {
                            throw parseErr;
                        }
                    }
                }
            }

            // Final render with complete text
            if (fullText) {
                bodyEl.classList.remove('quiz-explain-body--streaming');
                bodyEl.innerHTML = this._renderMarkdown(fullText);
                container.dataset.loaded = 'true';
                btn.innerHTML = '<i class="fas fa-graduation-cap"></i> Hide Explanation';
                btn.classList.add('quiz-explain-btn--active');
            } else {
                container.innerHTML = '<div class="quiz-explain-error"><i class="fas fa-exclamation-circle"></i> Could not generate explanation. Please try again.</div>';
                if (questionCard) questionCard.classList.remove('quiz-question--has-explain');
            }
        } catch (err) {
            console.error('Explain question error:', err);
            container.innerHTML = '<div class="quiz-explain-error"><i class="fas fa-exclamation-circle"></i> ' +
                (err.message === 'AI subscription required' ? 'AI subscription required to use this feature.' : 'Could not generate explanation. Please try again.') +
                '</div>';
            if (questionCard) questionCard.classList.remove('quiz-question--has-explain');
        }

        btn.disabled = false;
        if (!btn.classList.contains('quiz-explain-btn--active')) {
            btn.innerHTML = '<i class="fas fa-graduation-cap"></i> Explain This Question';
        }
    }

    _renderMarkdown(text) {
        // Lightweight markdown to HTML (bold, italic, headers, lists, line breaks)
        return text
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/^### (.+)$/gm, '<h4>$1</h4>')
            .replace(/^## (.+)$/gm, '<h3>$1</h3>')
            .replace(/^# (.+)$/gm, '<h3>$1</h3>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
            .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
            .replace(/(<li>[\s\S]*?<\/li>(\s*<li>[\s\S]*?<\/li>)*)/g, function(match) {
                return '<ul>' + match.replace(/\n/g, '') + '</ul>';
            })
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^/, '<p>').replace(/$/, '</p>')
            .replace(/<p>\s*(<h[34]>)/g, '$1')
            .replace(/(<\/h[34]>)\s*<\/p>/g, '$1')
            .replace(/<p>\s*(<ul>)/g, '$1')
            .replace(/(<\/ul>)\s*<\/p>/g, '$1')
            .replace(/<p>\s*<\/p>/g, '');
    }

    _cleanupAiPool() {
        if (this.isAIGenerated) {
            sessionStorage.removeItem('aiQuizData');
            sessionStorage.removeItem('aiQuizRound');
        }
    }

    destroy() {
        this._stopTimer();
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
                case 'go-again': this.goAgain(); break;
                case 'new-quiz': this._cleanupAiPool(); window.location.href = '../../dashboard.html'; break;
                case 'back-to-guide': this._cleanupAiPool(); window.location.href = this.backUrl; break;
                case 'back-to-start':
                    this._stopTimer();
                    this._clearSavedState();
                    this.phase = 'start';
                    this._renderStartScreen();
                    break;
                case 'toggle-rationales': {
                    const section = actionBtn.closest('.quiz-feedback-collapsible');
                    if (section) {
                        const isExpanded = section.classList.toggle('quiz-feedback-collapsible--open');
                        actionBtn.setAttribute('aria-expanded', isExpanded);
                    }
                    break;
                }
                case 'toggle-theme': {
                    const current = document.documentElement.getAttribute('data-theme');
                    const next = current === 'dark' ? 'light' : 'dark';
                    document.documentElement.setAttribute('data-theme', next);
                    localStorage.setItem('themeMode', next);
                    const icon = this.container.querySelector('.quiz-theme-toggle i');
                    if (icon) icon.className = 'fas ' + (next === 'dark' ? 'fa-sun' : 'fa-moon');
                    break;
                }
                case 'set-size': {
                    const size = parseInt(actionBtn.dataset.quizSize, 10);
                    if (!isNaN(size)) {
                        this.selectedSessionSize = size;
                        this.container.querySelectorAll('.quiz-size-btn').forEach(b => b.classList.remove('quiz-size-btn--active'));
                        actionBtn.classList.add('quiz-size-btn--active');
                        const timeEl = this.container.querySelector('.quiz-est-time');
                        if (timeEl) timeEl.innerHTML = '<i class="fas fa-clock"></i> ~' + Math.max(5, Math.round(size * 1.5)) + ' min';
                    }
                    break;
                }
                case 'toggle-flag': {
                    const q = this.activeQuestions[this.currentIndex];
                    if (q) {
                        if (this.flaggedQuestions.has(q.id)) {
                            this.flaggedQuestions.delete(q.id);
                        } else {
                            this.flaggedQuestions.add(q.id);
                        }
                        const btn = this.container.querySelector('.quiz-flag-btn');
                        if (btn) btn.classList.toggle('quiz-flag-btn--active', this.flaggedQuestions.has(q.id));
                        const countEl = this.container.querySelector('.quiz-flag-count');
                        if (countEl) {
                            if (this.flaggedQuestions.size > 0) {
                                countEl.innerHTML = '<i class="fas fa-flag"></i> ' + this.flaggedQuestions.size;
                                countEl.style.display = '';
                            } else {
                                countEl.style.display = 'none';
                            }
                        }
                    }
                    break;
                }
                case 'confidence': {
                    const level = actionBtn.dataset.confidence;
                    const q = this.activeQuestions[this.currentIndex];
                    if (q && level && this._pendingFeedback) {
                        this.confidenceRatings.set(q.id, level);
                        const pf = this._pendingFeedback;
                        this._pendingFeedback = null;
                        this._showFullFeedback(pf.q, pf.userAnswer, pf.isCorrect, pf.isPartial);
                        this._saveState();
                    }
                    break;
                }
                case 'review-flagged': {
                    this._reviewedFlags = true;
                    const flaggedQs = this.activeQuestions.filter(q => this.flaggedQuestions.has(q.id) && !this.submitted.has(q.id));
                    if (flaggedQs.length > 0) {
                        // Navigate to first unsubmitted flagged question
                        const firstFlagged = this.activeQuestions.indexOf(flaggedQs[0]);
                        if (firstFlagged !== -1) {
                            this.currentIndex = firstFlagged;
                            this._renderQuestion();
                        }
                    } else {
                        this.showResults();
                    }
                    break;
                }
                case 'skip-to-results': {
                    this._reviewedFlags = true;
                    this.showResults();
                    break;
                }
                case 'resume': {
                    this._loadSavedState();
                    break;
                }
                case 'discard-saved': {
                    this._clearSavedState();
                    this.container.querySelector('.quiz-resume-banner')?.remove();
                    break;
                }
                case 'explain-question': {
                    const qId = actionBtn.dataset.questionId;
                    if (qId) this._explainQuestion(qId, actionBtn);
                    break;
                }
            }
            return;
        }

        // Ordering item click
        const orderItem = e.target.closest('.quiz-ordering-item');
        if (orderItem && !orderItem.classList.contains('quiz-ordering-item--disabled')) {
            const optId = orderItem.dataset.orderingId;
            if (!optId) return;
            const idx = this._orderingSequence.indexOf(optId);
            if (idx !== -1) {
                // Remove from sequence and renumber
                this._orderingSequence.splice(idx, 1);
            } else {
                // Add to sequence
                this._orderingSequence.push(optId);
            }
            this._updateOrderingDisplay();
            this._updateSubmitButton();
            return;
        }

        // Ordering clear button
        if (e.target.closest('[data-quiz-action="clear-ordering"]')) {
            e.preventDefault();
            this._orderingSequence = [];
            this._updateOrderingDisplay();
            this._updateSubmitButton();
            return;
        }

        // Matrix radio click
        const matrixCell = e.target.closest('.quiz-matrix-cell');
        if (matrixCell && !matrixCell.classList.contains('quiz-matrix-cell--disabled')) {
            const radio = matrixCell.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                // Update visual state for this row
                const row = matrixCell.closest('tr');
                if (row) {
                    row.querySelectorAll('.quiz-matrix-cell').forEach(c => c.classList.remove('quiz-matrix-cell--selected'));
                    matrixCell.classList.add('quiz-matrix-cell--selected');
                }
                this._updateSubmitButton();
            }
            return;
        }

        // Option selection
        const option = e.target.closest('.quiz-option');
        if (option && !option.classList.contains('quiz-option--disabled')) {
            const input = option.querySelector('input');
            if (!input) return;

            const currentQ = this.activeQuestions[this.currentIndex];
            if (currentQ && currentQ.type === 'sata') {
                // SATA: toggle checkbox
                input.checked = !input.checked;
                option.classList.toggle('quiz-option--selected', input.checked);
            } else {
                // Single-answer: deselect all, select this one
                this.container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('quiz-option--selected'));
                option.classList.add('quiz-option--selected');
                input.checked = true;
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
        if (e.key === ' ' || e.key === 'Enter') {
            // Option keyboard selection
            const option = e.target.closest('.quiz-option');
            if (option) { e.preventDefault(); option.click(); return; }
            // Ordering keyboard selection
            const orderItem = e.target.closest('.quiz-ordering-item');
            if (orderItem) { e.preventDefault(); orderItem.click(); return; }
            // Matrix keyboard selection
            const matrixCell = e.target.closest('.quiz-matrix-cell');
            if (matrixCell) { e.preventDefault(); matrixCell.click(); return; }
        }

        // Only process shortcuts during quiz phase (not on start/results screens)
        if (this.phase !== 'quiz') return;

        // Don't intercept if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const q = this.activeQuestions[this.currentIndex];
        if (!q) return;
        const key = e.key.toLowerCase();

        // Number keys 1-9: select answer option (only for single-answer, not ordering/matrix)
        if (/^[1-9]$/.test(key) && (q.type === 'single' || q.subtype === 'priority') && !this.submitted.has(q.id)) {
            const options = this.container.querySelectorAll('.quiz-option');
            const idx = parseInt(key, 10) - 1;
            if (idx < options.length) {
                e.preventDefault();
                options[idx].click();
            }
            return;
        }

        // Enter / Space: Submit answer or go to next question
        if (e.key === 'Enter' || e.key === ' ') {
            // If not submitted, try submit
            if (!this.submitted.has(q.id)) {
                const submitBtn = this.container.querySelector('[data-quiz-action="submit"]');
                if (submitBtn && !submitBtn.disabled) {
                    e.preventDefault();
                    submitBtn.click();
                }
                return;
            }
            // If submitted, try next
            const nextBtn = this.container.querySelector('[data-quiz-action="next"]');
            if (nextBtn) {
                e.preventDefault();
                nextBtn.click();
            }
            return;
        }

        // F: Toggle flag
        if (key === 'f') {
            const flagBtn = this.container.querySelector('[data-quiz-action="toggle-flag"]');
            if (flagBtn) {
                e.preventDefault();
                flagBtn.click();
            }
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
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const themeIcon = isDark ? 'fa-sun' : 'fa-moon';
        const hasSaved = this._hasSavedState();
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Session size options
        const sizeOptions = [5, 10, 15, 20];
        const showAll = total > 20;
        const selectedSize = this.selectedSessionSize || total;
        const estTime = Math.max(5, Math.round(selectedSize * 1.5));

        // AI quizzes: ≤10 = use all (no picker), >10 = offer "10" vs "All"
        const hideSessionSize = this.isAIGenerated && total <= 10;
        let sizeButtonsHtml = '';
        if (this.isAIGenerated && total > 10) {
            sizeButtonsHtml = `<button class="quiz-size-btn ${selectedSize === 10 ? 'quiz-size-btn--active' : ''}" data-quiz-action="set-size" data-quiz-size="10">10 Random</button>`;
            sizeButtonsHtml += `<button class="quiz-size-btn ${selectedSize === total ? 'quiz-size-btn--active' : ''}" data-quiz-action="set-size" data-quiz-size="${total}">All (${total})</button>`;
        } else if (!hideSessionSize) {
            const filteredSizes = sizeOptions.filter(s => s <= total);
            sizeButtonsHtml = filteredSizes
                .map(s => `<button class="quiz-size-btn ${s === selectedSize ? 'quiz-size-btn--active' : ''}" data-quiz-action="set-size" data-quiz-size="${s}">${s}</button>`)
                .join('');
            if (showAll || filteredSizes.length === 0) {
                sizeButtonsHtml += `<button class="quiz-size-btn ${selectedSize === total ? 'quiz-size-btn--active' : ''}" data-quiz-action="set-size" data-quiz-size="${total}">All (${total})</button>`;
            }
        }

        // Resume banner
        let resumeHtml = '';
        if (hasSaved) {
            const saved = this._peekSavedState();
            const savedProgress = saved ? `Question ${saved.currentIndex + 1} of ${saved.totalQuestions}` : 'In-progress quiz';
            const savedMode = saved && saved.mode ? this._capitalize(saved.mode) : '';
            resumeHtml = `
                <div class="quiz-resume-banner">
                    <div class="quiz-resume-icon"><i class="fas fa-history"></i></div>
                    <div class="quiz-resume-info">
                        <div class="quiz-resume-title">Resume Your Quiz</div>
                        <div class="quiz-resume-detail">${savedMode} Mode &middot; ${savedProgress}</div>
                    </div>
                    <div class="quiz-resume-actions">
                        <button class="quiz-btn quiz-btn--primary quiz-btn--sm" data-quiz-action="resume"><i class="fas fa-play"></i> Resume</button>
                        <button class="quiz-btn quiz-btn--ghost quiz-btn--sm" data-quiz-action="discard-saved"><i class="fas fa-times"></i> Discard</button>
                    </div>
                </div>
            `;
        }

        this.container.innerHTML = `
            <div class="quiz-top-bar">
                <a href="${this._escapeAttr(this.backUrl)}" class="quiz-back-link">
                    <i class="fas fa-arrow-left"></i> ${this._escapeHtml(this.backLabel)}
                </a>
                <button class="quiz-theme-toggle" data-quiz-action="toggle-theme" aria-label="Toggle dark mode">
                    <i class="fas ${themeIcon}"></i>
                </button>
            </div>
            <div class="quiz-start">
                ${resumeHtml}
                <div class="quiz-start-header">
                    <span class="quiz-start-badge" style="background: ${this._escapeAttr(this.categoryColor)}">${this._escapeHtml(this.category)}</span>
                    <h1 class="quiz-start-title">${this._escapeHtml(this.guideName)} Quiz</h1>
                    <p class="quiz-start-subtitle">NCLEX-Style Practice Questions</p>
                </div>

                <div class="quiz-start-stats">
                    <span class="quiz-stat"><i class="fas fa-question-circle"></i> ${total} Question${total !== 1 ? 's' : ''}</span>
                    <span class="quiz-stat quiz-est-time"><i class="fas fa-clock"></i> ~${estTime} min</span>
                    <span class="quiz-stat"><i class="fas fa-layer-group"></i> ${this._getTypeCount()} Types</span>
                </div>

                ${hideSessionSize ? '' : `<div class="quiz-session-size">
                    <div class="quiz-session-size-label">Questions per session</div>
                    <div class="quiz-size-options">${sizeButtonsHtml}</div>
                </div>`}

                ${this.isAIGenerated ? '' : `<div class="quiz-difficulty-breakdown">
                    <div class="quiz-difficulty-title">Question Complexity</div>
                    <div class="quiz-difficulty-bars">
                        ${this._renderDifficultyRow('Knowledge', difficultyCount.knowledge, total, 'knowledge')}
                        ${this._renderDifficultyRow('Application', difficultyCount.application, total, 'application')}
                        ${this._renderDifficultyRow('Analysis', difficultyCount.analysis, total, 'analysis')}
                    </div>
                </div>`}

                ${(() => {
                    const reaskIds = this._loadConfidenceReaskIds();
                    if (reaskIds.length > 0) {
                        return '<div class="quiz-reask-notice"><i class="fas fa-redo-alt"></i> <strong>' + reaskIds.length + ' question' + (reaskIds.length !== 1 ? 's' : '') + '</strong> will be prioritized from your last session — you marked ' + (reaskIds.length !== 1 ? 'them' : 'it') + ' as unsure.</div>';
                    }
                    return '';
                })()}

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
                            <div class="quiz-mode-desc">Timed &middot; All rationales shown at the end &middot; Counts toward mastery</div>
                        </div>
                    </button>
                </div>

                ${!isTouch ? `
                <div class="quiz-keyboard-hints">
                    <div class="quiz-keyboard-hints-title"><i class="fas fa-keyboard"></i> Keyboard Shortcuts</div>
                    <div class="quiz-keyboard-hints-grid">
                        <span class="quiz-kbd">1</span>–<span class="quiz-kbd">4</span> Select answer
                        <span class="quiz-kbd">Enter</span> / <span class="quiz-kbd">Space</span> Submit / Next
                        <span class="quiz-kbd">F</span> Flag
                    </div>
                </div>
                ` : ''}
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
        // Clean up sticky bar from previous question
        const existingSticky = this.container.querySelector('.quiz-sticky-next');
        if (existingSticky) existingSticky.remove();

        const q = this.activeQuestions[this.currentIndex];
        if (!q) return;

        const total = this.activeQuestions.length;
        const num = this.currentIndex + 1;
        const pct = (num / total) * 100;
        const typeName = this._getTypeName(q);
        const typeClass = this._getTypeClass(q);
        const reviewLabel = this.isReviewMode ? ' (Review)' : '';
        const hasLabs = this.mode === 'practice' && q.labValues && q.labValues.length > 0;
        const labHtml = hasLabs ? this._renderLabReference(q.labValues) : '';
        const isFlagged = this.flaggedQuestions.has(q.id);
        const flagCount = this.flaggedQuestions.size;
        const timerHtml = this._renderTimerDisplay();

        // Reset ordering state for ordering questions
        if (q.type === 'ordering') {
            this._orderingSequence = [];
        }

        // Build type-specific options area
        let optionsHtml = '';
        let submitLabel = 'Submit Answer';
        let instructionHtml = '';

        if (q.type === 'ordering') {
            submitLabel = 'Submit Order';
            instructionHtml = '<span class="quiz-ordering-instruction">Click items in the correct order.</span>';
            optionsHtml = this._renderOrderingOptions(q);
        } else if (q.type === 'matrix') {
            submitLabel = 'Submit Answers';
            instructionHtml = '<span class="quiz-matrix-instruction">Select one answer per row.</span>';
            optionsHtml = this._renderMatrixOptions(q);
        } else if (q.type === 'sata') {
            submitLabel = 'Submit Answer';
            instructionHtml = '<span class="quiz-sata-instruction"><i class="fas fa-check-double"></i> Select all that apply</span>';
            optionsHtml = `<div class="quiz-options" role="group" aria-label="Answer options (select all that apply)">
                ${(this._getShuffledOptions(q.id) || q.options).map((opt, idx) => this._renderOption(q, opt, 'checkbox', idx)).join('')}
            </div>`;
        } else {
            optionsHtml = `<div class="quiz-options" role="radiogroup" aria-label="Answer options">
                ${(this._getShuffledOptions(q.id) || q.options).map((opt, idx) => this._renderOption(q, opt, 'radio', idx)).join('')}
            </div>`;
        }

        this.container.innerHTML = `
            <div class="quiz-top-bar">
                <a href="${this._escapeAttr(this.backUrl)}" class="quiz-back-link">
                    <i class="fas fa-arrow-left"></i> ${this._escapeHtml(this.backLabel)}
                </a>
                <div class="quiz-top-bar-right">
                    ${timerHtml}
                    <button class="quiz-theme-toggle" data-quiz-action="toggle-theme" aria-label="Toggle dark mode">
                        <i class="fas ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                    </button>
                </div>
            </div>
            <div class="quiz-progress">
                <div class="quiz-progress-header">
                    <span class="quiz-progress-text">Question ${num} of ${total}${reviewLabel}</span>
                    <div class="quiz-progress-right">
                        <span class="quiz-flag-count" style="${flagCount > 0 ? '' : 'display:none'}"><i class="fas fa-flag"></i> ${flagCount}</span>
                        <span class="quiz-progress-mode quiz-progress-mode--${this.mode}">${this.mode === 'practice' ? 'Practice' : 'Exam'}</span>
                    </div>
                </div>
                <div class="quiz-progress-track">
                    <div class="quiz-progress-fill" style="width: ${pct}%"></div>
                </div>
            </div>
            <div class="quiz-question ${hasLabs ? 'quiz-question--has-labs' : ''}">
                <div class="quiz-question-main">
                    <div class="quiz-question-header">
                        <span class="quiz-question-badge">${num}</span>
                        <span class="quiz-question-type ${typeClass}">${typeName}</span>
                        <span class="quiz-question-difficulty">${this._capitalize(q.difficulty)}</span>
                        <button class="quiz-flag-btn ${isFlagged ? 'quiz-flag-btn--active' : ''}" data-quiz-action="toggle-flag" aria-label="Flag for review" title="Flag for review (F)">
                            <i class="fas fa-flag"></i>
                        </button>
                    </div>
                    <div class="quiz-question-stem">
                        ${this._escapeHtml(q.stem)}
                        ${instructionHtml}
                    </div>
                    ${hasLabs ? `<div class="quiz-lab-inline">${labHtml}</div>` : ''}
                    ${optionsHtml}
                    <div class="quiz-actions">
                        <button class="quiz-btn quiz-btn--primary" data-quiz-action="submit" disabled>
                            ${submitLabel}
                        </button>
                    </div>
                    <div id="quiz-feedback-area"></div>
                </div>
                ${hasLabs ? `<div class="quiz-lab-side">${labHtml}</div>` : ''}
            </div>
            ${!('ontouchstart' in window || navigator.maxTouchPoints > 0) ? `
            <div class="quiz-shortcut-bar">
                <span class="quiz-kbd">1</span>–<span class="quiz-kbd">4</span> Select
                <span class="quiz-kbd">Enter</span> / <span class="quiz-kbd">Space</span> Submit / Next
                <span class="quiz-kbd">F</span> Flag
            </div>
            ` : ''}
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

    _renderOrderingOptions(q) {
        const shuffled = this._getShuffledOptions(q.id) || q.options;
        let html = '<div class="quiz-ordering-area">';
        html += '<div class="quiz-ordering-items">';
        shuffled.forEach(opt => {
            html += `
                <div class="quiz-ordering-item" data-ordering-id="${this._escapeAttr(opt.id)}" tabindex="0" role="button" aria-label="${this._escapeHtml(opt.text)}">
                    <span class="quiz-ordering-badge"></span>
                    <span class="quiz-ordering-text">${this._escapeHtml(opt.text)}</span>
                </div>
            `;
        });
        html += '</div>';
        html += '<button class="quiz-ordering-clear" data-quiz-action="clear-ordering" type="button"><i class="fas fa-undo"></i> Clear Order</button>';
        html += '</div>';
        return html;
    }

    _renderMatrixOptions(q) {
        const cols = q.matrixColumns || [];
        let html = '<div class="quiz-matrix-wrapper">';
        html += '<table class="quiz-matrix-table">';
        html += '<thead><tr><th class="quiz-matrix-finding-header">Finding</th>';
        cols.forEach(col => {
            html += `<th class="quiz-matrix-col-header">${this._escapeHtml(col)}</th>`;
        });
        html += '</tr></thead><tbody>';
        q.options.forEach(opt => {
            html += `<tr class="quiz-matrix-row" data-matrix-row="${this._escapeAttr(opt.id)}">`;
            html += `<td class="quiz-matrix-finding">${this._escapeHtml(opt.text)}</td>`;
            cols.forEach(col => {
                html += `
                    <td class="quiz-matrix-cell" role="radio" tabindex="0" aria-checked="false">
                        <input type="radio" name="quiz-matrix-${q.id}-${opt.id}" value="${this._escapeAttr(col)}" tabindex="-1">
                        <span class="quiz-matrix-radio-marker"></span>
                    </td>
                `;
            });
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        return html;
    }

    _updateOrderingDisplay() {
        const items = this.container.querySelectorAll('.quiz-ordering-item');
        items.forEach(item => {
            const optId = item.dataset.orderingId;
            const idx = this._orderingSequence.indexOf(optId);
            const badge = item.querySelector('.quiz-ordering-badge');
            if (idx !== -1) {
                item.classList.add('quiz-ordering-item--numbered');
                if (badge) badge.textContent = idx + 1;
            } else {
                item.classList.remove('quiz-ordering-item--numbered');
                if (badge) badge.textContent = '';
            }
        });
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

        if (q.type === 'ordering') {
            // All items must be numbered
            btn.disabled = this._orderingSequence.length !== q.options.length;
        } else if (q.type === 'matrix') {
            // All rows must have a selection
            const totalRows = q.options.length;
            const answered = this.container.querySelectorAll('.quiz-matrix-table input[type="radio"]:checked').length;
            btn.disabled = answered !== totalRows;
        } else if (q.type === 'sata') {
            // At least one checkbox must be checked
            const checkedCount = this.container.querySelectorAll(`input[name="quiz-q-${q.id}"]:checked`).length;
            btn.disabled = checkedCount === 0;
        } else {
            const hasSelection = this._getUserAnswer(q) !== null;
            btn.disabled = !hasSelection;
        }
    }

    _getUserAnswer(q) {
        if (q.type === 'ordering') {
            if (this._orderingSequence.length !== q.options.length) return null;
            return [...this._orderingSequence];
        } else if (q.type === 'matrix') {
            const answer = {};
            let complete = true;
            q.options.forEach(opt => {
                const checked = this.container.querySelector(`input[name="quiz-matrix-${q.id}-${opt.id}"]:checked`);
                if (checked) {
                    answer[opt.id] = checked.value;
                } else {
                    complete = false;
                }
            });
            return complete ? answer : null;
        } else if (q.type === 'sata') {
            const checked = this.container.querySelectorAll(`input[name="quiz-q-${q.id}"]:checked`);
            if (checked.length === 0) return null;
            const answer = [];
            checked.forEach(function (input) { answer.push(input.value); });
            return answer.sort();
        } else {
            const checked = this.container.querySelector(`input[name="quiz-q-${q.id}"]:checked`);
            return checked ? checked.value : null;
        }
    }

    // ── Submit Feedback ─────────────────────────────────────

    _showSubmitFeedback(q, userAnswer, isCorrect, isPartial) {
        // In practice mode with confidence tracking: only disable options, don't reveal correct/incorrect yet
        if (this.mode === 'practice' && !this.confidenceRatings.has(q.id)) {
            this._disableOptions();

            // Hide submit button
            const actions = this.container.querySelector('.quiz-actions');
            if (actions) actions.innerHTML = '';

            // Show confidence prompt (no correct/incorrect status)
            this._pendingFeedback = { q, userAnswer, isCorrect, isPartial };
            const feedbackArea = document.getElementById('quiz-feedback-area');
            if (!feedbackArea) return;
            feedbackArea.innerHTML = this._buildConfidencePrompt();
            const prompt = feedbackArea.firstElementChild;
            if (prompt) { prompt.setAttribute('tabindex', '-1'); prompt.focus({ preventScroll: false }); }
            return;
        }

        // Full option highlighting (correct/incorrect colors)
        this._highlightOptions(q, userAnswer);

        // Hide submit button
        const actions = this.container.querySelector('.quiz-actions');
        if (actions) actions.innerHTML = '';

        const isLast = this.currentIndex >= this.activeQuestions.length - 1;
        const nextBtnLabel = isLast ? '<i class="fas fa-chart-bar"></i> See Results' : 'Next Question <i class="fas fa-arrow-right"></i>';
        const nextBtnClass = isLast ? 'quiz-btn--success' : 'quiz-btn--primary';

        // Show feedback
        const feedbackArea = document.getElementById('quiz-feedback-area');
        if (!feedbackArea) return;

        let feedbackHtml = '';
        if (this.mode === 'practice') {
            feedbackHtml = this._buildPracticeFeedback(q, userAnswer, isCorrect, isPartial);
        } else {
            feedbackHtml = this._buildExamIndicator(isCorrect, isPartial);
        }

        feedbackArea.innerHTML = feedbackHtml;

        // Create explain panel as sibling of .quiz-question-main (for side-by-side layout)
        if (this.mode === 'practice') {
            const questionCard = this.container.querySelector('.quiz-question');
            if (questionCard) {
                const oldPanel = questionCard.querySelector('.quiz-explain-panel');
                if (oldPanel) oldPanel.remove();
                const panel = document.createElement('div');
                panel.className = 'quiz-explain-panel';
                panel.id = 'explain-' + q.id;
                panel.style.display = 'none';
                questionCard.appendChild(panel);
            }
        }

        // Add sticky bottom bar
        const existingSticky = this.container.querySelector('.quiz-sticky-next');
        if (existingSticky) existingSticky.remove();
        const sticky = document.createElement('div');
        sticky.className = 'quiz-sticky-next';
        sticky.innerHTML = `<button class="quiz-btn ${nextBtnClass}" data-quiz-action="next">${nextBtnLabel}</button>`;
        this.container.appendChild(sticky);

        // Focus feedback for accessibility
        const feedback = feedbackArea.firstElementChild;
        if (feedback) {
            feedback.setAttribute('tabindex', '-1');
            feedback.focus({ preventScroll: false });
        }
    }

    _disableOptions() {
        this.container.querySelectorAll('.quiz-option').forEach(opt => { opt.classList.add('quiz-option--disabled'); });
        this.container.querySelectorAll('.quiz-ordering-item').forEach(item => { item.classList.add('quiz-ordering-item--disabled'); });
        this.container.querySelectorAll('.quiz-matrix-cell').forEach(cell => { cell.classList.add('quiz-matrix-cell--disabled'); });
    }

    _highlightOptions(q, userAnswer) {
        if (q.type === 'ordering') {
            this.container.querySelectorAll('.quiz-ordering-item').forEach(item => {
                item.classList.add('quiz-ordering-item--disabled');
                const optId = item.dataset.orderingId;
                const userIdx = Array.isArray(userAnswer) ? userAnswer.indexOf(optId) : -1;
                const correctIdx = Array.isArray(q.correct) ? q.correct.indexOf(optId) : -1;
                if (userIdx !== -1 && userIdx === correctIdx) {
                    item.classList.add('quiz-ordering-item--correct');
                } else if (userIdx !== -1) {
                    item.classList.add('quiz-ordering-item--incorrect');
                }
            });
        } else if (q.type === 'matrix') {
            this.container.querySelectorAll('.quiz-matrix-row').forEach(row => {
                const rowId = row.dataset.matrixRow;
                row.querySelectorAll('.quiz-matrix-cell').forEach(cell => {
                    cell.classList.add('quiz-matrix-cell--disabled');
                });
                const correctVal = q.correct[rowId];
                const userVal = userAnswer ? userAnswer[rowId] : null;
                if (userVal === correctVal) {
                    row.classList.add('quiz-matrix-row--correct');
                } else {
                    row.classList.add('quiz-matrix-row--incorrect');
                    row.querySelectorAll('.quiz-matrix-cell').forEach(cell => {
                        const radio = cell.querySelector('input[type="radio"]');
                        if (radio && radio.value === correctVal) {
                            cell.classList.add('quiz-matrix-cell--correct-answer');
                        }
                    });
                }
            });
        } else if (q.type === 'sata') {
            const correctSet = new Set(Array.isArray(q.correct) ? q.correct : []);
            const userSet = new Set(Array.isArray(userAnswer) ? userAnswer : []);
            this.container.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.add('quiz-option--disabled');
                const input = opt.querySelector('input');
                const val = input ? input.value : '';
                if (correctSet.has(val) && userSet.has(val)) {
                    opt.classList.add('quiz-option--correct');
                } else if (correctSet.has(val) && !userSet.has(val)) {
                    opt.classList.add('quiz-option--correct-missed');
                } else if (!correctSet.has(val) && userSet.has(val)) {
                    opt.classList.add('quiz-option--incorrect');
                }
                opt.classList.remove('quiz-option--selected');
                opt.setAttribute('aria-checked', input && input.checked ? 'true' : 'false');
            });
        } else {
            this.container.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.add('quiz-option--disabled');
                const input = opt.querySelector('input');
                const val = input ? input.value : '';
                if (val === q.correct) {
                    opt.classList.add('quiz-option--correct');
                } else if (val === userAnswer) {
                    opt.classList.add('quiz-option--incorrect');
                }
                opt.classList.remove('quiz-option--selected');
                opt.setAttribute('aria-checked', input && input.checked ? 'true' : 'false');
            });
        }
    }

    _showFullFeedback(q, userAnswer, isCorrect, isPartial) {
        // Now reveal correct/incorrect on the options
        this._highlightOptions(q, userAnswer);

        const feedbackArea = document.getElementById('quiz-feedback-area');
        if (!feedbackArea) return;

        const isLast = this.currentIndex >= this.activeQuestions.length - 1;
        const nextBtnLabel = isLast ? '<i class="fas fa-chart-bar"></i> See Results' : 'Next Question <i class="fas fa-arrow-right"></i>';
        const nextBtnClass = isLast ? 'quiz-btn--success' : 'quiz-btn--primary';

        const feedbackHtml = this._buildPracticeFeedback(q, userAnswer, isCorrect, isPartial);
        feedbackArea.innerHTML = feedbackHtml;

        // Create explain panel as sibling of .quiz-question-main (for side-by-side layout)
        const questionCard = this.container.querySelector('.quiz-question');
        if (questionCard) {
            const oldPanel = questionCard.querySelector('.quiz-explain-panel');
            if (oldPanel) oldPanel.remove();
            const panel = document.createElement('div');
            panel.className = 'quiz-explain-panel';
            panel.id = 'explain-' + q.id;
            panel.style.display = 'none';
            questionCard.appendChild(panel);
        }

        // Add sticky bottom bar
        const existingSticky = this.container.querySelector('.quiz-sticky-next');
        if (existingSticky) existingSticky.remove();
        const sticky = document.createElement('div');
        sticky.className = 'quiz-sticky-next';
        sticky.innerHTML = `<button class="quiz-btn ${nextBtnClass}" data-quiz-action="next">${nextBtnLabel}</button>`;
        this.container.appendChild(sticky);

        const feedback = feedbackArea.firstElementChild;
        if (feedback) { feedback.setAttribute('tabindex', '-1'); feedback.focus({ preventScroll: false }); }
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

        // Ordering: show partial credit count + correct sequence
        if (q.type === 'ordering' && !isCorrect) {
            const correctPositions = Array.isArray(userAnswer) ? userAnswer.filter((v, i) => v === q.correct[i]).length : 0;
            if (correctPositions > 0) {
                html += `<div class="quiz-ordering-partial"><i class="fas fa-info-circle"></i> You placed ${correctPositions} of ${q.correct.length} items in the correct position — partial credit awarded.</div>`;
            }
            const correctSeqHtml = q.correct.map((id, i) => {
                const opt = q.options.find(o => o.id === id);
                return `<li>${this._escapeHtml(opt ? opt.text : id)}</li>`;
            }).join('');
            html += `<div class="quiz-ordering-correct-sequence"><strong>Correct order:</strong><ol>${correctSeqHtml}</ol></div>`;
        }

        // SATA: show selection detail
        if (q.type === 'sata' && !isCorrect) {
            const correctSet = new Set(Array.isArray(q.correct) ? q.correct : []);
            const userArr = Array.isArray(userAnswer) ? userAnswer : [];
            const correctSelected = userArr.filter(v => correctSet.has(v)).length;
            const wrongSelected = userArr.filter(v => !correctSet.has(v)).length;
            let detail = 'You selected ' + correctSelected + ' of ' + q.correct.length + ' correct answer' + (q.correct.length !== 1 ? 's' : '') + '.';
            if (wrongSelected > 0) detail += ' You also selected ' + wrongSelected + ' incorrect option' + (wrongSelected !== 1 ? 's' : '') + '.';
            if (isPartial) detail += ' Partial credit awarded.';
            html += '<div class="quiz-sata-partial"><i class="fas fa-info-circle"></i> ' + detail + '</div>';
        }

        // Matrix: show per-row results
        if (q.type === 'matrix' && !isCorrect) {
            const correctRows = q.options.filter(opt => userAnswer && userAnswer[opt.id] === q.correct[opt.id]).length;
            html += `<div class="quiz-matrix-partial"><i class="fas fa-info-circle"></i> You got ${correctRows} of ${q.options.length} rows correct.</div>`;
        }

        // Correct answer rationale
        if (q.rationale && q.rationale.correct) {
            html += `<div class="quiz-feedback-section">`;
            html += `<div class="quiz-feedback-label">Why ${isCorrect ? 'this is correct' : 'the correct answer is right'}</div>`;
            html += `<div class="quiz-feedback-text">${this._escapeHtml(q.rationale.correct)}</div>`;
            html += `</div>`;
        }

        // Wrong answer rationales (collapsible)
        const wrongRationales = this._getWrongRationales(q, userAnswer);
        if (wrongRationales.length > 0) {
            const collapseLabel = (q.type === 'ordering' || q.type === 'matrix') ? 'Detailed explanations' : 'Why the other options are wrong';
            html += `<div class="quiz-feedback-section quiz-feedback-collapsible">`;
            html += `<button class="quiz-feedback-collapse-toggle" data-quiz-action="toggle-rationales" aria-expanded="false">`;
            html += `<span class="quiz-feedback-label">${collapseLabel}</span>`;
            html += `<i class="fas fa-chevron-down quiz-feedback-collapse-icon"></i>`;
            html += `</button>`;
            html += `<div class="quiz-feedback-collapse-body">`;
            wrongRationales.forEach(r => {
                const letter = this._getDisplayLetter(q.id, r.id);
                html += `<div class="quiz-feedback-rationale-item"><strong>${letter.toUpperCase()}.</strong> ${this._escapeHtml(r.text)}</div>`;
            });
            html += `</div>`;
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

        // Review link (wrong) or engagement link (correct) — suppress for AI quizzes
        if (!isCorrect && q.guideSectionId && !this.isAIGenerated) {
            html += `
                <a href="../${this.guideSlug}.html#${this._escapeAttr(q.guideSectionId)}" class="quiz-feedback-review" target="_blank">
                    <i class="fas fa-book"></i> Review: ${this._escapeHtml(q.guideSection || 'Study Guide')} <i class="fas fa-external-link-alt" style="font-size:0.75rem"></i>
                </a>
            `;
        }

        // Explain This Question button (practice mode only — panel created separately as sibling of .quiz-question-main)
        html += `
            <button class="quiz-explain-btn" data-quiz-action="explain-question" data-question-id="${this._escapeAttr(q.id)}">
                <i class="fas fa-graduation-cap"></i> Explain This Question
            </button>
        `;

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
        // Clean up sticky bar
        const existingSticky = this.container.querySelector('.quiz-sticky-next');
        if (existingSticky) existingSticky.remove();

        const total = this.activeQuestions.length;
        // Count fully correct + partial credit fractions
        let correctCount = 0;
        Array.from(this.results.values()).forEach(r => {
            if (r.correct) correctCount++;
            else if (r.partial && r.partialScore) correctCount += r.partialScore;
        });
        correctCount = Math.round(correctCount * 100) / 100; // clean float
        const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
        const circumference = 2 * Math.PI * 62; // r=62 for 160px ring
        // Ring starts empty — _animateScoreRing() drives fill + color
        const perfMsg = this._getPerformanceMessage(pct);
        const missedCount = total - Math.floor(correctCount); // only fully correct don't count as missed
        const timeStr = this._formatTime(this.totalTimeSeconds);
        const confBreakdown = this._getConfidenceBreakdown();

        const isPerfect = pct === 100;

        let html = `
            <div class="quiz-top-bar">
                <a href="${this._escapeAttr(this.backUrl)}" class="quiz-back-link">
                    <i class="fas fa-arrow-left"></i> ${this._escapeHtml(this.backLabel)}
                </a>
                <button class="quiz-theme-toggle" data-quiz-action="toggle-theme" aria-label="Toggle dark mode">
                    <i class="fas ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                </button>
            </div>
            <div class="quiz-results ${isPerfect ? 'quiz-celebration' : ''}">
                ${isPerfect ? '<canvas class="quiz-confetti-canvas" id="quiz-confetti"></canvas>' : ''}
                <div class="quiz-results-header">
                    <div class="quiz-score-ring-wrap">
                        <div class="quiz-score-ring">
                            <svg viewBox="0 0 140 140">
                                <circle class="quiz-score-ring-bg" cx="70" cy="70" r="62"></circle>
                                <circle class="quiz-score-ring-fill" cx="70" cy="70" r="62"
                                    stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"></circle>
                            </svg>
                            <div class="quiz-score-center">
                                <div class="quiz-score-value">0/${total}</div>
                                <div class="quiz-score-label">correct</div>
                            </div>
                        </div>
                    </div>
                    <div class="quiz-score-percentage">0%</div>
                    <div class="quiz-performance-msg">${this._escapeHtml(perfMsg)}</div>
                    <div class="quiz-results-meta">
                        <span class="quiz-results-meta-item"><i class="fas fa-clock"></i> ${timeStr}</span>
                        <span class="quiz-results-meta-item"><i class="fas fa-${this.mode === 'exam' ? 'clipboard-check' : 'book-open'}"></i> ${this._capitalize(this.mode)} Mode</span>
                    </div>
                </div>
        `;

        // Score history chart & stats
        if (typeof QuizHistory !== 'undefined' && !this.isReviewMode) {
            const chartHtml = QuizHistory.renderScoreChart(this.guideSlug, 10);
            const statsHtml = QuizHistory.renderTopicStats(this.guideSlug);
            if (chartHtml || statsHtml) {
                // Build contextual comparison message
                const topicStats = QuizHistory.getTopicStats(this.guideSlug);
                let trendMsg = '';
                if (topicStats.attempts >= 2) {
                    const prevScore = topicStats.lastScore; // this is from BEFORE current session was recorded
                    // lastScore was updated to current already, so compare with avg
                    const entries = QuizHistory.getTopicHistory(this.guideSlug, 10);
                    if (entries.length >= 2) {
                        const previousScore = entries[entries.length - 2].score;
                        const currentScore = pct;
                        if (currentScore > previousScore) {
                            const diff = currentScore - previousScore;
                            trendMsg = '<div class="quiz-history-trend quiz-history-trend--up"><i class="fas fa-arrow-up"></i> Up ' + diff + '% from last time — nice improvement!</div>';
                        } else if (currentScore === previousScore) {
                            trendMsg = '<div class="quiz-history-trend quiz-history-trend--same"><i class="fas fa-equals"></i> Same score as last time — consistency is key!</div>';
                        } else {
                            const diff = previousScore - currentScore;
                            trendMsg = '<div class="quiz-history-trend quiz-history-trend--down"><i class="fas fa-arrow-down"></i> Down ' + diff + '% from last time — keep reviewing, you\'ve got this!</div>';
                        }
                    }
                }
                html += `
                    <div class="quiz-history-section">
                        <div class="quiz-history-title"><i class="fas fa-chart-line"></i> Your Previous Scores</div>
                        <div class="quiz-history-subtitle">How you've scored on this topic over time</div>
                        ${trendMsg}
                        ${chartHtml}
                        ${statsHtml}
                    </div>
                `;
            }
        }

        // Celebration banner for perfect scores
        if (isPerfect) {
            const celebMsg = this.mode === 'practice'
                ? 'You\'re ready to test yourself under real exam conditions. Try Exam Mode to simulate the NCLEX experience!'
                : 'You aced every question under exam conditions. This topic is locked in!';
            html += `
                <div class="quiz-celebration-banner">
                    <div class="quiz-celebration-icon"><img src="../../assets/images/congratulations.png" alt="Congratulations" class="quiz-celebration-img"></div>
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
                    <button class="quiz-btn quiz-btn--primary" data-quiz-action="new-quiz">
                        <i class="fas fa-arrow-right"></i> More Quizzes
                    </button>
                </div>
            `;
        }

        // Weak areas (suppress for AI quizzes — no guide sections to link to)
        if (missedCount > 0 && !this.isAIGenerated) {
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

        // Confidence breakdown (only if we have ratings)
        if (confBreakdown.total > 0) {
            html += `
                <div class="quiz-confidence-summary">
                    <div class="quiz-confidence-summary-title"><i class="fas fa-brain"></i> Confidence Breakdown</div>
                    <div class="quiz-confidence-bars">
                        <div class="quiz-confidence-bar-row">
                            <span class="quiz-confidence-bar-label">Guessing</span>
                            <div class="quiz-confidence-bar-track"><div class="quiz-confidence-bar-fill quiz-confidence-bar-fill--low" style="width: ${confBreakdown.total > 0 ? (confBreakdown.low / confBreakdown.total) * 100 : 0}%"></div></div>
                            <span class="quiz-confidence-bar-count">${confBreakdown.low}</span>
                        </div>
                        <div class="quiz-confidence-bar-row">
                            <span class="quiz-confidence-bar-label">Somewhat Sure</span>
                            <div class="quiz-confidence-bar-track"><div class="quiz-confidence-bar-fill quiz-confidence-bar-fill--medium" style="width: ${confBreakdown.total > 0 ? (confBreakdown.medium / confBreakdown.total) * 100 : 0}%"></div></div>
                            <span class="quiz-confidence-bar-count">${confBreakdown.medium}</span>
                        </div>
                        <div class="quiz-confidence-bar-row">
                            <span class="quiz-confidence-bar-label">Very Confident</span>
                            <div class="quiz-confidence-bar-track"><div class="quiz-confidence-bar-fill quiz-confidence-bar-fill--high" style="width: ${confBreakdown.total > 0 ? (confBreakdown.high / confBreakdown.total) * 100 : 0}%"></div></div>
                            <span class="quiz-confidence-bar-count">${confBreakdown.high}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Per-question breakdown
        html += `
            <div class="quiz-results-breakdown">
                <div class="quiz-results-breakdown-title">Question Breakdown</div>
                ${this.activeQuestions.map((q, i) => this._renderResultItem(q, i)).join('')}
            </div>
        `;

        // "Go Again" CTA for AI quizzes with fresh question pools
        if (this.isAIGenerated && this.aiPoolInfo && this.aiPoolInfo.hasNextRound) {
            html += `
            <div class="quiz-go-again-cta">
                <button class="quiz-btn quiz-btn--go-again" data-quiz-action="go-again">
                    <i class="fas fa-bolt"></i> Go Again — Fresh Questions
                </button>
                <span class="quiz-go-again-hint">
                    Round ${this.aiPoolInfo.currentRound + 1} of ${this.aiPoolInfo.totalRounds} — new questions from the same material, no waiting
                </span>
            </div>`;
        } else if (this.isAIGenerated && this.aiPoolInfo && !this.aiPoolInfo.hasNextRound && this.aiPoolInfo.totalRounds > 1) {
            html += `
            <div class="quiz-go-again-cta quiz-go-again-cta--done">
                <div class="quiz-go-again-done-msg">
                    <i class="fas fa-check-circle"></i> You've completed all ${this.aiPoolInfo.totalRounds} rounds!
                </div>
                <span class="quiz-go-again-hint">
                    Generate new practice questions from your AI tools to keep studying
                </span>
            </div>`;
        }

        // Action buttons
        html += `<div class="quiz-results-actions">`;
        if (missedCount > 0) {
            html += `<button class="quiz-btn quiz-btn--primary" data-quiz-action="review-missed">
                <i class="fas fa-redo"></i> Review Missed (${missedCount})
            </button>`;
        }
        html += `
                <button class="quiz-btn quiz-btn--secondary" data-quiz-action="retake">
                    <i class="fas fa-sync-alt"></i> Practice Again
                </button>
                <button class="quiz-btn quiz-btn--secondary" data-quiz-action="new-quiz">
                    <i class="fas fa-th-list"></i> New Quiz
                </button>
                <button class="quiz-btn quiz-btn--secondary" data-quiz-action="back-to-guide">
                    <i class="fas ${this.isAIGenerated ? 'fa-robot' : 'fa-book'}"></i> ${this._escapeHtml(this.backLabel)}
                </button>
            </div>
        </div>`;

        this.container.innerHTML = html;

        // Launch confetti for perfect scores
        if (isPerfect) {
            this._launchConfetti();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Animate the score ring after DOM is ready
        requestAnimationFrame(() => this._animateScoreRing(pct, correctCount, total));
    }

    // ── Animated Score Ring ──────────────────────────────────

    /**
     * Animates the SVG score ring from 0% to the target percentage,
     * transitioning through color milestones:
     *   0–69%  → red (#ef4444)
     *   70–79% → orange (#f97316)
     *   80–89% → yellow (#eab308)
     *   90–99% → green (#22c55e)
     *   100%   → gold (#fbbf24) + continuous glow
     */
    _animateScoreRing(targetPct, correctCount, total) {
        const ringEl = this.container.querySelector('.quiz-score-ring-fill');
        const valueEl = this.container.querySelector('.quiz-score-value');
        const pctEl = this.container.querySelector('.quiz-score-percentage');
        const ringWrap = this.container.querySelector('.quiz-score-ring');
        const centerEl = this.container.querySelector('.quiz-score-center');
        if (!ringEl) return;

        const circumference = 2 * Math.PI * 62;
        const duration = 1500; // ms
        const startTime = performance.now();

        // Color milestones — the ring adopts a color once a threshold is reached
        const milestones = [
            { pct: 0,   color: '#ef4444' }, // red
            { pct: 70,  color: '#f97316' }, // orange
            { pct: 80,  color: '#eab308' }, // yellow
            { pct: 90,  color: '#22c55e' }, // green
            { pct: 100, color: '#fbbf24' }  // gold (exact 100 only)
        ];

        function getColorForPct(p) {
            // Walk milestones in reverse to find the highest threshold reached
            for (var i = milestones.length - 1; i >= 0; i--) {
                if (p >= milestones[i].pct) return milestones[i].color;
            }
            return milestones[0].color;
        }

        // Easing: ease-out cubic for a satisfying deceleration
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        const self = this;

        function tick(now) {
            const elapsed = now - startTime;
            const rawProgress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(rawProgress);
            const currentPct = easedProgress * targetPct;

            // Update ring fill
            const offset = circumference - (currentPct / 100) * circumference;
            ringEl.setAttribute('stroke-dashoffset', offset);

            // Update color based on current animated percentage
            const currentColor = getColorForPct(Math.round(currentPct));
            ringEl.setAttribute('stroke', currentColor);

            // Update counter text
            if (valueEl) {
                const animatedCorrect = Math.round((currentPct / 100) * total);
                valueEl.textContent = animatedCorrect + '/' + total;
            }
            if (pctEl) {
                pctEl.textContent = Math.round(currentPct) + '%';
            }

            if (rawProgress < 1) {
                requestAnimationFrame(tick);
            } else {
                // Ensure final values are exact
                const finalOffset = circumference - (targetPct / 100) * circumference;
                ringEl.setAttribute('stroke-dashoffset', finalOffset);
                ringEl.setAttribute('stroke', getColorForPct(targetPct));
                if (valueEl) valueEl.textContent = correctCount + '/' + total;
                if (pctEl) pctEl.textContent = targetPct + '%';

                // Pop animation on the score text
                if (centerEl) centerEl.classList.add('quiz-score-center--pop');

                // Gold glow for perfect scores
                if (targetPct === 100 && ringWrap) {
                    ringWrap.classList.add('quiz-score-ring--gold-glow');
                }
            }
        }

        // Start from empty ring
        ringEl.setAttribute('stroke-dashoffset', circumference);
        requestAnimationFrame(tick);
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
        if (q.type === 'ordering') {
            const ua = Array.isArray(result.userAnswer) ? result.userAnswer : [];
            userAnswerDisplay = ua.map((id, i) => {
                const opt = q.options.find(o => o.id === id);
                return (i + 1) + '. ' + (opt ? opt.text.substring(0, 40) : id);
            }).join(' → ');
            correctAnswerDisplay = q.correct.map((id, i) => {
                const opt = q.options.find(o => o.id === id);
                return (i + 1) + '. ' + (opt ? opt.text.substring(0, 40) : id);
            }).join(' → ');
        } else if (q.type === 'matrix') {
            const ua = result.userAnswer || {};
            const correctRows = q.options.filter(opt => ua[opt.id] === q.correct[opt.id]).length;
            userAnswerDisplay = correctRows + '/' + q.options.length + ' rows correct';
            correctAnswerDisplay = q.options.map(opt => opt.text.substring(0, 25) + ': ' + q.correct[opt.id]).join(', ');
        } else if (q.type === 'sata') {
            const ua = Array.isArray(result.userAnswer) ? result.userAnswer : [];
            userAnswerDisplay = ua.length > 0 ? ua.map(id => this._getDisplayLetter(q.id, id).toUpperCase()).join(', ') : 'None';
            correctAnswerDisplay = Array.isArray(q.correct) ? q.correct.map(id => this._getDisplayLetter(q.id, id).toUpperCase()).join(', ') : '';
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

        // Review link for wrong answers (suppress for AI quizzes)
        if (!isCorrect && q.guideSectionId && !this.isAIGenerated) {
            detailHtml += `
                <a href="../${this.guideSlug}.html#${this._escapeAttr(q.guideSectionId)}" class="quiz-result-review-link" target="_blank">
                    <i class="fas fa-book"></i> Review: ${this._escapeHtml(q.guideSection || 'Study Guide')}
                </a>
            `;
        }

        detailHtml += `</div>`;

        // Confidence icon for this question
        const conf = this.confidenceRatings.get(q.id);
        const confIconMap = { low: 'fa-dice', medium: 'fa-balance-scale', high: 'fa-bullseye' };
        const confLabelMap = { low: 'Guessing', medium: 'Somewhat Sure', high: 'Very Confident' };
        const confHtml = conf ? `<span class="quiz-result-confidence quiz-result-confidence--${conf}" title="${confLabelMap[conf] || ''}"><i class="fas ${confIconMap[conf] || 'fa-question'}"></i></span>` : '';

        // Flagged icon
        const wasFlagged = this.flaggedQuestions.has(q.id);
        const flagHtml = wasFlagged ? '<span class="quiz-result-flag" title="Flagged for review"><i class="fas fa-flag"></i></span>' : '';

        return `
            <div class="quiz-result-item">
                <button class="quiz-result-summary" aria-expanded="false">
                    <span class="quiz-result-icon ${iconClass}"><i class="fas ${icon}"></i></span>
                    <span class="quiz-result-stem">${this._escapeHtml(truncatedStem)}</span>
                    ${confHtml}${flagHtml}
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
        if (q.type === 'ordering') {
            if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return false;
            return userAnswer.length === q.correct.length &&
                   userAnswer.every((v, i) => v === q.correct[i]);
        }
        if (q.type === 'matrix') {
            if (!userAnswer || typeof userAnswer !== 'object' || !q.correct) return false;
            return q.options.every(opt => userAnswer[opt.id] === q.correct[opt.id]);
        }
        if (q.type === 'sata') {
            if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return false;
            if (userAnswer.length !== q.correct.length) return false;
            const sortedUser = [...userAnswer].sort();
            const sortedCorrect = [...q.correct].sort();
            return sortedUser.every((v, i) => v === sortedCorrect[i]);
        }
        return userAnswer === q.correct;
    }

    _hasMatrixPartialCredit(q, userAnswer) {
        if (!userAnswer || typeof userAnswer !== 'object' || !q.correct) return false;
        const correctCount = q.options.filter(opt => userAnswer[opt.id] === q.correct[opt.id]).length;
        return correctCount > 0 && correctCount < q.options.length;
    }

    _hasOrderingPartialCredit(q, userAnswer) {
        if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return false;
        if (userAnswer.length !== q.correct.length) return false;
        const correctPositions = userAnswer.filter((v, i) => v === q.correct[i]).length;
        return correctPositions > 0 && correctPositions < q.correct.length;
    }

    _getOrderingPartialScore(q, userAnswer) {
        if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return 0;
        const correctPositions = userAnswer.filter((v, i) => v === q.correct[i]).length;
        return correctPositions / q.correct.length;
    }

    _hasSATAPartialCredit(q, userAnswer) {
        if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return false;
        const correctSet = new Set(q.correct);
        const correctSelected = userAnswer.filter(v => correctSet.has(v)).length;
        return correctSelected > 0 && (correctSelected < q.correct.length || userAnswer.length > q.correct.length);
    }

    _getSATAPartialScore(q, userAnswer) {
        if (!Array.isArray(userAnswer) || !Array.isArray(q.correct)) return 0;
        const correctSet = new Set(q.correct);
        const correctSelected = userAnswer.filter(v => correctSet.has(v)).length;
        const wrongSelected = userAnswer.filter(v => !correctSet.has(v)).length;
        const score = Math.max(0, correctSelected - wrongSelected) / q.correct.length;
        return Math.round(score * 100) / 100;
    }

    _getWrongRationales(q, userAnswer) {
        if (!q.rationale) return [];
        const rationales = [];

        q.options.forEach(opt => {
            const key = opt.id;
            if (key === 'correct') return;

            if (q.type === 'ordering' || q.type === 'matrix' || q.type === 'sata') {
                // For ordering/matrix/sata, show all option rationales
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
        if (this.isAIGenerated) {
            if (pct >= 70) return 'Good work! Review the rationales below to strengthen your understanding.';
            return 'Keep studying! Review the rationales below, then generate a new set to try again.';
        }
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
            if (q.type === 'ordering') types.add('ordering');
            else if (q.type === 'matrix') types.add('matrix');
            else if (q.type === 'sata') types.add('sata');
            else if (q.subtype === 'priority') types.add('priority');
            else types.add(q.type);
        });
        return types.size;
    }

    _getTypeName(q) {
        if (q.type === 'ordering') return 'Ordering';
        if (q.type === 'matrix') return 'Matrix';
        if (q.type === 'sata') return 'Select All That Apply';
        if (q.subtype === 'priority') return 'Priority';
        return 'Single Best Answer';
    }

    _getTypeClass(q) {
        if (q.type === 'ordering') return 'quiz-question-type--ordering';
        if (q.type === 'matrix') return 'quiz-question-type--matrix';
        if (q.type === 'sata') return 'quiz-question-type--sata';
        if (q.subtype === 'priority') return 'quiz-question-type--priority';
        return 'quiz-question-type--single';
    }

    // ── Timer ────────────────────────────────────────────────

    _startTimer() {
        this._stopTimer();
        this._timerInterval = setInterval(() => {
            this.sessionElapsed = Math.round((Date.now() - this.sessionStartTime) / 1000);

            if (this.timerMode === 'countdown') {
                const remaining = Math.max(0, this.countdownSeconds - this.sessionElapsed);
                this._updateTimerDisplay(remaining);

                // Flash warning at 60 seconds
                const timerEl = this.container.querySelector('.quiz-timer');
                if (timerEl) {
                    timerEl.classList.toggle('quiz-timer--warning', remaining <= 60 && remaining > 0);
                    timerEl.classList.toggle('quiz-timer--danger', remaining <= 10 && remaining > 0);
                }

                // Auto-submit at 0
                if (remaining <= 0) {
                    this._stopTimer();
                    this._autoSubmitRemaining();
                }
            } else {
                this._updateTimerDisplay(this.sessionElapsed);
            }
        }, 1000);
    }

    _stopTimer() {
        if (this._timerInterval) {
            clearInterval(this._timerInterval);
            this._timerInterval = null;
        }
    }

    _updateTimerDisplay(seconds) {
        const timerEl = this.container.querySelector('.quiz-timer-value');
        if (timerEl) {
            timerEl.textContent = this._formatTime(seconds);
        }
    }

    _renderTimerDisplay() {
        if (this.timerMode === 'countdown') {
            const remaining = Math.max(0, this.countdownSeconds - this.sessionElapsed);
            return `<div class="quiz-timer quiz-timer--countdown${remaining <= 60 ? ' quiz-timer--warning' : ''}">
                <i class="fas fa-hourglass-half"></i>
                <span class="quiz-timer-value">${this._formatTime(remaining)}</span>
            </div>`;
        }
        // No timer in practice mode
        if (this.timerMode === 'none') return '';
        return `<div class="quiz-timer">
            <i class="fas fa-clock"></i>
            <span class="quiz-timer-value">${this._formatTime(this.sessionElapsed)}</span>
        </div>`;
    }

    _formatTime(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    _autoSubmitRemaining() {
        // Auto-submit all unanswered questions as incorrect, then show results
        this.activeQuestions.forEach(q => {
            if (!this.submitted.has(q.id)) {
                this.submitted.add(q.id);
                this.results.set(q.id, {
                    correct: false,
                    partial: false,
                    userAnswer: null,
                    correctAnswer: q.correct
                });
            }
        });
        this.showResults();
    }

    // ── Confidence Prompt ────────────────────────────────────

    _buildConfidencePrompt() {
        return `
            <div class="quiz-confidence-prompt">
                <div class="quiz-confidence-question">How confident were you?</div>
                <div class="quiz-confidence-options">
                    <button class="quiz-confidence-btn quiz-confidence-btn--low" data-quiz-action="confidence" data-confidence="low">
                        <i class="fas fa-dice"></i>
                        <span>Guessing</span>
                    </button>
                    <button class="quiz-confidence-btn quiz-confidence-btn--medium" data-quiz-action="confidence" data-confidence="medium">
                        <i class="fas fa-balance-scale"></i>
                        <span>Somewhat Sure</span>
                    </button>
                    <button class="quiz-confidence-btn quiz-confidence-btn--high" data-quiz-action="confidence" data-confidence="high">
                        <i class="fas fa-bullseye"></i>
                        <span>Very Confident</span>
                    </button>
                </div>
            </div>
        `;
    }

    _getConfidenceBreakdown() {
        const breakdown = { low: 0, medium: 0, high: 0, total: 0 };
        this.confidenceRatings.forEach(level => {
            if (breakdown.hasOwnProperty(level)) breakdown[level]++;
            breakdown.total++;
        });
        return breakdown;
    }

    // ── Flag Review Prompt ───────────────────────────────────

    _showFlagReviewPrompt() {
        const unansweredFlags = this.activeQuestions.filter(q => this.flaggedQuestions.has(q.id) && !this.submitted.has(q.id));
        const answeredFlags = this.activeQuestions.filter(q => this.flaggedQuestions.has(q.id) && this.submitted.has(q.id));
        const totalFlagged = this.flaggedQuestions.size;
        const unansweredCount = unansweredFlags.length;

        const feedbackArea = document.getElementById('quiz-feedback-area');
        if (!feedbackArea) return;

        // Clean up existing sticky
        const existingSticky = this.container.querySelector('.quiz-sticky-next');
        if (existingSticky) existingSticky.remove();

        feedbackArea.innerHTML = `
            <div class="quiz-flag-review-prompt">
                <div class="quiz-flag-review-icon"><i class="fas fa-flag"></i></div>
                <div class="quiz-flag-review-title">You flagged ${totalFlagged} question${totalFlagged !== 1 ? 's' : ''} for review</div>
                ${unansweredCount > 0 ? `<div class="quiz-flag-review-detail">${unansweredCount} still unanswered</div>` : '<div class="quiz-flag-review-detail">All flagged questions have been answered</div>'}
                <div class="quiz-flag-review-actions">
                    ${unansweredCount > 0 ? `<button class="quiz-btn quiz-btn--primary" data-quiz-action="review-flagged"><i class="fas fa-flag"></i> Review Flagged (${unansweredCount})</button>` : ''}
                    <button class="quiz-btn quiz-btn--${unansweredCount > 0 ? 'secondary' : 'primary'}" data-quiz-action="skip-to-results"><i class="fas fa-chart-bar"></i> See Results</button>
                </div>
            </div>
        `;

        const prompt = feedbackArea.firstElementChild;
        if (prompt) { prompt.setAttribute('tabindex', '-1'); prompt.focus({ preventScroll: false }); }
    }

    // ── Resume / Save State ──────────────────────────────────

    _saveState() {
        if (this.phase !== 'quiz' || this.isAIGenerated) return;
        try {
            const state = {
                mode: this.mode,
                currentIndex: this.currentIndex,
                totalQuestions: this.activeQuestions.length,
                answers: Array.from(this.answers.entries()),
                results: Array.from(this.results.entries()),
                submitted: Array.from(this.submitted),
                flaggedQuestions: Array.from(this.flaggedQuestions),
                confidenceRatings: Array.from(this.confidenceRatings.entries()),
                activeQuestionIds: this.activeQuestions.map(q => q.id),
                shuffledOptions: Array.from(this._shuffledOptions.entries()),
                isReviewMode: this.isReviewMode,
                sessionStartTime: this.sessionStartTime,
                timerMode: this.timerMode,
                countdownSeconds: this.countdownSeconds,
                selectedSessionSize: this.selectedSessionSize,
                savedAt: Date.now()
            };
            localStorage.setItem(this._saveKey, JSON.stringify(state));
        } catch (e) {
            // localStorage full or disabled — silently fail
        }
    }

    _loadSavedState() {
        try {
            const raw = localStorage.getItem(this._saveKey);
            if (!raw) return;
            const state = JSON.parse(raw);

            // Check expiry (24 hours)
            if (Date.now() - state.savedAt > 86400000) {
                this._clearSavedState();
                return;
            }

            // Rebuild active questions from saved IDs
            const idSet = new Set(state.activeQuestionIds);
            const orderedQuestions = state.activeQuestionIds.map(id => this.questions.find(q => q.id === id)).filter(Boolean);
            if (orderedQuestions.length === 0) { this._clearSavedState(); return; }

            this.mode = state.mode;
            this.phase = 'quiz';
            this.activeQuestions = orderedQuestions;
            this.currentIndex = state.currentIndex || 0;
            this.answers = new Map(state.answers || []);
            this.results = new Map(state.results || []);
            this.submitted = new Set(state.submitted || []);
            this.flaggedQuestions = new Set(state.flaggedQuestions || []);
            this.confidenceRatings = new Map(state.confidenceRatings || []);
            this._shuffledOptions = new Map(state.shuffledOptions || []);
            this.isReviewMode = state.isReviewMode || false;
            this.selectedSessionSize = state.selectedSessionSize || this.questions.length;

            // Restore timer (adjust for time passed since save)
            this.sessionStartTime = state.sessionStartTime;
            this.timerMode = state.timerMode || 'none';
            this.countdownSeconds = state.countdownSeconds || 0;
            this.sessionElapsed = Math.round((Date.now() - this.sessionStartTime) / 1000);
            if (this.timerMode !== 'none') this._startTimer();

            this._reviewedFlags = false;
            this._pendingFeedback = null;

            window.addEventListener('beforeunload', this._boundBeforeUnload);
            this._renderQuestion();
        } catch (e) {
            this._clearSavedState();
        }
    }

    _clearSavedState() {
        try { localStorage.removeItem(this._saveKey); } catch (e) { /* ignore */ }
    }

    _hasSavedState() {
        try {
            const raw = localStorage.getItem(this._saveKey);
            if (!raw) return false;
            const state = JSON.parse(raw);
            // Check expiry
            if (Date.now() - state.savedAt > 86400000) {
                this._clearSavedState();
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    _peekSavedState() {
        try {
            const raw = localStorage.getItem(this._saveKey);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
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
            if (q.type === 'matrix') {
                // Don't shuffle matrix rows — clinical context matters for row order
                // Still build letterMap for compatibility
                const letterMap = {};
                q.options.forEach((opt, i) => {
                    letterMap[opt.id] = letters[i];
                });
                this._shuffledOptions.set(q.id, { options: [...q.options], letterMap: letterMap });
                return;
            }
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

    // ── Confidence Re-Ask Tracker ─────────────────────────────

    /**
     * Save questions rated "guessing" or "somewhat sure" to localStorage
     * so they are re-asked in future quiz sessions on the same topic.
     * Questions rated "very confident" are removed from the tracker.
     */
    _saveConfidenceTracker() {
        if (this.isReviewMode || this.isAIGenerated) return;
        const key = 'nursingCollective_confidenceReask';
        let tracker = {};
        try {
            tracker = JSON.parse(localStorage.getItem(key) || '{}');
        } catch (e) { tracker = {}; }

        if (!tracker[this.guideSlug]) {
            tracker[this.guideSlug] = {};
        }
        const topicTracker = tracker[this.guideSlug];

        this.confidenceRatings.forEach((level, questionId) => {
            if (level === 'low' || level === 'medium') {
                // Add/keep in re-ask pool
                topicTracker[questionId] = level;
            } else if (level === 'high') {
                // Confident — remove from re-ask pool
                delete topicTracker[questionId];
            }
        });

        // Clean up empty topic entries
        if (Object.keys(topicTracker).length === 0) {
            delete tracker[this.guideSlug];
        } else {
            tracker[this.guideSlug] = topicTracker;
        }

        try {
            localStorage.setItem(key, JSON.stringify(tracker));
        } catch (e) { /* storage full — ignore */ }
    }

    /**
     * Load questions that need re-asking for this topic.
     * Returns array of question IDs that should be prioritized.
     */
    _loadConfidenceReaskIds() {
        const key = 'nursingCollective_confidenceReask';
        try {
            const tracker = JSON.parse(localStorage.getItem(key) || '{}');
            const topicData = tracker[this.guideSlug];
            if (!topicData) return [];
            return Object.keys(topicData);
        } catch (e) {
            return [];
        }
    }

    /**
     * Select questions for a new quiz, prioritizing confidence re-ask questions.
     * Re-ask questions go first, then random questions fill the remaining slots.
     */
    _selectQuestionsWithReask(size) {
        const reaskIds = new Set(this._loadConfidenceReaskIds());
        const allQuestions = [...this.questions];

        // Split into re-ask questions and normal pool
        const reaskQuestions = [];
        const normalPool = [];
        allQuestions.forEach(q => {
            if (reaskIds.has(q.id)) {
                reaskQuestions.push(q);
            } else {
                normalPool.push(q);
            }
        });

        // Shuffle both pools
        const shuffledReask = this._shuffleArray(reaskQuestions);
        const shuffledNormal = this._shuffleArray(normalPool);

        // Take re-ask questions first (up to session size), then fill with normal
        const selected = [];
        for (let i = 0; i < shuffledReask.length && selected.length < size; i++) {
            selected.push(shuffledReask[i]);
        }
        for (let i = 0; i < shuffledNormal.length && selected.length < size; i++) {
            selected.push(shuffledNormal[i]);
        }

        return selected;
    }
}
