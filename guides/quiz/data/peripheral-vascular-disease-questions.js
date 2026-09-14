/**
 * Peripheral Vascular Disease Quiz - Question Data
 * Extracted from guides/peripheral-vascular-disease.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Matrix, 1 Ordering
 */

/* exported peripheralVascularDiseaseQuizData */
var peripheralVascularDiseaseQuizData = {
    guideName: "Peripheral Vascular Disease",
    guideSlug: "peripheral-vascular-disease",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing two patients - one with peripheral arterial disease (PAD) and one with chronic venous insufficiency (CVI). Which finding is correctly matched to the condition?",
            options: [
                { id: "a", text: "PAD: warm skin, brown discoloration around the ankles" },
                { id: "b", text: "CVI: absent pedal pulses, intermittent claudication" },
                { id: "c", text: "PAD: cool/pale extremity, thin shiny skin, hair loss" },
                { id: "d", text: "CVI: rest pain that worsens with leg elevation" }
            ],
            correct: "c",
            rationale: {
                correct: "PAD involves reduced arterial blood flow to the extremities. Classic findings include cool/pale skin (poor perfusion), thin shiny skin, hair loss on the legs, thickened toenails, and diminished or absent pulses. These are all signs of chronic tissue ischemia from inadequate arterial supply.",
                a: "Warm skin and brown discoloration (hemosiderin staining) are characteristics of CVI, not PAD. PAD causes cool, pale skin.",
                b: "Absent pulses and claudication are arterial (PAD) findings, not venous. CVI has palpable pulses because the arterial system is intact.",
                d: "Rest pain that worsens with elevation is an arterial finding. Venous disease pain is relieved by elevation and worsened by dependency."
            },
            testTakingTip: "Arterial vs Venous at a glance: Arterial = 5 P\u2019s (Pain, Pallor, Pulselessness, Paresthesia, Paralysis), cool, thin skin, hair loss. Venous = warm, edematous, brown staining, dermatitis, aching relieved by elevation.",
            guideSection: "Section 2 - Arterial vs Venous Disease",
            guideSectionId: "arterial-venous"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with PAD has an ankle-brachial index (ABI) of 0.35. The nurse interprets this result as indicating:",
            options: [
                { id: "a", text: "Normal arterial circulation to the lower legs" },
                { id: "b", text: "Mild peripheral arterial disease with claudication" },
                { id: "c", text: "Moderate peripheral arterial disease with early rest pain" },
                { id: "d", text: "Critical limb ischemia requiring urgent intervention" }
            ],
            correct: "d",
            labValues: [
                { name: "ABI", normal: "0.9\u20131.3" }
            ],
            rationale: {
                correct: "An ABI \u22640.4 indicates critical limb ischemia (CLI) - the most severe form of PAD with high risk for tissue loss and amputation. These patients typically have rest pain, non-healing wounds, and gangrene. Urgent vascular intervention (angioplasty, stenting, or bypass surgery) is needed to prevent limb loss.",
                a: "Normal ankle-brachial index (ABI) is 1.00 to 1.30. An ankle-brachial index of 0.35 is severely abnormal.",
                b: "Mild PAD corresponds to ABI 0.7-0.9, presenting with intermittent claudication.",
                c: "Moderate PAD corresponds to ABI 0.4-0.7, with more significant claudication and possible early rest pain."
            },
            testTakingTip: "Ankle-brachial index (ABI) bands: 1.00 to 1.30 normal, 0.91 to 0.99 borderline, 0.41 to 0.90 mild to moderate peripheral arterial disease, 0.40 or less critical limb ischemia, above 1.30 calcified and unreliable so use a toe-brachial index. An ankle-brachial index measures arterial flow and cannot diagnose a deep vein thrombosis (DVT).",
            guideSection: "Section 4 - Ankle-Brachial Index",
            guideSectionId: "abi"
        },
        {
            id: 3,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Arterial Insufficiency", "Venous Insufficiency"],
            stem: "A nurse is assessing two patients with peripheral vascular disease. For each finding, indicate whether it is characteristic of arterial insufficiency or venous insufficiency.",
            options: [
                { id: "a", text: "Pale, cool extremity with diminished or absent pedal pulses" },
                { id: "b", text: "Brown discoloration around the ankles with bilateral lower extremity edema" },
                { id: "c", text: "Cramping leg pain that occurs with walking and is relieved by rest" },
                { id: "d", text: "Stasis dermatitis with weeping, crusted skin and superficial ulceration near the medial malleolus" }
            ],
            correct: { a: "Arterial Insufficiency", b: "Venous Insufficiency", c: "Arterial Insufficiency", d: "Venous Insufficiency" },
            rationale: {
                correct: "Arterial insufficiency results from inadequate blood flow TO the extremities (pallor, coolness, absent pulses, claudication). Venous insufficiency results from inadequate blood return FROM the extremities (edema, brown staining, dermatitis, stasis ulcers).",
                a: "ARTERIAL - Reduced arterial blood flow causes poor perfusion. The skin becomes pale or cyanotic, cool to touch, with thin shiny skin and hair loss. Pulses are diminished or absent.",
                b: "VENOUS - Brown discoloration (hemosiderin staining) occurs when red blood cells leak from congested veins and break down, depositing iron pigment. Bilateral edema results from venous hypertension.",
                c: "ARTERIAL - Intermittent claudication is the hallmark symptom of PAD. During exercise, muscles demand more oxygen, but narrowed arteries cannot increase supply. Pain is reproducible and relieved by rest.",
                d: "VENOUS - Stasis dermatitis occurs from chronic venous hypertension. Venous ulcers typically form near the medial malleolus, are shallow and irregularly shaped with a moist base."
            },
            testTakingTip: "Arterial vs. Venous: Arterial = cool, pale, pulseless, painful with activity, legs DOWN. Venous = warm, edematous, brown, aching relieved by elevation, legs UP. Ulcer location: arterial = toes/dorsum; venous = medial malleolus.",
            guideSection: "Section 2 - Arterial vs Venous Disease",
            guideSectionId: "arterial-venous"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient 3 days post-hip replacement suddenly develops acute onset of dyspnea, tachycardia (HR 126), chest pain, and an SpO2 of 84% on room air. The nurse suspects this complication and should FIRST:",
            options: [
                { id: "a", text: "Elevate the head of the bed and apply high-flow oxygen" },
                { id: "b", text: "Prepare for a STAT CT pulmonary angiography" },
                { id: "c", text: "Administer sublingual nitroglycerin for chest pain" },
                { id: "d", text: "Apply compression stockings to both legs" }
            ],
            correct: "a",
            rationale: {
                correct: "This presentation - sudden dyspnea, tachycardia, chest pain, and hypoxemia in a post-surgical patient - is classic for pulmonary embolism (PE), the most dangerous complication of DVT. The immediate priority is oxygenation: elevate HOB to optimize breathing and apply high-flow O2 to address the life-threatening hypoxemia (SpO2 84%).",
                b: "CT pulmonary angiography is the gold standard for PE diagnosis, but stabilizing the patient (airway, breathing, circulation) always comes before diagnostics.",
                c: "NTG is for cardiac chest pain (angina). PE chest pain is caused by a mechanical obstruction, not coronary ischemia. NTG would not help and could cause hypotension.",
                d: "Compression stockings are for DVT prevention, not PE treatment. Applying them during an acute PE event does not address the immediate life threat."
            },
            testTakingTip: "PE = sudden onset of the \"3 D's\": Dyspnea, Distress, Desaturation. Post-surgical patients and immobile patients are highest risk. Priority: ABCs first (oxygenate), then diagnose (CT-PA), then treat (anticoagulation or thrombolytics).",
            guideSection: "Section 6 - DVT Complications",
            guideSectionId: "dvt"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is teaching a patient with peripheral arterial disease about proper positioning. Which instruction is correct?",
            options: [
                { id: "a", text: "\"Keep your legs elevated on two pillows while resting in bed.\"" },
                { id: "b", text: "\"Dangle your legs over the side of the bed or keep them level.\"" },
                { id: "c", text: "\"Cross your legs when sitting to improve blood flow.\"" },
                { id: "d", text: "\"Wear compression stockings during the day to improve circulation.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "In PAD, the goal is to promote arterial blood flow TO the ischemic extremities. Keeping legs level or slightly dependent (dangling) uses gravity to assist arterial perfusion. This is the opposite of venous disease positioning.",
                a: "Leg elevation is for VENOUS disease. Elevating legs in PAD would further reduce arterial blood flow to already ischemic tissues, worsening pain and tissue damage.",
                c: "Crossing legs compresses both arterial and venous vessels, reducing blood flow. This is harmful for both PAD and CVI patients.",
                d: "Compression stockings are for VENOUS disease. In PAD, they would compress already narrowed arteries, further reducing blood flow and potentially causing tissue necrosis."
            },
            testTakingTip: "This is one of the most commonly tested PVD concepts: Arterial = legs DOWN (blood needs to get there). Venous = legs UP (blood needs to get back). Mix these up on NCLEX and you\u2019ll get it wrong every time.",
            guideSection: "Section 8 - Treatment & Nursing Care",
            guideSectionId: "interventions"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on heparin therapy for DVT has the following lab results: aPTT 120 seconds (therapeutic range 60-80 seconds), platelets 58,000/mm\u00B3 (baseline 210,000). The nurse should FIRST:",
            options: [
                { id: "a", text: "Continue the heparin drip and recheck labs in 6 hours" },
                { id: "b", text: "Stop the heparin infusion and notify the provider immediately" },
                { id: "c", text: "Administer protamine sulfate to reverse the heparin" },
                { id: "d", text: "Reduce the heparin rate by 50% and recheck aPTT in 2 hours" }
            ],
            correct: "b",
            labValues: [
                { name: "aPTT", normal: "60\u201380 seconds (on heparin)" },
                { name: "Platelets", normal: "150,000\u2013400,000/mm\u00B3" }
            ],
            rationale: {
                correct: "This patient shows two critical findings: a supratherapeutic aPTT (120 sec, well above the 60-80 range) AND a platelet drop >50% from baseline (210,000 \u2192 58,000). The platelet drop strongly suggests heparin-induced thrombocytopenia (HIT) - a life-threatening immune reaction. Heparin must be stopped IMMEDIATELY and the provider notified. HIT paradoxically causes thrombosis, not bleeding.",
                a: "Continuing heparin with suspected HIT and supratherapeutic aPTT is dangerous and could cause fatal thrombosis.",
                c: "Protamine sulfate reverses heparin\u2019s anticoagulant effect but does not treat HIT. The priority is stopping the heparin and notifying the provider, who will order alternative anticoagulation (e.g., argatroban).",
                d: "Dose reduction is inadequate. With suspected HIT, ALL heparin products must be completely discontinued - not just reduced."
            },
            testTakingTip: "HIT red flags: Platelet drop >50% from baseline, typically 5-10 days after starting heparin. Remember: HIT causes CLOTS (not bleeding) despite low platelets. Stop ALL heparin (including flushes). Antidote for heparin = protamine. Antidote for warfarin = vitamin K.",
            guideSection: "Section 8 - Treatment & Nursing Care",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with peripheral arterial disease has a dry, non-healing ulcer on the dorsum of the foot with an ABI of 0.5. Place the wound care priorities in the correct order.",
            options: [
                { id: "a", text: "Assess and document wound characteristics - size, depth, color, drainage, and surrounding skin" },
                { id: "b", text: "Obtain a vascular surgery consult for possible revascularization" },
                { id: "c", text: "Position the extremity flat or slightly dependent - elevate the head of bed, not the legs" },
                { id: "d", text: "Keep the wound clean and dry with a non-adherent dressing" },
                { id: "e", text: "Avoid aggressive debridement until vascular status is optimized" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence prioritizes assessment, then addressing the root cause (poor perfusion), supportive positioning, wound protection, and avoiding interventions that could worsen ischemic tissue. An ABI of 0.5 indicates moderate-to-severe arterial disease.",
                a: "FIRST - Thorough wound assessment establishes the baseline and guides all subsequent care. Document dimensions, depth, tissue color, drainage, and periwound condition.",
                b: "SECOND - With an ABI of 0.5 and a non-healing ulcer, the root cause is inadequate arterial perfusion. Vascular surgery consult for revascularization is the most critical intervention for healing.",
                c: "THIRD - Keep legs flat or slightly dependent (gravity assists arterial perfusion). NEVER elevate - that is for venous disease.",
                d: "FOURTH - Arterial ulcers should be kept clean and dry with non-adherent dressings. Unlike venous ulcers, moist environments in ischemic tissue promote bacterial growth.",
                e: "FIFTH - Aggressive debridement of ischemic tissue is dangerous without adequate perfusion. Defer until after revascularization restores blood flow (typically ABI >0.7)."
            },
            testTakingTip: "PAD wounds: ASSESS \u2192 FIX THE PLUMBING \u2192 POSITION \u2192 PROTECT \u2192 DON'T HARM. Arterial ulcers = keep DRY; venous ulcers = keep MOIST. Never apply compression dressings to arterial wounds.",
            guideSection: "Section 8 - Treatment & Nursing Care",
            guideSectionId: "interventions"
        },
        {
            id: 8,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with PAD reports a sudden onset of severe leg pain with a cold, pale, pulseless left foot. The nurse recognizes this as acute arterial occlusion. What is the priority nursing action?",
            options: [
                { id: "a", text: "Apply warm blankets to the affected extremity" },
                { id: "b", text: "Keep the leg dependent and notify the provider STAT" },
                { id: "c", text: "Administer a dose of the prescribed oral warfarin" },
                { id: "d", text: "Prepare the patient for an ABI measurement" }
            ],
            correct: "b",
            rationale: {
                correct: "Acute arterial occlusion is a vascular emergency - the 6 P\u2019s (Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia). The limb is at risk for irreversible ischemic damage within 4-6 hours. Position the leg dependent (gravity assists arterial flow) and notify the provider STAT for emergent intervention (embolectomy, thrombolytics, or surgical bypass).",
                a: "Do NOT apply external heat to an ischemic limb. Heat increases metabolic demand in tissue that already has inadequate blood supply, accelerating tissue death. Protect with light covering only.",
                c: "Warfarin takes 3-5 days to reach therapeutic effect and will not help in an acute emergency. Heparin or surgical intervention is needed immediately.",
                d: "ABI is a non-emergent diagnostic tool. In acute arterial occlusion, time is tissue - the priority is immediate provider notification and preparation for emergent intervention."
            },
            testTakingTip: "Acute arterial occlusion = 6 P\u2019s = emergency. Think \"time is tissue\" (like \"time is brain\" for stroke). No heat, no elevation, no delay. Keep leg DOWN and call for help immediately. This has a 4-6 hour window before irreversible damage.",
            guideSection: "Section 3 - Peripheral Arterial Disease",
            guideSectionId: "pad"
        },
        {
            id: 9, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks why immobility is such a strong risk factor for deep vein thrombosis (DVT). Which explanation by the nurse is correct?",
            options: [
                { id: "a", text: "The calf muscle is the pump that returns venous blood" },
                { id: "b", text: "The vein walls constrict when the leg is not being used" },
                { id: "c", text: "The arterial supply to the leg falls sharply during rest" },
                { id: "d", text: "The venous valves close permanently after hours of rest" }
            ],
            correct: "a",
            rationale: {
                correct: "Leg veins must move blood uphill with no pump of their own. The calf muscle is that pump, and each contraction squeezes the deep veins upward while the valves stop backflow. Immobility switches off half of venous return, which is the mechanism behind every deep vein thrombosis (DVT) prevention order.",
                b: "Vein walls are thin and do not constrict to drive flow. That is an arterial property.",
                c: "Arterial supply is not what fails in venous thrombosis.",
                d: "Valves do not close permanently with rest. They fail over time from damage, which is a separate problem."
            },
            testTakingTip: "The calf is the second heart. Every prevention order, from walking to compression devices, is an attempt to run that pump.",
            guideSection: "Section 3 - Two systems, one pump you forget",
            guideSectionId: "anatomy"
        },
        {
            id: 10, type: "single", subtype: null, difficulty: "application",
            stem: "A nurse is locating the posterior tibial pulse. Where should the nurse palpate?",
            options: [
                { id: "a", text: "Behind and just below the medial malleolus" },
                { id: "b", text: "On the top of the foot, lateral to the tendon" },
                { id: "c", text: "Deep in the popliteal fossa with the knee bent" },
                { id: "d", text: "At the midpoint of the inguinal ligament in the groin" }
            ],
            correct: "a",
            rationale: {
                correct: "The posterior tibial pulse is found behind and just below the medial malleolus, the bony prominence on the inner ankle. Always compare left with right and document on the 0 to 4 plus scale.",
                b: "That describes the dorsalis pedis, on the top of the foot lateral to the extensor hallucis longus tendon.",
                c: "That describes the popliteal pulse, which is easier to find with the knee slightly flexed.",
                d: "That describes the femoral pulse."
            },
            testTakingTip: "Four pulses to know by landmark: femoral, popliteal, dorsalis pedis and posterior tibial. Compare sides every time.",
            guideSection: "Section 3 - Two systems, one pump you forget",
            guideSectionId: "anatomy"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient has brown discoloration of the lower legs, hard fibrotic skin giving an inverted champagne bottle shape, and a shallow ulcer at the medial malleolus. What do these findings indicate?",
            options: [
                { id: "a", text: "Chronic venous insufficiency from sustained venous pressure" },
                { id: "b", text: "Peripheral arterial disease from progressive atherosclerosis" },
                { id: "c", text: "Acute arterial occlusion requiring immediate reperfusion now" },
                { id: "d", text: "Cellulitis of the lower leg requiring systemic antibiotics" }
            ],
            correct: "a",
            rationale: {
                correct: "Venous hypertension pushes fluid and red cells into the tissue. The broken down hemoglobin causes hemosiderin staining, chronic inflammation becomes the fibrosis of lipodermatosclerosis, and the ulcer that results is shallow and sits at the medial malleolus.",
                b: "Arterial ulcers are punched out, painful and found on the toes or pressure points, with a pale cool foot.",
                c: "Acute occlusion presents suddenly with pain, pallor, pulselessness and a cold limb, not with years of skin change.",
                d: "Cellulitis is acutely red, hot and tender rather than brown, fibrotic and chronic."
            },
            testTakingTip: "Location sorts the ulcer. Medial malleolus and shallow means venous; toes and punched out means arterial.",
            guideSection: "Section 7 - When the valves give up",
            guideSectionId: "venous"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "application",
            stem: "A patient with chronic venous insufficiency asks what will help most. Which intervention is the cornerstone of management?",
            options: [
                { id: "a", text: "Graduated compression stockings at 30 to 40 mmHg" },
                { id: "b", text: "Keeping the legs dependent for most of the day" },
                { id: "c", text: "Long periods of standing still to use the leg muscles" },
                { id: "d", text: "Daily antibiotic therapy to prevent skin breakdown" }
            ],
            correct: "a",
            rationale: {
                correct: "Graduated compression at 30 to 40 mmHg is the cornerstone of venous insufficiency management, not an add-on. It is combined with elevation above heart level three or four times a day and with walking to run the calf pump.",
                b: "Dependent legs raise venous pressure further. Elevation above heart level is what reduces it.",
                c: "Standing still is specifically avoided. Walking works because the calf pump contracts.",
                d: "Antibiotics treat infection when it occurs and do nothing for the underlying venous pressure."
            },
            testTakingTip: "Check the ankle-brachial index before compression. Below 0.5 compression is contraindicated, because the arterial supply cannot tolerate it.",
            guideSection: "Section 7 - When the valves give up",
            guideSectionId: "venous"
        },
        {
            id: 13, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient admitted after neurosurgery has active bleeding risk and cannot receive anticoagulants. What venous thromboembolism prophylaxis should the nurse expect?",
            options: [
                { id: "a", text: "Mechanical prophylaxis alone, such as compression devices" },
                { id: "b", text: "No prophylaxis, because anticoagulation is contraindicated" },
                { id: "c", text: "A reduced dose of enoxaparin given once daily instead" },
                { id: "d", text: "Warfarin titrated to a lower international normalised ratio" }
            ],
            correct: "a",
            rationale: {
                correct: "A patient who cannot be anticoagulated is not a patient with no prophylaxis. Mechanical methods carry the whole load, using sequential compression devices or graduated stockings.",
                b: "Omitting prophylaxis entirely leaves a high risk patient unprotected.",
                c: "A reduced dose of low molecular weight heparin is still anticoagulation, which is what the bleeding risk forbids.",
                d: "Warfarin at any target is anticoagulation and carries the same bleeding risk."
            },
            testTakingTip: "High bleeding risk changes the method, not the need. Mechanical prophylaxis takes over completely.",
            guideSection: "Section 9 - Stopping it before it starts",
            guideSectionId: "prevention"
        },
        {
            id: 14, type: "single", subtype: "priority", difficulty: "application",
            stem: "A nurse finds that a patient's sequential compression devices have been switched off since the patient left for a test 3 hours ago. What should the nurse recognise?",
            options: [
                { id: "a", text: "The protective benefit has been lost and they go back on now" },
                { id: "b", text: "The devices may stay off until the next scheduled assessment" },
                { id: "c", text: "The devices are optional once the patient is walking to tests" },
                { id: "d", text: "The devices should be replaced with stockings for the rest of the day" }
            ],
            correct: "a",
            rationale: {
                correct: "Sequential compression devices imitate walking and drive venous return, but off for more than 2 hours and the benefit falls away. At 3 hours the protection is gone, so they are reapplied immediately.",
                b: "Waiting until the next assessment extends an interruption that has already passed the threshold.",
                c: "A short walk to a test does not replace continuous prophylaxis in an at risk patient.",
                d: "Stockings and compression devices are different tools, and swapping one for the other is a prescribing decision."
            },
            testTakingTip: "2 hours off is the number. Compression devices only work while they are actually on the patient.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient with diabetes has an ankle-brachial index (ABI) of 1.42. How should the nurse interpret this result?",
            options: [
                { id: "a", text: "Calcified vessels, so a toe-brachial index is needed" },
                { id: "b", text: "A normal result that rules out arterial disease here" },
                { id: "c", text: "Mild to moderate peripheral arterial disease is present" },
                { id: "d", text: "Critical limb ischemia requiring urgent vascular review" }
            ],
            correct: "a",
            rationale: {
                correct: "An ankle-brachial index (ABI) above 1.30 means the vessels are calcified and will not compress, so the reading is falsely high and unreliable. A toe-brachial index is used instead, because the digital arteries calcify far less.",
                b: "Normal is 1.00 to 1.30. A value above that range is not normal, it is uninterpretable.",
                c: "Mild to moderate disease is 0.41 to 0.90, well below this value.",
                d: "Critical limb ischemia is 0.40 or less."
            },
            testTakingTip: "A high ankle-brachial index is not a reassuring one. Above 1.30 in a patient with diabetes means calcified vessels and a falsely high number.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
