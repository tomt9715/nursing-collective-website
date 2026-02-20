/**
 * Assessment Skills Quiz — Question Data
 * 10 NCLEX-style questions: 5 Single, 3 Ordering, 2 Matrix
 * Types: IDs 1,2,6,7,9=single | IDs 4,5,8=ordering | IDs 3,10=matrix
 */

/* exported assessmentSkillsQuizData */
var assessmentSkillsQuizData = {
    guideName: "Assessment Skills",
    guideSlug: "assessment-skills",
    category: "Fundamentals",
    categoryColor: "#10b981",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is assessing a patient who was involved in a motor vehicle accident. The patient opens eyes only to painful stimuli, makes incomprehensible sounds, and exhibits abnormal flexion (decorticate posturing) to pain. What is this patient's Glasgow Coma Scale (GCS) score?",
            options: [
                { id: "a", text: "GCS 5 (E1 + V1 + M3)" },
                { id: "b", text: "GCS 7 (E2 + V2 + M3)" },
                { id: "c", text: "GCS 8 (E2 + V2 + M4)" },
                { id: "d", text: "GCS 9 (E2 + V3 + M4)" }
            ],
            correct: "b",
            rationale: {
                correct: "The GCS is calculated by adding three components: Eye Opening (E) = 2 (opens to pain), Verbal Response (V) = 2 (incomprehensible sounds — moaning/groaning without words), Motor Response (M) = 3 (abnormal flexion/decorticate posturing). Total = 2 + 2 + 3 = 7. A GCS of 7 indicates severe brain injury and the patient likely needs intubation for airway protection (GCS ≤8 = 'intubate').",
                a: "GCS 5 would require: E1 (no eye opening) + V1 (no verbal response) + M3 (abnormal flexion). This patient DOES open eyes to pain (E2) and DOES make sounds (V2), so the score is higher than 5.",
                c: "GCS 8 would require M4 (withdrawal from pain — a purposeful pulling away). This patient exhibits M3 (abnormal flexion/decorticate posturing — stereotypical flexion of arms, wrist flexion, and leg extension), which is a lower motor response than withdrawal.",
                d: "GCS 9 would require V3 (inappropriate words — recognizable words but not conversational) and M4 (withdrawal). This patient produces only incomprehensible sounds (V2, no words) and has abnormal flexion (M3), not withdrawal."
            },
            labValues: [
                { name: "GCS Scale", normal: "Eye: 1-4, Verbal: 1-5, Motor: 1-6 (Total: 3-15)" },
                { name: "GCS Severity", normal: "Mild: 13-15, Moderate: 9-12, Severe: 3-8" }
            ],
            testTakingTip: "GCS scoring: Eye (4-1: spontaneous, voice, pain, none), Verbal (5-1: oriented, confused, inappropriate words, incomprehensible sounds, none), Motor (6-1: obeys commands, localizes, withdraws, abnormal flexion, extension, none). Key: GCS ≤8 = 'intubate' for airway protection. Abnormal flexion (decorticate) = M3, Extension (decerebrate) = M2.",
            guideSection: "Section 5 — GCS Assessment",
            guideSectionId: "gcs-assessment"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is completing a Braden Scale assessment for a 78-year-old patient admitted with a hip fracture who is immobile in bed, incontinent of urine, eating less than 50% of meals, and requires complete assistance with repositioning. The nurse scores: Sensory Perception 3, Moisture 2, Activity 1, Mobility 2, Nutrition 2, Friction/Shear 1. The total Braden Score is 11. Which nursing action is MOST appropriate based on this score?",
            options: [
                { id: "a", text: "Document the score and reassess in one week" },
                { id: "b", text: "Implement a high-risk pressure injury prevention protocol: reposition every 2 hours, apply pressure-relieving mattress, optimize nutrition, and moisturize skin" },
                { id: "c", text: "Apply a barrier cream and continue current care since the score indicates low risk" },
                { id: "d", text: "Place the patient on a standard hospital mattress and reposition every 4 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "A Braden Scale score of 11 indicates HIGH RISK for pressure injury development (High Risk = 10-12, Very High Risk = ≤9). This requires aggressive prevention: repositioning every 2 hours (with 30-degree lateral turns), pressure-relieving support surface (alternating pressure or low-air-loss mattress), nutritional optimization (protein supplementation, dietitian consult), skin moisture management, and minimizing friction/shear with proper turning techniques.",
                a: "A Braden Score of 11 (high risk) requires IMMEDIATE intervention, not just documentation and weekly reassessment. High-risk patients should be reassessed every 24-48 hours on acute care units, with interventions implemented at the time of assessment.",
                c: "A score of 11 is NOT low risk. The Braden Scale ranges from 6-23, with lower scores indicating HIGHER risk. Mild Risk = 15-18, Moderate Risk = 13-14, High Risk = 10-12, Very High Risk = ≤9. A barrier cream alone is insufficient for a high-risk patient.",
                d: "Repositioning every 4 hours is insufficient for a high-risk patient. The standard of care is every 2 hours. A standard hospital mattress does not provide adequate pressure redistribution — a specialized pressure-relieving surface is needed."
            },
            testTakingTip: "Braden Scale: lower score = HIGHER risk (opposite of what you might expect). Subscales scored 1-4 (friction/shear: 1-3), total range 6-23. Scores ≤18 generally trigger prevention protocols. Remember: the Braden Scale is PREDICTIVE — it identifies who WILL develop pressure injuries so you can PREVENT them, not treat them after the fact.",
            guideSection: "Section 6 — Braden Scale",
            guideSectionId: "braden-scale"
        },
        {
            id: 3,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Normal Finding", "Abnormal — Notify Provider"],
            stem: "A nurse is assessing vital signs on pediatric patients in a general pediatrics unit. For each finding, classify whether it is a normal finding for the stated age group or an abnormal finding that requires provider notification.",
            options: [
                { id: "a", text: "Heart rate 150 bpm in a crying 3-month-old infant" },
                { id: "b", text: "Respiratory rate 42 breaths/min in a sleeping newborn (2 days old)" },
                { id: "c", text: "Blood pressure 78/40 mmHg in a 4-year-old child" },
                { id: "d", text: "Heart rate 60 bpm in a 2-year-old toddler" },
                { id: "e", text: "Respiratory rate 30 breaths/min in an active 8-year-old" }
            ],
            correct: { a: "Normal Finding", b: "Normal Finding", c: "Abnormal — Notify Provider", d: "Abnormal — Notify Provider", e: "Abnormal — Notify Provider" },
            rationale: {
                correct: "Pediatric vital signs change significantly with age. Younger children have faster heart and respiratory rates and lower blood pressures. Findings must be evaluated against age-specific norms.",
                a: "NORMAL — Infant (1-12 months) normal heart rate: 100-160 bpm. A crying infant will be at the upper end of the range. HR 150 bpm in a crying 3-month-old is physiologically appropriate and expected.",
                b: "NORMAL — Newborn normal respiratory rate: 30-60 breaths/min. Periodic breathing (irregular rate with brief pauses <20 seconds) is normal in newborns. RR 42 in a sleeping newborn is within the normal range.",
                c: "ABNORMAL — Normal blood pressure for a 4-year-old: approximately 95-105/55-65 mmHg. A BP of 78/40 is hypotensive for this age. The formula for minimum systolic BP in children (age 1-10): 70 + (2 × age in years) = 70 + 8 = 78 mmHg as the LOWER LIMIT. This child is at the absolute floor and the diastolic is concerning. Investigate for hypovolemia, sepsis, or cardiac issues.",
                d: "ABNORMAL — Normal heart rate for a 2-year-old toddler: 80-130 bpm. A heart rate of 60 bpm in a toddler is BRADYCARDIC and concerning. In pediatrics, bradycardia is often a pre-arrest rhythm indicating hypoxia. This requires immediate assessment of airway, breathing, and oxygen saturation.",
                e: "ABNORMAL — Normal respiratory rate for an 8-year-old school-age child: 16-22 breaths/min. RR 30 is tachypneic for this age. Evaluate for respiratory distress (accessory muscle use, nasal flaring, retractions), fever, anxiety, or pain."
            },
            labValues: [
                { name: "Infant HR (1-12 mo)", normal: "100–160 bpm" },
                { name: "Toddler HR (1-3 yr)", normal: "80–130 bpm" },
                { name: "School-age HR (6-12 yr)", normal: "70–110 bpm" },
                { name: "Newborn RR", normal: "30–60 breaths/min" },
                { name: "School-age RR (6-12 yr)", normal: "16–22 breaths/min" },
                { name: "Minimum SBP (1-10 yr)", normal: "70 + (2 × age) mmHg" }
            ],
            testTakingTip: "Pediatric vital signs: younger = faster HR/RR, lower BP. Key danger signs: bradycardia in a child = hypoxia until proven otherwise (pre-arrest!). Always assess the CHILD, not just the number — is the child pale, lethargic, or working to breathe? Context matters: a crying infant's HR will be at the upper range. The BP formula (70 + 2×age) gives the minimum acceptable systolic.",
            guideSection: "Section 9 — Pediatric Vital Signs",
            guideSectionId: "pediatric-vitals"
        },
        {
            id: 4,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse discovers a post-operative patient who is confused, tachycardic (HR 118), hypotensive (BP 84/56), and has a distended, rigid abdomen on post-operative day 1 after abdominal surgery. The nurse suspects internal hemorrhage. Place the SBAR communication elements in the correct sequence for notifying the provider.",
            options: [
                { id: "a", text: "SITUATION: \"I'm calling about Mr. Johnson in Room 412. He is post-op day 1 after an exploratory laparotomy and I'm concerned he is hemorrhaging internally.\"" },
                { id: "b", text: "BACKGROUND: \"He had an uncomplicated surgery yesterday. His baseline vitals this morning were BP 120/76, HR 82. He has been receiving IV fluids and has had 200 mL of urine output in the last 4 hours.\"" },
                { id: "c", text: "ASSESSMENT: \"His current vitals are BP 84/56, HR 118, RR 24, SpO2 96%. His abdomen is distended and rigid compared to 2 hours ago. He is confused and diaphoretic. I believe he is in hemorrhagic shock.\"" },
                { id: "d", text: "RECOMMENDATION: \"I think he needs a stat CBC, type and crossmatch, abdominal CT, and I'd like to increase his IV fluid rate. Do you want to come evaluate him now?\"" }
            ],
            correct: ["a", "b", "c", "d"],
            rationale: {
                correct: "SBAR is a standardized communication framework that presents information in a logical, concise sequence: Situation (what is happening now), Background (relevant context), Assessment (clinical interpretation), Recommendation (what you think should be done).",
                a: "SITUATION — Start with who you are, which patient, and the immediate concern. This orients the provider and establishes urgency. State the problem upfront — don't bury the lead.",
                b: "BACKGROUND — Provide relevant clinical context: recent surgery, baseline vitals (for comparison), current treatments. This gives the provider the information needed to understand how the patient's condition has changed.",
                c: "ASSESSMENT — Present your current findings (objective data: vitals, physical exam) AND your clinical interpretation (hemorrhagic shock). Sharing your nursing assessment demonstrates critical thinking and helps the provider prioritize their response.",
                d: "RECOMMENDATION — State what you think the patient needs (labs, imaging, fluid resuscitation) and ask a direct question ('Do you want to come evaluate?'). This is the most powerful part of SBAR — it empowers nurses to advocate for their patients and propose a plan."
            },
            testTakingTip: "SBAR order: Situation → Background → Assessment → Recommendation. The most commonly tested element on NCLEX is the 'R' — nurses must make a recommendation, not just report findings. Say 'I think the patient needs...' rather than just describing the problem. SBAR prevents the 'data dump' phenomenon where critical information gets lost in excessive details.",
            guideSection: "Section 10 — Head-to-Toe Assessment",
            guideSectionId: "head-to-toe"
        },
        {
            id: 5,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for an 82-year-old patient with advanced dementia who is 6 hours post\u2013hip fracture repair. The patient cannot verbalize but is grimacing, rigid, and pulling away when repositioned. Vital signs show HR 102 and BP 158/94 (baseline 128/76). The provider has ordered morphine 2 mg IV PRN. Place the nurse\u2019s pain management actions in the correct sequence.",
            options: [
                { id: "a", text: "Attempt a simple self-report question: hold the patient\u2019s hand and ask \u201cAre you hurting?\u201d while watching for any nod, grimace, or gesture" },
                { id: "b", text: "Apply the PAINAD behavioral observation tool to quantify pain (score facial expression, body language, consolability)" },
                { id: "c", text: "Note the elevated HR and BP as supporting evidence of pain, but recognize these alone are unreliable indicators" },
                { id: "d", text: "Administer morphine 2 mg IV as ordered based on the assessment findings" },
                { id: "e", text: "Reassess using the PAINAD tool 30 minutes after IV morphine to evaluate response and document the pain cycle" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Pain assessment follows the hierarchy of pain assessment: attempt self-report first (gold standard, even with dementia patients), then use a validated behavioral tool (PAINAD for advanced dementia), note physiological signs as supplemental data, intervene, and reassess using the SAME tool.",
                a: "FIRST \u2014 Self-report is always attempted first, even in patients with cognitive impairment. Some dementia patients can respond to simple yes/no questions with gestures, facial expressions, or sounds. Skipping this step underestimates the patient\u2019s ability and violates best practice guidelines.",
                b: "SECOND \u2014 When self-report is not possible, the PAINAD (Pain Assessment in Advanced Dementia) scale is the validated tool for this population. It scores breathing patterns, negative vocalizations, facial expression, body language, and consolability on a 0\u201310 scale.",
                c: "THIRD \u2014 The tachycardia (HR 102) and hypertension (BP 158/94 vs baseline 128/76) support the pain assessment but are NOT reliable standalone indicators. Beta-blockers can mask tachycardia, and chronic pain patients may adapt physiologically. These signs are supplemental data only.",
                d: "FOURTH \u2014 Based on the behavioral assessment (grimacing, rigidity, withdrawal) and supporting vital signs, administering the ordered analgesic is appropriate. Post-surgical hip fracture pain is expected and undertreating it impairs mobility and recovery.",
                e: "FIFTH \u2014 Reassessment 30 minutes after IV morphine completes the pain management cycle. Using the SAME tool (PAINAD) ensures consistent, comparable scoring. Document the initial score, intervention, and post-intervention score to guide ongoing pain management."
            },
            testTakingTip: "Pain assessment hierarchy: Self-report first (even in dementia) \u2192 Behavioral tool if no self-report (PAINAD for dementia, CPOT for intubated, FLACC for children) \u2192 Physiological signs as supplemental only \u2192 Intervene \u2192 Reassess with the SAME tool. The NCLEX tests whether you know that vital signs alone are NOT reliable pain indicators.",
            guideSection: "Section 8 \u2014 Pain Assessment",
            guideSectionId: "pain-assessment"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is performing a head-to-toe assessment on a newly admitted patient. During the neurological assessment, the nurse notes the right pupil is 6 mm and non-reactive to light while the left pupil is 3 mm and briskly reactive. The patient was alert on admission 2 hours ago but is now difficult to arouse. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Document the findings as a possible pre-existing condition (anisocoria)" },
                { id: "b", text: "Notify the provider immediately — this is a sign of increased intracranial pressure with impending herniation" },
                { id: "c", text: "Dim the room lights and reassess the pupils in 30 minutes" },
                { id: "d", text: "Administer the prescribed PRN acetaminophen for a possible headache" }
            ],
            correct: "b",
            rationale: {
                correct: "A unilaterally dilated (6 mm), fixed (non-reactive) pupil with a declining level of consciousness is a NEUROLOGICAL EMERGENCY indicating increased intracranial pressure (ICP) with uncal herniation. The expanding mass (hemorrhage, edema) is pushing the temporal lobe against the tentorium, compressing cranial nerve III (oculomotor) on the ipsilateral side. This causes the pupil to dilate and become non-reactive. Immediate provider notification is required — the patient may need emergent surgical decompression.",
                a: "Physiological anisocoria (benign pupil size difference) does exist in ~20% of the population, but it is typically mild (≤1 mm difference) and both pupils are reactive. A 3 mm difference (6 mm vs 3 mm) with a NON-REACTIVE pupil and declining consciousness is NEVER benign — this is a clinical emergency.",
                c: "Waiting 30 minutes in this situation could be fatal. Brain herniation is a time-critical emergency where minutes matter. Reassessing later would delay life-saving intervention.",
                d: "Acetaminophen does not address the underlying emergency. The declining LOC and pupil changes indicate a structural brain problem, not a simple headache. Additionally, analgesics could mask neurological signs."
            },
            testTakingTip: "Pupil assessment emergencies: unilateral fixed/dilated pupil + declining LOC = herniation until proven otherwise. 'Blown pupil' = CN III compression = same side as the lesion. Bilateral fixed/dilated pupils = brainstem herniation (very late sign, often irreversible). Normal pupils: 2-5 mm, equal, round, reactive to light (PERRLA).",
            guideSection: "Section 10 — Head-to-Toe Assessment",
            guideSectionId: "head-to-toe"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is documenting an assessment finding. Which documentation entry demonstrates CORRECT objective charting?",
            options: [
                { id: "a", text: "\"Patient is being dramatic about pain and likely drug-seeking.\"" },
                { id: "b", text: "\"Patient seems anxious and appears to be in moderate pain.\"" },
                { id: "c", text: "\"Patient rates pain 7/10 in the right lower quadrant. Grimacing and guarding abdomen. Diaphoretic. Vital signs: BP 148/92, HR 104, RR 22.\"" },
                { id: "d", text: "\"Patient is doing well and has a good attitude about recovery.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "This is correct objective documentation. It includes: a specific pain rating (7/10), anatomical location (right lower quadrant), observable behaviors (grimacing, guarding), measurable findings (diaphoresis), and quantitative vital signs. It uses factual, non-judgmental language and provides data that other providers can use to make clinical decisions.",
                a: "This is SUBJECTIVE, JUDGMENTAL, and potentially discriminatory. Terms like 'dramatic' and 'drug-seeking' are personal opinions, not clinical observations. This type of documentation is legally indefensible and does not meet professional standards. Document behaviors, not interpretations.",
                b: "While less egregious than option A, this entry is still vague and subjective. 'Seems anxious' and 'appears to be in moderate pain' are interpretive. Better: 'Patient states, \"I'm worried about the results.\" Rates pain 5/10. Restless, repeatedly asking about test results.'",
                d: "This is vague, subjective, and clinically useless. 'Doing well' and 'good attitude' are not measurable findings. What is 'well'? Better: 'Patient ambulated 200 feet in hallway with steady gait, no assistive device. Reports pain 2/10. Tolerating regular diet.'"
            },
            testTakingTip: "Documentation rules: Objective, Measurable, Specific, Non-judgmental. Use patient quotes for subjective data (\"I feel dizzy\"). Use numbers (pain 7/10, BP 148/92) over descriptors (moderate pain, high BP). Never document opinions about patient character or motives. If it went to court, would your documentation hold up?",
            guideSection: "Section 12 — Documentation",
            guideSectionId: "documentation"
        },
        {
            id: 8,
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is performing a rapid assessment on a patient found unresponsive in bed during hourly rounding. The patient's pulse is present but weak. Place the nurse's rapid response actions in the correct priority sequence.",
            options: [
                { id: "a", text: "Stimulate the patient and assess responsiveness: tap shoulders, call name loudly, apply a trapezius squeeze" },
                { id: "b", text: "Open the airway (head-tilt chin-lift) and assess breathing: look, listen, feel for 10 seconds" },
                { id: "c", text: "Call for help — activate the rapid response team and request the crash cart at bedside" },
                { id: "d", text: "Obtain a full set of vital signs, blood glucose, and SpO2 — perform a focused neurological assessment (GCS, pupils, motor response)" },
                { id: "e", text: "Establish IV access (if not already present), administer oxygen, and prepare to give naloxone if opioid overdose is suspected" }
            ],
            correct: ["a", "c", "b", "d", "e"],
            rationale: {
                correct: "The correct sequence follows the systematic approach to an unresponsive patient: establish unresponsiveness, get help, assess ABCs, gather objective data, and initiate interventions.",
                a: "FIRST — Determine responsiveness. Stimulate the patient with a firm shoulder tap, loud voice, and trapezius squeeze (a central pain stimulus). This differentiates true unresponsiveness from deep sleep. The response also provides initial GCS data (Eye and Motor components).",
                c: "SECOND — Call for help immediately. An unresponsive patient needs the rapid response team regardless of the cause. Do not wait to complete the full assessment before activating help. One rescuer should call while you continue assessment.",
                b: "THIRD — Assess the airway and breathing. Open the airway using head-tilt chin-lift (or jaw thrust if cervical spine injury is suspected). Look for chest rise, listen for breath sounds, feel for air movement. If the patient is breathing, place in recovery position.",
                d: "FOURTH — Obtain objective data: vital signs (BP, HR, RR, Temp, SpO2), blood glucose (hypoglycemia is a reversible cause), and focused neurological assessment (GCS score, pupil response, symmetry of motor response). This data guides treatment and communication with the arriving team.",
                e: "FIFTH — Initiate interventions based on assessment: IV access for medication administration, oxygen therapy for any unresponsive patient, and naloxone (Narcan) if opioid overdose is suspected (pinpoint pupils, RR <8, recent opioid administration). Have suction available."
            },
            testTakingTip: "Unresponsive patient: Assess responsiveness → Call for help → ABCs → Vitals/glucose/neuro → Interventions. ALWAYS check blood glucose on an unresponsive patient — hypoglycemia is the most common reversible cause of altered consciousness. Naloxone if opioids suspected (pinpoint pupils, respiratory depression). Don't forget: pulse is present, so this is NOT a cardiac arrest protocol.",
            guideSection: "Section 14 — Critical Findings",
            guideSectionId: "critical-findings"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is completing a Braden Scale assessment for a patient. Which subscale score combination would indicate the HIGHEST overall risk for pressure injury development?",
            options: [
                { id: "a", text: "Sensory Perception: 1, Moisture: 1, Activity: 1, Mobility: 1, Nutrition: 1, Friction/Shear: 1 (Total: 6)" },
                { id: "b", text: "Sensory Perception: 3, Moisture: 3, Activity: 2, Mobility: 3, Nutrition: 3, Friction/Shear: 2 (Total: 16)" },
                { id: "c", text: "Sensory Perception: 4, Moisture: 4, Activity: 3, Mobility: 4, Nutrition: 3, Friction/Shear: 3 (Total: 21)" },
                { id: "d", text: "Sensory Perception: 2, Moisture: 2, Activity: 2, Mobility: 2, Nutrition: 2, Friction/Shear: 2 (Total: 12)" }
            ],
            correct: "a",
            rationale: {
                correct: "A Braden Scale score of 6 is the LOWEST possible score and indicates the HIGHEST risk for pressure injury. This patient has the worst score in every subscale: completely limited sensory perception, constantly moist skin, bedfast, completely immobile, very poor nutrition, and a significant friction/shear problem. This patient needs the most aggressive prevention protocol available.",
                b: "A score of 16 indicates MILD risk (15-18 = Mild Risk). This patient has some limitations but retains significant protective factors. Standard prevention measures are indicated.",
                c: "A score of 21 indicates NO SIGNIFICANT RISK (19-23 = Not At Risk). This patient has good scores across all subscales and only needs routine care and reassessment.",
                d: "A score of 12 indicates HIGH risk (10-12 = High Risk). While concerning, this is not the highest possible risk — option A with a score of 6 represents the worst-case scenario."
            },
            testTakingTip: "Braden Scale: Total range 6-23. Lower score = Higher risk (counterintuitive!). Risk categories: ≤9 = Very High, 10-12 = High, 13-14 = Moderate, 15-18 = Mild, 19-23 = Not at risk. Each subscale (except Friction/Shear which is 1-3) ranges from 1-4, where 1 = worst function. Know the subscale categories: Sensory Perception, Moisture, Activity, Mobility, Nutrition, Friction/Shear.",
            guideSection: "Section 6 — Braden Scale",
            guideSectionId: "braden-scale"
        },
        {
            id: 10,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Immediately Reportable", "Continue Monitoring"],
            stem: "A nurse is performing assessments on multiple patients during an evening shift. For each finding, classify whether it is immediately reportable to the provider or whether the nurse should continue monitoring with routine assessment.",
            options: [
                { id: "a", text: "A post-operative patient with a new-onset oxygen saturation of 89% on room air" },
                { id: "b", text: "A patient with heart failure who gained 1.5 pounds overnight" },
                { id: "c", text: "A diabetic patient with a blood glucose of 42 mg/dL who is diaphoretic and tremulous" },
                { id: "d", text: "A patient on warfarin whose INR is 5.8 with no active bleeding" },
                { id: "e", text: "A post-operative patient whose pain decreased from 8/10 to 4/10 after prescribed analgesic administration" }
            ],
            correct: { a: "Immediately Reportable", b: "Continue Monitoring", c: "Immediately Reportable", d: "Immediately Reportable", e: "Continue Monitoring" },
            rationale: {
                correct: "Critical findings that represent immediate threats to patient safety require urgent provider notification. Expected changes or findings within parameters warrant continued monitoring.",
                a: "IMMEDIATELY REPORTABLE — SpO2 89% is below the critical threshold of 90%. In a post-operative patient, this could indicate atelectasis, pneumonia, pulmonary embolism, or respiratory depression from opioids. Apply supplemental oxygen and notify the provider immediately.",
                b: "CONTINUE MONITORING — A weight gain of 1.5 pounds overnight in a heart failure patient warrants monitoring and may indicate fluid retention, but the threshold for provider notification is typically ≥2-3 pounds in 24 hours or ≥5 pounds in one week. Document and continue daily weight monitoring. Assess for other signs of fluid overload (edema, crackles, JVD).",
                c: "IMMEDIATELY REPORTABLE — Blood glucose 42 mg/dL is severe hypoglycemia (<70 mg/dL = hypoglycemia, <54 mg/dL = clinically significant). The patient is symptomatic (diaphoretic, tremulous). Administer 15-20g of fast-acting glucose per the Rule of 15 and notify the provider. Severe hypoglycemia can cause seizures, LOC, and death.",
                d: "IMMEDIATELY REPORTABLE — INR 5.8 is critically elevated (therapeutic range for most conditions: 2.0-3.0). An INR >4.0 carries significant hemorrhage risk, and >5.0 is often considered a critical value requiring immediate notification. The patient needs the warfarin held and may need vitamin K administration, even without active bleeding.",
                e: "CONTINUE MONITORING — A pain reduction from 8/10 to 4/10 after prescribed analgesic indicates the medication is effective. This is a positive therapeutic response. Document the finding and reassess per protocol (typically 30-60 minutes after IV, 60-90 minutes after PO). No provider notification needed."
            },
            labValues: [
                { name: "SpO2 Critical", normal: "≥94% (COPD patients: ≥88-92%)" },
                { name: "Blood Glucose", normal: "70–100 mg/dL fasting; <180 mg/dL random" },
                { name: "INR (on warfarin)", normal: "2.0–3.0 (mechanical valve: 2.5–3.5)" },
                { name: "Weight Gain Alert (HF)", normal: "Report >2-3 lbs/24 hrs or >5 lbs/week" }
            ],
            testTakingTip: "Critical values that require IMMEDIATE notification: SpO2 <90%, Blood glucose <50 or >400 mg/dL, INR >5.0, K+ <3.0 or >6.0, Na+ <120 or >160, Temp >104°F, new-onset unilateral weakness, chest pain with ECG changes. When in doubt, notify the provider — it's safer to over-communicate than to miss a critical finding.",
            guideSection: "Section 14 — Critical Findings",
            guideSectionId: "critical-findings"
        }
    ]
};
