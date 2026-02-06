/**
 * GI Bleeding Quiz — Question Data
 * 10 NCLEX-style questions: 3 Single, 3 SATA, 2 Priority, 2 Analysis
 */

/* exported giBleedingQuizData */
var giBleedingQuizData = {
    guideName: "GI Bleeding",
    guideSlug: "gi-bleeding",
    category: "Gastrointestinal",
    categoryColor: "#f59e0b",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is assessing a patient admitted with suspected gastrointestinal bleeding. The patient has black, tarry, foul-smelling stools. Which type of GI bleed does this finding MOST likely indicate?",
            options: [
                { id: "a", text: "Lower GI bleed from diverticulosis" },
                { id: "b", text: "Upper GI bleed from a source above the ligament of Treitz" },
                { id: "c", text: "Lower GI bleed from hemorrhoids" },
                { id: "d", text: "GI bleed from a colorectal source" }
            ],
            correct: "b",
            rationale: {
                correct: "Melena (black, tarry, foul-smelling stool) is the hallmark sign of UPPER GI bleeding. The black color results from the digestion of blood as it passes through the GI tract — the longer transit time from an upper source allows gastric acid and intestinal bacteria to break down hemoglobin into hematin, which is black. Sources above the ligament of Treitz (esophagus, stomach, duodenum) are classified as upper GI bleeds.",
                a: "Diverticulosis (lower GI) typically causes bright red blood per rectum (hematochezia), not melena. The short transit time from the colon does not allow for blood digestion.",
                c: "Hemorrhoidal bleeding produces bright red blood on the stool surface or on toilet paper. It does not cause the diffuse black discoloration of melena.",
                d: "Colorectal bleeding (lower GI) generally presents as hematochezia — bright red or maroon-colored blood — because there is insufficient transit time for blood digestion."
            },
            testTakingTip: "Melena (black/tarry) = upper GI. Hematochezia (bright red) = usually lower GI. Coffee-ground emesis = upper GI (partially digested blood in stomach). Exception: a massive, brisk upper GI bleed can cause hematochezia because the blood moves through so fast it doesn't have time to be digested.",
            guideSection: "Section 3 — Upper vs Lower GI Bleeding",
            guideSectionId: "types"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient presents to the emergency department with hematemesis (vomiting bright red blood). Vital signs: BP 86/52 mmHg, HR 128 bpm, RR 26 breaths/min, SpO2 94%. The patient is anxious and confused. Initial hemoglobin is 10.2 g/dL. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Insert a nasogastric tube for lavage" },
                { id: "b", text: "Establish two large-bore (18-gauge or larger) IV lines and begin fluid resuscitation" },
                { id: "c", text: "Obtain a type and crossmatch for blood transfusion" },
                { id: "d", text: "Prepare the patient for emergent endoscopy" }
            ],
            correct: "b",
            rationale: {
                correct: "This patient is in hemorrhagic shock — hypotension (86/52), tachycardia (128), tachypnea, confusion, and active hematemesis. The ABC priority is establishing vascular access for fluid resuscitation. Two large-bore IVs (18G or larger, preferably 16G or 14G) in the antecubital veins allow rapid infusion of crystalloids (NS or LR) to restore circulating volume and blood pressure.",
                a: "An NG tube may be placed for lavage to confirm the upper GI source and assess for active bleeding, but vascular access and resuscitation take priority. You cannot lavage if the patient is in cardiovascular collapse.",
                c: "Type and crossmatch is essential and should be drawn AT THE SAME TIME as IV access is established, but establishing the IV lines comes first — you need vascular access before you can draw labs or transfuse.",
                d: "Endoscopy is the definitive diagnostic and therapeutic intervention for upper GI bleeding, but the patient must be hemodynamically stabilized first. Endoscopy in an unstable patient carries high risk."
            },
            labValues: [
                { name: "Hemoglobin", normal: "Male: 14–18 g/dL; Female: 12–16 g/dL" },
                { name: "Hematocrit", normal: "Male: 42–52%; Female: 37–47%" }
            ],
            testTakingTip: "In active GI bleeding with hemodynamic instability, follow the ABCs: Airway (protect if LOC decreased), Breathing (O2), Circulation (TWO large-bore IVs + fluids). The initial hemoglobin can be MISLEADINGLY NORMAL because it takes 24-72 hours for hemodilution to reflect the true blood loss.",
            guideSection: "Section 6 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 3,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient with an acute upper GI bleed who is being resuscitated. Which interventions should the nurse anticipate? (Select all that apply.)",
            options: [
                { id: "a", text: "Insert two large-bore (16-18 gauge) peripheral IV catheters" },
                { id: "b", text: "Send blood for type and crossmatch, CBC, BMP, and coagulation studies" },
                { id: "c", text: "Insert a Foley catheter to monitor urine output" },
                { id: "d", text: "Administer oral proton pump inhibitor (PPI) immediately" },
                { id: "e", text: "Place the patient on continuous cardiac monitoring" },
                { id: "f", text: "Administer morphine IV for abdominal pain management" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Resuscitation for acute GI bleeding includes large-bore IV access, comprehensive lab work including type and crossmatch, Foley catheter for UOP monitoring, and continuous cardiac monitoring.",
                a: "CORRECT — Two large-bore IVs allow simultaneous fluid resuscitation and blood product administration. 16G or larger is preferred for rapid transfusion.",
                b: "CORRECT — Type and crossmatch (for 2-6 units PRBCs STAT), CBC (baseline Hgb/Hct), BMP (electrolytes, BUN — elevated BUN in upper GI bleed from blood protein digestion), and coagulation studies (PT/INR, PTT) are all essential initial labs.",
                c: "CORRECT — A Foley catheter allows precise hourly urine output measurement. Target UOP is >0.5 mL/kg/hour as an indicator of adequate organ perfusion. Declining UOP suggests worsening shock.",
                d: "INCORRECT — In the acute resuscitation phase, an IV PPI (not oral) is the route of choice. Oral medications may not be absorbed in a patient who is vomiting blood and may be NPO for endoscopy. The standard is IV pantoprazole 80 mg bolus followed by 8 mg/hour infusion for 72 hours.",
                e: "CORRECT — Continuous cardiac monitoring detects arrhythmias that can result from hemodynamic instability, electrolyte imbalances (especially from massive transfusion), or myocardial ischemia from reduced oxygen delivery.",
                f: "INCORRECT — Morphine can cause hypotension (vasodilation) and respiratory depression, both of which are dangerous in a hemorrhaging patient. Pain management should be cautious and may include non-opioid options or carefully titrated small doses."
            },
            testTakingTip: "GI bleed resuscitation priorities: Two large-bore IVs, type & crossmatch, CBC/BMP/coags, Foley catheter (UOP goal >0.5 mL/kg/hr), cardiac monitor, NPO for endoscopy. Remember: IV PPI, not oral, in the acute setting.",
            guideSection: "Section 6 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a GI bleed has a nasogastric (NG) tube inserted. The nurse performs gastric lavage and obtains clear, bile-tinged aspirate with no blood. How should the nurse interpret this finding?",
            options: [
                { id: "a", text: "The patient does not have a GI bleed" },
                { id: "b", text: "Upper GI bleeding is unlikely but cannot be definitively ruled out" },
                { id: "c", text: "The bleeding has stopped and no further workup is needed" },
                { id: "d", text: "The NG tube is malpositioned and needs to be replaced" }
            ],
            correct: "b",
            rationale: {
                correct: "A bilious (bile-stained) but non-bloody NG aspirate makes active upper GI bleeding UNLIKELY because bile confirms the tube is past the pylorus or that duodenal contents are refluxing into the stomach. However, it does NOT definitively rule out upper GI bleeding — the bleed may be intermittent, distal to the tube tip, or may have stopped temporarily. Endoscopy remains the definitive diagnostic tool.",
                a: "A clear NG aspirate does not rule out GI bleeding entirely. The patient may have a lower GI source, an intermittent upper source, or a post-pyloric duodenal bleed that doesn't reflux back to the stomach.",
                c: "Even if the bleeding has paused, further workup (endoscopy, labs, monitoring) is needed. GI bleeds can recur unpredictably, and the source must be identified for definitive treatment.",
                d: "The presence of bile actually CONFIRMS proper positioning — it means the tube is in the stomach and gastric/duodenal contents are being aspirated. Bile is an expected and helpful finding."
            },
            testTakingTip: "NG lavage interpretation: Bloody/coffee-ground = confirms upper GI bleed. Clear with bile = makes upper GI bleed unlikely. Clear WITHOUT bile = does NOT rule out upper GI bleed (could be pre-pyloric and the tube may not be reaching the blood). The key pearl: a negative lavage does not definitively exclude an upper source.",
            guideSection: "Section 5 — Diagnostic Procedures",
            guideSectionId: "diagnostics"
        },
        {
            id: 5,
            type: "sata",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient is admitted with a GI bleed. Vital signs: BP 100/68, HR 118, RR 22. Labs drawn on admission 2 hours ago showed Hgb 11.8 g/dL. The patient continues to have melena stools. The nurse knows that the hemoglobin level may not accurately reflect the degree of blood loss. Why? (Select all that apply.)",
            options: [
                { id: "a", text: "Hemoglobin does not drop immediately because both red blood cells and plasma are lost proportionally in acute hemorrhage" },
                { id: "b", text: "Hemodilution has not yet occurred — it takes 24-72 hours for interstitial fluid to shift into the vascular space" },
                { id: "c", text: "IV fluid resuscitation has not yet been initiated" },
                { id: "d", text: "Hemoglobin levels are only accurate when drawn from an arterial line" },
                { id: "e", text: "The patient's tachycardia and relative hypotension suggest greater blood loss than the hemoglobin indicates" }
            ],
            correct: ["a", "b", "e"],
            rationale: {
                correct: "In acute hemorrhage, the initial hemoglobin is misleadingly normal because whole blood (RBCs + plasma) is lost proportionally, and the compensatory fluid shift (hemodilution) that reveals the true hemoglobin drop takes 24-72 hours. The vital signs are a more accurate reflection of blood loss severity.",
                a: "CORRECT — In acute hemorrhage, the patient loses whole blood (cells + plasma in equal proportion). The hemoglobin concentration (ratio of RBCs to plasma) doesn't change initially because the denominator (plasma) drops along with the numerator (RBCs).",
                b: "CORRECT — Over 24-72 hours, the body compensates by shifting interstitial fluid into the vascular space (transcapillary refill) and retaining water via ADH and aldosterone. This dilutes the remaining red blood cells, causing the hemoglobin to drop — the 'hemodilution' effect.",
                c: "While IV fluids do cause hemodilution, the question asks why the hemoglobin is misleading, which is primarily a physiologic phenomenon (options A and B). IV fluids may accelerate the process but are not the primary reason the initial Hgb is unreliable.",
                d: "INCORRECT — Hemoglobin can be accurately measured from venous, arterial, or capillary samples. The source of the blood draw does not significantly affect hemoglobin accuracy.",
                e: "CORRECT — The vital signs (HR 118, BP 100/68) suggest Class II-III hemorrhagic shock (15-40% blood volume loss). These hemodynamic changes are more sensitive early indicators of blood loss than the hemoglobin level."
            },
            labValues: [
                { name: "Hemoglobin", normal: "Male: 14–18 g/dL; Female: 12–16 g/dL" },
                { name: "Transfusion Trigger", normal: "Hgb <7 g/dL (or <8-9 if cardiac disease)" }
            ],
            testTakingTip: "The NCLEX loves this concept: In acute GI bleeding, the initial hemoglobin is a LIAR. Trust the vital signs more than the lab in the first 24 hours. Tachycardia is the earliest compensatory sign of hemorrhage. This is why serial hemoglobin monitoring is essential.",
            guideSection: "Section 4 — Assessment & Hemodynamic Status",
            guideSectionId: "assessment"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is reviewing hemorrhagic shock classifications. A patient with a GI bleed has the following vital signs: HR 126 bpm, BP 88/56 mmHg, RR 28 breaths/min. The patient is anxious and confused. Based on these findings, which class of hemorrhagic shock is the patient MOST likely experiencing?",
            options: [
                { id: "a", text: "Class I — <15% blood volume loss" },
                { id: "b", text: "Class II — 15-30% blood volume loss" },
                { id: "c", text: "Class III — 30-40% blood volume loss" },
                { id: "d", text: "Class IV — >40% blood volume loss" }
            ],
            correct: "c",
            rationale: {
                correct: "Class III hemorrhagic shock (30-40% blood volume loss, approximately 1,500-2,000 mL) presents with HR 120-140, decreased blood pressure, RR 30-40, and anxiety/confusion. This patient's vitals (HR 126, BP 88/56, RR 28, anxious/confused) are consistent with Class III.",
                a: "Class I (<15% loss, <750 mL): HR <100, normal BP, slightly anxious. This patient's tachycardia and hypotension far exceed Class I parameters.",
                b: "Class II (15-30% loss, 750-1,500 mL): HR 100-120, NORMAL blood pressure (compensated), mildly anxious. This patient has DECREASED BP, which doesn't occur until Class III.",
                d: "Class IV (>40% loss, >2,000 mL): HR >140, severely decreased BP, confused/lethargic, minimal urine output. This patient's HR of 126 and level of consciousness (anxious but not lethargic) suggest Class III rather than IV."
            },
            testTakingTip: "The key differentiator between Class II and III is blood pressure: Class II maintains normal BP through compensatory vasoconstriction. When BP drops, the patient has lost enough volume to overwhelm compensatory mechanisms — that's Class III. HR >120 + decreased BP + confusion = Class III.",
            guideSection: "Section 4 — Assessment & Hemodynamic Status",
            guideSectionId: "assessment"
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
                a: "PPIs are used for peptic ulcer bleeding, not variceal bleeding. Additionally, the oral route is inappropriate for a patient who is actively vomiting blood and in hemorrhagic shock.",
                c: "Lactulose may be needed later if hepatic encephalopathy develops (from blood protein digestion in the gut), but it does not address the acute hemorrhage and is not the priority.",
                d: "Vitamin K may be needed if the patient has coagulopathy from liver disease (impaired clotting factor synthesis), but it takes 24-48 hours to be effective and does not address the immediate variceal hemorrhage."
            },
            testTakingTip: "Variceal bleeding triad: (1) IV octreotide (reduces portal pressure), (2) Prophylactic IV antibiotics (reduces infection and rebleeding), (3) Emergent EGD with band ligation (definitive treatment). Know this sequence — it's different from peptic ulcer bleeding (IV PPI + EGD).",
            guideSection: "Section 7 — Pharmacological Management",
            guideSectionId: "medications"
        },
        {
            id: 8,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a patient with upper GI bleeding who is receiving a massive transfusion protocol (6 units of packed red blood cells). Which complications should the nurse monitor for? (Select all that apply.)",
            options: [
                { id: "a", text: "Hypocalcemia from citrate in the transfused blood" },
                { id: "b", text: "Hyperkalemia from potassium released by stored red blood cells" },
                { id: "c", text: "Hypothermia from rapid infusion of cold blood products" },
                { id: "d", text: "Hyperglycemia from dextrose in the blood storage solution" },
                { id: "e", text: "Coagulopathy from dilution of clotting factors and platelets" }
            ],
            correct: ["a", "b", "c", "e"],
            rationale: {
                correct: "Massive transfusion complications include hypocalcemia (citrate binds calcium), hyperkalemia (potassium leaks from stored RBCs), hypothermia (cold products), and dilutional coagulopathy (clotting factors and platelets are diluted/consumed).",
                a: "CORRECT — Citrate is the anticoagulant used to preserve stored blood. During massive transfusion, excess citrate binds ionized calcium in the patient's blood, causing hypocalcemia. Signs include circumoral tingling, muscle cramping, and QT prolongation.",
                b: "CORRECT — Stored red blood cells leak potassium into the storage solution over time. Rapid transfusion of multiple units delivers a potassium load that can cause hyperkalemia, especially in patients with renal impairment. ECG changes include peaked T waves.",
                c: "CORRECT — Blood products are stored at 1-6°C. Rapid infusion of cold products can cause hypothermia, which worsens coagulopathy (the \"triad of death\": hypothermia, acidosis, coagulopathy). Blood warmers should be used.",
                d: "INCORRECT — Blood storage solutions contain a small amount of dextrose, but this is negligible and does not cause clinically significant hyperglycemia. This is not a recognized massive transfusion complication.",
                e: "CORRECT — PRBCs do not contain significant clotting factors or platelets. Replacing blood volume with only RBCs dilutes the remaining clotting factors, leading to coagulopathy. This is why massive transfusion protocols include FFP and platelets in addition to PRBCs."
            },
            labValues: [
                { name: "Calcium (ionized)", normal: "4.5–5.5 mg/dL" },
                { name: "Potassium", normal: "3.5–5.0 mEq/L" },
                { name: "INR", normal: "0.8–1.1" },
                { name: "Platelets", normal: "150,000–400,000/mm³" }
            ],
            testTakingTip: "Massive transfusion complications to memorize: Hypocalcemia (citrate), Hyperkalemia (stored cell leakage), Hypothermia (cold products), Coagulopathy (dilution). Mnemonic: the '3 Hypos + 1 Hyper' — hypocalcemia, hypothermia, hypo-coagulopathy, and hyperkalemia.",
            guideSection: "Section 6 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a GI bleed has been stabilized and is being evaluated. Lab results show: BUN 42 mg/dL, Creatinine 1.0 mg/dL, BUN/Creatinine ratio 42:1. What does the elevated BUN with normal creatinine MOST likely indicate?",
            options: [
                { id: "a", text: "Acute kidney injury from hypovolemic shock" },
                { id: "b", text: "Chronic kidney disease that predates the GI bleed" },
                { id: "c", text: "Absorption and digestion of blood in the GI tract" },
                { id: "d", text: "Dehydration unrelated to the GI bleed" }
            ],
            correct: "c",
            rationale: {
                correct: "An elevated BUN with a NORMAL creatinine (BUN/Cr ratio >20:1) in a GI bleed patient is a classic finding that points to upper GI bleeding. When blood enters the GI tract, proteins in the blood are digested and absorbed, then metabolized to urea in the liver, raising the BUN. Because this is not a renal problem, the creatinine remains normal — the elevated BUN is from a GI (extra-renal) protein load.",
                a: "Acute kidney injury would elevate BOTH BUN and creatinine. A normal creatinine of 1.0 mg/dL argues against renal injury.",
                b: "CKD also elevates both BUN and creatinine proportionally. The isolated BUN elevation with normal creatinine is not consistent with kidney disease.",
                d: "While dehydration can cause prerenal azotemia (elevated BUN/Cr ratio), in the context of a known GI bleed, blood protein digestion is the most likely explanation. Dehydration would also typically cause some creatinine elevation."
            },
            labValues: [
                { name: "BUN", normal: "10–20 mg/dL" },
                { name: "Creatinine", normal: "0.7–1.3 mg/dL" },
                { name: "BUN/Cr Ratio", normal: "10:1 to 20:1" }
            ],
            testTakingTip: "Elevated BUN with normal creatinine (ratio >20:1) in a GI bleed patient = blood is being digested in the GI tract, pointing to an UPPER GI source. This lab pattern is part of the Glasgow-Blatchford Score used to risk-stratify GI bleeds. It's also used to differentiate upper from lower GI bleeding.",
            guideSection: "Section 5 — Diagnostic Procedures",
            guideSectionId: "diagnostics"
        },
        {
            id: 10,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A patient admitted for GI bleeding has been stable for 6 hours. The nurse enters the room and finds the patient vomiting large amounts of bright red blood. The patient is diaphoretic and states, \"I feel like I'm going to pass out.\" The patient has two functioning large-bore IVs. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Turn the patient on their side and suction the airway" },
                { id: "b", text: "Increase the IV fluid rate and hang a second bag of normal saline" },
                { id: "c", text: "Call the provider to order an emergent endoscopy" },
                { id: "d", text: "Draw a stat hemoglobin and type and crossmatch" }
            ],
            correct: "a",
            rationale: {
                correct: "The FIRST priority is airway protection. The patient is actively vomiting large amounts of blood and is at immediate risk of aspiration, which could cause airway obstruction, aspiration pneumonia, or asphyxiation. Turning the patient to the side (recovery position) allows blood to drain from the mouth rather than being aspirated into the lungs. Suctioning clears any blood already in the oropharynx.",
                b: "Volume resuscitation is critical and should happen immediately after airway protection, but a patient who aspirates blood into the lungs could die within minutes. Airway always comes before circulation in the ABCs.",
                c: "The provider should be notified urgently, but this is not the FIRST action. The nurse must address the immediate safety threat (airway) before calling for diagnostic or procedural interventions.",
                d: "Labs are important for guiding transfusion but are not the first priority when the patient is actively vomiting blood and at risk of aspiration."
            },
            testTakingTip: "When a patient is actively vomiting blood and at risk of losing consciousness, think ABCs: Airway FIRST. Position to prevent aspiration (lateral/side-lying), then suction, then address circulation (fluids/blood). If the NCLEX offers an airway option alongside a circulation or diagnostic option, airway always wins.",
            guideSection: "Section 6 — Priority Nursing Interventions",
            guideSectionId: "interventions"
        }
    ]
};
