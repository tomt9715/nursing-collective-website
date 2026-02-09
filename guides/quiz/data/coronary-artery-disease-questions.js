/**
 * Coronary Artery Disease Quiz — Question Data
 * Extracted from guides/coronary-artery-disease.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Ordering, 1 Matrix
 */

/* exported coronaryArteryDiseaseQuizData */
var coronaryArteryDiseaseQuizData = {
    guideName: "Coronary Artery Disease",
    guideSlug: "coronary-artery-disease",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient presents to the emergency department with substernal chest pain that began at rest 20 minutes ago and is unrelieved by nitroglycerin. The pain radiates to the left jaw. Previous episodes only occurred with exertion and were relieved by rest. This presentation is most consistent with:",
            options: [
                { id: "a", text: "Stable angina" },
                { id: "b", text: "Unstable angina" },
                { id: "c", text: "Variant (Prinzmetal) angina" },
                { id: "d", text: "Microvascular angina" }
            ],
            correct: "b",
            rationale: {
                correct: "Unstable angina is characterized by a change in the pattern of angina \u2014 chest pain occurring at rest, new-onset angina, or increasing frequency/severity of previous angina. This patient had previously stable exertional angina that has now changed to rest pain unrelieved by NTG, indicating plaque rupture with partial occlusion.",
                a: "Stable angina is predictable \u2014 triggered by exertion, relieved by rest or NTG within 3\u20135 minutes. This patient\u2019s pain is at rest and unrelieved by NTG.",
                c: "Variant (Prinzmetal) angina is caused by coronary vasospasm, typically occurs at rest during early morning hours, and responds well to NTG and calcium channel blockers. This patient\u2019s pain is unrelieved by NTG.",
                d: "Microvascular angina involves small vessel disease and typically presents with exertional symptoms in women. It does not explain a sudden change from stable to rest pain."
            },
            testTakingTip: "The key to this question is change in pattern. Any angina that is new, at rest, or worsening = unstable = emergency. Think of the ACS continuum: stable angina is NOT ACS; unstable angina IS ACS.",
            guideSection: "Section 3 \u2014 ACS Continuum",
            guideSectionId: "angina"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a history of COPD is scheduled for a pharmacologic stress test. The nurse notes the order is for an adenosine stress test. The nurse should:",
            options: [
                { id: "a", text: "Proceed with the test as ordered" },
                { id: "b", text: "Withhold the patient\u2019s bronchodilator inhalers" },
                { id: "c", text: "Question the order and notify the provider" },
                { id: "d", text: "Administer albuterol prophylactically before the test" }
            ],
            correct: "c",
            rationale: {
                correct: "Adenosine and dipyridamole are vasodilator stress agents that are contraindicated in patients with reactive airway disease (asthma, COPD with bronchospastic component) because they can trigger severe bronchospasm. The nurse should question this order \u2014 a dobutamine stress test would be a safer alternative for this patient.",
                a: "Proceeding could cause life-threatening bronchospasm. Nurses have a duty to question orders that may harm the patient.",
                b: "Withholding bronchodilators in a COPD patient before a test that can cause bronchospasm would increase risk, not decrease it.",
                d: "Prophylactic albuterol does not make adenosine safe for reactive airway patients. The test agent itself needs to be changed."
            },
            testTakingTip: "Remember: Adenosine/dipyridamole = NO asthma/COPD. Use dobutamine instead. Aminophylline is the reversal agent for adenosine. Caffeine must be held 24\u201348 hours before vasodilator stress tests.",
            guideSection: "Section 4 \u2014 Diagnostic Testing",
            guideSectionId: "diagnostics"
        },
        {
            id: 3,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with known stable angina reports substernal chest pressure that began 5 minutes ago while walking in the hallway. Place the nursing actions in the correct sequence.",
            options: [
                { id: "a", text: "Stop activity and have the patient sit or lie down to rest" },
                { id: "b", text: "Administer one sublingual nitroglycerin tablet" },
                { id: "c", text: "Reassess pain after 5 minutes" },
                { id: "d", text: "Administer a second sublingual nitroglycerin if pain persists" },
                { id: "e", text: "Call 911 or activate rapid response if pain is unrelieved after 3 doses" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence follows the angina response protocol: eliminate the precipitating factor (stop activity), administer vasodilator (NTG), assess for response, repeat if needed, and escalate to emergency care if unrelieved.",
                a: "FIRST \u2014 Stopping activity immediately reduces myocardial oxygen demand, the underlying cause of stable angina.",
                b: "SECOND \u2014 After the patient is resting, administer sublingual NTG. NTG causes vasodilation, reducing preload and afterload. The patient should be seated to prevent orthostatic hypotension.",
                c: "THIRD \u2014 Wait 5 minutes and reassess pain. Sublingual NTG peaks at about 5 minutes. This determines whether the episode is resolving or escalating.",
                d: "FOURTH \u2014 If pain persists, administer a second sublingual NTG. Per current AHA guidelines, calling 911 is recommended after the first unrelieved dose for outpatients.",
                e: "FIFTH \u2014 If pain remains unrelieved after maximum NTG doses, this is a potential ACS event. Call 911 or activate rapid response for emergent evaluation."
            },
            testTakingTip: "Angina protocol: REST \u2192 NTG \u2192 REASSESS \u2192 REPEAT \u2192 RESCUE. NTG is contraindicated if SBP <90 or if patient took a PDE5 inhibitor (Viagra/Cialis) within 24\u201348 hours.",
            guideSection: "Section 6 \u2014 Cardiac Catheterization & PCI",
            guideSectionId: "catheterization"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "Four hours after a cardiac catheterization via the right femoral artery, the patient reports sudden severe back pain and a \"warm, wet feeling.\" The nurse notes the dressing is dry and intact. Vital signs: BP 88/52, HR 118, RR 22. The nurse should FIRST:",
            options: [
                { id: "a", text: "Increase the IV fluid rate and call the provider" },
                { id: "b", text: "Apply firm pressure to the groin access site" },
                { id: "c", text: "Lower the head of the bed flat and apply manual pressure to the abdomen/flank area" },
                { id: "d", text: "Check the hemoglobin and hematocrit levels" }
            ],
            correct: "a",
            rationale: {
                correct: "This is a classic retroperitoneal hemorrhage presentation \u2014 back/flank pain, hypotension, tachycardia, with a DRY access site dressing (the bleeding is internal, not visible). The priority is to stabilize the patient hemodynamically (increase IV fluids to maintain perfusion) and immediately notify the provider, as this is a life-threatening emergency requiring possible surgical intervention.",
                b: "The dressing is dry \u2014 groin pressure won\u2019t help because the bleeding is retroperitoneal, not at the surface puncture site.",
                c: "Lowering HOB is appropriate for hypotension, but applying abdominal pressure is not effective for retroperitoneal bleeding and could worsen it.",
                d: "Labs are appropriate but take time. In an actively hemorrhaging patient with hemodynamic instability, fluid resuscitation and provider notification take priority over diagnostics."
            },
            testTakingTip: "Retroperitoneal bleed triad: Back pain + hypotension + tachycardia with DRY dressing = bleeding you can\u2019t see. This is the most dangerous post-cath complication. Don\u2019t be tricked by the dry dressing \u2014 internal bleeding doesn\u2019t show externally.",
            guideSection: "Section 6 \u2014 Post-Catheterization Complications",
            guideSectionId: "catheterization"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient who received a drug-eluting stent 3 months ago tells the nurse, \"My dentist wants me to stop my clopidogrel before a tooth extraction next week.\" The most appropriate nursing response is:",
            options: [
                { id: "a", text: "\"That\u2019s a good idea \u2014 stopping blood thinners before dental work reduces bleeding risk.\"" },
                { id: "b", text: "\"You should never stop that medication. Contact your cardiologist before making any changes.\"" },
                { id: "c", text: "\"You can stop the clopidogrel but continue taking aspirin.\"" },
                { id: "d", text: "\"Switch to warfarin temporarily for the dental procedure.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "After drug-eluting stent (DES) placement, dual antiplatelet therapy (DAPT = aspirin + P2Y12 inhibitor like clopidogrel) must continue for at least 12 months. Stopping clopidogrel prematurely carries a 20\u201340% risk of acute stent thrombosis, which can be fatal. The cardiologist must be consulted before any changes to antiplatelet therapy.",
                a: "Stopping DAPT early after DES is life-threatening. Dental bleeding risk is far less dangerous than stent thrombosis risk.",
                c: "Stopping one component of DAPT without cardiologist approval increases stent thrombosis risk. Both agents are needed for the full prescribed duration.",
                d: "Warfarin does not prevent stent thrombosis \u2014 it works on the coagulation cascade, not platelet aggregation. It is not a substitute for antiplatelet therapy."
            },
            testTakingTip: "DAPT after stent = non-negotiable. Drug-eluting stent: 12 months minimum. Bare-metal stent: 1\u20133 months minimum. Stopping early = stent thrombosis = MI or death. Always consult cardiology first.",
            guideSection: "Section 7 \u2014 DAPT After Stent Placement",
            guideSectionId: "management"
        },
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Modifiable Risk Factor", "Non-Modifiable Risk Factor"],
            stem: "A nurse is educating a patient about coronary artery disease risk factors. For each factor, indicate whether it is modifiable or non-modifiable.",
            options: [
                { id: "a", text: "Smoking one pack of cigarettes per day for 15 years" },
                { id: "b", text: "Father had a myocardial infarction at age 50" },
                { id: "c", text: "Total cholesterol 260 mg/dL with LDL 180 mg/dL" },
                { id: "d", text: "Male patient who is 58 years old" }
            ],
            correct: { a: "Modifiable Risk Factor", b: "Non-Modifiable Risk Factor", c: "Modifiable Risk Factor", d: "Non-Modifiable Risk Factor" },
            rationale: {
                correct: "Modifiable risk factors are those the patient can change through lifestyle or medical intervention. Non-modifiable factors cannot be changed but awareness allows for aggressive management of modifiable factors.",
                a: "MODIFIABLE \u2014 Smoking is the single most preventable cause of cardiovascular death. Within 1 year of quitting, cardiovascular risk decreases by 50%. Complete cessation is the goal.",
                b: "NON-MODIFIABLE \u2014 A first-degree male relative with CAD before age 55 is a significant non-modifiable risk factor. Genetic predisposition cannot be changed.",
                c: "MODIFIABLE \u2014 Hyperlipidemia is treatable through diet, exercise, weight loss, and statin therapy. For established CAD, the LDL target is <70 mg/dL.",
                d: "NON-MODIFIABLE \u2014 Age is the strongest non-modifiable risk factor. Risk increases significantly in males >45 and females >55 (post-menopausal)."
            },
            testTakingTip: "Modifiable CAD risk factors: smoking, hyperlipidemia, hypertension, diabetes, obesity, sedentary lifestyle. Non-modifiable: age (M >45, F >55), sex, family history. The NCLEX tests which factors the nurse should focus education on.",
            guideSection: "Section 5 \u2014 Risk Factor Modification",
            guideSectionId: "risk-factors"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient experiencing chest pain takes one sublingual nitroglycerin tablet. After 5 minutes, the pain persists. The nurse should instruct the patient to:",
            options: [
                { id: "a", text: "Take a second NTG tablet and wait another 5 minutes" },
                { id: "b", text: "Call 911 immediately" },
                { id: "c", text: "Lie down and take two more NTG tablets at once" },
                { id: "d", text: "Drive to the nearest emergency department" }
            ],
            correct: "b",
            rationale: {
                correct: "Per current AHA guidelines, if chest pain is not relieved after ONE sublingual NTG dose within 5 minutes, the patient should call 911 immediately. This represents a potential ACS event. The older \"take up to 3 NTG\" protocol has been updated \u2014 calling 911 after the first unrelieved dose is now the standard.",
                a: "The outdated protocol allowed up to 3 NTG doses at 5-minute intervals. Current AHA guidelines recommend calling 911 if pain persists after the first dose to avoid delaying emergency care.",
                c: "Taking two tablets at once increases the risk of severe hypotension and is never appropriate.",
                d: "Patients experiencing a potential cardiac event should NEVER drive themselves. They could lose consciousness while driving. Call 911 for transport."
            },
            testTakingTip: "Updated NTG protocol: Take 1 NTG \u2192 wait 5 min \u2192 if not relieved, call 911. Do NOT wait through 3 doses. Also remember: sit or lie down before taking NTG (prevents orthostatic hypotension), and NTG is contraindicated if the patient took a PDE5 inhibitor (Viagra) within 24\u201348 hours.",
            guideSection: "Section 7 \u2014 Nitroglycerin Administration",
            guideSectionId: "management"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient returns to the nursing unit after a cardiac catheterization via the right femoral artery. Which nursing assessment is the HIGHEST priority during the first 4 hours post-procedure?",
            options: [
                { id: "a", text: "Monitoring right pedal pulse, skin color, and temperature of the affected extremity" },
                { id: "b", text: "Encouraging the patient to ambulate early to prevent deep vein thrombosis" },
                { id: "c", text: "Elevating the right leg on two pillows to reduce swelling" },
                { id: "d", text: "Restricting all oral intake until the sedation has fully worn off" }
            ],
            correct: "a",
            rationale: {
                correct: "After femoral artery catheterization, the highest nursing priority is neurovascular assessment of the affected extremity. The nurse should check the pedal pulse (dorsalis pedis and posterior tibial), skin color, temperature, sensation, and capillary refill distal to the access site every 15 minutes for the first hour, then every 30 minutes to hourly. Loss of pulse, pallor, coolness, or pain could indicate arterial occlusion from a thrombus or hematoma \u2014 a surgical emergency.",
                b: "Early ambulation is contraindicated after femoral access. The patient must remain on bed rest with the affected leg straight for 2\u20136 hours to allow the arterial puncture site to seal. Bending the leg or ambulating too early can cause bleeding or hematoma formation.",
                c: "The affected leg should be kept STRAIGHT and FLAT, not elevated. Bending at the hip (including pillow elevation) increases pressure on the femoral access site and can dislodge the hemostatic clot, causing bleeding.",
                d: "While the patient should be assessed for swallowing ability after sedation, complete NPO status is not the highest priority. The patient is usually encouraged to drink fluids to help flush the contrast dye and protect kidney function."
            },
            testTakingTip: "Post-femoral cath priorities: (1) Neurovascular checks q15min \u00d74, then hourly (pulse, color, temp, sensation). (2) Bed rest 2\u20136 hours, leg STRAIGHT. (3) Watch for retroperitoneal bleed (back pain + hypotension + dry dressing = hidden bleeding). (4) Encourage fluids to flush contrast dye.",
            guideSection: "Section 6 \u2014 Post-Catheterization Complications",
            guideSectionId: "catheterization"
        }
    ]
};
