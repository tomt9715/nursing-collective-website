/**
 * Infection Control Quiz - Question Data
 * Questions covering the chain of infection, hand hygiene, standard and
 * transmission-based precautions, protective equipment order, sterile
 * technique, device-related infections and protective environments.
 */

/* exported infectionControlQuizData */
var infectionControlQuizData = {
    guideName: "Infection Control",
    guideSlug: "infection-control",
    category: "Fundamentals",
    categoryColor: "#2E86AB",
    estimatedMinutes: 16,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse finishes caring for a patient with Clostridioides difficile colitis and removes the gown and gloves. Which action should the nurse take next?",
            options: [
                { id: "a", text: "Apply alcohol-based hand rub and cover all hand surfaces until dry" },
                { id: "b", text: "Wash the hands with soap and water for at least 20 seconds" },
                { id: "c", text: "Apply alcohol-based rub, then wash with soap and water at the end of the shift" },
                { id: "d", text: "Put on a clean pair of gloves before touching anything else" }
            ],
            correct: "b",
            rationale: {
                correct: "C. difficile forms spores, and alcohol does not destroy them. Only the friction of soap and running water physically removes spores from the hands.",
                a: "Alcohol rub leaves spores on the hands, so the organism travels to the next patient or surface.",
                c: "Delaying the wash defeats the point. The spores are on the hands now, not at the end of the shift.",
                d: "Gloves over contaminated hands do nothing, and hand hygiene is required after glove removal regardless."
            },
            testTakingTip: "Spores and visible soil are the two things that override alcohol rub.",
            guideSection: "Section 04: Hand hygiene, and when alcohol fails",
            guideSectionId: "hand-hygiene"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is admitted with a productive cough, night sweats, weight loss and hemoptysis. Pulmonary tuberculosis is suspected but not yet confirmed. Which action should the nurse take FIRST?",
            options: [
                { id: "a", text: "Collect the first sputum specimen for acid-fast bacilli" },
                { id: "b", text: "Place the patient in a negative-pressure room and use a fit-tested N95 on entry" },
                { id: "c", text: "Wait for the chest x-ray result before initiating any precautions" },
                { id: "d", text: "Place the patient in a private room and wear a surgical mask on entry" }
            ],
            correct: "b",
            rationale: {
                correct: "Airborne precautions start on suspicion, not on confirmation. The patient needs a negative-pressure room with the door closed, and everyone entering needs a fit-tested N95.",
                a: "Sputum collection is important but it happens after the patient and the staff are protected, and it is itself a high-risk moment.",
                c: "Waiting for results leaves an infectious patient in ordinary ventilation for hours.",
                d: "A surgical mask does not filter airborne particles, and a standard private room does not contain them."
            },
            testTakingTip: "When the organism is unknown but the picture is suspicious, use the higher precaution and step down later.",
            guideSection: "Section 10: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is preparing to leave the room of a patient on contact and airborne precautions. Which removal sequence is correct?",
            options: [
                { id: "a", text: "Gown, gloves, goggles, respirator, then hand hygiene inside the room" },
                { id: "b", text: "Respirator, goggles, gown, gloves, then hand hygiene outside the room" },
                { id: "c", text: "Gloves, goggles, gown, leave the room, then remove the respirator and perform hand hygiene" },
                { id: "d", text: "Gloves, gown, respirator, goggles, then hand hygiene inside the room" }
            ],
            correct: "c",
            rationale: {
                correct: "Gloves are the most contaminated item so they come off first. Eye protection and gown follow, and the respirator is removed only after leaving the room and closing the door, because the airborne organism is still inside.",
                a: "Removing the gown before the gloves contaminates the hands and the uniform.",
                b: "Taking the respirator off first exposes the airway to exactly the organism it was protecting against.",
                d: "The respirator is never removed inside the room of a patient on airborne precautions."
            },
            testTakingTip: "Gloves off first, respirator off outside. Those two anchors generate the whole sequence.",
            guideSection: "Section 06: Equipment, in the right order",
            guideSectionId: "ppe"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A child is admitted with varicella. Which precautions should the nurse implement?",
            options: [
                { id: "a", text: "Droplet precautions in a private room" },
                { id: "b", text: "Contact precautions only, with the lesions covered" },
                { id: "c", text: "Airborne and contact precautions in a negative-pressure room" },
                { id: "d", text: "Standard precautions, since the child is otherwise well" }
            ],
            correct: "c",
            rationale: {
                correct: "Varicella travels through the air and is also present in the fluid inside the lesions, so it needs both airborne and contact precautions and a negative-pressure room.",
                a: "Droplet precautions and a surgical mask do not contain an airborne organism.",
                b: "Contact alone misses the airborne route. Covering lesions is not enough for chickenpox.",
                d: "Standard precautions apply to every patient, but varicella needs transmission-based precautions on top."
            },
            testTakingTip: "Varicella, disseminated zoster and measles are the airborne names to keep with tuberculosis.",
            guideSection: "Section 05: Sorting the organism into a route",
            guideSectionId: "precautions"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on droplet precautions for influenza must go to radiology. Which action by the nurse is correct?",
            options: [
                { id: "a", text: "Place a fit-tested N95 on the patient before transport" },
                { id: "b", text: "Place a surgical mask on the patient and notify radiology before transport" },
                { id: "c", text: "Wear a gown and gloves during transport and leave the patient unmasked" },
                { id: "d", text: "Cancel the study, since patients on precautions do not leave the unit" }
            ],
            correct: "b",
            rationale: {
                correct: "For transport, the source is masked. The patient wears a surgical mask, which contains the droplets at the point they are produced, and the receiving department is told in advance so it can prepare.",
                a: "An N95 is protective equipment for staff. Patients are masked with a surgical mask.",
                c: "Leaving the source unmasked exposes every corridor and elevator on the way.",
                d: "Necessary studies still happen. Transport is limited and prepared, not forbidden."
            },
            testTakingTip: "On transport the mask moves from you to the patient, and it is a surgical mask.",
            guideSection: "Section 05: Sorting the organism into a route",
            guideSectionId: "precautions"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is asked which single action most reduces the transmission of health care-associated infections. Which response is correct?",
            options: [
                { id: "a", text: "Administering prophylactic antibiotics to high-risk patients" },
                { id: "b", text: "Wearing gloves for all patient contact" },
                { id: "c", text: "Performing hand hygiene before and after every patient contact" },
                { id: "d", text: "Placing all patients with fever in private rooms" }
            ],
            correct: "c",
            rationale: {
                correct: "Hand hygiene breaks the mode of transmission, the link nurses control on every patient many times a shift, and it remains the single most effective intervention.",
                a: "Unnecessary antibiotics drive resistance, and prophylaxis has narrow indications.",
                b: "Gloves are not a substitute for hand hygiene. They leak, and hands are contaminated during removal.",
                d: "Isolation is used when a route requires it, not routinely for fever, and it does not replace hand hygiene."
            },
            testTakingTip: "When hand hygiene appears as an option in a transmission question, it is usually the answer.",
            guideSection: "Section 03: The chain, and where you break it",
            guideSectionId: "chain"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse opens a sterile dressing kit and sets up a field on the overbed table. Which observation indicates the field has been contaminated?",
            options: [
                { id: "a", text: "A sterile gauze package is placed 3 inches from the edge of the field" },
                { id: "b", text: "A small amount of sterile saline soaks through the drape onto the table" },
                { id: "c", text: "The nurse holds a sterile item above waist level while facing the field" },
                { id: "d", text: "The first flap of the wrapper is opened away from the nurse" }
            ],
            correct: "b",
            rationale: {
                correct: "Moisture wicks organisms from the surface below up into the field. A wet field is a contaminated field and must be replaced.",
                a: "Three inches is inside the field. Only the outer 1 inch border is considered contaminated.",
                c: "Holding sterile items above waist level and in view is correct technique.",
                d: "Opening the first flap away from the body is the correct sequence for a sterile wrapper."
            },
            testTakingTip: "Border, waist level and moisture are the three ways students break a sterile field.",
            guideSection: "Section 07: Clean or sterile",
            guideSectionId: "asepsis"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient receiving chemotherapy has an absolute neutrophil count of 320 and a temperature of 38.2 degrees Celsius. The surgical incision is clean and dry with no redness. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Document the finding and recheck the temperature in 4 hours" },
                { id: "b", text: "Reassure the patient, since the incision shows no signs of infection" },
                { id: "c", text: "Notify the provider and prepare to obtain blood cultures and start antibiotics" },
                { id: "d", text: "Administer acetaminophen and apply a cooling blanket" }
            ],
            correct: "c",
            rationale: {
                correct: "Neutropenic fever is an emergency. Without neutrophils the patient cannot produce redness, swelling or pus, so fever may be the only sign, and cultures and broad-spectrum antibiotics are started quickly.",
                a: "Waiting 4 hours in severe neutropenia allows sepsis to progress.",
                b: "A clean-looking incision proves nothing here. The signs of inflammation are made of the cells this patient lacks.",
                d: "Treating the fever masks the finding without addressing the infection."
            },
            testTakingTip: "An absolute neutrophil count under 500 plus any fever means culture and treat now.",
            guideSection: "Section 09: Protecting the patient instead",
            guideSectionId: "protective"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is preparing a room for a patient admitted after allogeneic stem cell transplantation. Which room feature is required?",
            options: [
                { id: "a", text: "Negative air pressure with air exhausted outside the building" },
                { id: "b", text: "Positive air pressure with filtered air flowing out of the room" },
                { id: "c", text: "A standard room with the door kept open for observation" },
                { id: "d", text: "A shared room with another transplant patient for cohorting" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient needs protection from the environment, so filtered air flows out of the room and unfiltered air cannot flow in. That is a positive-pressure protective environment.",
                a: "Negative pressure protects the unit from an infectious patient. It is the opposite of what this patient needs.",
                c: "An open door defeats the pressure differential and exposes the patient to corridor air.",
                d: "Cohorting is used for patients sharing the same organism, not for protective environments."
            },
            testTakingTip: "Ask who is being protected. Patient means positive, unit means negative.",
            guideSection: "Section 05: Sorting the organism into a route",
            guideSectionId: "precautions"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nursing student asks how to reduce catheter-associated urinary tract infections on the unit. Which response reflects the highest-yield action?",
            options: [
                { id: "a", text: "Irrigate the catheter with sterile saline once each shift" },
                { id: "b", text: "Change the drainage bag every 24 hours to limit bacterial growth" },
                { id: "c", text: "Review the need for the catheter daily and advocate early removal" },
                { id: "d", text: "Apply antimicrobial ointment to the meatus twice daily" }
            ],
            correct: "c",
            rationale: {
                correct: "Risk rises with every day the catheter stays in. Avoiding insertion when it is not indicated, and removing it as early as possible, prevents more infection than any care routine performed on a catheter that should not be there.",
                a: "Routine irrigation opens the closed system and raises infection risk.",
                b: "Routine bag changes are not recommended, and breaking the closed system introduces organisms.",
                d: "Antimicrobial ointment at the meatus is not recommended and does not reduce infection."
            },
            testTakingTip: "For device infections, early removal beats meticulous care of an unnecessary device.",
            guideSection: "Section 08: The four device infections",
            guideSectionId: "device-infections"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse sustains a needlestick from a hollow-bore needle used on a patient with unknown human immunodeficiency virus (HIV) status. Which action should the nurse take FIRST?",
            options: [
                { id: "a", text: "Wash the site immediately with soap and water" },
                { id: "b", text: "Complete an incident report before leaving the unit" },
                { id: "c", text: "Ask the patient to consent to human immunodeficiency virus (HIV) testing" },
                { id: "d", text: "Report to occupational health at the end of the shift" }
            ],
            correct: "a",
            rationale: {
                correct: "The first action is immediate local care: wash the site with soap and water, or flush mucous membranes with water or saline. Reporting and testing follow right away.",
                b: "The report matters but it comes after immediate site care, and it is not the first action.",
                c: "Source testing is part of the process, but it does not precede washing the site.",
                d: "Waiting until the end of the shift can push post-exposure prophylaxis outside the window where it works best."
            },
            testTakingTip: "Wash first, report the same hour. Prophylaxis works best started within hours.",
            guideSection: "Section 10: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse teaches a group of new graduates about the chain of infection. Emptying a urinary drainage bag before it becomes full targets which link?",
            options: [
                { id: "a", text: "Portal of entry" },
                { id: "b", text: "Reservoir" },
                { id: "c", text: "Susceptible host" },
                { id: "d", text: "Infectious agent" }
            ],
            correct: "b",
            rationale: {
                correct: "The reservoir is where organisms live and multiply. Stagnant urine in a drainage bag is a reservoir, and emptying it removes the place the organism grows.",
                a: "Portal of entry would be addressed by sterile insertion or by keeping skin intact.",
                c: "Susceptible host is addressed by nutrition, glucose control, vaccination and protective precautions.",
                d: "Targeting the agent itself means disinfection, sterilisation or antimicrobial treatment."
            },
            testTakingTip: "Name the link before you read the options. It stops you picking a true statement about a different link.",
            guideSection: "Section 03: The chain, and where you break it",
            guideSectionId: "chain"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient with methicillin-resistant Staphylococcus aureus in a wound. Which action is appropriate?",
            options: [
                { id: "a", text: "Wear a surgical mask on entry and keep the door closed" },
                { id: "b", text: "Put on a gown and gloves before entering and keep a stethoscope in the room" },
                { id: "c", text: "Place the patient in a negative-pressure room" },
                { id: "d", text: "Use standard precautions, since the wound is covered with a dressing" }
            ],
            correct: "b",
            rationale: {
                correct: "Methicillin-resistant Staphylococcus aureus (MRSA) needs contact precautions. Gown and gloves go on before entry, and equipment such as the stethoscope and blood pressure cuff stays dedicated to that room.",
                a: "A mask addresses a respiratory route. Methicillin-resistant Staphylococcus aureus (MRSA) in a wound travels by touch.",
                c: "Negative pressure is for airborne organisms, not for a contact organism.",
                d: "A covered wound does not remove the need for contact precautions with a multidrug-resistant organism."
            },
            testTakingTip: "Multidrug-resistant organisms default to contact precautions with dedicated equipment.",
            guideSection: "Section 05: Sorting the organism into a route",
            guideSectionId: "precautions"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is putting on protective equipment before entering the room of a patient on contact and droplet precautions. Which sequence is correct?",
            options: [
                { id: "a", text: "Gloves, gown, mask, goggles" },
                { id: "b", text: "Mask, goggles, gloves, gown" },
                { id: "c", text: "Gown, mask, goggles, gloves" },
                { id: "d", text: "Gown, gloves, mask, goggles" }
            ],
            correct: "c",
            rationale: {
                correct: "Hand hygiene, then gown, then mask, then eye protection, then gloves. Gloves go on last so they can be pulled over the gown cuffs and cover them.",
                a: "Gloves first leaves the cuffs exposed and contaminates the gloves while tying the gown.",
                b: "Putting gloves on before the gown means the gown is handled with gloved hands and the cuffs are left uncovered.",
                d: "The mask and goggles cannot be adjusted safely once gloves are already on."
            },
            testTakingTip: "Gloves go on last and come off first. That one rule generates both sequences.",
            guideSection: "Section 06: Equipment, in the right order",
            guideSectionId: "ppe"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in contact isolation for a resistant organism tells the nurse, \"Nobody comes in here anymore and I feel like a leper.\" Which response is most appropriate?",
            options: [
                { id: "a", text: "\"The precautions will be lifted soon, so try not to think about it.\"" },
                { id: "b", text: "\"I can leave the gown off for short visits so it feels more normal.\"" },
                { id: "c", text: "\"That sounds lonely. Let me explain why the precautions are needed, and I will plan time to sit with you.\"" },
                { id: "d", text: "\"Everyone on this unit is treated the same way, so there is nothing unusual about it.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "Isolation causes measurable loneliness and low mood, and patients in isolation are visited less often. Acknowledging the feeling, explaining the reason and planning non-task contact addresses it without weakening the precautions.",
                a: "This dismisses the feeling and offers a timeline the nurse cannot promise.",
                b: "Relaxing precautions to be kind puts other patients at risk and is never the correct answer.",
                d: "This is defensive and does not address what the patient said."
            },
            testTakingTip: "Keep the precaution, address the isolation. Answers that relax precautions for comfort are distractors.",
            guideSection: "Section 10: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse must wear a fit-tested N95 respirator. Which statement about its use is accurate?",
            options: [
                { id: "a", text: "Fit testing is done once at hire and does not need to be repeated" },
                { id: "b", text: "A seal check is performed each time the respirator is put on" },
                { id: "c", text: "A surgical mask may be substituted if no N95 is available" },
                { id: "d", text: "The respirator is removed inside the room and discarded there" }
            ],
            correct: "b",
            rationale: {
                correct: "A respirator only protects if it seals. A user seal check is performed every time it is put on, and fit testing is repeated at least annually.",
                a: "Fit testing is repeated at least annually, and after changes in facial structure or weight.",
                c: "A surgical mask does not seal and does not filter small airborne particles.",
                d: "The respirator comes off after leaving the room, because the airborne organism is still inside."
            },
            testTakingTip: "Fit test annually, seal check every time.",
            guideSection: "Section 06: Equipment, in the right order",
            guideSectionId: "ppe"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is planning care for a mechanically ventilated patient. Which intervention most directly reduces ventilator-associated pneumonia?",
            options: [
                { id: "a", text: "Keeping the head of the bed at 30 to 45 degrees" },
                { id: "b", text: "Changing the ventilator circuit every 24 hours" },
                { id: "c", text: "Suctioning the airway hourly whether or not it is indicated" },
                { id: "d", text: "Administering a prophylactic antibiotic on admission" }
            ],
            correct: "a",
            rationale: {
                correct: "Elevating the head of the bed to 30 to 45 degrees reduces aspiration of gastric and oral contents past the tube, and it sits alongside oral care and daily sedation interruption in the prevention bundle.",
                b: "Routine circuit changes are not recommended and can introduce organisms.",
                c: "Suctioning on a schedule rather than on indication damages mucosa and does not reduce pneumonia.",
                d: "Prophylactic antibiotics are not part of prevention and drive resistance."
            },
            testTakingTip: "Head up, mouth clean, wake and assess for weaning. That is the ventilator bundle.",
            guideSection: "Section 08: The four device infections",
            guideSectionId: "device-infections"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent whose child is receiving chemotherapy asks what to do at home. Which statement indicates that teaching was effective?",
            options: [
                { id: "a", text: "\"We will keep fresh flowers in her room to cheer her up.\"" },
                { id: "b", text: "\"Her brother can get his chickenpox vaccine while she is in treatment.\"" },
                { id: "c", text: "\"I will call the clinic the same day if her temperature reaches 100.4 degrees.\"" },
                { id: "d", text: "\"If she seems well after a week, she can go back to school.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "Fever may be the only sign of infection in a neutropenic child, so a temperature of 38.0 degrees Celsius or 100.4 degrees Fahrenheit is reported the same day rather than watched.",
                a: "Fresh flowers, live plants and standing water are avoided in a protective environment.",
                b: "Live vaccines in household contacts need careful planning with the team, and varicella vaccine is not given without that discussion.",
                d: "Return to school is decided on counts, not on how well the child appears."
            },
            testTakingTip: "In neutropenia, a temperature that would be routine anywhere else is the emergency.",
            guideSection: "Section 09: Protecting the patient instead",
            guideSectionId: "protective"
        }
    ]
};
