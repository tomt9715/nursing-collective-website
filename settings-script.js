// Settings Page JavaScript
// Profile management, password change, and OAuth connections
// Note: API service layer is now in api-service.js

// Check authentication (uses api-service.js functions)
// requireAuth() now returns a promise that resolves after token refresh if needed
const authReady = requireAuth();

document.addEventListener('DOMContentLoaded', async function() {

    // Wait for auth check (including silent token refresh) before loading data
    const isValid = await authReady;
    if (isValid === false) return; // Redirect already in progress

    // Load user profile
    await loadUserProfile();

    // Load notification preferences
    await loadNotificationPreferences();

    // Setup notification preference toggles
    setupNotificationToggles();

    // Load membership section
    loadMembership();

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

        // Initialize profile picture picker
        initProfilePicture(user);

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

        // Update hero name
        var heroName = document.getElementById('settings-hero-name');
        if (heroName) {
            var displayName = '';
            if (data.user.first_name) displayName = data.user.first_name;
            if (data.user.last_name) displayName += ' ' + data.user.last_name;
            heroName.textContent = displayName.trim() || 'Your Name';
        }

        // Show success message
        showSuccess('Profile updated successfully!');

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

// ── Profile Picture ─────────────────────────────

const DEFAULT_ICONS = [
    'astronaut.png', 'cake.png', 'devil.png', 'doctor-female.png',
    'doctor-male.png', 'frog.png', 'gnome.png', 'goblin.png',
    'jester.png', 'man-3.png', 'monster-2.png', 'monster-3.png',
    'monster.png', 'octopus.png', 'ogre.png', 'pirate.png',
    'robot.png', 'wizard.png', 'woman-5.png'
];

let currentProfilePicture = 'robot.png';

function initProfilePicture(user) {
    currentProfilePicture = user.profile_picture || 'robot.png';
    updateProfilePicPreview(currentProfilePicture);
    populateIconGrid();
    setupProfilePicListeners();

    // Populate hero name + email
    var heroName = document.getElementById('settings-hero-name');
    var heroEmail = document.getElementById('settings-hero-email');
    if (heroName) {
        var displayName = '';
        if (user.first_name) displayName = user.first_name;
        if (user.last_name) displayName += ' ' + user.last_name;
        displayName = displayName.trim();
        heroName.textContent = displayName || 'Your Name';
    }
    if (heroEmail) {
        heroEmail.textContent = user.email || '';
    }
}

function updateProfilePicPreview(value) {
    var img = document.getElementById('current-profile-img');
    if (img) {
        img.src = getProfilePictureUrl(value);
    }
}

function populateIconGrid() {
    var grid = document.getElementById('icon-picker-grid');
    if (!grid) return;

    grid.innerHTML = '';
    DEFAULT_ICONS.forEach(function(icon) {
        var div = document.createElement('div');
        div.className = 'icon-picker-option' + (icon === currentProfilePicture ? ' selected' : '');
        div.setAttribute('data-icon', icon);

        var img = document.createElement('img');
        img.src = 'assets/images/default-profile/' + icon;
        img.alt = icon.replace('.png', '').replace(/-/g, ' ');
        img.loading = 'lazy';

        div.appendChild(img);
        div.addEventListener('click', function() {
            selectIcon(icon);
        });
        grid.appendChild(div);
    });
}

async function selectIcon(iconFilename) {
    // Highlight selection in grid
    document.querySelectorAll('.icon-picker-option').forEach(function(el) {
        el.classList.toggle('selected', el.getAttribute('data-icon') === iconFilename);
    });

    // Save to backend
    try {
        await apiCall('/user/profile', {
            method: 'PUT',
            body: JSON.stringify({ profile_picture: iconFilename })
        });

        currentProfilePicture = iconFilename;
        updateProfilePicPreview(iconFilename);

        // Update localStorage so nav avatar updates immediately
        var userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.profile_picture = iconFilename;
        localStorage.setItem('user', JSON.stringify(userData));

        // Update nav avatar immediately
        var userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && typeof renderProfilePicture === 'function') {
            userAvatar.innerHTML = renderProfilePicture(iconFilename, 'sm', userData.first_name || '');
        }
        var userAvatarLarge = document.querySelector('.user-avatar-large');
        if (userAvatarLarge && typeof renderProfilePicture === 'function') {
            userAvatarLarge.innerHTML = renderProfilePicture(iconFilename, 'lg', userData.first_name || '');
        }

        // Close modal
        document.getElementById('icon-picker-overlay').style.display = 'none';

        showAlert('Profile Picture Updated', 'Your icon has been changed!', 'success');
    } catch (error) {
        console.error('Failed to update profile picture:', error);
        showAlert('Update Failed', 'Could not update your profile picture. Please try again.', 'error');
    }
}

// ── Crop Modal State ─────────────────────────────
var _cropper = null;

function handleProfilePicUpload(file) {
    if (!file) return;

    // Client-side validation
    var allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (allowedTypes.indexOf(file.type) === -1) {
        showAlert('Invalid File', 'Please upload a PNG, JPG, or WEBP image.', 'error');
        return;
    }
    if (file.size > 20 * 1024 * 1024) {
        showAlert('File Too Large', 'Please upload an image under 20MB.', 'error');
        return;
    }

    // Read file and open crop modal
    var reader = new FileReader();
    reader.onload = function(e) {
        openCropModal(e.target.result);
    };
    reader.readAsDataURL(file);
}

function openCropModal(imageSrc) {
    var overlay = document.getElementById('crop-modal-overlay');
    var cropImage = document.getElementById('crop-image');
    if (!overlay || !cropImage) return;

    // Destroy previous cropper if any
    if (_cropper) {
        _cropper.destroy();
        _cropper = null;
    }

    cropImage.src = imageSrc;
    overlay.style.display = 'flex';

    // Initialize Cropper.js after image loads
    cropImage.onload = function() {
        _cropper = new Cropper(cropImage, {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: 'move',
            cropBoxResizable: true,
            cropBoxMovable: true,
            guides: false,
            center: true,
            highlight: false,
            background: false,
            autoCropArea: 0.85,
            responsive: true
        });
    };
}

function closeCropModal() {
    var overlay = document.getElementById('crop-modal-overlay');
    if (overlay) overlay.style.display = 'none';
    if (_cropper) {
        _cropper.destroy();
        _cropper = null;
    }
}

async function saveCroppedImage() {
    if (!_cropper) return;

    var saveBtn = document.getElementById('crop-save-btn');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    }

    try {
        // Get cropped canvas at 256x256
        var canvas = _cropper.getCroppedCanvas({
            width: 256,
            height: 256,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });

        if (!canvas) {
            throw new Error('Could not generate cropped image');
        }

        // Convert canvas to blob
        var blob = await new Promise(function(resolve, reject) {
            canvas.toBlob(function(b) {
                if (b) resolve(b);
                else reject(new Error('Canvas to blob failed'));
            }, 'image/webp', 0.9);
        });

        // Upload the cropped blob
        var formData = new FormData();
        formData.append('profile_picture', blob, 'profile.webp');

        var token = localStorage.getItem('accessToken');
        var response = await fetch(API_URL + '/user/profile-picture/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        });

        if (!response.ok) {
            var errData = await response.json();
            throw new Error(errData.error || 'Upload failed');
        }

        var result = await response.json();

        currentProfilePicture = result.profile_picture;
        updateProfilePicPreview(result.profile_picture);

        // Update localStorage
        var userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.profile_picture = result.profile_picture;
        localStorage.setItem('user', JSON.stringify(userData));

        // Update nav avatars
        var userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && typeof renderProfilePicture === 'function') {
            userAvatar.innerHTML = renderProfilePicture(result.profile_picture, 'sm', userData.first_name || '');
        }
        var userAvatarLarge = document.querySelector('.user-avatar-large');
        if (userAvatarLarge && typeof renderProfilePicture === 'function') {
            userAvatarLarge.innerHTML = renderProfilePicture(result.profile_picture, 'lg', userData.first_name || '');
        }

        closeCropModal();
        showAlert('Photo Uploaded', 'Your profile picture has been updated!', 'success');
    } catch (error) {
        console.error('Failed to upload profile picture:', error);
        showAlert('Upload Failed', error.message || 'Could not upload your photo. Please try again.', 'error');
    } finally {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Save';
        }
    }
}

