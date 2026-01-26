# Integration Guide for New Features

This document explains how to integrate the new professional features into your website pages.

## 1. Cookie Consent Banner

The cookie consent banner is GDPR/CCPA compliant and allows users to accept or reject different categories of cookies.

### Add to HTML Pages

Add these scripts before the closing `</body>` tag on each page:

```html
<!-- Cookie Consent & Analytics (GDPR compliant) -->
<script src="analytics.js"></script>
<script src="cookie-consent.js"></script>
```

The CSS is already included in `css/bundle.css`. If you need it separately:
```html
<link rel="stylesheet" href="css/cookie-consent.css">
```

### Pages that need these scripts:
- index.html ✅ (already added)
- store.html
- pricing.html
- study-guides.html
- guides.html
- guide.html
- checkout.html
- dashboard.html
- login.html
- settings.html
- about-florencebot.html
- contact.html
- privacy.html
- terms.html
- status.html

---

## 2. Google Analytics (GA4)

### Setup Steps:

1. **Create GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new GA4 property
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Update analytics.js:**
   - Open `analytics.js`
   - Replace `'G-XXXXXXXXXX'` with your actual Measurement ID:
   ```javascript
   measurementId: 'G-YOUR-ACTUAL-ID',
   ```

3. **Track Custom Events (optional):**
   ```javascript
   // Track button clicks
   Analytics.trackClick('buy-now-button', 'conversion');

   // Track add to cart
   Analytics.trackAddToCart({
       product_id: 'guide-123',
       product_name: 'Med-Surg Guide',
       price: 5.99
   });

   // Track purchases
   Analytics.trackPurchase('order-123', items, totalValue);
   ```

---

## 3. 404 Page

The 404 page is automatically served by Cloudflare Pages when a page is not found.

### Cloudflare Configuration:
No additional configuration needed - Cloudflare automatically looks for `404.html` in the root.

### Link to Status Page:
Consider adding a link to the status page in the 404 page if users report issues.

---

## 4. Status Page

The status page (`status.html`) shows the current status of your services.

### Add to Footer:
You may want to add a link in your footer:
```html
<li><a href="status.html">System Status</a></li>
```

### Customize Status Checks:
The status page checks:
- Website (always operational if page loads)
- API (checks `/api/health` endpoint)
- Payments (assumes Stripe is operational)
- FlorenceBot (same as API)

To customize, edit the `StatusPage.services` object in `status.html`.

---

## 5. Unit Testing (Jest)

### Run Tests:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Add New Tests:
Create test files in `__tests__/` directory with `.test.js` extension:
```javascript
// __tests__/my-feature.test.js
describe('My Feature', () => {
    test('should do something', () => {
        expect(true).toBe(true);
    });
});
```

---

## 6. E2E Testing (Cypress)

### Run Tests:
```bash
# Open Cypress UI
npm run e2e

# Run headless
npm run e2e:headless
```

### Add New Tests:
Create test files in `cypress/e2e/` directory with `.cy.js` extension:
```javascript
// cypress/e2e/my-page.cy.js
describe('My Page', () => {
    beforeEach(() => {
        cy.visit('/my-page.html');
    });

    it('should load successfully', () => {
        cy.get('body').should('be.visible');
    });
});
```

### Before Running E2E Tests:
Make sure the dev server is running:
```bash
npm run dev
```

---

## 7. CHANGELOG

Keep `CHANGELOG.md` updated with all changes:

```markdown
## [Unreleased]

### Added
- New feature description

### Changed
- What was modified

### Fixed
- Bug fixes

### Security
- Security-related changes
```

---

## Quick Checklist for Adding Features to All Pages

When adding the cookie consent and analytics to each page, add this before `</body>`:

```html
<!-- Cookie Consent & Analytics (GDPR compliant) -->
<script src="analytics.js"></script>
<script src="cookie-consent.js"></script>
```

### Files to update:
- [ ] store.html
- [ ] pricing.html
- [ ] study-guides.html
- [ ] guides.html
- [ ] guide.html
- [ ] checkout.html
- [ ] dashboard.html
- [ ] login.html
- [ ] settings.html
- [ ] about-florencebot.html
- [ ] contact.html
- [ ] privacy.html
- [ ] terms.html
- [ ] success.html
- [ ] admin.html

---

## Build Commands

After making changes:

```bash
# Rebuild CSS bundle (if you modified CSS)
npm run build:css

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run unit tests
npm test

# Run E2E tests (start dev server first)
npm run dev  # In one terminal
npm run e2e  # In another terminal
```
