// Pediatric GERD Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'ger-vs-gerd', icon: 'fa-not-equal', title: 'GER vs GERD' },
        { id: 'red-flags', icon: 'fa-exclamation-triangle', title: 'Red Flags' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'Diagnosis' },
        { id: 'conservative', icon: 'fa-baby-carriage', title: 'Conservative Care' },
        { id: 'medications', icon: 'fa-pills', title: 'Meds & Surgery' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing & Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-baby', value: '2-4 mo', label: 'Peak GER Age' },
        { type: 'success', icon: 'fa-calendar-check', value: '12-18 mo', label: 'GER Resolves' },
        { type: 'target', icon: 'fa-utensils', value: '1 tsp/oz', label: 'Rice Cereal Thickener' },
        { type: 'warning', icon: 'fa-clock', value: '30-60 min', label: 'PPI Before Meal' },
        { type: 'critical', icon: 'fa-ban', value: 'No Prone', label: 'Infant Sleep' },
        { type: 'critical', icon: 'fa-circle-exclamation', value: 'Green', label: 'Bilious = ER' }
    ],
    clinicalPearls: [
        { id: 'tip-happy-spitter', title: 'The Happy Spitter Rule', text: 'Good weight gain + content = GER, not GERD.' },
        { id: 'tip-ppi-timing', title: 'PPIs Before Meals', text: "Give 30\u201360 min before eating for full effect." }
    ]
};
