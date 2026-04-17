// Immune Deficiency, HIV & Anaphylaxis Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'fundamentals', icon: 'fa-shield-virus', title: 'Fundamentals' },
        { id: 'pid', icon: 'fa-dna', title: 'Primary Immune Deficiency' },
        { id: 'hiv', icon: 'fa-virus', title: 'Pediatric HIV' },
        { id: 'anaphylaxis', icon: 'fa-heart-pulse', title: 'Anaphylaxis' },
        { id: 'vaccines', icon: 'fa-syringe', title: 'Vaccines' },
        { id: 'nursing', icon: 'fa-user-nurse', title: 'Nursing Priorities' },
        { id: 'family', icon: 'fa-users', title: 'Family Education' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-syringe', value: '0.01 mg/kg', label: 'IM Epi Dose' },
        { type: 'warning', icon: 'fa-ban', value: 'NO live', label: 'Vaccines if Immunocomp.' },
        { type: 'target', icon: 'fa-thigh', value: 'Vastus lat.', label: 'Epi Injection Site' },
        { type: 'info', icon: 'fa-vial', value: 'PCR < 18mo', label: 'Infant HIV Test' },
        { type: 'success', icon: 'fa-chart-line', value: 'Undetectable', label: 'ART Viral Load Goal' },
        { type: 'time', icon: 'fa-clock', value: '4\u20138 hr', label: 'Biphasic Watch' }
    ],
    clinicalPearls: [
        { id: 'tip-infant-hiv-testing', title: 'PCR, Not Antibody', text: 'Maternal IgG confounds antibody tests until 18 mo.' },
        { id: 'tip-biphasic-observation', title: 'Biphasic Reaction Risk', text: 'Observe 4\u20138 hr; go home with 2 epi pens.' }
    ]
};
