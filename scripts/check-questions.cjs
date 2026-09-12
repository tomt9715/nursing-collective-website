#!/usr/bin/env node
/**
 * Validate per-guide quiz files against TNC_QUESTION_STANDARDS.md.
 *
 * The rules in that document are mostly mechanical, so they can be checked
 * rather than eyeballed. This catches the ones that are: option count,
 * em-dashes, distractor length parity, rationale coverage, duplicate IDs,
 * and section links that point at anchors the guide does not have.
 *
 * What it cannot check is whether a question is clinically correct. That
 * still needs a human with a licence.
 *
 * Usage:
 *   node scripts/check-questions.cjs                 # every guide
 *   node scripts/check-questions.cjs heart-failure   # one guide
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'guides', 'quiz', 'data');
const GUIDES_DIR = path.join(ROOT, 'guides');

const MIN_QUESTIONS = 15; // CLAUDE.md: "Minimum 15-20 questions"

function loadQuestions(file) {
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
    const key = Object.keys(sandbox).find((k) => sandbox[k] && sandbox[k].questions);
    return key ? sandbox[key] : null;
}

/** Anchor IDs the guide page actually defines. */
function guideAnchors(guideId) {
    const p = path.join(GUIDES_DIR, `${guideId}.html`);
    if (!fs.existsSync(p)) return null;
    const html = fs.readFileSync(p, 'utf8');
    return new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
}

function checkFile(file) {
    const guideId = path.basename(file).replace('-questions.js', '');
    const problems = [];
    const data = loadQuestions(file);

    if (!data) return { guideId, count: 0, problems: ['could not load the question data'] };

    const qs = data.questions || [];
    const anchors = guideAnchors(guideId);
    const seenIds = new Set();

    if (qs.length < MIN_QUESTIONS) {
        problems.push(`only ${qs.length} questions (minimum is ${MIN_QUESTIONS})`);
    }

    for (const q of qs) {
        const at = `Q${q.id}`;

        if (seenIds.has(q.id)) problems.push(`${at}: duplicate id`);
        seenIds.add(q.id);

        // Matrix, ordering and select-all questions carry their own shapes.
        // The "exactly 4 options" rule is for single-answer questions; the
        // standards document does not cover select-all at all, and a
        // select-all needs more than four options to be worth asking.
        const choiceBased = !['matrix', 'ordering', 'sata'].includes(q.type);

        if (choiceBased) {
            if (!Array.isArray(q.options) || q.options.length !== 4) {
                problems.push(`${at}: ${q.options ? q.options.length : 0} options (must be exactly 4)`);
            } else {
                const correct = q.options.find((o) => o.id === q.correct);
                const wrong = q.options.filter((o) => o.id !== q.correct);
                if (!correct) {
                    problems.push(`${at}: correct answer "${q.correct}" is not one of the options`);
                } else if (wrong.length) {
                    const avg = wrong.reduce((n, o) => n + o.text.length, 0) / wrong.length;
                    if (correct.text.length > avg * 1.5) {
                        problems.push(
                            `${at}: length giveaway - correct answer is ${(correct.text.length / avg).toFixed(2)}x ` +
                            `the average distractor (limit 1.5x)`
                        );
                    }
                }
            }
        }

        // Rationale must explain the correct answer and each distractor.
        if (!q.rationale || !q.rationale.correct) {
            problems.push(`${at}: no rationale for the correct answer`);
        } else if (choiceBased && Array.isArray(q.options)) {
            for (const o of q.options) {
                if (o.id !== q.correct && !q.rationale[o.id]) {
                    problems.push(`${at}: no rationale for distractor "${o.id}"`);
                }
            }
        }

        // No em-dashes, anywhere.
        const text = JSON.stringify(q);
        if (text.includes('—')) problems.push(`${at}: contains an em-dash`);

        if (!q.stem) problems.push(`${at}: no stem`);

        // A section link that points nowhere breaks "review in study guide".
        if (anchors && q.guideSectionId && !anchors.has(q.guideSectionId)) {
            problems.push(`${at}: guideSectionId "${q.guideSectionId}" is not an anchor in ${guideId}.html`);
        }
    }

    return { guideId, count: qs.length, problems };
}

const only = process.argv[2];
const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('-questions.js'))
    .filter((f) => !only || f.startsWith(`${only}-questions`))
    .map((f) => path.join(DATA_DIR, f));

if (!files.length) {
    console.error(only ? `No question file for "${only}"` : 'No question files found');
    process.exit(1);
}

let failed = 0;
let totalQuestions = 0;
const short = [];

for (const f of files) {
    const { guideId, count, problems } = checkFile(f);
    totalQuestions += count;
    if (count < MIN_QUESTIONS) short.push(`${guideId} (${count})`);
    if (problems.length) {
        failed++;
        console.log(`\n✗ ${guideId} - ${count} questions`);
        for (const p of problems) console.log(`    ${p}`);
    }
}

console.log(
    `\n${failed ? '✗' : '✓'} ${files.length} files, ${totalQuestions} questions, ` +
    `${failed} with problems.`
);
if (short.length) console.log(`  below ${MIN_QUESTIONS}: ${short.length} - ${short.join(', ')}`);
process.exit(failed ? 1 : 0);
