/**
 * Site Lockscreen
 * Blocks all page content until the correct password is entered.
 * Unlock persists in localStorage so you don't re-enter it every page.
 *
 * To change the password, update LOCKSCREEN_PASSWORD below.
 * To remove the lockscreen entirely, delete this file and remove
 * the <script src="lockscreen.js"></script> tags from all pages.
 */
(function() {
    'use strict';

    var LOCKSCREEN_PASSWORD = 'tomthomas';
    var STORAGE_KEY = 'tnc_site_unlocked';

    // Already unlocked — bail immediately
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;

    // Hide page content instantly (before DOM renders)
    document.documentElement.style.visibility = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Resolve the base path to root (lockscreen.js is always at root)
    // so we can reference assets/images/... correctly from any depth
    function getBasePath() {
        var scripts = document.querySelectorAll('script[src*="lockscreen.js"]');
        if (scripts.length > 0) {
            var src = scripts[scripts.length - 1].getAttribute('src');
            return src.replace('lockscreen.js', '');
        }
        return '';
    }

    function buildLockscreen() {
        // Restore visibility for the overlay only
        document.documentElement.style.visibility = 'visible';

        var base = getBasePath();
        var logoSrc = base + 'assets/images/the-nursing-collective-logo.webp';

        var overlay = document.createElement('div');
        overlay.id = 'site-lockscreen';

        overlay.innerHTML =
            '<div class="ls-card">' +
                /* Eyebrow */
                '<div class="ls-eyebrow">The Nursing Collective</div>' +

                /* Badge */
                '<div class="ls-badge">Coming Soon</div>' +

                /* Main message */
                '<h1 class="ls-title">Something Great is<br>on the <em>Way</em></h1>' +
                '<p class="ls-message">We\'re putting the finishing touches on The Nursing Collective \u2014 a comprehensive hub of study guides, practice questions, and resources built by nursing students, for nursing students.</p>' +

                /* Feature pills */
                '<div class="ls-features">' +
                    '<span class="ls-pill">Study Guides</span>' +
                    '<span class="ls-pill">Practice Questions</span>' +
                    '<span class="ls-pill">Community</span>' +
                '</div>' +

                /* Notify / contact section */
                '<div class="ls-contact-box">' +
                    '<p class="ls-contact-label">Want to know when we launch?</p>' +
                    '<div class="ls-contact-links">' +
                        '<a href="mailto:support@thenursingcollective.pro" class="ls-link">' +
                            '<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
                            'support@thenursingcollective.pro' +
                        '</a>' +
                        '<a href="https://discord.gg/y2Mh77wAV2" target="_blank" rel="noopener noreferrer" class="ls-link">' +
                            '<svg viewBox="0 0 127.14 96.36" width="16" height="12" fill="currentColor"><path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2.04a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2.04a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15zM42.45 65.69C36.18 65.69 31 60 31 53.05s5-12.68 11.45-12.68S54 46.09 53.89 53.05 48.84 65.69 42.45 65.69zm42.24 0C78.41 65.69 73.25 60 73.25 53.05s5-12.68 11.44-12.68S96.23 46.09 96.12 53.05 91.08 65.69 84.69 65.69z"/></svg>' +
                            'Join our Discord' +
                        '</a>' +
                    '</div>' +
                '</div>' +

                /* Divider */
                '<div class="ls-divider"></div>' +

                /* Password area — subtle, at the bottom */
                '<details class="ls-admin">' +
                    '<summary class="ls-admin-toggle">' +
                        '<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
                        ' Site Owner Access' +
                    '</summary>' +
                    '<div class="ls-form">' +
                        '<input type="password" id="ls-password" class="ls-input" placeholder="Enter password" autocomplete="off" />' +
                        '<button type="button" id="ls-submit" class="ls-btn">' +
                            '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
                        '</button>' +
                    '</div>' +
                    '<p id="ls-error" class="ls-error" style="display:none;">Incorrect password. Try again.</p>' +
                '</details>' +
            '</div>' +

            /* Footer */
            '<div class="ls-footer">' +
                '<p>&copy; ' + new Date().getFullYear() + ' The Nursing Collective. All rights reserved.</p>' +
            '</div>';

        var style = document.createElement('style');
        style.textContent =
            /* ===== LAYOUT ===== */
            '#site-lockscreen {' +
                'position: fixed; top: 0; left: 0; right: 0; bottom: 0;' +
                'background: #0d1b2a;' +
                'z-index: 999999;' +
                'display: flex; flex-direction: column;' +
                'align-items: center; justify-content: center;' +
                'padding: 24px;' +
                'font-family: "Outfit", sans-serif;' +
                'overflow-y: auto;' +
            '}' +

            /* Grid texture */
            '#site-lockscreen::before {' +
                'content: "";' +
                'position: fixed; inset: 0;' +
                'background-image:' +
                    'linear-gradient(rgba(15,188,173,0.03) 1px, transparent 1px),' +
                    'linear-gradient(90deg, rgba(15,188,173,0.03) 1px, transparent 1px);' +
                'background-size: 40px 40px;' +
                'pointer-events: none;' +
            '}' +

            /* ===== CARD ===== */
            '.ls-card {' +
                'position: relative; z-index: 1;' +
                'background: #162032;' +
                'border: 0.5px solid rgba(255,255,255,0.12);' +
                'border-radius: 14px;' +
                'padding: 48px 44px 40px;' +
                'max-width: 480px; width: 100%;' +
                'text-align: center;' +
                'animation: lsSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);' +
            '}' +
            '@keyframes lsSlideUp {' +
                'from { transform: translateY(40px); opacity: 0; }' +
                'to { transform: translateY(0); opacity: 1; }' +
            '}' +

            /* ===== EYEBROW ===== */
            '.ls-eyebrow {' +
                'font-family: "DM Mono", monospace;' +
                'font-size: 11px;' +
                'letter-spacing: 0.18em;' +
                'color: #0fbcad;' +
                'text-transform: uppercase;' +
                'margin-bottom: 16px;' +
            '}' +

            /* ===== BADGE ===== */
            '.ls-badge {' +
                'display: inline-block;' +
                'font-family: "DM Mono", monospace;' +
                'font-size: 11px; font-weight: 500;' +
                'letter-spacing: 0.04em;' +
                'text-transform: uppercase;' +
                'background: rgba(15,188,173,0.12);' +
                'color: #0fbcad;' +
                'border: 0.5px solid rgba(15,188,173,0.25);' +
                'padding: 4px 14px; border-radius: 20px;' +
                'margin-bottom: 24px;' +
            '}' +

            /* ===== TYPOGRAPHY ===== */
            '.ls-title {' +
                'font-family: "DM Serif Display", serif;' +
                'font-size: clamp(26px, 4vw, 34px); font-weight: 400;' +
                'color: #e8edf2; line-height: 1.15;' +
                'margin: 0 0 14px;' +
            '}' +
            '.ls-title em {' +
                'font-style: italic; color: #0fbcad;' +
            '}' +
            '.ls-message {' +
                'color: #8a9bb0; font-size: 14px; line-height: 1.7;' +
                'margin: 0 0 28px; font-weight: 300;' +
            '}' +

            /* ===== FEATURE PILLS ===== */
            '.ls-features {' +
                'display: flex; flex-wrap: wrap;' +
                'justify-content: center; gap: 8px;' +
                'margin-bottom: 28px;' +
            '}' +
            '.ls-pill {' +
                'display: inline-flex; align-items: center; gap: 6px;' +
                'background: #1e2d3e;' +
                'border: 0.5px solid rgba(255,255,255,0.07);' +
                'color: #8a9bb0; font-size: 12px; font-weight: 400;' +
                'padding: 7px 14px; border-radius: 6px;' +
            '}' +

            /* ===== CONTACT BOX ===== */
            '.ls-contact-box {' +
                'background: #1e2d3e;' +
                'border: 0.5px solid rgba(255,255,255,0.07);' +
                'border-radius: 10px; padding: 20px;' +
                'margin-bottom: 24px;' +
            '}' +
            '.ls-contact-label {' +
                'font-family: "DM Mono", monospace;' +
                'color: #4a5a6a; font-size: 10px;' +
                'text-transform: uppercase; letter-spacing: 0.15em;' +
                'font-weight: 500; margin: 0 0 14px;' +
            '}' +
            '.ls-contact-links {' +
                'display: flex; flex-direction: column; gap: 10px;' +
            '}' +
            '.ls-link {' +
                'display: inline-flex; align-items: center; gap: 8px;' +
                'color: #8a9bb0; text-decoration: none;' +
                'font-size: 13px; transition: color 0.15s;' +
                'justify-content: center;' +
            '}' +
            '.ls-link:hover { color: #e8edf2; }' +
            '.ls-link svg { color: #0fbcad; flex-shrink: 0; }' +

            /* ===== DIVIDER ===== */
            '.ls-divider {' +
                'height: 0.5px;' +
                'background: rgba(255,255,255,0.07);' +
                'margin-bottom: 20px;' +
            '}' +

            /* ===== ADMIN / PASSWORD ===== */
            '.ls-admin { margin: 0; }' +
            '.ls-admin-toggle {' +
                'display: inline-flex; align-items: center; gap: 6px;' +
                'font-family: "DM Mono", monospace;' +
                'color: #4a5a6a; font-size: 10px;' +
                'text-transform: uppercase; letter-spacing: 0.15em;' +
                'font-weight: 500; cursor: pointer;' +
                'list-style: none; user-select: none;' +
                'transition: color 0.15s; padding: 4px 0;' +
            '}' +
            '.ls-admin-toggle::-webkit-details-marker { display: none; }' +
            '.ls-admin-toggle::marker { display: none; content: ""; }' +
            '.ls-admin-toggle:hover { color: #8a9bb0; }' +
            '.ls-admin-toggle svg { flex-shrink: 0; }' +
            '.ls-admin[open] .ls-admin-toggle { color: #8a9bb0; margin-bottom: 14px; }' +

            '.ls-form {' +
                'display: flex; gap: 8px;' +
                'max-width: 300px; margin: 0 auto 10px;' +
            '}' +
            '.ls-input {' +
                'flex: 1; padding: 10px 14px;' +
                'background: #1e2d3e;' +
                'border: 0.5px solid rgba(255,255,255,0.12);' +
                'border-radius: 8px; color: #e8edf2;' +
                'font-size: 13px; outline: none;' +
                'font-family: "Outfit", sans-serif;' +
                'transition: border-color 0.15s;' +
            '}' +
            '.ls-input:focus {' +
                'border-color: #0fbcad;' +
            '}' +
            '.ls-input::placeholder { color: #4a5a6a; }' +
            '.ls-btn {' +
                'width: 42px; min-width: 42px; height: 42px;' +
                'display: flex; align-items: center; justify-content: center;' +
                'background: #0fbcad;' +
                'color: #0d1b2a; border: none; border-radius: 8px;' +
                'cursor: pointer;' +
                'transition: background 0.15s;' +
            '}' +
            '.ls-btn:hover {' +
                'background: #0a9086;' +
            '}' +
            '.ls-error {' +
                'color: #e05252; font-size: 12px; margin: 0;' +
                'text-align: center;' +
            '}' +

            /* ===== FOOTER ===== */
            '.ls-footer {' +
                'position: relative; z-index: 1;' +
                'margin-top: 32px; text-align: center;' +
            '}' +
            '.ls-footer p {' +
                'color: #4a5a6a; font-size: 12px;' +
                'margin: 0;' +
            '}' +

            /* ===== MOBILE ===== */
            '@media (max-width: 560px) {' +
                '.ls-card { padding: 36px 24px 32px; }' +
                '.ls-pill { font-size: 11px; padding: 6px 12px; }' +
                '.ls-form { max-width: none; }' +
            '}' +

            /* ===== FADE OUT ===== */
            '@keyframes lsFadeOut {' +
                'to { opacity: 0; transform: scale(0.98); }' +
            '}';

        document.head.appendChild(style);
        document.body.appendChild(overlay);

        var input = document.getElementById('ls-password');
        var btn = document.getElementById('ls-submit');
        var error = document.getElementById('ls-error');

        function tryUnlock() {
            if (input.value === LOCKSCREEN_PASSWORD) {
                localStorage.setItem(STORAGE_KEY, 'true');
                overlay.style.animation = 'lsFadeOut 0.35s ease forwards';
                setTimeout(function() {
                    overlay.remove();
                    style.remove();
                    document.documentElement.style.overflow = '';
                }, 350);
            } else {
                error.style.display = 'block';
                input.value = '';
                input.focus();
                // Shake the form
                var form = overlay.querySelector('.ls-form');
                form.style.animation = 'lsShake 0.4s ease';
                setTimeout(function() { form.style.animation = ''; }, 400);
            }
        }

        btn.addEventListener('click', tryUnlock);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') tryUnlock();
        });

        // Extra animations
        var extraStyle = document.createElement('style');
        extraStyle.textContent =
            '@keyframes lsShake {' +
                '0%, 100% { transform: translateX(0); }' +
                '20% { transform: translateX(-8px); }' +
                '40% { transform: translateX(8px); }' +
                '60% { transform: translateX(-6px); }' +
                '80% { transform: translateX(6px); }' +
            '}';
        document.head.appendChild(extraStyle);

        // Focus input when details is opened
        var details = overlay.querySelector('.ls-admin');
        details.addEventListener('toggle', function() {
            if (details.open) {
                setTimeout(function() { input.focus(); }, 100);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildLockscreen);
    } else {
        buildLockscreen();
    }
})();
