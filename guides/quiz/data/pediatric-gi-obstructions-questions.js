/**
 * Pediatric GI Obstructions Quiz — Question Data
 * NCLEX-style questions covering pyloric stenosis, intussusception,
 * Hirschsprung's disease, and appendicitis.
 */

/* exported pediatricGiObstructionsQuizData */
var pediatricGiObstructionsQuizData = {
    guideName: "Pediatric GI Obstructions",
    guideSlug: "pediatric-gi-obstructions",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 16,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 5-week-old first-born boy is brought to the ED with a 3-day history of forceful vomiting after every feed. The vomit shoots across the room, contains no bile, and the infant appears hungry immediately after vomiting. Which condition is most likely?",
            options: [
                { id: "a", text: "Gastroenteritis" },
                { id: "b", text: "Pyloric stenosis" },
                { id: "c", text: "Intussusception" },
                { id: "d", text: "Gastroesophageal reflux" }
            ],
            correct: "b",
            rationale: {
                correct: "The classic triad of projectile non-bilious vomiting, hunger immediately after vomiting, and the 2\u20138 week age window in a first-born boy is diagnostic for pyloric stenosis. The olive-shaped RUQ mass and visible peristaltic waves complete the picture.",
                a: "Gastroenteritis typically causes diarrhea and the child is not hungry after vomiting.",
                c: "Intussusception peaks at 5\u20139 months and features intermittent severe pain, not projectile vomiting.",
                d: "GER involves effortless regurgitation, not forceful projectile vomiting, and is not typically associated with hunger immediately afterward."
            },
            testTakingTip: "First-born boy + 2\u20138 weeks + projectile vomiting + hungry after = pyloric stenosis. Memorize this cluster.",
            guideSection: "Section 2 \u2014 Pyloric Stenosis",
            guideSectionId: "pyloric"
        },
        {
            id: 2,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 5-week-old infant has just been diagnosed with pyloric stenosis. Labs show Na+ 128, K+ 3.0, Cl- 88, pH 7.52, HCO3- 32. What is the priority nursing action?",
            options: [
                { id: "a", text: "Prepare the infant for immediate pyloromyotomy" },
                { id: "b", text: "Begin IV fluids and correct the electrolyte abnormalities" },
                { id: "c", text: "Offer small frequent oral feeds to maintain hydration" },
                { id: "d", text: "Administer IV potassium as a rapid bolus" }
            ],
            correct: "b",
            rationale: {
                correct: "The labs show the classic hypochloremic, hypokalemic metabolic alkalosis of pyloric stenosis. IV fluid and electrolyte correction must precede surgery \u2014 induction of anesthesia in an alkalotic, dehydrated infant can cause cardiovascular collapse.",
                a: "Surgery must wait until the infant is hemodynamically stable and electrolytes are corrected.",
                c: "The infant has been vomiting everything; oral intake is not reliable.",
                d: "Rapid potassium boluses can cause fatal cardiac arrhythmias. Potassium is added to maintenance fluids only once urine output is established."
            },
            testTakingTip: "Pyloric stenosis surgery is elective, not emergent. Fluids first, always.",
            guideSection: "Section 2 \u2014 Pyloric Stenosis",
            guideSectionId: "pyloric"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which electrolyte and acid-base imbalance is characteristic of pyloric stenosis?",
            options: [
                { id: "a", text: "Hyperkalemic, hyperchloremic metabolic acidosis" },
                { id: "b", text: "Hypokalemic, hypochloremic metabolic alkalosis" },
                { id: "c", text: "Hyponatremic, hyperkalemic metabolic acidosis" },
                { id: "d", text: "Hypercalcemic respiratory alkalosis" }
            ],
            correct: "b",
            rationale: {
                correct: "Persistent vomiting of stomach acid (HCl) depletes chloride and hydrogen ions, raising bicarbonate (alkalosis). The kidneys compensate by excreting potassium, producing hypokalemia.",
                a: "Opposite pattern \u2014 acidosis would occur with diarrhea, not vomiting.",
                c: "Hyperkalemia doesn't fit; potassium is lost with the alkalosis.",
                d: "Hypercalcemia is unrelated to vomiting."
            },
            testTakingTip: "Vomiting stomach contents = losing acid = alkalosis. Easy memory hook.",
            guideSection: "Section 2 \u2014 Pyloric Stenosis",
            guideSectionId: "pyloric"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 7-month-old is brought to the ED with episodes of sudden, severe abdominal pain during which he draws his knees up to his chest and cries inconsolably. Between episodes he appears normal. The parents report one episode of bloody mucus-streaked stool. What is the most likely diagnosis?",
            options: [
                { id: "a", text: "Appendicitis" },
                { id: "b", text: "Pyloric stenosis" },
                { id: "c", text: "Intussusception" },
                { id: "d", text: "Hirschsprung's disease" }
            ],
            correct: "c",
            rationale: {
                correct: "Intussusception classically presents between 3 months and 3 years (peak 5\u20139 months) with intermittent severe crampy abdominal pain that causes the infant to draw knees to chest. 'Currant jelly' stool (blood and mucus) is a late sign indicating bowel ischemia.",
                a: "Appendicitis is rare in infants; pain is typically continuous and migratory to RLQ.",
                b: "Pyloric stenosis causes projectile vomiting, not intermittent crampy pain or bloody stool.",
                d: "Hirschsprung's presents with failure to pass meconium as a newborn or chronic constipation."
            },
            testTakingTip: "Intermittent knees-to-chest pain + currant jelly stool + 5\u20139 months = intussusception.",
            guideSection: "Section 3 \u2014 Intussusception",
            guideSectionId: "intussusception"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 10-month-old is diagnosed with intussusception and scheduled for a hydrostatic contrast enema. The parent asks the nurse, 'Is the enema just to take pictures?' The nurse's best response is:",
            options: [
                { id: "a", text: "'Yes, it's only a diagnostic test to confirm what's wrong.'" },
                { id: "b", text: "'The enema can both diagnose and often fix the telescoping without surgery.'" },
                { id: "c", text: "'The enema is a preparation before surgery.'" },
                { id: "d", text: "'The enema is done to check for any bleeding in the bowel.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Hydrostatic or air contrast enemas reduce 75\u201380% of intussusception cases, making the enema both diagnostic AND therapeutic. Surgery is reserved for cases where enema fails or there are signs of perforation or ischemic bowel.",
                a: "The enema is therapeutic in most cases, not just diagnostic.",
                c: "The enema itself often avoids the need for surgery.",
                d: "The enema doesn't primarily check for bleeding."
            },
            testTakingTip: "Contrast enema in intussusception = both diagnosis and treatment. Unique to this disorder.",
            guideSection: "Section 3 \u2014 Intussusception",
            guideSectionId: "intussusception"
        },
        {
            id: 6,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A nurse is caring for a 10-month-old who had successful hydrostatic reduction of intussusception 4 hours ago. The parent excitedly reports the infant just had a 'normal brown poopy diaper.' What is the nurse's best interpretation?",
            options: [
                { id: "a", text: "This suggests a recurrence of the intussusception" },
                { id: "b", text: "This is a positive sign of successful reduction" },
                { id: "c", text: "This indicates bowel perforation" },
                { id: "d", text: "This is abnormal and requires immediate surgical consult" }
            ],
            correct: "b",
            rationale: {
                correct: "Passing a normal brown stool after reduction is a reassuring sign that the bowel is functioning and the intussusception has resolved. The nurse should document and continue monitoring, especially for recurrence in the first 24\u201372 hours.",
                a: "Recurrence would present with the return of severe crampy pain, not a normal stool.",
                c: "Perforation presents with high fever, rigid abdomen, and shock \u2014 not a normal stool.",
                d: "This finding is positive, not abnormal."
            },
            testTakingTip: "Normal brown stool post-reduction = good news. Teach parents to report severe pain episodes (recurrence) or currant-jelly stool.",
            guideSection: "Section 3 \u2014 Intussusception",
            guideSectionId: "intussusception"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A term newborn has not passed meconium by 50 hours of life and has abdominal distension with bilious vomiting. Which condition should the nurse suspect first?",
            options: [
                { id: "a", text: "Physiologic feeding intolerance" },
                { id: "b", text: "Hirschsprung's disease" },
                { id: "c", text: "Gastroesophageal reflux" },
                { id: "d", text: "Colic" }
            ],
            correct: "b",
            rationale: {
                correct: "Failure to pass meconium within 48 hours of birth is the classic presentation of Hirschsprung's disease. Combined with distension and bilious vomiting, this is a red-flag pattern that warrants immediate evaluation, typically starting with a contrast enema and rectal biopsy.",
                a: "Physiologic feeding issues don't prevent meconium passage.",
                c: "GER doesn't cause absence of meconium or abdominal distension.",
                d: "Colic is a diagnosis of exclusion and not associated with absent meconium."
            },
            testTakingTip: "No meconium in 48 hours = Hirschsprung's until proven otherwise.",
            guideSection: "Section 4 \u2014 Hirschsprung's Disease",
            guideSectionId: "hirschsprung"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which diagnostic test is considered the GOLD STANDARD for Hirschsprung's disease?",
            options: [
                { id: "a", text: "Abdominal X-ray" },
                { id: "b", text: "Contrast enema" },
                { id: "c", text: "Rectal biopsy showing absence of ganglion cells" },
                { id: "d", text: "Stool culture" }
            ],
            correct: "c",
            rationale: {
                correct: "Rectal biopsy demonstrating the ABSENCE of ganglion cells in the submucosa is the definitive, gold-standard diagnostic test for Hirschsprung's disease.",
                a: "Abdominal X-ray shows distension but is not diagnostic.",
                b: "Contrast enema is highly supportive (transition zone) but not definitive.",
                d: "Stool culture is irrelevant to Hirschsprung's diagnosis."
            },
            testTakingTip: "Hirschsprung gold standard = rectal biopsy, absent ganglion cells.",
            guideSection: "Section 4 \u2014 Hirschsprung's Disease",
            guideSectionId: "hirschsprung"
        },
        {
            id: 9,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A 3-year-old with known Hirschsprung's disease awaiting surgical repair is admitted with a fever of 39.5\u00b0C, explosive foul-smelling diarrhea, and marked abdominal distension. What is the nurse's priority concern?",
            options: [
                { id: "a", text: "Viral gastroenteritis" },
                { id: "b", text: "Hirschsprung-associated enterocolitis (HAEC)" },
                { id: "c", text: "Appendicitis" },
                { id: "d", text: "Constipation from pre-op NPO" }
            ],
            correct: "b",
            rationale: {
                correct: "High fever, explosive foul diarrhea, and distension in a child with known Hirschsprung's strongly suggests HAEC \u2014 a life-threatening complication. Requires emergent IV fluids, broad-spectrum antibiotics, rectal decompression, and close hemodynamic monitoring.",
                a: "Possible but unlikely to present this dramatically in a Hirschsprung child.",
                c: "Appendicitis usually presents with RLQ migration of pain, not explosive diarrhea.",
                d: "Constipation doesn't cause high fever or explosive diarrhea."
            },
            testTakingTip: "In a Hirschsprung child, fever + explosive diarrhea + distension = enterocolitis. Priority action.",
            guideSection: "Section 4 \u2014 Hirschsprung's Disease",
            guideSectionId: "hirschsprung"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "An 11-year-old presents with abdominal pain that started around the umbilicus 12 hours ago and has migrated to the right lower quadrant. He has a low-grade fever, no appetite, and one episode of vomiting. On exam, rebound tenderness is present at McBurney's point. What is the most likely diagnosis?",
            options: [
                { id: "a", text: "Appendicitis" },
                { id: "b", text: "Gastroenteritis" },
                { id: "c", text: "Constipation" },
                { id: "d", text: "Urinary tract infection" }
            ],
            correct: "a",
            rationale: {
                correct: "Periumbilical pain migrating to the RLQ (McBurney's point), anorexia, low-grade fever, vomiting after pain onset, and rebound tenderness is the classic presentation of appendicitis in school-age children and adolescents.",
                a: "Correct \u2014 classic appendicitis.",
                b: "Gastroenteritis typically causes diarrhea, which is not described here, and pain is diffuse, not localized.",
                c: "Constipation doesn't migrate or cause rebound tenderness.",
                d: "UTI may cause flank pain and dysuria, not this pain pattern."
            },
            testTakingTip: "Pain migration from periumbilical to RLQ + anorexia + rebound = textbook appendicitis.",
            guideSection: "Section 5 \u2014 Appendicitis",
            guideSectionId: "appendicitis"
        },
        {
            id: 11,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "An adolescent with suspected appendicitis suddenly reports that his severe abdominal pain has completely resolved. Within the next hour he develops a fever of 39\u00b0C and his abdomen becomes diffusely tender and rigid. What has most likely happened?",
            options: [
                { id: "a", text: "Spontaneous resolution of the inflammation" },
                { id: "b", text: "Perforation of the appendix with early peritonitis" },
                { id: "c", text: "Successful response to pain medication" },
                { id: "d", text: "Onset of a separate gastroenteritis" }
            ],
            correct: "b",
            rationale: {
                correct: "Sudden relief of pain followed by fever and diffuse rigidity is the classic presentation of a perforated appendix. Pressure is relieved temporarily, but bacterial spread causes peritonitis within hours. Immediate surgical intervention is required.",
                a: "Appendicitis does not spontaneously resolve in this manner; any relief is ominous.",
                c: "Pain medication would not cause diffuse rigidity or high fever.",
                d: "Separate gastroenteritis doesn't explain the rigid abdomen or the pain pattern."
            },
            testTakingTip: "Sudden pain relief in appendicitis = perforation until proven otherwise.",
            guideSection: "Section 5 \u2014 Appendicitis",
            guideSectionId: "appendicitis"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a 10-year-old with suspected appendicitis awaiting surgical evaluation. Which intervention is CONTRAINDICATED?",
            options: [
                { id: "a", text: "Maintain NPO status" },
                { id: "b", text: "Apply a heating pad to the abdomen for comfort" },
                { id: "c", text: "Start IV fluids" },
                { id: "d", text: "Monitor vital signs every 2 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Applying heat to the abdomen in suspected appendicitis can cause the appendix to rupture. Cold compresses (if used at all) are sometimes acceptable, but heat is contraindicated. Enemas and laxatives are also contraindicated for the same reason.",
                a: "NPO is appropriate \u2014 prepares for surgery and reduces GI motility.",
                c: "IV fluids are appropriate for hydration pre-op.",
                d: "Frequent vital sign monitoring is essential."
            },
            testTakingTip: "Pre-op appendicitis: NO heat, NO enemas, NO laxatives, NO pre-evaluation pain meds. Each increases rupture risk or masks assessment.",
            guideSection: "Section 5 \u2014 Appendicitis",
            guideSectionId: "appendicitis"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which of the following is NOT a classic peritoneal sign seen in appendicitis?",
            options: [
                { id: "a", text: "Rovsing's sign" },
                { id: "b", text: "Psoas sign" },
                { id: "c", text: "Chvostek's sign" },
                { id: "d", text: "Obturator sign" }
            ],
            correct: "c",
            rationale: {
                correct: "Chvostek's sign is associated with hypocalcemia (facial twitch when tapping over the facial nerve). Rovsing's (LLQ palpation causes RLQ pain), psoas (pain with hip extension), and obturator (pain with internal hip rotation) are all appendicitis signs.",
                a: "Rovsing's is a classic appendicitis sign.",
                b: "Psoas is a classic appendicitis sign.",
                d: "Obturator is a classic appendicitis sign."
            },
            testTakingTip: "Appendicitis signs: Rovsing's, psoas, obturator, Blumberg's (rebound), McBurney's point. Chvostek's is hypocalcemia.",
            guideSection: "Section 5 \u2014 Appendicitis",
            guideSectionId: "appendicitis"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 2-year-old is admitted with severe dehydration from vomiting. The nurse starts an IV and prepares to administer a normal saline bolus. What is the appropriate volume?",
            options: [
                { id: "a", text: "5 mL/kg over 1 hour" },
                { id: "b", text: "10 mL/kg over 30 minutes" },
                { id: "c", text: "20 mL/kg over 20\u201330 minutes" },
                { id: "d", text: "50 mL/kg over 10 minutes" }
            ],
            correct: "c",
            rationale: {
                correct: "Standard pediatric fluid resuscitation is normal saline (or LR) 20 mL/kg IV bolus over 20\u201330 minutes, repeated as needed based on clinical response.",
                a: "Too small and too slow for a severely dehydrated child.",
                b: "The right speed but the volume is inadequate.",
                d: "50 mL/kg over 10 minutes can cause fluid overload; 20 mL/kg is the standard starting bolus."
            },
            testTakingTip: "Pediatric fluid bolus: 20 mL/kg NS over 20\u201330 minutes. Memorize this number.",
            guideSection: "Section 8 \u2014 Medications & Fluids",
            guideSectionId: "medications"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is caring for a 5-week-old infant after a pyloromyotomy. Which post-op feeding instruction is correct?",
            options: [
                { id: "a", text: "Give large volumes to catch up on growth" },
                { id: "b", text: "Feed small amounts upright with frequent burping" },
                { id: "c", text: "Withhold all feeds for 48 hours post-op" },
                { id: "d", text: "Feed in a flat supine position" }
            ],
            correct: "b",
            rationale: {
                correct: "After pyloromyotomy, infants tolerate small, frequent feeds best. Upright positioning and frequent burping reduce the risk of vomiting, which is common for the first 24\u201348 hours post-op.",
                a: "Large volumes increase vomiting risk.",
                c: "Feeds typically resume within 4\u20136 hours post-op with clear fluids advancing.",
                d: "Flat positioning increases aspiration and vomiting risk."
            },
            testTakingTip: "Post-pyloromyotomy: small volumes, upright, frequent burping. Expect some vomiting in first 48 hours.",
            guideSection: "Section 7 \u2014 Priority Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The nurse is assessing a pediatric patient for dehydration. Which finding is the EARLIEST sign of decreased intravascular volume?",
            options: [
                { id: "a", text: "Hypotension" },
                { id: "b", text: "Tachycardia" },
                { id: "c", text: "Sunken fontanelle" },
                { id: "d", text: "Decreased level of consciousness" }
            ],
            correct: "b",
            rationale: {
                correct: "Tachycardia is the EARLIEST sign of volume depletion in children. Hypotension is a LATE and ominous sign \u2014 children compensate well until they can't, then decompensate quickly.",
                a: "Hypotension is late; children can maintain BP even with significant volume loss.",
                c: "Sunken fontanelle indicates moderate to severe dehydration, not early.",
                d: "Altered mental status is a severe/late finding."
            },
            testTakingTip: "Tachycardia FIRST, hypotension LAST in pediatric volume depletion. Memorize this order.",
            guideSection: "Section 1 \u2014 Pediatric GI Assessment",
            guideSectionId: "assessment"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching a parent of a child discharged after surgical repair of Hirschsprung's disease. Which statement by the parent indicates the need for further teaching?",
            options: [
                { id: "a", text: "'If my child gets fever with explosive diarrhea, I'll call the doctor right away.'" },
                { id: "b", text: "'I should watch for increased belly swelling or lethargy.'" },
                { id: "c", text: "'Some constipation after surgery is expected and not a concern.'" },
                { id: "d", text: "'I'll report any foul-smelling diarrhea immediately.'" }
            ],
            correct: "c",
            rationale: {
                correct: "Persistent constipation or soiling issues post-repair CAN occur but should be reported \u2014 it might indicate a retained aganglionic segment or anastomotic stricture. More importantly, enterocolitis can present with paradoxical diarrhea OR severe constipation/distension. Parents should not dismiss any bowel abnormality.",
                a: "Correct \u2014 enterocolitis warning sign.",
                b: "Correct \u2014 distension/lethargy is a red flag.",
                d: "Correct \u2014 foul explosive diarrhea is concerning."
            },
            testTakingTip: "Post-Hirschsprung repair: any abnormal bowel pattern \u2014 including persistent constipation \u2014 warrants evaluation.",
            guideSection: "Section 9 \u2014 Family Education",
            guideSectionId: "family-education"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is ordered to administer ondansetron (Zofran) to a 3-year-old with vomiting. Which assessment is the priority before administration?",
            options: [
                { id: "a", text: "Recent food intake" },
                { id: "b", text: "Baseline EKG for QT interval" },
                { id: "c", text: "Temperature" },
                { id: "d", text: "Urine output over the last 24 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Ondansetron can prolong the QT interval and cause torsades de pointes, especially in children with underlying cardiac conditions, electrolyte abnormalities (low K+, Mg), or on other QT-prolonging medications. Check EKG and electrolytes before routine pediatric dosing.",
                a: "Food intake is not a priority for Zofran dosing.",
                c: "Temperature is useful for general assessment but not specific to Zofran safety.",
                d: "Urine output matters for hydration status but is not specific to Zofran dosing."
            },
            testTakingTip: "Zofran = QT prolongation risk. Check EKG and K+/Mg before giving, especially in kids with cardiac issues or electrolyte problems.",
            guideSection: "Section 8 \u2014 Medications & Fluids",
            guideSectionId: "medications"
        }
    ]
};
