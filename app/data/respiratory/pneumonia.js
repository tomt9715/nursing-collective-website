/**
 * Quiz Bank — Pneumonia
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "pna-qb-001",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for a patient diagnosed with ventilator-associated pneumonia (VAP). Which timeframe criterion defines VAP?",
        options: [
            { id: "a", text: "Pneumonia that develops within the first 24 hours of intubation" },
            { id: "b", text: "Pneumonia that develops 48 hours or more after endotracheal intubation" },
            { id: "c", text: "Any pneumonia that occurs in a patient who has ever been on a ventilator" },
            { id: "d", text: "Pneumonia diagnosed within 48 hours of extubation only" }
        ],
        correct: "b",
        rationale: {
            correct: "VAP is defined as pneumonia developing ≥48 hours after endotracheal intubation. This timeframe distinguishes it from pneumonia present at or shortly after intubation (which would be community-acquired or healthcare-associated). VAP is caused by aspiration of colonized oropharyngeal secretions around the endotracheal tube cuff. Common causative organisms include Pseudomonas, MRSA, and Acinetobacter."
        },
        testTakingTip: "The 48-hour rule differentiates pneumonia types: VAP ≥48 hrs after intubation, HAP ≥48 hrs after admission. The timing determines likely pathogens and antibiotic selection.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "classification"
    },

    {
        id: "pna-qb-002",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "application",
        stem: "A nurse is calculating a CURB-65 score for a 72-year-old patient with community-acquired pneumonia. The patient's findings include: confusion (new onset), BUN 24 mg/dL, respiratory rate 34, blood pressure 84/52, and age 72. What is the patient's CURB-65 score, and what does it indicate?",
        options: [
            { id: "a", text: "Score of 2 — consider outpatient treatment or short observation" },
            { id: "b", text: "Score of 5 — highest severity, consider ICU admission" },
            { id: "c", text: "Score of 3 — low risk, safe for discharge with oral antibiotics" },
            { id: "d", text: "Score of 4 — the patient does not meet criteria for the confusion component" }
        ],
        correct: "b",
        rationale: {
            correct: "CURB-65 scoring: C = Confusion (new onset) → 1 point. U = Urea/BUN >19 mg/dL (BUN 24) → 1 point. R = Respiratory rate ≥30 (RR 34) → 1 point. B = Blood pressure (SBP <90 or DBP ≤60; BP 84/52) → 1 point. 65 = Age ≥65 (age 72) → 1 point. Total = 5/5. Scores of 4-5 indicate severe pneumonia with high mortality risk requiring ICU-level care. Score 0-1 = outpatient, 2 = short admission, 3+ = inpatient, 4-5 = ICU."
        },
        testTakingTip: "CURB-65: Confusion, Urea >19, Respiratory rate ≥30, Blood pressure low, 65+ years old. Each component = 1 point. Higher score = higher mortality = more intensive level of care needed.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "pna-qb-003",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "application",
        stem: "A nurse receives an order for IV antibiotics for a patient with suspected community-acquired pneumonia. The physician wants blood cultures drawn before starting antibiotics. The patient's SpO2 is 88% and the patient is febrile at 103.2°F. Which action is most appropriate?",
        options: [
            { id: "a", text: "Draw blood cultures and wait for results before starting antibiotics" },
            { id: "b", text: "Start antibiotics immediately and skip the blood cultures since the patient is unstable" },
            { id: "c", text: "Draw blood cultures promptly and start the antibiotics within 1 hour of presentation — do not delay antibiotics for culture results" },
            { id: "d", text: "Administer acetaminophen for the fever first, then draw cultures after the temperature normalizes" }
        ],
        correct: "c",
        rationale: {
            correct: "In pneumonia management, blood cultures should be drawn BEFORE antibiotics to avoid sterilizing the cultures, but antibiotics should NOT be delayed waiting for culture results. The goal is to draw cultures and start antibiotics within the same timeframe — ideally within 1 hour of presentation for severe pneumonia. Waiting for results (which take 24-48 hours) would dangerously delay treatment. Early antibiotic administration (within 4-8 hours) reduces mortality."
        },
        testTakingTip: "The sequence is: draw cultures THEN start antibiotics — but both should happen quickly. Cultures before antibiotics is ideal, but NEVER delay antibiotics waiting for culture results. Time-to-antibiotic is a quality measure.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "treatment"
    },

    {
        id: "pna-qb-004",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing a sputum culture result that shows gram-positive diplococci. Which organism does this finding most likely represent?",
        options: [
            { id: "a", text: "Haemophilus influenzae" },
            { id: "b", text: "Klebsiella pneumoniae" },
            { id: "c", text: "Streptococcus pneumoniae" },
            { id: "d", text: "Pseudomonas aeruginosa" }
        ],
        correct: "c",
        rationale: {
            correct: "Streptococcus pneumoniae (pneumococcus) appears as gram-positive diplococci (pairs of round bacteria that stain purple). It is the most common cause of community-acquired pneumonia. Haemophilus influenzae is a gram-negative coccobacillus. Klebsiella pneumoniae is a gram-negative rod. Pseudomonas aeruginosa is a gram-negative rod often associated with nosocomial infections."
        },
        testTakingTip: "Gram-positive diplococci = Streptococcus pneumoniae = #1 cause of CAP. Gram stain gives quick preliminary identification: positive (purple) vs negative (pink), and shape (cocci vs rods) narrows the organism.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "pna-qb-005",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "analysis",
        stem: "A 78-year-old nursing home resident with dysphagia from a recent stroke is admitted with right lower lobe pneumonia, foul-smelling sputum, and a fever of 101.8°F. The nurse suspects aspiration pneumonia. Which factor in this patient's history most significantly contributed to this diagnosis?",
        options: [
            { id: "a", text: "The patient's advanced age" },
            { id: "b", text: "The patient's dysphagia and impaired swallowing mechanism from the stroke" },
            { id: "c", text: "Living in a nursing home facility" },
            { id: "d", text: "The presence of fever" }
        ],
        correct: "b",
        rationale: {
            correct: "Dysphagia from stroke is the most significant risk factor for aspiration pneumonia. Impaired swallowing allows oropharyngeal contents (food, secretions, bacteria) to enter the lower airways. The right lower lobe is the most common site of aspiration (due to the anatomy of the right mainstem bronchus — wider, shorter, more vertical). Foul-smelling sputum suggests anaerobic organisms from oral flora. While age and nursing home residence increase general pneumonia risk, dysphagia is the direct causative mechanism."
        },
        testTakingTip: "Aspiration pneumonia clues: dysphagia/swallowing impairment, right lower lobe infiltrate, foul-smelling sputum, risk populations (stroke, dementia, sedation, NG tube). The right mainstem bronchus anatomy makes the right lower lobe the aspiration landing zone.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "aspiration"
    },

    {
        id: "pna-qb-006",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "application",
        stem: "A nurse is implementing the VAP prevention bundle for a patient on a mechanical ventilator. Which intervention is included in the evidence-based VAP bundle?",
        options: [
            { id: "a", text: "Maintain the head of bed at 0 degrees (flat) to prevent aspiration" },
            { id: "b", text: "Perform oral care with chlorhexidine every 12 hours and elevate the head of bed 30-45 degrees" },
            { id: "c", text: "Suction the endotracheal tube every 30 minutes on a scheduled basis" },
            { id: "d", text: "Change the ventilator circuit tubing every 24 hours" }
        ],
        correct: "b",
        rationale: {
            correct: "The VAP prevention bundle includes: head of bed elevation 30-45 degrees (reduces aspiration of gastric contents), oral care with chlorhexidine (reduces oropharyngeal colonization), daily sedation vacations and assessment of readiness to extubate, DVT prophylaxis, peptic ulcer prophylaxis, and subglottic suctioning. Flat positioning increases aspiration risk. Routine circuit changes increase contamination. Suctioning should be PRN, not on a fixed schedule."
        },
        testTakingTip: "VAP bundle essentials: HOB 30-45°, oral care with chlorhexidine, daily sedation vacation, daily extubation readiness assessment, subglottic suctioning. These are evidence-based, nurse-driven interventions.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "prevention"
    },

    {
        id: "pna-qb-007",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for a patient with pneumonia caused by Mycoplasma pneumoniae. Which type of pneumonia does this represent, and what sputum characteristic is most commonly associated with it?",
        options: [
            { id: "a", text: "Typical bacterial pneumonia with rust-colored sputum" },
            { id: "b", text: "Atypical pneumonia with a dry, nonproductive cough" },
            { id: "c", text: "Viral pneumonia with blood-tinged sputum" },
            { id: "d", text: "Fungal pneumonia with thick, purulent sputum" }
        ],
        correct: "b",
        rationale: {
            correct: "Mycoplasma pneumoniae causes atypical (or 'walking') pneumonia, which is characterized by a gradual onset, dry/nonproductive cough, low-grade fever, headache, and fatigue. The cough is persistent and hacking but typically does not produce purulent sputum. Atypical pneumonia is often milder than typical bacterial pneumonia and commonly affects younger adults and school-age children. Rust-colored sputum is classic for Streptococcus pneumoniae (typical bacterial)."
        },
        testTakingTip: "Atypical pneumonia (Mycoplasma, Chlamydophila, Legionella): gradual onset, dry cough, milder symptoms, often called 'walking pneumonia.' Typical bacterial (S. pneumoniae): sudden onset, productive cough, high fever, lobar consolidation.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "pna-qb-008",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "analysis",
        stem: "A patient admitted with community-acquired pneumonia has been on IV antibiotics for 48 hours. The nurse notes the patient's temperature has decreased from 103°F to 99.4°F, SpO2 has improved from 90% to 95% on 2L NC, and the patient is tolerating a regular diet. The provider is considering switching to oral antibiotics. Which factor best supports this transition?",
        options: [
            { id: "a", text: "The patient's chest X-ray has completely cleared" },
            { id: "b", text: "The patient has been afebrile for at least 24 hours, is hemodynamically stable, and can tolerate oral medications" },
            { id: "c", text: "The blood culture results are still pending" },
            { id: "d", text: "The patient has completed a full 14-day course of IV antibiotics" }
        ],
        correct: "b",
        rationale: {
            correct: "IV-to-oral antibiotic switch criteria include: clinical improvement (trending down temperature), hemodynamic stability, ability to tolerate oral intake, and functioning GI tract. The patient does NOT need a cleared chest X-ray (radiographic improvement lags behind clinical improvement by days to weeks) or a complete IV course. Early switch to oral antibiotics is safe, reduces IV complications, lowers costs, and facilitates earlier discharge."
        },
        testTakingTip: "IV-to-oral switch: improving clinically, afebrile ≥24 hours, hemodynamically stable, tolerating PO. Chest X-ray changes lag behind clinical improvement — don't wait for X-ray to clear before switching.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "treatment"
    },

    {
        id: "pna-qb-009",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with pneumonia develops a rapidly rising temperature to 104.2°F, heart rate 118, blood pressure 78/48, respiratory rate 32, and lactate of 4.2 mmol/L. The nurse recognizes this clinical picture as:",
        options: [
            { id: "a", text: "Expected progression of the pneumonia that will resolve with continued antibiotics" },
            { id: "b", text: "Sepsis progressing to septic shock, requiring immediate fluid resuscitation and vasopressors" },
            { id: "c", text: "A drug fever reaction to the antibiotic that will resolve when antibiotics are changed" },
            { id: "d", text: "Dehydration from fever and poor oral intake" }
        ],
        correct: "b",
        rationale: {
            correct: "This patient meets criteria for septic shock: suspected infection (pneumonia) + organ dysfunction (hypotension, tachycardia) + elevated lactate (>2 mmol/L indicates tissue hypoperfusion). Lactate of 4.2 is severely elevated. The sepsis bundle requires: blood cultures, broad-spectrum antibiotics (within 1 hour), 30 mL/kg IV crystalloid bolus within 3 hours, vasopressors if hypotension persists after fluids, and repeat lactate measurement. Pneumonia is the #1 cause of sepsis."
        },
        testTakingTip: "Pneumonia → sepsis is the most common pathway to septic shock. Key sepsis markers: infection + ≥2 SIRS criteria + organ dysfunction. Lactate >2 = tissue hypoperfusion. Lactate >4 = high mortality risk requiring aggressive resuscitation.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "complications"
    },

    {
        id: "pna-qb-010",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "application",
        stem: "A nurse is admitting a patient with suspected Legionella pneumonia (Legionnaires' disease). The patient asks if their visiting family members need to wear masks. Which response is most accurate?",
        options: [
            { id: "a", text: "Yes, Legionella is highly contagious through person-to-person contact, so everyone must wear N95 respirators." },
            { id: "b", text: "Legionella is not transmitted person to person. It is contracted from contaminated water sources like cooling towers and hot tubs, so standard precautions are sufficient for visitors." },
            { id: "c", text: "Family members should be tested for Legionella since they were likely exposed to the same water source." },
            { id: "d", text: "Visitors should wear surgical masks because Legionella spreads through respiratory droplets." }
        ],
        correct: "b",
        rationale: {
            correct: "Legionella pneumophila is an environmental organism found in water systems (cooling towers, hot water tanks, hot tubs, humidifiers). It is transmitted by inhaling contaminated water aerosols, NOT through person-to-person contact. Standard precautions are sufficient — no special isolation is needed. While family may have been exposed to the same water source, routine testing of asymptomatic contacts is not recommended. Notification of public health may be needed to investigate the water source."
        },
        testTakingTip: "Legionella = water source, NOT person-to-person. Standard precautions only. Key clinical clues: GI symptoms (diarrhea) + pneumonia + hyponatremia + exposure to water system. Report to public health.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "pna-qb-011",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for an immunocompromised patient with HIV (CD4 count 85 cells/mm³) who develops pneumonia with a dry cough, bilateral diffuse infiltrates on chest X-ray, and markedly elevated LDH. Which opportunistic organism is most likely responsible?",
        options: [
            { id: "a", text: "Streptococcus pneumoniae" },
            { id: "b", text: "Pneumocystis jirovecii (PCP)" },
            { id: "c", text: "Mycobacterium tuberculosis" },
            { id: "d", text: "Haemophilus influenzae" }
        ],
        correct: "b",
        rationale: {
            correct: "Pneumocystis jirovecii pneumonia (PCP) is the classic opportunistic infection in HIV patients with severely depleted CD4 counts (<200 cells/mm³). The hallmarks are: dry nonproductive cough, bilateral diffuse interstitial infiltrates (ground-glass pattern on CT), elevated LDH, and progressive dyspnea. Treatment is trimethoprim-sulfamethoxazole (TMP-SMX). PCP prophylaxis is started when CD4 <200. While S. pneumoniae is the most common overall cause of bacterial pneumonia in HIV, the presentation here is classic for PCP."
        },
        testTakingTip: "HIV + CD4 <200 + dry cough + bilateral diffuse infiltrates + high LDH = PCP until proven otherwise. TMP-SMX is both prophylaxis and treatment. Start prophylaxis at CD4 <200.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "special-populations"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "pna-qb-012",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "ordering",
        difficulty: "application",
        stem: "A 68-year-old patient arrives at the ED with suspected community-acquired pneumonia: productive cough, fever 102.6°F, and SpO2 91%. The nurse is implementing the pneumonia admission assessment bundle. Place the interventions in priority order.",
        options: [
            { id: "s1", text: "Apply supplemental oxygen to maintain SpO2 ≥94% and position the patient upright" },
            { id: "s2", text: "Draw two sets of blood cultures from separate venipuncture sites" },
            { id: "s3", text: "Administer the first dose of empiric IV antibiotics within 1 hour of presentation" },
            { id: "s4", text: "Obtain a portable chest X-ray and collect a sputum specimen for culture" },
            { id: "s5", text: "Calculate the CURB-65 score to determine the appropriate level of care" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Oxygenation is the immediate priority. Hypoxemia (SpO2 91%) must be corrected before other interventions. Upright positioning improves lung expansion.",
            s2: "Blood cultures must be drawn BEFORE antibiotics to avoid sterilizing the cultures. Two sets from different sites increases sensitivity.",
            s3: "Empiric antibiotics should be administered within 1 hour of presentation for severe CAP. Early antibiotics reduce mortality. Do not wait for culture results.",
            s4: "Chest X-ray confirms the diagnosis and identifies complications (effusion, empyema). Sputum culture guides antibiotic de-escalation once results are available.",
            s5: "CURB-65 scoring determines disposition: outpatient, ward admission, or ICU. Calculated after initial stabilization to guide the care plan."
        },
        testTakingTip: "Pneumonia admission bundle: oxygenate → cultures before antibiotics → antibiotics within 1 hour → diagnostic imaging → severity scoring. The 'cultures before antibiotics but don't delay antibiotics' principle is critical.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "treatment"
    },

    {
        id: "pna-qb-013",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A nurse is teaching nursing students about aspiration prevention strategies for high-risk patients. Place the nursing interventions in the correct order of implementation during mealtime.",
        options: [
            { id: "s1", text: "Elevate the head of bed to at least 30-45 degrees (ideally 90 degrees for meals)" },
            { id: "s2", text: "Perform oral care to reduce bacterial load before the meal" },
            { id: "s3", text: "Assess the patient's swallowing ability and check for a speech therapy diet order" },
            { id: "s4", text: "Assist the patient to eat slowly, offering small bites and thickened liquids as ordered" },
            { id: "s5", text: "Keep the patient upright for at least 30 minutes after the meal before lowering the HOB" }
        ],
        correct: ["s1", "s3", "s2", "s4", "s5"],
        rationale: {
            s1: "Positioning upright is the first safety step — it uses gravity to direct food toward the stomach and away from the airway.",
            s3: "Assessing swallowing ability and verifying the diet order ensures the patient receives the appropriate texture/consistency. Never feed a patient without confirming swallow status.",
            s2: "Pre-meal oral care reduces the volume and virulence of oral bacteria that would be aspirated if aspiration occurs during the meal.",
            s4: "Small bites, slow pace, and thickened liquids (if ordered) reduce the volume and speed of material passing through the pharynx, reducing aspiration risk.",
            s5: "Keeping the patient upright after eating prevents reflux and aspiration of gastric contents. 30 minutes is the minimum; some protocols recommend 45-60 minutes."
        },
        testTakingTip: "Aspiration prevention: HOB up → assess swallow → oral care → slow small bites → stay upright 30 min after. Oral care before meals is often forgotten but reduces aspiration pneumonia risk by up to 40%.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "aspiration"
    },

    {
        id: "pna-qb-014",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with pneumonia who has been improving for 3 days suddenly develops pleuritic chest pain, decreased breath sounds on the right side, and a new fever spike. A chest X-ray reveals a large right-sided pleural effusion. Place the nurse's actions in priority order.",
        options: [
            { id: "s1", text: "Notify the provider of the new findings and worsening clinical status" },
            { id: "s2", text: "Position the patient on the affected (right) side and administer supplemental oxygen" },
            { id: "s3", text: "Assist with thoracentesis preparation: consent, positioning (sitting upright leaning forward), and sterile supplies" },
            { id: "s4", text: "Send pleural fluid samples for culture, cell count, pH, glucose, LDH, and protein (Light's criteria)" },
            { id: "s5", text: "Monitor for post-thoracentesis complications: pneumothorax (absent breath sounds, sudden dyspnea), re-expansion pulmonary edema" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "A new pleural effusion with fever in a patient with pneumonia suggests complicated parapneumonic effusion or empyema. Immediate provider notification is needed for procedural planning.",
            s2: "Positioning on the affected side splints the painful area and allows the unaffected lung to expand fully. Supplemental O2 addresses potential hypoxemia from the effusion compressing lung tissue.",
            s3: "Thoracentesis (drainage of pleural fluid) is both diagnostic and therapeutic. Proper positioning and sterile technique reduce complications.",
            s4: "Pleural fluid analysis using Light's criteria differentiates transudative from exudative effusions and identifies empyema (low pH <7.2, low glucose, high LDH, positive culture).",
            s5: "Post-thoracentesis monitoring is essential. Pneumothorax and re-expansion pulmonary edema (from rapid large-volume drainage) are the most serious complications."
        },
        testTakingTip: "New effusion + fever during pneumonia treatment = parapneumonic effusion/empyema. Thoracentesis is both diagnostic (Light's criteria) and therapeutic. Post-procedure: watch for pneumothorax on the follow-up chest X-ray.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "complications"
    },

    {
        id: "pna-qb-015",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is collecting a sputum specimen for culture from a patient with pneumonia who is not intubated. Place the steps for an adequate sputum collection in the correct order.",
        options: [
            { id: "s1", text: "Instruct the patient to rinse the mouth with water (not mouthwash) to reduce oral flora contamination" },
            { id: "s2", text: "Ask the patient to take several deep breaths and then produce a deep cough from the chest, not the throat" },
            { id: "s3", text: "Collect the sputum directly into a sterile container — aim for 5-10 mL of material" },
            { id: "s4", text: "Label the specimen and transport it to the lab within 1-2 hours (or refrigerate if delay is expected)" },
            { id: "s5", text: "Verify the specimen quality: sputum should be thick, colored (not thin/clear saliva)" }
        ],
        correct: ["s1", "s2", "s3", "s5", "s4"],
        rationale: {
            s1: "Rinsing with water removes oral bacteria that could contaminate the specimen. Avoid antiseptic mouthwash as it may kill pathogens and give false-negative results.",
            s2: "Deep coughing produces sputum from the lower airways where the infection is located. Throat clearing only produces saliva, which is not diagnostic.",
            s3: "Sterile collection prevents contamination from external sources. 5-10 mL provides adequate material for culture and Gram stain.",
            s5: "Quality check ensures the specimen is actually sputum (>25 WBCs and <10 epithelial cells per low-power field). A saliva sample will not yield useful results.",
            s4: "Prompt transport prevents overgrowth of normal flora and die-off of fastidious pathogens. Refrigeration slows bacterial growth if delay is unavoidable."
        },
        testTakingTip: "Sputum collection: rinse mouth with water → deep cough → sterile container → verify it's sputum (not saliva) → transport promptly. Best collected early morning when secretions have pooled overnight.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "pna-qb-016",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with pneumonia on a medical-surgical unit develops signs of early sepsis: temperature 103°F, heart rate 110, respiratory rate 24, WBC 18,000, and new confusion. Place the sepsis bundle interventions in the correct priority order.",
        options: [
            { id: "s1", text: "Obtain a serum lactate level and draw blood cultures from 2 separate sites" },
            { id: "s2", text: "Administer broad-spectrum IV antibiotics within 1 hour of sepsis recognition" },
            { id: "s3", text: "Initiate IV crystalloid fluid bolus (30 mL/kg) for hypotension or lactate ≥4 mmol/L" },
            { id: "s4", text: "Reassess volume status and tissue perfusion — repeat lactate if initial level was elevated" },
            { id: "s5", text: "Initiate vasopressors (norepinephrine) if MAP remains <65 mmHg despite fluid resuscitation" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Lactate and blood cultures are the first steps in the sepsis bundle. Lactate quantifies tissue hypoperfusion; cultures identify the organism. Both must be drawn before antibiotics.",
            s2: "Broad-spectrum antibiotics within 1 hour of sepsis recognition is a key mortality-reducing intervention. Each hour of delay increases mortality by approximately 7-8%.",
            s3: "Fluid resuscitation (30 mL/kg crystalloid) restores intravascular volume. This is initiated for hypotension or lactate ≥4 mmol/L within the first 3 hours.",
            s4: "Reassessment after initial fluids determines if the patient is responding or needs escalation. Repeat lactate guides the adequacy of resuscitation.",
            s5: "Vasopressors (norepinephrine is first-line) are initiated if hypotension persists despite adequate fluid resuscitation (fluid-refractory shock)."
        },
        testTakingTip: "SEP-1 bundle: lactate + cultures → antibiotics within 1 hour → 30 mL/kg fluids → reassess → vasopressors if needed. Pneumonia is the #1 cause of sepsis. Know this bundle cold.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "complications"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "pna-qb-017",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each characteristic, identify whether it is associated with community-acquired pneumonia (CAP), hospital-acquired pneumonia (HAP), or ventilator-associated pneumonia (VAP).",
        columns: ["CAP", "HAP", "VAP"],
        rows: [
            { id: "r1", text: "Develops in a patient who has been hospitalized for 5 days with no mechanical ventilation", correct: "HAP" },
            { id: "r2", text: "Most commonly caused by Streptococcus pneumoniae", correct: "CAP" },
            { id: "r3", text: "Occurs ≥48 hours after endotracheal intubation and mechanical ventilation", correct: "VAP" },
            { id: "r4", text: "Often caused by multidrug-resistant organisms like Pseudomonas and MRSA", correct: "VAP" },
            { id: "r5", text: "Patient was healthy at home and developed symptoms before any healthcare contact", correct: "CAP" },
            { id: "r6", text: "Develops ≥48 hours after hospital admission in a non-intubated patient", correct: "HAP" }
        ],
        rationale: {
            correct: "CAP occurs in the community or within 48 hours of admission; most commonly caused by S. pneumoniae. HAP develops ≥48 hours after hospital admission in non-ventilated patients; caused by hospital-associated organisms. VAP develops ≥48 hours after intubation; highest risk for MDR organisms (Pseudomonas, MRSA, Acinetobacter). The classification determines empiric antibiotic selection — CAP uses narrower-spectrum agents; HAP/VAP require broader coverage."
        },
        testTakingTip: "CAP = community, S. pneumoniae, narrower antibiotics. HAP = ≥48 hrs after admission, no vent. VAP = ≥48 hrs after intubation. HAP/VAP = MDR risk, broader antibiotics. The 48-hour rule separates community from nosocomial.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "classification"
    },

    {
        id: "pna-qb-018",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is comparing the chest X-ray patterns of different types of pneumonia. For each radiographic finding, identify the most likely type of pneumonia.",
        columns: ["Typical Bacterial (Lobar)", "Atypical (Interstitial)", "Aspiration"],
        rows: [
            { id: "r1", text: "Dense consolidation limited to one lobe with air bronchograms", correct: "Typical Bacterial (Lobar)" },
            { id: "r2", text: "Bilateral diffuse patchy infiltrates with a reticular (web-like) pattern", correct: "Atypical (Interstitial)" },
            { id: "r3", text: "Infiltrate in the right lower lobe or posterior segments of the upper lobes in a dependent position", correct: "Aspiration" },
            { id: "r4", text: "Consolidation with a high-density, rounded appearance ('round pneumonia') in a pediatric patient", correct: "Typical Bacterial (Lobar)" },
            { id: "r5", text: "Bilateral ground-glass opacities in an immunocompromised patient", correct: "Atypical (Interstitial)" }
        ],
        rationale: {
            correct: "Typical bacterial pneumonia produces lobar consolidation — dense, localized opacification confined to one lobe with visible air bronchograms. Atypical pneumonia (Mycoplasma, Chlamydophila, viral, PCP) causes diffuse interstitial or ground-glass patterns, often bilateral. Aspiration pneumonia follows gravity — right lower lobe and posterior-dependent segments are most commonly affected. Round pneumonia is a variant of bacterial lobar pneumonia seen almost exclusively in children."
        },
        testTakingTip: "Chest X-ray patterns: lobar consolidation = typical bacterial, diffuse interstitial/ground-glass = atypical, dependent segments (especially right lower lobe) = aspiration. The pattern narrows the differential and guides empiric therapy.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "pna-qb-019",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each organism associated with pneumonia, identify whether it is a bacterial, viral, or atypical/fungal pathogen.",
        columns: ["Typical Bacterial", "Viral", "Atypical / Fungal"],
        rows: [
            { id: "r1", text: "Streptococcus pneumoniae (pneumococcus)", correct: "Typical Bacterial" },
            { id: "r2", text: "Influenza A and B viruses", correct: "Viral" },
            { id: "r3", text: "Mycoplasma pneumoniae ('walking pneumonia')", correct: "Atypical / Fungal" },
            { id: "r4", text: "Klebsiella pneumoniae (often in chronic alcoholism)", correct: "Typical Bacterial" },
            { id: "r5", text: "Pneumocystis jirovecii (PCP, in HIV/immunocompromised)", correct: "Atypical / Fungal" },
            { id: "r6", text: "SARS-CoV-2 (COVID-19)", correct: "Viral" }
        ],
        rationale: {
            correct: "Typical bacteria (S. pneumoniae, Klebsiella, H. influenzae, Staphylococcus) cause classic lobar pneumonia responding to standard antibiotics. Viruses (Influenza, RSV, SARS-CoV-2) require supportive care ± antivirals. Atypical organisms (Mycoplasma, Legionella, Chlamydophila) and fungi (Pneumocystis, Aspergillus) require specific antibiotics (macrolides, fluoroquinolones) or antifungals (TMP-SMX for PCP). Klebsiella is associated with currant-jelly sputum in patients with chronic alcoholism."
        },
        testTakingTip: "Know the classic organism-patient associations: S. pneumoniae = #1 CAP overall. Klebsiella = alcoholism + currant-jelly sputum. PCP = HIV (CD4 <200). Mycoplasma = young adults, 'walking pneumonia.' Pseudomonas = ventilated/ICU patients.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "pna-qb-020",
        category: "respiratory",
        topic: "pneumonia",
        topicLabel: "Pneumonia",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is evaluating discharge readiness for patients with pneumonia. For each patient scenario, indicate whether the patient is ready for discharge or needs continued inpatient treatment.",
        columns: ["Ready for Discharge", "Needs Continued Inpatient Treatment"],
        rows: [
            { id: "r1", text: "Temperature <100.4°F for 48 hours, SpO2 94% on room air, tolerating oral antibiotics, and has a reliable follow-up plan", correct: "Ready for Discharge" },
            { id: "r2", text: "Fever resolved but SpO2 remains 86% on room air, requiring 4L supplemental oxygen", correct: "Needs Continued Inpatient Treatment" },
            { id: "r3", text: "Clinically improved, taking oral medications, blood pressure stable, but chest X-ray still shows residual infiltrate", correct: "Ready for Discharge" },
            { id: "r4", text: "New onset confusion, increasing oxygen requirements, and rising lactate level despite 48 hours of antibiotics", correct: "Needs Continued Inpatient Treatment" },
            { id: "r5", text: "Improving but lives alone, has no transportation, and cannot afford the prescribed oral antibiotics", correct: "Needs Continued Inpatient Treatment" }
        ],
        rationale: {
            correct: "Discharge criteria: afebrile ≥48 hrs, SpO2 adequate on room air, tolerating oral medications, hemodynamically stable, and adequate social support. Residual chest X-ray infiltrate is normal — radiographic improvement lags clinical improvement by 4-6 weeks. Continued oxygen requirement, clinical deterioration (confusion, rising lactate), or inadequate social support (no follow-up access, cannot afford medications, lives alone without help) are all reasons to continue inpatient care."
        },
        testTakingTip: "Discharge readiness is more than just clinical improvement — social determinants (medication access, transportation, home support) affect safe discharge. A patient who can't afford antibiotics or attend follow-up is not ready for discharge.",
        relatedGuide: "pneumonia.html",
        relatedGuideSection: "management"
    }

]);
