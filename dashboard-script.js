// Study home: profile, recent guides, and account verification.
const authReady = requireAuth();
let cachedSubscriptionStatus = null;

document.addEventListener('DOMContentLoaded', async function() {

    // Wait for auth check (including silent token refresh) before loading data
    const isValid = await authReady;
    if (isValid === false) return; // Redirect already in progress

    // Load user profile from API
    await loadUserProfile();

    // User menu dropdown toggle
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });

        userDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#logout') {
                    e.preventDefault();
                    performLogout();
                }
                userDropdown.classList.remove('active');
            });
        });
    }

    // ── Mobile sidebar toggle ──────────────────────────────
    const sidebar = document.getElementById('dash-sidebar');
    const sidebarOverlay = document.getElementById('dash-sidebar-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (sidebar && mobileMenuBtn) {
        // Clone and replace the button to remove any existing listeners from script.js
        const freshBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(freshBtn, mobileMenuBtn);

        function openSidebar() {
            sidebar.classList.add('dash-sidebar--open');
            if (sidebarOverlay) sidebarOverlay.classList.add('dash-sidebar-overlay--visible');
            freshBtn.setAttribute('aria-expanded', 'true');
            const icon = freshBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            sidebar.classList.remove('dash-sidebar--open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('dash-sidebar-overlay--visible');
            freshBtn.setAttribute('aria-expanded', 'false');
            const icon = freshBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            document.body.style.overflow = '';
        }

        freshBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = sidebar.classList.contains('dash-sidebar--open');
            if (isOpen) closeSidebar(); else openSidebar();
        });

        // Close on overlay click
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('dash-sidebar--open')) {
                closeSidebar();
            }
        });

        // Close sidebar when a nav link is clicked
        sidebar.querySelectorAll('.dash-sidebar-item').forEach(function(link) {
            link.addEventListener('click', closeSidebar);
        });
    }
});

async function getSubscriptionStatusCached() {
    if (!cachedSubscriptionStatus) {
        cachedSubscriptionStatus = await checkSubscriptionStatus();
    }
    return cachedSubscriptionStatus;
}