function setupProfilePicListeners() {
    // Click on hero avatar → open profile picture picker modal
    var avatarWrapper = document.getElementById('settings-avatar-wrapper');
    if (avatarWrapper) {
        avatarWrapper.addEventListener('click', function() {
            document.getElementById('icon-picker-overlay').style.display = 'flex';
        });
        avatarWrapper.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById('icon-picker-overlay').style.display = 'flex';
            }
        });
    }

    // Close icon picker modal
    var closeBtn = document.getElementById('icon-picker-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('icon-picker-overlay').style.display = 'none';
        });
    }

    // Click outside modal to close
    var overlay = document.getElementById('icon-picker-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    // "Upload Your Own Photo" button (inside the picker modal) → trigger file input
    var uploadBtn = document.getElementById('upload-photo-btn');
    var fileInput = document.getElementById('profile-pic-upload');
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', function() {
            fileInput.click();
        });
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                // Close icon picker before opening crop modal
                var iconOverlay = document.getElementById('icon-picker-overlay');
                if (iconOverlay) iconOverlay.style.display = 'none';
                handleProfilePicUpload(this.files[0]);
                this.value = ''; // Reset so same file can be re-selected
            }
        });
    }

    // Crop modal — Save button
    var cropSaveBtn = document.getElementById('crop-save-btn');
    if (cropSaveBtn) {
        cropSaveBtn.addEventListener('click', function() {
            saveCroppedImage();
        });
    }

    // Crop modal — Cancel / Close buttons
    var cropCancelBtn = document.getElementById('crop-cancel-btn');
    var cropCloseBtn = document.getElementById('crop-close-btn');
    var cropOverlay = document.getElementById('crop-modal-overlay');

    if (cropCancelBtn) {
        cropCancelBtn.addEventListener('click', function() {
            closeCropModal();
        });
    }
    if (cropCloseBtn) {
        cropCloseBtn.addEventListener('click', function() {
            closeCropModal();
        });
    }
    // Click outside crop modal to close
    if (cropOverlay) {
        cropOverlay.addEventListener('click', function(e) {
            if (e.target === cropOverlay) {
                closeCropModal();
            }
        });
    }
}

