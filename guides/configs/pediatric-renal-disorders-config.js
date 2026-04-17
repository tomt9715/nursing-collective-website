// Pediatric Renal Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Renal Assessment' },
        { id: 'nephrotic', icon: 'fa-water', title: 'Nephrotic Syndrome' },
        { id: 'agn', icon: 'fa-fire', title: 'Acute Glomerulonephritis' },
        { id: 'nephrotic-vs-agn', icon: 'fa-not-equal', title: 'Nephrotic vs AGN' },
        { id: 'hus', icon: 'fa-bacterium', title: 'HUS' },
        { id: 'aki', icon: 'fa-triangle-exclamation', title: 'AKI' },
        { id: 'ckd', icon: 'fa-infinity', title: 'CKD' },
        { id: 'diagnostics', icon: 'fa-vial', title: 'Labs & Diagnostics' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing Care' },
        { id: 'family-education', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-baby', value: '2-6 yr', label: 'Nephrotic Age' },
        { type: 'time', icon: 'fa-child', value: '5-15 yr', label: 'AGN Age' },
        { type: 'critical', icon: 'fa-bacterium', value: 'O157:H7', label: 'HUS E. coli' },
        { type: 'warning', icon: 'fa-droplet', value: '<1 mL/kg/hr', label: 'Infant Oliguria' },
        { type: 'target', icon: 'fa-a', value: 'AEIOU', label: 'Dialysis Indications' },
        { type: 'critical', icon: 'fa-ban', value: 'No Abx', label: 'HUS Treatment' }
    ],
    clinicalPearls: [
        { id: 'tip-periorbital-am', title: 'Morning Periorbital Edema', text: 'Puffy eyes AM + normal feet = nephrotic.' },
        { id: 'tip-nephrotic-vs-agn', title: 'The One-Line Differentiator', text: 'Foamy + normal BP = nephrotic. Tea + HTN = AGN.' }
    ]
};
