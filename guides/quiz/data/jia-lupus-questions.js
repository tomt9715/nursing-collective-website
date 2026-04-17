/**
 * JIA & Pediatric Lupus Quiz — Question Data
 * NCLEX-style questions covering JIA types, pediatric SLE, labs,
 * medication risks, and family education.
 */

/* exported jiaLupusQuizData */
var jiaLupusQuizData = {
    guideName: "JIA & Pediatric Lupus",
    guideSlug: "jia-lupus",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 11,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which description BEST characterizes oligoarticular (pauciarticular) JIA?",
            options: [
                { id: "a", text: "Symmetric involvement of 5 or more joints" },
                { id: "b", text: "Four or fewer joints, often a single large joint like the knee" },
                { id: "c", text: "Daily spiking fevers with salmon-colored rash" },
                { id: "d", text: "Multi-organ involvement with positive ANA and dsDNA" }
            ],
            correct: "b",
            rationale: {
                correct: "Oligoarticular JIA (\u2264 4 joints in first 6 months) is the most common subtype. It often affects a single large joint such as the knee, typically in young girls, and carries the highest risk of asymptomatic uveitis.",
                a: "\u2265 5 joints = polyarticular JIA.",
                c: "Daily spiking fevers with salmon rash = systemic JIA.",
                d: "Multi-organ + ANA + dsDNA = SLE."
            },
            testTakingTip: "Oligo = \u2264 4 joints; Poly = \u2265 5; Systemic = fever + rash + organomegaly.",
            guideSection: "Section 2 \u2014 JIA Types",
            guideSectionId: "jia"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old with oligoarticular JIA needs which eye-care intervention?",
            options: [
                { id: "a", text: "No eye care is needed unless the child complains of pain" },
                { id: "b", text: "Monthly visual acuity tests only" },
                { id: "c", text: "Regular slit-lamp exams every 3\u20136 months to screen for uveitis" },
                { id: "d", text: "Annual dilated fundus exam at 6 years of age" }
            ],
            correct: "c",
            rationale: {
                correct: "Oligoarticular JIA can cause asymptomatic chronic uveitis that progresses to blindness if missed. ANA-positive young girls are at highest risk. Slit-lamp exams every 3\u20136 months are standard.",
                a: "Uveitis is often painless \u2014 waiting for symptoms allows irreversible damage.",
                b: "Visual acuity alone misses early uveitis.",
                d: "Waiting 1 year or starting at a specific age is too late."
            },
            testTakingTip: "Oligoarticular JIA = quiet uveitis = slit lamp every 3\u20136 mo.",
            guideSection: "Section 2 \u2014 JIA Types",
            guideSectionId: "jia"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a child with systemic JIA asks why the fever keeps returning even though their child is taking antibiotics. The BEST nursing response is:",
            options: [
                { id: "a", text: "\u201cThe antibiotics must not be strong enough \u2014 we should switch.\u201d" },
                { id: "b", text: "\u201cIn systemic JIA, fever is caused by inflammation rather than infection, so antibiotics don\u2019t stop it \u2014 the anti-inflammatory medications will.\u201d" },
                { id: "c", text: "\u201cThe child likely has a secondary infection.\u201d" },
                { id: "d", text: "\u201cDaily fevers are always a sign of worsening disease.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Systemic JIA fever is caused by inflammatory cytokines, not infection. Antibiotics do nothing for inflammatory fevers. Anti-inflammatories (NSAIDs, steroids, IL-1/IL-6 inhibitors) bring the fever down as inflammation is controlled.",
                a: "Antibiotics are not the right tool.",
                c: "Infection is a concern but not the cause of daily inflammatory fever.",
                d: "Daily fevers are the characteristic pattern, not necessarily worsening."
            },
            testTakingTip: "Inflammatory fever \u2260 infectious fever. Antibiotics won\u2019t fix it.",
            guideSection: "Section 1 \u2014 Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The malar rash of pediatric SLE characteristically:",
            options: [
                { id: "a", text: "Spreads over the entire face including the nasolabial folds" },
                { id: "b", text: "Spares the nasolabial folds and often appears as a butterfly pattern over cheeks and nose" },
                { id: "c", text: "Appears as discoid scaly lesions only on the scalp" },
                { id: "d", text: "Has pinpoint petechiae across the cheeks" }
            ],
            correct: "b",
            rationale: {
                correct: "The malar (\u201cbutterfly\u201d) rash of SLE spreads across the cheeks and bridge of the nose, classically SPARING the nasolabial folds. This sparing helps distinguish it from other rashes.",
                a: "Malar rash spares the nasolabial folds.",
                c: "Discoid rash is a separate lupus skin finding.",
                d: "Petechiae are seen in ITP, not lupus malar rash."
            },
            testTakingTip: "SLE butterfly rash \u2192 cheeks + nose, spares nasolabial folds.",
            guideSection: "Section 3 \u2014 Pediatric SLE",
            guideSectionId: "lupus"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which lab is MOST SPECIFIC for systemic lupus erythematosus?",
            options: [
                { id: "a", text: "ANA" },
                { id: "b", text: "Rheumatoid factor" },
                { id: "c", text: "Anti-double-stranded DNA (anti-dsDNA)" },
                { id: "d", text: "Elevated ESR" }
            ],
            correct: "c",
            rationale: {
                correct: "Anti-dsDNA is highly specific for SLE and correlates with disease activity, especially lupus nephritis. ANA is sensitive (positive in >95%) but not specific. Anti-Smith is also specific.",
                a: "ANA is a sensitive screening test, not specific.",
                b: "RF is associated with rheumatoid disease and some JIA, not lupus-specific.",
                d: "ESR rises in many inflammatory states."
            },
            testTakingTip: "SLE specific: anti-dsDNA (\u2191 in flare) + anti-Smith.",
            guideSection: "Section 4 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is reviewing labs for a 14-year-old with SLE during a possible flare. Which finding supports ACTIVE disease?",
            options: [
                { id: "a", text: "Elevated C3 and C4" },
                { id: "b", text: "Normal UA and normal anti-dsDNA" },
                { id: "c", text: "LOW C3 and C4 with HIGH anti-dsDNA" },
                { id: "d", text: "Negative ANA" }
            ],
            correct: "c",
            rationale: {
                correct: "Lupus flares consume complement proteins (C3, C4 DROP) and raise anti-dsDNA. These opposing trends are the classic \u201cflare\u201d lab pattern. Monitor closely and intervene.",
                a: "Elevated complement would suggest quiet disease.",
                b: "Normal UA + dsDNA argues against flare.",
                d: "Most SLE patients have positive ANA; negative ANA is rare."
            },
            testTakingTip: "Lupus flare: \u2193 complement + \u2191 dsDNA.",
            guideSection: "Section 4 \u2014 Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The parent of a child on methotrexate for JIA asks about folic acid. The nurse\u2019s BEST response is:",
            options: [
                { id: "a", text: "\u201cStop giving folic acid because it cancels out the methotrexate.\u201d" },
                { id: "b", text: "\u201cGive folic acid daily or weekly as prescribed; it reduces methotrexate side effects without reducing its effectiveness.\u201d" },
                { id: "c", text: "\u201cFolic acid is only needed for the first dose of methotrexate.\u201d" },
                { id: "d", text: "\u201cFolic acid must be taken at the same time as methotrexate for best effect.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Folic acid (or leucovorin) supplementation reduces MTX-related mouth sores, nausea, and hepatotoxicity without impairing efficacy. Typically taken on non-MTX days, not at the same time as MTX.",
                a: "Folic acid does not cancel MTX; it reduces side effects.",
                c: "Folic acid is ongoing, not just the first dose.",
                d: "Give on separate days, not simultaneously."
            },
            testTakingTip: "MTX + folic acid = fewer side effects. Separate days.",
            guideSection: "Section 5 \u2014 Treatment & Meds",
            guideSectionId: "treatment"
        },
        {
            id: 8,
            type: "multi",
            subtype: null,
            difficulty: "application",
            stem: "Which patient teaching is appropriate for a child on long-term corticosteroids for lupus? (Select all that apply.)",
            options: [
                { id: "a", text: "Stop the medication abruptly if you feel better" },
                { id: "b", text: "Monitor for signs of infection and report fever promptly" },
                { id: "c", text: "Expect possible weight gain, moon face, and increased appetite" },
                { id: "d", text: "Avoid live vaccines while on high-dose steroids" },
                { id: "e", text: "Stop taking the medication during school breaks" },
                { id: "f", text: "Take with food to reduce GI upset" }
            ],
            correct: ["b", "c", "d", "f"],
            rationale: {
                correct: "Steroids require strict adherence, infection vigilance, awareness of Cushingoid side effects, avoidance of live vaccines, and taking with food. Never stop abruptly \u2014 adrenal crisis risk. Never stop unilaterally.",
                a: "Abrupt stopping causes adrenal crisis.",
                b: "Correct \u2014 infection risk is high.",
                c: "Correct \u2014 common, expected side effects.",
                d: "Correct \u2014 live vaccines may cause infection in immunosuppression.",
                e: "Do not stop without provider guidance.",
                f: "Correct \u2014 GI protection."
            },
            testTakingTip: "Steroids: never stop abruptly; watch infection; no live vaccines; expect Cushingoid.",
            guideSection: "Section 5 \u2014 Treatment & Meds",
            guideSectionId: "treatment"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which sun-protection teaching is BEST for a teenager with SLE?",
            options: [
                { id: "a", text: "\u201cSunscreen is only needed at the beach.\u201d" },
                { id: "b", text: "\u201cSunscreen SPF 15 applied once daily is sufficient.\u201d" },
                { id: "c", text: "\u201cUse broad-spectrum sunscreen SPF 50+, reapply every 2 hours outdoors, wear a wide-brim hat and UV-protective clothing, and avoid peak sun hours.\u201d" },
                { id: "d", text: "\u201cSun exposure actually helps lupus rashes heal.\u201d" }
            ],
            correct: "c",
            rationale: {
                correct: "UV radiation triggers lupus flares. Broad-spectrum sunscreen SPF 50+, frequent reapplication, hats, UV-protective clothing, and avoiding peak hours reduce risk. Even UV from windows and fluorescent lights can trigger flares.",
                a: "Sun exposure causes flares anywhere, not just beaches.",
                b: "SPF 15 once daily is inadequate.",
                d: "UV exposure worsens lupus."
            },
            testTakingTip: "Lupus sun care: SPF 50+, hat, clothing, avoid peak hours.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "What is the LEADING cause of morbidity and mortality in pediatric SLE?",
            options: [
                { id: "a", text: "Pericarditis" },
                { id: "b", text: "Lupus nephritis (kidney involvement)" },
                { id: "c", text: "Malar rash" },
                { id: "d", text: "Oral ulcers" }
            ],
            correct: "b",
            rationale: {
                correct: "Lupus nephritis develops in 50\u201380% of pediatric lupus and can progress to end-stage renal disease. It is the leading cause of morbidity and mortality. Aggressive treatment and routine monitoring (UA, BP, complement, BUN/Cr) are essential.",
                a: "Serositis is serious but less commonly fatal.",
                c: "Malar rash is classic but not life-threatening.",
                d: "Oral ulcers are uncomfortable but not fatal."
            },
            testTakingTip: "Pediatric SLE mortality driver = lupus nephritis.",
            guideSection: "Section 3 \u2014 Pediatric SLE",
            guideSectionId: "lupus"
        },
        {
            id: 11,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A child with systemic JIA on tocilizumab develops persistent fever, very high ferritin, cytopenias, and hepatitis. The nurse recognizes this as:",
            options: [
                { id: "a", text: "Benign JIA flare" },
                { id: "b", text: "Macrophage activation syndrome (MAS) \u2014 an emergency" },
                { id: "c", text: "Expected response to the biologic" },
                { id: "d", text: "Early sign of medication allergy" }
            ],
            correct: "b",
            rationale: {
                correct: "Macrophage activation syndrome is a life-threatening cytokine storm. Markers: persistent fever, very high ferritin (often >10,000), cytopenias, elevated LFTs, possible DIC. ICU-level care, high-dose steroids, and specific biologics are required.",
                a: "Flares don\u2019t typically present with these severe labs.",
                c: "These findings are pathologic.",
                d: "Allergy doesn\u2019t cause this laboratory picture."
            },
            testTakingTip: "Systemic JIA + extreme ferritin + cytopenias + hepatitis = MAS.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school-age child with JIA is reporting that morning stiffness is preventing her from getting ready for school. Which teaching point should the nurse provide?",
            options: [
                { id: "a", text: "\u201cKeep the affected joint immobilized all night to prevent pain.\u201d" },
                { id: "b", text: "\u201cTake a warm bath or shower on waking and do gentle range-of-motion exercises before school.\u201d" },
                { id: "c", text: "\u201cApply an ice pack to the affected joint for 30 minutes in the morning.\u201d" },
                { id: "d", text: "\u201cSkip physical therapy when you feel stiff.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Morning stiffness responds to warmth and gentle movement. A warm bath or shower followed by ROM exercises is the standard home strategy. Heat soothes stiffness; cold is better for acute swelling after activity. Continued PT/OT improves long-term outcomes.",
                a: "Immobility worsens stiffness.",
                c: "Cold worsens morning stiffness.",
                d: "Skipping PT worsens function."
            },
            testTakingTip: "Warmth + gentle ROM for morning stiffness. Cold for acute swelling.",
            guideSection: "Section 6 \u2014 Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which medication requires TB screening before initiation due to the risk of reactivating latent infection?",
            options: [
                { id: "a", text: "Ibuprofen" },
                { id: "b", text: "Hydroxychloroquine" },
                { id: "c", text: "Tumor necrosis factor (TNF) inhibitor (e.g., etanercept)" },
                { id: "d", text: "Acetaminophen" }
            ],
            correct: "c",
            rationale: {
                correct: "TNF inhibitors can reactivate latent tuberculosis, leading to disseminated disease. TB screening (PPD or interferon-gamma release assay) is required before starting. Also watch for other serious infections.",
                a: "Ibuprofen doesn\u2019t cause TB reactivation.",
                b: "Hydroxychloroquine doesn\u2019t reactivate TB.",
                d: "Acetaminophen doesn\u2019t reactivate TB."
            },
            testTakingTip: "Before biologics (esp. TNF inhibitors) = TB screen.",
            guideSection: "Section 5 \u2014 Treatment & Meds",
            guideSectionId: "treatment"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The parents of a child newly diagnosed with JIA say, \u201cShe needs to stop gymnastics until this is gone.\u201d The BEST nursing response is:",
            options: [
                { id: "a", text: "\u201cYes, she should not do any physical activity.\u201d" },
                { id: "b", text: "\u201cLow-impact activities like swimming or biking are encouraged, and PT can help guide safe participation. Avoiding movement actually worsens JIA.\u201d" },
                { id: "c", text: "\u201cShe should continue competitive gymnastics at full intensity.\u201d" },
                { id: "d", text: "\u201cActivity makes JIA worse \u2014 bed rest is the treatment.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Movement and moderate activity preserve joint function in JIA; inactivity increases stiffness and disability. Low-impact activities and PT-guided exercise are ideal. High-impact contact sports may be limited based on the joint involvement and current flare status.",
                a: "Full restriction is harmful.",
                c: "High-impact activity during a flare may cause harm.",
                d: "Bedrest is not treatment."
            },
            testTakingTip: "JIA: keep moving with guidance; avoid high-impact when active.",
            guideSection: "Section 7 \u2014 Family Education",
            guideSectionId: "family"
        }
    ]
};
