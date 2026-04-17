/**
 * Rheumatic Fever & Infective Endocarditis Quiz — Question Data
 * NCLEX-style questions covering Jones criteria, peripheral IE signs,
 * treatment, and SBE/RF prophylaxis.
 */

/* exported rheumaticFeverEndocarditisQuizData */
var rheumaticFeverEndocarditisQuizData = {
    guideName: "Rheumatic Fever & Endocarditis",
    guideSlug: "rheumatic-fever-endocarditis",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 9-year-old is evaluated 2 weeks after an untreated episode of strep throat. The child has a new holosystolic murmur at the apex, swollen painful knees and ankles that migrate from joint to joint, and an elevated ASO titer. Which condition is most likely?",
            options: [
                { id: "a", text: "Infective endocarditis" },
                { id: "b", text: "Acute rheumatic fever" },
                { id: "c", text: "Kawasaki disease" },
                { id: "d", text: "Juvenile idiopathic arthritis" }
            ],
            correct: "b",
            rationale: {
                correct: "Two major Jones criteria (carditis with new mitral murmur + migratory polyarthritis) plus evidence of recent strep (elevated ASO titer) after untreated strep throat confirm acute rheumatic fever. The 2-week latency is classic.",
                a: "IE is a direct infection; would more likely present with persistent fever, positive blood cultures, and peripheral stigmata (Osler, Janeway, Roth).",
                c: "Kawasaki would show CRASH and BURN features \u2014 conjunctivitis, rash, strawberry tongue, \u22655 days of fever \u2014 not migratory arthritis after strep throat.",
                d: "JIA is chronic, not post-infectious, and rarely causes a new murmur."
            },
            testTakingTip: "Migratory arthritis + new murmur 2\u20133 weeks after strep = classic rheumatic fever. ASO titer is the strep evidence.",
            guideSection: "Section 3 \u2014 Jones Criteria",
            guideSectionId: "jones-criteria"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which set of findings is part of the MAJOR Jones criteria for diagnosis of rheumatic fever?",
            options: [
                { id: "a", text: "Fever, arthralgia, elevated ESR" },
                { id: "b", text: "Carditis, migratory arthritis, subcutaneous nodules, erythema marginatum, Sydenham chorea" },
                { id: "c", text: "Prolonged PR interval, elevated CRP, positive throat culture" },
                { id: "d", text: "Conjunctivitis, rash, strawberry tongue, adenopathy" }
            ],
            correct: "b",
            rationale: {
                correct: "The CASES mnemonic captures the five major Jones criteria: Carditis, Arthritis (migratory), Subcutaneous nodules, Erythema marginatum, Sydenham chorea.",
                a: "These are MINOR Jones criteria.",
                c: "Prolonged PR and elevated CRP are minor criteria. Positive throat culture is supporting evidence of strep.",
                d: "These are CRASH and BURN criteria for Kawasaki disease \u2014 not RF."
            },
            testTakingTip: "CASES for RF, CRASH+BURN for Kawasaki. Don't mix them up.",
            guideSection: "Section 3 \u2014 Jones Criteria",
            guideSectionId: "jones-criteria"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 12-year-old with a history of rheumatic fever 3 years ago is scheduled for a dental cleaning. The echo shows residual mild mitral regurgitation. The nurse expects the provider to order:",
            options: [
                { id: "a", text: "Cefazolin IV 30 minutes before the procedure" },
                { id: "b", text: "Amoxicillin 50 mg/kg PO 30\u201360 minutes before the procedure" },
                { id: "c", text: "Nothing \u2014 prophylaxis is only for children with prosthetic valves" },
                { id: "d", text: "A 10-day course of penicillin starting the day before" }
            ],
            correct: "b",
            rationale: {
                correct: "SBE prophylaxis for dental procedures in high-risk patients (including rheumatic heart disease with residual valve damage) is amoxicillin 50 mg/kg PO (max 2 g) taken 30\u201360 minutes before the procedure.",
                a: "IV cefazolin is reserved for patients who cannot take PO; oral amoxicillin is first-line.",
                c: "Residual valvular damage from rheumatic fever is an indication for SBE prophylaxis.",
                d: "Prophylaxis is a single dose before the procedure, not a 10-day course."
            },
            testTakingTip: "SBE prophylaxis = amoxicillin 50 mg/kg PO × 1, taken 30\u201360 minutes before. Clindamycin if PCN allergic.",
            guideSection: "Section 7 \u2014 Prophylaxis",
            guideSectionId: "prophylaxis"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A parent of a 10-year-old recovering from acute rheumatic fever without carditis asks how long the child will need prophylactic penicillin injections. The nurse's best response is:",
            options: [
                { id: "a", text: "'Usually for 1 year after the acute illness.'" },
                { id: "b", text: "'For 5 years or until age 21, whichever is longer.'" },
                { id: "c", text: "'Only for 6 weeks after discharge.'" },
                { id: "d", text: "'For the rest of their life.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Secondary RF prophylaxis without carditis continues for 5 years OR until age 21, whichever is longer. With carditis but no residual damage: 10 years or until age 21. With residual heart disease: 10 years or until age 40, sometimes lifetime.",
                a: "One year is not long enough; recurrence risk remains high during school-age years.",
                c: "Six weeks covers initial treatment, not secondary prevention.",
                d: "Lifetime is reserved for those with significant residual rheumatic heart disease."
            },
            testTakingTip: "Memorize the three durations: no carditis = 5 yr / age 21. Carditis, no residual = 10 yr / age 21. RHD = 10 yr / age 40, often lifetime.",
            guideSection: "Section 7 \u2014 Prophylaxis",
            guideSectionId: "prophylaxis"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A child with suspected infective endocarditis has small, red, PAINFUL nodules on the tips of the fingers. These findings are known as:",
            options: [
                { id: "a", text: "Janeway lesions" },
                { id: "b", text: "Roth spots" },
                { id: "c", text: "Osler nodes" },
                { id: "d", text: "Erythema marginatum" }
            ],
            correct: "c",
            rationale: {
                correct: "Osler nodes are painful, tender nodules on fingertips and toes \u2014 classic for infective endocarditis. Remember 'Ow-sler' = painful.",
                a: "Janeway lesions are PAINLESS macules on palms and soles.",
                b: "Roth spots are retinal hemorrhages, seen on fundoscopy.",
                d: "Erythema marginatum is a ring-shaped rash seen in rheumatic fever, not IE."
            },
            testTakingTip: "Osler = Ow (painful, tips). Janeway = J-un-painful (painless, palms/soles). This is the most NCLEX-tested IE distinction.",
            guideSection: "Section 5 \u2014 IE Peripheral Signs",
            guideSectionId: "ie-signs"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 14-year-old with suspected infective endocarditis is admitted with a temperature of 38.5\u00b0C and a new heart murmur. Which nursing action is the PRIORITY?",
            options: [
                { id: "a", text: "Administer acetaminophen for the fever" },
                { id: "b", text: "Start broad-spectrum IV antibiotics immediately" },
                { id: "c", text: "Obtain three sets of blood cultures from different sites" },
                { id: "d", text: "Schedule a dental evaluation to identify the source" }
            ],
            correct: "c",
            rationale: {
                correct: "Blood cultures must be obtained BEFORE antibiotics to maximize pathogen identification. Three sets from different sites improves yield and rules out contaminants. Antibiotics given first can sterilize the cultures and make pathogen identification impossible \u2014 which is critical for the long 4\u20136 week course.",
                a: "Fever control is supportive, not priority over identifying the cause.",
                b: "Starting antibiotics before cultures is a classic mistake; do cultures first unless the patient is unstable/septic.",
                d: "Dental evaluation is important for long-term care but not the acute priority."
            },
            testTakingTip: "For IE: cultures before antibiotics. This is a commonly tested priority question.",
            guideSection: "Section 6 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which pathogen is most commonly associated with subacute bacterial endocarditis (SBE) following a dental procedure?",
            options: [
                { id: "a", text: "Staphylococcus aureus" },
                { id: "b", text: "Streptococcus viridans" },
                { id: "c", text: "Enterococcus faecalis" },
                { id: "d", text: "Escherichia coli" }
            ],
            correct: "b",
            rationale: {
                correct: "Streptococcus viridans is part of the normal oral flora. Dental procedures cause transient bacteremia, and these bacteria can seed damaged or abnormal valves \u2014 the classic cause of subacute bacterial endocarditis.",
                a: "Staph aureus is the classic ACUTE IE pathogen, often associated with IV drug use or indwelling catheters.",
                c: "Enterococcus is associated with GI/GU procedures.",
                d: "E. coli is a rare cause of IE, not associated with dental procedures."
            },
            testTakingTip: "Dental procedure + subacute IE = Strep viridans. IV drug use + acute IE = Staph aureus.",
            guideSection: "Section 4 \u2014 Infective Endocarditis",
            guideSectionId: "endocarditis"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching a parent of a 7-year-old diagnosed with strep throat. Which statement by the parent indicates correct understanding of preventing rheumatic fever?",
            options: [
                { id: "a", text: "'I'll stop the antibiotic once the fever is gone.'" },
                { id: "b", text: "'We need to finish the full 10 days of antibiotics even if he feels better.'" },
                { id: "c", text: "'He won't need antibiotics if he's otherwise healthy.'" },
                { id: "d", text: "'Giving fluids and rest is enough to prevent complications.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Incomplete antibiotic treatment is the main preventable cause of rheumatic fever. Completing the full 10-day course of penicillin (or amoxicillin) eradicates the strep organism and prevents the autoimmune response that causes RF.",
                a: "Stopping early is exactly what causes RF \u2014 residual strep triggers the antibody response.",
                c: "All cases of confirmed strep pharyngitis should be treated with antibiotics.",
                d: "Rest and fluids alone are insufficient; antibiotics are essential."
            },
            testTakingTip: "The NCLEX favorite: finish the full course of antibiotics. Don't stop when the child feels better.",
            guideSection: "Section 2 \u2014 Rheumatic Fever",
            guideSectionId: "rheumatic-fever"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A child with rheumatic fever has developed Sydenham chorea. Which nursing intervention is most appropriate?",
            options: [
                { id: "a", text: "Apply soft wrist restraints to prevent self-injury" },
                { id: "b", text: "Provide a calm, quiet environment and pad side rails" },
                { id: "c", text: "Schedule multiple physical therapy sessions daily" },
                { id: "d", text: "Encourage the child to perform fine motor tasks to strengthen control" }
            ],
            correct: "b",
            rationale: {
                correct: "Sydenham chorea causes involuntary movements, emotional lability, and clumsiness. A calm, quiet environment minimizes stimulation that worsens symptoms. Padded side rails and a safe environment prevent injury. The movements resolve over weeks to months.",
                a: "Restraints would be distressing and are not appropriate; padded environment is safer.",
                c: "Intensive PT is not standard for chorea \u2014 rest and safety are priorities.",
                d: "Fine motor tasks would frustrate the child; movements are involuntary and cannot be controlled with effort."
            },
            testTakingTip: "Chorea management is environmental and supportive: quiet, padded, patient. No restraints.",
            guideSection: "Section 8 \u2014 Nursing Care & Family Education",
            guideSectionId: "nursing-care"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A child with infective endocarditis is prescribed a 6-week course of IV vancomycin. Which lab values should the nurse monitor most closely?",
            options: [
                { id: "a", text: "Hemoglobin and hematocrit" },
                { id: "b", text: "Vancomycin trough level and serum creatinine" },
                { id: "c", text: "AST and ALT" },
                { id: "d", text: "INR and PTT" }
            ],
            correct: "b",
            rationale: {
                correct: "Vancomycin has a narrow therapeutic index. Trough levels guide dosing, and the drug is nephrotoxic \u2014 serum creatinine is essential. Ototoxicity is also monitored clinically.",
                a: "Hemoglobin is not the primary concern with vancomycin.",
                c: "Vancomycin is not primarily hepatotoxic.",
                d: "Vancomycin does not significantly affect coagulation."
            },
            testTakingTip: "Vancomycin \u2192 troughs + creatinine. Gentamicin \u2192 peak/trough + creatinine + hearing.",
            guideSection: "Section 6 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which of the following patients does NOT require SBE prophylaxis before a dental cleaning, according to current AHA guidelines?",
            options: [
                { id: "a", text: "A child with a prosthetic aortic valve" },
                { id: "b", text: "A child with unrepaired cyanotic congenital heart disease" },
                { id: "c", text: "A child with a history of infective endocarditis" },
                { id: "d", text: "A child with uncomplicated mitral valve prolapse" }
            ],
            correct: "d",
            rationale: {
                correct: "Mitral valve prolapse is NOT on the AHA high-risk list for SBE prophylaxis. Prophylaxis is reserved for prosthetic valves, unrepaired cyanotic CHD, prior IE, repaired CHD within 6 months with prosthetic material, repaired CHD with residual defects, and cardiac transplants with valvulopathy.",
                a: "Prosthetic valve \u2014 prophylaxis required.",
                b: "Unrepaired cyanotic CHD \u2014 prophylaxis required.",
                c: "Prior IE \u2014 prophylaxis required."
            },
            testTakingTip: "Mitral valve prolapse, bicuspid aortic valve, isolated ASD, and fully repaired CHD without residual defects do NOT need prophylaxis. Memorize the list of who DOES.",
            guideSection: "Section 7 \u2014 Prophylaxis",
            guideSectionId: "prophylaxis"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A child on long-term monthly benzathine penicillin injections for RF prophylaxis has been missing appointments. The school nurse is asked to help. What is the best approach?",
            options: [
                { id: "a", text: "Offer to give the injections at school to improve adherence" },
                { id: "b", text: "Let the family handle it \u2014 school involvement is inappropriate" },
                { id: "c", text: "Stop the injections once they've been missed for 3 months in a row" },
                { id: "d", text: "Switch the child to as-needed antibiotics when they have sore throats" }
            ],
            correct: "a",
            rationale: {
                correct: "Coordinating monthly IM injections with the school nurse or pediatrician's office to streamline the visit improves adherence. Compliance is the single most important factor in preventing RF recurrence.",
                b: "School nurses can and should help coordinate care for chronic pediatric conditions.",
                c: "Stopping prophylaxis places the child at high risk for recurrence and worsening valve damage.",
                d: "As-needed antibiotics for sore throats is NOT prophylaxis; it's treatment, and RF can occur even with mild/silent strep."
            },
            testTakingTip: "Secondary RF prophylaxis is long-term and compliance-dependent. Use every resource (school, pharmacy reminders, coordinated visits) to support adherence.",
            guideSection: "Section 8 \u2014 Nursing Care & Family Education",
            guideSectionId: "nursing-care"
        },
        {
            id: 13,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for four patients on the pediatric cardiology unit. Which patient requires the most immediate assessment?",
            options: [
                { id: "a", text: "A 10-year-old with RF in convalescent phase awaiting discharge teaching" },
                { id: "b", text: "A 14-year-old on week 2 of IV antibiotics for IE who has developed new-onset right-sided weakness and slurred speech" },
                { id: "c", text: "A 12-year-old receiving prophylactic amoxicillin before a dental cleaning" },
                { id: "d", text: "A 9-year-old with RF-associated migratory arthritis requesting more pain medication" }
            ],
            correct: "b",
            rationale: {
                correct: "New focal neurologic deficits (right-sided weakness, slurred speech) in an IE patient suggest a septic cerebral embolism from a valve vegetation. This is a life-threatening complication requiring immediate assessment and imaging.",
                a: "Discharge teaching is routine and not urgent.",
                c: "A dental prophylaxis dose is a planned, low-risk intervention.",
                d: "Pain medication request is important but not life-threatening; addresses comfort, not acute complications."
            },
            testTakingTip: "Embolic stroke is a feared IE complication. Any new neurologic change in an IE patient = immediate workup.",
            guideSection: "Section 4 \u2014 Infective Endocarditis",
            guideSectionId: "endocarditis"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent asks why their child with a history of rheumatic heart disease needs antibiotics before a dental cleaning even though the heart is 'fine' now. The nurse's best response is:",
            options: [
                { id: "a", text: "'The antibiotics treat any leftover strep from the rheumatic fever.'" },
                { id: "b", text: "'Dental procedures can release bacteria into the bloodstream, which can attach to damaged heart valves and cause endocarditis.'" },
                { id: "c", text: "'It's a precaution in case the child is developing a cavity.'" },
                { id: "d", text: "'It prevents rheumatic fever from coming back.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Dental procedures cause transient bacteremia. In a heart with damaged valves (from previous RF), those bacteria can attach and cause infective endocarditis. Amoxicillin 30\u201360 minutes before the procedure provides bloodstream coverage during the bacteremia window.",
                a: "Antibiotics for RF prophylaxis are separate and continue regardless of dental work.",
                c: "Prophylaxis is about preventing bacteremia-induced endocarditis, not cavities.",
                d: "RF recurrence is prevented by ongoing monthly penicillin, not the dental-visit dose."
            },
            testTakingTip: "SBE prophylaxis prevents endocarditis on already-damaged valves. Different purpose than RF recurrence prophylaxis.",
            guideSection: "Section 7 \u2014 Prophylaxis",
            guideSectionId: "prophylaxis"
        }
    ]
};
