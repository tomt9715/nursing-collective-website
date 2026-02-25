/**
 * Admin Dashboard JavaScript
 * User management, subscription management, and audit log functionality
 */

// State management
let currentUserEmail = null;
let subscriptionModalMode = null; // 'grant', 'change', or 'extend'
let usersPage = 1;
let auditPage = 1;
let subscriptionsPage = 1;
let auditCache = []; // Cache audit data for sorting
let currentAuditSort = 'newest'; // Current audit sort option

// Section configuration
const ADMIN_SECTIONS = {
    'dashboard':        { title: 'Dashboard',          icon: 'fa-tachometer-alt', loader: 'loadDashboardHome' },
    'users':            { title: 'Users',              icon: 'fa-users',          loader: 'loadUsers' },
    'subscriptions':    { title: 'Subscriptions',      icon: 'fa-id-badge',       loader: 'loadSubscriptions' },
    'deleted-accounts': { title: 'Deleted Accounts',   icon: 'fa-user-slash',     loader: 'loadDeletedAccounts' },
    'quiz-reports':     { title: 'Quiz Reports',       icon: 'fa-flag',           loader: 'loadQuizReports' },
    'guide-index':      { title: 'Guide Index',        icon: 'fa-book-medical',   loader: 'loadGuideIndex' },
    'ai-usage':         { title: 'AI Usage',           icon: 'fa-robot',          loader: 'loadAIUsage' },
    'credits':          { title: 'Credit Management',  icon: 'fa-coins',          loader: null },
    'audit':            { title: 'Audit Log',          icon: 'fa-history',        loader: 'loadAuditLog' },
    'system-health':    { title: 'System Health',      icon: 'fa-server',         loader: 'loadSystemHealth' },
    'test-emails':      { title: 'Test Emails',        icon: 'fa-paper-plane',    loader: null },
    'admin-roles':      { title: 'Admin Roles',        icon: 'fa-user-shield',    loader: null }
};

// Animated count-up function for stats
function animateValue(element, start, end, duration, prefix = '', suffix = '', decimals = 0) {
    if (!element) return;

    // Parse current value if start is null
    if (start === null) {
        const currentText = element.textContent.replace(/[^0-9.-]/g, '');
        start = parseFloat(currentText) || 0;
    }

    // If values are the same, no animation needed
    if (start === end) {
        element.textContent = prefix + (decimals > 0 ? end.toFixed(decimals) : end) + suffix;
        return;
    }

    const range = end - start;
    const startTime = performance.now();

    // Add a subtle scale animation class
    element.classList.add('stat-animating');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const current = start + (range * easeOut);
        element.textContent = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.round(current)) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = prefix + (decimals > 0 ? end.toFixed(decimals) : end) + suffix;
            element.classList.remove('stat-animating');
        }
    }

    requestAnimationFrame(update);
}

// Helper to animate stat with flash effect
function updateStatWithAnimation(elementId, value, prefix = '', suffix = '', decimals = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Get current value
    const currentText = element.textContent.replace(/[^0-9.-]/g, '');
    const currentValue = parseFloat(currentText) || 0;

    // Animate the number
    animateValue(element, currentValue, value, 600, prefix, suffix, decimals);

    // Add flash effect to parent card
    const card = element.closest('.admin-stat-card');
    if (card && currentValue !== value) {
        card.classList.add('stat-updated');
        setTimeout(() => card.classList.remove('stat-updated'), 600);
    }
}

// Helper function to generate user status badges
function getUserStatusBadges(user) {
    const badges = [];

    // Admin badge (keep this)
    if (user.is_admin) {
        badges.push('<span class="badge-status admin"><i class="fas fa-crown"></i> Admin</span>');
    }

    // Verified/Unverified
    if (user.is_verified) {
        badges.push('<span class="badge-status verified"><i class="fas fa-check"></i> Verified</span>');
    } else {
        badges.push('<span class="badge-status unverified">Unverified</span>');
    }

    // Activity status: New (< 7 days), Active (login < 30 days), Inactive (no login > 60 days)
    const now = new Date();
    const createdAt = user.created_at ? new Date(user.created_at) : null;
    const lastLogin = user.last_login ? new Date(user.last_login) : null;

    // Check if user is "New" (joined within 7 days)
    if (createdAt) {
        const daysSinceCreation = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
        if (daysSinceCreation <= 7) {
            badges.push('<span class="badge-status new"><i class="fas fa-sparkles"></i> New</span>');
            return `<div class="badge-group">${badges.join('')}</div>`; // New users don't need active/inactive
        }
    }

    // Check activity based on last login
    if (lastLogin) {
        const daysSinceLogin = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
        if (daysSinceLogin > 60) {
            badges.push('<span class="badge-status inactive"><i class="fas fa-moon"></i> Inactive</span>');
        } else if (daysSinceLogin <= 30) {
            badges.push('<span class="badge-status active"><i class="fas fa-bolt"></i> Active</span>');
        }
    } else {
        // Never logged in after account creation
        badges.push('<span class="badge-status inactive"><i class="fas fa-moon"></i> Inactive</span>');
    }

    return `<div class="badge-group">${badges.join('')}</div>`;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async function() {
    // Check authentication (await token refresh for returning users)
    const isValid = await requireAuth();
    if (isValid === false) return; // Redirect already in progress

    // Verify admin access
    const user = getCurrentUser();
    if (!user.is_admin) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Update user dropdown and admin name
    document.getElementById('dropdown-user-email').textContent = user.email;
    const adminDisplayName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Admin';
    document.getElementById('dropdown-user-name').textContent = adminDisplayName;

    // Update sidebar admin name
    const sidebarAdminName = document.getElementById('sidebar-admin-name');
    if (sidebarAdminName) {
        sidebarAdminName.textContent = user.first_name || 'Admin';
    }

    // Update sidebar avatar with initial letter
    const sidebarAvatar = document.querySelector('.admin-sidebar-avatar');
    if (sidebarAvatar && user.first_name) {
        sidebarAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${user.first_name.charAt(0)}</span>`;
    }

    // Update user avatar with initial (same as dashboard)
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar && user.first_name) {
        userAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${user.first_name.charAt(0)}</span>`;
    }

    // Update user avatar large in dropdown
    const userAvatarLarge = document.querySelector('.user-avatar-large');
    if (userAvatarLarge && user.first_name) {
        userAvatarLarge.innerHTML = `<span style="font-weight: 600; font-size: 24px;">${user.first_name.charAt(0)}</span>`;
    }

    // Setup event listeners
    setupEventListeners();

    // Initialize mobile sidebar
    initAdminMobileSidebar();

    // Load initial data
    await loadDashboardHome();

    // Hide page loader
    document.getElementById('page-loader').style.display = 'none';

    // Handle URL hash for section navigation (e.g., admin.html#users)
    const hash = window.location.hash.replace('#', '');
    if (hash && Object.keys(ADMIN_SECTIONS).includes(hash)) {
        switchSection(hash);
    }

    // Also listen for hash changes
    window.addEventListener('hashchange', function() {
        const newHash = window.location.hash.replace('#', '');
        if (newHash && Object.keys(ADMIN_SECTIONS).includes(newHash)) {
            switchSection(newHash);
        }
    });
});

// Setup event listeners
function setupEventListeners() {
    // Section navigation (sidebar items)
    document.querySelectorAll('[data-admin-section]').forEach(item => {
        item.addEventListener('click', () => switchSection(item.dataset.adminSection));
    });

    // Quick nav buttons (e.g., dashboard cards that link to sections)
    document.querySelectorAll('[data-quick-nav]').forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.quickNav));
    });

    // User search (in Users tab) - with autocomplete
    const userSearchInput = document.getElementById('user-search');
    const userSearchAutocomplete = document.getElementById('user-search-autocomplete');

    document.getElementById('user-search-btn').addEventListener('click', searchUsers);
    userSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            userSearchAutocomplete.classList.remove('active');
            searchUsers();
        }
    });

    // Add autocomplete to Users tab search
    if (userSearchInput && userSearchAutocomplete) {
        let userSearchDebounceTimer;

        userSearchInput.addEventListener('input', (e) => {
            clearTimeout(userSearchDebounceTimer);
            const query = e.target.value.trim();

            if (query.length < 2) {
                userSearchAutocomplete.classList.remove('active');
                return;
            }

            // Debounce the search
            userSearchDebounceTimer = setTimeout(() => {
                performUserTabAutocompleteSearch(query);
            }, 300);
        });

        userSearchInput.addEventListener('focus', () => {
            if (userSearchInput.value.trim().length >= 2) {
                userSearchAutocomplete.classList.add('active');
            }
        });

        // Close autocomplete when clicking outside
        document.addEventListener('click', (e) => {
            if (!userSearchInput.contains(e.target) && !userSearchAutocomplete.contains(e.target)) {
                userSearchAutocomplete.classList.remove('active');
            }
        });

        // Keyboard navigation
        userSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                userSearchAutocomplete.classList.remove('active');
            }
        });
    }

    // Quick search with autocomplete (in Overview toolbar)
    const quickSearchInput = document.getElementById('quick-user-search');
    const searchAutocomplete = document.getElementById('search-autocomplete');
    if (quickSearchInput && searchAutocomplete) {
        let searchDebounceTimer;

        quickSearchInput.addEventListener('input', (e) => {
            clearTimeout(searchDebounceTimer);
            const query = e.target.value.trim();

            if (query.length < 2) {
                searchAutocomplete.classList.remove('active');
                return;
            }

            // Debounce the search
            searchDebounceTimer = setTimeout(() => {
                performAutocompleteSearch(query);
            }, 300);
        });

        quickSearchInput.addEventListener('focus', () => {
            if (quickSearchInput.value.trim().length >= 2) {
                searchAutocomplete.classList.add('active');
            }
        });

        // Close autocomplete when clicking outside
        document.addEventListener('click', (e) => {
            if (!quickSearchInput.contains(e.target) && !searchAutocomplete.contains(e.target)) {
                searchAutocomplete.classList.remove('active');
            }
        });

        // Keyboard navigation
        quickSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchAutocomplete.classList.remove('active');
            }
        });
    }

    // Export data button
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', showExportOptions);
    }

    // Time period filter
    const timePeriodSelect = document.getElementById('stats-time-period');
    if (timePeriodSelect) {
        timePeriodSelect.addEventListener('change', () => {
            // For now, just reload - can be enhanced later to filter by period
            loadDashboardHome();
        });
    }

    // Audit filters
    document.getElementById('audit-filter-btn').addEventListener('click', loadAuditLog);
    document.getElementById('audit-export-btn').addEventListener('click', exportAuditLog);

    // Audit sort dropdown
    const auditSortSelect = document.getElementById('audit-sort');
    if (auditSortSelect) {
        auditSortSelect.addEventListener('change', function() {
            currentAuditSort = this.value;
            if (auditCache.length > 0) {
                renderAuditLog();
            }
        });
    }

    // User menu dropdown
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }

    // Logout handler
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        performLogout();
    });

    // Modal close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // System status expandable items
    document.querySelectorAll('.status-item.expandable').forEach(item => {
        item.addEventListener('click', () => {
            // Toggle expanded state
            const wasExpanded = item.classList.contains('expanded');

            // Optionally close other expanded items (accordion behavior)
            // Uncomment the next 3 lines if you want only one item open at a time
            // document.querySelectorAll('.status-item.expanded').forEach(openItem => {
            //     openItem.classList.remove('expanded');
            // });

            // Toggle this item
            item.classList.toggle('expanded', !wasExpanded);
        });
    });

    // Quiz reports filter
    const quizReportsFilterBtn = document.getElementById('quiz-reports-filter-btn');
    if (quizReportsFilterBtn) {
        quizReportsFilterBtn.addEventListener('click', () => loadQuizReports(1));
    }

    // Test email buttons
    document.querySelectorAll('[data-test-email]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.dataset.testEmail;
            const originalHtml = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                let endpoint, body;
                if (type === 'confirmation') {
                    endpoint = '/admin/test-email/confirmation';
                    body = { plan_id: btn.dataset.plan };
                } else if (type === 'credit-addon') {
                    endpoint = '/admin/test-email/credit-addon';
                    body = { pack: btn.dataset.pack };
                } else {
                    endpoint = '/admin/test-email/reminder';
                    body = { days_remaining: parseInt(btn.dataset.days) };
                }

                const response = await apiCall(endpoint, {
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                showToast(response.message || 'Test email sent! Check your inbox.', 'success');
            } catch (error) {
                showToast(error.message || 'Failed to send test email', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalHtml;
            }
        });
    });
}