// ══════════════════════════════════════════════
// MEMBERSHIP SECTION
// ══════════════════════════════════════════════

async function loadMembership() {
    var subPromise = apiCall('/api/subscription-status').catch(function(err) {
        console.warn('Failed to load subscription status:', err);
        return null;
    });
    var billingPromise = apiCall('/api/billing-history').catch(function(err) {
        console.warn('Failed to load billing history:', err);
        return null;
    });

    var results = await Promise.all([subPromise, billingPromise]);
    renderSubscriptionCard(results[0]);
    renderBillingHistory(results[1]);
}

function renderSubscriptionCard(data) {
    var loadingEl = document.getElementById('membership-loading');
    var noneEl = document.getElementById('membership-none');
    var activeEl = document.getElementById('membership-active');
    var creditsCard = document.getElementById('membership-credits-card');

    if (loadingEl) loadingEl.style.display = 'none';

    if (!data || !data.has_access || !data.subscription) {
        if (noneEl) noneEl.classList.remove('hidden');
        return;
    }

    var sub = data.subscription;
    if (activeEl) activeEl.classList.remove('hidden');

    // Plan name
    var planLabel = document.getElementById('membership-plan-label');
    if (planLabel) {
        var planNames = {
            'monthly-access': 'Monthly Access',
            'semester-access': 'Semester Access',
            'lifetime-access': 'Lifetime Access',
            'ai-monthly-access': 'AI-Powered Monthly',
            'ai-semester-access': 'AI-Powered Semester',
            'ai-lifetime-access': 'AI-Powered Lifetime'
        };
        planLabel.textContent = planNames[sub.plan_id] || sub.plan_name || sub.plan_id || 'Active Plan';
    }

    // Status badge
    var badge = document.getElementById('membership-status-badge');
    if (badge) {
        if (sub.cancel_at_period_end) {
            badge.className = 'sub-status-badge cancelling';
            badge.innerHTML = '<i class="fas fa-clock"></i> Cancelling';
        } else if (sub.status === 'expired') {
            badge.className = 'sub-status-badge expired';
            badge.innerHTML = '<i class="fas fa-times-circle"></i> Expired';
        } else if (sub.status === 'past_due') {
            badge.className = 'sub-status-badge expired';
            badge.innerHTML = '<i class="fas fa-exclamation-circle"></i> Past Due';
        } else {
            badge.className = 'sub-status-badge active';
            badge.innerHTML = '<i class="fas fa-check-circle"></i> Active';
        }
    }

    // Tier badge
    var tierBadge = document.getElementById('membership-tier-badge');
    if (tierBadge) {
        var isAi = sub.is_ai_plan || (sub.plan_id && sub.plan_id.startsWith('ai-'));
        if (isAi) {
            tierBadge.className = 'membership-plan-tier ai-powered';
            tierBadge.innerHTML = '<i class="fas fa-bolt"></i> AI-Powered';
        } else {
            tierBadge.className = 'membership-plan-tier standard';
            tierBadge.innerHTML = '<i class="fas fa-book-open"></i> Standard';
        }
    }

    // Start date
    var startEl = document.getElementById('membership-start-date');
    if (startEl && sub.starts_at) {
        startEl.textContent = membershipFormatDate(sub.starts_at);
    }

    // Renewal / Expiry
    var renewalLabel = document.getElementById('membership-renewal-label');
    var renewalDate = document.getElementById('membership-renewal-date');
    if (renewalLabel && renewalDate) {
        var isLifetime = sub.plan_id && sub.plan_id.includes('lifetime');
        if (isLifetime || sub.expires_at === null) {
            renewalLabel.textContent = 'Access';
            renewalDate.innerHTML = '<span style="color:#16a34a;font-weight:700;">Lifetime — Never Expires</span>';
        } else if (sub.cancel_at_period_end) {
            renewalLabel.textContent = 'Access Until';
            renewalDate.innerHTML = '<span style="color:#d97706;">' + membershipFormatDate(sub.expires_at) + '</span>';
        } else {
            var isMonthly = sub.plan_id && sub.plan_id.includes('monthly');
            renewalLabel.textContent = isMonthly ? 'Renews' : 'Expires';
            renewalDate.textContent = membershipFormatDate(sub.expires_at);
        }
    }

    // Upgrade prompt
    var upgradePrompt = document.getElementById('membership-upgrade-prompt');
    var isAiPlan = sub.is_ai_plan || (sub.plan_id && sub.plan_id.startsWith('ai-'));
    if (upgradePrompt) {
        if (isAiPlan) {
            upgradePrompt.classList.add('hidden');
        } else {
            upgradePrompt.classList.remove('hidden');
        }
    }

    // Upgrade button
    var upgradeBtn = document.getElementById('membership-upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', handleMembershipUpgrade);
    }

    // Change Plan button
    var changePlanBtn = document.getElementById('membership-change-plan-btn');
    if (changePlanBtn) {
        changePlanBtn.addEventListener('click', function() { openChangePlanModal(sub); });
    }

    // Cancel Subscription button
    var cancelBtn = document.getElementById('membership-cancel-btn');
    if (cancelBtn) {
        if (sub.cancel_at_period_end || sub.status === 'cancelled') {
            cancelBtn.style.display = 'none';
        } else {
            cancelBtn.addEventListener('click', function() { openCancelSubModal(sub); });
        }
    }

    // AI Credits
    if (isAiPlan) {
        loadAiCredits(creditsCard);
    }
}

