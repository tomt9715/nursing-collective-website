/**
 * Thyroid Disorders Quiz — Question Data
 * 10 NCLEX-style questions: 5 Single, 2 Priority, 1 Ordering, 1 Matrix, 1 Single
 * High-yield focus: thyroidectomy, emergencies, medications, lab interpretation
 */

/* exported thyroidDisordersQuizData */
var thyroidDisordersQuizData = {
    guideName: "Thyroid Disorders",
    guideSlug: "thyroid-disorders",
    category: "Endocrine",
    categoryColor: "#0891B2",
    estimatedMinutes: 15,
    questions: [
        // ============================================================
        // Q1: Lab Interpretation (Knowledge)
        // ============================================================
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient's lab results show a TSH of 12.8 mIU/L (normal: 0.4-4.0) and a free T4 of 0.4 ng/dL (normal: 0.8-1.8). Which condition do these results indicate?",
            options: [
                { id: "a", text: "Primary hyperthyroidism" },
                { id: "b", text: "Primary hypothyroidism" },
                { id: "c", text: "Secondary hypothyroidism" },
                { id: "d", text: "Subclinical hyperthyroidism" }
            ],
            correct: "b",
            rationale: {
                correct: "A high TSH with a low free T4 is the classic pattern for primary hypothyroidism. The thyroid is failing (low T4), so the pituitary compensates by increasing TSH — essentially 'yelling' at the thyroid to produce more hormone. TSH goes OPPOSITE of thyroid function.",
                a: "In hyperthyroidism, TSH would be LOW (suppressed by excess thyroid hormone) and T3/T4 would be HIGH. This is the opposite pattern.",
                c: "In secondary hypothyroidism (pituitary failure), BOTH TSH and T4 would be low because the pituitary cannot produce TSH. Here, TSH is elevated.",
                d: "In subclinical hyperthyroidism, TSH would be low with normal T4/T3 levels. This patient has high TSH and low T4."
            },
            testTakingTip: "Remember: TSH goes OPPOSITE of thyroid function. High TSH = 'Help! Send Thyroid hormone!' (hypothyroid). Low TSH = 'Too much! Stop, Thyroid, Halt!' (hyperthyroid).",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // ============================================================
        // Q2: Post-Thyroidectomy Priority (Analysis — Priority)
        // ============================================================
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient is 6 hours post-thyroidectomy. During routine assessment, the nurse notes swelling at the incision site and the patient reports a feeling of tightness in the neck with mild difficulty breathing. What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Administer IV calcium gluconate" },
                { id: "b", text: "Assess for Chvostek's and Trousseau's signs" },
                { id: "c", text: "Notify the surgeon immediately and prepare for emergency intervention" },
                { id: "d", text: "Elevate the head of the bed and apply an ice pack to the neck" }
            ],
            correct: "c",
            rationale: {
                correct: "Neck swelling, tightness, and difficulty breathing after thyroidectomy indicate a potential hemorrhage/hematoma compressing the trachea — this is an airway emergency. The priority is to notify the surgeon immediately because the sutures may need to be opened at the bedside to release the hematoma and restore the airway. A tracheostomy tray should be at the bedside for this reason.",
                a: "Calcium gluconate is used for hypocalcemia/tetany from parathyroid damage, not for hemorrhage. The symptoms described (neck swelling, difficulty breathing) indicate bleeding, not hypocalcemia.",
                b: "Chvostek's and Trousseau's signs assess for hypocalcemia. The patient's symptoms of neck swelling and respiratory difficulty suggest hemorrhage, which is a more immediate life-threatening concern.",
                d: "While head elevation is appropriate positioning, ice and elevation alone will not address an expanding hematoma that is compromising the airway. This is an emergency requiring surgeon notification."
            },
            testTakingTip: "Post-thyroidectomy, airway is ALWAYS priority #1. Neck swelling + difficulty breathing = hemorrhage/hematoma until proven otherwise. Think: 'ABCCC' — Airway first, then Bleeding, Calcium, Communication, Comfort.",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        },

        // ============================================================
        // Q3: Levothyroxine Patient Teaching (Application)
        // ============================================================
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient newly diagnosed with hypothyroidism is prescribed levothyroxine (Synthroid). The patient also takes calcium carbonate for osteoporosis and warfarin for atrial fibrillation. Which instruction is MOST important for the nurse to include?",
            options: [
                { id: "a", text: "\"Take the levothyroxine and calcium together with breakfast for convenience.\"" },
                { id: "b", text: "\"Take levothyroxine on an empty stomach in the morning and separate it from calcium by at least 4 hours.\"" },
                { id: "c", text: "\"You can stop the levothyroxine once your thyroid levels return to normal.\"" },
                { id: "d", text: "\"Levothyroxine decreases the effect of warfarin, so your warfarin dose will need to be increased.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Levothyroxine must be taken on an empty stomach 30-60 minutes before breakfast for optimal absorption. Calcium, iron, and antacids bind to levothyroxine in the gut and significantly reduce its absorption — they must be separated by at least 4 hours. This is critical for therapeutic drug levels.",
                a: "Taking calcium with levothyroxine significantly reduces levothyroxine absorption. Calcium binds to the medication in the GI tract. They must be separated by at least 4 hours.",
                c: "Hypothyroidism (especially Hashimoto's) requires LIFELONG levothyroxine therapy. Stopping the medication will cause thyroid levels to drop again. The underlying thyroid condition does not resolve.",
                d: "This is reversed. Levothyroxine INCREASES the anticoagulant effect of warfarin (by increasing catabolism of clotting factors). The warfarin dose may need to be DECREASED, and INR should be monitored more frequently."
            },
            testTakingTip: "Levothyroxine has three critical drug interactions to know: (1) calcium/iron/antacids decrease its absorption (separate by 4 hours), (2) it increases warfarin effect (monitor INR), (3) food decreases absorption (take on empty stomach).",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // ============================================================
        // Q4: Thyroid Storm Ordering (Application)
        // ============================================================
        {
            id: 4,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Graves' disease is admitted with a temperature of 105.2°F, heart rate of 156 bpm, and delirium. The provider diagnoses thyroid storm. Place the following interventions in the correct priority order for treatment.",
            options: [
                { id: "a", text: "Administer PTU (propylthiouracil) to block thyroid hormone synthesis" },
                { id: "b", text: "Administer Lugol's solution (iodine) to block hormone release" },
                { id: "c", text: "Administer IV propranolol to control tachycardia" },
                { id: "d", text: "Administer IV corticosteroids (hydrocortisone)" },
                { id: "e", text: "Apply cooling blankets and administer acetaminophen (NOT aspirin)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct treatment sequence follows the 'Block, Block, Block, Block' strategy: (1) Block synthesis with PTU, (2) Block release with iodine 1 hour AFTER PTU, (3) Block adrenergic effects with beta-blockers, (4) Block peripheral conversion with corticosteroids, (5) Supportive cooling. The iodine MUST come after PTU — giving iodine first provides raw material for MORE hormone production.",
                a: "FIRST — PTU blocks new thyroid hormone synthesis AND blocks peripheral T4-to-T3 conversion. It must be given BEFORE iodine to prevent the thyroid from using iodine to make more hormone.",
                b: "SECOND — Lugol's solution blocks release of preformed thyroid hormone (Wolff-Chaikoff effect). Must be given at least 1 hour AFTER PTU. Giving iodine first would be counterproductive.",
                c: "THIRD — IV propranolol rapidly controls the dangerous tachycardia, hypertension, and tremors. Also provides some T4-to-T3 conversion blockade.",
                d: "FOURTH — Corticosteroids block peripheral T4-to-T3 conversion and prevent relative adrenal insufficiency from the hypermetabolic state.",
                e: "FIFTH — Cooling measures address the dangerously high fever. Use acetaminophen ONLY — aspirin is contraindicated because it displaces thyroid hormone from binding proteins, increasing free (active) hormone."
            },
            testTakingTip: "Thyroid storm treatment = 'Block, Block, Block, Block + Cool.' PTU always comes BEFORE iodine. And remember: NO aspirin — it makes thyroid storm worse by increasing free thyroid hormone.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // ============================================================
        // Q5: Hypocalcemia Post-Thyroidectomy (Analysis — Priority)
        // ============================================================
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient is 48 hours post-total thyroidectomy. The nurse notes tingling around the patient's mouth and fingertips. When the nurse taps the facial nerve in front of the ear, the patient's facial muscles twitch on the same side. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Document the findings and reassess in 1 hour" },
                { id: "b", text: "Notify the provider and prepare to administer IV calcium gluconate" },
                { id: "c", text: "Assess the patient's voice quality and check the surgical dressing" },
                { id: "d", text: "Administer oral calcium carbonate as prescribed" }
            ],
            correct: "b",
            rationale: {
                correct: "The patient is exhibiting Chvostek's sign (facial muscle twitching when the facial nerve is tapped) and perioral/fingertip paresthesias — classic signs of hypocalcemia from accidental parathyroid damage during thyroidectomy. This can progress to tetany, laryngospasm, and cardiac arrhythmias. The nurse should notify the provider immediately and prepare IV calcium gluconate, which should already be at the bedside.",
                a: "Delaying intervention is inappropriate. Positive Chvostek's sign with paresthesias indicates worsening hypocalcemia that can rapidly progress to life-threatening tetany and laryngospasm. This requires immediate treatment.",
                c: "While voice assessment is important post-thyroidectomy (laryngeal nerve damage), the current findings indicate hypocalcemia, which is the priority. Hypocalcemia can cause laryngospasm — a more immediate airway threat.",
                d: "Oral calcium is used for long-term management, but the acute presentation with positive Chvostek's sign requires IV calcium gluconate for rapid correction. Oral calcium acts too slowly for this clinical situation."
            },
            testTakingTip: "Post-thyroidectomy + tingling + positive Chvostek's sign = hypocalcemia emergency. Think: parathyroid damage → low calcium → tetany. IV calcium gluconate should ALREADY be at the bedside. Chvostek's = facial tap → twitch. Trousseau's = BP cuff → carpal spasm.",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        },

        // ============================================================
        // Q6: Patient Teaching Matrix (Analysis)
        // ============================================================
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "A nurse is evaluating a patient's understanding of their thyroid disorder management. For each patient statement, indicate whether it demonstrates correct understanding or needs more teaching.",
            options: [
                { id: "a", text: "\"I take my levothyroxine with my morning coffee and calcium pill to save time.\"" },
                { id: "b", text: "\"I know I need to report a sore throat or fever right away while taking methimazole.\"" },
                { id: "c", text: "\"After my radioactive iodine treatment, I should avoid close contact with my pregnant daughter for several days.\"" },
                { id: "d", text: "\"Since my thyroid levels are normal now, I can stop taking my levothyroxine.\"" }
            ],
            correct: {
                a: "Needs More Teaching",
                b: "Correct Understanding",
                c: "Correct Understanding",
                d: "Needs More Teaching"
            },
            rationale: {
                correct: "Recognizing agranulocytosis warning signs (B) and RAI radiation precautions (C) show correct understanding. Taking levothyroxine with coffee and calcium (A) significantly reduces absorption, and stopping levothyroxine when levels normalize (D) shows misunderstanding of lifelong therapy.",
                a: "NEEDS MORE TEACHING — Coffee and calcium both significantly reduce levothyroxine absorption. It must be taken on an empty stomach 30-60 minutes before eating/drinking, and calcium must be separated by at least 4 hours.",
                b: "CORRECT UNDERSTANDING — Sore throat, fever, and mouth ulcers are early warning signs of agranulocytosis, a rare but life-threatening side effect of antithyroid medications (methimazole and PTU). Immediate reporting allows for CBC and drug discontinuation.",
                c: "CORRECT UNDERSTANDING — After RAI treatment, the patient emits radiation. Pregnant women and young children are especially vulnerable and should be avoided for several days. Other precautions include sleeping alone, using separate utensils, and flushing the toilet twice.",
                d: "NEEDS MORE TEACHING — Levothyroxine is required lifelong for hypothyroidism. Normal levels mean the medication IS working, not that the condition is cured. Stopping the medication will cause hormone levels to drop and symptoms to return."
            },
            testTakingTip: "Two common 'needs more teaching' red flags for thyroid patients: (1) taking levothyroxine with food/calcium/coffee, and (2) stopping medication because levels are normal. Normal levels = medication is working, not condition resolved.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // ============================================================
        // Q7: Myxedema Coma (Application)
        // ============================================================
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a history of hypothyroidism is found unresponsive with a temperature of 93°F (33.9°C), heart rate of 42 bpm, and respiratory rate of 8 breaths/min. Myxedema coma is suspected. Which nursing intervention is CONTRAINDICATED?",
            options: [
                { id: "a", text: "Administering IV levothyroxine as ordered" },
                { id: "b", text: "Applying a heated blanket to rapidly warm the patient" },
                { id: "c", text: "Administering IV corticosteroids before thyroid hormone replacement" },
                { id: "d", text: "Preparing for possible intubation and mechanical ventilation" }
            ],
            correct: "b",
            rationale: {
                correct: "Active warming (heated blankets, warm IV fluids) is CONTRAINDICATED in myxedema coma. Rapid external warming causes peripheral vasodilation in a patient whose cardiovascular system cannot compensate, leading to refractory hypotension and cardiovascular collapse. ONLY passive rewarming (warm blankets, warm room) is safe, allowing temperature to rise no more than 1°F per hour.",
                a: "IV levothyroxine is the cornerstone of myxedema coma treatment. A high loading dose is given IV because GI absorption is impaired in the severely hypothyroid state.",
                c: "Corticosteroids (hydrocortisone) should be given BEFORE or simultaneously with thyroid hormone to prevent precipitating an adrenal crisis. Severe hypothyroidism may coexist with adrenal insufficiency.",
                d: "Myxedema coma causes respiratory depression (low respiratory rate, CO2 retention). Intubation and mechanical ventilation are often necessary to support breathing."
            },
            testTakingTip: "Myxedema coma = passive rewarming ONLY. Active warming → vasodilation → cardiovascular collapse. Remember: this is the OPPOSITE of thyroid storm, where you actively cool the patient.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // ============================================================
        // Q8: Graves' Disease Assessment (Knowledge)
        // ============================================================
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient presents with bulging eyes, a visible neck enlargement, heat intolerance, weight loss despite increased appetite, and a resting heart rate of 112 bpm. Which condition is MOST consistent with these findings?",
            options: [
                { id: "a", text: "Hashimoto's thyroiditis" },
                { id: "b", text: "Myxedema coma" },
                { id: "c", text: "Graves' disease" },
                { id: "d", text: "Thyroid cancer" }
            ],
            correct: "c",
            rationale: {
                correct: "This is a classic presentation of Graves' disease — the most common cause of hyperthyroidism. Exophthalmos (bulging eyes) is UNIQUE to Graves' disease and does not occur in other forms of hyperthyroidism. Combined with goiter, heat intolerance, weight loss, increased appetite, and tachycardia, this is a textbook Graves' presentation. Graves' is caused by thyroid-stimulating immunoglobulins (TSI) that continuously stimulate the thyroid.",
                a: "Hashimoto's thyroiditis causes hypothyroidism (the opposite). Patients would have cold intolerance, weight gain, bradycardia, fatigue, and constipation. Hashimoto's may cause a goiter, but not exophthalmos.",
                b: "Myxedema coma is an extreme form of hypothyroidism with hypothermia, bradycardia, and altered consciousness — the opposite of this presentation.",
                d: "Thyroid cancer typically presents as a nodule, not diffuse goiter with exophthalmos. It usually does not cause hyperthyroid symptoms and does not cause bulging eyes."
            },
            testTakingTip: "Exophthalmos (bulging eyes) = Graves' disease. This is the most distinctive feature. If you see exophthalmos on the exam, the answer involves Graves' disease. Remember: Graves' = 'everything HIGH and FAST' + exophthalmos.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // ============================================================
        // Q9: PTU vs Methimazole in Pregnancy (Application)
        // ============================================================
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A pregnant patient at 8 weeks gestation is diagnosed with hyperthyroidism. The provider prescribes an antithyroid medication. Which medication is the MOST appropriate choice at this time?",
            options: [
                { id: "a", text: "Methimazole (Tapazole)" },
                { id: "b", text: "Propylthiouracil (PTU)" },
                { id: "c", text: "Radioactive iodine (I-131)" },
                { id: "d", text: "Levothyroxine (Synthroid)" }
            ],
            correct: "b",
            rationale: {
                correct: "PTU is the preferred antithyroid drug during the FIRST TRIMESTER of pregnancy. Methimazole is associated with birth defects (aplasia cutis, choanal atresia) when used in early pregnancy. After the first trimester, the patient should be switched to methimazole because PTU carries a higher risk of hepatotoxicity (black box warning for liver failure). The rule: 1st trimester = PTU, 2nd/3rd trimester = methimazole.",
                a: "Methimazole is teratogenic in the first trimester, associated with aplasia cutis (skin defects) and choanal atresia. It becomes the preferred agent in the 2nd and 3rd trimesters, but not at 8 weeks gestation.",
                c: "Radioactive iodine is ABSOLUTELY CONTRAINDICATED in pregnancy. It crosses the placenta and destroys the fetal thyroid gland, causing permanent congenital hypothyroidism. A pregnancy test is required before RAI administration.",
                d: "Levothyroxine is used to treat hypothyroidism, not hyperthyroidism. Giving levothyroxine to a hyperthyroid patient would worsen the condition."
            },
            testTakingTip: "Pregnancy + hyperthyroidism = PTU in 1st trimester, methimazole in 2nd/3rd. RAI is ABSOLUTELY contraindicated in pregnancy (destroys fetal thyroid). Both PTU and methimazole are safe for breastfeeding.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // ============================================================
        // Q10: Post-Thyroidectomy Emergency Equipment (Knowledge)
        // ============================================================
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The nurse is preparing a room for a patient returning from a total thyroidectomy. Which equipment is ESSENTIAL to have at the bedside? Select the items that MUST be present.",
            options: [
                { id: "a", text: "Tracheostomy tray, suction equipment, oxygen, and IV calcium gluconate" },
                { id: "b", text: "Chest tube insertion kit, pulse oximeter, and IV potassium chloride" },
                { id: "c", text: "Central line kit, arterial blood gas supplies, and IV magnesium sulfate" },
                { id: "d", text: "Nasogastric tube, IV insulin drip, and crash cart only" }
            ],
            correct: "a",
            rationale: {
                correct: "After thyroidectomy, four items MUST be at the bedside: (1) Tracheostomy tray — for emergency airway access if hemorrhage/hematoma obstructs the trachea. (2) Suction equipment — for blood and secretion management. (3) Oxygen — for supplemental oxygenation. (4) IV calcium gluconate — for emergency treatment of hypocalcemia from accidental parathyroid damage. These address the two most critical complications: airway obstruction and tetany.",
                b: "A chest tube is not indicated for thyroidectomy (no thoracic procedure was performed). Potassium is not the priority electrolyte — calcium is the concern due to possible parathyroid damage.",
                c: "A central line kit and arterial blood gas supplies are not standard bedside requirements for thyroidectomy patients. Magnesium is not the priority concern — calcium is.",
                d: "A nasogastric tube and insulin drip are not specifically needed after thyroidectomy. While a crash cart should be accessible on the unit, the specific bedside equipment for thyroidectomy complications is the tracheostomy tray and calcium gluconate."
            },
            testTakingTip: "Post-thyroidectomy bedside essentials = 'TSCOC': Tracheostomy tray, Suction, Calcium gluconate, Oxygen, Cardiac monitor. The two unique items are the trach tray (for hemorrhage/airway compromise) and calcium gluconate (for hypocalcemia from parathyroid damage).",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        }
    ]
};
