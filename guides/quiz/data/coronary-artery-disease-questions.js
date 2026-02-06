/**
 * Coronary Artery Disease Quiz — Question Data
 * Extracted from guides/coronary-artery-disease.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 SATA, 2 Priority
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
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing a patient for a cardiac catheterization via the right femoral artery. Which nursing actions are appropriate? (Select all that apply.)",
            options: [
                { id: "a", text: "Assess and mark the location of bilateral pedal pulses" },
                { id: "b", text: "Verify that informed consent has been signed" },
                { id: "c", text: "Hold metformin for 48 hours before the procedure" },
                { id: "d", text: "Confirm allergy status, especially to iodine and shellfish" },
                { id: "e", text: "Place the patient on bedrest with the affected leg straight after the procedure" }
            ],
            correct: ["a", "b", "d", "e"],
            rationale: {
                correct: "Marking pedal pulses before the procedure establishes a baseline for post-cath neurovascular checks. Informed consent is required for all invasive procedures. Contrast dye is iodine-based; allergy assessment prevents anaphylaxis. Post-femoral cath: bedrest 4\u20136 hours with leg straight and HOB \u226430\u00b0 to prevent bleeding.",
                a: "CORRECT \u2014 Marking pedal pulses before the procedure establishes a baseline for post-cath neurovascular checks.",
                b: "CORRECT \u2014 Informed consent is required for all invasive procedures.",
                c: "INCORRECT \u2014 Metformin is held for 48 hours after the procedure (not before) due to the risk of contrast-induced nephropathy combined with metformin leading to lactic acidosis. Metformin is resumed when renal function is confirmed normal.",
                d: "CORRECT \u2014 Contrast dye is iodine-based; allergy assessment prevents anaphylaxis.",
                e: "CORRECT \u2014 Post-femoral cath: bedrest 4\u20136 hours with leg straight and HOB \u226430\u00b0 to prevent bleeding."
            },
            testTakingTip: "For cardiac cath questions, remember the timing: metformin held AFTER (not before). Mark pulses BEFORE (baseline). Keep leg straight AFTER femoral approach. The #1 complication is bleeding at the access site.",
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
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A patient with newly diagnosed coronary artery disease is being discharged on the \"ABCDE\" secondary prevention regimen. Which statements by the patient indicate correct understanding? (Select all that apply.)",
            options: [
                { id: "a", text: "\"I need to take my aspirin and ACE inhibitor every day.\"" },
                { id: "b", text: "\"My LDL cholesterol goal is below 100.\"" },
                { id: "c", text: "\"I should start a cardiac rehab exercise program.\"" },
                { id: "d", text: "\"My beta-blocker will help control my heart rate and blood pressure.\"" },
                { id: "e", text: "\"I can continue smoking as long as I cut down to half a pack per day.\"" }
            ],
            correct: ["a", "c", "d"],
            rationale: {
                correct: "ABCDE: A = Aspirin/Antiplatelet + ACE inhibitor \u2014 both are standard secondary prevention. E = Exercise \u2014 cardiac rehab reduces mortality 20\u201330%. B = Beta-blockers/BP control \u2014 beta-blockers reduce myocardial oxygen demand and control heart rate.",
                a: "CORRECT \u2014 ABCDE: A = Aspirin/Antiplatelet + ACE inhibitor \u2014 both are standard secondary prevention.",
                b: "INCORRECT \u2014 For established CAD/ACS, the LDL target is <70 mg/dL (not <100). The <100 target is for primary prevention in high-risk patients without established disease.",
                c: "CORRECT \u2014 E = Exercise \u2014 cardiac rehab reduces mortality 20\u201330%.",
                d: "CORRECT \u2014 B = Beta-blockers/BP control \u2014 beta-blockers reduce myocardial oxygen demand and control heart rate.",
                e: "INCORRECT \u2014 Complete smoking cessation is required \u2014 there is no \"safe\" level of smoking. The C in ABCDE stands for Cholesterol AND Cigarettes (quit completely). Reducing intake still carries significant cardiovascular risk."
            },
            testTakingTip: "Memorize ABCDE: Aspirin/ACEi, Beta-blockers/BP, Cholesterol/Cigarettes, Diet/Diabetes, Exercise. Know that established CAD requires LDL <70 (stricter than primary prevention).",
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
            stem: "A patient is scheduled for an adenosine pharmacologic stress test tomorrow morning. The nurse reviews the patient\u2019s dietary intake from today and finds the patient drank a large coffee at 2 PM. The nurse should:",
            options: [
                { id: "a", text: "Proceed with the test as scheduled" },
                { id: "b", text: "Notify the provider that the test may need to be rescheduled" },
                { id: "c", text: "Administer aminophylline to counteract the caffeine" },
                { id: "d", text: "Switch the order to a dobutamine stress test" }
            ],
            correct: "b",
            rationale: {
                correct: "Caffeine is a competitive antagonist at adenosine receptors. Patients must abstain from ALL caffeine (coffee, tea, chocolate, energy drinks, some medications) for 24\u201348 hours before an adenosine or dipyridamole stress test. Coffee consumed the afternoon before may not have cleared sufficiently, making the test results unreliable. The provider should be notified.",
                a: "Caffeine blocks adenosine receptors, rendering the stress agent ineffective. The test would produce false-negative results and waste resources.",
                c: "Aminophylline is the reversal agent for adenosine side effects, not a prep medication. Giving it before would further block adenosine\u2019s effect.",
                d: "Switching to a different test type requires a provider order. The nurse should notify the provider, who will decide whether to reschedule or change the test type."
            },
            testTakingTip: "Caffeine is the #1 reason stress tests get cancelled. Hold ALL caffeine 24\u201348 hours before adenosine/dipyridamole tests. Caffeine doesn\u2019t affect dobutamine tests (different mechanism). Aminophylline = reversal agent, not preventive.",
            guideSection: "Section 4 \u2014 Stress Testing",
            guideSectionId: "diagnostics"
        }
    ]
};
