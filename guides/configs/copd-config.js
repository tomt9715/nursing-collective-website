// COPD Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'How the airway closes' },
        { id: 'bronchitis-emphysema', icon: 'fa-columns', title: 'Blue or pink' },
        { id: 'oxygen-therapy', icon: 'fa-wind', title: 'The oxygen problem' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment, in order' },
        { id: 'breathing-techniques', icon: 'fa-lungs', title: 'Teaching the breathing' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'medications', icon: 'fa-pills', title: 'Rescue or maintenance' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '88-92%', label: 'SpO2 target in COPD' },
        { type: 'critical', icon: 'fa-tachometer-alt', value: '1-2 L/min', label: 'Starting oxygen flow' },
        { type: 'warning', icon: 'fa-exclamation-triangle', value: '<70%', label: 'FEV1/FVC confirms COPD' },
        { type: 'info', icon: 'fa-lungs', value: '1:2', label: 'Pursed-lip ratio' },
        { type: 'critical', icon: 'fa-head-side-cough', value: '50-70', label: 'PaCO2 in a chronic retainer' },
        { type: 'success', icon: 'fa-mask-face', value: 'Venturi', label: 'Precise FiO2 control' }
    ],
    clinicalPearls: [
        { id: 'tip-blue-bloater', title: 'Blue Bloater vs Pink Puffer', text: 'Blue means gas exchange failed and the right heart followed. Pink means they are still compensating, at great cost.' },
        { id: 'tip-low-flow-first', title: 'Low Flow First', text: '1 to 2 L per minute, target 88 to 92 percent. Their only stimulus to breathe is the low oxygen.' },
        { id: 'tip-co2-narcosis', title: 'Watch for CO2 Narcosis', text: 'Confusion, headache, flushed warm skin, shallow breathing, asterixis. Turn the oxygen down first.' },
        { id: 'tip-pursed-lip', title: 'Pursed-Lip Breathing', text: 'In through the nose for two, out through pursed lips for four. Back-pressure holds collapsing airways open.' },
        { id: 'tip-rinse-after-ics', title: 'Rinse After ICS', text: 'Steroid left in the mouth invites candida. Swish and spit after every dose, and use a spacer.' },
        { id: 'tip-bronchodilators-first', title: 'Bronchodilators Before Steroids', text: 'SABA, then LABA, then the inhaled steroid. Open the road before you send the traffic down it.' }
    ]
};
