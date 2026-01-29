import { Profile } from "@/types"

export const teacherData = [
    { id: "1", name: "MOHAN KUMAR SURAM", full_name: "MOHAN KUMAR SURAM", designation: "Principal", role: "Super Admin", department: "Management", email: "mohan@teacherpulse.in", mobile: "9642436669", avgScore: 98, joining_date: "2023-01-01" },
    { id: "2", name: "SURAM POOJA", full_name: "SURAM POOJA", designation: "Correspondent", role: "Super Admin", department: "Management", email: "pooja@teacherpulse.in", mobile: "8688397571", avgScore: 95, joining_date: "2023-01-01" },
    { id: "3", name: "VARIKUTI SATHYAM", full_name: "VARIKUTI SATHYAM", designation: "Vice Principal & HOD", role: "HOD", department: "High School (Grade 6 to 10)", email: "satyam@teacherpulse.in", mobile: "8501990675", avgScore: 92, joining_date: "2023-01-01" },
    { id: "4", name: "L SHASHIKALA", full_name: "L SHASHIKALA", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "shashikala@teacherpulse.in", mobile: "9247113318", avgScore: 88, joining_date: "2023-01-01" },
    { id: "5", name: "THATHIREDDY MANJULA", full_name: "THATHIREDDY MANJULA", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "tmanjula@teacherpulse.in", mobile: "9121767334", avgScore: 85, joining_date: "2023-01-01" },
    { id: "6", name: "ASRAUNNISA BEGUM", full_name: "ASRAUNNISA BEGUM", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "asraunnisa@teacherpulse.in", mobile: "9502214604", avgScore: 82, joining_date: "2023-01-01" },
    { id: "7", name: "KAUSAR BEGUM", full_name: "KAUSAR BEGUM", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "kausarbegum@teacherpulse.in", mobile: "8341418009", avgScore: 45, joining_date: "2023-01-01" },
    { id: "8", name: "MEHARUNNISA", full_name: "MEHARUNNISA", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "meharunnisa@teacherpulse.in", mobile: "9849756333", avgScore: 89, joining_date: "2023-01-01" },
    { id: "9", name: "SHAIK UMAR JANY", full_name: "SHAIK UMAR JANY", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "umarjany@teacherpulse.in", mobile: "9398916019", avgScore: 78, joining_date: "2023-01-01" },
    { id: "10", name: "SADIYA SULTANA", full_name: "SADIYA SULTANA", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "sadiyasulthana@teacherpulse.in", mobile: "7794077137", avgScore: 48, joining_date: "2023-01-01" },
    { id: "11", name: "DONTHULA PAVITHRA", full_name: "DONTHULA PAVITHRA", designation: "HOD", role: "HOD", department: "Primary (Grade 3 to 5)", email: "dpavithra@teacherpulse.in", mobile: "7032080957", avgScore: 93, joining_date: "2023-01-01" },
    { id: "12", name: "CHIGURLA RAJITHA", full_name: "CHIGURLA RAJITHA", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "chrajitha@teacherpulse.in", mobile: "9502814431", avgScore: 80, joining_date: "2023-01-01" },
    { id: "13", name: "JUTTU YAMINI", full_name: "JUTTU YAMINI", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "jyamini@teacherpulse.in", mobile: "7075426129", avgScore: 84, joining_date: "2023-01-01" },
    { id: "14", name: "JUVERIYA SANA", full_name: "JUVERIYA SANA", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "juveriyasana@teacherpulse.in", mobile: "7989210002", avgScore: 86, joining_date: "2023-01-01" },
    { id: "15", name: "JOGINI SWETHA", full_name: "JOGINI SWETHA", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "joginiswetha@teacherpulse.in", mobile: "9345746518", avgScore: 81, joining_date: "2023-01-01" },
    { id: "16", name: "TASLEEM BEGUM", full_name: "TASLEEM BEGUM", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "tasleembegum@teacherpulse.in", mobile: "9705702961", avgScore: 79, joining_date: "2023-01-01" },
    { id: "17", name: "SHIFA", full_name: "SHIFA", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "shifa@teacherpulse.in", mobile: "9618867592", avgScore: 83, joining_date: "2023-01-01" },
    { id: "18", name: "GUNDADI BHAVANA", full_name: "GUNDADI BHAVANA", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "gbhavana@teacherpulse.in", mobile: "7702231338", avgScore: 87, joining_date: "2023-01-01" },
    { id: "19", name: "GADAPA AMANI", full_name: "GADAPA AMANI", designation: "HOD", role: "HOD", department: "Grade 1 & 2", email: "gamani@teacherpulse.in", mobile: "8688562492", avgScore: 91, joining_date: "2023-01-01" },
    { id: "20", name: "SABBANI NAVITHA", full_name: "SABBANI NAVITHA", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "snavitha@teacherpulse.in", mobile: "9908553142", avgScore: 82, joining_date: "2023-01-01" },
    { id: "21", name: "PAMBALA SUHASINI", full_name: "PAMBALA SUHASINI", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "psuhasini@teacherpulse.in", mobile: "9281488012", avgScore: 85, joining_date: "2023-01-01" },
    { id: "22", name: "GANGA ARUNA", full_name: "GANGA ARUNA", designation: "Subject Teacher", role: "Teacher", department: "Foundational Primary", email: "gangaaruna@teacherpulse.in", mobile: "9703188654", avgScore: 80, joining_date: "2023-01-01" },
    { id: "23", name: "KOMIRELLI SAMPATHA", full_name: "KOMIRELLI SAMPATHA", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "ksampatha@teacherpulse.in", mobile: "9885427597", avgScore: 84, joining_date: "2023-01-01" },
    { id: "24", name: "PENTI AKSHARA", full_name: "PENTI AKSHARA", designation: "Subject Teacher", role: "Teacher", department: "Foundational Primary", email: "pakshara@teacherpulse.in", mobile: "9502759688", avgScore: 79, joining_date: "2023-01-01" },
    { id: "25", name: "BATTU ROSHINI", full_name: "BATTU ROSHINI", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "broshini@teacherpulse.in", mobile: "8639988077", avgScore: 88, joining_date: "2023-01-01" },
    { id: "26", name: "FARZANA", full_name: "FARZANA", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "farzana@teacherpulse.in", mobile: "8185090928", avgScore: 75, joining_date: "2023-01-01" },
    { id: "27", name: "BASADI RADHIKA", full_name: "BASADI RADHIKA", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "radhikab@teacherpulse.in", mobile: "9603484878", avgScore: 82, joining_date: "2023-01-01" },
    { id: "28", name: "PANCHEDDULA MAMATHA", full_name: "PANCHEDDULA MAMATHA", designation: "HOD", role: "HOD", department: "Pre Primary", email: "pmamatha@teacherpulse.in", mobile: "8499079798", avgScore: 94, joining_date: "2023-01-01" },
    { id: "29", name: "DAMARANCHA MAMATHA", full_name: "DAMARANCHA MAMATHA", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "dmamatha@teacherpulse.in", mobile: "9848653546", avgScore: 86, joining_date: "2023-01-01" },
    { id: "30", name: "AILA RAJINI", full_name: "AILA RAJINI", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "ailarajini@teacherpulse.in", mobile: "9603737027", avgScore: 85, joining_date: "2023-01-01" },
    { id: "31", name: "KAPPA SWAPNA", full_name: "KAPPA SWAPNA", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "kswapna@teacherpulse.in", mobile: "9553874108", avgScore: 88, joining_date: "2023-01-01" },
    { id: "32", name: "VADAKATTU RAJESHWARI", full_name: "VADAKATTU RAJESHWARI", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "vrajeshwari@teacherpulse.in", mobile: "9666243446", avgScore: 82, joining_date: "2023-01-01" },
    { id: "33", name: "CHINTHAPANDU KARUNA SRI", full_name: "CHINTHAPANDU KARUNA SRI", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "chkarunasri@teacherpulse.in", mobile: "6301577937", avgScore: 80, joining_date: "2023-01-01" },
    { id: "34", name: "CHINTAKINDI DEVARENAMMA", full_name: "CHINTAKINDI DEVARENAMMA", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "chdevarenamma@teacherpulse.in", mobile: "9912930243", avgScore: 81, joining_date: "2023-01-01" },
]

export const studentData = [
    { id: "1", name: "Arjun Singh", class: "10", section: "A", gender: "Male", fatherName: "Raj Singh", motherName: "Priya Singh", mobile: "9876543212", vidyaPulseScore: 85 },
    { id: "2", name: "Ananya Gupta", class: "9", section: "B", gender: "Female", fatherName: "Amit Gupta", motherName: "Neha Gupta", mobile: "9876543213", vidyaPulseScore: 90 },
]

export const parentData = [
    { id: "1", name: "Raj Singh", studentName: "Arjun Singh", class: "10", section: "A", gender: "Male", mobile: "9876543212", parentPulseScore: 78 },
    { id: "2", name: "Neha Gupta", studentName: "Ananya Gupta", class: "9", section: "B", gender: "Female", mobile: "9876543213", parentPulseScore: 88 },
]
