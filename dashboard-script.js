// Dashboard Page JavaScript
// User menu toggle and dashboard interactions
// Note: API service layer is now in api-service.js

// Check authentication (uses api-service.js functions)
// requireAuth() now returns a promise that resolves after token refresh if needed
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

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });

        // Close dropdown when clicking a link
        userDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Handle logout
                if (this.getAttribute('href') === '#logout') {
                    e.preventDefault();
                    // Use performLogout for cross-tab sync
                    performLogout();
                }
                userDropdown.classList.remove('active');
            });
        });
    }

    // Animate stats on load
    animateStats();

    // Add smooth scroll for guide cards
    const guideCards = document.querySelectorAll('.guide-item');
    guideCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Load user profile from API
// Widget update functions for new dashboard layout
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

function updatePurchasesWidget(user) {
    // This is now handled by loadAccessibleGuides which fetches from backend
    // Keeping function for backward compatibility
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

// Convert product ID to display name (e.g., 'heart-failure' -> 'Heart Failure')
function formatGuideName(productId) {
    const words = productId.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    );
    return words.join(' ');
}

// Render a locked category preview for non-subscribers
function renderLockedCategoryPreview() {
    const categories = {};
    for (const [id, info] of Object.entries(guideCategoryMap)) {
        if (!categories[info.category]) {
            categories[info.category] = { count: 0, config: categoryConfig[info.category] };
        }
        categories[info.category].count++;
    }

    return Object.entries(categories)
        .sort((a, b) => (a[1].config?.order || 99) - (b[1].config?.order || 99))
        .map(([cat, data]) => `
            <div class="locked-category-item">
                <i class="fas ${data.config?.icon || 'fa-book'}"></i>
                <span>${data.config?.label || cat}</span>
                <span class="locked-count">${data.count} guides</span>
            </div>
        `).join('');
}

// Subscription plan display name mapping
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

// Update quick stats for subscribers
function updateQuickStatsSubscriber(allGuides, subscription) {
    const planEl = document.getElementById('stat-subscription-plan');
    const statusEl = document.getElementById('stat-subscription-status');
    if (planEl && subscription) {
        planEl.textContent = planDisplayNames[subscription.plan_id] || subscription.plan_name;
        if (statusEl) {
            statusEl.textContent = subscription.cancel_at_period_end ? 'Cancelling' : 'Active';
        }
    }

    // Last studied
    const lastStudiedEl = document.getElementById('stat-last-studied');
    if (lastStudiedEl) {
        let mostRecentStudy = null;
        allGuides.forEach(g => {
            const lastStudied = getLastStudied(g.product_id);
            if (lastStudied) {
                const studyDate = new Date(lastStudied);
                if (!mostRecentStudy || studyDate > mostRecentStudy) {
                    mostRecentStudy = studyDate;
                }
            }
        });
        lastStudiedEl.textContent = mostRecentStudy
            ? (formatRelativeTime(mostRecentStudy.toISOString()) || 'Today')
            : 'Not yet';
    }

    // Top category based on study activity
    const topCategoryEl = document.getElementById('stat-top-category');
    if (topCategoryEl && allGuides.length > 0) {
        const categoryCounts = {};
        allGuides.forEach(g => {
            if (getLastStudied(g.product_id)) {
                const catInfo = guideCategoryMap[g.product_id];
                if (catInfo) {
                    categoryCounts[catInfo.category] = (categoryCounts[catInfo.category] || 0) + 1;
                }
            }
        });
        let topCategory = null;
        let maxCount = 0;
        for (const [category, count] of Object.entries(categoryCounts)) {
            if (count > maxCount) { maxCount = count; topCategory = category; }
        }
        topCategoryEl.textContent = topCategory && categoryConfig[topCategory]
            ? categoryConfig[topCategory].label : '--';
    }
}

// Update quick stats for non-subscribers
function updateQuickStatsNoSubscription() {
    const planEl = document.getElementById('stat-subscription-plan');
    const statusEl = document.getElementById('stat-subscription-status');
    if (planEl) planEl.textContent = 'None';
    if (statusEl) statusEl.textContent = 'Not Subscribed';

    const lastStudiedEl = document.getElementById('stat-last-studied');
    if (lastStudiedEl) lastStudiedEl.textContent = '--';

    const topCategoryEl = document.getElementById('stat-top-category');
    if (topCategoryEl) topCategoryEl.textContent = '--';
}

