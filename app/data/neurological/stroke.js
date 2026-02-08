/**
 * Quiz Bank — Stroke
 * The Nursing Collective
 *
 * 20 questions: 11 single, 4 ordering, 5 matrix
 * Difficulty mix: 6 knowledge, 8 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "stroke-qb-001",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing the BE-FAST mnemonic for stroke recognition with a group of community health volunteers. Which symptom is represented by the 'E' in BE-FAST?",
        options: [
            { id: "a", text: "Elevated blood pressure" },
            { id: "b", text: "Eye — sudden vision loss or double vision" },
            { id: "c", text: "Extremity weakness on one side" },
            { id: "d", text: "Emotional lability or sudden crying" }
        ],
        correct: "b",
        rationale: {
            correct: "BE-FAST stands for Balance (sudden loss of balance), Eyes (sudden vision loss or double vision in one or both eyes), Face (facial drooping), Arm (arm weakness/drift), Speech (slurred or absent speech), Time (time to call 911). The 'E' specifically addresses visual disturbances, which can indicate posterior circulation stroke often missed by the older FAST mnemonic."
        },
        testTakingTip: "BE-FAST added Balance and Eyes to the original FAST mnemonic specifically to capture posterior circulation strokes, which present with vertigo, ataxia, and visual changes rather than classic hemiparesis.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "recognition"
    },

    {
        id: "stroke-qb-002",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "application",
        stem: "A 62-year-old patient arrives at the ED with sudden left-sided weakness, slurred speech, and a BP of 210/118 mmHg. CT scan is negative for hemorrhage. The provider orders IV alteplase (tPA). What is the target blood pressure the nurse must achieve BEFORE tPA administration?",
        options: [
            { id: "a", text: "Below 160/90 mmHg" },
            { id: "b", text: "Below 185/110 mmHg" },
            { id: "c", text: "Below 140/90 mmHg" },
            { id: "d", text: "Below 200/120 mmHg" }
        ],
        correct: "b",
        rationale: {
            correct: "Before tPA administration for acute ischemic stroke, blood pressure must be below 185/110 mmHg. After tPA is given, the target becomes below 180/105 mmHg for the first 24 hours. IV labetalol or nicardipine are first-line agents to achieve this. A BP of 210/118 exceeds the threshold and must be lowered before tPA can be safely administered."
        },
        testTakingTip: "Two critical BP numbers for tPA in stroke: <185/110 before giving tPA, <180/105 for the 24 hours after. If BP cannot be controlled, tPA is contraindicated.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "tpa-management"
    },

    {
        id: "stroke-qb-003",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "analysis",
        stem: "A patient received IV tPA 3 hours ago for ischemic stroke. The nurse performs a neurological check and finds the patient's NIHSS score has increased from 8 to 16, the patient is newly somnolent, and vomits once. Which complication does the nurse suspect, and what is the priority action?",
        options: [
            { id: "a", text: "Reocclusion of the cerebral artery; prepare for mechanical thrombectomy" },
            { id: "b", text: "Hemorrhagic conversion; stop the tPA infusion (if still running) and obtain a STAT CT scan" },
            { id: "c", text: "Cerebral vasospasm; administer a calcium channel blocker as ordered" },
            { id: "d", text: "Hypertensive crisis; administer IV nicardipine to rapidly lower BP" }
        ],
        correct: "b",
        rationale: {
            correct: "An acute rise in NIHSS score, new somnolence, and vomiting after tPA administration are classic signs of hemorrhagic conversion (intracranial bleeding). The priority actions are: (1) stop the tPA infusion immediately if still running, (2) obtain a STAT non-contrast CT to confirm bleeding, (3) draw labs including fibrinogen, PT/INR, CBC, and type & screen, and (4) prepare to administer cryoprecipitate or tranexamic acid to reverse the fibrinolytic effect."
        },
        testTakingTip: "Post-tPA deterioration = hemorrhagic conversion until proven otherwise. The triad of worsening neuro status + decreased LOC + vomiting should trigger immediate tPA stoppage and STAT CT. Never wait.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "complications"
    },

    {
        id: "stroke-qb-004",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "application",
        stem: "A patient with a confirmed acute ischemic stroke has an NIHSS score of 18 and a large vessel occlusion on CT angiography. Symptom onset was 5 hours ago and IV tPA was given at hour 3. The patient has not improved. The nurse anticipates which intervention?",
        options: [
            { id: "a", text: "Repeat bolus of IV tPA at a higher dose" },
            { id: "b", text: "Mechanical thrombectomy via endovascular procedure" },
            { id: "c", text: "Decompressive craniectomy to relieve intracranial pressure" },
            { id: "d", text: "Intra-arterial administration of heparin directly at the clot site" }
        ],
        correct: "b",
        rationale: {
            correct: "Mechanical thrombectomy is indicated for large vessel occlusion (LVO) in the anterior circulation within up to 24 hours of symptom onset (per DAWN/DEFUSE-3 trials) in eligible patients. With an NIHSS of 18 and confirmed LVO that did not respond to IV tPA, endovascular thrombectomy is the next step. A second dose of tPA is never given. Decompressive craniectomy is for malignant cerebral edema, not clot removal."
        },
        testTakingTip: "tPA window: up to 4.5 hours. Thrombectomy window: up to 24 hours for select patients with large vessel occlusion. If tPA fails and there's a confirmed LVO, think thrombectomy.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "treatment"
    },

    {
        id: "stroke-qb-005",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is preparing to perform a dysphagia screening on a patient admitted with an acute stroke. Which action should the nurse take BEFORE offering the patient any oral intake?",
        options: [
            { id: "a", text: "Position the patient supine and offer small sips of water" },
            { id: "b", text: "Administer a formal bedside swallow screen and observe for signs of aspiration" },
            { id: "c", text: "Request a dietary consult for a pureed diet order" },
            { id: "d", text: "Check the patient's gag reflex by touching the posterior pharynx" }
        ],
        correct: "b",
        rationale: {
            correct: "All stroke patients must be screened for dysphagia BEFORE any oral intake (food, fluids, or oral medications) to prevent aspiration pneumonia. A bedside swallow screen (e.g., sips of water while observing for coughing, wet voice quality, or difficulty) must be performed first. The gag reflex is NOT a reliable indicator of swallowing ability. The patient should be upright (not supine) for any swallowing assessment."
        },
        testTakingTip: "NPO until swallow screen is a core stroke nursing intervention. Gag reflex does NOT equal safe swallowing — many patients with intact gag reflexes still aspirate silently.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "stroke-qb-006",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "analysis",
        stem: "A patient presents with sudden severe headache ('worst headache of my life'), vomiting, neck stiffness, and a BP of 238/130 mmHg. CT scan shows subarachnoid blood. Regarding blood pressure management, which target is most appropriate for this patient?",
        options: [
            { id: "a", text: "Below 185/110 mmHg in preparation for IV tPA" },
            { id: "b", text: "Below 140 mmHg systolic to reduce risk of rebleeding" },
            { id: "c", text: "Below 160/90 mmHg to maintain cerebral perfusion" },
            { id: "d", text: "No blood pressure lowering; permissive hypertension is required" }
        ],
        correct: "b",
        rationale: {
            correct: "For hemorrhagic stroke (including subarachnoid hemorrhage), current guidelines recommend lowering systolic BP to below 140 mmHg to reduce hematoma expansion and rebleeding risk. This differs from ischemic stroke, where permissive hypertension (up to 220/120) is allowed if tPA is not given. The 185/110 target is specific to pre-tPA ischemic stroke management. IV nicardipine or clevidipine are preferred agents for precise BP control."
        },
        testTakingTip: "Hemorrhagic stroke BP target: SBP <140 mmHg (aggressive lowering to prevent rebleeding). Ischemic stroke without tPA: allow up to 220/120. Ischemic with tPA: <185/110 before, <180/105 after. Know all three targets.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "hemorrhagic-management"
    },

    {
        id: "stroke-qb-007",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "application",
        stem: "A patient with right-hemisphere ischemic stroke demonstrates left-sided neglect. The nurse enters the room to perform an assessment. Which approach best addresses this deficit?",
        options: [
            { id: "a", text: "Approach the patient from the left side to stimulate awareness of the neglected side" },
            { id: "b", text: "Approach from the right side initially, then gradually introduce stimuli to the left side" },
            { id: "c", text: "Keep all personal items on the left side to force the patient to turn toward the neglected side" },
            { id: "d", text: "Patch the patient's right eye to force visual attention to the left" }
        ],
        correct: "b",
        rationale: {
            correct: "For patients with hemispatial neglect (typically left-sided neglect from right-hemisphere stroke), the nurse should initially approach from the unaffected (right) side to establish communication and safety, then gradually introduce stimuli from the affected (left) side to promote rehabilitation. Placing items only on the neglected side can be frustrating and unsafe. Forced eye patching is not standard nursing practice for hemispatial neglect."
        },
        testTakingTip: "Neglect = the patient is unaware of one side. Approach from the intact side first for safety and communication, then work on rehabilitating attention to the neglected side progressively.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "stroke-qb-008",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for a patient with expressive aphasia following a left-hemisphere stroke. Which communication strategy is most appropriate?",
        options: [
            { id: "a", text: "Speak loudly and slowly, repeating words until the patient responds" },
            { id: "b", text: "Ask open-ended questions to encourage the patient to practice speaking" },
            { id: "c", text: "Use yes/no questions, picture boards, and allow ample time for responses" },
            { id: "d", text: "Have family members interpret the patient's needs and speak on their behalf" }
        ],
        correct: "c",
        rationale: {
            correct: "Expressive (Broca's) aphasia means the patient understands language but has difficulty producing speech. Using yes/no questions reduces the verbal demand, picture boards provide alternative communication, and allowing extra time respects the patient's processing needs. Speaking loudly is inappropriate (hearing is not impaired). Open-ended questions increase frustration. Relying on family to interpret removes patient autonomy."
        },
        testTakingTip: "Expressive aphasia = understands you but can't get words out. Simplify output demands (yes/no, point, write). Receptive aphasia = doesn't understand. Simplify input (short sentences, gestures, pictures). Tailor strategy to the type.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "communication"
    },

    {
        id: "stroke-qb-009",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "analysis",
        stem: "A 48-year-old patient arrives at the ED reporting dizziness, severe ataxia, diplopia, and difficulty swallowing that started 2 hours ago. The patient has no facial droop or arm weakness. BP is 178/96 mmHg. The ED nurse suspects a stroke. Which stroke territory should the nurse suspect?",
        options: [
            { id: "a", text: "Left middle cerebral artery (MCA) territory" },
            { id: "b", text: "Right anterior cerebral artery (ACA) territory" },
            { id: "c", text: "Posterior circulation (vertebrobasilar) territory" },
            { id: "d", text: "Left internal carotid artery (ICA) territory" }
        ],
        correct: "c",
        rationale: {
            correct: "Dizziness/vertigo, ataxia (cerebellar dysfunction), diplopia (cranial nerve involvement), and dysphagia (brainstem involvement) WITHOUT classic hemiparesis are hallmarks of posterior circulation (vertebrobasilar) stroke. This territory supplies the brainstem, cerebellum, and occipital lobes. Posterior strokes are frequently misdiagnosed as inner ear problems or vertigo because they lack the classic face-arm-speech deficits of anterior circulation strokes."
        },
        testTakingTip: "The '5 D's' of posterior stroke: Dizziness, Diplopia, Dysarthria, Dysphagia, Dystaxia (ataxia). No classic hemiparesis. This is why BE-FAST added Balance and Eyes — to catch these presentations.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "stroke-qb-010",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "application",
        stem: "A patient with a newly diagnosed ischemic stroke secondary to atrial fibrillation is being started on warfarin for secondary prevention. Which patient statement indicates understanding of the medication regimen?",
        options: [
            { id: "a", text: "I will take extra doses if I miss a day to keep my blood thin enough" },
            { id: "b", text: "I should eat consistent amounts of green leafy vegetables rather than avoiding them completely" },
            { id: "c", text: "I can stop taking this medication once my INR reaches the target range" },
            { id: "d", text: "I should take aspirin along with warfarin every day for extra protection" }
        ],
        correct: "b",
        rationale: {
            correct: "Patients on warfarin should maintain a CONSISTENT vitamin K intake rather than eliminating green vegetables entirely. Sudden changes in vitamin K intake cause INR fluctuations. Doubling doses is dangerous (bleeding risk). Warfarin is a lifelong therapy for atrial fibrillation-related stroke prevention. Adding aspirin without provider direction increases bleeding risk without proven benefit for most A-fib patients."
        },
        testTakingTip: "Warfarin teaching: consistency is key. Don't eliminate vitamin K foods, just keep intake stable. INR target for A-fib is 2.0-3.0. Warfarin is lifelong for A-fib stroke prevention.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "secondary-prevention"
    },

    {
        id: "stroke-qb-011",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "single",
        difficulty: "analysis",
        stem: "A 9-year-old child with sickle cell disease presents with sudden right-sided hemiparesis, slurred speech, and a severe headache. The nurse recognizes this presentation as a likely stroke. Which factor in this child's history is the primary risk factor for stroke?",
        options: [
            { id: "a", text: "Recent dehydration episode from a viral illness" },
            { id: "b", text: "Chronic hemolytic anemia with abnormal transcranial Doppler velocities" },
            { id: "c", text: "Prior hospitalization for acute chest syndrome" },
            { id: "d", text: "Non-adherence to folic acid supplementation" }
        ],
        correct: "b",
        rationale: {
            correct: "Children with sickle cell disease have a significantly elevated stroke risk due to sickling-induced vasculopathy of cerebral vessels. Abnormal transcranial Doppler (TCD) velocities (>200 cm/sec in the MCA or ICA) are the strongest predictor of stroke in SCD children and indicate cerebral vessel narrowing. The STOP trial demonstrated that chronic transfusion therapy in children with abnormal TCD reduces stroke risk by 90%. While dehydration and acute chest syndrome are SCD complications, abnormal TCD is the primary identified stroke risk factor."
        },
        testTakingTip: "Sickle cell + pediatric stroke: transcranial Doppler is the screening tool. Abnormal velocities (>200 cm/sec) = high stroke risk = chronic transfusions to keep HbS <30%. Annual TCD screening begins at age 2.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "pediatric"
    },

    // ── ORDERING (4) ─────────────────────────────────────────

    {
        id: "stroke-qb-012",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "ordering",
        difficulty: "application",
        stem: "A patient presents to the ED with sudden onset left-sided weakness and slurred speech that began 90 minutes ago. Place the nurse's actions in the correct priority order for the acute stroke response.",
        options: [
            { id: "s1", text: "Establish IV access (two large-bore IVs) and draw blood for glucose, CBC, PT/INR, troponin" },
            { id: "s2", text: "Perform a rapid neurological assessment using the NIHSS" },
            { id: "s3", text: "Activate the stroke code and alert the stroke team" },
            { id: "s4", text: "Obtain a STAT non-contrast CT head to rule out hemorrhage" },
            { id: "s5", text: "Verify the last known well time and confirm no tPA contraindications" }
        ],
        correct: ["s3", "s2", "s1", "s5", "s4"],
        rationale: {
            s3: "Activating the stroke code immediately mobilizes the entire stroke team — neurologist, CT tech, pharmacy, and lab — and initiates the 'door-to-needle' clock. Every minute of delay = more brain tissue lost.",
            s2: "A rapid NIHSS establishes baseline severity and guides treatment decisions. This can be done in 5-8 minutes and happens concurrently with other team preparations.",
            s1: "IV access allows lab draws and future medication administration. Glucose must be checked immediately (hypoglycemia mimics stroke). PT/INR determines if coagulopathy contraindicates tPA.",
            s5: "The exact last known well time determines tPA eligibility (within 4.5 hours). Contraindication screening (recent surgery, active bleeding, anticoagulant use) must happen before the CT.",
            s4: "CT is the definitive step that differentiates ischemic from hemorrhagic stroke. tPA can only be given after CT confirms no hemorrhage. Target: door-to-CT < 25 minutes."
        },
        testTakingTip: "Acute stroke sequence: Activate team → Assess severity (NIHSS) → Access and labs → Verify eligibility → CT scan → tPA decision. Remember: 'Time is brain.' Door-to-needle goal is under 60 minutes.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "stroke-qb-013",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is preparing to administer IV alteplase (tPA) to a patient with acute ischemic stroke. Place the administration steps in the correct order.",
        options: [
            { id: "s1", text: "Confirm blood pressure is below 185/110 mmHg" },
            { id: "s2", text: "Verify CT results (no hemorrhage) and check blood glucose and INR results" },
            { id: "s3", text: "Administer 10% of the total dose as an IV bolus over 1 minute" },
            { id: "s4", text: "Infuse the remaining 90% of the dose over 60 minutes via IV pump" },
            { id: "s5", text: "Begin post-tPA neurological checks every 15 minutes for the first 2 hours" }
        ],
        correct: ["s2", "s1", "s3", "s4", "s5"],
        rationale: {
            s2: "CT must confirm NO hemorrhage before tPA can be given. Blood glucose must be checked (>50 mg/dL required) and INR must be <1.7. These are absolute prerequisites.",
            s1: "BP must be below 185/110 mmHg. If elevated, IV labetalol or nicardipine is given first. tPA with uncontrolled hypertension dramatically increases hemorrhagic conversion risk.",
            s3: "The bolus is 10% of the calculated dose (0.9 mg/kg, max 90 mg) given as a push over 1 minute. This rapidly achieves therapeutic fibrinolytic levels.",
            s4: "The remaining 90% infuses over exactly 60 minutes. The nurse monitors the patient continuously during the infusion for signs of bleeding or neurological change.",
            s5: "Post-tPA monitoring: neuro checks (NIHSS) every 15 minutes for 2 hours, then every 30 minutes for 6 hours, then hourly for 16 hours. Any deterioration = stop infusion, STAT CT."
        },
        testTakingTip: "tPA administration: verify labs/CT → confirm BP → 10% bolus over 1 minute → 90% infusion over 60 minutes → q15min neuro checks. The dose is 0.9 mg/kg with a maximum of 90 mg total.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "tpa-management"
    },

    {
        id: "stroke-qb-014",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "ordering",
        difficulty: "knowledge",
        stem: "Place the following post-stroke rehabilitation milestones in the typical progression order from acute care through community reintegration.",
        options: [
            { id: "s1", text: "Bedside PT/OT evaluation and early mobilization within 24-48 hours" },
            { id: "s2", text: "Transfer to inpatient rehabilitation facility for intensive daily therapy" },
            { id: "s3", text: "Home health therapy focusing on ADLs and home safety modifications" },
            { id: "s4", text: "Outpatient therapy focusing on community reintegration, driving evaluation, and return to work" },
            { id: "s5", text: "Speech-language pathology evaluation for dysphagia and communication deficits in acute care" }
        ],
        correct: ["s1", "s5", "s2", "s3", "s4"],
        rationale: {
            s1: "Early mobilization (within 24-48 hours if medically stable) prevents DVT, pneumonia, and deconditioning. PT/OT assess functional baseline at the bedside.",
            s5: "SLP evaluation in acute care addresses immediate safety concerns: swallowing safety (aspiration risk) and communication ability for participating in care decisions.",
            s2: "Inpatient rehab (minimum 3 hours of therapy/day) provides intensive, structured recovery for patients who can participate. Typically begins once the patient is medically stable.",
            s3: "Home health bridges the gap between inpatient rehab and independence. Focus shifts to functional tasks in the patient's own environment and caregiver training.",
            s4: "Outpatient therapy addresses higher-level community skills: driving safety, work tasks, social participation. This represents the final phase of formal rehabilitation."
        },
        testTakingTip: "Stroke rehab continuum: acute bedside → SLP for swallowing safety → inpatient rehab → home health → outpatient community reintegration. Early mobilization within 24-48 hours is standard of care.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "stroke-qb-015",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient who received IV tPA 4 hours ago suddenly develops a severe headache, BP rises to 200/110 mmHg, and the NIHSS worsens from 6 to 14. Place the nurse's interventions in the correct priority order.",
        options: [
            { id: "s1", text: "Stop the tPA infusion immediately (if still running)" },
            { id: "s2", text: "Notify the provider and request a STAT non-contrast CT of the head" },
            { id: "s3", text: "Draw STAT labs: fibrinogen, PT/INR, aPTT, CBC with platelets, type and crossmatch" },
            { id: "s4", text: "Prepare to administer cryoprecipitate and tranexamic acid per protocol" },
            { id: "s5", text: "Perform a focused neurological assessment and document the exact time of deterioration" }
        ],
        correct: ["s1", "s5", "s2", "s3", "s4"],
        rationale: {
            s1: "If the tPA infusion is still running, stopping it immediately is the absolute first priority to prevent further fibrinolysis and worsening hemorrhage.",
            s5: "A rapid focused neuro assessment documents the new deficit severity and exact time of change. This is essential for comparison and guides the urgency of subsequent interventions.",
            s2: "STAT CT confirms the suspected hemorrhagic conversion. The provider must be notified immediately for definitive management decisions including possible neurosurgical consultation.",
            s3: "Lab draws assess the coagulopathy: fibrinogen level guides replacement therapy, PT/INR and aPTT assess clotting function, CBC determines if thrombocytopenia is contributing, type and crossmatch prepares for possible transfusion.",
            s4: "Cryoprecipitate replaces fibrinogen (target >200 mg/dL); tranexamic acid inhibits further fibrinolysis. These reverse the tPA effect. Platelet transfusion if count is low. Neurosurgery may be consulted."
        },
        testTakingTip: "Post-tPA hemorrhage protocol: STOP the drug → Assess and document → CT and notify → Labs to quantify coagulopathy → Reversal agents. Remember: every second of continued tPA infusion worsens hemorrhage.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "complications"
    },

    // ── MATRIX (5) ───────────────────────────────────────────

    {
        id: "stroke-qb-016",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each clinical characteristic, indicate whether it is primarily associated with ischemic stroke or hemorrhagic stroke.",
        columns: ["Ischemic Stroke", "Hemorrhagic Stroke"],
        rows: [
            { id: "r1", text: "Gradual onset of symptoms, may have preceding TIAs", correct: "Ischemic Stroke" },
            { id: "r2", text: "Sudden 'thunderclap' headache described as the worst ever experienced", correct: "Hemorrhagic Stroke" },
            { id: "r3", text: "CT scan shows a hyperdense (bright white) area in the brain", correct: "Hemorrhagic Stroke" },
            { id: "r4", text: "Most commonly caused by atrial fibrillation or atherosclerosis", correct: "Ischemic Stroke" },
            { id: "r5", text: "IV alteplase (tPA) is a primary treatment if given within the time window", correct: "Ischemic Stroke" },
            { id: "r6", text: "BP target is systolic below 140 mmHg to prevent hematoma expansion", correct: "Hemorrhagic Stroke" }
        ],
        rationale: {
            correct: "Ischemic strokes (87% of all strokes) are caused by clots blocking blood flow, often have gradual onset or preceding TIAs, and are treated with tPA to dissolve the clot. Hemorrhagic strokes involve bleeding into the brain, present with sudden severe headache, show bright white (hyperdense) areas on CT, and require aggressive BP lowering (SBP <140) to prevent hematoma expansion. tPA is absolutely contraindicated in hemorrhagic stroke."
        },
        testTakingTip: "Key differentiators: Ischemic = clot, gradual, CT initially normal, tPA is treatment. Hemorrhagic = bleed, sudden severe headache, CT shows bright white, tPA is contraindicated. CT is the definitive differentiator.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "stroke-qb-017",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is monitoring patients after IV tPA administration. For each finding, indicate whether it is an 'Expected/Monitor' finding or a 'Notify Provider Immediately' finding.",
        columns: ["Expected — Monitor", "Notify Provider Immediately"],
        rows: [
            { id: "r1", text: "Small amount of oozing at the IV insertion site", correct: "Expected — Monitor" },
            { id: "r2", text: "NIHSS score decreased from 14 to 10 (improvement)", correct: "Expected — Monitor" },
            { id: "r3", text: "New onset of severe headache with projectile vomiting", correct: "Notify Provider Immediately" },
            { id: "r4", text: "Blood pressure of 174/102 mmHg during the infusion", correct: "Expected — Monitor" },
            { id: "r5", text: "NIHSS score increases from 8 to 15 with new pupil asymmetry", correct: "Notify Provider Immediately" },
            { id: "r6", text: "Gum bleeding when performing oral care", correct: "Expected — Monitor" }
        ],
        rationale: {
            correct: "Expected findings post-tPA include minor bleeding at puncture sites (oozing, gum bleeding), neurological improvement (decreasing NIHSS), and BP below 180/105 (174/102 is within target). Notify immediately for: severe headache with vomiting (suggests intracranial hemorrhage), worsening neuro exam with pupil changes (herniation signs from hemorrhagic conversion). These require STAT CT and possible reversal of tPA."
        },
        testTakingTip: "Post-tPA: minor oozing and improving neuro status = expected. Worsening neuro status, severe headache, vomiting, or significant bleeding = emergency. NIHSS should improve or stay stable, never worsen.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "tpa-management"
    },

    {
        id: "stroke-qb-018",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each NIHSS component, match it to what the nurse is assessing.",
        columns: ["Level of Consciousness", "Motor Function", "Language/Communication", "Visual/Sensory"],
        rows: [
            { id: "r1", text: "Asking the patient to state their age and the current month", correct: "Level of Consciousness" },
            { id: "r2", text: "Having the patient hold each arm extended at 90 degrees for 10 seconds", correct: "Motor Function" },
            { id: "r3", text: "Asking the patient to describe a picture and name common objects", correct: "Language/Communication" },
            { id: "r4", text: "Testing visual fields by having the patient count fingers in each quadrant", correct: "Visual/Sensory" },
            { id: "r5", text: "Asking the patient to read and repeat a list of words clearly", correct: "Language/Communication" }
        ],
        rationale: {
            correct: "The NIHSS is a 15-item scale (scored 0-42) assessing stroke severity across multiple domains. LOC items include orientation questions (age, month) and command following. Motor items include arm and leg drift testing (hold extended limbs against gravity). Language items include naming objects, describing pictures, and reading sentences (assesses aphasia and dysarthria). Visual items include visual field testing by confrontation."
        },
        testTakingTip: "NIHSS scores: 0 = no deficit, 1-4 = minor, 5-15 = moderate, 16-20 = moderate-severe, 21-42 = severe. Higher scores may qualify for thrombectomy. The nurse must perform the NIHSS exactly as standardized.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "stroke-qb-019",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each tPA scenario, indicate whether the patient is 'Eligible for IV tPA' or 'tPA is Contraindicated.'",
        columns: ["Eligible for IV tPA", "tPA is Contraindicated"],
        rows: [
            { id: "r1", text: "Ischemic stroke with symptom onset 3 hours ago, BP 178/104, INR 1.2, glucose 110", correct: "Eligible for IV tPA" },
            { id: "r2", text: "Ischemic stroke with symptom onset 2 hours ago, patient had craniotomy 2 months ago", correct: "tPA is Contraindicated" },
            { id: "r3", text: "Ischemic stroke with symptom onset 4 hours ago, BP lowered to 182/108, platelet count 120,000", correct: "Eligible for IV tPA" },
            { id: "r4", text: "Ischemic stroke with unknown onset time, patient woke up with symptoms", correct: "tPA is Contraindicated" },
            { id: "r5", text: "Ischemic stroke with symptom onset 3 hours ago, patient is on warfarin with INR of 2.4", correct: "tPA is Contraindicated" }
        ],
        rationale: {
            correct: "tPA eligibility requires: confirmed ischemic stroke, within 4.5-hour window from known onset, BP <185/110, INR <1.7, platelets >100,000, no recent intracranial surgery (within 3 months). Patient 1: meets all criteria. Patient 2: craniotomy within 3 months is an absolute contraindication. Patient 3: BP of 182/108 is below 185/110 threshold, platelets are adequate. Patient 4: unknown onset (wake-up stroke) cannot be given standard tPA (though MRI-based protocols exist at some centers). Patient 5: INR 2.4 exceeds the 1.7 maximum, indicating supratherapeutic anticoagulation."
        },
        testTakingTip: "tPA contraindications to memorize: INR >1.7, platelets <100K, BP >185/110 that can't be lowered, intracranial surgery within 3 months, active bleeding, unknown symptom onset, and stroke/head trauma within 3 months.",
        relatedGuide: "stroke.html",
        relatedGuideSection: "tpa-management"
    },

    {
        id: "stroke-qb-020",
        category: "neurological",
        topic: "stroke",
        topicLabel: "Stroke",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is positioning patients with different types of strokes. For each patient scenario, indicate whether the head of bed should be 'Flat to 30 degrees' or 'Elevated 30 degrees or higher.'",
        columns: ["Flat to 30 Degrees", "Elevated 30 Degrees or Higher"],
        rows: [
            { id: "r1", text: "Acute ischemic stroke within the first 24 hours (no increased ICP signs)", correct: "Flat to 30 Degrees" },
            { id: "r2", text: "Hemorrhagic stroke with signs of increased intracranial pressure", correct: "Elevated 30 Degrees or Higher" },
            { id: "r3", text: "Post-tPA patient with stable neurological status and no evidence of hemorrhage", correct: "Flat to 30 Degrees" },
            { id: "r4", text: "Large MCA territory stroke with cerebral edema developing on day 3", correct: "Elevated 30 Degrees or Higher" },
            { id: "r5", text: "Ischemic stroke patient beginning oral feeding after passing swallow screen", correct: "Elevated 30 Degrees or Higher" }
        ],
        rationale: {
            correct: "In acute ischemic stroke without increased ICP, keeping the HOB flat to 30 degrees maximizes cerebral blood flow to the ischemic penumbra. For hemorrhagic stroke or any stroke with increased ICP/cerebral edema, the HOB should be elevated to at least 30 degrees to promote venous drainage and reduce ICP. During oral feeding, HOB must be elevated regardless of stroke type to prevent aspiration. Head position should always be midline to facilitate venous drainage."
        },
        testTakingTip: "Ischemic stroke = flat to maximize blood flow to the penumbra. Hemorrhagic or increased ICP = elevate HOB to promote venous drainage. Eating = always upright. When in doubt, consider whether the priority is perfusion (flat) or pressure relief (elevate).",
        relatedGuide: "stroke.html",
        relatedGuideSection: "positioning"
    }

]);
