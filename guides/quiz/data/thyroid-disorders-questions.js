/**
 * Thyroid Disorders Quiz — Complete Question Bank
 * 100 NCLEX-style questions in 2 batches
 *
 * Batch 1 (thyroid_001–050): Physiology, labs, hypothyroidism, levothyroxine,
 *   myxedema coma, Hashimoto's, goiter basics, hyperthyroidism basics
 * Batch 2 (thyroid_051–100): Graves' disease, antithyroid meds, RAI, Lugol's,
 *   beta-blockers, thyroid storm, thyroidectomy complications, goiter/nodules
 */

/* exported thyroidDisordersQuizData */
var thyroidDisordersQuizData = {
    guideName: "Thyroid Disorders",
    guideSlug: "thyroid-disorders",
    category: "Endocrine",
    categoryColor: "#0891B2",
    estimatedMinutes: 120,
    questions: [

        // ================================================================
        //  SECTION 1 — THYROID PHYSIOLOGY & LAB INTERPRETATION (Q1–Q10)
        // ================================================================

        // Q1 — Feedback Loop Basics (Knowledge, Single)
        {
            id: "thyroid_001",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nursing student asks, \"Why does TSH go UP when the thyroid is failing?\" Which response by the nurse BEST explains this relationship?",
            options: [
                { id: "a", text: "The thyroid gland directly stimulates the pituitary to produce more TSH when it cannot keep up with demand." },
                { id: "b", text: "When T3 and T4 levels drop, the hypothalamus and pituitary lose negative feedback inhibition and increase TRH and TSH secretion." },
                { id: "c", text: "TSH rises because the adrenal glands release cortisol in response to low thyroid hormone levels." },
                { id: "d", text: "High TSH is a compensatory response triggered by the kidneys detecting low metabolic rate." }
            ],
            correct: "b",
            rationale: {
                correct: "The thyroid axis operates on a negative feedback loop. When T3/T4 levels fall, there is less inhibition of the hypothalamus and anterior pituitary. The hypothalamus increases TRH, which stimulates the pituitary to increase TSH — essentially 'calling louder' for the thyroid to produce more hormone.",
                a: "The thyroid does not stimulate the pituitary. The feedback signal is the circulating level of T3/T4 in the blood, not a direct thyroid-to-pituitary signal.",
                c: "The adrenal glands and cortisol are not part of the hypothalamic-pituitary-thyroid axis. Cortisol can affect thyroid binding proteins but does not drive TSH elevation.",
                d: "The kidneys do not regulate TSH. The feedback loop is confined to the hypothalamus → pituitary → thyroid axis."
            },
            testTakingTip: "Think of TSH as the pituitary 'yelling' at the thyroid. When T3/T4 drop, the pituitary yells louder (TSH rises). When T3/T4 are high, the pituitary whispers (TSH falls).",
            guideSection: "Section 1 — Thyroid Physiology",
            guideSectionId: "physiology"
        },

        // Q2 — Thyroid Storm Emergency (Application, Ordering)
        {
            id: "thyroid_002",
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Graves\u2019 disease is admitted post-thyroidectomy. On post-operative day 1, the nurse finds the patient febrile (104.2\u00b0F), severely tachycardic (HR 168), agitated, and diaphoretic. The nurse suspects thyroid storm. Place the nursing interventions in the correct priority order.",
            options: [
                { id: "a", text: "Administer IV propranolol (or esmolol) to control life-threatening tachycardia and prevent cardiac decompensation" },
                { id: "b", text: "Administer high-dose antithyroid medication (PTU preferred) to block new thyroid hormone synthesis" },
                { id: "c", text: "Administer IV hydrocortisone \u2014 thyroid storm depletes cortisol and steroids block T4-to-T3 conversion" },
                { id: "d", text: "Apply cooling blankets and administer acetaminophen for hyperthermia (avoid aspirin \u2014 it displaces T4 from binding proteins)" },
                { id: "e", text: "Administer iodine solution (SSKI or Lugol\u2019s) at least 1 hour AFTER antithyroid medication to block hormone release" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Thyroid storm management follows a multi-system stabilization approach: control the immediate cardiovascular threat first (beta-blocker), then block hormone production (antithyroid drug), support adrenal function (steroids), manage hyperthermia, and finally block hormone release (iodine \u2014 must be given AFTER antithyroid medication to avoid fueling new synthesis).",
                a: "FIRST \u2014 Beta-blockers are the most urgent intervention because tachyarrhythmias are the leading cause of death in thyroid storm. Propranolol also partially blocks peripheral T4-to-T3 conversion, providing a dual benefit.",
                b: "SECOND \u2014 PTU (propylthiouracil) is preferred over methimazole in thyroid storm because it both blocks new hormone synthesis AND inhibits peripheral T4-to-T3 conversion. This must be given BEFORE iodine.",
                c: "THIRD \u2014 IV hydrocortisone addresses the relative adrenal insufficiency that occurs in thyroid storm (hypermetabolism depletes cortisol) and provides the additional benefit of blocking peripheral conversion of T4 to the more active T3.",
                d: "FOURTH \u2014 Aggressive temperature management is critical because hyperthermia worsens the hypermetabolic state. Acetaminophen is used instead of aspirin because aspirin displaces T4 from thyroid-binding globulin, increasing free (active) hormone levels.",
                e: "FIFTH \u2014 Iodine (SSKI or Lugol\u2019s) blocks the release of preformed thyroid hormone via the Wolff-Chaikoff effect. It MUST be given at least 1 hour after PTU \u2014 if given first, the thyroid would use the iodine to make MORE hormone, worsening the crisis."
            },
            testTakingTip: "Thyroid storm priority: Beta-blocker first (HR kills), then PTU, then steroids, then cooling, then iodine LAST (and only after antithyroid meds). Remember: aspirin is contraindicated in thyroid storm because it increases free T4. The iodine timing rule is heavily tested on NCLEX.",
            guideSection: "Section 1 \u2014 Thyroid Physiology",
            guideSectionId: "physiology"
        },

        // Q3 — Primary Hypothyroidism Labs (Knowledge, Single)
        {
            id: "thyroid_003",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient's lab results show TSH 18.6 mIU/L (normal: 0.4–4.0) and free T4 0.3 ng/dL (normal: 0.8–1.8). Which condition do these results MOST likely indicate?",
            options: [
                { id: "a", text: "Primary hyperthyroidism" },
                { id: "b", text: "Secondary hypothyroidism" },
                { id: "c", text: "Primary hypothyroidism" },
                { id: "d", text: "Subclinical hyperthyroidism" }
            ],
            correct: "c",
            rationale: {
                correct: "High TSH + low free T4 = primary hypothyroidism. The thyroid gland itself is failing (low T4 output), so the pituitary compensates by producing more TSH to try to stimulate the gland. TSH moves in the OPPOSITE direction of thyroid hormone levels.",
                a: "Hyperthyroidism would show LOW TSH and HIGH T3/T4. The pituitary suppresses TSH when excess thyroid hormone is present.",
                b: "In secondary (central) hypothyroidism, the problem is at the pituitary level, so TSH would be LOW or inappropriately normal despite low T4. Here, TSH is significantly elevated.",
                d: "Subclinical hyperthyroidism shows low TSH with NORMAL T4/T3 levels. This patient has high TSH and low T4 — the opposite pattern."
            },
            testTakingTip: "TSH goes OPPOSITE of thyroid function. High TSH = hypothyroid (pituitary is 'yelling' at a failing thyroid). Low TSH = hyperthyroid (pituitary is 'shutting up' because there's too much hormone).",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // Q4 — Hyperthyroid Labs (Knowledge, Single)
        {
            id: "thyroid_004",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient presents with unintentional weight loss, tremors, and palpitations. Lab results reveal TSH 0.05 mIU/L (normal: 0.4–4.0) and free T4 4.8 ng/dL (normal: 0.8–1.8). How should the nurse interpret these results?",
            options: [
                { id: "a", text: "The labs are consistent with hypothyroidism; the pituitary is not producing enough TSH." },
                { id: "b", text: "The labs are consistent with hyperthyroidism; excess T4 is suppressing TSH through negative feedback." },
                { id: "c", text: "The labs indicate a pituitary tumor producing excess TSH and T4." },
                { id: "d", text: "The results are inconclusive; a free T3 level is needed before any interpretation." }
            ],
            correct: "b",
            rationale: {
                correct: "Low TSH + high free T4 is the hallmark of primary hyperthyroidism. The thyroid is overproducing T4, and the elevated T4 feeds back to the pituitary and hypothalamus, suppressing TSH production. The symptoms (weight loss, tremors, palpitations) are consistent with a hypermetabolic state.",
                a: "Low TSH with HIGH T4 does not indicate hypothyroidism. In hypothyroidism, T4 would be low and TSH would be elevated. The low TSH here is due to negative feedback from excess thyroid hormone.",
                c: "A TSH-secreting pituitary adenoma would show high TSH AND high T4. Here, TSH is suppressed, which is the normal feedback response to excess thyroid hormone from a primary thyroid source.",
                d: "While free T3 can add clinical information, low TSH + elevated free T4 combined with classic hyperthyroid symptoms provides a clear diagnosis. Waiting for additional labs would delay appropriate care."
            },
            testTakingTip: "Always pair TSH with T4 for interpretation: High TSH + Low T4 = hypo. Low TSH + High T4 = hyper. When they move in opposite directions, it's a PRIMARY thyroid disorder.",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // Q5 — Subclinical Hypothyroidism (Application, Single)
        {
            id: "thyroid_005",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient's annual labs show TSH 7.2 mIU/L (normal: 0.4–4.0) with a free T4 of 1.0 ng/dL (normal: 0.8–1.8). The patient reports mild fatigue but no other symptoms. Which interpretation should the nurse provide to the patient?",
            options: [
                { id: "a", text: "\"Your labs are completely normal. The fatigue is likely from stress.\"" },
                { id: "b", text: "\"You have subclinical hypothyroidism. Your TSH is elevated but your T4 is still normal, so we will monitor closely.\"" },
                { id: "c", text: "\"You have severe hypothyroidism and need to start medication immediately.\"" },
                { id: "d", text: "\"Your thyroid is overactive, which is causing your fatigue.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Subclinical hypothyroidism is defined by an elevated TSH with normal free T4. The pituitary is already working harder to maintain normal hormone levels, but the thyroid is beginning to fail. Close monitoring is appropriate because it may progress to overt hypothyroidism, especially if anti-TPO antibodies are present.",
                a: "The TSH is elevated, so the labs are NOT normal. Dismissing the abnormal TSH would miss an early warning sign of thyroid dysfunction.",
                c: "This is not severe hypothyroidism. The free T4 is still within normal range. Severe hypothyroidism would show markedly low T4 with very high TSH and significant symptoms.",
                d: "An elevated TSH indicates the thyroid is UNDERactive, not overactive. If the thyroid were overactive, TSH would be suppressed (low)."
            },
            testTakingTip: "Subclinical = TSH abnormal but T4 still normal. Think of it as the 'early warning stage' — the pituitary is compensating, but the thyroid is starting to struggle.",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // Q6 — T3 vs T4 Understanding (Knowledge, Single)
        {
            id: "thyroid_006",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient asks, \"What is the difference between T3 and T4?\" Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"T3 and T4 are the same hormone produced by different parts of the thyroid gland.\"" },
                { id: "b", text: "\"T4 is the main hormone produced by the thyroid and is converted to T3, the more active form, in peripheral tissues.\"" },
                { id: "c", text: "\"T3 is produced by the pituitary gland and T4 is produced by the thyroid gland.\"" },
                { id: "d", text: "\"T4 is the active form that directly affects metabolism, while T3 is an inactive storage form.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The thyroid primarily produces T4 (thyroxine), which serves as a prohormone. T4 is converted to T3 (triiodothyronine) in peripheral tissues by deiodinase enzymes. T3 is approximately 3-5 times more biologically active than T4 and is the form that primarily acts on cellular receptors to regulate metabolism.",
                a: "T3 and T4 are two distinct hormones, not the same hormone. T3 has three iodine atoms and T4 has four. They have different potencies and roles.",
                c: "Both T3 and T4 are produced by the thyroid gland. The pituitary produces TSH, not thyroid hormones. A small amount of T3 is also produced by peripheral conversion of T4.",
                d: "This is reversed. T3 is the MORE active form, and T4 is the less active precursor. Levothyroxine (synthetic T4) works because the body converts it to active T3."
            },
            testTakingTip: "T4 = Transport form (produced most, less active). T3 = Tissue form (most active, converted from T4). Levothyroxine is synthetic T4 because the body can convert what it needs to T3.",
            guideSection: "Section 1 — Thyroid Physiology",
            guideSectionId: "physiology"
        },

        // Q7 — Lab Interpretation Matrix (Analysis, Matrix)
        {
            id: "thyroid_007",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Primary Hypothyroidism", "Primary Hyperthyroidism"],
            stem: "For each lab finding, indicate whether it is associated with primary hypothyroidism or primary hyperthyroidism.",
            options: [
                { id: "a", text: "TSH elevated above 4.0 mIU/L" },
                { id: "b", text: "Free T4 below 0.8 ng/dL" },
                { id: "c", text: "TSH suppressed below 0.4 mIU/L" },
                { id: "d", text: "Free T3 elevated above 4.4 pg/mL" },
                { id: "e", text: "Elevated total cholesterol" }
            ],
            correct: {
                a: "Primary Hypothyroidism",
                b: "Primary Hypothyroidism",
                c: "Primary Hyperthyroidism",
                d: "Primary Hyperthyroidism",
                e: "Primary Hypothyroidism"
            },
            rationale: {
                correct: "In primary hypothyroidism, TSH rises (pituitary compensation), T4 drops, and cholesterol increases due to slowed lipid metabolism. In primary hyperthyroidism, TSH is suppressed by excess hormone, and T3/T4 levels are elevated.",
                a: "PRIMARY HYPOTHYROIDISM — Elevated TSH is the hallmark of primary hypothyroidism. The pituitary increases TSH output to stimulate the failing thyroid gland.",
                b: "PRIMARY HYPOTHYROIDISM — Low free T4 confirms the thyroid is not producing adequate hormone, consistent with hypothyroidism.",
                c: "PRIMARY HYPERTHYROIDISM — TSH is suppressed because the excess thyroid hormone (from the thyroid itself) provides strong negative feedback to the pituitary.",
                d: "PRIMARY HYPERTHYROIDISM — Elevated free T3 indicates excess thyroid hormone production. T3 is the more metabolically active form and contributes to hypermetabolic symptoms.",
                e: "PRIMARY HYPOTHYROIDISM — Hypothyroidism slows lipid metabolism, reducing LDL receptor activity and leading to elevated total cholesterol and LDL. This is a commonly overlooked finding."
            },
            testTakingTip: "Hypothyroidism slows EVERYTHING including lipid clearance, so cholesterol goes UP. This is a high-yield connection — unexplained hyperlipidemia should prompt thyroid screening.",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // Q8 — TSH Monitoring Timing (Application, Single)
        {
            id: "thyroid_008",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with newly diagnosed hypothyroidism started levothyroxine 50 mcg daily 2 weeks ago. The patient calls the clinic asking when to recheck TSH levels. What is the nurse's BEST response?",
            options: [
                { id: "a", text: "\"Come in today so we can check if the medication is working.\"" },
                { id: "b", text: "\"We typically recheck your TSH in 6 to 8 weeks after starting or changing the dose.\"" },
                { id: "c", text: "\"Your TSH should be rechecked in 6 months at your next annual physical.\"" },
                { id: "d", text: "\"You only need to recheck TSH if you develop new symptoms.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "TSH should be rechecked 6-8 weeks after starting levothyroxine or after any dose change. It takes this long for TSH to reach a new steady state after the thyroid hormone level changes. Checking too early gives inaccurate results and may lead to inappropriate dose adjustments.",
                a: "Checking TSH at 2 weeks is too early. Levothyroxine has a long half-life (~7 days), and TSH takes 6-8 weeks to stabilize. An early TSH may still be elevated, leading to an unnecessary dose increase.",
                c: "Waiting 6 months is too long for a newly started medication. The patient needs timely dose adjustments to reach the therapeutic target. Once stable, monitoring can be extended to every 6-12 months.",
                d: "TSH should be monitored on a schedule, not only when symptoms occur. Thyroid dysfunction can be detected by TSH changes before symptoms develop, allowing for proactive dose adjustment."
            },
            testTakingTip: "6-8 weeks is the magic number for TSH rechecks after any levothyroxine dose change. Think: '6-8 weeks to steady state.' Once stable, recheck every 6-12 months.",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // Q9 — Iodine and Thyroid Function (Knowledge, Single)
        {
            id: "thyroid_009",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is teaching a community health class about thyroid function. Which statement about iodine and the thyroid is MOST accurate?",
            options: [
                { id: "a", text: "Iodine is needed for the pituitary gland to produce TSH." },
                { id: "b", text: "Iodine deficiency is the most common cause of hypothyroidism in the United States." },
                { id: "c", text: "Iodine is an essential component of T3 and T4 synthesis; without adequate iodine, the thyroid cannot produce sufficient thyroid hormones." },
                { id: "d", text: "Excess dietary iodine always leads to hyperthyroidism because more iodine means more thyroid hormone production." }
            ],
            correct: "c",
            rationale: {
                correct: "Iodine is a critical building block for thyroid hormones. T4 contains 4 iodine atoms and T3 contains 3 iodine atoms. Without adequate iodine, the thyroid cannot synthesize sufficient hormones, leading to hypothyroidism and compensatory goiter formation.",
                a: "Iodine is needed by the THYROID gland to produce T3 and T4, not by the pituitary to produce TSH. TSH is a glycoprotein hormone that does not require iodine.",
                b: "In the US, iodine deficiency is rare due to iodized salt. The most common cause of hypothyroidism in the US is Hashimoto's thyroiditis (autoimmune). Iodine deficiency is the most common cause worldwide.",
                d: "Excess iodine does not always cause hyperthyroidism. In fact, large doses of iodine can temporarily SUPPRESS thyroid function (Wolff-Chaikoff effect). The effect depends on the underlying thyroid condition."
            },
            testTakingTip: "Iodine deficiency = #1 cause of hypothyroidism WORLDWIDE. Hashimoto's = #1 cause in the US. This distinction is high-yield for NCLEX. Remember: T4 has 4 iodines, T3 has 3.",
            guideSection: "Section 1 — Thyroid Physiology",
            guideSectionId: "physiology"
        },

        // Q10 — Interpreting Secondary Hypothyroidism (Analysis, Single)
        {
            id: "thyroid_010",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with a history of pituitary surgery presents with fatigue and cold intolerance. Lab results show TSH 0.8 mIU/L (normal: 0.4–4.0) and free T4 0.4 ng/dL (normal: 0.8–1.8). Which interpretation is MOST accurate?",
            options: [
                { id: "a", text: "The patient has primary hypothyroidism; the TSH should be higher." },
                { id: "b", text: "The labs are normal because TSH is within the reference range." },
                { id: "c", text: "The patient likely has secondary (central) hypothyroidism; the damaged pituitary cannot mount an appropriate TSH response." },
                { id: "d", text: "The low T4 is likely due to a lab error since the TSH is normal." }
            ],
            correct: "c",
            rationale: {
                correct: "In secondary (central) hypothyroidism, the pituitary is damaged and cannot produce adequate TSH. The TSH may be low or 'inappropriately normal' despite low T4. The history of pituitary surgery is the key clue. In primary hypothyroidism, the intact pituitary would drive TSH much higher in response to low T4.",
                a: "If this were primary hypothyroidism, TSH should indeed be much higher (often >10) in response to such a low T4. The fact that TSH is 'normal' despite low T4 points to pituitary dysfunction, not thyroid dysfunction.",
                b: "While TSH falls within the reference range numerically, it is INAPPROPRIATELY normal given the low T4. In a healthy axis, this T4 level would trigger a much higher TSH. Clinical context (pituitary surgery) is essential for interpretation.",
                d: "The T4 result is consistent with the patient's symptoms of fatigue and cold intolerance. Dismissing it as lab error would leave the patient untreated."
            },
            testTakingTip: "Secondary hypothyroidism trap: TSH looks 'normal' but T4 is low. The key is the TSH is INAPPROPRIATELY normal — a functioning pituitary would raise TSH much higher. Always consider pituitary history.",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // ================================================================
        //  SECTION 2 — HYPOTHYROIDISM, HASHIMOTO'S, LEVOTHYROXINE (Q11–Q30)
        // ================================================================

        // Q11 — Hypothyroidism Signs/Symptoms (Knowledge, Single)
        {
            id: "thyroid_011",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient with newly diagnosed hypothyroidism. Which cluster of findings is MOST consistent with this diagnosis?",
            options: [
                { id: "a", text: "Tachycardia, weight loss, diarrhea, and heat intolerance" },
                { id: "b", text: "Bradycardia, weight gain, constipation, and cold intolerance" },
                { id: "c", text: "Hypertension, headache, diaphoresis, and palpitations" },
                { id: "d", text: "Polyuria, polydipsia, polyphagia, and weight loss" }
            ],
            correct: "b",
            rationale: {
                correct: "Hypothyroidism causes everything to SLOW DOWN: heart rate decreases (bradycardia), metabolism drops (weight gain despite poor appetite), GI motility slows (constipation), and thermoregulation is impaired (cold intolerance). Think 'slow and low' for hypothyroidism.",
                a: "These are classic HYPERTHYROID symptoms — everything is sped up. Tachycardia, weight loss, diarrhea, and heat intolerance reflect a hypermetabolic state.",
                c: "This cluster suggests pheochromocytoma (catecholamine-secreting adrenal tumor), not hypothyroidism. The paroxysmal hypertension, headache, and diaphoresis triad is classic for pheochromocytoma.",
                d: "The 3 P's (polyuria, polydipsia, polyphagia) with weight loss are the hallmark presentation of diabetes mellitus, not hypothyroidism."
            },
            testTakingTip: "Hypothyroidism = everything SLOW and LOW. Hyperthyroidism = everything FAST and HIGH. This contrast is the most tested concept in thyroid disorders.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q12 — Hashimoto's Pathophysiology (Knowledge, Single)
        {
            id: "thyroid_012",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is diagnosed with Hashimoto's thyroiditis. Which statement BEST describes the pathophysiology of this condition?",
            options: [
                { id: "a", text: "A viral infection destroys thyroid follicular cells, causing temporary thyrotoxicosis." },
                { id: "b", text: "The immune system produces antibodies that attack thyroid tissue, causing progressive destruction and eventual hypothyroidism." },
                { id: "c", text: "The immune system produces antibodies that stimulate the thyroid, causing excess hormone production." },
                { id: "d", text: "A benign tumor of the thyroid gland compresses surrounding tissue, reducing hormone output." }
            ],
            correct: "b",
            rationale: {
                correct: "Hashimoto's thyroiditis is an autoimmune disorder where the immune system produces anti-thyroid peroxidase (anti-TPO) and anti-thyroglobulin antibodies. These antibodies cause chronic inflammation and progressive destruction of thyroid tissue, eventually leading to hypothyroidism. It is the most common cause of hypothyroidism in the US.",
                a: "This describes subacute (de Quervain's) thyroiditis, which is a viral-triggered inflammatory condition causing transient thyrotoxicosis followed by hypothyroidism. Hashimoto's is autoimmune, not viral.",
                c: "This describes Graves' disease, where thyroid-stimulating immunoglobulins (TSI) activate TSH receptors and cause hyperthyroidism. Hashimoto's antibodies destroy the thyroid rather than stimulate it.",
                d: "Thyroid tumors/nodules are a separate entity. Hashimoto's involves diffuse autoimmune destruction, not tumor compression."
            },
            testTakingTip: "Hashimoto's = autoimmune DESTRUCTION (hypo). Graves' = autoimmune STIMULATION (hyper). Both are autoimmune, but the antibodies do opposite things. Anti-TPO antibodies are the marker for Hashimoto's.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q13 — Hypothyroidism Causes Matrix (Application, Matrix)
        {
            id: "thyroid_013",
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Can Cause Hypothyroidism", "Does NOT Cause Hypothyroidism"],
            stem: "A nurse is reviewing medications and conditions that may cause hypothyroidism. For each item, indicate whether it can cause hypothyroidism or does NOT cause hypothyroidism.",
            options: [
                { id: "a", text: "Lithium therapy for bipolar disorder" },
                { id: "b", text: "Amiodarone therapy for cardiac arrhythmias" },
                { id: "c", text: "Metformin therapy for type 2 diabetes" },
                { id: "d", text: "Radioactive iodine treatment for hyperthyroidism" },
                { id: "e", text: "Hashimoto's thyroiditis" }
            ],
            correct: {
                a: "Can Cause Hypothyroidism",
                b: "Can Cause Hypothyroidism",
                c: "Does NOT Cause Hypothyroidism",
                d: "Can Cause Hypothyroidism",
                e: "Can Cause Hypothyroidism"
            },
            rationale: {
                correct: "Lithium, amiodarone, radioactive iodine treatment, and Hashimoto's are all well-established causes of hypothyroidism. Metformin is used for diabetes management and does not cause thyroid dysfunction.",
                a: "CAN CAUSE HYPOTHYROIDISM — Lithium inhibits thyroid hormone synthesis and release. Up to 20-30% of patients on lithium develop thyroid dysfunction. Regular TSH monitoring is essential.",
                b: "CAN CAUSE HYPOTHYROIDISM — Amiodarone contains large amounts of iodine and can cause either hypothyroidism (more common) or hyperthyroidism. It inhibits peripheral T4-to-T3 conversion and can be directly toxic to thyroid cells.",
                c: "DOES NOT CAUSE HYPOTHYROIDISM — Metformin is an oral antidiabetic that may lower TSH slightly but does not cause clinically significant hypothyroidism. It is not associated with thyroid dysfunction.",
                d: "CAN CAUSE HYPOTHYROIDISM — Radioactive iodine (I-131) destroys thyroid tissue by design. Most patients treated with RAI for hyperthyroidism eventually develop hypothyroidism and require lifelong levothyroxine.",
                e: "CAN CAUSE HYPOTHYROIDISM — Hashimoto's thyroiditis is the #1 cause of hypothyroidism in the US. Autoimmune antibodies (anti-TPO) progressively destroy thyroid tissue."
            },
            testTakingTip: "Key medications causing hypothyroidism: Lithium, Amiodarone, Interferon-alpha, and RAI. Remember 'LAIR' — Lithium, Amiodarone, Interferon, Radioactive iodine. If a patient on these develops fatigue/weight gain, check TSH.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q14 — Hypothyroidism vs Hyperthyroidism Matrix (Analysis, Matrix)
        {
            id: "thyroid_014",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Hypothyroidism", "Hyperthyroidism"],
            stem: "The nurse is reviewing clinical manifestations of thyroid disorders. For each finding, identify whether it is associated with hypothyroidism or hyperthyroidism.",
            options: [
                { id: "a", text: "Cold intolerance and dry, coarse skin" },
                { id: "b", text: "Diarrhea and weight loss despite increased appetite" },
                { id: "c", text: "Delayed deep tendon reflexes" },
                { id: "d", text: "Tremors, anxiety, and insomnia" },
                { id: "e", text: "Periorbital edema and puffy face" },
                { id: "f", text: "Menorrhagia (heavy menstrual periods)" }
            ],
            correct: {
                a: "Hypothyroidism",
                b: "Hyperthyroidism",
                c: "Hypothyroidism",
                d: "Hyperthyroidism",
                e: "Hypothyroidism",
                f: "Hypothyroidism"
            },
            rationale: {
                correct: "Hypothyroidism slows everything: metabolism (cold intolerance), skin turnover (dry skin), reflexes (delayed), fluid clearance (edema), and causes heavy menses. Hyperthyroidism speeds everything up: GI transit (diarrhea), metabolism (weight loss), nervous system (tremors, anxiety, insomnia).",
                a: "HYPOTHYROIDISM — Decreased metabolism reduces heat production (cold intolerance). Slowed skin cell turnover and decreased sebaceous gland activity causes dry, coarse skin.",
                b: "HYPERTHYROIDISM — Increased metabolic rate causes weight loss even with increased caloric intake. Increased GI motility causes diarrhea or frequent bowel movements.",
                c: "HYPOTHYROIDISM — Slowed nerve conduction causes delayed (hung) deep tendon reflexes, a classic physical exam finding in hypothyroidism.",
                d: "HYPERTHYROIDISM — Increased sympathetic nervous system stimulation from excess thyroid hormone causes fine tremors, anxiety, irritability, and insomnia.",
                e: "HYPOTHYROIDISM — Mucopolysaccharide accumulation in tissues causes non-pitting periorbital edema and facial puffiness (myxedema). This is different from the exophthalmos of Graves' disease.",
                f: "HYPOTHYROIDISM — Decreased metabolism affects the menstrual cycle, typically causing menorrhagia (heavy, prolonged periods). Hyperthyroidism causes the opposite: oligomenorrhea or amenorrhea (light or absent periods)."
            },
            testTakingTip: "Menstrual changes are a high-yield comparison: Hypo = HEAVY periods (everything accumulates). Hyper = LIGHT/absent periods (everything speeds through). Also, periorbital edema is HYPOthyroid; exophthalmos is Graves' HYPERthyroid.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q15 — Levothyroxine Empty Stomach (Application, Single)
        {
            id: "thyroid_015",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient prescribed levothyroxine asks, \"Why can't I just take this pill with my breakfast?\" Which response by the nurse provides the BEST explanation?",
            options: [
                { id: "a", text: "\"Food can cause the medication to be absorbed too quickly, increasing the risk of side effects.\"" },
                { id: "b", text: "\"Food, especially fiber and dairy, binds to levothyroxine in the stomach and significantly reduces how much your body absorbs, making the medication less effective.\"" },
                { id: "c", text: "\"Levothyroxine must be taken with food to prevent stomach ulcers.\"" },
                { id: "d", text: "\"It doesn't really matter when you take it; taking it with breakfast is fine as long as you're consistent.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Food, particularly fiber, calcium-containing dairy products, and soy, significantly reduces levothyroxine absorption by binding to the medication in the GI tract. Studies show food can reduce bioavailability by up to 40-80%. Taking it on an empty stomach 30-60 minutes before breakfast ensures optimal and consistent absorption.",
                a: "Food DECREASES absorption, not increases it. Taking levothyroxine with food does not cause rapid absorption or increased side effects.",
                c: "Levothyroxine does not cause stomach ulcers and does not need to be taken with food for GI protection. This is not an NSAID.",
                d: "Timing with respect to food DOES matter significantly. While consistency is important, taking levothyroxine with breakfast instead of on an empty stomach can reduce absorption by 40-80%, leading to subtherapeutic levels."
            },
            testTakingTip: "Levothyroxine absorption enemies: Food, Fiber, Iron, Calcium, Antacids, Coffee, Soy. Take on empty stomach, 30-60 min before breakfast. Separate from calcium/iron by 4 hours.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q16 — Levothyroxine-Warfarin Interaction (Analysis, Single)
        {
            id: "thyroid_016",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with hypothyroidism is on warfarin for atrial fibrillation. The provider starts levothyroxine 75 mcg daily. Which assessment finding would MOST concern the nurse at the 6-week follow-up?",
            options: [
                { id: "a", text: "INR of 4.2 (target range 2.0–3.0)" },
                { id: "b", text: "Blood pressure of 128/78 mmHg" },
                { id: "c", text: "Heart rate of 72 bpm" },
                { id: "d", text: "TSH of 6.8 mIU/L (target: 0.4–4.0)" }
            ],
            correct: "a",
            rationale: {
                correct: "Levothyroxine INCREASES the anticoagulant effect of warfarin by increasing catabolism of vitamin K-dependent clotting factors. An INR of 4.2 is significantly above the therapeutic range (2.0-3.0), putting the patient at risk for serious bleeding. The warfarin dose may need to be decreased, and INR should be monitored more frequently when starting levothyroxine.",
                b: "A blood pressure of 128/78 is within an acceptable range and is not concerning.",
                c: "A heart rate of 72 bpm is normal and not concerning. It would be more worrisome if the heart rate were significantly elevated (suggesting levothyroxine overdose).",
                d: "While TSH is still mildly elevated, this is a dosing concern (the levothyroxine dose may need to be increased), not an immediate safety concern like the supratherapeutic INR."
            },
            testTakingTip: "Levothyroxine + warfarin = increased bleeding risk. When starting levothyroxine in a patient on warfarin, expect to DECREASE the warfarin dose and increase INR monitoring frequency.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q17 — Levothyroxine Drug Interactions Ordering (Application, Ordering)
        {
            id: "thyroid_017",
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient takes levothyroxine, calcium carbonate, and a multivitamin with iron. Place the medications in the correct order the patient should take them throughout the morning to ensure proper absorption.",
            options: [
                { id: "a", text: "Take levothyroxine on an empty stomach at 6:00 AM" },
                { id: "b", text: "Wait at least 30-60 minutes before eating breakfast at 7:00 AM" },
                { id: "c", text: "Take calcium carbonate with breakfast" },
                { id: "d", text: "Take multivitamin with iron at lunch (at least 4 hours after levothyroxine)" }
            ],
            correct: ["a", "b", "c", "d"],
            rationale: {
                correct: "Levothyroxine must be taken first thing on an empty stomach. After waiting 30-60 minutes, the patient can eat breakfast and take calcium. The iron-containing multivitamin must be separated by at least 4 hours from levothyroxine because iron, like calcium, significantly decreases levothyroxine absorption by binding to it in the GI tract.",
                a: "FIRST — Levothyroxine must be taken on an empty stomach with a full glass of water to ensure maximum absorption. No food, beverages (except water), or other medications.",
                b: "SECOND — A minimum of 30-60 minutes must pass before eating to allow levothyroxine to be absorbed in the stomach without interference from food.",
                c: "THIRD — Calcium can be taken with breakfast, but it must not be taken at the same time as levothyroxine. Taking it with breakfast provides adequate separation if levothyroxine was taken 30-60 minutes earlier.",
                d: "FOURTH — Iron decreases levothyroxine absorption and must be separated by at least 4 hours. Taking the iron-containing multivitamin at lunch provides adequate spacing."
            },
            testTakingTip: "The 4-hour rule for levothyroxine: Calcium, Iron, and Antacids must be separated by at least 4 hours. The simplest schedule: levothyroxine at waking, calcium with breakfast, iron at lunch.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q18 — Levothyroxine Overdose Signs (Application, Single)
        {
            id: "thyroid_018",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on levothyroxine 125 mcg daily for 3 months calls the clinic reporting palpitations, tremors, difficulty sleeping, and a 5-pound weight loss over 2 weeks. Which action by the nurse is MOST appropriate?",
            options: [
                { id: "a", text: "Reassure the patient that these are expected effects of the medication starting to work." },
                { id: "b", text: "Advise the patient to hold the levothyroxine, report symptoms to the provider, and come in for a TSH level." },
                { id: "c", text: "Tell the patient to double the dose since the symptoms suggest the medication is not working." },
                { id: "d", text: "Instruct the patient to take the medication with food to slow absorption." }
            ],
            correct: "b",
            rationale: {
                correct: "Palpitations, tremors, insomnia, and weight loss are signs of hyperthyroidism — suggesting the levothyroxine dose is too high. The nurse should advise the patient to hold the medication, notify the provider for possible dose reduction, and obtain a TSH level to confirm. These symptoms indicate the patient is receiving more thyroid hormone than needed.",
                a: "These are NOT expected therapeutic effects. While it may take weeks to feel the beneficial effects of levothyroxine, symptoms of hyperthyroidism (palpitations, tremors, insomnia) indicate overreplacement, not therapeutic response.",
                c: "Doubling the dose would WORSEN hyperthyroid symptoms and could be dangerous, potentially causing cardiac arrhythmias or angina. The symptoms indicate the dose is already too HIGH.",
                d: "Taking levothyroxine with food to slow absorption is not an appropriate solution for overreplacement. The dose needs to be adjusted by the provider based on TSH levels."
            },
            testTakingTip: "Levothyroxine side effects = signs of HYPERthyroidism (too much replacement). If a hypothyroid patient develops tachycardia, tremors, weight loss, or insomnia — think dose too HIGH, not medication failure.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q19 — Levothyroxine in Elderly (Analysis, Single)
        {
            id: "thyroid_019",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 78-year-old patient with a history of coronary artery disease is diagnosed with hypothyroidism. The provider orders levothyroxine. Which prescribing principle is MOST important for this patient?",
            options: [
                { id: "a", text: "Start with a full replacement dose to normalize thyroid levels as quickly as possible." },
                { id: "b", text: "Start with a low dose (12.5-25 mcg) and increase gradually, monitoring for cardiac symptoms." },
                { id: "c", text: "Start with a high dose and taper down once TSH normalizes." },
                { id: "d", text: "Avoid levothyroxine entirely in patients over 65 due to cardiac risk." }
            ],
            correct: "b",
            rationale: {
                correct: "In elderly patients and those with cardiac disease, levothyroxine must be started at a LOW dose (12.5-25 mcg) and titrated slowly. Thyroid hormone increases myocardial oxygen demand and heart rate. Rapidly normalizing thyroid levels in a cardiac patient can precipitate angina, myocardial infarction, or arrhythmias. The principle is 'start low, go slow.'",
                a: "A full replacement dose in an elderly cardiac patient could be dangerous. Rapidly increasing metabolic rate increases cardiac workload and oxygen demand, potentially causing MI or arrhythmias in an already compromised heart.",
                c: "There is no clinical rationale for starting high and tapering. This approach would expose the cardiac patient to unnecessary risk from the initial high dose.",
                d: "Hypothyroidism should still be treated in elderly patients — untreated hypothyroidism worsens cardiovascular disease (hyperlipidemia, cardiac dysfunction). The key is to start low and titrate carefully, not to avoid treatment."
            },
            testTakingTip: "Elderly + cardiac disease + levothyroxine = 'Start LOW, go SLOW.' Typical starting dose: 12.5-25 mcg (vs 50-100 mcg in healthy younger adults). Monitor for chest pain, palpitations, and shortness of breath.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q20 — Levothyroxine Patient Teaching Matrix (Analysis, Matrix)
        {
            id: "thyroid_020",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "The nurse is evaluating a hypothyroid patient's understanding of levothyroxine therapy. For each statement, indicate whether it demonstrates correct understanding or needs more teaching.",
            options: [
                { id: "a", text: "\"I take my levothyroxine first thing in the morning with just water, then wait an hour before eating.\"" },
                { id: "b", text: "\"My TSH is normal now, so my doctor said I can stop taking the levothyroxine.\"" },
                { id: "c", text: "\"I switched to a generic brand because it was cheaper. I didn't think I needed to tell my doctor.\"" },
                { id: "d", text: "\"I take my iron supplement at lunchtime since I know it can't be taken with my thyroid pill.\"" },
                { id: "e", text: "\"If I miss a dose, I just double up the next morning to catch up.\"" }
            ],
            correct: {
                a: "Correct Understanding",
                b: "Needs More Teaching",
                c: "Needs More Teaching",
                d: "Correct Understanding",
                e: "Needs More Teaching"
            },
            rationale: {
                correct: "Taking levothyroxine on an empty stomach with water (A) and separating iron by several hours (D) show correct understanding. Stopping medication when TSH normalizes (B), switching brands without notifying the provider (C), and doubling doses (E) all indicate misunderstanding of therapy.",
                a: "CORRECT UNDERSTANDING — Taking levothyroxine on an empty stomach with water and waiting before eating is the proper administration technique for optimal absorption.",
                b: "NEEDS MORE TEACHING — Normal TSH means the medication IS WORKING, not that the condition is cured. Hypothyroidism (especially from Hashimoto's) requires lifelong therapy. Stopping medication will cause TSH to rise and symptoms to return.",
                c: "NEEDS MORE TEACHING — Different levothyroxine brands have different bioavailability despite containing the same dose. Switching brands can alter thyroid hormone levels and may require TSH monitoring and dose adjustment. The provider must be notified.",
                d: "CORRECT UNDERSTANDING — Separating iron from levothyroxine by taking iron at lunch provides adequate spacing (4+ hours) to prevent the iron-levothyroxine binding interaction that reduces absorption.",
                e: "NEEDS MORE TEACHING — Patients should NOT double doses. If a dose is missed, take it as soon as remembered unless it is close to the next dose. Doubling can cause hyperthyroid symptoms (palpitations, tremors)."
            },
            testTakingTip: "Three common patient misconceptions about levothyroxine: (1) 'I can stop it when levels are normal,' (2) 'Generic is the same,' and (3) 'Double up if I miss a dose.' All are WRONG. Lifelong therapy, same brand, never double.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q21 — Hypothyroidism and Cholesterol (Application, Single)
        {
            id: "thyroid_021",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 55-year-old patient presents for a routine physical. Labs reveal a total cholesterol of 278 mg/dL and LDL of 192 mg/dL. The patient has been compliant with diet and exercise. Before starting a statin, the nurse practitioner orders which additional test?",
            options: [
                { id: "a", text: "Hemoglobin A1C" },
                { id: "b", text: "TSH level" },
                { id: "c", text: "Liver function panel" },
                { id: "d", text: "C-reactive protein" }
            ],
            correct: "b",
            rationale: {
                correct: "Hypothyroidism is a reversible cause of hyperlipidemia. Decreased thyroid hormone reduces LDL receptor activity, slowing cholesterol clearance and elevating total cholesterol and LDL. Checking TSH before starting a statin is important because treating hypothyroidism with levothyroxine may normalize cholesterol without the need for a statin.",
                a: "While A1C is useful for diabetes screening, it would not explain isolated hyperlipidemia in a patient who is diet/exercise compliant. Hypothyroidism is a more likely secondary cause.",
                c: "Liver function tests are typically checked before starting a statin (baseline) but would not explain why a compliant patient has elevated cholesterol. Checking for hypothyroidism first may avoid the need for statin therapy entirely.",
                d: "CRP is an inflammatory marker used for cardiovascular risk stratification. While useful, it would not identify the underlying cause of elevated cholesterol in this scenario."
            },
            testTakingTip: "Unexplained hyperlipidemia despite lifestyle modifications → screen for hypothyroidism. Treating the thyroid may normalize lipids and avoid unnecessary statin use. This is a classic NCLEX connection.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q22 — Hypothyroidism Assessment Ordering (Application, Ordering)
        {
            id: "thyroid_022",
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient presents to the clinic with fatigue, weight gain, and constipation. The nurse suspects hypothyroidism. Place the following nursing actions in the correct priority order.",
            options: [
                { id: "a", text: "Perform a focused physical assessment (vital signs, skin, reflexes, thyroid palpation)" },
                { id: "b", text: "Obtain a detailed health history including medications, family history, and symptom timeline" },
                { id: "c", text: "Anticipate and obtain lab work (TSH, free T4) as ordered" },
                { id: "d", text: "Educate the patient about potential diagnosis and next steps" },
                { id: "e", text: "Document findings and collaborate with the provider on treatment plan" }
            ],
            correct: ["b", "a", "c", "d", "e"],
            rationale: {
                correct: "The nursing process guides the order: (1) Collect subjective data through history first (medications like lithium are a key cause), (2) Perform objective physical assessment, (3) Obtain diagnostic labs to confirm, (4) Educate the patient, and (5) Document and plan treatment. History always comes before physical assessment in a non-emergent setting.",
                b: "FIRST — A thorough history is essential. Medication history (lithium, amiodarone), family history of thyroid/autoimmune disease, and symptom timeline help narrow the differential diagnosis.",
                a: "SECOND — Physical assessment findings (bradycardia, dry skin, delayed reflexes, thyroid enlargement) provide objective data to support the suspected diagnosis.",
                c: "THIRD — TSH and free T4 are the confirmatory tests. Labs are obtained after assessment data supports the clinical suspicion.",
                d: "FOURTH — Patient education about the suspected condition, expected testing, and potential lifelong treatment helps reduce anxiety and promote compliance.",
                e: "FIFTH — Documentation of all findings and collaboration with the provider ensures continuity of care and appropriate treatment initiation."
            },
            testTakingTip: "In non-emergency assessment: History FIRST, then physical exam, then diagnostics, then teaching, then documentation. The nursing process order: Assessment (history + physical) → Diagnosis → Planning → Implementation → Evaluation.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q23 — Levothyroxine Contraindications (Analysis, Single)
        {
            id: "thyroid_023",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with severe hypothyroidism is admitted with chest pain. Troponin levels are elevated, and an ECG shows ST-segment changes consistent with acute myocardial infarction. The nurse anticipates which modification to the patient's thyroid management plan?",
            options: [
                { id: "a", text: "Immediately start a full replacement dose of levothyroxine to prevent myxedema coma." },
                { id: "b", text: "Delay levothyroxine initiation or use a very low dose until the cardiac event is stabilized." },
                { id: "c", text: "Administer IV liothyronine (T3) for rapid correction of hypothyroidism." },
                { id: "d", text: "Discontinue all cardiac medications and focus exclusively on thyroid replacement." }
            ],
            correct: "b",
            rationale: {
                correct: "Recent or acute MI is a relative contraindication for initiating levothyroxine, especially at standard doses. Thyroid hormone increases heart rate, myocardial contractility, and oxygen demand — all of which would worsen myocardial ischemia. Treatment should be delayed or started at extremely low doses (12.5 mcg) once the cardiac event is stabilized.",
                a: "A full replacement dose would significantly increase cardiac workload and oxygen demand, potentially extending the MI or causing fatal arrhythmias. This is the opposite of safe management.",
                c: "IV T3 acts even faster than T4 and would be MORE dangerous in the setting of acute MI. Rapid thyroid hormone replacement with an active cardiac event is contraindicated.",
                d: "Cardiac medications are critical during an acute MI. Thyroid management must be balanced with cardiac care, not substituted for it."
            },
            testTakingTip: "Recent MI = delay or minimize levothyroxine. The heart cannot handle the increased workload. Also remember: untreated adrenal insufficiency is the OTHER major contraindication (give corticosteroids first).",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q24 — Hypothyroidism in Pregnancy (Application, Single)
        {
            id: "thyroid_024",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A pregnant patient with known hypothyroidism asks whether she should continue her levothyroxine during pregnancy. Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"You should stop levothyroxine during pregnancy because it can harm the developing baby.\"" },
                { id: "b", text: "\"Continue taking levothyroxine. Your dose will likely need to be INCREASED during pregnancy because your body needs more thyroid hormone.\"" },
                { id: "c", text: "\"Switch to a natural thyroid supplement during pregnancy instead of levothyroxine.\"" },
                { id: "d", text: "\"Continue the same dose throughout pregnancy; no adjustments are needed.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Levothyroxine is safe and essential during pregnancy. Untreated maternal hypothyroidism increases risk of miscarriage, preeclampsia, preterm birth, and impaired fetal neurodevelopment. Most women need a 25-50% dose increase during pregnancy because of increased thyroid hormone-binding globulin, expanded blood volume, and fetal demand. TSH should be monitored every 4 weeks in the first trimester.",
                a: "Levothyroxine is FDA category A and is safe in pregnancy. STOPPING it would be harmful — untreated hypothyroidism has serious consequences for both mother and fetus including intellectual disability in the child.",
                c: "Natural thyroid supplements (desiccated thyroid) have inconsistent potency and are not recommended as first-line therapy. There is no reason to switch from levothyroxine during pregnancy.",
                d: "The same dose is usually NOT sufficient during pregnancy. Most women need a 25-50% increase. Maintaining the pre-pregnancy dose risks maternal and fetal complications from inadequate thyroid hormone levels."
            },
            testTakingTip: "Levothyroxine in pregnancy: CONTINUE and expect to INCREASE dose by 25-50%. Untreated maternal hypothyroidism → fetal brain damage. Monitor TSH every 4 weeks in 1st trimester.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q25 — Hypothyroidism Neurological Effects (Knowledge, Single)
        {
            id: "thyroid_025",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with untreated hypothyroidism reports that family members have noticed the patient seems more forgetful and depressed over the past several months. The nurse understands these cognitive and mood changes are related to:",
            options: [
                { id: "a", text: "An unrelated psychiatric condition requiring separate treatment with antidepressants." },
                { id: "b", text: "Decreased cerebral metabolism and neurotransmitter changes caused by insufficient thyroid hormone." },
                { id: "c", text: "Excessive thyroid hormone stimulating the limbic system." },
                { id: "d", text: "Electrolyte imbalances caused by thyroid dysfunction affecting the kidneys." }
            ],
            correct: "b",
            rationale: {
                correct: "Thyroid hormone is critical for brain function. Hypothyroidism reduces cerebral blood flow and metabolism, impairs neurotransmitter synthesis (including serotonin), and slows neural processing. This manifests as depression, memory impairment, difficulty concentrating, and cognitive slowing — often misdiagnosed as primary depression or early dementia.",
                a: "While these symptoms mimic primary depression, initiating antidepressants without checking thyroid function would miss the underlying cause. Depression secondary to hypothyroidism often resolves with levothyroxine alone.",
                c: "Excess thyroid hormone causes anxiety and irritability (hyperthyroidism), not depression and memory loss. Hypothyroidism causes depressive symptoms due to INSUFFICIENT thyroid hormone.",
                d: "While hypothyroidism can cause mild electrolyte changes (such as hyponatremia), the cognitive and mood symptoms are primarily due to direct effects of low thyroid hormone on brain metabolism, not electrolyte imbalances."
            },
            testTakingTip: "New-onset depression or cognitive decline → always check TSH. Hypothyroidism is a reversible cause of depression and 'pseudodementia,' especially in older adults. Treat the thyroid first before adding psychotropics.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q26 — Hashimoto's Antibodies (Knowledge, Single)
        {
            id: "thyroid_026",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is diagnosed with Hashimoto's thyroiditis. Which antibody test result would the nurse expect to find ELEVATED?",
            options: [
                { id: "a", text: "Thyroid-stimulating immunoglobulins (TSI)" },
                { id: "b", text: "Anti-thyroid peroxidase (anti-TPO) antibodies" },
                { id: "c", text: "Anti-nuclear antibodies (ANA)" },
                { id: "d", text: "Anti-smooth muscle antibodies" }
            ],
            correct: "b",
            rationale: {
                correct: "Anti-TPO antibodies are the hallmark serologic marker of Hashimoto's thyroiditis. Present in approximately 90-95% of patients, these antibodies target thyroid peroxidase, an enzyme essential for thyroid hormone synthesis. Anti-thyroglobulin antibodies may also be elevated. Their presence confirms the autoimmune etiology.",
                a: "TSI (thyroid-stimulating immunoglobulins) are the hallmark of Graves' disease, not Hashimoto's. TSI stimulates the thyroid (causing hyperthyroidism), while anti-TPO antibodies destroy it (causing hypothyroidism).",
                c: "ANA is associated with systemic lupus erythematosus and other systemic autoimmune conditions, not specifically with Hashimoto's thyroiditis.",
                d: "Anti-smooth muscle antibodies are associated with autoimmune hepatitis, not thyroid disease."
            },
            testTakingTip: "Hashimoto's marker = anti-TPO antibodies (destruction). Graves' marker = TSI (stimulation). Both are autoimmune, but the antibody type determines whether the thyroid is destroyed or overstimulated.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q27 — Levothyroxine Brand Consistency (Application, Single)
        {
            id: "thyroid_027",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient calls the pharmacy and is told their usual brand of levothyroxine is unavailable and a different manufacturer's generic will be substituted. What should the nurse advise?",
            options: [
                { id: "a", text: "\"All levothyroxine brands are identical. Take whatever the pharmacy provides.\"" },
                { id: "b", text: "\"Notify your provider about the brand change. You may need a TSH recheck in 6-8 weeks to ensure the new formulation maintains your levels.\"" },
                { id: "c", text: "\"Stop taking levothyroxine until your usual brand is available.\"" },
                { id: "d", text: "\"Double the dose of the new brand since generics are weaker than brand-name medications.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Different levothyroxine formulations can have variations in bioavailability even at the same dose. The FDA considers levothyroxine a narrow therapeutic index drug. Brand changes can result in subtle but clinically significant differences in absorption, potentially causing hypo- or hyperthyroid symptoms. The provider should be notified, and TSH should be rechecked in 6-8 weeks.",
                a: "Levothyroxine brands are NOT bioequivalent despite containing the same dose. Small differences in formulation, fillers, and manufacturing can affect absorption and therapeutic levels.",
                c: "Stopping levothyroxine would cause hypothyroid symptoms to return and could potentially precipitate myxedema coma in severely hypothyroid patients. It is better to take a different brand than no medication.",
                d: "Doubling the dose is dangerous and not supported by evidence. Generic medications are not inherently weaker; they simply may have slightly different bioavailability profiles."
            },
            testTakingTip: "Levothyroxine = narrow therapeutic index. Brand switches require provider notification and TSH recheck in 6-8 weeks. This applies to any change: brand to generic, generic to brand, or generic to generic.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q28 — Levothyroxine Teaching Priorities Ordering (Application, Ordering)
        {
            id: "thyroid_028",
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing discharge teaching for a patient newly started on levothyroxine. Rank the following teaching points from MOST to LEAST critical for patient safety.",
            options: [
                { id: "a", text: "Report chest pain, palpitations, or rapid heartbeat immediately — these may indicate the dose is too high" },
                { id: "b", text: "Take the medication every day at the same time on an empty stomach — this is lifelong therapy" },
                { id: "c", text: "Separate levothyroxine from calcium, iron, and antacids by at least 4 hours" },
                { id: "d", text: "Wear a medical alert identification bracelet" },
                { id: "e", text: "It may take 4-6 weeks before you notice significant symptom improvement" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Safety-critical information comes first: (1) Recognizing cardiac danger signs prevents life-threatening complications. (2) Daily adherence and proper administration ensure therapeutic effect. (3) Drug interaction avoidance prevents subtherapeutic levels. (4) Medical alert ID ensures proper emergency care. (5) Expectation setting, while important, is least critical for safety.",
                a: "MOST CRITICAL — Cardiac symptoms from overreplacement can be life-threatening, especially in elderly patients or those with heart disease. Prompt reporting enables dose adjustment before serious events occur.",
                b: "SECOND — Understanding that this is lifelong, daily therapy taken on an empty stomach is essential for therapeutic adherence. Non-compliance leads to hypothyroid symptoms and potential myxedema coma.",
                c: "THIRD — Drug interactions are a common cause of treatment failure. Patients who take calcium or iron with levothyroxine may remain symptomatic despite appropriate dosing.",
                d: "FOURTH — Medical alert identification ensures emergency providers know about the thyroid condition and medication, which is important if the patient is unable to communicate.",
                e: "FIFTH — While important for managing expectations and preventing premature discontinuation, this is not a safety-critical teaching point."
            },
            testTakingTip: "When ranking teaching priorities: Safety first (danger signs), then adherence (how to take it correctly), then drug interactions, then supportive info. NCLEX loves ranking by urgency.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q29 — Hypothyroidism Skin/Hair Changes (Knowledge, Single)
        {
            id: "thyroid_029",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "During a physical assessment, the nurse observes that a hypothyroid patient has dry, coarse skin, brittle nails, and thinning hair with loss of the outer third of the eyebrows. These findings are related to:",
            options: [
                { id: "a", text: "Increased sebaceous gland activity from excess thyroid hormone." },
                { id: "b", text: "Decreased metabolic activity reducing skin cell turnover, sebum production, and hair follicle cycling." },
                { id: "c", text: "An allergic reaction to levothyroxine medication." },
                { id: "d", text: "Iron deficiency anemia, which commonly co-occurs with thyroid disease." }
            ],
            correct: "b",
            rationale: {
                correct: "Hypothyroidism decreases metabolic activity throughout the body, including the skin and hair follicles. Reduced skin cell turnover causes dryness and coarseness, decreased sebum production compounds skin dryness, and slowed hair follicle cycling leads to brittle hair and hair loss. Loss of the lateral third of the eyebrows (Queen Anne's sign) is a classic physical finding.",
                a: "INCREASED sebaceous activity occurs in hyperthyroidism (warm, moist skin). Hypothyroidism DECREASES sebaceous activity, causing the opposite — dry, rough skin.",
                c: "These changes are from the hypothyroid state itself, not from medication. In fact, these symptoms typically improve with levothyroxine treatment as metabolism normalizes.",
                d: "While iron deficiency can cause hair loss and brittle nails, the combination of symptoms (especially lateral eyebrow loss and dry coarse skin) is characteristic of hypothyroidism specifically. The findings should improve with thyroid replacement."
            },
            testTakingTip: "Lateral eyebrow loss (Queen Anne's sign) is a classic hypothyroid finding. The skin/hair changes in hypothyroidism reflect the slowed cellular metabolism throughout the body — everything grows and regenerates more slowly.",
            guideSection: "Section 3 — Hypothyroidism",
            guideSectionId: "hypothyroidism"
        },

        // Q30 — Goiter Assessment (Application, Single)
        {
            id: "thyroid_030",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient presents with a visibly enlarged anterior neck. The patient reports difficulty swallowing and a sensation of pressure in the throat. The nurse palpates a symmetrically enlarged, non-tender thyroid gland. Which question is MOST important for the nurse to ask?",
            options: [
                { id: "a", text: "\"Have you been eating a lot of seafood lately?\"" },
                { id: "b", text: "\"Do you have any difficulty breathing, especially when lying flat?\"" },
                { id: "c", text: "\"Have you traveled to any tropical countries recently?\"" },
                { id: "d", text: "\"Do you exercise regularly?\"" }
            ],
            correct: "b",
            rationale: {
                correct: "A large goiter can compress the trachea, especially when the patient lies flat (positional dyspnea). Assessing for airway compromise is the priority because tracheal compression can become life-threatening. Difficulty breathing when supine suggests the goiter is significant enough to warrant urgent evaluation and possible surgical intervention.",
                a: "While dietary iodine is relevant to thyroid function, asking about seafood intake is not the priority when the patient already has a large goiter causing dysphagia. Airway assessment takes precedence.",
                c: "Travel history is not directly relevant to goiter assessment unless considering iodine-deficient regions, but this is not the priority question when a large goiter is already present with pressure symptoms.",
                d: "Exercise habits are not relevant to the immediate assessment of a symptomatic goiter."
            },
            testTakingTip: "Large goiter + pressure symptoms → assess AIRWAY first. A goiter that causes dysphagia may also cause tracheal compression. Position-dependent dyspnea (worse when supine) is a red flag for surgical referral.",
            guideSection: "Section 8 — Goiter & Nodules",
            guideSectionId: "goiter-nodules"
        },

        // ================================================================
        //  SECTION 3 — MYXEDEMA COMA (Q31–Q40)
        // ================================================================

        // Q31 — Myxedema Coma Recognition (Analysis, Single — Priority)
        {
            id: "thyroid_031",
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse finds an unresponsive patient with a known history of hypothyroidism. Vital signs are: temperature 93.2°F (34°C), heart rate 38 bpm, blood pressure 78/50 mmHg, and respiratory rate 6 breaths/min. Which condition should the nurse suspect, and what is the PRIORITY action?",
            options: [
                { id: "a", text: "Thyroid storm; administer PTU and beta-blockers immediately." },
                { id: "b", text: "Myxedema coma; activate the rapid response team and prepare for ICU transfer with IV levothyroxine and supportive care." },
                { id: "c", text: "Diabetic ketoacidosis; check blood glucose and prepare an insulin drip." },
                { id: "d", text: "Septic shock; obtain blood cultures and administer broad-spectrum antibiotics." }
            ],
            correct: "b",
            rationale: {
                correct: "This is a classic myxedema coma presentation: hypothermia (<95°F), severe bradycardia, hypotension, hypoventilation, and altered consciousness in a patient with hypothyroid history. This is a medical emergency requiring ICU-level care, IV levothyroxine, IV corticosteroids (for possible coexisting adrenal insufficiency), and supportive measures. Mortality is 30-60% even with treatment.",
                a: "Thyroid storm presents with the OPPOSITE: high fever (>104°F), tachycardia, hypertension, and agitation. This patient has hypothermia and bradycardia — consistent with severe hypothyroidism, not hyperthyroidism.",
                c: "While blood glucose should be checked (myxedema coma can cause hypoglycemia), the overall presentation with hypothermia, bradycardia, and hypothyroid history points to myxedema coma rather than DKA. DKA typically presents with tachycardia, Kussmaul respirations, and hyperglycemia.",
                d: "While infection can trigger myxedema coma and should be investigated, the primary presentation with hypothermia, severe bradycardia, and hypothyroid history is classic for myxedema coma. Treating the underlying thyroid emergency is the priority."
            },
            testTakingTip: "Myxedema coma hallmark: Hypothermia + Bradycardia + Hypotension + Altered consciousness + Hypothyroid history. It's the opposite of thyroid storm in every way. Think: 'Everything is critically SLOW.'",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q32 — Myxedema Coma Triggers Matrix (Knowledge, Matrix)
        {
            id: "thyroid_032",
            type: "matrix",
            subtype: null,
            difficulty: "knowledge",
            matrixColumns: ["Known Trigger for Myxedema Coma", "NOT a Trigger for Myxedema Coma"],
            stem: "A nurse is reviewing risk factors for myxedema coma in a hypothyroid patient. For each factor, identify whether it is a known trigger for myxedema coma or NOT a trigger.",
            options: [
                { id: "a", text: "Active pneumonia or urinary tract infection" },
                { id: "b", text: "Administration of sedative or opioid medications" },
                { id: "c", text: "Moderate exercise on a warm day" },
                { id: "d", text: "Prolonged cold exposure during winter" },
                { id: "e", text: "Patient stopped taking levothyroxine 2 weeks ago" },
                { id: "f", text: "Eating a high-fiber meal" }
            ],
            correct: {
                a: "Known Trigger for Myxedema Coma",
                b: "Known Trigger for Myxedema Coma",
                c: "NOT a Trigger for Myxedema Coma",
                d: "Known Trigger for Myxedema Coma",
                e: "Known Trigger for Myxedema Coma",
                f: "NOT a Trigger for Myxedema Coma"
            },
            rationale: {
                correct: "Myxedema coma triggers include infection, sedatives/opioids, cold exposure, and medication non-compliance. Exercise and dietary fiber are not precipitating factors for this thyroid emergency.",
                a: "KNOWN TRIGGER — Infection is the most common precipitant of myxedema coma. Pneumonia and UTI are leading triggers because the body's metabolic demand increases but the hypothyroid state prevents appropriate response.",
                b: "KNOWN TRIGGER — Sedatives, opioids, and anesthesia further suppress the already-depressed CNS and respiratory drive in hypothyroid patients, potentially tipping them into myxedema coma.",
                c: "NOT A TRIGGER — Moderate exercise on a warm day is not a precipitating factor. In fact, cold exposure (not warmth) is a trigger. Exercise at a tolerable level is generally safe for hypothyroid patients.",
                d: "KNOWN TRIGGER — Cold exposure increases metabolic demand for thermogenesis. A severely hypothyroid patient cannot mount an adequate metabolic response, leading to dangerous hypothermia and potential decompensation.",
                e: "KNOWN TRIGGER — Discontinuing levothyroxine abruptly removes the exogenous thyroid hormone that the patient depends on. Within days to weeks, hormone levels plummet, potentially precipitating myxedema coma.",
                f: "NOT A TRIGGER — While high-fiber diets can reduce levothyroxine absorption somewhat, eating a high-fiber meal is not a precipitating event for myxedema coma."
            },
            testTakingTip: "Myxedema coma triggers: remember 'I STOP' — Infection, Sedatives/anesthesia, Trauma/surgery, Omitting thyroid meds, Prolonged cold exposure. These factors push a fragile hypothyroid patient past the tipping point.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q33 — Rewarming in Myxedema Coma (Application, Single)
        {
            id: "thyroid_033",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in myxedema coma has a core temperature of 92°F (33.3°C). The nurse receives orders for rewarming. Which rewarming method is MOST appropriate?",
            options: [
                { id: "a", text: "Apply a forced-air warming blanket set to high heat" },
                { id: "b", text: "Immerse the patient in a warm water bath at 104°F" },
                { id: "c", text: "Apply warm blankets and increase the room temperature, allowing gradual passive rewarming" },
                { id: "d", text: "Administer warmed IV normal saline at a rapid infusion rate" }
            ],
            correct: "c",
            rationale: {
                correct: "PASSIVE rewarming (warm blankets, increased room temperature) is the ONLY safe method for myxedema coma. The goal is gradual temperature increase of no more than 1°F per hour. Active/rapid rewarming causes peripheral vasodilation, which drops blood pressure further in a patient whose cardiovascular system is already severely compromised — potentially causing cardiovascular collapse.",
                a: "Forced-air warming on high heat is active rewarming, which is contraindicated. Rapid vasodilation would worsen the already-critical hypotension and could cause cardiovascular collapse.",
                b: "Warm water immersion is aggressive active rewarming and is absolutely contraindicated. This would cause rapid vasodilation and cardiovascular collapse in a patient with severe cardiac compromise.",
                d: "While warmed IV fluids may be used cautiously, rapid infusion is dangerous because myxedema coma patients are at high risk for fluid overload due to impaired cardiac function and altered fluid balance (hyponatremia)."
            },
            testTakingTip: "Myxedema coma = PASSIVE rewarming ONLY. Active warming → vasodilation → cardiovascular collapse → death. This is the opposite of other hypothermia protocols. Think: this patient's heart can barely function — don't make it work harder.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q34 — Myxedema Coma Treatment Ordering (Analysis, Ordering)
        {
            id: "thyroid_034",
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient is diagnosed with myxedema coma in the emergency department. Place the following interventions in the correct priority order.",
            options: [
                { id: "a", text: "Secure the airway and support ventilation (prepare for intubation if needed)" },
                { id: "b", text: "Administer IV corticosteroids (hydrocortisone) to prevent adrenal crisis" },
                { id: "c", text: "Administer IV levothyroxine loading dose" },
                { id: "d", text: "Initiate gradual passive rewarming with warm blankets" },
                { id: "e", text: "Monitor and correct electrolytes (hyponatremia) and blood glucose (hypoglycemia)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Treatment follows the ABCs plus thyroid-specific priorities: (1) Airway/breathing is always first — hypoventilation is life-threatening, (2) Corticosteroids BEFORE thyroid hormone to prevent precipitating adrenal crisis, (3) IV levothyroxine to replace deficient hormone, (4) Passive rewarming to address hypothermia, (5) Metabolic correction for hyponatremia and hypoglycemia.",
                a: "FIRST — Respiratory failure from hypoventilation is an immediate threat. Many myxedema coma patients require intubation due to respiratory depression, CO2 retention, and inability to protect the airway.",
                b: "SECOND — Corticosteroids should be given BEFORE or with thyroid hormone. Severe hypothyroidism may coexist with adrenal insufficiency, and giving thyroid hormone alone increases cortisol metabolism, potentially triggering adrenal crisis.",
                c: "THIRD — IV levothyroxine (loading dose) is the definitive treatment. IV route is essential because GI absorption is severely impaired. Oral levothyroxine cannot be used in an unresponsive patient.",
                d: "FOURTH — Passive rewarming addresses hypothermia safely. Active rewarming is contraindicated due to risk of vasodilation and cardiovascular collapse.",
                e: "FIFTH — Electrolyte and glucose correction is important but follows the more immediately life-threatening priorities. Hyponatremia is corrected with fluid restriction, and hypoglycemia with IV dextrose."
            },
            testTakingTip: "Myxedema coma treatment priority: ABC → Steroids BEFORE thyroid hormone → IV levothyroxine → Passive rewarming → Metabolic correction. The steroid-before-T4 rule is NCLEX gold.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q35 — Myxedema Coma Electrolytes (Application, Single)
        {
            id: "thyroid_035",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in myxedema coma has a serum sodium of 118 mEq/L (normal: 135–145). The nurse understands that the hyponatremia in this patient is MOST likely caused by:",
            options: [
                { id: "a", text: "Excessive sodium loss from diarrhea and diaphoresis." },
                { id: "b", text: "Impaired free water excretion due to decreased cardiac output and increased ADH secretion." },
                { id: "c", text: "Dietary sodium restriction prescribed for hypothyroidism." },
                { id: "d", text: "Overhydration from excessive IV fluid administration." }
            ],
            correct: "b",
            rationale: {
                correct: "Hyponatremia in myxedema coma is dilutional. Severe hypothyroidism decreases cardiac output and renal perfusion, impairing the kidney's ability to excrete free water. Additionally, ADH (vasopressin) secretion is increased. The result is water retention that dilutes serum sodium. Treatment is fluid restriction, not sodium replacement.",
                a: "Diarrhea and diaphoresis cause dehydration-related hyponatremia, but hypothyroidism causes constipation (not diarrhea) and decreased sweating (not diaphoresis). This mechanism does not apply.",
                c: "Dietary sodium restriction is not a standard recommendation for hypothyroidism management. The hyponatremia is from water retention, not sodium depletion.",
                d: "While excessive IV fluids could worsen hyponatremia, the primary cause in myxedema coma is the pathophysiological impairment in free water excretion from the hypothyroid state itself."
            },
            testTakingTip: "Myxedema coma hyponatremia = dilutional (too much water, not too little sodium). Treatment = fluid RESTRICTION. This is the same mechanism as SIADH. Don't give more fluids — restrict them.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q36 — Myxedema Coma Nursing Monitoring (Application, Single)
        {
            id: "thyroid_036",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient being treated for myxedema coma in the ICU. Which assessment finding would indicate the patient is responding to treatment?",
            options: [
                { id: "a", text: "Temperature rising to 94°F with increased level of consciousness" },
                { id: "b", text: "Heart rate decreasing from 42 to 36 bpm" },
                { id: "c", text: "Respiratory rate remaining at 6 breaths/min" },
                { id: "d", text: "Increasing peripheral edema and weight gain" }
            ],
            correct: "a",
            rationale: {
                correct: "Improvement in myxedema coma is gradual. Rising temperature (toward normal) and improving level of consciousness are positive indicators that IV levothyroxine and supportive care are taking effect. Heart rate, blood pressure, and respiratory function should also gradually improve.",
                b: "A DECREASING heart rate (from 42 to 36 bpm) indicates worsening bradycardia, not improvement. Treatment response would show heart rate INCREASING toward normal.",
                c: "A persistent respiratory rate of 6 breaths/min indicates the patient is not improving and may need intubation or ventilator support. Expected improvement would show increasing respiratory rate.",
                d: "Increasing edema and weight gain suggest worsening fluid retention (possibly from overly aggressive fluid replacement) or inadequate treatment response. Improvement would show decreasing edema."
            },
            testTakingTip: "Myxedema coma improvement = gradual normalization of all vitals: temperature rising, heart rate increasing, BP stabilizing, mental status improving. Everything that was 'low and slow' should gradually come back up.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q37 — Myxedema vs Thyroid Storm Matrix (Analysis, Matrix)
        {
            id: "thyroid_037",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Myxedema Coma", "Thyroid Storm"],
            stem: "The nurse is comparing two thyroid emergencies. For each clinical finding, identify whether it is associated with myxedema coma or thyroid storm.",
            options: [
                { id: "a", text: "Temperature of 93°F (33.9°C)" },
                { id: "b", text: "Heart rate of 168 bpm with atrial fibrillation" },
                { id: "c", text: "Hypoventilation with CO2 retention" },
                { id: "d", text: "Temperature of 105.6°F (40.9°C)" },
                { id: "e", text: "Hyponatremia and hypoglycemia" },
                { id: "f", text: "Agitation, delirium, and psychosis" }
            ],
            correct: {
                a: "Myxedema Coma",
                b: "Thyroid Storm",
                c: "Myxedema Coma",
                d: "Thyroid Storm",
                e: "Myxedema Coma",
                f: "Thyroid Storm"
            },
            rationale: {
                correct: "Myxedema coma and thyroid storm are opposite emergencies. Myxedema = everything CRITICALLY low (temperature, heart rate, respiratory drive, sodium, glucose). Thyroid storm = everything CRITICALLY high (fever, heart rate, agitation). Both are life-threatening but require opposite treatments.",
                a: "MYXEDEMA COMA — Hypothermia (often <95°F) is the hallmark of myxedema coma. Severely decreased metabolism cannot generate adequate body heat.",
                b: "THYROID STORM — Severe tachycardia and atrial fibrillation result from excess thyroid hormone's positive chronotropic and inotropic effects on the heart.",
                c: "MYXEDEMA COMA — Respiratory depression with CO2 retention occurs because decreased metabolic activity reduces respiratory drive. This is a primary cause of death.",
                d: "THYROID STORM — High fever (often >104°F) results from extreme hypermetabolism. Use acetaminophen, NOT aspirin (aspirin increases free thyroid hormone).",
                e: "MYXEDEMA COMA — Hyponatremia (dilutional from impaired water excretion) and hypoglycemia (decreased gluconeogenesis) are classic metabolic derangements.",
                f: "THYROID STORM — CNS hyperexcitability from excess thyroid hormone causes agitation progressing to delirium and psychosis. Myxedema coma causes the opposite: lethargy progressing to coma."
            },
            testTakingTip: "Myxedema coma = COLD, SLOW, UNRESPONSIVE. Thyroid storm = HOT, FAST, AGITATED. They are polar opposites. If you can remember one, you know the other by reversal.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q38 — Myxedema Coma IV vs Oral Levothyroxine (Knowledge, Single)
        {
            id: "thyroid_038",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "In the treatment of myxedema coma, levothyroxine is administered intravenously rather than orally. Which rationale BEST explains this route selection?",
            options: [
                { id: "a", text: "IV administration provides a faster onset of action and avoids the risk of aspiration." },
                { id: "b", text: "Oral levothyroxine is contraindicated in all emergency situations regardless of the patient's ability to swallow." },
                { id: "c", text: "GI absorption is severely impaired in myxedema coma due to decreased GI motility and mucosal edema, and the patient may be unable to swallow safely." },
                { id: "d", text: "IV levothyroxine is a different formulation that is more potent than the oral form." }
            ],
            correct: "c",
            rationale: {
                correct: "In myxedema coma, the GI tract is severely affected by the hypothyroid state: motility is profoundly decreased, mucosal edema impairs absorption, and the patient is typically unresponsive and cannot safely swallow oral medication (aspiration risk). IV administration bypasses these barriers and ensures reliable drug delivery.",
                a: "While IV does have a more predictable onset and aspiration avoidance is relevant, the primary clinical rationale is impaired GI absorption. Even if the patient could swallow, oral absorption would be unreliable.",
                b: "Oral levothyroxine is not categorically contraindicated in all emergencies. In less severe acute hypothyroidism where the patient is alert and GI function is intact, oral dosing may be acceptable. The specific impairment in myxedema coma necessitates IV.",
                d: "IV and oral levothyroxine contain the same active molecule (synthetic T4). The IV formulation is not inherently more potent — the advantage is reliable delivery that bypasses the compromised GI tract."
            },
            testTakingTip: "Why IV in myxedema coma? The gut doesn't work (decreased motility + edema = poor absorption) AND the patient can't swallow (risk of aspiration). IV bypasses both problems.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q39 — Myxedema Coma Fluid Management (Analysis, Single)
        {
            id: "thyroid_039",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient in myxedema coma is hypotensive (BP 74/48 mmHg) and hyponatremic (Na+ 119 mEq/L). The provider orders IV fluid replacement. Which fluid management approach is MOST appropriate?",
            options: [
                { id: "a", text: "Rapid infusion of 0.9% normal saline (2 liters over 1 hour) to aggressively correct hypotension." },
                { id: "b", text: "3% hypertonic saline at a rapid rate to quickly correct the sodium to normal." },
                { id: "c", text: "Cautious IV normal saline with careful monitoring of fluid balance and cardiac function." },
                { id: "d", text: "D5W (5% dextrose in water) at a maintenance rate to correct hyponatremia." }
            ],
            correct: "c",
            rationale: {
                correct: "Fluid replacement in myxedema coma requires a delicate balance. The patient needs volume to support blood pressure, but the severely compromised heart cannot handle rapid fluid loading — risk of fluid overload and pulmonary edema. Cautious normal saline with close I&O monitoring, frequent cardiovascular assessment, and lung auscultation is the safest approach.",
                a: "Rapid large-volume infusion is dangerous in myxedema coma. The weakened myocardium cannot handle the fluid load, risking pulmonary edema and cardiovascular collapse. Volume replacement must be cautious and monitored.",
                b: "Rapid correction of hyponatremia with hypertonic saline risks osmotic demyelination syndrome (central pontine myelinolysis), which can cause permanent neurological damage. Sodium correction should not exceed 8-10 mEq/L in 24 hours.",
                d: "D5W is a hypotonic solution that would WORSEN the hyponatremia by providing free water without sodium. The hyponatremia in myxedema coma is dilutional — the patient needs less water, not more."
            },
            testTakingTip: "Myxedema coma fluids = CAUTIOUS normal saline. The heart is too weak for aggressive resuscitation. Monitor I&O closely. Also: correct Na+ SLOWLY (risk of osmotic demyelination if corrected too fast).",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q40 — Myxedema Coma Corticosteroid Rationale (Knowledge, Single)
        {
            id: "thyroid_040",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "In the treatment of myxedema coma, IV hydrocortisone is administered BEFORE or simultaneously with IV levothyroxine. Which rationale BEST explains this practice?",
            options: [
                { id: "a", text: "Hydrocortisone enhances the absorption of IV levothyroxine." },
                { id: "b", text: "Hydrocortisone is needed to treat the hyponatremia that occurs in myxedema coma." },
                { id: "c", text: "Severe hypothyroidism may coexist with adrenal insufficiency; giving thyroid hormone alone increases cortisol metabolism and can precipitate adrenal crisis." },
                { id: "d", text: "Hydrocortisone reduces the risk of allergic reaction to IV levothyroxine." }
            ],
            correct: "c",
            rationale: {
                correct: "Myxedema coma may coexist with adrenal insufficiency (autoimmune polyglandular syndrome, or the hypothyroid state itself can suppress adrenal function). Thyroid hormone replacement increases cortisol metabolism and clearance. If adrenal reserves are inadequate, this accelerated cortisol breakdown can trigger a life-threatening adrenal crisis. Giving hydrocortisone first provides a safety net.",
                a: "Hydrocortisone does not enhance levothyroxine absorption. Both are given IV in myxedema coma, so absorption is not a factor.",
                b: "While cortisol does play a role in free water clearance, the primary reason for giving hydrocortisone is to prevent adrenal crisis, not to treat hyponatremia. Hyponatremia is managed with fluid restriction.",
                d: "Allergic reactions to IV levothyroxine are extremely rare and are not the rationale for corticosteroid pretreatment. This is not a premedication protocol."
            },
            testTakingTip: "Steroids BEFORE T4 in myxedema coma — this prevents adrenal crisis. Think: thyroid hormone speeds up cortisol breakdown. If adrenals can't keep up → adrenal crisis on top of myxedema coma.",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // ================================================================
        //  SECTION 4 — HYPERTHYROIDISM BASICS (Q41–Q50)
        // ================================================================

        // Q41 — Hyperthyroidism Signs (Knowledge, Single)
        {
            id: "thyroid_041",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient presents with a resting heart rate of 114 bpm, unintentional weight loss of 15 pounds over 2 months despite eating more than usual, frequent loose stools, and complaints of always feeling hot. Which condition should the nurse suspect?",
            options: [
                { id: "a", text: "Hypothyroidism" },
                { id: "b", text: "Hyperthyroidism" },
                { id: "c", text: "Cushing's syndrome" },
                { id: "d", text: "Addison's disease" }
            ],
            correct: "b",
            rationale: {
                correct: "This is a classic hyperthyroid presentation: tachycardia, weight loss despite increased appetite, diarrhea/frequent stools, and heat intolerance. Excess thyroid hormone increases metabolic rate, sympathetic nervous system activity, and GI motility — everything speeds up.",
                a: "Hypothyroidism presents with the OPPOSITE: bradycardia, weight gain, constipation, and cold intolerance. This patient's symptoms reflect increased, not decreased, metabolism.",
                c: "Cushing's syndrome (cortisol excess) causes weight GAIN (especially central), moon face, and buffalo hump — not weight loss. While Cushing's can cause tachycardia from hypertension, the weight loss and heat intolerance point to thyroid excess.",
                d: "Addison's disease causes weight loss but also hypotension, hyperpigmentation, and fatigue — not tachycardia and heat intolerance. The hypermetabolic symptoms distinguish hyperthyroidism."
            },
            testTakingTip: "Hyperthyroidism = everything FAST and HIGH: fast heart, fast metabolism (weight loss), fast GI (diarrhea), fast nervous system (anxiety/tremors). If a patient is losing weight while eating more — think thyroid.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q42 — Graves' Disease Pathophysiology (Knowledge, Single)
        {
            id: "thyroid_042",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is diagnosed with Graves' disease. The nurse explains to the patient that this condition is caused by:",
            options: [
                { id: "a", text: "A benign tumor of the thyroid gland that autonomously produces thyroid hormone." },
                { id: "b", text: "Autoimmune antibodies (thyroid-stimulating immunoglobulins) that continuously activate the thyroid gland, causing excess hormone production." },
                { id: "c", text: "A pituitary tumor that secretes excess TSH, overstimulating the thyroid." },
                { id: "d", text: "Chronic iodine excess from dietary sources that overstimulates thyroid hormone synthesis." }
            ],
            correct: "b",
            rationale: {
                correct: "Graves' disease is an autoimmune condition where the immune system produces thyroid-stimulating immunoglobulins (TSI) that bind to and activate TSH receptors on thyroid cells. This mimics TSH stimulation but is unregulated — the thyroid continuously produces hormone regardless of feedback signals. It is the most common cause of hyperthyroidism.",
                a: "This describes a toxic adenoma or toxic multinodular goiter, which are different causes of hyperthyroidism. Graves' disease involves diffuse thyroid stimulation by antibodies, not a tumor.",
                c: "A TSH-secreting pituitary adenoma (TSHoma) is a rare cause of secondary hyperthyroidism. In Graves' disease, TSH is actually SUPPRESSED because the stimulation comes from TSI, not TSH.",
                d: "While excess iodine can transiently increase thyroid hormone production (Jod-Basedow phenomenon), this is not the mechanism of Graves' disease. Graves' is autoimmune, not dietary."
            },
            testTakingTip: "Graves' = autoimmune STIMULATION (TSI mimics TSH). Hashimoto's = autoimmune DESTRUCTION (anti-TPO attacks thyroid). Both autoimmune, opposite results. Graves' is the #1 cause of hyperthyroidism.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q43 — Exophthalmos Assessment (Application, Single)
        {
            id: "thyroid_043",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Graves' disease has moderate exophthalmos. Which nursing intervention is MOST important to include in the care plan?",
            options: [
                { id: "a", text: "Administer levothyroxine to correct the underlying thyroid imbalance." },
                { id: "b", text: "Protect the corneas by applying artificial tears, elevating the head of bed, and taping the eyelids closed at night if they do not fully close." },
                { id: "c", text: "Apply ice packs to the eyes every 2 hours to reduce swelling." },
                { id: "d", text: "Restrict oral fluids to decrease periorbital edema." }
            ],
            correct: "b",
            rationale: {
                correct: "Exophthalmos (proptosis) in Graves' disease exposes the cornea due to incomplete eyelid closure. Corneal drying, ulceration, and infection are serious complications that can lead to vision loss. Key interventions include artificial tears (lubrication), elevating the HOB 30-45° to reduce periorbital edema, and taping eyelids at night to protect corneas during sleep.",
                a: "Levothyroxine is for hypothyroidism, not hyperthyroidism. Graves' disease requires antithyroid medications (methimazole, PTU), not thyroid replacement. Additionally, exophthalmos may not improve even after hyperthyroidism is treated.",
                c: "Ice packs are not standard treatment for exophthalmos. The priority is corneal protection, not simply reducing swelling. Cool compresses may provide comfort but are not the most important intervention.",
                d: "Fluid restriction does not significantly affect exophthalmos. The proptosis is caused by retroorbital inflammation and glycosaminoglycan deposition, not simple fluid retention."
            },
            testTakingTip: "Exophthalmos priority = CORNEAL PROTECTION. The eyes can't close fully → cornea dries out → ulceration → vision loss. Artificial tears + elevate HOB + tape lids at night. Important: exophthalmos may persist even after thyroid is treated.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q44 — Hyperthyroidism Cardiac Complications (Analysis, Single)
        {
            id: "thyroid_044",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 72-year-old patient presents to the emergency department with new-onset atrial fibrillation and a ventricular rate of 142 bpm. The patient has no prior cardiac history. Which additional assessment is MOST important for the nurse to prioritize?",
            options: [
                { id: "a", text: "Assess for signs of hyperthyroidism and anticipate thyroid function tests." },
                { id: "b", text: "Immediately prepare for electrical cardioversion." },
                { id: "c", text: "Assess for signs of hypothyroidism and administer levothyroxine." },
                { id: "d", text: "Administer a loading dose of digoxin to control the ventricular rate." }
            ],
            correct: "a",
            rationale: {
                correct: "New-onset atrial fibrillation without prior cardiac history should prompt evaluation for hyperthyroidism, especially in older adults. Excess thyroid hormone increases cardiac sensitivity to catecholamines and shortens the atrial refractory period, predisposing to atrial fibrillation. Up to 15% of patients with atrial fibrillation have underlying thyroid disease. Assessment should include looking for other hyperthyroid signs and ordering TSH/T4.",
                b: "Cardioversion should not be the first intervention unless the patient is hemodynamically unstable. Additionally, atrial fibrillation from hyperthyroidism is unlikely to convert successfully until the thyroid disorder is treated.",
                c: "Hypothyroidism causes bradycardia, not tachycardia or atrial fibrillation. Levothyroxine would be inappropriate and could worsen the tachyarrhythmia.",
                d: "While rate control is important, digoxin is often less effective in thyrotoxic atrial fibrillation because excess thyroid hormone increases digoxin clearance. Beta-blockers are the preferred rate control agents in hyperthyroid states."
            },
            testTakingTip: "New-onset atrial fibrillation (especially in older adults with no cardiac history) → always check TSH. Hyperthyroidism is a reversible cause of A-fib. Beta-blockers are preferred over digoxin for rate control in thyrotoxicosis.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q45 — Hyperthyroidism vs Hypothyroidism GI Matrix (Analysis, Matrix)
        {
            id: "thyroid_045",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Hypothyroidism", "Hyperthyroidism"],
            stem: "For each clinical manifestation related to weight and gastrointestinal function, identify whether it is associated with hypothyroidism or hyperthyroidism.",
            options: [
                { id: "a", text: "Weight gain despite decreased appetite" },
                { id: "b", text: "Weight loss despite increased appetite" },
                { id: "c", text: "Constipation and decreased bowel sounds" },
                { id: "d", text: "Frequent loose stools and hyperactive bowel sounds" },
                { id: "e", text: "Elevated serum cholesterol levels" }
            ],
            correct: {
                a: "Hypothyroidism",
                b: "Hyperthyroidism",
                c: "Hypothyroidism",
                d: "Hyperthyroidism",
                e: "Hypothyroidism"
            },
            rationale: {
                correct: "GI manifestations directly reflect metabolic rate: hypothyroidism slows metabolism (weight gain, decreased appetite, constipation, elevated cholesterol) while hyperthyroidism accelerates it (weight loss, increased appetite, diarrhea). The appetite-weight mismatch is a key differentiator.",
                a: "HYPOTHYROIDISM — Decreased metabolism means fewer calories burned, leading to weight gain even with reduced food intake. This weight gain is partly from fluid retention (myxedema) and fat accumulation.",
                b: "HYPERTHYROIDISM — Dramatically increased metabolic rate burns calories faster than the patient can consume them, despite increased appetite. This is one of the most recognizable hyperthyroid symptoms.",
                c: "HYPOTHYROIDISM — Decreased GI motility from slowed metabolism causes constipation and reduced bowel sounds. Severe cases can cause paralytic ileus.",
                d: "HYPERTHYROIDISM — Increased GI motility causes frequent, loose stools (not typically true diarrhea) and hyperactive bowel sounds. Malabsorption may contribute to weight loss.",
                e: "HYPOTHYROIDISM — Slowed lipid metabolism decreases LDL receptor activity, reducing cholesterol clearance and elevating serum levels. This often improves with levothyroxine treatment."
            },
            testTakingTip: "The appetite-weight paradox is key: Hypo = eat LESS but gain weight (metabolism too slow). Hyper = eat MORE but lose weight (metabolism too fast). This mismatch is almost pathognomonic.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q46 — Hyperthyroidism Menstrual Changes (Knowledge, Single)
        {
            id: "thyroid_046",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A female patient with hyperthyroidism asks the nurse about changes in her menstrual cycle. Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"Hyperthyroidism commonly causes heavy, prolonged menstrual periods.\"" },
                { id: "b", text: "\"You may experience lighter periods or even missed periods because excess thyroid hormone can disrupt the normal menstrual cycle.\"" },
                { id: "c", text: "\"Thyroid disorders do not affect menstrual cycles.\"" },
                { id: "d", text: "\"Hyperthyroidism always causes infertility that is permanent.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Hyperthyroidism typically causes oligomenorrhea (infrequent/light periods) or amenorrhea (absent periods). Excess thyroid hormone disrupts the hypothalamic-pituitary-gonadal axis and increases sex hormone-binding globulin (SHBG), reducing free estrogen levels. This is the OPPOSITE of hypothyroidism, which causes menorrhagia (heavy periods).",
                a: "Heavy, prolonged periods (menorrhagia) are associated with HYPOTHYROIDISM, not hyperthyroidism. In hypothyroidism, decreased metabolism and hormonal changes lead to heavier menstrual flow.",
                c: "Thyroid disorders significantly affect menstrual cycles. Both hypothyroidism and hyperthyroidism cause menstrual irregularities, and thyroid screening should be part of the workup for menstrual disorders.",
                d: "While untreated hyperthyroidism can cause temporary infertility due to anovulation, it is NOT permanent. Treating the thyroid condition typically restores normal menstrual function and fertility."
            },
            testTakingTip: "Menstrual changes by thyroid status: Hypo = HEAVY (menorrhagia). Hyper = LIGHT or ABSENT (oligomenorrhea/amenorrhea). Think: hypo slows everything (blood accumulates), hyper speeds everything (periods are brief).",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q47 — Hyperthyroidism Causes (Knowledge, Single)
        {
            id: "thyroid_047",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The nurse is reviewing causes of hyperthyroidism. Which statement CORRECTLY identifies the MOST common cause of hyperthyroidism?",
            options: [
                { id: "a", text: "Toxic multinodular goiter is the most common cause worldwide." },
                { id: "b", text: "Excessive levothyroxine dosing is the most common cause of hyperthyroidism." },
                { id: "c", text: "Graves' disease is the most common cause of hyperthyroidism." },
                { id: "d", text: "Thyroid cancer is the most common cause of hyperthyroid symptoms." }
            ],
            correct: "c",
            rationale: {
                correct: "Graves' disease accounts for approximately 60-80% of all cases of hyperthyroidism, making it the most common cause. It is an autoimmune disorder caused by thyroid-stimulating immunoglobulins (TSI) that activate TSH receptors. It is more common in women and often has a genetic predisposition.",
                a: "Toxic multinodular goiter is the second most common cause of hyperthyroidism, particularly in older adults and in iodine-deficient regions. It is not the most common overall.",
                b: "Iatrogenic hyperthyroidism (from levothyroxine overdose) can occur but is not the most common cause. It is usually detected through routine TSH monitoring and dose adjustment.",
                d: "Thyroid cancer rarely causes hyperthyroidism. Most thyroid cancers are well-differentiated and do not produce significant amounts of thyroid hormone."
            },
            testTakingTip: "Most common cause of HYPERthyroidism = Graves' disease (autoimmune stimulation). Most common cause of HYPOthyroidism in US = Hashimoto's (autoimmune destruction). Both autoimmune, both most common for their respective condition.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q48 — Hyperthyroidism Reflexes and Skin (Application, Single)
        {
            id: "thyroid_048",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "During a physical examination, the nurse notes that a patient has brisk (hyperactive) deep tendon reflexes, fine tremors of the outstretched hands, warm and moist skin, and a fine, silky hair texture. These findings are MOST consistent with:",
            options: [
                { id: "a", text: "Hypothyroidism with myxedema" },
                { id: "b", text: "Hyperthyroidism" },
                { id: "c", text: "Cushing's syndrome" },
                { id: "d", text: "Parkinson's disease" }
            ],
            correct: "b",
            rationale: {
                correct: "All findings point to hyperthyroidism: hyperactive reflexes (increased neural excitability), fine tremors (increased sympathetic activity), warm/moist skin (increased heat production and sweating), and fine/silky hair. Excess thyroid hormone accelerates neurological and dermatological processes.",
                a: "Hypothyroidism causes the OPPOSITE: delayed reflexes, coarse/dry skin, and dry/brittle hair. Myxedema would show non-pitting edema and cool, pale skin.",
                c: "Cushing's syndrome causes skin changes (thin skin, easy bruising, purple striae) but not hyperactive reflexes or fine tremors. The skin in Cushing's is thin and fragile, not warm and moist.",
                d: "Parkinson's disease causes a resting (pill-rolling) tremor and rigidity, not fine tremors with hyperactive reflexes. Parkinson's tremor decreases with intentional movement; hyperthyroid tremor is a fine postural tremor."
            },
            testTakingTip: "Physical exam contrasts: Hypo = delayed reflexes, dry/coarse skin, brittle hair. Hyper = brisk reflexes, warm/moist skin, fine hair. The reflex test is a quick bedside differentiator between hypo and hyper states.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q49 — Comprehensive Thyroid Comparison Ordering (Analysis, Ordering)
        {
            id: "thyroid_049",
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is educating a patient about the progression from untreated hypothyroidism to myxedema coma. Place the following stages in the correct order of disease progression.",
            options: [
                { id: "a", text: "Subclinical hypothyroidism (elevated TSH, normal T4, minimal symptoms)" },
                { id: "b", text: "Overt hypothyroidism (elevated TSH, low T4, classic symptoms: fatigue, weight gain, cold intolerance)" },
                { id: "c", text: "Severe hypothyroidism (markedly elevated TSH, very low T4, significant functional impairment)" },
                { id: "d", text: "Precipitating event occurs (infection, cold exposure, missed medications, surgery)" },
                { id: "e", text: "Myxedema coma (hypothermia, bradycardia, hypotension, altered consciousness, respiratory failure)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Myxedema coma represents the end stage of a progressive decline: (1) Subclinical stage — the thyroid is starting to fail but T4 is maintained through increased TSH, (2) Overt hypothyroidism — T4 drops and classic symptoms appear, (3) Severe hypothyroidism — marked hormone deficiency with significant impairment, (4) A trigger event pushes the body beyond its ability to compensate, (5) Myxedema coma — complete metabolic decompensation.",
                a: "FIRST — The earliest detectable stage. The pituitary is working harder (high TSH) to maintain normal T4. The patient may have no or minimal symptoms.",
                b: "SECOND — The thyroid can no longer maintain adequate output. T4 falls, and classic hypothyroid symptoms develop progressively.",
                c: "THIRD — Without treatment, the condition worsens. Metabolic slowing becomes pronounced, affecting multiple organ systems significantly.",
                d: "FOURTH — The precipitating event is critical. Myxedema coma almost never occurs spontaneously — it requires a trigger that overwhelms the body's remaining compensatory mechanisms.",
                e: "FIFTH — Myxedema coma is the most severe, life-threatening manifestation. All metabolic processes are critically impaired, requiring emergency ICU management."
            },
            testTakingTip: "Myxedema coma doesn't happen overnight — it's a progressive decline. The key teaching point: taking levothyroxine consistently prevents progression. A trigger event is almost always the 'tipping point.'",
            guideSection: "Section 4 — Myxedema Coma",
            guideSectionId: "myxedema-coma"
        },

        // Q50 — Hyperthyroidism Diagnosis (Application, Single)
        {
            id: "thyroid_050",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient presents with symptoms suggestive of hyperthyroidism. The provider orders initial thyroid function tests. Which result pattern would CONFIRM the diagnosis of primary hyperthyroidism?",
            options: [
                { id: "a", text: "TSH 8.4 mIU/L (high), free T4 0.5 ng/dL (low)" },
                { id: "b", text: "TSH 0.02 mIU/L (low), free T4 5.2 ng/dL (high)" },
                { id: "c", text: "TSH 2.1 mIU/L (normal), free T4 1.2 ng/dL (normal)" },
                { id: "d", text: "TSH 0.3 mIU/L (low-normal), free T4 0.9 ng/dL (normal)" }
            ],
            correct: "b",
            rationale: {
                correct: "The lab pattern for primary hyperthyroidism is LOW TSH + HIGH free T4. The thyroid is overproducing hormone (high T4), and the excess feeds back to the pituitary, suppressing TSH to very low levels. This is the mirror image of primary hypothyroidism (high TSH + low T4).",
                a: "This pattern (high TSH + low T4) indicates primary HYPOthyroidism, the opposite of what the question asks. The thyroid is failing, and the pituitary is compensating with more TSH.",
                c: "Normal TSH and T4 indicate euthyroid (normal thyroid function). These results would not explain the patient's hyperthyroid symptoms, which might suggest an alternative diagnosis.",
                d: "This pattern could represent subclinical hyperthyroidism (slightly low TSH with normal T4) or could be normal. The TSH is at the lower end of normal, and T4 is normal — this does not confirm hyperthyroidism."
            },
            testTakingTip: "Lab pattern summary: Primary Hypo = ↑TSH ↓T4. Primary Hyper = ↓TSH ↑T4. TSH always goes OPPOSITE of the thyroid problem. When in doubt on the exam, check whether TSH and T4 move in opposite directions.",
            guideSection: "Section 2 — Lab Value Interpretation",
            guideSectionId: "lab-values"
        },

        // ================================================================
        // ================================================================
        //
        //  BATCH 2 — thyroid_051 through thyroid_100
        //  Focus: Graves', antithyroid meds, RAI, Lugol's, beta-blockers,
        //         thyroid storm, thyroidectomy complications, goiter/nodules
        //
        // ================================================================
        // ================================================================

        // ================================================================
        //  SECTION 5 — GRAVES' DISEASE, GOITER & NODULES (Q51–Q60)
        // ================================================================

        // Q51 — Graves' Triad (Knowledge, Single)
        {
            id: "thyroid_051",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is diagnosed with Graves' disease. Which triad of clinical findings is UNIQUE to Graves' disease and distinguishes it from other causes of hyperthyroidism?",
            options: [
                { id: "a", text: "Weight loss, tachycardia, and heat intolerance" },
                { id: "b", text: "Diffuse goiter, exophthalmos, and pretibial myxedema" },
                { id: "c", text: "Thyroid nodules, hoarseness, and dysphagia" },
                { id: "d", text: "Elevated TSH, low T4, and cold intolerance" }
            ],
            correct: "b",
            rationale: {
                correct: "The classic Graves' disease triad is: (1) diffuse goiter (smooth, symmetrical thyroid enlargement), (2) exophthalmos (bulging eyes from retroorbital inflammation), and (3) pretibial myxedema (thick, non-pitting skin changes on the shins). These three findings are SPECIFIC to Graves' disease and do not occur in other forms of hyperthyroidism.",
                a: "Weight loss, tachycardia, and heat intolerance are general hyperthyroid symptoms that occur in ALL forms of hyperthyroidism (toxic nodular goiter, thyroiditis, etc.), not just Graves'.",
                c: "Thyroid nodules with hoarseness and dysphagia suggest thyroid cancer or a large multinodular goiter — not Graves' disease. Graves' causes a diffuse, smooth goiter.",
                d: "Elevated TSH with low T4 and cold intolerance are signs of hypothyroidism — the opposite of Graves' disease."
            },
            testTakingTip: "Graves' disease triad: Goiter + Eyes (exophthalmos) + Skin (pretibial myxedema). Only Graves' has exophthalmos and pretibial myxedema — if you see either on the exam, the answer is Graves'.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q52 — Graves' Eye Care (Application, Single)
        {
            id: "thyroid_052",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Graves' disease and moderate exophthalmos is being discharged. Which set of discharge instructions is MOST appropriate for eye care?",
            options: [
                { id: "a", text: "Apply warm compresses hourly, keep the head flat at night, and wear contact lenses to protect the cornea." },
                { id: "b", text: "Use artificial tears during the day, wear dark sunglasses outdoors, elevate the head of bed at night, and tape eyelids closed during sleep if they don't fully close." },
                { id: "c", text: "Instill antibiotic eye drops four times daily, avoid all bright light, and wear an eye patch at all times." },
                { id: "d", text: "No special eye care is needed; the exophthalmos will resolve completely once the hyperthyroidism is treated." }
            ],
            correct: "b",
            rationale: {
                correct: "Exophthalmos management focuses on corneal protection and comfort: artificial tears prevent drying, sunglasses reduce photosensitivity and protect from wind/debris, elevating the HOB reduces periorbital edema, and taping eyelids prevents corneal exposure during sleep. This comprehensive approach prevents vision-threatening corneal ulceration.",
                a: "The head should be ELEVATED, not flat — flat positioning worsens periorbital edema. Contact lenses can irritate the already-compromised eyes. Warm compresses are not standard therapy.",
                c: "Prophylactic antibiotics are not indicated unless infection is present. Wearing an eye patch at all times can cause corneal drying in the covered eye. Light avoidance is excessive.",
                d: "Exophthalmos may NOT resolve after hyperthyroid treatment — it can persist or even worsen after radioactive iodine therapy. Ongoing eye care and ophthalmology follow-up are often needed long-term."
            },
            testTakingTip: "Graves' eye care: Lubricate (artificial tears) + Protect (sunglasses) + Elevate (HOB) + Tape (lids at night). Important: exophthalmos may be PERMANENT even after thyroid treatment.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q53 — Pretibial Myxedema (Knowledge, Single)
        {
            id: "thyroid_053",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient with Graves' disease and notes raised, thickened, non-pitting skin lesions on both shins. The nurse documents this finding as:",
            options: [
                { id: "a", text: "Pitting edema from heart failure related to hyperthyroidism" },
                { id: "b", text: "Pretibial myxedema, a characteristic dermatologic manifestation of Graves' disease" },
                { id: "c", text: "Peripheral vascular disease caused by thyroid hormone excess" },
                { id: "d", text: "Contact dermatitis from an unknown allergen" }
            ],
            correct: "b",
            rationale: {
                correct: "Pretibial myxedema (Graves' dermopathy) is a characteristic skin finding specific to Graves' disease. It presents as raised, thickened, non-pitting, waxy-appearing skin lesions on the pretibial area (shins). It is caused by glycosaminoglycan deposition in the dermis and is part of the Graves' triad along with goiter and exophthalmos.",
                a: "Heart failure edema is PITTING and typically involves dependent areas bilaterally (ankles, feet). Pretibial myxedema is NON-pitting with thickened, raised skin — a distinctly different finding.",
                c: "Peripheral vascular disease causes skin changes such as hair loss, thin/shiny skin, and pallor — not the thick, raised lesions seen in pretibial myxedema.",
                d: "Contact dermatitis presents with erythema, vesicles, and pruritus in the area of contact. Pretibial myxedema has a unique waxy, thickened appearance specific to Graves' disease."
            },
            testTakingTip: "Pretibial myxedema = thick, non-pitting, waxy skin on the shins = Graves' disease. Don't confuse with myxedema (facial puffiness in hypothyroidism). Both use 'myxedema' but are completely different conditions.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q54 — Thyroid Nodule Evaluation (Application, Single)
        {
            id: "thyroid_054",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient presents with a solitary thyroid nodule discovered during a routine physical exam. Thyroid function tests are normal. Which diagnostic test is MOST important to determine whether the nodule is benign or malignant?",
            options: [
                { id: "a", text: "CT scan of the neck with contrast" },
                { id: "b", text: "Fine needle aspiration (FNA) biopsy guided by ultrasound" },
                { id: "c", text: "Serum thyroglobulin level" },
                { id: "d", text: "Radioactive iodine uptake scan as the sole diagnostic test" }
            ],
            correct: "b",
            rationale: {
                correct: "Fine needle aspiration (FNA) biopsy is the gold standard for evaluating thyroid nodules. It provides cytological analysis that can distinguish benign from malignant cells. Ultrasound guidance improves accuracy. FNA determines whether the nodule requires surgery or can be safely monitored.",
                a: "CT scan can assess the size and extent of a nodule but cannot differentiate benign from malignant tissue. CT with iodinated contrast should actually be avoided if RAI treatment might be needed, as it can interfere with radioactive iodine uptake.",
                c: "Thyroglobulin is useful for monitoring thyroid cancer AFTER treatment (thyroidectomy), not for initial evaluation of an undiagnosed nodule. Elevated thyroglobulin is nonspecific for the initial workup.",
                d: "While RAI scans can identify 'hot' (functioning) vs 'cold' (non-functioning) nodules, a cold nodule only indicates increased risk — it doesn't provide a tissue diagnosis. FNA is needed for definitive evaluation."
            },
            testTakingTip: "Thyroid nodule evaluation: FNA biopsy is the gold standard. 'Cold' nodules on RAI scan = higher cancer risk (don't take up iodine). 'Hot' nodules = usually benign. But only FNA gives a definitive tissue diagnosis.",
            guideSection: "Section 8 — Goiter & Nodules",
            guideSectionId: "goiter-nodules"
        },

        // Q55 — Thyroid Cancer Risk Factors Matrix (Analysis, Matrix)
        {
            id: "thyroid_055",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Increased Cancer Risk", "NOT a Cancer Risk Factor"],
            stem: "A nurse is reviewing thyroid nodule characteristics. For each finding, indicate whether it increases the risk of thyroid malignancy or is NOT a cancer risk factor.",
            options: [
                { id: "a", text: "History of childhood radiation exposure to the head/neck" },
                { id: "b", text: "A 'cold' (non-functioning) nodule on radioactive iodine scan" },
                { id: "c", text: "A soft, mobile, smooth nodule" },
                { id: "d", text: "A hard, fixed, rapidly growing nodule" },
                { id: "e", text: "Family history of thyroid cancer or MEN syndrome" },
                { id: "f", text: "A 'hot' (hyperfunctioning) nodule on radioactive iodine scan" }
            ],
            correct: {
                a: "Increased Cancer Risk",
                b: "Increased Cancer Risk",
                c: "NOT a Cancer Risk Factor",
                d: "Increased Cancer Risk",
                e: "Increased Cancer Risk",
                f: "NOT a Cancer Risk Factor"
            },
            rationale: {
                correct: "Childhood radiation, cold nodules, hard/fixed/rapidly growing nodules, and family history of thyroid cancer or MEN syndrome all increase cancer risk. Soft/mobile nodules and hot nodules are more likely benign.",
                a: "INCREASED RISK — Childhood radiation to the head/neck is one of the strongest risk factors for thyroid cancer. The thyroid gland in children is highly sensitive to radiation damage that can trigger malignancy decades later.",
                b: "INCREASED RISK — Cold nodules do not take up radioactive iodine, suggesting they are non-functioning. About 5-10% of cold nodules are malignant, compared to <1% of hot nodules.",
                c: "NOT A RISK FACTOR — Soft, mobile, smooth nodules are characteristics of benign lesions. Malignant nodules tend to be hard, fixed, and irregular.",
                d: "INCREASED RISK — Hard, fixed nodules that grow rapidly are classic warning signs for thyroid malignancy. Fixation to surrounding tissues suggests invasion.",
                e: "INCREASED RISK — Family history of thyroid cancer, especially medullary thyroid cancer associated with MEN (Multiple Endocrine Neoplasia) syndrome, significantly increases risk.",
                f: "NOT A RISK FACTOR — Hot (hyperfunctioning) nodules actively produce thyroid hormone and are almost always benign. Malignancy is exceedingly rare in hot nodules."
            },
            testTakingTip: "Thyroid cancer red flags: 'CHIRP' — Cold nodule, Hard/fixed, Irradiation history, Rapid growth, Positive family history. Hot nodules are almost always benign.",
            guideSection: "Section 8 — Goiter & Nodules",
            guideSectionId: "goiter-nodules"
        },

        // Q56 — Goiter Types and Causes (Knowledge, Single)
        {
            id: "thyroid_056",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A public health nurse in a developing country observes that many community members have visibly enlarged thyroid glands. Most have normal or low thyroid hormone levels. The nurse identifies this as MOST likely caused by:",
            options: [
                { id: "a", text: "Graves' disease prevalence in the community" },
                { id: "b", text: "Endemic iodine deficiency causing compensatory thyroid enlargement" },
                { id: "c", text: "Excessive seafood consumption causing thyroid overstimulation" },
                { id: "d", text: "A genetic disorder affecting thyroid size" }
            ],
            correct: "b",
            rationale: {
                correct: "Iodine deficiency is the most common cause of goiter worldwide. When iodine is scarce, the thyroid cannot produce adequate T3/T4. TSH rises in response, stimulating thyroid tissue growth (goiter) as a compensatory mechanism. Endemic goiter refers to goiter affecting >10% of a population, typically in iodine-deficient regions.",
                a: "Graves' disease is autoimmune and would not cause a community-wide pattern of goiter. It is not linked to geographic or dietary factors that would affect an entire population.",
                c: "Seafood is rich in iodine and would prevent, not cause, iodine-deficiency goiter. Communities with high seafood consumption typically have adequate iodine levels.",
                d: "While some thyroid conditions have genetic components, a community-wide pattern of goiter points to an environmental cause (iodine deficiency), not genetics."
            },
            testTakingTip: "Goiter worldwide = iodine deficiency. Goiter in the US = Hashimoto's (autoimmune). Key difference: iodized salt eliminated endemic goiter in developed countries but remains a global issue.",
            guideSection: "Section 8 — Goiter & Nodules",
            guideSectionId: "goiter-nodules"
        },

        // Q57 — Goitrogens and Diet (Application, Single)
        {
            id: "thyroid_057",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with hypothyroidism asks the nurse, \"My friend told me I should avoid broccoli and cabbage because they're bad for my thyroid. Is that true?\" Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"Yes, you must completely eliminate all cruciferous vegetables from your diet immediately.\"" },
                { id: "b", text: "\"These foods contain goitrogens that can interfere with thyroid function in very large amounts, but cooking them reduces the effect. Normal portions as part of a balanced diet are fine, especially since you're taking levothyroxine.\"" },
                { id: "c", text: "\"No, diet has absolutely no effect on thyroid function.\"" },
                { id: "d", text: "\"You should eat as much broccoli and cabbage as possible to help your thyroid work better.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Cruciferous vegetables (broccoli, cabbage, cauliflower, Brussels sprouts, kale) contain goitrogens — substances that can interfere with thyroid hormone synthesis. However, the effect is clinically significant only with very large amounts consumed raw AND in the setting of iodine deficiency. Cooking inactivates most goitrogens. Normal dietary amounts are safe, especially in patients on levothyroxine replacement.",
                a: "Complete elimination is unnecessary and deprives the patient of important nutrients. Cruciferous vegetables have significant health benefits (fiber, vitamins, cancer-fighting compounds). Moderation is key.",
                c: "Diet does affect thyroid function. Iodine is essential for thyroid hormone production, goitrogens can interfere with synthesis, and soy/calcium/fiber affect levothyroxine absorption. Telling the patient diet has no effect is inaccurate.",
                d: "Recommending increased consumption of goitrogen-rich foods to a hypothyroid patient is inappropriate. While normal amounts are fine, excessive intake could theoretically worsen thyroid function."
            },
            testTakingTip: "Goitrogens = cruciferous veggies + soy. Cooking reduces the effect. Normal amounts are fine for hypothyroid patients on levothyroxine. Only a problem with massive RAW consumption + iodine deficiency.",
            guideSection: "Section 10 — Diet Considerations",
            guideSectionId: "diet"
        },

        // Q58 — Graves' TSI Antibodies (Knowledge, Single)
        {
            id: "thyroid_058",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with Graves' disease asks why the thyroid keeps making too much hormone even though TSH is very low. Which explanation by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"Your thyroid gland has a tumor that produces hormone independently of TSH.\"" },
                { id: "b", text: "\"Your immune system produces antibodies called TSI that mimic TSH and continuously stimulate the thyroid, regardless of the feedback loop.\"" },
                { id: "c", text: "\"Your pituitary gland is producing too much TSH, overstimulating the thyroid.\"" },
                { id: "d", text: "\"You are consuming too much dietary iodine, which forces the thyroid to make excess hormone.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "In Graves' disease, the immune system produces thyroid-stimulating immunoglobulins (TSI) that bind to and activate TSH receptors on thyroid cells. Unlike TSH, TSI is NOT regulated by the negative feedback loop. Even though high T3/T4 levels suppress TSH to near-zero, TSI continues to stimulate the thyroid, causing unrelenting hormone production.",
                a: "An autonomously functioning thyroid tumor describes a toxic adenoma, not Graves' disease. Graves' is autoimmune, causing diffuse stimulation of the entire gland.",
                c: "In Graves' disease, TSH is actually SUPPRESSED (very low) because the excess thyroid hormone provides strong negative feedback. The stimulation comes from TSI, not TSH.",
                d: "While dietary iodine provides substrate for hormone synthesis, it does not drive the overproduction in Graves'. The fundamental problem is the TSI antibody that bypasses normal regulatory mechanisms."
            },
            testTakingTip: "Why does Graves' bypass feedback? TSI mimics TSH but the pituitary can't turn it off. Even with TSH near zero, TSI keeps stimulating. The thyroid can't tell the difference between TSH and TSI.",
            guideSection: "Section 5 — Hyperthyroidism",
            guideSectionId: "hyperthyroidism"
        },

        // Q59 — Graves' Treatment Options (Application, Single)
        {
            id: "thyroid_059",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 35-year-old woman with Graves' disease is discussing treatment options with her healthcare team. She plans to become pregnant within the next year. Which treatment plan is MOST appropriate?",
            options: [
                { id: "a", text: "Radioactive iodine therapy now, followed by levothyroxine and pregnancy once thyroid levels stabilize." },
                { id: "b", text: "Antithyroid medication therapy with methimazole, switching to PTU when she becomes pregnant in the first trimester, then back to methimazole for the second and third trimesters." },
                { id: "c", text: "Immediate total thyroidectomy without preoperative preparation." },
                { id: "d", text: "Beta-blocker therapy alone, since it controls all hyperthyroid symptoms without affecting the thyroid directly." }
            ],
            correct: "b",
            rationale: {
                correct: "For a woman planning pregnancy, antithyroid medications are the preferred approach. Methimazole is used until pregnancy is confirmed, then switched to PTU during the first trimester (methimazole is teratogenic in early pregnancy). After the first trimester, methimazole can be resumed because PTU carries a higher risk of hepatotoxicity (black box warning).",
                a: "RAI is contraindicated in women planning pregnancy within 6-12 months. RAI destroys thyroid tissue and requires a waiting period before conception. If already pregnant, RAI would destroy the fetal thyroid.",
                c: "Thyroidectomy without preoperative preparation (achieving euthyroid state, Lugol's solution) increases the risk of thyroid storm during surgery. Surgery may be an option but requires proper preparation.",
                d: "Beta-blockers only manage symptoms (tachycardia, tremors) but do NOT reduce thyroid hormone levels. Uncontrolled hyperthyroidism during pregnancy increases miscarriage risk, preterm birth, and fetal complications."
            },
            testTakingTip: "Pregnancy + hyperthyroidism drug rule: Methimazole normally → switch to PTU in 1st trimester → switch back to methimazole in 2nd/3rd. RAI = ABSOLUTELY contraindicated if pregnant or planning pregnancy within 6-12 months.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q60 — Hot vs Cold Nodule (Knowledge, Single)
        {
            id: "thyroid_060",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient has a radioactive iodine uptake scan that shows a 'cold' nodule. The nurse explains that this finding means:",
            options: [
                { id: "a", text: "The nodule is actively producing thyroid hormone and is almost certainly benign." },
                { id: "b", text: "The nodule does not take up radioactive iodine, which indicates it is non-functioning and has a higher risk of being malignant." },
                { id: "c", text: "The nodule has a cold temperature on palpation, indicating poor blood supply." },
                { id: "d", text: "The nodule responded well to thyroid medication and is shrinking." }
            ],
            correct: "b",
            rationale: {
                correct: "A 'cold' nodule does not concentrate radioactive iodine, meaning it is non-functioning (not producing thyroid hormone). About 5-10% of cold nodules are malignant. While most cold nodules are still benign, they require further evaluation with FNA biopsy to rule out cancer. A 'hot' nodule takes up iodine and is almost always benign.",
                a: "This describes a 'hot' nodule, which actively takes up iodine and produces hormone. Hot nodules are almost always benign. A cold nodule does NOT produce hormone.",
                c: "'Cold' and 'hot' refer to iodine uptake on the scan, not the physical temperature of the nodule. The terminology describes functional activity of the thyroid tissue.",
                d: "A cold nodule on an RAI scan is a diagnostic finding, not a response to treatment. It indicates the nodule is not participating in iodine uptake or hormone production."
            },
            testTakingTip: "Hot nodule = takes up iodine = functioning = usually benign. Cold nodule = doesn't take up iodine = non-functioning = needs biopsy (higher cancer risk). Think: 'Cold is Concerning.'",
            guideSection: "Section 8 — Goiter & Nodules",
            guideSectionId: "goiter-nodules"
        },

        // ================================================================
        //  SECTION 6 — ANTITHYROID MEDICATIONS (Q61–Q75)
        // ================================================================

        // Q61 — Methimazole Mechanism (Knowledge, Single)
        {
            id: "thyroid_061",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with Graves' disease is started on methimazole (Tapazole). The nurse explains that this medication works by:",
            options: [
                { id: "a", text: "Destroying thyroid tissue through radiation exposure." },
                { id: "b", text: "Blocking the synthesis of new thyroid hormones by inhibiting the enzyme thyroid peroxidase." },
                { id: "c", text: "Replacing deficient thyroid hormone in the bloodstream." },
                { id: "d", text: "Blocking the release of preformed thyroid hormone from the gland." }
            ],
            correct: "b",
            rationale: {
                correct: "Methimazole inhibits thyroid peroxidase (TPO), the enzyme responsible for organification of iodine and coupling of iodotyrosines — critical steps in T3/T4 synthesis. By blocking new hormone synthesis, methimazole gradually reduces circulating thyroid hormone levels over 2-8 weeks as existing hormone stores are depleted.",
                a: "This describes radioactive iodine (I-131) therapy, not methimazole. Methimazole is a medication that blocks synthesis, not a radiation treatment.",
                c: "This describes levothyroxine (thyroid hormone replacement), used for hypothyroidism. Methimazole does the opposite — it reduces thyroid hormone production.",
                d: "Blocking hormone release describes the mechanism of Lugol's solution (potassium iodide). Methimazole blocks synthesis of NEW hormones, not the release of already-formed hormones."
            },
            testTakingTip: "Antithyroid drug mechanisms: Methimazole/PTU = block SYNTHESIS. Lugol's iodine = block RELEASE. PTU has the bonus of also blocking peripheral T4→T3 conversion (why it's preferred in thyroid storm).",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q62 — Agranulocytosis Warning (Application, Single)
        {
            id: "thyroid_062",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient has been taking methimazole for 6 weeks. The patient calls the clinic reporting a sore throat, fever of 101.8°F, and mouth ulcers. Which instruction should the nurse provide?",
            options: [
                { id: "a", text: "\"These are common cold symptoms. Take over-the-counter cold medication and continue the methimazole.\"" },
                { id: "b", text: "\"Stop the methimazole immediately and come to the clinic or emergency department NOW for a complete blood count. These symptoms may indicate a serious medication side effect.\"" },
                { id: "c", text: "\"This is likely an allergic reaction. Take an antihistamine and call back if it doesn't improve in a week.\"" },
                { id: "d", text: "\"Increase the methimazole dose, as these symptoms suggest your hyperthyroidism is getting worse.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Sore throat, fever, and mouth ulcers in a patient on antithyroid medication (methimazole or PTU) are classic warning signs of agranulocytosis — a life-threatening reduction in white blood cells. The medication must be stopped immediately and a CBC with differential obtained urgently. Agranulocytosis occurs in 0.1-0.5% of patients, most commonly in the first 3 months. Without prompt recognition, it can be fatal from overwhelming infection.",
                a: "Dismissing these symptoms as a common cold could be fatal. In a patient on antithyroid drugs, sore throat and fever must be evaluated for agranulocytosis until proven otherwise. This is a medical emergency.",
                c: "This is not an allergic reaction presentation. Agranulocytosis requires immediate evaluation and drug discontinuation, not antihistamines and watchful waiting. Delaying evaluation by a week could be fatal.",
                d: "Increasing the dose would worsen agranulocytosis if present. These symptoms indicate a medication side effect, not worsening hyperthyroidism."
            },
            testTakingTip: "Antithyroid drug + sore throat + fever = AGRANULOCYTOSIS until proven otherwise. Stop the drug, get a STAT CBC. This is the #1 tested antithyroid drug side effect on NCLEX. Peak risk: first 3 months.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q63 — PTU Black Box Warning (Knowledge, Single)
        {
            id: "thyroid_063",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Propylthiouracil (PTU) carries a BLACK BOX WARNING for which serious adverse effect?",
            options: [
                { id: "a", text: "Cardiac arrhythmias and sudden death" },
                { id: "b", text: "Severe hepatotoxicity, including liver failure and death" },
                { id: "c", text: "Renal failure requiring dialysis" },
                { id: "d", text: "Permanent bone marrow suppression" }
            ],
            correct: "b",
            rationale: {
                correct: "PTU carries an FDA Black Box Warning for severe hepatotoxicity, including cases of acute liver failure, liver transplantation, and death. This is the primary reason methimazole is now the preferred first-line antithyroid drug. PTU is reserved for first trimester pregnancy (where methimazole is teratogenic) and thyroid storm (where PTU's additional T4→T3 conversion blockade is beneficial).",
                a: "PTU does not carry a black box warning for cardiac arrhythmias. Cardiac issues are more related to the hyperthyroid state itself, not to PTU therapy.",
                c: "PTU is not associated with renal failure. Its primary organ toxicity concern is the liver.",
                d: "While agranulocytosis can occur with PTU (as with methimazole), the BLACK BOX warning is specifically for hepatotoxicity/liver failure, not bone marrow suppression."
            },
            testTakingTip: "PTU black box = LIVER FAILURE. Teach patients to report: jaundice, dark urine, light stools, abdominal pain, fatigue. Methimazole is first-line because of PTU's liver risk. PTU only for: 1st trimester pregnancy + thyroid storm.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q64 — Methimazole vs PTU Comparison Matrix (Analysis, Matrix)
        {
            id: "thyroid_064",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Methimazole", "PTU"],
            stem: "The nurse is comparing antithyroid medications. For each characteristic, identify whether it applies to methimazole or PTU.",
            options: [
                { id: "a", text: "Once-daily dosing due to long half-life" },
                { id: "b", text: "Black Box Warning for severe hepatotoxicity" },
                { id: "c", text: "Preferred antithyroid drug in FIRST trimester pregnancy" },
                { id: "d", text: "Preferred first-line drug for hyperthyroidism (non-pregnant)" },
                { id: "e", text: "Blocks peripheral T4-to-T3 conversion in addition to synthesis" },
                { id: "f", text: "Must be taken 2-3 times daily due to shorter half-life" }
            ],
            correct: {
                a: "Methimazole",
                b: "PTU",
                c: "PTU",
                d: "Methimazole",
                e: "PTU",
                f: "PTU"
            },
            rationale: {
                correct: "Methimazole advantages: once daily, first-line non-pregnant, less liver toxicity. PTU advantages: safer in 1st trimester, blocks peripheral conversion (useful in thyroid storm). PTU disadvantages: hepatotoxicity black box, multiple daily doses.",
                a: "METHIMAZOLE — Its longer half-life allows once-daily dosing, which improves patient compliance compared to PTU.",
                b: "PTU — The FDA Black Box Warning for severe hepatotoxicity (liver failure, death) is specific to PTU. This made methimazole the preferred first-line drug.",
                c: "PTU — Methimazole is teratogenic in the first trimester (causes aplasia cutis and choanal atresia). PTU crosses the placenta less and is the safer choice in early pregnancy.",
                d: "METHIMAZOLE — Due to PTU's liver toxicity risk and methimazole's more favorable side effect profile and once-daily dosing, methimazole is the standard first-line antithyroid drug.",
                e: "PTU — In addition to blocking thyroid hormone synthesis (like methimazole), PTU also inhibits peripheral conversion of T4 to T3 by deiodinase enzymes. This dual action makes PTU preferred in thyroid storm.",
                f: "PTU — Its shorter half-life requires 2-3 doses per day, which can be a compliance challenge for patients."
            },
            testTakingTip: "Methimazole vs PTU quick compare: Methimazole = first-line, once daily, less toxic. PTU = 1st trimester pregnancy, thyroid storm, blocks peripheral conversion, but has liver black box and needs 2-3 daily doses.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q65 — PTU Hepatotoxicity Response Ordering (Application, Ordering)
        {
            id: "thyroid_065",
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient on PTU calls reporting dark urine, yellowing of the eyes, and right upper quadrant abdominal pain — signs of possible hepatotoxicity. Place the nurse's actions in the correct priority order.",
            options: [
                { id: "a", text: "Instruct the patient to STOP taking PTU immediately" },
                { id: "b", text: "Direct the patient to go to the emergency department for urgent liver function testing" },
                { id: "c", text: "Notify the prescribing provider of the suspected hepatotoxicity" },
                { id: "d", text: "Document the patient's symptoms and all nursing actions taken" },
                { id: "e", text: "Collaborate with the provider to arrange alternative antithyroid therapy once stabilized" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "PTU hepatotoxicity is a Black Box Warning emergency: (1) Stop the drug immediately to prevent further liver damage, (2) Get to the ED for urgent LFTs — fulminant liver failure can develop rapidly, (3) Notify the provider for medical decision-making, (4) Document everything, (5) Plan alternative therapy once the patient is stabilized.",
                a: "FIRST — Immediate drug discontinuation is the most critical action. Every additional dose of PTU worsens the liver damage. This cannot wait for lab results or provider callback.",
                b: "SECOND — Emergency liver function testing determines the severity of hepatotoxicity. AST, ALT, bilirubin, INR, and albumin assess liver function. Fulminant failure can develop rapidly.",
                c: "THIRD — The provider needs to be informed to manage the acute situation and plan alternative treatment. The provider may order additional interventions based on lab results.",
                d: "FOURTH — Documentation of symptoms, timeline, and nursing actions ensures continuity of care and provides a legal record of appropriate emergency response.",
                e: "FIFTH — Once the acute crisis is managed, the patient still needs hyperthyroidism treatment. If past the first trimester, methimazole can replace PTU. If still in the first trimester, close collaboration with endocrinology is needed."
            },
            testTakingTip: "PTU + jaundice/dark urine/RUQ pain = STOP the drug FIRST, then ED for labs. Remember 'JDAL' — Jaundice, Dark urine, Abdominal pain, Light stools. Any one of these on PTU = stop immediately.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q66 — Antithyroid Medication Onset of Action (Application, Single)
        {
            id: "thyroid_066",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient started on methimazole 3 days ago asks, \"Why am I still having palpitations and feeling anxious? Is the medication working?\" Which response by the nurse is MOST appropriate?",
            options: [
                { id: "a", text: "\"The medication should have worked by now. Let me notify your provider to increase the dose.\"" },
                { id: "b", text: "\"Methimazole blocks NEW hormone production but doesn't affect the thyroid hormone already in your bloodstream. It typically takes 2 to 8 weeks to notice improvement as the existing hormone is gradually used up.\"" },
                { id: "c", text: "\"You may be having an allergic reaction to the medication. Stop taking it immediately.\"" },
                { id: "d", text: "\"The medication only works when taken with food. Try taking it after meals.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Antithyroid medications block SYNTHESIS of new thyroid hormone but do not affect the hormone already stored in the thyroid gland or circulating in the blood. The thyroid has approximately 2-3 months of stored hormone. It takes 2-8 weeks for existing stores to deplete and for symptom improvement. Meanwhile, beta-blockers can manage symptoms.",
                a: "Three days is far too early to evaluate methimazole effectiveness. Dose increases should not be considered until TSH is rechecked at 4-6 weeks. The current dose may be perfectly adequate.",
                c: "Palpitations and anxiety are ongoing HYPERTHYROID symptoms, not an allergic reaction to methimazole. Stopping the medication would allow worsening of the condition.",
                d: "Methimazole can be taken with or without food. Its absorption is not significantly affected by food. The delayed response is due to existing hormone stores, not administration technique."
            },
            testTakingTip: "Antithyroid drugs take 2-8 weeks to work because the thyroid has hormone STORES that must deplete first. The drugs block new production but can't remove what's already made. Beta-blockers bridge the gap by controlling symptoms.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q67 — PTU in Thyroid Storm Rationale (Analysis, Single)
        {
            id: "thyroid_067",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "In the treatment of thyroid storm, PTU is often preferred over methimazole. Which pharmacological property of PTU makes it superior in this emergency?",
            options: [
                { id: "a", text: "PTU works faster because it has a shorter half-life than methimazole." },
                { id: "b", text: "PTU blocks both thyroid hormone synthesis AND peripheral conversion of T4 to the more active T3, providing a dual mechanism of action." },
                { id: "c", text: "PTU can be given intravenously, while methimazole cannot." },
                { id: "d", text: "PTU has fewer side effects than methimazole in the emergency setting." }
            ],
            correct: "b",
            rationale: {
                correct: "PTU has a unique dual mechanism: it blocks thyroid peroxidase (stopping new hormone synthesis, like methimazole) AND inhibits the peripheral conversion of T4 to T3 by type 1 deiodinase. Since T3 is 3-5 times more biologically active than T4, blocking this conversion rapidly reduces the most active form of thyroid hormone — critical in the emergency of thyroid storm.",
                a: "A shorter half-life does not equate to faster onset. Both methimazole and PTU block synthesis at similar rates. The advantage of PTU is its ADDITIONAL mechanism of blocking T4→T3 conversion.",
                c: "Neither PTU nor methimazole is available in standard IV formulations. Both are given orally or via nasogastric tube in thyroid storm. If the patient cannot take oral medications, rectal administration may be used.",
                d: "PTU actually has MORE side effects than methimazole (black box hepatotoxicity warning). Its use in thyroid storm is based on superior pharmacological activity, not safety."
            },
            testTakingTip: "PTU advantage in thyroid storm: blocks SYNTHESIS + blocks CONVERSION. Methimazole only blocks synthesis. In a life-threatening crisis, you want every mechanism possible to reduce active thyroid hormone.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q68 — Antithyroid Medication Patient Teaching (Application, Single)
        {
            id: "thyroid_068",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is providing discharge teaching to a patient newly started on methimazole. Which instruction is MOST important for patient safety?",
            options: [
                { id: "a", text: "\"Avoid eating dairy products while taking this medication.\"" },
                { id: "b", text: "\"Call your provider or go to the emergency room immediately if you develop a sore throat, fever, or signs of infection, as this could indicate a dangerous drop in white blood cells.\"" },
                { id: "c", text: "\"Take an extra dose if you miss one to maintain consistent blood levels.\"" },
                { id: "d", text: "\"This medication will cure your Graves' disease permanently after a few months of use.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The most critical safety teaching for any patient on antithyroid medications is recognizing signs of agranulocytosis: sore throat, fever, and signs of infection. Agranulocytosis (severe reduction in neutrophils) can be rapidly fatal if not detected early. Prompt reporting allows for immediate CBC testing and drug discontinuation if needed. Peak risk is in the first 3 months.",
                a: "There is no specific dairy restriction with methimazole. Dairy restrictions are relevant for levothyroxine (calcium decreases absorption), not antithyroid drugs.",
                c: "Patients should NOT double doses. If a dose is missed, take it as soon as remembered or skip if close to the next dose. Doubling could increase the risk of side effects.",
                d: "Methimazole does not cure Graves' disease. It controls hormone production while on the medication. Relapse rates after discontinuation are 30-70%. Many patients eventually need definitive treatment (RAI or surgery)."
            },
            testTakingTip: "Priority teaching for antithyroid drugs: 'SORE throat + FEVER = Emergency.' This is the #1 safety message. Don't let patients dismiss these symptoms as a common cold.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q69 — Methimazole Monitoring (Application, Single)
        {
            id: "thyroid_069",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient has been on methimazole for 4 weeks. Which set of laboratory tests should the nurse anticipate the provider ordering at this follow-up visit?",
            options: [
                { id: "a", text: "Hemoglobin A1C and fasting glucose" },
                { id: "b", text: "CBC with differential, liver function tests, and thyroid function tests (TSH, free T4)" },
                { id: "c", text: "Urinalysis and serum creatinine" },
                { id: "d", text: "Serum calcium and phosphorus levels" }
            ],
            correct: "b",
            rationale: {
                correct: "Monitoring for methimazole includes: (1) CBC with differential — to detect agranulocytosis (WBC/neutrophil count), (2) Liver function tests — to monitor for hepatotoxicity, and (3) Thyroid function tests (TSH, free T4) — to assess treatment response and guide dose adjustments. These are essential during the first months of therapy when side effects are most likely.",
                a: "A1C and fasting glucose are diabetes monitoring tests, not relevant to antithyroid drug therapy. While hyperthyroidism can affect glucose levels, the direct medication monitoring requires CBC and LFTs.",
                c: "Urinalysis and serum creatinine monitor renal function. Methimazole is not nephrotoxic, and these are not part of routine antithyroid drug monitoring.",
                d: "Calcium and phosphorus monitoring is relevant after thyroidectomy (parathyroid damage risk) but not for antithyroid medication therapy."
            },
            testTakingTip: "Antithyroid drug monitoring triad: CBC (agranulocytosis), LFTs (hepatotoxicity), TFTs (treatment effectiveness). Particularly important in the first 3 months when agranulocytosis risk peaks.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q70 — Antithyroid Drug Pregnancy Switching Ordering (Analysis, Ordering)
        {
            id: "thyroid_070",
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A woman with Graves' disease on methimazole discovers she is 6 weeks pregnant. Place the following medication management steps in the correct chronological order.",
            options: [
                { id: "a", text: "Discontinue methimazole immediately upon confirming pregnancy in first trimester" },
                { id: "b", text: "Start PTU at the lowest effective dose for the remainder of the first trimester" },
                { id: "c", text: "Monitor thyroid function tests every 2-4 weeks during first trimester" },
                { id: "d", text: "Switch back to methimazole at the beginning of the second trimester (week 13)" },
                { id: "e", text: "Continue methimazole for the remainder of pregnancy with regular TFT monitoring" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The antithyroid drug protocol for pregnancy follows a careful switching sequence: (1) Stop methimazole because it's teratogenic in the first trimester, (2) Start PTU (safer in first trimester), (3) Monitor closely, (4) Switch back to methimazole at week 13 because PTU has higher hepatotoxicity risk, (5) Continue methimazole for the rest of pregnancy.",
                a: "FIRST — Methimazole must be stopped immediately because first-trimester exposure is associated with aplasia cutis (skin defects) and choanal atresia in the fetus.",
                b: "SECOND — PTU is started as the replacement antithyroid drug because it crosses the placenta less than methimazole and is not associated with the same birth defects in early pregnancy.",
                c: "THIRD — Frequent TFT monitoring is essential during pregnancy because thyroid hormone needs change. The goal is to use the lowest possible dose to maintain free T4 in the upper normal range.",
                d: "FOURTH — At week 13 (start of second trimester), methimazole replaces PTU because PTU's Black Box Warning for hepatotoxicity makes it unsuitable for long-term use when a safer alternative exists.",
                e: "FIFTH — Methimazole is continued through the remainder of pregnancy with ongoing monitoring to maintain maternal euthyroid state while minimizing fetal exposure."
            },
            testTakingTip: "Pregnancy antithyroid switching: 'Metro → PTU → Metro.' Methimazole normally → PTU in 1st trimester → Methimazole back for 2nd/3rd. Switch point = week 13. Reason: methimazole teratogenic early, PTU hepatotoxic long-term.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q71 — Beta Blockers in Hyperthyroidism (Application, Single)
        {
            id: "thyroid_071",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with newly diagnosed Graves' disease is prescribed propranolol in addition to methimazole. The patient asks, \"Why do I need two medications?\" Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"Propranolol cures the hyperthyroidism faster when combined with methimazole.\"" },
                { id: "b", text: "\"Propranolol controls your symptoms like rapid heartbeat and tremors right away, while the methimazole takes several weeks to reduce your thyroid hormone levels. The propranolol bridges the gap.\"" },
                { id: "c", text: "\"Propranolol replaces the thyroid hormone that methimazole blocks, keeping you balanced.\"" },
                { id: "d", text: "\"Both medications do the same thing but work through different pathways for stronger effect.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Propranolol (a beta-blocker) provides rapid symptomatic relief by blocking the adrenergic effects of excess thyroid hormone (tachycardia, tremors, anxiety, palpitations). It does NOT reduce thyroid hormone levels. Methimazole blocks new hormone synthesis but takes 2-8 weeks to lower circulating levels. Propranolol 'bridges' this gap by controlling dangerous cardiac and neurological symptoms in the interim.",
                a: "Propranolol does not affect thyroid hormone production or cure hyperthyroidism. It only masks the sympathetic symptoms. Once methimazole achieves euthyroid state, propranolol is typically discontinued.",
                c: "Propranolol does not replace or supplement thyroid hormone. It blocks beta-adrenergic receptors to reduce heart rate, tremors, and anxiety caused by excess thyroid hormone stimulation.",
                d: "They do NOT do the same thing. Methimazole reduces hormone production (addresses the cause). Propranolol blocks symptomatic effects (manages symptoms). They have completely different targets."
            },
            testTakingTip: "Beta-blockers in hyperthyroidism = symptom bridge. They DON'T treat the thyroid — they treat the dangerous symptoms (tachycardia, tremors) while waiting for antithyroid drugs to work. Usually discontinued once euthyroid.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q72 — Beta-Blocker Discontinuation (Application, Single)
        {
            id: "thyroid_072",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A hyperthyroid patient on propranolol 40 mg three times daily has achieved a euthyroid state after 8 weeks of methimazole therapy. The provider plans to discontinue the propranolol. Which instruction is MOST important?",
            options: [
                { id: "a", text: "\"Stop the propranolol immediately since your thyroid levels are normal now.\"" },
                { id: "b", text: "\"The propranolol will be gradually tapered over several days. Stopping it suddenly can cause rebound tachycardia and hypertension.\"" },
                { id: "c", text: "\"Continue taking propranolol indefinitely as a preventive measure.\"" },
                { id: "d", text: "\"Switch from propranolol to aspirin for continued heart rate control.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Beta-blockers must NEVER be stopped abruptly. Sudden discontinuation can cause rebound sympathetic activation — rebound tachycardia, hypertension, and in cardiac patients, angina or MI. The dose should be gradually reduced over several days to a week. This principle applies to all beta-blockers, not just in the thyroid context.",
                a: "Abrupt discontinuation is dangerous. Even though thyroid levels are normal, stopping propranolol suddenly can cause rebound tachycardia and dangerous blood pressure spikes.",
                c: "Long-term propranolol is unnecessary once the euthyroid state is maintained. Continued use would cause unnecessary side effects (bradycardia, fatigue, hypotension).",
                d: "Aspirin is not a substitute for beta-blocker therapy and does not control heart rate. Additionally, aspirin is contraindicated in thyrotoxicosis because it can increase free thyroid hormone levels."
            },
            testTakingTip: "NEVER stop beta-blockers abruptly — always taper. This rule applies everywhere: HTN, heart failure, hyperthyroidism. Rebound effect = sympathetic surge → tachycardia → hypertension → potential cardiac event.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q73 — Antithyroid Drug Side Effects Matrix (Analysis, Matrix)
        {
            id: "thyroid_073",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Report Immediately (Urgent)", "Expected/Monitor (Non-Urgent)"],
            stem: "A nurse is educating a patient on methimazole about side effects. For each symptom, indicate whether the patient should report it immediately or whether it is an expected finding that should be monitored.",
            options: [
                { id: "a", text: "Sore throat and fever (101°F)" },
                { id: "b", text: "Mild skin rash and pruritus" },
                { id: "c", text: "Unexplained jaundice and dark urine" },
                { id: "d", text: "Mild joint pain (arthralgia)" },
                { id: "e", text: "Unusual bleeding or bruising" }
            ],
            correct: {
                a: "Report Immediately (Urgent)",
                b: "Expected/Monitor (Non-Urgent)",
                c: "Report Immediately (Urgent)",
                d: "Expected/Monitor (Non-Urgent)",
                e: "Report Immediately (Urgent)"
            },
            rationale: {
                correct: "Sore throat/fever (agranulocytosis), jaundice/dark urine (hepatotoxicity), and unusual bleeding/bruising (thrombocytopenia) are urgent signs requiring immediate evaluation. Mild rash and mild joint pain are common, non-life-threatening side effects that should be monitored.",
                a: "REPORT IMMEDIATELY — Sore throat and fever are the hallmark warning signs of agranulocytosis. A CBC with differential must be obtained urgently. Delay can be fatal.",
                b: "EXPECTED/MONITOR — Mild skin rash and itching occur in 3-5% of patients and may resolve with antihistamines. However, if the rash becomes severe or is accompanied by fever, it requires re-evaluation.",
                c: "REPORT IMMEDIATELY — Jaundice and dark urine indicate hepatotoxicity. While more common with PTU, it can also occur with methimazole. Liver function tests and drug discontinuation may be needed.",
                d: "EXPECTED/MONITOR — Mild arthralgia is a relatively common side effect of antithyroid drugs. It usually does not require drug discontinuation unless severe or associated with vasculitis symptoms.",
                e: "REPORT IMMEDIATELY — Unusual bleeding or bruising may indicate thrombocytopenia (low platelets) or other blood dyscrasias associated with antithyroid drugs. A CBC is needed promptly."
            },
            testTakingTip: "Antithyroid drug urgent symptoms: 'STJ-BB' — Sore Throat, Jaundice, Bleeding/Bruising. These signal agranulocytosis, liver failure, or thrombocytopenia. Mild rash and joint pain = monitor but don't panic.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q74 — PTU in Pregnancy First Trimester (Application, Single)
        {
            id: "thyroid_074",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A pregnant patient at 10 weeks gestation is diagnosed with hyperthyroidism requiring treatment. The provider prescribes PTU instead of methimazole. Which explanation by the nurse BEST describes why PTU is preferred at this stage?",
            options: [
                { id: "a", text: "PTU is more effective than methimazole at controlling hyperthyroidism during pregnancy." },
                { id: "b", text: "Methimazole can cause birth defects (aplasia cutis, choanal atresia) in the first trimester, while PTU has a better safety profile in early pregnancy." },
                { id: "c", text: "PTU does not cross the placenta at all, making it completely safe for the fetus." },
                { id: "d", text: "Methimazole is not available in a safe dosage form for pregnant patients." }
            ],
            correct: "b",
            rationale: {
                correct: "Methimazole is associated with specific teratogenic effects when used in the first trimester: aplasia cutis (absence of skin patches on the scalp) and choanal atresia (blockage of the nasal passages). PTU has not been associated with these specific birth defects. However, PTU is only preferred in the first trimester — after week 12-13, methimazole becomes preferred due to PTU's hepatotoxicity risk.",
                a: "Both drugs are similarly effective at controlling hyperthyroidism. The preference for PTU is based on SAFETY (teratogenicity difference), not efficacy.",
                c: "PTU DOES cross the placenta — just less than methimazole. No antithyroid drug is completely safe for the fetus. The goal is to use the lowest effective dose to maintain maternal euthyroid state.",
                d: "Methimazole is available in the same dosage forms. The issue is not availability but teratogenicity in early pregnancy."
            },
            testTakingTip: "Methimazole teratogenic effects: Aplasia cutis + Choanal atresia (both start with vowels: A and C). These only occur in first trimester. PTU is safer early, but its liver risk makes methimazole safer for long-term use.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q75 — Antithyroid Drugs: Correct vs Needs Teaching Matrix (Analysis, Matrix)
        {
            id: "thyroid_075",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "A nurse is evaluating a patient's understanding of methimazole therapy. For each patient statement, indicate whether it shows correct understanding or needs more teaching.",
            options: [
                { id: "a", text: "\"If I get a sore throat and fever, I need to call my doctor right away.\"" },
                { id: "b", text: "\"This medication will take a few weeks to really start working, so I should be patient.\"" },
                { id: "c", text: "\"Once my thyroid levels are normal, I can stop taking the medication on my own.\"" },
                { id: "d", text: "\"I shouldn't worry about minor symptoms like sore throat since it's probably just a cold.\"" },
                { id: "e", text: "\"I'll keep taking my medication consistently and let my doctor decide when to stop it.\"" }
            ],
            correct: {
                a: "Correct Understanding",
                b: "Correct Understanding",
                c: "Needs More Teaching",
                d: "Needs More Teaching",
                e: "Correct Understanding"
            },
            rationale: {
                correct: "Recognizing agranulocytosis symptoms (A), understanding delayed onset (B), and medication compliance with provider guidance (E) show correct understanding. Self-discontinuation (C) and dismissing sore throat symptoms (D) are dangerous misconceptions.",
                a: "CORRECT UNDERSTANDING — Sore throat and fever are the critical warning signs of agranulocytosis. Immediate reporting allows for urgent CBC testing and potential drug discontinuation.",
                b: "CORRECT UNDERSTANDING — Antithyroid drugs take 2-8 weeks to achieve therapeutic effect because they block new synthesis but don't remove existing hormone stores. Setting proper expectations improves compliance.",
                c: "NEEDS MORE TEACHING — Patients should NEVER stop antithyroid medications without provider guidance. Premature discontinuation can cause hyperthyroid relapse or even thyroid storm. The provider determines when and how to taper.",
                d: "NEEDS MORE TEACHING — This is the MOST dangerous misconception. Dismissing sore throat as 'just a cold' delays detection of agranulocytosis, which can be fatal. ALL sore throats on antithyroid drugs need evaluation.",
                e: "CORRECT UNDERSTANDING — Consistent medication compliance and provider-guided decision-making about discontinuation are essential for safe and effective antithyroid therapy."
            },
            testTakingTip: "Dismissing sore throat on antithyroid drugs = most dangerous patient misconception. It's never 'just a cold' until agranulocytosis is ruled out with a CBC.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // ================================================================
        //  SECTION 7 — LUGOL'S SOLUTION, RAI, BETA-BLOCKERS (Q76–Q85)
        // ================================================================

        // Q76 — Lugol's Solution Administration (Application, Single)
        {
            id: "thyroid_076",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is prescribed Lugol's solution (potassium iodide) before thyroidectomy. Which administration technique is MOST correct?",
            options: [
                { id: "a", text: "Administer undiluted on an empty stomach for rapid absorption." },
                { id: "b", text: "Dilute in water or juice, administer through a straw to reduce the bitter taste, take with food, and rinse the mouth afterward." },
                { id: "c", text: "Apply topically to the thyroid area of the neck for direct absorption." },
                { id: "d", text: "Administer intramuscularly for fastest onset of action." }
            ],
            correct: "b",
            rationale: {
                correct: "Lugol's solution has a strong, bitter, metallic taste that can cause significant GI upset. Proper administration includes: (1) diluting in water or juice to mask the taste, (2) using a straw to minimize contact with oral mucous membranes, (3) taking with food to decrease GI upset, and (4) rinsing the mouth afterward. These techniques improve tolerance and compliance.",
                a: "Undiluted Lugol's solution is extremely bitter and causes significant GI upset. It should always be diluted. Empty stomach administration increases nausea and vomiting.",
                c: "Lugol's solution is an ORAL medication, not a topical preparation. It must be ingested to provide the systemic effect of blocking thyroid hormone release and decreasing gland vascularity.",
                d: "Lugol's solution is administered ORALLY, not intramuscularly. There is no injectable form."
            },
            testTakingTip: "Lugol's solution: Dilute + Straw + Food + Rinse. Think 'DSFR' — Dilute in juice, Straw to bypass taste buds, Food to prevent GI upset, Rinse mouth after. The straw minimizes the bitter metallic taste.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q77 — Lugol's Preoperative Purpose (Knowledge, Single)
        {
            id: "thyroid_077",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A surgeon orders Lugol's solution for 10-14 days before a patient's scheduled thyroidectomy. The PRIMARY purpose of this preoperative iodine therapy is to:",
            options: [
                { id: "a", text: "Increase thyroid hormone production to build up reserves before the gland is removed." },
                { id: "b", text: "Decrease the size and vascularity of the thyroid gland, reducing the risk of surgical bleeding." },
                { id: "c", text: "Provide radioactive iodine to begin destroying thyroid cells before surgery." },
                { id: "d", text: "Test whether the patient is allergic to iodine before using iodine-based surgical antiseptics." }
            ],
            correct: "b",
            rationale: {
                correct: "Lugol's solution given preoperatively decreases the size, vascularity (blood flow), and friability of the thyroid gland. This makes the surgical field cleaner, reduces intraoperative bleeding risk, and makes the procedure technically easier and safer. It also inhibits thyroid hormone release through the Wolff-Chaikoff effect.",
                a: "The goal is the OPPOSITE — to reduce thyroid activity before surgery, not increase it. Lugol's solution actually inhibits hormone release.",
                c: "Lugol's solution contains stable (non-radioactive) iodine, not radioactive iodine (I-131). It does not destroy thyroid cells — it reduces vascularity and blocks hormone release.",
                d: "Lugol's solution is not used as an allergy test. Iodine allergy testing, if needed, would be done differently. The preoperative purpose is specifically to prepare the gland for surgery."
            },
            testTakingTip: "Lugol's before thyroidectomy = reduces VASCULARITY (less bleeding in surgery). Think of it as 'deflating and firming up' the thyroid gland. Given 10-14 days before surgery. It also blocks hormone release.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q78 — Radioactive Iodine Expected Outcome (Application, Single)
        {
            id: "thyroid_078",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Graves' disease is scheduled for radioactive iodine (I-131) therapy. Which statement indicates the patient needs ADDITIONAL teaching about the expected outcome?",
            options: [
                { id: "a", text: "\"I will probably need to take thyroid medication for the rest of my life after this treatment.\"" },
                { id: "b", text: "\"My symptoms might get worse for a few days after the treatment before they improve.\"" },
                { id: "c", text: "\"Once the radioactive iodine destroys my thyroid, I won't need any thyroid-related medication ever again.\"" },
                { id: "d", text: "\"It may take several weeks to months before the full effect of the treatment is seen.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "This statement shows misunderstanding. RAI destroys thyroid tissue, which means the patient will almost certainly develop HYPOTHYROIDISM and will need LIFELONG levothyroxine replacement. Not needing medication 'ever again' is incorrect — the medication changes from antithyroid drugs to thyroid replacement. Statements A, B, and D are all accurate.",
                a: "ACCURATE — The expected outcome of RAI is hypothyroidism, requiring lifelong levothyroxine. This is considered a therapeutic success, not a complication.",
                b: "ACCURATE — Thyroid hormone stored in the gland is released as cells are destroyed, causing a temporary worsening of hyperthyroid symptoms (transient thyroiditis). This is expected and self-limiting.",
                d: "ACCURATE — RAI takes weeks to months for full effect. The thyroid cells are gradually destroyed by radiation over time. Some patients require a second dose."
            },
            testTakingTip: "RAI 'cures' hyperthyroidism by creating hypothyroidism. The patient trades one condition for another — but hypothyroidism is much easier to manage (one daily pill). Key teaching: expect lifelong levothyroxine.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q79 — RAI Radiation Precautions Ordering (Application, Ordering)
        {
            id: "thyroid_079",
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient is being discharged after receiving radioactive iodine (I-131) therapy. Place the following radiation safety instructions in order from MOST important to LEAST important.",
            options: [
                { id: "a", text: "Avoid close contact with pregnant women and young children for 3-7 days" },
                { id: "b", text: "Sleep alone and avoid intimate physical contact for several days" },
                { id: "c", text: "Flush the toilet 2-3 times after use and wash hands thoroughly" },
                { id: "d", text: "Use separate eating utensils and wash them separately" },
                { id: "e", text: "Increase fluid intake to help eliminate the radioactive iodine more quickly" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "RAI precautions are prioritized by radiation sensitivity of those at risk: (1) Pregnant women and children are most radiosensitive, (2) Close/intimate contact transmits the most radiation, (3) Body fluids (urine, saliva) contain concentrated I-131, (4) Shared utensils can transfer contaminated saliva, (5) Increased fluids speed elimination and reduce radiation exposure time.",
                a: "MOST IMPORTANT — Pregnant women and young children are extremely sensitive to radiation. Fetal thyroid tissue can be damaged by even small radiation exposure. This is the top safety priority.",
                b: "SECOND — Sleeping apart and avoiding intimate contact minimize prolonged close-range radiation exposure. Radiation decreases significantly with distance.",
                c: "THIRD — Urine contains the highest concentration of excreted I-131. Double/triple flushing and handwashing prevent environmental contamination.",
                d: "FOURTH — Saliva contains I-131. Using separate utensils and washing them separately prevents oral transmission to household members.",
                e: "FIFTH — Increasing fluid intake promotes renal excretion of I-131, reducing the duration of radioactivity in the body. While important, it has less immediate impact than avoiding vulnerable populations."
            },
            testTakingTip: "RAI precaution priority: Protect the MOST VULNERABLE first (pregnant women, children), then minimize DOSE to others (distance, separate items), then SPEED elimination (fluids). Think: People → Distance → Excretion.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q80 — RAI Contraindications (Knowledge, Single)
        {
            id: "thyroid_080",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Before administering radioactive iodine (I-131) therapy, the nurse must FIRST verify which critical patient information?",
            options: [
                { id: "a", text: "The patient's most recent hemoglobin A1C level" },
                { id: "b", text: "A negative pregnancy test and confirmation that the patient is not breastfeeding" },
                { id: "c", text: "The patient's baseline kidney function tests" },
                { id: "d", text: "Documentation of a recent dental exam" }
            ],
            correct: "b",
            rationale: {
                correct: "Pregnancy is an ABSOLUTE contraindication for RAI therapy. I-131 crosses the placenta and concentrates in the fetal thyroid, causing irreversible destruction of fetal thyroid tissue and permanent congenital hypothyroidism. Breastfeeding is also contraindicated because I-131 is secreted in breast milk. A pregnancy test is required before RAI administration, regardless of the patient's stated pregnancy status.",
                a: "While diabetes may coexist with thyroid disease, A1C is not relevant to RAI safety. The critical pre-treatment screening is for pregnancy.",
                c: "While adequate renal function helps excrete the radioactive iodine, it is not the most critical screening test. Pregnancy status takes absolute priority.",
                d: "A dental exam is not a prerequisite for RAI therapy. Some sources recommend dental work be done before RAI to avoid radiation exposure to the oral cavity during dental procedures, but this is not the critical safety check."
            },
            testTakingTip: "RAI absolute contraindications: Pregnancy and Breastfeeding. ALWAYS pregnancy test before RAI — no exceptions. Fetal thyroid destruction is permanent. Also: must not plan pregnancy for 6-12 months after RAI.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q81 — RAI Treatment Timeline Ordering (Application, Ordering)
        {
            id: "thyroid_081",
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Graves' disease is scheduled for radioactive iodine (I-131) therapy. Place the following events in the correct chronological order from pre-treatment through long-term follow-up.",
            options: [
                { id: "a", text: "Obtain negative pregnancy test and discontinue antithyroid drugs 3-5 days before RAI" },
                { id: "b", text: "Administer oral I-131 dose and initiate radiation safety precautions for household contacts" },
                { id: "c", text: "Hyperthyroid symptoms may transiently WORSEN as stored hormone is released from damaged thyroid cells" },
                { id: "d", text: "Hypothyroid symptoms develop (fatigue, weight gain, cold intolerance) as thyroid tissue is progressively destroyed" },
                { id: "e", text: "Start lifelong levothyroxine replacement once hypothyroidism is confirmed by elevated TSH" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "RAI treatment follows a predictable timeline: (1) Pre-treatment safety screening and drug washout, (2) RAI administration with radiation precautions, (3) Transient worsening in the first 1-2 weeks from stored hormone release, (4) Hypothyroidism developing over weeks to months as thyroid tissue is destroyed, (5) Lifelong levothyroxine to replace the now-absent thyroid function.",
                a: "FIRST — Pregnancy testing is mandatory (RAI is absolutely contraindicated). Antithyroid drugs are held briefly to maximize thyroid iodine uptake for effective treatment.",
                b: "SECOND — I-131 is given as a single oral dose. Radiation precautions begin immediately: avoid pregnant women/children, sleep alone, separate utensils, flush toilet 2-3 times, increase fluids.",
                c: "THIRD — In the first 1-2 weeks, thyroid cells damaged by radiation release their stored T3/T4, causing a transient worsening of hyperthyroid symptoms. Patients should be warned about this.",
                d: "FOURTH — Over 6-12 weeks (sometimes longer), progressive thyroid cell destruction leads to declining hormone levels and emerging hypothyroid symptoms. This is the expected therapeutic outcome.",
                e: "FIFTH — Once TSH is confirmed elevated and the patient is symptomatic, levothyroxine is initiated. This is lifelong therapy. Post-RAI hypothyroidism = treatment SUCCESS, not failure."
            },
            testTakingTip: "RAI timeline: Pregnancy test → Single dose → Symptoms briefly WORSE (stored hormone release) → Hypothyroidism develops (weeks-months) → Lifelong levothyroxine. The patient trades hyperthyroidism for manageable hypothyroidism.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q82 — Iodine Solution Timing in Thyroid Storm (Analysis, Single)
        {
            id: "thyroid_082",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "In the treatment of thyroid storm, Lugol's solution (iodine) must be administered at least 1 hour AFTER PTU or methimazole. If iodine is given FIRST, the MOST dangerous consequence would be:",
            options: [
                { id: "a", text: "The iodine would have no therapeutic effect." },
                { id: "b", text: "The thyroid gland would use the iodine as raw material to produce MORE thyroid hormone, worsening the crisis." },
                { id: "c", text: "The patient would develop an immediate allergic reaction to the iodine." },
                { id: "d", text: "The iodine would permanently destroy the thyroid gland." }
            ],
            correct: "b",
            rationale: {
                correct: "Iodine is the essential building block for T3 and T4. If iodine is given before an antithyroid drug has blocked thyroid peroxidase (the synthesis enzyme), the overactive thyroid will use the incoming iodine to produce even MORE thyroid hormone — the exact opposite of the intended effect. PTU/methimazole must first block the synthesis pathway, and then iodine can safely inhibit RELEASE of preformed hormone (Wolff-Chaikoff effect).",
                a: "Iodine would have an effect — but a harmful one. Instead of blocking release (the therapeutic goal), it would provide substrate for more hormone production, making the thyroid storm worse.",
                c: "While iodine allergy exists, the timing-dependent risk is not allergic reaction. The danger is pharmacological: providing raw material to an already-overproducing gland.",
                d: "Lugol's solution (stable iodine) does not destroy the thyroid. That is the mechanism of radioactive iodine (I-131). Stable iodine temporarily blocks release and reduces vascularity."
            },
            testTakingTip: "PTU BEFORE iodine — ALWAYS. Think: 'Block the factory BEFORE delivering raw materials.' If you deliver iodine to a factory with no brake on production, it makes MORE product. 1-hour minimum gap.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q83 — Aspirin Contraindication in Thyroid Storm (Knowledge, Single)
        {
            id: "thyroid_083",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient in thyroid storm has a temperature of 105.4°F (40.8°C). The nurse receives an order for antipyretic therapy. Which medication should the nurse question?",
            options: [
                { id: "a", text: "Acetaminophen (Tylenol) 650 mg orally" },
                { id: "b", text: "Aspirin 650 mg orally" },
                { id: "c", text: "External cooling blankets" },
                { id: "d", text: "Tepid sponge bath" }
            ],
            correct: "b",
            rationale: {
                correct: "Aspirin is CONTRAINDICATED in thyroid storm because it displaces thyroid hormones from their binding proteins (thyroid-binding globulin), INCREASING the level of FREE (active) thyroid hormone in the bloodstream. This can worsen the crisis. Acetaminophen is the safe antipyretic choice because it does not affect thyroid hormone binding.",
                a: "Acetaminophen is safe and appropriate for fever management in thyroid storm. It does not affect thyroid hormone protein binding and effectively reduces temperature.",
                c: "External cooling blankets are a standard supportive measure for the dangerous hyperthermia in thyroid storm. They are safe and effective.",
                d: "Tepid sponge baths help reduce fever without causing shivering (which generates more heat). This is an appropriate nursing intervention."
            },
            testTakingTip: "Thyroid storm: NO ASPIRIN. Aspirin knocks thyroid hormone off its binding protein → more FREE hormone → worse crisis. Use acetaminophen for fever. Also: aspirin is contraindicated in thyrotoxicosis in general, not just storm.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q84 — Lugol's Solution Side Effects (Knowledge, Single)
        {
            id: "thyroid_084",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient has been taking Lugol's solution for preoperative thyroidectomy preparation for 12 days. The patient reports a persistent metallic taste, increased salivation, and a rash. The nurse recognizes these symptoms as:",
            options: [
                { id: "a", text: "An expected therapeutic response indicating the medication is working." },
                { id: "b", text: "Signs of iodism (chronic iodine toxicity) that should be reported to the provider." },
                { id: "c", text: "Symptoms of hyperthyroidism worsening despite treatment." },
                { id: "d", text: "An unrelated viral infection that coincidentally occurred during treatment." }
            ],
            correct: "b",
            rationale: {
                correct: "Iodism is the term for chronic iodine toxicity. Classic symptoms include: metallic taste, burning in the mouth and throat, hypersalivation, sore gums and mucous membranes, skin rash, GI upset, and in severe cases, productive cough and swollen salivary glands. These symptoms should be reported because the provider may need to adjust or discontinue the iodine therapy.",
                a: "While some mild taste changes may be expected with iodine, the combination of metallic taste, hypersalivation, AND rash at 12 days indicates toxicity, not therapeutic response.",
                c: "These symptoms are specific to iodine excess, not worsening hyperthyroidism. Hyperthyroid symptoms would include tachycardia, weight loss, and heat intolerance — not metallic taste and hypersalivation.",
                d: "The timing and symptom pattern (metallic taste + hypersalivation + rash during iodine therapy) is too specific to be coincidental. This is a classic iodism presentation."
            },
            testTakingTip: "Iodism = chronic iodine toxicity. Key signs: metallic taste, hypersalivation, skin rash. Lugol's solution effectiveness decreases after 1-2 weeks anyway (escape phenomenon), which is why it's used short-term before surgery.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // Q85 — Thyroid Medication Mechanisms Ordering (Analysis, Ordering)
        {
            id: "thyroid_085",
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A nursing instructor asks students to arrange the following thyroid medications by their mechanism, from blocking hormone SYNTHESIS to blocking hormone RELEASE to blocking sympathetic SYMPTOMS. Place them in the correct mechanistic order.",
            options: [
                { id: "a", text: "Methimazole or PTU (thionamides) — blocks thyroid peroxidase and new hormone synthesis" },
                { id: "b", text: "Lugol's solution (potassium iodide) — blocks release of preformed thyroid hormone" },
                { id: "c", text: "Propranolol (beta-blocker) — blocks adrenergic symptoms without affecting thyroid hormone levels" }
            ],
            correct: ["a", "b", "c"],
            rationale: {
                correct: "This ordering reflects the mechanistic cascade: (1) Thionamides block the creation of NEW hormone at the enzyme level, (2) Iodine solutions block the RELEASE of already-made hormone from the gland, (3) Beta-blockers block the SYMPTOMS caused by circulating hormone at the receptor level. In thyroid storm, all three mechanisms are used together.",
                a: "FIRST (Block Synthesis) — Methimazole and PTU inhibit thyroid peroxidase, the enzyme needed to organify iodine and couple iodotyrosines. This stops NEW hormone production. PTU additionally blocks peripheral T4→T3 conversion.",
                b: "SECOND (Block Release) — Lugol's solution (Wolff-Chaikoff effect) blocks the release of preformed T3/T4 stored in thyroid follicles. Also reduces gland vascularity. Must be given AFTER thionamides in thyroid storm.",
                c: "THIRD (Block Symptoms) — Propranolol blocks beta-adrenergic receptors, reducing tachycardia, tremors, anxiety, and diaphoresis. It does NOT reduce thyroid hormone levels — only the peripheral manifestations."
            },
            testTakingTip: "Thyroid drug mechanisms cascade: Synthesis → Release → Symptoms. Or: Make → Ship → Feel. Thionamides block making, iodine blocks shipping, beta-blockers block feeling. All three used together in thyroid storm.",
            guideSection: "Section 7 — Thyroid Medications",
            guideSectionId: "medications"
        },

        // ================================================================
        //  SECTION 8 — THYROID STORM (Q86–Q95)
        // ================================================================

        // Q86 — Thyroid Storm Recognition (Analysis, Single — Priority)
        {
            id: "thyroid_086",
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with a history of Graves' disease presents to the emergency department after developing a urinary tract infection. Vital signs are: temperature 105.8°F (41°C), heart rate 168 bpm (irregular), blood pressure 190/110 mmHg, respiratory rate 28. The patient is agitated, confused, and diaphoretic. What should the nurse suspect, and what is the PRIORITY action?",
            options: [
                { id: "a", text: "Septic shock; administer IV antibiotics and fluid bolus immediately." },
                { id: "b", text: "Thyroid storm triggered by infection; activate the rapid response team and prepare for multidrug emergency treatment in the ICU." },
                { id: "c", text: "Myxedema coma; administer IV levothyroxine and begin passive rewarming." },
                { id: "d", text: "Panic attack; administer a benzodiazepine and provide a calm environment." }
            ],
            correct: "b",
            rationale: {
                correct: "This is a classic thyroid storm presentation: extreme fever (>104°F), severe tachycardia with possible atrial fibrillation, hypertension, agitation, confusion, and diaphoresis — triggered by a UTI in a patient with known Graves' disease. This is a medical emergency with 20-30% mortality requiring ICU management with PTU, iodine, beta-blockers, corticosteroids, cooling measures, and treatment of the precipitating infection.",
                a: "While infection is a trigger and antibiotics are needed, the presentation (extreme hyperthermia, tachycardia, Graves' history) points to thyroid storm as the primary crisis. Septic shock typically presents with hypOtension, not hypertension.",
                c: "Myxedema coma is the OPPOSITE: hypothermia, bradycardia, hypotension, lethargy. This patient has extreme hyperthermia and tachycardia — consistent with thyroid storm, not myxedema.",
                d: "A panic attack does not cause a temperature of 105.8°F or a heart rate of 168 bpm. These findings indicate a life-threatening medical emergency, not anxiety."
            },
            testTakingTip: "Thyroid storm equation: Known hyperthyroidism + precipitating event (infection, surgery, stress) + fever >104°F + severe tachycardia + altered mental status = thyroid storm until proven otherwise. Mortality 20-30%.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q87 — Thyroid Storm Triggers Matrix (Knowledge, Matrix)
        {
            id: "thyroid_087",
            type: "matrix",
            subtype: null,
            difficulty: "knowledge",
            matrixColumns: ["Known Trigger for Thyroid Storm", "NOT a Trigger for Thyroid Storm"],
            stem: "The nurse is reviewing precipitating factors for thyroid storm. For each factor, indicate whether it is a known trigger or NOT a trigger.",
            options: [
                { id: "a", text: "Abruptly stopping antithyroid medications" },
                { id: "b", text: "Thyroid surgery in an inadequately prepared (non-euthyroid) patient" },
                { id: "c", text: "Regular daily walking exercise" },
                { id: "d", text: "Diabetic ketoacidosis (DKA)" },
                { id: "e", text: "Severe emotional stress or major trauma" }
            ],
            correct: {
                a: "Known Trigger for Thyroid Storm",
                b: "Known Trigger for Thyroid Storm",
                c: "NOT a Trigger for Thyroid Storm",
                d: "Known Trigger for Thyroid Storm",
                e: "Known Trigger for Thyroid Storm"
            },
            rationale: {
                correct: "Thyroid storm triggers include medication discontinuation, unprepared thyroid surgery, DKA, and severe stress/trauma. Regular moderate exercise is not a recognized trigger.",
                a: "KNOWN TRIGGER — Abruptly stopping antithyroid medications (methimazole, PTU) causes a rebound surge in thyroid hormone production that can precipitate thyroid storm.",
                b: "KNOWN TRIGGER — Operating on a hyperthyroid patient who has not been adequately prepared (made euthyroid with antithyroid drugs and Lugol's) can trigger massive thyroid hormone release from surgical manipulation of the gland.",
                c: "NOT A TRIGGER — Regular moderate exercise does not precipitate thyroid storm. Hyperthyroid patients may have exercise intolerance, but routine walking is not a crisis trigger.",
                d: "KNOWN TRIGGER — DKA and other severe metabolic stressors can precipitate thyroid storm in susceptible patients. The physiological stress triggers a massive thyroid hormone surge.",
                e: "KNOWN TRIGGER — Major physical trauma, severe emotional stress, and significant physiological stressors can trigger thyroid storm by increasing catecholamine levels, which amplify thyroid hormone effects."
            },
            testTakingTip: "Thyroid storm triggers overlap with myxedema coma triggers (infection, surgery, stress, stopping meds) — but they precipitate OPPOSITE crises depending on the underlying thyroid condition. Context is key.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q88 — Thyroid Storm Treatment Sequence Ordering (Analysis, Ordering)
        {
            id: "thyroid_088",
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient is diagnosed with thyroid storm in the ICU. Place the multidrug treatment interventions in the correct priority sequence.",
            options: [
                { id: "a", text: "Administer PTU (to block thyroid hormone synthesis and peripheral T4→T3 conversion)" },
                { id: "b", text: "Administer Lugol's solution 1 hour after PTU (to block hormone release)" },
                { id: "c", text: "Administer IV propranolol (to control severe tachycardia and cardiac symptoms)" },
                { id: "d", text: "Administer IV corticosteroids such as dexamethasone (to block T4→T3 conversion and support adrenals)" },
                { id: "e", text: "Initiate cooling measures with acetaminophen and cooling blankets (NOT aspirin)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Thyroid storm treatment follows the 'Block-Block-Block-Block-Cool' strategy: (1) Block SYNTHESIS with PTU first, (2) Block RELEASE with iodine 1 hour after PTU, (3) Block adrenergic SYMPTOMS with beta-blockers, (4) Block peripheral CONVERSION with corticosteroids, (5) Supportive COOLING. Iodine MUST come after PTU to prevent providing raw material for more hormone production.",
                a: "FIRST — PTU blocks new hormone synthesis AND peripheral T4→T3 conversion. It MUST precede iodine. Methimazole can be used if PTU is unavailable, but PTU is preferred for its dual mechanism.",
                b: "SECOND — Lugol's solution blocks release of stored hormone. The 1-hour wait after PTU ensures synthesis is blocked before providing iodine substrate. Giving iodine first would feed the overactive thyroid.",
                c: "THIRD — IV propranolol rapidly controls the dangerous tachycardia, atrial fibrillation, tremors, and agitation. Propranolol also provides some T4→T3 conversion blockade at high doses.",
                d: "FOURTH — Corticosteroids (dexamethasone or hydrocortisone) block peripheral T4→T3 conversion and prevent possible adrenal insufficiency from the hypermetabolic state.",
                e: "FIFTH — Cooling measures address the dangerous hyperthermia. Use acetaminophen ONLY — aspirin is contraindicated because it displaces thyroid hormone from binding proteins, increasing free hormone."
            },
            testTakingTip: "Thyroid storm = 'Block × 4 + Cool.' Synthesis → Release → Symptoms → Conversion → Cool. Critical: PTU BEFORE iodine (1-hour gap). Critical: NO aspirin for fever (use acetaminophen).",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q89 — Thyroid Storm Nursing Care (Application, Single)
        {
            id: "thyroid_089",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient in thyroid storm in the ICU. Which intervention is MOST important for reducing metabolic demand and preventing further decompensation?",
            options: [
                { id: "a", text: "Encourage the patient to ambulate to prevent deep vein thrombosis." },
                { id: "b", text: "Maintain a calm, cool, quiet environment with minimal stimulation and continuous cardiac monitoring." },
                { id: "c", text: "Perform frequent neurological checks using bright lights and loud commands to assess responsiveness." },
                { id: "d", text: "Encourage high-calorie oral intake to replace the calories burned by the hypermetabolic state." }
            ],
            correct: "b",
            rationale: {
                correct: "Thyroid storm creates an extreme hypermetabolic state. Environmental stimulation (noise, bright lights, excessive activity) further increases sympathetic activation and metabolic demand. A calm, cool, quiet environment minimizes additional stimulation. Continuous cardiac monitoring is essential because life-threatening arrhythmias (atrial fibrillation, heart failure) are the primary cause of death.",
                a: "Ambulation is inappropriate during thyroid storm. The patient is critically ill with hemodynamic instability. Activity would increase metabolic demand and cardiac workload, potentially worsening heart failure.",
                c: "Bright lights and loud commands would increase agitation and sympathetic stimulation — exactly what should be MINIMIZED. Neurological assessments should be performed calmly and gently.",
                d: "While the patient does have increased caloric needs, oral intake during an acute crisis may be unsafe (aspiration risk from agitation/delirium). IV fluids and nutrition are more appropriate initially."
            },
            testTakingTip: "Thyroid storm environment: Cool + Calm + Quiet. Every stimulus = more sympathetic activation = more metabolic demand = worse crisis. Minimize visitors, noise, lights. This is the nursing equivalent of 'do no harm.'",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q90 — Thyroid Storm Cardiac Complications (Analysis, Single)
        {
            id: "thyroid_090",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient being treated for thyroid storm develops crackles in the lung bases, jugular vein distension, and a new S3 heart sound. The nurse recognizes these findings as indicating:",
            options: [
                { id: "a", text: "Resolution of the thyroid storm and return to euthyroid state." },
                { id: "b", text: "Heart failure from the sustained cardiovascular demand of thyroid storm." },
                { id: "c", text: "Pneumonia caused by the infection that triggered the thyroid storm." },
                { id: "d", text: "An allergic reaction to the beta-blocker medication." }
            ],
            correct: "b",
            rationale: {
                correct: "Pulmonary crackles, JVD, and S3 heart sound form the classic triad of heart failure. In thyroid storm, the sustained tachycardia, increased myocardial oxygen demand, and heightened cardiac workload can overwhelm the heart, leading to high-output heart failure. This is one of the most dangerous complications and a leading cause of mortality in thyroid storm.",
                a: "Heart failure signs indicate the patient is getting WORSE, not better. Resolution of thyroid storm would show normalizing vital signs, decreased temperature, and improved mental status.",
                c: "While infection may have triggered the thyroid storm, the specific triad (crackles + JVD + S3) points to cardiac failure rather than pneumonia. Pneumonia would more likely present with productive cough, focal crackles, and infiltrates on chest X-ray.",
                d: "Beta-blocker allergy typically presents with bronchospasm, rash, or hypotension — not heart failure. In fact, beta-blockers can sometimes WORSEN heart failure, but the presentation described is from the thyroid storm itself."
            },
            testTakingTip: "Crackles + JVD + S3 = heart failure — regardless of the underlying cause. In thyroid storm, the heart can't keep up with the extreme metabolic demand. This is why cardiac monitoring is continuous and beta-blockers are given early.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q91 — Thyroid Storm vs Severe Hyperthyroidism (Analysis, Single)
        {
            id: "thyroid_091",
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which finding BEST differentiates thyroid storm from uncomplicated severe hyperthyroidism?",
            options: [
                { id: "a", text: "Elevated T3 and T4 levels" },
                { id: "b", text: "Presence of goiter on physical examination" },
                { id: "c", text: "Temperature greater than 104°F (40°C) with altered mental status and multiorgan dysfunction" },
                { id: "d", text: "Low TSH on laboratory testing" }
            ],
            correct: "c",
            rationale: {
                correct: "Thyroid storm is distinguished from severe hyperthyroidism by the presence of extreme hyperthermia (>104°F), altered mental status (agitation → delirium → coma), and multiorgan dysfunction (cardiac, GI, neurological). T3/T4 levels may be similar to uncomplicated hyperthyroidism — thyroid storm is a CLINICAL diagnosis based on the severity of end-organ manifestations, not just lab values.",
                a: "Elevated T3 and T4 are present in both thyroid storm AND uncomplicated hyperthyroidism. Hormone levels do not reliably differentiate the two — some patients in thyroid storm have only moderately elevated levels.",
                b: "Goiter can be present in any form of hyperthyroidism and is not specific to thyroid storm. It helps identify the underlying thyroid disease but not the severity of the crisis.",
                d: "Low TSH is present in all forms of primary hyperthyroidism, from mild to thyroid storm. It does not differentiate the severity of the clinical presentation."
            },
            testTakingTip: "Thyroid storm is a CLINICAL diagnosis, not a lab diagnosis. The differentiator is end-organ damage: extreme fever + brain dysfunction + heart failure. Lab values may look the same as 'regular' hyperthyroidism.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q92 — Post-Thyroid Storm Monitoring (Application, Single)
        {
            id: "thyroid_092",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in thyroid storm has been successfully stabilized over 48 hours with multidrug therapy. Which assessment finding BEST indicates the patient is responding to treatment?",
            options: [
                { id: "a", text: "Heart rate decreasing from 168 to 88 bpm, temperature decreasing to 99.2°F, and the patient becoming alert and oriented" },
                { id: "b", text: "Heart rate remaining at 160 bpm with persistent confusion and fever of 104°F" },
                { id: "c", text: "Development of new lower extremity edema and decreased urine output" },
                { id: "d", text: "TSH level rising from 0.01 to 0.05 mIU/L" }
            ],
            correct: "a",
            rationale: {
                correct: "Successful thyroid storm treatment is reflected by normalization of clinical parameters: heart rate decreasing toward normal, temperature returning to near-normal, and improvement in mental status (alertness, orientation). These indicate that the thyroid hormone excess and sympathetic hyperactivation are being controlled.",
                b: "Persistent tachycardia, confusion, and high fever indicate the thyroid storm is NOT resolving. Treatment modifications may be needed.",
                c: "New edema and decreased urine output suggest heart failure or renal compromise — complications of thyroid storm, not improvement.",
                d: "A TSH change from 0.01 to 0.05 is clinically insignificant. TSH takes weeks to months to normalize after resolving hyperthyroidism. Clinical response is assessed by vital signs and symptoms, not TSH in the acute setting."
            },
            testTakingTip: "Thyroid storm improvement = vital signs trending toward normal: HR decreasing, temp decreasing, mental status improving. Don't rely on TSH — it's too slow to reflect acute changes. Monitor clinical response.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q93 — Corticosteroids in Thyroid Storm Rationale (Knowledge, Single)
        {
            id: "thyroid_093",
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Corticosteroids (dexamethasone or hydrocortisone) are administered during thyroid storm for which TWO reasons?",
            options: [
                { id: "a", text: "To reduce inflammation in the thyroid gland and shrink the goiter" },
                { id: "b", text: "To block peripheral conversion of T4 to T3 and to prevent possible adrenal insufficiency from the hypermetabolic state" },
                { id: "c", text: "To enhance the effect of beta-blockers and reduce blood pressure" },
                { id: "d", text: "To prevent the patient from developing hypothyroidism after treatment" }
            ],
            correct: "b",
            rationale: {
                correct: "Corticosteroids serve two important roles in thyroid storm: (1) They inhibit peripheral conversion of T4 to the more active T3, adding another layer of thyroid hormone reduction. (2) The extreme hypermetabolic state of thyroid storm can deplete cortisol reserves faster than the adrenals can produce it, risking relative adrenal insufficiency. Corticosteroids provide a safety net against adrenal crisis.",
                a: "Corticosteroids in thyroid storm are given systemically for their metabolic effects, not to directly treat thyroid inflammation or reduce goiter size.",
                c: "Corticosteroids do not enhance beta-blocker effects. Each medication works through independent mechanisms in thyroid storm. Beta-blockers block adrenergic receptors; corticosteroids block T4→T3 conversion.",
                d: "Corticosteroids do not prevent hypothyroidism. Post-crisis hypothyroidism depends on definitive treatment (RAI, surgery) and is managed with levothyroxine."
            },
            testTakingTip: "Corticosteroids in thyroid storm: same TWO reasons as in myxedema coma — block T4→T3 conversion + prevent adrenal crisis. Both thyroid emergencies stress the adrenals to the breaking point.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q94 — Thyroid Storm Cooling Measures (Application, Single)
        {
            id: "thyroid_094",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is implementing cooling measures for a patient in thyroid storm with a temperature of 106°F (41.1°C). Which intervention should the nurse AVOID?",
            options: [
                { id: "a", text: "Applying cooling blankets set to a target temperature" },
                { id: "b", text: "Administering aspirin 650 mg orally or rectally for antipyresis" },
                { id: "c", text: "Administering acetaminophen (Tylenol) 650 mg orally" },
                { id: "d", text: "Applying ice packs to the groin and axillae" }
            ],
            correct: "b",
            rationale: {
                correct: "Aspirin is CONTRAINDICATED in thyroid storm because it displaces thyroid hormones from plasma binding proteins, increasing the concentration of free (biologically active) T3 and T4 in the blood. This can dramatically worsen the thyrotoxic crisis. All other cooling measures (cooling blankets, acetaminophen, ice packs) are appropriate and safe.",
                a: "Cooling blankets are appropriate and necessary for the extreme hyperthermia. Unlike myxedema coma (passive rewarming only), thyroid storm requires ACTIVE cooling because the temperature is life-threateningly high.",
                c: "Acetaminophen is the appropriate antipyretic choice because it does not affect thyroid hormone protein binding.",
                d: "Ice packs to large-vessel areas (groin, axillae, neck) are effective adjunctive cooling measures. The nurse should monitor for shivering, which can generate additional heat."
            },
            testTakingTip: "Cooling contrast: Myxedema coma = PASSIVE rewarming only (blankets). Thyroid storm = ACTIVE cooling (blankets, ice, acetaminophen). But BOTH prohibit one thing: myxedema = no active warming, thyroid storm = NO aspirin.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // Q95 — Thyroid Storm vs Myxedema Coma Treatment Matrix (Analysis, Matrix)
        {
            id: "thyroid_095",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Thyroid Storm Treatment", "Myxedema Coma Treatment"],
            stem: "For each treatment intervention, identify whether it is used in thyroid storm or myxedema coma.",
            options: [
                { id: "a", text: "PTU or methimazole (antithyroid drugs)" },
                { id: "b", text: "IV levothyroxine (loading dose)" },
                { id: "c", text: "Active cooling measures (cooling blankets, acetaminophen)" },
                { id: "d", text: "Passive rewarming only (warm blankets, no active heating)" },
                { id: "e", text: "Lugol's solution 1 hour after antithyroid drug" }
            ],
            correct: {
                a: "Thyroid Storm Treatment",
                b: "Myxedema Coma Treatment",
                c: "Thyroid Storm Treatment",
                d: "Myxedema Coma Treatment",
                e: "Thyroid Storm Treatment"
            },
            rationale: {
                correct: "Thyroid storm (excess hormone) requires drugs to REDUCE hormone and COOL the patient. Myxedema coma (hormone deficiency) requires drugs to REPLACE hormone and WARM the patient — carefully. They are mirror-image emergencies with opposite treatments.",
                a: "THYROID STORM — Antithyroid drugs block new hormone synthesis. There is no role for antithyroid drugs in myxedema coma, which needs MORE thyroid hormone, not less.",
                b: "MYXEDEMA COMA — IV levothyroxine replaces the critically deficient thyroid hormone. In thyroid storm, giving more thyroid hormone would be lethal.",
                c: "THYROID STORM — Active cooling addresses the dangerous hyperthermia (>104°F). Myxedema coma requires warming, not cooling.",
                d: "MYXEDEMA COMA — Passive rewarming is the only safe method. Active warming causes vasodilation → cardiovascular collapse in a patient whose heart is already severely compromised.",
                e: "THYROID STORM — Lugol's iodine blocks hormone RELEASE (given after PTU blocks synthesis). In myxedema coma, the goal is the opposite: to restore hormone levels."
            },
            testTakingTip: "Thyroid storm and myxedema coma are mirror opposites: one has too much hormone, the other too little. If you know the treatment for one, reverse everything for the other. Both use corticosteroids for the same reasons.",
            guideSection: "Section 6 — Thyroid Storm",
            guideSectionId: "thyroid-storm"
        },

        // ================================================================
        //  SECTION 9 — THYROIDECTOMY COMPLICATIONS (Q96–Q100)
        // ================================================================

        // Q96 — Post-Thyroidectomy Hemorrhage Priority (Analysis, Single — Priority)
        {
            id: "thyroid_096",
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient is 4 hours post-thyroidectomy. The nurse observes progressive swelling of the anterior neck, blood-tinged drainage soaking the dressing, and the patient states, \"It feels like something is pressing on my throat — I can't breathe well.\" What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Elevate the head of bed and apply an ice pack to the neck to reduce swelling." },
                { id: "b", text: "Administer IV calcium gluconate for possible hypocalcemia." },
                { id: "c", text: "Notify the surgeon immediately and have the suture removal/tracheostomy tray ready at the bedside for emergency airway intervention." },
                { id: "d", text: "Administer a dose of analgesic medication for throat discomfort." }
            ],
            correct: "c",
            rationale: {
                correct: "Neck swelling, bleeding, and dyspnea after thyroidectomy indicate hemorrhage with potential tracheal compression — a life-threatening airway emergency. The surgeon must be notified IMMEDIATELY because the neck sutures/clips may need to be opened AT THE BEDSIDE to evacuate the hematoma and relieve airway pressure. A tracheostomy tray must be readily available for emergency airway access if needed.",
                a: "While head elevation is appropriate positioning, it is NOT the priority. An expanding hematoma compressing the airway requires urgent surgical intervention. Ice and elevation alone will not address this emergency.",
                b: "Calcium gluconate treats hypocalcemia, not hemorrhage. The presenting symptoms (neck swelling, bleeding, dyspnea) clearly indicate bleeding, not hypocalcemia. Hypocalcemia causes tingling and muscle spasms, not neck swelling.",
                d: "Pain medication is not appropriate when the patient is showing signs of airway compromise from hemorrhage. Treating pain without addressing the hematoma is dangerous — and opioids could further compromise respiratory drive."
            },
            testTakingTip: "Post-thyroidectomy: Neck swelling + Dyspnea = HEMORRHAGE → CALL THE SURGEON → suture removal kit ready. The nurse may need to open sutures/clips at the bedside if the airway is obstructed before the surgeon arrives.",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        },

        // Q97 — Post-Thyroidectomy Laryngeal Nerve Damage (Application, Single)
        {
            id: "thyroid_097",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "After a total thyroidectomy, the nurse asks the patient to speak and notes a hoarse, breathy voice. The patient was able to speak normally before surgery. The nurse should FIRST:",
            options: [
                { id: "a", text: "Reassure the patient that this is a common permanent outcome of thyroidectomy." },
                { id: "b", text: "Document the finding and notify the surgeon, as this may indicate recurrent laryngeal nerve injury." },
                { id: "c", text: "Encourage the patient to speak loudly and practice voice exercises immediately." },
                { id: "d", text: "Administer calcium gluconate, as hoarseness is a sign of hypocalcemia." }
            ],
            correct: "b",
            rationale: {
                correct: "New hoarseness after thyroidectomy suggests injury to the recurrent laryngeal nerve, which innervates the vocal cords. The surgeon must be notified because: (1) Unilateral damage causes hoarseness and potential aspiration risk, (2) Bilateral damage can cause complete airway obstruction requiring emergency tracheostomy. The injury may be temporary (from edema or stretching) or permanent (from transection).",
                a: "While some hoarseness may be temporary (from intubation or edema), the nurse should not assume it's permanent or dismiss it. Proper assessment, documentation, and surgeon notification are required.",
                c: "Encouraging forceful speaking immediately after surgery is inappropriate. The vocal cords need time to recover. Speech therapy may be appropriate later if hoarseness persists.",
                d: "Hoarseness is NOT a sign of hypocalcemia. Hypocalcemia causes tingling, numbness, muscle spasms, Chvostek's sign, and Trousseau's sign. While severe hypocalcemia can cause laryngospasm, that presents as stridor and airway obstruction, not hoarseness."
            },
            testTakingTip: "Post-thyroidectomy voice changes: Hoarse/breathy = recurrent laryngeal nerve injury (unilateral). Complete stridor/obstruction = bilateral nerve injury (emergency). Assess voice every 2-4 hours. Always document and notify surgeon.",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        },

        // Q98 — Post-Thyroidectomy Hypocalcemia Signs (Application, Single)
        {
            id: "thyroid_098",
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is assessing a patient 36 hours post-thyroidectomy. The patient reports numbness and tingling around the mouth and fingertips. The nurse inflates a blood pressure cuff on the patient's arm for 3 minutes and observes hand/wrist spasms (carpal spasm). This is documented as:",
            options: [
                { id: "a", text: "Positive Chvostek's sign, indicating hypocalcemia from parathyroid damage" },
                { id: "b", text: "Positive Trousseau's sign, indicating hypocalcemia from parathyroid damage" },
                { id: "c", text: "A normal finding after blood pressure assessment" },
                { id: "d", text: "Positive Allen's test, indicating compromised ulnar artery perfusion" }
            ],
            correct: "b",
            rationale: {
                correct: "Trousseau's sign is elicited by inflating a blood pressure cuff above systolic pressure for 3 minutes. A positive result is carpal spasm (hand/wrist contracture), indicating hypocalcemia. After thyroidectomy, hypocalcemia occurs from accidental damage to or removal of the parathyroid glands, which regulate calcium. This typically occurs 24-72 hours post-op.",
                a: "This is TROUSSEAU'S sign, not Chvostek's. Chvostek's sign is assessed by TAPPING the facial nerve in front of the ear — a positive result is facial muscle twitching on the same side. Both indicate hypocalcemia.",
                c: "Carpal spasm during blood pressure cuff inflation is NOT normal. This is a pathological finding indicating hypocalcemia that requires immediate evaluation and treatment.",
                d: "Allen's test assesses collateral arterial circulation to the hand (radial/ulnar artery patency), not calcium status. It involves compressing both arteries and observing color return."
            },
            testTakingTip: "Keep them straight: Trousseau's = Trousers (arm cuff) → carpal spasm. Chvostek's = Cheek (facial tap) → facial twitch. Both = hypocalcemia. Remember: 'T for Tourniquet/Trousseau's' and 'C for Cheek/Chvostek's.'",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        },

        // Q99 — Post-Thyroidectomy Comprehensive Care Ordering (Analysis, Ordering)
        {
            id: "thyroid_099",
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse receives a patient from the PACU after total thyroidectomy. Place the following post-operative nursing assessments in the correct priority order.",
            options: [
                { id: "a", text: "Assess airway patency, respiratory status, and oxygen saturation" },
                { id: "b", text: "Inspect the surgical dressing for bleeding and check behind the neck for pooling blood" },
                { id: "c", text: "Assess voice quality by asking the patient to speak" },
                { id: "d", text: "Check for signs of hypocalcemia (tingling, numbness, Chvostek's/Trousseau's signs)" },
                { id: "e", text: "Verify emergency equipment at bedside (tracheostomy tray, suction, calcium gluconate)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Post-thyroidectomy assessment follows ABC priority: (1) Airway/breathing is always first — the most immediate life threat, (2) Hemorrhage assessment — the most immediate surgical complication, (3) Voice assessment — detects laryngeal nerve damage, (4) Calcium assessment — typically occurs 24-72 hours post-op, (5) Equipment verification — ensures readiness for any emergency. The first four detect the four major complications.",
                a: "FIRST — Airway assessment is the #1 priority. Post-thyroidectomy patients are at risk for airway compromise from hemorrhage/hematoma, laryngeal edema, or bilateral laryngeal nerve damage. Check breathing, SpO2, stridor.",
                b: "SECOND — Hemorrhage is the most immediate surgical complication. Inspect the dressing anteriorly AND check behind the neck (blood can pool posteriorly due to gravity). Report increasing drainage.",
                c: "THIRD — Ask the patient to speak. New hoarseness indicates possible recurrent laryngeal nerve injury. This should be assessed early to establish a baseline and detect injury.",
                d: "FOURTH — Hypocalcemia from parathyroid damage typically develops 24-72 hours post-op but early assessment establishes a baseline. Check for perioral tingling, Chvostek's, and Trousseau's signs.",
                e: "FIFTH — While equipment should ideally be verified before the patient arrives, confirming tracheostomy tray, suction, O2, and calcium gluconate at the bedside is essential preparation for potential emergencies."
            },
            testTakingTip: "Post-thyroidectomy assessment priority: ABVCE — Airway, Bleeding, Voice, Calcium, Equipment. The four complications to watch for: Hemorrhage, Laryngeal nerve damage, Hypocalcemia, Thyroid storm.",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        },

        // Q100 — Comprehensive Thyroidectomy Complications Matrix (Analysis, Matrix)
        {
            id: "thyroid_100",
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Hemorrhage/Hematoma", "Laryngeal Nerve Damage", "Hypocalcemia/Tetany"],
            stem: "For each post-thyroidectomy assessment finding, identify which complication it indicates.",
            options: [
                { id: "a", text: "Positive Chvostek's and Trousseau's signs" },
                { id: "b", text: "Progressive neck swelling with blood on the dressing" },
                { id: "c", text: "New-onset hoarseness when asking the patient to speak" },
                { id: "d", text: "Numbness and tingling around the mouth and fingertips" },
                { id: "e", text: "Difficulty breathing with a sensation of choking and neck tightness" },
                { id: "f", text: "Muscle cramps and prolonged QT interval on ECG" }
            ],
            correct: {
                a: "Hypocalcemia/Tetany",
                b: "Hemorrhage/Hematoma",
                c: "Laryngeal Nerve Damage",
                d: "Hypocalcemia/Tetany",
                e: "Hemorrhage/Hematoma",
                f: "Hypocalcemia/Tetany"
            },
            rationale: {
                correct: "Each finding maps to a specific thyroidectomy complication: Chvostek's/Trousseau's signs, paresthesias, muscle cramps, and prolonged QT indicate hypocalcemia. Neck swelling, bleeding, and dyspnea indicate hemorrhage. New hoarseness indicates laryngeal nerve damage.",
                a: "HYPOCALCEMIA — Positive Chvostek's (facial twitch with nerve tap) and Trousseau's (carpal spasm with BP cuff) are the classic bedside tests for hypocalcemia from parathyroid damage.",
                b: "HEMORRHAGE — Progressive swelling and visible bleeding indicate post-operative hemorrhage. Blood may also pool behind the neck. The expanding hematoma can compress the trachea.",
                c: "LARYNGEAL NERVE DAMAGE — New hoarseness indicates unilateral recurrent laryngeal nerve injury affecting vocal cord function. Bilateral damage would cause stridor or complete airway obstruction.",
                d: "HYPOCALCEMIA — Perioral and fingertip paresthesias (numbness/tingling) are often the EARLIEST symptoms of developing hypocalcemia, preceding Chvostek's and Trousseau's signs.",
                e: "HEMORRHAGE — Difficulty breathing with choking sensation and neck tightness indicate the hematoma is compressing the trachea — an airway emergency requiring immediate surgeon notification.",
                f: "HYPOCALCEMIA — Muscle cramps result from increased neuromuscular excitability due to low calcium. Prolonged QT on ECG reflects calcium's role in cardiac repolarization — this can progress to dangerous arrhythmias."
            },
            testTakingTip: "Post-thyroidectomy complication rapid recognition: SWELLING/BLEEDING → hemorrhage (call surgeon, suture kit ready). VOICE CHANGES → nerve damage (document, notify). TINGLING/SPASMS → hypocalcemia (IV calcium gluconate). Know which emergency equipment matches which complication.",
            guideSection: "Section 9 — Thyroidectomy Nursing Care",
            guideSectionId: "thyroidectomy"
        }
    ]
};
