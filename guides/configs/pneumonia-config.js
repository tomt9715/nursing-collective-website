// Pneumonia Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'How the alveolus fills' },
        { id: 'organisms', icon: 'fa-bacteria', title: 'Bacterial, viral or atypical' },
        { id: 'classification', icon: 'fa-sitemap', title: 'Where they caught it' },
        { id: 'high-risk', icon: 'fa-user-shield', title: 'Who gets it' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment, in order' },
        { id: 'diagnostics', icon: 'fa-x-ray', title: 'What the tests tell you' },
        { id: 'treatment', icon: 'fa-pills', title: 'Antibiotics and the clock' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'What you do first' },
        { id: 'pediatrics', icon: 'fa-child', title: 'Children are not small adults' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '>=92%', label: 'SpO2 target' },
        { type: 'time', icon: 'fa-clock', value: '<4 hrs', label: 'First antibiotic dose' },
        { type: 'critical', icon: 'fa-hospital', value: '>=48h', label: 'HAP starts here' },
        { type: 'warning', icon: 'fa-bacteria', value: 'S. pneumo', label: 'Leading CAP organism' },
        { type: 'info', icon: 'fa-lungs', value: 'CURB-65', label: 'Admit or send home' },
        { type: 'success', icon: 'fa-bed', value: '30-45 deg', label: 'HOB to prevent aspiration' }
    ],
    clinicalPearls: [
        { id: 'tip-consolidation', title: 'Understanding Consolidation', text: 'Dullness, bronchial breath sounds and increased fremitus are one fact stated three ways: the lung went solid.' },
        { id: 'tip-cap-vs-hap', title: 'The 48-Hour Rule', text: 'Under 48 hours is community and susceptible. Forty-eight or more is hospital, Pseudomonas and MRSA. The timeline picks the drug.' },
        { id: 'tip-high-risk', title: 'The High-Risk Profile', text: 'Risk factors stack. Older smoker with COPD, or a diabetic on steroids who cannot swallow. For them the work is preventive.' },
        { id: 'tip-assessment-findings', title: 'The Consolidation Triad', text: 'Dull to percussion, bronchial breath sounds in the periphery, increased tactile fremitus. Find all three and you found it.' },
        { id: 'tip-cxr-interpretation', title: 'Reading a Pneumonia Chest X-Ray', text: 'Air is black, consolidation is white. An air bronchogram is a dark airway inside a white patch.' },
        { id: 'tip-antibiotic-timing', title: 'Antibiotic Timing', text: 'Four hours from diagnosis, one hour if severe or septic. Culture first, then the drug; it takes two minutes.' },
        { id: 'tip-incentive-spirometry', title: 'Incentive Spirometry Technique', text: 'Slow breath in over 3 to 5 seconds, hold 5 to 10 at the top, ten times every 1 to 2 hours. Slow is what reopens alveoli.' },
        { id: 'tip-sputum-collection', title: 'Sputum Before Antibiotics', text: 'One dose can sterilise the culture and cost you the organism for the whole admission.' },
        { id: 'tip-aspiration-prevention', title: 'Three Non-Negotiables', text: 'Head of bed checked every room entry, swallow status matched to the diet order, and oral care every 2 to 4 hours.' },
        { id: 'tip-pediatric-dehydration', title: 'Watch for Dehydration', text: 'Fast breathing loses fluid, fever raises demand, and a sick child refuses to drink. Watch output and daily weights.' }
    ]
};
