/**
 * Quiz Bank — Hypertension
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "htn-qb-001",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing a patient's home blood pressure log and notices readings taken immediately after the patient's morning coffee. The nurse understands that caffeine intake before measurement can affect results in which way?",
        options: [
            { id: "a", text: "Caffeine causes a transient increase in blood pressure" },
            { id: "b", text: "Caffeine causes a sustained decrease in blood pressure" },
            { id: "c", text: "Caffeine only affects diastolic pressure" },
            { id: "d", text: "Caffeine has no clinically significant effect on blood pressure" }
        ],
        correct: "a",
        rationale: {
            correct: "Caffeine causes a transient increase in blood pressure (typically 5-15 mmHg systolic) through catecholamine release and adenosine receptor blockade. Guidelines recommend avoiding caffeine for at least 30 minutes before measurement. This differs from cuff-sizing errors, which produce consistently false readings."
        },
        testTakingTip: "Caffeine, smoking, and exercise all transiently elevate BP. The guideline recommendation is to avoid all three for at least 30 minutes before taking a reading.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "htn-qb-002",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "application",
        stem: "A 52-year-old patient with newly diagnosed Stage 1 hypertension (BP 135/86) and no other cardiovascular risk factors asks the nurse about treatment. Based on current guidelines, which response by the nurse is most appropriate?",
        options: [
            { id: "a", text: "\"You will need to start an ACE inhibitor right away.\"" },
            { id: "b", text: "\"Lifestyle modifications alone are recommended for the first 3-6 months.\"" },
            { id: "c", text: "\"A beta-blocker is the first choice for uncomplicated hypertension.\"" },
            { id: "d", text: "\"Your blood pressure is only mildly elevated, so no treatment is needed.\"" }
        ],
        correct: "b",
        rationale: {
            correct: "For Stage 1 hypertension (130-139/80-89) without additional cardiovascular risk factors, the 2017 ACC/AHA guidelines recommend a trial of lifestyle modifications (diet, exercise, weight loss, sodium reduction) for 3-6 months before initiating pharmacotherapy. ACE inhibitors and other medications are first-line options when medication is indicated, but beta-blockers are NOT first-line for uncomplicated HTN."
        },
        testTakingTip: "Stage 1 HTN + no other risk factors = try lifestyle first. Stage 1 HTN + ASCVD risk ≥10% = lifestyle + medication. Stage 2 HTN = medication from the start.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "management"
    },

    {
        id: "htn-qb-003",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is educating a patient about their new prescription for amlodipine. Which statement indicates the patient needs additional teaching?",
        options: [
            { id: "a", text: "\"I should check my ankles for swelling while taking this medication.\"" },
            { id: "b", text: "\"I need to avoid grapefruit juice while on this medication.\"" },
            { id: "c", text: "\"I should monitor my potassium levels regularly.\"" },
            { id: "d", text: "\"I might feel some flushing or headache when I first start it.\"" }
        ],
        correct: "c",
        rationale: {
            correct: "Amlodipine is a calcium channel blocker (CCB). Potassium monitoring is associated with ACE inhibitors, ARBs, and diuretics — not CCBs. CCBs do not affect potassium levels. Peripheral edema, grapefruit interaction (CYP3A4), and vasodilatory side effects (flushing, headache) are all real concerns with amlodipine."
        },
        testTakingTip: "Know which drug classes affect potassium: ACE-I/ARBs can increase K+, thiazides/loops decrease K+, CCBs do NOT affect K+. This is a common NCLEX distractor.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    {
        id: "htn-qb-004",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "application",
        stem: "A 34-year-old woman presents with a BP of 168/102 at 28 weeks gestation, proteinuria of 450 mg/24 hours, and new-onset headache. The nurse recognizes these findings are most consistent with which condition?",
        options: [
            { id: "a", text: "Gestational hypertension" },
            { id: "b", text: "Chronic hypertension with superimposed preeclampsia" },
            { id: "c", text: "Preeclampsia without severe features" },
            { id: "d", text: "Preeclampsia with severe features" }
        ],
        correct: "d",
        rationale: {
            correct: "Preeclampsia with severe features is defined by BP ≥160/110 PLUS proteinuria (≥300 mg/24h) PLUS symptoms such as headache, visual disturbances, or epigastric pain. This patient has BP 168/102 (≥160 systolic), proteinuria at 450 mg, and new-onset headache — all meeting criteria for severe features. Preeclampsia without severe features would have BP <160/110. Gestational HTN has no proteinuria."
        },
        testTakingTip: "The dividing line for 'severe features' in preeclampsia is BP ≥160/110, plus end-organ involvement (headache, visual changes, liver enzymes, low platelets, renal insufficiency).",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "pregnancy-htn"
    },

    {
        id: "htn-qb-005",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "analysis",
        stem: "A 28-year-old patient with resistant hypertension (uncontrolled on three medications including a diuretic) has episodic headaches, palpitations, and diaphoresis. The nurse suspects secondary hypertension. Which diagnostic finding would most strongly support this suspicion?",
        options: [
            { id: "a", text: "Elevated serum creatinine" },
            { id: "b", text: "Low TSH with elevated free T4" },
            { id: "c", text: "Elevated 24-hour urine catecholamines and metanephrines" },
            { id: "d", text: "Elevated fasting blood glucose" }
        ],
        correct: "c",
        rationale: {
            correct: "The classic triad of episodic headaches, palpitations, and diaphoresis combined with resistant hypertension in a young patient strongly suggests pheochromocytoma — an adrenal tumor producing excess catecholamines. The confirmatory test is 24-hour urine catecholamines and metanephrines. While elevated creatinine (renal disease) and thyroid dysfunction can cause secondary HTN, the episodic symptom triad is pathognomonic for pheochromocytoma."
        },
        testTakingTip: "Classic triad for pheochromocytoma: Headache + Palpitations + Perspiration (diaphoresis). Think 'H-P-P' in a young patient with resistant hypertension.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "secondary-htn"
    },

    {
        id: "htn-qb-006",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with hypertension controlled on lisinopril 20 mg daily reports to the clinic. Their BP today is 156/98. The nurse reviews the medication reconciliation and discovers the patient recently started ibuprofen 600 mg TID for knee pain. Which explanation best accounts for the elevated reading?",
        options: [
            { id: "a", text: "Ibuprofen directly stimulates the renin-angiotensin system" },
            { id: "b", text: "NSAIDs cause sodium and water retention, counteracting ACE inhibitor effects" },
            { id: "c", text: "Ibuprofen increases hepatic metabolism of lisinopril" },
            { id: "d", text: "The combination produces rebound hypertension" }
        ],
        correct: "b",
        rationale: {
            correct: "NSAIDs (including ibuprofen) inhibit prostaglandin synthesis in the kidneys, leading to sodium and water retention. This directly counteracts the effects of ACE inhibitors and other antihypertensives. NSAIDs can raise BP by 5-10 mmHg on average. They do not stimulate the RAS directly or alter hepatic metabolism of ACE inhibitors. This is a drug interaction, not rebound hypertension."
        },
        testTakingTip: "NSAIDs are one of the most common causes of drug-induced blood pressure elevation. They oppose almost every class of antihypertensive by promoting sodium retention.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    {
        id: "htn-qb-007",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "application",
        stem: "A nurse is caring for a patient receiving IV nitroprusside for hypertensive emergency with BP 240/140 and acute encephalopathy. After 1 hour of treatment, the BP is 168/96. Which assessment finding should concern the nurse most?",
        options: [
            { id: "a", text: "The patient reports a mild headache" },
            { id: "b", text: "The patient's urine output is 45 mL/hour" },
            { id: "c", text: "The patient develops slurred speech and left-sided weakness" },
            { id: "d", text: "The patient's heart rate is 88 bpm" }
        ],
        correct: "c",
        rationale: {
            correct: "The BP dropped from 240/140 to 168/96 — a reduction of 72 mmHg systolic in 1 hour. While the target is to reduce MAP by no more than 25% in the first hour, this large decrease may have caused cerebral hypoperfusion. New neurological deficits (slurred speech, hemiparesis) suggest ischemic stroke from too-rapid blood pressure reduction. Chronically hypertensive patients have shifted their cerebral autoregulation curve rightward and cannot tolerate sudden drops."
        },
        testTakingTip: "Too-rapid BP reduction in hypertensive emergency can cause watershed infarction. Watch for new neurological deficits — they indicate the brain isn't perfusing at the lower pressure.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "emergency"
    },

    {
        id: "htn-qb-008",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with hypertension and a history of gout asks the nurse which medication class they should avoid. The nurse should advise caution with which class?",
        options: [
            { id: "a", text: "ACE inhibitors" },
            { id: "b", text: "Calcium channel blockers" },
            { id: "c", text: "Thiazide diuretics" },
            { id: "d", text: "ARBs" }
        ],
        correct: "c",
        rationale: {
            correct: "Thiazide diuretics (hydrochlorothiazide, chlorthalidone) reduce uric acid excretion, leading to hyperuricemia. This can precipitate gout flares in susceptible patients. ACE inhibitors, ARBs, and CCBs do not significantly affect uric acid levels. Losartan (an ARB) actually has mild uricosuric properties."
        },
        testTakingTip: "Thiazides cause three key metabolic effects: hyperuricemia (gout risk), hypokalemia, and hyperglycemia. Remember 'hyper-hypo-hyper' for their metabolic side effects.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    {
        id: "htn-qb-009",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "analysis",
        stem: "A 45-year-old African American male with Stage 2 hypertension (BP 162/100) and no comorbidities is being started on pharmacotherapy. Based on guideline recommendations for this population, which initial regimen is most appropriate?",
        options: [
            { id: "a", text: "Lisinopril 10 mg daily" },
            { id: "b", text: "Amlodipine 5 mg plus chlorthalidone 12.5 mg daily" },
            { id: "c", text: "Metoprolol succinate 50 mg daily" },
            { id: "d", text: "Losartan 50 mg daily" }
        ],
        correct: "b",
        rationale: {
            correct: "For Black patients without comorbidities (no CKD, no diabetes), guidelines recommend thiazide-type diuretics or CCBs as first-line — NOT ACE-I or ARBs, which show reduced efficacy in this population due to lower renin activity. Stage 2 hypertension (≥140/90) also warrants initiating TWO-drug therapy rather than monotherapy. Beta-blockers are not first-line for uncomplicated HTN in any population."
        },
        testTakingTip: "Two rules converge here: (1) Black patients → CCB or thiazide preferred over ACE-I/ARB, and (2) Stage 2 HTN → start with two drugs. The combination of CCB + thiazide satisfies both.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    {
        id: "htn-qb-010",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "application",
        stem: "A patient calls the nurse advice line after discovering they ran out of clonidine 3 days ago and could not refill it. The patient reports a severe headache, tremors, and BP of 198/110. The nurse recognizes this presentation as which phenomenon?",
        options: [
            { id: "a", text: "White coat hypertension" },
            { id: "b", text: "Rebound hypertension from abrupt clonidine discontinuation" },
            { id: "c", text: "Malignant hypertension from disease progression" },
            { id: "d", text: "Pseudohypertension from arterial calcification" }
        ],
        correct: "b",
        rationale: {
            correct: "Abrupt discontinuation of clonidine (a centrally-acting alpha-2 agonist) causes rebound hypertension due to sudden catecholamine surge. Symptoms include severe headache, tremors, tachycardia, and dangerously elevated BP — sometimes exceeding baseline levels. Clonidine should always be tapered, never stopped suddenly. This is a medical emergency requiring immediate evaluation."
        },
        testTakingTip: "Clonidine and beta-blockers are the two antihypertensive classes most associated with dangerous rebound hypertension when stopped abruptly. Always taper, never stop suddenly.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    {
        id: "htn-qb-011",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with hypertension and bilateral renal artery stenosis is being evaluated for medication therapy. The nurse should question an order for which medication?",
        options: [
            { id: "a", text: "Amlodipine" },
            { id: "b", text: "Hydrochlorothiazide" },
            { id: "c", text: "Enalapril" },
            { id: "d", text: "Labetalol" }
        ],
        correct: "c",
        rationale: {
            correct: "ACE inhibitors (enalapril) and ARBs are contraindicated in bilateral renal artery stenosis. These kidneys depend on angiotensin II to maintain efferent arteriolar tone and glomerular filtration. Blocking this mechanism can cause acute kidney injury and precipitous decline in GFR. CCBs, diuretics, and beta-blockers are safer alternatives in this scenario."
        },
        testTakingTip: "ACE-I/ARB contraindications to memorize: bilateral renal artery stenosis, pregnancy, angioedema history, hyperkalemia. Bilateral RAS is a classic NCLEX question.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    // ── ORDERING (5) ────────────────────────────────────────

    {
        id: "htn-qb-012",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "ordering",
        difficulty: "application",
        stem: "A patient presents to the clinic for a new-patient visit. During vital signs, the blood pressure reads 148/92. The patient has no known history of hypertension. Place the nurse's actions in the correct sequence for confirming and managing this finding.",
        options: [
            { id: "s1", text: "Allow the patient to rest quietly for 5 minutes in a seated position" },
            { id: "s2", text: "Remeasure blood pressure in both arms using correct technique" },
            { id: "s3", text: "Verify the cuff size is appropriate for the patient's arm circumference" },
            { id: "s4", text: "Document findings and schedule a follow-up visit within 1 month for repeat measurements" },
            { id: "s5", text: "Educate the patient on home blood pressure monitoring between visits" }
        ],
        correct: ["s1", "s3", "s2", "s4", "s5"],
        rationale: {
            s1: "The patient must first rest for 5 minutes to reduce acute stress and activity effects on the reading. An initial elevated reading may reflect anxiety, recent exertion, or the clinic environment.",
            s3: "Before remeasuring, verify the cuff size. An ill-fitting cuff produces inaccurate readings — too small reads high, too large reads low.",
            s2: "Remeasure in both arms using correct technique (supported arm at heart level, feet flat on floor). Use the arm with the higher reading for future measurements. A single elevated reading does not diagnose hypertension.",
            s4: "Document the bilateral readings and schedule a follow-up within 1 month. Hypertension diagnosis requires elevated readings on 2 or more separate occasions (or ambulatory/home monitoring confirmation).",
            s5: "Educate on home monitoring so the patient can provide readings from their natural environment. This helps rule out white coat hypertension and establishes a pattern for the next visit."
        },
        testTakingTip: "A single elevated BP does NOT equal a hypertension diagnosis. The process is: rest → proper equipment → remeasure → confirm on a separate occasion → diagnose.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "htn-qb-013",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is preparing to administer IV labetalol to a patient in hypertensive emergency with BP 232/128 and papilledema. Place the nursing actions in priority order.",
        options: [
            { id: "s1", text: "Verify IV access patency and connect the patient to continuous cardiac monitoring" },
            { id: "s2", text: "Administer IV labetalol per protocol and start an arterial line if available" },
            { id: "s3", text: "Assess BP every 5 minutes during active titration, targeting a 25% MAP reduction in the first hour" },
            { id: "s4", text: "Perform focused neurological assessment and document baseline mental status" },
            { id: "s5", text: "Gradually reduce BP toward 160/100 over the next 2-6 hours once initial target is met" }
        ],
        correct: ["s4", "s1", "s2", "s3", "s5"],
        rationale: {
            s4: "Baseline neurological assessment must come first. With papilledema already present, establishing mental status and neurological baseline is critical before treatment begins, as any decline during treatment could indicate cerebral hypoperfusion.",
            s1: "IV access and continuous monitoring are essential before administering vasoactive medications. Cardiac monitoring detects arrhythmias that labetalol (a beta-blocker) could cause.",
            s2: "Administer IV labetalol once monitoring is in place. An arterial line provides real-time BP accuracy, which is ideal for titration during aggressive treatment.",
            s3: "Frequent BP checks (every 5 minutes during titration) ensure the 25% MAP reduction target is not exceeded in the first hour. Overshooting this target risks cerebral ischemia.",
            s5: "After the initial safe reduction, gradually lower BP toward 160/100 over the next 2-6 hours. Too-rapid normalization risks watershed infarction."
        },
        testTakingTip: "In hypertensive emergency, always assess baseline neuro status BEFORE dropping BP. If the patient worsens neurologically during treatment, you need that comparison point.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "emergency"
    },

    {
        id: "htn-qb-014",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "ordering",
        difficulty: "analysis",
        stem: "A nurse in the obstetric unit receives a patient at 35 weeks gestation with BP 172/108, 3+ proteinuria on dipstick, and complaints of severe right upper quadrant pain and visual disturbances. Place the nurse's actions in the correct priority order.",
        options: [
            { id: "s1", text: "Administer IV magnesium sulfate bolus per protocol for seizure prophylaxis" },
            { id: "s2", text: "Place the patient on continuous fetal monitoring and assess fetal heart rate pattern" },
            { id: "s3", text: "Administer IV hydralazine or labetalol to lower blood pressure below 160/110" },
            { id: "s4", text: "Draw STAT labs including CBC, CMP, LDH, and uric acid to assess for HELLP syndrome" },
            { id: "s5", text: "Notify the obstetrician and neonatal team for potential emergent delivery" }
        ],
        correct: ["s5", "s2", "s3", "s1", "s4"],
        rationale: {
            s5: "Immediate provider notification is the first priority. This presentation — severe-range BP, proteinuria, RUQ pain, and visual changes — strongly suggests preeclampsia with severe features and possibly HELLP syndrome. The physician needs to be at bedside for management decisions including potential emergent delivery.",
            s2: "Fetal monitoring establishes fetal status. Placental perfusion may be compromised at these pressures, and fetal distress may accelerate the delivery timeline.",
            s3: "Lowering BP below 160/110 with IV antihypertensives is urgent to prevent maternal stroke and placental abruption. Hydralazine or labetalol are the standard agents in pregnancy.",
            s1: "Magnesium sulfate for seizure prophylaxis is essential in severe preeclampsia. Eclamptic seizures are a leading cause of maternal mortality. The loading dose is 4-6g IV over 15-20 minutes.",
            s4: "STAT labs assess for HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets). RUQ pain may indicate hepatic involvement. Results guide delivery timing."
        },
        testTakingTip: "In severe preeclampsia: notify provider first (this changes the plan of care), then fetal status, then treat the BP and prevent seizures. Labs are important but don't delay treatment.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "pregnancy-htn"
    },

    {
        id: "htn-qb-015",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A patient newly diagnosed with hypertension is being counseled on non-pharmacological interventions. Place the following lifestyle modifications in order of their approximate blood pressure-lowering effect, from GREATEST reduction to LEAST.",
        options: [
            { id: "s1", text: "Weight loss of 10 kg in an overweight patient (approximately 5-20 mmHg reduction)" },
            { id: "s2", text: "Adopting the DASH dietary pattern (approximately 8-14 mmHg reduction)" },
            { id: "s3", text: "Reducing sodium intake to less than 1,500 mg/day (approximately 5-8 mmHg reduction)" },
            { id: "s4", text: "Regular aerobic exercise 30 minutes most days (approximately 4-9 mmHg reduction)" },
            { id: "s5", text: "Limiting alcohol to 1-2 drinks per day (approximately 2-4 mmHg reduction)" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Weight loss provides the largest BP reduction — approximately 1 mmHg per kg lost, with 10 kg loss yielding 5-20 mmHg reduction. This has the strongest evidence base.",
            s2: "The DASH diet (rich in fruits, vegetables, whole grains, low-fat dairy, and low in saturated fat) reduces BP by 8-14 mmHg. This is the dietary intervention with the greatest impact.",
            s3: "Sodium restriction to <1,500 mg/day reduces BP by approximately 5-8 mmHg. Even modest restriction to <2,300 mg/day provides benefit.",
            s4: "Regular aerobic exercise (150 minutes/week) reduces BP by 4-9 mmHg. Both aerobic and dynamic resistance training are beneficial.",
            s5: "Alcohol moderation reduces BP by 2-4 mmHg. While the smallest single reduction, it also reduces cardiovascular risk through other mechanisms."
        },
        testTakingTip: "For magnitude of BP reduction from lifestyle changes, remember: Weight loss > DASH diet > sodium restriction > exercise > alcohol moderation. Weight loss is the single most effective non-drug intervention.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "lifestyle"
    },

    {
        id: "htn-qb-016",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "ordering",
        difficulty: "analysis",
        stem: "A nurse is conducting a medication reconciliation for a patient with poorly controlled hypertension on lisinopril 40 mg, amlodipine 10 mg, and HCTZ 25 mg. Despite maximum doses, the BP remains 158/96. Place the nurse's assessment steps in the correct troubleshooting order.",
        options: [
            { id: "s1", text: "Assess medication adherence by asking the patient to describe their daily medication routine" },
            { id: "s2", text: "Review for interfering substances (NSAIDs, decongestants, oral contraceptives, excessive sodium)" },
            { id: "s3", text: "Evaluate for secondary hypertension causes (renal bruits, episodic symptoms, young age)" },
            { id: "s4", text: "Verify the patient is taking medications at the correct doses and times" },
            { id: "s5", text: "Confirm proper home BP measurement technique to rule out measurement error" }
        ],
        correct: ["s5", "s1", "s4", "s2", "s3"],
        rationale: {
            s5: "First confirm the elevated readings are accurate. Improper technique (arm unsupported, talking during measurement, wrong cuff) is a common and easily correctable cause of apparent treatment resistance.",
            s1: "Medication non-adherence is the single most common cause of apparent resistant hypertension. Up to 50% of patients with 'resistant' HTN have adherence issues.",
            s4: "Even adherent patients may have errors — wrong doses, incorrect timing, or confusion between similar medications. Verify the actual regimen matches what was prescribed.",
            s2: "Drug interactions are the next most common cause. NSAIDs, pseudoephedrine, oral contraceptives, and excess dietary sodium can all elevate BP despite treatment.",
            s3: "Secondary hypertension evaluation comes last, after common causes are excluded. Consider this in patients with resistant HTN, young age, or suggestive symptoms (episodic headaches/palpitations, renal bruits, hypokalemia)."
        },
        testTakingTip: "Resistant hypertension troubleshooting follows a 'common things first' approach: measurement error → non-adherence → dosing errors → drug interactions → secondary causes.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "management"
    },

    // ── MATRIX (4) ──────────────────────────────────────────

    {
        id: "htn-qb-017",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each clinical scenario, indicate whether the patient is experiencing a hypertensive urgency or hypertensive emergency.",
        columns: ["Hypertensive Urgency", "Hypertensive Emergency"],
        rows: [
            { id: "r1", text: "BP 196/118 with a severe headache, no focal neurological deficits, and a normal fundoscopic exam", correct: "Hypertensive Urgency" },
            { id: "r2", text: "BP 210/130 with acute chest pain, ST-elevation on ECG, and troponin elevation", correct: "Hypertensive Emergency" },
            { id: "r3", text: "BP 188/110 with a nosebleed and anxiety but no other symptoms", correct: "Hypertensive Urgency" },
            { id: "r4", text: "BP 224/126 with sudden-onset hemiparesis, aphasia, and altered consciousness", correct: "Hypertensive Emergency" },
            { id: "r5", text: "BP 202/114 with acute pulmonary edema, bilateral crackles, and pink frothy sputum", correct: "Hypertensive Emergency" },
            { id: "r6", text: "BP 180/108 in a non-adherent patient, asymptomatic with normal labs and ECG", correct: "Hypertensive Urgency" }
        ],
        rationale: {
            correct: "The critical distinction is end-organ damage. Hypertensive emergency = severely elevated BP WITH acute end-organ damage (stroke, MI, pulmonary edema, aortic dissection, eclampsia, acute kidney injury). Hypertensive urgency = severely elevated BP (>180/120) WITHOUT end-organ damage. Emergencies require IV medications and ICU admission. Urgencies are managed with oral medications and outpatient follow-up within 24-48 hours."
        },
        testTakingTip: "It's not about the number — it's about the organs. A BP of 200/120 with no symptoms is urgency. A BP of 180/110 with pulmonary edema is an emergency. Always look for the end-organ damage clue.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "emergency"
    },

    {
        id: "htn-qb-018",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each antihypertensive medication, identify its PRIMARY side effect that the nurse should monitor for.",
        columns: ["Hyperkalemia", "Hypokalemia", "Peripheral Edema", "Bradycardia"],
        rows: [
            { id: "r1", text: "Lisinopril (ACE inhibitor)", correct: "Hyperkalemia" },
            { id: "r2", text: "Hydrochlorothiazide (thiazide diuretic)", correct: "Hypokalemia" },
            { id: "r3", text: "Amlodipine (calcium channel blocker)", correct: "Peripheral Edema" },
            { id: "r4", text: "Metoprolol (beta-blocker)", correct: "Bradycardia" },
            { id: "r5", text: "Spironolactone (potassium-sparing diuretic)", correct: "Hyperkalemia" },
            { id: "r6", text: "Furosemide (loop diuretic)", correct: "Hypokalemia" }
        ],
        rationale: {
            correct: "ACE inhibitors and potassium-sparing diuretics (spironolactone) both promote potassium retention → hyperkalemia. Thiazide and loop diuretics promote potassium excretion → hypokalemia. Dihydropyridine CCBs (amlodipine) cause vasodilation with reflex edema in the ankles. Beta-blockers slow the heart rate → bradycardia. Knowing the primary side effect of each class is essential for monitoring and patient education."
        },
        testTakingTip: "Group by potassium effect: K+ UP = ACE-I, ARBs, K-sparing diuretics. K+ DOWN = thiazides, loops. This guides lab monitoring priorities.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    {
        id: "htn-qb-019",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each patient with hypertension and a comorbidity, identify the PREFERRED first-line antihypertensive class.",
        columns: ["ACE Inhibitor or ARB", "Thiazide Diuretic", "Calcium Channel Blocker", "Beta-Blocker"],
        rows: [
            { id: "r1", text: "55-year-old with type 2 diabetes and microalbuminuria", correct: "ACE Inhibitor or ARB" },
            { id: "r2", text: "60-year-old with isolated systolic hypertension and osteoporosis", correct: "Thiazide Diuretic" },
            { id: "r3", text: "50-year-old with hypertension and Raynaud's phenomenon", correct: "Calcium Channel Blocker" },
            { id: "r4", text: "45-year-old with hypertension and stable heart failure with reduced ejection fraction", correct: "ACE Inhibitor or ARB" },
            { id: "r5", text: "58-year-old with hypertension, recent MI, and atrial fibrillation requiring rate control", correct: "Beta-Blocker" },
            { id: "r6", text: "68-year-old African American with hypertension and chronic stable angina", correct: "Calcium Channel Blocker" }
        ],
        rationale: {
            correct: "Medication selection by comorbidity: Diabetes with albuminuria → ACE-I/ARB (renal protection). Osteoporosis → thiazides (reduce calcium excretion, protect bone). Raynaud's → CCB (vasodilation, avoid beta-blockers which worsen vasoconstriction). HFrEF → ACE-I/ARB (mortality benefit). Post-MI with afib → beta-blocker (rate control + post-MI mortality benefit). African American with angina → CCB (effective in this population + anti-anginal)."
        },
        testTakingTip: "Match the drug to the comorbidity: ACE-I = diabetes/renal protection/HF. Thiazide = osteoporosis. CCB = Raynaud's/angina. Beta-blocker = post-MI/rate control. The comorbidity drives the choice.",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "medications"
    },

    {
        id: "htn-qb-020",
        category: "cardiovascular",
        topic: "hypertension",
        topicLabel: "Hypertension",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each clinical finding, indicate whether it is more suggestive of essential (primary) hypertension or secondary hypertension.",
        columns: ["Essential Hypertension", "Secondary Hypertension"],
        rows: [
            { id: "r1", text: "Gradual onset in a 58-year-old with a family history of hypertension and obesity", correct: "Essential Hypertension" },
            { id: "r2", text: "Sudden-onset severe hypertension in a 25-year-old with no family history", correct: "Secondary Hypertension" },
            { id: "r3", text: "Epigastric bruit heard on abdominal auscultation", correct: "Secondary Hypertension" },
            { id: "r4", text: "BP responds well to a single first-line antihypertensive agent", correct: "Essential Hypertension" },
            { id: "r5", text: "Unprovoked hypokalemia with metabolic alkalosis on initial labs", correct: "Secondary Hypertension" },
            { id: "r6", text: "Slowly progressive readings noted over several annual visits", correct: "Essential Hypertension" }
        ],
        rationale: {
            correct: "Essential (primary) hypertension accounts for 90-95% of cases and presents with gradual onset, family history, modifiable risk factors, and typical response to medication. Secondary hypertension clues include: young age at onset, abrupt onset, treatment resistance, abdominal bruit (renal artery stenosis), unprovoked hypokalemia (hyperaldosteronism), episodic symptoms (pheochromocytoma), and truncal obesity with striae (Cushing's). These features should trigger a secondary workup."
        },
        testTakingTip: "Red flags for secondary HTN: young patient, sudden onset, resistant to 3+ drugs, hypokalemia, abdominal bruit, or the pheochromocytoma triad (headache, palpitations, perspiration).",
        relatedGuide: "hypertension.html",
        relatedGuideSection: "secondary-htn"
    }

]);
