/**
 * Quiz Bank — Myocardial Infarction
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "mi-qb-001",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient is admitted with an acute STEMI. The nurse understands that the 'ST elevation' on the ECG indicates which pathological process?",
        options: [
            { id: "a", text: "Complete ischemia without tissue death" },
            { id: "b", text: "Transmural (full-thickness) myocardial injury" },
            { id: "c", text: "Subendocardial ischemia only" },
            { id: "d", text: "Reperfusion of previously damaged tissue" }
        ],
        correct: "b",
        rationale: {
            correct: "ST elevation on ECG indicates transmural (full-thickness) myocardial injury, meaning the damage extends through the entire thickness of the myocardial wall. This differentiates a STEMI from an NSTEMI, where injury is typically subendocardial. ST elevation reflects an acute current of injury and demands emergent reperfusion therapy."
        },
        testTakingTip: "STEMI = ST Elevation = Transmural (full-thickness) injury. NSTEMI = ST depression or T-wave changes = Subendocardial injury. The depth of injury determines ECG changes and treatment urgency.",
        relatedGuide: "mi.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "mi-qb-002",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "application",
        stem: "A 72-year-old female patient with diabetes presents to the ED with sudden onset of nausea, jaw pain, extreme fatigue, and diaphoresis. Her ECG shows ST depression in leads V1-V4. Which nursing action is the priority?",
        options: [
            { id: "a", text: "Administer an antiemetic for the nausea" },
            { id: "b", text: "Obtain a troponin level and treat as a possible acute coronary syndrome" },
            { id: "c", text: "Reassure the patient that these are likely GI symptoms" },
            { id: "d", text: "Place the patient on bedrest and monitor for 4 hours" }
        ],
        correct: "b",
        rationale: {
            correct: "This patient is presenting with atypical MI symptoms, which are common in women, elderly, and diabetic patients. Nausea, jaw pain, fatigue, and diaphoresis are classic atypical presentations. ST depression in precordial leads suggests acute myocardial ischemia (possible NSTEMI). Troponin levels confirm myocardial injury. This is an acute coronary syndrome until proven otherwise — delays in recognition lead to worse outcomes."
        },
        testTakingTip: "Women, elderly, and diabetic patients often present with atypical MI symptoms: nausea, fatigue, jaw/back pain, shortness of breath — NOT classic chest pain. Always think ACS when these populations present with vague symptoms + ECG changes.",
        relatedGuide: "mi.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "mi-qb-003",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient's serial troponin levels are: initial 0.02 ng/mL, 3-hour 0.18 ng/mL, 6-hour 1.42 ng/mL. The nurse interprets this trend as indicating which of the following?",
        options: [
            { id: "a", text: "Stable angina with no myocardial damage" },
            { id: "b", text: "Resolving myocardial injury with improving values" },
            { id: "c", text: "Acute myocardial injury with a rising troponin pattern" },
            { id: "d", text: "Chronic elevation consistent with renal failure" }
        ],
        correct: "c",
        rationale: {
            correct: "Serial troponin levels showing a significant rise-and-rise pattern (0.02 → 0.18 → 1.42) indicate acute myocardial injury. The initial level may be normal because troponin release begins 2-4 hours after injury onset. A rising trend over serial draws confirms acute MI, as opposed to chronically elevated levels (which would be stable, not rising) seen in conditions like renal failure."
        },
        testTakingTip: "The TREND matters more than a single value. Rising troponin = acute injury. Stable elevated troponin = chronic condition (e.g., renal failure). Serial draws 3-6 hours apart confirm the diagnosis.",
        relatedGuide: "mi.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "mi-qb-004",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "application",
        stem: "A patient with acute STEMI is being evaluated for thrombolytic therapy (tPA). Which finding in the patient's history would be an absolute contraindication to receiving tPA?",
        options: [
            { id: "a", text: "The patient had knee replacement surgery 8 months ago" },
            { id: "b", text: "The patient's blood pressure is 152/94 mmHg" },
            { id: "c", text: "The patient had a hemorrhagic stroke 2 months ago" },
            { id: "d", text: "The patient is currently taking daily aspirin" }
        ],
        correct: "c",
        rationale: {
            correct: "A hemorrhagic stroke within the past 3 months is an absolute contraindication to thrombolytic therapy. Thrombolytics dissolve clots by activating plasminogen, which would worsen a recent intracranial hemorrhage and could be fatal. Major surgery within 3 weeks (not 8 months) is a contraindication. Mildly elevated BP and aspirin use are not absolute contraindications."
        },
        testTakingTip: "Absolute contraindications to tPA include: active bleeding, recent hemorrhagic stroke (3 months), intracranial neoplasm, suspected aortic dissection, and recent major surgery (3 weeks). Memorize these — they appear frequently on exams.",
        relatedGuide: "mi.html",
        relatedGuideSection: "treatment"
    },

    {
        id: "mi-qb-005",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "analysis",
        stem: "A patient is 6 hours post-PCI (percutaneous coronary intervention) via the right femoral artery. The nurse notes a firm, expanding mass at the groin insertion site with new-onset back pain and a hemoglobin drop from 13.2 to 10.1 g/dL. Which complication should the nurse suspect?",
        options: [
            { id: "a", text: "Arteriovenous fistula formation" },
            { id: "b", text: "Retroperitoneal hemorrhage" },
            { id: "c", text: "Deep vein thrombosis" },
            { id: "d", text: "Contrast-induced nephropathy" }
        ],
        correct: "b",
        rationale: {
            correct: "An expanding groin mass (hematoma), new-onset back or flank pain, and a significant hemoglobin drop (3+ g/dL) are the classic triad of retroperitoneal hemorrhage after femoral artery catheterization. Blood tracks along the retroperitoneal space, causing back pain that is easy to miss. This is a life-threatening emergency requiring immediate intervention. AV fistula presents with a bruit, DVT with leg swelling, and contrast nephropathy with rising creatinine."
        },
        testTakingTip: "Post-PCI via femoral artery: groin mass + back pain + dropping hemoglobin = retroperitoneal bleed until proven otherwise. This is the most dangerous femoral access complication. Back pain is the key distinguishing finding.",
        relatedGuide: "mi.html",
        relatedGuideSection: "cardiac-catheterization"
    },

    {
        id: "mi-qb-006",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient 3 days post-MI develops a new pericardial friction rub, low-grade fever, and pleuritic chest pain that worsens with deep breathing and improves when leaning forward. The nurse suspects which complication?",
        options: [
            { id: "a", text: "Reinfarction of the same coronary territory" },
            { id: "b", text: "Dressler syndrome (post-MI pericarditis)" },
            { id: "c", text: "Papillary muscle rupture" },
            { id: "d", text: "Ventricular septal defect" }
        ],
        correct: "b",
        rationale: {
            correct: "Dressler syndrome (post-MI pericarditis) is an autoimmune inflammatory response that typically occurs days to weeks after MI. The hallmarks are: pericardial friction rub, low-grade fever, pleuritic chest pain that worsens with inspiration and improves with sitting forward. Reinfarction would show new ST changes and troponin rise. Papillary muscle rupture presents with a new systolic murmur and acute pulmonary edema. VSD presents with a new holosystolic murmur."
        },
        testTakingTip: "Dressler syndrome: friction rub + fever + pleuritic pain + positional relief (leaning forward). It occurs days to weeks post-MI. Treatment is anti-inflammatory medications (NSAIDs, colchicine).",
        relatedGuide: "mi.html",
        relatedGuideSection: "complications"
    },

    {
        id: "mi-qb-007",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "application",
        stem: "A patient is being discharged 4 days after an MI with stent placement. The nurse reviews the discharge medications: aspirin 81 mg daily, clopidogrel 75 mg daily, metoprolol 25 mg twice daily, atorvastatin 80 mg at bedtime, and lisinopril 5 mg daily. The patient asks, 'Do I really need all of these?' Which response is most appropriate?",
        options: [
            { id: "a", text: "You can probably stop the aspirin since you are already on clopidogrel" },
            { id: "b", text: "Each medication targets a different part of preventing another heart attack and keeping the stent open" },
            { id: "c", text: "You only need these for a few weeks until your stent heals" },
            { id: "d", text: "The doctor orders these as a routine set; not all may be necessary for you" }
        ],
        correct: "b",
        rationale: {
            correct: "Post-MI with stent placement requires dual antiplatelet therapy (aspirin + clopidogrel/ticagrelor) to prevent stent thrombosis, beta-blocker (metoprolol) to reduce myocardial oxygen demand and prevent arrhythmias, high-intensity statin (atorvastatin 80 mg) for plaque stabilization, and ACE inhibitor (lisinopril) to prevent cardiac remodeling. Each drug has a distinct, evidence-based role in secondary prevention."
        },
        testTakingTip: "Post-MI discharge medications mnemonic — 'ABCDE': Antiplatelet (dual), Beta-blocker, Cholesterol (statin), (ACE inhibitor for) heart remodeling. All are evidence-based and each serves a different purpose.",
        relatedGuide: "mi.html",
        relatedGuideSection: "discharge-medications"
    },

    {
        id: "mi-qb-008",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "analysis",
        stem: "Two hours after receiving tPA for an acute STEMI, a patient develops sudden confusion, right-sided weakness, and slurred speech. Vital signs: BP 168/98, HR 88, O2 sat 97%. Which action should the nurse take first?",
        options: [
            { id: "a", text: "Administer IV labetalol to lower the blood pressure" },
            { id: "b", text: "Stop the tPA infusion immediately and notify the provider" },
            { id: "c", text: "Obtain a STAT CT scan of the head" },
            { id: "d", text: "Perform a full neurological assessment using the NIHSS" }
        ],
        correct: "b",
        rationale: {
            correct: "Sudden neurological deficits (confusion, hemiplegia, dysarthria) during thrombolytic infusion strongly suggest intracranial hemorrhage — the most feared complication of tPA. The FIRST action is to stop the tPA infusion to prevent further bleeding, then immediately notify the provider. A CT scan and neurological assessment will follow, but stopping the offending agent takes precedence because every additional minute of infusion worsens the hemorrhage."
        },
        testTakingTip: "New neurological deficit during tPA = intracranial hemorrhage until proven otherwise. STOP the infusion FIRST, then assess and diagnose. Never continue the drug while investigating the complication it likely caused.",
        relatedGuide: "mi.html",
        relatedGuideSection: "thrombolytics"
    },

    {
        id: "mi-qb-009",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient asks the nurse about cardiac rehabilitation after their MI. Which statement accurately describes Phase I cardiac rehabilitation?",
        options: [
            { id: "a", text: "It includes supervised treadmill exercise at an outpatient facility" },
            { id: "b", text: "It begins in the hospital with progressive low-level activity and education" },
            { id: "c", text: "It involves unsupervised home exercise with weekly check-ins" },
            { id: "d", text: "It starts 6 weeks post-MI with a graded exercise test" }
        ],
        correct: "b",
        rationale: {
            correct: "Phase I cardiac rehab begins while the patient is still hospitalized. It includes progressive ambulation (bed → chair → hallway), education about risk factor modification, and assessment of the patient's response to activity (HR, BP, symptoms). Phase II is supervised outpatient exercise. Phase III is a maintenance program with decreasing supervision."
        },
        testTakingTip: "Cardiac rehab phases: Phase I = inpatient (starts in hospital), Phase II = outpatient supervised, Phase III = maintenance/independent. The key is progressive activity with monitoring at each phase.",
        relatedGuide: "mi.html",
        relatedGuideSection: "cardiac-rehab"
    },

    {
        id: "mi-qb-010",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "analysis",
        stem: "A patient 48 hours post-inferior wall MI suddenly develops a new loud holosystolic murmur, hypotension (BP 78/52), bibasilar crackles, and a rapidly increasing need for supplemental oxygen. Which mechanical complication should the nurse suspect?",
        options: [
            { id: "a", text: "Free wall rupture with cardiac tamponade" },
            { id: "b", text: "Ventricular septal rupture" },
            { id: "c", text: "Left ventricular aneurysm" },
            { id: "d", text: "Mitral valve prolapse" }
        ],
        correct: "b",
        rationale: {
            correct: "A new loud holosystolic murmur 2-5 days post-MI, combined with sudden hemodynamic deterioration (hypotension, pulmonary congestion), is the classic presentation of ventricular septal rupture (VSR). Blood shunts left-to-right through the defect, causing volume overload and cardiogenic shock. Free wall rupture typically presents with sudden PEA or death, not a murmur. LV aneurysm develops gradually. Mitral valve prolapse produces a mid-systolic click, not a holosystolic murmur."
        },
        testTakingTip: "Post-MI + new holosystolic murmur + hemodynamic collapse = either ventricular septal rupture or papillary muscle rupture (mitral regurgitation). Both are surgical emergencies. The timing (2-5 days post-MI) is key.",
        relatedGuide: "mi.html",
        relatedGuideSection: "complications"
    },

    {
        id: "mi-qb-011",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "single",
        difficulty: "application",
        stem: "A patient recovering from an anterior wall MI asks when they can safely resume sexual activity. Which response by the nurse is most accurate?",
        options: [
            { id: "a", text: "You should avoid sexual activity permanently to protect your heart" },
            { id: "b", text: "Most patients can resume sexual activity when they can climb two flights of stairs without symptoms" },
            { id: "c", text: "You may resume activity as soon as you are discharged from the hospital" },
            { id: "d", text: "Wait exactly 6 months and then get clearance from your cardiologist" }
        ],
        correct: "b",
        rationale: {
            correct: "The standard guideline for resuming sexual activity after MI is when the patient can perform moderate physical exertion (equivalent to climbing two flights of stairs or walking briskly) without chest pain, dyspnea, or ECG changes. This typically occurs 4-6 weeks post-MI. Permanent avoidance is unnecessary for most patients, and immediate resumption carries risk."
        },
        testTakingTip: "The two-flight-of-stairs test is the classic benchmark for sexual activity readiness post-MI. It reflects the metabolic equivalent (approximately 3-5 METs) of sexual activity.",
        relatedGuide: "mi.html",
        relatedGuideSection: "patient-education"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "mi-qb-012",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "ordering",
        difficulty: "application",
        stem: "A patient presents to the ED with crushing substernal chest pain radiating to the left arm, diaphoresis, and nausea. The ECG shows ST elevation in leads II, III, and aVF. Place the nurse's initial actions in priority order.",
        options: [
            { id: "s1", text: "Administer aspirin 325 mg chewable and sublingual nitroglycerin" },
            { id: "s2", text: "Obtain IV access, draw troponin, CBC, BMP, and coagulation studies" },
            { id: "s3", text: "Apply oxygen if SpO2 is below 94% and connect to continuous cardiac monitoring" },
            { id: "s4", text: "Administer morphine for pain unrelieved by nitroglycerin (per order)" },
            { id: "s5", text: "Prepare for emergent cardiac catheterization (activate cath lab team)" }
        ],
        correct: ["s3", "s1", "s2", "s5", "s4"],
        rationale: {
            s3: "Airway and monitoring first: oxygen for hypoxemia and cardiac monitoring to detect life-threatening arrhythmias that frequently accompany acute STEMI.",
            s1: "Aspirin (anti-platelet) and nitroglycerin (vasodilation, pain relief) are the immediate pharmacologic interventions for ACS. Aspirin should be chewed for rapid absorption.",
            s2: "IV access enables medication administration; labs establish baseline and confirm diagnosis. Troponin trending is essential but takes time.",
            s5: "STEMI requires emergent reperfusion. Activating the cath lab (door-to-balloon time goal <90 minutes) takes precedence over comfort measures.",
            s4: "Morphine is administered for pain not relieved by nitroglycerin but is a lower priority than ensuring reperfusion therapy is initiated."
        },
        testTakingTip: "STEMI initial management: MONA (Morphine, Oxygen, Nitro, Aspirin) is the classic mnemonic, but the PRIORITY order is actually: O2/monitoring → Aspirin + Nitro → IV access + labs → activate cath lab → Morphine if needed.",
        relatedGuide: "mi.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "mi-qb-013",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "ordering",
        difficulty: "knowledge",
        stem: "Place the phases of cardiac rehabilitation in the correct chronological sequence from immediately post-MI to long-term recovery.",
        options: [
            { id: "s1", text: "Phase I: Progressive ambulation in the hospital (bed → chair → hallway)" },
            { id: "s2", text: "Phase II: Supervised outpatient exercise program (3x/week for 12 weeks)" },
            { id: "s3", text: "Phase III: Independent exercise with periodic follow-up" },
            { id: "s4", text: "Pre-rehab: Hemodynamic stabilization and risk stratification in the ICU/CCU" }
        ],
        correct: ["s4", "s1", "s2", "s3"],
        rationale: {
            s4: "Before any activity, the patient must be hemodynamically stable. Risk stratification determines the intensity and timing of rehabilitation.",
            s1: "Phase I begins in the hospital once stable. Progressive activity from bed rest to ambulation, with monitoring of HR, BP, and symptoms at each stage.",
            s2: "Phase II occurs after discharge (usually starting 2-6 weeks post-MI). ECG-monitored exercise at an outpatient facility with trained staff.",
            s3: "Phase III is the lifelong maintenance phase. The patient exercises independently with the knowledge and confidence gained from supervised phases."
        },
        testTakingTip: "Cardiac rehab is a stepwise progression from dependent to independent: stabilize → inpatient activity → supervised outpatient → independent maintenance. Each phase increases autonomy and decreases monitoring.",
        relatedGuide: "mi.html",
        relatedGuideSection: "cardiac-rehab"
    },

    {
        id: "mi-qb-014",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "ordering",
        difficulty: "application",
        stem: "A patient returns to the unit after PCI via the right femoral artery approach. Place the nurse's post-procedure assessments in priority order.",
        options: [
            { id: "s1", text: "Assess the groin insertion site for bleeding, hematoma, or bruit" },
            { id: "s2", text: "Check distal pulses (dorsalis pedis, posterior tibial) and circulation in the affected leg" },
            { id: "s3", text: "Verify the patient keeps the affected leg straight and the HOB at ≤30 degrees" },
            { id: "s4", text: "Monitor vital signs and compare to pre-procedure baseline" },
            { id: "s5", text: "Assess urine output and encourage fluids to clear contrast dye" }
        ],
        correct: ["s4", "s1", "s2", "s3", "s5"],
        rationale: {
            s4: "Vital signs first — detect hemodynamic instability from hemorrhage, contrast reaction, or reperfusion arrhythmias before focused assessments.",
            s1: "The insertion site is the highest-risk area for complications: hemorrhage, hematoma formation, or pseudoaneurysm. Direct visualization and palpation are essential.",
            s2: "Distal pulses confirm arterial patency. Loss of pulse indicates arterial occlusion or thrombus — a time-sensitive emergency requiring immediate intervention.",
            s3: "Position verification prevents insertion site disruption. Leg flexion can dislodge the arterial closure device and cause hemorrhage.",
            s5: "Hydration promotes contrast dye excretion and protects the kidneys. Important but lowest priority among immediate post-PCI assessments."
        },
        testTakingTip: "Post-PCI assessment priority: systemic (vitals) → site (bleeding) → distal (pulses/circulation) → positioning → renal protection. Think from life-threatening to supportive care.",
        relatedGuide: "mi.html",
        relatedGuideSection: "cardiac-catheterization"
    },

    {
        id: "mi-qb-015",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "ordering",
        difficulty: "analysis",
        stem: "A post-MI patient on the telemetry unit suddenly develops ventricular tachycardia with a pulse. The patient is diaphoretic and lightheaded, BP 74/48. Place the interventions in the correct order.",
        options: [
            { id: "s1", text: "Call a code blue or rapid response for hemodynamically unstable VT" },
            { id: "s2", text: "Prepare for and perform synchronized cardioversion per ACLS protocol" },
            { id: "s3", text: "Administer IV amiodarone 150 mg bolus as ordered" },
            { id: "s4", text: "Defibrillate immediately if the patient becomes pulseless during preparation" },
            { id: "s5", text: "Continue post-conversion monitoring and obtain a 12-lead ECG" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Hemodynamically unstable VT (hypotension, altered consciousness) requires immediate team activation. Do not delay to attempt pharmacologic conversion.",
            s2: "Synchronized cardioversion is the primary treatment for unstable VT with a pulse. Synchronization prevents shocking during the relative refractory period.",
            s3: "IV amiodarone is administered after initial cardioversion to maintain normal rhythm and prevent recurrence.",
            s4: "If the patient deteriorates to pulseless VT/VF at any point during the process, immediately switch to unsynchronized defibrillation per ACLS guidelines.",
            s5: "After conversion, continuous monitoring detects recurrence. A 12-lead ECG documents the restored rhythm and identifies any new ischemic changes."
        },
        testTakingTip: "Unstable VT with a pulse: call for help → synchronized cardioversion → antiarrhythmic → defibrillate if pulseless → post-conversion care. The key word is 'synchronized' — only used when there IS a pulse.",
        relatedGuide: "mi.html",
        relatedGuideSection: "complications"
    },

    {
        id: "mi-qb-016",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with an acute inferior STEMI develops sudden bradycardia (HR 34), BP 68/40, and becomes unresponsive. The monitor shows third-degree heart block. Place the emergency interventions in priority order.",
        options: [
            { id: "s1", text: "Begin CPR if the patient becomes pulseless; call a code" },
            { id: "s2", text: "Administer atropine 1 mg IV push as the first-line drug for symptomatic bradycardia" },
            { id: "s3", text: "Initiate transcutaneous pacing if atropine is ineffective" },
            { id: "s4", text: "Prepare for transvenous pacemaker insertion by the cardiologist" }
        ],
        correct: ["s1", "s2", "s3", "s4"],
        rationale: {
            s1: "Patient is unresponsive with profound bradycardia and hypotension — check for a pulse and begin CPR if absent. Activate the code team immediately.",
            s2: "Atropine is the first-line pharmacologic intervention for symptomatic bradycardia per ACLS. It increases heart rate by blocking vagal tone at the AV node.",
            s3: "If atropine fails, transcutaneous (external) pacing provides electrical stimulation to maintain cardiac output as a bridge to definitive therapy.",
            s4: "Transvenous pacing is the definitive treatment for complete heart block complicating inferior MI. It provides reliable, adjustable pacing until the conduction system recovers or a permanent pacemaker is placed."
        },
        testTakingTip: "Symptomatic bradycardia algorithm: assess/CPR → atropine → transcutaneous pacing → transvenous pacing. Inferior MIs commonly cause AV block because the RCA supplies the AV node.",
        relatedGuide: "mi.html",
        relatedGuideSection: "complications"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "mi-qb-017",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each clinical presentation, identify whether it is a typical or atypical presentation of myocardial infarction.",
        columns: ["Typical Presentation", "Atypical Presentation"],
        rows: [
            { id: "r1", text: "Crushing substernal chest pressure radiating to the left arm and jaw", correct: "Typical Presentation" },
            { id: "r2", text: "Sudden onset of severe indigestion with nausea and diaphoresis in a 68-year-old woman", correct: "Atypical Presentation" },
            { id: "r3", text: "Severe chest heaviness with shortness of breath and a sense of impending doom", correct: "Typical Presentation" },
            { id: "r4", text: "Extreme fatigue and shoulder pain without chest discomfort in a diabetic patient", correct: "Atypical Presentation" },
            { id: "r5", text: "Acute onset of dyspnea and unexplained anxiety in an 82-year-old man", correct: "Atypical Presentation" }
        ],
        rationale: {
            correct: "Typical MI presents with substernal chest pain/pressure, radiation to the arm/jaw, dyspnea, and diaphoresis. Atypical presentations are more common in women, elderly, and diabetic patients and include: indigestion/nausea, fatigue, shoulder/back pain without chest pain, and isolated dyspnea or anxiety. Recognition of atypical presentations prevents delayed diagnosis and treatment."
        },
        testTakingTip: "Typical = textbook crushing chest pain + radiation. Atypical = vague GI, fatigue, or pain without classic chest symptoms. High-risk groups for atypical presentation: women, elderly, diabetics. Always suspect MI in these groups.",
        relatedGuide: "mi.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "mi-qb-018",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each post-MI finding, indicate whether it is an expected finding or a finding that should be reported to the provider immediately.",
        columns: ["Expected Finding", "Report Immediately"],
        rows: [
            { id: "r1", text: "Mild chest soreness at the catheterization insertion site on day 1", correct: "Expected Finding" },
            { id: "r2", text: "New-onset systolic murmur heard 3 days after MI", correct: "Report Immediately" },
            { id: "r3", text: "Troponin level that is still elevated 24 hours post-MI", correct: "Expected Finding" },
            { id: "r4", text: "Sudden tearing chest pain radiating to the back with unequal arm BPs", correct: "Report Immediately" },
            { id: "r5", text: "Occasional PVCs on the monitor in the first 24 hours post-MI", correct: "Expected Finding" },
            { id: "r6", text: "Recurrent chest pain with new ST changes on the monitor", correct: "Report Immediately" }
        ],
        rationale: {
            correct: "Expected findings: Mild soreness at the cath site is normal. Troponins remain elevated for 7-14 days after MI. Occasional PVCs are common in the first 24-48 hours due to irritable myocardium. Report immediately: New systolic murmur may indicate papillary muscle rupture or VSD. Tearing chest pain with unequal BPs suggests aortic dissection. Recurrent ST changes indicate reinfarction or extension."
        },
        testTakingTip: "Post-MI: mild site discomfort, lingering troponin elevation, and isolated PVCs are expected. NEW murmurs, NEW pain patterns, and NEW ST changes are emergencies. The word 'new' is your red flag.",
        relatedGuide: "mi.html",
        relatedGuideSection: "complications"
    },

    {
        id: "mi-qb-019",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "matrix",
        difficulty: "application",
        stem: "For each characteristic, indicate whether it applies to STEMI or NSTEMI.",
        columns: ["STEMI", "NSTEMI"],
        rows: [
            { id: "r1", text: "ST segment elevation on 12-lead ECG", correct: "STEMI" },
            { id: "r2", text: "Treatment goal is emergent PCI within 90 minutes of arrival", correct: "STEMI" },
            { id: "r3", text: "ST depression or T-wave inversion on ECG", correct: "NSTEMI" },
            { id: "r4", text: "Typically involves complete coronary artery occlusion", correct: "STEMI" },
            { id: "r5", text: "Medical management with anticoagulation; PCI within 24-72 hours if indicated", correct: "NSTEMI" }
        ],
        rationale: {
            correct: "STEMI involves complete coronary occlusion, shows ST elevation on ECG, and requires emergent reperfusion (PCI <90 min or tPA <30 min). NSTEMI involves partial occlusion, shows ST depression or T-wave changes, and is managed initially with medical therapy (anticoagulation, antiplatelets) with PCI scheduled within 24-72 hours based on risk stratification."
        },
        testTakingTip: "STEMI = complete block = ST elevation = emergent PCI (<90 min). NSTEMI = partial block = ST depression/T-wave changes = medical management first, then planned PCI. The treatment urgency matches the degree of occlusion.",
        relatedGuide: "mi.html",
        relatedGuideSection: "treatment"
    },

    {
        id: "mi-qb-020",
        category: "cardiovascular",
        topic: "mi",
        topicLabel: "Myocardial Infarction",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each post-MI complication, indicate the timeframe when it is most likely to occur.",
        columns: ["First 24-48 Hours", "2-5 Days Post-MI", "1-8 Weeks Post-MI"],
        rows: [
            { id: "r1", text: "Lethal arrhythmias (VF, VT)", correct: "First 24-48 Hours" },
            { id: "r2", text: "Ventricular septal rupture", correct: "2-5 Days Post-MI" },
            { id: "r3", text: "Dressler syndrome (post-MI pericarditis)", correct: "1-8 Weeks Post-MI" },
            { id: "r4", text: "Cardiogenic shock from extensive muscle damage", correct: "First 24-48 Hours" },
            { id: "r5", text: "Papillary muscle rupture", correct: "2-5 Days Post-MI" },
            { id: "r6", text: "Ventricular aneurysm formation", correct: "1-8 Weeks Post-MI" }
        ],
        rationale: {
            correct: "First 24-48 hours: Arrhythmias (VF is the leading cause of pre-hospital MI death) and cardiogenic shock from massive myocardial damage. 2-5 days: Mechanical complications (septal rupture, papillary muscle rupture, free wall rupture) as necrotic tissue weakens before scar formation. 1-8 weeks: Late complications including Dressler syndrome (autoimmune pericarditis) and ventricular aneurysm formation as scar tissue replaces necrotic muscle."
        },
        testTakingTip: "Post-MI complication timeline: Hours = electrical (arrhythmias) and pump failure. Days = mechanical ruptures (weakened dead tissue). Weeks = inflammatory (Dressler) and structural (aneurysm). Knowing the timeline helps you anticipate what to monitor for and when.",
        relatedGuide: "mi.html",
        relatedGuideSection: "complications"
    }

]);
