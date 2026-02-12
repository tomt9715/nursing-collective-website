// Dashboard Page JavaScript
// Simplified hub layout — recent guides + quiz stats + account/subscription
// Note: API service layer is now in api-service.js

// Check authentication (uses api-service.js functions)
const authReady = requireAuth();

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
});

// ==================== Widget Update Functions ====================

function updateAccountWidget(user) {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Not set';
    const email = user.email || 'Not set';
    const hasDiscord = user.has_discord || false;

    const nameElement = document.getElementById('widget-user-name');
    const emailElement = document.getElementById('widget-user-email');
    const discordElement = document.getElementById('widget-discord-status');

    if (nameElement) nameElement.textContent = fullName;
    if (emailElement) emailElement.textContent = email;

    if (discordElement) {
        if (hasDiscord) {
            discordElement.className = 'status-badge connected';
            discordElement.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
        } else {
            discordElement.className = 'status-badge disconnected';
            discordElement.innerHTML = '<i class="fas fa-times-circle"></i> Not connected';
        }
    }
}

// ==================== Subscription Status Cache ====================
let cachedSubscriptionStatus = null;

async function getSubscriptionStatusCached() {
    if (!cachedSubscriptionStatus) {
        cachedSubscriptionStatus = await checkSubscriptionStatus();
    }
    return cachedSubscriptionStatus;
}

// ==================== Subscription Helper Functions ====================

const planDisplayNames = {
    'monthly-access': 'Monthly',
    'semester-access': 'Semester',
    'lifetime-access': 'Lifetime'
};

const planDisplayNamesFull = {
    'monthly-access': 'Monthly Access',
    'semester-access': 'Semester Access',
    'lifetime-access': 'Lifetime Access'
};

function updateCompactStats(user) {
    const guidesCountElement = document.getElementById('guides-count');
    const memberSinceElement = document.getElementById('member-since');

    if (guidesCountElement) {
        guidesCountElement.textContent = 'Loading...';
    }

    if (memberSinceElement && user.created_at) {
        const date = new Date(user.created_at);
        memberSinceElement.textContent = date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    }
}

// ==================== Load User Profile ====================

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

        // Badges
        const premiumBadgeEl = document.getElementById('premium-badge');
        const adminBadgeEl = document.getElementById('admin-badge');
        // Admin panel only shows for the dedicated admin account
        const isAdmin = user.email === 'admin@thenursingcollective.pro';

        if (adminBadgeEl && isAdmin) {
            adminBadgeEl.style.cssText = 'display: block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; margin: 12px auto 0 auto; width: fit-content;';
            adminBadgeEl.innerHTML = '<i class="fas fa-crown"></i> Admin';
            const statsCompact = document.querySelector('.user-stats-compact');
            if (statsCompact) statsCompact.style.display = 'none';
        }

        const adminPanelBtn = document.getElementById('admin-panel-btn');
        if (adminPanelBtn && isAdmin) adminPanelBtn.classList.remove('hidden');
        if (isAdmin) document.body.classList.add('is-admin-user');

        if (premiumBadgeEl && user.is_premium && !isAdmin) {
            premiumBadgeEl.style.cssText = 'display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-left: 12px; font-size: 14px;';
            premiumBadgeEl.innerHTML = '<i class="fas fa-star"></i> Premium';
        }

        updateCompactStats(user);
        updateAccountWidget(user);
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

        showGettingStartedCard(user);

        // Show Quiz Bank quick action for premium users
        if (user.is_premium) {
            const quizBankBtn = document.getElementById('quiz-bank-action-btn');
            if (quizBankBtn) quizBankBtn.style.display = '';
        }

        // Update subscription quick action for premium users
        if (user.is_premium) {
            const subActionBtn = document.getElementById('subscription-action-btn');
            const subActionTitle = document.getElementById('subscription-action-title');
            const subActionDesc = document.getElementById('subscription-action-desc');
            if (subActionBtn && subActionTitle && subActionDesc) {
                subActionBtn.removeAttribute('data-navigate');
                subActionBtn.dataset.subscriptionManage = 'true';
                subActionTitle.textContent = 'Manage Subscription';
                subActionDesc.textContent = 'Billing & cancellation';
                subActionBtn.querySelector('.action-icon-large i').className = 'fas fa-cog';
                var newBtn = subActionBtn.cloneNode(true);
                subActionBtn.parentNode.replaceChild(newBtn, subActionBtn);
                newBtn.addEventListener('click', async function() {
                    try {
                        this.disabled = true;
                        this.querySelector('h3').textContent = 'Opening...';
                        const response = await apiCall('/api/subscription/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ return_url: window.location.href })
                        });
                        if (response.url) window.location.href = response.url;
                        else {
                            this.disabled = false;
                            this.querySelector('h3').textContent = 'Manage Subscription';
                        }
                    } catch (error) {
                        console.error('Error opening subscription management:', error);
                        this.disabled = false;
                        this.querySelector('h3').textContent = 'Manage Subscription';
                    }
                });
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

    // Load dashboard sections
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        loadRecentGuides();
        loadDashboardResources();

        if (user.is_premium) {
            loadQuizBankDashboard();
        }

        loadSubscriptionManagement();

        if (user.email === 'admin@thenursingcollective.pro') {
            await loadAdminDashboard();
        }
    } catch (error) {
        console.error('Error loading dashboard sections:', error);
    }
}

