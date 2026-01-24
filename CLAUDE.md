# Claude Code Instructions

## Project Overview

**The Nursing Collective** - An e-commerce platform for nursing students offering study guides, practice questions, and educational resources.

### Tech Stack
- **Frontend**: Static HTML/CSS/JS hosted on Cloudflare Pages
- **Backend**: Flask/Python API hosted on Railway
- **Database**: PostgreSQL on Railway
- **Payments**: Stripe Checkout (test mode uses `test_` keys)
- **Auth**: Firebase Authentication (Google, Discord, Email/Password)
- **Error Tracking**: Sentry
- **CDN**: Cloudflare (also handles security headers via `_headers` file)

### Key URLs
- **Production Site**: https://thenursingcollective.pro
- **Production API**: https://florencebot-backend-production.up.railway.app
- **Preview Pattern**: https://preview-{branch-name}.thenursingcollective-pro.pages.dev

---

## Communication & Troubleshooting Approach

### User Context
The user is **not a developer** and describes issues in non-technical terms. When they say something "doesn't work" or "looks weird," take a holistic debugging approach rather than making narrow assumptions.

### Debugging Strategy
When the user reports an issue:

1. **Don't assume the obvious fix** - The issue may be in a different file or layer than expected
2. **Check multiple possible causes** - CSS, JS, HTML structure, API responses, browser caching
3. **Look at the full flow** - A "button not working" could be: missing event listener, wrong selector, CSS pointer-events, z-index issues, JS error blocking execution, etc.
4. **Read related files first** - Before making changes, understand how components interact
5. **Test your assumptions** - If a fix doesn't work, step back and reconsider the root cause

### Common Pitfall
There have been cases where multiple back-and-forth attempts were needed because the initial fix was too narrow. Avoid this by:
- Checking browser console for JS errors
- Inspecting the actual DOM state
- Verifying CSS specificity and cascade
- Confirming event listeners are attached
- Looking at network requests for API issues

### Translating User Descriptions
| User says | Could mean |
|-----------|------------|
| "It's broken" | JS error, missing functionality, visual bug |
| "It looks weird" | CSS issue, layout problem, wrong colors |
| "Nothing happens when I click" | Missing event listener, JS error, wrong element targeted |
| "It's slow" | API latency, render blocking, large assets |
| "It disappeared" | Display:none, visibility, z-index, conditional rendering |

---

## Testing & Deployment Workflow

### Step 1: Create Preview Branch for Testing
When making changes, ALWAYS start by creating a preview branch:
```bash
git checkout -b preview/<feature-name>
```

### Step 2: Make Changes & Push to Preview
After making changes:
```bash
git add .
git commit -m "Description of changes"
git push origin preview/<feature-name>
```

Preview URL will be available at:
```
https://preview-<feature-name>.thenursingcollective-pro.pages.dev
```

Wait 1-2 minutes for Cloudflare to deploy.

### Step 3: Test the Preview
- **Visual checks**: Verify UI/styling at the preview URL
- **Backend testing**: Test cart, checkout, API calls against production backend

### Step 4: When User Approves ("move to live site")
Only when the user confirms changes are ready for production:
```bash
git checkout main
git merge preview/<feature-name>
git push origin main
```

### Step 5: Clean Up Preview Branch
After merging to main:
```bash
git branch -d preview/<feature-name>
git push origin --delete preview/<feature-name>
```

---

## Quick Reference

| Action | Command |
|--------|---------|
| Start new feature | `git checkout -b preview/feature-name` |
| Push to preview | `git push origin preview/feature-name` |
| Move to live | `git checkout main && git merge preview/feature-name && git push origin main` |
| Clean up | `git branch -d preview/feature-name && git push origin --delete preview/feature-name` |

---

## Code Architecture

