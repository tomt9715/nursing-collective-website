// Adrenal Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'physiology', icon: 'fa-dna', title: 'Adrenal Physiology' },
        { id: 'cushings', icon: 'fa-arrow-up', title: "Cushing's Syndrome" },
        { id: 'cushings-treatment', icon: 'fa-pills', title: "Cushing's Treatment" },
        { id: 'addisons', icon: 'fa-arrow-down', title: "Addison's Disease" },
        { id: 'addisons-treatment', icon: 'fa-prescription-bottle-alt', title: "Addison's Treatment" },
        { id: 'adrenal-crisis', icon: 'fa-exclamation-triangle', title: 'Adrenal Crisis' },
        { id: 'pheochromocytoma', icon: 'fa-heartbeat', title: 'Pheochromocytoma' },
        { id: 'adrenalectomy', icon: 'fa-procedures', title: 'Adrenalectomy Care' },
        { id: 'comparison', icon: 'fa-columns', title: "Cushing's vs Addison's" },
        { id: 'pediatric', icon: 'fa-baby', title: 'Pediatric Considerations' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'critical', icon: 'fa-arrow-up', value: '↑ Cortisol', label: "Cushing's syndrome" },
        { type: 'warning', icon: 'fa-arrow-down', value: '↓ Cortisol', label: "Addison's disease" },
        { type: 'critical', icon: 'fa-bolt', value: 'Emergency', label: 'Adrenal crisis' },
        { type: 'info', icon: 'fa-moon', value: 'AM level', label: 'Cortisol testing time' },
        { type: 'target', icon: 'fa-pills', value: 'AM dose', label: 'Steroid timing (largest)' },
        { type: 'critical', icon: 'fa-heartbeat', value: '5 H\'s', label: 'Pheochromocytoma' }
    ],
    clinicalPearls: [
        { id: 'tip-cushings-vs-addisons', title: "Cushing's vs Addison's", text: "Cushing's = too MUCH cortisol (moon face, buffalo hump, hypertension, hyperglycemia). Addison's = too LITTLE cortisol (bronze skin, hypotension, hypoglycemia, salt craving). Everything is opposite." },
        { id: 'tip-cortisol-functions', title: 'Cortisol Does Everything', text: "Cortisol raises glucose, retains sodium/water, suppresses immunity, breaks down protein/fat. Too much = Cushing's effects. Too little = Addison's effects. Know cortisol's actions and you know both diseases." },
        { id: 'tip-steroid-safety', title: 'Never Stop Steroids Abruptly', text: 'Long-term steroids suppress the HPA axis. Abrupt withdrawal can trigger adrenal crisis. Always taper gradually. Patients need stress-dose steroids for illness/surgery.' },
        { id: 'tip-adrenal-crisis', title: 'Adrenal Crisis = Emergency', text: "Hypotension + hyponatremia + hyperkalemia + altered LOC = adrenal crisis. Treat with IV hydrocortisone 100mg STAT + IV NS bolus. Don't wait for labs to treat." },
        { id: 'tip-addisons-teaching', title: "Addison's Patient Teaching", text: 'Wear medical alert ID. Never skip steroids. Double dose for illness (stress dosing). Carry injectable hydrocortisone for emergencies. High sodium diet.' },
        { id: 'tip-pheo-bp', title: 'Pheo = Hypertensive Emergency', text: "Pheochromocytoma: 5 H's — Hypertension, Headache, Hyperhidrosis, Hypermetabolism, Hyperglycemia. Treat with alpha-blocker FIRST (phenoxybenzamine), then beta-blocker. Never give beta-blocker alone." },
        { id: 'tip-cushings-infection', title: "Cushing's Infection Risk", text: "Elevated cortisol suppresses the immune system. Cushing's patients may NOT show typical signs of infection (no fever, no elevated WBC). A 'normal' temperature could be hiding sepsis." },
        { id: 'tip-iatrogenic', title: 'Iatrogenic Cushing\'s', text: 'The #1 cause of Cushing\'s syndrome is long-term exogenous corticosteroid use (prednisone, dexamethasone). Always ask about steroid medications before workup.' }
    ]
};
