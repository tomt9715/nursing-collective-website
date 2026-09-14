/**
 * Antibiotics and Antivirals Quiz - Question Data
 * Questions covering class toxicities, peak and trough timing, allergy
 * assessment, C. difficile precautions, antiviral windows and stewardship.
 */

/* exported antibioticsAntiviralsQuizData */
var antibioticsAntiviralsQuizData = {
    guideName: "Antibiotics and Antivirals",
    guideSlug: "antibiotics-antivirals",
    category: "Pharmacology",
    categoryColor: "#2fa866",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A stable patient with suspected pneumonia has orders for a sputum culture and an IV antibiotic. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Give the antibiotic, then collect the sputum specimen" },
                { id: "b", text: "Collect the sputum specimen, then give the antibiotic" },
                { id: "c", text: "Hold both until the chest film is reported" },
                { id: "d", text: "Collect the specimen and hold the antibiotic until the culture results" }
            ],
            correct: "b",
            rationale: {
                correct: "In a stable patient the culture goes first. A single antibiotic dose can sterilize the specimen and cost you the organism, which means therapy cannot be narrowed later. Collecting takes about two minutes and does not delay treatment.",
                a: "Giving the drug first risks a culture that grows nothing.",
                c: "The film does not have to result before treatment starts.",
                d: "Empiric therapy starts now and is narrowed once the culture results. Waiting for the culture delays treatment."
            },
            testTakingTip: "Culture first in a stable patient. The exception is sepsis.",
            guideSection: "Section 8, What you do first",
            guideSectionId: "nursing-care"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient is hypotensive, mottled and febrile with suspected septic shock. Blood cultures have not been drawn and the phlebotomist is 20 minutes away. The nurse should:",
            options: [
                { id: "a", text: "Wait for the phlebotomist so the cultures are drawn correctly" },
                { id: "b", text: "Draw whatever cultures are possible now and give the antibiotic without delay" },
                { id: "c", text: "Give the antibiotic now and cancel the blood cultures entirely" },
                { id: "d", text: "Hold the antibiotic until the provider rounds and reviews the patient" }
            ],
            correct: "b",
            rationale: {
                correct: "Culture before antibiotic is the rule, but it never delays treatment in sepsis. The first dose goes in as soon as possible after diagnosis, within 1 hour. Collect what you can around it rather than holding the drug.",
                a: "A 20 minute delay in septic shock is not acceptable.",
                c: "Cultures still have value and should be sent, even if drawn alongside or after the dose.",
                d: "Waiting for rounds delays a time-critical dose."
            },
            testTakingTip: "Sepsis reverses the order. Drug first, collect around it.",
            guideSection: "Section 8, What you do first",
            guideSectionId: "nursing-care"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Thirty minutes into a vancomycin infusion the patient develops flushing and redness over the face, neck and upper chest with itching. Airway and blood pressure are stable. The nurse should:",
            options: [
                { id: "a", text: "Stop the infusion, assess, and restart at a slower rate once it settles" },
                { id: "b", text: "Document a vancomycin allergy and request a different antibiotic permanently" },
                { id: "c", text: "Increase the rate to finish the dose quickly" },
                { id: "d", text: "Give epinephrine intramuscularly" }
            ],
            correct: "a",
            rationale: {
                correct: "This is the vancomycin infusion reaction, caused by direct histamine release from a rapid rate. It is not an immune reaction. Stop the infusion, assess, give an antihistamine if ordered, and restart more slowly. A 1 gram dose should run over at least 60 minutes.",
                b: "Labelling the patient allergic removes a needed drug for a problem that is fixed by slowing the rate.",
                c: "A faster rate makes the reaction worse.",
                d: "Epinephrine treats anaphylaxis. There is no airway compromise or hypotension here."
            },
            testTakingTip: "Upper body flushing during vancomycin means slow it, not stop it forever.",
            guideSection: "Section 4, Vancomycin or aminoglycoside",
            guideSectionId: "vancomycin-aminoglycosides"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "When should the nurse draw a gentamicin trough level?",
            options: [
                { id: "a", text: "About 30 minutes after the IV infusion ends" },
                { id: "b", text: "Within 30 minutes before the next scheduled dose" },
                { id: "c", text: "Midway between two doses" },
                { id: "d", text: "At any convenient time during the shift" }
            ],
            correct: "b",
            rationale: {
                correct: "A trough is the lowest level in the dosing interval, so it is drawn within 30 minutes before the next dose. It tells you whether the drug is clearing or stacking up.",
                a: "That timing describes the peak, not the trough.",
                c: "A midpoint level does not correspond to either target and cannot be interpreted.",
                d: "Timing is the whole value of the level. A level drawn at the wrong time is worse than none, because someone will act on it."
            },
            testTakingTip: "Trough goes with the next dose. Peak goes with the last one.",
            guideSection: "Section 4, Vancomycin or aminoglycoside",
            guideSectionId: "vancomycin-aminoglycosides"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on IV tobramycin reports ringing in the ears and feeling unsteady when standing. The nurse should recognize this as:",
            options: [
                { id: "a", text: "An expected side effect that will resolve once the course is finished" },
                { id: "b", text: "Early ototoxicity to report promptly, since the hearing loss can be permanent" },
                { id: "c", text: "A sign the dose is too low and the level is subtherapeutic" },
                { id: "d", text: "A normal response to being on bed rest and getting up too fast" }
            ],
            correct: "b",
            rationale: {
                correct: "Aminoglycosides are ototoxic to both the hearing and balance branches of cranial nerve VIII. Tinnitus, fullness, new hearing loss and unsteadiness are reported the same day, because the damage can be permanent.",
                a: "Ototoxicity is not benign and may not reverse.",
                c: "These symptoms suggest too much drug exposure, not too little.",
                d: "Attributing new tinnitus and imbalance to bed rest misses a drug toxicity."
            },
            testTakingTip: "Aminoglycosides take the ears and the kidneys. Ask about both every shift.",
            guideSection: "Section 4, Vancomycin or aminoglycoside",
            guideSectionId: "vancomycin-aminoglycosides"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient scheduled for cefazolin says she is allergic to penicillin. The BEST next nursing action is to:",
            options: [
                { id: "a", text: "Give the cefazolin as ordered without further questioning" },
                { id: "b", text: "Ask what the reaction was, how quickly it started, and how long ago it happened" },
                { id: "c", text: "Cancel the order and tell the provider no cephalosporin can be used" },
                { id: "d", text: "Give a test dose of penicillin to see whether she reacts" }
            ],
            correct: "b",
            rationale: {
                correct: "A reported allergy is incomplete information. The nature, timing and age of the reaction decide what happens next. Hives, wheeze or swelling is a true allergy. Nausea or loose stools is an intolerance and does not by itself block the drug.",
                a: "Giving it without clarifying skips the safety check.",
                c: "Cross-reactivity between penicillins and cephalosporins is low, so a blanket refusal is not supported.",
                d: "A nurse does not challenge a reported allergy with a test dose."
            },
            testTakingTip: "The action for a reported allergy is always to ask what happened.",
            guideSection: "Section 3, Penicillins or cephalosporins",
            guideSectionId: "penicillins-cephalosporins"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is going to the operating room at 0800 and has an order for prophylactic cefazolin. The nurse should plan to give the dose:",
            options: [
                { id: "a", text: "At 0500, three hours before the incision" },
                { id: "b", text: "Within 60 minutes before the incision" },
                { id: "c", text: "Immediately after the incision is closed" },
                { id: "d", text: "Only if the surgeon requests it in the room" }
            ],
            correct: "b",
            rationale: {
                correct: "Surgical prophylaxis is timed so that tissue drug levels are adequate at the moment of incision. The dose goes in within 60 minutes before the cut.",
                a: "Given too early the level has fallen by incision time.",
                c: "Prophylaxis after the incision misses the exposure it is meant to cover.",
                d: "The dose is a scheduled, time-critical medication, not an optional request."
            },
            testTakingTip: "Prophylaxis is a timing question. Sixty minutes before the incision.",
            guideSection: "Section 3, Penicillins or cephalosporins",
            guideSectionId: "penicillins-cephalosporins"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which patient statement shows correct understanding of doxycycline therapy?",
            options: [
                { id: "a", text: "I will take it with a glass of milk to protect my stomach." },
                { id: "b", text: "I will take my antacid at the same time so I only swallow once." },
                { id: "c", text: "I will use sunscreen and keep my arms covered outdoors." },
                { id: "d", text: "I will lie down right after taking it so it settles." }
            ],
            correct: "c",
            rationale: {
                correct: "Tetracyclines cause marked photosensitivity, so sunscreen, covering up and avoiding tanning beds are core teaching points.",
                a: "Calcium in dairy binds the drug and blocks absorption. Separate dairy from the dose by 1 to 2 hours.",
                b: "Antacids contain aluminium and magnesium, which chelate the drug the same way.",
                d: "The dose is taken with a full glass of water while staying upright for about 30 minutes, because lying flat can cause esophageal irritation."
            },
            testTakingTip: "Tetracyclines: teeth, dairy, sun, and sit upright.",
            guideSection: "Section 5, The rest of the classes",
            guideSectionId: "other-classes"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 68-year-old on levofloxacin calls to report new pain and swelling behind the right ankle. The nurse should tell the patient to:",
            options: [
                { id: "a", text: "Apply heat and continue the usual walking routine" },
                { id: "b", text: "Stop the drug, rest the leg, and contact the provider" },
                { id: "c", text: "Take ibuprofen and finish the course as planned" },
                { id: "d", text: "Double the next dose to clear the infection faster" }
            ],
            correct: "b",
            rationale: {
                correct: "Achilles pain on a fluoroquinolone is tendinitis until proven otherwise, and continuing the drug or exercising on it can lead to rupture. Risk is higher over age 60, on corticosteroids and after transplant. Rupture can occur even after the course ends.",
                a: "Continuing to load the tendon is how tendinitis becomes rupture.",
                c: "Finishing the course through tendon pain is the wrong priority here.",
                d: "Changing the dose is outside nursing scope and does not address the toxicity."
            },
            testTakingTip: "Calf or heel pain on a quinolone is a stop sign.",
            guideSection: "Section 5, The rest of the classes",
            guideSectionId: "other-classes"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient starting trimethoprim with sulfamethoxazole for a urinary infection should be taught to:",
            options: [
                { id: "a", text: "Restrict fluids to concentrate the drug in the bladder" },
                { id: "b", text: "Drink 2 to 3 litres of fluid daily and report any new rash the same day" },
                { id: "c", text: "Expect a rash and continue the drug regardless" },
                { id: "d", text: "Take extra potassium supplements during the course" }
            ],
            correct: "b",
            rationale: {
                correct: "Generous fluid prevents crystals forming in the urine. Any new rash is reported promptly, because sulfonamides are a classic trigger for Stevens-Johnson syndrome. Blistering, peeling or mucous membrane involvement means stop the drug now.",
                a: "Restricting fluids increases the risk of crystalluria.",
                c: "Continuing through a rash risks a severe skin reaction.",
                d: "This combination raises potassium, so extra supplementation is the wrong direction."
            },
            testTakingTip: "Sulfa: fluids up, rash reported, potassium watched.",
            guideSection: "Section 5, The rest of the classes",
            guideSectionId: "other-classes"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is discharged on metronidazole. Which instruction is essential?",
            options: [
                { id: "a", text: "Avoid all alcohol, including mouthwash and cough syrup, until 3 days after the last dose" },
                { id: "b", text: "Stop the drug right away if the urine turns dark or reddish-brown" },
                { id: "c", text: "Take the drug on an empty stomach with a glass of grapefruit juice" },
                { id: "d", text: "One or two drinks a day is acceptable as long as they are taken with food" }
            ],
            correct: "a",
            rationale: {
                correct: "Alcohol with metronidazole produces a disulfiram-like reaction: flushing, throbbing headache, vomiting, cramping and palpitations. The rule extends 3 days past the last dose, and patients are often caught out by alcohol-containing mouthwash and cough syrup.",
                b: "Dark urine and a metallic taste are expected and harmless. Warn the patient in advance so they do not stop the drug.",
                c: "Grapefruit juice is not the teaching point here, and food often improves tolerance.",
                d: "Any alcohol can trigger the reaction."
            },
            testTakingTip: "Metronidazole plus alcohol, and the rule runs 3 days past the last dose.",
            guideSection: "Section 5, The rest of the classes",
            guideSectionId: "other-classes"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on clindamycin develops watery, foul-smelling diarrhoea. Which nursing action is correct?",
            options: [
                { id: "a", text: "Use alcohol-based hand gel after every contact" },
                { id: "b", text: "Give loperamide to slow the diarrhoea" },
                { id: "c", text: "Wash hands with soap and running water and initiate contact precautions" },
                { id: "d", text: "Continue standard precautions only until a stool result returns" }
            ],
            correct: "c",
            rationale: {
                correct: "New watery diarrhoea on antibiotics is C. difficile until proven otherwise. The spores are not killed by alcohol, so hand hygiene is soap and running water. Contact precautions, dedicated equipment and a sporicidal cleaner such as bleach are started right away.",
                a: "Alcohol gel does not kill C. difficile spores. This is the exception to the usual hand hygiene answer.",
                b: "Antidiarrhoeals hold the toxin in the colon and can precipitate toxic megacolon.",
                d: "Precautions start on suspicion, not after the result."
            },
            testTakingTip: "C. diff breaks the alcohol gel rule. Soap and water.",
            guideSection: "Section 5, The rest of the classes",
            guideSectionId: "other-classes"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient calls 3 days after influenza symptoms began asking for oseltamivir. The most appropriate nursing response is:",
            options: [
                { id: "a", text: "It works best within 48 hours of symptoms, so the focus now is comfort and preventing spread." },
                { id: "b", text: "It can be started at any point in the illness with the same benefit to you." },
                { id: "c", text: "You should take an antibiotic instead since it has now been 3 days of symptoms." },
                { id: "d", text: "You will need to take it for at least a month for it to be effective." }
            ],
            correct: "a",
            rationale: {
                correct: "Oseltamivir is started within 48 hours of symptom onset. Outside that window the benefit is small, so the plan shifts to symptom management, hydration, rest and preventing transmission. High-risk patients may still be treated at the provider decision.",
                b: "The window matters. Antivirals slow replication and late therapy adds side effects with little gain.",
                c: "Influenza is viral. An antibiotic does nothing and drives resistance.",
                d: "Treatment courses are days, not a month."
            },
            testTakingTip: "Influenza is 48 hours from the first symptom.",
            guideSection: "Section 6, Antivirals and the clock",
            guideSectionId: "antivirals"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is receiving IV acyclovir for a severe herpes infection. Which nursing action is the priority?",
            options: [
                { id: "a", text: "Give the dose as a rapid IV push to reduce infusion time" },
                { id: "b", text: "Restrict fluids to avoid overload and protect the kidneys" },
                { id: "c", text: "Hydrate generously, infuse over at least 1 hour, and monitor creatinine" },
                { id: "d", text: "Hold all other medications until the infusion is complete" }
            ],
            correct: "c",
            rationale: {
                correct: "IV acyclovir can crystallize in the renal tubules. Hydration before and during the infusion, a slow rate over at least an hour, and tracking creatinine and urine output are what prevent nephrotoxicity.",
                a: "A rapid push sharply raises the risk of crystal nephropathy.",
                b: "Fluid restriction is the opposite of what protects the kidneys here.",
                d: "There is no blanket reason to hold other medications."
            },
            testTakingTip: "IV acyclovir needs water and time.",
            guideSection: "Section 6, Antivirals and the clock",
            guideSectionId: "antivirals"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Twenty minutes into an amphotericin B infusion the patient develops fever, chills and rigors. Vital signs are otherwise stable. The nurse recognizes that this:",
            options: [
                { id: "a", text: "Is an expected infusion reaction that is managed and premedicated for" },
                { id: "b", text: "Is anaphylaxis requiring immediate intramuscular epinephrine" },
                { id: "c", text: "Means the patient has developed a new bacterial bloodstream infection" },
                { id: "d", text: "Means the drug must be stopped and never given again" }
            ],
            correct: "a",
            rationale: {
                correct: "Fever, chills, rigors, headache and nausea early in an amphotericin B infusion are a well-recognized infusion reaction. Premedication with an antipyretic and an antihistamine is given before the infusion starts, and the reaction is managed rather than treated as an allergy. The dose-limiting toxicity of the drug is renal, so creatinine, potassium and magnesium are monitored.",
                b: "There is no airway compromise or hypotension described.",
                c: "The timing points to the infusion, not a new infection.",
                d: "The reaction does not contraindicate future doses."
            },
            testTakingTip: "Amphotericin B: chills at the start, kidneys over time.",
            guideSection: "Section 7, Antifungals",
            guideSectionId: "antifungals"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A urine culture from an 80-year-old nursing home resident grows bacteria. He has no fever, no dysuria and no change in function. The nurse anticipates that the provider will:",
            options: [
                { id: "a", text: "Start a broad-spectrum antibiotic immediately" },
                { id: "b", text: "Treat with a 10-day course to prevent progression" },
                { id: "c", text: "Not treat, because asymptomatic bacteriuria is left alone in this patient" },
                { id: "d", text: "Order repeat cultures weekly until they are negative" }
            ],
            correct: "c",
            rationale: {
                correct: "Bacteria in the urine without symptoms is asymptomatic bacteriuria. It is not treated, and it is not routinely screened for. The routine exceptions are pregnancy and the run-up to a urologic procedure.",
                a: "Treating a positive culture in a patient with no symptoms drives resistance and C. difficile risk.",
                b: "Length of course does not change the fact that treatment is not indicated.",
                d: "Repeated screening of asymptomatic patients is not recommended."
            },
            testTakingTip: "Treat the patient, not the culture. Pregnancy and urologic procedures are the exceptions.",
            guideSection: "Section 9, Resistance and stewardship",
            guideSectionId: "resistance"
        },
        {
            id: 17,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "Which statements by a patient indicate correct understanding of antibiotic stewardship? (Select all that apply.)",
            options: [
                { id: "a", text: "I will take the whole course even after I feel better." },
                { id: "b", text: "I will save any leftover pills for the next time I get sick." },
                { id: "c", text: "An antibiotic will not help my head cold." },
                { id: "d", text: "I can take my roommate's antibiotic since we have the same symptoms." },
                { id: "e", text: "I will tell the nurse if I get watery diarrhoea while on this drug." },
                { id: "f", text: "Once the culture names the bug, my drug may be switched to a narrower one." }
            ],
            correct: ["a", "c", "e", "f"],
            rationale: {
                correct: "A, C, E and F are correct. Finishing the prescribed course, refusing antibiotics for viral illness, reporting new diarrhoea and expecting therapy to be narrowed after culture results are all core stewardship principles.",
                a: "Correct. Stopping early leaves the hardiest organisms behind.",
                b: "Saved leftovers lead to partial, unsupervised courses and resistance.",
                c: "Correct. Colds are viral and get no benefit from an antibiotic.",
                d: "Taking a course prescribed for someone else is unsafe and drives resistance.",
                e: "Correct. New watery diarrhoea may be C. difficile.",
                f: "Correct. De-escalating to a narrower agent once the organism is known is the goal."
            },
            testTakingTip: "Stewardship is four refusals: no viruses, no asymptomatic bacteriuria, no leftovers, no staying broad.",
            guideSection: "Section 9, Resistance and stewardship",
            guideSectionId: "resistance"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which finding in a patient receiving both vancomycin and gentamicin most requires the nurse to notify the provider before the next dose?",
            options: [
                { id: "a", text: "Serum creatinine has risen from 0.9 to 1.8 mg/dL with falling urine output" },
                { id: "b", text: "The patient reports the IV site feels cool during the infusion" },
                { id: "c", text: "Temperature has fallen from 39.1 to 37.6 degrees Celsius overnight" },
                { id: "d", text: "The patient asks for a second pillow to sleep more comfortably" }
            ],
            correct: "a",
            rationale: {
                correct: "Both drugs are nephrotoxic and the combination raises the risk further. A doubling creatinine with falling urine output is early kidney injury and it is reported before the next dose goes in, since the dose almost certainly needs adjusting.",
                b: "A cool site is assessed but is not the priority finding here.",
                c: "A falling fever suggests the therapy is working.",
                d: "A comfort request is not a priority over evolving renal injury."
            },
            testTakingTip: "Two nephrotoxic drugs together means creatinine and urine output are your job.",
            guideSection: "Section 4, Vancomycin or aminoglycoside",
            guideSectionId: "vancomycin-aminoglycosides"
        }
    ]
};