function updateCompactStats(user) {
    const guidesCountElement = document.getElementById('guides-count');
    const memberSinceElement = document.getElementById('member-since');

    // Subscription status is updated by loadAccessibleGuides
    // Just set placeholder for now
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

async function loadUserProfile() {
    try {
        // Use apiCall for automatic token refresh
        const data = await apiCall('/user/profile', {
            method: 'GET'
        });

        const user = data.user;

        // Update compact header with user name
        const userFirstNameEl = document.getElementById('user-first-name');
        if (userFirstNameEl) {
            const displayName = user.first_name || user.email?.split('@')[0] || 'Student';
            userFirstNameEl.textContent = displayName;
        }

        // Add badges to compact header
        const premiumBadgeEl = document.getElementById('premium-badge');
        const adminBadgeEl = document.getElementById('admin-badge');

        // Check if user is admin
        const isAdmin = user.is_admin || user.email === 'admin@thenursingcollective.pro';

        if (adminBadgeEl && isAdmin) {
            // Move admin badge below the welcome message, centered
            adminBadgeEl.style.cssText = 'display: block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; margin: 12px auto 0 auto; width: fit-content;';
            adminBadgeEl.innerHTML = '<i class="fas fa-crown"></i> Admin';

            // Hide stats for admin users (they're not regular members)
            const statsCompact = document.querySelector('.user-stats-compact');
            if (statsCompact) {
                statsCompact.style.display = 'none';
            }
        }

        // Show admin panel button for admin users
        const adminPanelBtn = document.getElementById('admin-panel-btn');
        if (adminPanelBtn && isAdmin) {
            adminPanelBtn.style.display = 'flex';
        }

        // Add admin class to body for admin-specific dashboard styling
        if (isAdmin) {
            document.body.classList.add('is-admin-user');
        }

        // Only show premium badge for non-admin users
        if (premiumBadgeEl && user.is_premium && !isAdmin) {
            premiumBadgeEl.style.cssText = 'display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-left: 12px; font-size: 14px;';
            premiumBadgeEl.innerHTML = '<i class="fas fa-star"></i> Premium';
        }

        // Update new compact stats
        updateCompactStats(user);

        // Update new widgets
        updateAccountWidget(user);
        updatePurchasesWidget(user);

        // Update dashboard header (old selector for compatibility)
        const dashboardHeader = document.querySelector('.dashboard-header h1');
        if (dashboardHeader) {
            const displayName = user.first_name || user.email?.split('@')[0] || 'Student';
            dashboardHeader.textContent = `Welcome back, ${displayName}!`;

            // Add admin badge if admin
            if (user.is_admin) {
                const adminBadge = document.createElement('span');
                adminBadge.style.cssText = 'display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-left: 12px; font-size: 14px;';
                adminBadge.innerHTML = '<i class="fas fa-crown"></i> Admin';
                dashboardHeader.appendChild(adminBadge);
            }

            // Add premium badge if premium
            if (user.is_premium) {
                const premiumBadge = document.createElement('span');
                premiumBadge.style.cssText = 'display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-left: 12px; font-size: 14px;';
                premiumBadge.innerHTML = '<i class="fas fa-star"></i> Premium';
                dashboardHeader.appendChild(premiumBadge);
            }
        }

        // Update user stats with real data
        updateUserStats(user);

        // Update email verification status
        updateEmailVerificationBanner(user);

        // Update Discord status
        updateDiscordStatus(user);

        // Load purchases
        loadPurchases(user);

        // Update user avatar with initials
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && user.first_name) {
            userAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${user.first_name.charAt(0)}</span>`;
        }

        // Update Account Overview card
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Not provided';
        const userNameDisplay = document.getElementById('user-name-display');
        const userEmailDisplay = document.getElementById('user-email-display');
        const memberSinceDisplay = document.getElementById('member-since-display');

        if (userNameDisplay) userNameDisplay.textContent = fullName;
        if (userEmailDisplay) userEmailDisplay.textContent = user.email || 'Not provided';
        if (memberSinceDisplay) {
            const joinDate = new Date(user.created_at);
            memberSinceDisplay.textContent = joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }

        // Update user dropdown header
        const dropdownUserName = document.getElementById('dropdown-user-name');
        const dropdownUserEmail = document.getElementById('dropdown-user-email');

        if (dropdownUserName) dropdownUserName.textContent = fullName;
        if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || '';

        // Update user avatar large in dropdown
        const userAvatarLarge = document.querySelector('.user-avatar-large');
        if (userAvatarLarge && user.first_name) {
            userAvatarLarge.innerHTML = `<span style="font-weight: 600; font-size: 24px;">${user.first_name.charAt(0)}</span>`;
        }

        // Show getting started card for new users (less than 2 days old)
        showGettingStartedCard(user);

        // Show Quiz Bank card for premium users
        if (user.is_premium) {
            const quizBankBtn = document.getElementById('quiz-bank-action-btn');
            if (quizBankBtn) quizBankBtn.style.display = '';
        }

        // Update subscription action button for premium users
        if (user.is_premium) {
            const subActionBtn = document.getElementById('subscription-action-btn');
            const subActionTitle = document.getElementById('subscription-action-title');
            const subActionDesc = document.getElementById('subscription-action-desc');
            if (subActionBtn && subActionTitle && subActionDesc) {
                subActionBtn.removeAttribute('data-navigate');
                subActionTitle.textContent = 'Manage Subscription';
                subActionDesc.textContent = 'Billing & cancellation';
                subActionBtn.querySelector('.action-icon-large i').className = 'fas fa-cog';
                subActionBtn.addEventListener('click', async function() {
                    try {
                        const response = await apiCall('/api/subscription/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ return_url: window.location.href })
                        });
                        if (response.url) window.location.href = response.url;
                    } catch (error) {
                        console.error('Error opening subscription management:', error);
                    }
                });
            }
        }

        // Load accessible guides based on user subscription
        loadAccessibleGuides(user);

        // Load subscription management section
        loadSubscriptionManagement();

        // Load admin dashboard if admin
        if (user.is_admin) {
            await loadAdminDashboard();
        }

        // Update local storage
        localStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
        console.error('Error loading profile:', error);

        // Create error message with retry button
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
        if (container) {
            container.insertBefore(errorDiv, container.firstChild);
        }

        // Attach event listener to retry button (no inline onclick due to CSP)
        const retryBtn = document.getElementById('profile-retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', function() {
                window.location.reload();
            });
        }
    }
}

// Load admin dashboard stats
async function loadAdminDashboard() {
    try {
        // Use apiCall for automatic token refresh
        const data = await apiCall('/admin/dashboard', {
            method: 'GET'
        });

        const stats = data.statistics;

        // Add admin stats card
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (dashboardGrid) {
            const adminCard = document.createElement('div');
            adminCard.className = 'dashboard-card';
            adminCard.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; grid-column: 1 / -1; margin-bottom: 24px;';

            adminCard.innerHTML = `
                <h3 style="color: white;"><i class="fas fa-crown"></i> Admin Overview</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
                    <div class="admin-stat-box" onclick="openAdminModal('all')" style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px;">
                        <div style="font-size: 36px; font-weight: 700;">${stats.total_users}</div>
                        <div style="opacity: 0.9; margin-top: 8px;">Total Users</div>
                    </div>
                    <div class="admin-stat-box" onclick="openAdminModal('premium')" style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px;">
                        <div style="font-size: 36px; font-weight: 700;">${stats.premium_users}</div>
                        <div style="opacity: 0.9; margin-top: 8px;">Premium Users</div>
                    </div>
                    <div class="admin-stat-box" onclick="openAdminModal('today')" style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px;">
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

// Update user stats with real data
function updateUserStats(user) {
    // Format member since date
    const createdDate = new Date(user.created_at);
    const memberSince = createdDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Update stats
    const guidesOwnedEl = document.getElementById('guides-owned');
    const memberSinceEl = document.getElementById('member-since');

    if (guidesOwnedEl) {
        guidesOwnedEl.textContent = user.is_premium ? 'All Access' : 'None';
    }
    if (memberSinceEl) {
        memberSinceEl.textContent = memberSince;
    }

    // Animate the numeric stats
    animateStats();
}

// Update email verification banner
function updateEmailVerificationBanner(user) {
    const banner = document.getElementById('email-verification-banner');
    const resendBtn = document.getElementById('resend-verification-btn');

    if (!user.is_verified && banner) {
        banner.style.display = 'block';

        // Add resend email handler
        if (resendBtn) {
            resendBtn.onclick = async function() {
                resendBtn.disabled = true;
                resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                try {
                    // Use apiCall for automatic token refresh
                    await apiCall('/auth/resend-verification', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: user.email
                        })
                    });

                    // Transform button to success state
                    resendBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verification Sent!';
                    resendBtn.style.background = '#10b981';
                    resendBtn.style.color = 'white';

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        resendBtn.disabled = false;
                        resendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Resend Email';
                        resendBtn.style.background = 'white';
                        resendBtn.style.color = '#d97706';
                    }, 3000);

                } catch (error) {
                    console.error('Error resending verification:', error);
                    // Transform button to error state
                    resendBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
                    resendBtn.style.background = '#ef4444';
                    resendBtn.style.color = 'white';

                    // Reset button after 3 seconds
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

// Load user purchases
function loadPurchases(user) {
    // Purchase info is now displayed via updatePurchasesWidget() in the new dashboard layout
    // This function is kept for backward compatibility but is no longer used
    console.log('loadPurchases: Purchase data updated via widget system');
}

// Update Discord connection status
function updateDiscordStatus(user) {
    // Discord status is now updated via updateAccountWidget() in the new dashboard layout
    // This function is kept for backward compatibility but is no longer used
    console.log('updateDiscordStatus: Discord status updated via widget system');
}

// Animate dashboard stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.user-stats .number');

    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue);

        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = Math.ceil(numericValue / 30) || 1;
            const duration = 1000; // 1 second
            const stepTime = duration / (numericValue / increment);

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(counter);
                }
                stat.textContent = currentValue + (isPercentage ? '%' : '');
            }, stepTime);
        }
    });
}

// Show getting started card for new users
function showGettingStartedCard(user) {
    const gettingStartedCard = document.getElementById('getting-started-card');
    if (!gettingStartedCard) return;

    // Check if user is new (account created less than 2 days ago)
    const createdDate = new Date(user.created_at);
    const today = new Date();
    const daysOld = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));

    // Check if user has already dismissed the card
    const dismissed = localStorage.getItem('gettingStartedDismissed');

    if (daysOld < 2 && !dismissed) {
        // Show the card
        gettingStartedCard.style.display = 'block';

        // Store dismissal in localStorage when user clicks "Got it!"
        const dismissBtn = gettingStartedCard.querySelector('button');
        if (dismissBtn) {
            dismissBtn.onclick = function() {
                gettingStartedCard.style.display = 'none';
                localStorage.setItem('gettingStartedDismissed', 'true');
            };
        }
    }
}