// Switch between sections (sidebar navigation)
function switchSection(sectionName) {
    if (!ADMIN_SECTIONS[sectionName]) return;
    const config = ADMIN_SECTIONS[sectionName];

    // Update sidebar active state
    document.querySelectorAll('.admin-sidebar-item').forEach(item => {
        item.classList.toggle('active', item.dataset.adminSection === sectionName);
    });

    // Update section content visibility
    document.querySelectorAll('.admin-section-content').forEach(content => {
        content.classList.toggle('active', content.id === `section-${sectionName}`);
    });

    // Update page header
    const titleEl = document.getElementById('admin-page-title');
    if (titleEl) {
        titleEl.innerHTML = `<i class="fas ${config.icon}"></i> ${config.title}`;
    }

    // Update URL hash
    window.location.hash = sectionName;

    // Call loader function if exists
    if (config.loader && typeof window[config.loader] === 'function') {
        window[config.loader]();
    }

    // Close mobile sidebar
    closeMobileAdminSidebar();
}

// Switch to a specific section (used by quick action buttons)
function switchToTab(sectionName) {
    switchSection(sectionName);
    document.querySelector('.admin-main')?.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile sidebar functions
function initAdminMobileSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('admin-sidebar-overlay');
    const menuBtn = document.getElementById('admin-mobile-menu-btn');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar?.classList.add('open');
            overlay?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileAdminSidebar);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar?.classList.contains('open')) {
            closeMobileAdminSidebar();
        }
    });
}

function closeMobileAdminSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('admin-sidebar-overlay');
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== Dashboard Home Section ====================

async function loadDashboardHome() {
    try {
        // Get selected time period
        const timePeriodSelect = document.getElementById('stats-time-period');
        let days = timePeriodSelect ? timePeriodSelect.value : '30';

        // Handle special values
        if (days === 'ytd') {
            // Calculate days from Jan 1 of current year
            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            days = Math.ceil((now - startOfYear) / (1000 * 60 * 60 * 24));
        }

        // Build API URL with days parameter (backend can use this for filtering)
        const apiUrl = days === 'all' ? '/admin/dashboard/enhanced' : `/admin/dashboard/enhanced?days=${days}`;
        const data = await apiCall(apiUrl);

        // Update KPI cards
        const totalUsers = data.statistics?.total_users || 1;
        updateStatWithAnimation('kpi-total-users', data.statistics?.total_users || 0);
        updateStatWithAnimation('kpi-premium-users', data.statistics?.premium_users || 0);
        updateStatWithAnimation('kpi-revenue', data.revenue?.this_month || 0, '$', '', 2);

        const activeWeekCount = data.statistics.active_this_week || data.statistics.new_users_today || 0;
        updateStatWithAnimation('kpi-active-week', activeWeekCount);

        const premiumRateValue = (data.statistics.premium_users / totalUsers) * 100;
        updateStatWithAnimation('kpi-premium-rate', premiumRateValue, '', '%', 1);

        // Update revenue label based on time period
        const revenueLabel = document.getElementById('kpi-revenue-label');
        if (revenueLabel) {
            const timePeriodEl = document.getElementById('stats-time-period');
            const selectedOption = timePeriodEl?.options[timePeriodEl.selectedIndex]?.text || 'This Month';
            revenueLabel.textContent = `Revenue (${selectedOption})`;
        }

        // Update auth provider stats if available
        if (data.auth_providers) {
            updateProviderBars(data.auth_providers, totalUsers);
        }

        // Update recent activity
        const activityList = document.getElementById('recent-activity');
        if (!data.recent_activity || data.recent_activity.length === 0) {
            activityList.innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>No recent admin activity</p></div>';
        } else {
            activityList.innerHTML = data.recent_activity.slice(0, 5).map(log => `
                <div class="activity-item">
                    <div class="activity-icon ${getActivityIconClass(log.action_type)}">
                        <i class="fas ${getActivityIcon(log.action_type)}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${formatActionType(log.action_type)}</div>
                        <div class="activity-meta">
                            ${escapeHtml(log.admin_email)} → ${escapeHtml(log.target_user_email)}
                            ${log.guide_id ? ` • ${escapeHtml(log.guide_id)}` : ''}${log.details && log.details.plan_name ? ` • ${escapeHtml(log.details.plan_name)}` : ''}
                        </div>
                        <div class="activity-meta">${formatDate(log.timestamp)}</div>
                    </div>
                </div>
            `).join('');
        }

        // Load subscription overview
        await loadSubscriptionOverview();

    } catch (error) {
        console.error('Error loading dashboard:', error);
        showToast('Failed to load dashboard data', 'error');
    }
}

// Load system health metrics for the dashboard
async function loadSystemHealth() {
    try {
        const data = await apiCall('/admin/system-health');

        // API Response Time
        const apiResponseEl = document.getElementById('status-api-response');
        if (apiResponseEl) {
            apiResponseEl.textContent = `${data.api_response_ms}ms`;
            // Add color indicator based on response time
            if (data.api_response_ms < 50) {
                apiResponseEl.style.color = 'var(--success-color, #10b981)';
            } else if (data.api_response_ms < 200) {
                apiResponseEl.style.color = 'var(--warning-color, #f59e0b)';
            } else {
                apiResponseEl.style.color = 'var(--danger-color, #ef4444)';
            }
        }

        // Last Deploy (use last activity as proxy)
        const lastDeployEl = document.getElementById('status-last-deploy');
        if (lastDeployEl) {
            if (data.last_deploy) {
                const deployDate = new Date(data.last_deploy);
                const now = new Date();
                const diffMs = now - deployDate;
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);

                if (diffMins < 60) {
                    lastDeployEl.textContent = `${diffMins}m ago`;
                } else if (diffHours < 24) {
                    lastDeployEl.textContent = `${diffHours}h ago`;
                } else {
                    lastDeployEl.textContent = `${diffDays}d ago`;
                }
            } else {
                lastDeployEl.textContent = '-';
            }
        }

        // Storage / DB Size
        const storageEl = document.getElementById('status-storage');
        if (storageEl) {
            storageEl.textContent = `${data.storage.total_records.toLocaleString()} records`;
            storageEl.title = `Users: ${data.storage.breakdown.users}, Sessions: ${data.storage.breakdown.sessions}, Subscriptions: ${data.storage.breakdown.subscriptions}`;
        }

        // Failed Logins (24h)
        const failedLoginsEl = document.getElementById('status-failed-logins');
        if (failedLoginsEl) {
            failedLoginsEl.textContent = data.failed_logins_24h || '0';
            if (data.failed_logins_24h > 10) {
                failedLoginsEl.style.color = 'var(--danger-color, #ef4444)';
            } else if (data.failed_logins_24h > 0) {
                failedLoginsEl.style.color = 'var(--warning-color, #f59e0b)';
            }
        }

        // Error Rate (1h)
        const errorRateEl = document.getElementById('status-error-rate');
        if (errorRateEl) {
            errorRateEl.textContent = `${data.error_rate_1h || 0}`;
            if (data.error_rate_1h > 5) {
                errorRateEl.style.color = 'var(--danger-color, #ef4444)';
            }
        }

    } catch (error) {
        console.error('Error loading system health:', error);
        // Set fallback values if the endpoint fails
        const fallbackEls = [
            'status-api-response',
            'status-last-deploy',
            'status-storage',
            'status-failed-logins',
            'status-error-rate'
        ];
        fallbackEls.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '-';
        });
    }
}

// Update auth provider progress bars
function updateProviderBars(providers, totalUsers) {
    const emailBar = document.getElementById('email-bar');
    const googleBar = document.getElementById('google-bar');
    const discordBar = document.getElementById('discord-bar');
    const appleBar = document.getElementById('apple-bar');

    const emailCount = document.getElementById('email-count');
    const googleCount = document.getElementById('google-count');
    const discordCount = document.getElementById('discord-count');
    const appleCount = document.getElementById('apple-count');

    // Calculate percentages
    const email = providers.email || 0;
    const google = providers.google || 0;
    const discord = providers.discord || 0;
    const apple = providers.apple || 0;

    const maxCount = Math.max(email, google, discord, apple, 1);

    if (emailBar) emailBar.style.width = `${(email / maxCount) * 100}%`;
    if (googleBar) googleBar.style.width = `${(google / maxCount) * 100}%`;
    if (discordBar) discordBar.style.width = `${(discord / maxCount) * 100}%`;
    if (appleBar) appleBar.style.width = `${(apple / maxCount) * 100}%`;

    if (emailCount) emailCount.textContent = email;
    if (googleCount) googleCount.textContent = google;
    if (discordCount) discordCount.textContent = discord;
    if (appleCount) appleCount.textContent = apple;
}

