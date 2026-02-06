// Pneumonia Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-lungs', title: 'Respiratory Anatomy' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Pathophysiology' },
        { id: 'classification', icon: 'fa-sitemap', title: 'CAP vs HAP vs VAP' },
        { id: 'high-risk', icon: 'fa-user-shield', title: 'High-Risk Populations' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Clinical Assessment' },
        { id: 'diagnostics', icon: 'fa-x-ray', title: 'Diagnostics & CXR' },
        { id: 'treatment', icon: 'fa-pills', title: 'Treatment & Antibiotics' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Nursing Interventions' },
        { id: 'pediatrics', icon: 'fa-child', title: 'Pediatric Considerations' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '≥92%', label: 'SpO2 Target' },
        { type: 'time', icon: 'fa-clock', value: '<4 hrs', label: 'Antibiotic Timing' },
        { type: 'critical', icon: 'fa-hospital', value: '≥48h', label: 'HAP Onset Rule' },
        { type: 'warning', icon: 'fa-bacteria', value: 'S. pneumo', label: '#1 CAP Pathogen' },
        { type: 'info', icon: 'fa-lungs', value: 'CURB-65', label: 'Severity Score' },
        { type: 'success', icon: 'fa-syringe', value: 'Vaccination', label: 'Prevention Key' }
    ],
    clinicalPearls: [
        { id: 'tip-consolidation', title: 'Understanding Consolidation', text: 'Consolidation = dullness to percussion + bronchial breath sounds + increased fremitus. White opacity on CXR with air bronchograms.' },
        { id: 'tip-cap-vs-hap', title: '48-Hour Rule', text: 'CAP = before or <48h after admission (susceptible bugs). HAP = ≥48h (resistant bugs like Pseudomonas, MRSA). Different antibiotics needed!' },
        { id: 'tip-high-risk', title: 'High-Risk Patients', text: 'Elderly, immunocompromised, COPD, diabetics, and aspiration risk patients need extra vigilance and prevention measures.' },
        { id: 'tip-assessment-findings', title: 'Consolidation Triad', text: 'Dullness to percussion + bronchial breath sounds + increased tactile fremitus = lung consolidation found!' },
        { id: 'tip-cxr-interpretation', title: 'CXR Reading', text: 'Normal lung = black (air). Pneumonia = white (consolidation). Look for lobar vs patchy pattern, air bronchograms, and pleural effusion.' },
        { id: 'tip-antibiotic-timing', title: 'Antibiotic Timing', text: 'First dose within 4 hours (1 hour if severe/sepsis). Delayed antibiotics increase mortality. Don\'t wait for cultures!' },
        { id: 'tip-incentive-spirometry', title: 'IS Technique', text: 'Sit upright, inhale slowly (3-5 sec), hold 5-10 sec at max. Goal is sustained inspiration, not speed. 10 reps q1-2h while awake.' },
        { id: 'tip-pediatric-dehydration', title: 'Pediatric Dehydration Risk', text: 'Children with pneumonia dehydrate fast! Tachypnea increases fluid losses, fever increases demands, and sick kids refuse to drink. Monitor output and weights!' }
    ]
};
