/**
 * Hypertension Quiz - Question Data
 * Extracted from guides/hypertension.html practice questions section.
 * 8 NCLEX-style questions: 5 Single, 1 Priority, 1 Matrix, 1 Ordering
 */

/* exported hypertensionQuizData */
var hypertensionQuizData = {
    guideName: "Hypertension",
    guideSlug: "hypertension",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse obtains a blood pressure reading of 142/88 mmHg on a patient during a routine clinic visit. The reading is confirmed with a second measurement 2 minutes later. The patient has no previous history of hypertension. How should the nurse classify this reading according to the 2017 ACC/AHA guidelines?",
            options: [
                { id: "a", text: "Elevated blood pressure" },
                { id: "b", text: "Stage 1 hypertension" },
                { id: "c", text: "Stage 2 hypertension" },
                { id: "d", text: "Normal blood pressure" }
            ],
            correct: "c",
            labValues: [
                { name: "Blood Pressure", normal: "<120/<80 mmHg" }
            ],
            rationale: {
                correct: "Stage 2 hypertension is defined as SBP \u2265 140 OR DBP \u2265 90 mmHg. This patient\u2019s SBP of 142 meets the Stage 2 threshold. When systolic and diastolic readings fall into different categories, always classify by the HIGHER (more severe) category. The DBP of 88 alone would be Stage 1 (80-89), but the SBP of 142 places this in Stage 2.",
                a: "Elevated blood pressure is SBP 120-129 with DBP < 80. This patient exceeds both thresholds.",
                b: "Stage 1 hypertension is SBP 130-139 OR DBP 80-89. While the DBP qualifies for Stage 1, the SBP of 142 pushes classification to Stage 2.",
                d: "Normal BP is < 120/< 80. This reading significantly exceeds normal values."
            },
            testTakingTip: "When systolic and diastolic fall in different categories, ALWAYS classify by the higher one. This is a common NCLEX trap - don\u2019t average them or go with the \"lower\" category. Also remember: diagnosis requires 2+ readings on 2+ separate occasions.",
            guideSection: "Section 2 - Blood Pressure Classification",
            guideSectionId: "classification"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is taking a blood pressure reading on an obese patient using the only available adult cuff, which appears small for the patient\u2019s arm circumference. The nurse obtains a reading of 162/96 mmHg. What should the nurse conclude about this reading?",
            options: [
                { id: "a", text: "The reading is accurate and the patient has Stage 2 hypertension" },
                { id: "b", text: "The reading may be falsely LOW and should be repeated with the correct cuff size" },
                { id: "c", text: "The reading may be falsely HIGH and should be repeated with the correct cuff size" },
                { id: "d", text: "The cuff size does not significantly affect blood pressure readings" }
            ],
            correct: "c",
            rationale: {
                correct: "A blood pressure cuff that is too small for the patient\u2019s arm circumference produces a falsely HIGH reading. The cuff bladder should encircle at least 80% of the upper arm. When the cuff is too narrow, it must be inflated to a higher pressure to compress the brachial artery, resulting in an artificially elevated reading. This is the most common source of BP measurement error.",
                a: "The reading cannot be considered accurate when the cuff size is inappropriate. Measurement technique must be correct before classifying BP.",
                b: "A too-small cuff produces falsely HIGH readings, not low. A too-LARGE cuff produces falsely low readings.",
                d: "Cuff size is the most common source of BP measurement error and significantly affects accuracy."
            },
            testTakingTip: "Remember: small cuff = falsely HIGH, large cuff = falsely LOW. This is a heavily tested concept. The cuff bladder should encircle 80% of the arm circumference. Always select the appropriate cuff size before taking a reading.",
            guideSection: "Section 2 - Blood Pressure Classification",
            guideSectionId: "classification"
        },
        {
            id: 3,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Evidence-Based - Recommend", "Not Evidence-Based - Do Not Recommend"],
            stem: "A nurse is counseling a patient newly diagnosed with Stage 1 hypertension on lifestyle modifications. For each recommendation, indicate whether it is evidence-based or not evidence-based.",
            options: [
                { id: "a", text: "Follow the DASH diet emphasizing fruits, vegetables, whole grains, and low-fat dairy" },
                { id: "b", text: "Limit sodium intake to less than 2,300 mg per day" },
                { id: "c", text: "Drink one glass of red wine daily to promote heart health" },
                { id: "d", text: "Engage in at least 150 minutes per week of moderate-intensity aerobic exercise" }
            ],
            correct: { a: "Evidence-Based - Recommend", b: "Evidence-Based - Recommend", c: "Not Evidence-Based - Do Not Recommend", d: "Evidence-Based - Recommend" },
            rationale: {
                correct: "The DASH diet, sodium restriction, and regular aerobic exercise are all evidence-based lifestyle modifications proven to lower blood pressure. Drinking red wine daily is not an evidence-based recommendation - alcohol raises blood pressure.",
                a: "EVIDENCE-BASED - The DASH diet alone can reduce SBP by approximately 11 mmHg. It is one of the most effective non-pharmacological interventions for hypertension.",
                b: "EVIDENCE-BASED - Sodium restriction to <2,300 mg/day (ideally <1,500 mg/day for greater effect) can reduce SBP by 5\u20136 mmHg.",
                c: "NOT EVIDENCE-BASED - No guideline recommends initiating alcohol intake for blood pressure management. Alcohol actually raises blood pressure. Guidelines recommend limiting, not starting, alcohol.",
                d: "EVIDENCE-BASED - Regular aerobic exercise of 90\u2013150 minutes per week at moderate intensity can reduce SBP by 5\u20138 mmHg."
            },
            testTakingTip: "Be cautious of 'health myths' on the NCLEX - recommending alcohol for heart health is NOT evidence-based nursing practice. Focus on proven modifications: DASH diet, sodium restriction, exercise, weight loss, and alcohol limitation.",
            guideSection: "Section 6 - Lifestyle Modifications",
            guideSectionId: "lifestyle"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with hypertension and type 2 diabetes with proteinuria is being started on an antihypertensive medication. The provider selects lisinopril. Which statement BEST explains why this medication class is preferred for this patient?",
            options: [
                { id: "a", text: "ACE inhibitors are the most potent blood pressure-lowering agents" },
                { id: "b", text: "ACE inhibitors have renoprotective effects that slow the progression of diabetic nephropathy" },
                { id: "c", text: "ACE inhibitors also lower blood glucose in diabetic patients" },
                { id: "d", text: "ACE inhibitors have fewer side effects than all other antihypertensive classes" }
            ],
            correct: "b",
            rationale: {
                correct: "ACE inhibitors (and ARBs) are specifically preferred for diabetic patients with proteinuria because they dilate the efferent arteriole of the glomerulus, reducing intraglomerular pressure. This decreases proteinuria and slows the progression of diabetic nephropathy. This is a \"compelling indication\" - a specific comorbidity that makes one drug class clearly preferred over others.",
                a: "ACE inhibitors are not necessarily the most potent BP-lowering agents. Their selection is based on specific organ-protective benefits, not BP-lowering potency alone.",
                c: "ACE inhibitors do not lower blood glucose. They are chosen for kidney protection, not glucose management.",
                d: "ACE inhibitors have significant side effects including dry cough (10-20%), hyperkalemia, and angioedema. They are not chosen because they have fewer side effects."
            },
            testTakingTip: "Know the \"compelling indications\": Diabetes with proteinuria = ACE-I/ARB. Heart failure = ACE-I + beta-blocker. Post-MI = ACE-I + beta-blocker. CKD = ACE-I/ARB. The NCLEX frequently tests why a specific drug class is preferred for a specific comorbidity.",
            guideSection: "Section 7 - Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient taking lisinopril for 3 months reports developing a persistent, dry, nonproductive cough that is interfering with sleep. What should the nurse anticipate the provider will do?",
            options: [
                { id: "a", text: "Add a cough suppressant and continue lisinopril" },
                { id: "b", text: "Discontinue lisinopril and switch to an ARB such as losartan" },
                { id: "c", text: "Increase the lisinopril dose since the cough indicates subtherapeutic levels" },
                { id: "d", text: "Discontinue lisinopril and switch to a beta-blocker" }
            ],
            correct: "b",
            rationale: {
                correct: "Dry cough is the most common side effect of ACE inhibitors, occurring in 10-20% of patients. It is caused by bradykinin accumulation (ACE normally breaks down bradykinin). The standard approach is to discontinue the ACE inhibitor and switch to an ARB, which provides similar benefits (RAAS blockade, renoprotection) without causing cough because ARBs do not affect bradykinin metabolism.",
                a: "The ACE-I cough is caused by bradykinin accumulation, not an infection or irritant. Cough suppressants will not resolve the underlying mechanism, and continuing the offending drug is inappropriate.",
                c: "The cough is a side effect, not an indication of a subtherapeutic dose. Increasing the dose would likely worsen the cough.",
                d: "While beta-blockers are antihypertensives, they do not provide the same renoprotective benefits as RAAS blockers. An ARB is the preferred switch because it maintains the same class of RAAS blockade."
            },
            testTakingTip: "ACE inhibitor cough \u2192 switch to ARB. This is one of the most commonly tested pharmacology concepts. Also remember: both ACE-I and ARBs are contraindicated in pregnancy and carry a risk of hyperkalemia and angioedema.",
            guideSection: "Section 7 - Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient arrives at the emergency department with a blood pressure of 210/130 mmHg, severe headache, confusion, blurred vision, and nausea. Serum creatinine is acutely elevated from baseline. The provider diagnoses hypertensive emergency and starts an IV antihypertensive infusion. What is the nurse\u2019s blood pressure reduction goal for the FIRST hour?",
            options: [
                { id: "a", text: "Reduce the blood pressure to normal (< 120/80 mmHg) within 1 hour" },
                { id: "b", text: "Reduce the mean arterial pressure by no more than 25% in the first hour" },
                { id: "c", text: "Reduce the systolic blood pressure to < 140 mmHg within 1 hour" },
                { id: "d", text: "Reduce the diastolic blood pressure to < 90 mmHg within 30 minutes" }
            ],
            correct: "b",
            rationale: {
                correct: "In hypertensive emergency, the MAP should be reduced by no more than 25% in the first hour, then gradually toward 160/100 over the next 2-6 hours, then to normal over 24-48 hours. Rapid BP reduction is dangerous because the brain, heart, and kidneys have adapted to chronic high pressures. Dropping BP too fast can cause ischemic stroke, MI, or acute renal failure due to impaired autoregulation.",
                a: "Normalizing BP within 1 hour is dangerously rapid. The organs adapted to higher perfusion pressures cannot autoregulate when BP drops suddenly to normal levels.",
                c: "Reducing SBP to < 140 in 1 hour is too aggressive for most patients. This degree of reduction could cause watershed infarctions in the brain.",
                d: "Targeting DBP < 90 within 30 minutes is far too rapid and could cause organ ischemia. The exception is aortic dissection, which requires rapid SBP reduction to < 120 within 20 minutes."
            },
            testTakingTip: "Hypertensive emergency = gradual reduction. 25% MAP drop in the first hour, then slow. The one exception: aortic dissection requires rapid reduction to SBP < 120 in 20 minutes. If the NCLEX asks about \"too fast\" BP reduction, the danger is organ ischemia from loss of autoregulation.",
            guideSection: "Section 8 - Hypertensive Crisis",
            guideSectionId: "crisis"
        },
        {
            id: 7,
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient arrives at the emergency department with a blood pressure of 230/130 mmHg, severe headache, blurred vision, and chest pain. Place the nursing actions in priority order.",
            options: [
                { id: "a", text: "Assess for end-organ damage - perform a focused neurological check and place on cardiac monitor" },
                { id: "b", text: "Establish IV access with a large-bore catheter" },
                { id: "c", text: "Administer IV antihypertensive (e.g., nicardipine or labetalol drip) per protocol" },
                { id: "d", text: "Initiate continuous blood pressure monitoring every 5\u201315 minutes" },
                { id: "e", text: "Obtain stat laboratory studies including troponin, BMP, and urinalysis" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence prioritizes rapid assessment, then intervention, then ongoing monitoring and diagnostics. First assess for end-organ damage, then establish vascular access, administer antihypertensive, monitor response, and obtain labs.",
                a: "FIRST - Assessing for end-organ damage determines the urgency and type of intervention. A quick neuro check and cardiac monitoring identify stroke, MI, or aortic dissection.",
                b: "SECOND - IV access must be established before IV medications can be administered. A large-bore catheter allows rapid infusion of antihypertensive drips.",
                c: "THIRD - Once IV access is secured, administer the IV antihypertensive per protocol. The goal is to reduce MAP by no more than 25% in the first hour.",
                d: "FOURTH - Continuous BP monitoring every 5\u201315 minutes evaluates the response and prevents overly rapid reduction, which could cause organ ischemia.",
                e: "FIFTH - Stat labs help identify end-organ damage extent and guide ongoing management."
            },
            testTakingTip: "In hypertensive emergency: ASSESS \u2192 ACCESS \u2192 ACT \u2192 MONITOR \u2192 LABS. The exception: aortic dissection requires SBP <120 in 20 min vs. the standard 25% MAP reduction in 1 hour.",
            guideSection: "Section 8 - Hypertensive Crisis",
            guideSectionId: "crisis"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with hypertension is taking hydrochlorothiazide (HCTZ) 25 mg daily and lisinopril 20 mg daily. The patient reports dizziness when standing up from a chair. Lying BP is 128/78, sitting BP is 118/72, and standing BP is 94/60 with a heart rate increase from 72 to 96 bpm. What is the nurse\u2019s interpretation?",
            options: [
                { id: "a", text: "The patient\u2019s hypertension is adequately controlled and no changes are needed" },
                { id: "b", text: "The patient has orthostatic hypotension, likely related to antihypertensive medication effects" },
                { id: "c", text: "The dizziness is caused by hyperkalemia from the lisinopril" },
                { id: "d", text: "The standing blood pressure is normal and the symptoms are unrelated to the medications" }
            ],
            correct: "b",
            rationale: {
                correct: "Orthostatic hypotension is defined as a drop of \u2265 20 mmHg systolic OR \u2265 10 mmHg diastolic upon standing. This patient\u2019s SBP dropped 34 mmHg (128 to 94) and DBP dropped 18 mmHg (78 to 60) from lying to standing, with compensatory tachycardia (72 to 96). The combination of a thiazide diuretic (causes volume depletion) and an ACE inhibitor (vasodilation) makes this a medication-related orthostatic hypotension. The provider should be notified for possible dose adjustment.",
                a: "While the lying and sitting BPs are in target range, a standing SBP of 94 with symptoms is clinically significant and increases fall risk. The medications need adjustment.",
                c: "While lisinopril can cause hyperkalemia, the clinical picture clearly points to orthostatic hypotension (positional BP drop with compensatory tachycardia), not a potassium imbalance.",
                d: "A SBP of 94 with symptoms (dizziness) and a > 20 mmHg drop from baseline is abnormal. The symptoms are directly correlated with the positional BP change."
            },
            testTakingTip: "Orthostatic hypotension criteria: drop of \u2265 20 SBP or \u2265 10 DBP from lying to standing. Always check orthostatic vitals in patients on antihypertensives, especially those on diuretics or vasodilators. Teach patients to change positions slowly and sit on the edge of the bed before standing.",
            guideSection: "Section 5 - Nursing Assessment",
            guideSectionId: "assessment"
        }
    ]
};