// Load subscription overview for dashboard
async function loadSubscriptionOverview() {
    const container = document.getElementById('subscription-overview');
    if (!container) return;

    try {
        // Use the subscription_stats already loaded in the dashboard data
        // Re-fetch to get the latest
        const data = await apiCall('/admin/dashboard/enhanced');
        const stats = data.subscription_stats || {};

        const totalActive = stats.total_active || 0;
        const monthly = stats.monthly_active || 0;
        const semester = stats.semester_active || 0;
        const lifetime = stats.lifetime_active || 0;
        const cancelled = stats.cancelled || 0;

        if (totalActive === 0 && cancelled === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-id-badge"></i><p>No subscriptions yet</p></div>';
            return;
        }

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                <div class="top-guide-card">
                    <div class="top-guide-rank" style="background: var(--primary-color, #2E86AB);">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <div class="top-guide-info">
                        <div class="top-guide-name">Monthly</div>
                        <div class="top-guide-stats">
                            <span class="top-guide-stat"><i class="fas fa-users"></i> ${monthly} active</span>
                        </div>
                    </div>
                </div>
                <div class="top-guide-card">
                    <div class="top-guide-rank" style="background: var(--secondary-color, #A23B72);">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="top-guide-info">
                        <div class="top-guide-name">Semester</div>
                        <div class="top-guide-stats">
                            <span class="top-guide-stat"><i class="fas fa-users"></i> ${semester} active</span>
                        </div>
                    </div>
                </div>
                <div class="top-guide-card">
                    <div class="top-guide-rank" style="background: var(--accent-color, #F18F01);">
                        <i class="fas fa-infinity"></i>
                    </div>
                    <div class="top-guide-info">
                        <div class="top-guide-name">Lifetime</div>
                        <div class="top-guide-stats">
                            <span class="top-guide-stat"><i class="fas fa-users"></i> ${lifetime} active</span>
                        </div>
                    </div>
                </div>
                <div class="top-guide-card">
                    <div class="top-guide-rank" style="background: var(--text-color-muted, #999);">
                        <i class="fas fa-ban"></i>
                    </div>
                    <div class="top-guide-info">
                        <div class="top-guide-name">Cancelled</div>
                        <div class="top-guide-stats">
                            <span class="top-guide-stat"><i class="fas fa-times-circle"></i> ${cancelled} total</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading subscription overview:', error);
        container.innerHTML = '<div class="empty-state"><p>Failed to load subscription data</p></div>';
    }
}

// Load deleted accounts (standalone section loader, renamed from loadRecentlyDeletedAccounts)
async function loadDeletedAccounts() {
    const tbody = document.getElementById('deleted-accounts-body');
    const emptyState = document.getElementById('no-deleted-accounts');
    const tableContainer = document.querySelector('.deleted-accounts-table-container');

    if (!tbody) return;

    try {
        const data = await apiCall('/admin/deleted-accounts?per_page=10');

        if (!data.deleted_accounts || data.deleted_accounts.length === 0) {
            tbody.innerHTML = '';
            if (tableContainer) tableContainer.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (tableContainer) tableContainer.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';

        tbody.innerHTML = data.deleted_accounts.map(account => `
            <tr>
                <td><strong>${escapeHtml(account.email)}</strong></td>
                <td>${escapeHtml(`${account.first_name || ''} ${account.last_name || ''}`.trim() || '-')}</td>
                <td>
                    ${account.total_purchases > 0
                        ? `<span class="badge-status premium">${account.total_purchases} guides</span>`
                        : '<span class="badge-status">None</span>'}
                </td>
                <td>
                    ${account.deletion_reason === 'admin_deleted'
                        ? `<span class="badge-status revoked" title="Deleted by ${escapeHtml(account.deleted_by || 'admin')}"><i class="fas fa-shield-alt"></i> Admin</span>`
                        : '<span class="badge-status"><i class="fas fa-user"></i> Self</span>'}
                </td>
                <td>${formatDate(account.deleted_at)}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading deleted accounts:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="loading-cell">Failed to load deleted accounts</td></tr>';
    }
}

// Keep backward-compatible alias
async function loadRecentlyDeletedAccounts() {
    return loadDeletedAccounts();
}

// ==================== Deleted Accounts Modal ====================

let deletedAccountsPage = 1;

function openDeletedAccountsModal() {
    document.getElementById('deleted-accounts-modal').classList.add('active');
    loadDeletedAccountsFull(1);
}

function closeDeletedAccountsModal() {
    document.getElementById('deleted-accounts-modal').classList.remove('active');
}

async function loadDeletedAccountsFull(page = 1) {
    deletedAccountsPage = page;
    const tbody = document.getElementById('deleted-accounts-full-body');
    tbody.innerHTML = '<tr><td colspan="8" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>';

    try {
        const reason = document.getElementById('deleted-filter-reason').value;
        const params = new URLSearchParams({
            page: page,
            per_page: 25
        });
        if (reason) params.append('reason', reason);

        const data = await apiCall(`/admin/deleted-accounts?${params}`);

        if (!data.deleted_accounts || data.deleted_accounts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="loading-cell">No deleted accounts found</td></tr>';
            document.getElementById('deleted-accounts-pagination').innerHTML = '';
            return;
        }

        tbody.innerHTML = data.deleted_accounts.map(account => `
            <tr>
                <td><strong>${escapeHtml(account.email)}</strong></td>
                <td>${escapeHtml(`${account.first_name || ''} ${account.last_name || ''}`.trim() || '-')}</td>
                <td>
                    ${account.total_purchases > 0
                        ? `<span class="badge-status premium">${account.total_purchases}</span>`
                        : '-'}
                </td>
                <td>
                    ${account.had_discord ? '<i class="fab fa-discord" title="Discord" style="color: #5865F2; margin-right: 4px;"></i>' : ''}
                    ${account.had_google ? '<i class="fab fa-google" title="Google" style="color: #DB4437; margin-right: 4px;"></i>' : ''}
                    ${!account.had_discord && !account.had_google ? '-' : ''}
                </td>
                <td>
                    ${account.deletion_reason === 'admin_deleted'
                        ? '<span class="badge-status revoked"><i class="fas fa-shield-alt"></i> Admin</span>'
                        : '<span class="badge-status"><i class="fas fa-user"></i> Self</span>'}
                </td>
                <td>${escapeHtml(account.deleted_by || '-')}</td>
                <td>${formatDate(account.account_created_at)}</td>
                <td>${formatDate(account.deleted_at)}</td>
            </tr>
        `).join('');

        // Pagination
        if (data.pagination && data.pagination.pages > 1) {
            renderPagination('deleted-accounts-pagination', data.pagination, loadDeletedAccountsFull);
        } else {
            document.getElementById('deleted-accounts-pagination').innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading deleted accounts:', error);
        tbody.innerHTML = '<tr><td colspan="8" class="loading-cell">Error loading deleted accounts</td></tr>';
        showToast('Failed to load deleted accounts', 'error');
    }
}

// ==================== Users Tab ====================

async function loadUsers(page = 1) {
    usersPage = page;
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading users...</td></tr>';

    try {
        const search = document.getElementById('user-search').value.trim();
        const params = new URLSearchParams({
            page: page,
            per_page: 25,
            search: search
        });

        const data = await apiCall(`/admin/users?${params}`);

        if (data.users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">No users found</td></tr>';
            document.getElementById('user-count').textContent = '0 users';
            document.getElementById('users-pagination').innerHTML = '';
            return;
        }

        // Render table (Name first, then Email)
        const displayName = user => escapeHtml(`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-');

        tbody.innerHTML = data.users.map(user => `
            <tr data-user-email="${escapeHtml(user.email)}">
                <td><strong>${displayName(user)}</strong></td>
                <td>${escapeHtml(user.email)}</td>
                <td>${getPlanBadge(user)}</td>
                <td>${getUserStatusBadges(user)}</td>
                <td>${formatDate(user.created_at)}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn primary" data-view-user="${escapeHtml(user.email)}">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Render mobile cards (hidden on desktop via CSS)
        const mobileCardsContainer = document.getElementById('users-mobile-cards');
        if (mobileCardsContainer) {
            mobileCardsContainer.innerHTML = data.users.map(user => `
                <a href="admin-user.html?email=${encodeURIComponent(user.email)}" class="user-card">
                    <div class="user-card-header">
                        <div class="user-card-name">${displayName(user)}</div>
                        <i class="fas fa-chevron-right user-card-arrow"></i>
                    </div>
                    <div class="user-card-email">${escapeHtml(user.email)}</div>
                    <div class="user-card-footer">
                        ${getPlanBadge(user)}
                        <div class="user-card-badges">${getUserStatusBadges(user)}</div>
                    </div>
                </a>
            `).join('');
        }

        // Attach event listeners to View buttons (desktop)
        tbody.querySelectorAll('[data-view-user]').forEach(btn => {
            btn.addEventListener('click', function() {
                openUserDetail(this.dataset.viewUser);
            });
        });

        // Update count
        const total = data.pagination ? data.pagination.total : data.total || data.users.length;
        document.getElementById('user-count').textContent = `${total} users`;

        // Render pagination
        if (data.pagination && data.pagination.pages > 1) {
            renderPagination('users-pagination', data.pagination, loadUsers);
        } else {
            document.getElementById('users-pagination').innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">Error loading users</td></tr>';
        showToast('Failed to load users', 'error');
    }
}

function searchUsers() {
    loadUsers(1);
}

// Autocomplete search - fetches users matching query and displays dropdown
let autocompleteCache = [];

async function performAutocompleteSearch(query) {
    const autocomplete = document.getElementById('search-autocomplete');
    if (!autocomplete) return;

    // Show loading state
    autocomplete.innerHTML = '<div class="search-autocomplete-loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
    autocomplete.classList.add('active');

    try {
        // Search users - the API should support searching by email or name
        const data = await apiCall(`/admin/users?search=${encodeURIComponent(query)}&per_page=8`);

        if (!data.users || data.users.length === 0) {
            autocomplete.innerHTML = '<div class="search-autocomplete-empty"><i class="fas fa-search"></i> No users found</div>';
            return;
        }

        // Cache for keyboard navigation
        autocompleteCache = data.users;

        // Render results - list with name, email, and status badges
        autocomplete.innerHTML = data.users.map(user => {
            const displayName = `${user.first_name || ''} ${user.last_name || ''}`.trim();

            return `
                <div class="search-autocomplete-item" data-email="${escapeHtml(user.email)}">
                    <div class="search-autocomplete-info">
                        ${displayName ? `<div class="search-autocomplete-name">${escapeHtml(displayName)}</div>` : ''}
                        <div class="search-autocomplete-email">${escapeHtml(user.email)}</div>
                        <div class="search-autocomplete-badges">${getUserStatusBadges(user)}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers to results
        autocomplete.querySelectorAll('.search-autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                const email = item.dataset.email;
                // Open the dedicated user profile page
                window.location.href = `admin-user.html?email=${encodeURIComponent(email)}`;
            });
        });

    } catch (error) {
        console.error('Autocomplete search error:', error);
        autocomplete.innerHTML = '<div class="search-autocomplete-empty"><i class="fas fa-exclamation-circle"></i> Search failed</div>';
    }
}

