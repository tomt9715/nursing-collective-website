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

// Store guides data for filtering
let allGuidesData = [];
let currentGuidesFilter = 'all';
let currentGuidesSort = 'date-desc';

document.addEventListener('DOMContentLoaded', async function() {
    const pageLoader = document.getElementById('page-loader');

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

        // Subscription data
        const guides = []; // Legacy: individual guide purchases removed
        allGuidesData = guides;

        const activeGuides = guides.filter(function(g) { return g.is_active; });
        const revokedGuides = guides.filter(function(g) { return !g.is_active; });

        // Update counts
        document.getElementById('guides-count').textContent = activeGuides.length;
        document.getElementById('guides-count-all').textContent = guides.length;
        document.getElementById('guides-count-active').textContent = activeGuides.length;
        document.getElementById('guides-count-revoked').textContent = revokedGuides.length;

        // Render guides with current filter
        renderGuides(currentGuidesFilter);

        // Activity timeline (downloads) - show product name
        const downloads = downloadsData.downloads || [];
        document.getElementById('activity-count').textContent = downloads.length;

        if (downloads.length === 0) {
            document.getElementById('activity-timeline').innerHTML = '<p style="color: #6b7280; padding: 12px 0;">No activity recorded yet.</p>';
        } else {
            let activityHtml = '';
            downloads.forEach(function(d) {
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

function renderGuides(filter, sort) {
    if (filter) currentGuidesFilter = filter;
    if (sort) currentGuidesSort = sort;

    let filteredGuides = allGuidesData.slice(); // Clone array

    // Apply filter
    if (currentGuidesFilter === 'active') {
        filteredGuides = filteredGuides.filter(function(g) { return g.is_active; });
    } else if (currentGuidesFilter === 'revoked') {
        filteredGuides = filteredGuides.filter(function(g) { return !g.is_active; });
    }

    // Apply sort
    filteredGuides.sort(function(a, b) {
        switch (currentGuidesSort) {
            case 'date-desc':
                return new Date(b.purchased_at || 0) - new Date(a.purchased_at || 0);
            case 'date-asc':
                return new Date(a.purchased_at || 0) - new Date(b.purchased_at || 0);
            case 'name-asc':
                return (a.product_name || '').localeCompare(b.product_name || '');
            case 'name-desc':
                return (b.product_name || '').localeCompare(a.product_name || '');
            case 'source':
                if (a.source === b.source) return 0;
                return a.source === 'admin' ? -1 : 1;
            default:
                return 0;
        }
    });

    const guidesList = document.getElementById('guides-list');

    if (allGuidesData.length === 0) {
        guidesList.innerHTML = '<p style="color: #6b7280; padding: 12px 0;">No guides owned yet.</p>';
        return;
    }

    if (filteredGuides.length === 0) {
        const emptyMsg = currentGuidesFilter === 'active' ? 'No active guides' : 'No revoked guides';
        const emptyIcon = currentGuidesFilter === 'active' ? 'fa-check-circle' : 'fa-times-circle';
        guidesList.innerHTML =
            '<div class="empty-filter-state">' +
                '<i class="fas ' + emptyIcon + '"></i>' +
                '<p>' + emptyMsg + '</p>' +
            '</div>';
        return;
    }

    let guidesHtml = '';
    filteredGuides.forEach(function(g) {
        const sourceIcon = g.source === 'stripe'
            ? '<i class="fas fa-credit-card" style="color: #6772e5;"></i> Stripe'
            : '<i class="fas fa-gift" style="color: #10b981;"></i> Admin Grant';
        const statusClass = g.is_active ? 'active' : 'revoked';
        const statusText = g.is_active ? 'Active' : 'Revoked';
        const guideName = g.product_name || g.product_id || 'Unknown Guide';

        guidesHtml +=
            '<div class="guide-item">' +
                '<div class="guide-item-info">' +
                    '<div class="guide-item-name">' + escapeHtml(guideName) + '</div>' +
                    '<div class="guide-item-meta">' +
                        sourceIcon + ' &bull; ' + formatDate(g.purchased_at || g.created_at) +
                    '</div>' +
                '</div>' +
                '<span class="badge-status ' + statusClass + '">' + statusText + '</span>' +
            '</div>';
    });
    guidesList.innerHTML = guidesHtml;
}

function setupEventListeners() {
    // Guides filter toggles
    const guidesFilterToggles = document.getElementById('guides-filter-toggles');
    if (guidesFilterToggles) {
        guidesFilterToggles.addEventListener('click', function(e) {
            const btn = e.target.closest('.filter-toggle-btn');
            if (!btn) return;

            // Update active state
            guidesFilterToggles.querySelectorAll('.filter-toggle-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            // Apply filter
            const filter = btn.dataset.filter;
            renderGuides(filter, null);
        });
    }

    // Guides sort dropdown
    const guidesSort = document.getElementById('guides-sort');
    if (guidesSort) {
        guidesSort.addEventListener('change', function() {
            renderGuides(null, this.value);
        });
    }

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
            openAddGuideModal();
        });
    }

    // Initialize Add Guide modal listeners
    initAddGuideModal();

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

    const safeMsg = document.createElement('span');
    safeMsg.textContent = message;
    toast.innerHTML = '<i class="fas fa-' + iconName + '"></i><span></span>';
    toast.querySelector('span').textContent = message;
    container.appendChild(toast);
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

// ==================== Add Guide Modal ====================

let addGuideSelectedItems = new Set();
let addGuideCurrentType = 'study_guide';
let addGuideSearchQuery = '';
let productsCache = [];

async function loadProductsForModal() {
    if (productsCache.length > 0) return;

    try {
        const data = { guides: [] }; // Legacy: individual guide management removed
        productsCache = data.guides || [];
    } catch (error) {
        console.error('Error loading products:', error);
        productsCache = [];
    }
}

function openAddGuideModal() {
    // Reset state
    addGuideSelectedItems.clear();
    addGuideCurrentType = 'study_guide';
    addGuideSearchQuery = '';

    document.getElementById('add-guide-user-email').textContent = userEmail;
    document.getElementById('add-guide-reason').value = 'promotional_giveaway';
    document.getElementById('add-guide-notes').value = '';

    // Reset type toggle
    document.querySelectorAll('.add-guide-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === 'study_guide');
    });

    // Reset search
    const searchInput = document.getElementById('add-guide-search');
    if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = 'Search study guides...';
    }
    const clearBtn = document.getElementById('add-guide-search-clear');
    if (clearBtn) clearBtn.style.display = 'none';

    // Load products and render
    loadProductsForModal().then(() => {
        renderAddGuideList();
        updateSelectedGuidesDisplay();
    });

    // Disable submit button
    document.getElementById('submit-add-guide-btn').disabled = true;

    document.getElementById('add-guide-modal').classList.add('active');
}

function renderAddGuideList() {
    const listContainer = document.getElementById('add-guide-list');
    if (!listContainer) return;

    // Filter guides based on type and search
    const filteredGuides = productsCache.filter(p => {
        if (p.type === 'subscription') return false;

        const isStudyGuide = p.type === 'individual';
        const isPackage = p.type === 'lite-package' || p.type === 'full-package';

        if (addGuideCurrentType === 'study_guide' && !isStudyGuide) return false;
        if (addGuideCurrentType === 'class_package' && !isPackage) return false;

        if (addGuideSearchQuery && !p.name.toLowerCase().includes(addGuideSearchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    if (filteredGuides.length === 0) {
        listContainer.innerHTML = `
            <div class="add-guide-empty">
                <i class="fas fa-search"></i>
                No ${addGuideCurrentType === 'study_guide' ? 'study guides' : 'class packages'} found
            </div>
        `;
        return;
    }

    listContainer.innerHTML = filteredGuides.map(guide => `
        <div class="add-guide-item ${addGuideSelectedItems.has(guide.id) ? 'selected' : ''}"
             data-guide-id="${escapeHtml(guide.id)}"
             data-guide-name="${escapeHtml(guide.name)}">
            <div class="add-guide-item-checkbox"></div>
            <div class="add-guide-item-info">
                <div class="add-guide-item-name">${escapeHtml(guide.name)}</div>
                <div class="add-guide-item-price">$${guide.price}</div>
            </div>
        </div>
    `).join('');

    // Add click listeners
    listContainer.querySelectorAll('.add-guide-item').forEach(item => {
        item.addEventListener('click', function() {
            const guideId = this.dataset.guideId;

            if (addGuideSelectedItems.has(guideId)) {
                addGuideSelectedItems.delete(guideId);
                this.classList.remove('selected');
            } else {
                addGuideSelectedItems.add(guideId);
                this.classList.add('selected');
            }

            updateSelectedGuidesDisplay();
        });
    });
}

function updateSelectedGuidesDisplay() {
    const container = document.getElementById('selected-guides-container');
    const chipsContainer = document.getElementById('selected-guides-chips');
    const countSpan = document.getElementById('selected-guides-count');
    const submitBtn = document.getElementById('submit-add-guide-btn');

    if (addGuideSelectedItems.size === 0) {
        container.style.display = 'none';
        submitBtn.disabled = true;
        return;
    }

    container.style.display = 'block';
    countSpan.textContent = addGuideSelectedItems.size;
    submitBtn.disabled = false;

    // Get guide names from cache
    const chips = [];
    addGuideSelectedItems.forEach(guideId => {
        const guide = productsCache.find(p => p.id === guideId);
        if (guide) {
            chips.push(`
                <div class="selected-guide-chip" data-guide-id="${escapeHtml(guideId)}">
                    <span>${escapeHtml(guide.name.length > 25 ? guide.name.substring(0, 25) + '...' : guide.name)}</span>
                    <button class="selected-guide-chip-remove" data-guide-id="${escapeHtml(guideId)}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `);
        }
    });

    chipsContainer.innerHTML = chips.join('');

    // Add remove listeners
    chipsContainer.querySelectorAll('.selected-guide-chip-remove').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const guideId = this.dataset.guideId;
            addGuideSelectedItems.delete(guideId);

            // Update list item if visible
            const listItem = document.querySelector(`.add-guide-item[data-guide-id="${guideId}"]`);
            if (listItem) listItem.classList.remove('selected');

            updateSelectedGuidesDisplay();
        });
    });
}

function initAddGuideModal() {
    // Type toggle buttons
    document.querySelectorAll('.add-guide-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.add-guide-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            addGuideCurrentType = this.dataset.type;

            // Update search placeholder
            const searchInput = document.getElementById('add-guide-search');
            if (searchInput) {
                searchInput.placeholder = addGuideCurrentType === 'study_guide'
                    ? 'Search study guides...'
                    : 'Search class packages...';
            }

            renderAddGuideList();
        });
    });

    // Search input
    const searchInput = document.getElementById('add-guide-search');
    const clearBtn = document.getElementById('add-guide-search-clear');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            addGuideSearchQuery = this.value.trim();
            clearBtn.style.display = addGuideSearchQuery ? 'flex' : 'none';
            renderAddGuideList();
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                addGuideSearchQuery = '';
                clearBtn.style.display = 'none';
                renderAddGuideList();
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            addGuideSearchQuery = '';
            this.style.display = 'none';
            renderAddGuideList();
            searchInput.focus();
        });
    }

    // Close button
    const closeBtn = document.getElementById('close-add-guide-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAddGuideModal);
    }

    // Cancel button
    const cancelBtn = document.getElementById('cancel-add-guide-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeAddGuideModal);
    }

    // Submit button
    const submitBtn = document.getElementById('submit-add-guide-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitAddGuide);
    }
}