// Category mapping for guide cards - now with proper Med-Surg subcategories
const guideCategoryMap = {
    // Cardiovascular
    'heart-failure': { category: 'cardiovascular', label: 'Cardiovascular', description: 'Comprehensive guide to heart failure management and nursing interventions.' },
    'myocardial-infarction': { category: 'cardiovascular', label: 'Cardiovascular', description: 'Acute MI recognition, treatment protocols, and patient care.' },
    'arrhythmias': { category: 'cardiovascular', label: 'Cardiovascular', description: 'Cardiac rhythm interpretation and emergency interventions.' },
    'hypertension': { category: 'cardiovascular', label: 'Cardiovascular', description: 'Blood pressure management and lifestyle modifications.' },
    'coronary-artery-disease': { category: 'cardiovascular', label: 'Cardiovascular', description: 'CAD pathophysiology and evidence-based treatments.' },
    'peripheral-vascular-disease': { category: 'cardiovascular', label: 'Cardiovascular', description: 'PVD assessment, wound care, and circulation optimization.' },
    // Respiratory
    'copd': { category: 'respiratory', label: 'Respiratory', description: 'COPD staging, oxygen therapy, and exacerbation management.' },
    'asthma': { category: 'respiratory', label: 'Respiratory', description: 'Asthma triggers, medication protocols, and action plans.' },
    'pneumonia': { category: 'respiratory', label: 'Respiratory', description: 'Pneumonia types, antibiotic therapy, and respiratory care.' },
    'oxygen-therapy': { category: 'respiratory', label: 'Respiratory', description: 'O2 delivery devices, flow rates, and monitoring.' },
    'tuberculosis': { category: 'respiratory', label: 'Respiratory', description: 'TB infection control and treatment protocols.' },
    'chest-tubes': { category: 'respiratory', label: 'Respiratory', description: 'Chest tube management and troubleshooting.' },
    // Endocrine
    'diabetes-type1': { category: 'endocrine', label: 'Endocrine', description: 'Type 1 diabetes management and insulin therapy.' },
    'diabetes-type2': { category: 'endocrine', label: 'Endocrine', description: 'Type 2 diabetes care and oral medications.' },
    'thyroid-disorders': { category: 'endocrine', label: 'Endocrine', description: 'Hypo/hyperthyroidism assessment and treatment.' },
    'adrenal-disorders': { category: 'endocrine', label: 'Endocrine', description: 'Adrenal crisis and Cushing syndrome management.' },
    'pituitary-disorders': { category: 'endocrine', label: 'Endocrine', description: 'Pituitary hormone imbalances and interventions.' },
    // Neurological
    'stroke': { category: 'neurological', label: 'Neurological', description: 'Stroke types, FAST assessment, and acute care.' },
    'seizures': { category: 'neurological', label: 'Neurological', description: 'Seizure precautions and emergency response.' },
    'spinal-cord-injury': { category: 'neurological', label: 'Neurological', description: 'SCI levels, complications, and rehabilitation.' },
    'traumatic-brain-injury': { category: 'neurological', label: 'Neurological', description: 'TBI assessment scales and ICP monitoring.' },
    'meningitis': { category: 'neurological', label: 'Neurological', description: 'Meningitis signs, isolation, and treatment.' },
    'parkinsons-ms': { category: 'neurological', label: 'Neurological', description: 'Progressive neurological disorders management.' },
    // Renal
    'acute-kidney-injury': { category: 'renal', label: 'Renal', description: 'AKI stages and fluid management.' },
    'chronic-kidney-disease': { category: 'renal', label: 'Renal', description: 'CKD staging and renal diet education.' },
    'dialysis': { category: 'renal', label: 'Renal', description: 'Hemodialysis and peritoneal dialysis care.' },
    'urinary-tract-infections': { category: 'renal', label: 'Renal', description: 'UTI prevention and antibiotic selection.' },
    'kidney-stones': { category: 'renal', label: 'Renal', description: 'Nephrolithiasis pain management and prevention.' },
    'fluid-electrolytes': { category: 'renal', label: 'Renal', description: 'Electrolyte imbalances and IV fluid therapy.' },
    // GI (Gastrointestinal)
    'gi-bleeding': { category: 'gastrointestinal', label: 'Gastrointestinal', description: 'Upper and lower GI bleed management.' },
    'bowel-obstruction': { category: 'gastrointestinal', label: 'Gastrointestinal', description: 'SBO vs LBO assessment and treatment.' },
    'liver-disease': { category: 'gastrointestinal', label: 'Gastrointestinal', description: 'Cirrhosis, hepatitis, and liver failure care.' },
    'pancreatitis': { category: 'gastrointestinal', label: 'Gastrointestinal', description: 'Acute and chronic pancreatitis management.' },
    'inflammatory-bowel-disease': { category: 'gastrointestinal', label: 'Gastrointestinal', description: 'Crohn\'s disease and ulcerative colitis.' },
    'gerd-peptic-ulcer': { category: 'gastrointestinal', label: 'Gastrointestinal', description: 'GERD and PUD treatment protocols.' },
    // Musculoskeletal
    'fractures': { category: 'musculoskeletal', label: 'Musculoskeletal', description: 'Fracture types and orthopedic nursing care.' },
    'arthritis': { category: 'musculoskeletal', label: 'Musculoskeletal', description: 'OA and RA management strategies.' },
    'hip-knee-replacement': { category: 'musculoskeletal', label: 'Musculoskeletal', description: 'Joint replacement pre and post-op care.' },
    'osteoporosis': { category: 'musculoskeletal', label: 'Musculoskeletal', description: 'Bone density preservation and fall prevention.' },
    'amputation-care': { category: 'musculoskeletal', label: 'Musculoskeletal', description: 'Amputation wound care and prosthetics.' },
    // Pharmacology
    'cardiac-medications': { category: 'pharmacology', label: 'Pharmacology', description: 'Cardiac drugs, antihypertensives, and anticoagulants.' },
    'antibiotics-antivirals': { category: 'pharmacology', label: 'Pharmacology', description: 'Antimicrobial therapy and resistance prevention.' },
    'pain-management': { category: 'pharmacology', label: 'Pharmacology', description: 'Analgesics, opioids, and multimodal pain control.' },
    'iv-medications': { category: 'pharmacology', label: 'Pharmacology', description: 'IV drug administration and compatibility.' },
    'psychotropic-medications': { category: 'pharmacology', label: 'Pharmacology', description: 'Psychiatric medications and side effects.' },
    'emergency-medications': { category: 'pharmacology', label: 'Pharmacology', description: 'Code drugs and emergency protocols.' },
    // Fundamentals / Clinical Skills
    'assessment-skills': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Systematic head-to-toe assessment and documentation.' },
    'infection-control': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Standard precautions and infection prevention.' },
    'documentation-charting': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Proper charting, documentation, and legal considerations.' },
    'patient-safety': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Fall prevention, medication safety, and patient advocacy.' },
    'mobility-transfers': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Safe patient handling and mobility assistance.' },
    // Maternal/Newborn
    'labor-delivery': { category: 'maternal-newborn', label: 'Maternal-Newborn', description: 'Stages of labor, fetal monitoring, and delivery care.' },
    'postpartum-care': { category: 'maternal-newborn', label: 'Maternal-Newborn', description: 'Postpartum assessment and breastfeeding support.' },
    'high-risk-pregnancy': { category: 'maternal-newborn', label: 'Maternal-Newborn', description: 'Complications in pregnancy and interventions.' },
    'antepartum-care': { category: 'maternal-newborn', label: 'Maternal-Newborn', description: 'Prenatal care and fetal development.' },
    // Pediatrics
    'growth-development': { category: 'pediatrics', label: 'Pediatrics', description: 'Developmental milestones and pediatric assessment.' },
    'pediatric-emergencies': { category: 'pediatrics', label: 'Pediatrics', description: 'Pediatric emergency response and interventions.' },
    'infant-care': { category: 'pediatrics', label: 'Pediatrics', description: 'Newborn care, feeding, and safety.' },
    'adolescent-health': { category: 'pediatrics', label: 'Pediatrics', description: 'Adolescent development and health concerns.' },
    // Mental Health
    'depression-anxiety': { category: 'mental-health', label: 'Mental Health', description: 'Depression and anxiety assessment and interventions.' },
    'crisis-intervention': { category: 'mental-health', label: 'Mental Health', description: 'Crisis management and suicide prevention.' },
    'therapeutic-communication': { category: 'mental-health', label: 'Mental Health', description: 'Therapeutic techniques and patient rapport.' },
    'substance-abuse': { category: 'mental-health', label: 'Mental Health', description: 'Substance use disorders and recovery support.' },
    'eating-disorders': { category: 'mental-health', label: 'Mental Health', description: 'Anorexia, bulimia, and binge eating interventions.' },
    // Lab Values
    'electrolytes': { category: 'lab-values', label: 'Lab Values', description: 'Essential electrolyte ranges and nursing interventions.' },
    'vital-signs': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Assessment techniques and critical values.' },
    'critical-lab-values': { category: 'lab-values', label: 'Lab Values', description: 'Life-threatening lab values requiring immediate action.' },
    // Safety
    'isolation-precautions': { category: 'safety', label: 'Safety', description: 'Standard, contact, droplet, and airborne precautions.' },
    // Pharmacology extras
    'medication-math': { category: 'pharmacology', label: 'Pharmacology', description: 'Dosage calculations, IV rates, and conversions.' }
};

