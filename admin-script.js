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
    // Tab navigation
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // User search
    document.getElementById('user-search-btn').addEventListener('click', searchUsers);
    document.getElementById('user-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchUsers();
    });

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
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
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
        const data = await apiCall('/admin/dashboard/enhanced');

        // Update hero stats
        const heroTotalUsers = document.getElementById('hero-total-users');
        const heroRevenue = document.getElementById('hero-revenue');
        const heroNewToday = document.getElementById('hero-new-today');
        if (heroTotalUsers) heroTotalUsers.textContent = data.statistics.total_users;
        if (heroRevenue) heroRevenue.textContent = `$${data.revenue.this_month.toFixed(0)}`;
        if (heroNewToday) heroNewToday.textContent = data.statistics.new_users_today;

        // Update main stats
        document.getElementById('stat-total-users').textContent = data.statistics.total_users;
        document.getElementById('stat-premium-users').textContent = data.statistics.premium_users;
        document.getElementById('stat-new-today').textContent = data.statistics.new_users_today;
        document.getElementById('stat-stripe-purchases').textContent = data.purchases.stripe_purchases;
        document.getElementById('stat-admin-grants').textContent = data.purchases.admin_granted;
        document.getElementById('stat-revenue-month').textContent = `$${data.revenue.this_month.toFixed(2)}`;

        // Update verified users if available
        const verifiedUsersEl = document.getElementById('stat-verified-users');
        if (verifiedUsersEl) {
            verifiedUsersEl.textContent = data.statistics.verified_users || data.statistics.total_users;
        }

        // Update total guides owned
        const totalGuidesEl = document.getElementById('stat-total-guides-sold');
        if (totalGuidesEl) {
            totalGuidesEl.textContent = (data.purchases.stripe_purchases || 0) + (data.purchases.admin_granted || 0);
        }

        // Update orders count
        const ordersCountEl = document.getElementById('orders-count');
        if (ordersCountEl) {
            ordersCountEl.textContent = data.purchases.stripe_purchases || 0;
        }

        // Calculate and update rate badges
        const totalUsers = data.statistics.total_users || 1;
        const premiumRate = document.getElementById('premium-rate');
        const verifiedRate = document.getElementById('verified-rate');
        if (premiumRate) {
            const rate = ((data.statistics.premium_users / totalUsers) * 100).toFixed(1);
            premiumRate.textContent = `${rate}%`;
        }
        if (verifiedRate) {
            const verified = data.statistics.verified_users || data.statistics.total_users;
            const rate = ((verified / totalUsers) * 100).toFixed(1);
            verifiedRate.textContent = `${rate}%`;
        }

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

    } catch (error) {
        console.error('Error loading dashboard:', error);
        showToast('Failed to load dashboard data', 'error');
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

        // Render table
        tbody.innerHTML = usersWithGuides.map(user => `
            <tr>
                <td><strong>${escapeHtml(user.email)}</strong></td>
                <td>${escapeHtml(`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-')}</td>
                <td>${user.guides_count}</td>
                <td>
                    ${user.is_admin ? '<span class="badge-status admin"><i class="fas fa-crown"></i> Admin</span>' : ''}
                    ${user.is_premium ? '<span class="badge-status premium"><i class="fas fa-star"></i> Premium</span>' : ''}
                    ${user.is_verified ? '<span class="badge-status verified"><i class="fas fa-check"></i> Verified</span>' : '<span class="badge-status unverified">Unverified</span>'}
                </td>
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

        // Attach event listeners to View buttons
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

// ==================== User Detail Modal ====================

async function openUserDetail(email) {
    currentUserEmail = email;
    const modal = document.getElementById('user-detail-modal');
    modal.classList.add('active');

    document.getElementById('modal-user-email').textContent = email;
    document.getElementById('user-info-grid').innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    document.getElementById('user-guides-list').innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    document.getElementById('user-notes-list').innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';

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
                <span class="info-value">
                    ${data.user.is_admin ? '<span class="badge-status admin">Admin</span>' : ''}
                    ${data.user.is_premium ? '<span class="badge-status premium">Premium</span>' : ''}
                    ${data.user.is_verified ? '<span class="badge-status verified">Verified</span>' : '<span class="badge-status unverified">Unverified</span>'}
                </span>
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

        // Guides
        document.getElementById('modal-guides-count').textContent = data.guides.filter(g => g.is_active).length;

        const guidesListEl = document.getElementById('user-guides-list');
        if (data.guides.length === 0) {
            guidesListEl.innerHTML = '<div class="empty-state"><p>No guides owned</p></div>';
        } else {
            guidesListEl.innerHTML = data.guides.map(guide => `
                <div class="guide-item-admin ${guide.is_active ? '' : 'revoked'}">
                    <div class="guide-info">
                        <div class="guide-name">${escapeHtml(guide.product_name)}</div>
                        <div class="guide-meta">
                            ${guide.source === 'stripe' ? '<i class="fas fa-credit-card"></i> Stripe' : `<i class="fas fa-gift"></i> ${escapeHtml(guide.granted_by || 'Admin')}`}
                            • ${formatDate(guide.purchased_at)}
                            ${guide.grant_reason ? ` • ${escapeHtml(guide.grant_reason)}` : ''}
                        </div>
                    </div>
                    <div class="guide-actions">
                        ${guide.is_active ? `
                            <button class="action-btn danger" data-revoke-guide="${escapeHtml(guide.product_id)}" data-user-email="${escapeHtml(email)}">
                                <i class="fas fa-times"></i> Revoke
                            </button>
                        ` : `
                            <span class="badge-status revoked">Revoked</span>
                            <button class="action-btn success" data-restore-guide="${escapeHtml(guide.product_id)}" data-user-email="${escapeHtml(email)}">
                                <i class="fas fa-redo"></i> Restore
                            </button>
                        `}
                    </div>
                </div>
            `).join('');

            // Attach event listeners for revoke/restore buttons
            guidesListEl.querySelectorAll('[data-revoke-guide]').forEach(btn => {
                btn.addEventListener('click', function() {
                    revokeGuide(this.dataset.userEmail, this.dataset.revokeGuide);
                });
            });
            guidesListEl.querySelectorAll('[data-restore-guide]').forEach(btn => {
                btn.addEventListener('click', function() {
                    restoreGuide(this.dataset.userEmail, this.dataset.restoreGuide);
                });
            });
        }

        // Notes
        if (data.notes.length === 0) {
            document.getElementById('user-notes-list').innerHTML = '<div class="empty-state"><p>No admin notes</p></div>';
        } else {
            document.getElementById('user-notes-list').innerHTML = data.notes.map(note => `
                <div class="note-item">
                    <div class="note-header">
                        <span>${escapeHtml(note.admin_email)}</span>
                        <span>${formatDate(note.created_at)}</span>
                    </div>
                    <div class="note-text">${escapeHtml(note.note_text)}</div>
                </div>
            `).join('');
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

async function loadGuides() {
    const tbody = document.getElementById('guides-table-body');
    tbody.innerHTML = '<tr><td colspan="7" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading guides...</td></tr>';

    try {
        const data = await apiCall('/admin/guides');

        if (data.guides.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="loading-cell">No guides found</td></tr>';
            return;
        }

        tbody.innerHTML = data.guides.map(guide => `
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
    // Scroll to the tabs section
    document.querySelector('.admin-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    // Tab switching buttons with data-switch-tab attribute
    document.querySelectorAll('[data-switch-tab]').forEach(btn => {
        btn.addEventListener('click', function() {
            switchToTab(this.dataset.switchTab);
        });
    });

    // Export data button
    const exportDataBtn = document.getElementById('export-data-btn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportAllData);
    }

    // User detail modal close button
    const closeUserDetailModalBtn = document.getElementById('close-user-detail-modal-btn');
    if (closeUserDetailModalBtn) {
        closeUserDetailModalBtn.addEventListener('click', closeUserDetailModal);
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
});
