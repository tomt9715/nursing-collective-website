# Authentication Security Testing Checklist

Complete testing checklist for the authentication security improvements.

## Pre-Testing Setup

- [ ] Clear browser cache and localStorage
- [ ] Open DevTools Console to monitor logs
- [ ] Open DevTools Network tab to monitor API calls
- [ ] Have 3+ browser tabs ready for multi-tab testing

## 1. Token Refresh Testing

### Test 1.1: Automatic Token Refresh on Expired Access Token
**Steps**:
1. Login to the application
2. Open DevTools → Application → Local Storage
3. Note the current `accessToken` value
4. Wait for access token to expire (or manually replace with expired token)
5. Navigate to Dashboard or trigger any API call
6. Observe Console logs

**Expected Results**:
- [ ] Console shows "Access token expired, attempting refresh..."
- [ ] Console shows "Token refreshed successfully"
- [ ] New `accessToken` appears in localStorage
- [ ] Original API call completes successfully
- [ ] No redirect to login page
- [ ] No visible interruption to user

### Test 1.2: Token Refresh Failure (Invalid Refresh Token)
**Steps**:
1. Login to the application
2. Open DevTools → Application → Local Storage
3. Modify `refreshToken` to invalid value
4. Navigate to Dashboard or trigger any API call

**Expected Results**:
- [ ] Console shows "Access token expired, attempting refresh..."
- [ ] Console shows "Token refresh failed"
- [ ] User is redirected to login page
- [ ] All tokens cleared from localStorage
- [ ] Alert/message: "Session expired. Please login again."

### Test 1.3: Token Refresh with No Refresh Token
**Steps**:
1. Login to the application
2. Open DevTools → Application → Local Storage
3. Delete `refreshToken` from localStorage
4. Trigger any API call

**Expected Results**:
- [ ] Console shows "No refresh token available"
- [ ] User is redirected to login page
- [ ] All data cleared from localStorage

### Test 1.4: Multiple Rapid API Calls with Expired Token
**Steps**:
1. Login to the application
2. Make access token expire
3. Rapidly trigger multiple API calls (e.g., load dashboard, update profile, etc.)

**Expected Results**:
- [ ] Only one refresh request is made
- [ ] All API calls wait for refresh to complete
- [ ] All subsequent calls succeed with new token
- [ ] No duplicate refresh requests

## 2. Improved 401 Error Handling Testing

### Test 2.1: 401 Response Triggers Refresh
**Steps**:
1. Login to the application
2. Use Network tab to observe API calls
3. Make an API call that returns 401
4. Observe the network requests

**Expected Results**:
- [ ] Initial request returns 401
- [ ] Refresh token request is made to `/auth/refresh`
- [ ] Refresh succeeds and returns new token
- [ ] Original request is retried automatically
- [ ] Retried request succeeds with 200
- [ ] User sees no error

### Test 2.2: Non-401 Errors Are Not Retried
**Steps**:
1. Login to the application
2. Trigger an API call that returns 400, 403, or 500

**Expected Results**:
- [ ] Error is shown to user immediately
- [ ] No token refresh attempt
- [ ] No retry of the request
- [ ] Appropriate error message displayed

### Test 2.3: Network Error Handling
**Steps**:
1. Login to the application
2. Disconnect network/internet
3. Trigger an API call
4. Reconnect network

**Expected Results**:
- [ ] Network error caught and logged
- [ ] User-friendly error message shown
- [ ] No infinite retry loop
- [ ] After reconnect, next API call works normally

## 3. Cross-Tab Logout Synchronization Testing

### Test 3.1: Basic Cross-Tab Logout
**Steps**:
1. Login to the application
2. Open 3 separate tabs, all logged in
3. In Tab 1, click logout button
4. Immediately observe Tabs 2 and 3

**Expected Results**:
- [ ] Tab 1 redirects to login page
- [ ] Tab 2 redirects to login page within 1 second
- [ ] Tab 3 redirects to login page within 1 second
- [ ] All tabs have localStorage cleared
- [ ] Console in Tabs 2 & 3 shows "Logout detected in another tab"

