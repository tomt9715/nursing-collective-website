# Profile Picture Feature — Claude Code Instructions

## Overview

Add user profile pictures to The Nursing Collective. Users can select from 19 premade icons or upload their own image. The default for new accounts is `robot.png`. The profile picture should appear throughout the site: nav avatar, dropdown, settings page, quiz bank dashboard, and dashboard page.

---

## Available Default Icons

Located at `/assets/images/default-profile/`:

```
astronaut.png, cake.png, devil.png, doctor-female.png, doctor-male.png,
frog.png, gnome.png, goblin.png, jester.png, man-3.png, monster-2.png,
monster-3.png, monster.png, octopus.png, ogre.png, pirate.png, robot.png,
wizard.png, woman-5.png
```

Default for new users: **`robot.png`**

---

## Part 1: Backend — Add Profile Picture to User Model

**File:** Flask backend on Railway (the repo that serves the `/api/` endpoints)

### 1A. Database Migration

Add a `profile_picture` column to the users table:

```sql
ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255) DEFAULT 'robot.png';
```

- The value stores **either** a default icon filename (e.g., `"wizard.png"`) **or** a full URL to a user-uploaded image (e.g., a Cloudflare R2 signed URL or a public URL).
- Default value: `'robot.png'`

### 1B. Update `/api/user/profile` GET

Include `profile_picture` in the user profile response:

```python
# In the GET /api/user/profile handler, ensure the response includes:
{
    "user": {
        "first_name": "...",
        "last_name": "...",
        "email": "...",
        "nursing_program": "...",
        "profile_picture": "robot.png",   # <-- ADD THIS
        # ... other existing fields
    }
}
```

### 1C. Update `/api/user/profile` PUT/PATCH

Allow updating `profile_picture` via the existing profile update endpoint:

```python
# Accept profile_picture in the request body
profile_picture = data.get('profile_picture', None)
if profile_picture:
    # Validate it's either:
    # 1. A known default icon filename (from the allowed list below)
    # 2. A valid URL (for custom uploads)
    ALLOWED_DEFAULTS = [
        'astronaut.png', 'cake.png', 'devil.png', 'doctor-female.png',
        'doctor-male.png', 'frog.png', 'gnome.png', 'goblin.png',
        'jester.png', 'man-3.png', 'monster-2.png', 'monster-3.png',
        'monster.png', 'octopus.png', 'ogre.png', 'pirate.png',
        'robot.png', 'wizard.png', 'woman-5.png'
    ]
    if profile_picture in ALLOWED_DEFAULTS or profile_picture.startswith('https://'):
        user.profile_picture = profile_picture
```

### 1D. NEW Endpoint: `POST /api/user/profile-picture/upload`

Create a new endpoint for custom image uploads:

- Accept a `multipart/form-data` request with an image file
- Validate: file type (PNG, JPG, JPEG, WEBP only), max size 2MB
- Resize/crop to 256×256 (use Pillow)
- Upload to Cloudflare R2 bucket (same bucket used for guide content) under path `profile-pictures/{user_id}.{ext}`
- Return the public or signed URL
- Update the user's `profile_picture` field with the URL

```python
@app.route('/api/user/profile-picture/upload', methods=['POST'])
@require_auth
def upload_profile_picture():
    file = request.files.get('profile_picture')
    if not file:
        return jsonify({"error": "No file provided"}), 400

    # Validate file type
    allowed_types = {'image/png', 'image/jpeg', 'image/webp'}
    if file.content_type not in allowed_types:
        return jsonify({"error": "Invalid file type. Use PNG, JPG, or WEBP."}), 400

    # Validate file size (2MB max)
    file.seek(0, 2)
    size = file.tell()
    file.seek(0)
    if size > 2 * 1024 * 1024:
        return jsonify({"error": "File too large. Max 2MB."}), 400

    # Resize to 256x256 with Pillow
    from PIL import Image
    import io
    img = Image.open(file)
    img = img.convert('RGB')
    img.thumbnail((256, 256))
    # Center crop to square
    width, height = img.size
    min_dim = min(width, height)
    left = (width - min_dim) // 2
    top = (height - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((256, 256), Image.LANCZOS)

    buffer = io.BytesIO()
    img.save(buffer, format='WEBP', quality=85)
    buffer.seek(0)

    # Upload to R2
    key = f"profile-pictures/{current_user.id}.webp"
    # Use your existing R2 upload logic here
    url = upload_to_r2(key, buffer, 'image/webp')

    # Update user record
    current_user.profile_picture = url
    db.session.commit()

    return jsonify({"profile_picture": url}), 200
```

---

## Part 2: Frontend — Shared Profile Picture Utility

### 2A. Create a shared helper function

**File:** `api-service.js` (or a new `profile-utils.js` loaded on all pages)

