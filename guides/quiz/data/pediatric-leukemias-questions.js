/**
 * Pediatric Leukemias Quiz — Question Data
 * NCLEX-style questions covering ALL/AML classification, diagnostic workup,
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
            stem: "A 5-year-old receiving induction chemotherapy for ALL has an ANC of 280/mm\u00b3 and a temperature of 101.2\u00b0F (38.4\u00b0C). What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Administer acetaminophen and recheck temperature in 1 hour" },
                { id: "b", text: "Obtain blood cultures and administer prescribed broad-spectrum IV antibiotics" },
                { id: "c", text: "Apply cooling blanket and encourage oral fluids" },
                { id: "d", text: "Wait for the next scheduled CBC to confirm neutropenia" }
            ],
            correct: "b",
            rationale: {
                correct: "Fever \u2265 100.4\u00b0F (38\u00b0C) in a neutropenic child is an oncologic emergency. Blood cultures (peripheral + central line) must be drawn and broad-spectrum IV antibiotics given within 60 minutes. Delay increases mortality.",
                a: "Treating the fever alone ignores the sepsis risk; antibiotics are time-critical.",
                c: "Cooling measures don\u2019t address the bacteremia risk driving the fever.",
                d: "ANC is already confirmed at 280. Waiting for another CBC wastes critical minutes."
            },
            testTakingTip: "Febrile neutropenia: cultures + antibiotics within 1 hour. Don\u2019t delay for ANC confirmation.",
            guideSection: "Section 6 \u2014 Neutropenic Precautions",
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
                correct: "ALL has a peak incidence between 2 and 10 years of age, with the highest rate between 2 and 5 years. AML is more common in adolescents and in infants <2.",
                a: "Infant leukemia does occur but is uncommon and usually has a worse prognosis.",
                c: "AML is more common than ALL in adolescents.",
                d: "Adult leukemia is a different epidemiology; typically AML predominates."
            },
            testTakingTip: "ALL = toddler-to-school-age. AML = adolescents and infants.",
            guideSection: "Section 1 \u2014 Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 3,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A child receiving a PRBC transfusion suddenly complains of back pain, chills, and shortness of breath. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Slow the transfusion rate and continue" },
                { id: "b", text: "Stop the transfusion and keep the IV line patent with normal saline via new tubing" },
                { id: "c", text: "Administer diphenhydramine and acetaminophen" },
                { id: "d", text: "Flush the IV with the remaining normal saline in the current tubing" }
            ],
            correct: "b",
            rationale: {
                correct: "At the first sign of a transfusion reaction, STOP the transfusion immediately, keep the IV line patent with normal saline using NEW tubing (the current tubing still contains blood), notify the provider, and send the unit back to the blood bank with a post-reaction blood and urine sample.",
                a: "Slowing does not stop the immune reaction; this child has signs of an acute hemolytic reaction.",
                c: "Medications come AFTER the transfusion is stopped and provider is notified.",
                d: "The existing tubing contains the reacting blood \u2014 flushing that blood into the patient worsens the reaction."
            },
            testTakingTip: "Transfusion reaction: STOP first. Saline via NEW tubing. Then call, then treat.",
            guideSection: "Section 7 \u2014 Complications",
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
                correct: "TLS: K\u207a UP, phosphorus UP, uric acid UP, calcium DOWN. Option B shows this exact pattern (hyperkalemia, hyperphosphatemia, hyperuricemia, hypocalcemia). Prevention is aggressive hydration plus allopurinol or rasburicase.",
                a: "All values are normal or low; not TLS.",
                c: "Normal values \u2014 no TLS.",
                d: "Normal values; hypercalcemia is not typical of TLS."
            },
            testTakingTip: "TLS mnemonic: \u201cUp, up, up, down\u201d \u2014 K, phos, uric acid up; calcium down.",
            guideSection: "Section 7 \u2014 Complications",
            guideSectionId: "complications"
        },
        {
            id: 5,
            type: "multi",
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
                a: "Correct \u2014 early fever detection is essential.",
                b: "Rectal temps can tear rectal mucosa and cause bacteremia \u2014 never in neutropenia.",
                c: "Correct \u2014 reduces environmental exposure.",
                d: "Fresh flowers and soil harbor fungi (Aspergillus) and Pseudomonas.",
                e: "Correct \u2014 early infection often starts at skin breakdown sites.",
                f: "Correct \u2014 live vaccines can cause vaccine-strain infection."
            },
            testTakingTip: "Big 4 No\u2019s: No rectal temps, no flowers/plants, no live vaccines, no raw food.",
            guideSection: "Section 6 \u2014 Neutropenic Precautions",
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
            guideSection: "Section 4 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school-age child with ALL is ordered to receive vincristine. The nurse understands that vincristine must be administered by which route?",
            options: [
                { id: "a", text: "Intravenous only" },
                { id: "b", text: "Intrathecal" },
                { id: "c", text: "Intramuscular" },
                { id: "d", text: "Subcutaneous" }
            ],
            correct: "a",
            rationale: {
                correct: "Vincristine is administered IV ONLY. Intrathecal vincristine is uniformly fatal. Oncology units use color-coded syringes, two-nurse verification, and time-separated administration from intrathecal chemotherapy to prevent this never event.",
                b: "Intrathecal vincristine is FATAL \u2014 never give this route.",
                c: "IM is not a standard route and increases bleeding risk in thrombocytopenia.",
                d: "Subcutaneous is not a standard route for vincristine."
            },
            testTakingTip: "Vincristine = IV ONLY. Intrathecal vincristine = fatal error.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Parents of a 4-year-old newly diagnosed with ALL ask, \u201cDid we do something wrong to cause this?\u201d What is the nurse\u2019s BEST response?",
            options: [
                { id: "a", text: "\u201cIt is usually caused by environmental toxins that you were exposed to.\u201d" },
                { id: "b", text: "\u201cMost childhood leukemias have no identifiable cause, and there is nothing you did to cause it.\u201d" },
                { id: "c", text: "\u201cThe cause is unknown, but you should review what vaccinations your child received.\u201d" },
                { id: "d", text: "\u201cChildhood leukemia is genetic and inherited from the parents.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "The vast majority of pediatric leukemias have no identifiable cause. Reassuring parents reduces guilt and supports coping. Known contributors (genetic syndromes like Down syndrome, prior radiation) are exceptions \u2014 not the rule.",
                a: "Environmental toxins cause a tiny minority of cases; this response blames the family.",
                c: "Vaccines do NOT cause leukemia; this response misinforms and blames.",
                d: "Leukemia is rarely inherited; most cases are acquired genetic changes, not inherited."
            },
            testTakingTip: "Most childhood leukemias have NO identifiable cause. Relieve parental guilt.",
            guideSection: "Section 9 \u2014 Family Support",
            guideSectionId: "family"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A child with AML has a WBC of 1,800/mm\u00b3 with 10% neutrophils and 5% bands on differential. What is the absolute neutrophil count (ANC)?",
            options: [
                { id: "a", text: "90/mm\u00b3" },
                { id: "b", text: "180/mm\u00b3" },
                { id: "c", text: "270/mm\u00b3" },
                { id: "d", text: "540/mm\u00b3" }
            ],
            correct: "c",
            rationale: {
                correct: "ANC = WBC \u00d7 (% neutrophils + % bands) \u00f7 100 = 1,800 \u00d7 (10 + 5) \u00f7 100 = 1,800 \u00d7 0.15 = 270/mm\u00b3. This is severe neutropenia (<500); strict precautions required.",
                a: "Calculation error \u2014 used neutrophils alone (1,800 \u00d7 0.05).",
                b: "Used only neutrophils (1,800 \u00d7 0.10).",
                d: "Used 30% (0.30) instead of 0.15."
            },
            testTakingTip: "ANC = WBC \u00d7 (%neutrophils + %bands) \u00f7 100. <500 = severe.",
            guideSection: "Section 6 \u2014 Neutropenic Precautions",
            guideSectionId: "neutropenic"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A child newly diagnosed with AML M3 (acute promyelocytic leukemia) begins oozing blood from IV sites and has widespread bruising. Labs show prolonged PT/PTT, low fibrinogen, and elevated D-dimer. The nurse anticipates treatment for:",
            options: [
                { id: "a", text: "Immune thrombocytopenic purpura (ITP)" },
                { id: "b", text: "Disseminated intravascular coagulation (DIC)" },
                { id: "c", text: "Hemophilia A" },
                { id: "d", text: "Von Willebrand disease" }
            ],
            correct: "b",
            rationale: {
                correct: "AML M3 (APL) is classically associated with DIC \u2014 widespread activation of the clotting cascade consumes platelets and fibrinogen. Signs: bleeding from multiple sites, low fibrinogen, elevated D-dimer, prolonged PT/PTT. Treated with FFP, cryoprecipitate, platelets, and ATRA (all-trans retinoic acid).",
                a: "ITP has low platelets but normal coagulation studies.",
                c: "Hemophilia \u2014 prolonged PTT only, normal PT/fibrinogen; inherited, known history.",
                d: "VWD \u2014 mucocutaneous bleeding but coagulation factors normal or mildly abnormal."
            },
            testTakingTip: "AML M3 + bleeding = DIC. Look for low fibrinogen, high D-dimer, prolonged PT/PTT.",
            guideSection: "Section 3 \u2014 Clinical Manifestations",
            guideSectionId: "clinical"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A sibling of a child with leukemia is scheduled for their well-child visit. Which vaccine should be AVOIDED in the sibling during the patient's active chemotherapy?",
            options: [
                { id: "a", text: "Injectable influenza" },
                { id: "b", text: "Tdap" },
                { id: "c", text: "Intranasal (live-attenuated) influenza" },
                { id: "d", text: "Pneumococcal conjugate (PCV13)" }
            ],
            correct: "c",
            rationale: {
                correct: "Live vaccines given to household contacts can transmit vaccine-strain virus to the immunocompromised patient. The intranasal flu vaccine is LIVE-attenuated and should be avoided in siblings during a child\u2019s active chemo. The INJECTABLE flu vaccine is inactivated and safe.",
                a: "Injectable flu is inactivated \u2014 safe for household contacts.",
                b: "Tdap is inactivated \u2014 safe.",
                d: "Pneumococcal conjugate is inactivated \u2014 safe."
            },
            testTakingTip: "Live vaccines: MMR, varicella, rotavirus, intranasal flu, BCG \u2014 avoid in household contacts during chemo.",
            guideSection: "Section 6 \u2014 Neutropenic Precautions",
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
                correct: "With platelets <20,000 (bleeding-precaution threshold), use a soft toothbrush or oral sponge, avoid flossing, avoid aspirin/NSAIDs, avoid rectal procedures, and apply firm pressure after any venipuncture.",
                a: "Flossing can cause gum bleeding in thrombocytopenia.",
                c: "Ibuprofen impairs platelet function \u2014 contraindicated. Acetaminophen is preferred.",
                d: "Rectal procedures are contraindicated in neutropenia AND thrombocytopenia."
            },
            testTakingTip: "Thrombocytopenia: soft brush, no flossing, no NSAIDs, no rectal procedures.",
            guideSection: "Section 8 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which finding on peripheral smear is MOST suggestive of AML rather than ALL?",
            options: [
                { id: "a", text: "Large number of lymphoblasts" },
                { id: "b", text: "Auer rods in the cytoplasm of blasts" },
                { id: "c", text: "Reed-Sternberg cells" },
                { id: "d", text: "Target cells and sickled RBCs" }
            ],
            correct: "b",
            rationale: {
                correct: "Auer rods are needle-shaped cytoplasmic inclusions pathognomonic for AML (especially M3/APL). Their presence on smear strongly favors AML over ALL.",
                a: "Lymphoblasts are the ALL cell line.",
                c: "Reed-Sternberg cells are seen in Hodgkin lymphoma, not AML.",
                d: "Target/sickled cells are seen in thalassemia and sickle cell disease."
            },
            testTakingTip: "See Auer rods? Pick AML.",
            guideSection: "Section 2 \u2014 Classification",
            guideSectionId: "classification"
        },
        {
            id: 14,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A nurse is preparing to start induction chemotherapy for a child with a WBC of 180,000/mm\u00b3. Which intervention is the HIGHEST priority to prevent tumor lysis syndrome?",
            options: [
                { id: "a", text: "Restrict fluids to prevent fluid overload" },
                { id: "b", text: "Administer IV fluids at 2\u20133 times maintenance and allopurinol or rasburicase" },
                { id: "c", text: "Add potassium to the maintenance fluid" },
                { id: "d", text: "Premedicate with diphenhydramine and acetaminophen" }
            ],
            correct: "b",
            rationale: {
                correct: "High WBC, bulky disease, and T-cell ALL signal high TLS risk. Prevention requires aggressive hydration (2\u20133\u00d7 maintenance) and xanthine oxidase inhibition with allopurinol OR rasburicase (screen for G6PD deficiency first for rasburicase).",
                a: "Fluid restriction worsens uric acid nephropathy.",
                c: "Potassium in IV fluids is CONTRAINDICATED during TLS prevention \u2014 hyperkalemia is a major risk.",
                d: "Premeds help chemo tolerance but don\u2019t address TLS specifically."
            },
            testTakingTip: "TLS prevention: HYDRATE + allopurinol/rasburicase. Hold potassium.",
            guideSection: "Section 7 \u2014 Complications",
            guideSectionId: "complications"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Discharge teaching for the family of a child on maintenance chemo with 6-mercaptopurine (6-MP) should include which instruction?",
            options: [
                { id: "a", text: "Give 6-MP with a glass of milk at breakfast" },
                { id: "b", text: "Give 6-MP at bedtime on an empty stomach" },
                { id: "c", text: "Only give 6-MP when the child has symptoms" },
                { id: "d", text: "Give 6-MP with ibuprofen to prevent nausea" }
            ],
            correct: "b",
            rationale: {
                correct: "6-MP absorption is reduced by food (especially dairy). Give at bedtime on an empty stomach (at least 1 hour after last meal, 2 hours before next meal). Daily adherence for years is essential for sustained remission.",
                a: "Dairy and food reduce absorption; bedtime empty stomach is standard.",
                c: "6-MP is a scheduled daily medication, not PRN.",
                d: "NSAIDs are avoided (platelet effect) and do not prevent nausea from 6-MP."
            },
            testTakingTip: "6-MP = bedtime, empty stomach, away from dairy, daily for 2\u20133 years.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "An adolescent with newly diagnosed T-cell ALL has a chest X-ray showing a large anterior mediastinal mass and is now complaining of facial swelling, dyspnea, and stridor. These findings are MOST consistent with:",
            options: [
                { id: "a", text: "Pulmonary embolism" },
                { id: "b", text: "Superior vena cava syndrome" },
                { id: "c", text: "Pneumothorax" },
                { id: "d", text: "Anaphylaxis" }
            ],
            correct: "b",
            rationale: {
                correct: "T-cell ALL often presents with a mediastinal mass that can compress the SVC and airway, producing SVC syndrome \u2014 facial/neck/upper extremity swelling, distended neck veins, dyspnea, stridor. This is an oncologic emergency requiring urgent treatment.",
                a: "PE would present with pleuritic chest pain, tachycardia, desaturation \u2014 not facial swelling.",
                c: "Pneumothorax would show absent breath sounds, tracheal shift, not facial swelling.",
                d: "Anaphylaxis typically involves urticaria, hypotension, wheezing \u2014 not a mediastinal mass."
            },
            testTakingTip: "T-cell ALL + facial swelling + stridor = SVC syndrome. Emergency.",
            guideSection: "Section 3 \u2014 Clinical Manifestations",
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
                correct: "Irradiation prevents transfusion-associated graft-versus-host disease (TA-GVHD) in immunocompromised patients. Leukoreduction reduces febrile non-hemolytic reactions, CMV transmission, and HLA alloimmunization. Both are standard in oncology.",
                a: "Warming/rate are situational \u2014 not specific to leukemia patients.",
                c: "Blood must be ABO and Rh compatible, not Rh-negative only.",
                d: "Prophylactic heparin is not routine with transfusions."
            },
            testTakingTip: "Oncology blood products = irradiated + leukoreduced.",
            guideSection: "Section 8 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        }
    ]
};
