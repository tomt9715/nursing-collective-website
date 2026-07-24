// Pediatric Burns Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'fundamentals', icon: 'fa-fire', title: 'Why kids burn differently' },
        { id: 'depth', icon: 'fa-layer-group', title: 'How deep is it' },
        { id: 'bsa', icon: 'fa-ruler-combined', title: 'How much is burned' },
        { id: 'severity', icon: 'fa-triangle-exclamation', title: 'How severe, where it goes' },
        { id: 'emergency', icon: 'fa-truck-medical', title: 'The first hours' },
        { id: 'fluids', icon: 'fa-droplet', title: 'The fluid math' },
        { id: 'ongoing', icon: 'fa-bandage', title: 'After the first day' },
        { id: 'rehab', icon: 'fa-dumbbell', title: 'The long road back' },
        { id: 'family', icon: 'fa-users', title: 'Sending them home' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-calculator', value: '4 x kg x %TBSA', label: 'Parkland total LR', section: 'fluids' },
        { type: 'time', icon: 'fa-clock', value: '8 hr / 16 hr', label: 'Half, then half, from burn', section: 'fluids' },
        { type: 'success', icon: 'fa-droplet', value: '1-2 mL/kg/hr', label: 'Urine target under 30 kg', section: 'fluids' },
        { type: 'warning', icon: 'fa-child', value: '18% / 14%', label: 'Child head / leg BSA', section: 'bsa' },
        { type: 'critical', icon: 'fa-fire-flame-simple', value: 'Painless', label: 'Full-thickness clue', section: 'depth' },
        { type: 'info', icon: 'fa-temperature-high', value: '<120 F', label: 'Water heater safety', section: 'family' }
    ],
    clinicalPearls: [
        { id: 'tip-painless', title: 'Painless Equals Deep', text: 'A burn that does not hurt has lost its nerves. That points to full-thickness, and it needs grafting.' },
        { id: 'tip-kids-head', title: 'Big Heads, Small Legs', text: 'A young child head is near 18 percent, each leg 14 percent. Under-count it and you under-resuscitate.' },
        { id: 'tip-hypothermia', title: 'Cool Water, Not Ice', text: 'Ice worsens the injury. Use cool running water 15 to 20 minutes, then cover the child with warm dry sheets.' },
        { id: 'tip-urine-output', title: 'Urine Beats the Formula', text: 'Parkland is an estimate. Titrate to 1 to 2 mL/kg/hr of urine in a young child. Check it hourly.' },
        { id: 'tip-infection', title: 'Shock First, Then Infection', text: 'Shock kills in the first 48 hours. After that, infection takes over. Read the wound and the vitals together.' }
    ]
};
