/**
 * Custom Modal System - Professional replacement for browser alert() and confirm()
 *
 * Usage:
 *   showAlert('Success!', 'Your changes have been saved.', 'success');
 *   showConfirm('Are you sure?', 'This action cannot be undone.', 'warning').then(confirmed => {
 *       if (confirmed) { ... }
 *   });
 */

// Create modal overlay and container
function initializeModalSystem() {
    if (document.getElementById('custom-modal-overlay')) {
        return; // Already initialized
    }

    const overlay = document.createElement('div');
    overlay.id = 'custom-modal-overlay';
    overlay.className = 'custom-modal-overlay';

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.body.appendChild(overlay);
}

// Close modal with animation
function closeModal() {
    const overlay = document.getElementById('custom-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.innerHTML = '';
        }, 300);
    }
}

// Show alert modal (replaces alert())
function showAlert(title, message, type = 'info') {
    initializeModalSystem();

    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle'
    };

    const icon = icons[type] || icons.info;

    const overlay = document.getElementById('custom-modal-overlay');
    overlay.innerHTML = `
        <div class="custom-modal">
            <div class="custom-modal-header">
                <div class="custom-modal-icon ${type}">
                    <i class="fas ${icon}"></i>
                </div>
                <h2 class="custom-modal-title">${title}</h2>
            </div>
            <div class="custom-modal-body">
                <p class="custom-modal-message">${message}</p>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn primary" id="modal-ok-btn">
                    <i class="fas fa-check"></i>
                    OK
                </button>
            </div>
        </div>
    `;

    overlay.classList.add('active');

    return new Promise((resolve) => {
        const okBtn = document.getElementById('modal-ok-btn');
        okBtn.addEventListener('click', () => {
            closeModal();
            resolve(true);
        });

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                resolve(true);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
}

// Show confirmation modal (replaces confirm())
function showConfirm(title, message, type = 'question', confirmText = 'Confirm', cancelText = 'Cancel') {
    initializeModalSystem();

    const icons = {
        question: 'fa-question-circle',
        warning: 'fa-exclamation-triangle',
        danger: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    const icon = icons[type] || icons.question;

    const overlay = document.getElementById('custom-modal-overlay');
    overlay.innerHTML = `
        <div class="custom-modal">
            <div class="custom-modal-header">
                <div class="custom-modal-icon ${type}">
                    <i class="fas ${icon}"></i>
                </div>
                <h2 class="custom-modal-title">${title}</h2>
            </div>
            <div class="custom-modal-body">
                <p class="custom-modal-message">${message}</p>
            </div>
            <div class="custom-modal-footer">
                <button class="custom-modal-btn secondary" id="modal-cancel-btn">
                    <i class="fas fa-times"></i>
                    ${cancelText}
                </button>
                <button class="custom-modal-btn ${type === 'danger' ? 'danger' : 'primary'}" id="modal-confirm-btn">
                    <i class="fas fa-check"></i>
                    ${confirmText}
                </button>
            </div>
        </div>
    `;

    overlay.classList.add('active');

    return new Promise((resolve) => {
        const confirmBtn = document.getElementById('modal-confirm-btn');
        const cancelBtn = document.getElementById('modal-cancel-btn');

        confirmBtn.addEventListener('click', () => {
            closeModal();
            resolve(true);
        });

        cancelBtn.addEventListener('click', () => {
            closeModal();
            resolve(false);
        });

        // Close on Escape key (counts as cancel)
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                resolve(false);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
}

// Success notification (auto-dismiss)
function showSuccess(message, duration = 3000) {
    initializeModalSystem();

    const overlay = document.getElementById('custom-modal-overlay');
    overlay.innerHTML = `
        <div class="custom-modal">
            <div class="custom-modal-header">
                <div class="custom-modal-icon success">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2 class="custom-modal-title">Success</h2>
            </div>
            <div class="custom-modal-body">
                <p class="custom-modal-message">${message}</p>
            </div>
        </div>
    `;

    overlay.classList.add('active');

    setTimeout(() => {
        closeModal();
    }, duration);
}

// Error notification (manual dismiss)
function showError(message, title = 'Error') {
    return showAlert(title, message, 'error');
}

// Initialize modal system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModalSystem);
} else {
    initializeModalSystem();
}
