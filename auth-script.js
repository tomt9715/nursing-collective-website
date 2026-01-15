// Authentication Page JavaScript
// Email form toggle, password strength, and form validation

document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth script loaded');

    // Get elements
    const emailToggleBtn = document.getElementById('email-toggle');
    const authOptions = document.getElementById('auth-options');
    const emailForm = document.getElementById('email-form');
    const backBtn = document.getElementById('back-to-options');
    const signupForm = document.getElementById('signup-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrength = document.getElementById('password-strength');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    // Toggle to email form
    if (emailToggleBtn) {
        emailToggleBtn.addEventListener('click', function() {
            console.log('Email toggle clicked');
            authOptions.style.display = 'none';
            emailForm.classList.add('active');
        });
    }

    // Back to all options
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            console.log('Back button clicked');
            emailForm.classList.remove('active');
            authOptions.style.display = 'flex';
            // Reset form
            if (signupForm) {
                signupForm.reset();
                passwordStrength.classList.remove('visible');
            }
        });
    }

    // Password strength indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = passwordStrength.querySelector('.strength-bar');
            const strengthText = passwordStrength.querySelector('.strength-text');

            if (password.length === 0) {
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
        });
    }

    // Form validation
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate password match
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                confirmPasswordInput.focus();
                return;
            }

            // Validate password strength (minimum 8 characters)
            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                passwordInput.focus();
                return;
            }

            // All validation passed
            console.log('Form validation passed');
            console.log('Email:', email);

            // Placeholder - replace with actual authentication logic
            alert(`Account creation successful!\n\nEmail: ${email}\n\nThis is a demo. In production, this would create your account and redirect to the dashboard.`);

            // In production, you would:
            // 1. Send data to your backend
            // 2. Create user account
            // 3. Redirect to dashboard
            // window.location.href = 'dashboard.html';
        });
    }

    // Toggle Sign In/Sign Up mode
    const toggleSignin = document.getElementById('toggle-signin');
    if (toggleSignin) {
        toggleSignin.addEventListener('click', function(e) {
            e.preventDefault();
            const authHeader = document.querySelector('.auth-header h1');
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const confirmPasswordGroup = document.querySelector('#confirm-password').closest('.form-group');
            const termsCheckbox = document.querySelector('.form-checkbox');

            if (this.textContent === 'Sign In') {
                // Switch to sign in mode
                authHeader.textContent = 'Welcome Back';
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i><span>Sign In</span>';
                confirmPasswordGroup.style.display = 'none';
                termsCheckbox.style.display = 'none';
                this.parentElement.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-signin">Sign Up</a>';

                // Re-attach event listener
                document.getElementById('toggle-signin').addEventListener('click', arguments.callee);
            } else {
                // Switch to sign up mode
                authHeader.textContent = 'Access Your Study Dashboard';
                submitBtn.innerHTML = '<i class="fas fa-user-plus"></i><span>Create Account</span>';
                confirmPasswordGroup.style.display = 'block';
                termsCheckbox.style.display = 'flex';
                this.parentElement.innerHTML = 'Already have an account? <a href="#" id="toggle-signin">Sign In</a>';

                // Re-attach event listener
                document.getElementById('toggle-signin').addEventListener('click', arguments.callee);
            }
        });
    }
});

// Handle social authentication (placeholder)
function handleSocialAuth(provider) {
    console.log(`${provider} authentication initiated`);

    // Placeholder - replace with actual OAuth flow
    const providerNames = {
        'google': 'Google',
        'discord': 'Discord',
        'apple': 'Apple'
    };

    alert(`${providerNames[provider]} authentication\n\nThis is a demo. In production, this would redirect to ${providerNames[provider]}'s OAuth flow.`);

    // In production, you would:
    // 1. Redirect to OAuth provider
    // 2. Handle callback
    // 3. Create/login user
    // 4. Redirect to dashboard

    // Example:
    // window.location.href = `https://oauth.provider.com/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
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
