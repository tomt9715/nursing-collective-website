// Settings Page JavaScript
// Profile management, password change, and OAuth connections
// Note: API service layer is now in api-service.js

// Check authentication (uses api-service.js functions)
requireAuth();

document.addEventListener('DOMContentLoaded', async function() {

    // Load user profile
    await loadUserProfile();

    // Load notification preferences
    await loadNotificationPreferences();

    // Setup notification preference toggles
    setupNotificationToggles();

    // Setup delete account handlers
    setupDeleteAccount();

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

    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Password form submission
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);

        // Add password strength indicator
        const newPasswordInput = document.getElementById('new-password');
        const confirmPasswordInput = document.getElementById('confirm-new-password');

        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value, 'settings-password-strength');
            });
        }

        // Add password match indicator
        if (confirmPasswordInput && newPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                checkPasswordMatch(newPasswordInput.value, this.value, 'settings-password-match');
            });
            newPasswordInput.addEventListener('input', function() {
                if (confirmPasswordInput.value) {
                    checkPasswordMatch(this.value, confirmPasswordInput.value, 'settings-password-match');
                }
            });
        }
    }
});

// Load user profile and populate form
async function loadUserProfile() {
    try {
        // Use apiCall for automatic token refresh
        const data = await apiCall('/user/profile', {
            method: 'GET'
        });

        const user = data.user;

        // Populate profile form
        document.getElementById('first-name').value = user.first_name || '';
        document.getElementById('last-name').value = user.last_name || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('nursing-program').value = user.nursing_program || '';

        // Update user avatar with initials
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && user.first_name) {
            userAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${user.first_name.charAt(0)}</span>`;
        }

        // Update OAuth connection status
        updateOAuthStatus(user);

        // Update local storage
        localStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
        console.error('Error loading profile:', error);
        showAlert('Profile Load Failed', 'Failed to load your profile. Please try logging in again.', 'error');
    }
}

// Update OAuth connection status
function updateOAuthStatus(user) {
    // Discord
    const discordStatus = document.getElementById('discord-connection-status');
    const discordBtn = document.getElementById('discord-connect-btn');
    if (user.has_discord) {
        discordStatus.textContent = 'Connected';
        discordStatus.style.color = '#10b981';
        discordBtn.innerHTML = '<i class="fas fa-unlink"></i> Disconnect';
        discordBtn.onclick = () => showAlert('Coming Soon', 'Disconnect feature will be available soon!', 'info');
    } else {
        discordBtn.onclick = () => connectOAuthProvider('discord');
    }

    // Google
    const googleStatus = document.getElementById('google-connection-status');
    const googleBtn = document.getElementById('google-connect-btn');
    if (user.has_google) {
        googleStatus.textContent = 'Connected';
        googleStatus.style.color = '#10b981';
        googleBtn.innerHTML = '<i class="fas fa-unlink"></i> Disconnect';
        googleBtn.onclick = () => showAlert('Coming Soon', 'Disconnect feature will be available soon!', 'info');
    } else {
        googleBtn.onclick = () => connectOAuthProvider('google');
    }
}

// Connect OAuth provider
async function connectOAuthProvider(provider) {
    try {
        const response = await fetch(`${API_URL}/auth/oauth/${provider}`, {
            method: 'GET',
            
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok || !data.authorization_url) {
            throw new Error(`Failed to get ${provider} authorization URL`);
        }

        // Store current page to return after OAuth
        localStorage.setItem('oauth_return_page', 'settings.html');

        // Redirect to OAuth provider
        window.location.href = data.authorization_url;

    } catch (error) {
        console.error(`Error connecting ${provider}:`, error);
        showAlert('Connection Failed', `Failed to connect ${provider}. Please try again.`, 'error');
    }
}

// Handle profile update
async function handleProfileUpdate(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    try {
        // Use apiCall for automatic token refresh
        const data = await apiCall('/user/profile', {
            method: 'PUT',
            body: JSON.stringify({
                first_name: document.getElementById('first-name').value,
                last_name: document.getElementById('last-name').value,
                nursing_program: document.getElementById('nursing-program').value
            })
        });

        // Update local storage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Show success message
        showSuccess('Profile updated successfully!');

        // Update avatar if name changed
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && data.user.first_name) {
            userAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${data.user.first_name.charAt(0)}</span>`;
        }

    } catch (error) {
        console.error('Error updating profile:', error);
        showAlert('Update Failed', error.message || 'Failed to update profile. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    }
}

// Handle password change
async function handlePasswordChange(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;

    // Validate passwords match
    if (newPassword !== confirmPassword) {
        showAlert('Password Mismatch', 'New passwords do not match!', 'warning');
        return;
    }

    // Validate password length
    if (newPassword.length < 8) {
        showAlert('Weak Password', 'Password must be at least 8 characters long!', 'warning');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

    try {
        // Use apiCall for automatic token refresh
        await apiCall('/user/change-password', {
            method: 'POST',
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        });

        // Show success message
        showSuccess('Password updated successfully!');

        // Clear form
        document.getElementById('password-form').reset();

    } catch (error) {
        console.error('Error updating password:', error);
        showAlert('Update Failed', error.message || 'Failed to update password. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-key"></i> Update Password';
    }
}

// Password strength checker
function updatePasswordStrength(password, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const strengthBar = container.querySelector('.strength-bar');
    const strengthText = container.querySelector('.strength-text');

    if (!password) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return;
    }

    let strength = 0;
    let label = '';
    let color = '';

    // Check password criteria
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    // Determine strength level
    if (strength <= 1) {
        label = 'Weak';
        color = '#ef4444';
    } else if (strength === 2) {
        label = 'Fair';
        color = '#f59e0b';
    } else if (strength === 3) {
        label = 'Good';
        color = '#3b82f6';
    } else if (strength === 4) {
        label = 'Strong';
        color = '#10b981';
    } else {
        label = 'Very Strong';
        color = '#059669';
    }

    const width = (strength / 5) * 100;
    strengthBar.style.width = width + '%';
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = label;
    strengthText.style.color = color;
}

// Check if passwords match
function checkPasswordMatch(password1, password2, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!password2) {
        container.textContent = '';
        return;
    }

    if (password1 === password2) {
        container.textContent = '✓ Passwords match';
        container.style.color = '#10b981';
    } else {
        container.textContent = '✗ Passwords do not match';
        container.style.color = '#ef4444';
    }
}

// Load notification preferences from server
async function loadNotificationPreferences() {
    try {
        const data = await apiCall('/user/notification-preferences', {
            method: 'GET'
        });

        const prefs = data.notification_preferences;

        // Update toggle states
        const newGuidesToggle = document.getElementById('pref-new-guides');
        const promotionsToggle = document.getElementById('pref-promotions');
        const marketingToggle = document.getElementById('pref-marketing');

        if (newGuidesToggle) newGuidesToggle.checked = prefs.new_guides !== false;
        if (promotionsToggle) promotionsToggle.checked = prefs.promotions !== false;
        if (marketingToggle) marketingToggle.checked = prefs.marketing !== false;

    } catch (error) {
        console.error('Error loading notification preferences:', error);
    }
}

// Setup notification preference toggle handlers
function setupNotificationToggles() {
    const toggleIds = ['pref-new-guides', 'pref-promotions', 'pref-marketing'];

    toggleIds.forEach(id => {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.addEventListener('change', handleNotificationToggle);
        }
    });
}

