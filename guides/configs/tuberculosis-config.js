// Tuberculosis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-virus', title: 'How it gets in and stays' },
        { id: 'latent-vs-active', icon: 'fa-balance-scale', title: 'Latent or active' },
        { id: 'clinical-manifestations', icon: 'fa-notes-medical', title: 'What it looks like' },
        { id: 'diagnostics', icon: 'fa-vial', title: 'Testing, and the number' },
        { id: 'isolation', icon: 'fa-shield-virus', title: 'Airborne isolation' },
        { id: 'ripe-therapy', icon: 'fa-pills', title: 'The four drugs' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'What you do' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-head-side-mask', value: 'N95', label: 'Required respirator' },
        { type: 'warning', icon: 'fa-clock', value: '48-72 hrs', label: 'TST read window' },
        { type: 'info', icon: 'fa-pills', value: 'RIPE', label: 'First-line therapy' },
        { type: 'target', icon: 'fa-calendar', value: '6 months', label: 'Minimum treatment' },
        { type: 'critical', icon: 'fa-vial', value: '3 specimens', label: 'Sputum AFB needed' },
        { type: 'success', icon: 'fa-capsules', value: 'Pyridoxine', label: 'Give with isoniazid' }
    ],
    clinicalPearls: [
        { id: 'tip-granuloma', title: 'A Prison, Not an Execution', text: 'The granuloma contains the bacteria without killing them. That is why TB can wake up decades later.' },
        { id: 'tip-latent-active', title: 'Latent Is Never Contagious', text: 'No isolation, no mask, no partial version. Active pulmonary TB gets airborne precautions on suspicion.' },
        { id: 'tip-tst-reading', title: 'Feel It, Do Not Look at It', text: 'Induration is felt; erythema is seen. Only the first counts. Measure across the forearm at 48 to 72 hours.' },
        { id: 'tip-n95-fit', title: 'A Seal, Not Just a Filter', text: 'Droplet nuclei go round the edge of a loose mask. Fit-test, seal-check every time, and facial hair breaks it.' },
        { id: 'tip-ripe-monitoring', title: 'RIP Is the Liver, E Is the Eye', text: 'Three of the four are hepatotoxic. Ethambutol takes vision. Orange fluids on rifampin are expected.' },
        { id: 'tip-adherence', title: 'Feeling Better Is Not Cured', text: 'Symptoms clear long before the bacteria do. That gap is where drug resistance is created.' }
    ]
};
