/**
 * Bleeding Disorders Quiz — Question Data
 * NCLEX-style questions covering hemophilia, ITP, diagnostic labs,
 * treatment, bleeding precautions, and family education.
 */

/* exported bleedingDisordersQuizData */
var bleedingDisordersQuizData = {
    guideName: "Bleeding Disorders (Hemophilia & ITP)",
    guideSlug: "bleeding-disorders",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 11,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Hemophilia A is caused by a deficiency of which clotting factor?",
            options: [
                { id: "a", text: "Factor VII" },
                { id: "b", text: "Factor VIII" },
                { id: "c", text: "Factor IX" },
                { id: "d", text: "Factor XI" }
            ],
            correct: "b",
            rationale: {
                correct: "Hemophilia A (classic hemophilia) is caused by a deficiency of factor VIII, X-linked recessive, and accounts for ~80% of hemophilia cases.",
                a: "Factor VII deficiency is a separate, rare bleeding disorder.",
                c: "Factor IX deficiency = Hemophilia B (Christmas disease).",
                d: "Factor XI deficiency is hemophilia C \u2014 different inheritance and rare."
            },
            testTakingTip: "A = 8 (factor VIII). B = 9 (factor IX).",
            guideSection: "Section 2 \u2014 Hemophilia",
            guideSectionId: "hemophilia"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A mother asks how her son inherited hemophilia when neither parent has it. The BEST nursing explanation is:",
            options: [
                { id: "a", text: "\u201cIt\u2019s caused by vitamin K deficiency at birth.\u201d" },
                { id: "b", text: "\u201cMothers who are carriers pass it to their sons on the X chromosome.\u201d" },
                { id: "c", text: "\u201cHemophilia is autosomal dominant.\u201d" },
                { id: "d", text: "\u201cIt\u2019s caused by a recent infection.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Hemophilia A and B are X-linked recessive. Most affected children are boys (only one X chromosome). Female carriers pass the gene to 50% of sons (affected) and 50% of daughters (carriers). Refer for genetic counseling.",
                a: "Vitamin K deficiency causes hemorrhagic disease of the newborn, not hemophilia.",
                c: "Autosomal dominant would affect both sexes equally \u2014 incorrect for hemophilia.",
                d: "Hemophilia is genetic, not infectious."
            },
            testTakingTip: "Hemophilia A/B = X-linked recessive. Affects boys. Mothers are carriers.",
            guideSection: "Section 2 \u2014 Hemophilia",
            guideSectionId: "hemophilia"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old with hemophilia A falls and hits his head. He is alert and has no visible injuries. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Observe the child at home for 24 hours" },
                { id: "b", text: "Administer factor VIII replacement as prescribed, then obtain a head CT" },
                { id: "c", text: "Give acetaminophen for pain" },
                { id: "d", text: "Apply an ice pack and reassess in 4 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Any head injury in a child with hemophilia requires factor replacement FIRST, then imaging. Intracranial hemorrhage is the leading cause of death; treating early even before symptoms develop is critical. \u201cFactor first, worry later.\u201d",
                a: "Home observation misses a potentially fatal bleed.",
                c: "Acetaminophen doesn\u2019t address the risk; and NSAIDs are contraindicated.",
                d: "Delay can be fatal."
            },
            testTakingTip: "Hemophilia + head injury = factor FIRST, then imaging.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which lab finding is MOST consistent with hemophilia A?",
            options: [
                { id: "a", text: "Low platelet count" },
                { id: "b", text: "Prolonged PT, normal PTT" },
                { id: "c", text: "Prolonged PTT, normal PT, normal platelet count, low factor VIII" },
                { id: "d", text: "Elevated white blood cell count" }
            ],
            correct: "c",
            rationale: {
                correct: "Hemophilia A causes prolonged PTT (intrinsic pathway) with normal PT, normal platelet count, and LOW factor VIII activity on assay.",
                a: "Low platelets point to ITP or leukemia.",
                b: "Prolonged PT alone suggests liver or vitamin K issue.",
                d: "Leukocytosis is not a feature of hemophilia."
            },
            testTakingTip: "Hemophilia = \u2191 PTT, normal PT, normal platelets, low factor.",
            guideSection: "Section 4 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 5-year-old presents with widespread petechiae and purpura. The parent reports the child had a viral illness 2 weeks ago. Labs show platelets 12,000/mm\u00b3; WBC, hemoglobin, PT, and PTT are normal. The nurse suspects:",
            options: [
                { id: "a", text: "Acute lymphoblastic leukemia" },
                { id: "b", text: "Hemophilia A" },
                { id: "c", text: "Immune thrombocytopenic purpura (ITP)" },
                { id: "d", text: "Von Willebrand disease" }
            ],
            correct: "c",
            rationale: {
                correct: "ITP is characterized by isolated severe thrombocytopenia in a well-appearing child, often following a viral illness by 1\u20134 weeks. CBC (except platelets), PT, and PTT are normal.",
                a: "Leukemia typically has additional findings \u2014 anemia, abnormal WBC, fever, hepatosplenomegaly, bone pain.",
                b: "Hemophilia has prolonged PTT and deep-tissue bleeding, not isolated thrombocytopenia + petechiae.",
                d: "vWD has prolonged bleeding time and often abnormal PTT; less commonly isolated thrombocytopenia."
            },
            testTakingTip: "Post-viral, isolated low platelets, petechiae/purpura, well child = ITP.",
            guideSection: "Section 3 \u2014 ITP",
            guideSectionId: "itp"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The PRIMARY pathophysiology of ITP is:",
            options: [
                { id: "a", text: "Inherited deficiency of clotting factors" },
                { id: "b", text: "Autoantibodies that destroy platelets in the spleen" },
                { id: "c", text: "Malignant proliferation of blasts in the bone marrow" },
                { id: "d", text: "Hemoglobin S polymerization under stress" }
            ],
            correct: "b",
            rationale: {
                correct: "ITP is an autoimmune disorder in which antiplatelet antibodies tag platelets for destruction by splenic macrophages, causing isolated thrombocytopenia. It is usually post-viral in children.",
                a: "Inherited factor deficiency = hemophilia.",
                c: "Blasts in marrow = leukemia.",
                d: "HbS polymerization = sickle cell disease."
            },
            testTakingTip: "ITP = antiplatelet antibodies, spleen destroys platelets.",
            guideSection: "Section 3 \u2014 ITP",
            guideSectionId: "itp"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A child with ITP is bleeding severely. Which intervention will raise the platelet count MOST rapidly?",
            options: [
                { id: "a", text: "Oral prednisone only" },
                { id: "b", text: "IV immunoglobulin (IVIG)" },
                { id: "c", text: "Oral iron supplementation" },
                { id: "d", text: "Subcutaneous factor VIII" }
            ],
            correct: "b",
            rationale: {
                correct: "IVIG raises platelets within hours to 1\u20132 days by saturating splenic macrophage Fc receptors, preventing platelet destruction. It\u2019s first-line for significant bleeding in ITP.",
                a: "Steroids work but slower; they\u2019re often combined with IVIG.",
                c: "Iron doesn\u2019t address the platelet problem.",
                d: "Factor VIII treats hemophilia, not ITP."
            },
            testTakingTip: "ITP + severe bleeding = IVIG first (fast action).",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Why is routine platelet transfusion generally NOT effective in childhood ITP?",
            options: [
                { id: "a", text: "Children\u2019s veins are too small to transfuse" },
                { id: "b", text: "The antiplatelet antibodies destroy transfused platelets quickly" },
                { id: "c", text: "Platelet transfusions cause ITP to relapse" },
                { id: "d", text: "Transfused platelets activate the coagulation cascade dangerously" }
            ],
            correct: "b",
            rationale: {
                correct: "Because antibodies causing ITP also destroy transfused platelets, a platelet transfusion typically produces a short-lived rise. Platelets are reserved for life-threatening bleeding, combined with IVIG/steroids.",
                a: "Vein size is not the reason.",
                c: "Transfusion does not cause relapse.",
                d: "Transfusions do not hyperactivate coagulation in ITP."
            },
            testTakingTip: "Platelet transfusion in ITP = short-lived; antibodies destroy them.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 9,
            type: "multi",
            subtype: null,
            difficulty: "application",
            stem: "Which nursing actions are appropriate for a child with hemophilia? (Select all that apply.)",
            options: [
                { id: "a", text: "Provide a soft toothbrush" },
                { id: "b", text: "Apply pressure for 10 minutes after venipuncture" },
                { id: "c", text: "Administer IM injections in the deltoid" },
                { id: "d", text: "Give ibuprofen for joint pain" },
                { id: "e", text: "Avoid contact sports" },
                { id: "f", text: "Teach RICE response for joint bleeds" }
            ],
            correct: ["a", "b", "e", "f"],
            rationale: {
                correct: "A, B, E, and F are appropriate. IM injections and NSAIDs (ibuprofen) are contraindicated because they cause deep bleeding and impair platelet function, respectively.",
                a: "Correct \u2014 soft brush prevents gum bleeding.",
                b: "Correct \u2014 prolonged pressure is essential.",
                c: "IM injections cause deep tissue bleeding; give vaccines SubQ.",
                d: "NSAIDs impair platelet function and are contraindicated. Use acetaminophen.",
                e: "Correct \u2014 contact sports risk serious injury.",
                f: "Correct \u2014 RICE response to joint bleeds is standard."
            },
            testTakingTip: "No IM. No NSAIDs. RICE + soft brush + pressure.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 7-year-old with hemophilia reports that his knee feels \u201cfunny and tingly\u201d but it does not look swollen. Which is the nurse\u2019s BEST action?",
            options: [
                { id: "a", text: "Reassure the child and recheck in 4 hours" },
                { id: "b", text: "Apply heat and encourage ambulation" },
                { id: "c", text: "Initiate factor replacement and RICE immediately" },
                { id: "d", text: "Administer an oral NSAID for the discomfort" }
            ],
            correct: "c",
            rationale: {
                correct: "Children with recurrent hemarthroses often recognize the \u201caura\u201d of a joint bleed before visible swelling. Early factor replacement plus RICE (rest, ice, compression, elevation) can abort or minimize a joint bleed and prevent chronic damage.",
                a: "Delay worsens outcomes.",
                b: "Heat and movement promote more bleeding.",
                d: "NSAIDs are contraindicated."
            },
            testTakingTip: "Believe the child\u2019s bleed aura; treat early.",
            guideSection: "Section 2 \u2014 Hemophilia",
            guideSectionId: "hemophilia"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 3-year-old presents with multiple bruises in varied stages of healing, one imprinted as a hand mark. Labs are normal including CBC, PT, PTT, and factor levels. The nurse should:",
            options: [
                { id: "a", text: "Document and discharge home as accidental injury" },
                { id: "b", text: "Report suspected child abuse per mandatory reporting laws while continuing medical workup" },
                { id: "c", text: "Assume the child has a mild coagulopathy that wasn\u2019t detected" },
                { id: "d", text: "Treat with vitamin K and send home" }
            ],
            correct: "b",
            rationale: {
                correct: "Bruises in different stages of healing, patterned bruises (hand print), and injuries inconsistent with developmental stage raise concern for physical abuse. With normal coagulation labs, a bleeding disorder is unlikely. Nurses are mandatory reporters. Continue medical workup AND report.",
                a: "Ignoring red flags risks the child\u2019s safety.",
                c: "If labs are normal and history is suspicious, abuse is more likely.",
                d: "Vitamin K is not indicated without coagulopathy."
            },
            testTakingTip: "Patterned/staged bruises + normal labs = abuse concern. Mandatory report.",
            guideSection: "Section 4 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which home activity recommendation is MOST appropriate for a school-age child with severe hemophilia?",
            options: [
                { id: "a", text: "Participation in tackle football" },
                { id: "b", text: "Swimming and biking with a helmet" },
                { id: "c", text: "Competitive wrestling" },
                { id: "d", text: "Ice hockey with standard pads" }
            ],
            correct: "b",
            rationale: {
                correct: "Non-contact aerobic activities like swimming, biking with helmet, walking, and golf are encouraged to build joint health and fitness. High-impact contact sports (football, wrestling, hockey) carry unacceptable bleeding risk.",
                a: "Tackle football = high impact; contraindicated.",
                c: "Wrestling = direct impact; contraindicated.",
                d: "Ice hockey = high impact; contraindicated."
            },
            testTakingTip: "Hemophilia = swim, bike, golf. No contact sports.",
            guideSection: "Section 7 \u2014 Family Education",
            guideSectionId: "family"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Desmopressin (DDAVP) is useful for MILD hemophilia A and von Willebrand disease because it:",
            options: [
                { id: "a", text: "Directly replaces factor VIII and factor IX" },
                { id: "b", text: "Stimulates the release of stored factor VIII and vWF from endothelium" },
                { id: "c", text: "Destroys antiplatelet antibodies" },
                { id: "d", text: "Breaks down existing clots to prevent DVT" }
            ],
            correct: "b",
            rationale: {
                correct: "DDAVP causes release of endogenously stored factor VIII and von Willebrand factor from endothelial cells, producing a short-lived rise in factor levels. Used for mild hemophilia A and vWD. Watch for hyponatremia and fluid overload.",
                a: "DDAVP does not replace factor; it releases stored factor.",
                c: "DDAVP has no effect on antibodies.",
                d: "DDAVP does not break down clots."
            },
            testTakingTip: "DDAVP releases stored factor VIII/vWF. Mild hemophilia A and vWD.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is teaching the parent of a child with ITP about home care. Which statement indicates the parent understands?",
            options: [
                { id: "a", text: "\u201cI\u2019ll give my child aspirin if he has a fever.\u201d" },
                { id: "b", text: "\u201cI\u2019ll let him play tackle football since his platelets are coming back up.\u201d" },
                { id: "c", text: "\u201cI\u2019ll call the clinic if he develops new petechiae, mouth bleeding, or severe headache.\u201d" },
                { id: "d", text: "\u201cI\u2019ll give him ibuprofen for pain so he feels better.\u201d" }
            ],
            correct: "c",
            rationale: {
                correct: "Parents should watch for new bleeding signs (new petechiae, gum or nasal bleeding, severe headache \u2014 potential intracranial bleed). Aspirin and NSAIDs are contraindicated. Contact sports are avoided during low platelets.",
                a: "Aspirin impairs platelets.",
                b: "Contact sports risk bleeding even with recovering counts.",
                d: "Ibuprofen impairs platelets."
            },
            testTakingTip: "ITP: no ASA/NSAIDs, watch for bleeding, call for red flags.",
            guideSection: "Section 7 \u2014 Family Education",
            guideSectionId: "family"
        }
    ]
};
