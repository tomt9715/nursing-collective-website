/**
 * Myocardial Infarction Quiz — Question Data
 * Extracted from guides/myocardial-infarction.html practice questions section.
 * 8 NCLEX-style questions: 3 Single, 2 SATA, 2 Priority, 1 Knowledge
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
                correct: "This patient has a STEMI (ST elevation in contiguous leads II, III, aVF = inferior MI). PCI is the preferred reperfusion strategy, but when PCI is not available within 120 minutes, thrombolytics must be administered (door-to-needle goal < 30 minutes). \"Time is muscle\" \u2014 every minute of delay means more myocardial cell death.",
                b: "Transfer for PCI is appropriate only if it can be achieved within 120 minutes of first medical contact. A 2-hour drive exceeds this window, making thrombolytics the priority.",
                c: "While nitroglycerin is part of the initial management (the \"N\" in MONA-B), it is not the priority over reperfusion therapy. Also, this is an inferior MI \u2014 the nurse must first rule out right ventricular involvement before giving nitrates.",
                d: "Troponin takes 2-4 hours to rise. Treatment for STEMI is based on the ECG, not troponin results. Waiting for labs delays life-saving reperfusion."
            },
            testTakingTip: "For STEMI: PCI < 90 min = cath lab. PCI > 120 min = thrombolytics. The ECG is the deciding diagnostic tool for STEMI \u2014 don\u2019t wait for troponins to begin reperfusion.",
            guideSection: "Section 6 \u2014 Thrombolytic Therapy",
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
                correct: "Sudden severe headache with altered mental status during tPA administration is the hallmark presentation of intracranial hemorrhage (ICH) \u2014 the most feared complication of thrombolytic therapy. The infusion must be stopped IMMEDIATELY. This is a medical emergency requiring emergent CT scan and neurosurgical consultation.",
                a: "Reducing the rate still delivers the thrombolytic and allows continued bleeding. If ICH is suspected, the infusion must be stopped completely.",
                c: "Treating the headache symptomatically while continuing the infusion ignores a potentially fatal complication. A headache during tPA is never benign.",
                d: "While a neuro assessment will be needed, stopping the cause of potential hemorrhage takes precedence. Assess after you\u2019ve stopped the bleeding source."
            },
            testTakingTip: "Any new neurological symptom during tPA = suspect ICH until proven otherwise. STOP the infusion first, then assess and notify. The NCLEX expects you to prioritize stopping the harmful agent.",
            guideSection: "Section 6 \u2014 Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is being evaluated for thrombolytic therapy following a STEMI. Which findings would be ABSOLUTE contraindications to tPA administration? Select all that apply.",
            options: [
                { id: "a", text: "History of hemorrhagic stroke 5 years ago" },
                { id: "b", text: "Blood pressure of 168/94 mmHg" },
                { id: "c", text: "Suspected aortic dissection" },
                { id: "d", text: "Major abdominal surgery 2 weeks ago" },
                { id: "e", text: "Active peptic ulcer with GI bleeding" }
            ],
            correct: ["a", "c", "e"],
            rationale: {
                correct: "Absolute contraindications to tPA include prior intracranial hemorrhage at any time, suspected aortic dissection, and active bleeding or known bleeding diathesis.",
                a: "CORRECT \u2014 Prior intracranial hemorrhage at ANY time is an absolute contraindication. There is no time limit on this exclusion.",
                b: "INCORRECT \u2014 Severe uncontrolled hypertension (SBP > 180 or DBP > 110) is a relative contraindication, not absolute. This patient\u2019s BP of 168/94 does not meet that threshold.",
                c: "CORRECT \u2014 Suspected aortic dissection is an absolute contraindication. Thrombolytics would cause uncontrolled hemorrhage into the dissection.",
                d: "INCORRECT \u2014 Major surgery within 3 weeks is a relative (not absolute) contraindication. The risk-benefit ratio must be weighed by the provider.",
                e: "CORRECT \u2014 Active bleeding or known bleeding diathesis is an absolute contraindication. Active GI hemorrhage would be worsened by thrombolytics."
            },
            testTakingTip: "Remember HEADS for absolute contraindications: Hemorrhagic stroke (ever), Extreme BP (uncontrolled, relative), Aortic dissection, Disorder of bleeding, Surgery/trauma (recent, relative). Absolute = never give. Relative = provider weighs risks.",
            guideSection: "Section 6 \u2014 Thrombolytic Therapy",
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
                correct: "This patient has multiple risk factors for atypical MI presentation: elderly, female, and diabetic. These populations often present WITHOUT classic chest pain \u2014 instead showing fatigue, nausea, and epigastric discomfort. The ST depression suggests ischemia (possible NSTEMI). Troponin takes 2-4 hours to rise, so a normal initial level at 4 hours does not rule out MI. Serial troponins at 3-6 hour intervals are essential to detect the characteristic rise-and-fall pattern.",
                a: "Discharging this patient is dangerous. Her demographics (elderly, diabetic, female) place her at high risk for \"silent MI\" with atypical presentation. One normal troponin does not rule out MI.",
                c: "Thrombolytics are indicated for STEMI (ST elevation), not NSTEMI (ST depression). This patient has ST depression, which suggests ischemia or NSTEMI \u2014 managed with anti-ischemic therapy and early invasive strategy.",
                d: "While the symptoms could be GI-related, the ST changes on ECG make cardiac etiology the priority concern. Assuming GI cause without ruling out MI could be fatal."
            },
            testTakingTip: "The NCLEX loves atypical MI presentations. Women, elderly, and diabetics may have NO chest pain. Look for: fatigue, nausea, epigastric pain, SOB, diaphoresis. A single negative troponin never rules out MI \u2014 serial levels are always needed.",
            guideSection: "Section 4 \u2014 Cardiac Biomarkers",
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
                correct: "This patient has the classic RV infarct triad: hypotension + JVD + clear lungs. The failing right ventricle cannot adequately fill the left ventricle, so cardiac output drops. These patients are PRELOAD-DEPENDENT \u2014 they need IV fluids to maintain RV filling pressure and support cardiac output. Normal saline bolus is the priority intervention.",
                a: "Nitroglycerin is CONTRAINDICATED in RV infarct. It causes venodilation (reduces preload), which would further decrease the already compromised RV filling and worsen hypotension.",
                b: "Diuretics are CONTRAINDICATED. Although JVD is present, the problem is not fluid overload \u2014 it\u2019s RV pump failure. Removing fluid would further deplete the preload these patients desperately need.",
                d: "High Fowler\u2019s position reduces venous return to the heart, which would worsen hypotension. Patients with RV infarct may benefit from a flat or legs-elevated position to increase preload."
            },
            testTakingTip: "RV infarct = the opposite of left-sided HF management. JVD + clear lungs + hypotension = GIVE fluids. Avoid nitrates, diuretics, and anything that reduces preload. This is a classic NCLEX \"exception to the rule\" question.",
            guideSection: "Section 5 \u2014 EKG Changes & MI Location",
            guideSectionId: "ekg"
        },
        {
            id: 6,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A patient is admitted with a STEMI and is 5 days post-MI. The nurse should closely monitor for which complications during this time frame? Select all that apply.",
            options: [
                { id: "a", text: "Ventricular septal rupture" },
                { id: "b", text: "Papillary muscle rupture" },
                { id: "c", text: "Ventricular fibrillation" },
                { id: "d", text: "Cardiac tamponade from free wall rupture" },
                { id: "e", text: "Dressler\u2019s syndrome (post-MI pericarditis)" }
            ],
            correct: ["a", "b", "d"],
            rationale: {
                correct: "At 5 days post-MI, mechanical complications are the primary concern. Necrotic tissue is at its weakest during this period, making structural ruptures most likely.",
                a: "CORRECT \u2014 Ventricular septal rupture occurs 3-5 days post-MI when necrotic tissue is at its weakest. It presents as a new harsh systolic murmur with rapid hemodynamic deterioration.",
                b: "CORRECT \u2014 Papillary muscle rupture occurs 2-7 days post-MI, causing acute severe mitral regurgitation with sudden pulmonary edema and a new murmur.",
                c: "INCORRECT \u2014 VF is most likely in the first 4 hours after MI (the leading cause of death in the first hour). By day 5, the highest-risk arrhythmia window has passed.",
                d: "CORRECT \u2014 Free wall rupture occurs 5-14 days post-MI. It causes sudden cardiac tamponade and often pulseless electrical activity (PEA) arrest. It is frequently fatal.",
                e: "INCORRECT \u2014 Dressler\u2019s syndrome is autoimmune pericarditis that occurs weeks to months after MI, not at 5 days. It presents with fever, pleuritic chest pain, and pericardial effusion."
            },
            testTakingTip: "Mechanical complications cluster at 3-7 days post-MI when necrotic tissue is most friable. Watch for sudden hemodynamic collapse or new murmurs. Electrical complications (VF) peak in the first hours. Autoimmune complications (Dressler\u2019s) occur weeks later.",
            guideSection: "Section 8 \u2014 Complications of MI",
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
                correct: "This patient has an anterior STEMI (V1-V4 = LAD territory) with signs of cardiogenic shock (hypotension, tachycardia, cold/clammy skin, delayed cap refill) and hypoxia (SpO2 88%). The immediate priority is addressing the life-threatening hypoxia. Oxygen is administered when SpO2 is < 90% or the patient has signs of respiratory distress \u2014 both apply here. ABCs (Airway, Breathing, Circulation) always come first.",
                a: "Aspirin is essential and should be given early, but oxygenation takes priority when SpO2 is critically low. You can give aspirin moments after applying oxygen.",
                b: "Morphine causes vasodilation and can worsen hypotension. In a patient with BP 78/50 and signs of cardiogenic shock, morphine is contraindicated.",
                d: "Nitroglycerin is contraindicated when SBP < 90 mmHg. This patient\u2019s BP of 78/50 makes nitrates dangerous \u2014 they would worsen the hypotension."
            },
            testTakingTip: "When the NCLEX asks \"what first\" and a patient has abnormal vitals, think ABCs. Hypoxia (SpO2 88%) is life-threatening and takes priority. Also remember: BP < 90 = hold nitroglycerin and morphine.",
            guideSection: "Section 7 \u2014 Priority Nursing Interventions",
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
                a: "In the context of resolving chest pain and normalizing ST segments, PVCs are reperfusion arrhythmias \u2014 not worsening ischemia. Worsening ischemia would present with increasing pain and persistent or worsening ST changes.",
                c: "This is not a complication. A tPA complication would be new neurological symptoms (ICH), uncontrolled bleeding, or allergic reaction \u2014 not pain relief with resolving ECG changes.",
                d: "Failure of thrombolytics would show persistent chest pain, no change in ST elevation, and no reperfusion arrhythmias. This patient\u2019s improving picture indicates success."
            },
            testTakingTip: "Reperfusion arrhythmias (PVCs, brief V-tach, accelerated idioventricular rhythm) are a GOOD sign \u2014 they mean blood flow has been restored. Look at the full clinical picture: pain resolving + ST normalizing + arrhythmias = success.",
            guideSection: "Section 6 \u2014 Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        }
    ]
};
