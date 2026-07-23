// Hypertension Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'overview', icon: 'fa-heartbeat', title: 'What the number is made of' },
        { id: 'classification', icon: 'fa-chart-bar', title: 'Where the number lands' },
        { id: 'types', icon: 'fa-code-branch', title: 'Primary or secondary' },
        { id: 'complications', icon: 'fa-exclamation-circle', title: 'What the pressure breaks' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment, in order' },
        { id: 'lifestyle', icon: 'fa-apple-alt', title: 'Lowering it without a drug' },
        { id: 'medications', icon: 'fa-pills', title: 'The drugs, and what they cost' },
        { id: 'crisis', icon: 'fa-bolt', title: 'Urgency or emergency' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'success', icon: 'fa-check', value: '<120/80', label: 'Normal' },
        { type: 'warning', icon: 'fa-arrow-up', value: '130-139/80-89', label: 'Stage 1' },
        { type: 'critical', icon: 'fa-exclamation-triangle', value: '>=140/90', label: 'Stage 2' },
        { type: 'critical', icon: 'fa-bolt', value: '>180/120', label: 'Hypertensive crisis' },
        { type: 'target', icon: 'fa-utensils', value: '<2,300 mg', label: 'Daily sodium limit' },
        { type: 'info', icon: 'fa-percentage', value: '25% MAP', label: 'Max drop in hour one' }
    ],
    clinicalPearls: [
        { id: 'tip-bp-equation', title: 'BP = CO x SVR', text: 'Two levers, and every drug pulls one. When a pressure will not come down, ask which lever is untreated.' },
        { id: 'tip-classify-higher', title: 'Classify by the Higher Number', text: 'When systolic and diastolic sit in different stages, the worse one names the stage. 145/82 is Stage 2.' },
        { id: 'tip-secondary-clues', title: 'Secondary HTN Red Flags', text: 'Young, sudden, resistant to three drugs, or hypokalemic with no diuretic. Look for a cause, not a fifth drug.' },
        { id: 'tip-lifestyle-priority', title: 'Lifestyle First', text: 'Combined changes are worth over 20 mmHg systolic. For low-risk Stage 1, lifestyle alone comes first for 3 to 6 months.' },
        { id: 'tip-ace-cough', title: 'The ACE Inhibitor Cough', text: 'Dry, bradykinin-driven, in 10 to 20 percent. Switch to an ARB; do not add a cough suppressant.' },
        { id: 'tip-dont-drop-fast', title: 'Slow and Steady', text: 'Organs adapted to the high pressure. No more than 25 percent off the MAP in hour one, except in aortic dissection.' }
    ]
};
