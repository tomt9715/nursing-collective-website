// Guide Page JavaScript
// Handles authentication, access verification, PDF generation, and UI interactions

// Configuration - set by data attributes on body element
const PRODUCT_ID = document.body.dataset.productId || 'heart-failure';
const GUIDE_NAME = document.body.dataset.guideName || 'Heart-Failure';
const API_URL = 'https://api.thenursingcollective.pro';

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
            <p>${message}</p>
            <div class="access-denied-actions">
                ${showLoginButton ? `
                    <a href="../login.html?redirect=guides/${PRODUCT_ID}" class="btn-primary">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </a>
                ` : ''}
                <a href="../dashboard.html" class="btn-secondary">
                    <i class="fas fa-arrow-left"></i> Go to Dashboard
                </a>
                <a href="../store.html" class="btn-tertiary">
                    <i class="fas fa-shopping-cart"></i> View Store
                </a>
            </div>
        </div>
    `;

    // Add styles for the overlay
    const style = document.createElement('style');
    style.textContent = `
        .access-denied-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            padding: 20px;
        }
        .access-denied-content {
            background: white;
            border-radius: 16px;
            padding: 48px;
            text-align: center;
            max-width: 480px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .access-denied-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
        }
        .access-denied-icon i {
            font-size: 36px;
            color: white;
        }
        .access-denied-content h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.75rem;
            color: #1f2937;
            margin-bottom: 12px;
        }
        .access-denied-content p {
            color: #6b7280;
            font-size: 1.05rem;
            line-height: 1.6;
            margin-bottom: 32px;
        }
        .access-denied-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .access-denied-actions a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px 24px;
            border-radius: 10px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
        }
        .btn-primary {
            background: linear-gradient(135deg, #2E86AB, #A23B72);
            color: white;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(46, 134, 171, 0.4);
        }
        .btn-secondary {
            background: #f3f4f6;
            color: #374151;
        }
        .btn-secondary:hover {
            background: #e5e7eb;
        }
        .btn-tertiary {
            background: transparent;
            color: #2E86AB;
            border: 2px solid #2E86AB;
        }
        .btn-tertiary:hover {
            background: #2E86AB;
            color: white;
        }
        @media (max-width: 480px) {
            .access-denied-content {
                padding: 32px 24px;
            }
            .access-denied-content h2 {
                font-size: 1.5rem;
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
            console.log('Valid print token - allowing access for PDF generation');
            hideLoading();
            return true;
        }
        // Invalid token - fall through to normal auth check
        console.log('Invalid print token - falling back to normal auth');
    }

    // Check if user is logged in
    const token = getAuthToken();
    if (!token) {
        showAccessDenied('Please sign in to access this study guide. You must have purchased this guide to view it.', true);
        return false;
    }

    try {
        // Fetch user's purchases from backend API
        const response = await fetch(`${API_URL}/cart/purchases`, {
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
        const purchases = data.purchases || [];

        // Check if user has purchased this specific guide
        const hasPurchased = purchases.some(p => p.product_id === PRODUCT_ID);

        if (!hasPurchased) {
            showAccessDenied(
                `You don't have access to this study guide. Please purchase "${GUIDE_NAME.replace(/-/g, ' ')}" from our store to view it.`,
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
            console.log('No auth token - user not logged in, skipping tracking');
            return;
        }

        const response = await fetch(`${API_URL}/cart/downloads/track`, {
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

        if (response.ok) {
            console.log(`Download tracked: ${PRODUCT_ID} from ${source}`);
        }
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
        alert(error.message || 'Unable to download PDF. Please try again or contact support.');
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
        // Check for auto-download parameter (from dashboard PDF button)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('print') === 'true' || urlParams.get('download') === 'true') {
            // Auto-trigger PDF download after page loads
            setTimeout(() => {
                downloadPDF(document.getElementById('download-pdf-btn'));
            }, 500);
        }

        // Initialize sidebar TOC functionality
        initializeSidebarTOC();
    }
});

// ============================================
// SIDEBAR TOC FUNCTIONALITY
// ============================================

function initializeSidebarTOC() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.guide-section');
    const progressFill = document.querySelector('.toc-progress-fill');
    const progressPercent = document.querySelector('.toc-progress-percent');

    if (!tocLinks.length || !sections.length) return;

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Track active section and reading progress on scroll
    let ticking = false;

    function updateTOCState() {
        const scrollPosition = window.scrollY + 150; // Offset for header
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(Math.round((window.scrollY / documentHeight) * 100), 100);

        // Update progress bar
        if (progressFill) {
            progressFill.style.width = scrollPercent + '%';
        }
        if (progressPercent) {
            progressPercent.textContent = scrollPercent + '%';
        }

        // Find current active section
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // If we're past all sections, highlight the last one
        if (!currentSection && sections.length > 0) {
            const lastSection = sections[sections.length - 1];
            if (scrollPosition >= lastSection.offsetTop) {
                currentSection = lastSection.id;
            }
        }

        // Update active state on TOC links
        tocLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            if (linkSection === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateTOCState);
            ticking = true;
        }
    });

    // Initial state
    updateTOCState();
}
