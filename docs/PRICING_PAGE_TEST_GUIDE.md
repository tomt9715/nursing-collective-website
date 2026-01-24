# Pricing Page Testing Guide

## 🚀 Quick Start
URL: http://localhost:8000/pricing.html

---

## ✅ HOMEPAGE UPDATES TO VERIFY FIRST

### Homepage Changes (index.html)
1. Open http://localhost:8000
2. **Verify Features Section has 3 cards (not 4)**:
   - ✓ Instant Clinical References
   - ✓ Comprehensive Study Guides
   - ✓ NCLEX Practice Questions
   - ✗ Supportive Community (REMOVED)

3. **Verify Study Guides has 3 cards (not 4)**:
   - ✓ Electrolytes
   - ✓ Vital Signs
   - ✓ Isolation Precautions
   - ✗ Lab Values (REMOVED)

4. **Verify Navigation has Pricing link**:
   - Check navigation bar has "Pricing" link
   - Click it - should go to pricing.html

---

## 🎨 PRICING PAGE - VISUAL DESIGN

### Hero Section
- [ ] Gradient background animates smoothly
- [ ] Hero title is large and readable
- [ ] Subtitle text is clear
- [ ] Section has proper padding top/bottom

### Pricing Cards Layout
**Desktop (1920px, 1366px, 1024px):**
- [ ] 3 pricing cards display side-by-side
- [ ] Middle card (NCLEX-Ready) is slightly larger/elevated
- [ ] Cards have consistent spacing (30px gap)
- [ ] All cards same height

**Tablet (768px):**
- [ ] Cards may stack to 2-1 layout or single column
- [ ] Popular card appears first on mobile

**Mobile (375px-480px):**
- [ ] Cards stack vertically
- [ ] Popular card (NCLEX-Ready) appears first
- [ ] Full width cards with proper padding

### Pricing Card Styling
**Free Plan Card:**
- [ ] White/light background (light mode)
- [ ] Dark gray background (dark mode)
- [ ] Green book icon at top
- [ ] Price displays "$0/forever"
- [ ] Features list with checkmarks
- [ ] Disabled features show X icon and are grayed
- [ ] "Join Free" button (secondary style)

