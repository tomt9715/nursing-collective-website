// Pediatric Burns Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-fire', title: 'Fundamentals' },
        { id: 'depth', icon: 'fa-layer-group', title: 'Burn Depth' },
        { id: 'bsa', icon: 'fa-ruler-combined', title: 'BSA Estimation' },
        { id: 'severity', icon: 'fa-triangle-exclamation', title: 'Severity & Transfer' },
        { id: 'emergency', icon: 'fa-truck-medical', title: 'Emergency Mgmt' },
        { id: 'fluids', icon: 'fa-droplet', title: 'Parkland & Fluids' },
        { id: 'ongoing', icon: 'fa-bandage', title: 'Ongoing Care' },
        { id: 'rehab', icon: 'fa-dumbbell', title: 'Rehabilitation' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-calculator', value: '4\u00d7kg\u00d7%TBSA', label: 'Parkland Formula' },
        { type: 'time', icon: 'fa-clock', value: '8 hr / 16 hr', label: 'Half, then Half' },
        { type: 'success', icon: 'fa-droplet', value: '1-2 mL/kg/hr', label: 'Pediatric UOP Target' },
        { type: 'warning', icon: 'fa-baby', value: '18% / 14%', label: 'Infant Head / Leg BSA' },
        { type: 'critical', icon: 'fa-fire-flame-simple', value: 'Painless', label: 'Full-Thickness Clue' },
        { type: 'info', icon: 'fa-temperature-high', value: '<120\u00b0F', label: 'Water Heater Safety' }
    ],
    clinicalPearls: [
        { id: 'tip-kids-head', title: 'Kids Have Big Heads', text: 'Infant head is 18% BSA, not 9%.' },
        { id: 'tip-hypothermia', title: 'Cool Water, Not Ice', text: 'Ice worsens damage. Cool running water, then warm blankets.' },
        { id: 'tip-urine-output', title: 'UOP > Formulas', text: 'Titrate to 1\u20132 mL/kg/hr in children.' }
    ]
};
