# How to Create HTML Study Guides

This document contains instructions for creating new HTML study guides that integrate with the dashboard's "Continue Studying" and "PDF Download" buttons.

## Reference Files

Before starting, read these files to understand the existing patterns:

- `/guides/heart-failure.html` - Template for structure/styling
- `/guides/assessment-skills.html` - Another example
- `/guides/guide-script.js` - Handles PDF download and tracking (do not modify)
- `/dashboard-script.js` - Need to update htmlGuides array (two locations)

## Required Information

When creating a new guide, you need:
- **Topic**: e.g., "Diabetes Type 2", "COPD", "Stroke"
- **Product ID**: e.g., "diabetes-type2", "copd", "stroke" (must match existing ID in guideCategoryMap in dashboard-script.js)
- **Category**: e.g., "Med-Surg", "Pharmacology", "Clinical Skills"

## Step-by-Step Process

### 1. Read the Template
Read `heart-failure.html` to understand the exact structure.

### 2. Create the New Guide File

Create the new guide at `/guides/[product-id].html`

- Copy the HTML/CSS structure exactly from heart-failure.html
- Update the `<body>` data attributes (CRITICAL for PDF download to work):
  ```html
  <body data-product-id="[product-id]" data-guide-name="[Guide-Name]">
  ```
  - `data-product-id` - Must match the product ID exactly
  - `data-guide-name` - Title case with hyphens (used for PDF filename)
- Update meta tags (title, description)
- Use the icon image: `<img src="../assets/images/guide-icons/[product-id].webp" alt="[Topic]">`
- Set reading time to "15-20 minutes"
- Set Last Updated to current month/year
- Include the guide-script.js at the bottom: `<script src="guide-script.js"></script>`

### 3. Customize the Cover Page Gradient

Use colors inspired by the guide's icon:

```css
/* Cover Page - Colors inspired by guide icon */
.cover-page {
    background: linear-gradient(135deg, #COLOR1 0%, #COLOR2 50%, #COLOR3 100%);
}
```

- Look at the icon image at `assets/images/guide-icons/[product-id].webp`
- Pick 2-3 dominant colors from the icon
- Create a smooth gradient using those colors
- **Important**: Keep the rest of the document using `var(--primary-color)` and `var(--secondary-color)` - only the cover page gets custom colors

### 4. Write Comprehensive Content

Include:
- **Learning Objectives** (5-7 items)
- **Table of Contents**
- **5-8 major sections** with clinical nursing content
- **Memory aids/mnemonics** where appropriate
- **Info boxes**: `.info-box.clinical-pearl`, `.info-box.nclex-tip`, `.info-box.warning`, `.info-box.mnemonic`
- **Tables** for comparisons (use `.guide-table` class)
- **Key Points Summary** at the end

### 5. Update dashboard-script.js

Add the product-id to the `htmlGuides` array in **TWO locations**:

1. Around line 1086 in `continueStudying()` function - enables "Continue Studying" button
2. Around line 1105 in `downloadGuide()` function - enables PDF download from dashboard

Change from:
```javascript
const htmlGuides = ['heart-failure', 'assessment-skills', 'myocardial-infarction'];
```

To:
```javascript
const htmlGuides = ['heart-failure', 'assessment-skills', 'myocardial-infarction', '[new-product-id]'];
```

**Why this matters:**
- `continueStudying()`: When user clicks "Open" on dashboard, it navigates to `/guides/[product-id].html`
- `AVAILABLE_GUIDES`: The set at the top of dashboard-script.js controls which guides show "Open" vs "Coming Soon" — add the new guide ID here too
- `downloadGuide()`: When user clicks the PDF button on dashboard, it uses server-side PDF generation (`/api/guides/[product-id]/pdf`)

### 6. Update Backend (guide_routes.py)

Add the new guide to:

1. `html_guides` list (around line 460):
```python
html_guides = [
    'heart-failure',
    'assessment-skills',
    'myocardial-infarction',
    '[new-product-id]'  # Add new guide here
]
```

