// Authentication Page JavaScript
// Email form toggle, password strength, and form validation

// API Configuration is loaded from api-service.js (already defined globally)
// const API_URL is declared in api-service.js and available globally

// Check if user is already logged in
if (localStorage.getItem('accessToken')) {
    window.location.href = 'dashboard.html';
}

document.addEventListener('DOMContentLoaded', function() {

    // Current auth mode: 'signin' or 'signup'
    let currentMode = 'signin'; // Default to sign in mode for returning users

    // Get elements
    const authOptions = document.getElementById('auth-options');
    const emailForm = document.getElementById('email-form');
    const backBtn = document.getElementById('back-to-options');
    const signupForm = document.getElementById('signup-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrength = document.getElementById('password-strength');
    const emailInput = document.getElementById('email');
    const emailContinueBtn = document.getElementById('email-continue-btn');
    const emailDisplayText = document.getElementById('email-display-text');
    const emailChangeBtn = document.getElementById('email-change-btn');
    const signinModeBtn = document.getElementById('signin-mode-btn');
    const signupModeBtn = document.getElementById('signup-mode-btn');
    const authTitle = document.getElementById('auth-title');
    const nameFields = document.getElementById('name-fields');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const submitBtn = document.getElementById('submit-btn');
    const formModeText = document.getElementById('form-mode-text');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');

    // Track the email entered in step 1
    let enteredEmail = '';

    // Check for last used auth method
    const lastAuthMethod = localStorage.getItem('lastAuthMethod');

    // Highlight last used auth method if exists
    if (lastAuthMethod) {
        const authBtns = document.querySelectorAll('.auth-btn[data-auth-method]');
        authBtns.forEach(btn => {
            if (btn.getAttribute('data-auth-method') === lastAuthMethod) {
                btn.style.borderColor = 'var(--primary-color)';
                btn.style.borderWidth = '3px';
            }
        });
        // If last method was email, focus the email input
        if (lastAuthMethod === 'email' && emailInput) {
            setTimeout(function() { emailInput.focus(); }, 300);
        }
    }

    // Function to update UI based on current mode
    function updateModeUI() {
        if (currentMode === 'signin') {
            // Update title
            authTitle.textContent = 'Welcome Back';

            // Update toggle buttons
            signinModeBtn.classList.add('active');
            signupModeBtn.classList.remove('active');

            // Update social auth button text
            document.querySelectorAll('.auth-btn-text').forEach(span => {
                const btn = span.closest('.auth-btn');
                if (btn.classList.contains('google')) {
                    span.textContent = 'Sign in with Google';
                } else if (btn.classList.contains('discord')) {
                    span.textContent = 'Sign in with Discord';
                } else if (btn.classList.contains('apple')) {
                    span.textContent = 'Sign in with Apple';
                }
            });

            // Update Continue button text
            if (emailContinueBtn) {
                emailContinueBtn.querySelector('span').textContent = 'Continue';
            }

            // Update form elements
            if (formModeText) formModeText.querySelector('span').textContent = 'Sign in to your account';
            if (nameFields) nameFields.style.display = 'none';
            if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'none';
            if (forgotPasswordLink) forgotPasswordLink.style.display = 'block';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i><span>Sign In</span>';
            }
            if (passwordInput) passwordInput.placeholder = 'Enter your password';

            // Remove required from signup-only fields
            if (firstNameInput) firstNameInput.removeAttribute('required');
            if (lastNameInput) lastNameInput.removeAttribute('required');
            if (confirmPasswordInput) confirmPasswordInput.removeAttribute('required');

        } else {
            // Update title
            authTitle.textContent = 'Access Your Study Dashboard';

            // Update toggle buttons
            signinModeBtn.classList.remove('active');
            signupModeBtn.classList.add('active');

            // Update social auth button text
            document.querySelectorAll('.auth-btn-text').forEach(span => {
                const btn = span.closest('.auth-btn');
                if (btn.classList.contains('google')) {
                    span.textContent = 'Continue with Google';
                } else if (btn.classList.contains('discord')) {
                    span.textContent = 'Continue with Discord';
                } else if (btn.classList.contains('apple')) {
                    span.textContent = 'Continue with Apple';
                }
            });

            // Update Continue button text
            if (emailContinueBtn) {
                emailContinueBtn.querySelector('span').textContent = 'Continue';
            }

            // Update form elements
            if (formModeText) formModeText.querySelector('span').textContent = 'Create your account';
            if (nameFields) nameFields.style.display = 'grid';
            if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'block';
            if (forgotPasswordLink) forgotPasswordLink.style.display = 'none';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-user-plus"></i><span>Create Account</span>';
            }
            if (passwordInput) passwordInput.placeholder = 'Create secure password (min. 8 characters)';

            // Add required to signup fields
            if (firstNameInput) firstNameInput.setAttribute('required', '');
            if (lastNameInput) lastNameInput.setAttribute('required', '');
            if (confirmPasswordInput) confirmPasswordInput.setAttribute('required', '');
        }

        // Hide password strength for sign in mode
        if (currentMode === 'signin') {
            passwordStrength.classList.remove('visible');
        }
    }

    // Check URL parameters for pre-fill (from guest checkout email CTA)
    const urlParams = new URLSearchParams(window.location.search);
    const shouldSignup = urlParams.get('signup') === 'true';
    const prefillEmail = urlParams.get('email');
    const orderToClaim = urlParams.get('order');

    // If signup=true is in URL or #signup hash, switch to signup mode
    if (shouldSignup || window.location.hash === '#signup') {
        currentMode = 'signup';
    }

    // Initialize UI with default/URL-specified mode
    updateModeUI();

    // Pre-fill email if provided in URL (from guest checkout email)
    if (prefillEmail) {
        var decodedEmail = decodeURIComponent(prefillEmail);
        if (emailInput) {
            emailInput.value = decodedEmail;
        }
        // Also show a helpful banner if they have an order to claim
        if (orderToClaim) {
            showOrderClaimBanner(orderToClaim, decodedEmail);
        }
        // Go straight to password step with pre-filled email
        showPasswordStep(decodedEmail);
    }

    // Mode toggle buttons
    if (signinModeBtn) {
        signinModeBtn.addEventListener('click', function() {
            currentMode = 'signin';
            updateModeUI();
        });
    }

    if (signupModeBtn) {
        signupModeBtn.addEventListener('click', function() {
            currentMode = 'signup';
            updateModeUI();
        });
    }

    // Helper: show password step (step 2)
    function showPasswordStep(email) {
        enteredEmail = email;
        // Display email in read-only bar
        if (emailDisplayText) emailDisplayText.textContent = email;
        // Hide auth options, show email form
        authOptions.style.display = 'none';
        emailForm.classList.add('active');
        localStorage.setItem('lastAuthMethod', 'email');
        // Focus the password field
        setTimeout(function() {
            if (passwordInput) passwordInput.focus();
        }, 100);
    }

    // Helper: go back to email entry (step 1)
    function showEmailStep() {
        emailForm.classList.remove('active');
        authOptions.style.display = 'flex';
        // Reset password form but keep email
        if (passwordInput) passwordInput.value = '';
        if (confirmPasswordInput) confirmPasswordInput.value = '';
        if (firstNameInput) firstNameInput.value = '';
        if (lastNameInput) lastNameInput.value = '';
        if (passwordStrength) passwordStrength.classList.remove('visible');
        // Focus the email input
        setTimeout(function() {
            if (emailInput) emailInput.focus();
        }, 100);
    }

    // Continue button: validate email and go to password step
    if (emailContinueBtn) {
        emailContinueBtn.addEventListener('click', function() {
            var email = emailInput ? emailInput.value.trim() : '';
            if (!email) {
                emailInput.focus();
                return;
            }
            // Basic email format check
            if (!emailInput.checkValidity()) {
                emailInput.reportValidity();
                return;
            }
            showPasswordStep(email);
        });
    }

    // Allow Enter key on email input to trigger Continue
    if (emailInput) {
        emailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (emailContinueBtn) emailContinueBtn.click();
            }
        });
    }

    // Change email button (pencil icon on password step)
    if (emailChangeBtn) {
        emailChangeBtn.addEventListener('click', function() {
            showEmailStep();
        });
    }

    // Back to all options
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showEmailStep();
        });
    }

    // Password strength indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = passwordStrength.querySelector('.strength-bar');
            const strengthText = passwordStrength.querySelector('.strength-text');

            // Only show password strength during sign up
            if (password.length === 0 || currentMode === 'signin') {
                passwordStrength.classList.remove('visible');
                return;
            }

            passwordStrength.classList.add('visible');

            // Calculate password strength
            let strength = 0;

            // Length check
            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;

            // Contains lowercase
            if (/[a-z]/.test(password)) strength++;

            // Contains uppercase
            if (/[A-Z]/.test(password)) strength++;

            // Contains number
            if (/[0-9]/.test(password)) strength++;

            // Contains special character
            if (/[^a-zA-Z0-9]/.test(password)) strength++;

            // Update UI based on strength
            strengthBar.className = 'strength-bar';

            if (strength <= 2) {
                strengthBar.classList.add('weak');
                strengthText.textContent = 'Weak password';
                strengthText.style.color = '#ef4444';
            } else if (strength <= 4) {
                strengthBar.classList.add('medium');
                strengthText.textContent = 'Medium password';
                strengthText.style.color = '#f59e0b';
            } else {
                strengthBar.classList.add('strong');
                strengthText.textContent = 'Strong password';
                strengthText.style.color = '#10b981';
            }

            // Check password match if confirm password has a value
            if (confirmPasswordInput && confirmPasswordInput.value && currentMode === 'signup') {
                checkPasswordMatch(password, confirmPasswordInput.value);
            }
        });
    }

    // Password match indicator
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;

            // Only check during signup mode
            if (currentMode === 'signup' && confirmPassword) {
                checkPasswordMatch(password, confirmPassword);
            } else {
                clearPasswordMatch();
            }
        });
    }

    // Helper function to check password match
    function checkPasswordMatch(password1, password2) {
        const matchIndicator = document.getElementById('password-match');
        if (!matchIndicator) return;

        if (password1 === password2) {
            matchIndicator.textContent = '✓ Passwords match';
            matchIndicator.style.color = '#10b981';
        } else {
            matchIndicator.textContent = '✗ Passwords do not match';
            matchIndicator.style.color = '#ef4444';
        }
    }

    // Helper function to clear password match indicator
    function clearPasswordMatch() {
        const matchIndicator = document.getElementById('password-match');
        if (matchIndicator) {
            matchIndicator.textContent = '';
        }
    }

    // Form validation
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = enteredEmail;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Get name fields (only needed for signup)
            let firstName = '';
            let lastName = '';
            if (currentMode === 'signup') {
                const firstNameInput = document.getElementById('first-name');
                const lastNameInput = document.getElementById('last-name');

                if (firstNameInput) firstName = firstNameInput.value.trim();
                if (lastNameInput) lastName = lastNameInput.value.trim();

                // Validate names for signup
                if (!firstName || !lastName) {
                    showAlert('Missing Information', 'Please enter your first and last name.', 'warning');
                    return;
                }
            }

            // Validate password match for signup
            if (currentMode === 'signup' && password !== confirmPassword) {
                showAlert('Password Mismatch', 'Passwords do not match. Please try again.', 'warning');
                confirmPasswordInput.focus();
                return;
            }

            // Validate password strength (minimum 8 characters)
            if (password.length < 8) {
                showAlert('Weak Password', 'Password must be at least 8 characters long.', 'warning');
                passwordInput.focus();
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Please wait...</span>';

            try {
                if (currentMode === 'signin') {
                    // Login
                    await handleLogin(email, password);
                    // If we get here without error, redirect is happening - don't restore button
                    return;
                } else {
                    // Register
                    await handleRegister(email, password, firstName, lastName);
                    // If we get here without error, redirect is happening - don't restore button
                    return;
                }
            } catch (error) {
                console.error('Auth error:', error);
                showAlert('Authentication Failed', error.message || 'Authentication failed. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = currentMode === 'signin'
                    ? '<i class="fas fa-sign-in-alt"></i><span>Sign In</span>'
                    : '<i class="fas fa-user-plus"></i><span>Create Account</span>';
            }
        });
    }

    // Forgot Password Modal
    const forgotModal = document.getElementById('forgot-password-modal');
    const openForgotModalBtn = document.getElementById('open-forgot-modal');
    const closeForgotModalBtn = document.getElementById('close-forgot-modal');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    if (openForgotModalBtn) {
        openForgotModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            forgotModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    if (closeForgotModalBtn) {
        closeForgotModalBtn.addEventListener('click', function() {
            forgotModal.style.display = 'none';
            document.body.style.overflow = '';
            forgotPasswordForm.reset();
            document.getElementById('forgot-password-message').style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (forgotModal) {
        forgotModal.addEventListener('click', function(e) {
            if (e.target === forgotModal) {
                closeForgotModalBtn.click();
            }
        });
    }

    // Handle forgot password form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('forgot-email').value;
            const submitBtn = document.getElementById('forgot-submit-btn');
            const messageDiv = document.getElementById('forgot-password-message');

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';

            try {
                const response = await fetch(`${API_URL}/auth/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to send reset email');
                }

                // Show success message
                messageDiv.style.display = 'block';
                messageDiv.className = 'success-message';
                messageDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Password reset link sent! Check your email inbox.</span>
                `;

                // Reset form
                forgotPasswordForm.reset();

                // Close modal after 3 seconds
                setTimeout(() => {
                    closeForgotModalBtn.click();
                }, 3000);

            } catch (error) {
                console.error('Forgot password error:', error);
                messageDiv.style.display = 'block';
                messageDiv.className = 'error-message error';
                const safeErrMsg = document.createElement('span');
                safeErrMsg.textContent = error.message || 'Failed to send reset email. Please try again.';
                messageDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <span></span>
                        <button class="retry-button" id="forgot-retry-btn">
                            <i class="fas fa-redo"></i> Try Again
                        </button>
                    </div>
                `;
                messageDiv.querySelector('span').textContent = safeErrMsg.textContent;
                // Attach event listener to retry button
                const retryBtn = document.getElementById('forgot-retry-btn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', function() {
                        document.getElementById('forgot-password-form').requestSubmit();
                    });
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Reset Link</span>';
            }
        });
    }
});

// Handle Login
async function handleLogin(email, password) {
    try {

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Include cookies for httpOnly refresh token
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Login failed:', data.error);
            throw new Error(data.error || 'Login failed');
        }


        // Store access token and user data (refresh token is set as httpOnly cookie by backend)
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Store login timestamp for token expiry tracking
        localStorage.setItem('tokenTimestamp', Date.now().toString());

        // Legacy cart system removed - subscriptions don't use guest carts

        // Check for redirect URL (e.g., from store, checkout) and order claim
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect');
        const orderToClaim = urlParams.get('order');

        if (redirectTo) {
            // Redirect back to the page user came from
            // Full URLs allowed only for our own subdomains; relative names get .html appended
            if (redirectTo.startsWith('http')) {
                try {
                    const url = new URL(redirectTo);
                    if (url.hostname.endsWith('.thenursingcollective.pro') || url.hostname === 'thenursingcollective.pro') {
                        window.location.href = redirectTo;
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                } catch (e) { window.location.href = 'dashboard.html'; }
            } else {
                window.location.href = `${redirectTo}.html`;
            }
        } else if (orderToClaim) {
            // Redirect to dashboard with order to claim
            window.location.href = `dashboard.html?order=${encodeURIComponent(orderToClaim)}`;
        } else {
            window.location.href = 'dashboard.html';
        }

        // Return to prevent any further execution
        return;

    } catch (error) {
        console.error('Login error:', error);
        throw error; // Re-throw to be caught by caller
    }
}

// Note: refreshToken() and performLogout() are now in api-service.js
// Note: Cross-tab logout listener is in api-service.js

// Handle Registration
async function handleRegister(email, password, firstName, lastName) {
    try {

        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                nursing_program: 'BSN'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Registration failed:', data.error);
            throw new Error(data.error || 'Registration failed');
        }

        showSuccess('Registration successful! Logging you in...');

        // Auto-login after registration (for testing)
        await handleLogin(email, password);

    } catch (error) {
        console.error('Registration or auto-login error:', error);
        throw error; // Re-throw to be caught by form handler
    }
}

// Handle social authentication
async function handleSocialAuth(provider) {

    // Remember last used auth method
    localStorage.setItem('lastAuthMethod', provider);

    // Store redirect URL before OAuth if present (for checkout flow)
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect');
    if (redirectTo) {
        sessionStorage.setItem('authRedirect', redirectTo);
    }

    // Currently supported providers
    const supportedProviders = ['google', 'discord'];

    if (!supportedProviders.includes(provider)) {
        const providerNames = {
            'discord': 'Discord',
            'apple': 'Apple'
        };
        showAlert('Coming Soon', `${providerNames[provider]} authentication will be available soon.\n\nPlease use Google or email authentication for now.`, 'info');
        return;
    }

    try {
        // Get OAuth authorization URL from backend
        const response = await fetch(`${API_URL}/auth/oauth/${provider}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Failed to initiate ${provider} authentication`);
        }

        // Redirect to OAuth provider
        window.location.href = data.authorization_url;

    } catch (error) {
        console.error(`${provider} OAuth initiation error:`, error);

        // Check if it's a CORS error
        if (error instanceof TypeError && error.message === 'Load failed') {
            showAlert('Connection Error', 'Unable to connect to authentication server. This is likely a CORS configuration issue on the backend. Please contact support or try email authentication.', 'error');
        } else {
            showAlert('Sign In Failed', `Failed to sign in with ${provider}. Please try again or use email authentication.`, 'error');
        }
    }
}

// Setup social auth button event listeners (replaces inline onclick handlers)
document.addEventListener('DOMContentLoaded', function() {
    // Google auth button
    const googleBtn = document.querySelector('.auth-btn.google[data-auth-method="google"]');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            handleSocialAuth('google');
        });
    }

    // Discord auth button
    const discordBtn = document.querySelector('.auth-btn.discord[data-auth-method="discord"]');
    if (discordBtn) {
        discordBtn.addEventListener('click', function() {
            handleSocialAuth('discord');
        });
    }
});

/**
 * Show a banner indicating an order will be claimed after signup
 */
function showOrderClaimBanner(orderNumber, email) {
    // Create and insert banner after auth header
    const authHeader = document.querySelector('.auth-header');
    if (!authHeader) return;

    // Check if banner already exists
    if (document.getElementById('order-claim-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'order-claim-banner';
    banner.style.cssText = `
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border: 2px solid #0ea5e9;
        border-radius: 12px;
        padding: 16px 20px;
        margin: 0 0 20px 0;
        text-align: center;
    `;
    banner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
            <span style="font-size: 24px;">🎉</span>
            <div style="text-align: left;">
                <p style="margin: 0; color: #0c4a6e; font-weight: 600; font-size: 14px;">
                    Your order is ready to be linked!
                </p>
                <p style="margin: 4px 0 0; color: #0369a1; font-size: 13px;">
                    Create your account and order <strong>${orderNumber}</strong> will be automatically added to your dashboard.
                </p>
            </div>
        </div>
    `;

    authHeader.insertAdjacentElement('afterend', banner);
}

// Add ripple effect to buttons (matching site interaction)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('auth-btn') || e.target.closest('.auth-btn')) {
        const button = e.target.classList.contains('auth-btn') ? e.target : e.target.closest('.auth-btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        // Add ripple styles if not already added
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple-effect {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }

                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});
