/**
 * Pituitary & Hypothalamus Disorders Quiz — Question Data
 * 10 NCLEX-style questions: 5 Single, 2 Priority, 1 Ordering, 1 Matrix, 1 Single
 * High-yield focus: SIADH vs DI, transsphenoidal surgery, medications, lab interpretation, acromegaly
 */

/* exported pituitaryDisordersQuizData */
var pituitaryDisordersQuizData = {
    guideName: "Pituitary & Hypothalamus Disorders",
    guideSlug: "pituitary-disorders",
    category: "Endocrine",
    categoryColor: "#0EA5E9",
    estimatedMinutes: 15,
    questions: [
        // ============================================================
        // Q1: SIADH vs DI Lab Interpretation (Knowledge)
        // ============================================================
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient's lab results show: serum sodium 118 mEq/L, serum osmolality 248 mOsm/kg, urine osmolality 450 mOsm/kg, and urine specific gravity 1.035. Which condition do these results indicate?",
            options: [
                { id: "a", text: "Diabetes insipidus" },
                { id: "b", text: "SIADH (Syndrome of Inappropriate ADH)" },
                { id: "c", text: "Diabetes mellitus" },
                { id: "d", text: "Adrenal insufficiency" }
            ],
            correct: "b",
            rationale: {
                correct: "This is a classic SIADH pattern: LOW serum sodium (118 mEq/L — dilutional hyponatremia), LOW serum osmolality (248 — dilute blood), HIGH urine osmolality (450 — concentrated urine), and HIGH urine specific gravity (1.035 — concentrated urine). The body is retaining too much water due to excess ADH, diluting the serum while concentrating the urine.",
                a: "Diabetes insipidus would show the OPPOSITE pattern: HIGH serum sodium (>145), HIGH serum osmolality (>295), LOW urine osmolality (<300), and LOW urine specific gravity (<1.005). DI produces massive amounts of dilute urine.",
                c: "Diabetes mellitus would not cause this electrolyte pattern. DM is characterized by hyperglycemia, not hyponatremia with concentrated urine.",
                d: "While adrenal insufficiency can cause hyponatremia, it would not produce the high urine osmolality with this degree of hyponatremia. The combination of very low serum osmolality with concentrated urine is the hallmark of SIADH."
            },
            testTakingTip: "SIADH: serum values are LOW (dilute blood), urine values are HIGH (concentrated urine). DI: serum values are HIGH (concentrated blood), urine values are LOW (dilute urine). They are EXACT OPPOSITES. Check sodium + urine concentration to differentiate instantly.",
            guideSection: "Section 4 — SIADH vs DI Comparison",
            guideSectionId: "siadh-vs-di"
        },

        // ============================================================
        // Q2: Post-Transsphenoidal CSF Leak (Analysis — Priority)
        // ============================================================
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient is 24 hours post-transsphenoidal hypophysectomy. The nurse observes constant clear drainage from the patient's nose, and the patient reports a severe headache that worsens when sitting upright. What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Obtain a specimen of the nasal drainage and test it for glucose" },
                { id: "b", text: "Encourage the patient to blow their nose gently to clear the drainage" },
                { id: "c", text: "Notify the surgeon immediately — this may be a CSF leak" },
                { id: "d", text: "Apply a nasal decongestant spray to reduce the drainage" }
            ],
            correct: "c",
            rationale: {
                correct: "Clear nasal drainage with a postural headache (worse when upright) after transsphenoidal surgery is strongly suspicious for a CSF leak. This is the most serious post-operative complication because it creates a direct pathway for bacteria to enter the CNS, potentially causing meningitis. The surgeon must be notified immediately. While glucose testing can confirm CSF, the clinical picture warrants immediate notification rather than delaying to perform a test.",
                a: "Testing nasal drainage for glucose can help confirm CSF (CSF contains glucose while mucus does not), but the clinical presentation is already highly suspicious. Notifying the surgeon takes priority — you can test the drainage while waiting for the surgeon's response.",
                b: "Nose blowing is ABSOLUTELY CONTRAINDICATED after transsphenoidal surgery. It increases intracranial pressure and can worsen or create a CSF leak. This could be a life-threatening action.",
                d: "Nasal decongestant spray is not appropriate for CSF drainage and could mask the leak. The drainage is not from nasal congestion — it is potentially cerebrospinal fluid."
            },
            testTakingTip: "Post-transsphenoidal surgery: clear nasal drainage = CSF leak until proven otherwise. Test for glucose (CSF is positive), look for halo sign. NEVER blow the nose — this is one of the '5 No's' after this surgery.",
            guideSection: "Section 10 — Transsphenoidal Surgery Care",
            guideSectionId: "transsphenoidal"
        },

        // ============================================================
        // Q3: SIADH Fluid Restriction Nursing Care (Application)
        // ============================================================
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with SIADH has a fluid restriction of 1000 mL/day. The patient's serum sodium is 121 mEq/L and they are confused. Which nursing intervention is MOST important?",
            options: [
                { id: "a", text: "Encourage the patient to drink at least 2 liters of water per day to flush excess sodium" },
                { id: "b", text: "Implement seizure precautions and perform frequent neurological assessments" },
                { id: "c", text: "Administer a loop diuretic to increase urine output" },
                { id: "d", text: "Offer high-potassium foods such as bananas and oranges" }
            ],
            correct: "b",
            rationale: {
                correct: "With a serum sodium of 121 mEq/L (severe hyponatremia below 125 mEq/L), the patient is at HIGH risk for seizures. The confusion is already a sign of CNS effects from hyponatremia. Seizure precautions (padded side rails, bed in lowest position, suction at bedside, IV access) and frequent neuro checks are the highest nursing priority. Seizures from hyponatremia can be fatal.",
                a: "This is DANGEROUS. Encouraging fluid intake in SIADH would worsen the hyponatremia by further diluting the serum sodium. SIADH treatment is fluid RESTRICTION, not fluid encouragement. The patient is already retaining too much water.",
                c: "Loop diuretics may be used as part of SIADH treatment (with salt replacement), but this is a medical decision. The nurse's priority action is safety measures for the immediate seizure risk. Additionally, diuretics without sodium replacement could worsen hyponatremia.",
                d: "Potassium is not the concern in SIADH — sodium is the critical electrolyte issue. Offering high-potassium foods does not address the hyponatremia or seizure risk."
            },
            testTakingTip: "Sodium < 125 mEq/L = seizure precautions IMMEDIATELY. SIADH patients get confused before they seize. Remember: SIADH = restrict fluids (never encourage drinking). The biggest danger in SIADH is neurological — seizures from low sodium.",
            guideSection: "Section 3 — SIADH",
            guideSectionId: "siadh"
        },

        // ============================================================
        // Q4: Transsphenoidal Post-Op Care Ordering (Application)
        // ============================================================
        {
            id: 4,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient immediately post-transsphenoidal hypophysectomy. Place the following nursing assessments in the correct priority order.",
            options: [
                { id: "a", text: "Monitor for CSF leak — assess nasal drainage, test for glucose if clear drainage noted" },
                { id: "b", text: "Monitor strict I&O and urine specific gravity for signs of diabetes insipidus" },
                { id: "c", text: "Perform neurological assessment — LOC, orientation, visual acuity, pupil response" },
                { id: "d", text: "Assess nasal packing — ensure intact, monitor for bleeding" },
                { id: "e", text: "Provide oral care with gentle mouth rinses (no toothbrushing for 2 weeks)" }
            ],
            correct: ["a", "c", "b", "d", "e"],
            rationale: {
                correct: "Priority order reflects urgency: (1) CSF leak is the most serious complication — it risks meningitis. (2) Neurological assessment detects increased ICP, visual changes, or altered consciousness. (3) DI monitoring catches the second most common complication (occurs in up to 30% of patients). (4) Nasal packing assessment ensures hemostasis. (5) Oral care is important for comfort but lower priority.",
                a: "FIRST — CSF leak detection is the #1 priority because meningitis from CSF leak is the most dangerous complication. Clear nasal drainage with glucose = CSF. Report immediately.",
                c: "SECOND — Neurological assessment catches increased ICP, hemorrhage, or cranial nerve damage early. Compare to pre-operative baseline. Visual field testing is critical.",
                b: "THIRD — DI occurs in up to 30% of patients. Sudden urine output >200 mL/hr with low specific gravity requires immediate desmopressin. Can cause rapid dehydration.",
                d: "FOURTH — Nasal packing should be intact and not excessively bloody. Do not remove or manipulate — this is the surgeon's responsibility.",
                e: "FIFTH — Oral care is important for comfort (patient is mouth-breathing) but is the lowest priority. No toothbrushing to avoid disrupting the surgical site near the upper gum line."
            },
            testTakingTip: "Post-transsphenoidal priorities follow 'CSF → Neuro → DI → Packing → Comfort.' CSF leak is always #1 because meningitis risk is the most dangerous consequence. DI is #2 most common complication.",
            guideSection: "Section 10 — Transsphenoidal Surgery Care",
            guideSectionId: "transsphenoidal"
        },

        // ============================================================
        // Q5: Desmopressin Administration (Application)
        // ============================================================
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with central diabetes insipidus is receiving intranasal desmopressin (DDAVP). Which finding indicates the medication is effective?",
            options: [
                { id: "a", text: "Urine output increases to 5 liters per day" },
                { id: "b", text: "Serum sodium rises from 144 to 152 mEq/L" },
                { id: "c", text: "Urine specific gravity increases from 1.002 to 1.018" },
                { id: "d", text: "The patient reports increased thirst and dry mouth" }
            ],
            correct: "c",
            rationale: {
                correct: "Desmopressin replaces the missing ADH, causing the kidneys to reabsorb water and produce more concentrated urine. A urine specific gravity increasing from 1.002 (very dilute — untreated DI) to 1.018 (within normal range of 1.010-1.025) indicates the medication is working. Urine output should DECREASE and urine should become MORE concentrated.",
                a: "Increased urine output to 5 L/day indicates the DI is NOT being controlled. Effective desmopressin would DECREASE urine output toward normal volumes. High output suggests inadequate dosing or nephrogenic DI (which does not respond to desmopressin).",
                b: "Rising serum sodium (from 144 to 152 — worsening hypernatremia) indicates the DI is getting worse, not better. Effective treatment should normalize or decrease serum sodium as the body retains more water.",
                d: "Increased thirst and dry mouth are symptoms of uncontrolled DI (dehydration). Effective desmopressin should reduce thirst as the body retains adequate water."
            },
            testTakingTip: "Desmopressin effectiveness = urine concentrates (specific gravity rises toward normal), urine output decreases, serum sodium normalizes. It mimics ADH — the 'anti-diuretic' effect means less peeing and more concentrated urine.",
            guideSection: "Section 2 — Diabetes Insipidus",
            guideSectionId: "diabetes-insipidus"
        },

        // ============================================================
        // Q6: SIADH vs DI Matrix (Analysis)
        // ============================================================
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["SIADH", "Diabetes Insipidus"],
            stem: "For each clinical finding, identify whether it is associated with SIADH or Diabetes Insipidus.",
            options: [
                { id: "a", text: "Serum sodium 118 mEq/L with confusion and muscle cramps" },
                { id: "b", text: "Urine output of 12 liters per day with extreme thirst" },
                { id: "c", text: "Urine specific gravity of 1.038 with weight gain and no edema" },
                { id: "d", text: "Serum osmolality 310 mOsm/kg with dry mucous membranes and tachycardia" }
            ],
            correct: {
                a: "SIADH",
                b: "Diabetes Insipidus",
                c: "SIADH",
                d: "Diabetes Insipidus"
            },
            rationale: {
                correct: "SIADH retains water (low Na+, concentrated urine, weight gain). DI loses water (high Na+, massive dilute urine output, dehydration signs).",
                a: "SIADH — Low serum sodium (118 mEq/L = severe hyponatremia) with neurological symptoms (confusion) and muscle cramps are hallmarks of SIADH's dilutional hyponatremia.",
                b: "DI — Massive urine output (12 L/day) with extreme polydipsia (thirst) is the hallmark of diabetes insipidus. The kidneys cannot concentrate urine without ADH.",
                c: "SIADH — Very high urine specific gravity (1.038 = concentrated urine) with weight gain but no edema is classic SIADH. The excess water distributes intracellularly, not into interstitial spaces.",
                d: "DI — High serum osmolality (310 = concentrated/dehydrated blood) with clinical signs of dehydration (dry mucous membranes, tachycardia) indicates the body is losing excessive water."
            },
            testTakingTip: "Two quick checks to differentiate: (1) Is sodium HIGH or LOW? High = DI, Low = SIADH. (2) Is urine output HIGH or LOW? High = DI, Low = SIADH. Everything mirrors.",
            guideSection: "Section 4 — SIADH vs DI Comparison",
            guideSectionId: "siadh-vs-di"
        },

        // ============================================================
        // Q7: Tolvaptan Safety (Application)
        // ============================================================
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with SIADH is started on tolvaptan (Samsca). The morning serum sodium is 119 mEq/L. At 6 hours, it has risen to 128 mEq/L. What should the nurse do?",
            options: [
                { id: "a", text: "Continue tolvaptan — the sodium is correcting appropriately" },
                { id: "b", text: "Notify the provider immediately — sodium is correcting too rapidly" },
                { id: "c", text: "Administer a bolus of 3% hypertonic saline to further increase sodium" },
                { id: "d", text: "Restrict all oral and IV fluids to slow the correction" }
            ],
            correct: "b",
            rationale: {
                correct: "The serum sodium has risen 9 mEq/L in just 6 hours. The safe correction rate is no more than 10-12 mEq/L in 24 hours. At this rate, the patient is on track to exceed the safe limit, risking osmotic demyelination syndrome (ODS) — an irreversible and devastating neurological condition. The provider must be notified to consider stopping tolvaptan and potentially giving hypotonic fluids (D5W) to slow the correction.",
                a: "This is NOT appropriate. A rise of 9 mEq/L in 6 hours projects to 36 mEq/L in 24 hours — far exceeding the 10-12 mEq/L safe limit. Continuing the current treatment risks ODS.",
                c: "Hypertonic saline would ACCELERATE sodium correction — the exact opposite of what is needed. The sodium is already rising too fast. Hypertonic saline is used for severe symptomatic hyponatremia (seizures, coma), not to speed up an already rapid correction.",
                d: "While the concept of slowing correction is right, the nurse's first action is to notify the provider. The provider may order D5W (hypotonic fluid) to actually lower the sodium slightly and slow the correction. Simply restricting fluids is insufficient when the correction rate is this dangerous."
            },
            testTakingTip: "The 10-12 rule: never correct sodium more than 10-12 mEq/L in 24 hours. Faster = osmotic demyelination syndrome (irreversible brain damage). Calculate: if sodium rose 9 in 6 hours, it's on pace for ~36 in 24 hours. That's dangerously fast.",
            guideSection: "Section 3 — SIADH",
            guideSectionId: "siadh"
        },

        // ============================================================
        // Q8: Acromegaly Recognition (Knowledge)
        // ============================================================
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A 52-year-old patient reports that their rings no longer fit, their shoes feel tight, and their spouse has noticed their facial features have changed over the past several years. The patient also has new-onset type 2 diabetes and bilateral carpal tunnel syndrome. Which condition is MOST likely?",
            options: [
                { id: "a", text: "Cushing's syndrome" },
                { id: "b", text: "Hypothyroidism" },
                { id: "c", text: "Acromegaly" },
                { id: "d", text: "Hyperprolactinemia" }
            ],
            correct: "c",
            rationale: {
                correct: "This is a classic acromegaly presentation: gradual enlargement of hands (rings don't fit), feet (shoes feel tight), and facial features over years, combined with insulin resistance (new diabetes) and carpal tunnel syndrome (from soft tissue swelling). Acromegaly is caused by a GH-secreting pituitary adenoma producing excess growth hormone after growth plate closure. The slow onset (years) is characteristic — average diagnosis takes 7-10 years.",
                a: "Cushing's syndrome causes truncal obesity, moon face, buffalo hump, and striae — but not enlarged hands and feet. The facial changes in Cushing's are fat redistribution, not bone/tissue enlargement.",
                b: "Hypothyroidism causes weight gain, fatigue, cold intolerance, and puffy features (myxedema), but not progressive bony enlargement of hands, feet, and jaw.",
                d: "Hyperprolactinemia causes galactorrhea, amenorrhea, or sexual dysfunction — not enlargement of extremities or facial features."
            },
            testTakingTip: "Rings don't fit + shoes feel tight + facial changes over years = acromegaly. The gradual onset is key — comparing old photographs is the best way to detect the changes. IGF-1 is the best screening test.",
            guideSection: "Section 6 — Growth Hormone Disorders",
            guideSectionId: "growth-hormone"
        },

        // ============================================================
        // Q9: DI Post-Surgery Priority (Analysis — Priority)
        // ============================================================
        {
            id: 9,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient is 12 hours post-transsphenoidal hypophysectomy. Over the past 2 hours, urine output has averaged 350 mL/hr. The urine appears very pale and watery. Urine specific gravity is 1.002. What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Restrict the patient's fluid intake to 800 mL/day" },
                { id: "b", text: "Notify the provider — the patient is developing diabetes insipidus" },
                { id: "c", text: "Encourage the patient to drink more fluids to keep up with output" },
                { id: "d", text: "Document the findings and recheck output in 4 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Urine output of 350 mL/hr (well above the 200 mL/hr threshold) with very dilute urine (specific gravity 1.002, normal is 1.010-1.025) after pituitary surgery is classic transient diabetes insipidus from posterior pituitary manipulation. The provider must be notified immediately to initiate desmopressin and IV fluid replacement. At 350 mL/hr, the patient will become dangerously dehydrated rapidly.",
                a: "Fluid restriction is the treatment for SIADH, not DI. Restricting fluids in a patient who is losing 350 mL/hr through urine would cause severe dehydration and potentially cardiovascular collapse.",
                c: "While fluid replacement is part of DI management, the nurse should notify the provider FIRST. The patient likely needs desmopressin (DDAVP) in addition to fluid replacement. Oral fluid intake alone cannot keep up with output this high.",
                d: "Waiting 4 hours is dangerous. At 350 mL/hr, the patient could lose an additional 1.4 liters in 4 hours. This is an urgent situation requiring immediate provider notification and intervention."
            },
            testTakingTip: "Post-pituitary surgery + sudden high urine output + very dilute urine (SG < 1.005) = DI. The 200 mL/hr threshold is key. Notify immediately — don't wait. Transient DI occurs in up to 30% of transsphenoidal patients.",
            guideSection: "Section 10 — Transsphenoidal Surgery Care",
            guideSectionId: "transsphenoidal"
        },

        // ============================================================
        // Q10: Medication-Disorder Matching (Knowledge)
        // ============================================================
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is reviewing medications for patients with pituitary disorders. Which medication-disorder pairing is CORRECT?",
            options: [
                { id: "a", text: "Tolvaptan (Samsca) for diabetes insipidus" },
                { id: "b", text: "Desmopressin (DDAVP) for SIADH" },
                { id: "c", text: "Cabergoline (Dostinex) for prolactinoma" },
                { id: "d", text: "Octreotide (Sandostatin) for growth hormone deficiency" }
            ],
            correct: "c",
            rationale: {
                correct: "Cabergoline is a dopamine agonist used to treat prolactinoma. Dopamine normally inhibits prolactin secretion, so a dopamine agonist suppresses excess prolactin and shrinks the tumor. Cabergoline is the preferred first-line treatment (over bromocriptine) due to better efficacy and fewer side effects.",
                a: "Tolvaptan is used for SIADH, NOT DI. Tolvaptan blocks V2 vasopressin receptors to promote water excretion — used when the body retains too much water. DI patients need desmopressin (to retain water), which is the opposite effect.",
                b: "Desmopressin is used for DI, NOT SIADH. Desmopressin is synthetic ADH — it tells the kidneys to reabsorb water. Giving desmopressin in SIADH (which already has excess ADH effect) would dangerously worsen the water retention and hyponatremia.",
                d: "Octreotide is used for acromegaly (GH excess), NOT GH deficiency. Octreotide is a somatostatin analog that suppresses GH secretion. GH deficiency is treated with somatropin (recombinant GH replacement)."
            },
            testTakingTip: "Match the drug to its purpose: Desmopressin REPLACES ADH (for DI). Tolvaptan BLOCKS ADH (for SIADH). Octreotide SUPPRESSES GH (for acromegaly). Somatropin REPLACES GH (for deficiency). Cabergoline INHIBITS prolactin (for prolactinoma). Each drug is the opposite of the disease.",
            guideSection: "Section 11 — Medication Comparison",
            guideSectionId: "medications"
        }
    ]
};
