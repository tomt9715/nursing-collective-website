// Cleft Lip & Palate Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'overview', icon: 'fa-face-smile', title: 'What the cleft is' },
        { id: 'feeding', icon: 'fa-baby-carriage', title: 'Feeding comes first' },
        { id: 'surgery', icon: 'fa-user-md', title: 'Surgery, in stages' },
        { id: 'post-op', icon: 'fa-hospital-user', title: 'Post-op: lip vs palate' },
        { id: 'associated', icon: 'fa-ear-listen', title: 'What follows for years' },
        { id: 'family-education', icon: 'fa-users', title: 'Working with the family' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-weight', value: '10/10/10', label: 'Rule of 10s', section: 'surgery' },
        { type: 'time', icon: 'fa-baby', value: '2-3 mo', label: 'Lip repair age', section: 'surgery' },
        { type: 'time', icon: 'fa-baby', value: '9-18 mo', label: 'Palate repair age', section: 'surgery' },
        { type: 'warning', icon: 'fa-bed', value: 'Supine', label: 'Position after lip', section: 'post-op' },
        { type: 'critical', icon: 'fa-bed', value: 'Prone', label: 'Position after palate', section: 'post-op' },
        { type: 'success', icon: 'fa-utensils', value: 'ESSR', label: 'Feeding technique', section: 'feeding' }
    ],
    clinicalPearls: [
        { id: 'tip-palpate-palate', title: 'Feel for the hidden cleft', text: 'An isolated cleft palate can pass a visual exam. A finger on the hard palate does not miss it.' },
        { id: 'tip-feeding-priority', title: 'Feeding is the path to surgery', text: 'A baby who cannot feed cannot meet the Rule of 10s. No weight gain means delayed surgery.' },
        { id: 'tip-rule-of-10s', title: '10, 10, 10', text: 'Ten weeks old, ten pounds, hemoglobin ten. All three have to pass before lip repair.' },
        { id: 'tip-positioning', title: 'Position by where the stitches are', text: 'Lip is outside, so supine. Palate is inside and needs drainage, so prone.' },
        { id: 'tip-airway-palate', title: 'Prone here is on purpose', text: 'After palate repair, prone lets blood and saliva drain and keeps the tongue off a swollen airway.' },
        { id: 'tip-otitis-chain', title: 'One chain to remember', text: 'Cleft palate leads to Eustachian tube dysfunction, ear infections, hearing loss, then speech delay.' },
        { id: 'tip-maternal-guilt', title: 'Validate, correct, then resource', text: 'When a parent blames herself: acknowledge the feeling, correct the misconception, then offer support.' }
    ]
};
