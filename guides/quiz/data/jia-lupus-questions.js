/**
 * JIA & Pediatric Lupus Quiz - Question Data
 * Practice questions covering JIA types, pediatric SLE, labs,
 * medication risks, and family education.
 */

/* exported jiaLupusQuizData */
var jiaLupusQuizData = {
    guideName: "JIA & Pediatric Lupus",
    guideSlug: "jia-lupus",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which description BEST characterizes oligoarticular (pauciarticular) juvenile idiopathic arthritis (JIA)?",
            options: [
                { id: "a", text: "Symmetric involvement of 5 or more joints" },
                { id: "b", text: "Four or fewer joints, often a single large joint like the knee" },
                { id: "c", text: "Daily spiking fevers with salmon-colored rash" },
                { id: "d", text: "Multi-organ involvement with positive antinuclear antibody (ANA) and double-stranded DNA (dsDNA)" }
            ],
            correct: "b",
            rationale: {
                correct: "Oligoarticular juvenile idiopathic arthritis (JIA), with \u2264 4 joints in first 6 months, is the most common subtype. It often affects a single large joint such as the knee, typically in young girls, and carries the highest risk of asymptomatic uveitis.",
                a: "\u2265 5 joints = polyarticular juvenile idiopathic arthritis (JIA).",
                c: "Daily spiking fevers with salmon rash = systemic juvenile idiopathic arthritis (JIA).",
                d: "Multi-organ + antinuclear antibody (ANA) + double-stranded DNA (dsDNA) = systemic lupus erythematosus (SLE)."
            },
            testTakingTip: "Oligo = \u2264 4 joints; Poly = \u2265 5; Systemic = fever + rash + organomegaly.",
            guideSection: "Section 2 - JIA Types",
            guideSectionId: "jia"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old with oligoarticular juvenile idiopathic arthritis (JIA) needs which eye-care intervention?",
            options: [
                { id: "a", text: "No eye care is needed unless the child complains of pain" },
                { id: "b", text: "Monthly visual acuity tests only" },
                { id: "c", text: "Regular slit-lamp exams every 3\u20136 months to screen for uveitis" },
                { id: "d", text: "Annual dilated fundus exam at 6 years of age" }
            ],
            correct: "c",
            rationale: {
                correct: "Oligoarticular juvenile idiopathic arthritis (JIA) can cause asymptomatic chronic uveitis that progresses to blindness if missed. Young girls who are positive for antinuclear antibody (ANA) are at highest risk. Slit-lamp exams every 3\u20136 months are standard.",
                a: "Uveitis is often painless - waiting for symptoms allows irreversible damage.",
                b: "Visual acuity alone misses early uveitis.",
                d: "Waiting 1 year or starting at a specific age is too late."
            },
            testTakingTip: "Oligoarticular juvenile idiopathic arthritis (JIA) = quiet uveitis = slit lamp every 3\u20136 mo.",
            guideSection: "Section 2 - JIA Types",
            guideSectionId: "jia"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of a child with systemic juvenile idiopathic arthritis (JIA) asks why the fever keeps returning even though their child is taking antibiotics. The BEST nursing response is:",
            options: [
                { id: "a", text: "\u201cThe antibiotics must not be strong enough, so we should ask the provider to switch to a stronger one.\u201d" },
                { id: "b", text: "\u201cIn this type of arthritis, fever comes from inflammation, not infection, so antibiotics won\u2019t stop it; anti-inflammatory medicines will.\u201d" },
                { id: "c", text: "\u201cYour child most likely has a second infection on top of the arthritis that the antibiotics are not covering.\u201d" },
                { id: "d", text: "\u201cFevers that keep coming back every day are always a sign that the arthritis is getting worse.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Systemic juvenile idiopathic arthritis (JIA) fever is caused by inflammatory cytokines, not infection. Antibiotics do nothing for inflammatory fevers. Anti-inflammatory treatments such as nonsteroidal anti-inflammatory drugs (NSAIDs), steroids, and interleukin-1 (IL-1) or interleukin-6 (IL-6) inhibitors bring the fever down as inflammation is controlled.",
                a: "Antibiotics are not the right tool.",
                c: "Infection is a concern but not the cause of daily inflammatory fever.",
                d: "Daily fevers are the characteristic pattern, not necessarily worsening."
            },
            testTakingTip: "Inflammatory fever \u2260 infectious fever. Antibiotics won\u2019t fix it.",
            guideSection: "Section 1 - Fundamentals",
            guideSectionId: "fundamentals"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The malar rash of pediatric systemic lupus erythematosus (SLE) characteristically:",
            options: [
                { id: "a", text: "Spreads over the entire face, including the nasolabial folds and the forehead" },
                { id: "b", text: "Spares the nasolabial folds and often appears as a butterfly pattern over cheeks and nose" },
                { id: "c", text: "Appears as raised, scaly, coin-shaped plaques that leave scars as they heal" },
                { id: "d", text: "Has pinpoint petechiae scattered across the cheeks, chin, and forehead" }
            ],
            correct: "b",
            rationale: {
                correct: "The malar (\u201cbutterfly\u201d) rash of systemic lupus erythematosus (SLE) spreads across the cheeks and bridge of the nose, classically SPARING the nasolabial folds. This sparing helps distinguish it from other rashes.",
                a: "Malar rash spares the nasolabial folds.",
                c: "Discoid rash is a separate lupus skin finding.",
                d: "Petechiae are seen in immune thrombocytopenia (ITP), not lupus malar rash."
            },
            testTakingTip: "Systemic lupus erythematosus (SLE) butterfly rash \u2192 cheeks + nose, spares nasolabial folds.",
            guideSection: "Section 3 - Pediatric SLE",
            guideSectionId: "lupus"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which lab is MOST SPECIFIC for systemic lupus erythematosus?",
            options: [
                { id: "a", text: "Antinuclear antibody (ANA) screening titer" },
                { id: "b", text: "Rheumatoid factor (RF) antibody titer" },
                { id: "c", text: "Anti-double-stranded deoxyribonucleic acid (anti-dsDNA)" },
                { id: "d", text: "Elevated erythrocyte sedimentation rate (ESR)" }
            ],
            correct: "c",
            rationale: {
                correct: "Anti-double-stranded DNA (anti-dsDNA) is highly specific for systemic lupus erythematosus (SLE) and correlates with disease activity, especially lupus nephritis. Antinuclear antibody (ANA) is sensitive (positive in >95%) but not specific. Anti-Smith is also specific.",
                a: "Antinuclear antibody (ANA) is a sensitive screening test, not specific.",
                b: "Rheumatoid factor (RF) is associated with rheumatoid disease and some juvenile idiopathic arthritis (JIA), not lupus-specific.",
                d: "Erythrocyte sedimentation rate (ESR) rises in many inflammatory states."
            },
            testTakingTip: "Systemic lupus erythematosus (SLE) specific: anti-double-stranded DNA (anti-dsDNA), which rises in a flare, + anti-Smith.",
            guideSection: "Section 4 - Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is reviewing labs for a 14-year-old with systemic lupus erythematosus (SLE) during a possible flare. Which finding supports ACTIVE disease?",
            options: [
                { id: "a", text: "HIGH C3 and C4 with normal anti-double-stranded DNA (anti-dsDNA)" },
                { id: "b", text: "Normal urinalysis and normal anti-double-stranded DNA (anti-dsDNA)" },
                { id: "c", text: "LOW C3 and C4 with HIGH anti-double-stranded DNA (anti-dsDNA)" },
                { id: "d", text: "Negative antinuclear antibody (ANA) with normal C3 and C4" }
            ],
            correct: "c",
            rationale: {
                correct: "Lupus flares consume complement proteins (C3, C4 DROP) and raise anti-double-stranded DNA (anti-dsDNA). These opposing trends are the classic \u201cflare\u201d lab pattern. Monitor closely and intervene.",
                a: "Elevated complement would suggest quiet disease.",
                b: "Normal urinalysis (UA) + double-stranded DNA (dsDNA) argues against flare.",
                d: "Most systemic lupus erythematosus (SLE) patients have positive antinuclear antibody (ANA); negative ANA is rare."
            },
            testTakingTip: "Lupus flare: \u2193 complement + \u2191 double-stranded DNA (dsDNA).",
            guideSection: "Section 4 - Diagnosis",
            guideSectionId: "diagnosis"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The parent of a child on methotrexate for juvenile idiopathic arthritis (JIA) asks about folic acid. The nurse\u2019s BEST response is:",
            options: [
                { id: "a", text: "\u201cStop giving folic acid, because it cancels out the methotrexate and keeps it from working.\u201d" },
                { id: "b", text: "\u201cGive folic acid as prescribed; it reduces methotrexate side effects without making it less effective.\u201d" },
                { id: "c", text: "\u201cFolic acid is only needed with the first dose of methotrexate, and then it can be stopped.\u201d" },
                { id: "d", text: "\u201cFolic acid must be taken at the same time as methotrexate so the two work together best.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Folic acid (or leucovorin) supplementation reduces mouth sores, nausea, and hepatotoxicity from methotrexate (MTX) without impairing efficacy. Typically taken on non-MTX days, not at the same time as MTX.",
                a: "Folic acid does not cancel methotrexate (MTX); it reduces side effects.",
                c: "Folic acid is ongoing, not just the first dose.",
                d: "Give on separate days, not simultaneously."
            },
            testTakingTip: "Methotrexate (MTX) + folic acid = fewer side effects. Separate days.",
            guideSection: "Section 5 - Treatment & Meds",
            guideSectionId: "treatment"
        },
        {
            id: 8,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "Which patient teaching is appropriate for a child on long-term corticosteroids for lupus? (Select all that apply.)",
            options: [
                { id: "a", text: "Stop the medication abruptly if you feel better" },
                { id: "b", text: "Monitor for signs of infection and report fever promptly" },
                { id: "c", text: "Expect possible weight gain, moon face, and increased appetite" },
                { id: "d", text: "Avoid live vaccines while on high-dose steroids" },
                { id: "e", text: "Stop taking the medication during school breaks" },
                { id: "f", text: "Take with food to reduce gastrointestinal (GI) upset" }
            ],
            correct: ["b", "c", "d", "f"],
            rationale: {
                correct: "Steroids require strict adherence, infection vigilance, awareness of Cushingoid side effects, avoidance of live vaccines, and taking with food. Never stop abruptly - adrenal crisis risk. Never stop unilaterally.",
                a: "Abrupt stopping causes adrenal crisis.",
                b: "Correct - infection risk is high.",
                c: "Correct - common, expected side effects.",
                d: "Correct - live vaccines may cause infection in immunosuppression.",
                e: "Do not stop without provider guidance.",
                f: "Correct - gastrointestinal (GI) protection."
            },
            testTakingTip: "Steroids: never stop abruptly; watch infection; no live vaccines; expect Cushingoid.",
            guideSection: "Section 5 - Treatment & Meds",
            guideSectionId: "treatment"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Which sun-protection teaching is BEST for a teenager with systemic lupus erythematosus (SLE)?",
            options: [
                { id: "a", text: "\u201cSunscreen is only needed at the beach or pool, so regular days outside do not need it.\u201d" },
                { id: "b", text: "\u201cSunscreen with sun protection factor (SPF) 15 applied once each morning is enough protection for the whole school day.\u201d" },
                { id: "c", text: "\u201cUse broad-spectrum sunscreen with sun protection factor (SPF) 50+, reapply every 2 hours, wear a wide-brim hat, and avoid peak sun hours.\u201d" },
                { id: "d", text: "\u201cSome sun exposure actually helps lupus rashes heal faster, so short periods outside are fine.\u201d" }
            ],
            correct: "c",
            rationale: {
                correct: "Ultraviolet (UV) radiation triggers lupus flares. Broad-spectrum sunscreen with sun protection factor (SPF) 50+, frequent reapplication, hats, UV-protective clothing, and avoiding peak hours reduce risk. Even UV from windows and fluorescent lights can trigger flares.",
                a: "Sun exposure causes flares anywhere, not just beaches.",
                b: "Sun protection factor (SPF) 15 once daily is inadequate.",
                d: "Ultraviolet (UV) exposure worsens lupus."
            },
            testTakingTip: "Lupus sun care: sun protection factor (SPF) 50+, hat, clothing, avoid peak hours.",
            guideSection: "Section 6 - Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "What is the LEADING cause of morbidity and mortality in pediatric systemic lupus erythematosus (SLE)?",
            options: [
                { id: "a", text: "Pericarditis (heart lining inflammation)" },
                { id: "b", text: "Lupus nephritis (kidney involvement)" },
                { id: "c", text: "Malar rash (butterfly facial rash)" },
                { id: "d", text: "Oral ulcers (sores on the palate)" }
            ],
            correct: "b",
            rationale: {
                correct: "Lupus nephritis develops in 50\u201380% of pediatric lupus and can progress to end-stage renal disease. It is the leading cause of morbidity and mortality. Aggressive treatment and routine monitoring (urinalysis, BP, complement, blood urea nitrogen and creatinine) are essential.",
                a: "Serositis is serious but less commonly fatal.",
                c: "Malar rash is classic but not life-threatening.",
                d: "Oral ulcers are uncomfortable but not fatal."
            },
            testTakingTip: "Pediatric systemic lupus erythematosus (SLE) mortality driver = lupus nephritis.",
            guideSection: "Section 3 - Pediatric SLE",
            guideSectionId: "lupus"
        },
        {
            id: 11,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A child with systemic juvenile idiopathic arthritis (JIA) on tocilizumab develops persistent fever, very high ferritin, cytopenias, and hepatitis. The nurse recognizes this as:",
            options: [
                { id: "a", text: "Benign juvenile idiopathic arthritis (JIA) flare that will settle on its own" },
                { id: "b", text: "Macrophage activation syndrome (MAS) - an emergency" },
                { id: "c", text: "Expected response to the biologic medication" },
                { id: "d", text: "Early sign of a medication allergy to tocilizumab" }
            ],
            correct: "b",
            rationale: {
                correct: "Macrophage activation syndrome is a life-threatening cytokine storm. Markers: persistent fever, very high ferritin (often >10,000), cytopenias, elevated liver function tests (LFTs), possible disseminated intravascular coagulation (DIC). ICU-level care, high-dose steroids, and specific biologics are required.",
                a: "Flares don\u2019t typically present with these severe labs.",
                c: "These findings are pathologic.",
                d: "Allergy doesn\u2019t cause this laboratory picture."
            },
            testTakingTip: "Systemic juvenile idiopathic arthritis (JIA) + extreme ferritin + cytopenias + hepatitis = macrophage activation syndrome (MAS).",
            guideSection: "Section 6 - Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A school-age child with juvenile idiopathic arthritis (JIA) is reporting that morning stiffness is preventing her from getting ready for school. Which teaching point should the nurse provide?",
            options: [
                { id: "a", text: "\u201cKeep the stiff joint immobilized in a splint all night to prevent morning pain.\u201d" },
                { id: "b", text: "\u201cTake a warm bath or shower on waking and do gentle range-of-motion exercises before school.\u201d" },
                { id: "c", text: "\u201cApply an ice pack to the affected joint for 30 minutes in the morning.\u201d" },
                { id: "d", text: "\u201cSkip physical therapy and stretching on the mornings you feel stiff.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Morning stiffness responds to warmth and gentle movement. A warm bath or shower followed by range-of-motion (ROM) exercises is the standard home strategy. Heat soothes stiffness; cold is better for acute swelling after activity. Continued physical therapy (PT) and occupational therapy (OT) improve long-term outcomes.",
                a: "Immobility worsens stiffness.",
                c: "Cold worsens morning stiffness.",
                d: "Skipping physical therapy (PT) worsens function."
            },
            testTakingTip: "Warmth + gentle range-of-motion (ROM) exercise for morning stiffness. Cold for acute swelling.",
            guideSection: "Section 6 - Nursing Priorities",
            guideSectionId: "nursing"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which medication requires tuberculosis (TB) screening before initiation due to the risk of reactivating latent infection?",
            options: [
                { id: "a", text: "Nonsteroidal anti-inflammatory drug (e.g., ibuprofen)" },
                { id: "b", text: "Antimalarial agent (e.g., hydroxychloroquine)" },
                { id: "c", text: "Tumor necrosis factor (TNF) inhibitor (e.g., etanercept)" },
                { id: "d", text: "Analgesic and antipyretic (e.g., acetaminophen)" }
            ],
            correct: "c",
            rationale: {
                correct: "Tumor necrosis factor (TNF) inhibitors can reactivate latent tuberculosis, leading to disseminated disease. Tuberculosis (TB) screening with a purified protein derivative (PPD) skin test or interferon-gamma release assay is required before starting. Also watch for other serious infections.",
                a: "Ibuprofen doesn\u2019t cause tuberculosis (TB) reactivation.",
                b: "Hydroxychloroquine doesn\u2019t reactivate tuberculosis (TB).",
                d: "Acetaminophen doesn\u2019t reactivate tuberculosis (TB)."
            },
            testTakingTip: "Before starting biologics, especially tumor necrosis factor (TNF) inhibitors, screen for tuberculosis (TB).",
            guideSection: "Section 5 - Treatment & Meds",
            guideSectionId: "treatment"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The parents of a child newly diagnosed with juvenile idiopathic arthritis (JIA) say, \u201cShe needs to stop gymnastics until this is gone.\u201d The BEST nursing response is:",
            options: [
                { id: "a", text: "\u201cYes, she should stop all physical activity, including gym class, until the arthritis goes away.\u201d" },
                { id: "b", text: "\u201cLow-impact activity like swimming or biking is encouraged, and physical therapy can guide safe participation.\u201d" },
                { id: "c", text: "\u201cShe should keep doing competitive gymnastics at full intensity, even during a flare.\u201d" },
                { id: "d", text: "\u201cActivity makes arthritis worse, so bed rest is the main treatment until her joints stop hurting.\u201d" }
            ],
            correct: "b",
            rationale: {
                correct: "Movement and moderate activity preserve joint function in juvenile idiopathic arthritis (JIA); inactivity increases stiffness and disability. Low-impact activities and exercise guided by physical therapy (PT) are ideal. High-impact contact sports may be limited based on the joint involvement and current flare status.",
                a: "Full restriction is harmful.",
                c: "High-impact activity during a flare may cause harm.",
                d: "Bedrest is not treatment."
            },
            testTakingTip: "Juvenile idiopathic arthritis (JIA): keep moving with guidance; avoid high-impact when active.",
            guideSection: "Section 7 - Family Education",
            guideSectionId: "family"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "application",
            stem: "A child with oligoarticular juvenile idiopathic arthritis (JIA) has a normal eye examination and no visual complaints. The parent asks whether eye appointments are still needed. What should the nurse explain?",
            options: [
                { id: "a", text: "Slit-lamp screening continues every 3 to 6 months regardless" },
                { id: "b", text: "Screening can stop now that the examination is normal" },
                { id: "c", text: "Screening is only needed if the child reports eye pain" },
                { id: "d", text: "Screening is repeated once a year from this point on" }
            ],
            correct: "a",
            rationale: {
                correct: "Uveitis in oligoarticular juvenile idiopathic arthritis (JIA) is silent, so it is found by screening rather than by symptoms. Slit-lamp examination continues every 3 to 6 months and is booked even when the eye looks normal.",
                b: "A normal examination reflects today only. The risk continues, which is why the schedule does.",
                c: "Waiting for pain misses the point, because this uveitis does not hurt until damage is done.",
                d: "Annual screening is too infrequent for the subtype that carries the highest uveitis risk."
            },
            testTakingTip: "Oligoarticular drives the eye screening schedule. Silent uveitis is caught by the calendar, not by the child complaining.",
            guideSection: "Section 10 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
