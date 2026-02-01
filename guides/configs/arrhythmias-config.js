// Arrhythmias Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'conduction', icon: 'fa-bolt', title: 'Conduction System' },
        { id: 'ecg-basics', icon: 'fa-wave-square', title: 'ECG Basics' },
        { id: 'sinus-rhythms', icon: 'fa-heart', title: 'Sinus Rhythms' },
        { id: 'atrial-rhythms', icon: 'fa-heartbeat', title: 'Atrial Arrhythmias' },
        { id: 'ventricular-rhythms', icon: 'fa-exclamation-triangle', title: 'Ventricular Arrhythmias' },
        { id: 'heart-blocks', icon: 'fa-ban', title: 'Heart Blocks' },
        { id: 'defib-cardiovert', icon: 'fa-bolt', title: 'Defib vs Cardiovert' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Nursing Interventions' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-heart', value: '60-100', label: 'SA Node Rate (bpm)' },
        { type: 'warning', icon: 'fa-circle', value: '40-60', label: 'AV Node Rate (bpm)' },
        { type: 'critical', icon: 'fa-exclamation', value: '20-40', label: 'Ventricle Rate (bpm)' },
        { type: 'time', icon: 'fa-ruler', value: '<0.12s', label: 'Normal QRS Width' },
        { type: 'success', icon: 'fa-clock', value: '0.12-0.20s', label: 'Normal PR Interval' },
        { type: 'info', icon: 'fa-bolt', value: '120-200J', label: 'Defib Energy (Biphasic)' }
    ],
    clinicalPearls: [
        { id: 'tip-pacemaker-hierarchy', title: 'Pacemaker Hierarchy', text: 'SA node (60-100) → AV node (40-60) → Ventricles (20-40). Lower pacemaker = slower rate, wider QRS.' },
        { id: 'tip-afib-stroke', title: 'A-Fib & Stroke Risk', text: 'Irregularly irregular rhythm with no P waves. Blood pools in atria forming clots - anticoagulation is critical!' },
        { id: 'tip-adenosine', title: 'Adenosine Technique', text: 'Half-life <10 seconds! Rapid IV push + 20mL flush. Use closest IV site to heart. Warn patient of brief discomfort.' },
        { id: 'tip-defib-vs-cardio', title: 'Defib vs Cardioversion', text: 'No pulse = Defibrillate. Has pulse but unstable = Synchronized Cardioversion. Remember the sync button!' },
        { id: 'tip-type1-vs-type2', title: 'Type I vs Type II Block', text: 'Type I: "Longer, longer, DROP!" Type II: "Same, same, DROP!" Type II is worse - often needs pacemaker.' }
    ]
};
