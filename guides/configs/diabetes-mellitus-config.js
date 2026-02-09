// Diabetes Mellitus Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Pathophysiology' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Assessment & Diagnosis' },
        { id: 'acute-complications', icon: 'fa-exclamation-triangle', title: 'DKA vs HHS' },
        { id: 'chronic-complications', icon: 'fa-heartbeat', title: 'Chronic Complications' },
        { id: 'insulin-therapy', icon: 'fa-syringe', title: 'Insulin Therapy' },
        { id: 'oral-agents', icon: 'fa-pills', title: 'Oral & Injectable Agents' },
        { id: 'hypoglycemia', icon: 'fa-exclamation-circle', title: 'Hypoglycemia' },
        { id: 'nursing-management', icon: 'fa-user-nurse', title: 'Nursing Management' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Pediatric Considerations' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-tint', value: '≥ 126', label: 'Fasting glucose (DM)' },
        { type: 'critical', icon: 'fa-percentage', value: '≥ 6.5%', label: 'HbA1c (DM)' },
        { type: 'target', icon: 'fa-bullseye', value: '< 7%', label: 'HbA1c goal (most)' },
        { type: 'warning', icon: 'fa-arrow-down', value: '< 70', label: 'Hypoglycemia threshold' },
        { type: 'info', icon: 'fa-bolt', value: '250-600', label: 'DKA glucose range' },
        { type: 'critical', icon: 'fa-tint-slash', value: '> 600', label: 'HHS glucose' }
    ],
    clinicalPearls: [
        { id: 'tip-type1-vs-type2', title: 'Type 1 vs Type 2', text: 'Type 1 = no keys (no insulin). Type 2 = rusty locks (insulin resistance). Type 1 always needs insulin. Type 2 starts with oral agents.' },
        { id: 'tip-dka-vs-hhs', title: 'DKA vs HHS', text: 'DKA has ketones + acidosis (no insulin at all). HHS has extreme glucose but no ketones (some insulin present). DKA = acidosis. HHS = dehydration.' },
        { id: 'tip-insulin-safety', title: 'Insulin Peak = Hypo Risk', text: 'Peak time is when hypoglycemia risk is greatest. Rapid: 1-2 hr. NPH: 4-12 hr. Long-acting: no peak. Ensure food at peak times.' },
        { id: 'tip-metformin-first', title: 'Metformin First-Line', text: 'First-line for T2DM: no hypo alone, weight neutral, CV benefit. Hold for contrast dye. Contraindicated if eGFR < 30. Monitor B12.' },
        { id: 'tip-rule-of-15', title: 'Rule of 15', text: 'Conscious: 15g fast carbs, wait 15 min, recheck. Unconscious: IV D50 or IM glucagon — never oral. Beta-blockers mask early warning signs.' },
        { id: 'tip-foot-care', title: 'Foot Care', text: 'Neuropathy + PVD = silent injuries. Inspect daily, moisturize (not between toes), proper shoes, cut nails straight across. Small blisters → amputations.' },
        { id: 'tip-sick-day', title: 'Sick Day Rules', text: 'NEVER stop insulin when sick. Illness raises glucose via stress hormones. Check BG q4h, check ketones if >240, maintain fluids.' },
        { id: 'tip-peds-dka', title: 'Pediatric DKA', text: 'Cerebral edema is unique to pediatric DKA. Correct glucose no faster than 50-75 mg/dL per hour. Avoid hypotonic fluids early. Requires ICU monitoring.' }
    ]
};
