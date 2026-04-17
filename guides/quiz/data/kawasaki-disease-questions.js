/**
 * Kawasaki Disease Quiz — Question Data
 * NCLEX-style questions covering criteria, phases, complications,
 * IVIG + aspirin treatment, and family education.
 */

/* exported kawasakiDiseaseQuizData */
var kawasakiDiseaseQuizData = {
    guideName: "Kawasaki Disease",
    guideSlug: "kawasaki-disease",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 3-year-old is brought to the ED with a 6-day history of fever unresponsive to acetaminophen, bilateral non-purulent conjunctivitis, a strawberry tongue, a polymorphous truncal rash, and swollen, red hands. Which diagnosis should the nurse suspect?",
            options: [
                { id: "a", text: "Scarlet fever" },
                { id: "b", text: "Kawasaki disease" },
                { id: "c", text: "Measles" },
                { id: "d", text: "Viral exanthem" }
            ],
            correct: "b",
            rationale: {
                correct: "This child meets the classic Kawasaki criteria: fever \u22655 days plus 4 of 5 principal features (bilateral non-purulent conjunctivitis, strawberry tongue, rash, extremity changes). The CRASH and BURN mnemonic captures all of them.",
                a: "Scarlet fever has strawberry tongue and sandpaper rash, but conjunctivitis is not typical, and strep throat symptoms (sore throat, exudate) are common.",
                c: "Measles presents with cough, coryza, conjunctivitis (3 C's), plus Koplik spots in the mouth \u2014 not strawberry tongue.",
                d: "Viral exanthems usually have milder fever and fewer systemic features; would not cause extremity edema and strawberry tongue together."
            },
            testTakingTip: "CRASH and BURN is a single-question shortcut for Kawasaki \u2014 fever \u22655 days + 4 of 5 principal features.",
            guideSection: "Section 2 \u2014 CRASH and BURN Criteria",
            guideSectionId: "criteria"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A child is diagnosed with Kawasaki disease on day 7 of fever. The provider orders IVIG 2 g/kg. The nurse understands the priority reason for prompt administration is to:",
            options: [
                { id: "a", text: "Prevent dehydration" },
                { id: "b", text: "Shorten the duration of fever" },
                { id: "c", text: "Reduce the risk of coronary artery aneurysms" },
                { id: "d", text: "Prevent pericardial effusion" }
            ],
            correct: "c",
            rationale: {
                correct: "IVIG given within the first 10 days of illness reduces the risk of coronary artery aneurysms from ~25% to <5%. This is the defining benefit that determines the child's long-term cardiac risk.",
                a: "IVIG does not primarily treat dehydration.",
                b: "Fever resolution is a secondary effect, not the primary reason for urgent administration.",
                d: "Pericardial effusion is less concerning than coronary aneurysms and is not the primary target of IVIG."
            },
            testTakingTip: "The entire Kawasaki treatment plan is built around preventing coronary aneurysms. If a question asks why we do something \u2014 it's almost always about the arteries.",
            guideSection: "Section 6 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a 4-year-old being treated for Kawasaki disease asks the nurse why the child is receiving high-dose aspirin when they were told aspirin is dangerous for children. The nurse's best response is:",
            options: [
                { id: "a", text: "'Aspirin is safe at this age; the Reye warning only applies to infants.'" },
                { id: "b", text: "'In Kawasaki disease, the benefits of aspirin outweigh the risks because it helps prevent heart problems.'" },
                { id: "c", text: "'The provider must have made an error \u2014 let me check the order.'" },
                { id: "d", text: "'Aspirin only causes Reye syndrome in children older than 12.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Kawasaki is the ONE pediatric diagnosis where high-dose aspirin is standard of care. The anti-inflammatory and antiplatelet effects protect the coronary arteries \u2014 the benefit outweighs the Reye syndrome risk. Caregivers must be taught to stop aspirin if the child is exposed to flu or varicella.",
                a: "This is incorrect. Reye syndrome risk applies to all children during viral illnesses.",
                c: "The order is correct; no error.",
                d: "Reye syndrome has been associated with aspirin use in children of various ages during viral illnesses, not just teens."
            },
            testTakingTip: "Kawasaki = the aspirin exception. Know why (coronary protection) and when to stop (flu or varicella exposure).",
            guideSection: "Section 6 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 3-year-old has just completed IVIG therapy for Kawasaki disease. The parent asks when the child can receive the MMR vaccine that was due next week. The nurse's best response is:",
            options: [
                { id: "a", text: "'The vaccine can be given at the regularly scheduled appointment.'" },
                { id: "b", text: "'The MMR vaccine should be delayed for about 11 months after IVIG.'" },
                { id: "c", text: "'MMR is now contraindicated forever due to Kawasaki disease.'" },
                { id: "d", text: "'The child can receive MMR in 2 weeks once fever is fully gone.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Passive antibodies in IVIG can neutralize live vaccines like MMR and varicella. Recommendation is to delay live vaccines for approximately 11 months after IVIG administration. Inactivated vaccines can still be given on schedule.",
                a: "Giving MMR too soon means the IVIG antibodies will neutralize the vaccine \u2014 the child won't develop immunity.",
                c: "MMR is not contraindicated forever, just delayed.",
                d: "Two weeks is not long enough for the IVIG antibodies to clear."
            },
            testTakingTip: "IVIG + live vaccines = delay 11 months. This is a specific, frequently tested NCLEX fact.",
            guideSection: "Section 8 \u2014 Family Education",
            guideSectionId: "family-education"
        },
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for four children. Which child requires the most urgent assessment?",
            options: [
                { id: "a", text: "A 5-year-old with Kawasaki in the convalescent phase, awaiting discharge" },
                { id: "b", text: "A 2-year-old 2 weeks post-Kawasaki diagnosis with HR 160 bpm while afebrile and a new gallop rhythm" },
                { id: "c", text: "A 4-year-old with Kawasaki whose fingers are peeling" },
                { id: "d", text: "A 3-year-old in the acute phase of Kawasaki with T 102.5\u00b0F, receiving scheduled acetaminophen" }
            ],
            correct: "b",
            rationale: {
                correct: "Tachycardia out of proportion to fever (especially afebrile tachycardia), a new gallop rhythm, and timing in the subacute phase suggest myocarditis, coronary aneurysm, or heart failure. This child is the priority.",
                a: "Convalescent phase + awaiting discharge is the most stable of the four.",
                c: "Peeling is expected in the subacute phase and is not dangerous on its own.",
                d: "Fever is expected in the acute phase and is being managed with antipyretics."
            },
            testTakingTip: "In Kawasaki, cardiac changes (tachycardia, gallop, new murmur) beat almost any other finding for priority. The subacute phase is the highest-risk window.",
            guideSection: "Section 5 \u2014 Complications",
            guideSectionId: "complications"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which lab finding is most characteristic of the subacute phase of Kawasaki disease?",
            options: [
                { id: "a", text: "Thrombocytopenia (platelets <150,000)" },
                { id: "b", text: "Thrombocytosis (platelets often >450,000, up to >1 million)" },
                { id: "c", text: "Hyperkalemia" },
                { id: "d", text: "Leukopenia" }
            ],
            correct: "b",
            rationale: {
                correct: "Platelets characteristically rise dramatically during the subacute phase, often exceeding 450,000 and sometimes surpassing 1 million. Combined with vasculitis, this creates a significant thrombotic risk \u2014 one reason low-dose aspirin is continued.",
                a: "Thrombocytopenia is not typical; it would actually suggest a different diagnosis.",
                c: "Hyponatremia, not hyperkalemia, is associated with Kawasaki.",
                d: "WBCs are typically elevated (leukocytosis), not low."
            },
            testTakingTip: "Platelets + peeling = subacute phase. The rising platelet count is a specific and classic finding.",
            guideSection: "Section 4 \u2014 Labs & Diagnostics",
            guideSectionId: "labs"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent whose child is on daily low-dose aspirin after Kawasaki disease reports that the child was exposed to a classmate with chickenpox. What is the nurse's best advice?",
            options: [
                { id: "a", text: "'Continue the aspirin as usual and monitor for chickenpox symptoms.'" },
                { id: "b", text: "'Stop the aspirin immediately and call the cardiologist.'" },
                { id: "c", text: "'Double the aspirin dose to protect against complications.'" },
                { id: "d", text: "'Give acetaminophen with the aspirin to prevent fever.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Aspirin during varicella or influenza infection increases the risk of Reye syndrome. The child should stop aspirin, and the cardiologist should be notified. An alternative antiplatelet like clopidogrel may be used short-term.",
                a: "Continuing aspirin through varicella exposure places the child at risk for Reye syndrome.",
                c: "Doubling the dose increases the risk further.",
                d: "Acetaminophen does not neutralize the Reye risk from aspirin use during viral illness."
            },
            testTakingTip: "Aspirin + flu/varicella = STOP and call. This is a high-yield teaching point on NCLEX.",
            guideSection: "Section 8 \u2014 Family Education",
            guideSectionId: "family-education"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which of the following is considered the hallmark serious complication of Kawasaki disease?",
            options: [
                { id: "a", text: "Hepatic failure" },
                { id: "b", text: "Renal failure" },
                { id: "c", text: "Coronary artery aneurysms" },
                { id: "d", text: "Permanent facial paralysis" }
            ],
            correct: "c",
            rationale: {
                correct: "Coronary artery aneurysms are the defining and most feared complication of Kawasaki disease. They can lead to myocardial infarction, arrhythmias, or sudden death \u2014 hence the need for echo surveillance and prompt IVIG.",
                a: "Mild transaminitis occurs but progression to liver failure is not typical.",
                b: "Sterile pyuria is common, but renal failure is not a hallmark complication.",
                d: "Facial paralysis is not a typical Kawasaki complication."
            },
            testTakingTip: "When in doubt on a Kawasaki question, the answer probably involves the heart.",
            guideSection: "Section 5 \u2014 Complications",
            guideSectionId: "complications"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "During administration of IVIG to a child with Kawasaki disease, the child develops chills, a temperature of 38.8\u00b0C (101.8\u00b0F), and drops blood pressure from 100/60 to 82/48 mmHg. What is the nurse's FIRST action?",
            options: [
                { id: "a", text: "Give a bolus of normal saline" },
                { id: "b", text: "Administer diphenhydramine IV" },
                { id: "c", text: "Slow or stop the IVIG infusion and notify the provider" },
                { id: "d", text: "Continue the infusion and reassess in 15 minutes" }
            ],
            correct: "c",
            rationale: {
                correct: "The signs suggest an infusion reaction. First action is to slow or stop the infusion, then notify the provider. Diphenhydramine, acetaminophen, and fluids may be ordered next, but stopping the trigger comes first.",
                a: "Fluids may be needed but addressing the source (IVIG) is first.",
                b: "Diphenhydramine is often given, but only after the infusion is slowed/stopped and a provider is notified.",
                d: "Continuing the infusion in the face of an apparent reaction is unsafe."
            },
            testTakingTip: "When an IV medication is causing harm, stop/slow it first, then treat. Same principle as blood transfusion reactions.",
            guideSection: "Section 7 \u2014 Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which statement by a parent indicates the need for further teaching about Kawasaki disease follow-up?",
            options: [
                { id: "a", text: "'My child will need follow-up echocardiograms for at least 2 months.'" },
                { id: "b", text: "'I should call the cardiologist if my child is exposed to the flu while on aspirin.'" },
                { id: "c", text: "'Once the fever is gone, my child can stop the aspirin right away.'" },
                { id: "d", text: "'We need to delay the MMR vaccine for about 11 months.'" }
            ],
            correct: "c",
            rationale: {
                correct: "Low-dose aspirin continues for 6\u20138 weeks (or longer if aneurysms are present) AFTER the fever resolves, to prevent thrombosis during the subacute phase when platelets skyrocket. Stopping too early removes cardiac protection when it's most needed.",
                a: "Correct \u2014 echo follow-up at 2 weeks and 6\u20138 weeks is standard.",
                b: "Correct \u2014 the aspirin/flu/varicella teaching is right.",
                d: "Correct \u2014 11-month delay for live vaccines after IVIG."
            },
            testTakingTip: "'Need further teaching' questions look for the incorrect statement. The aspirin continuation timeline is a high-yield teaching point.",
            guideSection: "Section 8 \u2014 Family Education",
            guideSectionId: "family-education"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A toddler with Kawasaki disease is being cared for on the pediatric unit. Which intervention best addresses the child's characteristic extreme irritability?",
            options: [
                { id: "a", text: "Schedule all cares and procedures together to minimize interruptions" },
                { id: "b", text: "Keep the child alone in a bright, stimulating room to distract them" },
                { id: "c", text: "Encourage multiple family members to visit at once" },
                { id: "d", text: "Administer sedation to all Kawasaki patients routinely" }
            ],
            correct: "a",
            rationale: {
                correct: "Children with Kawasaki are characteristically inconsolable. Clustering care to allow long uninterrupted rest periods, dimming lights, limiting visitors, and encouraging parent presence are the standard comforting strategies.",
                b: "Bright, stimulating environments worsen irritability. Quiet and calm is preferred.",
                c: "Multiple visitors often increases stimulation and agitation.",
                d: "Routine sedation is not appropriate; comfort measures come first."
            },
            testTakingTip: "Clustered care is a high-yield nursing intervention for multiple irritable pediatric patients (CHF, Kawasaki, post-op).",
            guideSection: "Section 7 \u2014 Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which of the following clinical findings is NOT part of the CRASH and BURN diagnostic criteria for Kawasaki disease?",
            options: [
                { id: "a", text: "Bilateral non-purulent conjunctivitis" },
                { id: "b", text: "Fever for at least 5 days" },
                { id: "c", text: "Purulent cervical lymphadenitis with abscess" },
                { id: "d", text: "Strawberry tongue" }
            ],
            correct: "c",
            rationale: {
                correct: "Cervical adenopathy in Kawasaki is typically UNILATERAL, non-suppurative, with at least one node >1.5 cm. Purulent lymphadenitis with abscess suggests a bacterial infection, not Kawasaki.",
                a: "Bilateral non-purulent conjunctivitis IS a criterion (the C in CRASH).",
                b: "Fever \u22655 days IS a criterion (the BURN part).",
                d: "Strawberry tongue IS a criterion (the S in CRASH, oral changes)."
            },
            testTakingTip: "Kawasaki lymphadenopathy is unilateral and non-suppurative. Purulent adenopathy means bacterial infection.",
            guideSection: "Section 2 \u2014 CRASH and BURN Criteria",
            guideSectionId: "criteria"
        },
        {
            id: 13,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 5-year-old with Kawasaki disease returns for a follow-up echocardiogram 2 weeks after IVIG. The echo shows a 4 mm coronary artery aneurysm. Which intervention does the nurse expect?",
            options: [
                { id: "a", text: "Discontinuation of all antiplatelet therapy" },
                { id: "b", text: "Continued low-dose aspirin with close cardiology follow-up" },
                { id: "c", text: "A second dose of IVIG administered immediately" },
                { id: "d", text: "Immediate coronary bypass surgery" }
            ],
            correct: "b",
            rationale: {
                correct: "Small-to-moderate aneurysms (5 mm or less) are typically managed with continued antiplatelet therapy (low-dose aspirin) and ongoing cardiology follow-up with serial echocardiograms. Many will regress over time.",
                a: "Stopping antiplatelet therapy in the presence of a known aneurysm increases thrombosis risk.",
                c: "Second IVIG is used for persistent fever (IVIG-resistant Kawasaki), not for stable aneurysms found on follow-up echo.",
                d: "Coronary bypass would be reserved for giant aneurysms with significant stenosis or ischemia \u2014 not a first-line response to a 4 mm aneurysm."
            },
            testTakingTip: "Aneurysm management depends on size: small \u2192 aspirin + follow-up. Giant (>8 mm) \u2192 aspirin + anticoagulation, possible surgical evaluation.",
            guideSection: "Section 5 \u2014 Complications",
            guideSectionId: "complications"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The parent of a child being treated for Kawasaki disease asks when they can expect to see peeling of the hands and feet. The nurse correctly explains that desquamation typically occurs during which phase?",
            options: [
                { id: "a", text: "Acute phase (week 1\u20132)" },
                { id: "b", text: "Subacute phase (week 2\u20134)" },
                { id: "c", text: "Convalescent phase (week 4\u20138)" },
                { id: "d", text: "Only if aneurysms develop" }
            ],
            correct: "b",
            rationale: {
                correct: "Desquamation (peeling) of the fingertips and toes is a hallmark finding of the SUBACUTE phase. The acute phase features erythema and edema of the hands/feet; peeling starts later as inflammation resolves.",
                a: "In the acute phase, hands/feet are red and swollen, but not yet peeling.",
                c: "By the convalescent phase, peeling has usually completed.",
                d: "Peeling occurs regardless of whether aneurysms develop."
            },
            testTakingTip: "Timeline memory trick: Acute = fever + red. Subacute = peeling + platelets. Convalescent = resolution.",
            guideSection: "Section 3 \u2014 Three Phases of Kawasaki",
            guideSectionId: "phases"
        }
    ]
};
