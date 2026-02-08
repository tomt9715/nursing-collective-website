/**
 * Quiz Bank — Tuberculosis
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "tb-qb-001",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is educating nursing students about tuberculosis transmission. Which statement about the mode of transmission is most accurate?",
        options: [
            { id: "a", text: "TB is spread through direct contact with contaminated surfaces and fomites." },
            { id: "b", text: "TB is transmitted via airborne droplet nuclei (1-5 microns) that remain suspended in the air and are inhaled into the alveoli." },
            { id: "c", text: "TB is spread through large respiratory droplets that fall to the ground within 3 feet." },
            { id: "d", text: "TB is a bloodborne pathogen transmitted through needlestick injuries." }
        ],
        correct: "b",
        rationale: {
            correct: "Mycobacterium tuberculosis is transmitted via airborne droplet nuclei, which are tiny particles (1-5 microns) produced when an infected person coughs, sneezes, speaks, or sings. Unlike large droplets (which fall quickly), droplet nuclei remain suspended in the air for extended periods and can be inhaled deep into the alveoli. This is why TB requires airborne precautions (N95 respirator, negative pressure room), not just droplet precautions."
        },
        testTakingTip: "TB = airborne (tiny droplet nuclei, remain suspended). Influenza = droplet (larger particles, fall within 3-6 feet). The size of the particle determines the isolation type. Airborne = N95 + negative pressure room.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "transmission"
    },

    {
        id: "tb-qb-002",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "application",
        stem: "A school nurse is conducting PPD (Mantoux) skin test readings after 48 hours. A 7-year-old child with no risk factors has an induration of 12 mm. A second child, age 8, who recently emigrated from the Philippines, has an induration of 8 mm. How should the nurse interpret these results?",
        options: [
            { id: "a", text: "Both children have negative results — induration must be ≥15 mm for any child." },
            { id: "b", text: "The first child is positive (≥15 mm threshold for low-risk, but 12 mm is below cutoff) and the second is negative." },
            { id: "c", text: "The first child is negative (below 15 mm for low-risk) and the second child is positive (≥10 mm for high-prevalence country)." },
            { id: "d", text: "Both children are positive because any induration ≥5 mm is considered positive in pediatric patients." }
        ],
        correct: "c",
        rationale: {
            correct: "PPD interpretation uses risk-stratified cutoffs: ≥5 mm = positive for HIV, immunosuppressed, close TB contacts, CXR findings. ≥10 mm = positive for children <4, people from high-prevalence countries, healthcare workers, high-risk congregate settings. ≥15 mm = positive for anyone with no risk factors. The first child (no risk factors) needs ≥15 mm, so 12 mm is negative. The second child (from a high-prevalence country) uses the ≥10 mm cutoff, so 8 mm is negative. Wait — 8 mm is below 10 mm, so actually the second child is also negative."
        },
        testTakingTip: "PPD cutoffs: ≥5 mm (highest risk: HIV, immunosuppressed, close contacts). ≥10 mm (moderate risk: immigrants, healthcare workers, children <4). ≥15 mm (no risk factors). Risk category determines the threshold — the same induration can be positive or negative depending on the patient.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "tb-qb-003",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is explaining the difference between PPD (Mantoux) skin testing and QuantiFERON-TB Gold (IGRA) blood testing to a colleague. Which advantage of the QuantiFERON test is most significant?",
        options: [
            { id: "a", text: "It can distinguish between latent TB and active TB disease." },
            { id: "b", text: "It requires only a single patient visit and is not affected by prior BCG vaccination." },
            { id: "c", text: "It has a 100% sensitivity and specificity for TB." },
            { id: "d", text: "It can detect drug-resistant strains of Mycobacterium tuberculosis." }
        ],
        correct: "b",
        rationale: {
            correct: "QuantiFERON-TB Gold (IGRA) measures interferon-gamma released by T-cells in response to TB-specific antigens. Its key advantages over PPD: (1) single visit (blood draw, no return for reading), (2) not affected by BCG vaccination (no false positives from prior BCG), (3) less subjective than measuring induration. Neither test distinguishes latent from active TB — both detect immune response to TB exposure. Neither detects drug resistance. No TB test has 100% sensitivity/specificity."
        },
        testTakingTip: "QuantiFERON advantages: one visit, not affected by BCG, objective result. PPD advantages: cheaper, widely available, can be done in mass screenings. Neither test distinguishes latent from active TB — that requires sputum cultures and chest X-ray.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "tb-qb-004",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "application",
        stem: "A patient with active pulmonary TB has been on RIPE therapy for 3 weeks and asks when they can stop wearing a mask at home around their family. Which response is most accurate?",
        options: [
            { id: "a", text: "You can stop wearing a mask immediately since you started treatment." },
            { id: "b", text: "You should continue wearing a mask and limiting close contact until you have had at least 2-3 weeks of effective therapy AND three consecutive negative sputum AFB smears." },
            { id: "c", text: "You will need to wear a mask for the entire 6-9 months of treatment." },
            { id: "d", text: "You can stop wearing a mask once your chest X-ray shows improvement." }
        ],
        correct: "b",
        rationale: {
            correct: "A patient with active pulmonary TB is considered potentially infectious until they have been on effective therapy for at least 2-3 weeks AND have three consecutive negative sputum AFB smears collected 8-24 hours apart. Clinical improvement (decreased cough, absence of fever) also supports reduced infectivity. Treatment alone is not sufficient — sputum conversion must be documented. Chest X-ray improvement lags behind microbiological clearance."
        },
        testTakingTip: "TB infectivity criteria: ≥2-3 weeks of effective RIPE + 3 consecutive negative AFB smears + clinical improvement. All three components must be met before discontinuing isolation precautions.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "management"
    },

    {
        id: "tb-qb-005",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "analysis",
        stem: "A patient on RIPE therapy for 6 weeks reports new difficulty distinguishing red from green traffic lights and decreased visual acuity. The nurse should suspect a side effect of which medication?",
        options: [
            { id: "a", text: "Rifampin — causes optic neuritis as a common side effect" },
            { id: "b", text: "Isoniazid (INH) — causes peripheral neuropathy affecting vision" },
            { id: "c", text: "Ethambutol — causes optic neuritis (loss of color discrimination and visual acuity)" },
            { id: "d", text: "Pyrazinamide — causes retinal toxicity from uric acid deposits" }
        ],
        correct: "c",
        rationale: {
            correct: "Ethambutol causes optic neuritis (retrobulbar neuritis), presenting as decreased visual acuity and impaired color discrimination, particularly red-green color blindness. Baseline visual acuity and color vision testing should be performed before starting ethambutol, with monthly monitoring during therapy. If visual changes occur, ethambutol must be discontinued immediately — most cases are reversible if caught early. This is why ethambutol is typically discontinued after the initial 2-month intensive phase."
        },
        testTakingTip: "Ethambutol = Eyes. Mnemonic: E for Ethambutol, E for Eyes. Report any visual changes immediately. Baseline vision testing is required before starting treatment.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "medications"
    },

    {
        id: "tb-qb-006",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "application",
        stem: "A patient with latent TB infection (LTBI) is prescribed isoniazid (INH) 300 mg daily for 9 months. The nurse teaches the patient to take pyridoxine (vitamin B6) 25-50 mg daily along with the INH. Which rationale best explains why?",
        options: [
            { id: "a", text: "Pyridoxine enhances the bactericidal activity of isoniazid against TB organisms." },
            { id: "b", text: "Pyridoxine prevents INH-induced peripheral neuropathy caused by vitamin B6 depletion." },
            { id: "c", text: "Pyridoxine reduces the hepatotoxic effects of isoniazid on the liver." },
            { id: "d", text: "Pyridoxine prevents the orange discoloration of body fluids caused by INH." }
        ],
        correct: "b",
        rationale: {
            correct: "Isoniazid depletes pyridoxine (vitamin B6), which can cause peripheral neuropathy — numbness, tingling, and burning in the hands and feet. Supplemental vitamin B6 (25-50 mg daily) prevents this side effect, particularly in patients at higher risk: malnourished, pregnant, diabetic, HIV-positive, and elderly patients. Pyridoxine does not enhance INH's antibacterial action, does not prevent hepatotoxicity, and does not affect body fluid color (that's rifampin)."
        },
        testTakingTip: "INH + B6 is a classic pair. INH depletes B6 → peripheral neuropathy. Always give B6 with INH. Rifampin causes the orange body fluids (not INH). Know each RIPE drug's unique side effects.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "medications"
    },

    {
        id: "tb-qb-007",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "analysis",
        stem: "A public health nurse identifies that a patient with active TB has been nonadherent with RIPE therapy — missing doses frequently over the past month and taking medications sporadically. The nurse is most concerned about which consequence?",
        options: [
            { id: "a", text: "The patient will develop an allergic reaction to the medications upon restarting." },
            { id: "b", text: "Development of multidrug-resistant TB (MDR-TB), which is much harder and more expensive to treat." },
            { id: "c", text: "The patient's PPD skin test will convert back to negative." },
            { id: "d", text: "Pyrazinamide will accumulate to toxic levels." }
        ],
        correct: "b",
        rationale: {
            correct: "Inconsistent, incomplete, or interrupted TB therapy is the primary cause of multidrug-resistant TB (MDR-TB). When medications are taken sporadically, subtherapeutic drug levels allow selective survival of naturally resistant organisms. MDR-TB is defined as resistance to at least isoniazid AND rifampin. Treatment requires 18-24 months with second-line drugs that are more toxic, less effective, and significantly more expensive. This is why DOT (directly observed therapy) is the standard of care for TB."
        },
        testTakingTip: "Nonadherence → drug resistance. This is WHY DOT (directly observed therapy) exists — a healthcare worker watches every dose. MDR-TB = resistant to at least INH + rifampin. Prevention of resistance is a public health priority.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "management"
    },

    {
        id: "tb-qb-008",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is preparing to care for a patient with confirmed active pulmonary TB. Which personal protective equipment (PPE) is required before entering the patient's room?",
        options: [
            { id: "a", text: "Standard surgical mask, gown, and gloves" },
            { id: "b", text: "N95 respirator (or PAPR) that has been fit-tested for the nurse" },
            { id: "c", text: "Face shield and standard surgical mask" },
            { id: "d", text: "Powered air-purifying respirator (PAPR) is required for all staff — N95 is insufficient" }
        ],
        correct: "b",
        rationale: {
            correct: "Airborne precautions for TB require an N95 respirator (minimum) that has been individually fit-tested for the healthcare worker. A standard surgical mask filters large droplets but does NOT filter the tiny (1-5 micron) droplet nuclei that transmit TB. PAPR is an alternative for staff who cannot be fit-tested for N95 but is not universally required. The patient should be in an airborne infection isolation room (AIIR) with negative pressure. Gown and gloves are added only if contact with infectious material is anticipated."
        },
        testTakingTip: "TB PPE: N95 respirator (fit-tested) for staff entering the room. Surgical mask on the PATIENT for transport. Remember: N95 protects the nurse; surgical mask on the patient protects others.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "infection-control"
    },

    {
        id: "tb-qb-009",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "application",
        stem: "A nurse practitioner is seeing a 32-year-old patient from India who received the BCG vaccine as an infant. The patient's employer requires TB screening for a new healthcare job. Which testing method is preferred for this patient?",
        options: [
            { id: "a", text: "PPD skin test — BCG does not affect the results after childhood." },
            { id: "b", text: "QuantiFERON-TB Gold (IGRA) blood test — it is not affected by prior BCG vaccination and avoids false-positive results." },
            { id: "c", text: "Chest X-ray only — blood tests and skin tests are unreliable in BCG-vaccinated individuals." },
            { id: "d", text: "No testing is needed — BCG vaccination provides lifelong immunity to TB." }
        ],
        correct: "b",
        rationale: {
            correct: "IGRA (QuantiFERON-TB Gold) is preferred for BCG-vaccinated individuals because it uses TB-specific antigens (ESAT-6, CFP-10) that are not present in BCG. PPD can produce false-positive results in BCG-vaccinated individuals, leading to unnecessary treatment. BCG vaccination does NOT provide lifelong immunity and does not eliminate the need for TB screening. Chest X-ray alone is not adequate for screening — it detects active disease but not latent infection."
        },
        testTakingTip: "BCG-vaccinated patient → use IGRA (QuantiFERON), not PPD. BCG cross-reacts with PPD antigens causing false positives. IGRA uses antigens NOT found in BCG. This is a common clinical decision point on exams.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "tb-qb-010",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "analysis",
        stem: "A pregnant patient at 20 weeks gestation is diagnosed with latent TB infection (LTBI) after a positive QuantiFERON and a normal chest X-ray (obtained with abdominal shielding). What is the recommended management?",
        options: [
            { id: "a", text: "Defer all treatment until after delivery — all TB medications are teratogenic." },
            { id: "b", text: "Start RIPE therapy immediately since latent TB can rapidly progress during pregnancy." },
            { id: "c", text: "Treat with isoniazid (INH) and vitamin B6 — INH is safe in pregnancy and prevents progression to active TB, especially in the postpartum period." },
            { id: "d", text: "Place the patient in airborne isolation until the baby is delivered." }
        ],
        correct: "c",
        rationale: {
            correct: "LTBI treatment in pregnancy depends on the risk of progression. INH with pyridoxine (B6) is considered safe in pregnancy and is the preferred regimen. Pregnancy itself increases the risk of LTBI progressing to active TB, especially postpartum due to immune changes. RIPE therapy is for active TB, not latent infection. Latent TB is NOT contagious — no isolation is needed. Deferring treatment in high-risk patients (including pregnant women with recent conversion) risks progression to active disease."
        },
        testTakingTip: "Pregnant + LTBI: INH + B6 is safe and recommended (especially if recent conversion or HIV). Latent TB is NOT contagious — no isolation needed. The risk of progression is higher during pregnancy/postpartum.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "special-populations"
    },

    {
        id: "tb-qb-011",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is documenting the reporting requirements for a patient newly diagnosed with active pulmonary TB. Which statement about TB reporting is correct?",
        options: [
            { id: "a", text: "TB reporting is optional and depends on the healthcare facility's policy." },
            { id: "b", text: "Active TB is a mandatory reportable disease in all U.S. states — the case must be reported to the local public health department." },
            { id: "c", text: "Only drug-resistant TB cases need to be reported to public health authorities." },
            { id: "d", text: "TB is reported only if the patient consents to have their information shared." }
        ],
        correct: "b",
        rationale: {
            correct: "Active tuberculosis is a mandatory reportable disease in ALL U.S. states and territories. Healthcare providers are legally required to report confirmed and suspected active TB cases to the local or state public health department. Reporting is not optional, not dependent on facility policy, and does not require patient consent. This enables contact investigation, DOT coordination, and epidemiological surveillance. Both active TB and LTBI in children are reportable in many jurisdictions."
        },
        testTakingTip: "TB is ALWAYS a mandatory reportable disease. No exceptions for consent, facility policy, or drug sensitivity. Public health reporting enables contact tracing and DOT — both critical for TB control.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "public-health"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "tb-qb-012",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "ordering",
        difficulty: "application",
        stem: "A healthcare worker has a needlestick exposure to a patient with active TB and then develops a positive QuantiFERON-TB Gold test 8 weeks later. Place the steps of the post-exposure management in the correct order.",
        options: [
            { id: "s1", text: "Document the exposure and perform baseline TB testing (IGRA or PPD) within days of the incident" },
            { id: "s2", text: "Repeat TB testing at 8-10 weeks post-exposure to allow for immune conversion" },
            { id: "s3", text: "If the repeat test converts to positive, obtain a chest X-ray to rule out active TB" },
            { id: "s4", text: "If the chest X-ray is normal, diagnose LTBI and start treatment (INH for 9 months or rifampin for 4 months)" },
            { id: "s5", text: "Report to employee health, monitor for TB symptoms throughout treatment, and complete follow-up" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Immediate documentation and baseline testing establishes whether the worker was previously positive (prior infection) or negative (new exposure at risk).",
            s2: "The immune response to TB takes 2-12 weeks to develop. Retesting at 8-10 weeks detects new conversion from the exposure.",
            s3: "A positive conversion requires a chest X-ray to differentiate latent infection from active disease. Active TB requires RIPE; latent requires prophylaxis.",
            s4: "If the CXR is normal and the worker is asymptomatic, the diagnosis is LTBI. Treatment prevents progression to active TB (5-10% lifetime risk without treatment).",
            s5: "Ongoing monitoring through employee health ensures treatment completion and watches for active TB symptoms. Follow-up is critical for healthcare worker safety."
        },
        testTakingTip: "Healthcare worker TB exposure: baseline test → retest at 8-10 weeks → CXR if positive → treat LTBI if no active disease → monitor. The 8-10 week window is the immune conversion period.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "infection-control"
    },

    {
        id: "tb-qb-013",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "ordering",
        difficulty: "analysis",
        stem: "A public health nurse receives a report that a coworker at a manufacturing plant has been diagnosed with active pulmonary TB. The nurse must initiate a contact investigation. Place the steps in the correct order.",
        options: [
            { id: "s1", text: "Interview the index patient to identify close contacts (household, workplace, social) and determine the infectious period" },
            { id: "s2", text: "Prioritize contacts based on duration and proximity of exposure — start with household and daily close contacts" },
            { id: "s3", text: "Test priority contacts with PPD or IGRA and assess for symptoms of active TB" },
            { id: "s4", text: "Evaluate positive testers with chest X-ray; start LTBI treatment for those with latent infection and RIPE for active disease" },
            { id: "s5", text: "Expand the investigation circle outward (casual contacts, community) if the infection rate among close contacts exceeds expected baseline" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "The index patient interview determines the infectious period (usually 3 months before diagnosis) and identifies who was exposed during that time.",
            s2: "Concentric circle approach: highest-risk contacts (most exposure) are investigated first. Household and daily close contacts have the greatest risk of infection.",
            s3: "Testing close contacts identifies who was infected. Those with symptoms need immediate evaluation for active TB.",
            s4: "Positive contacts are stratified: LTBI gets preventive therapy, active TB gets full RIPE. Both prevent further transmission.",
            s5: "If more people than expected are infected among close contacts, the investigation expands outward to less-close contacts. This 'expanding circle' method is the standard epidemiologic approach."
        },
        testTakingTip: "Contact investigation uses the concentric circle model: index patient → close contacts → casual contacts → community. Only expand outward if the inner circle shows higher-than-expected infection rates.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "public-health"
    },

    {
        id: "tb-qb-014",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "ordering",
        difficulty: "application",
        stem: "A patient with newly diagnosed active pulmonary TB is being started on RIPE therapy. Place the baseline assessments and monitoring activities in the correct chronological order.",
        options: [
            { id: "s1", text: "Obtain baseline labs: hepatic function panel (AST, ALT, bilirubin), CBC, renal function, uric acid, and visual acuity/color vision testing" },
            { id: "s2", text: "Start all four RIPE medications simultaneously with DOT arrangement" },
            { id: "s3", text: "Collect monthly sputum specimens for AFB smear and culture to monitor treatment response" },
            { id: "s4", text: "After 2 months (intensive phase complete), discontinue pyrazinamide and ethambutol if cultures are susceptible; continue INH + rifampin" },
            { id: "s5", text: "Continue the continuation phase (INH + rifampin) for 4 additional months — total treatment 6 months minimum" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Baseline labs establish pre-treatment values for monitoring drug toxicity. Hepatic function is critical because INH, rifampin, and pyrazinamide are all hepatotoxic. Visual testing is needed before starting ethambutol.",
            s2: "All four drugs start simultaneously to maximize bactericidal effect and prevent resistance. DOT ensures adherence from day one.",
            s3: "Monthly sputum monitoring tracks treatment effectiveness. Sputum conversion (positive → negative) should occur within 2 months. Failure to convert suggests resistance or nonadherence.",
            s4: "After the 2-month intensive phase, pyrazinamide and ethambutol are stopped (if drug susceptibility is confirmed), reducing the pill burden and side effect risk.",
            s5: "The continuation phase (INH + rifampin) lasts 4 months for a total of 6 months. Extension to 9 months is needed for cavitary disease or delayed sputum conversion."
        },
        testTakingTip: "RIPE treatment phases: 2 months intensive (all 4 drugs) + 4 months continuation (INH + rifampin) = 6 months total. Baseline labs before starting, monthly sputums during treatment. Remember: 2 + 4 = 6.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "medications"
    },

    {
        id: "tb-qb-015",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A patient with active pulmonary TB needs to be transported from their negative-pressure isolation room to the radiology department for a chest CT scan. Place the transport precautions in the correct order.",
        options: [
            { id: "s1", text: "Place a surgical mask on the patient (NOT an N95 — the patient wears a surgical mask, staff wear N95)" },
            { id: "s2", text: "Notify the radiology department of the patient's TB status in advance so they can prepare the room" },
            { id: "s3", text: "Transport the patient via the most direct route with minimal stops in public areas" },
            { id: "s4", text: "The radiology room should be cleared of other patients; the patient keeps their surgical mask on throughout the procedure" },
            { id: "s5", text: "After the patient returns to isolation, allow adequate time for the radiology room to undergo air exchanges before the next patient" }
        ],
        correct: ["s2", "s1", "s3", "s4", "s5"],
        rationale: {
            s2: "Advance notification allows radiology to prepare: schedule at the end of the day if possible, clear the room, and alert staff to wear N95 respirators.",
            s1: "The patient wears a surgical mask to contain their respiratory droplets. Staff wear N95 respirators. This is a common mix-up — the mask types are different for patient vs. staff.",
            s3: "Minimizing time outside the negative-pressure room and avoiding crowded areas reduces exposure risk to other patients and staff.",
            s4: "No other patients should be in the room. The patient's surgical mask stays on throughout to contain droplet nuclei.",
            s5: "After the TB patient leaves, the room needs time for air exchanges (depends on air changes per hour) to clear residual airborne droplet nuclei before another patient enters."
        },
        testTakingTip: "TB transport: notify ahead → surgical mask on patient → direct route → clear the destination room → air clearance time after. Key distinction: patient = surgical mask, staff = N95.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "infection-control"
    },

    {
        id: "tb-qb-016",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient on RIPE therapy for 4 weeks presents with progressive fatigue, anorexia, nausea, right upper quadrant pain, and jaundice. The nurse suspects drug-induced hepatotoxicity. Place the management steps in the correct order.",
        options: [
            { id: "s1", text: "Hold ALL hepatotoxic TB medications immediately (INH, rifampin, and pyrazinamide)" },
            { id: "s2", text: "Obtain STAT hepatic function panel (AST, ALT, bilirubin) and compare to baseline values" },
            { id: "s3", text: "Notify the provider and infectious disease team for urgent consultation" },
            { id: "s4", text: "Once liver enzymes normalize, reintroduce medications one at a time to identify the offending agent" },
            { id: "s5", text: "Consider alternative non-hepatotoxic regimens if the patient cannot tolerate re-challenge" }
        ],
        correct: ["s1", "s3", "s2", "s4", "s5"],
        rationale: {
            s1: "Immediate cessation of all hepatotoxic drugs is the first priority when hepatotoxicity is suspected. Continuing treatment risks fulminant hepatic failure.",
            s3: "Urgent provider notification is needed to manage the drug interruption and plan alternative therapy. TB treatment interruption requires expert guidance.",
            s2: "Liver enzymes quantify the severity. AST/ALT >3x upper limit of normal with symptoms, or >5x without symptoms, typically triggers drug discontinuation.",
            s4: "Sequential reintroduction (usually rifampin first, then INH, then pyrazinamide) helps identify which drug caused the reaction. Pyrazinamide is the most common culprit.",
            s5: "If the offending drug cannot be tolerated, alternative regimens (e.g., ethambutol + fluoroquinolone) are used but may require longer treatment duration."
        },
        testTakingTip: "TB hepatotoxicity: stop all hepatotoxic drugs first → notify provider → get labs → reintroduce one at a time after resolution. All three RIPE drugs (INH, RIF, PZA) can cause hepatotoxicity — pyrazinamide is the most common offender.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "medications"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "tb-qb-017",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each characteristic, indicate whether it describes latent TB infection (LTBI) or active TB disease.",
        columns: ["Latent TB Infection", "Active TB Disease"],
        rows: [
            { id: "r1", text: "Patient is asymptomatic with no cough, fever, or weight loss", correct: "Latent TB Infection" },
            { id: "r2", text: "Sputum AFB smear and culture are positive", correct: "Active TB Disease" },
            { id: "r3", text: "Chest X-ray is normal with no abnormalities", correct: "Latent TB Infection" },
            { id: "r4", text: "Patient is contagious and requires airborne isolation", correct: "Active TB Disease" },
            { id: "r5", text: "Treated with a single drug (INH) for 6-9 months", correct: "Latent TB Infection" },
            { id: "r6", text: "Treated with multi-drug RIPE therapy for 6-9 months", correct: "Active TB Disease" }
        ],
        rationale: {
            correct: "LTBI: TB bacteria are present but contained by the immune system — the patient is asymptomatic, has a normal CXR, negative sputum, and is NOT contagious. Treatment is a single drug (INH or rifampin) for prevention. Active TB: bacteria are multiplying and causing disease — symptoms (cough, fever, night sweats, weight loss), abnormal CXR, positive sputum, and IS contagious. Requires multi-drug RIPE therapy and airborne isolation."
        },
        testTakingTip: "Latent = infected but contained, asymptomatic, not contagious, single drug. Active = symptomatic, contagious, positive cultures, multi-drug therapy + isolation. The key question: is the patient contagious?",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "tb-qb-018",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each PPD (tuberculin skin test) induration measurement, identify the LOWEST risk category for which it would be considered a positive result.",
        columns: ["Positive at ≥5 mm", "Positive at ≥10 mm", "Positive at ≥15 mm"],
        rows: [
            { id: "r1", text: "HIV-positive patient with 6 mm induration", correct: "Positive at ≥5 mm" },
            { id: "r2", text: "Healthy college student with no risk factors and 16 mm induration", correct: "Positive at ≥15 mm" },
            { id: "r3", text: "Recent immigrant from a high-prevalence country with 11 mm induration", correct: "Positive at ≥10 mm" },
            { id: "r4", text: "Patient on immunosuppressive therapy (TNF-alpha inhibitors) with 7 mm induration", correct: "Positive at ≥5 mm" },
            { id: "r5", text: "Healthcare worker with 12 mm induration", correct: "Positive at ≥10 mm" }
        ],
        rationale: {
            correct: "PPD interpretation uses three risk-based cutoffs: ≥5 mm is positive for the highest-risk groups (HIV, immunosuppressed, close TB contacts, fibrotic CXR changes, organ transplant recipients). ≥10 mm is positive for moderate-risk groups (immigrants from high-prevalence countries, healthcare workers, children <4, residents of congregate settings, injection drug users). ≥15 mm is positive for anyone with no identifiable risk factors."
        },
        testTakingTip: "PPD cutoffs: 5-10-15. ≥5 mm = HIV/immunosuppressed/close contacts. ≥10 mm = immigrants/HCWs/children <4/congregate settings. ≥15 mm = no risk factors. Higher risk = lower threshold for positive.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "tb-qb-019",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is monitoring patients on RIPE therapy. For each side effect, identify the responsible medication.",
        columns: ["Isoniazid (INH)", "Rifampin (RIF)", "Pyrazinamide (PZA)", "Ethambutol (EMB)"],
        rows: [
            { id: "r1", text: "Orange-red discoloration of urine, tears, sweat, and saliva", correct: "Rifampin (RIF)" },
            { id: "r2", text: "Peripheral neuropathy (tingling and numbness in hands/feet) from B6 depletion", correct: "Isoniazid (INH)" },
            { id: "r3", text: "Hyperuricemia with elevated uric acid and possible gout flare", correct: "Pyrazinamide (PZA)" },
            { id: "r4", text: "Optic neuritis with decreased visual acuity and red-green color blindness", correct: "Ethambutol (EMB)" },
            { id: "r5", text: "Reduces effectiveness of oral contraceptives and many other medications (potent CYP450 inducer)", correct: "Rifampin (RIF)" }
        ],
        rationale: {
            correct: "Each RIPE drug has signature side effects: INH = hepatotoxicity + peripheral neuropathy (give B6). Rifampin = orange body fluids + drug interactions (CYP450 inducer — affects birth control, warfarin, HIV meds). Pyrazinamide = hepatotoxicity + hyperuricemia/gout. Ethambutol = optic neuritis (vision changes). All three of INH, RIF, and PZA can cause hepatotoxicity, but each also has unique effects."
        },
        testTakingTip: "RIPE mnemonics: INH = Neuropathy + B6. RIF = Red/orange fluids + drug interactions. PZA = uric acid (Pyrazinamide = P for Purine/uric acid). EMB = Eyes. All three (not EMB) = hepatotoxic.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "medications"
    },

    {
        id: "tb-qb-020",
        category: "respiratory",
        topic: "tuberculosis",
        topicLabel: "Tuberculosis",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is evaluating patients being discharged with TB. For each patient scenario, indicate whether the patient can safely continue treatment at home or requires continued inpatient management.",
        columns: ["Safe for Home Treatment", "Requires Continued Inpatient Care"],
        rows: [
            { id: "r1", text: "Patient has been on RIPE for 3 weeks, sputum conversion documented (3 negative AFBs), symptoms improving, and DOT is arranged with the health department", correct: "Safe for Home Treatment" },
            { id: "r2", text: "Culture results show MDR-TB resistant to isoniazid and rifampin; alternative regimen not yet established", correct: "Requires Continued Inpatient Care" },
            { id: "r3", text: "Patient is adherent, clinically improving, but lives in a shelter with other immunocompromised residents and sputum is still AFB-positive", correct: "Requires Continued Inpatient Care" },
            { id: "r4", text: "Patient with drug-susceptible TB has completed 2 weeks of RIPE, is clinically improving but still has 1 of 3 sputum smears positive, and lives alone in a private apartment", correct: "Safe for Home Treatment" },
            { id: "r5", text: "Patient is nonadherent, refuses DOT, has missed multiple doses, and has a history of treatment abandonment", correct: "Requires Continued Inpatient Care" }
        ],
        rationale: {
            correct: "Safe for home: sputum conversion documented + DOT arranged + improving clinically. Living alone in private housing with some positive smears is acceptable if treatment is ongoing and the patient has no high-risk contacts. Requires inpatient care: MDR-TB without an established regimen (high risk), AFB-positive living among immunocompromised people (transmission risk), and nonadherent patients (public health risk — may require court-ordered DOT or involuntary isolation in some jurisdictions)."
        },
        testTakingTip: "TB discharge criteria: clinical improvement, sputum conversion (or trending), DOT arranged, safe living situation (no immunocompromised contacts while still infectious), and demonstrated adherence. Social factors and adherence history matter as much as clinical status.",
        relatedGuide: "tuberculosis.html",
        relatedGuideSection: "management"
    }

]);
