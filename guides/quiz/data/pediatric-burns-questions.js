/**
 * Pediatric Burns Quiz — Question Data
 * NCLEX-style questions covering burn depth, BSA estimation,
 * Parkland formula, fluid resuscitation, and emergency management.
 */

/* exported pediatricBurnsQuizData */
var pediatricBurnsQuizData = {
    guideName: "Pediatric Burns",
    guideSlug: "pediatric-burns",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 14,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is calculating fluid needs for a 20 kg child with 30% TBSA partial-thickness burns using the Parkland formula. How much total Lactated Ringer's should be administered over the first 24 hours?",
            options: [
                { id: "a", text: "1,200 mL" },
                { id: "b", text: "2,400 mL" },
                { id: "c", text: "4,800 mL" },
                { id: "d", text: "6,000 mL" }
            ],
            correct: "b",
            rationale: {
                correct: "Parkland formula: 4 mL \u00d7 kg \u00d7 %TBSA = 4 \u00d7 20 \u00d7 30 = 2,400 mL of Lactated Ringer's over 24 hours. Half (1,200 mL) in the first 8 hours from time of burn, half (1,200 mL) over the next 16 hours.",
                a: "1,200 mL is the first 8-hour allocation only, not total.",
                c: "4,800 mL is 2\u00d7 the correct volume.",
                d: "6,000 mL is too much."
            },
            testTakingTip: "Parkland: 4 \u00d7 kg \u00d7 %TBSA = total 24-hour LR. Half in first 8 hr.",
            guideSection: "Section 6 \u2014 Parkland & Fluids",
            guideSectionId: "fluids"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 4-year-old is brought to the ED with a scald burn on the chest and arms 90 minutes ago. The parent has been applying cool wet washcloths. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Apply ice directly to the burn" },
                { id: "b", text: "Assess the airway and breathing, and prepare IV access" },
                { id: "c", text: "Give oral fluids immediately" },
                { id: "d", text: "Cover the burn with a dry dressing and send home" }
            ],
            correct: "b",
            rationale: {
                correct: "ABCDE approach: assess the airway first, especially for inhalation injury signs (facial burns, singed nose hair, carbonaceous sputum, stridor). Then establish IV access (two large-bore) for fluid resuscitation. Even a scald without obvious airway involvement requires priority ABC assessment.",
                a: "Ice worsens burns by vasoconstriction and additional tissue damage.",
                c: "Oral fluids are inadequate for significant burn fluid loss.",
                d: "Significant scald requires evaluation for resuscitation needs; don't send home."
            },
            testTakingTip: "Burn priority: Airway first. ABCDE for every burn patient.",
            guideSection: "Section 5 \u2014 Emergency Management",
            guideSectionId: "emergency"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which burn depth is characterized by a leathery, dry appearance, white or brown discoloration, and NO pain in the burned area?",
            options: [
                { id: "a", text: "Superficial (1st degree)" },
                { id: "b", text: "Superficial partial-thickness (2nd, superficial)" },
                { id: "c", text: "Deep partial-thickness (2nd, deep)" },
                { id: "d", text: "Full-thickness (3rd degree)" }
            ],
            correct: "d",
            rationale: {
                correct: "Full-thickness burns destroy all layers of the dermis, including nerve endings \u2014 hence the burn area is PAINLESS. Appearance is dry, leathery, white/brown/black; cap refill absent. Pain in the surrounding tissue is from adjacent partial-thickness injury.",
                a: "Superficial burns are painful; sunburn appearance.",
                b: "Superficial partial-thickness burns are painful with blisters.",
                c: "Deep partial-thickness burns are less painful but not completely painless."
            },
            testTakingTip: "Painless burn = full-thickness until proven otherwise. Nerve endings destroyed.",
            guideSection: "Section 2 \u2014 Burn Depth",
            guideSectionId: "depth"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is using the Rule of Nines to estimate a 2-year-old's burn BSA. The child has burns on the entire head and neck. What percentage TBSA does this represent?",
            options: [
                { id: "a", text: "9%" },
                { id: "b", text: "14%" },
                { id: "c", text: "18%" },
                { id: "d", text: "21%" }
            ],
            correct: "c",
            rationale: {
                correct: "In young children (infants/toddlers), the head and neck account for approximately 18% of TBSA using the pediatric Rule of Nines \u2014 not 9% as in adults. This reflects the proportionally larger head in young children. As the child grows, this percentage decreases toward the adult 9%.",
                a: "9% is the ADULT head BSA.",
                b: "14% is the pediatric LEG BSA.",
                d: "21% is too high."
            },
            testTakingTip: "Pediatric head = 18%. Pediatric leg = 14%. Adult head = 9%, leg = 18%. Classic NCLEX trap.",
            guideSection: "Section 3 \u2014 BSA Estimation",
            guideSectionId: "bsa"
        },
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 10-year-old is being treated for a 25% TBSA burn. The Parkland formula has been started. Which assessment BEST indicates adequate fluid resuscitation?",
            options: [
                { id: "a", text: "Blood pressure of 100/60" },
                { id: "b", text: "Heart rate of 100 bpm" },
                { id: "c", text: "Urine output of 1 mL/kg/hr" },
                { id: "d", text: "Clear lung sounds" }
            ],
            correct: "c",
            rationale: {
                correct: "Urine output is the gold standard endpoint for burn fluid resuscitation. In young children (<30 kg), target is 1\u20132 mL/kg/hr; in older children, 0.5\u20131 mL/kg/hr. A 10-year-old is approaching adult thresholds, and 1 mL/kg/hr is adequate. If UOP is below target, increase fluids; if above, decrease to avoid over-resuscitation and pulmonary edema.",
                a: "BP is a late indicator \u2014 children maintain BP until they decompensate.",
                b: "HR alone doesn't confirm adequate resuscitation.",
                d: "Clear lungs don't indicate volume status."
            },
            testTakingTip: "UOP = the endpoint. 1\u20132 mL/kg/hr in young kids, 0.5\u20131 mL/kg/hr older. Titrate!",
            guideSection: "Section 6 \u2014 Parkland & Fluids",
            guideSectionId: "fluids"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 6-year-old is admitted after a house fire. The child has burns on the face, singed nasal hair, hoarseness, and a dry cough. What is the priority intervention?",
            options: [
                { id: "a", text: "Start Parkland fluid resuscitation immediately" },
                { id: "b", text: "Apply cool compresses to the facial burns" },
                { id: "c", text: "Prepare for early endotracheal intubation" },
                { id: "d", text: "Administer oral corticosteroids for airway swelling" }
            ],
            correct: "c",
            rationale: {
                correct: "Facial burns, singed nasal hair, and hoarseness are red flags for inhalation injury. Airway swelling progresses rapidly and can completely close the airway. Early elective intubation in a controlled setting is FAR safer than emergent intubation after the airway has swollen. Fluid resuscitation follows once the airway is secured.",
                a: "Fluids are important but airway first.",
                b: "Topical cooling addresses the burn but not the airway threat.",
                d: "Oral steroids don't help acute inhalation airway edema and couldn't be safely given if airway is compromised."
            },
            testTakingTip: "Inhalation injury signs = early intubation. The airway WILL swell.",
            guideSection: "Section 5 \u2014 Emergency Management",
            guideSectionId: "emergency"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The 'half in first 8 hours' portion of the Parkland formula is measured from which starting point?",
            options: [
                { id: "a", text: "When the child arrives at the ED" },
                { id: "b", text: "When IV access is obtained" },
                { id: "c", text: "When the burn occurred" },
                { id: "d", text: "When the first physician order is placed" }
            ],
            correct: "c",
            rationale: {
                correct: "The 8-hour clock starts at the TIME OF BURN, not when the child arrives at the ED. If a child arrives 3 hours post-burn, the first 5 hours remaining count as the '8-hour' window \u2014 the child may need accelerated catch-up fluid. This is a commonly tested detail.",
                a: "ED arrival time is often later \u2014 using it under-resuscitates.",
                b: "IV access timing is irrelevant to the formula.",
                d: "Order time is not the starting point."
            },
            testTakingTip: "Parkland 8-hour clock starts at BURN TIME, not ED arrival. Catch up if delayed.",
            guideSection: "Section 6 \u2014 Parkland & Fluids",
            guideSectionId: "fluids"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent calls the poison control line after their toddler ingested drain cleaner. What is the FIRST home intervention the nurse should recommend?",
            options: [
                { id: "a", text: "Induce vomiting with ipecac" },
                { id: "b", text: "Give milk to neutralize the chemical" },
                { id: "c", text: "Call 911 and do not induce vomiting; rinse the mouth with water if not contraindicated" },
                { id: "d", text: "Administer activated charcoal" }
            ],
            correct: "c",
            rationale: {
                correct: "For caustic ingestions (strong acid or alkali like drain cleaner), NEVER induce vomiting \u2014 the chemical causes additional damage coming back up. Do not neutralize with milk (can cause exothermic reaction). Call 911/poison control; rinse the mouth if not at risk of aspiration; go to ED immediately. For dermal contact, copious water irrigation for 20+ minutes.",
                a: "Induced vomiting causes repeat caustic injury to esophagus.",
                b: "Neutralizing can cause exothermic reaction and make damage worse.",
                d: "Activated charcoal doesn't bind caustic chemicals."
            },
            testTakingTip: "Caustic ingestion: NO vomiting, NO neutralization, YES poison control + ED.",
            guideSection: "Section 1 \u2014 Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which burn patient is MOST appropriate for transfer to a regional burn center?",
            options: [
                { id: "a", text: "A 10-year-old with 5% TBSA superficial (1st degree) sunburn on the shoulders" },
                { id: "b", text: "A 4-year-old with 8% TBSA partial-thickness burns on the hands and face" },
                { id: "c", text: "A 15-year-old with a small 2% partial-thickness burn on the forearm" },
                { id: "d", text: "An 8-year-old with a 2% burn on the chest, no complications" }
            ],
            correct: "b",
            rationale: {
                correct: "Burns involving the face, hands, feet, perineum, genitals, or major joints warrant burn center transfer regardless of size because of functional and cosmetic implications. Additionally, 8% in a young child approaches transfer threshold due to smaller body size and higher fluid/infection risk. The hands are also a high-priority location.",
                a: "Superficial burns don't usually require burn center transfer.",
                c: "Small partial-thickness on forearm can be managed locally in an older child.",
                d: "Small uncomplicated chest burn can be managed locally."
            },
            testTakingTip: "Burn center criteria: big BSA, any full-thickness, face/hands/feet/perineum/joints, electrical/chemical, inhalation, circumferential.",
            guideSection: "Section 4 \u2014 Severity & Transfer",
            guideSectionId: "severity"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent asks why their child with a partial-thickness burn is being given Lactated Ringer's instead of Normal Saline. What is the nurse's BEST response?",
            options: [
                { id: "a", text: "'LR and NS are interchangeable for burns.'" },
                { id: "b", text: "'LR is preferred because NS in large volumes can cause acidosis from the chloride load.'" },
                { id: "c", text: "'NS is too expensive for large-volume resuscitation.'" },
                { id: "d", text: "'NS is reserved for cardiac patients only.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Lactated Ringer's is preferred for large-volume burn resuscitation because it more closely resembles physiologic extracellular fluid. Large-volume Normal Saline can cause hyperchloremic metabolic acidosis due to the high chloride content (154 mEq/L vs 109 in LR). LR also contains lactate which is metabolized to bicarbonate, helping buffer acidosis.",
                a: "They are NOT interchangeable for large-volume resuscitation.",
                c: "Cost is not the reason.",
                d: "NS is used in many settings, not just cardiac."
            },
            testTakingTip: "Large-volume burn resuscitation = LR (not NS). Hyperchloremic acidosis from NS.",
            guideSection: "Section 6 \u2014 Parkland & Fluids",
            guideSectionId: "fluids"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A child with a circumferential partial-thickness burn of the left forearm develops increasing pain, diminished pulses, cool fingers, and pallor. What is the priority action?",
            options: [
                { id: "a", text: "Apply a warm compress and reassess in 30 minutes" },
                { id: "b", text: "Elevate the arm above the heart" },
                { id: "c", text: "Notify the surgeon immediately; escharotomy may be needed" },
                { id: "d", text: "Increase the IV fluid rate" }
            ],
            correct: "c",
            rationale: {
                correct: "Circumferential burns can cause compartment-syndrome-like vascular compromise as edema develops under rigid eschar. Classic signs: increasing pain, diminished pulses, pallor, cool extremity. An escharotomy (surgical linear incision through the eschar) is needed urgently to relieve pressure and restore circulation.",
                a: "Warm compress doesn't relieve compartment pressure.",
                b: "Elevation may help mild swelling but not eschar-mediated constriction.",
                d: "Increasing fluids doesn't address the mechanical obstruction from eschar."
            },
            testTakingTip: "Circumferential burn + decreased pulses = escharotomy. Surgical emergency.",
            guideSection: "Section 7 \u2014 Ongoing Care",
            guideSectionId: "ongoing"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which of the following is a contraindication to using silver sulfadiazine (Silvadene) on a burn?",
            options: [
                { id: "a", text: "A healthy 8-year-old with 10% BSA partial-thickness burn" },
                { id: "b", text: "A 2-month-old infant with a burn" },
                { id: "c", text: "An adolescent with no allergies" },
                { id: "d", text: "A teenager with a minor kitchen burn" }
            ],
            correct: "b",
            rationale: {
                correct: "Silver sulfadiazine is contraindicated in infants under 2 months (risk of kernicterus), in patients with G6PD deficiency or sulfa allergy, and generally avoided on the face (may cause cosmetic discoloration). Use bacitracin or mupirocin instead in these cases.",
                a: "Appropriate use.",
                c: "Appropriate use.",
                d: "Appropriate use."
            },
            testTakingTip: "Avoid silver sulfadiazine in infants <2 months, G6PD deficiency, sulfa allergy, and on the face.",
            guideSection: "Section 7 \u2014 Ongoing Care",
            guideSectionId: "ongoing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which nutritional approach is MOST appropriate for a child with a 25% TBSA burn?",
            options: [
                { id: "a", text: "NPO for 7 days then oral diet" },
                { id: "b", text: "Early high-protein enteral feeding within 24\u201348 hours" },
                { id: "c", text: "Low-calorie diet to prevent weight gain" },
                { id: "d", text: "Oral supplements only, no enteral feeding" }
            ],
            correct: "b",
            rationale: {
                correct: "Burns cause a massive hypermetabolic state; caloric needs may be 1.5\u20132\u00d7 baseline. Early enteral feeding within 24\u201348 hours preserves gut integrity, reduces bacterial translocation, supports immune function, and promotes wound healing. High-protein diet supports healing.",
                a: "Prolonged NPO worsens outcomes; burns need aggressive early nutrition.",
                c: "Low-calorie diet is harmful \u2014 burns need MORE calories.",
                d: "Enteral feeding is preferred over oral alone for significant burns."
            },
            testTakingTip: "Burns = hypermetabolic. Feed early, high-protein, enteral preferred.",
            guideSection: "Section 7 \u2014 Ongoing Care",
            guideSectionId: "ongoing"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching parents of a child discharged after a burn. Which instruction is MOST important for ongoing scar management?",
            options: [
                { id: "a", text: "Expose healing skin to direct sunlight to promote healing" },
                { id: "b", text: "Apply pressure garments 23 hours/day for 12\u201324 months and use sun protection" },
                { id: "c", text: "Keep the wound covered with a tight occlusive dressing forever" },
                { id: "d", text: "Avoid moisturizing the area after healing" }
            ],
            correct: "b",
            rationale: {
                correct: "Pressure garments worn 23 hours/day for 12\u201324 months prevent hypertrophic scarring. Healing burn skin is highly photosensitive \u2014 sun exposure causes permanent hyperpigmentation. SPF 30+, hats, and sun-protective clothing are essential for at least a year.",
                a: "Sun exposure causes hyperpigmentation on healing skin.",
                c: "Tight occlusion isn't appropriate; pressure garments are different \u2014 they're specifically designed.",
                d: "Moisturizing is essential to keep healing skin supple."
            },
            testTakingTip: "Scar management: pressure garments + sun protection. Moisturize. Avoid sun for a year+.",
            guideSection: "Section 8 \u2014 Rehabilitation",
            guideSectionId: "rehab"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which finding in a toddler with a scald burn should prompt the nurse to suspect non-accidental trauma (child abuse)?",
            options: [
                { id: "a", text: "A small splash pattern on the chest from a pulled-down cup" },
                { id: "b", text: "Symmetric burns on both legs with a sharp demarcation line at mid-thigh ('stocking' distribution) and spared skin folds" },
                { id: "c", text: "An irregular scald pattern consistent with spilled hot liquid" },
                { id: "d", text: "A burn from chewing an electrical cord" }
            ],
            correct: "b",
            rationale: {
                correct: "Forced immersion burns produce SYMMETRIC, stocking-or-glove distribution with SHARP demarcation lines, often with SPARED skin folds (child held in flexion to keep them in the hot water). This pattern doesn't match accidental scalds, which are irregular and splash-pattern. Mandatory report.",
                a: "Splash pattern from a pulled-down cup is consistent with accidental.",
                c: "Irregular splash pattern suggests accidental spill.",
                d: "Electrical cord burns are often accidental in toddlers exploring."
            },
            testTakingTip: "Abuse-concerning burns: symmetric, stocking/glove, sharp demarcation, spared folds. Mandatory report.",
            guideSection: "Section 1 \u2014 Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 16,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "The nurse is caring for a 3-year-old with a 15% TBSA partial-thickness burn in the first 24 hours. Which finding requires IMMEDIATE intervention?",
            options: [
                { id: "a", text: "Urine output of 20 mL in the past hour (child weighs 15 kg)" },
                { id: "b", text: "Reports of severe pain during dressing changes" },
                { id: "c", text: "Urine output of 5 mL in the past hour" },
                { id: "d", text: "Temperature of 37.8\u00b0C" }
            ],
            correct: "c",
            rationale: {
                correct: "For a 15 kg child, target UOP is 1\u20132 mL/kg/hr, or 15\u201330 mL/hr. An output of 5 mL/hr is critically low \u2014 indicates inadequate fluid resuscitation and impending shock. Increase the fluid rate immediately and notify the provider.",
                a: "20 mL/hr is within the target range for a 15 kg child.",
                b: "Pain during dressing changes is common and manageable with pre-medication.",
                d: "Mild temperature elevation is expected post-burn."
            },
            testTakingTip: "Pediatric burn UOP target: 1\u20132 mL/kg/hr. Below that = under-resuscitated.",
            guideSection: "Section 6 \u2014 Parkland & Fluids",
            guideSectionId: "fluids"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "What is the MOST common cause of death in a pediatric burn patient AFTER the first 48 hours?",
            options: [
                { id: "a", text: "Hypovolemic shock" },
                { id: "b", text: "Infection / sepsis" },
                { id: "c", text: "Respiratory failure from inhalation injury" },
                { id: "d", text: "Renal failure" }
            ],
            correct: "b",
            rationale: {
                correct: "After the first 48 hours (when hypovolemic shock is the biggest killer), INFECTION AND SEPSIS become the primary cause of death. Burns destroy the skin barrier, and the child is hypermetabolic and immunocompromised. Rigorous wound care, surveillance cultures, and early excision of dead tissue are the primary infection-reduction strategies.",
                a: "Hypovolemic shock is the killer in the FIRST 48 hours.",
                c: "Inhalation injury can cause death but is less common than sepsis.",
                d: "Renal failure occurs but sepsis is more common."
            },
            testTakingTip: "Burn mortality: shock first 48 hr, then INFECTION. Burn units vigilantly monitor for sepsis.",
            guideSection: "Section 7 \u2014 Ongoing Care",
            guideSectionId: "ongoing"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which home safety education is MOST important for preventing pediatric scald burns?",
            options: [
                { id: "a", text: "Keep matches and lighters locked away" },
                { id: "b", text: "Set water heater to no more than 120\u00b0F (49\u00b0C) and always test bath water" },
                { id: "c", text: "Install outlet covers in every room" },
                { id: "d", text: "Use sunscreen on children when outdoors" }
            ],
            correct: "b",
            rationale: {
                correct: "Scalds (from bath water, spilled hot liquids) are the #1 cause of pediatric burns in children under 5. Setting the water heater to \u2264120\u00b0F prevents scalding in the bath; testing bath water before putting the child in is an added safeguard. All the other safety measures are important for OTHER burn types, but scalds are the highest-frequency pediatric burn.",
                a: "Important for flame burns but scalds are more common.",
                c: "Important for electrical burns but scalds are more common.",
                d: "Sunscreen prevents sunburn but scalds are the #1 peds burn."
            },
            testTakingTip: "Scalds = #1 pediatric burn. Prevention: water heater <120\u00b0F and test the bath.",
            guideSection: "Section 9 \u2014 Family Education",
            guideSectionId: "family"
        }
    ]
};
