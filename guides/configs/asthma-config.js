// Asthma Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-lungs', title: 'Respiratory Anatomy' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Pathophysiology' },
        { id: 'severity', icon: 'fa-chart-bar', title: 'Severity Classification' },
        { id: 'medications', icon: 'fa-pills', title: 'Rescue vs Controller Meds' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Nursing Assessment' },
        { id: 'status-asthmaticus', icon: 'fa-exclamation-circle', title: 'Status Asthmaticus' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Interventions' },
        { id: 'education', icon: 'fa-chalkboard-teacher', title: 'Patient Education' },
        { id: 'pediatrics', icon: 'fa-child', title: 'Pediatric Considerations' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '≥92%', label: 'SpO2 Target (Asthma)' },
        { type: 'warning', icon: 'fa-exclamation-triangle', value: '<50%', label: 'Peak Flow Red Zone' },
        { type: 'critical', icon: 'fa-first-aid', value: 'SABA', label: 'First-Line Rescue' },
        { type: 'success', icon: 'fa-shield-alt', value: 'ICS', label: 'Most Effective Controller' },
        { type: 'info', icon: 'fa-calendar-day', value: '≤2/wk', label: 'SABA Use (Controlled)' },
        { type: 'critical', icon: 'fa-syringe', value: '2g IV', label: 'Magnesium (Severe)' }
    ],
    clinicalPearls: [
        { id: 'tip-identify-triggers', title: 'Identify Personal Triggers', text: 'Every asthma patient has unique triggers. Use a symptom diary to identify them and develop avoidance strategies.' },
        { id: 'tip-step-therapy', title: 'Step Therapy Approach', text: 'Step up treatment if not controlled after 2-6 weeks; step down after 3 months of good control.' },
        { id: 'tip-rescue-vs-controller', title: 'Rescue vs Controller', text: 'Rescue = fire extinguisher (quick relief). Controller = fireproof coating (prevention). Both are needed!' },
        { id: 'tip-ics-most-effective', title: 'ICS is Most Effective', text: 'Inhaled corticosteroids are the cornerstone of asthma treatment. Use daily even when feeling well.' },
        { id: 'tip-status-asthmaticus', title: 'Status Asthmaticus Signs', text: 'Silent chest, speaking only 1-2 words, peak flow <40%, lethargy = EMERGENCY. Escalate immediately!' },
        { id: 'tip-inhaler-technique', title: 'Assess Inhaler Technique', text: 'Up to 90% use inhalers incorrectly. Always have patients demonstrate technique before stepping up therapy.' },
        { id: 'tip-written-action-plan', title: 'Written Action Plan', text: 'Every patient needs a written plan with green/yellow/red zones. It reduces ER visits and hospitalizations.' },
        { id: 'tip-pediatric-inhaler', title: 'Spacers Are Essential for Children', text: 'ALWAYS use a spacer with MDIs in children! They cannot coordinate press-and-breathe. Use mask for under 4, mouthpiece for older kids.' }
    ]
};
