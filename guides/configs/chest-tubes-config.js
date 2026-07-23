// Chest Tubes Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pleural-space', icon: 'fa-lungs', title: 'Why the lung stays up' },
        { id: 'indications', icon: 'fa-clipboard-list', title: 'Air or fluid, high or low' },
        { id: 'drainage-systems', icon: 'fa-box', title: 'Three chambers, one that matters' },
        { id: 'tidaling-air-leaks', icon: 'fa-wave-square', title: 'Movement or bubbles' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessing it, in order' },
        { id: 'clamping', icon: 'fa-compress-alt', title: 'Almost never clamp' },
        { id: 'complications', icon: 'fa-exclamation-triangle', title: 'What goes wrong' },
        { id: 'removal', icon: 'fa-check-double', title: 'Taking it out' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-water', value: '2 cm', label: 'Water seal level' },
        { type: 'info', icon: 'fa-tachometer-alt', value: '-20 cm H2O', label: 'Usual suction' },
        { type: 'critical', icon: 'fa-tint', value: '>100 mL/hr', label: 'Report drainage' },
        { type: 'warning', icon: 'fa-ban', value: 'NEVER', label: 'Clamp with an air leak' },
        { type: 'success', icon: 'fa-wave-square', value: 'Tidaling', label: 'Normal finding' },
        { type: 'critical', icon: 'fa-arrow-down', value: 'Below chest', label: 'System position' }
    ],
    clinicalPearls: [
        { id: 'tip-negative-pressure', title: 'The Seal Is the Whole Thing', text: 'The lung is held open by a vacuum between two membranes. Anything entering that space breaks it.' },
        { id: 'tip-water-seal', title: 'Water Seal Is the Safety Net', text: 'Suction is optional; the water seal is not. Two centimetres lets air out and never lets it back.' },
        { id: 'tip-tidaling-vs-leak', title: 'Waves, Not Bubbles', text: 'Tidaling is the level moving. An air leak is air passing through the water. Only one needs a source hunt.' },
        { id: 'tip-never-clamp', title: 'Air Leak Plus Clamp Equals Tension', text: 'Clamping closes the only exit the trapped air has. The pressure then shifts the mediastinum.' },
        { id: 'tip-tension-pneumo', title: 'This Is Obstructive Shock', text: 'Tracheal deviation, absent breath sounds, JVD, hypotension. Unclamp now and treat before the x-ray.' },
        { id: 'tip-valsalva', title: 'Never Let Them Inhale', text: 'Bear down or breathe out during the pull. An inhale draws air straight into the pleural space.' }
    ]
};
