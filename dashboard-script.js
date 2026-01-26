// Dashboard Page JavaScript
// User menu toggle and dashboard interactions
// Note: API service layer is now in api-service.js

// Check authentication (uses api-service.js functions)
requireAuth();

document.addEventListener('DOMContentLoaded', async function() {

    // Load user profile from API
    await loadUserProfile();

    // Check for order claim from URL parameter (from success page redirect)
    await checkForOrderClaim();

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

function updateCompactStats(user) {
    const guidesCountElement = document.getElementById('guides-count');
    const memberSinceElement = document.getElementById('member-since');

    // Guide count is now updated by loadAccessibleGuides which fetches from backend
    // Just set placeholder for now - it will be updated after API call
    if (guidesCountElement) {
        guidesCountElement.textContent = '...';
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

        // Show admin panel button for admin users
        const adminPanelBtn = document.getElementById('admin-panel-btn');
        if (adminPanelBtn && user.is_admin) {
            adminPanelBtn.style.display = 'flex';
        }

        // Add admin class to body for admin-specific dashboard styling
        if (user.is_admin) {
            document.body.classList.add('is-admin-user');
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

        // Load purchase history
        loadPurchaseHistory();

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

// Category mapping for guide cards
const guideCategoryMap = {
    // Cardiovascular
    'heart-failure': { category: 'med-surg', label: 'Med-Surg', description: 'Comprehensive guide to heart failure management and nursing interventions.' },
    'myocardial-infarction': { category: 'med-surg', label: 'Med-Surg', description: 'Acute MI recognition, treatment protocols, and patient care.' },
    'arrhythmias': { category: 'med-surg', label: 'Med-Surg', description: 'Cardiac rhythm interpretation and emergency interventions.' },
    'hypertension': { category: 'med-surg', label: 'Med-Surg', description: 'Blood pressure management and lifestyle modifications.' },
    'coronary-artery-disease': { category: 'med-surg', label: 'Med-Surg', description: 'CAD pathophysiology and evidence-based treatments.' },
    'peripheral-vascular-disease': { category: 'med-surg', label: 'Med-Surg', description: 'PVD assessment, wound care, and circulation optimization.' },
    // Respiratory
    'copd': { category: 'med-surg', label: 'Med-Surg', description: 'COPD staging, oxygen therapy, and exacerbation management.' },
    'asthma': { category: 'med-surg', label: 'Med-Surg', description: 'Asthma triggers, medication protocols, and action plans.' },
    'pneumonia': { category: 'med-surg', label: 'Med-Surg', description: 'Pneumonia types, antibiotic therapy, and respiratory care.' },
    'oxygen-therapy': { category: 'clinical-skills', label: 'Clinical Skills', description: 'O2 delivery devices, flow rates, and monitoring.' },
    'tuberculosis': { category: 'med-surg', label: 'Med-Surg', description: 'TB infection control and treatment protocols.' },
    'chest-tubes': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Chest tube management and troubleshooting.' },
    // Endocrine
    'diabetes-type1': { category: 'med-surg', label: 'Med-Surg', description: 'Type 1 diabetes management and insulin therapy.' },
    'diabetes-type2': { category: 'med-surg', label: 'Med-Surg', description: 'Type 2 diabetes care and oral medications.' },
    'thyroid-disorders': { category: 'med-surg', label: 'Med-Surg', description: 'Hypo/hyperthyroidism assessment and treatment.' },
    'adrenal-disorders': { category: 'med-surg', label: 'Med-Surg', description: 'Adrenal crisis and Cushing syndrome management.' },
    'pituitary-disorders': { category: 'med-surg', label: 'Med-Surg', description: 'Pituitary hormone imbalances and interventions.' },
    // Neurological
    'stroke': { category: 'med-surg', label: 'Med-Surg', description: 'Stroke types, FAST assessment, and acute care.' },
    'seizures': { category: 'med-surg', label: 'Med-Surg', description: 'Seizure precautions and emergency response.' },
    'spinal-cord-injury': { category: 'med-surg', label: 'Med-Surg', description: 'SCI levels, complications, and rehabilitation.' },
    'traumatic-brain-injury': { category: 'med-surg', label: 'Med-Surg', description: 'TBI assessment scales and ICP monitoring.' },
    'meningitis': { category: 'med-surg', label: 'Med-Surg', description: 'Meningitis signs, isolation, and treatment.' },
    'parkinsons-ms': { category: 'med-surg', label: 'Med-Surg', description: 'Progressive neurological disorders management.' },
    // Renal
    'acute-kidney-injury': { category: 'med-surg', label: 'Med-Surg', description: 'AKI stages and fluid management.' },
    'chronic-kidney-disease': { category: 'med-surg', label: 'Med-Surg', description: 'CKD staging and renal diet education.' },
    'dialysis': { category: 'med-surg', label: 'Med-Surg', description: 'Hemodialysis and peritoneal dialysis care.' },
    'urinary-tract-infections': { category: 'med-surg', label: 'Med-Surg', description: 'UTI prevention and antibiotic selection.' },
    'kidney-stones': { category: 'med-surg', label: 'Med-Surg', description: 'Nephrolithiasis pain management and prevention.' },
    'fluid-electrolytes': { category: 'lab-values', label: 'Lab Values', description: 'Electrolyte imbalances and IV fluid therapy.' },
    // GI
    'gi-bleeding': { category: 'med-surg', label: 'Med-Surg', description: 'Upper and lower GI bleed management.' },
    'bowel-obstruction': { category: 'med-surg', label: 'Med-Surg', description: 'SBO vs LBO assessment and treatment.' },
    'liver-disease': { category: 'med-surg', label: 'Med-Surg', description: 'Cirrhosis, hepatitis, and liver failure care.' },
    'pancreatitis': { category: 'med-surg', label: 'Med-Surg', description: 'Acute and chronic pancreatitis management.' },
    'inflammatory-bowel-disease': { category: 'med-surg', label: 'Med-Surg', description: 'Crohn\'s disease and ulcerative colitis.' },
    'gerd-peptic-ulcer': { category: 'med-surg', label: 'Med-Surg', description: 'GERD and PUD treatment protocols.' },
    // Musculoskeletal
    'fractures': { category: 'med-surg', label: 'Med-Surg', description: 'Fracture types and orthopedic nursing care.' },
    'arthritis': { category: 'med-surg', label: 'Med-Surg', description: 'OA and RA management strategies.' },
    'hip-knee-replacement': { category: 'med-surg', label: 'Med-Surg', description: 'Joint replacement pre and post-op care.' },
    'osteoporosis': { category: 'med-surg', label: 'Med-Surg', description: 'Bone density preservation and fall prevention.' },
    'amputation-care': { category: 'med-surg', label: 'Med-Surg', description: 'Amputation wound care and prosthetics.' },
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
    // Other categories
    'electrolytes': { category: 'lab-values', label: 'Lab Values', description: 'Essential electrolyte ranges and nursing interventions.' },
    'vital-signs': { category: 'clinical-skills', label: 'Clinical Skills', description: 'Assessment techniques and critical values.' },
    'critical-lab-values': { category: 'lab-values', label: 'Lab Values', description: 'Life-threatening lab values requiring immediate action.' },
    'isolation-precautions': { category: 'safety', label: 'Safety', description: 'Standard, contact, droplet, and airborne precautions.' },
    'medication-math': { category: 'pharmacology', label: 'Pharmacology', description: 'Dosage calculations, IV rates, and conversions.' }
};

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

// Load purchased guides from backend API
async function loadAccessibleGuides(user) {
    const guideList = document.querySelector('.guides-grid-enhanced') || document.getElementById('guide-list');
    if (!guideList) return;

    try {
        // Fetch purchases from backend API
        const purchaseData = await apiCall('/cart/purchases', { method: 'GET' });
        const purchases = purchaseData.purchases || [];

        // Remove skeleton loader
        const skeleton = guideList.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        // Update study guides stat in compact header
        const guidesCountStat = document.getElementById('guides-count');
        if (guidesCountStat) {
            guidesCountStat.textContent = purchases.length;
        }

        // Update purchases widget
        const purchasesElement = document.getElementById('widget-total-purchases');
        if (purchasesElement) {
            purchasesElement.textContent = purchases.length;
        }

        // Store purchased IDs in localStorage for other pages
        const purchasedIds = purchases.map(p => p.product_id);
        localStorage.setItem('purchasedGuides', JSON.stringify(purchasedIds));

        // Get favorites for rendering
        const favorites = getFavorites();

        // If user has purchased guides, render them
        if (purchases.length > 0) {
            guideList.innerHTML = purchases.map(purchase => {
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
                                <i class="fas fa-calendar-alt"></i> Purchased ${formatDate(purchase.purchased_at)}
                            </span>
                            ${lastStudiedText ? `<span class="guide-meta-item last-studied"><i class="fas fa-clock"></i> Studied ${lastStudiedText}</span>` : ''}
                        </div>
                        <div class="guide-card-actions">
                            <button class="btn-continue" data-study="${escapeHtml(purchase.product_id)}">
                                <i class="fas fa-book-reader"></i> Continue Studying
                            </button>
                            <button class="btn-download-secondary download-btn" data-download="${escapeHtml(purchase.product_id)}">
                                <i class="fas fa-download"></i> PDF
                            </button>
                        </div>
                    </div>
                </div>
            `;
            }).join('');

            // Setup event listeners for guide cards (CSP-compliant, no inline handlers)
            setupGuideCardListeners();

            // Setup view toggle
            setupViewToggle();

            // Setup search and filter functionality
            setupGuidesFiltering(purchases);
        } else {
            // Show enhanced empty state with browse guides CTA
            guideList.innerHTML = `
                <div class="empty-state-enhanced">
                    <div class="empty-icon">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <h3>Start Your NCLEX Journey</h3>
                    <p>Browse our collection of comprehensive study guides designed to help you pass the NCLEX on your first try.</p>
                    <button class="btn btn-secondary" data-navigate="store.html">
                        <i class="fas fa-store"></i> Visit Store
                    </button>
                </div>
            `;
            // Setup navigation for empty state button
            guideList.querySelector('[data-navigate]')?.addEventListener('click', function() {
                window.location.href = this.dataset.navigate;
            });
        }
    } catch (error) {
        console.error('Error loading purchases:', error);
        // Remove skeleton and show error
        const skeleton = guideList.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        guideList.innerHTML = `
            <div class="empty-state-enhanced">
                <div class="empty-icon" style="color: var(--error-color);">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3>Unable to Load Guides</h3>
                <p>There was an error loading your purchased guides. Please try refreshing the page.</p>
                <button class="btn btn-secondary" data-action="reload">
                    <i class="fas fa-redo"></i> Refresh Page
                </button>
            </div>
        `;
        // Setup reload button
        guideList.querySelector('[data-action="reload"]')?.addEventListener('click', function() {
            window.location.reload();
        });
    }
}

// Setup event listeners for guide cards (CSP-compliant, no inline handlers)
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
                        <i class="fas fa-calendar-alt"></i> Purchased ${formatDate(purchase.purchased_at)}
                    </span>
                    ${lastStudiedText ? `<span class="guide-meta-item last-studied"><i class="fas fa-clock"></i> Studied ${lastStudiedText}</span>` : ''}
                </div>
                <div class="guide-card-actions">
                    <button class="btn-continue" data-study="${escapeHtml(purchase.product_id)}">
                        <i class="fas fa-book-reader"></i> Continue Studying
                    </button>
                    <button class="btn-download-secondary download-btn" data-download="${escapeHtml(purchase.product_id)}">
                        <i class="fas fa-download"></i> PDF
                    </button>
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
    // Update last studied timestamp
    try {
        const lastStudied = JSON.parse(localStorage.getItem('guideLastStudied') || '{}');
        lastStudied[productId] = new Date().toISOString();
        localStorage.setItem('guideLastStudied', JSON.stringify(lastStudied));
    } catch (e) {
        console.error('Error saving last studied:', e);
    }

    // Check if HTML guide exists for this product
    // HTML guides are in /guides/{product-id}.html format
    const htmlGuides = ['heart-failure', 'assessment-skills', 'myocardial-infarction']; // Add more as they're created

    if (htmlGuides.includes(productId)) {
        // Navigate to the standalone HTML guide
        window.location.href = `guides/${productId}.html`;
    } else {
        // Fall back to markdown guide viewer
        window.location.href = `guide.html?id=${productId}`;
    }
}

// Download a guide by getting a secure download link
// Tracks download event for refund policy enforcement
async function downloadGuide(productId, button, source = 'dashboard') {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';

    // HTML guides that use server-side PDF generation
    const htmlGuides = ['heart-failure', 'assessment-skills', 'myocardial-infarction'];

    try {
        // Track the download event first
        await trackDownload(productId, source);

        if (htmlGuides.includes(productId)) {
            // For HTML guides, use the server-side PDF generation endpoint
            // This generates a clean PDF without browser headers/footers
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Please log in to download guides');
            }

            // Fetch the PDF from the backend (uses API_URL from api-service.js)
            const response = await fetch(`${API_URL}/api/guides/${productId}/pdf`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to generate PDF');
            }

            // Get the PDF blob and download it
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link to trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = `TNC-${productId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, '-')}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
            }, 2000);
        } else {
            // For other guides, use the backend download endpoint
            const data = await apiCall(`/cart/downloads/${productId}`, { method: 'GET' });

            if (data.download_url) {
                // Open download in new tab
                window.open(data.download_url, '_blank');
                button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                }, 2000);
            } else {
                throw new Error('Download not available');
            }
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
        await apiCall('/cart/downloads/track', {
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

// ==================== Claim Order Functions ====================

// Check if user arrived with an order to claim (from success page redirect)
async function checkForOrderClaim() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('order');

    if (orderNumber) {
        console.log('Found order to claim from URL:', orderNumber);

        // Pre-fill the claim input
        const input = document.getElementById('claim-order-input');
        if (input) {
            // Extract just the code portion (remove TNC- prefix if present)
            let orderCode = orderNumber.toUpperCase();
            if (orderCode.startsWith('TNC-')) {
                orderCode = orderCode.substring(4);
            }
            input.value = orderCode;

            // Scroll to claim section
            const claimSection = document.querySelector('.claim-order-section');
            if (claimSection) {
                claimSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Auto-claim the order
            setTimeout(async () => {
                await claimOrder();

                // Clear the URL parameter after claiming
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }, 500);
        }
    }
}

// Claim order functionality
async function claimOrder() {
    const input = document.getElementById('claim-order-input');
    const button = document.getElementById('claim-order-btn');
    const messageDiv = document.getElementById('claim-message');

    // Get the order number and validate
    let orderCode = input.value.trim().toUpperCase();

    // Remove TNC- prefix if user entered it
    if (orderCode.startsWith('TNC-')) {
        orderCode = orderCode.substring(4);
    }

    // Validate format (6 alphanumeric characters)
    if (!orderCode || orderCode.length !== 6 || !/^[A-Z0-9]+$/.test(orderCode)) {
        showClaimMessage('Please enter a valid 6-character order code (e.g., 123456).', 'error');
        return;
    }

    const fullOrderNumber = `TNC-${orderCode}`;

    // Disable button and show loading
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Claiming...';

    try {
        const response = await apiCall('/cart/orders/claim', {
            method: 'POST',
            body: JSON.stringify({ order_number: fullOrderNumber })
        });

        if (response.success) {
            // Success
            showClaimMessage(`Order ${fullOrderNumber} claimed successfully! ${response.products_added.length} product(s) added to your account.`, 'success');
            input.value = '';

            // Refresh the guides list and purchase history
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            await loadAccessibleGuides(user);
            await loadPurchaseHistory();
        } else {
            // Handle specific error types
            let message = response.message || 'Failed to claim order.';
            showClaimMessage(message, 'error');
        }
    } catch (error) {
        console.error('Claim order error:', error);
        // Map error codes to friendly messages
        const errorMessages = {
            'already_yours': 'This order is already linked to your account. Your guides should appear above!',
            'order_not_found': 'Order not found. Please check the order number and try again.',
            'already_claimed': 'This order has already been claimed by another account.',
            'invalid_order': 'Invalid order number format.'
        };
        let message = errorMessages[error.message] || error.message || 'Failed to claim order. Please try again.';
        showClaimMessage(message, 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

// Show claim message
function showClaimMessage(message, type) {
    const messageDiv = document.getElementById('claim-message');
    if (!messageDiv) return;

    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${escapeHtml(message)}</span>
    `;
    messageDiv.className = `claim-message ${type}`;
    messageDiv.style.display = 'flex';

    // Auto-hide after 5 seconds for success, keep error visible longer
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Handle Enter key on claim input
document.addEventListener('DOMContentLoaded', function() {
    const claimInput = document.getElementById('claim-order-input');
    if (claimInput) {
        claimInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                claimOrder();
            }
        });

        // Auto-uppercase as user types
        claimInput.addEventListener('input', function(e) {
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        });
    }
});

// ==================== Purchase History Functions ====================

// Purchase history state
let allOrders = [];
let filteredOrders = [];
let currentPage = 1;
const ordersPerPage = 5;

// Load purchase history
async function loadPurchaseHistory() {
    const historyList = document.getElementById('purchase-history-list');
    const summaryEl = document.getElementById('purchase-history-summary');
    if (!historyList) return;

    try {
        const response = await apiCall('/cart/orders', { method: 'GET' });
        const orders = response.orders || [];

        // Remove skeleton
        const skeleton = historyList.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        // Filter to completed orders and store
        allOrders = orders.filter(o => o.status === 'completed');
        filteredOrders = [...allOrders];
        currentPage = 1;

        // Setup event listeners for filters
        setupPurchaseHistoryFilters();

        // Render the orders
        renderPurchaseHistory();

    } catch (error) {
        console.error('Error loading purchase history:', error);
        const skeleton = historyList.querySelector('.skeleton-loader');
        if (skeleton) skeleton.remove();

        historyList.innerHTML = `
            <div class="purchase-history-empty">
                <i class="fas fa-exclamation-circle" style="color: var(--error-color);"></i>
                <h4>Unable to Load History</h4>
                <p>There was an error loading your purchase history.</p>
                <button class="btn btn-secondary" onclick="loadPurchaseHistory()">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
        if (summaryEl) summaryEl.innerHTML = '<span>Error loading orders</span>';
    }
}

// Setup filter event listeners
function setupPurchaseHistoryFilters() {
    const searchInput = document.getElementById('purchase-search-input');
    const dateFilter = document.getElementById('purchase-date-filter');
    const prevBtn = document.getElementById('purchase-prev-btn');
    const nextBtn = document.getElementById('purchase-next-btn');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            applyPurchaseFilters();
        }, 300));
    }

    if (dateFilter) {
        dateFilter.addEventListener('change', applyPurchaseFilters);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPurchaseHistory();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderPurchaseHistory();
            }
        });
    }
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply filters to orders
function applyPurchaseFilters() {
    const searchInput = document.getElementById('purchase-search-input');
    const dateFilter = document.getElementById('purchase-date-filter');

    const searchTerm = (searchInput?.value || '').toLowerCase().trim();
    const dateRange = dateFilter?.value || 'all';

    filteredOrders = allOrders.filter(order => {
        // Filter out orders that only contain revoked items
        const activeItems = (order.items || []).filter(item => item.is_active !== false);
        if (activeItems.length === 0) return false;

        // Search filter - check order number and active item names only
        if (searchTerm) {
            const orderNumberMatch = order.order_number.toLowerCase().includes(searchTerm);
            const itemMatch = activeItems.some(item =>
                item.product_name.toLowerCase().includes(searchTerm)
            );
            if (!orderNumberMatch && !itemMatch) return false;
        }

        // Date filter
        if (dateRange !== 'all') {
            const days = parseInt(dateRange);
            const orderDate = new Date(order.created_at);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            if (orderDate < cutoffDate) return false;
        }

        return true;
    });

    currentPage = 1;
    renderPurchaseHistory();
}

// Render purchase history with pagination
function renderPurchaseHistory() {
    const historyList = document.getElementById('purchase-history-list');
    const summaryEl = document.getElementById('purchase-history-summary');
    const paginationEl = document.getElementById('purchase-pagination');
    const pageInfoEl = document.getElementById('purchase-page-info');
    const prevBtn = document.getElementById('purchase-prev-btn');
    const nextBtn = document.getElementById('purchase-next-btn');

    if (!historyList) return;

    // Update summary
    if (summaryEl) {
        const total = allOrders.length;
        const showing = filteredOrders.length;
        if (total === 0) {
            summaryEl.innerHTML = '<span>No orders found</span>';
        } else if (showing === total) {
            summaryEl.innerHTML = `<span><strong>${total}</strong> order${total !== 1 ? 's' : ''}</span>`;
        } else {
            summaryEl.innerHTML = `<span>Showing <strong>${showing}</strong> of <strong>${total}</strong> orders</span>`;
        }
    }

    // Handle empty state
    if (filteredOrders.length === 0) {
        if (allOrders.length === 0) {
            historyList.innerHTML = `
                <div class="purchase-history-empty">
                    <i class="fas fa-receipt"></i>
                    <h4>No Purchase History</h4>
                    <p>You haven't made any purchases yet.</p>
                    <button class="btn btn-secondary" onclick="window.location.href='store.html'">
                        <i class="fas fa-store"></i> Browse Store
                    </button>
                </div>
            `;
        } else {
            historyList.innerHTML = `
                <div class="purchase-history-empty">
                    <i class="fas fa-search"></i>
                    <h4>No Matching Orders</h4>
                    <p>Try adjusting your search or filters.</p>
                </div>
            `;
        }
        if (paginationEl) paginationEl.style.display = 'none';
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = Math.min(startIndex + ordersPerPage, filteredOrders.length);
    const pageOrders = filteredOrders.slice(startIndex, endIndex);

    // Render orders
    historyList.innerHTML = pageOrders.map(order => {
        // Filter out revoked items - only show active items
        const activeItems = (order.items || []).filter(item => item.is_active !== false);

        const itemsHtml = activeItems.map(item => {
            return `
                <div class="purchase-item-row">
                    <span class="purchase-item-name">${escapeHtml(item.product_name)}</span>
                    <span class="purchase-item-price">$${parseFloat(item.price).toFixed(2)}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="purchase-history-item">
                <div class="purchase-header">
                    <span class="purchase-order-number">Order #${escapeHtml(order.order_number)}</span>
                    <div class="purchase-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(order.created_at)}</span>
                        <span><i class="fas fa-dollar-sign"></i> $${parseFloat(order.total).toFixed(2)}</span>
                    </div>
                </div>
                <div class="purchase-items">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }).join('');

    // Update pagination
    if (paginationEl) {
        if (totalPages > 1) {
            paginationEl.style.display = 'flex';
            if (pageInfoEl) pageInfoEl.textContent = `Page ${currentPage} of ${totalPages}`;
            if (prevBtn) prevBtn.disabled = currentPage === 1;
            if (nextBtn) nextBtn.disabled = currentPage === totalPages;
        } else {
            paginationEl.style.display = 'none';
        }
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

    // Claim order button
    const claimOrderBtn = document.getElementById('claim-order-btn');
    if (claimOrderBtn) {
        claimOrderBtn.addEventListener('click', claimOrder);
    }

    // Close admin modal button
    const closeAdminModalBtn = document.getElementById('close-admin-modal-btn');
    if (closeAdminModalBtn) {
        closeAdminModalBtn.addEventListener('click', closeAdminModal);
    }
});