async function loadAiCredits(creditsCard) {
    if (!creditsCard) return;

    try {
        var data = await apiCall('/api/ai/credits');
        if (!data || data.error) return;

        creditsCard.classList.remove('hidden');

        // Uploads
        var uploadsRemaining = data.uploads_remaining || 0;
        var uploadsLimit = data.uploads_limit || 0;
        var addonUploads = data.addon_uploads || 0;
        var totalUploads = uploadsLimit + addonUploads;

        var uploadsCount = document.getElementById('credits-uploads-count');
        if (uploadsCount) uploadsCount.textContent = uploadsRemaining + ' / ' + totalUploads;

        var uploadsBar = document.getElementById('credits-uploads-bar');
        if (uploadsBar && totalUploads > 0) {
            var uploadsPct = (uploadsRemaining / totalUploads) * 100;
            uploadsBar.style.width = uploadsPct + '%';
            uploadsBar.className = 'membership-progress-fill';
            if (uploadsPct <= 0) uploadsBar.classList.add('exhausted');
            else if (uploadsPct <= 20) uploadsBar.classList.add('low');
        }

        // Questions
        var questionsRemaining = data.questions_remaining || 0;
        var questionsLimit = data.questions_limit || 0;
        var addonQuestions = data.addon_questions || 0;
        var totalQuestions = questionsLimit + addonQuestions;

        var questionsCount = document.getElementById('credits-questions-count');
        if (questionsCount) questionsCount.textContent = questionsRemaining + ' / ' + totalQuestions;

        var questionsBar = document.getElementById('credits-questions-bar');
        if (questionsBar && totalQuestions > 0) {
            var questionsPct = (questionsRemaining / totalQuestions) * 100;
            questionsBar.style.width = questionsPct + '%';
            questionsBar.className = 'membership-progress-fill';
            if (questionsPct <= 0) questionsBar.classList.add('exhausted');
            else if (questionsPct <= 20) questionsBar.classList.add('low');
        }

        // Addon info
        var addonInfo = document.getElementById('credits-addon-info');
        var addonText = document.getElementById('credits-addon-text');
        if (addonInfo && addonText && (addonUploads > 0 || addonQuestions > 0)) {
            addonInfo.classList.remove('hidden');
            var parts = [];
            if (addonUploads > 0) parts.push(addonUploads + ' bonus uploads');
            if (addonQuestions > 0) parts.push(addonQuestions + ' bonus questions');
            addonText.textContent = parts.join(', ') + ' (add-on)';
        }

        // Reset date
        var resetValue = document.getElementById('credits-reset-value');
        if (resetValue && data.next_reset) {
            resetValue.textContent = membershipFormatDate(data.next_reset);
        }
    } catch (err) {
        console.warn('Failed to load AI credits:', err);
    }
}

function renderBillingHistory(data) {
    var loadingEl = document.getElementById('billing-loading');
    var emptyEl = document.getElementById('billing-empty');
    var listEl = document.getElementById('billing-list');

    if (loadingEl) loadingEl.style.display = 'none';

    if (!data || !data.invoices || data.invoices.length === 0) {
        if (emptyEl) emptyEl.classList.remove('hidden');
        return;
    }

    if (listEl) listEl.classList.remove('hidden');

    var html = '';
    data.invoices.forEach(function(inv) {
        var date = new Date(inv.created * 1000);
        var dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        var amount = '$' + inv.amount.toFixed(2);
        var desc = inv.description || 'Payment';
        if (desc.length > 50) desc = desc.substring(0, 47) + '...';

        var refundedTag = '';
        if (inv.refunded) {
            refundedTag = '<span class="billing-row-refunded">REFUNDED</span>';
        } else if (inv.amount_refunded > 0) {
            refundedTag = '<span class="billing-row-refunded">Partial refund: -$' + inv.amount_refunded.toFixed(2) + '</span>';
        }

        var receiptLink = '';
        if (inv.receipt_url) {
            receiptLink = '<a href="' + inv.receipt_url + '" target="_blank" rel="noopener" class="billing-receipt-link"><i class="fas fa-external-link-alt"></i> Receipt</a>';
        }

        html += '<div class="billing-row">' +
            '<div class="billing-row-left">' +
                '<span class="billing-row-desc">' + membershipEscapeHtml(desc) + '</span>' +
                '<span class="billing-row-date">' + dateStr + ' ' + refundedTag + '</span>' +
            '</div>' +
            '<div class="billing-row-right">' +
                '<span class="billing-row-amount">' + amount + '</span>' +
                receiptLink +
            '</div>' +
        '</div>';
    });

    listEl.innerHTML = html;
}

