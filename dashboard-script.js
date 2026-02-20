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

// ==================== Widget Update Functions ====================

function updateAccountWidget(user) {
    // Legacy — account widget removed; sidebar subscription handles display
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

        // Sync sidebar admin section visibility
        const sidebarAdmin = document.getElementById('sidebar-admin-section');
        if (sidebarAdmin && isAdmin) sidebarAdmin.classList.remove('hidden');

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
            // Sync sidebar quiz link visibility
            const sidebarQuiz = document.getElementById('sidebar-quiz-link');
            if (sidebarQuiz) sidebarQuiz.style.display = '';
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

        // Sync study history and quiz mastery from server before rendering widgets
        await syncStudyHistory();
        if (typeof MasteryTracker !== 'undefined' && typeof MasteryTracker.pullFromServer === 'function') {
            await MasteryTracker.pullFromServer();
            console.log('[Dashboard] Mastery data synced from server');
        }

        loadAnnouncementBanner();
        loadContinueHero();
        loadRecentGuides();
        await fetchAndCacheQuizSessions();
        loadStudyActivityCalendar();

        updateStatsRow();
        initStatFlyouts();
        loadSubscriptionManagement();

        if (user.email === 'admin@thenursingcollective.pro') {
            await loadAdminDashboard();
        }
    } catch (error) {
        console.error('Error loading dashboard sections:', error);
    }
}

// ==================== Study History Sync ====================

