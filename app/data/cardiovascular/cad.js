/**
 * Quiz Bank — Coronary Artery Disease
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "cad-qb-001",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is providing education about coronary artery disease. The patient asks what happens inside the arteries to cause the disease. Which explanation by the nurse most accurately describes the pathophysiology of atherosclerosis?",
        options: [
            { id: "a", text: "A blood clot forms suddenly and blocks a normal coronary artery" },
            { id: "b", text: "Fatty plaques gradually accumulate within the arterial intima, narrowing the lumen over time" },
            { id: "c", text: "The arterial walls weaken and dilate, reducing blood flow to the heart" },
            { id: "d", text: "Calcium deposits in the pericardium compress the coronary arteries externally" }
        ],
        correct: "b",
        rationale: {
            correct: "Atherosclerosis is a chronic inflammatory process in which lipid-laden plaques (atheromas) accumulate within the tunica intima of arteries, progressively narrowing the lumen. This process involves endothelial injury, lipid infiltration, smooth muscle cell migration, and fibrous cap formation. A blood clot may form on a ruptured plaque (triggering ACS) but is not the underlying disease process."
        },
        testTakingTip: "Atherosclerosis = chronic plaque buildup (the disease). Thrombosis = acute clot on a ruptured plaque (the complication). Know the difference for pathophysiology questions.",
        relatedGuide: "cad.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "cad-qb-002",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "application",
        stem: "A 62-year-old woman with diabetes presents to the emergency department with fatigue, nausea, jaw pain, and diaphoresis for 3 hours. Her ECG shows no ST changes, and her first troponin is normal. She tells the nurse, \"It's probably just the flu — I don't have any chest pain.\" What is the nurse's best response?",
        options: [
            { id: "a", text: "\"Since your troponin is normal and you have no chest pain, you're likely right. Let's treat the nausea.\"" },
            { id: "b", text: "\"Women and patients with diabetes often have atypical heart attack symptoms without classic chest pain. We need to continue monitoring.\"" },
            { id: "c", text: "\"You're not having a heart attack because your ECG is normal.\"" },
            { id: "d", text: "\"Jaw pain isn't related to heart disease. Let's focus on your GI symptoms.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Women and patients with diabetes are more likely to present with atypical ACS symptoms — fatigue, nausea, jaw pain, diaphoresis, and dyspnea — without classic substernal chest pain. A normal initial troponin does NOT rule out MI, as troponin may take 3-6 hours to become detectable. ECG changes may also be absent in NSTEMI. Serial troponins and continued monitoring are essential."
        },
        testTakingTip: "Atypical MI presentations are most common in women, elderly, and diabetic patients. Jaw pain + nausea + diaphoresis in these populations should be treated as ACS until proven otherwise.",
        relatedGuide: "cad.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "cad-qb-003",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient is scheduled for an exercise stress test (treadmill ECG). Which instruction should the nurse include in the preprocedure teaching?",
        options: [
            { id: "a", text: "\"Take your beta-blocker as usual the morning of the test.\"" },
            { id: "b", text: "\"You may eat a large breakfast before the test.\"" },
            { id: "c", text: "\"Wear comfortable walking shoes and loose clothing.\"" },
            { id: "d", text: "\"You will need to remain NPO for 12 hours before the test.\"" }
        ],
        correct: "c",
        rationale: {
            correct: "Patients should wear comfortable walking shoes and loose clothing for exercise stress testing. Beta-blockers are typically held 24-48 hours before (as they blunt heart rate response and reduce test sensitivity). A light meal 2-3 hours before is acceptable — not a large breakfast or prolonged NPO. The test requires reaching target heart rate, so anything limiting that response should be avoided."
        },
        testTakingTip: "Exercise stress test prep: hold beta-blockers (blunt HR response), hold caffeine (interferes with pharmacologic agents), light meal only, comfortable shoes. Pharmacologic stress tests have different prep.",
        relatedGuide: "cad.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "cad-qb-004",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "application",
        stem: "A patient with stable angina and a drug-eluting stent placed 4 months ago is scheduled for an elective cholecystectomy. The surgeon requests discontinuation of all antiplatelet therapy. Which action by the nurse is most appropriate?",
        options: [
            { id: "a", text: "Discontinue aspirin and clopidogrel as requested by the surgeon" },
            { id: "b", text: "Contact the cardiologist to discuss the risks of discontinuing DAPT before 12 months" },
            { id: "c", text: "Hold clopidogrel but continue aspirin through the perioperative period" },
            { id: "d", text: "Administer the antiplatelet medications the morning of surgery, then hold postoperatively" }
        ],
        correct: "b",
        rationale: {
            correct: "Drug-eluting stents (DES) require a minimum of 6-12 months of DAPT (aspirin + P2Y12 inhibitor) to prevent stent thrombosis. Premature discontinuation within this window carries a high risk of acute stent thrombosis, which is often fatal. The nurse should advocate for the patient by contacting the cardiologist — this is a collaborative decision that balances surgical bleeding risk against catastrophic stent thrombosis risk."
        },
        testTakingTip: "When two specialists give conflicting orders about antiplatelet therapy, the nurse's role is to facilitate communication between them. Never unilaterally stop DAPT after stent placement.",
        relatedGuide: "cad.html",
        relatedGuideSection: "management"
    },

    {
        id: "cad-qb-005",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "analysis",
        stem: "A patient in the cardiac catheterization lab develops sudden chest pain, ST-elevation, and hypotension during a PCI procedure. The interventional cardiologist suspects acute vessel closure. Which complication should the nurse be prepared to manage?",
        options: [
            { id: "a", text: "Vasovagal reaction" },
            { id: "b", text: "Contrast-induced nephropathy" },
            { id: "c", text: "Coronary artery dissection or acute stent thrombosis" },
            { id: "d", text: "Cardiac tamponade from pericardial effusion" }
        ],
        correct: "c",
        rationale: {
            correct: "During PCI, acute vessel closure from coronary artery dissection or stent thrombosis presents with sudden chest pain, ST-elevation (indicating acute ischemia), and hemodynamic instability. This is a life-threatening emergency requiring immediate intervention (emergency CABG or repeat PCI). Vasovagal reactions cause bradycardia/hypotension without ST changes. Contrast nephropathy is delayed. Cardiac tamponade presents with JVD and muffled heart sounds."
        },
        testTakingTip: "During or immediately after PCI: sudden chest pain + new ST-elevation = acute vessel closure. This is distinct from the delayed complications like access site bleeding or contrast nephropathy.",
        relatedGuide: "cad.html",
        relatedGuideSection: "interventions"
    },

    {
        id: "cad-qb-006",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with CAD asks the nurse why they need to take a statin when their cholesterol \"isn't that high.\" Which response by the nurse is most accurate?",
        options: [
            { id: "a", text: "\"Statins are only needed when your LDL is above 190 mg/dL.\"" },
            { id: "b", text: "\"Statins both lower cholesterol and stabilize existing plaques, reducing your risk of heart attack.\"" },
            { id: "c", text: "\"Statins are prescribed as a precaution but aren't essential with known CAD.\"" },
            { id: "d", text: "\"Statins replace the need for lifestyle modifications like diet and exercise.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Statins have pleiotropic effects beyond LDL lowering: they stabilize existing atherosclerotic plaques by reducing inflammation, improving endothelial function, and decreasing plaque lipid content. This plaque stabilization reduces the risk of rupture and subsequent MI. Patients with established CAD (secondary prevention) benefit from high-intensity statin therapy regardless of baseline LDL level."
        },
        testTakingTip: "In secondary prevention (known CAD), ALL patients get a statin — the goal is plaque stabilization, not just a cholesterol number. This is one of the strongest evidence-based recommendations in cardiology.",
        relatedGuide: "cad.html",
        relatedGuideSection: "medications"
    },

    {
        id: "cad-qb-007",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "application",
        stem: "A nurse is admitting a patient 6 hours after CABG surgery. The mediastinal chest tube output was 50 mL/hr for the first 4 hours, then suddenly drops to zero output. The patient becomes tachycardic and hypotensive. What should the nurse suspect?",
        options: [
            { id: "a", text: "The chest tube is functioning properly and drainage has resolved" },
            { id: "b", text: "The patient is experiencing cardiac tamponade from clotted chest tube drainage" },
            { id: "c", text: "The patient needs additional IV fluids for postoperative dehydration" },
            { id: "d", text: "The decrease indicates successful hemostasis at the graft sites" }
        ],
        correct: "b",
        rationale: {
            correct: "A sudden cessation of chest tube drainage after CABG, combined with hemodynamic instability (tachycardia, hypotension), strongly suggests the tube is occluded by clot and blood is accumulating in the pericardium — causing cardiac tamponade. This is a surgical emergency. Normal post-CABG drainage tapers gradually; an abrupt stop with deteriorating vitals is an ominous sign. The nurse should immediately notify the surgeon and prepare for possible emergent re-exploration."
        },
        testTakingTip: "Post-cardiac surgery: sudden DROP in chest tube output + hemodynamic decline = tamponade until proven otherwise. Don't be reassured by low output — the question is WHY it dropped.",
        relatedGuide: "cad.html",
        relatedGuideSection: "interventions"
    },

    {
        id: "cad-qb-008",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with chronic stable angina managed with atenolol, isosorbide mononitrate, and aspirin reports new episodes of chest tightness while watching television. The episodes resolve spontaneously after 2-3 minutes. Which assessment finding would concern the nurse MOST about a change in the patient's condition?",
        options: [
            { id: "a", text: "The patient's resting heart rate is 62 bpm" },
            { id: "b", text: "The chest tightness now occurs at rest rather than only with exertion" },
            { id: "c", text: "The patient reports occasional heartburn after large meals" },
            { id: "d", text: "The episodes have occurred twice in the past month" }
        ],
        correct: "b",
        rationale: {
            correct: "The hallmark of stable angina is chest pain that occurs predictably with exertion and resolves with rest or nitroglycerin. When angina begins occurring at rest, this represents a critical transition from stable to UNSTABLE angina — part of the acute coronary syndrome continuum. This change signals plaque instability, possible rupture, and impending MI. A resting HR of 62 is expected on beta-blockers. Heartburn is not cardiac-related in isolation."
        },
        testTakingTip: "Three changes that convert stable → unstable angina: (1) new onset at rest, (2) increasing frequency/duration, (3) reduced response to NTG. Any of these = emergent evaluation needed.",
        relatedGuide: "cad.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "cad-qb-009",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "The nurse is educating a patient about sublingual nitroglycerin storage and handling. Which statement by the patient indicates correct understanding?",
        options: [
            { id: "a", text: "\"I should keep the tablets in my pants pocket so they're always with me.\"" },
            { id: "b", text: "\"I can transfer the tablets to a weekly pill organizer for convenience.\"" },
            { id: "c", text: "\"I should keep them in the original dark glass container and replace them every 6 months.\"" },
            { id: "d", text: "\"As long as the expiration date hasn't passed, the tablets are effective for years.\"" }
        ],
        correct: "c",
        rationale: {
            correct: "Sublingual nitroglycerin is volatile and degrades with exposure to light, heat, moisture, and air. Tablets must be stored in the original dark glass container with the metal cap tightly closed. They should be replaced every 6 months after opening, regardless of the expiration date. Body heat from a pocket and plastic pill organizers both accelerate degradation. A properly potent tablet should produce a slight tingling sensation under the tongue."
        },
        testTakingTip: "NTG storage rules: dark glass container, metal cap tight, replace every 6 months after opening, and the patient should feel a tingling or burning — if not, the medication may be expired.",
        relatedGuide: "cad.html",
        relatedGuideSection: "medications"
    },

    {
        id: "cad-qb-010",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "analysis",
        stem: "A patient 2 days post-CABG develops a temperature of 101.8°F (38.8°C), sternal wound erythema, and purulent drainage. The white blood cell count is 14,200/mm³. Which nursing action takes priority?",
        options: [
            { id: "a", text: "Apply a warm compress to the sternal wound" },
            { id: "b", text: "Administer the scheduled dose of acetaminophen for fever" },
            { id: "c", text: "Obtain wound cultures and notify the surgeon immediately" },
            { id: "d", text: "Increase IV fluid rate to prevent dehydration from fever" }
        ],
        correct: "c",
        rationale: {
            correct: "Sternal wound infection after CABG is a serious complication that can progress to mediastinitis — a life-threatening condition. Fever, erythema, purulent drainage, and leukocytosis at post-op day 2 indicate active infection. The priority is obtaining wound cultures BEFORE starting antibiotics (to identify the causative organism) and notifying the surgeon immediately, as surgical debridement may be required. Acetaminophen and fluids are supportive but not the priority."
        },
        testTakingTip: "Post-surgical infection management: always CULTURE before starting antibiotics. Notify the surgeon because sternal wound infections may require surgical intervention, not just antibiotics.",
        relatedGuide: "cad.html",
        relatedGuideSection: "interventions"
    },

    {
        id: "cad-qb-011",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "single",
        difficulty: "application",
        stem: "A patient in Phase I cardiac rehabilitation (inpatient, 3 days post-MI) asks the nurse when they can resume sexual activity. Which response is most appropriate?",
        options: [
            { id: "a", text: "\"You should avoid sexual activity permanently due to the cardiac risk.\"" },
            { id: "b", text: "\"Most patients can resume sexual activity when they can climb two flights of stairs without symptoms, typically 4-6 weeks after MI.\"" },
            { id: "c", text: "\"You can resume immediately once you are discharged from the hospital.\"" },
            { id: "d", text: "\"Only your cardiologist can determine this, so avoid the topic until your next appointment.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "The general guideline for resuming sexual activity after MI is 4-6 weeks, using the functional benchmark of being able to climb two flights of stairs (approximately 3-5 METs) without symptoms such as chest pain, dyspnea, or excessive fatigue. Sexual activity has a similar metabolic demand. The nurse should provide this education proactively — avoiding the topic leaves the patient without important guidance."
        },
        testTakingTip: "The 'two flights of stairs' test is the standard functional benchmark for resuming sexual activity after cardiac events. This is commonly tested on NCLEX as part of cardiac rehab education.",
        relatedGuide: "cad.html",
        relatedGuideSection: "rehabilitation"
    },

    // ── ORDERING (5) ────────────────────────────────────────

    {
        id: "cad-qb-012",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "ordering",
        difficulty: "application",
        stem: "A patient returns to the cardiac step-down unit after a left heart catheterization via the right femoral artery. Place the nurse's post-procedure assessment actions in priority order.",
        options: [
            { id: "s1", text: "Assess the right femoral access site for hematoma, bleeding, or bruit" },
            { id: "s2", text: "Check bilateral pedal pulses (dorsalis pedis and posterior tibial) and compare to baseline" },
            { id: "s3", text: "Verify the patient maintains bed rest with the affected leg straight per protocol" },
            { id: "s4", text: "Monitor vital signs and assess for back or flank pain" },
            { id: "s5", text: "Encourage oral fluid intake and monitor urine output for contrast clearance" }
        ],
        correct: ["s1", "s2", "s4", "s3", "s5"],
        rationale: {
            s1: "The access site is the most immediate risk. Assess for active bleeding, expanding hematoma, and bruit (which could indicate AV fistula or pseudoaneurysm). Femoral hemorrhage can be life-threatening.",
            s2: "Distal pulse assessment determines whether the catheterization caused arterial occlusion, embolism, or vasospasm. Compare to the pre-procedure baseline. An absent or diminished pulse requires immediate intervention.",
            s4: "Vital signs detect hemodynamic instability from occult bleeding. Back pain with hypotension may indicate retroperitoneal hemorrhage — a complication where the access site appears dry but blood tracks into the retroperitoneal space.",
            s3: "Ensuring proper positioning (leg straight, HOB ≤30 degrees) prevents disruption of the arterial closure at the access site. This is ongoing but follows the initial assessment.",
            s5: "Contrast clearance through adequate hydration protects the kidneys. Monitor for contrast-induced nephropathy (rising creatinine 24-48 hours post-procedure). This is important but not the immediate priority."
        },
        testTakingTip: "Post-cath priorities: access site → distal perfusion → hemodynamics → positioning → hydration. Always think proximal-to-distal and life-threatening-to-supportive.",
        relatedGuide: "cad.html",
        relatedGuideSection: "interventions"
    },

    {
        id: "cad-qb-013",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with known CAD arrives at the emergency department reporting substernal chest pressure radiating to the left arm for 45 minutes, unrelieved by rest. The ECG shows 3 mm ST-elevation in leads II, III, and aVF. Place the nurse's initial actions in the correct sequence (assuming no contraindications).",
        options: [
            { id: "s1", text: "Administer aspirin 325 mg chewed and sublingual nitroglycerin" },
            { id: "s2", text: "Obtain a 12-lead ECG and draw troponin, CBC, BMP, and coagulation studies" },
            { id: "s3", text: "Establish two large-bore IV lines and apply continuous cardiac monitoring" },
            { id: "s4", text: "Administer morphine IV for pain unrelieved by nitroglycerin (if ordered)" },
            { id: "s5", text: "Activate the cardiac catheterization lab for emergent PCI" }
        ],
        correct: ["s3", "s2", "s1", "s5", "s4"],
        rationale: {
            s3: "IV access and monitoring first — you need lines to administer any medications, and cardiac monitoring detects lethal arrhythmias that are common in acute STEMI.",
            s2: "The 12-lead ECG is the single most important diagnostic tool and must be obtained within 10 minutes of arrival. ST-elevation in II, III, aVF indicates an inferior STEMI. Labs confirm and quantify myocardial injury.",
            s1: "Aspirin (chewed for rapid absorption) inhibits platelet aggregation. NTG reduces preload and may relieve pain. These are given as soon as the diagnosis is confirmed — MONA (Morphine, Oxygen, Nitroglycerin, Aspirin) but aspirin and NTG before morphine.",
            s5: "For STEMI, the goal is door-to-balloon time of ≤90 minutes. The cath lab must be activated as soon as STEMI is confirmed on ECG. Every minute of delay increases infarct size.",
            s4: "Morphine is reserved for pain unrelieved by nitroglycerin and is used cautiously (can cause hypotension and respiratory depression). Current guidelines have de-emphasized routine morphine use in ACS."
        },
        testTakingTip: "STEMI protocol: access + monitoring → ECG diagnosis → aspirin + NTG → activate cath lab → morphine if still in pain. Remember: door-to-balloon ≤90 minutes is the target.",
        relatedGuide: "cad.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "cad-qb-014",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A cardiac rehabilitation nurse is explaining the phases of cardiac rehab to a post-MI patient. Place the phases in the correct chronological order.",
        options: [
            { id: "s1", text: "Phase I: Inpatient — supervised bed-to-chair progression, ADL assessment, education on medications and warning signs" },
            { id: "s2", text: "Phase II: Outpatient supervised — monitored exercise 2-3 times/week for 12 weeks with ECG telemetry" },
            { id: "s3", text: "Phase III: Outpatient independent — self-monitored exercise with periodic check-ins, broader activity goals" },
            { id: "s4", text: "Phase IV: Maintenance — lifelong independent exercise and risk factor management with annual evaluations" }
        ],
        correct: ["s1", "s2", "s3", "s4"],
        rationale: {
            s1: "Phase I begins in the hospital within 24-48 hours of the event. Focus is on basic mobility, patient education, and psychological support. Activities progress from bed rest to ambulation in the hallway.",
            s2: "Phase II starts 1-3 weeks after discharge. ECG-monitored exercise sessions allow for safe progressive conditioning while detecting exercise-induced arrhythmias or ischemia. Lasts 12 weeks typically.",
            s3: "Phase III transitions the patient to self-monitored exercise. The patient applies the exercise principles learned in Phase II with less frequent clinical oversight. May last 6-12 months.",
            s4: "Phase IV is lifelong maintenance. The patient independently manages their exercise routine, diet, and risk factors. Annual follow-up evaluates long-term adherence and outcomes."
        },
        testTakingTip: "Cardiac rehab phases: I = inpatient (hospital), II = outpatient supervised (12 weeks with monitoring), III = outpatient independent, IV = lifelong maintenance. Phase II is where the most structured reconditioning occurs.",
        relatedGuide: "cad.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "cad-qb-015",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is caring for a patient who develops ventricular fibrillation on the cardiac monitor 4 hours after PCI. Place the ACLS interventions in the correct sequence.",
        options: [
            { id: "s1", text: "Confirm pulselessness and call for help / activate code team" },
            { id: "s2", text: "Begin high-quality CPR with chest compressions at 100-120/min" },
            { id: "s3", text: "Deliver defibrillation shock as soon as the defibrillator is available" },
            { id: "s4", text: "Resume CPR immediately for 2 minutes, then administer epinephrine 1 mg IV" },
            { id: "s5", text: "Reassess rhythm; if VF persists, deliver second shock and administer amiodarone 300 mg IV" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Confirm the arrest (check pulse for no more than 10 seconds) and activate the code team immediately. Early recognition drives the chain of survival.",
            s2: "High-quality CPR is the foundation. Begin compressions immediately while the defibrillator is being prepared. Push hard (2 inches), push fast (100-120/min), and allow full recoil.",
            s3: "VF is a shockable rhythm. Defibrillation is the definitive treatment and should occur as soon as possible. Each minute of delay reduces survival by 7-10%.",
            s4: "Immediately resume CPR after the shock — do not stop to check a pulse. After 2 minutes of CPR, administer epinephrine 1 mg IV (given every 3-5 minutes throughout the arrest).",
            s5: "After the second rhythm check, if VF persists, deliver another shock. Amiodarone 300 mg IV is the first-line antiarrhythmic for refractory VF/pulseless VT."
        },
        testTakingTip: "VF/pulseless VT algorithm: confirm → CPR → shock → CPR + epi → rhythm check → shock + amiodarone. The rhythm determines the pathway — VF/VT = shock, PEA/asystole = no shock.",
        relatedGuide: "cad.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "cad-qb-016",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "ordering",
        difficulty: "analysis",
        stem: "A nurse is planning discharge education for a patient after their first MI and PCI with stent placement. Place the education topics in the most clinically appropriate priority order.",
        options: [
            { id: "s1", text: "Medication adherence — especially DAPT (aspirin + clopidogrel), statin, and beta-blocker, with emphasis on never stopping without consulting cardiology" },
            { id: "s2", text: "Warning signs requiring 911 — recurrent chest pain, new shortness of breath, dizziness, or diaphoresis" },
            { id: "s3", text: "Follow-up appointments — cardiology visit within 1-2 weeks, cardiac rehab enrollment" },
            { id: "s4", text: "Activity progression — start walking, avoid heavy lifting for 4-6 weeks, resume sexual activity when able to climb 2 flights without symptoms" },
            { id: "s5", text: "Risk factor modification — smoking cessation, dietary changes, weight management, blood pressure and glucose targets" }
        ],
        correct: ["s2", "s1", "s3", "s5", "s4"],
        rationale: {
            s2: "Recognizing life-threatening symptoms and knowing to call 911 is the highest priority. A recurrent MI or stent thrombosis requires immediate action — delays cost lives.",
            s1: "Medication adherence — especially DAPT — is critical. Premature discontinuation of DAPT after DES is the leading preventable cause of stent thrombosis. The patient must understand they should never stop these medications without cardiologist approval.",
            s3: "Follow-up appointments ensure continuity of care. Cardiac rehab enrollment provides structured recovery and has strong mortality benefit.",
            s5: "Risk factor modification addresses the underlying disease process and prevents future events. This is the long-term strategy for secondary prevention.",
            s4: "Activity guidelines help the patient safely resume normal life. While important for quality of life, this is less immediately critical than recognizing emergencies and maintaining medications."
        },
        testTakingTip: "Discharge education priority: survival skills first (when to call 911) → medications → follow-up → lifestyle changes → activity guidelines. Safety always comes before education.",
        relatedGuide: "cad.html",
        relatedGuideSection: "rehabilitation"
    },

    // ── MATRIX (4) ──────────────────────────────────────────

    {
        id: "cad-qb-017",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each characteristic, indicate whether it is associated with stable angina, unstable angina, or NSTEMI.",
        columns: ["Stable Angina", "Unstable Angina", "NSTEMI"],
        rows: [
            { id: "r1", text: "Chest pain occurs predictably with the same level of exertion each time", correct: "Stable Angina" },
            { id: "r2", text: "Positive troponin indicating myocardial cell death", correct: "NSTEMI" },
            { id: "r3", text: "New-onset chest pain at rest that resolves spontaneously", correct: "Unstable Angina" },
            { id: "r4", text: "Pain is completely relieved by rest or 1-2 NTG doses within 5 minutes", correct: "Stable Angina" },
            { id: "r5", text: "ECG shows ST-depression and T-wave inversion with elevated cardiac biomarkers", correct: "NSTEMI" },
            { id: "r6", text: "Increasing frequency of anginal episodes over the past 2 weeks with decreasing exertion threshold", correct: "Unstable Angina" }
        ],
        rationale: {
            correct: "The ACS continuum: Stable angina has a predictable pattern — same exertion triggers it, rest relieves it, troponins are negative. Unstable angina represents plaque instability — rest pain, new-onset, or crescendo pattern, but troponins remain negative (no cell death yet). NSTEMI has the same symptoms as unstable angina BUT with positive troponins indicating actual myocardial necrosis. The distinction between unstable angina and NSTEMI is the troponin result."
        },
        testTakingTip: "The key differentiator: Stable = predictable with exertion. Unstable = unpredictable (rest pain, crescendo) but troponin negative. NSTEMI = unstable pattern + positive troponin. STEMI = ST-elevation on ECG.",
        relatedGuide: "cad.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "cad-qb-018",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each post-procedure comparison, indicate whether the feature is associated with PCI (percutaneous coronary intervention) or CABG (coronary artery bypass grafting).",
        columns: ["PCI", "CABG"],
        rows: [
            { id: "r1", text: "Requires lifelong DAPT (dual antiplatelet therapy) for stent patency", correct: "PCI" },
            { id: "r2", text: "Median sternotomy incision requiring sternal precautions for 6-8 weeks", correct: "CABG" },
            { id: "r3", text: "Patient typically returns to normal activity within 1-2 weeks", correct: "PCI" },
            { id: "r4", text: "Preferred for left main disease or severe multi-vessel disease", correct: "CABG" },
            { id: "r5", text: "Access site assessment (femoral or radial) is a primary nursing concern", correct: "PCI" },
            { id: "r6", text: "Saphenous vein or internal mammary artery used as conduit", correct: "CABG" }
        ],
        rationale: {
            correct: "PCI is less invasive (catheter-based), requires shorter recovery, and depends on DAPT to prevent stent thrombosis. Nursing focus is on access site monitoring. CABG is open-heart surgery with sternotomy — longer recovery (6-8 weeks sternal precautions), but provides more complete revascularization for complex disease. CABG is preferred for left main or 3-vessel disease. The internal mammary artery (IMA) graft has superior long-term patency compared to saphenous vein grafts."
        },
        testTakingTip: "PCI = catheter, quick recovery, access site care, DAPT essential. CABG = sternotomy, longer recovery, sternal precautions, preferred for extensive disease.",
        relatedGuide: "cad.html",
        relatedGuideSection: "interventions"
    },

    {
        id: "cad-qb-019",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each cardiac stress test type, indicate whether it requires the patient to exercise on a treadmill or uses a pharmacologic agent.",
        columns: ["Exercise-Based", "Pharmacologic"],
        rows: [
            { id: "r1", text: "Standard treadmill ECG using Bruce protocol to achieve target heart rate", correct: "Exercise-Based" },
            { id: "r2", text: "Dobutamine stress echocardiography for a patient who cannot walk due to severe arthritis", correct: "Pharmacologic" },
            { id: "r3", text: "Adenosine myocardial perfusion imaging for a patient with left bundle branch block", correct: "Pharmacologic" },
            { id: "r4", text: "Exercise nuclear stress test with technetium-99m sestamibi injection at peak exercise", correct: "Exercise-Based" },
            { id: "r5", text: "Regadenoson SPECT for a patient on a beta-blocker who cannot reach target heart rate", correct: "Pharmacologic" },
            { id: "r6", text: "Treadmill stress echocardiography with pre- and post-exercise wall motion assessment", correct: "Exercise-Based" }
        ],
        rationale: {
            correct: "Exercise-based tests (treadmill ECG, exercise nuclear, exercise echo) require the patient to walk/run to achieve target heart rate (220 - age × 0.85). They provide the most physiologic assessment. Pharmacologic tests (dobutamine, adenosine, regadenoson) are used when patients cannot exercise due to physical limitations or when baseline ECG abnormalities (like LBBB) make exercise ECG uninterpretable. Dobutamine increases cardiac workload; adenosine and regadenoson cause coronary vasodilation."
        },
        testTakingTip: "Can the patient exercise? Yes → exercise-based test. No (arthritis, amputation, debility) → pharmacologic. Has LBBB or paced rhythm? → pharmacologic even if they can walk (exercise ECG is uninterpretable).",
        relatedGuide: "cad.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "cad-qb-020",
        category: "cardiovascular",
        topic: "cad",
        topicLabel: "Coronary Artery Disease",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each medication used in CAD management, indicate its PRIMARY mechanism of benefit.",
        columns: ["Reduces Oxygen Demand", "Prevents Platelet Aggregation", "Stabilizes Plaque / Lowers Lipids", "Reduces Preload"],
        rows: [
            { id: "r1", text: "Metoprolol (beta-blocker)", correct: "Reduces Oxygen Demand" },
            { id: "r2", text: "Clopidogrel (P2Y12 inhibitor)", correct: "Prevents Platelet Aggregation" },
            { id: "r3", text: "Atorvastatin (HMG-CoA reductase inhibitor)", correct: "Stabilizes Plaque / Lowers Lipids" },
            { id: "r4", text: "Sublingual nitroglycerin", correct: "Reduces Preload" },
            { id: "r5", text: "Aspirin (COX inhibitor)", correct: "Prevents Platelet Aggregation" },
            { id: "r6", text: "Diltiazem (non-dihydropyridine CCB)", correct: "Reduces Oxygen Demand" }
        ],
        rationale: {
            correct: "Beta-blockers (metoprolol) and non-DHP CCBs (diltiazem) reduce heart rate and contractility, lowering myocardial oxygen demand — the cornerstone of anti-anginal therapy. Antiplatelets (aspirin, clopidogrel) prevent clot formation on disrupted plaques. Statins stabilize plaques through anti-inflammatory effects and LDL reduction. Nitroglycerin dilates veins (reducing preload/venous return) and coronary arteries, decreasing the heart's workload and improving coronary flow."
        },
        testTakingTip: "CAD drugs by mechanism: Demand reduction (beta-blockers, CCBs) → anti-anginal. Antiplatelet (aspirin, P2Y12) → prevent clots. Statins → plaque stability. Nitrates → reduce preload + dilate coronaries.",
        relatedGuide: "cad.html",
        relatedGuideSection: "medications"
    }

]);