function closeAddGuideModal() {
    document.getElementById('add-guide-modal').classList.remove('active');
    addGuideSelectedItems.clear();
}

async function submitAddGuide() {
    if (addGuideSelectedItems.size === 0) {
        showToast('Please select at least one guide', 'error');
        return;
    }

    const reason = document.getElementById('add-guide-reason').value;
    const notes = document.getElementById('add-guide-notes').value;
    const submitBtn = document.getElementById('submit-add-guide-btn');

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Granting...';

    let successCount = 0;
    let errorCount = 0;
    const selectedIds = Array.from(addGuideSelectedItems);

    for (const guideId of selectedIds) {
        try {
            await apiCall(`/admin/users/by-email/${encodeURIComponent(userEmail)}/guides`, {
                method: 'POST',
                body: JSON.stringify({ guide_id: guideId, reason, notes })
            });
            successCount++;
        } catch (error) {
            console.error('Error granting guide:', guideId, error);
            errorCount++;
        }
    }

    // Reset button
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Grant Access';
    submitBtn.disabled = false;

    if (successCount > 0) {
        const plural = successCount > 1 ? 'guides' : 'guide';
        showToast(`Successfully granted ${successCount} ${plural}`, 'success');
    }
    if (errorCount > 0) {
        showToast(`Failed to grant ${errorCount} guide(s)`, 'error');
    }

    closeAddGuideModal();

    // Refresh the guides list
    loadUserProfile();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
