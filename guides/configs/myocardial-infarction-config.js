// Myocardial Infarction Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-heart', title: 'Coronary Anatomy' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Pathophysiology' },
        { id: 'stemi-nstemi', icon: 'fa-heartbeat', title: 'STEMI vs NSTEMI' },
        { id: 'biomarkers', icon: 'fa-vial', title: 'Cardiac Biomarkers' },
        { id: 'ekg', icon: 'fa-wave-square', title: 'EKG Changes' },
        { id: 'thrombolytics', icon: 'fa-syringe', title: 'Thrombolytics (tPA)' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Nursing Interventions' },
        { id: 'complications', icon: 'fa-exclamation-circle', title: 'Complications' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-clock', value: '<90 min', label: 'Door-to-balloon (PCI)' },
        { type: 'time', icon: 'fa-syringe', value: '<30 min', label: 'Door-to-needle (tPA)' },
        { type: 'success', icon: 'fa-pills', value: '162-325 mg', label: 'Aspirin dose (chewed)' },
        { type: 'time', icon: 'fa-vial', value: '2-4 hrs', label: 'Troponin rise time' },
        { type: 'warning', icon: 'fa-ban', value: 'SBP <90', label: 'Hold nitroglycerin if' },
        { type: 'info', icon: 'fa-lungs', value: 'SpO2 <90%', label: 'O2 only if hypoxic' }
    ],
    clinicalPearls: [
        { id: 'tip-time-is-muscle', title: 'Time is Muscle', text: 'Every minute of ischemia results in more myocardial cell death. Rapid reperfusion saves heart tissue.' },
        { id: 'tip-atypical-presentations', title: 'Atypical Presentations', text: 'Women, elderly, and diabetics may present without chest pain. Maintain high suspicion!' },
        { id: 'tip-serial-troponins', title: 'Serial Troponins', text: 'A single negative troponin does not rule out MI. Check at 0, 3-6, and sometimes 12 hours.' },
        { id: 'tip-rv-infarct', title: 'RV Infarct Triad', text: 'Hypotension + JVD + Clear lungs. Avoid nitrates and diuretics - these patients are preload-dependent.' },
        { id: 'tip-mona-b', title: 'MONA-B Therapy', text: 'Morphine, Oxygen (if needed), Nitroglycerin, Aspirin, Beta-blockers form the initial treatment approach.' },
        { id: 'tip-watch-for-vf', title: 'Watch for VF', text: 'Ventricular fibrillation is the leading cause of death in the first hour. Keep defibrillator ready.' }
    ]
};
