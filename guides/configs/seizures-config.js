// Seizures & Epilepsy Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'pathophysiology', icon: 'fa-brain', title: 'Pathophysiology' },
        { id: 'classification', icon: 'fa-sitemap', title: 'Classification' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment' },
        { id: 'status-epilepticus', icon: 'fa-exclamation-triangle', title: 'Status Epilepticus' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Interventions' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Pediatric' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-clock', value: '5 min', label: 'Status Epilepticus' },
        { type: 'target', icon: 'fa-pills', value: '10-20', label: 'Phenytoin Level (mcg/mL)' },
        { type: 'target', icon: 'fa-pills', value: '50-100', label: 'Valproic Acid Level' },
        { type: 'time', icon: 'fa-syringe', value: '4 mg IV', label: 'Lorazepam (1st line SE)' },
        { type: 'success', icon: 'fa-shield-alt', value: 'Side', label: 'Recovery Position' },
        { type: 'critical', icon: 'fa-ban', value: 'NEVER', label: 'Stop AEDs Abruptly' }
    ],
    clinicalPearls: [
        { id: 'tip-med-compliance', title: 'Med Non-Compliance = #1 Trigger' },
        { id: 'tip-aura-warning', title: 'Auras Are Focal Seizures' },
        { id: 'tip-document-everything', title: 'Document Everything You See' },
        { id: 'tip-time-seizure', title: '5 Minutes = Call for Help' },
        { id: 'tip-nothing-in-mouth', title: 'Nothing in the Mouth!' },
        { id: 'tip-never-stop-abruptly', title: 'Never Stop AEDs Abruptly' }
    ]
};
