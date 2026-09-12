/**
 * Coronary Artery Disease Quiz - Question Data
 * Extracted from guides/coronary-artery-disease.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Ordering, 1 Matrix
 */

/* exported coronaryArteryDiseaseQuizData */
var coronaryArteryDiseaseQuizData = {
    guideName: "Coronary Artery Disease",
    guideSlug: "coronary-artery-disease",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 20,
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
                correct: "Unstable angina is characterized by a change in the pattern of angina - chest pain occurring at rest, new-onset angina, or increasing frequency/severity of previous angina. This patient had previously stable exertional angina that has now changed to rest pain unrelieved by NTG, indicating plaque rupture with partial occlusion.",
                a: "Stable angina is predictable - triggered by exertion, relieved by rest or NTG within 3\u20135 minutes. This patient\u2019s pain is at rest and unrelieved by NTG.",
                c: "Variant (Prinzmetal) angina is caused by coronary vasospasm, typically occurs at rest during early morning hours, and responds well to NTG and calcium channel blockers. This patient\u2019s pain is unrelieved by NTG.",
                d: "Microvascular angina involves small vessel disease and typically presents with exertional symptoms in women. It does not explain a sudden change from stable to rest pain."
            },
            testTakingTip: "The key to this question is change in pattern. Any angina that is new, at rest, or worsening = unstable = emergency. Think of the ACS continuum: stable angina is NOT ACS; unstable angina IS ACS.",
            guideSection: "Section 3 - ACS Continuum",
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
                correct: "Adenosine and dipyridamole are vasodilator stress agents that are contraindicated in patients with reactive airway disease (asthma, COPD with bronchospastic component) because they can trigger severe bronchospasm. The nurse should question this order - a dobutamine stress test would be a safer alternative for this patient.",
                a: "Proceeding could cause life-threatening bronchospasm. Nurses have a duty to question orders that may harm the patient.",
                b: "Withholding bronchodilators in a COPD patient before a test that can cause bronchospasm would increase risk, not decrease it.",
                d: "Prophylactic albuterol does not make adenosine safe for reactive airway patients. The test agent itself needs to be changed."
            },
            testTakingTip: "Remember: Adenosine/dipyridamole = NO asthma/COPD. Use dobutamine instead. Aminophylline is the reversal agent for adenosine. Caffeine must be held 24\u201348 hours before vasodilator stress tests.",
            guideSection: "Section 4 - Diagnostic Testing",
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
                a: "FIRST - Stopping activity immediately reduces myocardial oxygen demand, the underlying cause of stable angina.",
                b: "SECOND - After the patient is resting, administer sublingual NTG. NTG causes vasodilation, reducing preload and afterload. The patient should be seated to prevent orthostatic hypotension.",
                c: "THIRD - Wait 5 minutes and reassess pain. Sublingual NTG peaks at about 5 minutes. This determines whether the episode is resolving or escalating.",
                d: "FOURTH - If pain persists, administer a second sublingual NTG. Per current AHA guidelines, calling 911 is recommended after the first unrelieved dose for outpatients.",
                e: "FIFTH - If pain remains unrelieved after maximum NTG doses, this is a potential ACS event. Call 911 or activate rapid response for emergent evaluation."
            },
            testTakingTip: "Angina protocol: REST \u2192 NTG \u2192 REASSESS \u2192 REPEAT \u2192 RESCUE. NTG is contraindicated if SBP <90 or if patient took a PDE5 inhibitor (Viagra/Cialis) within 24\u201348 hours.",
            guideSection: "Section 6 - Cardiac Catheterization & PCI",
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
                correct: "This is a classic retroperitoneal hemorrhage presentation - back/flank pain, hypotension, tachycardia, with a DRY access site dressing (the bleeding is internal, not visible). The priority is to stabilize the patient hemodynamically (increase IV fluids to maintain perfusion) and immediately notify the provider, as this is a life-threatening emergency requiring possible surgical intervention.",
                b: "The dressing is dry - groin pressure won\u2019t help because the bleeding is retroperitoneal, not at the surface puncture site.",
                c: "Lowering HOB is appropriate for hypotension, but applying abdominal pressure is not effective for retroperitoneal bleeding and could worsen it.",
                d: "Labs are appropriate but take time. In an actively hemorrhaging patient with hemodynamic instability, fluid resuscitation and provider notification take priority over diagnostics."
            },
            testTakingTip: "Retroperitoneal bleed triad: Back pain + hypotension + tachycardia with DRY dressing = bleeding you can\u2019t see. This is the most dangerous post-cath complication. Don\u2019t be tricked by the dry dressing - internal bleeding doesn\u2019t show externally.",
            guideSection: "Section 6 - Post-Catheterization Complications",
            guideSectionId: "catheterization"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient who received a drug-eluting stent 3 months ago tells the nurse, \"My dentist wants me to stop my clopidogrel before a tooth extraction next week.\" The most appropriate nursing response is:",
            options: [
                { id: "a", text: "\"That\u2019s a good idea - stopping blood thinners before dental work reduces bleeding risk.\"" },
                { id: "b", text: "\"You should never stop that medication. Contact your cardiologist before making any changes.\"" },
                { id: "c", text: "\"You can stop the clopidogrel but continue taking aspirin.\"" },
                { id: "d", text: "\"Switch to warfarin temporarily for the dental procedure.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "After drug-eluting stent (DES) placement, dual antiplatelet therapy (DAPT = aspirin + P2Y12 inhibitor like clopidogrel) must continue for at least 12 months. Stopping clopidogrel prematurely carries a 20\u201340% risk of acute stent thrombosis, which can be fatal. The cardiologist must be consulted before any changes to antiplatelet therapy.",
                a: "Stopping DAPT early after DES is life-threatening. Dental bleeding risk is far less dangerous than stent thrombosis risk.",
                c: "Stopping one component of DAPT without cardiologist approval increases stent thrombosis risk. Both agents are needed for the full prescribed duration.",
                d: "Warfarin does not prevent stent thrombosis - it works on the coagulation cascade, not platelet aggregation. It is not a substitute for antiplatelet therapy."
            },
            testTakingTip: "DAPT after stent = non-negotiable. Drug-eluting stent: 12 months minimum. Bare-metal stent: 1\u20133 months minimum. Stopping early = stent thrombosis = MI or death. Always consult cardiology first.",
            guideSection: "Section 7 - DAPT After Stent Placement",
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
                a: "MODIFIABLE - Smoking is the single most preventable cause of cardiovascular death. Within 1 year of quitting, cardiovascular risk decreases by 50%. Complete cessation is the goal.",
                b: "NON-MODIFIABLE - A first-degree male relative with CAD before age 55 is a significant non-modifiable risk factor. Genetic predisposition cannot be changed.",
                c: "MODIFIABLE - Hyperlipidemia is treatable through diet, exercise, weight loss, and statin therapy. For established CAD, the LDL target is <70 mg/dL.",
                d: "NON-MODIFIABLE - Age is the strongest non-modifiable risk factor. Risk increases significantly in males >45 and females >55 (post-menopausal)."
            },
            testTakingTip: "Modifiable CAD risk factors: smoking, hyperlipidemia, hypertension, diabetes, obesity, sedentary lifestyle. Non-modifiable: age (M >45, F >55), sex, family history. The NCLEX tests which factors the nurse should focus education on.",
            guideSection: "Section 5 - Risk Factor Modification",
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
                correct: "Per current AHA guidelines, if chest pain is not relieved after ONE sublingual NTG dose within 5 minutes, the patient should call 911 immediately. This represents a potential ACS event. The older \"take up to 3 NTG\" protocol has been updated - calling 911 after the first unrelieved dose is now the standard.",
                a: "The outdated protocol allowed up to 3 NTG doses at 5-minute intervals. Current AHA guidelines recommend calling 911 if pain persists after the first dose to avoid delaying emergency care.",
                c: "Taking two tablets at once increases the risk of severe hypotension and is never appropriate.",
                d: "Patients experiencing a potential cardiac event should NEVER drive themselves. They could lose consciousness while driving. Call 911 for transport."
            },
            testTakingTip: "Updated NTG protocol: Take 1 NTG \u2192 wait 5 min \u2192 if not relieved, call 911. Do NOT wait through 3 doses. Also remember: sit or lie down before taking NTG (prevents orthostatic hypotension), and NTG is contraindicated if the patient took a PDE5 inhibitor (Viagra) within 24\u201348 hours.",
            guideSection: "Section 7 - Nitroglycerin Administration",
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
                correct: "After femoral artery catheterization, the highest nursing priority is neurovascular assessment of the affected extremity. The nurse should check the pedal pulse (dorsalis pedis and posterior tibial), skin color, temperature, sensation, and capillary refill distal to the access site every 15 minutes for the first hour, then every 30 minutes to hourly. Loss of pulse, pallor, coolness, or pain could indicate arterial occlusion from a thrombus or hematoma - a surgical emergency.",
                b: "Early ambulation is contraindicated after femoral access. The patient must remain on bed rest with the affected leg straight for 2\u20136 hours to allow the arterial puncture site to seal. Bending the leg or ambulating too early can cause bleeding or hematoma formation.",
                c: "The affected leg should be kept STRAIGHT and FLAT, not elevated. Bending at the hip (including pillow elevation) increases pressure on the femoral access site and can dislodge the hemostatic clot, causing bleeding.",
                d: "While the patient should be assessed for swallowing ability after sedation, complete NPO status is not the highest priority. The patient is usually encouraged to drink fluids to help flush the contrast dye and protect kidney function."
            },
            testTakingTip: "Post-femoral cath priorities: (1) Neurovascular checks q15min \u00d74, then hourly (pulse, color, temp, sensation). (2) Bed rest 2\u20136 hours, leg STRAIGHT. (3) Watch for retroperitoneal bleed (back pain + hypotension + dry dressing = hidden bleeding). (4) Encourage fluids to flush contrast dye.",
            guideSection: "Section 6 - Post-Catheterization Complications",
            guideSectionId: "catheterization"
        },
        {
            id: 9, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient is admitted with an inferior wall myocardial infarction. Which complication should the nurse anticipate based on the artery most likely involved?",
            options: [
                { id: "a", text: "Bradycardia and heart block from loss of nodal supply" },
                { id: "b", text: "Loss of the largest area of left ventricular muscle" },
                { id: "c", text: "Immediate death from occlusion of the left main artery" },
                { id: "d", text: "Isolated damage to the lateral left ventricular wall" }
            ],
            correct: "a",
            rationale: {
                correct: "An inferior myocardial infarction points to the right coronary artery, which supplies the right ventricle, the inferior left ventricle and both the sinoatrial and atrioventricular nodes. When the nodes lose their supply, bradycardia and heart blocks follow.",
                b: "The largest area of muscle is lost in an anterior infarction from the left anterior descending artery.",
                c: "Left main occlusion is the widow maker and is often fatal, but it does not produce an isolated inferior pattern.",
                d: "The lateral and posterior walls are supplied by the left circumflex artery."
            },
            testTakingTip: "Learn four vessels and the region each feeds. Inferior means right coronary artery, so watch the rate and the conduction.",
            guideSection: "Section 3 - Which artery, which damage",
            guideSectionId: "anatomy"
        },
        {
            id: 10, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks why beta blockers are considered cornerstone therapy in coronary artery disease rather than simply blood pressure drugs. Which explanation is correct?",
            options: [
                { id: "a", text: "Slowing the rate lengthens diastole, when the coronaries fill" },
                { id: "b", text: "Slowing the rate lengthens systole, when the coronaries fill" },
                { id: "c", text: "Blocking beta receptors dilates the coronary arteries directly" },
                { id: "d", text: "Blocking beta receptors dissolves the plaque within the vessel" }
            ],
            correct: "a",
            rationale: {
                correct: "Every other organ perfuses during systole, but the contracting heart squeezes its own vessels shut, so the coronaries fill during diastole. Slowing the rate lengthens diastole and buys coronary filling time, which is why tachycardia is dangerous here.",
                b: "The coronaries fill during diastole, not systole, which is the whole point of the rule.",
                c: "Beta blockade lowers demand. Coronary dilation is what nitrates do.",
                d: "No drug dissolves an established plaque. Statins stabilise the cap rather than remove it."
            },
            testTakingTip: "The heart is the one organ that perfuses in diastole. Anything shortening diastole starves it.",
            guideSection: "Section 3 - Which artery, which damage",
            guideSectionId: "anatomy"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient with only mild narrowing on angiography has a myocardial infarction, while another with 80 percent stenosis has been stable for years. Which statement explains this?",
            options: [
                { id: "a", text: "Plaque stability matters more than plaque size does" },
                { id: "b", text: "Plaque size matters more than plaque stability does" },
                { id: "c", text: "Angiography cannot detect narrowing under 50 percent" },
                { id: "d", text: "Stable patients have no plaque, only arterial spasm" }
            ],
            correct: "a",
            rationale: {
                correct: "A large plaque with a thick fibrous cap narrows the vessel and causes predictable exertional angina, but rarely ruptures. A smaller plaque with a thin inflamed cap barely narrows anything and can tear open today. The plaque that kills is usually not the biggest one.",
                b: "Size predicts symptoms on exertion. It does not predict rupture, which is what causes an infarction.",
                c: "Angiography visualises lesser degrees of narrowing perfectly well.",
                d: "The stable patient in this scenario has substantial plaque, and spasm is a separate mechanism."
            },
            testTakingTip: "Stability beats size. It is also why statins matter beyond the cholesterol number, because they thicken and stabilise the cap.",
            guideSection: "Section 4 - How a plaque turns dangerous",
            guideSectionId: "pathophysiology"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "application",
            stem: "A patient has left main coronary stenosis of 60 percent and three vessel disease with diabetes. Which treatment should the nurse anticipate?",
            options: [
                { id: "a", text: "Coronary artery bypass graft surgery" },
                { id: "b", text: "Percutaneous coronary intervention with a stent" },
                { id: "c", text: "Medication therapy alone without a procedure" },
                { id: "d", text: "Repeat angiography in six months before deciding" }
            ],
            correct: "a",
            rationale: {
                correct: "Bypass surgery is preferred for left main disease at 50 percent stenosis or more, and for three vessel disease, especially with diabetes or a reduced ejection fraction. This patient meets several of those criteria.",
                b: "Percutaneous coronary intervention suits one or two vessel disease, acute infarction, or patients too high risk for surgery.",
                c: "Drugs alone are insufficient once the anatomy reaches this severity.",
                d: "Delaying six months with left main disease leaves a large territory at risk."
            },
            testTakingTip: "Left main at 50 percent or more, or three vessel disease with diabetes, sends the patient to surgery rather than a stent.",
            guideSection: "Section 10 - PCI or bypass",
            guideSectionId: "interventions"
        },
        {
            id: 13, type: "single", subtype: "priority", difficulty: "analysis",
            stem: "A patient who received a drug eluting stent 2 months ago says they stopped the clopidogrel because it was expensive. What should the nurse do?",
            options: [
                { id: "a", text: "Contact cardiology urgently and explain the clot risk" },
                { id: "b", text: "Reassure the patient that aspirin alone is sufficient" },
                { id: "c", text: "Suggest restarting it at the next scheduled appointment" },
                { id: "d", text: "Advise taking it every other day to reduce the cost" }
            ],
            correct: "a",
            rationale: {
                correct: "A fresh stent is bare metal in an artery until endothelium grows over it, which takes 6 to 12 months. Stopping the P2Y12 inhibitor early lets the stent clot, and acute stent thrombosis carries 20 to 40 percent mortality. This is urgent.",
                b: "Aspirin alone does not protect a stent inside the dual antiplatelet window.",
                c: "Waiting for the next appointment leaves the patient unprotected for days or weeks.",
                d: "Halving the frequency is not a recognised regimen and does not maintain platelet inhibition."
            },
            testTakingTip: "Teach dual antiplatelet therapy as an absolute for 6 to 12 months. Never stopped without calling cardiology first.",
            guideSection: "Section 10 - PCI or bypass",
            guideSectionId: "interventions"
        },
        {
            id: 14, type: "single", subtype: null, difficulty: "application",
            stem: "A patient with stable angina takes one sublingual nitroglycerin tablet for chest pain. Five minutes later the pain is unchanged. What should the patient be taught to do?",
            options: [
                { id: "a", text: "Call 911 and then take a second tablet" },
                { id: "b", text: "Take two more tablets before calling for help" },
                { id: "c", text: "Wait fifteen minutes before taking another tablet" },
                { id: "d", text: "Take no further tablets and rest until it passes" }
            ],
            correct: "a",
            rationale: {
                correct: "Emergency services are called if the pain is unrelieved 5 minutes after the first tablet. Up to three tablets may be taken 5 minutes apart, but the call is made at the 5 minute mark rather than after all three.",
                b: "Finishing all three tablets before calling delays help by 10 minutes or more.",
                c: "The interval between tablets is 5 minutes, not fifteen.",
                d: "Chest pain unrelieved by nitroglycerin is treated as an emergency, not waited out."
            },
            testTakingTip: "One tablet, then call at 5 minutes. Up to three tablets, 5 minutes apart, but the call does not wait for the third.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A patient recovering from coronary artery bypass graft surgery asks about lifting restrictions at home. What should the nurse advise?",
            options: [
                { id: "a", text: "Avoid lifting over 5 to 10 pounds for 6 to 8 weeks" },
                { id: "b", text: "Avoid lifting over 20 to 25 pounds for 2 to 3 weeks" },
                { id: "c", text: "Avoid lifting anything at all for a full 6 months" },
                { id: "d", text: "Resume normal lifting as soon as the pain settles" }
            ],
            correct: "a",
            rationale: {
                correct: "The sternum takes 6 to 8 weeks to heal after bypass surgery, and lifting more than 5 to 10 pounds during that window strains the healing bone.",
                b: "Twenty five pounds is far too heavy for a sternum that has not yet knitted.",
                c: "Six months of no lifting is longer than the bone needs and would prevent normal recovery.",
                d: "Pain settles well before the sternum has healed, so comfort is not the guide."
            },
            testTakingTip: "Sternal precautions run 6 to 8 weeks. Nothing heavier than 5 to 10 pounds, roughly a gallon of milk.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