// Handle notification toggle change
async function handleNotificationToggle() {
    const statusEl = document.getElementById('notification-save-status');

    // Show saving status
    if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.textContent = 'Saving...';
        statusEl.style.color = 'var(--text-secondary)';
    }

    try {
        const prefs = {
            new_guides: document.getElementById('pref-new-guides')?.checked ?? true,
            promotions: document.getElementById('pref-promotions')?.checked ?? true,
            marketing: document.getElementById('pref-marketing')?.checked ?? true
        };

        await apiCall('/user/notification-preferences', {
            method: 'PUT',
            body: JSON.stringify(prefs)
        });

        // Show success
        if (statusEl) {
            statusEl.textContent = '✓ Preferences saved';
            statusEl.style.color = '#10b981';
            setTimeout(() => {
                statusEl.style.display = 'none';
            }, 2000);
        }

    } catch (error) {
        console.error('Error saving notification preferences:', error);

        // Show error
        if (statusEl) {
            statusEl.textContent = '✗ Failed to save preferences';
            statusEl.style.color = '#ef4444';
        }
    }
}

// Setup delete account handlers
function setupDeleteAccount() {
    const deleteBtn = document.getElementById('delete-account-btn');
    const modal = document.getElementById('delete-account-modal');
    const step1 = document.getElementById('delete-step-1');
    const step2 = document.getElementById('delete-step-2');
    const cancelBtn = document.getElementById('cancel-delete-btn');
    const continueBtn = document.getElementById('continue-delete-btn');
    const backBtn = document.getElementById('back-delete-btn');
    const confirmBtn = document.getElementById('confirm-delete-btn');
    const passwordInput = document.getElementById('delete-confirm-password');
    const confirmTextInput = document.getElementById('delete-confirm-text');
    const errorDiv = document.getElementById('delete-error');

    if (!deleteBtn || !modal) return;

    // Open modal
    deleteBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        step1.style.display = 'block';
        step2.style.display = 'none';
        resetDeleteForm();
    });

    // Cancel - close modal
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetDeleteForm();
    });

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            resetDeleteForm();
        }
    });

    // Continue to step 2
    continueBtn.addEventListener('click', () => {
        step1.style.display = 'none';
        step2.style.display = 'block';
    });

    // Back to step 1
    backBtn.addEventListener('click', () => {
        step1.style.display = 'block';
        step2.style.display = 'none';
        resetDeleteForm();
    });

    // Enable/disable confirm button based on input
    function checkConfirmEnabled() {
        const passwordFilled = passwordInput.value.length > 0;
        const textCorrect = confirmTextInput.value.toUpperCase() === 'DELETE';
        confirmBtn.disabled = !(passwordFilled && textCorrect);
    }

    passwordInput.addEventListener('input', checkConfirmEnabled);
    confirmTextInput.addEventListener('input', checkConfirmEnabled);

    // Final delete confirmation
    confirmBtn.addEventListener('click', handleDeleteAccount);

    function resetDeleteForm() {
        if (passwordInput) passwordInput.value = '';
        if (confirmTextInput) confirmTextInput.value = '';
        if (errorDiv) {
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';
        }
        if (confirmBtn) confirmBtn.disabled = true;
    }
}

// Handle account deletion
async function handleDeleteAccount() {
    const confirmBtn = document.getElementById('confirm-delete-btn');
    const passwordInput = document.getElementById('delete-confirm-password');
    const errorDiv = document.getElementById('delete-error');
    const modal = document.getElementById('delete-account-modal');

    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
    confirmBtn.disabled = true;

    try {
        await apiCall('/user/account', {
            method: 'DELETE',
            body: JSON.stringify({
                password: passwordInput.value
            })
        });

        // Clear local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenTimestamp');

        // Show success and redirect
        modal.style.display = 'none';
        showAlert('Account Deleted', 'Your account has been permanently deleted. You will be redirected to the homepage.', 'info');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error('Error deleting account:', error);
        errorDiv.textContent = error.message || 'Failed to delete account. Please check your password and try again.';
        errorDiv.style.display = 'block';
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
    }
}
