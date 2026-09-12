/**
 * Chest Tubes Quiz - Question Data
 * 10 NCLEX-style questions: 4 Single, 3 Priority, 2 Matrix, 1 Ordering
 */

/* exported chestTubesQuizData */
var chestTubesQuizData = {
    guideName: "Chest Tubes",
    guideSlug: "chest-tubes",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient with a chest tube connected to a water-seal drainage system. The nurse observes the water level in the water-seal chamber rising and falling with the patient's respirations. What does this finding indicate?",
            options: [
                { id: "a", text: "There is an air leak in the system that needs to be addressed" },
                { id: "b", text: "The chest tube is functioning properly - this is expected tidaling" },
                { id: "c", text: "The chest tube is obstructed and needs to be milked" },
                { id: "d", text: "The lung has fully re-expanded and the tube can be removed" }
            ],
            correct: "b",
            rationale: {
                correct: "Tidaling (fluctuation) in the water-seal chamber is a NORMAL finding that indicates the chest tube is patent and properly positioned. The water level rises during inspiration (due to increased negative intrapleural pressure) and falls during expiration. This confirms the tube is communicating with the pleural space.",
                a: "An air leak is indicated by continuous BUBBLING in the water-seal chamber, not tidaling. Tidaling is the gentle rise and fall of the water level, which is expected.",
                c: "An obstructed tube would show ABSENT tidaling (no fluctuation), not the presence of it. If tidaling stops, the tube may be kinked, clamped, or occluded by a clot.",
                d: "The cessation of tidaling (along with no air leak and minimal drainage) suggests lung re-expansion. The PRESENCE of tidaling means the lung is not yet fully expanded."
            },
            testTakingTip: "Tidaling = GOOD (tube is patent). Continuous bubbling = air leak (investigate). Absence of tidaling = tube may be obstructed OR lung has re-expanded (determine which by clinical assessment).",
            guideSection: "Section 5 - Tidaling vs Air Leaks",
            guideSectionId: "tidaling-air-leaks"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a patient with a chest tube for a pneumothorax. The nurse observes continuous bubbling in the water-seal chamber that does not stop when the patient holds their breath. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Clamp the chest tube close to the patient's chest" },
                { id: "b", text: "Check all tubing connections for looseness or disconnection" },
                { id: "c", text: "Notify the health care provider immediately" },
                { id: "d", text: "Replace the entire drainage system" }
            ],
            correct: "b",
            rationale: {
                correct: "Continuous bubbling in the water-seal chamber indicates an air leak somewhere in the system. When the bubbling persists even when the patient holds their breath (which stops air movement from the pleural space), the leak is in the EXTERNAL system - tubing connections, insertion site dressing, or the collection unit. The nurse should systematically check connections from the patient outward to locate and resolve the leak.",
                a: "Clamping a chest tube for a pneumothorax is DANGEROUS. If the air leak is from the patient's lung (bronchopleural fistula), clamping traps air in the pleural space and can cause tension pneumothorax. Clamping should only be done briefly and under specific provider orders.",
                c: "The provider should be notified after the nurse has assessed the system. Many external air leaks can be resolved by tightening connections or reinforcing the dressing. Troubleshoot first, then notify if the leak persists.",
                d: "Replacing the entire system is not the first action. The leak may be a simple loose connection that can be fixed in seconds. Replacing the system also risks exposing the patient to atmospheric air during the changeover."
            },
            testTakingTip: "For chest tube air leaks: (1) Have patient hold breath - if bubbling stops, leak is from the patient (internal). If bubbling continues, leak is in the system (external). (2) For external leaks, trace connections from patient outward. NEVER clamp a pneumothorax chest tube as first action.",
            guideSection: "Section 5 - Tidaling vs Air Leaks",
            guideSectionId: "tidaling-air-leaks"
        },
        {
            id: 3,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Expected Finding", "Report Immediately"],
            stem: "A nurse is performing a systematic assessment of a patient with a chest tube. Classify each assessment finding as an expected finding or one that requires immediate reporting to the provider.",
            options: [
                { id: "a", text: "Drainage output of 250 mL of bright red blood in the last hour" },
                { id: "b", text: "Gentle tidaling in the water-seal chamber" },
                { id: "c", text: "Subcutaneous emphysema (crepitus) spreading from the insertion site to the neck" },
                { id: "d", text: "Serous drainage totaling 150 mL over the last 8-hour shift" },
                { id: "e", text: "Sudden cessation of all drainage with increasing respiratory distress" }
            ],
            correct: { a: "Report Immediately", b: "Expected Finding", c: "Report Immediately", d: "Expected Finding", e: "Report Immediately" },
            rationale: {
                correct: "Tidaling and moderate serous drainage are expected chest tube findings, while excessive bloody output, spreading subcutaneous emphysema, and sudden drainage cessation with respiratory distress all require immediate provider notification.",
                a: "REPORT IMMEDIATELY - More than 100 mL per hour of bloody drainage for 3 hours running, or any sudden increase, may indicate hemorrhage or injury to an intercostal vessel. That rate of blood loss requires urgent evaluation.",
                b: "EXPECTED FINDING - Tidaling is normal and indicates a patent, functioning chest tube. The water level rises during inspiration and falls during expiration, confirming the tube is communicating with the pleural space.",
                c: "REPORT IMMEDIATELY - Subcutaneous emphysema (air trapped under the skin causing a crackling sensation) that is SPREADING suggests a significant air leak or malpositioned tube. Involvement of the neck raises concern for mediastinal air tracking.",
                d: "EXPECTED FINDING - Serous (clear/straw-colored) drainage of 150 mL over 8 hours is a normal finding, especially in the first 24-48 hours after insertion.",
                e: "REPORT IMMEDIATELY - Sudden cessation of all drainage combined with respiratory distress suggests the tube is obstructed (blood clot, kink, or dependent loop). The accumulating fluid or air cannot escape, causing worsening symptoms."
            },
            testTakingTip: "For chest tube drainage, notify for more than 100 mL per hour for 3 hours running, a sudden increase in volume, a change from serous to bloody, or a sudden stop with symptoms. Serous drainage of 100 to 300 mL per shift in the first 24 to 48 hours is typically expected. Tidaling is always a reassuring sign of tube patency.",
            guideSection: "Section 6 - Systematic Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with a chest tube accidentally pulls the tube out of the chest wall while getting out of bed. The nurse sees the tube lying on the bed and the patient is gasping for breath. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Attempt to reinsert the chest tube into the insertion site" },
                { id: "b", text: "Cover the site immediately with a sterile occlusive dressing taped on three sides" },
                { id: "c", text: "Call the health care provider to reinsert the tube" },
                { id: "d", text: "Apply a fully occlusive dressing taped on all four sides" }
            ],
            correct: "b",
            rationale: {
                correct: "An accidental chest tube dislodgement is an emergency. The nurse should immediately cover the site with a sterile occlusive dressing (petroleum gauze or plastic wrap) taped on THREE sides. The open fourth side acts as a flutter valve: it allows trapped air to escape during expiration (preventing tension pneumothorax) while sealing during inspiration (preventing air from entering the pleural space).",
                a: "A nurse should NEVER attempt to reinsert a chest tube. Reinsertion is a sterile surgical procedure performed only by a physician or advanced practice provider under controlled conditions.",
                c: "The provider must be notified, but calling is NOT the first action. The immediate priority is sealing the open chest wound to prevent respiratory compromise. Apply the dressing first, then call.",
                d: "A fully occlusive dressing (taped on all four sides) traps air with no escape route. If the patient has a persistent air leak from the lung, this can rapidly cause tension pneumothorax. The three-sided dressing allows air to escape while preventing entry."
            },
            testTakingTip: "Chest tube dislodgement = three-sided occlusive dressing (flutter valve effect). Chest tube DISCONNECTION from drainage system = submerge the tube end in sterile water (creates a water seal). Know the difference - these are two different emergencies with two different interventions.",
            guideSection: "Section 8 - Complications & Emergencies",
            guideSectionId: "complications"
        },
        {
            id: 5,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing a patient for chest tube removal. Place the following nursing actions in the correct sequence for the chest tube removal process.",
            options: [
                { id: "a", text: "Administer prescribed analgesic and allow time for peak effect" },
                { id: "b", text: "Have petroleum gauze and an occlusive dressing ready at the bedside" },
                { id: "c", text: "Instruct the patient to perform a Valsalva maneuver (bear down) as the provider removes the tube" },
                { id: "d", text: "Apply the occlusive dressing immediately over the insertion site, taped on all four sides" },
                { id: "e", text: "Monitor vital signs, breath sounds, and SpO2; obtain a post-removal chest X-ray" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence ensures pain control first, then preparation of supplies, then airway pressure management during removal, immediate site sealing, and post-procedure assessment.",
                a: "FIRST - Administer analgesics (typically IV morphine or oral opioid) 30 minutes before the procedure to allow peak effect. Chest tube removal is painful, and pre-medication is essential.",
                b: "SECOND - Prepare all supplies (petroleum gauze, sterile gauze, tape) at the bedside BEFORE tube removal begins. Having everything ready prevents delays in sealing the site after the tube is pulled.",
                c: "THIRD - During the actual removal, the patient performs a Valsalva maneuver, which increases intrathoracic pressure and prevents air from being sucked into the pleural space. Note: deep INHALATION is contraindicated as it creates negative pressure that draws air IN.",
                d: "FOURTH - The occlusive dressing must be applied IMMEDIATELY after tube removal to seal the insertion site. Tape on ALL four sides (unlike the three-sided dressing used for accidental dislodgement) because no ongoing air escape is expected.",
                e: "FIFTH - After the site is sealed, assess vital signs, breath sounds (to detect pneumothorax), SpO2, and respiratory effort. A post-removal chest X-ray is typically obtained within 1-2 hours to confirm full lung expansion."
            },
            testTakingTip: "During chest tube removal: Valsalva = increased pressure = air stays OUT. Deep inhalation = negative pressure = air gets sucked IN. Post-removal dressing is taped on ALL FOUR sides (not three) because the tube has been intentionally removed and no air escape is needed.",
            guideSection: "Section 9 - Chest Tube Removal",
            guideSectionId: "removal"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient has a chest tube connected to a water-seal drainage system following a thoracotomy. The nursing assistant asks the nurse why the drainage collection device must always remain below the patient's chest level. Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"Keeping it below the chest prevents the tubing from kinking.\"" },
                { id: "b", text: "\"Gravity helps drain fluid and air from the pleural space, and raising the unit could cause backflow into the chest.\"" },
                { id: "c", text: "\"The device generates suction only when it is lower than the patient.\"" },
                { id: "d", text: "\"It makes it easier for the nurse to measure and record the drainage output.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The drainage system must remain below the chest to maintain the gravity gradient that moves fluid and air from the pleural space into the collection chamber. If raised above chest level, fluid in the tubing could flow backward (retrograde) into the pleural space, potentially causing infection or respiratory compromise.",
                a: "While preventing kinking is important, keeping the system below chest level is primarily about preventing backflow, not preventing kinks. Tubing can kink regardless of position.",
                c: "The water-seal mechanism works independent of height - it prevents atmospheric air from entering the pleural space. Suction (if used) is generated by the suction control chamber connected to a wall suction source, not by gravity.",
                d: "While a lower position may be convenient for measurement, this is not the clinical rationale. Patient safety (preventing backflow) is the reason."
            },
            testTakingTip: "Chest drainage systems ALWAYS below chest level. If the system is accidentally raised, immediately lower it. If it tips over, right it immediately and assess the water-seal chamber - if the water level has changed, the seal may be compromised.",
            guideSection: "Section 4 - Chest Drainage Systems",
            guideSectionId: "drainage-systems"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with a chest tube suddenly develops severe dyspnea, tracheal deviation to the opposite side of the chest tube, absent breath sounds on the affected side, and hypotension. The nurse observes that the chest tube tubing is clamped. What should the nurse suspect, and what is the priority action?",
            options: [
                { id: "a", text: "Hemothorax - increase the suction on the drainage system" },
                { id: "b", text: "Tension pneumothorax - unclamp the chest tube immediately" },
                { id: "c", text: "Pulmonary embolism - position the patient in Trendelenburg" },
                { id: "d", text: "Pneumothorax - prepare for a new chest tube insertion" }
            ],
            correct: "b",
            rationale: {
                correct: "The presentation - acute dyspnea, tracheal deviation AWAY from the affected side, absent breath sounds, and hypotension - is classic tension pneumothorax. The clamped chest tube is the cause: air cannot escape the pleural space, pressure builds up, shifting the mediastinum and compressing the heart and contralateral lung. Unclamping the tube immediately restores the drainage pathway and relieves the pressure.",
                a: "While hemothorax can cause hypotension, it does not cause tracheal deviation or absent breath sounds in this pattern. Additionally, the clamped tube is the identified problem.",
                c: "Pulmonary embolism presents with sudden dyspnea, pleuritic chest pain, tachycardia, and possibly hemoptysis - not tracheal deviation or absent breath sounds. The clamped tube points to a mechanical cause.",
                d: "A new chest tube is not needed - the existing tube just needs to be unclamped. The tube is in place and functional; the clamp is preventing it from working."
            },
            testTakingTip: "Tracheal deviation + absent breath sounds + hypotension = tension pneumothorax until proven otherwise. In a patient with a clamped chest tube, the answer is always UNCLAMP. This is why the rule exists: NEVER clamp a chest tube for a pneumothorax unless specifically ordered.",
            guideSection: "Section 7 - When to Clamp Chest Tubes",
            guideSectionId: "clamping"
        },
        {
            id: 8,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Appropriate", "Inappropriate"],
            stem: "A nurse is caring for a patient with a chest tube to water-seal drainage. The patient needs to ambulate to the bathroom. Classify each nursing action as appropriate or inappropriate during ambulation.",
            options: [
                { id: "a", text: "Clamp the chest tube before the patient stands up" },
                { id: "b", text: "Keep the drainage system below chest level during ambulation" },
                { id: "c", text: "Ensure all tubing connections are secure before moving" },
                { id: "d", text: "Disconnect the chest tube from the drainage system temporarily for easier movement" },
                { id: "e", text: "Monitor the patient for dyspnea, chest pain, or changes in respiratory status during ambulation" }
            ],
            correct: { a: "Inappropriate", b: "Appropriate", c: "Appropriate", d: "Inappropriate", e: "Appropriate" },
            rationale: {
                correct: "During ambulation, the nurse should keep the drainage system below chest level, secure all connections, and monitor respiratory status. Clamping and disconnecting the tube are both dangerous actions that could lead to tension pneumothorax.",
                a: "INAPPROPRIATE - Clamping the chest tube during ambulation is NOT recommended. Clamping prevents air and fluid from draining and can lead to tension pneumothorax if there is an ongoing air leak. The tube should remain open to water seal.",
                b: "APPROPRIATE - The system must remain below the patient's chest to prevent backflow of drainage. The patient or a staff member can carry the unit at a low level, or it can be placed on a mobile IV pole hook at the appropriate height.",
                c: "APPROPRIATE - Before any movement, verify that all connections are tight and secure to prevent accidental disconnection, which would expose the pleural space to atmospheric air.",
                d: "INAPPROPRIATE - The chest tube should NEVER be disconnected from the drainage system during ambulation. Disconnection exposes the pleural space to air and can cause pneumothorax. If disconnection occurs accidentally, the tube end should be submerged in sterile water immediately.",
                e: "APPROPRIATE - The patient should be monitored for any signs of respiratory compromise during and after ambulation, including increased dyspnea, chest pain, decreased SpO2, or changes in drainage."
            },
            testTakingTip: "Two things to NEVER do with a chest tube during ambulation: (1) clamp it, (2) disconnect it. Keep it below chest level, keep connections tight, and monitor the patient. Think: open, low, secure, and watch.",
            guideSection: "Section 6 - Systematic Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient's chest tube drainage system is accidentally knocked over and cracked during a code situation in the next bed. The chest tube is now disconnected from the broken drainage unit and the open end is exposed to air. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Clamp the chest tube at the insertion site" },
                { id: "b", text: "Submerge the open end of the chest tube in a container of sterile water" },
                { id: "c", text: "Cover the open end with a sterile glove and tape it shut" },
                { id: "d", text: "Call for a new drainage system and wait for it to arrive" }
            ],
            correct: "b",
            rationale: {
                correct: "When a chest tube becomes disconnected from the drainage system, the immediate priority is to restore the water seal to prevent air from entering the pleural space. Submerging the open tube end in sterile water (about 2 cm) creates an emergency water seal using the same principle as the drainage system's water-seal chamber.",
                a: "Clamping the chest tube in a pneumothorax patient risks tension pneumothorax. While clamping may be considered briefly in a hemothorax patient, the safer universal action is to establish a water seal.",
                c: "Covering the end with a glove and tape does not create a functional water seal. Air could still be drawn in during inspiration, and there is no mechanism for air to escape during expiration.",
                d: "Waiting without intervening exposes the patient to continuous risk of pneumothorax. A new system should be obtained, but an emergency water seal must be established immediately using whatever sterile water is available."
            },
            testTakingTip: "Chest tube emergencies: Dislodged from chest = three-sided occlusive dressing. Disconnected from drainage system = sterile water seal. Know which intervention matches which emergency - the NCLEX loves to test this distinction.",
            guideSection: "Section 8 - Complications & Emergencies",
            guideSectionId: "complications"
        },
        {
            id: 10,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a patient 2 hours after chest tube insertion for a large pleural effusion. The initial drainage was 400 mL in the first 30 minutes. The nurse now notes the drainage has increased to 250 mL in the last hour, the patient's blood pressure has dropped from 128/78 to 96/62 mmHg, and the heart rate has increased from 78 to 112 bpm. Which action is MOST important?",
            options: [
                { id: "a", text: "Clamp the chest tube to slow the drainage" },
                { id: "b", text: "Notify the provider of the excessive drainage rate and hemodynamic changes" },
                { id: "c", text: "Reposition the patient to the affected side to slow drainage" },
                { id: "d", text: "Increase the IV fluid rate and continue monitoring" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient shows signs of hemorrhage or re-expansion pulmonary edema. The drainage rate is far above the 100 mL per hour reporting threshold, blood pressure is dropping (hypotension), and heart rate is rising (tachycardia - compensatory mechanism). The provider must be notified immediately for possible surgical intervention, blood product transfusion, or autotransfusion. This is beyond nursing-only management.",
                a: "Clamping can cause tension pneumothorax and does not address the underlying bleeding. If the provider orders controlled drainage, they will provide specific instructions.",
                c: "Repositioning to slow drainage does not address the hemodynamic instability. The patient is showing signs of hemorrhagic shock, which requires medical intervention.",
                d: "While IV fluids may be needed, independently increasing the rate without a provider order does not address the source of bleeding and delays definitive treatment. The provider needs to make decisions about blood products, possible re-exploration, or autotransfusion."
            },
            testTakingTip: "Chest tube output above 100 mL per hour for 3 hours running, or any brisk bloody output with hemodynamic instability, means notify the provider immediately. This is a potential surgical emergency. The rapid initial drainage of a large effusion can also cause re-expansion pulmonary edema - another reason for provider notification.",
            guideSection: "Section 6 - Systematic Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks what keeps the lung expanded against the chest wall. Which explanation is correct?",
            options: [
                { id: "a", text: "Negative pressure in the pleural space holds the seal" },
                { id: "b", text: "Positive pressure in the pleural space pushes it open" },
                { id: "c", text: "Cartilage rings hold the lung against the chest wall" },
                { id: "d", text: "Surfactant glues the two pleural membranes together" }
            ],
            correct: "a",
            rationale: {
                correct: "The pleural space holds 10 to 20 mL of serous fluid at a negative pressure of about minus 4 to minus 8 cm of water. Like two sheets of glass with water between them, the seal is what makes the lung follow the chest wall outward on every breath.",
                b: "Positive pressure in that space is exactly what breaks the seal and collapses the lung.",
                c: "Cartilage rings hold the trachea and bronchi open. They do not attach the lung to the chest wall.",
                d: "Surfactant lowers surface tension inside the alveoli, a separate mechanism from the pleural seal."
            },
            testTakingTip: "One idea carries this whole topic. Break the seal and the lung falls away; the chest tube removes whatever broke it.",
            guideSection: "Section 3 - Why the lung stays up",
            guideSectionId: "pleural-space"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "application",
            stem: "A chest tube is being inserted for a pneumothorax. Where should the nurse expect the tube to be placed?",
            options: [
                { id: "a", text: "2nd or 3rd intercostal space, midclavicular line" },
                { id: "b", text: "5th or 6th intercostal space, midaxillary line" },
                { id: "c", text: "8th or 9th intercostal space, posterior axillary" },
                { id: "d", text: "4th or 5th intercostal space, sternal border" }
            ],
            correct: "a",
            rationale: {
                correct: "Air rises, so a tube draining a pneumothorax goes high, at the 2nd or 3rd intercostal space in the midclavicular line. Expect an air leak at first and very little fluid.",
                b: "That is where a tube goes for blood or fluid, because they sink.",
                c: "That position is lower than either standard site.",
                d: "The sternal border is not a standard chest tube insertion site."
            },
            testTakingTip: "Air rises and fluid sinks, so the tube goes where the problem collects. High for air, low for blood.",
            guideSection: "Section 4 - Air or fluid, high or low",
            guideSectionId: "indications"
        },
        {
            id: 13, type: "single", subtype: null, difficulty: "analysis",
            stem: "A tall thin young man develops sudden shortness of breath and pleuritic chest pain with no history of trauma. Which type of pneumothorax is most likely?",
            options: [
                { id: "a", text: "Spontaneous, from a ruptured bleb" },
                { id: "b", text: "Traumatic, from a blunt chest injury" },
                { id: "c", text: "Iatrogenic, following a recent procedure" },
                { id: "d", text: "Tension, with mediastinal shift present" }
            ],
            correct: "a",
            rationale: {
                correct: "A spontaneous pneumothorax occurs with no trauma, and the classic picture is a tall thin young man with a ruptured bleb at the lung apex.",
                b: "Traumatic pneumothorax follows penetrating or blunt chest injury, which this patient has not had.",
                c: "Iatrogenic pneumothorax follows a central line, thoracentesis or biopsy.",
                d: "A tension pneumothorax is an emergency with tracheal deviation and hemodynamic collapse, not this presentation."
            },
            testTakingTip: "The absence of trauma is the clue. Spontaneous is the one that arrives with no explanation at all.",
            guideSection: "Section 4 - Air or fluid, high or low",
            guideSectionId: "indications"
        },
        {
            id: 14, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient with a chest tube has drained 130 mL of bloody fluid per hour for the last 3 hours. What should the nurse do?",
            options: [
                { id: "a", text: "Notify the provider immediately" },
                { id: "b", text: "Document it as an expected finding" },
                { id: "c", text: "Strip the tubing to improve drainage" },
                { id: "d", text: "Clamp the tube and reassess in an hour" }
            ],
            correct: "a",
            rationale: {
                correct: "More than 100 mL per hour of bloody drainage for 3 hours running is the reporting threshold, because it suggests ongoing bleeding that may need surgical intervention. So is a sudden stop in drainage with symptoms.",
                b: "This rate exceeds the threshold and is not an expected finding.",
                c: "Stripping or milking the tubing generates high negative pressure and can damage lung tissue.",
                d: "Clamping a chest tube risks converting a leak into a tension pneumothorax."
            },
            testTakingTip: "Over 100 mL per hour for 3 hours gets reported, and so does no drainage at all when the patient has symptoms.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 15, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient with a tension pneumothorax requires emergency needle decompression. Which site should the nurse prepare?",
            options: [
                { id: "a", text: "2nd intercostal space, midclavicular line" },
                { id: "b", text: "5th intercostal space, midaxillary line" },
                { id: "c", text: "4th intercostal space, at the sternal edge" },
                { id: "d", text: "7th intercostal space, posterior to the scapula" }
            ],
            correct: "a",
            rationale: {
                correct: "Needle decompression for a tension pneumothorax is performed at the 2nd intercostal space in the midclavicular line, because the trapped air under pressure sits high and must be released immediately.",
                b: "That site is used for draining blood or fluid, which collect low.",
                c: "The sternal edge risks the internal mammary vessels and is not the decompression site.",
                d: "A posterior site does not reach the trapped air quickly in an emergency."
            },
            testTakingTip: "Same landmark as the pneumothorax tube: 2nd intercostal space, midclavicular. Air rises, so that is where you go for it.",
            guideSection: "Section 11 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