// Guides that have published HTML pages (update when new guides are created)
const AVAILABLE_GUIDES = new Set([
    'heart-failure', 'myocardial-infarction', 'arrhythmias', 'hypertension',
    'coronary-artery-disease', 'peripheral-vascular-disease',
    'copd', 'asthma', 'pneumonia', 'oxygen-therapy', 'tuberculosis', 'chest-tubes',
    'stroke', 'fractures', 'hip-knee-replacement', 'gi-bleeding', 'assessment-skills'
]);

function guideHasPage(productId) {
    return AVAILABLE_GUIDES.has(productId);
}

// Get favorites from localStorage
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('guideFavorites') || '[]');
    } catch {
        return [];
    }
}

// Save favorites to localStorage
function saveFavorites(favorites) {
    localStorage.setItem('guideFavorites', JSON.stringify(favorites));
}

// Toggle favorite status
function toggleFavorite(productId, button) {
    const favorites = getFavorites();
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1);
        button.classList.remove('favorited');
        button.innerHTML = '<i class="far fa-star"></i>';
    } else {
        favorites.push(productId);
        button.classList.add('favorited');
        button.innerHTML = '<i class="fas fa-star"></i>';
    }

    saveFavorites(favorites);
}

// Get last studied date from localStorage
function getLastStudied(productId) {
    try {
        const lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
        return lastStudied[productId] || null;
    } catch {
        return null;
    }
}

// Format relative time
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

// Category display configuration - includes Med-Surg subcategories
const categoryConfig = {
    // Med-Surg Subcategories (body systems)
    'cardiovascular': { label: 'Cardiovascular', icon: 'fa-heartbeat', order: 1 },
    'respiratory': { label: 'Respiratory', icon: 'fa-lungs', order: 2 },
    'neurological': { label: 'Neurological', icon: 'fa-brain', order: 3 },
    'endocrine': { label: 'Endocrine', icon: 'fa-syringe', order: 4 },
    'renal': { label: 'Renal', icon: 'fa-tint', order: 5 },
    'gastrointestinal': { label: 'Gastrointestinal', icon: 'fa-utensils', order: 6 },
    'musculoskeletal': { label: 'Musculoskeletal', icon: 'fa-bone', order: 7 },
    // Other categories
    'clinical-skills': { label: 'Clinical Skills', icon: 'fa-stethoscope', order: 8 },
    'pharmacology': { label: 'Pharmacology', icon: 'fa-pills', order: 9 },
    'lab-values': { label: 'Lab Values', icon: 'fa-flask', order: 10 },
    'mental-health': { label: 'Mental Health', icon: 'fa-head-side-virus', order: 11 },
    'maternal-newborn': { label: 'Maternal-Newborn', icon: 'fa-baby', order: 12 },
    'pediatrics': { label: 'Pediatrics', icon: 'fa-child', order: 13 },
    'safety': { label: 'Safety', icon: 'fa-shield-alt', order: 14 }
};

// Load purchased guides from backend API - NEW FOLDER SYSTEM
async function loadAccessibleGuides(user) {
    const foldersContainer = document.getElementById('guides-folders-container');
    const searchBar = document.getElementById('guides-search-bar');

    if (!foldersContainer) return;

    try {
        // Check subscription status (cached to avoid duplicate API calls)
        const { hasAccess, subscription } = await getSubscriptionStatusCached();

        // Remove skeleton loader
        const skeleton = foldersContainer.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        if (hasAccess) {
            // SUBSCRIBER: Show ALL guides from guideCategoryMap
            const allGuides = Object.entries(guideCategoryMap).map(([productId, info]) => ({
                product_id: productId,
                product_name: formatGuideName(productId),
                category: info.category,
            }));

            const totalGuides = allGuides.length;

            // Update header stat
            const guidesCountStat = document.getElementById('guides-count');
            if (guidesCountStat) {
                guidesCountStat.textContent = `Full Access (${totalGuides} Guides)`;
            }

            // Update quick stats for subscribers
            updateQuickStatsSubscriber(allGuides, subscription);

            // Store all guide IDs in localStorage for other pages
            const allIds = allGuides.map(g => g.product_id);
            localStorage.setItem('purchasedGuides', JSON.stringify(allIds));

            // Store all guides for filtering
            allPurchasedGuides = allGuides;

            // Show search bar
            if (searchBar) searchBar.style.display = 'flex';
            const countEl = document.getElementById('filtered-guides-count');
            if (countEl) countEl.textContent = totalGuides;

            // Render favorites
            renderFavoritesSection(allGuides);

            // Render category folders
            renderCategoryFolders(allGuides);

            // Setup search and view toggle
            setupFolderSearch(allGuides);
            setupViewToggle();
        } else {
            // NON-SUBSCRIBER: Show locked empty state
            const guidesCountStat = document.getElementById('guides-count');
            if (guidesCountStat) {
                guidesCountStat.textContent = 'No Subscription';
            }

            updateQuickStatsNoSubscription();

            foldersContainer.innerHTML = `
                <div class="guides-empty-state subscription-required">
                    <div class="empty-icon">
                        <i class="fas fa-lock"></i>
                    </div>
                    <h3>Subscribe to Access All Study Guides</h3>
                    <p>Get unlimited access to all ${Object.keys(guideCategoryMap).length}+ study guides, clinical resources, and quick reference tools with a subscription.</p>
                    <div class="subscription-cta-buttons">
                        <button class="btn btn-primary" data-navigate="pricing.html">
                            <i class="fas fa-rocket"></i> View Subscription Plans
                        </button>
                    </div>
                    <div class="locked-preview">
                        <h4>What you'll get access to:</h4>
                        ${renderLockedCategoryPreview()}
                    </div>
                </div>
            `;
            // Setup navigation for CTA button
            foldersContainer.querySelectorAll('[data-navigate]').forEach(btn => {
                btn.addEventListener('click', function() {
                    window.location.href = this.dataset.navigate;
                });
            });
        }
    } catch (error) {
        console.error('Error loading guides:', error);
        const skeleton = foldersContainer.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        foldersContainer.innerHTML = `
            <div class="guides-empty-state">
                <div class="empty-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3>Unable to Load Guides</h3>
                <p>There was an error loading your guides. Please try refreshing the page.</p>
                <button class="btn btn-secondary" data-action="reload">
                    <i class="fas fa-redo"></i> Refresh Page
                </button>
            </div>
        `;
        foldersContainer.querySelector('[data-action="reload"]')?.addEventListener('click', function() {
            window.location.reload();
        });
    }
}

// Render favorites section at top
function renderFavoritesSection(purchases) {
    const favoritesSection = document.getElementById('guides-favorites-section');
    const favoritesGrid = document.getElementById('favorites-grid');
    if (!favoritesSection || !favoritesGrid) return;

    const favorites = getFavorites();
    const favoritedGuides = purchases.filter(p => favorites.includes(p.product_id));

    if (favoritedGuides.length > 0) {
        favoritesSection.style.display = 'block';
        favoritesGrid.innerHTML = favoritedGuides.map(purchase => renderFavoriteItem(purchase)).join('');
        setupFavoriteListeners(favoritesGrid);
    } else {
        favoritesSection.style.display = 'none';
    }
}

