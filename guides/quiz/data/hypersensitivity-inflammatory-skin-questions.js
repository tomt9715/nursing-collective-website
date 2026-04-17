/**
 * Hypersensitivity & Inflammatory Skin Quiz — Question Data
 * NCLEX-style questions covering atopic dermatitis, contact
 * dermatitis, urticaria, anaphylaxis, and SJS/TEN.
 */

/* exported hypersensitivityInflammatorySkinQuizData */
var hypersensitivityInflammatorySkinQuizData = {
    guideName: "Hypersensitivity & Inflammatory Skin",
    guideSlug: "hypersensitivity-inflammatory-skin",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 12,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of an 18-month-old with atopic dermatitis asks the nurse about the best way to moisturize their child's skin. Which instruction is MOST important?",
            options: [
                { id: "a", text: "Apply lotion only when the skin feels dry" },
                { id: "b", text: "Give a long, hot bath followed by moisturizer within 30 minutes" },
                { id: "c", text: "Give a short lukewarm bath and apply thick moisturizer within 3 minutes of patting dry" },
                { id: "d", text: "Use fragrance and antibacterial soap to kill skin bacteria" }
            ],
            correct: "c",
            rationale: {
                correct: "The 'soak and seal' method: short (5\u201310 min) lukewarm bath with mild cleanser, pat dry, and apply thick moisturizer within 3 minutes. Wet skin absorbs water, and immediate moisturizer seals that water in. This is the foundation of eczema daily care.",
                a: "Moisturizing should be daily, not as-needed; prevents flares.",
                b: "Hot baths strip the skin's natural oils and worsen eczema.",
                d: "Fragrances and antibacterial soaps irritate eczema skin."
            },
            testTakingTip: "Soak and seal: 3-minute window post-bath. Memorize this timing.",
            guideSection: "Section 1 \u2014 Atopic Dermatitis",
            guideSectionId: "atopic"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 10-year-old with a peanut allergy accidentally ate a granola bar containing peanuts. She now has hives, wheezing, and is becoming lethargic with a BP of 78/40. What is the priority action?",
            options: [
                { id: "a", text: "Administer diphenhydramine 25 mg PO" },
                { id: "b", text: "Start IV fluids at maintenance rate" },
                { id: "c", text: "Administer IM epinephrine 0.3 mg in the vastus lateralis" },
                { id: "d", text: "Give oral corticosteroid and observe for 15 minutes" }
            ],
            correct: "c",
            rationale: {
                correct: "This is anaphylaxis \u2014 hives plus respiratory (wheezing) and cardiovascular (hypotension) involvement. IM epinephrine into the vastus lateralis is the ONLY life-saving first-line treatment. A 10-year-old is typically \u226530 kg, so 0.3 mg is the appropriate dose. Antihistamines and corticosteroids are adjuncts, not first-line.",
                a: "Antihistamines don't reverse airway or cardiovascular collapse.",
                b: "IV fluids are adjunctive for hypotension but come AFTER epinephrine.",
                d: "Corticosteroids don't work fast enough for anaphylaxis."
            },
            testTakingTip: "Anaphylaxis = IM epinephrine FIRST. Delay in epi is the #1 cause of anaphylaxis death.",
            guideSection: "Section 3 \u2014 Urticaria & Anaphylaxis",
            guideSectionId: "urticaria"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which physical finding distinguishes IRRITANT diaper dermatitis from CANDIDAL diaper dermatitis?",
            options: [
                { id: "a", text: "Redness of the skin" },
                { id: "b", text: "Involvement of skin folds and satellite lesions (candidal) vs. sparing of folds (irritant)" },
                { id: "c", text: "Presence of pain" },
                { id: "d", text: "Age of the child" }
            ],
            correct: "b",
            rationale: {
                correct: "Candidal diaper dermatitis involves SKIN FOLDS and has SATELLITE LESIONS (smaller spots outside the main rash). Irritant dermatitis SPARES the folds and affects convex surfaces (buttocks, tops of thighs). This distinction drives treatment \u2014 candidal needs antifungal, irritant needs barrier cream.",
                a: "Both are red.",
                c: "Both can be uncomfortable.",
                d: "Both occur in infants."
            },
            testTakingTip: "Fold involvement + satellites = candida (nystatin). Spares folds = irritant (barrier cream). NCLEX classic.",
            guideSection: "Section 2 \u2014 Contact & Diaper Dermatitis",
            guideSectionId: "contact"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "An adolescent presents with linear red streaks and vesicles on her forearm 2 days after hiking. The reaction is INTENSELY itchy. Which condition is most likely?",
            options: [
                { id: "a", text: "Atopic dermatitis" },
                { id: "b", text: "Allergic contact dermatitis from poison ivy" },
                { id: "c", text: "Scabies" },
                { id: "d", text: "Urticaria" }
            ],
            correct: "b",
            rationale: {
                correct: "Linear streaks of intensely itchy vesicles 24\u201372 hours after outdoor exposure are classic for allergic contact dermatitis from poison ivy (urushiol). The linear pattern follows where the plant brushed against skin. Cool compresses, topical steroids, and oral steroids for severe cases.",
                a: "Atopic dermatitis occurs in characteristic locations (flexural surfaces) and is chronic, not linear.",
                c: "Scabies typically involves finger webs, wrists, waistline; burrows, not linear streaks.",
                d: "Urticaria has migratory wheals, not linear vesicles tied to a contact event."
            },
            testTakingTip: "Linear streaks + hiking exposure = poison ivy. 'Leaves of three, let them be.'",
            guideSection: "Section 2 \u2014 Contact & Diaper Dermatitis",
            guideSectionId: "contact"
        },
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 12-year-old is admitted with widespread painful red rash, blisters, and erosions of the mouth and eyes, 4 weeks after starting lamotrigine for a seizure disorder. Lateral pressure on the skin causes sloughing. What is the priority action?",
            options: [
                { id: "a", text: "Continue the lamotrigine and treat the rash topically" },
                { id: "b", text: "Discontinue the lamotrigine immediately and admit to ICU or burn unit" },
                { id: "c", text: "Administer diphenhydramine and observe for 24 hours" },
                { id: "d", text: "Apply topical corticosteroid to the affected skin" }
            ],
            correct: "b",
            rationale: {
                correct: "This is Stevens-Johnson syndrome (SJS) or toxic epidermal necrolysis (TEN). Positive Nikolsky sign plus mucosal erosions plus recent medication (lamotrigine is a well-known trigger) requires IMMEDIATE discontinuation of the offending drug and admission to ICU or burn unit. Continuing the drug escalates to TEN and death.",
                a: "Continuing the offending drug is lethal.",
                c: "Antihistamines are inadequate for SJS/TEN.",
                d: "Topical steroids are inadequate; systemic management is required."
            },
            testTakingTip: "SJS/TEN = stop the drug immediately + ICU/burn unit. Time is tissue.",
            guideSection: "Section 4 \u2014 EM, SJS & TEN",
            guideSectionId: "sjs"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 7-year-old with atopic dermatitis is being discharged. Which teaching statement by the parent indicates understanding?",
            options: [
                { id: "a", text: "'I'll apply the topical steroid to the entire body, all the time.'" },
                { id: "b", text: "'I'll apply the topical steroid only to active red itchy patches during flares, and moisturize the rest of the skin daily.'" },
                { id: "c", text: "'Steroids cause addiction, so I'll avoid them entirely.'" },
                { id: "d", text: "'I should dress him in wool clothing to keep his skin warm.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Topical steroids are applied to ACTIVE flare areas (red, itchy patches) only during flares, typically BID for 1\u20132 weeks, then stopped. Daily moisturization to the whole body prevents flares. Long-term steroid use in wrong areas causes skin atrophy and striae.",
                a: "Continuous whole-body steroid use risks skin atrophy.",
                c: "Topical steroids used correctly are safe and effective.",
                d: "Wool irritates eczema skin; cotton is preferred."
            },
            testTakingTip: "Topical steroid = targeted + short course. Moisturize = everywhere + daily.",
            guideSection: "Section 1 \u2014 Atopic Dermatitis",
            guideSectionId: "atopic"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A parent describes their toddler's rash as 'wheals that appear, move around, and disappear within hours.' The rash is intensely itchy. Which medication is first-line?",
            options: [
                { id: "a", text: "Topical clobetasol" },
                { id: "b", text: "Cetirizine (Zyrtec) or diphenhydramine (Benadryl)" },
                { id: "c", text: "Oral acyclovir" },
                { id: "d", text: "IM epinephrine" }
            ],
            correct: "b",
            rationale: {
                correct: "Migratory wheals that appear and disappear within 24 hours describe urticaria (hives). H1 antihistamines are first-line: cetirizine or loratadine (non-sedating) or diphenhydramine (sedating). If there are signs of anaphylaxis (respiratory, CV, GI), then epinephrine is indicated.",
                a: "Topical steroids are less effective than systemic antihistamines for generalized hives.",
                c: "Acyclovir is antiviral, not indicated for hives.",
                d: "Epinephrine is for anaphylaxis \u2014 hives alone without systemic signs don't warrant it."
            },
            testTakingTip: "Hives alone = H1 antihistamine. Hives + systemic signs = anaphylaxis = epinephrine.",
            guideSection: "Section 3 \u2014 Urticaria & Anaphylaxis",
            guideSectionId: "urticaria"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A child with a known food allergy carries an EpiPen. After administering epinephrine for anaphylaxis, which action is MOST important?",
            options: [
                { id: "a", text: "Take an oral antihistamine and go home" },
                { id: "b", text: "Call 911 or go to the ED and observe for at least 4\u20136 hours" },
                { id: "c", text: "Discard the used EpiPen immediately" },
                { id: "d", text: "Wait 15 minutes before giving any other medication" }
            ],
            correct: "b",
            rationale: {
                correct: "After epinephrine for anaphylaxis, the child MUST go to the ED and be observed for 4\u20136 hours. Up to 20% of anaphylaxis cases have a biphasic reaction 4\u201312 hours later without re-exposure. This is why emergency medical care is always indicated after epinephrine use.",
                a: "Going home risks biphasic reaction without monitoring.",
                c: "The used EpiPen should be brought to the ED to show the team.",
                d: "Additional doses of epinephrine may be needed every 5\u201315 minutes if symptoms persist."
            },
            testTakingTip: "EpiPen given = go to ED + observe 4\u20136 hr. Biphasic reactions happen.",
            guideSection: "Section 3 \u2014 Urticaria & Anaphylaxis",
            guideSectionId: "urticaria"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school-age child with chronic atopic dermatitis suddenly develops a cluster of painful vesicles on her affected arms, plus fever. What is the priority concern?",
            options: [
                { id: "a", text: "Typical eczema flare" },
                { id: "b", text: "Eczema herpeticum (disseminated HSV on eczematous skin)" },
                { id: "c", text: "Contact dermatitis" },
                { id: "d", text: "Dry skin from weather change" }
            ],
            correct: "b",
            rationale: {
                correct: "Painful clustered vesicles on eczematous skin plus fever suggests eczema herpeticum \u2014 disseminated HSV on broken eczema skin. It's an emergency that requires IV acyclovir. If near the eyes, emergent ophthalmology consult to prevent corneal scarring.",
                a: "A typical flare doesn't have vesicles or fever.",
                c: "Contact dermatitis is itchy, not painful clustered vesicles.",
                d: "Dry skin alone doesn't cause fever or vesicles."
            },
            testTakingTip: "Eczema + painful clustered vesicles + fever = eczema herpeticum = IV acyclovir urgently.",
            guideSection: "Section 1 \u2014 Atopic Dermatitis",
            guideSectionId: "atopic"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent asks the nurse whether their child with a peanut allergy should carry an EpiPen even if they've only had hives in the past. What is the MOST accurate response?",
            options: [
                { id: "a", text: "'No, an EpiPen is only for severe reactions.'" },
                { id: "b", text: "'Yes, because past reactions don't predict future severity. Always carry two EpiPens and know how to use them.'" },
                { id: "c", text: "'Yes, but only when traveling or at restaurants.'" },
                { id: "d", text: "'Oral antihistamines are a safer alternative.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Past reactions do NOT predict future severity \u2014 a previous mild hives-only reaction can be followed by severe anaphylaxis the next time. Anyone with a confirmed food allergy should carry TWO EpiPens at all times (first may fail or biphasic reaction may need a second dose), know how to use them, and have an action plan.",
                a: "Restricting EpiPens to 'severe' reactions is dangerous \u2014 can't predict severity.",
                c: "Anaphylaxis can happen anywhere.",
                d: "Antihistamines don't treat anaphylaxis."
            },
            testTakingTip: "Food allergy + hives history = ALWAYS carry two EpiPens. Past reactions don't predict future.",
            guideSection: "Section 6 \u2014 Family Education",
            guideSectionId: "family"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which finding on physical exam is the most characteristic of Stevens-Johnson syndrome?",
            options: [
                { id: "a", text: "Isolated urticarial wheals" },
                { id: "b", text: "Positive Nikolsky sign and painful mucosal erosions" },
                { id: "c", text: "Dry, itchy skin on flexural areas" },
                { id: "d", text: "Target-shaped 'bull's eye' lesions on palms and soles" }
            ],
            correct: "b",
            rationale: {
                correct: "Positive Nikolsky sign (skin sloughs with lateral pressure) plus painful mucosal erosions (mouth, eyes, genitals) plus recent new medication is the classic SJS/TEN picture. The target lesions of erythema multiforme lack these severe features.",
                a: "Urticarial wheals are characteristic of hives, not SJS.",
                c: "Flexural itchy skin is atopic dermatitis.",
                d: "Target lesions are erythema multiforme (EM), usually benign."
            },
            testTakingTip: "Nikolsky+ mucosal involvement = SJS/TEN emergency. Target alone + skin only = EM (milder).",
            guideSection: "Section 4 \u2014 EM, SJS & TEN",
            guideSectionId: "sjs"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which medication class is the FIRST-LINE treatment for uncomplicated acute urticaria?",
            options: [
                { id: "a", text: "Topical corticosteroids" },
                { id: "b", text: "H1 antihistamines (cetirizine, loratadine, diphenhydramine)" },
                { id: "c", text: "Oral antibiotics" },
                { id: "d", text: "Immunosuppressants like cyclosporine" }
            ],
            correct: "b",
            rationale: {
                correct: "H1 antihistamines are first-line for acute urticaria. Non-sedating (cetirizine, loratadine) for daytime; sedating (diphenhydramine, hydroxyzine) for nighttime itching. H2 blockers (famotidine) may be added for refractory cases. Oral corticosteroids reserved for severe or refractory.",
                a: "Topical steroids are less effective than systemic antihistamines for generalized hives.",
                c: "Antibiotics don't treat urticaria (usually viral-triggered).",
                d: "Immunosuppressants are reserved for chronic refractory cases."
            },
            testTakingTip: "Urticaria first-line = H1 antihistamine. H2 blocker adjunct for refractory. Steroids for severe.",
            guideSection: "Section 5 \u2014 Medications",
            guideSectionId: "meds"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 3-month-old has red, shiny patches on the buttocks, spares the skin folds, and is not improving with frequent diaper changes. What is the MOST appropriate next step?",
            options: [
                { id: "a", text: "Apply topical clotrimazole immediately" },
                { id: "b", text: "Apply generous zinc oxide barrier cream with every diaper change and give air time" },
                { id: "c", text: "Start oral antibiotics" },
                { id: "d", text: "Use scented baby wipes to clean the area" }
            ],
            correct: "b",
            rationale: {
                correct: "Red shiny patches on convex surfaces sparing the skin folds is classic irritant diaper dermatitis. Treatment: frequent diaper changes, zinc oxide barrier cream generously applied, and air time. If no improvement in 2\u20133 days, then consider candidal superinfection and add nystatin or clotrimazole.",
                a: "Antifungal is second-line \u2014 irritant diaper rash responds to barrier cream first.",
                c: "Antibiotics aren't indicated for irritant dermatitis.",
                d: "Scented/alcohol wipes irritate the skin further."
            },
            testTakingTip: "Irritant diaper rash first-line: barrier cream + frequent changes + air time.",
            guideSection: "Section 2 \u2014 Contact & Diaper Dermatitis",
            guideSectionId: "contact"
        },
        {
            id: 14,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for four pediatric patients. Which child requires the MOST urgent assessment?",
            options: [
                { id: "a", text: "A 5-year-old with mild atopic dermatitis requesting moisturizer" },
                { id: "b", text: "A 2-month-old with irritant diaper rash whose parent is asking about creams" },
                { id: "c", text: "A 10-year-old who developed facial swelling, wheezing, and hives after eating a cookie with peanuts" },
                { id: "d", text: "A 14-year-old with urticaria and itching after a viral illness" }
            ],
            correct: "c",
            rationale: {
                correct: "Anaphylaxis \u2014 hives + facial swelling + wheezing after food allergen exposure \u2014 is the most urgent priority. IM epinephrine is needed immediately. The other patients have less urgent needs: mild eczema care, diaper rash teaching, and simple urticaria.",
                a: "Moisturizer education can wait.",
                b: "Diaper rash teaching can wait.",
                d: "Simple urticaria without respiratory or CV signs is not emergent."
            },
            testTakingTip: "Airway > everything. Anaphylaxis patient is always the first priority.",
            guideSection: "Section 3 \u2014 Urticaria & Anaphylaxis",
            guideSectionId: "urticaria"
        }
    ]
};
