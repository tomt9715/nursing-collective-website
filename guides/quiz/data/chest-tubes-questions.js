/**
 * Chest Tubes Quiz — Question Data
 * 10 NCLEX-style questions: 3 Single, 3 SATA, 2 Priority, 2 Analysis
 */

/* exported chestTubesQuizData */
var chestTubesQuizData = {
    guideName: "Chest Tubes",
    guideSlug: "chest-tubes",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient with a chest tube connected to a water-seal drainage system. The nurse observes the water level in the water-seal chamber rising and falling with the patient's respirations. What does this finding indicate?",
            options: [
                { id: "a", text: "There is an air leak in the system that needs to be addressed" },
                { id: "b", text: "The chest tube is functioning properly — this is expected tidaling" },
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
            guideSection: "Section 5 — Tidaling vs Air Leaks",
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
                correct: "Continuous bubbling in the water-seal chamber indicates an air leak somewhere in the system. When the bubbling persists even when the patient holds their breath (which stops air movement from the pleural space), the leak is in the EXTERNAL system — tubing connections, insertion site dressing, or the collection unit. The nurse should systematically check connections from the patient outward to locate and resolve the leak.",
                a: "Clamping a chest tube for a pneumothorax is DANGEROUS. If the air leak is from the patient's lung (bronchopleural fistula), clamping traps air in the pleural space and can cause tension pneumothorax. Clamping should only be done briefly and under specific provider orders.",
                c: "The provider should be notified after the nurse has assessed the system. Many external air leaks can be resolved by tightening connections or reinforcing the dressing. Troubleshoot first, then notify if the leak persists.",
                d: "Replacing the entire system is not the first action. The leak may be a simple loose connection that can be fixed in seconds. Replacing the system also risks exposing the patient to atmospheric air during the changeover."
            },
            testTakingTip: "For chest tube air leaks: (1) Have patient hold breath — if bubbling stops, leak is from the patient (internal). If bubbling continues, leak is in the system (external). (2) For external leaks, trace connections from patient outward. NEVER clamp a pneumothorax chest tube as first action.",
            guideSection: "Section 5 — Tidaling vs Air Leaks",
            guideSectionId: "tidaling-air-leaks"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is performing a systematic assessment of a patient with a chest tube. Which findings should the nurse report to the provider IMMEDIATELY? (Select all that apply.)",
            options: [
                { id: "a", text: "Drainage output of 250 mL of bright red blood in the last hour" },
                { id: "b", text: "Gentle tidaling in the water-seal chamber" },
                { id: "c", text: "Subcutaneous emphysema (crepitus) spreading from the insertion site to the neck" },
                { id: "d", text: "Serous drainage totaling 150 mL over the last 8-hour shift" },
                { id: "e", text: "Sudden cessation of all drainage with increasing respiratory distress" },
                { id: "f", text: "Mild tenderness at the insertion site" }
            ],
            correct: ["a", "c", "e"],
            rationale: {
                correct: "Excessive hemorrhagic drainage, spreading subcutaneous emphysema, and sudden drainage cessation with respiratory distress all require immediate provider notification.",
                a: "REPORT — More than 200 mL/hour of bloody drainage (or a sudden increase) may indicate hemorrhage or injury to an intercostal vessel. This rate of blood loss requires urgent evaluation.",
                b: "EXPECTED — Tidaling is normal and indicates a patent, functioning chest tube. This is a reassuring finding.",
                c: "REPORT — Subcutaneous emphysema (air trapped under the skin causing a crackling sensation) that is SPREADING suggests a significant air leak or malpositioned tube. Involvement of the neck raises concern for mediastinal air tracking.",
                d: "EXPECTED — Serous (clear/straw-colored) drainage of 150 mL over 8 hours is a normal finding, especially in the first 24-48 hours after insertion.",
                e: "REPORT — Sudden cessation of all drainage combined with respiratory distress suggests the tube is obstructed (blood clot, kink, or dependent loop). The accumulating fluid or air cannot escape, causing worsening symptoms.",
                f: "EXPECTED — Mild tenderness at the insertion site is common and expected. The nurse should assess for signs of infection (redness, warmth, purulent drainage) but mild tenderness alone does not require urgent notification."
            },
            testTakingTip: "For chest tube drainage: Notify if >200 mL/hour (hemorrhage), sudden increase in volume, change from serous to bloody, or sudden stop with symptoms. Serous drainage of 100-300 mL/shift in the first 24-48 hours is typically expected.",
            guideSection: "Section 6 — Systematic Assessment",
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
            testTakingTip: "Chest tube dislodgement = three-sided occlusive dressing (flutter valve effect). Chest tube DISCONNECTION from drainage system = submerge the tube end in sterile water (creates a water seal). Know the difference — these are two different emergencies with two different interventions.",
            guideSection: "Section 8 — Complications & Emergencies",
            guideSectionId: "complications"
        },
        {
            id: 5,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing a patient for chest tube removal. The provider has determined the chest tube is ready to be removed based on the chest X-ray and clinical status. Which nursing actions are appropriate during the removal process? (Select all that apply.)",
            options: [
                { id: "a", text: "Administer prescribed analgesic 30 minutes before the procedure" },
                { id: "b", text: "Instruct the patient to perform a Valsalva maneuver during removal" },
                { id: "c", text: "Have petroleum gauze and an occlusive dressing ready at the bedside" },
                { id: "d", text: "Instruct the patient to inhale deeply and hold while the tube is being pulled" },
                { id: "e", text: "Monitor vital signs and breath sounds after removal" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Appropriate nursing actions include pre-medicating for pain, instructing Valsalva maneuver, preparing occlusive dressing materials, and post-removal monitoring.",
                a: "CORRECT — Chest tube removal is painful. Administering analgesics (typically IV morphine or oral opioid) 30 minutes before allows peak effect during the procedure.",
                b: "CORRECT — The Valsalva maneuver (bearing down against a closed glottis) increases intrathoracic pressure, which prevents air from being sucked into the pleural space during the brief moment the tube is removed.",
                c: "CORRECT — An occlusive dressing (petroleum gauze covered with sterile gauze, taped on ALL four sides) must be applied immediately after the tube is pulled. This seals the site since no ongoing air escape is expected post-removal.",
                d: "INCORRECT — Deep inhalation creates NEGATIVE intrathoracic pressure, which would draw air INTO the pleural space through the open insertion site during removal. The correct instruction is to Valsalva or exhale and hold, NOT inhale.",
                e: "CORRECT — Post-removal assessment includes vital signs, breath sounds (to detect pneumothorax), SpO2, respiratory effort, and a post-removal chest X-ray (typically within 1-2 hours) to confirm full lung expansion."
            },
            testTakingTip: "During chest tube removal: Valsalva = increased pressure = air stays OUT. Deep inhalation = negative pressure = air gets sucked IN. This is a classic NCLEX question. Always pick Valsalva or exhale-and-hold.",
            guideSection: "Section 9 — Chest Tube Removal",
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
                c: "The water-seal mechanism works independent of height — it prevents atmospheric air from entering the pleural space. Suction (if used) is generated by the suction control chamber connected to a wall suction source, not by gravity.",
                d: "While a lower position may be convenient for measurement, this is not the clinical rationale. Patient safety (preventing backflow) is the reason."
            },
            testTakingTip: "Chest drainage systems ALWAYS below chest level. If the system is accidentally raised, immediately lower it. If it tips over, right it immediately and assess the water-seal chamber — if the water level has changed, the seal may be compromised.",
            guideSection: "Section 4 — Chest Drainage Systems",
            guideSectionId: "drainage-systems"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with a chest tube suddenly develops severe dyspnea, tracheal deviation to the opposite side of the chest tube, absent breath sounds on the affected side, and hypotension. The nurse observes that the chest tube tubing is clamped. What should the nurse suspect, and what is the priority action?",
            options: [
                { id: "a", text: "Hemothorax — increase the suction on the drainage system" },
                { id: "b", text: "Tension pneumothorax — unclamp the chest tube immediately" },
                { id: "c", text: "Pulmonary embolism — position the patient in Trendelenburg" },
                { id: "d", text: "Pneumothorax — prepare for a new chest tube insertion" }
            ],
            correct: "b",
            rationale: {
                correct: "The presentation — acute dyspnea, tracheal deviation AWAY from the affected side, absent breath sounds, and hypotension — is classic tension pneumothorax. The clamped chest tube is the cause: air cannot escape the pleural space, pressure builds up, shifting the mediastinum and compressing the heart and contralateral lung. Unclamping the tube immediately restores the drainage pathway and relieves the pressure.",
                a: "While hemothorax can cause hypotension, it does not cause tracheal deviation or absent breath sounds in this pattern. Additionally, the clamped tube is the identified problem.",
                c: "Pulmonary embolism presents with sudden dyspnea, pleuritic chest pain, tachycardia, and possibly hemoptysis — not tracheal deviation or absent breath sounds. The clamped tube points to a mechanical cause.",
                d: "A new chest tube is not needed — the existing tube just needs to be unclamped. The tube is in place and functional; the clamp is preventing it from working."
            },
            testTakingTip: "Tracheal deviation + absent breath sounds + hypotension = tension pneumothorax until proven otherwise. In a patient with a clamped chest tube, the answer is always UNCLAMP. This is why the rule exists: NEVER clamp a chest tube for a pneumothorax unless specifically ordered.",
            guideSection: "Section 7 — When to Clamp Chest Tubes",
            guideSectionId: "clamping"
        },
        {
            id: 8,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient with a chest tube to water-seal drainage. The patient needs to ambulate to the bathroom. Which actions by the nurse are appropriate? (Select all that apply.)",
            options: [
                { id: "a", text: "Clamp the chest tube before the patient stands up" },
                { id: "b", text: "Keep the drainage system below chest level during ambulation" },
                { id: "c", text: "Ensure all tubing connections are secure before moving" },
                { id: "d", text: "Disconnect the chest tube from the drainage system temporarily for easier movement" },
                { id: "e", text: "Monitor the patient for dyspnea, chest pain, or changes in respiratory status during ambulation" }
            ],
            correct: ["b", "c", "e"],
            rationale: {
                correct: "During ambulation, the nurse should keep the drainage system below chest level, secure all connections, and monitor the patient's respiratory status throughout.",
                a: "INCORRECT — Clamping the chest tube during ambulation is NOT recommended. Clamping prevents air and fluid from draining and can lead to tension pneumothorax if there is an ongoing air leak. The tube should remain open to water seal.",
                b: "CORRECT — The system must remain below the patient's chest to prevent backflow of drainage. The patient or a staff member can carry the unit at a low level, or it can be placed on a mobile IV pole hook at the appropriate height.",
                c: "CORRECT — Before any movement, verify that all connections are tight and secure to prevent accidental disconnection, which would expose the pleural space to atmospheric air.",
                d: "INCORRECT — The chest tube should NEVER be disconnected from the drainage system during ambulation. Disconnection exposes the pleural space to air and can cause pneumothorax. If disconnection occurs accidentally, the tube end should be submerged in sterile water immediately.",
                e: "CORRECT — The patient should be monitored for any signs of respiratory compromise during and after ambulation, including increased dyspnea, chest pain, decreased SpO2, or changes in drainage."
            },
            testTakingTip: "Two things to NEVER do with a chest tube during ambulation: (1) clamp it, (2) disconnect it. Keep it below chest level, keep connections tight, and monitor the patient. Think: open, low, secure, and watch.",
            guideSection: "Section 6 — Systematic Assessment",
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
            testTakingTip: "Chest tube emergencies: Dislodged from chest = three-sided occlusive dressing. Disconnected from drainage system = sterile water seal. Know which intervention matches which emergency — the NCLEX loves to test this distinction.",
            guideSection: "Section 8 — Complications & Emergencies",
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
                correct: "This patient shows signs of hemorrhage or re-expansion pulmonary edema. The drainage rate exceeds 200 mL/hour, blood pressure is dropping (hypotension), and heart rate is rising (tachycardia — compensatory mechanism). The provider must be notified immediately for possible surgical intervention, blood product transfusion, or autotransfusion. This is beyond nursing-only management.",
                a: "Clamping can cause tension pneumothorax and does not address the underlying bleeding. If the provider orders controlled drainage, they will provide specific instructions.",
                c: "Repositioning to slow drainage does not address the hemodynamic instability. The patient is showing signs of hemorrhagic shock, which requires medical intervention.",
                d: "While IV fluids may be needed, independently increasing the rate without a provider order does not address the source of bleeding and delays definitive treatment. The provider needs to make decisions about blood products, possible re-exploration, or autotransfusion."
            },
            testTakingTip: "Chest tube output >200 mL/hour + hemodynamic instability = notify provider STAT. This is a potential surgical emergency. The rapid initial drainage of a large effusion can also cause re-expansion pulmonary edema — another reason for provider notification.",
            guideSection: "Section 6 — Systematic Assessment",
            guideSectionId: "assessment"
        }
    ]
};
