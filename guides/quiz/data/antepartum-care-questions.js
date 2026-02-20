/**
 * Antepartum Care Quiz — Question Data
 * 10 NCLEX-style questions: 5 Single, 2 Priority, 1 Ordering, 1 Matrix, 1 SATA
 */

/* exported antepartumCareQuizData */
var antepartumCareQuizData = {
    guideName: "Antepartum Care",
    guideSlug: "antepartum-care",
    category: "Maternal-Newborn",
    categoryColor: "#EC4899",
    estimatedMinutes: 15,
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
                correct: "Naegele\u2019s rule: Subtract 3 months from the LMP and add 7 days. March 10 minus 3 months = December 10, plus 7 days = December 17. This is the standard method for calculating EDD when the client has regular 28-day cycles.",
                b: "This would result from adding 10 months and 7 days, which is not how Naegele\u2019s rule works.",
                c: "December 10 only subtracts 3 months but forgets to add 7 days.",
                d: "January 10 adds 10 months but does not apply the correct formula."
            },
            testTakingTip: "Naegele\u2019s rule: LMP \u2212 3 months + 7 days + 1 year (if needed). Practice this calculation \u2014 it appears frequently on the NCLEX. Always use the first day of the LMP, not the last day.",
            guideSection: "Section 2 \u2014 Confirmation of Pregnancy",
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
                correct: "A positive pregnancy test (detecting hCG) is a probable sign of pregnancy \u2014 it strongly suggests pregnancy but could have other causes (such as hCG-secreting tumors). Nausea and breast tenderness are presumptive signs (subjective, reported by the client). Since the question asks about all the findings together including the positive test, probable is the best answer because it is the highest level of certainty present.",
                a: "Positive signs are definitive proof of pregnancy: visualization of the fetus on ultrasound, fetal heart tones by Doppler, or fetal movement felt by the examiner. None of these have been confirmed yet.",
                c: "Nausea and breast tenderness alone are presumptive (subjective) signs, but the positive pregnancy test elevates the certainty to probable.",
                d: "\"Diagnostic signs\" is not a standard classification in the presumptive-probable-positive framework used in obstetric nursing."
            },
            testTakingTip: "Remember the hierarchy: Presumptive = subjective symptoms (client reports). Probable = objective findings that suggest pregnancy (positive hCG, Hegar\u2019s sign, Chadwick\u2019s sign). Positive = definitive proof (see, hear, or feel the fetus).",
            guideSection: "Section 2 \u2014 Confirmation of Pregnancy",
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
                c: "Oxygen may be appropriate as a secondary intervention, but the root cause is positional \u2014 repositioning corrects the problem. Oxygen alone will not resolve the vena cava compression.",
                d: "Notifying the provider may be needed if symptoms persist after repositioning, but the nurse should intervene with the immediate corrective action first."
            },
            testTakingTip: "After 20 weeks gestation, NEVER leave a pregnant client supine. If hypotension occurs in the supine position, the first action is ALWAYS to reposition to left lateral. This is the most common NCLEX question on this topic.",
            guideSection: "Section 3 \u2014 Maternal Physiological Adaptations",
            guideSectionId: "maternal-adaptations"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is reviewing the prenatal lab results for a client at her first prenatal visit at 10 weeks gestation. Which finding requires immediate follow-up by the nurse?",
            options: [
                { id: "a", text: "Hemoglobin 11.2 g/dL" },
                { id: "b", text: "Blood type O negative, antibody screen negative" },
                { id: "c", text: "Rubella titer non-immune" },
                { id: "d", text: "Urine culture positive for Group B Streptococcus" }
            ],
            labValues: [
                { name: "Hemoglobin (pregnant)", normal: "11.0\u201314.0 g/dL" },
                { name: "Rubella titer", normal: "Immune (1:8 or greater)" }
            ],
            correct: "d",
            rationale: {
                correct: "A positive urine culture for GBS indicates a urinary tract infection that requires antibiotic treatment NOW \u2014 untreated GBS bacteriuria increases the risk of preterm labor, pyelonephritis, and neonatal sepsis. This also means the client will need IV antibiotics during labor (GBS prophylaxis). This finding requires immediate provider notification and treatment.",
                a: "Hemoglobin of 11.2 g/dL is within the normal range for pregnancy (physiologic anemia occurs due to hemodilution). The lower limit is approximately 11.0 g/dL in the first trimester.",
                b: "Blood type O negative with a negative antibody screen is expected. The client will need RhoGAM at 28 weeks and after delivery if the infant is Rh positive, but this is routine management, not an immediate concern.",
                c: "A non-immune rubella titer means the client is susceptible to rubella. The nurse should educate about avoiding exposure, but the MMR vaccine is a live vaccine and CANNOT be given during pregnancy. Vaccination will be given postpartum."
            },
            testTakingTip: "On the NCLEX, positive infection cultures always require follow-up. GBS in urine is treated immediately AND triggers intrapartum prophylaxis. Know the difference between GBS screening (35-37 weeks, vaginal/rectal) and GBS bacteriuria (urine, treated when found).",
            guideSection: "Section 4 \u2014 Prenatal Assessment & Screening",
            guideSectionId: "prenatal-assessment"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is performing a non-stress test (NST) on a client at 34 weeks gestation. After 20 minutes, the tracing shows one acceleration of fetal heart rate of 15 beats per minute lasting 18 seconds. No decelerations are present. How should the nurse interpret this result?",
            options: [
                { id: "a", text: "Reactive \u2014 no further testing needed" },
                { id: "b", text: "Non-reactive \u2014 extend the test or perform vibroacoustic stimulation" },
                { id: "c", text: "Positive \u2014 the fetus is not tolerating the test" },
                { id: "d", text: "Equivocal \u2014 repeat the NST in 24 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "A reactive NST requires TWO or more accelerations of at least 15 bpm lasting at least 15 seconds within a 20-minute window. This tracing shows only ONE acceleration, making it non-reactive. The nurse should extend the test to 40 minutes (the fetus may be sleeping) or use vibroacoustic stimulation to elicit a response before reporting results.",
                a: "Reactive requires 2+ accelerations meeting criteria. Only one acceleration was observed \u2014 this does not meet the threshold for reactivity.",
                c: "\"Positive\" and \"negative\" are terms used for the contraction stress test (CST), not the NST. The NST uses \"reactive\" and \"non-reactive.\"",
                d: "\"Equivocal\" is a CST term, not an NST term. The appropriate response to a non-reactive NST is to extend testing or proceed to further evaluation (BPP or CST)."
            },
            testTakingTip: "Remember the 15-15-2 rule for NST: 15 bpm acceleration \u00d7 15 seconds duration \u00d7 2 occurrences in 20 minutes = reactive. If the fetus doesn\u2019t meet criteria, the baby may be sleeping \u2014 extend the test or stimulate before calling it non-reactive.",
            guideSection: "Section 5 \u2014 Fetal Assessment & Monitoring",
            guideSectionId: "fetal-assessment"
        },
        {
            id: 6,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is scheduling prenatal care visits for a low-risk primigravida who presents at 8 weeks gestation. Place the following prenatal milestones in the correct chronological order.",
            options: [
                { id: "a", text: "Confirm pregnancy and obtain baseline labs (CBC, blood type, Rh, rubella, STI screen)" },
                { id: "b", text: "Perform maternal serum quad screen or cell-free DNA screening" },
                { id: "c", text: "Administer RhoGAM to Rh-negative mothers" },
                { id: "d", text: "Perform glucose challenge test (1-hour GCT) for gestational diabetes" },
                { id: "e", text: "Obtain vaginal/rectal GBS culture" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct chronological order follows the standard prenatal care timeline: initial visit labs (8-12 weeks), genetic screening (15-20 weeks for quad screen or 10+ weeks for cfDNA), RhoGAM administration (28 weeks), glucose screening (24-28 weeks), and GBS screening (35-37 weeks).",
                a: "FIRST (8-12 weeks) \u2014 The initial prenatal visit establishes baseline data including blood type, Rh status, immunity, and infection screening. This is foundational for all subsequent care planning.",
                b: "SECOND (15-20 weeks) \u2014 Maternal serum screening (quad screen at 15-20 weeks or cell-free DNA as early as 10 weeks) identifies risk for chromosomal abnormalities and neural tube defects.",
                c: "THIRD (28 weeks) \u2014 RhoGAM is administered at 28 weeks to Rh-negative mothers to prevent sensitization. This timing prevents antibody formation during the third trimester.",
                d: "FOURTH (24-28 weeks) \u2014 The 1-hour glucose challenge test screens for gestational diabetes. If abnormal (\u2265140 mg/dL), a 3-hour glucose tolerance test follows.",
                e: "FIFTH (35-37 weeks) \u2014 Vaginal and rectal GBS cultures determine if the mother needs intrapartum antibiotic prophylaxis to prevent neonatal GBS sepsis."
            },
            testTakingTip: "Know the prenatal testing timeline: Initial labs (first visit), genetic screening (15-20 wk), RhoGAM (28 wk), glucose screening (24-28 wk), GBS (35-37 wk). The NCLEX loves asking when things happen during pregnancy.",
            guideSection: "Section 4 \u2014 Prenatal Assessment & Screening",
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
                correct: "This presentation \u2014 severe headache, visual changes, and sudden facial/hand edema \u2014 represents the classic warning signs of preeclampsia with severe features. Combined with a borderline BP at her last visit, this is a medical emergency requiring immediate evaluation. Labor and delivery (or the ED) can perform a full workup including BP, urine protein, CBC, liver enzymes, and fetal monitoring. Delay can lead to eclampsia (seizures), HELLP syndrome, placental abruption, or stroke.",
                a: "These symptoms are NOT a typical headache. Headache with visual changes and sudden edema in the third trimester must be assumed to be preeclampsia until proven otherwise. Delaying evaluation risks life-threatening complications.",
                b: "A prenatal clinic appointment is insufficient for this level of urgency. The client needs continuous monitoring, IV access capability, and the ability to deliver emergently if needed \u2014 only available in L&D or the ED.",
                d: "Elevating feet and drinking water may help with dependent edema but will not treat preeclampsia. Facial and hand edema with neurological symptoms requires emergent evaluation."
            },
            testTakingTip: "The preeclampsia danger sign triad: headache + visual changes + facial edema = GO TO THE HOSPITAL NOW. On the NCLEX, any combination of these symptoms in the third trimester warrants immediate emergency evaluation, not watchful waiting.",
            guideSection: "Section 8 \u2014 Danger Signs in Pregnancy",
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
                a: "CORRECT \u2014 Folic acid (400-800 mcg daily) is recommended before and during pregnancy to reduce the risk of neural tube defects like spina bifida. Ideally started 1-3 months before conception.",
                b: "NEEDS MORE TEACHING \u2014 \"Natural\" does not mean safe in pregnancy. Many herbal supplements (such as black cohosh, pennyroyal, and high-dose vitamin A) can cause uterine contractions, teratogenic effects, or bleeding. Clients should consult their provider before taking ANY supplement.",
                c: "CORRECT \u2014 Raw fish, deli meats (listeria risk), and unpasteurized dairy are correctly identified as foods to avoid during pregnancy due to risk of foodborne infections.",
                d: "NEEDS MORE TEACHING \u2014 Moderate exercise (30 minutes most days) is recommended during uncomplicated pregnancy. Walking, swimming, and prenatal yoga improve circulation, reduce back pain, and may decrease the risk of gestational diabetes. Only high-risk pregnancies may require activity restrictions."
            },
            testTakingTip: "NCLEX loves testing nutrition and lifestyle in pregnancy. Two common misconceptions to watch for: (1) herbal = safe, and (2) all exercise is dangerous. Both require additional teaching.",
            guideSection: "Section 6 \u2014 Nutrition & Lifestyle in Pregnancy",
            guideSectionId: "nutrition-lifestyle"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is providing prenatal education to an Rh-negative client whose partner is Rh-positive. The client\u2019s indirect Coombs test is negative. When should the nurse explain that RhoGAM (Rh immune globulin) will be administered?",
            options: [
                { id: "a", text: "At 20 weeks gestation and again at 36 weeks" },
                { id: "b", text: "At 28 weeks gestation and within 72 hours after delivery if the newborn is Rh-positive" },
                { id: "c", text: "Only after delivery if the newborn is confirmed Rh-positive" },
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
            guideSection: "Section 10 \u2014 Rh Incompatibility & RhoGAM",
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
                correct: "Between 16 and 36 weeks, fundal height in centimeters should approximate the gestational age in weeks (\u00b12 cm). At 28 weeks, the expected fundal height is 26-30 cm. A measurement of 24 cm is 4 cm less than expected, which falls outside the normal range. This discrepancy could indicate intrauterine growth restriction (IUGR), oligohydramnios, or incorrect dating \u2014 all of which require provider evaluation and possible ultrasound.",
                a: "A 4 cm discrepancy is NOT normal. The acceptable variance is \u00b12 cm. A fundal height of 24 cm at 28 weeks warrants investigation.",
                b: "While measurement technique matters, a 4 cm discrepancy is too significant to attribute to technique alone. The provider needs to be notified even if a remeasurement is performed.",
                d: "Waiting a week could delay identification of a serious problem like IUGR. The provider should be notified now so an ultrasound can be ordered to assess fetal growth and amniotic fluid volume."
            },
            testTakingTip: "Fundal height rule: cm = gestational weeks (\u00b12 cm) between 16-36 weeks. If the measurement is off by more than 2 cm in either direction, notify the provider. Too small = IUGR or oligohydramnios. Too large = macrosomia, polyhydramnios, or multiples.",
            guideSection: "Section 4 \u2014 Prenatal Assessment & Screening",
            guideSectionId: "prenatal-assessment"
        }
    ]
};
