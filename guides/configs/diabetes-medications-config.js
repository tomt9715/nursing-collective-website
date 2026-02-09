// Diabetes Medications Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'overview', icon: 'fa-book-open', title: 'Overview & Goals' },
        { id: 'insulin-types', icon: 'fa-syringe', title: 'Insulin Types' },
        { id: 'metformin', icon: 'fa-prescription-bottle-alt', title: 'Metformin' },
        { id: 'sulfonylureas-meglitinides', icon: 'fa-capsules', title: 'Sulfonylureas & Meglitinides' },
        { id: 'tzds-agi', icon: 'fa-tablets', title: 'TZDs & AGIs' },
        { id: 'incretin-based', icon: 'fa-vial', title: 'DPP-4 & GLP-1' },
        { id: 'sglt2', icon: 'fa-tint', title: 'SGLT2 Inhibitors' },
        { id: 'hypoglycemia', icon: 'fa-exclamation-circle', title: 'Hypoglycemia' },
        { id: 'comparison', icon: 'fa-th-list', title: 'Drug Comparison' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Pediatric' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '<7%', label: 'HbA1c goal (most adults)' },
        { type: 'critical', icon: 'fa-arrow-down', value: '<70 mg/dL', label: 'Hypoglycemia threshold' },
        { type: 'info', icon: 'fa-bullseye', value: '80-130', label: 'Fasting glucose target (mg/dL)' },
        { type: 'warning', icon: 'fa-syringe', value: 'Regular only', label: 'Only insulin given IV' },
        { type: 'target', icon: 'fa-clock', value: '15g / 15 min', label: 'Rule of 15 for hypo' },
        { type: 'critical', icon: 'fa-kidney', value: 'eGFR <30', label: 'Hold metformin' }
    ],
    clinicalPearls: [
        { id: 'tip-insulin-peaks', title: 'Peaks = Hypo Risk', text: 'Peak time is when insulin works hardest and hypoglycemia risk is greatest. Ensure food is available at peak times.' },
        { id: 'tip-metformin-gi', title: 'Metformin GI Tips', text: 'Take with food, start low dose. Extended-release causes fewer GI side effects. Hold for contrast dye procedures.' },
        { id: 'tip-sulfonylurea-hypo', title: 'Sulfonylurea Hypo', text: 'Stimulates insulin regardless of glucose level. Highest risk: glyburide, elderly, skipped meals, renal impairment.' },
        { id: 'tip-glp1-benefits', title: 'GLP-1 Triple Benefit', text: 'Weight loss + CV protection + low hypo risk. Black box warning for thyroid C-cell tumors (contraindicated in MEN 2).' },
        { id: 'tip-sglt2-dka', title: 'Euglycemic DKA', text: 'SGLT2 inhibitors can cause DKA with normal glucose. Check ketones if symptomatic. Hold before surgery.' },
        { id: 'tip-rule-of-15', title: 'Rule of 15', text: '15g fast-acting carbs, recheck in 15 min. Unconscious = IV D50 or IM glucagon. Never give oral to unconscious patient.' },
        { id: 'tip-which-cause-hypo', title: 'Hypo Risk Drugs', text: 'Only insulin, sulfonylureas, and meglitinides cause hypoglycemia alone. All others are glucose-dependent.' }
    ]
};
