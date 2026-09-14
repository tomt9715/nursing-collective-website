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
 *   node scripts/check-questions.cjs --no-acronyms   # skip the acronym rule
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'guides', 'quiz', 'data');
const GUIDES_DIR = path.join(ROOT, 'guides');

const MIN_QUESTIONS = 15; // CLAUDE.md: "Minimum 15-20 questions"

// Acronym rule: the first time an acronym appears in each part of a question
// (the stem, each option, each rationale entry, the tip) it must be written
// "expansion (ACRONYM)". Later repeats in the same part may stay short.
//
// Abbreviations every student learns in week one are exempt, as is NCLEX,
// which is a name rather than something to spell out.
const ACRONYM_EXEMPT = new Set([
    'IV', 'IM', 'PO', 'BP', 'HR', 'RR', 'ICU', 'ED', 'NPO', 'PRN', 'RN', 'CPR', 'ECG', 'EKG',
    'NCLEX', 'DNA', 'RNA',
]);
// Chemical formulas and names built from a letter and a number (O2, CO2, B12,
// T4, H2, CD4) are symbols, not acronyms.
const SYMBOL = /^(?:O2|CO2|SpO2|SaO2|FiO2|PaO2|PaCO2|HCO3|H2O|[A-Z]{1,2}\d{1,2}|V\d{1,2}R|[A-Z]\d{3}|P2Y12|aV[RLF]|HCl|KOH|mIU)$/;
// Capitalised English words used for emphasis ("NOT", "FIRST", "PRIORITY").
// Words of six letters or more in capitals are treated as emphasis unless
// they are listed here as real acronyms.
const LONG_ACRONYMS = new Set(['SIADH', 'NSTEMI', 'NIHSS', 'CAKUT', 'PAINAD', 'PERRLA', 'TAPVR', 'MSAFP', 'HHIDS', 'PSAGN']);
const EMPHASIS = new Set((
    'ALL AND ANY ARE AT AWAY BE BEST BOTH CALL CAN COLD DO DOES DON DOSE DOWN DROP DRY EVER FAR FAST FIRST FIX ' +
    'FLAT FOR FOUR FREE FROM GAIN GIVE GO GOOD HIGH HOLD HOT IF IN IS KILL LABS LAST LATE LEAST LEG LESS LIGHT ' +
    'LIMIT LINE LOW LOWER MAJOR MILD MINOR MOIST MORE MOST MUST NEVER NEW NO NON NOT NOW OF ON ONE ONLY OPEN OR ' +
    'ORAL OTHER OUT PAIN PRONE RAW REST RISK SAME SEE SHARP SIDE SKIN SLOW SORE SPEED STEP STOP THE THREE TIME ' +
    'TO TWO UN UP WARM WATER WHICH WHO WHY WILL WITH WORSE WRONG YES AM TUMS AVOID CAUSE BLACK BOX BURN COMA ' +
    'DAILY FEVER LIVER NERVE PAINFUL ADULT CHILD ALONE LARGE HEAVY GOLD NORMAL AGITATED STORM SCAN RACE VOICE ' +
    'THIRD FIFTH AFTER NEEDS KNOWN FOCAL UPPER HARM FOLDS FIXED CASES BELOW COOL CLOTS BREAK EXACT ACUTE FATAL ' +
    'LIVE STAT ASAP BASED NON'
).split(' '));
// Names that are written in capitals but have no expansion to give: brand
// names, eponyms, ECG waveform labels (the PR interval, the ST segment) and
// haemoglobin types.
const NAMES = new Set([
    'EpiPen', 'RhoGAM', 'MedicAlert', 'QuantiFERON', 'DiGeorge',
    'PR', 'QRS', 'QT', 'QTc', 'ST', 'A1c', 'A1C', 'HbA1c', 'HbS', 'HbF', 'HbAS', 'ProAir',
]);
// Abbreviations whose letters do not come from the English words (Latin
// dosing terms, drug codes), so the spelled-out check cannot apply.
const NOT_FROM_ENGLISH = new Set(['BID', 'TID', 'QID', 'QHS', 'DDAVP', 'SSKI', 'D5W', 'D50W', 'D5NS']);
// Also catches acronyms that start in lower case (tPA, dsDNA) or with a
// number (6-MP).
const ACRONYM = /\b(?:\d+-)?(?:[A-Z][A-Za-z0-9]*[A-Z0-9][A-Za-z0-9]*|[a-z]{1,2}[A-Z]{2,}[a-z]?)(?:-[A-Z0-9]+)*\b/g;

