# Study Guide Creation Instructions

## Overview
This document provides instructions for creating HTML study guides for The Nursing Collective. Follow these guidelines exactly to maintain consistency across all guides.

---

## Guide Requirements

### Content Rules
1. **Single topic guide** - Each guide covers ONE nursing topic only
2. **Complete content coverage** - Comprehensive coverage of the topic
3. **Key concept summary** - Must include a "Key Takeaways" section at the end
4. **NO NCLEX questions** - Do not include practice questions or quizzes

---

## File Structure

### Location
All guides go in: `/guides/` folder

### Naming Convention
- Use kebab-case: `heart-failure.html`, `diabetes-type2.html`, `pneumonia.html`
- Match the product ID from the store (e.g., if store has `heart-failure`, guide is `heart-failure.html`)

### Required Files
- Guide HTML: `/guides/{topic-name}.html`
- Guide CSS (shared): `/css/guide-content.css` (already exists, don't modify)

---

## HTML Template Structure

Use this exact structure for every guide:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Topic Name} Study Guide - The Nursing Collective</title>
    <meta name="description" content="Comprehensive nursing study guide for {Topic}. {Brief description of what students will learn}.">

    <!-- Open Graph / Social Media Preview -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://thenursingcollective.pro/guides/{topic-name}.html">
    <meta property="og:title" content="{Topic Name} Study Guide - The Nursing Collective">
    <meta property="og:description" content="{Brief description for social sharing}">
    <meta property="og:image" content="https://thenursingcollective.pro/assets/images/og-preview.png">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/images/apple-touch-icon.png">

    <!-- Theme Color -->
    <meta name="theme-color" content="#2E86AB">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">

    <!-- Styles -->
    <link rel="stylesheet" href="../css/bundle.min.css">
    <link rel="stylesheet" href="../css/guide-content.css">
