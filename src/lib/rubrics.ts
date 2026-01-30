export type RubricScore = {
    value: number;
    label: string;
    description: string;
    colorClass: string; // Tailwind class for the highlight
}

export type RubricCriterion = {
    id: string;
    title: string;
    scores: RubricScore[];
}

export type ModuleDefinition = {
    id: string;
    title: string;
    criteria: RubricCriterion[];
}

export const commonScores: RubricScore[] = [
    { value: 1, label: "Score 1", description: "Needs significant improvement. Standard not met.", colorClass: "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-200" },
    { value: 2, label: "Score 2", description: "Below expectations. Inconsistent application.", colorClass: "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-900 dark:text-orange-200" },
    { value: 3, label: "Score 3", description: "Meets basic expectations. Competent but routine.", colorClass: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-900 dark:text-yellow-200" },
    { value: 4, label: "Score 4", description: "Exceeds expectations. High quality and consistent.", colorClass: "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200" },
    { value: 5, label: "Score 5", description: "Exceptional. Innovative and sets a benchmark.", colorClass: "border-green-500 bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-200" },
]

// Helper to generate scores with custom descriptions if needed, otherwise use common
const getScores = (overrides?: Partial<RubricScore>[]): RubricScore[] => {
    if (!overrides) return commonScores;
    return commonScores.map((s, i) => ({ ...s, ...(overrides[i] || {}) }));
}

export const MODULES: ModuleDefinition[] = [
    {
        id: "classroom_teaching_mastery",
        title: "Classroom Teaching Mastery",
        criteria: [
            {
                id: "teaching_aids", title: "Variety of Teaching Aids", scores: getScores([
                    { description: "No teaching aids used. Only chalk and talk." },
                    { description: "Minimal aids. Relies heavily on textbook." },
                    { description: "Uses standard aids (charts, models, PPTs) regularly." },
                    { description: "Creative use of multiple aids. Engages different learning styles." },
                    { description: "Innovative, student-created aids. Maximizes learning impact." }
                ])
            },
            {
                id: "relevance_tools", title: "Relevance of Tools", scores: getScores([
                    { description: "Tools used are irrelevant or confusing." },
                    { description: "Tools used but don't enhance understanding." },
                    { description: "Tools are relevant and support the lesson objective." },
                    { description: "Tools are highly relevant and perfectly timed." },
                    { description: "Tools transform the learning experience seamlessly." }
                ])
            },
            // Add more criteria as needed
        ]
    },
    {
        id: "correction_quality_index",
        title: "Correction Quality Index",
        criteria: [
            { id: "timeliness", title: "Timeliness of Corrections", scores: getScores() },
            { id: "feedback_quality", title: "Quality of Feedback", scores: getScores() },
        ]
    },
    {
        id: "learning_tools_optimization",
        title: "Learning Tools Optimization",
        criteria: [
            { id: "usage_freq", title: "Frequency of Usage", scores: getScores() },
            { id: "effectiveness", title: "Effectiveness of Tools", scores: getScores() },
        ]
    },
    {
        id: "professional_integrity",
        title: "Professional Integrity & Excellence",
        criteria: [
            { id: "punctuality", title: "Punctuality", scores: getScores() },
            { id: "collaboration", title: "Collaboration with Peers", scores: getScores() },
        ]
    }
]

export const ALMF_MODULE: ModuleDefinition = {
    id: "almf",
    title: "ALMF (Leadership Pulse)",
    criteria: [
        {
            id: "instructional_supervision",
            title: "Instructional Supervision (IS)",
            scores: getScores([
                { description: "Absentee Leader: Rarely observes classes. Feedback is vague. No follow-up on previous errors." },
                { description: "Passive Observer: Observes required classes but misses root causes. Feedback is descriptive rather than prescriptive." },
                { description: "Corrective Supervisor (SOP): Meets observation targets. Identifies HTMF deviations correctly. Ensures Lesson Plans are on time." },
                { description: "Developmental Mentor: Demonstrates techniques inside the teacher's class (Model Teaching). Tracks teacher improvement and identifies pedagocial gaps." },
                { description: "Transformational Leader: Uses video analysis for feedback. Teachers under this HOD consistently improve pedagogy. Innovation is high." }
            ])
        },
        {
            id: "operational_rigor",
            title: "Operational Rigor (OR)",
            scores: getScores([
                { description: "Negligent: 'Blind Ticking' of Teacher Diaries and Correction samples. Misses syllabus lags. Timetable conflicts." },
                { description: "Inconsistent: Checks for completion, not quality. Catches 50% of correction errors. Syllabus tracking is reactive." },
                { description: "Accurate Auditor (SOP): 100% detection of 'Blind Ticking'. Diaries checked weekly with meaningful remarks. Syllabus on schedule." },
                { description: "System Optimizer: Proactively adjusts timetables. Ensures 'Zero Loss' of student notebooks. Audits are forensic and detailed." },
                { description: "Standard Setter: Creates high-quality resource banks that other departments copy. Zero operational errors for the term." }
            ])
        },
        {
            id: "data_driven_strategy",
            title: "Data-Driven Strategy (DDS)",
            scores: getScores([
                { description: "Data Avoider: Blames students/parents for low results. Does not know the 'Fail List' of their department." },
                { description: "Data Reporter: Compiles marks sheets but offers no analysis. Conducts remedials without a specific plan." },
                { description: "Analyst (SOP): Identifies 'At-Risk' students immediately after exams. Ensures remedials happen. Knows Department Average." },
                { description: "Strategist: Groups students by specific learning gaps. Adjusts teaching plans based on weekly test data. Predicts board results with 90% accuracy." },
                { description: "Result Architect: Achieves consistent Department Averages >85%. Eliminates failure through 'Micro-Interventions'." }
            ])
        },
        {
            id: "team_culture_integrity",
            title: "Team Culture & Integrity (TCI)",
            scores: getScores([
                { description: "Divider: Complains about management to teachers. Engaging in gossip. Fails to enforce school policies." },
                { description: "People Pleaser: Avoids difficult conversations with underperforming teachers. 'Protects' team from accountability." },
                { description: "Professional Anchor (SOP): Enforces policies neutrally. Conducts meetings with clear agenda. Respectful and punctual." },
                { description: "Culture Builder: De-escalates staff conflicts without Principal intervention. Motivates team during high-pressure periods." },
                { description: "Institutional Pillar: Fully embodies the Principal's vision. Mentors new HODs. Integrity is beyond reproach." }
            ])
        },
        {
            id: "hod_audit_log",
            title: "HOD Audit Log (Primary Tool)",
            scores: getScores([
                { description: "Ineffective: Audit Log is empty or vague. No error catches, observations are generic, and no data trends identified." },
                { description: "Developing: Log has entries but lacks 'Forensic Accuracy'. Feedback is descriptive. Misses syllabus tracking or root causes." },
                { description: "Proficient (SOP): Log contains logical Error Catches and accurate observation remarks. Syllabus exactly on schedule." },
                { description: "Strategist: Forensic and detailed audits. Proactively adjusts teaching plans based on weekly test data in the log." },
                { description: "Multiplier: Zero operational errors. Log creates high-quality resource banks and eliminates failure through micro-interventions." }
            ])
        }
    ]
}

export const ASSESSMENT_PERIODS = [
    "1 of 6 (July)",
    "2 of 6 (Sept)",
    "3 of 6 (Oct)",
    "4 of 6 (Nov)",
    "5 of 6 (Dec)",
    "6 of 6 (Jan)",
]

export const LEADERSHIP_PERIODS = [
    "1 of 4 (July)",
    "2 of 4 (October)",
    "3 of 4 (January)",
    "4 of 4 (April)",
]
