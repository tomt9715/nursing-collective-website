// Assessment Skills Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'introduction', icon: 'fa-stethoscope', title: 'Introduction to Assessment' },
        { id: 'data-collection', icon: 'fa-database', title: 'Data Collection Methods' },
        { id: 'vital-signs', icon: 'fa-heartbeat', title: 'Vital Signs Assessment' },
        { id: 'head-to-toe', icon: 'fa-user', title: 'Head-to-Toe Assessment' },
        { id: 'focused-assessment', icon: 'fa-search', title: 'Focused Assessment' },
        { id: 'documentation', icon: 'fa-file-medical', title: 'Documentation Techniques' },
        { id: 'critical-findings', icon: 'fa-exclamation-circle', title: 'Critical Findings' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-heartbeat', value: '60-100', label: 'Normal HR (bpm)' },
        { type: 'target', icon: 'fa-lungs', value: '12-20', label: 'Normal RR (/min)' },
        { type: 'target', icon: 'fa-tachometer-alt', value: '<120/80', label: 'Normal BP (mmHg)' },
        { type: 'target', icon: 'fa-percent', value: '95-100%', label: 'Normal SpO2' },
        { type: 'critical', icon: 'fa-thermometer-half', value: '>100.4°F', label: 'Fever threshold' },
        { type: 'warning', icon: 'fa-clock', value: '<3 sec', label: 'Cap refill normal' },
        { type: 'info', icon: 'fa-wave-square', value: '5-30/min', label: 'Normal bowel sounds' },
        { type: 'info', icon: 'fa-eye', value: '3-5mm', label: 'Normal pupil size' }
    ],
    clinicalPearls: [
        { id: 'tip-ippa-order', title: 'IPPA Order', text: 'Inspect, Palpate, Percuss, Auscultate. Exception: Abdomen - auscultate BEFORE palpation to avoid altering bowel sounds.' },
        { id: 'tip-pqrst', title: 'Pain Assessment: PQRST', text: 'Provokes/Palliates, Quality, Radiates, Severity (0-10), Timing - complete pain evaluation.' },
        { id: 'tip-trends-over-values', title: 'Trends Over Single Values', text: 'A single vital sign provides limited info. Compare trends over time to the patient\'s baseline.' },
        { id: 'tip-document-objectively', title: 'Document Objectively', text: '"If it wasn\'t documented, it wasn\'t done." Use measurable terms, avoid vague language.' },
        { id: 'tip-sbar', title: 'SBAR Communication', text: 'Situation, Background, Assessment, Recommendation - use this format when calling providers.' },
        { id: 'tip-trust-your-gut', title: 'Trust Your Gut', text: '"Worried about the patient" is a valid reason to call Rapid Response - trust your nursing instincts.' }
    ]
};
