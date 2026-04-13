// Guide Page JavaScript
// Handles authentication, access verification, PDF generation, and UI interactions

// Configuration - set by data attributes on body element
const PRODUCT_ID = document.body.dataset.productId || 'heart-failure';
const GUIDE_NAME = document.body.dataset.guideName || 'Heart-Failure';
const API_URL = (function() {
    const hostname = window.location.hostname;
    if (hostname === 'thenursingcollective.pro' || hostname === 'www.thenursingcollective.pro') {
        return 'https://api.thenursingcollective.pro';
    }
    return 'https://staging-backend-production-365a.up.railway.app';
})();

// Check for print token in URL (used for server-side PDF generation)
const urlParams = new URLSearchParams(window.location.search);
const PRINT_TOKEN = urlParams.get('print_token');

// Force light mode on guide pages (don't affect global preference)
document.documentElement.removeAttribute('data-theme');

// Get auth token from localStorage (same as api-service.js)
function getAuthToken() {
    return localStorage.getItem('accessToken');
}

// Show access denied overlay
function showAccessDenied(message, showLoginButton = true) {
    // Hide the document content
    const documentContainer = document.querySelector('.document-container');
    if (documentContainer) {
        documentContainer.style.display = 'none';
    }

    // Create access denied overlay
    const overlay = document.createElement('div');
    overlay.className = 'access-denied-overlay';
    overlay.innerHTML = `
        <div class="access-denied-content">
            <div class="access-denied-icon">
                <i class="fas fa-lock"></i>
            </div>
            <h2>Access Restricted</h2>
            <p class="access-denied-message"></p>
            <div class="access-denied-actions">
                ${showLoginButton ? `
                    <a href="../login.html?redirect=guides/${PRODUCT_ID}" class="btn-primary">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </a>
                ` : ''}
                <a href="../dashboard.html" class="btn-secondary">
                    <i class="fas fa-arrow-left"></i> Go to Dashboard
                </a>
                <a href="../pricing.html" class="btn-tertiary">
                    <i class="fas fa-rocket"></i> View Plans
                </a>
            </div>
        </div>
    `;

    // Set message text safely (avoid XSS)
    overlay.querySelector('.access-denied-message').textContent = message;

    // Add styles for the overlay
    const style = document.createElement('style');
    style.textContent = `
        .access-denied-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(13,27,42,0.85);
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            padding: 20px;
        }
        .access-denied-content {
            background: #162032;
            border: 0.5px solid rgba(255,255,255,0.12);
            border-radius: 14px;
            padding: 40px 36px;
            text-align: center;
            max-width: 440px;
        }
        .access-denied-icon {
            width: 52px;
            height: 52px;
            background: rgba(224,82,82,0.12);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }
        .access-denied-icon i {
            font-size: 22px;
            color: #e05252;
        }
        .access-denied-content h2 {
            font-family: 'DM Serif Display', serif;
            font-size: 22px;
            font-weight: 400;
            color: #e8edf2;
            margin-bottom: 8px;
        }
        .access-denied-content p {
            color: #8a9bb0;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 24px;
        }
        .access-denied-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .access-denied-actions a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 22px;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 13px;
            text-decoration: none;
            transition: all 0.15s;
        }
        .btn-primary {
            background: #0fbcad;
            color: #0d1b2a;
        }
        .btn-primary:hover {
            background: #0a9086;
        }
        .btn-secondary {
            background: transparent;
            color: #8a9bb0;
            border: 0.5px solid rgba(255,255,255,0.12);
        }
        .btn-secondary:hover {
            border-color: rgba(255,255,255,0.2);
            color: #e8edf2;
        }
        .btn-tertiary {
            background: transparent;
            color: #0fbcad;
            border: 0.5px solid rgba(15,188,173,0.3);
        }
        .btn-tertiary:hover {
            border-color: #0fbcad;
            background: rgba(15,188,173,0.08);
        }
        @media (max-width: 480px) {
            .access-denied-content {
                padding: 32px 24px;
            }
            .access-denied-content h2 {
                font-size: 20px;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);
}

// Show loading state
function showLoading() {
    const documentContainer = document.querySelector('.document-container');
    if (documentContainer) {
        documentContainer.style.opacity = '0.5';
    }
}

// Hide loading state
function hideLoading() {
    const documentContainer = document.querySelector('.document-container');
    if (documentContainer) {
        documentContainer.style.opacity = '1';
    }
}

// Validate print token with backend (for server-side PDF generation)
async function validatePrintToken(token) {
    try {
        const response = await fetch(`${API_URL}/api/guides/validate-print-token?token=${encodeURIComponent(token)}&product_id=${encodeURIComponent(PRODUCT_ID)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.valid === true;
        }
        return false;
    } catch (error) {
        console.error('Print token validation error:', error);
        return false;
    }
}

