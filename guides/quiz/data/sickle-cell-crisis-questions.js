/**
 * Sickle Cell Crisis Quiz — Question Data
 * NCLEX-style questions covering pathophysiology, crisis types, triggers,
 * priority interventions, transfusion therapy and reactions, pain control,
 * and long-term management.
 */

/* exported sickleCellCrisisQuizData */
var sickleCellCrisisQuizData = {
    guideName: "Sickle Cell Crisis",
    guideSlug: "sickle-cell-crisis",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 14,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 6-year-old with sickle cell disease is admitted with severe leg pain and is crying inconsolably. The nurse understands the priority interventions include:",
            options: [
                { id: "a", text: "Oral fluids, ibuprofen, and a cold pack to the leg" },
                { id: "b", text: "IV fluids, supplemental oxygen only if hypoxic, IV opioids, and rest" },
                { id: "c", text: "Fluid restriction and high-flow oxygen regardless of saturation" },
                { id: "d", text: "Cold compresses and immediate exchange transfusion" }
            ],
            correct: "b",
            rationale: {
                correct: "Priority care for a sickle cell crisis follows HOPR: Hydration (IV 1.5\u20132\u00d7 maintenance), Oxygen only if hypoxic, Pain control (scheduled opioids), and Rest to decrease O2 consumption. Keep child warm; avoid cold and dehydration.",
                a: "Oral fluids and oral NSAIDs alone are inadequate for severe crisis pain; cold worsens vasoconstriction and sickling.",
                c: "Fluid restriction worsens sickling. Routine high-flow O2 is not recommended if saturation is normal.",
                d: "Cold compresses worsen sickling. Exchange transfusion is reserved for ACS, stroke, or multi-organ failure."
            },
            testTakingTip: "Priority = HOPR: Hydration, Oxygen (if hypoxic), Pain, Rest. Warm, not cold.",
            guideSection: "Section 6 \u2014 Priority Care",
            guideSectionId: "priority"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A child receiving a PRBC transfusion suddenly develops chills, back pain, and hypotension. What is the nurse\u2019s FIRST action?",
            options: [
                { id: "a", text: "Slow the transfusion rate and continue" },
                { id: "b", text: "Stop the transfusion and maintain the IV line with normal saline using new tubing" },
                { id: "c", text: "Administer acetaminophen and diphenhydramine" },
                { id: "d", text: "Flush the line with the remaining saline in the current tubing" }
            ],
            correct: "b",
            rationale: {
                correct: "STOP the transfusion immediately at the first sign of a reaction. Keep the IV line patent with normal saline using NEW tubing (current tubing still contains reacting blood). Then notify provider and blood bank, send bag and samples back.",
                a: "Slowing doesn\u2019t stop the reaction; hemolytic reaction progresses rapidly.",
                c: "Medications come AFTER stopping the transfusion and notifying provider.",
                d: "Flushing the existing tubing pushes the reacting blood into the patient."
            },
            testTakingTip: "Transfusion reaction: STOP first. Saline via NEW tubing. Then call, then send bag back.",
            guideSection: "Section 7 \u2014 Transfusion",
            guideSectionId: "transfusion"
        },
        {
            id: 3,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 4-year-old with sickle cell disease arrives at the ED with a temperature of 101.8\u00b0F. The child\u2019s vital signs are otherwise stable. What is the priority nursing action?",
            options: [
                { id: "a", text: "Give oral acetaminophen and reassess in 2 hours" },
                { id: "b", text: "Obtain blood cultures and administer IV ceftriaxone as ordered" },
                { id: "c", text: "Place a cooling blanket and offer oral fluids" },
                { id: "d", text: "Discharge with instructions to rest at home" }
            ],
            correct: "b",
            rationale: {
                correct: "Fever in a child with sickle cell disease is an oncologic/infectious emergency because of functional asplenia. Overwhelming sepsis from encapsulated organisms (S. pneumoniae, H. influenzae, N. meningitidis) can kill within hours. Obtain blood cultures, other cultures as needed, and start IV ceftriaxone within the first hour.",
                a: "Delaying antibiotics for fever is dangerous; acetaminophen alone is inadequate.",
                c: "Cooling measures don\u2019t address sepsis risk.",
                d: "Never discharge a febrile child with SCD without evaluation and antibiotics."
            },
            testTakingTip: "Sickle cell fever \u2265 101\u00b0F = cultures + IV ceftriaxone within 1 hour.",
            guideSection: "Section 4 \u2014 Clinical Manifestations",
            guideSectionId: "clinical"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which type of sickle cell crisis is the leading cause of mortality in children with sickle cell disease?",
            options: [
                { id: "a", text: "Vaso-occlusive pain crisis" },
                { id: "b", text: "Splenic sequestration" },
                { id: "c", text: "Acute chest syndrome" },
                { id: "d", text: "Aplastic crisis" }
            ],
            correct: "c",
            rationale: {
                correct: "Acute chest syndrome (ACS) \u2014 fever, chest pain, hypoxia, and new infiltrate on CXR \u2014 is the leading cause of mortality in SCD. Vaso-occlusion in pulmonary vessels can progress rapidly. Management: oxygen, antibiotics, cautious IV fluids, pain control, incentive spirometry, and possible exchange transfusion.",
                a: "Vaso-occlusive crisis is most common but less often fatal.",
                b: "Splenic sequestration is dangerous in young children but less common cause of death than ACS.",
                d: "Aplastic crisis is usually self-limited; supported with transfusion."
            },
            testTakingTip: "Chest pain + hypoxia + new infiltrate in SCD = ACS = #1 killer.",
            guideSection: "Section 2 \u2014 Crisis Types",
            guideSectionId: "crisis-types"
        },
        {
            id: 5,
            type: "multi",
            subtype: null,
            difficulty: "application",
            stem: "Which of the following are potential triggers of sickle cell vaso-occlusive crisis? (Select all that apply.)",
            options: [
                { id: "a", text: "Dehydration" },
                { id: "b", text: "Hypoxia" },
                { id: "c", text: "Cold exposure" },
                { id: "d", text: "A warm bath" },
                { id: "e", text: "Infection" },
                { id: "f", text: "High altitude / unpressurized flight" }
            ],
            correct: ["a", "b", "c", "e", "f"],
            rationale: {
                correct: "Dehydration, hypoxia, cold, infection, and altitude all precipitate sickling (remember HHIDS). A warm bath is actually a beneficial non-pharmacologic pain intervention \u2014 heat promotes vasodilation and comfort.",
                a: "Correct \u2014 concentrated blood sickles more.",
                b: "Correct \u2014 HbS polymerizes when deoxygenated.",
                c: "Correct \u2014 cold causes vasoconstriction.",
                d: "Warm bath is helpful, not a trigger.",
                e: "Correct \u2014 infection is a leading trigger and cause of death.",
                f: "Correct \u2014 reduced pO2 at altitude triggers sickling."
            },
            testTakingTip: "Triggers: Hypoxia, Hydration loss, Infection, Decreased temp, Stress \u2014 HHIDS.",
            guideSection: "Section 3 \u2014 Triggers",
            guideSectionId: "triggers"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which medication is AVOIDED for pain management in sickle cell crisis?",
            options: [
                { id: "a", text: "Morphine" },
                { id: "b", text: "Hydromorphone" },
                { id: "c", text: "Meperidine" },
                { id: "d", text: "Acetaminophen" }
            ],
            correct: "c",
            rationale: {
                correct: "Meperidine (Demerol) is avoided because its metabolite, normeperidine, is neurotoxic and lowers seizure threshold. Morphine and hydromorphone are first-line opioids for sickle cell pain; acetaminophen is a useful adjunct.",
                a: "Morphine is a standard first-line opioid.",
                b: "Hydromorphone is commonly used.",
                d: "Acetaminophen is used as an adjunct; it\u2019s safe."
            },
            testTakingTip: "Avoid meperidine in sickle cell: neurotoxic metabolite.",
            guideSection: "Section 6 \u2014 Priority Care",
            guideSectionId: "priority"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Parents ask what they should do if their 7-year-old with sickle cell disease develops mild leg pain at home. Which response is BEST?",
            options: [
                { id: "a", text: "\u201cApply an ice pack to the painful area.\u201d" },
                { id: "b", text: "\u201cEncourage extra fluids, use a warm compress, and give the prescribed acetaminophen or ibuprofen.\u201d" },
                { id: "c", text: "\u201cKeep the child NPO and wait for the pain to pass.\u201d" },
                { id: "d", text: "\u201cTake the child outside for fresh cold air to reduce swelling.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Mild crisis pain can often be managed at home with increased hydration, warm compresses (heat promotes vasodilation), and scheduled non-opioid analgesics. Call the sickle cell clinic if pain escalates or fever develops.",
                a: "Cold/ice causes vasoconstriction and worsens sickling.",
                c: "NPO worsens dehydration and sickling.",
                d: "Cold exposure is a trigger, not a remedy."
            },
            testTakingTip: "Heat = helpful. Cold = worse sickling.",
            guideSection: "Section 9 \u2014 Family Education",
            guideSectionId: "family"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The primary purpose of hydroxyurea therapy in children with sickle cell disease is to:",
            options: [
                { id: "a", text: "Directly kill sickle cells" },
                { id: "b", text: "Increase fetal hemoglobin (HbF) production" },
                { id: "c", text: "Replace iron lost from chronic hemolysis" },
                { id: "d", text: "Sterilize the bone marrow before transplant" }
            ],
            correct: "b",
            rationale: {
                correct: "Hydroxyurea increases production of fetal hemoglobin (HbF), which does NOT sickle. Higher HbF levels reduce vaso-occlusive crises, acute chest syndrome, stroke risk, and improve survival.",
                a: "Hydroxyurea doesn\u2019t directly destroy sickle cells; it shifts hemoglobin production.",
                c: "Iron supplementation is rarely needed \u2014 patients may have iron overload from transfusions.",
                d: "Hydroxyurea is not a conditioning agent for transplant."
            },
            testTakingTip: "Hydroxyurea = induces HbF = fewer crises.",
            guideSection: "Section 8 \u2014 Long-Term Management",
            guideSectionId: "longterm"
        },
        {
            id: 9,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 2-year-old with sickle cell disease is admitted with a rapidly enlarging spleen, pallor, and hypotension. What is the nurse\u2019s priority intervention?",
            options: [
                { id: "a", text: "Assess for respiratory distress and administer oxygen" },
                { id: "b", text: "Prepare for emergent IV fluid resuscitation and PRBC transfusion" },
                { id: "c", text: "Position the child prone and apply warm compresses" },
                { id: "d", text: "Administer a scheduled dose of hydroxyurea" }
            ],
            correct: "b",
            rationale: {
                correct: "Splenic sequestration traps large volumes of blood in the spleen, causing rapid drops in hemoglobin and hypovolemic shock. Priority: restore volume with IV fluids and PRBC transfusion. Recurrent episodes may lead to splenectomy.",
                a: "Respiratory assessment is important, but hemodynamic support is the priority.",
                c: "Positioning doesn\u2019t address shock; compresses don\u2019t fix volume loss.",
                d: "Hydroxyurea is a maintenance med, not emergency care."
            },
            testTakingTip: "Splenic sequestration + shock = volume + PRBCs NOW.",
            guideSection: "Section 2 \u2014 Crisis Types",
            guideSectionId: "crisis-types"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Why is penicillin prophylaxis prescribed daily for young children with sickle cell disease?",
            options: [
                { id: "a", text: "To treat ongoing infections during crises" },
                { id: "b", text: "To prevent overwhelming sepsis from encapsulated bacteria due to functional asplenia" },
                { id: "c", text: "To reduce the need for transfusions" },
                { id: "d", text: "To improve the effect of hydroxyurea" }
            ],
            correct: "b",
            rationale: {
                correct: "Daily penicillin V from 2 months through at least age 5 dramatically reduces mortality from encapsulated-organism sepsis (S. pneumoniae especially) in children with functional asplenia from sickle cell disease. It is PROPHYLACTIC, not treatment.",
                a: "Penicillin here is preventive, not for active infection.",
                c: "It has no role in reducing transfusion need.",
                d: "Penicillin and hydroxyurea are independent therapies."
            },
            testTakingTip: "Daily penicillin in SCD = prevent pneumococcal sepsis. Through age 5+.",
            guideSection: "Section 8 \u2014 Long-Term Management",
            guideSectionId: "longterm"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which test is used annually to screen school-age children with sickle cell disease for stroke risk?",
            options: [
                { id: "a", text: "Electroencephalogram (EEG)" },
                { id: "b", text: "Transcranial Doppler (TCD) ultrasound" },
                { id: "c", text: "Lumbar puncture" },
                { id: "d", text: "Echocardiogram" }
            ],
            correct: "b",
            rationale: {
                correct: "TCD ultrasound measures cerebral artery blood flow velocity. Velocities >200 cm/sec indicate high stroke risk \u2014 those children start chronic transfusion to keep HbS <30% and prevent first stroke. Screening begins age 2 and continues annually through age 16.",
                a: "EEG measures brain electrical activity, not blood flow.",
                c: "LP is not a stroke screening tool.",
                d: "Echo evaluates heart function, not cerebral circulation."
            },
            testTakingTip: "SCD stroke screening = TCD annually age 2\u201316. >200 cm/s = chronic transfusion.",
            guideSection: "Section 8 \u2014 Long-Term Management",
            guideSectionId: "longterm"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is reviewing IV fluids for a child in vaso-occlusive crisis. Which IV fluid rate is MOST appropriate?",
            options: [
                { id: "a", text: "Fluid restriction at half maintenance" },
                { id: "b", text: "Standard maintenance" },
                { id: "c", text: "1.5\u20132 times maintenance of D5 1/2NS or D5NS" },
                { id: "d", text: "Bolus 20 mL/kg lactated Ringer's every hour until pain resolves" }
            ],
            correct: "c",
            rationale: {
                correct: "Aggressive hydration (1.5\u20132\u00d7 maintenance) dilutes blood, reduces sickling, and flushes through occluded vessels. Typical fluids are D5 1/2NS or D5NS. Monitor for fluid overload, especially with suspected ACS.",
                a: "Fluid restriction worsens sickling.",
                b: "Standard maintenance is inadequate for crisis.",
                d: "Continuous bolus levels of fluid risk fluid overload and ACS."
            },
            testTakingTip: "Crisis IV fluids = 1.5\u20132\u00d7 maintenance. D5 1/2NS typical.",
            guideSection: "Section 6 \u2014 Priority Care",
            guideSectionId: "priority"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A teenager with sickle cell disease undergoing chronic transfusion therapy now has a ferritin level of 1,800 ng/mL. The nurse anticipates the provider will:",
            options: [
                { id: "a", text: "Increase the transfusion frequency" },
                { id: "b", text: "Start iron chelation therapy (e.g., deferasirox)" },
                { id: "c", text: "Begin oral iron supplements" },
                { id: "d", text: "Discontinue folic acid" }
            ],
            correct: "b",
            rationale: {
                correct: "Chronic transfusions cause iron overload; ferritin >1,000 triggers iron chelation therapy (deferasirox, deferoxamine) to prevent iron deposition in heart, liver, and endocrine glands.",
                a: "More transfusions worsen iron overload.",
                c: "Iron is NOT needed \u2014 the child has iron overload, not deficiency.",
                d: "Folic acid supports marrow and is continued."
            },
            testTakingTip: "Chronic transfusion + ferritin >1,000 = chelation therapy.",
            guideSection: "Section 7 \u2014 Transfusion",
            guideSectionId: "transfusion"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "An infant with sickle cell disease presents with swollen, painful hands and feet. The nurse recognizes this as:",
            options: [
                { id: "a", text: "Kawasaki disease" },
                { id: "b", text: "Dactylitis (hand-foot syndrome)" },
                { id: "c", text: "Osteomyelitis" },
                { id: "d", text: "Juvenile idiopathic arthritis" }
            ],
            correct: "b",
            rationale: {
                correct: "Dactylitis (hand-foot syndrome) is often the FIRST sickle cell crisis in infants and toddlers. Vaso-occlusion in the small bones of the hands and feet produces painful swelling. It is self-limited but signals the disease is clinically active.",
                a: "Kawasaki affects larger vessels and includes fever \u2265 5 days, rash, lymph nodes.",
                c: "Osteomyelitis is localized bone infection \u2014 consider if fever plus focal bone tenderness.",
                d: "JIA persistent joint swelling for >6 weeks; different timeline."
            },
            testTakingTip: "Infant + sickle cell + swollen hands/feet = dactylitis.",
            guideSection: "Section 1 \u2014 Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school nurse is writing a 504 plan for a student with sickle cell disease. Which accommodation should be prioritized?",
            options: [
                { id: "a", text: "Mandatory participation in all contact sports for socialization" },
                { id: "b", text: "Unlimited access to water bottle and bathroom at all times" },
                { id: "c", text: "Seating closest to the air conditioning vent in winter" },
                { id: "d", text: "Daily ice baths during PE class" }
            ],
            correct: "b",
            rationale: {
                correct: "Hydration is the cornerstone of crisis prevention. School accommodations should allow water access at all times, frequent bathroom breaks, and warmth (not cold). Activity is encouraged but in moderation with hydration.",
                a: "Contact sports increase dehydration and trauma risk.",
                c: "Cold is a trigger \u2014 avoid direct air conditioning blast.",
                d: "Ice baths worsen sickling."
            },
            testTakingTip: "School plan priorities: water + bathroom + warmth.",
            guideSection: "Section 9 \u2014 Family Education",
            guideSectionId: "family"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 10-year-old with sickle cell disease presents with cough, chest pain, fever, and a SpO2 of 88%. Chest X-ray shows a new lobar infiltrate. Which interventions does the nurse prioritize?",
            options: [
                { id: "a", text: "Oral fluids, rest, and ibuprofen only" },
                { id: "b", text: "Supplemental oxygen, broad-spectrum IV antibiotics, cautious IV fluids, pain control, and incentive spirometry" },
                { id: "c", text: "Immediate exchange transfusion without any other interventions" },
                { id: "d", text: "Discharge home with antibiotic prescription and follow-up in 1 week" }
            ],
            correct: "b",
            rationale: {
                correct: "This is acute chest syndrome \u2014 the leading cause of mortality in SCD. Treatment includes oxygen, broad-spectrum IV antibiotics to cover atypical and typical pneumonia pathogens, CAUTIOUS IV fluids (avoid overload), adequate pain control to enable deep breathing, and incentive spirometry to prevent atelectasis. Exchange transfusion is considered for severe or worsening disease.",
                a: "Oral management is inadequate for ACS.",
                c: "Exchange transfusion alone without antibiotics/oxygen is incomplete.",
                d: "ACS cannot be managed outpatient."
            },
            testTakingTip: "ACS bundle: O2, antibiotics, CAUTIOUS fluids, pain, spirometry.",
            guideSection: "Section 2 \u2014 Crisis Types",
            guideSectionId: "crisis-types"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent whose child was just diagnosed with sickle cell disease after newborn screening asks, \u201cHow did this happen?\u201d The nurse\u2019s BEST response is:",
            options: [
                { id: "a", text: "\u201cIt\u2019s caused by something in the environment you were exposed to during pregnancy.\u201d" },
                { id: "b", text: "\u201cBoth you and your partner each carry one copy of the sickle gene; your baby inherited two copies.\u201d" },
                { id: "c", text: "\u201cIt\u2019s a random disease that has nothing to do with genetics.\u201d" },
                { id: "d", text: "\u201cIt only happens to babies with low birth weight.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Sickle cell disease is autosomal recessive \u2014 the child needs two copies of the sickle gene, one from each parent. Each parent is a carrier (HbAS). Genetic counseling is important for future pregnancies and extended family.",
                a: "It is genetic, not environmental.",
                c: "It is specifically genetic.",
                d: "Birth weight is not a factor."
            },
            testTakingTip: "SCD = autosomal recessive, needs two copies. Refer for genetic counseling.",
            guideSection: "Section 1 \u2014 Fundamentals",
            guideSectionId: "fundamentals"
        }
    ]
};
