/**
 * Quiz Bank — GI Bleeding
 * The Nursing Collective
 *
 * 20 questions: 11 single, 4 ordering, 5 matrix
 * Difficulty mix: 7 knowledge, 7 application, 6 analysis
 */

if (typeof QUIZ_BANK_QUESTIONS === 'undefined') { var QUIZ_BANK_QUESTIONS = []; }

QUIZ_BANK_QUESTIONS = QUIZ_BANK_QUESTIONS.concat([

    // ── SINGLE BEST ANSWER (11) ──────────────────────────────

    {
        id: "gib-qb-001",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is assessing a patient admitted with suspected gastrointestinal bleeding. Which stool characteristic is most consistent with an UPPER GI bleed?",
        options: [
            { id: "a", text: "Bright red blood coating the outside of formed stool" },
            { id: "b", text: "Black, tarry, sticky stool with a foul odor" },
            { id: "c", text: "Maroon-colored stool mixed with mucus" },
            { id: "d", text: "Clay-colored stool with visible fat globules" }
        ],
        correct: "b",
        rationale: {
            correct: "Melena (black, tarry, sticky stool with a distinctive foul odor) is the hallmark of UPPER GI bleeding. The black color results from the oxidation of hemoglobin to hematin as blood passes through the GI tract (requires transit of at least 50-100 mL of blood). Bright red blood on formed stool suggests a lower GI source (hemorrhoids, rectal lesion). Maroon stool suggests a lower GI or rapid upper GI bleed. Clay-colored stool indicates bile duct obstruction, not bleeding."
        },
        testTakingTip: "Upper GI bleed = melena (black, tarry) or hematemesis (vomiting blood/coffee grounds). Lower GI bleed = hematochezia (bright red). Exception: a massive rapid upper GI bleed can produce bright red blood per rectum.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "assessment"
    },

    {
        id: "gib-qb-002",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "application",
        stem: "A patient arrives at the ED with hematemesis. Vital signs: HR 128, BP 82/54, RR 26, SpO2 94%. Skin is cool and diaphoretic. The initial hemoglobin is 13.2 g/dL. The nurse understands that this hemoglobin value:",
        options: [
            { id: "a", text: "Indicates the bleeding is likely minor and the patient is stable" },
            { id: "b", text: "May be falsely reassuring because hemodilution has not yet occurred in acute hemorrhage" },
            { id: "c", text: "Confirms the patient does not need a blood transfusion" },
            { id: "d", text: "Reflects chronic blood loss rather than acute hemorrhage" }
        ],
        correct: "b",
        rationale: {
            correct: "In ACUTE hemorrhage, the initial hemoglobin/hematocrit can be misleadingly normal because the patient is losing whole blood (both RBCs and plasma in proportion). Hemodilution — where interstitial fluid shifts into the vascular space to maintain volume — takes 24-72 hours. The vital signs (tachycardia, hypotension, tachypnea, cool/diaphoretic skin) indicate class III hemorrhagic shock despite the 'normal' hemoglobin. Serial H&H measurements are essential."
        },
        testTakingTip: "Critical concept: In acute bleeding, the first hemoglobin is unreliable. Believe the vital signs, not the lab. If the patient looks shocked, they are — regardless of what the H&H says. Serial labs every 4-6 hours reveal the true picture.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "diagnostics"
    },

    {
        id: "gib-qb-003",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "knowledge",
        stem: "A nurse is preparing a patient with an upper GI bleed for an esophagogastroduodenoscopy (EGD). Which preparation task is a priority?",
        options: [
            { id: "a", text: "Administer a bowel preparation solution to cleanse the stomach" },
            { id: "b", text: "Ensure informed consent is signed and verify NPO status, IV access, and type and screen" },
            { id: "c", text: "Insert a nasogastric tube and perform gastric lavage with iced saline" },
            { id: "d", text: "Administer a dose of oral PPI to reduce acid before the procedure" }
        ],
        correct: "b",
        rationale: {
            correct: "Pre-EGD priorities include: informed consent, confirming NPO status (reduces aspiration risk), verifying patent large-bore IV access for potential conscious sedation and blood products, and ensuring a type and screen is on file (active bleeding may require transfusion). Bowel prep is for colonoscopy, not EGD. Iced saline lavage is no longer recommended (no proven benefit, causes hypothermia). IV PPI (not oral) may be ordered but is secondary to procedural safety preparation."
        },
        testTakingTip: "Pre-EGD checklist: consent, NPO, large-bore IV, type & screen, allergies documented, sedation consent. Iced saline lavage is outdated and no longer standard practice for GI bleeds.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "procedures"
    },

    {
        id: "gib-qb-004",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "analysis",
        stem: "A patient with a known history of cirrhosis and portal hypertension presents with massive hematemesis of bright red blood. BP is 76/42, HR 136. The nurse anticipates that the bleeding source is most likely:",
        options: [
            { id: "a", text: "A Mallory-Weiss tear from forceful vomiting" },
            { id: "b", text: "Esophageal varices from increased portal venous pressure" },
            { id: "c", text: "A duodenal ulcer eroding into the gastroduodenal artery" },
            { id: "d", text: "Gastric erosions from NSAID overuse" }
        ],
        correct: "b",
        rationale: {
            correct: "In a patient with known cirrhosis and portal hypertension, massive hematemesis (bright red blood, not coffee grounds) with hemodynamic instability strongly suggests ruptured esophageal varices. Portal hypertension causes collateral circulation through esophageal veins, which become dilated and fragile. Variceal bleeds are typically massive and life-threatening. While Mallory-Weiss tears and ulcers can occur in cirrhotic patients, the combination of cirrhosis + portal hypertension + massive hematemesis = varices until proven otherwise."
        },
        testTakingTip: "Cirrhosis + massive hematemesis = think varices first. Treatment triad: IV octreotide (reduces portal pressure), emergent EGD with banding, and if uncontrolled, balloon tamponade (Blakemore tube) as a bridge.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "variceal-bleeding"
    },

    {
        id: "gib-qb-005",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "application",
        stem: "A patient with an active GI bleed has a hemoglobin of 6.8 g/dL. The provider orders a transfusion of packed red blood cells. The patient has a 20-gauge IV in the right hand. What should the nurse do first?",
        options: [
            { id: "a", text: "Begin the transfusion through the existing 20-gauge IV to save time" },
            { id: "b", text: "Establish a large-bore IV (18-gauge or larger) before starting the transfusion" },
            { id: "c", text: "Warm the blood product to body temperature before administering through any IV" },
            { id: "d", text: "Administer normal saline at 250 mL/hr through the 20-gauge IV first" }
        ],
        correct: "b",
        rationale: {
            correct: "Blood products should be administered through at least an 18-gauge (or larger) IV catheter to prevent hemolysis of red blood cells and allow adequate flow rate. A 20-gauge catheter is too small for efficient blood transfusion and can damage RBCs. In an actively bleeding patient, two large-bore (16- or 18-gauge) IVs should be established. While blood warmers may be used for massive transfusion, establishing appropriate access is the priority before starting the transfusion."
        },
        testTakingTip: "Blood transfusion requires: 18-gauge or larger IV, Y-tubing with 0.9% NS (only compatible fluid), filter in the tubing, and baseline vital signs before starting. Rate: first 15 minutes slowly, then increase if tolerated.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "resuscitation"
    },

    {
        id: "gib-qb-006",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "analysis",
        stem: "A patient is admitted with a lower GI bleed. The nurse notes maroon-colored stool with clots, BP 104/68, HR 108, and the patient is anxious. The provider estimates blood loss of approximately 1,500 mL. Which class of hemorrhagic shock does this patient most likely represent?",
        options: [
            { id: "a", text: "Class I — compensated shock with minimal physiologic changes" },
            { id: "b", text: "Class II — mild tachycardia with normal blood pressure" },
            { id: "c", text: "Class III — significant tachycardia, narrowing pulse pressure, and anxiety" },
            { id: "d", text: "Class IV — life-threatening with severe hypotension and altered consciousness" }
        ],
        correct: "c",
        rationale: {
            correct: "Class III hemorrhagic shock involves 30-40% blood volume loss (1,500-2,000 mL). Findings include HR >120 (this patient is 108, borderline), narrowing pulse pressure (104-68 = 36 mmHg, narrowed), SBP may begin to drop, RR 30-40, and the patient becomes anxious and confused. Class I (<750 mL) has minimal changes. Class II (750-1,500 mL) shows mild tachycardia with maintained BP. Class IV (>2,000 mL) shows severe hypotension, lethargy/obtundation, and HR >140."
        },
        testTakingTip: "Hemorrhagic shock classes by blood loss: I = <15% (asymptomatic), II = 15-30% (tachycardia, anxiety), III = 30-40% (hypotension begins, confused), IV = >40% (lethal, obtunded). Crystalloid + blood needed for Class III and IV.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "hemorrhagic-shock"
    },

    {
        id: "gib-qb-007",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "knowledge",
        stem: "A patient with a confirmed upper GI bleed from a peptic ulcer is started on an IV proton pump inhibitor (PPI). The nurse understands that the primary purpose of IV PPI therapy in this situation is to:",
        options: [
            { id: "a", text: "Directly stop the active bleeding by constricting gastric blood vessels" },
            { id: "b", text: "Raise the gastric pH to promote clot stability and reduce rebleeding risk" },
            { id: "c", text: "Eradicate Helicobacter pylori to prevent future ulcer formation" },
            { id: "d", text: "Reduce the volume of gastric secretions to prevent aspiration" }
        ],
        correct: "b",
        rationale: {
            correct: "IV PPIs (e.g., pantoprazole 80 mg bolus followed by 8 mg/hr infusion) raise the gastric pH above 6.0, which is critical for clot stability. At low pH, pepsin dissolves fibrin clots and gastric acid impairs platelet aggregation. By raising pH, PPIs help maintain the clot over the ulcer crater, significantly reducing the risk of rebleeding after endoscopic treatment. PPIs do not directly vasoconstrict or eradicate H. pylori."
        },
        testTakingTip: "IV PPI in acute GI bleed = stabilize the clot by raising pH. This is why high-dose continuous infusion is used rather than oral dosing. The goal is to keep gastric pH above 6 for 72 hours post-endoscopy.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "medications"
    },

    {
        id: "gib-qb-008",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "application",
        stem: "A nurse is reviewing the home medication list of a patient admitted with a GI bleed. Which medication should the nurse anticipate the provider will discontinue or hold during the acute bleeding episode?",
        options: [
            { id: "a", text: "Levothyroxine 75 mcg daily" },
            { id: "b", text: "Metoprolol succinate 50 mg daily" },
            { id: "c", text: "Naproxen 500 mg twice daily for chronic knee pain" },
            { id: "d", text: "Omeprazole 20 mg daily" }
        ],
        correct: "c",
        rationale: {
            correct: "NSAIDs (naproxen, ibuprofen, aspirin) are a leading cause of GI bleeding. They inhibit COX-1, which reduces the protective prostaglandin production in the gastric mucosa, and impair platelet function. In a patient with active GI bleeding, NSAIDs must be discontinued immediately. Levothyroxine and metoprolol do not affect bleeding. Omeprazole (PPI) is actually therapeutic and would likely be continued or upgraded to IV dosing."
        },
        testTakingTip: "During active GI bleed, hold all medications that worsen bleeding: NSAIDs, aspirin, anticoagulants (warfarin, DOACs), antiplatelets (clopidogrel). The risk-benefit of each is reassessed individually once bleeding is controlled.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "medications"
    },

    {
        id: "gib-qb-009",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "analysis",
        stem: "A nurse is caring for a patient with variceal bleeding who has a Sengstaken-Blakemore (SB) tube in place. The patient suddenly develops acute respiratory distress, and the nurse notices the esophageal balloon pilot is deflated. What is the priority action?",
        options: [
            { id: "a", text: "Immediately reinflate the esophageal balloon and call the provider" },
            { id: "b", text: "Cut the tube with bedside scissors, remove it, and establish an airway" },
            { id: "c", text: "Position the patient in high Fowler's and apply supplemental oxygen" },
            { id: "d", text: "Suction the oropharynx and prepare for emergent intubation" }
        ],
        correct: "b",
        rationale: {
            correct: "If the esophageal or gastric balloon of an SB tube deflates or ruptures, the tube can migrate upward and occlude the airway. Scissors must ALWAYS be kept at the bedside for this exact emergency. The priority is to cut all lumens of the tube, remove it entirely, and secure the airway. Reinflation is dangerous because the tube may have migrated. Oxygen and suctioning alone do not address the underlying airway obstruction."
        },
        testTakingTip: "Blakemore tube safety: scissors at bedside at ALL times. If respiratory distress develops with balloon deflation = tube migration and airway obstruction. Cut and remove immediately. This is a life-threatening emergency.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "variceal-bleeding"
    },

    {
        id: "gib-qb-010",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "application",
        stem: "A nurse is monitoring intake and output for a patient with a GI bleed. The patient had the following in 8 hours: IV NS 1,500 mL, 2 units PRBCs (approximately 500 mL), bloody stool output estimated at 800 mL, urine output 180 mL, and one episode of hematemesis estimated at 300 mL. What is the patient's fluid balance for this period?",
        options: [
            { id: "a", text: "Positive 920 mL" },
            { id: "b", text: "Positive 720 mL" },
            { id: "c", text: "Negative 80 mL" },
            { id: "d", text: "Positive 1,100 mL" }
        ],
        correct: "a",
        rationale: {
            correct: "Intake: IV NS 1,500 mL + PRBCs 500 mL = 2,000 mL total intake. Output: bloody stool 800 mL + urine 180 mL + hematemesis 300 mL = 1,280 mL total output. Fluid balance: 2,000 - 1,280 = +920 mL. In GI bleeding, accurate I&O is critical because it helps assess the adequacy of fluid resuscitation and whether the patient is keeping up with ongoing losses."
        },
        testTakingTip: "In GI bleeds, ALL sources of output count: emesis, bloody stool, urine, and drainage. Don't forget to count blood products as intake. Accurate I&O drives resuscitation decisions. Urine output goal: at least 0.5 mL/kg/hr.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "monitoring"
    },

    {
        id: "gib-qb-011",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "single",
        difficulty: "knowledge",
        stem: "A 3-year-old child presents to the ED with painless, bright red rectal bleeding described as 'currant jelly stool.' The child appears well and has no abdominal tenderness. The nurse suspects which condition?",
        options: [
            { id: "a", text: "Meckel's diverticulum" },
            { id: "b", text: "Intussusception" },
            { id: "c", text: "Hemorrhoids from chronic constipation" },
            { id: "d", text: "Inflammatory bowel disease" }
        ],
        correct: "b",
        rationale: {
            correct: "Currant jelly stool (a mixture of blood and mucus giving a red jelly-like appearance) is the classic finding of intussusception, the most common cause of bowel obstruction in children aged 3 months to 6 years. It occurs when one segment of bowel telescopes into another. Other classic findings include episodic severe colicky abdominal pain, a sausage-shaped mass in the right upper quadrant, and vomiting. Meckel's diverticulum typically causes painless, brick-red bleeding. Hemorrhoids are rare in young children."
        },
        testTakingTip: "Pediatric GI bleed clues: 'currant jelly stool' = intussusception; painless bright red bleeding in a toddler = Meckel's diverticulum; bilious (green) vomiting in a neonate = malrotation/volvulus (surgical emergency).",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "pediatric"
    },

    // ── ORDERING (4) ─────────────────────────────────────────

    {
        id: "gib-qb-012",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "ordering",
        difficulty: "application",
        stem: "A patient presents to the ED with hematemesis (vomiting bright red blood), HR 132, BP 78/48. Place the nurse's initial actions in the correct priority order.",
        options: [
            { id: "s1", text: "Establish two large-bore (16-18 gauge) IV lines and begin rapid crystalloid infusion" },
            { id: "s2", text: "Ensure a patent airway: position on side, suction available, have intubation equipment ready" },
            { id: "s3", text: "Type and crossmatch for blood, draw CBC, BMP, coagulation studies, and lactic acid" },
            { id: "s4", text: "Insert a Foley catheter to monitor hourly urine output as a perfusion indicator" },
            { id: "s5", text: "Notify the GI team for emergent endoscopy and administer IV PPI bolus" }
        ],
        correct: ["s2", "s1", "s3", "s5", "s4"],
        rationale: {
            s2: "Airway is always first. Active hematemesis creates aspiration risk. Lateral positioning allows blood to drain from the mouth. Suction must be immediately available. Intubation may be needed if the patient cannot protect their airway.",
            s1: "Two large-bore IVs are essential for rapid volume resuscitation. Start with crystalloid (NS or LR) while awaiting blood products. Goal: restore circulating volume and maintain organ perfusion.",
            s3: "Labs guide transfusion decisions and identify coagulopathies. Type and crossmatch takes 45-60 minutes, so it must be sent early. Lactic acid assesses tissue hypoperfusion severity.",
            s5: "Emergent EGD is the definitive diagnostic and therapeutic intervention. IV PPI (pantoprazole 80 mg bolus) is started to stabilize clots. GI team should be notified as soon as possible to mobilize resources.",
            s4: "Foley catheter allows precise hourly urine output monitoring — the best bedside indicator of organ perfusion during resuscitation. Target: >0.5 mL/kg/hr."
        },
        testTakingTip: "Active GI bleed with hemodynamic instability: A-B-C framework. Airway (aspiration risk from hematemesis) → access and volume → labs and blood → definitive treatment (endoscopy) → monitoring (urine output).",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "acute-management"
    },

    {
        id: "gib-qb-013",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "ordering",
        difficulty: "analysis",
        stem: "A patient with known cirrhosis develops massive hematemesis. The provider suspects variceal bleeding. Place the interventions in the correct implementation order.",
        options: [
            { id: "s1", text: "Initiate volume resuscitation with crystalloid and blood products; activate massive transfusion protocol if needed" },
            { id: "s2", text: "Start IV octreotide (50 mcg bolus, then 50 mcg/hr infusion) to reduce portal pressure" },
            { id: "s3", text: "Administer IV ceftriaxone 1g for antibiotic prophylaxis" },
            { id: "s4", text: "Arrange emergent EGD for variceal band ligation within 12 hours" },
            { id: "s5", text: "Place Sengstaken-Blakemore tube if endoscopy fails to control bleeding or is not immediately available" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Immediate volume resuscitation prevents cardiovascular collapse. Transfuse conservatively in cirrhosis (target Hgb 7-8 g/dL) to avoid over-expanding portal pressure and worsening variceal bleeding.",
            s2: "Octreotide reduces splanchnic blood flow and portal pressure. Starting it early (even before EGD) reduces bleeding and improves endoscopic visibility. It should run for 3-5 days.",
            s3: "Antibiotic prophylaxis (ceftriaxone preferred) reduces mortality in cirrhotic patients with GI bleeding by preventing spontaneous bacterial peritonitis and other infections. Start within hours of admission.",
            s4: "Emergent EGD with band ligation is the definitive treatment for variceal bleeding. Target: within 12 hours of presentation once the patient is resuscitated and stabilized.",
            s5: "Balloon tamponade (Blakemore tube) is a bridge to definitive therapy used only when endoscopy fails or is unavailable. Maximum inflation time: 24 hours. Requires intubation for airway protection."
        },
        testTakingTip: "Variceal bleed protocol: Resuscitate → Octreotide (reduce portal pressure) → Antibiotics (prevent SBP) → Emergent EGD (band ligation) → Blakemore tube (rescue only). Remember: conservative transfusion in cirrhotics to avoid portal pressure spikes.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "variceal-bleeding"
    },

    {
        id: "gib-qb-014",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "ordering",
        difficulty: "knowledge",
        stem: "A nurse is performing fluid resuscitation for a patient in Class III hemorrhagic shock from a GI bleed. Place the resuscitation steps in the correct order.",
        options: [
            { id: "s1", text: "Insert two large-bore (14-16 gauge) IVs in the antecubital fossae" },
            { id: "s2", text: "Rapidly infuse 1-2 liters of warm isotonic crystalloid (NS or LR)" },
            { id: "s3", text: "Reassess vital signs and hemodynamic response after the initial fluid bolus" },
            { id: "s4", text: "Initiate blood product transfusion (PRBCs, then FFP and platelets as needed per massive transfusion protocol)" },
            { id: "s5", text: "Assess for transfusion adequacy: trending lactate, base deficit, and urine output" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Large-bore IV access is the first step — the larger the gauge, the faster the flow rate. Antecubital fossae have large, accessible veins. If peripheral access fails, intraosseous (IO) or central access is needed.",
            s2: "Crystalloid (warmed to prevent hypothermia) is the initial resuscitation fluid because it is immediately available. The 1-2 liter bolus replaces intravascular volume while blood is being prepared.",
            s3: "Reassess after the initial bolus to determine response: improved VS = responder (may not need blood), transient response = ongoing bleeding (needs blood), no response = massive hemorrhage (activate massive transfusion protocol).",
            s4: "Blood products replace oxygen-carrying capacity. In massive hemorrhage, a balanced ratio (1:1:1 of PRBCs:FFP:platelets) reduces coagulopathy. Type-specific blood can be available in 15 minutes; crossmatched in 45-60 minutes.",
            s5: "Monitor resuscitation adequacy through lactate (tissue perfusion), base deficit (metabolic acidosis from poor perfusion), and urine output (>0.5 mL/kg/hr indicates adequate renal perfusion)."
        },
        testTakingTip: "Hemorrhagic shock resuscitation: Access → Crystalloid first → Reassess response → Blood if needed → Monitor for adequacy. The response to the initial crystalloid bolus predicts whether blood will be needed.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "resuscitation"
    },

    {
        id: "gib-qb-015",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "ordering",
        difficulty: "application",
        stem: "A patient with an upper GI bleed has undergone successful endoscopic treatment. Place the post-procedure nursing actions in the correct priority order.",
        options: [
            { id: "s1", text: "Assess vital signs, oxygen saturation, and level of consciousness (sedation recovery)" },
            { id: "s2", text: "Monitor for signs of perforation: increasing abdominal pain, rigidity, fever, and subcutaneous emphysema" },
            { id: "s3", text: "Maintain NPO status until gag reflex returns, then advance diet as ordered" },
            { id: "s4", text: "Continue IV PPI infusion and monitor serial hemoglobin/hematocrit every 4-6 hours" },
            { id: "s5", text: "Educate the patient on rebleeding signs: melena, hematemesis, dizziness, or tachycardia" }
        ],
        correct: ["s1", "s2", "s3", "s4", "s5"],
        rationale: {
            s1: "Immediate post-procedure priority is monitoring sedation recovery: airway, breathing, circulation, and LOC. Conscious sedation carries aspiration and respiratory depression risks.",
            s2: "Endoscopic perforation is the most serious complication. Assess for new or worsening abdominal pain, abdominal rigidity (peritonitis), fever, and subcutaneous emphysema (air leak). Report immediately.",
            s3: "NPO until gag reflex returns prevents aspiration. The oropharynx was anesthetized during the procedure. Diet advancement follows a clear → full liquid → soft progression based on tolerance.",
            s4: "Continuous IV PPI maintains clot stability at the treatment site. Serial H&H every 4-6 hours detects rebleeding (a drop of >2 g/dL suggests rebleeding). Stool color monitoring is also important.",
            s5: "Before discharge, the patient must know rebleeding warning signs and when to return to the ED. Rebleeding occurs in 10-20% of patients within 72 hours of the initial event."
        },
        testTakingTip: "Post-EGD priorities: sedation recovery (airway first) → watch for perforation → gag reflex before eating → continue treatment (PPI, serial labs) → discharge teaching. Perforation is the complication to fear most.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "post-procedure"
    },

    // ── MATRIX (5) ───────────────────────────────────────────

    {
        id: "gib-qb-016",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each clinical characteristic, indicate whether it is primarily associated with an upper GI bleed or a lower GI bleed.",
        columns: ["Upper GI Bleed", "Lower GI Bleed"],
        rows: [
            { id: "r1", text: "Hematemesis (vomiting blood or coffee-ground emesis)", correct: "Upper GI Bleed" },
            { id: "r2", text: "Hematochezia (passage of bright red or maroon blood per rectum)", correct: "Lower GI Bleed" },
            { id: "r3", text: "Melena (black, tarry, foul-smelling stool)", correct: "Upper GI Bleed" },
            { id: "r4", text: "Elevated BUN-to-creatinine ratio (>20:1)", correct: "Upper GI Bleed" },
            { id: "r5", text: "Bleeding source located beyond the ligament of Treitz", correct: "Lower GI Bleed" },
            { id: "r6", text: "Most commonly caused by diverticulosis or hemorrhoids", correct: "Lower GI Bleed" }
        ],
        rationale: {
            correct: "Upper GI bleeds (proximal to ligament of Treitz) present with hematemesis and melena, and cause elevated BUN:Cr ratio due to intestinal absorption of blood proteins. Lower GI bleeds (distal to ligament of Treitz) typically present with hematochezia. Diverticulosis is the most common cause of major lower GI bleeding; peptic ulcer disease is the most common cause of upper GI bleeding."
        },
        testTakingTip: "The ligament of Treitz (duodenojejunal junction) is the anatomic dividing line: above = upper GI, below = lower GI. Upper GI bleed elevates BUN because digested blood is absorbed as protein in the small intestine.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "pathophysiology"
    },

    {
        id: "gib-qb-017",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "matrix",
        difficulty: "analysis",
        stem: "For each vital sign pattern, classify the patient into the correct hemorrhagic shock class.",
        columns: ["Class I (< 15% Loss)", "Class II (15-30% Loss)", "Class III (30-40% Loss)", "Class IV (> 40% Loss)"],
        rows: [
            { id: "r1", text: "HR 78, BP 128/82, RR 16, alert and oriented, cap refill < 2 sec", correct: "Class I (< 15% Loss)" },
            { id: "r2", text: "HR 108, BP 118/80, RR 22, mildly anxious, cap refill slightly delayed", correct: "Class II (15-30% Loss)" },
            { id: "r3", text: "HR 126, BP 88/62, RR 32, confused and agitated, cap refill > 3 sec", correct: "Class III (30-40% Loss)" },
            { id: "r4", text: "HR 142, BP 64/40, RR 40, lethargic and obtunded, cap refill > 4 sec", correct: "Class IV (> 40% Loss)" }
        ],
        rationale: {
            correct: "Class I (<750 mL): minimal changes, compensated. Class II (750-1,500 mL): tachycardia >100, BP maintained by vasoconstriction, anxiety. Class III (1,500-2,000 mL): marked tachycardia, hypotension begins, tachypnea, confusion from cerebral hypoperfusion. Class IV (>2,000 mL): severe tachycardia, profound hypotension, obtundation, and lethal if not immediately treated with massive transfusion."
        },
        testTakingTip: "Hemorrhagic shock progression: I = barely noticeable, II = body compensates (tachycardia but stable BP), III = decompensation begins (BP drops, confusion), IV = near death (everything failing). Mental status is a key differentiator between classes.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "hemorrhagic-shock"
    },

    {
        id: "gib-qb-018",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "matrix",
        difficulty: "application",
        stem: "A nurse is monitoring a patient after endoscopic treatment of a bleeding peptic ulcer. For each finding, indicate whether it is 'Expected — Continue Monitoring' or 'Concerning — Notify Provider.'",
        columns: ["Expected — Continue Monitoring", "Concerning — Notify Provider"],
        rows: [
            { id: "r1", text: "Mild sore throat and hoarseness after the procedure", correct: "Expected — Continue Monitoring" },
            { id: "r2", text: "New onset of severe epigastric pain radiating to the back with abdominal rigidity", correct: "Concerning — Notify Provider" },
            { id: "r3", text: "First stool post-procedure is dark/black (from residual blood in the GI tract)", correct: "Expected — Continue Monitoring" },
            { id: "r4", text: "Hemoglobin drops from 9.2 to 6.8 g/dL on the 6-hour repeat lab draw", correct: "Concerning — Notify Provider" },
            { id: "r5", text: "Patient is drowsy and sleeping 30 minutes after receiving midazolam for sedation", correct: "Expected — Continue Monitoring" },
            { id: "r6", text: "New bright red hematemesis 4 hours after the procedure", correct: "Concerning — Notify Provider" }
        ],
        rationale: {
            correct: "Expected post-EGD findings: mild sore throat (from scope passage), dark first stool (residual blood already in the GI tract), and post-sedation drowsiness (midazolam effect). Concerning findings: severe epigastric pain with rigidity (perforation), significant hemoglobin drop >2 g/dL in 6 hours (rebleeding or continued hemorrhage), and new hematemesis (rebleeding from the treatment site requiring repeat endoscopy)."
        },
        testTakingTip: "Post-EGD red flags: severe new abdominal pain + rigidity = perforation; Hgb drop >2 g/dL = rebleeding; fresh hematemesis = treatment failure. Mild sore throat and dark first stool are normal and expected.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "post-procedure"
    },

    {
        id: "gib-qb-019",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "matrix",
        difficulty: "knowledge",
        stem: "For each upper GI bleeding source, match it with its most characteristic clinical presentation.",
        columns: ["Mallory-Weiss Tear", "Peptic Ulcer", "Esophageal Varices"],
        rows: [
            { id: "r1", text: "History of forceful retching/vomiting followed by hematemesis in a patient with recent alcohol binge", correct: "Mallory-Weiss Tear" },
            { id: "r2", text: "Epigastric pain that worsens with eating, melena, and history of chronic NSAID use", correct: "Peptic Ulcer" },
            { id: "r3", text: "Massive, painless hematemesis in a patient with known liver cirrhosis and ascites", correct: "Esophageal Varices" },
            { id: "r4", text: "Coffee-ground emesis with a positive H. pylori test and nocturnal epigastric burning", correct: "Peptic Ulcer" },
            { id: "r5", text: "Spider angiomas, jaundice, and caput medusae with large-volume hematemesis", correct: "Esophageal Varices" }
        ],
        rationale: {
            correct: "Mallory-Weiss tears occur at the gastroesophageal junction from forceful vomiting/retching (alcohol binge, severe nausea). They typically self-resolve. Peptic ulcers present with epigastric pain (worse with eating for gastric, better for duodenal), melena, and are associated with NSAIDs and H. pylori. Esophageal varices produce massive, painless hematemesis in the context of cirrhosis and portal hypertension, often with stigmata of liver disease (spider angiomas, jaundice, caput medusae)."
        },
        testTakingTip: "Upper GI bleed source clues: vomiting → then bleeding = Mallory-Weiss; epigastric pain + NSAIDs/H. pylori = peptic ulcer; cirrhosis + massive painless hematemesis = varices. The patient's history usually points to the source.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "etiology"
    },

    {
        id: "gib-qb-020",
        category: "gi",
        topic: "gi-bleeding",
        topicLabel: "GI Bleeding",
        type: "matrix",
        difficulty: "analysis",
        stem: "A nurse is planning care for patients with GI bleeding. For each task, indicate whether it can be delegated to a UAP or must be performed by the RN.",
        columns: ["Delegate to UAP", "RN Only"],
        rows: [
            { id: "r1", text: "Measuring and recording the volume and color of bloody emesis", correct: "Delegate to UAP" },
            { id: "r2", text: "Assessing abdominal distension and auscultating bowel sounds", correct: "RN Only" },
            { id: "r3", text: "Obtaining orthostatic vital signs (lying, sitting, standing BP and HR)", correct: "Delegate to UAP" },
            { id: "r4", text: "Interpreting hemoglobin trends and deciding when to notify the provider", correct: "RN Only" },
            { id: "r5", text: "Performing a guaiac (occult blood) test on a stool sample", correct: "Delegate to UAP" },
            { id: "r6", text: "Educating the patient about discharge medications and follow-up endoscopy", correct: "RN Only" }
        ],
        rationale: {
            correct: "UAPs can perform standardized, routine tasks: measuring/recording emesis volume and color, obtaining orthostatic vitals (following established protocol), and performing guaiac stool testing (a simple dipstick test). RN-only tasks include: abdominal assessment (requires clinical judgment), interpreting lab trends and making notification decisions (clinical judgment), and patient education about medications and follow-up (requires nursing knowledge). The UAP collects data; the RN interprets and acts on it."
        },
        testTakingTip: "Delegation rule: UAPs can measure, record, and perform standardized tests. RNs assess (auscultate, palpate), interpret (lab values, trends), decide (when to notify), and teach. If clinical judgment is required, it stays with the RN.",
        relatedGuide: "gi-bleeding.html",
        relatedGuideSection: "nursing-care"
    }

]);
