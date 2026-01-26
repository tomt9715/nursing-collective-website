/**
 * Admin Dashboard JavaScript
 * User management, guide management, and audit log functionality
 */

// State management
let currentUserEmail = null;
let currentGuideId = null;
let productsCache = [];
let usersPage = 1;
let auditPage = 1;
let selectedGuides = new Set();
let userDownloadsCache = {}; // Cache download data per user
let currentGuideType = 'study_guide'; // 'study_guide' or 'class_package'
let guidesCache = []; // Cache guides data

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
    // Check authentication
    requireAuth();

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

    // Update hero admin name
    const adminNameEl = document.getElementById('admin-name');
    if (adminNameEl) {
        adminNameEl.textContent = user.first_name || 'Admin';
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

    // Load initial data
    await loadDashboardOverview();
    await loadProductsCatalog();

    // Hide page loader
    document.getElementById('page-loader').style.display = 'none';
});

// Setup event listeners
function setupEventListeners() {
    // Tab navigation (sub-nav tabs)
    document.querySelectorAll('.admin-subnav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
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
            loadDashboardOverview();
        });
    }

    // Audit filters
    document.getElementById('audit-filter-btn').addEventListener('click', loadAuditLog);
    document.getElementById('audit-export-btn').addEventListener('click', exportAuditLog);

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
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons (sub-nav tabs)
    document.querySelectorAll('.admin-subnav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Update tab content
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabName}`);
    });

    // Load data for the tab
    switch (tabName) {
        case 'overview':
            loadDashboardOverview();
            break;
        case 'users':
            loadUsers();
            break;
        case 'guides':
            loadGuides();
            break;
        case 'audit':
            loadAuditLog();
            break;
    }
}

// ==================== Overview Tab ====================

async function loadDashboardOverview() {
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

        // Update hero stats
        const heroTotalUsers = document.getElementById('hero-total-users');
        const heroRevenue = document.getElementById('hero-revenue');
        const heroNewToday = document.getElementById('hero-new-today');
        if (heroTotalUsers) heroTotalUsers.textContent = data.statistics.total_users;
        if (heroRevenue) heroRevenue.textContent = `$${data.revenue.this_month.toFixed(2)}`;
        if (heroNewToday) heroNewToday.textContent = data.statistics.new_users_today;

        // Update main stats (User Statistics section) with animations
        updateStatWithAnimation('stat-premium-users', data.statistics.premium_users);

        // Update verified users if available
        const verifiedCount = data.statistics.verified_users || data.statistics.total_users;
        updateStatWithAnimation('stat-verified-users', verifiedCount);

        // Update active this week (use premium or a calculated value)
        const activeWeekCount = data.statistics.active_this_week || data.statistics.new_users_today || 0;
        updateStatWithAnimation('stat-active-week', activeWeekCount);

        // Update conversion rate (premium users / total users)
        const totalUsers = data.statistics.total_users || 1;
        const conversionRate = (data.statistics.premium_users / totalUsers) * 100;
        updateStatWithAnimation('stat-conversion-rate', conversionRate, '', '%', 1);

        // Update Revenue & Purchases stats with animations
        updateStatWithAnimation('stat-stripe-purchases', data.purchases.stripe_purchases);
        updateStatWithAnimation('stat-admin-grants', data.purchases.admin_granted);
        updateStatWithAnimation('stat-revenue-month', data.revenue.this_month, '$', '', 2);

        // Update revenue label based on time period
        const revenueLabel = document.getElementById('revenue-label');
        if (revenueLabel) {
            const timePeriodSelect = document.getElementById('stats-time-period');
            const selectedOption = timePeriodSelect?.options[timePeriodSelect.selectedIndex]?.text || 'This Month';
            revenueLabel.textContent = `Revenue (${selectedOption})`;
        }

        // Update total guides owned with animation
        const totalGuides = (data.purchases.stripe_purchases || 0) + (data.purchases.admin_granted || 0);
        updateStatWithAnimation('stat-total-guides-sold', totalGuides);

        // Update orders count with animation
        updateStatWithAnimation('orders-count', data.revenue.orders_this_month || data.purchases.stripe_purchases || 0);

        // Calculate and update rate badges with animation
        const premiumRateValue = (data.statistics.premium_users / totalUsers) * 100;
        const verified = data.statistics.verified_users || data.statistics.total_users;
        const verifiedRateValue = (verified / totalUsers) * 100;
        updateStatWithAnimation('premium-rate', premiumRateValue, '', '%', 1);
        updateStatWithAnimation('verified-rate', verifiedRateValue, '', '%', 1);

        // Update auth provider stats if available
        if (data.auth_providers) {
            updateProviderBars(data.auth_providers, totalUsers);
        }

        // Update recent activity
        const activityList = document.getElementById('recent-activity');
        if (data.recent_activity.length === 0) {
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
                            ${log.guide_id ? ` • ${escapeHtml(log.guide_id)}` : ''}
                        </div>
                        <div class="activity-meta">${formatDate(log.timestamp)}</div>
                    </div>
                </div>
            `).join('');
        }

        // Load top guides
        await loadTopGuides();

        // Load recently deleted accounts
        await loadRecentlyDeletedAccounts();

        // Load system health metrics
        await loadSystemHealth();

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
            storageEl.title = `Users: ${data.storage.breakdown.users}, Sessions: ${data.storage.breakdown.sessions}, Purchases: ${data.storage.breakdown.purchases}`;
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