// Render a single favorite item (compact, quick-access)
function renderFavoriteItem(purchase) {
    const icon = getGuideIcon(purchase.product_id);

    return `
        <div class="favorite-item" data-product-id="${escapeHtml(purchase.product_id)}">
            <button class="favorite-remove" data-favorite="${escapeHtml(purchase.product_id)}" title="Remove from favorites">
                <i class="fas fa-star"></i>
            </button>
            <div class="favorite-icon">${icon}</div>
            <span class="favorite-title">${escapeHtml(purchase.product_name.replace(' Guide', ''))}</span>
            ${guideHasPage(purchase.product_id) ? `
                <button class="favorite-open" data-study="${escapeHtml(purchase.product_id)}">
                    Open
                </button>
            ` : `
                <span class="guide-coming-soon"><i class="fas fa-clock"></i> Soon</span>
            `}
        </div>
    `;
}

// Setup listeners for favorite items
function setupFavoriteListeners(container) {
    container.querySelectorAll('[data-study]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            continueStudying(this.dataset.study);
        });
    });

    container.querySelectorAll('[data-favorite]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFavoriteAndRefresh(this.dataset.favorite, this);
        });
    });
}

// Render category folders
function renderCategoryFolders(purchases, searchTerm = '') {
    const foldersContainer = document.getElementById('guides-folders-container');
    if (!foldersContainer) return;

    // Filter purchases by search term if provided
    let filteredPurchases = purchases;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredPurchases = purchases.filter(p => {
            const name = p.product_name.toLowerCase();
            const categoryInfo = guideCategoryMap[p.product_id];
            const categoryLabel = categoryInfo?.label?.toLowerCase() || '';
            const description = categoryInfo?.description?.toLowerCase() || '';
            return name.includes(term) || categoryLabel.includes(term) || description.includes(term);
        });
    }

    // Update count
    const countEl = document.getElementById('filtered-guides-count');
    if (countEl) countEl.textContent = filteredPurchases.length;

    // Group purchases by category
    const groupedByCategory = {};
    filteredPurchases.forEach(purchase => {
        const categoryInfo = guideCategoryMap[purchase.product_id] || { category: 'med-surg' };
        const category = categoryInfo.category;
        if (!groupedByCategory[category]) {
            groupedByCategory[category] = [];
        }
        groupedByCategory[category].push(purchase);
    });

    // Sort categories by order
    const sortedCategories = Object.keys(groupedByCategory).sort((a, b) => {
        const orderA = categoryConfig[a]?.order || 99;
        const orderB = categoryConfig[b]?.order || 99;
        return orderA - orderB;
    });

    // If no results after filtering
    if (sortedCategories.length === 0) {
        foldersContainer.innerHTML = `
            <div class="guides-no-results-folder">
                <i class="fas fa-search"></i>
                <h4>No guides found</h4>
                <p>Try adjusting your search term</p>
            </div>
        `;
        return;
    }

    // Render each category as a minimal list section
    foldersContainer.innerHTML = sortedCategories.map(category => {
        const guides = groupedByCategory[category];
        const config = categoryConfig[category] || { label: category, icon: 'fa-book' };

        return `
            <div class="category-section" data-category="${category}">
                <div class="category-section-header">
                    <div class="category-section-icon ${category}">
                        <i class="fas ${config.icon}"></i>
                    </div>
                    <h3>${config.label}</h3>
                </div>
                <div class="category-section-list">
                    ${guides.map(purchase => renderCompactGuideCard(purchase, false)).join('')}
                </div>
            </div>
        `;
    }).join('');

    // Setup guide card listeners
    setupGuideCardListenersCompact(foldersContainer);
}

// Render a minimal list row (clean, compact)
function renderCompactGuideCard(purchase, isFavoriteSection) {
    const icon = getGuideIcon(purchase.product_id);
    const favorites = getFavorites();
    const isFavorited = favorites.includes(purchase.product_id);
    const lastStudied = getLastStudied(purchase.product_id);
    const lastStudiedText = formatRelativeTime(lastStudied);

    return `
        <div class="guide-row" data-product-id="${escapeHtml(purchase.product_id)}">
            <div class="guide-row-left">
                <button class="favorite-btn-row ${isFavorited ? 'favorited' : ''}" data-favorite="${escapeHtml(purchase.product_id)}" title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                    <i class="${isFavorited ? 'fas' : 'far'} fa-star"></i>
                </button>
                <div class="guide-row-icon">${icon}</div>
                <span class="guide-row-title">${escapeHtml(purchase.product_name)}</span>
            </div>
            <div class="guide-row-right">
                ${guideHasPage(purchase.product_id) ? `
                    <span class="guide-row-studied">${lastStudiedText || 'Not studied yet'}</span>
                    <button class="btn-row-open" data-study="${escapeHtml(purchase.product_id)}">
                        Open
                    </button>
                    <button class="btn-row-pdf" data-download="${escapeHtml(purchase.product_id)}" title="Download PDF">
                        <i class="fas fa-download"></i>
                    </button>
                ` : `
                    <span class="guide-coming-soon"><i class="fas fa-clock"></i> Coming Soon</span>
                `}
            </div>
        </div>
    `;
}

// Setup folder toggle listeners
function setupFolderToggleListeners() {
    document.querySelectorAll('[data-toggle-folder]').forEach(header => {
        header.addEventListener('click', function() {
            const category = this.dataset.toggleFolder;
            const folder = document.querySelector(`.category-folder[data-category="${category}"]`);
            if (folder) {
                folder.classList.toggle('expanded');
                saveExpandedFolders();
            }
        });
    });
}

// Setup guide card listeners for compact cards
function setupGuideCardListenersCompact(container) {
    // Study buttons
    container.querySelectorAll('[data-study]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            continueStudying(this.dataset.study);
        });
    });

    // Download PDF buttons
    container.querySelectorAll('[data-download]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            downloadGuide(this.dataset.download, this);
        });
    });

    // Favorite buttons
    container.querySelectorAll('[data-favorite]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFavoriteAndRefresh(this.dataset.favorite, this);
        });
    });
}

// Toggle favorite and refresh the folder view
function toggleFavoriteAndRefresh(productId, button) {
    const favorites = getFavorites();
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }

    saveFavorites(favorites);

    // Refresh both favorites section and folders
    renderFavoritesSection(allPurchasedGuides);
    renderCategoryFolders(allPurchasedGuides, document.getElementById('guides-search-input')?.value || '');
}

// Get expanded folders from localStorage
function getExpandedFolders() {
    try {
        return JSON.parse(localStorage.getItem('expandedFolders') || '[]');
    } catch {
        return [];
    }
}

// Save expanded folders to localStorage
function saveExpandedFolders() {
    const expanded = [];
    document.querySelectorAll('.category-folder.expanded').forEach(folder => {
        expanded.push(folder.dataset.category);
    });
    localStorage.setItem('expandedFolders', JSON.stringify(expanded));
}

// Setup folder search
function setupFolderSearch(purchases) {
    const searchInput = document.getElementById('guides-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounceGuides(() => {
        const searchTerm = searchInput.value.trim();
        renderCategoryFolders(purchases, searchTerm);
    }, 300));
}

// Setup event listeners for guide cards (CSP-compliant, no inline handlers)
// This is kept for backward compatibility but the new folder system uses setupGuideCardListenersCompact
function setupGuideCardListeners() {
    // Continue Studying buttons
    document.querySelectorAll('[data-study]').forEach(btn => {
        btn.addEventListener('click', function() {
            continueStudying(this.dataset.study);
        });
    });

    // Download PDF buttons
    document.querySelectorAll('[data-download]').forEach(btn => {
        btn.addEventListener('click', function() {
            downloadGuide(this.dataset.download, this);
        });
    });

    // Favorite buttons
    document.querySelectorAll('[data-favorite]').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleFavorite(this.dataset.favorite, this);
        });
    });
}

