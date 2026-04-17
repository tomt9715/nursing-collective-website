// Sickle Cell Crisis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-dna', title: 'Fundamentals' },
        { id: 'crisis-types', icon: 'fa-bolt', title: 'Crisis Types' },
        { id: 'triggers', icon: 'fa-fire', title: 'Triggers' },
        { id: 'clinical', icon: 'fa-notes-medical', title: 'Clinical Findings' },
        { id: 'diagnosis', icon: 'fa-microscope', title: 'Diagnosis' },
        { id: 'priority', icon: 'fa-truck-medical', title: 'Priority Care' },
        { id: 'transfusion', icon: 'fa-droplet', title: 'Transfusion' },
        { id: 'longterm', icon: 'fa-calendar-check', title: 'Long-Term Mgmt' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-temperature-high', value: '\u2265 101\u00b0F', label: 'Fever = ED Now' },
        { type: 'target', icon: 'fa-droplet', value: '1.5\u20132\u00d7 maint.', label: 'IV Hydration Rate' },
        { type: 'info', icon: 'fa-dna', value: 'HbSS', label: 'Full Disease Genotype' },
        { type: 'warning', icon: 'fa-wave-square', value: '> 200 cm/s', label: 'TCD Stroke Threshold' },
        { type: 'success', icon: 'fa-pills', value: 'Hydroxyurea', label: 'HbF Inducer' },
        { type: 'time', icon: 'fa-baby', value: '~6 mo', label: 'Symptoms Start Age' }
    ],
    clinicalPearls: [
        { id: 'tip-triggers', title: 'HHIDS Triggers', text: 'Hypoxia, Hydration loss, Infection, Decrease temp, Stress.' },
        { id: 'tip-hop-rest', title: 'HOPR Priorities', text: 'Hydration, Oxygen (if hypoxic), Pain, Rest.' }
    ]
};
