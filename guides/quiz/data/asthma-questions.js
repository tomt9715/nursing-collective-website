/**
 * Asthma Quiz — Question Data
 * Extracted from guides/asthma.html practice questions section.
 * 8 NCLEX-style questions: 4 Single Best Answer, 2 SATA, 2 Priority
 */

/* exported asthmaQuizData */
var asthmaQuizData = {
    guideName: "Asthma",
    guideSlug: "asthma",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is educating a patient newly diagnosed with persistent asthma. Which medication is the most effective long-term controller for persistent asthma?",
            options: [
                { id: "a", text: "Albuterol (short-acting beta2-agonist)" },
                { id: "b", text: "Ipratropium bromide (anticholinergic)" },
                { id: "c", text: "Fluticasone (inhaled corticosteroid)" },
                { id: "d", text: "Montelukast (leukotriene modifier)" }
            ],
            correct: "c",
            rationale: {
                correct: "Inhaled corticosteroids (ICS) are the cornerstone and most effective long-term controller medication for persistent asthma at all severity levels. They reduce airway inflammation, decrease mucus production, reduce bronchial hyperresponsiveness, and prevent exacerbations. ICS is recommended starting at Step 2 of the stepwise approach.",
                a: "Albuterol is a rescue (quick-relief) medication, not a controller. It provides rapid bronchodilation but does not treat the underlying inflammation. Using SABAs alone for persistent asthma is inappropriate.",
                b: "Ipratropium is an anticholinergic used as adjunct therapy in acute exacerbations. It is not a first-line controller for chronic asthma management.",
                d: "Leukotriene modifiers (montelukast) are alternative controllers but are less effective than ICS. They may be used as add-on therapy or for patients who cannot use ICS."
            },
            testTakingTip: "ICS = #1 controller for persistent asthma. SABA = #1 rescue. Remember: asthma is an INFLAMMATORY disease, so the best controller targets inflammation (corticosteroid). LABAs must NEVER be used alone \u2014 always with an ICS.",
            guideSection: "Section 5 \u2014 Rescue vs Controller Medications",
            guideSectionId: "medications"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient presents to the ED with severe respiratory distress. The patient was wheezing loudly 30 minutes ago, but now the nurse notes a \"silent chest\" \u2014 no wheezing, no air movement on auscultation. SpO2 is 82%, the patient appears confused and is using accessory muscles. The nurse\u2019s priority action is to:",
            options: [
                { id: "a", text: "Administer a nebulized albuterol treatment" },
                { id: "b", text: "Prepare for emergent intubation and mechanical ventilation" },
                { id: "c", text: "Start IV corticosteroids and reassess in 30 minutes" },
                { id: "d", text: "Obtain a peak flow measurement" }
            ],
            correct: "b",
            rationale: {
                correct: "A \"silent chest\" in a patient who was previously wheezing is a life-threatening emergency. It means the airways are so severely constricted that NO air is moving \u2014 not even enough to generate wheezing. Combined with severe hypoxemia (SpO2 82%), confusion (altered mental status indicating hypoxia/hypercapnia), and accessory muscle use, this patient is in impending respiratory arrest and needs emergent intubation.",
                a: "Nebulized albuterol should be given but is insufficient as the sole intervention. The airways are too constricted for nebulized medication to reach the lungs effectively. This patient needs definitive airway management.",
                c: "IV steroids take 4-6 hours for full effect. This patient is in imminent respiratory arrest and cannot wait for steroids to work.",
                d: "Peak flow measurement requires patient effort and cooperation. This severely distressed, confused patient cannot perform this test, and attempting it wastes critical time."
            },
            testTakingTip: "Silent chest = EMERGENCY. Wheezing requires airflow. No wheezing + respiratory distress = no air movement = near-arrest. This is the most dangerous sign in asthma. NCLEX loves to test: \"Which finding requires IMMEDIATE intervention?\" Silent chest is always the answer.",
            guideSection: "Section 7 \u2014 Status Asthmaticus",
            guideSectionId: "status-asthmaticus"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with asthma uses a peak flow meter at home. The patient\u2019s personal best is 400 L/min. Today\u2019s reading is 220 L/min. According to the peak flow zone system, this reading falls in the:",
            options: [
                { id: "a", text: "Green zone \u2014 continue current medication plan" },
                { id: "b", text: "Yellow zone \u2014 use quick-relief inhaler and adjust medications" },
                { id: "c", text: "Red zone \u2014 take rescue medication and seek emergency care" },
                { id: "d", text: "Normal range \u2014 no action needed" }
            ],
            correct: "b",
            rationale: {
                correct: "220 L/min \u00f7 400 L/min personal best = 55% of personal best. The Yellow Zone is 50-80% of personal best. At 55%, this patient is in the Yellow Zone (caution), meaning asthma is not well-controlled. The patient should use the quick-relief inhaler and follow the yellow zone action plan, which may include short-term adjustments to controller medications and close monitoring.",
                a: "Green zone (80-100% of personal best) would be 320-400 L/min. At 220, the patient is well below the green zone.",
                c: "Red zone (<50% of personal best) would be below 200 L/min. At 220 (55%), the patient is just above the red zone threshold but still in yellow.",
                d: "Any reading below 80% of personal best requires action per the asthma action plan."
            },
            testTakingTip: "Peak flow zones: Green = 80-100% (go!), Yellow = 50-80% (caution \u2014 take rescue meds), Red = <50% (EMERGENCY \u2014 seek care immediately). Always calculate as a percentage of PERSONAL best, not predicted values.",
            guideSection: "Section 6 \u2014 Nursing Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 4,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching a patient about asthma trigger avoidance. Which triggers should the patient be educated about? (Select all that apply.)",
            options: [
                { id: "a", text: "Dust mites \u2014 use allergen-proof mattress and pillow covers" },
                { id: "b", text: "Cold, dry air \u2014 wear a scarf over the mouth and nose in winter" },
                { id: "c", text: "Exercise \u2014 avoid all physical activity to prevent attacks" },
                { id: "d", text: "NSAIDs (aspirin, ibuprofen) \u2014 can trigger bronchospasm in some patients" },
                { id: "e", text: "Strong emotions and stress \u2014 can trigger or worsen symptoms" }
            ],
            correct: ["a", "b", "d", "e"],
            rationale: {
                correct: "Dust mites, cold air, NSAIDs, and emotional stress are all recognized asthma triggers. The key is to educate about avoidance strategies, not to avoid activity entirely.",
                a: "CORRECT \u2014 Dust mites are a major allergen trigger; allergen-proof covers reduce exposure.",
                b: "CORRECT \u2014 Cold, dry air triggers bronchospasm; warming air before it reaches the airways helps.",
                c: "INCORRECT \u2014 Exercise-induced bronchospasm (EIB) is common, but the correct management is to use a SABA 15 minutes before exercise and warm up gradually \u2014 NOT to avoid all physical activity. Regular exercise improves cardiovascular fitness and is beneficial for asthma patients. Complete avoidance is inappropriate.",
                d: "CORRECT \u2014 Aspirin-exacerbated respiratory disease (AERD) affects up to 20% of adult asthmatics \u2014 NSAIDs can cause severe bronchospasm.",
                e: "CORRECT \u2014 Emotional stress and strong emotions (laughing, crying) can trigger hyperventilation and bronchospasm."
            },
            testTakingTip: "Asthma patients should NOT avoid exercise \u2014 they should pretreat with SABA 15 min before activity. Common NCLEX distractor: any answer that says \"avoid all exercise\" is almost always WRONG. Remember aspirin sensitivity \u2014 offer acetaminophen as an alternative.",
            guideSection: "Section 3 \u2014 Pathophysiology & Triggers",
            guideSectionId: "pathophysiology"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with moderate persistent asthma is currently on a low-dose ICS (Step 2). The patient reports using the rescue inhaler 4 times per week and waking at night with coughing twice a month. The nurse anticipates the provider will:",
            options: [
                { id: "a", text: "Continue current treatment \u2014 symptoms are well-controlled" },
                { id: "b", text: "Step up to medium-dose ICS or add a LABA" },
                { id: "c", text: "Step down to PRN SABA only" },
                { id: "d", text: "Switch to oral corticosteroids daily" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient\u2019s asthma is NOT well-controlled: rescue inhaler use >2 days/week (using 4x/week) and nighttime symptoms >2x/month indicates the need to step up therapy. From Step 2 (low-dose ICS), the step-up is to Step 3: medium-dose ICS OR low-dose ICS + LABA combination.",
                a: "Well-controlled asthma = rescue inhaler \u22642 days/week AND nighttime symptoms \u22642x/month. This patient exceeds both thresholds.",
                c: "Stepping down is only appropriate when asthma has been well-controlled for at least 3 months. This patient needs more treatment, not less.",
                d: "Daily oral corticosteroids are reserved for Step 6 (severe persistent) after all other options have failed. Jumping to oral steroids from Step 2 skips multiple intermediate steps."
            },
            testTakingTip: "Control thresholds: Rescue use >2 days/week OR nighttime symptoms >2x/month = NOT well-controlled \u2192 step UP. Well-controlled for \u22653 months \u2192 step DOWN. Remember the \"Rule of 2s\" for control assessment.",
            guideSection: "Section 4 \u2014 Severity Classification",
            guideSectionId: "severity"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse observes a patient using a metered-dose inhaler (MDI) without a spacer. The patient presses the canister and then immediately takes a deep breath. The nurse should correct this technique by teaching:",
            options: [
                { id: "a", text: "\"Breathe out fully first, then press the canister at the start of a slow, deep breath in.\"" },
                { id: "b", text: "\"Take a rapid, deep breath immediately after pressing the canister.\"" },
                { id: "c", text: "\"Press the canister twice rapidly for a double dose.\"" },
                { id: "d", text: "\"Hold the inhaler 4 inches from your open mouth and breathe normally.\"" }
            ],
            correct: "a",
            rationale: {
                correct: "Correct MDI technique: exhale fully \u2192 place mouthpiece in mouth (or 1-2 inches away) \u2192 press canister at the beginning of a slow, deep inhalation \u2192 hold breath for 10 seconds \u2192 exhale slowly. The coordination of pressing and slow inhalation ensures medication reaches the lower airways. Exhaling first creates maximum lung volume for medication deposition.",
                b: "Rapid inhalation causes the medication to deposit in the oropharynx (mouth/throat) rather than reaching the lower airways. Slow, deep inhalation is essential for proper delivery.",
                c: "Double-pressing wastes medication and delivers an imprecise dose. If two puffs are prescribed, wait 1 minute between each individual puff.",
                d: "The \"open mouth\" technique (4 inches away) is an older method. Current guidelines recommend using MDIs with a spacer whenever possible for optimal drug delivery."
            },
            testTakingTip: "MDI technique: Exhale \u2192 Slow inhale + actuate \u2192 Hold 10 sec. A spacer improves delivery by 40-60% and is recommended for all patients, especially children and those with coordination difficulty. Teach patients to demonstrate (teach-back method).",
            guideSection: "Section 8 \u2014 Patient Education",
            guideSectionId: "education"
        },
        {
            id: 7,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A 6-year-old child with asthma is being discharged. Which elements should be included in the asthma action plan? (Select all that apply.)",
            options: [
                { id: "a", text: "Daily controller medications and when to take them" },
                { id: "b", text: "Peak flow zones with corresponding actions (green/yellow/red)" },
                { id: "c", text: "Instructions to avoid all outdoor play to prevent attacks" },
                { id: "d", text: "When to use the rescue inhaler and when to call 911" },
                { id: "e", text: "A copy for the school nurse and physical education teacher" }
            ],
            correct: ["a", "b", "d", "e"],
            rationale: {
                correct: "A comprehensive asthma action plan should include daily controller medications, peak flow zones, rescue medication instructions, emergency criteria, and copies for all caregivers.",
                a: "CORRECT \u2014 The action plan must list all controller medications, doses, and timing.",
                b: "CORRECT \u2014 Peak flow zone monitoring guides self-management decisions (green = go, yellow = caution, red = emergency).",
                c: "INCORRECT \u2014 Children with asthma should be encouraged to participate in physical activity with appropriate management (pre-treatment with SABA, warm-up period). Restricting outdoor play is unnecessary, socially isolating, and not recommended by guidelines.",
                d: "CORRECT \u2014 Clear instructions for rescue medication use and emergency criteria prevent delays in care.",
                e: "CORRECT \u2014 School personnel need the action plan so the child can receive timely medication during school hours."
            },
            testTakingTip: "Written asthma action plans improve outcomes and reduce ED visits. Every asthma patient (especially children) should have one. Key components: daily meds, peak flow zones, rescue plan, emergency criteria, and copies for all caregivers including school staff.",
            guideSection: "Section 9 \u2014 Pediatric Considerations",
            guideSectionId: "pediatrics"
        },
        {
            id: 8,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient receiving continuous albuterol nebulization for a severe asthma exacerbation develops a heart rate of 148 bpm and reports palpitations and hand tremors. The nurse should FIRST:",
            options: [
                { id: "a", text: "Stop the nebulization and notify the provider" },
                { id: "b", text: "Administer a beta-blocker to control the heart rate" },
                { id: "c", text: "Continue the treatment \u2014 these are expected side effects" },
                { id: "d", text: "Switch to an ipratropium nebulization only" }
            ],
            correct: "a",
            rationale: {
                correct: "While mild tachycardia and tremors are known side effects of albuterol (beta2-agonist), a heart rate of 148 with palpitations represents a significant adverse effect. The nurse should stop the nebulization and notify the provider, who may adjust the dose, frequency, or switch to an alternative medication. Patient safety takes priority.",
                b: "Beta-blockers are CONTRAINDICATED in asthma. Non-selective beta-blockers (and even some selective ones) can cause severe, potentially fatal bronchospasm by blocking beta2-receptors in the airways.",
                c: "While mild side effects are expected, HR 148 with palpitations exceeds the acceptable range and increases the risk for arrhythmias. This requires intervention, not continued treatment.",
                d: "Switching medications independently is outside the nurse\u2019s scope of practice without a provider order. Notify the provider to make the treatment decision."
            },
            testTakingTip: "Beta-blockers + asthma = NEVER. This is a high-yield NCLEX concept. Also remember: albuterol side effects (tachycardia, tremors, hypokalemia) are dose-dependent. When side effects become dangerous, stop the drug and notify the provider.",
            guideSection: "Section 5 \u2014 Rescue vs Controller Medications",
            guideSectionId: "medications"
        }
    ]
};
