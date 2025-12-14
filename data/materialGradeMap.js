const materialList = [ 
    "FW00007396",
    "FW00156563",
    "FW00005721"
];

const gradeList = [    
    "PP-KF164 NSKP4060(PG05)",
    "PA66-G50 HSNC007(SI)",
    "PA6-RNG20 A2B-G0161"
];

const materialGradeMap = {
    "FW00007396":"PP-KF164 NSKP4060(PG05)",
    "FW00156563":"PA66-G50 HSNC007(SI)",
    "FW00005721":"PA6-RNG20 A2B-G0161"
};

const gradeMaterialMap = {};

Object.keys(materialGradeMap).forEach(m => {
  gradeMaterialMap[materialGradeMap[m]] = m;
});