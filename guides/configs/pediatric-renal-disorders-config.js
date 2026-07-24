// Pediatric Renal Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'nephrotic', icon: 'fa-water', title: 'Nephrotic syndrome' },
        { id: 'agn', icon: 'fa-fire', title: 'Acute glomerulonephritis' },
        { id: 'hus', icon: 'fa-bacterium', title: 'HUS' },
        { id: 'aki', icon: 'fa-triangle-exclamation', title: 'Acute kidney injury' },
        { id: 'ckd', icon: 'fa-infinity', title: 'Chronic kidney disease' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'What you do, in order' },
        { id: 'family-education', icon: 'fa-users', title: 'What families take home' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'info', icon: 'fa-water', value: 'Foamy + normal BP', label: 'Nephrotic', section: 'nephrotic' },
        { type: 'warning', icon: 'fa-fire', value: 'Tea + high BP', label: 'Nephritic AGN', section: 'agn' },
        { type: 'critical', icon: 'fa-ban', value: 'No Abx', label: 'HUS rule', section: 'hus' },
        { type: 'warning', icon: 'fa-droplet', value: '<1 mL/kg/hr', label: 'Infant oliguria', section: 'aki' },
        { type: 'critical', icon: 'fa-bolt', value: 'K+ >6.0', label: 'Calcium first', section: 'aki' },
        { type: 'target', icon: 'fa-pills', value: 'With meals', label: 'Phosphate binders', section: 'ckd' }
    ],
    clinicalPearls: [
        { id: 'tip-periorbital-am', title: 'Puffy eyes in the morning', text: 'Puffy eyes on waking, feet fine. That is nephrotic, not allergy.' },
        { id: 'tip-read-the-urine', title: 'Two questions, two diagnoses', text: 'Tea urine plus high BP is nephritic. Foamy urine plus normal BP is nephrotic.' },
        { id: 'tip-hus-no-abx', title: 'Bloody diarrhea, hands off the drugs', text: 'In HUS, hold antibiotics and loperamide. One releases more toxin, one traps it.' },
        { id: 'tip-hyperkalemia-first', title: 'Calcium protects, it does not lower', text: 'High potassium with EKG changes: calcium first, then shift, then remove.' },
        { id: 'tip-phosphate-binders', title: 'Phosphate binders go with food', text: 'With meals they trap phosphate. On an empty stomach they do nothing.' }
    ]
};
