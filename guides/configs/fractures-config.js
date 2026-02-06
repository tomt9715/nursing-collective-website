// Fractures Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-bone', title: 'Bone Anatomy' },
        { id: 'fracture-types', icon: 'fa-code-branch', title: 'Fracture Types' },
        { id: 'healing', icon: 'fa-heart-pulse', title: 'Bone Healing' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment' },
        { id: 'compartment-syndrome', icon: 'fa-triangle-exclamation', title: 'Compartment Syndrome' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Nursing Interventions' },
        { id: 'complications', icon: 'fa-circle-exclamation', title: 'Complications' },
        { id: 'pediatrics', icon: 'fa-child', title: 'Pediatric Considerations' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', value: '6 hrs', label: 'Compartment syndrome window' },
        { type: 'time', value: '30 mmHg', label: 'Critical compartment pressure' },
        { type: 'target', value: '6-8 wks', label: 'Typical healing time' },
        { type: 'warning', value: '5 P\'s', label: 'Neurovascular checks' },
        { type: 'success', value: 'Q1-2h', label: 'CMS check frequency' },
        { type: 'info', value: '24-72h', label: 'Fat embolism risk window' }
    ],
    clinicalPearls: [
        { id: 'tip-5ps', title: 'The 5 P\'s Save Limbs' },
        { id: 'tip-compartment-emergency', title: 'Compartment Syndrome Emergency' },
        { id: 'tip-fat-embolism', title: 'Watch for Fat Embolism' },
        { id: 'tip-pain-paradox', title: 'The Pain Paradox' },
        { id: 'tip-cast-care', title: 'Cast Care Essentials' },
        { id: 'tip-growth-plate', title: 'Growth Plate Injuries', text: 'Growth plates are the weakest part of pediatric bone. Salter-Harris classification (Types I-V) predicts prognosis. Screen for non-accidental trauma!' }
    ]
};
