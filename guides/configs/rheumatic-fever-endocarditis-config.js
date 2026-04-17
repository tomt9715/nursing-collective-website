// Rheumatic Fever & Infective Endocarditis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'overview', icon: 'fa-not-equal', title: 'RF vs IE Overview' },
        { id: 'rheumatic-fever', icon: 'fa-bacteria', title: 'Rheumatic Fever' },
        { id: 'jones-criteria', icon: 'fa-clipboard-check', title: 'Jones Criteria' },
        { id: 'endocarditis', icon: 'fa-heart-crack', title: 'Endocarditis' },
        { id: 'ie-signs', icon: 'fa-hand-dots', title: 'IE Peripheral Signs' },
        { id: 'treatment', icon: 'fa-syringe', title: 'Treatment' },
        { id: 'prophylaxis', icon: 'fa-shield-alt', title: 'Prophylaxis' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing Care' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-clock', value: '2-3 wk', label: 'RF After Strep' },
        { type: 'critical', icon: 'fa-vial', value: '3 sets', label: 'Blood Cultures (IE)' },
        { type: 'time', icon: 'fa-syringe', value: '4-6 wk', label: 'IE IV Antibiotics' },
        { type: 'target', icon: 'fa-shield', value: '50 mg/kg', label: 'Amox Prophylaxis' },
        { type: 'warning', icon: 'fa-calendar', value: 'Monthly', label: 'RF Secondary Prophylaxis' },
        { type: 'success', icon: 'fa-check', value: '10 days', label: 'Strep Throat PCN' }
    ],
    clinicalPearls: [
        { id: 'tip-mimicry', title: 'Molecular Mimicry Explains Everything', text: 'Anti-strep antibodies attack tissues that look like strep.' },
        { id: 'tip-prophylaxis', title: 'Two Kinds of "Prophylaxis"', text: "RF = monthly long-term. SBE = one dose before procedure." }
    ]
};
