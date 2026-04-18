/**
 * UTI & Pyelonephritis Quiz — Question Data
 * NCLEX-style questions covering lower UTI, pyelonephritis, CAUTI,
 * urosepsis, and patient education.
 */

/* exported urinaryTractInfectionsQuizData */
var urinaryTractInfectionsQuizData = {
    guideName: "UTI & Pyelonephritis",
    guideSlug: "urinary-tract-infections",
    category: "Medical-Surgical Nursing",
    categoryColor: "#f4a535",
    estimatedMinutes: 16,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "recall",
            stem: "A 26-year-old woman reports 2 days of burning with urination, urinary frequency every hour, urgency, and suprapubic pressure. She is afebrile, has no back pain, and no CVA tenderness. Which diagnosis is most likely?",
            options: [
                { id: "a", text: "Pyelonephritis" },
                { id: "b", text: "Lower urinary tract infection (cystitis)" },
                { id: "c", text: "Urolithiasis" },
                { id: "d", text: "Urosepsis" }
            ],
            correct: "b",
            rationale: {
                correct: "Dysuria, frequency, urgency, and suprapubic pressure without fever, flank pain, or CVA tenderness is the classic lower UTI presentation.",
                a: "Pyelonephritis adds fever, chills, flank pain, and CVA tenderness — none described here.",
                c: "Urolithiasis typically presents with severe colicky flank pain radiating to the groin, often with hematuria.",
                d: "Urosepsis requires systemic signs (hypotension, tachycardia, altered mental status) — she has none."
            },
            testTakingTip: "No fever + no flank pain + no CVA tenderness = lower tract. This is the exam distinction.",
            guideSection: "Section 3 — Lower UTI",
            guideSectionId: "lower-uti"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is admitted with suspected pyelonephritis. Which assessment finding would the nurse expect?",
            options: [
                { id: "a", text: "Suprapubic tenderness only" },
                { id: "b", text: "Costovertebral angle tenderness with fever and chills" },
                { id: "c", text: "Hematuria without pain" },
                { id: "d", text: "Nocturia without systemic symptoms" }
            ],
            correct: "b",
            rationale: {
                correct: "CVA tenderness, fever, chills, flank pain, nausea, and malaise are the classic upper-tract findings in pyelonephritis.",
                a: "Suprapubic tenderness alone points to a lower UTI.",
                c: "Painless hematuria is more concerning for malignancy or glomerular disease, not pyelonephritis.",
                d: "Nocturia without systemic signs would point to a lower UTI or BPH, not pyelonephritis."
            },
            testTakingTip: "Fever + flank pain + CVA tenderness = upper UTI. Memorize this triad.",
            guideSection: "Section 4 — Pyelonephritis",
            guideSectionId: "pyelonephritis"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which finding on urinalysis would most strongly suggest pyelonephritis rather than cystitis?",
            options: [
                { id: "a", text: "Positive nitrites" },
                { id: "b", text: "Positive leukocyte esterase" },
                { id: "c", text: "WBC casts" },
                { id: "d", text: "Trace glucose" }
            ],
            correct: "c",
            rationale: {
                correct: "WBC (leukocyte) casts form in renal tubules and specifically suggest upper-tract infection (pyelonephritis).",
                a: "Nitrites suggest gram-negative bacteriuria but occur in both lower and upper UTIs.",
                b: "Leukocyte esterase indicates WBCs in urine but doesn't localize upper vs lower tract.",
                d: "Glucose is unrelated to infection localization."
            },
            testTakingTip: "Casts form in tubules. WBC casts = kidney-level inflammation.",
            guideSection: "Section 5 — Lower vs Upper UTI",
            guideSectionId: "compare"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with uncomplicated cystitis asks how long they'll be on antibiotics. The best nursing response is:",
            options: [
                { id: "a", text: "\"Just until your symptoms resolve — usually 2 days.\"" },
                { id: "b", text: "\"You'll be on oral antibiotics for 5 to 7 days. Finish the full course even if you feel better.\"" },
                { id: "c", text: "\"You'll be on IV antibiotics for 2 weeks.\"" },
                { id: "d", text: "\"A single dose is usually enough — stop when the bottle's empty.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Uncomplicated lower UTI is treated with oral antibiotics for 5–7 days. Completing the full course prevents recurrence and resistance.",
                a: "Stopping when symptoms resolve is how recurrent and resistant infections develop.",
                c: "IV × 2 weeks is pyelonephritis, not uncomplicated cystitis.",
                d: "Single-dose therapy is not standard for most uncomplicated UTIs in adults and would not be appropriate teaching."
            },
            testTakingTip: "Lower UTI = 5–7 days oral. Pyelonephritis = ~2 weeks, often IV.",
            guideSection: "Section 3 — Lower UTI",
            guideSectionId: "lower-uti"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is preparing to collect a urine specimen. Which statement about urinalysis and urine culture is correct?",
            options: [
                { id: "a", text: "Both should be collected in the same container." },
                { id: "b", text: "They should be collected in two separate containers." },
                { id: "c", text: "Cultures are collected only after antibiotics are started." },
                { id: "d", text: "A catheter specimen should always be taken from the drainage bag." }
            ],
            correct: "b",
            rationale: {
                correct: "UA and urine culture go in two separate containers. Culture should be obtained before antibiotics whenever possible.",
                a: "Same-container collection is not standard practice.",
                c: "Cultures are ideally collected before antibiotics so the organism can be identified.",
                d: "Catheter specimens should be collected from the sampling port, never from the drainage bag (contaminated)."
            },
            testTakingTip: "Collect cultures BEFORE starting antibiotics. Two containers. Sample from the port, not the bag.",
            guideSection: "Section 1 — Kidney & Urinary Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "An 82-year-old admitted for pneumonia is now drowsier than at admission, with new incontinence and anorexia. VS are stable, no cough worsening. Which order would the nurse anticipate first?",
            options: [
                { id: "a", text: "CT head" },
                { id: "b", text: "Psychiatric consult for new-onset dementia" },
                { id: "c", text: "Urinalysis and urine culture" },
                { id: "d", text: "Electroencephalogram" }
            ],
            correct: "c",
            rationale: {
                correct: "New confusion, lethargy, and incontinence in an older adult are classic atypical UTI presentations. A UA + culture screens for this quickly and cheaply.",
                a: "CT head is appropriate if UA is negative or focal neuro signs appear; UTI is the higher-yield first step.",
                b: "Acute cognitive changes are not diagnosed as new dementia without ruling out reversible causes first.",
                d: "EEG is reserved for suspected seizures."
            },
            testTakingTip: "In older adults: new confusion, falls, or incontinence = rule out UTI first.",
            guideSection: "Section 3 — Lower UTI",
            guideSectionId: "lower-uti"
        },
        {
            id: 7,
            type: "multiple",
            subtype: "select-all",
            difficulty: "application",
            stem: "Which patients are at increased risk for lower UTI? Select all that apply.",
            options: [
                { id: "a", text: "A 60-year-old with type 2 diabetes and neuropathy" },
                { id: "b", text: "A 28-year-old in her second pregnancy" },
                { id: "c", text: "A 70-year-old with BPH and post-void residual of 180 mL" },
                { id: "d", text: "A 35-year-old marathon runner with no medical history" },
                { id: "e", text: "A 52-year-old with MS and a chronic indwelling catheter" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Diabetes, pregnancy, obstruction/incomplete emptying (BPH), neurogenic bladder, and indwelling catheters are all major UTI risk factors. A healthy adult without risk modifiers (D) is not at elevated risk.",
                a: "Diabetes + neuropathy = high glucose in urine + incomplete emptying.",
                b: "Pregnancy changes urinary tract tone and increases UTI and pyelonephritis risk.",
                c: "BPH causes retention and stasis.",
                d: "Healthy without modifiers — baseline risk only.",
                e: "Neurogenic bladder + catheter = classic high-risk combination."
            },
            testTakingTip: "Anything that causes stasis, sugar in urine, or bypasses defenses = UTI risk.",
            guideSection: "Section 2 — How Infection Ascends",
            guideSectionId: "pathway"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is teaching a woman about preventing recurrent UTIs. Which statement indicates the teaching was effective?",
            options: [
                { id: "a", text: "\"I'll limit my fluids to reduce how often I have to go.\"" },
                { id: "b", text: "\"I'll hold my urine during the day so I can sleep through the night.\"" },
                { id: "c", text: "\"I'll wipe from front to back and urinate after intercourse.\"" },
                { id: "d", text: "\"I'll take a warm bubble bath every evening.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "Wiping front to back prevents fecal bacteria from reaching the urethra; voiding after intercourse flushes bacteria introduced during sex.",
                a: "Fluid restriction concentrates urine and promotes bacterial growth — opposite of what's needed.",
                b: "Holding urine allows bacteria to multiply in a stagnant bladder.",
                d: "Bubble baths irritate the urethra and are associated with UTIs."
            },
            testTakingTip: "Hydrate, void regularly (q2–3h), void after sex, wipe front to back, skip bubble baths.",
            guideSection: "Section 8 — Prevention & Education",
            guideSectionId: "education"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with pyelonephritis is receiving IV antibiotics. Which finding most strongly indicates progression to urosepsis?",
            options: [
                { id: "a", text: "Temperature 38.2°C and mild flank pain" },
                { id: "b", text: "BP 82/48, HR 124, new confusion, urine output 15 mL/hr" },
                { id: "c", text: "WBC 12,000, bacteriuria on UA" },
                { id: "d", text: "Burning with urination and cloudy urine" }
            ],
            correct: "b",
            rationale: {
                correct: "Hypotension, tachycardia, altered mental status, and low urine output (<0.5 mL/kg/hr) are SIRS/sepsis criteria and warrant emergent sepsis bundle activation.",
                a: "Low-grade fever and flank pain are expected in pyelonephritis without indicating systemic decompensation.",
                c: "Mild leukocytosis and bacteriuria reflect the underlying infection, not progression to sepsis.",
                d: "These are lower-tract symptoms and do not indicate sepsis."
            },
            testTakingTip: "Hypotension + tachycardia + altered mental status + oliguria = sepsis. Call rapid response.",
            guideSection: "Section 7 — Urosepsis",
            guideSectionId: "urosepsis"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which action is the single most effective way to prevent catheter-associated UTI (CAUTI)?",
            options: [
                { id: "a", text: "Cleanse the perineum with chlorhexidine daily" },
                { id: "b", text: "Change the drainage bag every shift" },
                { id: "c", text: "Remove the catheter as soon as it is no longer needed" },
                { id: "d", text: "Irrigate the catheter with sterile saline every 4 hours" }
            ],
            correct: "c",
            rationale: {
                correct: "Every day a catheter is in place raises infection risk. Daily necessity review and early removal is the most effective CAUTI prevention.",
                a: "Daily soap-and-water peri-care is sufficient; special antiseptics are not required.",
                b: "Routine bag changes are not recommended; keep the system closed.",
                d: "Routine catheter irrigation is not indicated and introduces infection risk."
            },
            testTakingTip: "Best CAUTI prevention = don't have a catheter. Second best = take it out early.",
            guideSection: "Section 6 — CAUTI",
            guideSectionId: "cauti"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "recall",
            stem: "Which urinary finding is defined as urine output less than 50 mL in 24 hours?",
            options: [
                { id: "a", text: "Oliguria" },
                { id: "b", text: "Dysuria" },
                { id: "c", text: "Anuria" },
                { id: "d", text: "Polyuria" }
            ],
            correct: "c",
            rationale: {
                correct: "Anuria is defined as urine output less than 50 mL in 24 hours — a kidney emergency.",
                a: "Oliguria is reduced urine output (typically <0.5 mL/kg/hr) but still present.",
                b: "Dysuria is painful or difficult urination.",
                d: "Polyuria is excessive urine output."
            },
            testTakingTip: "Anuria <50 mL/24h. Oliguria <0.5 mL/kg/hr. Memorize the definitions.",
            guideSection: "Section 1 — Kidney & Urinary Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient taking phenazopyridine (Pyridium) for UTI discomfort calls concerned that their urine is bright orange. Which is the best nursing response?",
            options: [
                { id: "a", text: "\"Stop the medication immediately and come in.\"" },
                { id: "b", text: "\"This is an expected harmless effect of the medication.\"" },
                { id: "c", text: "\"This is a sign of kidney failure — go to the ED.\"" },
                { id: "d", text: "\"Drink cranberry juice to clear the color.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Phenazopyridine is a urinary analgesic that harmlessly turns urine orange or red. Patients should be warned in advance.",
                a: "Orange urine is expected, not a side effect requiring discontinuation.",
                c: "This is not a sign of kidney failure.",
                d: "Cranberry juice will not affect the color change from phenazopyridine."
            },
            testTakingTip: "Pyridium → orange/red urine. Warn patients in advance so they don't panic.",
            guideSection: "Section 3 — Lower UTI",
            guideSectionId: "lower-uti"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is about to go home on a 7-day oral antibiotic for cystitis. Which instruction is most important?",
            options: [
                { id: "a", text: "\"Stop the medication as soon as symptoms improve to avoid side effects.\"" },
                { id: "b", text: "\"Take the full course even if you feel better after 2 days.\"" },
                { id: "c", text: "\"Drink no more than 4 glasses of water per day so the medicine isn't diluted.\"" },
                { id: "d", text: "\"Void every 6 hours to allow medication to concentrate.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Completing the full course prevents recurrence and antibiotic resistance — a cornerstone teaching point for UTI.",
                a: "Stopping early is the single most common cause of recurrent UTI and resistance.",
                c: "Patients should drink 8–10 glasses of water daily; dilution is not a concern.",
                d: "Voiding every 2–3 hours is recommended, not every 6."
            },
            testTakingTip: "Finish the antibiotic course. Drink 8–10 glasses. Void q2–3h.",
            guideSection: "Section 8 — Prevention & Education",
            guideSectionId: "education"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with pyelonephritis completes a 2-week course of antibiotics. Which follow-up action should the nurse expect to reinforce?",
            options: [
                { id: "a", text: "Repeat urine culture 2 weeks after antibiotics end to confirm clearance" },
                { id: "b", text: "No follow-up is needed if symptoms have resolved" },
                { id: "c", text: "A renal ultrasound every 6 months for life" },
                { id: "d", text: "Daily antibiotics indefinitely to prevent recurrence" }
            ],
            correct: "a",
            rationale: {
                correct: "Follow-up urine culture 2 weeks after completing antibiotics confirms clearance of infection — standard practice for pyelonephritis.",
                a: "Correct answer.",
                b: "Follow-up cultures are standard after pyelonephritis due to the risk of persistent infection and scarring.",
                c: "Routine renal ultrasound every 6 months is not indicated unless structural issues are suspected.",
                d: "Indefinite prophylactic antibiotics are not standard."
            },
            testTakingTip: "Pyelonephritis → repeat culture 2 weeks after antibiotics to confirm cure.",
            guideSection: "Section 4 — Pyelonephritis",
            guideSectionId: "pyelonephritis"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is caring for a patient with a newly placed indwelling urinary catheter. Which action BEST prevents CAUTI?",
            options: [
                { id: "a", text: "Keep the drainage bag on the bed next to the patient" },
                { id: "b", text: "Disconnect the catheter from the bag nightly to irrigate" },
                { id: "c", text: "Keep the drainage bag below bladder level and the system closed" },
                { id: "d", text: "Clamp the catheter between voiding sessions" }
            ],
            correct: "c",
            rationale: {
                correct: "Keeping the bag below the bladder prevents retrograde flow of urine back into the bladder; maintaining a closed system prevents bacterial entry.",
                a: "Placing the bag on the bed allows retrograde flow and contaminates the system.",
                b: "Disconnecting the catheter breaks the closed system and introduces infection risk.",
                d: "Intermittent clamping is not recommended for indwelling catheters."
            },
            testTakingTip: "Below bladder. Closed system. No dependent loops. Out as soon as possible.",
            guideSection: "Section 6 — CAUTI",
            guideSectionId: "cauti"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which patient should the nurse see FIRST?",
            options: [
                { id: "a", text: "A 30-year-old with cystitis on day 2 of oral antibiotics, now afebrile with residual mild dysuria" },
                { id: "b", text: "An 82-year-old with pyelonephritis, BP 88/50, HR 118, RR 24, new confusion" },
                { id: "c", text: "A 45-year-old who just voided after Pyridium dose with orange-colored urine" },
                { id: "d", text: "A postmenopausal woman asking when she should void after sex" }
            ],
            correct: "b",
            rationale: {
                correct: "Hypotension, tachycardia, tachypnea, and altered mental status meet SIRS/sepsis criteria — likely urosepsis. See this patient first.",
                a: "Resolving cystitis on treatment is stable.",
                c: "Orange urine from Pyridium is expected and non-urgent.",
                d: "Educational question, non-urgent."
            },
            testTakingTip: "Prioritize: unstable vitals + altered mental status = urosepsis until proven otherwise.",
            guideSection: "Section 7 — Urosepsis",
            guideSectionId: "urosepsis"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "recall",
            stem: "Which lab value best reflects glomerular filtration and kidney function?",
            options: [
                { id: "a", text: "Blood urea nitrogen (BUN)" },
                { id: "b", text: "Serum creatinine" },
                { id: "c", text: "Serum sodium" },
                { id: "d", text: "Urine specific gravity" }
            ],
            correct: "b",
            rationale: {
                correct: "Serum creatinine most directly reflects GFR because it is produced at a relatively constant rate and excreted almost entirely by glomerular filtration.",
                a: "BUN is useful but is affected by hydration, protein intake, and GI bleeding — less specific than creatinine.",
                c: "Sodium reflects fluid/volume status rather than kidney function directly.",
                d: "Specific gravity reflects urine concentration, not GFR."
            },
            testTakingTip: "Creatinine = most specific for kidney function. BUN is sensitive but non-specific.",
            guideSection: "Section 1 — Kidney & Urinary Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A pregnant patient in her second trimester is diagnosed with pyelonephritis. Which statement about her management is MOST accurate?",
            options: [
                { id: "a", text: "Pregnancy decreases the risk of pyelonephritis" },
                { id: "b", text: "She will most likely be admitted for IV antibiotics and close monitoring" },
                { id: "c", text: "A short course of oral antibiotics is sufficient" },
                { id: "d", text: "Pyelonephritis does not affect pregnancy outcomes" }
            ],
            correct: "b",
            rationale: {
                correct: "Pyelonephritis in pregnancy typically requires inpatient IV antibiotics and monitoring due to the risk of preterm labor, sepsis, and renal complications.",
                a: "Pregnancy increases the risk of pyelonephritis because of urinary stasis from ureteral dilation.",
                c: "Short oral courses are used for uncomplicated cystitis, not pregnancy-related pyelonephritis.",
                d: "Pyelonephritis increases the risk of preterm labor and low birth weight."
            },
            testTakingTip: "Pyelonephritis in pregnancy = admit, IV antibiotics, monitor for preterm labor.",
            guideSection: "Section 4 — Pyelonephritis",
            guideSectionId: "pyelonephritis"
        }
    ]
};