Add a utility function that resolves a profile picture value to a full `<img>` tag or URL. This function is used EVERYWHERE the avatar appears so it's consistent.

```javascript
/**
 * Get the full image URL for a profile picture value.
 * @param {string} profilePicture - Either a default icon filename or a full URL
 * @returns {string} Full URL to the image
 */
function getProfilePictureUrl(profilePicture) {
    if (!profilePicture) profilePicture = 'robot.png';

    // If it's already a full URL (custom upload), return as-is
    if (profilePicture.startsWith('http://') || profilePicture.startsWith('https://')) {
        return profilePicture;
    }

    // Otherwise it's a default icon filename
    // Use relative path that works from any page depth
    var basePath = window.location.pathname.includes('/quiz-bank/') ? '../' : '';
    return basePath + 'assets/images/default-profile/' + profilePicture;
}

/**
 * Render a profile picture <img> element as HTML string.
 * @param {string} profilePicture - The profile_picture value from user data
 * @param {string} size - CSS class suffix: 'sm' (28px), 'md' (40px), 'lg' (64px), 'xl' (96px)
 * @param {string} alt - Alt text
 * @returns {string} HTML string
 */
function renderProfilePicture(profilePicture, size, alt) {
    var url = getProfilePictureUrl(profilePicture);
    return '<img src="' + url + '" alt="' + (alt || 'Profile') + '" class="profile-pic profile-pic--' + (size || 'md') + '" loading="lazy">';
}
```

### 2B. Add CSS for profile pictures

**File:** `css/components.css` (or `css/main.css`)

```css
/* ── Profile Picture ──────────────────────────── */
.profile-pic {
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    background: var(--surface-color, #f0f0f0);
}
.profile-pic--sm { width: 28px; height: 28px; }
.profile-pic--md { width: 40px; height: 40px; }
.profile-pic--lg { width: 64px; height: 64px; }
.profile-pic--xl { width: 96px; height: 96px; }

/* Nav avatar override */
.user-avatar .profile-pic {
    width: 100%;
    height: 100%;
}
.user-avatar-large .profile-pic {
    width: 100%;
    height: 100%;
}

[data-theme="dark"] .profile-pic {
    background: var(--surface-color-dark, #2a2a2a);
}
```

---

## Part 3: Update Nav Avatar (ALL Pages)

**File:** `script.js` — in the `updateNavigation` function (around line 360-372)

Replace the current initial-letter avatar logic with the profile picture:

### Current code (replace this):
```javascript
// Update user avatar with initial (same as dashboard)
const userAvatar = document.querySelector('.user-avatar');
const initial = user.first_name ? user.first_name.charAt(0).toUpperCase() :
               (userName ? userName.charAt(0).toUpperCase() : 'U');
if (userAvatar) {
    userAvatar.innerHTML = `<span style="font-weight: 600; font-size: 18px;">${initial}</span>`;
}

// Update user avatar large in dropdown
const userAvatarLarge = document.querySelector('.user-avatar-large');
if (userAvatarLarge) {
    userAvatarLarge.innerHTML = `<span style="font-weight: 600; font-size: 24px;">${initial}</span>`;
}
```

### New code:
```javascript
// Update user avatar with profile picture
const userAvatar = document.querySelector('.user-avatar');
if (userAvatar) {
    userAvatar.innerHTML = renderProfilePicture(user.profile_picture, 'sm', userName);
}

// Update user avatar large in dropdown
const userAvatarLarge = document.querySelector('.user-avatar-large');
if (userAvatarLarge) {
    userAvatarLarge.innerHTML = renderProfilePicture(user.profile_picture, 'lg', userName);
}
```

---

## Part 4: Quiz Bank Dashboard — Show Profile Picture in Mastery Hero

**File:** `quiz-bank/quiz-bank.js` — in the `_renderHub` function (around line 90-105)

Show the user's profile picture above the mastery ring so the stats feel personally attached.

### Find this block (around line 90):
```javascript
} else if (hasData) {
    // Mastery Ring
    html += _buildMasteryRing(stats.averageLevel, 10);
```

### Replace with:
```javascript
} else if (hasData) {
    // User profile picture above mastery ring
    var userData = null;
    try { userData = JSON.parse(localStorage.getItem('user')); } catch(e) {}
    var profilePic = (userData && userData.profile_picture) ? userData.profile_picture : 'robot.png';
    var displayName = '';
    if (userData) {
        displayName = (userData.first_name || '').trim();
        if (!displayName) displayName = (userData.email || '').split('@')[0];
    }

    html += '<div class="qb-user-profile-badge">';
    html += renderProfilePicture(profilePic, 'xl', displayName);
    if (displayName) {
        html += '<div class="qb-user-greeting">Hey, ' + _esc(displayName) + '!</div>';
    }
    html += '</div>';

    // Mastery Ring
    html += _buildMasteryRing(stats.averageLevel, 10);
```

