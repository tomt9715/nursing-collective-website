// Psychotropic Medications Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'antipsychotics', icon: 'fa-brain', title: 'Antipsychotics' },
        { id: 'movement', icon: 'fa-person-walking', title: 'Four movement problems' },
        { id: 'emergencies', icon: 'fa-temperature-high', title: 'The two emergencies' },
        { id: 'clozapine', icon: 'fa-vial', title: 'Clozapine, on its own' },
        { id: 'antidepressants', icon: 'fa-pills', title: 'Antidepressants' },
        { id: 'mood-stabilizers', icon: 'fa-scale-balanced', title: 'Mood stabilizers' },
        { id: 'anxiolytics', icon: 'fa-bed', title: 'Anxiolytics and sedatives' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-droplet', value: '1.5 mEq/L', label: 'Lithium toxicity starts', section: 'mood-stabilizers' },
        { type: 'target', icon: 'fa-flask', value: '0.6-1.2', label: 'Lithium therapeutic', section: 'mood-stabilizers' },
        { type: 'warning', icon: 'fa-clock', value: '12 hours', label: 'When the level is drawn', section: 'mood-stabilizers' },
        { type: 'critical', icon: 'fa-vial', value: 'ANC <500', label: 'Clozapine is stopped', section: 'clozapine' },
        { type: 'info', icon: 'fa-temperature-high', value: '<24 hrs', label: 'Serotonin syndrome onset', section: 'emergencies' },
        { type: 'warning', icon: 'fa-utensils', value: '2 or 5 wks', label: 'MAOI washout', section: 'antidepressants' }
    ],
    clinicalPearls: [
        { id: 'tip-weeks-not-days', title: 'Impatience Is the Wrong Answer', text: 'Agitation settles in hours, psychosis takes weeks. Still hearing voices on day five is not a failed drug, it is a timeline to explain.' },
        { id: 'tip-akathisia-not-anxiety', title: 'Restless Legs Beat Racing Thoughts', text: 'Akathisia is distress in the body, not the thoughts. Any answer that reassures without reporting it to the prescriber is wrong.' },
        { id: 'tip-two-emergencies', title: 'Fast and Twitchy, or Slow and Stiff', text: 'Serotonin syndrome: hours, clonus, brisk reflexes, big pupils. Neuroleptic malignant syndrome: days, lead-pipe rigidity, sluggish reflexes.' },
        { id: 'tip-clozapine-fever', title: 'A Sore Throat Is a Laboratory Order', text: 'On clozapine, fever or sore throat means check the neutrophil count now. New chest pain in the first 8 weeks is myocarditis until disproven.' },
        { id: 'tip-energy-before-mood', title: 'Energy Comes Back Before Hope Does', text: 'A sudden lift in a severely depressed patient raises risk rather than lowering it. Assess directly and ask about it.' },
        { id: 'tip-lithium-salt', title: 'Follow the Sodium and You Find the Lithium', text: 'Every toxicity stem hides a salt or volume problem: a stomach bug, a new diuretic, a heat wave, an anti-inflammatory.' },
        { id: 'tip-buspirone-weeks', title: 'Buspirone Does Nothing Tonight', text: 'It takes 2 to 4 weeks and is taken on a schedule, never as needed. And a long-standing benzodiazepine is never stopped abruptly.' }
    ]
};
