# Manual Testing Guide - Homepage Optimization

## 🚀 Quick Start
1. Open: http://localhost:8000
2. Test URL: http://localhost:8000/index.html

---

## 📱 CRITICAL MOBILE FOOTER TEST

**This is THE most important test - the footer MUST be perfectly centered on mobile.**

### Steps:
1. Open http://localhost:8000 in Chrome
2. Press `F12` to open DevTools
3. Click the device toolbar icon (or press `Ctrl+Shift+M`)
4. Select "iPhone SE" from dropdown
5. Scroll to bottom of page
6. **VERIFY:** Footer brand/logo is centered
7. **VERIFY:** Footer "Quick Links" heading is centered
8. **VERIFY:** Footer link items are centered
9. **VERIFY:** Footer "Contact" heading is centered
10. **VERIFY:** Footer email is centered
11. **VERIFY:** Social icons are centered
12. **VERIFY:** Footer bottom text is centered

### Test on Multiple Sizes:
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- Pixel 5 (393px)
- iPhone 14 Pro Max (430px)
- Galaxy S20 (360px)

**ALL must have perfectly centered footer!**

---

## 🖥️ Desktop Testing

### Test at 1920px (Full HD)
```
1. Resize browser to 1920px wide
2. Check hero section displays full-width gradient
3. Verify 4 feature cards in 2x2 grid
4. Verify 3 "How It Works" steps in horizontal row
5. Verify 4 study guide cards in horizontal row
6. Check footer has 3 columns
7. Hover over feature cards (should lift up with shadow)
8. Hover over guide cards (should lift up)
9. Hover over "View Guide →" links (arrow should move)
```

### Test at 1366px (Laptop)
```
1. Resize browser to 1366px
2. Verify all sections adapt properly
3. Check that nothing breaks or overlaps
4. Test all hover effects still work
```

### Test at 1024px (Tablet Landscape)
```
1. Resize to 1024px
2. Verify features may be 2 per row
3. Check steps display appropriately
4. Verify layout is still clean and professional
```

---

## 📱 Mobile Testing (Chrome DevTools)

### iPhone SE (375px) - THE CRITICAL TEST
```
1. Open DevTools → Device Toolbar
2. Select "iPhone SE"
3. Scroll through ENTIRE page
4. CHECK:
   ✓ Hero section text is centered and readable
   ✓ Hero stats stack vertically
   ✓ Feature cards stack in single column
   ✓ Each feature card has proper padding
   ✓ "How It Works" steps stack vertically
   ✓ Step icons are large and clear
   ✓ Study guide cards stack vertically
   ✓ Guide links work on tap
   ✓ CTA section displays properly
   ✓ *** FOOTER IS COMPLETELY CENTERED ***
   ✓ No horizontal scrolling ANYWHERE
   ✓ Mobile menu button works (hamburger icon)
   ✓ Mobile menu opens full screen
   ✓ Mobile menu items are centered
   ✓ Dark mode toggle works in menu
```

### iPhone 12 Pro (390px)
```
Same as iPhone SE but with slightly more width
Verify footer still perfectly centered
```

### Pixel 5 (393px)
```
Test Android device size
Footer must still be perfectly centered
```

---

## 🎨 Dark Mode Testing

### Steps:
```
1. Click the sun/moon icon in navigation
2. Page should smoothly transition to dark theme
3. CHECK:
   ✓ Hero has darker gradient
   ✓ Feature cards have dark background
   ✓ Step cards have dark background
   ✓ Guide cards have dark background
   ✓ CTA section adapts to dark
   ✓ Footer has dark background
   ✓ All text is light colored and readable
   ✓ Borders are visible but subtle
```

### Mobile Dark Mode:
```
1. Open mobile view (iPhone SE)
2. Toggle dark mode
3. Scroll through entire page
4. VERIFY: Footer is still perfectly centered in dark mode
5. VERIFY: Mobile menu has dark background
6. VERIFY: All text remains legible
```

---

## 🖱️ Interactive Elements Testing

### Feature Cards:
```
1. Hover over each of 4 feature cards
2. Should lift up (translateY) with enhanced shadow
3. Icon should not move (only card moves)
4. Smooth transition (0.3s)
```

### "How It Works" Steps:
```
1. Hover over each step card
2. Should lift up with enhanced shadow
3. Number icon stays in place
4. Border color changes to primary blue
```

### Study Guide Cards:
```
1. Hover over each guide card
2. Card lifts up with shadow
3. Icon should scale and rotate slightly
4. "View Guide →" link changes color
5. Arrow should move to the right
```

