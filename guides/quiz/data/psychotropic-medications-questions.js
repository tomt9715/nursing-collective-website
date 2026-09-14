/**
 * Psychotropic Medications Quiz - Question Data
 * Questions covering antipsychotics and extrapyramidal effects, neuroleptic
 * malignant syndrome versus serotonin syndrome, clozapine monitoring,
 * antidepressant classes and MAOI teaching, lithium and the anticonvulsant
 * mood stabilizers, and anxiolytics.
 */

/* exported psychotropicMedicationsQuizData */
var psychotropicMedicationsQuizData = {
    guideName: "Psychotropic Medications",
    guideSlug: "psychotropic-medications",
    category: "Pharmacology",
    categoryColor: "#2fa866",
    estimatedMinutes: 18,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Three days after starting haloperidol, a patient paces the hallway continuously and says, \"I cannot sit still, it is in my legs and it is driving me out of my mind.\" What should the nurse do?",
            options: [
                { id: "a", text: "Reassure the patient that anxiety is common early in treatment and offer relaxation techniques" },
                { id: "b", text: "Recognize this as akathisia and notify the prescriber" },
                { id: "c", text: "Document that the patient is experiencing worsening psychosis" },
                { id: "d", text: "Encourage the patient to remain in their room to reduce stimulation" }
            ],
            correct: "b",
            rationale: {
                correct: "Motor restlessness the patient locates in the body, beginning days after an antipsychotic, is akathisia. It is a drug effect that needs a dose reduction, a change of agent, or an added medication, so the prescriber is notified.",
                a: "Treating akathisia as anxiety leaves the cause running. The distress is motor, not cognitive, and relaxation will not touch it.",
                c: "Akathisia is a medication effect, not a symptom of the illness. Calling it psychosis risks a dose increase, which makes it worse.",
                d: "Isolation does not relieve akathisia and removes observation at the moment it is most needed."
            },
            testTakingTip: "Distress in the legs is akathisia. Distress in the thoughts is anxiety.",
            guideSection: "Section 04: Four movement problems, told apart",
            guideSectionId: "movement"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient taking an antipsychotic has a temperature of 40.1 degrees Celsius, blood pressure swinging between 90/50 and 160/95, and uniform resistance through the full range of motion in all limbs. Reflexes are sluggish. Symptoms developed over four days. Which condition is most likely?",
            options: [
                { id: "a", text: "Severe serotonin syndrome" },
                { id: "b", text: "Neuroleptic malignant syndrome" },
                { id: "c", text: "Acute dystonic reaction" },
                { id: "d", text: "Late-onset tardive dyskinesia" }
            ],
            correct: "b",
            rationale: {
                correct: "Onset over days, lead-pipe rigidity and sluggish reflexes, with fever and autonomic instability on a dopamine-blocking drug, is neuroleptic malignant syndrome.",
                a: "Serotonin syndrome develops within hours, and it produces clonus and brisk reflexes rather than sluggish ones.",
                c: "Acute dystonia is a sustained spasm of specific muscle groups, without fever or autonomic instability.",
                d: "Tardive dyskinesia is involuntary movement developing over months, and it does not cause fever."
            },
            testTakingTip: "Slow and stiff with sluggish reflexes is neuroleptic malignant syndrome.",
            guideSection: "Section 05: The two hyperthermic emergencies",
            guideSectionId: "emergencies"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient taking sertraline was started on a second serotonergic medication yesterday. Today they are agitated and diaphoretic with a temperature of 38.9 degrees Celsius, dilated pupils, hyperactive bowel sounds, and sustained clonus at both ankles. Which condition is most likely?",
            options: [
                { id: "a", text: "Neuroleptic malignant syndrome" },
                { id: "b", text: "Anticholinergic toxicity" },
                { id: "c", text: "Serotonin syndrome" },
                { id: "d", text: "Antidepressant discontinuation syndrome" }
            ],
            correct: "c",
            rationale: {
                correct: "Onset within 24 hours of adding a serotonergic drug, with clonus, hyperreflexia, dilated pupils and hyperactive bowel sounds, is serotonin syndrome.",
                a: "Neuroleptic malignant syndrome builds over days to weeks and produces lead-pipe rigidity with sluggish reflexes.",
                b: "Anticholinergic toxicity gives dry skin and absent bowel sounds, not diaphoresis and hyperactive bowel sounds.",
                d: "Discontinuation syndrome follows stopping a drug, not adding one, and it does not cause high fever with clonus."
            },
            testTakingTip: "Fast and twitchy with big pupils and loud bowel sounds is serotonin syndrome.",
            guideSection: "Section 05: The two hyperthermic emergencies",
            guideSectionId: "emergencies"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on lithium reports two days of vomiting and diarrhea from a stomach virus. The serum lithium level is 1.8 mEq/L. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Administer the scheduled dose and encourage oral fluids" },
                { id: "b", text: "Hold the dose and notify the prescriber" },
                { id: "c", text: "Encourage a low-sodium diet until the level falls" },
                { id: "d", text: "Recheck the level in 24 hours before taking any action" }
            ],
            correct: "b",
            rationale: {
                correct: "A level above 1.5 mEq/L is toxic. Fluid and sodium loss from vomiting and diarrhea causes the kidney to retain lithium, so the dose is held and the prescriber notified immediately.",
                a: "Giving another dose at a toxic level drives the level higher.",
                c: "Restricting sodium raises lithium retention further. Steady sodium intake is what protects the patient.",
                d: "Waiting a day with a toxic level and ongoing losses allows progression to severe toxicity."
            },
            testTakingTip: "Anything that drops salt or water raises the lithium level.",
            guideSection: "Section 08: Mood stabilizers",
            guideSectionId: "mood-stabilizers"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient is starting clozapine. Which monitoring schedule for the absolute neutrophil count is correct?",
            options: [
                { id: "a", text: "Weekly for 6 months, then every 2 weeks for 6 months, then monthly" },
                { id: "b", text: "Monthly from initiation for the first year, then every 6 months" },
                { id: "c", text: "Every 2 weeks for the first month, then annually" },
                { id: "d", text: "Only when the patient reports symptoms of infection" }
            ],
            correct: "a",
            rationale: {
                correct: "The prescribing information schedule is weekly for the first 6 months, every 2 weeks for the next 6 months, and monthly thereafter, provided counts remain normal. Risk of severe neutropenia is highest in the first 18 weeks.",
                b: "Monthly monitoring from the start would miss the period of highest risk.",
                c: "This is far less frequent than required and leaves the patient unmonitored through the highest-risk window.",
                d: "Symptom-triggered testing is not sufficient. Neutropenia can develop before any symptom appears."
            },
            testTakingTip: "Weekly for 6 months, every 2 weeks for 6 months, then monthly.",
            guideSection: "Section 06: Clozapine, on its own",
            guideSectionId: "clozapine"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient taking clozapine calls the clinic reporting a fever of 38.4 degrees Celsius and a sore throat. What should the nurse do?",
            options: [
                { id: "a", text: "Advise rest, fluids and acetaminophen, and call back if symptoms persist a week" },
                { id: "b", text: "Arrange for an absolute neutrophil count to be drawn now and notify the prescriber" },
                { id: "c", text: "Instruct the patient to stop clozapine and restart when the infection clears" },
                { id: "d", text: "Reassure the patient that upper respiratory infections are unrelated to clozapine" }
            ],
            correct: "b",
            rationale: {
                correct: "Fever and sore throat in a patient on clozapine may be the first sign of severe neutropenia. The neutrophil count is checked immediately and the prescriber notified.",
                a: "Waiting a week with possible agranulocytosis risks overwhelming infection.",
                c: "Nurses do not direct patients to stop clozapine independently, and a gap over 30 days would force the monitoring schedule to restart at weekly.",
                d: "Clozapine causes severe neutropenia, so infection symptoms are directly relevant and are never dismissed."
            },
            testTakingTip: "On clozapine, a sore throat is a laboratory order.",
            guideSection: "Section 06: Clozapine, on its own",
            guideSectionId: "clozapine"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient who has taken an antipsychotic for three years develops repetitive lip smacking, tongue protrusion and chewing movements. What should the nurse do?",
            options: [
                { id: "a", text: "Administer benztropine as prescribed for extrapyramidal symptoms" },
                { id: "b", text: "Report the findings to the prescriber promptly, as this may be irreversible" },
                { id: "c", text: "Reassure the patient that these movements resolve when the dose is increased" },
                { id: "d", text: "Document the finding and reassess at the next quarterly visit" }
            ],
            correct: "b",
            rationale: {
                correct: "Involuntary oral and facial movements after long-term antipsychotic use are tardive dyskinesia. It may be permanent, and the chance of reversal falls the longer it continues, so it is reported promptly.",
                a: "Anticholinergics do not treat tardive dyskinesia and can worsen it. This is a classic wrong answer.",
                c: "Increasing the dose may mask the movements briefly while worsening the underlying problem.",
                d: "Waiting a quarter wastes the window in which the drug regimen could be changed."
            },
            testTakingTip: "Benztropine for tardive dyskinesia is always wrong.",
            guideSection: "Section 04: Four movement problems, told apart",
            guideSectionId: "movement"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Six hours after a first dose of haloperidol, a patient has a severely stiff jaw, a neck twisted to one side, and difficulty swallowing. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Administer the prescribed anticholinergic by injection and stay with the patient" },
                { id: "b", text: "Withhold the next dose and document the finding for morning rounds" },
                { id: "c", text: "Apply warm compresses to the neck and reassess in an hour" },
                { id: "d", text: "Place the patient on seizure precautions" }
            ],
            correct: "a",
            rationale: {
                correct: "This is an acute dystonic reaction. It is an emergency because the spasm can involve the larynx and compromise the airway. An anticholinergic such as benztropine or diphenhydramine is given by injection, and the nurse stays with the patient.",
                b: "Documenting and waiting leaves a potential airway emergency untreated.",
                c: "Compresses do nothing for a dystonic reaction and delay the treatment that works.",
                d: "This is muscle spasm, not seizure activity. Seizure precautions do not address it."
            },
            testTakingTip: "Dystonia within hours of a dose is an airway emergency.",
            guideSection: "Section 04: Four movement problems, told apart",
            guideSectionId: "movement"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient taking phenelzine asks about food choices. Which statement indicates that teaching was effective?",
            options: [
                { id: "a", text: "\"I will avoid aged cheese, salami, sauerkraut and tap beer.\"" },
                { id: "b", text: "\"I need to limit fresh chicken, rice and green beans.\"" },
                { id: "c", text: "\"I should avoid grapefruit juice but everything else is fine.\"" },
                { id: "d", text: "\"I can eat anything as long as I take the medication with food.\"" }
            ],
            correct: "a",
            rationale: {
                correct: "Tyramine accumulates in aged, fermented, cured and spoiled foods. Aged cheeses, cured meats, fermented vegetables and tap beer are classic sources, and they can precipitate a hypertensive crisis.",
                b: "Fresh, unprocessed foods are low in tyramine and are not restricted.",
                c: "Grapefruit affects other drugs. The monoamine oxidase inhibitor (MAOI) restriction is tyramine, and it is far broader than one juice.",
                d: "Taking the drug with food does not prevent a tyramine reaction."
            },
            testTakingTip: "Aged, fermented, cured or spoiled. Fresh food is generally fine.",
            guideSection: "Section 07: Antidepressants",
            guideSectionId: "antidepressants"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient has been taking fluoxetine and is being switched to a monoamine oxidase inhibitor (MAOI). How long should the washout period be?",
            options: [
                { id: "a", text: "3 days" },
                { id: "b", text: "1 week" },
                { id: "c", text: "2 weeks" },
                { id: "d", text: "5 weeks" }
            ],
            correct: "d",
            rationale: {
                correct: "Fluoxetine and its active metabolite have unusually long half-lives, so about 5 weeks is required before starting a monoamine oxidase inhibitor (MAOI). Starting sooner risks serotonin syndrome.",
                a: "Three days leaves substantial drug and active metabolite in the body.",
                b: "One week is far too short for fluoxetine specifically.",
                c: "Two weeks is the usual washout for most other antidepressants, but fluoxetine is the exception."
            },
            testTakingTip: "Two weeks is the rule. Fluoxetine is the five-week exception.",
            guideSection: "Section 07: Antidepressants",
            guideSectionId: "antidepressants"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A severely depressed patient who has been withdrawn and tearful for weeks appears noticeably calm and bright this morning, and has begun giving away personal belongings. What should the nurse do?",
            options: [
                { id: "a", text: "Document the improvement and reduce the frequency of observation" },
                { id: "b", text: "Praise the patient for progress and encourage participation in group activities" },
                { id: "c", text: "Ask the patient directly about suicidal thoughts and a plan, and maintain close observation" },
                { id: "d", text: "Notify the prescriber that the antidepressant can likely be tapered" }
            ],
            correct: "c",
            rationale: {
                correct: "A sudden lift in a severely depressed patient, especially with giving away possessions, suggests a decision has been made. Energy and initiative return before hopelessness lifts, so risk rises. Ask directly and keep close observation.",
                a: "Reducing observation at the moment risk peaks is the most dangerous option here.",
                b: "Praising the change without assessing it misses the warning entirely.",
                d: "Tapering treatment during a period of heightened risk is unsafe and is not a nursing decision."
            },
            testTakingTip: "Sudden peace after prolonged anguish raises risk rather than lowering it.",
            guideSection: "Section 07: Antidepressants",
            guideSectionId: "antidepressants"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient taking lamotrigine calls to report a new rash on the trunk that appeared today. What should the nurse instruct?",
            options: [
                { id: "a", text: "Continue the medication and apply a topical antihistamine" },
                { id: "b", text: "Hold the dose and contact the prescriber today" },
                { id: "c", text: "Take an oral antihistamine and monitor the rash for one week" },
                { id: "d", text: "Reduce the dose by half and continue monitoring" }
            ],
            correct: "b",
            rationale: {
                correct: "Any new rash on lamotrigine may be the beginning of Stevens-Johnson syndrome, and benign and dangerous rashes cannot be distinguished early. The dose is held and the prescriber contacted immediately.",
                a: "Continuing the drug through a rash risks progression to a life-threatening skin reaction.",
                c: "Watching for a week is exactly the delay that makes these reactions fatal.",
                d: "Nurses do not adjust doses independently, and a lower dose does not make the reaction safe."
            },
            testTakingTip: "Lamotrigine plus any rash means stop and call. No exceptions.",
            guideSection: "Section 08: Mood stabilizers",
            guideSectionId: "mood-stabilizers"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is prescribed buspirone for generalized anxiety disorder. Which statement indicates a correct understanding?",
            options: [
                { id: "a", text: "\"I will take it only when I feel a panic attack starting.\"" },
                { id: "b", text: "\"I will take it every day and expect it to help after a few weeks.\"" },
                { id: "c", text: "\"I should not drive because it will make me very drowsy.\"" },
                { id: "d", text: "\"I must taper it slowly or I could have a seizure.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Buspirone is taken on a fixed schedule and takes about 2 to 4 weeks to produce an effect. Patients who expect immediate relief usually abandon it in the first week.",
                a: "Buspirone has no immediate effect, so it is useless as an as-needed medication for acute anxiety.",
                c: "Buspirone causes little sedation. That profile is one of its main advantages over benzodiazepines.",
                d: "Buspirone does not cause physical dependence or a withdrawal seizure syndrome. That risk belongs to benzodiazepines."
            },
            testTakingTip: "Buspirone does nothing tonight, so it is never as needed.",
            guideSection: "Section 09: Anxiolytics and sedatives",
            guideSectionId: "anxiolytics"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient who has taken alprazolam daily for two years tells the nurse they plan to stop it this week because they feel better. What is the most important response?",
            options: [
                { id: "a", text: "\"That sounds reasonable, since it was only meant to be short term.\"" },
                { id: "b", text: "\"Stopping suddenly can cause seizures, so this needs a tapering plan from your prescriber.\"" },
                { id: "c", text: "\"You can stop it whenever you like, but expect some rebound anxiety.\"" },
                { id: "d", text: "\"Cut the dose in half for a few days and then stop completely.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Abrupt discontinuation after long-term benzodiazepine use can cause withdrawal seizures and can be fatal. A prescriber-directed taper is required.",
                a: "Agreeing that it can simply be stopped ignores a potentially lethal withdrawal syndrome.",
                c: "This understates the risk. Withdrawal is far more serious than rebound anxiety.",
                d: "Nurses do not design taper schedules, and halving the dose over a few days is still abrupt for two years of use."
            },
            testTakingTip: "Long-standing benzodiazepine plus abrupt stop is always wrong.",
            guideSection: "Section 09: Anxiolytics and sedatives",
            guideSectionId: "anxiolytics"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient started on an antipsychotic five days ago tells the nurse, \"This is not working, I still hear the voices. I am going to stop taking it.\" What is the best response?",
            options: [
                { id: "a", text: "\"I will ask the prescriber to increase the dose today.\"" },
                { id: "b", text: "\"You are right that five days is long enough to know it has failed.\"" },
                { id: "c", text: "\"Agitation and sleep improve first. The voices usually take several weeks to fade.\"" },
                { id: "d", text: "\"Try to stay on it, and we can talk about it if you still feel this way in a month.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "Antipsychotics settle agitation, hostility and sleep within hours to days, but hallucinations and delusions take weeks to respond. Explaining the timeline is what keeps the patient on the drug long enough for it to work.",
                a: "A dose increase at day five is premature and adds side effects without allowing time for effect.",
                b: "Five days is far too early to call an antipsychotic a failure.",
                d: "This dismisses a real concern and offers no information, which is how patients end up stopping on their own."
            },
            testTakingTip: "Impatience is the wrong answer. Agitation first, psychosis in weeks.",
            guideSection: "Section 03: Antipsychotics",
            guideSectionId: "antipsychotics"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with schizophrenia, obesity and type 2 diabetes needs an antipsychotic. Which agent would the nurse anticipate being questioned as the least appropriate choice?",
            options: [
                { id: "a", text: "Aripiprazole" },
                { id: "b", text: "Olanzapine" },
                { id: "c", text: "Ziprasidone" },
                { id: "d", text: "Haloperidol" }
            ],
            correct: "b",
            rationale: {
                correct: "Olanzapine carries among the highest risk of weight gain, hyperglycemia and dyslipidemia in the class, which is the worst possible match for a patient who already has obesity and diabetes.",
                a: "Aripiprazole is relatively weight neutral compared with olanzapine.",
                c: "Ziprasidone has a low metabolic burden, though it requires attention to the QT interval.",
                d: "Haloperidol carries a high movement risk rather than a high metabolic one, so it is not the metabolic concern here."
            },
            testTakingTip: "Typicals cost movement, atypicals cost metabolism. Ask what the patient cannot afford.",
            guideSection: "Section 03: Antipsychotics",
            guideSectionId: "antipsychotics"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient on maintenance lithium is scheduled for a morning serum level. When should the specimen be drawn?",
            options: [
                { id: "a", text: "Immediately after the morning dose is taken" },
                { id: "b", text: "About 12 hours after the last dose, before the morning dose" },
                { id: "c", text: "About four hours after the morning dose is taken" },
                { id: "d", text: "At any time of day, since lithium levels remain constant" }
            ],
            correct: "b",
            rationale: {
                correct: "Lithium levels are drawn about 12 hours after the last dose, conventionally in the morning before the next dose is given. That timing is what makes results comparable between draws.",
                a: "Drawing after the dose captures a peak and gives a falsely high result.",
                c: "Four hours is still within the absorption and distribution window and does not reflect the trough.",
                d: "Lithium levels vary considerably through the dosing interval, so timing is essential."
            },
            testTakingTip: "Twelve hours after the last dose, before the next one.",
            guideSection: "Section 08: Mood stabilizers",
            guideSectionId: "mood-stabilizers"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a seizure disorder and a history of bulimia nervosa is being considered for an antidepressant. Which agent is contraindicated?",
            options: [
                { id: "a", text: "Sertraline" },
                { id: "b", text: "Bupropion" },
                { id: "c", text: "Mirtazapine" },
                { id: "d", text: "Duloxetine" }
            ],
            correct: "b",
            rationale: {
                correct: "Bupropion lowers the seizure threshold, and the risk is amplified in eating disorders where electrolyte disturbance and purging are common. It is avoided in both conditions in this patient.",
                a: "Sertraline is a first-line option and is commonly used in bulimia nervosa.",
                c: "Mirtazapine increases appetite and sleep and does not carry this seizure concern.",
                d: "Duloxetine is not contraindicated by either condition here."
            },
            testTakingTip: "Bupropion plus seizures or an eating disorder is a contraindication pairing.",
            guideSection: "Section 07: Antidepressants",
            guideSectionId: "antidepressants"
        },
        {
            id: 19,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient stopped paroxetine abruptly four days ago and reports dizziness, nausea, irritability, vivid dreams and brief electric-shock sensations. How should the nurse interpret this?",
            options: [
                { id: "a", text: "Relapse of the underlying major depressive disorder" },
                { id: "b", text: "Psychological addiction to the antidepressant" },
                { id: "c", text: "Antidepressant discontinuation syndrome after abrupt cessation" },
                { id: "d", text: "Serotonin syndrome from excess serotonin activity" }
            ],
            correct: "c",
            rationale: {
                correct: "Discontinuation syndrome appears within days of stopping, and paroxetine is a frequent cause because it clears quickly. It resolves when the drug is restarted and then tapered properly.",
                a: "Depression does not relapse within four days, and electric-shock sensations are not a depressive symptom.",
                b: "Discontinuation symptoms are physiologic, not addiction. There is no craving or compulsive use.",
                d: "Serotonin syndrome follows adding or increasing serotonergic drugs, not stopping them, and it causes fever and clonus."
            },
            testTakingTip: "Within days of stopping is discontinuation. Within hours of adding is serotonin syndrome.",
            guideSection: "Section 07: Antidepressants",
            guideSectionId: "antidepressants"
        },
        {
            id: 20,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is caring for four patients on psychotropic medications. Which patient requires assessment FIRST?",
            options: [
                { id: "a", text: "A patient on lithium whose level is 0.9 mEq/L and who reports a fine hand tremor" },
                { id: "b", text: "A patient on an antipsychotic with a temperature of 39.8 degrees Celsius and rigid limbs" },
                { id: "c", text: "A patient on sertraline who reports nausea after the morning dose" },
                { id: "d", text: "A patient on olanzapine who has gained 4 pounds this month" }
            ],
            correct: "b",
            rationale: {
                correct: "Fever with rigidity in a patient on an antipsychotic is neuroleptic malignant syndrome until proven otherwise. It is life threatening and it outranks everything else in this group.",
                a: "A level of 0.9 is therapeutic, and a fine hand tremor is an expected effect rather than toxicity. A coarse tremor would be the concern.",
                c: "Early nausea on a selective serotonin reuptake inhibitor (SSRI) is common and usually settles within the first weeks.",
                d: "Weight gain on olanzapine matters and needs addressing, but it is not the immediate priority."
            },
            testTakingTip: "Fever plus rigidity on an antipsychotic outranks every other option.",
            guideSection: "Section 10: What you do first",
            guideSectionId: "interventions"
        }
    ]
};
