// Iron-Deficiency Anemia Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-apple-whole', title: 'Fundamentals' },
        { id: 'clinical', icon: 'fa-notes-medical', title: 'Clinical Findings' },
        { id: 'diagnosis', icon: 'fa-microscope', title: 'Diagnosis' },
        { id: 'treatment', icon: 'fa-pills', title: 'Treatment' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing & Safety' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-pills', value: '3\u20136 mg/kg/d', label: 'Oral Iron Dose' },
        { type: 'info', icon: 'fa-lemon', value: 'Vitamin C', label: 'Boosts Absorption' },
        { type: 'warning', icon: 'fa-cow', value: '< 24 oz/d', label: 'Milk Limit >1 yr' },
        { type: 'success', icon: 'fa-calendar', value: '2\u20133 mo', label: 'Continue After Hgb Normal' },
        { type: 'critical', icon: 'fa-skull-crossbones', value: 'Deferoxamine', label: 'Iron OD Antidote' },
        { type: 'time', icon: 'fa-baby', value: '6\u201324 mo', label: 'Peak Risk Age' }
    ],
    clinicalPearls: [
        { id: 'tip-pallor-assessment', title: 'Check Conjunctiva + Palms', text: 'Reliable across all skin tones.' },
        { id: 'tip-straw', title: 'Straw Saves the Smile', text: 'Liquid iron stains teeth. Use straw, rinse after.' }
    ]
};
