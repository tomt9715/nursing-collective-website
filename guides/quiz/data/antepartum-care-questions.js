/**
 * Antepartum Care Quiz - Question Data
 * 10 clinical-scenario questions: 5 Single, 2 Priority, 1 Ordering, 1 Matrix, 1 SATA
 */

/* exported antepartumCareQuizData */
var antepartumCareQuizData = {
    guideName: "Antepartum Care",
    guideSlug: "antepartum-care",
    category: "Maternal-Newborn",
    categoryColor: "#EC4899",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A pregnant client reports her last menstrual period (LMP) began on March 10. Using Naegele\u2019s rule, the nurse calculates the estimated date of delivery (EDD) as which of the following?",
            options: [
                { id: "a", text: "December 17" },
                { id: "b", text: "January 17" },
                { id: "c", text: "December 10" },
                { id: "d", text: "January 10" }
            ],
            correct: "a",
            rationale: {
                correct: "Naegele\u2019s rule: Subtract 3 months from the last menstrual period (LMP) and add 7 days. March 10 minus 3 months = December 10, plus 7 days = December 17. This is the standard method for calculating the estimated date of delivery (EDD) when the client has regular 28-day cycles.",
                b: "This would result from adding 10 months and 7 days, which is not how Naegele\u2019s rule works.",
                c: "December 10 only subtracts 3 months but forgets to add 7 days.",
                d: "January 10 adds 10 months but does not apply the correct formula."
            },
            testTakingTip: "Naegele\u2019s rule: last menstrual period (LMP) \u2212 3 months + 7 days + 1 year (if needed). Practice this calculation until it is automatic - it shows up on exams and in clinical. Always use the first day of the LMP, not the last day.",
            guideSection: "Section 2 - Confirmation of Pregnancy",
            guideSectionId: "pregnancy-confirmation"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A client at 8 weeks gestation reports nausea and breast tenderness. A pregnancy test is positive, but no fetal heart tones are detected yet. These findings are classified as which type of signs of pregnancy?",
            options: [
                { id: "a", text: "Positive signs" },
                { id: "b", text: "Probable signs" },
                { id: "c", text: "Presumptive signs" },
                { id: "d", text: "Diagnostic signs" }
            ],
            correct: "b",
            rationale: {
                correct: "A positive pregnancy test, which detects human chorionic gonadotropin (hCG), is a probable sign of pregnancy - it strongly suggests pregnancy but could have other causes (such as hCG-secreting tumors). Nausea and breast tenderness are presumptive signs (subjective, reported by the client). Since the question asks about all the findings together including the positive test, probable is the best answer because it is the highest level of certainty present.",
                a: "Positive signs are definitive proof of pregnancy: visualization of the fetus on ultrasound, fetal heart tones by Doppler, or fetal movement felt by the examiner. None of these have been confirmed yet.",
                c: "Nausea and breast tenderness alone are presumptive (subjective) signs, but the positive pregnancy test elevates the certainty to probable.",
                d: "\"Diagnostic signs\" is not a standard classification in the presumptive-probable-positive framework used in obstetric nursing."
            },
            testTakingTip: "Remember the hierarchy: Presumptive = subjective symptoms (client reports). Probable = objective findings that suggest pregnancy: positive human chorionic gonadotropin (hCG), Hegar\u2019s sign, Chadwick\u2019s sign. Positive = definitive proof (see, hear, or feel the fetus).",
            guideSection: "Section 2 - Confirmation of Pregnancy",
            guideSectionId: "pregnancy-confirmation"
        },
        {
            id: 3,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a client at 32 weeks gestation who is lying supine for a fetal monitoring session. The client suddenly reports dizziness, lightheadedness, and nausea. Her blood pressure drops to 88/52 mmHg. What is the nurse\u2019s FIRST action?",
            options: [
                { id: "a", text: "Administer IV normal saline as a bolus" },
                { id: "b", text: "Turn the client to the left lateral position" },
                { id: "c", text: "Apply supplemental oxygen via nasal cannula" },
                { id: "d", text: "Call the health care provider immediately" }
            ],
            correct: "b",
            rationale: {
                correct: "This is supine hypotensive syndrome (aortocaval compression). The gravid uterus compresses the inferior vena cava when the client lies flat, reducing venous return and causing hypotension. The fastest and most effective intervention is to turn the client to the left lateral position, which shifts the uterus off the vena cava and restores blood flow immediately. This is an independent nursing action that requires no orders.",
                a: "IV fluids may be needed if hypotension persists, but repositioning is the first and most effective intervention. The cause is mechanical compression, not volume depletion.",
                c: "Oxygen may be appropriate as a secondary intervention, but the root cause is positional - repositioning corrects the problem. Oxygen alone will not resolve the vena cava compression.",
                d: "Notifying the provider may be needed if symptoms persist after repositioning, but the nurse should intervene with the immediate corrective action first."
            },
            testTakingTip: "After 20 weeks gestation, NEVER leave a pregnant client supine. If hypotension occurs in the supine position, the first action is ALWAYS to reposition to left lateral. This is one of the most heavily tested concepts in maternity.",
            guideSection: "Section 3 - Maternal Physiological Adaptations",
            guideSectionId: "maternal-adaptations"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is reviewing the prenatal lab results for a client at her first prenatal visit at 10 weeks gestation. Which finding requires immediate follow-up by the nurse?",
            options: [
                { id: "a", text: "Hemoglobin 11.2 g/dL at 10 weeks gestation" },
                { id: "b", text: "Blood type O negative, antibody screen negative" },
                { id: "c", text: "Rubella titer non-immune (susceptible)" },
                { id: "d", text: "Urine culture positive for Group B Streptococcus" }
            ],
            labValues: [
                { name: "Hemoglobin (pregnant)", normal: "11.0\u201314.0 g/dL" },
                { name: "Rubella titer", normal: "Immune (1:8 or greater)" }
            ],
            correct: "d",
            rationale: {
                correct: "A positive urine culture for group B streptococcus (GBS) indicates a urinary tract infection that requires antibiotic treatment NOW - untreated GBS bacteriuria increases the risk of preterm labor, pyelonephritis, and neonatal sepsis. This also means the client will need IV antibiotics during labor (GBS prophylaxis). This finding requires immediate provider notification and treatment.",
                a: "Hemoglobin of 11.2 g/dL is within the normal range for pregnancy (physiologic anemia occurs due to hemodilution). The lower limit is approximately 11.0 g/dL in the first trimester.",
                b: "Blood type O negative with a negative antibody screen is expected. The client will need RhoGAM at 28 weeks and after delivery if the infant is Rh positive, but this is routine management, not an immediate concern.",
                c: "A non-immune rubella titer means the client is susceptible to rubella. The nurse should educate about avoiding exposure, but the measles, mumps, and rubella (MMR) vaccine is a live vaccine and CANNOT be given during pregnancy. Vaccination will be given postpartum."
            },
            testTakingTip: "Positive infection cultures always require follow-up. Group B streptococcus (GBS) in urine is treated immediately AND triggers intrapartum prophylaxis. Know the difference between GBS screening (35-37 weeks, vaginal/rectal) and GBS bacteriuria (urine, treated when found).",
            guideSection: "Section 4 - Prenatal Assessment & Screening",
            guideSectionId: "prenatal-assessment"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is performing a non-stress test (NST) on a client at 34 weeks gestation. After 20 minutes, the tracing shows one acceleration of fetal heart rate of 15 beats per minute lasting 18 seconds. No decelerations are present. How should the nurse interpret this result?",
            options: [
                { id: "a", text: "Reactive - reassuring, no further testing needed" },
                { id: "b", text: "Non-reactive - extend the test or use vibroacoustic stimulation" },
                { id: "c", text: "Positive - the fetus is not tolerating the test" },
                { id: "d", text: "Equivocal - repeat the non-stress test in 24 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "A reactive non-stress test (NST) requires TWO or more accelerations of at least 15 bpm lasting at least 15 seconds within a 20-minute window. This tracing shows only ONE acceleration, making it non-reactive. The nurse should extend the test to 40 minutes (the fetus may be sleeping) or use vibroacoustic stimulation to elicit a response before reporting results.",
                a: "Reactive requires 2+ accelerations meeting criteria. Only one acceleration was observed - this does not meet the threshold for reactivity.",
                c: "\"Positive\" and \"negative\" are terms used for the contraction stress test (CST), not the non-stress test (NST). The NST uses \"reactive\" and \"non-reactive.\"",
                d: "\"Equivocal\" is a contraction stress test (CST) term, not a non-stress test (NST) term. The appropriate response to a non-reactive NST is to extend testing or proceed to further evaluation, such as a biophysical profile (BPP) or CST."
            },
            testTakingTip: "Remember the 15-15-2 rule for the non-stress test (NST): 15 bpm acceleration \u00d7 15 seconds duration \u00d7 2 occurrences in 20 minutes = reactive. If the fetus doesn\u2019t meet criteria, the baby may be sleeping - extend the test or stimulate before calling it non-reactive.",
            guideSection: "Section 5 - Fetal Assessment & Monitoring",
            guideSectionId: "fetal-assessment"
        },
        {
            id: 6,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A 32-year-old Rh-negative primigravida at 26 weeks gestation presents to the prenatal clinic with a 1-hour glucose challenge result of 162 mg/dL. Her initial prenatal labs and genetic screening were completed earlier in pregnancy. Place the nurse\u2019s next priority actions in the correct sequence.",
            options: [
                { id: "a", text: "Schedule the 3-hour glucose tolerance test to confirm or rule out gestational diabetes" },
                { id: "b", text: "Administer RhoGAM at 28 weeks to prevent Rh sensitization" },
                { id: "c", text: "Initiate dietary counseling and blood glucose self-monitoring if gestational diabetes mellitus (GDM) is confirmed" },
                { id: "d", text: "Obtain vaginal-rectal group B streptococcus (GBS) culture to determine need for intrapartum antibiotics" },
                { id: "e", text: "Increase fetal surveillance with non-stress tests if gestational diabetes mellitus (GDM) requires insulin therapy" }
            ],
            correct: ["a", "c", "b", "d", "e"],
            rationale: {
                correct: "The sequence addresses the most immediate concern first (abnormal glucose screening requires confirmatory testing), then manages the confirmed diagnosis, then addresses time-sensitive preventive care (RhoGAM at 28 weeks), followed by later-pregnancy screenings and ongoing monitoring.",
                a: "FIRST - The abnormal 1-hour glucose challenge test (GCT) result (\u2265140 mg/dL) requires a confirmatory 3-hour glucose tolerance test. This is the most immediate priority because it determines the treatment plan. A gestational diabetes mellitus (GDM) diagnosis changes the entire trajectory of care.",
                c: "SECOND - If gestational diabetes mellitus (GDM) is confirmed by the 3-hour glucose tolerance test (GTT), dietary counseling and blood glucose self-monitoring begin immediately. Most women with GDM are managed with medical nutrition therapy first before considering pharmacological intervention.",
                b: "THIRD - At 28 weeks, RhoGAM must be administered to this Rh-negative mother to prevent alloimmunization. This is a time-sensitive, non-negotiable intervention that protects the fetus from hemolytic disease.",
                d: "FOURTH - Group B streptococcus (GBS) culture is obtained at 35\u201337 weeks. A positive result means the mother will receive IV penicillin during labor to prevent neonatal GBS sepsis - the leading cause of early-onset neonatal infection.",
                e: "FIFTH - If gestational diabetes mellitus (GDM) cannot be controlled with diet alone and insulin is required, fetal surveillance intensifies (typically starting at 32\u201336 weeks) because insulin-dependent GDM increases the risk of macrosomia, stillbirth, and uteroplacental insufficiency."
            },
            testTakingTip: "When a question presents an abnormal screening result, the first priority is always confirmatory testing before treatment. For gestational diabetes mellitus (GDM): the 1-hour glucose challenge test (GCT) screens, the 3-hour glucose tolerance test (GTT) confirms. Also remember RhoGAM timing (28 weeks) and group B streptococcus (GBS) timing (35-37 weeks) as key milestones.",
            guideSection: "Section 4 - Prenatal Assessment & Screening",
            guideSectionId: "prenatal-assessment"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A pregnant client at 30 weeks gestation calls the nurse triage line reporting a sudden, severe headache, blurred vision, and swelling of her face and hands that was not present this morning. Her last prenatal visit 3 days ago showed a BP of 128/82 mmHg. What should the nurse instruct the client to do?",
            options: [
                { id: "a", text: "Take acetaminophen, rest in a dark room, and call back if symptoms worsen" },
                { id: "b", text: "Come to the prenatal clinic for an urgent appointment today" },
                { id: "c", text: "Go to the labor and delivery unit or emergency department immediately" },
                { id: "d", text: "Elevate her feet, drink water, and monitor blood pressure at home" }
            ],
            correct: "c",
            rationale: {
                correct: "This presentation - severe headache, visual changes, and sudden facial/hand edema - represents the classic warning signs of preeclampsia with severe features. Combined with a borderline BP at her last visit, this is a medical emergency requiring immediate evaluation. Labor and delivery (or the ED) can perform a full workup including BP, urine protein, complete blood count (CBC), liver enzymes, and fetal monitoring. Delay can lead to eclampsia (seizures), hemolysis, elevated liver enzymes, and low platelets (HELLP) syndrome, placental abruption, or stroke.",
                a: "These symptoms are NOT a typical headache. Headache with visual changes and sudden edema in the third trimester must be assumed to be preeclampsia until proven otherwise. Delaying evaluation risks life-threatening complications.",
                b: "A prenatal clinic appointment is insufficient for this level of urgency. The client needs continuous monitoring, IV access capability, and the ability to deliver emergently if needed - only available in L&D or the ED.",
                d: "Elevating feet and drinking water may help with dependent edema but will not treat preeclampsia. Facial and hand edema with neurological symptoms requires emergent evaluation."
            },
            testTakingTip: "The preeclampsia danger sign triad: headache + visual changes + facial edema = GO TO THE HOSPITAL NOW. Any combination of these symptoms in the third trimester warrants immediate emergency evaluation, not watchful waiting.",
            guideSection: "Section 8 - Danger Signs in Pregnancy",
            guideSectionId: "danger-signs"
        },
        {
            id: 8,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Correct Understanding", "Needs More Teaching"],
            stem: "A nurse is evaluating a prenatal client\u2019s understanding of nutrition and lifestyle during pregnancy. For each statement, indicate whether it demonstrates correct understanding or needs more teaching.",
            options: [
                { id: "a", text: "\"I take 400 mcg of folic acid daily to help prevent birth defects of the brain and spine.\"" },
                { id: "b", text: "\"I switched to herbal teas and supplements since they\u2019re natural and safe during pregnancy.\"" },
                { id: "c", text: "\"I avoid sushi with raw fish, deli meats, and unpasteurized cheese.\"" },
                { id: "d", text: "\"I stopped exercising completely because I don\u2019t want to shake the baby.\"" }
            ],
            correct: { a: "Correct Understanding", b: "Needs More Teaching", c: "Correct Understanding", d: "Needs More Teaching" },
            rationale: {
                correct: "Folic acid supplementation and food safety awareness demonstrate proper understanding. Assuming all herbal products are safe and avoiding all exercise are misconceptions that require re-education.",
                a: "CORRECT - Folic acid (400-800 mcg daily) is recommended before and during pregnancy to reduce the risk of neural tube defects like spina bifida. Ideally started 1-3 months before conception.",
                b: "NEEDS MORE TEACHING - \"Natural\" does not mean safe in pregnancy. Many herbal supplements (such as black cohosh, pennyroyal, and high-dose vitamin A) can cause uterine contractions, teratogenic effects, or bleeding. Clients should consult their provider before taking ANY supplement.",
                c: "CORRECT - Raw fish, deli meats (listeria risk), and unpasteurized dairy are correctly identified as foods to avoid during pregnancy due to risk of foodborne infections.",
                d: "NEEDS MORE TEACHING - Moderate exercise (30 minutes most days) is recommended during uncomplicated pregnancy. Walking, swimming, and prenatal yoga improve circulation, reduce back pain, and may decrease the risk of gestational diabetes. Only high-risk pregnancies may require activity restrictions."
            },
            testTakingTip: "Nutrition and lifestyle in pregnancy is a favorite exam target. Two common misconceptions to watch for: (1) herbal = safe, and (2) all exercise is dangerous. Both require additional teaching.",
            guideSection: "Section 6 - Nutrition & Lifestyle in Pregnancy",
            guideSectionId: "nutrition-lifestyle"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is providing prenatal education to an Rh-negative client whose partner is Rh-positive. The client\u2019s indirect Coombs test is negative. When should the nurse explain that RhoGAM (Rh immune globulin) will be administered?",
            options: [
                { id: "a", text: "At 20 weeks gestation and again at 36 weeks gestation" },
                { id: "b", text: "At 28 weeks and within 72 hours after birth if the newborn is Rh-positive" },
                { id: "c", text: "Only after delivery, once the newborn is confirmed Rh-positive" },
                { id: "d", text: "At every prenatal visit starting in the second trimester" }
            ],
            correct: "b",
            rationale: {
                correct: "RhoGAM is administered at 28 weeks gestation as prophylaxis to prevent maternal sensitization during the third trimester when the risk of fetal-maternal blood mixing increases. A second dose is given within 72 hours after delivery IF the newborn is confirmed Rh-positive. The negative indirect Coombs test confirms no prior sensitization, making RhoGAM effective.",
                a: "The 20-week timing is too early for routine prophylaxis. However, RhoGAM IS given after any event that could cause fetal-maternal hemorrhage (amniocentesis, bleeding, trauma) regardless of gestational age.",
                c: "Waiting until after delivery provides no protection during the third trimester, when small amounts of fetal blood may cross into the maternal circulation. The 28-week dose is essential prevention.",
                d: "RhoGAM at every visit is unnecessary and not the standard of care. A single prenatal dose at 28 weeks provides adequate protection."
            },
            testTakingTip: "RhoGAM timing: 28 weeks prenatal + 72 hours postpartum (if baby is Rh+). Also given after ANY potential fetal-maternal blood exposure: miscarriage, ectopic, amniocentesis, abdominal trauma, or vaginal bleeding.",
            guideSection: "Section 10 - Rh Incompatibility & RhoGAM",
            guideSectionId: "rh-incompatibility"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is assessing a primigravida at her 28-week prenatal visit. The fundal height measures 24 cm. Which action should the nurse take?",
            options: [
                { id: "a", text: "Document the finding as normal for 28 weeks gestation" },
                { id: "b", text: "Reassess using a different measuring technique" },
                { id: "c", text: "Notify the health care provider of the discrepancy" },
                { id: "d", text: "Schedule the client for a follow-up visit in one week" }
            ],
            correct: "c",
            rationale: {
                correct: "Between 16 and 36 weeks, fundal height in centimeters should approximate the gestational age in weeks (\u00b12 cm). At 28 weeks, the expected fundal height is 26-30 cm. A measurement of 24 cm is 4 cm less than expected, which falls outside the normal range. This discrepancy could indicate intrauterine growth restriction (IUGR), oligohydramnios, or incorrect dating - all of which require provider evaluation and possible ultrasound.",
                a: "A 4 cm discrepancy is NOT normal. The acceptable variance is \u00b12 cm. A fundal height of 24 cm at 28 weeks warrants investigation.",
                b: "While measurement technique matters, a 4 cm discrepancy is too significant to attribute to technique alone. The provider needs to be notified even if a remeasurement is performed.",
                d: "Waiting a week could delay identification of a serious problem like intrauterine growth restriction (IUGR). The provider should be notified now so an ultrasound can be ordered to assess fetal growth and amniotic fluid volume."
            },
            testTakingTip: "Fundal height rule: cm = gestational weeks (\u00b12 cm) between 16-36 weeks. If the measurement is off by more than 2 cm in either direction, notify the provider. Too small = intrauterine growth restriction (IUGR) or oligohydramnios. Too large = macrosomia, polyhydramnios, or multiples.",
            guideSection: "Section 4 - Prenatal Assessment & Screening",
            guideSectionId: "prenatal-assessment"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "application",
            stem: "A woman's last menstrual period began on 10 May. Using Naegele's rule, what is the estimated due date?",
            options: [
                { id: "a", text: "17 February the following year" },
                { id: "b", text: "10 February the following year" },
                { id: "c", text: "3 March the following year" },
                { id: "d", text: "17 August of the same year" }
            ],
            correct: "a",
            rationale: {
                correct: "Naegele's rule takes the first day of the last menstrual period, subtracts 3 months and adds 7 days. From 10 May, subtracting 3 months gives 10 February and adding 7 days gives 17 February of the following year.",
                b: "This subtracts the 3 months but omits the 7 days.",
                c: "This adds rather than subtracts months, which reverses the rule.",
                d: "This adds 7 days but moves only 3 months forward instead of back."
            },
            testTakingTip: "Last menstrual period minus 3 months, plus 7 days. Do the months first and the days second.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 12, type: "single", subtype: "priority", difficulty: "analysis",
            stem: "A woman at 28 weeks has a fundal height of 24 cm. What should the nurse do?",
            options: [
                { id: "a", text: "Notify the provider, since the gap exceeds 2 cm" },
                { id: "b", text: "Document it as an expected finding for 28 weeks" },
                { id: "c", text: "Remeasure in two weeks and compare the readings" },
                { id: "d", text: "Reassure the woman that fundal height varies widely" }
            ],
            correct: "a",
            rationale: {
                correct: "Between 16 and 36 weeks the fundal height in centimetres should roughly match the gestation in weeks. A discrepancy of more than 2 cm is reported, and 24 cm at 28 weeks is a 4 cm gap that may indicate growth restriction or low fluid.",
                b: "A 4 cm shortfall is outside the expected range rather than within it.",
                c: "Waiting two weeks delays investigation of possible growth restriction.",
                d: "Reassurance without investigation misses a finding that may reflect a real problem."
            },
            testTakingTip: "Centimetres equal weeks from 16 to 36. More than 2 cm either way gets reported.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 13, type: "single", subtype: "priority", difficulty: "application",
            stem: "A woman at 30 weeks reports she has felt only 4 fetal movements in the last 2 hours. What should the nurse advise?",
            options: [
                { id: "a", text: "Come in now, since the count is below the floor" },
                { id: "b", text: "Continue counting for a further 4 hours at home" },
                { id: "c", text: "Reassure her, since babies sleep for long periods" },
                { id: "d", text: "Wait until the next scheduled prenatal appointment" }
            ],
            correct: "a",
            rationale: {
                correct: "The kick count floor is 10 movements in 2 hours. Fewer than that means the woman calls and comes in now, because reduced movement can be the first sign of fetal compromise.",
                b: "Extending the count at home delays assessment when the threshold has already been missed.",
                c: "Fetal sleep cycles are real, but they are why the threshold spans 2 hours rather than a few minutes.",
                d: "Waiting for a scheduled visit is unsafe when movements have fallen below the floor."
            },
            testTakingTip: "10 movements in 2 hours is the floor. Fewer means call now, not count longer.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 14, type: "single", subtype: "priority", difficulty: "application",
            stem: "A woman at 32 weeks becomes lightheaded and pale while lying flat on her back for an examination. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Turn her onto her left side" },
                { id: "b", text: "Raise the head of the bed upright" },
                { id: "c", text: "Give oxygen by face mask at 10 litres" },
                { id: "d", text: "Obtain a full set of vital signs first" }
            ],
            correct: "a",
            rationale: {
                correct: "Past 20 weeks the uterus compresses the inferior vena cava when the woman lies supine, reducing venous return and cardiac output. Turning her to the left side lifts the uterus off the vessel and restores the circulation immediately.",
                b: "Sitting up does not remove the uterus from the vena cava.",
                c: "Oxygen does not address the mechanical obstruction causing the problem.",
                d: "Vital signs are taken, but after the position that reverses the cause."
            },
            testTakingTip: "Past 20 weeks, never supine. Left lateral is the position that fixes it, and it is the first action rather than a later one.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "analysis",
            stem: "A woman has a 1 hour glucose screen result of 152 mg/dL at 26 weeks. What should the nurse anticipate?",
            options: [
                { id: "a", text: "A 3 hour glucose tolerance test will be arranged" },
                { id: "b", text: "Gestational diabetes will be diagnosed on this result" },
                { id: "c", text: "The screen will simply be repeated in four weeks" },
                { id: "d", text: "No further testing, since the result is acceptable" }
            ],
            correct: "a",
            rationale: {
                correct: "The glucose screen is performed between 24 and 28 weeks, and a value of 140 mg/dL or more earns the 3 hour glucose tolerance test. The screen identifies who needs the diagnostic test rather than making the diagnosis itself.",
                b: "The screening test does not diagnose gestational diabetes. The 3 hour test does.",
                c: "Repeating the screen rather than progressing to the diagnostic test delays identification.",
                d: "A result of 152 mg/dL is above the 140 mg/dL threshold and is not acceptable to leave."
            },
            testTakingTip: "24 to 28 weeks and 140 mg/dL are the two numbers. The screen sorts who gets tested; the 3 hour test diagnoses.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
