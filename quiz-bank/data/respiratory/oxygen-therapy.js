/**
 * Quiz Bank — Oxygen Therapy
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "o2-qb-001",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is caring for a patient receiving oxygen via high-flow nasal cannula (HFNC) at 40 L/min with FiO2 of 50%. Which unique benefit of HFNC differentiates it from standard nasal cannula therapy?",
        options: [
            { id: "a", text: "HFNC delivers a lower FiO2 than standard nasal cannula." },
            { id: "b", text: "HFNC provides heated, humidified gas at high flow rates that generate a small amount of positive airway pressure (PEEP effect), flush dead space, and deliver precise FiO2." },
            { id: "c", text: "HFNC eliminates the need for any monitoring of oxygen saturation." },
            { id: "d", text: "HFNC can only be used in ICU settings with continuous arterial blood gas monitoring." }
        ],
        correct: "b",
        rationale: {
            correct: "High-flow nasal cannula delivers heated and humidified oxygen at flow rates up to 60 L/min. Key benefits: (1) generates a small PEEP effect (2-5 cm H2O) that helps maintain alveolar recruitment, (2) flushes nasopharyngeal dead space improving CO2 washout, (3) provides precise FiO2 (21-100%), and (4) the heated humidification improves comfort and mucociliary clearance. Standard nasal cannula is limited to 1-6 L/min with variable FiO2 and no PEEP effect."
        },
        testTakingTip: "HFNC advantages over standard NC: PEEP effect, dead space washout, precise FiO2, heated humidification. It bridges the gap between standard oxygen and non-invasive ventilation.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "devices"
    },

    {
        id: "o2-qb-002",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "application",
        stem: "A nurse is caring for a patient with sleep apnea who uses a CPAP machine at home. The patient is admitted for an unrelated surgical procedure and asks the nurse to set up their CPAP at night. Which action is most appropriate?",
        options: [
            { id: "a", text: "Inform the patient that CPAP cannot be used in the hospital due to infection control concerns." },
            { id: "b", text: "Verify the patient's home CPAP settings with the provider, ensure the machine has been cleaned, and set it up at the prescribed pressure for nighttime use." },
            { id: "c", text: "Replace the CPAP with supplemental oxygen via nasal cannula since the patient is in the hospital." },
            { id: "d", text: "Tell the patient CPAP is only needed for respiratory patients, not surgical patients." }
        ],
        correct: "b",
        rationale: {
            correct: "Patients who use CPAP at home for sleep apnea should continue using it during hospitalization, especially postoperatively when sedation and opioids can worsen airway obstruction. The nurse should verify the prescribed settings (pressure, mask type), ensure the equipment is clean, and facilitate its use. Withholding CPAP increases the risk of hypoxemia, atelectasis, and cardiac events. Many hospitals allow patients to bring their own machines."
        },
        testTakingTip: "Home CPAP should continue in the hospital — especially post-surgery when anesthesia and opioids increase airway obstruction risk. Verify settings with the provider and document the use.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "devices"
    },

    {
        id: "o2-qb-003",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is selecting an oxygen delivery device for a patient who needs humidification with their supplemental oxygen. At what flow rate does humidification become necessary for nasal cannula oxygen delivery?",
        options: [
            { id: "a", text: "Humidification is needed at any flow rate above 1 L/min." },
            { id: "b", text: "Humidification is recommended for flow rates greater than 4 L/min to prevent drying of the nasal mucosa." },
            { id: "c", text: "Humidification is never needed for nasal cannula — only for face masks." },
            { id: "d", text: "Humidification is only needed at flow rates above 10 L/min." }
        ],
        correct: "b",
        rationale: {
            correct: "Supplemental oxygen delivered via nasal cannula at flow rates greater than 4 L/min should be humidified to prevent drying and irritation of the nasal and oral mucosa. At lower flow rates (1-4 L/min), the nose's natural humidification mechanisms are usually adequate. Dry oxygen at higher rates causes epistaxis, nasal crusting, mucosal damage, and patient discomfort. Bubble humidifiers are used for this purpose."
        },
        testTakingTip: "Humidification threshold: >4 L/min via nasal cannula. Below 4 L/min, the nose humidifies adequately. Above 4 L/min, a bubble humidifier should be attached to prevent mucosal drying and nosebleeds.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "administration"
    },

    {
        id: "o2-qb-004",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "application",
        stem: "A nurse is monitoring a premature neonate (30 weeks gestational age) receiving supplemental oxygen. The neonatologist orders a target SpO2 of 88-95%. The nurse understands this narrower target range is used to prevent which complication?",
        options: [
            { id: "a", text: "Bronchopulmonary dysplasia only" },
            { id: "b", text: "Retinopathy of prematurity (ROP) — excessive oxygen causes abnormal blood vessel growth in the developing retina" },
            { id: "c", text: "Neonatal jaundice from oxygen-bilirubin interactions" },
            { id: "d", text: "Patent ductus arteriosus closure" }
        ],
        correct: "b",
        rationale: {
            correct: "Retinopathy of prematurity (ROP) is caused by high oxygen levels damaging the immature retinal blood vessels of premature infants, leading to abnormal vessel proliferation that can cause retinal detachment and blindness. Premature neonates (especially <32 weeks) require careful SpO2 targeting (typically 88-95%) to balance adequate oxygenation against ROP risk. While bronchopulmonary dysplasia is also a concern, the PRIMARY reason for the narrow target is ROP prevention."
        },
        testTakingTip: "Premature neonates + high O2 = ROP risk. Target SpO2 88-95% (lower than adults). Too much oxygen damages immature retinal vessels. Too little oxygen risks brain injury. Tight monitoring is essential.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "special-populations"
    },

    {
        id: "o2-qb-005",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse obtains a pulse oximetry reading of 99% on a patient brought to the ED by EMS from a house fire. The patient is confused, has cherry-red skin coloring, and complains of a headache. The nurse should recognize that the pulse oximetry reading is:",
        options: [
            { id: "a", text: "Accurate and reassuring — the patient's oxygenation is excellent." },
            { id: "b", text: "Falsely elevated due to carbon monoxide poisoning — carboxyhemoglobin is read as oxyhemoglobin by standard pulse oximeters." },
            { id: "c", text: "Falsely low due to smoke inhalation reducing light transmission." },
            { id: "d", text: "Accurate, and the patient's symptoms are likely from heat exhaustion only." }
        ],
        correct: "b",
        rationale: {
            correct: "Standard pulse oximeters cannot distinguish between oxyhemoglobin (O2-bound) and carboxyhemoglobin (CO-bound) because both absorb light at similar wavelengths. In carbon monoxide poisoning, the pulse ox reads falsely normal or high while the patient is actually severely hypoxic. Classic signs of CO poisoning: confusion, headache, cherry-red skin, house fire exposure. A co-oximeter (arterial blood gas with co-oximetry) is needed to measure true oxygen saturation and carboxyhemoglobin levels."
        },
        testTakingTip: "House fire + normal SpO2 + confusion = suspect CO poisoning. Pulse ox is UNRELIABLE in CO poisoning — it reads falsely high. Need ABG with co-oximetry. Treatment: 100% O2 via NRB (or hyperbaric O2).",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "monitoring"
    },

    {
        id: "o2-qb-006",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "application",
        stem: "A patient with heart failure is receiving BiPAP at settings of IPAP 12 cm H2O and EPAP 5 cm H2O for acute pulmonary edema. The patient is increasingly anxious and trying to remove the mask. Which nursing intervention is most appropriate?",
        options: [
            { id: "a", text: "Restrain the patient's hands to keep the BiPAP mask in place." },
            { id: "b", text: "Provide calm reassurance, coach the patient to breathe with the machine's rhythm, adjust mask fit for comfort, and consider asking the provider for a mild anxiolytic if needed." },
            { id: "c", text: "Remove the BiPAP immediately and switch to a nasal cannula at 2 L/min." },
            { id: "d", text: "Sedate the patient with morphine to improve BiPAP tolerance." }
        ],
        correct: "b",
        rationale: {
            correct: "Claustrophobia and anxiety are the most common reasons for BiPAP/CPAP intolerance. First-line interventions: reassurance, coaching breathing technique, optimizing mask fit (air leaks cause discomfort), and allowing the patient to hold the mask initially to maintain a sense of control. If anxiety persists, a low-dose anxiolytic may be appropriate (per provider order). Restraints are never appropriate for this purpose. Abruptly removing BiPAP without an alternative worsens the pulmonary edema. Routine morphine for BiPAP tolerance is not recommended."
        },
        testTakingTip: "BiPAP intolerance: reassurance + coaching + mask adjustment first. If still anxious, consider anxiolytic. Never restrain. Never abruptly remove without a plan. Mask fit is often the #1 fixable issue.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "non-invasive-ventilation"
    },

    {
        id: "o2-qb-007",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is teaching a patient about the difference between CPAP and BiPAP. Which explanation is most accurate?",
        options: [
            { id: "a", text: "CPAP delivers one continuous pressure during both inhalation and exhalation, while BiPAP delivers a higher pressure during inhalation (IPAP) and a lower pressure during exhalation (EPAP)." },
            { id: "b", text: "CPAP delivers higher pressures than BiPAP and is used for more severe respiratory failure." },
            { id: "c", text: "BiPAP is the same as a mechanical ventilator and requires intubation." },
            { id: "d", text: "CPAP delivers oxygen while BiPAP delivers only room air." }
        ],
        correct: "a",
        rationale: {
            correct: "CPAP (continuous positive airway pressure) provides a single constant pressure that splints the airways open during both inspiration and expiration — primarily used for obstructive sleep apnea and cardiogenic pulmonary edema. BiPAP (bilevel positive airway pressure) provides two pressures: higher IPAP during inspiration (to augment ventilation and reduce work of breathing) and lower EPAP during expiration (to maintain airway patency). BiPAP is preferred for hypercapnic respiratory failure (COPD, neuromuscular disease) because the pressure support during inspiration helps blow off CO2."
        },
        testTakingTip: "CPAP = one pressure (splints airways open). BiPAP = two pressures (supports breathing + splints airways). CPAP for sleep apnea/pulmonary edema. BiPAP for CO2 retention/hypercapnic failure.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "non-invasive-ventilation"
    },

    {
        id: "o2-qb-008",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "analysis",
        stem: "A patient on a non-rebreather mask at 15 L/min has an SpO2 of 84% and is increasingly dyspneic with accessory muscle use and nasal flaring. The ABG shows pH 7.24, PaCO2 62 mmHg, PaO2 54 mmHg. The nurse recognizes that the next step is:",
        options: [
            { id: "a", text: "Continue the non-rebreather mask and recheck the ABG in 2 hours." },
            { id: "b", text: "Switch to a simple face mask at 8 L/min to reduce FiO2." },
            { id: "c", text: "Prepare for escalation to non-invasive ventilation (BiPAP) or intubation, as the patient is failing maximal face mask therapy with both hypoxemic and hypercapnic respiratory failure." },
            { id: "d", text: "Increase the non-rebreather to 20 L/min for higher FiO2 delivery." }
        ],
        correct: "c",
        rationale: {
            correct: "This patient is failing maximal non-invasive oxygen therapy (NRB at 15 L/min delivers ~90-100% FiO2). The ABG shows both hypoxemic (PaO2 54) and hypercapnic (PaCO2 62) respiratory failure with respiratory acidosis (pH 7.24). The clinical picture (accessory muscles, nasal flaring) shows increasing work of breathing. The next step is escalation: BiPAP (if the patient is alert and protecting their airway) or intubation with mechanical ventilation. Continuing the same therapy or reducing FiO2 would be dangerous. NRB cannot exceed 15 L/min effectively."
        },
        testTakingTip: "Failing NRB at max flow + worsening ABG + increasing work of breathing = escalate to BiPAP or intubation. The NRB is the ceiling of face mask therapy — if it's not enough, the patient needs positive pressure ventilation.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "escalation"
    },

    {
        id: "o2-qb-009",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "application",
        stem: "A patient recovering from pneumonia has been weaned to 2 L/min nasal cannula with SpO2 of 96%. The provider writes an order to trial the patient on room air. Which approach is correct for oxygen weaning?",
        options: [
            { id: "a", text: "Discontinue the nasal cannula abruptly and recheck SpO2 in 24 hours." },
            { id: "b", text: "Remove the nasal cannula and monitor SpO2 continuously for 15-30 minutes. If SpO2 remains ≥92-94% on room air at rest and with activity, the patient can continue without supplemental oxygen." },
            { id: "c", text: "Reduce from 2 L/min to 0.5 L/min first, wait 2 days, then remove." },
            { id: "d", text: "Keep the patient on 2 L/min indefinitely as a precaution." }
        ],
        correct: "b",
        rationale: {
            correct: "Oxygen weaning involves removing supplemental O2 and monitoring for desaturation over a defined period. After removing the nasal cannula, the nurse should monitor SpO2 continuously for 15-30 minutes at rest, and then with activity (walking, position changes). If SpO2 remains ≥92-94% (or the patient's target range) during both rest and exertion, oxygen can be safely discontinued. Waiting 24 hours without monitoring is unsafe. There's no need for prolonged tapering at low flows."
        },
        testTakingTip: "O2 weaning: remove → monitor at rest for 15-30 min → monitor with activity → if SpO2 stays ≥92-94%, discontinue. Always test with ambulation/activity before declaring the patient doesn't need O2.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "weaning"
    },

    {
        id: "o2-qb-010",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing oxygen toxicity. A patient has been on FiO2 of 100% via mechanical ventilator for 72 hours. Which early sign of oxygen toxicity should the nurse monitor for?",
        options: [
            { id: "a", text: "Hyperventilation and respiratory alkalosis" },
            { id: "b", text: "Substernal chest pain, dry cough, and progressive dyspnea despite adequate PaO2" },
            { id: "c", text: "Peripheral cyanosis and bradycardia" },
            { id: "d", text: "Sudden cardiac arrest without warning" }
        ],
        correct: "b",
        rationale: {
            correct: "Oxygen toxicity occurs when high FiO2 (typically >60%) is delivered for prolonged periods (>24-48 hours). Excessive oxygen generates free radicals that damage alveolar epithelium. Early signs: substernal chest pain, nonproductive cough, and dyspnea. Progressive toxicity leads to tracheobronchitis, absorption atelectasis, and ARDS-like picture. The goal is to wean FiO2 to ≤60% as quickly as the patient's oxygenation allows. PEEP is used to maintain oxygenation while reducing FiO2."
        },
        testTakingTip: "O2 toxicity: FiO2 >60% for >24-48 hours → substernal pain, dry cough, dyspnea → tracheobronchitis → ARDS. Clinical goal: wean FiO2 to ≤60% using PEEP to maintain oxygenation.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "complications"
    },

    {
        id: "o2-qb-011",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with dark skin tone has a pulse oximetry reading of 94%. The nurse notes the patient appears dyspneic with nasal flaring and increased respiratory rate. The nurse should recognize that:",
        options: [
            { id: "a", text: "The SpO2 reading is accurate and the patient's symptoms are likely from anxiety." },
            { id: "b", text: "Pulse oximetry may overestimate oxygen saturation in patients with dark skin tones, and the clinical picture suggests the actual saturation may be lower — an ABG should be obtained." },
            { id: "c", text: "Pulse oximetry is more accurate in patients with dark skin and no further action is needed." },
            { id: "d", text: "The probe should be moved to the earlobe, which will always provide an accurate reading regardless of skin tone." }
        ],
        correct: "b",
        rationale: {
            correct: "Research has shown that standard pulse oximeters can overestimate SpO2 by 2-4% in patients with darker skin pigmentation, due to melanin affecting light absorption. A reading of 94% in a dyspneic patient with dark skin may actually correspond to a true saturation of 90-92% or lower. When clinical presentation does not match the SpO2 reading (patient looks distressed but numbers appear adequate), the nurse should trust the clinical assessment and obtain an ABG for accurate SaO2 measurement."
        },
        testTakingTip: "Pulse oximetry limitations: dark skin (overestimates), CO poisoning (falsely normal), nail polish (interference), cold extremities (poor signal), anemia (may be normal despite low O2 carrying capacity). When clinical picture contradicts SpO2 → get an ABG.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "monitoring"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "o2-qb-012",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "ordering",
        difficulty: "application",
        stem: "A patient in the ED presents with acute respiratory distress. The nurse must escalate oxygen therapy as the patient's condition worsens. Place the oxygen delivery devices in the correct escalation order from least to most support.",
        options: [
            { id: "s1", text: "Nasal cannula at 2-6 L/min (FiO2 24-44%)" },
            { id: "s2", text: "Simple face mask at 6-10 L/min (FiO2 35-60%)" },
            { id: "s3", text: "Non-rebreather mask at 10-15 L/min (FiO2 80-95%)" },
            { id: "s4", text: "High-flow nasal cannula at 20-60 L/min (FiO2 21-100%) or BiPAP" },
            { id: "s5", text: "Endotracheal intubation and mechanical ventilation" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Nasal cannula is the first-line device for mild hypoxemia. Low flow, comfortable, allows eating/speaking. Each L/min adds roughly 4% FiO2.",
            s2: "Simple face mask provides higher FiO2 than NC. Minimum flow 5 L/min to prevent CO2 rebreathing. Used for moderate hypoxemia.",
            s3: "Non-rebreather delivers near-100% FiO2. The reservoir bag must remain inflated. Used for severe hypoxemia when the patient is still breathing adequately.",
            s4: "HFNC or BiPAP provides positive pressure support. HFNC generates mild PEEP; BiPAP provides full pressure support. Used when face mask therapy fails.",
            s5: "Intubation is the definitive airway. Used when all non-invasive methods fail, the patient cannot protect their airway, or respiratory failure is worsening despite maximum support."
        },
        testTakingTip: "O2 escalation ladder: NC → simple mask → NRB → HFNC/BiPAP → intubation. Each step roughly doubles the support level. Know when to move to the next step: clinical deterioration despite current therapy.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "escalation"
    },

    {
        id: "o2-qb-013",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A patient is being set up for home oxygen therapy after discharge. Place the steps of the home oxygen education in the correct order.",
        options: [
            { id: "s1", text: "Explain the prescribed flow rate, when to use oxygen (continuous vs. exertional), and not to adjust the flow without provider approval" },
            { id: "s2", text: "Demonstrate how to set up, turn on, and connect the oxygen concentrator or tank to the nasal cannula" },
            { id: "s3", text: "Teach oxygen safety: no smoking within 10 feet, no open flames, avoid petroleum-based products (Vaseline), use water-based lubricant for nasal dryness, cotton clothing" },
            { id: "s4", text: "Explain how to read the tank gauge and when to order refills (portable tanks at 500 psi or ¼ full)" },
            { id: "s5", text: "Review when to call the provider (worsening dyspnea, SpO2 below target, equipment malfunction) and ensure they have the oxygen supply company's emergency number" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Understanding the prescription is the foundation — flow rate, timing, and the importance of not self-adjusting.",
            s2: "Equipment setup ensures the patient can actually use the device. Return demonstration confirms competency.",
            s3: "Safety is critical — oxygen supports combustion. Fire is the #1 home oxygen hazard. No smoking is absolute.",
            s4: "Tank management prevents running out of oxygen. The patient must know how to read the gauge and when to call for refills.",
            s5: "Emergency preparedness ensures the patient knows when oxygen alone isn't enough and when to seek help."
        },
        testTakingTip: "Home O2 education: prescription → setup demonstration → safety rules → tank management → emergency plan. The patient and caregiver should demonstrate setup and verbalize safety rules before discharge.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "o2-qb-014",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "ordering",
        difficulty: "analysis",
        stem: "A nurse receives ABG results for a patient on 4 L/min nasal cannula: pH 7.31, PaCO2 48, PaO2 58, HCO3 24. The patient is dyspneic but alert. Place the nurse's actions in priority order.",
        options: [
            { id: "s1", text: "Increase oxygen delivery — the PaO2 of 58 is below target; consider switching to a Venturi mask for more precise FiO2 delivery" },
            { id: "s2", text: "Notify the provider of the ABG results showing both hypoxemia and acute respiratory acidosis" },
            { id: "s3", text: "Reassess the patient: respiratory rate, work of breathing, mental status, and SpO2 trend" },
            { id: "s4", text: "Anticipate a provider order for repeat ABG in 30-60 minutes after the intervention to assess response" },
            { id: "s5", text: "Prepare for possible escalation to BiPAP if hypercapnia does not improve with increased oxygen and repositioning" }
        ],
        correct: ["s3", "s1", "s2", "s4", "s5"],
        rationale: {
            s3: "Assessment first: the ABG is a snapshot, so the nurse needs the full clinical picture — is the patient worsening, stable, or improving? Work of breathing and mental status guide urgency.",
            s1: "Increasing oxygen addresses the immediate hypoxemia (PaO2 58). Switching to a Venturi mask provides precise, titratable FiO2.",
            s2: "Provider notification with both the ABG results and clinical assessment ensures appropriate medical orders for the evolving respiratory failure.",
            s4: "Repeat ABG after intervention determines if the changes are working. Without reassessment, the team is flying blind.",
            s5: "If the patient is retaining CO2 (PaCO2 48) and doesn't improve with oxygen and positioning, BiPAP provides ventilatory support to reduce CO2."
        },
        testTakingTip: "ABG-driven decision-making: assess the patient → intervene (increase O2) → notify provider → recheck ABG → prepare for escalation. Always assess before intervening — the ABG alone doesn't tell the whole story.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "monitoring"
    },

    {
        id: "o2-qb-015",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is troubleshooting a pulse oximeter that is giving erratic or unreliable readings on a patient. Place the troubleshooting steps in the correct order.",
        options: [
            { id: "s1", text: "Check the probe placement — ensure it is properly positioned on a well-perfused site (finger, earlobe, forehead)" },
            { id: "s2", text: "Assess for interfering factors: nail polish (remove it), cold extremities (warm the hand), excessive motion (stabilize the site)" },
            { id: "s3", text: "Try an alternative sensor site (different finger, earlobe, or toe) and a different probe if available" },
            { id: "s4", text: "Correlate the SpO2 reading with the patient's clinical status — does the patient look hypoxic?" },
            { id: "s5", text: "If readings remain unreliable despite troubleshooting, obtain an ABG for accurate SaO2 measurement" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Poor probe placement is the most common cause of inaccurate readings. Check alignment, contact, and that the site has good perfusion.",
            s2: "Common interfering factors: dark nail polish (especially blue/black/green), cold fingers (vasoconstriction), patient movement, and ambient light. Address each systematically.",
            s3: "If the current site is problematic, switching to a different location or probe often resolves the issue.",
            s4: "Clinical correlation is essential. If the SpO2 says 98% but the patient is cyanotic and gasping, trust the clinical picture.",
            s5: "When all troubleshooting fails, an ABG provides the gold standard measurement of oxygen saturation (SaO2) and partial pressure (PaO2)."
        },
        testTakingTip: "Pulse ox troubleshooting: check probe → address interference → try new site → correlate with clinical picture → get ABG if still unreliable. The most important principle: ALWAYS trust the clinical assessment over the number.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "monitoring"
    },

    {
        id: "o2-qb-016",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with acute cardiogenic pulmonary edema is brought to the ED. The patient is sitting bolt upright, severely dyspneic, with pink frothy sputum, SpO2 82%, and bilateral crackles. Place the respiratory interventions in priority order.",
        options: [
            { id: "s1", text: "Apply high-flow oxygen via non-rebreather mask at 15 L/min immediately" },
            { id: "s2", text: "If SpO2 does not improve above 90% within 5 minutes, prepare for CPAP or BiPAP to provide positive pressure and reduce preload" },
            { id: "s3", text: "If the patient becomes obtunded or cannot tolerate non-invasive ventilation, prepare for endotracheal intubation" },
            { id: "s4", text: "Simultaneously administer IV furosemide and nitroglycerin (per provider order) to treat the underlying fluid overload" },
            { id: "s5", text: "After stabilization, obtain a chest X-ray and continuous monitoring in an ICU setting" }
        ],
        correct: ["s1", "s2", "s4", "s3", "s5"],
        rationale: {
            s1: "Immediate high-flow oxygen addresses the critical hypoxemia (SpO2 82%). NRB at 15 L/min provides the highest FiO2 available via face mask.",
            s2: "If NRB is insufficient, CPAP/BiPAP provides positive pressure that reduces pulmonary edema by decreasing venous return (preload) and redistributing fluid out of alveoli.",
            s4: "Treating the cause (fluid overload) alongside respiratory support: IV furosemide for rapid diuresis, nitroglycerin for preload and afterload reduction.",
            s3: "Intubation is the backup if non-invasive methods fail or the patient's mental status deteriorates to where they cannot protect their airway.",
            s5: "Post-stabilization imaging and ICU monitoring ensure ongoing management and detect complications."
        },
        testTakingTip: "Acute pulmonary edema: NRB first → CPAP/BiPAP if NRB fails → treat the cause (diuretics/nitro) → intubation as last resort → ICU. Positive pressure ventilation can be dramatically effective in cardiogenic pulmonary edema.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "escalation"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "o2-qb-017",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each oxygen delivery device, identify the correct FiO2 range it delivers.",
        columns: ["Low FiO2 (24-44%)", "Moderate FiO2 (40-60%)", "High FiO2 (60-100%)"],
        rows: [
            { id: "r1", text: "Nasal cannula at 1-6 L/min", correct: "Low FiO2 (24-44%)" },
            { id: "r2", text: "Non-rebreather mask at 10-15 L/min", correct: "High FiO2 (60-100%)" },
            { id: "r3", text: "Simple face mask at 5-10 L/min", correct: "Moderate FiO2 (40-60%)" },
            { id: "r4", text: "Venturi mask (set at 24-50%)", correct: "Low FiO2 (24-44%)" },
            { id: "r5", text: "Partial rebreather mask at 6-12 L/min", correct: "Moderate FiO2 (40-60%)" },
            { id: "r6", text: "Bag-valve mask (Ambu bag) with reservoir at 15 L/min", correct: "High FiO2 (60-100%)" }
        ],
        rationale: {
            correct: "Low FiO2 devices: nasal cannula (24-44%, ~4% per L/min) and Venturi mask (precise 24-50%). Moderate FiO2: simple face mask (35-60%) and partial rebreather (40-70%). High FiO2: non-rebreather (80-95%) and bag-valve mask with reservoir (nearly 100%). Venturi is categorized as low because its precision settings typically range 24-50%, though higher adapters exist. The device selection depends on the required FiO2 and whether precision is needed."
        },
        testTakingTip: "Quick FiO2 ranges: NC = 24-44% (4% per L/min), simple mask = 35-60%, partial rebreather = 40-70%, NRB = 80-95%, BVM = nearly 100%. Venturi = precise (24-50%). Know these ranges for device selection questions.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "devices"
    },

    {
        id: "o2-qb-018",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "matrix",
        difficulty: "application",
        stem: "For each clinical scenario, identify the most appropriate oxygen delivery device.",
        columns: ["Nasal Cannula", "Venturi Mask", "Non-Rebreather Mask", "BiPAP"],
        rows: [
            { id: "r1", text: "COPD patient with chronic CO2 retention requiring precise FiO2 of 28% to maintain SpO2 88-92%", correct: "Venturi Mask" },
            { id: "r2", text: "Post-surgical patient needing mild supplemental O2 who wants to eat and talk freely", correct: "Nasal Cannula" },
            { id: "r3", text: "Trauma patient with severe hemorrhage, SpO2 78%, and respiratory rate of 32", correct: "Non-Rebreather Mask" },
            { id: "r4", text: "COPD patient with acute hypercapnic respiratory failure (pH 7.28, PaCO2 68) who is alert and cooperative", correct: "BiPAP" },
            { id: "r5", text: "Patient with mild pneumonia, SpO2 92% on room air, stable vital signs", correct: "Nasal Cannula" }
        ],
        rationale: {
            correct: "Device selection is based on the clinical need: Nasal cannula for mild hypoxemia when comfort matters (eating, speaking). Venturi mask when precise FiO2 is critical (COPD with CO2 retention). Non-rebreather when maximum FiO2 is needed urgently (severe hypoxemia in trauma). BiPAP when the patient needs ventilatory support for CO2 retention but is alert enough to cooperate with the mask."
        },
        testTakingTip: "Device selection logic: mild + comfort = NC. Precise FiO2 needed (COPD) = Venturi. Maximum O2 urgently = NRB. CO2 retention + alert = BiPAP. CO2 retention + obtunded = intubation.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "devices"
    },

    {
        id: "o2-qb-019",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each condition, identify whether the primary indication for non-invasive ventilation is CPAP or BiPAP.",
        columns: ["CPAP", "BiPAP"],
        rows: [
            { id: "r1", text: "Obstructive sleep apnea (OSA) for nighttime use", correct: "CPAP" },
            { id: "r2", text: "Acute COPD exacerbation with hypercapnic respiratory failure", correct: "BiPAP" },
            { id: "r3", text: "Acute cardiogenic pulmonary edema (flash pulmonary edema)", correct: "CPAP" },
            { id: "r4", text: "Neuromuscular disease (ALS, muscular dystrophy) with ventilatory insufficiency", correct: "BiPAP" },
            { id: "r5", text: "Obesity hypoventilation syndrome with daytime CO2 retention", correct: "BiPAP" }
        ],
        rationale: {
            correct: "CPAP (single pressure) is indicated when the primary goal is to splint airways open: OSA (prevents upper airway collapse) and cardiogenic pulmonary edema (positive pressure reduces preload and pushes fluid out of alveoli). BiPAP (two pressures) is indicated when ventilatory support is needed to reduce CO2: COPD exacerbation (hypercapnic failure), neuromuscular disease (weak respiratory muscles), and obesity hypoventilation (chronic CO2 retention). The key distinction is whether the patient needs airway splinting (CPAP) or ventilatory assistance (BiPAP)."
        },
        testTakingTip: "CPAP = splint airways (sleep apnea, pulmonary edema). BiPAP = ventilatory support to blow off CO2 (COPD, neuromuscular, obesity hypoventilation). If CO2 is the problem → BiPAP. If airway patency is the problem → CPAP.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "non-invasive-ventilation"
    },

    {
        id: "o2-qb-020",
        category: "respiratory",
        topic: "oxygen-therapy",
        topicLabel: "Oxygen Therapy",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is evaluating pulse oximetry readings. For each scenario, indicate whether the pulse oximetry reading is likely reliable or potentially inaccurate.",
        columns: ["Likely Reliable", "Potentially Inaccurate"],
        rows: [
            { id: "r1", text: "Patient with warm, well-perfused hands, no nail polish, resting comfortably with SpO2 97%", correct: "Likely Reliable" },
            { id: "r2", text: "Patient in cardiogenic shock with cold, mottled extremities and weak pulse; SpO2 reads 88%", correct: "Potentially Inaccurate" },
            { id: "r3", text: "Patient with severe anemia (Hgb 5.2 g/dL) with SpO2 reading 98%", correct: "Potentially Inaccurate" },
            { id: "r4", text: "Awake patient with stable vital signs, clean fingernail, probe on the index finger reading 95%", correct: "Likely Reliable" },
            { id: "r5", text: "Patient who just received methylene blue IV for methemoglobinemia treatment, SpO2 reads 82%", correct: "Potentially Inaccurate" }
        ],
        rationale: {
            correct: "Pulse oximetry requires good perfusion, normal hemoglobin, and absence of interfering substances. Reliable: warm, well-perfused, no interference. Inaccurate: poor perfusion (shock, cold extremities) gives weak signal; severe anemia (SpO2 measures % saturation of available hemoglobin — can be 98% with dangerously low O2 carrying capacity); methylene blue absorbs light at 660nm, causing falsely low SpO2 readings. Other causes of inaccuracy: CO poisoning, nail polish, extreme motion."
        },
        testTakingTip: "Pulse ox unreliable in: poor perfusion (shock), CO poisoning, severe anemia (misleading normal), methylene blue/dyes, dark nail polish, hypothermia. When in doubt, get an ABG. SpO2 tells saturation, NOT oxygen delivery.",
        relatedGuide: "oxygen-therapy.html",
        relatedGuideSection: "monitoring"
    }

]);
