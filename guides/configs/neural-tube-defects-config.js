// Neural Tube Defects Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'overview', icon: 'fa-dna', title: 'Overview & Types' },
        { id: 'myelomeningocele', icon: 'fa-triangle-exclamation', title: 'Myelomeningocele' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Pre/Post-Op Care' },
        { id: 'complications', icon: 'fa-stethoscope', title: 'Long-Term Care' },
        { id: 'latex', icon: 'fa-ban', title: 'Latex Safety' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-pills', value: '400 mcg', label: 'Folic Acid Daily' },
        { type: 'critical', icon: 'fa-pills', value: '4 mg', label: 'High-Risk Dose' },
        { type: 'time', icon: 'fa-clock', value: '24-72 hr', label: 'Surgery Window' },
        { type: 'warning', icon: 'fa-bed', value: 'Prone', label: 'Pre-Op Position' },
        { type: 'critical', icon: 'fa-ban', value: 'Latex-Free', label: 'Lifelong' },
        { type: 'info', icon: 'fa-brain', value: '80-90%', label: 'Develop Hydrocephalus' }
    ],
    clinicalPearls: [
        { id: 'tip-folic-acid', title: 'Folic Acid Timing', text: 'Start before conception \u2014 tube closes by day 28.' },
        { id: 'tip-sac-care', title: 'Sac Care in 3 Words', text: 'Moist, prone, sterile. Get these right first.' }
    ]
};
