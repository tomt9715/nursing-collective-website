// Thyroid Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'physiology', icon: 'fa-dna', title: 'Thyroid Physiology' },
        { id: 'lab-values', icon: 'fa-vials', title: 'Lab Interpretation' },
        { id: 'hypothyroidism', icon: 'fa-temperature-low', title: 'Hypothyroidism' },
        { id: 'myxedema-coma', icon: 'fa-exclamation-triangle', title: 'Myxedema Coma' },
        { id: 'hyperthyroidism', icon: 'fa-temperature-high', title: 'Hyperthyroidism' },
        { id: 'thyroid-storm', icon: 'fa-bolt', title: 'Thyroid Storm' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' },
        { id: 'goiter-nodules', icon: 'fa-search', title: 'Goiter & Nodules' },
        { id: 'thyroidectomy', icon: 'fa-procedures', title: 'Thyroidectomy Care' },
        { id: 'diet', icon: 'fa-utensils', title: 'Diet Considerations' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Pediatric Considerations' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'info', icon: 'fa-vial', value: '0.4-4.0', label: 'Normal TSH (mIU/L)' },
        { type: 'critical', icon: 'fa-arrow-up', value: '↑ TSH', label: 'Hypothyroidism' },
        { type: 'warning', icon: 'fa-arrow-down', value: '↓ TSH', label: 'Hyperthyroidism' },
        { type: 'critical', icon: 'fa-thermometer-full', value: '> 104°F', label: 'Thyroid storm fever' },
        { type: 'target', icon: 'fa-pills', value: 'AM empty', label: 'Levothyroxine timing' },
        { type: 'critical', icon: 'fa-lungs', value: 'Airway', label: 'Post-thyroidectomy #1' }
    ],
    clinicalPearls: [
        { id: 'tip-tsh-inverse', title: 'TSH Inverse Rule', text: 'TSH goes OPPOSITE of thyroid function. High TSH = low thyroid (hypo). Low TSH = high thyroid (hyper). TSH is the most sensitive screening test.' },
        { id: 'tip-hypo-vs-hyper', title: 'Hypo vs Hyper', text: 'HYPOthyroid = everything LOW and SLOW (cold, constipated, weight gain, bradycardia). HYPERthyroid = everything HIGH and FAST (hot, diarrhea, weight loss, tachycardia).' },
        { id: 'tip-levothyroxine', title: 'Levothyroxine Safety', text: 'Take on empty stomach 30-60 min before breakfast. Separate from calcium/iron by 4 hours. Increases warfarin effect. Lifelong therapy — never stop abruptly.' },
        { id: 'tip-thyroid-storm', title: 'Thyroid Storm Emergency', text: 'Fever >104°F + tachycardia + delirium = thyroid storm until proven otherwise. Treat with PTU, beta-blockers, corticosteroids, and cooling measures. Mortality 20-30%.' },
        { id: 'tip-myxedema', title: 'Myxedema Coma', text: 'Hypothermia + altered mental status + precipitating event = myxedema coma. IV levothyroxine, passive rewarming only, and supportive care. Do NOT actively warm — causes vasodilation and shock.' },
        { id: 'tip-thyroidectomy', title: 'Post-Thyroidectomy Priority', text: 'Airway first! Keep trach tray and calcium gluconate at bedside. Assess voice every 2-4 hours. Watch for Chvostek and Trousseau signs (hypocalcemia).' },
        { id: 'tip-ptu-pregnancy', title: 'PTU in Pregnancy', text: 'PTU is preferred in first trimester (less teratogenic). Switch to methimazole for 2nd/3rd trimester. PTU has black box warning for hepatotoxicity.' },
        { id: 'tip-rai-precautions', title: 'RAI Precautions', text: 'Radioactive iodine: pregnancy test before treatment, avoid pregnant women/children for days after, separate utensils, flush toilet twice. Will likely cause permanent hypothyroidism.' }
    ]
};
