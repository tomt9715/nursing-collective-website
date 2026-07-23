// UTI & Pyelonephritis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment and the workup' },
        { id: 'pathway', icon: 'fa-route', title: 'How it climbs' },
        { id: 'lower-uti', icon: 'fa-droplet', title: 'The bladder' },
        { id: 'pyelonephritis', icon: 'fa-fire', title: 'The kidney' },
        { id: 'compare', icon: 'fa-not-equal', title: 'Lower or upper' },
        { id: 'cauti', icon: 'fa-syringe', title: 'The one you cause' },
        { id: 'urosepsis', icon: 'fa-triangle-exclamation', title: 'Urosepsis' },
        { id: 'education', icon: 'fa-users', title: 'What you teach' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-pills', value: '5-7 days', label: 'Lower UTI course' },
        { type: 'time', icon: 'fa-hospital', value: '~2 wks', label: 'Pyelonephritis course' },
        { type: 'target', icon: 'fa-glass-water', value: '8-10', label: 'Glasses of water daily' },
        { type: 'warning', icon: 'fa-toilet', value: 'q2-3h', label: 'Voiding frequency' },
        { type: 'critical', icon: 'fa-triangle-exclamation', value: 'CVA+', label: 'Points at the kidney' },
        { type: 'critical', icon: 'fa-droplet', value: '<0.5 mL/kg/hr', label: 'Oliguria' }
    ],
    clinicalPearls: [
        { id: 'tip-burning-vs-flank', title: 'The One-Line Differentiator', text: 'Burning and frequency with no fever is the bladder. Add fever, flank pain and CVA tenderness and it is the kidney.' },
        { id: 'tip-remove-the-catheter', title: 'Ask Why It Is Still In', text: 'Most catheters that cause infection were placed for a reason that expired days ago. Convenience is not an indication.' },
        { id: 'tip-full-course', title: 'Why Finishing Matters', text: 'Stopping when the burning stops leaves the hardier bacteria behind. Those are the ones that come back resistant.' }
    ]
};
