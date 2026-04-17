// Pediatric Fractures & Immobility Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'basics', icon: 'fa-bone', title: 'Pediatric Basics' },
        { id: 'neurovascular', icon: 'fa-heart-pulse', title: 'Neurovascular & Compartment' },
        { id: 'treatment', icon: 'fa-shield-halved', title: 'Casts & Traction' },
        { id: 'immobility', icon: 'fa-bed-pulse', title: 'Immobility Complications' },
        { id: 'abuse', icon: 'fa-triangle-exclamation', title: 'Abuse Concerns' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-list', value: '6 Ps', label: 'Neurovascular Check' },
        { type: 'critical', icon: 'fa-heart-crack', value: 'Disproportion', label: 'Compartment Sign' },
        { type: 'time', icon: 'fa-clock', value: 'q1-2h', label: 'NV Check Frequency' },
        { type: 'warning', icon: 'fa-baby', value: 'Both 90\u00b0', label: "Bryant's Legs" },
        { type: 'critical', icon: 'fa-weight-hanging', value: 'Never Lift', label: 'Traction Weights' },
        { type: 'success', icon: 'fa-x-ray', value: 'Salter II', label: 'Most Common Growth Plate' }
    ],
    clinicalPearls: [
        { id: 'tip-growth-plate', title: 'Physis Is the Weak Link', text: 'Force that sprains an adult fractures a kid\'s growth plate.' },
        { id: 'tip-pain-priority', title: 'Pain Out of Proportion', text: 'Severe unrelenting pain = compartment syndrome.' }
    ]
};
