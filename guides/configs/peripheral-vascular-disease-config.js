// Peripheral Vascular Disease Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'high-yield-summary', icon: 'fa-bolt', title: 'High-Yield Summary' },
        { id: 'anatomy', icon: 'fa-heart', title: 'Vascular Anatomy' },
        { id: 'arterial-venous', icon: 'fa-code-branch', title: 'Arterial vs Venous' },
        { id: 'pad', icon: 'fa-heartbeat', title: 'Peripheral Arterial Disease' },
        { id: 'abi', icon: 'fa-ruler', title: 'Ankle-Brachial Index' },
        { id: 'venous', icon: 'fa-water', title: 'Venous Insufficiency' },
        { id: 'dvt', icon: 'fa-exclamation-circle', title: 'Deep Vein Thrombosis' },
        { id: 'prevention', icon: 'fa-shield-alt', title: 'DVT Prevention' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Treatment & Nursing' },
        { id: 'practice-questions', icon: 'fa-flask', title: 'NCLEX Challenge' },
        { id: 'cross-references', icon: 'fa-book-open', title: 'Related Guides' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-ruler', value: '0.9-1.3', label: 'Normal ABI range' },
        { type: 'critical', icon: 'fa-exclamation', value: '≤0.40', label: 'Critical limb ischemia' },
        { type: 'warning', icon: 'fa-calculator', value: '>1.30', label: 'Calcified vessels (unreliable)' },
        { type: 'time', icon: 'fa-clock', value: '>3 sec', label: 'Abnormal cap refill' },
        { type: 'success', icon: 'fa-compress', value: '30-40', label: 'Compression mmHg (CVI)' },
        { type: 'info', icon: 'fa-pills', value: '3+ mo', label: 'DVT anticoag duration' }
    ],
    clinicalPearls: [
        { id: 'tip-pulse-locations', title: 'Pulse Points', text: 'Master DP (dorsum foot), PT (behind medial malleolus), popliteal (behind knee), and femoral pulse locations.' },
        { id: 'tip-arterial-vs-venous', title: 'Position Test', text: 'Arterial pain worsens with elevation; venous pain improves. Arterial ulcers on toes; venous on medial malleolus.' },
        { id: 'tip-claudication', title: 'Claudication', text: 'Predictable leg pain with walking, relieved by standing still. Location indicates level of arterial disease.' },
        { id: 'tip-abi-pearls', title: 'ABI Limitations', text: 'Falsely elevated in diabetics/CKD due to calcified vessels. Use TBI or exercise ABI when ABI >1.3.' },
        { id: 'tip-scd-compliance', title: 'SCD Compliance', text: 'SCDs reduce DVT 60% - but only if worn! Check every room entry that devices are on and cycling.' },
        { id: 'tip-dvt-mobility', title: 'DVT & Ambulation', text: 'Early ambulation is safe once anticoagulated - bed rest does NOT prevent PE and delays recovery.' }
    ]
};
