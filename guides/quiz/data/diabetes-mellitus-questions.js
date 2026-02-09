/**
 * Diabetes Mellitus Quiz — Question Data
 * 10 NCLEX-style questions: 5 Single, 2 Priority, 1 Ordering, 1 Matrix, 1 Single
 */

/* exported diabetesMellitusQuizData */
var diabetesMellitusQuizData = {
    guideName: "Diabetes Mellitus",
    guideSlug: "diabetes-mellitus",
    category: "Endocrine",
    categoryColor: "#6B8DD6",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nursing student is studying the pathophysiology of diabetes mellitus. Which statement BEST describes the fundamental difference between Type 1 and Type 2 diabetes?",
            options: [
                { id: "a", text: "Type 1 results from autoimmune destruction of beta cells causing absolute insulin deficiency; Type 2 results from insulin resistance with relative insulin deficiency" },
                { id: "b", text: "Type 1 only occurs in children; Type 2 only occurs in adults over age 40" },
                { id: "c", text: "Type 1 is managed with oral medications; Type 2 always requires insulin injections" },
                { id: "d", text: "Type 1 is caused by obesity; Type 2 is caused by viral infections" }
            ],
            correct: "a",
            rationale: {
                correct: "Type 1 DM involves autoimmune destruction of pancreatic beta cells, resulting in absolute insulin deficiency — the body produces no insulin at all. Type 2 DM involves cellular resistance to insulin action combined with progressive decline in beta-cell function, resulting in relative insulin deficiency — insulin is present but not effective enough.",
                b: "While Type 1 is more commonly diagnosed in youth and Type 2 in adults, both can occur at any age. Type 2 is increasingly diagnosed in children and adolescents, particularly with rising obesity rates.",
                c: "This is reversed. Type 1 always requires insulin (no endogenous production). Type 2 typically starts with lifestyle modifications and oral agents, though insulin may be needed as the disease progresses.",
                d: "This is reversed. Obesity is a major risk factor for Type 2 (not Type 1). Type 1 has an autoimmune etiology, sometimes triggered by viral infections or genetic predisposition."
            },
            testTakingTip: "Remember the key words: Type 1 = 'absolute' deficiency (zero insulin). Type 2 = 'relative' deficiency (insulin present but ineffective). This distinction drives all treatment decisions.",
            guideSection: "Section 1 — Pathophysiology: Type 1 vs Type 2",
            guideSectionId: "pathophysiology"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a patient admitted with diabetic ketoacidosis (DKA). The initial labs show: blood glucose 480 mg/dL, pH 7.18, potassium 3.1 mEq/L, and positive ketones. IV fluids have been started. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Begin continuous IV regular insulin drip" },
                { id: "b", text: "Administer IV potassium replacement" },
                { id: "c", text: "Obtain an arterial blood gas" },
                { id: "d", text: "Administer IV sodium bicarbonate" }
            ],
            correct: "b",
            rationale: {
                correct: "With a potassium of 3.1 mEq/L (below 3.3), insulin MUST be held until potassium is repleted. Insulin drives potassium into cells, which would further drop this already critically low potassium level, potentially causing fatal cardiac arrhythmias. The protocol is clear: if K+ < 3.3, hold insulin and replace potassium first.",
                a: "Insulin cannot be started until potassium is at least 3.3 mEq/L. Starting insulin with a K+ of 3.1 would cause dangerous hypokalemia as insulin shifts K+ intracellularly.",
                c: "An ABG may provide additional data, but the pH is already known (7.18), and the immediate life-threatening issue is the critically low potassium that must be corrected before insulin therapy.",
                d: "Bicarbonate is only considered when pH < 6.9 (severe acidosis). This patient's pH of 7.18, while acidotic, does not meet that threshold. Additionally, the potassium must be addressed first."
            },
            labValues: [
                { name: "Potassium (K+)", normal: "3.5–5.0 mEq/L" },
                { name: "Blood pH", normal: "7.35–7.45" },
                { name: "Blood Glucose", normal: "70–100 mg/dL (fasting)" }
            ],
            testTakingTip: "In DKA, ALWAYS look at the potassium first. The rule is simple: K+ < 3.3 = hold insulin, replace K+ first. K+ 3.3–5.3 = give K+ with insulin. K+ > 5.3 = hold K+, start insulin. Potassium is the #1 killer in DKA management.",
            guideSection: "Section 3 — Acute Complications: DKA vs HHS",
            guideSectionId: "acute-complications"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Type 2 diabetes is taking metformin 1000 mg twice daily. The patient is scheduled for a CT scan with IV contrast dye tomorrow. Which nursing action is MOST appropriate?",
            options: [
                { id: "a", text: "Administer metformin with a full glass of water before the procedure" },
                { id: "b", text: "Verify that metformin has been held and notify the provider if not" },
                { id: "c", text: "Switch the patient to insulin for the day of the procedure" },
                { id: "d", text: "Administer a double dose of metformin after the procedure" }
            ],
            correct: "b",
            rationale: {
                correct: "Metformin must be held before and for 48 hours after IV contrast dye administration. Contrast dye can cause acute kidney injury, and metformin is renally cleared — if kidney function declines, metformin can accumulate and cause life-threatening lactic acidosis. The nurse should verify the medication has been held per protocol.",
                a: "Administering metformin before a contrast procedure puts the patient at risk for lactic acidosis if renal function is compromised by the contrast dye.",
                c: "Switching to insulin is not the standard protocol. The appropriate action is simply to hold metformin before and after the procedure. The provider may order a sliding scale if needed, but the priority nursing action is ensuring metformin is held.",
                d: "A double dose is never appropriate and would increase GI side effects and lactic acidosis risk. Metformin is resumed at the regular dose 48 hours post-procedure after renal function is confirmed adequate."
            },
            testTakingTip: "Metformin + contrast dye = lactic acidosis risk. Hold metformin before the procedure and for 48 hours after. Renal function should be verified before resuming. This is a classic NCLEX question.",
            guideSection: "Section 6 — Oral & Injectable Agents",
            guideSectionId: "oral-agents"
        },
        {
            id: 4,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse finds a patient with Type 1 diabetes unresponsive, diaphoretic, and with a blood glucose of 38 mg/dL. Place the following nursing interventions in the correct priority order.",
            options: [
                { id: "a", text: "Position the patient on their side to protect the airway" },
                { id: "b", text: "Administer IV dextrose 50% (D50W) 25 mL as ordered" },
                { id: "c", text: "Recheck blood glucose 15 minutes after treatment" },
                { id: "d", text: "Notify the health care provider" },
                { id: "e", text: "Document the event and investigate the cause" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence addresses immediate safety (airway), treats the life-threatening hypoglycemia, verifies response, communicates with the provider, and documents/investigates to prevent recurrence.",
                a: "FIRST — The patient is unconscious, so airway protection is the immediate priority. Positioning on the side prevents aspiration. Never give oral glucose to an unconscious patient.",
                b: "SECOND — IV D50W is the treatment of choice for severe hypoglycemia in a hospitalized patient with IV access. This rapidly raises blood glucose. If no IV access, administer IM glucagon.",
                c: "THIRD — After treatment, recheck blood glucose in 15 minutes to verify the intervention was effective. If still < 70 mg/dL, repeat treatment.",
                d: "FOURTH — Notify the provider of the hypoglycemic event and current glucose level. The insulin regimen may need adjustment.",
                e: "FIFTH — Document the event thoroughly and investigate the cause (too much insulin, missed meal, increased activity, medication interaction) to prevent recurrence."
            },
            testTakingTip: "For unconscious hypoglycemia: Safety first (airway), then treat (IV D50 or IM glucagon), then verify (recheck BG), then communicate (notify provider), then prevent recurrence (document/investigate).",
            guideSection: "Section 7 — Hypoglycemia Management",
            guideSectionId: "hypoglycemia"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is caring for two patients in the emergency department. Patient A has a blood glucose of 520 mg/dL, pH 7.12, positive ketones, and is breathing deeply and rapidly. Patient B has a blood glucose of 980 mg/dL, pH 7.38, negative ketones, and is confused and severely dehydrated. Which statement about these patients is correct?",
            options: [
                { id: "a", text: "Patient A likely has HHS; Patient B likely has DKA" },
                { id: "b", text: "Patient A likely has DKA; Patient B likely has HHS" },
                { id: "c", text: "Both patients have DKA at different stages" },
                { id: "d", text: "Both patients need insulin as the first priority intervention" }
            ],
            correct: "b",
            rationale: {
                correct: "Patient A shows classic DKA: glucose 250–600 range, metabolic acidosis (pH 7.12), positive ketones, and Kussmaul respirations (deep, rapid breathing to blow off CO2). Patient B shows classic HHS: extremely elevated glucose (> 600), normal pH (no acidosis), negative ketones, altered mental status, and severe dehydration.",
                a: "This reversal mixes up the two conditions. DKA has ketones and acidosis; HHS has extreme glucose without ketones.",
                c: "Patient B has a normal pH and no ketones, which rules out DKA. The extremely elevated glucose (980) and severe dehydration without acidosis is classic HHS.",
                d: "While both need insulin eventually, the first priority for HHS (Patient B) is aggressive IV fluid replacement. HHS patients are typically 8–12 liters fluid deficit, and rehydration alone will significantly lower glucose. DKA (Patient A) needs fluids too, but also needs to check K+ before starting insulin."
            },
            testTakingTip: "The key differentiators: DKA = ketones + acidosis + Kussmaul breathing. HHS = extreme glucose + no ketones + normal pH + severe dehydration. Treatment priorities differ: DKA = fluids + insulin + K+. HHS = fluids first (massive dehydration).",
            guideSection: "Section 3 — Acute Complications: DKA vs HHS",
            guideSectionId: "acute-complications"
        },
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "A nurse is evaluating a newly diagnosed Type 2 diabetes patient's understanding of discharge instructions. For each patient statement, indicate whether it demonstrates correct understanding or needs more teaching.",
            options: [
                { id: "a", text: "\"I take my metformin with meals to reduce stomach upset.\"" },
                { id: "b", text: "\"If I feel shaky and sweaty, I should take my metformin right away.\"" },
                { id: "c", text: "\"I should inspect my feet every day and never walk barefoot.\"" },
                { id: "d", text: "\"Since I feel fine, I can stop taking my medication until symptoms come back.\"" }
            ],
            correct: { a: "Correct Understanding", b: "Needs More Teaching", c: "Correct Understanding", d: "Needs More Teaching" },
            rationale: {
                correct: "Taking metformin with food and performing daily foot inspections demonstrate correct understanding. Treating shakiness with metformin and stopping medications when asymptomatic are dangerous misconceptions.",
                a: "CORRECT UNDERSTANDING — Metformin commonly causes GI side effects (nausea, diarrhea, abdominal discomfort). Taking it with meals minimizes these effects. The extended-release formulation also helps.",
                b: "NEEDS MORE TEACHING — Shakiness and diaphoresis are signs of hypoglycemia, which requires fast-acting carbohydrates (Rule of 15), not metformin. Metformin does not cause hypoglycemia alone and would not treat it. The patient is confusing diabetes medication with hypoglycemia treatment.",
                c: "CORRECT UNDERSTANDING — Daily foot inspection is essential for all diabetes patients. Neuropathy causes loss of sensation, meaning injuries can go unnoticed. Never going barefoot prevents foot injuries that could lead to infection and amputation.",
                d: "NEEDS MORE TEACHING — Type 2 diabetes is often asymptomatic, especially in early stages. Feeling fine does not mean blood glucose is controlled. Stopping medication allows glucose to rise, accelerating organ damage. Diabetes medications are lifelong unless the provider changes the plan."
            },
            testTakingTip: "Two classic 'needs more teaching' red flags: (1) stopping meds because they feel fine, (2) confusing diabetes medication with hypoglycemia treatment. Metformin treats hyperglycemia, not hypoglycemia.",
            guideSection: "Section 8 — Nursing Management & Patient Teaching",
            guideSectionId: "nursing-management"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is preparing to administer morning insulin to a patient with Type 1 diabetes. The patient receives NPH insulin and regular insulin before breakfast. The breakfast tray has not arrived yet. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Administer both insulins and have the patient call when the tray arrives" },
                { id: "b", text: "Hold both insulins until the breakfast tray arrives" },
                { id: "c", text: "Administer only the NPH insulin and hold the regular insulin" },
                { id: "d", text: "Contact dietary to ensure the breakfast tray is delivered promptly" }
            ],
            correct: "d",
            rationale: {
                correct: "The priority is to ensure food will be available before administering insulin. Regular insulin should be given 30 minutes before meals, and NPH has a peak at 4–12 hours that requires food. The nurse should first ensure the tray is coming, then administer both insulins at the appropriate time relative to the meal.",
                a: "Administering insulin without guaranteed food availability puts the patient at risk for hypoglycemia, especially the regular insulin which peaks in 2–4 hours.",
                b: "Completely holding both insulins delays necessary glucose management. The Type 1 patient needs basal insulin (NPH). The better approach is to expedite the food, not indefinitely delay insulin.",
                c: "While NPH provides basal coverage that is less meal-dependent, this approach still delays complete insulin coverage. The best action is to expedite the meal so both insulins can be given on schedule."
            },
            testTakingTip: "When food and insulin timing don't align, the NCLEX expects you to take action to resolve the conflict — not just hold or just give. Ensure food availability first, then give insulin at the correct timing relative to the meal. Safety first: no food = no mealtime insulin.",
            guideSection: "Section 5 — Insulin Therapy",
            guideSectionId: "insulin-therapy"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is reviewing insulin types for an upcoming exam. Which statement about insulin administration is correct?",
            options: [
                { id: "a", text: "Glargine (Lantus) can be mixed with regular insulin in the same syringe to reduce injections" },
                { id: "b", text: "NPH insulin appears cloudy and should be gently rolled between the palms before administration" },
                { id: "c", text: "Rapid-acting insulin should be administered 30–60 minutes before meals" },
                { id: "d", text: "Any type of insulin can be administered intravenously in an emergency" }
            ],
            correct: "b",
            rationale: {
                correct: "NPH is the only insulin that appears cloudy (it is a suspension). It must be gently rolled (not shaken) to resuspend the particles evenly before drawing up the dose. All other insulin types are clear solutions.",
                a: "Glargine (Lantus) and detemir (Levemir) should NEVER be mixed with any other insulin. Mixing alters their long-acting properties and can cause unpredictable absorption.",
                c: "Rapid-acting insulins (lispro, aspart) should be given within 15 minutes of a meal (at the meal), not 30–60 minutes before. Regular insulin is the one given 30 minutes before meals.",
                d: "Only regular insulin can be given IV. It is the only insulin type approved for intravenous administration. All other types (rapid-acting, NPH, long-acting) are for subcutaneous use only."
            },
            testTakingTip: "Key insulin facts for the NCLEX: NPH = only cloudy insulin (roll, don't shake). Regular = only IV insulin. Glargine/detemir = never mix. When mixing: Regular before NPH ('RN' = clear before cloudy).",
            guideSection: "Section 5 — Insulin Therapy",
            guideSectionId: "insulin-therapy"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with Type 2 diabetes is started on empagliflozin (Jardiance), an SGLT2 inhibitor. Which finding should the nurse report to the health care provider immediately?",
            options: [
                { id: "a", text: "The patient reports increased urinary frequency" },
                { id: "b", text: "The patient has a blood glucose of 145 mg/dL with ketones on urine dipstick" },
                { id: "c", text: "The patient has lost 3 pounds over the past month" },
                { id: "d", text: "The patient reports mild genital itching" }
            ],
            correct: "b",
            rationale: {
                correct: "This describes euglycemic DKA — a serious and potentially life-threatening complication unique to SGLT2 inhibitors. The glucose may be normal or only mildly elevated (not the typical 250–600 of classic DKA), but ketones are present. This is dangerous because it is often missed due to the 'normal' glucose. The provider must be notified immediately.",
                a: "Increased urinary frequency is an expected effect of SGLT2 inhibitors. They work by blocking glucose reabsorption in the kidneys, causing glycosuria (glucose in urine) which increases urine output.",
                c: "Mild weight loss is an expected beneficial effect of SGLT2 inhibitors, caused by the caloric loss from urinary glucose excretion.",
                d: "Genital itching (candidiasis) is a common side effect of SGLT2 inhibitors due to glucose in the urine creating an environment conducive to yeast growth. It is managed with antifungals and is not an emergency."
            },
            testTakingTip: "Euglycemic DKA is the 'trick' complication of SGLT2 inhibitors. The glucose looks normal, so providers may not suspect DKA. If a patient on an SGLT2 inhibitor has ketones — even with normal glucose — think euglycemic DKA and act immediately.",
            guideSection: "Section 6 — Oral & Injectable Agents",
            guideSectionId: "oral-agents"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school nurse is developing a diabetes management plan for a 10-year-old with Type 1 diabetes. The child's parent asks why the blood glucose goal for their child might be slightly higher than for adults. Which response by the nurse is BEST?",
            options: [
                { id: "a", text: "\"Children are less compliant with treatment, so we set easier goals.\"" },
                { id: "b", text: "\"Children are at higher risk for hypoglycemia, which can affect brain development, so slightly higher targets help prevent dangerous lows.\"" },
                { id: "c", text: "\"Children's insulin works differently than adult insulin, requiring higher targets.\"" },
                { id: "d", text: "\"Higher glucose targets are temporary until the child reaches puberty.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Children, especially younger ones, are at higher risk for hypoglycemia because they have unpredictable eating and activity patterns, may not recognize or communicate symptoms, and severe hypoglycemia can affect developing brains. Slightly relaxed targets (individualized by the provider) prioritize avoiding dangerous lows while still maintaining reasonable glucose control.",
                a: "This is a dismissive and inaccurate statement. Adherence challenges are real but are not the clinical reason for adjusted targets. The physiological reason is hypoglycemia risk and brain development.",
                c: "Insulin works the same way in children and adults. Doses are weight-based, but the mechanism is identical. This response provides inaccurate information.",
                d: "While targets are individualized and may change over time, the reason is not simply 'until puberty.' The rationale is protecting the developing brain from hypoglycemia, and individualized goals consider the child's age, hypoglycemia awareness, and activity level."
            },
            testTakingTip: "Pediatric diabetes goals are slightly more relaxed to prevent hypoglycemia, which poses unique risks to the developing brain. The NCLEX tests understanding of WHY goals differ, not just that they differ.",
            guideSection: "Section 9 — Pediatric Considerations",
            guideSectionId: "pediatric"
        }
    ]
};
