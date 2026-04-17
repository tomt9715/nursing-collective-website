/**
 * Cleft Lip & Palate Quiz — Question Data
 * NCLEX-style questions covering feeding, surgical staging,
 * post-op positioning, and long-term multi-disciplinary care.
 */

/* exported cleftLipPalateQuizData */
var cleftLipPalateQuizData = {
    guideName: "Cleft Lip & Palate",
    guideSlug: "cleft-lip-palate",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 10,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "At what point in embryonic development does the cleft palate form if the fusion process fails?",
            options: [
                { id: "a", text: "Weeks 2\u20133 gestation" },
                { id: "b", text: "Weeks 5\u20136 gestation" },
                { id: "c", text: "Weeks 7\u201312 gestation" },
                { id: "d", text: "Weeks 20\u201324 gestation" }
            ],
            correct: "c",
            rationale: {
                correct: "Cleft palate forms when the lateral palatal shelves fail to fuse at 7\u201312 weeks gestation. Cleft LIP forms earlier (5\u20136 weeks). These are independent processes, which is why a baby can have CL, CP, or both.",
                a: "Far too early; embryo is still forming basic structures.",
                b: "This is cleft LIP formation window, not palate.",
                d: "This is well past the palatal fusion window."
            },
            testTakingTip: "Lip = 5\u20136 weeks. Palate = 7\u201312 weeks. Two independent processes.",
            guideSection: "Section 1 \u2014 Overview & Types",
            guideSectionId: "overview"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A newborn with cleft lip and palate is having difficulty feeding. What is the nurse's priority intervention?",
            options: [
                { id: "a", text: "Schedule surgical consult for immediate repair" },
                { id: "b", text: "Use a specialized feeding device (Haberman or Pigeon bottle) with upright positioning" },
                { id: "c", text: "Switch the infant to a gastrostomy tube for all feeds" },
                { id: "d", text: "Allow the infant to skip feeds until surgery" }
            ],
            correct: "b",
            rationale: {
                correct: "Specialized feeding devices compensate for the infant's inability to create suction with an open palate. Combined with upright positioning, frequent burping, and the ESSR technique, most cleft infants can feed successfully. Nutrition and weight gain are prerequisites for surgical repair.",
                a: "Surgery is elective and delayed until the infant meets the Rule of 10s (typically 2\u20133 months).",
                c: "GT placement is only considered after other feeding methods have failed; most cleft infants do well with specialty bottles.",
                d: "Skipping feeds causes dehydration and failure to thrive, delaying surgery indefinitely."
            },
            testTakingTip: "For cleft babies, feeding is the first priority \u2014 weight gain IS the path to surgery.",
            guideSection: "Section 2 \u2014 Feeding",
            guideSectionId: "feeding"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching a parent to feed a newborn with cleft palate. Which instruction is MOST important?",
            options: [
                { id: "a", text: "Feed in a flat position to prevent choking" },
                { id: "b", text: "Feed upright at 45\u201360 degrees with frequent burping" },
                { id: "c", text: "Limit feeds to 10 minutes to prevent fatigue" },
                { id: "d", text: "Thicken all feeds with rice cereal from day one" }
            ],
            correct: "b",
            rationale: {
                correct: "Upright positioning at 45\u201360 degrees reduces nasal regurgitation and aspiration risk. Cleft babies swallow a lot of air, so frequent burping (every \u00bd to 1 oz) prevents colic and improves intake. Feeds typically take 30\u201345 minutes, not 10.",
                a: "Flat position increases aspiration and nasal regurgitation risk.",
                c: "10 minutes is too short; cleft babies need 30\u201345 minutes to consume adequate volume.",
                d: "Thickening feeds without medical indication is not standard; focus on specialty nipples and technique instead."
            },
            testTakingTip: "Upright + small frequent + burp often. The three pillars of cleft feeding.",
            guideSection: "Section 2 \u2014 Feeding",
            guideSectionId: "feeding"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "According to the 'Rule of 10s,' which infant is most ready for cleft lip repair?",
            options: [
                { id: "a", text: "A 4-week-old weighing 8 lb with Hgb 12" },
                { id: "b", text: "A 6-week-old weighing 9 lb with Hgb 10" },
                { id: "c", text: "A 10-week-old weighing 11 lb with Hgb 11" },
                { id: "d", text: "A 14-week-old weighing 13 lb with Hgb 9" }
            ],
            correct: "c",
            rationale: {
                correct: "Rule of 10s = 10 weeks old + 10 lb (5 kg) + Hgb \u2265 10 g/dL. This infant meets all three criteria and is ready for cleft lip repair.",
                a: "Only 4 weeks old and 8 lb \u2014 fails the age and weight criteria.",
                b: "9 lb fails the weight criterion.",
                d: "Hgb of 9 fails the hemoglobin criterion; infant would need iron supplementation before surgery."
            },
            testTakingTip: "Rule of 10s: 10 weeks, 10 lb, Hgb 10. All three must be met.",
            guideSection: "Section 3 \u2014 Surgical Repair",
            guideSectionId: "surgery"
        },
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 3-month-old returns from cleft lip repair. In which position should the nurse place the infant?",
            options: [
                { id: "a", text: "Prone with the face turned to one side" },
                { id: "b", text: "Supine or side-lying" },
                { id: "c", text: "Trendelenburg" },
                { id: "d", text: "High Fowler's on the abdomen" }
            ],
            correct: "b",
            rationale: {
                correct: "After cleft LIP repair, the infant should be placed supine or side-lying \u2014 NEVER prone. Prone positioning could cause the face to rub against the sheets and disrupt the lip suture line.",
                a: "Prone is contraindicated for cleft lip repair.",
                c: "Trendelenburg is not indicated and is uncomfortable.",
                d: "Prone positioning is the contraindication."
            },
            testTakingTip: "Cleft LIP = SUPINE. Cleft PALATE = PRONE. Opposite positions for opposite surgeries.",
            guideSection: "Section 4 \u2014 Post-Op Care",
            guideSectionId: "post-op"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 12-month-old returns from cleft palate repair. In which position should the nurse place the infant?",
            options: [
                { id: "a", text: "Supine with head slightly elevated" },
                { id: "b", text: "Prone or side-lying" },
                { id: "c", text: "High Fowler's in an infant seat" },
                { id: "d", text: "Reverse Trendelenburg" }
            ],
            correct: "b",
            rationale: {
                correct: "After cleft PALATE repair, prone or side-lying position allows drainage of blood/saliva and prevents the tongue from obstructing the airway (post-op swelling is a real risk). This is OPPOSITE of post-lip positioning.",
                a: "Supine can allow blood or saliva to pool and increases airway obstruction risk.",
                c: "High Fowler's in an infant seat is not ideal for drainage.",
                d: "Reverse Trendelenburg is not standard for this repair."
            },
            testTakingTip: "Palate repair = prone or side-lying. The airway is the priority; drainage must occur.",
            guideSection: "Section 4 \u2014 Post-Op Care",
            guideSectionId: "post-op"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A toddler is 1 day post cleft palate repair. Which item should the nurse REMOVE from the bedside?",
            options: [
                { id: "a", text: "Sippy cup with soft spout" },
                { id: "b", text: "Metal spoon with hard edge" },
                { id: "c", text: "Soft stuffed animal" },
                { id: "d", text: "Cup of water" }
            ],
            correct: "b",
            rationale: {
                correct: "After cleft palate repair, NO hard objects can enter the mouth \u2014 this includes spoons (especially metal), straws, pacifiers, tongue depressors, and hard toys. Hard objects can disrupt the palatal suture line.",
                a: "A soft sippy cup spout is generally allowed; cup drinking with the side (not tip) of a spoon is often acceptable.",
                c: "A stuffed animal is fine for comfort; cleft infants aren't likely to put it in their mouth past their elbow restraints.",
                d: "Cup drinking (soft liquids) is expected after cleft palate repair."
            },
            testTakingTip: "Post-palate repair: no hard objects in the mouth. Straws, metal spoons, pacifiers, toothbrushes all off limits.",
            guideSection: "Section 4 \u2014 Post-Op Care",
            guideSectionId: "post-op"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a 3-month-old post cleft lip repair asks about the elbow restraints (no-no's) that the infant has been wearing. Which statement by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "'The restraints should stay on continuously for 2 months.'" },
                { id: "b", text: "'You can remove them for supervised cuddling and play, but re-apply afterward.'" },
                { id: "c", text: "'They are only needed while the infant is sleeping.'" },
                { id: "d", text: "'Restraints are not used anymore after cleft surgery.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Elbow restraints (no-no's) prevent the infant from touching the suture line. They are typically worn for 10\u201314 days and CAN be removed for supervised activities like feeding, cuddling, and play. Parents should be comfortable applying and removing them.",
                a: "2 months continuous is too long; 10\u201314 days of mostly-continuous use is standard.",
                c: "Restraints are used awake and asleep because infants can inadvertently touch the site at any time.",
                d: "Restraints ARE standard care after cleft surgery \u2014 current practice."
            },
            testTakingTip: "Elbow restraints = remove for supervised activities, re-apply otherwise. 10\u201314 days post-op.",
            guideSection: "Section 4 \u2014 Post-Op Care",
            guideSectionId: "post-op"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which complication is most strongly associated with cleft palate?",
            options: [
                { id: "a", text: "Asthma" },
                { id: "b", text: "Chronic otitis media with conductive hearing loss" },
                { id: "c", text: "Type 1 diabetes" },
                { id: "d", text: "Celiac disease" }
            ],
            correct: "b",
            rationale: {
                correct: "The abnormal palatal muscles disrupt Eustachian tube function, leading to recurrent middle ear fluid buildup. Most children with cleft palate require tympanostomy tubes at some point. Chronic OM causes conductive hearing loss that can delay speech and language.",
                a: "Asthma is unrelated to cleft palate.",
                c: "T1DM is unrelated.",
                d: "Celiac is unrelated."
            },
            testTakingTip: "Cleft palate \u2192 Eustachian tube dysfunction \u2192 otitis media \u2192 hearing loss \u2192 speech delay. Chain reaction worth knowing.",
            guideSection: "Section 5 \u2014 Associated Issues",
            guideSectionId: "associated"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Why is cleft palate typically repaired by 18 months of age?",
            options: [
                { id: "a", text: "To prevent facial deformity" },
                { id: "b", text: "Before speech develops, for normal sound production" },
                { id: "c", text: "To allow the child to begin solid food" },
                { id: "d", text: "To reduce the child's risk of dental caries" }
            ],
            correct: "b",
            rationale: {
                correct: "Speech sounds requiring palatal closure (p, b, t, d, k, g) begin to develop around 12\u201318 months. Closing the palate before speech development allows normal sound production. Delayed repair risks persistent hypernasal speech even after surgery.",
                a: "Facial deformity is not the primary concern with palate repair (cleft lip repair addresses appearance).",
                c: "Solid food can be introduced before palate repair.",
                d: "Dental caries risk is real but not the reason for the timing window."
            },
            testTakingTip: "Palate repair timed to beat speech development. ~9\u201318 months is the sweet spot.",
            guideSection: "Section 3 \u2014 Surgical Repair",
            guideSectionId: "surgery"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A parent expresses guilt that she caused the cleft palate by 'not taking enough vitamins.' The nurse's best response is:",
            options: [
                { id: "a", text: "'Folic acid deficiency does cause cleft palate, so try to do better with your next child.'" },
                { id: "b", text: "'Cleft palate has many causes, and it's not something you did. Let me share some support resources.'" },
                { id: "c", text: "'You shouldn't blame yourself. Forget about it.'" },
                { id: "d", text: "'There's really no way to know; let's focus on feeding.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Cleft palate is multifactorial \u2014 genetic predisposition combined with environmental factors. Maternal guilt is common and should be addressed directly but compassionately. Validate the feeling, correct the misconception, and offer support resources.",
                a: "This response is shaming and factually incomplete.",
                c: "Dismissing the parent's feelings is not therapeutic.",
                d: "Deflecting the question avoids the emotional concern."
            },
            testTakingTip: "Validate \u2192 correct misconception \u2192 offer resources. Maternal guilt is a common counseling moment.",
            guideSection: "Section 6 \u2014 Family Education & Support",
            guideSectionId: "family-education"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Around what age is the alveolar bone graft typically performed for children with cleft lip and palate?",
            options: [
                { id: "a", text: "Between 2 and 4 months of age" },
                { id: "b", text: "Around 9\u201318 months of age" },
                { id: "c", text: "Between 7 and 10 years of age" },
                { id: "d", text: "After 18 years of age" }
            ],
            correct: "c",
            rationale: {
                correct: "Alveolar bone graft (usually autologous bone from the iliac crest) is performed between ages 7\u201310, timed with the eruption of the permanent canines and incisors, so these teeth erupt into solid bone rather than the cleft gap.",
                a: "This is cleft lip repair timing, not bone graft.",
                b: "This is cleft palate repair timing, not bone graft.",
                d: "Adult bone grafting is rare and reserved for delayed cases or revisions."
            },
            testTakingTip: "Timeline for cleft care: Lip 2\u20133 mo. Palate 9\u201318 mo. Alveolar bone graft 7\u201310 yr. Later revisions through adolescence.",
            guideSection: "Section 5 \u2014 Associated Issues",
            guideSectionId: "associated"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is cleaning the suture line of a post-op cleft lip repair infant. Which cleaning solution is most appropriate?",
            options: [
                { id: "a", text: "Hydrogen peroxide" },
                { id: "b", text: "Sterile water or saline" },
                { id: "c", text: "Alcohol swab" },
                { id: "d", text: "Commercial mouthwash" }
            ],
            correct: "b",
            rationale: {
                correct: "The suture line after cleft lip repair should be cleaned gently with sterile water or saline, then antibiotic ointment may be applied per order. Harsher agents damage new tissue.",
                a: "Hydrogen peroxide damages healing tissue.",
                c: "Alcohol is caustic and painful on sutures.",
                d: "Commercial mouthwash is not intended for surgical wounds and can damage tissue."
            },
            testTakingTip: "Suture line cleaning: sterile water or saline. Gentle, non-irritating.",
            guideSection: "Section 4 \u2014 Post-Op Care",
            guideSectionId: "post-op"
        }
    ]
};
