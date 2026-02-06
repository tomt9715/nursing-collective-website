/**
 * Tuberculosis Quiz — Question Data
 * 10 NCLEX-style questions: 4 Single, 3 SATA, 2 Priority, 1 Ordering
 */

/* exported tuberculosisQuizData */
var tuberculosisQuizData = {
    guideName: "Tuberculosis",
    guideSlug: "tuberculosis",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is reading the tuberculin skin test (Mantoux/PPD) of a 42-year-old healthcare worker with no known immunocompromising conditions. The induration measures 9 mm. How should the nurse interpret this result?",
            options: [
                { id: "a", text: "Positive — all adults with ≥5 mm induration are positive" },
                { id: "b", text: "Positive — healthcare workers are positive at ≥10 mm" },
                { id: "c", text: "Negative — this individual requires ≥10 mm for a positive result" },
                { id: "d", text: "Negative — this individual requires ≥15 mm for a positive result" }
            ],
            correct: "c",
            rationale: {
                correct: "Healthcare workers fall into the ≥10 mm positive category due to occupational exposure risk. At 9 mm, this result is just below the threshold and is interpreted as negative for this risk group.",
                a: "The ≥5 mm threshold applies to HIV-positive individuals, close contacts of active TB cases, immunosuppressed patients, and those with prior TB-consistent chest X-ray changes — not all adults.",
                b: "While healthcare workers do use the 10 mm cutoff, 9 mm is below that threshold and is therefore negative.",
                d: "The ≥15 mm cutoff applies to individuals with NO known risk factors. Healthcare workers have occupational risk and use the ≥10 mm threshold."
            },
            testTakingTip: "Know the three PPD cutoffs: ≥5 mm (highest risk — HIV, contacts, immunosuppressed), ≥10 mm (moderate risk — healthcare workers, high-prevalence groups, children <4), ≥15 mm (no risk factors). Always match the patient's risk category first.",
            guideSection: "Section 5 — Diagnostic Testing",
            guideSectionId: "diagnostics"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with HIV is being evaluated for TB exposure. The tuberculin skin test shows 4 mm of induration. The provider orders a QuantiFERON-TB Gold test, which returns positive. Which action should the nurse anticipate?",
            options: [
                { id: "a", text: "Repeat the tuberculin skin test in 2 weeks" },
                { id: "b", text: "Initiate airborne isolation immediately" },
                { id: "c", text: "Obtain a chest X-ray and sputum specimens" },
                { id: "d", text: "Document the patient as TB-free based on the negative skin test" }
            ],
            correct: "c",
            rationale: {
                correct: "A positive QuantiFERON-TB Gold (IGRA) indicates TB infection regardless of the skin test result. The next step is to determine whether the infection is latent or active by obtaining a chest X-ray and, if indicated, sputum specimens for AFB smear and culture.",
                a: "Repeating the TST is unnecessary. The IGRA is a more specific test and its positive result takes precedence, especially in immunocompromised patients where TST sensitivity is reduced.",
                b: "Airborne isolation is indicated for suspected or confirmed ACTIVE TB with respiratory symptoms, not solely based on a positive IGRA. The patient needs further workup first.",
                d: "The TST can produce false negatives in HIV patients due to impaired immune response (anergy). The positive IGRA is the more reliable result here."
            },
            testTakingTip: "QuantiFERON (IGRA) is more specific than TST and is preferred in immunocompromised patients and BCG-vaccinated individuals. A positive IGRA always warrants further workup — chest X-ray is the next step.",
            guideSection: "Section 5 — Diagnostic Testing",
            guideSectionId: "diagnostics"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient newly diagnosed with active pulmonary tuberculosis. Which interventions should the nurse implement? (Select all that apply.)",
            options: [
                { id: "a", text: "Place the patient in a negative-pressure airborne infection isolation room (AIIR)" },
                { id: "b", text: "Wear an N95 respirator when entering the room" },
                { id: "c", text: "Place a surgical mask on the patient when transporting outside the room" },
                { id: "d", text: "Wear a surgical mask instead of an N95 if the patient is on treatment" },
                { id: "e", text: "Initiate contact tracing of close contacts" },
                { id: "f", text: "Discontinue isolation once the patient has been on antibiotics for 24 hours" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Active pulmonary TB requires airborne precautions (AIIR with negative pressure, N95 for staff), a surgical mask on the patient during transport, and prompt contact tracing to identify exposed individuals.",
                a: "CORRECT — Negative-pressure AIIR with 6-12 air exchanges per hour is required to prevent TB transmission. The negative pressure prevents airborne particles from escaping into hallways.",
                b: "CORRECT — An N95 respirator (fit-tested) is required for all personnel entering the room. A surgical mask is NOT adequate protection against airborne TB particles.",
                c: "CORRECT — The patient wears a surgical mask during essential transport to contain respiratory droplet nuclei. Transport should be minimized.",
                d: "INCORRECT — An N95 is always required for healthcare workers regardless of treatment status. A surgical mask does not filter the tiny (1-5 micron) droplet nuclei that transmit TB.",
                e: "CORRECT — Public health authorities must be notified for contact tracing. Close contacts need TST/IGRA testing and possible prophylactic treatment.",
                f: "INCORRECT — Isolation requires at minimum 2 weeks of effective therapy PLUS 3 consecutive negative AFB sputum smears collected 8-24 hours apart PLUS clinical improvement. 24 hours of antibiotics is grossly insufficient."
            },
            testTakingTip: "TB isolation criteria for discontinuation: 2+ weeks therapy, 3 negative AFB smears, clinical improvement, no drug resistance. The '24-hour rule' applies to bacterial meningitis and pertussis — NOT tuberculosis.",
            guideSection: "Section 6 — Airborne Isolation Precautions",
            guideSectionId: "isolation"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient on RIPE therapy for active TB calls the clinic and reports dark-colored urine and yellowing of the eyes that began 2 days ago. The patient also complains of persistent nausea and right upper quadrant abdominal pain. Which action should the nurse take FIRST?",
            options: [
                { id: "a", text: "Reassure the patient that orange-colored body fluids are normal with rifampin" },
                { id: "b", text: "Instruct the patient to stop taking all TB medications and come in immediately" },
                { id: "c", text: "Recommend taking the medications with food to reduce nausea" },
                { id: "d", text: "Schedule a routine follow-up appointment for next week" }
            ],
            correct: "b",
            rationale: {
                correct: "Jaundice (yellowing of the eyes), dark urine, nausea, and RUQ pain are classic signs of hepatotoxicity — a serious adverse effect of three of the four RIPE drugs (rifampin, isoniazid, and pyrazinamide). All hepatotoxic medications must be stopped immediately and the patient evaluated urgently with liver function tests.",
                a: "While rifampin does cause orange/red discoloration of body fluids (urine, tears, sweat), this patient has JAUNDICE and RUQ pain — signs of liver damage, not the expected benign color change. Confusing these two presentations is dangerous.",
                c: "Nausea in the context of jaundice and RUQ pain indicates hepatotoxicity, not simple GI intolerance. Taking medications with food would not address liver damage and could worsen it.",
                d: "Hepatotoxicity is a medical urgency. Delayed evaluation risks fulminant liver failure. This patient needs same-day evaluation."
            },
            labValues: [
                { name: "ALT (SGPT)", normal: "7–56 U/L" },
                { name: "AST (SGOT)", normal: "10–40 U/L" },
                { name: "Total Bilirubin", normal: "0.1–1.2 mg/dL" }
            ],
            testTakingTip: "Three of the four RIPE drugs are hepatotoxic (RIP = Rifampin, Isoniazid, Pyrazinamide). Distinguish normal rifampin orange discoloration from true jaundice: orange urine alone = expected; yellow sclera + dark urine + RUQ pain = STOP meds immediately.",
            guideSection: "Section 7 — RIPE Therapy",
            guideSectionId: "ripe-therapy"
        },
        {
            id: 5,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching a patient about RIPE therapy for tuberculosis. Which statements indicate the patient needs additional teaching? (Select all that apply.)",
            options: [
                { id: "a", text: "\"I will take vitamin B6 with my isoniazid to prevent nerve damage.\"" },
                { id: "b", text: "\"My tears and sweat may turn orange while taking rifampin.\"" },
                { id: "c", text: "\"I can stop taking the medications once I feel better, usually after 2 months.\"" },
                { id: "d", text: "\"I should report any changes in my vision to my doctor immediately.\"" },
                { id: "e", text: "\"I will use a backup method of birth control since rifampin can reduce the effectiveness of oral contraceptives.\"" }
            ],
            correct: ["c"],
            rationale: {
                correct: "Only option C reflects incorrect understanding. The patient CANNOT stop medications when they feel better. TB treatment requires a full 6-9 month course to prevent relapse and drug resistance.",
                a: "CORRECT understanding — Isoniazid depletes vitamin B6 (pyridoxine), causing peripheral neuropathy. B6 supplementation is standard practice.",
                b: "CORRECT understanding — Rifampin causes harmless orange-red discoloration of tears, urine, sweat, and saliva. Patients should be warned so they don't mistake it for bleeding.",
                c: "INCORRECT understanding — The initial phase (2 months, all 4 drugs) is followed by a continuation phase (4+ months, rifampin + isoniazid). Stopping early is the #1 cause of drug-resistant TB. Total minimum treatment is 6 months.",
                d: "CORRECT understanding — Ethambutol can cause optic neuritis (decreased visual acuity, red-green color blindness). Vision changes must be reported immediately, and baseline eye exams are recommended.",
                e: "CORRECT understanding — Rifampin is a potent CYP450 inducer that reduces the effectiveness of oral contraceptives, warfarin, and many other drugs. Backup contraception is essential."
            },
            testTakingTip: "Read the question carefully — it asks for 'needs additional teaching,' meaning INCORRECT statements. A common NCLEX trap is flipping the correct/incorrect logic. Only one answer here shows misunderstanding.",
            guideSection: "Section 7 — RIPE Therapy",
            guideSectionId: "ripe-therapy"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with latent tuberculosis infection (LTBI) asks the nurse, \"Am I contagious?\" Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"Yes, you can spread TB to others through coughing and sneezing.\"" },
                { id: "b", text: "\"No. In latent TB, the bacteria are inactive and you cannot spread the disease to others.\"" },
                { id: "c", text: "\"You are contagious only during the first 2 weeks before starting treatment.\"" },
                { id: "d", text: "\"You are not contagious now, but you will become contagious once you start treatment.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "In LTBI, the immune system has walled off the TB bacteria (encased in granulomas). The patient has a positive skin test but negative sputum, normal chest X-ray, and NO respiratory symptoms. They are NOT infectious and cannot transmit TB to others.",
                a: "This describes ACTIVE pulmonary TB, where the bacteria are multiplying and being expelled via respiratory secretions. LTBI patients do not have active replication or respiratory shedding.",
                c: "LTBI patients are never contagious at any point. This statement confuses LTBI with active TB, which is contagious until adequately treated.",
                d: "Treatment of LTBI (typically isoniazid for 9 months or rifampin for 4 months) does not cause the patient to become contagious. Treatment is given to PREVENT progression to active disease."
            },
            testTakingTip: "Key distinction: Latent TB = positive test, NOT infectious, normal CXR, no symptoms, treated to prevent activation. Active TB = positive sputum, IS infectious, abnormal CXR, has symptoms, requires RIPE + isolation.",
            guideSection: "Section 3 — Latent vs Active TB",
            guideSectionId: "latent-vs-active"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "An emergency department nurse is triaging patients. Which patient should the nurse place in airborne isolation FIRST?",
            options: [
                { id: "a", text: "A patient with a positive PPD result obtained during a routine employment physical" },
                { id: "b", text: "A homeless patient with a 3-week history of productive cough, night sweats, weight loss, and hemoptysis" },
                { id: "c", text: "A patient with latent TB who missed the last dose of isoniazid" },
                { id: "d", text: "A healthcare worker who was exposed to a TB-positive patient last week and has no symptoms" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient has the classic triad of active pulmonary TB: prolonged productive cough (>2-3 weeks), constitutional symptoms (night sweats, weight loss), and hemoptysis. Being homeless is an additional risk factor. This patient is likely highly infectious and needs immediate airborne isolation pending AFB smears.",
                a: "A positive PPD alone indicates TB infection (latent or active) but without symptoms, sputum testing, or chest X-ray results, isolation is not the immediate priority. This patient needs further workup but is not urgently infectious.",
                c: "A patient with LTBI is not infectious and does not require airborne isolation. Missing one dose warrants medication counseling and adherence support, not isolation.",
                d: "An asymptomatic recently exposed healthcare worker needs TST/IGRA testing (typically 8-10 weeks post-exposure) but shows no signs of active disease. No isolation needed."
            },
            testTakingTip: "When prioritizing TB patients, look for signs of ACTIVE disease: prolonged cough, night sweats, weight loss, hemoptysis, and risk factors (homelessness, incarceration, immunocompromise). Positive PPD alone ≠ isolation.",
            guideSection: "Section 4 — Clinical Manifestations",
            guideSectionId: "clinical-manifestations"
        },
        {
            id: 8,
            type: "sata",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is monitoring a patient on RIPE therapy for side effects. Which findings should the nurse report to the provider immediately? (Select all that apply.)",
            options: [
                { id: "a", text: "Orange-colored urine" },
                { id: "b", text: "Tingling and numbness in the feet" },
                { id: "c", text: "Blurred vision and difficulty distinguishing red from green" },
                { id: "d", text: "Elevated uric acid level of 9.2 mg/dL with joint pain" },
                { id: "e", text: "Mild nausea when taking medications on an empty stomach" }
            ],
            correct: ["b", "c", "d"],
            rationale: {
                correct: "Peripheral neuropathy (isoniazid), visual changes (ethambutol), and hyperuricemia with gout-like symptoms (pyrazinamide) are adverse effects requiring provider notification and potential medication adjustment.",
                a: "EXPECTED — Orange-colored urine, tears, and sweat are a benign, expected effect of rifampin. The patient should be educated about this in advance but it does not require urgent notification.",
                b: "REPORT — Tingling and numbness indicate peripheral neuropathy from isoniazid (INH). This occurs due to B6 depletion and may require increased pyridoxine supplementation or medication adjustment.",
                c: "REPORT — Blurred vision and red-green color blindness are signs of optic neuritis caused by ethambutol. This is potentially irreversible and the drug must be stopped immediately.",
                d: "REPORT — Pyrazinamide inhibits uric acid excretion, causing hyperuricemia. An elevated uric acid (normal: 3.5-7.2 mg/dL in males) with joint pain suggests gout and requires medication review.",
                e: "EXPECTED — Mild GI upset is common with TB medications. Taking them with food (if allowed per medication guidelines) or at bedtime can help. This does not require urgent provider notification unless severe."
            },
            labValues: [
                { name: "Uric Acid (Male)", normal: "3.5–7.2 mg/dL" },
                { name: "Uric Acid (Female)", normal: "2.6–6.0 mg/dL" }
            ],
            testTakingTip: "Match each RIPE drug to its signature side effect: Rifampin = Red/orange secretions (expected); Isoniazid = peripheral neuropathy + hepatotoxicity; Pyrazinamide = hyperuricemia + hepatotoxicity; Ethambutol = Eye (optic neuritis). The mnemonic: RIPE = Red, Isoniazid-neuropathy, Pee-uric acid, Eyes.",
            guideSection: "Section 7 — RIPE Therapy",
            guideSectionId: "ripe-therapy"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is performing contact tracing for a patient diagnosed with active pulmonary TB. The patient lives with a spouse, two school-aged children, and an elderly parent who takes prednisone for rheumatoid arthritis. Which household member is at HIGHEST priority for immediate testing and possible prophylactic treatment?",
            options: [
                { id: "a", text: "The spouse, who reports no symptoms" },
                { id: "b", text: "The 8-year-old child, who has a cough" },
                { id: "c", text: "The 12-year-old child, who feels well" },
                { id: "d", text: "The elderly parent on prednisone" }
            ],
            correct: "d",
            rationale: {
                correct: "The elderly parent on chronic prednisone (a corticosteroid that suppresses the immune system) is at the highest risk for progressing from exposure to active TB. Immunosuppressed individuals are the highest priority for testing and prophylaxis because they are least able to contain the infection.",
                a: "The spouse is a close contact and needs testing, but without immunosuppression, the risk of rapid progression is lower than the immunocompromised parent.",
                b: "The coughing child needs evaluation, but the cough could have many causes. While children under 4 are at higher risk for TB progression, at age 8 the immunocompromised grandparent still takes priority.",
                c: "The asymptomatic 12-year-old needs testing as a household contact but is lowest priority among these options due to being older and having a functional immune system."
            },
            testTakingTip: "In contact tracing, prioritize immunocompromised individuals first (HIV, organ transplant, chronic steroids), then children under 5, then other close contacts. Immunosuppression = faster progression from latent to active TB.",
            guideSection: "Section 8 — Nursing Care & Patient Education",
            guideSectionId: "nursing-care"
        },
        {
            id: 10,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse on a medical unit suspects that a newly admitted patient may have active tuberculosis after learning the patient has had a productive cough for 4 weeks, unintentional weight loss, and recently emigrated from a country with high TB prevalence. The patient is currently in a standard semi-private room. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Obtain sputum specimens for AFB smear and culture" },
                { id: "b", text: "Apply an N95 respirator and move the patient to a negative-pressure room" },
                { id: "c", text: "Administer a tuberculin skin test" },
                { id: "d", text: "Notify the public health department for contact tracing" }
            ],
            correct: "b",
            rationale: {
                correct: "The immediate priority is protecting others from potential exposure. The nurse should put on an N95 respirator and transfer the patient to a negative-pressure airborne infection isolation room (AIIR) as quickly as possible. In a semi-private room, the roommate and other patients are at risk of exposure with every cough.",
                a: "Sputum specimens are essential for confirming the diagnosis but collecting them is the SECOND priority after isolating the patient. You cannot draw labs in a semi-private room while potentially exposing the roommate.",
                c: "A TST takes 48-72 hours to read and is less useful in diagnosing active TB (it can be negative in active disease due to anergy). Isolation is the immediate action.",
                d: "Public health notification is important but not the FIRST action. The immediate threat is ongoing transmission in a shared room."
            },
            testTakingTip: "When the NCLEX gives you a patient with suspected TB in a non-isolated setting, the FIRST action is always isolation (protect others). Think safety first: isolate → then diagnose → then notify.",
            guideSection: "Section 6 — Airborne Isolation Precautions",
            guideSectionId: "isolation"
        }
    ]
};
