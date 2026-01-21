// Dashboard Page JavaScript
// User menu toggle and dashboard interactions
// Note: API service layer is now in api-service.js

// Check authentication (uses api-service.js functions)
requireAuth();

document.addEventListener('DOMContentLoaded', async function() {

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
    const purchasesElement = document.getElementById('widget-total-purchases');
    if (purchasesElement) {
        const purchasedGuides = JSON.parse(localStorage.getItem('purchasedGuides') || '[]');
        purchasesElement.textContent = purchasedGuides.length;
    }
}

function updateCompactStats(user) {
    const guidesCountElement = document.getElementById('guides-count');
    const memberSinceElement = document.getElementById('member-since');

    if (guidesCountElement) {
        const purchasedGuides = JSON.parse(localStorage.getItem('purchasedGuides') || '[]');
        guidesCountElement.textContent = purchasedGuides.length;
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

        if (adminBadgeEl && user.is_admin) {
            adminBadgeEl.style.cssText = 'display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-left: 12px; font-size: 14px;';
            adminBadgeEl.innerHTML = '<i class="fas fa-crown"></i> Admin';
        }

        if (premiumBadgeEl && user.is_premium) {
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

        // Load accessible guides based on user subscription
        loadAccessibleGuides(user);

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
                <button class="retry-button" onclick="window.location.reload()">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;

        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(errorDiv, container.firstChild);
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
            adminCard.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; grid-column: 1 / -1;';

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
    const totalPurchasesEl = document.getElementById('total-purchases');
    const memberSinceEl = document.getElementById('member-since');

    if (guidesOwnedEl) {
        guidesOwnedEl.textContent = '0'; // TODO: Will be dynamic when purchases are tracked
    }
    if (totalPurchasesEl) {
        totalPurchasesEl.textContent = '0'; // TODO: Will be dynamic when purchases are tracked
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

// Guides data - synced with guides.js
// All guides cost $5.99 each, users purchase individually
const guidesData = [
    {
        id: 'electrolytes',
        title: 'Electrolyte Management Guide',
        description: 'Essential electrolyte ranges, nursing interventions, and clinical priorities. Includes sodium, potassium, calcium, magnesium, and phosphorus management.',
        category: 'lab-values',
        icon: '⚡',
        file: 'content/guides/electrolytes.md',
        topics: ['Sodium', 'Potassium', 'Calcium', 'Magnesium', 'Phosphorus'],
        readTime: '8 min',
        difficulty: 'Intermediate',
        price: 5.99
    },
    {
        id: 'vital-signs',
        title: 'Vital Signs Assessment Guide',
        description: 'Normal ranges, assessment techniques, and critical values for all age groups. Covers heart rate, blood pressure, respiratory rate, temperature, and oxygen saturation.',
        category: 'clinical-skills',
        icon: '💓',
        file: 'content/guides/vital-signs.md',
        topics: ['Heart Rate', 'Blood Pressure', 'Respiratory Rate', 'Temperature', 'SpO₂'],
        readTime: '7 min',
        difficulty: 'Beginner',
        price: 5.99
    },
    {
        id: 'critical-lab-values',
        title: 'Critical Laboratory Values',
        description: 'Life-threatening lab values that require immediate notification and intervention. Essential reference for clinical practice and NCLEX preparation.',
        category: 'lab-values',
        icon: '🧪',
        file: 'content/guides/critical-lab-values.md',
        topics: ['Critical Values', 'Lab Ranges', 'Emergency Response'],
        readTime: '6 min',
        difficulty: 'Intermediate',
        price: 5.99
    },
    {
        id: 'isolation-precautions',
        title: 'Isolation Precautions Guide',
        description: 'Comprehensive guide to standard, contact, droplet, and airborne precautions. Includes PPE requirements and infection control protocols.',
        category: 'safety',
        icon: '🛡️',
        file: 'content/guides/isolation-precautions.md',
        topics: ['Standard Precautions', 'Contact', 'Droplet', 'Airborne', 'PPE'],
        readTime: '9 min',
        difficulty: 'Intermediate',
        price: 5.99
    },
    {
        id: 'medication-math',
        title: 'Medication Dosage Calculations',
        description: 'Essential drug calculations with step-by-step examples and practice problems. Covers dosage calculations, IV rates, and weight-based dosing.',
        category: 'medications',
        icon: '🧮',
        file: 'content/guides/medication-math.md',
        topics: ['Dosage Calculations', 'IV Flow Rates', 'Weight-Based Dosing', 'Conversions'],
        readTime: '12 min',
        difficulty: 'Advanced',
        price: 5.99
    }
];

// Load purchased guides from localStorage
function loadAccessibleGuides(user) {
    const guideList = document.querySelector('.guides-grid-enhanced') || document.getElementById('guide-list');
    if (!guideList) return;

    // Remove skeleton loader
    const skeleton = guideList.querySelector('.skeleton-loader');
    if (skeleton) skeleton.remove();

    // Get purchased guides from localStorage (will be synced with backend later)
    const purchasedGuides = JSON.parse(localStorage.getItem('purchasedGuides') || '[]');

    // Filter to show only purchased guides
    const purchasedGuidesData = guidesData.filter(guide => purchasedGuides.includes(guide.id));

    // Update study guides stat in compact header
    const guidesCountStat = document.getElementById('guides-count');
    if (guidesCountStat) {
        guidesCountStat.textContent = purchasedGuidesData.length;
    }

    // If user has purchased guides, render them
    if (purchasedGuidesData.length > 0) {
        guideList.innerHTML = purchasedGuidesData.map(guide => `
            <div class="guide-item" style="padding: 16px; background: var(--background-light); border-radius: 12px; margin-bottom: 12px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;" onclick="window.location.href='guide.html?id=${guide.id}'">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="font-size: 32px; flex-shrink: 0;">${guide.icon}</div>
                    <div style="flex: 1;">
                        <div style="display: flex; align-items-center; gap: 8px; margin-bottom: 4px;">
                            <h4 style="margin: 0; font-size: 1rem; color: var(--text-primary);">${guide.title}</h4>
                            <span class="badge bg-success" style="font-size: 0.65rem; padding: 3px 8px;"><i class="fas fa-check"></i> OWNED</span>
                        </div>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">${guide.description}</p>
                        <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px; font-size: 0.8rem; color: var(--text-secondary);">
                            <span><i class="fas fa-clock"></i> ${guide.readTime}</span>
                            <span><i class="fas fa-signal"></i> ${guide.difficulty}</span>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: var(--text-secondary); opacity: 0.5;"></i>
                </div>
            </div>
        `).join('');

        // Add hover effect
        guideList.querySelectorAll('.guide-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.background = 'var(--card-background)';
                this.style.transform = 'translateX(4px)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.borderColor = 'transparent';
                this.style.background = 'var(--background-light)';
                this.style.transform = 'translateX(0)';
            });
        });
    } else {
        // Show enhanced empty state with browse guides CTA
        guideList.innerHTML = `
            <div class="empty-state-enhanced">
                <div class="empty-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <h3>Start Your NCLEX Journey</h3>
                <p>Browse our collection of comprehensive study guides designed to help you pass the NCLEX on your first try.</p>
                <button class="btn-secondary" onclick="window.location.href='guides.html'">
                    <i class="fas fa-search"></i> Explore Study Guides
                </button>
            </div>
        `;
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
