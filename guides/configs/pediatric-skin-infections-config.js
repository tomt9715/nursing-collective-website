// Pediatric Skin Infections Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'bacterial', icon: 'fa-bacterium', title: 'Bacterial' },
        { id: 'viral', icon: 'fa-virus', title: 'Viral' },
        { id: 'fungal', icon: 'fa-seedling', title: 'Fungal' },
        { id: 'diagnostics', icon: 'fa-vial', title: 'Diagnostics' },
        { id: 'treatment', icon: 'fa-pills', title: 'Treatment' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-ointment', value: 'Mupirocin', label: 'Impetigo Topical' },
        { type: 'warning', icon: 'fa-scissors', value: 'I & D', label: 'MRSA Abscess' },
        { type: 'critical', icon: 'fa-syringe', value: 'IV Acyclovir', label: 'Neonatal HSV' },
        { type: 'critical', icon: 'fa-capsules', value: 'Oral', label: 'Tinea Capitis Tx' },
        { type: 'time', icon: 'fa-clock', value: '24 hr', label: 'Return to School' },
        { type: 'success', icon: 'fa-hand-sparkles', value: 'Hand Hygiene', label: 'Best Prevention' }
    ],
    clinicalPearls: [
        { id: 'tip-honey-crusts', title: 'Honey Crusts = Impetigo', text: 'Topical mupirocin handles most cases.' },
        { id: 'tip-tinea-capitis-oral', title: 'Tinea Capitis Needs Oral Rx', text: 'Topical alone does NOT cure scalp tinea.' }
    ]
};
