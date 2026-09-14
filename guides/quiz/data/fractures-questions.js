/**
 * Fractures Quiz - Question Data
 * 10 NCLEX-style questions: 5 Single, 3 Ordering, 2 Matrix
 */

/* exported fracturesQuizData */
var fracturesQuizData = {
    guideName: "Fractures",
    guideSlug: "fractures",
    category: "Musculoskeletal",
    categoryColor: "#8b5cf6",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient with a new long-arm cast applied 4 hours ago for a distal radius fracture. The patient reports increasing pain rated 8/10 that is unrelieved by the prescribed opioid analgesic. The nurse passively extends the patient's fingers and the patient cries out in severe pain. Which condition should the nurse suspect?",
            options: [
                { id: "a", text: "Fat embolism syndrome" },
                { id: "b", text: "Compartment syndrome" },
                { id: "c", text: "Deep vein thrombosis" },
                { id: "d", text: "Osteomyelitis" }
            ],
            correct: "b",
            rationale: {
                correct: "Compartment syndrome occurs when pressure within a closed muscle compartment rises to a level that compromises blood flow and tissue perfusion. The EARLIEST and MOST RELIABLE sign is pain out of proportion to the injury that is unrelieved by analgesics. Pain with passive stretch (extending the fingers stretches the forearm flexor compartment) is the hallmark assessment finding. This is a surgical emergency requiring immediate fasciotomy.",
                a: "Fat embolism syndrome typically occurs 24-72 hours after a long bone fracture and presents with the classic triad of respiratory distress, mental status changes, and petechial rash - not localized pain with passive stretch.",
                c: "Deep vein thrombosis (DVT) presents with calf tenderness, swelling, warmth, and a positive Homans' sign (though unreliable). It does not cause pain with passive stretch of the fingers and is not associated with cast application to the forearm.",
                d: "Osteomyelitis is a bone infection that develops days to weeks after injury or surgery. It presents with fever, localized warmth, erythema, and drainage - not acute pain with passive stretch hours after cast application."
            },
            testTakingTip: "Compartment syndrome's earliest sign: Pain out of proportion + pain with passive stretch. This comes BEFORE the other P's (Pallor, Pulselessness, Paresthesia, Paralysis). If you wait for pulselessness, irreversible damage has already occurred. Think of passive stretch as the 'early warning alarm.'",
            guideSection: "Section 6 - Compartment Syndrome",
            guideSectionId: "compartment-syndrome"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with a femur fracture sustained in a motorcycle accident is now 36 hours post-injury. The nurse notes new-onset confusion, SpO2 88% on room air, respiratory rate of 32 breaths/min, and a non-blanching petechial rash across the chest and axillae. Which action should the nurse take FIRST?",
            options: [
                { id: "a", text: "Administer high-flow oxygen via non-rebreather mask" },
                { id: "b", text: "Obtain a stat chest X-ray to confirm the diagnosis" },
                { id: "c", text: "Prepare the patient for emergent intubation" },
                { id: "d", text: "Notify the provider of suspected fat embolism" }
            ],
            correct: "a",
            rationale: {
                correct: "This patient is exhibiting the classic fat embolism triad: respiratory distress (tachypnea, hypoxemia), neurological changes (confusion), and petechial rash - occurring 24-72 hours post long bone fracture. The FIRST priority is oxygenation. With SpO2 of 88%, the patient is hypoxemic and needs immediate high-flow oxygen. The airway, breathing, and circulation (ABCs) priorities dictate addressing breathing before diagnostics or notification.",
                b: "A chest X-ray will help confirm the diagnosis (showing bilateral pulmonary infiltrates - 'snowstorm' pattern), but diagnostics are never the FIRST action when a patient is acutely hypoxemic. Oxygenate first.",
                c: "Intubation may be needed if the patient deteriorates, but the first intervention should be supplemental oxygen. High-flow O2 may stabilize the patient. Jumping to intubation without trying less invasive oxygenation first is inappropriate.",
                d: "The provider must be notified, but not BEFORE addressing the hypoxemia. The nurse can delegate notification while personally initiating oxygen therapy."
            },
            testTakingTip: "Fat embolism triad: Respiratory distress + Mental status changes + Petechial rash, appearing 24-72 hours post long bone fracture. Petechiae on the chest/axillae are pathognomonic (unique to fat embolism). Always oxygenate before diagnostic tests. NCLEX priority: Do first, then notify.",
            guideSection: "Section 8 - Complications",
            guideSectionId: "complications"
        },
        {
            id: 3,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse suspects compartment syndrome in a patient with a tibial fracture and a new below-knee cast. The patient reports severe, unrelieved pain and has decreased sensation in the toes. Place the following nursing actions in priority order.",
            options: [
                { id: "a", text: "Notify the provider immediately - compartment syndrome is a surgical emergency" },
                { id: "b", text: "Elevate the limb to heart level (NOT above - this reduces arterial perfusion to the compromised compartment)" },
                { id: "c", text: "Remove or bivalve the cast and loosen all dressings to relieve external pressure" },
                { id: "d", text: "Perform a neurovascular assessment: check the 5 P's (Pain, Pallor, Pulselessness, Paresthesia, Paralysis)" },
                { id: "e", text: "Prepare the patient for emergency fasciotomy and obtain surgical consent" }
            ],
            correct: ["d", "c", "b", "a", "e"],
            rationale: {
                correct: "The correct sequence is: assess the situation, relieve external compression, optimize positioning, notify the provider with assessment data, and prepare for definitive surgical treatment.",
                d: "FIRST - Perform a complete neurovascular assessment to confirm the clinical picture and document baseline findings. This data is essential for communicating the urgency to the provider and guides all subsequent actions.",
                c: "SECOND - Remove or bivalve the cast immediately. External compression worsens intracompartmental pressure. This is a nursing action that can be done independently and should not wait for a provider order in an emergency. Cutting the cast can reduce pressure by up to 65%.",
                b: "THIRD - Position the limb at heart level. Elevation above the heart decreases arterial perfusion pressure to the compartment, worsening ischemia. Positioning below the heart increases edema. Heart level is the optimal position.",
                a: "FOURTH - Notify the provider with your complete assessment data. You have already initiated independent nursing actions (cast removal, positioning) that cannot wait for orders.",
                e: "FIFTH - Once the provider confirms the diagnosis and orders fasciotomy, prepare the patient for surgery. This includes obtaining consent, NPO status, pre-op labs, and IV access."
            },
            testTakingTip: "Compartment syndrome sequence: Assess → Remove cast/dressings → Elevate to heart level (NOT above!) → Notify provider → Prepare for fasciotomy. The elevation detail is a common NCLEX trap - above heart level WORSENS the condition by reducing arterial inflow. Fasciotomy must be performed within 6 hours to prevent permanent damage.",
            guideSection: "Section 6 - Compartment Syndrome",
            guideSectionId: "compartment-syndrome"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is providing discharge education to the parents of a 9-year-old child who sustained a Salter-Harris Type II fracture of the distal femur. Which statement by the parent indicates a need for FURTHER teaching?",
            options: [
                { id: "a", text: "\"We need to follow up with orthopedics to monitor the growth plate for the next 1-2 years.\"" },
                { id: "b", text: "\"This type of fracture involves the growth plate and could affect how the bone grows.\"" },
                { id: "c", text: "\"Since it's only a Type II, the growth plate won't be affected and there's nothing to worry about.\"" },
                { id: "d", text: "\"We should watch for any difference in leg length as our child grows.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "This statement is INCORRECT and indicates further teaching is needed. Salter-Harris Type II fractures involve the growth plate (physis) AND the metaphysis. While Type II fractures have a generally good prognosis compared to Types III-V, they CAN still result in growth disturbances, especially in weight-bearing bones like the femur. All Salter-Harris fractures require follow-up monitoring because any injury to the growth plate carries risk of premature closure, angular deformity, or limb length discrepancy.",
                a: "This is a CORRECT statement. Long-term orthopedic follow-up (typically 1-2 years) is essential for all Salter-Harris fractures to monitor for growth disturbance via serial X-rays.",
                b: "This is a CORRECT statement. All five types of Salter-Harris fractures involve the growth plate (physis). The parent demonstrates understanding of the injury mechanism.",
                d: "This is a CORRECT statement. Limb length discrepancy is a potential long-term complication if the growth plate is damaged, and parents should monitor for this during growth."
            },
            testTakingTip: "Salter-Harris mnemonic (SALTR): Type I = Straight across (through physis only), Type II = Above (physis + metaphysis - MOST COMMON), Type III = Lower (physis + epiphysis), Type IV = Through everything (physis + metaphysis + epiphysis), Type V = Rammed/crushed (compression). 'Need for further teaching' = find the WRONG statement.",
            guideSection: "Section 9 - Pediatric Considerations",
            guideSectionId: "pediatrics"
        },
        {
            id: 5,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Expected Finding", "Notify Provider"],
            stem: "A patient had a fiberglass cast applied to the left lower leg 6 hours ago for a tibial fracture. For each assessment finding, classify whether it is an expected finding or requires the nurse to notify the provider.",
            options: [
                { id: "a", text: "Mild swelling of the toes that is reduced with elevation" },
                { id: "b", text: "Pain rated 4/10 that is relieved with prescribed analgesics" },
                { id: "c", text: "Toes are cool, pale, and capillary refill is 5 seconds" },
                { id: "d", text: "Patient reports 'pins and needles' sensation in the toes that does not resolve with repositioning" },
                { id: "e", text: "Warm sensation under the cast as the fiberglass cures" }
            ],
            correct: { a: "Expected Finding", b: "Expected Finding", c: "Notify Provider", d: "Notify Provider", e: "Expected Finding" },
            rationale: {
                correct: "After cast application, mild swelling that responds to elevation, controlled pain, and warmth during curing are expected. Cool/pale toes with delayed capillary refill and persistent paresthesia are signs of neurovascular compromise requiring immediate intervention.",
                a: "EXPECTED - Mild dependent edema after a fracture and cast application is normal. If it resolves with elevation, this indicates adequate vascular return and is not a concern.",
                b: "EXPECTED - Moderate pain that responds to prescribed analgesics is normal after a fracture. The key concern is pain that is UNRELIEVED by analgesics or disproportionate to the injury.",
                c: "NOTIFY PROVIDER - Cool, pale toes with delayed capillary refill (normal <3 seconds) indicate compromised arterial circulation. This could indicate the cast is too tight or early compartment syndrome. The cast may need to be bivalved or removed.",
                d: "NOTIFY PROVIDER - Persistent paresthesia (numbness/tingling) that does not resolve with repositioning indicates nerve compression or ischemia. This is one of the 5 P's of compartment syndrome and requires immediate evaluation.",
                e: "EXPECTED - Fiberglass casting material generates an exothermic (heat-producing) reaction as it cures. Patients should be warned about this in advance. The warmth is temporary and not harmful."
            },
            testTakingTip: "Post-cast neurovascular checks use the 5 P's: Pain (disproportionate/unrelieved), Pallor, Pulselessness, Paresthesia, Paralysis. Any P that doesn't resolve with elevation and repositioning = notify provider. Remember: capillary refill >3 seconds is abnormal.",
            guideSection: "Section 7 - Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 6,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient arrives at the emergency department after a fall with a suspected open (compound) fracture of the tibia. Bone is visible through a wound on the anterior shin. Place the nurse's initial actions in priority order.",
            options: [
                { id: "a", text: "Cover the exposed bone with a sterile, saline-moistened dressing" },
                { id: "b", text: "Assess airway, breathing, and circulation (ABCs) and hemodynamic stability" },
                { id: "c", text: "Administer IV antibiotics as ordered (cefazolin within 1 hour per protocol)" },
                { id: "d", text: "Immobilize the extremity in the position found - do not attempt to realign the bone" },
                { id: "e", text: "Perform a neurovascular assessment distal to the fracture (pulses, sensation, movement, capillary refill)" }
            ],
            correct: ["b", "e", "a", "d", "c"],
            rationale: {
                correct: "The correct sequence prioritizes patient stability, then neurovascular assessment, wound protection, immobilization, and infection prevention.",
                b: "FIRST - Airway, breathing, and circulation (ABCs) always come first. A fall significant enough to cause an open fracture may have associated injuries (head trauma, internal bleeding). Assess and stabilize the patient systemically before focusing on the extremity.",
                e: "SECOND - Neurovascular assessment distal to the fracture establishes a baseline BEFORE any interventions. Document pulses, sensation, motor function, and capillary refill. This is critical for detecting changes after splinting or transport.",
                a: "THIRD - Cover the open wound with a sterile, saline-moistened dressing to prevent further contamination and keep exposed tissue from drying out. Do NOT push the bone back in or irrigate aggressively in the ED - that occurs in the OR.",
                d: "FOURTH - Immobilize the extremity in the position found using a splint. Do NOT attempt to realign the fracture - manipulation can worsen neurovascular injury, increase contamination, and cause severe pain.",
                c: "FIFTH - IV antibiotics (typically a first-generation cephalosporin like cefazolin) should be administered as soon as possible, ideally within 1 hour, to reduce the risk of osteomyelitis. Open fractures carry a 2-50% infection risk depending on severity grade."
            },
            testTakingTip: "Open fracture priorities: airway, breathing, circulation (ABCs) → Neurovascular check → Sterile moist dressing (NEVER push bone back) → Immobilize as found → Antibiotics within 1 hour → Tetanus update → OR for irrigation/debridement. The saline-moistened dressing detail is an NCLEX favorite - dry dressings can adhere to exposed tissue.",
            guideSection: "Section 7 - Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a patient in Buck's traction for a femur fracture. During morning assessment, the nurse discovers the traction weights are resting on the floor. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Notify the orthopedic provider immediately" },
                { id: "b", text: "Lift the weights off the floor and ensure they are hanging freely" },
                { id: "c", text: "Remove the traction and reapply it from scratch" },
                { id: "d", text: "Document the finding and continue the assessment" }
            ],
            correct: "b",
            rationale: {
                correct: "The FIRST action is to restore proper traction by ensuring the weights are hanging freely. Traction weights must hang freely at all times to maintain the prescribed pull on the fracture for proper alignment and pain relief. Weights resting on the floor negate the therapeutic effect. The nurse should lift them to hang freely, verify the correct weight amount, and ensure the rope moves freely through the pulley.",
                a: "The provider should be notified if there is a concern about alignment change or patient injury, but the immediate action is to correct the equipment problem. This is an independent nursing action.",
                c: "Buck's traction should NOT be removed and reapplied by the nurse without an order. The nurse should restore proper weight suspension and assess the patient's limb alignment and neurovascular status.",
                d: "Documentation is important but is NEVER the first action when a safety issue is identified. The weights must be corrected first to restore therapeutic traction."
            },
            testTakingTip: "Traction rules: weights hang freely (NEVER rest on floor or bed), ropes move freely through pulleys, knots do not touch pulleys, maintain body alignment. For skin traction (Buck's): nurse can remove briefly for skin care. For skeletal traction: NEVER release weights - the provider manages pin site and traction changes.",
            guideSection: "Section 7 - Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is educating a patient with a new plaster arm cast. Which statement by the patient indicates CORRECT understanding of cast care?",
            options: [
                { id: "a", text: "\"I can use a knitting needle to scratch an itch under the cast.\"" },
                { id: "b", text: "\"I should use a hair dryer on the cool setting to help dry the cast faster.\"" },
                { id: "c", text: "\"I will elevate my arm on pillows and wiggle my fingers frequently.\"" },
                { id: "d", text: "\"I can wrap plastic wrap around the cast to take a bath.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "This statement demonstrates correct understanding. Elevating the casted extremity above heart level reduces edema by promoting venous return. Wiggling fingers (or toes for leg casts) promotes circulation, prevents stiffness, and allows the nurse/patient to monitor motor function - a key component of neurovascular assessment.",
                a: "INCORRECT - Inserting objects under the cast (knitting needles, hangers, pencils) can cause skin breakdown, pressure injuries, or lacerations that cannot be seen or treated under the cast. This can lead to infection. If itching occurs, cool air blown into the cast or tapping on the outside is safer.",
                b: "INCORRECT - A hair dryer, even on cool, should NOT be used on a plaster cast. Uneven drying can weaken the plaster and create hot spots that burn the skin underneath. Plaster casts should air dry naturally, which takes 24-72 hours. The cast should be left uncovered and the patient should use the palms (not fingertips) when handling to avoid denting.",
                d: "INCORRECT - A plaster cast cannot be effectively waterproofed with plastic wrap, which often leaks. A wet plaster cast softens, loses structural integrity, and creates a warm, moist environment that promotes skin maceration and infection. The patient should keep the cast completely dry."
            },
            testTakingTip: "Cast care essentials: Elevate above heart level, wiggle digits, NO objects inside cast, NO heat to dry cast (air dry only for plaster), keep cast DRY, petal rough edges with moleskin, check for 'hot spots' (infection underneath). NCLEX loves the 'knitting needle' distractor - always wrong!",
            guideSection: "Section 7 - Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 9,
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with a femur fracture is 48 hours post-injury. The nurse enters the room and finds the patient acutely confused, tachypneic (RR 34), and SpO2 84%. A petechial rash is noted on the chest. Place the nurse's response actions in priority order.",
            options: [
                { id: "a", text: "Apply high-flow oxygen via non-rebreather mask at 15 L/min" },
                { id: "b", text: "Call a rapid response and notify the provider of suspected fat embolism syndrome" },
                { id: "c", text: "Obtain arterial blood gas (ABG), complete blood count (CBC), comprehensive metabolic panel (CMP), coagulation studies, and lipase" },
                { id: "d", text: "Position the patient in high Fowler's position to maximize respiratory effort" },
                { id: "e", text: "Prepare for potential intubation and mechanical ventilation if oxygenation does not improve" }
            ],
            correct: ["a", "d", "b", "c", "e"],
            rationale: {
                correct: "The correct sequence prioritizes oxygenation, positioning, emergency notification, diagnostic workup, and preparation for escalation.",
                a: "FIRST - With SpO2 84%, the patient has severe hypoxemia. Immediate high-flow oxygen via non-rebreather mask (delivers 80-95% FiO2) is the priority intervention. Oxygenation always comes first.",
                d: "SECOND - High Fowler's position (60-90 degrees) maximizes diaphragmatic excursion and lung expansion, improving ventilation and oxygenation. This can be done simultaneously with oxygen application.",
                b: "THIRD - Activate the rapid response team and notify the provider. Communicate using Situation, Background, Assessment, Recommendation (SBAR): fat embolism suspected based on the classic triad (respiratory distress, confusion, petechial rash) 48 hours post femur fracture.",
                c: "FOURTH - Diagnostic labs confirm the clinical picture. Arterial blood gas (ABG) shows hypoxemia and respiratory alkalosis. Complete blood count (CBC) may show thrombocytopenia. Comprehensive metabolic panel (CMP) and coags assess for disseminated intravascular coagulation (DIC). Chest X-ray shows bilateral 'snowstorm' infiltrates.",
                e: "FIFTH - Fat embolism can rapidly progress to acute respiratory distress syndrome (ARDS). If high-flow O2 does not improve SpO2, prepare for intubation and mechanical ventilation with positive end-expiratory pressure (PEEP). Treatment is supportive - there is no specific antidote."
            },
            testTakingTip: "Fat embolism response: O2 first → Position → Notify/Rapid Response → Labs/chest X-ray (CXR) → Prepare for intubation. Key lab findings in fat embolism syndrome (FES): Low PaO2, low platelets, sometimes with disseminated intravascular coagulation (DIC), fat globules in urine (not sensitive). Treatment is entirely supportive. Prevention: early fracture fixation and gentle handling during transport.",
            guideSection: "Section 8 - Complications",
            guideSectionId: "complications"
        },
        {
            id: 10,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Open (Compound) Fracture", "Closed (Simple) Fracture"],
            stem: "A nurse is triaging two patients in the emergency department - one with an open fracture and one with a closed fracture. Classify each nursing priority as specific to an open fracture or a closed fracture.",
            options: [
                { id: "a", text: "Administer IV antibiotics within 1 hour and update tetanus immunization" },
                { id: "b", text: "Apply a sterile, saline-moistened dressing over the injury site" },
                { id: "c", text: "Apply ice packs wrapped in cloth to the injury site for 20 minutes on/20 minutes off" },
                { id: "d", text: "Prepare the patient for urgent surgical irrigation and debridement in the OR" },
                { id: "e", text: "Immobilize the extremity and elevate above heart level to reduce swelling" }
            ],
            correct: { a: "Open (Compound) Fracture", b: "Open (Compound) Fracture", c: "Closed (Simple) Fracture", d: "Open (Compound) Fracture", e: "Closed (Simple) Fracture" },
            rationale: {
                correct: "Open fractures require sterile wound management, antibiotics, tetanus prophylaxis, and surgical debridement due to contamination risk. Closed fractures focus on rest, ice, compression, and elevation (RICE) and immobilization since the skin barrier is intact.",
                a: "OPEN FRACTURE - The broken skin creates a direct pathway for infection to the bone (osteomyelitis risk 2-50%). IV antibiotics (cefazolin ± gentamicin depending on wound grade) must be given within 1 hour. Tetanus prophylaxis is needed because of the open wound.",
                b: "OPEN FRACTURE - Exposed bone and tissue must be covered with a sterile, saline-moistened dressing to prevent further contamination and desiccation. Never use dry dressings on exposed tissue, and never attempt to push bone back through the wound.",
                c: "CLOSED FRACTURE - With intact skin, ice application reduces swelling and pain. Apply ice wrapped in cloth (never directly on skin) for 20 minutes on/20 minutes off. This is part of the standard rest, ice, compression, elevation (RICE) protocol for closed injuries.",
                d: "OPEN FRACTURE - All open fractures require surgical irrigation and debridement (I&D) to remove contaminants, devitalized tissue, and foreign material. This typically occurs within 6-8 hours of injury (urgency depends on wound grade).",
                e: "CLOSED FRACTURE - Immobilization and elevation are standard first-line management for closed fractures. Elevation above heart level reduces venous pressure and edema formation. Open fractures also require immobilization but have additional wound-specific priorities."
            },
            testTakingTip: "The key differentiator between open and closed fracture management is INFECTION RISK. Open = broken skin = contamination = antibiotics + sterile dressing + OR debridement + tetanus. Closed = skin intact = rest, ice, compression, elevation (RICE) + immobilization + outpatient management possible. If the NCLEX describes bone visible through a wound, think open fracture protocol.",
            guideSection: "Section 3 - Fracture Types",
            guideSectionId: "fracture-types"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks why fractures are so painful. Which structure explains this?",
            options: [
                { id: "a", text: "The periosteum, which carries vessels and nerves" },
                { id: "b", text: "The cortical bone, which forms the dense outer shaft" },
                { id: "c", text: "The cancellous bone, which holds the red marrow" },
                { id: "d", text: "The medullary cavity, which stores yellow marrow" }
            ],
            correct: "a",
            rationale: {
                correct: "The periosteum is a dense fibrous membrane over the bone surface carrying both vessels and nerves. That nerve supply is why fractures hurt, and the blood supply is why the periosteum is essential to healing.",
                b: "Cortical bone provides strength and rigidity but does not carry the nerve supply that generates the pain.",
                c: "Cancellous bone absorbs shock and holds red marrow.",
                d: "The medullary cavity stores yellow marrow and is not the source of fracture pain."
            },
            testTakingTip: "Bone is living tissue with a blood supply and a nerve supply, and both show up clinically. The periosteum carries them.",
            guideSection: "Section 3 - Why bone behaves the way it does",
            guideSectionId: "anatomy"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "application",
            stem: "A patient is 5 days after a tibial fracture. Which stage of bone healing is in progress?",
            options: [
                { id: "a", text: "Fibrocartilaginous callus, which is fragile" },
                { id: "b", text: "Hematoma formation with clot across the site" },
                { id: "c", text: "Bony callus, with calcium being laid down" },
                { id: "d", text: "Remodelling, with the bone returning to shape" }
            ],
            correct: "a",
            rationale: {
                correct: "The soft or fibrocartilaginous callus runs from about 3 days to 2 weeks. Fibroblasts and chondroblasts bridge the gap with granulation tissue and cartilage, and that callus is fragile and must be protected from stress.",
                b: "The hematoma stage covers the first 0 to 3 days.",
                c: "The bony callus stage runs from about 2 to 6 weeks, when osteoblasts lay down calcium.",
                d: "Remodelling is the final stage, taking months to years."
            },
            testTakingTip: "Knowing the stage tells you what the patient can safely do. At 5 days the bridge is cartilage, not bone.",
            guideSection: "Section 5 - How it heals",
            guideSectionId: "healing"
        },
        {
            id: 13, type: "single", subtype: "priority", difficulty: "analysis",
            stem: "A patient with a forearm fracture in a cast reports pain that spikes sharply when the fingers are passively stretched. Distal pulses are present. What should the nurse recognise?",
            options: [
                { id: "a", text: "The earliest sign of compartment syndrome" },
                { id: "b", text: "Expected discomfort from immobilisation" },
                { id: "c", text: "A reassuring finding, since pulses are present" },
                { id: "d", text: "A sign that the cast needs to be tightened" }
            ],
            correct: "a",
            rationale: {
                correct: "Pain out of proportion, and pain that spikes on passive stretch, is the earliest of the 5 Ps. Pulselessness is a late sign, so present pulses do not exclude compartment syndrome.",
                b: "Ordinary cast discomfort does not escalate sharply on passive stretching of the digits.",
                c: "Treating present pulses as reassurance is the classic error, because the pulse disappears only once damage is advanced.",
                d: "Tightening a cast raises compartment pressure and would worsen the problem."
            },
            testTakingTip: "Pain first, pulselessness last. If you wait for the pulse to go, you have waited too long.",
            guideSection: "Section 6 - The 5 P's",
            guideSectionId: "assessment"
        },
        {
            id: 14, type: "single", subtype: null, difficulty: "application",
            stem: "A nurse is performing neurovascular checks on a patient with a fresh cast. How should the assessment be carried out?",
            options: [
                { id: "a", text: "Distal to the injury, compared with the other limb" },
                { id: "b", text: "Proximal to the injury, compared with the other limb" },
                { id: "c", text: "Over the cast itself, at the level of the fracture" },
                { id: "d", text: "Distal to the injury, without comparing the limbs" }
            ],
            correct: "a",
            rationale: {
                correct: "Neurovascular assessment is always performed distal to the injury, because that is the tissue at risk, and always compared with the other limb, because the patient's own opposite side is the baseline.",
                b: "Assessing above the injury misses the circulation that the swelling or cast is compromising.",
                c: "Nothing useful can be assessed through the cast material itself.",
                d: "Without a comparison, a subtle difference in colour, warmth or refill is easy to miss."
            },
            testTakingTip: "Always distal, always compared, and hourly in the first 24 hours after injury or casting.",
            guideSection: "Section 6 - The 5 P's",
            guideSectionId: "assessment"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nurse is caring for a patient with a newly applied plaster cast. How should the cast be handled while it dries?",
            options: [
                { id: "a", text: "With the palms of the hands, keeping the limb elevated" },
                { id: "b", text: "With the fingertips, to avoid pressing the surface" },
                { id: "c", text: "With a towel wrapped tightly around the whole cast" },
                { id: "d", text: "Not at all, because the limb must remain undisturbed" }
            ],
            correct: "a",
            rationale: {
                correct: "A plaster cast is still wet for 24 to 48 hours. It is handled with the palms rather than the fingers, because fingertips press indentations into soft plaster that then become pressure points against the skin, and the limb is kept elevated to limit swelling.",
                b: "Fingertips are exactly what create the indentations that cause pressure injuries.",
                c: "Wrapping a drying cast traps heat and slows drying.",
                d: "The limb does need repositioning and elevation; it simply has to be handled correctly."
            },
            testTakingTip: "24 to 48 hours wet for plaster. Palms not fingers, and keep it elevated.",
            guideSection: "Section 6 - The 5 P's",
            guideSectionId: "assessment"
        }
    ]
};
