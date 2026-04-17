/**
 * Pediatric Fractures & Immobility Quiz — Question Data
 * NCLEX-style questions covering pediatric fracture types,
 * neurovascular assessment, cast/traction care, and immobility.
 */

/* exported pediatricFracturesImmobilityQuizData */
var pediatricFracturesImmobilityQuizData = {
    guideName: "Pediatric Fractures & Immobility",
    guideSlug: "pediatric-fractures-immobility",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which fracture type is characterized by an incomplete break where one side of the bone bends while the other breaks \u2014 a pattern unique to pediatric bones?",
            options: [
                { id: "a", text: "Torus (buckle) fracture" },
                { id: "b", text: "Greenstick fracture" },
                { id: "c", text: "Spiral fracture" },
                { id: "d", text: "Comminuted fracture" }
            ],
            correct: "b",
            rationale: {
                correct: "Greenstick fractures are incomplete fractures where one cortex breaks and the other side bends (like bending a green stick). This pattern reflects the flexibility of pediatric bones and is the most common pediatric fracture type.",
                a: "Torus (buckle) fractures involve bone compression/buckling without a break \u2014 common but different mechanism.",
                c: "Spiral fractures are caused by twisting forces and raise abuse concern in young non-ambulatory children.",
                d: "Comminuted fractures have multiple bone fragments \u2014 not unique to pediatrics."
            },
            testTakingTip: "Greenstick = bends on one side, breaks on the other. Unique to pediatric bones.",
            guideSection: "Section 1 \u2014 Pediatric Basics",
            guideSectionId: "basics"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 10-year-old had a forearm cast applied 4 hours ago after a closed reduction. He is now reporting severe unrelenting pain that is not relieved by morphine. Passive extension of the fingers causes severe pain. What is the nurse's priority action?",
            options: [
                { id: "a", text: "Reassure the child and give a second dose of morphine" },
                { id: "b", text: "Elevate the arm and apply more ice to reduce swelling" },
                { id: "c", text: "Notify the surgeon immediately; the cast needs to be bivalved or removed" },
                { id: "d", text: "Document the findings and wait 30 minutes before reassessing" }
            ],
            correct: "c",
            rationale: {
                correct: "Severe pain out of proportion to injury, pain unrelieved by opioids, and pain with passive stretch are classic signs of compartment syndrome. The cast must be bivalved or removed to relieve pressure; fasciotomy may be needed if conservative measures fail. This is an emergency.",
                a: "Adding more opioid masks the problem; the cast needs to be addressed.",
                b: "Elevation and ice help mild swelling but are inadequate for compartment syndrome.",
                d: "Waiting to reassess wastes the 4\u20138 hour window before irreversible muscle/nerve damage."
            },
            testTakingTip: "Pain out of proportion + unrelieved by opioids + worse with passive stretch = compartment syndrome. Time is tissue.",
            guideSection: "Section 2 \u2014 Neurovascular & Compartment Syndrome",
            guideSectionId: "neurovascular"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which component of the 6 Ps of neurovascular assessment is typically the EARLIEST and most sensitive sign of compartment syndrome?",
            options: [
                { id: "a", text: "Pulselessness" },
                { id: "b", text: "Pain out of proportion" },
                { id: "c", text: "Pallor" },
                { id: "d", text: "Paralysis" }
            ],
            correct: "b",
            rationale: {
                correct: "Pain out of proportion to injury, worsening over time, and unrelieved by analgesics is the earliest and most sensitive sign of compartment syndrome. The other Ps (pulselessness, pallor, paralysis) are late and ominous \u2014 by the time pulses are absent, permanent damage has usually occurred.",
                a: "Pulselessness is a LATE sign \u2014 after irreversible damage has begun.",
                c: "Pallor develops as circulation compromises \u2014 later than pain.",
                d: "Paralysis is a very late sign indicating extensive nerve damage."
            },
            testTakingTip: "PAIN is the earliest P. Don't wait for pulselessness \u2014 that's the damage already done.",
            guideSection: "Section 2 \u2014 Neurovascular & Compartment Syndrome",
            guideSectionId: "neurovascular"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a 14-month-old in Bryant's traction for a femur fracture. Which finding indicates the traction is set up correctly?",
            options: [
                { id: "a", text: "The affected leg is elevated 90 degrees; the other leg rests flat on the bed" },
                { id: "b", text: "Both legs are elevated 90 degrees perpendicular to the bed; the buttocks are slightly off the mattress" },
                { id: "c", text: "Both legs are flat on the bed with weights at the head of the bed" },
                { id: "d", text: "The child is prone with both legs straight" }
            ],
            correct: "b",
            rationale: {
                correct: "Bryant's traction (infants <2 years or <30 lb) involves BOTH legs elevated 90 degrees perpendicular to the bed, with the buttocks slightly off the mattress. The child's own body weight provides counter-traction.",
                a: "Only elevating the affected leg doesn't provide proper counter-traction in an infant.",
                c: "Flat legs with weights at the head is not the Bryant's setup.",
                d: "Prone position is never used for traction; buttocks off the bed means supine with legs up."
            },
            testTakingTip: "Bryant's = infant traction, BOTH legs 90\u00b0, buttocks slightly off the bed. Classic NCLEX detail.",
            guideSection: "Section 3 \u2014 Casts & Traction",
            guideSectionId: "treatment"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a 6-year-old with a new fiberglass arm cast calls the clinic. The child complains of severe itching inside the cast. What is the nurse's best advice?",
            options: [
                { id: "a", text: "Use a coat hanger to scratch gently inside the cast" },
                { id: "b", text: "Sprinkle baby powder down the cast opening" },
                { id: "c", text: "Direct cool air from a hair dryer into the cast opening" },
                { id: "d", text: "Remove the cast temporarily to scratch the itch" }
            ],
            correct: "c",
            rationale: {
                correct: "A cool hair dryer directed into the cast opening is a safe way to relieve itching. Nothing should ever be placed inside a cast \u2014 scratching tools break the skin, get stuck, and cause infection. Heat, baby powder, and lotions should also be avoided.",
                a: "Objects in the cast cause skin breakdown and can get stuck.",
                b: "Powder clumps and causes skin irritation.",
                d: "The cast should never be removed at home."
            },
            testTakingTip: "Itchy cast: cool air only. Never hot air, never objects, never powder. Teach this at every cast discharge.",
            guideSection: "Section 3 \u2014 Casts & Traction",
            guideSectionId: "treatment"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which Salter-Harris fracture type is MOST common?",
            options: [
                { id: "a", text: "Type I" },
                { id: "b", text: "Type II" },
                { id: "c", text: "Type III" },
                { id: "d", text: "Type V" }
            ],
            correct: "b",
            rationale: {
                correct: "Salter-Harris type II fractures go through the physis and into the metaphysis and are the most common growth plate fracture. Higher-numbered types (III\u2013V) are more severe and carry higher risk of growth arrest.",
                a: "Type I goes through the physis only \u2014 less common than type II.",
                c: "Type III goes through the physis and into the epiphysis (joint) \u2014 less common.",
                d: "Type V is a crush injury of the physis \u2014 least common but most severe."
            },
            testTakingTip: "Salter-Harris II = most common. Higher types = higher growth arrest risk.",
            guideSection: "Section 1 \u2014 Pediatric Basics",
            guideSectionId: "basics"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A nurse is caring for a toddler in Bryant's traction. The parent asks if they can lift the weights for a moment so the child can be repositioned. What is the nurse's best response?",
            options: [
                { id: "a", text: "'That's fine, just be careful.'" },
                { id: "b", text: "'The weights must hang freely at all times \u2014 never lift or remove them.'" },
                { id: "c", text: "'You can remove them for 5 minutes at a time.'" },
                { id: "d", text: "'The weights don't really matter for alignment.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Traction weights must hang freely at all times to maintain continuous pulling force. Lifting or removing the weights (even briefly) disrupts alignment and can cause pain or misalignment of the fracture.",
                a: "Any interruption of the traction force can disrupt alignment.",
                c: "Removing weights for 5 minutes is also inappropriate.",
                d: "Weights are critical for maintaining alignment and reducing pain."
            },
            testTakingTip: "Traction weights: ALWAYS hang freely. Never lift, never rest on floor, never remove. Classic NCLEX safety item.",
            guideSection: "Section 3 \u2014 Casts & Traction",
            guideSectionId: "treatment"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 6-month-old is brought in with a left femur fracture. The father states the baby 'rolled off the couch.' The child is not yet rolling or ambulating independently. What is the nurse's priority action?",
            options: [
                { id: "a", text: "Accept the history and proceed with routine fracture care" },
                { id: "b", text: "Document objectively, request a skeletal survey, notify the provider and child protection team" },
                { id: "c", text: "Ask the father to describe the injury in more detail and then decide" },
                { id: "d", text: "Send the family home with pain medications and follow-up" }
            ],
            correct: "b",
            rationale: {
                correct: "A femur fracture in a non-ambulatory infant is highly concerning for non-accidental trauma. The reported mechanism doesn't fit the severity of injury. A skeletal survey, child protection team consult, and mandatory report are appropriate. The nurse is legally protected when reporting in good faith.",
                a: "Ignoring the inconsistency between injury and history is dangerous.",
                c: "Interrogating the parent is not the nurse's role; documenting objectively and reporting is.",
                d: "Sending the child home without a workup puts the child at further risk."
            },
            testTakingTip: "Femur fracture in non-ambulatory infant = abuse workup. Mandatory report in good faith is protected.",
            guideSection: "Section 5 \u2014 Abuse Concerns",
            guideSectionId: "abuse"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is caring for a 4-year-old in a long-leg cast for 6 weeks. Which complication of prolonged immobility is MOST concerning in pediatric patients?",
            options: [
                { id: "a", text: "Permanent hypertension" },
                { id: "b", text: "Disuse osteoporosis leading to fractures from minor movements" },
                { id: "c", text: "Chronic kidney disease" },
                { id: "d", text: "Type 1 diabetes" }
            ],
            correct: "b",
            rationale: {
                correct: "Prolonged immobility causes bone demineralization in pediatric patients, leading to disuse osteoporosis. Bones become fragile enough to fracture from minor stresses (turning in bed, transfers). This is why careful handling and active/passive ROM are nursing priorities in immobilized children.",
                a: "Hypertension is not a typical immobility complication.",
                c: "CKD is unrelated to simple immobility.",
                d: "T1DM is autoimmune, not related to immobility."
            },
            testTakingTip: "Disuse osteoporosis = immobilized pediatric bone = can fracture from trivial handling. Careful positioning!",
            guideSection: "Section 4 \u2014 Immobility Complications",
            guideSectionId: "immobility"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is applying a fresh plaster cast to a 7-year-old. Which technique is MOST important during cast application?",
            options: [
                { id: "a", text: "Handle the wet cast with fingertips for better control" },
                { id: "b", text: "Handle the wet cast with palms of the hands to prevent pressure points" },
                { id: "c", text: "Cover the wet cast with a blanket to speed drying" },
                { id: "d", text: "Apply the cast tightly to prevent slipping" }
            ],
            correct: "b",
            rationale: {
                correct: "A wet plaster cast should be handled with palms \u2014 never fingertips. Fingertips leave indentations that create pressure points against the child's skin, causing skin breakdown. Palms distribute pressure evenly across the cast surface.",
                a: "Fingertips cause indentations and pressure injuries.",
                c: "Covering the cast with a blanket traps heat and moisture, slowing drying.",
                d: "Applying a cast too tightly risks compartment syndrome."
            },
            testTakingTip: "Wet plaster cast = handle with palms, not fingers. NCLEX classic.",
            guideSection: "Section 3 \u2014 Casts & Traction",
            guideSectionId: "treatment"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "The nurse is assessing a 3-year-old in a newly applied long-leg cast. Which finding is the EARLIEST sign of neurovascular compromise?",
            options: [
                { id: "a", text: "Weak or absent pedal pulses" },
                { id: "b", text: "Toes that are cold and blue" },
                { id: "c", text: "Reports of tingling in the toes" },
                { id: "d", text: "Inability to move the toes" }
            ],
            correct: "c",
            rationale: {
                correct: "Paresthesia (tingling, numbness) is an early sign of nerve compression and precedes pallor, pulselessness, and paralysis. The cast should be evaluated and, if needed, bivalved before late signs develop.",
                a: "Pulselessness is a late sign.",
                b: "Cold, blue toes indicate significant circulatory compromise \u2014 later than paresthesia.",
                d: "Paralysis is a late sign indicating severe nerve damage."
            },
            testTakingTip: "Order of neurovascular compromise in casts: paresthesia (early) \u2192 pallor \u2192 pulselessness \u2192 paralysis (late).",
            guideSection: "Section 2 \u2014 Neurovascular & Compartment Syndrome",
            guideSectionId: "neurovascular"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which of the following is NOT a typical indication for using a splint rather than a full cast immediately after injury?",
            options: [
                { id: "a", text: "Expected swelling" },
                { id: "b", text: "Stable fracture requiring definitive immobilization" },
                { id: "c", text: "Recent reduction with monitoring needed" },
                { id: "d", text: "Allows accommodation for additional swelling" }
            ],
            correct: "b",
            rationale: {
                correct: "Splints are used when swelling is expected or monitoring is needed; they allow for expansion and are easier to remove. Stable fractures requiring definitive immobilization are better served by a full cast \u2014 splints are less stable.",
                a: "Splints accommodate swelling \u2014 correct indication.",
                c: "Splints are appropriate immediately after reduction when swelling may worsen.",
                d: "Accommodating swelling is a core reason for splints."
            },
            testTakingTip: "Splint = swelling expected. Cast = definitive stability. Often splint first, then cast at follow-up.",
            guideSection: "Section 3 \u2014 Casts & Traction",
            guideSectionId: "treatment"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is discharging a family after a child's cast application. Which statement by the parent indicates understanding?",
            options: [
                { id: "a", text: "'If the cast gets wet, I'll dry it with a hair dryer on high heat.'" },
                { id: "b", text: "'I'll let my son use a pencil to scratch inside the cast.'" },
                { id: "c", text: "'I'll return to the ED if my son's fingers turn blue or if he has severe unrelenting pain.'" },
                { id: "d", text: "'I'll give him a full bath with the cast as long as I dry it afterward.'" }
            ],
            correct: "c",
            rationale: {
                correct: "Parents should return to the ED for signs of neurovascular compromise (blue fingers, severe pain, numbness) or cast problems (foul odor, drainage, fever). This is the correct safety teaching.",
                a: "High heat can burn skin and damage the cast; cool air is used for itching.",
                b: "Nothing should go inside the cast \u2014 classic mistake.",
                d: "The cast must not get wet; cover with plastic for bathing."
            },
            testTakingTip: "Signs to return: blue, cold, severely painful, numb, foul smell, fever. Teach all five.",
            guideSection: "Section 6 \u2014 Family Education",
            guideSectionId: "family"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A toddler is admitted with a supracondylar humerus fracture after a playground fall. The nurse understands that this fracture is concerning because of the risk of damage to which structure?",
            options: [
                { id: "a", text: "Ulnar nerve only" },
                { id: "b", text: "Brachial artery and median/radial nerves" },
                { id: "c", text: "Sciatic nerve" },
                { id: "d", text: "Spinal cord" }
            ],
            correct: "b",
            rationale: {
                correct: "Supracondylar humerus fractures have a high risk of damaging the brachial artery and the median or radial nerves because these structures pass directly at the fracture site. This is why neurovascular checks are especially critical after supracondylar fractures.",
                a: "Ulnar nerve is usually spared; median/radial are more at risk.",
                c: "Sciatic is in the leg \u2014 unrelated.",
                d: "Spinal cord injury is a separate concern, not associated with supracondylar fracture."
            },
            testTakingTip: "Supracondylar humerus fracture = brachial artery + median/radial nerve risk. Neurovascular check is critical.",
            guideSection: "Section 1 \u2014 Pediatric Basics",
            guideSectionId: "basics"
        }
    ]
};
