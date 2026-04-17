// Pediatric GI Obstructions Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'GI Assessment' },
        { id: 'pyloric', icon: 'fa-circle-notch', title: 'Pyloric Stenosis' },
        { id: 'intussusception', icon: 'fa-sync-alt', title: 'Intussusception' },
        { id: 'hirschsprung', icon: 'fa-ban', title: "Hirschsprung's" },
        { id: 'appendicitis', icon: 'fa-fire', title: 'Appendicitis' },
        { id: 'diagnostics', icon: 'fa-vial', title: 'Labs & Diagnostics' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing Care' },
        { id: 'medications', icon: 'fa-pills', title: 'Meds & Fluids' },
        { id: 'family-education', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-baby', value: '2-8 wk', label: 'Pyloric Age' },
        { type: 'time', icon: 'fa-baby', value: '5-9 mo', label: 'Intussusception Peak' },
        { type: 'critical', icon: 'fa-clock', value: '48 hr', label: 'Meconium Deadline' },
        { type: 'target', icon: 'fa-location-dot', value: "McBurney's", label: 'Appendix RLQ' },
        { type: 'warning', icon: 'fa-flask', value: 'Alkalosis', label: 'Pyloric Labs' },
        { type: 'success', icon: 'fa-tint', value: '20 mL/kg', label: 'NS Bolus' }
    ],
    clinicalPearls: [
        { id: 'tip-hungry-vomiter', title: 'The Hungry Vomiter', text: 'Pyloric baby cries for food right after vomiting.' },
        { id: 'tip-meconium', title: 'The 48-Hour Meconium Rule', text: 'No meconium by 48 hours = red flag for Hirschsprung.' },
        { id: 'tip-fluid-priority', title: 'Fluids First Saves Lives', text: 'Fix dehydration before any OR trip.' }
    ]
};
