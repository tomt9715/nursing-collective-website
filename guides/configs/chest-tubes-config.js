// Chest Tubes Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'pleural-space', icon: 'fa-lungs', title: 'Pleural Space' },
        { id: 'indications', icon: 'fa-clipboard-list', title: 'Indications' },
        { id: 'drainage-systems', icon: 'fa-box', title: 'Drainage Systems' },
        { id: 'tidaling-air-leaks', icon: 'fa-wave-square', title: 'Tidaling vs Air Leaks' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment' },
        { id: 'clamping', icon: 'fa-compress-alt', title: 'When to Clamp' },
        { id: 'complications', icon: 'fa-exclamation-triangle', title: 'Complications' },
        { id: 'removal', icon: 'fa-check-double', title: 'Removal' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-water', value: '2 cm', label: 'Water Seal Level' },
        { type: 'info', icon: 'fa-tachometer-alt', value: '-20 cm H2O', label: 'Typical Suction' },
        { type: 'critical', icon: 'fa-tint', value: '>100 mL/hr', label: 'Report Drainage' },
        { type: 'warning', icon: 'fa-ban', value: 'NEVER', label: 'Clamp with Air Leak' },
        { type: 'success', icon: 'fa-wave-square', value: 'Tidaling', label: 'Normal Finding' },
        { type: 'critical', icon: 'fa-arrow-down', value: 'Below Chest', label: 'System Position' }
    ],
    clinicalPearls: [
        { id: 'tip-negative-pressure', title: 'Negative Pressure', text: 'The pleural space normally has negative pressure that keeps lungs inflated. Chest tubes restore this by removing air/fluid.' },
        { id: 'tip-water-seal', title: 'Water Seal Chamber', text: 'Acts as one-way valve - air exits but can\'t return. Always maintain 2 cm water level!' },
        { id: 'tip-tidaling-vs-leak', title: 'Tidaling vs Air Leak', text: 'Tidaling = gentle rise/fall with breathing (normal). Air leak = bubbles in water seal (assess source!).' },
        { id: 'tip-never-clamp', title: 'Never Clamp Air Leaks', text: 'Clamping with an air leak traps air in pleural space → tension pneumothorax. When in doubt, don\'t clamp!' },
        { id: 'tip-tension-pneumo', title: 'Tension Pneumothorax', text: 'Emergency! Signs: tracheal deviation, absent breath sounds, JVD, hypotension. Unclamp tube immediately if clamped!' },
        { id: 'tip-valsalva', title: 'Valsalva for Removal', text: 'Patient holds breath and bears down during removal to prevent air entry. Apply occlusive dressing immediately.' }
    ]
};
