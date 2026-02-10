# Phase 3E-6 — Quiz Bank: Neuro + GI + Fundamentals (Stroke, GI Bleeding, Assessment Skills)

## Project Context

This is **The Nursing Collective** (thenursingcollective.pro) — a subscription nursing study guide library (Monthly/Semester/Lifetime tiers). 17 study guides. Stack: Python backend, vanilla HTML/CSS/JS, Bootstrap, Railway, Cloudflare R2, Stripe, Resend, Sentry.

Master roadmap: 15 chapters, 129 topics. Quiz bank: chapters → topics, mastery 0-10.

## What's Already Been Done

**Sessions 1-11:** All site/content work + 17 guide quizzes. SATA → Ordering + Matrix.

**Session 12: Phase 3E-1 (COMPLETE)** — Quiz bank infrastructure.

**Sessions 13-16: Phase 3E-2 through 3E-5 (COMPLETE)** — 120 Cardiovascular (20×6) + 120 Respiratory (20×6) = 240 total.

**Quiz bank totals so far:** 240 questions across 12 topics.

## Task

Write **20 NEW questions per topic** for 3 topics = **60 questions**. Same data format. DIFFERENT scenarios than guide quizzes. FLAG uncertain questions.

## Mix per topic:
- 10-12 single, 4-5 ordering, 4-5 matrix
- Difficulty: 6-7 knowledge, 7-8 application, 5-6 analysis
- **NO SATA**

---

## Stroke (20 questions) → `quiz-bank/data/neurological/stroke.js`

Cover broadly: BE-FAST in varied/ambiguous presentations, tPA with complex contraindications, ischemic vs hemorrhagic differentiation, BP management across all scenarios (specific targets), NIHSS application, thrombectomy eligibility/windows, post-tPA monitoring (q15min neuro checks, bleeding), dysphagia screening before oral intake, positioning (HOB for ischemic vs hemorrhagic), secondary prevention (anticoagulation for A-fib, antiplatelets, statins, lifestyle), rehabilitation, aphasia communication, caregiver education, posterior circulation stroke, pediatric stroke (sickle cell), hemorrhagic conversion

**Good ordering questions:** Acute stroke response sequence, tPA administration checklist, post-stroke rehabilitation progression
**Good matrix questions:** Ischemic vs hemorrhagic characteristics and treatment, tPA inclusion vs exclusion criteria, expected vs concerning post-tPA findings

---

## GI Bleeding (20 questions) → `quiz-bank/data/gi/gi-bleeding.js`

Cover broadly: Upper vs lower differentiation in ambiguous cases, hemorrhagic shock classes (I-IV) with vitals, fluid resuscitation priorities (2 large bore IVs, crystalloid vs blood), transfusion triggers, initial Hgb misleading, Glasgow-Blatchford, NG tube lavage findings, endoscopy prep/post-procedure, variceal bleeding (octreotide, tamponade, banding), PPI timing, Mallory-Weiss vs ulcer, medication holds (NSAIDs, anticoagulants), monitoring (I&O, serial H&H), recurrence prevention, discharge criteria, pediatric (Meckel's, intussusception), delegation

**Good ordering questions:** Active GI bleed response sequence, hemorrhagic shock resuscitation steps, endoscopy preparation
**Good matrix questions:** Upper vs lower GI bleeding characteristics, hemorrhagic shock class I-IV vital sign patterns, expected vs notify provider findings post-endoscopy

---

## Assessment Skills (20 questions) → `quiz-bank/data/fundamentals/assessment-skills.js`

Cover broadly: GCS scoring varied presentations (calculate, trending, significance), Braden Scale assessment and interventions by risk, head-to-toe systematic approach with priorities, vital signs across age groups (pediatric, adult, geriatric), SBAR scenarios (construct, identify missing), pain tool selection (verbal, nonverbal, sedated, pediatric, cognitively impaired), wound assessment and documentation (staging, measurement), documentation formats (SBAR, DAR, SOAP), focused vs comprehensive decisions, abnormal escalation (rapid response, reassess, notify), cultural considerations, mental status assessment, delegation (RN vs LPN vs UAP), Cushing's Triad, pupil assessment (PERRLA)

**Good ordering questions:** SBAR communication construction, rapid response escalation sequence, head-to-toe assessment priority
**Good matrix questions:** Pain assessment tool by patient type, normal vs abnormal vital signs by age, documentation format by situation type

---

## Deliverables

Update `quiz-bank/data/registry.js` with all new file paths. List all questions for my review. Commit when done.
