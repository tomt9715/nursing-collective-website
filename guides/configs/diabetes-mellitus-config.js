// Diabetes Mellitus Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Type 1 or Type 2' },
        { id: 'assessment', icon: 'fa-vial', title: 'The numbers that diagnose it' },
        { id: 'acute-complications', icon: 'fa-exclamation-triangle', title: 'DKA or HHS' },
        { id: 'hypoglycemia', icon: 'fa-exclamation-circle', title: 'When it goes the other way' },
        { id: 'insulin-therapy', icon: 'fa-syringe', title: 'Onset, peak, duration' },
        { id: 'oral-agents', icon: 'fa-pills', title: 'Which drugs drop you' },
        { id: 'chronic-complications', icon: 'fa-heartbeat', title: 'What the sugar breaks' },
        { id: 'nursing-management', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Children are not small adults' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-tint', value: '>=126', label: 'Fasting glucose diagnoses' },
        { type: 'critical', icon: 'fa-percentage', value: '>=6.5%', label: 'HbA1c diagnoses' },
        { type: 'target', icon: 'fa-bullseye', value: '<7%', label: 'HbA1c goal, most adults' },
        { type: 'warning', icon: 'fa-arrow-down', value: '<70', label: 'Hypoglycemia' },
        { type: 'info', icon: 'fa-bolt', value: '250-600', label: 'Glucose in DKA' },
        { type: 'critical', icon: 'fa-tint-slash', value: '>600', label: 'Glucose in HHS' }
    ],
    clinicalPearls: [
        { id: 'tip-type1-vs-type2', title: 'No Keys or Rusty Locks', text: 'Type 1 has no keys, so you supply them. Type 2 has rusty locks, so you oil them, make more keys, or supply keys later.' },
        { id: 'tip-dka-vs-hhs', title: 'DKA vs HHS', text: 'DKA has ketones because there is no insulin at all. HHS has none because a little remains. Acid problem versus water problem.' },
        { id: 'tip-insulin-safety', title: 'Peak Is When They Go Low', text: 'Rapid peaks at 1 to 2 hours, NPH at 4 to 12, long-acting not at all. Match food to the peak.' },
        { id: 'tip-metformin-first', title: 'Metformin First', text: 'No hypoglycemia alone, weight neutral, cardiovascular benefit. Held for contrast dye, avoided below eGFR 30.' },
        { id: 'tip-rule-of-15', title: 'Rule of 15', text: '15 g of fast carbohydrate, wait 15 minutes, recheck. If they cannot swallow safely, IV D50 or IM glucagon instead.' },
        { id: 'tip-foot-care', title: 'Foot Care Is Limb Care', text: 'Numb feet plus poor circulation means an unnoticed blister becomes an amputation. Daily inspection, never barefoot.' },
        { id: 'tip-sick-day', title: 'Sick Means More Insulin, Not Less', text: 'Stress hormones raise glucose whether or not they eat. Check glucose every 4 hours, ketones above 240.' },
        { id: 'tip-peds-dka', title: 'Cerebral Edema in Pediatric DKA', text: 'Correct no faster than 50 to 75 mg/dL an hour. Headache, falling consciousness, bradycardia and hypertension is the warning.' }
    ]
};