**NCLEX-Ready Card (Popular):**
- [ ] Purple gradient background (#667eea to #764ba2)
- [ ] "Most Popular" badge in top-right
- [ ] Slightly scaled up (1.05) on desktop
- [ ] White text throughout
- [ ] Graduation cap icon
- [ ] Price displays "$29/one-time"
- [ ] "Get NCLEX-Ready" button (white background)
- [ ] Money-back guarantee text below button

**Ultimate Bundle Card:**
- [ ] White/light background
- [ ] "Save $30" green badge in top-right
- [ ] Crown icon
- [ ] Price displays "$49/one-time"
- [ ] Strikethrough "$79" shown
- [ ] "Get Ultimate Bundle" button (secondary style)
- [ ] Lifetime access text below button

---

## 🎯 INTERACTIVE ELEMENTS

### Hover Effects
**Pricing Cards:**
- [ ] Card lifts up on hover (translateY -10px)
- [ ] Shadow increases on hover
- [ ] Border color changes to primary blue
- [ ] Shimmer effect moves across card
- [ ] Icon rotates and scales slightly
- [ ] Smooth transitions (0.4s)

**Popular Card Hover:**
- [ ] Maintains scale while lifting
- [ ] Shadow changes to purple glow
- [ ] All effects smooth

**CTA Buttons:**
- [ ] Button lifts on hover (translateY -3px)
- [ ] Shadow increases
- [ ] Ripple effect on click
- [ ] Smooth color transition

### Button Functionality
**Free Plan:**
- [ ] Clicking "Join Free" opens Discord invite
- [ ] Opens in new tab: https://discord.gg/y2Mh77wAV2

**NCLEX-Ready:**
- [ ] Clicking button shows alert/modal (placeholder)
- [ ] Would redirect to checkout (not implemented yet)

**Ultimate Bundle:**
- [ ] Clicking button shows alert/modal (placeholder)
- [ ] Would redirect to checkout (not implemented yet)

---

## 📊 SOCIAL PROOF SECTION

### Stats Display
- [ ] 3 stat cards display properly
- [ ] Desktop: 3 columns side-by-side
- [ ] Mobile: Stacked vertically
- [ ] Each stat has:
  - Icon (users, star, trophy)
  - Large number (1,200+, 4.9/5, 95%)
  - Label text

### Hover Effects
- [ ] Stat cards lift on hover
- [ ] Border changes to primary color
- [ ] Smooth animation

---

## ❓ FAQ ACCORDION

### Functionality
- [ ] FAQ section displays properly
- [ ] First FAQ is open by default
- [ ] Clicking question opens answer
- [ ] Opening one closes others (accordion behavior)
- [ ] Chevron icon rotates when open
- [ ] Smooth expand/collapse animation
- [ ] Answer text is readable

### FAQ Items to Verify
1. [ ] "Is the Discord bot really free forever?"
2. [ ] "What's the difference between NCLEX-Ready and Ultimate Bundle?"
3. [ ] "Can I upgrade from NCLEX-Ready to Ultimate Bundle later?"
4. [ ] "How does the 30-day money-back guarantee work?"
5. [ ] "Do I need a subscription or is it really one-time?"
6. [ ] "Can I download the study guides?"

### Hover States
- [ ] Question text changes color on hover (primary blue)
- [ ] Card border changes on hover
- [ ] Smooth transitions

---

## 🎨 FINAL CTA SECTION

### Visual Design
- [ ] Gradient background (primary to secondary)
- [ ] Decorative blur circles visible
- [ ] White text is readable
- [ ] Centered content

### Buttons
- [ ] "Start Free Today" button (white, primary style)
- [ ] "Browse Study Guides" button (outline style)
- [ ] Desktop: Side-by-side
- [ ] Mobile: Stacked vertically
- [ ] Both buttons work (Discord and guides.html)

---

## 🌓 DARK MODE TESTING

### Enable Dark Mode
1. Click sun/moon icon in navigation
2. Verify entire page switches

### Pricing Cards Dark Mode
**Free & Ultimate Cards:**
- [ ] Background: Dark gray (#1f2937)
- [ ] Border: Gray (#374151)
- [ ] Text: Light colored
- [ ] Icons: Proper colors
- [ ] Disabled features: Muted gray

**Popular Card (NCLEX-Ready):**
- [ ] Gradient: Darker purple (#4f46e5 to #7c3aed)
- [ ] Text: White (maintains visibility)
- [ ] Badge: Visible against background

### Other Sections Dark Mode
- [ ] Hero gradient adapts to darker tones
- [ ] Social proof cards: Dark backgrounds
- [ ] FAQ items: Dark backgrounds
- [ ] Final CTA: Maintains gradient
- [ ] All text remains readable
- [ ] Borders visible but subtle

---

## 📱 RESPONSIVE TESTING

### Desktop (1920px)
```
1. Open pricing page
2. Verify:
   ✓ 3 pricing cards side-by-side
   ✓ Popular card slightly larger
   ✓ All hover effects work
   ✓ FAQ accordion works
   ✓ Stats in 3 columns
   ✓ No horizontal scrolling
```

### Laptop (1366px)
```
1. Resize to 1366px
2. Verify:
   ✓ Cards maintain layout
   ✓ Content doesn't feel cramped
   ✓ All spacing appropriate
```

### Tablet (768px)
```
1. Resize to 768px
2. Verify:
   ✓ Cards may be 2 columns or stack
   ✓ Popular card first on mobile layout
   ✓ Stats stack if needed
   ✓ FAQ maintains readability
```

### Mobile - iPhone SE (375px)
```
1. DevTools > iPhone SE
2. Verify:
   ✓ Cards stack vertically
   ✓ Popular card appears first
   ✓ All text is centered
   ✓ Buttons full width
   ✓ FAQ questions fit properly
   ✓ No horizontal scrolling
   ✓ Touch targets min 44px
   ✓ Footer centered (from main CSS)
```

### Mobile - iPhone Pro (390px)
```
Same as iPhone SE
Verify all elements scale properly
```

### Mobile - Pixel 5 (393px)
```
Same as iPhone SE
Test Android rendering
```

---

## 🔗 NAVIGATION TESTING

### From Homepage
- [ ] Click "Pricing" in navigation
- [ ] Goes to pricing.html
- [ ] Navigation remains functional

### From Pricing Page
- [ ] Click "Home" - goes to index.html
- [ ] Click "Features" - goes to index.html#features
- [ ] Click "Study Guides" - goes to guides.html
- [ ] Click "Pricing" - stays on pricing.html
- [ ] Click "Contact" - goes to index.html#contact
- [ ] Click "Join Discord" button - opens Discord
- [ ] Dark mode toggle works

### Mobile Navigation
- [ ] Hamburger menu opens
- [ ] All links work from mobile menu
- [ ] Menu closes after clicking link
- [ ] Dark mode toggle accessible in mobile menu

---

## ⚡ PERFORMANCE TESTING

### Page Load
```
1. Open DevTools > Network tab
2. Refresh pricing.html
3. Verify:
   ✓ Page loads in under 3 seconds
   ✓ No 404 errors
   ✓ pricing-styles.css loads
   ✓ pricing-script.js loads
   ✓ No console errors
```

### Console Check
```
1. Open DevTools > Console
2. Verify:
   ✓ No errors
   ✓ No warnings
   ✓ FAQ script loaded
   ✓ Animations working
```

### Animation Performance
- [ ] Hover effects smooth (60fps)
- [ ] Card transitions smooth
- [ ] FAQ expand/collapse smooth
- [ ] No janky animations
- [ ] Ripple effects work

---

## ✅ FINAL CHECKLIST

### Content
- [x] 3 pricing plans displayed correctly
- [x] All features listed accurately
- [x] Prices correct ($0, $29, $49)
- [x] FAQ has 6 questions
- [x] Social proof stats present

### Design
- [x] Matches existing site design
- [x] Consistent typography
- [x] Proper color scheme
- [x] Brand colors used correctly
- [x] Icons from Font Awesome

### Functionality
- [x] FAQ accordion works
- [x] Hover effects work
- [x] Buttons clickable
- [x] Navigation works
- [x] Dark mode works

### Responsive
- [x] Works on desktop (1920px, 1366px, 1024px)
- [x] Works on tablet (768px)
- [x] Works on mobile (375px-480px)
- [x] No horizontal scrolling
- [x] Touch targets adequate

### Dark Mode
- [x] All sections adapt
- [x] Text readable
- [x] Cards styled properly
- [x] Popular card maintains visibility

### Performance
- [x] Loads quickly
- [x] No console errors
- [x] Smooth animations
- [x] No broken links

---

## 🐛 COMMON ISSUES TO CHECK

### If Cards Overlap:
- Check grid-template-columns
- Verify gap property
- Check mobile media queries

### If Dark Mode Breaks:
- Verify [data-theme="dark"] selectors
- Check color variables
- Test on actual pricing-styles.css

### If FAQ Doesn't Work:
- Check pricing-script.js loaded
- Verify console for errors
- Test click handlers

### If Hover Effects Fail:
- Check transition properties
- Verify transform syntax
- Test on different browsers

---

## 🎉 SUCCESS CRITERIA

**All Green = Ready for Production!**

✅ Homepage shows 3 features (not 4)
✅ Homepage shows 3 study guides (not 4)
✅ Pricing link in navigation
✅ Pricing page loads perfectly
✅ All 3 pricing cards display correctly
✅ Popular card stands out
✅ Hover effects smooth
✅ FAQ accordion works
✅ Dark mode perfect
✅ Mobile responsive
✅ No errors in console
✅ All links work
✅ Matches design system

---

## 📝 NOTES

**Payment Integration:**
Currently, clicking premium CTAs shows an alert. Replace with actual payment provider:
- Stripe
- PayPal
- Gumroad
- Or your chosen solution

**Future Enhancements:**
- Add comparison table
- Add customer testimonials
- Add live chat support
- Add pricing calculator
- Add annual billing toggle

---

**END OF PRICING PAGE TEST GUIDE**
