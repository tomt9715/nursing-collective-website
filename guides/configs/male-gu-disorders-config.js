// Male GU Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'torsion', icon: 'fa-stopwatch', title: 'Testicular torsion' },
        { id: 'cryptorchidism', icon: 'fa-arrow-down', title: 'Cryptorchidism' },
        { id: 'phimosis', icon: 'fa-ring', title: 'Phimosis and paraphimosis' },
        { id: 'treatment', icon: 'fa-user-md', title: 'Treatment and the OR' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing and teaching' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-stopwatch', value: '6 hr', label: 'Torsion salvage window', section: 'torsion' },
        { type: 'warning', icon: 'fa-ban', value: 'Absent', label: 'Cremasteric reflex in torsion', section: 'torsion' },
        { type: 'time', icon: 'fa-calendar', value: '6-18 mo', label: 'Orchiopexy age', section: 'cryptorchidism' },
        { type: 'success', icon: 'fa-hand', value: 'No retract', label: 'Foreskin rule', section: 'phimosis' },
        { type: 'critical', icon: 'fa-ban', value: 'Hold', label: 'Circumcision if meatus is misplaced', section: 'treatment' },
        { type: 'target', icon: 'fa-user-nurse', value: 'Monthly', label: 'Self-exam from adolescence', section: 'nursing' }
    ],
    clinicalPearls: [
        { id: 'tip-torsion-shortcut', title: 'Two Findings Nail Torsion', text: 'Sudden pain that woke him from sleep plus an absent cremasteric reflex means torsion until proven otherwise.' },
        { id: 'tip-retractile', title: 'Retractile Is Not Cryptorchid', text: 'A retractile testis comes down and stays down. A cryptorchid one will not, or springs back up when you let go.' },
        { id: 'tip-never-retract', title: 'Never Force the Foreskin', text: 'Forced retraction causes the scarring it is meant to prevent. Leave it alone and wash only the outside.' },
        { id: 'tip-no-circumcision', title: 'A Misplaced Meatus Is a Stop Sign', text: 'If the meatus is not at the tip, hold circumcision. The repair uses the foreskin as graft tissue.' },
        { id: 'tip-self-exam', title: 'Monthly, in the Shower', text: 'Testicular self-exam is monthly, in the shower, when the scrotum is warm and relaxed. Teach every adolescent boy.' }
    ]
};
