/**
 * Rendered-DOM contrast guard.
 *
 * HOW TO RUN IT
 *
 *   npm run test:contrast
 *
 * which starts a local static server, runs this spec against it and stops the
 * server again.
 *
 * NOT AGAINST PRODUCTION. Cloudflare's bot filter answers Cypress's headless
 * browser with 403 on every page, even though the site is public and a real
 * browser loads it fine. This was tried; all 11 tests failed on `cy.visit()`,
 * not on contrast. To check production, open it in a real browser and paste
 * scripts/contrast-audit.js into the console — that is how the 23 November
 * numbers were taken.
 *
 * Paths below therefore carry the .html extension: a plain static server has
 * no clean-URL rewriting. Production serves the clean form and redirects the
 * .html one to it.
 *
 * This catches the two classes of problem that reading the CSS does not:
 * ink sitting on a tinted or sunken surface inherited from an ancestor, and
 * styling switched on at runtime (the quiz set data-theme="dark" over the
 * light tokens for weeks). See scripts/contrast-audit.js for the detail.
 *
 * Signed-in pages are not covered here — they need a session. Audit those by
 * pasting scripts/contrast-audit.js into the console while logged in.
 */

// The auditor is a browser script, not a module — package.json sets
// "type": "module", so it has no CommonJS export to import. Read it as text
// and evaluate it in the page, which is exactly how it is used by hand.
const AUDITOR = 'scripts/contrast-audit.js';

// Public pages only; everything else redirects to login without a session.
const PAGES = [
  // Core public pages
  '/index.html',
  '/pricing.html',
  '/resources.html',
  '/about.html',
  '/contact.html',
  '/terms.html',
  '/privacy.html',
  '/login.html',
  '/404.html',

  // All 17 free resource pages — every one of them was still loading
  // dark-mode.js after the first removal pass, which only globbed the root.
  '/resources/abbreviations.html',
  '/resources/care-plans.html',
  '/resources/clinical-bag.html',
  '/resources/clinical-safety.html',
  '/resources/clinical-skills.html',
  '/resources/documentation-phrases.html',
  '/resources/feeling-like-failing.html',
  '/resources/first-semester-clinicals.html',
  '/resources/head-to-toe-assessment.html',
  '/resources/how-to-study.html',
  '/resources/lab-values.html',
  '/resources/medications.html',
  '/resources/night-before-clinicals.html',
  '/resources/not-overwhelmed.html',
  '/resources/time-management.html',
  '/resources/vital-signs.html',
  '/resources/when-you-dont-know.html'
];

function report(result) {
  if (!result.failureCount) return '';
  return result.failures
    .map(f => `    ${f.ratio}:1 (needs ${f.required}) ${f.selector}\n` +
              `        "${f.text}" ${f.color} on ${f.background} @ ${f.fontSize}`)
    .join('\n');
}

describe('Contrast (rendered DOM, WCAG AA)', () => {
  PAGES.forEach(page => {
    it(`${page} has no text below AA`, () => {
      cy.visit(page);
      // Let deferred content (beta banner, cookie bar, widgets) paint first.
      cy.wait(1500);
      cy.readFile(AUDITOR).then(src => cy.window().then(win => {
        win.eval(src);
        const result = win.auditContrast();

        // The quiz bug: a theme attribute set at runtime over light tokens.
        expect(
          result.theme,
          'data-theme must not be set on a light page — see quiz-init.js history'
        ).to.not.equal('dark');

        expect(
          result.failureCount,
          `${result.failureCount} element(s) below AA on ${page}:\n${report(result)}\n`
        ).to.equal(0);
      }));
    });
  });

  it('no page loads dark-mode.js outside the admin panel', () => {
    cy.visit('/index.html');
    cy.document().then(doc => {
      const darkMode = [...doc.scripts].filter(s => /dark-mode\.js/.test(s.src));
      expect(
        darkMode.length,
        'dark-mode.js sets data-theme from the OS; the live stylesheets have no ' +
        'dark rules, and feedback-widget.css still does — it made "Send Feedback" ' +
        'render at 1.07:1 on dark-mode devices'
      ).to.equal(0);
    });
  });
});