// Autocomplete search for Users tab - same behavior but uses the user-search-autocomplete container
async function performUserTabAutocompleteSearch(query) {
    const autocomplete = document.getElementById('user-search-autocomplete');
    if (!autocomplete) return;

    // Show loading state
    autocomplete.innerHTML = '<div class="search-autocomplete-loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
    autocomplete.classList.add('active');

    try {
        // Search users - the API should support searching by email or name
        const data = await apiCall(`/admin/users?search=${encodeURIComponent(query)}&per_page=8`);

        if (!data.users || data.users.length === 0) {
            autocomplete.innerHTML = '<div class="search-autocomplete-empty"><i class="fas fa-search"></i> No users found</div>';
            return;
        }

        // Render results - list with name, email, and status badges
        autocomplete.innerHTML = data.users.map(user => {
            const displayName = `${user.first_name || ''} ${user.last_name || ''}`.trim();

            return `
                <div class="search-autocomplete-item" data-email="${escapeHtml(user.email)}">
                    <div class="search-autocomplete-info">
                        ${displayName ? `<div class="search-autocomplete-name">${escapeHtml(displayName)}</div>` : ''}
                        <div class="search-autocomplete-email">${escapeHtml(user.email)}</div>
                        <div class="search-autocomplete-badges">${getUserStatusBadges(user)}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers to results
        autocomplete.querySelectorAll('.search-autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                const email = item.dataset.email;
                autocomplete.classList.remove('active');
                // Open the user detail modal instead of navigating to another page
                openUserDetail(email);
            });
        });

    } catch (error) {
        console.error('User tab autocomplete search error:', error);
        autocomplete.innerHTML = '<div class="search-autocomplete-empty"><i class="fas fa-exclamation-circle"></i> Search failed</div>';
    }
}

// Export data options
function showExportOptions() {
    const options = [
        { label: 'Export Users (CSV)', action: () => exportData('users') },
        { label: 'Export Subscriptions (CSV)', action: () => exportData('subscriptions') },
        { label: 'Export Audit Log (CSV)', action: () => exportAuditLog() }
    ];

    // Create a simple dropdown menu
    const existingMenu = document.getElementById('export-dropdown-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }

    const menu = document.createElement('div');
    menu.id = 'export-dropdown-menu';
    menu.className = 'export-dropdown-menu';
    menu.innerHTML = options.map(opt =>
        `<button class="export-option">${opt.label}</button>`
    ).join('');

    // Position near the export button
    const exportBtn = document.getElementById('export-data-btn');
    exportBtn.parentElement.style.position = 'relative';
    exportBtn.parentElement.appendChild(menu);

    // Add click handlers
    menu.querySelectorAll('.export-option').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            options[index].action();
            menu.remove();
        });
    });

    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== exportBtn) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 10);
}

// Export data to CSV
async function exportData(type) {
    try {
        showToast(`Exporting ${type}...`, 'info');

        let data, filename, headers, rows;

        if (type === 'users') {
            data = await apiCall('/admin/users?page=1&per_page=10000');
            filename = `nursing-collective-users-${new Date().toISOString().split('T')[0]}.csv`;
            headers = ['Email', 'First Name', 'Last Name', 'Nursing Program', 'Premium', 'Verified', 'Created'];
            rows = data.users.map(u => [
                u.email,
                u.first_name || '',
                u.last_name || '',
                u.nursing_program || '',
                u.is_premium ? 'Yes' : 'No',
                u.is_verified ? 'Yes' : 'No',
                u.created_at
            ]);
        } else if (type === 'subscriptions') {
            data = await apiCall('/admin/dashboard/enhanced');
            filename = `nursing-collective-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
            headers = ['Plan', 'Active Count', 'Cancelled Count'];
            rows = [
                ['Monthly Access', data.subscription_stats?.monthly_active || 0, ''],
                ['Semester Access', data.subscription_stats?.semester_active || 0, ''],
                ['Lifetime Access', data.subscription_stats?.lifetime_active || 0, ''],
                ['Total', data.subscription_stats?.total_active || 0, data.subscription_stats?.cancelled || 0]
            ];
        }

        // Convert to CSV
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        // Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        showToast(`${type} exported successfully!`, 'success');
    } catch (error) {
        console.error('Export error:', error);
        showToast('Failed to export data', 'error');
    }
}

// ==================== User Detail Modal ====================

async function openUserDetail(email) {
    currentUserEmail = email;
    const modal = document.getElementById('user-detail-modal');
    modal.classList.add('active');

    document.getElementById('modal-user-email').textContent = email;
    document.getElementById('user-info-grid').innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    document.getElementById('user-subscription-info').innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    document.getElementById('user-subscription-actions').innerHTML = '';

    try {
        const data = await apiCall(`/admin/users/by-email/${encodeURIComponent(email)}`);

        // User info
        document.getElementById('user-info-grid').innerHTML = `
            <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${escapeHtml(data.user.email)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Name</span>
                <span class="info-value">${escapeHtml(`${data.user.first_name || ''} ${data.user.last_name || ''}`.trim() || 'Not set')}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Nursing Program</span>
                <span class="info-value">${escapeHtml(data.user.nursing_program || 'Not set')}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value">${getUserStatusBadges(data.user)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Joined</span>
                <span class="info-value">${formatDate(data.user.created_at)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Last Login</span>
                <span class="info-value">${data.user.last_login ? formatDate(data.user.last_login) : 'Never'}</span>
            </div>
        `;

        // Subscription info
        const sub = data.subscription;
        const subInfoEl = document.getElementById('user-subscription-info');
        const subActionsEl = document.getElementById('user-subscription-actions');

        if (sub && sub.status === 'active') {
            const expiresText = sub.expires_at
                ? `Expires ${formatDate(sub.expires_at)}`
                : 'Never expires';

            subInfoEl.innerHTML = `
                <div style="padding: 12px; background: var(--background-color-alt, #f8f9fa); border-radius: 8px; border-left: 4px solid ${getPlanColor(sub.plan_id)};">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        ${getSubscriptionPlanBadge(sub.plan_id, sub.plan_name)}
                        <span class="badge-status active"><i class="fas fa-check"></i> Active</span>
                    </div>
                    <div style="font-size: 13px; color: var(--text-color-muted, #666);">
                        <p style="margin: 4px 0;"><i class="fas fa-calendar-alt"></i> Started: ${formatDate(sub.starts_at || sub.created_at)}</p>
                        <p style="margin: 4px 0;"><i class="fas fa-clock"></i> ${expiresText}</p>
                        ${sub.stripe_subscription_id ? '<p style="margin: 4px 0;"><i class="fab fa-stripe"></i> Stripe subscription</p>' : ''}
                        ${sub.cancel_at_period_end ? '<p style="margin: 4px 0; color: var(--warning-color, #f59e0b);"><i class="fas fa-exclamation-triangle"></i> Cancels at period end</p>' : ''}
                    </div>
                </div>
            `;

            subActionsEl.innerHTML = `
                <button class="btn btn-secondary btn-sm" id="modal-change-subscription-btn">
                    <i class="fas fa-exchange-alt"></i> Change Plan
                </button>
                <button class="btn btn-secondary btn-sm" id="modal-extend-subscription-btn">
                    <i class="fas fa-calendar-plus"></i> Extend
                </button>
                <button class="btn btn-danger btn-sm" id="modal-revoke-subscription-btn">
                    <i class="fas fa-times"></i> Revoke
                </button>
            `;

            // Attach event listeners
            document.getElementById('modal-change-subscription-btn').addEventListener('click', () => {
                openSubscriptionModal(email, 'change');
            });
            document.getElementById('modal-extend-subscription-btn').addEventListener('click', () => {
                openSubscriptionModal(email, 'extend');
            });
            document.getElementById('modal-revoke-subscription-btn').addEventListener('click', () => {
                revokeSubscription(email);
            });
        } else {
            subInfoEl.innerHTML = `
                <div style="padding: 12px; background: var(--background-color-alt, #f8f9fa); border-radius: 8px; text-align: center; color: var(--text-color-muted, #666);">
                    <i class="fas fa-id-badge" style="font-size: 24px; opacity: 0.3; margin-bottom: 8px; display: block;"></i>
                    <p style="margin: 0;">No active subscription</p>
                </div>
            `;

            subActionsEl.innerHTML = `
                <button class="btn btn-primary btn-sm" id="modal-grant-subscription-btn">
                    <i class="fas fa-plus"></i> Grant Subscription
                </button>
            `;

            document.getElementById('modal-grant-subscription-btn').addEventListener('click', () => {
                openSubscriptionModal(email, 'grant');
            });
        }

    } catch (error) {
        console.error('Error loading user details:', error);
        showToast('Failed to load user details', 'error');
        closeUserDetailModal();
    }
}

function closeUserDetailModal() {
    document.getElementById('user-detail-modal').classList.remove('active');
    currentUserEmail = null;
}

// ==================== Subscription Management ====================

// Helper to get plan display badge
function getPlanBadge(user) {
    if (!user.is_premium || !user.plan_id) {
        return '<span class="badge-status">Free</span>';
    }

    const planDisplay = {
        'monthly-access':       { label: 'Monthly',          icon: 'fa-sync-alt',     color: '#2E86AB' },
        'semester-access':      { label: 'Semester',          icon: 'fa-calendar-alt', color: '#A23B72' },
        'lifetime-access':      { label: 'Lifetime',          icon: 'fa-infinity',     color: '#F18F01' },
        'ai-monthly-access':    { label: 'AI Monthly',        icon: 'fa-robot',        color: '#7C3AED' },
        'ai-semester-access':   { label: 'AI Semester',       icon: 'fa-robot',        color: '#7C3AED' },
        'ai-lifetime-access':   { label: 'AI Lifetime',       icon: 'fa-robot',        color: '#7C3AED' },
    };

    const plan = planDisplay[user.plan_id];
    if (plan) {
        return `<span class="badge-status" style="background: ${plan.color}; color: white;"><i class="fas ${plan.icon}"></i> ${plan.label}</span>`;
    }

    // Fallback for unknown plan_id
    return '<span class="badge-status premium"><i class="fas fa-crown"></i> Premium</span>';
}

function getPlanColor(planId) {
    const colors = {
        'monthly-access': '#2E86AB',
        'semester-access': '#A23B72',
        'lifetime-access': '#F18F01',
        'ai-monthly-access': '#7C3AED',
        'ai-semester-access': '#7C3AED',
        'ai-lifetime-access': '#7C3AED',
    };
    return colors[planId] || '#666';
}

function getSubscriptionPlanBadge(planId, planName) {
    const color = getPlanColor(planId);
    const icons = {
        'monthly-access': 'fa-sync-alt',
        'semester-access': 'fa-calendar-alt',
        'lifetime-access': 'fa-infinity'
    };
    const icon = icons[planId] || 'fa-id-badge';
    return `<span class="badge-status" style="background: ${color}; color: white;"><i class="fas ${icon}"></i> ${escapeHtml(planName || planId)}</span>`;
}

function openSubscriptionModal(email, mode) {
    subscriptionModalMode = mode;
    currentUserEmail = email;

    const titleEl = document.getElementById('subscription-modal-title');
    const userEmailEl = document.getElementById('subscription-modal-user-email');
    const submitTextEl = document.getElementById('subscription-submit-text');

    userEmailEl.textContent = email;
    document.getElementById('subscription-notes').value = '';
    document.getElementById('subscription-reason-select').value = mode === 'grant' ? 'promotional_giveaway' : 'admin_change';

    switch (mode) {
        case 'grant':
            titleEl.textContent = 'Grant Subscription';
            submitTextEl.textContent = 'Grant Subscription';
            break;
        case 'change':
            titleEl.textContent = 'Change Subscription Plan';
            submitTextEl.textContent = 'Change Plan';
            break;
        case 'extend':
            titleEl.textContent = 'Extend Subscription';
            submitTextEl.textContent = 'Extend Subscription';
            break;
    }

    document.getElementById('subscription-modal').classList.add('active');
}

function closeSubscriptionModal() {
    document.getElementById('subscription-modal').classList.remove('active');
    subscriptionModalMode = null;
}

async function submitSubscription() {
    const planId = document.getElementById('subscription-plan-select').value;
    const reason = document.getElementById('subscription-reason-select').value;
    const notes = document.getElementById('subscription-notes').value;
    const submitBtn = document.getElementById('submit-subscription-btn');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        const encodedEmail = encodeURIComponent(currentUserEmail);

        if (subscriptionModalMode === 'grant') {
            await apiCall(`/admin/users/by-email/${encodedEmail}/subscription`, {
                method: 'POST',
                body: JSON.stringify({ plan_id: planId, reason, notes })
            });
            showToast('Subscription granted successfully', 'success');
        } else if (subscriptionModalMode === 'change') {
            await apiCall(`/admin/users/by-email/${encodedEmail}/subscription`, {
                method: 'PUT',
                body: JSON.stringify({ plan_id: planId, reason, notes, action: 'change' })
            });
            showToast('Subscription plan changed successfully', 'success');
        } else if (subscriptionModalMode === 'extend') {
            await apiCall(`/admin/users/by-email/${encodedEmail}/subscription`, {
                method: 'PUT',
                body: JSON.stringify({ plan_id: planId, reason, notes, action: 'extend' })
            });
            showToast('Subscription extended successfully', 'success');
        }

        closeSubscriptionModal();
        openUserDetail(currentUserEmail);
    } catch (error) {
        console.error('Error managing subscription:', error);
        showToast(error.message || 'Failed to manage subscription', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> <span id="subscription-submit-text">Submit</span>';
    }
}

async function revokeSubscription(email) {
    if (!await showConfirm('Revoke Subscription', `Are you sure you want to revoke the subscription for ${email}? They will lose premium access immediately.`)) {
        return;
    }

    try {
        await apiCall(`/admin/users/by-email/${encodeURIComponent(email)}/subscription?reason=Admin%20revoked`, {
            method: 'DELETE'
        });
        showToast('Subscription revoked', 'success');
        openUserDetail(email);
    } catch (error) {
        console.error('Error revoking subscription:', error);
        showToast(error.message || 'Failed to revoke subscription', 'error');
    }
}

// ==================== Subscriptions Tab ====================

async function loadSubscriptions(page = 1) {
    subscriptionsPage = page;
    const tbody = document.getElementById('subscriptions-table-body');
    const mobileContainer = document.getElementById('subscriptions-mobile-cards');

    tbody.innerHTML = '<tr><td colspan="6" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading subscriptions...</td></tr>';
    if (mobileContainer) {
        mobileContainer.innerHTML = '<div class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading subscriptions...</div>';
    }

    try {
        const search = document.getElementById('subscription-search')?.value?.trim() || '';
        const planFilter = document.getElementById('subscription-plan-filter')?.value || '';
        const statusFilter = document.getElementById('subscription-status-filter')?.value || 'active';

        const params = new URLSearchParams({
            page: page,
            per_page: 25,
            search: search
        });

        const data = await apiCall(`/admin/users?${params}`);

        // Fetch subscription data for users
        const usersWithSubs = [];
        for (const user of data.users) {
            try {
                const userData = await apiCall(`/admin/users/by-email/${encodeURIComponent(user.email)}`);
                if (userData.subscription) {
                    if (planFilter && userData.subscription.plan_id !== planFilter) continue;
                    if (statusFilter && userData.subscription.status !== statusFilter) continue;
                    usersWithSubs.push({ user, subscription: userData.subscription });
                }
            } catch {
                continue;
            }
        }

        if (usersWithSubs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">No subscriptions found</td></tr>';
            if (mobileContainer) {
                mobileContainer.innerHTML = '<div class="loading-cell">No subscriptions found</div>';
            }
            document.getElementById('subscriptions-count').textContent = '0 subscriptions';
            document.getElementById('subscriptions-pagination').innerHTML = '';
            return;
        }

        document.getElementById('subscriptions-count').textContent = `${usersWithSubs.length} subscription${usersWithSubs.length !== 1 ? 's' : ''}`;

        const displayName = user => escapeHtml(`${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email);

        // Desktop table
        tbody.innerHTML = usersWithSubs.map(({ user, subscription: sub }) => `
            <tr>
                <td>
                    <strong>${displayName(user)}</strong>
                    <div style="font-size: 12px; color: var(--text-color-muted, #666);">${escapeHtml(user.email)}</div>
                </td>
                <td>${getSubscriptionPlanBadge(sub.plan_id, sub.plan_name)}</td>
                <td>
                    ${sub.status === 'active'
                        ? '<span class="badge-status active"><i class="fas fa-check"></i> Active</span>'
                        : '<span class="badge-status revoked"><i class="fas fa-times"></i> Cancelled</span>'}
                    ${sub.cancel_at_period_end ? '<br><small style="color: var(--warning-color, #f59e0b);">Cancels at end</small>' : ''}
                </td>
                <td>${formatDate(sub.starts_at || sub.created_at)}</td>
                <td>${sub.expires_at ? formatDate(sub.expires_at) : '<em>Never</em>'}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn primary" data-view-user="${escapeHtml(user.email)}">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Mobile cards
        if (mobileContainer) {
            mobileContainer.innerHTML = usersWithSubs.map(({ user, subscription: sub }) => `
                <a href="admin-user.html?email=${encodeURIComponent(user.email)}" class="user-card">
                    <div class="user-card-header">
                        <div class="user-card-name">${displayName(user)}</div>
                        <i class="fas fa-chevron-right user-card-arrow"></i>
                    </div>
                    <div class="user-card-email">${escapeHtml(user.email)}</div>
                    <div class="user-card-footer">
                        ${getSubscriptionPlanBadge(sub.plan_id, sub.plan_name)}
                        <span style="font-size: 12px; color: var(--text-color-muted, #666);">
                            ${sub.expires_at ? `Exp: ${formatDate(sub.expires_at)}` : 'Lifetime'}
                        </span>
                    </div>
                </a>
            `).join('');
        }

        // Attach event listeners
        tbody.querySelectorAll('[data-view-user]').forEach(btn => {
            btn.addEventListener('click', function() {
                openUserDetail(this.dataset.viewUser);
            });
        });

        // Pagination
        if (data.pagination && data.pagination.pages > 1) {
            renderPagination('subscriptions-pagination', data.pagination, loadSubscriptions);
        } else {
            document.getElementById('subscriptions-pagination').innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading subscriptions:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">Error loading subscriptions</td></tr>';
        if (mobileContainer) {
            mobileContainer.innerHTML = '<div class="loading-cell">Error loading subscriptions</div>';
        }
        showToast('Failed to load subscriptions', 'error');
    }
}

// ==================== Audit Log Tab ====================

async function loadAuditLog(page = 1) {
    auditPage = page;
    const tbody = document.getElementById('audit-table-body');
    const mobileContainer = document.getElementById('audit-mobile-cards');

    tbody.innerHTML = '<tr><td colspan="6" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading audit log...</td></tr>';
    if (mobileContainer) {
        mobileContainer.innerHTML = '<div class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading audit log...</div>';
    }

    try {
        const params = new URLSearchParams({
            page: page,
            per_page: 50
        });

        const actionType = document.getElementById('audit-action-filter').value;
        const targetUser = document.getElementById('audit-user-filter').value;
        const dateFrom = document.getElementById('audit-date-from').value;
        const dateTo = document.getElementById('audit-date-to').value;

        if (actionType) params.append('action_type', actionType);
        if (targetUser) params.append('target_user', targetUser);
        if (dateFrom) params.append('date_from', dateFrom);
        if (dateTo) params.append('date_to', dateTo);

        const data = await apiCall(`/admin/audit-log?${params}`);

        // Cache the audit data for sorting
        auditCache = data.audit_log || [];

        // Reset sort to newest when new filters are applied
        currentAuditSort = 'newest';
        const sortSelect = document.getElementById('audit-sort');
        if (sortSelect) sortSelect.value = 'newest';

        if (auditCache.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">No audit log entries found</td></tr>';
            if (mobileContainer) {
                mobileContainer.innerHTML = '<div class="loading-cell">No audit log entries found</div>';
            }
            document.getElementById('audit-pagination').innerHTML = '';
            return;
        }

        // Render with current sort
        renderAuditLog();

        // Pagination
        if (data.pagination && data.pagination.pages > 1) {
            renderPagination('audit-pagination', data.pagination, loadAuditLog);
        } else {
            document.getElementById('audit-pagination').innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading audit log:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">Error loading audit log</td></tr>';
        if (mobileContainer) {
            mobileContainer.innerHTML = '<div class="loading-cell">Error loading audit log</div>';
        }
        showToast('Failed to load audit log', 'error');
    }
}

function renderAuditLog() {
    const tbody = document.getElementById('audit-table-body');
    const mobileContainer = document.getElementById('audit-mobile-cards');

    // Sort the cached data
    const sortedLogs = [...auditCache].sort((a, b) => {
        switch (currentAuditSort) {
            case 'newest':
                return new Date(b.timestamp) - new Date(a.timestamp);
            case 'oldest':
                return new Date(a.timestamp) - new Date(b.timestamp);
            case 'action-asc':
                return (a.action_type || '').localeCompare(b.action_type || '');
            case 'action-desc':
                return (b.action_type || '').localeCompare(a.action_type || '');
            default:
                return new Date(b.timestamp) - new Date(a.timestamp);
        }
    });

    // Desktop table view
    tbody.innerHTML = sortedLogs.map(log => `
        <tr>
            <td>${formatDateTime(log.timestamp)}</td>
            <td>${escapeHtml(log.admin_email)}</td>
            <td>
                <span class="badge-status ${getActionBadgeClass(log.action_type)}">
                    <i class="fas ${getActivityIcon(log.action_type)}"></i>
                    ${formatActionType(log.action_type)}
                </span>
            </td>
            <td>
                <a href="#" class="audit-user-link" data-user-email="${escapeHtml(log.target_user_email)}">
                    ${escapeHtml(log.target_user_email)}
                </a>
            </td>
            <td>${getAuditDetails(log)}</td>
            <td>${escapeHtml(log.reason || '-')}</td>
        </tr>
    `).join('');

    // Mobile cards view
    if (mobileContainer) {
        mobileContainer.innerHTML = sortedLogs.map(log => `
            <div class="audit-card">
                <div class="audit-card-header">
                    <span class="audit-card-action ${getAuditCardClass(log.action_type)}">
                        <i class="fas ${getActivityIcon(log.action_type)}"></i>
                        ${formatActionType(log.action_type)}
                    </span>
                    <span class="audit-card-time">${formatDateTime(log.timestamp)}</span>
                </div>
                <div class="audit-card-body">
                    <strong>${escapeHtml(log.admin_email)}</strong> →
                    <a href="#" class="audit-user-link" data-user-email="${escapeHtml(log.target_user_email)}">${escapeHtml(log.target_user_email)}</a>
                    ${log.guide_id ? `<br><small>Guide: ${escapeHtml(log.guide_id)}</small>` : ''}${log.details && log.details.plan_name ? `<br><small>Plan: ${escapeHtml(log.details.plan_name)}</small>` : ''}
                </div>
                ${log.reason ? `<div class="audit-card-reason">Reason: <span>${escapeHtml(log.reason)}</span></div>` : ''}
            </div>
        `).join('');

        // Attach event listeners to user links in mobile cards
        mobileContainer.querySelectorAll('.audit-user-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openUserDetail(this.dataset.userEmail);
            });
        });
    }

    // Attach event listeners to user links in audit table
    tbody.querySelectorAll('.audit-user-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openUserDetail(this.dataset.userEmail);
        });
    });
}

