/**
 * Shared sidebar component — app shell for logged-in pages
 * Injects sidebar, hides hero banners, adds clean page headers.
 *
 * Include on: settings, admin (dashboard has its own inline sidebar)
 * Do NOT include on: index, login, pricing, study-guides, resources, guide, success
 */

(function () {
    'use strict';

    // ── Page config: which pages get the sidebar + their titles ───
    // NOTE: study-guides & resources are public pages — no sidebar
    var PAGE_CONFIG = {
        'dashboard':    { title: 'Dashboard',    icon: 'fa-th-large',    highlight: 'dashboard' },
        'settings':     { title: 'Settings',     icon: 'fa-cog',         highlight: 'settings' },
        'admin':        { title: 'Admin Panel',  icon: 'fa-user-shield', highlight: 'admin' }
    };

    // ── Hero selectors to hide on each page ──────────────────────
    var HERO_SELECTORS = [
        '.admin-hero',
        '.wave-divider',
        '.breadcrumbs',
        '.settings-breadcrumbs'
    ];

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

    // ── CSS ───────────────────────────────────────────────────────
    var sidebarCSS =
        /* Layout */
        '.dash-layout{display:flex!important;min-height:calc(100vh - 95px);margin-top:95px}' +
        '.dash-sidebar{width:220px;flex-shrink:0;border-right:1px solid rgba(0,0,0,.06);padding-top:24px;position:sticky;top:95px;height:calc(100vh - 95px);overflow-y:auto;background:#fff;z-index:10}' +
        '.dash-sidebar-inner{padding:0 12px;display:flex;flex-direction:column;gap:8px}' +
        '.dash-sidebar-section{display:flex;flex-direction:column;gap:2px;padding-bottom:12px;border-bottom:1px solid rgba(0,0,0,.06);margin-bottom:4px}' +
        '.dash-sidebar-section:last-child{border-bottom:none;margin-bottom:0}' +
        /* Sidebar items */
        '.dash-sidebar-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-family:"Source Sans 3",sans-serif;font-size:.88rem;font-weight:500;color:#94a3b8;text-decoration:none;transition:all .15s ease;cursor:pointer}' +
        '.dash-sidebar-item:hover{background:rgba(46,134,171,.04);color:#0f172a;text-decoration:none}' +
        '.dash-sidebar-item.active{background:rgba(46,134,171,.1);color:#2E86AB;font-weight:600}' +
        '.dash-sidebar-item i{font-size:.95rem;width:20px;text-align:center;flex-shrink:0}' +
        /* Main content */
        '.dash-main{flex:1;min-width:0;padding:32px 24px 40px;background:var(--dash-bg,#f8fafc)}' +
        /* App page header (replaces hero banners) */
        '.app-page-header{margin-bottom:24px}' +
        '.app-page-header h1{font-family:"Outfit",sans-serif;font-size:1.5rem;font-weight:600;color:var(--dash-heading,#0f172a);margin:0}' +
        '.app-page-header h1 i{color:#94a3b8;margin-right:8px;font-size:1.2rem}' +
        /* Dark mode */
        '[data-theme="dark"] .dash-sidebar{background:#1e293b;border-color:rgba(255,255,255,.06)}' +
        '[data-theme="dark"] .dash-sidebar-section{border-color:rgba(255,255,255,.06)}' +
        '[data-theme="dark"] .dash-sidebar-item{color:#6b7280}' +
        '[data-theme="dark"] .dash-sidebar-item:hover{background:rgba(255,255,255,.04);color:#f1f5f9}' +
        '[data-theme="dark"] .dash-sidebar-item.active{background:rgba(46,134,171,.15);color:#3bb8e0}' +
        '[data-theme="dark"] .dash-main{background:var(--dash-bg,#0f172a)}' +
        '[data-theme="dark"] .app-page-header h1{color:var(--dash-heading,#f1f5f9)}' +
        /* Hide heroes & breadcrumbs */
        '.dash-layout .breadcrumbs{display:none!important}' +
        '.sidebar-hidden{display:none!important}' +
        /* Responsive */
        '@media(max-width:768px){.dash-sidebar{display:none}.dash-layout{display:block!important}.dash-main{padding:20px 16px 40px}}';

    // ── Detect current page ──────────────────────────────────────
    function detectCurrentPage() {
        var path = window.location.pathname.replace(/^\//, '').replace(/\.html$/, '');
        return PAGE_CONFIG[path] ? path : null;
    }

    // ── Hide hero sections ───────────────────────────────────────
    function hideHeroes() {
        HERO_SELECTORS.forEach(function (sel) {
            var els = document.querySelectorAll(sel);
            for (var i = 0; i < els.length; i++) {
                els[i].classList.add('sidebar-hidden');
            }
        });
    }

    // ── Inject sidebar ───────────────────────────────────────────
    function injectSidebar() {
        var pageName = detectCurrentPage();
        if (!pageName) return;
        var config = PAGE_CONFIG[pageName];

        // Don't double-inject (dashboard.html already has inline sidebar)
        if (document.querySelector('.dash-sidebar')) return;

        // Inject CSS
        var style = document.createElement('style');
        style.textContent = sidebarCSS;
        document.head.appendChild(style);

        // Hide hero banners & breadcrumbs
        hideHeroes();

        // Find anchor point: first <main> or first <section> after nav
        var anchor = document.querySelector('main#main-content') ||
                     document.querySelector('main') ||
                     document.querySelector('nav.navbar ~ .breadcrumbs + section') ||
                     document.querySelector('nav.navbar ~ section');

        if (!anchor) return;

        // Build layout
        var layout = document.createElement('div');
        layout.className = 'dash-layout';

        var sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = sidebarHTML;
        var sidebar = sidebarContainer.firstChild;

        var mainWrapper = document.createElement('div');
        mainWrapper.className = 'dash-main';

        // Add app-style page header (skip for dashboard — it has its own)
        if (pageName !== 'dashboard') {
            var header = document.createElement('div');
            header.className = 'app-page-header';
            header.innerHTML = '<h1><i class="fas ' + config.icon + '"></i> ' + config.title + '</h1>';
            mainWrapper.appendChild(header);
        }

        // Collect content nodes between anchor and footer
        var parent = anchor.parentNode;
        var contentNodes = [];
        var started = false;
        var children = Array.prototype.slice.call(parent.childNodes);
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if (node === anchor) started = true;
            if (started) {
                if (node.nodeType === 1 && (node.classList.contains('footer') || node.tagName === 'FOOTER')) break;
                contentNodes.push(node);
            }
        }

        // Assemble layout
        parent.insertBefore(layout, anchor);
        layout.appendChild(sidebar);
        layout.appendChild(mainWrapper);
        for (var j = 0; j < contentNodes.length; j++) {
            mainWrapper.appendChild(contentNodes[j]);
        }

        // Highlight active page
        var activeItem = sidebar.querySelector('[data-sidebar-page="' + config.highlight + '"]');
        if (activeItem) activeItem.classList.add('active');

        // Sync permissions
        syncSidebarPermissions(sidebar);
    }

    // ── Sync admin & quiz visibility ─────────────────────────────
    function syncSidebarPermissions(sidebar) {
        try {
            var user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;

            if (user.is_premium) {
                var quizLink = sidebar.querySelector('#sidebar-quiz-link');
                if (quizLink) quizLink.style.display = '';
            }

            if (user.email === 'admin@thenursingcollective.pro') {
                var adminSection = sidebar.querySelector('#sidebar-admin-section');
                if (adminSection) adminSection.classList.remove('hidden');
            }
        } catch (e) { /* silent */ }
    }

    // ── Init ─────────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSidebar);
    } else {
        injectSidebar();
    }
})();
