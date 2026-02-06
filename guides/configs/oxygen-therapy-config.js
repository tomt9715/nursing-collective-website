// Oxygen Therapy Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'physiology', icon: 'fa-lungs', title: 'O2 Physiology' },
        { id: 'indications', icon: 'fa-clipboard-check', title: 'Indications' },
        { id: 'delivery-devices', icon: 'fa-mask', title: 'Delivery Devices' },
        { id: 'fio2-calculations', icon: 'fa-calculator', title: 'FiO2 Calculations' },
        { id: 'special-populations', icon: 'fa-users', title: 'Special Populations' },
        { id: 'oxygen-toxicity', icon: 'fa-radiation', title: 'Oxygen Toxicity' },
        { id: 'nursing-considerations', icon: 'fa-user-nurse', title: 'Nursing Care' },
        { id: 'troubleshooting', icon: 'fa-tools', title: 'Troubleshooting' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '94-98%', label: 'Normal SpO2 Target' },
        { type: 'warning', icon: 'fa-lungs', value: '88-92%', label: 'COPD Target' },
        { type: 'critical', icon: 'fa-chart-line', value: '90/60', label: 'Critical Threshold' },
        { type: 'info', icon: 'fa-calculator', value: '+4%/L', label: 'NC FiO2 Rule' },
        { type: 'time', icon: 'fa-clock', value: '24-48h', label: 'Toxicity Risk (>50%)' },
        { type: 'success', icon: 'fa-mask', value: 'Venturi', label: 'Precise FiO2 Device' }
    ],
    clinicalPearls: [
        { id: 'tip-spo2-vs-pao2', title: 'SpO2 vs PaO2', text: 'SpO2 measures hemoglobin saturation; PaO2 measures dissolved oxygen. Both matter for tissue oxygenation.' },
        { id: 'tip-co-poisoning', title: 'CO Poisoning Warning', text: 'Pulse ox cannot detect CO poisoning - SpO2 may read normal despite severe hypoxia. Give 100% O2.' },
        { id: 'tip-low-vs-high-flow', title: 'Low vs High Flow', text: 'Low-flow devices have variable FiO2; high-flow devices (Venturi) deliver precise, consistent FiO2.' },
        { id: 'tip-venturi-copd', title: 'Venturi for COPD', text: 'Use Venturi mask for precise FiO2 control in CO2 retainers. Target SpO2 88-92% to preserve hypoxic drive.' },
        { id: 'tip-fio2-rule', title: 'The 4% Rule', text: 'Nasal cannula FiO2: 21% + (4% × L/min). Quick estimate but varies with breathing pattern.' },
        { id: 'tip-copd-targets', title: 'COPD: Don\'t Chase 100%', text: 'COPD patients don\'t need "normal" SpO2. Target 88-92% to avoid CO2 narcosis.' },
        { id: 'tip-toxicity-signs', title: 'Toxicity Warning Signs', text: 'Substernal chest pain, dry cough, worsening dyspnea despite O2 = early pulmonary oxygen toxicity.' },
        { id: 'tip-pulse-ox-false', title: 'Question the Pulse Ox', text: 'Poor perfusion, nail polish, motion, CO poisoning can cause false readings. Believe the patient, not the number.' }
    ]
};
