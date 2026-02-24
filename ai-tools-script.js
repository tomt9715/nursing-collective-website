/**
 * AI Study Tools — Upload + AI Study Toolkit
 * Handles file upload, document management, and AI content generation
 * (summaries, practice questions, drug cards, and more).
 * Relies on api-service.js for API_URL and apiCall().
 */
(function () {
    'use strict';

    // ── Generation type registry ─────────────────────────────────
    var GENERATION_TYPES = {
        summary: {
            key: 'summary',
            label: 'NCLEX Summary',
            shortLabel: 'Summary',
            icon: 'fa-file-lines',
            color: '#7c3aed',
            bgColor: 'rgba(124,58,237,.08)',
            panelTitle: 'NCLEX Review Sheet'
        },
        practice_questions: {
            key: 'practice_questions',
            label: 'Practice Questions',
            shortLabel: 'Practice Qs',
            icon: 'fa-clipboard-question',
            color: '#3b82f6',
            bgColor: 'rgba(59,130,246,.08)',
            panelTitle: 'Practice Questions'
        },
        drug_cards: {
            key: 'drug_cards',
            label: 'Drug Cards',
            shortLabel: 'Drug Cards',
            icon: 'fa-pills',
            color: '#10b981',
            bgColor: 'rgba(16,185,129,.08)',
            panelTitle: 'Drug Reference Cards'
        },
        key_labs: {
            key: 'key_labs',
            label: 'Key Labs',
            shortLabel: 'Key Labs',
            icon: 'fa-vial',
            color: '#f59e0b',
            bgColor: 'rgba(245,158,11,.08)',
            panelTitle: 'Lab Values Reference'
        },
        compare_contrast: {
            key: 'compare_contrast',
            label: 'Compare & Contrast',
            shortLabel: 'Compare',
            icon: 'fa-code-compare',
            color: '#ec4899',
            bgColor: 'rgba(236,72,153,.08)',
            panelTitle: 'Compare & Contrast'
        },
        care_plan: {
            key: 'care_plan',
            label: 'Care Plan',
            shortLabel: 'Care Plan',
            icon: 'fa-clipboard-list',
            color: '#06b6d4',
            bgColor: 'rgba(6,182,212,.08)',
            panelTitle: 'Care Plan Outline'
        }
    };

    var TYPE_KEYS = Object.keys(GENERATION_TYPES);

    // ── DOM elements ────────────────────────────────────────────
    var aiSection = document.getElementById('ai-tools-section');
    var upgradePrompt = document.getElementById('ai-upgrade-prompt');
    var dropzone = document.getElementById('ai-upload-dropzone');
    var fileInput = document.getElementById('ai-file-input');
    var progressContainer = document.getElementById('ai-upload-progress');
    var progressFilename = document.getElementById('ai-progress-filename');
    var progressPct = document.getElementById('ai-progress-pct');
    var progressFill = document.getElementById('ai-progress-fill');
    var documentsList = document.getElementById('ai-documents-list');
    var emptyState = document.getElementById('ai-empty-state');
    var refreshBtn = document.getElementById('ai-refresh-btn');

    // Text input elements
    var inputToggle = document.getElementById('ai-input-toggle');
    var textInputArea = document.getElementById('ai-text-input');
    var textTitleInput = document.getElementById('ai-text-title');
    var textAreaInput = document.getElementById('ai-text-area');
    var textCharCount = document.getElementById('ai-text-char-count');
    var textSubmitBtn = document.getElementById('ai-text-submit');

    // Panel elements
    var panelEl = document.getElementById('ai-summary-panel');
    var backdropEl = document.getElementById('ai-summary-backdrop');
    var panelDocName = document.getElementById('ai-summary-doc-name');
    var panelContent = document.getElementById('ai-summary-content');
    var panelBody = document.getElementById('ai-summary-body');
    var panelBackBtn = document.getElementById('ai-summary-back');
    var panelCopyBtn = document.getElementById('ai-summary-copy');
    var panelPrintBtn = document.getElementById('ai-summary-print');
    var panelRegenerateBtn = document.getElementById('ai-summary-regenerate');
    var panelQuizBtn = document.getElementById('ai-summary-quiz');
    var panelQuizBar = document.getElementById('ai-panel-quiz-bar');

    // Credit bar elements
    var creditBar = document.getElementById('ai-credit-bar');
    var creditUploadsCount = document.getElementById('ai-credit-uploads-count');
    var creditQuestionsCount = document.getElementById('ai-credit-questions-count');
    var creditUploadsItem = document.getElementById('ai-credit-uploads');
    var creditQuestionsItem = document.getElementById('ai-credit-questions');
    var creditResetEl = document.getElementById('ai-credit-reset');

    // ── State ───────────────────────────────────────────────────
    var documents = [];
    var pollingTimers = {};
    var hasAiAccess = false;
    var isAdmin = false;
    var currentDocId = null;
    var currentFilename = null;
    var currentMarkdown = null;
    var currentGenerationType = null;
    var currentContentTitle = null; // AI-inferred topic title (from H1)

    // ── Initialization ──────────────────────────────────────────

    function init() {
        var token = localStorage.getItem('accessToken');
        if (token) {
            // Token exists — check access immediately, no delay
            checkAiAccess();
        } else {
            // No token yet — another script may still be refreshing it.
            // Listen for the storage event (token written by another tab/script)
            // and also poll briefly in case refresh happens in this tab.
            var resolved = false;
            function tryOnce() {
                if (resolved) return;
                var t = localStorage.getItem('accessToken');
                if (t) { resolved = true; checkAiAccess(); }
            }
            window.addEventListener('storage', function onStorage(e) {
                if (e.key === 'accessToken' && e.newValue) {
                    window.removeEventListener('storage', onStorage);
                    tryOnce();
                }
            });
            // Quick polls at 100ms, 400ms, 900ms — then give up
            setTimeout(tryOnce, 100);
            setTimeout(tryOnce, 400);
            setTimeout(function () {
                if (!resolved) { resolved = true; showUpgradePrompt(); }
            }, 900);
        }
    }

    async function checkAiAccess() {
        try {
            // Fire subscription + profile checks in parallel
            var subPromise = apiCall('/api/subscription-status').catch(function () { return null; });
            var profilePromise = apiCall('/user/profile').catch(function () { return null; });
            var results = await Promise.all([subPromise, profilePromise]);

            var data = results[0];
            var profileData = results[1];

            if (data && data.has_access && data.subscription) {
                var planId = data.subscription.plan_id || '';
                if (planId.startsWith('ai-') || data.subscription.is_ai_plan) {
                    hasAiAccess = true;
                }
            }

            if (!hasAiAccess && profileData && profileData.user && profileData.user.is_admin) {
                hasAiAccess = true;
                isAdmin = true;
            }

            if (hasAiAccess) {
                showAiTools();
                loadDocuments();
                if (!isAdmin) fetchCredits();
            } else {
                showUpgradePrompt();
            }
        } catch (err) {
            console.warn('[AI Tools] Access check failed:', err);
            showUpgradePrompt();
        }
    }

    function showAiTools() {
        if (aiSection) aiSection.style.display = '';
        if (upgradePrompt) upgradePrompt.classList.add('hidden');
        setupEventListeners();
    }

    function showUpgradePrompt() {
        if (aiSection) aiSection.style.display = 'none';
        if (upgradePrompt) upgradePrompt.classList.remove('hidden');
    }

    // ── Credit tracking ────────────────────────────────────────

    async function fetchCredits() {
        try {
            var data = await apiCall('/api/ai/credits');
            if (data) renderCredits(data);
        } catch (err) {
            console.warn('[AI Tools] Failed to fetch credits:', err);
        }
    }

    function renderCredits(credits) {
        if (!creditBar || credits.is_admin) return;

        var uRemain = credits.uploads_remaining;
        var uLimit = credits.uploads_limit + credits.addon_uploads;
        var qRemain = credits.questions_remaining;
        var qLimit = credits.questions_limit + credits.addon_questions;

        // Show the bar
        creditBar.classList.remove('hidden');

        // Update counts
        if (creditUploadsCount) creditUploadsCount.textContent = uRemain;
        if (creditQuestionsCount) creditQuestionsCount.textContent = qRemain;

        // Warning / exhausted classes for uploads
        if (creditUploadsItem) {
            creditUploadsItem.classList.remove('credit-warning', 'credit-exhausted');
            if (uRemain === 0) {
                creditUploadsItem.classList.add('credit-exhausted');
            } else if (uLimit > 0 && uRemain / uLimit <= 0.2) {
                creditUploadsItem.classList.add('credit-warning');
            }
        }

        // Warning / exhausted classes for questions
        if (creditQuestionsItem) {
            creditQuestionsItem.classList.remove('credit-warning', 'credit-exhausted');
            if (qRemain === 0) {
                creditQuestionsItem.classList.add('credit-exhausted');
            } else if (qLimit > 0 && qRemain / qLimit <= 0.2) {
                creditQuestionsItem.classList.add('credit-warning');
            }
        }

        // Reset timer
        if (creditResetEl && credits.next_reset) {
            var resetDate = new Date(credits.next_reset);
            var now = new Date();
            var daysLeft = Math.max(0, Math.ceil((resetDate - now) / (1000 * 60 * 60 * 24)));
            creditResetEl.textContent = 'Resets in ' + daysLeft + 'd';
        } else if (creditResetEl) {
            creditResetEl.textContent = '';
        }
    }

    function isCreditError(msg) {
        return msg && (msg.indexOf('credit limit') !== -1 || msg.indexOf('credit') !== -1 && msg.indexOf('reached') !== -1);
    }

    function showCreditExhaustedToast(type) {
        var label = type === 'upload' ? 'upload' : 'question';
        showToast(
            'You\u2019ve used all your ' + label + ' credits for this period. ' +
            '<a href="/pricing.html?addon=credits" style="color:#fff;text-decoration:underline;font-weight:700">Buy more credits</a>',
            'error'
        );
    }

    // ── Event listeners ─────────────────────────────────────────

    function setupEventListeners() {
        // Upload dropzone
        if (dropzone) {
            dropzone.addEventListener('click', function () { fileInput.click(); });
        }
        if (fileInput) {
            fileInput.addEventListener('change', function () {
                if (fileInput.files.length > 0) {
                    uploadFile(fileInput.files[0]);
                    fileInput.value = '';
                }
            });
        }
        // Drag and drop
        if (dropzone) {
            dropzone.addEventListener('dragover', function (e) {
                e.preventDefault();
                dropzone.classList.add('drag-over');
            });
            dropzone.addEventListener('dragleave', function () {
                dropzone.classList.remove('drag-over');
            });
            dropzone.addEventListener('drop', function (e) {
                e.preventDefault();
                dropzone.classList.remove('drag-over');
                if (e.dataTransfer.files.length > 0) {
                    uploadFile(e.dataTransfer.files[0]);
                }
            });
        }

        // Input mode toggle (File vs Paste Text)
        if (inputToggle) {
            var tabs = inputToggle.querySelectorAll('.ai-input-tab');
            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    var mode = this.dataset.inputMode;
                    tabs.forEach(function (t) { t.classList.remove('active'); });
                    this.classList.add('active');
                    if (mode === 'text') {
                        if (dropzone) dropzone.classList.add('hidden');
                        if (textInputArea) textInputArea.classList.remove('hidden');
                    } else {
                        if (dropzone) dropzone.classList.remove('hidden');
                        if (textInputArea) textInputArea.classList.add('hidden');
                    }
                });
            });
        }

        // Text area character counter
        if (textAreaInput && textCharCount) {
            textAreaInput.addEventListener('input', function () {
                var len = textAreaInput.value.length;
                textCharCount.textContent = len.toLocaleString() + ' / 50,000 characters';
                textCharCount.style.color = len > 50000 ? '#ef4444' : '';
            });
        }

        // Text submit button
        if (textSubmitBtn) {
            textSubmitBtn.addEventListener('click', function () { uploadText(); });
        }

        // Refresh
        if (refreshBtn) {
            refreshBtn.addEventListener('click', loadDocuments);
        }

        // Panel close
        if (panelBackBtn) panelBackBtn.addEventListener('click', closePanel);
        if (backdropEl) backdropEl.addEventListener('click', closePanel);

        // Panel actions
        if (panelCopyBtn) panelCopyBtn.addEventListener('click', copyToClipboard);
        if (panelPrintBtn) panelPrintBtn.addEventListener('click', printPanel);
        if (panelRegenerateBtn) panelRegenerateBtn.addEventListener('click', regenerateGeneration);
        if (panelQuizBtn) panelQuizBtn.addEventListener('click', takeAsQuiz);

        // TOC link clicks → smooth scroll within panel
        if (panelBody) {
            panelBody.addEventListener('click', function (e) {
                var link = e.target.closest('.ai-toc-link');
                if (!link) return;
                e.preventDefault();
                var targetId = link.getAttribute('href').substring(1);
                var target = document.getElementById(targetId);
                if (target && panelBody) {
                    panelBody.scrollTo({
                        top: panelBody.scrollTop + target.getBoundingClientRect().top - panelBody.getBoundingClientRect().top - 12,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panelEl && panelEl.classList.contains('open')) {
                closePanel();
            }
        });
    }

    // ── File upload ─────────────────────────────────────────────

    async function uploadFile(file) {
        var allowed = ['application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        var ext = (file.name.split('.').pop() || '').toLowerCase();
        var allowedExts = ['pdf', 'docx', 'pptx'];

        if (allowed.indexOf(file.type) === -1 && allowedExts.indexOf(ext) === -1) {
            showToast('Unsupported file type. Please upload PDF, DOCX, or PPTX.', 'error');
            return;
        }

        if (file.size > 25 * 1024 * 1024) {
            showToast('File too large. Maximum is 25 MB.', 'error');
            return;
        }

        if (progressContainer) progressContainer.classList.remove('hidden');
        if (progressFilename) progressFilename.textContent = file.name;
        setProgress(10);

        var formData = new FormData();
        formData.append('file', file);

        try {
            setProgress(30);

            var token = localStorage.getItem('accessToken');
            var response = await fetch(API_URL + '/api/ai/upload', {
                method: 'POST',
                headers: token ? { 'Authorization': 'Bearer ' + token } : {},
                body: formData,
                credentials: 'include'
            });

            setProgress(80);

            var data = await response.json();

            if (!response.ok) {
                if (data.credits_exhausted) {
                    showCreditExhaustedToast('upload');
                    fetchCredits();
                    return;
                }
                throw new Error(data.error || 'Upload failed');
            }

            setProgress(100);
            showToast('File uploaded! Processing your document...', 'success');
            fetchCredits(); // Refresh credit bar

            if (data.upload_id) {
                startPolling(data.upload_id);
            }

            setTimeout(loadDocuments, 500);

        } catch (err) {
            console.error('[AI Tools] Upload failed:', err);
            if (isCreditError(err.message)) {
                showCreditExhaustedToast('upload');
                fetchCredits();
            } else {
                showToast(err.message || 'Upload failed. Please try again.', 'error');
            }
        } finally {
            setTimeout(function () {
                if (progressContainer) progressContainer.classList.add('hidden');
                setProgress(0);
            }, 1500);
        }
    }

    function setProgress(pct) {
        if (progressFill) progressFill.style.width = pct + '%';
        if (progressPct) progressPct.textContent = pct + '%';
    }

    // ── Text paste upload ───────────────────────────────────────

    async function uploadText() {
        var rawText = textAreaInput ? textAreaInput.value.trim() : '';
        var title = textTitleInput ? textTitleInput.value.trim() : '';

        if (!rawText) {
            showToast('Please enter some text to process.', 'error');
            return;
        }
        if (rawText.length > 50000) {
            showToast('Text is too long. Maximum is 50,000 characters.', 'error');
            return;
        }
        if (rawText.length < 50) {
            showToast('Please enter at least 50 characters of content.', 'error');
            return;
        }

        // Show progress
        if (progressContainer) progressContainer.classList.remove('hidden');
        if (progressFilename) progressFilename.textContent = title || 'Pasted Notes';
        setProgress(30);
        if (textSubmitBtn) textSubmitBtn.disabled = true;

        try {
            setProgress(50);

            var data = await apiCall('/api/ai/upload-text', {
                method: 'POST',
                body: JSON.stringify({ title: title, text: rawText }),
                headers: { 'Content-Type': 'application/json' }
            });

            setProgress(100);
            showToast('Text received! Processing your notes...', 'success');
            fetchCredits(); // Refresh credit bar

            // Clear the input
            if (textAreaInput) textAreaInput.value = '';
            if (textTitleInput) textTitleInput.value = '';
            if (textCharCount) textCharCount.textContent = '0 / 50,000 characters';

            if (data.upload_id) {
                startPolling(data.upload_id);
            }

            setTimeout(loadDocuments, 500);

        } catch (err) {
            console.error('[AI Tools] Text upload failed:', err);
            if (isCreditError(err.message)) {
                showCreditExhaustedToast('upload');
                fetchCredits();
            } else {
                showToast(err.message || 'Failed to submit text. Please try again.', 'error');
            }
        } finally {
            if (textSubmitBtn) textSubmitBtn.disabled = false;
            setTimeout(function () {
                if (progressContainer) progressContainer.classList.add('hidden');
                setProgress(0);
            }, 1500);
        }
    }

    // ── Document list ───────────────────────────────────────────

    async function loadDocuments() {
        try {
            var data = await apiCall('/api/ai/documents');
            documents = (data && data.documents) || [];
            renderDocuments();

            documents.forEach(function (doc) {
                if (doc.status === 'uploaded' || doc.status === 'processing') {
                    startPolling(doc.id);
                }
            });
        } catch (err) {
            console.warn('[AI Tools] Failed to load documents:', err);
        }
    }

    var preGenPollTimer = null;

    function renderDocuments() {
        if (!documentsList) return;

        var cards = documentsList.querySelectorAll('.ai-doc-card');
        cards.forEach(function (c) { c.remove(); });

        if (documents.length === 0) {
            if (emptyState) emptyState.style.display = '';
            stopPreGenPolling();
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        var hasGenerating = false;
        documents.forEach(function (doc) {
            var card = createDocumentCard(doc);
            documentsList.appendChild(card);
            if (doc.generating_types && doc.generating_types.length > 0) {
                hasGenerating = true;
            }
        });

        // If any document has types currently generating, poll to update button states
        if (hasGenerating) {
            startPreGenPolling();
        } else {
            stopPreGenPolling();
        }
    }

    function startPreGenPolling() {
        if (preGenPollTimer) return; // already polling
        preGenPollTimer = setInterval(function () {
            loadDocuments();
        }, 5000);
    }

    function stopPreGenPolling() {
        if (preGenPollTimer) {
            clearInterval(preGenPollTimer);
            preGenPollTimer = null;
        }
    }

    function createDocumentCard(doc) {
        var card = document.createElement('div');
        card.className = 'ai-doc-card';
        card.dataset.uploadId = doc.id;

        var iconClass = 'fa-file-pdf';
        if (doc.file_type === 'docx') iconClass = 'fa-file-word';
        if (doc.file_type === 'pptx') iconClass = 'fa-file-powerpoint';
        if (doc.file_type === 'text') iconClass = 'fa-file-lines';

        var statusHtml = '';
        if (doc.status === 'ready') {
            statusHtml = '<span class="ai-doc-status status-ready"><i class="fas fa-check-circle"></i> Ready</span>';
        } else if (doc.status === 'processing') {
            statusHtml = '<span class="ai-doc-status status-processing"><span class="ai-spinner"></span> Processing</span>';
        } else if (doc.status === 'failed') {
            statusHtml = '<span class="ai-doc-status status-failed"><i class="fas fa-circle-xmark"></i> Failed</span>';
        } else {
            statusHtml = '<span class="ai-doc-status status-uploaded"><i class="fas fa-cloud-arrow-up"></i> Uploaded</span>';
        }

        var metaParts = [];
        if (doc.file_type === 'text') {
            metaParts.push('Pasted Notes');
        } else {
            metaParts.push(formatFileSize(doc.file_size_bytes));
        }
        if (doc.page_count) metaParts.push(doc.page_count + ' pages');
        if (doc.chunk_count) metaParts.push(doc.chunk_count + ' chunks');

        var completedGens = doc.completed_generations || [];
        var generatingTypes = doc.generating_types || [];
        var relevance = doc.relevant_types || {};

        // Build action button grid (only when document is ready)
        var actionGridHtml = '';
        if (doc.status === 'ready') {
            actionGridHtml = '<div class="ai-action-grid">';
            for (var i = 0; i < TYPE_KEYS.length; i++) {
                var typeKey = TYPE_KEYS[i];
                var typeInfo = GENERATION_TYPES[typeKey];
                var isCached = completedGens.indexOf(typeKey) !== -1;
                var isGenerating = generatingTypes.indexOf(typeKey) !== -1;

                // Determine relevance — default to relevant if no classification yet (backward compat)
                var typeRelevance = relevance[typeKey];
                var isRelevant = !typeRelevance || typeRelevance.relevant !== false;
                var irrelevantReason = (typeRelevance && typeRelevance.reason) || '';

                var statusIndicator = '';
                var extraClass = '';
                var attrStr = '';
                var tooltipHtml = '';

                if (!isRelevant) {
                    // Irrelevant — dimmed with hover tooltip
                    extraClass = ' ai-action-irrelevant';
                    attrStr = ' disabled';
                    tooltipHtml = '<span class="ai-tooltip">' + escapeHtml(irrelevantReason) + '</span>';
                } else if (isCached) {
                    statusIndicator = '<span class="ai-action-cached" title="Generated"></span>';
                    attrStr = ' title="' + escapeHtml(typeInfo.label) + '"';
                } else if (isGenerating) {
                    statusIndicator = '<span class="ai-action-generating" title="Generating\u2026"></span>';
                    attrStr = ' title="Generating\u2026"';
                } else {
                    attrStr = ' title="' + escapeHtml(typeInfo.label) + '"';
                }

                actionGridHtml += '<button class="ai-action-btn' + extraClass + '"' +
                    ' data-action="generate"' +
                    ' data-doc-id="' + doc.id + '"' +
                    ' data-gen-type="' + typeKey + '"' +
                    attrStr +
                    ' style="--action-color:' + typeInfo.color + ';--action-bg:' + typeInfo.bgColor + '">' +
                    statusIndicator +
                    tooltipHtml +
                    '<i class="fas ' + typeInfo.icon + '"></i>' +
                    '<span>' + typeInfo.shortLabel + '</span>' +
                    '</button>';
            }
            actionGridHtml += '</div>';
        }

        card.innerHTML =
            '<div class="ai-doc-header">' +
            '  <div class="ai-doc-icon"><i class="fas ' + iconClass + '"></i></div>' +
            '  <div class="ai-doc-info">' +
            '    <div class="ai-doc-name">' + escapeHtml(doc.filename) + '</div>' +
            '    <div class="ai-doc-meta">' + metaParts.join(' &bull; ') + '</div>' +
            '  </div>' +
            '  ' + statusHtml +
            '  <button class="ai-doc-btn btn-delete" data-action="delete" data-doc-id="' + doc.id + '" title="Delete"><i class="fas fa-trash-alt"></i></button>' +
            '</div>' +
            actionGridHtml;

        // Attach event listeners (skip irrelevant/disabled buttons)
        var genBtns = card.querySelectorAll('[data-action="generate"]:not(.ai-action-irrelevant)');
        for (var j = 0; j < genBtns.length; j++) {
            (function (btn) {
                btn.addEventListener('click', function () {
                    if (btn.disabled) return;
                    requestGeneration(doc.id, doc.filename, btn.dataset.genType);
                });
            })(genBtns[j]);
        }

        var deleteBtn = card.querySelector('[data-action="delete"]');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function () {
                deleteDocument(doc.id, doc.filename);
            });
        }

        return card;
    }

    // ── Status polling ──────────────────────────────────────────

    function startPolling(uploadId) {
        if (pollingTimers[uploadId]) return;

        pollingTimers[uploadId] = setInterval(async function () {
            try {
                var data = await apiCall('/api/ai/documents/' + uploadId + '/status');
                if (data && (data.status === 'ready' || data.status === 'failed')) {
                    stopPolling(uploadId);
                    loadDocuments();

                    if (data.status === 'ready') {
                        showToast('Document processed and ready!', 'success');
                    } else if (data.status === 'failed') {
                        showToast('Document processing failed: ' + (data.error_message || 'Unknown error'), 'error');
                    }
                }
            } catch (err) {
                console.warn('[AI Tools] Polling error for', uploadId, err);
                stopPolling(uploadId);
            }
        }, 3000);
    }

    function stopPolling(uploadId) {
        if (pollingTimers[uploadId]) {
            clearInterval(pollingTimers[uploadId]);
            delete pollingTimers[uploadId];
        }
    }

    // ── Generate content ────────────────────────────────────────

    async function requestGeneration(docId, filename, genType) {
        var typeInfo = GENERATION_TYPES[genType];
        if (!typeInfo) return;

        var btn = document.querySelector(
            '[data-action="generate"][data-doc-id="' + docId + '"][data-gen-type="' + genType + '"]'
        );
        if (btn) btn.classList.add('generating');

        // Open the panel immediately with a generating state so the user
        // sees feedback right away instead of staring at a tiny spinner.
        openPanelGenerating(docId, filename, genType);

        try {
            var data = await apiCall('/api/ai/generate/' + docId, {
                method: 'POST',
                body: JSON.stringify({ type: genType }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (data && data.content) {
                openPanel(docId, filename, genType, data.content);
                // Update cache dot
                if (btn && !btn.querySelector('.ai-action-cached')) {
                    btn.insertAdjacentHTML('afterbegin', '<span class="ai-action-cached" title="Generated"></span>');
                }
                // Refresh credits if this was a practice_questions generation
                if (genType === 'practice_questions') fetchCredits();
            } else if (data && data.status === 'generating') {
                // Content is still being generated — keep panel open and poll
                pollForGeneration(docId, filename, genType, btn);
                return; // skip the finally block's btn cleanup — polling handles it
            } else {
                throw new Error(data.error || 'No content returned');
            }
        } catch (err) {
            console.error('[AI Tools] Generation failed:', err);
            if (isCreditError(err.message)) {
                showCreditExhaustedToast('question');
                fetchCredits();
                closePanel();
            } else {
                showToast(err.message || typeInfo.label + ' generation failed. Please try again.', 'error');
                closePanel();
            }
        } finally {
            if (btn) btn.classList.remove('generating');
        }
    }

    // ── Poll for in-progress generation ────────────────────────

    var generationPollTimer = null;

    function pollForGeneration(docId, filename, genType, btn) {
        var typeInfo = GENERATION_TYPES[genType];
        var attempts = 0;
        var maxAttempts = 100; // 100 × 3s = 5 min max wait

        // Update the generating state message to show we're waiting
        var hintEl = panelContent ? panelContent.querySelector('.ai-generating-hint') : null;
        if (hintEl) hintEl.textContent = 'Still generating\u2026 this may take up to a minute for large documents.';

        clearGenerationPoll(); // clear any prior poll

        generationPollTimer = setInterval(async function () {
            attempts++;

            // Stop if panel was closed by user
            if (!panelEl || !panelEl.classList.contains('open')) {
                clearGenerationPoll();
                if (btn) btn.classList.remove('generating');
                return;
            }

            try {
                var data = await apiCall('/api/ai/generate/' + docId, {
                    method: 'POST',
                    body: JSON.stringify({ type: genType }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (data && data.content) {
                    clearGenerationPoll();
                    openPanel(docId, filename, genType, data.content);
                    if (btn) {
                        btn.classList.remove('generating');
                        if (!btn.querySelector('.ai-action-cached')) {
                            btn.insertAdjacentHTML('afterbegin', '<span class="ai-action-cached" title="Generated"></span>');
                        }
                    }
                    // Reset regenerate button if it triggered this poll
                    if (btn === panelRegenerateBtn && panelRegenerateBtn) {
                        panelRegenerateBtn.disabled = false;
                        panelRegenerateBtn.innerHTML = '<i class="fas fa-arrows-rotate"></i><span class="ai-toolbar-label">Regenerate</span>';
                    }
                    // Refresh credits if practice_questions completed
                    if (genType === 'practice_questions') fetchCredits();
                } else if (data && data.status === 'generating') {
                    // Still working — update the hint with elapsed time
                    if (hintEl) {
                        var elapsed = attempts * 3;
                        var dots = '.'.repeat((attempts % 3) + 1);
                        var minutes = Math.floor(elapsed / 60);
                        var timeStr = minutes > 0
                            ? minutes + 'm ' + (elapsed % 60) + 's'
                            : elapsed + 's';
                        hintEl.textContent = 'Still generating' + dots + ' (' + timeStr + ')';
                    }
                    if (attempts >= maxAttempts) {
                        clearGenerationPoll();
                        showToast(typeInfo.label + ' generation timed out. Please try again.', 'error');
                        closePanel();
                        if (btn) btn.classList.remove('generating');
                    }
                } else if (data && data.status === 'failed') {
                    // Backend explicitly reported failure
                    clearGenerationPoll();
                    showToast(data.error_message || data.error || typeInfo.label + ' generation failed.', 'error');
                    closePanel();
                    if (btn) btn.classList.remove('generating');
                } else {
                    clearGenerationPoll();
                    showToast(data.error || typeInfo.label + ' generation failed.', 'error');
                    closePanel();
                    if (btn) btn.classList.remove('generating');
                }
            } catch (err) {
                clearGenerationPoll();
                console.error('[AI Tools] Generation poll failed:', err);
                showToast(typeInfo.label + ' generation failed. Please try again.', 'error');
                closePanel();
                if (btn) btn.classList.remove('generating');
            }
        }, 3000);
    }

    function clearGenerationPoll() {
        if (generationPollTimer) {
            clearInterval(generationPollTimer);
            generationPollTimer = null;
        }
    }

    // ── Delete document ─────────────────────────────────────────

    async function deleteDocument(docId, filename) {
        if (!confirm('Delete "' + filename + '"? This will also remove all generated content.')) {
            return;
        }

        try {
            await apiCall('/api/ai/documents/' + docId, { method: 'DELETE' });
            showToast('Document deleted.', 'success');
            stopPolling(docId);
            loadDocuments();
        } catch (err) {
            console.error('[AI Tools] Delete failed:', err);
            showToast('Failed to delete document.', 'error');
        }
    }

    // ── Panel (open / close) ────────────────────────────────────

    function openPanelGenerating(docId, filename, genType) {
        var typeInfo = GENERATION_TYPES[genType];

        currentDocId = docId;
        currentFilename = filename;
        currentMarkdown = null;
        currentGenerationType = genType;

        // Update toolbar
        if (panelDocName) panelDocName.textContent = typeInfo.panelTitle + ' \u2014 ' + filename;

        var toolbar = panelEl ? panelEl.querySelector('.ai-summary-toolbar') : null;
        if (toolbar && typeInfo.color) {
            toolbar.style.background = 'linear-gradient(135deg, ' + typeInfo.color + ', ' + darkenColor(typeInfo.color, 30) + ')';
        }

        // Show loading state in panel body
        if (panelContent) {
            panelContent.innerHTML =
                '<div class="ai-generating-state">' +
                    '<div class="ai-generating-spinner"></div>' +
                    '<h3>Generating ' + escapeHtml(typeInfo.label) + '</h3>' +
                    '<p>Analyzing your notes and creating study materials\u2026</p>' +
                    '<p class="ai-generating-hint">This usually takes 10\u201320 seconds</p>' +
                '</div>';
        }

        // Disable toolbar action buttons while generating
        if (panelCopyBtn) panelCopyBtn.disabled = true;
        if (panelPrintBtn) panelPrintBtn.disabled = true;
        if (panelRegenerateBtn) panelRegenerateBtn.disabled = true;
        if (panelQuizBar) panelQuizBar.classList.add('hidden');

        // Show backdrop + panel
        if (backdropEl) {
            backdropEl.classList.remove('hidden');
            backdropEl.offsetHeight;
            backdropEl.classList.add('visible');
        }
        if (panelEl) {
            panelEl.classList.remove('hidden');
            panelEl.offsetHeight;
            panelEl.classList.add('open');
        }
        document.body.style.overflow = 'hidden';
    }

    function openPanel(docId, filename, genType, markdownContent) {
        currentDocId = docId;
        currentFilename = filename;
        currentMarkdown = markdownContent;
        currentGenerationType = genType;

        var typeInfo = GENERATION_TYPES[genType];

        // Type-specific toolbar color
        var toolbar = panelEl ? panelEl.querySelector('.ai-summary-toolbar') : null;
        if (toolbar && typeInfo.color) {
            toolbar.style.background = 'linear-gradient(135deg, ' + typeInfo.color + ', ' + darkenColor(typeInfo.color, 30) + ')';
        }

        // Render content
        if (panelContent) panelContent.innerHTML = renderMarkdown(markdownContent);

        // Extract AI-generated title from the first H1 in rendered content
        currentContentTitle = null;
        if (panelContent) {
            var firstH1 = panelContent.querySelector('h1');
            if (firstH1) {
                currentContentTitle = firstH1.textContent.trim();
            }
        }

        // Use AI title for panel header and print header, fall back to filename
        var displayTitle = currentContentTitle || filename;
        if (panelDocName) panelDocName.textContent = typeInfo.panelTitle + ' \u2014 ' + displayTitle;

        var printTitle = document.getElementById('ai-print-title');
        if (printTitle) printTitle.textContent = typeInfo.panelTitle + ' \u2014 ' + displayTitle;

        // Re-enable toolbar buttons (may have been disabled by generating state)
        if (panelCopyBtn) panelCopyBtn.disabled = false;
        if (panelPrintBtn) panelPrintBtn.disabled = false;
        if (panelRegenerateBtn) panelRegenerateBtn.disabled = false;
        if (panelQuizBar) {
            panelQuizBar.classList.toggle('hidden', genType !== 'practice_questions');
        }

        // Show backdrop
        if (backdropEl) {
            backdropEl.classList.remove('hidden');
            backdropEl.offsetHeight; // force reflow
            backdropEl.classList.add('visible');
        }

        // Show panel
        if (panelEl) {
            panelEl.classList.remove('hidden');
            panelEl.offsetHeight; // force reflow
            panelEl.classList.add('open');
        }

        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        clearGenerationPoll(); // stop any active generation polling

        if (panelEl) panelEl.classList.remove('open');
        if (backdropEl) backdropEl.classList.remove('visible');
        document.body.style.overflow = '';

        setTimeout(function () {
            if (panelEl) panelEl.classList.add('hidden');
            if (backdropEl) backdropEl.classList.add('hidden');

            // Reset toolbar to default
            var toolbar = panelEl ? panelEl.querySelector('.ai-summary-toolbar') : null;
            if (toolbar) toolbar.style.background = '';
        }, 350);

        currentDocId = null;
        currentFilename = null;
        currentMarkdown = null;
        currentGenerationType = null;
        currentContentTitle = null;
    }

    // ── Panel actions ───────────────────────────────────────────

    function printPanel() {
        // Set document title so "Save as PDF" defaults to a descriptive name
        // like "NCLEX Review Sheet — Cardiac Medications & Heart Failure.pdf"
        var origTitle = document.title;
        if (currentGenerationType) {
            var typeInfo = GENERATION_TYPES[currentGenerationType];
            // Prefer AI-inferred topic title, fall back to cleaned filename
            var pdfName = currentContentTitle
                || (currentFilename ? currentFilename.replace(/\.[^/.]+$/, '') : 'Study Materials');
            document.title = (typeInfo ? typeInfo.panelTitle : 'AI Study Tool') + ' \u2014 ' + pdfName;
        }
        window.print();
        // Restore original title after print dialog closes
        // Use both afterprint and a fallback timeout for browser compat
        var restored = false;
        function restore() {
            if (restored) return;
            restored = true;
            document.title = origTitle;
        }
        window.addEventListener('afterprint', function onAfter() {
            window.removeEventListener('afterprint', onAfter);
            restore();
        });
        setTimeout(restore, 5000); // fallback if afterprint doesn't fire
    }

    function copyToClipboard() {
        if (!currentMarkdown) return;

        navigator.clipboard.writeText(currentMarkdown).then(function () {
            if (panelCopyBtn) {
                var originalHTML = panelCopyBtn.innerHTML;
                panelCopyBtn.innerHTML = '<i class="fas fa-check"></i><span class="ai-toolbar-label">Copied!</span>';
                setTimeout(function () { panelCopyBtn.innerHTML = originalHTML; }, 2000);
            }
            showToast('Copied to clipboard!', 'success');
        }).catch(function () {
            var textarea = document.createElement('textarea');
            textarea.value = currentMarkdown;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('Copied to clipboard!', 'success');
        });
    }

    async function regenerateGeneration() {
        if (!currentDocId || !currentGenerationType) return;

        var typeInfo = GENERATION_TYPES[currentGenerationType];

        if (panelRegenerateBtn) {
            panelRegenerateBtn.disabled = true;
            panelRegenerateBtn.innerHTML = '<span class="ai-spinner" style="border-color:rgba(255,255,255,.3);border-top-color:#fff;width:12px;height:12px"></span><span class="ai-toolbar-label">Regenerating...</span>';
        }

        try {
            var data = await apiCall('/api/ai/generate/' + currentDocId, {
                method: 'POST',
                body: JSON.stringify({ type: currentGenerationType, regenerate: true }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (data && data.content) {
                currentMarkdown = data.content;
                if (panelContent) panelContent.innerHTML = renderMarkdown(data.content);
                if (panelBody) panelBody.scrollTop = 0;
                showToast(typeInfo.label + ' regenerated!', 'success');
                if (panelRegenerateBtn) {
                    panelRegenerateBtn.disabled = false;
                    panelRegenerateBtn.innerHTML = '<i class="fas fa-arrows-rotate"></i><span class="ai-toolbar-label">Regenerate</span>';
                }
            } else if (data && data.status === 'generating') {
                // Async regeneration — show generating state and poll
                if (panelContent) {
                    panelContent.innerHTML =
                        '<div class="ai-generating-state">' +
                            '<div class="ai-generating-spinner"></div>' +
                            '<h3>Regenerating ' + escapeHtml(typeInfo.label) + '</h3>' +
                            '<p>Creating fresh study materials\u2026</p>' +
                            '<p class="ai-generating-hint">This usually takes 10\u201320 seconds</p>' +
                        '</div>';
                }
                // Disable panel buttons during regeneration
                if (panelCopyBtn) panelCopyBtn.disabled = true;
                if (panelPrintBtn) panelPrintBtn.disabled = true;
                if (panelQuizBar) panelQuizBar.classList.add('hidden');
                // Poll until content is ready (panelRegenerateBtn reset handled inside pollForGeneration)
                pollForGeneration(currentDocId, currentFilename, currentGenerationType, panelRegenerateBtn);
            } else {
                throw new Error(data.error || 'No content returned');
            }
        } catch (err) {
            console.error('[AI Tools] Regenerate failed:', err);
            showToast(err.message || 'Regeneration failed. Please try again.', 'error');
            if (panelRegenerateBtn) {
                panelRegenerateBtn.disabled = false;
                panelRegenerateBtn.innerHTML = '<i class="fas fa-arrows-rotate"></i><span class="ai-toolbar-label">Regenerate</span>';
            }
        }
    }

    // ── Markdown renderer ───────────────────────────────────────

    function renderMarkdown(md) {
        if (!md) return '';

        var html = escapeHtml(md);

        // Headings (H2 gets auto-assigned icons based on content keywords)
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, function (m, title) {
            var icon = getHeadingIcon(title);
            return '<h2><i class="fas ' + icon + '"></i> ' + title + '</h2>';
        });
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

        // Bold & italic
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Horizontal rules
        html = html.replace(/^---$/gm, '<hr>');

        // Markdown tables (must run before paragraph wrapping)
        html = html.replace(/^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)+)/gm, function (match, headerRow, sepRow, bodyRows) {
            var headers = headerRow.split('|').filter(function (c) { return c.trim(); });
            var rows = bodyRows.trim().split('\n');
            var table = '<div class="ai-table-wrapper"><table class="ai-md-table"><thead><tr>';
            for (var h = 0; h < headers.length; h++) {
                table += '<th>' + headers[h].trim() + '</th>';
            }
            table += '</tr></thead><tbody>';
            for (var r = 0; r < rows.length; r++) {
                var cells = rows[r].split('|').filter(function (c) { return c.trim() !== ''; });
                table += '<tr>';
                for (var c = 0; c < cells.length; c++) {
                    table += '<td>' + cells[c].trim() + '</td>';
                }
                table += '</tr>';
            }
            table += '</tbody></table></div>';
            return table;
        });

        // Collapse multi-line blockquote Answer/Rationale/Concept into single lines.
        // LLMs often wrap long rationales across multiple `> ` lines. This merges them
        // so the reveal-toggle regex below captures the FULL text, not just line 1.
        html = html.replace(/^(&gt; <strong>(?:Answer|Rationale|Concept):?<\/strong> .+?)(\n&gt; (?!<strong>).+)+/gm, function (match) {
            return match.replace(/\n&gt; /g, ' ');
        });

        // Blockquote callout boxes
        html = html.replace(/^&gt; <strong>(?:Key (?:Concept|Point|Takeaway)s?):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--key"><div class="ai-callout-header"><i class="fas fa-star"></i> Key Concept</div>$1</div>');
        html = html.replace(/^&gt; <strong>(?:Warning|Caution|Alert|Safety|⚠️\s*Warning(?:s)?):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--warning"><div class="ai-callout-header"><i class="fas fa-exclamation-triangle"></i> Warning</div>$1</div>');
        html = html.replace(/^&gt; <strong>(?:Tip|Clinical (?:Tip|Pearl)|Nursing (?:Tip|Implication(?:s)?)):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--tip"><div class="ai-callout-header"><i class="fas fa-lightbulb"></i> Clinical Tip</div>$1</div>');
        html = html.replace(/^&gt; <strong>NCLEX[- ]?(?:Tip|Alert|Focus):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--nclex"><div class="ai-callout-header"><i class="fas fa-graduation-cap"></i> NCLEX Focus</div>$1</div>');

        // Practice question answer/rationale reveals
        html = html.replace(/^&gt; <strong>Answer:?<\/strong> ?(.+)$/gm,
            '<details class="ai-answer-reveal"><summary class="ai-answer-toggle"><i class="fas fa-eye"></i> Show Answer</summary><div class="ai-answer-content"><strong>Answer:</strong> $1</div></details>');
        html = html.replace(/^&gt; <strong>Rationale:?<\/strong> ?(.+)$/gm,
            '<details class="ai-answer-reveal ai-rationale-reveal"><summary class="ai-answer-toggle"><i class="fas fa-brain"></i> Show Rationale</summary><div class="ai-answer-content"><strong>Rationale:</strong> $1</div></details>');
        html = html.replace(/^&gt; <strong>Concept:?<\/strong> ?(.+)$/gm,
            '<div class="ai-concept-tag"><i class="fas fa-tag"></i> $1</div>');

        // Generic blockquotes (after specific patterns)
        html = html.replace(/^&gt; (.+)$/gm,
            '<div class="ai-callout ai-callout--key">$1</div>');

        // Non-blockquote callout patterns (bold prefix WITHOUT > blockquote)
        html = html.replace(/^<strong>(?:Key (?:Concept|Point|Takeaway)s?):?<\/strong>:?\s*(.+)$/gm,
            '<div class="ai-callout ai-callout--key"><div class="ai-callout-header"><i class="fas fa-star"></i> Key Concept</div>$1</div>');
        html = html.replace(/^<strong>(?:Important|Note|Remember):?<\/strong>:?\s*(.+)$/gm,
            '<div class="ai-callout ai-callout--key"><div class="ai-callout-header"><i class="fas fa-bookmark"></i> Important</div>$1</div>');
        html = html.replace(/^<strong>(?:Warning|Caution|Alert|Safety|⚠️\s*Warning(?:s)?):?<\/strong>:?\s*(.+)$/gm,
            '<div class="ai-callout ai-callout--warning"><div class="ai-callout-header"><i class="fas fa-exclamation-triangle"></i> Warning</div>$1</div>');
        html = html.replace(/^<strong>(?:Tip|Clinical (?:Tip|Pearl)|Nursing (?:Tip|Implication(?:s)?)):?<\/strong>:?\s*(.+)$/gm,
            '<div class="ai-callout ai-callout--tip"><div class="ai-callout-header"><i class="fas fa-lightbulb"></i> Clinical Tip</div>$1</div>');
        html = html.replace(/^<strong>NCLEX[- ]?(?:Tip|Alert|Focus):?<\/strong>:?\s*(.+)$/gm,
            '<div class="ai-callout ai-callout--nclex"><div class="ai-callout-header"><i class="fas fa-graduation-cap"></i> NCLEX Focus</div>$1</div>');

        // Lettered options (A. B. C. D. E.) — style as option list
        html = html.replace(/^([A-E])\. (.+)$/gm, '<div class="ai-option"><span class="ai-option-letter">$1</span> $2</div>');

        // Unordered lists (also match indented sub-items)
        html = html.replace(/^( *)[-•] (.+)$/gm, function (m, indent, text) {
            return indent.length >= 2 ? '<li class="ai-sub">' + text + '</li>' : '<li>' + text + '</li>';
        });

        // Numbered lists (also match indented)
        html = html.replace(/^ *\d+\.\s+(.+)$/gm, '<li>$1</li>');

        // Collapse blank lines between list items so they group into one <ul>
        html = html.replace(/<\/li>\n\n+<li>/g, '</li>\n<li>');

        // Wrap consecutive <li> items in <ul>
        html = html.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, function (match) {
            return '<ul>' + match + '</ul>';
        });

        // Paragraphs
        html = html.replace(/\n\n+/g, '</p><p>');
        html = '<p>' + html + '</p>';

        // Clean up
        html = html.replace(/<p>\s*<\/p>/g, '');
        html = html.replace(/<p>(<h[1-3]>)/g, '$1');
        html = html.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul>)/g, '$1');
        html = html.replace(/(<\/ul>)<\/p>/g, '$1');
        html = html.replace(/<p>(<hr>)<\/p>/g, '$1');
        html = html.replace(/<p>(<div class="ai-)/g, '$1');
        html = html.replace(/<p>(<details class="ai-)/g, '$1');
        html = html.replace(/(<\/div>)<\/p>/g, '$1');
        html = html.replace(/(<\/details>)<\/p>/g, '$1');

        // Single newlines -> <br>
        html = html.replace(/\n/g, '<br>');

        // Quick Review / Key Takeaways / Score Guide section
        html = html.replace(/<h2>(Quick Review|Key Takeaways|Top 10 Things to Remember|Score Guide)<\/h2>/gi, function (match, title) {
            return '<div class="ai-quick-review"><h2><i class="fas fa-clipboard-check"></i> ' + escapeHtml(title) + '</h2>';
        });
        if (html.indexOf('ai-quick-review') !== -1) {
            html = html + '</div>';
        }

        // ── Table of Contents (auto-generated from H2 headings) ────
        // Only show when there are 3+ meaningful sections to navigate.
        // Skip question numbers, score guides, and other non-navigable headings.
        var tocSkipPattern = /^(question\s*\d|score\s*guide|no\s*medications?\s*found)/i;
        var tocEntries = [];
        html = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, function (match, attrs, inner) {
            var plainText = inner.replace(/<[^>]+>/g, '').trim();
            var slug = 'section-' + plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            // Always add the id for deep-linking, but only add to TOC if meaningful
            if (!tocSkipPattern.test(plainText)) {
                tocEntries.push({ slug: slug, text: plainText });
            }
            return '<h2 id="' + slug + '"' + attrs + '>' + inner + '</h2>';
        });

        if (tocEntries.length >= 3) {
            var tocHtml = '<nav class="ai-toc" aria-label="Table of Contents">' +
                '<div class="ai-toc-header"><i class="fas fa-list"></i> Quick Navigation</div>' +
                '<div class="ai-toc-links">';
            for (var t = 0; t < tocEntries.length; t++) {
                tocHtml += '<a href="#' + tocEntries[t].slug + '" class="ai-toc-link">' +
                    tocEntries[t].text + '</a>';
            }
            tocHtml += '</div></nav>';
            html = tocHtml + html;
        }

        return html;
    }

    // ── AI Quiz Markdown Parser ────────────────────────────────

    function parseAIQuizMarkdown(markdown) {
        if (!markdown) return [];

        // Split on ## Question N headers (with optional SATA marker)
        var parts = markdown.split(/^## Question \d+\s*/gm);
        parts.shift(); // remove content before first question

        var questions = [];
        var questionId = 0;

        for (var i = 0; i < parts.length; i++) {
            var block = parts[i];
            if (!block || !block.trim()) continue;

            // Detect SATA from header remnant or "Question Type" line
            var isSATA = /\(Select All That Apply\)|Select All That Apply/i.test(block);
            block = block.replace(/\(Select All That Apply\)/gi, '').trim();

            var lines = block.split('\n');

            // Extract stem (lines before first option letter)
            var stemLines = [];
            var optionStart = -1;
            for (var j = 0; j < lines.length; j++) {
                if (/^[A-E]\.\s/.test(lines[j].trim())) {
                    optionStart = j;
                    break;
                }
                stemLines.push(lines[j]);
            }
            var stem = stemLines.join('\n').trim();
            // Strip "Question Type:" lines (bold or plain) from stem
            stem = stem.replace(/^\**\s*Question Type:[^\n]*$/gim, '').trim();
            if (!stem || optionStart === -1) continue;

            // Extract options A-E
            var options = [];
            for (var k = optionStart; k < lines.length; k++) {
                var optMatch = lines[k].trim().match(/^([A-E])\.\s+(.+)$/);
                if (optMatch) {
                    options.push({ id: optMatch[1].toLowerCase(), text: optMatch[2].trim() });
                }
            }

            // Extract answer, rationale, concept from blockquote lines
            var correctAnswer = null;
            var rationale = null;
            var concept = null;

            var answerMatch = block.match(/>\s*\*{0,2}Answer:?\*{0,2}:?\s*(.+)/i);
            if (answerMatch) {
                var raw = answerMatch[1].trim();
                if (isSATA) {
                    correctAnswer = raw.split(/\s*,\s*/).map(function (l) {
                        return l.trim().replace(/[^a-eA-E]/g, '').toLowerCase();
                    }).filter(function (l) { return /^[a-e]$/.test(l); }).sort();
                    if (correctAnswer.length === 0) correctAnswer = null;
                } else {
                    var singleMatch = raw.match(/^([A-E])/i);
                    correctAnswer = singleMatch ? singleMatch[1].toLowerCase() : null;
                }
            }

            var rationaleMatch = block.match(/>\s*\*{0,2}Rationale:?\*{0,2}:?\s*(.+)/i);
            if (rationaleMatch) {
                rationale = rationaleMatch[1].trim();
            }

            var conceptMatch = block.match(/>\s*\*{0,2}Concept:?\*{0,2}:?\s*(.+)/i);
            if (conceptMatch) {
                concept = conceptMatch[1].trim();
            }

            // Validate: need >= 2 options and a correct answer
            if (options.length < 2 || !correctAnswer) continue;

            // For SATA, verify all answer letters exist in options
            if (isSATA && Array.isArray(correctAnswer)) {
                var validLetters = options.map(function (o) { return o.id; });
                var allValid = correctAnswer.every(function (l) {
                    return validLetters.indexOf(l) !== -1;
                });
                if (!allValid) continue;
            }

            questionId++;
            questions.push({
                id: 'ai-q-' + questionId,
                type: isSATA ? 'sata' : 'single',
                subtype: null,
                difficulty: 'application',
                stem: stem,
                options: options,
                correct: correctAnswer,
                rationale: {
                    correct: rationale || 'See your lecture notes for detailed rationale.'
                },
                testTakingTip: null,
                guideSection: concept || null,
                guideSectionId: null
            });
        }

        return questions;
    }

    // ── Take as Quiz ────────────────────────────────────────────

    function takeAsQuiz() {
        if (!currentMarkdown || currentGenerationType !== 'practice_questions') return;

        var questions = parseAIQuizMarkdown(currentMarkdown);
        if (!questions || questions.length === 0) {
            showToast('Could not parse questions from this content. Try regenerating.', 'error');
            return;
        }

        var quizPayload = {
            questions: questions,
            guideName: currentFilename || 'AI Practice Questions',
            guideSlug: 'ai-' + (currentDocId || 'generated'),
            category: 'AI Generated',
            categoryColor: '#3b82f6',
            estimatedMinutes: Math.max(5, Math.round(questions.length * 1.5)),
            isAIGenerated: true,
            sourceDocId: currentDocId
        };

        try {
            sessionStorage.setItem('aiQuizData', JSON.stringify(quizPayload));
        } catch (e) {
            showToast('Failed to prepare quiz data. Please try again.', 'error');
            return;
        }

        window.location.href = 'guides/quiz/quiz.html?source=ai&doc=' + encodeURIComponent(currentDocId || '');
    }

    // ── Utility functions ───────────────────────────────────────

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatFileSize(bytes) {
        if (!bytes) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function getHeadingIcon(title) {
        var t = title.toLowerCase();
        if (/overview|introduction|background|general/.test(t)) return 'fa-book-open';
        if (/pathophys|mechanism|etiology|cause/.test(t)) return 'fa-microscope';
        if (/sign|symptom|assessment|manifestation|presentation|clinical feature/.test(t)) return 'fa-stethoscope';
        if (/diagnos|lab|test|evaluat|finding/.test(t)) return 'fa-vial';
        if (/treatment|management|therap|intervention|medical manage/.test(t)) return 'fa-kit-medical';
        if (/medicat|pharmac|drug/.test(t)) return 'fa-pills';
        if (/nurs|care plan|implication|priority/.test(t)) return 'fa-user-nurse';
        if (/complicat|risk|prognos|adverse/.test(t)) return 'fa-triangle-exclamation';
        if (/education|teach|discharge|prevention|health promot/.test(t)) return 'fa-chalkboard-user';
        if (/quick review|key takeaway|remember|recap|summary|review/.test(t)) return 'fa-clipboard-check';
        if (/nclex|exam|test.taking|practice/.test(t)) return 'fa-graduation-cap';
        if (/prior|triage|emergenc/.test(t)) return 'fa-bolt';
        if (/nutrition|diet|fluid|electrolyte/.test(t)) return 'fa-utensils';
        if (/pain|comfort|palliati/.test(t)) return 'fa-hand-holding-heart';
        if (/safety|fall|infect|prevent/.test(t)) return 'fa-shield-heart';
        if (/question|practice q/.test(t)) return 'fa-clipboard-question';
        if (/classif|type|categor|comparison|compare/.test(t)) return 'fa-layer-group';
        if (/anatomy|structure|physiology/.test(t)) return 'fa-lungs';
        if (/monitor|vital|parameter/.test(t)) return 'fa-heart-pulse';
        if (/surgical|procedure|pre-op|post-op|periop/.test(t)) return 'fa-syringe';
        if (/psycho|mental|emotional|coping/.test(t)) return 'fa-brain';
        if (/pediatr|child|infant|newborn/.test(t)) return 'fa-baby';
        if (/mater|pregnan|prenatal|labor|delivery|postpartum/.test(t)) return 'fa-person-breastfeeding';
        if (/reference|resource|additional/.test(t)) return 'fa-book-bookmark';
        return 'fa-circle-dot';
    }

    function darkenColor(hex, amount) {
        var r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
        var g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
        var b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function showToast(message, type) {
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        } else if (typeof window.showToast === 'function') {
            window.showToast(message, type);
        } else {
            var toast = document.createElement('div');
            toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;padding:12px 20px;border-radius:10px;font-family:"Source Sans 3",sans-serif;font-size:.88rem;font-weight:500;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.15);transform:translateY(10px);opacity:0;transition:all .3s ease;max-width:360px;';
            if (type === 'error') toast.style.background = '#ef4444';
            else if (type === 'success') toast.style.background = '#10b981';
            else toast.style.background = '#3b82f6';
            if (message.indexOf('<a ') !== -1) {
                toast.innerHTML = message;
            } else {
                toast.textContent = message;
            }
            document.body.appendChild(toast);

            requestAnimationFrame(function () {
                toast.style.transform = 'translateY(0)';
                toast.style.opacity = '1';
            });
            setTimeout(function () {
                toast.style.transform = 'translateY(10px)';
                toast.style.opacity = '0';
                setTimeout(function () { toast.remove(); }, 300);
            }, 4000);
        }
    }

    // ── Start ───────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
