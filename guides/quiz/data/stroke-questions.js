/**
 * Stroke Quiz — Question Data
 * 10 NCLEX-style questions: 3 Single, 3 SATA, 2 Priority, 2 Analysis
 */

/* exported strokeQuizData */
var strokeQuizData = {
    guideName: "Stroke",
    guideSlug: "stroke",
    category: "Neurological",
    categoryColor: "#8b5cf6",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 68-year-old patient arrives at the emergency department with sudden left-sided facial droop, left arm weakness, and slurred speech. The patient's spouse states symptoms began 90 minutes ago. CT scan shows no hemorrhage. Blood pressure is 192/108 mmHg. What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Administer an antihypertensive to lower the blood pressure below 140/90 mmHg" },
                { id: "b", text: "Prepare for tPA administration — obtain consent and verify inclusion criteria" },
                { id: "c", text: "Administer aspirin 325 mg orally" },
                { id: "d", text: "Position the patient flat to maximize cerebral perfusion" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient has an ischemic stroke (CT negative for hemorrhage) within the 4.5-hour tPA window (90 minutes). The blood pressure of 192/108 is BELOW the tPA threshold of 185/110, meaning tPA can proceed. Time is critical — the door-to-needle goal is <60 minutes. Preparing for tPA is the highest priority.",
                a: "Aggressively lowering BP below 140/90 is dangerous in acute ischemic stroke. Permissive hypertension is maintained to perfuse the ischemic penumbra. The pre-tPA threshold is <185/110, and this patient is already below that. After tPA, the target is <180/105.",
                c: "Aspirin is indicated for ischemic stroke but is CONTRAINDICATED within 24 hours of tPA administration. If tPA is given, aspirin must wait 24 hours. Giving aspirin now would delay or preclude tPA.",
                d: "Flat positioning is sometimes used to improve perfusion, but preparing for definitive thrombolytic therapy takes priority in a tPA-eligible patient. Some patients may also need head of bed elevated 30° for airway protection."
            },
            labValues: [
                { name: "INR (tPA cutoff)", normal: "Must be ≤1.7" },
                { name: "Platelets (tPA cutoff)", normal: "Must be ≥100,000/mm³" },
                { name: "Blood Glucose", normal: "70–100 mg/dL" }
            ],
            testTakingTip: "tPA eligibility checklist: ischemic stroke (CT no hemorrhage), within 4.5 hours, BP <185/110, no contraindications (recent surgery, active bleeding, INR >1.7, platelets <100,000). When a patient meets criteria, preparing for tPA is ALWAYS the priority.",
            guideSection: "Section 4 — tPA Inclusion & Exclusion Criteria",
            guideSectionId: "tpa"
        },
        {
            id: 2,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is assessing a patient using the BE-FAST stroke recognition tool. Which findings would the nurse identify as potential stroke indicators? (Select all that apply.)",
            options: [
                { id: "a", text: "The patient suddenly cannot maintain balance and lists to the right side" },
                { id: "b", text: "The patient reports a sudden, severe headache with no known cause" },
                { id: "c", text: "The patient's left eye shows sudden vision loss" },
                { id: "d", text: "The patient smiles and both sides of the face rise symmetrically" },
                { id: "e", text: "The patient asks to repeat 'The sky is blue in Cincinnati' and says it clearly without slurring" },
                { id: "f", text: "The patient holds both arms outstretched and the left arm drifts downward" }
            ],
            correct: ["a", "c", "f"],
            rationale: {
                correct: "Balance loss, sudden vision changes, and unilateral arm drift are all positive stroke indicators in the BE-FAST assessment.",
                a: "CORRECT — 'B' = Balance. Sudden loss of balance, coordination, or dizziness is a stroke indicator. The patient listing to one side suggests cerebellar or brainstem involvement.",
                b: "This is a potential stroke indicator (especially hemorrhagic stroke — 'worst headache of my life'), but it is not part of the standard BE-FAST mnemonic. It is sometimes added as an additional warning sign.",
                c: "CORRECT — 'E' = Eyes. Sudden vision changes including blurred vision, double vision, or vision loss in one or both eyes indicates possible stroke affecting the visual pathways.",
                d: "NORMAL — Symmetric facial movement is a NEGATIVE finding. A positive 'F' (Face) would show asymmetry — one side drooping when the patient smiles.",
                e: "NORMAL — Clear speech without slurring is a NEGATIVE finding. A positive 'S' (Speech) would show slurred, garbled, or absent speech.",
                f: "CORRECT — 'A' = Arms. Arm drift (one arm drifting downward when both are held outstretched with eyes closed for 10 seconds) indicates contralateral motor weakness, a key stroke sign."
            },
            testTakingTip: "BE-FAST: Balance, Eyes, Face (droop), Arms (drift), Speech (slurred), Time (call 911). For NCLEX, remember that NORMAL findings are negative — only ABNORMAL findings are stroke indicators. Don't be tricked by answer options describing normal exam findings.",
            guideSection: "Section 3 — FAST Assessment Tool",
            guideSectionId: "fast"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is reviewing the chart of a patient admitted with stroke symptoms. The CT scan report states \"hyperdense lesion with surrounding edema in the left basal ganglia, consistent with acute intraparenchymal hemorrhage.\" Which intervention is CONTRAINDICATED for this patient?",
            options: [
                { id: "a", text: "Administering IV antihypertensive to achieve SBP <140 mmHg" },
                { id: "b", text: "Performing neurological assessments every 1-2 hours" },
                { id: "c", text: "Administering alteplase (tPA) intravenously" },
                { id: "d", text: "Elevating the head of the bed to 30 degrees" }
            ],
            correct: "c",
            rationale: {
                correct: "tPA (alteplase) is a thrombolytic that dissolves blood clots. In hemorrhagic stroke, the problem is bleeding, NOT a clot. Administering tPA would worsen the hemorrhage by breaking down clotting factors, potentially causing catastrophic expansion of the bleed. This is an absolute contraindication.",
                a: "Blood pressure management targeting SBP <140 mmHg is a recommended intervention for hemorrhagic stroke to limit hematoma expansion. This is appropriate, not contraindicated.",
                b: "Frequent neurological assessments (NIHSS, GCS, pupil checks) are essential for detecting deterioration such as hematoma expansion or increasing intracranial pressure.",
                d: "Head of bed elevation to 30 degrees promotes venous drainage from the brain, reduces intracranial pressure, and is a standard nursing intervention for both stroke types."
            },
            testTakingTip: "The single most important reason to get an emergent CT scan in acute stroke is to rule out hemorrhage BEFORE giving tPA. Hemorrhagic stroke = NO tPA, EVER. This is the #1 contraindication to remember.",
            guideSection: "Section 2 — Ischemic vs Hemorrhagic Stroke",
            guideSectionId: "types"
        },
        {
            id: 4,
            type: "sata",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient received IV tPA for acute ischemic stroke 2 hours ago. The nurse performs a neurological check and finds that the patient's level of consciousness has decreased, the previously affected arm is now completely flaccid, and the patient vomits. Which actions should the nurse take? (Select all that apply.)",
            options: [
                { id: "a", text: "Stop the tPA infusion if it is still running" },
                { id: "b", text: "Obtain a stat CT scan of the head" },
                { id: "c", text: "Check blood pressure — it should be maintained below 180/105 mmHg" },
                { id: "d", text: "Administer a second dose of tPA to improve clot dissolution" },
                { id: "e", text: "Position the patient on their side to protect the airway" },
                { id: "f", text: "Notify the stroke team/provider immediately" }
            ],
            correct: ["a", "b", "e", "f"],
            rationale: {
                correct: "Neurological deterioration after tPA (decreased LOC, worsening deficits, vomiting) is a warning sign of hemorrhagic conversion — the most dangerous complication of tPA. Immediate actions: stop tPA, get a stat CT to confirm, protect the airway, and notify the stroke team.",
                a: "CORRECT — If the tPA infusion is still running, it must be stopped immediately. The clinical picture suggests hemorrhagic conversion, and continuing tPA would worsen bleeding.",
                b: "CORRECT — A stat (emergent) CT scan is needed to determine if intracranial hemorrhage has occurred. This is the definitive diagnostic step and guides all subsequent treatment.",
                c: "While BP management is important, this statement describes the POST-tPA maintenance goal. In the setting of acute neurological deterioration suggesting hemorrhage, the immediate priority is stopping tPA, imaging, and airway protection — not BP monitoring.",
                d: "INCORRECT — A second dose of tPA is NEVER given. If the patient is deteriorating after tPA, hemorrhagic conversion is suspected. Additional tPA would be catastrophic.",
                e: "CORRECT — The patient is vomiting with a decreased level of consciousness, creating a high aspiration risk. Lateral positioning protects the airway from aspiration.",
                f: "CORRECT — This is a medical emergency requiring immediate physician and stroke team involvement. The patient may need emergent neurosurgical intervention, blood product transfusion, or other life-saving measures."
            },
            testTakingTip: "Post-tPA neurological deterioration = hemorrhagic conversion until proven otherwise. The mnemonic: STOP (infusion), SCAN (CT), SIDE (position), SIGNAL (notify team). Never give more tPA.",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with acute ischemic stroke is NOT a candidate for tPA because symptoms began 6 hours ago. The patient's blood pressure is 208/116 mmHg. The nurse anticipates which blood pressure management approach?",
            options: [
                { id: "a", text: "Aggressively lower BP to <140/90 mmHg within 1 hour" },
                { id: "b", text: "Allow permissive hypertension — do not treat unless BP exceeds 220/120 mmHg" },
                { id: "c", text: "Lower BP to <185/110 mmHg in preparation for possible tPA" },
                { id: "d", text: "Administer a bolus of IV fluids to increase BP further" }
            ],
            correct: "b",
            rationale: {
                correct: "For ischemic stroke patients who are NOT receiving tPA or thrombectomy, permissive hypertension is the standard approach. Blood pressure is not treated unless it exceeds 220/120 mmHg. The elevated BP is the brain's compensatory mechanism to perfuse the ischemic penumbra (the vulnerable tissue surrounding the infarct core). At 208/116, this patient is below the 220/120 threshold.",
                a: "Aggressively lowering BP to <140/90 would reduce cerebral perfusion to the already ischemic brain tissue, potentially worsening the stroke and expanding the infarct. This target is for hemorrhagic stroke, not ischemic without tPA.",
                c: "The <185/110 threshold is specifically for patients who WILL receive tPA. This patient is outside the tPA window and is not a tPA candidate, so this target does not apply.",
                d: "The patient already has severe hypertension. Increasing BP further would not improve outcomes and could cause end-organ damage."
            },
            testTakingTip: "Stroke BP targets are scenario-specific: Pre-tPA = <185/110. During/after tPA = <180/105. Ischemic, no tPA = allow up to 220/120. Hemorrhagic = SBP <140. The NCLEX will test whether you know WHICH target applies to WHICH scenario.",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 6,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is evaluating a patient for tPA eligibility. Which findings would EXCLUDE the patient from receiving tPA? (Select all that apply.)",
            options: [
                { id: "a", text: "Symptom onset was 5 hours ago" },
                { id: "b", text: "Platelet count of 85,000/mm³" },
                { id: "c", text: "CT scan showing no evidence of hemorrhage" },
                { id: "d", text: "The patient had major abdominal surgery 10 days ago" },
                { id: "e", text: "INR of 1.4 on chronic low-dose warfarin" }
            ],
            correct: ["a", "b", "d"],
            rationale: {
                correct: "Symptom onset >4.5 hours, platelets <100,000, and major surgery within 14 days are all exclusion criteria for tPA administration.",
                a: "EXCLUDE — The standard tPA window is 0-3 hours (extended to 4.5 hours with additional criteria). At 5 hours, the patient is outside the treatment window.",
                b: "EXCLUDE — Platelets must be ≥100,000/mm³ for tPA. A count of 85,000 increases the risk of hemorrhagic complications. tPA works by breaking down clots, and inadequate platelets cannot provide hemostasis if bleeding occurs.",
                c: "This is an INCLUSION criterion, not an exclusion. A CT scan must show NO hemorrhage before tPA can be given. Hemorrhage on CT is the #1 absolute contraindication.",
                d: "EXCLUDE — Major surgery or serious trauma within 14 days is a contraindication due to the risk of surgical site hemorrhage. The tPA could dissolve clots at the surgical site, causing life-threatening bleeding.",
                e: "NOT an exclusion — INR must be >1.7 to exclude a patient from tPA. An INR of 1.4 is below the cutoff and does not preclude tPA administration."
            },
            labValues: [
                { name: "INR (tPA cutoff)", normal: "Must be ≤1.7" },
                { name: "Platelets (tPA cutoff)", normal: "Must be ≥100,000/mm³" },
                { name: "PT (tPA cutoff)", normal: "Must be ≤15 seconds" }
            ],
            testTakingTip: "tPA exclusions to memorize: >4.5 hours, hemorrhage on CT, platelets <100K, INR >1.7, recent major surgery (14 days), active internal bleeding, prior ICH, BP >185/110 (unless controlled). The INR cutoff of 1.7 is commonly tested — don't confuse it with the normal range.",
            guideSection: "Section 4 — tPA Inclusion & Exclusion Criteria",
            guideSectionId: "tpa"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a patient who received tPA 4 hours ago for ischemic stroke. While performing a neurological assessment, the nurse notes the patient's blood pressure is 194/112 mmHg. The patient's neurological status is unchanged from the last assessment. What is the PRIORITY nursing action?",
            options: [
                { id: "a", text: "Document the findings and recheck in 30 minutes" },
                { id: "b", text: "Administer the PRN antihypertensive as ordered to bring BP below 180/105 mmHg" },
                { id: "c", text: "Call a rapid response because the BP exceeds 185/110 mmHg" },
                { id: "d", text: "Hold further assessments to avoid stimulating the patient" }
            ],
            correct: "b",
            rationale: {
                correct: "After tPA administration, the blood pressure target is <180/105 mmHg for the first 24 hours. This patient's BP of 194/112 exceeds that threshold. The nurse should administer the prescribed PRN antihypertensive (typically IV labetalol or nicardipine) to bring the BP below the target. The neurological status is stable, so this is not a rapid response situation — it's a medication management issue.",
                a: "Documenting and waiting is inappropriate when the BP exceeds the post-tPA target. Sustained hypertension above 180/105 after tPA increases the risk of hemorrhagic conversion. Treatment should not be delayed.",
                c: "The 185/110 threshold is the PRE-tPA target (eligibility). Post-tPA, the target changes to <180/105. While the BP needs treatment, the patient is neurologically stable, and a rapid response is not indicated for isolated hypertension that can be managed with PRN medications.",
                d: "Neurological assessments must continue on schedule (typically every 15 minutes for the first 2 hours, then every 30 minutes for 6 hours, then every hour for 16 hours). Skipping assessments could miss early signs of hemorrhagic conversion."
            },
            testTakingTip: "Post-tPA BP management: <180/105 for 24 hours. Pre-tPA: <185/110. Note the slight difference. If the question says 'received tPA X hours ago,' use the post-tPA target. If 'being evaluated for tPA,' use the pre-tPA target.",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A student nurse asks why the NIH Stroke Scale (NIHSS) is performed serially on stroke patients rather than just once at admission. Which response by the preceptor is BEST?",
            options: [
                { id: "a", text: "\"It is performed multiple times to ensure the initial score was accurate.\"" },
                { id: "b", text: "\"Serial assessments detect improvement or deterioration, which guides treatment decisions and identifies complications early.\"" },
                { id: "c", text: "\"It is required by insurance companies for reimbursement of stroke care.\"" },
                { id: "d", text: "\"The initial NIHSS is unreliable because the patient is too stressed on admission.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The NIHSS quantifies neurological deficit severity on a scale of 0-42. Serial assessments allow the healthcare team to track the patient's trajectory: improvement suggests successful reperfusion, while deterioration may indicate hemorrhagic conversion, cerebral edema, or stroke extension. These changes trigger different interventions.",
                a: "While accuracy is important, the primary purpose of serial assessments is to track CHANGES over time, not to verify the initial score.",
                c: "This is not the clinical rationale. The NIHSS is performed because it provides critical clinical information, not for administrative or billing purposes.",
                d: "The initial NIHSS establishes a baseline and is clinically reliable. Stress does not invalidate the neurological exam — the deficits being measured (facial droop, arm drift, language) are not affected by anxiety."
            },
            testTakingTip: "Serial neurological assessments (NIHSS, GCS, pupil checks) are the nurse's most important tool for detecting stroke complications. A change of ≥4 points on the NIHSS is clinically significant and warrants immediate provider notification.",
            guideSection: "Section 3 — FAST Assessment Tool",
            guideSectionId: "fast"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient who had an ischemic stroke 48 hours ago is now being started on a dysphagia diet. Before the first meal, the nurse performs a bedside swallow screening. Which finding indicates the patient may be aspirating SILENTLY?",
            options: [
                { id: "a", text: "The patient coughs forcefully after swallowing a sip of water" },
                { id: "b", text: "The patient reports that the water \"went down the wrong pipe\"" },
                { id: "c", text: "The patient has a wet, gurgling voice quality after swallowing but does not cough" },
                { id: "d", text: "The patient swallows the water in one smooth motion with no difficulty" }
            ],
            correct: "c",
            rationale: {
                correct: "A wet, gurgling voice quality after swallowing — without coughing — is a hallmark of SILENT aspiration. The patient is aspirating (liquid is entering the airway) but the cough reflex is impaired due to the stroke, so there is no protective coughing. This is extremely dangerous because aspiration pneumonia can develop without obvious warning signs.",
                a: "A forceful cough after swallowing indicates the patient IS aspirating but has an INTACT cough reflex. While still concerning, this is not 'silent' aspiration — the body is protecting itself. The patient needs a modified diet, but the cough is a good sign.",
                b: "The patient's awareness and verbal report indicate intact sensation and a protective response. This is not silent aspiration.",
                d: "A smooth, unimpeded swallow with no voice changes is a normal finding, suggesting safe oral intake (though a formal speech therapy evaluation may still be warranted)."
            },
            testTakingTip: "Silent aspiration = aspiration WITHOUT coughing (impaired gag/cough reflex). Look for wet/gurgling voice, fever of unknown source, or recurrent pneumonia. Stroke patients are at high risk because the stroke may damage the brainstem swallow centers. Always do a swallow screen before any oral intake.",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 10,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 72-year-old patient presents to the ED with sudden onset right-sided weakness, expressive aphasia, and a severe headache described as \"the worst headache of my life.\" CT scan reveals a large left-sided intracerebral hemorrhage. Blood pressure is 198/110 mmHg. What is the PRIORITY nursing intervention?",
            options: [
                { id: "a", text: "Prepare for tPA administration to dissolve the hemorrhage" },
                { id: "b", text: "Administer IV antihypertensive to achieve SBP <140 mmHg" },
                { id: "c", text: "Administer aspirin and heparin for stroke prophylaxis" },
                { id: "d", text: "Allow permissive hypertension up to 220/120 mmHg" }
            ],
            correct: "b",
            rationale: {
                correct: "In hemorrhagic stroke, aggressive blood pressure control targeting SBP <140 mmHg is the priority to limit hematoma expansion. Higher blood pressure in the setting of active intracranial bleeding drives more blood into the hemorrhage, increasing brain damage and intracranial pressure. IV antihypertensives (nicardipine or labetalol drip) should be initiated immediately.",
                a: "tPA is absolutely CONTRAINDICATED in hemorrhagic stroke. It dissolves clots, which would worsen the bleeding and could be fatal. tPA is for ISCHEMIC stroke only.",
                c: "Aspirin (antiplatelet) and heparin (anticoagulant) would worsen hemorrhagic stroke by impairing the body's ability to stop the bleeding. These are contraindicated in acute hemorrhage.",
                d: "Permissive hypertension (up to 220/120) is the approach for ISCHEMIC stroke without tPA. In hemorrhagic stroke, the opposite approach is needed — aggressive BP lowering to SBP <140 mmHg to reduce hematoma expansion."
            },
            testTakingTip: "Hemorrhagic stroke = the opposite of ischemic in almost every way. No tPA, no anticoagulants, no antiplatelets, aggressive BP lowering (SBP <140). 'Worst headache of my life' + hemorrhage on CT = treat the blood pressure aggressively.",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        }
    ]
};