// Setup view toggle functionality
function setupViewToggle() {
    const toggleBtns = document.querySelectorAll('.view-toggle-btn');
    const guideList = document.querySelector('.guides-grid-enhanced');

    if (!toggleBtns.length || !guideList) return;

    // Load saved preference
    const savedView = localStorage.getItem('guideViewPreference') || 'grid';
    setView(savedView);

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            setView(view);
            localStorage.setItem('guideViewPreference', view);
        });
    });

    function setView(view) {
        toggleBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        guideList.classList.remove('view-grid', 'view-list');
        guideList.classList.add(`view-${view}`);
    }
}

// Store all purchases for filtering
let allPurchasedGuides = [];

// Setup search and filter functionality
function setupGuidesFiltering(purchases) {
    allPurchasedGuides = purchases;

    const controls = document.getElementById('guides-controls');
    const countDisplay = document.getElementById('guides-count-display');
    const searchInput = document.getElementById('guides-search-input');
    const categoryTabsContainer = document.getElementById('guides-category-tabs');
    const sortSelect = document.getElementById('guides-sort');

    // Only show controls if user has guides
    if (purchases.length < 3) {
        if (controls) controls.style.display = 'none';
        if (countDisplay) countDisplay.style.display = 'none';
        return;
    }

    // Show controls
    if (controls) controls.style.display = 'flex';
    if (countDisplay) countDisplay.style.display = 'block';

    // Build category tabs from actual purchases
    const categories = new Set();
    purchases.forEach(p => {
        const categoryInfo = guideCategoryMap[p.product_id];
        if (categoryInfo) {
            categories.add(categoryInfo.category);
        }
    });

    // Clear and rebuild category tabs
    if (categoryTabsContainer) {
        categoryTabsContainer.innerHTML = '<button class="category-tab active" data-category="all">All</button>';

        const categoryLabels = {
            'med-surg': 'Med-Surg',
            'lab-values': 'Lab Values',
            'clinical-skills': 'Clinical Skills',
            'safety': 'Safety',
            'pharmacology': 'Pharmacology',
            'mental-health': 'Mental Health',
            'maternal-newborn': 'Maternal-Newborn',
            'pediatrics': 'Pediatrics'
        };

        categories.forEach(cat => {
            const label = categoryLabels[cat] || cat;
            const btn = document.createElement('button');
            btn.className = 'category-tab';
            btn.dataset.category = cat;
            btn.textContent = label;
            categoryTabsContainer.appendChild(btn);
        });

        // Add click handlers
        categoryTabsContainer.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                categoryTabsContainer.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                filterAndRenderGuides();
            });
        });
    }

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', debounceGuides(() => {
            filterAndRenderGuides();
        }, 300));
    }

    // Sort handler
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndRenderGuides);
    }

    // Initial count update
    updateGuidesCount(purchases.length);
}

