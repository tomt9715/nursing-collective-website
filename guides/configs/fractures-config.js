// Fractures Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'anatomy', icon: 'fa-bone', title: 'Why bone behaves that way' },
        { id: 'fracture-types', icon: 'fa-code-branch', title: 'Naming the break' },
        { id: 'healing', icon: 'fa-heart-pulse', title: 'How it heals' },
        { id: 'assessment', icon: 'fa-stethoscope', title: "The 5 P's" },
        { id: 'compartment-syndrome', icon: 'fa-triangle-exclamation', title: 'Compartment syndrome' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do' },
        { id: 'complications', icon: 'fa-circle-exclamation', title: 'What goes wrong, and when' },
        { id: 'pediatrics', icon: 'fa-child', title: 'Children are not small adults' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-clock', value: '6 hrs', label: 'Compartment syndrome window' },
        { type: 'warning', icon: 'fa-hand-dots', value: "5 P's", label: 'Neurovascular check' },
        { type: 'success', icon: 'fa-stopwatch', value: 'q1-2h', label: 'Check frequency, first 48h' },
        { type: 'info', icon: 'fa-lungs', value: '24-72h', label: 'Fat embolism window' },
        { type: 'critical', icon: 'fa-syringe', value: '1 hr', label: 'Antibiotics, open fracture' },
        { type: 'target', icon: 'fa-bone', value: '6-8 wks', label: 'Typical healing time' }
    ],
    clinicalPearls: [
        { id: 'tip-5ps', title: 'Do Not Wait for the Other Four', text: 'Pain out of proportion, especially on passive stretch, is the first P. Pulselessness and paralysis mean you were late.' },
        { id: 'tip-compartment-emergency', title: 'Pulses Can Still Be There', text: 'Compartment pressure only has to beat capillary pressure, not arterial. A good pulse in a dying limb is common.' },
        { id: 'tip-pain-paradox', title: 'Pain That Breaks Through Is Data', text: 'Worsening pain despite adequate analgesia is an assessment finding, not a dosing problem. Reassess the limb.' },
        { id: 'tip-cast-care', title: 'Nothing Goes Inside the Cast', text: 'Coat hangers and pencils break skin you cannot see, inside a warm dark cast. Teach a hair dryer on cool instead.' },
        { id: 'tip-fat-embolism', title: 'Fat or Clot', text: 'Fat embolism at 24 to 72 hours brings confusion and petechiae. PE arrives suddenly with chest pain and no rash.' },
        { id: 'tip-growth-plate', title: 'The Number Is the Prognosis', text: 'Salter-Harris runs low to high with the risk to growth. I and II rarely matter; IV and V can shorten a limb.' }
    ]
};
