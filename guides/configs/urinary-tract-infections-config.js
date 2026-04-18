// UTI & Pyelonephritis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Kidney & Urinary Assessment' },
        { id: 'pathway', icon: 'fa-route', title: 'How Infection Ascends' },
        { id: 'lower-uti', icon: 'fa-droplet', title: 'Lower UTI (Cystitis)' },
        { id: 'pyelonephritis', icon: 'fa-fire', title: 'Pyelonephritis' },
        { id: 'compare', icon: 'fa-not-equal', title: 'Lower vs Upper UTI' },
        { id: 'cauti', icon: 'fa-syringe', title: 'CAUTI' },
        { id: 'urosepsis', icon: 'fa-triangle-exclamation', title: 'Urosepsis' },
        { id: 'education', icon: 'fa-users', title: 'Prevention & Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-pills', value: '5–7 days', label: 'Lower UTI Rx' },
        { type: 'time', icon: 'fa-hospital', value: '~2 wks', label: 'Pyelo Rx' },
        { type: 'target', icon: 'fa-glass-water', value: '8–10', label: 'Glasses/day' },
        { type: 'warning', icon: 'fa-toilet', value: 'q2–3h', label: 'Void frequency' },
        { type: 'critical', icon: 'fa-triangle-exclamation', value: 'CVA+', label: 'Pyelo sign' },
        { type: 'critical', icon: 'fa-droplet', value: '<0.5 mL/kg/hr', label: 'Oliguria' }
    ],
    clinicalPearls: [
        { id: 'tip-burning-vs-flank', title: 'The One-Line Differentiator', text: 'Burning + frequency = lower. Add fever + flank + CVA tenderness = upper.' },
        { id: 'tip-full-course', title: 'Finish the Antibiotic Course', text: 'Stopping early is how recurrent and resistant UTIs happen.' }
    ]
};