2. `GUIDE_NAMES` dictionary (around line 28):
```python
GUIDE_NAMES = {
    'heart-failure': 'Heart-Failure',
    'assessment-skills': 'Assessment-Skills',
    'myocardial-infarction': 'Myocardial-Infarction',
    '[new-product-id]': '[Guide-Name]',  # Add new guide here
}
```

### 7. Verify the Guide Works

Test that:
- "Continue Studying" button on dashboard opens the guide at `/guides/[product-id].html`
- PDF button on dashboard generates and downloads PDF
- PDF button within the guide page (in the download bar) also works
- Both PDF buttons track downloads via `/cart/downloads/track` endpoint

### 8. Commit and Push

```bash
# Frontend
cd "/Users/tomthomas/Documents/TNC Projects/Discord-and-Website/nursing-collective-website"
git add guides/[product-id].html dashboard-script.js
git commit -m "Add [Topic] study guide"
git push origin main

# Backend (if needed)
cd "/Users/tomthomas/Documents/TNC Projects/Discord-and-Website/nursing-collective-backend"
git add backend/routes/guide_routes.py
git commit -m "Add [Topic] to HTML guides list"
git push origin main
```

---

## CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `.cover-page` | Gradient cover with logo, title, subtitle (uses icon-inspired colors) |
| `.learning-objectives` | Blue box with checkmarks |
| `.table-of-contents` | Numbered navigation list |
| `.guide-section` | Main content sections with icons |
| `.info-box.clinical-pearl` | Green tip box |
| `.info-box.nclex-tip` | Purple NCLEX box |
| `.info-box.warning` | Red warning box |
| `.info-box.mnemonic` | Orange memory aid box |
| `.guide-table` | Styled tables with gradient header |
| `.comparison-grid` / `.comparison-card` | Side-by-side comparisons |
| `.key-points-summary` | Final summary with gradient background |

---

## Color Variables

Used throughout document (except cover page):
```css
--primary-color: #2E86AB
--secondary-color: #A23B72
```

Gradients for tables, section icons, key points:
```css
linear-gradient(135deg, var(--primary-color), var(--secondary-color))
```

---

## Cover Page Color Examples (Icon-Inspired)

| Guide | Gradient Colors | Inspiration |
|-------|-----------------|-------------|
| Heart Failure | `#3B82F6 → #6366F1 → #EF4444` | Blue/indigo/coral from heart icon |
| Assessment Skills | `#10B981 → #3B82F6 → #6366F1` | Green/blue/indigo from vitals icon |
| Myocardial Infarction | `#3B82F6 → #6366F1 → #EF4444` | Blue/indigo/red from MI icon |

---

## Critical Body Data Attributes

The `<body>` tag **MUST** have these data attributes for PDF functionality:

```html
<body data-product-id="[product-id]" data-guide-name="[Guide-Name]">
```

- `data-product-id`: Used by guide-script.js for API calls to `/api/guides/[product-id]/pdf`
- `data-guide-name`: Used for the downloaded PDF filename (e.g., `TNC-Heart-Failure.pdf`)

---

## How PDF Download Works

1. User clicks PDF button (either on dashboard or within guide page)
2. `guide-script.js` reads `PRODUCT_ID` from `document.body.dataset.productId`
3. Makes authenticated request to `/api/guides/[product-id]/pdf`
4. Backend checks the subscription and returns a short-lived download link to the pre-generated PDF in R2 storage
5. PDF is downloaded as `TNC-[Guide-Name].pdf`

---

## Important Notes

- **Do NOT use inline JavaScript** (CSP restriction)
- Icon images are at `../assets/images/guide-icons/[product-id].webp`
- The `guide-script.js` handles PDF download and tracking automatically - **do not modify it**
- Content should be clinically accurate and NCLEX-focused
- Include nursing interventions, not just medical knowledge
- **Only the cover page** `.cover-page` gets custom icon-inspired colors - everything else uses brand colors
- The guide **MUST be added to BOTH** `htmlGuides` arrays in `dashboard-script.js` or the dashboard buttons won't work
- The guide **MUST be added to** `html_guides` and `GUIDE_NAMES` in `guide_routes.py` for PDF generation to work
