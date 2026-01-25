// Guide Page JavaScript
// Handles PDF generation via browser print, download tracking, and UI interactions

// Configuration - set by data attributes on body element
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
    if (typeof firebase !== 'undefined' && firebase.auth) {
        const user = firebase.auth().currentUser;
        if (user) {
            return await user.getIdToken();
        }
    }
    return localStorage.getItem('authToken');
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
        console.error('Failed to track download:', error);
    }
}

// Print/Save as PDF function
async function printGuide(btn) {
    const originalText = btn ? btn.innerHTML : '';

    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        btn.disabled = true;
    }

    // Track the download
    await trackDownload('guide_page');

    // Small delay to let tracking complete
    await new Promise(r => setTimeout(r, 200));

    // Trigger browser print dialog
    window.print();

    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Done!';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

// Download PDF button handler
const downloadBtn = document.getElementById('download-pdf-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        printGuide(this);
    });
}

// Check for auto-print parameter (from dashboard PDF button)
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('print') === 'true') {
        // Auto-trigger print after page loads
        setTimeout(() => {
            printGuide(null);
        }, 500);
    }
});
