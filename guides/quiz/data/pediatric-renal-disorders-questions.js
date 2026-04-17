/**
 * Pediatric Renal Disorders Quiz — Question Data
 * NCLEX-style questions covering nephrotic syndrome, acute
 * glomerulonephritis, HUS, AKI, and CKD.
 */

/* exported pediatricRenalDisordersQuizData */
var pediatricRenalDisordersQuizData = {
    guideName: "Pediatric Renal Disorders",
    guideSlug: "pediatric-renal-disorders",
    category: "Pediatric Nursing",
    categoryColor: "#ef5a5a",
    estimatedMinutes: 16,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old is brought to the clinic with periorbital edema that is worse in the morning, a 2-kg weight gain over 1 week, foamy urine, and a BP of 92/60. Urinalysis shows 4+ protein. Which condition is most likely?",
            options: [
                { id: "a", text: "Acute glomerulonephritis" },
                { id: "b", text: "Nephrotic syndrome" },
                { id: "c", text: "Hemolytic uremic syndrome" },
                { id: "d", text: "Acute tubular necrosis" }
            ],
            correct: "b",
            rationale: {
                correct: "Periorbital morning edema, massive proteinuria (4+), foamy urine, weight gain from fluid, and a normal BP in a 2\u20136 year old is the classic nephrotic syndrome picture. Low albumin and elevated cholesterol complete the diagnosis.",
                a: "AGN presents with tea-colored urine, HTN, hematuria, and follows a strep infection \u2014 none described here.",
                c: "HUS presents with bloody diarrhea followed by pallor, bruising, oliguria \u2014 not puffy eyes with foamy urine.",
                d: "ATN typically follows ischemic or nephrotoxic insult with oliguria and rising creatinine, not proteinuria and edema."
            },
            testTakingTip: "Foamy urine + normal BP + periorbital AM edema = nephrotic syndrome. Classic NCLEX presentation.",
            guideSection: "Section 2 \u2014 Nephrotic Syndrome",
            guideSectionId: "nephrotic"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 9-year-old who had a sore throat 2 weeks ago now has tea-colored urine, facial puffiness, and a BP of 142/94. Urinalysis shows 2+ protein and gross hematuria with RBC casts. Which lab finding would BEST support the likely diagnosis?",
            options: [
                { id: "a", text: "Serum albumin 1.8 g/dL" },
                { id: "b", text: "Thrombocytopenia with schistocytes" },
                { id: "c", text: "Low C3 complement and elevated ASO titer" },
                { id: "d", text: "Serum cholesterol 450 mg/dL" }
            ],
            correct: "c",
            rationale: {
                correct: "Low C3 (consumed by immune complex activity) and elevated ASO titer (evidence of recent strep infection) confirm post-streptococcal acute glomerulonephritis. Tea-colored urine + HTN + RBC casts in a school-age child after strep is classic PSAGN.",
                a: "Low albumin is the nephrotic marker, not AGN.",
                b: "Schistocytes and thrombocytopenia point to HUS, not AGN.",
                d: "Hyperlipidemia is a nephrotic finding, not AGN."
            },
            testTakingTip: "AGN workup: ASO titer + C3 complement. Low C3 + high ASO + recent strep = PSAGN.",
            guideSection: "Section 3 \u2014 Acute Glomerulonephritis",
            guideSectionId: "agn"
        },
        {
            id: 3,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A 3-year-old is admitted with HUS after 6 days of bloody diarrhea. Stool culture is pending. The overnight provider orders ciprofloxacin and loperamide. What is the nurse's priority action?",
            options: [
                { id: "a", text: "Administer both medications as ordered" },
                { id: "b", text: "Hold both medications and notify the provider" },
                { id: "c", text: "Give the ciprofloxacin but hold the loperamide" },
                { id: "d", text: "Give both but slow the ciprofloxacin infusion" }
            ],
            correct: "b",
            rationale: {
                correct: "Both medications are CONTRAINDICATED in HUS. Antibiotics lyse E. coli and release MORE Shiga toxin, worsening HUS. Antidiarrheals slow gut transit and prolong toxin exposure. Hold both and clarify with the provider \u2014 this is a safety issue.",
                a: "Administering these meds would potentially worsen the patient's condition.",
                c: "Ciprofloxacin alone is still contraindicated for HUS/STEC infection.",
                d: "Slowing the infusion doesn't fix the contraindication."
            },
            testTakingTip: "HUS = NO antibiotics, NO antidiarrheals. Supportive care only. This is a classic pediatric nursing safety question.",
            guideSection: "Section 5 \u2014 HUS",
            guideSectionId: "hus"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which triad defines hemolytic uremic syndrome (HUS)?",
            options: [
                { id: "a", text: "Proteinuria, hypoalbuminemia, edema" },
                { id: "b", text: "Microangiopathic hemolytic anemia, thrombocytopenia, acute kidney injury" },
                { id: "c", text: "Hematuria, hypertension, elevated ASO" },
                { id: "d", text: "Oliguria, hyperkalemia, metabolic acidosis" }
            ],
            correct: "b",
            rationale: {
                correct: "The HUS triad: hemolytic anemia (from RBC fragmentation \u2014 schistocytes, elevated LDH, low haptoglobin), thrombocytopenia (consumption), and acute kidney injury (from endothelial damage).",
                a: "This describes nephrotic syndrome.",
                c: "This describes acute glomerulonephritis.",
                d: "These are general AKI findings, not the HUS triad."
            },
            testTakingTip: "HUS triad: anemia + low platelets + AKI. Memorize all three \u2014 they often appear together in the NCLEX stem.",
            guideSection: "Section 5 \u2014 HUS",
            guideSectionId: "hus"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse is caring for a 5-year-old with nephrotic syndrome on prednisone. The child has a temperature of 39\u00b0C, abdominal pain, and distension. What is the priority concern?",
            options: [
                { id: "a", text: "Appendicitis" },
                { id: "b", text: "Viral gastroenteritis" },
                { id: "c", text: "Spontaneous bacterial peritonitis" },
                { id: "d", text: "Intussusception" }
            ],
            correct: "c",
            rationale: {
                correct: "Nephrotic children are immunocompromised from both steroid therapy and urinary loss of immunoglobulins. Spontaneous bacterial peritonitis (SBP) \u2014 classically from Strep pneumoniae or E. coli \u2014 presents with fever, abdominal pain, and ascites-distension. It's a feared complication requiring urgent evaluation and antibiotics.",
                a: "Appendicitis is possible but SBP is more specific to the nephrotic patient with these findings.",
                b: "Gastroenteritis has different features (vomiting, diarrhea) and doesn't explain distension in a nephrotic child.",
                d: "Intussusception is more common in infants and toddlers; unlikely in a 5-year-old."
            },
            testTakingTip: "Fever + abdominal pain + distension + nephrotic child on steroids = SBP. High-risk and high-priority.",
            guideSection: "Section 2 \u2014 Nephrotic Syndrome",
            guideSectionId: "nephrotic"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which treatment is first-line for minimal change nephrotic syndrome in a pediatric patient?",
            options: [
                { id: "a", text: "Cyclosporine" },
                { id: "b", text: "Corticosteroids (prednisone)" },
                { id: "c", text: "IV albumin alone" },
                { id: "d", text: "Dialysis" }
            ],
            correct: "b",
            rationale: {
                correct: "Prednisone is the standard first-line treatment for MCD \u2014 about 90% of children respond within 2\u20134 weeks. A long taper follows to prevent relapse. Other immunosuppressants are reserved for steroid-resistant or frequently relapsing disease.",
                a: "Cyclosporine is a second-line option for steroid-resistant or dependent cases.",
                c: "Albumin treats symptoms (edema, hypotension) but doesn't address the underlying glomerular disease.",
                d: "Dialysis is not needed in MCD \u2014 these kids have proteinuria, not kidney failure."
            },
            testTakingTip: "MCD = steroid-responsive. Prednisone is first-line, then taper slowly.",
            guideSection: "Section 2 \u2014 Nephrotic Syndrome",
            guideSectionId: "nephrotic"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which represents the MOST common cause of acute kidney injury in pediatric patients?",
            options: [
                { id: "a", text: "Acute glomerulonephritis" },
                { id: "b", text: "Post-renal obstruction" },
                { id: "c", text: "Pre-renal (dehydration, volume loss)" },
                { id: "d", text: "Nephrotoxic medications" }
            ],
            correct: "c",
            rationale: {
                correct: "Pre-renal causes \u2014 dehydration from gastroenteritis, blood loss, shock, or sepsis \u2014 are the most common cause of pediatric AKI. They're also the most reversible if caught early with fluid resuscitation.",
                a: "AGN is a cause of intrinsic AKI but less common overall.",
                b: "Post-renal obstruction is the least common category.",
                d: "Nephrotoxic meds are a significant cause but not the #1."
            },
            testTakingTip: "Pre-renal is the most common AND most reversible. Restore perfusion = fix the kidney.",
            guideSection: "Section 6 \u2014 AKI",
            guideSectionId: "aki"
        },
        {
            id: 8,
            type: "single",
            subtype: "priority",
            difficulty: "application",
            stem: "A child with AKI has a potassium level of 6.8 mEq/L. The EKG shows peaked T waves and a widening QRS complex. Which intervention should the nurse anticipate FIRST?",
            options: [
                { id: "a", text: "Administer oral sodium polystyrene sulfonate" },
                { id: "b", text: "Give IV calcium gluconate" },
                { id: "c", text: "Start IV insulin with dextrose" },
                { id: "d", text: "Prepare for urgent hemodialysis" }
            ],
            correct: "b",
            rationale: {
                correct: "Calcium gluconate IV is given FIRST to stabilize the cardiac membrane in severe hyperkalemia with EKG changes. It doesn't lower the potassium \u2014 it protects the heart while other treatments (insulin/glucose, albuterol, Kayexalate, dialysis) lower the K+.",
                a: "Kayexalate works slowly (hours) and isn't the first step in a cardiac-level emergency.",
                c: "Insulin/dextrose shifts K+ intracellularly but takes 15\u201330 minutes; calcium stabilizes the heart immediately.",
                d: "Dialysis is the definitive treatment but takes time to arrange; calcium buys time."
            },
            testTakingTip: "Hyperkalemia with EKG changes: calcium FIRST (protect the heart), then insulin/glucose (shift), then removal (Kayexalate or dialysis).",
            guideSection: "Section 6 \u2014 AKI",
            guideSectionId: "aki"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A mnemonic used to remember indications for dialysis is AEIOU. Which of the following is NOT one of the components?",
            options: [
                { id: "a", text: "Acidosis" },
                { id: "b", text: "Electrolyte imbalance (hyperkalemia)" },
                { id: "c", text: "Infection" },
                { id: "d", text: "Overload (fluid)" }
            ],
            correct: "c",
            rationale: {
                correct: "AEIOU = Acidosis, Electrolyte derangement, Ingestion (toxin), Overload (fluid), Uremia. Infection is not an indication for dialysis \u2014 the I stands for Ingestion of a dialyzable substance (methanol, lithium, salicylates).",
                a: "Acidosis is the A.",
                b: "Electrolytes is the E.",
                d: "Overload is the O."
            },
            testTakingTip: "AEIOU = Acidosis, Electrolytes, Ingestion, Overload, Uremia. Memorize each letter's meaning.",
            guideSection: "Section 6 \u2014 AKI",
            guideSectionId: "aki"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "Which statement by a parent of a child with chronic kidney disease indicates understanding of phosphate binder therapy?",
            options: [
                { id: "a", text: "'I give the phosphate binder first thing in the morning on an empty stomach.'" },
                { id: "b", text: "'I give the phosphate binder with every meal.'" },
                { id: "c", text: "'I give the phosphate binder once a week.'" },
                { id: "d", text: "'I give it whenever my child is having symptoms.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Phosphate binders (calcium carbonate, sevelamer) bind phosphate in food so it's excreted instead of absorbed. They MUST be given WITH meals to work. Given between meals or on an empty stomach, they do nothing.",
                a: "On an empty stomach they have no food to bind \u2014 no benefit.",
                c: "Weekly dosing is insufficient.",
                d: "These are daily preventive meds, not as-needed."
            },
            testTakingTip: "Phosphate binders: WITH food. Teach this every time.",
            guideSection: "Section 7 \u2014 CKD",
            guideSectionId: "ckd"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which is the most common underlying cause of pediatric chronic kidney disease?",
            options: [
                { id: "a", text: "Type 2 diabetes mellitus" },
                { id: "b", text: "Hypertension" },
                { id: "c", text: "Congenital anomalies of the kidney and urinary tract (CAKUT) and reflux nephropathy" },
                { id: "d", text: "Autoimmune disease" }
            ],
            correct: "c",
            rationale: {
                correct: "In children, CKD is most often caused by CAKUT (hypoplasia, dysplasia, PKD), obstructive uropathy (posterior urethral valves), or reflux nephropathy. This differs from adult CKD, where diabetes and HTN dominate.",
                a: "T2DM and HTN are adult CKD causes.",
                b: "HTN is rare as primary cause in children.",
                d: "Autoimmune disease causes some pediatric CKD but isn't the most common."
            },
            testTakingTip: "Pediatric CKD = mostly congenital causes. Adult CKD = diabetes + HTN. Different etiologies.",
            guideSection: "Section 7 \u2014 CKD",
            guideSectionId: "ckd"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 4-year-old with nephrotic syndrome weighs 18 kg. Over the past 2 days, the child has gained 1.5 kg. There is increasing periorbital edema. Urine output has decreased. Which nursing action is the priority?",
            options: [
                { id: "a", text: "Encourage the child to drink more fluids" },
                { id: "b", text: "Notify the provider and anticipate diuretic and possibly albumin administration" },
                { id: "c", text: "Increase the sodium in the child's diet" },
                { id: "d", text: "Apply ice packs to reduce the facial edema" }
            ],
            correct: "b",
            rationale: {
                correct: "A 1.5 kg gain in 2 days in a nephrotic child reflects significant fluid retention. The nurse should notify the provider and anticipate a diuretic (furosemide) with or without 25% albumin to pull fluid back into the vessels before diuresis.",
                a: "Increasing fluids worsens overload.",
                c: "Sodium restriction is part of treatment \u2014 don't increase it.",
                d: "Ice packs don't address systemic fluid overload."
            },
            testTakingTip: "Daily weight changes in renal patients = fluid status changes. 1.5 kg in 2 days is significant.",
            guideSection: "Section 2 \u2014 Nephrotic Syndrome",
            guideSectionId: "nephrotic"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A 7-year-old with an arteriovenous fistula for dialysis is admitted to the pediatric unit for an unrelated issue. Which nursing action is MOST important regarding the fistula arm?",
            options: [
                { id: "a", text: "Take all blood pressures and blood draws from that arm" },
                { id: "b", text: "Avoid BPs, IVs, and blood draws in the fistula arm; palpate thrill and auscultate bruit each shift" },
                { id: "c", text: "Keep the arm elevated on pillows at all times" },
                { id: "d", text: "Apply firm pressure over the fistula to prevent clotting" }
            ],
            correct: "b",
            rationale: {
                correct: "The AV fistula is a vital access for dialysis. Compression (BPs, tight dressings), venipuncture, or IVs in that arm can damage or occlude the fistula. Nurses must confirm patency every shift by palpating a thrill and auscultating a bruit.",
                a: "All of those actions threaten the fistula.",
                c: "Elevation is not routinely required.",
                d: "Firm pressure is only for active bleeding \u2014 not for clot prevention."
            },
            testTakingTip: "AV fistula = protected arm. NO BP, NO draws, NO IVs. Thrill and bruit each shift.",
            guideSection: "Section 9 \u2014 Priority Nursing Care",
            guideSectionId: "nursing-care"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A 6-year-old with nephrotic syndrome is in remission on a tapering prednisone dose. The parent reports the child's face looks puffy again, there is weight gain of 1 kg over 2 days, and urine dipstick at home shows 3+ protein. What does this most likely indicate?",
            options: [
                { id: "a", text: "Normal response to prednisone taper" },
                { id: "b", text: "A new infection" },
                { id: "c", text: "Nephrotic relapse" },
                { id: "d", text: "Steroid toxicity" }
            ],
            correct: "c",
            rationale: {
                correct: "Return of proteinuria (3+), periorbital edema, and weight gain in a nephrotic child on tapering steroids indicates a RELAPSE. Relapses are common in MCD, particularly during or after taper. The nephrologist will typically increase steroids back up and evaluate for frequent relapser designation.",
                a: "A healthy response would show continued remission.",
                b: "Infection could trigger a relapse but the immediate picture is relapse itself.",
                d: "Steroid toxicity features Cushingoid, HTN, growth suppression \u2014 not proteinuria."
            },
            testTakingTip: "Nephrotic relapse = return of proteinuria, edema, weight gain. Call the nephrologist; don't wait.",
            guideSection: "Section 10 \u2014 Family Education",
            guideSectionId: "family-education"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which pediatric patient is at HIGHEST risk for Hemolytic Uremic Syndrome?",
            options: [
                { id: "a", text: "A teen who had a viral URI 2 weeks ago" },
                { id: "b", text: "A 3-year-old who ate at a family picnic and developed bloody diarrhea 5 days later" },
                { id: "c", text: "A 7-year-old with a strep throat 3 weeks ago" },
                { id: "d", text: "An 18-month-old with a UTI" }
            ],
            correct: "b",
            rationale: {
                correct: "HUS most commonly follows STEC (E. coli O157:H7) infection from contaminated undercooked beef, unpasteurized products, or produce \u2014 with bloody diarrhea as the precursor. Outbreaks are often linked to picnics, petting zoos, or contaminated water. Age <5 is the highest-risk group.",
                a: "Viral URIs don't cause HUS.",
                c: "Strep throat triggers AGN, not HUS.",
                d: "UTI doesn't typically cause HUS."
            },
            testTakingTip: "HUS preceded by bloody diarrhea + young age + food-borne exposure. E. coli O157:H7 is the culprit.",
            guideSection: "Section 5 \u2014 HUS",
            guideSectionId: "hus"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is teaching parents of a child with chronic kidney disease about anemia management with erythropoietin. Which statement indicates correct understanding?",
            options: [
                { id: "a", text: "'This medication will replace my child's kidneys.'" },
                { id: "b", text: "'Erythropoietin helps my child's body make more red blood cells, and we need to give iron too.'" },
                { id: "c", text: "'We only need to give this when my child feels really tired.'" },
                { id: "d", text: "'We should aim for the highest possible hemoglobin to make my child feel the best.'" }
            ],
            correct: "b",
            rationale: {
                correct: "EPO stimulates RBC production; without adequate iron, EPO can't do its job. Most children receive oral or IV iron alongside EPO. Target hemoglobin is 10\u201311 \u2014 too high increases stroke risk.",
                a: "EPO doesn't replace renal function; it only treats anemia.",
                c: "EPO is a scheduled preventive treatment, not PRN.",
                d: "Higher is NOT better; Hgb above 12 increases stroke risk."
            },
            testTakingTip: "EPO + iron = anemia of CKD management. Target Hgb 10\u201311.",
            guideSection: "Section 7 \u2014 CKD",
            guideSectionId: "ckd"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is educating a family about preventing future HUS. Which statement is most appropriate?",
            options: [
                { id: "a", text: "'There's no way to prevent HUS.'" },
                { id: "b", text: "'Always cook ground beef thoroughly, avoid unpasteurized dairy and juice, and wash produce well.'" },
                { id: "c", text: "'Antibiotics before picnics prevent HUS.'" },
                { id: "d", text: "'Vaccines are available for HUS prevention.'" }
            ],
            correct: "b",
            rationale: {
                correct: "Prevention centers on food safety: cooking beef to 160\u00b0F, avoiding unpasteurized dairy and juice, washing produce, good hand hygiene (especially after petting-zoo visits and before eating). These steps dramatically reduce STEC exposure.",
                a: "Prevention IS possible through food safety.",
                c: "Prophylactic antibiotics don't prevent HUS.",
                d: "No HUS vaccine is available."
            },
            testTakingTip: "HUS prevention = food safety: cook beef through, pasteurized products, handwashing.",
            guideSection: "Section 10 \u2014 Family Education",
            guideSectionId: "family-education"
        },
        {
            id: 18,
            type: "single",
            subtype: "priority",
            difficulty: "analysis",
            stem: "A nurse is caring for four pediatric renal patients. Which child requires the MOST urgent assessment?",
            options: [
                { id: "a", text: "A 5-year-old in remission from nephrotic syndrome on a taper" },
                { id: "b", text: "A 4-year-old with HUS who has developed a new-onset seizure" },
                { id: "c", text: "A 9-year-old with AGN whose BP has improved over the last 24 hours" },
                { id: "d", text: "A 12-year-old with CKD scheduled for routine dialysis" }
            ],
            correct: "b",
            rationale: {
                correct: "A new seizure in a child with HUS suggests neurologic involvement (CNS microvascular thrombosis) \u2014 a life-threatening complication. Immediate airway assessment, seizure management, and neurologic evaluation are required.",
                a: "Remission patient on taper is stable.",
                c: "Improving BP in AGN is reassuring.",
                d: "Scheduled dialysis is routine."
            },
            testTakingTip: "New neuro symptoms in HUS = CNS thrombotic event = top priority.",
            guideSection: "Section 5 \u2014 HUS",
            guideSectionId: "hus"
        }
    ]
};
