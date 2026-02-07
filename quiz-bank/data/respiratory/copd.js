/**
 * Quiz Bank — COPD
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "copd-qb-001",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing the pulmonary function test results of a patient suspected of having COPD. Which finding is most consistent with an obstructive airway disease diagnosis?",
        options: [
            { id: "a", text: "FEV1/FVC ratio greater than 0.80" },
            { id: "b", text: "FEV1/FVC ratio less than 0.70 after bronchodilator use" },
            { id: "c", text: "Total lung capacity decreased to 70% of predicted" },
            { id: "d", text: "Diffusing capacity (DLCO) above normal" }
        ],
        correct: "b",
        rationale: {
            correct: "A post-bronchodilator FEV1/FVC ratio less than 0.70 is the spirometric hallmark of COPD and confirms persistent airflow limitation. Unlike asthma, the obstruction in COPD is not fully reversible with bronchodilators. A high FEV1/FVC ratio is normal. Decreased total lung capacity suggests restriction, not obstruction. DLCO is typically decreased in emphysema, not increased."
        },
        testTakingTip: "COPD diagnosis requires post-bronchodilator FEV1/FVC < 0.70. The key word is 'post-bronchodilator' — this differentiates it from reversible obstruction like asthma.",
        relatedGuide: "copd.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "copd-qb-002",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "application",
        stem: "A patient with stable COPD is prescribed tiotropium (Spiriva HandiHaler). The patient tells the nurse, 'I've been swallowing these capsules every morning.' What is the nurse's best response?",
        options: [
            { id: "a", text: "That is the correct way to take this medication for maximum absorption." },
            { id: "b", text: "These capsules are designed for inhalation only — let me show you how to use the HandiHaler device." },
            { id: "c", text: "You should be chewing the capsules instead of swallowing them whole." },
            { id: "d", text: "Swallowing is acceptable, but inhaling provides slightly faster relief." }
        ],
        correct: "b",
        rationale: {
            correct: "Tiotropium capsules for the HandiHaler are designed exclusively for inhalation, not oral ingestion. The capsule is placed in the inhaler device, pierced, and the dry powder is inhaled. Swallowing the capsule provides virtually no therapeutic benefit because the drug needs direct contact with bronchial smooth muscle receptors. This is a critical medication administration error that must be corrected immediately with device education."
        },
        testTakingTip: "DPI (dry powder inhaler) capsules are for inhalation ONLY — never swallowed. Always ask patients to demonstrate their inhaler technique. Device misuse is one of the most common reasons for treatment failure in COPD.",
        relatedGuide: "copd.html",
        relatedGuideSection: "medications"
    },

    {
        id: "copd-qb-003",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is providing education about COPD staging. According to the GOLD classification, a patient with an FEV1 of 42% predicted would be classified as which stage?",
        options: [
            { id: "a", text: "GOLD 1 — Mild" },
            { id: "b", text: "GOLD 2 — Moderate" },
            { id: "c", text: "GOLD 3 — Severe" },
            { id: "d", text: "GOLD 4 — Very Severe" }
        ],
        correct: "c",
        rationale: {
            correct: "GOLD staging is based on post-bronchodilator FEV1 percentage of predicted: GOLD 1 (Mild) = FEV1 ≥ 80%, GOLD 2 (Moderate) = 50-79%, GOLD 3 (Severe) = 30-49%, GOLD 4 (Very Severe) = < 30%. An FEV1 of 42% falls in the GOLD 3 (Severe) range."
        },
        testTakingTip: "GOLD stages use the 80-50-30 rule: ≥80% = mild, 50-79% = moderate, 30-49% = severe, <30% = very severe. This is a high-yield fact for exams.",
        relatedGuide: "copd.html",
        relatedGuideSection: "classification"
    },

    {
        id: "copd-qb-004",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "application",
        stem: "A home health nurse visits a patient who uses continuous home oxygen at 2 L/min via nasal cannula. The patient's spouse mentions they keep the portable oxygen tank in the coat closet next to the gas furnace. Which response is most appropriate?",
        options: [
            { id: "a", text: "That is an acceptable storage location as long as the tank is upright." },
            { id: "b", text: "The tank must be moved away from the furnace — oxygen supports combustion and must be stored at least 10 feet from heat sources and open flames." },
            { id: "c", text: "The tank should be stored outside the home to prevent any fire risk." },
            { id: "d", text: "Place the tank on its side in the closet so it doesn't fall over." }
        ],
        correct: "b",
        rationale: {
            correct: "Oxygen supports combustion and must be stored at least 5-10 feet from any heat source, open flame, or gas-powered appliance. A coat closet next to a gas furnace is a significant fire and explosion risk. The tank should be moved to a well-ventilated area away from heat. Oxygen should be stored upright and secured, never on its side or outdoors where temperature extremes could affect it."
        },
        testTakingTip: "Home oxygen safety: no smoking, keep 10 feet from flames/heat, store upright, no petroleum-based products near oxygen, use cotton clothing. These are common test topics for COPD discharge teaching.",
        relatedGuide: "copd.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "copd-qb-005",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with severe COPD is admitted with an acute exacerbation. The ABG results show: pH 7.32, PaCO2 58 mmHg, PaO2 52 mmHg, HCO3 34 mEq/L. Compared to the patient's baseline ABG (pH 7.36, PaCO2 52 mmHg, HCO3 32 mEq/L), the nurse interprets the current ABG as:",
        options: [
            { id: "a", text: "Fully compensated respiratory acidosis — no acute change" },
            { id: "b", text: "Acute respiratory acidosis superimposed on chronic respiratory acidosis" },
            { id: "c", text: "Metabolic alkalosis with respiratory compensation" },
            { id: "d", text: "Mixed respiratory and metabolic acidosis" }
        ],
        correct: "b",
        rationale: {
            correct: "The baseline ABG shows chronic compensated respiratory acidosis (elevated CO2 with appropriately elevated HCO3, near-normal pH), which is typical for severe COPD. The current ABG shows a further rise in PaCO2 (52→58), drop in pH (7.36→7.32), with only a slight HCO3 increase (32→34). The kidneys haven't had time to fully compensate for the additional CO2 retention. This pattern — acute CO2 rise on top of chronic elevation — indicates an acute-on-chronic respiratory acidosis."
        },
        testTakingTip: "COPD patients often have a baseline compensated respiratory acidosis. During exacerbation, look for: rising CO2 above their baseline, falling pH, and HCO3 that hasn't caught up yet. This is 'acute on chronic' — a classic COPD exam question.",
        relatedGuide: "copd.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "copd-qb-006",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is educating a patient with COPD about the COPD Action Plan. The patient asks what the 'yellow zone' means. Which explanation is most accurate?",
        options: [
            { id: "a", text: "You are feeling well, your breathing is at its usual level, and you continue your regular medications." },
            { id: "b", text: "Your symptoms are worse than usual — more breathless, increased cough or sputum — and you need to start your rescue medications and call your provider." },
            { id: "c", text: "You are in a life-threatening emergency and need to call 911 immediately." },
            { id: "d", text: "You are ready to begin pulmonary rehabilitation exercises." }
        ],
        correct: "b",
        rationale: {
            correct: "The COPD Action Plan uses a traffic light system: Green zone = doing well, continue regular medications. Yellow zone = worsening symptoms (increased dyspnea, cough, or sputum production/color change), requiring initiation of rescue medications (short-acting bronchodilators, possibly prednisone and antibiotics) and contacting the provider. Red zone = severe symptoms or emergency, call 911."
        },
        testTakingTip: "COPD Action Plan: Green = go (stable, maintain), Yellow = caution (worsening, escalate treatment + call provider), Red = stop/emergency (call 911). Same traffic light concept as asthma action plans.",
        relatedGuide: "copd.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "copd-qb-007",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "application",
        stem: "A patient with moderate COPD asks the nurse why the pulmonologist added an inhaled corticosteroid (ICS) to their existing long-acting bronchodilator regimen. Which response best explains the rationale?",
        options: [
            { id: "a", text: "The corticosteroid will open your airways faster than the bronchodilator alone." },
            { id: "b", text: "Adding an ICS helps reduce airway inflammation and decreases the frequency of exacerbations in patients who continue to have flare-ups despite bronchodilators." },
            { id: "c", text: "The ICS replaces the bronchodilator — you will stop the previous inhaler." },
            { id: "d", text: "Inhaled corticosteroids cure the underlying lung damage in COPD." }
        ],
        correct: "b",
        rationale: {
            correct: "In COPD, ICS are added to long-acting bronchodilator therapy (LABA and/or LAMA) when patients continue to experience exacerbations despite optimal bronchodilator use, especially if eosinophil counts are elevated. ICS reduce airway inflammation and exacerbation frequency but do not replace bronchodilators and do not cure COPD. They are not first-line therapy and carry risks of pneumonia with long-term use."
        },
        testTakingTip: "ICS in COPD is an add-on therapy for exacerbation reduction, NOT a first-line or stand-alone treatment. Bronchodilators remain the foundation. ICS + LABA/LAMA = triple therapy for frequent exacerbators.",
        relatedGuide: "copd.html",
        relatedGuideSection: "medications"
    },

    {
        id: "copd-qb-008",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is caring for a patient admitted with a COPD exacerbation who is receiving oxygen via Venturi mask at 28% FiO2. The patient's SpO2 is 87% and the patient is increasingly dyspneic. A family member adjusts the oxygen to 60% FiO2. The nurse should:",
        options: [
            { id: "a", text: "Thank the family member and continue monitoring the patient's SpO2." },
            { id: "b", text: "Immediately return the FiO2 to 28%, explain the danger, and assess the patient's respiratory drive and mental status." },
            { id: "c", text: "Withhold all supplemental oxygen because COPD patients should not receive oxygen therapy." },
            { id: "d", text: "Increase to 100% FiO2 since the patient is clearly hypoxic." }
        ],
        correct: "b",
        rationale: {
            correct: "While oxygen should never be withheld from a hypoxic COPD patient, the target SpO2 for COPD is 88-92%, not the 94-98% used for most patients. Abruptly increasing to high-flow oxygen can suppress respiratory drive in CO2-retaining COPD patients via the Haldane effect and reduced hypoxic drive. The nurse should return to the prescribed FiO2, assess for CO2 narcosis (drowsiness, confusion), and notify the provider if the patient continues to deteriorate. Titrate carefully, not withhold."
        },
        testTakingTip: "COPD oxygen target: 88-92% SpO2. Too much O2 in a CO2 retainer can suppress breathing, but NEVER withhold oxygen from a hypoxic patient. The answer is always to titrate carefully, not to avoid O2 entirely.",
        relatedGuide: "copd.html",
        relatedGuideSection: "oxygen-therapy"
    },

    {
        id: "copd-qb-009",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with end-stage COPD (GOLD 4) and frequent hospitalizations asks the nurse, 'My doctor mentioned palliative care. Does that mean they're giving up on me?' Which response is most therapeutic?",
        options: [
            { id: "a", text: "Your doctor can explain the details at your next appointment." },
            { id: "b", text: "Palliative care doesn't mean giving up. It is a team that works alongside your regular doctors to help manage your symptoms, improve your quality of life, and support you and your family with the challenges of living with advanced COPD." },
            { id: "c", text: "Yes, palliative care is typically the last step before hospice." },
            { id: "d", text: "You shouldn't worry about that. Let's focus on your breathing exercises." }
        ],
        correct: "b",
        rationale: {
            correct: "Palliative care is often misunderstood as 'giving up' or the same as hospice. In reality, palliative care can be initiated at any stage of serious illness alongside curative treatments. For end-stage COPD, it focuses on symptom management (dyspnea, anxiety, fatigue), advance care planning, psychosocial support, and improving quality of life. It is not limited to end of life and does not mean stopping active treatment."
        },
        testTakingTip: "Palliative care ≠ hospice. Palliative care = symptom management + quality of life at ANY stage of serious illness. Hospice = comfort care when curative treatment is stopped and prognosis is <6 months. Know the difference.",
        relatedGuide: "copd.html",
        relatedGuideSection: "advanced-management"
    },

    {
        id: "copd-qb-010",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "application",
        stem: "A nurse is teaching a patient with COPD about energy conservation strategies for daily activities. Which statement by the patient indicates effective learning?",
        options: [
            { id: "a", text: "I should do all my housework in one session to get it over with quickly." },
            { id: "b", text: "I'll sit on a stool while showering and use a long-handled sponge to reduce bending." },
            { id: "c", text: "I need to stop all physical activity to conserve my energy." },
            { id: "d", text: "I should take shallow, rapid breaths during activities to save energy." }
        ],
        correct: "b",
        rationale: {
            correct: "Sitting during activities like showering conserves energy and reduces oxygen demand. Using adaptive equipment (long-handled sponge) minimizes bending, which compresses the diaphragm and worsens dyspnea. Energy conservation in COPD involves pacing activities (not doing everything at once), using adaptive equipment, sitting when possible, and incorporating pursed-lip breathing during exertion — not avoiding all activity or taking shallow breaths."
        },
        testTakingTip: "Energy conservation = pace activities, sit when possible, use adaptive equipment, plan rest periods. COPD patients should stay active (pulmonary rehab is beneficial) but modify HOW they do activities.",
        relatedGuide: "copd.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "copd-qb-011",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with COPD asks the nurse which vaccinations are recommended. Which combination is correct?",
        options: [
            { id: "a", text: "Annual influenza vaccine only" },
            { id: "b", text: "Annual influenza vaccine and pneumococcal vaccine (PCV20 or PCV15 followed by PPSV23)" },
            { id: "c", text: "Pneumococcal vaccine only — influenza vaccination is contraindicated in COPD" },
            { id: "d", text: "Neither vaccine is recommended because they contain live virus" }
        ],
        correct: "b",
        rationale: {
            correct: "COPD patients are at high risk for respiratory infections that trigger exacerbations. Guidelines recommend annual influenza vaccination AND pneumococcal vaccination (PCV20, or PCV15 followed by PPSV23) for all COPD patients. COVID-19 vaccination is also recommended. None of these are live virus vaccines (injectable flu vaccine is inactivated), so they are safe for COPD patients."
        },
        testTakingTip: "COPD vaccination: annual flu shot + pneumococcal vaccine + COVID-19 + Tdap. Respiratory infections are the #1 trigger for COPD exacerbations. Vaccination is a key preventive strategy.",
        relatedGuide: "copd.html",
        relatedGuideSection: "prevention"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "copd-qb-012",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "ordering",
        difficulty: "application",
        stem: "A patient with COPD is experiencing an acute exacerbation at home with increasing dyspnea, green sputum production, and low-grade fever. The patient refers to their COPD Action Plan. Place the patient's self-management actions in the correct order.",
        options: [
            { id: "s1", text: "Sit upright in a tripod position and begin pursed-lip breathing" },
            { id: "s2", text: "Use the rescue inhaler (albuterol) — 2 puffs every 4-6 hours as needed" },
            { id: "s3", text: "Start the prescribed standby oral prednisone and antibiotic as directed in the yellow zone plan" },
            { id: "s4", text: "Call the healthcare provider to report the exacerbation and green sputum" },
            { id: "s5", text: "Monitor symptoms over the next 24-48 hours and proceed to the ER if no improvement" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Positioning and controlled breathing are immediate self-rescue techniques. Tripod position and pursed-lip breathing reduce air trapping and improve ventilation.",
            s2: "Rescue bronchodilator is the first medication intervention to open narrowed airways quickly.",
            s3: "Yellow zone protocols often include standby prescriptions for oral corticosteroids and antibiotics. Starting them early reduces exacerbation severity and hospital admissions.",
            s4: "After initiating self-treatment, the provider should be notified to adjust the treatment plan if needed and to document the exacerbation.",
            s5: "Continued monitoring ensures the self-management plan is working. If symptoms worsen or don't improve within 24-48 hours, emergency evaluation is needed."
        },
        testTakingTip: "COPD Action Plan at home: position + breathe → rescue inhaler → start standby meds → call provider → monitor/ER if failing. Early self-management reduces hospitalizations.",
        relatedGuide: "copd.html",
        relatedGuideSection: "exacerbation"
    },

    {
        id: "copd-qb-013",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A patient is learning to use a dry powder inhaler (DPI) for the first time. Place the steps for correct DPI technique in order.",
        options: [
            { id: "s1", text: "Open the device and load the dose (twist, click, or pierce the capsule per device instructions)" },
            { id: "s2", text: "Exhale fully AWAY from the mouthpiece (to avoid blowing powder out of the device)" },
            { id: "s3", text: "Place lips tightly around the mouthpiece and inhale quickly and deeply through the mouth" },
            { id: "s4", text: "Hold breath for 5-10 seconds, then exhale slowly through pursed lips" },
            { id: "s5", text: "If a second dose is prescribed, wait 1 minute and repeat the process" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Loading the dose prepares the powder for delivery. Each device type has a specific loading mechanism.",
            s2: "Exhaling away from the mouthpiece is critical — exhaling into the DPI introduces moisture and clumps the powder, reducing delivery.",
            s3: "DPIs require a fast, forceful inhalation (unlike MDIs which need slow, deep breaths). The patient's own breath generates the aerosol from the powder.",
            s4: "Holding the breath allows the medication particles to deposit in the small airways. Exhaling through pursed lips maintains positive pressure.",
            s5: "Waiting between doses ensures full delivery of each dose. Never load two doses at once."
        },
        testTakingTip: "DPI vs MDI technique: DPI = fast, forceful inhalation (breath-powered). MDI = slow, deep inhalation (with spacer for coordination). This difference is a common exam trap.",
        relatedGuide: "copd.html",
        relatedGuideSection: "medications"
    },

    {
        id: "copd-qb-014",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "ordering",
        difficulty: "analysis",
        stem: "A COPD patient on a medical-surgical unit is found unresponsive with slow, shallow respirations (RR 6), pinpoint pupils are not present, but the oxygen has been found turned up to 10 L/min. The nurse suspects CO2 narcosis. Place the nursing actions in priority order.",
        options: [
            { id: "s1", text: "Reduce oxygen to the prescribed low-flow rate (1-2 L/min) and stimulate the patient to breathe" },
            { id: "s2", text: "Call a rapid response team" },
            { id: "s3", text: "Obtain a STAT arterial blood gas" },
            { id: "s4", text: "Prepare for non-invasive positive pressure ventilation (BiPAP) if ordered" },
            { id: "s5", text: "Investigate how the oxygen was increased and implement safety measures" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Immediate action: reduce the excessive oxygen that is suppressing respiratory drive. Do NOT discontinue oxygen entirely — titrate down to maintain SpO2 88-92%. Stimulate the patient (sternal rub, verbal commands) to breathe.",
            s2: "The patient is unresponsive with respiratory depression — this is a medical emergency requiring a rapid response team for advanced airway management support.",
            s3: "ABG confirms the degree of CO2 retention and respiratory acidosis, guiding further treatment decisions.",
            s4: "BiPAP provides ventilatory support without intubation, helping to blow off excess CO2 while maintaining oxygenation. It is first-line for acute hypercapnic respiratory failure in COPD.",
            s5: "After stabilization, determine root cause (visitor adjusted O2, equipment malfunction, wrong order) and implement safeguards (signage, low-flow limiters, education)."
        },
        testTakingTip: "CO2 narcosis in COPD: reduce (don't stop) oxygen → call for help → get ABG → prepare BiPAP. Remember: the problem is too much CO2, not too much O2. Reducing O2 helps restore the drive to breathe.",
        relatedGuide: "copd.html",
        relatedGuideSection: "oxygen-therapy"
    },

    {
        id: "copd-qb-015",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "ordering",
        difficulty: "application",
        stem: "A newly diagnosed COPD patient is beginning pulmonary rehabilitation. Place the components of a comprehensive pulmonary rehabilitation program in the order they are typically introduced.",
        options: [
            { id: "s1", text: "Baseline assessment: exercise capacity (6-minute walk test), dyspnea scale, quality of life questionnaire" },
            { id: "s2", text: "Education: disease process, medication management, breathing techniques, nutrition" },
            { id: "s3", text: "Supervised exercise training: endurance (walking/cycling) and upper/lower extremity strengthening" },
            { id: "s4", text: "Psychosocial support: anxiety/depression screening, coping strategies, support groups" },
            { id: "s5", text: "Maintenance plan: home exercise program, ongoing self-management, follow-up assessments" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Baseline assessment establishes starting points for exercise prescription and allows measurement of progress over the program.",
            s2: "Education provides the foundation for understanding the disease and builds motivation for the exercise and lifestyle components.",
            s3: "Supervised exercise is the core component of pulmonary rehab. Both endurance and strength training improve exercise tolerance and reduce dyspnea.",
            s4: "Depression and anxiety are common in COPD (up to 40% prevalence) and significantly impact adherence. Addressing these alongside exercise improves outcomes.",
            s5: "A maintenance plan ensures the gains from rehabilitation are sustained after the formal program ends. Without maintenance, benefits decline within 12-18 months."
        },
        testTakingTip: "Pulmonary rehab is a multidisciplinary program, not just exercise. The sequence is: assess → educate → exercise → address psychosocial → maintain. It improves quality of life even though it doesn't improve lung function.",
        relatedGuide: "copd.html",
        relatedGuideSection: "management"
    },

    {
        id: "copd-qb-016",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with COPD who smokes 1 pack per day expresses interest in quitting. The nurse uses the 5 A's framework for smoking cessation. Place the steps in the correct order.",
        options: [
            { id: "s1", text: "Ask — Screen and document the patient's tobacco use status" },
            { id: "s2", text: "Advise — Provide a clear, personalized message to quit" },
            { id: "s3", text: "Assess — Determine the patient's readiness and willingness to quit" },
            { id: "s4", text: "Assist — Offer pharmacotherapy (NRT, bupropion, or varenicline) and counseling resources" },
            { id: "s5", text: "Arrange — Schedule follow-up contact within one week of the quit date" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Every patient should be screened for tobacco use at every visit. Documentation triggers the intervention pathway.",
            s2: "A clear, strong, personalized cessation message (e.g., 'Quitting is the single most important thing you can do to slow your COPD') is more effective than generic advice.",
            s3: "Assessing readiness to quit determines the next steps. If ready, move to assist. If not ready, use motivational interviewing to explore barriers.",
            s4: "Combination therapy (pharmacotherapy + behavioral counseling) has the highest success rates. NRT, bupropion, and varenicline all improve quit rates.",
            s5: "Follow-up within the first week is critical — relapse risk is highest in the first 2 weeks. Ongoing support significantly improves long-term abstinence."
        },
        testTakingTip: "The 5 A's of smoking cessation: Ask, Advise, Assess, Assist, Arrange. Smoking cessation is the ONLY intervention proven to slow COPD progression — more effective than any medication.",
        relatedGuide: "copd.html",
        relatedGuideSection: "prevention"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "copd-qb-017",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each characteristic, indicate whether it is primarily associated with COPD or asthma.",
        columns: ["COPD", "Asthma"],
        rows: [
            { id: "r1", text: "Airflow limitation is largely irreversible despite treatment", correct: "COPD" },
            { id: "r2", text: "Symptoms typically begin in childhood or young adulthood", correct: "Asthma" },
            { id: "r3", text: "Strongly associated with a significant smoking history", correct: "COPD" },
            { id: "r4", text: "Airway hyperresponsiveness to triggers with reversible bronchoconstriction", correct: "Asthma" },
            { id: "r5", text: "Neutrophilic airway inflammation predominates", correct: "COPD" },
            { id: "r6", text: "Eosinophilic airway inflammation predominates", correct: "Asthma" }
        ],
        rationale: {
            correct: "COPD and asthma are both obstructive lung diseases but differ fundamentally. COPD: irreversible obstruction, onset in middle age, smoking-related, neutrophilic inflammation, progressive decline. Asthma: reversible obstruction, often childhood onset, trigger-related, eosinophilic inflammation, variable course. Some patients have 'asthma-COPD overlap' (ACO) with features of both."
        },
        testTakingTip: "COPD = irreversible, smoking, older onset, neutrophils. Asthma = reversible, triggers, younger onset, eosinophils. The reversibility of airflow obstruction is the key differentiator.",
        relatedGuide: "copd.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "copd-qb-018",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is monitoring a patient during a COPD exacerbation. For each finding, indicate whether it is an expected finding during an exacerbation or a finding that requires immediate escalation to the provider.",
        columns: ["Expected During Exacerbation", "Immediate Escalation Required"],
        rows: [
            { id: "r1", text: "Increased sputum production with a change from white to yellow-green", correct: "Expected During Exacerbation" },
            { id: "r2", text: "SpO2 dropping from 90% to 78% despite supplemental oxygen", correct: "Immediate Escalation Required" },
            { id: "r3", text: "Mild increase in dyspnea with decreased exercise tolerance", correct: "Expected During Exacerbation" },
            { id: "r4", text: "New confusion and inability to complete sentences due to breathlessness", correct: "Immediate Escalation Required" },
            { id: "r5", text: "Increased use of accessory muscles during breathing", correct: "Expected During Exacerbation" },
            { id: "r6", text: "Hemodynamic instability with new-onset atrial fibrillation on the monitor", correct: "Immediate Escalation Required" }
        ],
        rationale: {
            correct: "During a COPD exacerbation, increased sputum with color change, worsened dyspnea, and accessory muscle use are expected features that are managed with standard exacerbation protocols. However, refractory hypoxemia (SpO2 78% despite O2), altered mental status (confusion, inability to speak), and new arrhythmias signal respiratory failure or cardiovascular decompensation requiring immediate escalation, possible ICU transfer, and consideration of BiPAP or intubation."
        },
        testTakingTip: "Key escalation triggers in COPD exacerbation: refractory hypoxemia, altered mental status, hemodynamic instability. These indicate the patient is failing current treatment and needs higher-level intervention.",
        relatedGuide: "copd.html",
        relatedGuideSection: "exacerbation"
    },

    {
        id: "copd-qb-019",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each COPD medication, classify it as a short-acting bronchodilator (SABA/SAMA), long-acting bronchodilator (LABA/LAMA), or inhaled corticosteroid (ICS).",
        columns: ["Short-Acting Bronchodilator", "Long-Acting Bronchodilator", "Inhaled Corticosteroid"],
        rows: [
            { id: "r1", text: "Albuterol (ProAir, Ventolin)", correct: "Short-Acting Bronchodilator" },
            { id: "r2", text: "Tiotropium (Spiriva)", correct: "Long-Acting Bronchodilator" },
            { id: "r3", text: "Budesonide (Pulmicort)", correct: "Inhaled Corticosteroid" },
            { id: "r4", text: "Ipratropium (Atrovent)", correct: "Short-Acting Bronchodilator" },
            { id: "r5", text: "Salmeterol (Serevent)", correct: "Long-Acting Bronchodilator" },
            { id: "r6", text: "Fluticasone (Flovent)", correct: "Inhaled Corticosteroid" }
        ],
        rationale: {
            correct: "Short-acting bronchodilators (albuterol = SABA, ipratropium = SAMA) provide quick relief lasting 4-6 hours. Long-acting bronchodilators (tiotropium = LAMA, salmeterol = LABA) are maintenance medications lasting 12-24 hours. Inhaled corticosteroids (budesonide, fluticasone) reduce airway inflammation but are add-on therapy in COPD, not stand-alone. Knowing the drug class determines the role in treatment."
        },
        testTakingTip: "Albuterol = rescue SABA. '-terol' endings (salmeterol, formoterol) = LABA. '-tropium' endings = anticholinergic (ipratropium = SAMA, tiotropium = LAMA). '-sonide/-sone' = corticosteroid.",
        relatedGuide: "copd.html",
        relatedGuideSection: "medications"
    },

    {
        id: "copd-qb-020",
        category: "respiratory",
        topic: "copd",
        topicLabel: "COPD",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is assessing two COPD patients being considered for different levels of care. For each clinical scenario, indicate whether the patient can be managed at home with outpatient follow-up or requires hospital admission.",
        columns: ["Manage at Home", "Requires Admission"],
        rows: [
            { id: "r1", text: "Mild increase in dyspnea, clear sensorium, SpO2 91% on room air, good social support at home", correct: "Manage at Home" },
            { id: "r2", text: "Severe dyspnea at rest, unable to eat or sleep, SpO2 84% on room air, lives alone", correct: "Requires Admission" },
            { id: "r3", text: "Moderate exacerbation responding well to nebulizer in the ED, SpO2 92% after treatment, reliable ride home", correct: "Manage at Home" },
            { id: "r4", text: "New-onset peripheral edema, significant cyanosis, and confusion with ABG showing pH 7.28", correct: "Requires Admission" },
            { id: "r5", text: "Third exacerbation in 6 weeks despite outpatient management, on maximum home therapy", correct: "Requires Admission" }
        ],
        rationale: {
            correct: "Home management is appropriate for mild exacerbations with adequate oxygenation, clear mentation, good treatment response, and social support. Admission criteria include: severe symptoms at rest, failure of outpatient treatment, significant hypoxemia, hypercapnic respiratory failure (pH <7.35), altered mental status, lack of home support, or frequent recurrent exacerbations suggesting treatment failure. Social factors (living alone, no transportation) also influence the disposition decision."
        },
        testTakingTip: "Admission decision in COPD: assess severity (can they eat/sleep/speak?), oxygenation, mental status, treatment response, social support, and exacerbation frequency. Multiple failures of outpatient management warrant admission even if the current episode seems mild.",
        relatedGuide: "copd.html",
        relatedGuideSection: "exacerbation"
    }

]);
