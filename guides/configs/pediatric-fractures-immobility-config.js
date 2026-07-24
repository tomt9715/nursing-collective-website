// Pediatric Fractures & Immobility Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'basics', icon: 'fa-bone', title: 'Why kid bones differ' },
        { id: 'neurovascular', icon: 'fa-heart-pulse', title: '6 Ps and compartment' },
        { id: 'abuse', icon: 'fa-triangle-exclamation', title: 'When it fits no story' },
        { id: 'treatment', icon: 'fa-shield-halved', title: 'Casts and traction' },
        { id: 'immobility', icon: 'fa-bed-pulse', title: 'Immobility complications' },
        { id: 'family', icon: 'fa-users', title: 'Family education' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-list', value: '6 Ps', label: 'Neurovascular check', section: 'neurovascular' },
        { type: 'critical', icon: 'fa-heart-crack', value: 'Out of proportion', label: 'Compartment sign', section: 'neurovascular' },
        { type: 'time', icon: 'fa-clock', value: 'q1-2h', label: 'NV check frequency', section: 'treatment' },
        { type: 'warning', icon: 'fa-baby', value: 'Both 90°', label: "Bryant's legs", section: 'treatment' },
        { type: 'critical', icon: 'fa-weight-hanging', value: 'Never lift', label: 'Traction weights', section: 'treatment' },
        { type: 'success', icon: 'fa-x-ray', value: 'Salter II', label: 'Most common growth plate', section: 'basics' }
    ],
    clinicalPearls: [
        { id: 'tip-growth-plate', title: 'Physis Is the Weak Link', text: 'A force that only sprains an adult can fracture a child\'s growth plate.' },
        { id: 'tip-pain-priority', title: 'Pain Out of Proportion', text: 'Severe pain that opioids barely touch is compartment syndrome until proven otherwise.' },
        { id: 'tip-report', title: 'Reporting Is Protected', text: 'Report a reasonable suspicion in good faith and you cannot be sued, even if no abuse is found.' },
        { id: 'tip-bryants', title: "Bryant's Is the Buttocks", text: 'Both legs up at 90 degrees, buttocks slightly off the mattress, body weight as counter-traction.' },
        { id: 'tip-disuse', title: 'A Transfer Can Break a Bone', text: 'Weeks of immobility demineralize bone; ordinary handling can fracture it. Lift with support.' }
    ]
};
