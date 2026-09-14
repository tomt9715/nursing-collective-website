/**
 * GI Bleeding Quiz - Question Data
 * 10 NCLEX-style questions: 5 Single, 3 Priority, 1 Ordering, 1 Matrix
 */

/* exported giBleedingQuizData */
var giBleedingQuizData = {
    guideName: "GI Bleeding",
    guideSlug: "gi-bleeding",
    category: "Gastrointestinal",
    categoryColor: "#f59e0b",
    estimatedMinutes: 20,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient admitted with suspected gastrointestinal bleeding. The patient has black, tarry, foul-smelling stools. Which type of gastrointestinal (GI) bleed does this finding MOST likely indicate?",
            options: [
                { id: "a", text: "Lower gastrointestinal bleed from diverticulosis of the colon" },
                { id: "b", text: "Upper gastrointestinal bleed from a source above the ligament of Treitz" },
                { id: "c", text: "Lower gastrointestinal bleed from internal or external hemorrhoids" },
                { id: "d", text: "Gastrointestinal bleed from a colorectal source in the large bowel" }
            ],
            correct: "b",
            rationale: {
                correct: "Melena (black, tarry, foul-smelling stool) is the hallmark sign of UPPER gastrointestinal (GI) bleeding. The black color results from the digestion of blood as it passes through the GI tract - the longer transit time from an upper source allows gastric acid and intestinal bacteria to break down hemoglobin into hematin, which is black. Sources above the ligament of Treitz (esophagus, stomach, duodenum) are classified as upper GI bleeds.",
                a: "Diverticulosis, a lower gastrointestinal (GI) source, typically causes bright red blood per rectum (hematochezia), not melena. The short transit time from the colon does not allow for blood digestion.",
                c: "Hemorrhoidal bleeding produces bright red blood on the stool surface or on toilet paper. It does not cause the diffuse black discoloration of melena.",
                d: "Colorectal bleeding, a lower gastrointestinal (GI) source, generally presents as hematochezia - bright red or maroon-colored blood - because there is insufficient transit time for blood digestion."
            },
            testTakingTip: "Melena (black/tarry) = upper gastrointestinal (GI). Hematochezia (bright red) = usually lower GI. Coffee-ground emesis = upper GI (partially digested blood in stomach). Exception: a massive, brisk upper GI bleed can cause hematochezia because the blood moves through so fast it doesn't have time to be digested.",
            guideSection: "Section 3 - Upper vs Lower GI Bleeding",
            guideSectionId: "types"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient presents to the emergency department with hematemesis (vomiting bright red blood). Vital signs: BP 86/52 mmHg, HR 128 bpm, RR 26 breaths/min, SpO2 94%. The patient is anxious and confused. Initial hemoglobin is 10.2 g/dL. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Insert a nasogastric tube and begin gastric lavage" },
                { id: "b", text: "Establish two large-bore IV lines and begin fluid resuscitation" },
                { id: "c", text: "Obtain a type and crossmatch for blood transfusion" },
                { id: "d", text: "Prepare the patient for emergent upper endoscopy" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient is in hemorrhagic shock - hypotension (86/52), tachycardia (128), tachypnea, confusion, and active hematemesis. The airway, breathing, circulation (ABC) priority is establishing vascular access for fluid resuscitation. Two large-bore IVs (18G or larger, preferably 16G or 14G) in the antecubital veins allow rapid infusion of crystalloids (normal saline or lactated Ringer's) to restore circulating volume and blood pressure.",
                a: "A nasogastric (NG) tube may be placed for lavage to confirm the upper gastrointestinal (GI) source and assess for active bleeding, but vascular access and resuscitation take priority. You cannot lavage if the patient is in cardiovascular collapse.",
                c: "Type and crossmatch is essential and should be drawn AT THE SAME TIME as IV access is established, but establishing the IV lines comes first - you need vascular access before you can draw labs or transfuse.",
                d: "Endoscopy is the definitive diagnostic and therapeutic intervention for upper gastrointestinal (GI) bleeding, but the patient must be hemodynamically stabilized first. Endoscopy in an unstable patient carries high risk."
            },
            labValues: [
                { name: "Hemoglobin", normal: "Male: 14–18 g/dL; Female: 12–16 g/dL" },
                { name: "Hematocrit", normal: "Male: 42–52%; Female: 37–47%" }
            ],
            testTakingTip: "In active gastrointestinal (GI) bleeding with hemodynamic instability, follow the airway, breathing, circulation (ABCs) sequence: Airway (protect if level of consciousness is decreased), Breathing (O2), Circulation (TWO large-bore IVs + fluids). The initial hemoglobin can be MISLEADINGLY NORMAL because it takes 24-72 hours for hemodilution to reflect the true blood loss.",
            guideSection: "Section 6 - Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 3,
            type: "ordering",
            subtype: null,
            difficulty: "application",
            stem: "A patient presents with acute upper gastrointestinal (GI) bleeding, hematemesis, and hemodynamic instability. Place the nurse's resuscitation actions in the correct priority sequence.",
            options: [
                { id: "a", text: "Establish two large-bore (16-18 gauge) peripheral IV lines and initiate fluid resuscitation with crystalloids" },
                { id: "b", text: "Draw blood for type and crossmatch, complete blood count (CBC), basic metabolic panel (BMP), and coagulation studies" },
                { id: "c", text: "Place the patient on continuous cardiac monitoring and pulse oximetry" },
                { id: "d", text: "Insert a Foley catheter to monitor hourly urine output (target >0.5 mL/kg/hr)" },
                { id: "e", text: "Administer IV proton pump inhibitor (pantoprazole 80 mg bolus) and prepare for emergent endoscopy" }
            ],
            correct: ["a", "b", "c", "d", "e"],
            rationale: {
                correct: "The correct sequence prioritizes vascular access and volume restoration first, then obtaining essential labs, establishing monitoring, assessing end-organ perfusion, and initiating pharmacological therapy with endoscopy preparation.",
                a: "FIRST - Establishing vascular access is the highest circulation priority. Two large-bore IVs (16G or larger, preferably in antecubital veins) allow simultaneous fluid resuscitation and blood product administration. Without IV access, no other interventions can be delivered.",
                b: "SECOND - Labs should be drawn AT THE SAME TIME as IV lines are established. Type and crossmatch enables blood transfusion, complete blood count (CBC) provides baseline hemoglobin, basic metabolic panel (BMP) reveals blood urea nitrogen (BUN) elevation, a marker of upper gastrointestinal (GI) bleeding, and coagulation studies guide blood product selection.",
                c: "THIRD - Continuous cardiac monitoring detects arrhythmias from hemodynamic instability, electrolyte imbalances, or myocardial ischemia from reduced oxygen delivery. This establishes ongoing surveillance once access and labs are in place.",
                d: "FOURTH - A Foley catheter allows precise hourly urine output measurement as an indicator of end-organ perfusion. Declining urine output (UOP) suggests worsening shock and the need for more aggressive resuscitation.",
                e: "FIFTH - Once the patient is being resuscitated and monitored, an IV proton pump inhibitor (PPI), not oral, is administered to reduce gastric acid and promote hemostasis. The standard is IV pantoprazole 80 mg bolus followed by 8 mg/hour infusion. Endoscopy preparation begins concurrently for definitive diagnosis and treatment."
            },
            testTakingTip: "Gastrointestinal (GI) bleed resuscitation priorities: Two large-bore IVs, type & crossmatch, complete blood count (CBC), basic metabolic panel (BMP), coags, Foley catheter with a urine output (UOP) goal of >0.5 mL/kg/hr, cardiac monitor, NPO for endoscopy. Remember: IV proton pump inhibitor (PPI), not oral, in the acute setting. Morphine is avoided due to hypotension risk.",
            guideSection: "Section 6 - Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a gastrointestinal (GI) bleed has a nasogastric (NG) tube inserted. The nurse performs gastric lavage and obtains clear, bile-tinged aspirate with no blood. How should the nurse interpret this finding?",
            options: [
                { id: "a", text: "The patient does not have a gastrointestinal bleed" },
                { id: "b", text: "Upper gastrointestinal bleeding is unlikely but cannot be definitively ruled out" },
                { id: "c", text: "The bleeding has stopped and no further workup is needed" },
                { id: "d", text: "The nasogastric tube is malpositioned and needs to be replaced" }
            ],
            correct: "b",
            rationale: {
                correct: "A bilious (bile-stained) but non-bloody nasogastric (NG) aspirate makes active upper gastrointestinal (GI) bleeding UNLIKELY because bile confirms the tube is past the pylorus or that duodenal contents are refluxing into the stomach. However, it does NOT definitively rule out upper GI bleeding - the bleed may be intermittent, distal to the tube tip, or may have stopped temporarily. Endoscopy remains the definitive diagnostic tool.",
                a: "A clear nasogastric (NG) aspirate does not rule out gastrointestinal (GI) bleeding entirely. The patient may have a lower GI source, an intermittent upper source, or a post-pyloric duodenal bleed that doesn't reflux back to the stomach.",
                c: "Even if the bleeding has paused, further workup (endoscopy, labs, monitoring) is needed. Gastrointestinal (GI) bleeds can recur unpredictably, and the source must be identified for definitive treatment.",
                d: "The presence of bile actually CONFIRMS proper positioning - it means the tube is in the stomach and gastric/duodenal contents are being aspirated. Bile is an expected and helpful finding."
            },
            testTakingTip: "Nasogastric (NG) lavage interpretation: Bloody/coffee-ground = confirms upper gastrointestinal (GI) bleed. Clear with bile = makes upper GI bleed unlikely. Clear WITHOUT bile = does NOT rule out upper GI bleed (could be pre-pyloric and the tube may not be reaching the blood). The key pearl: a negative lavage does not definitively exclude an upper source.",
            guideSection: "Section 5 - Diagnostic Procedures",
            guideSectionId: "diagnostics"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient is admitted with a gastrointestinal (GI) bleed. Vital signs: BP 100/68, HR 118, RR 22. Labs drawn on admission 2 hours ago showed Hgb 11.8 g/dL. The patient continues to have melena stools. The nurse understands that the hemoglobin level may not accurately reflect the severity of blood loss. Which statement BEST explains why the initial hemoglobin is misleading in acute hemorrhage?",
            options: [
                { id: "a", text: "Red blood cells and plasma are lost in equal proportion, so hemoglobin concentration stays unchanged until hemodilution occurs over 24-72 hours" },
                { id: "b", text: "Hemoglobin levels are only accurate when drawn from an arterial blood gas sample, not from a routine venous draw" },
                { id: "c", text: "The lab equipment cannot accurately measure hemoglobin when the sample contains digested blood products from the gut" },
                { id: "d", text: "Acute hemorrhage causes the bone marrow to immediately release reticulocytes, which are not counted in the standard hemoglobin assay" }
            ],
            correct: "a",
            rationale: {
                correct: "In acute hemorrhage, the patient loses whole blood: red blood cells (RBCs) and plasma in equal proportion. Because both the numerator (red blood cells) and denominator (plasma volume) decrease together, the hemoglobin CONCENTRATION remains unchanged initially. It takes 24-72 hours for the body to shift interstitial fluid into the vascular space (transcapillary refill) and retain water via antidiuretic hormone (ADH) and aldosterone, which dilutes the remaining RBCs and reveals the true hemoglobin drop. This is why the vital signs (HR 118, BP 100/68 suggesting Class II-III shock) are more reliable early indicators of blood loss severity than the lab value.",
                a: "This is the correct physiologic explanation. Hemoglobin is a CONCENTRATION (g/dL) - if both the solute (red blood cells) and solvent (plasma) decrease proportionally, the concentration stays the same. Only when the body replaces the lost plasma volume with interstitial fluid (hemodilution) does the Hgb drop to reflect the true loss.",
                b: "Hemoglobin can be accurately measured from venous, arterial, or capillary samples. The source of the blood draw does not significantly affect hemoglobin accuracy.",
                c: "Standard laboratory hemoglobin assays are not affected by digested blood products in the patient's gastrointestinal (GI) tract. The blood sample drawn from the vein measures circulating hemoglobin, which is independent of GI contents.",
                d: "While the bone marrow does increase reticulocyte production in response to blood loss, this process takes days to weeks, not hours. Additionally, reticulocytes ARE counted in standard hemoglobin measurements."
            },
            labValues: [
                { name: "Hemoglobin", normal: "Male: 14–18 g/dL; Female: 12–16 g/dL" },
                { name: "Transfusion Trigger", normal: "Hgb <7 g/dL (or <8-9 if cardiac disease)" }
            ],
            testTakingTip: "The NCLEX loves this concept: In acute gastrointestinal (GI) bleeding, the initial hemoglobin is a liar. Trust the vital signs more than the lab in the first 24 hours. Tachycardia is the earliest compensatory sign of hemorrhage. This is why serial hemoglobin monitoring is essential.",
            guideSection: "Section 4 - Assessment & Hemodynamic Status",
            guideSectionId: "assessment"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with a history of peptic ulcer disease is admitted with coffee-ground emesis and melena. After stabilization, the provider orders an esophagogastroduodenoscopy (EGD) for the following morning. Which pre-procedure nursing action is MOST important?",
            options: [
                { id: "a", text: "Ensure the patient remains NPO and verify that a type and screen has been drawn" },
                { id: "b", text: "Administer an oral proton pump inhibitor with a sip of water" },
                { id: "c", text: "Obtain a barium swallow study to localize the bleeding before the esophagogastroduodenoscopy (EGD)" },
                { id: "d", text: "Encourage the patient to drink clear liquids to improve visualization" }
            ],
            correct: "a",
            rationale: {
                correct: "NPO status is essential before esophagogastroduodenoscopy (EGD) to prevent aspiration during sedation and to allow better visualization of the gastrointestinal (GI) mucosa. A type and screen (or type and crossmatch) must be available in case the patient needs blood products during or after the procedure if bleeding recurs or therapeutic intervention causes hemorrhage.",
                b: "While an IV proton pump inhibitor (PPI) such as pantoprazole is appropriate for peptic ulcer bleeding, the oral route is generally avoided before a procedure requiring sedation, and the PPI would already have been started IV during stabilization. The priority pre-procedure action is ensuring NPO and blood product availability.",
                c: "Barium is absolutely contraindicated before esophagogastroduodenoscopy (EGD). Barium coats the mucosa and makes it impossible for the endoscopist to visualize the bleeding source. It also interferes with any subsequent computed tomography (CT) angiography or surgery.",
                d: "The patient should remain NPO before the procedure. Clear liquids would increase aspiration risk during sedation and may obscure the endoscopic view."
            },
            testTakingTip: "Priorities before an esophagogastroduodenoscopy (EGD): NPO (aspiration risk during sedation), type and screen ready (bleeding risk), IV access, consent signed, remove dentures. NEVER give barium before endoscopy - it blocks visualization and is a classic NCLEX distractor.",
            guideSection: "Section 5 - Diagnostic Procedures",
            guideSectionId: "diagnostics"
        },
        {
            id: 7,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient with known esophageal varices from alcoholic cirrhosis presents with massive hematemesis. Blood pressure is 78/44 mmHg and the patient is pale and diaphoretic. Two large-bore IVs are established and fluid resuscitation is in progress. Besides continued volume resuscitation, which medication should the nurse anticipate administering FIRST?",
            options: [
                { id: "a", text: "Oral pantoprazole (Protonix)" },
                { id: "b", text: "IV octreotide (Sandostatin) infusion" },
                { id: "c", text: "Oral lactulose for hepatic encephalopathy" },
                { id: "d", text: "Subcutaneous vitamin K injection" }
            ],
            correct: "b",
            rationale: {
                correct: "IV octreotide is the first-line pharmacological treatment for acute variceal bleeding. It reduces splanchnic blood flow and portal venous pressure by causing vasoconstriction of the mesenteric vessels, which reduces blood flow to the bleeding varices. It is typically given as a 50 mcg IV bolus followed by a continuous infusion of 50 mcg/hour for 3-5 days.",
                a: "Proton pump inhibitors (PPIs) are used for peptic ulcer bleeding, not variceal bleeding. Additionally, the oral route is inappropriate for a patient who is actively vomiting blood and in hemorrhagic shock.",
                c: "Lactulose may be needed later if hepatic encephalopathy develops (from blood protein digestion in the gut), but it does not address the acute hemorrhage and is not the priority.",
                d: "Vitamin K may be needed if the patient has coagulopathy from liver disease (impaired clotting factor synthesis), but it takes 24-48 hours to be effective and does not address the immediate variceal hemorrhage."
            },
            testTakingTip: "Variceal bleeding triad: (1) IV octreotide (reduces portal pressure), (2) Prophylactic IV antibiotics (reduces infection and rebleeding), (3) Emergent esophagogastroduodenoscopy (EGD) with band ligation (definitive treatment). Know this sequence - it's different from peptic ulcer bleeding, which uses an IV proton pump inhibitor (PPI) + EGD.",
            guideSection: "Section 7 - Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 8,
            type: "matrix",
            subtype: null,
            difficulty: "application",
            matrixColumns: ["Monitor For", "Not a Concern"],
            stem: "A nurse is caring for a patient with upper gastrointestinal (GI) bleeding who is receiving a massive transfusion protocol (6 units of packed red blood cells). Classify each potential complication as something the nurse should actively monitor for or something that is not a clinical concern during massive transfusion.",
            options: [
                { id: "a", text: "Hypocalcemia from citrate in the transfused blood" },
                { id: "b", text: "Hyperkalemia from potassium released by stored red blood cells" },
                { id: "c", text: "Hypothermia from rapid infusion of cold blood products" },
                { id: "d", text: "Hyperglycemia from dextrose in the blood storage solution" },
                { id: "e", text: "Coagulopathy from dilution of clotting factors and platelets" }
            ],
            correct: { a: "Monitor For", b: "Monitor For", c: "Monitor For", d: "Not a Concern", e: "Monitor For" },
            rationale: {
                correct: "Massive transfusion complications to monitor for include hypocalcemia (citrate binds calcium), hyperkalemia (potassium leaks from stored red blood cells), hypothermia (cold products), and dilutional coagulopathy. Hyperglycemia from storage dextrose is not a clinically significant concern.",
                a: "MONITOR FOR - Citrate is the anticoagulant used to preserve stored blood. During massive transfusion, excess citrate binds ionized calcium in the patient's blood, causing hypocalcemia. Signs include circumoral tingling, muscle cramping, and QT prolongation.",
                b: "MONITOR FOR - Stored red blood cells leak potassium into the storage solution over time. Rapid transfusion of multiple units delivers a potassium load that can cause hyperkalemia, especially in patients with renal impairment. ECG changes include peaked T waves.",
                c: "MONITOR FOR - Blood products are stored at 1-6 degrees C. Rapid infusion of cold products can cause hypothermia, which worsens coagulopathy (the 'triad of death': hypothermia, acidosis, coagulopathy). Blood warmers should be used.",
                d: "NOT A CONCERN - Blood storage solutions contain a small amount of dextrose, but this is negligible and does not cause clinically significant hyperglycemia. This is not a recognized massive transfusion complication.",
                e: "MONITOR FOR - Packed red blood cells (PRBCs) do not contain significant clotting factors or platelets. Replacing blood volume with only red blood cells (RBCs) dilutes the remaining clotting factors, leading to coagulopathy. This is why massive transfusion protocols include fresh frozen plasma (FFP) and platelets in addition to PRBCs."
            },
            labValues: [
                { name: "Calcium (ionized)", normal: "4.5–5.5 mg/dL" },
                { name: "Potassium", normal: "3.5–5.0 mEq/L" },
                { name: "INR", normal: "0.8–1.1" },
                { name: "Platelets", normal: "150,000–400,000/mm³" }
            ],
            testTakingTip: "Massive transfusion complications to memorize: Hypocalcemia (citrate), Hyperkalemia (stored cell leakage), Hypothermia (cold products), Coagulopathy (dilution). Mnemonic: the '3 Hypos + 1 Hyper' - hypocalcemia, hypothermia, hypo-coagulopathy, and hyperkalemia.",
            guideSection: "Section 6 - Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a gastrointestinal (GI) bleed has been stabilized and is being evaluated. Lab results show: Blood urea nitrogen (BUN) 42 mg/dL, Creatinine 1.0 mg/dL, BUN/Creatinine ratio 42:1. What does the elevated BUN with normal creatinine MOST likely indicate?",
            options: [
                { id: "a", text: "Acute kidney injury from hypovolemic shock" },
                { id: "b", text: "Chronic kidney disease that predates the gastrointestinal bleed" },
                { id: "c", text: "Absorption and digestion of blood in the gastrointestinal tract" },
                { id: "d", text: "Dehydration unrelated to the gastrointestinal bleed" }
            ],
            correct: "c",
            rationale: {
                correct: "An elevated blood urea nitrogen (BUN) with a NORMAL creatinine (BUN/Cr ratio >20:1) in a gastrointestinal (GI) bleed patient is a classic finding that points to upper GI bleeding. When blood enters the GI tract, proteins in the blood are digested and absorbed, then metabolized to urea in the liver, raising the BUN. Because this is not a renal problem, the creatinine remains normal - the elevated BUN is from a GI (extra-renal) protein load.",
                a: "Acute kidney injury would elevate BOTH blood urea nitrogen (BUN) and creatinine. A normal creatinine of 1.0 mg/dL argues against renal injury.",
                b: "Chronic kidney disease (CKD) also elevates both blood urea nitrogen (BUN) and creatinine proportionally. The isolated BUN elevation with normal creatinine is not consistent with kidney disease.",
                d: "While dehydration can cause prerenal azotemia with an elevated blood urea nitrogen (BUN) to creatinine ratio, in the context of a known gastrointestinal (GI) bleed, blood protein digestion is the most likely explanation. Dehydration would also typically cause some creatinine elevation."
            },
            labValues: [
                { name: "BUN", normal: "10–20 mg/dL" },
                { name: "Creatinine", normal: "0.7–1.3 mg/dL" },
                { name: "BUN/Cr Ratio", normal: "10:1 to 20:1" }
            ],
            testTakingTip: "Elevated blood urea nitrogen (BUN) with normal creatinine (ratio >20:1) in a gastrointestinal (GI) bleed patient = blood is being digested in the GI tract, pointing to an UPPER GI source. This lab pattern is part of the Glasgow-Blatchford Score used to risk-stratify GI bleeds. It's also used to differentiate upper from lower GI bleeding.",
            guideSection: "Section 5 - Diagnostic Procedures",
            guideSectionId: "diagnostics"
        },
        {
            id: 10,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient admitted for gastrointestinal (GI) bleeding has been stable for 6 hours. The nurse enters the room and finds the patient vomiting large amounts of bright red blood. The patient is diaphoretic and states, \"I feel like I'm going to pass out.\" The patient has two functioning large-bore IVs. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Turn the patient on their side and suction the airway" },
                { id: "b", text: "Increase the IV fluid rate and hang a second bag of normal saline" },
                { id: "c", text: "Call the provider to order an emergent endoscopy" },
                { id: "d", text: "Draw a stat hemoglobin and type and crossmatch" }
            ],
            correct: "a",
            rationale: {
                correct: "The FIRST priority is airway protection. The patient is actively vomiting large amounts of blood and is at immediate risk of aspiration, which could cause airway obstruction, aspiration pneumonia, or asphyxiation. Turning the patient to the side (recovery position) allows blood to drain from the mouth rather than being aspirated into the lungs. Suctioning clears any blood already in the oropharynx.",
                b: "Volume resuscitation is critical and should happen immediately after airway protection, but a patient who aspirates blood into the lungs could die within minutes. Airway always comes before circulation in the airway, breathing, circulation (ABCs) sequence.",
                c: "The provider should be notified urgently, but this is not the FIRST action. The nurse must address the immediate safety threat (airway) before calling for diagnostic or procedural interventions.",
                d: "Labs are important for guiding transfusion but are not the first priority when the patient is actively vomiting blood and at risk of aspiration."
            },
            testTakingTip: "When a patient is actively vomiting blood and at risk of losing consciousness, think airway, breathing, circulation (ABCs): Airway FIRST. Position to prevent aspiration (lateral/side-lying), then suction, then address circulation (fluids/blood). If the NCLEX offers an airway option alongside a circulation or diagnostic option, airway always wins.",
            guideSection: "Section 6 - Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 11, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nurse is reviewing gastrointestinal anatomy. Which landmark divides an upper from a lower gastrointestinal bleed?",
            options: [
                { id: "a", text: "The ligament of Treitz" },
                { id: "b", text: "The ileocecal valve" },
                { id: "c", text: "The pyloric sphincter" },
                { id: "d", text: "The hepatic flexure" }
            ],
            correct: "a",
            rationale: {
                correct: "The ligament of Treitz, the suspensory ligament of the duodenum, marks the junction between duodenum and jejunum. Above it is an upper bleed and the patient gets an esophagogastroduodenoscopy; below it is a lower bleed and the patient gets a colonoscopy.",
                b: "The ileocecal valve separates small from large bowel, which does not define this distinction.",
                c: "The pyloric sphincter separates stomach from duodenum, and both sit above the dividing line.",
                d: "The hepatic flexure is a bend in the colon, well into lower tract territory."
            },
            testTakingTip: "One landmark decides the scope. Above the ligament of Treitz means a camera down; below it means a camera up.",
            guideSection: "Section 3 - One ligament divides everything",
            guideSectionId: "anatomy"
        },
        {
            id: 12, type: "single", subtype: null, difficulty: "knowledge",
            stem: "A nursing student asks which lesion is the single commonest cause of an upper gastrointestinal bleed. What should the nurse answer?",
            options: [
                { id: "a", text: "A duodenal ulcer" },
                { id: "b", text: "Esophageal varices" },
                { id: "c", text: "A Mallory-Weiss tear" },
                { id: "d", text: "Gastric cancer" }
            ],
            correct: "a",
            rationale: {
                correct: "Duodenal ulcers are the single commonest upper gastrointestinal bleed. A posterior duodenal ulcer can erode into the gastroduodenal artery, which is why the bleeding can be brisk.",
                b: "Varices from portal hypertension bleed dramatically but are less common overall.",
                c: "A Mallory-Weiss tear follows retching and is usually self limiting.",
                d: "Gastric cancer can bleed but accounts for far fewer presentations."
            },
            testTakingTip: "Commonest is not the same as most dramatic. Duodenal ulcers are commonest; varices are the ones that exsanguinate.",
            guideSection: "Section 3 - One ligament divides everything",
            guideSectionId: "anatomy"
        },
        {
            id: 13, type: "single", subtype: "priority", difficulty: "application",
            stem: "A patient with an active gastrointestinal bleed needs intravenous access established. What should the nurse obtain?",
            options: [
                { id: "a", text: "Two large bore 18 gauge peripheral lines" },
                { id: "b", text: "One 22 gauge line in the dominant forearm" },
                { id: "c", text: "A single 20 gauge line with a saline lock" },
                { id: "d", text: "A midline catheter placed by the vascular team" }
            ],
            correct: "a",
            rationale: {
                correct: "Two 18 gauge peripheral lines are the minimum in an active bleed. Large bore short catheters allow rapid volume and blood product administration, which a narrow or long line cannot.",
                b: "A 22 gauge line is too narrow to resuscitate a bleeding patient.",
                c: "A single 20 gauge line gives neither the flow rate nor the redundancy required.",
                d: "A midline is long and narrow, so flow is slow, and placement takes time this patient does not have."
            },
            testTakingTip: "Two 18 gauge lines is the minimum in an active bleed. Short and wide beats long and narrow for flow.",
            guideSection: "Section 9 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 14, type: "single", subtype: null, difficulty: "analysis",
            stem: "A patient with a gastrointestinal bleed has a hemoglobin of 11.8 g/dL one hour after presenting. How should the nurse interpret this?",
            options: [
                { id: "a", text: "It may be falsely reassuring, since equilibration takes time" },
                { id: "b", text: "It rules out significant blood loss at this point in time" },
                { id: "c", text: "It confirms the bleeding has stopped without intervention" },
                { id: "d", text: "It means a transfusion should be given straight away now" }
            ],
            correct: "a",
            rationale: {
                correct: "Hemoglobin takes 24 to 72 hours to equilibrate after an acute bleed, because whole blood is lost and the concentration only falls once plasma volume is replaced. An early value can look normal while a large volume has been lost, so serial levels are drawn every 6 hours.",
                b: "An early normal hemoglobin excludes nothing, which is the trap this question tests.",
                c: "A single value says nothing about whether bleeding continues.",
                d: "The transfusion trigger is a hemoglobin of 7 g/dL, or 8 to 9 with coronary disease or symptoms."
            },
            testTakingTip: "Watch the heart rate and blood pressure before the hemoglobin. Tachycardia over 100 is the earliest sign of hypovolemia.",
            guideSection: "Section 9 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        },
        {
            id: 15, type: "single", subtype: null, difficulty: "application",
            stem: "A patient with a gastrointestinal bleed and no cardiac history has a hemoglobin of 6.6 g/dL. What should the nurse anticipate?",
            options: [
                { id: "a", text: "Transfusion, since the trigger is 7 g/dL" },
                { id: "b", text: "Observation, since the trigger is 5 g/dL" },
                { id: "c", text: "Oral iron therapy started before discharge" },
                { id: "d", text: "Repeating the sample before any treatment" }
            ],
            correct: "a",
            rationale: {
                correct: "The hemoglobin transfusion trigger is 7 g/dL for most patients, rising to 8 or 9 g/dL for those with coronary disease or symptoms. At 6.6 g/dL this patient is below the threshold.",
                b: "There is no 5 g/dL threshold in this guideline, and waiting that long is unsafe.",
                c: "Oral iron replaces stores over weeks and does nothing for an acute deficit.",
                d: "Repeating the sample delays a transfusion the value already justifies."
            },
            testTakingTip: "7 g/dL for most, 8 to 9 with coronary disease or symptoms. The comorbidity raises the trigger.",
            guideSection: "Section 9 - Numbers to have cold",
            guideSectionId: "numbers-cold"
        }
    ]
};
