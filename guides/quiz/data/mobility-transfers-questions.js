/**
 * Mobility and Transfers Quiz - Question Data
 * Questions covering safe patient handling, bed to chair transfers,
 * assistive device fitting and sequencing, stairs, therapeutic positioning,
 * complications of immobility and pressure injury staging.
 */

/* exported mobilityTransfersQuizData */
var mobilityTransfersQuizData = {
    guideName: "Mobility and Transfers",
    guideSlug: "mobility-transfers",
    category: "Fundamentals",
    categoryColor: "#2E86AB",
    estimatedMinutes: 16,
    questions: [
        {
            id: 1,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is preparing to transfer a patient with left-sided weakness from the bed to a chair. Where should the nurse stand, and where should the chair be placed?",
            options: [
                { id: "a", text: "Stand on the right side, place the chair on the left" },
                { id: "b", text: "Stand on the left side, place the chair on the right" },
                { id: "c", text: "Stand on the left side, place the chair on the left" },
                { id: "d", text: "Stand behind the patient, place the chair directly in front" }
            ],
            correct: "b",
            rationale: {
                correct: "The nurse stands on the weaker side, because that is the direction the patient will fall and the side that cannot support them. The chair goes on the stronger side so the patient pivots on the leg that works.",
                a: "This reverses both. The nurse is on the strong side and the patient must pivot toward the weak leg.",
                c: "Standing on the weak side is correct, but the chair on the weak side forces the pivot onto the leg that cannot bear the turn.",
                d: "Standing behind the patient means the nurse cannot control the trunk or lower them safely."
            },
            testTakingTip: "Weak side gets your help. Strong side does the work.",
            guideSection: "Section 04: Bed to chair, in order",
            guideSectionId: "transfers"
        },
        {
            id: 2,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient has been on bed rest for four days and is being transferred to a chair for the first time. Which action should the nurse take before standing the patient?",
            options: [
                { id: "a", text: "Have the patient sit on the edge of the bed with feet on the floor for a few minutes" },
                { id: "b", text: "Raise the head of the bed to 90 degrees and stand the patient immediately" },
                { id: "c", text: "Administer the scheduled antihypertensive first so the pressure is controlled" },
                { id: "d", text: "Have the patient stand quickly so less time is spent upright" }
            ],
            correct: "a",
            rationale: {
                correct: "Bed rest blunts the baroreceptor response, so a patient stood up directly from lying can drop their pressure and fall. Dangling on the edge for one to five minutes lets the response catch up, and it gives the nurse a chance to check for dizziness.",
                b: "Raising the head of the bed is not the same as dangling with the feet dependent.",
                c: "An antihypertensive lowers the pressure further and makes an orthostatic drop more likely.",
                d: "Speed does not prevent an orthostatic drop. It removes the chance to detect one."
            },
            testTakingTip: "Lie, sit, dangle, stand. The dangle is the step the wrong options skip.",
            guideSection: "Section 04: Bed to chair, in order",
            guideSectionId: "transfers"
        },
        {
            id: 3,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a weak right leg is learning to use a cane. Which instruction is correct?",
            options: [
                { id: "a", text: "\"Hold the cane in your right hand and move it with your left leg.\"" },
                { id: "b", text: "\"Hold the cane in your left hand and move it with your right leg.\"" },
                { id: "c", text: "\"Hold the cane in your right hand and move it after both legs.\"" },
                { id: "d", text: "\"Hold the cane in whichever hand feels more comfortable.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The cane goes in the hand opposite the weak leg, and it advances at the same time as that leg. This reproduces the normal opposite-arm-and-leg walking pattern and shifts weight off the weak side.",
                a: "Holding the cane on the weak side gives no offloading and narrows the base of support.",
                c: "Moving the cane after both legs leaves the weak leg unsupported during its step.",
                d: "Comfort does not decide this. The mechanics do, and the wrong hand increases fall risk."
            },
            testTakingTip: "Cane opposite the affected leg, moving with that leg.",
            guideSection: "Section 05: Canes, walkers and crutches",
            guideSectionId: "devices"
        },
        {
            id: 4,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with a fractured left ankle is being taught to climb stairs with crutches. Which instruction is correct?",
            options: [
                { id: "a", text: "\"Lead with your left leg going up, and your right leg going down.\"" },
                { id: "b", text: "\"Lead with your right leg going up, and your crutches and left leg going down.\"" },
                { id: "c", text: "\"Lead with the crutches in both directions.\"" },
                { id: "d", text: "\"Take both legs up together, then bring the crutches.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "Up with the good, down with the bad. Going up, the strong leg lifts the body first. Going down, the crutches and the weak leg go first so the strong leg controls the descent.",
                a: "This reverses the rule and asks the injured ankle to lift the body up a step.",
                c: "Leading with the crutches going up puts the patient behind their support on the lower step.",
                d: "Taking both legs together requires weight bearing on the fractured ankle."
            },
            testTakingTip: "Up with the good, down with the bad. Same rule with any device.",
            guideSection: "Section 05: Canes, walkers and crutches",
            guideSectionId: "devices"
        },
        {
            id: 5,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "A nurse is fitting axillary crutches. Which finding indicates correct fit?",
            options: [
                { id: "a", text: "The pads rest firmly against the axillae so the patient can lean on them" },
                { id: "b", text: "The pads sit 2 to 3 finger widths below the axillae with elbows flexed 20 to 30 degrees" },
                { id: "c", text: "The handgrips are at shoulder height with the elbows straight" },
                { id: "d", text: "The crutch tips are placed directly beneath the shoulders" }
            ],
            correct: "b",
            rationale: {
                correct: "A gap of 2 to 3 finger widths below the axilla keeps weight off the brachial plexus, and 20 to 30 degrees of elbow flexion lets the arms take the load through the hands.",
                a: "Leaning on the pads compresses the nerves and vessels in the axilla and causes hand weakness.",
                c: "Straight elbows leave no capacity to push down, so the arms cannot bear weight.",
                d: "Tips are placed in a tripod, about 6 inches ahead and 6 inches to the side, not directly under the body."
            },
            testTakingTip: "Weight goes through the hands, never through the armpits.",
            guideSection: "Section 05: Canes, walkers and crutches",
            guideSectionId: "devices"
        },
        {
            id: 6,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Halfway to the chair, a patient says the room is spinning and their legs feel heavy. What should the nurse do?",
            options: [
                { id: "a", text: "Encourage the patient to take a few more steps to reach the chair" },
                { id: "b", text: "Lower the patient to the floor or the nearest surface and stay with them" },
                { id: "c", text: "Release the gait belt so the patient can steady themselves on the rail" },
                { id: "d", text: "Leave to get a wheelchair and return quickly" }
            ],
            correct: "b",
            rationale: {
                correct: "When a patient becomes dizzy or weak mid-transfer, they are lowered in a controlled way where they are, with the nurse protecting the head. Fighting a fall injures both people.",
                a: "Pushing on through dizziness is how an uncontrolled fall happens.",
                c: "Letting go removes the only control the nurse has over the descent.",
                d: "Leaving a dizzy standing patient unsupported guarantees an unwitnessed fall."
            },
            testTakingTip: "Do not fight the fall. Guide them down and protect the head.",
            guideSection: "Section 09: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 7,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse must move a dependent 240-pound patient up in bed. Which action is appropriate?",
            options: [
                { id: "a", text: "Lift the patient alone using correct body mechanics" },
                { id: "b", text: "Drag the patient upward by the draw sheet with one other nurse" },
                { id: "c", text: "Use a friction-reducing sheet or mechanical lift with additional staff" },
                { id: "d", text: "Raise the head of the bed and ask the patient to pull on the side rails" }
            ],
            correct: "c",
            rationale: {
                correct: "Manual lifting above roughly 35 pounds of patient weight is unsafe regardless of technique. Friction-reducing devices, mechanical lifts and additional staff are the correct answer.",
                a: "Body mechanics do not raise the safe weight limit, and single-handed lifting injures both people.",
                b: "Dragging creates friction and shear, which tears skin and drives deep tissue injury.",
                d: "Raising the head of the bed makes the patient slide down, and a dependent patient cannot pull themselves up."
            },
            testTakingTip: "Past 35 pounds, the answer is equipment and people, not better form.",
            guideSection: "Section 03: Moving people without wrecking yourself",
            guideSectionId: "body-mechanics"
        },
        {
            id: 8,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse observes a reddened area over a patient's sacrum that does not blanch with light pressure. The skin is intact. What should the nurse do?",
            options: [
                { id: "a", text: "Massage the area to improve circulation" },
                { id: "b", text: "Document a stage 2 pressure injury and apply a hydrocolloid dressing" },
                { id: "c", text: "Reposition the patient off the area and increase the turning schedule" },
                { id: "d", text: "Apply a donut ring to relieve pressure on the sacrum" }
            ],
            correct: "c",
            rationale: {
                correct: "Non-blanchable redness over intact skin is a stage 1 pressure injury. The intervention is to remove pressure from the area and increase repositioning frequency before the tissue breaks down.",
                a: "Massaging over a bony prominence damages already compromised tissue.",
                b: "Stage 2 requires partial thickness skin loss. This skin is intact.",
                d: "Donut rings concentrate pressure in a ring around the area and reduce circulation."
            },
            testTakingTip: "Intact skin plus non-blanchable redness is stage 1. Never massage it.",
            guideSection: "Section 08: Pressure injuries",
            guideSectionId: "skin"
        },
        {
            id: 9,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A sacral wound is covered with thick yellow slough, and the base cannot be seen. How should the nurse document this wound?",
            options: [
                { id: "a", text: "Stage 3 pressure injury" },
                { id: "b", text: "Stage 4 pressure injury" },
                { id: "c", text: "Unstageable pressure injury" },
                { id: "d", text: "Deep tissue pressure injury" }
            ],
            correct: "c",
            rationale: {
                correct: "Staging depends on seeing the deepest visible tissue. When slough or eschar covers the base, the wound is unstageable until it is debrided.",
                a: "Stage 3 requires visible fat, and the base is obscured.",
                b: "Stage 4 requires visible bone, tendon, muscle or cartilage.",
                d: "Deep tissue injury describes intact or blistered skin that is deep red, maroon or purple."
            },
            testTakingTip: "If you cannot see the base, you cannot stage it.",
            guideSection: "Section 08: Pressure injuries",
            guideSectionId: "skin"
        },
        {
            id: 10,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is receiving continuous tube feeding. Which position is most appropriate?",
            options: [
                { id: "a", text: "Supine with the bed completely flat" },
                { id: "b", text: "Head of bed elevated 30 to 45 degrees" },
                { id: "c", text: "Trendelenburg, head lower than the feet" },
                { id: "d", text: "Left lateral with the bed kept flat" }
            ],
            correct: "b",
            rationale: {
                correct: "Elevating the head of the bed 30 to 45 degrees during and after feeding reduces reflux and aspiration, which is the main risk with continuous feeding.",
                a: "Lying flat with feed in the stomach is the highest-risk position for aspiration.",
                c: "Head-down positioning increases reflux and raises intracranial pressure.",
                d: "Left lateral does not address the aspiration risk from a continuous feed."
            },
            testTakingTip: "When aspiration risk and skin protection conflict, aspiration wins.",
            guideSection: "Section 06: Positions, and the problem each one solves",
            guideSectionId: "positioning"
        },
        {
            id: 11,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is repositioning a patient onto their side to relieve pressure. Which technique is correct?",
            options: [
                { id: "a", text: "Full 90-degree side-lying with the patient resting directly on the hip" },
                { id: "b", text: "A 30-degree lateral tilt supported with pillows behind the back" },
                { id: "c", text: "Side-lying with a pillow directly under the knee" },
                { id: "d", text: "Side-lying with the heels resting flat on the mattress" }
            ],
            correct: "b",
            rationale: {
                correct: "A 30-degree tilt keeps weight off the greater trochanter, which is where a true side-lying position concentrates it. Pillows hold the tilt without the patient rolling back.",
                a: "Ninety degrees puts the full body weight onto the trochanter, a common site of breakdown.",
                c: "A pillow directly under the knee compresses the popliteal vessels. Support the calf instead.",
                d: "Heels are floated off the surface entirely, because the heel has no padding over the bone."
            },
            testTakingTip: "Thirty degrees of tilt, calf supported, heels floating.",
            guideSection: "Section 06: Positions, and the problem each one solves",
            guideSectionId: "positioning"
        },
        {
            id: 12,
            type: "single",
            subtype: null,
            difficulty: "analysis",
            stem: "A patient on prolonged bed rest is at risk for multiple complications. Which nursing intervention addresses the greatest number of them?",
            options: [
                { id: "a", text: "Applying compression stockings" },
                { id: "b", text: "Offering a stool softener each morning" },
                { id: "c", text: "Getting the patient up and walking as soon as it is safe" },
                { id: "d", text: "Providing an incentive spirometer at the bedside" }
            ],
            correct: "c",
            rationale: {
                correct: "Ambulation addresses venous stasis, lung expansion, gut motility, skin pressure, bone loss, muscle strength and mood at the same time. No single passive measure comes close.",
                a: "Compression helps venous return only.",
                b: "A softener addresses constipation only.",
                d: "The spirometer helps the lungs, and it only works if the patient uses it."
            },
            testTakingTip: "Early ambulation is the answer that fixes seven systems at once.",
            guideSection: "Section 07: What immobility does, system by system",
            guideSectionId: "immobility"
        },
        {
            id: 13,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient is learning to use a standard walker. Which observation indicates the patient needs further teaching?",
            options: [
                { id: "a", text: "The patient stands inside the frame with the walker just ahead" },
                { id: "b", text: "The patient moves the walker, then the weak leg, then the strong leg" },
                { id: "c", text: "The patient pulls up on the walker to rise from the chair" },
                { id: "d", text: "The patient keeps all four points on the floor before stepping" }
            ],
            correct: "c",
            rationale: {
                correct: "Pulling up on a walker tips it forward and is a common cause of falls. The patient pushes up from the chair arms, then reaches for the walker once standing.",
                a: "Standing inside the frame keeps the centre of gravity within the base of support.",
                b: "Walker, weak leg, strong leg is the correct sequence.",
                d: "All four points down before weight bearing is correct technique."
            },
            testTakingTip: "Push from the chair, never pull on the walker.",
            guideSection: "Section 05: Canes, walkers and crutches",
            guideSectionId: "devices"
        },
        {
            id: 14,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "Three days after a posterior total hip replacement, a patient reports sudden severe hip pain. The affected leg appears shorter and is rotated outward. What should the nurse do FIRST?",
            options: [
                { id: "a", text: "Reposition the leg into alignment and apply an abduction pillow" },
                { id: "b", text: "Keep the patient still, maintain alignment as found, and notify the provider" },
                { id: "c", text: "Assist the patient to ambulate to assess whether the pain resolves" },
                { id: "d", text: "Administer the ordered analgesic and reassess in an hour" }
            ],
            correct: "b",
            rationale: {
                correct: "Sudden severe pain with a shortened, externally rotated leg indicates prosthetic dislocation. The patient is kept still and the provider is notified immediately for reduction.",
                a: "Attempting to reposition a dislocated prosthesis can damage nerves and vessels.",
                c: "Weight bearing on a dislocated hip causes further injury.",
                d: "Medicating a dislocation delays reduction and does not address the problem."
            },
            testTakingTip: "Shortened and externally rotated after hip replacement means dislocation, so stop and call.",
            guideSection: "Section 09: What you do first",
            guideSectionId: "interventions"
        },
        {
            id: 15,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A nurse is applying a gait belt. Which situation makes a gait belt inappropriate?",
            options: [
                { id: "a", text: "A patient with generalized weakness after pneumonia" },
                { id: "b", text: "A patient two days after abdominal surgery with a fresh midline incision" },
                { id: "c", text: "A patient with a walker learning to ambulate" },
                { id: "d", text: "A patient with mild unsteadiness from a new antihypertensive" }
            ],
            correct: "b",
            rationale: {
                correct: "A gait belt is not applied over a fresh abdominal incision, a feeding tube, an ostomy or fractured ribs. Other transfer methods and equipment are used instead.",
                a: "General weakness is exactly what a gait belt is for.",
                c: "A gait belt is appropriate and recommended alongside a walker.",
                d: "New medication unsteadiness is a good reason to use a belt."
            },
            testTakingTip: "Nothing goes across a fresh abdominal incision, an ostomy or a feeding tube.",
            guideSection: "Section 03: Moving people without wrecking yourself",
            guideSectionId: "body-mechanics"
        },
        {
            id: 16,
            type: "single",
            subtype: null,
            difficulty: "knowledge",
            stem: "Which position is most appropriate for administering an enema?",
            options: [
                { id: "a", text: "High Fowler" },
                { id: "b", text: "Prone" },
                { id: "c", text: "Left Sims" },
                { id: "d", text: "Trendelenburg" }
            ],
            correct: "c",
            rationale: {
                correct: "Left Sims is semi-prone on the left side with the upper knee flexed. It follows the natural curve of the sigmoid colon so the solution flows in and is retained.",
                a: "Sitting upright causes the solution to run straight back out.",
                b: "Prone gives no access and no anatomic advantage.",
                d: "Head-down positioning is used for central line insertion and air embolism, not for enemas."
            },
            testTakingTip: "Left Sims follows the sigmoid colon. That is why it is the left side, not the right.",
            guideSection: "Section 06: Positions, and the problem each one solves",
            guideSectionId: "positioning"
        },
        {
            id: 17,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient who sits in a chair for most of the day has a Braden score of 14. Which repositioning plan is appropriate?",
            options: [
                { id: "a", text: "Reposition every 4 hours while in the chair" },
                { id: "b", text: "Reposition every hour, and encourage weight shifts every 15 minutes" },
                { id: "c", text: "Reposition only when the patient reports discomfort" },
                { id: "d", text: "Keep the patient in bed instead, turning every 2 hours" }
            ],
            correct: "b",
            rationale: {
                correct: "Sitting concentrates pressure over the ischial tuberosities, so a chair-bound patient is repositioned at least hourly, with small weight shifts every 15 minutes if they are able. A Braden score of 14 confirms meaningful risk.",
                a: "Four hours is far too long in a chair, where pressure is more concentrated than in bed.",
                c: "Waiting for discomfort misses patients with reduced sensation, who are the highest risk.",
                d: "Keeping a patient in bed to protect the skin trades one set of immobility complications for another."
            },
            testTakingTip: "Every 2 hours in bed, every hour in a chair. Chairs are worse, not better.",
            guideSection: "Section 08: Pressure injuries",
            guideSectionId: "skin"
        },
        {
            id: 18,
            type: "single",
            subtype: null,
            difficulty: "application",
            stem: "A patient with left hemiparesis after a stroke is being taught to dress. Which instruction is correct?",
            options: [
                { id: "a", text: "\"Put the right arm in the sleeve first, then the left.\"" },
                { id: "b", text: "\"Put the left arm in the sleeve first, then the right.\"" },
                { id: "c", text: "\"Have someone else dress the affected side each time.\"" },
                { id: "d", text: "\"Wear only garments that pull over the head.\"" }
            ],
            correct: "b",
            rationale: {
                correct: "The affected side goes into clothing first and comes out last. Dressing the weak arm while the garment is still loose avoids forcing the joint and preserves independence.",
                a: "Dressing the strong side first leaves no room to work the weak arm into the sleeve.",
                c: "Doing it for the patient removes an achievable task and slows rehabilitation.",
                d: "Overhead garments are often harder with hemiparesis than a front-opening shirt."
            },
            testTakingTip: "Affected side in first, out last. The same logic as leading with the weak leg downstairs.",
            guideSection: "Section 09: What you do first",
            guideSectionId: "interventions"
        }
    ]
};
