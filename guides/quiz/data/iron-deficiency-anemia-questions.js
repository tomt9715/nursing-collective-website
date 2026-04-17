/**
 * Iron-Deficiency Anemia Quiz — Question Data
 * NCLEX-style questions covering pathophysiology, clinical findings,
 * labs, oral iron administration, and iron poisoning.
 */

/* exported ironDeficiencyAnemiaQuizData */
var ironDeficiencyAnemiaQuizData = {
    guideName: "Iron-Deficiency Anemia",
    guideSlug: "iron-deficiency-anemia",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 10,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A mother says, \u201cMy 14-month-old drinks 40 ounces of whole cow\u2019s milk daily and doesn\u2019t eat much table food.\u201d The nurse suspects the child is at highest risk for:",
            options: [
                { id: "a", text: "Hypernatremia" },
                { id: "b", text: "Iron-deficiency anemia" },
                { id: "c", text: "Hyperkalemia" },
                { id: "d", text: "Vitamin D toxicity" }
            ],
            correct: "b",
            rationale: {
                correct: "Excess cow\u2019s milk intake is the leading cause of iron-deficiency anemia in toddlers. Cow\u2019s milk has little iron, displaces iron-rich foods, and can cause microscopic GI bleeding. Recommend limiting to 16\u201324 oz/day.",
                a: "Cow\u2019s milk doesn\u2019t typically cause hypernatremia.",
                c: "Hyperkalemia is not the risk here.",
                d: "Vitamin D toxicity would require mega-dosing supplements, not milk intake."
            },
            testTakingTip: "Toddler + \u201ctoo much milk\u201d = IDA.",
            guideSection: "Section 1 \u2014 Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which finding is MOST suggestive of iron-deficiency anemia in a 3-year-old?",
            options: [
                { id: "a", text: "Cherry-red cheeks and increased energy" },
                { id: "b", text: "Pallor, fatigue, and pica (eating non-food items)" },
                { id: "c", text: "Jaundice and hepatomegaly" },
                { id: "d", text: "High fever and splenomegaly" }
            ],
            correct: "b",
            rationale: {
                correct: "Pallor, fatigue, and pica are classic findings in pediatric IDA. Pica (eating non-food items like dirt or ice) is distinctive and also signals potential lead exposure risk.",
                a: "Cherry-red cheeks are seen in carbon monoxide poisoning, not IDA.",
                c: "Jaundice and hepatomegaly point to liver disease or hemolysis.",
                d: "Fever and splenomegaly suggest infection, leukemia, or EBV, not IDA."
            },
            testTakingTip: "Pallor + fatigue + pica = IDA until proven otherwise.",
            guideSection: "Section 2 \u2014 Clinical Manifestations",
            guideSectionId: "clinical"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which lab pattern is classic for iron-deficiency anemia?",
            options: [
                { id: "a", text: "Macrocytic, hyperchromic anemia with high ferritin" },
                { id: "b", text: "Microcytic, hypochromic anemia with LOW ferritin and HIGH TIBC" },
                { id: "c", text: "Normocytic anemia with elevated reticulocytes and low ferritin" },
                { id: "d", text: "Microcytic anemia with high ferritin and low TIBC" }
            ],
            correct: "b",
            rationale: {
                correct: "IDA produces a microcytic (low MCV), hypochromic (low MCH) anemia with LOW ferritin (first lab to drop) and HIGH TIBC (transferrin tries to grab more iron). Reticulocytes are initially low.",
                a: "Macrocytic/hyperchromic = B12 or folate deficiency.",
                c: "Elevated reticulocytes suggest hemolysis.",
                d: "High ferritin + low TIBC = anemia of chronic disease."
            },
            testTakingTip: "IDA: small, pale RBCs + low ferritin + high TIBC.",
            guideSection: "Section 3 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is teaching the parent of a 2-year-old how to give prescribed liquid ferrous sulfate. Which instruction is MOST appropriate?",
            options: [
                { id: "a", text: "\u201cMix the iron with a full glass of milk for better taste.\u201d" },
                { id: "b", text: "\u201cGive the iron through a straw or syringe toward the back of the cheek to prevent staining the teeth, and rinse the mouth afterward.\u201d" },
                { id: "c", text: "\u201cGive the iron with a calcium supplement.\u201d" },
                { id: "d", text: "\u201cStop giving iron when the stools turn dark green or black.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Liquid iron stains teeth. Use a straw or syringe aimed toward the back of the cheek, then rinse or brush afterward. Dark green/black stools are NORMAL and expected \u2014 don\u2019t stop. Avoid milk and calcium, which block absorption.",
                a: "Milk reduces iron absorption and should be avoided at the same time.",
                c: "Calcium blocks iron absorption.",
                d: "Dark stool is expected; stopping early causes relapse."
            },
            testTakingTip: "Straw + vitamin C. No milk/calcium. Dark stool = normal.",
            guideSection: "Section 5 \u2014 Nursing & Safety",
            guideSectionId: "nursing"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which beverage should the nurse recommend to accompany the child\u2019s iron dose?",
            options: [
                { id: "a", text: "Whole milk" },
                { id: "b", text: "Black tea" },
                { id: "c", text: "Orange juice" },
                { id: "d", text: "Sparkling water with antacid" }
            ],
            correct: "c",
            rationale: {
                correct: "Vitamin C in orange juice markedly enhances nonheme iron absorption. Milk (calcium), tea (tannins), and antacids all inhibit absorption.",
                a: "Milk reduces absorption.",
                b: "Tea tannins reduce absorption.",
                d: "Antacids reduce absorption."
            },
            testTakingTip: "Iron + vitamin C = best absorption. Avoid milk, tea, antacids.",
            guideSection: "Section 4 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent calls concerned: \u201cMy child\u2019s stool is very dark green, almost black, since starting iron. Should I stop the medication?\u201d The BEST nursing response is:",
            options: [
                { id: "a", text: "\u201cYes, stop the iron and bring the child in immediately \u2014 it\u2019s likely GI bleeding.\u201d" },
                { id: "b", text: "\u201cDark green or black stool is an expected, harmless side effect of iron. Continue giving the medicine.\u201d" },
                { id: "c", text: "\u201cDouble the dose to make sure it\u2019s absorbing.\u201d" },
                { id: "d", text: "\u201cSwitch to milk-based formula to lighten the stool.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Dark green or black stools from iron supplementation are normal and expected \u2014 it\u2019s unabsorbed iron. It does NOT indicate GI bleeding. Melena from true GI bleeding is sticky, tarry, foul-smelling and typically accompanied by other symptoms.",
                a: "Dark stool from iron is expected, not a bleed.",
                c: "Don\u2019t double dose.",
                d: "Milk reduces iron absorption; irrelevant to stool color anyway."
            },
            testTakingTip: "Dark stool + iron = normal. True melena = sticky + tarry + other symptoms.",
            guideSection: "Section 5 \u2014 Nursing & Safety",
            guideSectionId: "nursing"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 3-year-old was found with an empty bottle of a parent\u2019s iron tablets. The child is currently vomiting with bloody emesis. What is the nurse\u2019s PRIORITY action?",
            options: [
                { id: "a", text: "Administer syrup of ipecac at home" },
                { id: "b", text: "Contact poison control and prepare for emergency care with IV access and deferoxamine" },
                { id: "c", text: "Give activated charcoal" },
                { id: "d", text: "Observe at home for 24 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Iron overdose is life-threatening. Immediate actions: call poison control (1-800-222-1222), ED evaluation, IV access, fluid resuscitation, abdominal X-ray to assess tablet burden, whole-bowel irrigation if indicated, and DEFEROXAMINE as the antidote. Activated charcoal does NOT bind iron. Ipecac is no longer recommended.",
                a: "Syrup of ipecac is obsolete.",
                c: "Activated charcoal does NOT bind iron.",
                d: "Home observation can be fatal with iron toxicity."
            },
            testTakingTip: "Iron OD = poison control + ED + deferoxamine. No charcoal, no ipecac.",
            guideSection: "Section 5 \u2014 Nursing & Safety",
            guideSectionId: "nursing"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The antidote for iron poisoning is:",
            options: [
                { id: "a", text: "Naloxone" },
                { id: "b", text: "Flumazenil" },
                { id: "c", text: "N-acetylcysteine" },
                { id: "d", text: "Deferoxamine" }
            ],
            correct: "d",
            rationale: {
                correct: "Deferoxamine chelates free iron and is excreted in the urine, turning it reddish-orange \u2014 an expected therapeutic sign.",
                a: "Naloxone reverses opioid overdose.",
                b: "Flumazenil reverses benzodiazepines.",
                c: "N-acetylcysteine is the acetaminophen antidote."
            },
            testTakingTip: "Iron = Deferoxamine. Acetaminophen = NAC. Opioids = Naloxone. Benzos = Flumazenil.",
            guideSection: "Section 5 \u2014 Nursing & Safety",
            guideSectionId: "nursing"
        },
        {
            id: 9,
            type: "multi",
            subtype: null,
            difficulty: "application",
            stem: "Which foods should the nurse recommend to help treat iron-deficiency anemia? (Select all that apply.)",
            options: [
                { id: "a", text: "Lean red meat" },
                { id: "b", text: "Fortified infant cereal" },
                { id: "c", text: "Strawberries and orange slices" },
                { id: "d", text: "Black tea with iron supplement" },
                { id: "e", text: "Beans, lentils, and spinach" },
                { id: "f", text: "Milk with every meal" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Heme iron (meat), fortified cereals, vitamin C sources (strawberries, oranges), and non-heme plant sources (beans, lentils, spinach) all support iron repletion. Tea and milk are INHIBITORS of iron absorption.",
                a: "Correct \u2014 heme iron is best absorbed.",
                b: "Correct \u2014 fortified cereal is a standard first solid food.",
                c: "Correct \u2014 vitamin C enhances absorption.",
                d: "Tea tannins reduce iron absorption.",
                e: "Correct \u2014 non-heme plant iron plus vitamin C pairing.",
                f: "Milk blocks absorption; limit dairy around iron intake."
            },
            testTakingTip: "Meat + fortified + vitamin C. Avoid milk + tea at iron times.",
            guideSection: "Section 6 \u2014 Family Education",
            guideSectionId: "family"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The nurse is screening 12-month-old children at a well-child clinic for iron-deficiency anemia. Which lab is the FIRST to become abnormal in iron deficiency?",
            options: [
                { id: "a", text: "Hemoglobin" },
                { id: "b", text: "Mean corpuscular volume (MCV)" },
                { id: "c", text: "Serum ferritin" },
                { id: "d", text: "White blood cell count" }
            ],
            correct: "c",
            rationale: {
                correct: "Serum ferritin reflects stored iron. It is the FIRST lab to drop in iron deficiency \u2014 before hemoglobin or MCV change. Low ferritin with normal hemoglobin identifies early iron deficiency.",
                a: "Hemoglobin falls later, after stores are depleted.",
                b: "MCV decreases after sustained deficiency.",
                d: "WBC is unrelated."
            },
            testTakingTip: "Ferritin drops FIRST. Hgb drops last.",
            guideSection: "Section 3 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is reviewing a 6-month-old child\u2019s iron-supplementation plan. Which instruction is MOST important?",
            options: [
                { id: "a", text: "\u201cGive the iron with whole milk at bedtime.\u201d" },
                { id: "b", text: "\u201cGive the iron between meals with a small amount of vitamin C such as a few drops of orange juice.\u201d" },
                { id: "c", text: "\u201cAlways give the iron with an antacid to protect the stomach.\u201d" },
                { id: "d", text: "\u201cStop the iron as soon as the baby\u2019s color improves.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Give iron between meals on a relatively empty stomach for best absorption, paired with a vitamin C source to enhance uptake. Avoid milk, dairy, and antacids, which inhibit absorption. Continue iron for 2\u20133 months after Hgb normalizes to replenish stores.",
                a: "Milk reduces absorption.",
                c: "Antacids reduce absorption.",
                d: "Stopping too early leads to relapse."
            },
            testTakingTip: "Between meals + vitamin C = best absorption.",
            guideSection: "Section 4 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A child with iron-deficiency anemia has been taking prescribed ferrous sulfate for 4 weeks. Which finding indicates a THERAPEUTIC response?",
            options: [
                { id: "a", text: "Hemoglobin has not changed from baseline" },
                { id: "b", text: "Reticulocyte count has risen and hemoglobin is 1.2 g/dL above baseline" },
                { id: "c", text: "Ferritin remains undetectable" },
                { id: "d", text: "MCV is decreasing further" }
            ],
            correct: "b",
            rationale: {
                correct: "A good response to iron therapy is a rise in reticulocytes within 3\u20137 days and a hemoglobin increase of >1 g/dL by 2\u20134 weeks. Ferritin should rise with continued therapy. MCV and MCH rise back toward normal.",
                a: "No change = inadequate response or adherence issue.",
                c: "Persistent undetectable ferritin suggests inadequate therapy.",
                d: "Decreasing MCV = worsening."
            },
            testTakingTip: "Retic count up + Hgb rising = good response.",
            guideSection: "Section 4 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent asks why their child with iron-deficiency anemia also needs a blood lead level. The BEST explanation is:",
            options: [
                { id: "a", text: "\u201cLead levels always drop with iron.\u201d" },
                { id: "b", text: "\u201cChildren with iron deficiency often develop pica, which raises the risk of eating paint or dust and having lead poisoning.\u201d" },
                { id: "c", text: "\u201cLead poisoning causes high hemoglobin.\u201d" },
                { id: "d", text: "\u201cThe iron supplement contains trace lead.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Children with iron deficiency commonly develop pica, which increases the risk of ingesting lead from paint chips, dust, or contaminated dirt (especially in housing built before 1978). IDA and lead poisoning also potentiate each other. Screen blood lead level when pica is present.",
                a: "Iron doesn\u2019t clear lead.",
                c: "Lead causes anemia (low Hgb), not high.",
                d: "Iron supplements don\u2019t contain lead."
            },
            testTakingTip: "Pica + IDA = check blood lead level.",
            guideSection: "Section 2 \u2014 Clinical Manifestations",
            guideSectionId: "clinical"
        }
    ]
};