// Debounce helper for guides search
function debounceGuides(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Filter and render guides based on current filters
function filterAndRenderGuides() {
    const searchInput = document.getElementById('guides-search-input');
    const categoryTabsContainer = document.getElementById('guides-category-tabs');
    const sortSelect = document.getElementById('guides-sort');
    const guideList = document.querySelector('.guides-grid-enhanced');

    if (!guideList || !allPurchasedGuides.length) return;

    let filteredGuides = [...allPurchasedGuides];

    // Search filter
    const searchTerm = searchInput?.value?.toLowerCase().trim() || '';
    if (searchTerm) {
        filteredGuides = filteredGuides.filter(p => {
            const name = p.product_name.toLowerCase();
            const categoryInfo = guideCategoryMap[p.product_id];
            const categoryLabel = categoryInfo?.label?.toLowerCase() || '';
            const description = categoryInfo?.description?.toLowerCase() || '';
            return name.includes(searchTerm) || categoryLabel.includes(searchTerm) || description.includes(searchTerm);
        });
    }

    // Category filter
    const activeCategory = categoryTabsContainer?.querySelector('.category-tab.active')?.dataset.category || 'all';
    if (activeCategory !== 'all') {
        filteredGuides = filteredGuides.filter(p => {
            const categoryInfo = guideCategoryMap[p.product_id];
            return categoryInfo?.category === activeCategory;
        });
    }

    // Sort
    const sortBy = sortSelect?.value || 'recent';
    filteredGuides.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.product_name.localeCompare(b.product_name);
            case 'purchased':
                return new Date(b.purchased_at) - new Date(a.purchased_at);
            case 'recent':
            default:
                const lastA = getLastStudied(a.product_id);
                const lastB = getLastStudied(b.product_id);
                if (!lastA && !lastB) return new Date(b.purchased_at) - new Date(a.purchased_at);
                if (!lastA) return 1;
                if (!lastB) return -1;
                return new Date(lastB) - new Date(lastA);
        }
    });

    // Update count
    updateGuidesCount(filteredGuides.length);

    // Render filtered guides
    if (filteredGuides.length === 0) {
        guideList.innerHTML = `
            <div class="guides-no-results">
                <i class="fas fa-search"></i>
                <h4>No guides found</h4>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    const favorites = getFavorites();
    guideList.innerHTML = filteredGuides.map(purchase => {
        const icon = getGuideIcon(purchase.product_id);
        const categoryInfo = guideCategoryMap[purchase.product_id] || { category: 'med-surg', label: 'Med-Surg', description: 'Comprehensive NCLEX study guide.' };
        const isFavorited = favorites.includes(purchase.product_id);
        const lastStudied = getLastStudied(purchase.product_id);
        const lastStudiedText = formatRelativeTime(lastStudied);

        return `
        <div class="guide-card-enhanced" data-product-id="${escapeHtml(purchase.product_id)}">
            <div class="guide-card-header">
                <div class="guide-icon">${icon}</div>
                <span class="owned-badge"><i class="fas fa-check"></i> Owned</span>
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-favorite="${escapeHtml(purchase.product_id)}" title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                    <i class="${isFavorited ? 'fas' : 'far'} fa-star"></i>
                </button>
            </div>
            <div class="guide-card-body">
                <div class="guide-card-title-row">
                    <h4>${escapeHtml(purchase.product_name)}</h4>
                    <span class="category-badge ${categoryInfo.category}">${categoryInfo.label}</span>
                </div>
                <p class="guide-preview">${categoryInfo.description}</p>
                <div class="guide-meta-row">
                    <span class="guide-meta-item">
                        <i class="fas fa-calendar-alt"></i> Added ${formatDate(purchase.purchased_at || purchase.created_at)}
                    </span>
                    ${lastStudiedText ? `<span class="guide-meta-item last-studied"><i class="fas fa-clock"></i> Studied ${lastStudiedText}</span>` : ''}
                </div>
                <div class="guide-card-actions">
                    ${guideHasPage(purchase.product_id) ? `
                        <button class="btn-continue" data-study="${escapeHtml(purchase.product_id)}">
                            <i class="fas fa-book-reader"></i> Open Guide
                        </button>
                        <button class="btn-download-secondary download-btn" data-download="${escapeHtml(purchase.product_id)}">
                            <i class="fas fa-download"></i> PDF
                        </button>
                    ` : `
                        <span class="guide-coming-soon"><i class="fas fa-clock"></i> Coming Soon</span>
                    `}
                </div>
            </div>
        </div>
    `;
    }).join('');

    // Re-attach event listeners
    setupGuideCardListeners();
}

// Update guides count display
function updateGuidesCount(count) {
    const countElement = document.getElementById('filtered-guides-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Continue studying - navigates to guide and updates last studied
function continueStudying(productId) {
    // Check if guide page exists
    if (!guideHasPage(productId)) {
        return;
    }

    // Update last studied timestamp
    try {
        const lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
        lastStudied[productId] = new Date().toISOString();
        localStorage.setItem('guideLastStudied', JSON.stringify(lastStudied));
    } catch (e) {
        console.error('Error saving last studied:', e);
    }

    // Navigate to the standalone HTML guide
    window.location.href = `guides/${productId}.html`;
}

// Download a guide by getting a secure download link from R2 storage
// Tracks download event for refund policy enforcement
async function downloadGuide(productId, button, source = 'dashboard') {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing download...';

    try {
        // Track the download event first
        await trackDownload(productId, source);

        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Please log in to download guides');
        }

        // All guides now use the same PDF endpoint which returns an R2 download URL
        const response = await fetch(`${API_URL}/api/guides/${productId}/pdf`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get download link');
        }

        if (data.success && data.redirect_url) {
            // Open the R2 presigned URL to download the PDF
            window.open(data.redirect_url, '_blank');
            button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
            }, 2000);
        } else {
            throw new Error('Download not available');
        }
    } catch (error) {
        console.error('Download error:', error);
        button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText;
        }, 2000);
        showAlert('Download Error', error.message || 'Unable to download the guide. Please try again or contact support.', 'error');
    }
}

// Track download events for refund policy enforcement
async function trackDownload(productId, source = 'unknown') {
    try {
        await apiCall('/api/downloads/track', {
            method: 'POST',
            body: JSON.stringify({
                product_id: productId,
                source: source, // 'dashboard', 'guide_page', 'email'
                timestamp: new Date().toISOString()
            })
        });
        console.log(`Download tracked: ${productId} from ${source}`);
    } catch (error) {
        // Don't block download if tracking fails, just log it
        console.error('Failed to track download:', error);
    }
}

// Get icon for guide based on product ID - returns img tag for PNG icons
function getGuideIcon(productId) {
    // Map product IDs to icon filenames in assets/images/guide-icons/
    const iconMap = {
        // Cardiovascular (6)
        'heart-failure': 'heart-failure.webp',
        'myocardial-infarction': 'myocardial-infarction.webp',
        'arrhythmias': 'arrhythmias.webp',
        'hypertension': 'hypertension.webp',
        'coronary-artery-disease': 'coronary-artery-disease.webp',
        'peripheral-vascular-disease': 'peripheral-vascular-disease.webp',

        // Respiratory (6)
        'copd': 'copd.webp',
        'asthma': 'asthma.webp',
        'pneumonia': 'pneumonia.webp',
        'oxygen-therapy': 'oxygen-therapy.webp',
        'tuberculosis': 'tuberculosis.webp',
        'chest-tubes': 'chest-tubes.webp',

        // Endocrine (5)
        'diabetes-type1': 'diabetes-type1.webp',
        'diabetes-type2': 'diabetes-type2.webp',
        'thyroid-disorders': 'thyroid-disorders.webp',
        'adrenal-disorders': 'adrenal-disorders.webp',
        'pituitary-disorders': 'pituitary-disorders.webp',

        // Neurological (6)
        'stroke': 'stroke.webp',
        'seizures': 'seizures.webp',
        'spinal-cord-injury': 'spinal-cord-injury.webp',
        'traumatic-brain-injury': 'traumatic-brain-injury.webp',
        'meningitis': 'meningitis.webp',
        'parkinsons-ms': 'parkinsons-ms.webp',

        // Renal (6)
        'acute-kidney-injury': 'acute-kidney-injury.webp',
        'chronic-kidney-disease': 'chronic-kidney-disease.webp',
        'dialysis': 'dialysis.webp',
        'urinary-tract-infections': 'urinary-tract-infections.webp',
        'kidney-stones': 'kidney-stones.webp',
        'fluid-electrolytes': 'fluid-electrolytes.webp',

        // Gastrointestinal (6)
        'gi-bleeding': 'gi-bleeding.webp',
        'bowel-obstruction': 'bowel-obstruction.webp',
        'liver-disease': 'liver-disease.webp',
        'pancreatitis': 'pancreatitis.webp',
        'inflammatory-bowel-disease': 'inflammatory-bowel-disease.webp',
        'gerd-peptic-ulcer': 'gerd-peptic-ulcer.webp',

        // Musculoskeletal (5)
        'fractures': 'fractures.webp',
        'arthritis': 'arthritis.webp',
        'hip-knee-replacement': 'hip-knee-replacement.webp',
        'osteoporosis': 'osteoporosis.webp',
        'amputation-care': 'amputation-care.webp',

        // Pharmacology (6)
        'cardiac-medications': 'cardiac-medications.webp',
        'antibiotics-antivirals': 'antibiotics-antivirals.webp',
        'pain-management': 'pain-management.webp',
        'iv-medications': 'iv-medications.webp',
        'psychotropic-medications': 'psychotropic-medications.webp',
        'emergency-medications': 'emergency-medications.webp',

        // Clinical Skills / Fundamentals (5)
        'assessment-skills': 'assessment-skills.webp',
        'infection-control': 'infection-control.webp',
        'documentation-charting': 'documentation-charting.webp',
        'patient-safety': 'patient-safety.webp',
        'mobility-transfers': 'mobility-transfers.webp',

        // Maternal-Newborn (4)
        'labor-delivery': 'labor-delivery.webp',
        'postpartum-care': 'postpartum-care.webp',
        'high-risk-pregnancy': 'high-risk-pregnancy.webp',
        'antepartum-care': 'antepartum-care.webp',

        // Pediatrics (4)
        'growth-development': 'growth-development.webp',
        'pediatric-emergencies': 'pediatric-emergencies.webp',
        'infant-care': 'infant-care.webp',
        'adolescent-health': 'adolescent-health.webp',

        // Mental Health (5)
        'depression-anxiety': 'depression-anxiety.webp',
        'crisis-intervention': 'crisis-intervention.webp',
        'therapeutic-communication': 'therapeutic-communication.webp',
        'substance-abuse': 'substance-abuse.webp',
        'eating-disorders': 'eating-disorders.webp'
    };

    const iconFile = iconMap[productId];
    if (iconFile) {
        return `<img src="assets/images/guide-icons/${iconFile}" alt="" style="width: 40px; height: 40px; object-fit: contain;">`;
    }
    // Fallback to emoji for guides without custom icons
    return '📚';
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== Subscription Management ====================

async function loadSubscriptionManagement() {
    const container = document.getElementById('subscription-management-container');
    if (!container) return;

    try {
        const { hasAccess, subscription } = await getSubscriptionStatusCached();

        // Remove skeleton
        const skeleton = container.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        if (subscription) {
            const planName = planDisplayNamesFull[subscription.plan_id] || subscription.plan_name;
            const isActive = subscription.is_active;
            const isLifetime = subscription.plan_id === 'lifetime-access';
            const isCancelling = subscription.cancel_at_period_end;

            // Build status badge
            let statusBadge;
            if (isActive && isCancelling) {
                statusBadge = '<span class="sub-status-badge cancelling"><i class="fas fa-clock"></i> Cancelling</span>';
            } else if (isActive) {
                statusBadge = '<span class="sub-status-badge active"><i class="fas fa-check-circle"></i> Active</span>';
            } else {
                statusBadge = '<span class="sub-status-badge expired"><i class="fas fa-times-circle"></i> Expired</span>';
            }

            // Build dates section
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

            // Build action buttons
            let actionsHtml = '';
            if (isActive && !isLifetime) {
                actionsHtml = `<button class="btn btn-primary" id="manage-subscription-btn"><i class="fas fa-cog"></i> Manage Subscription</button>`;
            } else if (!isActive) {
                actionsHtml = `<button class="btn btn-primary" data-navigate="pricing.html"><i class="fas fa-rocket"></i> Resubscribe</button>`;
            } else if (isLifetime) {
                actionsHtml = `<span class="lifetime-badge"><i class="fas fa-gem"></i> Lifetime Member</span>`;
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

            // Setup manage subscription button (opens Stripe portal)
            const manageBtn = document.getElementById('manage-subscription-btn');
            if (manageBtn) {
                manageBtn.addEventListener('click', async function() {
                    this.disabled = true;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
                    try {
                        const response = await apiCall('/api/subscription/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                return_url: window.location.href
                            })
                        });
                        if (response.url) {
                            window.location.href = response.url;
                        }
                    } catch (error) {
                        console.error('Error opening subscription management:', error);
                        showAlert('Error', 'Unable to open subscription management. Please try again.', 'error');
                        this.disabled = false;
                        this.innerHTML = '<i class="fas fa-cog"></i> Manage Subscription';
                    }
                });
            }

            // Setup navigation buttons
            container.querySelectorAll('[data-navigate]').forEach(btn => {
                btn.addEventListener('click', function() {
                    window.location.href = this.dataset.navigate;
                });
            });

        } else {
            // No subscription at all
            container.innerHTML = `
                <div class="subscription-status-card no-subscription">
                    <div class="sub-empty-state">
                        <i class="fas fa-crown" style="font-size: 32px; color: var(--accent-color); margin-bottom: 16px;"></i>
                        <h3>No Active Subscription</h3>
                        <p>Subscribe to get unlimited access to all study guides, clinical resources, and quick reference tools.</p>
                        <button class="btn btn-primary" data-navigate="pricing.html">
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
                <p>Unable to load subscription information.</p>
                <button class="btn btn-secondary" data-action="reload"><i class="fas fa-redo"></i> Retry</button>
            </div>
        `;
        container.querySelector('[data-action="reload"]')?.addEventListener('click', () => window.location.reload());
    }
}

// Admin User Management Functions
let allUsersData = [];
let currentFilter = 'all';

async function openAdminModal(filter = 'all') {
    currentFilter = filter;
    const modal = document.getElementById('admin-user-modal');
    const modalTitle = document.getElementById('modal-title');

    // Set modal title based on filter
    const titles = {
        'all': 'All Users',
        'today': 'Users Joined Today',
        'yesterday': 'Users Joined Yesterday',
        'week': 'Users Joined This Week',
        'premium': 'Premium Users',
        'free': 'Free Users'
    };
    modalTitle.textContent = titles[filter] || 'Users';

    // Show modal
    modal.style.display = 'flex';

    // Load users
    await loadAdminUsers(filter);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });

    // Attach filter button listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            filterUsers(btn.dataset.filter);
        };
    });
}

function closeAdminModal() {
    document.getElementById('admin-user-modal').style.display = 'none';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('admin-user-modal');
    if (e.target === modal) {
        closeAdminModal();
    }
});

async function loadAdminUsers(filter = 'all') {
    try {
        // Use apiCall for automatic token refresh
        const data = await apiCall(`/admin/users?filter=${filter}`, {
            method: 'GET'
        });

        allUsersData = data.users;
        renderUsersTable(allUsersData);

    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('users-table-body').innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 12px; display: block;"></i>
                    Failed to load users
                </td>
            </tr>
        `;
    }
}

