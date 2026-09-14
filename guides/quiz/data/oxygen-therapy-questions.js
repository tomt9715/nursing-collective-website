/**
 * Oxygen Therapy Quiz - Question Data
 * 10 NCLEX-style questions: 5 Single, 2 Priority, 2 Matrix, 1 Ordering
 */

/* exported oxygenTherapyQuizData */
var oxygenTherapyQuizData = {
    guideName: "Oxygen Therapy",
    guideSlug: "oxygen-therapy",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is selecting an oxygen delivery device for a patient who requires a precise, fixed FiO2 of 28%. The patient has a history of chronic obstructive pulmonary disease (COPD) with chronic CO2 retention. Which device is MOST appropriate?",
            options: [
                { id: "a", text: "Nasal cannula at 2 L/min" },
                { id: "b", text: "Simple face mask at 6 L/min" },
                { id: "c", text: "Venturi mask with the 28% adapter" },
                { id: "d", text: "Non-rebreather mask at 10 L/min" }
            ],
            correct: "c",
            rationale: {
                correct: "The Venturi mask is the only device that delivers precise, fixed FiO2 concentrations using color-coded adapters. The 28% adapter (typically yellow) mixes a specific ratio of room air with oxygen to guarantee exactly 28% FiO2, regardless of the patient's breathing pattern. This is critical for chronic obstructive pulmonary disease (COPD) patients who need controlled, low-concentration oxygen.",
                a: "A nasal cannula at 2 L/min delivers approximately 28% FiO2, but the concentration varies with the patient's respiratory rate, tidal volume, and mouth breathing. It is NOT precise.",
                b: "A simple face mask delivers 40-60% FiO2, which is too high for this chronic obstructive pulmonary disease (COPD) patient and could drive CO2 up, leading to CO2 narcosis.",
                d: "A non-rebreather delivers 80-95% FiO2 - far too high. In a CO2-retaining chronic obstructive pulmonary disease (COPD) patient, this could drive CO2 up and cause respiratory failure."
            },
            testTakingTip: "When the question says 'precise FiO2,' think Venturi mask. It is the ONLY low-flow device that delivers an exact concentration. Nasal cannula delivers approximate FiO2 (each L/min ≈ 4% above 21% room air).",
            guideSection: "Section 4 - Oxygen Delivery Devices",
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
            guideSection: "Section 8 - Nursing Considerations",
            guideSectionId: "nursing-considerations"
        },
        {
            id: 3,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient receiving oxygen via non-rebreather mask at 12 L/min. For each nursing action, indicate whether it is appropriate or inappropriate.",
            matrixColumns: ["Appropriate", "Inappropriate"],
            options: [
                { id: "a", text: "Ensure the reservoir bag remains at least two-thirds full during inspiration" },
                { id: "b", text: "Monitor SpO2 continuously and report if below 94%" },
                { id: "c", text: "Remove the mask for 5 minutes every hour to prevent CO2 buildup" },
                { id: "d", text: "Post an 'Oxygen in Use' sign and ensure no open flames are nearby" }
            ],
            correct: {
                a: "Appropriate",
                b: "Appropriate",
                c: "Inappropriate",
                d: "Appropriate"
            },
            rationale: {
                correct: "Appropriate non-rebreather (NRB) care includes maintaining reservoir bag inflation, continuous SpO2 monitoring, and fire safety. Removing the mask from a critically ill patient is dangerous and unnecessary - one-way valves already prevent CO2 rebreathing.",
                a: "APPROPRIATE - If the reservoir bag deflates below two-thirds, the patient is rebreathing exhaled CO2. The bag must remain inflated; if it collapses, increase the flow rate or troubleshoot the system.",
                b: "APPROPRIATE - Continuous SpO2 monitoring is essential for patients on high-flow oxygen. Target SpO2 is typically ≥94% for most patients, and 88–92% for chronic obstructive pulmonary disease (COPD) patients.",
                c: "INAPPROPRIATE - Removing the mask would expose a critically ill patient to room air (21% FiO2), potentially causing dangerous desaturation. The one-way valves on the non-rebreather (NRB) already prevent CO2 rebreathing.",
                d: "APPROPRIATE - Oxygen supports combustion. Fire safety precautions include posting signs, removing open flames, ensuring electrical equipment is grounded, and keeping flammable materials away."
            },
            testTakingTip: "Non-rebreather mask = highest FiO2 before mechanical ventilation. Key nursing priorities: bag stays inflated, monitor for O2 toxicity, fire safety. Never remove high-flow oxygen from a distressed patient.",
            guideSection: "Section 4 - Oxygen Delivery Devices",
            guideSectionId: "delivery-devices"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with chronic obstructive pulmonary disease (COPD) is receiving oxygen via nasal cannula at 2 L/min. The nurse notes the patient has become increasingly drowsy and difficult to arouse. Respiratory rate has decreased from 18 to 8 breaths/min. SpO2 reads 99%. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Increase the oxygen flow rate since the patient is becoming unresponsive" },
                { id: "b", text: "Reduce the oxygen flow rate and stimulate the patient to breathe" },
                { id: "c", text: "Obtain an arterial blood gas (ABG)" },
                { id: "d", text: "Continue monitoring since the SpO2 is within normal limits" }
            ],
            correct: "b",
            rationale: {
                correct: "This chronic obstructive pulmonary disease (COPD) patient is showing signs of CO2 narcosis. Excess oxygen worsens ventilation-perfusion mismatch in damaged lungs and frees CO2 from hemoglobin (the Haldane effect), so CO2 climbs and somnolence follows. The immediate action is to reduce the O2 flow rate and stimulate breathing. The SpO2 of 99% in a COPD patient is a red flag, not reassurance - it means they are getting too much oxygen.",
                a: "Increasing oxygen would push CO2 even higher, worsening the narcosis and potentially causing respiratory arrest. This is the opposite of what is needed.",
                c: "An arterial blood gas (ABG) is essential and should be obtained, but it is NOT the first action when the patient is becoming obtunded. Reducing the oxygen and stimulating breathing addresses the immediate life threat.",
                d: "A SpO2 of 99% in a chronic obstructive pulmonary disease (COPD) patient on supplemental oxygen is ABNORMAL - their target is 88-92%. The high SpO2 combined with decreased level of consciousness (LOC) and respiratory depression signals CO2 narcosis, not stability."
            },
            labValues: [
                { name: "SpO2 (COPD target)", normal: "88–92%" },
                { name: "PaCO2", normal: "35–45 mmHg" },
                { name: "pH", normal: "7.35–7.45" }
            ],
            testTakingTip: "Chronic obstructive pulmonary disease (COPD) patients who retain CO2 get controlled oxygen, because too much drives CO2 up. Target SpO2 is 88-92%, NOT 95-100%. If a COPD patient's SpO2 is 'too good' (98-100%) AND they're drowsy/bradypneic, suspect CO2 narcosis. Reduce O2 first, then get an arterial blood gas (ABG).",
            guideSection: "Section 6 - Special Populations",
            guideSectionId: "special-populations"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient in the emergency department has an SpO2 of 82% on room air and is in severe respiratory distress. The nurse applies a non-rebreather mask at 15 L/min, but after 10 minutes the SpO2 has only risen to 87%. The patient is using accessory muscles and has intercostal retractions. Which escalation is MOST appropriate?",
            options: [
                { id: "a", text: "Switch to a Venturi mask at 50% FiO2 and recheck SpO2 in 15 minutes" },
                { id: "b", text: "Switch to a simple face mask at 10 L/min for patient comfort" },
                { id: "c", text: "Start noninvasive positive-pressure ventilation and prepare for intubation" },
                { id: "d", text: "Add a second nasal cannula to supplement the non-rebreather" }
            ],
            correct: "c",
            rationale: {
                correct: "The patient is failing maximum non-invasive oxygen therapy, since a non-rebreather (NRB) at 15 L/min delivers up to 95% FiO2, and remains hypoxemic with signs of increased work of breathing. The next step is positive-pressure ventilation - continuous positive airway pressure (CPAP) or bilevel positive airway pressure (BiPAP) delivers positive pressure to recruit collapsed alveoli and improve oxygenation. Intubation should be prepared as backup.",
                a: "A Venturi mask at 50% FiO2 is a STEP DOWN from the non-rebreather (which delivers 80-95% FiO2). This would decrease the oxygen concentration and worsen hypoxemia.",
                b: "A simple face mask delivers only 40-60% FiO2, which is significantly less than the current non-rebreather (NRB). This is also a step backward.",
                d: "This is not a standard clinical practice. Adding a second cannula does not meaningfully increase FiO2 and does not address the underlying problem of alveolar recruitment failure."
            },
            testTakingTip: "Know the oxygen escalation ladder: Nasal cannula → Simple mask → Partial rebreather → Non-rebreather → continuous positive airway pressure (CPAP)/bilevel positive airway pressure (BiPAP) → Intubation/mechanical ventilation. When the non-rebreather (NRB) isn't enough, move to positive pressure.",
            guideSection: "Section 9 - Troubleshooting",
            guideSectionId: "troubleshooting"
        },
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nursing student is reviewing oxygen delivery devices. For each statement, indicate whether it is correct or incorrect.",
            matrixColumns: ["Correct", "Incorrect"],
            options: [
                { id: "a", text: "A nasal cannula delivers 1–6 L/min, providing approximately 24–44% FiO2" },
                { id: "b", text: "A simple face mask must run at a minimum of 5 L/min to prevent CO2 rebreathing" },
                { id: "c", text: "A Venturi mask delivers variable FiO2 depending on the patient's breathing pattern" },
                { id: "d", text: "A non-rebreather mask should be set at 10–15 L/min to deliver 80–95% FiO2" }
            ],
            correct: {
                a: "Correct",
                b: "Correct",
                c: "Incorrect",
                d: "Correct"
            },
            rationale: {
                correct: "Nasal cannula flow/FiO2 ranges, simple mask minimum flow requirements, and non-rebreather (NRB) settings are all accurate. The Venturi mask delivers PRECISE, FIXED FiO2 - not variable - using calibrated color-coded adapters.",
                a: "CORRECT - Each L/min of nasal cannula flow adds approximately 4% FiO2 above room air (21%). At 1 L/min ≈ 24%, at 6 L/min ≈ 44%. Maximum safe flow is 6 L/min.",
                b: "CORRECT - Below 5 L/min, the simple mask's dead space traps exhaled CO2. The minimum 5 L/min ensures adequate CO2 washout from the mask.",
                c: "INCORRECT - The Venturi mask delivers PRECISE, FIXED FiO2 using calibrated color-coded adapters. It entrains a specific ratio of room air to oxygen regardless of the patient's breathing pattern. This is its defining advantage, especially for chronic obstructive pulmonary disease (COPD) patients.",
                d: "CORRECT - Non-rebreather masks require 10–15 L/min to keep the reservoir bag inflated and deliver the highest non-invasive FiO2 (80–95%)."
            },
            testTakingTip: "Build a mental table: nasal cannula (NC) 1–6 L, 24–44%; simple mask 5–10 L, 40–60%; partial rebreather 6–10 L, 60–75%; non-rebreather (NRB) 10–15 L, 80–95%; Venturi 4–12 L, precise 24–50%. This chart is NCLEX gold.",
            guideSection: "Section 4 - Oxygen Delivery Devices",
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
                correct: "This is an immediate fire and explosion hazard. Oxygen supports and accelerates combustion - even a small spark near an oxygen source can cause a flash fire or explosion. The FIRST action is to remove the ignition risk by removing the oxygen source (turn off the flow and remove the cannula from the patient's face), which eliminates the immediate danger.",
                b: "While the cigarette is the ignition source, the oxygen-enriched environment around the patient's face is what creates the explosion risk. Removing the oxygen is faster and eliminates the accelerant. In practice, both should happen nearly simultaneously, but the oxygen is the priority.",
                c: "Ventilation does not address the immediate fire risk. An open window does not reduce the oxygen concentration near the patient's face where the cannula is delivering 4 L/min directly.",
                d: "Documentation and notification are important follow-up actions but are NOT the first response to an active fire hazard."
            },
            testTakingTip: "Oxygen + open flame = immediate safety emergency. Follow the RACE mnemonic mindset: Remove the danger first (remove O2 source), then address the ignition source, then document. Safety always comes before documentation.",
            guideSection: "Section 8 - Nursing Considerations",
            guideSectionId: "nursing-considerations"
        },
        {
            id: 8,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with chronic obstructive pulmonary disease (COPD) on 2 L/min nasal cannula becomes increasingly somnolent and difficult to arouse. RR has dropped from 18 to 8 breaths/min. Stat arterial blood gas (ABG) shows: pH 7.22, PaCO2 78 mmHg, PaO2 58 mmHg, HCO3 32 mEq/L. The nurse recognizes acute-on-chronic respiratory acidosis with CO2 narcosis. Place the nursing actions in priority order.",
            options: [
                { id: "a", text: "Maintain current O2 at 2 L/min - do NOT increase flow rate, as higher O2 can worsen CO2 retention through ventilation-perfusion mismatch" },
                { id: "b", text: "Stimulate the patient and position upright (high Fowler\u2019s) to maximize diaphragm excursion and promote ventilation" },
                { id: "c", text: "Notify the provider immediately and prepare for bilevel positive airway pressure (BiPAP) to clear CO2" },
                { id: "d", text: "Apply continuous pulse oximetry and capnography to monitor both oxygenation and ventilation trends" },
                { id: "e", text: "Hold any sedating medications (opioids, benzodiazepines) and review the medication administration record for respiratory depressants" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The priority sequence addresses immediate safety: avoid worsening the crisis (do not increase O2), optimize what you can independently (positioning, stimulation), escalate to the provider for definitive treatment with bilevel positive airway pressure (BiPAP), establish monitoring, and eliminate contributing factors (sedating medications).",
                a: "FIRST - In chronic obstructive pulmonary disease (COPD) patients with CO2 retention, increasing O2 above the prescribed low-flow rate worsens ventilation-perfusion mismatch and frees CO2 from hemoglobin (the Haldane effect), so CO2 climbs and narcosis deepens. The older hypoxic drive explanation is incomplete. Maintaining the current rate prevents iatrogenic harm.",
                b: "SECOND - Physical stimulation can temporarily increase respiratory effort in a somnolent patient. High Fowler\u2019s position lowers abdominal pressure on the diaphragm, improving tidal volume. These are independent nursing actions that can be done immediately.",
                c: "THIRD - A pH of 7.22 with PaCO2 of 78 indicates severe acute respiratory failure requiring ventilatory support. Bilevel positive airway pressure (BiPAP) provides inspiratory pressure to augment tidal volume and expiratory pressure to maintain alveolar recruitment, promoting CO2 clearance without intubation.",
                d: "FOURTH - Continuous monitoring detects further deterioration. Capnography (end-tidal CO2) provides real-time ventilation data between arterial blood gas (ABG) draws. SpO2 target for chronic obstructive pulmonary disease (COPD) is 88\u201392% - higher levels suggest excessive O2 that may drive CO2 up.",
                e: "FIFTH - Any sedating medications compound the respiratory depression. Reviewing the medication administration record (MAR) identifies if opioids, benzodiazepines, or muscle relaxants contributed to the acute decompensation. Reversal agents (naloxone, flumazenil) may be needed if these medications are the trigger."
            },
            labValues: [
                { name: "pH", normal: "7.35\u20137.45" },
                { name: "PaCO2", normal: "35\u201345 mmHg" },
                { name: "PaO2", normal: "80\u2013100 mmHg" },
                { name: "HCO3", normal: "22\u201326 mEq/L" }
            ],
            testTakingTip: "Chronic obstructive pulmonary disease (COPD) + somnolence + rising CO2 = CO2 narcosis. The #1 NCLEX trap: do NOT increase O2 in a COPD patient with CO2 retention - it drives CO2 up. Target SpO2 88\u201392%. Treatment is bilevel positive airway pressure (BiPAP), which supports ventilation, not just more O2 (only helps oxygenation). The elevated HCO3 (32) tells you this is chronic compensation, meaning the acute crisis is layered on top of longstanding CO2 retention.",
            guideSection: "Section 5 - FiO2 Calculations",
            guideSectionId: "fio2-calculations"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is setting up a simple face mask for a patient. The respiratory therapist orders 4 L/min via simple face mask. What should the nurse do?",
            options: [
                { id: "a", text: "Set the flow rate at 4 L/min on the flowmeter as ordered" },
                { id: "b", text: "Contact the provider, because a simple face mask needs at least 5 L/min" },
                { id: "c", text: "Switch to a nasal cannula at 4 L/min instead of the mask" },
                { id: "d", text: "Set the flow rate at 5 L/min and document the change" }
            ],
            correct: "b",
            rationale: {
                correct: "A simple face mask requires a minimum flow rate of 5 L/min to flush exhaled CO2 from the mask's dead space. Running it at 4 L/min would cause CO2 rebreathing, potentially leading to hypercapnia. The nurse should clarify the order rather than independently change the device or flow rate.",
                a: "Setting it at 4 L/min creates a patient safety risk (CO2 rebreathing). The nurse should not follow an order that is below the safe minimum for the device.",
                c: "Switching devices independently changes the prescribed therapy. While a nasal cannula at 4 L/min is safe, the nurse should clarify with the provider rather than change the delivery method unilaterally.",
                d: "Adjusting the flow rate without a provider order is outside the nurse's scope of practice in this context. The discrepancy between the order and safe practice needs to be clarified, not independently corrected."
            },
            testTakingTip: "Know device minimums: Simple mask ≥5 L/min, partial rebreather ≥6 L/min, non-rebreather (NRB) ≥10 L/min. If an NCLEX question gives a flow rate below the minimum for a device, the correct answer is to question/clarify the order.",
            guideSection: "Section 4 - Oxygen Delivery Devices",
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
                correct: "This patient has mild-to-moderate hypoxemia (SpO2 91%) with stable vital signs and no severe distress. A nasal cannula at 2-4 L/min (approximately 28-36% FiO2) is the most appropriate first-line device. It allows the patient to eat, drink, and speak comfortably - which are important considerations since the patient is currently tolerating oral intake.",
                a: "A non-rebreather at 15 L/min (80-95% FiO2) is for severe hypoxemia and acute respiratory distress. This is excessive for a patient with an SpO2 of 91% and only mild exertional dyspnea.",
                b: "A simple face mask at 8 L/min (approximately 50-60% FiO2) is more than necessary for mild hypoxemia and would interfere with eating and drinking. Start with the least invasive, lowest effective device.",
                d: "A Venturi mask at 40% FiO2 is higher than likely needed and would also interfere with eating. It is more appropriate when a precise FiO2 is required, such as for chronic obstructive pulmonary disease (COPD) patients."
            },
            testTakingTip: "Always start with the least invasive, lowest effective oxygen device. Match the device to the severity: mild hypoxemia = nasal cannula, moderate = mask, severe = non-rebreather (NRB). Also consider patient comfort - if they need to eat/drink, a nasal cannula is preferred.",
            guideSection: "Section 4 - Oxygen Delivery Devices",
            guideSectionId: "delivery-devices"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks how much of the oxygen in arterial blood is carried on hemoglobin. What should the nurse answer?",
            options: [
                { id: "a", text: "About 98.5 percent, with the rest dissolved in plasma" },
                { id: "b", text: "About 50 percent, with the rest dissolved in plasma" },
                { id: "c", text: "About 75 percent, with the rest bound to plasma protein" },
                { id: "d", text: "Almost none, since most of it dissolves in the plasma" }
            ],
            correct: "a",
            rationale: {
                correct: "Almost all oxygen in blood rides on hemoglobin, about 98.5 percent, with each molecule carrying four. Only a small fraction is dissolved in plasma, which is what the partial pressure of oxygen measures.",
                b: "Half would leave far too little carrying capacity to meet tissue demand.",
                c: "Oxygen is not carried bound to plasma proteins in any meaningful quantity.",
                d: "The dissolved fraction is small, which is precisely why hemoglobin matters so much."
            },
            testTakingTip: "Two numbers, two different things. Saturation is how full the hemoglobin is; the partial pressure is what is dissolved.",
            guideSection: "Section 3 - What the number actually means",
            guideSectionId: "physiology"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "application",
            stem: "A patient has arrived after a house fire with suspected carbon monoxide poisoning. The pulse oximeter reads 99 percent. What should the nurse anticipate?",
            options: [
                { id: "a", text: "Giving 100 percent oxygen regardless of the saturation" },
                { id: "b", text: "Withholding oxygen because the saturation is normal" },
                { id: "c", text: "Giving 2 litres by nasal cannula and reassessing later" },
                { id: "d", text: "Titrating the oxygen down to keep saturation near 94" }
            ],
            correct: "a",
            rationale: {
                correct: "Carbon monoxide poisoning is treated with 100 percent oxygen regardless of the saturation reading. Carbon monoxide binds hemoglobin far more avidly than oxygen does, and the oximeter cannot tell the two apart, so the reading is falsely reassuring.",
                b: "The normal reading is exactly the trap. It reflects saturated hemoglobin, not hemoglobin saturated with oxygen.",
                c: "A low flow cannula does not deliver the concentration needed to displace carbon monoxide.",
                d: "Titrating down treats a number that is not measuring what it appears to measure."
            },
            testTakingTip: "A pulse oximeter cannot distinguish carbon monoxide from oxygen. In a fire victim, ignore the number and give 100 percent.",
            guideSection: "Section 4 - When oxygen is the answer",
            guideSectionId: "indications"
        },
        {
            id: 13, type: "single", subtype: null, difficulty: "application",
            stem: "A patient with an acute myocardial infarction has an oxygen saturation of 96 percent on room air. What should the nurse do about oxygen?",
            options: [
                { id: "a", text: "Withhold oxygen, since it is given below 94 percent" },
                { id: "b", text: "Start oxygen at 2 litres per minute by nasal cannula" },
                { id: "c", text: "Start oxygen by non-rebreather mask at 15 litres" },
                { id: "d", text: "Start oxygen only once chest pain has been relieved" }
            ],
            correct: "a",
            rationale: {
                correct: "In acute myocardial infarction oxygen is given only if the saturation is under 94 percent. Routine oxygen in a patient who is not hypoxemic offers no benefit and may cause harm through vasoconstriction.",
                b: "Starting oxygen at a saturation of 96 percent treats a number that is already adequate.",
                c: "A non-rebreather is far more than this patient needs and carries the same concern.",
                d: "Pain relief is not the trigger for oxygen. The saturation is."
            },
            testTakingTip: "Oxygen is a drug with an order, a dose and a target. In myocardial infarction the trigger is a saturation under 94 percent.",
            guideSection: "Section 4 - When oxygen is the answer",
            guideSectionId: "indications"
        },
        {
            id: 14, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient has been on 70 percent fraction of inspired oxygen for 36 hours. Which risk should the nurse recognise?",
            options: [
                { id: "a", text: "Oxygen toxicity, from free radicals damaging the lung" },
                { id: "b", text: "Oxygen dependence, meaning the drive to breathe is lost" },
                { id: "c", text: "Carbon dioxide narcosis from suppressed respirations" },
                { id: "d", text: "Nitrogen accumulation causing alveolar over-distension" }
            ],
            correct: "a",
            rationale: {
                correct: "Above 50 percent fraction of inspired oxygen held for 24 to 48 hours, oxygen begins damaging the lung it was given to help. Free radicals injure membranes, surfactant production fails, nitrogen is washed out causing absorption atelectasis, and inflammation follows.",
                b: "Supplemental oxygen does not create dependence or switch off the drive to breathe in this patient.",
                c: "Carbon dioxide narcosis is the concern in chronic carbon dioxide retainers, a different problem that can occur at much lower concentrations.",
                d: "High oxygen washes nitrogen out rather than accumulating it, and the result is collapse rather than over-distension."
            },
            testTakingTip: "Above 50 percent for 24 to 48 hours is the toxicity threshold. Use the lowest concentration that meets the target.",
            guideSection: "Section 8 - When oxygen becomes the injury",
            guideSectionId: "oxygen-toxicity"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks why washing out nitrogen with high concentration oxygen causes alveoli to collapse. Which explanation is correct?",
            options: [
                { id: "a", text: "Nitrogen splints alveoli open and is not absorbed" },
                { id: "b", text: "Nitrogen dissolves surfactant and holds alveoli open" },
                { id: "c", text: "Nitrogen carries oxygen across the alveolar membrane" },
                { id: "d", text: "Nitrogen stimulates the alveoli to produce more mucus" }
            ],
            correct: "a",
            rationale: {
                correct: "Nitrogen is not absorbed into the blood, so it stays in the alveolus and splints it open. A high fraction of inspired oxygen washes that nitrogen out, and once the oxygen is absorbed nothing is left holding the alveolus open. That is absorption atelectasis.",
                b: "Nitrogen does not dissolve surfactant. Free radicals injure the cells that produce it, which is a separate mechanism.",
                c: "Nitrogen is inert and plays no part in carrying oxygen.",
                d: "Mucus production is unrelated to alveolar nitrogen."
            },
            testTakingTip: "Nitrogen is the scaffolding. Wash it out with high oxygen and the alveolus has nothing left to hold it open.",
            guideSection: "Section 8 - When oxygen becomes the injury",
            guideSectionId: "oxygen-toxicity"
        }
    ]
};
