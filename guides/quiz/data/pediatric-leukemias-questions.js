/**
 * Pediatric Leukemias Quiz - Question Data
 * Clinical-judgment questions covering ALL/AML classification, diagnostic workup,
 * chemotherapy, neutropenic precautions, tumor lysis syndrome, transfusion
 * reactions, and family support.
 */

/* exported pediatricLeukemiasQuizData */
var pediatricLeukemiasQuizData = {
    guideName: "Pediatric Leukemias (ALL/AML)",
    guideSlug: "pediatric-leukemias",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 14,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 5-year-old receiving induction chemotherapy for acute lymphoblastic leukemia (ALL) has an absolute neutrophil count (ANC) of 280/mm\u00b3 and a temperature of 101.2\u00b0F (38.4\u00b0C). What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Administer acetaminophen and recheck temperature in 1 hour" },
                { id: "b", text: "Obtain blood cultures and administer prescribed broad-spectrum IV antibiotics" },
                { id: "c", text: "Apply cooling blanket and encourage oral fluids" },
                { id: "d", text: "Wait for the next scheduled complete blood count (CBC) to confirm neutropenia" }
            ],
            correct: "b",
            rationale: {
                correct: "Fever \u2265 100.4\u00b0F (38\u00b0C) in a neutropenic child is an oncologic emergency. Blood cultures (peripheral + central line) must be drawn and broad-spectrum IV antibiotics given within 60 minutes. Delay increases mortality.",
                a: "Treating the fever alone ignores the sepsis risk; antibiotics are time-critical.",
                c: "Cooling measures don\u2019t address the bacteremia risk driving the fever.",
                d: "Absolute neutrophil count (ANC) is already confirmed at 280. Waiting for another complete blood count (CBC) wastes critical minutes."
            },
            testTakingTip: "Febrile neutropenia: cultures + antibiotics within 1 hour. Don\u2019t delay for absolute neutrophil count (ANC) confirmation.",
            guideSection: "Section 6 - Neutropenic Precautions",
            guideSectionId: "neutropenic"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which age group is most commonly affected by acute lymphoblastic leukemia (ALL)?",
            options: [
                { id: "a", text: "Infants under 1 year" },
                { id: "b", text: "Children 2\u201310 years" },
                { id: "c", text: "Adolescents 14\u201318 years" },
                { id: "d", text: "Young adults 18\u201325 years" }
            ],
            correct: "b",
            rationale: {
                correct: "Acute lymphoblastic leukemia (ALL) has a peak incidence between 2 and 10 years of age, with the highest rate between 2 and 5 years. Acute myeloid leukemia (AML) is more common in adolescents and in infants <2.",
                a: "Infant leukemia does occur but is uncommon and usually has a worse prognosis.",
                c: "Acute myeloid leukemia (AML) is more common than acute lymphoblastic leukemia (ALL) in adolescents.",
                d: "Adult leukemia is a different epidemiology; typically acute myeloid leukemia (AML) predominates."
            },
            testTakingTip: "Acute lymphoblastic leukemia (ALL) = toddler-to-school-age. Acute myeloid leukemia (AML) = adolescents and infants.",
            guideSection: "Section 1 - Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 3,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A child receiving a packed red blood cell (PRBC) transfusion suddenly complains of back pain, chills, and shortness of breath. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Slow the transfusion rate and continue to monitor closely" },
                { id: "b", text: "Stop the transfusion and keep the IV open with normal saline via new tubing" },
                { id: "c", text: "Administer diphenhydramine and acetaminophen as prescribed" },
                { id: "d", text: "Flush the IV with the remaining normal saline in the current tubing" }
            ],
            correct: "b",
            rationale: {
                correct: "At the first sign of a transfusion reaction, STOP the transfusion immediately, keep the IV line patent with normal saline using NEW tubing (the current tubing still contains blood), notify the provider, and send the unit back to the blood bank with a post-reaction blood and urine sample.",
                a: "Slowing does not stop the immune reaction; this child has signs of an acute hemolytic reaction.",
                c: "Medications come AFTER the transfusion is stopped and provider is notified.",
                d: "The existing tubing contains the reacting blood - flushing that blood into the patient worsens the reaction."
            },
            testTakingTip: "Transfusion reaction: STOP first. Saline via NEW tubing. Then call, then treat.",
            guideSection: "Section 7 - Complications",
            guideSectionId: "complications"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which finding in a child newly diagnosed with leukemia should the nurse recognize as consistent with tumor lysis syndrome?",
            options: [
                { id: "a", text: "Potassium 3.2 mEq/L, phosphorus 2.5 mg/dL, uric acid 4 mg/dL, calcium 10 mg/dL" },
                { id: "b", text: "Potassium 6.2 mEq/L, phosphorus 7.8 mg/dL, uric acid 12 mg/dL, calcium 7.0 mg/dL" },
                { id: "c", text: "Potassium 4.1 mEq/L, phosphorus 4.0 mg/dL, uric acid 5 mg/dL, calcium 9.0 mg/dL" },
                { id: "d", text: "Potassium 3.8 mEq/L, phosphorus 3.1 mg/dL, uric acid 3 mg/dL, calcium 11 mg/dL" }
            ],
            correct: "b",
            rationale: {
                correct: "Tumor lysis syndrome (TLS): K\u207a UP, phosphorus UP, uric acid UP, calcium DOWN. Option B shows this exact pattern (hyperkalemia, hyperphosphatemia, hyperuricemia, hypocalcemia). Prevention is aggressive hydration plus allopurinol or rasburicase.",
                a: "All values are normal or low; not tumor lysis syndrome (TLS).",
                c: "Normal values - no tumor lysis syndrome (TLS).",
                d: "Normal values; hypercalcemia is not typical of tumor lysis syndrome (TLS)."
            },
            testTakingTip: "Tumor lysis syndrome (TLS) mnemonic: \u201cUp, up, up, down\u201d - K, phos, uric acid up; calcium down.",
            guideSection: "Section 7 - Complications",
            guideSectionId: "complications"
        },
        {
            id: 5,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A child with severe neutropenia is admitted to the oncology unit. Which nursing actions should be included in the plan of care? (Select all that apply.)",
            options: [
                { id: "a", text: "Assess temperature every 4 hours" },
                { id: "b", text: "Check a rectal temperature if the oral reading is inconsistent" },
                { id: "c", text: "Arrange for a private room" },
                { id: "d", text: "Allow fresh-cut flowers from visitors" },
                { id: "e", text: "Assess skin integrity, including perianal area, every shift" },
                { id: "f", text: "Hold any live-attenuated vaccines" }
            ],
            correct: ["a", "c", "e", "f"],
            rationale: {
                correct: "A, C, E, and F are correct. Frequent temperature monitoring, private room, meticulous skin assessment, and withholding live vaccines protect the neutropenic child. Rectal temperatures and fresh flowers/plants are contraindicated (mucosal tears, Aspergillus/Pseudomonas risk).",
                a: "Correct - early fever detection is essential.",
                b: "Rectal temps can tear rectal mucosa and cause bacteremia - never in neutropenia.",
                c: "Correct - reduces environmental exposure.",
                d: "Fresh flowers and soil harbor fungi (Aspergillus) and Pseudomonas.",
                e: "Correct - early infection often starts at skin breakdown sites.",
                f: "Correct - live vaccines can cause vaccine-strain infection."
            },
            testTakingTip: "Big 4 No\u2019s: No rectal temps, no flowers/plants, no live vaccines, no raw food.",
            guideSection: "Section 6 - Neutropenic Precautions",
            guideSectionId: "neutropenic"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which bone marrow finding is diagnostic of acute leukemia?",
            options: [
                { id: "a", text: "\u22655% blasts" },
                { id: "b", text: "\u226510% blasts" },
                { id: "c", text: "\u226520% blasts" },
                { id: "d", text: "\u226550% blasts" }
            ],
            correct: "c",
            rationale: {
                correct: "The diagnostic threshold for acute leukemia is \u226520% blasts in the bone marrow (WHO criteria). Post-induction remission is defined as <5% blasts.",
                a: "5% is the remission criterion, not diagnostic.",
                b: "Not the accepted WHO threshold.",
                d: "Many acute leukemias have >50% blasts but the diagnostic cutoff is 20%."
            },
            testTakingTip: "Acute leukemia = >20% blasts. Remission = <5%.",
            guideSection: "Section 4 - Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school-age child with acute lymphoblastic leukemia (ALL) is ordered to receive vincristine. The nurse understands that vincristine must be administered by which route?",
            options: [
                { id: "a", text: "Intravenous only" },
                { id: "b", text: "Intrathecal" },
                { id: "c", text: "Intramuscular" },
                { id: "d", text: "Subcutaneous" }
            ],
            correct: "a",
            rationale: {
                correct: "Vincristine is administered IV ONLY. Intrathecal vincristine is uniformly fatal. Oncology units use color-coded syringes, two-nurse verification, and time-separated administration from intrathecal chemotherapy to prevent this never event.",
                b: "Intrathecal vincristine is FATAL - never give this route.",
                c: "IM is not a standard route and increases bleeding risk in thrombocytopenia.",
                d: "Subcutaneous is not a standard route for vincristine."
            },
            testTakingTip: "Vincristine = IV ONLY. Intrathecal vincristine = fatal error.",
            guideSection: "Section 5 - Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Parents of a 4-year-old newly diagnosed with acute lymphoblastic leukemia (ALL) ask, \u201cDid we do something wrong to cause this?\u201d What is the nurse\u2019s BEST response?",
            options: [
                { id: "a", text: "\u201cIt is usually caused by environmental toxins that you were exposed to.\u201d" },
                { id: "b", text: "\u201cMost childhood leukemias have no identifiable cause, and there is nothing you did to cause it.\u201d" },
                { id: "c", text: "\u201cThe cause is unknown, but you should review what vaccinations your child received.\u201d" },
                { id: "d", text: "\u201cChildhood leukemia is genetic and inherited from the parents.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "The vast majority of pediatric leukemias have no identifiable cause. Reassuring parents reduces guilt and supports coping. Known contributors (genetic syndromes like Down syndrome, prior radiation) are exceptions - not the rule.",
                a: "Environmental toxins cause a tiny minority of cases; this response blames the family.",
                c: "Vaccines do NOT cause leukemia; this response misinforms and blames.",
                d: "Leukemia is rarely inherited; most cases are acquired genetic changes, not inherited."
            },
            testTakingTip: "Most childhood leukemias have NO identifiable cause. Relieve parental guilt.",
            guideSection: "Section 9 - Family Support",
            guideSectionId: "family"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A child with acute myeloid leukemia (AML) has a white blood cell (WBC) count of 1,800/mm\u00b3 with 10% neutrophils and 5% bands on differential. What is the absolute neutrophil count (ANC)?",
            options: [
                { id: "a", text: "90/mm\u00b3" },
                { id: "b", text: "180/mm\u00b3" },
                { id: "c", text: "270/mm\u00b3" },
                { id: "d", text: "540/mm\u00b3" }
            ],
            correct: "c",
            rationale: {
                correct: "Absolute neutrophil count (ANC) = white blood cell (WBC) \u00d7 (% neutrophils + % bands) \u00f7 100 = 1,800 \u00d7 (10 + 5) \u00f7 100 = 1,800 \u00d7 0.15 = 270/mm\u00b3. This is severe neutropenia (<500); strict precautions required.",
                a: "Calculation error - used neutrophils alone (1,800 \u00d7 0.05).",
                b: "Used only neutrophils (1,800 \u00d7 0.10).",
                d: "Used 30% (0.30) instead of 0.15."
            },
            testTakingTip: "Absolute neutrophil count (ANC) = white blood cell (WBC) \u00d7 (%neutrophils + %bands) \u00f7 100. <500 = severe.",
            guideSection: "Section 6 - Neutropenic Precautions",
            guideSectionId: "neutropenic"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A child newly diagnosed with acute myeloid leukemia (AML) subtype M3, acute promyelocytic leukemia, begins oozing blood from IV sites and has widespread bruising. Labs show prolonged prothrombin time (PT) and partial thromboplastin time (PTT), low fibrinogen, and elevated D-dimer. The nurse anticipates treatment for:",
            options: [
                { id: "a", text: "Immune thrombocytopenic purpura (ITP)" },
                { id: "b", text: "Disseminated intravascular coagulation (DIC)" },
                { id: "c", text: "Hemophilia A (factor VIII deficiency)" },
                { id: "d", text: "Inherited von Willebrand disease (VWD)" }
            ],
            correct: "b",
            rationale: {
                correct: "Acute promyelocytic leukemia (APL), the M3 subtype of acute myeloid leukemia (AML), is classically associated with disseminated intravascular coagulation (DIC) - widespread activation of the clotting cascade consumes platelets and fibrinogen. Signs: bleeding from multiple sites, low fibrinogen, elevated D-dimer, prolonged prothrombin time (PT) and partial thromboplastin time (PTT). Treated with fresh frozen plasma (FFP), cryoprecipitate, platelets, and all-trans retinoic acid (ATRA).",
                a: "Immune thrombocytopenia (ITP) has low platelets but normal coagulation studies.",
                c: "Hemophilia - prolonged partial thromboplastin time (PTT) only, normal prothrombin time (PT) and fibrinogen; inherited, known history.",
                d: "Von Willebrand disease (VWD) - mucocutaneous bleeding but coagulation factors normal or mildly abnormal."
            },
            testTakingTip: "Acute myeloid leukemia (AML) M3 + bleeding = disseminated intravascular coagulation (DIC). Look for low fibrinogen, high D-dimer, prolonged prothrombin time (PT) and partial thromboplastin time (PTT).",
            guideSection: "Section 3 - Clinical Manifestations",
            guideSectionId: "clinical"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A sibling of a child with leukemia is scheduled for their well-child visit. Which vaccine should be AVOIDED in the sibling during the patient's active chemotherapy?",
            options: [
                { id: "a", text: "Injectable (inactivated) influenza" },
                { id: "b", text: "Tdap (tetanus, diphtheria, pertussis)" },
                { id: "c", text: "Intranasal (live-attenuated) influenza" },
                { id: "d", text: "Pneumococcal conjugate vaccine (PCV13)" }
            ],
            correct: "c",
            rationale: {
                correct: "Live vaccines given to household contacts can transmit vaccine-strain virus to the immunocompromised patient. The intranasal flu vaccine is LIVE-attenuated and should be avoided in siblings during a child\u2019s active chemo. The INJECTABLE flu vaccine is inactivated and safe.",
                a: "Injectable flu is inactivated - safe for household contacts.",
                b: "Tdap is inactivated - safe.",
                d: "Pneumococcal conjugate is inactivated - safe."
            },
            testTakingTip: "Live vaccines: measles, mumps, and rubella (MMR), varicella, rotavirus, intranasal flu, bacille Calmette-Guerin (BCG) - avoid in household contacts during chemo.",
            guideSection: "Section 6 - Neutropenic Precautions",
            guideSectionId: "neutropenic"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A child receiving induction chemotherapy has a platelet count of 14,000/mm\u00b3. Which nursing action is appropriate?",
            options: [
                { id: "a", text: "Encourage flossing to prevent dental caries" },
                { id: "b", text: "Use a soft toothbrush or oral sponge for mouth care" },
                { id: "c", text: "Administer ibuprofen for reported headache" },
                { id: "d", text: "Take a rectal temperature for the most accurate reading" }
            ],
            correct: "b",
            rationale: {
                correct: "With platelets <20,000 (bleeding-precaution threshold), use a soft toothbrush or oral sponge, avoid flossing, avoid aspirin and nonsteroidal anti-inflammatory drugs (NSAIDs), avoid rectal procedures, and apply firm pressure after any venipuncture.",
                a: "Flossing can cause gum bleeding in thrombocytopenia.",
                c: "Ibuprofen impairs platelet function - contraindicated. Acetaminophen is preferred.",
                d: "Rectal procedures are contraindicated in neutropenia AND thrombocytopenia."
            },
            testTakingTip: "Thrombocytopenia: soft brush, no flossing, no nonsteroidal anti-inflammatory drugs (NSAIDs), no rectal procedures.",
            guideSection: "Section 8 - Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which finding on peripheral smear is MOST suggestive of acute myeloid leukemia (AML) rather than acute lymphoblastic leukemia (ALL)?",
            options: [
                { id: "a", text: "Large number of lymphoblasts" },
                { id: "b", text: "Auer rods in the cytoplasm of blasts" },
                { id: "c", text: "Reed-Sternberg cells" },
                { id: "d", text: "Target cells and sickled red blood cells (RBCs)" }
            ],
            correct: "b",
            rationale: {
                correct: "Auer rods are needle-shaped cytoplasmic inclusions pathognomonic for acute myeloid leukemia (AML), especially M3 acute promyelocytic leukemia (APL). Their presence on smear strongly favors AML over acute lymphoblastic leukemia (ALL).",
                a: "Lymphoblasts are the acute lymphoblastic leukemia (ALL) cell line.",
                c: "Reed-Sternberg cells are seen in Hodgkin lymphoma, not acute myeloid leukemia (AML).",
                d: "Target/sickled cells are seen in thalassemia and sickle cell disease."
            },
            testTakingTip: "See Auer rods? Pick acute myeloid leukemia (AML).",
            guideSection: "Section 2 - Classification",
            guideSectionId: "classification"
        },
        {
            id: 14,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A nurse is preparing to start induction chemotherapy for a child with a white blood cell (WBC) count of 180,000/mm\u00b3. Which intervention is the HIGHEST priority to prevent tumor lysis syndrome?",
            options: [
                { id: "a", text: "Restrict fluids to prevent fluid overload and pulmonary edema" },
                { id: "b", text: "Administer IV fluids at 2\u20133 times maintenance and allopurinol or rasburicase" },
                { id: "c", text: "Add potassium chloride to the maintenance IV fluids to prevent losses" },
                { id: "d", text: "Premedicate with diphenhydramine and acetaminophen before each dose" }
            ],
            correct: "b",
            rationale: {
                correct: "A high white blood cell (WBC) count, bulky disease, and T-cell acute lymphoblastic leukemia (ALL) signal high tumor lysis syndrome (TLS) risk. Prevention requires aggressive hydration (2\u20133\u00d7 maintenance) and xanthine oxidase inhibition with allopurinol OR rasburicase; screen for glucose-6-phosphate dehydrogenase (G6PD) deficiency before rasburicase.",
                a: "Fluid restriction worsens uric acid nephropathy.",
                c: "Potassium in IV fluids is CONTRAINDICATED during tumor lysis syndrome (TLS) prevention - hyperkalemia is a major risk.",
                d: "Premeds help chemo tolerance but don\u2019t address tumor lysis syndrome (TLS) specifically."
            },
            testTakingTip: "Tumor lysis syndrome (TLS) prevention: HYDRATE + allopurinol/rasburicase. Hold potassium.",
            guideSection: "Section 7 - Complications",
            guideSectionId: "complications"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Discharge teaching for the family of a child on maintenance chemo with 6-mercaptopurine should include which instruction?",
            options: [
                { id: "a", text: "Give mercaptopurine with a glass of milk at breakfast" },
                { id: "b", text: "Give mercaptopurine at bedtime on an empty stomach" },
                { id: "c", text: "Only give mercaptopurine when the child has symptoms" },
                { id: "d", text: "Give mercaptopurine with ibuprofen to prevent nausea" }
            ],
            correct: "b",
            rationale: {
                correct: "Mercaptopurine absorption is reduced by food (especially dairy). Give at bedtime on an empty stomach (at least 1 hour after last meal, 2 hours before next meal). Daily adherence for years is essential for sustained remission.",
                a: "Dairy and food reduce absorption; bedtime empty stomach is standard.",
                c: "Mercaptopurine is a scheduled daily medication, not PRN.",
                d: "Nonsteroidal anti-inflammatory drugs (NSAIDs) are avoided (platelet effect) and do not prevent nausea from mercaptopurine."
            },
            testTakingTip: "Mercaptopurine = bedtime, empty stomach, away from dairy, daily for 2\u20133 years.",
            guideSection: "Section 5 - Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "An adolescent with newly diagnosed T-cell acute lymphoblastic leukemia (ALL) has a chest X-ray showing a large anterior mediastinal mass and is now complaining of facial swelling, dyspnea, and stridor. These findings are MOST consistent with:",
            options: [
                { id: "a", text: "Acute pulmonary embolism" },
                { id: "b", text: "Superior vena cava syndrome" },
                { id: "c", text: "Tension pneumothorax" },
                { id: "d", text: "Acute anaphylactic reaction" }
            ],
            correct: "b",
            rationale: {
                correct: "T-cell acute lymphoblastic leukemia (ALL) often presents with a mediastinal mass that can compress the superior vena cava (SVC) and airway, producing SVC syndrome - facial/neck/upper extremity swelling, distended neck veins, dyspnea, stridor. This is an oncologic emergency requiring urgent treatment.",
                a: "Pulmonary embolism (PE) would present with pleuritic chest pain, tachycardia, desaturation - not facial swelling.",
                c: "Pneumothorax would show absent breath sounds, tracheal shift, not facial swelling.",
                d: "Anaphylaxis typically involves urticaria, hypotension, wheezing - not a mediastinal mass."
            },
            testTakingTip: "T-cell acute lymphoblastic leukemia (ALL) + facial swelling + stridor = superior vena cava (SVC) syndrome. Emergency.",
            guideSection: "Section 3 - Clinical Manifestations",
            guideSectionId: "clinical"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Blood products given to a child with leukemia must be:",
            options: [
                { id: "a", text: "Warmed to body temperature and infused rapidly" },
                { id: "b", text: "Irradiated and leukoreduced" },
                { id: "c", text: "Rh-negative only" },
                { id: "d", text: "Given with prophylactic heparin" }
            ],
            correct: "b",
            rationale: {
                correct: "Irradiation prevents transfusion-associated graft-versus-host disease (TA-GVHD) in immunocompromised patients. Leukoreduction reduces febrile non-hemolytic reactions, cytomegalovirus (CMV) transmission, and human leukocyte antigen (HLA) alloimmunization. Both are standard in oncology.",
                a: "Warming/rate are situational - not specific to leukemia patients.",
                c: "Blood must match the patient's blood group and Rh type, not simply be Rh-negative.",
                d: "Prophylactic heparin is not routine with transfusions."
            },
            testTakingTip: "Oncology blood products = irradiated + leukoreduced.",
            guideSection: "Section 8 - Nursing Priorities",
            guideSectionId: "nursing"
        }
    ]
};
