/**
 * Pediatric GERD Quiz — Question Data
 * NCLEX-style questions covering GER vs GERD, red flags,
 * conservative management, medications, and family education.
 */

/* exported pediatricGerdQuizData */
var pediatricGerdQuizData = {
    guideName: "Pediatric GERD",
    guideSlug: "pediatric-gerd",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 10,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent brings a 3-month-old for a well-child visit. The infant spits up after most feeds, produces adequate wet diapers, is following the 50th percentile for weight, and is generally content. What is the nurse's best interpretation?",
            options: [
                { id: "a", text: "The infant has GERD and needs medication" },
                { id: "b", text: "Physiologic GER \u2014 a 'happy spitter' that typically resolves by 12\u201318 months" },
                { id: "c", text: "The infant likely has pyloric stenosis" },
                { id: "d", text: "This is evidence of a cow's milk protein allergy" }
            ],
            correct: "b",
            rationale: {
                correct: "An infant who spits up but has normal weight gain and is content is a 'happy spitter' with physiologic GER \u2014 the lower esophageal sphincter is immature. This peaks at 2\u20134 months and resolves by 12\u201318 months. Reassurance and conservative measures are all that's needed.",
                a: "Normal weight gain and a content infant rules out GERD.",
                c: "Pyloric stenosis presents with projectile non-bilious vomiting and the infant is hungry after, not content.",
                d: "Cow's milk protein allergy typically causes blood in stool, eczema, and poor weight gain \u2014 not described here."
            },
            testTakingTip: "Happy spitter = GER. Problem spitter (FTT, feeding refusal, apnea) = GERD.",
            guideSection: "Section 1 \u2014 GER vs GERD",
            guideSectionId: "ger-vs-gerd"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 6-week-old has been vomiting after feeds. Today, the vomit appeared green. What is the priority nursing action?",
            options: [
                { id: "a", text: "Reassure the parents that green vomit is normal reflux" },
                { id: "b", text: "Thicken the feedings and follow up in 2 weeks" },
                { id: "c", text: "Notify the provider immediately and prepare for an upper GI series" },
                { id: "d", text: "Start a proton pump inhibitor" }
            ],
            correct: "c",
            rationale: {
                correct: "Bilious (green) vomiting indicates obstruction below the ampulla of Vater \u2014 NEVER normal GERD. Malrotation with volvulus is a surgical emergency that can cause bowel necrosis within hours. An upper GI series is the diagnostic test of choice.",
                a: "Green vomit is never normal reflux.",
                b: "This is a critical time-sensitive finding; cannot wait 2 weeks.",
                d: "PPI is inappropriate for suspected obstruction."
            },
            testTakingTip: "Green vomit in an infant = emergency. Never attribute to GERD.",
            guideSection: "Section 2 \u2014 Red Flags",
            guideSectionId: "red-flags"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is teaching a parent about conservative management of their 2-month-old's reflux. Which instruction is CORRECT?",
            options: [
                { id: "a", text: "Place the infant prone to sleep to prevent reflux" },
                { id: "b", text: "Hold the infant upright for 30 minutes after feeds" },
                { id: "c", text: "Give large volumes less frequently" },
                { id: "d", text: "Elevate the head of the crib mattress with pillows" }
            ],
            correct: "b",
            rationale: {
                correct: "Upright positioning during and 30 minutes after feeds uses gravity to reduce reflux. This is the cornerstone of conservative management for infant GER.",
                a: "NEVER prone for infants \u2014 SIDS risk outweighs any reflux benefit. Back to sleep, always.",
                c: "Large volumes distend the stomach and WORSEN reflux. Small frequent feeds are preferred.",
                d: "Pillows in the crib increase SIDS risk and are contraindicated for infants."
            },
            testTakingTip: "Upright for awake time, supine for sleep. Small frequent feeds beat large infrequent ones.",
            guideSection: "Section 4 \u2014 Conservative Management",
            guideSectionId: "conservative"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A parent observes their 4-month-old frequently arching the back and twisting the head during feeds. What is this most likely to represent?",
            options: [
                { id: "a", text: "Seizure activity" },
                { id: "b", text: "Sandifer syndrome \u2014 posturing from reflux" },
                { id: "c", text: "A congenital neurological disorder" },
                { id: "d", text: "Normal developmental motor behavior" }
            ],
            correct: "b",
            rationale: {
                correct: "Sandifer syndrome describes the back-arching and head-twisting that infants display during GERD episodes \u2014 it's an attempt to clear the esophagus. It's often misinterpreted as a seizure, but it's not epileptic.",
                a: "Seizures have other features (loss of consciousness, jerking movements, postictal state). Sandifer is paroxysmal but non-epileptic.",
                c: "Can mimic neuro disease but is reflux-related; resolves when GERD is treated.",
                d: "Not a normal developmental motor pattern."
            },
            testTakingTip: "Sandifer syndrome: reflux mimicking a seizure. Key differentiator \u2014 it's triggered by or during feeds.",
            guideSection: "Section 1 \u2014 GER vs GERD",
            guideSectionId: "ger-vs-gerd"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 6-year-old is prescribed omeprazole for GERD. When should the nurse instruct the parent to give the medication?",
            options: [
                { id: "a", text: "With meals to reduce GI upset" },
                { id: "b", text: "Immediately after meals" },
                { id: "c", text: "30\u201360 minutes before a meal" },
                { id: "d", text: "At bedtime on an empty stomach" }
            ],
            correct: "c",
            rationale: {
                correct: "PPIs irreversibly bind proton pumps that are ACTIVELY producing acid \u2014 which happens during meals. Giving the PPI 30\u201360 minutes before eating allows the drug to reach the parietal cells just as they're activated.",
                a: "Taking with meals reduces efficacy significantly.",
                b: "Too late \u2014 the pumps have already been active.",
                d: "Bedtime on empty stomach doesn't align with acid production peaks."
            },
            testTakingTip: "PPI = 30\u201360 min before breakfast. Timing is critical for efficacy.",
            guideSection: "Section 5 \u2014 Medications & Surgery",
            guideSectionId: "medications"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which clinical finding is MOST suggestive of GERD rather than physiologic GER?",
            options: [
                { id: "a", text: "Spitting up after every bottle" },
                { id: "b", text: "Weight gain tracking along the 25th percentile" },
                { id: "c", text: "Falling off the growth curve, feeding refusal, and recurrent wheezing" },
                { id: "d", text: "Crossing 2 percentile lines up on the growth chart" }
            ],
            correct: "c",
            rationale: {
                correct: "Falling off the growth curve, feeding refusal, and respiratory symptoms (wheezing, cough, aspiration) are hallmark GERD findings \u2014 reflux is causing complications and affecting quality of life and growth.",
                a: "Spitting up alone without complications is usually GER, not GERD.",
                b: "Stable tracking on any percentile is reassuring.",
                d: "Upward crossing is excellent growth \u2014 reassuring."
            },
            testTakingTip: "Falling off the growth curve + feeding refusal + respiratory signs = GERD with complications.",
            guideSection: "Section 1 \u2014 GER vs GERD",
            guideSectionId: "ger-vs-gerd"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which medication should generally NOT be used for pediatric GERD due to safety concerns?",
            options: [
                { id: "a", text: "Famotidine" },
                { id: "b", text: "Omeprazole" },
                { id: "c", text: "Metoclopramide" },
                { id: "d", text: "Calcium carbonate (TUMS)" }
            ],
            correct: "c",
            rationale: {
                correct: "Metoclopramide carries a BLACK BOX warning for tardive dyskinesia and extrapyramidal symptoms (especially in young children). It's rarely used in pediatric GERD due to the risk/benefit profile.",
                a: "Famotidine is an appropriate first-line H2 blocker for pediatric GERD.",
                b: "Omeprazole is a standard PPI for confirmed pediatric GERD.",
                d: "TUMS is appropriate for intermittent heartburn in older children."
            },
            testTakingTip: "Metoclopramide = EPS risk in children. Avoid unless specifically indicated.",
            guideSection: "Section 5 \u2014 Medications & Surgery",
            guideSectionId: "medications"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A child with severe GERD refractory to medication may undergo Nissen fundoplication. What does this procedure involve?",
            options: [
                { id: "a", text: "Wrapping the fundus of the stomach around the distal esophagus" },
                { id: "b", text: "Removing part of the esophagus and reconnecting to the stomach" },
                { id: "c", text: "Tightening the pyloric sphincter" },
                { id: "d", text: "Placing a gastrostomy tube with jejunal extension" }
            ],
            correct: "a",
            rationale: {
                correct: "Nissen fundoplication wraps the fundus of the stomach 360 degrees around the distal esophagus, creating a physical barrier to reflux. Often done in severe GERD or neurologically impaired children with recurrent aspiration.",
                a: "Correct.",
                b: "Esophageal resection is for other conditions (tumors, strictures).",
                c: "Pyloric procedures (pyloromyotomy) are for pyloric stenosis.",
                d: "GJ tube placement is a feeding option, not an anti-reflux surgery."
            },
            testTakingTip: "Nissen = fundus wraps around esophagus. Creates a valve to prevent reflux.",
            guideSection: "Section 5 \u2014 Medications & Surgery",
            guideSectionId: "medications"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent asks the nurse how to thicken formula for their infant with GERD. Which instruction is correct?",
            options: [
                { id: "a", text: "Add 1 tablespoon of rice cereal per ounce of formula" },
                { id: "b", text: "Add 1 teaspoon of rice cereal per ounce of formula" },
                { id: "c", text: "Add 1 teaspoon of rice cereal to the entire bottle" },
                { id: "d", text: "Thickening is not recommended for infants" }
            ],
            correct: "b",
            rationale: {
                correct: "The standard recipe is 1 teaspoon of rice cereal per ounce of formula. Parents also need to enlarge the nipple opening (cross-cut) so the thicker formula can flow. Helps some infants; not all.",
                a: "1 tablespoon per ounce is too thick, risks excessive calories and choking.",
                c: "Under-thickens; need per-ounce dosing for consistency.",
                d: "Thickening IS a recognized conservative measure, though evidence is mixed."
            },
            testTakingTip: "Thickener: 1 tsp rice per oz formula. Enlarge nipple opening.",
            guideSection: "Section 4 \u2014 Conservative Management",
            guideSectionId: "conservative"
        },
        {
            id: 10,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "Which infant should be evaluated MOST urgently?",
            options: [
                { id: "a", text: "A 3-month-old with frequent regurgitation and normal weight gain" },
                { id: "b", text: "A 5-month-old with occasional spit-up" },
                { id: "c", text: "A 4-week-old with projectile vomiting, dehydration, and no wet diapers in 8 hours" },
                { id: "d", text: "A 6-month-old whose reflux is improving on conservative measures" }
            ],
            correct: "c",
            rationale: {
                correct: "Projectile vomiting in a 2\u20138 week old infant with dehydration is highly suspicious for pyloric stenosis. Lack of wet diapers indicates severe dehydration needing urgent fluid resuscitation and electrolyte correction. This is not GERD.",
                a: "Happy spitter with normal growth \u2014 no urgency.",
                b: "Stable and improving.",
                d: "Improving on treatment is not urgent."
            },
            testTakingTip: "Projectile vomiting + dehydration in a 2\u20138 week old = pyloric stenosis, priority case.",
            guideSection: "Section 2 \u2014 Red Flags",
            guideSectionId: "red-flags"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which test is considered the gold standard for measuring the severity of acid reflux in a child?",
            options: [
                { id: "a", text: "Upper GI series" },
                { id: "b", text: "Abdominal ultrasound" },
                { id: "c", text: "24-hour esophageal pH probe" },
                { id: "d", text: "Stool studies" }
            ],
            correct: "c",
            rationale: {
                correct: "A 24-hour esophageal pH probe measures the frequency and duration of acid reflux episodes (Reflux Index) and is considered the gold standard for quantifying reflux severity. It's typically reserved for atypical presentations or treatment failures.",
                a: "Upper GI series shows anatomy (rule out malrotation, hiatal hernia) but doesn't quantify reflux.",
                b: "Ultrasound is used for pyloric stenosis, not GERD assessment.",
                d: "Stool studies evaluate for other GI issues, not reflux."
            },
            testTakingTip: "pH probe = gold standard for reflux severity. Impedance probe adds non-acid reflux detection.",
            guideSection: "Section 3 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a 2-month-old with GERD asks if they can elevate the baby's mattress at night to reduce reflux. What is the nurse's best response?",
            options: [
                { id: "a", text: "'Yes, elevate the head of the crib mattress at a 30-degree angle.'" },
                { id: "b", text: "'Put a pillow under the baby's head to elevate slightly.'" },
                { id: "c", text: "'Place the baby to sleep on the belly for gravity to help.'" },
                { id: "d", text: "'Place the baby supine on a flat firm surface \u2014 no elevation or prone positioning.'" }
            ],
            correct: "d",
            rationale: {
                correct: "Current AAP guidelines are clear: infants should sleep supine on a firm flat surface with no inclines, wedges, or prone positioning. Despite reflux benefit, SIDS risk outweighs \u2014 and recent evidence shows elevation is not as effective as once believed.",
                a: "Elevation is no longer recommended for infant sleep due to SIDS and suffocation risk.",
                b: "Pillows in the crib are a SIDS hazard.",
                c: "Prone sleep is explicitly contraindicated."
            },
            testTakingTip: "Back to sleep, flat surface, firm mattress, no pillows. No exceptions for GERD.",
            guideSection: "Section 4 \u2014 Conservative Management",
            guideSectionId: "conservative"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which statement by a parent of a 5-month-old with reflux indicates correct understanding of conservative management?",
            options: [
                { id: "a", text: "'I'll give larger bottles less often so she can really fill up.'" },
                { id: "b", text: "'I'll hold her upright for about 30 minutes after each feed.'" },
                { id: "c", text: "'I'll lay her on her tummy right after feeding to help the milk stay down.'" },
                { id: "d", text: "'I'll start giving her an antacid with every feed.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Holding the infant upright for 30 minutes after feeds uses gravity to reduce reflux and is the cornerstone of conservative management for infant GER/GERD.",
                a: "Larger, less frequent feeds worsen reflux by overdistending the stomach.",
                c: "Prone positioning after feeds is not recommended due to SIDS risk.",
                d: "Antacids are not first-line for infants; conservative measures come first, and medications are prescribed only when needed."
            },
            testTakingTip: "Hold the infant upright after feeds. Small frequent feeds. Burp often. Simple, effective, no meds needed for most.",
            guideSection: "Section 6 \u2014 Nursing Care & Family Education",
            guideSectionId: "nursing-care"
        }
    ]
};