function handleMembershipUpgrade() {
    // Open the upgrade confirmation modal instead of directly redirecting
    openUpgradeAiModal();
}

function openUpgradeAiModal() {
    var modal = document.getElementById('upgrade-ai-modal');
    if (!modal) return;

    var summaryEl = document.getElementById('upgrade-ai-summary');
    var confirmBtn = document.getElementById('upgrade-ai-confirm-btn');
    var errorEl = document.getElementById('upgrade-ai-error');
    var closeBtn = document.getElementById('upgrade-ai-close-btn');

    // Reset state
    if (confirmBtn) { confirmBtn.style.display = 'none'; confirmBtn.disabled = false; confirmBtn.innerHTML = '<i class="fas fa-credit-card"></i> Continue to Payment'; }
    if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }
    if (summaryEl) summaryEl.innerHTML = '<div style="text-align:center; padding: 16px; color: var(--text-secondary);"><i class="fas fa-spinner fa-spin"></i> Loading upgrade details...</div>';

    modal.style.display = 'flex';

    // Close handlers
    if (closeBtn) {
        closeBtn.innerHTML = 'Close';
        closeBtn.onclick = function() { modal.style.display = 'none'; };
    }
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };

    // Load AI plan pricing to show in the summary
    loadUpgradeDetails(summaryEl, confirmBtn, modal);
}

async function loadUpgradeDetails(summaryEl, confirmBtn, modal) {
    try {
        var data = await apiCall('/api/subscription-plans');
        var subData = await apiCall('/api/subscription-status');
        if (!data || !data.plans || !subData) throw new Error('Failed to load details');

        var currentPlanId = subData.plan_id || '';
        var currentPlanNames = {
            'monthly-access': 'Monthly Access',
            'semester-access': 'Semester Access',
            'lifetime-access': 'Lifetime Access'
        };
        var aiEquivalent = {
            'monthly-access': 'ai-monthly-access',
            'semester-access': 'ai-semester-access',
            'lifetime-access': 'ai-lifetime-access'
        };

        var currentName = currentPlanNames[currentPlanId] || subData.plan_name || currentPlanId;
        var aiPlanId = aiEquivalent[currentPlanId] || 'ai-semester-access';
        var aiPlan = data.plans[aiPlanId];

        var aiName = aiPlan ? aiPlan.name : 'AI-Powered';
        var aiPrice = aiPlan ? (aiPlan.interval === 'month' ? '$' + aiPlan.price.toFixed(2) + '/mo' :
                      aiPlan.access_days ? '$' + aiPlan.price.toFixed(2) + '/semester' :
                      '$' + aiPlan.price.toFixed(2) + ' once') : '';

        if (summaryEl) {
            summaryEl.innerHTML =
                '<div style="background: var(--surface-color, #f8f9fa); border-radius: 12px; padding: 20px;">' +
                '  <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">' +
                '    <div style="flex:1; text-align:center;">' +
                '      <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); font-weight:600; margin-bottom:4px;">Current Plan</div>' +
                '      <div style="font-weight:600; color:var(--text-primary);">' + currentName + '</div>' +
                '      <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">Standard</div>' +
                '    </div>' +
                '    <div style="color:#7c3aed; font-size:1.2rem;"><i class="fas fa-arrow-right"></i></div>' +
                '    <div style="flex:1; text-align:center;">' +
                '      <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); font-weight:600; margin-bottom:4px;">New Plan</div>' +
                '      <div style="font-weight:600; color:#7c3aed;">' + aiName + '</div>' +
                (aiPrice ? '      <div style="font-size:0.9rem; color:var(--text-secondary); margin-top:2px;">' + aiPrice + '</div>' : '') +
                '    </div>' +
                '  </div>' +
                '  <div style="font-size:0.82rem; color:var(--text-secondary); text-align:center; border-top:1px solid var(--border-color); padding-top:12px;">' +
                '    <i class="fas fa-bolt" style="color:#7c3aed; margin-right:4px;"></i> Includes AI note uploads, NCLEX question generation, and more.' +
                '  </div>' +
                '  <div style="font-size:0.82rem; color:var(--text-secondary); text-align:center; margin-top:8px;">' +
                '    <i class="fas fa-lock" style="margin-right:4px;"></i> You\'ll be redirected to Stripe to confirm payment.' +
                '  </div>' +
                '</div>';
        }

        if (confirmBtn) {
            confirmBtn.style.display = 'inline-flex';
            confirmBtn.onclick = function() { proceedToUpgrade(modal); };
        }

    } catch (error) {
        console.error('Error loading upgrade details:', error);
        if (summaryEl) {
            summaryEl.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding: 16px;">Unable to load upgrade details. Please try again.</p>';
        }
    }
}

