/**
 * Hip & Knee Replacement Quiz — Question Data
 * 10 NCLEX-style questions: 5 Single, 3 Ordering, 2 Matrix
 * Types: IDs 1,2,4,6,10=single | IDs 3,7,8=ordering | IDs 5,9=matrix
 */

/* exported hipKneeReplacementQuizData */
var hipKneeReplacementQuizData = {
    guideName: "Hip & Knee Replacement",
    guideSlug: "hip-knee-replacement",
    category: "Musculoskeletal",
    categoryColor: "#8b5cf6",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is caring for a patient who is 12 hours post-operative following a total hip replacement via a POSTERIOR surgical approach. Which instruction is MOST important for the nurse to reinforce with the patient?",
            options: [
                { id: "a", text: "\"Avoid flexing your hip beyond 90 degrees, do not cross your legs, and do not internally rotate the operative leg.\"" },
                { id: "b", text: "\"You may cross your legs when sitting as long as you keep the operative leg on top.\"" },
                { id: "c", text: "\"Avoid extending your hip backward and externally rotating your leg.\"" },
                { id: "d", text: "\"You can bend forward freely to tie your shoes once the anesthesia wears off.\"" }
            ],
            correct: "a",
            rationale: {
                correct: "The posterior approach requires strict posterior hip precautions to prevent posterior dislocation. The 3 Don'ts are: (1) Don't flex the hip beyond 90 degrees (no bending forward past 90°), (2) Don't cross the legs (adduction past midline), and (3) Don't internally rotate the operative leg. These movements place stress on the posterior joint capsule that was surgically opened and repaired.",
                b: "Crossing the legs in ANY position is contraindicated after posterior approach hip replacement. Adduction past midline pushes the femoral head posteriorly against the weakened posterior capsule, risking dislocation.",
                c: "Avoiding extension and external rotation are precautions for the ANTERIOR approach, not the posterior approach. The anterior approach accesses the hip from the front, so movements that stress the anterior capsule (hyperextension, external rotation) are restricted instead.",
                d: "Bending forward to tie shoes requires hip flexion well beyond 90 degrees — this is contraindicated. Patients should use long-handled reachers, sock aids, and elastic shoelaces to avoid excessive hip flexion."
            },
            testTakingTip: "Posterior approach = Posterior precautions (the 3 Don'ts): No flexion >90°, No adduction (crossing legs), No internal rotation. Anterior approach = opposite restrictions: No hyperextension, No external rotation. The mnemonic: 'Posterior = Don't go Posterior (don't flex forward/cross/turn in).'",
            guideSection: "Section 5 — Hip Precautions",
            guideSectionId: "hip-precautions"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient is post-operative day 2 after a total knee replacement. The nurse notes the patient's operative leg is warm, swollen from mid-thigh to calf, and tender to palpation. The calf circumference is 3 cm larger than the non-operative leg. The patient reports a 'heavy, aching' sensation. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Apply ice packs and elevate the leg — this is expected post-surgical swelling" },
                { id: "b", text: "Notify the provider of suspected deep vein thrombosis and request a stat venous duplex ultrasound" },
                { id: "c", text: "Administer the scheduled enoxaparin (Lovenox) injection" },
                { id: "d", text: "Encourage the patient to ambulate to improve venous return" }
            ],
            correct: "b",
            rationale: {
                correct: "The findings — unilateral swelling (3 cm circumference difference), warmth, tenderness, and a 'heavy/aching' sensation in the operative leg on post-op day 2 — are classic signs of deep vein thrombosis (DVT). Joint replacement is one of the highest-risk procedures for DVT (risk without prophylaxis: 40-60% for TKR). The nurse should immediately notify the provider for evaluation. Venous duplex ultrasound is the gold standard diagnostic test for DVT.",
                a: "While some post-operative swelling is expected, a 3 cm circumference difference with warmth and tenderness is NOT normal. Dismissing this as expected swelling could delay diagnosis and treatment of a potentially fatal DVT → pulmonary embolism.",
                c: "While DVT prophylaxis (enoxaparin) is standard post-joint replacement, administering the scheduled dose does NOT address the current suspected DVT. The patient likely needs therapeutic-dose anticoagulation, not prophylactic dosing, if DVT is confirmed.",
                d: "If DVT is present, ambulation before anticoagulation could dislodge the clot and cause a pulmonary embolism. The patient should be placed on bed rest until DVT is ruled out or therapeutic anticoagulation is initiated."
            },
            labValues: [
                { name: "D-dimer", normal: "<500 ng/mL (elevated in DVT but also post-surgery — low specificity)" },
                { name: "aPTT", normal: "25–35 seconds (for heparin monitoring)" },
                { name: "Anti-Xa Level", normal: "0.5–1.0 IU/mL (for enoxaparin monitoring)" }
            ],
            testTakingTip: "DVT after joint replacement: swelling > 3 cm difference, warmth, tenderness, heavy/aching pain. Do NOT ambulate if DVT suspected — bed rest until ruled out. D-dimer is often elevated post-surgery anyway (poor specificity), so duplex ultrasound is the definitive test. Homan's sign is unreliable and no longer recommended.",
            guideSection: "Section 7 — DVT Prevention",
            guideSectionId: "dvt-prevention"
        },
        {
            id: 3,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a posterior-approach total hip replacement is ready for first ambulation on post-operative day 1. Place the nurse's actions for safe first ambulation in the correct priority sequence.",
            options: [
                { id: "a", text: "Assess vital signs, pain level, and administer prescribed analgesic 30 minutes before planned ambulation" },
                { id: "b", text: "Assist the patient to a seated position at the edge of the bed with the operative leg extended — assess for orthostatic hypotension and dizziness" },
                { id: "c", text: "Apply the prescribed abduction pillow or wedge between the legs before any position change" },
                { id: "d", text: "Assist the patient to stand using a walker, bearing weight as prescribed — reinforce hip precautions (no flexion >90°, no crossing legs, no internal rotation)" },
                { id: "e", text: "Walk the patient a short distance (10-20 feet) with the walker, then safely return to chair — document distance, weight-bearing status, and tolerance" }
            ],
            correct: ["a", "c", "b", "d", "e"],
            rationale: {
                correct: "The correct sequence ensures pain is managed, hip precautions are maintained during every transition, orthostatic changes are assessed before standing, and hip precautions are reinforced during walking.",
                a: "FIRST — Pre-medicate for pain 30 minutes before ambulation. A patient in severe pain will not participate in physical therapy and will splint or guard movements, increasing fall risk. Also assess baseline vitals for comparison.",
                c: "SECOND — Before ANY position change, ensure the abduction pillow/wedge is in place to maintain hip abduction and prevent the patient from crossing legs during the bed-to-sitting transition. This is critical for posterior approach patients.",
                b: "THIRD — Dangle the patient at the bedside with the operative leg extended (to avoid >90° hip flexion). Assess for orthostatic hypotension (drop of >20 mmHg systolic or >10 mmHg diastolic). Post-anesthesia and blood loss make orthostatic changes common.",
                d: "FOURTH — Once hemodynamically stable sitting, assist to standing using a walker. Reinforce weight-bearing restrictions (typically weight-bearing as tolerated for cemented prostheses, toe-touch for uncemented). Verbally cue hip precautions.",
                e: "FIFTH — A short initial walk with documentation of distance, tolerance, and any adverse findings establishes a baseline for progressive mobility goals. Day 1 goal is typically 10-50 feet."
            },
            testTakingTip: "First ambulation after joint replacement: Pre-medicate → Abduction pillow → Dangle/assess orthostatic → Stand with walker → Short walk. Always pre-medicate for pain BEFORE physical therapy. Orthostatic assessment is critical after anesthesia and blood loss. Document everything for the rehab team.",
            guideSection: "Section 8 — Mobility",
            guideSectionId: "mobility"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is providing discharge education to a patient who had a total knee replacement 3 days ago. The patient asks, \"Do I really need to take antibiotics before going to the dentist?\" Which response by the nurse is MOST accurate?",
            options: [
                { id: "a", text: "\"You only need dental antibiotics for the first 6 months after surgery while the prosthesis integrates.\"" },
                { id: "b", text: "\"Current guidelines recommend lifetime antibiotic prophylaxis before dental procedures that involve the gums to prevent prosthetic joint infection.\"" },
                { id: "c", text: "\"Dental antibiotics are only needed if you have other risk factors like diabetes or immunosuppression.\"" },
                { id: "d", text: "\"Dental antibiotics are no longer recommended — that guideline was discontinued.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The American Academy of Orthopaedic Surgeons (AAOS) recommends LIFETIME antibiotic prophylaxis before invasive dental procedures for patients with prosthetic joints. Dental procedures can cause transient bacteremia (bacteria entering the bloodstream from oral flora), which can seed a prosthetic joint and cause devastating prosthetic joint infection (PJI). Amoxicillin 2g orally 1 hour before the procedure is the standard regimen (clindamycin if penicillin-allergic).",
                a: "The prosthesis is a permanent foreign body that remains susceptible to hematogenous seeding for life. The risk does not end after an integration period. Even years after surgery, a dental bacteremia can cause prosthetic joint infection.",
                c: "While patients with diabetes, immunosuppression, or previous PJI are at HIGHER risk, antibiotic prophylaxis is recommended for ALL patients with prosthetic joints regardless of additional risk factors.",
                d: "This is incorrect. The AAOS continues to recommend dental antibiotic prophylaxis for patients with joint replacements. This recommendation has NOT been discontinued."
            },
            testTakingTip: "Prosthetic joint infection prevention: Lifetime dental antibiotic prophylaxis with amoxicillin 2g PO 1 hour before invasive dental procedures. This is a common NCLEX topic for discharge teaching. The prosthesis is a foreign body that bacteria can adhere to — unlike native joints, the immune system cannot effectively clear infections from prosthetic surfaces.",
            guideSection: "Section 9 — Complications",
            guideSectionId: "complications"
        },
        {
            id: 5,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["RN Responsibility", "Can Delegate to UAP"],
            stem: "A nurse is caring for a post-operative total hip replacement patient on post-op day 1. For each task, classify whether it is an RN responsibility or whether it can be delegated to an unlicensed assistive personnel (UAP).",
            options: [
                { id: "a", text: "Performing a neurovascular assessment of the operative leg (pulses, sensation, movement)" },
                { id: "b", text: "Assisting the patient with meals while maintaining proper positioning" },
                { id: "c", text: "Assessing the surgical wound dressing for drainage amount, color, and odor" },
                { id: "d", text: "Assisting the patient with hygiene (bath, oral care) while maintaining hip precautions" },
                { id: "e", text: "Evaluating the patient's response to the prescribed pain medication and reporting to the provider" }
            ],
            correct: { a: "RN Responsibility", b: "Can Delegate to UAP", c: "RN Responsibility", d: "Can Delegate to UAP", e: "RN Responsibility" },
            rationale: {
                correct: "Assessment, evaluation, and clinical judgment are RN responsibilities and cannot be delegated. Assistance with ADLs (meals, hygiene) can be delegated to UAPs who have been trained in hip precautions.",
                a: "RN RESPONSIBILITY — Neurovascular assessment requires clinical judgment to interpret findings (pulse quality, capillary refill, sensation changes) and determine if they indicate complications. Assessment is a step of the nursing process that cannot be delegated.",
                b: "CAN DELEGATE — Assisting with meals is a routine ADL that UAPs can perform. The RN should ensure the UAP understands positioning requirements (elevated seat, abduction pillow, no leaning forward past 90°) before delegating.",
                c: "RN RESPONSIBILITY — Wound assessment requires clinical judgment to determine if drainage is expected (serosanguineous → concerning) or indicates infection (purulent, foul-smelling). The UAP can report what they SEE but cannot assess or interpret.",
                d: "CAN DELEGATE — Hygiene assistance is a routine ADL appropriate for UAP delegation. The RN must ensure the UAP is trained in hip precautions (raised toilet seat, no bending past 90°, abduction maintained) before delegating.",
                e: "RN RESPONSIBILITY — Evaluating medication effectiveness requires clinical judgment (reassessing pain level, observing for adverse effects, determining if the regimen is adequate). Evaluation is a nursing process step that cannot be delegated."
            },
            testTakingTip: "Delegation framework: RN retains Assessment, Teaching, Evaluation, and Unstable patients. UAP can perform routine ADLs, vital signs on stable patients, and assist with mobility — but ONLY after RN has assessed and provided specific instructions. The key question: 'Does this require clinical judgment?' If yes = RN only.",
            guideSection: "Section 6 — Postoperative Care",
            guideSectionId: "postop"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is performing morning assessment on a patient who had a total hip replacement via posterior approach 24 hours ago. The nurse notes the operative leg is shortened, externally rotated, and the patient reports sudden severe hip pain. What should the nurse suspect and do FIRST?",
            options: [
                { id: "a", text: "Suspect hip dislocation — immediately attempt to internally rotate and realign the leg" },
                { id: "b", text: "Suspect hip dislocation — immobilize the leg in the current position and notify the surgeon immediately" },
                { id: "c", text: "Suspect wound dehiscence — remove the dressing and inspect the surgical site" },
                { id: "d", text: "Suspect femoral nerve injury — perform a complete neurological exam of the lower extremity" }
            ],
            correct: "b",
            rationale: {
                correct: "A shortened, externally rotated leg with sudden severe pain after posterior-approach hip replacement is the classic presentation of a POSTERIOR hip dislocation. The nurse should NOT attempt to manipulate the leg — this could worsen nerve/vascular injury. The correct action is to immobilize the limb in its current position, keep the patient still, and immediately notify the surgeon. Closed reduction under anesthesia or sedation is required.",
                a: "NEVER attempt to manually reduce (realign) a dislocated hip prosthesis. This requires sedation/anesthesia and fluoroscopic guidance by the surgeon. Manual manipulation can damage the prosthetic components, fracture bone, or injure the sciatic nerve.",
                c: "The presentation (shortened, rotated leg with sudden pain) is characteristic of dislocation, not wound dehiscence. Wound dehiscence presents with visible wound separation, not extremity position changes.",
                d: "While a neurological exam should be performed, the presentation is classic for dislocation, which is the priority diagnosis. A complete neuro exam should occur after the immediate emergency is addressed — the sciatic nerve can be compressed by the dislocated femoral head."
            },
            testTakingTip: "Posterior dislocation presentation: leg is shortened, externally rotated, and adducted. Anterior dislocation: leg is externally rotated and abducted. Key nursing action: immobilize as found, do NOT attempt reduction. NCLEX trap: the option to 'realign' the leg sounds proactive but is WRONG — this is a surgeon intervention.",
            guideSection: "Section 9 — Complications",
            guideSectionId: "complications"
        },
        {
            id: 7,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient is being discharged home 3 days after a total hip replacement (posterior approach). Place the nurse's discharge teaching priorities in the correct sequence.",
            options: [
                { id: "a", text: "Review hip precautions: no flexion >90°, no crossing legs, no internal rotation — demonstrate use of adaptive equipment (reacher, sock aid, raised toilet seat)" },
                { id: "b", text: "Teach signs of complications requiring immediate medical attention: sudden leg pain/swelling (DVT), chest pain/dyspnea (PE), fever >101.5°F/wound drainage (infection), sudden severe hip pain with leg shortening (dislocation)" },
                { id: "c", text: "Review medication regimen: anticoagulant therapy (duration, administration, bleeding precautions), pain management schedule, and lifetime dental antibiotic prophylaxis" },
                { id: "d", text: "Confirm home safety modifications: remove throw rugs, install grab bars, ensure adequate lighting, arrange ground-floor living if possible" }
            ],
            correct: ["a", "b", "c", "d"],
            rationale: {
                correct: "Discharge teaching prioritizes the most critical safety information first: hip precautions (prevent dislocation), complication recognition (prevent delayed treatment), medication management (prevent DVT/bleeding), and home safety (prevent falls).",
                a: "FIRST — Hip precautions are the highest priority because hip dislocation is the most common early complication of total hip replacement. Patients must understand and demonstrate proper positioning, adaptive equipment use, and movement restrictions before going home.",
                b: "SECOND — Patients must know the warning signs of the most serious complications (DVT, PE, infection, dislocation) and when to seek immediate medical attention. Delayed recognition of these complications can be life-threatening.",
                c: "THIRD — Medication teaching ensures adherence to anticoagulation therapy (typically 2-6 weeks post-op), proper pain management, and understanding of lifetime dental antibiotic prophylaxis to prevent prosthetic joint infection.",
                d: "FOURTH — Home safety assessment and modifications reduce fall risk. Falls are a major threat after joint replacement because they can dislocate the prosthesis or cause periprosthetic fracture. Arrange for home health or physical therapy evaluation if needed."
            },
            testTakingTip: "Discharge teaching priority order: Safety (precautions) → Complications (what to watch for) → Medications (what to take) → Environment (home modifications). Always teach the patient what can KILL them or cause the MOST HARM first. Dislocation and DVT/PE are the big threats early post-op.",
            guideSection: "Section 9 — Complications",
            guideSectionId: "complications"
        },
        {
            id: 8,
            type: "ordering",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient had a total knee replacement this morning. Place the expected post-operative mobility milestones in the correct chronological sequence from day of surgery through discharge.",
            options: [
                { id: "a", text: "Ankle pump exercises and quad sets in bed with CPM machine initiated at 30-40 degrees (post-op day 0)" },
                { id: "b", text: "Dangle at bedside, transfer to chair with assistance, begin weight-bearing as tolerated with walker (post-op day 1)" },
                { id: "c", text: "Ambulate in hallway with walker, PT works on active ROM exercises — goal knee flexion 70-80 degrees (post-op day 1-2)" },
                { id: "d", text: "Stair training with PT (up with good leg, down with operative leg), independent transfers, CPM goal 90+ degrees (post-op day 2-3)" },
                { id: "e", text: "Demonstrate independent ambulation with assistive device, meet discharge criteria: knee flexion ≥90°, independent ADLs, pain controlled on oral meds (post-op day 3-4)" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "Post-TKR mobility follows a progressive sequence: immediate bed exercises → sitting/standing → hallway ambulation → stairs/independence → discharge readiness. Each milestone builds on the previous one.",
                a: "FIRST (Day 0) — On the day of surgery, the patient begins ankle pumps (DVT prevention) and isometric quadriceps sets (muscle activation) in bed. CPM is initiated at a low arc (30-40°) to begin gentle passive ROM and prevent joint adhesions.",
                b: "SECOND (Day 1) — The patient progresses to sitting at the bedside (dangling), then transferring to a chair with nursing assistance. Weight-bearing as tolerated (WBAT) is initiated with a walker, which is the standard for cemented TKR prostheses.",
                c: "THIRD (Day 1-2) — Once the patient can transfer safely, hallway ambulation with a walker begins. Physical therapy initiates active ROM exercises. The initial knee flexion goal is 70-80 degrees, building toward the discharge goal of 90+.",
                d: "FOURTH (Day 2-3) — Stair training is critical for safe discharge since most patients have stairs at home. The rule: 'up with the good, down with the bad' (good leg leads going up, operative leg leads going down). Independent transfers demonstrate functional recovery. CPM continues advancing toward 90+ degrees.",
                e: "FIFTH (Day 3-4) — Discharge criteria include: knee flexion ≥90° (functional minimum for daily activities), independent ambulation with assistive device, ability to perform ADLs independently, and pain controlled on oral medications. Home PT referral is arranged."
            },
            testTakingTip: "TKR mobility milestones: Day 0 = bed exercises + CPM. Day 1 = dangle + chair + walk. Day 2 = hallway + stairs. Day 3-4 = discharge if criteria met. Key goals: knee flexion ≥90° at discharge (needed to climb stairs, get in/out of car). Stair rule: 'good up, bad down.' CPM starts at 30-40° and progresses — it does NOT replace PT.",
            guideSection: "Section 8 — Mobility",
            guideSectionId: "mobility"
        },
        {
            id: 9,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Posterior Approach Precaution", "Anterior Approach Precaution"],
            stem: "A nurse is caring for two patients who both had total hip replacements — one via the posterior approach and one via the anterior approach. Classify each movement restriction to the correct surgical approach.",
            options: [
                { id: "a", text: "Avoid flexing the hip beyond 90 degrees" },
                { id: "b", text: "Avoid hyperextension of the hip (extending the leg behind the body)" },
                { id: "c", text: "Avoid crossing the legs past midline (adduction)" },
                { id: "d", text: "Avoid external rotation of the operative leg" },
                { id: "e", text: "Avoid internal rotation of the operative leg" }
            ],
            correct: { a: "Posterior Approach Precaution", b: "Anterior Approach Precaution", c: "Posterior Approach Precaution", d: "Anterior Approach Precaution", e: "Posterior Approach Precaution" },
            rationale: {
                correct: "Posterior approach precautions prevent posterior dislocation by avoiding movements that push the femoral head backward. Anterior approach precautions prevent anterior dislocation by avoiding movements that push the femoral head forward.",
                a: "POSTERIOR — Flexion >90° pushes the femoral head posteriorly against the surgically weakened posterior capsule. Patients use raised toilet seats, avoid low chairs, and do not bend forward past 90° when sitting.",
                b: "ANTERIOR — Hyperextension pulls the femoral head anteriorly against the anterior capsule. Patients avoid extending the leg behind the body (as in standing and reaching backward, or lying prone).",
                c: "POSTERIOR — Crossing the legs (adduction past midline) pushes the femoral head posteriorly. Patients use an abduction pillow between the legs in bed and avoid crossing legs when sitting.",
                d: "ANTERIOR — External rotation combined with extension stresses the anterior capsule. Patients avoid turning the operative foot outward (duck-footed position), especially when lying supine.",
                e: "POSTERIOR — Internal rotation (turning the foot inward) pushes the femoral head posteriorly. Patients avoid pigeon-toed positioning of the operative leg."
            },
            testTakingTip: "Think about it anatomically: Posterior approach = don't push the hip BACKWARD (flexion, adduction, internal rotation). Anterior approach = don't push the hip FORWARD (extension, external rotation). The precautions protect the side that was surgically opened. NCLEX loves posterior approach questions — memorize the '3 Don'ts.'",
            guideSection: "Section 5 — Hip Precautions",
            guideSectionId: "hip-precautions"
        },
        {
            id: 10,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient who had a total knee replacement 2 days ago suddenly develops acute dyspnea, pleuritic chest pain, tachycardia (HR 130), and an SpO2 of 87% while in bed. The patient is anxious and diaphoretic. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Elevate the head of bed, apply high-flow oxygen, and call a rapid response" },
                { id: "b", text: "Administer a dose of IV heparin per the anticoagulation protocol" },
                { id: "c", text: "Obtain a stat CT pulmonary angiography (CTPA)" },
                { id: "d", text: "Apply sequential compression devices to both legs" }
            ],
            correct: "a",
            rationale: {
                correct: "This patient is presenting with classic signs of pulmonary embolism (PE) — sudden dyspnea, pleuritic chest pain, tachycardia, hypoxemia, anxiety, and diaphoresis — on post-op day 2 after a high-risk surgery. The FIRST actions are: (1) Elevate the HOB to improve respiratory effort, (2) Apply high-flow O2 to address the hypoxemia (SpO2 87%), and (3) Call a rapid response/code for immediate provider evaluation. These are simultaneous nursing actions that address the ABCs.",
                b: "Anticoagulation will likely be initiated once PE is confirmed, but the nurse should NOT independently administer IV heparin without a provider order. The first priority is oxygenation and rapid response activation — the provider will order definitive treatment.",
                c: "CT pulmonary angiography is the gold standard diagnostic test for PE, but diagnostics never come before stabilization. The patient needs oxygen and emergency evaluation first.",
                d: "SCDs are a DVT PREVENTION measure, not a PE treatment. They are useless once embolization has already occurred. Additionally, if the patient has an existing DVT, leg compression could theoretically dislodge additional clot material."
            },
            testTakingTip: "PE after joint replacement: sudden dyspnea + chest pain + tachycardia + hypoxemia = PE until proven otherwise. First actions: O2 + HOB elevated + rapid response. NCLEX will try to tempt you with heparin or CTPA — but always stabilize (ABC) before diagnostics or medication orders. PE is the #1 cause of death after joint replacement.",
            guideSection: "Section 7 — DVT Prevention",
            guideSectionId: "dvt-prevention"
        }
    ]
};
