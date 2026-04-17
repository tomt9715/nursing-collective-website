// Kawasaki Disease Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Pathophysiology' },
        { id: 'criteria', icon: 'fa-clipboard-check', title: 'CRASH and BURN' },
        { id: 'phases', icon: 'fa-stream', title: 'Phases' },
        { id: 'labs', icon: 'fa-vial', title: 'Labs & Diagnostics' },
        { id: 'complications', icon: 'fa-heart-crack', title: 'Complications' },
        { id: 'treatment', icon: 'fa-syringe', title: 'Treatment' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing Care' },
        { id: 'family-education', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-thermometer-full', value: '\u22655 days', label: 'Fever Criterion' },
        { type: 'critical', icon: 'fa-clock', value: '10 days', label: 'IVIG Window' },
        { type: 'target', icon: 'fa-syringe', value: '2 g/kg', label: 'IVIG Dose' },
        { type: 'warning', icon: 'fa-pills', value: '80-100', label: 'Aspirin mg/kg/day' },
        { type: 'success', icon: 'fa-shield-alt', value: '<5%', label: 'Aneurysm w/ Tx' },
        { type: 'critical', icon: 'fa-syringe', value: '11 mo', label: 'Live Vaccine Delay' }
    ],
    clinicalPearls: [
        { id: 'tip-irritability', title: 'Extreme Irritability Clue', text: 'Kids are inconsolable \u2014 out of proportion to illness.' },
        { id: 'tip-aspirin', title: 'Two Aspirin Doses, Two Jobs', text: 'High-dose = anti-inflammatory. Low-dose = antiplatelet.' }
    ]
};
