// Adrenal Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'physiology', icon: 'fa-dna', title: 'One hormone, four actions' },
        { id: 'cushings', icon: 'fa-arrow-up', title: 'Too much cortisol' },
        { id: 'cushings-treatment', icon: 'fa-pills', title: 'Treating too much' },
        { id: 'addisons', icon: 'fa-arrow-down', title: 'Too little cortisol' },
        { id: 'addisons-treatment', icon: 'fa-prescription-bottle-alt', title: 'Replacing what is gone' },
        { id: 'adrenal-crisis', icon: 'fa-exclamation-triangle', title: 'Adrenal crisis' },
        { id: 'pheochromocytoma', icon: 'fa-heartbeat', title: 'The tumour that is not cortisol' },
        { id: 'adrenalectomy', icon: 'fa-procedures', title: 'After the gland comes out' },
        { id: 'comparison', icon: 'fa-columns', title: 'The mirror' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Children' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-arrow-up', value: 'High cortisol', label: "Cushing's syndrome" },
        { type: 'warning', icon: 'fa-arrow-down', value: 'Low cortisol', label: "Addison's disease" },
        { type: 'critical', icon: 'fa-bolt', value: '100 mg IV', label: 'Hydrocortisone in crisis' },
        { type: 'info', icon: 'fa-clock', value: '6-8 AM', label: 'When cortisol peaks' },
        { type: 'target', icon: 'fa-pills', value: '2/3 AM', label: 'Hydrocortisone split' },
        { type: 'critical', icon: 'fa-heartbeat', value: 'Alpha first', label: 'Pheochromocytoma order' }
    ],
    clinicalPearls: [
        { id: 'tip-cortisol-functions', title: 'Derive It, Do Not Memorise It', text: "Cortisol raises glucose, holds sodium, suppresses immunity, breaks down protein. Run those up for Cushing's, down for Addison's." },
        { id: 'tip-iatrogenic', title: 'The Commonest Cause Is a Prescription', text: 'Not a tumour. Prednisone. Ask about creams, inhalers and injections; patients do not count those as medication.' },
        { id: 'tip-cushings-infection', title: 'No Fever Does Not Mean No Infection', text: 'Cortisol suppresses the response. Watch for confusion, new tachycardia, and wounds that stop progressing.' },
        { id: 'tip-addisons-teaching', title: 'Vomiting Is an Emergency Here', text: 'A patient who cannot keep tablets down has no cortisol at all. That is what the injectable kit is for.' },
        { id: 'tip-steroid-safety', title: 'The Adrenals Atrophy From Disuse', text: 'Chronic steroids do the work and the gland shrinks. Stop suddenly and no organ is left to step in.' },
        { id: 'tip-adrenal-crisis', title: 'Draw It, Then Give It', text: 'Draw the cortisol first if you like; that costs seconds. Waiting for the result is what kills people.' },
        { id: 'tip-pheo-bp', title: 'Alpha Before Beta', text: 'Beta-blockade alone shuts the vasodilator escape route while alpha vasoconstriction runs unopposed.' },
        { id: 'tip-cushings-vs-addisons', title: 'Know One, Invert It', text: "Everything high in Cushing's is low in Addison's. Potassium is the one row that runs the other way." }
    ]
};
