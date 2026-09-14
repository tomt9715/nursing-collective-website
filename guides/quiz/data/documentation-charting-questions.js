/**
 * Documentation and Charting Quiz - Question Data
 * Questions covering objective versus subjective entries, error correction,
 * late entries, banned abbreviations, charting formats, SBAR handoff,
 * telephone orders, consent documentation and privacy.
 */

/* exported documentationChartingQuizData */
var documentationChartingQuizData = {
    guideName: "Documentation and Charting",
    guideSlug: "documentation-charting",
    category: "Fundamentals",
    categoryColor: "#2E86AB",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which entry is documented appropriately?",
            options: [
                { id: "a", text: "Patient is uncooperative and refuses to follow any instructions from the nursing staff" },
                { id: "b", text: "Patient appears anxious about the surgery tomorrow and seems upset with the plan" },
                { id: "c", text: "Declined 0800 and 1000 medications. States, \"I am not taking anything until I speak to my doctor.\"" },
                { id: "d", text: "Patient tolerated the dressing change well and seemed comfortable afterward" }
            ],
            correct: "c",
            rationale: {
                correct: "This records observable behaviour, exact times and the patient's own words in quotation marks. Another nurse could picture exactly what happened without accepting any interpretation.",
                a: "Uncooperative is a judgment. Chart the specific refusals and what was said instead.",
                b: "Appears anxious is an inference. Chart the findings that produced it, such as pacing, tremor and a heart rate of 108.",
                d: "Tolerated well is a conclusion with no data. Chart vital signs, pain rating and observed behaviour."
            },
            testTakingTip: "Look for numbers, times, quotes and observable behaviour. That entry is the answer.",
            guideSection: "Section 03: Objective or subjective",
            guideSectionId: "what-belongs"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse realizes an entry was written in the wrong patient's paper chart. What should the nurse do?",
            options: [
                { id: "a", text: "Use correction fluid over the entry and rewrite it in the correct chart" },
                { id: "b", text: "Draw a single line through the entry, initial and date it, and note the correction" },
                { id: "c", text: "Scribble over the entry heavily so it cannot be misread as this patient's data" },
                { id: "d", text: "Remove the page and replace it with a clean one" }
            ],
            correct: "b",
            rationale: {
                correct: "A single line leaves the original readable, and the initials, date and time show who corrected it and when. Anything that hides the original looks like concealment later.",
                a: "Correction fluid obscures the original and is never acceptable in a legal record.",
                c: "Heavy scribbling makes the original unreadable, which raises the same concerns as correction fluid.",
                d: "Removing a page from the record is destruction of a legal document."
            },
            testTakingTip: "The original must stay readable. That rule eliminates three options every time.",
            guideSection: "Section 04: Errors, late entries and blanks",
            guideSectionId: "corrections"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse forgot to chart a dressing change performed at 1400 and is now documenting at 1900. How should this be recorded?",
            options: [
                { id: "a", text: "Insert the entry in the space between the 1300 and 1500 notes" },
                { id: "b", text: "Chart it at 1900 without reference to the earlier time" },
                { id: "c", text: "Document a late entry at 1900 that states the care was performed at 1400" },
                { id: "d", text: "Ask the oncoming nurse to chart it during the next shift" }
            ],
            correct: "c",
            rationale: {
                correct: "A late entry carries two true timestamps: the time you are writing and the time the care actually occurred. Labelling it as a late entry is honest and legally defensible.",
                a: "Squeezing an entry into an earlier gap makes the record appear altered and is falsification.",
                b: "Charting it at 1900 without the actual time misrepresents when the care happened.",
                d: "Nurses chart only care they performed themselves."
            },
            testTakingTip: "Late entry means both times appear, and the label appears too.",
            guideSection: "Section 04: Errors, late entries and blanks",
            guideSectionId: "corrections"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A prescriber gives a telephone order for a new antibiotic. Which action is essential before ending the call?",
            options: [
                { id: "a", text: "Repeat the order back word for word and have the prescriber confirm it" },
                { id: "b", text: "Ask the prescriber to enter it electronically within 24 hours" },
                { id: "c", text: "Confirm the order with the charge nurse after hanging up" },
                { id: "d", text: "Write the order from memory once the call is complete" }
            ],
            correct: "a",
            rationale: {
                correct: "The order is written down as it is given and then read back word for word, including drug, dose, route, frequency and spelling, with the prescriber confirming the read-back before the call ends.",
                b: "Countersignature is required, usually within 24 hours, but it does not replace the read-back during the call.",
                c: "The charge nurse cannot confirm what the prescriber said. Only the prescriber can.",
                d: "Writing from memory is exactly the failure the write-down and read-back rule exists to prevent."
            },
            testTakingTip: "Write it, read it back, verify, then sign within the window.",
            guideSection: "Section 08: Telephone and verbal orders",
            guideSectionId: "orders"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            keepAcronyms: ["MS"],
            stem: "Which documented order is written safely?",
            options: [
                { id: "a", text: "Regular insulin 8U subcutaneously before meals" },
                { id: "b", text: "Furosemide 40 mg by mouth daily" },
                { id: "c", text: "Levothyroxine .05 mg by mouth every morning" },
                { id: "d", text: "Morphine written as MS 4 mg IV every 4 hours as needed" }
            ],
            correct: "b",
            rationale: {
                correct: "The dose, route and frequency are spelled out with no banned abbreviation, no trailing zero and no missing leading zero.",
                a: "U is on the do-not-use list because it is misread as a zero or a four.",
                c: "A missing leading zero turns 0.05 mg into 05 mg or 5 mg. Write 0.05 mg.",
                d: "MS, meant as morphine sulfate, is confused with magnesium sulfate. The full drug name is required."
            },
            testTakingTip: "Always a leading zero, never a trailing one, and spell out unit and daily.",
            guideSection: "Section 05: Abbreviations that are banned",
            guideSectionId: "abbreviations"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            keepAcronyms: ["SBAR"],
            stem: "A nurse is calling a provider about a patient whose blood pressure has fallen to 84/50 with a heart rate of 122. Which statement completes the SBAR correctly?",
            options: [
                { id: "a", text: "\"I just wanted to let you know about her vital signs this evening.\"" },
                { id: "b", text: "\"I think she may be getting worse, so I will keep a close eye on her.\"" },
                { id: "c", text: "\"I am concerned she is becoming septic. Please come assess her now and order fluids.\"" },
                { id: "d", text: "\"Her numbers are in the chart if you want to look at them later.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "The recommendation is the letter that makes situation, background, assessment, recommendation (SBAR) work. It names the concern and asks for something specific, so there is no ambiguity about what the nurse needs.",
                a: "This is information without a request, and it leaves the next step undefined.",
                b: "Continuing to watch a deteriorating patient without a request is not an escalation.",
                d: "Deferring to the chart delays action in a time-sensitive situation."
            },
            testTakingTip: "If a situation, background, assessment, recommendation (SBAR) question asks what is missing, check for the specific ask first.",
            guideSection: "Section 07: Handoff and SBAR",
            guideSectionId: "handoff"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse administers the wrong dose of a medication. After assessing the patient and notifying the provider, which entry belongs in the medical record?",
            options: [
                { id: "a", text: "\"Medication error occurred at 0900. Incident report completed and submitted to the charge nurse.\"" },
                { id: "b", text: "\"Gave 10 mg instead of 5 mg at 0900 due to a distracting environment on the unit. Provider aware.\"" },
                { id: "c", text: "\"Metoprolol 10 mg given at 0900. Blood pressure 96/58, heart rate 54 at 0915. Provider notified 0918. Vital signs every 15 minutes.\"" },
                { id: "d", text: "No entry, because the incident report already documents the event, the dose and the patient response" }
            ],
            correct: "c",
            rationale: {
                correct: "The chart records what actually happened to the patient: the dose given, the assessment findings, the notification and the ongoing monitoring plan.",
                a: "Referencing an incident report in the chart pulls an internal quality document into the legal record.",
                b: "Blame and explanation of cause belong in the internal review, not in the patient's chart.",
                d: "Everything that happened to the patient must appear in the chart regardless of any report."
            },
            testTakingTip: "Chart the facts about the patient. Never chart that a report exists.",
            guideSection: "Section 02: The four things",
            guideSectionId: "high-yield-summary"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is about to leave the medication room where the electronic record is still open. What should the nurse do?",
            options: [
                { id: "a", text: "Minimise the window so the information is not visible" },
                { id: "b", text: "Log off before leaving the workstation" },
                { id: "c", text: "Ask a colleague to watch the screen" },
                { id: "d", text: "Leave it open, since the room is restricted to staff" }
            ],
            correct: "b",
            rationale: {
                correct: "The login is the nurse's signature. Anything entered while it is open is attributed to that nurse, so the workstation is logged off before walking away, however briefly.",
                a: "A minimised window is still an open session under that nurse's credentials.",
                c: "Responsibility for the session cannot be delegated to someone else.",
                d: "Staff-only areas still contain people who are not caring for that patient."
            },
            testTakingTip: "Your login is your signature. Log off, do not minimise.",
            guideSection: "Section 06: Charting formats",
            guideSectionId: "formats"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse learns that a neighbour has been admitted to another unit and opens the chart to check how they are doing. What is the significance of this action?",
            options: [
                { id: "a", text: "It is acceptable because the nurse works at the facility" },
                { id: "b", text: "It is acceptable if the nurse does not tell anyone what she read" },
                { id: "c", text: "It is a privacy breach, because the nurse is not involved in that patient's care" },
                { id: "d", text: "It is acceptable if the neighbour would not object" }
            ],
            correct: "c",
            rationale: {
                correct: "Access is limited to the minimum necessary for the care you provide. Opening a record out of concern or curiosity is a breach, and every access is logged.",
                a: "Employment grants access to systems, not permission to read any record.",
                b: "The breach is the access itself. Discretion afterwards does not undo it.",
                d: "Assumed permission is not permission. The patient must authorise it."
            },
            testTakingTip: "If you are not caring for them, do not open the chart.",
            guideSection: "Section 09: Privacy, and how it gets breached",
            guideSectionId: "privacy"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing to witness a surgical consent form. The patient says, \"I am not really sure what they are taking out.\" What should the nurse do?",
            options: [
                { id: "a", text: "Explain the procedure and its risks, then have the patient sign" },
                { id: "b", text: "Have the patient sign and ask the surgeon to explain afterward" },
                { id: "c", text: "Stop the process and notify the provider to speak with the patient again" },
                { id: "d", text: "Ask the family to explain what they were told earlier" }
            ],
            correct: "c",
            rationale: {
                correct: "Informed consent is the provider's responsibility. When the patient cannot describe what they are consenting to, the consent is not informed and the provider must return before anything is signed.",
                a: "Explaining the procedure and risks is outside the nurse's role in informed consent.",
                b: "A signature obtained before understanding is not valid consent.",
                d: "Family recollection does not establish that this patient was informed."
            },
            testTakingTip: "The nurse witnesses the signature. The provider does the informing.",
            guideSection: "Section 08: Telephone and verbal orders",
            guideSectionId: "orders"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            keepAcronyms: ["DAR"],
            stem: "A nurse documents using the DAR format. What does this format record?",
            options: [
                { id: "a", text: "Diagnosis, assessment, referral" },
                { id: "b", text: "Data, action, response" },
                { id: "c", text: "Description, analysis, resolution" },
                { id: "d", text: "Documentation, administration, review" }
            ],
            correct: "b",
            rationale: {
                correct: "Focus charting uses data, action and response. Data is what you found, action is what you did, and response is what happened as a result.",
                a: "Referral is not a component of focus charting.",
                c: "This is not a recognised documentation format.",
                d: "This is not a recognised documentation format."
            },
            testTakingTip: "Focus charting is data, action, response (DAR), and the R is the part most nurses forget to write.",
            guideSection: "Section 06: Charting formats",
            guideSectionId: "formats"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nursing student asks why a line is drawn through unused space on a paper flow sheet. What is the best explanation?",
            options: [
                { id: "a", text: "It makes the record look tidier for auditors" },
                { id: "b", text: "It prevents anyone from adding information to the record later" },
                { id: "c", text: "It marks the end of the nurse's shift" },
                { id: "d", text: "It is required only when the patient is discharged" }
            ],
            correct: "b",
            rationale: {
                correct: "Blank space in a legal record can be filled in afterwards by anyone. Striking it through closes the entry and preserves its integrity.",
                a: "Appearance is not the reason. Record integrity is.",
                c: "Shift end is recorded by the entry time and signature, not by a struck line.",
                d: "The rule applies to every page, on every shift."
            },
            testTakingTip: "Every paper rule protects the record from later alteration.",
            guideSection: "Section 04: Errors, late entries and blanks",
            guideSectionId: "corrections"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse receives a critical potassium result of 6.8 mEq/L by telephone from the laboratory. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Document the value in the chart and continue the medication round" },
                { id: "b", text: "Write the value down, read it back to the laboratory, then notify the provider promptly" },
                { id: "c", text: "Wait for the result to appear in the electronic record before acting" },
                { id: "d", text: "Recheck the patient's vital signs and reassess in an hour" }
            ],
            correct: "b",
            rationale: {
                correct: "Critical results follow the same write-down and read-back rule as verbal orders, and then they are reported to the provider promptly. A potassium of 6.8 is a cardiac emergency waiting to happen.",
                a: "Documenting without notifying leaves a life-threatening value unaddressed.",
                c: "Waiting for the electronic result delays treatment of a critical value.",
                d: "Reassessing in an hour is far too slow for this result."
            },
            testTakingTip: "Critical values are read back and reported before they are documented.",
            guideSection: "Section 08: Telephone and verbal orders",
            guideSectionId: "orders"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is nearing the end of a busy shift and charts the 2000 tube feeding flush at 1930 so nothing is forgotten. How should this action be evaluated?",
            options: [
                { id: "a", text: "Acceptable, because the flush is scheduled and routine" },
                { id: "b", text: "Acceptable, because the nurse intends to perform it" },
                { id: "c", text: "Unacceptable, because charting before care is falsification of the record" },
                { id: "d", text: "Unacceptable only if the nurse forgets to perform the flush" }
            ],
            correct: "c",
            rationale: {
                correct: "Pre-charting states that something happened when it has not. If the nurse is pulled away or the patient's status changes, the record now contains an untrue entry.",
                a: "Routine care is documented after it is delivered, like everything else.",
                b: "Intention is not performance, and the record documents performance.",
                d: "The falsification occurs at the moment of charting, not when it is discovered."
            },
            testTakingTip: "Chart after the care, as close to it as possible. Never before.",
            guideSection: "Section 01: What actually gets you",
            guideSectionId: "start-here"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which statement about bedside shift handoff is accurate?",
            options: [
                { id: "a", text: "It should occur away from the patient to protect confidentiality" },
                { id: "b", text: "It involves the patient and lets both nurses see lines, drips and dressings" },
                { id: "c", text: "It replaces the need for documentation of the shift" },
                { id: "d", text: "It should be a one-way report to save time" }
            ],
            correct: "b",
            rationale: {
                correct: "Bedside handoff involves the patient in their own care and lets the incoming nurse verify infusions, dressings and equipment directly, which catches errors a verbal report would miss.",
                a: "Handoff at the bedside is recommended, with sensitive details handled discreetly.",
                c: "Handoff and documentation are separate obligations.",
                d: "Handoff is two-way, with time built in for questions and read-back."
            },
            testTakingTip: "Handoff is structured, two-way, and at the bedside where possible.",
            guideSection: "Section 07: Handoff and SBAR",
            guideSectionId: "handoff"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is asked by a colleague to chart a medication the colleague gave while the nurse was covering the unit. What should the nurse do?",
            options: [
                { id: "a", text: "Chart it, noting that the colleague administered it" },
                { id: "b", text: "Chart it under the colleague's login to keep the record accurate" },
                { id: "c", text: "Decline, and ask the colleague to document their own administration" },
                { id: "d", text: "Chart it and ask the charge nurse to countersign" }
            ],
            correct: "c",
            rationale: {
                correct: "Nurses document only the care they personally performed. The person who administered the medication is the person who charts it.",
                a: "Charting another person's action makes the record ambiguous about who did what.",
                b: "Using another person's login is a serious violation and falsifies the signature.",
                d: "A countersignature does not fix documenting care you did not give."
            },
            testTakingTip: "You chart what you did. Nothing else.",
            guideSection: "Section 10: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse posts on social media: \"Long night. Lost a 42-year-old motorcycle trauma in bay 3.\" No name is used. How should this be evaluated?",
            options: [
                { id: "a", text: "Acceptable, because no name or medical record number was posted" },
                { id: "b", text: "Acceptable, because the nurse was expressing personal grief" },
                { id: "c", text: "A privacy violation, because the details are enough to identify the patient" },
                { id: "d", text: "Acceptable if the post is deleted within 24 hours" }
            ],
            correct: "c",
            rationale: {
                correct: "Age, mechanism of injury, location and timing together identify a specific person to anyone who knows them. Removing the name does not de-identify the post.",
                a: "Identification does not require a name. A combination of details is enough.",
                b: "Grief is real and it is addressed through colleagues, debriefing and support, not through a public post.",
                d: "The breach happens at posting. Deletion does not undo distribution."
            },
            testTakingTip: "If the details could identify the person to anyone reading, it is a breach.",
            guideSection: "Section 09: Privacy, and how it gets breached",
            guideSectionId: "privacy"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient refuses a scheduled dose of an anticoagulant. What should the nurse document?",
            options: [
                { id: "a", text: "Nothing, since the medication was never actually administered" },
                { id: "b", text: "That the dose was given, to keep the record consistent with the order" },
                { id: "c", text: "The refusal, the patient's reason, the teaching given and the provider notification" },
                { id: "d", text: "That the patient is non-adherent with the anticoagulation treatment plan" }
            ],
            correct: "c",
            rationale: {
                correct: "Omitted care is documented along with why it was omitted, what teaching was given, and who was notified. That record protects the patient and shows the nursing judgment applied.",
                a: "An unexplained gap in the record looks like an omission of care rather than a refusal.",
                b: "Charting an unadministered dose is falsification and endangers the patient.",
                d: "Non-adherent is a judgment. Chart the refusal and the reason the patient gave."
            },
            testTakingTip: "Care not given is still charted, with the reason and the notification.",
            guideSection: "Section 04: Errors, late entries and blanks",
            guideSectionId: "corrections"
        }
    ]
};
