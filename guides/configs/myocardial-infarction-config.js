// Myocardial Infarction Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'How the muscle dies' },
        { id: 'stemi-nstemi', icon: 'fa-heartbeat', title: 'Complete or partial' },
        { id: 'biomarkers', icon: 'fa-vial', title: 'Troponin and the clock' },
        { id: 'ekg', icon: 'fa-wave-square', title: 'Which wall died' },
        { id: 'thrombolytics', icon: 'fa-syringe', title: 'tPA, and who cannot' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'complications', icon: 'fa-exclamation-circle', title: 'What kills them, and when' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-clock', value: '<90 min', label: 'Door to balloon (PCI)' },
        { type: 'time', icon: 'fa-syringe', value: '<30 min', label: 'Door to needle (tPA)' },
        { type: 'success', icon: 'fa-pills', value: '162-325 mg', label: 'Aspirin, chewed' },
        { type: 'time', icon: 'fa-vial', value: '2-4 hrs', label: 'Troponin starts to rise' },
        { type: 'warning', icon: 'fa-ban', value: 'SBP <90', label: 'Hold nitroglycerin' },
        { type: 'info', icon: 'fa-lungs', value: 'SpO2 <90%', label: 'Oxygen only if under' }
    ],
    clinicalPearls: [
        { id: 'tip-time-is-muscle', title: 'Time is Muscle', text: 'Necrosis begins around 20 minutes into a total occlusion. The clock starts at symptom onset, not at arrival.' },
        { id: 'tip-atypical-presentations', title: 'Atypical Presentations', text: 'Women, older adults and people with diabetes often arrive without chest pain. Neuropathy is why diabetic MIs can be silent.' },
        { id: 'tip-serial-troponins', title: 'Serial Troponins', text: 'One negative troponin rules out nothing. Draw at 0, at 3 to 6 hours, sometimes at 12, and read the trend.' },
        { id: 'tip-rv-infarct', title: 'RV Infarct Triad', text: 'Hypotension, JVD, clear lungs. Give fluids and withhold nitrates and diuretics; the ventricle is preload dependent.' },
        { id: 'tip-mona-b', title: 'MONA-B Is a Set, Not a Sequence', text: 'Aspirin changes mortality and sits fourth. Oxygen sits second and most patients should not get it.' },
        { id: 'tip-watch-for-vf', title: 'Watch for VF', text: 'Ischemic muscle is electrically unstable. VF is what kills in the first hour, and defibrillation is the only treatment.' }
    ]
};
