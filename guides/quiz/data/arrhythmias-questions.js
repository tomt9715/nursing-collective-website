/**
 * Arrhythmias Quiz - Question Data
 * Extracted from guides/arrhythmias.html practice questions section.
 * 10 NCLEX-style questions: 6 Single, 2 Priority, 1 Matrix, 1 Ordering
 */

/* exported arrhythmiasQuizData */
var arrhythmiasQuizData = {
    guideName: "Arrhythmias",
    guideSlug: "arrhythmias",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is analyzing a rhythm strip and observes an irregular rhythm with no identifiable P waves, a chaotic baseline, and narrow QRS complexes at a rate of 88 bpm. Which rhythm does this represent?",
            options: [
                { id: "a", text: "Atrial flutter" },
                { id: "b", text: "Atrial fibrillation" },
                { id: "c", text: "Supraventricular tachycardia" },
                { id: "d", text: "Sinus arrhythmia" }
            ],
            correct: "b",
            rationale: {
                correct: "Atrial fibrillation is characterized by an irregularly irregular rhythm, absent P waves with a chaotic fibrillatory baseline, and narrow QRS complexes. The ventricular rate can vary widely (60-180+ bpm). These are the hallmark features.",
                a: "Atrial flutter has a sawtooth pattern of flutter waves (not chaotic) and usually has a regular or regularly irregular ventricular rhythm.",
                c: "SVT is a regular, rapid rhythm (150-250 bpm) with hidden or absent P waves. This rhythm is irregular, which rules out SVT.",
                d: "Sinus arrhythmia has normal, upright P waves before each QRS. The variation in rhythm corresponds with respiration. This strip has no P waves."
            },
            testTakingTip: "The key identifier for A-fib is \"irregularly irregular.\" If a rhythm strip description mentions irregular R-R intervals AND no P waves, think A-fib first. Flutter has a \"sawtooth\" and tends to be regular.",
            guideSection: "Section 4 - Atrial Arrhythmias",
            guideSectionId: "atrial-rhythms"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A patient on telemetry suddenly becomes unresponsive. The monitor shows a chaotic, disorganized rhythm with no identifiable P waves, QRS complexes, or T waves. The nurse checks for a pulse and finds none. What is the nurse\u2019s FIRST action?",
            options: [
                { id: "a", text: "Administer epinephrine 1 mg IV push" },
                { id: "b", text: "Begin chest compressions and call for the defibrillator" },
                { id: "c", text: "Administer amiodarone 300 mg IV push" },
                { id: "d", text: "Perform synchronized cardioversion at 200 joules" }
            ],
            correct: "b",
            rationale: {
                correct: "The rhythm described is ventricular fibrillation (chaotic, no identifiable waveforms, no pulse). Per ACLS protocol, the immediate priority is high-quality CPR while preparing for defibrillation. CPR maintains some perfusion to vital organs. The defibrillator should be applied and an unsynchronized shock delivered as soon as it is available.",
                a: "Epinephrine is given during cardiac arrest but AFTER the first defibrillation attempt and 2 minutes of CPR. It is not the first action.",
                c: "Amiodarone is given in refractory V-fib/pulseless V-tach AFTER at least one defibrillation and CPR cycle. It is not first-line.",
                d: "Synchronized cardioversion requires the defibrillator to identify R waves for timing. V-fib has no identifiable R waves - synchronized mode will not fire. V-fib requires UNSYNCHRONIZED defibrillation."
            },
            testTakingTip: "Pulseless = start CPR immediately. V-fib and pulseless V-tach are \"shockable\" rhythms requiring defibrillation (unsynchronized). Synchronized cardioversion is for patients WITH a pulse who are hemodynamically unstable.",
            guideSection: "Section 5 - Ventricular Arrhythmias",
            guideSectionId: "ventricular-rhythms"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient presents with palpitations and dizziness. The ECG shows a regular, narrow-complex tachycardia at a rate of 188 bpm with no visible P waves. The patient\u2019s blood pressure is 118/72 mmHg and the patient is alert and oriented. Vagal maneuvers are attempted without success. Which medication should the nurse prepare to administer?",
            options: [
                { id: "a", text: "Amiodarone 150 mg IV over 10 minutes" },
                { id: "b", text: "Adenosine 6 mg rapid IV push" },
                { id: "c", text: "Atropine 0.5 mg IV push" },
                { id: "d", text: "Epinephrine 1 mg IV push" }
            ],
            correct: "b",
            rationale: {
                correct: "This is supraventricular tachycardia (SVT): regular, narrow QRS, rapid rate (150-250 bpm), no visible P waves. The patient is hemodynamically stable. After vagal maneuvers fail, adenosine 6 mg rapid IV push is the first-line medication. If the first dose is ineffective, 12 mg may be given. Adenosine has a half-life of less than 10 seconds, so it must be given rapid IV push followed immediately by a 20 mL saline flush.",
                a: "Amiodarone is used for ventricular arrhythmias (V-tach, V-fib) or refractory SVT. It is not first-line for stable SVT.",
                c: "Atropine is used for symptomatic bradycardia. This patient has tachycardia - atropine would worsen the rate.",
                d: "Epinephrine is used in cardiac arrest protocols. It increases heart rate and would be harmful in SVT."
            },
            testTakingTip: "SVT treatment ladder: Vagal maneuvers \u2192 Adenosine 6 mg \u2192 Adenosine 12 mg \u2192 Cardioversion if unstable. Remember adenosine\u2019s administration: rapid IV push through the most proximal IV site + 20 mL flush. Warn the patient about transient chest discomfort.",
            guideSection: "Section 4 - Atrial Arrhythmias",
            guideSectionId: "atrial-rhythms"
        },
        {
            id: 4,
            type: "matrix",
            subtype: null,
            difficulty: "analysis",
            matrixColumns: ["Immediate Defibrillation", "Synchronized Cardioversion"],
            stem: "A nurse is reviewing cardiac rhythms and their emergency interventions. For each rhythm, indicate whether the primary treatment is immediate defibrillation (unsynchronized shock) or synchronized cardioversion.",
            options: [
                { id: "a", text: "Ventricular fibrillation" },
                { id: "b", text: "Unstable supraventricular tachycardia with a pulse" },
                { id: "c", text: "Pulseless ventricular tachycardia" },
                { id: "d", text: "Unstable atrial fibrillation with rapid ventricular response and hypotension" }
            ],
            correct: { a: "Immediate Defibrillation", b: "Synchronized Cardioversion", c: "Immediate Defibrillation", d: "Synchronized Cardioversion" },
            rationale: {
                correct: "Pulseless rhythms (V-fib and pulseless V-tach) require immediate unsynchronized defibrillation. Unstable rhythms with a pulse (SVT, A-fib with RVR) require synchronized cardioversion, which times the shock to the R wave to avoid the vulnerable T-wave period.",
                a: "IMMEDIATE DEFIBRILLATION - Ventricular fibrillation is a pulseless, chaotic rhythm with no identifiable QRS complexes. Unsynchronized defibrillation is the only option. CPR + early defibrillation is the standard of care.",
                b: "SYNCHRONIZED CARDIOVERSION - This patient has SVT with hemodynamic instability but still has a pulse. Synchronized cardioversion delivers the shock timed to the R wave, avoiding the vulnerable T-wave period.",
                c: "IMMEDIATE DEFIBRILLATION - Pulseless V-tach is treated identically to V-fib per ACLS protocol. The patient has no cardiac output, so immediate unsynchronized defibrillation is indicated.",
                d: "SYNCHRONIZED CARDIOVERSION - Unstable A-fib with rapid ventricular response and hypotension requires urgent rhythm control. The patient has a pulse, so synchronized cardioversion is used."
            },
            testTakingTip: "The key distinction: pulse or no pulse? No pulse = defibrillation (unsynchronized). Pulse present but unstable = synchronized cardioversion. Remember that most defibrillators reset the sync button after each shock.",
            guideSection: "Section 4 - Atrial Arrhythmias",
            guideSectionId: "atrial-rhythms"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient\u2019s telemetry strip shows a regular rhythm with a progressive lengthening of the PR interval over several beats, followed by a dropped QRS complex. After the dropped beat, the pattern repeats. The ventricular rate is 56 bpm and the patient is asymptomatic. How should the nurse interpret this rhythm?",
            options: [
                { id: "a", text: "Second-degree AV block, Type II (Mobitz II) - prepare for pacemaker" },
                { id: "b", text: "Second-degree AV block, Type I (Wenckebach) - continue monitoring" },
                { id: "c", text: "Third-degree (complete) heart block - prepare for pacemaker" },
                { id: "d", text: "First-degree AV block - continue monitoring" }
            ],
            correct: "b",
            rationale: {
                correct: "The hallmark of Wenckebach (Type I second-degree AV block) is \"longer, longer, longer, DROP\" - progressive PR prolongation until a QRS is dropped, then the pattern repeats. In an asymptomatic patient, continued monitoring is appropriate. Wenckebach is generally benign and often occurs in the setting of inferior MI or increased vagal tone.",
                a: "Mobitz Type II has a CONSTANT PR interval with sudden, unexpected dropped beats (\"same, same, same, DROP\"). The progressive PR lengthening rules this out. Type II is more dangerous and often requires a pacemaker.",
                c: "Third-degree block shows AV dissociation - P waves and QRS complexes fire independently with no relationship between them. This pattern shows a clear relationship (progressively longer conduction until a beat drops).",
                d: "First-degree AV block has a prolonged but CONSTANT PR interval (> 0.20 sec) with no dropped beats. Every P wave conducts."
            },
            testTakingTip: "Heart block patterns: Type I = \"longer, longer, DROP\" (progressive PR). Type II = \"same, same, DROP\" (fixed PR then sudden drop). This distinction is heavily tested. Type I = usually benign. Type II = usually needs a pacemaker.",
            guideSection: "Section 6 - Heart Blocks",
            guideSectionId: "heart-blocks"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with symptomatic bradycardia (HR 38 bpm, BP 86/52, dizziness, and diaphoresis) is not responding to atropine 0.5 mg IV. The ECG shows a second-degree AV block, Type II. What should the nurse anticipate next?",
            options: [
                { id: "a", text: "Administer a second dose of atropine 1 mg IV" },
                { id: "b", text: "Initiate transcutaneous pacing" },
                { id: "c", text: "Administer adenosine 6 mg rapid IV push" },
                { id: "d", text: "Prepare for synchronized cardioversion" }
            ],
            correct: "b",
            rationale: {
                correct: "Atropine is NOT effective for Mobitz Type II block because the block occurs below the AV node (in the bundle of His or bundle branches), where atropine has no effect. When a patient with symptomatic Type II block does not respond to atropine, transcutaneous pacing is the next intervention to maintain an adequate ventricular rate while preparing for transvenous or permanent pacemaker insertion.",
                a: "Repeating atropine at a higher dose is unlikely to work because the drug\u2019s mechanism (increasing AV node conduction) does not address the infranodal block in Type II. Further doses will not help.",
                c: "Adenosine slows conduction through the AV node and would worsen bradycardia. It is used for SVT, not bradyarrhythmias.",
                d: "Cardioversion is for tachyarrhythmias with a pulse. This patient has bradycardia - cardioversion is not indicated."
            },
            testTakingTip: "Atropine works on the AV node. Mobitz Type II is a block BELOW the AV node - so atropine is ineffective. This is a critical distinction. Type II block almost always requires pacing. If the NCLEX mentions \"atropine failed + Type II,\" go straight to pacing.",
            guideSection: "Section 6 - Heart Blocks",
            guideSectionId: "heart-blocks"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for four patients on telemetry. Which patient should the nurse assess FIRST?",
            options: [
                { id: "a", text: "Patient with atrial fibrillation, ventricular rate 82 bpm, on warfarin, reports feeling \"fine\"" },
                { id: "b", text: "Patient with sinus bradycardia at 54 bpm who is an avid marathon runner, asymptomatic" },
                { id: "c", text: "Patient with monomorphic ventricular tachycardia at 160 bpm, reports dizziness and chest tightness" },
                { id: "d", text: "Patient with first-degree AV block, PR interval 0.24 seconds, asymptomatic" }
            ],
            correct: "c",
            rationale: {
                correct: "Ventricular tachycardia at 160 bpm with symptoms (dizziness, chest tightness) indicates hemodynamic compromise. V-tach can rapidly deteriorate into ventricular fibrillation and cardiac arrest. This patient is unstable and needs immediate intervention - likely synchronized cardioversion or IV antiarrhythmics (amiodarone). This is the most time-sensitive situation.",
                a: "A-fib with a controlled ventricular rate (82 bpm) in a patient who feels fine is stable and well-managed. The warfarin addresses stroke risk.",
                b: "Sinus bradycardia at 54 bpm in a well-trained athlete is a normal physiological finding. Athletes have enhanced vagal tone and higher stroke volumes, resulting in lower resting heart rates.",
                d: "First-degree AV block (PR > 0.20) in an asymptomatic patient is benign and requires only monitoring. It is the least severe of the heart blocks."
            },
            testTakingTip: "For \"who to see first\" questions, always assess the patient with the most dangerous rhythm AND symptoms of instability. An arrhythmia + hemodynamic compromise (dizziness, hypotension, chest pain, altered LOC) = priority. Stable patients with benign rhythms can wait.",
            guideSection: "Section 5 - Ventricular Arrhythmias",
            guideSectionId: "ventricular-rhythms"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient develops polymorphic ventricular tachycardia (torsades de pointes) with a prolonged QT interval on the baseline ECG. The patient has a pulse but is hypotensive. Which medication should the nurse prepare?",
            options: [
                { id: "a", text: "Amiodarone 300 mg IV" },
                { id: "b", text: "Adenosine 6 mg rapid IV push" },
                { id: "c", text: "Magnesium sulfate 1-2 g IV" },
                { id: "d", text: "Atropine 1 mg IV" }
            ],
            correct: "c",
            rationale: {
                correct: "Magnesium sulfate 1-2 g IV is the specific first-line treatment for torsades de pointes. Magnesium helps stabilize the cardiac cell membrane, suppress the triggered activity that causes torsades, and shorten the QT interval. If the patient becomes pulseless, defibrillation (unsynchronized) is also indicated.",
                a: "Amiodarone can actually prolong the QT interval further and may worsen torsades. It is used for monomorphic V-tach and V-fib, not polymorphic V-tach with prolonged QT.",
                b: "Adenosine is for SVT, not ventricular tachycardia. It has no role in treating torsades.",
                d: "Atropine treats bradycardia. Torsades is a tachyarrhythmia - atropine is not indicated."
            },
            testTakingTip: "Torsades de pointes = magnesium. This is a high-yield one-to-one association. Also remember: torsades is treated with unsynchronized defibrillation (like V-fib) if pulseless, because the twisting morphology makes R-wave detection unreliable for sync mode.",
            guideSection: "Section 5 - Ventricular Arrhythmias",
            guideSectionId: "ventricular-rhythms"
        },
        {
            id: 9,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A nurse finds a patient unresponsive in bed with no pulse. The cardiac monitor shows ventricular fibrillation. Place the resuscitation actions in the correct sequence per ACLS protocol.",
            options: [
                { id: "a", text: "Call a code and activate the emergency response system" },
                { id: "b", text: "Begin high-quality chest compressions (push hard, push fast)" },
                { id: "c", text: "Deliver an unsynchronized defibrillation shock as soon as the defibrillator is available" },
                { id: "d", text: "Establish IV/IO access and administer epinephrine 1 mg" },
                { id: "e", text: "Reassess the rhythm after 2 minutes of CPR" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence follows ACLS protocol for V-fib arrest: activate the emergency response, begin CPR immediately, defibrillate at the earliest opportunity, administer vasopressors, and reassess rhythm after each 2-minute cycle.",
                a: "FIRST - Calling a code activates the full resuscitation team and ensures the defibrillator, crash cart, and additional personnel are en route.",
                b: "SECOND - High-quality chest compressions must begin immediately. Rate: 100\u2013120/min, depth: at least 2 inches, full chest recoil, minimal interruptions. CPR is the bridge to defibrillation.",
                c: "THIRD - V-fib is a shockable rhythm. Defibrillation is delivered as soon as the defibrillator is available. For every minute without defibrillation, survival decreases by 7\u201310%.",
                d: "FOURTH - After the first shock and resumption of CPR, IV or IO access is established. Epinephrine 1 mg IV/IO enhances coronary and cerebral perfusion pressure during CPR.",
                e: "FIFTH - After 2 minutes of CPR, the rhythm is reassessed. If V-fib persists, another shock is delivered. This 2-minute cycle continues throughout the resuscitation."
            },
            testTakingTip: "ACLS V-fib protocol: Call \u2192 CPR \u2192 Shock \u2192 Epi \u2192 Reassess. CPR comes BEFORE defibrillation because it takes time to set up the defibrillator. Epinephrine is given DURING CPR, not as a pause.",
            guideSection: "Section 8 - Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A nurse is caring for a patient with unstable atrial fibrillation. The patient\u2019s ventricular rate is 178 bpm, blood pressure is 74/48 mmHg, and the patient is confused and diaphoretic. The provider orders synchronized cardioversion. After the first shock is delivered, the monitor still shows atrial fibrillation. What must the nurse do before delivering a second shock?",
            options: [
                { id: "a", text: "Increase the joules and deliver the shock immediately" },
                { id: "b", text: "Re-engage the synchronization (sync) button before the next shock" },
                { id: "c", text: "Switch to unsynchronized defibrillation mode" },
                { id: "d", text: "Administer amiodarone 150 mg IV before reattempting" }
            ],
            correct: "b",
            rationale: {
                correct: "Most defibrillators automatically revert to unsynchronized mode after delivering a synchronized shock. If the nurse does not re-engage the sync button before the next attempt, the shock will be delivered unsynchronized - which could land on the T wave (vulnerable period) and trigger ventricular fibrillation. Re-engaging sync mode is a critical safety step before every cardioversion attempt.",
                a: "While increasing joules may be appropriate, delivering the shock without re-engaging sync mode is dangerous. The sync button must be verified first.",
                c: "Switching to unsynchronized mode is incorrect because the patient still has a pulse with an organized rhythm (A-fib). Unsynchronized shocks are reserved for pulseless rhythms (V-fib, pulseless V-tach).",
                d: "While medications may be added, the immediate need is electrical cardioversion for this hemodynamically unstable patient. Waiting for medication infusion delays critical treatment."
            },
            testTakingTip: "This is a high-yield fact: the sync button resets after each shock on most defibrillators. You must re-engage it every time before cardioverting. Forgetting this step = unsynchronized shock on a patient with a pulse = potential V-fib.",
            guideSection: "Section 7 - Defibrillation vs Cardioversion",
            guideSectionId: "defib-cardiovert"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A patient has a rhythm with no P waves and a wide QRS complex at a rate of 32 beats per minute. Which pacemaker site has taken over?",
            options: [
                { id: "a", text: "The Purkinje fibres and ventricles" },
                { id: "b", text: "The sinoatrial node in the right atrium" },
                { id: "c", text: "The atrioventricular junction" },
                { id: "d", text: "An accessory pathway in the atrium" }
            ],
            correct: "a",
            rationale: {
                correct: "The heart has a chain of command and each lower level is slower. Purkinje fibres and ventricles fire at 20 to 40 beats per minute and produce a wide QRS over 0.12 seconds with no P waves. This idioventricular rhythm is life threatening.",
                b: "The sinoatrial node fires at 60 to 100 beats per minute with an upright P wave before every QRS.",
                c: "A junctional rhythm runs at 40 to 60 beats per minute with absent or inverted P waves, and the QRS stays narrow.",
                d: "An accessory pathway shortens the PR interval rather than producing a slow wide rhythm."
            },
            testTakingTip: "The lower the pacemaker, the slower the rate and the wider the QRS. That one rule replaces memorising three lists.",
            guideSection: "Section 3 - Where the beat comes from",
            guideSectionId: "conduction"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "application",
            stem: "A nurse counts 9 QRS complexes in a 6 second rhythm strip. What is the heart rate?",
            options: [
                { id: "a", text: "90 beats per minute" },
                { id: "b", text: "54 beats per minute" },
                { id: "c", text: "45 beats per minute" },
                { id: "d", text: "18 beats per minute" }
            ],
            correct: "a",
            rationale: {
                correct: "Count the QRS complexes in a 6 second strip and multiply by 10, since there are ten 6 second segments in a minute. Nine complexes gives 90 beats per minute, which is within the normal range.",
                b: "Multiplying by 6 rather than 10 gives this figure and would apply to a 10 second strip.",
                c: "Halving the correct answer does not correspond to any step in the method.",
                d: "Doubling the count rather than multiplying by 10 gives this figure."
            },
            testTakingTip: "Rate is step one of five. Count in 6 seconds and multiply by 10, then move to rhythm, P waves, PR interval and QRS width.",
            guideSection: "Section 4 - Reading a strip in five steps",
            guideSectionId: "ecg-basics"
        },
        {
            id: 13, type: "single", subtype: null, difficulty: "analysis",
            stem: "A rhythm strip shows no discernible P waves and R to R intervals with no pattern at all. What should the nurse suspect?",
            options: [
                { id: "a", text: "Atrial fibrillation, until proven otherwise" },
                { id: "b", text: "Sinus bradycardia with a slow regular rate" },
                { id: "c", text: "First degree block with a long PR interval" },
                { id: "d", text: "Normal sinus rhythm with occasional artefact" }
            ],
            correct: "a",
            rationale: {
                correct: "Irregularly irregular means no pattern at all in the R to R spacing, and that phrase means atrial fibrillation until proven otherwise. Absent P waves fit the same conclusion.",
                b: "Sinus bradycardia is slow but regular, with an upright P wave before every QRS.",
                c: "A first degree block has a long but constant PR interval, which requires visible P waves.",
                d: "Normal sinus rhythm is regular with a P wave before each QRS."
            },
            testTakingTip: "Learn the phrase. Irregularly irregular with no P waves is atrial fibrillation until something proves otherwise.",
            guideSection: "Section 4 - Reading a strip in five steps",
            guideSectionId: "ecg-basics"
        },
        {
            id: 14, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nurse measures a PR interval of 0.26 seconds on a rhythm strip. How should this be interpreted?",
            options: [
                { id: "a", text: "Prolonged, indicating a conduction block" },
                { id: "b", text: "Normal, since 0.12 to 0.30 is the range" },
                { id: "c", text: "Shortened, indicating an accessory pathway" },
                { id: "d", text: "Unmeasurable without knowing the heart rate" }
            ],
            correct: "a",
            rationale: {
                correct: "A normal PR interval is 0.12 to 0.20 seconds, measured from the start of the P wave to the start of the QRS. Longer than 0.20 seconds means the impulse is delayed, which is a block.",
                b: "The upper limit of normal is 0.20 seconds, not 0.30.",
                c: "A shortened PR interval is under 0.12 seconds and suggests an accessory pathway.",
                d: "The PR interval is measured directly from the strip and does not depend on the rate."
            },
            testTakingTip: "Two intervals to have cold: PR 0.12 to 0.20 seconds, QRS under 0.12 seconds. Longer PR means block; wider QRS means ventricular.",
            guideSection: "Section 4 - Reading a strip in five steps",
            guideSectionId: "ecg-basics"
        },
        {
            id: 15, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient has sinus bradycardia at 38 beats per minute with dizziness and a blood pressure of 84/50 mmHg. What should the nurse anticipate?",
            options: [
                { id: "a", text: "Atropine 1 mg intravenously, up to a 3 mg maximum" },
                { id: "b", text: "Observation alone, because sinus rhythms are benign" },
                { id: "c", text: "Synchronised cardioversion at the lowest energy setting" },
                { id: "d", text: "A beta blocker to stabilise the conduction system" }
            ],
            correct: "a",
            rationale: {
                correct: "Sinus bradycardia needs nothing if the patient is well, but this patient is symptomatic with dizziness and hypotension. Atropine 1 mg intravenously to a maximum of 3 mg is given, with pacing if it does not work.",
                b: "The rhythm is benign only while the patient tolerates it. Symptoms change the answer.",
                c: "Cardioversion treats tachyarrhythmias, not a slow rhythm.",
                d: "A beta blocker slows the heart further and is a cause of bradycardia rather than a treatment."
            },
            testTakingTip: "With sinus rhythms the shape is normal and only the speed is off, so the question is about the cause and whether the patient is symptomatic.",
            guideSection: "Section 5 - Sinus rhythms, and why they are easy",
            guideSectionId: "sinus-rhythms"
        }
    ]
};
