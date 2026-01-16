// Settings Page JavaScript
// Profile management, password change, and OAuth connections

// API Configuration
const API_URL = 'https://web-production-592c07.up.railway.app';

// Check authentication
const accessToken = localStorage.getItem('accessToken');
const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

if (!accessToken) {
    // Not logged in, redirect to login
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Settings script loaded');

    // Load user profile
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
                    // Clear auth tokens and redirect (no confirmation needed)
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    window.location.href = 'login.html';
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
    }
});

// Load user profile and populate form
async function loadUserProfile() {
    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired
                localStorage.clear();
                window.location.href = 'login.html';
                return;
            }
            throw new Error('Failed to load profile');
        }

        const data = await response.json();
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
    }

    // Google
    const googleStatus = document.getElementById('google-connection-status');
    const googleBtn = document.getElementById('google-connect-btn');
    if (user.has_google) {
        googleStatus.textContent = 'Connected';
        googleStatus.style.color = '#10b981';
        googleBtn.innerHTML = '<i class="fas fa-unlink"></i> Disconnect';
        googleBtn.onclick = () => showAlert('Coming Soon', 'Disconnect feature will be available soon!', 'info');
    }

    // Apple
    const appleStatus = document.getElementById('apple-connection-status');
    const appleBtn = document.getElementById('apple-connect-btn');
    if (user.has_apple) {
        appleStatus.textContent = 'Connected';
        appleStatus.style.color = '#10b981';
        appleBtn.innerHTML = '<i class="fas fa-unlink"></i> Disconnect';
        appleBtn.onclick = () => showAlert('Coming Soon', 'Disconnect feature will be available soon!', 'info');
    }
}

// Handle profile update
async function handleProfileUpdate(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: document.getElementById('first-name').value,
                last_name: document.getElementById('last-name').value,
                nursing_program: document.getElementById('nursing-program').value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update profile');
        }

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
        const response = await fetch(`${API_URL}/user/change-password`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update password');
        }

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
