// Pediatric GERD Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'ger-vs-gerd', icon: 'fa-not-equal', title: 'GER or GERD' },
        { id: 'red-flags', icon: 'fa-exclamation-triangle', title: 'When it is not reflux' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'Diagnosis' },
        { id: 'conservative', icon: 'fa-baby-carriage', title: 'Conservative care first' },
        { id: 'medications', icon: 'fa-pills', title: 'Meds and surgery' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'At the bedside' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-baby', value: '2-4 mo', label: 'Peak GER age', section: 'ger-vs-gerd' },
        { type: 'success', icon: 'fa-calendar-check', value: '12-18 mo', label: 'GER resolves by', section: 'ger-vs-gerd' },
        { type: 'target', icon: 'fa-utensils', value: '1 tsp/oz', label: 'Rice cereal thickener', section: 'conservative' },
        { type: 'warning', icon: 'fa-clock', value: '30-60 min', label: 'PPI before a meal', section: 'medications' },
        { type: 'critical', icon: 'fa-ban', value: 'No prone', label: 'Infant sleep', section: 'conservative' },
        { type: 'critical', icon: 'fa-circle-exclamation', value: 'Green', label: 'Bilious vomit is an emergency', section: 'red-flags' }
    ],
    clinicalPearls: [
        { id: 'tip-happy-spitter', title: 'The Happy Spitter Rule', text: 'Good weight gain and a content baby means GER, not GERD. The volume of spit-up does not matter.' },
        { id: 'tip-not-reflux', title: 'Green Means Surgery', text: 'Green vomit, or projectile vomiting at 2 to 8 weeks, is never reflux. Notify and work up, do not reassure.' },
        { id: 'tip-thicken-feeds', title: 'Thicken by the Ounce', text: '1 teaspoon of rice cereal per ounce of formula, then enlarge the nipple opening so it still flows.' },
        { id: 'tip-ppi-timing', title: 'PPIs Before Meals', text: 'Give a PPI 30 to 60 minutes before eating. On an empty stomach or after the meal, most of the dose is wasted.' }
    ]
};
