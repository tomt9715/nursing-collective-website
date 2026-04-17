/**
 * Pediatric Solid Tumors Quiz — Question Data
 * NCLEX-style questions covering medulloblastoma, neuroblastoma,
 * diagnostic workup, treatment, post-op nursing priorities, and family support.
 */

/* exported pediatricSolidTumorsQuizData */
var pediatricSolidTumorsQuizData = {
    guideName: "Pediatric Solid Tumors",
    guideSlug: "pediatric-solid-tumors",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 11,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which is the MOST common malignant CNS tumor in children under 14 years old?",
            options: [
                { id: "a", text: "Glioblastoma multiforme" },
                { id: "b", text: "Medulloblastoma" },
                { id: "c", text: "Meningioma" },
                { id: "d", text: "Craniopharyngioma" }
            ],
            correct: "b",
            rationale: {
                correct: "Medulloblastoma is the most common malignant CNS tumor in children <14, arising in the cerebellum/posterior fossa. It is the prototype pediatric brain cancer for NCLEX.",
                a: "Glioblastoma is rare in children.",
                c: "Meningiomas are usually benign and much more common in adults.",
                d: "Craniopharyngioma occurs in children but is less common than medulloblastoma."
            },
            testTakingTip: "Most common childhood malignant brain tumor = medulloblastoma.",
            guideSection: "Section 2 \u2014 Medulloblastoma",
            guideSectionId: "medulloblastoma"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 7-year-old is brought to the clinic by their parent with a 3-week history of morning headaches, projectile vomiting without nausea on awakening, and clumsy walking. Which tumor should the nurse suspect?",
            options: [
                { id: "a", text: "Wilms tumor" },
                { id: "b", text: "Medulloblastoma" },
                { id: "c", text: "Neuroblastoma" },
                { id: "d", text: "Retinoblastoma" }
            ],
            correct: "b",
            rationale: {
                correct: "Morning headache + projectile vomiting without nausea (relieved by vomiting) + ataxia is the classic medulloblastoma triad reflecting increased ICP and cerebellar involvement.",
                a: "Wilms presents with an abdominal mass, not neurologic symptoms.",
                c: "Neuroblastoma presents with an abdominal mass and catecholamine-related findings, not cerebellar symptoms.",
                d: "Retinoblastoma presents with leukocoria (white pupillary reflex) and eye changes."
            },
            testTakingTip: "Morning HA + AM vomiting + ataxia = medulloblastoma / posterior fossa tumor.",
            guideSection: "Section 2 \u2014 Medulloblastoma",
            guideSectionId: "medulloblastoma"
        },
        {
            id: 3,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A nurse is caring for a 2-year-old newly diagnosed with neuroblastoma who has a large abdominal mass. Which intervention is the PRIORITY?",
            options: [
                { id: "a", text: "Palpate the abdomen every 2 hours to monitor for enlargement" },
                { id: "b", text: "Post a sign at the bedside stating \u201cDo not palpate abdomen\u201d" },
                { id: "c", text: "Apply a warm compress to reduce tumor pain" },
                { id: "d", text: "Encourage the child to lie prone to reduce mass visibility" }
            ],
            correct: "b",
            rationale: {
                correct: "The neuroblastoma tumor capsule is fragile. Palpation can rupture the capsule and spread malignant cells. Post a bedside sign, educate all caregivers, and limit assessment to inspection and auscultation only.",
                a: "Repeated palpation can spread tumor cells \u2014 this is dangerous.",
                c: "Warm compresses don\u2019t address the safety concern.",
                d: "Prone positioning has no specific role and doesn\u2019t prevent palpation."
            },
            testTakingTip: "Neuroblastoma (or Wilms) abdomen = DO NOT PALPATE.",
            guideSection: "Section 3 \u2014 Neuroblastoma",
            guideSectionId: "neuroblastoma"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Neuroblastoma MOST often arises in which anatomic location?",
            options: [
                { id: "a", text: "Posterior fossa of the brain" },
                { id: "b", text: "Adrenal gland / retroperitoneum" },
                { id: "c", text: "Kidney" },
                { id: "d", text: "Liver" }
            ],
            correct: "b",
            rationale: {
                correct: "About 65% of neuroblastomas arise in the adrenal medulla or retroperitoneum. They come from neural crest cells along the sympathetic chain and can also occur in the chest, neck, and pelvis.",
                a: "Posterior fossa is where medulloblastoma grows.",
                c: "Wilms tumor arises from the kidney.",
                d: "Hepatoblastoma arises from the liver."
            },
            testTakingTip: "Neuroblastoma = adrenal / retroperitoneum. Follows sympathetic chain.",
            guideSection: "Section 3 \u2014 Neuroblastoma",
            guideSectionId: "neuroblastoma"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which urine test is used to help diagnose neuroblastoma?",
            options: [
                { id: "a", text: "Urine protein and creatinine" },
                { id: "b", text: "24-hour urinary catecholamines (VMA and HVA)" },
                { id: "c", text: "Urinary myoglobin" },
                { id: "d", text: "Urinary pH" }
            ],
            correct: "b",
            rationale: {
                correct: "Neuroblastoma cells produce catecholamines. Elevated urinary vanillylmandelic acid (VMA) and homovanillic acid (HVA) on a 24-hour collection support the diagnosis in >90% of patients.",
                a: "Urine protein/creatinine is for renal disease.",
                c: "Myoglobin is seen with rhabdomyolysis.",
                d: "Urinary pH doesn\u2019t diagnose neuroblastoma."
            },
            testTakingTip: "Neuroblastoma = urine VMA/HVA elevated.",
            guideSection: "Section 3 \u2014 Neuroblastoma",
            guideSectionId: "neuroblastoma"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A child with medulloblastoma is 6 hours post-op from a posterior fossa craniotomy. Which position is appropriate?",
            options: [
                { id: "a", text: "Trendelenburg with HOB flat" },
                { id: "b", text: "Flat side-lying on the un-operated side" },
                { id: "c", text: "High Fowler\u2019s with hips flexed" },
                { id: "d", text: "Sitting up in a rocking chair" }
            ],
            correct: "b",
            rationale: {
                correct: "After a posterior fossa craniotomy, the child is usually positioned flat side-lying (or prone) on the un-operated side. This avoids pressure on the surgical site and prevents increased ICP. Trendelenburg is contraindicated (raises ICP). HOB elevation is surgeon-specific \u2014 often kept flat initially.",
                a: "Trendelenburg raises ICP and can cause herniation.",
                c: "High Fowler\u2019s may not be appropriate immediately post-op and depends on surgeon order.",
                d: "Early mobilization is usually delayed after intracranial surgery."
            },
            testTakingTip: "Post-posterior fossa = side-lying or prone on UN-operated side. No Trendelenburg.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 10-year-old with medulloblastoma has the following vital signs: BP 145/60, HR 48, RR irregular. These findings are MOST consistent with:",
            options: [
                { id: "a", text: "Hypovolemic shock" },
                { id: "b", text: "Cushing\u2019s triad / increased intracranial pressure" },
                { id: "c", text: "Sepsis" },
                { id: "d", text: "Normal sleep vital signs" }
            ],
            correct: "b",
            rationale: {
                correct: "Cushing\u2019s triad \u2014 hypertension, bradycardia, and irregular respirations \u2014 is a late sign of increased ICP and impending herniation. Emergency: notify provider, elevate HOB 30\u00b0, ensure airway, prepare mannitol or hypertonic saline.",
                a: "Hypovolemic shock presents with tachycardia and hypotension.",
                c: "Sepsis usually causes tachycardia and hypotension.",
                d: "These vitals are NOT normal."
            },
            testTakingTip: "Cushing\u2019s triad = HTN + bradycardia + irregular breathing = emergency ICP.",
            guideSection: "Section 2 \u2014 Medulloblastoma",
            guideSectionId: "medulloblastoma"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The presence of which genetic finding in neuroblastoma indicates HIGH-risk disease?",
            options: [
                { id: "a", text: "Philadelphia chromosome" },
                { id: "b", text: "MYCN amplification" },
                { id: "c", text: "BCR-ABL translocation" },
                { id: "d", text: "HER2 overexpression" }
            ],
            correct: "b",
            rationale: {
                correct: "MYCN gene amplification in neuroblastoma cells denotes aggressive, high-risk disease and triggers intensified multi-modal therapy (chemo + surgery + autologous BMT + radiation + immunotherapy).",
                a: "Philadelphia chromosome is associated with CML.",
                c: "BCR-ABL is the Philadelphia chromosome fusion \u2014 CML marker.",
                d: "HER2 overexpression is a breast cancer marker."
            },
            testTakingTip: "Neuroblastoma + MYCN amplified = high risk.",
            guideSection: "Section 3 \u2014 Neuroblastoma",
            guideSectionId: "neuroblastoma"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The parents of a child 2 days post-op from a posterior fossa craniotomy report that the child was talking and responsive on day 1 but today is suddenly silent, tearful, and unable to swallow. The nurse recognizes this as:",
            options: [
                { id: "a", text: "A stroke complication \u2014 call the rapid response team" },
                { id: "b", text: "Cerebellar mutism syndrome" },
                { id: "c", text: "Seizure activity" },
                { id: "d", text: "Normal healing response" }
            ],
            correct: "b",
            rationale: {
                correct: "Cerebellar mutism syndrome occurs in up to 25% of posterior fossa surgeries. The child is initially alert post-op, then 1\u20134 days later develops transient muteness, emotional lability, and dysphagia. Usually resolves over weeks to months; support with speech therapy and reassurance.",
                a: "Rule out stroke with imaging if deficits are progressive, but classic mutism presentation is cerebellar mutism syndrome.",
                c: "Seizures would show motor activity or altered awareness, not silent tearfulness.",
                d: "This is NOT normal \u2014 it requires recognition and support, though it usually resolves."
            },
            testTakingTip: "Post-posterior fossa + muteness day 1\u20134 = cerebellar mutism syndrome.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which finding would MOST suggest orbital metastasis of neuroblastoma?",
            options: [
                { id: "a", text: "Leukocoria (white pupillary reflex)" },
                { id: "b", text: "Periorbital ecchymosis (raccoon eyes)" },
                { id: "c", text: "Exophthalmos" },
                { id: "d", text: "Cataracts" }
            ],
            correct: "b",
            rationale: {
                correct: "Periorbital ecchymosis \u2014 \u201craccoon eyes\u201d \u2014 is classic for neuroblastoma with orbital bone metastasis, especially in infants and young children.",
                a: "Leukocoria is the hallmark of retinoblastoma.",
                c: "Exophthalmos can occur but is not the classic neuroblastoma sign.",
                d: "Cataracts are not a neuroblastoma sign."
            },
            testTakingTip: "Raccoon eyes in a toddler = neuroblastoma orbital mets.",
            guideSection: "Section 3 \u2014 Neuroblastoma",
            guideSectionId: "neuroblastoma"
        },
        {
            id: 11,
            type: "multi",
            subtype: null,
            difficulty: "application",
            stem: "Which findings in a 12-year-old with a posterior fossa tumor indicate INCREASED intracranial pressure? (Select all that apply.)",
            options: [
                { id: "a", text: "Morning headache relieved by vomiting" },
                { id: "b", text: "Papilledema on fundoscopic exam" },
                { id: "c", text: "Irritability and personality change" },
                { id: "d", text: "Brisk deep tendon reflexes at baseline" },
                { id: "e", text: "Cushing\u2019s triad: hypertension, bradycardia, irregular respirations" },
                { id: "f", text: "Steady weight gain over 2 months" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Morning headache, papilledema, personality changes, and Cushing\u2019s triad are all signs of increased ICP. Brisk DTRs at baseline and steady weight gain are NOT ICP findings.",
                a: "Correct \u2014 classic morning HA pattern.",
                b: "Correct \u2014 papilledema indicates increased ICP.",
                c: "Correct \u2014 personality change is an early sign in children.",
                d: "Brisk DTRs alone are not specific for ICP.",
                e: "Correct \u2014 Cushing\u2019s triad is late ICP sign.",
                f: "Weight gain is unrelated."
            },
            testTakingTip: "ICP: morning HA, papilledema, personality change, Cushing\u2019s triad.",
            guideSection: "Section 2 \u2014 Medulloblastoma",
            guideSectionId: "medulloblastoma"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A child receiving cisplatin for medulloblastoma should have which baseline and serial assessments?",
            options: [
                { id: "a", text: "Echocardiogram" },
                { id: "b", text: "Audiology evaluation (hearing testing)" },
                { id: "c", text: "Pulmonary function tests" },
                { id: "d", text: "Bone density scan" }
            ],
            correct: "b",
            rationale: {
                correct: "Cisplatin is ototoxic \u2014 it can cause permanent high-frequency hearing loss. Baseline and periodic audiograms are essential. Also monitor renal function (nephrotoxicity).",
                a: "Echocardiograms are needed for anthracyclines (doxorubicin), not cisplatin.",
                c: "PFTs are for bleomycin and radiation patients.",
                d: "Not routine for cisplatin."
            },
            testTakingTip: "Cisplatin = ototoxic. Check hearing regularly.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 13,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A nurse is planning care for a neutropenic toddler with neuroblastoma who just developed a fever of 101.4\u00b0F. Which action should be performed FIRST?",
            options: [
                { id: "a", text: "Administer oral acetaminophen and observe" },
                { id: "b", text: "Obtain blood cultures and administer broad-spectrum IV antibiotics within 1 hour" },
                { id: "c", text: "Place the child in droplet isolation and delay further action" },
                { id: "d", text: "Offer extra oral fluids and recheck temperature in 2 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Febrile neutropenia is an oncologic emergency. Immediate actions: blood cultures (peripheral + central line), other cultures as indicated, and broad-spectrum IV antibiotics within the first hour. Mortality rises sharply with antibiotic delay.",
                a: "Treating fever alone misses sepsis risk.",
                c: "Isolation doesn\u2019t substitute for antibiotics.",
                d: "Delay is dangerous."
            },
            testTakingTip: "Neutropenic fever = cultures + antibiotics within 1 hour.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a child about to undergo treatment for medulloblastoma asks what to expect in the long term. Which is the BEST nursing response?",
            options: [
                { id: "a", text: "\u201cYour child will not have any long-term problems once treatment ends.\u201d" },
                { id: "b", text: "\u201cLong-term follow-up in a survivorship clinic helps monitor for late effects like cognitive, hearing, or endocrine issues.\u201d" },
                { id: "c", text: "\u201cAfter treatment, your child won\u2019t need additional follow-up.\u201d" },
                { id: "d", text: "\u201cMost children cannot return to school after treatment for a brain tumor.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Survivorship clinic follow-up helps identify and manage late effects of treatment \u2014 cognitive changes (esp. after CNS radiation), hearing loss (cisplatin), endocrine deficits (radiation), cardiac issues, growth concerns, and secondary cancers. Many children return to school with accommodations and go on to live full lives.",
                a: "False reassurance \u2014 late effects are real.",
                c: "Follow-up is essential for years.",
                d: "Children can and usually do return to school, often with a 504 plan or IEP."
            },
            testTakingTip: "Always anticipate late effects; survivorship care matters.",
            guideSection: "Section 7 \u2014 Family Coping",
            guideSectionId: "family"
        }
    ]
};