async function proceedToUpgrade(modal) {
    var confirmBtn = document.getElementById('upgrade-ai-confirm-btn');
    var errorEl = document.getElementById('upgrade-ai-error');

    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    }

    try {
        var response = await apiCall('/api/ai/upgrade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                success_url: window.location.origin + '/success.html?session_id={CHECKOUT_SESSION_ID}&type=upgrade',
                cancel_url: window.location.href
            })
        });

        if (response.upgraded) {
            if (modal) modal.style.display = 'none';
            showAlert('Upgrade Complete!', response.message || 'Your plan has been upgraded to AI-Powered!', 'success');
            setTimeout(function() { loadMembership(); }, 1000);
        } else if (response.url) {
            window.location.href = response.url;
        } else {
            throw new Error('Unexpected response');
        }
    } catch (error) {
        console.error('Error upgrading plan:', error);
        if (errorEl) {
            errorEl.textContent = error.message || 'Unable to process the upgrade. Please try again.';
            errorEl.style.display = 'block';
        }
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = '<i class="fas fa-credit-card"></i> Continue to Payment';
        }
    }
}

// ─── Cancel Subscription Modal ───
function openCancelSubModal(sub) {
    var modal = document.getElementById('cancel-sub-modal');
    if (!modal) return;

    var step1 = document.getElementById('cancel-sub-step-1');
    var step2 = document.getElementById('cancel-sub-step-2');
    var confirmInput = document.getElementById('cancel-sub-confirm-text');
    var confirmBtn = document.getElementById('cancel-sub-confirm-btn');
    var errorEl = document.getElementById('cancel-sub-error');

    // Set the access-until date
    var dateEl = document.getElementById('cancel-sub-access-date');
    if (dateEl && sub.expires_at) {
        dateEl.textContent = membershipFormatDate(sub.expires_at);
    }

    // Reset to step 1
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    if (confirmInput) confirmInput.value = '';
    if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.innerHTML = '<i class="fas fa-times-circle"></i> Cancel Subscription'; }
    if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }

    // Show modal
    modal.style.display = 'flex';

    // Keep button — close modal
    var keepBtn = document.getElementById('cancel-sub-keep-btn');
    if (keepBtn) {
        keepBtn.onclick = function() { modal.style.display = 'none'; };
    }

    // "Yes, Cancel" → advance to step 2
    var nextBtn = document.getElementById('cancel-sub-next-btn');
    if (nextBtn) {
        nextBtn.onclick = function() {
            if (step1) step1.style.display = 'none';
            if (step2) step2.style.display = 'block';
            if (confirmInput) confirmInput.focus();
        };
    }

    // "Go Back" → return to step 1
    var backBtn = document.getElementById('cancel-sub-back-btn');
    if (backBtn) {
        backBtn.onclick = function() {
            if (step2) step2.style.display = 'none';
            if (step1) step1.style.display = 'block';
            if (confirmInput) confirmInput.value = '';
            if (confirmBtn) confirmBtn.disabled = true;
        };
    }

    // Enable confirm button only when user types "CANCEL PLAN"
    if (confirmInput) {
        confirmInput.oninput = function() {
            var match = confirmInput.value.trim().toUpperCase() === 'CANCEL PLAN';
            if (confirmBtn) confirmBtn.disabled = !match;
        };
    }

    // Final confirm — actually cancel
    if (confirmBtn) {
        confirmBtn.onclick = function() { handleCancelSubscription(modal); };
    }

    // Close on overlay click
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

async function handleCancelSubscription(modal) {
    var confirmBtn = document.getElementById('cancel-sub-confirm-btn');
    var errorEl = document.getElementById('cancel-sub-error');

    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cancelling...';
    }

    try {
        var response = await apiCall('/api/subscription/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.success) {
            // Close modal
            if (modal) modal.style.display = 'none';

            // Show success message
            showAlert(
                'Subscription Cancelled',
                response.message || 'Your subscription has been cancelled.',
                'success'
            );

            // Reload membership card to reflect new status
            setTimeout(function() { loadMembership(); }, 1000);
        } else {
            throw new Error(response.error || 'Failed to cancel subscription');
        }
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        if (errorEl) {
            errorEl.textContent = error.message || 'Unable to cancel subscription. Please try again.';
            errorEl.style.display = 'block';
        }
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = '<i class="fas fa-times-circle"></i> Yes, Cancel';
        }
    }
}

// ─── Change Plan Modal ───
var _changePlanSelected = null;

function openChangePlanModal(currentSub) {
    var modal = document.getElementById('change-plan-modal');
    if (!modal) return;

    var loadingEl = document.getElementById('change-plan-loading');
    var optionsEl = document.getElementById('change-plan-options');
    var confirmBtn = document.getElementById('change-plan-confirm-btn');
    var errorEl = document.getElementById('change-plan-error');
    var currentLabel = document.getElementById('change-plan-current');

    // Reset state
    _changePlanSelected = null;
    if (loadingEl) loadingEl.style.display = 'block';
    if (optionsEl) optionsEl.style.display = 'none';
    if (confirmBtn) { confirmBtn.style.display = 'none'; confirmBtn.disabled = false; confirmBtn.innerHTML = '<i class="fas fa-check"></i> Switch Plan'; }
    if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }

    var planNames = {
        'monthly-access': 'Monthly Access',
        'semester-access': 'Semester Access',
        'lifetime-access': 'Lifetime Access',
        'ai-monthly-access': 'AI-Powered Monthly',
        'ai-semester-access': 'AI-Powered Semester',
        'ai-lifetime-access': 'AI-Powered Lifetime'
    };
    if (currentLabel) {
        currentLabel.textContent = 'Current plan: ' + (planNames[currentSub.plan_id] || currentSub.plan_name || currentSub.plan_id);
    }

    // Show modal
    modal.style.display = 'flex';

    // Close button
    var closeBtn = document.getElementById('change-plan-close-btn');
    if (closeBtn) {
        closeBtn.onclick = function() { modal.style.display = 'none'; };
    }
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };

    // Load plans
    loadChangePlanOptions(currentSub, optionsEl, loadingEl, confirmBtn);

    // Confirm button
    if (confirmBtn) {
        confirmBtn.onclick = function() { handleChangePlan(currentSub, modal); };
    }
}

