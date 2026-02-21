/**
 * Shared sidebar component — app shell for logged-in pages
 * Injects sidebar, hides hero banners, adds clean page headers.
 * Mobile: off-canvas drawer triggered by hamburger button.
 *
 * Include on: my-guides, my-resources, settings, admin
 * Do NOT include on: index, login, pricing, study-guides, resources, guide, success
 * dashboard.html has its own inline sidebar — this script skips it via double-inject guard.
 */

(function () {
    'use strict';

    // ── Page config: which pages get the sidebar + their titles ───
    // NOTE: study-guides & resources are public pages — no sidebar
    var PAGE_CONFIG = {
        'dashboard':      { title: 'Dashboard',    highlight: 'dashboard' },
        'my-guides':      { title: 'Study Guides', highlight: 'study-guides' },
        'my-resources':   { title: 'Resources',    highlight: 'resources' },
        'settings':       { title: 'Settings',     highlight: 'settings' },
        'admin':          { title: 'Admin Panel',  highlight: 'admin' }
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
        '<aside class="dash-sidebar" id="dash-sidebar">' +
            '<div class="dash-sidebar-inner">' +
                '<div class="dash-sidebar-section">' +
                    '<a href="dashboard.html" class="dash-sidebar-item" data-sidebar-page="dashboard">' +
                        '<i class="fas fa-th-large"></i> Dashboard' +
                    '</a>' +
                    '<a href="my-guides.html" class="dash-sidebar-item" data-sidebar-page="study-guides">' +
                        '<i class="fas fa-book-open"></i> Study Guides' +
                    '</a>' +
                    '<a href="https://learn.thenursingcollective.pro" class="dash-sidebar-item" id="sidebar-quiz-link" style="display:none;" data-sidebar-page="quiz-bank">' +
                        '<i class="fas fa-brain"></i> Quiz Bank' +
                    '</a>' +
                    '<a href="my-resources.html" class="dash-sidebar-item" data-sidebar-page="resources">' +
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
        /* Mobile sidebar overlay */
        '.dash-sidebar-overlay{display:none;position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.4);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);opacity:0;transition:opacity .3s ease}' +
        '.dash-sidebar-overlay--visible{display:block;opacity:1}' +
        /* Responsive — mobile off-canvas drawer */
        '@media(max-width:768px){' +
            '.dash-sidebar{' +
                'position:fixed;top:0;left:0;width:270px;height:100vh;height:100dvh;' +
                'z-index:9999;padding-top:70px;' +
                'transform:translateX(-100%);transition:transform .3s cubic-bezier(.4,0,.2,1);' +
                'box-shadow:none' +
            '}' +
            '.dash-sidebar.dash-sidebar--open{transform:translateX(0);box-shadow:4px 0 24px rgba(0,0,0,.15)}' +
            '.dash-layout{display:block!important}' +
            '.dash-main{padding:20px 16px 40px}' +
        '}';

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

        // Add mobile overlay
        var overlay = document.createElement('div');
        overlay.className = 'dash-sidebar-overlay';
        overlay.id = 'dash-sidebar-overlay';
        layout.appendChild(overlay);

        var sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = sidebarHTML;
        var sidebar = sidebarContainer.firstChild;

        var mainWrapper = document.createElement('div');
        mainWrapper.className = 'dash-main';

        // Add app-style page header (skip for dashboard — it has its own)
        if (pageName !== 'dashboard') {
            var header = document.createElement('div');
            header.className = 'app-page-header';
            header.innerHTML = '<h1>' + config.title + '</h1>';
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

        // Wire up mobile sidebar drawer
        initMobileSidebar(sidebar, overlay);
    }

    // ── Mobile sidebar drawer toggle ─────────────────────────────
    function initMobileSidebar(sidebar, overlay) {
        var mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (!sidebar || !mobileMenuBtn) return;

        // Clone the hamburger button to strip script.js nav-links listener
        var freshBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(freshBtn, mobileMenuBtn);

        function openSidebar() {
            sidebar.classList.add('dash-sidebar--open');
            if (overlay) overlay.classList.add('dash-sidebar-overlay--visible');
            freshBtn.setAttribute('aria-expanded', 'true');
            var icon = freshBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            sidebar.classList.remove('dash-sidebar--open');
            if (overlay) overlay.classList.remove('dash-sidebar-overlay--visible');
            freshBtn.setAttribute('aria-expanded', 'false');
            var icon = freshBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            document.body.style.overflow = '';
        }

        freshBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = sidebar.classList.contains('dash-sidebar--open');
            if (isOpen) closeSidebar(); else openSidebar();
        });

        // Close on overlay click
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('dash-sidebar--open')) {
                closeSidebar();
            }
        });

        // Close sidebar when a nav link is clicked
        sidebar.querySelectorAll('.dash-sidebar-item').forEach(function (link) {
            link.addEventListener('click', closeSidebar);
        });
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
