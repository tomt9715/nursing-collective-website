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
    estimatedMinutes: 12,
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
                { id: "a", text: "Normal arterial circulation" },
                { id: "b", text: "Mild peripheral arterial disease" },
                { id: "c", text: "Moderate peripheral arterial disease" },
                { id: "d", text: "Critical limb ischemia requiring urgent intervention" }
            ],
            correct: "d",
            labValues: [
                { name: "ABI", normal: "0.9\u20131.3" }
            ],
            rationale: {
                correct: "An ABI \u22640.4 indicates critical limb ischemia (CLI) - the most severe form of PAD with high risk for tissue loss and amputation. These patients typically have rest pain, non-healing wounds, and gangrene. Urgent vascular intervention (angioplasty, stenting, or bypass surgery) is needed to prevent limb loss.",
                a: "Normal ABI is 0.9-1.3. An ABI of 0.35 is severely abnormal.",
                b: "Mild PAD corresponds to ABI 0.7-0.9, presenting with intermittent claudication.",
                c: "Moderate PAD corresponds to ABI 0.4-0.7, with more significant claudication and possible early rest pain."
            },
            testTakingTip: "ABI values: 0.9-1.3 = normal. 0.7-0.9 = mild. 0.4-0.7 = moderate. \u22640.4 = critical (limb threat). >1.3 = calcified/incompressible vessels (unreliable, common in diabetics). An ABI cannot diagnose DVT - it only measures arterial flow.",
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
                { id: "b", text: "Position the leg in a dependent position and notify the provider STAT" },
                { id: "c", text: "Administer a dose of prescribed warfarin" },
                { id: "d", text: "Prepare for an ABI measurement" }
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
        }
    ]
};
