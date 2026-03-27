/**
 * Beta Banner
 * Injects a yellow banner above the navbar on every page.
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
                'Found a bug? <a href="contact.html" class="beta-banner-link" id="beta-report-bug">Let us know</a>' +
            '</span>' +
            '<button class="beta-banner-close" aria-label="Dismiss beta banner">&times;</button>' +
        '</div>';

    // Inject styles — uses CSS custom property for reliable navbar offset
    var style = document.createElement('style');
    style.textContent =
        '.beta-banner {' +
            'background: #fef3c7;' +
            'border-bottom: 1px solid #f59e0b;' +
            'padding: 8px 16px;' +
            'font-family: "Source Sans 3", "Segoe UI", sans-serif;' +
            'font-size: 0.88rem;' +
            'line-height: 1.4;' +
            'position: fixed;' +
            'top: 0;' +
            'left: 0;' +
            'right: 0;' +
            'z-index: 1050;' +
            'pointer-events: auto;' +
        '}' +
        '[data-theme="dark"] .beta-banner {' +
            'background: #78350f;' +
            'border-bottom-color: #b45309;' +
            'color: #fef3c7;' +
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
            'background: #f59e0b;' +
            'color: #fff;' +
            'font-weight: 700;' +
            'font-size: 0.7rem;' +
            'padding: 2px 8px;' +
            'border-radius: 4px;' +
            'letter-spacing: 0.5px;' +
            'flex-shrink: 0;' +
        '}' +
        '[data-theme="dark"] .beta-banner-badge {' +
            'background: #d97706;' +
        '}' +
        '.beta-banner-text {' +
            'color: #92400e;' +
        '}' +
        '[data-theme="dark"] .beta-banner-text {' +
            'color: #fde68a;' +
        '}' +
        '.beta-banner-link {' +
            'color: #92400e;' +
            'font-weight: 600;' +
            'text-decoration: underline;' +
            'cursor: pointer;' +
            'position: relative;' +
            'z-index: 1;' +
        '}' +
        '[data-theme="dark"] .beta-banner-link {' +
            'color: #fbbf24;' +
        '}' +
        '.beta-banner-link:hover {' +
            'color: #78350f;' +
        '}' +
        '[data-theme="dark"] .beta-banner-link:hover {' +
            'color: #fde68a;' +
        '}' +
        '.beta-banner-close {' +
            'background: none;' +
            'border: none;' +
            'font-size: 1.2rem;' +
            'color: #92400e;' +
            'cursor: pointer;' +
            'padding: 0 4px;' +
            'line-height: 1;' +
            'flex-shrink: 0;' +
            'opacity: 0.6;' +
        '}' +
        '[data-theme="dark"] .beta-banner-close {' +
            'color: #fde68a;' +
        '}' +
        '.beta-banner-close:hover {' +
            'opacity: 1;' +
        '}' +
        /* Push fixed navbar and body content down when banner is visible */
        'body.has-beta-banner {' +
            'padding-top: var(--beta-banner-h, 0px);' +
        '}' +
        'body.has-beta-banner .navbar {' +
            'top: var(--beta-banner-h, 0px) !important;' +
        '}' +
        '@media (max-width: 480px) {' +
            '.beta-banner { padding: 6px 12px; font-size: 0.82rem; }' +
            '.beta-banner-badge { font-size: 0.65rem; padding: 1px 6px; }' +
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
                    window.openFeedbackWidget('bug');
                }
                // Otherwise the normal href="contact.html" navigates
            });
        }
    }

    function tryInsert() {
        // If lockscreen is active (not yet unlocked), wait until dismissed
        var hasLockscriptTag = document.querySelector('script[src*="lockscreen.js"]');
        if (hasLockscriptTag && localStorage.getItem('tnc_site_unlocked') !== 'true') {
            // Poll localStorage — lockscreen sets the key when user unlocks
            var poll = setInterval(function () {
                if (localStorage.getItem('tnc_site_unlocked') === 'true') {
                    clearInterval(poll);
                    // Small delay to let lockscreen fade out
                    setTimeout(insertBanner, 400);
                }
            }, 300);
            return;
        }

        // If the lockscreen element is still in DOM (edge case), wait for removal
        var lockscreen = document.getElementById('site-lockscreen');
        if (lockscreen) {
            var observer = new MutationObserver(function () {
                if (!document.getElementById('site-lockscreen')) {
                    observer.disconnect();
                    insertBanner();
                }
            });
            observer.observe(document.body, { childList: true });
            return;
        }

        insertBanner();
    }

    // Body may not exist yet if script is in <head>
    if (document.body) {
        tryInsert();
    } else {
        document.addEventListener('DOMContentLoaded', tryInsert);
    }
})();
