// GI Bleeding Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'anatomy', icon: 'fa-code-branch', title: 'One ligament divides everything' },
        { id: 'types', icon: 'fa-not-equal', title: 'Upper or lower' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'How sick are they' },
        { id: 'diagnostics', icon: 'fa-microscope', title: 'Finding the source' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'medications', icon: 'fa-pills', title: 'The drugs' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-tint', value: '7 g/dL', label: 'Transfusion trigger' },
        { type: 'time', icon: 'fa-clock', value: '24 hrs', label: 'Endoscopy if stable' },
        { type: 'warning', icon: 'fa-heartbeat', value: '<90 mmHg', label: 'Systolic that means unstable' },
        { type: 'target', icon: 'fa-syringe', value: '2 x 18G', label: 'Large-bore IV access' },
        { type: 'info', icon: 'fa-pills', value: '80mg + 8mg/hr', label: 'High-dose PPI' },
        { type: 'critical', icon: 'fa-exclamation-triangle', value: '>100 bpm', label: 'The earliest sign' }
    ],
    clinicalPearls: [
        { id: 'tip-ligament-treitz', title: 'The Line That Picks the Scope', text: 'Above the ligament of Treitz means an EGD. Below it means a colonoscopy. Everything else follows.' },
        { id: 'tip-massive-ugib', title: 'Unstable and Red Means Look Up', text: 'Bright red blood in a hypotensive tachycardic patient is usually a fast upper bleed. Scope the top first.' },
        { id: 'tip-hgb-misleading', title: 'Concentration Does Not Change', text: 'Losing whole blood does not dilute what is left. The hemoglobin drops over 24 to 72 hours, not now.' },
        { id: 'tip-goal-uop', title: 'Urine Output Is Real-Time Perfusion', text: 'The kidneys lose perfusion early. Over 0.5 mL/kg/hr tells you the resuscitation is working, without a lab.' },
        { id: 'tip-restrictive-transfusion', title: 'More Blood Can Mean More Bleeding', text: 'Transfusion raises volume, volume raises portal pressure, and portal pressure drives a variceal bleed.' },
        { id: 'tip-hold-anticoagulants', title: 'Stopping Is Also a Risk', text: 'Every blood thinner was prescribed for a reason. A stent within 30 days is the detail that changes the answer.' }
    ]
};
