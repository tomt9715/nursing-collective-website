/**
 * Pain Management Quiz - Question Data
 * Questions covering pain assessment tools, non-opioid ceilings, opioid safety,
 * sedation monitoring, naloxone, PCA rules, tolerance versus addiction,
 * adjuvants and special populations.
 */

/* exported painManagementQuizData */
var painManagementQuizData = {
    guideName: "Pain Management",
    guideSlug: "pain-management",
    category: "Pharmacology",
    categoryColor: "#2fa866",
    estimatedMinutes: 16,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Two hours after starting IV morphine, a post-operative patient is frequently drowsy and drifts off to sleep in the middle of sentences. The respiratory rate is 14 and the oxygen saturation is 96 percent. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Document the findings and give the next dose on schedule, since the respiratory rate is normal" },
                { id: "b", text: "Hold the next opioid dose, keep monitoring closely, and notify the prescriber" },
                { id: "c", text: "Give naloxone immediately" },
                { id: "d", text: "Let the patient sleep and reassess in four hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Advancing sedation comes before respiratory depression. A patient who drifts off mid-sentence is at an unacceptable sedation level even with a normal respiratory rate. Hold or reduce the dose, monitor closely, and notify the prescriber.",
                a: "A normal respiratory rate is reassuring only if the sedation level is acceptable. Giving another dose here makes respiratory depression more likely.",
                c: "Naloxone is for the barely rousable or unrousable patient with respiratory depression. This patient still rouses.",
                d: "Four hours is far too long. Rising sedation is the early warning and it needs closer monitoring, not less."
            },
            testTakingTip: "Sedation rises first, breathing falls second. Score the sedation before every dose.",
            guideSection: "Section 06: Sedation comes first",
            guideSectionId: "safety"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a healthy liver is taking oxycodone with acetaminophen every 6 hours, plus scheduled plain acetaminophen, plus an over-the-counter cold remedy at night. The nurse is most concerned about which risk?",
            options: [
                { id: "a", text: "Exceeding the daily acetaminophen ceiling from combined sources" },
                { id: "b", text: "Developing tolerance to the oxycodone with regular use" },
                { id: "c", text: "Gastrointestinal bleeding from the scheduled acetaminophen" },
                { id: "d", text: "Opioid withdrawal symptoms between the scheduled doses" }
            ],
            correct: "a",
            rationale: {
                correct: "Acetaminophen hides in combination opioids and in cold and flu remedies. Most accidental hepatotoxicity comes from adding ordinary sources together rather than from one large dose. Total every source against the 4 g per day ceiling.",
                b: "Tolerance may develop but it is expected and it is not the safety concern in this stem.",
                c: "Acetaminophen does not cause gastrointestinal bleeding. That risk belongs to nonsteroidal anti-inflammatory drugs (NSAIDs).",
                d: "Nothing here suggests the opioid is being stopped or the interval extended."
            },
            testTakingTip: "When a stem lists more than one acetaminophen source, it is asking you to add them up.",
            guideSection: "Section 04: Non-opioids and their ceilings",
            guideSectionId: "non-opioids"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with cirrhosis asks how much acetaminophen is safe at home. Which response is most appropriate?",
            options: [
                { id: "a", text: "\"You can safely take up to 4 grams a day, the same limit as anyone else.\"" },
                { id: "b", text: "\"Acetaminophen is not safe at any dose with liver disease, so use ibuprofen instead.\"" },
                { id: "c", text: "\"Your limit is lower than the usual 4 grams, often 2 grams or less. Confirm it with your provider.\"" },
                { id: "d", text: "\"Take it only when your pain reaches 8 out of 10, and then take a full dose.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "A damaged liver clears the toxic metabolite poorly, so the daily ceiling drops well below the healthy adult limit, commonly to 2 g per day or less. The exact number is set by the provider.",
                a: "The 4 g figure applies to a healthy adult liver. It is unsafe advice here.",
                b: "Acetaminophen is often still used at a reduced ceiling. Nonsteroidal anti-inflammatory drugs (NSAIDs) carry bleeding and kidney risks that are worse in cirrhosis.",
                d: "Waiting for severe pain is poor pain management and does not answer the dosing question."
            },
            testTakingTip: "Liver disease, chronic alcohol use and frailty all lower the acetaminophen ceiling.",
            guideSection: "Section 04: Non-opioids and their ceilings",
            guideSectionId: "non-opioids"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with diabetes describes burning, shooting pain in both feet that is worse at night. Oxycodone has barely helped. Which addition should the nurse anticipate?",
            options: [
                { id: "a", text: "A higher dose of oxycodone" },
                { id: "b", text: "Gabapentin" },
                { id: "c", text: "Ketorolac" },
                { id: "d", text: "A fentanyl patch" }
            ],
            correct: "b",
            rationale: {
                correct: "Burning and shooting pain in a diabetic patient is neuropathic. Neuropathic pain responds to adjuvants such as gabapentin or pregabalin, tricyclics, and duloxetine, and responds poorly to opioids alone.",
                a: "Escalating an opioid that is not working for nerve pain adds sedation and constipation without adding relief.",
                c: "Ketorolac is a nonsteroidal anti-inflammatory drug (NSAID) for inflammatory and acute nociceptive pain, and it is limited to 5 days. It does not target neuropathic pain.",
                d: "A patch is for stable chronic pain in opioid-tolerant patients, and it does not address the mechanism here."
            },
            testTakingTip: "Burning, shooting or electric equals neuropathic. Match the class to the adjective.",
            guideSection: "Section 03: Assessment and picking the tool",
            guideSectionId: "assessment"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The spouse of a patient using patient-controlled analgesia (PCA) morphine tells the nurse, \"He was sleeping so I pressed the button a few times so he would not wake up hurting.\" What is the nurse's priority action?",
            options: [
                { id: "a", text: "Thank the spouse for helping and continue the current monitoring plan" },
                { id: "b", text: "Assess sedation and respiratory status, then teach that only the patient presses the button" },
                { id: "c", text: "Remove the patient-controlled analgesia (PCA) pump and switch the patient to scheduled oral analgesics" },
                { id: "d", text: "Increase the lockout interval on the pump so the extra doses are spread out" }
            ],
            correct: "b",
            rationale: {
                correct: "Proxy pressing removes the built-in safety of patient-controlled analgesia (PCA), because a sedated patient cannot dose themselves. Assess sedation and respiratory status first, then teach the family that only the patient presses the button, and document the teaching.",
                a: "Proxy dosing is a known cause of oversedation and it is never acceptable.",
                c: "The route is not the problem. The teaching gap is the problem.",
                d: "Nurses do not change patient-controlled analgesia (PCA) settings independently, and it does not address the immediate safety assessment."
            },
            testTakingTip: "Any option where family or staff press the patient-controlled analgesia (PCA) button is wrong, however kindly worded.",
            guideSection: "Section 07: Patient-controlled analgesia",
            guideSectionId: "pca"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a long leg cast reports pain that has become severe, is unrelieved by two opioid doses, and worsens sharply when the toes are passively extended. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Request an increase in the opioid dose and reassess the pain score in 30 minutes" },
                { id: "b", text: "Elevate the limb on pillows above heart level and apply ice packs around the cast" },
                { id: "c", text: "Check neurovascular status, loosen tight dressings, keep the limb at heart level, and notify the provider" },
                { id: "d", text: "Reposition the patient, offer distraction, and reassess the pain score in an hour" }
            ],
            correct: "c",
            rationale: {
                correct: "Pain out of proportion, unrelieved by opioids, and worse on passive stretch is compartment syndrome until proven otherwise. Assess and escalate. Loosen anything constricting and keep the limb at heart level rather than elevated.",
                a: "This is the one situation where increasing analgesia is wrong, because it hides the only warning sign present.",
                b: "Elevation and ice are correct for ordinary swelling but harmful in compartment syndrome, since both reduce perfusion further.",
                d: "Comfort measures do not address a limb-threatening emergency."
            },
            testTakingTip: "Unrelieved pain that spikes on passive stretch is an assessment finding, not a dosing problem.",
            guideSection: "Section 11: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which opioid side effect does the patient NOT develop tolerance to?",
            options: [
                { id: "a", text: "Nausea and vomiting" },
                { id: "b", text: "Sedation" },
                { id: "c", text: "Constipation" },
                { id: "d", text: "Itching" }
            ],
            correct: "c",
            rationale: {
                correct: "Constipation persists for as long as the opioid is taken, at any dose. That is why a bowel regimen starts with the first opioid dose rather than after symptoms appear.",
                a: "Nausea and vomiting usually settle within days as tolerance develops.",
                b: "Sedation typically improves over the first days of stable dosing.",
                d: "Itching is often histamine related and usually eases with time."
            },
            testTakingTip: "Everything fades except the constipation. Laxative on day one.",
            guideSection: "Section 05: Opioids",
            guideSectionId: "opioids"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in sickle cell vaso-occlusive crisis needs frequent, repeated opioid dosing. Which prescription should the nurse question?",
            options: [
                { id: "a", text: "Scheduled IV morphine with breakthrough doses available" },
                { id: "b", text: "IV meperidine every 3 hours as needed" },
                { id: "c", text: "IV hydromorphone by patient-controlled analgesia (PCA)" },
                { id: "d", text: "Scheduled acetaminophen alongside the opioid" }
            ],
            correct: "b",
            rationale: {
                correct: "Meperidine breaks down into normeperidine, a neurotoxic metabolite that lowers the seizure threshold and accumulates with repeated dosing and in kidney impairment. It is avoided in sickle cell pain.",
                a: "Scheduled dosing is preferred over as-needed only dosing in vaso-occlusive crisis, because the pain is continuous and severe.",
                c: "Hydromorphone by patient-controlled analgesia (PCA) is an appropriate option for severe crisis pain in a patient who can use the pump.",
                d: "Scheduled non-opioids spare opioid and are part of a multimodal plan."
            },
            testTakingTip: "Meperidine plus repeated dosing equals normeperidine accumulation. Question it.",
            guideSection: "Section 05: Opioids",
            guideSectionId: "opioids"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Naloxone has just been given to a patient who was unrousable on IV hydromorphone. The patient is now awake and reporting severe pain. Which nursing action is most important over the next hour?",
            options: [
                { id: "a", text: "Discharge planning, since the emergency has resolved" },
                { id: "b", text: "Continue close monitoring, because naloxone wears off before the opioid does" },
                { id: "c", text: "Give the next scheduled opioid dose now to control the pain" },
                { id: "d", text: "Document that the patient is allergic to hydromorphone" }
            ],
            correct: "b",
            rationale: {
                correct: "Naloxone commonly lasts 30 to 90 minutes, which is shorter than most opioids. The patient can become sedated again once it wears off, so monitoring continues and repeat doses may be needed.",
                a: "The risk period is not over when the patient opens their eyes.",
                c: "Giving the opioid that caused the event without a new prescription and reassessment is unsafe.",
                d: "Oversedation is a dose-related adverse effect, not an allergy."
            },
            testTakingTip: "Naloxone is shorter-acting than the opioid it reverses. Keep watching.",
            guideSection: "Section 06: Sedation comes first",
            guideSectionId: "safety"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient taking opioids for chronic cancer pain asks for the next dose 25 minutes early and requests a specific drug by name. The reassessment scores show pain of 8 out of 10 an hour after the last dose. This behaviour is best described as:",
            options: [
                { id: "a", text: "Addiction (opioid use disorder)" },
                { id: "b", text: "Physical dependence on the opioid" },
                { id: "c", text: "Pseudoaddiction from undertreated pain" },
                { id: "d", text: "Drug diversion to another person" }
            ],
            correct: "c",
            rationale: {
                correct: "Clock-watching and requesting by name in a patient whose documented pain scores remain high point to undertreatment. Pseudoaddiction resolves once the pain is adequately controlled, which is the separating test.",
                a: "Addiction is compulsive use despite harm and use for reasons other than relief. Nothing here shows that.",
                b: "Physical dependence shows itself as withdrawal when the drug stops, not as requesting doses early.",
                d: "There is no evidence of diverting medication to someone else."
            },
            testTakingTip: "Ask whether the behaviour is aimed at relief or at the drug, then treat the pain and watch.",
            guideSection: "Section 08: Tolerance, dependence, addiction",
            guideSectionId: "tolerance-dependence"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old is one day post-appendectomy, lying very still, refusing to move, with a furrowed brow and legs drawn up. Which assessment tool is most appropriate?",
            options: [
                { id: "a", text: "Numeric rating scale, 0 to 10" },
                { id: "b", text: "FLACC behavioural scale" },
                { id: "c", text: "CPOT behavioural scale" },
                { id: "d", text: "PAINAD observational scale" }
            ],
            correct: "b",
            keepAcronyms: ["FLACC", "CPOT", "PAINAD"],
            rationale: {
                correct: "The Face, Legs, Activity, Cry and Consolability (FLACC) scale is used for infants and nonverbal children from 2 months to 7 years. A young child who is guarding and will not move is a behavioural presentation of pain.",
                a: "Numeric self-report is used for verbal adults and children roughly 8 and over.",
                c: "The Critical-Care Pain Observation Tool (CPOT) is for intubated or unconscious adults in intensive care.",
                d: "The Pain Assessment in Advanced Dementia (PAINAD) scale is for nonverbal adults with advanced dementia."
            },
            testTakingTip: "Can they tell you decides the tool. Age and consciousness pick which behavioural scale.",
            guideSection: "Section 03: Assessment and picking the tool",
            guideSectionId: "assessment"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with chronic low back pain of 4 years rates the pain 8 out of 10. The heart rate is 72, the blood pressure is 124/78, and the patient is calmly watching television. What is the most appropriate nursing interpretation?",
            options: [
                { id: "a", text: "The pain report is exaggerated, because the vital signs and behaviour are normal" },
                { id: "b", text: "The pain is 8 out of 10; self-report is the standard, and chronic pain does not raise vital signs" },
                { id: "c", text: "The patient is displaying drug-seeking behaviour, because the score does not match" },
                { id: "d", text: "A behavioural pain scale should be used to verify the self-reported score" }
            ],
            correct: "b",
            rationale: {
                correct: "The body adapts within days, so chronic pain typically presents with normal vital signs and a composed appearance. Self-report remains the standard, and the documented score is 8 out of 10.",
                a: "Vital signs cannot rule pain in or out, and they are least useful in chronic pain.",
                c: "Nothing in the stem shows compulsive use, craving or use despite harm.",
                d: "Behavioural tools are for patients who cannot self-report, not to check up on patients who can."
            },
            testTakingTip: "Normal vitals plus a high score is the classic chronic pain stem. Believe the number.",
            guideSection: "Section 03: Assessment and picking the tool",
            guideSectionId: "assessment"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient received an oral opioid at 09:00 and an IV opioid at 13:00. When should each pain reassessment be documented?",
            options: [
                { id: "a", text: "09:15 and 14:00" },
                { id: "b", text: "09:45 and 13:15" },
                { id: "c", text: "11:00 and 15:00" },
                { id: "d", text: "At the next scheduled vital sign check for both" }
            ],
            correct: "b",
            rationale: {
                correct: "Reassess 45 to 60 minutes after an oral dose and 15 to 30 minutes after an intravenous dose. Those intervals match when each route reaches peak effect, and oral drugs have not peaked at 30 minutes.",
                a: "The intervals are reversed. IV peaks faster than oral, not slower.",
                c: "Both are too late to catch an ineffective dose or a developing adverse effect.",
                d: "Reassessment is tied to the route and the peak effect, not to the vital sign schedule."
            },
            testTakingTip: "45 to 60 minutes oral, 15 to 30 minutes IV. Chart the score before and after.",
            guideSection: "Section 03: Assessment and picking the tool",
            guideSectionId: "assessment"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "An 82-year-old with osteoarthritis, chronic kidney disease and a history of gastrointestinal bleeding needs better pain control. Which prescription should the nurse question?",
            options: [
                { id: "a", text: "Scheduled acetaminophen at a reduced daily ceiling" },
                { id: "b", text: "Naproxen twice daily for ongoing use" },
                { id: "c", text: "A topical agent applied to the affected joints" },
                { id: "d", text: "A low-dose oral opioid with a bowel regimen" }
            ],
            correct: "b",
            rationale: {
                correct: "Nonsteroidal anti-inflammatory drugs (NSAIDs) carry gastrointestinal bleeding, kidney and cardiovascular risks that are all magnified in an older adult with kidney disease and a prior bleed. Ongoing naproxen is the prescription to question.",
                a: "Acetaminophen at a reduced ceiling is a reasonable base in this patient.",
                c: "Topical agents give local relief with much less systemic exposure.",
                d: "A cautious low starting dose with a bowel regimen is appropriate, with sedation monitoring."
            },
            testTakingTip: "Match the drug to the organ that is already struggling.",
            guideSection: "Section 10: Special populations",
            guideSectionId: "special-populations"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient who takes long-acting oxycodone twice daily at home is admitted with a fractured femur. Which approach to pain control is correct?",
            options: [
                { id: "a", text: "Stop the home opioid and start over with a low dose to avoid oversedation" },
                { id: "b", text: "Continue the home baseline dose and add analgesia for the acute injury" },
                { id: "c", text: "Give only non-opioid analgesics, because the patient is already tolerant" },
                { id: "d", text: "Substitute nalbuphine for the home opioid" }
            ],
            correct: "b",
            rationale: {
                correct: "An opioid-tolerant patient needs the usual baseline dose continued, with additional analgesia layered on top for the new acute pain. Stopping the baseline produces withdrawal plus uncontrolled pain.",
                a: "Stopping a long-term opioid abruptly causes withdrawal and does not treat the fracture pain.",
                c: "Non-opioids alone will not control severe fracture pain in a tolerant patient.",
                d: "Mixed agonist-antagonists such as nalbuphine or butorphanol can precipitate withdrawal in an opioid-dependent patient."
            },
            testTakingTip: "Baseline plus acute relief. Never one instead of the other.",
            guideSection: "Section 10: Special populations",
            guideSectionId: "special-populations"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A family member of a dying patient asks the nurse not to give more morphine, saying, \"I do not want it to shorten the time we have.\" The patient is grimacing and restless. What is the best nursing response?",
            options: [
                { id: "a", text: "\"You are right, we will hold the morphine for now and use repositioning and music instead.\"" },
                { id: "b", text: "\"Doses titrated to relieve his pain are appropriate, and comfort is our goal. Let me explain how we monitor him.\"" },
                { id: "c", text: "\"Only the doctor can make that decision, so I will call and let them talk with you.\"" },
                { id: "d", text: "\"Pain medication never affects breathing at the end of life, so there is nothing to worry about.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The intent is relief, and opioids titrated to comfort at the end of life are appropriate care. Acknowledging the fear and explaining the plan and the monitoring addresses the family concern without leaving the patient in pain.",
                a: "Withholding analgesia from a visibly suffering patient because of that fear is exactly the error to avoid.",
                c: "Deferring the whole conversation avoids the family's concern and delays comfort.",
                d: "Overstating safety is inaccurate and damages trust. Opioids do affect respiration; the point is that relieving suffering is the goal and doses are titrated."
            },
            testTakingTip: "Fear of hastening death is not a reason to undertreat pain at the end of life.",
            guideSection: "Section 10: Special populations",
            guideSectionId: "special-populations"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which nursing action best reflects multimodal analgesia for a patient one day after abdominal surgery?",
            options: [
                { id: "a", text: "Doubling the as-needed opioid dose whenever the pain score stays high after surgery" },
                { id: "b", text: "Giving scheduled acetaminophen and an anti-inflammatory, with the opioid for breakthrough pain and incision splinting" },
                { id: "c", text: "Offering distraction, music, and guided imagery instead of the prescribed analgesic" },
                { id: "d", text: "Waiting until the pain reaches 8 out of 10 before giving any of the prescribed medication" }
            ],
            correct: "b",
            rationale: {
                correct: "Multimodal analgesia combines mechanisms: a scheduled non-opioid base, an opioid for breakthrough pain, and non-drug measures. Less opioid means less sedation, less constipation and less risk.",
                a: "Raising the opioid alone adds side effects without adding a new mechanism, and nurses do not change doses independently.",
                c: "Non-drug measures go alongside prescribed analgesia, never in place of it.",
                d: "Pain is easier to prevent than to chase, so waiting for severe pain is the wrong approach."
            },
            testTakingTip: "Add a mechanism, not a milligram.",
            guideSection: "Section 09: Adjuvants and multimodal analgesia",
            guideSectionId: "adjuvants"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching a patient newly prescribed a transdermal fentanyl patch for stable chronic cancer pain. Which statement indicates that the teaching was effective?",
            options: [
                { id: "a", text: "\"I will use a heating pad over the patch if the area feels sore.\"" },
                { id: "b", text: "\"I will use this patch whenever my pain suddenly flares up.\"" },
                { id: "c", text: "\"I will avoid heat over the patch and call if I develop a fever.\"" },
                { id: "d", text: "\"I can cut the patch in half if the dose feels too strong.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "Heat increases absorption from the patch and can cause overdose, so heating pads, hot baths and saunas are avoided, and fever should be reported.",
                a: "A heating pad over the patch raises absorption and is a classic overdose scenario.",
                b: "The patch is for stable chronic pain, not for breakthrough or acute pain, and it is not for opioid-naive patients.",
                d: "Patches are never cut. Altering one can release the drug unpredictably."
            },
            testTakingTip: "Heat plus a fentanyl patch equals more drug absorbed. Report fever.",
            guideSection: "Section 05: Opioids",
            guideSectionId: "opioids"
        }
    ]
};
