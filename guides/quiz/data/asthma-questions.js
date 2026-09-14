/**
 * Asthma Quiz - Question Data
 * Extracted from guides/asthma.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Ordering, 1 Matrix
 */

/* exported asthmaQuizData */
var asthmaQuizData = {
    guideName: "Asthma",
    guideSlug: "asthma",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 20,
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
                a: "Albuterol is a rescue (quick-relief) medication, not a controller. It provides rapid bronchodilation but does not treat the underlying inflammation. Using short-acting beta2-agonists (SABAs) alone for persistent asthma is inappropriate.",
                b: "Ipratropium is an anticholinergic used as adjunct therapy in acute exacerbations. It is not a first-line controller for chronic asthma management.",
                d: "Leukotriene modifiers (montelukast) are alternative controllers but are less effective than inhaled corticosteroids (ICS). They may be used as add-on therapy or for patients who cannot use ICS."
            },
            testTakingTip: "Inhaled corticosteroid (ICS) = #1 controller for persistent asthma. Short-acting beta2-agonist (SABA) = #1 rescue. Remember: asthma is an INFLAMMATORY disease, so the best controller targets inflammation (corticosteroid). Long-acting beta2-agonists (LABAs) must NEVER be used alone - always with an ICS.",
            guideSection: "Section 5 - Rescue vs Controller Medications",
            guideSectionId: "medications"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient presents to the ED with severe respiratory distress. The patient was wheezing loudly 30 minutes ago, but now the nurse notes a \"silent chest\" - no wheezing, no air movement on auscultation. SpO2 is 82%, the patient appears confused and is using accessory muscles. The nurse\u2019s priority action is to:",
            options: [
                { id: "a", text: "Administer a nebulized albuterol treatment" },
                { id: "b", text: "Prepare for emergent intubation and mechanical ventilation" },
                { id: "c", text: "Start IV corticosteroids and reassess in 30 minutes" },
                { id: "d", text: "Obtain a peak flow measurement" }
            ],
            correct: "b",
            rationale: {
                correct: "A \"silent chest\" in a patient who was previously wheezing is a life-threatening emergency. It means the airways are so severely constricted that NO air is moving - not even enough to generate wheezing. Combined with severe hypoxemia (SpO2 82%), confusion (altered mental status indicating hypoxia/hypercapnia), and accessory muscle use, this patient is in impending respiratory arrest and needs emergent intubation.",
                a: "Nebulized albuterol should be given but is insufficient as the sole intervention. The airways are too constricted for nebulized medication to reach the lungs effectively. This patient needs definitive airway management.",
                c: "IV steroids take 4-6 hours for full effect. This patient is in imminent respiratory arrest and cannot wait for steroids to work.",
                d: "Peak flow measurement requires patient effort and cooperation. This severely distressed, confused patient cannot perform this test, and attempting it wastes critical time."
            },
            testTakingTip: "Silent chest = EMERGENCY. Wheezing requires airflow. No wheezing + respiratory distress = no air movement = near-arrest. This is the most dangerous sign in asthma. NCLEX loves to test: \"Which finding requires IMMEDIATE intervention?\" Silent chest is always the answer.",
            guideSection: "Section 7 - Status Asthmaticus",
            guideSectionId: "status-asthmaticus"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with asthma uses a peak flow meter at home. The patient\u2019s personal best is 400 L/min. Today\u2019s reading is 220 L/min. According to the peak flow zone system, this reading falls in the:",
            options: [
                { id: "a", text: "Green zone - continue current medication plan" },
                { id: "b", text: "Yellow zone - use quick-relief inhaler and adjust medications" },
                { id: "c", text: "Red zone - take rescue medication and seek emergency care" },
                { id: "d", text: "Normal range - no action needed" }
            ],
            correct: "b",
            rationale: {
                correct: "220 L/min \u00f7 400 L/min personal best = 55% of personal best. The Yellow Zone is 50-80% of personal best. At 55%, this patient is in the Yellow Zone (caution), meaning asthma is not well-controlled. The patient should use the quick-relief inhaler and follow the yellow zone action plan, which may include short-term adjustments to controller medications and close monitoring.",
                a: "Green zone (80-100% of personal best) would be 320-400 L/min. At 220, the patient is well below the green zone.",
                c: "Red zone (<50% of personal best) would be below 200 L/min. At 220 (55%), the patient is just above the red zone threshold but still in yellow.",
                d: "Any reading below 80% of personal best requires action per the asthma action plan."
            },
            testTakingTip: "Peak flow zones: Green = 80-100% (go!), Yellow = 50-80% (caution - take rescue meds), Red = <50% (EMERGENCY - seek care immediately). Always calculate as a percentage of PERSONAL best, not predicted values.",
            guideSection: "Section 6 - Nursing Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 4,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with moderate persistent asthma is experiencing an acute exacerbation at home - wheezing, shortness of breath, and peak flow at 55% of personal best. Place the asthma action plan steps in the correct order.",
            options: [
                { id: "a", text: "Use rescue inhaler (albuterol) 2\u20134 puffs" },
                { id: "b", text: "Wait 20 minutes and reassess peak flow" },
                { id: "c", text: "Repeat rescue inhaler if peak flow remains below 80%" },
                { id: "d", text: "Take oral corticosteroid as prescribed in action plan" },
                { id: "e", text: "Contact healthcare provider or go to ED if no improvement" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The asthma action plan follows a stepwise escalation: rescue medication, reassessment, repeat if needed, oral corticosteroids for sustained inflammation control, and emergency care if failing to improve.",
                a: "FIRST - At 55% peak flow (Yellow Zone), use rescue inhaler. Albuterol provides rapid bronchodilation within 5\u201315 minutes.",
                b: "SECOND - Wait 20 minutes to allow the medication to take full effect, then reassess peak flow to determine if escalation is needed.",
                c: "THIRD - If peak flow remains below 80% after the first dose, repeat albuterol 2\u20134 puffs. Persistent limitation indicates a more significant exacerbation.",
                d: "FOURTH - If repeated rescue use is needed, take the prescribed oral corticosteroid (e.g., prednisone). Oral steroids address underlying airway inflammation that bronchodilators alone cannot resolve.",
                e: "FIFTH - If symptoms persist despite rescue inhaler and oral corticosteroid, or if peak flow drops below 50% (Red Zone), contact the healthcare provider or go to the ED."
            },
            testTakingTip: "Asthma action plan: Rescue \u2192 Wait and reassess \u2192 Repeat \u2192 Oral steroid \u2192 Seek emergency care. Peak flow zones: Green (80\u2013100%) = go, Yellow (50\u201380%) = caution, Red (<50%) = emergency.",
            guideSection: "Section 3 - Pathophysiology & Triggers",
            guideSectionId: "pathophysiology"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with mild persistent asthma is currently on a low-dose inhaled corticosteroid (ICS) at Step 2. The patient reports using the rescue inhaler 4 times per week and waking at night with coughing twice a month. The nurse anticipates the provider will:",
            options: [
                { id: "a", text: "Continue current treatment - symptoms are well-controlled" },
                { id: "b", text: "Step up to medium-dose inhaled corticosteroid or add a long-acting beta2-agonist" },
                { id: "c", text: "Step down to PRN short-acting beta2-agonist (SABA) only" },
                { id: "d", text: "Switch to daily oral corticosteroids as the long-term controller" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient\u2019s asthma is NOT well-controlled: rescue inhaler use on more than 2 days a week (this patient uses it 4 times a week) is enough on its own to step up therapy, even though waking twice a month is still within the well-controlled range. From Step 2, which is a low-dose inhaled corticosteroid (ICS), the step-up is to Step 3: medium-dose ICS OR low-dose ICS + long-acting beta2-agonist (LABA) combination.",
                a: "Well-controlled asthma = rescue inhaler \u22642 days/week AND nighttime symptoms \u22642x/month. This patient exceeds the rescue inhaler threshold, and one criterion out of range is enough.",
                c: "Stepping down is only appropriate when asthma has been well-controlled for at least 3 months. This patient needs more treatment, not less.",
                d: "Daily oral corticosteroids are reserved for Step 6 (severe persistent) after all other options have failed. Jumping to oral steroids from Step 2 skips multiple intermediate steps."
            },
            testTakingTip: "Control thresholds: Rescue use >2 days/week OR nighttime symptoms >2x/month = NOT well-controlled \u2192 step UP. Well-controlled for \u22653 months \u2192 step DOWN. Remember the \"Rule of 2s\" for control assessment.",
            guideSection: "Section 4 - Severity Classification",
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
                correct: "Correct metered-dose inhaler (MDI) technique: exhale fully \u2192 place mouthpiece in mouth (or 1-2 inches away) \u2192 press canister at the beginning of a slow, deep inhalation \u2192 hold breath for 10 seconds \u2192 exhale slowly. The coordination of pressing and slow inhalation ensures medication reaches the lower airways. Exhaling first creates maximum lung volume for medication deposition.",
                b: "Rapid inhalation causes the medication to deposit in the oropharynx (mouth/throat) rather than reaching the lower airways. Slow, deep inhalation is essential for proper delivery.",
                c: "Double-pressing wastes medication and delivers an imprecise dose. If two puffs are prescribed, wait 1 minute between each individual puff.",
                d: "The \"open mouth\" technique (4 inches away) is an older method. Current guidelines recommend using metered-dose inhalers (MDIs) with a spacer whenever possible for optimal drug delivery."
            },
            testTakingTip: "Metered-dose inhaler (MDI) technique: Exhale \u2192 Slow inhale + actuate \u2192 Hold 10 sec. A spacer improves delivery by 40-60% and is recommended for all patients, especially children and those with coordination difficulty. Teach patients to demonstrate (teach-back method).",
            guideSection: "Section 8 - Patient Education",
            guideSectionId: "education"
        },
        {
            id: 7,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is educating a patient about asthma medications. For each medication, indicate whether it is a controller (maintenance) medication or a rescue (quick-relief) medication.",
            matrixColumns: ["Controller (Maintenance)", "Rescue (Quick-Relief)"],
            options: [
                { id: "a", text: "Inhaled corticosteroid (e.g., fluticasone)" },
                { id: "b", text: "Short-acting beta2-agonist (e.g., albuterol)" },
                { id: "c", text: "Long-acting beta2-agonist (e.g., salmeterol)" },
                { id: "d", text: "Ipratropium bromide (anticholinergic)" }
            ],
            correct: { a: "Controller (Maintenance)", b: "Rescue (Quick-Relief)", c: "Controller (Maintenance)", d: "Rescue (Quick-Relief)" },
            rationale: {
                correct: "Controllers are taken daily to prevent symptoms: inhaled corticosteroids (ICS) and long-acting beta2-agonists (LABAs). Rescue medications provide rapid relief during acute episodes: short-acting beta2-agonists (SABAs) and ipratropium. Knowing this distinction is essential for patient education.",
                a: "CONTROLLER - Inhaled corticosteroids are the most effective first-line controller medications. They reduce airway inflammation and are taken daily. Rinse mouth after use to prevent oral candidiasis.",
                b: "RESCUE - Short-acting beta2-agonists like albuterol provide rapid bronchodilation within 5\u201315 minutes. Used PRN for acute symptoms. Needing a short-acting beta2-agonist (SABA) >2 days/week indicates poorly controlled asthma.",
                c: "CONTROLLER - Long-acting beta2-agonists provide sustained bronchodilation for 12 hours. Must ALWAYS be combined with an inhaled corticosteroid (ICS), never as monotherapy, because a long-acting beta2-agonist used alone raises the risk of severe and fatal asthma attacks. The Food and Drug Administration (FDA) removed the boxed warning from combination inhalers in 2017, but the rule against using one alone still stands.",
                d: "RESCUE - Ipratropium bromide is a short-acting anticholinergic used as adjunct quick-relief therapy in acute exacerbations, often nebulized with albuterol (DuoNeb) for synergistic bronchodilation."
            },
            testTakingTip: "Controllers = daily: inhaled corticosteroids (ICS), long-acting beta2-agonists (LABAs), leukotriene modifiers. Rescue = PRN: short-acting beta2-agonists (SABAs), ipratropium. Critical safety: LABAs must NEVER be used alone - always with an ICS.",
            guideSection: "Section 5 - Rescue vs Controller Medications",
            guideSectionId: "medications"
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
                { id: "c", text: "Continue the treatment - these are expected side effects" },
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
            guideSection: "Section 5 - Rescue vs Controller Medications",
            guideSectionId: "medications"
        },
        {
            id: 9, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient arrives in the emergency department with an acute asthma exacerbation, sitting forward and audibly wheezing. All four of the following are ordered. Which should the nurse do FIRST?",
            options: [
                { id: "a", text: "Place the patient in high Fowler's position" },
                { id: "b", text: "Administer the ordered systemic corticosteroid" },
                { id: "c", text: "Obtain a peak expiratory flow measurement now" },
                { id: "d", text: "Start an intravenous line for fluid replacement" }
            ],
            correct: "a",
            rationale: {
                correct: "Sitting the patient up costs nothing, needs no order and helps immediately by letting the accessory muscles work. Position and oxygenate comes before giving drugs in the ordering rules.",
                b: "The steroid matters, but it takes hours to work. A bronchodilator opens the airway in minutes, and positioning works at once.",
                c: "A peak flow measurement is useful data but it does not treat anything, and a patient in distress may not manage the manoeuvre.",
                d: "Hydration keeps secretions thin and is part of care, but it is not the first action in acute distress."
            },
            testTakingTip: "Priority questions give four defensible actions. You are being tested on ordering, not correctness. Sit them up first.",
            guideSection: "Section 8 - What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 10, type: "single", subtype: "priority", difficulty: "analysis",
            stem: "A patient being treated for a severe asthma exacerbation becomes quieter, and the wheezing that was loud on arrival can no longer be heard. The patient is drowsy. What should the nurse do?",
            options: [
                { id: "a", text: "Call for immediate help and prepare for intubation" },
                { id: "b", text: "Document that the wheezing has resolved with treatment" },
                { id: "c", text: "Reduce the oxygen because the patient is now settled" },
                { id: "d", text: "Leave the patient to rest and recheck in thirty minutes" }
            ],
            correct: "a",
            rationale: {
                correct: "A chest going quiet in a patient who was wheezing means too little air is moving to make the sound, and a falling level of consciousness outranks every number on the monitor. This is impending respiratory failure.",
                b: "Silence after loud wheezing is deterioration, not improvement. Wheeze requires airflow to exist.",
                c: "Reducing oxygen in a patient who is decompensating removes the little support they have.",
                d: "Leaving a drowsy asthmatic alone is the most dangerous option here. Staying with the patient is itself an intervention."
            },
            testTakingTip: "A silent chest in asthma is an emergency, not a success. So is drowsiness.",
            guideSection: "Section 8 - What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks why a child in respiratory distress can deteriorate faster than an adult with the same degree of airway swelling. Which explanation is correct?",
            options: [
                { id: "a", text: "A smaller airway loses a greater share of its opening" },
                { id: "b", text: "Children produce far more mucus than adults do" },
                { id: "c", text: "Children have a weaker cough than adults of any age" },
                { id: "d", text: "Children absorb inhaled medication more slowly overall" }
            ],
            correct: "a",
            rationale: {
                correct: "The same amount of swelling closes a much larger proportion of a small airway, and children have less respiratory reserve to spend. So a child in distress can reach failure quickly. Treat it as urgent, reassess often, and do not leave them alone.",
                b: "Mucus contributes to obstruction, but the geometry of a narrow airway is what makes children deteriorate faster.",
                c: "Cough strength varies with age but is not the reason for rapid decompensation.",
                d: "Inhaled medication is delivered differently by age, though absorption speed is not what drives the risk."
            },
            testTakingTip: "Small airway plus small reserve equals fast decline. A calm looking child can be closer to failure than they appear.",
            guideSection: "Section 10 - Children are not small adults",
            guideSectionId: "pediatrics"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "application",
            stem: "A nurse is planning to give a bronchodilator to an 18-month-old with asthma. Which delivery method is most appropriate for this age?",
            options: [
                { id: "a", text: "A nebuliser with a mask, or an inhaler with a spacer and mask" },
                { id: "b", text: "A metered dose inhaler used alone, without any spacer device" },
                { id: "c", text: "A dry powder inhaler that the child activates by breathing in" },
                { id: "d", text: "An inhaler with a spacer and a mouthpiece held between the lips" }
            ],
            correct: "a",
            rationale: {
                correct: "Infants and toddlers cannot coordinate an inhaler, so a nebuliser with a mask, or a metered dose inhaler with a spacer and mask, is used. A mouthpiece becomes workable from about age 3.",
                b: "Using a metered dose inhaler alone requires timing a breath with an actuation, which a toddler cannot do.",
                c: "A dry powder inhaler needs a forceful inward breath the child cannot reliably generate.",
                d: "A mouthpiece requires a seal and a held breath, which is why a mask is used until about age 3."
            },
            testTakingTip: "Mask until roughly age 3, then a mouthpiece. Expect toddlers to fight the mask, so involve the parent and keep it calm.",
            guideSection: "Section 10 - Children are not small adults",
            guideSectionId: "pediatrics"
        },
        {
            id: 13, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient with asthma reports using a short acting beta agonist (SABA) rescue inhaler four times a week and waking at night about once a week. How should the nurse interpret this?",
            options: [
                { id: "a", text: "The asthma is not controlled and the plan needs review" },
                { id: "b", text: "The asthma is well controlled and no change is needed" },
                { id: "c", text: "The rescue inhaler should be stopped to avoid tolerance" },
                { id: "d", text: "The night waking is expected and only the daytime counts" }
            ],
            correct: "a",
            rationale: {
                correct: "Short acting beta agonist (SABA) use more than 2 days a week, or night waking more than 2 nights a month, means the asthma is not controlled. This patient exceeds both thresholds, so the controller plan is reviewed.",
                b: "Both figures sit above the control thresholds, so this cannot be called controlled.",
                c: "The rescue inhaler is not stopped. Frequent need for it signals that the controller therapy is insufficient.",
                d: "Night waking is one of the two control thresholds and counts as much as daytime use."
            },
            testTakingTip: "Two control numbers to have cold: rescue inhaler more than 2 days a week, or waking more than 2 nights a month.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 14, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient measures a peak expiratory flow of 45 percent of personal best at home. What should the nurse advise?",
            options: [
                { id: "a", text: "This is the red zone, so seek emergency care now" },
                { id: "b", text: "This is the yellow zone, so repeat it in four hours" },
                { id: "c", text: "This is the green zone, so continue the usual plan" },
                { id: "d", text: "This is within normal variation, so no action is needed" }
            ],
            correct: "a",
            rationale: {
                correct: "Peak flow under 50 percent of personal best is the red zone and an emergency. The green zone is 80 to 100 percent and the yellow zone is 50 to 79 percent, so 45 percent falls below both.",
                b: "The yellow zone runs from 50 to 79 percent. At 45 percent the patient is past it.",
                c: "The green zone starts at 80 percent, well above this reading.",
                d: "A reading under half of personal best is never normal variation."
            },
            testTakingTip: "Peak flow zones work like traffic lights against personal best: green 80 to 100, yellow 50 to 79, red under 50.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A patient who gets wheezy while running asks when to use the rescue inhaler before exercise. What should the nurse advise?",
            options: [
                { id: "a", text: "About 15 minutes before starting the exercise" },
                { id: "b", text: "About 2 hours before starting the exercise" },
                { id: "c", text: "Immediately at the first wheeze during exercise" },
                { id: "d", text: "Only afterwards, once the exercise is finished" }
            ],
            correct: "a",
            rationale: {
                correct: "A short acting beta agonist (SABA) is taken about 15 minutes before exercise, which matches its 5 to 15 minute onset so the airway is already open when the effort starts.",
                b: "Two hours ahead wastes much of the 4 to 6 hour duration before the exercise begins.",
                c: "Waiting for the wheeze means treating an attack rather than preventing one.",
                d: "Using it only afterwards offers no protection during the activity that triggers the symptoms."
            },
            testTakingTip: "Match the timing to the onset. A short acting beta agonist (SABA) works in 5 to 15 minutes, so dose 15 minutes before exercise.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