// Helper function for audit card action class
function getAuditDetails(log) {
    // Show subscription plan details for subscription actions
    if (log.details && log.details.plan_name) {
        let detail = escapeHtml(log.details.plan_name);
        if (log.details.old_plan_id && log.details.new_plan_id && log.details.old_plan_id !== log.details.new_plan_id) {
            detail = `${escapeHtml(log.details.old_plan_id)} → ${escapeHtml(log.details.plan_name)}`;
        }
        return detail;
    }
    // Fall back to guide_id for legacy entries
    return escapeHtml(log.guide_id || '-');
}

function getAuditCardClass(actionType) {
    switch (actionType) {
        case 'grant_subscription': return 'grant';
        case 'revoke_subscription': return 'revoke';
        case 'change_subscription': return 'note';
        case 'extend_subscription': return 'grant';
        case 'grant_guide': return 'grant';
        case 'revoke_guide': return 'revoke';
        case 'restore_guide': return 'restore';
        case 'add_note': return 'note';
        default: return '';
    }
}

async function exportAuditLog() {
    try {
        const params = new URLSearchParams();
        const actionType = document.getElementById('audit-action-filter').value;
        const targetUser = document.getElementById('audit-user-filter').value;
        const dateFrom = document.getElementById('audit-date-from').value;
        const dateTo = document.getElementById('audit-date-to').value;

        if (actionType) params.append('action_type', actionType);
        if (targetUser) params.append('target_user', targetUser);
        if (dateFrom) params.append('date_from', dateFrom);
        if (dateTo) params.append('date_to', dateTo);

        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/admin/audit-log/export?${params}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Export failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit_log_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showToast('Audit log exported', 'success');
    } catch (error) {
        console.error('Error exporting audit log:', error);
        showToast('Failed to export audit log', 'error');
    }
}

