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
            /* Animated background orbs */
            '<div class="ls-orb ls-orb-1"></div>' +
            '<div class="ls-orb ls-orb-2"></div>' +
            '<div class="ls-orb ls-orb-3"></div>' +

            '<div class="ls-card">' +
                /* Logo */
                '<div class="ls-logo-wrap">' +
                    '<img src="' + logoSrc + '" alt="The Nursing Collective" class="ls-logo" />' +
                '</div>' +

                /* Badge */
                '<div class="ls-badge">' +
                    '<i class="fas fa-tools"></i> Coming Soon' +
                '</div>' +

                /* Main message */
                '<h1 class="ls-title">Something Great is<br>on the Way</h1>' +
                '<p class="ls-message">We\'re putting the finishing touches on The Nursing Collective \u2014 a comprehensive hub of study guides, practice questions, and resources built by nursing students, for nursing students.</p>' +

                /* Feature pills */
                '<div class="ls-features">' +
                    '<span class="ls-pill"><i class="fas fa-book-medical"></i> Study Guides</span>' +
                    '<span class="ls-pill"><i class="fas fa-clipboard-check"></i> Practice Questions</span>' +
                    '<span class="ls-pill"><i class="fas fa-users"></i> Community</span>' +
                '</div>' +

                /* Notify / contact section */
                '<div class="ls-contact-box">' +
                    '<p class="ls-contact-label">Want to know when we launch?</p>' +
                    '<div class="ls-contact-links">' +
                        '<a href="mailto:support@thenursingcollective.pro" class="ls-link">' +
                            '<i class="fas fa-envelope"></i> support@thenursingcollective.pro' +
                        '</a>' +
                        '<a href="https://discord.gg/y2Mh77wAV2" target="_blank" rel="noopener noreferrer" class="ls-link">' +
                            '<i class="fab fa-discord"></i> Join our Discord' +
                        '</a>' +
                    '</div>' +
                '</div>' +

                /* Divider */
                '<div class="ls-divider"></div>' +

                /* Password area — subtle, at the bottom */
                '<details class="ls-admin">' +
                    '<summary class="ls-admin-toggle"><i class="fas fa-lock"></i> Site Owner Access</summary>' +
                    '<div class="ls-form">' +
                        '<input type="password" id="ls-password" class="ls-input" placeholder="Enter password" autocomplete="off" />' +
                        '<button type="button" id="ls-submit" class="ls-btn"><i class="fas fa-arrow-right"></i></button>' +
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
                'background: #0f172a;' +
                'z-index: 999999;' +
                'display: flex; flex-direction: column;' +
                'align-items: center; justify-content: center;' +
                'padding: 24px;' +
                'font-family: "Outfit", "Source Sans 3", "Segoe UI", sans-serif;' +
                'overflow-y: auto;' +
            '}' +

            /* ===== ANIMATED BACKGROUND ORBS ===== */
            '.ls-orb {' +
                'position: fixed; border-radius: 50%;' +
                'filter: blur(100px); opacity: 0.15;' +
                'pointer-events: none;' +
                'animation: lsFloat 20s ease-in-out infinite;' +
            '}' +
            '.ls-orb-1 {' +
                'width: 500px; height: 500px;' +
                'background: #2E86AB;' +
                'top: -10%; left: -10%;' +
                'animation-delay: 0s;' +
            '}' +
            '.ls-orb-2 {' +
                'width: 400px; height: 400px;' +
                'background: #A23B72;' +
                'bottom: -10%; right: -10%;' +
                'animation-delay: -7s;' +
            '}' +
            '.ls-orb-3 {' +
                'width: 300px; height: 300px;' +
                'background: #f59e0b;' +
                'top: 50%; left: 50%;' +
                'transform: translate(-50%, -50%);' +
                'animation-delay: -14s;' +
            '}' +
            '@keyframes lsFloat {' +
                '0%, 100% { transform: translate(0, 0); }' +
                '25% { transform: translate(40px, -30px); }' +
                '50% { transform: translate(-20px, 40px); }' +
                '75% { transform: translate(30px, 20px); }' +
            '}' +

            /* ===== CARD ===== */
            '.ls-card {' +
                'position: relative; z-index: 1;' +
                'background: rgba(255,255,255,0.04);' +
                'backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);' +
                'border: 1px solid rgba(255,255,255,0.08);' +
                'border-radius: 28px;' +
                'padding: 48px 44px 40px;' +
                'max-width: 520px; width: 100%;' +
                'text-align: center;' +
                'animation: lsSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);' +
                'box-shadow: 0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);' +
            '}' +
            '@keyframes lsSlideUp {' +
                'from { transform: translateY(40px); opacity: 0; }' +
                'to { transform: translateY(0); opacity: 1; }' +
            '}' +

            /* ===== LOGO ===== */
            '.ls-logo-wrap {' +
                'margin-bottom: 24px;' +
            '}' +
            '.ls-logo {' +
                'height: 52px; width: auto;' +
                'filter: brightness(1.1);' +
            '}' +

            /* ===== BADGE ===== */
            '.ls-badge {' +
                'display: inline-flex; align-items: center; gap: 8px;' +
                'background: linear-gradient(135deg, rgba(46,134,171,0.15), rgba(162,59,114,0.15));' +
                'border: 1px solid rgba(46,134,171,0.25);' +
                'color: #7dd3fc;' +
                'font-size: 0.8rem; font-weight: 600;' +
                'text-transform: uppercase; letter-spacing: 1.5px;' +
                'padding: 8px 18px; border-radius: 50px;' +
                'margin-bottom: 24px;' +
            '}' +
            '.ls-badge i { font-size: 0.75rem; }' +

            /* ===== TYPOGRAPHY ===== */
            '.ls-title {' +
                'font-family: "Outfit", sans-serif;' +
                'font-size: 32px; font-weight: 700;' +
                'color: #f1f5f9; line-height: 1.25;' +
                'margin: 0 0 16px;' +
                'letter-spacing: -0.025em;' +
            '}' +
            '.ls-message {' +
                'color: #94a3b8; font-size: 1rem; line-height: 1.7;' +
                'margin: 0 0 24px;' +
                'font-family: "Source Sans 3", "Segoe UI", sans-serif;' +
            '}' +

            /* ===== FEATURE PILLS ===== */
            '.ls-features {' +
                'display: flex; flex-wrap: wrap;' +
                'justify-content: center; gap: 10px;' +
                'margin-bottom: 28px;' +
            '}' +
            '.ls-pill {' +
                'display: inline-flex; align-items: center; gap: 6px;' +
                'background: rgba(255,255,255,0.06);' +
                'border: 1px solid rgba(255,255,255,0.08);' +
                'color: #cbd5e1; font-size: 0.82rem; font-weight: 500;' +
                'padding: 8px 16px; border-radius: 50px;' +
            '}' +
            '.ls-pill i { color: #2E86AB; font-size: 0.75rem; }' +

            /* ===== CONTACT BOX ===== */
            '.ls-contact-box {' +
                'background: rgba(255,255,255,0.03);' +
                'border: 1px solid rgba(255,255,255,0.06);' +
                'border-radius: 16px; padding: 20px;' +
                'margin-bottom: 24px;' +
            '}' +
            '.ls-contact-label {' +
                'color: #64748b; font-size: 0.8rem;' +
                'text-transform: uppercase; letter-spacing: 1px;' +
                'font-weight: 600; margin: 0 0 14px;' +
            '}' +
            '.ls-contact-links {' +
                'display: flex; flex-direction: column; gap: 10px;' +
            '}' +
            '.ls-link {' +
                'display: inline-flex; align-items: center; gap: 10px;' +
                'color: #94a3b8; text-decoration: none;' +
                'font-size: 0.9rem; transition: color 0.2s;' +
                'justify-content: center;' +
            '}' +
            '.ls-link:hover { color: #e2e8f0; }' +
            '.ls-link i { width: 18px; text-align: center; color: #2E86AB; }' +
            '.ls-link .fa-discord { color: #5865F2; }' +

            /* ===== DIVIDER ===== */
            '.ls-divider {' +
                'height: 1px;' +
                'background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);' +
                'margin-bottom: 20px;' +
            '}' +

            /* ===== ADMIN / PASSWORD ===== */
            '.ls-admin { margin: 0; }' +
            '.ls-admin-toggle {' +
                'display: inline-flex; align-items: center; gap: 8px;' +
                'color: #475569; font-size: 0.78rem;' +
                'text-transform: uppercase; letter-spacing: 1.2px;' +
                'font-weight: 600; cursor: pointer;' +
                'list-style: none; user-select: none;' +
                'transition: color 0.2s; padding: 4px 0;' +
            '}' +
            '.ls-admin-toggle::-webkit-details-marker { display: none; }' +
            '.ls-admin-toggle::marker { display: none; content: ""; }' +
            '.ls-admin-toggle:hover { color: #64748b; }' +
            '.ls-admin-toggle i { font-size: 0.7rem; }' +
            '.ls-admin[open] .ls-admin-toggle { color: #64748b; margin-bottom: 14px; }' +

            '.ls-form {' +
                'display: flex; gap: 10px;' +
                'max-width: 320px; margin: 0 auto 10px;' +
            '}' +
            '.ls-input {' +
                'flex: 1; padding: 12px 16px;' +
                'background: rgba(255,255,255,0.06);' +
                'border: 1px solid rgba(255,255,255,0.1);' +
                'border-radius: 12px; color: #f1f5f9;' +
                'font-size: 0.9rem; outline: none;' +
                'font-family: "Source Sans 3", sans-serif;' +
                'transition: border-color 0.2s, box-shadow 0.2s;' +
            '}' +
            '.ls-input:focus {' +
                'border-color: #2E86AB;' +
                'box-shadow: 0 0 0 3px rgba(46,134,171,0.15);' +
            '}' +
            '.ls-input::placeholder { color: #475569; }' +
            '.ls-btn {' +
                'width: 48px; min-width: 48px; height: 48px;' +
                'display: flex; align-items: center; justify-content: center;' +
                'background: linear-gradient(135deg, #2E86AB, #236b8a);' +
                'color: #fff; border: none; border-radius: 12px;' +
                'font-size: 1rem; cursor: pointer;' +
                'transition: transform 0.15s, box-shadow 0.15s;' +
            '}' +
            '.ls-btn:hover {' +
                'transform: translateY(-2px);' +
                'box-shadow: 0 4px 14px rgba(46,134,171,0.4);' +
            '}' +
            '.ls-error {' +
                'color: #f87171; font-size: 0.82rem; margin: 0;' +
                'text-align: center;' +
            '}' +

            /* ===== FOOTER ===== */
            '.ls-footer {' +
                'position: relative; z-index: 1;' +
                'margin-top: 32px; text-align: center;' +
            '}' +
            '.ls-footer p {' +
                'color: #334155; font-size: 0.78rem;' +
                'margin: 0; letter-spacing: 0.5px;' +
            '}' +

            /* ===== MOBILE ===== */
            '@media (max-width: 560px) {' +
                '.ls-card { padding: 36px 24px 32px; border-radius: 22px; }' +
                '.ls-title { font-size: 26px; }' +
                '.ls-logo { height: 42px; }' +
                '.ls-message { font-size: 0.92rem; }' +
                '.ls-form { max-width: none; }' +
                '.ls-pill { font-size: 0.78rem; padding: 6px 12px; }' +
                '.ls-orb { display: none; }' +
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
