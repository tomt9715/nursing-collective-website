// Hypersensitivity & Inflammatory Skin Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'atopic', icon: 'fa-hand-dots', title: 'Atopic Dermatitis' },
        { id: 'contact', icon: 'fa-leaf', title: 'Contact & Diaper' },
        { id: 'urticaria', icon: 'fa-bolt', title: 'Urticaria & Anaphylaxis' },
        { id: 'sjs', icon: 'fa-triangle-exclamation', title: 'EM, SJS & TEN' },
        { id: 'meds', icon: 'fa-pills', title: 'Medications' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-shower', value: '3 min', label: 'Post-Bath Moisturize' },
        { type: 'critical', icon: 'fa-syringe', value: 'IM Epi', label: 'Anaphylaxis First Action' },
        { type: 'warning', icon: 'fa-weight', value: '0.15/0.3 mg', label: 'EpiPen Jr / Adult' },
        { type: 'time', icon: 'fa-clock', value: '4-6 hr', label: 'Biphasic Observation' },
        { type: 'critical', icon: 'fa-ban', value: 'Stop Drug', label: 'SJS/TEN' },
        { type: 'success', icon: 'fa-hand-sparkles', value: 'Nikolsky+', label: 'SJS Clinical Sign' }
    ],
    clinicalPearls: [
        { id: 'tip-soak-and-seal', title: 'Moisturize in 3 Minutes', text: 'Post-bath window for eczema management.' },
        { id: 'tip-poison-ivy', title: 'Wash Urushiol Fast', text: '15 minutes to prevent poison ivy rash.' },
        { id: 'tip-biphasic', title: 'Biphasic Reactions', text: 'Observe 4\u20136 hours post anaphylaxis.' }
    ]
};
