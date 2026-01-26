/**
 * Admin User Profile Page Script
 * Handles loading and displaying individual user profiles for admin viewing
 */

// Get email from URL
const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('email');

if (!userEmail) {
    window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', async function() {
    const pageLoader = document.getElementById('page-loader');

    try {
        // Check if api-service.js loaded properly
        if (typeof isAuthenticated !== 'function') {
            throw new Error('API service not loaded');
        }

        // Check authentication
        if (!isAuthenticated()) {
            window.location.href = 'login.html';
            return;
        }

        // Verify admin access
        const user = getCurrentUser();
        console.log('Current user:', user); // Debug log

        if (!user || !user.is_admin) {
            console.log('User not admin, redirecting to dashboard');
            window.location.href = 'dashboard.html';
            return;
        }

        console.log('Loading profile for:', userEmail); // Debug log

        // Load user profile
        await loadUserProfile();

        // Setup event listeners
        setupEventListeners();

    } catch (error) {
        console.error('Error initializing user profile page:', error);
        showToast('Failed to initialize page: ' + error.message, 'error');

        // Show error state
        document.getElementById('profile-name').textContent = 'Error';
        document.getElementById('profile-email').textContent = error.message;
    } finally {
        // Always hide page loader
        if (pageLoader) {
            pageLoader.style.display = 'none';
        }
    }
});

async function loadUserProfile() {
    try {
        console.log('Fetching user data...'); // Debug log

        // Add timeout wrapper for API calls
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), 15000)
        );

        const [userData, downloadsData] = await Promise.race([
            Promise.all([
                apiCall('/admin/users/by-email/' + encodeURIComponent(userEmail)),
                apiCall('/admin/users/by-email/' + encodeURIComponent(userEmail) + '/downloads').catch(() => ({ downloads: [] }))
            ]),
            timeoutPromise
        ]);

        console.log('User data received:', userData); // Debug log

        const data = userData.user;

        // Update header
        const displayName = ((data.first_name || '') + ' ' + (data.last_name || '')).trim() || 'Unknown User';
        document.getElementById('profile-name').textContent = displayName;
        document.getElementById('profile-email').textContent = data.email;

        // Avatar
        const avatar = document.getElementById('profile-avatar');
        if (data.first_name) {
            avatar.innerHTML = '<span>' + data.first_name.charAt(0).toUpperCase() + '</span>';
        }

        // Badges
        const badges = document.getElementById('profile-badges');
        let badgesHtml = '';
        if (data.is_admin) {
            badgesHtml += '<span class="profile-badge admin"><i class="fas fa-shield-alt"></i> Admin</span>';
        }
        if (data.is_premium) {
            badgesHtml += '<span class="profile-badge premium"><i class="fas fa-crown"></i> Premium</span>';
        }
        if (data.is_verified) {
            badgesHtml += '<span class="profile-badge verified"><i class="fas fa-check"></i> Verified</span>';
        } else {
            badgesHtml += '<span class="profile-badge unverified"><i class="fas fa-times"></i> Unverified</span>';
        }
        badges.innerHTML = badgesHtml;

        // Account info
        document.getElementById('account-info-grid').innerHTML =
            '<div class="info-item">' +
                '<span class="info-label">Email</span>' +
                '<span class="info-value">' + escapeHtml(data.email) + '</span>' +
            '</div>' +
            '<div class="info-item">' +
                '<span class="info-label">Name</span>' +
                '<span class="info-value">' + escapeHtml(displayName) + '</span>' +
            '</div>' +
            '<div class="info-item">' +
                '<span class="info-label">Nursing Program</span>' +
                '<span class="info-value">' + escapeHtml(data.nursing_program || 'Not set') + '</span>' +
            '</div>' +
            '<div class="info-item">' +
                '<span class="info-label">Auth Provider</span>' +
                '<span class="info-value">' + escapeHtml(data.oauth_provider || 'Email') + '</span>' +
            '</div>' +
            '<div class="info-item">' +
                '<span class="info-label">Account Created</span>' +
                '<span class="info-value">' + formatDate(data.created_at) + '</span>' +
            '</div>' +
            '<div class="info-item">' +
                '<span class="info-label">Last Updated</span>' +
                '<span class="info-value">' + formatDate(data.updated_at) + '</span>' +
            '</div>';

        // Guides
        const guides = userData.guides || [];
        document.getElementById('guides-count').textContent = guides.length;

        if (guides.length === 0) {
            document.getElementById('guides-list').innerHTML = '<p style="color: #6b7280;">No guides owned yet.</p>';
        } else {
            let guidesHtml = '';
            guides.forEach(function(g) {
                const sourceIcon = g.source === 'stripe' ? '<i class="fas fa-credit-card"></i> Purchased' : '<i class="fas fa-gift"></i> Admin Grant';
                const statusClass = g.is_active ? 'verified' : 'revoked';
                const statusText = g.is_active ? 'Active' : 'Revoked';
                guidesHtml +=
                    '<div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f3f4f6;">' +
                        '<div>' +
                            '<div style="font-weight: 500;">' + escapeHtml(g.guide_id) + '</div>' +
                            '<div style="font-size: 0.85rem; color: #6b7280;">' +
                                sourceIcon + ' - ' + formatDate(g.granted_at) +
                            '</div>' +
                        '</div>' +
                        '<span class="badge-status ' + statusClass + '">' + statusText + '</span>' +
                    '</div>';
            });
            document.getElementById('guides-list').innerHTML = guidesHtml;
        }

        // Activity timeline (downloads)
        const downloads = downloadsData.downloads || [];
        if (downloads.length === 0) {
            document.getElementById('activity-timeline').innerHTML = '<p style="color: #6b7280;">No activity recorded yet.</p>';
        } else {
            let activityHtml = '';
            downloads.slice(0, 10).forEach(function(d) {
                activityHtml +=
                    '<div class="activity-item">' +
                        '<div class="activity-icon download">' +
                            '<i class="fas fa-download"></i>' +
                        '</div>' +
                        '<div class="activity-content">' +
                            '<div class="activity-title">Downloaded ' + escapeHtml(d.product_id) + '</div>' +
                            '<div class="activity-meta">' + formatDate(d.downloaded_at) + '</div>' +
                        '</div>' +
                    '</div>';
            });
            document.getElementById('activity-timeline').innerHTML = activityHtml;
        }

        // Admin notes
        const notes = userData.admin_notes || [];
        if (notes.length === 0) {
            document.getElementById('notes-list').innerHTML = '<p style="color: #6b7280;">No admin notes yet.</p>';
        } else {
            let notesHtml = '';
            notes.forEach(function(n) {
                notesHtml +=
                    '<div style="padding: 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 12px;">' +
                        '<p style="margin: 0 0 8px; color: var(--text-color, #1f2937);">' + escapeHtml(n.note) + '</p>' +
                        '<div style="font-size: 0.8rem; color: #6b7280;">' +
                            '<i class="fas fa-user"></i> ' + escapeHtml(n.admin_email) + ' - ' + formatDate(n.created_at) +
                        '</div>' +
                    '</div>';
            });
            document.getElementById('notes-list').innerHTML = notesHtml;
        }

    } catch (error) {
        console.error('Error loading user profile:', error);
        showToast('Failed to load user profile', 'error');

        // Show error state in UI instead of leaving loading spinners
        document.getElementById('profile-name').textContent = 'Error Loading User';
        document.getElementById('profile-email').textContent = userEmail;
        document.getElementById('account-info-grid').innerHTML = '<p style="color: #dc2626;">Failed to load user data. Please try refreshing the page.</p>';
        document.getElementById('guides-list').innerHTML = '<p style="color: #dc2626;">Failed to load guides.</p>';
        document.getElementById('activity-timeline').innerHTML = '<p style="color: #dc2626;">Failed to load activity.</p>';
        document.getElementById('notes-list').innerHTML = '<p style="color: #dc2626;">Failed to load notes.</p>';
    }
}

