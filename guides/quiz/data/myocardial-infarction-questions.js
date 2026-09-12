/**
 * Myocardial Infarction Quiz - Question Data
 * Extracted from guides/myocardial-infarction.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Ordering, 1 Matrix
 */

/* exported myocardialInfarctionQuizData */
var myocardialInfarctionQuizData = {
    guideName: "Myocardial Infarction",
    guideSlug: "myocardial-infarction",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 58-year-old male arrives in the emergency department with crushing chest pain radiating to his left arm, diaphoresis, and nausea. The 12-lead ECG shows ST elevation in leads II, III, and aVF. The nearest cardiac catheterization lab is 2 hours away. What should the nurse anticipate as the PRIORITY intervention?",
            options: [
                { id: "a", text: "Prepare for immediate thrombolytic (tPA) administration" },
                { id: "b", text: "Transfer the patient to the facility with the cardiac catheterization lab" },
                { id: "c", text: "Administer nitroglycerin 0.4 mg sublingual and reassess pain" },
                { id: "d", text: "Obtain serial troponin levels before initiating treatment" }
            ],
            correct: "a",
            rationale: {
                correct: "This patient has a STEMI (ST elevation in contiguous leads II, III, aVF = inferior MI). PCI is the preferred reperfusion strategy, but when PCI is not available within 120 minutes, thrombolytics must be administered (door-to-needle goal < 30 minutes). \"Time is muscle\" - every minute of delay means more myocardial cell death.",
                b: "Transfer for PCI is appropriate only if it can be achieved within 120 minutes of first medical contact. A 2-hour drive exceeds this window, making thrombolytics the priority.",
                c: "While nitroglycerin is part of the initial management (the \"N\" in MONA-B), it is not the priority over reperfusion therapy. Also, this is an inferior MI - the nurse must first rule out right ventricular involvement before giving nitrates.",
                d: "Troponin takes 2-4 hours to rise. Treatment for STEMI is based on the ECG, not troponin results. Waiting for labs delays life-saving reperfusion."
            },
            testTakingTip: "For STEMI: PCI < 90 min = cath lab. PCI > 120 min = thrombolytics. The ECG is the deciding diagnostic tool for STEMI - don\u2019t wait for troponins to begin reperfusion.",
            guideSection: "Section 6 - Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is administering tPA (alteplase) to a patient with STEMI. Thirty minutes into the infusion, the patient develops a sudden severe headache and becomes confused. What is the nurse\u2019s IMMEDIATE action?",
            options: [
                { id: "a", text: "Reduce the tPA infusion rate by 50%" },
                { id: "b", text: "Stop the tPA infusion immediately and notify the provider" },
                { id: "c", text: "Administer acetaminophen for the headache and continue the infusion" },
                { id: "d", text: "Perform a neurological assessment and document findings" }
            ],
            correct: "b",
            rationale: {
                correct: "Sudden severe headache with altered mental status during tPA administration is the hallmark presentation of intracranial hemorrhage (ICH) - the most feared complication of thrombolytic therapy. The infusion must be stopped IMMEDIATELY. This is a medical emergency requiring emergent CT scan and neurosurgical consultation.",
                a: "Reducing the rate still delivers the thrombolytic and allows continued bleeding. If ICH is suspected, the infusion must be stopped completely.",
                c: "Treating the headache symptomatically while continuing the infusion ignores a potentially fatal complication. A headache during tPA is never benign.",
                d: "While a neuro assessment will be needed, stopping the cause of potential hemorrhage takes precedence. Assess after you\u2019ve stopped the bleeding source."
            },
            testTakingTip: "Any new neurological symptom during tPA = suspect ICH until proven otherwise. STOP the infusion first, then assess and notify. The NCLEX expects you to prioritize stopping the harmful agent.",
            guideSection: "Section 6 - Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        },
        {
            id: 3,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A 58-year-old patient presents with crushing substernal chest pain radiating to the left arm, diaphoresis, and ST elevation in leads II, III, and aVF. Place the nursing actions in the correct sequence.",
            options: [
                { id: "a", text: "Obtain a 12-lead ECG" },
                { id: "b", text: "Administer aspirin 325 mg chewed" },
                { id: "c", text: "Establish IV access and draw baseline labs (troponin, CBC, BMP, coags)" },
                { id: "d", text: "Administer nitroglycerin sublingual as ordered (after ruling out RV involvement)" },
                { id: "e", text: "Prepare for cardiac catheterization and PCI" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence prioritizes rapid diagnosis (ECG), immediate antiplatelet therapy (aspirin), vascular access for medications and labs, symptom management (nitroglycerin), and preparation for definitive reperfusion therapy (PCI). Time is muscle.",
                a: "FIRST - The 12-lead ECG must be obtained within 10 minutes of arrival to confirm STEMI and identify the infarct location. ST elevation in II, III, aVF indicates inferior MI - essential for guiding nitrate use.",
                b: "SECOND - Aspirin 325 mg chewed (not swallowed whole) inhibits platelet aggregation at the culprit lesion. Chewing ensures rapid buccal absorption.",
                c: "THIRD - IV access is essential for medication administration. Troponin confirms myocardial injury, coagulation studies guide anticoagulation.",
                d: "FOURTH - Nitroglycerin reduces preload and myocardial oxygen demand. In inferior MI (II, III, aVF), right ventricular involvement must be ruled out first with V4R - NTG is contraindicated if RV is involved.",
                e: "FIFTH - PCI is the definitive treatment for STEMI with a door-to-balloon goal of <90 minutes. Preparation includes activating the cath lab, obtaining consent, and administering heparin."
            },
            testTakingTip: "STEMI sequencing: diagnose (ECG) \u2192 treat (aspirin) \u2192 access (IV) \u2192 manage symptoms (nitro with caution in inferior MI) \u2192 definitive therapy (PCI). Always check for RV involvement in inferior MIs before giving nitrates.",
            guideSection: "Section 6 - Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 72-year-old female patient with a history of diabetes presents to the ED with fatigue, nausea, and epigastric discomfort that started 4 hours ago. She denies chest pain. Her ECG shows ST depression in V1-V3 and her initial troponin is 0.02 ng/mL (normal < 0.04). What should the nurse anticipate?",
            options: [
                { id: "a", text: "Discharge with GI follow-up since troponin is normal and there is no chest pain" },
                { id: "b", text: "Serial troponin levels at 3-6 hours because the initial troponin may be too early to detect MI" },
                { id: "c", text: "Immediate preparation for thrombolytic therapy based on the ST changes" },
                { id: "d", text: "Administration of antacids and GI evaluation for the epigastric discomfort" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient has multiple risk factors for atypical MI presentation: elderly, female, and diabetic. These populations often present WITHOUT classic chest pain - instead showing fatigue, nausea, and epigastric discomfort. The ST depression suggests ischemia (possible NSTEMI). Troponin takes 2-4 hours to rise, so a normal initial level at 4 hours does not rule out MI. Serial troponins at 3-6 hour intervals are essential to detect the characteristic rise-and-fall pattern.",
                a: "Discharging this patient is dangerous. Her demographics (elderly, diabetic, female) place her at high risk for \"silent MI\" with atypical presentation. One normal troponin does not rule out MI.",
                c: "Thrombolytics are indicated for STEMI (ST elevation), not NSTEMI (ST depression). This patient has ST depression, which suggests ischemia or NSTEMI - managed with anti-ischemic therapy and early invasive strategy.",
                d: "While the symptoms could be GI-related, the ST changes on ECG make cardiac etiology the priority concern. Assuming GI cause without ruling out MI could be fatal."
            },
            testTakingTip: "The NCLEX loves atypical MI presentations. Women, elderly, and diabetics may have NO chest pain. Look for: fatigue, nausea, epigastric pain, SOB, diaphoresis. A single negative troponin never rules out MI - serial levels are always needed.",
            guideSection: "Section 4 - Cardiac Biomarkers",
            guideSectionId: "biomarkers"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with an inferior wall MI has just been diagnosed with right ventricular involvement. The patient\u2019s blood pressure is 82/54 mmHg, jugular veins are distended, and lung sounds are clear bilaterally. Which intervention should the nurse anticipate?",
            options: [
                { id: "a", text: "Administer IV nitroglycerin to reduce chest pain" },
                { id: "b", text: "Administer IV furosemide (Lasix) 40 mg to reduce JVD" },
                { id: "c", text: "Administer an IV normal saline fluid bolus" },
                { id: "d", text: "Place the patient in high Fowler\u2019s position" }
            ],
            correct: "c",
            rationale: {
                correct: "This patient has the classic RV infarct triad: hypotension + JVD + clear lungs. The failing right ventricle cannot adequately fill the left ventricle, so cardiac output drops. These patients are PRELOAD-DEPENDENT - they need IV fluids to maintain RV filling pressure and support cardiac output. Normal saline bolus is the priority intervention.",
                a: "Nitroglycerin is CONTRAINDICATED in RV infarct. It causes venodilation (reduces preload), which would further decrease the already compromised RV filling and worsen hypotension.",
                b: "Diuretics are CONTRAINDICATED. Although JVD is present, the problem is not fluid overload - it\u2019s RV pump failure. Removing fluid would further deplete the preload these patients desperately need.",
                d: "High Fowler\u2019s position reduces venous return to the heart, which would worsen hypotension. Patients with RV infarct may benefit from a flat or legs-elevated position to increase preload."
            },
            testTakingTip: "RV infarct = the opposite of left-sided HF management. JVD + clear lungs + hypotension = GIVE fluids. Avoid nitrates, diuretics, and anything that reduces preload. This is a classic NCLEX \"exception to the rule\" question.",
            guideSection: "Section 5 - EKG Changes & MI Location",
            guideSectionId: "ekg"
        },
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Expected Effect", "Report to Provider"],
            stem: "A patient is recovering from a STEMI and is on standard post-MI medications including metoprolol, enalapril, aspirin, and atorvastatin. For each finding, indicate whether it is an expected effect of the medication regimen or should be reported to the provider.",
            options: [
                { id: "a", text: "Blood pressure of 108/68 mmHg (baseline was 138/86 mmHg)" },
                { id: "b", text: "Resting heart rate of 52 bpm" },
                { id: "c", text: "Persistent dry cough that started after beginning enalapril" },
                { id: "d", text: "Recurrent chest pain with exertion despite taking all medications as prescribed" }
            ],
            correct: { a: "Expected Effect", b: "Report to Provider", c: "Report to Provider", d: "Report to Provider" },
            rationale: {
                correct: "A modest BP reduction is expected with ACE inhibitors and beta-blockers. However, significant bradycardia, persistent ACE inhibitor cough, and recurrent chest pain all warrant provider notification for possible medication adjustment or further evaluation.",
                a: "EXPECTED EFFECT - Both metoprolol and enalapril lower blood pressure. A drop from 138/86 to 108/68 is a therapeutic response - the BP remains adequate for organ perfusion.",
                b: "REPORT TO PROVIDER - While metoprolol lowers heart rate, a resting HR of 52 bpm is at the lower limit and may cause symptoms. The provider may need to adjust the dose.",
                c: "REPORT TO PROVIDER - A dry, persistent cough occurs in 5\u201320% of patients on ACE inhibitors due to bradykinin accumulation. The provider typically switches to an ARB (e.g., losartan).",
                d: "REPORT TO PROVIDER - Recurrent chest pain with exertion despite optimal medical therapy is a red flag for ongoing ischemia or stent thrombosis. This requires urgent evaluation."
            },
            testTakingTip: "Post-MI medication monitoring: a lower BP is usually expected and therapeutic. But always report: HR <50 or symptomatic bradycardia, ACE inhibitor cough (switch to ARB), and ANY recurrent chest pain.",
            guideSection: "Section 8 - Complications of MI",
            guideSectionId: "complications"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient arrives in the ED with chest pain. The nurse obtains a 12-lead ECG showing ST elevation in V1-V4. Vital signs: HR 110, BP 78/50, RR 28, SpO2 88%. The patient\u2019s skin is cold and clammy with delayed capillary refill. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Administer aspirin 325 mg chewed" },
                { id: "b", text: "Administer morphine 2 mg IV for pain relief" },
                { id: "c", text: "Apply supplemental oxygen" },
                { id: "d", text: "Administer sublingual nitroglycerin" }
            ],
            correct: "c",
            rationale: {
                correct: "This patient has an anterior STEMI (V1-V4 = LAD territory) with signs of cardiogenic shock (hypotension, tachycardia, cold/clammy skin, delayed cap refill) and hypoxia (SpO2 88%). The immediate priority is addressing the life-threatening hypoxia. Oxygen is administered when SpO2 is < 90% or the patient has signs of respiratory distress - both apply here. ABCs (Airway, Breathing, Circulation) always come first.",
                a: "Aspirin is essential and should be given early, but oxygenation takes priority when SpO2 is critically low. You can give aspirin moments after applying oxygen.",
                b: "Morphine causes vasodilation and can worsen hypotension. In a patient with BP 78/50 and signs of cardiogenic shock, morphine is contraindicated.",
                d: "Nitroglycerin is contraindicated when SBP < 90 mmHg. This patient\u2019s BP of 78/50 makes nitrates dangerous - they would worsen the hypotension."
            },
            testTakingTip: "When the NCLEX asks \"what first\" and a patient has abnormal vitals, think ABCs. Hypoxia (SpO2 88%) is life-threatening and takes priority. Also remember: BP < 90 = hold nitroglycerin and morphine.",
            guideSection: "Section 7 - Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient received tPA for a STEMI 45 minutes ago. The nurse observes that the patient\u2019s chest pain has resolved, the ST segments on the monitor are returning toward baseline, and the patient had a brief run of premature ventricular contractions (PVCs). How should the nurse interpret these findings?",
            options: [
                { id: "a", text: "The PVCs indicate worsening ischemia and the provider should be notified stat" },
                { id: "b", text: "These are signs of successful reperfusion and should be documented" },
                { id: "c", text: "The patient is developing a complication of tPA and the infusion should be stopped" },
                { id: "d", text: "The tPA was ineffective and the patient needs emergent PCI" }
            ],
            correct: "b",
            rationale: {
                correct: "The three classic signs of successful reperfusion are: (1) resolution of chest pain, (2) return of ST segments to baseline, and (3) reperfusion arrhythmias (PVCs, accelerated idioventricular rhythm). These arrhythmias occur as blood flow is restored to the ischemic tissue and are generally self-limiting. This is a positive outcome.",
                a: "In the context of resolving chest pain and normalizing ST segments, PVCs are reperfusion arrhythmias - not worsening ischemia. Worsening ischemia would present with increasing pain and persistent or worsening ST changes.",
                c: "This is not a complication. A tPA complication would be new neurological symptoms (ICH), uncontrolled bleeding, or allergic reaction - not pain relief with resolving ECG changes.",
                d: "Failure of thrombolytics would show persistent chest pain, no change in ST elevation, and no reperfusion arrhythmias. This patient\u2019s improving picture indicates success."
            },
            testTakingTip: "Reperfusion arrhythmias (PVCs, brief V-tach, accelerated idioventricular rhythm) are a GOOD sign - they mean blood flow has been restored. Look at the full clinical picture: pain resolving + ST normalizing + arrhythmias = success.",
            guideSection: "Section 6 - Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        }
    ]
};