function filterUsers(filter) {
    currentFilter = filter;
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

    // Filter users on client side
    let filteredUsers = [...allUsersData];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    switch(filter) {
        case 'today':
            filteredUsers = allUsersData.filter(u => new Date(u.created_at) >= today);
            break;
        case 'yesterday':
            filteredUsers = allUsersData.filter(u => {
                const date = new Date(u.created_at);
                return date >= yesterday && date < today;
            });
            break;
        case 'week':
            filteredUsers = allUsersData.filter(u => new Date(u.created_at) >= weekAgo);
            break;
        case 'premium':
            filteredUsers = allUsersData.filter(u => u.is_premium);
            break;
        case 'free':
            filteredUsers = allUsersData.filter(u => !u.is_premium);
            break;
    }

    renderUsersTable(filteredUsers);

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
}

function renderUsersTable(users) {
    const tbody = document.getElementById('users-table-body');

    if (users.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-users" style="font-size: 48px; margin-bottom: 12px; display: block; opacity: 0.3;"></i>
                    No users found
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = users.map(user => {
        const badges = [];
        if (user.is_admin) badges.push('<span class="user-badge admin"><i class="fas fa-crown"></i> Admin</span>');
        if (user.is_premium) badges.push('<span class="user-badge premium"><i class="fas fa-star"></i> Premium</span>');
        if (!user.is_premium && !user.is_admin) badges.push('<span class="user-badge free">Free</span>');

        const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return `
            <tr>
                <td><strong>${user.first_name} ${user.last_name}</strong></td>
                <td>${user.email}</td>
                <td>${badges.join(' ')}</td>
                <td>${joinedDate}</td>
                <td>
                    <div class="user-actions">
                        <button class="action-btn" onclick="viewUserDetails('${user.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        ${!user.is_verified ? `<button class="action-btn" onclick="verifyUser('${user.id}')">
                            <i class="fas fa-check-circle"></i> Verify Email
                        </button>` : ''}
                        ${!user.is_premium ? `<button class="action-btn" onclick="togglePremium('${user.id}', true)">
                            <i class="fas fa-crown"></i> Grant Premium
                        </button>` : `<button class="action-btn danger" onclick="togglePremium('${user.id}', false)">
                            <i class="fas fa-times"></i> Remove Premium
                        </button>`}
                        ${!user.is_admin ? `<button class="action-btn danger" onclick="deleteUser('${user.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function togglePremium(userId, grantPremium) {
    const confirmed = await showConfirm(
        'Update Premium Status',
        `Are you sure you want to ${grantPremium ? 'grant' : 'remove'} premium status for this user?`,
        'question'
    );

    if (!confirmed) {
        return;
    }

    try {
        // Use apiCall for automatic token refresh
        await apiCall(`/admin/users/${userId}/premium`, {
            method: 'PUT',
            body: JSON.stringify({ is_premium: grantPremium })
        });

        // Reload users
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

    const details = `Name: ${user.first_name} ${user.last_name}
Email: ${user.email}
Nursing Program: ${user.nursing_program || 'Not specified'}
Account Type: ${user.is_premium ? 'Premium' : 'Free'}
Admin: ${user.is_admin ? 'Yes' : 'No'}
Verified: ${user.is_verified ? 'Yes' : 'No'}
Discord Connected: ${user.has_discord ? 'Yes' : 'No'}
Joined: ${new Date(user.created_at).toLocaleString()}`;

    showAlert('User Details', details, 'info');
}

async function verifyUser(userId) {
    const user = allUsersData.find(u => u.id === userId);
    if (!user) return;

    const confirmed = await showConfirm(
        'Verify User Email',
        `Manually verify email for ${user.first_name} ${user.last_name} (${user.email})?`,
        'question'
    );

    if (!confirmed) {
        return;
    }

    try {
        // Use apiCall for automatic token refresh
        await apiCall(`/admin/users/${userId}/verify`, {
            method: 'POST'
        });

        // Reload users
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

    const confirmed = await showConfirm(
        'Delete User',
        `Are you sure you want to delete ${user.first_name} ${user.last_name} (${user.email})?\n\nThis action cannot be undone.`,
        'danger',
        'Delete',
        'Cancel'
    );

    if (!confirmed) {
        return;
    }

    try {
        // Use apiCall for automatic token refresh
        await apiCall(`/admin/users/${userId}`, {
            method: 'DELETE'
        });

        // Reload users
        await loadAdminUsers(currentFilter);
        await loadAdminDashboard(); // Refresh dashboard stats

        showSuccess('User deleted successfully!');

    } catch (error) {
        console.error('Error deleting user:', error);
        showAlert('Delete Failed', error.message || 'Failed to delete user. Please try again.', 'error');
    }
}

// ==================== Event Listeners (replaces inline onclick handlers) ====================

document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons with data-navigate attribute
    document.querySelectorAll('[data-navigate]').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = this.dataset.navigate;
        });
    });

    // External links with data-external attribute
    document.querySelectorAll('[data-external]').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open(this.dataset.external, '_blank');
        });
    });

    // Dismiss getting started card
    const dismissBtn = document.getElementById('dismiss-getting-started-btn');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', function() {
            const card = document.getElementById('getting-started-card');
            if (card) {
                card.style.display = 'none';
                localStorage.setItem('gettingStartedDismissed', 'true');
            }
        });
    }

    // Close admin modal button
    const closeAdminModalBtn = document.getElementById('close-admin-modal-btn');
    if (closeAdminModalBtn) {
        closeAdminModalBtn.addEventListener('click', closeAdminModal);
    }
});
