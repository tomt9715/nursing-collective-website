// Hypertension Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'overview', icon: 'fa-heartbeat', title: 'Understanding BP' },
        { id: 'classification', icon: 'fa-chart-bar', title: 'BP Classification' },
        { id: 'types', icon: 'fa-code-branch', title: 'Primary vs Secondary' },
        { id: 'complications', icon: 'fa-exclamation-circle', title: 'Target Organ Damage' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Nursing Assessment' },
        { id: 'lifestyle', icon: 'fa-apple-alt', title: 'Lifestyle Modifications' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' },
        { id: 'crisis', icon: 'fa-bolt', title: 'Hypertensive Crisis' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'success', icon: 'fa-check', value: '<120/80', label: 'Normal BP' },
        { type: 'warning', icon: 'fa-arrow-up', value: '130-139/80-89', label: 'Stage 1 HTN' },
        { type: 'critical', icon: 'fa-exclamation-triangle', value: '>=140/90', label: 'Stage 2 HTN' },
        { type: 'critical', icon: 'fa-bolt', value: '>180/120', label: 'Hypertensive Crisis' },
        { type: 'target', icon: 'fa-utensils', value: '<2,300 mg', label: 'Daily sodium limit' },
        { type: 'info', icon: 'fa-percentage', value: '25% MAP', label: 'Max drop in 1st hour' }
    ],
    clinicalPearls: [
        { id: 'tip-bp-equation', title: 'BP = CO x SVR', text: 'Understanding this equation helps you understand how antihypertensives work - they either decrease CO or SVR.' },
        { id: 'tip-classify-higher', title: 'Classify by Higher', text: 'When systolic and diastolic fall into different stages, always classify by the higher (more severe) category.' },
        { id: 'tip-secondary-clues', title: 'Secondary HTN Red Flags', text: 'Think secondary HTN if onset <30yo, sudden severe HTN, resistant to 3+ meds, or unexplained hypokalemia.' },
        { id: 'tip-lifestyle-priority', title: 'Lifestyle First', text: 'Combined lifestyle changes can lower SBP 20+ mmHg. For Stage 1 without high CV risk, try lifestyle alone first.' },
        { id: 'tip-ace-cough', title: 'ACE-I Cough Solution', text: 'Dry cough from ACE inhibitors? Switch to an ARB for similar benefits without the cough.' },
        { id: 'tip-dont-drop-fast', title: 'Slow and Steady', text: 'Dropping BP too fast can cause ischemic stroke, MI, or renal failure. Reduce MAP by only 25% in first hour.' }
    ]
};