### Buttons:
```
1. Hover "Join The Nursing Collective" (hero)
2. Should lift up (translateY -2px) with shadow
3. Gradient should slightly change
4. Hover "View All Study Guides"
5. Should lift up with shadow
6. All buttons should have ripple effect on click
```

### Mobile Menu:
```
1. Click hamburger menu (mobile view)
2. Menu should open full screen
3. Menu items should be centered
4. Click any menu item - should navigate
5. Click X button - menu should close
6. Background should dim when menu is open
```

---

## 🔍 Content Verification

### Verify These Sections Exist:
- ✓ Hero Section (with gradient background)
- ✓ Features Section (4 cards)
- ✓ How It Works Section (3 steps)
- ✓ Study Guides Preview Section (4 guides)
- ✓ CTA Section (final call to action)
- ✓ Footer (contact and links)

### Verify These Sections Were REMOVED:
- ✗ Problem/Solution Section (should be gone)
- ✗ Command Examples Section (should be gone)
- ✗ Pricing Section (should be gone)
- ✗ FAQ Section (should be gone)
- ✗ Newsletter Section (should be gone)
- ✗ About Section (should be gone)

---

## 🎯 Quick Functionality Check

### Links to Test:
```
1. Click "Join The Nursing Collective" (hero)
   → Should go to Discord: https://discord.gg/y2Mh77wAV2

2. Click "View Guide" on Electrolytes
   → Should go to guides.html#electrolytes

3. Click "View All Study Guides"
   → Should go to guides.html

4. Click footer "Study Guides" link
   → Should go to guides.html

5. Click footer Discord link
   → Should open Discord invite

6. Click footer email
   → Should open mail client to support@thenursingcollective.pro
```

---

## 📊 Performance Check

### Chrome DevTools Performance:
```
1. Open DevTools (F12)
2. Go to "Network" tab
3. Refresh page (Ctrl+R)
4. CHECK:
   ✓ Page loads in under 3 seconds
   ✓ No 404 errors for resources
   ✓ All CSS/JS files load successfully
   ✓ All images load
```

### Console Check:
```
1. Open DevTools (F12)
2. Go to "Console" tab
3. Refresh page
4. VERIFY: No errors (should be clean)
5. VERIFY: No warnings about missing resources
```

---

## ✅ Final Checklist Before Approval

Run through this checklist one final time:

**Structure:**
- [ ] Hero section displays correctly
- [ ] 4 feature cards (not 6)
- [ ] "How It Works" with 3 steps exists
- [ ] Study Guides preview with 4 guides exists
- [ ] CTA section displays correctly
- [ ] Footer is present

**Mobile (iPhone SE 375px):**
- [ ] Everything stacks vertically
- [ ] ⭐ Footer is COMPLETELY centered (ALL elements)
- [ ] No horizontal scrolling
- [ ] Mobile menu works
- [ ] All buttons are tappable (44px min)

**Desktop (1920px):**
- [ ] Features in 2x2 grid
- [ ] Steps in horizontal row
- [ ] Guides in horizontal row
- [ ] Footer in 3 columns
- [ ] All hover effects work

**Dark Mode:**
- [ ] Toggles correctly
- [ ] All sections adapt
- [ ] Text remains legible
- [ ] Footer centered in dark mode

**Performance:**
- [ ] Loads in under 3 seconds
- [ ] No console errors
- [ ] All images load

**Links:**
- [ ] Discord links work
- [ ] Guide links work
- [ ] Footer links work
- [ ] Social links work

---

## 🎉 If All Tests Pass

**CONGRATULATIONS!** The homepage optimization is complete and ready for deployment!

### Next Steps:
1. Commit changes to git
2. Deploy to production
3. Test on real devices (not just DevTools)
4. Monitor analytics for improvements

---

## ⚠️ If Tests Fail

### Common Issues:

**Footer not centered:**
- Check CSS media query at 768px
- Verify `!important` flags are present
- Check that all footer elements have `text-align: center`

**Horizontal scrolling:**
- Check for elements with fixed widths > 100vw
- Verify `overflow-x: hidden` on body/html
- Check for negative margins

**Sections missing:**
- Verify HTML was saved correctly
- Check file path in browser
- Hard refresh (Ctrl+Shift+R)

**Hover effects not working:**
- Clear browser cache
- Check CSS is loading
- Verify JavaScript isn't blocking CSS

---

**END OF MANUAL TEST GUIDE**
