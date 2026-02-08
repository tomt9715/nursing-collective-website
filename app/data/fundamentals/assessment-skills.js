/**
 * Quiz Bank — Assessment Skills
 * The Nursing Collective
 *
 * 20 questions: 11 single, 4 ordering, 5 matrix
 * Difficulty mix: 6 knowledge, 8 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "assess-qb-001",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "application",
        stem: "A nurse is calculating the Glasgow Coma Scale (GCS) score for a patient who opens eyes to pain, makes incomprehensible sounds, and withdraws from painful stimuli. What is this patient's GCS score?",
        options: [
            { id: "a", text: "6" },
            { id: "b", text: "8" },
            { id: "c", text: "9" },
            { id: "d", text: "10" }
        ],
        correct: "b",
        rationale: {
            correct: "GCS is calculated by adding three components: Eye opening (1-4): Opens to pain = 2. Verbal response (1-5): Incomprehensible sounds = 2. Motor response (1-6): Withdrawal from pain = 4. Total: 2 + 2 + 4 = 8. A GCS of 8 or below typically indicates the patient cannot protect their airway and may require intubation. The mnemonic 'GCS of 8, intubate' is a critical clinical threshold."
        },
        testTakingTip: "GCS scoring: Eye (4-1: spontaneous, voice, pain, none), Verbal (5-1: oriented, confused, inappropriate words, incomprehensible, none), Motor (6-1: obeys, localizes, withdraws, flexion, extension, none). Minimum = 3, Maximum = 15. GCS ≤8 = intubate.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "neurological-assessment"
    },

    {
        id: "assess-qb-002",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is using the Braden Scale to assess a bedbound patient's pressure injury risk. The patient scores a total of 13. Based on this score, the nurse should:",
        options: [
            { id: "a", text: "Document the score and reassess in 1 week" },
            { id: "b", text: "Implement pressure injury prevention interventions including repositioning every 2 hours" },
            { id: "c", text: "Request a specialty wound care consultation" },
            { id: "d", text: "Place the patient on a standard hospital mattress with a heel elevation device" }
        ],
        correct: "b",
        rationale: {
            correct: "The Braden Scale ranges from 6 (highest risk) to 23 (lowest risk). A score of 13 indicates moderate risk. Interventions include: repositioning every 2 hours, pressure-redistributing mattress, moisture management, nutritional optimization, and heel elevation. Scores 15-18 = mild risk, 13-14 = moderate risk, 10-12 = high risk, ≤9 = very high risk. Waiting a week is too long; a wound care consult may be appropriate but the immediate action is prevention."
        },
        testTakingTip: "Braden Scale: LOWER score = HIGHER risk (opposite of most scales). Six subscales: sensory perception, moisture, activity, mobility, nutrition, friction/shear. Each scored 1-4 (friction/shear 1-3). Score ≤18 means at risk.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "skin-assessment"
    },

    {
        id: "assess-qb-003",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is assessing a trauma patient and finds the following: HR 56, BP 198/110, and irregular respirations with periods of apnea. The nurse recognizes this pattern as:",
        options: [
            { id: "a", text: "Neurogenic shock from spinal cord injury" },
            { id: "b", text: "Cushing's triad indicating increased intracranial pressure" },
            { id: "c", text: "Beck's triad suggesting cardiac tamponade" },
            { id: "d", text: "Autonomic dysreflexia from bladder distension" }
        ],
        correct: "b",
        rationale: {
            correct: "Cushing's triad consists of: (1) hypertension (widening pulse pressure), (2) bradycardia, and (3) irregular respirations (Cheyne-Stokes or ataxic breathing). This is a LATE and ominous sign of critically elevated intracranial pressure causing brainstem herniation. It requires emergent intervention (hyperventilation, mannitol/hypertonic saline, possible decompressive surgery). Neurogenic shock causes hypotension with bradycardia. Beck's triad includes hypotension, muffled heart sounds, and JVD. Autonomic dysreflexia causes hypertension with bradycardia but includes headache, flushing above the injury, and has a known trigger."
        },
        testTakingTip: "Cushing's triad = the brain's last distress signal. Hypertension (body trying to perfuse the brain against rising ICP) + bradycardia (vagal response to hypertension) + irregular respirations (brainstem compression). This is a neurosurgical emergency.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "neurological-assessment"
    },

    {
        id: "assess-qb-004",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "application",
        stem: "A nurse needs to assess pain in a 78-year-old patient with moderate dementia who is grimacing and guarding their right hip after a fall. The patient cannot reliably self-report pain. Which pain assessment tool is most appropriate?",
        options: [
            { id: "a", text: "Numeric Rating Scale (0-10)" },
            { id: "b", text: "Wong-Baker FACES scale" },
            { id: "c", text: "PAINAD (Pain Assessment in Advanced Dementia) scale" },
            { id: "d", text: "Brief Pain Inventory" }
        ],
        correct: "c",
        rationale: {
            correct: "The PAINAD scale is specifically designed for patients with advanced dementia who cannot reliably self-report pain. It uses behavioral observation of 5 indicators: breathing, negative vocalization, facial expression, body language, and consolability — each scored 0-2 (total 0-10). The Numeric Rating Scale requires cognitive ability to rate pain. The Wong-Baker FACES scale requires pointing ability and is designed for children. The Brief Pain Inventory is a detailed self-report tool for chronic pain."
        },
        testTakingTip: "Match pain tool to patient ability: verbal/cognitive intact = Numeric (0-10); pediatric or language barrier = FACES; sedated/intubated = CPOT or BPS; dementia = PAINAD; neonate = NIPS or CRIES. Self-report is ALWAYS preferred when possible.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "pain-assessment"
    },

    {
        id: "assess-qb-005",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is documenting a wound assessment. The wound has a red, moist base with granulation tissue visible. The wound measures 4 cm length x 2 cm width x 0.5 cm depth with no undermining or tunneling. Which documentation format correctly reports these findings?",
        options: [
            { id: "a", text: "4 x 2 x 0.5 cm, red base with granulation tissue, no undermining" },
            { id: "b", text: "Length 4 cm x Width 2 cm x Depth 0.5 cm (measured with disposable ruler); wound bed 80% red granulation tissue, no slough or necrotic tissue; no undermining or tunneling; minimal serous drainage; periwound skin intact and non-erythematous" },
            { id: "c", text: "Medium-sized open wound, healing well, looks clean" },
            { id: "d", text: "Wound is improving, granulation tissue present, continue current treatment" }
        ],
        correct: "b",
        rationale: {
            correct: "Complete wound documentation must include: measurement (L x W x D with method), wound bed description (percentage of tissue types: granulation, slough, necrotic), presence/absence of undermining and tunneling (with clock-face location and depth if present), drainage (type, color, amount, odor), and periwound skin condition. Option B provides all required elements. Options A is incomplete. Options C and D use subjective language that is not measurable or reproducible."
        },
        testTakingTip: "Wound documentation must be objective, measurable, and reproducible. Use: Size (L x W x D) + Bed (% tissue types) + Drainage (type/amount) + Periwound + Tunneling/undermining. Avoid subjective terms like 'looks good' or 'healing well.'",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "wound-assessment"
    },

    {
        id: "assess-qb-006",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse assesses a patient and finds: RR 32, HR 118, BP 86/58, SpO2 89%, temperature 102.8°F, and the patient is confused (baseline is alert and oriented). Which is the most appropriate FIRST action?",
        options: [
            { id: "a", text: "Administer acetaminophen for the fever and recheck vitals in 30 minutes" },
            { id: "b", text: "Activate the rapid response team and prepare for possible deterioration" },
            { id: "c", text: "Apply supplemental oxygen and elevate the head of bed" },
            { id: "d", text: "Notify the charge nurse and document the findings" }
        ],
        correct: "b",
        rationale: {
            correct: "This patient meets multiple rapid response criteria: tachypnea (RR >30), tachycardia (HR >100), hypotension (SBP <90), hypoxemia (SpO2 <90%), and acute mental status change. This constellation also suggests possible sepsis or another acute deterioration requiring immediate team intervention. While oxygen is important (and would be done nearly simultaneously), activating the rapid response team mobilizes the resources needed for this acutely decompensating patient. Treating fever alone or waiting to recheck vitals delays critical intervention."
        },
        testTakingTip: "Know your rapid response triggers: HR >140 or <40, RR >28-30, SBP <90, SpO2 <90%, acute mental status change, chest pain with diaphoresis, new-onset seizure. When multiple triggers are present simultaneously, activate immediately.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "escalation"
    },

    {
        id: "assess-qb-007",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "application",
        stem: "A nurse is constructing an SBAR communication to notify the provider about a post-surgical patient with new-onset confusion and a temperature of 101.4°F. Which element is the nurse providing when stating: 'I believe the patient may be developing a surgical site infection and may need blood cultures and antibiotic coverage'?",
        options: [
            { id: "a", text: "Situation" },
            { id: "b", text: "Background" },
            { id: "c", text: "Assessment" },
            { id: "d", text: "Recommendation" }
        ],
        correct: "d",
        rationale: {
            correct: "SBAR: Situation = why you are calling right now ('I'm calling about Mr. Jones in 412, he has new confusion and a temp of 101.4'). Background = relevant clinical context ('He had an appendectomy 2 days ago, his WBC was 14,000 this morning'). Assessment = your clinical interpretation ('I believe he may be developing a surgical site infection'). Recommendation = what you think should happen ('I recommend blood cultures and starting antibiotic coverage'). The statement includes both Assessment ('I believe...infection') and Recommendation ('may need blood cultures and antibiotic coverage'), but the actionable request for specific orders makes it primarily the R."
        },
        testTakingTip: "SBAR Recommendation is where the nurse advocates. It's the 'ask.' Always end with a specific, actionable request: 'I recommend...' or 'Would you like me to...' This prevents the conversation from ending without a plan.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "communication"
    },

    {
        id: "assess-qb-008",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "application",
        stem: "A nurse is performing pupil assessment on a patient with a head injury. The right pupil is 6 mm and non-reactive to light, while the left pupil is 3 mm and briskly reactive. The nurse documents this finding as:",
        options: [
            { id: "a", text: "PERRLA — pupils equal, round, reactive to light and accommodation" },
            { id: "b", text: "Right pupil fixed and dilated (6 mm); left pupil reactive (3 mm) — unilateral mydriasis suggesting possible uncal herniation on the right" },
            { id: "c", text: "Bilateral pupil abnormality — consult ophthalmology" },
            { id: "d", text: "Pupils unequal — likely due to room lighting; will recheck in one hour" }
        ],
        correct: "b",
        rationale: {
            correct: "A unilaterally fixed and dilated pupil (>6 mm, non-reactive) in a head injury patient is a neurosurgical emergency suggesting ipsilateral uncal herniation compressing cranial nerve III (oculomotor). This finding requires immediate notification of the provider and preparation for interventions to reduce ICP. PERRLA is incorrect — the pupils are NOT equal or equally reactive. This is never 'likely due to lighting' in a head injury patient. Ophthalmology referral misses the urgency."
        },
        testTakingTip: "In head injury patients: unilateral fixed/dilated pupil = herniation on THAT side (CN III compression). Bilateral fixed/dilated = severe brainstem compromise. Always compare pupils to each other AND to prior assessments. A new change is an emergency.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "neurological-assessment"
    },

    {
        id: "assess-qb-009",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is assessing vital signs on a 2-year-old child brought in for a wellness visit. Which set of vital signs would the nurse consider NORMAL for this age?",
        options: [
            { id: "a", text: "HR 68, RR 14, BP 110/70" },
            { id: "b", text: "HR 110, RR 26, BP 90/56" },
            { id: "c", text: "HR 140, RR 40, BP 70/42" },
            { id: "d", text: "HR 80, RR 16, BP 120/80" }
        ],
        correct: "b",
        rationale: {
            correct: "Normal vital sign ranges for a 2-year-old: HR 80-130 bpm, RR 20-30 breaths/min, BP approximately 80-100 systolic / 50-65 diastolic. Option B (HR 110, RR 26, BP 90/56) falls within all normal pediatric ranges. Option A has an adult heart rate and respiratory rate — too slow for a toddler. Option C has a newborn/infant-range heart rate and respiratory rate — too fast for age 2. Option D has adult vital signs."
        },
        testTakingTip: "Pediatric vital signs rule of thumb: younger = faster HR and RR, lower BP. Approximate normal SBP: 70 + (2 x age in years). So a 2-year-old: 70 + 4 = 74 mmHg minimum acceptable SBP. Heart rates decrease and BPs increase with age toward adult values.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "vital-signs"
    },

    {
        id: "assess-qb-010",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is caring for four patients on a medical-surgical unit. Which assessment finding requires the nurse's IMMEDIATE attention?",
        options: [
            { id: "a", text: "A post-cholecystectomy patient with pain rated 6/10 requesting their scheduled pain medication" },
            { id: "b", text: "A newly admitted patient with COPD whose SpO2 is 89% on 2L nasal cannula" },
            { id: "c", text: "A patient with diabetes whose fingerstick glucose is 52 mg/dL and is diaphoretic and trembling" },
            { id: "d", text: "A patient requesting a bedpan who reports feeling bloated after surgery" }
        ],
        correct: "c",
        rationale: {
            correct: "A glucose of 52 mg/dL with symptoms of hypoglycemia (diaphoresis, tremor) is a medical emergency requiring immediate treatment (15 g of fast-acting carbohydrate if conscious, or IV dextrose if unable to swallow). Untreated hypoglycemia can progress to seizures, loss of consciousness, and death within minutes. The COPD patient's SpO2 of 89% may be near their baseline (target 88-92% for COPD). The post-op pain and bloating are important but not immediately life-threatening."
        },
        testTakingTip: "Prioritization framework: immediate life threats first. Hypoglycemia <60 mg/dL with symptoms = treat NOW (rule of 15: 15g carbs, recheck in 15 min). COPD patients often target SpO2 88-92%, so 89% may be acceptable. Use ABC + unstable vital signs to prioritize.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "prioritization"
    },

    {
        id: "assess-qb-011",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "single",
        difficulty: "application",
        stem: "A nurse is performing a focused respiratory assessment on a patient admitted with pneumonia. Which finding would the nurse expect to identify on auscultation over the area of consolidation?",
        options: [
            { id: "a", text: "Bilateral expiratory wheezing throughout all lung fields" },
            { id: "b", text: "Diminished breath sounds with crackles (rales) and possible bronchial breath sounds over the affected area" },
            { id: "c", text: "Stridor heard best over the trachea during inspiration" },
            { id: "d", text: "Pleural friction rub with pain on deep inspiration" }
        ],
        correct: "b",
        rationale: {
            correct: "In pneumonia with consolidation (fluid/exudate filling the alveoli), the nurse would expect: diminished breath sounds (air cannot move through fluid-filled alveoli), crackles/rales (fluid in the airways makes crackling sounds during inspiration), and bronchial breath sounds heard over the periphery (consolidated tissue transmits bronchial sounds that are normally only heard centrally). Wheezing suggests bronchoconstriction (asthma/COPD). Stridor suggests upper airway obstruction. A friction rub suggests pleurisy."
        },
        testTakingTip: "Lung sounds by condition: Pneumonia = crackles + bronchial sounds over periphery; Asthma/COPD = wheezing; Pleural effusion = absent sounds at the base; Pulmonary edema = bilateral crackles, base to apex; Pneumothorax = absent sounds on the affected side.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "respiratory-assessment"
    },

    // ── ORDERING (4) ─────────────────────────────────────────

    {
        id: "assess-qb-012",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A nurse is performing a systematic head-to-toe assessment on a newly admitted patient. Place the assessment components in the correct order.",
        options: [
            { id: "s1", text: "General survey: LOC, appearance, posture, mobility, vital signs, pain level" },
            { id: "s2", text: "Head, eyes, ears, nose, throat (HEENT): pupils, mucous membranes, JVD, lymph nodes" },
            { id: "s3", text: "Chest: lung sounds anterior/posterior, heart sounds, respiratory effort" },
            { id: "s4", text: "Abdomen: inspect, auscultate, palpate; bowel sounds, distension, tenderness" },
            { id: "s5", text: "Extremities and skin: peripheral pulses, edema, sensation, skin integrity, capillary refill" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Begin with general survey and vital signs — this establishes the patient's overall condition and identifies any immediate concerns that would change the assessment approach.",
            s2: "HEENT assessment follows: neurological status (pupils, orientation), airway status (mouth/throat), and signs of fluid overload or circulatory issues (JVD).",
            s3: "Cardiopulmonary assessment is next: lung sounds determine respiratory status, heart sounds assess cardiac function. This system often reveals the most acute issues.",
            s4: "Abdominal assessment: ALWAYS auscultate before palpating (palpation can alter bowel sounds). Assess all four quadrants for bowel sounds, then palpate for tenderness and masses.",
            s5: "Extremities and skin are assessed last: peripheral circulation (pulses, cap refill, edema), neurological function (sensation, movement), and skin integrity (pressure injuries, IV sites)."
        },
        testTakingTip: "Head-to-toe order: General survey → HEENT → Chest (lungs + heart) → Abdomen → Extremities/Skin. Key rule: for the abdomen, always auscultate BEFORE palpating. The sequence is inspect → auscultate → palpate for abdomen only.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "systematic-assessment"
    },

    {
        id: "assess-qb-013",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse finds a patient on the floor unresponsive. Place the nurse's assessment and response actions in the correct priority order.",
        options: [
            { id: "s1", text: "Check responsiveness: tap the patient and shout 'Are you okay?'" },
            { id: "s2", text: "Call for help and activate the rapid response/code team" },
            { id: "s3", text: "Assess airway, breathing, and circulation (pulse check for no more than 10 seconds)" },
            { id: "s4", text: "If no pulse, begin CPR (30 compressions : 2 breaths) and send for the AED/crash cart" },
            { id: "s5", text: "Once help arrives, perform a focused assessment: blood glucose, vital signs, 12-lead ECG, and investigate cause of collapse" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "First establish unresponsiveness. Tap the shoulders and call out. If the patient responds, proceed to a focused assessment. If unresponsive, escalate immediately.",
            s2: "Call for help immediately — you cannot perform a code alone. Activate the rapid response/code team. In a hospital, this also brings the crash cart, AED, and additional personnel.",
            s3: "Perform a rapid ABC assessment: open the airway (head-tilt chin-lift), look/listen/feel for breathing, check the carotid pulse for no more than 10 seconds. If uncertain about a pulse, assume no pulse.",
            s4: "If pulseless, begin high-quality CPR immediately (100-120 compressions/min, 2-inch depth, full recoil). Send someone for the AED/crash cart. Attach AED as soon as available and follow prompts.",
            s5: "Once the team arrives and the patient is stabilized, perform a secondary assessment to determine the cause: blood glucose (hypoglycemia), 12-lead ECG (MI, arrhythmia), labs, and review the circumstances of the collapse."
        },
        testTakingTip: "Unresponsive patient sequence: Check response → Call for help → ABC/pulse check (≤10 seconds) → CPR if pulseless → Investigate cause when help arrives. If ever in doubt about a pulse, START compressions. High-quality CPR saves lives.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "emergency-response"
    },

    {
        id: "assess-qb-014",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is preparing to call the provider about a patient whose condition has changed. Place the SBAR communication components in the correct order with appropriate content.",
        options: [
            { id: "s1", text: "S: 'I'm calling about Mrs. Garcia in room 318. She has developed new-onset chest pain rated 8/10 with diaphoresis.'" },
            { id: "s2", text: "B: 'She is 68 years old, admitted yesterday for elective knee replacement. History of HTN and hyperlipidemia. She is on day 1 post-op and has been ambulating with PT.'" },
            { id: "s3", text: "A: 'Her vital signs are HR 112, BP 156/94, RR 24, SpO2 93%. I am concerned this may be a cardiac event or pulmonary embolism given her post-surgical status.'" },
            { id: "s4", text: "R: 'I recommend a STAT 12-lead ECG, troponin, D-dimer, and chest X-ray. Would you also like me to administer aspirin and start oxygen?'" }
        ],
        correct: ["s1", "s2", "s3", "s4"],
        rationale: {
            s1: "Situation: State who you are, who the patient is, and WHY you are calling right now. Be concise — the provider needs to immediately understand the urgency.",
            s2: "Background: Provide relevant clinical context — age, reason for admission, pertinent history, and current status. Only include information that helps the provider understand the current situation.",
            s3: "Assessment: Share objective data (vital signs, symptoms) AND your clinical interpretation. The nurse's assessment is critical — you are the one at the bedside seeing the full picture.",
            s4: "Recommendation: State what you think should happen next. Be specific with orders you are requesting. This ensures a clear plan and prevents the conversation from ending without action."
        },
        testTakingTip: "SBAR is not just a format — it's a safety tool. S grabs attention, B gives context, A shows critical thinking, R drives action. Always end with a specific recommendation. If the provider disagrees, advocate for your patient using the chain of command.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "communication"
    },

    {
        id: "assess-qb-015",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "ordering",
        difficulty: "analysis",
        stem: "A nurse receives handoff for four patients at the start of shift. Based on the handoff information, place the patients in the order the nurse should assess them (FIRST to LAST).",
        options: [
            { id: "s1", text: "Patient A: Post-op day 2 colectomy, stable vitals, requesting pain medication refill" },
            { id: "s2", text: "Patient B: Newly admitted chest pain patient, troponin pending, on continuous telemetry and heparin drip" },
            { id: "s3", text: "Patient C: CHF patient whose last recorded SpO2 was 88% with new-onset crackles at end of prior shift" },
            { id: "s4", text: "Patient D: Diabetic patient, stable, discharge planned today pending morning labs" }
        ],
        correct: ["s3", "s2", "s1", "s4"],
        rationale: {
            s3: "Patient C is the highest priority: actively deteriorating (new SpO2 of 88%, new crackles suggests worsening pulmonary edema). This patient's condition may have worsened further since last shift's assessment and requires immediate evaluation and potential intervention.",
            s2: "Patient B is second: new admission with acute cardiac presentation on a heparin drip requires early assessment to establish your baseline, verify drip rate, and be present when troponin results return.",
            s1: "Patient A is third: stable post-op patient with a comfort need (pain medication). Important but not urgent — pain should be addressed promptly but the patient is hemodynamically stable.",
            s4: "Patient D is last: stable, planned for discharge. Morning labs and discharge teaching can be addressed after acute patients are assessed and stabilized."
        },
        testTakingTip: "Start-of-shift prioritization: assess unstable/deteriorating patients first, then new admissions (unknown baseline), then stable patients with acute needs, then stable patients for discharge. Think: Who could die or get sicker while I'm assessing someone else?",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "prioritization"
    },

    // ── MATRIX (5) ───────────────────────────────────────────

    {
        id: "assess-qb-016",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each pain assessment tool, indicate the most appropriate patient population.",
        columns: ["Verbal Adults", "Nonverbal/Dementia", "Pediatric (3-7 years)", "Intubated/Sedated ICU"],
        rows: [
            { id: "r1", text: "Numeric Rating Scale (0-10)", correct: "Verbal Adults" },
            { id: "r2", text: "PAINAD (Pain Assessment in Advanced Dementia)", correct: "Nonverbal/Dementia" },
            { id: "r3", text: "Wong-Baker FACES Pain Rating Scale", correct: "Pediatric (3-7 years)" },
            { id: "r4", text: "CPOT (Critical-Care Pain Observation Tool)", correct: "Intubated/Sedated ICU" },
            { id: "r5", text: "FLACC (Face, Legs, Activity, Cry, Consolability)", correct: "Pediatric (3-7 years)" }
        ],
        rationale: {
            correct: "Pain assessment tools must match patient communication ability. Numeric Rating Scale (0-10) requires verbal ability and abstract thinking — ideal for alert, oriented adults. PAINAD uses behavioral cues (breathing, vocalization, facial expression, body language, consolability) for dementia patients who cannot self-report. Wong-Baker FACES uses facial expressions children can point to (ages 3-7+). CPOT observes facial expression, body movements, muscle tension, and ventilator compliance in intubated patients. FLACC uses behavioral observation for preverbal or young children."
        },
        testTakingTip: "Always use self-report if possible (gold standard). When self-report is not possible, use behavioral observation tools matched to the population. The hierarchy: self-report → behavioral tools → physiologic indicators (least reliable alone).",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "pain-assessment"
    },

    {
        id: "assess-qb-017",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each clinical situation, indicate the appropriate documentation format the nurse should use.",
        columns: ["SBAR", "DAR (Focus Charting)", "Narrative Note"],
        rows: [
            { id: "r1", text: "Calling the provider about an acute change in a patient's condition", correct: "SBAR" },
            { id: "r2", text: "Documenting a patient's response to a PRN pain medication 30 minutes after administration", correct: "DAR (Focus Charting)" },
            { id: "r3", text: "Writing a detailed account of a patient fall including events leading up to, during, and after the incident", correct: "Narrative Note" },
            { id: "r4", text: "Documenting a dressing change: wound appearance, treatment applied, and patient's tolerance", correct: "DAR (Focus Charting)" },
            { id: "r5", text: "Providing shift handoff communication about a complex post-surgical patient", correct: "SBAR" }
        ],
        rationale: {
            correct: "SBAR (Situation-Background-Assessment-Recommendation) is the standard for real-time communication — provider notifications and handoffs. DAR (Data-Action-Response) focus charting is ideal for documenting specific interventions and patient responses (pain med effectiveness, wound care procedures). Narrative notes provide a chronological, detailed account needed for unusual events, incidents, or complex situations requiring a complete story (falls, codes, restraint use, AMA discharges)."
        },
        testTakingTip: "Documentation format guide: SBAR = communication tool (calling providers, handoffs); DAR = intervention-response documentation (gave med → patient responded); Narrative = incident/event documentation (falls, codes, unusual events needing full story).",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "documentation"
    },

    {
        id: "assess-qb-018",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "matrix",
        difficulty: "application",
        stem: "A charge nurse is making patient assignments. For each assessment task, indicate whether it can be delegated to a UAP (unlicensed assistive personnel), assigned to an LPN/LVN, or must be performed by an RN.",
        columns: ["Delegate to UAP", "Assign to LPN/LVN", "RN Only"],
        rows: [
            { id: "r1", text: "Obtaining and recording vital signs on a stable medical-surgical patient", correct: "Delegate to UAP" },
            { id: "r2", text: "Performing an admission head-to-toe assessment on a newly arrived patient", correct: "RN Only" },
            { id: "r3", text: "Performing a focused assessment and documenting findings on a stable patient", correct: "Assign to LPN/LVN" },
            { id: "r4", text: "Initiating the nursing care plan and establishing priority nursing diagnoses", correct: "RN Only" },
            { id: "r5", text: "Measuring and recording a fingerstick blood glucose on a stable diabetic patient", correct: "Delegate to UAP" },
            { id: "r6", text: "Providing discharge education about new medications, including side effects and when to call the provider", correct: "RN Only" }
        ],
        rationale: {
            correct: "UAPs perform standardized, routine data collection: vital signs, fingerstick glucose, I&O, daily weights. LPN/LVNs can perform focused assessments and document findings on stable, predictable patients — their scope includes data collection and focused physical assessment. RNs must perform: initial/admission assessments, care plan development, nursing diagnoses, and all patient education. The RN is responsible for initial assessment, interpretation, clinical judgment, and teaching."
        },
        testTakingTip: "Delegation hierarchy: UAP = collect routine data (measure, record). LPN = focused assessment on stable patients, medication administration. RN = initial assessment, care planning, education, unstable patients, IV push meds, blood products. Assessment = RN; data collection = can be delegated.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "delegation"
    },

    {
        id: "assess-qb-019",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each vital sign finding, indicate whether it falls within the normal adult range or is abnormal.",
        columns: ["Normal Adult Range", "Abnormal — Requires Follow-Up"],
        rows: [
            { id: "r1", text: "Heart rate 76 bpm, regular rhythm", correct: "Normal Adult Range" },
            { id: "r2", text: "Blood pressure 148/92 mmHg", correct: "Abnormal — Requires Follow-Up" },
            { id: "r3", text: "Respiratory rate 18 breaths per minute", correct: "Normal Adult Range" },
            { id: "r4", text: "Temperature 100.8°F (38.2°C) oral", correct: "Abnormal — Requires Follow-Up" },
            { id: "r5", text: "Oxygen saturation 97% on room air", correct: "Normal Adult Range" },
            { id: "r6", text: "Respiratory rate 8 breaths per minute", correct: "Abnormal — Requires Follow-Up" }
        ],
        rationale: {
            correct: "Normal adult vital sign ranges: HR 60-100 bpm (76 = normal); BP <120/80 normal, 120-129/<80 elevated, 130-139/80-89 Stage 1 HTN (148/92 = Stage 2 HTN, abnormal); RR 12-20/min (18 = normal, 8 = bradypnea, abnormal); Temp 97.8-99.1°F oral (100.8°F = fever, abnormal); SpO2 95-100% on room air (97% = normal). A respiratory rate of 8 may indicate respiratory depression (opioid toxicity, neurological compromise) and requires immediate assessment."
        },
        testTakingTip: "Know normal adult vital sign ranges cold: HR 60-100, RR 12-20, BP <120/80 (normal), Temp <100.4°F, SpO2 >95%. Anything outside these ranges requires assessment, trending, and potentially provider notification depending on severity and context.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "vital-signs"
    },

    {
        id: "assess-qb-020",
        category: "fundamentals",
        topic: "assessment-skills",
        topicLabel: "Assessment Skills",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is deciding between performing a focused assessment or a comprehensive assessment. For each scenario, indicate the appropriate assessment type.",
        columns: ["Focused Assessment", "Comprehensive Assessment"],
        rows: [
            { id: "r1", text: "A patient admitted to the unit from the emergency department for the first time", correct: "Comprehensive Assessment" },
            { id: "r2", text: "A stable post-op patient reports new incisional pain rated 7/10 at the surgical site", correct: "Focused Assessment" },
            { id: "r3", text: "Beginning-of-shift assessment on a patient whose condition has been stable for 3 days", correct: "Comprehensive Assessment" },
            { id: "r4", text: "A patient with asthma who reports sudden onset of wheezing and chest tightness", correct: "Focused Assessment" },
            { id: "r5", text: "A patient returning to the floor after a cardiac catheterization procedure", correct: "Comprehensive Assessment" }
        ],
        rationale: {
            correct: "Comprehensive (head-to-toe) assessments are performed: on admission (establishing baseline), at the start of each shift (detecting overnight changes), and after procedures (post-cath requires full assessment including access site, distal pulses, vitals, neuro status). Focused assessments are performed: for specific complaints (new pain at surgical site — assess the site, pain characteristics, vitals), for acute symptom changes (wheezing — assess respiratory system specifically), and for reassessments after interventions."
        },
        testTakingTip: "Comprehensive = baseline or shift assessment (need full picture). Focused = specific complaint or change (zoom in on the problem system). Even during focused assessments, always check vital signs and LOC — they reveal systemic issues the focused area might miss.",
        relatedGuide: "assessment-skills.html",
        relatedGuideSection: "systematic-assessment"
    }

]);
