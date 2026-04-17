// Pediatric Congenital Heart Defects Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fetal-circulation', icon: 'fa-heart', title: 'Fetal Circulation' },
        { id: 'classification', icon: 'fa-sitemap', title: 'Classification' },
        { id: 'increased-flow', icon: 'fa-arrow-up', title: 'Increased Flow Defects' },
        { id: 'decreased-flow', icon: 'fa-arrow-down', title: 'Decreased Flow Defects' },
        { id: 'tof', icon: 'fa-heart-broken', title: 'Tetralogy of Fallot' },
        { id: 'tet-spells', icon: 'fa-exclamation-triangle', title: 'Tet Spells' },
        { id: 'obstructive', icon: 'fa-compress-arrows-alt', title: 'Obstructive Defects' },
        { id: 'right-heart-failure', icon: 'fa-weight', title: 'Right Heart Failure' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing Care' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' },
        { id: 'family-education', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-exclamation-triangle', value: 'Knee-Chest', label: 'Tet Spell · 1st Action' },
        { type: 'target', icon: 'fa-heartbeat', value: '>90-110', label: 'Hold Dig (Infant HR)' },
        { type: 'target', icon: 'fa-flask', value: '0.8-2.0', label: 'Dig Level ng/mL' },
        { type: 'time', icon: 'fa-utensils', value: '20-30 min', label: 'Max Feed Time' },
        { type: 'success', icon: 'fa-weight', value: '15-30 g', label: 'Target Weight/Day' },
        { type: 'critical', icon: 'fa-lungs', value: 'Apnea', label: 'PGE1 Watch' }
    ],
    clinicalPearls: [
        { id: 'tip-transition', title: 'Honeymoon Period', text: 'Newborns often look fine for 24-48 hrs before CHD shows.' },
        { id: 'tip-squatting', title: 'Why Toddlers Squat', text: 'Squatting raises SVR, forces blood to the lungs.' },
        { id: 'tip-digoxin', title: 'Digoxin + Lasix Trap', text: 'Low K+ from Lasix makes digoxin toxic. Watch potassium.' }
    ]
};