async function syncStudyHistory() {
    try {
        // Load server-side study history
        var serverData = {};
        try {
            console.log('[StudySync] Fetching server study history...');
            var response = await apiCall('/api/study/history', { method: 'GET' });
            serverData = response.guide_last_studied || {};
            console.log('[StudySync] Server has ' + Object.keys(serverData).length + ' guides');
        } catch (e) {
            console.warn('[StudySync] Server fetch failed:', e.message || e);
            return;
        }

        // Load localStorage data
        var localData = {};
        try { localData = JSON.parse(localStorage.getItem('guideLastStudied') || '{}'); } catch (e) {}
        console.log('[StudySync] Local has ' + Object.keys(localData).length + ' guides');

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
            console.log('[StudySync] Pushing ' + Object.keys(merged).length + ' merged guides to server...');
            try {
                await apiCall('/api/study/history', {
                    method: 'PUT',
                    body: JSON.stringify({ guide_last_studied: merged })
                });
                console.log('[StudySync] Push succeeded');
            } catch (e) {
                console.warn('[StudySync] Push failed:', e.message || e);
            }
        }

        console.log('[StudySync] Synced ' + Object.keys(merged).length + ' guides (hasNewData=' + hasNewData + ')');
    } catch (e) {
        console.warn('[StudySync] Sync failed:', e);
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
                .slice(0, 3);

            if (recentEntries.length > 0) {
                container.innerHTML = recentEntries.map(entry => {
                    const name = formatGuideName(entry.id);
                    const timeAgo = formatRelativeTime(entry.date.toISOString());
                    const iconSrc = 'assets/images/guide-icons/' + entry.id + '.webp';
                    return `
                        <div class="recent-guide-item">
                            <div class="recent-guide-icon-img">
                                <img src="${iconSrc}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-book-open\\'></i>'">
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
                        <p>No guides studied yet</p>
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
    // Fire-and-forget server sync
    try {
        apiCall('/api/study/record', {
            method: 'POST',
            body: JSON.stringify({ guide_id: productId })
        }).catch(function() {});
    } catch (e) { /* ignore */ }
    window.location.href = `guides/${productId}.html`;
}

// ==================== Study Activity Calendar ====================

function loadStudyActivityCalendar(weekOffset) {
    var container = document.getElementById('activity-bars');
    if (!container) return;

    var offset = weekOffset || 0; // 0 = this week, -1 = last week
    var activeDates = getActivityDates();
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var dayOfWeek = today.getDay(); // 0=Sun

    // Build 7 days for the target week
    var weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - dayOfWeek + (offset * 7));

    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Find max count for scaling bars
    var counts = [];
    for (var i = 0; i < 7; i++) {
        var d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        var key = d.toISOString().split('T')[0];
        counts.push(activeDates[key] || 0);
    }
    var FULL_BAR = 5; // 5 sets = 100% full bar

    var html = '';
    var weekTotal = 0;
    var daysActive = 0;

    for (var i = 0; i < 7; i++) {
        var d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        var isToday = d.getTime() === today.getTime();
        var isFuture = d > today;
        var count = counts[i];
        var pct = isFuture ? 0 : Math.min(100, Math.round((count / FULL_BAR) * 100));
        var dateLabel = monthNames[d.getMonth()] + ' ' + d.getDate();

        if (count > 0 && !isFuture) {
            weekTotal += count;
            daysActive++;
        }

        var rowClass = 'activity-bar-row';
        if (isToday) rowClass += ' today';
        if (count === 0 && !isFuture) rowClass += ' inactive';

        html += '<div class="' + rowClass + '">';
        html += '<div class="activity-bar-label">' + dayNames[i] + '<span class="activity-date">' + dateLabel + '</span></div>';
        html += '<div class="activity-bar-track"><div class="activity-bar-fill" style="width:' + (isFuture ? 0 : pct) + '%"></div></div>';
        html += '<div class="activity-bar-count">' + (isFuture ? '' : count + (count === 1 ? ' set' : ' sets')) + '</div>';
        html += '</div>';
    }

    container.innerHTML = html;

    // Streak: count consecutive days back from today with activity
    var streak = 0;
    for (var si = dayOfWeek; si >= 0; si--) {
        var thisWeekCounts = [];
        for (var j = 0; j < 7; j++) {
            var sd = new Date(today);
            sd.setDate(sd.getDate() - dayOfWeek + j);
            var sk = sd.toISOString().split('T')[0];
            thisWeekCounts.push(activeDates[sk] || 0);
        }
        if (thisWeekCounts[si] > 0) streak++;
        else break;
    }
    if (streak > 0) {
        var prev = new Date(today);
        prev.setDate(prev.getDate() - dayOfWeek - 1);
        while (activeDates[prev.toISOString().split('T')[0]] > 0) {
            streak++;
            prev.setDate(prev.getDate() - 1);
        }
    }

    var weekTotalEl = document.getElementById('activity-week-total');
    var daysActiveEl = document.getElementById('activity-days-active');
    var streakEl = document.getElementById('activity-streak');
    if (weekTotalEl) weekTotalEl.textContent = weekTotal;
    if (daysActiveEl) daysActiveEl.textContent = daysActive;
    if (streakEl) streakEl.textContent = streak;


    // Wire up toggle buttons (only once)
    if (!container._toggleWired) {
        container._toggleWired = true;
        var btns = document.querySelectorAll('.activity-week-btn');
        btns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                btns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var w = btn.getAttribute('data-week') === 'last' ? -1 : 0;
                loadStudyActivityCalendar(w);
            });
        });
    }
}

// Cached quiz sessions fetched from server
var _cachedQuizSessions = null;

async function fetchAndCacheQuizSessions() {
    try {
        var resp = await apiCall('/api/quiz/sessions?limit=100', { method: 'GET' });
        _cachedQuizSessions = resp.sessions || [];
        console.log('[Dashboard] Fetched ' + _cachedQuizSessions.length + ' quiz sessions');
    } catch (e) {
        console.warn('[Dashboard] Failed to fetch quiz sessions:', e.message || e);
        _cachedQuizSessions = [];
    }
}

function getActivityDates() {
    var dates = {};

    // Count quiz sessions (sets completed) per day
    var sessions = _cachedQuizSessions || [];
    sessions.forEach(function(s) {
        if (s.created_at) {
            var d = new Date(s.created_at);
            if (!isNaN(d.getTime())) {
                var key = d.toISOString().split('T')[0];
                dates[key] = (dates[key] || 0) + 1;
            }
        }
    });

    return dates;
}

// ==================== Stat Card Flyouts ====================

function initStatFlyouts() {
    var statCards = document.querySelectorAll('.dash-stat');

    statCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            var flyout = card.querySelector('.dash-stat-flyout');
            if (!flyout) return;

            var wasOpen = flyout.classList.contains('open');

            // Close all flyouts first
            closeAllFlyouts();

            if (!wasOpen) {
                flyout.classList.add('open');
                card.classList.add('active');
                populateFlyout(card.id);
            }
        });
    });

    // Close flyouts when clicking outside
    document.addEventListener('click', function() {
        closeAllFlyouts();
    });

    // Prevent flyout clicks from closing
    document.querySelectorAll('.dash-stat-flyout').forEach(function(f) {
        f.addEventListener('click', function(e) { e.stopPropagation(); });
    });
}

function closeAllFlyouts() {
    document.querySelectorAll('.dash-stat-flyout.open').forEach(function(f) {
        f.classList.remove('open');
    });
    document.querySelectorAll('.dash-stat.active').forEach(function(c) {
        c.classList.remove('active');
    });
}

function populateFlyout(cardId) {
    switch (cardId) {
        case 'stat-card-guides': populateGuidesFlyout(); break;
        case 'stat-card-questions': populateQuestionsFlyout(); break;
        case 'stat-card-accuracy': populateAccuracyFlyout(); break;
        case 'stat-card-streak': populateStreakFlyout(); break;
    }
}

function populateGuidesFlyout() {
    var container = document.getElementById('flyout-guides-content');
    if (!container) return;

    var lastStudied = {};
    try { lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}'); } catch(e) {}

    var ids = Object.keys(lastStudied);
    if (ids.length === 0) {
        container.innerHTML = '<div class="flyout-empty">No guides studied yet</div>';
        return;
    }

    // Group by category
    var categories = {};
    var categoryMap = {
        'heart-failure': 'Cardiovascular', 'myocardial-infarction': 'Cardiovascular', 'arrhythmias': 'Cardiovascular', 'hypertension': 'Cardiovascular', 'coronary-artery-disease': 'Cardiovascular', 'peripheral-vascular-disease': 'Cardiovascular',
        'copd': 'Respiratory', 'asthma': 'Respiratory', 'pneumonia': 'Respiratory', 'tuberculosis': 'Respiratory', 'oxygen-therapy': 'Respiratory', 'chest-tubes': 'Respiratory',
        'stroke': 'Neurological', 'seizures': 'Neurological', 'traumatic-brain-injury': 'Neurological', 'spinal-cord-injury': 'Neurological', 'meningitis': 'Neurological', 'parkinsons-ms': 'Neurological',
        'diabetes-type1': 'Endocrine', 'diabetes-type2': 'Endocrine', 'thyroid-disorders': 'Endocrine', 'adrenal-disorders': 'Endocrine', 'pituitary-disorders': 'Endocrine',
        'acute-kidney-injury': 'Renal', 'chronic-kidney-disease': 'Renal', 'dialysis': 'Renal', 'kidney-stones': 'Renal', 'urinary-tract-infections': 'Renal', 'fluid-electrolytes': 'Renal',
        'gi-bleeding': 'GI', 'bowel-obstruction': 'GI', 'liver-disease': 'GI', 'pancreatitis': 'GI', 'inflammatory-bowel-disease': 'GI', 'gerd-peptic-ulcer': 'GI',
        'fractures': 'Musculoskeletal', 'arthritis': 'Musculoskeletal', 'hip-knee-replacement': 'Musculoskeletal', 'osteoporosis': 'Musculoskeletal', 'amputation-care': 'Musculoskeletal',
        'cardiac-medications': 'Pharmacology', 'antibiotics-antivirals': 'Pharmacology', 'pain-management': 'Pharmacology', 'iv-medications': 'Pharmacology', 'psychotropic-medications': 'Pharmacology', 'emergency-medications': 'Pharmacology',
        'assessment-skills': 'Fundamentals', 'infection-control': 'Fundamentals', 'documentation-charting': 'Fundamentals', 'patient-safety': 'Fundamentals', 'mobility-transfers': 'Fundamentals'
    };

    ids.forEach(function(id) {
        var cat = categoryMap[id] || 'Other';
        if (!categories[cat]) categories[cat] = 0;
        categories[cat]++;
    });

    var html = '';
    var sorted = Object.entries(categories).sort(function(a, b) { return b[1] - a[1]; });
    sorted.forEach(function(pair) {
        html += '<div class="flyout-row"><span class="flyout-row-label">' + escapeHtml(pair[0]) + '</span><span class="flyout-row-value">' + pair[1] + '</span></div>';
    });
    html += '<div class="flyout-divider"></div>';
    html += '<div class="flyout-row"><span class="flyout-row-label">Total</span><span class="flyout-row-value">' + ids.length + ' guides</span></div>';
    container.innerHTML = html;
}

function populateQuestionsFlyout() {
    var container = document.getElementById('flyout-questions-content');
    if (!container) return;

    if (typeof MasteryTracker === 'undefined') {
        container.innerHTML = '<div class="flyout-empty">No quiz data yet</div>';
        return;
    }

    var stats = MasteryTracker.getOverallStats();
    if (stats.totalQuestionsAnswered === 0) {
        container.innerHTML = '<div class="flyout-empty">No quiz data yet</div>';
        return;
    }

    var html = '';
    html += '<div class="flyout-row"><span class="flyout-row-label">Total Answered</span><span class="flyout-row-value">' + stats.totalQuestionsAnswered.toLocaleString() + '</span></div>';
    html += '<div class="flyout-row"><span class="flyout-row-label">Topics Practiced</span><span class="flyout-row-value">' + stats.chaptersPracticed + '</span></div>';
    html += '<div class="flyout-row"><span class="flyout-row-label">Topics Mastered</span><span class="flyout-row-value">' + stats.chaptersMastered + '</span></div>';
    html += '<div class="flyout-divider"></div>';
    html += '<div class="flyout-row"><span class="flyout-row-label">Avg Mastery Level</span><span class="flyout-row-value">' + stats.averageLevel.toFixed(1) + '</span></div>';
    container.innerHTML = html;
}

function populateAccuracyFlyout() {
    var container = document.getElementById('flyout-accuracy-content');
    if (!container) return;

    if (typeof MasteryTracker === 'undefined') {
        container.innerHTML = '<div class="flyout-empty">No quiz data yet</div>';
        return;
    }

    var stats = MasteryTracker.getOverallStats();
    if (stats.totalQuestionsAnswered === 0) {
        container.innerHTML = '<div class="flyout-empty">No quiz data yet</div>';
        return;
    }

    var html = '';
    html += '<div class="flyout-row"><span class="flyout-row-label">Overall Accuracy</span><span class="flyout-row-value">' + stats.accuracy + '%</span></div>';
    html += '<div class="flyout-row"><span class="flyout-row-label">Correct Answers</span><span class="flyout-row-value">' + Math.round(stats.totalQuestionsAnswered * stats.accuracy / 100) + '</span></div>';
    html += '<div class="flyout-row"><span class="flyout-row-label">Incorrect</span><span class="flyout-row-value">' + (stats.totalQuestionsAnswered - Math.round(stats.totalQuestionsAnswered * stats.accuracy / 100)) + '</span></div>';

    // Show best/worst topics if MasteryTracker exposes them
    if (typeof MasteryTracker.getTopicStats === 'function') {
        try {
            var topics = MasteryTracker.getTopicStats();
            if (topics && topics.length > 0) {
                var sorted = topics.filter(function(t) { return t.totalAnswered > 0; }).sort(function(a, b) { return b.accuracy - a.accuracy; });
                if (sorted.length > 0) {
                    html += '<div class="flyout-divider"></div>';
                    html += '<div class="flyout-row"><span class="flyout-row-label">Best Topic</span><span class="flyout-row-value">' + escapeHtml(sorted[0].name) + '</span></div>';
                    if (sorted.length > 1) {
                        html += '<div class="flyout-row"><span class="flyout-row-label">Needs Work</span><span class="flyout-row-value">' + escapeHtml(sorted[sorted.length - 1].name) + '</span></div>';
                    }
                }
            }
        } catch (e) { /* ignore */ }
    }

    container.innerHTML = html;
}

function populateStreakFlyout() {
    var container = document.getElementById('flyout-streak-content');
    if (!container) return;

    var activeDates = getActivityDates();
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build 14-day mini calendar
    var labels = '<div class="flyout-streak-labels"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>';
    var grid = '<div class="flyout-streak-grid">';

    // Start from 13 days ago, fill 14 cells
    var start = new Date(today);
    start.setDate(start.getDate() - 13);

    for (var i = 0; i < 14; i++) {
        var d = new Date(start);
        d.setDate(d.getDate() + i);
        var key = d.toISOString().split('T')[0];
        var isActive = (activeDates[key] || 0) > 0;
        var isToday = d.getTime() === today.getTime();
        grid += '<div class="flyout-streak-day' + (isActive ? ' active' : '') + (isToday ? ' today' : '') + '"></div>';
    }
    grid += '</div>';

    // Current streak calculation
    var currentStreak = 0;
    var checkDate = new Date(today);
    while (true) {
        var key = checkDate.toISOString().split('T')[0];
        if ((activeDates[key] || 0) > 0) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    container.innerHTML = labels + grid + '<div class="flyout-divider"></div><div class="flyout-row"><span class="flyout-row-label">Current Streak</span><span class="flyout-row-value">' + currentStreak + ' day' + (currentStreak !== 1 ? 's' : '') + '</span></div>';
}

// ==================== Stats Row (hero mockup style) ====================

function updateStatsRow() {
    // Guides studied count (real data from localStorage)
    var guidesEl = document.getElementById('stat-guides-count');
    if (guidesEl) {
        var lastStudied = {};
        try { lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}'); } catch(e) {}
        var count = Object.keys(lastStudied).length;
        guidesEl.textContent = count > 0 ? count : '0';
    }

    // Quiz bank stats (real data only)
    if (typeof MasteryTracker !== 'undefined') {
        var stats = MasteryTracker.getOverallStats();
        var answeredEl = document.getElementById('stat-questions-answered');
        var scoreEl = document.getElementById('stat-avg-score');
        var streakEl = document.getElementById('stat-streak');
        if (answeredEl) answeredEl.textContent = stats.totalQuestionsAnswered > 0 ? stats.totalQuestionsAnswered.toLocaleString() : '0';
        if (scoreEl) scoreEl.textContent = stats.totalQuestionsAnswered > 0 ? stats.accuracy + '%' : '--';
        if (streakEl) streakEl.textContent = stats.streak || '0';
    } else {
        var answeredEl = document.getElementById('stat-questions-answered');
        if (answeredEl) answeredEl.textContent = '0';
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

// ==================== Sidebar Subscription Widget ====================

async function loadSidebarSubscription() {
    const widget = document.getElementById('sidebar-sub-widget');
    if (!widget) return;

    try {
        const { hasAccess, subscription } = await getSubscriptionStatusCached();

        if (subscription) {
            const planName = planDisplayNames[subscription.plan_id] || subscription.plan_name || 'Plan';
            const isActive = subscription.is_active;
            const isLifetime = subscription.plan_id === 'lifetime-access';
            const isCancelling = subscription.cancel_at_period_end;

            let statusClass = 'active';
            let statusText = 'Active';
            let statusIcon = 'fa-check-circle';
            if (isActive && isCancelling) { statusClass = 'cancelling'; statusText = 'Cancelling'; statusIcon = 'fa-clock'; }
            else if (!isActive) { statusClass = 'expired'; statusText = 'Expired'; statusIcon = 'fa-times-circle'; }

            let detailText = '';
            if (isLifetime) {
                detailText = '<strong>Lifetime</strong> — never expires';
            } else if (subscription.expires_at) {
                const label = isCancelling ? 'Access until' : (subscription.plan_id === 'monthly-access' ? 'Renews' : 'Expires');
                detailText = label + ' <strong>' + formatDate(subscription.expires_at) + '</strong>';
            }

            let actionHtml = '';
            if (isActive && !isLifetime) {
                actionHtml = '<button class="sidebar-sub-manage" id="sidebar-manage-sub-btn"><i class="fas fa-cog"></i> Manage</button>';
            } else if (!isActive) {
                actionHtml = '<a href="pricing.html" class="sidebar-sub-manage"><i class="fas fa-rocket"></i> Resubscribe</a>';
            }

            widget.className = 'sidebar-sub-widget';
            widget.innerHTML = `
                <div class="sidebar-sub-plan"><i class="fas fa-crown"></i> ${escapeHtml(planName)}</div>
                <span class="sidebar-sub-status ${statusClass}"><i class="fas ${statusIcon}"></i> ${statusText}</span>
                <div class="sidebar-sub-detail">${detailText}</div>
                ${actionHtml}
            `;

            const manageBtn = document.getElementById('sidebar-manage-sub-btn');
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
                        this.disabled = false;
                        this.innerHTML = '<i class="fas fa-cog"></i> Manage';
                    }
                });
            }
        } else {
            widget.className = 'sidebar-sub-widget no-sub';
            widget.innerHTML = `
                <div class="sidebar-sub-cta">
                    <i class="fas fa-crown"></i>
                    <p>Unlock all study guides and resources</p>
                    <a href="pricing.html" class="btn btn-primary btn-sm"><i class="fas fa-rocket"></i> View Plans</a>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading sidebar subscription:', error);
        widget.innerHTML = '';
    }
}

// Keep loadSubscriptionManagement as a thin wrapper (hidden container still used for data)
async function loadSubscriptionManagement() {
    await loadSidebarSubscription();
}

// ==================== Continue Studying Hero ====================

function loadContinueHero() {
    const hero = document.getElementById('continue-hero');
    if (!hero) return;

    let lastStudiedMap = {};
    try {
        lastStudiedMap = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
    } catch (e) { return; }

    const entries = Object.entries(lastStudiedMap)
        .map(function(pair) { return { id: pair[0], date: new Date(pair[1]) }; })
        .filter(function(e) { return !isNaN(e.date.getTime()); })
        .sort(function(a, b) { return b.date - a.date; });

    if (entries.length === 0) return;

    const latest = entries[0];
    const name = formatGuideName(latest.id);
    const timeAgo = formatRelativeTime(latest.date.toISOString());
    const iconSrc = 'assets/images/guide-icons/' + latest.id + '.webp';

    var iconEl = document.getElementById('continue-hero-icon');
    if (iconEl) {
        iconEl.innerHTML = '<img src="' + iconSrc + '" alt="" onerror="this.parentElement.innerHTML=\'<i class=\\\'fas fa-book-open\\\'></i>\'">';
    }
    var nameEl = document.getElementById('continue-hero-name');
    if (nameEl) nameEl.textContent = name;
    var timeEl = document.getElementById('continue-hero-time');
    if (timeEl) timeEl.textContent = 'Last studied ' + (timeAgo || 'recently');

    var btn = document.getElementById('continue-hero-btn');
    if (btn) {
        btn.addEventListener('click', function() {
            continueStudying(latest.id);
        });
    }

    hero.classList.remove('hidden');
}

// ==================== Announcement Banner ====================

function loadAnnouncementBanner() {
    const banner = document.getElementById('dash-announcement');
    if (!banner) return;

    // Announcement content — update this when you have news
    const announcement = {
        id: 'feb-2026-new-guides',
        title: 'New guides added!',
        text: 'Explore our latest NCLEX study materials — freshly updated for 2026.'
    };

    // Check if user dismissed this announcement
    const dismissed = localStorage.getItem('announcementDismissed_' + announcement.id);
    if (dismissed) return;

    var titleEl = document.getElementById('announcement-title');
    var textEl = document.getElementById('announcement-text');
    if (titleEl) titleEl.textContent = announcement.title;
    if (textEl) textEl.textContent = announcement.text;

    banner.classList.remove('hidden');

    var dismissBtn = document.getElementById('dismiss-announcement-btn');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', function() {
            banner.classList.add('hidden');
            localStorage.setItem('announcementDismissed_' + announcement.id, 'true');
        });
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
