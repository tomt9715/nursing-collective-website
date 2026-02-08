/**
 * Quiz Bank — Chest Tubes
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "ct-qb-001",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing the three-chamber chest drainage system with a nursing student. The student asks about the purpose of the suction control chamber. Which explanation is most accurate?",
        options: [
            { id: "a", text: "The suction control chamber collects the drainage from the pleural space." },
            { id: "b", text: "The suction control chamber regulates the maximum amount of negative pressure applied to the pleural space, preventing lung damage from excessive suction." },
            { id: "c", text: "The suction control chamber serves as a one-way valve to prevent air from entering the pleural space." },
            { id: "d", text: "The suction control chamber measures the patient's respiratory rate and tidal volume." }
        ],
        correct: "b",
        rationale: {
            correct: "The three-chamber system includes: (1) Collection chamber — collects drainage from the pleural space. (2) Water-seal chamber — acts as a one-way valve allowing air/fluid out but preventing backflow into the pleural space. (3) Suction control chamber — regulates the maximum negative pressure applied, typically set at -20 cm H2O. In wet suction systems, the water level determines the suction; in dry suction systems, a dial or regulator controls it. This prevents excessive negative pressure from damaging the lung."
        },
        testTakingTip: "Three chambers: collection (drainage), water seal (one-way valve), suction control (pressure regulator). Know the purpose of each. The water-seal chamber is the most critical — it prevents air from re-entering the chest.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "equipment"
    },

    {
        id: "ct-qb-002",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "application",
        stem: "A nurse is caring for a patient 4 hours after chest tube insertion for a right-sided pneumothorax. The nurse notes that tidaling (fluctuation) in the water-seal chamber has suddenly stopped. The patient's SpO2 is 96% and breath sounds are equal bilaterally. What is the most likely explanation?",
        options: [
            { id: "a", text: "The lung has re-expanded and the pneumothorax has resolved." },
            { id: "b", text: "The chest tube is obstructed by a kink, clot, or dependent loop in the tubing." },
            { id: "c", text: "The suction is set too high, causing the tidaling to disappear." },
            { id: "d", text: "The patient's respiratory rate has decreased below normal." }
        ],
        correct: "a",
        rationale: {
            correct: "Tidaling (water level rising with inspiration and falling with expiration) indicates the chest tube is communicating with the pleural space. When tidaling stops AND the patient has good breath sounds, equal chest expansion, and stable SpO2, it usually means the lung has fully re-expanded and the pneumothorax has resolved — the pleural space is now sealed. However, absent tidaling can ALSO indicate tube obstruction (kink, clot) — the nurse must assess the patient clinically and check the tubing. In this case, the good clinical picture supports resolution."
        },
        testTakingTip: "Tidaling stops: two possibilities — (1) lung re-expanded (good sign: good breath sounds, stable vitals) or (2) tube obstructed (bad sign: worsening symptoms). Always assess the patient, not just the drainage system.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "ct-qb-003",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with a chest tube for a hemothorax has drained 250 mL of sanguineous fluid in the first hour after insertion. Over the second hour, the drainage increases to 300 mL and the color remains bright red. The patient's heart rate is rising from 88 to 118 bpm and blood pressure is dropping from 130/82 to 98/60 mmHg. The nurse should:",
        options: [
            { id: "a", text: "Document the drainage amount and continue monitoring every hour." },
            { id: "b", text: "Clamp the chest tube to slow the blood loss." },
            { id: "c", text: "Immediately notify the provider — this output pattern with hemodynamic instability suggests active hemorrhage that may require surgical intervention." },
            { id: "d", text: "Milk the chest tube to ensure the drainage is flowing freely." }
        ],
        correct: "c",
        rationale: {
            correct: "Chest tube drainage exceeding 200 mL/hour for 2-4 consecutive hours (or >1,500 mL total in 24 hours), especially when bright red and accompanied by hemodynamic instability (rising HR, falling BP), strongly suggests active intrathoracic hemorrhage requiring urgent surgical exploration (thoracotomy). Clamping a hemothorax tube traps blood in the pleural space, worsening the situation. Milking/stripping is controversial and may generate dangerous negative pressures. The priority is immediate provider notification."
        },
        testTakingTip: "Chest tube hemorrhage threshold: >200 mL/hr for 2-4 hrs or >1,500 mL/24 hrs + hemodynamic instability = notify immediately, likely needs surgery. NEVER clamp a tube draining blood — it traps the hemorrhage inside.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "complications"
    },

    {
        id: "ct-qb-004",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse notices a dependent loop of tubing hanging below the level of the drainage collection device in a patient's chest tube system. Why is this a concern?",
        options: [
            { id: "a", text: "Dependent loops increase suction pressure and can damage the lung." },
            { id: "b", text: "Fluid collects in the loop, creating a column of fluid that impedes drainage and can act as an obstruction to air and fluid evacuation." },
            { id: "c", text: "Dependent loops allow air to enter the pleural space through the tubing." },
            { id: "d", text: "Dependent loops are normal and do not require any intervention." }
        ],
        correct: "b",
        rationale: {
            correct: "Dependent loops (tubing hanging below the drainage device) allow fluid to pool in the lowest point of the tubing, creating a 'fluid trap.' This trapped fluid creates back-pressure that impedes drainage from the pleural space and can obstruct the tube. The nurse should ensure the tubing runs in a straight, gently descending path from the patient to the drainage device. Excess tubing should be coiled on the bed, not hanging in loops below the collection system."
        },
        testTakingTip: "Dependent loops = fluid trap = obstructed drainage. Prevent by: coiling excess tubing on the bed (not below the device), ensuring a smooth downhill path from patient to collection device, and regularly checking tubing position.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "ct-qb-005",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "application",
        stem: "A patient with a chest tube asks the nurse why there is bubbling in one of the chambers. The nurse observes gentle, intermittent bubbling in the suction control chamber (wet suction system). Which response is most accurate?",
        options: [
            { id: "a", text: "That bubbling means there is an air leak in your chest, and we need to notify the doctor immediately." },
            { id: "b", text: "Gentle, continuous bubbling in the suction control chamber is normal — it confirms that the suction is working at the prescribed level. If that bubbling stopped, it would mean suction is disconnected." },
            { id: "c", text: "The bubbling means your chest tube is blocked and needs to be replaced." },
            { id: "d", text: "The bubbling is caused by drainage flowing through the system too quickly." }
        ],
        correct: "b",
        rationale: {
            correct: "In wet suction systems, gentle continuous bubbling in the SUCTION CONTROL chamber is normal and expected — it confirms the prescribed suction level is being maintained. The water level in this chamber determines the suction pressure (typically -20 cm H2O). If suction control bubbling stops, the wall suction may be disconnected or the water level is too low. This is different from bubbling in the WATER-SEAL chamber, which indicates an air leak if continuous. Location of bubbling matters!"
        },
        testTakingTip: "Where is the bubbling? Suction control chamber: gentle bubbling = normal (suction working). Water-seal chamber: intermittent with respiration = normal, continuous = air leak. Location determines interpretation!",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "ct-qb-006",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse observes continuous bubbling in the water-seal chamber of a patient's chest tube system. To locate the source of the air leak, the nurse systematically clamps the tubing at different points starting closest to the patient and moving toward the drainage system. When the nurse clamps near the patient's chest wall insertion site, the bubbling stops. This finding indicates:",
        options: [
            { id: "a", text: "The air leak is in the drainage collection system and it needs to be replaced." },
            { id: "b", text: "The air leak is at or near the chest tube insertion site — the nurse should check the dressing and occlusive seal, and notify the provider." },
            { id: "c", text: "The air leak is in the tubing between the clamp point and the drainage system." },
            { id: "d", text: "The patient's lung has collapsed and the tube needs to be repositioned." }
        ],
        correct: "b",
        rationale: {
            correct: "Systematic clamping localizes air leaks: when clamping at a specific point stops the bubbling, the leak is between that clamp and the patient. Since the nurse clamped near the insertion site and the bubbling stopped, the leak is at or near the insertion site — possibly a dressing seal failure, tube displacement, or a persistent pleural air leak. The nurse should inspect the dressing, reinforce the occlusive seal, and notify the provider. Important: never leave a chest tube clamped for an extended period."
        },
        testTakingTip: "Air leak localization: clamp progressively from patient toward the drainage device. When bubbling stops, the leak is between that clamp and the patient. If bubbling persists at every clamp point, the leak is in the drainage system itself.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "troubleshooting"
    },

    {
        id: "ct-qb-007",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "application",
        stem: "A patient with a chest tube connected to water-seal drainage is being prepared for transfer to the radiology department for a CT scan. Which instruction is correct for transporting the patient?",
        options: [
            { id: "a", text: "Clamp the chest tube during transport to prevent air from entering the system." },
            { id: "b", text: "Disconnect the tubing from the drainage system and cap the end for easier mobility." },
            { id: "c", text: "Keep the drainage system upright and below the patient's chest level at all times during transport. Do not clamp unless specifically ordered." },
            { id: "d", text: "Place the drainage system on the patient's bed beside them for convenience." }
        ],
        correct: "c",
        rationale: {
            correct: "During transport: the drainage system must remain upright (to maintain the water seal) and below the chest level (to prevent backflow into the pleural space using gravity). Never clamp a chest tube during transport — if the patient has an ongoing air leak, clamping can cause a tension pneumothorax. Never disconnect the tubing from the drainage system — this breaks the closed system and allows air entry. The system can be secured to the foot of the bed or wheelchair, below chest level."
        },
        testTakingTip: "Chest tube transport: upright, below chest level, never clamp (unless specifically ordered for brief water-seal trial), never disconnect. These three rules apply to all patient movement — ambulation, chair, transport.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "ct-qb-008",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is assessing a patient's chest tube drainage. The drainage has changed from sanguineous (bloody red) to serosanguineous (pink-tinged) over the past 12 hours, and the volume has decreased from 150 mL/hr to 30 mL/hr. How should the nurse interpret this change?",
        options: [
            { id: "a", text: "The patient is developing an infection and the drainage color change indicates pus." },
            { id: "b", text: "This is an expected, positive progression — the drainage is transitioning from active bleeding to healing, with decreasing volume indicating resolution." },
            { id: "c", text: "The chest tube is becoming obstructed and the drainage should be increasing, not decreasing." },
            { id: "d", text: "The drainage system is malfunctioning and needs to be replaced immediately." }
        ],
        correct: "b",
        rationale: {
            correct: "Normal drainage progression: sanguineous (bloody) → serosanguineous (pink-tinged) → serous (clear yellow) over hours to days. Simultaneously decreasing volume is a positive sign indicating that active bleeding has slowed and the pleural space is healing. Infectious drainage would be purulent (cloudy, thick, foul-smelling) or empyema (frank pus). An obstruction would more likely present with sudden cessation rather than gradual decrease with color change."
        },
        testTakingTip: "Normal drainage progression: bloody → pink → clear. Decreasing volume = good. Report: sudden increase in volume, return to bright red, purulent drainage, or sudden cessation (possible clot obstruction).",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "ct-qb-009",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "analysis",
        stem: "A patient is on day 3 post-thoracotomy with a chest tube. The drainage has been minimal (<50 mL/day), the air leak has resolved (no bubbling in water-seal for 24 hours), and the morning chest X-ray shows full lung expansion. The provider orders the chest tube to be placed on water seal (suction discontinued) as a trial before removal. After 4 hours on water seal, the patient develops mild dyspnea and the SpO2 drops from 97% to 92%. What should the nurse do?",
        options: [
            { id: "a", text: "This is expected after removing suction — continue monitoring and wait for the next scheduled chest X-ray." },
            { id: "b", text: "Reconnect the suction, obtain a STAT portable chest X-ray, and notify the provider — the patient may have a recurrent pneumothorax." },
            { id: "c", text: "Remove the chest tube since it has been on water seal for 4 hours." },
            { id: "d", text: "Increase the suction above the previously prescribed level to compensate." }
        ],
        correct: "b",
        rationale: {
            correct: "A water-seal trial tests whether the patient can maintain lung expansion without suction. If the patient develops dyspnea and desaturation during the trial, it suggests the lung may be re-collapsing (recurrent pneumothorax). The nurse should reconnect suction (restoring the previous support), obtain a STAT chest X-ray (to confirm or rule out pneumothorax), and notify the provider. This patient is not ready for tube removal. Never increase suction above the prescribed level without an order."
        },
        testTakingTip: "Water-seal trial: if the patient tolerates it (stable SpO2, no dyspnea, CXR shows maintained expansion) → ready for removal. If symptoms develop → reconnect suction + STAT CXR + notify provider. Failed trial = not ready.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "removal"
    },

    {
        id: "ct-qb-010",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "application",
        stem: "A nurse is documenting the assessment of a patient's chest tube system. Which documentation elements should be included?",
        options: [
            { id: "a", text: "Only the total drainage volume at the end of each shift." },
            { id: "b", text: "Drainage amount, color, and consistency; presence/absence of tidaling; presence/absence of air leak (bubbling in water-seal); suction level; insertion site condition; patient's respiratory status." },
            { id: "c", text: "Only whether the drainage system is intact and functioning." },
            { id: "d", text: "The chest tube brand name and the date it was manufactured." }
        ],
        correct: "b",
        rationale: {
            correct: "Comprehensive chest tube documentation includes: drainage (amount — mark the level and time on the collection chamber, color, consistency), water-seal assessment (tidaling present/absent, bubbling present/absent), suction level, tubing condition (no kinks, no dependent loops), insertion site (dressing integrity, subcutaneous emphysema, erythema, drainage at site), and the patient's respiratory assessment (breath sounds, SpO2, RR, work of breathing, pain level). This creates a baseline for identifying changes."
        },
        testTakingTip: "Chest tube documentation: DATTS — Drainage (amount, color), Air leak (water-seal bubbling), Tidaling, Tubing (kinks/loops), Site (dressing/skin). Plus patient respiratory status. Document at least every shift and with any change.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "ct-qb-011",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing chest tube placement locations. For a patient with a large pleural effusion (fluid collection), where is the chest tube typically inserted?",
        options: [
            { id: "a", text: "2nd intercostal space, midclavicular line — the same location used for pneumothorax" },
            { id: "b", text: "5th-6th intercostal space, midaxillary line — a lower, lateral position to drain dependent fluid" },
            { id: "c", text: "Subxiphoid space, below the sternum" },
            { id: "d", text: "The chest tube is inserted through the back for pleural effusions" }
        ],
        correct: "b",
        rationale: {
            correct: "Chest tube placement depends on what is being drained. For pleural effusions (fluid), the tube is placed in the 5th-6th intercostal space at the midaxillary line — a low, lateral position where fluid naturally collects by gravity. For pneumothorax (air), the tube is typically placed in the 2nd intercostal space at the midclavicular line (or 4th-5th ICS midaxillary) because air rises to the apex. The 'safe triangle' (bordered by the anterior border of latissimus dorsi, lateral border of pectoralis major, and a line superior to the horizontal level of the nipple) is the preferred insertion area."
        },
        testTakingTip: "Pneumothorax = upper/anterior (air rises). Pleural effusion/hemothorax = lower/lateral (fluid falls). The safe triangle is the standard insertion landmark. Know the anatomic rationale for tube placement.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "equipment"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "ct-qb-012",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "ordering",
        difficulty: "application",
        stem: "A patient's chest tube becomes accidentally dislodged from the chest wall. The patient immediately becomes dyspneic. Place the nurse's emergency actions in the correct order.",
        options: [
            { id: "s1", text: "Immediately cover the insertion site with a sterile occlusive (petroleum gauze) dressing taped on THREE sides" },
            { id: "s2", text: "Apply supplemental oxygen and position the patient in semi-Fowler's position" },
            { id: "s3", text: "Assess the patient's respiratory status: breath sounds, SpO2, respiratory rate, and signs of tension pneumothorax" },
            { id: "s4", text: "Call the provider immediately for emergent chest tube reinsertion" },
            { id: "s5", text: "Monitor for signs of tension pneumothorax (tracheal deviation, JVD, hypotension, absent breath sounds on the affected side)" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Immediate coverage prevents air from entering the pleural space through the open wound. THREE-sided taping creates a flutter valve: sealed on inspiration (prevents air entry), open on expiration (allows trapped air to escape). Four-sided taping could cause tension pneumothorax.",
            s2: "Supplemental oxygen and upright positioning support oxygenation while the situation is being managed.",
            s3: "Rapid assessment determines severity: is the patient developing tension pneumothorax or is the dressing maintaining a seal?",
            s4: "The provider must be notified for emergent reinsertion. A dislodged chest tube is a medical emergency requiring immediate intervention.",
            s5: "Ongoing monitoring is critical — tension pneumothorax can develop rapidly. Signs: tracheal deviation toward the unaffected side, JVD, hypotension, and absent breath sounds on the affected side."
        },
        testTakingTip: "Dislodged chest tube: cover with petroleum gauze taped on 3 sides → O2 and position → assess → call provider → monitor for tension pneumothorax. THREE-sided taping = flutter valve. This is one of the most tested chest tube emergencies.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "emergencies"
    },

    {
        id: "ct-qb-013",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A provider is preparing to remove a patient's chest tube. Place the steps of the chest tube removal process in the correct order.",
        options: [
            { id: "s1", text: "Premedicate the patient with an analgesic (30 minutes before removal) as ordered" },
            { id: "s2", text: "Instruct the patient to take a deep breath and perform a Valsalva maneuver (bear down) or exhale at the moment of removal" },
            { id: "s3", text: "The provider swiftly removes the tube while the patient holds their breath or performs Valsalva" },
            { id: "s4", text: "Immediately apply a sterile, airtight occlusive dressing (petroleum gauze covered with gauze and tape) over the site" },
            { id: "s5", text: "Obtain a post-removal chest X-ray within 1-2 hours to confirm continued lung expansion and monitor the patient for recurrent pneumothorax" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Pain management before removal improves patient cooperation and reduces splinting. IV or oral analgesics should peak at the time of removal.",
            s2: "Valsalva or end-inspiration increases intrathoracic pressure, which prevents air from entering the pleural space during removal. The patient must understand and practice this beforehand.",
            s3: "Swift removal while the patient is performing Valsalva minimizes the time the tract is open to atmospheric pressure.",
            s4: "The occlusive dressing seals the insertion site immediately after removal. Petroleum gauze prevents air entry through the chest wall tract.",
            s5: "Post-removal CXR confirms the lung remains expanded. The patient should be monitored for 24 hours for signs of recurrent pneumothorax (dyspnea, decreased breath sounds, dropping SpO2)."
        },
        testTakingTip: "Chest tube removal: premedicate → Valsalva/deep breath → swift removal → occlusive dressing immediately → post-removal CXR. The Valsalva maneuver timing is the key patient instruction — it prevents air entry during removal.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "removal"
    },

    {
        id: "ct-qb-014",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with a chest tube suddenly develops severe respiratory distress with tracheal deviation to the left, distended neck veins, absent breath sounds on the right, and rapidly falling blood pressure. The nurse suspects tension pneumothorax. Place the emergency interventions in priority order.",
        options: [
            { id: "s1", text: "Check the chest tube system — look for kinks, clamps, or disconnection that may be preventing air evacuation" },
            { id: "s2", text: "Call for immediate help (rapid response/code team) and notify the provider urgently" },
            { id: "s3", text: "If the existing chest tube is non-functional, prepare for emergent needle decompression (14-gauge needle at 2nd ICS, midclavicular line) or new chest tube insertion" },
            { id: "s4", text: "Administer high-flow oxygen and position the patient upright" },
            { id: "s5", text: "Document the event, time of interventions, and patient response" }
        ],
        correct: ["s1", "s2", "s4", "s3", "s5"],
        rationale: {
            s1: "The patient already has a chest tube — the first action is to check WHY it isn't working. A kinked or clamped tube is an immediately fixable cause of tension pneumothorax. Unclamping or straightening may resolve the emergency instantly.",
            s2: "If the tube check doesn't resolve the issue, this is a life-threatening emergency requiring the team and provider for definitive intervention.",
            s4: "High-flow O2 and positioning support the patient while awaiting definitive treatment.",
            s3: "If the existing tube is non-functional and cannot be fixed, needle decompression provides immediate relief by allowing trapped air to escape. A new chest tube may then be placed.",
            s5: "Thorough documentation of the emergency and all interventions is essential for the medical record."
        },
        testTakingTip: "Tension pneumothorax with existing chest tube: first check the tube system for fixable problems (clamp, kink, disconnection) → call for help → O2 → prepare for needle decompression/new tube. A clamped tube is the most common iatrogenic cause.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "emergencies"
    },

    {
        id: "ct-qb-015",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is admitting a patient who has just had a chest tube inserted in the ED for a pneumothorax. Place the initial assessment actions in the correct priority order.",
        options: [
            { id: "s1", text: "Verify the chest tube is connected to a functioning drainage system with the prescribed suction level" },
            { id: "s2", text: "Assess the patient's respiratory status: breath sounds, SpO2, respiratory rate, and work of breathing" },
            { id: "s3", text: "Check the insertion site dressing for integrity, occlusion, and any subcutaneous emphysema" },
            { id: "s4", text: "Assess the water-seal chamber for tidaling and presence/absence of air leak" },
            { id: "s5", text: "Mark the initial drainage level on the collection chamber with the time and date" }
        ],
        correct: ["s2", "s1", "s3", "s4", "s5"],
        rationale: {
            s2: "Patient assessment is always first priority. Breath sounds, SpO2, and work of breathing tell you if the chest tube is doing its job.",
            s1: "Verify the system is intact and functioning: all connections tight, suction at the prescribed level, drainage system upright and below chest level.",
            s3: "The insertion site should have an occlusive dressing with no air leaks. Palpate around the site for subcutaneous emphysema (crepitus).",
            s4: "Water-seal assessment: tidaling confirms the tube is patent and communicating with the pleural space. Air leak assessment (bubbling) helps establish baseline.",
            s5: "Marking the initial drainage level establishes a baseline for tracking output. Include time, date, and amount."
        },
        testTakingTip: "New chest tube assessment priority: patient first (breathing), then system (connections, suction), then site (dressing, crepitus), then water seal (tidaling, air leak), then drainage (baseline marking). Always: patient before equipment.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "ct-qb-016",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient's chest tube becomes disconnected from the drainage system when the patient turns in bed. The open end of the chest tube is now exposed to air. Place the nurse's emergency actions in the correct order.",
        options: [
            { id: "s1", text: "Immediately submerge the end of the chest tube in a container of sterile water (or saline) to re-establish a temporary water seal" },
            { id: "s2", text: "Assess the patient for signs of pneumothorax: dyspnea, decreased breath sounds, dropping SpO2" },
            { id: "s3", text: "Do NOT clamp the tube — clamping with an air leak can cause tension pneumothorax" },
            { id: "s4", text: "Reconnect to the drainage system (if intact) or set up a new sterile drainage system" },
            { id: "s5", text: "Notify the provider and obtain a STAT chest X-ray to assess for pneumothorax" }
        ],
        correct: ["s1", "s3", "s2", "s4", "s5"],
        rationale: {
            s1: "Immediate water seal with sterile water prevents air from entering the pleural space through the open tube. This is the emergency first action for disconnection.",
            s3: "Critical safety step: do NOT clamp. If the patient has an air leak, clamping traps air in the pleural space and can cause life-threatening tension pneumothorax.",
            s2: "After establishing a temporary water seal, assess the patient for any respiratory compromise that may have occurred during the disconnection.",
            s4: "Once the patient is stable, reconnect to the original system (if the connection site is clean and intact) or set up a new sterile system.",
            s5: "Provider notification and chest X-ray ensure no pneumothorax developed during the disconnection period."
        },
        testTakingTip: "Chest tube disconnected: submerge in sterile water → do NOT clamp → assess patient → reconnect or new system → notify provider + CXR. The bottle of sterile water should always be at the bedside of every chest tube patient.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "emergencies"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "ct-qb-017",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each finding in the chest tube drainage system, indicate whether it is a normal/expected finding or one that requires immediate notification of the provider.",
        columns: ["Normal/Expected", "Notify Provider Immediately"],
        rows: [
            { id: "r1", text: "Water level in the water-seal chamber rises and falls with respiration (tidaling)", correct: "Normal/Expected" },
            { id: "r2", text: "Sudden cessation of all drainage output with increasing patient dyspnea", correct: "Notify Provider Immediately" },
            { id: "r3", text: "Gentle, continuous bubbling in the suction control chamber of a wet suction system", correct: "Normal/Expected" },
            { id: "r4", text: "New continuous bubbling in the water-seal chamber that was not present before", correct: "Notify Provider Immediately" },
            { id: "r5", text: "Serosanguineous drainage of 50 mL over 8 hours, 2 days after chest tube insertion", correct: "Normal/Expected" },
            { id: "r6", text: "Bright red drainage of 250 mL/hr for 3 consecutive hours with falling blood pressure", correct: "Notify Provider Immediately" }
        ],
        rationale: {
            correct: "Normal findings: tidaling (confirms tube patency), suction control bubbling (confirms suction is working), and moderate serosanguineous drainage that is decreasing over time. Report immediately: sudden drainage cessation with symptoms (possible obstruction), new air leak in water seal (possible tube displacement or pleural leak), and excessive bright red drainage with hemodynamic changes (hemorrhage requiring possible surgical intervention)."
        },
        testTakingTip: "Normal: tidaling, suction chamber bubbling, decreasing serosanguineous drainage. Report: sudden cessation + symptoms, new water-seal bubbling, excessive bloody drainage + vitals changes. Context matters — any finding plus deteriorating patient status warrants notification.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "ct-qb-018",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "matrix",
        difficulty: "application",
        stem: "For each clinical scenario, indicate whether the patient's chest tube indication is pneumothorax or hemothorax/pleural effusion, and the expected drainage type.",
        columns: ["Pneumothorax (Air)", "Hemothorax / Pleural Effusion (Fluid)"],
        rows: [
            { id: "r1", text: "Patient with a stab wound to the chest; 400 mL of bright red blood drains immediately upon insertion", correct: "Hemothorax / Pleural Effusion (Fluid)" },
            { id: "r2", text: "Patient with a spontaneous tall, thin habitus; chest X-ray shows collapsed right lung apex; minimal fluid drainage but active air leak", correct: "Pneumothorax (Air)" },
            { id: "r3", text: "Post-thoracotomy patient with large volume serosanguineous drainage over the first 24 hours", correct: "Hemothorax / Pleural Effusion (Fluid)" },
            { id: "r4", text: "Patient in a motor vehicle collision; chest X-ray shows right lung 70% collapsed with no mediastinal shift; tube evacuates air, no significant fluid", correct: "Pneumothorax (Air)" },
            { id: "r5", text: "Empyema patient; thick, purulent fluid drains upon insertion with foul odor", correct: "Hemothorax / Pleural Effusion (Fluid)" }
        ],
        rationale: {
            correct: "Pneumothorax: air in the pleural space causes lung collapse. Drainage is primarily air (active bubbling in water seal), with minimal fluid. Common in tall, thin individuals (spontaneous), trauma, and barotrauma. Hemothorax/effusion: fluid (blood, serous fluid, pus) in the pleural space. Drainage is liquid — bloody (hemothorax), serosanguineous (post-surgical), or purulent (empyema). The type of drainage determines the monitoring focus."
        },
        testTakingTip: "Pneumothorax = air (watch the water-seal chamber for air leak). Hemothorax = blood/fluid (watch the collection chamber for volume and color). Empyema = infection/pus (monitor drainage character + patient for sepsis). Different focus for each.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "indications"
    },

    {
        id: "ct-qb-019",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each nursing action related to chest tube care, indicate whether it is appropriate (correct practice) or inappropriate (should be avoided).",
        columns: ["Appropriate", "Inappropriate"],
        rows: [
            { id: "r1", text: "Keeping the drainage system upright and below the patient's chest level at all times", correct: "Appropriate" },
            { id: "r2", text: "Routinely clamping the chest tube when the patient ambulates to prevent air entry", correct: "Inappropriate" },
            { id: "r3", text: "Ensuring all tubing connections are taped and secured to prevent accidental disconnection", correct: "Appropriate" },
            { id: "r4", text: "Vigorously stripping or milking the chest tube every 2 hours to keep it patent", correct: "Inappropriate" },
            { id: "r5", text: "Encouraging the patient to deep breathe, cough, and use incentive spirometry", correct: "Appropriate" },
            { id: "r6", text: "Raising the drainage collection system above the patient's chest to increase drainage speed", correct: "Inappropriate" }
        ],
        rationale: {
            correct: "Appropriate: keeping the system below chest level (gravity drainage), securing connections (prevents disconnection), and encouraging deep breathing (promotes lung expansion and drainage). Inappropriate: routine clamping (risk of tension pneumothorax if air leak is present), vigorous stripping/milking (generates dangerously high negative pressures — up to -400 cm H2O — that can damage the lung), and raising the system above the patient (allows backflow of drainage into the pleural space)."
        },
        testTakingTip: "Chest tube DO's: keep below chest, secure connections, encourage deep breathing, assess regularly. DON'Ts: routine clamping, vigorous stripping, raising above chest. Stripping is controversial — most evidence advises against it due to dangerous negative pressures.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "ct-qb-020",
        category: "respiratory",
        topic: "chest-tubes",
        topicLabel: "Chest Tubes",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is caring for a patient 6 hours after chest tube removal. For each assessment finding, indicate whether it is expected after removal or requires immediate intervention.",
        columns: ["Expected After Removal", "Requires Immediate Intervention"],
        rows: [
            { id: "r1", text: "Mild pain at the insertion site controlled with oral analgesics", correct: "Expected After Removal" },
            { id: "r2", text: "Small amount of serous drainage on the occlusive dressing", correct: "Expected After Removal" },
            { id: "r3", text: "Sudden onset of severe dyspnea, tachycardia, and absent breath sounds on the affected side", correct: "Requires Immediate Intervention" },
            { id: "r4", text: "SpO2 stable at 96% on room air with equal bilateral breath sounds", correct: "Expected After Removal" },
            { id: "r5", text: "Palpable crepitus (subcutaneous emphysema) spreading from the site across the chest wall", correct: "Requires Immediate Intervention" }
        ],
        rationale: {
            correct: "Expected after removal: mild site pain, small serous drainage on the dressing, and stable respiratory status with good SpO2 and bilateral breath sounds. Immediate intervention: sudden dyspnea with absent breath sounds suggests recurrent pneumothorax requiring emergent reinsertion. Spreading subcutaneous emphysema indicates air leaking into the subcutaneous tissue — the insertion site may not be sealed, or a pneumothorax is worsening with air tracking into the tissue. Both require urgent reassessment and likely re-intervention."
        },
        testTakingTip: "Post-removal monitoring (24 hours): watch for recurrent pneumothorax (sudden dyspnea, absent breath sounds, dropping SpO2) and spreading subcutaneous emphysema. Mild pain and small drainage are normal. Post-removal CXR at 1-2 hours confirms continued lung expansion.",
        relatedGuide: "chest-tubes.html",
        relatedGuideSection: "removal"
    }

]);
