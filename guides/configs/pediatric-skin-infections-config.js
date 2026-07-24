// Pediatric Skin Infections Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'bacterial', icon: 'fa-bacterium', title: 'Bacterial: how deep' },
        { id: 'fungal', icon: 'fa-seedling', title: 'Fungal: scalp or folds' },
        { id: 'viral', icon: 'fa-virus', title: 'Viral: which is urgent' },
        { id: 'diagnostics', icon: 'fa-vial', title: 'Assessment and diagnostics' },
        { id: 'treatment', icon: 'fa-pills', title: 'Treatment at a glance' },
        { id: 'family', icon: 'fa-users', title: 'Family education' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-ointment', value: 'Mupirocin', label: 'Impetigo topical', section: 'bacterial' },
        { type: 'warning', icon: 'fa-scissors', value: 'I & D', label: 'MRSA abscess over 5 mm', section: 'bacterial' },
        { type: 'critical', icon: 'fa-capsules', value: 'Oral', label: 'Tinea capitis, 6-8 wk', section: 'fungal' },
        { type: 'critical', icon: 'fa-syringe', value: 'IV acyclovir', label: 'Neonatal HSV now', section: 'viral' },
        { type: 'time', icon: 'fa-clock', value: '24 hr', label: 'Impetigo back to school', section: 'family' },
        { type: 'success', icon: 'fa-hand-sparkles', value: 'Hand hygiene', label: 'Best prevention', section: 'family' }
    ],
    clinicalPearls: [
        { id: 'tip-honey-crusts', title: 'Honey Crusts = Impetigo', text: 'Golden crust over a red base around the nose and mouth. Topical mupirocin handles most mild cases.' },
        { id: 'tip-mark-the-border', title: 'Mark, Then Reassess', text: 'A pen line around cellulitis turns "is this worse?" into yes or no. Spread past the line means escalate.' },
        { id: 'tip-tinea-capitis-oral', title: 'Tinea Capitis Needs Oral Rx', text: 'The fungus lives inside the hair shaft. Topical alone never cures scalp tinea; use an oral antifungal.' },
        { id: 'tip-satellite-lesions', title: 'Satellites and Folds = Candida', text: 'Candida fills the folds and throws satellite spots. Irritant diaper rash spares the folds.' },
        { id: 'tip-neonatal-hsv', title: 'Neonate + Vesicles = Acyclovir Now', text: 'A newborn with fever plus vesicles gets empiric IV acyclovir before any result. Do not wait for the PCR.' }
    ]
};
