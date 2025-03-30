const testData = [
    {
        id: 1,
        name: "Liver Function Test",
        icon: "🧪",
        description: "A test to assess liver health and detect liver diseases.",
        who_should_take:
            "People with jaundice, fatigue, nausea, or long-term medication usage.",
        average_cost: 1200,
        body_part: "Liver",
        preparation: "Avoid alcohol and certain medications before the test.",
        test_type: "Blood test",
        common_markers_measured: [
            "Alanine aminotransferase (ALT)",
            "Aspartate aminotransferase (AST)",
            "Alkaline phosphatase (ALP)",
            "Bilirubin",
            "Albumin",
            "Total protein",
        ],
        normal_ranges: {
            ALT: "7-56 U/L",
            AST: "10-40 U/L",
            ALP: "44-147 IU/L",
            Bilirubin: "0.1-1.2 mg/dL",
            Albumin: "3.5-5.0 g/dL",
            "Total protein": "6.0-8.3 g/dL",
        },
        indications: [
            "Liver disease (hepatitis, cirrhosis)",
            "Bile duct obstruction",
            "Liver tumors",
            "Alcoholic liver disease",
            "Fatty liver disease",
        ],
        interpretation: {
            elevated_levels: "May indicate liver damage or disease.",
            decreased_levels: "May suggest liver dysfunction or malnutrition.",
        },
        follow_up_tests: [
            "Ultrasound of the liver",
            "CT scan",
            "MRI",
            "Liver biopsy",
        ],
        frequency:
            "As recommended by a healthcare provider, often annually or biannually for at-risk individuals.",
    },
    {
        id: 2,
        name: "Glucose Test",
        icon: "🩸",
        description:
            "A test to measure blood sugar levels and diagnose diabetes.",
        who_should_take:
            "People experiencing excessive thirst, frequent urination, fatigue, or unexplained weight loss.",
        average_cost: 500,
        body_part: "Blood",
        preparation:
            "Fast for 8-12 hours before the test (if required for fasting glucose test).",
        test_type: "Blood test",
        common_markers_measured: [
            "Fasting blood glucose (FBG)",
            "Postprandial blood glucose",
            "Hemoglobin A1c (HbA1c)",
        ],
        normal_ranges: {
            "Fasting glucose": "70-99 mg/dL",
            "Postprandial glucose": "<140 mg/dL",
            HbA1c: "<5.7%",
        },
        indications: [
            "Diabetes",
            "Prediabetes",
            "Hypoglycemia",
            "Hyperglycemia",
        ],
        interpretation: {
            elevated_levels:
                "Could indicate diabetes, stress, or certain medications.",
            decreased_levels:
                "May indicate hypoglycemia due to excessive insulin or fasting.",
        },
        follow_up_tests: [
            "Oral Glucose Tolerance Test (OGTT)",
            "Continuous glucose monitoring",
            "Insulin level test",
        ],
        frequency: "Annually for those at risk, or as recommended by a doctor.",
    },
    {
        id: 3,
        name: "Lipid Profile",
        icon: "🫀",
        description:
            "A test to measure cholesterol and triglyceride levels in your blood.",
        who_should_take:
            "Individuals with heart disease risk, obesity, diabetes, or a family history of high cholesterol.",
        average_cost: 700,
        body_part: "Blood",
        preparation: "Avoid food for 9-12 hours before the test.",
        test_type: "Blood test",
        common_markers_measured: [
            "Total cholesterol",
            "HDL (good cholesterol)",
            "LDL (bad cholesterol)",
            "Triglycerides",
        ],
        normal_ranges: {
            "Total cholesterol": "<200 mg/dL",
            HDL: ">40 mg/dL",
            LDL: "<100 mg/dL",
            Triglycerides: "<150 mg/dL",
        },
        indications: [
            "Heart disease risk assessment",
            "Atherosclerosis",
            "Metabolic syndrome",
            "Obesity",
        ],
        interpretation: {
            elevated_levels:
                "May indicate high heart disease risk and require lifestyle changes or medication.",
            decreased_levels:
                "Rare but could indicate malnutrition or other health conditions.",
        },
        follow_up_tests: [
            "Cardiac stress test",
            "ECG",
            "Coronary calcium scan",
        ],
        frequency: "Every 4-6 years for adults, more often if at risk.",
    },
    {
        id: 4,
        name: "Thyroid Function Test",
        icon: "🦋",
        description:
            "A test to assess thyroid function and detect thyroid disorders.",
        who_should_take:
            "People with fatigue, weight changes, hair thinning, or irregular heart rate.",
        average_cost: 800,
        body_part: "Thyroid",
        preparation:
            "No special preparation needed, but some medications may affect results.",
        test_type: "Blood test",
        common_markers_measured: [
            "Thyroid-stimulating hormone (TSH)",
            "Free T3",
            "Free T4",
        ],
        normal_ranges: {
            TSH: "0.4-4.0 mIU/L",
            "Free T3": "2.3-4.2 pg/mL",
            "Free T4": "0.8-1.8 ng/dL",
        },
        indications: [
            "Hypothyroidism",
            "Hyperthyroidism",
            "Goiter",
            "Thyroid nodules",
        ],
        interpretation: {
            elevated_levels:
                "May indicate an underactive thyroid (hypothyroidism).",
            decreased_levels:
                "May indicate an overactive thyroid (hyperthyroidism).",
        },
        follow_up_tests: [
            "Thyroid ultrasound",
            "Radioactive iodine uptake test",
        ],
        frequency: "Every 1-2 years for those at risk, or as recommended.",
    },
    {
        id: 5,
        name: "Complete Blood Count (CBC)",
        icon: "🩸",
        description:
            "A test to evaluate overall health and detect disorders like anemia and infections.",
        who_should_take:
            "Individuals with fatigue, weakness, infections, or unexplained bruising.",
        average_cost: 600,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: [
            "Red blood cell count (RBC)",
            "White blood cell count (WBC)",
            "Hemoglobin (Hb)",
            "Hematocrit (Hct)",
            "Platelet count",
        ],
        normal_ranges: {
            RBC: "4.7-6.1 million cells/uL",
            WBC: "4,000-11,000 cells/uL",
            Hb: "13.8-17.2 g/dL",
            Hct: "40.7-50.3%",
            Platelets: "150,000-450,000 cells/uL",
        },
        indications: [
            "Anemia",
            "Leukemia",
            "Infections",
            "Bone marrow disorders",
        ],
        interpretation: {
            elevated_levels:
                "May indicate infection, inflammation, or a blood disorder.",
            decreased_levels:
                "May suggest anemia, bone marrow failure, or nutritional deficiencies.",
        },
        follow_up_tests: [
            "Peripheral blood smear",
            "Bone marrow biopsy",
            "Iron studies",
        ],
        frequency: "Annually for general health check-ups or as needed.",
    },
    {
        id: 6,
        name: "Vitamin D Test",
        icon: "☀️",
        description: "A test to measure the level of vitamin D in the blood.",
        who_should_take:
            "Individuals with bone pain, fatigue, or those at risk of deficiency.",
        average_cost: 300,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["25-hydroxyvitamin D"],
        normal_ranges: {
            "25-hydroxyvitamin D": "20-50 ng/mL",
        },
        indications: [
            "Vitamin D deficiency",
            "Bone disorders",
            "Osteoporosis risk assessment",
        ],
        interpretation: {
            elevated_levels:
                "May indicate excessive vitamin D intake or certain health conditions.",
            decreased_levels:
                "May suggest deficiency, leading to bone health issues.",
        },
        follow_up_tests: ["Bone density test", "Calcium level test"],
        frequency:
            "As recommended by a healthcare provider, often annually for at-risk individuals.",
    },
    {
        id: 7,
        name: "Prostate-Specific Antigen (PSA) Test",
        icon: "🧑‍⚕️",
        description:
            "A test to measure the level of PSA in the blood to screen for prostate issues.",
        who_should_take:
            "Men over 50 or those with a family history of prostate cancer.",
        average_cost: 400,
        body_part: "Prostate",
        preparation: "Avoid ejaculation 24 hours before the test.",
        test_type: "Blood test",
        common_markers_measured: ["Prostate-specific antigen (PSA)"],
        normal_ranges: {
            PSA: "<4.0 ng/mL",
        },
        indications: [
            "Prostate cancer screening",
            "Monitoring prostate cancer treatment",
        ],
        interpretation: {
            elevated_levels:
                "May indicate prostate cancer or benign prostatic hyperplasia (BPH).",
            decreased_levels:
                "Generally considered normal, but should be interpreted in context.",
        },
        follow_up_tests: ["Prostate biopsy", "MRI of the prostate"],
        frequency: "Annually for men at risk, or as recommended by a doctor.",
    },
    {
        id: 8,
        name: "Hemoglobin A1c Test",
        icon: "🩸",
        description:
            "A test to measure average blood sugar levels over the past 2-3 months.",
        who_should_take:
            "Individuals with diabetes or those at risk of developing diabetes.",
        average_cost: 350,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["Hemoglobin A1c (HbA1c)"],
        normal_ranges: {
            HbA1c: "<5.7%",
        },
        indications: ["Diabetes management", "Prediabetes screening"],
        interpretation: {
            elevated_levels:
                "Indicates poor blood sugar control and increased diabetes risk.",
            decreased_levels: "Rare, but may indicate certain blood disorders.",
        },
        follow_up_tests: [
            "Fasting blood glucose test",
            "Oral Glucose Tolerance Test (OGTT)",
        ],
        frequency:
            "Every 3-6 months for those with diabetes, or as recommended.",
    },
    {
        id: 9,
        name: "C-Reactive Protein (CRP) Test",
        icon: "🩸",
        description:
            "A test to measure the level of CRP in the blood, indicating inflammation.",
        who_should_take:
            "Individuals with unexplained pain, fever, or chronic inflammatory conditions.",
        average_cost: 250,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["C-reactive protein (CRP)"],
        normal_ranges: {
            CRP: "<3.0 mg/L",
        },
        indications: [
            "Infection",
            "Autoimmune diseases",
            "Chronic inflammatory conditions",
        ],
        interpretation: {
            elevated_levels:
                "May indicate inflammation, infection, or chronic disease.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "ESR (Erythrocyte Sedimentation Rate)",
            "Imaging studies for underlying conditions",
        ],
        frequency:
            "As recommended by a healthcare provider, often during evaluations of inflammatory conditions.",
    },
    {
        id: 10,
        name: "Urinalysis",
        icon: "💧",
        description:
            "A test to analyze urine for various substances and cells.",
        who_should_take:
            "Individuals with urinary symptoms, diabetes, or kidney issues.",
        average_cost: 150,
        body_part: "Urine",
        preparation: "No special preparation needed.",
        test_type: "Urine test",
        common_markers_measured: [
            "pH",
            "Protein",
            "Glucose",
            "Ketones",
            "Blood",
            "Leukocytes",
        ],
        normal_ranges: {
            pH: "4.5-8.0",
            Protein: "Negative",
            Glucose: "Negative",
            Ketones: "Negative",
            Blood: "Negative",
            Leukocytes: "Negative",
        },
        indications: [
            "Urinary tract infections (UTIs)",
            "Kidney disease",
            "Diabetes management",
        ],
        interpretation: {
            elevated_levels:
                "May indicate infection, kidney disease, or diabetes.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Urine culture",
            "Imaging studies for kidney evaluation",
        ],
        frequency:
            "As recommended by a healthcare provider, often during routine check-ups.",
    },
    {
        id: 11,
        name: "Hepatitis Panel",
        icon: "🦠",
        description:
            "A series of blood tests to detect hepatitis A, B, and C infections.",
        who_should_take:
            "Individuals with risk factors for hepatitis or unexplained liver issues.",
        average_cost: 400,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: [
            "Hepatitis A IgM",
            "Hepatitis B surface antigen (HBsAg)",
            "Hepatitis C antibody (anti-HCV)",
        ],
        normal_ranges: {
            "Hepatitis A IgM": "Negative",
            HBsAg: "Negative",
            "anti-HCV": "Negative",
        },
        indications: [
            "Hepatitis infection diagnosis",
            "Monitoring chronic hepatitis",
        ],
        interpretation: {
            elevated_levels: "May indicate active hepatitis infection.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: ["Liver function tests", "HCV RNA test"],
        frequency:
            "As recommended by a healthcare provider, especially for at-risk individuals.",
    },
    {
        id: 12,
        name: "Electrolyte Panel",
        icon: "⚡",
        description:
            "A test to measure the levels of key electrolytes in the blood.",
        who_should_take:
            "Individuals with symptoms of electrolyte imbalance, dehydration, or kidney issues.",
        average_cost: 250,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: [
            "Sodium",
            "Potassium",
            "Chloride",
            "Bicarbonate",
        ],
        normal_ranges: {
            Sodium: "135-145 mEq/L",
            Potassium: "3.5-5.0 mEq/L",
            Chloride: "98-106 mEq/L",
            Bicarbonate: "22-28 mEq/L",
        },
        indications: ["Dehydration", "Kidney disease", "Acid-base disorders"],
        interpretation: {
            elevated_levels: "May indicate dehydration or kidney dysfunction.",
            decreased_levels:
                "May suggest overhydration or certain medical conditions.",
        },
        follow_up_tests: ["Renal function tests", "Urine electrolyte tests"],
        frequency:
            "As recommended by a healthcare provider, especially in at-risk populations.",
    },
    {
        id: 13,
        name: "Skin Allergy Test",
        icon: "🌿",
        description:
            "A test to identify allergens that may cause skin reactions.",
        who_should_take:
            "Individuals with unexplained skin rashes, itching, or allergic reactions.",
        average_cost: 200,
        body_part: "Skin",
        preparation: "Avoid antihistamines for a few days before the test.",
        test_type: "Skin test",
        common_markers_measured: ["Allergen-specific IgE"],
        normal_ranges: {
            "Allergen-specific IgE": "Negative",
        },
        indications: ["Allergic dermatitis", "Eczema", "Food allergies"],
        interpretation: {
            elevated_levels: "May indicate an allergy to specific substances.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Blood allergy tests",
            "Patch testing for contact allergies",
        ],
        frequency: "As recommended by an allergist or healthcare provider.",
    },
    {
        id: 14,
        name: "Bone Density Test",
        icon: "🦴",
        description:
            "A test to measure bone mineral density and assess fracture risk.",
        who_should_take:
            "Individuals at risk for osteoporosis or fractures, especially postmenopausal women.",
        average_cost: 350,
        body_part: "Bone",
        preparation: "No special preparation needed.",
        test_type: "Imaging test",
        common_markers_measured: ["Bone mineral density (BMD)"],
        normal_ranges: {
            BMD: "Varies by age and sex, compared to a reference population.",
        },
        indications: ["Osteoporosis screening", "Fracture risk assessment"],
        interpretation: {
            elevated_levels: "Generally not applicable.",
            decreased_levels: "May indicate osteoporosis or low bone mass.",
        },
        follow_up_tests: [
            "Calcium and vitamin D level tests",
            "Fracture risk assessment tools",
        ],
        frequency: "Every 1-2 years for those at risk, or as recommended.",
    },
    {
        id: 15,
        name: "Allergy Blood Test",
        icon: "💉",
        description:
            "A blood test to measure the immune response to specific allergens.",
        who_should_take: "Individuals with suspected allergies or asthma.",
        average_cost: 300,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["Total IgE", "Allergen-specific IgE"],
        normal_ranges: {
            "Total IgE": "<100 IU/mL",
        },
        indications: ["Allergic rhinitis", "Asthma", "Food allergies"],
        interpretation: {
            elevated_levels: "May indicate an allergic response.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Skin prick tests",
            "Elimination diets for food allergies",
        ],
        frequency:
            "As recommended by a healthcare provider, especially for those with allergy symptoms.",
    },
    {
        id: 21,
        name: "Folate Test",
        icon: "🍃",
        description:
            "A test to measure the level of folate (vitamin B9) in the blood.",
        who_should_take:
            "Individuals with symptoms of deficiency, such as fatigue or anemia.",
        average_cost: 250,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["Folate"],
        normal_ranges: {
            Folate: "3.0-17.0 ng/mL",
        },
        indications: ["Folate deficiency", "Anemia"],
        interpretation: {
            elevated_levels:
                "May indicate excessive supplementation or certain medical conditions.",
            decreased_levels:
                "May suggest deficiency, leading to anemia or other health issues.",
        },
        follow_up_tests: ["Vitamin B12 test", "Complete Blood Count (CBC)"],
        frequency:
            "As recommended by a healthcare provider, especially for those at risk.",
    },
    {
        id: 22,
        name: "Lactate Test",
        icon: "⚗️",
        description:
            "A test to measure the level of lactate in the blood, indicating tissue hypoxia.",
        who_should_take:
            "Individuals with symptoms of sepsis, shock, or respiratory failure.",
        average_cost: 300,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["Lactate"],
        normal_ranges: {
            Lactate: "0.5-2.2 mmol/L",
        },
        indications: ["Sepsis", "Shock", "Lactic acidosis"],
        interpretation: {
            elevated_levels:
                "May indicate tissue hypoxia or metabolic disorders.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: ["Arterial blood gas (ABG) test", "Metabolic panel"],
        frequency:
            "As recommended by a healthcare provider, especially in critical care settings.",
    },
    {
        id: 23,
        name: "D-dimer Test",
        icon: "🩸",
        description:
            "A test to measure the level of D-dimer in the blood, used to rule out blood clots.",
        who_should_take:
            "Individuals with symptoms of deep vein thrombosis (DVT) or pulmonary embolism (PE).",
        average_cost: 250,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["D-dimer"],
        normal_ranges: {
            "D-dimer": "<500 ng/mL",
        },
        indications: ["Suspected DVT", "Suspected PE"],
        interpretation: {
            elevated_levels:
                "May indicate the presence of a blood clot, but not specific to location.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Ultrasound for DVT",
            "CT pulmonary angiography for PE",
        ],
        frequency:
            "As recommended by a healthcare provider, especially in acute settings.",
    },
    {
        id: 24,
        name: "HIV Test",
        icon: "🦠",
        description:
            "A test to detect the presence of HIV antibodies or antigens in the blood.",
        who_should_take:
            "Individuals at risk for HIV or with symptoms of infection.",
        average_cost: 300,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["HIV antibodies", "HIV antigens"],
        normal_ranges: {
            "HIV antibodies": "Negative",
            "HIV antigens": "Negative",
        },
        indications: ["HIV infection screening", "Monitoring HIV treatment"],
        interpretation: {
            elevated_levels: "May indicate an active HIV infection.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: ["HIV viral load test", "CD4 count test"],
        frequency:
            "As recommended by a healthcare provider, especially for at-risk individuals.",
    },
    {
        id: 25,
        name: "Genetic Testing",
        icon: "🧬",
        description:
            "A test to analyze DNA for genetic disorders or predispositions.",
        who_should_take:
            "Individuals with a family history of genetic disorders or unexplained health issues.",
        average_cost: 1000,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Genetic test",
        common_markers_measured: ["Specific gene mutations"],
        normal_ranges: {
            "Gene mutations": "Negative (no mutations detected)",
        },
        indications: ["Hereditary conditions", "Cancer risk assessment"],
        interpretation: {
            elevated_levels:
                "May indicate a genetic predisposition to certain conditions.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Counseling for genetic risk",
            "Additional targeted testing based on results",
        ],
        frequency:
            "As recommended by a healthcare provider, especially for those with family history.",
    },
    {
        id: 26,
        name: "Cortisol Test",
        icon: "🧪",
        description:
            "A test to measure the level of cortisol, a hormone produced by the adrenal glands.",
        who_should_take:
            "Individuals with symptoms of adrenal insufficiency or Cushing's syndrome.",
        average_cost: 300,
        body_part: "Blood",
        preparation:
            "No special preparation needed, but timing of the test is important (usually in the morning).",
        test_type: "Blood test",
        common_markers_measured: ["Cortisol"],
        normal_ranges: {
            Cortisol: "6-23 µg/dL (morning levels)",
        },
        indications: [
            "Adrenal insufficiency",
            "Cushing's syndrome",
            "Stress response evaluation",
        ],
        interpretation: {
            elevated_levels: "May indicate Cushing's syndrome or stress.",
            decreased_levels:
                "May suggest adrenal insufficiency or Addison's disease.",
        },
        follow_up_tests: [
            "ACTH stimulation test",
            "24-hour urine free cortisol test",
        ],
        frequency:
            "As recommended by a healthcare provider, especially for those with symptoms.",
    },
    {
        id: 27,
        name: "Creatine Kinase (CK) Test",
        icon: "💪",
        description:
            "A test to measure the level of creatine kinase, an enzyme found in the heart, brain, and skeletal muscle.",
        who_should_take:
            "Individuals with muscle pain, weakness, or suspected heart attack.",
        average_cost: 250,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["Creatine kinase (CK)"],
        normal_ranges: {
            CK: "30-200 U/L (varies by age and sex)",
        },
        indications: [
            "Muscle damage",
            "Heart attack diagnosis",
            "Rhabdomyolysis",
        ],
        interpretation: {
            elevated_levels:
                "May indicate muscle injury, heart attack, or strenuous exercise.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Troponin test for heart damage",
            "Muscle biopsy if indicated",
        ],
        frequency:
            "As recommended by a healthcare provider, especially in acute settings.",
    },
    {
        id: 28,
        name: "Urine Culture",
        icon: "💧",
        description:
            "A test to detect bacteria or yeast in the urine, used to diagnose urinary tract infections (UTIs).",
        who_should_take:
            "Individuals with symptoms of a UTI, such as burning during urination or frequent urination.",
        average_cost: 150,
        body_part: "Urine",
        preparation: "No special preparation needed.",
        test_type: "Urine test",
        common_markers_measured: [
            "Bacterial growth",
            "Sensitivity to antibiotics",
        ],
        normal_ranges: {
            "Bacterial growth": "Negative (no growth)",
        },
        indications: [
            "Urinary tract infections",
            "Monitoring treatment effectiveness",
        ],
        interpretation: {
            elevated_levels:
                "May indicate a UTI or other urinary tract issues.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Urinalysis",
            "Imaging studies if recurrent infections occur",
        ],
        frequency:
            "As recommended by a healthcare provider, especially for those with recurrent UTIs.",
    },
    {
        id: 29,
        name: "Pap Smear",
        icon: "🩺",
        description:
            "A test to screen for cervical cancer and other abnormalities in the cervix.",
        who_should_take:
            "Women aged 21 and older, or as recommended by a healthcare provider.",
        average_cost: 150,
        body_part: "Cervix",
        preparation:
            "Avoid intercourse, douching, or using tampons for 24 hours before the test.",
        test_type: "Cervical screening",
        common_markers_measured: ["Cervical cells"],
        normal_ranges: {
            "Cervical cells":
                "Negative for intraepithelial lesion or malignancy.",
        },
        indications: [
            "Cervical cancer screening",
            "Monitoring for HPV-related changes",
        ],
        interpretation: {
            elevated_levels: "May indicate abnormal cells or cervical cancer.",
            decreased_levels: "Generally considered normal.",
        },
        follow_up_tests: [
            "Colposcopy if abnormal results are found",
            "HPV testing if indicated",
        ],
        frequency:
            "Every 3 years for women aged 21-29, or every 5 years with HPV testing for women aged 30-65.",
    },
    {
        id: 30,
        name: "Blood Type Test",
        icon: "🩸",
        description:
            "A test to determine an individual's blood type (A, B, AB, or O) and Rh factor.",
        who_should_take:
            "Individuals needing blood transfusions, organ transplants, or during pregnancy.",
        average_cost: 100,
        body_part: "Blood",
        preparation: "No special preparation needed.",
        test_type: "Blood test",
        common_markers_measured: ["ABO blood group", "Rh factor"],
        normal_ranges: {
            "ABO blood group": "A, B, AB, or O",
            "Rh factor": "Positive or Negative",
        },
        indications: [
            "Blood transfusion compatibility",
            "Pregnancy management",
        ],
        interpretation: {
            elevated_levels: "Not applicable.",
            decreased_levels: "Not applicable.",
        },
        follow_up_tests: ["Crossmatch test for transfusion compatibility"],
        frequency: "As needed, especially before surgeries or transfusions.",
    },
    // Add more tests here to reach 50...
];

export default testData;
