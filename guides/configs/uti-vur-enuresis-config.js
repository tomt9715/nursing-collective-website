// UTI, VUR & Enuresis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'uti', icon: 'fa-bacterium', title: 'Pediatric UTI' },
        { id: 'vur', icon: 'fa-arrows-up-down', title: 'VUR' },
        { id: 'enuresis', icon: 'fa-moon', title: 'Enuresis' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'Diagnosis & Workup' },
        { id: 'treatment', icon: 'fa-pills', title: 'Treatment' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing & Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-bacterium', value: 'E. coli', label: 'UTI Pathogen #1' },
        { type: 'warning', icon: 'fa-thermometer', value: 'Fever', label: 'Infant UTI Sign' },
        { type: 'target', icon: 'fa-x-ray', value: 'VCUG', label: 'VUR Gold Standard' },
        { type: 'success', icon: 'fa-calendar', value: 'Age 5', label: 'Enuresis Cutoff' },
        { type: 'target', icon: 'fa-bell', value: 'Alarm', label: 'Enuresis 1st-line' },
        { type: 'critical', icon: 'fa-ban', value: 'No Bag', label: 'Culture Sample' }
    ],
    clinicalPearls: [
        { id: 'tip-infant-fever', title: 'Fever Is the Infant UTI Sign', text: 'Any febrile infant w/o source needs UA + culture.' },
        { id: 'tip-secondary-enuresis', title: 'Secondary Enuresis = Red Flag', text: 'Was dry, now wet? Work up UTI, DM, constipation, stress.' }
    ]
};
