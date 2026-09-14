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
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 58-year-old male arrives in the emergency department with crushing chest pain radiating to his left arm, diaphoresis, and nausea. The 12-lead ECG shows ST elevation in leads II, III, and aVF. The nearest cardiac catheterization lab is 3 hours away. What should the nurse anticipate as the PRIORITY intervention?",
            options: [
                { id: "a", text: "Prepare for immediate thrombolytic administration at this hospital" },
                { id: "b", text: "Transfer the patient to the facility with the cardiac catheterization lab" },
                { id: "c", text: "Administer nitroglycerin 0.4 mg sublingual and reassess pain" },
                { id: "d", text: "Obtain serial troponin levels before initiating treatment" }
            ],
            correct: "a",
            rationale: {
                correct: "This patient has an ST elevation myocardial infarction (STEMI): ST elevation in contiguous leads II, III, aVF = inferior myocardial infarction (MI). Percutaneous coronary intervention (PCI) is the preferred reperfusion strategy, but when PCI is not available within 120 minutes, thrombolytics must be administered (door-to-needle goal < 30 minutes). \"Time is muscle\" - every minute of delay means more myocardial cell death.",
                b: "Transfer for percutaneous coronary intervention (PCI) is appropriate only if it can be achieved within 120 minutes of first medical contact. A 3-hour transfer exceeds this window, making thrombolytics the priority.",
                c: "While nitroglycerin is part of the initial management, the \"N\" in morphine, oxygen, nitroglycerin, aspirin, beta blocker (MONA-B), it is not the priority over reperfusion therapy. Also, this is an inferior myocardial infarction (MI) - the nurse must first rule out right ventricular involvement before giving nitrates.",
                d: "Troponin takes 2-4 hours to rise. Treatment for ST elevation myocardial infarction (STEMI) is based on the ECG, not troponin results. Waiting for labs delays life-saving reperfusion."
            },
            testTakingTip: "For ST elevation myocardial infarction (STEMI): percutaneous coronary intervention (PCI) < 90 min = cath lab. PCI > 120 min = thrombolytics. The ECG is the deciding diagnostic tool for STEMI - don\u2019t wait for troponins to begin reperfusion.",
            guideSection: "Section 6 - Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is administering alteplase, a tissue plasminogen activator (tPA), to a patient with ST elevation myocardial infarction (STEMI). Thirty minutes into the infusion, the patient develops a sudden severe headache and becomes confused. What is the nurse\u2019s IMMEDIATE action?",
            options: [
                { id: "a", text: "Reduce the tissue plasminogen activator (tPA) infusion rate by 50%" },
                { id: "b", text: "Stop the tissue plasminogen activator (tPA) infusion immediately and notify the provider" },
                { id: "c", text: "Administer acetaminophen for the headache and continue the infusion" },
                { id: "d", text: "Perform a neurological assessment and document findings" }
            ],
            correct: "b",
            rationale: {
                correct: "Sudden severe headache with altered mental status during tissue plasminogen activator (tPA) administration is the hallmark presentation of intracranial hemorrhage (ICH) - the most feared complication of thrombolytic therapy. The infusion must be stopped IMMEDIATELY. This is a medical emergency requiring emergent computed tomography (CT) scan and neurosurgical consultation.",
                a: "Reducing the rate still delivers the thrombolytic and allows continued bleeding. If intracranial hemorrhage (ICH) is suspected, the infusion must be stopped completely.",
                c: "Treating the headache symptomatically while continuing the infusion ignores a potentially fatal complication. A headache during tissue plasminogen activator (tPA) is never benign.",
                d: "While a neuro assessment will be needed, stopping the cause of potential hemorrhage takes precedence. Assess after you\u2019ve stopped the bleeding source."
            },
            testTakingTip: "Any new neurological symptom during tissue plasminogen activator (tPA) = suspect intracranial hemorrhage (ICH) until proven otherwise. STOP the infusion first, then assess and notify. The NCLEX expects you to prioritize stopping the harmful agent.",
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
                { id: "c", text: "Establish IV access and draw baseline labs: troponin, complete blood count (CBC), basic metabolic panel (BMP), coags" },
                { id: "d", text: "Administer nitroglycerin sublingual as ordered, after ruling out right ventricular (RV) involvement" },
                { id: "e", text: "Prepare for cardiac catheterization and percutaneous coronary intervention (PCI)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence prioritizes rapid diagnosis (ECG), immediate antiplatelet therapy (aspirin), vascular access for medications and labs, symptom management (nitroglycerin), and preparation for definitive reperfusion with percutaneous coronary intervention (PCI). Time is muscle.",
                a: "FIRST - The 12-lead ECG must be obtained within 10 minutes of arrival to confirm ST elevation myocardial infarction (STEMI) and identify the infarct location. ST elevation in II, III, aVF indicates inferior myocardial infarction (MI) - essential for guiding nitrate use.",
                b: "SECOND - Aspirin 325 mg chewed (not swallowed whole) inhibits platelet aggregation at the culprit lesion. Chewing ensures rapid buccal absorption.",
                c: "THIRD - IV access is essential for medication administration. Troponin confirms myocardial injury, coagulation studies guide anticoagulation.",
                d: "FOURTH - Nitroglycerin reduces preload and myocardial oxygen demand. In an inferior myocardial infarction (MI) with changes in II, III, aVF, right ventricular involvement must be ruled out first with V4R - nitroglycerin (NTG) is contraindicated if the right ventricle (RV) is involved.",
                e: "FIFTH - Percutaneous coronary intervention (PCI) is the definitive treatment for ST elevation myocardial infarction (STEMI) with a door-to-balloon goal of <90 minutes. Preparation includes activating the cath lab, obtaining consent, and administering heparin."
            },
            testTakingTip: "ST elevation myocardial infarction (STEMI) sequencing: diagnose (ECG) \u2192 treat (aspirin) \u2192 access (IV) \u2192 manage symptoms (nitro, with caution if the infarct is inferior) \u2192 definitive therapy: percutaneous coronary intervention (PCI). Always check for right ventricular (RV) involvement in an inferior myocardial infarction (MI) before giving nitrates.",
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
                { id: "a", text: "Discharge with gastrointestinal (GI) follow-up since troponin is normal and there is no chest pain" },
                { id: "b", text: "Serial troponin levels at 3-6 hours because the initial troponin may be too early to detect myocardial infarction (MI)" },
                { id: "c", text: "Immediate preparation for thrombolytic therapy based on the ST changes" },
                { id: "d", text: "Administration of antacids and gastrointestinal (GI) evaluation for the epigastric discomfort" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient has multiple risk factors for atypical myocardial infarction (MI) presentation: elderly, female, and diabetic. These populations often present WITHOUT classic chest pain - instead showing fatigue, nausea, and epigastric discomfort. The ST depression suggests ischemia, possibly a non-ST elevation myocardial infarction (NSTEMI). Troponin takes 2-4 hours to rise, so a normal initial level at 4 hours does not rule out MI. Serial troponins at 3-6 hour intervals are essential to detect the characteristic rise-and-fall pattern.",
                a: "Discharging this patient is dangerous. Her demographics (elderly, diabetic, female) place her at high risk for \"silent\" myocardial infarction (MI) with atypical presentation. One normal troponin does not rule out MI.",
                c: "Thrombolytics are indicated for ST elevation myocardial infarction (STEMI), not non-ST elevation myocardial infarction (NSTEMI). This patient has ST depression, which suggests ischemia or NSTEMI - managed with anti-ischemic therapy and early invasive strategy.",
                d: "While the symptoms could be gastrointestinal (GI) in origin, the ST changes on ECG make cardiac etiology the priority concern. Assuming GI cause without ruling out myocardial infarction (MI) could be fatal."
            },
            testTakingTip: "The NCLEX loves atypical myocardial infarction (MI) presentations. Women, elderly, and diabetics may have NO chest pain. Look for: fatigue, nausea, epigastric pain, shortness of breath (SOB), diaphoresis. A single negative troponin never rules out MI - serial levels are always needed.",
            guideSection: "Section 4 - Cardiac Biomarkers",
            guideSectionId: "biomarkers"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with an inferior wall myocardial infarction (MI) has just been diagnosed with right ventricular involvement. The patient\u2019s blood pressure is 82/54 mmHg, jugular veins are distended, and lung sounds are clear bilaterally. Which intervention should the nurse anticipate?",
            options: [
                { id: "a", text: "Administer IV nitroglycerin to reduce chest pain" },
                { id: "b", text: "Administer IV furosemide (Lasix) 40 mg to reduce jugular venous distention (JVD)" },
                { id: "c", text: "Administer an IV normal saline fluid bolus" },
                { id: "d", text: "Place the patient in high Fowler\u2019s position" }
            ],
            correct: "c",
            rationale: {
                correct: "This patient has the classic right ventricular (RV) infarct triad: hypotension + jugular venous distention (JVD) + clear lungs. The failing right ventricle cannot adequately fill the left ventricle, so cardiac output drops. These patients are PRELOAD-DEPENDENT - they need IV fluids to maintain RV filling pressure and support cardiac output. Normal saline bolus is the priority intervention.",
                a: "Nitroglycerin is CONTRAINDICATED in right ventricular (RV) infarct. It causes venodilation (reduces preload), which would further decrease the already compromised RV filling and worsen hypotension.",
                b: "Diuretics are CONTRAINDICATED. Although jugular venous distention (JVD) is present, the problem is not fluid overload - it\u2019s right ventricular (RV) pump failure. Removing fluid would further deplete the preload these patients desperately need.",
                d: "High Fowler\u2019s position reduces venous return to the heart, which would worsen hypotension. Patients with right ventricular (RV) infarct may benefit from a flat or legs-elevated position to increase preload."
            },
            testTakingTip: "Right ventricular (RV) infarct = the opposite of left-sided heart failure (HF) management. Jugular venous distention (JVD) + clear lungs + hypotension = GIVE fluids. Avoid nitrates, diuretics, and anything that reduces preload. This is a classic NCLEX \"exception to the rule\" question.",
            guideSection: "Section 5 - EKG Changes & MI Location",
            guideSectionId: "ekg"
        },
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Expected Effect", "Report to Provider"],
            stem: "A patient is recovering from an ST elevation myocardial infarction (STEMI) and is on standard post-infarction medications including metoprolol, enalapril, aspirin, and atorvastatin. For each finding, indicate whether it is an expected effect of the medication regimen or should be reported to the provider.",
            options: [
                { id: "a", text: "Blood pressure of 108/68 mmHg (baseline was 138/86 mmHg)" },
                { id: "b", text: "Resting heart rate of 46 bpm with dizziness" },
                { id: "c", text: "Persistent dry cough that started after beginning enalapril" },
                { id: "d", text: "Recurrent chest pain with exertion despite taking all medications as prescribed" }
            ],
            correct: { a: "Expected Effect", b: "Report to Provider", c: "Report to Provider", d: "Report to Provider" },
            rationale: {
                correct: "A modest BP reduction is expected with angiotensin-converting enzyme (ACE) inhibitors and beta-blockers. However, significant bradycardia, persistent ACE inhibitor cough, and recurrent chest pain all warrant provider notification for possible medication adjustment or further evaluation.",
                a: "EXPECTED EFFECT - Both metoprolol and enalapril lower blood pressure. A drop from 138/86 to 108/68 is a therapeutic response - the BP remains adequate for organ perfusion.",
                b: "REPORT TO PROVIDER - Metoprolol is expected to slow the heart, but a resting HR of 46 bpm with dizziness is symptomatic bradycardia. Hold the next dose and let the provider adjust it.",
                c: "REPORT TO PROVIDER - A dry, persistent cough occurs in 5\u201320% of patients on angiotensin-converting enzyme (ACE) inhibitors due to bradykinin accumulation. The provider typically switches to an angiotensin receptor blocker (ARB) such as losartan.",
                d: "REPORT TO PROVIDER - Recurrent chest pain with exertion despite optimal medical therapy is a red flag for ongoing ischemia or stent thrombosis. This requires urgent evaluation."
            },
            testTakingTip: "Medication monitoring after myocardial infarction (MI): a lower BP is usually expected and therapeutic. But always report: HR <50 or symptomatic bradycardia, angiotensin-converting enzyme (ACE) inhibitor cough, which calls for a switch to an angiotensin receptor blocker (ARB), and ANY recurrent chest pain.",
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
                correct: "This patient has an anterior ST elevation myocardial infarction (STEMI) in left anterior descending (LAD) artery territory (V1-V4), with signs of cardiogenic shock (hypotension, tachycardia, cold/clammy skin, delayed cap refill) and hypoxia (SpO2 88%). The immediate priority is addressing the life-threatening hypoxia. Oxygen is administered when SpO2 is < 90% or the patient has signs of respiratory distress - both apply here. Airway, breathing, circulation (ABCs) always come first.",
                a: "Aspirin is essential and should be given early, but oxygenation takes priority when SpO2 is critically low. You can give aspirin moments after applying oxygen.",
                b: "Morphine causes vasodilation and can worsen hypotension. In a patient with BP 78/50 and signs of cardiogenic shock, morphine is contraindicated.",
                d: "Nitroglycerin is contraindicated when systolic blood pressure (SBP) < 90 mmHg. This patient\u2019s BP of 78/50 makes nitrates dangerous - they would worsen the hypotension."
            },
            testTakingTip: "When the NCLEX asks \"what first\" and a patient has abnormal vitals, think airway, breathing, circulation (ABCs). Hypoxia (SpO2 88%) is life-threatening and takes priority. Also remember: BP < 90 = hold nitroglycerin and morphine.",
            guideSection: "Section 7 - Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient received tissue plasminogen activator (tPA) for an ST elevation myocardial infarction (STEMI) 45 minutes ago. The nurse observes that the patient\u2019s chest pain has resolved, the ST segments on the monitor are returning toward baseline, and the patient had a brief run of premature ventricular contractions (PVCs). How should the nurse interpret these findings?",
            options: [
                { id: "a", text: "The premature ventricular contractions (PVCs) indicate worsening ischemia and the provider should be notified stat" },
                { id: "b", text: "These are signs of successful reperfusion and should be documented" },
                { id: "c", text: "The patient is developing a complication of tissue plasminogen activator (tPA) and the infusion should be stopped" },
                { id: "d", text: "The tissue plasminogen activator (tPA) was ineffective and the patient needs emergent percutaneous coronary intervention (PCI)" }
            ],
            correct: "b",
            rationale: {
                correct: "The three classic signs of successful reperfusion are: (1) resolution of chest pain, (2) return of ST segments to baseline, and (3) reperfusion arrhythmias such as premature ventricular contractions (PVCs) or accelerated idioventricular rhythm. These arrhythmias occur as blood flow is restored to the ischemic tissue and are generally self-limiting. This is a positive outcome.",
                a: "In the context of resolving chest pain and normalizing ST segments, premature ventricular contractions (PVCs) are reperfusion arrhythmias - not worsening ischemia. Worsening ischemia would present with increasing pain and persistent or worsening ST changes.",
                c: "This is not a complication. A tissue plasminogen activator (tPA) complication would be new neurological symptoms from intracranial hemorrhage (ICH), uncontrolled bleeding, or allergic reaction - not pain relief with resolving ECG changes.",
                d: "Failure of thrombolytics would show persistent chest pain, no change in ST elevation, and no reperfusion arrhythmias. This patient\u2019s improving picture indicates success."
            },
            testTakingTip: "Reperfusion arrhythmias such as premature ventricular contractions (PVCs), brief V-tach, and accelerated idioventricular rhythm are a GOOD sign - they mean blood flow has been restored. Look at the full clinical picture: pain resolving + ST normalizing + arrhythmias = success.",
            guideSection: "Section 6 - Thrombolytic Therapy",
            guideSectionId: "thrombolytics"
        },
        {
            id: 9, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A patient with ongoing chest pain has a heart rate of 128 beats per minute. Why does the tachycardia make the ischemia worse?",
            options: [
                { id: "a", text: "Diastole shortens, so demand rises while coronary supply falls" },
                { id: "b", text: "Systole shortens, so the ventricle ejects less blood each beat" },
                { id: "c", text: "Preload rises, so the coronary arteries are compressed shut" },
                { id: "d", text: "Hemoglobin falls, so arterial oxygen content drops sharply" }
            ],
            correct: "a",
            rationale: {
                correct: "The heart perfuses itself during diastole, not systole. Speeding the rate shortens diastole first, so a fast heart raises oxygen demand and cuts coronary supply at the same time. That is why rate control matters in a patient with chest pain.",
                b: "Systole does shorten at very high rates, but the ischemic problem is the loss of diastolic time, which is when the coronary arteries actually fill.",
                c: "Preload raises wall tension and therefore demand, but it does not compress the coronary arteries shut.",
                d: "Hemoglobin is one determinant of oxygen supply, but a fast heart rate does not lower it."
            },
            testTakingTip: "Coronary arteries fill during diastole. Anything that shortens diastole cuts supply and raises demand at the same time.",
            guideSection: "Section 3 - How the muscle dies",
            guideSectionId: "pathophysiology"
        },
        {
            id: 10, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks how the medications used in myocardial infarction are organised. Which statement describes the underlying principle?",
            options: [
                { id: "a", text: "Every treatment either raises oxygen supply or lowers oxygen demand" },
                { id: "b", text: "Every treatment either dissolves the clot or prevents a new clot" },
                { id: "c", text: "Every treatment either lowers cholesterol or lowers blood pressure" },
                { id: "d", text: "Every treatment either slows the rate or raises the blood pressure" }
            ],
            correct: "a",
            rationale: {
                correct: "A myocardial infarction is a supply problem with a deadline. Oxygen and nitrates raise supply, while beta blockers, rest and morphine lower demand. That one split organises the whole pharmacology of the topic.",
                b: "Thrombolytics and antiplatelets matter a great deal, but they are one way of raising supply rather than the organising idea.",
                c: "Lipid and blood pressure control are secondary prevention. They do not describe what is given during the infarction.",
                d: "Raising blood pressure is not a goal. Higher afterload raises wall tension and therefore raises demand."
            },
            testTakingTip: "Sort every myocardial infarction drug into raises supply or lowers demand. Nothing in this topic sits outside those two.",
            guideSection: "Section 3 - How the muscle dies",
            guideSectionId: "pathophysiology"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "application",
            stem: "A patient has ischemic chest pain. The electrocardiogram shows ST depression with T wave inversion, and the troponin is elevated. How should the nurse interpret this?",
            options: [
                { id: "a", text: "Non-ST elevation myocardial infarction (NSTEMI)" },
                { id: "b", text: "ST elevation myocardial infarction (STEMI)" },
                { id: "c", text: "Unstable angina without infarction" },
                { id: "d", text: "Stable angina brought on by exertion" }
            ],
            correct: "a",
            rationale: {
                correct: "Troponin is what separates infarction from angina, and the absence of ST elevation is what separates it from a ST elevation myocardial infarction (STEMI). Positive troponin without ST elevation is a non-ST elevation myocardial infarction (NSTEMI), meaning partial or intermittent occlusion.",
                b: "A ST elevation myocardial infarction (STEMI) requires ST elevation in two or more neighbouring leads. This tracing shows depression instead.",
                c: "Unstable angina is ischemic pain with a negative troponin. This troponin is elevated.",
                d: "Stable angina is predictable, brought on by exertion and relieved by rest, and it does not raise troponin."
            },
            testTakingTip: "Two data points sort this family. ST elevation splits the top off, then troponin splits the bottom two.",
            guideSection: "Section 4 - Complete or partial",
            guideSectionId: "stemi-nstemi"
        },
        {
            id: 12, type: "single", subtype: "priority", difficulty: "analysis",
            stem: "A patient arrives with crushing chest pain and 2 mm of ST elevation in leads II, III and aVF. The nearest facility able to perform percutaneous coronary intervention (PCI) is a 3 hour transfer away. What should the nurse anticipate?",
            options: [
                { id: "a", text: "Giving thrombolytics rather than transferring for the procedure" },
                { id: "b", text: "Transferring immediately for the procedure despite the distance" },
                { id: "c", text: "Waiting for a repeat troponin before deciding on any treatment" },
                { id: "d", text: "Starting anticoagulation and scheduling catheterisation later" }
            ],
            correct: "a",
            rationale: {
                correct: "When percutaneous coronary intervention (PCI) is more than 120 minutes away, thrombolytics are given instead, as long as the patient is within 12 hours of symptom onset. A 3 hour transfer is well outside that threshold.",
                b: "Transferring past the 120 minute threshold spends the deadline the muscle is dying against.",
                c: "ST elevation in two or more neighbouring leads is already diagnostic. Waiting for troponin only delays reperfusion.",
                d: "Anticoagulation with catheterisation in 24 to 72 hours is the non-ST elevation pathway, not the ST elevation one."
            },
            testTakingTip: "120 minutes is the deciding number. Further than that from percutaneous coronary intervention (PCI) means thrombolytics, inside 12 hours of symptom onset.",
            guideSection: "Section 4 - Complete or partial",
            guideSectionId: "stemi-nstemi"
        },
        {
            id: 13, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient with chest pain has an order for sublingual nitroglycerin. The blood pressure is 86/54 mmHg. What should the nurse do?",
            options: [
                { id: "a", text: "Hold the dose and notify the provider" },
                { id: "b", text: "Give the dose and recheck in five minutes" },
                { id: "c", text: "Give the dose with the patient lying flat" },
                { id: "d", text: "Give half the dose and monitor closely" }
            ],
            correct: "a",
            rationale: {
                correct: "Nitroglycerin is held when the systolic pressure is under 90 mmHg. It is a vasodilator, and giving it to a patient already at 86 mmHg systolic drops coronary perfusion further.",
                b: "Giving first and rechecking afterwards accepts a fall in pressure this patient cannot afford.",
                c: "Position does not make a vasodilator safe below the systolic threshold.",
                d: "Splitting a dose is not a nursing decision, and any amount lowers the pressure further."
            },
            testTakingTip: "Under 90 mmHg systolic holds nitroglycerin. Also hold it within 24 to 48 hours of a phosphodiesterase type 5 (PDE5) inhibitor.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 14, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient presents 3 hours after the onset of chest pain and the first troponin is normal. How should the nurse interpret this result?",
            options: [
                { id: "a", text: "Troponin may not have risen yet, so it is repeated on a schedule" },
                { id: "b", text: "Myocardial infarction is ruled out and the patient may be discharged" },
                { id: "c", text: "The result confirms unstable angina and no further testing is needed" },
                { id: "d", text: "The sample was drawn incorrectly and should be collected again now" }
            ],
            correct: "a",
            rationale: {
                correct: "Troponin starts to rise 2 to 4 hours after injury begins and peaks at 12 to 24 hours. A single normal value at 3 hours is too early to exclude infarction, so serial samples are drawn.",
                b: "One early troponin cannot rule out an infarction. Discharging on it risks sending home an evolving myocardial infarction.",
                c: "Unstable angina is diagnosed after serial troponins stay negative, not after the first one.",
                d: "A normal early troponin is an expected finding at 3 hours, not evidence of a collection error."
            },
            testTakingTip: "Troponin rises at 2 to 4 hours, peaks at 12 to 24 hours and stays up 7 to 14 days. Early normal means too early, not negative.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A patient arrives in the emergency department reporting chest pain. Within what time frame should the 12 lead electrocardiogram be obtained?",
            options: [
                { id: "a", text: "Within 10 minutes of arrival" },
                { id: "b", text: "Within 30 minutes of arrival" },
                { id: "c", text: "Within 60 minutes of arrival" },
                { id: "d", text: "Within 90 minutes of arrival" }
            ],
            correct: "a",
            rationale: {
                correct: "The electrocardiogram is obtained within 10 minutes of arrival, because every later decision depends on whether ST elevation is present. It is the first link in the chain.",
                b: "30 minutes is the door to needle target for thrombolytics, not the target for the electrocardiogram.",
                c: "60 minutes does not match any target in this chain.",
                d: "90 minutes is the door to balloon target for percutaneous coronary intervention (PCI)."
            },
            testTakingTip: "Chain of numbers: electrocardiogram in 10 minutes, needle in 30, balloon in 90.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