var _changePlanData = null;

async function loadChangePlanOptions(currentSub, optionsEl, loadingEl, confirmBtn) {
    try {
        var data = await apiCall('/api/subscription-plans');
        if (!data || !data.plans) throw new Error('Failed to load plans');

        _changePlanData = data;
        var isAi = currentSub.is_ai_plan || (currentSub.plan_id && currentSub.plan_id.startsWith('ai-'));

        renderPlanTier(isAi, currentSub, optionsEl, confirmBtn);

        if (loadingEl) loadingEl.style.display = 'none';

    } catch (error) {
        console.error('Error loading plans:', error);
        if (loadingEl) loadingEl.style.display = 'none';
        if (optionsEl) {
            optionsEl.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding: 16px;">Unable to load plans. Please try again.</p>';
            optionsEl.style.display = 'flex';
        }
    }
}

function renderPlanTier(showAi, currentSub, optionsEl, confirmBtn) {
    if (!_changePlanData || !optionsEl) return;

    var plans = _changePlanData.plans;
    var html = '';

    // Tier badge
    if (showAi) {
        html += '<div style="text-align:center; margin-bottom:10px;"><span style="display:inline-flex; align-items:center; gap:5px; background:linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.1)); color:#7c3aed; font-size:0.75rem; font-weight:700; text-transform:uppercase; padding:4px 12px; border-radius:20px; border:1px solid rgba(139,92,246,0.2); letter-spacing:0.5px;"><i class="fas fa-bolt" style="font-size:0.65rem;"></i> AI-Powered Plans</span></div>';
    } else {
        html += '<div style="text-align:center; margin-bottom:10px;"><span style="display:inline-flex; align-items:center; gap:5px; background:rgba(46,134,171,0.08); color:var(--primary-color); font-size:0.75rem; font-weight:700; text-transform:uppercase; padding:4px 12px; border-radius:20px; border:1px solid rgba(46,134,171,0.15); letter-spacing:0.5px;"><i class="fas fa-book-open" style="font-size:0.65rem;"></i> Standard Plans</span></div>';
    }

    var planOrder = showAi
        ? ['ai-monthly-access', 'ai-semester-access', 'ai-lifetime-access']
        : ['monthly-access', 'semester-access', 'lifetime-access'];

    planOrder.forEach(function(planId) {
        var plan = plans[planId];
        if (!plan) return;

        var isCurrent = planId === currentSub.plan_id;
        var priceLabel = plan.interval === 'month' ? '$' + plan.price.toFixed(2) + '/mo' :
                         plan.access_days ? '$' + plan.price.toFixed(2) + '/semester' :
                         '$' + plan.price.toFixed(2) + ' once';

        html += '<div class="plan-option' + (isCurrent ? ' current-plan' : '') + '" data-plan-id="' + planId + '">';
        html += '  <div class="plan-option-radio"></div>';
        html += '  <div class="plan-option-info">';
        html += '    <div class="plan-option-name">' + plan.name;
        if (isCurrent) html += ' <span class="plan-option-badge">Current</span>';
        html += '    </div>';
        html += '    <div class="plan-option-desc">' + (plan.description || '').substring(0, 80) + '</div>';
        html += '  </div>';
        html += '  <div class="plan-option-price">' + priceLabel + '</div>';
        html += '</div>';
    });

    // Toggle link to switch between tiers
    if (showAi) {
        html += '<p style="text-align:center; font-size:0.82rem; color:var(--text-secondary); margin-top:4px;">Looking for Standard plans? <a href="#" class="change-plan-tier-toggle" style="color:var(--primary-color);">View Standard plans</a></p>';
    } else {
        html += '<p style="text-align:center; font-size:0.82rem; color:var(--text-secondary); margin-top:4px;">Want AI study tools? <a href="#" class="change-plan-tier-toggle" style="color:#7c3aed;">View AI-Powered plans</a></p>';
    }

    optionsEl.innerHTML = html;
    optionsEl.style.display = 'flex';

    // Reset selection when switching tiers
    _changePlanSelected = null;
    if (confirmBtn) confirmBtn.style.display = 'none';

    // Add click handlers to plan options
    var options = optionsEl.querySelectorAll('.plan-option:not(.current-plan)');
    options.forEach(function(opt) {
        opt.addEventListener('click', function() {
            optionsEl.querySelectorAll('.plan-option').forEach(function(o) { o.classList.remove('selected'); });
            opt.classList.add('selected');
            _changePlanSelected = opt.getAttribute('data-plan-id');
            if (confirmBtn) confirmBtn.style.display = 'inline-flex';
        });
    });

    // Add toggle handler to switch tiers inline
    var toggleLink = optionsEl.querySelector('.change-plan-tier-toggle');
    if (toggleLink) {
        toggleLink.addEventListener('click', function(e) {
            e.preventDefault();
            renderPlanTier(!showAi, currentSub, optionsEl, confirmBtn);
        });
    }
}