</head>
<body>
    <!-- Navigation (copy from heart-failure.html) -->

    <!-- Guide Header -->
    <header class="guide-page-header">
        <div class="guide-header-inner">
            <span class="guide-category-tag"><i class="fas fa-{icon}"></i> {Category}</span>
            <h1>{Topic Name}</h1>
            <p class="guide-subtitle">{Comprehensive description of what the guide covers}</p>
            <div class="guide-meta-row">
                <div class="guide-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>{X}-{Y} min read</span>
                </div>
                <div class="guide-meta-item">
                    <i class="fas fa-signal"></i>
                    <span>{Beginner/Intermediate/Advanced}</span>
                </div>
                <div class="guide-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Updated {Month} {Year}</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="guide-page-content">
        <div class="guide-container">
            <!-- Learning Objectives -->
            <!-- Table of Contents -->
            <!-- Content Sections -->
            <!-- Key Takeaways (REQUIRED - always last) -->
            <!-- Navigation buttons -->
        </div>
    </main>

    <!-- Footer (copy from heart-failure.html) -->

    <!-- Scripts -->
    <script src="../script.js"></script>
    <script src="../dark-mode.js"></script>

    <!-- Smooth scroll for TOC links -->
    <script>
        document.querySelectorAll('.table-of-contents a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    </script>
</body>
</html>
```

---

## Required Sections (In Order)

### 1. Learning Objectives
```html
<section class="learning-objectives">
    <h2><i class="fas fa-bullseye"></i> Learning Objectives</h2>
    <ul>
        <li><i class="fas fa-check-circle"></i> {Objective 1}</li>
        <li><i class="fas fa-check-circle"></i> {Objective 2}</li>
        <!-- 3-5 objectives total -->
    </ul>
</section>
```

### 2. Table of Contents
```html
<nav class="table-of-contents">
    <h2><i class="fas fa-list"></i> Table of Contents</h2>
    <ul>
        <li><a href="#section-id"><span class="toc-number">1</span> Section Title</a></li>
        <!-- One entry per content section -->
    </ul>
</nav>
```

### 3. Content Sections
Each topic should include these types of sections as appropriate:
- **Anatomy & Physiology Review** (foundational knowledge)
- **Pathophysiology** (disease process)
- **Clinical Manifestations/Signs & Symptoms**
- **Diagnostic Tests/Labs**
- **Nursing Assessment**
- **Nursing Interventions**
- **Pharmacological Management**
- **Patient Education**
- **Complications**

### 4. Key Takeaways (REQUIRED - Always Last)
```html
<section class="key-points-summary">
    <h2><i class="fas fa-star"></i> Key Takeaways</h2>
    <div class="key-points-grid">
        <div class="key-point">
            <i class="fas fa-{icon}"></i>
            <p><strong>{Key Point Title}</strong> = {Brief explanation}</p>
        </div>
        <!-- 4-6 key points -->
    </div>
</section>
```

---

## Available CSS Components

### Section Headers
```html
<section class="guide-section" id="section-id">
    <h2><span class="section-icon"><i class="fas fa-{icon}"></i></span> Section Title</h2>
</section>
```

### Info Boxes (Use Appropriate Type)
```html
<!-- Clinical Pearl (blue) - nursing tips -->
<div class="info-box clinical-pearl">
    <div class="info-box-header">
        <i class="fas fa-lightbulb"></i> Clinical Pearl
    </div>
    <p>Content here</p>
</div>

<!-- Warning (red) - critical safety info -->
<div class="info-box warning">
    <div class="info-box-header">
        <i class="fas fa-exclamation-triangle"></i> Critical Alert
    </div>
    <p>Content here</p>
</div>

<!-- Tip (green) - helpful hints -->
<div class="info-box tip">
    <div class="info-box-header">
        <i class="fas fa-check-circle"></i> Tip
    </div>
    <p>Content here</p>
</div>

<!-- Mnemonic (orange) - memory aids -->
<div class="info-box mnemonic">
    <div class="info-box-header">
        <i class="fas fa-brain"></i> Memory Aid
    </div>
    <p>Content here</p>
</div>

<!-- NCLEX Tip (purple) - exam-focused info -->
<div class="info-box nclex-tip">
    <div class="info-box-header">
        <i class="fas fa-graduation-cap"></i> Key Concept
    </div>
    <p>Content here</p>
</div>
```

### Tables
```html
<div class="guide-table-wrapper">
    <table class="guide-table">
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Data</td>
                <td>Data</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Comparison Cards (Side-by-Side)
```html
<div class="comparison-grid">
    <div class="comparison-card left-side">
        <div class="comparison-card-header">Title 1</div>
        <div class="comparison-card-body">
            <ul>
                <li><i class="fas fa-check"></i> Point</li>
            </ul>
        </div>
    </div>
    <div class="comparison-card right-side">
        <div class="comparison-card-header">Title 2</div>
        <div class="comparison-card-body">
            <ul>
                <li><i class="fas fa-check"></i> Point</li>
            </ul>
        </div>
    </div>
</div>
```
Card color classes: `left-side` (red), `right-side` (blue), `systolic` (orange), `diastolic` (purple)

### Numbered Intervention Lists
```html
<div class="interventions-list">
    <h4><i class="fas fa-{icon}"></i> List Title</h4>
    <div class="intervention-item">
        <div class="intervention-number">1</div>
        <div class="intervention-content">
            <h5>Intervention Title</h5>
            <p>Description of intervention</p>
        </div>
    </div>
</div>
```

### Quick Reference Box
```html
<div class="quick-reference">
    <h3><i class="fas fa-bookmark"></i> Quick Reference</h3>
    <div class="quick-reference-grid">
        <div class="quick-ref-item">
            <div class="label">Label</div>
            <div class="value">Value</div>
        </div>
    </div>
</div>
```

---

## Category Icons Reference

| Category | Icon Class |
|----------|------------|
| Medical-Surgical | `fa-heartbeat` or `fa-hospital` |
| Pharmacology | `fa-pills` |
| Fundamentals | `fa-book-medical` |
| Maternal/OB | `fa-baby` |
| Pediatrics | `fa-child` |
| Mental Health | `fa-brain` |
| Lab Values | `fa-vial` |
| Clinical Skills | `fa-stethoscope` |

---

## Content Guidelines

### Writing Style
- Use clear, concise language
- Write in active voice
- Use bullet points for lists
- Bold key terms and important values
- Include normal values/ranges where applicable

### What to Include
- Pathophysiology explanation
- Clinical manifestations with rationales
- Priority nursing assessments
- Evidence-based nursing interventions
- Common medications with nursing considerations
- Patient education points
- Memory aids/mnemonics where helpful

### What NOT to Include
- NCLEX-style practice questions
- Quiz sections
- Test yourself components
- Multiple choice questions
- Fill-in-the-blank exercises

---

## Example: Creating a New Guide

If asked to create a guide for "Pneumonia":

1. Create file: `/guides/pneumonia.html`
2. Copy structure from `heart-failure.html`
3. Update all meta tags and titles
4. Create sections:
   - Learning Objectives (3-5 objectives)
   - Table of Contents
   - Respiratory Anatomy Review
   - Pathophysiology of Pneumonia
   - Types of Pneumonia (CAP, HAP, VAP)
   - Clinical Manifestations
   - Diagnostic Studies
   - Nursing Assessment
   - Priority Nursing Interventions
   - Pharmacological Management
   - Patient Education
   - Key Takeaways
5. Use appropriate info boxes, tables, and comparison cards
6. End with Key Takeaways summary

---

## Testing

After creating a guide:
1. Push to preview branch: `preview/{guide-name}`
2. Test at: `https://preview-{branch-name}.thenursingcollective-pro.pages.dev/guides/{guide-name}.html`
3. Verify:
   - All links work
   - Dark mode displays correctly
   - Mobile responsive
   - Table of Contents navigation works
   - No broken images/icons

---

## Reference

For a complete working example, see: `/guides/heart-failure.html`
