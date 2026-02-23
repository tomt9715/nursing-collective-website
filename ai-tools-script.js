/**
 * AI Study Tools — Phase 1: Upload + Summarize
 * Handles file upload, document management, and AI summary generation.
 * Relies on api-service.js for API_URL and apiCall().
 */
(function () {
    'use strict';

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

    // Summary panel elements
    var summaryPanel = document.getElementById('ai-summary-panel');
    var summaryBackdrop = document.getElementById('ai-summary-backdrop');
    var summaryDocName = document.getElementById('ai-summary-doc-name');
    var summaryContent = document.getElementById('ai-summary-content');
    var summaryBody = document.getElementById('ai-summary-body');
    var summaryBackBtn = document.getElementById('ai-summary-back');
    var summaryCopyBtn = document.getElementById('ai-summary-copy');
    var summaryPrintBtn = document.getElementById('ai-summary-print');
    var summaryRegenerateBtn = document.getElementById('ai-summary-regenerate');

    // ── State ───────────────────────────────────────────────────
    var documents = [];
    var pollingTimers = {};
    var hasAiAccess = false;
    var currentSummaryDocId = null;
    var currentSummaryFilename = null;
    var currentSummaryMarkdown = null;

    // ── Initialization ──────────────────────────────────────────

    function init() {
        var token = localStorage.getItem('accessToken');
        if (!token) {
            setTimeout(function () {
                token = localStorage.getItem('accessToken');
                if (token) {
                    checkAiAccess();
                } else {
                    showUpgradePrompt();
                }
            }, 1500);
        } else {
            setTimeout(checkAiAccess, 300);
        }
    }

    async function checkAiAccess() {
        try {
            var data = await apiCall('/api/subscription-status');
            if (data && data.has_access && data.subscription) {
                var planId = data.subscription.plan_id || '';
                if (planId.startsWith('ai-') || data.subscription.is_ai_plan) {
                    hasAiAccess = true;
                }
            }

            if (!hasAiAccess) {
                try {
                    var profileData = await apiCall('/user/profile');
                    if (profileData && profileData.user && profileData.user.is_admin) {
                        hasAiAccess = true;
                    }
                } catch (profileErr) {
                    // Profile check failed — not critical
                }
            }

            if (hasAiAccess) {
                showAiTools();
                loadDocuments();
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

    // ── Event listeners ─────────────────────────────────────────

    function setupEventListeners() {
        // Click to browse
        if (dropzone) {
            dropzone.addEventListener('click', function () {
                fileInput.click();
            });
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

        // Refresh button
        if (refreshBtn) {
            refreshBtn.addEventListener('click', loadDocuments);
        }

        // Summary panel — close
        if (summaryBackBtn) {
            summaryBackBtn.addEventListener('click', closeSummaryPanel);
        }
        if (summaryBackdrop) {
            summaryBackdrop.addEventListener('click', closeSummaryPanel);
        }

        // Summary panel — actions
        if (summaryCopyBtn) {
            summaryCopyBtn.addEventListener('click', copySummaryToClipboard);
        }
        if (summaryPrintBtn) {
            summaryPrintBtn.addEventListener('click', printSummary);
        }
        if (summaryRegenerateBtn) {
            summaryRegenerateBtn.addEventListener('click', regenerateSummary);
        }

        // ESC key to close panel
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && summaryPanel && summaryPanel.classList.contains('open')) {
                closeSummaryPanel();
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
                throw new Error(data.error || 'Upload failed');
            }

            setProgress(100);
            showToast('File uploaded! Processing your document...', 'success');

            if (data.upload_id) {
                startPolling(data.upload_id);
            }

            setTimeout(loadDocuments, 500);

        } catch (err) {
            console.error('[AI Tools] Upload failed:', err);
            showToast(err.message || 'Upload failed. Please try again.', 'error');
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

    function renderDocuments() {
        if (!documentsList) return;

        var cards = documentsList.querySelectorAll('.ai-doc-card');
        cards.forEach(function (c) { c.remove(); });

        if (documents.length === 0) {
            if (emptyState) emptyState.style.display = '';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        documents.forEach(function (doc) {
            var card = createDocumentCard(doc);
            documentsList.appendChild(card);
        });
    }

    function createDocumentCard(doc) {
        var card = document.createElement('div');
        card.className = 'ai-doc-card';
        card.dataset.uploadId = doc.id;

        var iconClass = 'fa-file-pdf';
        if (doc.file_type === 'docx') iconClass = 'fa-file-word';
        if (doc.file_type === 'pptx') iconClass = 'fa-file-powerpoint';

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

        var sizeStr = formatFileSize(doc.file_size_bytes);
        var metaParts = [sizeStr];
        if (doc.page_count) metaParts.push(doc.page_count + ' pages');
        if (doc.chunk_count) metaParts.push(doc.chunk_count + ' chunks');

        var actionsHtml = '';
        if (doc.status === 'ready') {
            actionsHtml += '<button class="ai-doc-btn btn-summarize" data-action="summarize" data-doc-id="' + doc.id + '">Summarize</button>';
            actionsHtml += '<button class="ai-doc-btn btn-quiz" title="Coming in Phase 2">Quiz Me</button>';
        }
        actionsHtml += '<button class="ai-doc-btn btn-delete" data-action="delete" data-doc-id="' + doc.id + '" title="Delete"><i class="fas fa-trash-alt"></i></button>';

        card.innerHTML =
            '<div class="ai-doc-icon"><i class="fas ' + iconClass + '"></i></div>' +
            '<div class="ai-doc-info">' +
            '  <div class="ai-doc-name">' + escapeHtml(doc.filename) + '</div>' +
            '  <div class="ai-doc-meta">' + metaParts.join(' &bull; ') + '</div>' +
            '</div>' +
            statusHtml +
            '<div class="ai-doc-actions">' + actionsHtml + '</div>';

        var summarizeBtn = card.querySelector('[data-action="summarize"]');
        if (summarizeBtn) {
            summarizeBtn.addEventListener('click', function () {
                requestSummary(doc.id, doc.filename);
            });
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

    // ── Summarize ───────────────────────────────────────────────

    async function requestSummary(docId, filename) {
        var btn = document.querySelector('[data-action="summarize"][data-doc-id="' + docId + '"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="ai-spinner"></span> Generating...';
        }

        try {
            var data = await apiCall('/api/ai/summarize/' + docId, {
                method: 'POST'
            });

            if (data && data.content) {
                openSummaryPanel(docId, filename, data.content);
            } else if (data && data.status === 'generating') {
                showToast('Summary is being generated. Please wait a moment and try again.', 'info');
            } else {
                throw new Error(data.error || 'No content returned');
            }

        } catch (err) {
            console.error('[AI Tools] Summarize failed:', err);
            showToast(err.message || 'Summary generation failed. Please try again.', 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Summarize';
            }
        }
    }

    // ── Delete document ─────────────────────────────────────────

    async function deleteDocument(docId, filename) {
        if (!confirm('Delete "' + filename + '"? This will also remove any generated summaries.')) {
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

    // ── Summary panel ───────────────────────────────────────────

    function openSummaryPanel(docId, filename, markdownContent) {
        currentSummaryDocId = docId;
        currentSummaryFilename = filename;
        currentSummaryMarkdown = markdownContent;

        if (summaryDocName) summaryDocName.textContent = filename;
        if (summaryContent) summaryContent.innerHTML = renderMarkdown(markdownContent);

        // Show backdrop with fade
        if (summaryBackdrop) {
            summaryBackdrop.classList.remove('hidden');
            summaryBackdrop.offsetHeight; // force reflow
            summaryBackdrop.classList.add('visible');
        }

        // Show panel with slide
        if (summaryPanel) {
            summaryPanel.classList.remove('hidden');
            summaryPanel.offsetHeight; // force reflow
            summaryPanel.classList.add('open');
        }

        document.body.style.overflow = 'hidden';
    }

    function closeSummaryPanel() {
        if (summaryPanel) summaryPanel.classList.remove('open');
        if (summaryBackdrop) summaryBackdrop.classList.remove('visible');
        document.body.style.overflow = '';

        setTimeout(function () {
            if (summaryPanel) summaryPanel.classList.add('hidden');
            if (summaryBackdrop) summaryBackdrop.classList.add('hidden');
        }, 350);

        currentSummaryDocId = null;
        currentSummaryFilename = null;
        currentSummaryMarkdown = null;
    }

    // ── Summary actions ─────────────────────────────────────────

    function copySummaryToClipboard() {
        if (!currentSummaryMarkdown) return;

        navigator.clipboard.writeText(currentSummaryMarkdown).then(function () {
            if (summaryCopyBtn) {
                var originalHTML = summaryCopyBtn.innerHTML;
                summaryCopyBtn.innerHTML = '<i class="fas fa-check"></i><span class="ai-toolbar-label">Copied!</span>';
                setTimeout(function () {
                    summaryCopyBtn.innerHTML = originalHTML;
                }, 2000);
            }
            showToast('Summary copied to clipboard!', 'success');
        }).catch(function () {
            // Fallback for older browsers
            var textarea = document.createElement('textarea');
            textarea.value = currentSummaryMarkdown;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('Summary copied to clipboard!', 'success');
        });
    }

    function printSummary() {
        window.print();
    }

    async function regenerateSummary() {
        if (!currentSummaryDocId) return;

        var docId = currentSummaryDocId;

        if (summaryRegenerateBtn) {
            summaryRegenerateBtn.disabled = true;
            summaryRegenerateBtn.innerHTML = '<span class="ai-spinner" style="border-color:rgba(255,255,255,.3);border-top-color:#fff;width:12px;height:12px"></span><span class="ai-toolbar-label">Regenerating...</span>';
        }

        try {
            var data = await apiCall('/api/ai/summarize/' + docId, {
                method: 'POST',
                body: JSON.stringify({ regenerate: true }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (data && data.content) {
                currentSummaryMarkdown = data.content;
                if (summaryContent) summaryContent.innerHTML = renderMarkdown(data.content);
                if (summaryBody) summaryBody.scrollTop = 0;
                showToast('Summary regenerated!', 'success');
            } else {
                throw new Error(data.error || 'No content returned');
            }
        } catch (err) {
            console.error('[AI Tools] Regenerate failed:', err);
            showToast(err.message || 'Regeneration failed. Please try again.', 'error');
        } finally {
            if (summaryRegenerateBtn) {
                summaryRegenerateBtn.disabled = false;
                summaryRegenerateBtn.innerHTML = '<i class="fas fa-arrows-rotate"></i><span class="ai-toolbar-label">Regenerate</span>';
            }
        }
    }

    // ── Markdown renderer ───────────────────────────────────────
    // Converts markdown to HTML with callout boxes for nursing content.

    function renderMarkdown(md) {
        if (!md) return '';

        var html = escapeHtml(md);

        // Headings (### before ## before #)
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Horizontal rules
        html = html.replace(/^---$/gm, '<hr>');

        // Blockquote callout boxes — detect labeled patterns
        html = html.replace(/^&gt; <strong>(?:Key (?:Concept|Point|Takeaway)s?):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--key"><div class="ai-callout-header"><i class="fas fa-star"></i> Key Concept</div>$1</div>');
        html = html.replace(/^&gt; <strong>(?:Warning|Caution|Alert|Safety):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--warning"><div class="ai-callout-header"><i class="fas fa-exclamation-triangle"></i> Warning</div>$1</div>');
        html = html.replace(/^&gt; <strong>(?:Tip|Clinical (?:Tip|Pearl)|Nursing Tip):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--tip"><div class="ai-callout-header"><i class="fas fa-lightbulb"></i> Clinical Tip</div>$1</div>');
        html = html.replace(/^&gt; <strong>NCLEX[- ]?(?:Tip|Alert|Focus):?<\/strong> ?(.+)$/gm,
            '<div class="ai-callout ai-callout--nclex"><div class="ai-callout-header"><i class="fas fa-graduation-cap"></i> NCLEX Focus</div>$1</div>');
        // Generic blockquotes
        html = html.replace(/^&gt; (.+)$/gm,
            '<div class="ai-callout ai-callout--key">$1</div>');

        // Unordered lists (lines starting with - )
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

        // Numbered lists (lines starting with digits.)
        html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

        // Wrap consecutive <li> items in <ul>
        html = html.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, function (match) {
            return '<ul>' + match + '</ul>';
        });

        // Paragraphs — double newlines
        html = html.replace(/\n\n+/g, '</p><p>');
        html = '<p>' + html + '</p>';

        // Clean up empty paragraphs and misplaced <p> tags
        html = html.replace(/<p>\s*<\/p>/g, '');
        html = html.replace(/<p>(<h[1-3]>)/g, '$1');
        html = html.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul>)/g, '$1');
        html = html.replace(/(<\/ul>)<\/p>/g, '$1');
        html = html.replace(/<p>(<hr>)<\/p>/g, '$1');
        html = html.replace(/<p>(<div class="ai-callout)/g, '$1');
        html = html.replace(/(<\/div>)<\/p>/g, '$1');

        // Single newlines -> <br> inside paragraphs
        html = html.replace(/\n/g, '<br>');

        // Detect Quick Review / Key Takeaways section and wrap it
        html = html.replace(/<h2>(Quick Review|Key Takeaways|Top 10 Things to Remember)<\/h2>/gi, function (match, title) {
            return '<div class="ai-quick-review"><h2><i class="fas fa-clipboard-check"></i> ' + escapeHtml(title) + '</h2>';
        });
        // Close the quick-review div if opened (append at end)
        if (html.indexOf('ai-quick-review') !== -1) {
            html = html + '</div>';
        }

        return html;
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
            toast.textContent = message;
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
