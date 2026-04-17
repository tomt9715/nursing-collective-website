/**
 * Pediatric Congenital Heart Defects Quiz — Question Data
 * NCLEX-style questions covering classification, TOF, tet spells,
 * right-sided heart failure, medications, and family education.
 */

/* exported pediatricCongenitalHeartDefectsQuizData */
var pediatricCongenitalHeartDefectsQuizData = {
    guideName: "Pediatric Congenital Heart Defects",
    guideSlug: "pediatric-congenital-heart-defects",
    category: "Pediatric Nursing",
    categoryColor: "#e05252",
    estimatedMinutes: 18,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 6-month-old with Tetralogy of Fallot suddenly becomes cyanotic, irritable, and tachypneic while being changed on the exam table. What is the nurse's FIRST action?",
            options: [
                { id: "a", text: "Administer 100% oxygen by non-rebreather mask" },
                { id: "b", text: "Place the infant in the knee-to-chest position" },
                { id: "c", text: "Give IV morphine 0.1 mg/kg" },
                { id: "d", text: "Call a rapid response and obtain IV access" }
            ],
            correct: "b",
            rationale: {
                correct: "Knee-to-chest position is the immediate first action in a hypercyanotic 'tet' spell. Flexing the knees up to the chest kinks the femoral arteries, raising systemic vascular resistance and forcing more blood across the pulmonary outflow tract to the lungs. This can be done in seconds, before calling for help.",
                a: "Oxygen is the second step, after positioning. Oxygen alone will not reverse the right-to-left shunt.",
                c: "Morphine helps but is given AFTER positioning and oxygen. Morphine decreases infundibular spasm and reduces respiratory drive.",
                d: "Getting IV access is important but takes time. Positioning is faster and can be done while someone else gets supplies."
            },
            testTakingTip: "For tet spells: 'Knees to chest first' — it requires no equipment, no order, and works immediately. This is the classic NCLEX 'first action' answer for cyanotic CHD.",
            guideSection: "Section 6 — Hypercyanotic Tet Spells",
            guideSectionId: "tet-spells"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which four anatomical defects are present in Tetralogy of Fallot?",
            options: [
                { id: "a", text: "Pulmonary stenosis, RV hypertrophy, overriding aorta, VSD" },
                { id: "b", text: "Aortic stenosis, LV hypertrophy, ASD, coarctation" },
                { id: "c", text: "Pulmonary atresia, tricuspid atresia, ASD, PDA" },
                { id: "d", text: "Transposition, VSD, PDA, patent foramen ovale" }
            ],
            correct: "a",
            rationale: {
                correct: "TOF = PROV: Pulmonary stenosis, Right ventricular hypertrophy, Overriding aorta, VSD. The pulmonary stenosis raises RV pressure, which shunts blood right-to-left across the VSD → cyanosis.",
                a: "Correct — Pulmonary stenosis, RV hypertrophy, overriding aorta, VSD.",
                b: "These defects are not part of TOF. Aortic stenosis and coarctation are separate obstructive lesions.",
                c: "These are separate cyanotic defects, not components of TOF.",
                d: "Transposition of the great arteries is its own cyanotic CHD, not part of TOF."
            },
            testTakingTip: "Memorize PROV or the '4 Hs' — hypertrophy (RV), hole (VSD), hard valve (pulmonary stenosis), horse-riding aorta (overriding). Get this pattern locked in.",
            guideSection: "Section 5 — Tetralogy of Fallot",
            guideSectionId: "tof"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 3-month-old infant with a VSD is receiving digoxin. Before administering the next dose, the nurse auscultates an apical heart rate of 88 beats per minute. What should the nurse do?",
            options: [
                { id: "a", text: "Administer the dose as scheduled" },
                { id: "b", text: "Hold the dose and notify the provider" },
                { id: "c", text: "Give half the prescribed dose" },
                { id: "d", text: "Recheck the HR in 30 minutes and then decide" }
            ],
            correct: "b",
            rationale: {
                correct: "In infants, digoxin should be held if the apical HR is less than 90-110 bpm. An HR of 88 is below the threshold and signals possible digoxin toxicity or excessive effect. The provider must be notified before the next dose is given.",
                a: "Giving digoxin with an HR of 88 in an infant can worsen bradycardia and cause arrhythmia.",
                c: "The nurse cannot independently adjust a medication dose. Either give it as ordered or hold per protocol.",
                d: "The nurse should not delay notification. Holding and calling the provider is the immediate correct action."
            },
            testTakingTip: "Digoxin holding parameters by age: Infant <90-110, Child <70, Adolescent/adult <60. Always check APICAL pulse for a full minute before digoxin.",
            guideSection: "Section 10 — Medications",
            guideSectionId: "medications"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A newborn is diagnosed with a ductal-dependent congenital heart defect. The nurse understands that prostaglandin E1 (alprostadil) is ordered because it:",
            options: [
                { id: "a", text: "Closes the patent ductus arteriosus" },
                { id: "b", text: "Increases the infant's heart rate" },
                { id: "c", text: "Keeps the ductus arteriosus open" },
                { id: "d", text: "Decreases pulmonary vascular resistance" }
            ],
            correct: "c",
            rationale: {
                correct: "Prostaglandin E1 maintains patency of the ductus arteriosus, which is critical in ductal-dependent lesions where the ductus is the only pathway for blood to reach the lungs (or the body). It is a lifesaving bridge until surgery.",
                a: "This is the OPPOSITE — indomethacin or ibuprofen close a PDA in a premature infant. Giving these to a ductal-dependent baby would be fatal.",
                b: "PGE1 doesn't raise heart rate — that is not its mechanism.",
                d: "PGE1 does not primarily affect pulmonary vascular resistance."
            },
            testTakingTip: "Memory trick: 'E for Established' — prostaglandin E1 keeps the ductus ESTABLISHED (open). Indomethacin ends it.",
            guideSection: "Section 10 — Medications",
            guideSectionId: "medications"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is teaching parents of an infant with TOF. Which statement by the parent indicates correct understanding of what to do during a tet spell at home?",
            options: [
                { id: "a", text: "'I will lay my baby flat on the bed and elevate his head.'" },
                { id: "b", text: "'I will hold my baby upright against my shoulder and pat his back.'" },
                { id: "c", text: "'I will fold my baby's knees up to his chest and call 911.'" },
                { id: "d", text: "'I will give him his digoxin early and call the doctor.'" }
            ],
            correct: "c",
            rationale: {
                correct: "The knee-to-chest position increases systemic vascular resistance and pushes more blood into the pulmonary circulation, reversing the spell. Parents must be taught to do this immediately and then call 911 for transport to the ED.",
                a: "Lying flat lowers SVR and worsens the spell. Never lay a cyanotic TOF child flat during an episode.",
                b: "Holding upright and patting is a burping position, not a tet-spell rescue. It does not raise SVR enough.",
                d: "Giving an extra dose of digoxin will not stop a tet spell and risks toxicity."
            },
            testTakingTip: "Expect NCLEX to test parent understanding of tet-spell management. The knee-chest answer is the right one.",
            guideSection: "Section 11 — Family Education",
            guideSectionId: "family-education"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 2-month-old is being evaluated for a heart murmur. The nurse's assessment reveals tachypnea at rest, diaphoresis during feeds, feeds that last 45-60 minutes, and weight gain that has dropped off the growth curve. These findings are most consistent with:",
            options: [
                { id: "a", text: "Normal infant feeding behavior" },
                { id: "b", text: "Infant heart failure" },
                { id: "c", text: "Gastroesophageal reflux" },
                { id: "d", text: "Respiratory syncytial virus (RSV) infection" }
            ],
            correct: "b",
            rationale: {
                correct: "These are the classic signs of infant heart failure: prolonged feeding time, diaphoresis with feeds, tachypnea at rest, and failure to thrive. Feeding is the infant's exercise, and a failing heart cannot meet the oxygen demand. This picture warrants urgent cardiology evaluation.",
                a: "Normal infants feed in 15-30 minutes without sweating and gain weight steadily. This picture is abnormal.",
                c: "GERD typically presents with regurgitation, arching, and irritability — not diaphoresis with feeds or tachypnea at rest.",
                d: "RSV causes respiratory distress but is typically acute with nasal congestion and wheezing, not the chronic feeding/growth pattern described."
            },
            testTakingTip: "The triad of 'tires with feeds + sweats while feeding + poor weight gain' is a high-yield pattern for infant CHF on NCLEX. Memorize it.",
            guideSection: "Section 8 — Right-Sided Heart Failure",
            guideSectionId: "right-heart-failure"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a 4-year-old with a repaired VSD who is scheduled for a dental cleaning in two weeks. The parent asks whether the child needs antibiotics before the appointment. The nurse's best response is:",
            options: [
                { id: "a", text: "'Yes, all children with any history of heart surgery need antibiotics forever.'" },
                { id: "b", text: "'No antibiotics are needed because the repair is complete.'" },
                { id: "c", text: "'Antibiotics are recommended for 6 months after repair; after that it depends on the type of repair.'" },
                { id: "d", text: "'Antibiotics are only needed if the child is currently sick.'" }
            ],
            correct: "c",
            rationale: {
                correct: "SBE (subacute bacterial endocarditis) prophylaxis is required for 6 months after repair of a CHD with prosthetic material (like a patch). After 6 months, if the repair is complete and there is no residual defect, prophylaxis is generally not needed. Prosthetic valves, unrepaired cyanotic CHD, and residual defects adjacent to prosthetic material still require prophylaxis.",
                a: "This is not accurate; prophylaxis is not lifelong for simple repairs without residual defect.",
                b: "This ignores the 6-month prophylaxis window after surgical repair.",
                d: "SBE prophylaxis is for PREVENTING infection during procedures that cause bacteremia (like dental work), not for treating current illness."
            },
            testTakingTip: "Know the SBE prophylaxis groups: unrepaired cyanotic CHD, prosthetic valves, first 6 months after repair with prosthetic material, residual defects adjacent to prosthetic material.",
            guideSection: "Section 9 — Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which physical exam finding is MOST suggestive of coarctation of the aorta in a child?",
            options: [
                { id: "a", text: "A continuous machinery murmur at the left upper sternal border" },
                { id: "b", text: "Higher blood pressure in the arms than in the legs" },
                { id: "c", text: "A fixed, split S2 with a soft systolic murmur" },
                { id: "d", text: "A holosystolic murmur at the left lower sternal border" }
            ],
            correct: "b",
            rationale: {
                correct: "Coarctation narrows the aorta, usually distal to the left subclavian. Blood pressure is high in the upper extremities (pre-coarctation) and diminished in the lower extremities. A gradient >20 mmHg between arms and legs, or weak/absent femoral pulses, is diagnostic.",
                a: "Machinery murmur = PDA, not coarctation.",
                c: "Fixed, split S2 with systolic ejection murmur = ASD.",
                d: "Harsh holosystolic murmur at the left lower sternal border = VSD."
            },
            testTakingTip: "Match the murmur to the defect: VSD = holosystolic LLSB. PDA = continuous machinery. ASD = fixed split S2. Coarctation = BP difference between arms and legs.",
            guideSection: "Section 7 — Obstructive Defects",
            guideSectionId: "obstructive"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A preterm infant has a patent ductus arteriosus causing significant left-to-right shunting and pulmonary overcirculation. The provider orders indomethacin. The nurse understands that this medication:",
            options: [
                { id: "a", text: "Maintains the patency of the ductus" },
                { id: "b", text: "Closes the ductus by inhibiting prostaglandins" },
                { id: "c", text: "Treats the pulmonary hypertension" },
                { id: "d", text: "Decreases left ventricular afterload" }
            ],
            correct: "b",
            rationale: {
                correct: "Indomethacin is a prostaglandin synthesis inhibitor. Prostaglandins keep the fetal ductus open; blocking them closes the ductus. It is used in premature infants with a hemodynamically significant PDA.",
                a: "This is prostaglandin E1's job — the opposite of indomethacin.",
                c: "Indomethacin does not primarily treat pulmonary hypertension.",
                d: "Indomethacin is not an afterload reducer."
            },
            testTakingTip: "NEVER give indomethacin or ibuprofen to an infant with a ductal-dependent lesion. The PDA is keeping them alive — closing it would be fatal.",
            guideSection: "Section 10 — Medications",
            guideSectionId: "medications"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "An infant on digoxin and furosemide has a potassium level of 2.9 mEq/L. The nurse recognizes the priority concern is:",
            options: [
                { id: "a", text: "The infant may need a potassium supplement for growth" },
                { id: "b", text: "Hypokalemia increases the risk of digoxin toxicity" },
                { id: "c", text: "The furosemide should be held until the K+ normalizes" },
                { id: "d", text: "The infant needs a fluid bolus to correct dehydration" }
            ],
            correct: "b",
            rationale: {
                correct: "Hypokalemia potentiates digoxin toxicity. A potassium below 3.5 mEq/L significantly raises the risk of arrhythmia and digoxin poisoning in an infant already on both drugs. Notify the provider — usually potassium replacement is ordered.",
                a: "Potassium is needed in this situation because of the drug interaction, not for normal growth.",
                c: "The nurse cannot hold furosemide independently; it requires a provider order. And the more urgent concern is digoxin toxicity risk.",
                d: "There is no indication of dehydration from the information given; the K+ level is the priority."
            },
            testTakingTip: "The 'Lasix-lowers-K-makes-dig-toxic' chain is NCLEX gold. Any question with a child on both drugs is almost always testing this interaction.",
            guideSection: "Section 10 — Medications",
            guideSectionId: "medications"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 3-month-old with CHF is being fed. The infant has taken 2 oz over 35 minutes, has become diaphoretic, and is falling asleep mid-feed. The nurse's best action is to:",
            options: [
                { id: "a", text: "Wake the infant and continue feeding until the bottle is finished" },
                { id: "b", text: "Stop the feeding, position upright, and document intake" },
                { id: "c", text: "Switch to a firmer nipple to make feeding easier" },
                { id: "d", text: "Hold all feeds for the next four hours to let the infant rest" }
            ],
            correct: "b",
            rationale: {
                correct: "Infants with CHF tire quickly during feeds — feeding is work. Feeds should be limited to about 20-30 minutes to conserve energy. Stopping the feed, holding the infant upright (for reflux and cardiac demand), and documenting intake (with follow-up plan for remaining volume via NG if needed) is appropriate.",
                a: "Pushing the infant past exhaustion increases cardiac demand and risks aspiration. Do not force feeds.",
                c: "A SOFTER nipple (preemie/low-flow) is easier. A firm nipple requires MORE sucking effort.",
                d: "Holding all feeds worsens caloric deficit. Small, frequent feeds are the strategy, not skipping them."
            },
            testTakingTip: "Key feeding principles for CHD/CHF infants: softer nipple, 20-30 min max, small frequent feeds, calorie-dense formula, upright positioning.",
            guideSection: "Section 9 — Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which cyanotic CHD is associated with a 'boot-shaped' heart on chest X-ray?",
            options: [
                { id: "a", text: "Transposition of the great arteries" },
                { id: "b", text: "Tetralogy of Fallot" },
                { id: "c", text: "Tricuspid atresia" },
                { id: "d", text: "Coarctation of the aorta" }
            ],
            correct: "b",
            rationale: {
                correct: "The 'boot-shaped heart' (coeur en sabot) is the classic chest X-ray finding of Tetralogy of Fallot, caused by right ventricular hypertrophy lifting the apex of the heart.",
                a: "Transposition shows an 'egg-on-a-string' appearance on X-ray.",
                c: "Tricuspid atresia has variable X-ray findings — often decreased pulmonary markings — but is not described as boot-shaped.",
                d: "Coarctation is not a cyanotic defect, and its X-ray findings include rib notching (older children)."
            },
            testTakingTip: "Classic CXR patterns to remember: TOF = boot. TGA = egg on a string. TAPVR = snowman. These are high-yield visual associations.",
            guideSection: "Section 5 — Tetralogy of Fallot",
            guideSectionId: "tof"
        },
        {
            id: 13,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A neonate in the NICU is receiving a continuous prostaglandin E1 infusion for a ductal-dependent CHD. Which assessment finding requires the most immediate nursing action?",
            options: [
                { id: "a", text: "Temperature of 38.1°C (100.6°F)" },
                { id: "b", text: "Flushed, warm skin" },
                { id: "c", text: "Apneic episode lasting 20 seconds" },
                { id: "d", text: "Blood pressure 65/40 mmHg" }
            ],
            correct: "c",
            rationale: {
                correct: "Apnea is the most serious adverse effect of prostaglandin E1, occurring in 10-12% of neonates usually within the first hour. The nurse must stimulate the infant, ensure airway/breathing, and prepare for possible intubation. Always have intubation supplies at the bedside on a PGE1 infusion.",
                a: "Fever is an expected side effect of PGE1 and is managed with antipyretics — not immediately life-threatening.",
                b: "Flushing is a common PGE1 side effect; not life-threatening.",
                d: "This BP is within range for a neonate. Severe hypotension would be more concerning, but it does not beat apnea for priority."
            },
            testTakingTip: "PGE1 = apnea. Always. This is a high-yield NCLEX priority question. Keep BVM and intubation equipment at the bedside.",
            guideSection: "Section 10 — Medications",
            guideSectionId: "medications"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old with unrepaired Tetralogy of Fallot is seen squatting frequently during play. The parent asks the nurse why this happens. The nurse's best response is:",
            options: [
                { id: "a", text: "'It is a behavioral habit that will improve with age.'" },
                { id: "b", text: "'Squatting decreases blood flow to the lungs, which eases breathing.'" },
                { id: "c", text: "'Squatting raises blood pressure in the body, pushing more blood to the lungs for oxygen.'" },
                { id: "d", text: "'It is a sign of worsening heart failure that requires urgent evaluation.'" }
            ],
            correct: "c",
            rationale: {
                correct: "Squatting kinks the femoral arteries, raising systemic vascular resistance. Higher SVR forces blood across the VSD toward the lungs (rather than right-to-left), improving oxygenation. This is the same physiology as the knee-to-chest position during a tet spell — it's a self-protective maneuver, not a problem.",
                a: "It is not a behavioral habit; it is a compensatory physiologic maneuver.",
                b: "Squatting INCREASES pulmonary blood flow, not decreases it.",
                d: "Squatting is typical for children with TOF and, while it indicates the defect is not fully repaired, it is not a sign of acute worsening."
            },
            testTakingTip: "Squatting = SVR increase = more blood to lungs. Same idea as knee-chest during a tet spell. Both increase afterload on the left side.",
            guideSection: "Section 5 — Tetralogy of Fallot",
            guideSectionId: "tof"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Atrioventricular septal defect (AVSD) is most strongly associated with which genetic condition?",
            options: [
                { id: "a", text: "Turner syndrome" },
                { id: "b", text: "Trisomy 21 (Down syndrome)" },
                { id: "c", text: "Marfan syndrome" },
                { id: "d", text: "Cystic fibrosis" }
            ],
            correct: "b",
            rationale: {
                correct: "AVSD is strongly associated with Trisomy 21 — about 40% of children with Down syndrome have a CHD, and AVSD is the most common type. All infants with Down syndrome should have an echocardiogram at birth.",
                a: "Turner syndrome is associated with coarctation of the aorta and bicuspid aortic valve.",
                c: "Marfan syndrome is associated with aortic root dilation and mitral valve prolapse.",
                d: "Cystic fibrosis is not typically associated with CHD."
            },
            testTakingTip: "Genetic → CHD pairings for NCLEX: Down → AVSD/VSD. Turner → coarctation. Marfan → aortic root dilation. DiGeorge (22q11) → TOF, truncus arteriosus.",
            guideSection: "Section 3 — Increased Flow Defects",
            guideSectionId: "increased-flow"
        },
        {
            id: 16,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for four pediatric cardiac patients. Which patient should be seen FIRST?",
            options: [
                { id: "a", text: "A 2-year-old post-VSD repair with stable vitals who is requesting pain medication" },
                { id: "b", text: "A 6-month-old with unrepaired TOF whose parent reports 'he's acting different — very blue and sleepy'" },
                { id: "c", text: "A 4-year-old with a repaired ASD who needs discharge teaching" },
                { id: "d", text: "A 10-year-old post-cardiac cath who has mild bruising at the femoral site" }
            ],
            correct: "b",
            rationale: {
                correct: "A TOF patient who is 'very blue and sleepy' may be in a prolonged or severe tet spell. Decreased responsiveness with deep cyanosis suggests the spell is not self-resolving and the child is at risk for hypoxic injury, seizure, or death. This is the priority assessment.",
                a: "Pain is important but not life-threatening. This patient can wait.",
                c: "Discharge teaching is routine work and not time-critical.",
                d: "Mild bruising at a cath site is expected. Only a growing hematoma, bleeding, or pulse change would be urgent."
            },
            testTakingTip: "Airway/breathing/circulation > pain > teaching. A cyanotic lethargic child trumps every other task on the floor.",
            guideSection: "Section 6 — Hypercyanotic Tet Spells",
            guideSectionId: "tet-spells"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A parent of an infant on digoxin calls the nurse's line and reports, 'She just spit up her whole dose of medicine.' What is the nurse's best response?",
            options: [
                { id: "a", text: "'Give her the same dose again right now.'" },
                { id: "b", text: "'Give half of the dose to replace what she spit up.'" },
                { id: "c", text: "'Do not give a replacement dose. Give the next dose at the usual scheduled time.'" },
                { id: "d", text: "'Bring her to the emergency department immediately.'" }
            ],
            correct: "c",
            rationale: {
                correct: "If a digoxin dose is vomited, do NOT repeat it. Re-dosing risks digoxin toxicity because you don't know how much was absorbed. Resume with the next scheduled dose. This is a specific teaching point parents should receive at discharge.",
                a: "Re-dosing after vomiting can cause digoxin toxicity.",
                b: "Giving a partial dose also risks toxicity and is not standard practice.",
                d: "Unless the infant is symptomatic (vomiting, bradycardia, lethargy), ED visit is not needed."
            },
            testTakingTip: "Digoxin spit-up rule: never re-dose. Digoxin missed >4 hours: skip and resume. Memorize these two rules — they are NCLEX-tested.",
            guideSection: "Section 10 — Medications",
            guideSectionId: "medications"
        }
    ]
};
