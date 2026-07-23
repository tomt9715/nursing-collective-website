// Heart Failure Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'How the heart fails' },
        { id: 'left-vs-right', icon: 'fa-columns', title: 'Left or right' },
        { id: 'systolic-diastolic', icon: 'fa-heartbeat', title: 'Squeeze or fill' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment, in order' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'medications', icon: 'fa-pills', title: 'Meds and potassium' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '55-70%', label: 'Normal EF' },
        { type: 'critical', icon: 'fa-arrow-down', value: '<40%', label: 'HFrEF, cannot squeeze' },
        { type: 'info', icon: 'fa-arrow-up', value: '>=50%', label: 'HFpEF, cannot fill' },
        { type: 'warning', icon: 'fa-weight', value: '>2 lbs/day', label: 'Report weight gain' },
        { type: 'target', icon: 'fa-tint', value: '100 pg/mL', label: 'BNP threshold' },
        { type: 'critical', icon: 'fa-ban', value: '<60 bpm', label: 'Hold digoxin if HR' }
    ],
    clinicalPearls: [
        { id: 'tip-left-lungs', title: 'Left = Lungs', text: 'Left equals lungs. Right equals rest of the body. Two words and the scenario sorts itself.' },
        { id: 'tip-normal-ef', title: 'Normal EF Trap', text: 'Ejection fraction is a percentage, not a volume. Normal EF plus real symptoms equals HFpEF.' },
        { id: 'tip-daily-weights', title: 'Daily Weights', text: 'Same time, same scale, same clothing. Change the conditions and the number means nothing.' },
        { id: 'tip-lmnop', title: 'LMNOP for Acute HF', text: 'LMNOP spells a word, it does not rank them. Position and oxygen usually come first; neither needs an order.' },
        { id: 'tip-prevent-valsalva', title: 'Prevent Valsalva', text: 'Straining drops cardiac output and a failing heart has no reserve. Stool softeners go in before constipation happens.' },
        { id: 'tip-watch-potassium', title: 'Watch Potassium', text: 'Loops drop it. ACE inhibitors, ARBs and aldosterone antagonists raise it. Low potassium makes a therapeutic digoxin level toxic.' }
    ]
};
