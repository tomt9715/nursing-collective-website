/**
 * AI Study Tools — Phase 1: Upload + Summarize
 * Handles file upload, document management, and AI summary generation.
 * Relies on api-service.js for API_URL and apiCall().
 */
(function () {
    'use strict';

    // ── DOM elements ────────────────────────────────────────────
    const aiSection = document.getElementById('ai-tools-section');
    const upgradePrompt = document.getElementById('ai-upgrade-prompt');
    const sidebarLink = document.getElementById('sidebar-ai-tools');
    const dropzone = document.getElementById('ai-upload-dropzone');
    const fileInput = document.getElementById('ai-file-input');
    const progressContainer = document.getElementById('ai-upload-progress');
    const progressFilename = document.getElementById('ai-progress-filename');
    const progressPct = document.getElementById('ai-progress-pct');
    const progressFill = document.getElementById('ai-progress-fill');
    const documentsList = document.getElementById('ai-documents-list');
    const emptyState = document.getElementById('ai-empty-state');
    const refreshBtn = document.getElementById('ai-refresh-btn');
    const summaryOverlay = document.getElementById('ai-summary-overlay');
    const summaryTitle = document.getElementById('ai-summary-title');
    const summaryContent = document.getElementById('ai-summary-content');
    const summaryClose = document.getElementById('ai-summary-close');

    // ── State ───────────────────────────────────────────────────
    let documents = [];
    let pollingTimers = {};    // upload_id -> setInterval id
    let hasAiAccess = false;

    // ── Initialization ──────────────────────────────────────────

    function init() {
        // Wait for auth token to be available, then check AI access.
        // The token is set by auth-script.js or login flow into localStorage.
        var token = localStorage.getItem('accessToken');
        if (!token) {
            // No token yet — wait briefly in case page just loaded
            setTimeout(function () {
                token = localStorage.getItem('accessToken');
                if (token) {
                    checkAiAccess();
                } else {
                    showUpgradePrompt();
                }
            }, 1500);
        } else {
            // Token exists — small delay to let other dashboard calls settle
            setTimeout(checkAiAccess, 300);
        }
    }

    async function checkAiAccess() {
        try {
            // Check subscription status — look for ai-* plan
            var data = await apiCall('/api/subscription-status');
            if (data && data.has_access && data.subscription) {
                var planId = data.subscription.plan_id || '';
                if (planId.startsWith('ai-') || data.subscription.is_ai_plan) {
                    hasAiAccess = true;
                }
            }

            // Also allow admin access via profile check
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
        if (aiSection) aiSection.classList.remove('hidden');
        if (upgradePrompt) upgradePrompt.classList.add('hidden');
        if (sidebarLink) sidebarLink.style.display = '';
        setupEventListeners();
    }

    function showUpgradePrompt() {
        if (aiSection) aiSection.classList.add('hidden');
        if (upgradePrompt) upgradePrompt.classList.remove('hidden');
        if (sidebarLink) sidebarLink.style.display = 'none';
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
                    fileInput.value = ''; // Reset for same file re-upload
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

        // Close summary modal
        if (summaryClose) {
            summaryClose.addEventListener('click', closeSummaryModal);
        }
        if (summaryOverlay) {
            summaryOverlay.addEventListener('click', function (e) {
                if (e.target === summaryOverlay) closeSummaryModal();
            });
        }

        // ESC key to close modal
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && summaryOverlay && !summaryOverlay.classList.contains('hidden')) {
                closeSummaryModal();
            }
        });
    }

    // ── File upload ─────────────────────────────────────────────

    async function uploadFile(file) {
        // Client-side validation
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

        // Show progress
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

            // Start polling for status
            if (data.upload_id) {
                startPolling(data.upload_id);
            }

            // Refresh document list
            setTimeout(loadDocuments, 500);

        } catch (err) {
            console.error('[AI Tools] Upload failed:', err);
            showToast(err.message || 'Upload failed. Please try again.', 'error');
        } finally {
            // Hide progress after a moment
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

            // Start polling for any documents still processing
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

        // Clear existing cards (keep empty state)
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

        // File icon based on type
        var iconClass = 'fa-file-pdf';
        if (doc.file_type === 'docx') iconClass = 'fa-file-word';
        if (doc.file_type === 'pptx') iconClass = 'fa-file-powerpoint';

        // Status badge
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

        // File size display
        var sizeStr = formatFileSize(doc.file_size_bytes);

        // Meta info
        var metaParts = [sizeStr];
        if (doc.page_count) metaParts.push(doc.page_count + ' pages');
        if (doc.chunk_count) metaParts.push(doc.chunk_count + ' chunks');

        // Action buttons
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

        // Attach event listeners
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
        if (pollingTimers[uploadId]) return; // Already polling

        pollingTimers[uploadId] = setInterval(async function () {
            try {
                var data = await apiCall('/api/ai/documents/' + uploadId + '/status');
                if (data && (data.status === 'ready' || data.status === 'failed')) {
                    stopPolling(uploadId);
                    loadDocuments(); // Refresh the list

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
        }, 3000); // Poll every 3 seconds
    }

    function stopPolling(uploadId) {
        if (pollingTimers[uploadId]) {
            clearInterval(pollingTimers[uploadId]);
            delete pollingTimers[uploadId];
        }
    }

    // ── Summarize ───────────────────────────────────────────────

    async function requestSummary(docId, filename) {
        // Disable the button while generating
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
                openSummaryModal(filename, data.content);
            } else if (data && data.status === 'generating') {
                showToast('Summary is being generated. Please wait a moment and try again.', 'info');
            } else {
                throw new Error(data.error || 'No content returned');
            }

        } catch (err) {
            console.error('[AI Tools] Summarize failed:', err);
            showToast(err.message || 'Summary generation failed. Please try again.', 'error');
        } finally {
            // Re-enable button
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

    // ── Summary modal ───────────────────────────────────────────

    function openSummaryModal(filename, markdownContent) {
        if (summaryTitle) summaryTitle.textContent = 'Review Sheet: ' + filename;
        if (summaryContent) summaryContent.innerHTML = renderMarkdown(markdownContent);
        if (summaryOverlay) summaryOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeSummaryModal() {
        if (summaryOverlay) summaryOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // ── Simple markdown renderer ────────────────────────────────
    // Converts basic markdown to HTML. Not a full parser, but handles
    // headings, bold, bullets, numbered lists, and code.

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

        // Unordered lists (lines starting with - )
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

        // Numbered lists (lines starting with digits.)
        html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

        // Wrap consecutive <li> items in <ul>
        html = html.replace(/(<li>.*<\/li>\n?)+/g, function (match) {
            return '<ul>' + match + '</ul>';
        });

        // Paragraphs — double newlines
        html = html.replace(/\n\n+/g, '</p><p>');
        html = '<p>' + html + '</p>';

        // Clean up empty paragraphs
        html = html.replace(/<p>\s*<\/p>/g, '');
        html = html.replace(/<p>(<h[1-3]>)/g, '$1');
        html = html.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul>)/g, '$1');
        html = html.replace(/(<\/ul>)<\/p>/g, '$1');
        html = html.replace(/<p>(<hr>)<\/p>/g, '$1');

        // Single newlines -> <br> inside paragraphs
        html = html.replace(/\n/g, '<br>');

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
        // Use the existing toast system if available, otherwise alert
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        } else if (typeof window.showToast === 'function') {
            window.showToast(message, type);
        } else {
            // Fallback: create a simple toast
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
