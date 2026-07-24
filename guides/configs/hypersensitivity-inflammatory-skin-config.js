// Hypersensitivity & Inflammatory Skin Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'hypersensitivity-types', icon: 'fa-layer-group', title: 'The four types' },
        { id: 'atopic', icon: 'fa-hand-dots', title: 'Atopic dermatitis' },
        { id: 'contact', icon: 'fa-leaf', title: 'Contact and diaper' },
        { id: 'urticaria', icon: 'fa-bolt', title: 'Urticaria and anaphylaxis' },
        { id: 'sjs', icon: 'fa-triangle-exclamation', title: 'EM, SJS and TEN' },
        { id: 'meds', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family', icon: 'fa-users', title: 'Family education' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-shower', value: '3 min', label: 'Moisturize after the bath', section: 'atopic' },
        { type: 'critical', icon: 'fa-syringe', value: 'IM Epi', label: 'Anaphylaxis first action', section: 'urticaria' },
        { type: 'warning', icon: 'fa-weight', value: '0.15/0.3 mg', label: 'EpiPen Jr / EpiPen', section: 'meds' },
        { type: 'time', icon: 'fa-clock', value: '4-6 hr', label: 'Biphasic observation', section: 'urticaria' },
        { type: 'critical', icon: 'fa-ban', value: 'Stop Drug', label: 'SJS / TEN first move', section: 'sjs' },
        { type: 'info', icon: 'fa-hand-sparkles', value: 'Nikolsky+', label: 'SJS clinical sign', section: 'sjs' }
    ],
    clinicalPearls: [
        { id: 'tip-fast-slow', title: 'Fast is Type I, Slow is Type IV', text: 'Minutes means IgE and Type I; a day or two means T-cells and Type IV. Speed sorts most scenarios.' },
        { id: 'tip-soak-and-seal', title: 'Moisturize in 3 Minutes', text: 'Wet skin holds water; moisturizer right after the bath seals it in. Wait and it evaporates.' },
        { id: 'tip-poison-ivy', title: 'Wash Urushiol Fast', text: 'Soap and water within 15 minutes can prevent the poison ivy rash; after 30 it is too late.' },
        { id: 'tip-biphasic', title: 'Biphasic Reactions', text: 'Up to 20 percent rebound 4 to 12 hours later without re-exposure. Observe 4 to 6 hours minimum.' }
    ]
};
