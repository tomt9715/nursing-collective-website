// Pituitary & Hypothalamus Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-brain', title: 'Anatomy & Physiology' },
        { id: 'diabetes-insipidus', icon: 'fa-tint-slash', title: 'Diabetes Insipidus' },
        { id: 'siadh', icon: 'fa-tint', title: 'SIADH' },
        { id: 'siadh-vs-di', icon: 'fa-balance-scale', title: 'SIADH vs DI' },
        { id: 'lab-values', icon: 'fa-vials', title: 'Lab Interpretation' },
        { id: 'growth-hormone', icon: 'fa-child', title: 'Growth Hormone' },
        { id: 'hyperprolactinemia', icon: 'fa-venus-mars', title: 'Hyperprolactinemia' },
        { id: 'cushings-hypopituitarism', icon: 'fa-diagnoses', title: "Cushing's & Hypopituitarism" },
        { id: 'pituitary-tumors', icon: 'fa-circle', title: 'Pituitary Tumors' },
        { id: 'transsphenoidal', icon: 'fa-procedures', title: 'Surgery Care' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Pediatric Considerations' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-tint', value: '< 135', label: 'SIADH: Serum Na+ (mEq/L)' },
        { type: 'warning', icon: 'fa-tint-slash', value: '> 145', label: 'DI: Serum Na+ (mEq/L)' },
        { type: 'info', icon: 'fa-vial', value: '275-295', label: 'Normal Osm (mOsm/kg)' },
        { type: 'critical', icon: 'fa-flask', value: '< 1.005', label: 'DI: Urine Spec Gravity' },
        { type: 'target', icon: 'fa-tachometer-alt', value: '< 10-12', label: 'Na+ correction/24hr' },
        { type: 'critical', icon: 'fa-head-side-virus', value: 'CSF leak', label: 'Post-surgery #1 risk' }
    ],
    clinicalPearls: [
        { id: 'tip-adh-regulation', title: 'ADH = Anti-Peeing Hormone', text: 'More ADH = less pee (SIADH). Less ADH = more pee (DI). The name tells you everything about the disorder.' },
        { id: 'tip-di-postop', title: 'Post-Surgical DI', text: 'Urine output >200 mL/hr with low specific gravity after brain surgery = suspect DI. Often transient but may need desmopressin.' },
        { id: 'tip-siadh-vs-di', title: 'SIADH vs DI Quick ID', text: 'Check urine output (high/low) and serum sodium (high/low). SIADH: low output + low Na+. DI: high output + high Na+. Everything else follows.' },
        { id: 'tip-opposite-disorders', title: 'NCLEX Quick Decision', text: 'SIADH restricts fluids. DI replaces fluids. They are exact opposites in every lab value and every treatment approach.' },
        { id: 'tip-prolactinoma', title: 'Prolactinoma Treatment', text: 'Prolactinoma = medication first (cabergoline), NOT surgery. This is opposite from acromegaly and Cushing\'s disease where surgery is first-line.' },
        { id: 'tip-transsphenoidal', title: 'Post-Surgery 5 No\'s', text: 'No nose blowing, no coughing, no sneezing, no bending, no straining. Plus no toothbrushing for 2 weeks. Test nasal drainage for glucose (CSF leak).' },
        { id: 'tip-medications', title: 'Med-Disorder Matching', text: 'Desmopressin=DI, Tolvaptan=SIADH, Octreotide=Acromegaly, Somatropin=GH deficiency, Cabergoline=Prolactinoma.' }
    ]
};
