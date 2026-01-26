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

        // Avatar - use first initial or email initial
        const avatar = document.getElementById('profile-avatar');
        const initial = data.first_name ? data.first_name.charAt(0).toUpperCase() : data.email.charAt(0).toUpperCase();
        avatar.innerHTML = '<span>' + initial + '</span>';

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

        // Determine auth provider
        let authProvider = 'Email';
        if (data.has_google) {
            authProvider = 'Google';
        } else if (data.has_discord) {
            authProvider = 'Discord';
        } else if (data.has_apple) {
            authProvider = 'Apple';
        }

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
                '<span class="info-value"><i class="' + getAuthProviderIcon(authProvider) + '"></i> ' + authProvider + '</span>' +
            '</div>' +
            '<div class="info-item">' +
                '<span class="info-label">Account Created</span>' +
                '<span class="info-value">' + formatDate(data.created_at) + '</span>' +
            '</div>' +
            '<div class="info-item">' +
                '<span class="info-label">Last Login</span>' +
                '<span class="info-value">' + formatDate(data.last_login) + '</span>' +
            '</div>';

        // Guides - use correct field names from Purchase model
        const guides = userData.guides || [];
        const activeGuides = guides.filter(function(g) { return g.is_active; });
        document.getElementById('guides-count').textContent = activeGuides.length;

        if (guides.length === 0) {
            document.getElementById('guides-list').innerHTML = '<p style="color: #6b7280; padding: 12px 0;">No guides owned yet.</p>';
        } else {
            let guidesHtml = '';
            guides.forEach(function(g) {
                // Use correct field names: product_name, product_id, purchased_at, source, is_active
                const sourceIcon = g.source === 'stripe'
                    ? '<i class="fas fa-credit-card" style="color: #6772e5;"></i> Purchased'
                    : '<i class="fas fa-gift" style="color: #10b981;"></i> Admin Grant';
                const statusClass = g.is_active ? 'active' : 'revoked';
                const statusText = g.is_active ? 'Active' : 'Revoked';
                const guideName = g.product_name || g.product_id || 'Unknown Guide';

                guidesHtml +=
                    '<div class="guide-item">' +
                        '<div class="guide-item-info">' +
                            '<div class="guide-item-name">' + escapeHtml(guideName) + '</div>' +
                            '<div class="guide-item-meta">' +
                                sourceIcon + ' &bull; ' + formatDate(g.purchased_at) +
                            '</div>' +
                        '</div>' +
                        '<span class="badge-status ' + statusClass + '">' + statusText + '</span>' +
                    '</div>';
            });
            document.getElementById('guides-list').innerHTML = guidesHtml;
        }

        // Activity timeline (downloads) - show product name
        const downloads = downloadsData.downloads || [];
        if (downloads.length === 0) {
            document.getElementById('activity-timeline').innerHTML = '<p style="color: #6b7280; padding: 12px 0;">No activity recorded yet.</p>';
        } else {
            let activityHtml = '';
            downloads.slice(0, 10).forEach(function(d) {
                const productName = d.product_name || d.product_id || 'Unknown';
                activityHtml +=
                    '<div class="activity-item">' +
                        '<div class="activity-icon download">' +
                            '<i class="fas fa-download"></i>' +
                        '</div>' +
                        '<div class="activity-content">' +
                            '<div class="activity-title">Downloaded ' + escapeHtml(productName) + '</div>' +
                            '<div class="activity-meta">' + formatDate(d.downloaded_at) + '</div>' +
                        '</div>' +
                    '</div>';
            });
            document.getElementById('activity-timeline').innerHTML = activityHtml;
        }

        // Admin notes - use correct field name: note_text (not note)
        const notes = userData.notes || [];
        if (notes.length === 0) {
            document.getElementById('notes-list').innerHTML = '<p style="color: #6b7280; padding: 12px 0;">No admin notes yet.</p>';
        } else {
            let notesHtml = '';
            notes.forEach(function(n) {
                notesHtml +=
                    '<div class="note-item">' +
                        '<p class="note-text">' + escapeHtml(n.note_text) + '</p>' +
                        '<div class="note-meta">' +
                            '<i class="fas fa-user"></i> ' + escapeHtml(n.admin_email) + ' &bull; ' + formatDate(n.created_at) +
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

function getAuthProviderIcon(provider) {
    switch (provider) {
        case 'Google':
            return 'fab fa-google';
        case 'Discord':
            return 'fab fa-discord';
        case 'Apple':
            return 'fab fa-apple';
        default:
            return 'fas fa-envelope';
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
                // API expects note_text field
                await apiCall('/admin/users/by-email/' + encodeURIComponent(userEmail) + '/notes', {
                    method: 'POST',
                    body: JSON.stringify({ note_text: noteText })
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

    // Add Note button in header (same as toggle)
    const addNoteBtnHeader = document.getElementById('add-note-btn');
    if (addNoteBtnHeader) {
        addNoteBtnHeader.addEventListener('click', function() {
            const form = document.getElementById('add-note-form');
            form.style.display = 'block';
            document.getElementById('note-text').focus();
            // Scroll to the notes section
            document.querySelector('.profile-section:last-child').scrollIntoView({ behavior: 'smooth' });
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
    else if (type === 'warning') iconName = 'exclamation-triangle';

    toast.innerHTML = '<i class="fas fa-' + iconName + '"></i><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}
