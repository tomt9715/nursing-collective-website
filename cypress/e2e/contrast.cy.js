/**
 * Rendered-DOM contrast guard.
 *
 * Run against any environment:
 *   npx cypress run --spec cypress/e2e/contrast.cy.js \
 *     --config baseUrl=https://thenursingcollective.pro
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
  '/',
  '/pricing',
  '/resources',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/login',
  '/resources/lab-values',
  '/resources/how-to-study'
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
    cy.visit('/');
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