async function loadUserProfile() {
    try {
        const data = await apiCall('/user/profile', { method: 'GET' });
        const user = data.user;

        // Update compact header
        const userFirstNameEl = document.getElementById('user-first-name');
        if (userFirstNameEl) {
            const displayName = user.first_name || user.email?.split('@')[0] || 'Student';
            userFirstNameEl.textContent = displayName;
        }

        // Keep administrator access in the sidebar.
        const sidebarAdmin = document.getElementById('sidebar-admin-section');
        if (sidebarAdmin && user.is_admin) sidebarAdmin.classList.remove('hidden');
        updateEmailVerificationBanner(user);

        // Update user avatar
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            const displayName = user.first_name || user.email?.split('@')[0] || 'User';
            if (typeof renderProfilePicture === 'function') {
                userAvatar.innerHTML = renderProfilePicture(user.profile_picture, 'sm', displayName);
            } else {
                const initial = user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U';
                userAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${initial}</span>`;
            }
        }

        // Update dropdown header
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Not provided';
        const dropdownUserName = document.getElementById('dropdown-user-name');
        const dropdownUserEmail = document.getElementById('dropdown-user-email');
        if (dropdownUserName) dropdownUserName.textContent = fullName;
        if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || '';

        const userAvatarLarge = document.querySelector('.user-avatar-large');
        if (userAvatarLarge) {
            const displayName = user.first_name || user.email?.split('@')[0] || 'User';
            if (typeof renderProfilePicture === 'function') {
                userAvatarLarge.innerHTML = renderProfilePicture(user.profile_picture, 'lg', displayName);
            } else {
                const initial = user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U';
                userAvatarLarge.innerHTML = `<span style="font-weight: 600; font-size: 24px;">${initial}</span>`;
            }
        }

        localStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
        console.error('Error loading profile:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message error';
        errorDiv.style.maxWidth = '600px';
        errorDiv.style.margin = '20px auto';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <div>
                <strong>Profile Load Failed</strong><br>
                <span>Failed to load your profile. This might be a temporary network issue.</span>
                <button class="retry-button" id="profile-retry-btn">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
        const container = document.querySelector('.container');
        if (container) container.insertBefore(errorDiv, container.firstChild);
        const retryBtn = document.getElementById('profile-retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', function() { window.location.reload(); });
        }
        return;
    }

    // Every student starts in the same study-focused home.
    loadFullDashboard(JSON.parse(localStorage.getItem('user')));
}

async function loadFullDashboard(user) {
    if (!user) return;
    const fullDash = document.getElementById('dashboard-full-content');
    if (fullDash) fullDash.style.display = 'block';
    // Render local history first; a slow sync must not block starting a guide.
    await loadRecentGuides();
    try {
        await syncStudyHistory();
        await loadRecentGuides();
    } catch (error) {
        console.error('Unable to sync recent study history:', error);
    }
}

async function syncStudyHistory() {
    try {
        // Load server-side study history
        var serverData = {};
        try {
                var response = await apiCall('/api/study/history', { method: 'GET' });
            serverData = response.guide_last_studied || {};
        } catch (e) {
            console.warn('[StudySync] Server fetch failed:', e.message || e);
            return;
        }

        // Load localStorage data
        var localData = {};
        try { localData = JSON.parse(localStorage.getItem('guideLastStudied') || '{}'); } catch (e) { /* Ignore malformed local history. */ }

        // Merge: for each guide, keep the most recent timestamp
        var merged = Object.assign({}, serverData);
        var hasNewData = false;

        Object.keys(localData).forEach(function(guideId) {
            var localTs = localData[guideId];
            var serverTs = merged[guideId];

            if (!serverTs) {
                merged[guideId] = localTs;
                hasNewData = true;
            } else {
                try {
                    var localDate = new Date(localTs);
                    var serverDate = new Date(serverTs);
                    if (!isNaN(localDate.getTime()) && localDate > serverDate) {
                        merged[guideId] = localTs;
                        hasNewData = true;
                    }
                } catch (e) { /* keep server version */ }
            }
        });

        // Also check if server has guides not in local
        Object.keys(serverData).forEach(function(guideId) {
            if (!localData[guideId]) {
                hasNewData = true;
            }
        });

        // Write merged data to localStorage
        localStorage.setItem('guideLastStudied', JSON.stringify(merged));

        // Push merged data back to server if there were differences
        if (hasNewData) {
            try {
                await apiCall('/api/study/history', {
                    method: 'PUT',
                    body: JSON.stringify({ guide_last_studied: merged })
                });
            } catch (e) {
                console.warn('[StudySync] Push failed:', e.message || e);
            }
        }

    } catch (e) {
        console.warn('[StudySync] Sync failed:', e);
    }
}

async function loadRecentGuides() {
    const container = document.getElementById('recent-guides-list');
    if (!container) return;

    try {
        const { hasAccess } = await getSubscriptionStatusCached();

        // Remove skeleton
        const skeleton = container.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        // Update header stat
        const guidesCountStat = document.getElementById('guides-count');

        if (hasAccess) {
            if (guidesCountStat) guidesCountStat.textContent = 'Full Access';

            // Get recently studied guides from localStorage
            let lastStudiedMap = {};
            try {
                lastStudiedMap = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
            } catch (e) { /* ignore */ }

            // Sort by most recent
            const recentEntries = Object.entries(lastStudiedMap)
                .map(([id, date]) => ({ id, date: new Date(date) }))
                .filter(e => /^[a-z0-9-]+$/.test(e.id) && !isNaN(e.date.getTime()))
                .sort((a, b) => b.date - a.date)
                .slice(0, 3);

            if (recentEntries.length > 0) {
                container.innerHTML = recentEntries.map(entry => {
                    const name = formatGuideName(entry.id);
                    const timeAgo = formatRelativeTime(entry.date.toISOString());
                    const iconSrc = 'assets/images/guide-icons/' + entry.id + '.webp';
                    return `
                        <div class="recent-guide-item">
                            <div class="recent-guide-icon-img">
                                <img src="${iconSrc}" alt="" loading="lazy">
                            </div>
                            <div class="recent-guide-info">
                                <span class="recent-guide-name">${escapeHtml(name)}</span>
                                <span class="recent-guide-time">${timeAgo || 'Recently'}</span>
                            </div>
                            <button class="btn-row-open" data-study="${escapeHtml(entry.id)}">Open</button>
                        </div>
                    `;
                }).join('');

                // Attach listeners
                container.querySelectorAll('[data-study]').forEach(btn => {
                    btn.addEventListener('click', function() {
                        continueStudying(this.dataset.study);
                    });
                });
            } else {
                container.innerHTML = `
                    <div class="recent-guides-empty">
                        <i class="fas fa-book-open"></i>
                        <p>Your recently opened guides will appear here. Pick a topic to begin.</p>
                        <button class="btn btn-primary btn-sm" data-navigate="my-guides.html">
                            <i class="fas fa-rocket"></i> Start Studying
                        </button>
                    </div>
                `;
                container.querySelectorAll('[data-navigate]').forEach(btn => {
                    btn.addEventListener('click', function() {
                        window.location.href = this.dataset.navigate;
                    });
                });
            }

            // Store subscription state for other pages
            localStorage.setItem('purchasedGuides', JSON.stringify(Object.keys(lastStudiedMap)));

        } else {
            // Non-subscriber
            if (guidesCountStat) guidesCountStat.textContent = 'No Subscription';

            container.innerHTML = `
                <div class="recent-guides-empty">
                    <i class="fas fa-book-open"></i>
                    <p>As you study, your recent guides will appear here for quick access.</p>
                </div>
            `;
            container.querySelectorAll('[data-navigate]').forEach(btn => {
                btn.addEventListener('click', function() {
                    window.location.href = this.dataset.navigate;
                });
            });
        }
    } catch (error) {
        console.error('Error loading recent guides:', error);
        const skeleton = container.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();
        container.innerHTML = `
            <div class="recent-guides-empty">
                <i class="fas fa-exclamation-circle"></i>
                <p>We couldn’t load your recent guides. You can still <a href="my-guides.html">browse study guides</a>.</p>
            </div>
        `;
    }
}

function formatGuideName(productId) {
    return productId.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function continueStudying(productId) {
    try {
        const lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
        lastStudied[productId] = new Date().toISOString();
        localStorage.setItem('guideLastStudied', JSON.stringify(lastStudied));
    } catch (e) {
        console.error('Error saving last studied:', e);
    }
    // Fire-and-forget server sync
    try {
        apiCall('/api/study/record', {
            method: 'POST',
            body: JSON.stringify({ guide_id: productId })
        }).catch(function() {});
    } catch (e) { /* ignore */ }
    if (typeof trackBetaEvent === 'function') trackBetaEvent('guide_opened', { guide_id: productId });
    window.location.href = `guides/${productId}.html`;
}

function updateEmailVerificationBanner(user) {
    // Hide the old main-content banner permanently
    var oldBanner = document.getElementById('email-verification-banner');
    if (oldBanner) oldBanner.classList.add('hidden');

    // Show subtle sidebar nudge instead
    var nudge = document.getElementById('sidebar-verify-nudge');
    var resendBtn = document.getElementById('sidebar-resend-btn');
    if (!nudge) return;

    // Check multiple signals: backend verified flag, OAuth via localStorage, or Discord-connected
    var authMethod = localStorage.getItem('lastAuthMethod');
    var isOAuthUser = authMethod === 'google' || authMethod === 'discord';
    var hasDiscord = user.has_discord === true;

    // If verified, OAuth user, or Discord-connected — hide
    if (user.is_verified || isOAuthUser || hasDiscord) {
        nudge.classList.add('hidden');
        return;
    }

    // Show for genuinely unverified email-only users
    if (!user.is_verified) {
        nudge.classList.remove('hidden');

        if (resendBtn) {
            resendBtn.onclick = async function() {
                resendBtn.disabled = true;
                resendBtn.textContent = 'Sending...';

                try {
                    await apiCall('/auth/resend-verification', {
                        method: 'POST',
                        body: JSON.stringify({ email: user.email })
                    });
                    resendBtn.textContent = 'Sent!';
                    resendBtn.style.borderColor = 'var(--green)';
                    resendBtn.style.color = 'var(--green)';
                    setTimeout(function() {
                        resendBtn.disabled = false;
                        resendBtn.textContent = 'Resend';
                        resendBtn.style.borderColor = '';
                        resendBtn.style.color = '';
                    }, 3000);
                } catch (error) {
                    console.error('Error resending verification:', error);
                    resendBtn.textContent = 'Failed';
                    resendBtn.style.borderColor = 'var(--red)';
                    resendBtn.style.color = 'var(--red)';
                    setTimeout(function() {
                        resendBtn.disabled = false;
                        resendBtn.textContent = 'Resend';
                        resendBtn.style.borderColor = '';
                        resendBtn.style.color = '';
                    }, 3000);
                }
            };
        }
    }
}

function formatRelativeTime(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return formatDate(dateString);
}
