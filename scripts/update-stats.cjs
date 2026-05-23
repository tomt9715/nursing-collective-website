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
 *   <!-- STAT:guides    -->29<!-- /STAT -->
 *   <!-- STAT:questions -->2,500+<!-- /STAT -->
 *   <!-- STAT:topics    -->32+<!-- /STAT -->
 *   <!-- STAT:chapters  -->16<!-- /STAT -->
 *
 * Numbers round down to the nearest hundred (with "+") for questions
 * so the value reads as a confident floor rather than a precise count
 * that will go stale between batches. Other stats are exact.
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
        // Per-guide questions use numeric IDs (`id: 1, id: 2, ...`)
        total += (content.match(/^\s+id:\s*\d+,/gm) || []).length;
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
        count++;
    }
    return count;
}

function roundDownHundred(n) {
    return Math.floor(n / 100) * 100;
}

// ── Marker replacement ───────────────────────────────────────────────

function buildStats() {
    const registry = loadRegistry();
    const qbQuestions = countQuizBankQuestions();
    const guideQuestions = countPerGuideQuestions();
    const totalQuestions = qbQuestions + guideQuestions;
    const guides = countBuiltGuides();

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
        // Question count: round down to nearest 100, append "+"
        questions: `${roundDownHundred(totalQuestions).toLocaleString()}+`,
        // Exact counts elsewhere
        guides: String(guides),
        topics: `${populatedTopics}+`,
        chapters: String(chapters),
        // Detail values for the build log
        _detail: { qbQuestions, guideQuestions, totalQuestions, guides, chapters, populatedTopics },
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
