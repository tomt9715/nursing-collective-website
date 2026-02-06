/**
 * Peripheral Vascular Disease Quiz — Question Data
 * Extracted from guides/peripheral-vascular-disease.html practice questions section.
 * 8 NCLEX-style questions: 4 Single Best Answer, 2 SATA, 2 Priority
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
            stem: "A nurse is assessing two patients \u2014 one with peripheral arterial disease (PAD) and one with chronic venous insufficiency (CVI). Which finding is correctly matched to the condition?",
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
            guideSection: "Section 2 \u2014 Arterial vs Venous Disease",
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
                correct: "An ABI \u22640.4 indicates critical limb ischemia (CLI) \u2014 the most severe form of PAD with high risk for tissue loss and amputation. These patients typically have rest pain, non-healing wounds, and gangrene. Urgent vascular intervention (angioplasty, stenting, or bypass surgery) is needed to prevent limb loss.",
                a: "Normal ABI is 0.9-1.3. An ABI of 0.35 is severely abnormal.",
                b: "Mild PAD corresponds to ABI 0.7-0.9, presenting with intermittent claudication.",
                c: "Moderate PAD corresponds to ABI 0.4-0.7, with more significant claudication and possible early rest pain."
            },
            testTakingTip: "ABI values: 0.9-1.3 = normal. 0.7-0.9 = mild. 0.4-0.7 = moderate. \u22640.4 = critical (limb threat). >1.3 = calcified/incompressible vessels (unreliable, common in diabetics). An ABI cannot diagnose DVT \u2014 it only measures arterial flow.",
            guideSection: "Section 4 \u2014 Ankle-Brachial Index",
            guideSectionId: "abi"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient with a newly diagnosed deep vein thrombosis (DVT) in the left leg. Which nursing interventions are appropriate? (Select all that apply.)",
            options: [
                { id: "a", text: "Elevate the affected leg above heart level" },
                { id: "b", text: "Apply warm, moist compresses to the affected leg" },
                { id: "c", text: "Massage the affected calf to relieve discomfort" },
                { id: "d", text: "Administer anticoagulation therapy as prescribed" },
                { id: "e", text: "Measure bilateral calf circumferences daily" }
            ],
            correct: ["a", "b", "d", "e"],
            rationale: {
                correct: "Elevation promotes venous return and reduces edema. Warm compresses promote vasodilation and comfort (cold is for arterial). Anticoagulation (heparin then transition to warfarin/DOAC) prevents clot propagation and new clot formation. Daily calf measurements monitor for progression or resolution of the DVT.",
                a: "CORRECT \u2014 Elevation promotes venous return and reduces edema.",
                b: "CORRECT \u2014 Warm compresses promote vasodilation and comfort. Cold is for arterial disease.",
                c: "INCORRECT \u2014 NEVER massage a leg with a known DVT. Massage can dislodge the clot, causing it to travel to the lungs as a pulmonary embolism \u2014 a potentially fatal complication.",
                d: "CORRECT \u2014 Anticoagulation (heparin then transition to warfarin/DOAC) prevents clot propagation and new clot formation.",
                e: "CORRECT \u2014 Daily calf measurements monitor for progression or resolution of the DVT."
            },
            testTakingTip: "DVT rule: No massage, no vigorous exercise of the affected leg. For temperature application: venous = warm (promotes flow), arterial = avoid heat (increases O2 demand in ischemic tissue). This is a commonly tested concept.",
            guideSection: "Section 6 \u2014 Deep Vein Thrombosis",
            guideSectionId: "dvt"
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
                correct: "This presentation \u2014 sudden dyspnea, tachycardia, chest pain, and hypoxemia in a post-surgical patient \u2014 is classic for pulmonary embolism (PE), the most dangerous complication of DVT. The immediate priority is oxygenation: elevate HOB to optimize breathing and apply high-flow O2 to address the life-threatening hypoxemia (SpO2 84%).",
                b: "CT pulmonary angiography is the gold standard for PE diagnosis, but stabilizing the patient (airway, breathing, circulation) always comes before diagnostics.",
                c: "NTG is for cardiac chest pain (angina). PE chest pain is caused by a mechanical obstruction, not coronary ischemia. NTG would not help and could cause hypotension.",
                d: "Compression stockings are for DVT prevention, not PE treatment. Applying them during an acute PE event does not address the immediate life threat."
            },
            testTakingTip: "PE = sudden onset of the \"3 D's\": Dyspnea, Distress, Desaturation. Post-surgical patients and immobile patients are highest risk. Priority: ABCs first (oxygenate), then diagnose (CT-PA), then treat (anticoagulation or thrombolytics).",
            guideSection: "Section 6 \u2014 DVT Complications",
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
            guideSection: "Section 8 \u2014 Treatment & Nursing Care",
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
                correct: "This patient shows two critical findings: a supratherapeutic aPTT (120 sec, well above the 60-80 range) AND a platelet drop >50% from baseline (210,000 \u2192 58,000). The platelet drop strongly suggests heparin-induced thrombocytopenia (HIT) \u2014 a life-threatening immune reaction. Heparin must be stopped IMMEDIATELY and the provider notified. HIT paradoxically causes thrombosis, not bleeding.",
                a: "Continuing heparin with suspected HIT and supratherapeutic aPTT is dangerous and could cause fatal thrombosis.",
                c: "Protamine sulfate reverses heparin\u2019s anticoagulant effect but does not treat HIT. The priority is stopping the heparin and notifying the provider, who will order alternative anticoagulation (e.g., argatroban).",
                d: "Dose reduction is inadequate. With suspected HIT, ALL heparin products must be completely discontinued \u2014 not just reduced."
            },
            testTakingTip: "HIT red flags: Platelet drop >50% from baseline, typically 5-10 days after starting heparin. Remember: HIT causes CLOTS (not bleeding) despite low platelets. Stop ALL heparin (including flushes). Antidote for heparin = protamine. Antidote for warfarin = vitamin K.",
            guideSection: "Section 8 \u2014 Treatment & Nursing Care",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "Which components make up Virchow\u2019s Triad for venous thromboembolism risk? (Select all that apply.)",
            options: [
                { id: "a", text: "Venous stasis (immobility, prolonged bed rest)" },
                { id: "b", text: "Arterial plaque formation (atherosclerosis)" },
                { id: "c", text: "Endothelial injury (trauma, surgery, IV catheters)" },
                { id: "d", text: "Hypercoagulability (cancer, oral contraceptives, genetic disorders)" }
            ],
            correct: ["a", "c", "d"],
            rationale: {
                correct: "Virchow\u2019s Triad describes the three factors that contribute to venous thrombosis: Venous stasis \u2014 blood pooling from immobility. Endothelial injury \u2014 damage to the vessel wall triggers clotting. Hypercoagulability \u2014 increased tendency for blood to clot. All three factors increase DVT risk, and they\u2019re additive.",
                a: "CORRECT \u2014 Venous stasis (blood pooling from immobility) is a key component of Virchow\u2019s Triad.",
                b: "INCORRECT \u2014 Arterial plaque formation (atherosclerosis) is the pathophysiology of peripheral ARTERIAL disease, not venous thrombosis. Virchow\u2019s Triad specifically addresses venous thromboembolism risk factors.",
                c: "CORRECT \u2014 Endothelial injury (damage to the vessel wall from trauma, surgery, IV catheters) triggers clotting.",
                d: "CORRECT \u2014 Hypercoagulability (increased tendency for blood to clot from cancer, oral contraceptives, genetic disorders) is the third component."
            },
            testTakingTip: "Remember SEH: Stasis + Endothelial injury + Hypercoagulability = Virchow\u2019s Triad. Common NCLEX scenarios: post-operative patients (stasis + injury), cancer patients on birth control (hypercoagulability x2), long-haul flights (stasis).",
            guideSection: "Section 6 \u2014 Deep Vein Thrombosis",
            guideSectionId: "dvt"
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
                correct: "Acute arterial occlusion is a vascular emergency \u2014 the 6 P\u2019s (Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia). The limb is at risk for irreversible ischemic damage within 4-6 hours. Position the leg dependent (gravity assists arterial flow) and notify the provider STAT for emergent intervention (embolectomy, thrombolytics, or surgical bypass).",
                a: "Do NOT apply external heat to an ischemic limb. Heat increases metabolic demand in tissue that already has inadequate blood supply, accelerating tissue death. Protect with light covering only.",
                c: "Warfarin takes 3-5 days to reach therapeutic effect and will not help in an acute emergency. Heparin or surgical intervention is needed immediately.",
                d: "ABI is a non-emergent diagnostic tool. In acute arterial occlusion, time is tissue \u2014 the priority is immediate provider notification and preparation for emergent intervention."
            },
            testTakingTip: "Acute arterial occlusion = 6 P\u2019s = emergency. Think \"time is tissue\" (like \"time is brain\" for stroke). No heat, no elevation, no delay. Keep leg DOWN and call for help immediately. This has a 4-6 hour window before irreversible damage.",
            guideSection: "Section 3 \u2014 Peripheral Arterial Disease",
            guideSectionId: "pad"
        }
    ]
};
