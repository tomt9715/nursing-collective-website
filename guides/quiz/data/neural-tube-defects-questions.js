/**
 * Neural Tube Defects Quiz — Question Data
 * NCLEX-style questions covering NTD types, prevention,
 * pre/post-op care, latex precautions, and long-term management.
 */

/* exported neuralTubeDefectsQuizData */
var neuralTubeDefectsQuizData = {
    guideName: "Neural Tube Defects",
    guideSlug: "neural-tube-defects",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which daily folic acid intake is recommended for all women of childbearing age to prevent neural tube defects?",
            options: [
                { id: "a", text: "100 mcg" },
                { id: "b", text: "400 mcg" },
                { id: "c", text: "1 mg" },
                { id: "d", text: "4 mg" }
            ],
            correct: "b",
            rationale: {
                correct: "The standard recommendation is 400 mcg of folic acid daily for all women of childbearing age, ideally started before conception. This has been shown to reduce NTD risk by up to 70%.",
                a: "100 mcg is too low to be protective.",
                c: "1 mg is between standard and high-risk; not the baseline recommendation.",
                d: "4 mg/day is the HIGH-RISK dose \u2014 for women with a prior NTD pregnancy, not baseline prevention."
            },
            testTakingTip: "400 mcg = standard prevention. 4 mg = high-risk (prior NTD pregnancy, certain anticonvulsants).",
            guideSection: "Section 1 \u2014 Overview & Types",
            guideSectionId: "overview"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A pregnant woman with a previous pregnancy affected by spina bifida asks what dose of folic acid she should take. What is the nurse's best response?",
            options: [
                { id: "a", text: "'The standard 400 mcg is fine.'" },
                { id: "b", text: "'You should take 4 mg daily starting 1 month before conception.'" },
                { id: "c", text: "'Folic acid is no longer recommended for women who have had NTD pregnancies.'" },
                { id: "d", text: "'Take 4 mg daily but only after the pregnancy is confirmed.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Women with a prior NTD pregnancy are recommended to take 4 mg folic acid daily, starting at least 1 month before conception and continuing through the first trimester. Higher dose is needed given the elevated recurrence risk.",
                a: "400 mcg is baseline; this woman needs a higher dose.",
                c: "Folic acid is MORE important, not less, for high-risk women.",
                d: "Starting after pregnancy is confirmed is too late \u2014 the neural tube closes by day 28."
            },
            testTakingTip: "High-risk women (prior NTD, anticonvulsants) = 4 mg daily, starting before conception.",
            guideSection: "Section 1 \u2014 Overview & Types",
            guideSectionId: "overview"
        },
        {
            id: 3,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A newborn with myelomeningocele has been admitted. What is the nurse's priority positioning action?",
            options: [
                { id: "a", text: "Supine with head elevated" },
                { id: "b", text: "Prone or side-lying with support" },
                { id: "c", text: "Semi-Fowler's with lateral tilt" },
                { id: "d", text: "Trendelenburg position" }
            ],
            correct: "b",
            rationale: {
                correct: "Prone or side-lying positioning protects the sac from pressure or rupture. Supine positioning can put weight on the sac and damage neural tissue, leak CSF, or introduce infection.",
                a: "Supine is CONTRAINDICATED in myelomeningocele \u2014 would put pressure on the sac.",
                c: "Semi-Fowler's still involves some weight on the back.",
                d: "Trendelenburg increases intracranial pressure and is inappropriate."
            },
            testTakingTip: "Prone or side-lying for myelomeningocele. Never supine. Classic NCLEX.",
            guideSection: "Section 3 \u2014 Pre/Post-Op Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A newborn with myelomeningocele arrives in the NICU. The sac is intact, and there is a nurse preparing to care for the baby. Which action is MOST important?",
            options: [
                { id: "a", text: "Apply a dry gauze dressing to the sac to protect it" },
                { id: "b", text: "Cover the sac with a sterile saline-moistened dressing" },
                { id: "c", text: "Apply topical antibiotic ointment directly on the sac" },
                { id: "d", text: "Leave the sac uncovered so air can reach it" }
            ],
            correct: "b",
            rationale: {
                correct: "The sac must be kept moist with a sterile saline-moistened dressing to prevent drying, rupture, and damage to exposed neural tissue. Dry dressings adhere and can tear the sac when changed; uncovered sacs dry out and rupture.",
                a: "Dry dressing allows drying and can adhere, damaging the sac.",
                c: "Antibiotic ointment directly on neural tissue is not standard; sterile saline is the standard.",
                d: "Uncovered sacs dry quickly \u2014 never leave exposed."
            },
            testTakingTip: "Sac protection: moist + sterile + non-adherent. Sterile saline-soaked gauze is the go-to.",
            guideSection: "Section 3 \u2014 Pre/Post-Op Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which of the following is the MOST severe type of spina bifida?",
            options: [
                { id: "a", text: "Spina bifida occulta" },
                { id: "b", text: "Meningocele" },
                { id: "c", text: "Myelomeningocele" },
                { id: "d", text: "Encephalocele" }
            ],
            correct: "c",
            rationale: {
                correct: "Myelomeningocele is the most severe form of spina bifida \u2014 the sac contains both meninges AND spinal cord / nerve roots, resulting in flaccid paralysis, neurogenic bowel/bladder, and typically hydrocephalus.",
                a: "Occulta is the mildest \u2014 vertebral defect only, often asymptomatic.",
                b: "Meningocele is intermediate \u2014 meninges in the sac but no neural tissue.",
                d: "Encephalocele is a cranial NTD, not a form of spina bifida."
            },
            testTakingTip: "Severity ladder: occulta \u2192 meningocele \u2192 myelomeningocele (worst). Memorize.",
            guideSection: "Section 1 \u2014 Overview & Types",
            guideSectionId: "overview"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is assessing a 2-week-old post myelomeningocele repair. Which finding suggests developing hydrocephalus?",
            options: [
                { id: "a", text: "Decreased head circumference" },
                { id: "b", text: "Rapidly increasing head circumference and bulging fontanelle" },
                { id: "c", text: "Flat fontanelle with crying" },
                { id: "d", text: "Pink skin color" }
            ],
            correct: "b",
            rationale: {
                correct: "Rapidly increasing head circumference paired with a bulging fontanelle indicates increased ICP from hydrocephalus. Sunset eyes, poor feeding, lethargy, and high-pitched cry are other early signs. 80\u201390% of myelomeningocele infants develop hydrocephalus.",
                a: "Decreased head size is not typical.",
                c: "A flat fontanelle is normal.",
                d: "Pink skin is a healthy finding, not a hydrocephalus sign."
            },
            testTakingTip: "Head circumference daily for myelomeningocele infants. Bulging fontanelle + rapid growth = ICP up = shunt needed.",
            guideSection: "Section 2 \u2014 Myelomeningocele",
            guideSectionId: "myelomeningocele"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which condition is associated with myelomeningocele and typically requires a ventriculoperitoneal shunt?",
            options: [
                { id: "a", text: "Brachial plexus injury" },
                { id: "b", text: "Arnold-Chiari II malformation with hydrocephalus" },
                { id: "c", text: "Spinal muscular atrophy" },
                { id: "d", text: "Tracheoesophageal fistula" }
            ],
            correct: "b",
            rationale: {
                correct: "Arnold-Chiari II malformation (cerebellar herniation through foramen magnum) is almost universal in myelomeningocele and causes hydrocephalus by blocking CSF flow. 80\u201390% of patients require a VP shunt.",
                a: "Brachial plexus injury is unrelated.",
                c: "SMA is a separate neuromuscular disease.",
                d: "TEF is unrelated."
            },
            testTakingTip: "Myelomeningocele + Chiari II + hydrocephalus + VP shunt = the core pathophysiologic chain.",
            guideSection: "Section 2 \u2014 Myelomeningocele",
            guideSectionId: "myelomeningocele"
        },
        {
            id: 8,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 4-year-old with myelomeningocele is scheduled for shunt revision. The nurse is preparing the OR. Which intervention is MOST important?",
            options: [
                { id: "a", text: "Ensure latex-free gloves, catheters, and equipment are used" },
                { id: "b", text: "Use regular surgical equipment" },
                { id: "c", text: "Keep the child NPO for 4 hours" },
                { id: "d", text: "Start IV fluids with lactated Ringer's" }
            ],
            correct: "a",
            rationale: {
                correct: "Children with myelomeningocele have a very high rate of latex allergy (up to 40\u201365%) from repeated mucosal exposure. All equipment in the OR and clinical setting MUST be latex-free to prevent life-threatening anaphylaxis.",
                a: "Correct and the top priority.",
                b: "This is the error \u2014 latex-containing equipment can trigger anaphylaxis.",
                c: "NPO status is standard for surgery; not the unique priority.",
                d: "IV fluids are standard; not the unique priority here."
            },
            testTakingTip: "Myelomeningocele + surgery = assume latex allergy. Latex-free environment always.",
            guideSection: "Section 5 \u2014 Latex Safety",
            guideSectionId: "latex"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a child with myelomeningocele asks about managing the child's bladder. What is the most common long-term approach?",
            options: [
                { id: "a", text: "Waiting until the bladder fills and overflows spontaneously" },
                { id: "b", text: "Clean intermittent catheterization every 3\u20134 hours" },
                { id: "c", text: "Chronic use of indwelling Foley catheter" },
                { id: "d", text: "Surgical creation of a urostomy in infancy" }
            ],
            correct: "b",
            rationale: {
                correct: "Clean intermittent catheterization (CIC) every 3\u20134 hours is the standard for managing the neurogenic bladder in myelomeningocele. It preserves renal function, maintains continence, and reduces UTI risk. Parents learn first, then the child takes over as they grow.",
                a: "Allowing overflow damages the upper urinary tract.",
                c: "Indwelling Foley increases infection risk; CIC is preferred.",
                d: "Urostomy is reserved for specific refractory cases, not first-line."
            },
            testTakingTip: "CIC every 3\u20134 hours = standard bladder management in myelomeningocele. Teach parents early.",
            guideSection: "Section 4 \u2014 Long-Term Complications",
            guideSectionId: "complications"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which prenatal screening test typically detects neural tube defects when elevated?",
            options: [
                { id: "a", text: "Maternal serum alpha-fetoprotein (MSAFP)" },
                { id: "b", text: "Glucose challenge test" },
                { id: "c", text: "Group B strep swab" },
                { id: "d", text: "Rh antibody screen" }
            ],
            correct: "a",
            rationale: {
                correct: "Elevated MSAFP at 15\u201320 weeks gestation is a classic marker for open neural tube defects. It is combined with targeted fetal ultrasound to confirm. Closed NTDs (like spina bifida occulta) may not elevate AFP.",
                a: "Correct.",
                b: "GCT screens for gestational diabetes.",
                c: "GBS swab screens for neonatal sepsis risk.",
                d: "Rh screen identifies isoimmunization risk."
            },
            testTakingTip: "Elevated MSAFP = think NTD (or multiple gestation, abdominal wall defects). Low MSAFP = think trisomies.",
            guideSection: "Section 1 \u2014 Overview & Types",
            guideSectionId: "overview"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 6-year-old with myelomeningocele and a VP shunt presents to the ED with headache, vomiting, and new-onset lethargy. What is the nurse's priority concern?",
            options: [
                { id: "a", text: "Typical viral illness" },
                { id: "b", text: "Constipation" },
                { id: "c", text: "Shunt malfunction or infection" },
                { id: "d", text: "Migraine" }
            ],
            correct: "c",
            rationale: {
                correct: "Headache, vomiting, and lethargy in a child with a VP shunt suggest shunt malfunction \u2014 the shunt is blocked, disconnected, or infected, allowing ICP to rise. This is an emergency; untreated, it can lead to herniation. Fever would also raise concern for shunt infection.",
                a: "Shunt malfunction must be ruled out first; don't assume benign.",
                b: "Constipation doesn't cause this triad.",
                d: "Migraine doesn't typically cause lethargy with vomiting in a child with a shunt."
            },
            testTakingTip: "Child with VP shunt + headache/vomiting/lethargy = shunt malfunction until proven otherwise. Emergency.",
            guideSection: "Section 4 \u2014 Long-Term Complications",
            guideSectionId: "complications"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is teaching parents about latex precautions for a child with myelomeningocele. Which of the following foods should be introduced with caution due to cross-reactivity with latex?",
            options: [
                { id: "a", text: "Apple, pear, grape" },
                { id: "b", text: "Banana, avocado, kiwi" },
                { id: "c", text: "Rice, wheat, oats" },
                { id: "d", text: "Chicken, beef, fish" }
            ],
            correct: "b",
            rationale: {
                correct: "Banana, avocado, kiwi, chestnut, tomato, and papaya contain proteins similar to latex and commonly cross-react. Teach parents to introduce these foods carefully and watch for allergic reactions (hives, swelling, anaphylaxis).",
                a: "These fruits are not typically latex-cross-reactive.",
                c: "Grains are not latex-cross-reactive.",
                d: "Meats are not latex-cross-reactive."
            },
            testTakingTip: "Latex cross-reactive foods: BANANA, AVOCADO, KIWI, chestnut, tomato. Memorize the first 3 \u2014 most tested.",
            guideSection: "Section 5 \u2014 Latex Safety",
            guideSectionId: "latex"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "What is the typical recommended surgical timing for repair of a myelomeningocele sac after birth?",
            options: [
                { id: "a", text: "Within 6 hours" },
                { id: "b", text: "Within 24\u201372 hours" },
                { id: "c", text: "After 1 month to allow healing" },
                { id: "d", text: "After 1 year when infant is stronger" }
            ],
            correct: "b",
            rationale: {
                correct: "Closure within 24\u201372 hours of birth reduces the risk of infection (meningitis) and further neurologic damage from mechanical injury to the exposed cord. Fetal surgery is an alternative in select patients.",
                a: "6 hours is typical for testicular torsion, not NTD closure.",
                c: "Waiting a month risks infection and damage.",
                d: "Too late; damage accumulates."
            },
            testTakingTip: "Myelomeningocele closure: 24\u201372 hours. Don't confuse with torsion's 6-hour window.",
            guideSection: "Section 3 \u2014 Pre/Post-Op Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is examining a newborn and notes a small dimple with a tuft of hair over the lower lumbar spine. The infant has no other visible defects and neurologic exam is normal. What is the most likely diagnosis?",
            options: [
                { id: "a", text: "Meningocele" },
                { id: "b", text: "Myelomeningocele" },
                { id: "c", text: "Spina bifida occulta" },
                { id: "d", text: "Encephalocele" }
            ],
            correct: "c",
            rationale: {
                correct: "A small dimple, tuft of hair, lipoma, or port-wine stain over the lower spine in an otherwise normal infant suggests spina bifida occulta \u2014 a hidden vertebral defect without a sac. Most are asymptomatic, though a minority develop tethered cord symptoms later. MRI may be indicated.",
                a: "Meningocele has a visible sac.",
                b: "Myelomeningocele has a visible sac plus neurologic deficits.",
                d: "Encephalocele is on the cranium, not the lumbar spine."
            },
            testTakingTip: "Hair tuft, dimple, port-wine mark over spine = think occulta. No sac, often asymptomatic.",
            guideSection: "Section 1 \u2014 Overview & Types",
            guideSectionId: "overview"
        }
    ]
};
