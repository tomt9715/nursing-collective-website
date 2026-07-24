// Antepartum Care Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'pregnancy-confirmation', icon: 'fa-vial', title: 'Confirm and date' },
        { id: 'maternal-adaptations', icon: 'fa-female', title: 'Maternal adaptations' },
        { id: 'prenatal-assessment', icon: 'fa-clipboard-check', title: 'Assessment and screening' },
        { id: 'fetal-assessment', icon: 'fa-heartbeat', title: 'Fetal assessment' },
        { id: 'nutrition-lifestyle', icon: 'fa-apple-alt', title: 'Nutrition and lifestyle' },
        { id: 'danger-signs', icon: 'fa-exclamation-triangle', title: 'Danger signs' },
        { id: 'rh-incompatibility', icon: 'fa-tint', title: 'Rh and RhoGAM' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-calendar', value: '4-2-1 wk', label: 'Visit schedule pattern', section: 'prenatal-assessment' },
        { type: 'info', icon: 'fa-heartbeat', value: '110-160 bpm', label: 'Normal FHR range', section: 'fetal-assessment' },
        { type: 'critical', icon: 'fa-ruler', value: 'cm = weeks', label: 'Fundal height, 16-36 wk', section: 'prenatal-assessment' },
        { type: 'target', icon: 'fa-check-double', value: '15x15x2 in 20', label: 'Reactive NST', section: 'fetal-assessment' },
        { type: 'warning', icon: 'fa-capsules', value: '400-800 mcg', label: 'Folic acid daily', section: 'nutrition-lifestyle' },
        { type: 'critical', icon: 'fa-syringe', value: '28 wk + 72 hr', label: 'RhoGAM timing', section: 'rh-incompatibility' }
    ],
    clinicalPearls: [
        { id: 'tip-naegeles-rule', title: "Naegele's Rule", text: "First day of LMP, minus 3 months, plus 7 days. Assumes a 28-day cycle. First-trimester ultrasound wins if dates are unsure." },
        { id: 'tip-supine-hypotension', title: 'Left Lateral After 20 Weeks', text: 'After 20 weeks, supine compresses the vena cava and cuts placental flow. Turn her to the left side, or wedge under the right hip.' },
        { id: 'tip-fundal-height', title: 'cm Equals Weeks', text: 'Between 16 and 36 weeks, fundal height in cm equals gestational age in weeks. A gap over 2 cm earns an ultrasound.' },
        { id: 'tip-nst-reactive', title: 'Reactive NST', text: 'Two accelerations of 15 bpm, each 15 seconds, within 20 minutes. Reactive is reassuring. Preterm under 32 weeks: 10 bpm for 10 seconds.' },
        { id: 'tip-folic-acid', title: 'Folic Acid Before Conception', text: 'The neural tube closes by day 28, often before she knows. Start folic acid before conception. 4 mg with a prior neural tube defect.' },
        { id: 'tip-danger-signs', title: 'The Preeclampsia Three', text: 'Severe headache, visual changes, and sudden face or hand edema together mean preeclampsia until proven otherwise. Send her to the hospital.' },
        { id: 'tip-rhogam', title: 'RhoGAM Timing', text: 'Give at 28 weeks and within 72 hours postpartum if the newborn is Rh-positive. Check indirect Coombs first. Also give after sensitizing events.' }
    ]
};