### Test 3.2: Cross-Tab Logout from Dropdown
**Steps**:
1. Login to the application
2. Open 2 tabs (Dashboard and Settings)
3. In Dashboard tab, open user menu dropdown
4. Click "Logout"
5. Observe Settings tab

**Expected Results**:
- [ ] Dashboard redirects to login
- [ ] Settings tab redirects to login immediately
- [ ] Both tabs have clean localStorage

### Test 3.3: Cross-Tab with Mixed Auth States
**Steps**:
1. Login in Tab 1
2. Open Tab 2 (should also be logged in due to shared localStorage)
3. In Tab 1, manually delete `accessToken` from localStorage
4. In Tab 2, trigger logout
5. Observe Tab 1

**Expected Results**:
- [ ] Tab 1 receives logout event
- [ ] Tab 1 redirects to login
- [ ] No errors in console
- [ ] localStorage fully cleared in both tabs

### Test 3.4: Cross-Window Logout (Different Browser Windows)
**Steps**:
1. Login to the application
2. Open a new browser window (not tab) with the same site
3. Both should be logged in
4. Logout from Window 1
5. Observe Window 2

**Expected Results**:
- [ ] Window 2 detects logout event
- [ ] Window 2 redirects to login
- [ ] Works same as cross-tab

## 4. API Service Layer Testing

### Test 4.1: GET Request with apiCall
**Steps**:
1. Login to the application
2. Navigate to Dashboard
3. Observe `/user/profile` API call in Network tab

**Expected Results**:
- [ ] Request has `Authorization: Bearer [token]` header
- [ ] Request has `Content-Type: application/json` header
- [ ] Response data is automatically parsed
- [ ] User profile displays correctly

### Test 4.2: POST Request with apiCall
**Steps**:
1. Login to the application
2. Navigate to Settings
3. Update profile information
4. Submit form

**Expected Results**:
- [ ] POST request to `/user/profile`
- [ ] Request body is JSON
- [ ] Authorization header automatically added
- [ ] Response handled correctly
- [ ] Success message shown

### Test 4.3: PUT Request with apiCall
**Steps**:
1. Login as admin user
2. Navigate to Dashboard → Admin panel
3. Grant premium status to a user

**Expected Results**:
- [ ] PUT request to `/admin/users/{id}/premium`
- [ ] Request includes JSON body
- [ ] Authorization header present
- [ ] Success callback executes

### Test 4.4: DELETE Request with apiCall
**Steps**:
1. Login as admin user
2. Navigate to Dashboard → Admin panel
3. Delete a test user

**Expected Results**:
- [ ] DELETE request to `/admin/users/{id}`
- [ ] Authorization header present
- [ ] Success callback executes
- [ ] User removed from list

### Test 4.5: Custom Headers with apiCall
**Steps**:
1. Modify code to include custom header
2. Make API call with custom header

**Expected Results**:
- [ ] Custom header is present
- [ ] Authorization header still automatically added
- [ ] Both headers sent correctly

## 5. Error Message Testing

### Test 5.1: User-Friendly Session Expiry Message
**Steps**:
1. Login to the application
2. Make refresh token invalid
3. Trigger any API call

**Expected Results**:
- [ ] Alert shows: "Session expired. Please login again."
- [ ] OR error message includes "Session expired"
- [ ] Message is clear and actionable

### Test 5.2: Backend Error Messages Passed Through
**Steps**:
1. Login to the application
2. Trigger API call that returns backend error (e.g., wrong password)

**Expected Results**:
- [ ] Backend error message displayed to user
- [ ] Error is not generic "Request failed"
- [ ] User can understand what went wrong

## 6. Integration Testing

### Test 6.1: Complete User Flow
**Steps**:
1. Start logged out
2. Login with valid credentials
3. Navigate to Dashboard
4. View profile
5. Update profile information
6. Change password
7. Navigate between pages
8. Open multiple tabs
9. Logout from one tab

**Expected Results**:
- [ ] All actions work smoothly
- [ ] No unexpected logouts
- [ ] No 401 errors
- [ ] Cross-tab logout works
- [ ] All data persists correctly

