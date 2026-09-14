/**
 * Immune Deficiency, HIV & Anaphylaxis Quiz - Question Data
 * Practice questions covering primary immune deficiency warning signs,
 * pediatric HIV, anaphylaxis management, vaccines, and family education.
 */

/* exported immuneDeficiencyHivQuizData */
var immuneDeficiencyHivQuizData = {
    guideName: "Immune Deficiency, HIV & Anaphylaxis",
    guideSlug: "immune-deficiency-hiv",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "Which findings should prompt evaluation for primary immune deficiency in a child? (Select all that apply.)",
            options: [
                { id: "a", text: "Persistent oral thrush beyond infancy" },
                { id: "b", text: "Two episodes of sepsis within one year" },
                { id: "c", text: "Two or more episodes of pneumonia in one year" },
                { id: "d", text: "Single uncomplicated ear infection" },
                { id: "e", text: "Failure to thrive with chronic diarrhea" },
                { id: "f", text: "One episode of seasonal allergies" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Primary immune deficiency (PID) warning signs include persistent thrush, \u22652 serious infections (like sepsis) in a year, \u22652 pneumonias in a year, failure to thrive, family history, and poor response to standard antibiotics. A single uncomplicated ear infection and seasonal allergies are not red flags.",
                a: "Persistent thrush is a classic primary immune deficiency (PID) warning.",
                b: "Two serious infections triggers evaluation.",
                c: "Two or more episodes of pneumonia in a year is a red flag.",
                d: "A single ear infection is common and not concerning.",
                e: "Failure to thrive (FTT) and chronic diarrhea point to primary immune deficiency (PID).",
                f: "Seasonal allergies are not a sign of primary immune deficiency (PID)."
            },
            testTakingTip: "Primary immune deficiency (PID) red flags: thrush, \u22652 serious infections, \u22652 pneumonias, failure to thrive, family history.",
            guideSection: "Section 2 - Primary Immune Deficiency",
            guideSectionId: "pid"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 4-year-old is stung by a bee and develops generalized hives, swelling of the lips, wheezing, and hypotension. What is the nurse\u2019s PRIORITY action?",
            options: [
                { id: "a", text: "Administer oral diphenhydramine 1 mg/kg and reassess in 15 minutes" },
                { id: "b", text: "Start a normal saline bolus of 20 mL/kg through a peripheral IV" },
                { id: "c", text: "Administer intramuscular epinephrine 0.01 mg/kg in the anterolateral thigh" },
                { id: "d", text: "Obtain a portable chest X-ray to evaluate the cause of wheezing" }
            ],
            correct: "c",
            rationale: {
                correct: "Anaphylaxis requires IMMEDIATE IM epinephrine 0.01 mg/kg (1:1,000 concentration, max 0.3 mg child) in the mid-anterolateral thigh (vastus lateralis) - the fastest and most reliable route. Antihistamines, fluids, and imaging follow; they are NOT substitutes for epinephrine.",
                a: "Oral antihistamines don\u2019t treat airway edema or hypotension; epi first.",
                b: "Fluids come after epi for persistent hypotension.",
                d: "Imaging delays life-saving treatment."
            },
            testTakingTip: "Anaphylaxis = airway + IM epi in vastus lateralis FIRST.",
            guideSection: "Section 4 - Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Where is intramuscular epinephrine administered for anaphylaxis to achieve the fastest absorption?",
            options: [
                { id: "a", text: "Upper outer arm (deltoid muscle)" },
                { id: "b", text: "Subcutaneous tissue of the abdomen" },
                { id: "c", text: "Mid-anterolateral thigh (vastus lateralis)" },
                { id: "d", text: "Upper outer buttock (gluteal muscle)" }
            ],
            correct: "c",
            rationale: {
                correct: "Epinephrine is given IM into the mid-anterolateral thigh (vastus lateralis) for fastest, most reliable absorption. Subcutaneous and deltoid injections are slower and less predictable.",
                a: "Deltoid is slower for epi; vastus lateralis is preferred.",
                b: "Subcutaneous injection is less reliable and slower.",
                d: "Gluteal is not the emergency site."
            },
            testTakingTip: "Epi = vastus lateralis (outer mid-thigh). Through clothing if needed.",
            guideSection: "Section 4 - Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which vaccine should NEVER be given to a child on high-dose corticosteroids or other significant immunosuppression?",
            options: [
                { id: "a", text: "Inactivated (injectable) influenza vaccine" },
                { id: "b", text: "Tdap (tetanus, diphtheria, acellular pertussis)" },
                { id: "c", text: "Measles, mumps, rubella (MMR), live-attenuated" },
                { id: "d", text: "Pneumococcal conjugate vaccine" }
            ],
            correct: "c",
            rationale: {
                correct: "The measles, mumps, rubella (MMR) vaccine is live-attenuated and can cause vaccine-strain illness in immunocompromised children. Other live vaccines to avoid: varicella, rotavirus, intranasal influenza, bacille Calmette-Gu\u00e9rin (BCG), yellow fever. Inactivated vaccines are safe and encouraged.",
                a: "Injectable flu is inactivated - safe.",
                b: "Tdap is inactivated - safe.",
                d: "Pneumococcal conjugate vaccine is inactivated - safe."
            },
            testTakingTip: "No live vaccines in immunocompromised. Measles, mumps, rubella (MMR), varicella, rotavirus, nasal flu are live.",
            guideSection: "Section 5 - Vaccines",
            guideSectionId: "vaccines"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which diagnostic test is MOST appropriate for detecting human immunodeficiency virus (HIV) in a 3-month-old infant born to an HIV-positive mother?",
            options: [
                { id: "a", text: "Human immunodeficiency virus (HIV) antibody test" },
                { id: "b", text: "Polymerase chain reaction (PCR) for viral genetic material" },
                { id: "c", text: "CD4 T-cell count on its own" },
                { id: "d", text: "Repeat rapid oral antibody test in the clinic" }
            ],
            correct: "b",
            rationale: {
                correct: "Maternal immunoglobulin G (IgG) crosses the placenta, so human immunodeficiency virus (HIV) antibody tests are unreliable until 18\u201324 months. HIV deoxyribonucleic acid (DNA) or ribonucleic acid (RNA) polymerase chain reaction (PCR) directly detects the virus and is the standard for infant testing.",
                a: "Antibody tests give false positives in infants with maternal antibodies.",
                c: "CD4 count measures immune status, not infection.",
                d: "Same limitation as antibody test."
            },
            testTakingTip: "Infant human immunodeficiency virus (HIV) testing = polymerase chain reaction (PCR), not antibody. Two negatives confirm absence.",
            guideSection: "Section 3 - Pediatric HIV",
            guideSectionId: "hiv"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A mother with human immunodeficiency virus (HIV) has taken antiretroviral therapy throughout pregnancy, and her viral load has stayed undetectable. She asks, \u201cCan I breastfeed my baby?\u201d The nurse\u2019s BEST response is:",
            options: [
                { id: "a", text: "\u201cYes, breast milk passes along antibodies that protect your baby from catching the virus.\u201d" },
                { id: "b", text: "\u201cFormula removes the risk completely, but breastfeeding is an option we can plan with your care team.\u201d" },
                { id: "c", text: "\u201cYes. An undetectable viral load means the virus can\u2019t pass through breast milk at all.\u201d" },
                { id: "d", text: "\u201cBreastfeeding is safe once your baby is 6 months old and eating solid foods.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Since 2024, United States perinatal human immunodeficiency virus (HIV) guidelines support shared decision-making for a mother on antiretroviral therapy with a sustained undetectable viral load who wants to breastfeed. Formula or pasteurized donor milk is the only way to remove the risk entirely, so the nurse presents both options. A mother who breastfeeds needs frequent viral load checks, and the infant needs repeated HIV testing. A mother who is not virally suppressed should not breastfeed.",
                a: "Breast milk CAN transmit human immunodeficiency virus (HIV). Maternal antibodies do not protect the infant from the virus.",
                c: "An undetectable viral load makes transmission through breast milk rare, not impossible. That is why breastfeeding comes with close monitoring of mother and baby.",
                d: "Transmission risk continues for as long as breastfeeding continues. Starting solid foods does not make it safe."
            },
            testTakingTip: "Undetectable on antiretroviral therapy = breastfeeding is a shared decision with close monitoring. Formula is the only zero-risk option. Not suppressed = no breastfeeding.",
            guideSection: "Section 3 - Pediatric HIV",
            guideSectionId: "hiv"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The mother of a 6-year-old with severe peanut allergy asks how long to observe the child after an anaphylactic reaction. The BEST response is:",
            options: [
                { id: "a", text: "\u201cYou can go home as soon as the hives fade and your child is breathing easily.\u201d" },
                { id: "b", text: "\u201cChildren should be observed for at least 4\u20138 hours because of the risk of a biphasic reaction.\u201d" },
                { id: "c", text: "\u201cObservation isn\u2019t needed once we\u2019ve given epinephrine, because it works quickly.\u201d" },
                { id: "d", text: "\u201cObservation is needed only if symptoms return during the first hour after treatment.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Biphasic anaphylactic reactions occur in up to 20% of cases, often within 8\u201310 hours after initial resolution (but up to 72). Observation for at least 4\u20138 hours is standard, with longer for severe reactions. Discharge with 2 epi pens and action plan.",
                a: "Symptom resolution alone is insufficient.",
                c: "Epi has a short half-life; biphasic risk remains.",
                d: "Biphasic reactions often happen later than 1 hour."
            },
            testTakingTip: "Anaphylaxis observation = 4\u20138 hr minimum. Biphasic risk up to 72 hr.",
            guideSection: "Section 4 - Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school nurse is developing an action plan for a child with severe food allergies. Which item is MOST important to include?",
            options: [
                { id: "a", text: "A single epinephrine auto-injector kept locked in the nurse\u2019s office for safety" },
                { id: "b", text: "Two epinephrine auto-injectors kept accessible all day, plus a written anaphylaxis action plan" },
                { id: "c", text: "A bottle of oral diphenhydramine given at the first sign of hives or itching" },
                { id: "d", text: "An albuterol inhaler carried at all times for any wheezing or throat tightness" }
            ],
            correct: "b",
            rationale: {
                correct: "Children with severe allergies should have TWO epi pens accessible (not locked away), a written Anaphylaxis Action Plan, trained school staff, and MedicAlert identification. A second dose may be needed 5\u201315 minutes after the first; antihistamines and inhalers are adjuncts, not substitutes.",
                a: "Locking limits access; only one is insufficient.",
                c: "Antihistamines alone don\u2019t treat anaphylaxis.",
                d: "Albuterol treats bronchospasm only."
            },
            testTakingTip: "Two epi pens + action plan + trained staff. Not locked away.",
            guideSection: "Section 4 - Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching family home care for a child with human immunodeficiency virus (HIV). Which teaching point is MOST important?",
            options: [
                { id: "a", text: "\u201cTake antiretroviral medications only on days when your child feels sick or has a fever.\u201d" },
                { id: "b", text: "\u201cTake antiretroviral medications every day as prescribed to keep the virus suppressed and prevent resistance.\u201d" },
                { id: "c", text: "\u201cStop the medication during school breaks to give your child\u2019s body a rest from side effects.\u201d" },
                { id: "d", text: "\u201cMedications can be skipped or adjusted at home if side effects like nausea occur.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Antiretroviral therapy (ART) is lifelong and must be taken DAILY to maintain viral suppression. Missed doses lead to drug resistance, which can cause treatment failure and progression. Never stop without provider guidance.",
                a: "Antiretroviral therapy (ART) is not PRN.",
                c: "Breaks cause resistance.",
                d: "Dose adjustments require provider input."
            },
            testTakingTip: "Human immunodeficiency virus (HIV) adherence = daily, no breaks. Missed doses = resistance.",
            guideSection: "Section 3 - Pediatric HIV",
            guideSectionId: "hiv"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which infection-prevention teaching is MOST important for the family of a child with human immunodeficiency virus (HIV)?",
            options: [
                { id: "a", text: "Avoid all social contact with other children, including school and daycare" },
                { id: "b", text: "Strict handwashing, avoid sick contacts, and call the clinic for any fever or sign of infection" },
                { id: "c", text: "Avoid all immunizations, since vaccines can overwhelm the weakened immune system" },
                { id: "d", text: "Use household bleach to disinfect all of the child\u2019s personal items every day" }
            ],
            correct: "b",
            rationale: {
                correct: "Hand hygiene, avoiding sick contacts, and prompt reporting of fever or new symptoms are core teaching. Inactivated vaccines are encouraged; live vaccines require specific evaluation based on CD4. Social isolation is harmful.",
                a: "Social isolation harms development.",
                c: "Inactivated vaccines are safe and recommended.",
                d: "Routine cleaning is sufficient; bleach isn\u2019t needed for personal items."
            },
            testTakingTip: "Handwashing + avoid sick contacts + call for fever. Not isolation.",
            guideSection: "Section 7 - Family Education",
            guideSectionId: "family"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A household contact of a child on chemotherapy is scheduled for a flu vaccine. Which vaccine form should the nurse recommend?",
            options: [
                { id: "a", text: "Live-attenuated intranasal influenza vaccine" },
                { id: "b", text: "Inactivated (injectable) influenza vaccine" },
                { id: "c", text: "Skip the flu vaccine entirely this year" },
                { id: "d", text: "Attenuated oral vaccine" }
            ],
            correct: "b",
            rationale: {
                correct: "Household contacts of immunocompromised patients should receive INACTIVATED (injectable) influenza vaccine. The intranasal live-attenuated vaccine can shed and potentially infect the immunocompromised child.",
                a: "Live nasal flu can shed virus.",
                c: "Household flu vaccine reduces transmission - don\u2019t skip.",
                d: "Not a real current option."
            },
            testTakingTip: "Household contacts = injectable flu, NOT intranasal.",
            guideSection: "Section 5 - Vaccines",
            guideSectionId: "vaccines"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "An adolescent with human immunodeficiency virus (HIV) has a rising viral load and falling CD4 count despite being on antiretroviral therapy (ART). The nurse should FIRST:",
            options: [
                { id: "a", text: "Encourage a well-balanced diet only" },
                { id: "b", text: "Assess adherence and barriers to taking antiretroviral therapy" },
                { id: "c", text: "Discontinue antiretroviral therapy to let the immune system recover" },
                { id: "d", text: "Schedule a splenectomy consult" }
            ],
            correct: "b",
            rationale: {
                correct: "Rising viral load + falling CD4 on treatment usually reflects missed doses or drug resistance. First, assess adherence and identify barriers (stigma, side effects, forgetting, unstable housing). A detailed conversation in a nonjudgmental tone is the starting point.",
                a: "Diet alone doesn\u2019t treat human immunodeficiency virus (HIV).",
                c: "Stopping antiretroviral therapy (ART) worsens the disease.",
                d: "Splenectomy is not relevant here."
            },
            testTakingTip: "Failing human immunodeficiency virus (HIV) labs \u2192 assess adherence first.",
            guideSection: "Section 6 - Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A boy diagnosed with Bruton\u2019s X-linked agammaglobulinemia (XLA) is prescribed intravenous immunoglobulin (IVIG) infusions. The nurse understands the purpose of IVIG is to:",
            options: [
                { id: "a", text: "Treat existing acute infections only, as an alternative to antibiotics" },
                { id: "b", text: "Replace the antibodies the child cannot produce and reduce infection risk" },
                { id: "c", text: "Suppress overactive T cells that are attacking healthy tissue" },
                { id: "d", text: "Boost the child\u2019s response so live vaccines can be given safely" }
            ],
            correct: "b",
            rationale: {
                correct: "X-linked agammaglobulinemia (XLA) causes absent B cells and therefore no antibody production. Regular (typically monthly) intravenous immunoglobulin (IVIG) infusions provide passive immunity with pooled immunoglobulins and dramatically reduce serious infections.",
                a: "Intravenous immunoglobulin (IVIG) is preventive replacement, not just for active infection.",
                c: "Intravenous immunoglobulin (IVIG) isn\u2019t a T-cell suppressor.",
                d: "Live vaccines are still avoided; intravenous immunoglobulin (IVIG) doesn\u2019t enable them."
            },
            testTakingTip: "Intravenous immunoglobulin (IVIG) = replace antibodies for B-cell defect. Monthly, preventive.",
            guideSection: "Section 2 - Primary Immune Deficiency",
            guideSectionId: "pid"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "During an IV antibiotic infusion, a child develops hives, lip swelling, and wheezing. After STOPPING the antibiotic and administering IM epinephrine, which next action is MOST appropriate?",
            options: [
                { id: "a", text: "Resume the antibiotic at half the rate once the wheezing resolves" },
                { id: "b", text: "Give an IV normal saline bolus, oxygen, and antihistamines with continuous monitoring" },
                { id: "c", text: "Discharge the child home once symptoms resolve, with outpatient follow-up" },
                { id: "d", text: "Administer a second antibiotic from the same class at a slower infusion rate" }
            ],
            correct: "b",
            rationale: {
                correct: "After stopping the offending agent and giving epinephrine, support with IV fluids, oxygen, antihistamines (H1/H2), bronchodilators (albuterol), and corticosteroids. Continuous monitoring in the appropriate care level; observe for biphasic reaction 4\u20138 hours.",
                a: "Never resume an agent that caused anaphylaxis.",
                c: "Observation is required; discharge is premature.",
                d: "Same-class agents may cross-react."
            },
            testTakingTip: "After epi: stop trigger, O2, IV fluids, adjuncts, monitor 4\u20138 hr.",
            guideSection: "Section 4 - Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 15, type: "single", subtype: "priority", difficulty: "application",
            stem: "A 6-year-old weighing 22 kg has been given intramuscular epinephrine for anaphylaxis. Symptoms have improved and the parent asks to take the child home. What should the nurse explain?",
            options: [
                { id: "a", text: "The child is observed 4 to 8 hours for a biphasic return" },
                { id: "b", text: "The child may go home once symptoms have fully settled" },
                { id: "c", text: "The child is observed for 1 hour and then discharged home" },
                { id: "d", text: "The child is admitted overnight on every single occasion" }
            ],
            correct: "a",
            rationale: {
                correct: "Anaphylaxis can return hours after it appears to have resolved, so the minimum observation is 4 to 8 hours for a biphasic reaction. The child then goes home carrying two auto-injectors.",
                b: "Resolution of symptoms is exactly when a biphasic reaction is missed, because the second wave has not started yet.",
                c: "One hour is well short of the window in which a biphasic reaction typically appears.",
                d: "Routine overnight admission is not required. A defined observation period is."
            },
            testTakingTip: "At 22 kg this child is in the 15 to 30 kg band, so the auto-injector is the 0.15 mg device. Two go home with them.",
            guideSection: "Section 9 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
