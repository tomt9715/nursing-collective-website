// Oxygen Therapy Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'physiology', icon: 'fa-lungs', title: 'What the number means' },
        { id: 'indications', icon: 'fa-clipboard-check', title: 'When oxygen is the answer' },
        { id: 'delivery-devices', icon: 'fa-mask', title: 'Picking the device' },
        { id: 'fio2-calculations', icon: 'fa-calculator', title: 'Doing the arithmetic' },
        { id: 'special-populations', icon: 'fa-users', title: 'Where the rule changes' },
        { id: 'oxygen-toxicity', icon: 'fa-radiation', title: 'When oxygen is the injury' },
        { id: 'nursing-considerations', icon: 'fa-user-nurse', title: 'What you do' },
        { id: 'troubleshooting', icon: 'fa-tools', title: 'When it is not working' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '94-98%', label: 'Adult SpO2 target' },
        { type: 'warning', icon: 'fa-lungs', value: '88-92%', label: 'COPD target' },
        { type: 'critical', icon: 'fa-chart-line', value: '90/60', label: 'SpO2 to PaO2 pair' },
        { type: 'info', icon: 'fa-calculator', value: '+4%/L', label: 'Nasal cannula rule' },
        { type: 'time', icon: 'fa-clock', value: '24-48h', label: 'Toxicity risk above 50%' },
        { type: 'success', icon: 'fa-mask', value: 'Venturi', label: 'The precise device' }
    ],
    clinicalPearls: [
        { id: 'tip-spo2-vs-pao2', title: 'Saturation Is Not Delivery', text: 'Delivery is saturation times hemoglobin times cardiac output. The oximeter measures one of the three.' },
        { id: 'tip-co-poisoning', title: 'A Normal Pulse Ox in a Fire Victim', text: 'Carbon monoxide reads as saturated hemoglobin. Non-rebreather at 15 L/min, then co-oximetry.' },
        { id: 'tip-low-vs-high-flow', title: 'Ask One Question', text: 'Does the device meet the full inspiratory demand. If not, the FiO2 is a guess rather than a fact.' },
        { id: 'tip-venturi-copd', title: 'Venturi Is the COPD Answer', text: 'Set 24 percent and get 24 percent. A cannula gives somewhere between 24 and 44, depending on the breath.' },
        { id: 'tip-fio2-rule', title: 'Four Percent per Litre', text: '1 L is 24, 2 L is 28, 3 L is 32, 4 L is 36, 5 L is 40, 6 L is 44. Fast deep breathing lowers the real value.' },
        { id: 'tip-copd-targets', title: 'Do Not Chase 100 in COPD', text: 'A COPD patient at 89 percent is at target. Pushing higher suppresses breathing and raises carbon dioxide.' },
        { id: 'tip-toxicity-signs', title: 'Keep FiO2 at 50 or Below', text: 'Substernal pain, dry cough and dyspnea worsening on oxygen are the early signs of pulmonary toxicity.' },
        { id: 'tip-pulse-ox-false', title: 'Believe the Patient', text: 'Poor perfusion, nail polish, motion, anemia, carbon monoxide and methemoglobin all fool the probe.' }
    ]
};
