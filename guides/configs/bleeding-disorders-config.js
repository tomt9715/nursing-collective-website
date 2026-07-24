// Bleeding Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'hemophilia', icon: 'fa-dna', title: 'Hemophilia: deep bleeds' },
        { id: 'itp', icon: 'fa-dot-circle', title: 'ITP: surface bleeds' },
        { id: 'diagnosis', icon: 'fa-vial', title: 'The labs that decide it' },
        { id: 'treatment', icon: 'fa-syringe', title: 'Treatment and head injury' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family', icon: 'fa-users', title: 'Family education' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'warning', icon: 'fa-dna', value: 'X-linked', label: 'Hemophilia, boys', section: 'hemophilia' },
        { type: 'info', icon: 'fa-flask', value: 'Long PTT', label: 'Hemophilia lab', section: 'diagnosis' },
        { type: 'critical', icon: 'fa-dot-circle', value: '< 20k', label: 'ITP significant platelets', section: 'itp' },
        { type: 'critical', icon: 'fa-head-side-virus', value: 'Factor First', label: 'Head injury', section: 'treatment' },
        { type: 'success', icon: 'fa-syringe', value: 'IVIG', label: 'ITP fast treatment', section: 'treatment' },
        { type: 'time', icon: 'fa-calendar', value: '6 mo', label: 'Childhood ITP resolves', section: 'itp' }
    ],
    clinicalPearls: [
        { id: 'tip-deep-or-surface', title: 'Deep or Surface', text: 'Swollen joint in a boy is hemophilia. Pinpoint spots in a well child are ITP.' },
        { id: 'tip-eight-and-nine', title: 'A is 8, B is 9', text: 'Hemophilia A goes with factor VIII. Hemophilia B goes with factor IX.' },
        { id: 'tip-believe-the-aura', title: 'Believe the Aura', text: 'When he says the knee feels funny, start factor and RICE. Do not wait for swelling.' },
        { id: 'tip-well-child-post-viral', title: 'Well Child, Post-Viral', text: 'The ITP child looks well apart from the spots. Fever or a big spleen means work it up harder.' },
        { id: 'tip-labs-sort-abuse', title: 'Labs Sort It, Then Report', text: 'Normal coags plus a patterned bruise points to abuse. Reasonable concern is the trigger.' },
        { id: 'tip-factor-first', title: 'Factor First, Then Scan', text: 'After a hemophilia head injury, factor comes before the CT. The order is the test.' },
        { id: 'tip-transfusion-futile', title: 'Platelets Do Not Stick in ITP', text: 'Antibodies eat transfused platelets too. IVIG is the fast answer for serious bleeding.' },
        { id: 'tip-no-im', title: 'SubQ, Not IM', text: 'Vaccines go subcutaneously with firm pressure. An IM shot bleeds deep into muscle.' }
    ]
};
