/**
 * Adrenal Disorders Quiz - Question Data
 * 10 NCLEX-style questions: 5 Single, 2 Priority, 1 Ordering, 1 Matrix, 1 Single
 * High-yield focus: Cushing's vs Addison's, adrenal crisis, steroid safety, pheochromocytoma
 */

/* exported adrenalDisordersQuizData */
var adrenalDisordersQuizData = {
    guideName: "Adrenal Disorders",
    guideSlug: "adrenal-disorders",
    category: "Endocrine",
    categoryColor: "#7C3AED",
    estimatedMinutes: 20,
    questions: [
        // ============================================================
        // Q1: Cushing's vs Addison's Identification (Knowledge)
        // ============================================================
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient presents with moon face, buffalo hump, purple striae on the abdomen, hypertension, and a blood glucose of 248 mg/dL. Which condition is MOST consistent with these findings?",
            options: [
                { id: "a", text: "Addison's disease" },
                { id: "b", text: "Cushing's syndrome" },
                { id: "c", text: "Pheochromocytoma" },
                { id: "d", text: "Hypothyroidism" }
            ],
            correct: "b",
            rationale: {
                correct: "This is a classic Cushing's syndrome presentation. Excess cortisol causes fat redistribution (moon face, buffalo hump), protein catabolism (purple striae from weakened connective tissue), sodium/water retention (hypertension), and increased gluconeogenesis (hyperglycemia). All signs point to cortisol excess.",
                a: "Addison's disease is the OPPOSITE - it causes hypotension, hypoglycemia, weight loss, and bronze hyperpigmentation. The patient would NOT have moon face, buffalo hump, or hypertension.",
                c: "Pheochromocytoma causes severe paroxysmal hypertension, headache, and diaphoresis, but NOT moon face, buffalo hump, or purple striae. These body habitus changes are specific to cortisol excess.",
                d: "Hypothyroidism causes weight gain and fatigue, but not the characteristic fat redistribution (moon face, buffalo hump), purple striae, or significant hyperglycemia seen in Cushing's."
            },
            testTakingTip: "Moon face + buffalo hump + purple striae = Cushing's. This triad is pathognomonic. Remember: Cushing's = cortisol CUSHION (fat deposits in face and trunk).",
            guideSection: "Section 2 - Cushing's Syndrome",
            guideSectionId: "cushings"
        },

        // ============================================================
        // Q2: Adrenal Crisis Priority (Analysis - Priority)
        // ============================================================
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with known Addison's disease presents to the emergency department with a blood pressure of 72/40 mmHg, heart rate of 124 bpm, blood glucose of 52 mg/dL, and confusion. The patient's family reports the patient ran out of hydrocortisone 3 days ago. What is the nurse's PRIORITY intervention?",
            options: [
                { id: "a", text: "Obtain a stat cortisol level and wait for results before treating" },
                { id: "b", text: "Administer IV hydrocortisone 100 mg and initiate IV normal saline bolus" },
                { id: "c", text: "Administer oral fludrocortisone and encourage PO fluids" },
                { id: "d", text: "Draw a comprehensive metabolic panel and start potassium-containing IV fluids" }
            ],
            correct: "b",
            rationale: {
                correct: "This is adrenal crisis - a life-threatening emergency. The patient has the classic triad: severe hypotension, hypoglycemia, and altered mental status, with a clear trigger (stopped hydrocortisone). Treatment is IV hydrocortisone 100 mg STAT plus aggressive IV normal saline. Do NOT wait for lab confirmation - treat based on clinical presentation.",
                a: "Waiting for cortisol results before treating adrenal crisis can be fatal. This is a clinical diagnosis that requires immediate treatment. You CAN draw a cortisol level before administering hydrocortisone, but do not delay treatment for results.",
                c: "Oral medications are inappropriate in acute adrenal crisis. The patient is confused (risk of aspiration), hypotensive, has impaired gastrointestinal (GI) absorption, and needs rapid IV therapy. Fludrocortisone is for chronic management, not acute crisis.",
                d: "Potassium-containing IV fluids are CONTRAINDICATED. Addison's patients are already hyperkalemic (aldosterone deficiency means they cannot excrete potassium). Adding potassium could cause fatal cardiac arrhythmias. Use normal saline (0.9% sodium chloride) only."
            },
            testTakingTip: "Adrenal crisis: treat FIRST, confirm later. IV hydrocortisone 100 mg STAT + IV normal saline (NS). NEVER give potassium-containing fluids (patient is already hyperkalemic). NEVER give oral meds (patient is in shock).",
            guideSection: "Section 6 - Adrenal Crisis",
            guideSectionId: "adrenal-crisis"
        },

        // ============================================================
        // Q3: Steroid Tapering (Application)
        // ============================================================
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with rheumatoid arthritis has been taking prednisone 40 mg daily for 8 weeks. The patient tells the nurse, \"My joints feel much better, so I stopped taking the prednisone yesterday.\" What is the nurse's MOST appropriate response?",
            options: [
                { id: "a", text: "\"That's great that you're feeling better! You can stop it since your symptoms improved.\"" },
                { id: "b", text: "\"Resume the prednisone now and call your provider. Stopping it suddenly after 8 weeks can be life-threatening.\"" },
                { id: "c", text: "\"You should have cut the dose in half first. Take 20 mg today and then stop tomorrow.\"" },
                { id: "d", text: "\"Stopping prednisone suddenly may cause some mild discomfort, but it's not dangerous.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "After 8 weeks of prednisone 40 mg daily, the hypothalamic-pituitary-adrenal (HPA) axis is significantly suppressed - the adrenal glands have atrophied and cannot produce cortisol on their own. Abrupt withdrawal can trigger adrenal crisis (life-threatening hypotension, shock, death). The patient must resume the prednisone immediately and work with their provider to develop a gradual tapering schedule over weeks.",
                a: "Feeling better does NOT mean the adrenals have recovered. After 8 weeks of high-dose steroids, the hypothalamic-pituitary-adrenal (HPA) axis is suppressed. The patient needs their prednisone to survive until the adrenals recover through gradual tapering.",
                c: "Simply halving the dose for one day is not an appropriate taper. After 8 weeks at 40 mg, tapering must be done gradually over weeks to months under provider supervision. The immediate priority is resuming the full dose to prevent crisis.",
                d: "This is dangerously incorrect. Abrupt cessation after 8 weeks of high-dose steroids is potentially fatal, not merely uncomfortable. It can cause acute adrenal insufficiency (adrenal crisis)."
            },
            testTakingTip: "NEVER stop steroids abruptly after more than ~2 weeks of use. The hypothalamic-pituitary-adrenal (HPA) axis is suppressed and needs time to recover. Abrupt withdrawal = adrenal crisis = potential death. Always taper under provider guidance.",
            guideSection: "Section 5 - Addison's Treatment",
            guideSectionId: "addisons-treatment"
        },

        // ============================================================
        // Q4: Adrenal Crisis Management Ordering (Application)
        // ============================================================
        {
            id: 4,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Addison's disease develops adrenal crisis during a hospitalization for pneumonia. Place the following nursing interventions in the correct priority order.",
            options: [
                { id: "a", text: "Administer IV hydrocortisone 100 mg as ordered" },
                { id: "b", text: "Initiate large-volume IV normal saline (0.9% sodium chloride) bolus" },
                { id: "c", text: "Check blood glucose and administer IV dextrose if hypoglycemic" },
                { id: "d", text: "Place on continuous cardiac monitoring and monitor potassium levels" },
                { id: "e", text: "Identify and treat the precipitating cause (continue antibiotics for pneumonia)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence prioritizes life-saving cortisol replacement first, then volume restoration, metabolic correction, monitoring for dangerous complications, and finally addressing the underlying trigger. Hydrocortisone replaces the missing cortisol and at stress doses also provides mineralocorticoid coverage.",
                a: "FIRST - IV hydrocortisone is the single most critical intervention. Without cortisol, the body cannot maintain vascular tone or respond to stress. This directly addresses the pathophysiology of adrenal crisis.",
                b: "SECOND - Aggressive IV normal saline (NS) corrects the profound hypotension and dehydration from aldosterone deficiency (sodium/water loss). Patients may need 1-3 liters in the first hours. Use NS only - no potassium-containing fluids.",
                c: "THIRD - Correct hypoglycemia with IV dextrose (D50W). Cortisol deficiency impairs gluconeogenesis. Hypoglycemia can cause seizures and brain damage if not corrected.",
                d: "FOURTH - Continuous cardiac monitoring is essential because hyperkalemia from aldosterone deficiency can cause fatal arrhythmias. Monitor potassium closely and watch for peaked T-waves, widened QRS.",
                e: "FIFTH - Treat the precipitating cause. In this case, the pneumonia triggered the crisis. Continue IV antibiotics and treat the infection aggressively."
            },
            testTakingTip: "Adrenal crisis priorities: Replace cortisol → Restore volume (NS) → Correct glucose → Monitor K+/cardiac → Treat the trigger. Remember: NO potassium in the IV fluids.",
            guideSection: "Section 6 - Adrenal Crisis",
            guideSectionId: "adrenal-crisis"
        },

        // ============================================================
        // Q5: Pheochromocytoma Med Safety (Analysis - Priority)
        // ============================================================
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with a newly diagnosed pheochromocytoma has a blood pressure of 230/140 mmHg and a heart rate of 132 bpm. The provider orders medication to prepare the patient for surgery. Which medication should the nurse anticipate administering FIRST?",
            options: [
                { id: "a", text: "Propranolol (beta-blocker) to control the tachycardia" },
                { id: "b", text: "Phenoxybenzamine (alpha-blocker) to control the hypertension" },
                { id: "c", text: "Hydralazine (vasodilator) for blood pressure reduction" },
                { id: "d", text: "Atenolol (beta-blocker) and phenoxybenzamine (alpha-blocker) simultaneously" }
            ],
            correct: "b",
            rationale: {
                correct: "Alpha-adrenergic blockade with phenoxybenzamine MUST be established FIRST (typically 10-14 days before surgery) before any beta-blocker is given. Alpha-blockers control the dangerous hypertension by blocking catecholamine-induced vasoconstriction. Only after adequate alpha-blockade is established should a beta-blocker be added for tachycardia control.",
                a: "Giving a beta-blocker FIRST or ALONE is DANGEROUS in pheochromocytoma. Beta-blockers block beta-2 vasodilation while leaving alpha vasoconstriction unopposed, which can cause a severe hypertensive crisis, stroke, or death. Alpha must come FIRST.",
                c: "While hydralazine reduces blood pressure, it is not the standard first-line treatment for pheochromocytoma. Phenoxybenzamine specifically blocks the alpha receptors that catecholamines are stimulating, providing targeted and sustained blood pressure control.",
                d: "Starting both simultaneously is incorrect. Alpha-blockade must be established FIRST and maintained for several days before adding a beta-blocker. This ensures that vasoconstriction is controlled before addressing heart rate."
            },
            testTakingTip: "Pheochromocytoma: 'A before B' = Alpha-blocker before Beta-blocker. ALWAYS. Giving a beta-blocker without alpha-blockade = unopposed alpha vasoconstriction = hypertensive crisis = stroke risk.",
            guideSection: "Section 7 - Pheochromocytoma",
            guideSectionId: "pheochromocytoma"
        },

        // ============================================================
        // Q6: Patient Teaching Matrix (Analysis)
        // ============================================================
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "A nurse is evaluating an Addison's disease patient's understanding of their condition and medication management. For each statement, indicate whether it demonstrates correct understanding or needs more teaching.",
            options: [
                { id: "a", text: "\"If I get the flu, I should double my hydrocortisone dose and call my doctor.\"" },
                { id: "b", text: "\"I wear my medical alert bracelet every day and carry my emergency injection kit.\"" },
                { id: "c", text: "\"When I feel better and my energy is good, I can skip my afternoon hydrocortisone dose.\"" },
                { id: "d", text: "\"I've been adding extra salt to my meals like my doctor recommended.\"" }
            ],
            correct: {
                a: "Correct Understanding",
                b: "Correct Understanding",
                c: "Needs More Teaching",
                d: "Correct Understanding"
            },
            rationale: {
                correct: "Stress dosing during illness (A), wearing medical alert identification and carrying an emergency kit (B), and following a high-sodium diet (D) all demonstrate correct understanding of Addison's disease self-management. Skipping doses when feeling well (C) is dangerous and shows a critical misunderstanding.",
                a: "CORRECT UNDERSTANDING - Stress dosing is essential. During illness, the body needs more cortisol. Doubling the dose during minor illness (and tripling for severe illness) prevents adrenal crisis. The patient correctly plans to contact their provider.",
                b: "CORRECT UNDERSTANDING - Medical alert identification is critical for emergency situations where the patient cannot communicate. The IM hydrocortisone injection kit can be life-saving if the patient cannot take oral medication or is found unresponsive.",
                c: "NEEDS MORE TEACHING - This is a dangerous misconception. Feeling well means the medication IS working, not that the condition is resolved. Addison's disease requires lifelong hormone replacement. Skipping doses can trigger adrenal crisis. The adrenal glands are permanently damaged and cannot produce cortisol.",
                d: "CORRECT UNDERSTANDING - A high-sodium diet is recommended for Addison's patients because aldosterone deficiency causes excessive sodium loss. Extra dietary salt helps maintain sodium balance and blood pressure."
            },
            testTakingTip: "Addison's teaching: NEVER skip doses (feeling well = meds working, not condition cured). Stress dosing during illness. Medical alert identification always. High-sodium diet. Emergency injection kit.",
            guideSection: "Section 5 - Addison's Treatment",
            guideSectionId: "addisons-treatment"
        },

        // ============================================================
        // Q7: Addison's Lab Values (Knowledge)
        // ============================================================
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which set of lab values is consistent with Addison's disease (primary adrenal insufficiency)?",
            options: [
                { id: "a", text: "Sodium 148 mEq/L, Potassium 3.1 mEq/L, Glucose 210 mg/dL, Cortisol elevated" },
                { id: "b", text: "Sodium 126 mEq/L, Potassium 6.2 mEq/L, Glucose 58 mg/dL, Cortisol low" },
                { id: "c", text: "Sodium 140 mEq/L, Potassium 4.0 mEq/L, Glucose 95 mg/dL, Cortisol normal" },
                { id: "d", text: "Sodium 150 mEq/L, Potassium 2.8 mEq/L, Glucose 185 mg/dL, Cortisol elevated" }
            ],
            correct: "b",
            rationale: {
                correct: "Addison's disease causes cortisol AND aldosterone deficiency. The result: hyponatremia (Na 126 - can't retain sodium), hyperkalemia (K 6.2 - can't excrete potassium), hypoglycemia (glucose 58 - impaired gluconeogenesis without cortisol), and low cortisol. This is the characteristic Addison's electrolyte pattern.",
                a: "This pattern shows hypernatremia, hypokalemia, hyperglycemia, and elevated cortisol - this is Cushing's syndrome (excess cortisol), the OPPOSITE of Addison's.",
                c: "These are normal values. A patient with Addison's disease would not have normal electrolytes and cortisol unless they are on adequate replacement therapy.",
                d: "This pattern also suggests Cushing's - hypernatremia, severe hypokalemia, hyperglycemia, and elevated cortisol. This is the cortisol excess pattern."
            },
            testTakingTip: "Addison's electrolyte triad: LOW sodium, HIGH potassium, LOW glucose. Plus LOW cortisol. Everything is LOW except potassium. If you see this pattern, think Addison's. The opposite pattern (high Na, low K, high glucose) = Cushing's.",
            guideSection: "Section 4 - Addison's Disease",
            guideSectionId: "addisons"
        },

        // ============================================================
        // Q8: Cushing's Nursing Priority (Application)
        // ============================================================
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient with Cushing's syndrome. The patient's temperature is 98.8°F (37.1°C), white blood cell (WBC) count is 9,200/mm³ (normal range), and the patient reports feeling \"a little more tired than usual.\" Which nursing action is MOST appropriate?",
            options: [
                { id: "a", text: "Reassure the patient that vital signs and labs are normal and encourage rest" },
                { id: "b", text: "Assess further for signs of infection that may be masked by cortisol excess" },
                { id: "c", text: "Administer acetaminophen for the low-grade temperature and encourage fluids" },
                { id: "d", text: "Increase the patient's corticosteroid dose to provide more energy" }
            ],
            correct: "b",
            rationale: {
                correct: "Cushing's syndrome causes immunosuppression from excess cortisol. Patients may NOT show typical signs of infection - they may not develop fever (a 'normal' temp could actually be elevated for them), their white blood cell (WBC) count may not rise appropriately, and inflammatory signs may be blunted. New fatigue in a Cushing's patient warrants thorough infection assessment. Infection is a leading cause of mortality in Cushing's.",
                a: "Reassurance based on 'normal' values is inappropriate. In an immunosuppressed Cushing's patient, normal-appearing vitals and labs can mask serious infection. A temperature of 98.8°F and subtle fatigue could represent early sepsis.",
                c: "While acetaminophen could be given for comfort, the priority is to investigate WHY the patient has even mild temperature elevation and new fatigue. In Cushing's, this could be the only sign of a serious infection.",
                d: "The patient already has excess cortisol - that IS the problem. Increasing corticosteroids would worsen Cushing's and further suppress the immune system."
            },
            testTakingTip: "Cushing's patients are immunosuppressed - they may NOT spike a fever or elevate their white blood cell (WBC) count even with serious infection. A 'normal' temp in Cushing's could be hiding sepsis. Always investigate subtle changes.",
            guideSection: "Section 2 - Cushing's Syndrome",
            guideSectionId: "cushings"
        },

        // ============================================================
        // Q9: Iatrogenic Cushing's (Knowledge)
        // ============================================================
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "What is the MOST common cause of Cushing's syndrome overall?",
            options: [
                { id: "a", text: "Pituitary adenoma (Cushing's disease)" },
                { id: "b", text: "Adrenal cortex carcinoma" },
                { id: "c", text: "Long-term exogenous corticosteroid therapy (iatrogenic)" },
                { id: "d", text: "Ectopic adrenocorticotropic hormone (ACTH) production from small cell lung cancer" }
            ],
            correct: "c",
            rationale: {
                correct: "Iatrogenic (exogenous) Cushing's from long-term corticosteroid use is the MOST common cause of Cushing's syndrome overall. Medications like prednisone, dexamethasone, and hydrocortisone, when taken chronically for conditions like asthma, rheumatoid arthritis (RA), lupus, and organ transplant, provide enough exogenous cortisol to produce Cushing's features. This is treated by gradually tapering the offending medication.",
                a: "Pituitary adenoma is the most common ENDOGENOUS cause (accounting for 70% of non-iatrogenic cases), but iatrogenic Cushing's from steroid use is far more common overall.",
                b: "Adrenal carcinoma is a rare cause of Cushing's. It produces cortisol independently of adrenocorticotropic hormone (ACTH) stimulation (ACTH levels would be low).",
                d: "Ectopic adrenocorticotropic hormone (ACTH) production is uncommon and usually associated with aggressive malignancies like small cell lung cancer. It accounts for a small percentage of endogenous Cushing's."
            },
            testTakingTip: "The #1 cause of Cushing's syndrome is NOT a tumor - it's prescription steroids. Always ask patients about steroid medications before pursuing an extensive endocrine workup. Iatrogenic = most common overall. Pituitary adenoma = most common endogenous cause.",
            guideSection: "Section 2 - Cushing's Syndrome",
            guideSectionId: "cushings"
        },

        // ============================================================
        // Q10: Addison's Stress Dosing (Application)
        // ============================================================
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Addison's disease who takes hydrocortisone 20 mg every morning and 10 mg every afternoon calls the nurse advice line reporting a temperature of 101.5°F and body aches consistent with influenza. What is the MOST appropriate advice?",
            options: [
                { id: "a", text: "\"Continue your regular hydrocortisone doses and take acetaminophen for the fever and aches.\"" },
                { id: "b", text: "\"Stop your hydrocortisone since you're sick and your body needs to fight the infection naturally.\"" },
                { id: "c", text: "\"Double your hydrocortisone (40 mg morning, 20 mg afternoon) and call your provider if symptoms worsen or you vomit.\"" },
                { id: "d", text: "\"Come to the emergency department right away so you can receive IV hydrocortisone.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "For minor illness (flu, cold, fever), Addison's patients should DOUBLE their hydrocortisone dose - this is 'stress dosing.' The body normally produces extra cortisol during physiologic stress, but Addison's patients cannot. Without stress dosing, they risk developing adrenal crisis. The patient should also contact their provider if symptoms worsen and, critically, seek emergency care if they cannot keep oral medications down (vomiting = need for injectable form).",
                a: "Regular doses are insufficient during illness. The body needs 2-3 times the normal cortisol output during physiologic stress. Maintaining regular doses during illness puts the patient at risk for adrenal crisis.",
                b: "Stopping hydrocortisone is EXTREMELY dangerous and could be fatal. Addison's patients have no adrenal reserve - they depend entirely on exogenous cortisol for survival. Stopping during illness (when the body needs MORE cortisol) would almost certainly trigger adrenal crisis.",
                d: "The ED is not necessary for a moderate illness with fever if the patient can take oral medications. However, if the patient is vomiting, has severe symptoms, or is unable to keep oral hydrocortisone down, then the ED is appropriate for IV hydrocortisone."
            },
            testTakingTip: "Addison's stress dosing: minor illness = double the dose. Severe illness = triple. Surgery/major trauma = IV hydrocortisone. If patient can't keep oral meds down (vomiting) = needs IM/IV hydrocortisone. NEVER stop steroids when sick - the body needs MORE, not less.",
            guideSection: "Section 5 - Addison's Treatment",
            guideSectionId: "addisons-treatment"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student is learning the adrenal cortex. Which hormone class does the outermost layer, the zona glomerulosa, produce?",
            options: [
                { id: "a", text: "Mineralocorticoids, meaning aldosterone" },
                { id: "b", text: "Glucocorticoids, meaning cortisol" },
                { id: "c", text: "Androgens, meaning dehydroepiandrosterone" },
                { id: "d", text: "Catecholamines, meaning epinephrine" }
            ],
            correct: "a",
            rationale: {
                correct: "The cortex runs salt, sugar, sex from outside in. The outermost zona glomerulosa makes aldosterone, which holds on to sodium and water, excretes potassium, and sets blood pressure and volume under control of the renin angiotensin aldosterone system (RAAS).",
                b: "Cortisol comes from the middle layer, the zona fasciculata.",
                c: "Androgens come from the innermost cortical layer, the zona reticularis.",
                d: "Catecholamines come from the medulla, which is a separate organ inside the gland."
            },
            testTakingTip: "Salt, sugar, sex from outside in. The deeper you go the sweeter it gets, and the medulla is a different organ entirely.",
            guideSection: "Section 3 - One hormone, four actions",
            guideSectionId: "physiology"
        },
        {
            id: 12, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient has been taking prednisone daily for 8 months and asks to stop it because the condition has settled. What should the nurse explain?",
            options: [
                { id: "a", text: "The dose is tapered gradually over weeks to months" },
                { id: "b", text: "The medication may be stopped once symptoms resolve" },
                { id: "c", text: "The dose is halved each day until the supply runs out" },
                { id: "d", text: "The medication is stopped and restarted if symptoms return" }
            ],
            correct: "a",
            rationale: {
                correct: "Long term steroid use suppresses the hypothalamic pituitary adrenal (HPA) axis, and the adrenal glands atrophy. Stopping abruptly leaves the patient unable to produce cortisol, so the dose is tapered gradually over weeks to months while the axis wakes up.",
                b: "Symptom resolution says nothing about whether the adrenal glands have recovered their function.",
                c: "Halving daily is far too fast for a suppressed axis and can precipitate adrenal crisis.",
                d: "Stopping and restarting exposes the patient to crisis in the gap."
            },
            testTakingTip: "Never stop a long term steroid abruptly. The gland has to be given time to wake up.",
            guideSection: "Section 5 - Treating too much",
            guideSectionId: "cushings-treatment"
        },
        {
            id: 13, type: "single", subtype: null, difficulty: "application",
            stem: "A patient is scheduled for adrenalectomy to remove a pheochromocytoma. What should the nurse confirm before surgery?",
            options: [
                { id: "a", text: "That alpha blockade has run for 10 to 14 days" },
                { id: "b", text: "That beta blockade was started 24 hours ago" },
                { id: "c", text: "That the patient has fasted for a full 24 hours" },
                { id: "d", text: "That the potassium has been deliberately lowered" }
            ],
            correct: "a",
            rationale: {
                correct: "A pheochromocytoma releases catecholamines, and handling the tumour during surgery can trigger a hypertensive crisis. Alpha blockade is confirmed for 10 to 14 days beforehand so the vasculature is already relaxed.",
                b: "Beta blockade without adequate alpha blockade first leaves unopposed vasoconstriction and can worsen the crisis.",
                c: "A 24 hour fast is not the preoperative requirement here.",
                d: "Electrolytes are corrected before surgery, not deliberately deranged."
            },
            testTakingTip: "Alpha before beta in pheochromocytoma, and expect hypotension after the tumour is out because the catecholamine source has gone.",
            guideSection: "Section 10 - After the gland comes out",
            guideSectionId: "adrenalectomy"
        },
        {
            id: 14, type: "single", subtype: "priority", difficulty: "analysis",
            stem: "A patient is 2 hours post bilateral adrenalectomy. The blood pressure has fallen from 118/70 to 82/48 mmHg. What should the nurse recognise?",
            options: [
                { id: "a", text: "Expected hypotension requiring steroid replacement and support" },
                { id: "b", text: "Expected pain response that will settle with analgesia alone" },
                { id: "c", text: "An anticipated finding needing no intervention at this stage" },
                { id: "d", text: "A sign of fluid overload requiring diuretic administration" }
            ],
            correct: "a",
            rationale: {
                correct: "After bilateral adrenalectomy the patient produces no cortisol or aldosterone and needs both for life. Blood pressure is monitored every 15 to 30 minutes at first, and hypotension is treated with steroid replacement, fluids and vasopressors if needed.",
                b: "Pain typically raises blood pressure rather than dropping it by this much.",
                c: "Hypotension after this surgery is anticipated but is very much treated, not merely observed.",
                d: "A falling pressure with no cortisol or aldosterone is the opposite of fluid overload."
            },
            testTakingTip: "Bilateral means lifelong cortisol and aldosterone. Unilateral means temporary support while the remaining gland recovers.",
            guideSection: "Section 10 - After the gland comes out",
            guideSectionId: "adrenalectomy"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks what the adrenal medulla produces. What should the nurse answer?",
            options: [
                { id: "a", text: "Catecholamines, meaning epinephrine and norepinephrine" },
                { id: "b", text: "Aldosterone, which retains sodium and excretes potassium" },
                { id: "c", text: "Cortisol, which raises glucose and suppresses immunity" },
                { id: "d", text: "Dehydroepiandrosterone, a precursor to the sex hormones" }
            ],
            correct: "a",
            rationale: {
                correct: "Each adrenal gland is really two organs stacked together. The medulla sits inside and makes catecholamines, epinephrine and norepinephrine, which drive the immediate fight or flight response.",
                b: "Aldosterone is made by the zona glomerulosa in the cortex.",
                c: "Cortisol is made by the zona fasciculata in the cortex.",
                d: "Dehydroepiandrosterone is made by the zona reticularis in the cortex."
            },
            testTakingTip: "Cortex and medulla are two organs in one gland. The cortex makes steroids; the medulla makes catecholamines.",
            guideSection: "Section 3 - One hormone, four actions",
            guideSectionId: "physiology"
        }
    ]
};
