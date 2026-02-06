// Tuberculosis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-lungs', title: 'Respiratory Anatomy' },
        { id: 'pathophysiology', icon: 'fa-virus', title: 'TB Pathophysiology' },
        { id: 'latent-vs-active', icon: 'fa-balance-scale', title: 'Latent vs Active TB' },
        { id: 'clinical-manifestations', icon: 'fa-notes-medical', title: 'Clinical Manifestations' },
        { id: 'diagnostics', icon: 'fa-vial', title: 'Diagnostic Testing' },
        { id: 'isolation', icon: 'fa-shield-virus', title: 'Airborne Isolation' },
        { id: 'ripe-therapy', icon: 'fa-pills', title: 'RIPE Therapy' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing Care' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-head-side-mask', value: 'N95', label: 'Required Respirator' },
        { type: 'warning', icon: 'fa-clock', value: '48-72 hrs', label: 'TST Read Window' },
        { type: 'info', icon: 'fa-pills', value: 'RIPE', label: 'First-Line Therapy' },
        { type: 'target', icon: 'fa-calendar', value: '6 months', label: 'Min Treatment Duration' },
        { type: 'critical', icon: 'fa-vial', value: '3 specimens', label: 'Sputum AFB Required' },
        { type: 'success', icon: 'fa-capsules', value: 'Pyridoxine', label: 'Give with INH' }
    ],
    clinicalPearls: [
        { id: 'tip-granuloma', title: 'Understanding Granulomas', text: 'Granulomas are "prisons" for TB bacteria - they contain but don\'t kill all bacilli, allowing dormancy for decades.' },
        { id: 'tip-latent-active', title: 'Latent vs Active', text: 'Latent TB = NOT contagious, no symptoms. Active TB = CONTAGIOUS, needs isolation immediately.' },
        { id: 'tip-tst-reading', title: 'TST Reading', text: 'Measure INDURATION (raised area), not redness! Read within 48-72 hours. Cut-offs vary by risk factors.' },
        { id: 'tip-n95-fit', title: 'N95 Respirator', text: 'Surgical masks are NOT adequate for TB. N95 must be fit-tested and seal-checked each use.' },
        { id: 'tip-ripe-monitoring', title: 'RIPE Monitoring', text: 'RIP = hepatotoxic (monitor LFTs). Ethambutol = optic neuritis (check vision). Give B6 with isoniazid.' },
        { id: 'tip-adherence', title: 'Treatment Adherence', text: 'Stopping early causes drug resistance! Complete FULL 6-month course even when feeling better.' }
    ]
};
