// Pediatric GI Obstructions Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pyloric', icon: 'fa-circle-notch', title: 'Pyloric stenosis' },
        { id: 'intussusception', icon: 'fa-sync-alt', title: 'Intussusception' },
        { id: 'hirschsprung', icon: 'fa-ban', title: 'Hirschsprung disease' },
        { id: 'appendicitis', icon: 'fa-fire', title: 'Appendicitis' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'GI assessment' },
        { id: 'medications', icon: 'fa-pills', title: 'Meds and fluids' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing care' },
        { id: 'family-education', icon: 'fa-users', title: 'Family education' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-baby', value: '2-8 wk', label: 'Pyloric window', section: 'pyloric' },
        { type: 'time', icon: 'fa-baby', value: '5-9 mo', label: 'Intussusception peak', section: 'intussusception' },
        { type: 'critical', icon: 'fa-clock', value: '48 hr', label: 'Meconium deadline', section: 'hirschsprung' },
        { type: 'target', icon: 'fa-location-dot', value: "McBurney", label: 'Appendix pain', section: 'appendicitis' },
        { type: 'warning', icon: 'fa-flask', value: 'Alkalosis', label: 'Pyloric labs, fix first', section: 'pyloric' },
        { type: 'success', icon: 'fa-tint', value: '20 mL/kg', label: 'NS bolus', section: 'medications' }
    ],
    clinicalPearls: [
        { id: 'tip-hungry-vomiter', title: 'The Hungry Vomiter', text: 'The pyloric baby vomits and cries for the next feed at once.' },
        { id: 'tip-enema-fixes', title: 'The Enema Does Double Duty', text: 'In intussusception the contrast enema both finds it and fixes it.' },
        { id: 'tip-meconium', title: 'The 48-Hour Meconium Rule', text: 'No meconium by 48 hours is a red flag for Hirschsprung.' },
        { id: 'tip-no-heat', title: 'Three Things You Never Do Pre-Op', text: 'No heat, no enema, no laxative in suspected appendicitis.' },
        { id: 'tip-fluid-priority', title: 'Fluids First Saves Lives', text: 'Fix dehydration and electrolytes before any trip to the operating room.' }
    ]
};
