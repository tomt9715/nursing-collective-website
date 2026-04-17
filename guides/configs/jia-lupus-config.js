// JIA & Pediatric Lupus Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-shield-virus', title: 'Fundamentals' },
        { id: 'jia', icon: 'fa-bone', title: 'JIA Types' },
        { id: 'lupus', icon: 'fa-sun', title: 'Pediatric SLE' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'Diagnosis' },
        { id: 'treatment', icon: 'fa-pills', title: 'Treatment & Meds' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing Priorities' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'warning', icon: 'fa-bone', value: '\u2264 4 joints', label: 'Oligoarticular JIA' },
        { type: 'info', icon: 'fa-hand', value: '\u2265 5 joints', label: 'Polyarticular JIA' },
        { type: 'critical', icon: 'fa-eye', value: 'Slit-lamp', label: 'Every 3\u20136 mo (Oligo)' },
        { type: 'target', icon: 'fa-sun', value: 'SPF 50+', label: 'Lupus Sun Care' },
        { type: 'success', icon: 'fa-vial', value: '\u2193 C3/C4', label: 'Lupus Flare Lab' },
        { type: 'time', icon: 'fa-calendar', value: '\u2265 6 weeks', label: 'JIA Duration' }
    ],
    clinicalPearls: [
        { id: 'tip-fever-with-rash', title: 'Afternoon Fever + Salmon Rash', text: 'Classic systemic JIA (Still disease).' },
        { id: 'tip-folic-acid-methotrexate', title: 'MTX + Folic Acid', text: 'Reduces side effects; separate dosing days.' }
    ]
};
