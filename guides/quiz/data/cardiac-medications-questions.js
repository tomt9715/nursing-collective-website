/**
 * Cardiac Medications Quiz - Question Data
 * Questions covering hold parameters, the potassium classes, nitrates,
 * digoxin toxicity, rhythm drugs, clot drugs and statins.
 */

/* exported cardiacMedicationsQuizData */
var cardiacMedicationsQuizData = {
    guideName: "Cardiac Medications",
    guideSlug: "cardiac-medications",
    category: "Pharmacology",
    categoryColor: "#2fa866",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A patient is due for metoprolol. The apical pulse is 52 and the blood pressure is 118/70. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Give the dose and recheck the pulse in one hour" },
                { id: "b", text: "Hold the dose and notify the provider" },
                { id: "c", text: "Give half the ordered dose" },
                { id: "d", text: "Skip the dose and document that the patient was bradycardic" }
            ],
            correct: "b",
            rationale: {
                correct: "The hold parameter for a beta-blocker is a heart rate under 60. Hold the dose and tell the provider so the plan can be adjusted.",
                a: "Giving a rate-slowing drug to a patient already at 52 can drop the rate further.",
                c: "Nurses do not alter a prescribed dose. That is a new order, not a nursing judgement.",
                d: "Holding is correct, but a held dose that nobody hears about is an error. The provider has to be told."
            },
            testTakingTip: "Hold and notify. Never skip a dose silently.",
            guideSection: "Section 9: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient started on lisinopril two weeks ago reports a persistent dry, hacking cough. There is no fever and the lungs are clear. What is the nurse's best response?",
            options: [
                { id: "a", text: "\u201cThat is an allergic reaction to the drug. Stop the medication today.\u201d" },
                { id: "b", text: "\u201cThat sounds like a chest infection. I will ask the provider about an antibiotic.\u201d" },
                { id: "c", text: "\u201cThis is a known side effect. I will tell the provider, and switching to an ARB usually helps.\u201d" },
                { id: "d", text: "\u201cCoughing means the drug is working. Keep taking it every day as prescribed.\u201d" }
            ],
            correct: "c",
            rationale: {
                correct: "A dry cough is a well-recognised effect of ACE inhibitors. It is not an allergy. The usual fix is switching to an ARB, which does not cause it.",
                a: "The cough is an expected effect, not anaphylaxis. Facial or tongue swelling would be the emergency.",
                b: "Clear lungs and no fever argue against infection. The timing points at the drug.",
                d: "The cough is not a marker of effectiveness, and patients often stop the drug over it."
            },
            testTakingTip: "ACE inhibitor cough means swap to an ARB, not stop and treat an infection.",
            guideSection: "Section 3: The pressure drugs",
            guideSectionId: "antihypertensives"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient on lisinopril and spironolactone has a potassium of 5.9 mEq/L. Which action is most appropriate?",
            options: [
                { id: "a", text: "Give both drugs and recheck the potassium in the morning" },
                { id: "b", text: "Hold both drugs and notify the provider" },
                { id: "c", text: "Hold the spironolactone but give the lisinopril" },
                { id: "d", text: "Encourage bananas and orange juice" }
            ],
            correct: "b",
            rationale: {
                correct: "Both drugs raise potassium and both are held above 5.5. Together they compound the problem, so both are held and the provider is notified.",
                a: "A potassium of 5.9 already carries arrhythmia risk. Adding two potassium-raising drugs makes it worse.",
                c: "The ACE inhibitor also raises potassium. Holding only one leaves the problem in place.",
                d: "Those are high potassium foods. That teaching belongs with a loop or thiazide diuretic, not here."
            },
            testTakingTip: "ACE, ARB, ARNI and aldosterone antagonists all raise K+. Hold above 5.5.",
            guideSection: "Section 4: Diuretics, digoxin and potassium",
            guideSectionId: "heart-failure-drugs"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient on furosemide and digoxin reports nausea, poor appetite and seeing yellow halos around lights. The digoxin level is 1.7 ng/mL and the potassium is 2.9 mEq/L. What best explains these findings?",
            options: [
                { id: "a", text: "The digoxin level is subtherapeutic and the dose should be increased" },
                { id: "b", text: "The low potassium is causing digoxin toxicity at a level that reads therapeutic" },
                { id: "c", text: "The findings are unrelated to the medications" },
                { id: "d", text: "The heart failure is worsening and the diuretic dose should be increased" }
            ],
            correct: "b",
            rationale: {
                correct: "Potassium and digoxin compete for the same binding site. When potassium falls, more digoxin binds, so toxicity appears even though the reported level sits inside 0.5 to 2.0 ng/mL. Furosemide is what dropped the potassium.",
                a: "A level of 1.7 is inside the therapeutic range, and the patient already shows toxicity.",
                c: "Halos, nausea and appetite loss are the classic digoxin toxicity picture.",
                d: "Worsening failure brings rising weight, crackles and a faster pulse, not visual halos."
            },
            testTakingTip: "Low potassium makes a therapeutic digoxin level behave like a toxic one.",
            guideSection: "Section 4: Diuretics, digoxin and potassium",
            guideSectionId: "heart-failure-drugs"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with stable angina is being taught about sublingual nitroglycerin. Which statement shows the teaching was understood?",
            options: [
                { id: "a", text: "\u201cI will take all three tablets first, and call 911 only if they do not work.\u201d" },
                { id: "b", text: "\u201cI will sit down, take one tablet, and call 911 if the pain is still there after 5 minutes.\u201d" },
                { id: "c", text: "\u201cI will keep a few tablets in my weekly pill organiser so they are handy.\u201d" },
                { id: "d", text: "\u201cIf I get a headache I will stop the medication.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Sit or lie down first, take one tablet, and call 911 if the pain is unrelieved after 5 minutes. Up to three tablets total, 5 minutes apart, are taken while EMS is on the way.",
                a: "That is the older teaching. Waiting through three tablets delays care in an evolving heart attack.",
                c: "Nitroglycerin stays in its original amber glass bottle. Light, heat and moisture break it down.",
                d: "Headache is expected and means the drug is dilating vessels. Acetaminophen helps and it eases over time."
            },
            testTakingTip: "One tablet, 5 minutes, call 911. The other two are taken while EMS comes.",
            guideSection: "Section 5: Nitrates and the chest pain drugs",
            guideSectionId: "antianginals"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A man with chest pain is prescribed sublingual nitroglycerin. Which question is most important before the nurse gives it?",
            options: [
                { id: "a", text: "\u201cHave you taken sildenafil or a similar drug in the last 48 hours?\u201d" },
                { id: "b", text: "\u201cWhen did you last eat, and what did you have to eat?\u201d" },
                { id: "c", text: "\u201cDo you have a history of migraines or cluster headaches?\u201d" },
                { id: "d", text: "\u201cAre you allergic to shellfish or iodine contrast?\u201d" }
            ],
            correct: "a",
            rationale: {
                correct: "PDE5 inhibitors such as sildenafil, tadalafil and vardenafil combined with a nitrate cause profound and sometimes fatal hypotension. The window is 24 to 48 hours, and patients rarely volunteer the information.",
                b: "Food timing does not affect a sublingual dose.",
                c: "Headache is expected with nitrates and a migraine history does not withhold the drug.",
                d: "Shellfish allergy is a contrast media question, not a nitrate one."
            },
            testTakingTip: "Ask the PDE5 question before any nitrate. Ask it plainly and privately.",
            guideSection: "Section 5: Nitrates and the chest pain drugs",
            guideSectionId: "antianginals"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient using a nitroglycerin patch for chronic angina reports the patch is working less well than it used to. Which explanation and plan is correct?",
            options: [
                { id: "a", text: "Tolerance from continuous use requires a daily 10 to 12 hour nitrate-free interval" },
                { id: "b", text: "The patch dose is too low, so a second patch should be added each day" },
                { id: "c", text: "The patch should be applied to the same spot each day for steady absorption" },
                { id: "d", text: "Patches stop working after about a week and must be switched to tablets" }
            ],
            correct: "a",
            rationale: {
                correct: "Around the clock nitrate exposure causes tolerance within days. Building in a 10 to 12 hour nitrate-free interval restores the effect. In practice the patch comes off at night and goes on in the morning.",
                b: "Adding a second patch increases exposure, which is what caused the tolerance.",
                c: "Sites are rotated, and the old patch is removed before a new one goes on.",
                d: "Patches remain effective when a daily nitrate-free interval is used."
            },
            testTakingTip: "Long-acting nitrates need a daily break or they stop working.",
            guideSection: "Section 5: Nitrates and the chest pain drugs",
            guideSectionId: "antianginals"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient taking amlodipine for hypertension reports new swelling of both ankles. The lungs are clear and there is no jugular vein distension. What is the most likely explanation?",
            options: [
                { id: "a", text: "New right-sided heart failure from fluid overload" },
                { id: "b", text: "A common effect of dihydropyridine calcium channel blockers" },
                { id: "c", text: "Deep vein thrombosis from reduced mobility" },
                { id: "d", text: "An allergic reaction to the calcium channel blocker" }
            ],
            correct: "b",
            rationale: {
                correct: "Amlodipine and the other dipines dilate arterioles, which drives fluid into the tissues. Bilateral ankle edema with clear lungs is the classic picture and it is dose related.",
                a: "Right-sided failure usually brings jugular vein distension, weight gain and hepatomegaly as well.",
                c: "DVT is typically one leg, with pain, warmth and swelling on that side only.",
                d: "Allergy presents as rash, hives or swelling of the face and airway, not gradual bilateral ankle edema."
            },
            testTakingTip: "Dipine means vessels. Ankle edema is the signature complaint.",
            guideSection: "Section 3: The pressure drugs",
            guideSectionId: "antihypertensives"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient already taking metoprolol is now prescribed verapamil. Which concern should the nurse raise with the provider?",
            options: [
                { id: "a", text: "The combination can cause profound bradycardia and heart block" },
                { id: "b", text: "The combination raises potassium dangerously" },
                { id: "c", text: "Verapamil cancels the effect of the beta-blocker" },
                { id: "d", text: "The combination causes a dry cough" }
            ],
            correct: "a",
            rationale: {
                correct: "Verapamil and diltiazem slow the AV node, and so do beta-blockers. Two drugs slowing the same node can produce severe bradycardia and heart block, so the pairing is avoided or watched closely.",
                b: "Neither drug is a major potassium raiser. That belongs to the ACE, ARB and aldosterone antagonist group.",
                c: "They do not cancel each other. The problem is that their effects add together.",
                d: "The dry cough belongs to ACE inhibitors."
            },
            testTakingTip: "Diltiazem and verapamil work on the heart. Do not stack them with a beta-blocker.",
            guideSection: "Section 3: The pressure drugs",
            guideSectionId: "antihypertensives"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on long-term furosemide asks which foods to focus on. Which response is correct?",
            options: [
                { id: "a", text: "\u201cAvoid bananas, potatoes and spinach.\u201d" },
                { id: "b", text: "\u201cInclude bananas, potatoes, spinach and oranges most days.\u201d" },
                { id: "c", text: "\u201cUse a salt substitute instead of table salt.\u201d" },
                { id: "d", text: "\u201cFood does not affect this medication.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Loop diuretics waste potassium, so the diet teaching is to include potassium rich foods. The provider may also prescribe a supplement.",
                a: "That is the teaching for potassium-sparing diuretics, which push potassium up.",
                c: "Most salt substitutes are potassium chloride. They are avoided with potassium-sparing drugs and are not the standard advice here.",
                d: "Potassium intake directly affects the safety of a loop diuretic, especially alongside digoxin."
            },
            testTakingTip: "Loops and thiazides lower potassium, so eat it. Potassium-sparing drugs raise it, so do not.",
            guideSection: "Section 4: Diuretics, digoxin and potassium",
            guideSectionId: "heart-failure-drugs"
        },
        {
            id: 11,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A patient is scheduled to start sacubitril with valsartan. The patient took a dose of enalapril this morning. What should the nurse do?",
            options: [
                { id: "a", text: "Give the first dose now and hold tomorrow's enalapril" },
                { id: "b", text: "Give both drugs together for a week to overlap coverage" },
                { id: "c", text: "Hold the new drug and confirm the 36 hour washout from the ACE inhibitor" },
                { id: "d", text: "Give the new drug at half the ordered dose" }
            ],
            correct: "c",
            rationale: {
                correct: "An ARNI is never given alongside an ACE inhibitor. The angioedema risk stacks. A 36 hour washout from the last ACE inhibitor dose is required before the first ARNI dose.",
                a: "The first dose is too soon. The washout has not elapsed.",
                b: "Overlapping the two is exactly the combination that is prohibited.",
                d: "The problem is timing, not dose, and nurses do not alter a prescribed dose."
            },
            testTakingTip: "ARNI plus ACE inhibitor is never done. 36 hours between them.",
            guideSection: "Section 4: Diuretics, digoxin and potassium",
            guideSectionId: "heart-failure-drugs"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is preparing to give adenosine to a stable patient in SVT after vagal maneuvers failed. Which technique is correct?",
            options: [
                { id: "a", text: "Give 6 mg slowly over 2 minutes through a hand vein, then flush with saline" },
                { id: "b", text: "Give 6 mg rapid IV push at the closest port, then a 20 mL saline flush right away" },
                { id: "c", text: "Mix 6 mg in 100 mL of normal saline and infuse over 30 minutes" },
                { id: "d", text: "Give 12 mg rapid IV push first, then 6 mg if there is no response" }
            ],
            correct: "b",
            rationale: {
                correct: "Adenosine has a half-life under 10 seconds. It has to reach the heart before it is metabolised, so it goes in as a rapid push at the closest port with a fast 20 mL flush behind it. The dose sequence is 6 mg, then 12 mg.",
                a: "A slow push through a distant vein means the drug is gone before it reaches the heart.",
                c: "An infusion cannot work with a half-life measured in seconds.",
                d: "The order is 6 mg first, then 12 mg if the first dose does not convert the rhythm."
            },
            testTakingTip: "Adenosine is 6 then 12, fast push, 20 mL flush, closest port.",
            guideSection: "Section 6: Rate and rhythm drugs",
            guideSectionId: "antiarrhythmics"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient on long-term amiodarone needs ongoing monitoring. Which set of tests is most appropriate?",
            options: [
                { id: "a", text: "Thyroid function, liver enzymes and lung assessment" },
                { id: "b", text: "Serum potassium and magnesium levels only" },
                { id: "c", text: "Weekly international normalized ratio (INR) only" },
                { id: "d", text: "Monthly hemoglobin A1c and fasting glucose" }
            ],
            correct: "a",
            rationale: {
                correct: "Amiodarone affects the thyroid in both directions, is hepatotoxic, and can cause pulmonary toxicity. Those three systems drive the long-term monitoring plan.",
                b: "Electrolytes matter in arrhythmia care generally but are not the amiodarone-specific monitoring set.",
                c: "INR belongs to warfarin. Amiodarone does raise INR when the two are combined, but INR alone is not the monitoring plan.",
                d: "A1c relates to diabetes management, not amiodarone."
            },
            testTakingTip: "Amiodarone: thyroid, liver, lungs. Plus sunscreen for photosensitivity.",
            guideSection: "Section 6: Rate and rhythm drugs",
            guideSectionId: "antiarrhythmics"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with new atrial fibrillation asks why warfarin was prescribed instead of the aspirin a friend takes for the heart. Which explanation is best?",
            options: [
                { id: "a", text: "\u201cAspirin and warfarin do the same job, but warfarin is simply the stronger of the two.\u201d" },
                { id: "b", text: "\u201cA clot in a quivering atrium is mostly fibrin, so it needs an anticoagulant. Aspirin only works on platelets.\u201d" },
                { id: "c", text: "\u201cAspirin is only for people who have already had a heart attack, and you have not.\u201d" },
                { id: "d", text: "\u201cWarfarin dissolves the clot that is already there, and aspirin cannot do that.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Slow, pooled blood in a fibrillating atrium forms a fibrin-rich clot, which is what anticoagulants prevent. Antiplatelets target the platelet-rich clots that form on cracked plaque in fast-flowing arteries.",
                a: "They act on different parts of clot formation, not the same one at different strengths.",
                c: "Aspirin has broader uses than that, but the reason it is not chosen here is the type of clot.",
                d: "Neither warfarin nor aspirin dissolves an existing clot. Both prevent new clot from forming."
            },
            testTakingTip: "Ask where the clot was made. Vein or fibrillating atrium means anticoagulant.",
            guideSection: "Section 7: Clot drugs",
            guideSectionId: "anticoagulants"
        },
        {
            id: 15,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient has been on an unfractionated heparin infusion for 6 days. The platelet count has fallen from 240,000 to 95,000. There is no visible bleeding. What is the priority action?",
            options: [
                { id: "a", text: "Continue the infusion and start bleeding precautions" },
                { id: "b", text: "Stop all heparin, including flushes, and notify the provider" },
                { id: "c", text: "Slow the infusion rate by half and recheck in 6 hours" },
                { id: "d", text: "Give protamine sulfate and continue the infusion" }
            ],
            correct: "b",
            rationale: {
                correct: "A fall of more than 50 percent from baseline, or below 100,000, on day 5 to 14 of heparin points to heparin-induced thrombocytopenia. Despite the low count these patients clot rather than bleed, so all heparin stops immediately and an alternative anticoagulant is started.",
                a: "Continuing heparin in suspected HIT risks limb-threatening or fatal thrombosis.",
                c: "Reducing the dose does not remove the trigger. All heparin exposure stops, including line flushes.",
                d: "Protamine reverses heparin but is used for bleeding, not for HIT, and the infusion would still be stopped."
            },
            testTakingTip: "Falling platelets on heparin means stop the heparin, not watch for bleeding.",
            guideSection: "Section 7: Clot drugs",
            guideSectionId: "anticoagulants"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient starting warfarin asks about diet. Which statement by the patient indicates correct understanding?",
            options: [
                { id: "a", text: "\u201cI will stop eating all green vegetables.\u201d" },
                { id: "b", text: "\u201cI will eat about the same amount of leafy greens each week rather than changing it.\u201d" },
                { id: "c", text: "\u201cI will double my spinach on the weeks my INR runs high.\u201d" },
                { id: "d", text: "\u201cI can take over the counter medicines freely since they are not prescriptions.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Vitamin K opposes warfarin, so the dose is titrated to the patient's usual intake. Consistency is the goal, not avoidance. Sudden swings in either direction move the INR.",
                a: "Complete avoidance removes useful nutrition and still causes swings if the patient later eats greens.",
                c: "Self-adjusting the diet to chase an INR is unsafe. Dose changes come from the provider.",
                d: "Many over the counter drugs and supplements interact with warfarin. The provider is told before anything new is started."
            },
            testTakingTip: "Warfarin diet teaching is consistency, not avoidance. Target INR is 2 to 3.",
            guideSection: "Section 7: Clot drugs",
            guideSectionId: "anticoagulants"
        },
        {
            id: 17,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A patient who received a drug-eluting stent 2 months ago says the dentist told him to stop clopidogrel for a week before an extraction. What should the nurse advise?",
            options: [
                { id: "a", text: "\u201cStop it for the week as the dentist instructed.\u201d" },
                { id: "b", text: "\u201cStop the aspirin instead and keep the clopidogrel.\u201d" },
                { id: "c", text: "\u201cDo not stop anything until cardiology has been called about the plan.\u201d" },
                { id: "d", text: "\u201cReschedule the extraction for after the stent has healed in five years.\u201d" }
            ],
            correct: "c",
            rationale: {
                correct: "Dual antiplatelet therapy runs 6 to 12 months at minimum after a drug-eluting stent. Stopping early is a leading cause of stent thrombosis, which carries a high death rate, so cardiology decides before anything is held.",
                a: "Acting on the instruction without a cardiology conversation is what causes the harm.",
                b: "Swapping which drug is stopped is still an unsupervised change to dual therapy.",
                d: "Dental care is not deferred for years. Coordination between the dentist and cardiology is the answer."
            },
            testTakingTip: "Fresh stent plus a request to hold an antiplatelet means call cardiology first.",
            guideSection: "Section 7: Clot drugs",
            guideSectionId: "anticoagulants"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient on atorvastatin calls to report aching, weak thigh muscles for three days and urine that looks like tea. What should the nurse do?",
            options: [
                { id: "a", text: "Reassure the patient that muscle aches are common and suggest stretching" },
                { id: "b", text: "Advise the patient to be seen today for a creatine kinase level and kidney function" },
                { id: "c", text: "Tell the patient to double the water intake and call back in a week" },
                { id: "d", text: "Advise the patient to take the statin in the morning instead" }
            ],
            correct: "b",
            rationale: {
                correct: "Muscle pain with weakness and dark, tea-coloured urine is the rhabdomyolysis pattern. Muscle breakdown products can injure the kidneys, so this needs same-day evaluation with a CK and renal studies.",
                a: "Mild aches are common, but the dark urine changes the picture entirely.",
                c: "Hydration matters in treatment, but delaying evaluation for a week risks kidney injury.",
                d: "Timing changes do not address an urgent muscle and kidney problem."
            },
            testTakingTip: "Statin muscle pain plus dark urine is a same-day call, not a wait-and-see.",
            guideSection: "Section 8: Statins and the lipid drugs",
            guideSectionId: "lipid-agents"
        }
    ]
};