### Test 6.2: Admin User Flow
**Steps**:
1. Login as admin user
2. View admin dashboard
3. Load user list
4. Perform admin actions (grant premium, verify email, etc.)
5. Open multiple tabs
6. Logout

**Expected Results**:
- [ ] All admin API calls work
- [ ] Token refresh works for admin endpoints
- [ ] Cross-tab logout works

### Test 6.3: Token Refresh During Active Session
**Steps**:
1. Login to the application
2. Use the application normally for duration until token expires
3. Continue using without manually refreshing page

**Expected Results**:
- [ ] Token automatically refreshes in background
- [ ] No interruption to user experience
- [ ] No visible errors or alerts

## 7. Edge Cases

### Test 7.1: Refresh Token Expires During Session
**Steps**:
1. Login to the application
2. Wait for both access and refresh tokens to expire
3. Trigger an API call

**Expected Results**:
- [ ] Refresh attempt fails
- [ ] User logged out gracefully
- [ ] Redirected to login
- [ ] Clear error message

### Test 7.2: Concurrent Requests with Token Expiry
**Steps**:
1. Login to the application
2. Make access token expire
3. Trigger multiple API calls simultaneously

**Expected Results**:
- [ ] First call triggers refresh
- [ ] Subsequent calls wait for refresh
- [ ] All calls complete successfully
- [ ] Only one refresh request made

### Test 7.3: Page Refresh During Token Refresh
**Steps**:
1. Login to the application
2. Trigger token refresh
3. Immediately refresh the page (F5)

**Expected Results**:
- [ ] Page reloads cleanly
- [ ] Either old or new token is in localStorage
- [ ] No broken state
- [ ] User can continue using app

### Test 7.4: Logout During Token Refresh
**Steps**:
1. Login to the application
2. Trigger token refresh (debug with breakpoint)
3. Click logout before refresh completes

**Expected Results**:
- [ ] Logout succeeds
- [ ] All data cleared
- [ ] No errors in console
- [ ] User redirected to login

## 8. Browser Compatibility

### Test 8.1: Chrome/Edge
- [ ] All tests pass in Chrome
- [ ] Cross-tab sync works
- [ ] Storage events work

### Test 8.2: Firefox
- [ ] All tests pass in Firefox
- [ ] Cross-tab sync works
- [ ] Storage events work

### Test 8.3: Safari
- [ ] All tests pass in Safari
- [ ] Cross-tab sync works
- [ ] Storage events work

## 9. Performance Testing

### Test 9.1: Token Refresh Speed
**Steps**:
1. Measure time for token refresh
2. Observe user experience during refresh

**Expected Results**:
- [ ] Refresh completes in < 500ms
- [ ] No visible delay to user
- [ ] Subsequent request completes quickly

### Test 9.2: Multiple Tab Performance
**Steps**:
1. Open 10+ tabs with the application
2. Logout from one tab
3. Observe logout propagation

**Expected Results**:
- [ ] All tabs redirect within 2 seconds
- [ ] No browser lag or freeze
- [ ] Memory usage reasonable

## 10. Security Verification

### Test 10.1: Token Not Exposed
**Steps**:
1. Login to the application
2. Check browser console
3. Check network tab
4. Check page source

**Expected Results**:
- [ ] Tokens not logged to console (except debug logs)
- [ ] Tokens not visible in page source
- [ ] Tokens only in localStorage and network headers

### Test 10.2: HTTPS Enforcement
**Steps**:
1. Access site over HTTP (if possible)

**Expected Results**:
- [ ] Automatically redirects to HTTPS
- [ ] Tokens only transmitted over HTTPS

### Test 10.3: Refresh Token Security
**Steps**:
1. Check that refresh token is:

**Expected Results**:
- [ ] Stored in localStorage (not cookie without httpOnly)
- [ ] Only sent to `/auth/refresh` endpoint
- [ ] Not included in other API calls

## Testing Complete ✅

After completing all tests, verify:
- [ ] All critical tests passed
- [ ] No console errors
- [ ] No user experience issues
- [ ] Documentation matches implementation
- [ ] Code is production-ready

## Known Limitations

Document any known issues or limitations found during testing:
1.
2.
3.

## Recommendations

Based on testing results:
1.
2.
3.
