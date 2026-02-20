// Antepartum Care Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'overview', icon: 'fa-baby', title: 'Overview' },
        { id: 'pregnancy-confirmation', icon: 'fa-vial', title: 'Pregnancy Confirmation' },
        { id: 'maternal-adaptations', icon: 'fa-female', title: 'Maternal Adaptations' },
        { id: 'prenatal-assessment', icon: 'fa-clipboard-check', title: 'Prenatal Assessment' },
        { id: 'fetal-assessment', icon: 'fa-heartbeat', title: 'Fetal Assessment' },
        { id: 'nutrition-lifestyle', icon: 'fa-apple-alt', title: 'Nutrition & Lifestyle' },
        { id: 'common-discomforts', icon: 'fa-band-aid', title: 'Common Discomforts' },
        { id: 'danger-signs', icon: 'fa-exclamation-triangle', title: 'Danger Signs' },
        { id: 'patient-education', icon: 'fa-chalkboard-teacher', title: 'Prenatal Education' },
        { id: 'rh-incompatibility', icon: 'fa-tint', title: 'Rh & RhoGAM' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-calendar', value: '4-2-1 wk', label: 'Visit schedule pattern' },
        { type: 'info', icon: 'fa-heartbeat', value: '110-160 bpm', label: 'Normal FHR range' },
        { type: 'critical', icon: 'fa-ruler', value: 'cm = weeks', label: 'Fundal height rule (16-36 wk)' },
        { type: 'target', icon: 'fa-check-double', value: '15x15x2 in 20', label: 'Reactive NST criteria' },
        { type: 'warning', icon: 'fa-capsules', value: '400-800 mcg', label: 'Folic acid daily' },
        { type: 'critical', icon: 'fa-syringe', value: '28 wk + 72 hr', label: 'RhoGAM timing' }
    ],
    clinicalPearls: [
        { id: 'tip-naegeles-rule', title: "Naegele's Rule", text: "LMP - 3 months + 7 days = EDD. Assumes 28-day cycle. First-trimester ultrasound is most accurate if dates are discrepant." },
        { id: 'tip-supine-hypotension', title: 'Supine Hypotensive Syndrome', text: 'After 20 weeks, never lay a patient supine. The uterus compresses the vena cava. Use left lateral position or wedge under right hip.' },
        { id: 'tip-fundal-height', title: 'Fundal Height = Gestational Age', text: 'Between 16-36 weeks, fundal height in cm equals gestational age in weeks. Discrepancy >2 cm needs ultrasound evaluation.' },
        { id: 'tip-nst-reactive', title: 'Reactive NST Criteria', text: '2+ accelerations of 15 bpm x 15 seconds in 20 minutes = reactive = reassuring. Preterm <32 wk: 10 bpm x 10 seconds.' },
        { id: 'tip-folic-acid', title: 'Folic Acid Before Conception', text: 'Neural tube closes by day 28 — often before the woman knows she is pregnant. Start folic acid before conception. 4 mg if prior NTD history.' },
        { id: 'tip-rhogam', title: 'RhoGAM Timing', text: 'Give at 28 weeks + within 72 hours postpartum if newborn is Rh-positive. Check indirect Coombs first (must be negative). Also give after sensitizing events.' }
    ]
};
