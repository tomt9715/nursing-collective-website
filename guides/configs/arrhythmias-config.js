// Arrhythmias Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'conduction', icon: 'fa-project-diagram', title: 'Where the beat comes from' },
        { id: 'ecg-basics', icon: 'fa-wave-square', title: 'Reading a strip in five steps' },
        { id: 'sinus-rhythms', icon: 'fa-heart', title: 'Sinus rhythms' },
        { id: 'atrial-rhythms', icon: 'fa-heartbeat', title: 'Above the ventricle' },
        { id: 'ventricular-rhythms', icon: 'fa-exclamation-triangle', title: 'Below the AV node' },
        { id: 'heart-blocks', icon: 'fa-ban', title: 'Where the signal stops' },
        { id: 'defib-cardiovert', icon: 'fa-bolt', title: 'Shock or sync' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-heart', value: '60-100', label: 'SA node rate (bpm)' },
        { type: 'warning', icon: 'fa-circle', value: '40-60', label: 'AV junction rate (bpm)' },
        { type: 'critical', icon: 'fa-exclamation', value: '20-40', label: 'Ventricular rate (bpm)' },
        { type: 'time', icon: 'fa-ruler', value: '<0.12s', label: 'Normal QRS width' },
        { type: 'success', icon: 'fa-clock', value: '0.12-0.20s', label: 'Normal PR interval' },
        { type: 'info', icon: 'fa-bolt', value: '120-200J', label: 'Defibrillation, biphasic' }
    ],
    clinicalPearls: [
        { id: 'tip-pacemaker-hierarchy', title: 'Pacemaker Hierarchy', text: 'SA node 60 to 100, AV junction 40 to 60, ventricles 20 to 40. Lower site means slower rate and wider QRS.' },
        { id: 'tip-afib-stroke', title: 'A-Fib Means Anticoagulation', text: 'Irregularly irregular with no P waves. Atria that quiver do not empty, so blood sits still and clots.' },
        { id: 'tip-adenosine', title: 'Adenosine Technique', text: 'Half-life under 10 seconds. Rapid push and a 20 mL flush as one motion, closest IV site to the heart.' },
        { id: 'tip-type1-vs-type2', title: 'Type I vs Type II Block', text: 'Longer, longer, drop is Type I. Same, same, drop is Type II. Atropine works on Type I only.' },
        { id: 'tip-defib-vs-cardio', title: 'Defib vs Cardioversion', text: 'No pulse is defibrillation. Pulse with instability is synchronized cardioversion, and the sync resets after every shock.' }
    ]
};
