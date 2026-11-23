/**
 * Rendered-DOM contrast auditor.
 *
 * WHY THIS EXISTS
 * Reading the stylesheets is not enough. Twice now a contrast problem has
 * survived a careful pass over the CSS:
 *
 *   1. Colours were validated against white and cream, but a lot of text sits
 *      on a TINTED or SUNKEN surface inherited from an ancestor, which eats
 *      0.5-1.0 of the ratio. That put 22 labels between 3.76:1 and 4.47:1.
 *   2. guides/quiz/quiz-init.js set data-theme="dark" at runtime, switching on
 *      44 legacy dark rules over the light tokens. The quiz concept label
 *      under every question rendered at 1.61:1 and no amount of reading
 *      quiz-styles.css would have shown it.
 *
 * Both only appear once the page is painted. So measure the painted page.
 *
 * HOW TO USE IT
 *
 *   In a browser console, on any page of the site:
 *     copy this whole file, paste, press enter. It returns the failures.
 *
 *   From Cypress (see cypress/e2e/contrast.cy.js):
 *     cy.visit('/pricing'); cy.auditContrast();
 *
 * WHAT IT CHECKS
 * Every element holding its own text node: the computed colour against the
 * effective background, composited up the ancestor chain through any
 * semi-transparent fills. WCAG AA thresholds — 4.5:1 normally, 3:1 for large
 * text (>=24px, or >=18.66px bold).
 *
 * WHAT IT CANNOT CHECK
 * Text over background images or gradients (skipped, reported separately),
 * colour applied by canvas, and anything not currently on screen. A clean run
 * is not a guarantee; it is one real check that beats reading CSS.
 */
(function (root) {
  'use strict';

  function parse(s) {
    var m = String(s).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);
    return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null;
  }
  function over(fg, bg) {
    if (fg.a >= 1) return { r: fg.r, g: fg.g, b: fg.b, a: 1 };
    return {
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
      a: 1
    };
  }
  function lum(c) {
    function f(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function ratio(a, b) {
    var la = lum(a), lb = lum(b), hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  // Walk up until something opaque is found, compositing translucent fills.
  function effectiveBg(el) {
    var acc = null, node = el;
    while (node && node !== document.documentElement) {
      var s = getComputedStyle(node);
      if (s.backgroundImage && s.backgroundImage !== 'none') return { img: true };
      var bg = parse(s.backgroundColor);
      if (bg && bg.a > 0) {
        acc = acc ? over(acc, bg) : bg;
        if (acc.a >= 1) return { c: acc, img: false };
      }
      node = node.parentElement;
    }
    var body = parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    return { c: acc ? over(acc, body) : body, img: false };
  }

  function describe(el) {
    var parts = [], n = el;
    for (var i = 0; i < 3 && n && n.tagName; i++) {
      var s = n.tagName.toLowerCase();
      if (n.id) s += '#' + n.id;
      else if (n.className && typeof n.className === 'string') {
        var c = n.className.trim().split(/\s+/).slice(0, 2).join('.');
        if (c) s += '.' + c;
      }
      parts.unshift(s);
      n = n.parentElement;
    }
    return parts.join(' > ');
  }

  function audit(opts) {
    opts = opts || {};
    var failures = [], skippedOverImages = 0;
    var els = document.querySelectorAll('body *');

    for (var i = 0; i < els.length; i++) {
      var el = els[i], s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) continue;
      var box = el.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) continue;

      var own = '';
      for (var k = 0; k < el.childNodes.length; k++) {
        if (el.childNodes[k].nodeType === 3) own += ' ' + el.childNodes[k].textContent;
      }
      own = own.trim();
      if (!own) continue;

      var fg = parse(s.color);
      if (!fg || fg.a === 0) continue;

      var bgInfo = effectiveBg(el);
      if (bgInfo.img) { skippedOverImages++; continue; }

      var composited = over(fg, bgInfo.c);
      var r = ratio(composited, bgInfo.c);
      var size = parseFloat(s.fontSize), bold = parseInt(s.fontWeight, 10) >= 700;
      var min = (size >= 24 || (size >= 18.66 && bold)) ? 3 : 4.5;

      if (r < min) {
        failures.push({
          selector: describe(el),
          text: own.slice(0, 50),
          ratio: Math.round(r * 100) / 100,
          required: min,
          color: s.color,
          background: 'rgb(' + Math.round(bgInfo.c.r) + ', ' + Math.round(bgInfo.c.g) + ', ' + Math.round(bgInfo.c.b) + ')',
          fontSize: s.fontSize
        });
      }
    }

    // One row per selector+ratio; a repeated component reports once.
    var seen = {}, unique = [];
    failures.sort(function (a, b) { return a.ratio - b.ratio; });
    for (var j = 0; j < failures.length; j++) {
      var key = failures[j].selector + '|' + failures[j].ratio;
      if (seen[key]) continue;
      seen[key] = true;
      unique.push(failures[j]);
    }

    return {
      url: location.pathname,
      theme: document.documentElement.getAttribute('data-theme'),
      elementsScanned: els.length,
      skippedOverImages: skippedOverImages,
      failureCount: unique.length,
      failures: opts.limit ? unique.slice(0, opts.limit) : unique
    };
  }

  // package.json sets "type": "module", so this file is ESM and there is no
  // `module` to export onto. It is a browser script by design: paste it into
  // a console, or let Cypress read it with cy.readFile and eval it in the
  // page (see cypress/e2e/contrast.cy.js). Either way it lands here.
  root.auditContrast = audit;
  return audit;
})(typeof window !== 'undefined' ? window : globalThis);
