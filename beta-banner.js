/**
 * Beta Banner
 * Injects a warm-light banner above the navbar on every page.
 * Dismissible — remembered in localStorage so it stays hidden.
 *
 * To remove after beta: delete this file and remove the
 * <script src="beta-banner.js"></script> tags from all pages.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'tnc_beta_banner_dismissed';
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;

    // Build banner
    var banner = document.createElement('div');
    banner.className = 'beta-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML =
        '<div class="beta-banner-content">' +
            '<span class="beta-banner-badge">BETA</span>' +
            '<span class="beta-banner-text">' +
                "You're using an early version of The Nursing Collective. " +
                'Found a bug? <a href="/contact.html" class="beta-banner-link" id="beta-report-bug">Let us know</a>' +
            '</span>' +
            '<button class="beta-banner-close" aria-label="Dismiss beta banner">&times;</button>' +
        '</div>';

    // Inject styles — uses CSS custom property for reliable navbar offset
    var style = document.createElement('style');
    style.textContent =
        '.beta-banner {' +
            'background: var(--navy-3, #f1ece4);' +
            'border-bottom: 1px solid var(--border-mid, rgba(58,44,26,0.17));' +
            'padding: 8px 16px;' +
            'font-family: "Outfit", sans-serif;' +
            'font-size: 13px;' +
            'line-height: 1.4;' +
            'position: fixed;' +
            'top: 0;' +
            'left: 0;' +
            'right: 0;' +
            'z-index: 1050;' +
            'pointer-events: auto;' +
        '}' +
        '.beta-banner-content {' +
            'max-width: 1200px;' +
            'margin: 0 auto;' +
            'display: flex;' +
            'align-items: center;' +
            'justify-content: center;' +
            'gap: 10px;' +
        '}' +
        '.beta-banner-badge {' +
            'font-family: "DM Mono", monospace;' +
            'background: var(--teal-soft, rgba(14,154,143,0.12));' +
            'color: var(--teal-dim, #0b7d74);' +
            'border: 1px solid rgba(14,154,143,0.28);' +
            'font-weight: 500;' +
            'font-size: 10px;' +
            'padding: 2px 8px;' +
            'border-radius: 10px;' +
            'letter-spacing: 0.08em;' +
            'flex-shrink: 0;' +
        '}' +
        '.beta-banner-text {' +
            'color: var(--text-dim, #6a6157);' +
        '}' +
        '.beta-banner-link {' +
            'color: var(--teal-dim, #0b7d74);' +
            'font-weight: 500;' +
            'text-decoration: none;' +
            'cursor: pointer;' +
            'position: relative;' +
            'z-index: 1;' +
            'transition: color 0.15s;' +
        '}' +
        '.beta-banner-link:hover {' +
            'color: var(--text, #2b2621);' +
        '}' +
        '.beta-banner-close {' +
            'background: none;' +
            'border: none;' +
            'font-size: 16px;' +
            'color: var(--text-dimmer, #8a8073);' +
            'cursor: pointer;' +
            'padding: 0 4px;' +
            'line-height: 1;' +
            'flex-shrink: 0;' +
            'transition: color 0.15s;' +
        '}' +
        '.beta-banner-close:hover {' +
            'color: var(--text, #2b2621);' +
        '}' +
        /* Push fixed navbar and body content down when banner is visible */
        'body.has-beta-banner {' +
            'padding-top: var(--beta-banner-h, 0px);' +
        '}' +
        'body.has-beta-banner .navbar {' +
            'top: var(--beta-banner-h, 0px) !important;' +
        '}' +
        '@media (max-width: 480px) {' +
            '.beta-banner { padding: 6px 12px; font-size: 12px; }' +
            '.beta-banner-badge { font-size: 9px; padding: 1px 6px; }' +
        '}';

    document.head.appendChild(style);

    var inserted = false;

    function applyOffset() {
        if (!inserted) return;
        var h = banner.offsetHeight;
        document.documentElement.style.setProperty('--beta-banner-h', h + 'px');
    }

    function removeOffset() {
        document.body.classList.remove('has-beta-banner');
        document.documentElement.style.removeProperty('--beta-banner-h');
    }

    function insertBanner() {
        if (!document.body || inserted) return;
        inserted = true;

        // Insert as first child of body
        document.body.insertBefore(banner, document.body.firstChild);
        document.body.classList.add('has-beta-banner');

        // Set the CSS custom property for navbar offset
        requestAnimationFrame(applyOffset);
        window.addEventListener('resize', applyOffset);

        // Dismiss button
        banner.querySelector('.beta-banner-close').addEventListener('click', function () {
            banner.remove();
            removeOffset();
            window.removeEventListener('resize', applyOffset);
            localStorage.setItem(STORAGE_KEY, 'true');
        });

        // "Let us know" link — try feedback widget first, fall back to contact page
        var bugLink = document.getElementById('beta-report-bug');
        if (bugLink) {
            bugLink.addEventListener('click', function (e) {
                if (typeof window.openFeedbackWidget === 'function') {
                    e.preventDefault();
                    e.stopPropagation();
                    window.openFeedbackWidget('bug');
                }
                // Otherwise the normal href="/contact.html" navigates
            });
        }
    }

    function tryInsert() {
        insertBanner();
    }

    // Body may not exist yet if script is in <head>
    if (document.body) {
        tryInsert();
    } else {
        document.addEventListener('DOMContentLoaded', tryInsert);
    }
})();
