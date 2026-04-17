/**
 * UTI, VUR & Enuresis Quiz — Question Data
 * NCLEX-style questions covering pediatric UTI presentation,
 * VCUG/VUR, and enuresis management.
 */

/* exported utiVurEnuresisQuizData */
var utiVurEnuresisQuizData = {
    guideName: "UTI, VUR & Enuresis",
    guideSlug: "uti-vur-enuresis",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 10-month-old is brought to the clinic with a 3-day fever of 39.2\u00b0C, irritability, and decreased appetite. Physical exam is otherwise unremarkable \u2014 no URI, no ear findings, no rash. What is the nurse's priority action?",
            options: [
                { id: "a", text: "Reassure the parent and send home with acetaminophen" },
                { id: "b", text: "Obtain a urine sample for urinalysis and culture" },
                { id: "c", text: "Start empiric antibiotics before any testing" },
                { id: "d", text: "Order a chest X-ray to rule out pneumonia" }
            ],
            correct: "b",
            rationale: {
                correct: "A febrile infant under 24 months without an obvious source requires a UA and urine culture. UTI is the most common serious bacterial infection in this age group, and missed UTIs progress to pyelonephritis and renal scarring. Infants typically show only fever \u2014 no dysuria, no frequency.",
                a: "Sending home without evaluation risks missing a UTI.",
                c: "Empiric antibiotics without cultures eliminates diagnostic yield.",
                d: "Chest X-ray would be ordered only if respiratory symptoms present."
            },
            testTakingTip: "Febrile infant w/o source = UA + culture. Don't skip the workup.",
            guideSection: "Section 1 \u2014 Pediatric UTI",
            guideSectionId: "uti"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which organism causes approximately 80% of pediatric UTIs?",
            options: [
                { id: "a", text: "Staphylococcus aureus" },
                { id: "b", text: "Pseudomonas aeruginosa" },
                { id: "c", text: "Escherichia coli" },
                { id: "d", text: "Streptococcus pyogenes" }
            ],
            correct: "c",
            rationale: {
                correct: "E. coli is the predominant cause of pediatric UTI, accounting for ~80% of cases. It originates from the bowel flora and ascends the urethra, especially in girls.",
                a: "Staph aureus UTIs are rare and usually associated with hematogenous spread or structural abnormalities.",
                b: "Pseudomonas is common in hospitalized, catheterized, or immunocompromised patients \u2014 not community-acquired UTIs.",
                d: "Strep pyogenes causes pharyngitis and skin infections \u2014 not typical for UTI."
            },
            testTakingTip: "E. coli = first line of thinking for community-acquired pediatric UTI.",
            guideSection: "Section 1 \u2014 Pediatric UTI",
            guideSectionId: "uti"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 6-month-old infant with suspected UTI needs a urine culture. Which method is most appropriate for obtaining the specimen?",
            options: [
                { id: "a", text: "Adhesive bag specimen" },
                { id: "b", text: "Urethral catheterization (in-and-out cath)" },
                { id: "c", text: "Clean catch midstream" },
                { id: "d", text: "Collect from a wet diaper" }
            ],
            correct: "b",
            rationale: {
                correct: "In-and-out catheterization produces a sterile sample suitable for culture in non-toilet-trained infants. A growth of >50,000 CFU from a cath specimen is diagnostic.",
                a: "Bag specimens are highly contaminated and NEVER appropriate for culture \u2014 only for screening.",
                c: "Clean catch is not feasible in a non-toilet-trained 6-month-old.",
                d: "Diaper collections are contaminated and unsuitable for culture."
            },
            testTakingTip: "Infant urine culture = catheterization or suprapubic aspiration. Bag is never acceptable.",
            guideSection: "Section 4 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 3-year-old girl has had 3 febrile UTIs in the past year. What diagnostic test is most appropriate to evaluate for structural cause?",
            options: [
                { id: "a", text: "CT abdomen with contrast" },
                { id: "b", text: "Voiding cystourethrogram (VCUG)" },
                { id: "c", text: "Renal biopsy" },
                { id: "d", text: "DMSA scan only" }
            ],
            correct: "b",
            rationale: {
                correct: "VCUG is the gold standard for diagnosing and grading vesicoureteral reflux (VUR), a common cause of recurrent febrile UTIs. Recurrent UTIs in a young child warrant this imaging to guide management (including possible prophylaxis or surgery).",
                a: "CT involves radiation and is not first-line for VUR evaluation.",
                c: "Renal biopsy evaluates glomerular/parenchymal disease \u2014 not reflux.",
                d: "DMSA detects scarring but doesn't diagnose reflux itself."
            },
            testTakingTip: "VCUG = gold standard for VUR. Renal ultrasound first for structure, then VCUG for function.",
            guideSection: "Section 2 \u2014 VUR",
            guideSectionId: "vur"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A child is diagnosed with Grade IV vesicoureteral reflux. Which management approach is most likely?",
            options: [
                { id: "a", text: "No intervention; wait for spontaneous resolution" },
                { id: "b", text: "Surgical correction (ureteral reimplantation or endoscopic injection)" },
                { id: "c", text: "Renal transplant evaluation" },
                { id: "d", text: "Long-term hemodialysis" }
            ],
            correct: "b",
            rationale: {
                correct: "Grade IV and V VUR rarely resolve spontaneously because of significant anatomic dilation. Surgical correction via ureteral reimplantation or endoscopic injection (Deflux) is typically required to prevent ongoing pyelonephritis and renal scarring.",
                a: "Spontaneous resolution applies mostly to grades I\u2013III.",
                c: "Transplant is not indicated for VUR alone without end-stage disease.",
                d: "Dialysis is not indicated unless end-stage renal failure develops."
            },
            testTakingTip: "VUR grades I\u2013III usually resolve; IV\u2013V usually need surgery.",
            guideSection: "Section 2 \u2014 VUR",
            guideSectionId: "vur"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old with VUR is undergoing a VCUG. What should the nurse include in preparation?",
            options: [
                { id: "a", text: "Explain that the test is painful and will take several hours" },
                { id: "b", text: "Maintain NPO for 8 hours prior" },
                { id: "c", text: "Explain the test at an age-appropriate level, provide comfort measures and child life support" },
                { id: "d", text: "Sedate the child routinely for the procedure" }
            ],
            correct: "c",
            rationale: {
                correct: "VCUG is typically an awake procedure. Age-appropriate explanation (catheter goes into bladder, contrast fills it, X-ray watches during voiding), child life services, comfort positioning, and parent presence minimize distress. Distraction tools can reduce anxiety.",
                a: "While uncomfortable, the procedure is relatively brief; catastrophizing it adds distress.",
                b: "NPO is not routinely required for VCUG.",
                d: "Sedation is not routine but may be used for very anxious children or repeat studies."
            },
            testTakingTip: "VCUG is awake, uncomfortable but brief. Age-appropriate teaching + child life support is standard nursing care.",
            guideSection: "Section 6 \u2014 Nursing Care",
            guideSectionId: "nursing"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Enuresis in a child is considered pathologic starting at approximately what age?",
            options: [
                { id: "a", text: "2 years" },
                { id: "b", text: "3 years" },
                { id: "c", text: "5 years" },
                { id: "d", text: "12 years" }
            ],
            correct: "c",
            rationale: {
                correct: "Age 5 is the conventional cutoff when enuresis is considered pathologic. Most children achieve nighttime continence between 3 and 5. By 7 years, ~10% of children still have nocturnal enuresis, and most cases resolve by age 10.",
                a: "At 2, most children are not yet toilet-trained.",
                b: "At 3, daytime training is typical but nighttime dryness often lags.",
                d: "At 12, enuresis is less common but not the initial cutoff for workup."
            },
            testTakingTip: "Age 5 = the clinical enuresis cutoff.",
            guideSection: "Section 3 \u2014 Enuresis",
            guideSectionId: "enuresis"
        },
        {
            id: 8,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 7-year-old who has been dry for 2 years suddenly starts bedwetting 3 nights per week. What should the nurse anticipate first?",
            options: [
                { id: "a", text: "Prescription for desmopressin" },
                { id: "b", text: "A bedwetting alarm" },
                { id: "c", text: "Workup for UTI, diabetes, or other secondary cause" },
                { id: "d", text: "Reassurance and waiting 6 months" }
            ],
            correct: "c",
            rationale: {
                correct: "Secondary enuresis (dry for >6 months, then wetting again) warrants workup for UTI, type 1 diabetes, constipation, stress/abuse, or structural causes. A urine dipstick, history, and physical exam are the starting points.",
                a: "DDAVP is for primary enuresis or short-term use \u2014 not before ruling out secondary causes.",
                b: "Alarm therapy is behavioral \u2014 also for primary enuresis.",
                d: "Waiting can miss a treatable cause like UTI or new-onset diabetes."
            },
            testTakingTip: "Secondary enuresis = workup first. Never assume primary when the child was previously dry.",
            guideSection: "Section 3 \u2014 Enuresis",
            guideSectionId: "enuresis"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "What is the most effective long-term treatment for primary nocturnal enuresis in children?",
            options: [
                { id: "a", text: "Imipramine" },
                { id: "b", text: "Desmopressin (DDAVP)" },
                { id: "c", text: "Bedwetting (enuresis) alarm" },
                { id: "d", text: "Restricting fluids all day" }
            ],
            correct: "c",
            rationale: {
                correct: "Bedwetting alarms condition the child to wake at the onset of voiding. They have the best long-term cure rates for primary nocturnal enuresis but require 2\u20133 months of consistent use and family commitment.",
                a: "Imipramine has cardiac side effects and overdose risk; rarely first-line now.",
                b: "DDAVP is effective short-term (sleepovers, camp) but has high relapse rate when stopped.",
                d: "Total fluid restriction is inappropriate \u2014 only evening fluids should be limited."
            },
            testTakingTip: "First-line behavioral: bedwetting alarm. First-line pharmacologic short-term: DDAVP.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent asks the nurse for advice because their child will use desmopressin for a sleepover. Which instruction is MOST important?",
            options: [
                { id: "a", text: "'Give the medication right before bed with a large glass of water.'" },
                { id: "b", text: "'Limit fluids for 1 hour before and 8 hours after the dose.'" },
                { id: "c", text: "'The medication can be used nightly long-term.'" },
                { id: "d", text: "'Use two doses together if the first doesn't work.'" }
            ],
            correct: "b",
            rationale: {
                correct: "DDAVP is an ADH analog that causes water retention. Excess fluid intake during its action can cause water intoxication, hyponatremia, and seizures. Teaching fluid restriction around the dose is a critical safety instruction.",
                a: "Giving with a large glass of water risks water intoxication.",
                c: "Long-term nightly use is not first-line; alarm therapy is preferred for chronic use.",
                d: "Doubling up risks toxicity; follow the prescribed dose."
            },
            testTakingTip: "DDAVP + unrestricted fluids = hyponatremia, seizures. Always teach fluid limits.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which statement by a parent of a child recently treated for a UTI indicates CORRECT understanding of prevention?",
            options: [
                { id: "a", text: "'I'll give my daughter bubble baths to help her relax.'" },
                { id: "b", text: "'I'll teach her to hold her urine as long as possible to strengthen her bladder.'" },
                { id: "c", text: "'I'll teach her to wipe from front to back after using the toilet.'" },
                { id: "d", text: "'She can stop her antibiotics once she feels better.'" }
            ],
            correct: "c",
            rationale: {
                correct: "Wiping front to back prevents bowel flora (especially E. coli) from reaching the urethra. This is a cornerstone UTI prevention teaching for girls and should be started early.",
                a: "Bubble baths irritate the urethra and increase UTI risk in girls.",
                b: "Holding urine promotes bacterial growth; regular voiding is preventive.",
                d: "Stopping antibiotics early risks incomplete treatment and recurrence."
            },
            testTakingTip: "Front to back, regular voiding, no bubble baths, treat constipation, finish antibiotics.",
            guideSection: "Section 6 \u2014 Nursing Care",
            guideSectionId: "nursing"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 5-year-old is diagnosed with primary nocturnal enuresis. The parents are frustrated and considering punishment. What is the nurse's BEST response?",
            options: [
                { id: "a", text: "'Mild consequences may help motivate her.'" },
                { id: "b", text: "'Most children outgrow this; shaming or punishing can delay resolution. Focus on protecting the bed and praising dry nights.'" },
                { id: "c", text: "'She's old enough to know better; she's doing it on purpose.'" },
                { id: "d", text: "'Limit all fluids throughout the day.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Punishment and shaming are counterproductive for enuresis \u2014 they worsen anxiety and delay resolution. Most children outgrow primary nocturnal enuresis; practical supports (waterproof mattress cover), positive reinforcement for dry nights, and patience are the cornerstones.",
                a: "Consequences do not accelerate bladder maturation.",
                c: "Enuresis is not voluntary; it reflects maturational delay.",
                d: "Total fluid restriction dehydrates the child; only evening fluids need limits."
            },
            testTakingTip: "Never shame or punish for enuresis. Normalize + positive reinforcement + practical supports.",
            guideSection: "Section 3 \u2014 Enuresis",
            guideSectionId: "enuresis"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which finding on urinalysis is MOST specific for a urinary tract infection caused by a gram-negative organism (e.g., E. coli)?",
            options: [
                { id: "a", text: "Trace ketones" },
                { id: "b", text: "Positive nitrites" },
                { id: "c", text: "Specific gravity 1.015" },
                { id: "d", text: "Urine pH 6.0" }
            ],
            correct: "b",
            rationale: {
                correct: "Nitrites are highly specific for gram-negative UTIs because gram-negative organisms (E. coli, Klebsiella, Proteus) reduce nitrates to nitrites. A positive dipstick nitrite supports gram-negative UTI, though sensitivity is modest (some UTIs are nitrite-negative).",
                a: "Ketones are unrelated to UTI.",
                c: "Specific gravity of 1.015 is within normal range.",
                d: "Neutral pH is normal, not diagnostic."
            },
            testTakingTip: "Nitrites positive = gram-negative UTI highly likely. Leukocyte esterase + nitrites = strong UTI signal.",
            guideSection: "Section 4 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 2-month-old infant is admitted for pyelonephritis. The nurse anticipates which initial treatment approach?",
            options: [
                { id: "a", text: "Oral cephalexin as outpatient" },
                { id: "b", text: "Observation at home with close follow-up" },
                { id: "c", text: "Hospital admission with IV antibiotics and rule-out sepsis workup" },
                { id: "d", text: "Subcutaneous immunoglobulin" }
            ],
            correct: "c",
            rationale: {
                correct: "Infants under 2 months with UTI or pyelonephritis are routinely admitted for IV antibiotics (ceftriaxone or ampicillin + gentamicin) and a full sepsis workup (CBC, blood culture, often LP) because of the risk of bacteremia and meningitis.",
                a: "Oral outpatient treatment is not safe for young infants with pyelonephritis.",
                b: "Observation without treatment in a febrile young infant is dangerous.",
                d: "IVIG is not indicated for UTI."
            },
            testTakingTip: "Infant <2 months with UTI = admit + IV antibiotics + sepsis workup. Low threshold for escalation.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        }
    ]
};
