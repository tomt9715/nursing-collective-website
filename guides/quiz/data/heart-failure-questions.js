/**
 * Heart Failure Quiz - Question Data
 * Extracted from guides/heart-failure.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Ordering, 1 Matrix
 */

/* exported heartFailureQuizData */
var heartFailureQuizData = {
    guideName: "Heart Failure",
    guideSlug: "heart-failure",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 20,
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
                correct: "Left-sided heart failure causes blood to back up into the pulmonary system. Orthopnea (needing pillows to sleep upright), dyspnea, and bilateral crackles are hallmark pulmonary congestion signs. The absence of jugular venous distension (JVD) and peripheral edema rules out significant right-sided involvement.",
                a: "Right-sided heart failure (HF) presents with systemic congestion - jugular venous distension (JVD), peripheral edema, hepatomegaly - which this patient lacks.",
                c: "Biventricular failure would include both pulmonary AND systemic signs. This patient has no right-sided symptoms.",
                d: "Cor pulmonale is right-sided heart failure (HF) caused by pulmonary disease. It would present with jugular venous distension (JVD) and edema, not primarily pulmonary symptoms."
            },
            testTakingTip: "Remember: Left = Lung symptoms. Right = Rest of the body. Match the symptoms to the side.",
            guideSection: "Section 3 - Left-Sided vs Right-Sided Heart Failure",
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
                b: "While fluid restriction is part of heart failure (HF) management, the nurse should not independently change the fluid restriction without a provider order. The weight gain threshold has been met and requires provider notification.",
                d: "Waiting until morning delays intervention. A 3-lb gain in 24 hours exceeds the 2-lb threshold and requires same-day provider communication."
            },
            testTakingTip: "Know the weight thresholds: gain of >2 lbs/day OR >5 lbs/week = notify provider. When the NCLEX asks what to do \"first,\" look for the answer that addresses the immediate clinical concern without overreacting or underreacting.",
            guideSection: "Section 5 - Nursing Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 3,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient arrives in the ED with acute decompensated heart failure - severe dyspnea, crackles throughout all lung fields, SpO2 84%, and BP 158/96 mmHg. Place the following nursing interventions in priority order.",
            options: [
                { id: "a", text: "Position the patient upright (high Fowler\u2019s position)" },
                { id: "b", text: "Apply high-flow supplemental oxygen" },
                { id: "c", text: "Obtain IV access and administer IV furosemide as ordered" },
                { id: "d", text: "Obtain a 12-lead ECG" },
                { id: "e", text: "Notify the provider and obtain further orders" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence follows airway, breathing, circulation (ABCs) and immediate stabilization: position upright to reduce preload and improve breathing, oxygenate the hypoxic patient, establish access and begin diuresis, obtain diagnostic data, then communicate with the provider for ongoing management.",
                a: "FIRST - Positioning the patient upright is the fastest intervention a nurse can perform independently. High Fowler\u2019s reduces venous return (preload), decreases pulmonary congestion, and improves diaphragm excursion.",
                b: "SECOND - SpO2 of 84% is critically low and must be addressed immediately after positioning. Supplemental oxygen corrects life-threatening hypoxia.",
                c: "THIRD - IV access is needed for medication administration. IV furosemide is the first-line drug for acute fluid overload and begins removing excess fluid from the pulmonary vasculature.",
                d: "FOURTH - A 12-lead ECG identifies whether an acute cardiac event, such as a myocardial infarction (MI) or arrhythmia, triggered the decompensation. This is essential diagnostic data but comes after life-saving interventions are initiated.",
                e: "FIFTH - After stabilizing interventions are underway and initial data is gathered, the nurse notifies the provider with a complete Situation, Background, Assessment, Recommendation (SBAR) report to obtain orders for ongoing management."
            },
            testTakingTip: "For ordering questions, think airway, breathing, circulation (ABCs) first: Airway/positioning, then Breathing/oxygen, then Circulation/medications. Quick independent nursing actions (positioning, O2) come before actions requiring orders or equipment setup.",
            guideSection: "Section 6 - Priority Nursing Interventions",
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
                correct: "Heart failure with reduced ejection fraction (HFrEF), or systolic dysfunction, is defined by an ejection fraction (EF) < 40%. An EF of 30% means the ventricle cannot contract effectively - it is weak and dilated. This is the \"reduced\" category.",
                a: "Heart failure with preserved ejection fraction (HFpEF) has an ejection fraction (EF) \u2265 50%. The heart contracts normally but cannot relax and fill properly (diastolic dysfunction).",
                c: "Heart failure with midrange ejection fraction (HFmrEF) has an ejection fraction (EF) of 41-49%. This patient\u2019s EF of 30% is below that range.",
                d: "\"Compensated heart failure\" describes a functional status (symptoms controlled), not an ejection fraction (EF) classification. This patient has active symptoms."
            },
            testTakingTip: "Know the ejection fraction (EF) cutoffs: <40% = heart failure with reduced ejection fraction (HFrEF), 41-49% = heart failure with midrange ejection fraction (HFmrEF), \u226550% = heart failure with preserved ejection fraction (HFpEF). Don\u2019t be tricked by a \"normal\" EF - HFpEF patients still have heart failure!",
            labValues: [
                { name: "Ejection Fraction (EF)", normal: "55\u201370%" }
            ],
            guideSection: "Section 4 - Systolic vs Diastolic Dysfunction",
            guideSectionId: "systolic-diastolic"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with heart failure with reduced ejection fraction (HFrEF) is taking furosemide 40 mg daily and lisinopril 10 mg daily. Today\u2019s lab results show: Potassium 3.2 mEq/L, blood urea nitrogen (BUN) 28 mg/dL, Creatinine 1.4 mg/dL. Digoxin level is 1.8 ng/mL. Which lab value is the nurse MOST concerned about?",
            labValues: [
                { name: "Potassium (K+)", normal: "3.5\u20135.0 mEq/L" },
                { name: "BUN", normal: "10\u201320 mg/dL" },
                { name: "Creatinine", normal: "0.7\u20131.3 mg/dL" },
                { name: "Digoxin", normal: "0.5\u20132.0 ng/mL" }
            ],
            options: [
                { id: "a", text: "Blood urea nitrogen (BUN) of 28 mg/dL" },
                { id: "b", text: "Creatinine of 1.4 mg/dL" },
                { id: "c", text: "Potassium of 3.2 mEq/L" },
                { id: "d", text: "Digoxin level of 1.8 ng/mL" }
            ],
            correct: "c",
            rationale: {
                correct: "A potassium of 3.2 mEq/L is critically concerning because this patient is also taking digoxin. Hypokalemia significantly increases the risk of digoxin toxicity, which can cause life-threatening arrhythmias. The furosemide (loop diuretic) is causing potassium loss, and the low K+ makes digoxin bind more effectively to cardiac cells, amplifying its toxic effects.",
                a: "Blood urea nitrogen (BUN) of 28 is slightly elevated but not immediately dangerous. It may reflect mild dehydration from diuretic therapy.",
                b: "Creatinine of 1.4 is mildly elevated and worth monitoring, but not the most urgent concern given the digoxin-potassium interaction.",
                d: "Digoxin of 1.8 ng/mL is within the therapeutic range (0.5-2.0 ng/mL), but combined with hypokalemia, even a therapeutic level can produce toxicity."
            },
            testTakingTip: "When a patient takes digoxin, ALWAYS look at the potassium level first. Low potassium + digoxin = toxicity risk, even when the digoxin level appears \"normal.\" This is a classic NCLEX trap.",
            guideSection: "Section 7 - Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "A nurse is evaluating a heart failure patient\u2019s understanding of discharge instructions. For each patient statement, indicate whether it demonstrates correct understanding or needs more teaching.",
            options: [
                { id: "a", text: "\"I weigh myself every morning before breakfast on the same scale and write it down.\"" },
                { id: "b", text: "\"I stopped taking my lisinopril because I feel fine now and my blood pressure is normal.\"" },
                { id: "c", text: "\"I limit my fluids to what my doctor recommended and I measure my intake each day.\"" },
                { id: "d", text: "\"I rest all day and avoid any physical activity so I don\u2019t stress my heart.\"" }
            ],
            correct: { a: "Correct Understanding", b: "Needs More Teaching", c: "Correct Understanding", d: "Needs More Teaching" },
            rationale: {
                correct: "Daily weights and fluid restriction adherence demonstrate proper self-management. Stopping medications independently and complete avoidance of activity are dangerous misconceptions requiring re-education.",
                a: "CORRECT UNDERSTANDING - Daily weights at the same time, on the same scale, in similar clothing is the gold standard for monitoring fluid retention. A gain of >2 lbs/day or >5 lbs/week = call provider.",
                b: "NEEDS MORE TEACHING - Angiotensin-converting enzyme (ACE) inhibitors like lisinopril are taken for life in heart failure (HF), regardless of how the patient feels. They reduce afterload, prevent cardiac remodeling, and improve survival. The medication IS the reason the patient feels better.",
                c: "CORRECT UNDERSTANDING - Fluid restriction (typically 1.5\u20132 L/day) reduces cardiac workload and prevents fluid overload. Measuring daily intake shows active engagement with the treatment plan.",
                d: "NEEDS MORE TEACHING - While patients should avoid overexertion, moderate physical activity (walking, cardiac rehab) is recommended for stable heart failure (HF) patients. Complete bed rest leads to deconditioning, muscle wasting, and deep vein thrombosis (DVT) risk."
            },
            testTakingTip: "Watch for two common heart failure (HF) misconceptions: (1) stopping medications when feeling better, and (2) complete activity avoidance. Both are \"needs more teaching\" red flags on the NCLEX.",
            guideSection: "Section 7 - Pharmacological Management",
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
                correct: "The clinical picture - confusion, muscle cramps, new irregular rhythm, and U waves on the monitor - is classic hypokalemia. The IV furosemide is causing excessive potassium loss. Obtaining a stat potassium level confirms the suspected electrolyte imbalance and guides the urgency of replacement. This is a \"collect data\" before \"intervene\" situation.",
                a: "Giving more furosemide would worsen potassium depletion. This is the opposite of what\u2019s needed.",
                c: "A 12-lead ECG would provide more information about the arrhythmia but does not address the underlying electrolyte problem. The telemetry already shows the rhythm change.",
                d: "The rapid response team may be needed, but the nurse should first collect the critical data (potassium level) that will guide the team\u2019s interventions. The patient is not in immediate cardiac arrest."
            },
            testTakingTip: "U waves = think hyoUkalemia. When the NCLEX presents symptoms + a likely cause, the first step is usually to confirm with a diagnostic test before escalating care.",
            labValues: [
                { name: "Potassium (K+)", normal: "3.5\u20135.0 mEq/L" }
            ],
            guideSection: "Section 7 - Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with heart failure with reduced ejection fraction (HFrEF) is being started on carvedilol (Coreg). The nurse knows that the provider prescribed a very low initial dose with plans to increase gradually over several weeks. Which statement BEST explains this approach?",
            options: [
                { id: "a", text: "Beta-blockers can initially worsen heart failure symptoms before providing long-term benefit" },
                { id: "b", text: "The patient must first demonstrate tolerance to angiotensin-converting enzyme (ACE) inhibitors before starting a beta-blocker" },
                { id: "c", text: "High doses of beta-blockers cause irreversible liver damage in heart failure patients" },
                { id: "d", text: "Carvedilol must be titrated to match the patient\u2019s digoxin level" }
            ],
            correct: "a",
            rationale: {
                correct: "Beta-blockers reduce heart rate and contractility, which can initially worsen heart failure (HF) symptoms (increased fatigue, fluid retention, hypotension). However, long-term use improves survival by reducing myocardial remodeling and oxygen demand. The \"start low, go slow\" principle is critical - doses are increased every 2 weeks as tolerated.",
                b: "While angiotensin-converting enzyme (ACE) inhibitors are often started first, the slow beta-blocker titration is due to the drug\u2019s own hemodynamic effects, not a prerequisite relationship with ACE inhibitors.",
                c: "Beta-blockers do not cause irreversible liver damage. Hepatotoxicity is rare and not the reason for slow titration.",
                d: "Carvedilol dosing is independent of digoxin levels. They are separate medications with different titration guidelines."
            },
            testTakingTip: "\"Start low, go slow\" for beta-blockers in heart failure (HF). They improve long-term survival but can transiently worsen symptoms. Also remember: never stop beta-blockers abruptly - taper gradually to avoid rebound tachycardia.",
            guideSection: "Section 7 - Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nursing student asks why a beta blocker is prescribed for heart failure when it slows a heart that is already struggling. Which explanation by the nurse is correct?",
            options: [
                { id: "a", text: "It interrupts sympathetic compensation, which buys time but costs muscle" },
                { id: "b", text: "It raises contractility so the ventricle empties more completely" },
                { id: "c", text: "It increases renal blood flow so sodium and water are excreted faster" },
                { id: "d", text: "It dilates the coronary arteries so the muscle receives more oxygen" }
            ],
            correct: "a",
            rationale: {
                correct: "Sympathetic activation raises heart rate and contractility to defend output, but a faster rate means less filling time and higher oxygen demand. Beta blockers deliberately interrupt that compensation, which is why the drug looks backwards and still improves survival.",
                b: "Beta blockers lower contractility rather than raise it. A drug that increased contractility would add to the oxygen demand that is already the problem.",
                c: "Sodium and water handling is the target of diuretics and of renin angiotensin aldosterone system (RAAS) blockade, not of beta blockade.",
                d: "Coronary dilation describes nitrates. Beta blockers help by lowering demand rather than by raising supply."
            },
            testTakingTip: "When a heart failure drug looks backwards, ask which compensation it switches off. Sympathetic activation, renin angiotensin aldosterone system (RAAS) activation and ventricular remodelling all help briefly and harm eventually.",
            guideSection: "Section 3 - How the heart fails",
            guideSectionId: "pathophysiology"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with heart failure has jugular venous distention, peripheral edema and an enlarged liver. The lungs are clear on auscultation. Which explanation fits these findings?",
            options: [
                { id: "a", text: "Blood is backing up behind the failing right ventricle into the body" },
                { id: "b", text: "Blood is backing up behind the failing left ventricle into the lungs" },
                { id: "c", text: "Blood is being lost from the circulation into the abdominal cavity" },
                { id: "d", text: "Blood is bypassing the lungs through an opening in the septum" }
            ],
            correct: "a",
            rationale: {
                correct: "Heart failure is a pump problem, not a plumbing problem. Blood is not lost, it backs up behind the chamber that failed. Right sided failure backs up into the systemic circulation, which produces jugular venous distention, peripheral edema and hepatomegaly.",
                b: "Left sided failure backs up into the lungs and would produce crackles, dyspnea and orthopnea. This patient's lungs are clear.",
                c: "Blood volume is not lost in heart failure. Fluid shifts outward because pressure rises behind the failing chamber.",
                d: "A septal opening is a structural shunt, a separate problem from pump failure, and would not explain this pattern."
            },
            testTakingTip: "Find the failing chamber and the symptoms tell themselves. Left is Lungs, Right is the Rest of the body.",
            guideSection: "Section 3 - How the heart fails",
            guideSectionId: "pathophysiology"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is admitted with shortness of breath of unclear cause. The B-type natriuretic peptide (BNP) result is 640 pg/mL. How should the nurse interpret this value?",
            options: [
                { id: "a", text: "It is consistent with heart failure, being above 100 pg/mL" },
                { id: "b", text: "It is a normal result and rules heart failure out" },
                { id: "c", text: "It indicates a myocardial infarction rather than heart failure" },
                { id: "d", text: "It reflects kidney disease and says nothing about the heart" }
            ],
            correct: "a",
            rationale: {
                correct: "B-type natriuretic peptide (BNP) is released when the ventricle is stretched by volume overload. Over 100 pg/mL is consistent with heart failure, and this result is more than six times that threshold.",
                b: "Over 100 pg/mL is the cut off. A result of 640 pg/mL is far above it and cannot be called normal.",
                c: "Troponin is the marker that rises with myocardial infarction. B-type natriuretic peptide (BNP) reflects ventricular stretch.",
                d: "Kidney disease can raise B-type natriuretic peptide (BNP), but the value still reflects ventricular stretch and is not disregarded."
            },
            testTakingTip: "Over 100 pg/mL is the B-type natriuretic peptide (BNP) number to have cold. The exam gives you the value and asks what it means.",
            guideSection: "Section 9 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 12,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A patient with heart failure is due for a scheduled dose of lisinopril. The morning potassium is 5.8 mEq/L. What should the nurse do?",
            options: [
                { id: "a", text: "Hold the dose and notify the provider" },
                { id: "b", text: "Give the dose and recheck the potassium tomorrow" },
                { id: "c", text: "Give the dose along with a potassium supplement" },
                { id: "d", text: "Hold the dose and give an extra dose of furosemide" }
            ],
            correct: "a",
            rationale: {
                correct: "Angiotensin converting enzyme (ACE) inhibitors raise potassium. Above 5.5 mEq/L is the threshold at which the dose is held and the provider is notified, and this patient is at 5.8 mEq/L.",
                b: "Giving an angiotensin converting enzyme (ACE) inhibitor to a patient already above 5.5 mEq/L pushes potassium higher and risks a lethal arrhythmia.",
                c: "Adding potassium to a patient who is already hyperkalemic compounds the very problem that requires the hold.",
                d: "Changing the diuretic dose is a provider decision. Holding the angiotensin converting enzyme (ACE) inhibitor is the action the potassium calls for."
            },
            testTakingTip: "Above 5.5 mEq/L is the potassium at which the angiotensin converting enzyme (ACE) inhibitor is held. Hold and notify is almost always the pair.",
            guideSection: "Section 9 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 13,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A patient with heart failure is prescribed digoxin. The apical pulse is 52 beats per minute and the most recent digoxin level is 1.2 ng/mL. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Hold the dose and notify the provider" },
                { id: "b", text: "Give the dose because the level is therapeutic" },
                { id: "c", text: "Give the dose and recheck the pulse in one hour" },
                { id: "d", text: "Hold the dose and repeat the digoxin level now" }
            ],
            correct: "a",
            rationale: {
                correct: "Digoxin is held when the heart rate is under 60 beats per minute, whatever the level shows. A therapeutic level does not make bradycardia safe, because digoxin slows conduction further.",
                b: "The level of 1.2 ng/mL does sit inside the 0.5 to 2.0 ng/mL range, but it is the rate that triggers the hold.",
                c: "Giving the dose and reassessing afterwards is the wrong order when the rate is already below the hold threshold.",
                d: "Repeating a level that is already therapeutic delays the action the heart rate requires."
            },
            testTakingTip: "Two digoxin numbers to have cold: hold under 60 beats per minute, and 0.5 to 2.0 ng/mL is therapeutic. The rate holds the dose even when the level is fine.",
            guideSection: "Section 9 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 14,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A nurse begins the shift assessment on a patient with acute heart failure who is short of breath and coughing up pink frothy sputum. Which assessment should the nurse perform FIRST?",
            options: [
                { id: "a", text: "Auscultate the lungs and check oxygen saturation" },
                { id: "b", text: "Obtain the daily weight before the patient eats" },
                { id: "c", text: "Grade the peripheral edema on both lower legs" },
                { id: "d", text: "Measure jugular venous distention at 45 degrees" }
            ],
            correct: "a",
            rationale: {
                correct: "Airway and breathing come first. Pink frothy sputum with shortness of breath points to pulmonary edema, and a patient who cannot breathe does not need a weight first.",
                b: "Daily weight is the earliest reliable sign of fluid retention, but it belongs to step four, after breathing and perfusion.",
                c: "Grading edema is part of fluid status, which follows airway, perfusion and cardiovascular assessment.",
                d: "Jugular venous distention belongs to the cardiovascular step and is assessed after airway and breathing."
            },
            testTakingTip: "Assessment questions usually ask what you check FIRST, not what you check. Airway and breathing, then perfusion, then cardiovascular, then fluid, then function.",
            guideSection: "Section 6 - Assessment, in order",
            guideSectionId: "assessment"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is teaching a patient with heart failure how to take a daily weight at home. Which instruction by the nurse is correct?",
            options: [
                { id: "a", text: "Weigh at the same time daily, after voiding and before eating" },
                { id: "b", text: "Weigh whenever swelling is noticed, on any available scale" },
                { id: "c", text: "Weigh after breakfast each day, in outdoor clothing and shoes" },
                { id: "d", text: "Weigh twice each week and average the two readings together" }
            ],
            correct: "a",
            rationale: {
                correct: "Same time, same scale, same clothing, after voiding and before eating. Change the conditions and the number means nothing, because comparing one day to the next is the entire point.",
                b: "Waiting for visible swelling defeats the purpose. Edema needs several litres before it shows, and the scale catches the gain first.",
                c: "Weighing after a meal and in outdoor clothing adds weight that has nothing to do with fluid.",
                d: "A gain of more than 2 pounds in 24 hours is reportable, and a twice weekly schedule cannot detect it."
            },
            testTakingTip: "Report more than 2 pounds in a day, or more than 5 pounds in a week. Weight is the earliest reliable sign of fluid retention.",
            guideSection: "Section 6 - Assessment, in order",
            guideSectionId: "assessment"
        }
    ]
};
