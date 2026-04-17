// Male GU Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'phimosis', icon: 'fa-ring', title: 'Phimosis' },
        { id: 'cryptorchidism', icon: 'fa-arrow-down', title: 'Cryptorchidism' },
        { id: 'torsion', icon: 'fa-stopwatch', title: 'Testicular Torsion' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment' },
        { id: 'treatment', icon: 'fa-scalpel', title: 'Treatment' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing & Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-stopwatch', value: '6 hr', label: 'Torsion Window' },
        { type: 'time', icon: 'fa-calendar', value: '6-18 mo', label: 'Orchiopexy Age' },
        { type: 'warning', icon: 'fa-ban', value: 'Absent', label: 'Cremasteric in Torsion' },
        { type: 'target', icon: 'fa-calendar', value: 'Age 5', label: 'Physiologic Phimosis Resolves' },
        { type: 'critical', icon: 'fa-triangle-exclamation', value: '4-8x', label: 'Cancer Risk (Undescended)' },
        { type: 'success', icon: 'fa-hand', value: 'No Retract', label: 'Foreskin Rule' }
    ],
    clinicalPearls: [
        { id: 'tip-never-retract', title: 'Never Force the Foreskin', text: 'Iatrogenic phimosis comes from forced retraction.' },
        { id: 'tip-torsion-shortcut', title: 'Two Findings Nail Torsion', text: 'Sudden severe pain + absent cremasteric reflex.' }
    ]
};