function handleChangePlan(currentSub, modal) {
    if (!_changePlanSelected || !_changePlanData) return;

    var selectedPlan = _changePlanData.plans[_changePlanSelected];
    if (!selectedPlan) return;

    var currentPlanNames = {
        'monthly-access': 'Monthly Access',
        'semester-access': 'Semester Access',
        'lifetime-access': 'Lifetime Access',
        'ai-monthly-access': 'AI-Powered Monthly',
        'ai-semester-access': 'AI-Powered Semester',
        'ai-lifetime-access': 'AI-Powered Lifetime'
    };

    var currentName = currentPlanNames[currentSub.plan_id] || currentSub.plan_name || currentSub.plan_id;
    var newName = selectedPlan.name;
    var newPrice = selectedPlan.interval === 'month' ? '$' + selectedPlan.price.toFixed(2) + '/mo' :
                   selectedPlan.access_days ? '$' + selectedPlan.price.toFixed(2) + '/semester' :
                   '$' + selectedPlan.price.toFixed(2) + ' once';

    // Build confirmation view inside the modal
    var optionsEl = document.getElementById('change-plan-options');
    var confirmBtn = document.getElementById('change-plan-confirm-btn');
    var closeBtn = document.getElementById('change-plan-close-btn');
    var currentLabel = document.getElementById('change-plan-current');

    if (currentLabel) currentLabel.textContent = 'Confirm your plan change';

    if (optionsEl) {
        optionsEl.innerHTML =
            '<div style="background: var(--surface-color, #f8f9fa); border-radius: 12px; padding: 20px; width: 100%;">' +
            '  <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">' +
            '    <div style="flex:1; text-align:center;">' +
            '      <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); font-weight:600; margin-bottom:4px;">Current Plan</div>' +
            '      <div style="font-weight:600; color:var(--text-primary);">' + currentName + '</div>' +
            '    </div>' +
            '    <div style="color:var(--primary-color); font-size:1.2rem;"><i class="fas fa-arrow-right"></i></div>' +
            '    <div style="flex:1; text-align:center;">' +
            '      <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); font-weight:600; margin-bottom:4px;">New Plan</div>' +
            '      <div style="font-weight:600; color:var(--primary-color);">' + newName + '</div>' +
            '      <div style="font-size:0.9rem; color:var(--text-secondary); margin-top:2px;">' + newPrice + '</div>' +
            '    </div>' +
            '  </div>' +
            '  <div style="font-size:0.82rem; color:var(--text-secondary); text-align:center; border-top:1px solid var(--border-color); padding-top:12px;">' +
            '    <i class="fas fa-lock" style="margin-right:4px;"></i> You\'ll be redirected to Stripe to confirm payment.' +
            '  </div>' +
            '</div>';
    }

    // Change buttons to Go Back / Continue to Payment
    if (closeBtn) {
        closeBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Go Back';
        closeBtn.onclick = function() {
            // Re-open the plan selection view
            closeBtn.innerHTML = 'Close';
            openChangePlanModal(currentSub);
        };
    }

    if (confirmBtn) {
        confirmBtn.innerHTML = '<i class="fas fa-credit-card"></i> Continue to Payment';
        confirmBtn.style.display = 'inline-flex';
        confirmBtn.disabled = false;
        confirmBtn.onclick = function() { proceedToCheckout(currentSub, modal); };
    }
}

async function proceedToCheckout(currentSub, modal) {
    var confirmBtn = document.getElementById('change-plan-confirm-btn');
    var errorEl = document.getElementById('change-plan-error');

    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    }

    try {
        // Get user email from the settings page (already loaded)
        var userEmail = '';
        var emailInput = document.getElementById('email');
        if (emailInput && emailInput.value) {
            userEmail = emailInput.value;
        } else {
            var heroEmail = document.getElementById('settings-hero-email');
            if (heroEmail) userEmail = heroEmail.textContent.trim();
        }

        var response = await apiCall('/api/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                plan_id: _changePlanSelected,
                email: userEmail,
                success_url: window.location.origin + '/success.html?session_id={CHECKOUT_SESSION_ID}&type=plan_change',
                cancel_url: window.location.href
            })
        });

        if (response.url) {
            window.location.href = response.url;
        } else if (response.error) {
            throw new Error(response.error);
        } else {
            throw new Error('Unexpected response');
        }
    } catch (error) {
        console.error('Error changing plan:', error);
        if (errorEl) {
            errorEl.textContent = error.message || 'Unable to change plan. Please try again.';
            errorEl.style.display = 'block';
        }
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = '<i class="fas fa-credit-card"></i> Continue to Payment';
        }
    }
}

function membershipFormatDate(isoString) {
    if (!isoString) return '--';
    var date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function membershipEscapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
