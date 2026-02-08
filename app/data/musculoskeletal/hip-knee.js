/**
 * Quiz Bank — Hip & Knee Replacement
 * The Nursing Collective
 *
 * 20 questions: 11 single, 4 ordering, 5 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "hkr-qb-001",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient underwent a total hip replacement via the posterior surgical approach. The nurse is reviewing hip precautions with the patient. Which instruction is MOST important for preventing dislocation?",
        options: [
            { id: "a", text: "Avoid flexing the hip beyond 90 degrees, do not cross the legs, and do not internally rotate the operative leg" },
            { id: "b", text: "Keep the legs in a crossed position at all times to maintain alignment" },
            { id: "c", text: "Externally rotate the operative leg and flex the hip past 90 degrees during transfers" },
            { id: "d", text: "Sleep only on the operative side to promote healing of the surgical site" }
        ],
        correct: "a",
        rationale: {
            correct: "Posterior approach hip precautions (the most common approach) include: no hip flexion beyond 90 degrees (no bending forward past 90°), no adduction (no crossing legs or ankles), and no internal rotation of the operative leg. These movements stress the posterior capsule repair and risk dislocation. An abduction pillow or wedge is placed between the legs to maintain proper alignment. Crossing legs, excessive flexion, and internal rotation are the three movements that cause posterior dislocation."
        },
        testTakingTip: "Posterior approach = the 'three NOs': No flexion >90°, No adduction (crossing), No internal rotation. Memory aid: think 'don't bend, cross, or twist.' Anterior approach has DIFFERENT precautions — don't mix them up.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "hip-precautions"
    },

    {
        id: "hkr-qb-002",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "application",
        stem: "On post-operative day 1 after total knee replacement, the nurse assesses the patient's operative knee. Which finding is MOST concerning and requires immediate notification of the surgeon?",
        options: [
            { id: "a", text: "Moderate swelling around the knee with ecchymosis extending to the lower leg" },
            { id: "b", text: "Pain rated 6/10 with movement, controlled to 3/10 with prescribed analgesics" },
            { id: "c", text: "Temperature of 100.2°F (37.9°C) on the evening of POD 1" },
            { id: "d", text: "Calf tenderness with progressive swelling, warmth, and redness in the operative leg below the knee" }
        ],
        correct: "d",
        rationale: {
            correct: "Calf tenderness with progressive swelling, warmth, and redness are classic signs of deep vein thrombosis (DVT), the most serious early complication after knee replacement. Total knee replacement carries one of the highest DVT risks of any surgery. Moderate knee swelling and ecchymosis are expected post-operatively. Pain of 6/10 with movement that responds to analgesics is acceptable on POD 1. Low-grade temperature (<101°F/38.3°C) in the first 48 hours is a common inflammatory response to surgery."
        },
        testTakingTip: "Post-TKR DVT risk is very high. Assess calves bilaterally every shift: swelling, tenderness, warmth, redness, and Homans sign (though unreliable). DVT prevention: SCDs, anticoagulation (enoxaparin or rivaroxaban), early mobilization, and ankle pumps.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "complications"
    },

    {
        id: "hkr-qb-003",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "application",
        stem: "A nurse is assisting a patient who had a posterior approach total hip replacement to the bathroom on POD 1. Which action by the patient requires the nurse to intervene?",
        options: [
            { id: "a", text: "Using the raised toilet seat provided by occupational therapy" },
            { id: "b", text: "Leaning forward to reach for toilet paper, bending the hip well past 90 degrees" },
            { id: "c", text: "Placing the operative leg slightly forward during the sit-to-stand transfer" },
            { id: "d", text: "Using the grab bars and walker for support while standing" }
        ],
        correct: "b",
        rationale: {
            correct: "Leaning forward while seated causes hip flexion beyond 90 degrees, which is contraindicated after posterior approach hip replacement due to the risk of posterior dislocation. The nurse should stop this action immediately and teach the patient to use a reacher or long-handled tool for items and to maintain an upright trunk position. The raised toilet seat, walker use, and slightly forward operative leg position during transfers are all appropriate and encouraged."
        },
        testTakingTip: "Post-posterior hip replacement: the most commonly violated precaution is flexion >90°. This happens during: bending to pick things up, tying shoes, getting in/out of low chairs, and leaning forward on the toilet. Raised toilet seat + reacher + sock aid = essential equipment.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "hip-precautions"
    },

    {
        id: "hkr-qb-004",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is educating a patient about dental care after total joint replacement. Which instruction is correct regarding antibiotic prophylaxis before dental procedures?",
        options: [
            { id: "a", text: "Antibiotics before dental work are never needed after joint replacement" },
            { id: "b", text: "Take prophylactic antibiotics before all dental procedures for the first 2 years after joint replacement to prevent prosthetic joint infection" },
            { id: "c", text: "Antibiotics are only needed if you develop a dental infection, not for routine cleanings" },
            { id: "d", text: "Inform your dentist about your joint replacement so they can determine if antibiotic prophylaxis is appropriate based on your individual risk" }
        ],
        correct: "d",
        rationale: {
            correct: "Current guidelines (ADA/AAOS) do NOT recommend routine antibiotic prophylaxis for all dental procedures after joint replacement. However, the decision should be individualized based on risk factors: immunocompromised patients, those within the first 2 years post-surgery, and patients with prior prosthetic joint infection may benefit. The key teaching point is to ALWAYS inform the dentist about the joint replacement so a shared decision can be made. Previously, blanket antibiotic prophylaxis was recommended, but evidence does not support this for all patients."
        },
        testTakingTip: "Joint replacement + dental work: the correct answer is always 'inform your dentist and discuss individual risk.' Blanket prophylaxis for everyone is outdated. Key risk factors that may warrant antibiotics: immunosuppression, prior joint infection, within 2 years of surgery.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "long-term-care"
    },

    {
        id: "hkr-qb-005",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "analysis",
        stem: "A patient is 6 hours post total hip replacement. The nurse notes a change in the operative leg: it appears shortened and externally rotated compared to the non-operative leg, and the patient reports sudden, severe hip pain. The nurse suspects:",
        options: [
            { id: "a", text: "Periprosthetic fracture of the femur around the prosthesis" },
            { id: "b", text: "Posterior dislocation of the hip prosthesis" },
            { id: "c", text: "Anterior dislocation of the hip prosthesis" },
            { id: "d", text: "Deep surgical site infection causing joint effusion" }
        ],
        correct: "b",
        rationale: {
            correct: "A shortened, externally rotated extremity with sudden severe pain is the classic presentation of POSTERIOR hip dislocation (the most common type after posterior approach surgery). The femoral head displaces posteriorly, causing the leg to appear shortened and externally rotated. Anterior dislocation presents with a LENGTHENED, internally rotated leg. Periprosthetic fracture would present after trauma/weight bearing with inability to bear weight. Infection develops over days, not hours, and presents with warmth, erythema, and fever."
        },
        testTakingTip: "Hip dislocation presentation: Posterior = shortened + externally rotated (most common after posterior approach). Anterior = lengthened + internally rotated (rare). Immediate action: do NOT move the leg, notify the surgeon, prepare for closed reduction under sedation.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "complications"
    },

    {
        id: "hkr-qb-006",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "application",
        stem: "A patient is on post-operative day 2 after total knee replacement. Physical therapy reports the patient achieved 75 degrees of knee flexion during today's session. The nurse notes the continuous passive motion (CPM) machine is set at 0-45 degrees. What is the appropriate action?",
        options: [
            { id: "a", text: "Increase the CPM to 0-75 degrees to match the PT achievement" },
            { id: "b", text: "Follow the CPM settings ordered by the surgeon and document the PT's ROM findings" },
            { id: "c", text: "Discontinue the CPM since the patient is achieving ROM goals with PT" },
            { id: "d", text: "Decrease the CPM settings because excessive flexion increases bleeding risk" }
        ],
        correct: "b",
        rationale: {
            correct: "CPM settings are prescribed by the surgeon and are gradually increased per the surgeon's protocol (typically increasing 5-10 degrees per day as tolerated). The nurse should follow the current order and document the PT's findings for the surgeon to review and adjust the CPM prescription if appropriate. The nurse cannot independently change CPM settings without an order. Active PT ROM may exceed CPM settings because the CPM provides slow, passive motion that the patient tolerates for extended periods."
        },
        testTakingTip: "CPM machines: prescribed by the surgeon, settings are orders (don't change independently). Typical progression: start at 0-30° or 0-45°, increase 5-10° per day. Goal: 90° flexion by discharge. The CPM is used for several hours per day with breaks for PT, rest, and ambulation.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "hkr-qb-007",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is planning multimodal pain management for a patient after total knee replacement. Which combination represents a multimodal approach?",
        options: [
            { id: "a", text: "IV morphine PCA as the sole analgesic, adjusted for pain control" },
            { id: "b", text: "Scheduled acetaminophen, an NSAID (if not contraindicated), a nerve block, and opioids for breakthrough pain" },
            { id: "c", text: "Ice application and elevation only, avoiding all medications" },
            { id: "d", text: "Oral oxycodone every 4 hours around the clock with no adjunct therapies" }
        ],
        correct: "b",
        rationale: {
            correct: "Multimodal analgesia combines multiple drug classes and non-pharmacologic methods to target different pain pathways, improving pain control while reducing opioid requirements. A typical post-TKR multimodal approach includes: scheduled acetaminophen (central pain modulation), NSAID (anti-inflammatory), peripheral nerve block (blocks nerve conduction), and low-dose opioids for breakthrough pain only. This reduces opioid side effects (nausea, constipation, respiratory depression) and improves functional recovery."
        },
        testTakingTip: "Multimodal = multiple pain mechanisms targeted simultaneously. Think of it as layers: baseline (acetaminophen + NSAID) + nerve block + cryotherapy + opioid rescue. The goal is opioid-SPARING, not opioid-free. This is the current standard of care for joint replacement.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "pain-management"
    },

    {
        id: "hkr-qb-008",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "analysis",
        stem: "A patient is 3 weeks post total knee replacement and presents to the orthopedic clinic with increasing knee pain, warmth, erythema, swelling, and a temperature of 101.6°F. Lab work shows WBC 14,500 and ESR/CRP are both elevated. The nurse suspects:",
        options: [
            { id: "a", text: "Normal post-operative inflammation that will resolve with continued physical therapy" },
            { id: "b", text: "Prosthetic joint infection requiring aspiration for culture and likely return to surgery" },
            { id: "c", text: "Deep vein thrombosis in the operative extremity" },
            { id: "d", text: "Component loosening from excessive weight bearing" }
        ],
        correct: "b",
        rationale: {
            correct: "At 3 weeks post-operatively, increasing (not improving) warmth, erythema, swelling, pain, fever, elevated WBC, and elevated inflammatory markers (ESR/CRP) are classic signs of prosthetic joint infection (PJI). Normal post-operative inflammation improves, not worsens, over time. The priority is joint aspiration for culture and sensitivity to identify the organism (most commonly Staphylococcus aureus). Treatment typically requires IV antibiotics, possible surgical irrigation and debridement, or in severe cases, prosthesis removal and staged reimplantation."
        },
        testTakingTip: "Post-joint replacement: improving pain/swelling = normal healing. WORSENING pain/swelling/warmth + fever + elevated labs after the initial recovery period = infection until proven otherwise. PJI requires aspiration before starting antibiotics (to get accurate cultures).",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "complications"
    },

    {
        id: "hkr-qb-009",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "application",
        stem: "A nurse is conducting a pre-discharge assessment for a patient after total hip replacement. Which criterion indicates the patient is NOT yet ready for safe discharge home?",
        options: [
            { id: "a", text: "The patient demonstrates safe transfers to and from bed, chair, and toilet with a walker" },
            { id: "b", text: "The patient can verbalize all hip precautions and demonstrates correct positioning" },
            { id: "c", text: "The patient is unable to safely navigate stairs and lives in a second-floor apartment with no elevator" },
            { id: "d", text: "The patient's pain is controlled with oral analgesics and the surgical wound is clean and dry" }
        ],
        correct: "c",
        rationale: {
            correct: "Safe discharge requires that the patient can function safely in their home environment. If the patient cannot navigate stairs and their home requires stair climbing, they are not safe for home discharge. Options include: additional inpatient rehabilitation until stairs are safe, temporary first-floor living arrangement, home modifications (stair rail, ramp), or transfer to a skilled nursing facility. All other options indicate discharge readiness: safe transfers, knowledge of precautions, and adequate pain control."
        },
        testTakingTip: "Discharge readiness after joint replacement: safe mobility in the home environment, understanding of precautions, pain controlled orally, wound healing, DVT prevention compliance, and follow-up appointments scheduled. Always assess the home environment — the patient must be safe where they're going.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "discharge"
    },

    {
        id: "hkr-qb-010",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient who had a total hip replacement via the ANTERIOR approach asks about activity precautions. Which instruction is correct for the anterior approach?",
        options: [
            { id: "a", text: "The same precautions as posterior approach: no flexion >90°, no crossing legs, no internal rotation" },
            { id: "b", text: "Avoid hyperextension of the hip and excessive external rotation; flexion restrictions are less strict" },
            { id: "c", text: "There are no movement restrictions at all after the anterior approach" },
            { id: "d", text: "No weight bearing on the operative leg for 6 weeks" }
        ],
        correct: "b",
        rationale: {
            correct: "The anterior approach enters through the front of the hip without cutting the posterior muscles/capsule. Therefore, anterior precautions are DIFFERENT from posterior: avoid hyperextension (extending the leg behind the body), avoid excessive external rotation, and avoid combined extension + external rotation. Flexion beyond 90° is generally allowed earlier because the posterior structures are intact. The anterior approach typically has fewer restrictions and faster recovery, but precautions are NOT eliminated entirely — the anterior capsule and muscles need to heal."
        },
        testTakingTip: "Approach determines precautions: Posterior = no flexion >90°, no adduction, no internal rotation (protects posterior repair). Anterior = no hyperextension, no excessive external rotation (protects anterior repair). Always confirm the surgical approach before teaching precautions.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "hip-precautions"
    },

    {
        id: "hkr-qb-011",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with a total knee replacement is receiving enoxaparin (Lovenox) 40 mg subcutaneously daily for DVT prophylaxis. The nurse notes the patient's platelet count has dropped from 210,000 on admission to 88,000 on POD 5. What does the nurse suspect, and what is the priority action?",
        options: [
            { id: "a", text: "Normal post-operative platelet consumption; continue the enoxaparin and recheck in 48 hours" },
            { id: "b", text: "Heparin-induced thrombocytopenia (HIT); hold the enoxaparin immediately and notify the provider" },
            { id: "c", text: "Disseminated intravascular coagulation (DIC); prepare for blood product transfusion" },
            { id: "d", text: "Laboratory error; redraw the sample from a different site" }
        ],
        correct: "b",
        rationale: {
            correct: "A platelet drop of >50% from baseline occurring 5-10 days after starting heparin products (including low-molecular-weight heparins like enoxaparin) is concerning for heparin-induced thrombocytopenia (HIT). This is a serious immune-mediated reaction where antibodies activate platelets, paradoxically causing both thrombocytopenia AND thrombosis. The priority is to stop ALL heparin products immediately, notify the provider, send a HIT antibody panel (PF4 assay), and switch to an alternative anticoagulant (argatroban or fondaparinux). HIT is life-threatening if not recognized."
        },
        testTakingTip: "HIT warning signs: platelet drop >50% from baseline, occurring day 5-10 of heparin therapy. Paradox: low platelets but HIGH clotting risk. Action: STOP all heparin (including flushes), switch anticoagulant, test for HIT antibodies. Never give heparin products to a HIT-positive patient ever again.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "complications"
    },

    // ── ORDERING (4) ─────────────────────────────────────────

    {
        id: "hkr-qb-012",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is organizing the post-operative day 1 morning routine for a patient after total hip replacement. Place the activities in the correct priority order.",
        options: [
            { id: "s1", text: "Administer morning pain medication 30-45 minutes before physical therapy session" },
            { id: "s2", text: "Perform morning assessment: vital signs, neurovascular check of operative leg, surgical site inspection, drain output" },
            { id: "s3", text: "Assist patient with toileting using a raised toilet seat while maintaining hip precautions" },
            { id: "s4", text: "Assist patient to dangling position at bedside, then stand and ambulate with walker per PT goals" },
            { id: "s5", text: "Administer prophylactic anticoagulant (enoxaparin) and verify sequential compression devices are on" }
        ],
        correct: ["s2", "s5", "s1", "s3", "s4"],
        rationale: {
            s2: "Morning assessment first: check vital signs (hemodynamic stability), neurovascular status of operative leg (CMS), surgical dressing and drain output (bleeding), and pain level. This establishes the patient's current status and guides the day's plan.",
            s5: "DVT prevention is a morning priority: administer the anticoagulant as scheduled and verify SCDs are functioning. Post-surgical thrombosis risk is highest in the first 48 hours.",
            s1: "Pre-medicate for pain BEFORE physical therapy. Giving pain medication 30-45 minutes in advance allows peak effect during PT, enabling the patient to participate more fully in rehabilitation.",
            s3: "Toileting with proper equipment (raised toilet seat) addresses a basic need and provides a functional practice opportunity. This also allows the nurse to assess the patient's ability to follow hip precautions.",
            s4: "Progressive mobility (dangle → stand → ambulate) is the rehabilitation goal for POD 1. This should happen after pain is managed and toileting needs are met. PT typically guides this progression."
        },
        testTakingTip: "POD 1 routine: Assess → DVT prevention → Pre-medicate for PT → Basic ADLs → Progressive mobility. The key insight is giving pain medication BEFORE PT, not during or after. Pain-free patients participate better in therapy.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "post-operative"
    },

    {
        id: "hkr-qb-013",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "ordering",
        difficulty: "knowledge",
        stem: "Place the following post-total knee replacement mobility milestones in the typical expected progression order.",
        options: [
            { id: "s1", text: "Ankle pumps and quadriceps sets in bed immediately post-operatively" },
            { id: "s2", text: "Dangle legs at bedside and transfer to chair with assistance (POD 0-1)" },
            { id: "s3", text: "Ambulate in hallway with walker and PT assistance (POD 1-2)" },
            { id: "s4", text: "Navigate stairs with crutches or railing and transition to a cane (POD 2-3)" },
            { id: "s5", text: "Achieve 90 degrees of knee flexion and independent ambulation with assistive device (by discharge)" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Ankle pumps and isometric quad sets begin in the PACU or upon return to the floor. These prevent DVT (ankle pumps) and begin strengthening (quad sets) without stressing the surgical site.",
            s2: "Dangling and chair transfer (often same day or POD 1) is the first gravitational challenge. Monitor for orthostatic hypotension and dizziness.",
            s3: "Hallway ambulation with a walker (POD 1-2) is a major milestone. Weight bearing is typically WBAT for cemented prostheses. Distance increases daily.",
            s4: "Stair navigation (POD 2-3) is essential for discharge. Teach: 'Up with the good, down with the bad' — the non-operative leg leads going up, the operative leg leads going down.",
            s5: "Discharge goals typically include: 90° knee flexion, independent ADLs with assistive device, safe stair navigation, and pain controlled with oral medications."
        },
        testTakingTip: "TKR mobility progression: isometrics → dangle → walk → stairs → independence. 'Up with the good, down with the bad' for stairs. Typical hospital stay: 1-3 days. 90° flexion by discharge is the standard goal.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "rehabilitation"
    },

    {
        id: "hkr-qb-014",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "ordering",
        difficulty: "application",
        stem: "A nurse is providing discharge education to a patient going home after total hip replacement. Place the teaching topics in order of priority.",
        options: [
            { id: "s1", text: "Hip precautions: movements to avoid, how long to maintain them, and adaptive equipment use" },
            { id: "s2", text: "Medication management: anticoagulant schedule, pain medications, and side effects to watch for" },
            { id: "s3", text: "Signs of complications requiring immediate medical attention (infection, DVT, dislocation)" },
            { id: "s4", text: "Home safety modifications: remove rugs, install grab bars, raised toilet seat, shower chair" },
            { id: "s5", text: "Follow-up appointments and activity progression timeline (when to resume driving, work, sexual activity)" }
        ],
        correct: ["s1", "s3", "s2", "s4", "s5"],
        rationale: {
            s1: "Hip precautions are the #1 priority because dislocation is the most common serious early complication and the patient controls this risk with their movements. They must understand what they can and cannot do before leaving.",
            s3: "Recognizing complications ensures the patient seeks help promptly if something goes wrong: signs of infection (fever, increasing redness/swelling, drainage), DVT (calf pain/swelling), and dislocation (sudden pain, leg appears short/rotated).",
            s2: "Medication management (especially anticoagulant compliance for DVT prevention) is critical for safe recovery. The patient must understand the schedule, what to avoid (NSAIDs with certain anticoagulants), and bleeding precautions.",
            s4: "Home safety modifications reduce fall risk. The home should be prepared BEFORE discharge: hazards removed, equipment in place, and a clear path for walker ambulation.",
            s5: "Activity progression and follow-up are important for long-term recovery but are less immediately critical than preventing acute complications."
        },
        testTakingTip: "Discharge teaching priority for joint replacement: precautions (prevent dislocation) → complication recognition → medications → home safety → follow-up timeline. Teach the most dangerous/reversible things first.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "discharge"
    },

    {
        id: "hkr-qb-015",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient after total hip replacement suddenly reports severe hip pain. The operative leg appears shortened and externally rotated. Place the nurse's interventions in the correct priority order.",
        options: [
            { id: "s1", text: "Immobilize the leg in its current position — do NOT attempt to straighten or realign" },
            { id: "s2", text: "Notify the surgeon immediately and describe the leg position and symptoms" },
            { id: "s3", text: "Assess and document vital signs, pain level, and neurovascular status of the operative leg" },
            { id: "s4", text: "Administer prescribed analgesic for pain and keep the patient NPO in anticipation of closed reduction" },
            { id: "s5", text: "Prepare for transport to the OR or procedure suite for closed reduction under sedation" }
        ],
        correct: ["s1", "s3", "s2", "s4", "s5"],
        rationale: {
            s1: "Do NOT move or manipulate the dislocated hip — any movement can damage neurovascular structures or worsen the dislocation. Immobilize in the position found with pillows for support.",
            s3: "Rapid assessment establishes baseline: vital signs (pain-induced tachycardia, hypotension from vasovagal response), pain level, and neurovascular status (check for sciatic nerve compression: foot drop, numbness in the leg).",
            s2: "Notify the surgeon with a clear description: 'The operative leg appears shortened and externally rotated, consistent with posterior dislocation. Patient rates pain 10/10. Neurovascular status is...'",
            s4: "Pain management is humanitarian and medical — severe pain causes vasovagal responses. NPO status prepares for procedural sedation. Closed reduction (manipulation under sedation) is the first-line treatment.",
            s5: "Most dislocations are treated with closed reduction under IV sedation in the first occurrence. If closed reduction fails, open surgical reduction is needed."
        },
        testTakingTip: "Hip dislocation response: Don't move the leg → Assess → Call the surgeon → Medicate and prep for reduction. Key: shortened + externally rotated = posterior dislocation. Lengthened + internally rotated = anterior dislocation. First dislocation usually = closed reduction.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "complications"
    },

    // ── MATRIX (5) ───────────────────────────────────────────

    {
        id: "hkr-qb-016",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each daily activity, indicate whether it violates posterior approach hip precautions or is safe to perform.",
        columns: ["Violates Posterior Precautions", "Safe to Perform"],
        rows: [
            { id: "r1", text: "Sitting in a low recliner chair (seat height below knee level)", correct: "Violates Posterior Precautions" },
            { id: "r2", text: "Using a long-handled shoe horn and sock aid to dress the lower extremities", correct: "Safe to Perform" },
            { id: "r3", text: "Crossing the operative leg over the non-operative leg while sitting", correct: "Violates Posterior Precautions" },
            { id: "r4", text: "Sleeping on the non-operative side with a pillow between the knees", correct: "Safe to Perform" },
            { id: "r5", text: "Bending forward at the waist to pick up an object from the floor", correct: "Violates Posterior Precautions" },
            { id: "r6", text: "Sitting on a raised toilet seat with hips higher than knees", correct: "Safe to Perform" }
        ],
        rationale: {
            correct: "Posterior precautions prevent flexion >90°, adduction, and internal rotation. Violations: low chairs cause >90° hip flexion; crossing legs causes adduction; bending to the floor causes >90° flexion. Safe activities: long-handled aids avoid bending, pillow between knees prevents adduction during sleep, raised toilet seat keeps hips above 90°. Adaptive equipment is essential: raised toilet seat, long-handled reacher, sock aid, shower chair."
        },
        testTakingTip: "Posterior approach daily life rules: chairs must be high (hips above knees), use reachers instead of bending, pillow between legs when sleeping, no low sofas/recliners, no crossing legs, no twisting to reach. Occupational therapy teaches all adaptive techniques.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "hip-precautions"
    },

    {
        id: "hkr-qb-017",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is coordinating care for a patient after total knee replacement. For each task, indicate whether it is the responsibility of the RN, PT (physical therapist), or can be delegated to a UAP.",
        columns: ["RN", "Physical Therapist", "Delegate to UAP"],
        rows: [
            { id: "r1", text: "Setting up and adjusting the CPM machine per the surgeon's ordered settings", correct: "RN" },
            { id: "r2", text: "Progressing ambulation distance and advancing the patient from walker to cane", correct: "Physical Therapist" },
            { id: "r3", text: "Applying ice packs to the operative knee for 20 minutes as per the care plan", correct: "Delegate to UAP" },
            { id: "r4", text: "Evaluating the patient's readiness for stair training and discharge", correct: "Physical Therapist" },
            { id: "r5", text: "Assessing the surgical incision for signs of infection and documenting wound status", correct: "RN" },
            { id: "r6", text: "Assisting the patient to the bedside commode using the walker when the nurse or PT is not available", correct: "Delegate to UAP" }
        ],
        rationale: {
            correct: "RN responsibilities: CPM machine setup (medical device requiring verification of ordered settings), surgical site assessment (clinical judgment required to identify infection). PT responsibilities: advancing mobility progression (requires evaluation of strength, balance, and readiness), discharge readiness evaluation (functional assessment expertise). UAP tasks: applying ice packs (standardized protocol), assisting with transfers to commode using an already-established method (routine care task). Each discipline has a distinct scope in joint replacement recovery."
        },
        testTakingTip: "Joint replacement team roles: RN = medical management (devices, wound assessment, medications, complications). PT = functional progression (gait training, strength, ROM, discharge function). UAP = routine standardized care (ice, assist with transfers, vitals). OT = ADL adaptation (dressing, bathing, adaptive equipment).",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "nursing-care"
    },

    {
        id: "hkr-qb-018",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is assessing patients at various time points after joint replacement. For each finding, indicate whether it is 'Expected Recovery' or 'Complication — Notify Provider.'",
        columns: ["Expected Recovery", "Complication — Notify Provider"],
        rows: [
            { id: "r1", text: "POD 1: Ecchymosis extending from the knee to the mid-calf after TKR", correct: "Expected Recovery" },
            { id: "r2", text: "POD 3: Temperature of 101.8°F with increasing wound redness, warmth, and purulent drainage", correct: "Complication — Notify Provider" },
            { id: "r3", text: "POD 1: Hemovac drain output of 250 mL of sanguineous fluid in 8 hours", correct: "Expected Recovery" },
            { id: "r4", text: "POD 2: Unilateral calf swelling with tenderness, warmth, and a positive Homans sign", correct: "Complication — Notify Provider" },
            { id: "r5", text: "Week 2: Mild stiffness and discomfort that improves with PT exercises", correct: "Expected Recovery" },
            { id: "r6", text: "Week 3: Inability to flex the knee beyond 60 degrees despite consistent PT participation", correct: "Complication — Notify Provider" }
        ],
        rationale: {
            correct: "Expected: ecchymosis tracking by gravity (POD 1), moderate drain output <500 mL/8 hrs, and mild residual stiffness improving with therapy at 2 weeks. Complications: fever + wound changes + purulent drainage at POD 3 = infection (expected post-op temp resolves by 48-72 hrs); unilateral calf signs at POD 2 = DVT (despite prophylaxis); failure to reach 90° flexion by week 3-4 = arthrofibrosis, may need manipulation under anesthesia (MUA)."
        },
        testTakingTip: "Joint replacement timeline: POD 0-2 = expect swelling, ecchymosis, moderate drain output, low-grade temp. POD 3+ = temps should normalize, drainage should decrease. Week 2-4 = progressive ROM improvement. Failure to progress by 3-4 weeks = evaluate for complications.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "hkr-qb-019",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each piece of adaptive equipment, indicate whether it is primarily used after hip replacement or knee replacement.",
        columns: ["Hip Replacement", "Knee Replacement", "Both"],
        rows: [
            { id: "r1", text: "Raised toilet seat", correct: "Hip Replacement" },
            { id: "r2", text: "Continuous passive motion (CPM) machine", correct: "Knee Replacement" },
            { id: "r3", text: "Long-handled shoe horn and sock aid", correct: "Hip Replacement" },
            { id: "r4", text: "Abduction pillow/wedge for sleeping", correct: "Hip Replacement" },
            { id: "r5", text: "Walker or crutches for ambulation", correct: "Both" }
        ],
        rationale: {
            correct: "Hip replacement-specific equipment addresses flexion and adduction restrictions: raised toilet seat (prevents >90° flexion), long-handled aids (avoids bending to feet), abduction pillow (maintains alignment during sleep). Knee replacement uses CPM to restore flexion ROM. Walkers/crutches are used after both procedures for initial ambulation support. Hip patients need more adaptive equipment overall due to stricter positioning restrictions."
        },
        testTakingTip: "Hip replacement = lots of adaptive equipment (all about avoiding bad positions). Knee replacement = CPM machine + ice/elevation (all about regaining ROM). Both = walker, DVT prevention devices, and pain management. Equipment needs drive the discharge planning process.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "equipment"
    },

    {
        id: "hkr-qb-020",
        category: "musculoskeletal",
        topic: "hip-knee-replacement",
        topicLabel: "Hip & Knee Replacement",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each comparison point, indicate whether cemented or uncemented (press-fit) joint prostheses have the advantage.",
        columns: ["Cemented Prosthesis", "Uncemented (Press-Fit) Prosthesis"],
        rows: [
            { id: "r1", text: "Allows immediate full weight bearing after surgery", correct: "Cemented Prosthesis" },
            { id: "r2", text: "Better long-term fixation through bone ingrowth into the porous surface", correct: "Uncemented (Press-Fit) Prosthesis" },
            { id: "r3", text: "Preferred for elderly patients with osteoporotic bone quality", correct: "Cemented Prosthesis" },
            { id: "r4", text: "Preferred for younger, active patients who may need future revision", correct: "Uncemented (Press-Fit) Prosthesis" },
            { id: "r5", text: "Shorter surgical time and more immediate stability", correct: "Cemented Prosthesis" }
        ],
        rationale: {
            correct: "Cemented prostheses use polymethyl methacrylate (PMMA bone cement) for immediate fixation, allowing full weight bearing right away and providing stable fixation even in osteoporotic bone. Preferred for elderly patients with poor bone quality. Uncemented (press-fit) prostheses rely on biological bone ingrowth into the porous-coated surface over 6-12 weeks, providing superior long-term fixation. Preferred for younger, active patients because they preserve more bone stock for potential future revision surgery. Nursing implication: weight-bearing orders differ based on fixation type."
        },
        testTakingTip: "Cemented = instant stability, FWB immediately, better for weak bone (elderly). Uncemented = biological fixation, may have weight-bearing restrictions initially, better long-term durability (younger patients). Always check the operative report for fixation type — it drives your weight-bearing orders.",
        relatedGuide: "hip-knee-replacement.html",
        relatedGuideSection: "surgical-overview"
    }

]);
