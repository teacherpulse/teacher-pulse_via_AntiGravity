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

const commonScores: RubricScore[] = [
    { value: 1, label: "Score 1", description: "Needs significant improvement. Standard not met.", colorClass: "border-red-500 bg-red-50 dark:bg-red-950/20" },
    { value: 2, label: "Score 2", description: "Below expectations. Inconsistent application.", colorClass: "border-orange-500 bg-orange-50 dark:bg-orange-950/20" },
    { value: 3, label: "Score 3", description: "Meets basic expectations. Competent but routine.", colorClass: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" },
    { value: 4, label: "Score 4", description: "Exceeds expectations. High quality and consistent.", colorClass: "border-blue-500 bg-blue-50 dark:bg-blue-950/20" },
    { value: 5, label: "Score 5", description: "Exceptional. Innovative and sets a benchmark.", colorClass: "border-green-500 bg-green-50 dark:bg-green-950/20" },
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
    },
    {
        id: "almf",
        title: "ALMF (Leadership Pulse)",
        criteria: [
            {
                id: "strategic_vision", title: "Strategic Vision & Planning", scores: getScores([
                    { description: "Lacks vision. Operates in reactive mode only." },
                    { description: "Limited vision. Plans are short-term and tactical." },
                    { description: "Has clear vision aligned with school goals." },
                    { description: "Proactive vision. Anticipates challenges/opportunities." },
                    { description: "Inspiring visionary. Transforms department culture." }
                ])
            },
            {
                id: "team_development", title: "Team Development & Mentoring", scores: getScores([
                    { description: "No mentoring. Ignores team growth needs." },
                    { description: "Occasional advice but lacks structure." },
                    { description: "Regularly supports team members." },
                    { description: "Strong mentor. Actively develops talent." },
                    { description: "Creators of leaders. Exceptional mentorship." }
                ])
            },
            // Add more ALMF criteria as needed
        ]
    }
]

export const ASSESSMENT_PERIODS = [
    "1 of 6 (July)",
    "2 of 6 (Sept)",
    "3 of 6 (Oct)",
    "4 of 6 (Nov)",
    "5 of 6 (Dec)",
    "6 of 6 (Jan)",
]
