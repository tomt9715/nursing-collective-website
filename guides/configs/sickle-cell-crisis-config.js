// Sickle Cell Crisis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'fundamentals', icon: 'fa-dna', title: 'What sickling is' },
        { id: 'clinical', icon: 'fa-notes-medical', title: 'At the bedside' },
        { id: 'crisis-types', icon: 'fa-code-branch', title: 'Tell the crises apart' },
        { id: 'triggers', icon: 'fa-fire', title: 'What sets it off' },
        { id: 'priority', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'transfusion', icon: 'fa-droplet', title: 'Blood and the reaction' },
        { id: 'longterm', icon: 'fa-calendar-check', title: 'Preventing the next crisis' },
        { id: 'family', icon: 'fa-users', title: 'At home' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-temperature-high', value: '101°F', label: 'Fever = ED now', section: 'clinical' },
        { type: 'target', icon: 'fa-droplet', value: '1.5-2x maint.', label: 'IV hydration rate', section: 'priority' },
        { type: 'info', icon: 'fa-wave-square', value: '> 200 cm/s', label: 'TCD starts transfusion', section: 'longterm' },
        { type: 'warning', icon: 'fa-arrow-down', value: 'Low retics', label: 'Points to aplastic', section: 'crisis-types' },
        { type: 'success', icon: 'fa-pills', value: 'Hydroxyurea', label: 'Raises HbF', section: 'longterm' },
        { type: 'critical', icon: 'fa-hand-paper', value: 'Stop first', label: 'Transfusion reaction', section: 'transfusion' }
    ],
    clinicalPearls: [
        { id: 'tip-fever-emergency', title: 'Fever = cultures + ceftriaxone', text: 'At or above 101 F this is a septic-until-proven child. Cultures first, then IV ceftriaxone within the hour.' },
        { id: 'tip-retic-split', title: 'Reticulocytes split the crises', text: 'High retics mean the marrow is compensating. Low retics point at aplastic crisis and parvovirus B19.' },
        { id: 'tip-acs-first', title: 'Presume ACS', text: 'New chest pain, hypoxia, or an infiltrate is acute chest syndrome until proven otherwise. Oxygen and antibiotics go in early.' },
        { id: 'tip-hhids', title: 'Memorize HHIDS', text: 'Hypoxia, Hydration loss, Infection, Decrease in temperature, Stress. Most family teaching is preventing HHIDS.' },
        { id: 'tip-hopr', title: 'Think HOPR', text: 'Hydration at 1.5 to 2 times maintenance, Oxygen if hypoxic, Pain control with scheduled opioids, Rest. Warm not cold.' },
        { id: 'tip-stop-transfusion', title: 'Stop, save the line, call, send', text: 'First action is always to stop the transfusion. Then saline through new tubing. Never flush the old tubing.' }
    ]
};
