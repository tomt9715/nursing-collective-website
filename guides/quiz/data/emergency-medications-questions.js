/**
 * Emergency Medications Quiz - Question Data
 * Questions covering cardiac arrest algorithms, rhythm drugs and technique,
 * vasopressors and extravasation, antidotes, anaphylaxis, hyperkalemia,
 * hypoglycemia, status epilepticus and administration safety.
 */

/* exported emergencyMedicationsQuizData */
var emergencyMedicationsQuizData = {
    guideName: "Emergency Medications",
    guideSlug: "emergency-medications",
    category: "Pharmacology",
    categoryColor: "#2fa866",
    estimatedMinutes: 18,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient becomes unresponsive and pulseless. The monitor shows ventricular fibrillation. What should the team do FIRST?",
            options: [
                { id: "a", text: "Administer epinephrine 1 mg IV" },
                { id: "b", text: "Defibrillate, then immediately resume compressions" },
                { id: "c", text: "Administer amiodarone 300 mg IV" },
                { id: "d", text: "Perform synchronized cardioversion" }
            ],
            correct: "b",
            rationale: {
                correct: "Ventricular fibrillation is a shockable rhythm, and defibrillation is the treatment. Compressions resume immediately after the shock. Drugs support the algorithm but do not convert the rhythm.",
                a: "Epinephrine is given during the arrest, but it does not convert ventricular fibrillation and it does not precede defibrillation.",
                c: "Amiodarone is given after shocks have failed, not before the first one.",
                d: "Synchronization requires an R wave to time to. In ventricular fibrillation there is none, and the machine will not discharge."
            },
            testTakingTip: "Shockable rhythm means electricity first, syringe second.",
            guideSection: "Section 03: Cardiac arrest",
            guideSectionId: "arrest"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A pulseless patient is in asystole confirmed in two leads. Which intervention is appropriate?",
            options: [
                { id: "a", text: "Defibrillate at the highest available setting" },
                { id: "b", text: "Perform synchronized cardioversion" },
                { id: "c", text: "High-quality compressions with epinephrine 1 mg every 3 to 5 minutes" },
                { id: "d", text: "Administer adenosine 6 mg by rapid IV push" }
            ],
            correct: "c",
            rationale: {
                correct: "Asystole is not shockable. Treatment is high-quality compressions, epinephrine every 3 to 5 minutes, and an active search for a reversible cause.",
                a: "There is no organized electrical activity to reset, so a shock accomplishes nothing and interrupts compressions.",
                b: "Cardioversion requires a pulse and an R wave to synchronize to.",
                d: "Adenosine treats stable narrow-complex tachycardia, not asystole."
            },
            testTakingTip: "Never shock asystole. That option is always wrong.",
            guideSection: "Section 03: Cardiac arrest",
            guideSectionId: "arrest"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient has symptomatic bradycardia with a heart rate of 38, blood pressure 78/44 and confusion. Which order should the nurse anticipate?",
            options: [
                { id: "a", text: "Atropine 0.5 mg IV once" },
                { id: "b", text: "Atropine 1 mg IV, repeated every 3 to 5 minutes to a maximum of 3 mg" },
                { id: "c", text: "Adenosine 6 mg by rapid IV push" },
                { id: "d", text: "Amiodarone 300 mg IV push" }
            ],
            correct: "b",
            rationale: {
                correct: "The current recommendation is 1 mg as the first dose, repeated every 3 to 5 minutes to a maximum of 3 mg. Doses below 1 mg can produce a paradoxical further slowing of the heart rate.",
                a: "Sub-milligram dosing was dropped for exactly this reason. It can worsen the bradycardia.",
                c: "Adenosine slows conduction further and is used for tachycardia, not bradycardia.",
                d: "Amiodarone is an antiarrhythmic for ventricular rhythms and would not help a symptomatic bradycardia."
            },
            testTakingTip: "Atropine starts at a full 1 mg. Anything smaller is the distractor.",
            guideSection: "Section 04: Too slow, or too fast, with a pulse",
            guideSectionId: "rhythm"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is administering adenosine for stable supraventricular tachycardia. Which technique is correct?",
            options: [
                { id: "a", text: "Dilute in 50 mL of normal saline and infuse over 15 minutes" },
                { id: "b", text: "Push slowly over 2 minutes to reduce patient discomfort" },
                { id: "c", text: "Push over 1 to 2 seconds into the port closest to the patient, followed by a 20 mL saline flush" },
                { id: "d", text: "Give intramuscularly into the deltoid" }
            ],
            correct: "c",
            rationale: {
                correct: "Adenosine has a half-life under 10 seconds. It must reach the heart as a bolus, so it is pushed over 1 to 2 seconds into the closest port and chased immediately with 20 mL of saline.",
                a: "An infusion allows the drug to be metabolized before it ever reaches the heart.",
                b: "A slow push is functionally the same as not giving the drug at all.",
                d: "Adenosine is given intravenously. There is no intramuscular route for it."
            },
            testTakingTip: "Slow adenosine is no adenosine.",
            guideSection: "Section 04: Too slow, or too fast, with a pulse",
            guideSectionId: "rhythm"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a potassium of 7.2 mEq/L has peaked T waves and a widening QRS on the monitor. Which medication should the nurse anticipate giving FIRST?",
            options: [
                { id: "a", text: "Regular insulin with dextrose 50%" },
                { id: "b", text: "Calcium gluconate" },
                { id: "c", text: "Sodium polystyrene sulfonate" },
                { id: "d", text: "Nebulized albuterol" }
            ],
            correct: "b",
            rationale: {
                correct: "Calcium stabilizes the cardiac membrane and protects against lethal arrhythmia. It does not lower the potassium at all, but it buys the time the other drugs need to work.",
                a: "Insulin with dextrose shifts potassium into cells, and it is the second step rather than the first.",
                c: "Binders remove potassium from the body, which is the slowest step and never the first action.",
                d: "Albuterol also shifts potassium intracellularly, and it belongs in the second step."
            },
            testTakingTip: "Protect, shift, remove. Calcium protects and changes no number.",
            guideSection: "Section 08: Three more emergencies with a drug answer",
            guideSectionId: "metabolic"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient develops wheezing, throat tightness and a blood pressure of 82/40 minutes after an intravenous antibiotic. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Administer intravenous diphenhydramine" },
                { id: "b", text: "Administer intravenous methylprednisolone" },
                { id: "c", text: "Stop the infusion and give intramuscular epinephrine into the vastus lateralis" },
                { id: "d", text: "Begin a normal saline bolus and reassess in 10 minutes" }
            ],
            correct: "c",
            rationale: {
                correct: "Airway involvement or hypotension after an exposure is anaphylaxis, and intramuscular epinephrine into the thigh is the first drug. Stopping the trigger happens at the same moment. Delay in giving epinephrine is the strongest predictor of death.",
                a: "Antihistamines help skin symptoms. They do nothing for airway swelling or hypotension.",
                b: "Steroids act on the later phase and do not treat the immediate reaction.",
                d: "Fluid is an important adjunct for hypotension, but it does not replace epinephrine and waiting 10 minutes is unsafe."
            },
            testTakingTip: "The antihistamine is always the decoy in an anaphylaxis stem.",
            guideSection: "Section 07: Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "An adult weighing 70 kg is in anaphylaxis. Which epinephrine order is appropriate?",
            options: [
                { id: "a", text: "0.5 mg of 1:1,000 intramuscularly into the vastus lateralis" },
                { id: "b", text: "1 mg of 1:10,000 intravenous push" },
                { id: "c", text: "0.5 mg of 1:1,000 subcutaneously into the upper arm" },
                { id: "d", text: "0.3 mg of 1:10,000 intramuscularly into the deltoid" }
            ],
            correct: "a",
            rationale: {
                correct: "Anaphylaxis is treated with 0.01 mg/kg of the 1:1,000 concentration intramuscularly, up to 0.5 mg in an adult, given into the vastus lateralis because it absorbs fastest.",
                b: "The 1:10,000 intravenous dose is the cardiac arrest dose. Giving it to a patient with a pulse risks severe hypertension and arrhythmia.",
                c: "Subcutaneous absorption is too slow and unreliable in a patient who is shutting down peripherally.",
                d: "The deltoid absorbs more slowly than the thigh, and 1:10,000 is the wrong concentration for this route."
            },
            testTakingTip: "1:1,000 intramuscular in the thigh for anaphylaxis. 1:10,000 intravenous for arrest.",
            guideSection: "Section 07: Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Twenty minutes after receiving naloxone for an opioid overdose, a patient is awake, alert and asking to go home. What is the most appropriate nursing action?",
            options: [
                { id: "a", text: "Arrange discharge, since the reversal was successful" },
                { id: "b", text: "Continue close monitoring, because the opioid may outlast the naloxone" },
                { id: "c", text: "Administer a second dose of naloxone prophylactically" },
                { id: "d", text: "Give the prescribed opioid at half the previous dose for comfort" }
            ],
            correct: "b",
            rationale: {
                correct: "Naloxone lasts roughly 30 to 90 minutes, which is shorter than most opioids. The patient can become sedated again once it wears off, so monitoring continues and repeat dosing may be needed.",
                a: "Discharging a reversed patient within the naloxone window is how people are found unresponsive later.",
                c: "Naloxone is given for a clinical indication, not prophylactically, and extra doses worsen withdrawal.",
                d: "Giving more opioid to a patient who just required reversal is unsafe."
            },
            testTakingTip: "The patient who woke up is still a patient.",
            guideSection: "Section 06: The antidote table",
            guideSectionId: "antidotes"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient receiving a peripheral norepinephrine infusion has a pale, cool, swollen area around the intravenous site and the pump is alarming for occlusion. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Flush the catheter with normal saline to clear the occlusion" },
                { id: "b", text: "Increase the infusion rate to maintain blood pressure" },
                { id: "c", text: "Stop the infusion, leave the catheter in place, and notify the provider" },
                { id: "d", text: "Remove the catheter immediately and apply a warm compress" }
            ],
            correct: "c",
            rationale: {
                correct: "Blanching, coolness and swelling indicate extravasation of a vasoconstrictor, which causes tissue necrosis. The infusion is stopped, the catheter is left in place so residual drug can be aspirated and an antidote such as phentolamine can be instilled, and the provider is notified at once.",
                a: "Flushing pushes more vasoconstrictor into the tissue and worsens the injury.",
                b: "Increasing the rate delivers more drug into the tissue rather than the circulation.",
                d: "Removing the catheter first eliminates the route for aspiration and local antidote administration."
            },
            testTakingTip: "Stop the infusion but leave the catheter. That combination is the answer.",
            guideSection: "Section 05: Vasopressors and inotropes",
            guideSectionId: "vasopressors"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient in torsades de pointes with a pulse is being treated. Which medication should the nurse anticipate?",
            options: [
                { id: "a", text: "Magnesium sulfate 1 to 2 g IV" },
                { id: "b", text: "Atropine 1 mg IV" },
                { id: "c", text: "Adenosine 6 mg rapid IV push" },
                { id: "d", text: "Calcium gluconate 1 g IV" }
            ],
            correct: "a",
            rationale: {
                correct: "Magnesium sulfate 1 to 2 g IV is the treatment for torsades de pointes. Correcting low potassium and removing QT-prolonging drugs follows.",
                b: "Atropine treats symptomatic bradycardia and would not address a polymorphic ventricular tachycardia.",
                c: "Adenosine is for narrow-complex supraventricular tachycardia and has no role here.",
                d: "Calcium stabilizes the membrane in hyperkalemia. It is not the treatment for torsades."
            },
            testTakingTip: "Torsades means magnesium. Then look for the low potassium or the QT-prolonging drug.",
            guideSection: "Section 04: Too slow, or too fast, with a pulse",
            guideSectionId: "rhythm"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient has an unstable tachycardia with a pulse, a blood pressure of 76/40 and altered consciousness. Which intervention is indicated?",
            options: [
                { id: "a", text: "Unsynchronized defibrillation" },
                { id: "b", text: "Synchronized cardioversion" },
                { id: "c", text: "Vagal maneuvers followed by observation" },
                { id: "d", text: "A fluid bolus and reassessment in 30 minutes" }
            ],
            correct: "b",
            rationale: {
                correct: "An unstable tachycardia with a pulse is treated with synchronized cardioversion, which times the shock to the R wave. Sedation is given first when time allows.",
                a: "An unsynchronized shock in a patient with a pulse can land on the T wave and induce ventricular fibrillation.",
                c: "Vagal maneuvers are for stable patients. This patient is unstable and needs electricity.",
                d: "Waiting 30 minutes with hypotension and altered consciousness is unsafe."
            },
            testTakingTip: "Unstable with a pulse means synchronized. Pulseless means defibrillate.",
            guideSection: "Section 04: Too slow, or too fast, with a pulse",
            guideSectionId: "rhythm"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient on a heparin infusion develops significant bleeding. Which medication reverses heparin?",
            options: [
                { id: "a", text: "Vitamin K" },
                { id: "b", text: "Protamine sulfate" },
                { id: "c", text: "Fresh frozen plasma alone" },
                { id: "d", text: "Acetylcysteine" }
            ],
            correct: "b",
            rationale: {
                correct: "Protamine sulfate binds heparin and reverses it. It reverses unfractionated heparin well and low molecular weight heparin only partially.",
                a: "Vitamin K reverses warfarin by restoring clotting factor synthesis. It has no effect on heparin.",
                c: "Plasma replaces factors but does not neutralize circulating heparin.",
                d: "Acetylcysteine is the antidote for acetaminophen toxicity."
            },
            testTakingTip: "Protamine for heparin, vitamin K for warfarin. Do not swap them.",
            guideSection: "Section 06: The antidote table",
            guideSectionId: "antidotes"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "An unresponsive patient with diabetes has a blood glucose of 32 mg/dL and no intravenous access. What should the nurse do?",
            options: [
                { id: "a", text: "Place oral glucose gel between the cheek and gum" },
                { id: "b", text: "Administer glucagon intramuscularly" },
                { id: "c", text: "Give 15 grams of juice by mouth" },
                { id: "d", text: "Wait for the provider to place an intravenous line before treating" }
            ],
            correct: "b",
            rationale: {
                correct: "An unresponsive patient cannot protect their airway, so nothing goes in the mouth. Without intravenous access, glucagon is given intramuscularly or subcutaneously to mobilize stored glycogen.",
                a: "Placing anything in the mouth of an unresponsive patient risks aspiration.",
                c: "Oral carbohydrate requires an awake patient who can swallow safely.",
                d: "A glucose of 32 requires immediate treatment. Waiting risks seizure and brain injury."
            },
            testTakingTip: "Can they swallow safely. That question picks the route.",
            guideSection: "Section 08: Three more emergencies with a drug answer",
            guideSectionId: "metabolic"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient has been seizing continuously for six minutes. Which sequence of medications should the nurse anticipate?",
            options: [
                { id: "a", text: "A benzodiazepine first, then a longer-acting anticonvulsant" },
                { id: "b", text: "A longer-acting anticonvulsant first, then a benzodiazepine" },
                { id: "c", text: "A benzodiazepine alone, repeated as needed" },
                { id: "d", text: "Intravenous magnesium followed by calcium gluconate" }
            ],
            correct: "a",
            rationale: {
                correct: "Status epilepticus is treated in two stages. A benzodiazepine aborts the seizure, then a longer-acting agent such as levetiracetam, fosphenytoin or valproate keeps it stopped.",
                b: "Longer-acting agents take too long to load to be the first-line abortive drug.",
                c: "A benzodiazepine alone leaves the patient likely to seize again once it wears off.",
                d: "Magnesium is used for seizures of eclampsia, and calcium is not part of this sequence."
            },
            testTakingTip: "Stop it, then keep it stopped. Two drugs, fixed order.",
            guideSection: "Section 08: Three more emergencies with a drug answer",
            guideSectionId: "metabolic"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is asked to give epinephrine during a cardiac arrest and is handed a vial labeled 1:1,000. What should the nurse do?",
            options: [
                { id: "a", text: "Give 1 mL intravenously, since that equals 1 mg" },
                { id: "b", text: "Verify the concentration, because cardiac arrest uses the 1:10,000 intravenous form" },
                { id: "c", text: "Give the entire vial intravenously to ensure a full dose" },
                { id: "d", text: "Give it intramuscularly into the thigh instead" }
            ],
            correct: "b",
            rationale: {
                correct: "The arrest dose is 1 mg intravenously, normally supplied as the 1:10,000 prefilled syringe containing 1 mg in 10 mL. The 1:1,000 vial is 1 mg per mL and is the intramuscular anaphylaxis concentration. Verifying which one is in hand prevents a tenfold error.",
                a: "The arithmetic happens to work, but proceeding without verifying the intended product is exactly how concentration errors occur, and the wrong concentration is easily drawn in a code.",
                c: "Giving an entire vial without calculating the dose is never acceptable.",
                d: "The intramuscular route is for anaphylaxis. In cardiac arrest, the drug is given intravenously or intraosseously."
            },
            testTakingTip: "Same 1 mg, different volume and route. Read the concentration.",
            guideSection: "Section 09: Giving them safely, at speed",
            guideSectionId: "safety"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in septic shock has received a 30 mL/kg fluid bolus and remains hypotensive. Which medication should the nurse anticipate?",
            options: [
                { id: "a", text: "Dobutamine" },
                { id: "b", text: "Norepinephrine" },
                { id: "c", text: "Additional fluid only, with no vasopressor" },
                { id: "d", text: "Atropine" }
            ],
            correct: "b",
            rationale: {
                correct: "Norepinephrine is the first-choice vasopressor in septic shock once adequate fluid resuscitation has not restored perfusion. It raises vascular tone with less arrhythmia than dopamine.",
                a: "Dobutamine is an inotrope that can lower blood pressure. It is used when the pump has failed, as in cardiogenic shock.",
                c: "Continuing fluid alone in a patient who has already received adequate resuscitation risks fluid overload without restoring pressure.",
                d: "Atropine treats symptomatic bradycardia and has no role in distributive shock."
            },
            testTakingTip: "Fluid first, then norepinephrine. A pressor cannot squeeze an empty tank.",
            guideSection: "Section 05: Vasopressors and inotropes",
            guideSectionId: "vasopressors"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient who took an overdose of acetaminophen six hours ago arrives in the emergency department. Which statement about treatment is accurate?",
            options: [
                { id: "a", text: "Acetylcysteine is most effective when given early, so timing drives the plan" },
                { id: "b", text: "Flumazenil should be given to reverse the sedation" },
                { id: "c", text: "No antidote exists, so care is entirely supportive" },
                { id: "d", text: "Naloxone reverses acetaminophen toxicity" }
            ],
            correct: "a",
            rationale: {
                correct: "Acetylcysteine is the antidote, and its effectiveness falls as time since ingestion increases. Establishing the ingestion time and the level drives the entire treatment decision.",
                b: "Flumazenil reverses benzodiazepines and has no role in acetaminophen toxicity.",
                c: "An effective antidote exists, and withholding it would be a serious error.",
                d: "Naloxone reverses opioids, not acetaminophen."
            },
            testTakingTip: "Time since ingestion is the whole question in acetaminophen overdose.",
            guideSection: "Section 06: The antidote table",
            guideSectionId: "antidotes"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A provider verbally orders potassium chloride for a patient with a potassium of 2.8 mEq/L during a rapid response. Which action is correct?",
            options: [
                { id: "a", text: "Give the concentrated potassium by slow intravenous push" },
                { id: "b", text: "Dilute the potassium and administer it on an infusion pump" },
                { id: "c", text: "Add the potassium to the bag currently infusing" },
                { id: "d", text: "Give the potassium intramuscularly to act faster" }
            ],
            correct: "b",
            rationale: {
                correct: "Concentrated potassium is always diluted and always given on a pump at a controlled rate. It is a high-alert medication and one of the few drugs where a push is reliably fatal.",
                a: "Potassium by intravenous push causes cardiac arrest. There is no acceptable push rate.",
                c: "Adding potassium to a hanging bag produces uneven concentration and can deliver a bolus.",
                d: "Potassium is not given intramuscularly. It causes severe tissue damage."
            },
            testTakingTip: "Concentrated potassium is never pushed, at any speed, for any reason.",
            guideSection: "Section 09: Giving them safely, at speed",
            guideSectionId: "safety"
        },
        {
            id: 19,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient in pulseless electrical activity is receiving compressions. The patient receives hemodialysis three times a week and missed the last two sessions. Which reversible cause should the team address first?",
            options: [
                { id: "a", text: "Hypothermia" },
                { id: "b", text: "Tension pneumothorax" },
                { id: "c", text: "Hyperkalemia" },
                { id: "d", text: "Hypoglycemia" }
            ],
            correct: "c",
            rationale: {
                correct: "A dialysis patient who has missed sessions accumulates potassium, and severe hyperkalemia is a classic cause of pulseless electrical activity. Calcium, insulin with dextrose and urgent dialysis follow.",
                a: "Nothing in the history suggests cold exposure or environmental hypothermia.",
                b: "Tension pneumothorax is a real cause of pulseless electrical activity, but nothing here points to it.",
                d: "Hypoglycemia is worth checking, but the missed dialysis makes potassium the far more likely cause."
            },
            testTakingTip: "In pulseless electrical activity, the history names the cause. Missed dialysis means potassium.",
            guideSection: "Section 03: Cardiac arrest",
            guideSectionId: "arrest"
        },
        {
            id: 20,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is responding to four situations at once. Which requires intervention FIRST?",
            options: [
                { id: "a", text: "A patient with a potassium of 5.4 mEq/L and a normal electrocardiogram" },
                { id: "b", text: "A patient who is pulseless with ventricular fibrillation on the monitor" },
                { id: "c", text: "A patient reporting facial flushing during an adenosine push" },
                { id: "d", text: "A patient whose norepinephrine infusion has 20 minutes of volume remaining" }
            ],
            correct: "b",
            rationale: {
                correct: "A pulseless patient in a shockable rhythm needs immediate defibrillation and compressions. Nothing else in this group is time critical in the same way.",
                a: "A mildly elevated potassium with a normal electrocardiogram needs attention but is not an emergency.",
                c: "Flushing and chest tightness during an adenosine push are expected and brief.",
                d: "The infusion needs replacing before it runs out, and 20 minutes is adequate warning."
            },
            testTakingTip: "Pulseless and shockable outranks everything.",
            guideSection: "Section 10: What you do first",
            guideSectionId: "interventions"
        }
    ]
};