// ==================== Quiz Reports Tab ====================

let quizReportsPage = 1;

async function loadQuizReports(page = 1) {
    quizReportsPage = page;
    const tbody = document.getElementById('quiz-reports-table-body');
    const mobileContainer = document.getElementById('quiz-reports-mobile-cards');

    tbody.innerHTML = '<tr><td colspan="7" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading reports...</td></tr>';
    if (mobileContainer) {
        mobileContainer.innerHTML = '<div class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading reports...</div>';
    }

    try {
        const statusFilter = document.getElementById('quiz-reports-status-filter')?.value || 'open';
        const params = new URLSearchParams({
            page: page,
            per_page: 25,
            status: statusFilter
        });

        const data = await apiCall(`/api/quiz/reports?${params}`);

        const reports = data.reports || [];
        const total = data.total || 0;

        document.getElementById('quiz-reports-count').textContent = `${total} report${total !== 1 ? 's' : ''}`;

        if (reports.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="loading-cell">No reports found</td></tr>';
            if (mobileContainer) {
                mobileContainer.innerHTML = '<div class="loading-cell">No reports found</div>';
            }
            document.getElementById('quiz-reports-pagination').innerHTML = '';
            return;
        }

        const reasonLabels = {
            'inaccurate': 'Inaccurate',
            'wrong-answer': 'Wrong Answer',
            'unclear': 'Unclear',
            'typo': 'Typo',
            'other': 'Other'
        };

        const statusBadge = (status) => {
            switch (status) {
                case 'open': return '<span class="badge-status" style="background: #f59e0b; color: #fff;"><i class="fas fa-exclamation-circle"></i> Open</span>';
                case 'resolved': return '<span class="badge-status active"><i class="fas fa-check"></i> Resolved</span>';
                case 'dismissed': return '<span class="badge-status inactive"><i class="fas fa-ban"></i> Dismissed</span>';
                default: return `<span class="badge-status">${escapeHtml(status)}</span>`;
            }
        };

        // Desktop table
        tbody.innerHTML = reports.map(report => `
            <tr>
                <td>#${report.id}</td>
                <td>
                    <strong>${escapeHtml(report.question_id)}</strong>
                    ${report.topic ? `<div style="font-size: 12px; color: var(--text-color-muted, #666);">${escapeHtml(report.topic)}</div>` : ''}
                </td>
                <td>${escapeHtml(reasonLabels[report.reason] || report.reason)}</td>
                <td>${escapeHtml(report.reporter_email || 'Anonymous')}</td>
                <td>${statusBadge(report.status)}</td>
                <td>${formatDate(report.created_at)}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn primary" data-view-quiz-report="${report.id}">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Mobile cards
        if (mobileContainer) {
            mobileContainer.innerHTML = reports.map(report => `
                <div class="audit-card" style="cursor: pointer;" data-view-quiz-report-card="${report.id}">
                    <div class="audit-card-header">
                        <span class="audit-card-action">${escapeHtml(reasonLabels[report.reason] || report.reason)}</span>
                        <span class="audit-card-time">${formatDate(report.created_at)}</span>
                    </div>
                    <div class="audit-card-body">
                        <strong>${escapeHtml(report.question_id)}</strong>
                        ${report.topic ? ` &middot; ${escapeHtml(report.topic)}` : ''}
                        <br><small>Reporter: ${escapeHtml(report.reporter_email || 'Anonymous')}</small>
                    </div>
                    <div style="margin-top: 8px;">${statusBadge(report.status)}</div>
                </div>
            `).join('');

            mobileContainer.querySelectorAll('[data-view-quiz-report-card]').forEach(card => {
                card.addEventListener('click', function() {
                    openQuizReportDetail(parseInt(this.dataset.viewQuizReportCard), reports);
                });
            });
        }

        // Attach desktop view handlers
        tbody.querySelectorAll('[data-view-quiz-report]').forEach(btn => {
            btn.addEventListener('click', function() {
                openQuizReportDetail(parseInt(this.dataset.viewQuizReport), reports);
            });
        });

        // Pagination
        const totalPages = Math.ceil(total / 25);
        if (totalPages > 1) {
            renderPagination('quiz-reports-pagination', {
                page: page,
                pages: totalPages,
                has_prev: page > 1,
                has_next: page < totalPages
            }, loadQuizReports);
        } else {
            document.getElementById('quiz-reports-pagination').innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading quiz reports:', error);
        tbody.innerHTML = '<tr><td colspan="7" class="loading-cell">Error loading reports</td></tr>';
        if (mobileContainer) {
            mobileContainer.innerHTML = '<div class="loading-cell">Error loading reports</div>';
        }
        showToast('Failed to load quiz reports', 'error');
    }
}

function openQuizReportDetail(reportId, reports) {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const modal = document.getElementById('quiz-report-detail-modal');
    const body = document.getElementById('quiz-report-modal-body');

    const reasonLabels = {
        'inaccurate': 'Inaccurate information',
        'wrong-answer': 'Wrong correct answer',
        'unclear': 'Unclear or confusing',
        'typo': 'Typo or grammar error',
        'other': 'Other'
    };

    body.innerHTML = `
        <div style="margin-bottom: 16px;">
            <table style="width: 100%; font-size: 14px;">
                <tr><td style="padding: 6px 0; color: var(--text-color-muted, #666); width: 120px;">Report ID</td><td style="padding: 6px 0;"><strong>#${report.id}</strong></td></tr>
                <tr><td style="padding: 6px 0; color: var(--text-color-muted, #666);">Question ID</td><td style="padding: 6px 0;"><code>${escapeHtml(report.question_id)}</code></td></tr>
                <tr><td style="padding: 6px 0; color: var(--text-color-muted, #666);">Topic</td><td style="padding: 6px 0;">${escapeHtml(report.topic || 'N/A')} / ${escapeHtml(report.category || 'N/A')}</td></tr>
                <tr><td style="padding: 6px 0; color: var(--text-color-muted, #666);">Reason</td><td style="padding: 6px 0; font-weight: 600; color: #ef4444;">${escapeHtml(reasonLabels[report.reason] || report.reason)}</td></tr>
                <tr><td style="padding: 6px 0; color: var(--text-color-muted, #666);">Reporter</td><td style="padding: 6px 0;">${escapeHtml(report.reporter_email || 'Anonymous')}</td></tr>
                <tr><td style="padding: 6px 0; color: var(--text-color-muted, #666);">Submitted</td><td style="padding: 6px 0;">${formatDateTime(report.created_at)}</td></tr>
                <tr><td style="padding: 6px 0; color: var(--text-color-muted, #666);">Status</td><td style="padding: 6px 0;">${escapeHtml(report.status)}</td></tr>
            </table>
        </div>

        ${report.stem_preview ? `
        <div style="background: var(--background-color-alt, #f8f9fa); border-left: 3px solid var(--primary-color, #2E86AB); padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-size: 14px;">
            <strong style="font-size: 12px; color: var(--text-color-muted, #666); display: block; margin-bottom: 4px;">Question Preview</strong>
            ${escapeHtml(report.stem_preview)}
        </div>` : ''}

        ${report.details ? `
        <div style="margin-bottom: 16px;">
            <strong style="font-size: 13px; color: var(--text-color-muted, #666);">Reporter Details:</strong>
            <p style="margin: 4px 0 0 0; font-size: 14px;">${escapeHtml(report.details)}</p>
        </div>` : ''}

        ${report.admin_notes ? `
        <div style="margin-bottom: 16px;">
            <strong style="font-size: 13px; color: var(--text-color-muted, #666);">Admin Notes:</strong>
            <p style="margin: 4px 0 0 0; font-size: 14px;">${escapeHtml(report.admin_notes)}</p>
        </div>` : ''}

        ${report.status === 'open' ? `
        <div style="border-top: 1px solid var(--border-color, #e5e7eb); padding-top: 16px; margin-top: 16px;">
            <div class="form-group" style="margin-bottom: 12px;">
                <label style="font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">Admin Notes</label>
                <textarea id="quiz-report-admin-notes" class="form-control" rows="2" placeholder="Notes about resolution..."></textarea>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary btn-sm" id="resolve-quiz-report-btn" data-report-id="${report.id}">
                    <i class="fas fa-check"></i> Resolve
                </button>
                <button class="btn btn-secondary btn-sm" id="dismiss-quiz-report-btn" data-report-id="${report.id}">
                    <i class="fas fa-ban"></i> Dismiss
                </button>
            </div>
        </div>` : ''}
    `;

    modal.classList.add('active');

    // Attach resolve/dismiss handlers
    const resolveBtn = document.getElementById('resolve-quiz-report-btn');
    if (resolveBtn) {
        resolveBtn.addEventListener('click', () => resolveQuizReport(report.id, 'resolved'));
    }
    const dismissBtn = document.getElementById('dismiss-quiz-report-btn');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => resolveQuizReport(report.id, 'dismissed'));
    }
}

async function resolveQuizReport(reportId, status) {
    const adminNotes = document.getElementById('quiz-report-admin-notes')?.value?.trim() || '';

    try {
        await apiCall(`/api/quiz/reports/${reportId}/resolve`, {
            method: 'POST',
            body: JSON.stringify({ status, admin_notes: adminNotes })
        });

        showToast(`Report ${status}`, 'success');
        document.getElementById('quiz-report-detail-modal').classList.remove('active');
        loadQuizReports(quizReportsPage);
    } catch (error) {
        console.error('Error resolving quiz report:', error);
        showToast(error.message || 'Failed to update report', 'error');
    }
}

// ==================== Utility Functions ====================

function renderPagination(containerId, pagination, loadFn) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <button class="pagination-btn pagination-prev" data-page="${pagination.page - 1}" ${!pagination.has_prev ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Prev
        </button>
        <span class="pagination-info">Page ${pagination.page} of ${pagination.pages}</span>
        <button class="pagination-btn pagination-next" data-page="${pagination.page + 1}" ${!pagination.has_next ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;

    // Attach event listeners to pagination buttons
    container.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                loadFn(parseInt(this.dataset.page));
            }
        });
    });
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true
    });
}

function formatActionType(action) {
    const types = {
        'grant_subscription': 'Grant Subscription',
        'revoke_subscription': 'Revoke Subscription',
        'change_subscription': 'Change Subscription',
        'extend_subscription': 'Extend Subscription',
        'grant_guide': 'Grant Guide',
        'revoke_guide': 'Revoke Guide',
        'restore_guide': 'Restore Guide',
        'add_note': 'Add Note'
    };
    return types[action] || action;
}

function getActivityIcon(action) {
    const icons = {
        'grant_subscription': 'fa-plus-circle',
        'revoke_subscription': 'fa-minus-circle',
        'change_subscription': 'fa-exchange-alt',
        'extend_subscription': 'fa-calendar-plus',
        'grant_guide': 'fa-plus-circle',
        'revoke_guide': 'fa-minus-circle',
        'restore_guide': 'fa-redo',
        'add_note': 'fa-sticky-note'
    };
    return icons[action] || 'fa-circle';
}

function getActivityIconClass(action) {
    const classes = {
        'grant_subscription': 'grant',
        'revoke_subscription': 'revoke',
        'change_subscription': 'note',
        'extend_subscription': 'grant',
        'grant_guide': 'grant',
        'revoke_guide': 'revoke',
        'restore_guide': 'restore',
        'add_note': 'note'
    };
    return classes[action] || '';
}

function getActionBadgeClass(action) {
    const classes = {
        'grant_subscription': 'active',
        'revoke_subscription': 'revoked',
        'change_subscription': 'unverified',
        'extend_subscription': 'verified',
        'grant_guide': 'active',
        'revoke_guide': 'revoked',
        'restore_guide': 'verified',
        'add_note': 'unverified'
    };
    return classes[action] || '';
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== Toast & Confirm ====================

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon"><i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i></span>
        <span class="toast-message">${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function showConfirm(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirm-modal');
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;

        const yesBtn = document.getElementById('confirm-yes-btn');
        const newYesBtn = yesBtn.cloneNode(true);
        yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

        newYesBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            resolve(true);
        });

        modal.classList.add('active');

        // Close resolves false
        modal.addEventListener('click', function handler(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.removeEventListener('click', handler);
                resolve(false);
            }
        });
    });
}

function closeConfirmModal() {
    document.getElementById('confirm-modal').classList.remove('active');
}

// ==================== Quick Actions ====================

// Export all data
async function exportAllData() {
    try {
        showToast('Preparing data export...', 'info');

        // Export audit log
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/admin/audit-log/export`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Export failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin_export_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showToast('Data exported successfully', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showToast('Failed to export data', 'error');
    }
}

// API_URL is defined in api-service.js which is loaded before this script

// ==================== Event Listeners (replaces inline onclick handlers) ====================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (hamburger menu)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('mobile-open');
            navLinks.classList.toggle('mobile-open');
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);

            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Quick nav buttons with data-quick-nav attribute
    document.querySelectorAll('[data-quick-nav]').forEach(btn => {
        btn.addEventListener('click', function() {
            switchSection(this.dataset.quickNav);
        });
    });

    // Note: Export button listener is set up in setupEventListeners() to show dropdown options

    // User detail modal close button
    const closeUserDetailModalBtn = document.getElementById('close-user-detail-modal-btn');
    if (closeUserDetailModalBtn) {
        closeUserDetailModalBtn.addEventListener('click', closeUserDetailModal);
    }

    // Open full profile button
    const openFullProfileBtn = document.getElementById('open-full-profile-btn');
    if (openFullProfileBtn) {
        openFullProfileBtn.addEventListener('click', () => {
            if (currentUserEmail) {
                window.open(`admin-user.html?email=${encodeURIComponent(currentUserEmail)}`, '_blank');
            }
        });
    }

    // Subscription modal buttons
    const closeSubscriptionModalBtn = document.getElementById('close-subscription-modal-btn');
    if (closeSubscriptionModalBtn) {
        closeSubscriptionModalBtn.addEventListener('click', closeSubscriptionModal);
    }

    const cancelSubscriptionBtn = document.getElementById('cancel-subscription-btn');
    if (cancelSubscriptionBtn) {
        cancelSubscriptionBtn.addEventListener('click', closeSubscriptionModal);
    }

    const submitSubscriptionBtn = document.getElementById('submit-subscription-btn');
    if (submitSubscriptionBtn) {
        submitSubscriptionBtn.addEventListener('click', submitSubscription);
    }

    // Subscriptions tab search and filter
    const subscriptionSearchBtn = document.getElementById('subscription-search-btn');
    if (subscriptionSearchBtn) {
        subscriptionSearchBtn.addEventListener('click', () => loadSubscriptions(1));
    }

    const subscriptionSearchInput = document.getElementById('subscription-search');
    if (subscriptionSearchInput) {
        subscriptionSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') loadSubscriptions(1);
        });
    }

    const subscriptionPlanFilter = document.getElementById('subscription-plan-filter');
    if (subscriptionPlanFilter) {
        subscriptionPlanFilter.addEventListener('change', () => loadSubscriptions(1));
    }

    const subscriptionStatusFilter = document.getElementById('subscription-status-filter');
    if (subscriptionStatusFilter) {
        subscriptionStatusFilter.addEventListener('change', () => loadSubscriptions(1));
    }

    // Confirm modal cancel button
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener('click', closeConfirmModal);
    }

    // View All Deleted Accounts button
    const viewAllDeletedBtn = document.getElementById('view-all-deleted-btn');
    if (viewAllDeletedBtn) {
        viewAllDeletedBtn.addEventListener('click', openDeletedAccountsModal);
    }

    // Deleted accounts modal close button
    const closeDeletedAccountsModalBtn = document.getElementById('close-deleted-accounts-modal-btn');
    if (closeDeletedAccountsModalBtn) {
        closeDeletedAccountsModalBtn.addEventListener('click', closeDeletedAccountsModal);
    }

    // Deleted accounts filter apply button
    const deletedFilterApplyBtn = document.getElementById('deleted-filter-apply-btn');
    if (deletedFilterApplyBtn) {
        deletedFilterApplyBtn.addEventListener('click', () => loadDeletedAccountsFull(1));
    }

    // Quiz report detail modal close button
    const closeQuizReportModalBtn = document.getElementById('close-quiz-report-modal-btn');
    if (closeQuizReportModalBtn) {
        closeQuizReportModalBtn.addEventListener('click', () => {
            document.getElementById('quiz-report-detail-modal').classList.remove('active');
        });
    }

    // AI Tools: Reindex button
    const reindexBtn = document.getElementById('reindex-guides-btn');
    if (reindexBtn) {
        reindexBtn.addEventListener('click', reindexGuides);
    }

    // AI Tools: Credit adjust button
    const creditAdjustBtn = document.getElementById('credit-adjust-btn');
    if (creditAdjustBtn) {
        creditAdjustBtn.addEventListener('click', adjustUserCredits);
    }

    const adminRoleBtn = document.getElementById('admin-role-btn');
    if (adminRoleBtn) {
        adminRoleBtn.addEventListener('click', manageAdminRole);
    }

});

