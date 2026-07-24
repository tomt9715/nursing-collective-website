// UTI, VUR & Enuresis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'uti', icon: 'fa-bacterium', title: 'Pediatric UTI' },
        { id: 'vur', icon: 'fa-arrows-up-down', title: 'Vesicoureteral reflux' },
        { id: 'enuresis', icon: 'fa-moon', title: 'Enuresis' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'Diagnosis and workup' },
        { id: 'treatment', icon: 'fa-pills', title: 'Treatment' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing and teaching' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'warning', icon: 'fa-thermometer', value: 'Fever', label: 'Infant UTI sign', section: 'uti' },
        { type: 'critical', icon: 'fa-ban', value: 'No bag', label: 'Never a culture', section: 'diagnosis' },
        { type: 'target', icon: 'fa-x-ray', value: 'VCUG', label: 'Grades reflux', section: 'vur' },
        { type: 'info', icon: 'fa-arrows-up-down', value: 'IV to V', label: 'Reflux needing surgery', section: 'treatment' },
        { type: 'success', icon: 'fa-calendar', value: 'Age 5', label: 'Enuresis cutoff', section: 'enuresis' },
        { type: 'target', icon: 'fa-bell', value: 'Alarm', label: 'Enuresis first-line', section: 'treatment' }
    ],
    clinicalPearls: [
        { id: 'tip-infant-fever', title: 'In an infant, the UTI symptom is fever', text: 'Any febrile infant under 2 years without a source needs a urine test.' },
        { id: 'tip-reflux-scar', title: 'Reflux is the reason for the workup', text: 'A recurrent or febrile UTI in a young child asks: is urine going backward?' },
        { id: 'tip-secondary-enuresis', title: 'Secondary enuresis is a red flag', text: 'Dry, then wet again? Work up UTI, diabetes, constipation, and stress.' },
        { id: 'tip-bag-specimen', title: 'A bag is a screen, never a culture', text: 'Confirm a positive bag with a catheter or aspiration before antibiotics.' },
        { id: 'tip-ddavp-fluids', title: 'DDAVP plus free fluids equals seizures', text: 'No fluids 1 hour before the dose, none for 8 hours after.' }
    ]
};
