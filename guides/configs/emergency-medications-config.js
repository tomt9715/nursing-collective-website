// Emergency Medications Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'arrest', icon: 'fa-heart-pulse', title: 'Cardiac arrest' },
        { id: 'rhythm', icon: 'fa-wave-square', title: 'Too slow, or too fast' },
        { id: 'vasopressors', icon: 'fa-gauge-high', title: 'Vasopressors and inotropes' },
        { id: 'antidotes', icon: 'fa-flask-vial', title: 'The antidote table' },
        { id: 'anaphylaxis', icon: 'fa-syringe', title: 'Anaphylaxis' },
        { id: 'metabolic', icon: 'fa-shield-halved', title: 'Three more emergencies' },
        { id: 'safety', icon: 'fa-triangle-exclamation', title: 'Giving them safely' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-heart-pulse', value: '1 mg', label: 'Epi q3-5 min in arrest', section: 'arrest' },
        { type: 'warning', icon: 'fa-stopwatch', value: '6 then 12', label: 'Adenosine, pushed fast', section: 'rhythm' },
        { type: 'target', icon: 'fa-wave-square', value: '1 mg, max 3', label: 'Atropine for bradycardia', section: 'rhythm' },
        { type: 'critical', icon: 'fa-syringe', value: '0.01 mg/kg', label: 'IM epi, anaphylaxis', section: 'anaphylaxis' },
        { type: 'critical', icon: 'fa-shield-halved', value: 'Calcium', label: 'First in hyperkalemia', section: 'metabolic' },
        { type: 'info', icon: 'fa-clock', value: '30-90 min', label: 'Naloxone outlasted', section: 'antidotes' }
    ],
    clinicalPearls: [
        { id: 'tip-shock-first', title: 'Sort the Rhythm Before You Pick a Drug', text: 'Shockable or not, said out loud from the stem. Any option offering a shock for asystole is wrong.' },
        { id: 'tip-adenosine-fast', title: 'Slow Adenosine Is No Adenosine', text: 'Half-life under 10 seconds, so a careful push is the same as not giving it. Concentrated potassium is the mirror image.' },
        { id: 'tip-fluid-first', title: 'A Pressor Cannot Squeeze an Empty Tank', text: 'Fluid before the pressor in hypovolemic and septic shock. Cardiogenic shock is the exception, because more fluid worsens it.' },
        { id: 'tip-antidote-clock', title: 'The Patient Who Woke Up Is Still a Patient', text: 'The opioid outlasts the naloxone. Any option that stops observing a reversed patient shortly after they wake is wrong.' },
        { id: 'tip-epi-first', title: 'The Antihistamine Is a Decoy', text: 'Wheeze, throat tightness or a falling pressure after an exposure means IM epinephrine in the thigh, first.' },
        { id: 'tip-calcium-first', title: 'Protect, Shift, Remove', text: 'Calcium protects and changes no number. Insulin and albuterol shift temporarily. Only dialysis, binders and diuretics remove.' }
    ]
};
