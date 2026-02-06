/**
 * COPD Quiz — Question Data
 * Extracted from guides/copd.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 SATA, 2 Priority
 */

/* exported copdQuizData */
var copdQuizData = {
    guideName: "COPD",
    guideSlug: "copd",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient with a long history of emphysema. Which assessment finding does the nurse expect?",
            options: [
                { id: "a", text: "Productive cough with thick, copious sputum" },
                { id: "b", text: "Barrel chest with diminished breath sounds" },
                { id: "c", text: "Cyanosis with dependent edema" },
                { id: "d", text: "Wheezing that resolves with bronchodilators" }
            ],
            correct: "b",
            rationale: {
                correct: "Emphysema (\"Pink Puffer\") causes destruction of alveolar walls and loss of elastic recoil, leading to air trapping and hyperinflation. This produces a barrel chest (increased AP diameter), diminished breath sounds (air trapped in enlarged airspaces), dyspnea on exertion, pursed-lip breathing, and use of accessory muscles.",
                a: "Productive cough with copious sputum is the hallmark of chronic bronchitis (\"Blue Bloater\"), not emphysema. Emphysema patients typically have a minimal, non-productive cough.",
                c: "Cyanosis and dependent edema are characteristic of chronic bronchitis with cor pulmonale (right-sided heart failure). Emphysema patients maintain relatively normal oxygenation early on through increased respiratory effort (\"pink puffers\").",
                d: "Fully reversible wheezing is characteristic of asthma. COPD airway obstruction is largely irreversible, though some bronchospasm component may partially respond to bronchodilators."
            },
            testTakingTip: "Remember the classic profiles: Pink Puffer (emphysema) = thin, barrel chest, dyspnea, pursed lips, minimal cyanosis. Blue Bloater (chronic bronchitis) = overweight, productive cough, cyanosis, edema. Most COPD patients have features of both.",
            guideSection: "Section 2 \u2014 Emphysema vs Chronic Bronchitis",
            guideSectionId: "bronchitis-emphysema"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with COPD and chronic CO2 retention is admitted with an exacerbation. The respiratory therapist increases the oxygen flow rate to 6 L/min via nasal cannula. The nurse notices the patient becomes increasingly drowsy and the respiratory rate drops from 18 to 8 breaths/min. The nurse should FIRST:",
            options: [
                { id: "a", text: "Continue the oxygen and let the patient rest" },
                { id: "b", text: "Reduce the oxygen flow rate and stimulate the patient" },
                { id: "c", text: "Remove the oxygen completely and call a rapid response" },
                { id: "d", text: "Administer a dose of naloxone (Narcan)" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient is experiencing CO2 narcosis from excessive oxygen. In chronic CO2 retainers, the respiratory drive shifts from the normal CO2 stimulus to a hypoxic drive. High-flow oxygen eliminates the hypoxic stimulus, causing respiratory depression. The nurse should reduce (not remove) the oxygen to 1-2 L/min and stimulate the patient to breathe. Target SpO2 is 88-92% for these patients.",
                a: "This patient is not resting \u2014 they\u2019re developing respiratory failure from CO2 narcosis. Continuing high-flow O2 could lead to respiratory arrest.",
                c: "Never completely remove oxygen from a hypoxemic patient. The goal is to reduce flow, not eliminate it. These patients still need supplemental O2, just at a lower rate.",
                d: "Naloxone reverses opioid-induced respiratory depression. This patient\u2019s drowsiness is from CO2 narcosis, not opioid overdose. Naloxone would have no effect."
            },
            testTakingTip: "COPD + chronic CO2 retention = low-flow O2 only (1-2 L/min, target SpO2 88-92%). High-flow O2 knocks out the hypoxic drive \u2192 CO2 narcosis \u2192 respiratory arrest. This is one of the most tested COPD concepts on NCLEX. Reduce the O2, don\u2019t remove it.",
            guideSection: "Section 5 \u2014 Oxygen Therapy in COPD",
            guideSectionId: "oxygen-therapy"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching a patient with COPD about breathing techniques. Which instruction demonstrates correct pursed-lip breathing?",
            options: [
                { id: "a", text: "\"Breathe in through your mouth for 4 counts, then out through your nose for 2 counts.\"" },
                { id: "b", text: "\"Breathe in through your nose for 2 counts, then out through pursed lips for 4 counts.\"" },
                { id: "c", text: "\"Take a deep breath and hold it for 10 seconds before exhaling slowly.\"" },
                { id: "d", text: "\"Breathe rapidly through your mouth to get more oxygen into your lungs.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Pursed-lip breathing involves inhaling through the nose (2 counts) and exhaling slowly through pursed lips (4 counts) \u2014 a 1:2 inhale-to-exhale ratio. This technique creates back-pressure (positive end-expiratory pressure) that keeps airways open longer during exhalation, prevents air trapping, and improves CO2 elimination.",
                a: "This reverses the correct technique. Inhalation should be through the nose (warms and filters air), and exhalation through pursed lips. Mouth breathing on inhalation dries airways.",
                c: "Breath-holding increases intrathoracic pressure and is not appropriate for COPD patients who already have air trapping. This technique is used for incentive spirometry, not COPD management.",
                d: "Rapid mouth breathing (tachypnea) is inefficient \u2014 it moves air in the dead space without improving gas exchange and increases work of breathing."
            },
            testTakingTip: "Pursed-lip breathing: IN through nose (2), OUT through pursed lips (4). The 1:2 ratio is key. This works because it creates \"auto-PEEP\" that stents airways open. Teach patients to use this during activity and episodes of dyspnea.",
            guideSection: "Section 6 \u2014 Breathing Techniques",
            guideSectionId: "breathing-techniques"
        },
        {
            id: 4,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A patient with COPD uses multiple inhalers daily. Which statements indicate correct understanding of inhaler use? (Select all that apply.)",
            options: [
                { id: "a", text: "\"I use my albuterol inhaler first, then wait a few minutes before my steroid inhaler.\"" },
                { id: "b", text: "\"I rinse my mouth with water after using my steroid inhaler.\"" },
                { id: "c", text: "\"I use my steroid inhaler first because it\u2019s the most important medication.\"" },
                { id: "d", text: "\"I shake my MDI before each use.\"" },
                { id: "e", text: "\"I use my rescue inhaler on a regular schedule four times a day.\"" }
            ],
            correct: ["a", "b", "d"],
            rationale: {
                correct: "Bronchodilators (SABA like albuterol) should always be used BEFORE corticosteroids to open the airways first, allowing the steroid to deposit deeper in the lungs. Rinsing the mouth after inhaled corticosteroids prevents oral candidiasis (thrush) and hoarseness. MDIs must be shaken before use to ensure proper medication mixing.",
                a: "CORRECT \u2014 Bronchodilators (SABA like albuterol) should always be used BEFORE corticosteroids to open the airways first, allowing the steroid to deposit deeper in the lungs.",
                b: "CORRECT \u2014 Rinsing the mouth after inhaled corticosteroids prevents oral candidiasis (thrush) and hoarseness.",
                c: "INCORRECT \u2014 Corticosteroids should be used AFTER bronchodilators, not first. Using the steroid first means it deposits in constricted airways rather than reaching the lower lungs where it\u2019s most effective.",
                d: "CORRECT \u2014 MDIs must be shaken before use to ensure proper medication mixing.",
                e: "INCORRECT \u2014 Rescue inhalers (SABAs) are used PRN (as needed) for acute symptoms, not on a scheduled basis. Scheduled use of SABAs suggests uncontrolled disease requiring a step-up in controller therapy. Using SABAs >2 times per week indicates poor control."
            },
            testTakingTip: "Inhaler order: Bronchodilator FIRST, steroid SECOND. Always rinse mouth after ICS to prevent thrush. Needing rescue inhaler >2x/week (or >2 canisters/year) = poorly controlled disease. These are heavily tested concepts.",
            guideSection: "Section 7 \u2014 Medication Management",
            guideSectionId: "medications"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with COPD is receiving theophylline. The nurse checks the serum theophylline level and finds it is 24 mcg/mL. What is the appropriate nursing action?",
            options: [
                { id: "a", text: "Administer the next scheduled dose and recheck in 6 hours" },
                { id: "b", text: "Hold the medication and notify the provider" },
                { id: "c", text: "Continue the medication \u2014 this is within therapeutic range" },
                { id: "d", text: "Increase the dose as the level appears subtherapeutic" }
            ],
            correct: "b",
            rationale: {
                correct: "The therapeutic range for theophylline is 10-20 mcg/mL. A level of 24 mcg/mL is toxic. Theophylline has a narrow therapeutic index, and toxicity can cause tachycardia, seizures, and fatal arrhythmias. The nurse should hold the medication and notify the provider immediately.",
                a: "Administering another dose when the level is already toxic would further increase it, potentially causing seizures or fatal cardiac arrhythmias.",
                c: "24 mcg/mL exceeds the upper therapeutic limit of 20 mcg/mL. This is a toxic level requiring intervention.",
                d: "The level is supratherapeutic (toxic), not subtherapeutic. Increasing the dose would be extremely dangerous."
            },
            testTakingTip: "Theophylline therapeutic range: 10-20 mcg/mL. Narrow therapeutic index = toxicity risk is high. Early signs of toxicity: nausea, tachycardia, restlessness. Late signs: seizures, arrhythmias. Caffeine intake affects theophylline metabolism \u2014 counsel patients to limit caffeine.",
            labValues: [
                { name: "Theophylline", normal: "10\u201320 mcg/mL" }
            ],
            guideSection: "Section 7 \u2014 Theophylline",
            guideSectionId: "medications"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which intervention is the ONLY one proven to slow the progression of COPD?",
            options: [
                { id: "a", text: "Long-term oxygen therapy" },
                { id: "b", text: "Inhaled corticosteroids" },
                { id: "c", text: "Smoking cessation" },
                { id: "d", text: "Pulmonary rehabilitation" }
            ],
            correct: "c",
            rationale: {
                correct: "Smoking cessation is the single most important intervention in COPD management and the ONLY intervention proven to slow the decline in lung function (FEV1). All other treatments manage symptoms and reduce exacerbations but do not alter disease progression. Even in advanced COPD, quitting smoking provides benefit.",
                a: "Long-term O2 therapy (LTOT) improves survival in patients with chronic hypoxemia (PaO2 \u226455 or SpO2 \u226488%) but does not slow lung function decline.",
                b: "Inhaled corticosteroids reduce exacerbation frequency but do not alter the progressive decline in FEV1.",
                d: "Pulmonary rehab improves exercise capacity, quality of life, and reduces dyspnea, but does not slow disease progression."
            },
            testTakingTip: "This is a commonly tested fact: Only smoking cessation slows COPD progression. Only LTOT improves survival. Everything else manages symptoms. Know the difference between slowing progression, improving survival, and managing symptoms.",
            guideSection: "Section 8 \u2014 Prevention & Lifestyle Modifications",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A patient with COPD is being assessed for signs of a respiratory infection triggering an acute exacerbation. Which findings would indicate a COPD exacerbation? (Select all that apply.)",
            options: [
                { id: "a", text: "Increased sputum volume and purulence (yellow-green)" },
                { id: "b", text: "Worsening dyspnea beyond the patient\u2019s usual baseline" },
                { id: "c", text: "Decreased respiratory rate to 10 breaths per minute" },
                { id: "d", text: "Increased use of accessory muscles to breathe" },
                { id: "e", text: "New onset of peripheral edema and JVD" }
            ],
            correct: ["a", "b", "d"],
            rationale: {
                correct: "The three cardinal signs of COPD exacerbation are increased dyspnea, increased sputum volume, and increased sputum purulence. Increased accessory muscle use indicates significantly increased work of breathing from worsening airflow obstruction.",
                a: "CORRECT \u2014 Increased sputum volume and change to purulent (yellow-green) color is a cardinal sign of infection-triggered exacerbation.",
                b: "CORRECT \u2014 Worsening dyspnea beyond usual baseline is the most common presenting symptom of exacerbation.",
                c: "INCORRECT \u2014 A COPD exacerbation causes INCREASED respiratory rate (tachypnea), not decreased. A decreased rate would suggest respiratory fatigue/failure or CO2 narcosis \u2014 a late, ominous sign requiring immediate intervention.",
                d: "CORRECT \u2014 Increased accessory muscle use indicates significantly increased work of breathing from worsening airflow obstruction.",
                e: "INCORRECT \u2014 Peripheral edema and JVD indicate right-sided heart failure (cor pulmonale), which is a chronic complication of COPD, not an acute exacerbation. While it can occur concurrently, it\u2019s a separate finding."
            },
            testTakingTip: "3 cardinal signs of COPD exacerbation: Increased dyspnea + increased sputum volume + increased sputum purulence. A DROPPING respiratory rate in an exacerbation is a danger sign (fatigue/impending arrest), not a sign of improvement.",
            guideSection: "Section 4 \u2014 Acute Exacerbations",
            guideSectionId: "assessment"
        },
        {
            id: 8,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a COPD patient on a Venturi mask at 28% FiO2. The patient\u2019s ABG results show: pH 7.25, PaCO2 68 mmHg, PaO2 58 mmHg, HCO3 38 mEq/L. The nurse interprets this as:",
            options: [
                { id: "a", text: "Fully compensated respiratory acidosis \u2014 continue current treatment" },
                { id: "b", text: "Acute respiratory acidosis \u2014 prepare for intubation" },
                { id: "c", text: "Acute-on-chronic respiratory acidosis \u2014 notify provider for possible BiPAP" },
                { id: "d", text: "Metabolic alkalosis \u2014 hold the diuretics" }
            ],
            correct: "c",
            rationale: {
                correct: "The elevated HCO3 (38) indicates chronic CO2 retention with renal compensation (kidneys retain bicarb over time). However, the pH is still acidotic (7.25) and PaCO2 is significantly elevated (68), meaning the compensation is not keeping up \u2014 this is acute-on-chronic respiratory acidosis. BiPAP (non-invasive positive pressure ventilation) can reduce the work of breathing and improve CO2 elimination without intubation.",
                a: "If fully compensated, the pH would be normal (7.35-7.45). A pH of 7.25 is significantly acidotic \u2014 the patient is decompensating and needs intervention.",
                b: "In purely acute respiratory acidosis, the HCO3 would be near normal (22-26). The elevated HCO3 of 38 shows chronic compensation, making this acute-on-chronic. BiPAP is the first-line intervention before considering intubation.",
                d: "The primary disorder is respiratory acidosis (high CO2), not metabolic alkalosis. The elevated HCO3 is compensatory, not the primary problem."
            },
            testTakingTip: "ABG interpretation in COPD: High HCO3 = kidneys compensating for chronic CO2 retention. If pH is still abnormal despite high HCO3, the patient has decompensated (acute-on-chronic). BiPAP is the bridge between nasal cannula and intubation \u2014 know when to escalate.",
            labValues: [
                { name: "pH", normal: "7.35\u20137.45" },
                { name: "PaCO2", normal: "35\u201345 mmHg" },
                { name: "PaO2", normal: "80\u2013100 mmHg" },
                { name: "HCO3", normal: "22\u201326 mEq/L" }
            ],
            guideSection: "Section 3 \u2014 ABG Interpretation in COPD",
            guideSectionId: "oxygen-therapy"
        }
    ]
};
