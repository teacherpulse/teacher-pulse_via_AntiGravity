import { Profile } from "@/types"

export const teacherData = [
    { id: "1", name: "Mohan Kumar Suram", full_name: "Mohan Kumar Suram", designation: "Principal", role: "Super Admin", department: "Management", email: "mohan@teacherpulse.in", mobile: "9642436669", avgScore: 98, joining_date: "01-01-2023", current_assessment_score: 98, module_name: "Leadership Pulse", total_average_current_year: 97, assessment_date: "28-01-2024 09:00 AM" },
    { id: "2", name: "Suram Pooja", full_name: "Suram Pooja", designation: "Correspondent", role: "Super Admin", department: "Management", email: "pooja@teacherpulse.in", mobile: "8688397571", avgScore: 95, joining_date: "01-01-2023", current_assessment_score: 95, module_name: "Leadership Pulse", total_average_current_year: 96, assessment_date: "28-01-2024 10:00 AM" },
    { id: "3", name: "Varikuti Satyam", full_name: "Varikuti Satyam", designation: "Vice Principal & HOD", role: "HOD", department: "High School (Grade 6 to 10)", email: "satyam@teacherpulse.in", mobile: "8501990675", avgScore: 92, joining_date: "01-01-2023", current_assessment_score: 92, module_name: "CTM", total_average_current_year: 90, assessment_date: "25-01-2024 11:30 AM" },
    { id: "4", name: "L Shashikala", full_name: "L Shashikala", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "shashikala@teacherpulse.in", mobile: "9247113318", avgScore: 88, joining_date: "01-01-2023", current_assessment_score: 88, module_name: "LTO", total_average_current_year: 85, assessment_date: "24-01-2024 02:15 PM" },
    { id: "5", name: "Thathireddy Manjula", full_name: "Thathireddy Manjula", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "tmanjula@teacherpulse.in", mobile: "9121767334", avgScore: 85, joining_date: "01-01-2023", current_assessment_score: 85, module_name: "PIE", total_average_current_year: 82, assessment_date: "23-01-2024 09:45 AM" },
    { id: "6", name: "Asraunnisa Begum", full_name: "Asraunnisa Begum", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "asraunnisa@teacherpulse.in", mobile: "9502214604", avgScore: 82, joining_date: "01-01-2023", current_assessment_score: 82, module_name: "CTM", total_average_current_year: 80, assessment_date: "22-01-2024 10:00 AM" },
    { id: "7", name: "Kausar Begum", full_name: "Kausar Begum", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "kausarbegum@teacherpulse.in", mobile: "8341418009", avgScore: 45, joining_date: "01-01-2023", current_assessment_score: 45, module_name: "LTO", total_average_current_year: 50, assessment_date: "21-01-2024 03:00 PM", status: "inactive" as const },
    { id: "8", name: "Meharunnisa", full_name: "Meharunnisa", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "meharunnisa@teacherpulse.in", mobile: "9849756333", avgScore: 89, joining_date: "01-01-2023", current_assessment_score: 89, module_name: "PIE", total_average_current_year: 88, assessment_date: "20-01-2024 11:00 AM" },
    { id: "9", name: "Shaik Umar Jany", full_name: "Shaik Umar Jany", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "umarjany@teacherpulse.in", mobile: "9398916019", avgScore: 78, joining_date: "01-01-2023", current_assessment_score: 78, module_name: "CTM", total_average_current_year: 79, assessment_date: "19-01-2024 12:30 PM" },
    { id: "10", name: "Sadiya Sultana", full_name: "Sadiya Sultana", designation: "Subject Teacher", role: "Teacher", department: "High School (Grade 6 to 10)", email: "sadiyasulthana@teacherpulse.in", mobile: "7794077137", avgScore: 48, joining_date: "01-01-2023", current_assessment_score: 48, module_name: "LTO", total_average_current_year: 52, assessment_date: "18-01-2024 04:00 PM" },
    { id: "11", name: "Donthula Pavithra", full_name: "Donthula Pavithra", designation: "HOD", role: "HOD", department: "Primary (Grade 3 to 5)", email: "dpavithra@teacherpulse.in", mobile: "7032080957", avgScore: 93, joining_date: "01-01-2023", current_assessment_score: 93, module_name: "CTM", total_average_current_year: 94, assessment_date: "17-01-2024 10:00 AM" },
    { id: "12", name: "Chigurla Rajitha", full_name: "Chigurla Rajitha", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "chrajitha@teacherpulse.in", mobile: "9502814431", avgScore: 80, joining_date: "01-01-2023", current_assessment_score: 80, module_name: "LTO", total_average_current_year: 81, assessment_date: "16-01-2024 11:00 AM" },
    { id: "13", name: "Juttu Yamini", full_name: "Juttu Yamini", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "jyamini@teacherpulse.in", mobile: "7075426129", avgScore: 84, joining_date: "01-01-2023", current_assessment_score: 84, module_name: "PIE", total_average_current_year: 83, assessment_date: "15-01-2024 02:00 PM" },
    { id: "14", name: "Juveriya Sana", full_name: "Juveriya Sana", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "juveriyasana@teacherpulse.in", mobile: "7989210002", avgScore: 86, joining_date: "01-01-2023", current_assessment_score: 86, module_name: "CTM", total_average_current_year: 85, assessment_date: "14-01-2024 09:30 AM" },
    { id: "15", name: "Jogini Swetha", full_name: "Jogini Swetha", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "joginiswetha@teacherpulse.in", mobile: "9345746518", avgScore: 81, joining_date: "01-01-2023", current_assessment_score: 81, module_name: "LTO", total_average_current_year: 80, assessment_date: "13-01-2024 10:45 AM" },
    { id: "16", name: "Tasleem Begum", full_name: "Tasleem Begum", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "tasleembegum@teacherpulse.in", mobile: "9705702961", avgScore: 79, joining_date: "01-01-2023", current_assessment_score: 80, module_name: "PIE", total_average_current_year: 79, assessment_date: "12-01-2024 01:15 PM" },
    { id: "17", name: "Shifa", full_name: "Shifa", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "shifa@teacherpulse.in", mobile: "9618867592", avgScore: 83, joining_date: "01-01-2023", current_assessment_score: 83, module_name: "CTM", total_average_current_year: 82, assessment_date: "11-01-2024 03:00 PM" },
    { id: "18", name: "Gundadi Bhavana", full_name: "Gundadi Bhavana", designation: "Subject Teacher", role: "Teacher", department: "Primary (Grade 3 to 5)", email: "gbhavana@teacherpulse.in", mobile: "7702231338", avgScore: 87, joining_date: "01-01-2023", current_assessment_score: 87, module_name: "LTO", total_average_current_year: 86, assessment_date: "10-01-2024 11:30 AM" },
    { id: "19", name: "Gadapa Amani", full_name: "Gadapa Amani", designation: "HOD", role: "HOD", department: "Grade 1 & 2", email: "gamani@teacherpulse.in", mobile: "8688562492", avgScore: 91, joining_date: "01-01-2023", current_assessment_score: 91, module_name: "CTM", total_average_current_year: 90, assessment_date: "09-01-2024 10:00 AM" },
    { id: "20", name: "Sabbani Navitha", full_name: "Sabbani Navitha", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "snavitha@teacherpulse.in", mobile: "9908553142", avgScore: 82, joining_date: "01-01-2023", current_assessment_score: 82, module_name: "LTO", total_average_current_year: 83, assessment_date: "08-01-2024 09:15 AM" },
    { id: "21", name: "Pambala Suhasini", full_name: "Pambala Suhasini", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "psuhasini@teacherpulse.in", mobile: "9281488012", avgScore: 85, joining_date: "01-01-2023", current_assessment_score: 85, module_name: "PIE", total_average_current_year: 84, assessment_date: "07-01-2024 02:30 PM" },
    { id: "22", name: "Ganga Aruna", full_name: "Ganga Aruna", designation: "Subject Teacher", role: "Teacher", department: "Foundational Primary", email: "gangaaruna@teacherpulse.in", mobile: "9703188654", avgScore: 80, joining_date: "01-01-2023", current_assessment_score: 80, module_name: "CTM", total_average_current_year: 81, assessment_date: "06-01-2024 12:45 PM" },
    { id: "23", name: "Komirelli Sampatha", full_name: "Komirelli Sampatha", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "ksampatha@teacherpulse.in", mobile: "9885427597", avgScore: 84, joining_date: "01-01-2023", current_assessment_score: 84, module_name: "LTO", total_average_current_year: 85, assessment_date: "05-01-2024 10:30 AM" },
    { id: "24", name: "Penti Akshara", full_name: "Penti Akshara", designation: "Subject Teacher", role: "Teacher", department: "Foundational Primary", email: "pakshara@teacherpulse.in", mobile: "9502759688", avgScore: 79, joining_date: "01-01-2023", current_assessment_score: 79, module_name: "PIE", total_average_current_year: 78, assessment_date: "04-01-2024 11:15 AM" },
    { id: "25", name: "Battu Roshini", full_name: "Battu Roshini", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "broshini@teacherpulse.in", mobile: "8639988077", avgScore: 88, joining_date: "01-01-2023", current_assessment_score: 88, module_name: "CTM", total_average_current_year: 87, assessment_date: "03-01-2024 01:00 PM" },
    { id: "26", name: "Farzana", full_name: "Farzana", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "farzana@teacherpulse.in", mobile: "8185090928", avgScore: 75, joining_date: "01-01-2023", current_assessment_score: 75, module_name: "LTO", total_average_current_year: 76, assessment_date: "02-01-2024 03:30 PM" },
    { id: "27", name: "Basadi Radhika", full_name: "Basadi Radhika", designation: "Subject Teacher", role: "Teacher", department: "Grade 1 & 2", email: "radhikab@teacherpulse.in", mobile: "9603484878", avgScore: 82, joining_date: "01-01-2023", current_assessment_score: 82, module_name: "PIE", total_average_current_year: 81, assessment_date: "30-12-2023 10:00 AM" },
    { id: "28", name: "Pancheddula Mamatha", full_name: "Pancheddula Mamatha", designation: "HOD", role: "HOD", department: "Pre Primary", email: "pmamatha@teacherpulse.in", mobile: "8499079798", avgScore: 94, joining_date: "01-01-2023", current_assessment_score: 94, module_name: "CTM", total_average_current_year: 95, assessment_date: "29-12-2023 11:00 AM" },
    { id: "29", name: "Damarancha Mamatha", full_name: "Damarancha Mamatha", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "dmamatha@teacherpulse.in", mobile: "9848653546", avgScore: 86, joining_date: "01-01-2023", current_assessment_score: 86, module_name: "LTO", total_average_current_year: 85, assessment_date: "28-12-2023 02:00 PM" },
    { id: "30", name: "Aila Rajini", full_name: "Aila Rajini", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "ailarajini@teacherpulse.in", mobile: "9603737027", avgScore: 85, joining_date: "01-01-2023", current_assessment_score: 85, module_name: "PIE", total_average_current_year: 84, assessment_date: "27-12-2023 09:30 AM" },
    { id: "31", name: "Kappa Swapna", full_name: "Kappa Swapna", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "kswapna@teacherpulse.in", mobile: "9553874108", avgScore: 88, joining_date: "01-01-2023", current_assessment_score: 88, module_name: "CTM", total_average_current_year: 89, assessment_date: "26-12-2023 10:45 AM" },
    { id: "32", name: "Vadakattu Rajeshwari", full_name: "Vadakattu Rajeshwari", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "vrajeshwari@teacherpulse.in", mobile: "9666243446", avgScore: 82, joining_date: "01-01-2023", current_assessment_score: 82, module_name: "LTO", total_average_current_year: 80, assessment_date: "25-12-2023 11:00 AM" },
    { id: "33", name: "Chinthapandu Karuna Sri", full_name: "Chinthapandu Karuna Sri", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "chkarunasri@teacherpulse.in", mobile: "6301577937", avgScore: 80, joining_date: "01-01-2023", current_assessment_score: 81, module_name: "PIE", total_average_current_year: 79, assessment_date: "24-12-2023 01:15 PM" },
    { id: "34", name: "Chintakindi Devarenamma", full_name: "Chintakindi Devarenamma", designation: "Mother Teacher", role: "Teacher", department: "Pre Primary", email: "chdevarenamma@teacherpulse.in", mobile: "9912930243", avgScore: 81, joining_date: "01-01-2023", current_assessment_score: 80, module_name: "CTM", total_average_current_year: 82, assessment_date: "23-12-2023 03:00 PM" },
]

