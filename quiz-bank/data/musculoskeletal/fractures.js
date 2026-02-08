/**
 * Quiz Bank — Fractures
 * The Nursing Collective
 *
 * 50 questions: 41 single, 4 ordering, 5 matrix
 * Difficulty mix: 16 knowledge, 18 application, 16 analysis
 * NCLEX types covered: Priority/Delegation, Assessment, Patient Education,
 *   Scope of Practice, Clinical Judgment, Adverse Effects/Side Effects,
 *   Contraindications, Next Gen NCLEX Clinical Judgment, and more
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "fx-qb-001",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with a closed tibial fracture had a long leg cast applied 6 hours ago. The patient reports severe, unrelenting pain in the lower leg that is not relieved by the prescribed opioid analgesic. The nurse assesses pain with passive dorsiflexion of the toes and the patient screams in agony. Which complication does the nurse suspect?",
        options: [
            { id: "a", text: "Deep vein thrombosis from venous stasis" },
            { id: "b", text: "Compartment syndrome from increased pressure within the fascial compartment" },
            { id: "c", text: "Fat embolism from bone marrow release into the bloodstream" },
            { id: "d", text: "Infection at the fracture site causing cellulitis" }
        ],
        correct: "b",
        rationale: {
            correct: "Compartment syndrome is characterized by the '5 P's': Pain (out of proportion, unrelieved by opioids), Pain with passive stretch (the earliest and most reliable sign), Pressure (compartment feels tense), Paresthesias, Pulselessness (late sign). Pain with passive stretch of the muscles within the affected compartment is the hallmark finding. This is a surgical emergency requiring fasciotomy within 6 hours to prevent irreversible tissue death. DVT presents with calf tenderness and swelling but not pain with passive stretch. Fat embolism presents with respiratory distress and petechiae."
        },
        testTakingTip: "Pain out of proportion + pain with passive stretch + unrelieved by opioids = compartment syndrome until proven otherwise. This is a TIME-SENSITIVE emergency — fasciotomy within 6 hours or permanent damage occurs. Never elevate the limb above heart level (reduces arterial inflow).",
        relatedGuide: "fractures.html",
        relatedGuideSection: "compartment-syndrome"
    },

    {
        id: "fx-qb-002",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A nurse is performing a neurovascular assessment on a patient with a newly applied forearm cast. Which finding requires IMMEDIATE action?",
        options: [
            { id: "a", text: "The patient reports mild itching under the cast" },
            { id: "b", text: "Capillary refill in the fingers is 2 seconds" },
            { id: "c", text: "The fingers are pale, cool, and the patient cannot feel the nurse's touch" },
            { id: "d", text: "Mild swelling visible at the edges of the cast" }
        ],
        correct: "c",
        rationale: {
            correct: "Pale, cool fingers with absent sensation indicate neurovascular compromise — the cast may be too tight, causing compression of blood vessels and nerves. This requires immediate intervention: elevate the extremity, notify the provider, and prepare for cast bivalving (cutting the cast in half to relieve pressure). Capillary refill of 2 seconds is normal (<3 seconds). Mild itching and mild edge swelling are common and expected after cast application."
        },
        testTakingTip: "CMS checks (Circulation, Motion, Sensation) on casted extremities: check color, temperature, capillary refill, pulses, movement, and sensation distal to the cast. Any change from baseline = immediate action. The mnemonic 'pale, pulseless, painful, paresthesias, paralysis' indicates neurovascular emergency.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "cast-care"
    },

    {
        id: "fx-qb-003",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is providing discharge teaching to a patient with a new fiberglass cast on the left forearm. Which patient statement indicates correct understanding of cast care?",
        options: [
            { id: "a", text: "I can use a hair dryer on the cool setting to blow air into the cast if it gets itchy" },
            { id: "b", text: "I should insert a knitting needle to scratch any itchy areas under the cast" },
            { id: "c", text: "I can submerge my cast in the bath since fiberglass is waterproof" },
            { id: "d", text: "I should cover the cast with plastic wrap and tape before showering" }
        ],
        correct: "d",
        rationale: {
            correct: "Casts must be kept dry to prevent skin breakdown, maceration, and infection underneath. Covering with plastic wrap and taping the edges creates a waterproof barrier during showering. A hair dryer can cause burns to skin under the cast (even cool setting can create heat in the enclosed space). Inserting objects can damage skin and cause infection or pressure sores. While fiberglass is water-resistant, the padding underneath is NOT — a wet cast lining causes skin maceration."
        },
        testTakingTip: "Cast care teaching: keep dry (cover for showers), nothing inside the cast (no scratching tools), elevate above heart level to reduce swelling, check CMS regularly, and report numbness/tingling/color changes immediately.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "cast-care"
    },

    {
        id: "fx-qb-004",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with a femur fracture sustained in a motor vehicle collision develops sudden dyspnea, tachycardia, confusion, and a petechial rash across the chest and axillae 36 hours after injury. SpO2 drops to 86%. The nurse suspects:",
        options: [
            { id: "a", text: "Pulmonary embolism from a deep vein thrombosis" },
            { id: "b", text: "Fat embolism syndrome from marrow fat entering the bloodstream" },
            { id: "c", text: "Pneumothorax from a concurrent rib fracture" },
            { id: "d", text: "Acute respiratory distress syndrome from fluid overload" }
        ],
        correct: "b",
        rationale: {
            correct: "The classic triad of fat embolism syndrome (FES) is: (1) respiratory distress (dyspnea, hypoxemia), (2) neurological changes (confusion, agitation), and (3) petechial rash (chest, axillae, conjunctivae). FES typically presents 24-72 hours after long bone fractures (especially femur and pelvis). Fat globules from disrupted bone marrow enter the venous system and lodge in pulmonary and cerebral capillaries. PE from DVT does NOT cause petechial rash — this is the key differentiator. Treatment is supportive: oxygen, fluids, and immobilization."
        },
        testTakingTip: "Fat embolism vs PE: Both cause dyspnea and tachycardia. The differentiators are: petechial rash (FES only, pathognomonic), timing (FES 24-72 hrs after long bone fracture; PE can occur anytime), and confusion (more common with FES). FES treatment is supportive; PE may need anticoagulation or embolectomy.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "complications"
    },

    {
        id: "fx-qb-005",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A patient is in balanced suspension skeletal traction for a femoral shaft fracture. During morning care, the nurse notes the weights are resting on the floor. What is the appropriate action?",
        options: [
            { id: "a", text: "Remove the weights temporarily to reposition the patient, then reapply" },
            { id: "b", text: "Lift the weights and reposition them so they hang freely without touching the floor" },
            { id: "c", text: "Leave the weights on the floor and notify the provider" },
            { id: "d", text: "Add additional weights to compensate for the loss of traction force" }
        ],
        correct: "b",
        rationale: {
            correct: "Traction weights must hang freely at all times to maintain continuous, appropriate pull on the fracture for alignment and healing. Weights resting on the floor means the traction is ineffective — the nurse should reposition them to hang freely. Weights should NEVER be removed (breaks traction continuity) or added without a provider order. Leaving them on the floor allows the fracture to shift. The nurse should ensure the rope is in the pulley groove and the bed is positioned so weights clear the floor."
        },
        testTakingTip: "Traction rules: weights hang freely (never on floor, bed, or frame), never remove weights, ropes must be in pulleys and free of knots, maintain body alignment with countertraction, pin care per protocol for skeletal traction.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "traction"
    },

    {
        id: "fx-qb-006",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A nurse is caring for a patient with an open (compound) fracture of the tibia with bone protruding through the skin. Which intervention is the HIGHEST priority in the initial management?",
        options: [
            { id: "a", text: "Attempt to realign the bone and push it back below the skin surface" },
            { id: "b", text: "Apply a sterile, moist dressing to the wound and administer IV antibiotics as ordered" },
            { id: "c", text: "Splint the extremity in the position found and prepare for surgical debridement" },
            { id: "d", text: "Apply a tourniquet proximal to the fracture to control bleeding" }
        ],
        correct: "b",
        rationale: {
            correct: "Open fractures have direct communication between the fracture and the external environment, creating a high risk for osteomyelitis (bone infection). The priority is: cover the wound with a sterile, saline-moistened dressing to prevent contamination and desiccation, and administer IV antibiotics (typically a first-generation cephalosporin) within 1 hour. NEVER attempt to push bone back in — this introduces more bacteria. Splinting is important but secondary to infection prevention. Tourniquets are reserved for life-threatening hemorrhage only."
        },
        testTakingTip: "Open fracture priorities: sterile moist dressing + IV antibiotics within 1 hour + tetanus prophylaxis + surgical debridement within 6 hours. Never push bone back in. Cover, medicate, and prepare for surgery.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "open-fracture"
    },

    {
        id: "fx-qb-007",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "An 82-year-old woman with osteoporosis is admitted after a fall resulting in an intertrochanteric hip fracture. She is scheduled for surgical repair tomorrow. Which nursing intervention is the priority during the preoperative period?",
        options: [
            { id: "a", text: "Apply Buck's traction to the affected leg to maintain alignment and reduce muscle spasm" },
            { id: "b", text: "Encourage the patient to perform active range of motion exercises on the affected hip" },
            { id: "c", text: "Position the patient on the affected side to reduce edema" },
            { id: "d", text: "Apply ice packs directly to the surgical site to reduce preoperative swelling" }
        ],
        correct: "a",
        rationale: {
            correct: "Buck's traction (skin traction with 5-10 lbs of weight) is commonly applied preoperatively for hip fractures to immobilize the fracture, reduce muscle spasm, and maintain alignment until surgical repair. Active ROM of the fractured hip would worsen displacement and cause extreme pain. Positioning on the fractured side increases pain and can displace the fracture. There is no surgical site yet — surgery is tomorrow."
        },
        testTakingTip: "Pre-op hip fracture care: Buck's traction (temporary), pain management, DVT prevention (Ted hose, SCDs), assess for surgical fitness (cardiac clearance, labs), and preoperative teaching. Surgery should occur within 24-48 hours to reduce complications.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "hip-fracture"
    },

    {
        id: "fx-qb-008",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A pediatric nurse is assessing a 4-year-old child brought in with a spiral fracture of the humerus. The parent states the child 'fell off the couch.' The nurse notes bruises of varying ages on the child's back and upper arms. What is the nurse's MOST important action?",
        options: [
            { id: "a", text: "Document the findings and discuss injury prevention with the parent" },
            { id: "b", text: "Report the suspected non-accidental trauma to the appropriate authorities as a mandated reporter" },
            { id: "c", text: "Ask the child directly if someone hurt them while the parent is in the room" },
            { id: "d", text: "Consult with the attending physician before taking any action" }
        ],
        correct: "b",
        rationale: {
            correct: "A spiral fracture in a young child (caused by twisting force) combined with bruises at various stages of healing in areas typically covered by clothing are classic indicators of non-accidental trauma (child abuse). Nurses are mandated reporters — they are legally REQUIRED to report suspected abuse to child protective services. The nurse does not need to prove abuse, only to have reasonable suspicion. Questioning the child in front of the alleged abuser is inappropriate and potentially dangerous. While consulting the physician is reasonable, it should not delay reporting."
        },
        testTakingTip: "Red flags for non-accidental trauma in children: spiral fractures in non-ambulatory children, bruises in various stages of healing, injuries inconsistent with the stated mechanism, injuries in unusual locations (back, upper arms, torso), and delay in seeking care. Nurses must report — no exceptions.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "pediatric"
    },

    {
        id: "fx-qb-009",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for a patient with an external fixation device on the lower leg. Which pin care intervention is most appropriate?",
        options: [
            { id: "a", text: "Apply antibiotic ointment thickly around each pin site to prevent infection" },
            { id: "b", text: "Clean pin sites per facility protocol, assess for signs of infection, and keep the area free of crusting" },
            { id: "c", text: "Leave pin sites completely uncovered and avoid any cleaning to prevent disrupting healing" },
            { id: "d", text: "Wrap all pin sites tightly with gauze to prevent environmental contamination" }
        ],
        correct: "b",
        rationale: {
            correct: "External fixation pin care involves cleaning pin sites per facility protocol (typically with chlorhexidine or normal saline), monitoring for signs of infection (redness, warmth, purulent drainage, pain, loosening), and keeping sites free of excessive crusting that can harbor bacteria. Thick antibiotic ointment can trap bacteria and create a moist environment promoting infection. Leaving sites completely unattended increases infection risk. Tight wrapping can cause pressure and impede assessment."
        },
        testTakingTip: "External fixator care: clean pins per protocol, assess for infection at every shift, never adjust the fixator frame, check pin tightness (report loosening), and elevate the extremity to reduce edema. Pin site infection is the most common complication.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "external-fixation"
    },

    {
        id: "fx-qb-010",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient is being discharged after ORIF (open reduction internal fixation) of an ankle fracture. The provider has ordered toe-touch weight bearing (TTWB) on the affected side. Which patient demonstration indicates correct understanding?",
        options: [
            { id: "a", text: "The patient walks normally, placing full weight on the affected foot" },
            { id: "b", text: "The patient uses crutches and touches only the toes of the affected foot to the floor for balance, bearing no true weight" },
            { id: "c", text: "The patient keeps the affected foot completely off the ground at all times" },
            { id: "d", text: "The patient places approximately half their body weight on the affected leg" }
        ],
        correct: "b",
        rationale: {
            correct: "Toe-touch weight bearing (TTWB) means the patient may rest the toes of the affected foot on the ground for balance only — no actual weight transfer through the extremity. The crutches or walker bear the patient's full weight. Full weight bearing is unrestricted walking. Non-weight bearing (NWB) means the foot cannot touch the ground at all. Partial weight bearing (PWB) allows a specified percentage of body weight (typically 25-50%). Weight-bearing progression: NWB → TTWB → PWB → WBAT → FWB."
        },
        testTakingTip: "Weight-bearing progression: NWB (no contact) → TTWB (toes touch for balance only) → PWB (25-50% weight) → WBAT (as much as tolerated) → FWB (normal). Always verify the specific order before teaching the patient.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "fx-qb-011",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is developing a falls prevention plan for an elderly patient with osteoporosis who was admitted after a Colles fracture from a fall at home. Which intervention addresses the PRIMARY modifiable risk factor?",
        options: [
            { id: "a", text: "Recommend the patient wear a medical alert device at all times" },
            { id: "b", text: "Conduct a home safety assessment to remove trip hazards, improve lighting, and install grab bars" },
            { id: "c", text: "Advise the patient to limit all physical activity to prevent future falls" },
            { id: "d", text: "Prescribe a wheelchair for all mobility to eliminate fall risk" }
        ],
        correct: "b",
        rationale: {
            correct: "Environmental hazards (loose rugs, poor lighting, cluttered walkways, lack of grab bars) are the most common modifiable risk factor for falls in the elderly. A home safety assessment with targeted modifications significantly reduces fall risk. A medical alert device aids in getting help after a fall but doesn't prevent falls. Limiting activity increases deconditioning, weakness, and actually INCREASES fall risk. A wheelchair for ambulatory patients promotes dependency and further weakness."
        },
        testTakingTip: "Falls prevention is multi-factorial: environment modification (home safety), medication review (sedatives, antihypertensives), vision correction, strength/balance training, calcium/vitamin D for bone health, and assistive devices (cane, walker). Never restrict mobility — it worsens the problem.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "prevention"
    },

    // ── ORDERING (4) ─────────────────────────────────────────

    {
        id: "fx-qb-012",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse suspects compartment syndrome in a patient with a casted lower leg fracture. The patient reports escalating pain unrelieved by morphine, and the cast feels tight. Place the nurse's interventions in the correct priority order.",
        options: [
            { id: "s1", text: "Notify the surgeon immediately — this is a surgical emergency" },
            { id: "s2", text: "Bivalve (split) the cast and cut through the padding down to the skin" },
            { id: "s3", text: "Lower the extremity to heart level (do NOT elevate above the heart)" },
            { id: "s4", text: "Prepare the patient for emergent fasciotomy if compartment pressures exceed 30 mmHg" },
            { id: "s5", text: "Reassess neurovascular status: pulses, sensation, motor function, capillary refill" }
        ],
        correct: ["s2", "s3", "s1", "s5", "s4"],
        rationale: {
            s2: "Bivalving the cast is the FIRST action because it can immediately relieve external compression. Cut through the cast AND the padding — padding alone can restrict up to 85% of the pressure relief.",
            s3: "Position the extremity at heart level, NOT elevated. Elevation above the heart reduces arterial inflow to already ischemic tissue, worsening the compartment syndrome.",
            s1: "Notify the surgeon immediately after relieving external pressure. The patient will likely need emergent fasciotomy if compartment pressures remain elevated after cast removal.",
            s5: "Reassess neurovascular status after cast removal to determine if the intervention relieved the compression. Document findings for the surgeon's evaluation.",
            s4: "Prepare for fasciotomy if symptoms persist despite cast removal. Normal compartment pressure is 0-8 mmHg; pressures above 30 mmHg (or within 30 mmHg of diastolic BP) indicate need for fasciotomy."
        },
        testTakingTip: "Compartment syndrome response: Remove all external constriction FIRST (bivalve cast) → Lower to heart level (never elevate) → Call surgeon → Reassess → Prepare for fasciotomy. The 6-hour rule: irreversible damage begins after 6 hours of compartment syndrome.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "compartment-syndrome"
    },

    {
        id: "fx-qb-013",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse receives a patient from the PACU after ORIF of a hip fracture. Place the post-operative nursing assessments and interventions in the correct priority order.",
        options: [
            { id: "s1", text: "Assess airway, breathing, oxygen saturation, and level of consciousness" },
            { id: "s2", text: "Perform neurovascular assessment of the operative extremity (CMS checks)" },
            { id: "s3", text: "Verify surgical dressing is intact and check drain output (Hemovac/JP drain)" },
            { id: "s4", text: "Initiate DVT prophylaxis (sequential compression devices, anticoagulant as ordered)" },
            { id: "s5", text: "Position the patient with an abduction pillow between the legs per hip precautions" }
        ],
        correct: ["s1", "s2", "s5", "s3", "s4"],
        rationale: {
            s1: "ABCs first: assess airway patency, respiratory status (anesthesia effects), oxygen saturation, and consciousness level. Post-anesthesia complications are the most immediate threat.",
            s2: "Neurovascular assessment of the operative leg establishes a post-operative baseline: pulses, sensation, movement, temperature, color, and capillary refill. Detect vascular or nerve compromise early.",
            s5: "Correct positioning prevents hip dislocation — the most common early complication. An abduction pillow maintains the hip in abduction and neutral alignment per the surgical approach used.",
            s3: "Check the surgical site for excessive bleeding and verify drain function. Expected drain output varies but typically 200-500 mL in the first 24 hours. Report excessive output.",
            s4: "DVT prophylaxis should begin promptly post-operatively. SCDs can be applied immediately; pharmacologic anticoagulation timing depends on the surgeon's preference (typically within 12-24 hours)."
        },
        testTakingTip: "Post-op hip fracture repair: ABCs → Neurovascular check → Position correctly (abduction pillow) → Surgical site and drain → DVT prevention. The abduction pillow is not optional — hip dislocation is the complication to prevent.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "post-operative"
    },

    {
        id: "fx-qb-014",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "ordering",
        difficulty: "knowledge",
        stem: "Place the following weight-bearing statuses in order from MOST restrictive to LEAST restrictive.",
        options: [
            { id: "s1", text: "Non-weight bearing (NWB): affected foot may not touch the ground" },
            { id: "s2", text: "Toe-touch weight bearing (TTWB): toes may touch for balance only" },
            { id: "s3", text: "Partial weight bearing (PWB): 25-50% of body weight on affected limb" },
            { id: "s4", text: "Weight bearing as tolerated (WBAT): as much weight as the patient can comfortably bear" },
            { id: "s5", text: "Full weight bearing (FWB): no restrictions on weight bearing" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "NWB is the most restrictive — the affected extremity cannot contact the ground at all. Patient uses crutches or walker with the injured leg suspended.",
            s2: "TTWB allows the toes to contact the floor for balance only — no actual weight transfer. The crutches or walker bear full body weight.",
            s3: "PWB allows a specified percentage of body weight (usually 25-50%). A bathroom scale can help patients learn how this feels.",
            s4: "WBAT allows the patient to bear as much weight as comfortable. Pain guides the limit. Most body weight can be placed on the affected leg.",
            s5: "FWB means no weight-bearing restrictions. The patient can walk normally without assistive devices if balance and strength allow."
        },
        testTakingTip: "Weight-bearing progression follows healing: NWB → TTWB → PWB → WBAT → FWB. The provider advances the status as bone healing progresses on follow-up X-rays. Never advance weight bearing without a provider order.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "fx-qb-015",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient arrives at the ED after a motorcycle accident with a grossly deformed, open femur fracture with active bleeding. Place the initial management steps in the correct priority order.",
        options: [
            { id: "s1", text: "Apply direct pressure to control hemorrhage and cover the wound with a sterile moist dressing" },
            { id: "s2", text: "Assess and secure the airway; check breathing and circulation (primary survey)" },
            { id: "s3", text: "Splint the extremity in the position found; do NOT attempt to realign" },
            { id: "s4", text: "Establish large-bore IV access, draw trauma labs, and begin fluid resuscitation" },
            { id: "s5", text: "Administer IV antibiotics (cefazolin) and tetanus prophylaxis within 1 hour" }
        ],
        correct: ["s2", "s1", "s4", "s3", "s5"],
        rationale: {
            s2: "Primary survey (ABCDE) is ALWAYS first in trauma: airway, breathing, circulation, disability, exposure. A motorcycle accident may involve multiple injuries — a femur fracture may not be the most life-threatening.",
            s1: "Control hemorrhage with direct pressure (femur fractures can lose 1-2 liters of blood into the thigh). Cover the open wound with a sterile saline-moistened dressing to prevent contamination.",
            s4: "Large-bore IV access enables fluid resuscitation and blood product administration. Femur fractures cause significant hemorrhage — anticipate need for transfusion. Trauma labs guide ongoing management.",
            s3: "Splint the extremity as found to prevent further neurovascular damage, reduce pain, and minimize blood loss. Traction splints (Hare, Sager) may be applied for femoral shaft fractures.",
            s5: "IV antibiotics within 1 hour and tetanus prophylaxis are essential for open fractures to prevent osteomyelitis. This can occur simultaneously with other interventions but is lower priority than hemorrhage control."
        },
        testTakingTip: "Trauma with open fracture: primary survey first (other injuries may be more lethal) → hemorrhage control → IV/fluids → splint in position found → antibiotics within 1 hour. Never focus on the dramatic-looking fracture before completing the primary survey.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "emergency"
    },

    // ── MATRIX (5) ───────────────────────────────────────────

    {
        id: "fx-qb-016",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is assessing patients with lower extremity injuries. For each set of findings, indicate whether they suggest compartment syndrome, deep vein thrombosis (DVT), or fat embolism syndrome.",
        columns: ["Compartment Syndrome", "DVT", "Fat Embolism Syndrome"],
        rows: [
            { id: "r1", text: "Severe pain unrelieved by opioids, worsened by passive stretch of the toes, tense swelling in the anterior leg", correct: "Compartment Syndrome" },
            { id: "r2", text: "Unilateral calf tenderness and swelling, warmth and redness, positive Homans sign, no respiratory symptoms", correct: "DVT" },
            { id: "r3", text: "Dyspnea, confusion, and petechial rash on chest/axillae appearing 36 hours after a femur fracture", correct: "Fat Embolism Syndrome" },
            { id: "r4", text: "Paresthesias progressing to paralysis with diminishing pulses, 8 hours after cast placement", correct: "Compartment Syndrome" },
            { id: "r5", text: "SpO2 85%, tachycardia, altered mental status, and thrombocytopenia 48 hours after pelvic fracture", correct: "Fat Embolism Syndrome" }
        ],
        rationale: {
            correct: "Compartment syndrome: pain out of proportion, pain with passive stretch, tense compartment, late findings include paresthesias/paralysis/pulselessness. Occurs within hours of injury or cast application. DVT: unilateral calf swelling, tenderness, warmth, redness — affects the venous system, not arterial or compartmental. Fat embolism syndrome: respiratory distress + neurological changes + petechial rash, occurs 24-72 hours after long bone/pelvic fractures, thrombocytopenia is a supporting lab finding."
        },
        testTakingTip: "Three major fracture complications and their unique features: Compartment syndrome = pain with passive stretch (unique to CS). DVT = unilateral calf swelling/warmth. Fat embolism = petechial rash (pathognomonic). Time of onset also helps: CS = hours, DVT = days to weeks, FES = 24-72 hours.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "complications"
    },

    {
        id: "fx-qb-017",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each type of traction, indicate whether it is skin traction or skeletal traction.",
        columns: ["Skin Traction", "Skeletal Traction"],
        rows: [
            { id: "r1", text: "Buck's traction: foam boot applied to the leg with 5-10 lbs of weight", correct: "Skin Traction" },
            { id: "r2", text: "Steinmann pin inserted through the distal femur with 25 lbs of weight", correct: "Skeletal Traction" },
            { id: "r3", text: "Russell's traction: sling under the knee with skin wraps and 5-7 lbs", correct: "Skin Traction" },
            { id: "r4", text: "Halo vest attached to skull pins for cervical spine immobilization", correct: "Skeletal Traction" },
            { id: "r5", text: "Balanced suspension with a Thomas splint and Kirschner wire through the tibia", correct: "Skeletal Traction" }
        ],
        rationale: {
            correct: "Skin traction applies force through the skin surface using wraps, boots, or slings with lower weights (5-10 lbs to prevent skin breakdown). Examples: Buck's (leg), Russell's (knee sling), Bryant's (pediatric bilateral leg). Skeletal traction applies force directly through bone using surgically inserted pins, wires, or tongs, allowing higher weights (15-40 lbs). Examples: Steinmann pins, Kirschner wires, Crutchfield/Gardner-Wells tongs, halo devices."
        },
        testTakingTip: "Skin traction = applied to skin surface, lower weight (5-10 lbs), temporary, simpler care. Skeletal traction = pins through bone, higher weight (15-40 lbs), longer term, requires pin care. If you see pins/wires/tongs, it's skeletal.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "traction"
    },

    {
        id: "fx-qb-018",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is assessing patients with casts. For each finding, indicate whether it is 'Expected — Continue Monitoring' or 'Abnormal — Take Immediate Action.'",
        columns: ["Expected — Continue Monitoring", "Abnormal — Take Immediate Action"],
        rows: [
            { id: "r1", text: "Mild swelling of the fingers visible above the cast edge after the first 24 hours", correct: "Expected — Continue Monitoring" },
            { id: "r2", text: "Hot spot on the cast surface with a foul odor emanating from under the cast", correct: "Abnormal — Take Immediate Action" },
            { id: "r3", text: "Patient reports mild itching under the cast on post-cast day 3", correct: "Expected — Continue Monitoring" },
            { id: "r4", text: "Cyanotic (blue) fingertips that are cold to touch with capillary refill of 5 seconds", correct: "Abnormal — Take Immediate Action" },
            { id: "r5", text: "A warm sensation over the cast during the first 24 hours while the plaster sets", correct: "Expected — Continue Monitoring" },
            { id: "r6", text: "Increasing pain despite elevation and prescribed analgesics", correct: "Abnormal — Take Immediate Action" }
        ],
        rationale: {
            correct: "Expected findings: mild swelling above the cast edge (normal post-injury response), mild itching (skin irritation from cast padding), and warmth during plaster curing (exothermic reaction, first 24 hours). Abnormal findings: hot spot with foul odor (suggests pressure sore or infection under the cast — requires windowing or removal), cyanotic cold fingers with delayed cap refill (neurovascular compromise — bivalve the cast), increasing pain despite treatment (possible compartment syndrome — urgent assessment needed)."
        },
        testTakingTip: "Cast red flags requiring immediate action: color/temperature changes in digits, prolonged cap refill, numbness/tingling, unrelieved pain, foul odor, and hot spots on the cast. Mild swelling, itching, and warmth during setting are normal.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "cast-care"
    },

    {
        id: "fx-qb-019",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each Salter-Harris fracture classification, match it to the correct description of which growth plate structures are involved.",
        columns: ["Type I", "Type II", "Type III", "Type IV"],
        rows: [
            { id: "r1", text: "Fracture through the growth plate (physis) ONLY — often not visible on initial X-ray", correct: "Type I" },
            { id: "r2", text: "Fracture through the growth plate AND the metaphysis (above the plate) — most common type", correct: "Type II" },
            { id: "r3", text: "Fracture through the growth plate AND the epiphysis (below the plate into the joint)", correct: "Type III" },
            { id: "r4", text: "Fracture through the metaphysis, growth plate, AND epiphysis — crosses the entire growth plate region", correct: "Type IV" }
        ],
        rationale: {
            correct: "Salter-Harris classification (mnemonic SALTR): Type I = Straight across/Separated (physis only, may need MRI to diagnose), Type II = Above (physis + metaphysis, most common ~75%), Type III = Lower/beLow (physis + epiphysis, involves the joint), Type IV = Through/Through everything (metaphysis + physis + epiphysis, often requires surgical fixation). Type V (not listed) = crushed/Rammed (compression of the growth plate, worst prognosis). Higher types have greater risk of growth disturbance."
        },
        testTakingTip: "Salter-Harris mnemonic SALTR: I = Separated (physis only), II = Above (most common), III = Lower (into joint), IV = Through all, V = Rammed (crushed). Higher number = higher risk of growth arrest. Type II is the most commonly tested because it's the most common.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "pediatric"
    },

    {
        id: "fx-qb-020",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is planning care for a patient with a femur fracture. For each task, indicate whether it can be delegated to a UAP or must be performed by the RN.",
        columns: ["Delegate to UAP", "RN Only"],
        rows: [
            { id: "r1", text: "Applying ice packs to the affected extremity per the established protocol", correct: "Delegate to UAP" },
            { id: "r2", text: "Performing neurovascular assessment (CMS checks) of the affected extremity", correct: "RN Only" },
            { id: "r3", text: "Elevating the extremity on pillows as directed by the care plan", correct: "Delegate to UAP" },
            { id: "r4", text: "Assessing for signs and symptoms of fat embolism syndrome", correct: "RN Only" },
            { id: "r5", text: "Reporting to the nurse that the patient's toes appear blue and feel cold", correct: "Delegate to UAP" },
            { id: "r6", text: "Determining whether pain is consistent with compartment syndrome vs expected post-fracture pain", correct: "RN Only" }
        ],
        rationale: {
            correct: "UAPs can perform standardized tasks that do not require clinical judgment: applying ice packs, elevating extremities, and reporting objective observations (blue toes, cold temperature) to the RN. RN-only tasks require clinical judgment: neurovascular assessment interpretation (normal vs abnormal CMS), recognizing complications (fat embolism triad), and differentiating pain types (expected vs compartment syndrome). The UAP observes and reports; the RN assesses, interprets, and intervenes."
        },
        testTakingTip: "Delegation in fracture care: UAPs can apply ice, elevate, position, and report observations. RNs assess neurovascular status, interpret findings, recognize complications, differentiate pain quality, and make clinical decisions. If it requires judgment, it's an RN task.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    // ── PATIENT EDUCATION / TEACHING (Type 3) ──────────────

    {
        id: "fx-qb-021",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is providing discharge teaching to a patient going home with a long arm cast after a humeral shaft fracture. Which instruction should the nurse include?",
        options: [
            { id: "a", text: "\"Keep your arm hanging at your side to encourage blood flow to the fingers.\"" },
            { id: "b", text: "\"Elevate your arm on pillows above heart level and wiggle your fingers frequently to reduce swelling.\"" },
            { id: "c", text: "\"You may apply heat to the cast for the first 48 hours to speed healing.\"" },
            { id: "d", text: "\"Soak the cast daily in warm water to keep the padding clean.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Elevation above heart level promotes venous return and reduces edema. Wiggling fingers maintains circulation, prevents stiffness, and helps the nurse detect early neurovascular compromise. Keeping the arm dependent (hanging down) promotes swelling. Heat application increases inflammation in the acute phase — ice is appropriate for the first 48 hours. Casts must never be soaked; moisture traps bacteria against the skin and leads to maceration and breakdown."
        },
        testTakingTip: "Cast teaching always includes: elevate above heart, keep dry, nothing inside the cast, check CMS (color, motion, sensation), and report numbness/tingling/color change immediately.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "cast-care"
    },

    {
        id: "fx-qb-022",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "An older adult with osteoporosis has just been treated for a Colles fracture. The nurse is providing teaching on fracture prevention. Which statement by the patient shows the BEST understanding of how to reduce future fracture risk?",
        options: [
            { id: "a", text: "\"I will stay in bed as much as possible so I don't fall again.\"" },
            { id: "b", text: "\"I will start a walking program, take my calcium and vitamin D, and have my home checked for trip hazards.\"" },
            { id: "c", text: "\"I will double my calcium supplement dose to strengthen my bones faster.\"" },
            { id: "d", text: "\"I will only walk when someone else is present to watch me.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "A comprehensive fracture prevention plan includes weight-bearing exercise (stimulates bone remodeling), adequate calcium and vitamin D intake, and home safety modifications (removing throw rugs, improving lighting, installing grab bars). Bed rest accelerates bone loss and deconditioning — the opposite of the goal. Doubling supplements without medical guidance risks hypercalcemia and kidney stones. Waiting for supervision limits independence and physical activity."
        },
        testTakingTip: "Osteoporosis prevention is multi-pronged: weight-bearing exercise, calcium 1200 mg/day + vitamin D 800-1000 IU/day (for adults over 50), fall prevention, bone density screening, and medications (bisphosphonates) when indicated.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "prevention"
    },

    {
        id: "fx-qb-023",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A patient with an external fixator on the right tibia asks the nurse, \"When can I take a shower?\" Which response by the nurse is MOST appropriate?",
        options: [
            { id: "a", text: "\"You cannot bathe at all until the fixator is removed in several weeks.\"" },
            { id: "b", text: "\"You may shower, but cover the pin sites with waterproof dressings, and clean and dry them thoroughly afterward per your care instructions.\"" },
            { id: "c", text: "\"Soak your leg in a bathtub daily to keep the pin sites clean.\"" },
            { id: "d", text: "\"You only need to worry about the pin sites if they start to smell.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Patients with external fixators can shower with precautions: cover pin sites with waterproof dressings to prevent contamination, then clean and dry the sites thoroughly afterward following the prescribed pin-care protocol. Total avoidance of bathing for weeks is unnecessary and impractical. Soaking in a bathtub introduces bacteria from standing water to the pin sites, increasing infection risk. Waiting for a foul smell means infection has already developed — prevention is the goal."
        },
        testTakingTip: "External fixator hygiene: showering is allowed with pin-site protection. Bathtubs, pools, and hot tubs are contraindicated. Clean pin sites per protocol (chlorhexidine or saline) and monitor daily for redness, drainage, or loosening.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "external-fixation"
    },

    {
        id: "fx-qb-024",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is educating a patient about crutch walking after a lower leg fracture. Which instruction demonstrates correct crutch safety?",
        options: [
            { id: "a", text: "\"Rest your weight on the axillary pads (armpits) when standing still.\"" },
            { id: "b", text: "\"Support your body weight through your hands on the hand grips, keeping the crutch pads 2-3 finger widths below the axillae.\"" },
            { id: "c", text: "\"Position the crutch tips directly beside your feet for maximum stability.\"" },
            { id: "d", text: "\"Lean forward and look at your feet with each step to avoid tripping.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Weight must be borne through the hands and hand grips — NEVER through the axillary pads. Pressure on the axillae can cause brachial plexus compression (crutch palsy), leading to numbness, tingling, and even paralysis of the arms. Crutch pads should rest 2-3 finger widths below the axillae. Crutch tips should be positioned 6 inches to the front and side of the feet for a stable base of support. Looking down shifts the center of gravity forward and increases fall risk."
        },
        testTakingTip: "Crutch safety essentials: weight on HANDS not armpits, pads 2-3 fingers below axillae, tips 6 inches front and lateral, look ahead not down. Crutch palsy from axillary pressure is the most testable complication.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "fx-qb-025",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is teaching a patient who had ORIF of a hip fracture about post-discharge precautions. The patient asks, \"Why do I need to use a raised toilet seat and avoid crossing my legs?\" Which response by the nurse provides the BEST explanation?",
        options: [
            { id: "a", text: "\"Those positions put stress on the incision and could cause the wound to open.\"" },
            { id: "b", text: "\"Bending the hip past 90 degrees or crossing your legs can dislocate the new hip hardware, which would require emergency surgery to correct.\"" },
            { id: "c", text: "\"It's just a standard precaution for all orthopedic surgeries and not specific to your procedure.\"" },
            { id: "d", text: "\"Crossing your legs increases your blood pressure, which slows bone healing.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "After hip fracture repair (especially with a posterior surgical approach), hip precautions prevent dislocation of the prosthesis or hardware. The three key restrictions are: no hip flexion beyond 90 degrees (hence the raised toilet seat and elevated chairs), no adduction past midline (no crossing legs), and no internal rotation of the affected leg. Violating these positions can force the femoral head out of the acetabular component, requiring emergent closed or open reduction. These are specific to hip surgery, not generic orthopedic precautions."
        },
        testTakingTip: "Hip precautions after posterior approach (most common): no flexion >90°, no adduction past midline, no internal rotation. Assistive devices: raised toilet seat, reacher/grabber, long-handled shoe horn, shower chair. Precautions typically last 6-12 weeks.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "hip-fracture"
    },

    // ── SCOPE OF PRACTICE (Type 10) ────────────────────────

    {
        id: "fx-qb-026",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A charge nurse is making assignments on an orthopedic unit. Which task can be safely delegated to an unlicensed assistive personnel (UAP)?",
        options: [
            { id: "a", text: "Performing pin-site care on a patient with an external fixator" },
            { id: "b", text: "Assessing a patient's pain level after administering morphine for a femur fracture" },
            { id: "c", text: "Measuring and recording intake and output on a post-operative hip fracture patient" },
            { id: "d", text: "Teaching a patient how to use crutches with a non-weight-bearing gait" }
        ],
        correct: "c",
        rationale: {
            correct: "Measuring and recording intake and output (I&O) is a standardized, non-judgmental task that can be delegated to a UAP. Pin-site care requires sterile technique and assessment for infection — an RN responsibility. Assessing pain response to medication requires clinical judgment (effectiveness, adverse effects, respiratory depression) — an RN task. Teaching crutch walking requires assessment of readiness, balance, and technique correction — an RN or PT responsibility."
        },
        testTakingTip: "Delegation rule: UAPs can perform tasks that are routine, standardized, and don't require clinical judgment. If the task involves assessment, teaching, evaluation, or sterile procedures, it stays with the RN.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-027",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A UAP reports to the RN that a patient in skeletal traction is complaining of severe pain and that the traction weights are on the floor. What should the RN do FIRST?",
        options: [
            { id: "a", text: "Instruct the UAP to lift the weights off the floor and reposition them" },
            { id: "b", text: "Go to the patient immediately and perform a neurovascular and traction assessment" },
            { id: "c", text: "Call the provider to report the finding before entering the room" },
            { id: "d", text: "Document the UAP's findings and address it during the next scheduled assessment" }
        ],
        correct: "b",
        rationale: {
            correct: "The RN must personally assess the patient because this situation involves clinical judgment: severe pain could indicate compartment syndrome or fracture displacement, and the fallen weights mean traction is ineffective. A UAP should NOT reposition traction weights — this requires the RN to verify alignment, check the pulley system, and assess neurovascular status. Calling the provider before assessing gives incomplete information. Waiting is dangerous with severe pain and disrupted traction."
        },
        testTakingTip: "When a UAP reports a concerning finding, the RN's first action is ALWAYS to assess the patient directly. Never delegate assessment, never delay assessment, never call the provider without data. Assess first, then intervene, then notify.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "traction"
    },

    {
        id: "fx-qb-028",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "An LPN/LVN is caring for patients on an orthopedic floor under the supervision of an RN. Which task is OUTSIDE the LPN/LVN scope of practice?",
        options: [
            { id: "a", text: "Administering oral pain medication to a patient with a wrist fracture" },
            { id: "b", text: "Reinforcing cast care teaching that the RN has already initiated" },
            { id: "c", text: "Developing the initial nursing care plan for a newly admitted patient with a pelvic fracture" },
            { id: "d", text: "Monitoring vital signs every 4 hours on a stable post-operative patient" }
        ],
        correct: "c",
        rationale: {
            correct: "Developing the initial nursing care plan requires assessment, nursing diagnosis, and planning — all steps in the nursing process that are reserved for the RN. LPN/LVNs can contribute data to the care plan but cannot create it independently. LPN/LVNs CAN administer oral medications (scope varies by state but oral meds are generally within scope), reinforce teaching already initiated by the RN, and perform routine monitoring of stable patients."
        },
        testTakingTip: "LPN/LVN scope: can perform skills (meds, dressing changes, data collection, reinforcing teaching) on stable patients. Cannot: assess, plan, evaluate, initiate teaching, or care for unstable/complex patients. The RN owns the nursing process.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-029",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "An orthopedic unit has 4 patients needing care. The RN has one LPN and one UAP available. Which assignment is MOST appropriate?",
        options: [
            { id: "a", text: "UAP: Perform neurovascular checks on the post-op ORIF patient every 2 hours" },
            { id: "b", text: "LPN: Admit a new patient with a complex pelvic fracture and develop the care plan" },
            { id: "c", text: "LPN: Administer scheduled oral medications and reinforce cast care education; UAP: Assist with hygiene, meals, and repositioning" },
            { id: "d", text: "UAP: Teach a patient how to perform self-care with a new arm cast" }
        ],
        correct: "c",
        rationale: {
            correct: "This assignment correctly matches scope of practice: the LPN administers oral medications (within scope for stable patients) and reinforces teaching the RN has already initiated. The UAP performs routine supportive care (hygiene, meals, repositioning) that requires no clinical judgment. Neurovascular checks are assessments — RN only. Admission with care plan development — RN only. Patient teaching initiation — RN only."
        },
        testTakingTip: "When assigning tasks, match complexity to competency: RN = assessment, planning, unstable patients, teaching initiation, IV push meds. LPN = stable patients, oral meds, reinforcing teaching, data collection. UAP = routine care, vital signs, I&O, hygiene, mobility assistance.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-030",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A physical therapist has evaluated a patient after hip fracture repair and recommends a specific gait-training protocol. The nurse notices the PT's recommended weight-bearing status differs from the surgeon's order. What should the nurse do?",
        options: [
            { id: "a", text: "Follow the physical therapist's recommendation because they are the mobility expert" },
            { id: "b", text: "Follow whichever order is less restrictive so the patient can progress faster" },
            { id: "c", text: "Clarify the discrepancy with the surgeon before implementing either plan" },
            { id: "d", text: "Allow the patient to choose which weight-bearing level they prefer" }
        ],
        correct: "c",
        rationale: {
            correct: "When conflicting orders exist between providers, the nurse must clarify before acting. The surgeon's order regarding weight-bearing status is based on the specific surgical fixation used and bone quality — incorrect weight bearing can cause hardware failure or fracture displacement. The nurse should contact the surgeon to resolve the discrepancy. Following the PT's recommendation without clarification, choosing the less restrictive option, or letting the patient choose could all lead to serious complications."
        },
        testTakingTip: "Conflicting orders = clarify before acting. Never assume, never choose independently, never let the patient decide on medical parameters. The nurse's role is to advocate for patient safety by resolving discrepancies through proper communication channels.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "rehabilitation"
    },

    // ── CLINICAL JUDGMENT / NEXT STEP (Type 13) ────────────

    {
        id: "fx-qb-031",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A patient had a closed reduction and casting of a radial fracture 4 hours ago. The patient rates pain at 9/10 and states, \"The pain medicine isn't helping at all.\" The nurse notes the fingers are swollen and tense. What is the nurse's PRIORITY action?",
        options: [
            { id: "a", text: "Administer an additional dose of the prescribed opioid analgesic" },
            { id: "b", text: "Elevate the arm above heart level and apply ice around the cast" },
            { id: "c", text: "Perform a complete neurovascular assessment and prepare to notify the provider for possible cast bivalving" },
            { id: "d", text: "Reassure the patient that pain is expected after a fracture reduction" }
        ],
        correct: "c",
        rationale: {
            correct: "Pain unrelieved by opioids combined with swollen, tense fingers 4 hours after casting are warning signs of compartment syndrome or neurovascular compromise. The nurse must perform a full CMS assessment (color, motion, sensation, capillary refill, pulses) and notify the provider immediately — the cast may need to be bivalved to relieve pressure. Simply giving more pain medication masks a potentially dangerous complication. Elevation and ice are supportive but not the priority when neurovascular compromise is suspected. Reassurance without assessment is dangerous."
        },
        testTakingTip: "Pain unrelieved by opioids after casting = assess neurovascular status FIRST. Never assume it's \"normal post-fracture pain\" — always rule out compartment syndrome. The next step is assessment, then intervention (bivalve), then notification.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "compartment-syndrome"
    },

    {
        id: "fx-qb-032",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A nurse is caring for four orthopedic patients at the start of the shift. Which patient should the nurse assess FIRST?",
        options: [
            { id: "a", text: "A patient 2 days post-ORIF of the ankle who is requesting a refill of oral pain medication" },
            { id: "b", text: "A patient in Buck's traction for a hip fracture who is asking for help repositioning in bed" },
            { id: "c", text: "A patient with a femur fracture 30 hours ago who is newly confused with a respiratory rate of 28" },
            { id: "d", text: "A patient with a forearm cast who is due for a scheduled neurovascular check" }
        ],
        correct: "c",
        rationale: {
            correct: "New-onset confusion and tachypnea 30 hours after a femur fracture is a classic presentation of fat embolism syndrome (24-72 hour window). This is a medical emergency requiring immediate assessment, supplemental oxygen, and rapid escalation. Pain medication refill is a comfort measure that can wait. Repositioning in traction is important but not emergent. A scheduled neurovascular check is routine and can be done after addressing the acute change."
        },
        testTakingTip: "Prioritization framework: assess the patient with the most acute or unexpected change first. New confusion + respiratory distress after long bone fracture = fat embolism until ruled out. Stable patients with expected needs can wait.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "complications"
    },

    {
        id: "fx-qb-033",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A patient 12 hours after ORIF of a tibial fracture has a hemoglobin of 7.2 g/dL (baseline 13.5 g/dL), heart rate of 112 bpm, blood pressure of 88/56 mmHg, and the surgical drain has collected 800 mL of dark blood. What is the nurse's BEST next action?",
        options: [
            { id: "a", text: "Elevate the extremity and continue monitoring vital signs every hour" },
            { id: "b", text: "Notify the surgeon immediately and anticipate orders for blood transfusion and possible return to the OR" },
            { id: "c", text: "Increase the IV fluid rate and recheck the hemoglobin in 4 hours" },
            { id: "d", text: "Apply a pressure dressing over the surgical site and document the findings" }
        ],
        correct: "b",
        rationale: {
            correct: "This patient is showing signs of hemorrhagic shock: hemoglobin dropped by nearly half, tachycardia, hypotension, and excessive drain output (800 mL is well above the expected 200-500 mL in 24 hours). This requires immediate surgeon notification — the patient likely needs blood transfusion and possibly a return to the OR to address the bleeding source. Monitoring alone is insufficient with active hemodynamic instability. Increasing IV fluids without addressing the bleeding source is a temporizing measure only. A pressure dressing won't address internal surgical site bleeding."
        },
        testTakingTip: "Post-surgical hemorrhage: large drop in H&H + tachycardia + hypotension + excessive drain output = immediate surgeon notification + prepare for transfusion. Don't just monitor — this patient is actively hemorrhaging.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "post-operative"
    },

    {
        id: "fx-qb-034",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A nurse discovers that a patient in balanced suspension traction has moved down in the bed, and the affected leg is no longer aligned with the traction pull. The patient's buttocks are resting against the footboard. What should the nurse do FIRST?",
        options: [
            { id: "a", text: "Remove the traction weights, reposition the patient, and reapply the weights" },
            { id: "b", text: "Use the overhead trapeze to help the patient slide up in bed while maintaining the traction setup" },
            { id: "c", text: "Add extra weights to compensate for the misalignment" },
            { id: "d", text: "Notify the provider before touching any part of the traction apparatus" }
        ],
        correct: "b",
        rationale: {
            correct: "The patient should use the overhead trapeze to lift and slide toward the head of the bed, restoring proper alignment with the traction vector. The nurse assists with this repositioning while ensuring weights remain hanging freely and ropes stay in the pulleys. Weights must NEVER be removed — this disrupts the continuous pull needed for fracture alignment. Adding extra weights changes the prescribed force and requires a provider order. While notifying the provider may be needed, correcting the positioning is within nursing scope and should be done first."
        },
        testTakingTip: "Traction repositioning: use the trapeze, never remove weights, maintain alignment with the traction pull. The patient's body provides countertraction — if they slide down, the traction mechanics are disrupted even though the weights are still hanging.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "traction"
    },

    {
        id: "fx-qb-035",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is assessing a patient 6 hours after a tibial cast application. The patient reports numbness and tingling in the toes, and the nurse notes that active toe movement is significantly weaker than at baseline. Capillary refill is 4 seconds. The nurse bivalves the cast as per standing orders. After 20 minutes, there is no improvement. What is the MOST appropriate next step?",
        options: [
            { id: "a", text: "Continue to monitor for another hour since bivalving may take time to work" },
            { id: "b", text: "Re-elevate the extremity and apply ice to reduce swelling" },
            { id: "c", text: "Notify the surgeon immediately — fasciotomy may be required" },
            { id: "d", text: "Administer a stronger analgesic and reassess in 30 minutes" }
        ],
        correct: "c",
        rationale: {
            correct: "Neurovascular compromise (numbness, weakness, prolonged capillary refill) that does not improve after removing external compression (bivalving the cast) suggests compartment syndrome requiring fasciotomy. The 6-hour window is critical — irreversible muscle and nerve damage occurs after 6 hours of sustained elevated compartment pressure. Waiting another hour uses up precious time. Elevation above heart level can worsen ischemia by reducing arterial inflow. Analgesics mask the primary warning sign (pain) without addressing the cause."
        },
        testTakingTip: "Escalation pathway: CMS compromise → bivalve cast → reassess in 15-20 min → if no improvement, notify surgeon for fasciotomy. Each step has a tight timeline. Don't keep waiting once interventions fail — escalate.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "compartment-syndrome"
    },

    // ── ADVERSE EFFECTS / SIDE EFFECTS (Type 15) ───────────

    {
        id: "fx-qb-036",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with a femur fracture is receiving enoxaparin (Lovenox) for DVT prophylaxis post-operatively. Which finding should the nurse report to the provider immediately?",
        options: [
            { id: "a", text: "A small bruise at the subcutaneous injection site" },
            { id: "b", text: "Platelet count of 82,000/mcL (baseline was 240,000/mcL)" },
            { id: "c", text: "Mild discomfort at the injection site lasting a few minutes" },
            { id: "d", text: "INR of 1.0" }
        ],
        correct: "b",
        rationale: {
            correct: "A platelet drop of more than 50% from baseline is a hallmark of heparin-induced thrombocytopenia (HIT), a serious, potentially life-threatening complication of heparin products including enoxaparin. This patient's platelets dropped from 240,000 to 82,000 (>50% decrease). HIT paradoxically causes thrombosis, not bleeding. All heparin must be stopped immediately and an alternative anticoagulant started. Small bruises at injection sites are expected with anticoagulants. Mild injection site discomfort is common. INR of 1.0 is normal and irrelevant to enoxaparin monitoring (enoxaparin is monitored with anti-Xa levels, not INR)."
        },
        testTakingTip: "HIT red flags: platelet drop >50% from baseline, typically 5-10 days after starting heparin. Counterintuitive: HIT causes clots, not bleeding. Action: stop ALL heparin immediately, start alternative anticoagulant (argatroban, bivalirudin). Never give heparin flush either.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "complications"
    },

    {
        id: "fx-qb-037",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A patient taking alendronate (Fosamax) for osteoporosis calls the nurse helpline reporting difficulty swallowing and a burning sensation in the chest that started 2 days ago. What is the nurse's BEST response?",
        options: [
            { id: "a", text: "\"Take the medication with a full glass of milk to coat your stomach.\"" },
            { id: "b", text: "\"Stop taking the medication and see your provider today — you may have esophageal irritation.\"" },
            { id: "c", text: "\"Lie down for 30 minutes after taking the medication so it absorbs better.\"" },
            { id: "d", text: "\"This is a normal side effect; it will go away in a few days.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "Dysphagia and retrosternal burning are signs of esophageal irritation or esophagitis, a serious adverse effect of bisphosphonates. The patient should stop the medication and be evaluated promptly — continued use can lead to esophageal ulceration, stricture, or perforation. Bisphosphonates must be taken with plain water only (not milk, juice, or other beverages) on an empty stomach. The patient must remain UPRIGHT (not lie down) for at least 30 minutes after taking the medication to prevent esophageal contact. These are not benign symptoms to dismiss."
        },
        testTakingTip: "Bisphosphonate administration rules: empty stomach, plain water only (6-8 oz), remain upright 30+ minutes, no food/drink/other meds for 30 minutes after. Report dysphagia, chest pain, or new heartburn immediately — stop the medication.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "prevention"
    },

    {
        id: "fx-qb-038",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A patient is receiving IV morphine via PCA pump for pain management after a complex femur fracture repair. The nurse finds the patient with a respiratory rate of 8 breaths/min, pinpoint pupils, and difficult to arouse. What is the nurse's FIRST action?",
        options: [
            { id: "a", text: "Turn off the PCA pump and administer naloxone (Narcan) as per protocol" },
            { id: "b", text: "Stimulate the patient by shaking them and calling their name loudly" },
            { id: "c", text: "Call a rapid response and wait for the team to arrive before intervening" },
            { id: "d", text: "Document the findings and notify the provider within the hour" }
        ],
        correct: "a",
        rationale: {
            correct: "This patient is showing classic signs of opioid toxicity: respiratory depression (RR < 10), miosis (pinpoint pupils), and decreased level of consciousness. The immediate actions are to stop the source (turn off PCA pump) and reverse the opioid with naloxone (Narcan), which is a mu-receptor antagonist. While stimulation and rapid response may be appropriate supportive measures, the definitive intervention is naloxone administration. Waiting to document or call without immediate action endangers the patient — respiratory arrest can occur within minutes."
        },
        testTakingTip: "Opioid toxicity triad: respiratory depression + pinpoint pupils + sedation. Immediate action: stop opioid + give naloxone. Monitor for renarcotization (naloxone has a shorter half-life than most opioids). Always have naloxone available when administering opioids via PCA.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-039",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is monitoring a patient receiving IV ketorolac (Toradol) for post-fracture pain management. The nurse should monitor for which adverse effect specific to NSAID therapy?",
        options: [
            { id: "a", text: "Respiratory depression and pinpoint pupils" },
            { id: "b", text: "GI bleeding, evidenced by dark tarry stools or coffee-ground emesis" },
            { id: "c", text: "Urinary retention and constipation" },
            { id: "d", text: "Physical dependence and withdrawal symptoms" }
        ],
        correct: "b",
        rationale: {
            correct: "NSAIDs (including ketorolac) inhibit prostaglandin synthesis, which reduces the protective mucosal barrier in the GI tract, leading to increased risk of gastric ulceration and GI bleeding. Signs include melena (dark tarry stools), hematemesis, or coffee-ground emesis. Ketorolac is limited to 5 days maximum due to this risk. Respiratory depression and miosis are opioid effects. Urinary retention and constipation are also primarily opioid side effects. NSAIDs do not cause physical dependence."
        },
        testTakingTip: "NSAID adverse effects: GI bleeding (most dangerous), renal impairment, platelet dysfunction (increased bleeding), and cardiovascular risk. Ketorolac is one of the most potent IV NSAIDs — max 5 days use. Always assess for GI bleeding and renal function.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-040",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A patient is being discharged on warfarin (Coumadin) after hip fracture repair for DVT prevention. Which discharge instruction is ESSENTIAL for the nurse to include?",
        options: [
            { id: "a", text: "\"You can take ibuprofen for any aches and pains since it works well with warfarin.\"" },
            { id: "b", text: "\"Eat as many green leafy vegetables as you can to help your bones heal.\"" },
            { id: "c", text: "\"Keep your vitamin K intake consistent day to day, attend all INR lab appointments, and report any unusual bruising or bleeding immediately.\"" },
            { id: "d", text: "\"You can stop taking warfarin once your hip feels better, usually in about 2 weeks.\"" }
        ],
        correct: "c",
        rationale: {
            correct: "Warfarin requires consistent vitamin K intake (not avoidance — consistency is key) because vitamin K directly antagonizes warfarin's mechanism. Regular INR monitoring ensures the therapeutic range (2.0-3.0 for DVT prevention). Reporting bleeding is critical because warfarin's primary adverse effect is hemorrhage. Ibuprofen increases bleeding risk significantly (inhibits platelets and competes for protein binding). Dramatically increasing green leafy vegetables (high in vitamin K) would decrease warfarin effectiveness. Patients should never self-discontinue warfarin."
        },
        testTakingTip: "Warfarin teaching essentials: consistent vitamin K intake (not avoidance), regular INR monitoring (goal 2.0-3.0), avoid NSAIDs and aspirin, report bleeding/bruising, use soft toothbrush, electric razor, no contact sports. Antidote: vitamin K (phytonadione).",
        relatedGuide: "fractures.html",
        relatedGuideSection: "post-operative"
    },

    // ── CONTRAINDICATIONS (Type 16) ────────────────────────

    {
        id: "fx-qb-041",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for a patient with a suspected cervical spine fracture after a diving accident. Which action is CONTRAINDICATED in the initial management?",
        options: [
            { id: "a", text: "Applying a rigid cervical collar to maintain spine immobilization" },
            { id: "b", text: "Using a log-roll technique with 3-4 people for any repositioning" },
            { id: "c", text: "Flexing the patient's neck to tuck the chin to the chest to assess range of motion" },
            { id: "d", text: "Maintaining the head and spine in a neutral, aligned position at all times" }
        ],
        correct: "c",
        rationale: {
            correct: "With a suspected cervical spine fracture, ANY movement of the neck — flexion, extension, or rotation — is absolutely contraindicated until the injury is ruled out by imaging. Flexing the neck could compress the spinal cord against a fractured or displaced vertebra, causing permanent paralysis or death. The cervical spine must be immobilized in neutral alignment. A rigid collar, log-rolling, and maintaining neutral alignment are all correct interventions for spinal precautions."
        },
        testTakingTip: "Suspected spinal injury: immobilize in position found (or neutral alignment), no flexion/extension/rotation, rigid collar, log-roll only, maintain alignment during all transfers. Clear the spine with imaging before allowing any neck movement.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "emergency"
    },

    {
        id: "fx-qb-042",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A nurse is reviewing orders for a patient with a tibial fracture who is suspected of developing compartment syndrome. The provider orders to elevate the extremity above heart level. What should the nurse do?",
        options: [
            { id: "a", text: "Carry out the order immediately — elevation reduces edema" },
            { id: "b", text: "Question the order because elevation above heart level is contraindicated in compartment syndrome as it reduces arterial perfusion to the ischemic compartment" },
            { id: "c", text: "Elevate the limb and apply ice packs to reduce compartment pressure" },
            { id: "d", text: "Elevate the limb and administer IV morphine for pain control" }
        ],
        correct: "b",
        rationale: {
            correct: "In compartment syndrome, the limb should be maintained at or slightly below heart level — NEVER elevated above the heart. Elevation above the heart reduces arterial inflow to tissue that is already ischemic from elevated compartment pressure, worsening the ischemia and accelerating tissue death. The nurse should question this order and clarify with the provider. Ice can also worsen vasoconstriction. Morphine masks the critical pain assessment needed for monitoring. The nurse is obligated to question any order that may harm the patient."
        },
        testTakingTip: "Compartment syndrome positioning: maintain at heart level or slightly below. This is the OPPOSITE of typical fracture care (which elevates). If you see 'compartment syndrome + elevate above heart' — that's the wrong answer. Also: no ice, no compression, no elevation.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "compartment-syndrome"
    },

    {
        id: "fx-qb-043",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "application",
        stem: "A patient is being prepared for an MRI to evaluate a suspected stress fracture. The nurse's review of the patient's history reveals a previous ORIF with stainless steel plates and screws in the opposite leg. What should the nurse do?",
        options: [
            { id: "a", text: "Proceed with the MRI — orthopedic hardware does not affect MRI safety" },
            { id: "b", text: "Notify the radiologist of the metallic implant so they can determine MRI compatibility and safety" },
            { id: "c", text: "Cancel the MRI and request a CT scan instead, since no patient with metal can have an MRI" },
            { id: "d", text: "Remove any external dressings and proceed; only external metal objects are a concern" }
        ],
        correct: "b",
        rationale: {
            correct: "Internal metallic implants require evaluation for MRI compatibility. Most modern orthopedic implants (titanium) are MRI-safe, but older stainless steel implants may be ferromagnetic and contraindicated. The nurse should notify the radiologist, who will determine if the specific implant is MRI-conditional, MRI-safe, or MRI-unsafe based on the implant manufacturer and type. Proceeding without assessment risks implant movement, heating, or image artifact. Not all metal is MRI-contraindicated — blanket cancellation is unnecessary."
        },
        testTakingTip: "MRI safety with implants: always report ANY implanted metal to the MRI team. MRI-safe ≠ MRI-conditional ≠ MRI-unsafe. The radiologist decides. Also screen for: pacemakers, cochlear implants, aneurysm clips, metallic foreign bodies (shrapnel), and insulin pumps.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-044",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with a history of chronic kidney disease (GFR 22 mL/min) is admitted with a wrist fracture. The provider orders ibuprofen 400 mg every 6 hours for pain. What is the nurse's BEST action?",
        options: [
            { id: "a", text: "Administer the ibuprofen as ordered — the wrist fracture pain needs treatment" },
            { id: "b", text: "Hold the medication and contact the provider because NSAIDs are contraindicated in severe kidney disease" },
            { id: "c", text: "Give half the dose to reduce the kidney impact" },
            { id: "d", text: "Administer the ibuprofen with a full glass of milk to protect the stomach" }
        ],
        correct: "b",
        rationale: {
            correct: "NSAIDs (including ibuprofen) are contraindicated in patients with chronic kidney disease (especially GFR < 30 mL/min) because they reduce renal prostaglandin production, further decreasing renal blood flow and potentially causing acute kidney injury or accelerating CKD progression. A GFR of 22 indicates Stage 4 CKD — NSAIDs could push the patient into dialysis. The nurse should hold the medication and request an alternative analgesic (acetaminophen is generally safe in CKD; opioids may be used with dose adjustments). Giving half the dose is not a nursing decision. Milk does not protect against renal effects."
        },
        testTakingTip: "NSAID contraindications: CKD/AKI, active GI bleeding, heart failure, third trimester pregnancy, aspirin-sensitive asthma, and concurrent anticoagulant therapy. When you see a kidney patient + NSAID order, that's a 'question the order' scenario.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-045",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is teaching a patient about care of a new plaster cast. Which activity should the nurse instruct the patient to AVOID?",
        options: [
            { id: "a", text: "Using a fan to speed up the drying process of the cast" },
            { id: "b", text: "Supporting the wet cast on pillows using the palms of the hands" },
            { id: "c", text: "Using a heat lamp or hair dryer to dry the cast faster" },
            { id: "d", text: "Leaving the cast uncovered to allow air circulation during drying" }
        ],
        correct: "c",
        rationale: {
            correct: "Heat lamps and hair dryers must NEVER be used to dry a plaster cast. External heat causes the cast to dry unevenly — the outside hardens while the inside remains wet, trapping moisture against the skin. This can also cause thermal burns, since the patient cannot feel heat through the cast padding. A plaster cast should air dry naturally (takes 24-72 hours). A fan on low/cool setting is acceptable to promote air circulation. Supporting the wet cast with palms (not fingers, which create pressure points) is correct. Leaving uncovered promotes drying."
        },
        testTakingTip: "Wet plaster cast care: air dry only (24-72 hours), support with palms of hands (never fingers — causes dents and pressure points), keep uncovered, use a fan if desired. NO heat sources. The cast is not fully weight-bearing until completely dry.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "cast-care"
    },

    // ── NEXT GEN NCLEX CLINICAL JUDGMENT (Type 30) ─────────

    {
        id: "fx-qb-046",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is evaluating patients on an orthopedic unit at the start of the shift. For each patient finding, determine whether the nurse should 'Assess Further Immediately' or if the finding is 'Expected — Continue Routine Care.'",
        columns: ["Assess Further Immediately", "Expected — Continue Routine Care"],
        rows: [
            { id: "r1", text: "Post-op day 1 hip ORIF patient: T 100.2°F (37.9°C), mild incisional pain rated 4/10, using incentive spirometer", correct: "Expected — Continue Routine Care" },
            { id: "r2", text: "Patient in skeletal traction for 3 days: pin site with serous drainage, mild erythema < 1cm around one pin", correct: "Expected — Continue Routine Care" },
            { id: "r3", text: "Patient with arm cast applied 8 hours ago: reports that fingers 'feel like they're falling asleep' and hand feels tight", correct: "Assess Further Immediately" },
            { id: "r4", text: "Post-op day 2 femur fracture patient: right calf is 3 cm larger in circumference than left, with tenderness and warmth", correct: "Assess Further Immediately" },
            { id: "r5", text: "Patient with pelvic fracture 48 hours post-injury: sudden onset confusion, tachypnea, and scattered petechiae on the upper chest", correct: "Assess Further Immediately" },
            { id: "r6", text: "Post-op day 3 ankle ORIF patient: mild bruising around the surgical site, ankle slightly swollen, performing ankle pumps", correct: "Expected — Continue Routine Care" }
        ],
        rationale: {
            correct: "Expected findings: low-grade fever in the first 24-48 hours post-op (inflammatory response), small amount of serous drainage at pin sites with minimal erythema (normal healing), and mild post-operative bruising with swelling (expected after surgery). Concerning findings requiring immediate assessment: paresthesias ('falling asleep') and tightness after cast application (neurovascular compromise/compartment syndrome), unilateral calf swelling with warmth (DVT), and the triad of confusion + tachypnea + petechiae (fat embolism syndrome)."
        },
        testTakingTip: "Clinical judgment: differentiate expected post-operative/post-injury findings from complications. Key abnormals: asymmetric swelling (DVT), new paresthesias after casting (NV compromise), confusion + petechiae after long bone fracture (FES), and fever >48 hours post-op (infection).",
        relatedGuide: "fractures.html",
        relatedGuideSection: "complications"
    },

    {
        id: "fx-qb-047",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is caring for a post-operative hip fracture patient. For each potential intervention, determine whether it is 'Indicated' or 'Contraindicated' for this patient.",
        columns: ["Indicated", "Contraindicated"],
        rows: [
            { id: "r1", text: "Place an abduction pillow between the patient's legs when in bed", correct: "Indicated" },
            { id: "r2", text: "Assist the patient to sit in a low recliner chair with the hips flexed past 90 degrees", correct: "Contraindicated" },
            { id: "r3", text: "Apply sequential compression devices (SCDs) to both lower extremities", correct: "Indicated" },
            { id: "r4", text: "Encourage the patient to cross the legs at the ankles for comfort while watching TV", correct: "Contraindicated" },
            { id: "r5", text: "Help the patient use the incentive spirometer 10 times per hour while awake", correct: "Indicated" },
            { id: "r6", text: "Position the patient on the operative side to promote wound drainage", correct: "Contraindicated" }
        ],
        rationale: {
            correct: "Indicated: abduction pillow (prevents adduction and dislocation), SCDs (DVT prophylaxis is essential after hip surgery), and incentive spirometry (prevents atelectasis and pneumonia — major risks in immobile elderly patients). Contraindicated: hip flexion past 90° (dislocation risk), crossing legs at any point (adduction past midline — dislocation risk), and lying on the operative side (increases pain, may compromise wound healing, and in some surgical approaches increases dislocation risk)."
        },
        testTakingTip: "Post-hip surgery: think about 3 movements that cause dislocation: flexion >90°, adduction past midline (crossing legs), and internal rotation. Everything else (SCDs, IS, abduction pillow, elevated toilet seat) is indicated for recovery.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "hip-fracture"
    },

    {
        id: "fx-qb-048",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is evaluating the effectiveness of interventions for a patient with a tibial fracture in a long leg cast. For each assessment finding, determine whether the finding indicates the 'Intervention Is Effective' or 'Intervention Is Not Effective — Escalate Care.'",
        columns: ["Intervention Is Effective", "Intervention Is Not Effective — Escalate Care"],
        rows: [
            { id: "r1", text: "After elevation for 2 hours: toe swelling has decreased and capillary refill is 2 seconds", correct: "Intervention Is Effective" },
            { id: "r2", text: "After administering prescribed oxycodone: pain decreased from 8/10 to 4/10 within 45 minutes", correct: "Intervention Is Effective" },
            { id: "r3", text: "After bivalving the cast for suspected NV compromise: fingers remain pale, cold, and numb after 20 minutes", correct: "Intervention Is Not Effective — Escalate Care" },
            { id: "r4", text: "After repositioning the traction: weights are hanging freely and the patient reports the pulling sensation is comfortable", correct: "Intervention Is Effective" },
            { id: "r5", text: "After administering IV morphine 4 mg: pain remains 9/10 and the patient reports increasing tightness in the leg", correct: "Intervention Is Not Effective — Escalate Care" }
        ],
        rationale: {
            correct: "Effective interventions: reduced swelling and normal capillary refill after elevation shows adequate circulation; pain reduction to a tolerable level after analgesia shows the medication is working; correct traction alignment with patient comfort shows mechanical intervention is successful. Ineffective interventions: persistent NV compromise after bivalving suggests the problem is internal (compartment syndrome) not external (cast compression) — fasciotomy may be needed; unrelieved pain with increasing tightness despite opioids is the hallmark of compartment syndrome requiring surgical intervention."
        },
        testTakingTip: "Evaluating effectiveness: if the intervention addresses the cause, symptoms should improve within a reasonable time. If bivalving doesn't fix NV compromise, the problem is deeper (compartment syndrome). If opioids don't relieve pain and tightness increases, think compartment syndrome.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "compartment-syndrome"
    },

    {
        id: "fx-qb-049",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is reviewing discharge readiness for patients on the orthopedic unit. For each patient scenario, determine whether the patient is 'Ready for Discharge' or 'Not Ready — Needs Further Intervention.'",
        columns: ["Ready for Discharge", "Not Ready — Needs Further Intervention"],
        rows: [
            { id: "r1", text: "Hip ORIF patient: demonstrates correct use of walker with TTWB, verbalizes hip precautions, pain controlled at 3/10 with oral meds, has a caregiver at home", correct: "Ready for Discharge" },
            { id: "r2", text: "Ankle ORIF patient: unable to demonstrate correct crutch walking, lives alone in a second-floor apartment, states 'I'll just figure it out'", correct: "Not Ready — Needs Further Intervention" },
            { id: "r3", text: "Wrist fracture patient: verbalizes CMS self-checks, demonstrates proper cast care, follow-up appointment scheduled, pain controlled with acetaminophen", correct: "Ready for Discharge" },
            { id: "r4", text: "Femur fracture patient post-ORIF: hemoglobin 7.1 g/dL, dizzy when standing, resting heart rate 108 bpm, BP 96/58", correct: "Not Ready — Needs Further Intervention" },
            { id: "r5", text: "Tibial fracture patient: neurovascular checks stable for 48 hours, demonstrates non-weight-bearing crutch walking, has arranged for ground-floor living", correct: "Ready for Discharge" }
        ],
        rationale: {
            correct: "Ready for discharge: patients demonstrate safe mobility techniques, understand self-care and warning signs, have adequate pain control with oral medications, have appropriate home support, and have stable vital signs and labs. Not ready: the ankle patient lacks safe mobility skills and home support (high fall risk in a second-floor apartment); the femur patient has hemodynamic instability (low H&H, tachycardia, hypotension, orthostatic dizziness) suggesting ongoing blood loss requiring evaluation and possible transfusion."
        },
        testTakingTip: "Discharge readiness criteria: stable vitals, adequate pain control (oral meds), demonstrated self-care ability, safe home environment, caregiver support if needed, follow-up arranged, and patient verbalization of warning signs. Any clinical instability = not ready.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "fx-qb-050",
        category: "musculoskeletal",
        topic: "fractures",
        topicLabel: "Fractures",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is creating a plan of care for a patient with a new femur fracture. For each nursing action, identify the PRIMARY rationale by matching it to the correct clinical concern.",
        columns: ["Prevent DVT", "Prevent Infection", "Prevent Compartment Syndrome", "Prevent Deconditioning"],
        rows: [
            { id: "r1", text: "Apply sequential compression devices (SCDs) and administer enoxaparin as ordered", correct: "Prevent DVT" },
            { id: "r2", text: "Perform neurovascular checks every 1-2 hours for the first 24 hours after casting", correct: "Prevent Compartment Syndrome" },
            { id: "r3", text: "Administer IV cefazolin within 1 hour and apply sterile dressings to the wound", correct: "Prevent Infection" },
            { id: "r4", text: "Encourage quadriceps sets, ankle pumps, and deep breathing exercises while on bed rest", correct: "Prevent Deconditioning" },
            { id: "r5", text: "Monitor for increasing pain unrelieved by prescribed analgesics and limb tightness", correct: "Prevent Compartment Syndrome" }
        ],
        rationale: {
            correct: "DVT prevention: SCDs provide mechanical prophylaxis by promoting venous return; enoxaparin provides pharmacologic anticoagulation. Infection prevention: prophylactic antibiotics and sterile wound care prevent osteomyelitis (especially critical in open fractures). Compartment syndrome prevention: frequent neurovascular checks and pain monitoring detect rising compartment pressures early. Deconditioning prevention: isometric exercises (quad sets), ankle pumps (also help DVT prevention), and respiratory exercises maintain muscle tone and prevent respiratory complications during immobility."
        },
        testTakingTip: "Femur fracture care priorities map to the four major complications: DVT (immobility), infection (open fracture or surgical site), compartment syndrome (first 24-48 hours), and deconditioning (prolonged bed rest). Each nursing action has a specific rationale tied to preventing one of these.",
        relatedGuide: "fractures.html",
        relatedGuideSection: "nursing-care"
    }

]);
