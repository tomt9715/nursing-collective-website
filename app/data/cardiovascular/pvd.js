/**
 * Quiz Bank — Peripheral Vascular Disease
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "pvd-qb-001",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is interpreting ankle-brachial index (ABI) results for a patient with type 2 diabetes and leg pain with walking. The ABI reads 1.42 in the right leg. The nurse understands this value most likely indicates which of the following?",
        options: [
            { id: "a", text: "Normal arterial perfusion with no evidence of PAD" },
            { id: "b", text: "Severe peripheral arterial disease requiring urgent revascularization" },
            { id: "c", text: "Falsely elevated results due to arterial calcification (non-compressible vessels)" },
            { id: "d", text: "Venous insufficiency causing elevated ankle pressures" }
        ],
        correct: "c",
        rationale: {
            correct: "An ABI >1.3 is considered falsely elevated due to calcified, non-compressible arteries — a common finding in patients with diabetes and chronic kidney disease. The Monckeberg's medial calcification prevents the artery from being compressed by the BP cuff, producing artificially high readings. These patients require alternative testing such as toe-brachial index (TBI) or arterial duplex ultrasound for accurate assessment."
        },
        testTakingTip: "ABI interpretation: 1.0-1.3 = normal, 0.9-1.0 = borderline, <0.9 = PAD, <0.4 = critical ischemia, >1.3 = falsely elevated (calcified). Diabetic patients often need toe-brachial index instead.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "pvd-qb-002",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "application",
        stem: "A patient with chronic venous insufficiency asks the nurse about compression stockings. The nurse reviews the chart and notes the patient also has a documented ABI of 0.6 in the left leg. Which response is most appropriate?",
        options: [
            { id: "a", text: "\"Compression stockings should be applied first thing in the morning before your legs swell.\"" },
            { id: "b", text: "\"We need to hold compression on the left leg — your ABI shows significant arterial disease that makes compression unsafe.\"" },
            { id: "c", text: "\"Use the maximum compression strength available for the best results.\"" },
            { id: "d", text: "\"Compression stockings are only effective for arterial disease, not venous problems.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Compression therapy is the cornerstone of venous insufficiency treatment, BUT it is contraindicated or must be used with extreme caution when significant PAD coexists. An ABI of 0.6 indicates moderate-to-severe arterial disease. Applying compression to an already ischemic limb can further reduce arterial perfusion, potentially causing tissue necrosis. ABI must be checked before initiating compression therapy — generally, compression is contraindicated when ABI is <0.5 and used with caution between 0.5-0.8."
        },
        testTakingTip: "ALWAYS check ABI before applying compression. The test question that pairs venous insufficiency + low ABI is testing whether you know that compression is dangerous with arterial disease.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "management"
    },

    {
        id: "pvd-qb-003",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is assessing a patient with suspected Buerger's disease (thromboangiitis obliterans). Which patient history finding is most consistent with this diagnosis?",
        options: [
            { id: "a", text: "A 65-year-old female with a 20-year history of type 2 diabetes" },
            { id: "b", text: "A 35-year-old male who smokes 2 packs of cigarettes per day" },
            { id: "c", text: "A 70-year-old male with atrial fibrillation and recent embolism" },
            { id: "d", text: "A 55-year-old female with rheumatoid arthritis and Raynaud's phenomenon" }
        ],
        correct: "b",
        rationale: {
            correct: "Buerger's disease (thromboangiitis obliterans) is an inflammatory, non-atherosclerotic vascular occlusive disease that affects small and medium arteries and veins. It occurs almost exclusively in young male smokers (typically under age 45). The disease has a direct causative link to tobacco — complete cessation is the only treatment that prevents progression. Unlike atherosclerotic PAD, it affects distal vessels (fingers, toes) and can involve both upper and lower extremities."
        },
        testTakingTip: "Buerger's disease = young smoker with distal extremity ischemia (fingers and toes). The single most important intervention is complete smoking cessation — not surgery, not medications.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "conditions"
    },

    {
        id: "pvd-qb-004",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "application",
        stem: "A patient on IV unfractionated heparin for DVT treatment has a PTT drawn at 6 hours that results at 120 seconds (therapeutic range: 60-80 seconds). The heparin infusion is currently running at 1,200 units/hour. Which nursing action is most appropriate?",
        options: [
            { id: "a", text: "Continue the current infusion rate and recheck PTT in 6 hours" },
            { id: "b", text: "Stop the infusion, notify the provider, and follow the heparin protocol for supratherapeutic PTT" },
            { id: "c", text: "Administer protamine sulfate immediately" },
            { id: "d", text: "Decrease the rate by 50% and recheck in 1 hour" }
        ],
        correct: "b",
        rationale: {
            correct: "A PTT of 120 seconds is significantly supratherapeutic (therapeutic range 60-80), placing the patient at high risk for hemorrhage. Per standard heparin protocols, the infusion should be stopped temporarily and the provider notified. Most protocols specify holding the drip for 1 hour and then restarting at a reduced rate, but the specific adjustment follows the institution's protocol. Protamine sulfate is the heparin reversal agent reserved for active life-threatening bleeding, not for a lab value alone."
        },
        testTakingTip: "Supratherapeutic PTT: STOP the drip first (eliminate the cause), then follow protocol. Protamine is only for active bleeding emergencies — don't jump to reversal for a lab value.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "anticoagulation"
    },

    {
        id: "pvd-qb-005",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "analysis",
        stem: "A patient started on warfarin 3 days ago for DVT treatment is also receiving a heparin bridge. The patient asks why they need two blood thinners at the same time. Which explanation by the nurse is most accurate?",
        options: [
            { id: "a", text: "\"Both medications work on the same clotting factors, so together they are stronger.\"" },
            { id: "b", text: "\"Warfarin takes 4-5 days to reach full effect, and there is a brief period where it actually increases clotting risk, so heparin provides coverage during that transition.\"" },
            { id: "c", text: "\"Heparin prevents new clots while warfarin dissolves the existing clot.\"" },
            { id: "d", text: "\"The two medications are alternatives; your provider hasn't decided which one to continue yet.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Warfarin inhibits synthesis of vitamin K-dependent clotting factors (II, VII, IX, X) and anticoagulant proteins C and S. Protein C has the shortest half-life and drops first, creating a transient prothrombotic state in the first 2-3 days. Heparin provides immediate anticoagulation to bridge this dangerous window. Overlap continues until INR is therapeutic (2.0-3.0) for at least 24 hours, typically 4-5 days. Neither drug dissolves existing clots — they prevent extension."
        },
        testTakingTip: "Warfarin paradox: it can be PRO-thrombotic in the first few days because Protein C drops before the clotting factors do. This is why the heparin bridge is essential, not optional.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "anticoagulation"
    },

    {
        id: "pvd-qb-006",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for a patient with Raynaud's phenomenon. The patient reports that their fingers turn white, then blue, then red when exposed to cold. The nurse understands this color sequence represents which physiological process?",
        options: [
            { id: "a", text: "Arterial embolism followed by reperfusion injury" },
            { id: "b", text: "Vasospasm (pallor) → deoxygenation (cyanosis) → reactive hyperemia (rubor)" },
            { id: "c", text: "Venous thrombosis causing progressive ischemia" },
            { id: "d", text: "Capillary fragility causing sequential hemorrhage" }
        ],
        correct: "b",
        rationale: {
            correct: "The classic triphasic color change in Raynaud's phenomenon: White (pallor) from intense vasospasm cutting off arterial flow → Blue (cyanosis) from deoxygenated blood pooling in the tissue → Red (rubor) from reactive hyperemia when the vasospasm resolves and oxygenated blood rushes back. Not all patients experience all three phases. The trigger is cold exposure or emotional stress causing exaggerated sympathetic vasospasm of digital arteries."
        },
        testTakingTip: "Raynaud's triphasic color change: White → Blue → Red (think: 'WBR' or 'patriotic fingers'). The WHITE phase is the vasospasm — this is the dangerous part causing ischemia.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "conditions"
    },

    {
        id: "pvd-qb-007",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "application",
        stem: "A patient is 12 hours post-femoral-popliteal bypass graft. During hourly assessments, the nurse notes the dorsalis pedis pulse in the operative leg has changed from 2+ palpable to absent, and the foot feels cooler than the previous assessment. Which action should the nurse take FIRST?",
        options: [
            { id: "a", text: "Apply warm blankets to the affected foot to improve circulation" },
            { id: "b", text: "Elevate the affected leg above heart level to reduce edema" },
            { id: "c", text: "Notify the surgeon immediately — this suggests acute graft occlusion" },
            { id: "d", text: "Reassess in 1 hour, as pulse changes are expected postoperatively" }
        ],
        correct: "c",
        rationale: {
            correct: "Loss of a previously palpable pulse with cooling of the extremity after a bypass graft is an emergency sign of acute graft occlusion (thrombosis). This requires immediate surgical evaluation — delay can result in limb loss. The 6 P's of acute ischemia apply: Pain, Pallor, Pulselessness, Paresthesia, Poikilothermia (cool), Paralysis. Do NOT apply heat (ischemic tissue cannot dissipate it → burns), do NOT elevate (reduces already compromised arterial flow), and do NOT delay intervention."
        },
        testTakingTip: "Post-graft nursing rule: any DECLINE in pulse quality or temperature = graft failure until proven otherwise. This is a surgical emergency — notify immediately, don't wait and watch.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "interventions"
    },

    {
        id: "pvd-qb-008",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "analysis",
        stem: "A patient on heparin for DVT treatment develops a platelet count drop from 280,000 to 95,000/mm³ on day 7. The nurse suspects heparin-induced thrombocytopenia (HIT). Along with stopping heparin, which nursing consideration is MOST important?",
        options: [
            { id: "a", text: "Administer a platelet transfusion to raise the count above 150,000" },
            { id: "b", text: "Monitor for thrombotic complications, as HIT paradoxically causes clotting, not bleeding" },
            { id: "c", text: "Switch to a low-molecular-weight heparin (enoxaparin) as an alternative" },
            { id: "d", text: "Apply pressure to all venipuncture sites to prevent hemorrhage" }
        ],
        correct: "b",
        rationale: {
            correct: "HIT is a paradoxical prothrombotic condition — despite low platelets, the major risk is thrombosis (both arterial and venous), NOT bleeding. The heparin-PF4 antibody complex activates platelets, causing aggregation and thrombus formation. Platelet transfusion is contraindicated (provides more substrate for thrombosis). LMWH is also contraindicated (cross-reactivity with HIT antibodies). The treatment is a direct thrombin inhibitor (argatroban or bivalirudin). Monitor for DVT, PE, stroke, and limb ischemia."
        },
        testTakingTip: "HIT = CLOTS, not bleeds. The platelets are being consumed IN clots. Three things are contraindicated: heparin (all forms including flushes), LMWH, and platelet transfusion.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "anticoagulation"
    },

    {
        id: "pvd-qb-009",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is educating a patient with chronic venous insufficiency about skin care for their lower legs. Which instruction is most appropriate?",
        options: [
            { id: "a", text: "\"Apply a moisturizing cream daily to prevent the dry, flaky skin from cracking and developing ulcers.\"" },
            { id: "b", text: "\"Soak your legs in hot water nightly to improve venous return.\"" },
            { id: "c", text: "\"Scratch any itchy areas vigorously to stimulate blood flow.\"" },
            { id: "d", text: "\"Tight-fitting shoes will help support your ankles and reduce swelling.\"" }
        ],
        correct: "a",
        rationale: {
            correct: "Chronic venous insufficiency causes stasis dermatitis with dry, pruritic, flaking skin that is prone to breakdown and ulcer formation. Daily moisturizing protects the skin barrier and prevents cracking. Hot water soaks are contraindicated (vasodilation worsens edema and can burn compromised skin). Vigorous scratching causes skin breakdown and infection. Tight shoes can restrict circulation and cause pressure injuries."
        },
        testTakingTip: "Venous insufficiency skin care: moisturize (prevent cracking), avoid heat (worsens edema), avoid scratching (breaks skin), and elevate legs (reduces venous pressure).",
        relatedGuide: "pvd.html",
        relatedGuideSection: "management"
    },

    {
        id: "pvd-qb-010",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "application",
        stem: "A patient presents to the clinic with a painless, deep ulcer on the medial malleolus of the left ankle. The surrounding skin shows hemosiderin staining (brown discoloration) and mild edema. The dorsalis pedis pulse is 2+ bilaterally. Which type of ulcer should the nurse suspect?",
        options: [
            { id: "a", text: "Arterial ulcer" },
            { id: "b", text: "Venous stasis ulcer" },
            { id: "c", text: "Neuropathic (diabetic) ulcer" },
            { id: "d", text: "Pressure injury" }
        ],
        correct: "b",
        rationale: {
            correct: "This presentation is classic for a venous stasis ulcer: medial malleolus location (the 'gaiter area'), hemosiderin staining from red blood cell extravasation, surrounding edema, irregular borders, and relatively painless (or mild aching). Intact pedal pulses confirm adequate arterial flow. Arterial ulcers are typically painful, distal (toes/heel), well-demarcated, with absent pulses. Neuropathic ulcers occur on weight-bearing surfaces (plantar foot). Pressure injuries occur over bony prominences from prolonged pressure."
        },
        testTakingTip: "Ulcer location is the biggest clue: medial malleolus = venous. Toes/heel with no pulses = arterial. Plantar surface in a diabetic = neuropathic. Over bony prominences = pressure.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "pvd-qb-011",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with PAD managed with cilostazol reports to the clinic. Their medical history is updated to include a new diagnosis of heart failure with reduced ejection fraction (HFrEF). The nurse should anticipate which change to the medication plan?",
        options: [
            { id: "a", text: "Increase the cilostazol dose for better claudication management" },
            { id: "b", text: "Discontinue cilostazol because it is contraindicated in heart failure" },
            { id: "c", text: "Add aspirin to the cilostazol for synergistic antiplatelet effect" },
            { id: "d", text: "Continue cilostazol unchanged, as heart failure does not affect its safety" }
        ],
        correct: "b",
        rationale: {
            correct: "Cilostazol (a phosphodiesterase-3 inhibitor) is effective for intermittent claudication but carries a BLACK BOX WARNING: it is contraindicated in patients with heart failure of any severity. PDE-3 inhibitors (like milrinone) increase cardiac mortality in HF. The mechanism involves increased cAMP, which causes vasodilation and positive inotropy — beneficial for claudication but dangerous in the failing heart. Pentoxifylline is an alternative for claudication without the HF contraindication."
        },
        testTakingTip: "Cilostazol + heart failure = absolute contraindication (black box warning). This is a high-yield NCLEX point. The alternative for claudication in HF patients is pentoxifylline or supervised exercise.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "medications"
    },

    // ── ORDERING (5) ────────────────────────────────────────

    {
        id: "pvd-qb-012",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "ordering",
        difficulty: "application",
        stem: "A hospitalized patient reports sudden onset of left calf pain, swelling, and warmth. The nurse suspects deep vein thrombosis. Place the nurse's actions in priority order.",
        options: [
            { id: "s1", text: "Keep the patient on bed rest and elevate the affected leg" },
            { id: "s2", text: "Measure calf circumference bilaterally and document for comparison" },
            { id: "s3", text: "Notify the provider and anticipate orders for a venous duplex ultrasound" },
            { id: "s4", text: "Assess for signs of pulmonary embolism (dyspnea, tachycardia, pleuritic chest pain)" },
            { id: "s5", text: "Administer prescribed anticoagulation once DVT is confirmed" }
        ],
        correct: ["s4", "s1", "s3", "s2", "s5"],
        rationale: {
            s4: "The most immediately life-threatening complication of DVT is pulmonary embolism. Before focusing on the leg, assess whether the clot has already embolized. If PE signs are present, this escalates to a medical emergency requiring immediate intervention.",
            s1: "Bed rest and elevation reduce the risk of clot dislodgement and decrease venous pressure. Do NOT massage the leg — this could dislodge the thrombus. Avoid ambulation until anticoagulation is initiated.",
            s3: "Notify the provider to obtain diagnostic confirmation (venous duplex ultrasound is the gold standard for DVT) and initiate treatment orders. Clinical suspicion alone is not sufficient to start anticoagulation in most protocols.",
            s2: "Bilateral calf measurements provide objective baseline data. Measure at the widest point and compare sides. A difference of >3 cm supports clinical diagnosis. This is important documentation but follows safety interventions.",
            s5: "Anticoagulation (typically heparin or LMWH) is the primary treatment once DVT is confirmed. Initiation should not be delayed — early anticoagulation prevents clot extension and embolization."
        },
        testTakingTip: "Suspected DVT priority: check for PE first (life threat) → immobilize and elevate → notify provider → document objective findings → treat when confirmed.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "dvt-management"
    },

    {
        id: "pvd-qb-013",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A nurse is teaching a patient newly started on warfarin for DVT treatment about anticoagulation management. Place the patient education points in order from most critical safety information to long-term management.",
        options: [
            { id: "s1", text: "Signs of bleeding that require immediate medical attention: blood in urine/stool, unusual bruising, persistent nosebleeds, severe headache" },
            { id: "s2", text: "Importance of regular INR monitoring — initially weekly, then monthly once stable (target 2.0-3.0)" },
            { id: "s3", text: "Maintain consistent vitamin K intake rather than eliminating green vegetables; sudden dietary changes alter INR" },
            { id: "s4", text: "Inform all healthcare providers and dentists about warfarin use; wear a medical alert bracelet" },
            { id: "s5", text: "Avoid OTC medications (especially NSAIDs and aspirin) without provider approval, and limit alcohol intake" }
        ],
        correct: ["s1", "s5", "s2", "s3", "s4"],
        rationale: {
            s1: "Recognizing dangerous bleeding is the most critical safety information. Warfarin has a narrow therapeutic window, and the patient must know when to seek emergency care. Intracranial hemorrhage is the most feared complication.",
            s5: "Drug interactions are the next priority. NSAIDs and aspirin dramatically increase bleeding risk when combined with warfarin. Alcohol inhibits clotting factor production and can potentiate warfarin.",
            s2: "Regular INR monitoring ensures the patient stays in the therapeutic range. Too low = clot risk, too high = bleeding risk. Understanding why these draws are non-negotiable supports adherence.",
            s3: "Dietary consistency with vitamin K is a common source of confusion. Patients do NOT need to avoid leafy greens — they need to eat a CONSISTENT amount. Sudden increases in vitamin K intake will lower INR; sudden decreases will raise it.",
            s4: "Medical alert identification is important for emergency situations. All providers must know about warfarin to avoid prescribing interactions and to manage perioperative bridging."
        },
        testTakingTip: "Warfarin education priority: bleeding recognition → drug avoidance → lab monitoring → diet consistency → medical ID. Safety (what can harm you now) always precedes maintenance teaching.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "anticoagulation"
    },

    {
        id: "pvd-qb-014",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is providing wound care for a venous stasis ulcer on a patient's medial ankle. Place the wound care steps in the correct sequence.",
        options: [
            { id: "s1", text: "Cleanse the wound gently with normal saline using low-pressure irrigation" },
            { id: "s2", text: "Assess the wound bed, measure dimensions, and document characteristics (color, drainage, odor)" },
            { id: "s3", text: "Apply a moisture-retentive dressing (hydrogel, foam, or alginate based on drainage amount)" },
            { id: "s4", text: "Apply graduated compression wrapping from toe to knee (after confirming adequate ABI)" },
            { id: "s5", text: "Inspect periwound skin and apply a skin protectant barrier to intact surrounding skin" }
        ],
        correct: ["s2", "s1", "s5", "s3", "s4"],
        rationale: {
            s2: "Assessment first — measure and document the wound before any intervention. This provides a baseline to track healing and identify complications. Note wound bed color, drainage type and amount, wound edges, and any signs of infection.",
            s1: "Gentle cleansing with normal saline removes surface debris without damaging fragile granulation tissue. Low-pressure irrigation is preferred. Avoid cytotoxic agents like hydrogen peroxide or povidone-iodine on clean granulating wounds.",
            s5: "Protect the periwound skin before applying the dressing. Venous stasis causes chronic inflammation and maceration of surrounding skin. A skin protectant barrier prevents further breakdown from wound drainage.",
            s3: "The dressing choice depends on wound characteristics. Dry wounds need moisture donation (hydrogel). Moderate drainage needs absorption (foam). Heavy drainage needs alginate or hydrofiber. A moist wound environment promotes healing.",
            s4: "Graduated compression is the MOST important intervention for venous ulcer healing — it addresses the underlying pathophysiology by reducing venous hypertension. Apply after the dressing, from distal to proximal. MUST confirm ABI ≥0.8 before applying compression."
        },
        testTakingTip: "Venous ulcer care: assess → clean → protect periwound → dress → compress. Compression is the most important step for healing but comes last in the wound care sequence (it goes OVER everything).",
        relatedGuide: "pvd.html",
        relatedGuideSection: "wound-care"
    },

    {
        id: "pvd-qb-015",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient on warfarin for DVT treatment presents to the ED with an INR of 8.5, no active bleeding, and minor gum oozing when brushing teeth. Place the management steps in the correct priority order.",
        options: [
            { id: "s1", text: "Hold warfarin and administer oral vitamin K per protocol" },
            { id: "s2", text: "Perform a focused assessment for signs of serious bleeding (neuro check, stool guaiac, abdominal exam)" },
            { id: "s3", text: "Implement bleeding precautions (soft toothbrush, avoid IM injections, fall prevention)" },
            { id: "s4", text: "Recheck INR in 12-24 hours after vitamin K administration" },
            { id: "s5", text: "Investigate the cause of the elevated INR (new medications, dietary changes, illness, missed labs)" }
        ],
        correct: ["s2", "s1", "s3", "s5", "s4"],
        rationale: {
            s2: "First assess for occult serious bleeding. With an INR of 8.5, the patient is at very high risk for intracranial, GI, or retroperitoneal hemorrhage. Gum oozing alone may be the visible tip of a more serious problem. Check neurological status, test stool for occult blood, and assess for abdominal tenderness.",
            s1: "Hold warfarin immediately and administer oral vitamin K. For INR >4.5-10 without significant bleeding, oral vitamin K (2.5-5 mg) is recommended. IV vitamin K is reserved for life-threatening hemorrhage. Do NOT give IM vitamin K (hematoma risk).",
            s3: "Implement bleeding precautions while the INR normalizes. This includes soft toothbrush, electric razor, avoiding invasive procedures, fall prevention, and avoiding Valsalva maneuvers.",
            s5: "Investigate the root cause. Common causes of supratherapeutic INR: new antibiotic (especially fluoroquinolones or metronidazole), increased alcohol, decreased vitamin K intake, hepatic illness, or missed monitoring appointments.",
            s4: "Recheck INR in 12-24 hours to confirm the vitamin K is working. The INR should decrease significantly. Further vitamin K doses or warfarin dose adjustment will be based on the repeat result."
        },
        testTakingTip: "Supratherapeutic INR without major bleeding: assess for hidden bleeding → hold warfarin + oral vitamin K → bleeding precautions → find the cause → recheck INR. No IV vitamin K or FFP unless actively hemorrhaging.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "anticoagulation"
    },

    {
        id: "pvd-qb-016",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "ordering",
        difficulty: "analysis",
        stem: "A nurse is developing a supervised exercise plan for a patient with intermittent claudication (ABI 0.72). Place the exercise prescription components in the correct implementation sequence.",
        options: [
            { id: "s1", text: "Begin walking on a flat surface at a comfortable pace until moderate claudication pain develops" },
            { id: "s2", text: "Perform a baseline 6-minute walk test to establish distance and onset of claudication" },
            { id: "s3", text: "Stop and rest until the claudication pain completely resolves, then resume walking" },
            { id: "s4", text: "Gradually increase walking time and intensity over 12 weeks, aiming for 30-45 minutes per session" },
            { id: "s5", text: "Reassess ABI and walking distance at 12 weeks to measure improvement" }
        ],
        correct: ["s2", "s1", "s3", "s4", "s5"],
        rationale: {
            s2: "Establish a baseline first. The 6-minute walk test documents initial claudication distance and maximum walking distance. This objective measure allows tracking of improvement over the program.",
            s1: "The exercise prescription: walk until moderate claudication pain develops. This 'walk to pain' approach promotes collateral vessel development. Walking should continue until pain reaches a 3-4 on a 0-5 scale.",
            s3: "Rest until pain completely resolves, then resume. This interval training approach (walk → pain → rest → repeat) is the evidence-based method for claudication rehabilitation. Sessions should last 30-50 minutes including rest periods.",
            s4: "Progressive overload: increase duration and intensity gradually. Most patients show significant improvement in walking distance within 12 weeks of supervised exercise training. The goal is 3 sessions per week for at least 12 weeks.",
            s5: "Reassessment at 12 weeks determines the effectiveness of the exercise program. Studies show supervised exercise therapy can improve claudication distance by 50-200%. If the ABI has improved and walking distance has increased, the program is working."
        },
        testTakingTip: "Claudication exercise therapy: baseline test → walk to moderate pain → rest → repeat → progress over 12 weeks → reassess. The key insight: patients should walk INTO the pain, not avoid it.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "management"
    },

    // ── MATRIX (4) ──────────────────────────────────────────

    {
        id: "pvd-qb-017",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each wound characteristic, indicate whether it is associated with an arterial ulcer or a venous ulcer.",
        columns: ["Arterial Ulcer", "Venous Ulcer"],
        rows: [
            { id: "r1", text: "Well-defined, punched-out borders with a pale or necrotic wound bed", correct: "Arterial Ulcer" },
            { id: "r2", text: "Located over the medial malleolus (gaiter area) with irregular, sloping edges", correct: "Venous Ulcer" },
            { id: "r3", text: "Intensely painful, especially with leg elevation or at night", correct: "Arterial Ulcer" },
            { id: "r4", text: "Surrounding skin shows hemosiderin staining and lipodermatosclerosis", correct: "Venous Ulcer" },
            { id: "r5", text: "Located on toes, heel, or lateral malleolus with minimal drainage", correct: "Arterial Ulcer" },
            { id: "r6", text: "Moderate-to-heavy serous or serosanguineous drainage with granulation tissue visible", correct: "Venous Ulcer" }
        ],
        rationale: {
            correct: "Arterial ulcers result from inadequate blood supply: they appear on distal extremities (toes, heels), have sharp 'punched-out' borders, pale/necrotic bases, minimal drainage (no blood supply to produce exudate), and are very painful (especially with elevation, which further reduces arterial flow). Venous ulcers result from venous hypertension: they appear near the medial malleolus, have irregular edges, beefy red granulation tissue, moderate-heavy drainage, and surrounding skin changes (brown hemosiderin staining, thickened skin called lipodermatosclerosis). Venous ulcers are typically less painful than arterial ulcers."
        },
        testTakingTip: "Arterial = Pale, Painful, Punched-out, distal (toes/heels). Venous = medial Malleolus, Moderate drainage, brown staining, less painful. Location + pain level are the fastest differentiators.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "wound-care"
    },

    {
        id: "pvd-qb-018",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each anticoagulant characteristic, indicate whether it applies to unfractionated heparin (UFH), warfarin, or direct oral anticoagulants (DOACs such as rivaroxaban/apixaban).",
        columns: ["UFH (Heparin)", "Warfarin", "DOACs"],
        rows: [
            { id: "r1", text: "Monitored by PTT/aPTT with a therapeutic range of 1.5-2.5 times control", correct: "UFH (Heparin)" },
            { id: "r2", text: "Monitored by INR with a therapeutic target of 2.0-3.0 for DVT", correct: "Warfarin" },
            { id: "r3", text: "Does not require routine lab monitoring in most patients", correct: "DOACs" },
            { id: "r4", text: "Reversed by protamine sulfate", correct: "UFH (Heparin)" },
            { id: "r5", text: "Reversed by vitamin K (phytonadione)", correct: "Warfarin" },
            { id: "r6", text: "Significant dietary interactions with vitamin K-containing foods", correct: "Warfarin" }
        ],
        rationale: {
            correct: "UFH is monitored by aPTT (goal 1.5-2.5× control) and reversed by protamine sulfate. Warfarin is monitored by INR (goal 2.0-3.0) and reversed by vitamin K; it has significant food-drug interactions with vitamin K-rich foods. DOACs (rivaroxaban, apixaban, dabigatran, edoxaban) do not require routine monitoring in most patients, have fewer dietary interactions, but some have specific reversal agents (idarucizumab for dabigatran, andexanet alfa for factor Xa inhibitors)."
        },
        testTakingTip: "Anticoagulant monitoring: Heparin = PTT. Warfarin = INR (PT). DOACs = no routine monitoring. Reversal: Heparin = protamine. Warfarin = vitamin K. Dabigatran = idarucizumab.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "anticoagulation"
    },

    {
        id: "pvd-qb-019",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "matrix",
        difficulty: "application",
        stem: "For each patient assessment finding after a peripheral vascular intervention, indicate whether it represents an EXPECTED postoperative finding or a finding REQUIRING IMMEDIATE notification of the surgeon.",
        columns: ["Expected Finding", "Notify Surgeon Immediately"],
        rows: [
            { id: "r1", text: "Mild incisional pain at the groin access site controlled with prescribed analgesics", correct: "Expected Finding" },
            { id: "r2", text: "Pulsatile mass developing at the femoral access site with a bruit", correct: "Notify Surgeon Immediately" },
            { id: "r3", text: "Slight ecchymosis (bruising) around the access site without expansion", correct: "Expected Finding" },
            { id: "r4", text: "Sudden loss of previously palpable pedal pulses with increasing foot pallor", correct: "Notify Surgeon Immediately" },
            { id: "r5", text: "Temperature of 99.2°F (37.3°C) in the first 12 hours postoperatively", correct: "Expected Finding" },
            { id: "r6", text: "Numbness and tingling in the operative leg with tense, firm calf on palpation", correct: "Notify Surgeon Immediately" }
        ],
        rationale: {
            correct: "Expected findings: mild access site pain, minor bruising, and low-grade fever (inflammatory response) in the first 12-24 hours. Concerning findings requiring immediate notification: pulsatile mass with bruit (pseudoaneurysm or AV fistula), loss of pedal pulses with pallor (graft occlusion or embolism), and tense calf with paresthesias (compartment syndrome). Each concerning finding represents a time-sensitive complication where delay can result in limb loss or life-threatening hemorrhage."
        },
        testTakingTip: "Post-vascular surgery: expected = mild pain, small bruise, low fever. Emergency = pulsatile mass, lost pulses, tense compartment. Any change in pulse quality from baseline is abnormal.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "interventions"
    },

    {
        id: "pvd-qb-020",
        category: "cardiovascular",
        topic: "pvd",
        topicLabel: "Peripheral Vascular Disease",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each patient scenario, indicate the correct leg positioning recommendation.",
        columns: ["Elevate Legs Above Heart", "Keep Legs Level or Slightly Dependent", "Position Varies by Activity"],
        rows: [
            { id: "r1", text: "Patient with chronic venous insufficiency and bilateral lower extremity edema at rest", correct: "Elevate Legs Above Heart" },
            { id: "r2", text: "Patient with severe PAD (ABI 0.4) and rest pain in the toes at night", correct: "Keep Legs Level or Slightly Dependent" },
            { id: "r3", text: "Patient 6 hours post-femoral-popliteal bypass with stable graft flow", correct: "Keep Legs Level or Slightly Dependent" },
            { id: "r4", text: "Patient with acute DVT receiving anticoagulation therapy in the hospital", correct: "Elevate Legs Above Heart" },
            { id: "r5", text: "Patient with mixed arterial-venous disease (ABI 0.65 with venous stasis changes)", correct: "Position Varies by Activity" },
            { id: "r6", text: "Post-sclerotherapy patient for varicose vein treatment", correct: "Elevate Legs Above Heart" }
        ],
        rationale: {
            correct: "Positioning depends on the underlying pathophysiology. Venous problems (CVI, DVT, post-sclerotherapy) → elevate legs to promote venous return and reduce edema. Arterial problems (PAD with rest pain, post-bypass graft) → keep legs level or slightly dependent to maximize gravity-assisted arterial flow — elevation would worsen ischemia. Mixed disease requires individualized positioning — often slightly elevated during rest but avoiding prolonged dependency, finding the balance between arterial perfusion and venous drainage."
        },
        testTakingTip: "The positioning rule: Venous = elevate (help blood return to heart). Arterial = keep down or level (help blood get TO the feet). Mixed disease = compromise position. NEVER elevate an ischemic limb.",
        relatedGuide: "pvd.html",
        relatedGuideSection: "management"
    }

]);
