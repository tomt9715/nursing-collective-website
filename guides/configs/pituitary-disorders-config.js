// Pituitary Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'anatomy', icon: 'fa-brain', title: 'Two lobes, two jobs' },
        { id: 'diabetes-insipidus', icon: 'fa-droplet', title: 'Diabetes insipidus' },
        { id: 'siadh', icon: 'fa-water', title: 'SIADH' },
        { id: 'siadh-vs-di', icon: 'fa-not-equal', title: 'The mirror' },
        { id: 'lab-values', icon: 'fa-vial', title: 'Reading the labs' },
        { id: 'growth-hormone', icon: 'fa-ruler-vertical', title: 'Growth hormone' },
        { id: 'hyperprolactinemia', icon: 'fa-baby', title: 'Too much prolactin' },
        { id: 'cushings-hypopituitarism', icon: 'fa-arrows-up-down', title: 'ACTH excess and deficiency' },
        { id: 'pituitary-tumors', icon: 'fa-circle-dot', title: 'Adenomas and what they press on' },
        { id: 'transsphenoidal', icon: 'fa-user-doctor', title: 'Surgery through the nose' },
        { id: 'medications', icon: 'fa-pills', title: 'Matching drug to disorder' },
        { id: 'pediatric', icon: 'fa-child', title: 'Children' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-tachometer-alt', value: '10-12 mEq/L', label: 'Max sodium correction in 24h' },
        { type: 'warning', icon: 'fa-glass-water', value: '800-1000 mL', label: 'SIADH fluid restriction' },
        { type: 'critical', icon: 'fa-toilet', value: '>200 mL/hr', label: 'Post-op output meaning DI' },
        { type: 'info', icon: 'fa-arrows-up-down', value: '30-45°', label: 'Head of bed post-op' },
        { type: 'target', icon: 'fa-droplet', value: '1.010-1.025', label: 'Normal specific gravity' },
        { type: 'success', icon: 'fa-vial', value: '135-145', label: 'Normal serum sodium (mEq/L)' }
    ],
    clinicalPearls: [
        { id: 'tip-adh-regulation', title: 'The Name Tells You Everything', text: 'Anti-diuretic. More ADH means less urine, concentrated. Less ADH means more urine, dilute. Both diseases follow.' },
        { id: 'tip-di-postop', title: 'The 200 mL an Hour Rule', text: 'Output over 200 mL/hr for two hours with specific gravity under 1.005 after brain surgery is DI. Report it now.' },
        { id: 'tip-siadh-vs-di', title: 'One Holds, One Drains', text: 'SIADH holds water: concentrated urine, low sodium, restrict. DI drains it: dilute urine, high sodium, replace.' },
        { id: 'tip-opposite-disorders', title: 'Check Two Things and Stop', text: 'Urine output and serum sodium. Both low is SIADH. Both high is DI. Everything else follows from those two.' },
        { id: 'tip-prolactinoma', title: 'Pills First, Surgery Second', text: 'A dopamine agonist both normalises prolactin and shrinks the tumour. Acromegaly and Cushing’s go the other way.' },
        { id: 'tip-transsphenoidal', title: 'Every Restriction Is About Pressure', text: 'Blowing, coughing, sneezing, bending, straining. All five spike pressure across a fresh nose-to-brain opening.' },
        { id: 'tip-medications', title: 'Each Drug Reverses the Disease', text: 'Desmopressin replaces ADH, tolvaptan blocks it, octreotide suppresses GH, somatropin replaces it, cabergoline restores the dopamine brake.' }
    ]
};
