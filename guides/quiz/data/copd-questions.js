/**
 * COPD Quiz — Question Data
 * Extracted from guides/copd.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Ordering, 1 Matrix
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
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with COPD arrives at the ED with acute exacerbation \u2014 increased dyspnea, purulent sputum production, and SpO2 of 85% on room air. Place the nursing interventions in priority order.",
            options: [
                { id: "a", text: "Apply low-flow oxygen to target SpO2 88\u201392%" },
                { id: "b", text: "Obtain arterial blood gas (ABG)" },
                { id: "c", text: "Administer nebulized bronchodilator per protocol" },
                { id: "d", text: "Administer systemic corticosteroids as ordered" },
                { id: "e", text: "Obtain sputum culture if infectious exacerbation suspected" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Prioritize ABCs \u2014 oxygenation first with COPD-specific targets (88\u201392%). Then assess ventilation (ABG), treat bronchospasm (nebulizer), reduce inflammation (steroids), and collect diagnostic specimens.",
                a: "FIRST \u2014 SpO2 of 85% requires immediate oxygen therapy. In COPD, use LOW-flow oxygen targeting SpO2 88\u201392%. High-flow oxygen risks suppressing the hypoxic ventilatory drive and causing CO2 narcosis.",
                b: "SECOND \u2014 Once oxygen is initiated, obtain an ABG to evaluate PaCO2, pH, and PaO2. The ABG guides treatment decisions (e.g., need for BiPAP if CO2 is critically elevated).",
                c: "THIRD \u2014 Nebulized short-acting bronchodilators (albuterol + ipratropium) relieve bronchospasm and improve airflow.",
                d: "FOURTH \u2014 Systemic corticosteroids reduce airway inflammation, shorten recovery time, and reduce treatment failure. They take hours to reach full effect, so early administration is important.",
                e: "FIFTH \u2014 Sputum culture identifies the causative organism for guiding antibiotic therapy. It is diagnostic and does not directly stabilize the patient."
            },
            testTakingTip: "COPD exacerbation: O2 (low-flow, 88\u201392%) \u2192 ABG \u2192 Bronchodilator \u2192 Steroids \u2192 Culture. Remember: COPD patients get LOW-flow O2, never high-flow.",
            guideSection: "Section 7 \u2014 Medication Management",
            guideSectionId: "medications"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with COPD is prescribed a fluticasone/salmeterol (Advair) inhaler and an albuterol (ProAir) rescue inhaler. Which statement by the patient indicates correct understanding of the medications?",
            options: [
                { id: "a", text: "\"I use my Advair inhaler when I feel short of breath and save the albuterol for bedtime.\"" },
                { id: "b", text: "\"I take my Advair every day as scheduled, use my albuterol only when I need quick relief, and rinse my mouth after the Advair.\"" },
                { id: "c", text: "\"I use whichever inhaler is closest when I have trouble breathing \u2014 they both do the same thing.\"" },
                { id: "d", text: "\"I take my albuterol every morning and evening, and use Advair if the albuterol doesn\u2019t work.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Advair is a maintenance (controller) inhaler containing an inhaled corticosteroid (fluticasone) and a long-acting bronchodilator (salmeterol). It must be taken daily on schedule, not PRN. Albuterol is a short-acting rescue bronchodilator used only for acute symptoms. Rinsing the mouth after ICS prevents oral candidiasis (thrush).",
                a: "Advair is NOT a rescue inhaler \u2014 it takes time to work and is meant for daily maintenance. Albuterol is the rescue inhaler for acute shortness of breath, not a bedtime medication.",
                c: "These inhalers have completely different mechanisms and purposes. Using the wrong one in an emergency (Advair instead of albuterol) would not provide rapid relief and could delay appropriate treatment.",
                d: "This reverses the roles. Albuterol should be used PRN for rescue, not on a fixed schedule. Advair is the scheduled maintenance inhaler. Using a SABA on a regular schedule without a controller indicates inadequate maintenance therapy."
            },
            testTakingTip: "Controller vs. rescue is one of the most tested inhaler concepts. SABAs (albuterol) = rescue/PRN. ICS or ICS/LABA combos (Advair, Symbicort) = scheduled maintenance. Always rinse mouth after ICS to prevent thrush. If a patient uses their rescue inhaler >2 days/week, their maintenance therapy needs to be stepped up.",
            guideSection: "Section 7 \u2014 Medication Management",
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
            type: "matrix",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is comparing the clinical presentations of two patients with COPD. For each finding, indicate whether it is more characteristic of emphysema or chronic bronchitis.",
            matrixColumns: ["Emphysema (Pink Puffer)", "Chronic Bronchitis (Blue Bloater)"],
            options: [
                { id: "a", text: "Barrel chest with pursed-lip breathing" },
                { id: "b", text: "Chronic productive cough with copious sputum" },
                { id: "c", text: "Significant weight loss and muscle wasting" },
                { id: "d", text: "Peripheral edema and cyanosis" }
            ],
            correct: { a: "Emphysema (Pink Puffer)", b: "Chronic Bronchitis (Blue Bloater)", c: "Emphysema (Pink Puffer)", d: "Chronic Bronchitis (Blue Bloater)" },
            rationale: {
                correct: "Emphysema patients ('Pink Puffers') present with hyperinflation, weight loss, and increased work of breathing. Chronic bronchitis patients ('Blue Bloaters') present with productive cough, cyanosis, and right-sided heart failure signs.",
                a: "EMPHYSEMA \u2014 Alveolar destruction causes air trapping and lung hyperinflation, leading to increased AP diameter (barrel chest). Pursed-lip breathing creates auto-PEEP to keep airways open.",
                b: "CHRONIC BRONCHITIS \u2014 Defined by a chronic productive cough for at least 3 months in 2 consecutive years. Inflammation and hypertrophy of mucus glands cause excessive mucus production.",
                c: "EMPHYSEMA \u2014 Increased work of breathing dramatically increases caloric expenditure. Combined with decreased appetite from dyspnea, patients develop cachexia.",
                d: "CHRONIC BRONCHITIS \u2014 Chronic hypoxemia leads to cyanosis. Prolonged hypoxemia causes pulmonary hypertension and right-sided heart failure (cor pulmonale), manifesting as peripheral edema and JVD."
            },
            testTakingTip: "Pink Puffer (emphysema) = thin, barrel chest, pursed-lip breathing, dyspnea, weight loss. Blue Bloater (chronic bronchitis) = overweight, productive cough, cyanosis, edema, cor pulmonale.",
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
