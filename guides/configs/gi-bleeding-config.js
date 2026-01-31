// GI Bleeding Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'anatomy', icon: 'fa-lungs', title: 'GI Tract Anatomy' },
        { id: 'types', icon: 'fa-code-branch', title: 'Upper vs Lower GI' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment' },
        { id: 'diagnostics', icon: 'fa-microscope', title: 'Diagnostics' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Interventions' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-tint', value: '7 g/dL', label: 'Hgb transfusion trigger' },
        { type: 'time', icon: 'fa-clock', value: '24 hrs', label: 'Endoscopy (stable pt)' },
        { type: 'warning', icon: 'fa-heartbeat', value: '<90 mmHg', label: 'SBP = unstable' },
        { type: 'target', icon: 'fa-syringe', value: '2x 18G', label: 'Large-bore IV access' },
        { type: 'info', icon: 'fa-pills', value: '80mg + 8mg/hr', label: 'High-dose PPI' },
        { type: 'critical', icon: 'fa-exclamation-triangle', value: '>100 bpm', label: 'Tachycardia (early sign)' }
    ],
    clinicalPearls: [
        { id: 'tip-hgb-misleading', title: 'Initial Hgb Misleading', text: 'A normal initial hemoglobin does NOT rule out significant bleeding. Hemodilution takes 24-72 hours.' },
        { id: 'tip-ligament-treitz', title: 'Ligament of Treitz', text: 'The anatomical dividing line: above = UGIB, below = LGIB. Critical for determining workup.' },
        { id: 'tip-massive-ugib', title: 'Massive UGIB Exception', text: 'Brisk upper GI bleeding can cause hematochezia. If hemodynamically unstable with BRBPR, consider UGIB first.' },
        { id: 'tip-restrictive-transfusion', title: 'Restrictive Transfusion', text: 'Hgb trigger of 7 g/dL improves outcomes. Over-transfusion in variceal bleeding increases portal pressure.' },
        { id: 'tip-goal-uop', title: 'Goal UOP', text: 'Monitor for > 0.5 mL/kg/hr. Oliguria indicates inadequate resuscitation.' },
        { id: 'tip-hold-anticoagulants', title: 'Hold Anticoagulants', text: 'Stop anticoagulants and antiplatelets. Weigh bleeding risk vs thrombotic risk with the team.' }
    ]
};
