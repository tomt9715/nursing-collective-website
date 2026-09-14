/**
 * Patient Safety Quiz - Question Data
 * Questions covering patient identification, fall prevention and post-fall
 * response, restraint rules and monitoring, medication safety, fire and
 * seizure response, error reporting and age-specific safety teaching.
 */

/* exported patientSafetyQuizData */
var patientSafetyQuizData = {
    guideName: "Patient Safety",
    guideSlug: "patient-safety",
    category: "Fundamentals",
    categoryColor: "#2E86AB",
    estimatedMinutes: 16,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse enters a room and finds a patient lying on the floor beside the bed. The patient is awake and says, \"Just help me up, I am fine.\" What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Assist the patient back to bed and then take vital signs" },
                { id: "b", text: "Assess level of consciousness, pain and injury before moving the patient" },
                { id: "c", text: "Complete an incident report while the details are fresh" },
                { id: "d", text: "Call the family to report that a fall occurred" }
            ],
            correct: "b",
            rationale: {
                correct: "Assessment comes before movement. Lifting a patient with an undiagnosed fracture, head injury or spinal injury can convert a minor fall into a major one.",
                a: "Moving first is the reflex and it is the error. A hip fracture or a head injury is not visible from across the room.",
                c: "The report is completed after the patient has been assessed, treated and the provider notified.",
                d: "Notifying the family matters but it comes after assessment and provider notification."
            },
            testTakingTip: "Assess them where they landed. Every option that starts with lifting is wrong.",
            guideSection: "Section 04: Falls, before and after",
            guideSectionId: "falls"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is preparing to administer a medication. Which pair of identifiers is acceptable?",
            options: [
                { id: "a", text: "Room number and bed letter" },
                { id: "b", text: "The name on the whiteboard and the diagnosis" },
                { id: "c", text: "Full name stated by the patient and date of birth" },
                { id: "d", text: "Recognising the patient from the previous shift and the room number" }
            ],
            correct: "c",
            rationale: {
                correct: "Identifiers must belong to the person, not the location. Having the patient state their full name and date of birth, then checking the band, meets the standard.",
                a: "Room and bed are locations. Patients are moved, and signs are not always updated.",
                b: "The whiteboard is not a verified identifier, and a diagnosis is not unique to a patient.",
                d: "Recognition is unreliable and the room number is never acceptable."
            },
            testTakingTip: "Ask the patient to state it. Never ask a leading question a confused patient will agree with.",
            guideSection: "Section 03: Right patient, every time",
            guideSectionId: "identification"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A confused patient keeps pulling at the nasogastric tube. Which action should the nurse take FIRST?",
            options: [
                { id: "a", text: "Apply soft wrist restraints and obtain an order afterward" },
                { id: "b", text: "Assess for pain, a full bladder, hypoxia and other causes of the agitation" },
                { id: "c", text: "Raise all four side rails so the patient cannot reach the tube" },
                { id: "d", text: "Request an as-needed order for restraints for the night shift" }
            ],
            correct: "b",
            rationale: {
                correct: "Agitation usually has a reversible cause. Pain, a distended bladder, hypoxia, low glucose, infection and withdrawal all present as pulling at lines, and treating the cause removes the behaviour.",
                a: "Restraint is a last resort after less restrictive measures have been tried and documented.",
                c: "All four rails up is itself a restraint, and patients climb over rails and fall further.",
                d: "An as-needed restraint order is never valid. Each episode needs its own assessment and order."
            },
            testTakingTip: "Look for the least restrictive option nobody has tried yet.",
            guideSection: "Section 05: Restraints, and everything you try first",
            guideSectionId: "restraints"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "An adult patient is placed in restraints for violent behaviour. How often must the nurse assess this patient, and how often must the order be renewed?",
            options: [
                { id: "a", text: "Assess every 30 minutes, renew every 8 hours" },
                { id: "b", text: "Assess every 15 minutes, renew every 4 hours" },
                { id: "c", text: "Assess every hour, renew every 24 hours" },
                { id: "d", text: "Assess every 2 hours, renew once per shift" }
            ],
            correct: "b",
            rationale: {
                correct: "For violent or self-destructive behaviour the patient is assessed every 15 minutes, and the order for an adult is renewed every 4 hours. Ages 9 to 17 renew every 2 hours and children under 9 every hour.",
                a: "Both intervals are too long and neither matches the standard.",
                c: "A 24-hour restraint order is never permitted for violent behaviour.",
                d: "Once per shift is not a renewal interval, and 2-hourly assessment is the release and care interval, not the monitoring interval."
            },
            testTakingTip: "Four, two and one hours by age. Checks every 15 minutes, release every 2 hours.",
            guideSection: "Section 05: Restraints, and everything you try first",
            guideSectionId: "restraints"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse receives an order that reads \"insulin 6U subcutaneously now.\" What should the nurse do?",
            options: [
                { id: "a", text: "Administer 6 units of insulin as written" },
                { id: "b", text: "Ask another nurse how the prescriber usually writes insulin orders" },
                { id: "c", text: "Contact the prescriber to have the order rewritten with units spelled out" },
                { id: "d", text: "Give the dose and document the abbreviation concern later" }
            ],
            correct: "c",
            rationale: {
                correct: "The abbreviation U is on the do-not-use list because it is misread as a zero or a four, which turns 6 units into 60 or 64. The order is clarified and rewritten before anything is given.",
                a: "Giving a dose from an unsafe abbreviation is exactly the error the rule exists to prevent.",
                b: "Another nurse's guess about intent is not clarification, and it does not make the order safe.",
                d: "Nothing is administered from an ambiguous order, and documenting afterwards does not undo harm."
            },
            testTakingTip: "Clarify, never interpret. Any option that gives the drug is wrong.",
            guideSection: "Section 06: Medication safety",
            guideSectionId: "medication-safety"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse discovers smoke coming from a linen cart in a patient room. What is the nurse's first action?",
            options: [
                { id: "a", text: "Pull the nearest fire alarm" },
                { id: "b", text: "Close the door to contain the smoke" },
                { id: "c", text: "Move the patient out of the room" },
                { id: "d", text: "Obtain the extinguisher and aim at the base of the smoke" }
            ],
            correct: "c",
            rationale: {
                correct: "RACE begins with rescue. Anyone in immediate danger is moved first, and only then does the alarm, containment and extinguishing follow.",
                a: "The alarm is the second step. A patient in the room with the fire cannot wait for it.",
                b: "Containment comes after people are out of the room.",
                d: "Extinguishing is last, and it is only attempted for a small contained fire."
            },
            testTakingTip: "Rescue, alarm, contain, extinguish. People come before everything.",
            guideSection: "Section 07: Fire, oxygen and the room itself",
            guideSectionId: "environment"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient begins having a generalized tonic-clonic seizure in bed. Which action should the nurse take?",
            options: [
                { id: "a", text: "Insert a padded tongue blade to protect the airway" },
                { id: "b", text: "Hold the arms and legs still to prevent injury" },
                { id: "c", text: "Turn the patient to the side and note the time the seizure began" },
                { id: "d", text: "Leave the room to get suction equipment" }
            ],
            correct: "c",
            rationale: {
                correct: "Side-lying protects the airway by letting secretions drain, and timing the seizure guides treatment decisions. Staying with the patient and protecting the head are the priorities.",
                a: "Nothing goes in the mouth during a seizure. It causes dental and airway injury.",
                b: "Restraining the movements causes fractures and soft tissue injury without stopping the seizure.",
                d: "The nurse stays with the patient and calls for help rather than leaving."
            },
            testTakingTip: "Never restrain the limbs, never put anything in the mouth.",
            guideSection: "Section 07: Fire, oxygen and the room itself",
            guideSectionId: "environment"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse administers 10 units of insulin instead of the ordered 4 units. After assessing the patient and notifying the provider, what should the nurse document in the medical record?",
            options: [
                { id: "a", text: "That an incident report was completed and filed with risk management" },
                { id: "b", text: "The dose given, assessment findings, provider notification and patient response" },
                { id: "c", text: "An explanation of how the error occurred and who was at fault" },
                { id: "d", text: "Nothing, since the separate incident report covers the event" }
            ],
            correct: "b",
            rationale: {
                correct: "The chart is a clinical record of what happened to the patient. It states the dose given, what was assessed, who was notified and how the patient responded.",
                a: "Referencing the incident report in the chart pulls an internal quality document into the legal record.",
                c: "Blame and speculation do not belong in the chart. Cause analysis happens in the internal review.",
                d: "Everything that happened to the patient must appear in the chart, regardless of the report."
            },
            testTakingTip: "Chart the facts about the patient. The chart never mentions the incident report.",
            guideSection: "Section 08: When something goes wrong",
            guideSectionId: "errors"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for an 84-year-old patient admitted with delirium who has already fallen once at home. Which intervention is most effective for preventing another fall?",
            options: [
                { id: "a", text: "Teach the patient to press the call light before getting up" },
                { id: "b", text: "Raise all four side rails at night" },
                { id: "c", text: "Perform purposeful hourly rounding with scheduled toileting" },
                { id: "d", text: "Place a sign above the bed identifying the patient as a fall risk" }
            ],
            correct: "c",
            rationale: {
                correct: "Hourly rounding that addresses pain, position, toileting and possessions removes the reasons a confused patient gets up alone, and scheduled toileting prevents the unaccompanied race to the bathroom.",
                a: "A delirious patient will not remember the instruction, so teaching alone is not a fall intervention.",
                b: "All four rails is a restraint, and patients climb over them and fall from a greater height.",
                d: "Signage alerts staff but by itself it changes nothing about why the patient gets up."
            },
            testTakingTip: "Doing the safe thing beats telling a confused patient to do it.",
            guideSection: "Section 04: Falls, before and after",
            guideSectionId: "falls"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            keepAcronyms: ["QOD", "QD", "MS", "MSO4"],
            stem: "Which medication order is written safely?",
            options: [
                { id: "a", text: "Digoxin 0.25 mg by mouth daily" },
                { id: "b", text: "Levothyroxine 1.0 mg by mouth daily" },
                { id: "c", text: "Warfarin 5 mg by mouth QOD" },
                { id: "d", text: "Morphine sulfate written as MS 2 mg IV every 4 hours" }
            ],
            correct: "a",
            rationale: {
                correct: "A leading zero before a decimal point is required, so 0.25 mg is written correctly and cannot be misread as 25 mg.",
                b: "A trailing zero is prohibited. 1.0 mg is misread as 10 mg if the decimal point is faint.",
                c: "QOD, meant as every other day, is on the do-not-use list because it is confused with QD, meant as daily. Write every other day.",
                d: "MS and MSO4, meant as morphine sulfate, are confused with magnesium sulfate. The full drug name is required."
            },
            testTakingTip: "Always a leading zero, never a trailing one.",
            guideSection: "Section 06: Medication safety",
            guideSectionId: "medication-safety"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing to hang a heparin infusion. Which action reflects correct high-alert medication practice?",
            options: [
                { id: "a", text: "Tell the second nurse the calculated rate and ask them to confirm it" },
                { id: "b", text: "Have a second nurse independently calculate the dose and verify the pump settings" },
                { id: "c", text: "Have the charge nurse sign the record after the infusion is started" },
                { id: "d", text: "Verify the order against the pump alone, since the pharmacy already checked it" }
            ],
            correct: "b",
            rationale: {
                correct: "An independent double check means the second nurse works the calculation and checks the settings without being told the first nurse's answer, so the same error cannot be repeated by agreement.",
                a: "Telling the second nurse the answer first turns the check into confirmation bias.",
                c: "Signing afterward does not prevent the error, and the check must happen before the infusion runs.",
                d: "Pharmacy verification does not replace the bedside independent double check for a high-alert drug."
            },
            testTakingTip: "Independent means the second nurse does not hear your answer first.",
            guideSection: "Section 06: Medication safety",
            guideSectionId: "medication-safety"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching the parents of a 9-month-old about home safety. Which statement indicates that teaching was effective?",
            options: [
                { id: "a", text: "\"We turned the water heater down to 120 degrees.\"" },
                { id: "b", text: "\"We will turn her car seat forward-facing now that she can sit up.\"" },
                { id: "c", text: "\"We keep a soft bumper and a blanket in the crib so she is comfortable.\"" },
                { id: "d", text: "\"We keep the cleaning supplies in the cabinet under the sink.\"" }
            ],
            correct: "a",
            rationale: {
                correct: "A water heater set no higher than 120 degrees Fahrenheit prevents scald burns, which are a leading cause of injury in this age group.",
                b: "Car seats stay rear-facing until at least age 2, regardless of sitting ability.",
                c: "Infants sleep alone on a firm surface with nothing else in the crib.",
                d: "A crawling infant reaches under-sink cabinets. Cleaning products are stored locked and high."
            },
            testTakingTip: "Teach to the next milestone. What the child can newly do is what will hurt them.",
            guideSection: "Section 09: Safety by age",
            guideSectionId: "populations"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is scheduled for a right knee arthroscopy. During the time out, the nurse notices the consent form says left knee. What should the nurse do?",
            options: [
                { id: "a", text: "Proceed, since the surgeon has already marked the correct site" },
                { id: "b", text: "Stop the procedure and have the discrepancy resolved before anything begins" },
                { id: "c", text: "Correct the consent form and continue with the time out" },
                { id: "d", text: "Document the discrepancy and address it after the procedure" }
            ],
            correct: "b",
            rationale: {
                correct: "Any team member can stop a procedure during the time out, and a discrepancy between consent, marking and the stated procedure must be resolved before the procedure starts.",
                a: "A site mark does not override a conflicting consent. The conflict itself is the problem.",
                c: "Nurses do not alter a consent form to remove a discrepancy. The patient and the surgeon resolve it.",
                d: "Documenting a wrong-site risk and proceeding defeats the purpose of the time out."
            },
            testTakingTip: "The time out exists so anyone in the room can stop everything. Use it.",
            guideSection: "Section 03: Right patient, every time",
            guideSectionId: "identification"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient using home oxygen asks about safety. Which statement requires further teaching?",
            options: [
                { id: "a", text: "\"I will put a no smoking sign on the front door.\"" },
                { id: "b", text: "\"I will keep the tank upright and secured away from the heater.\"" },
                { id: "c", text: "\"I can use my gas stove as long as the tubing stays behind me.\"" },
                { id: "d", text: "\"I will use a water-based lubricant on my lips instead of petroleum jelly.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "Oxygen makes any open flame burn faster and hotter. Gas stoves, candles and space heaters are avoided entirely, not managed by tubing position.",
                a: "Signage warning visitors not to smoke is correct teaching.",
                b: "Cylinders are stored upright, secured, and away from heat sources.",
                d: "Petroleum-based products around the face are avoided, so a water-based product is correct."
            },
            testTakingTip: "Oxygen does not burn. It makes everything else burn faster.",
            guideSection: "Section 07: Fire, oxygen and the room itself",
            guideSectionId: "environment"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A near miss occurs when a nurse catches a wrong-dose order before it reaches the patient. What is the appropriate action?",
            options: [
                { id: "a", text: "Take no further action, since the patient was not harmed" },
                { id: "b", text: "Report it, because it identifies a system problem before someone is hurt" },
                { id: "c", text: "Document it in the patient's chart as a near miss" },
                { id: "d", text: "Report it only if the same prescriber makes the error again" }
            ],
            correct: "b",
            rationale: {
                correct: "A near miss is free information about a system that nearly failed. Reporting it allows the flaw to be fixed before it reaches a patient.",
                a: "Not reporting leaves the system flaw in place for the next nurse who does not catch it.",
                c: "Nothing happened to this patient, so nothing goes in this patient's clinical record.",
                d: "Waiting for a repeat means waiting for the version that reaches a patient."
            },
            testTakingTip: "Near misses are reported. That is how systems get fixed rather than people blamed.",
            guideSection: "Section 08: When something goes wrong",
            guideSectionId: "errors"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse applies soft wrist restraints to a patient with a valid order. Which action indicates correct technique?",
            options: [
                { id: "a", text: "Securing the ties to the side rails so they move with the rail" },
                { id: "b", text: "Tying with a tight knot that must be cut with scissors to release" },
                { id: "c", text: "Tying to the bed frame with a quick-release knot, leaving room for two fingers" },
                { id: "d", text: "Applying the restraints tightly enough that the wrists cannot rotate" }
            ],
            correct: "c",
            rationale: {
                correct: "Restraints are tied to the movable bed frame with a quick-release knot so they can be removed immediately, and two fingers should slide underneath to confirm circulation is not compromised.",
                a: "Tying to a side rail injures the patient when the rail is lowered.",
                b: "Anything requiring scissors delays release in an emergency such as a fire or vomiting.",
                d: "A restraint tight enough to stop rotation compromises circulation and skin integrity."
            },
            testTakingTip: "Bed frame, quick-release knot, two fingers underneath.",
            guideSection: "Section 05: Restraints, and everything you try first",
            guideSectionId: "restraints"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is discharging an 80-year-old patient who lives alone. Which teaching point most directly reduces the risk of a fall at home?",
            options: [
                { id: "a", text: "\"Keep your bedroom door closed at night.\"" },
                { id: "b", text: "\"Remove the throw rugs and add a light between the bed and the bathroom.\"" },
                { id: "c", text: "\"Try to limit fluids in the evening so you do not need the bathroom.\"" },
                { id: "d", text: "\"Wear socks around the house so the floors stay clean.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Most falls happen at home, and the night-time trip to the bathroom is the classic scenario. Removing loose rugs and lighting the path addresses both the obstacle and the visibility.",
                a: "A closed door does nothing for fall risk and delays help if the patient falls.",
                c: "Fluid restriction risks dehydration, orthostatic hypotension and confusion, all of which increase falls.",
                d: "Socks slide on hard floors. Non-skid footwear is what is recommended."
            },
            testTakingTip: "For older adults, look at the medication list and the path to the bathroom.",
            guideSection: "Section 09: Safety by age",
            guideSectionId: "populations"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is caring for four patients. Which situation requires the nurse's attention FIRST?",
            options: [
                { id: "a", text: "A patient in wrist restraints whose fingers are cool and dusky" },
                { id: "b", text: "A patient asking for a pain medication that is due now" },
                { id: "c", text: "A patient whose fall risk armband has fallen off" },
                { id: "d", text: "A patient requesting help completing a meal tray card" }
            ],
            correct: "a",
            rationale: {
                correct: "Cool, dusky fingers distal to a restraint indicate compromised circulation. That is an immediate physical harm occurring right now, and the restraint must be released and reassessed.",
                b: "Pain deserves prompt attention but it is not the immediate physical danger in this group.",
                c: "The armband must be replaced, and it is not causing harm at this moment.",
                d: "The meal card is not a safety priority."
            },
            testTakingTip: "Harm happening now outranks harm that might happen later.",
            guideSection: "Section 10: What you do first",
            guideSectionId: "interventions"
        }
    ]
};
