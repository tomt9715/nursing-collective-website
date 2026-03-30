/**
 * Seizures & Epilepsy Quiz — Question Data
 * 15 NCLEX-style questions: 6 Single, 3 Priority, 3 Matrix, 2 Ordering, 1 Single (knowledge)
 */

/* exported seizuresQuizData */
var seizuresQuizData = {
    guideName: "Seizures & Epilepsy",
    guideSlug: "seizures",
    category: "Neurological",
    categoryColor: "#8b5cf6",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse enters a patient's room and finds the patient having a generalized tonic-clonic seizure. The patient is in bed with the side rails up. What is the nurse's PRIORITY action?",
            options: [
                { id: "a", text: "Insert an oral airway to maintain a patent airway" },
                { id: "b", text: "Restrain the patient's arms and legs to prevent injury" },
                { id: "c", text: "Note the time and protect the patient from injury by moving nearby objects" },
                { id: "d", text: "Administer the PRN lorazepam IV immediately" }
            ],
            correct: "c",
            rationale: {
                correct: "The immediate priority during an active seizure is safety: note the time of onset (to determine if status epilepticus develops) and protect from injury by moving hard objects away and ensuring the patient cannot fall. Timing is critical because if the seizure exceeds 5 minutes, it becomes status epilepticus requiring emergency intervention.",
                a: "NEVER insert anything into the mouth during an active seizure. This can cause broken teeth, oral lacerations, aspiration, or injury to the nurse's fingers. An oral airway may be placed AFTER the seizure ends if needed.",
                b: "Restraining a seizing patient can cause musculoskeletal injuries including fractures and dislocations. Guide movements gently but do NOT hold the patient down.",
                d: "While lorazepam may be needed if the seizure lasts >5 minutes (status epilepticus), the immediate priority is ensuring safety. The seizure has just begun — most seizures self-terminate within 1-2 minutes."
            },
            testTakingTip: "During a seizure: Safety FIRST (protect, time, observe). Do NOT insert anything in the mouth. Do NOT restrain. Medications are given only if the seizure is prolonged (>5 min = status epilepticus).",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A school nurse is called to evaluate a 7-year-old who was 'staring into space' during class for about 15 seconds, then resumed activities as if nothing happened. The teacher reports this occurs multiple times per day. Which seizure type does the nurse suspect?",
            options: [
                { id: "a", text: "Focal aware seizure (simple partial)" },
                { id: "b", text: "Absence seizure (petit mal)" },
                { id: "c", text: "Atonic seizure (drop attack)" },
                { id: "d", text: "Myoclonic seizure" }
            ],
            correct: "b",
            rationale: {
                correct: "This is a classic presentation of absence seizures: brief staring episodes (5-30 seconds), abrupt onset and offset, no postictal confusion, occurring multiple times daily, common in school-age children (ages 4-12). Teachers often notice before parents because the child appears to be daydreaming in class.",
                a: "Focal aware seizures involve motor, sensory, or autonomic symptoms in a specific body area with preserved consciousness. They do not present as simple staring spells.",
                c: "Atonic seizures ('drop attacks') cause sudden loss of muscle tone, resulting in the patient falling. They do not present as staring episodes.",
                d: "Myoclonic seizures are brief, shock-like muscle jerks. They involve visible motor activity, not quiet staring."
            },
            testTakingTip: "Absence seizures = brief staring (looks like daydreaming), no postictal period, occurs many times/day, school-age children. First-line treatment: ethosuximide. Carbamazepine and phenytoin can WORSEN absence seizures.",
            guideSection: "Section 2 — Seizure Classification",
            guideSectionId: "classification"
        },
        {
            id: 3,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Focal Seizure Finding", "Generalized Seizure Finding"],
            stem: "A nurse is reviewing patient charts to classify seizure types. Classify each clinical finding as characteristic of a focal seizure or a generalized seizure.",
            options: [
                { id: "a", text: "The patient reports an aura of a strange smell before the episode began" },
                { id: "b", text: "The patient had bilateral tonic stiffening followed by rhythmic clonic jerking" },
                { id: "c", text: "The patient displayed lip-smacking and fumbling automatisms with impaired awareness" },
                { id: "d", text: "The patient had a brief 10-second staring spell with no postictal confusion" },
                { id: "e", text: "Jerking started in the right hand and progressed up the right arm (Jacksonian march)" }
            ],
            correct: { a: "Focal Seizure Finding", b: "Generalized Seizure Finding", c: "Focal Seizure Finding", d: "Generalized Seizure Finding", e: "Focal Seizure Finding" },
            rationale: {
                correct: "Auras, automatisms with impaired awareness, and progressive unilateral spread (Jacksonian march) are hallmarks of focal seizures. Bilateral tonic-clonic activity from onset and absence seizures are generalized types.",
                a: "FOCAL — An aura (unusual smell, taste, deja vu, epigastric rising) is actually a focal aware seizure. It indicates the seizure begins in a specific brain region before potentially spreading.",
                b: "GENERALIZED — Bilateral tonic-clonic activity involving both sides of the body from the onset indicates a generalized tonic-clonic (grand mal) seizure.",
                c: "FOCAL — Automatisms (lip smacking, fumbling, picking at clothes) with impaired awareness is the classic presentation of a focal impaired awareness seizure (formerly complex partial). The temporal lobe is the most common origin.",
                d: "GENERALIZED — Brief staring spells with abrupt onset/offset and no postictal confusion describe absence (petit mal) seizures, which are a generalized seizure type involving both hemispheres.",
                e: "FOCAL — Jacksonian march (progressive spread of motor activity from one body part to adjacent areas on the same side) is a classic focal motor seizure pattern that follows the motor cortex homunculus."
            },
            testTakingTip: "Focal seizure clues: aura, one-sided symptoms, automatisms, Jacksonian march, patient can describe partial events. Generalized clues: both sides from onset, loss of consciousness from start, no aura, bilateral convulsions.",
            guideSection: "Section 2 — Seizure Classification",
            guideSectionId: "classification"
        },
        {
            id: 4,
            type: "ordering",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient in the hospital begins having a generalized tonic-clonic seizure. The seizure has lasted 6 minutes and is not stopping. Place the nurse's actions in the correct priority sequence for managing status epilepticus.",
            options: [
                { id: "a", text: "Administer IV lorazepam (Ativan) 4 mg as ordered" },
                { id: "b", text: "Ensure patient safety: side-lying position, suction available, pad side rails" },
                { id: "c", text: "Prepare for fosphenytoin IV loading dose if seizure continues after benzodiazepine" },
                { id: "d", text: "Confirm IV access is patent and draw STAT labs (glucose, electrolytes, AED levels)" }
            ],
            correct: ["b", "d", "a", "c"],
            rationale: {
                correct: "The correct sequence follows ABCs first (safety and airway), then establish access and assess (IV, labs), then first-line medication (benzodiazepine), then second-line if needed (fosphenytoin).",
                b: "FIRST — Patient safety and airway protection is always the immediate priority. Position on side to prevent aspiration, ensure suction is available, and protect from injury.",
                d: "SECOND — Confirm IV access (needed for medication) and draw labs to identify reversible causes (hypoglycemia, hyponatremia, subtherapeutic AED levels). Check blood glucose — give D50 if hypoglycemic.",
                a: "THIRD — Administer the first-line medication: IV lorazepam 4 mg. This is the standard initial treatment for status epilepticus. May repeat once in 5-10 minutes if seizure continues.",
                c: "FOURTH — If seizure persists after benzodiazepine, prepare the second-line agent: fosphenytoin 20 mg PE/kg IV, or valproic acid, or levetiracetam. This step occurs only if the benzodiazepine fails."
            },
            testTakingTip: "Status epilepticus protocol: Safety/ABCs → IV access + labs → Lorazepam IV → Fosphenytoin if needed → ICU for refractory cases. Always check glucose — hypoglycemia can cause seizures and is easily reversible.",
            guideSection: "Section 4 — Status Epilepticus",
            guideSectionId: "status-epilepticus"
        },
        {
            id: 5,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with epilepsy is admitted for breakthrough seizures. The phenytoin (Dilantin) level returns at 25 mcg/mL. The patient is complaining of dizziness and the nurse notices horizontal nystagmus. What is the PRIORITY nursing action?",
            options: [
                { id: "a", text: "Administer the next scheduled dose of phenytoin as ordered" },
                { id: "b", text: "Hold the phenytoin dose and notify the provider of the toxic level and symptoms" },
                { id: "c", text: "Document the findings and recheck the level in 4 hours" },
                { id: "d", text: "Increase IV fluids to help clear the medication faster" }
            ],
            correct: "b",
            rationale: {
                correct: "The therapeutic range for phenytoin is 10-20 mcg/mL. A level of 25 mcg/mL is toxic. The patient's symptoms (dizziness, nystagmus) are classic signs of phenytoin toxicity. The priority is to HOLD the medication to prevent further accumulation and notify the provider immediately for dose adjustment.",
                a: "Giving another dose when the level is already toxic would worsen toxicity symptoms and could lead to ataxia, lethargy, seizures (paradoxically), and cardiac arrhythmias.",
                c: "Simply documenting and rechecking is insufficient when the patient is symptomatic with a toxic drug level. This requires immediate intervention — holding the dose and provider notification.",
                d: "Phenytoin is highly protein-bound and hepatically metabolized. IV fluid boluses do not significantly enhance clearance. The appropriate intervention is to hold the drug."
            },
            labValues: [
                { name: "Phenytoin therapeutic range", normal: "10-20 mcg/mL" },
                { name: "Nystagmus onset", normal: "Typically at >20 mcg/mL" },
                { name: "Ataxia onset", normal: "Typically at >30 mcg/mL" },
                { name: "Lethargy/coma", normal: "Typically at >40 mcg/mL" }
            ],
            testTakingTip: "Phenytoin toxicity progression: nystagmus (>20) → ataxia/slurred speech (>30) → lethargy/confusion (>40) → coma. Nystagmus is the EARLIEST sign of phenytoin toxicity — always check the drug level when you see it.",
            guideSection: "Section 6 — AED Management",
            guideSectionId: "medications"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient who just had a 90-second generalized tonic-clonic seizure. The seizure has stopped, and the patient is drowsy and confused. Which nursing action is MOST appropriate?",
            options: [
                { id: "a", text: "Attempt to orient the patient by asking them to state their name, date, and location" },
                { id: "b", text: "Turn the patient on their side, maintain a quiet environment, and perform a neurological assessment" },
                { id: "c", text: "Encourage the patient to get up and walk to assess motor function" },
                { id: "d", text: "Immediately prepare the patient for an emergent CT scan" }
            ],
            correct: "b",
            rationale: {
                correct: "After a generalized tonic-clonic seizure, the patient enters the postictal phase (drowsiness, confusion, headache). Priority interventions: turn on side (recovery position to maintain airway and drain secretions), provide a quiet environment (reduce stimulation), and perform a neurological assessment to establish baseline and detect complications.",
                a: "While reorientation is appropriate eventually, aggressively questioning a postictal patient immediately after a seizure can increase agitation. Gentle reorientation is better as the patient gradually recovers.",
                c: "A postictal patient is drowsy, confused, and may have muscle weakness. Encouraging ambulation immediately after a seizure increases fall risk. The patient should rest until fully recovered.",
                d: "An emergent CT is not automatically indicated after every seizure, especially in a patient with known epilepsy. CT is indicated for first-time seizures, focal findings, prolonged postictal state, or suspected head injury."
            },
            testTakingTip: "Postictal care: position on side, quiet environment, assess neuro status, check for injuries (tongue biting, head injury), document. Don't rush reorientation — the patient needs time to recover.",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Appropriate Seizure Precaution", "Inappropriate Action"],
            stem: "A nurse is implementing seizure precautions for a newly admitted patient with epilepsy. Classify each action as an appropriate seizure precaution or an inappropriate action.",
            options: [
                { id: "a", text: "Padding the side rails of the bed" },
                { id: "b", text: "Taping a padded tongue blade to the head of the bed" },
                { id: "c", text: "Placing the bed in the lowest position" },
                { id: "d", text: "Keeping suction equipment and oxygen at the bedside" },
                { id: "e", text: "Applying wrist restraints while the patient is sleeping" }
            ],
            correct: { a: "Appropriate Seizure Precaution", b: "Inappropriate Action", c: "Appropriate Seizure Precaution", d: "Appropriate Seizure Precaution", e: "Inappropriate Action" },
            rationale: {
                correct: "Padded side rails, low bed position, and bedside suction/oxygen are standard seizure precautions. Tongue blades and restraints are contraindicated during seizures and should never be at the bedside for that purpose.",
                a: "APPROPRIATE — Padded side rails prevent the patient from hitting their head or limbs against hard surfaces during a seizure.",
                b: "INAPPROPRIATE — Tongue blades (even padded) should NEVER be inserted into the mouth during a seizure. This can cause broken teeth, lacerations, aspiration, and jaw injury. Having one taped to the bed implies it should be used.",
                c: "APPROPRIATE — The lowest bed position minimizes injury if the patient falls during a seizure.",
                d: "APPROPRIATE — Suction clears oral secretions after a seizure, and oxygen addresses potential hypoxia during prolonged seizures.",
                e: "INAPPROPRIATE — Restraints are NEVER used for seizure patients. Restraining a seizing patient causes musculoskeletal injuries including fractures and dislocations."
            },
            testTakingTip: "Seizure precautions: padded rails, low bed, suction, O2, IV access, call light in reach. NEVER: tongue blade, restraints, or anything in the mouth. If you see 'tongue depressor at bedside' in a question, that's the wrong answer.",
            guideSection: "Section 5 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient with epilepsy has been prescribed lamotrigine (Lamictal). The nurse provides medication education. Which statement by the patient indicates a need for FURTHER teaching?",
            options: [
                { id: "a", text: "\"I should report any skin rash to my doctor immediately.\"" },
                { id: "b", text: "\"This medication needs to be started at a low dose and increased slowly.\"" },
                { id: "c", text: "\"If I miss a few doses, I can just double up to catch up.\"" },
                { id: "d", text: "\"I should not stop taking this medication suddenly without talking to my doctor.\"" }
            ],
            correct: "c",
            rationale: {
                correct: "Doubling doses of AEDs is dangerous and can cause toxicity. If a dose is missed, the patient should take it as soon as remembered (unless it's close to the next dose), but never double up. This statement indicates a need for further teaching.",
                a: "CORRECT understanding — Lamotrigine carries a risk of Stevens-Johnson syndrome (SJS), a potentially fatal skin reaction. Any rash must be reported immediately and the drug stopped pending evaluation.",
                b: "CORRECT understanding — Lamotrigine must be titrated very slowly to reduce the risk of Stevens-Johnson syndrome. Rapid titration increases the risk significantly.",
                d: "CORRECT understanding — Abrupt discontinuation of any AED can trigger rebound seizures or status epilepticus. AEDs should always be tapered under provider supervision."
            },
            testTakingTip: "Lamotrigine key facts: slow titration required, Steven-Johnson syndrome risk (STOP if rash), never stop abruptly. 'Need for further teaching' questions = find the WRONG statement.",
            guideSection: "Section 6 — AED Management",
            guideSectionId: "medications"
        },
        {
            id: 9,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for a pregnant patient with epilepsy who is on valproic acid (Depakote). The patient just discovered she is 6 weeks pregnant. What is the nurse's PRIORITY concern?",
            options: [
                { id: "a", text: "Valproic acid can cause weight gain that complicates pregnancy" },
                { id: "b", text: "Valproic acid is highly teratogenic (Category X) and increases the risk of neural tube defects" },
                { id: "c", text: "Valproic acid levels will decrease during pregnancy requiring dose increases" },
                { id: "d", text: "The patient will need to switch to phenytoin which is safer in pregnancy" }
            ],
            correct: "b",
            rationale: {
                correct: "Valproic acid is Category X (contraindicated in pregnancy) and is associated with a significantly increased risk of neural tube defects (spina bifida), craniofacial defects, and cognitive impairment in the fetus. The priority concern is the teratogenic risk, and the provider must be notified immediately for a medication change.",
                a: "While weight gain is a side effect of valproic acid, it is not the priority concern in a pregnant patient compared to the severe teratogenic risk.",
                c: "While AED levels can change during pregnancy due to altered pharmacokinetics, this is a secondary concern compared to the teratogenic risk of continuing valproic acid.",
                d: "Phenytoin is also teratogenic (fetal hydantoin syndrome) and is NOT a safer alternative. Lamotrigine and levetiracetam are generally considered safer options in pregnancy."
            },
            testTakingTip: "Valproic acid = Category X in pregnancy. Neural tube defects (spina bifida) are the #1 concern. All women of childbearing age on AEDs should take folic acid supplementation. Lamotrigine and levetiracetam are considered relatively safer in pregnancy.",
            guideSection: "Section 6 — AED Management",
            guideSectionId: "medications"
        },
        {
            id: 10,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing to administer IV phenytoin (Dilantin) to a patient. Place the nursing actions in the correct sequence.",
            options: [
                { id: "a", text: "Verify the IV line is running normal saline (not dextrose)" },
                { id: "b", text: "Place the patient on continuous cardiac monitoring" },
                { id: "c", text: "Infuse phenytoin at no faster than 50 mg/min using an in-line filter" },
                { id: "d", text: "Assess vital signs and monitor for hypotension and arrhythmias during infusion" }
            ],
            correct: ["b", "a", "c", "d"],
            rationale: {
                correct: "The correct sequence ensures safety: cardiac monitoring first (phenytoin causes arrhythmias), then verify compatible IV solution, then infuse slowly with a filter, then continuously monitor for adverse effects.",
                b: "FIRST — Cardiac monitoring must be in place BEFORE starting the infusion because phenytoin can cause fatal cardiac arrhythmias (bradycardia, heart block, asystole) and hypotension.",
                a: "SECOND — Phenytoin precipitates in dextrose solutions. It MUST be mixed with and infused in normal saline only. Using an existing dextrose line will cause crystallization and line occlusion.",
                c: "THIRD — Phenytoin must be infused slowly (no faster than 50 mg/min in adults, 1-3 mg/kg/min in pediatrics) through an in-line filter. Rapid administration causes cardiovascular collapse.",
                d: "FOURTH — Continuous monitoring of vital signs, heart rhythm, and the IV site during infusion. Watch for purple glove syndrome (tissue necrosis at the IV site), hypotension, and arrhythmias."
            },
            testTakingTip: "Phenytoin IV rules: cardiac monitor ON, normal saline ONLY (no dextrose), slow push (≤50 mg/min), in-line filter, watch for arrhythmias and purple glove syndrome. Fosphenytoin is a safer IV alternative.",
            guideSection: "Section 6 — AED Management",
            guideSectionId: "medications"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent brings their 3-year-old child to the emergency department after a seizure at home. The child had a fever of 103.5°F (39.7°C) from an ear infection. The seizure was generalized, lasted 2 minutes, and has not recurred. The child is now alert and playful. Which statement by the nurse is MOST appropriate?",
            options: [
                { id: "a", text: "\"Your child will need to take seizure medication daily to prevent this from happening again.\"" },
                { id: "b", text: "\"This appears to be a simple febrile seizure, which is common in young children and usually does not cause lasting harm.\"" },
                { id: "c", text: "\"This seizure means your child has epilepsy and will need a neurology referral.\"" },
                { id: "d", text: "\"You should always give Tylenol around the clock to prevent fevers and future seizures.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "This presentation — generalized seizure, <15 minutes, age 6 months to 5 years, associated with fever, single occurrence, alert afterward — is a classic simple febrile seizure. These are common (2-5% of children), benign, and do not cause brain damage or significantly increase epilepsy risk. Parental reassurance and education is appropriate.",
                a: "Simple febrile seizures do NOT require long-term AED therapy. The risk of AED side effects outweighs the benefit for simple febrile seizures.",
                c: "A single febrile seizure does not diagnose epilepsy. Epilepsy requires 2+ unprovoked seizures. Febrile seizures are provoked (by fever) and have a different prognosis.",
                d: "Prophylactic antipyretics (Tylenol/ibuprofen) do NOT prevent febrile seizures. They treat fever-related discomfort but do not change seizure risk. This is a common parental misconception."
            },
            testTakingTip: "Simple febrile seizure: generalized, <15 min, no recurrence in 24 hrs, ages 6mo-5yr. Treatment: treat the fever, reassurance. No AEDs needed. Prophylactic antipyretics do NOT prevent febrile seizures.",
            guideSection: "Section 7 — Pediatric Considerations",
            guideSectionId: "pediatric"
        },
        {
            id: 12,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Correct AED Choice", "Incorrect AED Choice"],
            stem: "A nurse is reviewing medication orders for seizure patients. Classify each medication-seizure type pairing as a correct or incorrect AED choice.",
            options: [
                { id: "a", text: "Ethosuximide prescribed for a child with absence seizures only" },
                { id: "b", text: "Carbamazepine prescribed for a patient with absence seizures" },
                { id: "c", text: "Lorazepam IV ordered for active status epilepticus" },
                { id: "d", text: "Valproic acid prescribed for a 25-year-old woman planning pregnancy" },
                { id: "e", text: "Levetiracetam prescribed for a patient with focal seizures" }
            ],
            correct: { a: "Correct AED Choice", b: "Incorrect AED Choice", c: "Correct AED Choice", d: "Incorrect AED Choice", e: "Correct AED Choice" },
            rationale: {
                correct: "Ethosuximide is first-line for absence seizures, lorazepam is first-line for status epilepticus, and levetiracetam is effective for focal seizures. Carbamazepine worsens absence seizures, and valproic acid is teratogenic (Category X in pregnancy).",
                a: "CORRECT — Ethosuximide (Zarontin) is the first-line drug for absence seizures when absence is the only seizure type. It is effective and well-tolerated for this specific indication.",
                b: "INCORRECT — Carbamazepine (Tegretol) can actually WORSEN absence seizures. It blocks sodium channels, which does not address the thalamic mechanism of absence seizures. Phenytoin also worsens absence.",
                c: "CORRECT — Lorazepam (Ativan) IV is the first-line treatment for status epilepticus due to its rapid onset and longer CNS duration compared to diazepam.",
                d: "INCORRECT — Valproic acid is Category X in pregnancy with significant teratogenic risk (neural tube defects). Women planning pregnancy should be switched to a safer AED (lamotrigine or levetiracetam).",
                e: "CORRECT — Levetiracetam (Keppra) is effective for focal seizures, has fewer drug interactions than older AEDs, and does not require routine level monitoring."
            },
            testTakingTip: "AED matching: Absence → ethosuximide or valproic acid (NOT carbamazepine/phenytoin). Status epilepticus → lorazepam IV. Pregnancy → avoid valproic acid (Category X). Focal seizures → many options (levetiracetam, carbamazepine, phenytoin, lamotrigine).",
            guideSection: "Section 6 — AED Management",
            guideSectionId: "medications"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is providing discharge education to a patient newly diagnosed with epilepsy. Which patient statement indicates CORRECT understanding of seizure management?",
            options: [
                { id: "a", text: "\"I can still drive as long as I feel fine and take my medication.\"" },
                { id: "b", text: "\"I should avoid alcohol because it can lower my seizure threshold and interact with my medication.\"" },
                { id: "c", text: "\"If I'm seizure-free for a month, I can probably stop my medication.\"" },
                { id: "d", text: "\"I only need to take my seizure medication when I feel a seizure coming on.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Alcohol lowers the seizure threshold, and alcohol withdrawal further increases seizure risk. Alcohol also interacts with many AEDs (increases CNS depression, affects metabolism). This statement demonstrates correct understanding.",
                a: "Most states require a seizure-free period (typically 3-12 months, varies by state) before driving is permitted. The patient cannot simply drive because they feel fine.",
                c: "AED therapy is typically long-term (2+ years seizure-free before considering withdrawal). A one-month seizure-free period is far too short. Medication changes should only be made under provider supervision.",
                d: "AEDs must be taken consistently every day as prescribed — they work by maintaining steady blood levels to PREVENT seizures. They are not taken reactively."
            },
            testTakingTip: "Epilepsy patient education: take AEDs daily (not PRN), avoid alcohol, get adequate sleep, know your triggers, wear a medical alert bracelet, driving restrictions apply, never stop meds abruptly.",
            guideSection: "Section 1 — Pathophysiology & Etiology",
            guideSectionId: "pathophysiology"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is monitoring a patient receiving IV phenytoin when the patient reports burning pain at the IV site. The nurse observes swelling and a purplish discoloration around the IV catheter. What complication does the nurse suspect?",
            options: [
                { id: "a", text: "Phlebitis from the acidic pH of phenytoin" },
                { id: "b", text: "Purple glove syndrome — a serious extravasation injury specific to phenytoin" },
                { id: "c", text: "An allergic reaction to the phenytoin formulation" },
                { id: "d", text: "Normal bruising that commonly occurs with IV phenytoin" }
            ],
            correct: "b",
            rationale: {
                correct: "Purple glove syndrome is a serious complication specific to IV phenytoin. It presents with pain, swelling, and purplish discoloration distal to the IV site. It can progress to tissue necrosis, compartment syndrome, and potentially require amputation. The nurse should STOP the infusion immediately, elevate the extremity, and notify the provider.",
                a: "While phenytoin is alkaline (pH ~12) and can cause phlebitis, the purplish discoloration and swelling pattern described is characteristic of purple glove syndrome, not simple phlebitis.",
                c: "Allergic reactions would present with urticaria, rash, bronchospasm, or anaphylaxis — not localized purplish discoloration at the IV site.",
                d: "This is NOT normal bruising. Purple glove syndrome is a serious medical emergency requiring immediate intervention."
            },
            testTakingTip: "Purple glove syndrome = phenytoin extravasation → pain, swelling, purple discoloration → tissue necrosis. STOP infusion immediately. This is why fosphenytoin (Cerebyx) is preferred for IV use — it has a near-neutral pH and does not cause this complication.",
            guideSection: "Section 6 — AED Management",
            guideSectionId: "medications"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which diagnostic test is considered the GOLD STANDARD for diagnosing seizure disorders and classifying seizure type?",
            options: [
                { id: "a", text: "CT scan of the head" },
                { id: "b", text: "MRI of the brain" },
                { id: "c", text: "Electroencephalogram (EEG)" },
                { id: "d", text: "Lumbar puncture with CSF analysis" }
            ],
            correct: "c",
            rationale: {
                correct: "The EEG (electroencephalogram) is the gold standard for seizure diagnosis. It records the brain's electrical activity and can identify epileptiform discharges (spikes, sharp waves) that confirm seizure activity and help classify the seizure type. Video-EEG monitoring is the most valuable form for capturing and characterizing seizure events.",
                a: "CT scan is used emergently to rule out hemorrhage or mass lesions but does not diagnose seizure activity. It shows structure, not function.",
                b: "MRI is superior to CT for identifying structural causes of epilepsy (tumors, mesial temporal sclerosis, malformations) but does not measure electrical activity.",
                d: "Lumbar puncture is used to evaluate for CNS infections (meningitis, encephalitis) that may cause seizures but is not a test for seizure activity itself."
            },
            testTakingTip: "EEG = gold standard for seizure DIAGNOSIS (measures electrical activity). MRI = best for finding structural CAUSES (tumors, sclerosis). CT = emergent use to rule out hemorrhage. Know the difference!",
            guideSection: "Section 3 — Assessment & Diagnosis",
            guideSectionId: "assessment"
        }
    ]
};
