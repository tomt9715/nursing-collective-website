// Peripheral Vascular Disease Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'anatomy', icon: 'fa-heart', title: 'Two systems, one pump' },
        { id: 'arterial-venous', icon: 'fa-code-branch', title: 'Arterial or venous' },
        { id: 'pad', icon: 'fa-heartbeat', title: 'Peripheral arterial disease' },
        { id: 'abi', icon: 'fa-ruler', title: 'The one number' },
        { id: 'venous', icon: 'fa-water', title: 'When the valves give up' },
        { id: 'dvt', icon: 'fa-exclamation-circle', title: 'The clot that leaves' },
        { id: 'prevention', icon: 'fa-shield-alt', title: 'Stopping it before it starts' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-ruler', value: '1.0-1.3', label: 'Normal ABI range' },
        { type: 'critical', icon: 'fa-exclamation', value: '≤0.40', label: 'Critical limb ischemia' },
        { type: 'warning', icon: 'fa-calculator', value: '>1.30', label: 'Calcified vessels (unreliable)' },
        { type: 'time', icon: 'fa-clock', value: '4-6 hrs', label: 'Acute occlusion window' },
        { type: 'success', icon: 'fa-compress', value: '30-40', label: 'Compression mmHg (CVI)' },
        { type: 'info', icon: 'fa-pills', value: '3+ mo', label: 'DVT anticoag duration' }
    ],
    clinicalPearls: [
        { id: 'tip-pulse-locations', title: 'Compare Sides, Not Strength', text: 'A missing dorsalis pedis on its own proves little. A DP that is 2+ on one side and absent on the other proves a great deal.' },
        { id: 'tip-arterial-vs-venous', title: 'Ask What Elevation Does', text: 'Raising the leg hurts means arterial, so keep it down. Raising it helps means venous, so keep it up.' },
        { id: 'tip-claudication', title: 'Standing Still, Not Sitting', text: 'Vascular claudication stops on standing still. Pain that needs the patient to sit or lean forward is spinal stenosis.' },
        { id: 'tip-acute-occlusion', title: 'Sudden and Cold Means Call', text: 'The 6 P values with a 4 to 6 hour window. Notify the provider first; do not order an ABI on a limb that is already pulseless.' },
        { id: 'tip-abi-pearls', title: 'A Normal Resting ABI', text: 'If the history sounds like claudication but the resting ABI is normal, ask for an exercise ABI. A drop over 20 percent is significant.' },
        { id: 'tip-scd-compliance', title: 'Check the SCDs Every Entry', text: 'About 60 percent DVT reduction, but only while they are on and cycling. A device on the floor prevents nothing.' },
        { id: 'tip-hit', title: 'Falling Platelets Means Clotting', text: 'HIT causes thrombosis, not bleeding. A fall over 50 percent at 5 to 14 days means stop all heparin, including flushes.' },
        { id: 'tip-dvt-mobility', title: 'Walking Does Not Throw the Clot', text: 'Once therapeutically anticoagulated, early ambulation is safe and clears leg symptoms faster. Bed rest does not prevent PE.' }
    ]
};
