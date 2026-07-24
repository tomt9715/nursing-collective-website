// Rheumatic Fever & Infective Endocarditis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'rheumatic-fever', icon: 'fa-bacteria', title: 'Rheumatic fever or endocarditis' },
        { id: 'jones-criteria', icon: 'fa-clipboard-check', title: 'The Jones criteria' },
        { id: 'endocarditis', icon: 'fa-heart-crack', title: 'Infective endocarditis' },
        { id: 'ie-signs', icon: 'fa-hand-dots', title: 'The peripheral signs' },
        { id: 'treatment', icon: 'fa-syringe', title: 'First-line treatment' },
        { id: 'prophylaxis', icon: 'fa-shield-alt', title: 'Two kinds of prophylaxis' },
        { id: 'nursing-care', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'time', icon: 'fa-clock', value: '2-3 wk', label: 'RF after strep', section: 'rheumatic-fever' },
        { type: 'target', icon: 'fa-clipboard-check', value: '2 major', label: 'Jones threshold', section: 'jones-criteria' },
        { type: 'critical', icon: 'fa-vial', value: '3 sets', label: 'Cultures before antibiotics', section: 'treatment' },
        { type: 'time', icon: 'fa-syringe', value: '4-6 wk', label: 'IE IV antibiotics', section: 'treatment' },
        { type: 'warning', icon: 'fa-calendar', value: 'Monthly', label: 'RF secondary prophylaxis', section: 'prophylaxis' },
        { type: 'target', icon: 'fa-shield', value: '50 mg/kg', label: 'Amoxicillin before procedure', section: 'prophylaxis' }
    ],
    clinicalPearls: [
        { id: 'tip-strep-throat', title: 'Finish the Course', text: 'The strep M protein mimics heart, joints, skin, and brain. Clear the strep fully and the antibodies never start.' },
        { id: 'tip-jones', title: 'Two Major, or One Plus Two', text: 'Two major, or one major plus two minor, plus strep evidence. Do not skip the positive culture or rising ASO.' },
        { id: 'tip-osler-janeway', title: 'Sort by Pain, Then Place', text: 'Osler is painful on the tips. Janeway is painless on palms and soles. Roth is retina, splinters are nails.' },
        { id: 'tip-cultures-first', title: 'Cultures First', text: 'New murmur, fever, and an antibiotic order: draw three cultures from different sites before the first dose.' },
        { id: 'tip-two-prophylaxis', title: 'Two Prophylaxis, Do Not Blend Them', text: 'Monthly penicillin for years stops recurrence. One amoxicillin dose before a procedure protects a high-risk heart.' }
    ]
};
