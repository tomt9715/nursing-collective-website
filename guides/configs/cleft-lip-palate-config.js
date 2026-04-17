// Cleft Lip & Palate Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'overview', icon: 'fa-face-smile', title: 'Overview & Types' },
        { id: 'feeding', icon: 'fa-baby-carriage', title: 'Feeding' },
        { id: 'surgery', icon: 'fa-user-md', title: 'Surgical Repair' },
        { id: 'post-op', icon: 'fa-hospital-user', title: 'Post-Op Care' },
        { id: 'associated', icon: 'fa-ear-listen', title: 'Associated Issues' },
        { id: 'family-education', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-weight', value: '10/10/10', label: 'Rule of 10s' },
        { type: 'time', icon: 'fa-baby', value: '2-3 mo', label: 'Lip Repair Age' },
        { type: 'time', icon: 'fa-baby', value: '9-18 mo', label: 'Palate Repair Age' },
        { type: 'warning', icon: 'fa-bed', value: 'Supine', label: 'Post-Lip Position' },
        { type: 'critical', icon: 'fa-bed', value: 'Prone', label: 'Post-Palate Position' },
        { type: 'success', icon: 'fa-utensils', value: 'ESSR', label: 'Feeding Technique' }
    ],
    clinicalPearls: [
        { id: 'tip-feeding-priority', title: 'Feeding = Path to Surgery', text: "Weight gain is what gets the baby to the OR." },
        { id: 'tip-positioning', title: 'Position by Suture Location', text: 'Lip outside \u2192 supine. Palate inside \u2192 prone.' }
    ]
};
