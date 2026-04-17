/**
 * Male GU Disorders Quiz — Question Data
 * NCLEX-style questions covering phimosis, cryptorchidism,
 * and testicular torsion.
 */

/* exported maleGuDisordersQuizData */
var maleGuDisordersQuizData = {
    guideName: "Male GU Disorders",
    guideSlug: "male-gu-disorders",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 11,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 15-year-old male presents to the ED with sudden severe left scrotal pain that woke him from sleep 2 hours ago. He is nauseated, the left testis is high-riding with a horizontal lie, and the cremasteric reflex is absent on the left. What is the nurse's priority action?",
            options: [
                { id: "a", text: "Apply ice to the scrotum and discharge home for follow-up" },
                { id: "b", text: "Obtain a urinalysis to rule out epididymitis" },
                { id: "c", text: "Notify the surgeon immediately; prepare the patient for the OR" },
                { id: "d", text: "Administer antibiotics and observe for 24 hours" }
            ],
            correct: "c",
            rationale: {
                correct: "Sudden severe pain, high-riding testis with horizontal lie, and absent cremasteric reflex in an adolescent boy is testicular torsion until proven otherwise. Salvage rate drops sharply after 6 hours. Notify the surgeon and prepare for emergent OR; don't delay for imaging if the clinical picture is classic.",
                a: "Discharge would result in testicular loss within hours.",
                b: "UA is not diagnostic for torsion; don't delay surgery.",
                d: "Antibiotic trial is for epididymitis, not torsion."
            },
            testTakingTip: "Classic torsion pattern in a teen = OR ASAP. Time is testicle.",
            guideSection: "Section 3 \u2014 Testicular Torsion",
            guideSectionId: "torsion"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Testicular torsion has the best salvage outcome when surgical intervention occurs within how many hours of symptom onset?",
            options: [
                { id: "a", text: "12 hours" },
                { id: "b", text: "6 hours" },
                { id: "c", text: "24 hours" },
                { id: "d", text: "48 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Within 6 hours, salvage rate is 90\u2013100%. Between 6\u201312 hours, it drops to ~50%. After 24 hours, the testis is rarely salvageable. This is why torsion is treated as an emergency.",
                a: "12 hours: salvage drops to ~50%.",
                c: "24 hours: salvage ~20%.",
                d: "48 hours: salvage near 0%."
            },
            testTakingTip: "6 hours is THE number for torsion. Memorize it.",
            guideSection: "Section 3 \u2014 Testicular Torsion",
            guideSectionId: "torsion"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which physical exam finding is MOST useful for distinguishing testicular torsion from epididymitis?",
            options: [
                { id: "a", text: "Fever" },
                { id: "b", text: "Absent cremasteric reflex" },
                { id: "c", text: "Scrotal redness" },
                { id: "d", text: "Pyuria on urinalysis" }
            ],
            correct: "b",
            rationale: {
                correct: "An absent cremasteric reflex on the affected side is highly sensitive for testicular torsion and typically preserved in epididymitis. A positive Prehn's sign (relief with scrotal elevation) also favors epididymitis.",
                a: "Fever is more common in epididymitis, but neither condition is ruled out by fever alone.",
                c: "Redness can occur in both conditions.",
                d: "Pyuria suggests epididymitis, but can be absent; the cremasteric reflex is more specific."
            },
            testTakingTip: "Torsion = absent cremasteric reflex + negative Prehn's. Epididymitis = present cremasteric + positive Prehn's.",
            guideSection: "Section 3 \u2014 Testicular Torsion",
            guideSectionId: "torsion"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A new parent of an uncircumcised male infant asks the nurse about caring for the foreskin. Which instruction is correct?",
            options: [
                { id: "a", text: "Retract the foreskin fully every day and clean beneath it" },
                { id: "b", text: "Gently clean the outside with soap and water, and do not force retraction" },
                { id: "c", text: "Apply antibiotic ointment daily to prevent infection" },
                { id: "d", text: "Schedule circumcision between 3 and 6 months to avoid complications" }
            ],
            correct: "b",
            rationale: {
                correct: "The infant foreskin is normally adherent to the glans and should not be forcibly retracted \u2014 doing so can tear the adhesions, cause scarring, and risk paraphimosis. Gentle external cleaning is all that's needed. Retraction develops gradually, often by age 5.",
                a: "Forceful retraction is contraindicated.",
                c: "Routine antibiotics are not needed.",
                d: "Routine circumcision is a family decision, not a phimosis treatment."
            },
            testTakingTip: "Never retract an infant's foreskin. Teach this at every well-child visit for uncircumcised boys.",
            guideSection: "Section 1 \u2014 Phimosis",
            guideSectionId: "phimosis"
        },
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 7-year-old male is brought to the ED with a painfully swollen, purple glans. The foreskin was retracted during a diaper change by an older sibling and has not been returned. What is the priority nursing action?",
            options: [
                { id: "a", text: "Apply warm compresses and send home to follow up in 24 hours" },
                { id: "b", text: "Recognize this as paraphimosis; prepare for manual reduction as an emergency" },
                { id: "c", text: "Administer antibiotics and schedule outpatient circumcision" },
                { id: "d", text: "Teach the parents how to retract the foreskin more carefully" }
            ],
            correct: "b",
            rationale: {
                correct: "Paraphimosis is a urologic emergency. The retracted foreskin acts as a tourniquet, cutting off venous return and causing progressive swelling and ischemia. Immediate manual reduction (with analgesia) is required; refractory cases may need a dorsal slit or emergency circumcision.",
                a: "Delaying treatment risks ischemic necrosis of the glans.",
                c: "Outpatient scheduling is inappropriate for an acute compromise.",
                d: "Teaching is not the priority \u2014 reduction is."
            },
            testTakingTip: "Paraphimosis = emergency. Manual reduction first; don't delay.",
            guideSection: "Section 1 \u2014 Phimosis",
            guideSectionId: "phimosis"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "At what age is surgical correction (orchiopexy) typically recommended if a testis has not descended spontaneously?",
            options: [
                { id: "a", text: "At birth" },
                { id: "b", text: "Between 6 and 18 months" },
                { id: "c", text: "Between ages 3 and 5" },
                { id: "d", text: "After puberty" }
            ],
            correct: "b",
            rationale: {
                correct: "Most testes descend spontaneously by 3\u20136 months. After 6 months, spontaneous descent is unlikely. Orchiopexy between 6 and 18 months preserves spermatogenic potential and reduces (but doesn't eliminate) testicular cancer risk.",
                a: "At-birth surgery isn't needed; give time for spontaneous descent.",
                c: "Waiting until 3\u20135 years causes irreversible damage from prolonged elevated temperature.",
                d: "Post-pubertal orchiopexy loses fertility benefit and may require orchiectomy if testis is atrophied."
            },
            testTakingTip: "6\u201318 months = sweet spot for orchiopexy. Early enough to preserve fertility, late enough to allow spontaneous descent.",
            guideSection: "Section 2 \u2014 Cryptorchidism",
            guideSectionId: "cryptorchidism"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Untreated cryptorchidism increases the risk of which condition later in life?",
            options: [
                { id: "a", text: "Epididymitis" },
                { id: "b", text: "Testicular cancer (4\u20138\u00d7 increased risk)" },
                { id: "c", text: "Benign prostatic hyperplasia" },
                { id: "d", text: "Hypogonadism only" }
            ],
            correct: "b",
            rationale: {
                correct: "Untreated cryptorchidism increases testicular cancer risk 4\u20138 times. Early orchiopexy reduces but does not eliminate this risk. Infertility is also a major concern if the testis is not placed in the scrotum before puberty.",
                a: "Epididymitis is not a known long-term consequence.",
                c: "BPH is unrelated.",
                d: "Hypogonadism can occur but isn't the major concern \u2014 cancer risk is."
            },
            testTakingTip: "Cryptorchidism \u2192 cancer risk 4\u20138\u00d7. Orchiopexy by 18 months reduces but doesn't eliminate this.",
            guideSection: "Section 2 \u2014 Cryptorchidism",
            guideSectionId: "cryptorchidism"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which of the following is a common anatomic predisposition to testicular torsion?",
            options: [
                { id: "a", text: "Bell clapper deformity" },
                { id: "b", text: "Patent processus vaginalis" },
                { id: "c", text: "Hypospadias" },
                { id: "d", text: "Epispadias" }
            ],
            correct: "a",
            rationale: {
                correct: "The bell clapper deformity \u2014 where the testis is not properly fixed to the scrotal wall \u2014 allows the testis to rotate freely on the spermatic cord and is the most common anatomic risk factor for torsion. This is why contralateral orchiopexy is performed at the time of detorsion.",
                a: "Correct.",
                b: "Patent processus vaginalis is associated with inguinal hernia and hydrocele.",
                c: "Hypospadias is a urethral opening location abnormality.",
                d: "Epispadias is also a urethral abnormality (opens on dorsum)."
            },
            testTakingTip: "Bell clapper = testis not fixed = torsion risk. Bilateral fixation is the surgical fix.",
            guideSection: "Section 3 \u2014 Testicular Torsion",
            guideSectionId: "torsion"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 14-year-old is recovering from surgical detorsion of the right testis and contralateral orchiopexy. The parent asks why the left (unaffected) testis was also fixed. The nurse's best response is:",
            options: [
                { id: "a", text: "'It prevents future infection on the left side.'" },
                { id: "b", text: "'The predisposing condition (bell clapper deformity) is usually on both sides, so fixing both prevents future torsion.'" },
                { id: "c", text: "'It will restore fertility on the affected side.'" },
                { id: "d", text: "'It's a cosmetic procedure only.'" }
            ],
            correct: "b",
            rationale: {
                correct: "The bell clapper deformity that allowed torsion on one side is usually present bilaterally. Prophylactic fixation of the unaffected testis prevents a future contralateral torsion, which could result in complete loss of testicular function.",
                a: "Fixation does not prevent infection.",
                c: "Fixation doesn't restore fertility on the affected side; that depends on salvage.",
                d: "It's preventive, not cosmetic."
            },
            testTakingTip: "Torsion is usually bilateral risk. Fix both sides at surgery.",
            guideSection: "Section 5 \u2014 Treatment & Post-Op Care",
            guideSectionId: "treatment"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is teaching an adolescent male about testicular self-exam. Which instruction is correct?",
            options: [
                { id: "a", text: "Perform the exam yearly during the annual physical" },
                { id: "b", text: "Perform monthly in the shower, rolling each testis gently between thumb and fingers" },
                { id: "c", text: "Only perform if there is pain or swelling" },
                { id: "d", text: "Perform daily, right after waking up" }
            ],
            correct: "b",
            rationale: {
                correct: "Monthly self-exam in the shower is recommended \u2014 the scrotum is warm and relaxed, making palpation easier. Each testis is gently rolled between thumb and fingers to assess for lumps, changes in size or consistency, and tenderness.",
                a: "Yearly is too infrequent to catch early changes.",
                c: "Self-exam is for detecting changes early \u2014 before symptoms occur.",
                d: "Daily is overkill; monthly is the standard recommendation."
            },
            testTakingTip: "Testicular self-exam = monthly, in the shower. Teach this to every adolescent male at well-child visits.",
            guideSection: "Section 6 \u2014 Nursing Care & Education",
            guideSectionId: "nursing"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A pediatric nurse is examining a 3-month-old male. She notes the right side of the scrotum is empty, and the right testis can be felt in the inguinal canal but cannot be brought into the scrotum. How should the nurse document this finding?",
            options: [
                { id: "a", text: "Normal physical exam" },
                { id: "b", text: "Retractile testis" },
                { id: "c", text: "Cryptorchidism (undescended testis)" },
                { id: "d", text: "Hydrocele" }
            ],
            correct: "c",
            rationale: {
                correct: "A testis that can be felt in the inguinal canal but cannot be manually brought into the scrotum is cryptorchid (undescended). A retractile testis can be brought into the scrotum and stays there. Documentation and pediatric urology referral are appropriate if not descended by 6 months.",
                a: "An empty scrotum is not normal.",
                b: "Retractile means it CAN be brought down; this testis cannot.",
                d: "Hydrocele is a fluid collection around the testis, not an empty scrotum."
            },
            testTakingTip: "Retractile = brings down, stays down. Cryptorchid = can't bring down or slips back up. Major clinical distinction.",
            guideSection: "Section 2 \u2014 Cryptorchidism",
            guideSectionId: "cryptorchidism"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 9-year-old boy is discharged after orchiopexy for cryptorchidism. Which discharge instruction should the nurse emphasize?",
            options: [
                { id: "a", text: "Return to sports and rough play immediately" },
                { id: "b", text: "Avoid straddle toys, bicycles, and rough play for 2\u20134 weeks" },
                { id: "c", text: "No follow-up needed if the incision looks good" },
                { id: "d", text: "Apply tight pressure over the incision daily" }
            ],
            correct: "b",
            rationale: {
                correct: "Activity restriction for 2\u20134 weeks after orchiopexy protects the surgical fixation. Straddling activities, contact sports, and rough play put tension on the sutures and risk testicular retraction. Follow-up is also important to confirm the testis remains in the scrotum.",
                a: "Too early for activity resumption.",
                c: "Follow-up is always indicated to confirm position and plan self-exam teaching.",
                d: "Tight pressure isn't appropriate; gentle care is."
            },
            testTakingTip: "Post-orchiopexy: no straddle toys, no rough play, for 2\u20134 weeks. Follow-up with urology.",
            guideSection: "Section 6 \u2014 Nursing Care & Education",
            guideSectionId: "nursing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 16-year-old is seen for evaluation after describing \"occasional episodes\" of testicular pain that come and go over the last few months. Physical exam is currently normal. What is the nurse's best response?",
            options: [
                { id: "a", text: "'Normal physical exam reassures us that nothing is wrong.'" },
                { id: "b", text: "'This sounds like intermittent testicular torsion. Urology should evaluate you before another severe episode.'" },
                { id: "c", text: "'This is just growing pains, it will resolve on its own.'" },
                { id: "d", text: "'Start a daily NSAID and follow up in 6 months.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Intermittent testicular pain suggests INTERMITTENT torsion \u2014 the testis twists and spontaneously untwists. This is a red flag for future complete torsion and warrants urology referral for evaluation and often prophylactic bilateral orchiopexy.",
                a: "Normal exam doesn't rule out intermittent torsion \u2014 history is critical.",
                c: "Not growing pains \u2014 this pattern is concerning.",
                d: "NSAIDs don't address the structural issue."
            },
            testTakingTip: "Intermittent testicular pain in a teen = intermittent torsion until proven otherwise. Refer to urology.",
            guideSection: "Section 3 \u2014 Testicular Torsion",
            guideSectionId: "torsion"
        }
    ]
};