export const studentData = [
    { id: "1", full_name: "Arjun Singh", admission_number: "ADM001", grade_level: "10", section: "A", gender: "Male", fatherName: "Raj Singh", motherName: "Priya Singh", mobile: "9876543212", vidyaPulseScore: 85, age_group: "age_11_16", parent_name: "Raj Singh", parent_contact_number: "9876543212", locality: "Urban", parent_work: "Business" },
    { id: "2", full_name: "Ananya Gupta", admission_number: "ADM002", grade_level: "9", section: "B", gender: "Female", fatherName: "Amit Gupta", motherName: "Neha Gupta", mobile: "9876543213", vidyaPulseScore: 90, age_group: "age_11_16", parent_name: "Amit Gupta", parent_contact_number: "9876543213", locality: "Urban", parent_work: "Engineer" },
]

export const parentData = [
    { id: "1", name: "Raj Singh", studentName: "Arjun Singh", class: "10", section: "A", gender: "Male", mobile: "9876543212", parentPulseScore: 78, status: "inactive" as const },
    { id: "2", name: "Neha Gupta", studentName: "Ananya Gupta", class: "9", section: "B", gender: "Female", mobile: "9876543213", parentPulseScore: 88 },
]

export const leadershipAssessments = [
    {
        id: "LA-001",
        hodId: "3",
        hodName: "Varikuti Satyam",
        department: "High School (Grade 6 to 10)",
        date: "15-01-2024",
        period: "3 of 4 (January)",
        scores: {
            instructional_supervision: 4,
            operational_rigor: 3,
            data_driven_strategy: 4,
            team_culture_integrity: 5,
            hod_audit_log: 4
        },
        avgScore: 80,
        notes: "Consistent performer. Strong team culture building seen in last month.",
        auditLog: {
            errorCatch: "Identified 'Blind Ticking' in Mathematics department for Grade 9 algebra corrections. Teacher was warned and books re-corrected.",
            observation: "Observed Science teacher. Explained the 'Hands-on First' approach. Taught 1 experiment myself to demonstrate.",
            data: "Grade 10 prelim results showed 15% weak in geometry. Shifted 4 extra periods to Geometry focus."
        }
    },
    {
        id: "LA-002",
        hodId: "11",
        hodName: "Donthula Pavithra",
        department: "Primary (Grade 3 to 5)",
        date: "20-01-2024",
        period: "3 of 4 (January)",
        scores: {
            instructional_supervision: 2,
            operational_rigor: 2,
            data_driven_strategy: 3,
            team_culture_integrity: 3,
            hod_audit_log: 2
        },
        avgScore: 48,
        notes: "Needs immediate intervention. Audit log is sparse and forensic accuracy is missing.",
        auditLog: {
            errorCatch: "General checks done. Small errors found.",
            observation: "Teachers are doing well. Need better class control.",
            data: "Marks are average."
        }
    },
    {
        id: "LA-003",
        hodId: "28",
        hodName: "Pancheddula Mamatha",
        department: "Pre Primary",
        date: "22-01-2024",
        period: "3 of 4 (January)",
        scores: {
            instructional_supervision: 5,
            operational_rigor: 5,
            data_driven_strategy: 4,
            team_culture_integrity: 5,
            hod_audit_log: 5
        },
        avgScore: 96,
        notes: "Exceptional leadership. Pre-primary department is running autonomously with high excellence.",
        auditLog: {
            errorCatch: "Caught 100% of attendance mismatches in nursery wing. Implemented a triple-check system.",
            observation: "Demonstrated early literacy techniques. Created a new resource bank for phonics.",
            data: "Nursery literacy scores up by 25%. Eliminating failure through micro-interventions."
        }
    }
]
