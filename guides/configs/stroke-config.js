// Stroke Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-brain', title: 'Brain Anatomy' },
        { id: 'types', icon: 'fa-code-branch', title: 'Stroke Types' },
        { id: 'fast', icon: 'fa-bolt', title: 'FAST Assessment' },
        { id: 'tpa', icon: 'fa-syringe', title: 'tPA Criteria' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Interventions' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-clock', value: '4.5 hrs', label: 'tPA Window' },
        { type: 'critical', icon: 'fa-brain', value: '1.9M', label: 'Neurons lost/minute' },
        { type: 'target', icon: 'fa-heartbeat', value: '<185/110', label: 'BP before tPA' },
        { type: 'target', icon: 'fa-tachometer-alt', value: '<180/105', label: 'BP during/after tPA' },
        { type: 'success', icon: 'fa-stopwatch', value: '<60 min', label: 'Door-to-needle goal' },
        { type: 'time', icon: 'fa-syringe', value: '0.9 mg/kg', label: 'tPA dose (max 90mg)' }
    ],
    clinicalPearls: [
        { id: 'tip-time-brain', title: 'Time = Brain' },
        { id: 'tip-watch-afib', title: 'Watch for A-fib' },
        { id: 'tip-ct-before-tpa', title: 'CT Scan Before Clot-Busters!' },
        { id: 'tip-permissive-htn', title: 'Let the BP Stay High!' },
        { id: 'tip-npo-first', title: 'NPO First (Nothing By Mouth!)' }
    ]
};
