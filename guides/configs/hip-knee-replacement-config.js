// Hip & Knee Replacement Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'hip-precautions', icon: 'fa-exclamation-triangle', title: 'Hip precautions' },
        { id: 'dvt-prevention', icon: 'fa-shield-alt', title: 'DVT prevention' },
        { id: 'complications', icon: 'fa-circle-exclamation', title: 'Complications' },
        { id: 'postop', icon: 'fa-procedures', title: 'Postoperative care' },
        { id: 'mobility', icon: 'fa-walking', title: 'Mobility and rehab' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-angle-up', value: '90 deg', label: 'Max posterior hip flexion', section: 'hip-precautions' },
        { type: 'warning', icon: 'fa-calendar', value: '6-12 wks', label: 'Precautions duration', section: 'hip-precautions' },
        { type: 'critical', icon: 'fa-ruler-horizontal', value: '3 cm', label: 'Calf difference, suspect DVT', section: 'dvt-prevention' },
        { type: 'target', icon: 'fa-tint', value: 'INR 2-3', label: 'Warfarin target', section: 'dvt-prevention' },
        { type: 'time', icon: 'fa-walking', value: 'POD 0-1', label: 'First ambulation', section: 'mobility' },
        { type: 'info', icon: 'fa-tooth', value: '2 g', label: 'Amoxicillin before dental', section: 'complications' }
    ],
    clinicalPearls: [
        { id: 'tip-hip-precautions', title: 'The Big Three, posterior', text: 'Posterior hip: no flexion past 90 degrees, no crossing, no internal rotation. Teach nose over toes. Abduction pillow in bed.' },
        { id: 'tip-posterior-vs-anterior', title: 'Approach decides the rules', text: 'Posterior means do not push the hip backward. Anterior means do not push it forward. Check the operative report before you teach.' },
        { id: 'tip-dvt-prevention', title: 'Fight the stasis', text: 'Surgery gives you vessel injury and hypercoagulability. You fight stasis. SCDs on, blood thinner in, patient moving.' },
        { id: 'tip-first-ambulation', title: 'Get them up, safely', text: 'Pre-medicate before therapy. Check the block; if the foot cannot move, wait. Gait belt, dangle first. A fall is worse than waiting.' },
        { id: 'tip-infection-signs', title: 'Infection can come back', text: 'Fever, rest pain, drainage past day 3 to 5, spreading redness. It can seed years later, so dental antibiotics are for life.' }
    ]
};
