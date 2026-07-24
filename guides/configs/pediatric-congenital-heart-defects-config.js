// Pediatric Congenital Heart Defects Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'increased-flow', icon: 'fa-arrow-up', title: 'Increased pulmonary flow' },
        { id: 'obstructive', icon: 'fa-compress-arrows-alt', title: 'Obstruction' },
        { id: 'tof', icon: 'fa-heart-broken', title: 'Tetralogy of Fallot' },
        { id: 'tet-spells', icon: 'fa-exclamation-triangle', title: 'The tet spell' },
        { id: 'right-heart-failure', icon: 'fa-weight', title: 'Heart failure in the infant' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing care' },
        { id: 'family-education', icon: 'fa-users', title: 'Family education' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-child', value: 'Knee-chest', label: 'Tet spell, first action', section: 'tet-spells' },
        { type: 'critical', icon: 'fa-ban', value: '<90-110', label: 'Hold digoxin, infant HR', section: 'medications' },
        { type: 'target', icon: 'fa-flask', value: '0.8-2.0', label: 'Digoxin ng/mL', section: 'medications' },
        { type: 'info', icon: 'fa-lungs', value: '75-85%', label: 'Baseline SpO2, cyanotic', section: 'nursing-care' },
        { type: 'warning', icon: 'fa-heartbeat', value: '>20 mmHg', label: 'Arm-leg gap, coarctation', section: 'obstructive' },
        { type: 'target', icon: 'fa-utensils', value: '20-30 min', label: 'Feed limit', section: 'right-heart-failure' }
    ],
    clinicalPearls: [
        { id: 'tip-feeding-cardiac', title: 'Diaphoresis With Feeds', text: 'A baby who sweats while feeding is working too hard to eat. Feeding is the infant exercise.' },
        { id: 'tip-squatting', title: 'Why Toddlers Squat', text: 'Squatting raises systemic resistance and forces blood to the lungs. Same idea as knee-to-chest.' },
        { id: 'tip-knee-chest', title: 'Knee-To-Chest First', text: 'It needs no order and no equipment. It raises resistance and sends blood to the lungs in seconds.' },
        { id: 'tip-digoxin-potassium', title: 'Digoxin + Furosemide Trap', text: 'Furosemide lowers potassium. Low potassium makes digoxin toxic. Watch the potassium.' }
    ]
};
