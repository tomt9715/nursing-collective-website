// Pediatric Leukemias Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'fundamentals', icon: 'fa-dna', title: 'What leukemia is' },
        { id: 'classification', icon: 'fa-sitemap', title: 'ALL or AML' },
        { id: 'clinical', icon: 'fa-notes-medical', title: 'The three cytopenias' },
        { id: 'diagnosis', icon: 'fa-microscope', title: 'The workup' },
        { id: 'treatment', icon: 'fa-syringe', title: 'How it is treated' },
        { id: 'neutropenic', icon: 'fa-shield-virus', title: 'Neutropenic fever' },
        { id: 'complications', icon: 'fa-triangle-exclamation', title: 'Complications' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family', icon: 'fa-users', title: 'Family support' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-temperature-high', value: '≥ 100.4°F', label: 'Fever = Emergency', section: 'neutropenic' },
        { type: 'warning', icon: 'fa-shield-virus', value: 'ANC < 500', label: 'Severe Neutropenia', section: 'neutropenic' },
        { type: 'target', icon: 'fa-microscope', value: '> 20% blasts', label: 'Marrow Dx Threshold', section: 'diagnosis' },
        { type: 'info', icon: 'fa-bolt', value: 'Up up up down', label: 'Tumor Lysis Pattern', section: 'complications' },
        { type: 'critical', icon: 'fa-syringe', value: 'IV only', label: 'Vincristine Route', section: 'treatment' },
        { type: 'success', icon: 'fa-droplet', value: '< 10,000', label: 'Platelet Transfusion', section: 'nursing' }
    ],
    clinicalPearls: [
        { id: 'tip-auer-rods', title: 'Auer Rods = AML', text: 'Auer rods live only in myeloid blasts. See them, pick AML.' },
        { id: 'tip-limping-toddler', title: 'The Limping Toddler', text: 'Bone pain plus pallor plus bruising means a CBC now.' },
        { id: 'tip-vincristine', title: 'Vincristine = IV Only', text: 'Intrathecal vincristine has no antidote. Read the label, verify the route.' },
        { id: 'tip-neutropenic-fever', title: 'Fever Now, Not Later', text: 'Any temp 100.4°F or higher gets cultures and antibiotics inside the hour.' },
        { id: 'tip-tls', title: 'Up, Up, Up, Down', text: 'Tumor lysis is K up, phosphorus up, uric acid up, calcium down.' }
    ]
};
