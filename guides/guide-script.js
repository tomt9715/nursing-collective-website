// Guide Page JavaScript
// Handles PDF generation, download tracking, and UI interactions

// Configuration - will be set by data attributes on body element
const PRODUCT_ID = document.body.dataset.productId || 'heart-failure';
const GUIDE_NAME = document.body.dataset.guideName || 'Heart-Failure';
const API_BASE = 'https://florencebot-backend-production.up.railway.app/api';

// Force light mode on guide pages (don't affect global preference)
document.documentElement.removeAttribute('data-theme');

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

// Get auth token from Firebase (if available) or localStorage
async function getAuthToken() {
    // Try Firebase first
    if (typeof firebase !== 'undefined' && firebase.auth) {
        const user = firebase.auth().currentUser;
        if (user) {
            return await user.getIdToken();
        }
    }
    // Fall back to localStorage
    const storedToken = localStorage.getItem('authToken');
    return storedToken;
}

// Track download event
async function trackDownload(source) {
    try {
        const token = await getAuthToken();
        if (!token) {
            console.log('No auth token - user not logged in, skipping tracking');
            return;
        }

        const response = await fetch(`${API_BASE}/cart/downloads/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
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
        // Don't block download if tracking fails
        console.error('Failed to track download:', error);
    }
}

// Generate and download PDF
async function generatePDF(btn) {
    const originalText = btn.innerHTML;

    // Show loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    btn.disabled = true;

    // Track the download
    await trackDownload('guide_page');

    try {
        const element = document.querySelector('.document-container');
        const filename = `TNC-${GUIDE_NAME}.pdf`;

        const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        await html2pdf().set(opt).from(element).save();

        btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('PDF generation error:', error);
        btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
        // Fallback to print dialog
        alert('PDF generation failed. Opening print dialog instead.');
        window.print();
    }
}

// Download PDF button handler
const downloadBtn = document.getElementById('download-pdf-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        generatePDF(this);
    });
}

// Check for auto-download parameter (from dashboard PDF button)
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('download') === 'true') {
        // Auto-trigger PDF download after a short delay to ensure page is loaded
        setTimeout(() => {
            const btn = document.getElementById('download-pdf-btn');
            if (btn) {
                generatePDF(btn);
            }
        }, 1000);
    }
});
