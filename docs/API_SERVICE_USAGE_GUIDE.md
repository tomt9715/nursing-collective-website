# API Service Layer - Developer Usage Guide

Quick reference guide for using the new API service layer in the FlorenceBot website.

## Quick Start

### Before (Old Way)
```javascript
// Manual token handling - DON'T DO THIS ANYMORE
const response = await fetch(`${API_URL}/user/profile`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
});

if (!response.ok) {
    if (response.status === 401) {
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }
    throw new Error('Failed to load profile');
}

const data = await response.json();
```

### After (New Way)
```javascript
// Automatic token handling - DO THIS
const data = await apiCall('/user/profile', {
    method: 'GET'
});
```

## API Service Functions

### apiCall(endpoint, options, isRetry)

Centralized API calling function with automatic token refresh and error handling.

**Parameters**:
- `endpoint` (string): API endpoint path (e.g., '/user/profile')
- `options` (object): Fetch options (method, body, headers, etc.)
- `isRetry` (boolean): Internal flag - don't use manually

**Returns**: Promise<object> - Response data (already parsed from JSON)

**Throws**: Error with user-friendly message

### Examples

#### GET Request
```javascript
try {
    const data = await apiCall('/user/profile', {
        method: 'GET'
    });
    console.log(data.user);
} catch (error) {
    showAlert('Error', error.message, 'error');
}
```

#### POST Request
```javascript
try {
    const data = await apiCall('/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({
            email: user.email
        })
    });
    showSuccess('Email sent!');
} catch (error) {
    showAlert('Error', error.message, 'error');
}
```

#### PUT Request
```javascript
try {
    const data = await apiCall('/user/profile', {
        method: 'PUT',
        body: JSON.stringify({
            first_name: 'John',
            last_name: 'Doe'
        })
    });
    localStorage.setItem('user', JSON.stringify(data.user));
} catch (error) {
    showAlert('Error', error.message, 'error');
}
```

#### DELETE Request
```javascript
try {
    await apiCall(`/admin/users/${userId}`, {
        method: 'DELETE'
    });
    showSuccess('User deleted');
} catch (error) {
    showAlert('Error', error.message, 'error');
}
```

#### Custom Headers
```javascript
const data = await apiCall('/custom/endpoint', {
    method: 'POST',
    headers: {
        'X-Custom-Header': 'value'
        // Authorization header is automatically added
    },
    body: JSON.stringify({ data: 'value' })
});
```

## Logout Function

### performLogout()

Logs out the user and syncs across all browser tabs.

**Usage**:
```javascript
// In logout button handler
logoutBtn.addEventListener('click', function() {
    performLogout(); // That's it!
});
```

**What it does**:
1. Clears all authentication data (tokens, user info)
2. Broadcasts logout event to other tabs
3. Redirects to login page

**DON'T do this anymore**:
```javascript
// OLD WAY - Don't do this
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
localStorage.removeItem('user');
window.location.href = 'login.html';
```

## Token Refresh (Automatic)

You don't need to call `refreshToken()` manually. The `apiCall()` function automatically handles token refresh when a 401 response is received.

### How it works:
1. API request returns 401 (token expired)
2. `apiCall()` automatically calls `refreshToken()`
3. New access token is stored
4. Original request is retried with new token
5. Response returned to caller

### When refresh fails:
1. User is automatically logged out
2. Redirected to login page
3. Error message: "Session expired. Please login again."

## Error Handling

### Standard Pattern
```javascript
try {
    const data = await apiCall('/endpoint', {
        method: 'GET'
    });
    // Handle success
} catch (error) {
    // Error is already logged to console
    // Show user-friendly message
    showAlert('Error', error.message, 'error');
}
```

### Common Error Messages
- "Session expired. Please login again." - Token refresh failed
- "No refresh token available" - User needs to login
- Custom backend error messages passed through

## Cross-Tab Logout Sync

### Automatic Behavior
When a user logs out in any tab:
1. `performLogout()` is called
2. `logoutEvent` is set in localStorage
3. All other tabs receive `storage` event
4. All tabs clear auth data and redirect

### No Action Needed
The storage event listener is already set up in:
- `dashboard-script.js`
- `settings-script.js`
- `auth-script.js`

You don't need to add any code for this to work.

## Best Practices

### ✅ DO
- Use `apiCall()` for all API requests
- Use `performLogout()` for logout
- Handle errors with try/catch
- Show user-friendly error messages

### ❌ DON'T
- Don't manually add Authorization headers
- Don't manually handle 401 responses
- Don't manually manage token refresh
- Don't manually clear localStorage (use `performLogout()`)
- Don't call `refreshToken()` directly

## Migration Guide

### Step 1: Identify API Calls
Find all `fetch()` calls in your code that call the backend API.

### Step 2: Extract Endpoint
```javascript
// Before
fetch(`${API_URL}/user/profile`, {...})

// Extract endpoint
'/user/profile'
```

### Step 3: Convert to apiCall
```javascript
// Before
const response = await fetch(`${API_URL}/user/profile`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.error || 'Failed');
}

// After
const data = await apiCall('/user/profile', {
    method: 'GET'
});
```

### Step 4: Remove Manual 401 Handling
```javascript
// Before
if (response.status === 401) {
    localStorage.clear();
    window.location.href = 'login.html';
    return;
}

// After
// Nothing needed - automatic!
```

## Common Patterns

### Load User Profile
```javascript
async function loadUserProfile() {
    try {
        const data = await apiCall('/user/profile', {
            method: 'GET'
        });
        const user = data.user;
        // Update UI
    } catch (error) {
        showAlert('Error', error.message, 'error');
    }
}
```

### Update Profile
```javascript
async function updateProfile(formData) {
    try {
        const data = await apiCall('/user/profile', {
            method: 'PUT',
            body: JSON.stringify(formData)
        });
        localStorage.setItem('user', JSON.stringify(data.user));
        showSuccess('Profile updated!');
    } catch (error) {
        showAlert('Error', error.message, 'error');
    }
}
```

### Admin Operations
```javascript
async function loadUsers() {
    try {
        const data = await apiCall('/admin/users?filter=all', {
            method: 'GET'
        });
        renderUsers(data.users);
    } catch (error) {
        showAlert('Error', error.message, 'error');
    }
}
```

## Troubleshooting

### Issue: "No refresh token available"
**Cause**: User's refresh token is missing
**Solution**: User needs to login again

### Issue: "Session expired. Please login again."
**Cause**: Refresh token is invalid or expired
**Solution**: This is expected - user will be redirected to login

### Issue: API calls fail silently
**Cause**: Missing try/catch or error handler
**Solution**: Always wrap apiCall() in try/catch

### Issue: Token not updating
**Cause**: Check if backend is returning new tokens
**Solution**: Verify `/auth/refresh` endpoint returns `access_token`

## Files Using API Service Layer

- `dashboard-script.js` - All dashboard API calls
- `settings-script.js` - All settings API calls
- (Future files should also use this pattern)

## Need Help?

Refer to:
- `AUTH_SECURITY_IMPROVEMENTS.md` - Detailed technical documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation overview
- Code comments in the JavaScript files
