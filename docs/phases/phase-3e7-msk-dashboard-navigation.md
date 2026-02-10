# Phase 3E-7 — Quiz Bank: MSK Questions + Dashboard + Navigation Integration

## Project Context

This is **The Nursing Collective** (thenursingcollective.pro) — a subscription nursing study guide library (Monthly/Semester/Lifetime tiers). 17 study guides. Stack: Python backend, vanilla HTML/CSS/JS, Bootstrap, Railway, Cloudflare R2, Stripe, Resend, Sentry.

Master roadmap: 15 chapters, 129 topics. Quiz bank: chapters → topics. Three question types: Single, Ordering, Matrix (no SATA).

## What's Already Been Done

**Sessions 1-11:** Site audit, content audit, template retrofit, weak guide fixes, all 17 guide quizzes.

**Session 12: Phase 3E-1 (COMPLETE)** — Quiz bank infrastructure.

**Sessions 13-17: Phase 3E-2 through 3E-6 (COMPLETE)**
Standalone quiz bank with:
- Infrastructure: `quiz-bank/quiz-bank.html`, `quiz-bank.js`, `quiz-bank.css`, `mastery.js`, `data/registry.js`
- Registry: all 15 chapters/129 topics with "Coming Soon" for topics without questions
- Quiz Hub: chapter-based browsing, mastery overview, quick start, custom builder
- Question types: Single, Ordering, Matrix (no SATA)
- Mastery: set-based (10/20), accuracy tiers, levels 0-10 per topic, chapter averages, localStorage, no daily cap
- **300 questions across 15 topics:**
  - Cardiovascular: 120 (20×6: HF, MI, Arrhythmias, HTN, CAD, PVD)
  - Respiratory: 120 (20×6: COPD, Asthma, Pneumonia, TB, O2 Therapy, Chest Tubes)
  - Neurological: 20 (Stroke)
  - GI: 20 (GI Bleeding)
  - Fundamentals: 20 (Assessment Skills)

## Task — Two Parts

### Part A: Write MSK Questions (40 questions)

Write **20 NEW questions per topic** for the final 2 topics = **40 questions**. Same data format. DIFFERENT scenarios than guide quizzes. FLAG uncertain questions.

**Mix per topic:** 10-12 single, 4-5 ordering, 4-5 matrix. Difficulty: 6-7 knowledge, 7-8 application, 5-6 analysis. **NO SATA.**

#### Fractures (20 questions) → `quiz-bank/data/musculoskeletal/fractures.js`

Cover broadly: Compartment syndrome across presentations (passive stretch pain, 5 P's, time sensitivity), cast care education, neurovascular assessment (CMS checks), fat embolism vs PE differentiation, traction types and care (Buck's, Russell's, skeletal), open vs closed priorities, pediatric Salter-Harris, non-accidental trauma screening, weight-bearing progression, pain management, external fixation pin care, open fracture wound care, rehabilitation, falls prevention, osteoporosis connection, hip fracture in elderly, discharge/home safety

**Good ordering questions:** Compartment syndrome response steps, new cast neurovascular assessment sequence, post-ORIF recovery milestones
**Good matrix questions:** Compartment syndrome vs DVT vs fat embolism differentiation, cast types and their characteristics, expected vs report immediately post-fracture findings

#### Hip & Knee Replacement (20 questions) → `quiz-bank/data/musculoskeletal/hip-knee.js`

Cover broadly: Posterior vs anterior precautions in daily activities, DVT prevention and recognition, mobility milestones by post-op day, pain management (multimodal, PCA, oral transition), surgical site assessment, CPM for knee, ROM goals, dental antibiotic prophylaxis, discharge readiness, home safety, equipment needs, return-to-activity timeline, complication recognition at various timeframes, delegation (PT vs RN vs UAP), cemented vs uncemented, bilateral considerations, comorbidity management, caregiver education

**Good ordering questions:** Post-op day 1 morning routine sequence, discharge teaching priority, DVT prevention protocol implementation
**Good matrix questions:** Posterior vs anterior hip precautions by activity, RN vs PT vs UAP task delegation, expected vs concerning findings by post-op day

Update `quiz-bank/data/registry.js` with file paths. List all questions for my review.

---

### Part B: Dashboard + Navigation Integration

#### Dashboard Integration

Add a "Quiz Bank" section to the existing user dashboard (`dashboard.html` / `dashboard-script.js`). Don't rebuild the dashboard — just add a new section:

- Compact mastery overview: average level, topics practiced count, topics mastered (Level 10) count, total answered, accuracy %
- Chapter-level summary bars (e.g., "❤️ Cardiovascular: Level 5 · 3/6 topics started")
- Expandable: click chapter to see individual topic mastery bars
- Study streak display
- Quick actions: "Continue Practicing →" / "Focus on Weak Spots →" linking to Quiz Hub
- If no mastery data yet: inviting empty state "Start your first quiz to track your mastery →"

#### Navigation

- Add "Quiz Bank" to the main navbar on ALL HTML pages across the site
- Add to footer links on ALL HTML pages
- Add `quiz-bank.html` to `sitemap.xml`
- Quiz Bank link should be visually prominent — major feature

#### Content Gating Verification

- Verify Quiz Hub is VISIBLE to non-subscribers (selling point — full chapter structure, 129 topics, "Coming Soon")
- Verify starting a quiz requires active subscription (`content-gate.js`)
- Non-subscriber clicks "Start Quiz" → subscription prompt, not broken page

---

## Deliverables

Commit questions, dashboard, navigation, and content gating separately.

**Final quiz bank totals at completion: 340 questions across 17 topics + ~140 guide quiz questions = ~480 practice questions.**
