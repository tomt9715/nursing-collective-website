// Assessment Skills Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'introduction', icon: 'fa-stethoscope', title: 'The order that never changes' },
        { id: 'data-collection', icon: 'fa-database', title: 'Subjective or objective' },
        { id: 'vital-signs', icon: 'fa-heartbeat', title: 'Vital signs and trends' },
        { id: 'gcs-assessment', icon: 'fa-brain', title: 'Glasgow Coma Scale' },
        { id: 'braden-scale', icon: 'fa-bed', title: 'Braden Scale' },
        { id: 'wound-assessment', icon: 'fa-band-aid', title: 'Reading a wound' },
        { id: 'pain-assessment', icon: 'fa-thermometer-half', title: 'Pain, and picking the tool' },
        { id: 'pediatric-vitals', icon: 'fa-child', title: 'Children are not small adults' },
        { id: 'head-to-toe', icon: 'fa-user', title: 'Head to toe, in order' },
        { id: 'focused-assessment', icon: 'fa-search', title: 'When you do not do all of it' },
        { id: 'documentation', icon: 'fa-file-medical', title: 'Writing it down' },
        { id: 'mental-status', icon: 'fa-head-side-virus', title: 'Mental status' },
        { id: 'critical-findings', icon: 'fa-exclamation-circle', title: 'What you escalate' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-heartbeat', value: '60-100', label: 'Normal HR (bpm)' },
        { type: 'target', icon: 'fa-lungs', value: '12-20', label: 'Normal RR (/min)' },
        { type: 'target', icon: 'fa-tachometer-alt', value: '<120/80', label: 'Normal BP (mmHg)' },
        { type: 'target', icon: 'fa-percent', value: '95-100%', label: 'Normal SpO2' },
        { type: 'critical', icon: 'fa-brain', value: '<=8', label: 'GCS: airway at risk' },
        { type: 'critical', icon: 'fa-bed', value: '<=12', label: 'Braden: high risk' },
        { type: 'warning', icon: 'fa-clock', value: '<3 sec', label: 'Normal cap refill' },
        { type: 'info', icon: 'fa-eye', value: '3-5 mm', label: 'Normal pupil size' }
    ],
    clinicalPearls: [
        { id: 'tip-ippa-order', title: 'IPPA, Except the Abdomen', text: 'Touching the belly changes the bowel sounds, so there you inspect, auscultate, percuss, palpate.' },
        { id: 'tip-pqrst', title: 'PQRST', text: 'Provokes, quality, radiates, severity, timing. The R is the one people skip and often the most diagnostic.' },
        { id: 'tip-trends-over-values', title: 'Trends Over Single Values', text: 'A number inside the normal range can still be a patient sliding. Read it against their own baseline.' },
        { id: 'tip-gcs-documentation', title: 'Document the Components', text: 'Chart E3 V4 M5, not GCS 12. Two patients with the same total can be in very different trouble.' },
        { id: 'tip-braden-reassessment', title: 'The Score Moves Within a Shift', text: 'Surgery, sedation or going nil by mouth can swing a Braden by eight points in hours. Reassess every shift.' },
        { id: 'tip-wound-documentation', title: 'Measure It the Same Way Every Time', text: 'Twelve o clock toward the head, centimetres, deepest point. Inconsistent technique fakes a stalled wound.' },
        { id: 'tip-pain-reassessment', title: 'Reassess, and Chart Both Numbers', text: 'Thirty minutes after oral, fifteen after IV, because that is when each route peaks.' },
        { id: 'tip-peds-vital-trends', title: 'Count Respirations Before You Touch Them', text: 'Once you disturb a toddler they cry and the rate is unusable. Apical pulse for a full 60 seconds under 2.' },
        { id: 'tip-document-objectively', title: 'Objective, Not Vague', text: 'Tolerated well is an opinion in a clinical coat. Write what you measured, and quote the patient.' },
        { id: 'tip-sbar', title: 'SBAR, and Say the R Out Loud', text: 'New nurses stop after the assessment. State what you think is needed; that is what turns a call into an order.' },
        { id: 'tip-mental-status-baseline', title: 'Know Their Baseline', text: 'Oriented times two may be normal for them. New confusion in someone previously alert is a medical emergency.' },
        { id: 'tip-trust-your-gut', title: 'Worried Is a Valid Criterion', text: 'It is written into rapid response criteria on purpose. You notice the change before the numbers do.' }
    ]
};