// Load top guides by ownership
async function loadTopGuides() {
    const container = document.getElementById('top-guides');
    if (!container) return;

    try {
        const data = await apiCall('/admin/guides');

        if (!data.guides || data.guides.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No guides available</p></div>';
            return;
        }

        // Sort by total owners and take top 6
        const topGuides = data.guides
            .sort((a, b) => b.total_active_owners - a.total_active_owners)
            .slice(0, 6);

        container.innerHTML = topGuides.map((guide, index) => {
            let rankClass = '';
            if (index === 0) rankClass = 'gold';
            else if (index === 1) rankClass = 'silver';
            else if (index === 2) rankClass = 'bronze';

            return `
                <div class="top-guide-card">
                    <div class="top-guide-rank ${rankClass}">${index + 1}</div>
                    <div class="top-guide-info">
                        <div class="top-guide-name">${escapeHtml(guide.name)}</div>
                        <div class="top-guide-stats">
                            <span class="top-guide-stat"><i class="fas fa-users"></i> ${guide.total_active_owners}</span>
                            <span class="top-guide-stat"><i class="fas fa-credit-card"></i> ${guide.stripe_purchases}</span>
                            <span class="top-guide-stat"><i class="fas fa-gift"></i> ${guide.admin_granted}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading top guides:', error);
        container.innerHTML = '<div class="empty-state"><p>Failed to load guides</p></div>';
    }
}

// Load recently deleted accounts
async function loadRecentlyDeletedAccounts() {
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

        // Get guide counts for each user
        const usersWithGuides = await Promise.all(data.users.map(async (user) => {
            try {
                const guideData = await apiCall(`/admin/users/by-email/${encodeURIComponent(user.email)}`);
                return { ...user, guides_count: guideData.guides_count || 0 };
            } catch {
                return { ...user, guides_count: 0 };
            }
        }));

        // Render table (Name first, then Email)
        const displayName = user => escapeHtml(`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-');

        tbody.innerHTML = usersWithGuides.map(user => `
            <tr data-user-email="${escapeHtml(user.email)}">
                <td><strong>${displayName(user)}</strong></td>
                <td>${escapeHtml(user.email)}</td>
                <td>${user.guides_count}</td>
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
            mobileCardsContainer.innerHTML = usersWithGuides.map(user => `
                <a href="admin-user.html?email=${encodeURIComponent(user.email)}" class="user-card">
                    <div class="user-card-header">
                        <div class="user-card-name">${displayName(user)}</div>
                        <i class="fas fa-chevron-right user-card-arrow"></i>
                    </div>
                    <div class="user-card-email">${escapeHtml(user.email)}</div>
                    <div class="user-card-footer">
                        <span class="user-card-guides">${user.guides_count} guide${user.guides_count !== 1 ? 's' : ''}</span>
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
        { label: 'Export Purchases (CSV)', action: () => exportData('purchases') },
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
        } else if (type === 'purchases') {
            data = await apiCall('/admin/dashboard/enhanced');
            filename = `nursing-collective-purchases-${new Date().toISOString().split('T')[0]}.csv`;
            headers = ['Guide', 'Category', 'Stripe Purchases', 'Admin Grants', 'Total Owners'];
            rows = data.guide_stats.map(g => [
                g.name,
                g.category,
                g.stripe_purchases,
                g.admin_granted,
                g.total_owners
            ]);
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
    document.getElementById('user-guides-table-body').innerHTML = '<tr><td colspan="4" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>';

    try {
        // Fetch user details and download history in parallel
        const [data, downloadsData] = await Promise.all([
            apiCall(`/admin/users/by-email/${encodeURIComponent(email)}`),
            apiCall(`/admin/users/by-email/${encodeURIComponent(email)}/downloads`).catch(() => ({ product_summary: [], downloads: [] }))
        ]);

        // Cache downloads for this user
        userDownloadsCache[email] = downloadsData;

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

        // Guides - filter to only show active guides in the popup (revoked shown in Full Profile)
        const activeGuides = data.guides.filter(g => g.is_active);
        document.getElementById('modal-guides-count').textContent = activeGuides.length;

        const tbody = document.getElementById('user-guides-table-body');

        if (activeGuides.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="empty-cell">No active guides</td></tr>';
        } else {
            // Sort guides by purchased_at date (newest first)
            const sortedGuides = [...activeGuides].sort((a, b) => {
                const dateA = new Date(a.purchased_at || 0);
                const dateB = new Date(b.purchased_at || 0);
                return dateB - dateA;
            });

            tbody.innerHTML = sortedGuides.map(guide => `
                <tr>
                    <td><strong>${escapeHtml(guide.product_name)}</strong></td>
                    <td>
                        ${guide.source === 'stripe'
                            ? '<span class="source-badge stripe"><i class="fas fa-credit-card"></i> Stripe</span>'
                            : '<span class="source-badge admin"><i class="fas fa-gift"></i> Admin</span>'}
                    </td>
                    <td>
                        <button class="action-btn danger btn-sm" data-revoke-guide="${escapeHtml(guide.product_id)}" data-user-email="${escapeHtml(email)}">
                            <i class="fas fa-times"></i> Revoke
                        </button>
                    </td>
                </tr>
            `).join('');

            // Attach event listeners for revoke buttons
            tbody.querySelectorAll('[data-revoke-guide]').forEach(btn => {
                btn.addEventListener('click', function() {
                    revokeGuide(this.dataset.userEmail, this.dataset.revokeGuide);
                });
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

// ==================== Download History Modal ====================

function openDownloadHistoryModal(email, guideId, guideName) {
    const modal = document.getElementById('download-history-modal');
    modal.classList.add('active');

    document.getElementById('download-history-user').textContent = email;
    document.getElementById('download-history-guide').textContent = guideName;
    document.getElementById('download-history-list').innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';

    // Get download data from cache
    const downloadsData = userDownloadsCache[email];
    if (!downloadsData) {
        document.getElementById('download-history-count').textContent = '0';
        document.getElementById('download-history-list').innerHTML = '<div class="empty-state"><p>No download data available</p></div>';
        return;
    }

    // Filter downloads for this specific guide
    const guideDownloads = downloadsData.downloads.filter(d => d.product_id === guideId);
    document.getElementById('download-history-count').textContent = guideDownloads.length;

    if (guideDownloads.length === 0) {
        document.getElementById('download-history-list').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-download" style="font-size: 2rem; opacity: 0.3; margin-bottom: 10px;"></i>
                <p>User has not downloaded this guide yet</p>
            </div>
        `;
        return;
    }

    // Render download history
    document.getElementById('download-history-list').innerHTML = `
        <table class="admin-table compact">
            <thead>
                <tr>
                    <th>Date & Time</th>
                    <th>Source</th>
                    <th>IP Address</th>
                </tr>
            </thead>
            <tbody>
                ${guideDownloads.map(dl => `
                    <tr>
                        <td>${formatDateTime(dl.downloaded_at)}</td>
                        <td>${getDownloadSourceBadge(dl.source)}</td>
                        <td><code>${escapeHtml(dl.ip_address || 'Unknown')}</code></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function closeDownloadHistoryModal() {
    document.getElementById('download-history-modal').classList.remove('active');
}

function getDownloadSourceBadge(source) {
    const sourceMap = {
        'dashboard': '<span class="source-badge dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</span>',
        'guide_page': '<span class="source-badge guide-page"><i class="fas fa-book-open"></i> Guide Page</span>',
        'email': '<span class="source-badge email"><i class="fas fa-envelope"></i> Email Link</span>',
        'unknown': '<span class="source-badge unknown"><i class="fas fa-question"></i> Unknown</span>'
    };
    return sourceMap[source] || sourceMap['unknown'];
}

function formatDateTime(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// ==================== Guide Actions ====================

async function revokeGuide(email, guideId) {
    if (!await showConfirm('Revoke Guide Access', `Are you sure you want to revoke access to this guide for ${email}? They will no longer be able to access it.`)) {
        return;
    }

    try {
        await apiCall(`/admin/users/by-email/${encodeURIComponent(email)}/guides/${guideId}?reason=Admin%20revoked`, {
            method: 'DELETE'
        });
        showToast('Guide access revoked', 'success');
        openUserDetail(email); // Refresh
    } catch (error) {
        console.error('Error revoking guide:', error);
        showToast(error.message || 'Failed to revoke guide', 'error');
    }
}

async function restoreGuide(email, guideId) {
    try {
        await apiCall(`/admin/users/by-email/${encodeURIComponent(email)}/guides/${guideId}/restore`, {
            method: 'POST'
        });
        showToast('Guide access restored', 'success');
        openUserDetail(email); // Refresh
    } catch (error) {
        console.error('Error restoring guide:', error);
        showToast(error.message || 'Failed to restore guide', 'error');
    }
}

// ==================== Guide Notes ====================

let currentGuideNoteId = null;

function openGuideNoteModal(guideId, currentNote) {
    currentGuideNoteId = guideId;
    document.getElementById('guide-note-text').value = currentNote || '';
    document.getElementById('guide-note-modal').classList.add('active');
    document.getElementById('guide-note-text').focus();
}

function closeGuideNoteModal() {
    document.getElementById('guide-note-modal').classList.remove('active');
    currentGuideNoteId = null;
}

async function saveGuideNote() {
    const noteText = document.getElementById('guide-note-text').value.trim();

    try {
        await apiCall(`/admin/users/by-email/${encodeURIComponent(currentUserEmail)}/guides/${currentGuideNoteId}/note`, {
            method: 'PUT',
            body: JSON.stringify({ note: noteText })
        });
        showToast('Guide note saved', 'success');
        closeGuideNoteModal();
        openUserDetail(currentUserEmail); // Refresh
    } catch (error) {
        console.error('Error saving guide note:', error);
        showToast(error.message || 'Failed to save note', 'error');
    }
}

// ==================== Select All / Revoke All ====================

function selectAllGuides() {
    const checkboxes = document.querySelectorAll('.guide-select-checkbox');
    const selectAllCheckbox = document.getElementById('select-all-guides');

    checkboxes.forEach(cb => {
        cb.checked = true;
        selectedGuides.add(cb.dataset.guideId);
    });

    if (selectAllCheckbox) selectAllCheckbox.checked = true;
    updateBulkActionsBar();
}

async function revokeAllGuides() {
    const activeCheckboxes = document.querySelectorAll('.guide-select-checkbox');
    const activeCount = activeCheckboxes.length;

    if (activeCount === 0) {
        showToast('No active guides to revoke', 'info');
        return;
    }

    if (!await showConfirm('Revoke All Guides', `Are you sure you want to revoke ALL ${activeCount} active guide${activeCount > 1 ? 's' : ''} for ${currentUserEmail}? This cannot be easily undone.`)) {
        return;
    }

    const guideIds = Array.from(activeCheckboxes).map(cb => cb.dataset.guideId);
    let successCount = 0;
    let failCount = 0;

    for (const guideId of guideIds) {
        try {
            await apiCall(`/admin/users/by-email/${encodeURIComponent(currentUserEmail)}/guides/${guideId}?reason=Admin%20revoked%20all`, {
                method: 'DELETE'
            });
            successCount++;
        } catch (error) {
            console.error(`Error revoking guide ${guideId}:`, error);
            failCount++;
        }
    }

    if (failCount === 0) {
        showToast(`Successfully revoked all ${successCount} guides`, 'success');
    } else {
        showToast(`Revoked ${successCount}, failed ${failCount}`, 'error');
    }

    selectedGuides.clear();
    openUserDetail(currentUserEmail); // Refresh
}

// ==================== Bulk Guide Operations ====================

function handleGuideSelection(guideId, isSelected) {
    if (isSelected) {
        selectedGuides.add(guideId);
    } else {
        selectedGuides.delete(guideId);
    }
    updateBulkActionsBar();
}

function updateBulkActionsBar() {
    const bulkRevokeBtn = document.getElementById('bulk-revoke-btn');
    const countEl = document.getElementById('selected-guides-count');

    if (selectedGuides.size > 0) {
        bulkRevokeBtn.style.display = 'inline-flex';
        countEl.textContent = selectedGuides.size;
    } else {
        bulkRevokeBtn.style.display = 'none';
    }

    // Update select all checkbox state
    const allCheckboxes = document.querySelectorAll('.guide-select-checkbox');
    const selectAllCheckbox = document.getElementById('select-all-guides');
    if (selectAllCheckbox && allCheckboxes.length > 0) {
        const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
        const someChecked = Array.from(allCheckboxes).some(cb => cb.checked);
        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = someChecked && !allChecked;
    }
}


async function bulkRevokeGuides() {
    if (selectedGuides.size === 0) return;

    const count = selectedGuides.size;
    if (!await showConfirm('Bulk Revoke Guides', `Are you sure you want to revoke access to ${count} guide${count > 1 ? 's' : ''} for ${currentUserEmail}?`)) {
        return;
    }

    const guideIds = Array.from(selectedGuides);
    let successCount = 0;
    let failCount = 0;

    for (const guideId of guideIds) {
        try {
            await apiCall(`/admin/users/by-email/${encodeURIComponent(currentUserEmail)}/guides/${guideId}?reason=Bulk%20admin%20revoke`, {
                method: 'DELETE'
            });
            successCount++;
        } catch (error) {
            console.error(`Error revoking guide ${guideId}:`, error);
            failCount++;
        }
    }

    if (failCount === 0) {
        showToast(`Successfully revoked ${successCount} guide${successCount > 1 ? 's' : ''}`, 'success');
    } else {
        showToast(`Revoked ${successCount}, failed ${failCount}`, 'error');
    }

    selectedGuides.clear();
    openUserDetail(currentUserEmail); // Refresh
}


// ==================== Add Guide Modal ====================

function openAddGuideModal() {
    if (!currentUserEmail) return;

    document.getElementById('add-guide-user-email').textContent = currentUserEmail;

    // Populate guide dropdown
    const select = document.getElementById('add-guide-select');
    select.innerHTML = '<option value="">Select a guide...</option>' +
        productsCache
            .filter(p => p.type !== 'subscription')
            .map(p => `<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)} ($${p.price})</option>`)
            .join('');

    document.getElementById('add-guide-reason').value = 'promotional_giveaway';
    document.getElementById('add-guide-notes').value = '';

    document.getElementById('add-guide-modal').classList.add('active');
}

function closeAddGuideModal() {
    document.getElementById('add-guide-modal').classList.remove('active');
}

async function submitAddGuide() {
    const guideId = document.getElementById('add-guide-select').value;
    const reason = document.getElementById('add-guide-reason').value;
    const notes = document.getElementById('add-guide-notes').value;

    if (!guideId) {
        showToast('Please select a guide', 'error');
        return;
    }

    try {
        await apiCall(`/admin/users/by-email/${encodeURIComponent(currentUserEmail)}/guides`, {
            method: 'POST',
            body: JSON.stringify({ guide_id: guideId, reason, notes })
        });
        showToast('Guide granted successfully', 'success');
        closeAddGuideModal();
        openUserDetail(currentUserEmail); // Refresh
    } catch (error) {
        console.error('Error granting guide:', error);
        showToast(error.message || 'Failed to grant guide', 'error');
    }
}

// ==================== Notes ====================

function toggleAddNoteForm() {
    const form = document.getElementById('add-note-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') {
        document.getElementById('new-note-text').focus();
    }
}

async function submitNote() {
    const noteText = document.getElementById('new-note-text').value.trim();
    if (!noteText) {
        showToast('Please enter a note', 'error');
        return;
    }

    try {
        await apiCall(`/admin/users/by-email/${encodeURIComponent(currentUserEmail)}/notes`, {
            method: 'POST',
            body: JSON.stringify({ note_text: noteText })
        });
        showToast('Note added', 'success');
        document.getElementById('new-note-text').value = '';
        toggleAddNoteForm();
        openUserDetail(currentUserEmail); // Refresh
    } catch (error) {
        console.error('Error adding note:', error);
        showToast(error.message || 'Failed to add note', 'error');
    }
}

// ==================== Guides Tab ====================

async function loadGuides(forceRefresh = false) {
    const tbody = document.getElementById('guides-table-body');
    tbody.innerHTML = '<tr><td colspan="7" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading guides...</td></tr>';

    try {
        // Fetch from API if cache is empty or force refresh
        if (guidesCache.length === 0 || forceRefresh) {
            const data = await apiCall('/admin/guides');
            guidesCache = data.guides || [];
        }

        // Filter guides by current type
        // Product types: 'individual' = study guides, 'lite-package'/'full-package' = class packages
        const filteredGuides = guidesCache.filter(guide => {
            if (currentGuideType === 'study_guide') {
                return guide.type === 'individual';
            } else if (currentGuideType === 'class_package') {
                return guide.type === 'lite-package' || guide.type === 'full-package';
            }
            return true;
        });

        if (filteredGuides.length === 0) {
            const typeLabel = currentGuideType === 'study_guide' ? 'study guides' : 'class packages';
            tbody.innerHTML = `<tr><td colspan="7" class="loading-cell">No ${typeLabel} found</td></tr>`;
            return;
        }

        tbody.innerHTML = filteredGuides.map(guide => `
            <tr>
                <td><strong>${escapeHtml(guide.name)}</strong></td>
                <td>${escapeHtml(guide.category || '-')}</td>
                <td>$${guide.price.toFixed(2)}</td>
                <td>${guide.stripe_purchases}</td>
                <td>${guide.admin_granted}</td>
                <td><strong>${guide.total_active_owners}</strong></td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn primary" data-view-guide-owners="${escapeHtml(guide.guide_id)}" data-guide-name="${escapeHtml(guide.name)}">
                            <i class="fas fa-users"></i> View Owners
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Attach event listeners to View Owners buttons
        tbody.querySelectorAll('[data-view-guide-owners]').forEach(btn => {
            btn.addEventListener('click', function() {
                openGuideOwnersModal(this.dataset.viewGuideOwners, this.dataset.guideName);
            });
        });
    } catch (error) {
        console.error('Error loading guides:', error);
        tbody.innerHTML = '<tr><td colspan="7" class="loading-cell">Error loading guides</td></tr>';
        showToast('Failed to load guides', 'error');
    }
}

// Switch guide type (study_guide or class_package)
function switchGuideType(type) {
    currentGuideType = type;

    // Update toggle button states
    document.querySelectorAll('.guide-type-toggle .toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });

    // Reload guides with new filter
    loadGuides();
}

// ==================== Guide Owners Modal ====================

async function openGuideOwnersModal(guideId, guideName) {
    currentGuideId = guideId;
    document.getElementById('guide-owners-title').textContent = `${guideName} - Owners`;
    document.getElementById('bulk-grant-guide-name').textContent = guideName;

    const modal = document.getElementById('guide-owners-modal');
    modal.classList.add('active');

    const tbody = document.getElementById('guide-owners-body');
    tbody.innerHTML = '<tr><td colspan="5" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>';

    try {
        const data = await apiCall(`/admin/guides/${guideId}/owners`);

        document.getElementById('guide-owners-total').textContent = data.total;
        document.getElementById('guide-owners-active').textContent = data.active;

        if (data.owners.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="loading-cell">No owners found</td></tr>';
            return;
        }

        tbody.innerHTML = data.owners.map(owner => `
            <tr>
                <td>
                    <a href="#" class="owner-user-link" data-user-email="${escapeHtml(owner.user_email)}">
                        ${escapeHtml(owner.user_email)}
                    </a>
                </td>
                <td>${owner.source === 'stripe' ? '<i class="fas fa-credit-card"></i> Stripe' : '<i class="fas fa-gift"></i> Admin'}</td>
                <td>${escapeHtml(owner.granted_by || '-')}</td>
                <td>${formatDate(owner.purchased_at)}</td>
                <td>
                    ${owner.is_active ?
                        '<span class="badge-status active"><i class="fas fa-check"></i> Active</span>' :
                        '<span class="badge-status revoked"><i class="fas fa-times"></i> Revoked</span>'
                    }
                </td>
            </tr>
        `).join('');

        // Attach event listeners to user links in owners table
        tbody.querySelectorAll('.owner-user-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openUserDetail(this.dataset.userEmail);
                closeGuideOwnersModal();
            });
        });
    } catch (error) {
        console.error('Error loading guide owners:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="loading-cell">Error loading owners</td></tr>';
        showToast('Failed to load guide owners', 'error');
    }
}

function closeGuideOwnersModal() {
    document.getElementById('guide-owners-modal').classList.remove('active');
}

// ==================== Bulk Grant Modal ====================

function openBulkGrantModal() {
    document.getElementById('bulk-grant-emails').value = '';
    document.getElementById('bulk-grant-reason').value = 'promotional_giveaway';
    document.getElementById('bulk-grant-notes').value = '';
    document.getElementById('bulk-grant-results').style.display = 'none';
    document.getElementById('bulk-grant-modal').classList.add('active');
}

function closeBulkGrantModal() {
    document.getElementById('bulk-grant-modal').classList.remove('active');
}

async function submitBulkGrant() {
    const emailsText = document.getElementById('bulk-grant-emails').value;
    const reason = document.getElementById('bulk-grant-reason').value;
    const notes = document.getElementById('bulk-grant-notes').value;

    // Parse emails
    const emails = emailsText
        .split(/[,\n]+/)
        .map(e => e.trim().toLowerCase())
        .filter(e => e && e.includes('@'));

    if (emails.length === 0) {
        showToast('Please enter at least one valid email', 'error');
        return;
    }

    if (emails.length > 50) {
        showToast('Maximum 50 emails per bulk operation', 'error');
        return;
    }

    try {
        const data = await apiCall(`/admin/guides/${currentGuideId}/bulk-grant`, {
            method: 'POST',
            body: JSON.stringify({ emails, reason, notes })
        });

        // Show results
        const resultsDiv = document.getElementById('bulk-grant-results');
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <h4>Results</h4>
            <div class="result-category">
                <div class="result-label">Granted: ${data.summary.granted}</div>
                ${data.results.granted.length > 0 ? `<div class="result-list">${data.results.granted.join(', ')}</div>` : ''}
            </div>
            <div class="result-category">
                <div class="result-label">Restored: ${data.summary.restored}</div>
                ${data.results.restored.length > 0 ? `<div class="result-list">${data.results.restored.join(', ')}</div>` : ''}
            </div>
            <div class="result-category">
                <div class="result-label">Already Has: ${data.summary.already_has}</div>
                ${data.results.already_has.length > 0 ? `<div class="result-list">${data.results.already_has.join(', ')}</div>` : ''}
            </div>
            <div class="result-category">
                <div class="result-label">User Not Found: ${data.summary.user_not_found}</div>
                ${data.results.user_not_found.length > 0 ? `<div class="result-list">${data.results.user_not_found.join(', ')}</div>` : ''}
            </div>
        `;

        showToast(`Bulk grant completed: ${data.summary.granted} granted, ${data.summary.restored} restored`, 'success');
        openGuideOwnersModal(currentGuideId, document.getElementById('bulk-grant-guide-name').textContent); // Refresh owners
    } catch (error) {
        console.error('Error with bulk grant:', error);
        showToast(error.message || 'Failed to complete bulk grant', 'error');
    }
}

// ==================== Audit Log Tab ====================

async function loadAuditLog(page = 1) {
    auditPage = page;
    const tbody = document.getElementById('audit-table-body');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading audit log...</td></tr>';

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

        if (data.audit_log.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">No audit log entries found</td></tr>';
            document.getElementById('audit-pagination').innerHTML = '';
            return;
        }

        tbody.innerHTML = data.audit_log.map(log => `
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
                <td>${escapeHtml(log.guide_id || '-')}</td>
                <td>${escapeHtml(log.reason || '-')}</td>
            </tr>
        `).join('');

        // Attach event listeners to user links in audit table
        tbody.querySelectorAll('.audit-user-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openUserDetail(this.dataset.userEmail);
            });
        });

        // Pagination
        if (data.pagination && data.pagination.pages > 1) {
            renderPagination('audit-pagination', data.pagination, loadAuditLog);
        } else {
            document.getElementById('audit-pagination').innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading audit log:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">Error loading audit log</td></tr>';
        showToast('Failed to load audit log', 'error');
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

// ==================== Products Catalog ====================

async function loadProductsCatalog() {
    try {
        const data = await apiCall('/admin/products');
        productsCache = data.products;
    } catch (error) {
        console.error('Error loading products:', error);
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
        'grant_guide': 'Grant Guide',
        'revoke_guide': 'Revoke Guide',
        'restore_guide': 'Restore Guide',
        'add_note': 'Add Note'
    };
    return types[action] || action;
}

function getActivityIcon(action) {
    const icons = {
        'grant_guide': 'fa-plus-circle',
        'revoke_guide': 'fa-minus-circle',
        'restore_guide': 'fa-redo',
        'add_note': 'fa-sticky-note'
    };
    return icons[action] || 'fa-circle';
}

function getActivityIconClass(action) {
    const classes = {
        'grant_guide': 'grant',
        'revoke_guide': 'revoke',
        'restore_guide': 'restore',
        'add_note': 'note'
    };
    return classes[action] || '';
}

function getActionBadgeClass(action) {
    const classes = {
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

// Switch to a specific tab (used by quick action buttons)
function switchToTab(tabName) {
    switchTab(tabName);
    // Scroll to the admin content section
    document.querySelector('.admin-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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

    // Tab switching buttons with data-switch-tab attribute
    document.querySelectorAll('[data-switch-tab]').forEach(btn => {
        btn.addEventListener('click', function() {
            switchToTab(this.dataset.switchTab);
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

    // Download history modal close button
    const closeDownloadHistoryModalBtn = document.getElementById('close-download-history-modal-btn');
    if (closeDownloadHistoryModalBtn) {
        closeDownloadHistoryModalBtn.addEventListener('click', closeDownloadHistoryModal);
    }

    // Add guide modal buttons
    const openAddGuideModalBtn = document.getElementById('open-add-guide-modal-btn');
    if (openAddGuideModalBtn) {
        openAddGuideModalBtn.addEventListener('click', openAddGuideModal);
    }

    const closeAddGuideModalBtn = document.getElementById('close-add-guide-modal-btn');
    if (closeAddGuideModalBtn) {
        closeAddGuideModalBtn.addEventListener('click', closeAddGuideModal);
    }

    const cancelAddGuideBtn = document.getElementById('cancel-add-guide-btn');
    if (cancelAddGuideBtn) {
        cancelAddGuideBtn.addEventListener('click', closeAddGuideModal);
    }

    const submitAddGuideBtn = document.getElementById('submit-add-guide-btn');
    if (submitAddGuideBtn) {
        submitAddGuideBtn.addEventListener('click', submitAddGuide);
    }

    // Notes form buttons
    const toggleAddNoteBtn = document.getElementById('toggle-add-note-btn');
    if (toggleAddNoteBtn) {
        toggleAddNoteBtn.addEventListener('click', toggleAddNoteForm);
    }

    const submitNoteBtn = document.getElementById('submit-note-btn');
    if (submitNoteBtn) {
        submitNoteBtn.addEventListener('click', submitNote);
    }

    const cancelNoteBtn = document.getElementById('cancel-note-btn');
    if (cancelNoteBtn) {
        cancelNoteBtn.addEventListener('click', toggleAddNoteForm);
    }

    // Guide owners modal buttons
    const closeGuideOwnersModalBtn = document.getElementById('close-guide-owners-modal-btn');
    if (closeGuideOwnersModalBtn) {
        closeGuideOwnersModalBtn.addEventListener('click', closeGuideOwnersModal);
    }

    const openBulkGrantModalBtn = document.getElementById('open-bulk-grant-modal-btn');
    if (openBulkGrantModalBtn) {
        openBulkGrantModalBtn.addEventListener('click', openBulkGrantModal);
    }

    // Bulk grant modal buttons
    const closeBulkGrantModalBtn = document.getElementById('close-bulk-grant-modal-btn');
    if (closeBulkGrantModalBtn) {
        closeBulkGrantModalBtn.addEventListener('click', closeBulkGrantModal);
    }

    const cancelBulkGrantBtn = document.getElementById('cancel-bulk-grant-btn');
    if (cancelBulkGrantBtn) {
        cancelBulkGrantBtn.addEventListener('click', closeBulkGrantModal);
    }

    const submitBulkGrantBtn = document.getElementById('submit-bulk-grant-btn');
    if (submitBulkGrantBtn) {
        submitBulkGrantBtn.addEventListener('click', submitBulkGrant);
    }

    // Confirm modal cancel button
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener('click', closeConfirmModal);
    }

    // Bulk revoke button
    const bulkRevokeBtn = document.getElementById('bulk-revoke-btn');
    if (bulkRevokeBtn) {
        bulkRevokeBtn.addEventListener('click', bulkRevokeGuides);
    }

    // Select all guides checkbox
    const selectAllGuidesCheckbox = document.getElementById('select-all-guides');
    if (selectAllGuidesCheckbox) {
        selectAllGuidesCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.guide-select-checkbox');
            checkboxes.forEach(cb => {
                cb.checked = this.checked;
                handleGuideSelection(cb.dataset.guideId, this.checked);
            });
        });
    }

    // Select All button
    const selectAllGuidesBtn = document.getElementById('select-all-guides-btn');
    if (selectAllGuidesBtn) {
        selectAllGuidesBtn.addEventListener('click', selectAllGuides);
    }

    // Revoke All button
    const revokeAllGuidesBtn = document.getElementById('revoke-all-guides-btn');
    if (revokeAllGuidesBtn) {
        revokeAllGuidesBtn.addEventListener('click', revokeAllGuides);
    }

    // Guide note modal buttons
    const closeGuideNoteModalBtn = document.getElementById('close-guide-note-modal-btn');
    if (closeGuideNoteModalBtn) {
        closeGuideNoteModalBtn.addEventListener('click', closeGuideNoteModal);
    }

    const saveGuideNoteBtn = document.getElementById('save-guide-note-btn');
    if (saveGuideNoteBtn) {
        saveGuideNoteBtn.addEventListener('click', saveGuideNote);
    }

    const cancelGuideNoteBtn = document.getElementById('cancel-guide-note-btn');
    if (cancelGuideNoteBtn) {
        cancelGuideNoteBtn.addEventListener('click', closeGuideNoteModal);
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

    // Guide type toggle buttons
    const toggleStudyGuidesBtn = document.getElementById('toggle-study-guides');
    const toggleClassPackagesBtn = document.getElementById('toggle-class-packages');

    if (toggleStudyGuidesBtn) {
        toggleStudyGuidesBtn.addEventListener('click', () => switchGuideType('study_guide'));
    }

    if (toggleClassPackagesBtn) {
        toggleClassPackagesBtn.addEventListener('click', () => switchGuideType('class_package'));
    }
});
