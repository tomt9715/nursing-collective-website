// Email Verification Handler
(function() {
    // Use the global API_URL from api-service.js if available, otherwise detect environment
    const API_BASE = (typeof API_URL !== 'undefined' ? API_URL : (
        window.location.hostname === 'thenursingcollective.pro'
            ? 'https://api.thenursingcollective.pro'
            : 'https://staging-backend-production-365a.up.railway.app'
    )) + '/auth';

    const statusIcon = document.getElementById('status-icon');
    const statusTitle = document.getElementById('status-title');
    const statusMessage = document.getElementById('status-message');
    const actionButtons = document.getElementById('action-buttons');
    const confirmPrompt = document.getElementById('confirm-prompt');
    const confirmBtn = document.getElementById('confirm-email-btn');

    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        hidePrompt();
        showError('Invalid verification link. Please check your email and try again.');
        return;
    }

    // Verification happens on click, never on load.
    //
    // This page used to verify as soon as it rendered. Institutional mailboxes
    // run links through security scanners (Microsoft Defender Safe Links and
    // similar) that fetch and render them before anyone opens the message, so
    // accounts were being confirmed automatically — observed on a
    // student.mville.edu address that was verified without the email ever
    // being opened. Rendering the page now proves nothing; someone has to
    // press the button.
    if (confirmBtn) {
        confirmBtn.addEventListener('click', verifyNow);
    } else {
        // No button in the DOM (older cached markup): fall back to the old
        // behaviour rather than stranding someone on a dead page.
        verifyNow();
    }

    function hidePrompt() {
        if (confirmPrompt) confirmPrompt.style.display = 'none';
    }

    function verifyNow() {
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Confirming…</span>';
        }
        statusIcon.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--teal);"></i>';
        statusTitle.textContent = 'Confirming your email…';
        statusMessage.textContent = 'This takes a moment.';

        fetch(`${API_BASE}/verify-email?token=${encodeURIComponent(token)}`)
            .then(response => response.json())
            .then(data => {
                hidePrompt();
                if (data.error) {
                    showError(data.error);
                } else {
                    showSuccess(data.message || 'Email verified successfully!');
                }
            })
            .catch(error => {
                console.error('Verification error:', error);
                hidePrompt();
                showError('Failed to verify email. Please try again or contact support.');
            });
    }

    function showSuccess(message) {
        statusIcon.innerHTML = '<i class="fas fa-check-circle" style="color: #10b981;"></i>';
        statusTitle.textContent = 'Email Verified!';
        statusMessage.textContent = message;
        actionButtons.style.display = 'block';
    }

    function showError(message) {
        statusIcon.innerHTML = '<i class="fas fa-times-circle" style="color: #ef4444;"></i>';
        statusTitle.textContent = 'Verification Failed';
        statusMessage.textContent = message;
        actionButtons.innerHTML = `
            <a href="login.html" class="auth-btn primary" style="display: inline-block; text-decoration: none; margin-right: 12px;">
                <i class="fas fa-sign-in-alt"></i>
                <span>Go to Login</span>
            </a>
            <a href="mailto:support@thenursingcollective.pro" class="auth-btn" style="display: inline-block; text-decoration: none; background: var(--surface-color); color: var(--text-primary);">
                <i class="fas fa-envelope"></i>
                <span>Contact Support</span>
            </a>
        `;
        actionButtons.style.display = 'block';
    }
})();