function isAcronym(token) {
    if (ACRONYM_EXEMPT.has(token) || EMPHASIS.has(token)) return false;
    if (/^[IVX]+$/.test(token)) return false;                       // Roman numerals: type II, factor VIII
    if (/^Mc[A-Z]/.test(token) || NAMES.has(token)) return false;   // McBurney, EpiPen
    if (/[a-z]{3,}/.test(token)) return false;                      // HYPOthyroidism: emphasis inside a word
    // HIGH-RISK, FIRST-LINE: emphasised hyphenated words, not acronyms.
    const pieces = token.split('-');
    if (pieces.length > 1 && pieces.every((p) => p.length >= 3 && (EMPHASIS.has(p) || /^[A-Z]{6,}$/.test(p)))) return false;
    if (pieces.length > 1 && pieces.every((p) => /^[IVX]+$/.test(p) || SYMBOL.test(p))) return false;  // II-III, V1-V4
    if (SYMBOL.test(token)) return false;
    if (/^[A-Z]{6,}$/.test(token) && !LONG_ACRONYMS.has(token)) return false;
    return true;
}

/**
 * Whether the words just before "(ACRONYM)" plausibly expand it: the
 * acronym's letters must appear in order. Catches "arterial (PAD)" and
 * "definitive therapy (PCI)" without trying to judge the medicine.
 */
function spellsOut(acronym, before) {
    const words = before.replace(/\((?:anti-)?$/, '').split(/[()]/).pop().slice(-120).toLowerCase();
    let i = 0;
    for (const ch of acronym.toLowerCase().replace(/[^a-z]/g, '')) {
        i = words.indexOf(ch, i);
        if (i === -1) return false;
        i++;
    }
    return true;
}

/**
 * Acronyms in one block of text whose first use is not "expansion (ACRONYM)".
 * A question can list acronyms in `keepAcronyms` when spelling them out would
 * give away the answer, e.g. a stem asking what a mnemonic's letter stands for.
 */
function unexpandedAcronyms(text, keep = []) {
    const seen = new Set(keep);
    const bad = [];
    for (const m of text.matchAll(ACRONYM)) {
        const token = m[0];
        const key = token.replace(/s$/, '');   // UTIs counts as UTI
        if (!isAcronym(key) || seen.has(key)) continue;
        seen.add(key);
        const before = text.slice(0, m.index);
        const after = text.slice(m.index + token.length);
        const expanded = /[A-Za-z][^()]*\((?:anti-)?$/.test(before) && /^\)/.test(after);
        if (!expanded) bad.push(token);
        else if (!NOT_FROM_ENGLISH.has(key) && !spellsOut(key, before)) bad.push(`${token} (the words before it do not spell it out)`);
    }
    return bad;
}

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

        if (checkAcronyms) {
            const parts = [['stem', q.stem], ['tip', q.testTakingTip]];
            for (const o of q.options || []) parts.push([`option ${o.id}`, o.text]);
            if (q.rationale && typeof q.rationale === 'object') {
                for (const [k, v] of Object.entries(q.rationale)) parts.push([`rationale ${k}`, v]);
            }
            for (const [where, text] of parts) {
                if (typeof text !== 'string') continue;
                const bad = unexpandedAcronyms(text, q.keepAcronyms);
                if (bad.length) problems.push(`${at}: ${where} does not spell out ${bad.join(', ')}`);
            }
        }

        // A section link that points nowhere breaks "review in study guide".
        if (anchors && q.guideSectionId && !anchors.has(q.guideSectionId)) {
            problems.push(`${at}: guideSectionId "${q.guideSectionId}" is not an anchor in ${guideId}.html`);
        }
    }

    return { guideId, count: qs.length, problems };
}

const args = process.argv.slice(2);
const checkAcronyms = !args.includes('--no-acronyms');
const only = args.find((a) => !a.startsWith('--'));
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
