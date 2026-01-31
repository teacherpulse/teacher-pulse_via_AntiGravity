
export type RubricLevel = {
    score: number;
    label: string; // e.g., "Critical", "Needs Improv."
    description: string;
}

export type Question = {
    id: string;
    focusArea: string;
    question: string;
    description: string;
    rubrics: RubricLevel[];
}

export type AssessmentCategory = {
    id: string;
    title: string;
    ageGroup: string;
    grades: string[]; // e.g., ["Nursery", "LKG", "UKG"]
    questions: Question[];
}

export const PARENT_PULSE_RUBRICS: AssessmentCategory[] = [
    {
        id: "pre-primary",
        title: "Pre-Primary Parent Pulse",
        ageGroup: "3-6 Years",
        grades: ["Nursery", "LKG", "UKG"],
        questions: [
            {
                id: "pp-q1",
                focusArea: "Independence",
                question: "Self-Help Skills",
                description: "Does the parent encourage the child to eat/toilet independently?",
                rubrics: [
                    { score: 1, label: "Critical", description: "Babying: Sends child in diapers (if age approp). Feeds them by hand at home. \"He is too small.\"" },
                    { score: 2, label: "Needs Improv.", description: "Dependent: Child struggles with buttons/zippers. Parent does everything to save time." },
                    { score: 3, label: "Average", description: "In Process: Child tries but parent intervenes too quickly." },
                    { score: 4, label: "Good", description: "Encouraging: Parent insists child eats alone. Sends spare clothes for accidents." },
                    { score: 5, label: "Role Model", description: "Independent: Child manages toilet/eating fully. Parent reinforces \"I can do it\" attitude." },
                ]
            },
            {
                id: "pp-q2",
                focusArea: "Habits",
                question: "Sleep & Routine",
                description: "Is the child well-rested and settled?",
                rubrics: [
                    { score: 1, label: "Critical", description: "Chaotic: Child sleeps late (>10 PM). Wakes up cranky/crying daily." },
                    { score: 2, label: "Needs Improv.", description: "Irregular: No fixed bedtime. Often tired in class." },
                    { score: 3, label: "Average", description: "Okay: Mostly rests well, but weekends disrupt the cycle." },
                    { score: 4, label: "Good", description: "Routine: Fixed bedtime. Child arrives fresh and energetic." },
                    { score: 5, label: "Role Model", description: "Clockwork: Strict sleep/wake cycle. Healthy breakfast before school is mandatory." },
                ]
            },
            {
                id: "pp-q3",
                focusArea: "Motor Skills",
                question: "Home Practice (Fine Motor)",
                description: "Does the parent do scribbling/activities at home?",
                rubrics: [
                    { score: 1, label: "Critical", description: "None: \"School should teach writing.\" No crayons/paper at home." },
                    { score: 2, label: "Needs Improv.", description: "Forced: Forces child to write letters before ready. Stressful environment." },
                    { score: 3, label: "Average", description: "Occasional: does homework if sent, but no extra play-based learning." },
                    { score: 4, label: "Good", description: "Active: Provides coloring books/clay. distinct improvement in grip." },
                    { score: 5, label: "Role Model", description: "Creative: Engages in cutting/pasting/beading at home to build grip strength naturally." },
                ]
            },
            {
                id: "pp-q4",
                focusArea: "Separation",
                question: "Drop-off Behavior",
                description: "How does the parent handle separation anxiety?",
                rubrics: [
                    { score: 1, label: "Critical", description: "Anxious: Parent cries/lingers. Makes the child more scared. \"Don't go!\"" },
                    { score: 2, label: "Needs Improv.", description: "Bribery: Bribes child with chocolate/phone to enter school." },
                    { score: 3, label: "Average", description: "Hesitant: Waits at the gate too long. Peeks through windows." },
                    { score: 4, label: "Good", description: "Firm: Quick hug and goodbye. Trusts the teacher to handle tears." },
                    { score: 5, label: "Role Model", description: "Confident: Prepares child happily (\"School is fun!\"). Drops off with a smile and leaves." },
                ]
            },
            {
                id: "pp-q5",
                focusArea: "Speech",
                question: "Oral/Speech Development",
                description: "Interactions at home.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Silent: High screen time, low conversation. Child points instead of speaking." },
                    { score: 2, label: "Needs Improv.", description: "Baby Talk: Parent uses baby language. Correct pronunciation is not modeled." },
                    { score: 3, label: "Average", description: "Normal: Normal conversation, but limited vocabulary." },
                    { score: 4, label: "Good", description: "Engaged: Reads stories to child. Asks \"What did you do?\"" },
                    { score: 5, label: "Role Model", description: "Rich: Constant storytelling/rhymes at home. Corrects grammar gently." },
                ]
            }
        ]
    },
    {
        id: "foundational",
        title: "Foundational Primary Parent Pulse",
        ageGroup: "Class 1-2",
        grades: ["Class 1", "Class 2"],
        questions: [
            {
                id: "fp-q1",
                focusArea: "Academics",
                question: "Reading Habits",
                description: "Reading fluency support at home.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Zero Reading: No books at home. \"He can't read yet.\"" },
                    { score: 2, label: "Needs Improv.", description: "Passive: Relies only on school textbooks. Doesn't sit with child." },
                    { score: 3, label: "Average", description: "Homework Only: Reads only what is assigned for homework." },
                    { score: 4, label: "Good", description: "Supported: Parent listens to child read aloud 10 mins daily." },
                    { score: 5, label: "Role Model", description: "Culture: Bedtime reading ritual. Library books at home. Discusses stories." },
                ]
            },
            {
                id: "fp-q2",
                focusArea: "Responsibility",
                question: "Bag & Belongings",
                description: "Who packs the bag?",
                rubrics: [
                    { score: 1, label: "Critical", description: "Clueless: Child brings wrong books. \"Mom forgot to put it.\"" },
                    { score: 2, label: "Needs Improv.", description: "Helicopter: Parent packs everything. Child doesn't know what's in the bag." },
                    { score: 3, label: "Average", description: "Inconsistent: Sometimes forgets pencils/books." },
                    { score: 4, label: "Good", description: "Guided: Parent checks, but child packs. Everything labeled properly." },
                    { score: 5, label: "Role Model", description: "Autonomous: Child packs bag based on timetable. Takes ownership of lost pencils." },
                ]
            },
            {
                id: "fp-q3",
                focusArea: "Writing",
                question: "Handwriting & Motor Skills",
                description: "Focus on legibility.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Messy: Illegible work. Parent accepts scribbling." },
                    { score: 2, label: "Needs Improv.", description: "Erased: Parent erases and writes for the child (Ghost writing)." },
                    { score: 3, label: "Average", description: "Acceptable: Legible but slow. Parent ensures completion." },
                    { score: 4, label: "Good", description: "Improving: Parent ensures gentle correction of reversals (b vs d)." },
                    { score: 5, label: "Role Model", description: "Neat: Great pride in presentation. Parent values neatness over speed." },
                ]
            },
            {
                id: "fp-q4",
                focusArea: "Math",
                question: "Basic Numeracy",
                description: "Real-world math usage.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Abstract: Child counts only on fingers. struggles with basic addition." },
                    { score: 2, label: "Needs Improv.", description: "Rote: Memorizes tables without understanding." },
                    { score: 3, label: "Average", description: "Average: Can do homework sums." },
                    { score: 4, label: "Good", description: "Applied: Parent uses real life (money/time) to teach math." },
                    { score: 5, label: "Role Model", description: "Mastery: Child plays math games/puzzles at home. Conceptually strong." },
                ]
            },
            {
                id: "fp-q5",
                focusArea: "Discipline",
                question: "Morning Routine",
                description: "Punctuality and readiness.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Late: Frequently late. Child enters stressed/sleepy." },
                    { score: 2, label: "Needs Improv.", description: "Rushed: Arrives just in time, breakfast in hand/uneaten." },
                    { score: 3, label: "Average", description: "Standard: On time, fully in uniform." },
                    { score: 4, label: "Good", description: "Prepared: Arrives early. Uniform crisp. Calm start." },
                    { score: 5, label: "Role Model", description: "Energetic: Arrives happy, reviewed timetable, ready to learn." },
                ]
            }
        ]
    },
    {
        id: "primary",
        title: "Primary Parent Pulse",
        ageGroup: "Class 3-5",
        grades: ["Class 3", "Class 4", "Class 5"],
        questions: [
            {
                id: "pr-q1",
                focusArea: "Academics",
                question: "Concept vs Rote",
                description: "Focus on understanding.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Memorizer: Forces child to mug up answers. Panics if question changes." },
                    { score: 2, label: "Needs Improv.", description: "Result-Oriented: Cares only about marks, not logic. \"Why 8/10?\"" },
                    { score: 3, label: "Average", description: "Standard: Happy if homework is done." },
                    { score: 4, label: "Good", description: "Curious: Encourages \"Why\" questions. Checks concept clarity." },
                    { score: 5, label: "Role Model", description: "Application: Connects science/social topics to news/life at home." },
                ]
            },
            {
                id: "pr-q2",
                focusArea: "Social",
                question: "Peer Awareness",
                description: "Knowledge of friends/conflicts.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Oblivious: Doesn't know who the child sits with. Ignores bullying signs." },
                    { score: 2, label: "Needs Improv.", description: "Biased: \"My child is an angel, others are bad.\"" },
                    { score: 3, label: "Average", description: "Aware: Knows best friend's name." },
                    { score: 4, label: "Good", description: "Involved: Knows the group dynamics. Advises child on sharing/kindness." },
                    { score: 5, label: "Role Model", description: "Mentor: Proactively helps child navigate conflicts. Communicates with teacher on social issues." },
                ]
            },
            {
                id: "pr-q3",
                focusArea: "Habits",
                question: "Screen Time & Focus",
                description: "Digital discipline.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Addicted: Unsupervised YouTube/Gaming. Affects attention span." },
                    { score: 2, label: "Needs Improv.", description: "Negotiated: Child tantrums to get phone. Parent gives in." },
                    { score: 3, label: "Average", description: "Regulated: Screen time allowed only after homework." },
                    { score: 4, label: "Good", description: "Strict: No screens on weekdays. High focus on hobbies." },
                    { score: 5, label: "Role Model", description: "Balanced: Uses tech for learning (quizzes/documentaries) only." },
                ]
            },
            {
                id: "pr-q4",
                focusArea: "Organization",
                question: "Project Work",
                description: "Support vs Doing it for them.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Outsourced: Parent buys project or does it fully. Child watches." },
                    { score: 2, label: "Needs Improv.", description: "Last Minute: Rushes to buy charts at 9 PM. Panic mode." },
                    { score: 3, label: "Average", description: "Supplied: Buys materials, child does the work." },
                    { score: 4, label: "Good", description: "Facilitator: Guides the research, lets child execute." },
                    { score: 5, label: "Role Model", description: "Innovator: Encourages child to use waste material/creativity. Process > Product." },
                ]
            },
            {
                id: "pr-q5",
                focusArea: "Values",
                question: "Honesty & Ownership",
                description: "Reaction to mistakes.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Defensive: Lies to cover up child's mistake (e.g., \"He was sick\" when not)." },
                    { score: 2, label: "Needs Improv.", description: "Excuses: \"He forgot.\" Blames others." },
                    { score: 3, label: "Average", description: "Neutral: Accepts note in diary." },
                    { score: 4, label: "Good", description: "Accountable: Makes child apologize. Teaches responsibility." },
                    { score: 5, label: "Role Model", description: "Integrity: Values honesty over marks. \"I'd rather he get 0 than cheat.\"" },
                ]
            }
        ]
    },
    {
        id: "upper-primary",
        title: "Upper Primary Parent Pulse",
        ageGroup: "Class 6-8",
        grades: ["Class 6", "Class 7", "Class 8"],
        questions: [
            {
                id: "up-q1",
                focusArea: "Behavior",
                question: "Respect & Attitude",
                description: "Handling backtalk/puberty.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Permissive: Child rules the house. Disrespectful to parents/teachers." },
                    { score: 2, label: "Needs Improv.", description: "Conflict: Constant yelling matches at home. Power struggles." },
                    { score: 3, label: "Average", description: "Managed: Typical teen moodiness, but generally respectful." },
                    { score: 4, label: "Good", description: "Firm: Parent sets clear boundaries. \"Disrespect is not an option.\"" },
                    { score: 5, label: "Role Model", description: "Connected: Open dialogue. Child listens because they feel understood, not feared." },
                ]
            },
            {
                id: "up-q2",
                focusArea: "Digital",
                question: "Cyber Safety/Social Media",
                description: "Monitoring online life.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Unsafe: Child has Instagram/Snapchat with no supervision. Exposure to adult content." },
                    { score: 2, label: "Needs Improv.", description: "Naive: \"He plays games.\" Unaware of chats/strangers." },
                    { score: 3, label: "Average", description: "Checked: Occasional phone checks." },
                    { score: 4, label: "Good", description: "Protected: Parental controls installed. No phone in bedroom at night." },
                    { score: 5, label: "Role Model", description: "Educated: Parent discusses cyberbullying/safety. Digital contract in place." },
                ]
            },
            {
                id: "up-q3",
                focusArea: "Academics",
                question: "Self-Study Habits",
                description: "Move from homework to study.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Spoon-fed: Parent sits and dictates answers. Child cannot study alone." },
                    { score: 2, label: "Needs Improv.", description: "Dependent: Needs tuition for every subject. No self-effort." },
                    { score: 3, label: "Average", description: "Routine: Completes homework. Studies only before exams." },
                    { score: 4, label: "Good", description: "Independent: Child makes own timetable. Studies without being told." },
                    { score: 5, label: "Role Model", description: "Researcher: Goes beyond textbook. Uses reference books/internet for learning." },
                ]
            },
            {
                id: "up-q4",
                focusArea: "Grooming",
                question: "Hygiene & Presentation",
                description: "Personal care.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Neglected: Dirty uniform, body odor, long nails. Parent ignores hygiene." },
                    { score: 2, label: "Needs Improv.", description: "Casual: Untucked shirt, messy hair. Needs teacher reminders." },
                    { score: 3, label: "Average", description: "Clean: Standard uniform compliance." },
                    { score: 4, label: "Good", description: "Sharp: Takes pride in appearance. Ironed clothes, polished shoes." },
                    { score: 5, label: "Role Model", description: "Professional: understands that grooming = discipline. Always impeccable." },
                ]
            },
            {
                id: "up-q5",
                focusArea: "Language",
                question: "Communication Skills",
                description: "Language used at home.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Slang/Abusive: Child uses bad language/slang at home. Parent ignores/laughs." },
                    { score: 2, label: "Needs Improv.", description: "Vernacular Only: Resists speaking English even when capable." },
                    { score: 3, label: "Average", description: "Functional: Speaks basic English." },
                    { score: 4, label: "Good", description: "Fluent: Encourages English conversation. Corrects grammar." },
                    { score: 5, label: "Role Model", description: "Articulate: Encourages debates/discussions on current affairs at home." },
                ]
            }
        ]
    },
    {
        id: "high-school",
        title: "High School Parent Pulse",
        ageGroup: "Class 9-10",
        grades: ["Class 9", "Class 10"],
        questions: [
            {
                id: "hs-q1",
                focusArea: "Data",
                question: "Marksheet Awareness",
                description: "Knowledge of specific data.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Absent: \"I don't know his marks.\" misses PTMs." },
                    { score: 2, label: "Needs Improv.", description: "Vague: \"He failed Math.\" Doesn't know if it was Algebra or Geometry." },
                    { score: 3, label: "Average", description: "Informed: Knows the total percentage/rank." },
                    { score: 4, label: "Good", description: "Analytical: Knows subject-wise breakdown. \"He lost marks in Physics numerals.\"" },
                    { score: 5, label: "Role Model", description: "Strategist: Tracks growth curve. \"He improved 5% in Bio, let's target Chem next.\"" },
                ]
            },
            {
                id: "hs-q2",
                focusArea: "Stress",
                question: "Emotional Resilience",
                description: "Handling exam pressure.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Pressure Cooker: \"You must get 95% or else.\" Creates panic/anxiety." },
                    { score: 2, label: "Needs Improv.", description: "Indifferent: \"Pass or fail, I don't care.\" Demotivating." },
                    { score: 3, label: "Average", description: "Supportive: Provides food/comfort during exams." },
                    { score: 4, label: "Good", description: "Balanced: Focuses on effort, not just result. Helps plan breaks." },
                    { score: 5, label: "Role Model", description: "Coach: Teaches stress management. \"One exam doesn't define you, but let's work hard.\"" },
                ]
            },
            {
                id: "hs-q3",
                focusArea: "Remedial",
                question: "Response to Gaps",
                description: "Action on weak subjects.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Denial: Refuses to accept child is weak. Blames question paper." },
                    { score: 2, label: "Needs Improv.", description: "Passive: \"We sent him to tuition.\" No follow-up on progress." },
                    { score: 3, label: "Average", description: "Concerned: Asks teacher for help but struggles to enforce at home." },
                    { score: 4, label: "Good", description: "Action: Enforces extra practice. Monitors the remedial plan set by school." },
                    { score: 5, label: "Role Model", description: "Partner: Works with teacher to clear the specific concept block. Daily tracking." },
                ]
            },
            {
                id: "hs-q4",
                focusArea: "Distraction",
                question: "Relationships & Focus",
                description: "managing teenage distractions.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Ignorant: Unaware of relationships/distractions affecting studies." },
                    { score: 2, label: "Needs Improv.", description: "Strict/Angry: Bans everything angrily, causing rebellion." },
                    { score: 3, label: "Average", description: "Moderate: General rules exist." },
                    { score: 4, label: "Good", description: "Open: Discusses priorities. \"Focus now, fun later.\"" },
                    { score: 5, label: "Role Model", description: "Visionary: Helps child align daily actions with long-term career goals." },
                ]
            },
            {
                id: "hs-q5",
                focusArea: "Career",
                question: "Future Orientation",
                description: "Clarity on next steps.",
                rubrics: [
                    { score: 1, label: "Critical", description: "Confused: No plan. \"We will see later.\"" },
                    { score: 2, label: "Needs Improv.", description: "Imposed: \"He MUST become a Doctor.\" Ignoring child's aptitude." },
                    { score: 3, label: "Average", description: "Tentative: Has a vague idea of streams." },
                    { score: 4, label: "Good", description: "Exploratory: Discussing options based on strengths." },
                    { score: 5, label: "Role Model", description: "Aligned: Clear goal (e.g., IIT/Commerce). Preparation aligned with aptitude and interest." },
                ]
            }
        ]
    }
]
