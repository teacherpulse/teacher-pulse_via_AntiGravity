export interface ActionPlan {
    scoreRange: string;
    hodActions: string[];
    managementActions: string[];
}

export const ALMF_ACTION_PLANS: ActionPlan[] = [
    {
        scoreRange: "1-2 (Intervention Phase)",
        hodActions: [
            "Shadowing: Must shadow a Score 4/5 HOD for 3 days to understand 'Forensic Checking'.",
            "Mandatory Audit Quota: Must submit 'Proof of Checking' (scans of red-ink corrections on teacher diaries) to the Principal daily.",
            "Scripted Observation: Use a pre-filled checklist for class observations; no free-hand feedback allowed yet."
        ],
        managementActions: [
            "Weekly Review: Friday 4:00 PM review of the HOD's logbook.",
            "Validation: Principal to re-check 5 random books approved by the HOD. If errors are found, issue a formal memo.",
            "Probation: If Score remains <3 for two months, demote to Senior Teacher."
        ]
    },
    {
        scoreRange: "3 (Baseline Phase)",
        hodActions: [
            "Root Cause Analysis: Submit a 'Post-Exam Anatomy' report analyzing why specific students failed.",
            "Demo Lessons: Must teach one 'Model Class' per month for junior teachers to observe.",
            "Resource Upgrade: Create a bank of 'High Order Thinking Skills' (HOTS) questions for the department."
        ],
        managementActions: [
            "Bi-Weekly Review: Shift from weekly to fortnightly reviews.",
            "Empowerment: Allow HOD to approve casual leave for their department (within limits).",
            "Training: Sponsor HOD for an external workshop on Leadership or Pedagogy."
        ]
    },
    {
        scoreRange: "4-5 (Growth Phase)",
        hodActions: [
            "Peer Audit: Cross-audit other departments (e.g., Math HOD audits Science HOD's logs).",
            "Curriculum Design: Lead the redesign of the annual curriculum or textbook selection.",
            "Mentorship: formally mentor a 'Score 2' HOD or AC."
        ],
        managementActions: [
            "Consultation: Include HOD in hiring decisions and strategic planning meetings.",
            "Incentives: Performance bonus or public recognition (e.g., 'Star Coordinator').",
            "Autonomy: Full freedom on remedial strategies and internal timetable adjustments."
        ]
    }
];

export const HOD_AUDIT_LOG_REQUIREMENTS = [
    {
        title: "The Error Catch",
        description: "e.g., 'Teacher X corrected the notebook but missed 3 spelling errors. I circled them and returned it to Teacher X.'"
    },
    {
        title: "The Observation",
        description: "e.g., 'Observed Teacher Y. Concept was unclear. I re-taught the concept for 10 mins.'"
    },
    {
        title: "The Data",
        description: "e.g., 'Department Average dropped by 2%. Action Plan: Morning drill on formulas.'"
    }
];
