/**
 * Shared sidebar component
 * Include this script on any page that should have the dashboard sidebar.
 * It auto-detects the current page and highlights the active item.
 *
 * Usage:  <script src="sidebar.js"></script>
 *         Then wrap your page content in a <div class="dash-main"> inside <div class="dash-layout">.
 *         OR call injectSidebar() and it will wrap automatically.
 */

(function () {
    'use strict';

    // ── Sidebar HTML ──────────────────────────────────────────────
    var sidebarHTML =
        '<aside class="dash-sidebar">' +
            '<div class="dash-sidebar-inner">' +
                '<div class="dash-sidebar-section">' +
                    '<a href="dashboard.html" class="dash-sidebar-item" data-sidebar-page="dashboard">' +
                        '<i class="fas fa-th-large"></i> Dashboard' +
                    '</a>' +
                    '<a href="study-guides.html" class="dash-sidebar-item" data-sidebar-page="study-guides">' +
                        '<i class="fas fa-book-open"></i> Study Guides' +
                    '</a>' +
                    '<a href="https://learn.thenursingcollective.pro" class="dash-sidebar-item" id="sidebar-quiz-link" style="display:none;" data-sidebar-page="quiz-bank">' +
                        '<i class="fas fa-brain"></i> Quiz Bank' +
                    '</a>' +
                    '<a href="resources.html" class="dash-sidebar-item" data-sidebar-page="resources">' +
                        '<i class="fas fa-book-reader"></i> Resources' +
                    '</a>' +
                '</div>' +
                '<div class="dash-sidebar-section">' +
                    '<a href="https://discord.gg/y2Mh77wAV2" class="dash-sidebar-item" target="_blank" rel="noopener" data-sidebar-page="discord">' +
                        '<i class="fab fa-discord"></i> Community' +
                    '</a>' +
                    '<a href="settings.html" class="dash-sidebar-item" data-sidebar-page="settings">' +
                        '<i class="fas fa-cog"></i> Settings' +
                    '</a>' +
                '</div>' +
                '<div class="dash-sidebar-section dash-sidebar-admin hidden" id="sidebar-admin-section">' +
                    '<a href="admin.html" class="dash-sidebar-item" data-sidebar-page="admin">' +
                        '<i class="fas fa-user-shield"></i> Admin Panel' +
                    '</a>' +
                '</div>' +
            '</div>' +
        '</aside>';

    // ── Sidebar CSS (inline to avoid external-CSS cache issues) ───
    var sidebarCSS =
        '.dash-layout{display:flex!important;min-height:calc(100vh - 95px)}' +
        '.dash-sidebar{width:220px;flex-shrink:0;border-right:1px solid rgba(0,0,0,.06);padding-top:24px;position:sticky;top:95px;height:calc(100vh - 95px);overflow-y:auto;background:#fff;z-index:10}' +
        '.dash-sidebar-inner{padding:0 12px;display:flex;flex-direction:column;gap:8px}' +
        '.dash-sidebar-section{display:flex;flex-direction:column;gap:2px;padding-bottom:12px;border-bottom:1px solid rgba(0,0,0,.06);margin-bottom:4px}' +
        '.dash-sidebar-section:last-child{border-bottom:none;margin-bottom:0}' +
        '.dash-sidebar-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-family:"Source Sans 3",sans-serif;font-size:.88rem;font-weight:500;color:#94a3b8;text-decoration:none;transition:all .15s ease;cursor:pointer}' +
        '.dash-sidebar-item:hover{background:rgba(46,134,171,.04);color:#0f172a;text-decoration:none}' +
        '.dash-sidebar-item.active{background:rgba(46,134,171,.1);color:#2E86AB;font-weight:600}' +
        '.dash-sidebar-item i{font-size:.95rem;width:20px;text-align:center;flex-shrink:0}' +
        '.dash-main{flex:1;min-width:0;padding:0}' +
        '[data-theme="dark"] .dash-sidebar{background:#1e293b;border-color:rgba(255,255,255,.06)}' +
        '[data-theme="dark"] .dash-sidebar-section{border-color:rgba(255,255,255,.06)}' +
        '[data-theme="dark"] .dash-sidebar-item{color:#6b7280}' +
        '[data-theme="dark"] .dash-sidebar-item:hover{background:rgba(255,255,255,.04);color:#f1f5f9}' +
        '[data-theme="dark"] .dash-sidebar-item.active{background:rgba(46,134,171,.15);color:#3bb8e0}' +
        '.dash-layout .breadcrumbs{display:none!important}' +
        '@media(max-width:768px){.dash-sidebar{display:none}.dash-layout{display:block!important}}';

    // ── Detect current page ───────────────────────────────────────
    function detectCurrentPage() {
        var path = window.location.pathname.replace(/^\//, '').replace(/\.html$/, '');
        // Map of pages that get the sidebar
        var pageMap = {
            'dashboard': 'dashboard',
            'study-guides': 'study-guides',
            'resources': 'resources',
            'settings': 'settings',
            'admin': 'admin',
            'pricing': 'settings'
        };
        return pageMap[path] || null;
    }

    // ── Inject sidebar into page ──────────────────────────────────
    function injectSidebar() {
        var currentPage = detectCurrentPage();
        if (!currentPage) return; // don't inject on homepage/login/etc

        // Don't double-inject (dashboard.html already has its own sidebar HTML)
        if (document.querySelector('.dash-sidebar')) return;

        // Inject CSS
        var style = document.createElement('style');
        style.textContent = sidebarCSS;
        document.head.appendChild(style);

        // Find the main content area to wrap
        // Strategy: look for <main>, or first <section> after the nav
        var mainContent = document.querySelector('main#main-content') ||
                          document.querySelector('main') ||
                          document.querySelector('.breadcrumbs + section') ||
                          document.querySelector('nav.navbar ~ section');

        if (!mainContent) return;

        // Create the layout wrapper
        var layout = document.createElement('div');
        layout.className = 'dash-layout';

        // Insert sidebar HTML
        var sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = sidebarHTML;
        var sidebar = sidebarContainer.firstChild;

        // Wrap: insert layout before mainContent, move mainContent inside
        var mainWrapper = document.createElement('div');
        mainWrapper.className = 'dash-main';

        // Collect all content between navbar and footer
        var parent = mainContent.parentNode;
        var contentNodes = [];
        var started = false;
        var children = Array.prototype.slice.call(parent.childNodes);
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if (node === mainContent) started = true;
            if (started) {
                // Stop at footer
                if (node.nodeType === 1 && (node.classList.contains('footer') || node.tagName === 'FOOTER')) break;
                contentNodes.push(node);
            }
        }

        // Insert layout into DOM
        parent.insertBefore(layout, mainContent);
        layout.appendChild(sidebar);
        layout.appendChild(mainWrapper);
        for (var j = 0; j < contentNodes.length; j++) {
            mainWrapper.appendChild(contentNodes[j]);
        }

        // Highlight active page
        if (currentPage) {
            var activeItem = sidebar.querySelector('[data-sidebar-page="' + currentPage + '"]');
            if (activeItem) activeItem.classList.add('active');
        }

        // Show quiz bank link for premium users
        syncSidebarPermissions(sidebar);
    }

    // ── Sync admin & quiz visibility ──────────────────────────────
    function syncSidebarPermissions(sidebar) {
        // Check localStorage for user data (set by dashboard-script.js)
        try {
            var user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;

            // Quiz bank for premium
            if (user.is_premium) {
                var quizLink = sidebar.querySelector('#sidebar-quiz-link');
                if (quizLink) quizLink.style.display = '';
            }

            // Admin section
            if (user.email === 'admin@thenursingcollective.pro') {
                var adminSection = sidebar.querySelector('#sidebar-admin-section');
                if (adminSection) adminSection.classList.remove('hidden');
            }
        } catch (e) {
            // silently fail
        }
    }

    // ── Init on DOM ready ─────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSidebar);
    } else {
        injectSidebar();
    }
})();
