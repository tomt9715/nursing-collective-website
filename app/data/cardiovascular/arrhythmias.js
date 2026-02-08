/**
 * Quiz Bank — Arrhythmias
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "arr-qb-001",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient on the cardiac telemetry unit has an irregular rhythm with no identifiable P waves and a ventricular rate of 82 bpm. The nurse identifies this rhythm as which of the following?",
        options: [
            { id: "a", text: "Sinus arrhythmia" },
            { id: "b", text: "Atrial fibrillation with controlled ventricular response" },
            { id: "c", text: "Second-degree AV block Type I (Wenckebach)" },
            { id: "d", text: "Junctional rhythm" }
        ],
        correct: "b",
        rationale: {
            correct: "Atrial fibrillation is characterized by an irregularly irregular rhythm with absent P waves (replaced by fibrillatory waves). A ventricular rate of 82 bpm is considered a controlled response (goal is 60-110 bpm). Sinus arrhythmia has P waves. Wenckebach has progressive PR prolongation. Junctional rhythm is regular at 40-60 bpm."
        },
        testTakingTip: "The three hallmarks of A-fib: (1) irregularly irregular rhythm, (2) no identifiable P waves, (3) variable R-R intervals. If you see 'irregular + no P waves,' think A-fib first.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "atrial-fibrillation"
    },

    {
        id: "arr-qb-002",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "application",
        stem: "A patient with new-onset atrial fibrillation has a CHA₂DS₂-VASc score of 4. The nurse anticipates which medication will be prescribed to reduce this patient's primary risk?",
        options: [
            { id: "a", text: "Amiodarone for rhythm control" },
            { id: "b", text: "Metoprolol for rate control" },
            { id: "c", text: "Apixaban for stroke prevention" },
            { id: "d", text: "Digoxin for heart rate regulation" }
        ],
        correct: "c",
        rationale: {
            correct: "The CHA₂DS₂-VASc score assesses stroke risk in atrial fibrillation patients. A score of 4 indicates high stroke risk, and anticoagulation therapy (such as apixaban, a direct oral anticoagulant) is recommended. The primary risk of A-fib is thromboembolism leading to stroke due to blood stasis in the fibrillating atria. Rate and rhythm control are also important but do not directly address the stroke risk."
        },
        testTakingTip: "CHA₂DS₂-VASc score ≥2 in males or ≥3 in females = anticoagulation recommended. The biggest danger of A-fib is stroke from atrial thrombus formation. Always connect A-fib → stroke risk → anticoagulation.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "atrial-fibrillation"
    },

    {
        id: "arr-qb-003",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient presents with paroxysmal supraventricular tachycardia (PSVT) with a heart rate of 188 bpm and stable blood pressure. The provider orders adenosine. The nurse understands that this medication works by which mechanism?",
        options: [
            { id: "a", text: "Slowing conduction through the AV node to break the reentry circuit" },
            { id: "b", text: "Directly depolarizing the ventricles to reset the rhythm" },
            { id: "c", text: "Blocking sodium channels to slow atrial conduction" },
            { id: "d", text: "Stimulating the vagus nerve to increase parasympathetic tone" }
        ],
        correct: "a",
        rationale: {
            correct: "Adenosine works by transiently blocking conduction through the AV node, which interrupts the reentry circuit responsible for most SVTs. It has an ultra-short half-life (less than 10 seconds), making it ideal for acute termination. It does not directly affect ventricular depolarization or atrial conduction. Vagal maneuvers stimulate the vagus nerve but are tried before adenosine."
        },
        testTakingTip: "Adenosine for SVT: give rapid IV push followed by rapid flush (half-life <10 seconds). It briefly 'pauses' the AV node to break the reentry loop. Warn the patient they may feel a brief chest tightness or sense of doom.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "supraventricular-tachycardia"
    },

    {
        id: "arr-qb-004",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "application",
        stem: "A patient on the medical unit develops symptomatic bradycardia (HR 38, BP 82/54, dizziness). Atropine 0.5 mg IV push has been given twice without improvement. Which intervention should the nurse prepare for next?",
        options: [
            { id: "a", text: "Administer amiodarone 300 mg IV push" },
            { id: "b", text: "Initiate transcutaneous pacing" },
            { id: "c", text: "Administer epinephrine 1 mg IV push" },
            { id: "d", text: "Perform synchronized cardioversion" }
        ],
        correct: "b",
        rationale: {
            correct: "Per ACLS guidelines, when symptomatic bradycardia does not respond to atropine (maximum dose 3 mg), transcutaneous pacing is the next intervention. It provides external electrical stimulation to maintain an adequate heart rate and cardiac output. Amiodarone is for tachyarrhythmias. Cardioversion is for tachycardia. Epinephrine infusion (not push) may be used as an alternative to pacing, but transcutaneous pacing is the standard next step."
        },
        testTakingTip: "Symptomatic bradycardia not responding to atropine → transcutaneous pacing. Remember: pacing is for slow hearts, cardioversion/defibrillation is for fast hearts. Don't confuse the two.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "bradycardia"
    },

    {
        id: "arr-qb-005",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse reviews morning lab results for a telemetry patient on continuous amiodarone infusion. Potassium is 2.8 mEq/L, magnesium is 1.4 mg/dL. The patient's rhythm is sinus with a prolonged QTc of 520 ms. Which action is the highest priority?",
        options: [
            { id: "a", text: "Continue amiodarone and recheck electrolytes in 4 hours" },
            { id: "b", text: "Notify the provider immediately — the combination of hypokalemia, hypomagnesemia, and prolonged QTc creates risk for torsades de pointes" },
            { id: "c", text: "Administer oral potassium supplements and continue current medications" },
            { id: "d", text: "Discontinue the amiodarone and start lidocaine instead" }
        ],
        correct: "b",
        rationale: {
            correct: "This is a dangerous situation: hypokalemia (2.8, normal 3.5-5.0), hypomagnesemia (1.4, normal 1.7-2.2), and a prolonged QTc (>500 ms) together significantly increase the risk of torsades de pointes — a potentially lethal polymorphic ventricular tachycardia. Amiodarone itself prolongs the QT interval. The nurse must notify the provider urgently for aggressive IV electrolyte replacement and potential dose adjustment or discontinuation of QT-prolonging medications."
        },
        testTakingTip: "Low K+ + Low Mg²+ + Long QTc = torsades de pointes risk. This is a triple threat. Always replace magnesium FIRST (potassium won't stay corrected without adequate magnesium). QTc >500 ms is the danger threshold.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "electrolyte-arrhythmias"
    },

    {
        id: "arr-qb-006",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with a newly implanted permanent pacemaker asks the nurse what activities they should avoid. Which activity is correctly identified as a restriction?",
        options: [
            { id: "a", text: "Using a microwave oven at home" },
            { id: "b", text: "Walking through airport security metal detectors" },
            { id: "c", text: "Holding a cell phone directly over the pacemaker site" },
            { id: "d", text: "Riding as a passenger in an automobile" }
        ],
        correct: "c",
        rationale: {
            correct: "Patients with pacemakers should avoid placing cell phones directly over the generator site (within 6 inches) as electromagnetic interference can temporarily affect pacemaker function. The phone should be held to the opposite ear and stored in a pocket away from the device. Microwave ovens, airport metal detectors (brief passage), and riding in cars are all safe with modern pacemakers."
        },
        testTakingTip: "Modern pacemakers are well-shielded against most household electronics. The main precautions are: keep cell phone 6 inches away from the generator, avoid MRI unless cleared (newer models may be MRI-conditional), and avoid direct contact with strong magnets or high-voltage equipment.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "pacemakers"
    },

    {
        id: "arr-qb-007",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "application",
        stem: "A patient with a history of ventricular fibrillation arrest now has an ICD (implantable cardioverter-defibrillator). The patient reports the device has fired 3 times in the past hour. The patient's current rhythm is sinus tachycardia at 108 bpm. What should the nurse do?",
        options: [
            { id: "a", text: "Reassure the patient that the ICD is working correctly" },
            { id: "b", text: "Place a magnet over the ICD to temporarily disable it" },
            { id: "c", text: "Notify the provider immediately for device interrogation" },
            { id: "d", text: "Instruct the patient to lie down and wait for the next shock" }
        ],
        correct: "c",
        rationale: {
            correct: "Multiple ICD discharges (3 or more in 24 hours, or 'electrical storm') requires immediate medical evaluation. The device may be firing appropriately for recurrent VT/VF, or it may be delivering inappropriate shocks (sensing artifact, lead fracture, or misinterpreting sinus tachycardia as VT). Device interrogation is essential to determine the cause. Placing a magnet would disable therapies and is only done under medical direction when the device is confirmed to be firing inappropriately."
        },
        testTakingTip: "Multiple ICD shocks = notify provider STAT. Do not assume the device is working correctly or incorrectly without interrogation. This is an emergency that requires cardiology evaluation.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "icd"
    },

    {
        id: "arr-qb-008",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is reviewing telemetry strips. Patient A shows a wide-complex tachycardia (QRS >0.12 sec) at 170 bpm. Patient B shows a narrow-complex tachycardia (QRS <0.12 sec) at 170 bpm. Both patients are hemodynamically stable. Why is distinguishing QRS width clinically important?",
        options: [
            { id: "a", text: "Wide-complex tachycardia should be treated as ventricular tachycardia until proven otherwise, which requires different medications" },
            { id: "b", text: "Narrow-complex tachycardia is always more dangerous than wide-complex" },
            { id: "c", text: "QRS width only matters for billing and documentation purposes" },
            { id: "d", text: "Wide-complex always requires immediate defibrillation regardless of hemodynamic status" }
        ],
        correct: "a",
        rationale: {
            correct: "Wide-complex tachycardia (QRS >0.12 sec) must be treated as ventricular tachycardia until proven otherwise because VT is life-threatening and requires specific treatment (amiodarone, procainamide, or cardioversion). Narrow-complex tachycardia originates above the ventricles (supraventricular) and is treated differently (adenosine, vagal maneuvers, calcium channel blockers). Misdiagnosing VT as SVT and giving inappropriate drugs (like verapamil) can cause cardiovascular collapse."
        },
        testTakingTip: "Wide QRS tachycardia = assume ventricular origin = VT until proven otherwise. This is a critical safety principle. Giving SVT drugs (adenosine, calcium channel blockers) for VT can be fatal. When in doubt, treat as VT.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "rhythm-interpretation"
    },

    {
        id: "arr-qb-009",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "knowledge",
        stem: "Which electrolyte imbalance is most commonly associated with the development of tall, peaked T waves and widened QRS complexes on the ECG?",
        options: [
            { id: "a", text: "Hypocalcemia" },
            { id: "b", text: "Hyperkalemia" },
            { id: "c", text: "Hypomagnesemia" },
            { id: "d", text: "Hypernatremia" }
        ],
        correct: "b",
        rationale: {
            correct: "Hyperkalemia produces a characteristic ECG progression: tall, peaked T waves → widened QRS → loss of P waves → sine wave pattern → cardiac arrest. Potassium directly affects cardiac cell membrane potential, and elevated levels slow conduction and alter repolarization. This is a medical emergency requiring immediate treatment with calcium gluconate (cardioprotection), insulin/dextrose, and sodium bicarbonate."
        },
        testTakingTip: "Peaked T waves = think potassium (hyper-K). Flat T waves with U waves = hypokalemia. Prolonged QT = hypocalcemia or hypomagnesemia. Know these ECG-electrolyte connections — they are heavily tested.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "electrolyte-arrhythmias"
    },

    {
        id: "arr-qb-010",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "application",
        stem: "A nurse is preparing to assist with elective cardioversion for a patient in persistent atrial fibrillation. The patient has been on warfarin for 4 weeks with an INR consistently between 2.0-3.0. Which pre-procedure assessment finding would require the nurse to notify the provider and potentially delay the procedure?",
        options: [
            { id: "a", text: "The patient's INR today is 2.5" },
            { id: "b", text: "The patient ate breakfast 2 hours ago" },
            { id: "c", text: "The transesophageal echocardiogram shows a thrombus in the left atrial appendage" },
            { id: "d", text: "The patient reports mild anxiety about the procedure" }
        ],
        correct: "c",
        rationale: {
            correct: "A TEE showing a left atrial thrombus is an absolute contraindication to cardioversion. Electrical or pharmacologic cardioversion in the presence of atrial thrombus can dislodge the clot, causing a stroke or systemic embolism. The procedure must be delayed until adequate anticoagulation has resolved the thrombus (typically confirmed by repeat TEE). An INR of 2.5 is therapeutic. NPO status varies by facility. Anxiety is expected and managed with sedation."
        },
        testTakingTip: "Before cardioversion: confirm anticoagulation for ≥3 weeks (INR 2-3) OR negative TEE for thrombus. If thrombus is found, cardioversion is cancelled. Converting the rhythm with a clot present = stroke.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "cardioversion"
    },

    {
        id: "arr-qb-011",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "single",
        difficulty: "analysis",
        stem: "A patient on the cardiac unit develops the following: HR 42, progressively prolonging PR intervals on telemetry, with intermittent dropped QRS complexes. The patient is asymptomatic with a BP of 118/72. Which action is most appropriate?",
        options: [
            { id: "a", text: "Administer atropine 0.5 mg IV push immediately" },
            { id: "b", text: "Prepare for transcutaneous pacing" },
            { id: "c", text: "Continue monitoring; this is a benign rhythm in an asymptomatic patient" },
            { id: "d", text: "Administer epinephrine 1 mg IV push" }
        ],
        correct: "c",
        rationale: {
            correct: "This describes second-degree AV block Type I (Wenckebach): progressive PR prolongation with intermittent dropped beats. In an asymptomatic patient with stable vital signs, Wenckebach is generally benign and often resolves spontaneously. Treatment is only indicated if the patient becomes symptomatic (hypotension, dizziness, syncope). Continued monitoring is appropriate with intervention available if symptoms develop. Atropine and pacing are reserved for symptomatic bradycardia."
        },
        testTakingTip: "Wenckebach (Type I) in an asymptomatic patient = monitor. Type II (sudden dropped beats without PR prolongation) is more serious and may need intervention even when asymptomatic because it can progress to complete heart block unpredictably.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "heart-blocks"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "arr-qb-012",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "ordering",
        difficulty: "application",
        stem: "A monitored patient suddenly collapses. The telemetry shows ventricular fibrillation. Place the nurse's ACLS interventions in the correct order.",
        options: [
            { id: "s1", text: "Confirm unresponsiveness and call a code blue" },
            { id: "s2", text: "Begin high-quality chest compressions (push hard, push fast)" },
            { id: "s3", text: "Deliver the first defibrillation shock as soon as the defibrillator is ready" },
            { id: "s4", text: "Resume CPR immediately for 2 minutes after the shock, then recheck rhythm" },
            { id: "s5", text: "Administer epinephrine 1 mg IV/IO after the second shock and every 3-5 minutes" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Confirm cardiac arrest and activate the emergency response. Do not delay CPR to run diagnostics.",
            s2: "Begin CPR immediately — chest compressions maintain perfusion to vital organs. Minimize interruptions throughout the code.",
            s3: "VF is a shockable rhythm. Early defibrillation is the single most important intervention for VF survival. Deliver the first shock as soon as possible.",
            s4: "Resume CPR immediately after the shock without pausing to check rhythm. A full 2-minute cycle allows time for the heart to recover before reassessment.",
            s5: "Epinephrine is given after the second shock (during CPR) and then every 3-5 minutes. It supports coronary and cerebral perfusion pressure during the arrest."
        },
        testTakingTip: "VF/pulseless VT algorithm: confirm/call → CPR → defibrillate → CPR 2 min → epinephrine after 2nd shock → continue cycles. Remember: shock first, drugs second. Compressions should rarely be interrupted.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "cardiac-arrest"
    },

    {
        id: "arr-qb-013",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient in the ED develops rapid supraventricular tachycardia (SVT) at 198 bpm with a stable blood pressure of 106/68. Place the interventions in the correct order of the SVT management algorithm.",
        options: [
            { id: "s1", text: "Attempt vagal maneuvers (Valsalva maneuver or carotid sinus massage)" },
            { id: "s2", text: "Administer adenosine 6 mg rapid IV push with immediate saline flush" },
            { id: "s3", text: "If no conversion, administer adenosine 12 mg rapid IV push" },
            { id: "s4", text: "If adenosine fails, consider IV diltiazem or beta-blocker for rate control" },
            { id: "s5", text: "If hemodynamic instability develops at any point, proceed to synchronized cardioversion" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Vagal maneuvers are attempted first as a non-pharmacologic intervention. They stimulate the vagus nerve to slow AV node conduction and may terminate the arrhythmia.",
            s2: "If vagal maneuvers fail, adenosine 6 mg is the first-line drug. It must be given as a rapid IV push closest to the heart (antecubital preferred) followed by a rapid 20 mL saline flush.",
            s3: "If the first dose does not convert the rhythm, adenosine 12 mg is given. This higher dose may overcome the ultra-rapid metabolism of the drug.",
            s4: "If adenosine fails twice, calcium channel blockers (diltiazem) or beta-blockers provide sustained rate control by slowing AV node conduction.",
            s5: "At any point, if the patient becomes hemodynamically unstable (hypotension, altered consciousness, chest pain), skip to synchronized cardioversion."
        },
        testTakingTip: "Stable SVT algorithm: vagal → adenosine 6 mg → adenosine 12 mg → calcium channel blocker or beta-blocker → cardioversion if unstable. The stability assessment is continuous throughout — instability changes the algorithm immediately.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "supraventricular-tachycardia"
    },

    {
        id: "arr-qb-014",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "ordering",
        difficulty: "knowledge",
        stem: "Place the cardiac conduction pathway components in the correct order of normal electrical impulse transmission through the heart.",
        options: [
            { id: "s1", text: "SA node (sinoatrial node)" },
            { id: "s2", text: "AV node (atrioventricular node)" },
            { id: "s3", text: "Bundle of His" },
            { id: "s4", text: "Right and left bundle branches" },
            { id: "s5", text: "Purkinje fibers" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "The SA node is the heart's natural pacemaker (60-100 bpm). It initiates the electrical impulse in the right atrium.",
            s2: "The AV node receives the impulse and delays it briefly (0.04 sec) to allow atrial contraction to complete before ventricular contraction begins.",
            s3: "The Bundle of His transmits the impulse from the AV node into the interventricular septum.",
            s4: "The right and left bundle branches carry the impulse down each side of the septum to their respective ventricles.",
            s5: "Purkinje fibers are the terminal network that rapidly distributes the impulse throughout the ventricular myocardium, triggering coordinated contraction."
        },
        testTakingTip: "SA node → AV node → Bundle of His → Bundle branches → Purkinje fibers. This sequence explains every ECG wave: SA node = P wave, AV node = PR interval, Bundle of His through Purkinje = QRS complex.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "conduction-system"
    },

    {
        id: "arr-qb-015",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "ordering",
        difficulty: "application",
        stem: "A patient with new-onset atrial fibrillation and rapid ventricular response (HR 148) is stable but symptomatic with palpitations and mild dyspnea. Place the management steps in the appropriate order.",
        options: [
            { id: "s1", text: "Obtain a 12-lead ECG to confirm the rhythm and rule out other causes" },
            { id: "s2", text: "Administer IV diltiazem or metoprolol for rate control to target HR <110" },
            { id: "s3", text: "Draw labs including TSH, electrolytes, and troponin to identify reversible causes" },
            { id: "s4", text: "Assess stroke risk (CHA₂DS₂-VASc) and initiate anticoagulation if indicated" },
            { id: "s5", text: "Discuss rhythm vs. rate control strategy with the cardiologist for long-term management" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Confirm the diagnosis first. A 12-lead ECG verifies atrial fibrillation and rules out other tachyarrhythmias, ischemia, or Wolff-Parkinson-White syndrome (which changes treatment).",
            s2: "Rate control is the immediate priority for symptomatic rapid A-fib. IV diltiazem or metoprolol slows the ventricular rate and relieves symptoms.",
            s3: "Identify and treat reversible causes: thyrotoxicosis (TSH), electrolyte imbalance, acute MI (troponin), or infection. Correcting the underlying cause may resolve the arrhythmia.",
            s4: "Stroke prevention is a critical long-term concern. Assess the CHA₂DS₂-VASc score and begin anticoagulation within the first 24-48 hours if indicated.",
            s5: "The rhythm vs. rate control decision is made after stabilization in consultation with cardiology. Factors include symptom burden, duration of A-fib, and patient preference."
        },
        testTakingTip: "New A-fib management: confirm → rate control → find the cause → prevent stroke → long-term strategy. The acute priority is rate control; the long-term priority is stroke prevention.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "atrial-fibrillation"
    },

    {
        id: "arr-qb-016",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient in the ICU develops pulseless electrical activity (PEA). Place the ACLS interventions in the correct priority order.",
        options: [
            { id: "s1", text: "Begin high-quality CPR and confirm the rhythm on the monitor" },
            { id: "s2", text: "Administer epinephrine 1 mg IV/IO every 3-5 minutes" },
            { id: "s3", text: "Identify and treat reversible causes (H's and T's)" },
            { id: "s4", text: "Continue CPR cycles of 2 minutes with rhythm and pulse checks between cycles" },
            { id: "s5", text: "Consider bedside ultrasound to identify reversible causes if available" }
        ],
        correct: ["s1", "s2", "s3", "s5", "s4"],
        rationale: {
            s1: "PEA is a non-shockable rhythm. Begin CPR immediately upon recognizing pulseless organized electrical activity.",
            s2: "Epinephrine 1 mg IV/IO is administered as soon as IV/IO access is established and repeated every 3-5 minutes during the arrest.",
            s3: "PEA has a cause — identify and treat the H's and T's: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/Hyperkalemia, Hypothermia, Tension pneumothorax, Tamponade, Toxins, Thrombosis (pulmonary/coronary).",
            s5: "Bedside ultrasound (POCUS) can rapidly identify treatable causes (tamponade, PE, hypovolemia) without interrupting compressions significantly.",
            s4: "Continue CPR with 2-minute cycles, checking rhythm and pulse between cycles. PEA management is about finding and fixing the cause while maintaining perfusion."
        },
        testTakingTip: "PEA = non-shockable = NO defibrillation. Treatment is CPR + epinephrine + find the CAUSE. The H's and T's mnemonic is critical. PEA without treating the cause = poor survival.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "cardiac-arrest"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "arr-qb-017",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each cardiac arrest rhythm, identify whether it is a shockable or non-shockable rhythm.",
        columns: ["Shockable", "Non-Shockable"],
        rows: [
            { id: "r1", text: "Ventricular fibrillation (VF)", correct: "Shockable" },
            { id: "r2", text: "Pulseless electrical activity (PEA)", correct: "Non-Shockable" },
            { id: "r3", text: "Pulseless ventricular tachycardia (VT)", correct: "Shockable" },
            { id: "r4", text: "Asystole", correct: "Non-Shockable" },
            { id: "r5", text: "Torsades de pointes (pulseless)", correct: "Shockable" }
        ],
        rationale: {
            correct: "Shockable rhythms (VF, pulseless VT, torsades) have disorganized or rapid electrical activity that can potentially be reset by defibrillation. Non-shockable rhythms (PEA, asystole) either have organized electrical activity without mechanical contraction (PEA) or no electrical activity at all (asystole) — shocking will not help. Non-shockable rhythms require CPR, epinephrine, and treating the underlying cause."
        },
        testTakingTip: "Shockable = VF, pulseless VT, torsades (chaotic or rapid ventricular activity). Non-shockable = PEA, asystole (no effective rhythm to reset). Never shock a flatline (asystole) — there is no electrical activity to reset.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "cardiac-arrest"
    },

    {
        id: "arr-qb-018",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "matrix",
        difficulty: "application",
        stem: "For each medication, identify whether it is primarily used for tachyarrhythmias or bradyarrhythmias.",
        columns: ["Tachyarrhythmia", "Bradyarrhythmia"],
        rows: [
            { id: "r1", text: "Adenosine (Adenocard)", correct: "Tachyarrhythmia" },
            { id: "r2", text: "Atropine sulfate", correct: "Bradyarrhythmia" },
            { id: "r3", text: "Amiodarone (Cordarone)", correct: "Tachyarrhythmia" },
            { id: "r4", text: "Isoproterenol", correct: "Bradyarrhythmia" },
            { id: "r5", text: "Diltiazem (Cardizem)", correct: "Tachyarrhythmia" }
        ],
        rationale: {
            correct: "Tachyarrhythmia medications: Adenosine breaks SVT reentry circuits. Amiodarone is a broad-spectrum antiarrhythmic for VT, VF, and A-fib. Diltiazem slows AV conduction to control rapid atrial rhythms. Bradyarrhythmia medications: Atropine blocks vagal tone to increase heart rate. Isoproterenol is a beta-agonist that increases heart rate and conduction velocity, used as a bridge to pacing."
        },
        testTakingTip: "Fast heart → slow it down: adenosine, amiodarone, diltiazem, beta-blockers. Slow heart → speed it up: atropine, isoproterenol, dopamine, epinephrine. Match the drug to the rate problem.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "medications"
    },

    {
        id: "arr-qb-019",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each rhythm characteristic, identify whether it indicates a stable or unstable tachyarrhythmia requiring immediate intervention.",
        columns: ["Stable — Monitor/Medicate", "Unstable — Prepare for Cardioversion"],
        rows: [
            { id: "r1", text: "Heart rate 156, alert and oriented, BP 132/84, no chest pain", correct: "Stable — Monitor/Medicate" },
            { id: "r2", text: "Heart rate 188, confused, BP 72/48, diaphoretic", correct: "Unstable — Prepare for Cardioversion" },
            { id: "r3", text: "Heart rate 162, mild palpitations, BP 108/70, SpO2 96%", correct: "Stable — Monitor/Medicate" },
            { id: "r4", text: "Heart rate 174, crushing chest pain, ST changes on monitor", correct: "Unstable — Prepare for Cardioversion" },
            { id: "r5", text: "Heart rate 200, unresponsive, agonal respirations", correct: "Unstable — Prepare for Cardioversion" }
        ],
        rationale: {
            correct: "Stability is determined by signs of end-organ perfusion failure, not heart rate alone. Unstable signs: hypotension (BP <90 systolic), altered mental status, severe chest pain with ischemic changes, signs of shock (diaphoresis, pallor), unresponsiveness. Stable patients may have elevated heart rates but maintain adequate perfusion and consciousness — these patients can be treated with medications first."
        },
        testTakingTip: "The 4 unstable signs for tachycardia: Hypotension, Altered mental status, Chest pain with ischemia, Signs of shock. ANY of these = unstable = cardioversion. Heart rate alone does not determine stability.",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "tachycardia-management"
    },

    {
        id: "arr-qb-020",
        category: "cardiovascular",
        topic: "arrhythmias",
        topicLabel: "Arrhythmias",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each type of AV block, indicate whether it is generally considered benign (monitor only) or potentially dangerous (may require pacing).",
        columns: ["Generally Benign", "Potentially Dangerous"],
        rows: [
            { id: "r1", text: "First-degree AV block (prolonged PR interval, all P waves conducted)", correct: "Generally Benign" },
            { id: "r2", text: "Second-degree Type I (Wenckebach): progressive PR prolongation with dropped beats", correct: "Generally Benign" },
            { id: "r3", text: "Second-degree Type II (Mobitz II): sudden dropped QRS without PR prolongation", correct: "Potentially Dangerous" },
            { id: "r4", text: "Third-degree (complete) heart block: P waves and QRS complexes are independent", correct: "Potentially Dangerous" },
            { id: "r5", text: "Bundle branch block (wide QRS, normal PR interval, all beats conducted)", correct: "Generally Benign" }
        ],
        rationale: {
            correct: "Generally benign: First-degree block is simply a slow AV node — all beats conduct. Wenckebach (Type I) is usually at the AV node level and often resolves spontaneously. Bundle branch block affects intraventricular conduction but all impulses still reach the ventricles. Potentially dangerous: Mobitz Type II occurs below the AV node (in the His-Purkinje system) and can progress unpredictably to complete heart block. Third-degree block means no atrial impulses reach the ventricles — the patient depends entirely on an escape rhythm, which may be unreliable."
        },
        testTakingTip: "Heart block danger level: First-degree = benign. Type I (Wenckebach) = usually benign. Type II (Mobitz) = dangerous (can progress to complete block without warning). Third-degree = dangerous (pacemaker usually needed). 'Type II → ICU.'",
        relatedGuide: "arrhythmias.html",
        relatedGuideSection: "heart-blocks"
    }

]);
