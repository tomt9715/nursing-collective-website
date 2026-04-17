// Bleeding Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-droplet', title: 'Fundamentals' },
        { id: 'hemophilia', icon: 'fa-dna', title: 'Hemophilia' },
        { id: 'itp', icon: 'fa-shield-virus', title: 'ITP' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'Diagnosis' },
        { id: 'treatment', icon: 'fa-syringe', title: 'Treatment' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing Priorities' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-head-side-virus', value: 'Factor First', label: 'For Head Injury' },
        { type: 'warning', icon: 'fa-dna', value: 'X-linked', label: 'Hemophilia Inheritance' },
        { type: 'info', icon: 'fa-flask', value: '\u2191 PTT', label: 'Hemophilia Lab' },
        { type: 'target', icon: 'fa-dot-circle', value: '< 20k', label: 'ITP Platelet Trigger' },
        { type: 'success', icon: 'fa-shield-virus', value: 'IVIG', label: 'ITP First-Line' },
        { type: 'time', icon: 'fa-calendar', value: '6 mo', label: 'Childhood ITP Resolves' }
    ],
    clinicalPearls: [
        { id: 'tip-pressure-not-ice-on-nose', title: 'Nosebleed First Aid', text: 'Lean forward, pinch 10 min without checking.' },
        { id: 'tip-no-im', title: 'SubQ, Not IM', text: 'Hemophilia kids get vaccines subcutaneously with pressure.' }
    ]
};