// ==================== AI Usage & Guide Index Section Loaders ====================

async function loadAIUsage() {
    loadAIUsageStats();
}

async function loadGuideIndex() {
    loadGuideIndexStatus();
}

async function loadAIUsageStats() {
    try {
        const data = await apiCall('/api/ai/admin/usage-stats');

        // Update stat cards
        const el = (id) => document.getElementById(id);
        if (el('ai-total-uploads')) el('ai-total-uploads').textContent = (data.upload_count || 0).toLocaleString();
        if (el('ai-total-generations')) el('ai-total-generations').textContent = (data.generation_totals?.all || 0).toLocaleString();
        if (el('ai-generations-7d')) el('ai-generations-7d').textContent = (data.generation_totals?.['7d'] || 0).toLocaleString();
        if (el('ai-active-users')) el('ai-active-users').textContent = `${data.active_ai_users || 0} active users`;

        // Token usage
        const totalTokens = (data.token_usage?.input_tokens || 0) + (data.token_usage?.output_tokens || 0);
        if (el('ai-total-tokens')) {
            if (totalTokens > 1000000) {
                el('ai-total-tokens').textContent = (totalTokens / 1000000).toFixed(1) + 'M';
            } else if (totalTokens > 1000) {
                el('ai-total-tokens').textContent = (totalTokens / 1000).toFixed(1) + 'K';
            } else {
                el('ai-total-tokens').textContent = totalTokens.toLocaleString();
            }
        }

        // Generation type table
        const tbody = document.getElementById('ai-type-tbody');
        if (tbody && data.generations_by_type) {
            const types = Object.entries(data.generations_by_type);
            if (types.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">No generations yet</td></tr>';
            } else {
                const typeLabels = {
                    summary: 'Summary', practice_questions: 'Practice Questions',
                    drug_cards: 'Drug Cards', key_labs: 'Key Labs',
                    compare_contrast: 'Compare & Contrast', care_plan: 'Care Plan',
                    gap_analysis: 'Gap Analysis'
                };
                tbody.innerHTML = types.map(([type, stats]) => `
                    <tr>
                        <td><strong>${escapeHtml(typeLabels[type] || type)}</strong></td>
                        <td><span class="badge badge-success">${stats.completed || 0}</span></td>
                        <td><span class="badge badge-danger">${stats.failed || 0}</span></td>
                        <td><span class="badge badge-warning">${stats.processing || 0}</span></td>
                        <td><strong>${stats.total || 0}</strong></td>
                    </tr>
                `).join('');
            }
        }

        // Credit overview
        if (data.credits) {
            if (el('credit-users-count')) el('credit-users-count').textContent = (data.credits.users_with_credits || 0).toLocaleString();
            if (el('credit-uploads-used')) el('credit-uploads-used').textContent = (data.credits.uploads_used || 0).toLocaleString();
            if (el('credit-questions-used')) el('credit-questions-used').textContent = (data.credits.questions_used || 0).toLocaleString();
        }

    } catch (error) {
        console.error('Failed to load AI usage stats:', error);
    }
}

