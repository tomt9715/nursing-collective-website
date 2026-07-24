// Neural Tube Defects Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'overview', icon: 'fa-dna', title: 'The spina bifida spectrum' },
        { id: 'myelomeningocele', icon: 'fa-triangle-exclamation', title: 'Myelomeningocele up close' },
        { id: 'complications', icon: 'fa-stethoscope', title: 'The complications that follow' },
        { id: 'latex', icon: 'fa-ban', title: 'The latex link' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'Nursing care, in order' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-pills', value: '400 mcg', label: 'Folic acid, all women', section: 'overview' },
        { type: 'critical', icon: 'fa-pills', value: '4 mg', label: 'Prior affected pregnancy', section: 'overview' },
        { type: 'time', icon: 'fa-clock', value: '24-72 hr', label: 'Sac closure window', section: 'nursing-care' },
        { type: 'warning', icon: 'fa-bed', value: 'Prone', label: 'Pre-op position', section: 'nursing-care' },
        { type: 'critical', icon: 'fa-ban', value: 'Latex-free', label: 'From birth, for life', section: 'latex' },
        { type: 'info', icon: 'fa-droplet', value: 'Every 3-4 hr', label: 'CIC schedule', section: 'complications' }
    ],
    clinicalPearls: [
        { id: 'tip-folic-acid', title: 'Folic acid runs on a clock', text: 'The tube closes by day 28. Folate has to be on board before conception, not after a test.' },
        { id: 'tip-hydrocephalus', title: 'The head tells you first', text: 'Rising head circumference and a bulging fontanelle are early ICP signs in an infant. Measure daily.' },
        { id: 'tip-cic', title: 'Empty on a schedule', text: 'A neurogenic bladder is drained every 3-4 hours with clean intermittent catheterization, not left to overflow.' },
        { id: 'tip-latex', title: 'Allergic until proven otherwise', text: 'Assume the latex allergy and build a latex-free world. Banana, avocado and kiwi cross-react.' },
        { id: 'tip-sac-care', title: 'Sac care in three words', text: 'Moist, prone, sterile. Get these right in the first 24 hours.' }
    ]
};
