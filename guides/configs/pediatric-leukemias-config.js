// Pediatric Leukemias Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-dna', title: 'Fundamentals' },
        { id: 'classification', icon: 'fa-sitemap', title: 'Classification' },
        { id: 'clinical', icon: 'fa-notes-medical', title: 'Clinical Findings' },
        { id: 'diagnosis', icon: 'fa-microscope', title: 'Diagnosis' },
        { id: 'treatment', icon: 'fa-syringe', title: 'Treatment' },
        { id: 'neutropenic', icon: 'fa-shield-virus', title: 'Neutropenic Care' },
        { id: 'complications', icon: 'fa-triangle-exclamation', title: 'Complications' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing Priorities' },
        { id: 'family', icon: 'fa-users', title: 'Family Support' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-temperature-high', value: '\u2265 100.4\u00b0F', label: 'Fever = Emergency' },
        { type: 'warning', icon: 'fa-shield-virus', value: 'ANC < 500', label: 'Severe Neutropenia' },
        { type: 'target', icon: 'fa-microscope', value: '> 20% blasts', label: 'Marrow Dx Threshold' },
        { type: 'info', icon: 'fa-calendar', value: '2\u20133 yrs', label: 'ALL Total Therapy' },
        { type: 'success', icon: 'fa-heart', value: '> 90%', label: 'ALL 5-Yr Survival' },
        { type: 'time', icon: 'fa-hourglass-half', value: '24\u201372 hr', label: 'TLS Risk Window' }
    ],
    clinicalPearls: [
        { id: 'tip-bone-pain', title: 'The Limping Toddler', text: 'Bone pain + pallor + bruising = CBC now.' },
        { id: 'tip-neutropenic-diet', title: 'The Big 4 No\u2019s', text: 'No rectal temps, flowers, live vaccines, raw food.' }
    ]
};
