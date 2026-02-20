/**
 * Quiz Bank Registry
 * The Nursing Collective
 *
 * Central registry of ALL 15 chapters and ALL 129 topics.
 * Each topic tracks whether it has questions (file != null)
 * and whether it has a completed study guide.
 *
 * When adding question files in later sessions, update the
 * `file` property to the data filename (e.g. "heart-failure.js").
 */

var QUIZ_BANK_REGISTRY = {
    chapters: [
        {
            id: "cardiovascular",
            label: "Cardiovascular",
            emoji: "\u2764\ufe0f",
            topics: [
                { id: "heart-failure", label: "Heart Failure", file: "cardiovascular/heart-failure.js", hasGuide: true, guideUrl: "heart-failure.html" },
                { id: "mi", label: "Myocardial Infarction", file: "cardiovascular/mi.js", hasGuide: true, guideUrl: "mi.html" },
                { id: "arrhythmias", label: "Arrhythmias", file: "cardiovascular/arrhythmias.js", hasGuide: true, guideUrl: "arrhythmias.html" },
                { id: "hypertension", label: "Hypertension", file: "cardiovascular/hypertension.js", hasGuide: true, guideUrl: "hypertension.html" },
                { id: "cad", label: "Coronary Artery Disease", file: "cardiovascular/cad.js", hasGuide: true, guideUrl: "cad.html" },
                { id: "pvd", label: "Peripheral Vascular Disease", file: "cardiovascular/pvd.js", hasGuide: true, guideUrl: "pvd.html" },
                { id: "valvular-heart-disease", label: "Valvular Heart Disease", file: null, hasGuide: false },
                { id: "shock", label: "Shock", file: null, hasGuide: false },
                { id: "cardiac-medications", label: "Cardiac Medications", file: null, hasGuide: false },
                { id: "heart-sounds", label: "Heart Sounds & Murmurs", file: null, hasGuide: false }
            ]
        },
        {
            id: "respiratory",
            label: "Respiratory",
            emoji: "\ud83e\udec1",
            topics: [
                { id: "copd", label: "COPD", file: "respiratory/copd.js", hasGuide: true, guideUrl: "copd.html" },
                { id: "asthma", label: "Asthma", file: "respiratory/asthma.js", hasGuide: true, guideUrl: "asthma.html" },
                { id: "pneumonia", label: "Pneumonia", file: "respiratory/pneumonia.js", hasGuide: true, guideUrl: "pneumonia.html" },
                { id: "tuberculosis", label: "Tuberculosis", file: "respiratory/tb.js", hasGuide: true, guideUrl: "tuberculosis.html" },
                { id: "oxygen-therapy", label: "Oxygen Therapy", file: "respiratory/oxygen-therapy.js", hasGuide: true, guideUrl: "oxygen-therapy.html" },
                { id: "chest-tubes", label: "Chest Tubes", file: "respiratory/chest-tubes.js", hasGuide: true, guideUrl: "chest-tubes.html" },
                { id: "mechanical-ventilation", label: "Mechanical Ventilation", file: null, hasGuide: false },
                { id: "pulmonary-embolism", label: "Pulmonary Embolism", file: null, hasGuide: false },
                { id: "ards", label: "ARDS", file: null, hasGuide: false },
                { id: "cystic-fibrosis", label: "Cystic Fibrosis", file: null, hasGuide: false },
                { id: "sleep-apnea", label: "Sleep Apnea / OSA", file: null, hasGuide: false },
                { id: "tracheostomy", label: "Tracheostomy Care", file: null, hasGuide: false }
            ]
        },
        {
            id: "neurological",
            label: "Neurological",
            emoji: "\ud83e\udde0",
            topics: [
                { id: "stroke", label: "Stroke", file: "neurological/stroke.js", hasGuide: true, guideUrl: "stroke.html" },
                { id: "seizures", label: "Seizures / Epilepsy", file: null, hasGuide: false },
                { id: "tbi-icp", label: "TBI / Increased ICP", file: null, hasGuide: false },
                { id: "spinal-cord-injury", label: "Spinal Cord Injury", file: null, hasGuide: false },
                { id: "meningitis", label: "Meningitis", file: null, hasGuide: false },
                { id: "parkinsons", label: "Parkinson's Disease", file: null, hasGuide: false },
                { id: "multiple-sclerosis", label: "Multiple Sclerosis", file: null, hasGuide: false },
                { id: "mg-guillain-barre", label: "Myasthenia Gravis / Guillain-Barr\u00e9", file: null, hasGuide: false },
                { id: "alzheimers-dementia", label: "Alzheimer's / Dementia", file: null, hasGuide: false },
                { id: "headaches", label: "Headaches / Migraines", file: null, hasGuide: false }
            ]
        },
        {
            id: "gi",
            label: "Gastrointestinal",
            emoji: "\ud83d\udd2c",
            topics: [
                { id: "gi-bleeding", label: "GI Bleeding", file: "gi/gi-bleeding.js", hasGuide: true, guideUrl: "gi-bleeding.html" },
                { id: "cirrhosis", label: "Liver Cirrhosis / Hepatic Failure", file: null, hasGuide: false },
                { id: "crohns-uc", label: "Crohn's vs Ulcerative Colitis", file: null, hasGuide: false },
                { id: "pud-gerd", label: "Peptic Ulcer Disease / GERD", file: null, hasGuide: false },
                { id: "pancreatitis", label: "Pancreatitis", file: null, hasGuide: false },
                { id: "bowel-obstruction", label: "Bowel Obstruction / Ileus", file: null, hasGuide: false },
                { id: "appendicitis", label: "Appendicitis / Peritonitis", file: null, hasGuide: false },
                { id: "cholecystitis", label: "Cholecystitis / Gallstones", file: null, hasGuide: false },
                { id: "ostomies", label: "Ostomies", file: null, hasGuide: false },
                { id: "nutrition-enteral", label: "Nutrition & Enteral Feeding", file: null, hasGuide: false }
            ]
        },
        {
            id: "musculoskeletal",
            label: "Musculoskeletal",
            emoji: "\ud83e\uddb4",
            topics: [
                { id: "fractures", label: "Fractures", file: "musculoskeletal/fractures.js", hasGuide: true, guideUrl: "fractures.html" },
                { id: "hip-knee-replacement", label: "Hip & Knee Replacement", file: "musculoskeletal/hip-knee.js", hasGuide: true, guideUrl: "hip-knee-replacement.html" },
                { id: "osteoporosis", label: "Osteoporosis", file: null, hasGuide: false },
                { id: "ra-vs-oa", label: "RA vs Osteoarthritis", file: null, hasGuide: false },
                { id: "amputation", label: "Amputation", file: null, hasGuide: false },
                { id: "traction-immobility", label: "Traction & Immobility", file: null, hasGuide: false },
                { id: "back-pain-spinal-surgery", label: "Back Pain / Spinal Surgery", file: null, hasGuide: false }
            ]
        },
        {
            id: "pharmacology",
            label: "Pharmacology",
            emoji: "\ud83d\udc8a",
            topics: [
                { id: "cardiac-meds", label: "Cardiac Medications", file: null, hasGuide: false },
                { id: "diabetes-meds", label: "Diabetes Medications", file: null, hasGuide: false },
                { id: "pain-opioids", label: "Pain Management / Opioids", file: null, hasGuide: false },
                { id: "antibiotics", label: "Antibiotics", file: null, hasGuide: false },
                { id: "psych-meds", label: "Psychiatric Medications", file: null, hasGuide: false },
                { id: "respiratory-meds", label: "Respiratory Medications", file: null, hasGuide: false },
                { id: "anticoagulants", label: "Anticoagulants", file: null, hasGuide: false },
                { id: "gi-meds", label: "GI Medications", file: null, hasGuide: false },
                { id: "immunosuppressants", label: "Immunosuppressants & Biologics", file: null, hasGuide: false },
                { id: "electrolyte-iv-fluids", label: "Electrolyte Replacement & IV Fluids", file: null, hasGuide: false },
                { id: "med-safety", label: "Medication Administration & Safety", file: null, hasGuide: false },
                { id: "drug-calculations", label: "Drug Calculations & Dosing", file: null, hasGuide: false }
            ]
        },
        {
            id: "endocrine",
            label: "Endocrine",
            emoji: "\ud83e\ude78",
            topics: [
                { id: "diabetes", label: "Diabetes Type 1 & Type 2", file: null, hasGuide: false },
                { id: "dka-hhs", label: "DKA vs HHS", file: null, hasGuide: false },
                { id: "thyroid", label: "Hypo vs Hyperthyroidism", file: null, hasGuide: false },
                { id: "addisons-cushings", label: "Addison's vs Cushing's", file: null, hasGuide: false },
                { id: "siadh-di", label: "SIADH vs Diabetes Insipidus", file: null, hasGuide: false },
                { id: "pheochromocytoma", label: "Pheochromocytoma", file: null, hasGuide: false }
            ]
        },
        {
            id: "renal",
            label: "Renal / Urinary",
            emoji: "\ud83d\udca7",
            topics: [
                { id: "fluid-electrolytes", label: "Fluid & Electrolytes", file: null, hasGuide: false },
                { id: "abgs-acid-base", label: "ABGs / Acid-Base Balance", file: null, hasGuide: false },
                { id: "aki", label: "Acute Kidney Injury", file: null, hasGuide: false },
                { id: "ckd", label: "Chronic Kidney Disease", file: null, hasGuide: false },
                { id: "dialysis", label: "Dialysis", file: null, hasGuide: false },
                { id: "uti-pyelo", label: "UTI / Pyelonephritis", file: null, hasGuide: false },
                { id: "urinary-cath", label: "Urinary Catheterization", file: null, hasGuide: false },
                { id: "nephrotic-nephritic", label: "Nephrotic vs Nephritic", file: null, hasGuide: false }
            ]
        },
        {
            id: "maternal",
            label: "Maternal-Newborn",
            emoji: "\ud83d\udc76",
            topics: [
                { id: "antepartum", label: "Antepartum Care", file: null, hasGuide: true, guideUrl: "antepartum-care.html" },
                { id: "labor-delivery", label: "Labor & Delivery", file: null, hasGuide: false },
                { id: "postpartum", label: "Postpartum Care", file: null, hasGuide: false },
                { id: "high-risk-pregnancy", label: "High-Risk Pregnancy", file: null, hasGuide: false },
                { id: "newborn-care", label: "Newborn Care & Transitioning", file: null, hasGuide: false },
                { id: "high-risk-newborn", label: "High-Risk Newborn", file: null, hasGuide: false },
                { id: "womens-health-gyn", label: "Women's Health & GYN Disorders", file: null, hasGuide: false },
                { id: "stis-reproductive-infections", label: "STIs & Reproductive Infections", file: null, hasGuide: false }
            ]
        },
        {
            id: "pediatrics",
            label: "Pediatrics",
            emoji: "\ud83d\udc67",
            topics: [
                { id: "growth-development", label: "Growth & Development", file: null, hasGuide: false },
                { id: "peds-respiratory", label: "Pediatric Respiratory", file: null, hasGuide: false },
                { id: "peds-cardiac", label: "Pediatric Cardiac", file: null, hasGuide: false },
                { id: "childhood-illnesses", label: "Common Childhood Illnesses", file: null, hasGuide: false },
                { id: "peds-emergencies", label: "Pediatric Emergencies", file: null, hasGuide: false },
                { id: "immunizations", label: "Immunizations", file: null, hasGuide: false },
                { id: "sickle-cell-peds-heme", label: "Sickle Cell / Pediatric Hematology", file: null, hasGuide: false },
                { id: "peds-diabetes", label: "Pediatric Diabetes", file: null, hasGuide: false }
            ]
        },
        {
            id: "mental-health",
            label: "Mental Health",
            emoji: "\ud83e\udde0",
            topics: [
                { id: "depression-suicide", label: "Depression & Suicide", file: null, hasGuide: false },
                { id: "anxiety", label: "Anxiety Disorders", file: null, hasGuide: false },
                { id: "bipolar", label: "Bipolar Disorder", file: null, hasGuide: false },
                { id: "schizophrenia", label: "Schizophrenia", file: null, hasGuide: false },
                { id: "substance-abuse", label: "Substance Abuse & Withdrawal", file: null, hasGuide: false },
                { id: "eating-disorders", label: "Eating Disorders", file: null, hasGuide: false },
                { id: "personality-crisis", label: "Personality Disorders / Crisis", file: null, hasGuide: false },
                { id: "therapeutic-comm", label: "Therapeutic Communication", file: null, hasGuide: false },
                { id: "legal-ethical-psych", label: "Legal & Ethical in Psych", file: null, hasGuide: false }
            ]
        },
        {
            id: "fundamentals",
            label: "Fundamentals",
            emoji: "\ud83d\udccb",
            topics: [
                { id: "assessment-skills", label: "Assessment Skills", file: "fundamentals/assessment-skills.js", hasGuide: true, guideUrl: "assessment-skills.html" },
                { id: "infection-control", label: "Infection Control", file: null, hasGuide: false },
                { id: "iv-transfusions", label: "IV Therapy & Blood Transfusions", file: null, hasGuide: false },
                { id: "delegation", label: "Delegation & Prioritization", file: null, hasGuide: false },
                { id: "patient-safety", label: "Patient Safety", file: null, hasGuide: false },
                { id: "wound-care", label: "Wound Care & Pressure Injuries", file: null, hasGuide: false },
                { id: "perioperative", label: "Perioperative Nursing", file: null, hasGuide: false },
                { id: "end-of-life", label: "End-of-Life / Palliative", file: null, hasGuide: false },
                { id: "cultural", label: "Cultural Competency", file: null, hasGuide: false },
                { id: "documentation", label: "Documentation & Legal", file: null, hasGuide: false },
                { id: "sepsis", label: "Sepsis", file: null, hasGuide: false }
            ]
        },
        {
            id: "oncology",
            label: "Oncology",
            emoji: "\ud83c\udf97\ufe0f",
            topics: [
                { id: "cancer-patho-staging", label: "Cancer Pathophysiology & Staging", file: null, hasGuide: false },
                { id: "chemo-nursing", label: "Chemotherapy Nursing Care", file: null, hasGuide: false },
                { id: "radiation", label: "Radiation Therapy", file: null, hasGuide: false },
                { id: "hematologic-cancers", label: "Hematologic Cancers", file: null, hasGuide: false },
                { id: "breast-cancer", label: "Breast Cancer", file: null, hasGuide: false },
                { id: "lung-colorectal", label: "Lung & Colorectal Cancer", file: null, hasGuide: false },
                { id: "gynecologic-cancers", label: "Gynecologic Cancers", file: null, hasGuide: false },
                { id: "oncologic-emergencies", label: "Oncologic Emergencies", file: null, hasGuide: false }
            ]
        },
        {
            id: "hematology",
            label: "Hematology",
            emoji: "\ud83e\ude78",
            topics: [
                { id: "anemia", label: "Anemia (Iron, B12, Folate, Aplastic)", file: null, hasGuide: false },
                { id: "sickle-cell", label: "Sickle Cell Disease (All Ages)", file: null, hasGuide: false },
                { id: "transfusion-reactions", label: "Blood Transfusion Reactions", file: null, hasGuide: false },
                { id: "clotting-disorders", label: "Clotting Disorders (DIC, Hemophilia, ITP)", file: null, hasGuide: false },
                { id: "polycythemia-thrombocytopenia", label: "Polycythemia & Thrombocytopenia", file: null, hasGuide: false },
                { id: "hiv-aids", label: "HIV/AIDS", file: null, hasGuide: false }
            ]
        },
        {
            id: "sensory-integumentary",
            label: "Sensory / Integumentary",
            emoji: "\ud83d\udc41\ufe0f",
            topics: [
                { id: "eye-disorders", label: "Eye Disorders", file: null, hasGuide: false },
                { id: "ear-disorders", label: "Ear Disorders", file: null, hasGuide: false },
                { id: "burns", label: "Burns", file: null, hasGuide: false },
                { id: "skin-disorders", label: "Skin Disorders", file: null, hasGuide: false }
            ]
        }
    ]
};
