/**
 * Pediatric Skin Infections Quiz — Question Data
 * NCLEX-style questions covering bacterial, viral, and fungal
 * pediatric skin infections and their management.
 */

/* exported pediatricSkinInfectionsQuizData */
var pediatricSkinInfectionsQuizData = {
    guideName: "Pediatric Skin Infections",
    guideSlug: "pediatric-skin-infections",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 11,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 5-year-old is brought to the clinic with honey-colored crusted lesions around the mouth and nose. The lesions started as small red spots, then vesicles that ruptured. Which treatment is most appropriate for this presentation?",
            options: [
                { id: "a", text: "Oral acyclovir" },
                { id: "b", text: "Topical mupirocin (Bactroban)" },
                { id: "c", text: "Oral griseofulvin" },
                { id: "d", text: "Topical clotrimazole" }
            ],
            correct: "b",
            rationale: {
                correct: "Honey-colored crusts around the nose and mouth are classic for impetigo. Mild/localized impetigo is treated with topical mupirocin TID for 5\u20137 days. Oral antibiotics (cephalexin) are added for widespread or resistant cases.",
                a: "Acyclovir is for HSV, which presents with clustered vesicles on erythematous base, not honey crusts.",
                c: "Griseofulvin is for fungal tinea capitis, not bacterial impetigo.",
                d: "Clotrimazole is antifungal \u2014 wrong class for bacterial impetigo."
            },
            testTakingTip: "Honey-colored crusts = impetigo = mupirocin first-line. Classic NCLEX pattern recognition.",
            guideSection: "Section 1 \u2014 Bacterial",
            guideSectionId: "bacterial"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 10-year-old presents with a painful, fluctuant abscess on the forearm that he thought was a 'spider bite.' Culture is pending. What is the priority intervention?",
            options: [
                { id: "a", text: "Apply warm compresses and observe" },
                { id: "b", text: "Incision and drainage with empiric clindamycin or TMP-SMX" },
                { id: "c", text: "Start oral amoxicillin and reassess in 72 hours" },
                { id: "d", text: "Begin IV vancomycin as outpatient" }
            ],
            correct: "b",
            rationale: {
                correct: "A fluctuant abscess, especially a 'spider bite' presentation, strongly suggests CA-MRSA. Incision and drainage is the primary treatment for abscesses >5 mm; empiric antibiotics effective against MRSA (clindamycin or TMP-SMX) are added. Amoxicillin would not cover MRSA.",
                a: "Warm compresses don't treat an established abscess.",
                c: "Amoxicillin doesn't cover MRSA and delays effective treatment.",
                d: "IV vancomycin is reserved for severe/systemic cases, not outpatient abscesses."
            },
            testTakingTip: "Fluctuant abscess = I&D + MRSA-active antibiotic. CA-MRSA often presents as 'spider bite.'",
            guideSection: "Section 1 \u2014 Bacterial",
            guideSectionId: "bacterial"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a hospitalized toddler with cellulitis of the lower leg. The provider orders IV cefazolin. Which nursing action is MOST important in addition to administering the antibiotic?",
            options: [
                { id: "a", text: "Apply ice packs to reduce swelling" },
                { id: "b", text: "Mark the borders of the erythema with a pen and reassess" },
                { id: "c", text: "Encourage ambulation to prevent DVT" },
                { id: "d", text: "Keep the leg below heart level" }
            ],
            correct: "b",
            rationale: {
                correct: "Marking the borders of the cellulitis and reassessing over time is essential nursing care. If the redness spreads past the line, the antibiotic isn't working or the infection is deeper (necrotizing fasciitis, etc.), and escalation is needed. Elevation of the affected extremity is also appropriate.",
                a: "Warm (not ice) compresses are typical for cellulitis.",
                c: "Ambulation isn't the priority over monitoring infection progression.",
                d: "Elevation above heart level is preferred to reduce swelling."
            },
            testTakingTip: "Mark the cellulitis border. Spread past the line = escalation.",
            guideSection: "Section 1 \u2014 Bacterial",
            guideSectionId: "bacterial"
        },
        {
            id: 4,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 14-day-old neonate presents to the ED with fever, lethargy, poor feeding, and a cluster of small vesicles on the scalp. What is the priority action?",
            options: [
                { id: "a", text: "Observe and recheck in 24 hours" },
                { id: "b", text: "Apply topical antiviral and discharge" },
                { id: "c", text: "Start empiric IV acyclovir and admit for full sepsis workup" },
                { id: "d", text: "Begin oral acyclovir and follow up in 48 hours" }
            ],
            correct: "c",
            rationale: {
                correct: "Any neonate with fever plus vesicles \u2014 or fever + sepsis-like symptoms \u2014 is treated as possible neonatal HSV until proven otherwise. IV acyclovir is started empirically along with a full sepsis workup (blood cultures, CSF, PCR). Delay leads to death or severe neurologic damage.",
                a: "Observation is inappropriate given the severity of neonatal HSV.",
                b: "Topical treatment is inadequate for disseminated or CNS disease.",
                d: "Oral acyclovir is inadequate; IV is required for neonatal HSV."
            },
            testTakingTip: "Neonate + fever + vesicles or sepsis-like = IV acyclovir NOW. Don't wait for PCR.",
            guideSection: "Section 2 \u2014 Viral",
            guideSectionId: "viral"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A 6-year-old presents with round, raised, skin-colored papules with central umbilication scattered on the torso. There is no itching and no systemic symptoms. What is the most likely diagnosis?",
            options: [
                { id: "a", text: "Verruca vulgaris (common warts)" },
                { id: "b", text: "Molluscum contagiosum" },
                { id: "c", text: "Impetigo" },
                { id: "d", text: "Varicella" }
            ],
            correct: "b",
            rationale: {
                correct: "Dome-shaped, skin-colored papules with central umbilication are the classic presentation of molluscum contagiosum (a poxvirus). It's typically benign and self-limiting, resolving in 6\u201312 months without treatment. Avoid scratching to prevent autoinoculation and spread.",
                a: "Warts are rough, cauliflower-like, not dome-shaped with central umbilication.",
                c: "Impetigo has honey-colored crusts, not umbilicated papules.",
                d: "Varicella has vesicles on erythematous base in different stages (macules, papules, vesicles, crusts), often with fever."
            },
            testTakingTip: "Dome + central dimple/umbilication = molluscum. Usually self-resolves.",
            guideSection: "Section 2 \u2014 Viral",
            guideSectionId: "viral"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "An 8-year-old is diagnosed with tinea capitis. Which treatment approach is correct?",
            options: [
                { id: "a", text: "Topical clotrimazole cream for 2 weeks" },
                { id: "b", text: "Selenium sulfide shampoo alone, twice weekly" },
                { id: "c", text: "Oral antifungal (griseofulvin or terbinafine) for 6\u20138 weeks, with selenium sulfide shampoo as adjunct" },
                { id: "d", text: "Oral antibiotic and topical corticosteroid" }
            ],
            correct: "c",
            rationale: {
                correct: "Tinea capitis lives inside the hair shaft, which topical creams cannot penetrate. Systemic (oral) antifungal therapy is required \u2014 griseofulvin or terbinafine for 6\u20138 weeks. Selenium sulfide 2.5% shampoo 2\u20133 times per week reduces spore shedding but doesn't cure the infection.",
                a: "Topical therapy alone is insufficient.",
                b: "Shampoo alone doesn't cure tinea capitis.",
                d: "Tinea is fungal, not bacterial \u2014 antibiotics are inappropriate."
            },
            testTakingTip: "Tinea capitis = ORAL antifungal (6\u20138 wk). Shampoo is adjunct. Classic NCLEX distinction.",
            guideSection: "Section 3 \u2014 Fungal",
            guideSectionId: "fungal"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A breastfeeding mother brings her 2-month-old with white patches in the mouth that don't scrape off easily. The infant is fussy with feeds. Which treatment is correct?",
            options: [
                { id: "a", text: "Nystatin oral suspension for the infant; treat the mother's breasts if symptomatic" },
                { id: "b", text: "Topical steroid cream to the oral mucosa" },
                { id: "c", text: "Oral acyclovir for 7 days" },
                { id: "d", text: "Oral amoxicillin" }
            ],
            correct: "a",
            rationale: {
                correct: "Oral thrush (Candida) in an infant is treated with nystatin oral suspension \u2014 applied to oral mucosa or swish/swallow, 4 times daily for 7\u201314 days. If breastfeeding, the mother's breasts should also be treated (with topical nystatin or similar) to prevent ping-ponging. Pacifiers and bottle nipples should be boiled or replaced.",
                a: "Correct approach.",
                b: "Topical steroids worsen fungal infections.",
                c: "Acyclovir is for herpes, not candida.",
                d: "Amoxicillin is antibacterial, not antifungal."
            },
            testTakingTip: "Oral thrush + breastfeeding = treat baby + mother simultaneously. Boil nipples and pacifiers.",
            guideSection: "Section 3 \u2014 Fungal",
            guideSectionId: "fungal"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A parent of a child with impetigo asks when their child can return to school. What is the correct answer?",
            options: [
                { id: "a", text: "Once all lesions have completely healed" },
                { id: "b", text: "24 hours after starting antibiotics and with lesions covered" },
                { id: "c", text: "7 days after starting antibiotics" },
                { id: "d", text: "Immediately \u2014 impetigo is not contagious" }
            ],
            correct: "b",
            rationale: {
                correct: "Children with impetigo can return to school 24 hours after starting antibiotic therapy and once lesions are covered to prevent spread. Complete healing can take a week or more, but isolation isn't required that long.",
                a: "Full healing isn't required; 24 hr of treatment is the standard.",
                c: "7 days is more isolation than needed.",
                d: "Impetigo IS highly contagious."
            },
            testTakingTip: "Impetigo return-to-school: 24 hr on antibiotics + lesions covered. Key family education.",
            guideSection: "Section 6 \u2014 Family Education",
            guideSectionId: "family"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent asks the nurse to differentiate their baby's diaper rash. The infant has bright red patches in the diaper area WITH satellite lesions and involvement of the skin folds. Which diagnosis is most likely?",
            options: [
                { id: "a", text: "Irritant diaper dermatitis (urine/stool contact)" },
                { id: "b", text: "Candida diaper dermatitis" },
                { id: "c", text: "Atopic dermatitis" },
                { id: "d", text: "Contact dermatitis from baby wipes" }
            ],
            correct: "b",
            rationale: {
                correct: "Candida diaper dermatitis is characterized by beefy red patches with SATELLITE LESIONS and involvement of the skin folds. This distinguishes it from irritant dermatitis (spares skin folds, affects convex surfaces). Treatment is topical nystatin or clotrimazole.",
                a: "Irritant dermatitis spares the folds.",
                c: "Atopic dermatitis typically involves flexor surfaces and face, not diaper area.",
                d: "Contact dermatitis from wipes wouldn't have satellite lesions."
            },
            testTakingTip: "Candida = skin FOLDS + SATELLITE lesions. Irritant = SPARES folds. Major NCLEX distinction.",
            guideSection: "Section 3 \u2014 Fungal",
            guideSectionId: "fungal"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which antibiotic would be MOST appropriate for an outpatient with uncomplicated cellulitis and no MRSA risk factors?",
            options: [
                { id: "a", text: "Amoxicillin" },
                { id: "b", text: "Cephalexin" },
                { id: "c", text: "Vancomycin IV" },
                { id: "d", text: "Metronidazole" }
            ],
            correct: "b",
            rationale: {
                correct: "Cephalexin is first-line for outpatient treatment of uncomplicated cellulitis without MRSA risk factors \u2014 it covers Staph aureus (non-MRSA) and GAS, which cause most cellulitis. Clindamycin is an alternative for penicillin-allergic patients.",
                a: "Amoxicillin doesn't reliably cover Staph aureus.",
                c: "IV vancomycin is reserved for severe/systemic disease or MRSA.",
                d: "Metronidazole covers anaerobes \u2014 not typical for skin infections."
            },
            testTakingTip: "Uncomplicated cellulitis = cephalexin. MRSA cellulitis or abscess = clindamycin or Bactrim.",
            guideSection: "Section 5 \u2014 Treatment",
            guideSectionId: "treatment"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 3-year-old has mouth sores, excessive drooling, fever of 101.8\u00b0F, and refuses to drink. On exam, there are clustered vesicles on erythematous base on the gums and tongue. What is the priority nursing concern?",
            options: [
                { id: "a", text: "Pain management only" },
                { id: "b", text: "Dehydration from reluctance to drink" },
                { id: "c", text: "Bacterial secondary infection" },
                { id: "d", text: "Scarring of the oral mucosa" }
            ],
            correct: "b",
            rationale: {
                correct: "Herpetic gingivostomatitis (primary HSV-1 infection in toddlers) causes painful oral lesions, fever, and feeding/drinking refusal. Dehydration is the primary clinical concern. Cool/cold fluids, popsicles, soft diet, and sometimes IV fluids are key interventions. Acyclovir may be given in severe cases.",
                a: "Pain is important but dehydration is life-threatening in toddlers.",
                c: "Secondary infection can occur but isn't the primary immediate concern.",
                d: "Scarring of oral mucosa isn't typical."
            },
            testTakingTip: "Gingivostomatitis in toddler = hydration is the priority. Cool fluids, popsicles, IV if needed.",
            guideSection: "Section 2 \u2014 Viral",
            guideSectionId: "viral"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which diagnostic test is MOST useful to quickly confirm a suspected fungal infection like tinea corporis?",
            options: [
                { id: "a", text: "Blood culture" },
                { id: "b", text: "KOH (potassium hydroxide) prep" },
                { id: "c", text: "Wood's lamp examination" },
                { id: "d", text: "CBC with differential" }
            ],
            correct: "b",
            rationale: {
                correct: "A KOH prep of scales from the lesion's active edge shows fungal hyphae under the microscope within minutes \u2014 quick, simple, and highly useful for confirming dermatophyte infection. Fungal culture is more specific but takes 2\u20134 weeks.",
                a: "Blood cultures are for systemic disease, not localized skin fungal infection.",
                c: "Wood's lamp has limited utility since the most common US tinea pathogen (T. tonsurans) doesn't fluoresce.",
                d: "CBC is not diagnostic for skin fungus."
            },
            testTakingTip: "Fungal skin infection = KOH prep. Fast and bedside-friendly.",
            guideSection: "Section 4 \u2014 Diagnostics",
            guideSectionId: "diagnostics"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent is concerned their child's warts on the hand keep coming back. Which statement by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "'Warts should be surgically removed immediately to prevent spread.'" },
                { id: "b", text: "'Warts are usually benign and self-limiting \u2014 many resolve in 1\u20132 years. Treatment options include salicylic acid, cryotherapy, or observation.'" },
                { id: "c", text: "'Warts indicate a serious underlying immune problem.'" },
                { id: "d", text: "'Warts are best treated with oral antibiotics.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Warts are caused by HPV and are generally benign, self-limiting conditions \u2014 up to two-thirds resolve spontaneously within 2 years. Treatment options include topical salicylic acid, cryotherapy, duct tape occlusion, or simply observation. Surgical removal is rarely needed.",
                a: "Immediate surgery is not standard for most warts.",
                c: "Benign warts don't usually indicate immune disease.",
                d: "Antibiotics are ineffective \u2014 warts are viral."
            },
            testTakingTip: "Warts = patience. Salicylic acid or cryo; many resolve spontaneously.",
            guideSection: "Section 2 \u2014 Viral",
            guideSectionId: "viral"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is educating parents about preventing recurrent MRSA infections at home. Which statement indicates correct understanding?",
            options: [
                { id: "a", text: "'We'll share towels to be efficient with laundry.'" },
                { id: "b", text: "'Everyone in the family should wash hands often, cover wounds, and not share personal items like razors or towels.'" },
                { id: "c", text: "'Oral antibiotics at home should be kept in case of future outbreaks.'" },
                { id: "d", text: "'We should clean the house with bleach daily.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Hand hygiene, covering wounds, and avoiding sharing of personal items (towels, razors, razors, athletic equipment) are cornerstones of MRSA prevention. Decolonization (chlorhexidine baths, nasal mupirocin) may be recommended for recurrent cases.",
                a: "Sharing towels spreads MRSA.",
                c: "Self-medicating with antibiotics causes resistance and is unsafe.",
                d: "Daily bleach cleaning is excessive and not evidence-based."
            },
            testTakingTip: "MRSA prevention: hand hygiene, cover wounds, don't share personal items. Decolonization for recurrent.",
            guideSection: "Section 6 \u2014 Family Education",
            guideSectionId: "family"
        }
    ]
};
