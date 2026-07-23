// Stroke Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'anatomy', icon: 'fa-brain', title: 'Which artery, which deficit' },
        { id: 'types', icon: 'fa-code-branch', title: 'Clot or bleed' },
        { id: 'fast', icon: 'fa-clock', title: 'Spotting it, and the clock' },
        { id: 'tpa', icon: 'fa-syringe', title: 'Who gets tPA' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'medications', icon: 'fa-pills', title: 'The drugs' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-clock', value: '4.5 hrs', label: 'tPA window' },
        { type: 'critical', icon: 'fa-brain', value: '1.9M', label: 'Neurons lost per minute' },
        { type: 'target', icon: 'fa-heartbeat', value: '<185/110', label: 'BP before tPA' },
        { type: 'target', icon: 'fa-tachometer-alt', value: '<180/105', label: 'BP during and after' },
        { type: 'success', icon: 'fa-stopwatch', value: '<60 min', label: 'Door to needle' },
        { type: 'time', icon: 'fa-syringe', value: '0.9 mg/kg', label: 'tPA dose, max 90 mg' }
    ],
    clinicalPearls: [
        { id: 'tip-time-brain', title: 'Time = Brain', text: 'Ask the family what time they last saw the patient completely normal. That is the last known well, and it decides eligibility.' },
        { id: 'tip-watch-afib', title: 'Watch for Atrial Fibrillation', text: 'Finding A-fib changes prevention from an antiplatelet to an anticoagulant. Keep every stroke patient on the monitor.' },
        { id: 'tip-ct-before-tpa', title: 'CT Before the Clot-Buster', text: 'The scan rules out a bleed rather than ruling in a clot, which is why an early normal CT is still good enough to proceed.' },
        { id: 'tip-permissive-htn', title: 'Permissive Hypertension', text: 'In ischemic stroke without tPA, up to 220/120 is allowed. That pressure is what perfuses the penumbra.' },
        { id: 'tip-npo-first', title: 'Nothing By Mouth First', text: 'Up to 78 percent have dysphagia and cannot feel it. Nothing by mouth until the swallow screen, and tablets count.' }
    ]
};
