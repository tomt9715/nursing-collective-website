/**
 * Immune Deficiency, HIV & Anaphylaxis Quiz — Question Data
 * NCLEX-style questions covering primary immune deficiency warning signs,
 * pediatric HIV, anaphylaxis management, vaccines, and family education.
 */

/* exported immuneDeficiencyHivQuizData */
var immuneDeficiencyHivQuizData = {
    guideName: "Immune Deficiency, HIV & Anaphylaxis",
    guideSlug: "immune-deficiency-hiv",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 11,
    questions: [
        {
            id: 1,
            type: "multi",
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
                correct: "PID warning signs include persistent thrush, \u22652 serious infections (like sepsis) in a year, \u22652 pneumonias in a year, failure to thrive, family history, and poor response to standard antibiotics. A single uncomplicated ear infection and seasonal allergies are not red flags.",
                a: "Persistent thrush is a classic PID warning.",
                b: "Two serious infections triggers evaluation.",
                c: "\u22652 PNA in a year is a red flag.",
                d: "A single ear infection is common and not concerning.",
                e: "FTT and chronic diarrhea point to PID.",
                f: "Seasonal allergies are not PID."
            },
            testTakingTip: "PID red flags: thrush, \u22652 serious infections, \u22652 PNA, FTT, family history.",
            guideSection: "Section 2 \u2014 Primary Immune Deficiency",
            guideSectionId: "pid"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 4-year-old is stung by a bee and develops generalized hives, swelling of the lips, wheezing, and hypotension. What is the nurse\u2019s PRIORITY action?",
            options: [
                { id: "a", text: "Administer oral diphenhydramine" },
                { id: "b", text: "Start a normal saline bolus" },
                { id: "c", text: "Administer intramuscular epinephrine 0.01 mg/kg in the anterolateral thigh" },
                { id: "d", text: "Obtain a chest X-ray to evaluate wheezing" }
            ],
            correct: "c",
            rationale: {
                correct: "Anaphylaxis requires IMMEDIATE IM epinephrine 0.01 mg/kg (1:1,000 concentration, max 0.3 mg child) in the mid-anterolateral thigh (vastus lateralis) \u2014 the fastest and most reliable route. Antihistamines, fluids, and imaging follow; they are NOT substitutes for epinephrine.",
                a: "Oral antihistamines don\u2019t treat airway edema or hypotension; epi first.",
                b: "Fluids come after epi for persistent hypotension.",
                d: "Imaging delays life-saving treatment."
            },
            testTakingTip: "Anaphylaxis = airway + IM epi in vastus lateralis FIRST.",
            guideSection: "Section 4 \u2014 Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Where is intramuscular epinephrine administered for anaphylaxis to achieve the fastest absorption?",
            options: [
                { id: "a", text: "Deltoid muscle" },
                { id: "b", text: "Subcutaneous abdomen" },
                { id: "c", text: "Mid-anterolateral thigh (vastus lateralis)" },
                { id: "d", text: "Gluteal muscle" }
            ],
            correct: "c",
            rationale: {
                correct: "Epinephrine is given IM into the mid-anterolateral thigh (vastus lateralis) for fastest, most reliable absorption. Subcutaneous and deltoid injections are slower and less predictable.",
                a: "Deltoid is slower for epi; vastus lateralis is preferred.",
                b: "SubQ is less reliable and slower.",
                d: "Gluteal is not the emergency site."
            },
            testTakingTip: "Epi = vastus lateralis (outer mid-thigh). Through clothing if needed.",
            guideSection: "Section 4 \u2014 Anaphylaxis",
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
                { id: "b", text: "Tdap" },
                { id: "c", text: "MMR (live-attenuated)" },
                { id: "d", text: "Pneumococcal conjugate (PCV13)" }
            ],
            correct: "c",
            rationale: {
                correct: "MMR is a live-attenuated vaccine and can cause vaccine-strain illness in immunocompromised children. Other live vaccines to avoid: varicella, rotavirus, intranasal influenza, BCG, yellow fever. Inactivated vaccines are safe and encouraged.",
                a: "Injectable flu is inactivated \u2014 safe.",
                b: "Tdap is inactivated \u2014 safe.",
                d: "PCV13 is inactivated \u2014 safe."
            },
            testTakingTip: "No live vaccines in immunocompromised. MMR, varicella, rotavirus, nasal flu are live.",
            guideSection: "Section 5 \u2014 Vaccines",
            guideSectionId: "vaccines"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which diagnostic test is MOST appropriate for detecting HIV in a 3-month-old infant born to an HIV-positive mother?",
            options: [
                { id: "a", text: "HIV antibody test" },
                { id: "b", text: "HIV DNA or RNA PCR" },
                { id: "c", text: "CD4 count alone" },
                { id: "d", text: "Repeat rapid oral test" }
            ],
            correct: "b",
            rationale: {
                correct: "Maternal IgG crosses the placenta, so HIV antibody tests are unreliable until 18\u201324 months. HIV DNA or RNA PCR directly detects the virus and is the standard for infant testing.",
                a: "Antibody tests give false positives in infants with maternal antibodies.",
                c: "CD4 count measures immune status, not infection.",
                d: "Same limitation as antibody test."
            },
            testTakingTip: "Infant HIV testing = PCR, not antibody. Two negatives confirm absence.",
            guideSection: "Section 3 \u2014 Pediatric HIV",
            guideSectionId: "hiv"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The parent of an infant with HIV asks, \u201cCan I breastfeed?\u201d The nurse\u2019s BEST response is:",
            options: [
                { id: "a", text: "\u201cYes, breastfeeding prevents HIV transmission.\u201d" },
                { id: "b", text: "\u201cIn the United States, formula feeding is recommended to prevent HIV transmission through breast milk.\u201d" },
                { id: "c", text: "\u201cYou can breastfeed as long as you\u2019re on antiretroviral therapy.\u201d" },
                { id: "d", text: "\u201cBreastfeeding is fine after the baby is 6 months old.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "In resource-rich countries like the US, formula feeding is recommended for all infants born to HIV-positive mothers. Breast milk can transmit the virus. In resource-limited settings, WHO guidelines may differ because of clean water access and formula availability.",
                a: "Breast milk CAN transmit HIV.",
                c: "US guidelines recommend formula regardless of maternal ART.",
                d: "Transmission risk continues throughout breastfeeding."
            },
            testTakingTip: "US HIV+ mom = no breastfeeding. Formula only.",
            guideSection: "Section 3 \u2014 Pediatric HIV",
            guideSectionId: "hiv"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The mother of a 6-year-old with severe peanut allergy asks how long to observe the child after an anaphylactic reaction. The BEST response is:",
            options: [
                { id: "a", text: "\u201cYou can go home as soon as symptoms resolve.\u201d" },
                { id: "b", text: "\u201cChildren should be observed for at least 4\u20138 hours because of the risk of a biphasic reaction.\u201d" },
                { id: "c", text: "\u201cObservation isn\u2019t needed once we\u2019ve given epinephrine.\u201d" },
                { id: "d", text: "\u201cObservation is needed only if symptoms return in the first hour.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Biphasic anaphylactic reactions occur in up to 20% of cases, often within 8\u201310 hours after initial resolution (but up to 72). Observation for at least 4\u20138 hours is standard, with longer for severe reactions. Discharge with 2 epi pens and action plan.",
                a: "Symptom resolution alone is insufficient.",
                c: "Epi has a short half-life; biphasic risk remains.",
                d: "Biphasic reactions often happen later than 1 hour."
            },
            testTakingTip: "Anaphylaxis observation = 4\u20138 hr minimum. Biphasic risk up to 72 hr.",
            guideSection: "Section 4 \u2014 Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school nurse is developing an action plan for a child with severe food allergies. Which item is MOST important to include?",
            options: [
                { id: "a", text: "A single epinephrine auto-injector locked in the office" },
                { id: "b", text: "Two epinephrine auto-injectors accessible during the school day, plus a written anaphylaxis action plan" },
                { id: "c", text: "A bottle of oral diphenhydramine" },
                { id: "d", text: "An albuterol inhaler only" }
            ],
            correct: "b",
            rationale: {
                correct: "Children with severe allergies should have TWO epi pens accessible (not locked away), a written Anaphylaxis Action Plan, trained school staff, and MedicAlert identification. A second dose may be needed 5\u201315 minutes after the first; antihistamines and inhalers are adjuncts, not substitutes.",
                a: "Locking limits access; only one is insufficient.",
                c: "Antihistamines alone don\u2019t treat anaphylaxis.",
                d: "Albuterol treats bronchospasm only."
            },
            testTakingTip: "Two epi pens + action plan + trained staff. Not locked away.",
            guideSection: "Section 4 \u2014 Anaphylaxis",
            guideSectionId: "anaphylaxis"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching family home care for a child with HIV. Which teaching point is MOST important?",
            options: [
                { id: "a", text: "\u201cTake antiretroviral medications only when your child feels sick.\u201d" },
                { id: "b", text: "\u201cTake antiretroviral medications every day as prescribed to keep the virus suppressed and prevent resistance.\u201d" },
                { id: "c", text: "\u201cStop the medication during school breaks.\u201d" },
                { id: "d", text: "\u201cMedications can be adjusted at home if side effects occur.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "ART is lifelong and must be taken DAILY to maintain viral suppression. Missed doses lead to drug resistance, which can cause treatment failure and progression. Never stop without provider guidance.",
                a: "ART is not PRN.",
                c: "Breaks cause resistance.",
                d: "Dose adjustments require provider input."
            },
            testTakingTip: "HIV adherence = daily, no breaks. Missed doses = resistance.",
            guideSection: "Section 3 \u2014 Pediatric HIV",
            guideSectionId: "hiv"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which infection-prevention teaching is MOST important for the family of a child with HIV?",
            options: [
                { id: "a", text: "Avoid all social contact with other children" },
                { id: "b", text: "Strict handwashing, avoid sick contacts, and call the clinic for any fever or new symptoms of infection" },
                { id: "c", text: "Avoid all immunizations" },
                { id: "d", text: "Use household bleach for all the child\u2019s personal items" }
            ],
            correct: "b",
            rationale: {
                correct: "Hand hygiene, avoiding sick contacts, and prompt reporting of fever or new symptoms are core teaching. Inactivated vaccines are encouraged; live vaccines require specific evaluation based on CD4. Social isolation is harmful.",
                a: "Social isolation harms development.",
                c: "Inactivated vaccines are safe and recommended.",
                d: "Routine cleaning is sufficient; bleach isn\u2019t needed for personal items."
            },
            testTakingTip: "Handwashing + avoid sick contacts + call for fever. Not isolation.",
            guideSection: "Section 7 \u2014 Family Education",
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
                c: "Household flu vaccine reduces transmission \u2014 don\u2019t skip.",
                d: "Not a real current option."
            },
            testTakingTip: "Household contacts = injectable flu, NOT intranasal.",
            guideSection: "Section 5 \u2014 Vaccines",
            guideSectionId: "vaccines"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "An adolescent with HIV has a rising viral load and falling CD4 count despite being on ART. The nurse should FIRST:",
            options: [
                { id: "a", text: "Encourage a well-balanced diet only" },
                { id: "b", text: "Assess medication adherence and barriers to taking ART" },
                { id: "c", text: "Discontinue ART to let the immune system recover" },
                { id: "d", text: "Schedule a splenectomy consult" }
            ],
            correct: "b",
            rationale: {
                correct: "Rising viral load + falling CD4 on treatment usually reflects missed doses or drug resistance. First, assess adherence and identify barriers (stigma, side effects, forgetting, unstable housing). A detailed conversation in a nonjudgmental tone is the starting point.",
                a: "Diet alone doesn\u2019t treat HIV.",
                c: "Stopping ART worsens the disease.",
                d: "Splenectomy is not relevant here."
            },
            testTakingTip: "Failing HIV labs \u2192 assess adherence first.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A boy diagnosed with Bruton\u2019s X-linked agammaglobulinemia (XLA) is prescribed IVIG infusions. The nurse understands the purpose of IVIG is to:",
            options: [
                { id: "a", text: "Treat existing acute infections only" },
                { id: "b", text: "Replace the antibodies the child cannot produce and reduce infection risk" },
                { id: "c", text: "Kill T cells that are too active" },
                { id: "d", text: "Boost vaccine response to live vaccines" }
            ],
            correct: "b",
            rationale: {
                correct: "XLA causes absent B cells and therefore no antibody production. Regular (typically monthly) IVIG infusions provide passive immunity with pooled immunoglobulins and dramatically reduce serious infections.",
                a: "IVIG is preventive replacement, not just for active infection.",
                c: "IVIG isn\u2019t a T-cell suppressor.",
                d: "Live vaccines are still avoided; IVIG doesn\u2019t enable them."
            },
            testTakingTip: "IVIG = replace antibodies for B-cell defect. Monthly, preventive.",
            guideSection: "Section 2 \u2014 Primary Immune Deficiency",
            guideSectionId: "pid"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "During an IV antibiotic infusion, a child develops hives, lip swelling, and wheezing. After STOPPING the antibiotic and administering IM epinephrine, which next action is MOST appropriate?",
            options: [
                { id: "a", text: "Resume the antibiotic at half the rate" },
                { id: "b", text: "Give IV normal saline bolus, continuous oxygen, and antihistamines while monitoring continuously" },
                { id: "c", text: "Discharge the child home for outpatient follow-up" },
                { id: "d", text: "Administer a second antibiotic from the same class" }
            ],
            correct: "b",
            rationale: {
                correct: "After stopping the offending agent and giving epinephrine, support with IV fluids, oxygen, antihistamines (H1/H2), bronchodilators (albuterol), and corticosteroids. Continuous monitoring in the appropriate care level; observe for biphasic reaction 4\u20138 hours.",
                a: "Never resume an agent that caused anaphylaxis.",
                c: "Observation is required; discharge is premature.",
                d: "Same-class agents may cross-react."
            },
            testTakingTip: "After epi: stop trigger, O2, IV fluids, adjuncts, monitor 4\u20138 hr.",
            guideSection: "Section 4 \u2014 Anaphylaxis",
            guideSectionId: "anaphylaxis"
        }
    ]
};
