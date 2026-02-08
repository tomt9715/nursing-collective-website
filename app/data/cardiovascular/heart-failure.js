/**
 * Quiz Bank — Heart Failure
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "hf-qb-001",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with heart failure has a BNP level of 1,200 pg/mL. The nurse understands this value indicates which of the following?",
        options: [
            { id: "a", text: "The patient's heart failure is well controlled" },
            { id: "b", text: "Significant ventricular wall stress is occurring" },
            { id: "c", text: "The patient is likely dehydrated" },
            { id: "d", text: "Renal function has declined significantly" }
        ],
        correct: "b",
        rationale: {
            correct: "BNP (B-type natriuretic peptide) is released from stretched ventricular myocytes. Levels above 100 pg/mL suggest heart failure; 1,200 pg/mL indicates significant ventricular wall stress and volume overload. Normal BNP is less than 100 pg/mL."
        },
        testTakingTip: "BNP is the biomarker most directly tied to ventricular stretch. Higher BNP = more wall stress = worse heart failure status.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "hf-qb-002",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "application",
        stem: "A home health nurse visits a patient with HFrEF who reports a 4-pound weight gain over 2 days. The patient's ankles are swollen and they feel short of breath when lying flat. Which action should the nurse take first?",
        options: [
            { id: "a", text: "Instruct the patient to elevate the legs and rest" },
            { id: "b", text: "Contact the healthcare provider to report findings" },
            { id: "c", text: "Review the patient's dietary sodium intake for the past 48 hours" },
            { id: "d", text: "Administer an extra dose of the prescribed PRN diuretic" }
        ],
        correct: "b",
        rationale: {
            correct: "A 4-pound weight gain in 2 days with peripheral edema and orthopnea indicates acute fluid retention and worsening heart failure. The nurse should contact the provider first to report these findings, as medication adjustments or further assessment may be needed. While reviewing sodium intake and elevating legs are appropriate, the priority is notifying the provider of this significant change."
        },
        testTakingTip: "When symptoms suggest acute decompensation (rapid weight gain, new orthopnea), the priority is always to notify the provider for potential medication changes rather than independent nursing interventions alone.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "management"
    },

    {
        id: "hf-qb-003",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "knowledge",
        stem: "Which classification system describes a patient's functional limitations with heart failure based on how much physical activity they can tolerate?",
        options: [
            { id: "a", text: "ACC/AHA staging system" },
            { id: "b", text: "NYHA functional classification" },
            { id: "c", text: "Killip classification" },
            { id: "d", text: "Framingham criteria" }
        ],
        correct: "b",
        rationale: {
            correct: "The NYHA (New York Heart Association) functional classification (Classes I-IV) categorizes patients based on their ability to perform physical activity and the onset of symptoms. ACC/AHA staging (A-D) describes disease progression. Killip classification is used for acute MI. Framingham criteria are diagnostic criteria for heart failure."
        },
        testTakingTip: "NYHA = how the patient functions (symptoms with activity). ACC/AHA = where they are in the disease course (structural progression). Know the difference between these two systems.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "classification"
    },

    {
        id: "hf-qb-004",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "application",
        stem: "A patient with NYHA Class III heart failure is being started on carvedilol. Which instruction is most important for the nurse to provide?",
        options: [
            { id: "a", text: "Take your pulse daily and hold the medication if it is below 60 bpm" },
            { id: "b", text: "Report any dizziness, as the dose will be started low and increased gradually" },
            { id: "c", text: "This medication will increase your heart rate to improve cardiac output" },
            { id: "d", text: "Take this medication with grapefruit juice to enhance absorption" }
        ],
        correct: "b",
        rationale: {
            correct: "Beta-blockers like carvedilol are started at a very low dose and slowly titrated up over weeks. This 'start low, go slow' approach minimizes hypotension and worsening heart failure symptoms during initiation. Dizziness from hypotension is the most common concern during the titration phase. While pulse monitoring is important, the key teaching is about the gradual titration process."
        },
        testTakingTip: "Beta-blockers in heart failure are unique — they are beneficial long-term but can initially worsen symptoms. The critical concept is slow upward titration. Always think 'start low, go slow.'",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "medications"
    },

    {
        id: "hf-qb-005",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with chronic heart failure who takes lisinopril and furosemide daily presents with a potassium level of 5.8 mEq/L and a creatinine of 2.4 mg/dL (baseline 1.1 mg/dL). Which medication change most likely contributed to these lab findings?",
        options: [
            { id: "a", text: "The furosemide dose was recently increased" },
            { id: "b", text: "Spironolactone was recently added to the regimen" },
            { id: "c", text: "Digoxin was recently discontinued" },
            { id: "d", text: "Amlodipine was recently added to the regimen" }
        ],
        correct: "b",
        rationale: {
            correct: "Spironolactone is a potassium-sparing diuretic and aldosterone antagonist. When added to an ACE inhibitor (lisinopril), both drugs increase potassium retention. Combined, they can cause dangerous hyperkalemia (5.8 mEq/L) and acute kidney injury (creatinine 2.4 from baseline 1.1). This is a well-known drug interaction requiring close monitoring of potassium and renal function."
        },
        testTakingTip: "ACE inhibitor + potassium-sparing diuretic = hyperkalemia risk. When you see unexplained high K+ and rising creatinine in a heart failure patient, think about recent addition of spironolactone or eplerenone.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "medications"
    },

    {
        id: "hf-qb-006",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with heart failure is prescribed a sodium-restricted diet of 2,000 mg per day. Which meal selection by the patient indicates a need for further teaching?",
        options: [
            { id: "a", text: "Grilled chicken breast with steamed broccoli and brown rice" },
            { id: "b", text: "A large bowl of canned chicken noodle soup with crackers" },
            { id: "c", text: "Baked salmon with a fresh garden salad and lemon dressing" },
            { id: "d", text: "Turkey sandwich on whole wheat bread with fresh fruit" }
        ],
        correct: "b",
        rationale: {
            correct: "Canned soups are extremely high in sodium — a single serving can contain 800-1,100 mg, and a large bowl could easily exceed 1,500 mg. This would use up nearly all of the patient's daily 2,000 mg sodium allowance in one meal. Fresh, home-prepared meals are much lower in sodium."
        },
        testTakingTip: "When asked 'needs further teaching,' look for the WRONG choice. Canned and processed foods are the #1 hidden sodium source. Fresh and home-cooked options are almost always the better choice for sodium restriction.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "hf-qb-007",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is caring for two patients with heart failure. Patient A has a dry cough that started 3 weeks after beginning enalapril. Patient B has bilateral crackles, a new S3 heart sound, and JVD. Which combination of interventions is most appropriate?",
        options: [
            { id: "a", text: "Switch Patient A to losartan; administer IV furosemide for Patient B" },
            { id: "b", text: "Discontinue enalapril for both patients; start IV nitroprusside for Patient B" },
            { id: "c", text: "Add a cough suppressant for Patient A; increase oral diuretics for Patient B" },
            { id: "d", text: "Continue enalapril for Patient A; position Patient B in high Fowler's only" }
        ],
        correct: "a",
        rationale: {
            correct: "Patient A has an ACE inhibitor-induced cough, a well-known side effect caused by bradykinin accumulation. Switching to an ARB (losartan) provides similar RAAS blockade without the cough. Patient B is showing signs of acute decompensation (crackles, S3, JVD indicating fluid overload), requiring IV diuretics for rapid volume removal. Simply suppressing the cough doesn't address the drug side effect, and positioning alone won't resolve acute pulmonary congestion."
        },
        testTakingTip: "ACE inhibitor cough → switch to ARB. Acute decompensation with pulmonary congestion → IV diuretics. These are two classic interventions that often appear together in analysis questions.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "medications"
    },

    {
        id: "hf-qb-008",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "application",
        stem: "A patient with newly diagnosed heart failure asks the nurse, 'Why do I need to weigh myself every morning?' Which response best explains the rationale?",
        options: [
            { id: "a", text: "Daily weights help us track whether your nutrition is adequate" },
            { id: "b", text: "Sudden weight changes can indicate fluid buildup before you feel symptoms" },
            { id: "c", text: "We need to adjust your medications based on your body mass index" },
            { id: "d", text: "It helps us determine whether you are exercising enough" }
        ],
        correct: "b",
        rationale: {
            correct: "Daily morning weights are the single best early indicator of fluid retention in heart failure. A weight gain of 2 pounds in one day or 5 pounds in one week suggests fluid accumulation, often before symptoms like edema or dyspnea become apparent. Early detection allows for timely medication adjustment and prevents acute decompensation."
        },
        testTakingTip: "Daily weights = early warning system for fluid retention. The key teaching is: same time, same scale, same clothing, before eating. Report gain of 2+ lbs/day or 5+ lbs/week.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "hf-qb-009",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is caring for a patient with biventricular heart failure who has both a CRT-D (cardiac resynchronization therapy with defibrillator) and is receiving continuous dobutamine infusion. The patient's spouse asks about prognosis. Which nursing consideration is most important in this situation?",
        options: [
            { id: "a", text: "Reassure the spouse that the combination therapy will restore normal heart function" },
            { id: "b", text: "Recognize this as advanced/end-stage HF and facilitate a goals-of-care discussion" },
            { id: "c", text: "Explain that the patient will likely need a heart transplant within the month" },
            { id: "d", text: "Focus teaching on increasing the patient's physical activity tolerance" }
        ],
        correct: "b",
        rationale: {
            correct: "Continuous inotrope infusion (dobutamine) combined with a CRT-D device indicates ACC/AHA Stage D (advanced/refractory) heart failure. These patients have exhausted standard therapies and have a poor prognosis. The most important nursing action is recognizing the severity and facilitating conversations about goals of care, advance directives, and palliative care options. False reassurance is never appropriate."
        },
        testTakingTip: "Continuous IV inotropes = Stage D (end-stage) heart failure. When you see this, think: goals of care, palliative care, and possibly hospice — not 'getting better.'",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "advanced-management"
    },

    {
        id: "hf-qb-010",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with heart failure is receiving digoxin 0.125 mg daily. Which lab value should the nurse check before administering the medication?",
        options: [
            { id: "a", text: "Sodium level" },
            { id: "b", text: "Potassium level" },
            { id: "c", text: "Calcium level" },
            { id: "d", text: "Magnesium level" }
        ],
        correct: "b",
        rationale: {
            correct: "Hypokalemia increases the risk of digoxin toxicity because digoxin and potassium compete for the same binding sites on the sodium-potassium ATPase pump. When potassium is low, more digoxin binds, increasing its effect to toxic levels. The nurse should check potassium before each dose and hold digoxin if potassium is below 3.5 mEq/L."
        },
        testTakingTip: "Digoxin and potassium have an inverse relationship for toxicity. Low K+ = high digoxin toxicity risk. Always check potassium before giving digoxin.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "medications"
    },

    {
        id: "hf-qb-011",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "single",
        difficulty: "application",
        stem: "A patient with heart failure is being discharged on sacubitril/valsartan (Entresto). The patient was previously taking lisinopril, which was discontinued yesterday. When should the nurse instruct the patient to begin taking Entresto?",
        options: [
            { id: "a", text: "Immediately upon discharge" },
            { id: "b", text: "At least 36 hours after the last dose of lisinopril" },
            { id: "c", text: "One week after discontinuing lisinopril" },
            { id: "d", text: "Only after a repeat echocardiogram" }
        ],
        correct: "b",
        rationale: {
            correct: "Sacubitril/valsartan (Entresto) requires a 36-hour washout period after discontinuing an ACE inhibitor to prevent angioedema. The neprilysin inhibitor component (sacubitril) combined with residual ACE inhibition causes dangerous bradykinin accumulation. If lisinopril was discontinued yesterday, the patient should wait until at least 36 hours have passed."
        },
        testTakingTip: "Entresto + ACE inhibitor = angioedema risk. The magic number is 36 hours — always wait at least 36 hours between stopping an ACEI and starting Entresto.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "medications"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "hf-qb-012",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "ordering",
        difficulty: "application",
        stem: "A patient arrives at the emergency department with acute decompensated heart failure: severe dyspnea, oxygen saturation 84%, bilateral crackles, and pink frothy sputum. Place the nurse's actions in priority order.",
        options: [
            { id: "s1", text: "Position the patient upright and apply high-flow oxygen" },
            { id: "s2", text: "Establish IV access and administer IV furosemide as ordered" },
            { id: "s3", text: "Apply continuous pulse oximetry and cardiac monitoring" },
            { id: "s4", text: "Insert a Foley catheter to monitor hourly urine output" },
            { id: "s5", text: "Obtain a 12-lead ECG and draw BNP and troponin levels" }
        ],
        correct: ["s1", "s3", "s2", "s5", "s4"],
        rationale: {
            s1: "Airway and breathing first: upright positioning reduces preload and improves ventilation; high-flow O2 addresses critical hypoxemia (SpO2 84%).",
            s3: "Continuous monitoring establishes baseline and detects arrhythmias or further deterioration during treatment.",
            s2: "IV access and furosemide address the volume overload causing pulmonary edema. IV route ensures rapid onset.",
            s5: "ECG rules out acute MI as the cause; BNP confirms severity; troponin identifies myocardial injury. Done after stabilizing interventions.",
            s4: "Foley insertion for strict I&O monitoring tracks diuretic response. Important but lower priority than stabilization and diagnostics."
        },
        testTakingTip: "In acute decompensated heart failure, think ABCs first: position upright + oxygen, then monitor, then treat the volume overload, then diagnose the trigger, then track output.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "hf-qb-013",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with chronic HFrEF has an ejection fraction of 30%. The cardiologist is building the patient's medication regimen following guideline-directed medical therapy. Place these medication additions in the correct sequence of initiation.",
        options: [
            { id: "s1", text: "Start an ACE inhibitor (e.g., lisinopril)" },
            { id: "s2", text: "Start a beta-blocker (e.g., carvedilol) once stable on ACEi" },
            { id: "s3", text: "Add an aldosterone antagonist (e.g., spironolactone) if EF remains ≤35% and symptoms persist" },
            { id: "s4", text: "Switch ACEi to sacubitril/valsartan (Entresto) if still symptomatic" },
            { id: "s5", text: "Consider adding hydralazine/isosorbide dinitrate if unable to tolerate RAAS blockade" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "ACE inhibitors are the cornerstone of HFrEF therapy, reducing preload and afterload while preventing cardiac remodeling. Started first.",
            s2: "Beta-blockers are added once the patient is stable on the ACEi. They reduce mortality by decreasing heart rate and myocardial oxygen demand.",
            s3: "Aldosterone antagonists are added for patients with EF ≤35% who remain symptomatic despite ACEi + beta-blocker. They provide additional neurohormonal blockade.",
            s4: "Sacubitril/valsartan replaces the ACEi if the patient remains symptomatic. It provides superior outcomes compared to ACEi alone but requires the 36-hour washout.",
            s5: "Hydralazine/isosorbide dinitrate is an alternative for patients who cannot tolerate ACEi, ARB, or ARNI therapy. It is typically a later consideration."
        },
        testTakingTip: "GDMT for HFrEF follows a stepwise approach: ACEi → beta-blocker → aldosterone antagonist → upgrade to Entresto → alternatives if intolerant. Each step requires the patient to be stable before adding the next.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "medications"
    },

    {
        id: "hf-qb-014",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is preparing discharge teaching for a patient newly diagnosed with heart failure. Place the following teaching topics in the order they should be prioritized during the discharge education session.",
        options: [
            { id: "s1", text: "How and when to take each prescribed medication" },
            { id: "s2", text: "Daily weight monitoring: same time, same scale, same clothing" },
            { id: "s3", text: "When to call the provider (weight gain >2 lbs/day, increasing SOB)" },
            { id: "s4", text: "Sodium and fluid restriction guidelines" },
            { id: "s5", text: "Activity recommendations and cardiac rehabilitation referral" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Medication adherence is the single most important factor in preventing readmission. The patient must understand each medication's purpose, dose, and timing before leaving.",
            s2: "Daily weights are the primary self-monitoring tool. This skill must be taught immediately after medications because it is how the patient detects early decompensation.",
            s3: "The patient must know red flags and when to call for help. Without this knowledge, daily weights lose their purpose.",
            s4: "Dietary modifications support the medication regimen and reduce fluid accumulation. Important but builds on the medication and monitoring foundation.",
            s5: "Activity and rehab guidance supports long-term recovery and quality of life but is the least urgent during initial discharge teaching."
        },
        testTakingTip: "Discharge teaching priority: medications first (most important for readmission prevention), then self-monitoring skills, then when to seek help, then lifestyle modifications.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "hf-qb-015",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "ordering",
        difficulty: "knowledge",
        stem: "Place the following NYHA functional classes in order from least symptomatic to most symptomatic.",
        options: [
            { id: "s1", text: "Class I: No limitation of physical activity; ordinary activity does not cause symptoms" },
            { id: "s2", text: "Class II: Slight limitation; comfortable at rest but ordinary activity causes fatigue or dyspnea" },
            { id: "s3", text: "Class III: Marked limitation; comfortable at rest but less-than-ordinary activity causes symptoms" },
            { id: "s4", text: "Class IV: Unable to carry out any activity without discomfort; symptoms at rest" }
        ],
        correct: ["s1", "s2", "s3", "s4"],
        rationale: {
            s1: "Class I patients have heart failure but no functional limitations. They can perform normal activities without symptoms.",
            s2: "Class II patients experience symptoms with ordinary exertion (climbing stairs, walking uphill) but are comfortable at rest.",
            s3: "Class III patients develop symptoms with minimal activity (walking across the room, getting dressed). Major limitation in daily activities.",
            s4: "Class IV patients have symptoms even at rest and are unable to perform any physical activity without worsening discomfort."
        },
        testTakingTip: "NYHA classes are straightforward: I = no symptoms, II = symptoms with normal activity, III = symptoms with minimal activity, IV = symptoms at rest. Think of it as a progressive loss of function.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "classification"
    },

    {
        id: "hf-qb-016",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with heart failure on telemetry suddenly develops rapid atrial fibrillation (HR 158), BP drops to 82/50, and becomes diaphoretic and confused. Place the nurse's interventions in the correct priority order.",
        options: [
            { id: "s1", text: "Call a rapid response and notify the provider immediately" },
            { id: "s2", text: "Lower the head of bed and prepare for synchronized cardioversion" },
            { id: "s3", text: "Administer IV amiodarone or diltiazem per provider order for rate control" },
            { id: "s4", text: "Obtain a STAT 12-lead ECG and recheck blood pressure in both arms" }
        ],
        correct: ["s1", "s4", "s3", "s2"],
        rationale: {
            s1: "Hemodynamic instability with rapid A-fib requires immediate help. Calling a rapid response brings the team and resources to the bedside.",
            s4: "A 12-lead ECG confirms the rhythm and rules out STEMI or other causes. Bilateral BP ensures accurate assessment. This guides treatment decisions.",
            s3: "Pharmacologic rate control is attempted first if the patient is conscious and maintaining a BP, even if low. IV medications have rapid onset.",
            s2: "Synchronized cardioversion is prepared as a backup if pharmacologic measures fail or the patient further deteriorates. It is the definitive treatment for unstable tachycardia."
        },
        testTakingTip: "Unstable tachyarrhythmia in a heart failure patient: call for help → confirm the rhythm → try pharmacologic rate control → prepare for cardioversion if failing. The patient's hemodynamic status drives urgency.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "complications"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "hf-qb-017",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each clinical finding, indicate whether it is primarily associated with left-sided heart failure or right-sided heart failure.",
        columns: ["Left-Sided HF", "Right-Sided HF"],
        rows: [
            { id: "r1", text: "Bilateral pulmonary crackles on auscultation", correct: "Left-Sided HF" },
            { id: "r2", text: "Jugular venous distension (JVD)", correct: "Right-Sided HF" },
            { id: "r3", text: "Pink, frothy sputum production", correct: "Left-Sided HF" },
            { id: "r4", text: "Hepatomegaly with right upper quadrant tenderness", correct: "Right-Sided HF" },
            { id: "r5", text: "Paroxysmal nocturnal dyspnea (PND)", correct: "Left-Sided HF" },
            { id: "r6", text: "Dependent peripheral edema (ankles, sacrum)", correct: "Right-Sided HF" }
        ],
        rationale: {
            correct: "Left-sided HF causes backward flow into the pulmonary system: crackles, frothy sputum, PND, and orthopnea result from pulmonary congestion. Right-sided HF causes backward flow into the systemic venous circulation: JVD, hepatomegaly, and peripheral edema result from systemic venous congestion. Remember: Left = Lungs, Right = Rest of the body."
        },
        testTakingTip: "The mnemonic 'Left = Lungs' helps remember that left-sided failure backs up into the pulmonary circuit. Right-sided failure backs up into the systemic venous system (JVD, liver, edema).",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "hf-qb-018",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each heart failure medication, identify its primary mechanism of action.",
        columns: ["Reduces Preload", "Reduces Afterload", "Increases Contractility"],
        rows: [
            { id: "r1", text: "Furosemide (Lasix)", correct: "Reduces Preload" },
            { id: "r2", text: "Lisinopril (ACE inhibitor)", correct: "Reduces Afterload" },
            { id: "r3", text: "Digoxin (Lanoxin)", correct: "Increases Contractility" },
            { id: "r4", text: "Nitroglycerin (IV infusion)", correct: "Reduces Preload" },
            { id: "r5", text: "Milrinone (phosphodiesterase inhibitor)", correct: "Increases Contractility" }
        ],
        rationale: {
            correct: "Furosemide and nitroglycerin both reduce preload (volume returning to the heart) — furosemide through diuresis, nitro through venodilation. ACE inhibitors primarily reduce afterload (the resistance the heart pumps against) through arteriolar dilation. Digoxin and milrinone are positive inotropes that directly increase the force of myocardial contraction."
        },
        testTakingTip: "Think of heart failure medications in three buckets: reduce volume (preload), reduce resistance (afterload), or squeeze harder (contractility). Many drugs overlap, but the PRIMARY action is what the question asks.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "medications"
    },

    {
        id: "hf-qb-019",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "matrix",
        difficulty: "application",
        stem: "A patient with heart failure calls the clinic reporting new symptoms. For each symptom, indicate whether the nurse should advise 'Call 911 immediately' or 'Schedule a same-day office visit.'",
        columns: ["Call 911", "Same-Day Visit"],
        rows: [
            { id: "r1", text: "Chest pain at rest with cold, clammy skin and severe shortness of breath", correct: "Call 911" },
            { id: "r2", text: "3-pound weight gain over the past 3 days with mild ankle swelling", correct: "Same-Day Visit" },
            { id: "r3", text: "Sudden inability to breathe while lying flat, must sit upright to breathe", correct: "Call 911" },
            { id: "r4", text: "Persistent dry cough that started 2 weeks ago on a new medication", correct: "Same-Day Visit" },
            { id: "r5", text: "Confusion, dizziness, and near-syncope with heart rate of 38 bpm", correct: "Call 911" }
        ],
        rationale: {
            correct: "Emergency (Call 911): Chest pain with hemodynamic compromise suggests cardiogenic shock or acute MI. Acute orthopnea/PND with respiratory distress suggests flash pulmonary edema. Confusion with severe bradycardia suggests critical hypoperfusion. Same-day visit: Gradual weight gain with mild edema indicates fluid retention needing medication adjustment. New persistent cough suggests ACEi side effect needing medication review — urgent but not emergent."
        },
        testTakingTip: "911 = acute, life-threatening, hemodynamically unstable. Same-day visit = concerning but stable, needs medication adjustment. The key differentiator is hemodynamic stability and acuity of onset.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "hf-qb-020",
        category: "cardiovascular",
        topic: "heart-failure",
        topicLabel: "Heart Failure",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is delegating care for heart failure patients on a medical-surgical unit. For each task, indicate whether it can be delegated to a UAP (unlicensed assistive personnel) or must be performed by the RN.",
        columns: ["Delegate to UAP", "RN Only"],
        rows: [
            { id: "r1", text: "Obtaining daily morning weights using a standing scale", correct: "Delegate to UAP" },
            { id: "r2", text: "Assessing lung sounds for crackles or wheezing", correct: "RN Only" },
            { id: "r3", text: "Recording intake and output measurements", correct: "Delegate to UAP" },
            { id: "r4", text: "Teaching the patient about sodium-restricted diet choices", correct: "RN Only" },
            { id: "r5", text: "Reporting a weight gain of 3 pounds since yesterday to the nurse", correct: "Delegate to UAP" }
        ],
        rationale: {
            correct: "UAPs can perform routine, standardized tasks: daily weights, I&O recording, and reporting objective findings (weight change) to the RN. Assessment (lung auscultation) and teaching (dietary education) require clinical judgment and are RN-only responsibilities. The UAP measures and reports; the RN assesses, interprets, and teaches."
        },
        testTakingTip: "Delegation rule: UAPs can measure, record, and report. RNs assess, interpret, teach, and make clinical decisions. If a task requires judgment or clinical knowledge, it stays with the RN.",
        relatedGuide: "heart-failure.html",
        relatedGuideSection: "nursing-care"
    }

]);
