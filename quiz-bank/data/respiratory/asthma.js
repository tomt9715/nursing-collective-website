/**
 * Quiz Bank — Asthma
 * The Nursing Collective
 *
 * 20 questions: 11 single, 5 ordering, 4 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "asthma-qb-001",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is educating a patient about inhaled corticosteroid (ICS) side effects. Which instruction is most important to include?",
        options: [
            { id: "a", text: "Limit fluid intake while using ICS to prevent fluid overload." },
            { id: "b", text: "Rinse your mouth and gargle with water after each use to prevent oral thrush." },
            { id: "c", text: "Take the ICS only when you feel wheezing coming on." },
            { id: "d", text: "Expect your voice to permanently change after starting the medication." }
        ],
        correct: "b",
        rationale: {
            correct: "Oral candidiasis (thrush) is the most common local side effect of inhaled corticosteroids. Rinsing the mouth and gargling after each use washes away residual steroid deposited in the oropharynx, significantly reducing the risk. Dysphonia (hoarseness) can occur but is usually reversible, not permanent. ICS are controller medications used daily, not PRN. Fluid restriction is not related to ICS use."
        },
        testTakingTip: "ICS teaching essentials: rinse and spit after every use, use a spacer with MDI, take daily (not PRN), and report white patches in the mouth. This is one of the most commonly tested teaching points.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "medications"
    },

    {
        id: "asthma-qb-002",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "application",
        stem: "A pregnant patient at 28 weeks gestation with moderate persistent asthma asks the nurse if she should stop her controller medications because she is worried about harming the baby. Which response is most appropriate?",
        options: [
            { id: "a", text: "You should stop all asthma medications during pregnancy to protect the baby." },
            { id: "b", text: "Uncontrolled asthma poses a greater risk to your baby than the medications do. Continue your controller medications as prescribed and discuss any concerns with your provider." },
            { id: "c", text: "Switch to using only your rescue inhaler whenever symptoms occur." },
            { id: "d", text: "Increase your medication doses during pregnancy because your lungs are working harder." }
        ],
        correct: "b",
        rationale: {
            correct: "Uncontrolled asthma during pregnancy poses significant risks to both mother and fetus, including preeclampsia, preterm birth, low birth weight, and maternal hypoxemia. Most asthma medications (especially ICS like budesonide, and SABAs like albuterol) have a good safety profile in pregnancy. Discontinuing controller therapy leads to exacerbations and worse outcomes than continued treatment. The stepwise approach remains the same during pregnancy."
        },
        testTakingTip: "Asthma in pregnancy: continue controller medications. The risk of uncontrolled asthma (hypoxemia to the fetus) is far greater than the risk of most asthma medications. Budesonide is the preferred ICS in pregnancy.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "special-populations"
    },

    {
        id: "asthma-qb-003",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "analysis",
        stem: "A school nurse receives notification that a 10-year-old student with asthma has been using her rescue inhaler every day at school for the past 2 weeks. The student's asthma action plan indicates the rescue inhaler should be used no more than 2 times per week. Which action is the priority?",
        options: [
            { id: "a", text: "Remove the rescue inhaler from the student's possession until the parents provide updated orders." },
            { id: "b", text: "Contact the parents and recommend they schedule a provider appointment, as daily rescue inhaler use suggests uncontrolled asthma requiring a change in the treatment plan." },
            { id: "c", text: "Instruct the student to use pursed-lip breathing instead of the inhaler." },
            { id: "d", text: "Document the inhaler usage and continue monitoring for 2 more weeks." }
        ],
        correct: "b",
        rationale: {
            correct: "Using a rescue inhaler daily (or more than 2 days/week) is a key indicator of uncontrolled asthma requiring a step-up in therapy. The school nurse should contact the parents immediately to ensure the child is seen by the provider for treatment adjustment — likely initiating or increasing controller medication. Never remove a rescue inhaler from an asthmatic child. Waiting 2 more weeks delays necessary treatment changes."
        },
        testTakingTip: "Rescue inhaler use >2 days/week = poorly controlled asthma = needs step-up therapy. This threshold is a high-yield indicator of uncontrolled asthma on NCLEX.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "asthma-qb-004",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "application",
        stem: "A patient with exercise-induced bronchoconstriction (EIB) asks the nurse how to prevent asthma symptoms during workouts. Which teaching is most appropriate?",
        options: [
            { id: "a", text: "Avoid all forms of exercise, as it will always trigger an asthma attack." },
            { id: "b", text: "Use 2 puffs of your rescue inhaler (albuterol) 15-30 minutes before exercise, and include a gradual warm-up period." },
            { id: "c", text: "Take an extra dose of your controller inhaler immediately before starting exercise." },
            { id: "d", text: "Exercise only in cold, dry air because it is less likely to trigger symptoms." }
        ],
        correct: "b",
        rationale: {
            correct: "Pre-treatment with a SABA (albuterol) 15-30 minutes before exercise is the standard prevention strategy for EIB. A gradual 10-15 minute warm-up also helps prevent bronchoconstriction. Exercise is NOT contraindicated in asthma — regular physical activity improves cardiovascular fitness and can reduce symptoms over time. Cold, dry air is a known trigger that worsens EIB; warm, humid environments are preferred."
        },
        testTakingTip: "Exercise-induced bronchoconstriction: albuterol 15-30 minutes BEFORE exercise + warm-up. Asthma patients should exercise — it's a trigger to manage, not a reason to avoid activity.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "triggers"
    },

    {
        id: "asthma-qb-005",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is reviewing the asthma stepwise therapy guidelines. At which step is a long-acting beta-agonist (LABA) first added to the treatment regimen?",
        options: [
            { id: "a", text: "Step 1 — Intermittent asthma" },
            { id: "b", text: "Step 2 — Mild persistent asthma" },
            { id: "c", text: "Step 3 — Moderate persistent asthma" },
            { id: "d", text: "Step 5 — Severe persistent asthma" }
        ],
        correct: "c",
        rationale: {
            correct: "In the stepwise approach: Step 1 uses PRN SABA only. Step 2 adds low-dose ICS. Step 3 adds a LABA to the low-dose ICS (or increases to medium-dose ICS). This is the first step where combination ICS/LABA therapy is introduced. A LABA should NEVER be used as monotherapy in asthma (without an ICS) due to the risk of severe exacerbations."
        },
        testTakingTip: "LABA is NEVER used alone in asthma — always paired with ICS. LABA + ICS combination starts at Step 3. Key safety concept: LABA monotherapy increases the risk of asthma-related death.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "medications"
    },

    {
        id: "asthma-qb-006",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is assessing a 6-year-old child in the ED who is having a moderate asthma exacerbation. The child is sitting in the tripod position, has audible expiratory wheezing, an SpO2 of 91%, and can speak in short phrases but not full sentences. After administering 3 rounds of nebulized albuterol every 20 minutes, the child's SpO2 improves to 94% but the wheezing persists and the child remains dyspneic. Which medication does the nurse anticipate the provider will order next?",
        options: [
            { id: "a", text: "A fourth round of nebulized albuterol in 20 minutes" },
            { id: "b", text: "Oral systemic corticosteroid (prednisolone) and ipratropium added to the next albuterol nebulizer" },
            { id: "c", text: "Inhaled corticosteroid (fluticasone) via MDI with spacer and mask" },
            { id: "d", text: "Subcutaneous epinephrine 1:1,000" }
        ],
        correct: "b",
        rationale: {
            correct: "After 3 rounds of albuterol with partial response, the next step is adding ipratropium bromide to the albuterol nebulizer (combined bronchodilation via different mechanisms) and administering systemic corticosteroids (oral prednisolone for children). Corticosteroids reduce airway inflammation and take 4-6 hours for full effect, so they should be given early. Continuing albuterol alone without escalation is inadequate for a partial responder. ICS is a maintenance medication, not for acute exacerbations. Subcutaneous epinephrine is reserved for severe/near-fatal asthma or anaphylaxis."
        },
        testTakingTip: "Partial response after 3 nebulizers: add ipratropium + systemic steroids. Steroids take hours to work, so give them early. This is the standard ED asthma escalation pathway.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "asthma-qb-007",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is teaching a patient about common asthma triggers. Which of the following is classified as an allergen trigger rather than an irritant trigger?",
        options: [
            { id: "a", text: "Cigarette smoke exposure" },
            { id: "b", text: "Strong perfumes and cleaning chemicals" },
            { id: "c", text: "Dust mite fecal proteins in bedding" },
            { id: "d", text: "Cold, dry air during winter months" }
        ],
        correct: "c",
        rationale: {
            correct: "Dust mite proteins are allergen triggers — they cause an IgE-mediated immune response in sensitized individuals. Cigarette smoke, strong chemicals/perfumes, and cold air are irritant triggers — they directly irritate the airways without an immune-mediated response. The distinction matters because allergen triggers can be addressed with allergen avoidance measures and possibly immunotherapy, while irritant triggers require environmental control strategies."
        },
        testTakingTip: "Allergen triggers involve an immune (IgE) response: dust mites, pet dander, cockroach proteins, mold, pollen. Irritant triggers cause direct airway irritation: smoke, chemicals, cold air, strong odors. Both cause bronchoconstriction but through different mechanisms.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "triggers"
    },

    {
        id: "asthma-qb-008",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "application",
        stem: "A nurse is caring for a patient with severe persistent asthma who has been maintained on high-dose ICS/LABA and oral prednisone 20 mg daily for the past 4 months. The patient reports a rounded facial appearance, easy bruising, and elevated blood glucose levels. Which complication should the nurse suspect?",
        options: [
            { id: "a", text: "Side effects of long-term systemic corticosteroid use (iatrogenic Cushing syndrome)" },
            { id: "b", text: "Allergic reaction to the inhaled corticosteroid" },
            { id: "c", text: "Side effects of the LABA medication" },
            { id: "d", text: "Progression of asthma to COPD" }
        ],
        correct: "a",
        rationale: {
            correct: "Moon face (Cushingoid appearance), easy bruising, and hyperglycemia are classic signs of iatrogenic Cushing syndrome from long-term systemic corticosteroid (prednisone) use. Other effects include osteoporosis, cataracts, adrenal suppression, weight gain, and immunosuppression. This is why systemic corticosteroids are used at the lowest possible dose for the shortest duration, and why step-down therapy is always attempted. These are not effects of ICS (which have minimal systemic absorption) or LABAs."
        },
        testTakingTip: "Long-term oral steroids → Cushing features: moon face, buffalo hump, thin skin, bruising, hyperglycemia, osteoporosis. This is why asthma guidelines emphasize ICS (local action) over oral steroids (systemic effects).",
        relatedGuide: "asthma.html",
        relatedGuideSection: "medications"
    },

    {
        id: "asthma-qb-009",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "analysis",
        stem: "A patient presents to the ED at 2:00 AM with an asthma exacerbation. The patient reports this is the third nighttime episode this month. Between episodes, the patient feels well and peak flow is 85% of personal best. Which classification best describes this patient's asthma severity?",
        options: [
            { id: "a", text: "Intermittent asthma" },
            { id: "b", text: "Mild persistent asthma" },
            { id: "c", text: "Moderate persistent asthma" },
            { id: "d", text: "Severe persistent asthma" }
        ],
        correct: "c",
        rationale: {
            correct: "Asthma severity classification considers multiple factors. Nighttime awakenings >1x/week but not nightly indicate moderate persistent asthma (3 times/month = almost 1x/week). Even though the patient feels well between episodes with a peak flow of 85%, the frequency of nocturnal symptoms determines the classification. Mild persistent = nighttime symptoms 3-4x/month, moderate persistent = >1x/week, severe persistent = nightly. Classification is based on the MOST SEVERE indicator."
        },
        testTakingTip: "Asthma severity is classified by the WORST indicator. A patient can have normal daytime function but nocturnal symptoms that push the classification higher. Nighttime symptoms are a key severity marker.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "classification"
    },

    {
        id: "asthma-qb-010",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "application",
        stem: "A nurse is preparing to discharge a patient from the ED after treatment for an acute asthma exacerbation. Which criteria must be met before the patient can safely be discharged?",
        options: [
            { id: "a", text: "Peak flow returns to at least 70% of personal best, SpO2 ≥94% on room air, and the patient can demonstrate correct inhaler technique" },
            { id: "b", text: "Wheezing has completely resolved and the patient reports feeling 100% back to normal" },
            { id: "c", text: "The patient has received at least one dose of IV corticosteroids and one nebulizer treatment" },
            { id: "d", text: "The patient's chest X-ray shows complete resolution of any infiltrates" }
        ],
        correct: "a",
        rationale: {
            correct: "Safe ED discharge criteria for asthma include: sustained peak flow ≥70% of personal best (or predicted) for at least 60 minutes, SpO2 ≥94% on room air, subjective symptom improvement, ability to demonstrate proper inhaler technique, and a clear follow-up plan with a written action plan. Complete resolution of wheezing is not required — mild residual wheezing is common. Chest X-rays are not routinely needed for asthma exacerbations unless complications are suspected."
        },
        testTakingTip: "Asthma ED discharge: peak flow ≥70%, SpO2 ≥94%, proper inhaler technique demonstrated, follow-up within 1-4 weeks, written action plan. These objective criteria prevent premature discharge.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "asthma-qb-011",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with moderate persistent asthma has been well-controlled on medium-dose ICS/LABA for 6 months with no exacerbations, no nighttime symptoms, and rescue inhaler use less than once a month. The nurse anticipates the provider may consider which change?",
        options: [
            { id: "a", text: "Discontinue all controller medications immediately since symptoms are resolved" },
            { id: "b", text: "Step-down therapy by reducing to low-dose ICS/LABA while continuing to monitor control" },
            { id: "c", text: "Add oral corticosteroids to the regimen for extra protection" },
            { id: "d", text: "Switch to a higher dose to prevent future exacerbations" }
        ],
        correct: "b",
        rationale: {
            correct: "When asthma is well-controlled for at least 3 months, guidelines recommend a step-down approach: reduce therapy to the lowest effective dose. The patient would step down from medium-dose to low-dose ICS/LABA while monitoring for any loss of control. Abrupt discontinuation risks rebound exacerbation. Adding oral steroids or increasing doses is inappropriate when asthma is controlled. Step-down should be gradual, with reassessment at each step."
        },
        testTakingTip: "Step-down after 3+ months of good control. Step-up when control is poor. Never abruptly stop controller therapy. The goal is the LOWEST effective dose to maintain control.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "medications"
    },

    // ── ORDERING (5) ─────────────────────────────────────────

    {
        id: "asthma-qb-012",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "ordering",
        difficulty: "application",
        stem: "A patient in the ED is progressing to status asthmaticus. The initial nebulized albuterol treatments have provided no relief, SpO2 is falling to 88%, and the patient can barely speak. Place the nurse's escalation actions in priority order.",
        options: [
            { id: "s1", text: "Apply continuous pulse oximetry and prepare for continuous nebulized albuterol" },
            { id: "s2", text: "Administer IV magnesium sulfate 2g over 20 minutes as ordered" },
            { id: "s3", text: "Notify the provider and respiratory therapy — prepare for possible intubation" },
            { id: "s4", text: "Obtain a STAT ABG to assess for respiratory acidosis and CO2 retention" },
            { id: "s5", text: "Administer IV methylprednisolone and ensure IV access is patent" }
        ],
        correct: ["s1", "s3", "s5", "s4", "s2"],
        rationale: {
            s1: "Continuous monitoring and switching to continuous nebulized albuterol is the immediate nursing intervention for a patient failing intermittent treatments.",
            s3: "Status asthmaticus is a life-threatening emergency. The provider and respiratory therapy must be at the bedside for airway management planning.",
            s5: "IV corticosteroids (methylprednisolone) are essential — they reduce airway inflammation, but take 4-6 hours for full effect. IV access must be confirmed for all emergency medications.",
            s4: "ABG guides further management: rising PaCO2 in an asthmatic indicates respiratory muscle fatigue and impending respiratory failure — a critical finding that may trigger intubation.",
            s2: "IV magnesium sulfate is a smooth muscle relaxant that provides additional bronchodilation in severe/refractory asthma when standard treatments are insufficient."
        },
        testTakingTip: "Status asthmaticus escalation: continuous albuterol → notify team → IV steroids → ABG → IV magnesium. A 'normalizing' PaCO2 in a severe asthma attack is ominous — it means the patient is tiring and may need intubation.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "asthma-qb-013",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A nurse is teaching a patient how to use a metered-dose inhaler (MDI) WITH a spacer device. Place the steps in the correct order.",
        options: [
            { id: "s1", text: "Shake the MDI canister well (4-5 shakes) and attach it to the spacer" },
            { id: "s2", text: "Exhale fully and place the spacer mouthpiece between your teeth, sealing your lips around it" },
            { id: "s3", text: "Press the canister once to release one puff into the spacer" },
            { id: "s4", text: "Inhale slowly and deeply through the mouth for 3-5 seconds (listen for the valve click — if you hear a whistle, you're inhaling too fast)" },
            { id: "s5", text: "Hold your breath for 10 seconds (or as long as comfortable), then exhale slowly" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Shaking mixes the propellant and medication evenly. Attaching to the spacer before exhaling ensures the device is ready.",
            s2: "Complete exhalation creates maximum lung volume for inhalation. A tight seal prevents medication loss.",
            s3: "Actuating the MDI into the spacer suspends the medication particles, allowing inhalation without needing perfect hand-breath coordination.",
            s4: "Slow, deep inhalation (not fast) allows particles to reach the lower airways. The spacer valve click confirms adequate flow; a whistle means too fast, which deposits medication in the throat instead of the lungs.",
            s5: "Breath holding for 10 seconds allows medication particles to settle in the small airways for maximum absorption."
        },
        testTakingTip: "MDI + spacer: shake → exhale → actuate into spacer → inhale SLOWLY and deeply → hold breath 10 seconds. MDI = slow inhalation (opposite of DPI which requires fast inhalation).",
        relatedGuide: "asthma.html",
        relatedGuideSection: "medications"
    },

    {
        id: "asthma-qb-014",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "ordering",
        difficulty: "analysis",
        stem: "An 8-year-old patient with asthma is being discharged from the hospital after a severe exacerbation. The nurse is developing the discharge teaching plan using the teach-back method. Place the teaching components in priority order.",
        options: [
            { id: "s1", text: "Demonstrate correct inhaler technique and have the child return-demonstrate" },
            { id: "s2", text: "Review the written asthma action plan: green, yellow, and red zones with specific actions for each" },
            { id: "s3", text: "Identify the child's specific triggers and develop an avoidance plan with the family" },
            { id: "s4", text: "Teach the family how to use the peak flow meter and record daily readings" },
            { id: "s5", text: "Provide the school nurse with updated medication orders and the action plan" }
        ],
        correct: ["s1", "s2", "s4", "s3", "s5"],
        rationale: {
            s1: "Correct inhaler technique is the foundation of all asthma treatment. If the medication isn't delivered properly, nothing else matters. Return demonstration confirms the skill.",
            s2: "The action plan tells the family exactly what to do at each severity level. It must be understood before discharge to prevent another ER visit.",
            s4: "Peak flow monitoring provides objective data to guide action plan decisions. The family needs this skill to use the action plan effectively.",
            s3: "Trigger identification and avoidance prevent exacerbations long-term. This requires a longer conversation about the home environment.",
            s5: "School coordination ensures the child is safe during school hours. This is important but can be completed within the first few days after discharge."
        },
        testTakingTip: "Pediatric asthma discharge: technique first → action plan → monitoring skills → trigger management → school coordination. The child and caregiver should demonstrate every skill before leaving.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "asthma-qb-015",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "ordering",
        difficulty: "application",
        stem: "A patient with asthma checks their peak flow meter and gets a reading that falls in the yellow zone (50-79% of personal best). Place the actions from the patient's asthma action plan in the correct order.",
        options: [
            { id: "s1", text: "Take 2-4 puffs of the rescue inhaler (albuterol) immediately" },
            { id: "s2", text: "Wait 20 minutes and recheck peak flow" },
            { id: "s3", text: "If peak flow returns to green zone (>80%), continue monitoring closely" },
            { id: "s4", text: "If peak flow remains in yellow zone after rescue inhaler, contact the healthcare provider" },
            { id: "s5", text: "If peak flow drops into red zone (<50%) or symptoms worsen, call 911" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Yellow zone means caution — symptoms are present or peak flow is declining. The first action is always rescue bronchodilator.",
            s2: "Waiting 20 minutes allows the albuterol to take full effect. Rechecking peak flow provides objective reassessment.",
            s3: "If peak flow improves to green zone (>80%), the episode is resolving. Close monitoring over the next 24 hours is appropriate.",
            s4: "If peak flow remains in yellow zone despite rescue inhaler, the patient needs provider guidance for potential treatment escalation (e.g., short course of oral steroids).",
            s5: "Worsening to red zone (<50%) despite treatment is an emergency. The patient should call 911 — this is potentially life-threatening."
        },
        testTakingTip: "Yellow zone protocol: rescue inhaler → wait 20 min → recheck → if better, monitor; if same, call provider; if worse (red zone), call 911. This decision tree is a common exam question.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "patient-education"
    },

    {
        id: "asthma-qb-016",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with well-controlled severe persistent asthma is being considered for step-down therapy. Place the correct sequence for stepping down from Step 5 therapy.",
        options: [
            { id: "s1", text: "Confirm asthma has been well-controlled for at least 3 months with minimal rescue inhaler use" },
            { id: "s2", text: "Reduce high-dose ICS/LABA to medium-dose ICS/LABA while maintaining any add-on therapies" },
            { id: "s3", text: "Reassess control in 2-4 weeks; if stable, consider reducing or discontinuing add-on medications (e.g., oral corticosteroids, tiotropium)" },
            { id: "s4", text: "Once stable on medium-dose ICS/LABA, attempt further step-down to low-dose ICS/LABA" },
            { id: "s5", text: "If symptoms recur at any step, immediately step back up to the previous effective regimen" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Step-down should only be attempted after at least 3 months of good control. Premature step-down risks exacerbation.",
            s2: "The first reduction targets the ICS dose (high → medium) while keeping the LABA. This is the safest initial step-down.",
            s3: "After confirming stability at the reduced dose, add-on medications are reduced next. Oral corticosteroids should be tapered slowly to avoid adrenal crisis.",
            s4: "Further step-down to low-dose ICS/LABA is attempted once the patient is stable without add-on therapies.",
            s5: "If control is lost at any point, return to the last effective regimen immediately. Step-down is always reversible."
        },
        testTakingTip: "Step-down rule: one step at a time, wait 3+ months of good control, reassess after each change, step back up immediately if control is lost. Never skip steps or rush the process.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "medications"
    },

    // ── MATRIX (4) ───────────────────────────────────────────

    {
        id: "asthma-qb-017",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each peak flow reading (based on percentage of personal best), identify the correct asthma action plan zone and recommended action.",
        columns: ["Green Zone — Continue routine", "Yellow Zone — Use rescue inhaler & call provider", "Red Zone — Call 911"],
        rows: [
            { id: "r1", text: "Peak flow 92% of personal best", correct: "Green Zone — Continue routine" },
            { id: "r2", text: "Peak flow 45% of personal best", correct: "Red Zone — Call 911" },
            { id: "r3", text: "Peak flow 65% of personal best", correct: "Yellow Zone — Use rescue inhaler & call provider" },
            { id: "r4", text: "Peak flow 38% of personal best", correct: "Red Zone — Call 911" },
            { id: "r5", text: "Peak flow 55% of personal best", correct: "Yellow Zone — Use rescue inhaler & call provider" }
        ],
        rationale: {
            correct: "Green zone: 80-100% of personal best — asthma is under control, continue regular medications. Yellow zone: 50-79% — caution, symptoms may be worsening, use rescue inhaler and contact provider. Red zone: below 50% — medical emergency, use rescue inhaler immediately and call 911. The percentages are based on each individual's personal best peak flow, not a standard value."
        },
        testTakingTip: "Peak flow zones: Green ≥80%, Yellow 50-79%, Red <50%. Memorize these cutoffs — they are consistently tested. Always use the patient's PERSONAL BEST, not predicted values.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "asthma-qb-018",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is classifying asthma severity for treatment planning. For each clinical profile, identify the asthma severity classification.",
        columns: ["Intermittent", "Mild Persistent", "Moderate Persistent", "Severe Persistent"],
        rows: [
            { id: "r1", text: "Symptoms ≤2 days/week, nighttime awakening ≤2x/month, normal FEV1, no interference with activity", correct: "Intermittent" },
            { id: "r2", text: "Daily symptoms, nighttime awakening >1x/week but not nightly, FEV1 60-80%, some limitation of activity", correct: "Moderate Persistent" },
            { id: "r3", text: "Symptoms >2 days/week but not daily, nighttime awakening 3-4x/month, FEV1 ≥80%, minor limitation", correct: "Mild Persistent" },
            { id: "r4", text: "Symptoms throughout the day, nighttime awakening nightly, FEV1 <60%, extremely limited activity", correct: "Severe Persistent" }
        ],
        rationale: {
            correct: "Asthma severity classification guides initial treatment: Intermittent (Step 1 — PRN SABA), Mild Persistent (Step 2 — low-dose ICS), Moderate Persistent (Step 3 — medium ICS or low ICS + LABA), Severe Persistent (Steps 4-5 — high-dose ICS + LABA ± add-ons). Classification is based on the most severe indicator across all categories (symptoms, nighttime awakening, FEV1, interference with activity)."
        },
        testTakingTip: "Classify by the WORST indicator. If symptoms say mild but nighttime awakenings say moderate, classify as moderate. Each severity level maps to a treatment step.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "classification"
    },

    {
        id: "asthma-qb-019",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each medication used in asthma management, identify whether it is a quick-relief (rescue) medication or a long-term controller medication.",
        columns: ["Quick-Relief (Rescue)", "Long-Term Controller"],
        rows: [
            { id: "r1", text: "Levalbuterol (Xopenex)", correct: "Quick-Relief (Rescue)" },
            { id: "r2", text: "Montelukast (Singulair)", correct: "Long-Term Controller" },
            { id: "r3", text: "Ipratropium bromide (Atrovent) — used in acute exacerbations", correct: "Quick-Relief (Rescue)" },
            { id: "r4", text: "Omalizumab (Xolair) — anti-IgE monoclonal antibody", correct: "Long-Term Controller" },
            { id: "r5", text: "Fluticasone/salmeterol (Advair)", correct: "Long-Term Controller" },
            { id: "r6", text: "Albuterol via nebulizer in the ED", correct: "Quick-Relief (Rescue)" }
        ],
        rationale: {
            correct: "Quick-relief medications provide immediate bronchodilation during acute symptoms: levalbuterol (SABA), ipratropium (SAMA, used as adjunct in ED), and albuterol (SABA). Long-term controllers reduce airway inflammation and prevent symptoms: montelukast (leukotriene modifier), omalizumab (biologic for allergic asthma), and fluticasone/salmeterol (ICS/LABA combination). Controllers are taken daily regardless of symptoms; rescue medications are used PRN."
        },
        testTakingTip: "Quick-relief = bronchodilators for acute symptoms (SABAs, ipratropium in ED). Controllers = daily maintenance to prevent inflammation (ICS, LABA, leukotriene modifiers, biologics). Controllers DON'T provide immediate relief.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "medications"
    },

    {
        id: "asthma-qb-020",
        category: "respiratory",
        topic: "asthma",
        topicLabel: "Asthma",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is assessing the severity of an acute asthma exacerbation in the ED. For each clinical finding, classify the exacerbation as mild, moderate, or severe.",
        columns: ["Mild Exacerbation", "Moderate Exacerbation", "Severe Exacerbation"],
        rows: [
            { id: "r1", text: "Peak flow >70% predicted, speaks in full sentences, mild dyspnea with activity only", correct: "Mild Exacerbation" },
            { id: "r2", text: "Peak flow 40-69%, speaks in short phrases, moderate dyspnea at rest, accessory muscle use present", correct: "Moderate Exacerbation" },
            { id: "r3", text: "Peak flow <40%, speaks in single words only, severe dyspnea at rest, diaphoresis, paradoxical chest movement", correct: "Severe Exacerbation" },
            { id: "r4", text: "SpO2 >95% on room air, bilateral end-expiratory wheezing, no accessory muscle use", correct: "Mild Exacerbation" },
            { id: "r5", text: "SpO2 <90%, diminishing air movement ('silent chest'), confusion or drowsiness", correct: "Severe Exacerbation" }
        ],
        rationale: {
            correct: "Exacerbation severity guides treatment intensity. Mild: speaks in sentences, peak flow >70%, SpO2 >95%, wheeze at end-expiration only. Moderate: speaks in phrases, peak flow 40-69%, accessory muscles used, louder wheezing. Severe: speaks in words only, peak flow <40%, SpO2 <90%, silent chest (ominous sign indicating minimal air movement), altered mental status. Severe exacerbations require ICU consideration and possible intubation."
        },
        testTakingTip: "Speech pattern is a quick severity indicator: full sentences = mild, phrases = moderate, single words = severe, unable to speak = imminent respiratory failure. 'Silent chest' = worst sign — no air moving means possible respiratory arrest.",
        relatedGuide: "asthma.html",
        relatedGuideSection: "acute-management"
    }

]);
