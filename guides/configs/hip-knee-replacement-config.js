// Hip & Knee Replacement Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-bone', title: 'Joint Anatomy' },
        { id: 'indications', icon: 'fa-clipboard-list', title: 'Indications & Types' },
        { id: 'preop', icon: 'fa-calendar-check', title: 'Preoperative Care' },
        { id: 'hip-precautions', icon: 'fa-exclamation-triangle', title: 'Hip Precautions' },
        { id: 'postop', icon: 'fa-procedures', title: 'Postoperative Care' },
        { id: 'dvt-prevention', icon: 'fa-shield-alt', title: 'DVT Prevention' },
        { id: 'mobility', icon: 'fa-walking', title: 'Mobility & Rehab' },
        { id: 'complications', icon: 'fa-circle-exclamation', title: 'Complications' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', value: '90°', label: 'Max hip flexion' },
        { type: 'warning', value: '6-12 wks', label: 'Hip precautions duration' },
        { type: 'time', value: 'POD 0-1', label: 'First ambulation' },
        { type: 'target', value: 'INR 2-3', label: 'Warfarin target (if used)' },
        { type: 'success', value: '30 sec', label: 'SCDs - remove max' },
        { type: 'info', value: '3-6 mo', label: 'Full recovery time' }
    ],
    clinicalPearls: [
        { id: 'tip-hip-precautions', title: 'The Big Three Hip Rules' },
        { id: 'tip-posterior-vs-anterior', title: 'Posterior vs Anterior Approach' },
        { id: 'tip-dvt-prevention', title: 'DVT Prevention is Critical' },
        { id: 'tip-first-ambulation', title: 'Get Them Moving Early' },
        { id: 'tip-infection-signs', title: 'Watch for Infection' }
    ]
};