// ==================== Recent Guides Widget ====================

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
                .filter(e => !isNaN(e.date.getTime()))
                .sort((a, b) => b.date - a.date)
                .slice(0, 5);

            if (recentEntries.length > 0) {
                container.innerHTML = recentEntries.map(entry => {
                    const name = formatGuideName(entry.id);
                    const timeAgo = formatRelativeTime(entry.date.toISOString());
                    return `
                        <div class="recent-guide-item">
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
                        <p>No guides studied yet</p>
                        <button class="btn btn-primary btn-sm" data-navigate="study-guides.html">
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
                <div class="recent-guides-empty locked">
                    <i class="fas fa-lock"></i>
                    <h4>Subscribe to Access Study Guides</h4>
                    <p>Get unlimited access to all study guides with a subscription.</p>
                    <button class="btn btn-primary btn-sm" data-navigate="pricing.html">
                        <i class="fas fa-rocket"></i> View Plans
                    </button>
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
                <p>Unable to load guides</p>
            </div>
        `;
    }
}

// Convert product ID to display name (e.g., 'heart-failure' -> 'Heart Failure')
function formatGuideName(productId) {
    return productId.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Continue studying - navigates to guide and updates last studied
function continueStudying(productId) {
    try {
        const lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
        lastStudied[productId] = new Date().toISOString();
        localStorage.setItem('guideLastStudied', JSON.stringify(lastStudied));
    } catch (e) {
        console.error('Error saving last studied:', e);
    }
    window.location.href = `guides/${productId}.html`;
}

// ==================== Resources & Quick Reference ====================

const dashboardResources = [
    // Survival Guides (free)
    { id: 'how-to-study', title: 'How to Study for Nursing Exams', icon: 'fa-graduation-cap', category: 'survival', free: true },
    { id: 'not-overwhelmed', title: 'How to Not Be Overwhelmed', icon: 'fa-mountain', category: 'survival', free: true },
    { id: 'time-management', title: 'Time Management', icon: 'fa-clock', category: 'survival', free: true },
    { id: 'care-plans', title: 'How to Write a Care Plan', icon: 'fa-clipboard-list', category: 'survival', free: true },
    { id: 'feeling-like-failing', title: "When You Feel Like You're Failing", icon: 'fa-heart', category: 'survival', free: true },
    // Clinical Confidence (premium)
    { id: 'first-semester-clinicals', title: 'First Semester Clinicals', icon: 'fa-hospital', category: 'clinical', free: false },
    { id: 'head-to-toe-assessment', title: 'Head-to-Toe Assessment', icon: 'fa-user-md', category: 'clinical', free: false },
    { id: 'clinical-skills', title: 'Clinical Skills', icon: 'fa-hand-holding-medical', category: 'clinical', free: false },
    { id: 'clinical-safety', title: 'Clinical Safety', icon: 'fa-shield-alt', category: 'clinical', free: false },
    { id: 'clinical-bag', title: 'Clinical Bag Essentials', icon: 'fa-briefcase-medical', category: 'clinical', free: false },
    { id: 'night-before-clinicals', title: 'Night Before Clinicals', icon: 'fa-moon', category: 'clinical', free: false },
    { id: 'when-you-dont-know', title: "When You Don't Know", icon: 'fa-question-circle', category: 'clinical', free: false },
    // Quick Reference (premium)
    { id: 'lab-values', title: 'Lab Values', icon: 'fa-vial', category: 'reference', free: false },
    { id: 'vital-signs', title: 'Vital Signs', icon: 'fa-heartbeat', category: 'reference', free: false },
    { id: 'medications', title: 'Medications', icon: 'fa-pills', category: 'reference', free: false },
    { id: 'documentation-phrases', title: 'Documentation Phrases', icon: 'fa-file-medical', category: 'reference', free: false },
    { id: 'abbreviations', title: 'Abbreviations', icon: 'fa-spell-check', category: 'reference', free: false },
];

const resourceCategories = [
    { key: 'survival', title: 'Survival Guides', icon: 'fa-lightbulb' },
    { key: 'clinical', title: 'Clinical Confidence', icon: 'fa-stethoscope' },
    { key: 'reference', title: 'Quick Reference Tools', icon: 'fa-bolt' },
];

async function loadDashboardResources() {
    const container = document.getElementById('resources-section');
    if (!container) return;

    try {
        const { hasAccess } = await getSubscriptionStatusCached();

        const skeleton = container.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        let html = '';

        for (const cat of resourceCategories) {
            const items = dashboardResources.filter(r => r.category === cat.key);

            html += `
                <div class="res-category">
                    <div class="res-category-header">
                        <div class="res-category-icon ${cat.key}">
                            <i class="fas ${cat.icon}"></i>
                        </div>
                        <span class="res-category-title">${cat.title}</span>
                        <span class="res-category-count">${items.length} guides</span>
                    </div>
                    <div class="res-grid">
            `;

            for (const item of items) {
                const canAccess = item.free || hasAccess;
                const href = canAccess ? `resources/${item.id}.html` : 'pricing.html';
                const lockedClass = canAccess ? '' : ' locked';
                const badge = item.free
                    ? '<span class="res-card-badge free">Free</span>'
                    : (canAccess ? '' : '<i class="fas fa-lock res-card-lock"></i>');

                html += `
                    <a href="${href}" class="res-card${lockedClass}">
                        <div class="res-card-icon ${item.category}">
                            <i class="fas ${item.icon}"></i>
                        </div>
                        <div class="res-card-info">
                            <div class="res-card-title">${item.title}</div>
                        </div>
                        ${badge}
                    </a>
                `;
            }

            html += `
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading dashboard resources:', error);
        container.innerHTML = '';
    }
}

// ==================== Quiz Bank Dashboard (Stats Only) ====================

function loadQuizBankDashboard() {
    var section = document.getElementById('quiz-bank-dashboard-section');
    if (!section) return;

    section.style.display = '';

    if (typeof MasteryTracker === 'undefined') {
        console.warn('[Dashboard] MasteryTracker not loaded');
        return;
    }

    var stats = MasteryTracker.getOverallStats();
    var emptyState = document.getElementById('qb-empty-state');
    var overview = document.getElementById('qb-mastery-overview');

    if (stats.totalQuestionsAnswered === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        if (overview) overview.classList.add('hidden');
        var continueBtn = document.getElementById('qb-continue-btn');
        if (continueBtn) continueBtn.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (overview) overview.classList.remove('hidden');

    var avgLevelEl = document.getElementById('qb-avg-level');
    var practicedEl = document.getElementById('qb-topics-practiced');
    var masteredEl = document.getElementById('qb-topics-mastered');
    var answeredEl = document.getElementById('qb-total-answered');
    var accuracyEl = document.getElementById('qb-accuracy');
    var streakEl = document.getElementById('qb-streak');

    if (avgLevelEl) {
        avgLevelEl.textContent = stats.averageLevel.toFixed(1);
        var avgColor = MasteryTracker.getMasteryColor(Math.floor(stats.averageLevel));
        avgLevelEl.style.color = avgColor;
    }
    if (practicedEl) practicedEl.textContent = stats.topicsPracticed;
    if (masteredEl) masteredEl.textContent = stats.topicsMastered;
    if (answeredEl) answeredEl.textContent = stats.totalQuestionsAnswered.toLocaleString();
    if (accuracyEl) accuracyEl.textContent = stats.accuracy + '%';
    if (streakEl) {
        var streakFlameClass = 'qb-streak-flame--dim';
        if (stats.streak >= 14) streakFlameClass = 'qb-streak-flame--blazing';
        else if (stats.streak >= 7) streakFlameClass = 'qb-streak-flame--hot';
        else if (stats.streak >= 1) streakFlameClass = 'qb-streak-flame--active';
        streakEl.innerHTML = '<i class="fas fa-fire qb-streak-flame ' + streakFlameClass + '"></i> ' + stats.streak;
    }
}

// ==================== Email Verification Banner ====================

function updateEmailVerificationBanner(user) {
    const banner = document.getElementById('email-verification-banner');
    const resendBtn = document.getElementById('resend-verification-btn');
    if (!banner) return;

    // Check multiple signals: backend verified flag, OAuth via localStorage, or Discord-connected
    const authMethod = localStorage.getItem('lastAuthMethod');
    const isOAuthUser = authMethod === 'google' || authMethod === 'discord';
    const hasDiscord = user.has_discord === true;

    // If verified, OAuth user, or Discord-connected — hide the banner
    if (user.is_verified || isOAuthUser || hasDiscord) {
        banner.classList.add('hidden');
        return;
    }

    // Only show for genuinely unverified email-only users
    if (!user.is_verified) {
        banner.classList.remove('hidden');

        if (resendBtn) {
            resendBtn.onclick = async function() {
                resendBtn.disabled = true;
                resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                try {
                    await apiCall('/auth/resend-verification', {
                        method: 'POST',
                        body: JSON.stringify({ email: user.email })
                    });
                    resendBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verification Sent!';
                    resendBtn.style.background = '#10b981';
                    resendBtn.style.color = 'white';
                    setTimeout(() => {
                        resendBtn.disabled = false;
                        resendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Resend Email';
                        resendBtn.style.background = 'white';
                        resendBtn.style.color = '#d97706';
                    }, 3000);
                } catch (error) {
                    console.error('Error resending verification:', error);
                    resendBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
                    resendBtn.style.background = '#ef4444';
                    resendBtn.style.color = 'white';
                    setTimeout(() => {
                        resendBtn.disabled = false;
                        resendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Resend Email';
                        resendBtn.style.background = 'white';
                        resendBtn.style.color = '#d97706';
                    }, 3000);
                }
            };
        }
    }
}

// ==================== Getting Started Card ====================

function showGettingStartedCard(user) {
    const gettingStartedCard = document.getElementById('getting-started-card');
    if (!gettingStartedCard) return;

    const createdDate = new Date(user.created_at);
    const today = new Date();
    const daysOld = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
    const dismissed = localStorage.getItem('gettingStartedDismissed');

    if (daysOld < 2 && !dismissed) {
        gettingStartedCard.classList.remove('hidden');
        const dismissBtn = gettingStartedCard.querySelector('button');
        if (dismissBtn) {
            dismissBtn.onclick = function() {
                gettingStartedCard.classList.add('hidden');
                localStorage.setItem('gettingStartedDismissed', 'true');
            };
        }
    }
}

// ==================== Subscription Management ====================

async function loadSubscriptionManagement() {
    const container = document.getElementById('subscription-management-container');
    if (!container) return;

    try {
        const { hasAccess, subscription } = await getSubscriptionStatusCached();

        const skeleton = container.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        if (subscription) {
            const planName = planDisplayNamesFull[subscription.plan_id] || subscription.plan_name;
            const isActive = subscription.is_active;
            const isLifetime = subscription.plan_id === 'lifetime-access';
            const isCancelling = subscription.cancel_at_period_end;

            let statusBadge;
            if (isActive && isCancelling) {
                statusBadge = '<span class="sub-status-badge cancelling"><i class="fas fa-clock"></i> Cancelling</span>';
            } else if (isActive) {
                statusBadge = '<span class="sub-status-badge active"><i class="fas fa-check-circle"></i> Active</span>';
            } else {
                statusBadge = '<span class="sub-status-badge expired"><i class="fas fa-times-circle"></i> Expired</span>';
            }

            let datesHtml = '';
            if (subscription.starts_at) {
                datesHtml += `<div class="sub-info-row"><span class="sub-label">Started</span><span class="sub-value">${formatDate(subscription.starts_at)}</span></div>`;
            }
            if (isLifetime) {
                datesHtml += `<div class="sub-info-row"><span class="sub-label">Expires</span><span class="sub-value"><i class="fas fa-infinity"></i> Never</span></div>`;
            } else if (subscription.expires_at) {
                const label = isCancelling ? 'Access Until' : (subscription.plan_id === 'monthly-access' ? 'Next Billing' : 'Expires');
                datesHtml += `<div class="sub-info-row"><span class="sub-label">${label}</span><span class="sub-value">${formatDate(subscription.expires_at)}</span></div>`;
            }
            if (subscription.cancelled_at) {
                datesHtml += `<div class="sub-info-row"><span class="sub-label">Cancelled On</span><span class="sub-value">${formatDate(subscription.cancelled_at)}</span></div>`;
            }

            let actionsHtml = '';
            if (isActive && !isLifetime) {
                actionsHtml = `<button class="btn btn-primary btn-sm" id="manage-subscription-btn"><i class="fas fa-cog"></i> Manage</button>`;
            } else if (!isActive) {
                actionsHtml = `<button class="btn btn-primary btn-sm" data-navigate="pricing.html"><i class="fas fa-rocket"></i> Resubscribe</button>`;
            } else if (isLifetime) {
                actionsHtml = `<span class="lifetime-badge"><i class="fas fa-gem"></i> Lifetime</span>`;
            }

            container.innerHTML = `
                <div class="subscription-status-card">
                    <div class="sub-card-header">
                        <div class="sub-plan-info">
                            <h3>${escapeHtml(planName)}</h3>
                            ${statusBadge}
                        </div>
                    </div>
                    <div class="sub-card-details">
                        ${datesHtml}
                    </div>
                    <div class="sub-card-actions">
                        ${actionsHtml}
                    </div>
                </div>
            `;

            const manageBtn = document.getElementById('manage-subscription-btn');
            if (manageBtn) {
                manageBtn.addEventListener('click', async function() {
                    this.disabled = true;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    try {
                        const response = await apiCall('/api/subscription/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ return_url: window.location.href })
                        });
                        if (response.url) window.location.href = response.url;
                    } catch (error) {
                        console.error('Error opening subscription management:', error);
                        showAlert('Error', 'Unable to open subscription management. Please try again.', 'error');
                        this.disabled = false;
                        this.innerHTML = '<i class="fas fa-cog"></i> Manage';
                    }
                });
            }

            container.querySelectorAll('[data-navigate]').forEach(btn => {
                btn.addEventListener('click', function() {
                    window.location.href = this.dataset.navigate;
                });
            });

        } else {
            container.innerHTML = `
                <div class="subscription-status-card no-subscription">
                    <div class="sub-empty-state">
                        <i class="fas fa-crown" style="font-size: 28px; color: var(--accent-color); margin-bottom: 12px;"></i>
                        <h4>No Active Subscription</h4>
                        <p style="font-size: 0.85rem;">Subscribe to unlock all study guides and resources.</p>
                        <button class="btn btn-primary btn-sm" data-navigate="pricing.html">
                            <i class="fas fa-rocket"></i> View Plans
                        </button>
                    </div>
                </div>
            `;
            container.querySelectorAll('[data-navigate]').forEach(btn => {
                btn.addEventListener('click', function() {
                    window.location.href = this.dataset.navigate;
                });
            });
        }

    } catch (error) {
        console.error('Error loading subscription management:', error);
        const skeleton = container.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();
        container.innerHTML = `
            <div class="subscription-status-card error-state">
                <p>Unable to load subscription info.</p>
                <button class="btn btn-secondary btn-sm" data-action="reload"><i class="fas fa-redo"></i> Retry</button>
            </div>
        `;
        container.querySelector('[data-action="reload"]')?.addEventListener('click', () => window.location.reload());
    }
}

// ==================== Admin Dashboard ====================

async function loadAdminDashboard() {
    try {
        const data = await apiCall('/admin/dashboard', { method: 'GET' });
        const stats = data.statistics;

        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (dashboardGrid) {
            const adminCard = document.createElement('div');
            adminCard.className = 'dashboard-card';
            adminCard.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; grid-column: 1 / -1; margin-bottom: 24px;';

            adminCard.innerHTML = `
                <h3 style="color: white;"><i class="fas fa-crown"></i> Admin Overview</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
                    <div class="admin-stat-box" onclick="openAdminModal('all')" style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px; cursor: pointer;">
                        <div style="font-size: 36px; font-weight: 700;">${stats.total_users}</div>
                        <div style="opacity: 0.9; margin-top: 8px;">Total Users</div>
                    </div>
                    <div class="admin-stat-box" onclick="openAdminModal('premium')" style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px; cursor: pointer;">
                        <div style="font-size: 36px; font-weight: 700;">${stats.premium_users}</div>
                        <div style="opacity: 0.9; margin-top: 8px;">Premium Users</div>
                    </div>
                    <div class="admin-stat-box" onclick="openAdminModal('today')" style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px; cursor: pointer;">
                        <div style="font-size: 36px; font-weight: 700;">${stats.new_users_today}</div>
                        <div style="opacity: 0.9; margin-top: 8px;">New Today</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px;">
                        <div style="font-size: 36px; font-weight: 700;">${stats.active_sessions}</div>
                        <div style="opacity: 0.9; margin-top: 8px;">Active Sessions</div>
                    </div>
                </div>
                <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px;">
                    <h4 style="color: white; margin-bottom: 12px;"><i class="fas fa-chart-line"></i> Statistics</h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                        <div>Verification Rate: <strong>${stats.verification_rate}</strong></div>
                        <div>Premium Rate: <strong>${stats.premium_rate}</strong></div>
                    </div>
                </div>
            `;

            dashboardGrid.insertBefore(adminCard, dashboardGrid.firstChild);
        }

    } catch (error) {
        console.error('Error loading admin dashboard:', error);
    }
}

// ==================== Admin User Management ====================

let allUsersData = [];
let currentFilter = 'all';

async function openAdminModal(filter = 'all') {
    currentFilter = filter;
    const modal = document.getElementById('admin-user-modal');
    const modalTitle = document.getElementById('modal-title');

    const titles = {
        'all': 'All Users',
        'today': 'Users Joined Today',
        'yesterday': 'Users Joined Yesterday',
        'week': 'Users Joined This Week',
        'premium': 'Premium Users',
        'free': 'Free Users'
    };
    modalTitle.textContent = titles[filter] || 'Users';
    modal.style.display = 'flex';
    await loadAdminUsers(filter);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) btn.classList.add('active');
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => filterUsers(btn.dataset.filter);
    });
}

function closeAdminModal() {
    document.getElementById('admin-user-modal').style.display = 'none';
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('admin-user-modal');
    if (e.target === modal) closeAdminModal();
});

async function loadAdminUsers(filter = 'all') {
    try {
        const data = await apiCall(`/admin/users?filter=${filter}`, { method: 'GET' });
        allUsersData = data.users;
        renderUsersTable(allUsersData);
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('users-table-body').innerHTML = `
            <tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 12px; display: block;"></i>
                Failed to load users
            </td></tr>
        `;
    }
}

function filterUsers(filter) {
    currentFilter = filter;
    const modalTitle = document.getElementById('modal-title');
    const titles = {
        'all': 'All Users', 'today': 'Users Joined Today', 'yesterday': 'Users Joined Yesterday',
        'week': 'Users Joined This Week', 'premium': 'Premium Users', 'free': 'Free Users'
    };
    modalTitle.textContent = titles[filter] || 'Users';

    let filteredUsers = [...allUsersData];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);

    switch(filter) {
        case 'today': filteredUsers = allUsersData.filter(u => new Date(u.created_at) >= today); break;
        case 'yesterday': filteredUsers = allUsersData.filter(u => { const d = new Date(u.created_at); return d >= yesterday && d < today; }); break;
        case 'week': filteredUsers = allUsersData.filter(u => new Date(u.created_at) >= weekAgo); break;
        case 'premium': filteredUsers = allUsersData.filter(u => u.is_premium); break;
        case 'free': filteredUsers = allUsersData.filter(u => !u.is_premium); break;
    }

    renderUsersTable(filteredUsers);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) btn.classList.add('active');
    });
}

function renderUsersTable(users) {
    const tbody = document.getElementById('users-table-body');
    if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-users" style="font-size: 48px; margin-bottom: 12px; display: block; opacity: 0.3;"></i>No users found
        </td></tr>`;
        return;
    }

    tbody.innerHTML = users.map(user => {
        const badges = [];
        if (user.is_admin) badges.push('<span class="user-badge admin"><i class="fas fa-crown"></i> Admin</span>');
        if (user.is_premium) badges.push('<span class="user-badge premium"><i class="fas fa-star"></i> Premium</span>');
        if (!user.is_premium && !user.is_admin) badges.push('<span class="user-badge free">Free</span>');

        const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        return `
            <tr>
                <td><strong>${user.first_name} ${user.last_name}</strong></td>
                <td>${user.email}</td>
                <td>${badges.join(' ')}</td>
                <td>${joinedDate}</td>
                <td>
                    <div class="user-actions">
                        <button class="action-btn" onclick="viewUserDetails('${user.id}')"><i class="fas fa-eye"></i> View</button>
                        ${!user.is_verified ? `<button class="action-btn" onclick="verifyUser('${user.id}')"><i class="fas fa-check-circle"></i> Verify</button>` : ''}
                        ${!user.is_premium ? `<button class="action-btn" onclick="togglePremium('${user.id}', true)"><i class="fas fa-crown"></i> Grant Premium</button>` : `<button class="action-btn danger" onclick="togglePremium('${user.id}', false)"><i class="fas fa-times"></i> Remove Premium</button>`}
                        ${!user.is_admin ? `<button class="action-btn danger" onclick="deleteUser('${user.id}')"><i class="fas fa-trash"></i> Delete</button>` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function togglePremium(userId, grantPremium) {
    const confirmed = await showConfirm('Update Premium Status', `Are you sure you want to ${grantPremium ? 'grant' : 'remove'} premium status for this user?`, 'question');
    if (!confirmed) return;

    try {
        await apiCall(`/admin/users/${userId}/premium`, { method: 'PUT', body: JSON.stringify({ is_premium: grantPremium }) });
        await loadAdminUsers(currentFilter);
        showSuccess(`Premium status ${grantPremium ? 'granted' : 'removed'} successfully!`);
    } catch (error) {
        console.error('Error updating user:', error);
        showAlert('Update Failed', 'Failed to update user. Please try again.', 'error');
    }
}

function viewUserDetails(userId) {
    const user = allUsersData.find(u => u.id === userId);
    if (!user) return;
    const details = `Name: ${user.first_name} ${user.last_name}\nEmail: ${user.email}\nNursing Program: ${user.nursing_program || 'Not specified'}\nAccount Type: ${user.is_premium ? 'Premium' : 'Free'}\nAdmin: ${user.is_admin ? 'Yes' : 'No'}\nVerified: ${user.is_verified ? 'Yes' : 'No'}\nDiscord Connected: ${user.has_discord ? 'Yes' : 'No'}\nJoined: ${new Date(user.created_at).toLocaleString()}`;
    showAlert('User Details', details, 'info');
}

async function verifyUser(userId) {
    const user = allUsersData.find(u => u.id === userId);
    if (!user) return;
    const confirmed = await showConfirm('Verify User Email', `Manually verify email for ${user.first_name} ${user.last_name} (${user.email})?`, 'question');
    if (!confirmed) return;

    try {
        await apiCall(`/admin/users/${userId}/verify`, { method: 'POST' });
        await loadAdminUsers(currentFilter);
        showSuccess('User email verified successfully!');
    } catch (error) {
        console.error('Error verifying user:', error);
        showAlert('Verification Failed', 'Failed to verify user. Please try again.', 'error');
    }
}

async function deleteUser(userId) {
    const user = allUsersData.find(u => u.id === userId);
    if (!user) return;
    const confirmed = await showConfirm('Delete User', `Are you sure you want to delete ${user.first_name} ${user.last_name} (${user.email})?\n\nThis action cannot be undone.`, 'danger', 'Delete', 'Cancel');
    if (!confirmed) return;

    try {
        await apiCall(`/admin/users/${userId}`, { method: 'DELETE' });
        await loadAdminUsers(currentFilter);
        await loadAdminDashboard();
        showSuccess('User deleted successfully!');
    } catch (error) {
        console.error('Error deleting user:', error);
        showAlert('Delete Failed', error.message || 'Failed to delete user. Please try again.', 'error');
    }
}

// ==================== Event Listeners ====================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-navigate]').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = this.dataset.navigate;
        });
    });

    document.querySelectorAll('[data-external]').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open(this.dataset.external, '_blank');
        });
    });

    const dismissBtn = document.getElementById('dismiss-getting-started-btn');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', function() {
            const card = document.getElementById('getting-started-card');
            if (card) {
                card.classList.add('hidden');
                localStorage.setItem('gettingStartedDismissed', 'true');
            }
        });
    }

    const closeAdminModalBtn = document.getElementById('close-admin-modal-btn');
    if (closeAdminModalBtn) {
        closeAdminModalBtn.addEventListener('click', closeAdminModal);
    }
});

// ==================== Utility Functions ====================

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

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
