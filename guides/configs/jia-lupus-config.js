// JIA & Pediatric Lupus Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-triangle-exclamation', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'fundamentals', icon: 'fa-shield-virus', title: 'Where these come from' },
        { id: 'jia', icon: 'fa-bone', title: 'JIA types' },
        { id: 'lupus', icon: 'fa-sun', title: 'Pediatric lupus' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'The labs' },
        { id: 'treatment', icon: 'fa-pills', title: 'The drugs' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family', icon: 'fa-users', title: 'Family teaching' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'warning', icon: 'fa-bone', value: '4 or fewer', label: 'Oligoarticular JIA', section: 'jia' },
        { type: 'info', icon: 'fa-hand', value: '5 or more', label: 'Polyarticular JIA', section: 'jia' },
        { type: 'critical', icon: 'fa-eye', value: 'Every 3-6 mo', label: 'Slit-lamp screening', section: 'nursing' },
        { type: 'target', icon: 'fa-sun', value: 'SPF 50+', label: 'Lupus sun care', section: 'nursing' },
        { type: 'success', icon: 'fa-vial', value: 'Low C3/C4', label: 'Lupus flare lab', section: 'diagnosis' },
        { type: 'time', icon: 'fa-calendar', value: '6 weeks', label: 'JIA duration', section: 'jia' }
    ],
    clinicalPearls: [
        { id: 'tip-inflammatory-vs-mechanical', title: 'Loosens Up or Locks Up', text: 'Inflammatory pain loosens with movement; mechanical pain locks up with use. Worst on waking, better by lunch, think JIA.' },
        { id: 'tip-fever-with-rash', title: 'Afternoon Fever + Salmon Rash', text: 'Daily afternoon fevers, a salmon rash that waxes and wanes, well between spikes. Classic systemic JIA; rule out MAS.' },
        { id: 'tip-malar-rash', title: 'The Rash That Spares the Folds', text: 'The lupus butterfly rash spares the nasolabial folds. That sparing separates it from other facial rashes.' },
        { id: 'tip-flare-labs', title: 'Complement Down, dsDNA Up', text: 'A lupus flare consumes complement, so C3 and C4 fall while anti-dsDNA rises. Both together mean active disease.' },
        { id: 'tip-folic-acid-methotrexate', title: 'Methotrexate Plus Folic Acid', text: 'Folic acid cuts methotrexate side effects without weakening it. Give them on separate days, never together.' }
    ]
};