async function loadGuideIndexStatus() {
    const statusEl = document.getElementById('guide-index-status');
    const tableWrap = document.getElementById('guide-index-table-wrap');
    const emptyEl = document.getElementById('guide-index-empty');

    try {
        const data = await apiCall('/api/ai/admin/guide-index-status');

        // Hide loading
        if (statusEl) statusEl.style.display = 'none';

        if (data.total_chunks === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
            if (tableWrap) tableWrap.style.display = 'none';
            return;
        }

        // Show summary
        if (statusEl) {
            statusEl.style.display = 'block';
            statusEl.innerHTML = `
                <div class="stats-grid" style="margin-bottom: 16px;">
                    <div class="stat-card">
                        <div class="stat-info">
                            <span class="stat-value">${data.total_chunks.toLocaleString()}</span>
                            <span class="stat-label">Total Chunks</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <span class="stat-value">${data.centroid_count}</span>
                            <span class="stat-label">Category Centroids</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <span class="stat-value">${data.categories?.length || 0}</span>
                            <span class="stat-label">Categories Indexed</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Populate table
        if (tableWrap && data.categories?.length > 0) {
            tableWrap.style.display = 'block';
            const tbody = document.getElementById('guide-index-tbody');
            if (tbody) {
                tbody.innerHTML = data.categories.map(cat => `
                    <tr>
                        <td><strong>${escapeHtml(cat.category)}</strong></td>
                        <td>${cat.guide_count}</td>
                        <td>${cat.chunk_count}</td>
                        <td><small>${(cat.guides || []).map(g => escapeHtml(g)).join(', ')}</small></td>
                    </tr>
                `).join('');
            }
        }

        if (emptyEl) emptyEl.style.display = 'none';

    } catch (error) {
        if (statusEl) statusEl.innerHTML = `<div class="info-banner" style="color: var(--danger-color);"><i class="fas fa-exclamation-triangle"></i> Failed to load index status: ${escapeHtml(error.message)}</div>`;
        console.error('Failed to load guide index status:', error);
    }
}

async function reindexGuides() {
    const btn = document.getElementById('reindex-guides-btn');
    if (!btn) return;

    if (!confirm('This will re-parse all study guides, generate new embeddings, and rebuild category centroids. Continue?')) {
        return;
    }

    const originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Reindexing...';

    try {
        const data = await apiCall('/api/ai/admin/reindex-guides', {
            method: 'POST',
            body: JSON.stringify({ source: 'http' })
        });
        showToast(data.message || 'Reindexing started! This may take a minute.', 'success');

        // Refresh status after a delay
        setTimeout(() => {
            loadGuideIndexStatus();
            btn.disabled = false;
            btn.innerHTML = originalHtml;
        }, 15000);

    } catch (error) {
        showToast('Failed to start reindex: ' + (error.message || 'Unknown error'), 'error');
        btn.disabled = false;
        btn.innerHTML = originalHtml;
    }
}

async function adjustUserCredits() {
    const emailInput = document.getElementById('credit-user-email');
    const uploadsInput = document.getElementById('credit-uploads-add');
    const questionsInput = document.getElementById('credit-questions-add');
    const reasonInput = document.getElementById('credit-reason');
    const resultEl = document.getElementById('credit-adjust-result');

    const email = emailInput?.value?.trim();
    const uploads = parseInt(uploadsInput?.value) || 0;
    const questions = parseInt(questionsInput?.value) || 0;
    const reason = reasonInput?.value?.trim() || 'Admin adjustment';

    if (!email) {
        showToast('Please enter a user email', 'error');
        return;
    }

    if (uploads === 0 && questions === 0) {
        showToast('Please enter a non-zero credit adjustment', 'error');
        return;
    }

    try {
        const data = await apiCall(`/api/ai/admin/user-credits/${encodeURIComponent(email)}`, {
            method: 'POST',
            body: JSON.stringify({ uploads_add: uploads, questions_add: questions, reason })
        });

        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.className = 'info-banner success';
            resultEl.innerHTML = `<i class="fas fa-check-circle"></i> ${escapeHtml(data.message)}`;
        }
        showToast(`Credits adjusted for ${email}`, 'success');

        // Clear form
        if (uploadsInput) uploadsInput.value = '0';
        if (questionsInput) questionsInput.value = '0';
        if (reasonInput) reasonInput.value = '';

    } catch (error) {
        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.className = 'info-banner error';
            resultEl.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${escapeHtml(error.message || 'Failed to adjust credits')}`;
        }
        showToast('Failed to adjust credits: ' + (error.message || 'Unknown error'), 'error');
    }
}

async function manageAdminRole() {
    const emailInput = document.getElementById('admin-role-email');
    const actionSelect = document.getElementById('admin-role-action');
    const secretInput = document.getElementById('admin-role-secret');
    const resultEl = document.getElementById('admin-role-result');

    const email = (emailInput ? emailInput.value.trim() : '');
    const action = actionSelect ? actionSelect.value : '';
    const secret = secretInput ? secretInput.value : '';

    if (!email) { showToast('Please enter a user email', 'error'); return; }
    if (!secret) { showToast('Please enter the admin secret', 'error'); return; }

    const verb = action === 'grant' ? 'grant admin access to' : 'revoke admin access from';
    if (!confirm(`Are you sure you want to ${verb} ${email}?`)) return;

    try {
        const data = await apiCall('/admin/manage-admin', {
            method: 'POST',
            body: JSON.stringify({ email, action, secret })
        });

        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.className = 'info-banner success';
            resultEl.innerHTML = `<i class="fas fa-check-circle"></i> ${escapeHtml(data.message)}`;
        }
        showToast(data.message, 'success');

        // Clear form
        if (emailInput) emailInput.value = '';
        if (secretInput) secretInput.value = '';

    } catch (error) {
        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.className = 'info-banner error';
            resultEl.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${escapeHtml(error.message || 'Failed to manage admin role')}`;
        }
        showToast('Failed: ' + (error.message || 'Unknown error'), 'error');
    }
}
