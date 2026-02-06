/**
 * Arrhythmias Quiz — Question Data
 * Extracted from guides/arrhythmias.html practice questions section.
 * 10 NCLEX-style questions: 5 Single, 2 SATA, 2 Priority, 1 Analysis
 */

/* exported arrhythmiasQuizData */
var arrhythmiasQuizData = {
    guideName: "Arrhythmias",
    guideSlug: "arrhythmias",
    category: "Cardiovascular",
    categoryColor: "#ef4444",
    estimatedMinutes: 15,
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
            guideSection: "Section 4 \u2014 Atrial Arrhythmias",
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
                d: "Synchronized cardioversion requires the defibrillator to identify R waves for timing. V-fib has no identifiable R waves \u2014 synchronized mode will not fire. V-fib requires UNSYNCHRONIZED defibrillation."
            },
            testTakingTip: "Pulseless = start CPR immediately. V-fib and pulseless V-tach are \"shockable\" rhythms requiring defibrillation (unsynchronized). Synchronized cardioversion is for patients WITH a pulse who are hemodynamically unstable.",
            guideSection: "Section 5 \u2014 Ventricular Arrhythmias",
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
                c: "Atropine is used for symptomatic bradycardia. This patient has tachycardia \u2014 atropine would worsen the rate.",
                d: "Epinephrine is used in cardiac arrest protocols. It increases heart rate and would be harmful in SVT."
            },
            testTakingTip: "SVT treatment ladder: Vagal maneuvers \u2192 Adenosine 6 mg \u2192 Adenosine 12 mg \u2192 Cardioversion if unstable. Remember adenosine\u2019s administration: rapid IV push through the most proximal IV site + 20 mL flush. Warn the patient about transient chest discomfort.",
            guideSection: "Section 4 \u2014 Atrial Arrhythmias",
            guideSectionId: "atrial-rhythms"
        },
        {
            id: 4,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A patient with new-onset atrial fibrillation is being admitted to the telemetry unit. Which nursing interventions should the nurse anticipate? Select all that apply.",
            options: [
                { id: "a", text: "Initiate anticoagulation therapy as ordered" },
                { id: "b", text: "Administer adenosine 6 mg rapid IV push" },
                { id: "c", text: "Administer rate-control medication (diltiazem or metoprolol) as ordered" },
                { id: "d", text: "Prepare for immediate defibrillation" },
                { id: "e", text: "Monitor potassium and magnesium levels" }
            ],
            correct: ["a", "c", "e"],
            rationale: {
                correct: "A-fib management has 3 pillars: (1) rate control, (2) rhythm control (if indicated), and (3) stroke prevention with anticoagulation. Monitoring electrolytes (K+, Mg2+) is essential for any arrhythmia.",
                a: "CORRECT \u2014 Atrial fibrillation causes blood to pool in the fibrillating atria, forming clots that can embolize to the brain (stroke). Anticoagulation is essential to reduce this risk.",
                b: "INCORRECT \u2014 Adenosine is first-line for SVT, not atrial fibrillation. A-fib is managed with rate control (beta-blockers, calcium channel blockers) or rhythm control (amiodarone, cardioversion).",
                c: "CORRECT \u2014 Rate control with diltiazem or metoprolol slows the ventricular response rate, allowing the heart to fill more effectively and reducing myocardial oxygen demand.",
                d: "INCORRECT \u2014 Defibrillation is for pulseless rhythms (V-fib, pulseless V-tach). If this patient is hemodynamically unstable, synchronized cardioversion (not defibrillation) would be indicated. The question describes an admission, suggesting the patient is stable.",
                e: "CORRECT \u2014 Low potassium and magnesium contribute to atrial fibrillation and other arrhythmias. Correcting electrolyte imbalances is a priority nursing intervention for any arrhythmia."
            },
            testTakingTip: "A-fib management has 3 pillars: (1) rate control, (2) rhythm control (if indicated), and (3) stroke prevention with anticoagulation. Always check electrolytes (K+, Mg2+) for any arrhythmia.",
            guideSection: "Section 4 \u2014 Atrial Arrhythmias",
            guideSectionId: "atrial-rhythms"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient\u2019s telemetry strip shows a regular rhythm with a progressive lengthening of the PR interval over several beats, followed by a dropped QRS complex. After the dropped beat, the pattern repeats. The ventricular rate is 56 bpm and the patient is asymptomatic. How should the nurse interpret this rhythm?",
            options: [
                { id: "a", text: "Second-degree AV block, Type II (Mobitz II) \u2014 prepare for pacemaker" },
                { id: "b", text: "Second-degree AV block, Type I (Wenckebach) \u2014 continue monitoring" },
                { id: "c", text: "Third-degree (complete) heart block \u2014 prepare for pacemaker" },
                { id: "d", text: "First-degree AV block \u2014 continue monitoring" }
            ],
            correct: "b",
            rationale: {
                correct: "The hallmark of Wenckebach (Type I second-degree AV block) is \"longer, longer, longer, DROP\" \u2014 progressive PR prolongation until a QRS is dropped, then the pattern repeats. In an asymptomatic patient, continued monitoring is appropriate. Wenckebach is generally benign and often occurs in the setting of inferior MI or increased vagal tone.",
                a: "Mobitz Type II has a CONSTANT PR interval with sudden, unexpected dropped beats (\"same, same, same, DROP\"). The progressive PR lengthening rules this out. Type II is more dangerous and often requires a pacemaker.",
                c: "Third-degree block shows AV dissociation \u2014 P waves and QRS complexes fire independently with no relationship between them. This pattern shows a clear relationship (progressively longer conduction until a beat drops).",
                d: "First-degree AV block has a prolonged but CONSTANT PR interval (> 0.20 sec) with no dropped beats. Every P wave conducts."
            },
            testTakingTip: "Heart block patterns: Type I = \"longer, longer, DROP\" (progressive PR). Type II = \"same, same, DROP\" (fixed PR then sudden drop). This distinction is heavily tested. Type I = usually benign. Type II = usually needs a pacemaker.",
            guideSection: "Section 6 \u2014 Heart Blocks",
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
                d: "Cardioversion is for tachyarrhythmias with a pulse. This patient has bradycardia \u2014 cardioversion is not indicated."
            },
            testTakingTip: "Atropine works on the AV node. Mobitz Type II is a block BELOW the AV node \u2014 so atropine is ineffective. This is a critical distinction. Type II block almost always requires pacing. If the NCLEX mentions \"atropine failed + Type II,\" go straight to pacing.",
            guideSection: "Section 6 \u2014 Heart Blocks",
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
                correct: "Ventricular tachycardia at 160 bpm with symptoms (dizziness, chest tightness) indicates hemodynamic compromise. V-tach can rapidly deteriorate into ventricular fibrillation and cardiac arrest. This patient is unstable and needs immediate intervention \u2014 likely synchronized cardioversion or IV antiarrhythmics (amiodarone). This is the most time-sensitive situation.",
                a: "A-fib with a controlled ventricular rate (82 bpm) in a patient who feels fine is stable and well-managed. The warfarin addresses stroke risk.",
                b: "Sinus bradycardia at 54 bpm in a well-trained athlete is a normal physiological finding. Athletes have enhanced vagal tone and higher stroke volumes, resulting in lower resting heart rates.",
                d: "First-degree AV block (PR > 0.20) in an asymptomatic patient is benign and requires only monitoring. It is the least severe of the heart blocks."
            },
            testTakingTip: "For \"who to see first\" questions, always assess the patient with the most dangerous rhythm AND symptoms of instability. An arrhythmia + hemodynamic compromise (dizziness, hypotension, chest pain, altered LOC) = priority. Stable patients with benign rhythms can wait.",
            guideSection: "Section 5 \u2014 Ventricular Arrhythmias",
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
                d: "Atropine treats bradycardia. Torsades is a tachyarrhythmia \u2014 atropine is not indicated."
            },
            testTakingTip: "Torsades de pointes = magnesium. This is a high-yield one-to-one association. Also remember: torsades is treated with unsynchronized defibrillation (like V-fib) if pulseless, because the twisting morphology makes R-wave detection unreliable for sync mode.",
            guideSection: "Section 5 \u2014 Ventricular Arrhythmias",
            guideSectionId: "ventricular-rhythms"
        },
        {
            id: 9,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing to administer adenosine to a patient with SVT. Which nursing actions are appropriate? Select all that apply.",
            options: [
                { id: "a", text: "Use an IV site as close to the heart as possible (antecubital preferred)" },
                { id: "b", text: "Administer the drug slowly over 1-2 minutes by IV infusion" },
                { id: "c", text: "Follow immediately with a 20 mL rapid normal saline flush" },
                { id: "d", text: "Warn the patient about transient chest discomfort and a sense of impending doom" },
                { id: "e", text: "Have the defibrillator at bedside in case of rhythm deterioration" }
            ],
            correct: ["a", "c", "d", "e"],
            rationale: {
                correct: "Adenosine administration requires a proximal IV site, rapid push with immediate saline flush, patient warning about transient side effects, and emergency equipment at bedside.",
                a: "CORRECT \u2014 Adenosine has a half-life of less than 10 seconds. Using the most proximal IV site (antecubital or higher) ensures the drug reaches the heart before it is metabolized.",
                b: "INCORRECT \u2014 Adenosine must be given as a rapid IV push, NOT a slow infusion. Due to its ultra-short half-life, slow administration means the drug is broken down before it reaches the heart and will be ineffective.",
                c: "CORRECT \u2014 A rapid 20 mL saline flush immediately after the adenosine push propels the drug quickly into the central circulation before it is metabolized.",
                d: "CORRECT \u2014 Adenosine causes a brief period of asystole (seconds) as it resets the cardiac conduction. Patients often experience transient chest discomfort, facial flushing, and a feeling of \"impending doom.\" Warning the patient reduces anxiety.",
                e: "CORRECT \u2014 While rare, adenosine can trigger dangerous arrhythmias including V-fib. Emergency equipment should always be at the bedside during administration."
            },
            testTakingTip: "Adenosine = \"rapid push, rapid flush, closest IV site.\" The 10-second half-life is the key fact. If any answer choice suggests slow administration, it\u2019s automatically wrong.",
            guideSection: "Section 8 \u2014 Nursing Interventions",
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
                correct: "Most defibrillators automatically revert to unsynchronized mode after delivering a synchronized shock. If the nurse does not re-engage the sync button before the next attempt, the shock will be delivered unsynchronized \u2014 which could land on the T wave (vulnerable period) and trigger ventricular fibrillation. Re-engaging sync mode is a critical safety step before every cardioversion attempt.",
                a: "While increasing joules may be appropriate, delivering the shock without re-engaging sync mode is dangerous. The sync button must be verified first.",
                c: "Switching to unsynchronized mode is incorrect because the patient still has a pulse with an organized rhythm (A-fib). Unsynchronized shocks are reserved for pulseless rhythms (V-fib, pulseless V-tach).",
                d: "While medications may be added, the immediate need is electrical cardioversion for this hemodynamically unstable patient. Waiting for medication infusion delays critical treatment."
            },
            testTakingTip: "This is a high-yield fact: the sync button resets after each shock on most defibrillators. You must re-engage it every time before cardioverting. Forgetting this step = unsynchronized shock on a patient with a pulse = potential V-fib.",
            guideSection: "Section 7 \u2014 Defibrillation vs Cardioversion",
            guideSectionId: "defib-cardiovert"
        }
    ]
};