### Add CSS in `quiz-bank/quiz-bank.css`:
```css
/* ── User Profile Badge in Mastery Hero ──────── */
.qb-user-profile-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.qb-user-profile-badge .profile-pic--xl {
    width: 80px;
    height: 80px;
    border: 3px solid var(--accent-color, #F18F01);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.qb-user-greeting {
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-secondary, #666);
}

[data-theme="dark"] .qb-user-profile-badge .profile-pic--xl {
    border-color: var(--accent-color, #F18F01);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}
```

---

## Part 5: Settings Page — Profile Picture Picker

**File:** `settings.html` and `settings-script.js`

### 5A. Add HTML at the top of the profile settings form:

```html
<!-- Profile Picture Section -->
<div class="settings-section" id="profile-picture-section">
    <h3 class="settings-section-title">Profile Picture</h3>
    <div class="profile-pic-editor">
        <div class="profile-pic-current" id="profile-pic-current">
            <img src="assets/images/default-profile/robot.png" alt="Current profile picture" class="profile-pic profile-pic--xl" id="current-profile-img">
        </div>
        <div class="profile-pic-actions">
            <button type="button" class="btn btn-outline" id="choose-icon-btn">
                <i class="fas fa-icons"></i> Choose Icon
            </button>
            <button type="button" class="btn btn-outline" id="upload-photo-btn">
                <i class="fas fa-camera"></i> Upload Photo
            </button>
        </div>
        <input type="file" id="profile-pic-upload" accept="image/png,image/jpeg,image/webp" style="display:none;">
    </div>

    <!-- Icon Picker Modal -->
    <div class="icon-picker-overlay" id="icon-picker-overlay" style="display:none;">
        <div class="icon-picker-modal">
            <div class="icon-picker-header">
                <h4>Choose Your Icon</h4>
                <button type="button" class="icon-picker-close" id="icon-picker-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="icon-picker-grid" id="icon-picker-grid"></div>
        </div>
    </div>
</div>
```

### 5B. Add CSS for the picker (in settings.html style block or css/pages.css):

```css
.profile-pic-editor {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
}
.profile-pic-current .profile-pic--xl {
    width: 96px;
    height: 96px;
    border: 3px solid var(--border-color, #e0e0e0);
    border-radius: 50%;
    object-fit: cover;
}
.profile-pic-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.profile-pic-actions .btn { font-size: 14px; padding: 8px 16px; }

.icon-picker-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon-picker-modal {
    background: var(--surface-color, #fff);
    border-radius: 16px;
    padding: 24px;
    max-width: 480px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
.icon-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}
.icon-picker-header h4 { margin: 0; font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 600; }
.icon-picker-close { background: none; border: none; font-size: 20px; cursor: pointer; color: var(--text-secondary); padding: 4px 8px; }
.icon-picker-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}
.icon-picker-option {
    aspect-ratio: 1;
    border-radius: 12px;
    border: 3px solid transparent;
    background: var(--background-light, #f5f5f5);
    cursor: pointer;
    padding: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon-picker-option:hover { border-color: var(--primary-color, #2E86AB); transform: scale(1.05); }
.icon-picker-option.selected { border-color: var(--accent-color, #F18F01); background: rgba(241, 143, 1, 0.1); }
.icon-picker-option img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }

@media (max-width: 480px) {
    .profile-pic-editor { flex-direction: column; text-align: center; }
    .profile-pic-actions { flex-direction: row; }
    .icon-picker-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### 5C. Add JavaScript to `settings-script.js`:

```javascript
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
}

function updateProfilePicPreview(value) {
    const img = document.getElementById('current-profile-img');
    if (img) img.src = getProfilePictureUrl(value);
}

function populateIconGrid() {
    const grid = document.getElementById('icon-picker-grid');
    if (!grid) return;
    grid.innerHTML = '';
    DEFAULT_ICONS.forEach(function(icon) {
        const div = document.createElement('div');
        div.className = 'icon-picker-option' + (icon === currentProfilePicture ? ' selected' : '');
        div.setAttribute('data-icon', icon);
        const img = document.createElement('img');
        img.src = 'assets/images/default-profile/' + icon;
        img.alt = icon.replace('.png', '').replace(/-/g, ' ');
        img.loading = 'lazy';
        div.appendChild(img);
        div.addEventListener('click', function() { selectIcon(icon); });
        grid.appendChild(div);
    });
}