function setupEventListeners() {
    // Toggle note form
    const toggleNoteFormBtn = document.getElementById('toggle-note-form-btn');
    if (toggleNoteFormBtn) {
        toggleNoteFormBtn.addEventListener('click', function() {
            const form = document.getElementById('add-note-form');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });
    }

    const cancelNoteBtn = document.getElementById('cancel-note-btn');
    if (cancelNoteBtn) {
        cancelNoteBtn.addEventListener('click', function() {
            document.getElementById('add-note-form').style.display = 'none';
            document.getElementById('note-text').value = '';
        });
    }

    const saveNoteBtn = document.getElementById('save-note-btn');
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', async function() {
            const noteText = document.getElementById('note-text').value.trim();
            if (!noteText) {
                showToast('Please enter a note', 'warning');
                return;
            }

            try {
                await apiCall('/admin/users/by-email/' + encodeURIComponent(userEmail) + '/notes', {
                    method: 'POST',
                    body: JSON.stringify({ note: noteText })
                });
                showToast('Note added successfully', 'success');
                document.getElementById('add-note-form').style.display = 'none';
                document.getElementById('note-text').value = '';
                loadUserProfile();
            } catch (error) {
                showToast('Failed to add note', 'error');
            }
        });
    }

    const addGuideBtn = document.getElementById('add-guide-btn');
    if (addGuideBtn) {
        addGuideBtn.addEventListener('click', function() {
            // Redirect to admin with modal trigger
            window.location.href = 'admin.html?action=add-guide&email=' + encodeURIComponent(userEmail);
        });
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showToast(message, type) {
    type = type || 'info';
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;

    let iconName = 'info-circle';
    if (type === 'success') iconName = 'check-circle';
    else if (type === 'error') iconName = 'exclamation-circle';

    toast.innerHTML = '<i class="fas fa-' + iconName + '"></i><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}
