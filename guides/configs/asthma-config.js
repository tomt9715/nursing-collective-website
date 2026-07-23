// Asthma Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'What is actually happening' },
        { id: 'severity', icon: 'fa-chart-bar', title: 'Where it lands' },
        { id: 'medications', icon: 'fa-pills', title: 'Rescue or controller' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment, in order' },
        { id: 'status-asthmaticus', icon: 'fa-exclamation-circle', title: 'When it stops responding' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'education', icon: 'fa-chalkboard-teacher', title: 'What the patient must do' },
        { id: 'pediatrics', icon: 'fa-child', title: 'Children are not small adults' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '>=92%', label: 'SpO2 target in asthma' },
        { type: 'warning', icon: 'fa-exclamation-triangle', value: '<50%', label: 'Peak flow red zone' },
        { type: 'critical', icon: 'fa-first-aid', value: 'SABA', label: 'First-line rescue' },
        { type: 'success', icon: 'fa-shield-alt', value: 'ICS', label: 'Best controller' },
        { type: 'info', icon: 'fa-calendar-day', value: '<=2/wk', label: 'SABA use when controlled' },
        { type: 'critical', icon: 'fa-syringe', value: '2 g IV', label: 'Magnesium in severe attack' }
    ],
    clinicalPearls: [
        { id: 'tip-identify-triggers', title: 'Identify Personal Triggers', text: 'A diary of symptoms, exposures and peak flows finds them. Beta-blockers and NSAIDs are the two patients never mention.' },
        { id: 'tip-step-therapy', title: 'Step Therapy', text: 'Step up after 2 to 6 weeks uncontrolled, step down after 3 months controlled. Check technique before stepping up.' },
        { id: 'tip-rescue-vs-controller', title: 'Rescue vs Controller', text: 'Rescue is the fire extinguisher, controller is the fireproofing. Neither does the other one job.' },
        { id: 'tip-ics-most-effective', title: 'ICS Is the Most Effective Controller', text: 'Works locally with little systemic effect, takes days to weeks, and is never used to rescue. Rinse after every dose.' },
        { id: 'tip-status-asthmaticus', title: 'Recognise Status Asthmaticus Early', text: 'Single words, tripod, peak flow under 40 percent, silent chest. Agitated turning sleepy is not the patient settling.' },
        { id: 'tip-inhaler-technique', title: 'Watch Them Use the Inhaler', text: 'Up to 90 percent get it wrong. Have them demonstrate rather than describe, before you step up the drugs.' },
        { id: 'tip-written-action-plan', title: 'Every Patient Needs a Written Plan', text: 'Written plans cut emergency visits; verbal instructions do not. Green, yellow, red, and who to call.' },
        { id: 'tip-pediatric-inhaler', title: 'Spacers Are Essential for Children', text: 'A child cannot coordinate press-and-breathe. Mask under 4, good seal, five or six breaths per puff.' }
    ]
};
