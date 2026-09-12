/**
 * Pneumonia Quiz - Question Data
 * Extracted from guides/pneumonia.html practice questions section.
 * 8 NCLEX-style questions: 4 Single, 2 Priority, 1 Ordering, 1 Matrix
 */

/* exported pneumoniaQuizData */
var pneumoniaQuizData = {
    guideName: "Pneumonia",
    guideSlug: "pneumonia",
    category: "Respiratory",
    categoryColor: "#3b82f6",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient develops pneumonia 4 days after being admitted for a hip fracture repair. The nurse classifies this as:",
            options: [
                { id: "a", text: "Community-acquired pneumonia (CAP)" },
                { id: "b", text: "Hospital-acquired pneumonia (HAP)" },
                { id: "c", text: "Aspiration pneumonia" },
                { id: "d", text: "Ventilator-associated pneumonia (VAP)" }
            ],
            correct: "b",
            rationale: {
                correct: "Hospital-acquired pneumonia (HAP) is defined as pneumonia that develops \u226548 hours after hospital admission and was not incubating at the time of admission. This patient developed symptoms 4 days (96 hours) post-admission, clearly meeting the HAP criteria. HAP requires broader-spectrum antibiotic coverage due to hospital-associated pathogens (Pseudomonas, MRSA, Klebsiella).",
                a: "CAP develops in patients who have not been hospitalized in the past 90 days. This patient\u2019s pneumonia developed while in the hospital.",
                c: "Aspiration pneumonia results from inhalation of oropharyngeal or gastric contents. While post-surgical patients are at risk, there\u2019s no evidence of aspiration in this scenario.",
                d: "VAP is a subtype of HAP that develops \u226548 hours after endotracheal intubation. There\u2019s no mention of mechanical ventilation in this scenario."
            },
            testTakingTip: "The 48-hour rule: Pneumonia onset \u226548 hours after admission = HAP. <48 hours = likely CAP (incubating on arrival). VAP = HAP + ventilator. The classification determines which antibiotics to use - HAP needs broader coverage.",
            guideSection: "Section 4 - CAP vs HAP vs VAP",
            guideSectionId: "classification"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for four patients with pneumonia. Which patient requires the MOST immediate attention?",
            options: [
                { id: "a", text: "45-year-old with a temperature of 101.2\u00b0F and productive cough with yellow sputum" },
                { id: "b", text: "72-year-old with confusion, BP 86/52, RR 28, and SpO2 88%" },
                { id: "c", text: "55-year-old requesting pain medication for pleuritic chest pain" },
                { id: "d", text: "38-year-old with a WBC count of 14,500 awaiting first antibiotic dose" }
            ],
            correct: "b",
            rationale: {
                correct: "This elderly patient shows signs of sepsis secondary to pneumonia: confusion (altered mental status), hypotension (BP 86/52), tachypnea (RR 28), and hypoxemia (SpO2 88%). This meets SIRS/sepsis criteria and indicates organ dysfunction. The elderly often present atypically - confusion may be the only early sign. This patient needs immediate IV fluids, oxygen, blood cultures, and antibiotics.",
                a: "Fever and productive cough are expected pneumonia symptoms and are not acutely life-threatening.",
                c: "Pleuritic chest pain is common with pneumonia and, while important to manage, is not immediately life-threatening compared to sepsis.",
                d: "While timely antibiotic administration is important (within 4 hours of diagnosis), this patient\u2019s vitals appear stable, unlike patient B who is hemodynamically unstable."
            },
            testTakingTip: "Priority questions: Look for hemodynamic instability. Confusion + hypotension + tachypnea in an elderly patient = sepsis until proven otherwise. The elderly often don\u2019t mount fevers - confusion may be the ONLY early sign of serious infection. Always prioritize ABCs.",
            guideSection: "Section 8 - Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 3,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A 72-year-old patient is admitted from the ED with community-acquired pneumonia - temperature 102.4\u00b0F, productive cough with rust-colored sputum, SpO2 89% on room air, and RR 28. Place the nursing priorities in the correct order.",
            options: [
                { id: "a", text: "Apply supplemental oxygen to maintain SpO2 \u226594%" },
                { id: "b", text: "Obtain blood cultures BEFORE starting antibiotics" },
                { id: "c", text: "Obtain sputum specimen for culture and sensitivity" },
                { id: "d", text: "Administer prescribed antibiotics within 1 hour of admission" },
                { id: "e", text: "Initiate IV fluids for hydration" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Pneumonia admission priorities follow ABCs combined with the evidence-based care bundle. Oxygenation first, then cultures BEFORE antibiotics, then timely antibiotic administration, then supportive hydration.",
                a: "FIRST - SpO2 of 89% with tachypnea indicates significant hypoxemia. Apply supplemental oxygen targeting SpO2 \u226594%. Oxygenation is always the top priority.",
                b: "SECOND - Blood cultures (2 sets from 2 sites) must be drawn BEFORE the first antibiotic dose. Antibiotics can sterilize blood within minutes, making cultures falsely negative.",
                c: "THIRD - Obtain sputum from a deep cough for culture and Gram stain before antibiotics are given. This helps identify the causative organism.",
                d: "FOURTH - Administer antibiotics as soon as cultures are obtained. CMS quality measures require antibiotics within 4 hours (within 1 hour for severe cases).",
                e: "FIFTH - IV hydration supports increased metabolic needs from fever and tachypnea, thins secretions, and maintains hemodynamic stability."
            },
            testTakingTip: "Pneumonia bundle: O2 first (ABCs) \u2192 Cultures BEFORE antibiotics \u2192 Antibiotics within 1 hour \u2192 IV fluids. The 'cultures before antibiotics' rule is one of the most tested pneumonia concepts.",
            guideSection: "Section 8 - Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is reviewing a chest X-ray report for a patient with suspected pneumonia. The report describes \"dense consolidation of the right lower lobe with air bronchograms.\" The nurse understands this finding indicates:",
            options: [
                { id: "a", text: "A pleural effusion compressing the right lung" },
                { id: "b", text: "The alveoli are filled with fluid/exudate while bronchi remain air-filled" },
                { id: "c", text: "A pneumothorax in the right lower lobe" },
                { id: "d", text: "Atelectasis from mucus plugging" }
            ],
            correct: "b",
            rationale: {
                correct: "Consolidation on CXR means the alveoli are filled with inflammatory exudate, pus, or fluid instead of air, appearing as a white opacity. Air bronchograms occur when the air-filled bronchi become visible against the opacified (fluid-filled) surrounding lung tissue - this is a hallmark finding of pneumonia, particularly bacterial lobar pneumonia.",
                a: "Pleural effusion appears as a blunting of the costophrenic angle or a layering fluid opacity, not as lobar consolidation with air bronchograms.",
                c: "Pneumothorax shows as increased lucency (darkness/blackness) with absent lung markings, not as a dense white consolidation.",
                d: "Atelectasis shows volume loss with shift of structures toward the affected side. Consolidation shows opacity WITHOUT volume loss - air bronchograms help differentiate the two."
            },
            testTakingTip: "CXR basics: White (opaque) = fluid/consolidation. Black (lucent) = air. Air bronchograms = pneumonia classic finding. Costophrenic angle blunting = pleural effusion. Absent lung markings with hyperlucency = pneumothorax.",
            guideSection: "Section 6 - Diagnostics & CXR",
            guideSectionId: "diagnostics"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is collecting a sputum specimen from a patient with pneumonia. Which technique ensures the most accurate results?",
            options: [
                { id: "a", text: "Collect the specimen after the patient eats breakfast" },
                { id: "b", text: "Instruct the patient to spit saliva into the collection cup" },
                { id: "c", text: "Collect the specimen first thing in the morning before eating or drinking" },
                { id: "d", text: "Have the patient gargle with mouthwash before collecting the specimen" }
            ],
            correct: "c",
            rationale: {
                correct: "Sputum specimens should be collected early in the morning before eating, drinking, or oral care because secretions pool overnight, providing the most concentrated sample of organisms. The patient should rinse the mouth with WATER only (not mouthwash), then take several deep breaths and cough deeply to produce sputum from the lower respiratory tract.",
                a: "Eating introduces food particles and oral bacteria that contaminate the specimen, potentially giving false results.",
                b: "Saliva is NOT sputum. The specimen must come from deep in the lungs (produced by a deep cough), not from the mouth. Saliva contains normal oral flora that contaminate the culture.",
                d: "Antiseptic mouthwash can kill bacteria in the specimen, producing false-negative results. Rinse with plain water only."
            },
            testTakingTip: "Sputum collection rules: Early morning, before eating/drinking, rinse with WATER only (not mouthwash), deep cough from the lungs (not saliva). Collect before starting antibiotics when possible. Need at least 1-2 teaspoons of sputum.",
            guideSection: "Section 6 - Diagnostics & CXR",
            guideSectionId: "diagnostics"
        },
        {
            id: 6,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Typical (Bacterial) Pneumonia", "Atypical Pneumonia"],
            stem: "A nurse is comparing the presentations of two patients with pneumonia. For each finding, indicate whether it is more characteristic of typical (bacterial) pneumonia or atypical pneumonia.",
            options: [
                { id: "a", text: "Sudden onset with high fever and productive purulent sputum" },
                { id: "b", text: "Gradual onset with low-grade fever and dry hacking cough" },
                { id: "c", text: "Lobar consolidation on chest X-ray" },
                { id: "d", text: "Diffuse bilateral infiltrates on chest X-ray" }
            ],
            correct: { a: "Typical (Bacterial) Pneumonia", b: "Atypical Pneumonia", c: "Typical (Bacterial) Pneumonia", d: "Atypical Pneumonia" },
            rationale: {
                correct: "Typical bacterial pneumonia and atypical pneumonia have distinctly different presentations, onset patterns, and radiographic findings.",
                a: "TYPICAL - Bacterial pneumonia (most commonly S. pneumoniae) presents with acute, sudden onset of high fever, shaking chills, and productive cough with purulent or rust-colored sputum.",
                b: "ATYPICAL - Atypical pneumonia (Mycoplasma, Chlamydophila, Legionella) has gradual onset with low-grade fever, malaise, and persistent dry cough. Often called 'walking pneumonia.'",
                c: "TYPICAL - Bacterial pneumonia causes dense consolidation confined to a single lobe (lobar pneumonia) with air bronchograms on chest X-ray.",
                d: "ATYPICAL - Atypical pneumonia causes diffuse, patchy, bilateral interstitial infiltrates. The 'X-ray looks worse than the patient' pattern is a hallmark of atypical pneumonia."
            },
            testTakingTip: "Typical = sudden, high fever, productive sputum, lobar consolidation. Atypical = gradual, low-grade fever, dry cough, diffuse infiltrates. Key clue: if the CXR looks worse than the patient appears, think atypical.",
            guideSection: "Section 8 - Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is caring for a patient with community-acquired pneumonia. The most common causative organism for CAP is:",
            options: [
                { id: "a", text: "Pseudomonas aeruginosa" },
                { id: "b", text: "Streptococcus pneumoniae" },
                { id: "c", text: "Methicillin-resistant Staphylococcus aureus (MRSA)" },
                { id: "d", text: "Klebsiella pneumoniae" }
            ],
            correct: "b",
            rationale: {
                correct: "Streptococcus pneumoniae (pneumococcus) is the most common bacterial cause of community-acquired pneumonia across all age groups. It typically causes lobar pneumonia with sudden onset of high fever, productive cough with rust-colored sputum, and pleuritic chest pain. The pneumococcal vaccine (PCV13/PPSV23) is recommended for prevention.",
                a: "Pseudomonas is associated with hospital-acquired pneumonia, ventilator-associated pneumonia, and immunocompromised patients - not typical CAP.",
                c: "MRSA pneumonia can occur in the community (CA-MRSA) but is much less common than S. pneumoniae. It\u2019s more commonly associated with HAP.",
                d: "Klebsiella is associated with pneumonia in alcoholics, diabetics, and debilitated patients. It causes \"currant jelly\" sputum but is not the most common overall CAP pathogen."
            },
            testTakingTip: "Key pathogen associations: CAP #1 = S. pneumoniae (rust sputum). Alcoholics = Klebsiella (currant jelly sputum). HAP = Pseudomonas, MRSA. Aspiration = anaerobes (foul-smelling sputum). Atypical = Mycoplasma (walking pneumonia, younger patients).",
            guideSection: "Section 4 - CAP vs HAP vs VAP",
            guideSectionId: "classification"
        },
        {
            id: 8,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with pneumonia has been on IV antibiotics for 72 hours. The nurse notes: temperature rising to 103.4\u00b0F (was 99.8\u00b0F yesterday), increased oxygen requirements (now on 5L NC, was on 2L), new-onset confusion, and WBC rising from 12,000 to 22,000. The nurse should:",
            options: [
                { id: "a", text: "Continue current treatment - it\u2019s too early to see improvement" },
                { id: "b", text: "Request a repeat chest X-ray and blood cultures, and notify the provider" },
                { id: "c", text: "Administer an extra dose of the current antibiotic" },
                { id: "d", text: "Discontinue antibiotics since they\u2019re clearly not working" }
            ],
            correct: "b",
            rationale: {
                correct: "After 48-72 hours on antibiotics, patients should show clinical improvement. This patient is worsening on all parameters - rising fever, increasing O2 needs, new confusion, and rising WBC. This indicates treatment failure, possible resistant organism, or a complication (empyema, abscess, sepsis). A repeat CXR evaluates for complications, blood cultures identify the organism and guide antibiotic change, and the provider needs to reassess the treatment plan.",
                a: "72 hours is adequate time to see improvement with appropriate antibiotics. Clinical deterioration at this point is a red flag, not expected.",
                c: "Administering extra doses without a provider order is outside nursing scope and doesn\u2019t address the likely need for a different antibiotic or investigation of complications.",
                d: "Never abruptly discontinue antibiotics. The patient needs antibiotics but likely needs a CHANGE in antibiotic coverage based on culture results or empiric broadening."
            },
            testTakingTip: "48-72 hour reassessment rule: If the patient isn\u2019t improving after 48-72 hours of antibiotics, suspect treatment failure - resistant organism, wrong diagnosis, or complication. Get new cultures, imaging, and involve the provider. Don\u2019t just keep doing the same thing.",
            guideSection: "Section 7 - Treatment & Antibiotics",
            guideSectionId: "treatment"
        }
    ]
};
