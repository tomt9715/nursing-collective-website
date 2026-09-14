#!/usr/bin/env node
/**
 * Update public-facing stat counts in HTML files.
 *
 * Reads both question banks (the Quiz Bank in the sibling
 * `nursing-collective-learn` repo + the per-guide quiz files in this
 * repo) plus the registered Quiz Bank chapters/topics and the built
 * study guides, then find/replaces marker comments in selected HTML
 * files so the numbers stay accurate without manual edits.
 *
 * Marker format (round-tripped on every run):
 *
 *   <!-- STAT:guides    -->55<!-- /STAT -->
 *   <!-- STAT:resources -->17<!-- /STAT -->
 *   <!-- STAT:questions -->3,074<!-- /STAT -->
 *   <!-- STAT:topics    -->67+<!-- /STAT -->
 *   <!-- STAT:chapters  -->16<!-- /STAT -->
 *
 * All counts are exact except `topics`, which carries a "+" because it
 * counts Quiz Bank topics that have questions, not every topic listed.
 * Run this after shipping a guide or a batch of questions.
 *
 * Usage:
 *   node scripts/update-stats.js
 *
 * Add new placements by inserting marker comments anywhere in any HTML
 * file under the project root — the regex below scans them all.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WEBSITE_ROOT = path.resolve(__dirname, '..');
const LEARN_REPO = path.resolve(WEBSITE_ROOT, '..', 'nursing-collective-learn');

// ── Counting ─────────────────────────────────────────────────────────

function countQuizBankQuestions() {
    const bundle = path.join(LEARN_REPO, 'data', 'questions-bundle.js');
    if (!fs.existsSync(bundle)) {
        console.warn(`  ! Quiz Bank bundle not found at ${bundle} — skipping`);
        return 0;
    }
    const sandbox = { QUIZ_BANK_QUESTIONS: [] };
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(bundle, 'utf8'), sandbox);
    return sandbox.QUIZ_BANK_QUESTIONS.length;
}

function countPerGuideQuestions() {
    const dir = path.join(WEBSITE_ROOT, 'guides', 'quiz', 'data');
    if (!fs.existsSync(dir)) return 0;
    let total = 0;
    for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith('.js')) continue;
        const content = fs.readFileSync(path.join(dir, f), 'utf8');
        // Count stems, not IDs. Most files number their questions (`id: 1,`)
        // but some use string keys (`id: "thyroid_001",`), and counting IDs
        // silently dropped all 100 thyroid-disorders questions. Every question
        // has exactly one `stem:` whatever its ID style.
        total += (content.match(/^\s+stem:/gm) || []).length;
    }
    return total;
}

function loadRegistry() {
    const reg = path.join(LEARN_REPO, 'data', 'registry.js');
    if (!fs.existsSync(reg)) return null;
    const src = fs.readFileSync(reg, 'utf8');
    const fn = new Function(`${src}\nreturn QUIZ_BANK_REGISTRY;`);
    return fn();
}

function countFreeResources() {
    // Everything under resources/ is reachable without a subscription:
    // content-gate.js only gates /guides/, so nothing here sits behind the
    // paywall.
    const dir = path.join(WEBSITE_ROOT, 'resources');
    if (!fs.existsSync(dir)) return 0;
    return fs.readdirSync(dir).filter((f) => f.endsWith('.html')).length;
}

function countBuiltGuides() {
    // A "built" guide is an HTML file in guides/ that isn't a quiz page
    // and isn't a partial/utility. Pragmatic: count *.html in guides/
    // root minus the obvious non-guide files.
    const dir = path.join(WEBSITE_ROOT, 'guides');
    if (!fs.existsSync(dir)) return 0;
    const exclude = new Set(['index.html']);
    let count = 0;
    for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith('.html')) continue;
        if (exclude.has(f)) continue;
        if (f.endsWith('-quiz.html')) continue;
        // `_design-preview-*.html` and friends are scratch files that ship
        // with the site but are not guides anyone can reach.
        if (f.startsWith('_')) continue;
        count++;
    }
    return count;
}

// ── Marker replacement ───────────────────────────────────────────────

function buildStats() {
    const registry = loadRegistry();
    const qbQuestions = countQuizBankQuestions();
    const guideQuestions = countPerGuideQuestions();
    const totalQuestions = qbQuestions + guideQuestions;
    const guides = countBuiltGuides();
    const resources = countFreeResources();

    let chapters = 0;
    let populatedTopics = 0;
    if (registry && Array.isArray(registry.chapters)) {
        chapters = registry.chapters.length;
        for (const ch of registry.chapters) {
            for (const t of (ch.topics || [])) {
                if (t.file) populatedTopics++;
            }
        }
    }

    return {
        // Exact. This used to round down to the nearest hundred so the figure
        // read as a confident floor, but rounding 3,074 to "3,000+" gives away
        // most of a batch, and the number is regenerated from the files anyway.
        questions: totalQuestions.toLocaleString('en-US'),
        // Exact counts elsewhere
        guides: String(guides),
        resources: String(resources),
        topics: `${populatedTopics}+`,
        chapters: String(chapters),
        // Detail values for the build log
        _detail: { qbQuestions, guideQuestions, totalQuestions, guides, resources, chapters, populatedTopics },
    };
}

function walkHtml(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) walkHtml(p, out);
        else if (entry.name.endsWith('.html')) out.push(p);
    }
    return out;
}

function updateFile(absPath, stats) {
    let text = fs.readFileSync(absPath, 'utf8');
    const before = text;
    // Marker pattern: <!-- STAT:<key> -->ANY<!-- /STAT -->
    // Whitespace inside the opening comment is allowed for readability.
    text = text.replace(
        /<!--\s*STAT:([a-z]+)\s*-->[^<]*<!--\s*\/STAT\s*-->/g,
        (match, key) => {
            if (!(key in stats)) {
                console.warn(`  ! unknown STAT key "${key}" in ${path.relative(WEBSITE_ROOT, absPath)} — left unchanged`);
                return match;
            }
            return `<!-- STAT:${key} -->${stats[key]}<!-- /STAT -->`;
        }
    );
    if (text !== before) {
        fs.writeFileSync(absPath, text);
        return true;
    }
    return false;
}

// ── Driver ───────────────────────────────────────────────────────────

const stats = buildStats();
console.log('\nResolved stats:');
console.log(`  Quiz Bank: ${stats._detail.qbQuestions} questions`);
console.log(`  Per-guide: ${stats._detail.guideQuestions} questions`);
console.log(`  Total questions: ${stats._detail.totalQuestions} → display "${stats.questions}"`);
console.log(`  Built guides: ${stats.guides}`);
console.log(`  Free resources: ${stats.resources}`);
console.log(`  Populated topics: ${stats._detail.populatedTopics} → display "${stats.topics}"`);
console.log(`  Chapters: ${stats.chapters}`);

const htmlFiles = walkHtml(WEBSITE_ROOT);
let touched = 0;
for (const f of htmlFiles) {
    if (updateFile(f, stats)) {
        console.log(`  ✓ updated ${path.relative(WEBSITE_ROOT, f)}`);
        touched++;
    }
}
console.log(`\n${touched ? '✓' : '·'} ${touched} file${touched === 1 ? '' : 's'} updated.\n`);
