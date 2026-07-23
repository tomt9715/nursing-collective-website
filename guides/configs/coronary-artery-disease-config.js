// Coronary Artery Disease Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'anatomy', icon: 'fa-heart', title: 'Which artery, which damage' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'How a plaque turns dangerous' },
        { id: 'risk-factors', icon: 'fa-sliders-h', title: 'What you can change' },
        { id: 'angina', icon: 'fa-heartbeat', title: 'Stable or unstable' },
        { id: 'diagnostics', icon: 'fa-stethoscope', title: 'Which test, and what cancels it' },
        { id: 'catheterization', icon: 'fa-syringe', title: 'The cath, before and after' },
        { id: 'management', icon: 'fa-pills', title: 'The drugs and the rehab' },
        { id: 'interventions', icon: 'fa-user-md', title: 'PCI or bypass' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-tint', value: 'LDL <70', label: 'High-risk goal (mg/dL)' },
        { type: 'critical', icon: 'fa-heartbeat', value: '<130/80', label: 'BP target (mmHg)' },
        { type: 'success', icon: 'fa-pills', value: '81 mg', label: 'Aspirin daily dose' },
        { type: 'time', icon: 'fa-clock', value: '5 min x3', label: 'NTG dosing interval' },
        { type: 'warning', icon: 'fa-bed', value: '2-6 hrs', label: 'Femoral cath bed rest' },
        { type: 'info', icon: 'fa-calendar', value: '6-12 mo', label: 'Minimum DAPT duration' }
    ],
    clinicalPearls: [
        { id: 'tip-plaque-stability', title: 'Stability Beats Size', text: 'The plaque that kills is rarely the biggest one. Statins stabilise the cap, which is why a patient at goal LDL stays on one.' },
        { id: 'tip-risk-factor-modification', title: 'Cessation Is the Strongest', text: 'Quitting smoking halves cardiovascular risk within one year. Nothing else moves risk that far that fast.' },
        { id: 'tip-angina-pattern', title: 'The Pattern Is the Finding', text: 'Rest pain, less exertion needed, longer episodes, nitroglycerin failing, or brand new angina. Any one means unstable.' },
        { id: 'tip-acs-continuum', title: 'Patients Move Along the Line', text: 'Stable angina plus new rest pain is unstable angina. Add a rising troponin and it is an NSTEMI.' },
        { id: 'tip-stress-test-caffeine', title: 'Caffeine Cancels the Test', text: 'Check tea, chocolate, energy drinks, cola, decaf and Excedrin. Inside the window means the test is rescheduled.' },
        { id: 'tip-stress-test-prep', title: 'Have the Reversal Ready', text: 'Crash cart, defibrillator and aminophylline go to the bedside before the adenosine runs, not after.' },
        { id: 'tip-cath-prep', title: 'Mark the Pulses', text: 'Mark dorsalis pedis and posterior tibial with a skin pen first. Afterwards you compare to a mark, not a memory.' },
        { id: 'tip-retroperitoneal-bleed', title: 'New Back Pain After a Cath', text: 'Back pain plus falling pressure after femoral access is a retroperitoneal bleed. There will be no visible blood.' },
        { id: 'tip-med-teaching', title: 'Sit Down First', text: 'Sit or lie down, one tablet, 5 minutes, up to three doses, call 911 at 15 minutes. Dark glass bottle, replaced every 6 months.' },
        { id: 'tip-cardiac-rehab-advocacy', title: 'Rehab Is a Referral Problem', text: 'Cuts mortality 20 to 30 percent, taken up by about 20 percent. Check the discharge paperwork for the referral.' },
        { id: 'tip-dapt-compliance', title: 'Never Stop DAPT Alone', text: 'The dentist who says hold the clopidogrel is the classic scenario. Call cardiology first; stent thrombosis kills 20 to 40 percent.' }
    ]
};
