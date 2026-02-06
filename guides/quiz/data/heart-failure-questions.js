/**
 * Heart Failure Quiz — Question Data
 * Extracted from guides/heart-failure.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 SATA, 2 Priority
 */

/* exported heartFailureQuizData */
var heartFailureQuizData = {
    guideName: "Heart Failure",
    guideSlug: "heart-failure",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient admitted with heart failure. The patient reports increasing shortness of breath when lying flat and needing three pillows to sleep. Lung auscultation reveals bilateral crackles. Jugular veins are flat, and there is no peripheral edema. Which type of heart failure is this patient most likely experiencing?",
            options: [
                { id: "a", text: "Right-sided heart failure" },
                { id: "b", text: "Left-sided heart failure" },
                { id: "c", text: "Biventricular heart failure" },
                { id: "d", text: "Cor pulmonale" }
            ],
            correct: "b",
            rationale: {
                correct: "Left-sided heart failure causes blood to back up into the pulmonary system. Orthopnea (needing pillows to sleep upright), dyspnea, and bilateral crackles are hallmark pulmonary congestion signs. The absence of JVD and peripheral edema rules out significant right-sided involvement.",
                a: "Right-sided HF presents with systemic congestion \u2014 JVD, peripheral edema, hepatomegaly \u2014 which this patient lacks.",
                c: "Biventricular failure would include both pulmonary AND systemic signs. This patient has no right-sided symptoms.",
                d: "Cor pulmonale is right-sided HF caused by pulmonary disease. It would present with JVD and edema, not primarily pulmonary symptoms."
            },
            testTakingTip: "Remember: Left = Lung symptoms. Right = Rest of the body. Match the symptoms to the side.",
            guideSection: "Section 3 \u2014 Left-Sided vs Right-Sided Heart Failure",
            guideSectionId: "left-vs-right"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with chronic heart failure calls the nurse hotline and reports a weight gain of 3 pounds since yesterday. The patient denies chest pain or severe shortness of breath but notes mild ankle swelling. What should the nurse instruct the patient to do FIRST?",
            options: [
                { id: "a", text: "Go to the emergency department immediately" },
                { id: "b", text: "Restrict fluid intake to 1 liter for the rest of the day" },
                { id: "c", text: "Contact the health care provider to report the weight gain" },
                { id: "d", text: "Elevate the legs and reweigh in the morning" }
            ],
            correct: "c",
            rationale: {
                correct: "A weight gain of more than 2 lbs (1 kg) in 24 hours indicates fluid retention and worsening heart failure. The provider needs to be notified so diuretic dosing or other management can be adjusted promptly. This is within the \"report immediately\" threshold.",
                a: "The patient has no acute distress (no chest pain, no severe dyspnea). The ED is not indicated for gradual fluid retention without emergency symptoms.",
                b: "While fluid restriction is part of HF management, the nurse should not independently change the fluid restriction without a provider order. The weight gain threshold has been met and requires provider notification.",
                d: "Waiting until morning delays intervention. A 3-lb gain in 24 hours exceeds the 2-lb threshold and requires same-day provider communication."
            },
            testTakingTip: "Know the weight thresholds: gain of >2 lbs/day OR >5 lbs/week = notify provider. When the NCLEX asks what to do \"first,\" look for the answer that addresses the immediate clinical concern without overreacting or underreacting.",
            guideSection: "Section 5 \u2014 Nursing Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A patient is admitted with acute decompensated heart failure. The nurse anticipates which of the following interventions?",
            options: [
                { id: "a", text: "Place the patient in high Fowler\u2019s position" },
                { id: "b", text: "Administer IV furosemide (Lasix) as ordered" },
                { id: "c", text: "Encourage high-sodium foods to increase blood volume" },
                { id: "d", text: "Administer supplemental oxygen to maintain SpO2 > 94%" },
                { id: "e", text: "Administer nitroglycerin as ordered to reduce preload" },
                { id: "f", text: "Encourage ambulation to improve circulation" }
            ],
            correct: ["a", "b", "d", "e"],
            rationale: {
                correct: "The LMNOP mnemonic for acute decompensated HF covers Lasix, Morphine, Nitrates, Oxygen, and Position (high Fowler\u2019s). Every correct answer maps to a letter in this mnemonic.",
                a: "CORRECT \u2014 High Fowler\u2019s position reduces venous return (preload) and improves lung expansion. This is the \"P\" in the LMNOP mnemonic (Position).",
                b: "CORRECT \u2014 IV loop diuretics are the first-line treatment for acute fluid overload. IV furosemide removes excess fluid rapidly.",
                c: "INCORRECT \u2014 Sodium restriction (2-3 g/day) is essential in HF. High-sodium foods worsen fluid retention and congestion.",
                d: "CORRECT \u2014 Oxygen therapy addresses hypoxia from pulmonary congestion. The \"O\" in LMNOP.",
                e: "CORRECT \u2014 Nitroglycerin reduces preload through venodilation, decreasing pulmonary congestion. The \"N\" in LMNOP.",
                f: "INCORRECT \u2014 During acute decompensation, activity increases myocardial oxygen demand. Bed rest with clustered care is appropriate during the acute phase."
            },
            testTakingTip: "For acute decompensated HF, remember LMNOP: Lasix, Morphine, Nitrates, Oxygen, Position. Every correct answer in this question maps to a letter in the mnemonic.",
            guideSection: "Section 6 \u2014 Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with heart failure has an echocardiogram showing an ejection fraction of 30%. The patient is experiencing fatigue and dyspnea on exertion. Which classification of heart failure does this patient have?",
            options: [
                { id: "a", text: "Heart failure with preserved ejection fraction (HFpEF)" },
                { id: "b", text: "Heart failure with reduced ejection fraction (HFrEF)" },
                { id: "c", text: "Heart failure with mildly reduced ejection fraction (HFmrEF)" },
                { id: "d", text: "Compensated heart failure" }
            ],
            correct: "b",
            rationale: {
                correct: "HFrEF (systolic dysfunction) is defined by an EF < 40%. An EF of 30% means the ventricle cannot contract effectively \u2014 it is weak and dilated. This is the \"reduced\" category.",
                a: "HFpEF has an EF \u2265 50%. The heart contracts normally but cannot relax and fill properly (diastolic dysfunction).",
                c: "HFmrEF (midrange) has an EF of 41-49%. This patient\u2019s EF of 30% is below that range.",
                d: "\"Compensated heart failure\" describes a functional status (symptoms controlled), not an EF classification. This patient has active symptoms."
            },
            testTakingTip: "Know the EF cutoffs: <40% = HFrEF (reduced), 41-49% = HFmrEF (midrange), \u226550% = HFpEF (preserved). Don\u2019t be tricked by a \"normal\" EF \u2014 HFpEF patients still have heart failure!",
            labValues: [
                { name: "Ejection Fraction (EF)", normal: "55\u201370%" }
            ],
            guideSection: "Section 4 \u2014 Systolic vs Diastolic Dysfunction",
            guideSectionId: "systolic-diastolic"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with HFrEF is taking furosemide 40 mg daily and lisinopril 10 mg daily. Today\u2019s lab results show: Potassium 3.2 mEq/L, BUN 28 mg/dL, Creatinine 1.4 mg/dL. Digoxin level is 1.8 ng/mL. Which lab value is the nurse MOST concerned about?",
            labValues: [
                { name: "Potassium (K+)", normal: "3.5\u20135.0 mEq/L" },
                { name: "BUN", normal: "10\u201320 mg/dL" },
                { name: "Creatinine", normal: "0.7\u20131.3 mg/dL" },
                { name: "Digoxin", normal: "0.5\u20132.0 ng/mL" }
            ],
            options: [
                { id: "a", text: "BUN of 28 mg/dL" },
                { id: "b", text: "Creatinine of 1.4 mg/dL" },
                { id: "c", text: "Potassium of 3.2 mEq/L" },
                { id: "d", text: "Digoxin level of 1.8 ng/mL" }
            ],
            correct: "c",
            rationale: {
                correct: "A potassium of 3.2 mEq/L is critically concerning because this patient is also taking digoxin. Hypokalemia significantly increases the risk of digoxin toxicity, which can cause life-threatening arrhythmias. The furosemide (loop diuretic) is causing potassium loss, and the low K+ makes digoxin bind more effectively to cardiac cells, amplifying its toxic effects.",
                a: "BUN of 28 is slightly elevated but not immediately dangerous. It may reflect mild dehydration from diuretic therapy.",
                b: "Creatinine of 1.4 is mildly elevated and worth monitoring, but not the most urgent concern given the digoxin-potassium interaction.",
                d: "Digoxin of 1.8 ng/mL is within the therapeutic range (0.5-2.0 ng/mL), but combined with hypokalemia, even a therapeutic level can produce toxicity."
            },
            testTakingTip: "When a patient takes digoxin, ALWAYS look at the potassium level first. Low potassium + digoxin = toxicity risk, even when the digoxin level appears \"normal.\" This is a classic NCLEX trap.",
            guideSection: "Section 7 \u2014 Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 6,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is providing discharge teaching to a patient with chronic heart failure. Which statements by the patient indicate correct understanding?",
            options: [
                { id: "a", text: "\"I will weigh myself every morning before breakfast using the same scale.\"" },
                { id: "b", text: "\"I should call my doctor if I gain more than 5 pounds in one day.\"" },
                { id: "c", text: "\"I need to avoid taking ibuprofen for my arthritis pain.\"" },
                { id: "d", text: "\"I can use salt substitutes freely since I need to limit sodium.\"" },
                { id: "e", text: "\"I should take my furosemide in the morning to avoid nighttime urination.\"" }
            ],
            correct: ["a", "c", "e"],
            rationale: {
                correct: "Correct understanding includes daily morning weights on the same scale, avoiding NSAIDs, and taking diuretics in the morning to prevent nocturia.",
                a: "CORRECT \u2014 Daily weights at the same time, on the same scale, in similar clothing is the most sensitive indicator of fluid retention. Morning before breakfast is the standard timing.",
                b: "INCORRECT \u2014 The threshold is 2 lbs in one day or 5 lbs in one week, not 5 lbs in one day. A 5-lb gain in a single day would be a medical emergency.",
                c: "CORRECT \u2014 NSAIDs (ibuprofen, naproxen) cause sodium and water retention AND reduce the effectiveness of ACE inhibitors and diuretics. HF patients should avoid them.",
                d: "INCORRECT \u2014 Many salt substitutes contain potassium chloride. Patients taking ACE inhibitors or ARBs are already at risk for hyperkalemia, so using potassium-based salt substitutes could push K+ to dangerous levels.",
                e: "CORRECT \u2014 Taking diuretics in the morning prevents nocturia and promotes daytime diuresis when the patient is active and near the bathroom."
            },
            testTakingTip: "For SATA questions, evaluate each option independently as true or false. Don\u2019t let one \"obviously correct\" answer make you rush through the others. The salt substitute trap (potassium + ACE inhibitor) is a high-yield NCLEX concept.",
            guideSection: "Section 7 \u2014 Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a patient with heart failure who is receiving IV furosemide. The patient suddenly becomes confused, reports muscle cramps, and the cardiac monitor shows a new irregular rhythm with prominent U waves. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Administer a second dose of furosemide" },
                { id: "b", text: "Obtain a stat potassium level" },
                { id: "c", text: "Perform a 12-lead ECG" },
                { id: "d", text: "Notify the rapid response team" }
            ],
            correct: "b",
            rationale: {
                correct: "The clinical picture \u2014 confusion, muscle cramps, new irregular rhythm, and U waves on the monitor \u2014 is classic hypokalemia. The IV furosemide is causing excessive potassium loss. Obtaining a stat potassium level confirms the suspected electrolyte imbalance and guides the urgency of replacement. This is a \"collect data\" before \"intervene\" situation.",
                a: "Giving more furosemide would worsen potassium depletion. This is the opposite of what\u2019s needed.",
                c: "A 12-lead ECG would provide more information about the arrhythmia but does not address the underlying electrolyte problem. The telemetry already shows the rhythm change.",
                d: "The rapid response team may be needed, but the nurse should first collect the critical data (potassium level) that will guide the team\u2019s interventions. The patient is not in immediate cardiac arrest."
            },
            testTakingTip: "U waves = think hyoUkalemia. When the NCLEX presents symptoms + a likely cause, the first step is usually to confirm with a diagnostic test before escalating care.",
            labValues: [
                { name: "Potassium (K+)", normal: "3.5\u20135.0 mEq/L" }
            ],
            guideSection: "Section 7 \u2014 Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with HFrEF is being started on carvedilol (Coreg). The nurse knows that the provider prescribed a very low initial dose with plans to increase gradually over several weeks. Which statement BEST explains this approach?",
            options: [
                { id: "a", text: "Beta-blockers can initially worsen heart failure symptoms before providing long-term benefit" },
                { id: "b", text: "The patient must first demonstrate tolerance to ACE inhibitors before starting a beta-blocker" },
                { id: "c", text: "High doses of beta-blockers cause irreversible liver damage in heart failure patients" },
                { id: "d", text: "Carvedilol must be titrated to match the patient\u2019s digoxin level" }
            ],
            correct: "a",
            rationale: {
                correct: "Beta-blockers reduce heart rate and contractility, which can initially worsen HF symptoms (increased fatigue, fluid retention, hypotension). However, long-term use improves survival by reducing myocardial remodeling and oxygen demand. The \"start low, go slow\" principle is critical \u2014 doses are increased every 2 weeks as tolerated.",
                b: "While ACE inhibitors are often started first, the slow beta-blocker titration is due to the drug\u2019s own hemodynamic effects, not a prerequisite relationship with ACE inhibitors.",
                c: "Beta-blockers do not cause irreversible liver damage. Hepatotoxicity is rare and not the reason for slow titration.",
                d: "Carvedilol dosing is independent of digoxin levels. They are separate medications with different titration guidelines."
            },
            testTakingTip: "\"Start low, go slow\" for beta-blockers in HF. They improve long-term survival but can transiently worsen symptoms. Also remember: never stop beta-blockers abruptly \u2014 taper gradually to avoid rebound tachycardia.",
            guideSection: "Section 7 \u2014 Pharmacological Management",
            guideSectionId: "medications"
        }
    ]
};
