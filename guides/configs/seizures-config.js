// Seizures & Epilepsy Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-brain', title: 'Why a brain seizes' },
        { id: 'classification', icon: 'fa-sitemap', title: 'Focal or generalized' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'What you watch and write' },
        { id: 'status-epilepticus', icon: 'fa-exclamation-triangle', title: 'When it does not stop' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'medications', icon: 'fa-pills', title: 'The drugs and their levels' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Children are not small adults' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-clock', value: '5 min', label: 'Status epilepticus' },
        { type: 'target', icon: 'fa-pills', value: '10-20', label: 'Phenytoin level (mcg/mL)' },
        { type: 'target', icon: 'fa-pills', value: '50-100', label: 'Valproic acid level' },
        { type: 'time', icon: 'fa-syringe', value: '4 mg IV', label: 'Lorazepam, first line' },
        { type: 'success', icon: 'fa-shield-alt', value: 'Side', label: 'Recovery position' },
        { type: 'critical', icon: 'fa-ban', value: 'Never', label: 'Stop an AED abruptly' }
    ],
    clinicalPearls: [
        { id: 'tip-med-compliance', title: 'Missed Medication Is the Leading Trigger', text: 'Ask about the tablets first after a breakthrough seizure. Seizure-free does not mean epilepsy-free.' },
        { id: 'tip-aura-warning', title: 'An Aura Is Already the Seizure', text: 'It is a focal aware seizure happening before it spreads, so document what it felt like. It helps localise the focus.' },
        { id: 'tip-document-everything', title: 'Your Observation Is the Diagnostic Test', text: 'What moved first, did it start on one side, was the patient aware, how long. That decides the classification.' },
        { id: 'tip-time-seizure', title: 'Five Minutes Means Call', text: 'Most seizures stop inside 1 to 2 minutes. Past 5 it is status epilepticus. Use a clock, not a judgement.' },
        { id: 'tip-nothing-in-mouth', title: 'Nothing in the Mouth', text: 'Swallowing your own tongue is not possible. Objects break teeth, tear tissue, and get aspirated.' },
        { id: 'tip-never-stop-abruptly', title: 'Never Stop Them Suddenly', text: 'Abrupt withdrawal is a leading cause of status epilepticus. Always taper under guidance.' }
    ]
};
