/**
 * Hypertension Quiz — Question Data
 * Extracted from guides/hypertension.html practice questions section.
 * 8 NCLEX-style questions: 5 Single Best Answer, 2 SATA, 1 Priority
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
            testTakingTip: "When systolic and diastolic fall in different categories, ALWAYS classify by the higher one. This is a common NCLEX trap \u2014 don\u2019t average them or go with the \"lower\" category. Also remember: diagnosis requires 2+ readings on 2+ separate occasions.",
            guideSection: "Section 2 \u2014 Blood Pressure Classification",
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
            guideSection: "Section 2 \u2014 Blood Pressure Classification",
            guideSectionId: "classification"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A patient with newly diagnosed Stage 1 hypertension asks the nurse about lifestyle modifications. Which recommendations should the nurse include? Select all that apply.",
            options: [
                { id: "a", text: "Follow the DASH diet rich in fruits, vegetables, and low-fat dairy" },
                { id: "b", text: "Restrict sodium intake to less than 2,300 mg per day" },
                { id: "c", text: "Engage in 90-150 minutes of aerobic exercise per week" },
                { id: "d", text: "Eliminate all caffeine permanently" },
                { id: "e", text: "Limit alcohol to 2 or fewer drinks per day for men, 1 for women" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Combined lifestyle modifications can lower SBP by 20+ mmHg \u2014 as effective as many medications! For Stage 1 HTN without high cardiovascular risk, guidelines recommend 3-6 months of lifestyle modifications alone before adding medication.",
                a: "CORRECT \u2014 The DASH diet alone can reduce SBP by approximately 11 mmHg. It emphasizes fruits, vegetables, whole grains, and low-fat dairy while limiting saturated fat.",
                b: "CORRECT \u2014 Sodium restriction to < 2,300 mg/day (ideally < 1,500 mg/day) can reduce SBP by 5-6 mmHg.",
                c: "CORRECT \u2014 Regular aerobic exercise (90-150 min/week) can reduce SBP by 5-8 mmHg.",
                d: "INCORRECT \u2014 Complete caffeine elimination is not a standard recommendation. While patients should avoid excessive caffeine and not consume it before BP measurements, moderate caffeine intake is generally acceptable.",
                e: "CORRECT \u2014 Alcohol moderation (\u2264 2 drinks/day for men, \u2264 1 for women) can reduce SBP by approximately 4 mmHg."
            },
            testTakingTip: "Combined lifestyle modifications can lower SBP by 20+ mmHg \u2014 as effective as many medications! For Stage 1 HTN without high cardiovascular risk, guidelines recommend 3-6 months of lifestyle modifications alone before adding medication.",
            guideSection: "Section 6 \u2014 Lifestyle Modifications",
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
                correct: "ACE inhibitors (and ARBs) are specifically preferred for diabetic patients with proteinuria because they dilate the efferent arteriole of the glomerulus, reducing intraglomerular pressure. This decreases proteinuria and slows the progression of diabetic nephropathy. This is a \"compelling indication\" \u2014 a specific comorbidity that makes one drug class clearly preferred over others.",
                a: "ACE inhibitors are not necessarily the most potent BP-lowering agents. Their selection is based on specific organ-protective benefits, not BP-lowering potency alone.",
                c: "ACE inhibitors do not lower blood glucose. They are chosen for kidney protection, not glucose management.",
                d: "ACE inhibitors have significant side effects including dry cough (10-20%), hyperkalemia, and angioedema. They are not chosen because they have fewer side effects."
            },
            testTakingTip: "Know the \"compelling indications\": Diabetes with proteinuria = ACE-I/ARB. Heart failure = ACE-I + beta-blocker. Post-MI = ACE-I + beta-blocker. CKD = ACE-I/ARB. The NCLEX frequently tests why a specific drug class is preferred for a specific comorbidity.",
            guideSection: "Section 7 \u2014 Pharmacological Management",
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
            guideSection: "Section 7 \u2014 Pharmacological Management",
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
            guideSection: "Section 8 \u2014 Hypertensive Crisis",
            guideSectionId: "crisis"
        },
        {
            id: 7,
            type: "sata",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is assessing a 28-year-old patient with a BP of 186/110 mmHg who is resistant to three antihypertensive medications. Which findings would suggest secondary hypertension? Select all that apply.",
            options: [
                { id: "a", text: "Unexplained hypokalemia" },
                { id: "b", text: "Family history of hypertension" },
                { id: "c", text: "Episodic severe headaches with diaphoresis and palpitations" },
                { id: "d", text: "Sedentary lifestyle with high sodium diet" },
                { id: "e", text: "Abdominal bruit on auscultation" }
            ],
            correct: ["a", "c", "e"],
            rationale: {
                correct: "Young age, treatment-resistant HTN, and specific clinical findings all point to secondary hypertension, which has an identifiable underlying cause.",
                a: "CORRECT \u2014 Unexplained hypokalemia suggests hyperaldosteronism (Conn\u2019s syndrome). Excess aldosterone causes sodium and water retention (increasing BP) while promoting potassium excretion.",
                b: "INCORRECT \u2014 Family history of hypertension is a risk factor for primary (essential) hypertension, which accounts for 90-95% of cases. It does not suggest a secondary cause.",
                c: "CORRECT \u2014 Episodic headaches, diaphoresis, and palpitations with BP spikes are the classic triad of pheochromocytoma \u2014 a catecholamine-secreting adrenal tumor. This is a secondary cause of hypertension.",
                d: "INCORRECT \u2014 Sedentary lifestyle and high sodium diet are modifiable risk factors for primary hypertension, not indicators of a secondary cause.",
                e: "CORRECT \u2014 An abdominal bruit suggests renal artery stenosis, which causes renovascular hypertension. The narrowed renal artery triggers RAAS activation, driving up blood pressure. This is one of the most common secondary causes."
            },
            testTakingTip: "Suspect secondary HTN when the patient is young (< 30), has sudden-onset severe HTN, or is resistant to 3+ medications. Key red flags: unexplained hypokalemia (hyperaldosteronism), episodic symptoms triad (pheochromocytoma), abdominal bruit (renal artery stenosis).",
            guideSection: "Section 3 \u2014 Primary vs Secondary HTN",
            guideSectionId: "types"
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
            guideSection: "Section 5 \u2014 Nursing Assessment",
            guideSectionId: "assessment"
        }
    ]
};