async function selectIcon(iconFilename) {
    document.querySelectorAll('.icon-picker-option').forEach(function(el) {
        el.classList.toggle('selected', el.getAttribute('data-icon') === iconFilename);
    });
    try {
        await apiCall('/user/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profile_picture: iconFilename })
        });
        currentProfilePicture = iconFilename;
        updateProfilePicPreview(iconFilename);
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.profile_picture = iconFilename;
        localStorage.setItem('user', JSON.stringify(userData));
        document.getElementById('icon-picker-overlay').style.display = 'none';
        showAlert('Profile Picture Updated', 'Your icon has been changed!', 'success');
    } catch (error) {
        console.error('Failed to update profile picture:', error);
        showAlert('Update Failed', 'Could not update your profile picture.', 'error');
    }
}

async function handleProfilePicUpload(file) {
    if (!file) return;
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        showAlert('Invalid File', 'Please upload a PNG, JPG, or WEBP image.', 'error');
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        showAlert('File Too Large', 'Please upload an image under 2MB.', 'error');
        return;
    }
    const formData = new FormData();
    formData.append('profile_picture', file);
    try {
        const preview = document.getElementById('current-profile-img');
        if (preview) preview.style.opacity = '0.5';
        const result = await apiCall('/user/profile-picture/upload', {
            method: 'POST',
            body: formData
        });
        currentProfilePicture = result.profile_picture;
        updateProfilePicPreview(result.profile_picture);
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.profile_picture = result.profile_picture;
        localStorage.setItem('user', JSON.stringify(userData));
        if (preview) preview.style.opacity = '1';
        showAlert('Photo Uploaded', 'Your profile picture has been updated!', 'success');
    } catch (error) {
        console.error('Failed to upload:', error);
        const preview = document.getElementById('current-profile-img');
        if (preview) preview.style.opacity = '1';
        showAlert('Upload Failed', 'Could not upload your photo.', 'error');
    }
}

function setupProfilePicListeners() {
    const chooseBtn = document.getElementById('choose-icon-btn');
    if (chooseBtn) chooseBtn.addEventListener('click', function() {
        document.getElementById('icon-picker-overlay').style.display = 'flex';
    });
    const closeBtn = document.getElementById('icon-picker-close');
    if (closeBtn) closeBtn.addEventListener('click', function() {
        document.getElementById('icon-picker-overlay').style.display = 'none';
    });
    const overlay = document.getElementById('icon-picker-overlay');
    if (overlay) overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.style.display = 'none';
    });
    const uploadBtn = document.getElementById('upload-photo-btn');
    const fileInput = document.getElementById('profile-pic-upload');
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', function() { fileInput.click(); });
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                handleProfilePicUpload(this.files[0]);
                this.value = '';
            }
        });
    }
}
```

Call `initProfilePicture(user)` inside `loadUserProfile()` after populating form fields.

---

## Part 6: Dashboard Page

Update any user avatar area in `dashboard-script.js` and `dashboard.html` to use:
```javascript
const userAvatar = document.querySelector('.dashboard-user-avatar');
if (userAvatar && userData.profile_picture) {
    userAvatar.innerHTML = renderProfilePicture(userData.profile_picture, 'lg', userName);
}
```

---

## Part 7: Data Flow & Path Handling

- Ensure `profile_picture` is always included when storing user data in localStorage
- The `getProfilePictureUrl()` function handles the `/quiz-bank/` subfolder by prepending `../` for relative default icon paths
- The DB default of `'robot.png'` means no frontend changes needed for new user creation
- Update `_headers` CSP `img-src` if R2 bucket domain is new

---

## Summary Checklist

- [ ] Backend: `profile_picture` DB column (default `'robot.png'`)
- [ ] Backend: Include in GET `/api/user/profile`
- [ ] Backend: Accept in PATCH/PUT `/api/user/profile`
- [ ] Backend: New POST `/api/user/profile-picture/upload`
- [ ] Frontend: Shared `getProfilePictureUrl()` + `renderProfilePicture()` helpers
- [ ] Frontend: `.profile-pic` CSS classes
- [ ] Frontend: Nav avatar uses profile picture (script.js)
- [ ] Frontend: Quiz bank dashboard shows pic + greeting (quiz-bank.js)
- [ ] Frontend: Settings page icon picker + upload (settings.html + settings-script.js)
- [ ] Frontend: Dashboard page avatar
- [ ] Frontend: `_headers` CSP update if needed
- [ ] Test: Default robot.png for new users
- [ ] Test: Icon picker works + saves everywhere
- [ ] Test: Custom upload validates + resizes
- [ ] Test: Dark mode + mobile responsive

---

## Git Workflow

```bash
git checkout -b preview/profile-pictures
# make changes
git add . && git commit -m "Add user profile pictures with icon picker and custom upload"
git push origin preview/profile-pictures
# Test at: https://preview-profile-pictures.thenursingcollective-pro.pages.dev
# When approved:
git checkout main && git merge preview/profile-pictures && git push origin main
```
