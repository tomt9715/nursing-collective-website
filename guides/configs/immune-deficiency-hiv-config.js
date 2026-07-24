// Immune Deficiency, HIV & Anaphylaxis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pid', icon: 'fa-dna', title: 'Primary or secondary' },
        { id: 'hiv', icon: 'fa-virus', title: 'Pediatric HIV' },
        { id: 'anaphylaxis', icon: 'fa-heart-pulse', title: 'Anaphylaxis or milder' },
        { id: 'vaccines', icon: 'fa-syringe', title: 'Live or inactivated' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'family', icon: 'fa-users', title: 'Send them home knowing' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-syringe', value: '0.01 mg/kg', label: 'IM epinephrine dose', section: 'anaphylaxis' },
        { type: 'target', icon: 'fa-location-dot', value: 'Vastus lat.', label: 'Epinephrine site', section: 'anaphylaxis' },
        { type: 'warning', icon: 'fa-ban', value: 'No live', label: 'Vaccines if immunocomp.', section: 'vaccines' },
        { type: 'info', icon: 'fa-vial', value: 'PCR < 18mo', label: 'Infant HIV test', section: 'hiv' },
        { type: 'success', icon: 'fa-chart-line', value: 'Undetectable', label: 'ART viral-load goal', section: 'hiv' },
        { type: 'time', icon: 'fa-clock', value: '4-8 hr', label: 'Biphasic observation', section: 'anaphylaxis' }
    ],
    clinicalPearls: [
        { id: 'tip-always-sick', title: '"Always Sick" Has a Pattern', text: 'Recurrent, severe, unusual infection plus failure to thrive points at primary immune deficiency.' },
        { id: 'tip-infant-hiv-testing', title: 'PCR, Not Antibody', text: 'Maternal IgG confounds antibody tests until about 18 months, so infants get HIV PCR.' },
        { id: 'tip-epi-first', title: 'The Antihistamine Is a Decoy', text: 'Diphenhydramine treats itch only. Wheeze or hypotension means IM epinephrine first.' },
        { id: 'tip-biphasic-observation', title: 'The Biphasic Catch', text: 'Symptoms can return hours later. Observe 4 to 8 hours and send home two epinephrine pens.' },
        { id: 'tip-no-live-vaccines', title: 'The Sibling Flu Shot', text: 'Household contacts get injectable flu, not the nasal spray, which is live and can shed.' },
        { id: 'tip-fever-response', title: 'A Fever Is an Emergency', text: 'An immunocompromised child may not mount a normal fever. Treat any temperature as urgent.' }
    ]
};
