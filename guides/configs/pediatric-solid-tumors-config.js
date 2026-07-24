// Pediatric Solid Tumors Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'neuroblastoma', icon: 'fa-diagram-project', title: 'Neuroblastoma vs Wilms' },
        { id: 'medulloblastoma', icon: 'fa-brain', title: 'Medulloblastoma' },
        { id: 'treatment', icon: 'fa-syringe', title: 'Treatment' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family', icon: 'fa-users', title: 'Family and home teaching' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-hand', value: 'DO NOT', label: 'Palpate the abdomen', section: 'nursing' },
        { type: 'info', icon: 'fa-arrows-left-right', value: 'Midline', label: 'Neuroblastoma crosses it', section: 'neuroblastoma' },
        { type: 'target', icon: 'fa-vial', value: 'VMA / HVA', label: 'Neuroblastoma urine markers', section: 'neuroblastoma' },
        { type: 'warning', icon: 'fa-dna', value: 'MYCN', label: 'Amplified means high risk', section: 'neuroblastoma' },
        { type: 'critical', icon: 'fa-brain', value: 'Cerebellum', label: 'Medulloblastoma site', section: 'medulloblastoma' },
        { type: 'time', icon: 'fa-bed', value: 'Side-lying', label: 'Post-fossa position', section: 'nursing' }
    ],
    clinicalPearls: [
        { id: 'tip-sympathetic-chain', title: 'Follow the Chain', text: 'Neuroblastoma arises anywhere the sympathetic chain travels: adrenal, chest, neck, or pelvis.' },
        { id: 'tip-cross-midline', title: 'Crosses the Midline', text: 'Neuroblastoma crosses the midline and raises urine VMA and HVA. Wilms stays on one side.' },
        { id: 'tip-vomiting-relief', title: 'Vomiting That Relieves', text: 'Morning headache plus painless morning vomiting plus a clumsy gait points to the cerebellum.' },
        { id: 'tip-do-not-palpate', title: 'Do-Not-Palpate Tumors', text: 'Neuroblastoma, Wilms, and hepatoblastoma spread when palpated. Inspect and auscultate only.' },
        { id: 'tip-neutropenic-fever', title: 'Fever Is the Emergency', text: 'Fever at or above 100.4 F on chemo means cultures and antibiotics within 1 hour.' }
    ]
};
