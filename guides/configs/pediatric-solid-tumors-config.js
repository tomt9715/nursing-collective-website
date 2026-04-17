// Pediatric Solid Tumors Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-disease', title: 'Fundamentals' },
        { id: 'medulloblastoma', icon: 'fa-brain', title: 'Medulloblastoma' },
        { id: 'neuroblastoma', icon: 'fa-disease', title: 'Neuroblastoma' },
        { id: 'diagnosis', icon: 'fa-microscope', title: 'Diagnosis' },
        { id: 'treatment', icon: 'fa-syringe', title: 'Treatment' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing Priorities' },
        { id: 'family', icon: 'fa-users', title: 'Family Coping' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-hand-dots', value: 'DO NOT', label: 'Palpate Neuroblastoma' },
        { type: 'warning', icon: 'fa-brain', value: 'Cerebellum', label: 'Medulloblastoma Site' },
        { type: 'info', icon: 'fa-vial', value: 'VMA / HVA', label: 'Neuroblastoma Markers' },
        { type: 'target', icon: 'fa-dna', value: 'MYCN', label: 'High-Risk Gene' },
        { type: 'time', icon: 'fa-bed', value: 'Side-lying', label: 'Post-Fossa Position' },
        { type: 'success', icon: 'fa-heart', value: '> 70%', label: 'Medullo 5-Yr Survival' }
    ],
    clinicalPearls: [
        { id: 'tip-sympathetic-chain', title: 'Follow the Chain', text: 'Neuroblastoma arises anywhere the sympathetic chain travels.' },
        { id: 'tip-do-not-palpate', title: 'Three Do-Not-Palpate Tumors', text: 'Neuroblastoma, Wilms, hepatoblastoma \u2014 inspect + auscultate only.' }
    ]
};
