// Kawasaki Disease Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'criteria', icon: 'fa-clipboard-check', title: 'Kawasaki or a viral rash' },
        { id: 'phases', icon: 'fa-stream', title: 'The three phases' },
        { id: 'complications', icon: 'fa-heart-crack', title: 'Why it is dangerous' },
        { id: 'labs', icon: 'fa-vial', title: 'Labs and diagnostics' },
        { id: 'treatment', icon: 'fa-syringe', title: 'IVIG and aspirin' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family-education', icon: 'fa-users', title: 'What families take home' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-thermometer-full', value: '5+ days', label: 'Fever criterion', section: 'criteria' },
        { type: 'critical', icon: 'fa-clock', value: '10 days', label: 'IVIG window', section: 'treatment' },
        { type: 'target', icon: 'fa-syringe', value: '2 g/kg', label: 'IVIG dose', section: 'treatment' },
        { type: 'warning', icon: 'fa-pills', value: '80-100', label: 'High-dose aspirin mg/kg/day', section: 'treatment' },
        { type: 'critical', icon: 'fa-heart-crack', value: '<5%', label: 'Aneurysm rate when treated', section: 'complications' },
        { type: 'info', icon: 'fa-calendar-times', value: '11 mo', label: 'Live vaccine delay', section: 'family-education' }
    ],
    clinicalPearls: [
        { id: 'tip-crash-burn', title: 'CRASH and BURN', text: 'Conjunctivitis, Rash, Adenopathy, Strawberry tongue, Hands and feet. BURN is fever 5 or more days.' },
        { id: 'tip-irritability', title: 'The Inconsolable Toddler', text: 'Extreme irritability is not on the list, but it is one of the most consistent clues.' },
        { id: 'tip-subacute-danger', title: 'Peeling Plus Platelets', text: 'Subacute owns the cardiac risk. Peeling fingertips and soaring platelets mean the dangerous window.' },
        { id: 'tip-aspirin-exception', title: 'Two Doses, Two Jobs', text: 'High-dose aspirin is anti-inflammatory. Low-dose is antiplatelet. Stop it for flu or chickenpox.' },
        { id: 'tip-stop-the-infusion', title: 'Stop the Infusion First', text: 'If a child reacts to IVIG, slow or stop it, then notify the provider. Treat after.' }
    ]
};