### Frontend Directory Structure
```
nursing-collective-website/
├── index.html          # Homepage
├── login.html          # Auth page (Google, Discord, Email)
├── dashboard.html      # User dashboard (requires auth)
├── admin.html          # Admin panel (requires admin role)
├── store.html          # Product catalog
├── pricing.html        # Subscription tiers
├── checkout.html       # Stripe checkout flow
├── success.html        # Post-payment success page
├── study-guides.html   # Study guides landing
├── guides.html         # Browse all guides
├── guide.html          # Individual guide viewer
├── css/
│   ├── main.css        # Core styles, variables, utilities
│   ├── components.css  # Reusable component styles
│   ├── pages.css       # Page-specific styles
│   └── cart.css        # Shopping cart styles
├── api-service.js      # Central API client (all backend calls go through here)
├── auth-script.js      # Firebase auth handling
├── cart-service.js     # Shopping cart logic
├── dashboard-script.js # Dashboard functionality
├── admin-script.js     # Admin panel logic
├── success-script.js   # Payment verification
├── dark-mode.js        # Theme toggle
├── modal.js            # Modal system
├── script.js           # Shared utilities
├── _headers            # Cloudflare security headers (CSP, CORS, etc.)
└── sitemap.xml         # SEO sitemap
```

### Key JavaScript Patterns

**1. Event Handling (NO inline onclick)**
Use data attributes instead of inline handlers:
```html
<!-- CORRECT -->
<button data-navigate="dashboard.html">Go to Dashboard</button>
<button data-external="https://discord.gg/xxx">Join Discord</button>
<button data-switch-tab="users">Users Tab</button>

<!-- WRONG - Don't use inline handlers -->
<button onclick="window.location.href='dashboard.html'">Go</button>
```

Add event listeners in JavaScript:
```javascript
document.querySelectorAll('[data-navigate]').forEach(btn => {
    btn.addEventListener('click', function() {
        window.location.href = this.dataset.navigate;
    });
});
```

**2. API Calls**
All API calls should go through `api-service.js`:
```javascript
// Use the apiService object
const data = await apiService.get('/endpoint');
const result = await apiService.post('/endpoint', { body: data });
```

**3. Authentication State**
Check auth state before protected operations:
```javascript
const user = firebase.auth().currentUser;
if (!user) {
    window.location.href = 'login.html';
    return;
}
const token = await user.getIdToken();
```

### CSS Patterns

**1. CSS Variables** (defined in `main.css`)
```css
--primary-color: #2E86AB;
--secondary-color: #A23B72;
--accent-color: #F18F01;
--background-color: #FFFFFF;
--text-color: #1A1A1A;
```

**2. Dark Mode**
Uses `[data-theme="dark"]` attribute on `<html>`:
```css
[data-theme="dark"] {
    --background-color: #1A1A1A;
    --text-color: #F5F5F5;
}
```

**3. Responsive Breakpoints**
```css
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 480px) { /* Mobile */ }
```

---

## Security Headers

The `_headers` file configures Cloudflare security:
- **CSP**: No `'unsafe-inline'` for scripts (all JS must be external)
- **CORS**: Configured for Railway backend
- **Other**: X-Frame-Options, X-Content-Type-Options, etc.

When adding new external scripts, update the CSP in `_headers`.

---

## Important Notes

- NEVER push directly to `main` without testing on a preview branch first
- Preview branches connect to the production Railway backend
- Cloudflare auto-deploys all non-production branches
- For quick visual-only checks (no backend), user can also use Netlify Drop
- All JavaScript must be in external files (no inline scripts due to CSP)
- Use data attributes for click handlers, not inline onclick
- Add skip links and semantic HTML for accessibility
- Update sitemap.xml when adding new pages

---

## Backend API Reference

Base URL: `https://florencebot-backend-production.up.railway.app`

### Auth Required Endpoints
All require `Authorization: Bearer {firebase_id_token}` header.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/profile` | GET | Get user profile |
| `/api/user/purchases` | GET | Get user's purchased guides |
| `/api/cart` | GET/POST | Get or update cart |
| `/api/checkout/create-session` | POST | Create Stripe checkout |
| `/api/admin/users` | GET | List users (admin only) |
| `/api/admin/guides` | GET/POST | Manage guides (admin only) |

### Public Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/guides` | GET | List all guides |
| `/api/guides/{id}` | GET | Get guide details |
| `/api/health` | GET | Health check |

---

## Remaining Tasks (Backlog)

### High Priority
- [ ] Move refresh tokens to httpOnly cookies

### Medium Priority
- [ ] Add Vite build pipeline
- [ ] Bootstrap CSS purging
- [ ] Code splitting
- [ ] Add ESLint

### Lower Priority
- [ ] Convert JS to ES modules
