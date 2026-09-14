/**
 * IV Medications Quiz - Question Data
 * Questions covering high-alert IV drugs, site and systemic complications,
 * fluid tonicity, vascular access, safe administration, transfusion, and rate math.
 */

/* exported ivMedicationsQuizData */
var ivMedicationsQuizData = {
    guideName: "IV Medications",
    guideSlug: "iv-medications",
    category: "Pharmacology",
    categoryColor: "#2fa866",
    estimatedMinutes: 15,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A prescriber writes an order for 20 mEq of potassium chloride IV push for a patient with a potassium of 2.9 mEq/L. What should the nurse do?",
            options: [
                { id: "a", text: "Give the push slowly over 5 minutes with the patient on a cardiac monitor" },
                { id: "b", text: "Hold the order, contact the prescriber, and clarify a diluted infusion" },
                { id: "c", text: "Dilute the dose in 10 mL of saline and push it over 2 minutes" },
                { id: "d", text: "Give the dose through a central line since the vein is larger" }
            ],
            correct: "b",
            rationale: {
                correct: "Concentrated potassium is never given by IV push by any route or at any speed. The nurse holds the order and clarifies it. Potassium must be diluted and infused on a pump, usually no faster than 10 mEq per hour.",
                a: "Slowing a push does not make it safe. There is no acceptable IV push of concentrated potassium.",
                c: "Diluting into a syringe and pushing is still a push. It has caused fatal arrest.",
                d: "A central line changes the concentration that is tolerated, not the route. Push is still prohibited."
            },
            testTakingTip: "Any answer that pushes potassium is wrong before you finish reading it.",
            guideSection: "Section 3 - High-alert medications",
            guideSectionId: "high-alert"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Two nurses are performing an independent double check on a heparin infusion. Which action shows the check was done correctly?",
            options: [
                { id: "a", text: "The first nurse reads the pump settings aloud while the second nurse confirms them" },
                { id: "b", text: "The second nurse verifies the order, concentration, dose and pump settings on her own, then they compare" },
                { id: "c", text: "The second nurse signs the record after watching the first nurse program the pump" },
                { id: "d", text: "Both nurses review the medication record together at the nurses station" }
            ],
            correct: "b",
            rationale: {
                correct: "Independent means each nurse verifies separately and only then compares findings. Hearing the expected answer first destroys the value of the check.",
                a: "Reading numbers aloud primes the second nurse to agree. That is a shared check, not an independent one.",
                c: "Watching is not verifying. The second nurse has done no separate calculation.",
                d: "The check must include the actual pump and the actual bag at the bedside, not just the record."
            },
            testTakingTip: "Independent means separately, then compare. If one nurse hears the answer first, it does not count.",
            guideSection: "Section 3 - High-alert medications",
            guideSectionId: "high-alert"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A patient needs a continuous IV insulin infusion. Which insulin is appropriate?",
            options: [
                { id: "a", text: "NPH insulin" },
                { id: "b", text: "Insulin glargine" },
                { id: "c", text: "Regular insulin" },
                { id: "d", text: "Insulin lispro mixed 75/25" }
            ],
            correct: "c",
            rationale: {
                correct: "Regular insulin is the only insulin given intravenously. It is also a high-alert medication, so the infusion gets an independent double check.",
                a: "NPH is an intermediate-acting suspension. It is cloudy and is never given IV.",
                b: "Glargine is long-acting and subcutaneous only. Giving it IV would be a serious error.",
                d: "Premixed suspensions are subcutaneous only."
            },
            testTakingTip: "Regular is the only insulin that goes IV. Cloudy insulin never goes IV.",
            guideSection: "Section 3 - High-alert medications",
            guideSectionId: "high-alert"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient in diabetic ketoacidosis has a potassium of 3.1 mEq/L. Fluids are running. The insulin infusion is prescribed. What should the nurse do?",
            options: [
                { id: "a", text: "Start the insulin infusion and recheck potassium in 4 hours" },
                { id: "b", text: "Hold the insulin, give the prescribed potassium, and recheck the level" },
                { id: "c", text: "Start the insulin infusion at half the ordered rate" },
                { id: "d", text: "Give a bolus of regular insulin subcutaneously instead" }
            ],
            correct: "b",
            rationale: {
                correct: "Insulin drives potassium into the cells, so a level under 3.3 mEq/L must be corrected first. Hold the insulin, replace potassium, and recheck before starting the infusion.",
                a: "Starting insulin at 3.1 will drop the potassium further and can cause arrhythmia and arrest.",
                c: "A lower rate still shifts potassium into cells. The level, not the rate, is the problem.",
                d: "Changing the route does not change the effect on potassium, and it delays effective treatment."
            },
            testTakingTip: "Potassium under 3.3 means replace first, insulin second. Fluids, then potassium, then insulin.",
            guideSection: "Section 3 - High-alert medications",
            guideSectionId: "high-alert"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient receiving a norepinephrine infusion through a peripheral IV reports burning at the site. The area is swollen and pale. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Flush the catheter with saline to test patency" },
                { id: "b", text: "Remove the catheter and apply a warm compress" },
                { id: "c", text: "Stop the infusion and aspirate residual drug from the catheter" },
                { id: "d", text: "Slow the infusion and continue to monitor the site" }
            ],
            correct: "c",
            rationale: {
                correct: "Norepinephrine is a vesicant, so this is an extravasation. Stop the infusion, disconnect the tubing, leave the catheter in place, and aspirate residual drug before removing it. Then notify the provider immediately because antidotes are time sensitive.",
                a: "Flushing pushes more vesicant into the tissue and enlarges the injury.",
                b: "Removing the catheter first loses the chance to aspirate drug. Compress choice comes later and depends on the agent.",
                d: "Continuing a vesicant into tissue causes necrosis. This is not something you monitor."
            },
            testTakingTip: "Vesicant in tissue means stop, aspirate, do not flush, escalate now.",
            guideSection: "Section 4 - When the line goes wrong",
            guideSectionId: "complications"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "The nurse finds redness tracking along the vein above an IV site, with warmth, tenderness and a palpable cord. Swelling is minimal. This is:",
            options: [
                { id: "a", text: "Infiltration" },
                { id: "b", text: "Phlebitis" },
                { id: "c", text: "Extravasation" },
                { id: "d", text: "Air embolism" }
            ],
            correct: "b",
            rationale: {
                correct: "A red streak that follows the vein, with warmth and a palpable cord, is phlebitis. Discontinue the line, restart in a different site, and apply a warm compress.",
                a: "Infiltration gives cool, pale, taut swelling with no red streak and no blood return.",
                c: "Extravasation is a vesicant in the tissue. It burns and blisters rather than tracking as a warm cord.",
                d: "Air embolism is systemic: sudden dyspnea, chest pain and hypotension, not a local finding."
            },
            testTakingTip: "Red warm cord means phlebitis. Cool puffy skin means infiltration.",
            guideSection: "Section 4 - When the line goes wrong",
            guideSectionId: "complications"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "During a central line tubing change the patient suddenly becomes dyspneic, hypotensive and confused. After clamping the line, how should the nurse position the patient?",
            options: [
                { id: "a", text: "High Fowler with the legs dependent" },
                { id: "b", text: "Right side lying with the head elevated" },
                { id: "c", text: "Left side lying with the head down" },
                { id: "d", text: "Prone with the head turned to one side" }
            ],
            correct: "c",
            rationale: {
                correct: "These findings suggest air embolism. Clamp the line, then place the patient in left lateral Trendelenburg so air is trapped at the apex of the right ventricle and away from the pulmonary outflow. Give oxygen and notify the provider.",
                a: "Sitting the patient up moves air toward the outflow tract and the brain.",
                b: "Right side lying encourages air to travel into the pulmonary artery.",
                d: "Prone positioning does nothing for the trapped air and impairs assessment."
            },
            testTakingTip: "Air embolism: clamp, left side, head down, oxygen, call.",
            guideSection: "Section 4 - When the line goes wrong",
            guideSectionId: "complications"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "An older adult receiving IV fluids develops crackles, dyspnea, distended neck veins and a bounding pulse. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Clamp the IV line completely and remove the catheter" },
                { id: "b", text: "Slow the infusion to keep-vein-open and raise the head of the bed" },
                { id: "c", text: "Increase the infusion rate to improve renal perfusion" },
                { id: "d", text: "Place the patient flat in bed to improve venous return" }
            ],
            correct: "b",
            rationale: {
                correct: "This is circulatory overload. Slow the infusion rather than clamping it shut, because the access is needed for a diuretic. Sit the patient up, give oxygen, and notify the provider.",
                a: "Removing the access leaves no route for the diuretic that is about to be ordered.",
                c: "More volume worsens the overload directly.",
                d: "Lying flat increases venous return to a heart already overwhelmed and worsens dyspnea."
            },
            testTakingTip: "Overload is the exception to clamping shut. Slow it to keep-vein-open and sit them up.",
            guideSection: "Section 10 - What you do first",
            guideSectionId: "priority"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient with a traumatic brain injury has an order for 0.45 percent sodium chloride at 100 mL/hr. What is the nurse's best action?",
            options: [
                { id: "a", text: "Start the infusion and monitor neurologic status hourly" },
                { id: "b", text: "Start the infusion but run it at half the ordered rate" },
                { id: "c", text: "Hold the fluid and contact the prescriber to clarify the order" },
                { id: "d", text: "Change the fluid to dextrose 5 percent in water" }
            ],
            correct: "c",
            rationale: {
                correct: "Hypotonic fluid moves water into cells and worsens cerebral edema. This order should be clarified before anything is infused in a head-injured patient.",
                a: "Monitoring does not prevent the swelling that hypotonic fluid causes.",
                b: "A slower rate still delivers free water to the brain.",
                d: "Dextrose 5 percent in water behaves as free water once the dextrose is metabolized, so it has the same problem. Nurses also do not change the fluid without an order."
            },
            testTakingTip: "Hypotonic fluid plus a brain injury is the planted wrong answer.",
            guideSection: "Section 5 - Which fluid, and why",
            guideSectionId: "fluids"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with chronic kidney disease and a potassium of 5.8 mEq/L needs volume resuscitation. Which fluid should the nurse question?",
            options: [
                { id: "a", text: "0.9 percent sodium chloride" },
                { id: "b", text: "Lactated Ringers" },
                { id: "c", text: "0.45 percent sodium chloride" },
                { id: "d", text: "3 percent sodium chloride" }
            ],
            correct: "b",
            rationale: {
                correct: "Lactated Ringers contains potassium, so it is questioned in renal failure and hyperkalemia. Normal saline is the safer isotonic choice here.",
                a: "Normal saline is isotonic, potassium free, and appropriate for volume resuscitation.",
                c: "Hypotonic fluid is a poor resuscitation choice, but the potassium issue in this patient is specific to lactated Ringers.",
                d: "Hypertonic saline is reserved for symptomatic hyponatremia and cerebral edema, not routine volume replacement."
            },
            testTakingTip: "Lactated Ringers carries potassium and needs a working liver for the lactate.",
            guideSection: "Section 5 - Which fluid, and why",
            guideSectionId: "fluids"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which solution may be infused with packed red blood cells?",
            options: [
                { id: "a", text: "Dextrose 5 percent in water" },
                { id: "b", text: "Lactated Ringers" },
                { id: "c", text: "0.9 percent sodium chloride" },
                { id: "d", text: "0.45 percent sodium chloride" }
            ],
            correct: "c",
            rationale: {
                correct: "Normal saline is the only solution compatible with blood products. Blood tubing with an in-line filter is primed with it before the unit is hung.",
                a: "Dextrose solutions lyse red cells.",
                b: "Lactated Ringers contains calcium, which can cause the unit to clot.",
                d: "Hypotonic saline also causes hemolysis and is never used with blood."
            },
            testTakingTip: "Blood goes with normal saline only, and no drug is ever added to the unit.",
            guideSection: "Section 8 - Blood, the short version",
            guideSectionId: "transfusion"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Ten minutes into a transfusion the patient develops fever, chills and flank pain. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Notify the provider and the blood bank of the reaction" },
                { id: "b", text: "Stop the transfusion and infuse normal saline through new tubing" },
                { id: "c", text: "Take a full set of vital signs and reassess in 5 minutes" },
                { id: "d", text: "Slow the transfusion and give the prescribed antipyretic" }
            ],
            correct: "b",
            rationale: {
                correct: "Stopping the blood is always the first action. Keep the vein open with normal saline through new tubing so the old tubing, which still holds reacting blood, is not flushed into the patient. Then notify and send the bag and samples back.",
                a: "Notification matters, but the blood must stop first.",
                c: "Assessing while the reacting blood continues to infuse worsens the reaction.",
                d: "Slowing is not stopping, and treating the fever leaves the cause running."
            },
            testTakingTip: "Stop, save the line with saline through new tubing, call, send it back.",
            guideSection: "Section 8 - Blood, the short version",
            guideSectionId: "transfusion"
        },
        {
            id: 13,
            type: "sata",
            subtype: null,
            difficulty: "application",
            stem: "Which situations require central rather than peripheral venous access? (Select all that apply.)",
            options: [
                { id: "a", text: "Total parenteral nutrition" },
                { id: "b", text: "A single dose of IV acetaminophen" },
                { id: "c", text: "A continuous norepinephrine infusion" },
                { id: "d", text: "Six weeks of IV antibiotics" },
                { id: "e", text: "A solution with a pH of 3" },
                { id: "f", text: "A 1 litre bolus of normal saline" }
            ],
            correct: ["a", "c", "d", "e"],
            rationale: {
                correct: "Parenteral nutrition, vesicants such as vasopressors, long duration therapy, and extreme pH or osmolarity all require central access. Any one of those four is enough on its own.",
                a: "Correct. The osmolarity of parenteral nutrition destroys peripheral veins.",
                b: "A single non-irritating dose is fine peripherally.",
                c: "Correct. Norepinephrine is a vesicant and causes tissue necrosis if it extravasates.",
                d: "Correct. Weeks of therapy exhaust peripheral sites.",
                e: "Correct. A pH under 5 or over 9 is an irritant to small veins.",
                f: "Isotonic saline is well tolerated peripherally."
            },
            testTakingTip: "Vesicant, nutrition, duration, extreme pH. Any one sends you central.",
            guideSection: "Section 6 - Peripheral or central",
            guideSectionId: "access"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "The nurse is flushing a PICC line. Which syringe should be used?",
            options: [
                { id: "a", text: "A 3 mL syringe, to control the volume precisely" },
                { id: "b", text: "A 5 mL syringe, to limit the flush volume" },
                { id: "c", text: "A 10 mL syringe or larger" },
                { id: "d", text: "Any syringe, since size does not affect the catheter" }
            ],
            correct: "c",
            rationale: {
                correct: "Small syringes generate high pressure inside the catheter and can rupture it. A 10 mL syringe or larger is the standard for central lines.",
                a: "A 3 mL syringe generates the highest pressure of the options listed.",
                b: "Still below the safe threshold for a central catheter.",
                d: "Syringe diameter directly determines the pressure delivered at a given force."
            },
            testTakingTip: "Smaller barrel means higher pressure. Central lines get 10 mL or bigger.",
            guideSection: "Section 6 - Peripheral or central",
            guideSectionId: "access"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is prescribed furosemide 80 mg IV push. What is the nurse's priority consideration?",
            options: [
                { id: "a", text: "Give it over at least 4 minutes to protect hearing" },
                { id: "b", text: "Give it rapidly so diuresis begins sooner" },
                { id: "c", text: "Dilute it in dextrose and infuse over 1 hour" },
                { id: "d", text: "Hold it until the potassium is above 5.5 mEq/L" }
            ],
            correct: "a",
            rationale: {
                correct: "Furosemide is given no faster than 20 mg per minute. At 80 mg that is at least 4 minutes. Rapid administration causes ototoxicity that can be permanent.",
                b: "Speed is exactly what causes hearing loss with this drug.",
                c: "An hour-long dextrose infusion is not the standard for an ordered IV push, and it delays a needed diuresis.",
                d: "Furosemide lowers potassium. A level above 5.5 is not a reason to hold it."
            },
            testTakingTip: "Furosemide at 20 mg per minute. Rushing it costs hearing.",
            guideSection: "Section 7 - Giving it safely",
            guideSectionId: "administration"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "The nurse notices white crystals forming in the tubing after connecting a second medication to a running line. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Increase the rate to clear the crystals from the tubing" },
                { id: "b", text: "Stop the infusion and keep the solution out of the patient" },
                { id: "c", text: "Flush the line with dextrose 5 percent in water" },
                { id: "d", text: "Document the finding and continue monitoring the line" }
            ],
            correct: "b",
            rationale: {
                correct: "Crystals mean an incompatibility and a precipitate. Stop immediately. Precipitate that reaches the circulation can embolize. Compatibility is checked before connecting, not after.",
                a: "Increasing the rate delivers the precipitate faster.",
                c: "Flushing pushes the precipitate into the patient, and dextrose worsens several incompatibilities.",
                d: "Continuing an incompatible infusion is unsafe regardless of documentation."
            },
            testTakingTip: "Cloudiness, colour change, gas or crystals means stop and do not infuse.",
            guideSection: "Section 7 - Giving it safely",
            guideSectionId: "administration"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "An order reads 1000 mL of normal saline over 8 hours by gravity. The tubing drop factor is 15 gtt/mL. What rate should the nurse set?",
            options: [
                { id: "a", text: "21 gtt/min" },
                { id: "b", text: "31 gtt/min" },
                { id: "c", text: "63 gtt/min" },
                { id: "d", text: "125 gtt/min" }
            ],
            correct: "b",
            rationale: {
                correct: "Volume times drop factor divided by time in minutes. 1000 times 15 is 15,000, divided by 480 minutes is 31.25, so set 31 gtt/min.",
                a: "This is the result of using a 10 gtt/mL drop factor instead of 15.",
                c: "This doubles the correct answer, which happens when 4 hours is used instead of 8.",
                d: "125 is the mL per hour rate for a pump, not drops per minute."
            },
            testTakingTip: "Convert hours to minutes before you divide. 8 hours is 480, not 8.",
            guideSection: "Section 9 - Rate math you cannot fumble",
            guideSectionId: "calculations"
        }
    ]
};
