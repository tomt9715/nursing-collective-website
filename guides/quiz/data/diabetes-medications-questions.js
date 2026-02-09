/**
 * Diabetes Medications Quiz \u2014 Question Data
 * 10 NCLEX-style questions: 5 Single, 2 Priority, 1 Ordering, 1 Matrix, 1 SATA
 */

/* exported diabetesMedicationsQuizData */
var diabetesMedicationsQuizData = {
    guideName: "Diabetes Medications",
    guideSlug: "diabetes-medications",
    category: "Pharmacology",
    categoryColor: "#3B82F6",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is preparing to administer morning insulin to a patient with Type 1 diabetes who receives NPH insulin and regular insulin. When drawing up both insulins into one syringe, which action should the nurse perform FIRST?",
            options: [
                { id: "a", text: "Draw up the NPH (cloudy) insulin" },
                { id: "b", text: "Inject air into the NPH (cloudy) insulin vial" },
                { id: "c", text: "Draw up the regular (clear) insulin" },
                { id: "d", text: "Roll the NPH insulin vial between the palms" }
            ],
            correct: "b",
            rationale: {
                correct: "When mixing insulins, the first step is to inject air into the NPH vial (equal to the NPH dose) WITHOUT withdrawing insulin. Then inject air into the Regular vial and draw up Regular insulin. Finally, draw up NPH. Air must go into NPH first because you do not want to contaminate the NPH vial with Regular insulin residue on the needle.",
                a: "NPH is drawn up LAST, not first. Drawing up cloudy before clear risks contaminating the Regular vial with NPH particles.",
                c: "Regular insulin is drawn up before NPH, but air must be injected into the NPH vial first. The correct sequence is: air into NPH, air into Regular, draw Regular, then draw NPH.",
                d: "Rolling NPH gently to resuspend the particles is important, but it is a preparation step done before beginning the mixing sequence, not the first step of drawing up."
            },
            testTakingTip: "Remember the mixing sequence: Air-Air-Clear-Cloudy. Inject air into NPH first, then air into Regular, draw Regular (\"RN\" = Regular before NPH), then draw NPH. This prevents NPH contamination of the Regular vial.",
            guideSection: "Section 2 \u2014 Insulin Types & Administration",
            guideSectionId: "insulin-types"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with Type 2 diabetes takes metformin 1000 mg twice daily. The patient is scheduled for a CT scan with IV contrast dye tomorrow morning. What is the nurse\u2019s PRIORITY action?",
            options: [
                { id: "a", text: "Administer the morning metformin dose with a sip of water" },
                { id: "b", text: "Ensure metformin is held and notify the provider" },
                { id: "c", text: "Switch the patient to insulin for the day of the procedure" },
                { id: "d", text: "Increase IV fluid rate to flush the contrast quickly" }
            ],
            correct: "b",
            rationale: {
                correct: "Metformin must be held before IV contrast dye procedures due to the risk of contrast-induced nephropathy, which can impair renal excretion of metformin and precipitate life-threatening lactic acidosis. Current guidelines recommend holding metformin at the time of or before the procedure and not restarting until renal function is confirmed stable (typically 48 hours post-procedure).",
                a: "Administering metformin before a contrast dye procedure increases the risk of lactic acidosis if the contrast impairs kidney function. The drug should be held.",
                c: "Switching to insulin may be needed in some cases, but the priority action is to hold the metformin and communicate with the provider. Insulin substitution is a provider decision, not an independent nursing action.",
                d: "IV hydration is often part of the contrast protocol, but this does not eliminate the need to hold metformin. The two interventions are complementary, and holding metformin is the priority nursing action."
            },
            testTakingTip: "Metformin + contrast dye = hold metformin. This is a classic NCLEX pharmacology question. Also remember: hold metformin 48 hours post-procedure and restart only after confirmed stable renal function (eGFR).",
            guideSection: "Section 3 \u2014 Metformin (Biguanides)",
            guideSectionId: "metformin"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient who takes glipizide (Glucotrol) 10 mg daily for Type 2 diabetes. At 1400, the patient reports feeling shaky, sweaty, and dizzy. The blood glucose reads 58 mg/dL. The patient is alert and oriented. What should the nurse administer?",
            options: [
                { id: "a", text: "Glucagon 1 mg intramuscularly" },
                { id: "b", text: "15 grams of a fast-acting carbohydrate" },
                { id: "c", text: "A meal tray with complex carbohydrates" },
                { id: "d", text: "Dextrose 50% (D50) intravenous push" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient is conscious and able to swallow, so the Rule of 15 applies: give 15 grams of fast-acting carbohydrate (4 oz juice, 3-4 glucose tablets, or 1 tablespoon of honey), recheck glucose in 15 minutes, and repeat if still below 70 mg/dL. Oral treatment is always preferred for conscious patients.",
                a: "IM glucagon is reserved for unconscious patients or those who cannot swallow safely. This patient is alert and oriented, so oral carbohydrates are the appropriate first treatment.",
                c: "A meal tray has complex carbohydrates that take too long to raise blood glucose. The patient needs a fast-acting carbohydrate first, then can follow up with a complex carb/protein snack once glucose normalizes.",
                d: "IV D50 is reserved for severe hypoglycemia in unconscious patients or those who cannot take oral treatment. It is unnecessarily invasive for a conscious patient who can swallow."
            },
            testTakingTip: "Conscious + able to swallow = give oral fast-acting carbs (Rule of 15). Unconscious or unable to swallow = IV D50 or IM glucagon. Always choose the least invasive effective option.",
            labValues: [
                { name: "Blood Glucose", normal: "70\u2013100 mg/dL (fasting)" }
            ],
            guideSection: "Section 8 \u2014 Hypoglycemia Management",
            guideSectionId: "hypoglycemia"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with Type 2 diabetes is started on empagliflozin (Jardiance). Three weeks later, the patient presents to the ED with nausea, vomiting, abdominal pain, and rapid breathing. The blood glucose is 195 mg/dL. What condition should the nurse suspect?",
            options: [
                { id: "a", text: "Hyperglycemic hyperosmolar state (HHS)" },
                { id: "b", text: "Lactic acidosis from metformin" },
                { id: "c", text: "Euglycemic diabetic ketoacidosis (DKA)" },
                { id: "d", text: "Viral gastroenteritis unrelated to the medication" }
            ],
            correct: "c",
            rationale: {
                correct: "SGLT2 inhibitors (empagliflozin, dapagliflozin, canagliflozin) can cause DKA with normal or near-normal blood glucose levels \u2014 called euglycemic DKA. The glucose of 195 mg/dL is not in the typical DKA range (usually >250 mg/dL), which can be misleading. The combination of nausea, vomiting, abdominal pain, and Kussmaul respirations (rapid, deep breathing) with an SGLT2 inhibitor should trigger immediate ketone testing.",
                a: "HHS typically presents with extremely high blood glucose (>600 mg/dL), severe dehydration, and altered mental status. A glucose of 195 mg/dL is far too low for HHS.",
                b: "The patient is on empagliflozin (SGLT2 inhibitor), not metformin. Lactic acidosis is associated with metformin, not SGLT2 inhibitors.",
                d: "While these symptoms can mimic gastroenteritis, dismissing them in a patient on an SGLT2 inhibitor is dangerous. The medication is a known risk factor for euglycemic DKA, and ketone testing is mandatory."
            },
            testTakingTip: "SGLT2 inhibitor + DKA symptoms + \"normal-ish\" glucose = euglycemic DKA. Don\u2019t be fooled by a glucose that seems too low for DKA. Always check ketones when symptomatic on SGLT2 inhibitors.",
            guideSection: "Section 7 \u2014 SGLT2 Inhibitors",
            guideSectionId: "sglt2"
        },
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with Type 2 diabetes is prescribed liraglutide (Victoza). When reviewing the patient\u2019s medical history, which finding should cause the nurse to contact the provider BEFORE administering the first dose?",
            options: [
                { id: "a", text: "BMI of 34 (obese)" },
                { id: "b", text: "Family history of medullary thyroid carcinoma" },
                { id: "c", text: "History of seasonal allergies" },
                { id: "d", text: "Hemoglobin A1c of 9.2%" }
            ],
            correct: "b",
            rationale: {
                correct: "GLP-1 receptor agonists (liraglutide, semaglutide, dulaglutide, exenatide) carry a BLACK BOX WARNING for thyroid C-cell tumors, including medullary thyroid carcinoma (MTC). They are contraindicated in patients with a personal or family history of MTC or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2). The nurse must hold the medication and contact the provider.",
                a: "Obesity (BMI 34) is actually a potential benefit indicator for GLP-1 agonists, as they promote weight loss. This would not warrant holding the medication.",
                c: "Seasonal allergies are not a contraindication for GLP-1 agonists. The nurse should assess for drug-specific allergies, not general allergies.",
                d: "A high A1c of 9.2% is the reason the medication is being prescribed. This indicates poor glucose control and supports the need for additional pharmacotherapy."
            },
            testTakingTip: "GLP-1 agonists = black box for thyroid C-cell tumors. Family OR personal history of medullary thyroid cancer or MEN 2 = absolute contraindication. This is a common NCLEX distractor \u2014 always check the black box warning first.",
            guideSection: "Section 6 \u2014 DPP-4 Inhibitors & GLP-1 Agonists",
            guideSectionId: "incretin-based"
        },
        {
            id: 6,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse finds a patient with Type 1 diabetes unresponsive in bed. The glucometer reads 38 mg/dL. Place the following nursing actions in the correct priority order.",
            options: [
                { id: "a", text: "Position the patient on their side to protect the airway" },
                { id: "b", text: "Administer IV dextrose 50% (D50W) as ordered" },
                { id: "c", text: "Call for help and bring the crash cart to bedside" },
                { id: "d", text: "Recheck blood glucose 15 minutes after treatment" },
                { id: "e", text: "Document the event and notify the provider of insulin dose adjustment" }
            ],
            correct: ["a", "c", "b", "d", "e"],
            rationale: {
                correct: "The priority sequence follows ABCs and patient safety: protect the airway first (unresponsive patient at aspiration risk), call for help and get emergency equipment, administer IV dextrose to correct severe hypoglycemia, recheck glucose to verify treatment effectiveness, then document and follow up with the provider.",
                a: "FIRST \u2014 An unresponsive patient is at high risk for aspiration. Positioning on the side (recovery position) protects the airway and is the fastest independent nursing action.",
                c: "SECOND \u2014 Call for help to ensure resources are available (crash cart, additional staff, IV access if not present). Severe hypoglycemia can lead to seizures or cardiac arrest.",
                b: "THIRD \u2014 IV D50W is the definitive treatment for severe hypoglycemia in an unresponsive patient. NEVER give oral glucose to an unconscious patient due to aspiration risk. If no IV access, administer IM glucagon.",
                d: "FOURTH \u2014 Recheck glucose 15 minutes after IV dextrose to confirm the treatment worked and glucose is rising. Repeat D50 if still critically low.",
                e: "FIFTH \u2014 After the patient is stabilized, document the event, glucose readings, interventions, and patient response. Notify the provider to review the insulin regimen and prevent recurrence."
            },
            testTakingTip: "For an unresponsive patient: safety first (airway/positioning), get help, then treat. NEVER give oral glucose to an unconscious patient. IV D50 or IM glucagon only.",
            guideSection: "Section 8 \u2014 Hypoglycemia Management",
            guideSectionId: "hypoglycemia"
        },
        {
            id: 7,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "A nurse is providing discharge education to a patient newly started on insulin glargine (Lantus) and rapid-acting insulin lispro (Humalog). For each patient statement, determine whether it reflects correct understanding or indicates a need for more teaching.",
            options: [
                { id: "a", text: "\"I take my Lantus at the same time every night and never mix it with my Humalog.\"" },
                { id: "b", text: "\"If I\u2019m not hungry, I skip my Humalog dose since it covers my meals.\"" },
                { id: "c", text: "\"I shake my Lantus pen vigorously before each injection to mix it well.\"" },
                { id: "d", text: "\"I rotate my injection sites within the same body area each week.\"" }
            ],
            correct: { a: "Correct Understanding", b: "Correct Understanding", c: "Needs More Teaching", d: "Correct Understanding" },
            rationale: {
                correct: "Correct statements demonstrate understanding of Lantus timing/mixing rules, meal-based rapid-acting dosing, and site rotation. Shaking Lantus vigorously is incorrect \u2014 it is a clear solution that does not need mixing, and vigorous shaking can damage the insulin protein.",
                a: "CORRECT UNDERSTANDING \u2014 Glargine (Lantus) is a long-acting basal insulin given once daily at the same time. It must NEVER be mixed with other insulins because its acidic pH causes precipitation and unpredictable absorption.",
                b: "CORRECT UNDERSTANDING \u2014 Rapid-acting insulin (lispro/Humalog) is a mealtime bolus insulin. If the patient skips a meal, they should skip the rapid-acting dose to prevent hypoglycemia. This is similar to the \"no meal, no pill\" concept for meglitinides.",
                c: "NEEDS MORE TEACHING \u2014 Glargine (Lantus) is a CLEAR solution. Unlike NPH (cloudy), it does not contain particles that need resuspension. Vigorous shaking can denature the insulin protein and affect its efficacy. Only NPH insulin is gently rolled.",
                d: "CORRECT UNDERSTANDING \u2014 Rotating injection sites within the same body area (e.g., different spots within the abdomen) maintains consistent absorption while preventing lipodystrophy (fatty lumps from repeated injections at the same spot)."
            },
            testTakingTip: "Key insulin rules for NCLEX: (1) Never mix glargine or detemir. (2) Only NPH is cloudy and needs gentle rolling. (3) Rapid-acting = with meals; skip dose if skip meal. (4) Rotate within the same region for consistency.",
            guideSection: "Section 2 \u2014 Insulin Types & Administration",
            guideSectionId: "insulin-types"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Type 2 diabetes takes acarbose (Precose) with meals and glipizide (Glucotrol) daily. The patient becomes diaphoretic, confused, and has a blood glucose of 52 mg/dL. Which treatment should the nurse administer?",
            options: [
                { id: "a", text: "Orange juice (4 oz)" },
                { id: "b", text: "Glucose (dextrose) tablets" },
                { id: "c", text: "Peanut butter crackers" },
                { id: "d", text: "Regular cola (4 oz)" }
            ],
            correct: "b",
            rationale: {
                correct: "The patient is taking acarbose, an alpha-glucosidase inhibitor that blocks the breakdown of complex sugars (sucrose, starches) in the intestine. Orange juice, cola, and crackers all contain sucrose or complex carbohydrates that acarbose prevents from being absorbed quickly. Only PURE GLUCOSE (dextrose) tablets bypass this enzyme blockade because glucose does not require further breakdown. This is a critical distinction.",
                a: "Orange juice contains sucrose and fructose. Acarbose delays the breakdown and absorption of sucrose, so juice will not raise blood glucose fast enough to treat acute hypoglycemia.",
                c: "Peanut butter crackers are complex carbohydrates that are slow to digest even without acarbose. They are never appropriate for acute hypoglycemia treatment \u2014 they\u2019re a follow-up snack after glucose normalizes.",
                d: "Regular cola contains sucrose, which acarbose prevents from being rapidly broken down. It would not raise glucose quickly enough in a patient taking an alpha-glucosidase inhibitor."
            },
            testTakingTip: "Patient on acarbose or miglitol + hypoglycemia = GLUCOSE TABLETS ONLY. Regular sugar sources (juice, soda, candy) won\u2019t work because the drug blocks their breakdown. This is a high-yield NCLEX pharmacology point.",
            labValues: [
                { name: "Blood Glucose", normal: "70\u2013100 mg/dL (fasting)" }
            ],
            guideSection: "Section 5 \u2014 TZDs & Alpha-Glucosidase Inhibitors",
            guideSectionId: "tzds-agi"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is reviewing medications for a patient with Type 2 diabetes and NYHA Class III heart failure. Which diabetes medication should the nurse question?",
            options: [
                { id: "a", text: "Metformin (Glucophage)" },
                { id: "b", text: "Empagliflozin (Jardiance)" },
                { id: "c", text: "Pioglitazone (Actos)" },
                { id: "d", text: "Sitagliptin (Januvia)" }
            ],
            correct: "c",
            rationale: {
                correct: "Pioglitazone (a thiazolidinedione/TZD) is CONTRAINDICATED in NYHA Class III and IV heart failure. TZDs cause fluid retention and edema, which can precipitate or worsen heart failure. The nurse should question this order and contact the prescriber.",
                a: "Metformin is generally safe in compensated heart failure and is often used. It was previously contraindicated in HF, but current guidelines allow use unless there is acute or unstable decompensation with risk of hypoperfusion.",
                b: "Empagliflozin (SGLT2 inhibitor) is actually BENEFICIAL in heart failure. It is approved for reducing hospitalizations for HF and would be a preferred agent in this patient.",
                d: "Sitagliptin (DPP-4 inhibitor) is generally considered safe in HF, though saxagliptin (a different DPP-4 inhibitor) has shown increased HF hospitalization risk. Sitagliptin does not carry the same warning."
            },
            testTakingTip: "TZDs (pioglitazone, rosiglitazone) = fluid retention = worsen heart failure. Contraindicated in NYHA Class III-IV. Conversely, SGLT2 inhibitors actually HELP heart failure. Know which drugs help vs harm in HF.",
            guideSection: "Section 5 \u2014 TZDs & Alpha-Glucosidase Inhibitors",
            guideSectionId: "tzds-agi"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with Type 2 diabetes takes glyburide (DiaBeta) and propranolol (Inderal) for hypertension. The patient calls the clinic reporting unusual fatigue and difficulty concentrating after lunch, but denies any sweating or palpitations. What should the nurse suspect?",
            options: [
                { id: "a", text: "Hyperglycemia from medication non-compliance" },
                { id: "b", text: "Adverse effect of propranolol unrelated to diabetes" },
                { id: "c", text: "Hypoglycemia with masked adrenergic symptoms" },
                { id: "d", text: "Diabetic neuropathy affecting cognitive function" }
            ],
            correct: "c",
            rationale: {
                correct: "This patient is on a sulfonylurea (glyburide, which causes hypoglycemia) AND a non-selective beta-blocker (propranolol). Beta-blockers mask the adrenergic warning signs of hypoglycemia \u2014 tachycardia, tremors, and palpitations are blocked. Sweating (a cholinergic response) is typically preserved but may not be noticed by the patient. The neuroglycopenic symptoms (fatigue, difficulty concentrating) are the only clues. This is a dangerous situation because the patient cannot detect the hypoglycemia early.",
                a: "The symptoms described (fatigue, difficulty concentrating) are more consistent with hypoglycemia than hyperglycemia. Hyperglycemia typically presents with polyuria, polydipsia, and polyphagia.",
                b: "While propranolol can cause fatigue, the combination of fatigue + difficulty concentrating in a patient on a sulfonylurea should raise suspicion for hypoglycemia first. The beta-blocker is masking the typical warning signs.",
                d: "Diabetic neuropathy affects peripheral nerves (numbness, tingling in extremities) rather than causing acute episodes of fatigue and cognitive difficulty that fluctuate with meals."
            },
            testTakingTip: "Beta-blockers + diabetes medications = masked hypoglycemia. The patient won\u2019t feel the tachycardia or tremors. Only sweating and neuroglycopenic symptoms (confusion, fatigue, irritability) remain as clues. This is a classic NCLEX drug interaction question.",
            guideSection: "Section 9 \u2014 Drug Class Comparison",
            guideSectionId: "comparison"
        }
    ]
};
