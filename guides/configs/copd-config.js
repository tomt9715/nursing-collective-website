// COPD Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'anatomy', icon: 'fa-lungs', title: 'Respiratory Anatomy' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Pathophysiology' },
        { id: 'bronchitis-emphysema', icon: 'fa-columns', title: 'Bronchitis vs Emphysema' },
        { id: 'oxygen-therapy', icon: 'fa-wind', title: 'O2 Therapy & CO2' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Nursing Assessment' },
        { id: 'breathing-techniques', icon: 'fa-wind', title: 'Breathing Techniques' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Interventions' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '88-92%', label: 'SpO2 Target (COPD)' },
        { type: 'critical', icon: 'fa-tachometer-alt', value: '1-2 L/min', label: 'Low-Flow O2 Rate' },
        { type: 'warning', icon: 'fa-exclamation-triangle', value: '<70%', label: 'FEV1/FVC Ratio' },
        { type: 'info', icon: 'fa-lungs', value: '1:2', label: 'Pursed-Lip Ratio' },
        { type: 'critical', icon: 'fa-head-side-cough', value: '50-70', label: 'PaCO2 (Chronic)' },
        { type: 'success', icon: 'fa-mask-face', value: 'Venturi', label: 'Precise FiO2 Control' }
    ],
    clinicalPearls: [
        { id: 'tip-blue-bloater', title: 'Blue Bloater vs Pink Puffer', text: 'Chronic bronchitis = blue, edematous, productive cough. Emphysema = thin, barrel chest, dyspneic.' },
        { id: 'tip-low-flow-first', title: 'Low-Flow First', text: 'Always start with 1-2 L/min via nasal cannula for chronic CO2 retainers to avoid suppressing hypoxic drive.' },
        { id: 'tip-co2-narcosis', title: 'Watch for CO2 Narcosis', text: 'Confusion, decreased LOC, flushed skin, and asterixis signal CO2 retention. Reduce O2 and notify provider STAT.' },
        { id: 'tip-pursed-lip', title: 'Pursed-Lip Breathing', text: 'Inhale 2 counts through nose, exhale 4 counts through pursed lips. Creates back-pressure to keep airways open.' },
        { id: 'tip-rinse-after-ics', title: 'Rinse After ICS', text: 'Always rinse mouth after inhaled corticosteroids to prevent oral thrush and hoarseness.' },
        { id: 'tip-bronchodilators-first', title: 'Bronchodilators Before Steroids', text: 'When using multiple inhalers, use SABA first to open airways, then LABA, then ICS last for better deposition.' }
    ]
};
