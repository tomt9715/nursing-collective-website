// Heart Failure Guide Sidebar Configuration
const sidebarConfig = {
    sections: [
        { id: 'anatomy', icon: 'fa-heart', title: 'Cardiac Anatomy' },
        { id: 'pathophysiology', icon: 'fa-dna', title: 'Pathophysiology' },
        { id: 'left-vs-right', icon: 'fa-columns', title: 'Left vs Right HF' },
        { id: 'systolic-diastolic', icon: 'fa-heartbeat', title: 'Systolic vs Diastolic' },
        { id: 'assessment', icon: 'fa-stethoscope', title: 'Nursing Assessment' },
        { id: 'interventions', icon: 'fa-user-nurse', title: 'Interventions' },
        { id: 'medications', icon: 'fa-pills', title: 'Medications' }
    ],
    quickRef: [
        { type: 'target', icon: 'fa-percentage', value: '55-70%', label: 'Normal EF' },
        { type: 'critical', icon: 'fa-arrow-down', value: '<40%', label: 'HFrEF (Systolic)' },
        { type: 'info', icon: 'fa-arrow-up', value: '>=50%', label: 'HFpEF (Diastolic)' },
        { type: 'warning', icon: 'fa-weight', value: '>2 lbs/day', label: 'Report weight gain' },
        { type: 'target', icon: 'fa-tint', value: '100 pg/mL', label: 'BNP HF threshold' },
        { type: 'critical', icon: 'fa-ban', value: '<60 bpm', label: 'Hold digoxin if HR' }
    ],
    clinicalPearls: [
        { id: 'tip-left-lungs', title: 'Left = Lungs', text: 'Left-sided HF causes pulmonary symptoms (dyspnea, crackles, orthopnea). Right-sided HF causes systemic symptoms (edema, JVD).' },
        { id: 'tip-normal-ef', title: 'Normal EF Trap', text: 'HFpEF patients have normal EF but still have HF - their stiff heart fills poorly during diastole.' },
        { id: 'tip-daily-weights', title: 'Daily Weights', text: 'Most sensitive indicator of fluid status. Same time, same scale, same clothing. Report 2+ lbs/day or 5+ lbs/week.' },
        { id: 'tip-lmnop', title: 'LMNOP for Acute HF', text: 'Lasix, Morphine, Nitrates, Oxygen, Position (high Fowlers) - priority interventions for acute decompensation.' },
        { id: 'tip-prevent-valsalva', title: 'Prevent Valsalva', text: 'Straining during BMs drops cardiac output. Give stool softeners prophylactically to all HF patients.' },
        { id: 'tip-watch-potassium', title: 'Watch Potassium', text: 'Loop diuretics cause hypokalemia. ACE-I/ARBs cause hyperkalemia. Hold ACE-I if K+ > 5.5 mEq/L.' }
    ]
};
