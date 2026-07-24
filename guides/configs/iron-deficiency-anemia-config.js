// Iron-Deficiency Anemia Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'fundamentals', icon: 'fa-apple-whole', title: 'How iron runs out' },
        { id: 'clinical', icon: 'fa-notes-medical', title: 'How it shows up' },
        { id: 'diagnosis', icon: 'fa-microscope', title: 'Which microcytic anemia' },
        { id: 'treatment', icon: 'fa-pills', title: 'First-line: oral iron' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family', icon: 'fa-users', title: 'What families need to hear' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-pills', value: '3-6 mg/kg/d', label: 'Oral iron dose', section: 'treatment' },
        { type: 'info', icon: 'fa-lemon', value: 'Vitamin C', label: 'Boosts absorption', section: 'treatment' },
        { type: 'warning', icon: 'fa-cow', value: '24 oz/d cap', label: 'Milk limit after age 1', section: 'family' },
        { type: 'success', icon: 'fa-calendar', value: '2-3 mo', label: 'Keep going after Hgb normal', section: 'treatment' },
        { type: 'critical', icon: 'fa-skull-crossbones', value: 'Deferoxamine', label: 'Iron overdose antidote', section: 'nursing' },
        { type: 'time', icon: 'fa-baby', value: '6-24 mo', label: 'Peak risk age', section: 'fundamentals' }
    ],
    clinicalPearls: [
        { id: 'tip-milk-cap', title: 'Cap the Milk', text: 'No cow’s milk before age 1, then hold it to 24 ounces a day. Too much milk is the classic cause.' },
        { id: 'tip-pallor-assessment', title: 'Assess Pallor Fairly', text: 'Skin color misleads in darker skin tones. Check the conjunctiva, palms, and nail beds instead.' },
        { id: 'tip-ferritin-first', title: 'Ferritin Drops First', text: 'Storage iron empties before hemoglobin falls. A low ferritin with a normal hemoglobin catches it early.' },
        { id: 'tip-iron-admin', title: 'The Straw Saves the Smile', text: 'Liquid iron stains teeth. Give it by straw or syringe, with vitamin C, between meals. Dark stool is normal.' }
    ]
};
