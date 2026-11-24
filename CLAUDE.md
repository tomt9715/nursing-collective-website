# Claude Code Instructions

## Current live release and next UI work — 28 October 2026

Read [../CLAUDE_HANDOFF.md](../CLAUDE_HANDOFF.md) first. The simplified version is live and public. Future UI/style work must use a preview branch and receive fresh approval before another live deployment. The handoff records current branches, styling files, product decisions, auth/billing protections, verification and rollback. Older feature plans are historical.

## Work Log
At the end of every session, add an entry to the TNC Work Log in Obsidian:
- **Primary (date-first):** `/Users/tomthomas/Documents/Obsidian/Manhattanville Courses/TNC/Work Log.md` — new entry at the top, tagged with `[Launch]` `[Quiz Bank]` `[Dashboard]` `[Rounds]` `[AI Features]` `[Content]` `[Backend]` `[Obsidian/Notion]` etc.
- **Category index:** `/Users/tomthomas/Documents/Obsidian/Manhattanville Courses/TNC/Work Log by Category.md` — add a row to the relevant section(s).
Format: `## YYYY-MM-DD — Claude Code` followed by bullet points of what was done.

## Project Overview

**The Nursing Collective** - An e-commerce platform for nursing students offering study guides, practice questions, and educational resources.

### Tech Stack
- **Frontend**: Static HTML/CSS/JS hosted on Cloudflare Pages
- **Backend**: Flask/Python API hosted on Railway
- **Database**: PostgreSQL on Railway
- **Payments**: Stripe Checkout (test mode uses `test_` keys)
- **Auth**: Custom Flask JWT + HTTPOnly refresh cookies (Google/Discord OAuth and email/password)
- **Error Tracking**: Sentry
- **CDN**: Cloudflare (also handles security headers via `_headers` file)

### Key URLs
- **Production Site**: https://thenursingcollective.pro
- **Production API**: https://api.thenursingcollective.pro
- **Staging API**: https://staging-backend-production-365a.up.railway.app
- **Preview Pattern**: Actual Cloudflare deployment URLs use florencebot-website.pages.dev; retrieve the actual URL from the dashboard.

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
https://<actual-deployment-id>.florencebot-website.pages.dev
```

Wait 1-2 minutes for Cloudflare to deploy.

### Step 3: Test the Preview
- **Visual checks**: Verify UI/styling at the preview URL
- **Backend testing**: preview branches use the staging backend and staging Stripe test mode

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
├── pricing.html        # Subscription tiers
├── success.html        # Post-payment success page
├── my-guides.html      # The guide library (study-guides.html and guides.html do not exist)
├── about.html          # About The Nursing Collective
├── css/
│   ├── tokens.css      # Palette + design tokens — SINGLE SOURCE OF TRUTH
│   ├── <page>-redesign.css  # one stylesheet per page, loaded after tokens.css
│   └── (main.css, components.css, pages.css and the page-*.css set were
│        deleted on 24 Nov 2026 — nothing loaded them)
├── api-service.js      # Central API client (all backend calls go through here)
├── auth-script.js      # Auth handling (custom JWT)
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
// Use the shared API client (adds auth and handles renewal)
const data = await apiCall('/endpoint');
const result = await apiCall('/endpoint', { method: 'POST', body: JSON.stringify(data) });
```

**3. Authentication State**
Check auth state before protected operations:
```javascript
const allowed = await requireAuth();
if (!allowed) return;
// apiCall/authorizedFetch attach the access token; refresh credentials stay HTTPOnly.
const profile = await apiCall('/user/profile');
```

### CSS Patterns

**1. CSS Variables** — defined in `css/tokens.css`, which is the single source
of truth. `main.css` was deleted on 24 Nov 2026. The palette is warm light and
every value is checked for WCAG AA in both directions; read the comments in
`tokens.css` before changing one, especially the rule about ink on tinted and
sunken surfaces.
```css
--navy:   #faf7f2;  /* page (historical name, light value) */
--navy-2: #ffffff;  /* card */
--teal:   #0b7d74;  /* accent */
--text:   #2b2621;  /* ink */
```

**2. Dark Mode — REMOVED.** The site is warm light only. `dark-mode.js` was
taken off every non-admin page on 23 Nov 2026 and the `[data-theme="dark"]`
rules were deleted. Do not reintroduce the attribute: while it was still being
set, legacy dark rules rendered over light tokens and made quiz labels
unreadable at 1.61:1.

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
- Preview branches connect to the **staging** backend and staging database, not production
- Cloudflare auto-deploys all non-production branches
- For quick visual-only checks (no backend), user can also use Netlify Drop
- All JavaScript must be in external files (no inline scripts due to CSP)
- Use data attributes for click handlers, not inline onclick
- Add skip links and semantic HTML for accessibility
- Update sitemap.xml when adding new pages

---

## Backend API Reference

Base URLs: production `https://api.thenursingcollective.pro`, staging
`https://staging-backend-production-365a.up.railway.app` (api-service.js picks by hostname)

### Auth Required Endpoints
All require `Authorization: Bearer {access_token}` header.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/profile` | GET | Get user profile |
| `/api/user/purchases` | GET | Get user's purchased guides |
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
- [x] Refresh tokens use HTTPOnly cookies; preserve production/staging cookie isolation (see handoff).

### Medium Priority
- [ ] Add Vite build pipeline
- [ ] Bootstrap CSS purging
- [ ] Code splitting
- [ ] Add ESLint

### Lower Priority
- [ ] Convert JS to ES modules
