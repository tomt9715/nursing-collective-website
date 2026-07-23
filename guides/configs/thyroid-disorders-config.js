// Thyroid Disorders Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'start-here', icon: 'fa-crosshairs', title: 'What actually gets you' },
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'The four things' },
        { id: 'physiology', icon: 'fa-dna', title: 'Why the lab reads backwards' },
        { id: 'lab-values', icon: 'fa-vials', title: 'Reading the labs' },
        { id: 'hypothyroidism', icon: 'fa-temperature-low', title: 'Hypothyroidism' },
        { id: 'myxedema-coma', icon: 'fa-snowflake', title: 'Myxedema coma' },
        { id: 'hyperthyroidism', icon: 'fa-temperature-high', title: 'Hyperthyroidism' },
        { id: 'thyroid-storm', icon: 'fa-fire', title: 'Thyroid storm' },
        { id: 'medications', icon: 'fa-pills', title: 'The drugs' },
        { id: 'goiter-nodules', icon: 'fa-search', title: 'Goiter and nodules' },
        { id: 'thyroidectomy', icon: 'fa-procedures', title: 'After the thyroid comes out' },
        { id: 'diet', icon: 'fa-utensils', title: 'Iodine and food' },
        { id: 'pediatric', icon: 'fa-baby', title: 'Children are not small adults' },
        { id: 'numbers-cold', icon: 'fa-hashtag', title: 'Numbers to have cold' },
        { id: 'rebuild', icon: 'fa-pencil-alt', title: 'Now close the guide' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'Test yourself' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'info', icon: 'fa-vial', value: '0.4-4.0', label: 'Normal TSH (mIU/L)' },
        { type: 'critical', icon: 'fa-arrow-up', value: 'High TSH', label: 'Hypothyroid' },
        { type: 'warning', icon: 'fa-arrow-down', value: 'Low TSH', label: 'Hyperthyroid' },
        { type: 'critical', icon: 'fa-thermometer-full', value: '>104 F', label: 'Thyroid storm fever' },
        { type: 'target', icon: 'fa-pills', value: 'Empty AM', label: 'Levothyroxine timing' },
        { type: 'critical', icon: 'fa-lungs', value: 'Airway', label: 'First after thyroidectomy' }
    ],
    clinicalPearls: [
        { id: 'tip-tsh-inverse', title: 'The TSH Inverse Rule', text: 'TSH measures how loudly the pituitary is asking, not how much hormone there is. Weak thyroid, loud pituitary, high TSH.' },
        { id: 'tip-levothyroxine', title: 'Levothyroxine Teaching', text: 'Empty stomach 30 to 60 minutes before breakfast, 4 hours from calcium and iron, and it potentiates warfarin.' },
        { id: 'tip-myxedema', title: 'Passive Rewarming Only', text: 'External heat dilates peripheral vessels and this heart cannot compensate. Warm blankets, no more than 1 F an hour.' },
        { id: 'tip-hypo-vs-hyper', title: 'Learn One List, Get the Other Free', text: 'Every finding is an exact opposite. Cold or hot, gaining or losing, slow pulse or fast. Learn hypo and flip it.' },
        { id: 'tip-thyroid-storm', title: 'Four Blocks, in Order', text: 'Block synthesis with PTU, release with iodine an hour later, adrenergic effects with a beta-blocker, conversion with steroids.' },
        { id: 'tip-ptu-pregnancy', title: 'PTU in the First Trimester Only', text: 'Methimazole is teratogenic in the first trimester; PTU covers that window, then switch back for the liver risk.' },
        { id: 'tip-rai-precautions', title: 'RAI Precautions', text: 'Pregnancy test first, none for 6 to 12 months after. Sleep alone, separate utensils, flush twice, keep 3 feet away.' },
        { id: 'tip-thyroidectomy', title: 'Airway, Bleeding, Calcium, Communication', text: 'Airway first, always. Then bleeding, and check behind the neck. Then calcium. Then the voice, every 2 to 4 hours.' }
    ]
};
