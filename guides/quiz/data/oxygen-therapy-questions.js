/**
 * Oxygen Therapy Quiz — Question Data
 * 10 NCLEX-style questions: 4 Single, 3 SATA, 2 Priority, 1 Analysis
 */

/* exported oxygenTherapyQuizData */
var oxygenTherapyQuizData = {
    guideName: "Oxygen Therapy",
    guideSlug: "oxygen-therapy",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is selecting an oxygen delivery device for a patient who requires a precise, fixed FiO2 of 28%. The patient has a history of COPD with chronic CO2 retention. Which device is MOST appropriate?",
            options: [
                { id: "a", text: "Nasal cannula at 2 L/min" },
                { id: "b", text: "Simple face mask at 6 L/min" },
                { id: "c", text: "Venturi mask with the 28% adapter" },
                { id: "d", text: "Non-rebreather mask at 10 L/min" }
            ],
            correct: "c",
            rationale: {
                correct: "The Venturi mask is the only device that delivers precise, fixed FiO2 concentrations using color-coded adapters. The 28% adapter (typically yellow) mixes a specific ratio of room air with oxygen to guarantee exactly 28% FiO2, regardless of the patient's breathing pattern. This is critical for COPD patients who need controlled, low-concentration oxygen.",
                a: "A nasal cannula at 2 L/min delivers approximately 28% FiO2, but the concentration varies with the patient's respiratory rate, tidal volume, and mouth breathing. It is NOT precise.",
                b: "A simple face mask delivers 40-60% FiO2, which is too high for this COPD patient and could suppress the hypoxic drive, leading to CO2 narcosis.",
                d: "A non-rebreather delivers 80-95% FiO2 — far too high. In a CO2-retaining COPD patient, this could suppress ventilatory drive and cause respiratory failure."
            },
            testTakingTip: "When the question says 'precise FiO2,' think Venturi mask. It is the ONLY low-flow device that delivers an exact concentration. Nasal cannula delivers approximate FiO2 (each L/min ≈ 4% above 21% room air).",
            guideSection: "Section 4 — Oxygen Delivery Devices",
            guideSectionId: "delivery-devices"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient on a nasal cannula at 5 L/min. The patient complains of nasal dryness and irritation, and the nurse notices dried blood around the nares. Which nursing intervention is MOST appropriate?",
            options: [
                { id: "a", text: "Increase the flow rate to 6 L/min to compensate for nasal obstruction" },
                { id: "b", text: "Switch to a simple face mask at 5 L/min" },
                { id: "c", text: "Ensure a bubble humidifier is attached to the oxygen source" },
                { id: "d", text: "Apply petroleum jelly to the nares to prevent further drying" }
            ],
            correct: "c",
            rationale: {
                correct: "Humidification is required for oxygen flow rates greater than 4 L/min to prevent mucosal drying, irritation, and epistaxis. At 5 L/min, a bubble humidifier should already be in use. If it is not attached or is empty, this is the cause of the patient's symptoms.",
                a: "Increasing the flow rate would worsen the drying and irritation. The problem is lack of humidification, not insufficient oxygen delivery.",
                b: "Switching to a face mask does not address the root cause (lack of humidification). A mask at 5 L/min would still cause mucosal drying without humidification.",
                d: "Petroleum-based products (Vaseline) must NEVER be used near oxygen sources due to fire risk. Oxygen supports combustion, and petroleum is flammable. Water-based lubricants (water-soluble nasal gel) are safe alternatives."
            },
            testTakingTip: "Two key oxygen safety rules: (1) Humidify at >4 L/min, and (2) NEVER use petroleum products near oxygen. If the NCLEX mentions Vaseline + oxygen, it's always wrong.",
            guideSection: "Section 8 — Nursing Considerations",
            guideSectionId: "nursing-considerations"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient receiving oxygen via non-rebreather mask at 12 L/min. Which assessments and actions are appropriate? (Select all that apply.)",
            options: [
                { id: "a", text: "Ensure the reservoir bag remains at least two-thirds full during inspiration" },
                { id: "b", text: "Monitor SpO2 continuously and report if below 94%" },
                { id: "c", text: "Assess for signs of oxygen toxicity if FiO2 exceeds 50% for more than 24-48 hours" },
                { id: "d", text: "Remove the mask for 5 minutes every hour to prevent CO2 buildup" },
                { id: "e", text: "Post an 'Oxygen in Use' sign at the bedside and ensure no open flames are nearby" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Appropriate care for a patient on a non-rebreather includes maintaining reservoir bag inflation, continuous SpO2 monitoring, oxygen toxicity surveillance, and fire safety precautions.",
                a: "CORRECT — If the reservoir bag deflates below two-thirds, the patient is rebreathing exhaled CO2. The bag must remain inflated; if it collapses, increase the flow rate or troubleshoot the system.",
                b: "CORRECT — Continuous SpO2 monitoring is essential for patients on high-flow oxygen. Target SpO2 is typically ≥94% for most patients (88-92% for COPD).",
                c: "CORRECT — A non-rebreather delivers 80-95% FiO2. Prolonged exposure to FiO2 >50% for >24-48 hours risks oxygen toxicity, which can cause alveolar damage and ARDS. The team should aim to wean to the lowest effective FiO2.",
                d: "INCORRECT — Removing the mask would expose a critically ill patient (anyone on a NRB is in significant respiratory distress) to room air (21% FiO2), potentially causing dangerous desaturation. The one-way valves on the NRB already prevent CO2 rebreathing.",
                e: "CORRECT — Oxygen supports combustion. Fire safety precautions include posting signs, removing open flames, ensuring electrical equipment is grounded, and keeping flammable materials away."
            },
            testTakingTip: "Non-rebreather mask = highest FiO2 before mechanical ventilation. Key nursing priorities: bag stays inflated, monitor for O2 toxicity, fire safety. Never remove high-flow oxygen from a distressed patient.",
            guideSection: "Section 4 — Oxygen Delivery Devices",
            guideSectionId: "delivery-devices"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with COPD is receiving oxygen via nasal cannula at 2 L/min. The nurse notes the patient has become increasingly drowsy and difficult to arouse. Respiratory rate has decreased from 18 to 8 breaths/min. SpO2 reads 99%. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Increase the oxygen flow rate since the patient is becoming unresponsive" },
                { id: "b", text: "Reduce the oxygen flow rate and stimulate the patient to breathe" },
                { id: "c", text: "Obtain an arterial blood gas (ABG)" },
                { id: "d", text: "Continue monitoring since the SpO2 is within normal limits" }
            ],
            correct: "b",
            rationale: {
                correct: "This COPD patient is showing signs of CO2 narcosis — excess oxygen has suppressed the hypoxic ventilatory drive, leading to hypoventilation, CO2 retention, and progressive somnolence. The immediate action is to reduce the O2 flow rate and stimulate breathing. The SpO2 of 99% in a COPD patient is a red flag, not reassurance — it means they are getting too much oxygen.",
                a: "Increasing oxygen would further suppress the hypoxic drive, worsening CO2 retention and potentially causing respiratory arrest. This is the opposite of what is needed.",
                c: "An ABG is essential and should be obtained, but it is NOT the first action when the patient is becoming obtunded. Reducing the oxygen and stimulating breathing addresses the immediate life threat.",
                d: "A SpO2 of 99% in a COPD patient on supplemental oxygen is ABNORMAL — their target is 88-92%. The high SpO2 combined with decreased LOC and respiratory depression signals CO2 narcosis, not stability."
            },
            labValues: [
                { name: "SpO2 (COPD target)", normal: "88–92%" },
                { name: "PaCO2", normal: "35–45 mmHg" },
                { name: "pH", normal: "7.35–7.45" }
            ],
            testTakingTip: "COPD patients rely on hypoxic drive to breathe. Target SpO2 is 88-92%, NOT 95-100%. If a COPD patient's SpO2 is 'too good' (98-100%) AND they're drowsy/bradypneic, suspect CO2 narcosis. Reduce O2 first, then get an ABG.",
            guideSection: "Section 6 — Special Populations",
            guideSectionId: "special-populations"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in the emergency department has an SpO2 of 82% on room air and is in severe respiratory distress. The nurse applies a non-rebreather mask at 15 L/min, but after 10 minutes the SpO2 has only risen to 87%. The patient is using accessory muscles and has intercostal retractions. Which escalation is MOST appropriate?",
            options: [
                { id: "a", text: "Switch to a Venturi mask at 50% FiO2" },
                { id: "b", text: "Switch to a simple face mask at 10 L/min" },
                { id: "c", text: "Initiate CPAP or BiPAP and prepare for possible intubation" },
                { id: "d", text: "Add a second nasal cannula to supplement the non-rebreather" }
            ],
            correct: "c",
            rationale: {
                correct: "The patient is failing maximum non-invasive oxygen therapy (NRB at 15 L/min delivers up to 95% FiO2) and remains hypoxemic with signs of increased work of breathing. The next step is positive-pressure ventilation — CPAP/BiPAP provides continuous positive airway pressure to recruit collapsed alveoli and improve oxygenation. Intubation should be prepared as backup.",
                a: "A Venturi mask at 50% FiO2 is a STEP DOWN from the non-rebreather (which delivers 80-95% FiO2). This would decrease the oxygen concentration and worsen hypoxemia.",
                b: "A simple face mask delivers only 40-60% FiO2, which is significantly less than the current NRB. This is also a step backward.",
                d: "This is not a standard clinical practice. Adding a second cannula does not meaningfully increase FiO2 and does not address the underlying problem of alveolar recruitment failure."
            },
            testTakingTip: "Know the oxygen escalation ladder: Nasal cannula → Simple mask → Partial rebreather → Non-rebreather → CPAP/BiPAP → Intubation/mechanical ventilation. When the NRB isn't enough, move to positive pressure.",
            guideSection: "Section 9 — Troubleshooting",
            guideSectionId: "troubleshooting"
        },
        {
            id: 6,
            type: "sata",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nursing student is reviewing oxygen delivery devices. Which statements about flow rates are correct? (Select all that apply.)",
            options: [
                { id: "a", text: "A nasal cannula can deliver 1 to 6 L/min, providing approximately 24-44% FiO2" },
                { id: "b", text: "A simple face mask must run at a minimum of 5 L/min to prevent CO2 rebreathing" },
                { id: "c", text: "A Venturi mask delivers variable FiO2 depending on the patient's breathing pattern" },
                { id: "d", text: "A non-rebreather mask should be set at 10-15 L/min to deliver 80-95% FiO2" },
                { id: "e", text: "A partial rebreather delivers higher FiO2 than a non-rebreather at the same flow rate" }
            ],
            correct: ["a", "b", "d"],
            rationale: {
                correct: "Correct statements include nasal cannula flow rates/FiO2, simple mask minimum flow requirement, and non-rebreather settings.",
                a: "CORRECT — Each L/min of nasal cannula flow adds approximately 4% FiO2 above room air (21%). At 1 L/min ≈ 24%, at 6 L/min ≈ 44%. Maximum safe flow is 6 L/min.",
                b: "CORRECT — Below 5 L/min, the simple mask's dead space traps exhaled CO2, which the patient then rebreathes. The minimum 5 L/min ensures adequate CO2 washout.",
                c: "INCORRECT — The Venturi mask delivers PRECISE, FIXED FiO2 using calibrated color-coded adapters. It entrains a specific ratio of room air to oxygen regardless of the patient's breathing pattern. This is its defining advantage.",
                d: "CORRECT — Non-rebreather masks require 10-15 L/min to keep the reservoir bag inflated and deliver the highest non-invasive FiO2 (80-95%).",
                e: "INCORRECT — The non-rebreather has one-way valves that prevent exhaled air from mixing with the reservoir oxygen, delivering HIGHER FiO2 (80-95%) than the partial rebreather (60-75%), which allows some exhaled air to mix back."
            },
            testTakingTip: "Build a mental table: NC (1-6 L, 24-44%), Simple mask (5-10 L, 40-60%), Partial rebreather (6-10 L, 60-75%), NRB (10-15 L, 80-95%), Venturi (4-12 L, precise 24-50%). This chart is NCLEX gold.",
            guideSection: "Section 4 — Oxygen Delivery Devices",
            guideSectionId: "delivery-devices"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse enters a patient's room and finds the patient on 4 L/min nasal cannula smoking a cigarette. The patient states, \"I cracked the window, so it's fine.\" What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Remove the oxygen source from the patient immediately" },
                { id: "b", text: "Ask the patient to extinguish the cigarette" },
                { id: "c", text: "Open the window wider to ventilate the room" },
                { id: "d", text: "Document the safety violation and notify the charge nurse" }
            ],
            correct: "a",
            rationale: {
                correct: "This is an immediate fire and explosion hazard. Oxygen supports and accelerates combustion — even a small spark near an oxygen source can cause a flash fire or explosion. The FIRST action is to remove the ignition risk by removing the oxygen source (turn off the flow and remove the cannula from the patient's face), which eliminates the immediate danger.",
                b: "While the cigarette is the ignition source, the oxygen-enriched environment around the patient's face is what creates the explosion risk. Removing the oxygen is faster and eliminates the accelerant. In practice, both should happen nearly simultaneously, but the oxygen is the priority.",
                c: "Ventilation does not address the immediate fire risk. An open window does not reduce the oxygen concentration near the patient's face where the cannula is delivering 4 L/min directly.",
                d: "Documentation and notification are important follow-up actions but are NOT the first response to an active fire hazard."
            },
            testTakingTip: "Oxygen + open flame = immediate safety emergency. Follow the RACE mnemonic mindset: Remove the danger first (remove O2 source), then address the ignition source, then document. Safety always comes before documentation.",
            guideSection: "Section 8 — Nursing Considerations",
            guideSectionId: "nursing-considerations"
        },
        {
            id: 8,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is interpreting an arterial blood gas (ABG) result for a patient on supplemental oxygen: pH 7.28, PaCO2 58 mmHg, PaO2 72 mmHg, HCO3 26 mEq/L. Which interpretations are correct? (Select all that apply.)",
            options: [
                { id: "a", text: "The patient has respiratory acidosis" },
                { id: "b", text: "The PaCO2 indicates CO2 retention" },
                { id: "c", text: "The HCO3 shows the kidneys have fully compensated" },
                { id: "d", text: "The PaO2 is within the normal range for a patient on supplemental oxygen" },
                { id: "e", text: "The patient may need increased ventilatory support" }
            ],
            correct: ["a", "b", "e"],
            rationale: {
                correct: "The ABG shows uncompensated respiratory acidosis with CO2 retention. The patient needs ventilatory support to improve CO2 clearance.",
                a: "CORRECT — pH 7.28 (acidotic, normal 7.35-7.45) + PaCO2 58 (elevated, normal 35-45) = respiratory acidosis. The CO2 is causing the pH to drop.",
                b: "CORRECT — PaCO2 of 58 mmHg is significantly above normal (35-45 mmHg), indicating the lungs are not adequately eliminating CO2.",
                c: "INCORRECT — HCO3 of 26 mEq/L is within normal range (22-26 mEq/L), meaning the kidneys have NOT yet compensated. If fully compensated, the HCO3 would be elevated (>26) to buffer the excess CO2, and the pH would be closer to normal.",
                d: "INCORRECT — PaO2 of 72 mmHg on supplemental oxygen is below normal (expected 80-100 mmHg on room air, higher on supplemental O2). This patient is still hypoxemic despite supplemental oxygen.",
                e: "CORRECT — Uncompensated respiratory acidosis with CO2 retention and ongoing hypoxemia despite oxygen suggests the patient may need CPAP/BiPAP or mechanical ventilation to improve alveolar ventilation."
            },
            labValues: [
                { name: "pH", normal: "7.35–7.45" },
                { name: "PaCO2", normal: "35–45 mmHg" },
                { name: "PaO2", normal: "80–100 mmHg" },
                { name: "HCO3", normal: "22–26 mEq/L" }
            ],
            testTakingTip: "ABG interpretation in 3 steps: (1) Is pH acidotic or alkalotic? (2) Which system matches — respiratory (CO2) or metabolic (HCO3)? (3) Is the other system compensating? Here: acidotic pH + high CO2 + normal HCO3 = uncompensated respiratory acidosis.",
            guideSection: "Section 5 — FiO2 Calculations",
            guideSectionId: "fio2-calculations"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is setting up a simple face mask for a patient. The respiratory therapist orders 4 L/min via simple face mask. What should the nurse do?",
            options: [
                { id: "a", text: "Set the flow rate as ordered at 4 L/min" },
                { id: "b", text: "Contact the provider because the minimum flow rate for a simple face mask is 5 L/min" },
                { id: "c", text: "Switch to a nasal cannula at 4 L/min instead" },
                { id: "d", text: "Set the flow rate at 5 L/min and document the change" }
            ],
            correct: "b",
            rationale: {
                correct: "A simple face mask requires a minimum flow rate of 5 L/min to flush exhaled CO2 from the mask's dead space. Running it at 4 L/min would cause CO2 rebreathing, potentially leading to hypercapnia. The nurse should clarify the order rather than independently change the device or flow rate.",
                a: "Setting it at 4 L/min creates a patient safety risk (CO2 rebreathing). The nurse should not follow an order that is below the safe minimum for the device.",
                c: "Switching devices independently changes the prescribed therapy. While a nasal cannula at 4 L/min is safe, the nurse should clarify with the provider rather than change the delivery method unilaterally.",
                d: "Adjusting the flow rate without a provider order is outside the nurse's scope of practice in this context. The discrepancy between the order and safe practice needs to be clarified, not independently corrected."
            },
            testTakingTip: "Know device minimums: Simple mask ≥5 L/min, partial rebreather ≥6 L/min, NRB ≥10 L/min. If an NCLEX question gives a flow rate below the minimum for a device, the correct answer is to question/clarify the order.",
            guideSection: "Section 4 — Oxygen Delivery Devices",
            guideSectionId: "delivery-devices"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with pneumonia has the following assessment findings: SpO2 91% on room air, respiratory rate 24 breaths/min, mild dyspnea with exertion, and clear speech. The patient is able to eat and drink without difficulty. Which oxygen delivery device should the nurse initiate?",
            options: [
                { id: "a", text: "Non-rebreather mask at 15 L/min" },
                { id: "b", text: "Simple face mask at 8 L/min" },
                { id: "c", text: "Nasal cannula at 2-4 L/min" },
                { id: "d", text: "Venturi mask at 40% FiO2" }
            ],
            correct: "c",
            rationale: {
                correct: "This patient has mild-to-moderate hypoxemia (SpO2 91%) with stable vital signs and no severe distress. A nasal cannula at 2-4 L/min (approximately 28-36% FiO2) is the most appropriate first-line device. It allows the patient to eat, drink, and speak comfortably — which are important considerations since the patient is currently tolerating oral intake.",
                a: "A non-rebreather at 15 L/min (80-95% FiO2) is for severe hypoxemia and acute respiratory distress. This is excessive for a patient with an SpO2 of 91% and only mild exertional dyspnea.",
                b: "A simple face mask at 8 L/min (approximately 50-60% FiO2) is more than necessary for mild hypoxemia and would interfere with eating and drinking. Start with the least invasive, lowest effective device.",
                d: "A Venturi mask at 40% FiO2 is higher than likely needed and would also interfere with eating. It is more appropriate when a precise FiO2 is required (e.g., COPD patients)."
            },
            testTakingTip: "Always start with the least invasive, lowest effective oxygen device. Match the device to the severity: mild hypoxemia = nasal cannula, moderate = mask, severe = NRB. Also consider patient comfort — if they need to eat/drink, a nasal cannula is preferred.",
            guideSection: "Section 4 — Oxygen Delivery Devices",
            guideSectionId: "delivery-devices"
        }
    ]
};