// Verify user has access to this guide
async function verifyAccess() {
    showLoading();

    // Check for print token (server-side PDF generation)
    if (PRINT_TOKEN) {
        const isValidPrintToken = await validatePrintToken(PRINT_TOKEN);
        if (isValidPrintToken) {
            hideLoading();
            return true;
        }
        // Invalid token - fall through to normal auth check
    }

    // Check if user is logged in
    const token = getAuthToken();
    if (!token) {
        showAccessDenied('Please sign in to access this study guide. An active subscription is required.', true);
        return false;
    }

    try {
        // Verify user's subscription access via API
        const response = await fetch(`${API_URL}/api/guides/purchased`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        // Handle 401 - token expired
        if (response.status === 401) {
            // Try to refresh token
            try {
                await refreshAccessToken();
                // Retry verification with new token
                return await verifyAccess();
            } catch (refreshError) {
                showAccessDenied('Your session has expired. Please sign in again to access this guide.', true);
                return false;
            }
        }

        if (!response.ok) {
            throw new Error('Failed to verify access');
        }

        const data = await response.json();
        const guides = data.purchased_guides || [];

        // Check if user has access to this guide via subscription
        const hasAccess = data.has_premium || data.all_guides_access || guides.some(g => g.product_id === PRODUCT_ID);

        if (!hasAccess) {
            showAccessDenied(
                `You don't have access to this study guide. Please subscribe to unlock all guides.`,
                false
            );
            return false;
        }

        // User has access - show the content
        hideLoading();
        return true;

    } catch (error) {
        console.error('Access verification error:', error);
        showAccessDenied('Unable to verify your access. Please try again or contact support.', false);
        return false;
    }
}

// Refresh access token (simplified version for guide pages)
async function refreshAccessToken() {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('tokenTimestamp', Date.now().toString());
    return data.access_token;
}

// Smooth scroll for TOC links
document.querySelectorAll('.table-of-contents a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Track download event
async function trackDownload(source) {
    try {
        const token = getAuthToken();
        if (!token) {
            return;
        }

        const response = await fetch(`${API_URL}/api/downloads/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                product_id: PRODUCT_ID,
                source: source,
                timestamp: new Date().toISOString()
            })
        });

        // Download tracked successfully
    } catch (error) {
        console.error('Failed to track download:', error);
    }
}

// Download PDF from R2 storage via presigned URL
async function downloadPDF(btn) {
    const originalText = btn ? btn.innerHTML : '';

    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
        btn.disabled = true;
    }

    try {
        // Track the download
        await trackDownload('guide_page');

        const token = getAuthToken();
        if (!token) {
            throw new Error('Please log in to download guides');
        }

        // Get the presigned URL from the backend
        const response = await fetch(`${API_URL}/api/guides/${PRODUCT_ID}/pdf`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to get download URL');
        }

        const data = await response.json();

        if (!data.success || !data.redirect_url) {
            throw new Error(data.message || 'Download URL not available');
        }

        // Update button to show downloading state
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading PDF...';
        }

        // Fetch the actual PDF from the presigned R2 URL
        const pdfResponse = await fetch(data.redirect_url);

        if (!pdfResponse.ok) {
            throw new Error('Failed to download PDF from storage');
        }

        // Get the PDF as a blob
        const pdfBlob = await pdfResponse.blob();

        // Create a download link
        const downloadUrl = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `TNC-${GUIDE_NAME}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);

        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }
    } catch (error) {
        console.error('PDF download error:', error);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }
        // Show error message to user
        if (typeof showAlert === 'function') {
            showAlert('Download Failed', error.message || 'Unable to download PDF. Please try again or contact support.', 'error');
        }
    }
}

// Download PDF button handler
const downloadBtn = document.getElementById('download-pdf-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        downloadPDF(this);
    });
}

// Initialize page - verify access on load
document.addEventListener('DOMContentLoaded', async function() {
    // Verify user has access to this guide
    const hasAccess = await verifyAccess();

    if (hasAccess) {
        // Record study activity (localStorage + server sync)
        try {
            var lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
            lastStudied[PRODUCT_ID] = new Date().toISOString();
            localStorage.setItem('guideLastStudied', JSON.stringify(lastStudied));

            // Fire-and-forget server sync
            var token = getAuthToken();
            if (token) {
                fetch(API_URL + '/api/study/record', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ guide_id: PRODUCT_ID })
                }).catch(function() { /* ignore sync failures */ });
            }
        } catch (e) { /* ignore localStorage errors */ }

        // Initialize sidebars if config is defined
        if (typeof sidebarConfig !== 'undefined' && typeof initializeGuideSidebars === 'function') {
            initializeGuideSidebars(sidebarConfig);
        }

        // Check for auto-download parameter (from dashboard PDF button)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('print') === 'true' || urlParams.get('download') === 'true') {
            // Auto-trigger PDF download after page loads
            setTimeout(() => {
                downloadPDF(document.getElementById('download-pdf-btn'));
            }, 500);
        }
    }
});
