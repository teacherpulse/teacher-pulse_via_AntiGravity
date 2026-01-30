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
        id: "module_classroom_teaching_mastery",
        title: "Classroom Teaching Mastery",
        criteria: [
            {
                id: "initiation_learning",
                title: "Initiation of Learning",
                scores: getScores([
                    { description: "Topic started abruptly. No context or connection to prior knowledge." },
                    { description: "Introduction is present but weak or confusing. Fails to grab attention." },
                    { description: "Introduction is clear. Connects to previous class. Topic name stated clearly." },
                    { description: 'Uses a specific "hook" (question/story). Clear link to real life or prior knowledge.' },
                    { description: 'Creative, exciting start that creates cognitive curiosity. Students are eager to know "what\'s next".' }
                ])
            },
            {
                id: "objectives_explanation",
                title: "Explanation of Objectives",
                scores: getScores([
                    { description: "Objectives not mentioned. Teacher just starts reading/writing." },
                    { description: "Objectives mentioned vaguely or only at the end of the class." },
                    { description: 'Objectives stated verbally at the start ("Today we will learn...").' },
                    { description: "Objectives written on board in student-friendly language. Referred to during lesson." },
                    { description: 'Objectives written, explained, and students asked to rephrase them. "Why" we are learning this is clear.' }
                ])
            },
            {
                id: "blackboard_mgmt",
                title: "Blackboard Management",
                scores: getScores([
                    { description: "Board is messy, unreadable, or blank. No Teaching Aids used." },
                    { description: "Board is disorganized. Handwriting is poor. Aids used but barely visible/effective." },
                    { description: "Board is organized (Date/Topic). Key terms written. Standard aids used." },
                    { description: "Board has clear hierarchy (colors/headings). Aids actively support the concept." },
                    { description: "Board is a visual masterpiece (Mind Map/Summary). Aids are interactive/digital and student-led." }
                ])
            },
            {
                id: "student_interaction",
                title: "Interaction with Students",
                scores: getScores([
                    { description: "Monologue. Teacher talks, students listen. No interaction." },
                    { description: 'Interaction only with front benchers or "favorite" students.' },
                    { description: "Asks questions to the whole class. Accepts volunteer answers." },
                    { description: "Randomized questioning (Cold Call). Ensures backbenchers participate." },
                    { description: "100% Participation techniques (Think-Pair-Share). Students interact with each other, not just the teacher." }
                ])
            },
            {
                id: "vocab_presentation",
                title: "Vocabulary & Presentation",
                scores: getScores([
                    { description: "Incorrect grammar. Voice inaudible or monotone. Inappropriate language." },
                    { description: "Grammar mostly correct but vocabulary is limited. Voice lacks energy." },
                    { description: "Clear voice, correct grammar. Standard pacing." },
                    { description: "Rich vocabulary. Good modulation (high/low pitch). Energetic delivery." },
                    { description: "Inspiring delivery. Uses high-level subject terminology naturally. Voice commands the room effortlessly." }
                ])
            },
            {
                id: "ttrms_adherence",
                title: "Following Management Instructions(TTRMS)",
                scores: getScores([
                    { description: "Ignores specific management protocols (TTRMS)." },
                    { description: "Attempts to follow protocols but misses steps or is inconsistent." },
                    { description: "Follows standard operational procedures (TTRMS) correctly." },
                    { description: "Follows protocols and integrates specific management feedback from previous meetings." },
                    { description: "Role model for TTRMS implementation. Helps others follow management guidelines." }
                ])
            },
            {
                id: "student_involvement",
                title: "Student Involvement",
                scores: getScores([
                    { description: "Students sleeping, talking, or distracted. Disengagement ignored." },
                    { description: "Students are passive/compliant but low energy. Few answer questions." },
                    { description: "Students are attentive. Most follow instructions and answer when asked." },
                    { description: "High energy. Students ask spontaneous questions and volunteer answers." },
                    { description: "Students take ownership. They lead discussions, explain to peers, and are deeply immersed in tasks." }
                ])
            },
            {
                id: "classroom_time_mgmt",
                title: "Classroom & Time Mgmt",
                scores: getScores([
                    { description: "Chaos. Noise levels high. Lesson incomplete when bell rings." },
                    { description: "Frequent interruptions for discipline. Lesson feels rushed or drags." },
                    { description: "Class is controlled. Lesson finishes on time. Transitions are okay." },
                    { description: "Seamless transitions. Proactive discipline (eye contact/proximity). Pacing is smooth." },
                    { description: '"Invisible Discipline"--students self-regulate. Time is maximized for learning. Perfect closure.' }
                ])
            },
            {
                id: "inclusive_education",
                title: "Inclusive Education",
                scores: getScores([
                    { description: 'Teaches only to the "average." Weak students ignored/left behind.' },
                    { description: "Notices struggling students but offers little specific help." },
                    { description: "Repeats instructions for slow learners. General support provided." },
                    { description: "Differentiated questioning (easier for weak, harder for bright)." },
                    { description: "Tasks are differentiated. Remedial support is integrated into the flow. No child left behind." }
                ])
            },
            {
                id: "recapitulation",
                title: "Recapitulation",
                scores: getScores([
                    { description: "No recap. Class ends abruptly." },
                    { description: "Teacher hurriedly summarizes main points as bell rings." },
                    { description: "Teacher summarizes the lesson clearly. Asks 1-2 check questions." },
                    { description: 'Students summarize the lesson. "Exit Ticket" or rapid-fire quiz used.' },
                    { description: "Comprehensive review where students link today's topic to the next lesson. Full understanding checked." }
                ])
            }
        ]
    },
    {
        id: "module_correction_quality_index",
        title: "Correction Quality Index",
        criteria: [
            {
                id: "regularity_timeliness",
                title: "Regularity & Timeliness",
                scores: getScores([
                    { description: "Corrections pending >1 week. Backlog visible." },
                    { description: "Corrections often 3-4 days late. Inconsistent frequency." },
                    { description: "Corrections done within 24-48 hours. No major backlog." },
                    { description: "Corrections done same-day or next-day consistently." },
                    { description: "Immediate feedback loop. Returned before next topic." }
                ])
            },
            {
                id: "completeness",
                title: "Completeness",
                scores: getScores([
                    { description: "Skipped exercises/pages. Index not checked." },
                    { description: "Some pages missed. Index incomplete." },
                    { description: "All exercises checked. Index signed." },
                    { description: "Thorough check including rough work/diagrams." },
                    { description: "Every single entry verified. 100% coverage." }
                ])
            },
            {
                id: "accuracy_checking",
                title: "Accuracy of Checking",
                scores: getScores([
                    { description: "Blind Ticking. Mistakes marked as correct." },
                    { description: "Major errors caught, minor missed." },
                    { description: "Accurate checking. Most mistakes identified." },
                    { description: "High accuracy. Spelling/grammar also marked." },
                    { description: "Forensic accuracy. All errors coded correctly." }
                ])
            },
            {
                id: "feedback_quality",
                title: "Feedback Quality",
                scores: getScores([
                    { description: "No remarks. Only signature." },
                    { description: 'Generic remarks ("Good", "Write neatly").' },
                    { description: 'Specific remarks ("Check spelling").' },
                    { description: 'Constructive feedback ("Review Step 2").' },
                    { description: "Actionable, personalized feedback." }
                ])
            },
            {
                id: "signature_date",
                title: "Signature & Date",
                scores: getScores([
                    { description: "Missing signatures or dates." },
                    { description: "Signed but date missing/illegible." },
                    { description: "Signed and dated consistently." },
                    { description: "Signed, dated, uses correct ink color." },
                    { description: "Professional signature/date on every assignment." }
                ])
            },
            {
                id: "presentation_neatness",
                title: "Presentation/Neatness",
                scores: getScores([
                    { description: "Books torn, no covers, scribble work." },
                    { description: "Books covered but messy inside." },
                    { description: "Books decent. Legible. Margins drawn." },
                    { description: "High standards of neatness. Index maintained." },
                    { description: "Pristine books. Model of discipline." }
                ])
            },
            {
                id: "homework_quality",
                title: "Homework Quality",
                scores: getScores([
                    { description: "Irrelevant/Too much HW. No tracking." },
                    { description: "HW given but tracking is weak." },
                    { description: "Relevant HW. Defaulters list maintained." },
                    { description: "Creative HW. Defaulters followed up next day." },
                    { description: "Purposeful HW. Defaulters parents called immediately." }
                ])
            },
            {
                id: "support_weak_students",
                title: "Support to Weak Students",
                scores: getScores([
                    { description: "No special attention in books." },
                    { description: "Same correction for all." },
                    { description: "Re-correction done for major errors." },
                    { description: "Detailed clues for weak learners." },
                    { description: "Re-teaching via notebook comments." }
                ])
            },
            {
                id: "marking_standards",
                title: "Marking Standards",
                scores: getScores([
                    { description: "Confusing symbols. Wrong ink color." },
                    { description: "Inconsistent symbols used." },
                    { description: "Standard ticks/crosses. Red ink used." },
                    { description: "Follows school code (Circle=Spelling etc)." },
                    { description: "Strict adherence to marking key." }
                ])
            },
            {
                id: "accountability",
                title: "Accountability",
                scores: getScores([
                    { description: "Books lost. No record of submission." },
                    { description: "Loose record keeping." },
                    { description: 'Checklist of "Submitted" maintained.' },
                    { description: "Detailed tracker (Late/Corrected/Returned)." },
                    { description: "Full audit trail. Zero loss." }
                ])
            }
        ]
    },
    {
        id: "module_learning_tools_optimization",
        title: "Learning Tools Optimization",
        criteria: [
            { id: "usage_freq", title: "Frequency of Usage", scores: getScores() },
            { id: "effectiveness", title: "Effectiveness of Tools", scores: getScores() },
        ]
    },
    {
        id: "module_professional_integrity_excellence",
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
export const CTM_PRE_PRIMARY_MODULE: ModuleDefinition = {
    id: "module_classroom_teaching_mastery_pre_primary",
    title: "Classroom Teaching Mastery (Pre Primary)",
    criteria: [
        {
            id: "warm_up_settling",
            title: "Warm-Up & Settling Routine",
            scores: getScores([
                { description: "Chaotic entry. No greetings. Crying or anxiety is ignored." },
                { description: "Entry is noisy. Teacher greets only a few children mechanically." },
                { description: "Basic greeting. Students settle gradually. Attendance taken." },
                { description: "Warm greeting. Quick transition to circle time/activities." },
                { description: "Personalized welcome for every child. Emotional readiness checked. Happy, energetic start." }
            ])
        },
        {
            id: "classroom_readiness",
            title: "Classroom Readiness",
            scores: getScores([
                { description: "Materials missing. Activity stations not ready. Teacher searching for items." },
                { description: "Teacher searching for materials while kids wait. Cluttered setup." },
                { description: "Basic materials available. Stations somewhat organized." },
                { description: "Organized stations. Materials ready on tables before kids enter." },
                { description: "Fully prepared. Inviting setup that sparks curiosity immediately." }
            ])
        },
        {
            id: "play_based_instruction",
            title: "Play-Based Instruction",
            scores: getScores([
                { description: "Lecture only. No play or hands-on resources used." },
                { description: "Teaching with board only. Minimal interaction or movement." },
                { description: "Some activity used but limited to a few kids or short duration." },
                { description: "Good mix of play and instruction. Most kids involved in tasks." },
                { description: 'Full play-based learning. Learning corners used effectively. Learning is "invisible" through play.' }
            ])
        },
        {
            id: "storytelling_rhymes",
            title: "Storytelling / Rhymes",
            scores: getScores([
                { description: "Flat reading. No modulation or action." },
                { description: "Reading is fast or unclear. Few actions used." },
                { description: "Clear voice. Some actions used to engage students." },
                { description: "Good modulation. Props or puppets used during story/rhyme." },
                { description: "Excellent voice modulation. Actions, Phonics & props integrated perfectly." }
            ])
        },
        {
            id: "concept_intro",
            title: "Concept Intro (Concrete Objects)",
            scores: getScores([
                { description: "Abstract teaching only (talking). No objects used." },
                { description: "Objects present but too small or not used effectively." },
                { description: "Pictures or 2D aids used to explain concepts." },
                { description: "Concrete objects used by teacher for demonstration." },
                { description: "Real-life concrete objects (TLM) used by students for tactile learning." }
            ])
        },
        {
            id: "student_interaction",
            title: "Student Interaction",
            scores: getScores([
                { description: "Passive sitting. Only teacher talks." },
                { description: 'Teacher asks "Yes/No" questions only.' },
                { description: "Some children respond when asked." },
                { description: "Active response from most children." },
                { description: "Every child participating. Active involvement and student-to-student interaction." }
            ])
        },
        {
            id: "positive_behavior",
            title: "Positive Behavior Guidance",
            scores: getScores([
                { description: "Harsh tone or ignoring behavior issues." },
                { description: "Teacher shouts to maintain silence. Negative reinforcement." },
                { description: "General instructions given for discipline." },
                { description: "Gentle reminders used. Teacher moves close to restless child." },
                { description: 'Positive guidance. Appreciation & supportive tone used (No "No", only "Let\'s do").' }
            ])
        },
        {
            id: "classroom_time_mgmt",
            title: "Classroom & Time Management",
            scores: getScores([
                { description: "Unbalanced pace. Rough transitions." },
                { description: "Long gaps between activities where kids get bored." },
                { description: "Activities happen but transitions are slow." },
                { description: "Good pacing. Kids kept busy with meaningful tasks." },
                { description: "Smooth transitions. Balanced pace between active and quiet time." }
            ])
        },
        {
            id: "inclusive_approach",
            title: "Inclusive Approach",
            scores: getScores([
                { description: "One-size-fits-all instruction." },
                { description: "Weak students ignored or seated at back." },
                { description: "Some attention to slow learners." },
                { description: "Specific help given to struggling kids during tasks." },
                { description: "Addressing diverse needs. Peer support encouraged. No child left behind." }
            ])
        },
        {
            id: "recap_reflection",
            title: "Recap & Reflection",
            scores: getScores([
                { description: "No recap." },
                { description: "Rushed recap as bell rings." },
                { description: "Simple questions asked to check memory." },
                { description: "Good summary of the day's topic." },
                { description: "Action-based recall. Fun exit routine established to seal learning." }
            ])
        }
    ]
}
export const CTM_FOUNDATIONAL_PRIMARY_MODULE: ModuleDefinition = {
    id: "module_classroom_teaching_mastery_foundational_primary",
    title: "Classroom Teaching Mastery (Foundational Primary)",
    criteria: [
        {
            id: "settling_routine",
            title: "Settling Routine & Energy",
            scores: getScores([
                { description: "Chaos. Students running/talking. No routine." },
                { description: "Teacher struggling to get attention. Noisy transition." },
                { description: "Students settle down within 2-3 mins. Teacher uses cues." },
                { description: "Quick settling. Books out promptly." },
                { description: "Instant transitions. Students know exact routine (Sit/Open books)." }
            ])
        },
        {
            id: "intro_activity",
            title: "Introduction via Activity",
            scores: getScores([
                { description: "Direct lecture. No objects or pictures used." },
                { description: 'Verbal intro only ("Open page 10").' },
                { description: "Uses a picture or story to start the topic." },
                { description: "Uses an object to grab attention." },
                { description: "Uses concrete objects, puppets, or games to introduce concept." }
            ])
        },
        {
            id: "explicit_goal",
            title: "Explicit Goal Explanation",
            scores: getScores([
                { description: "No goal mentioned." },
                { description: "Goal mentioned vaguely or using complex words." },
                { description: 'Simple goal stated ("We will learn addition").' },
                { description: "Goal written on board clearly." },
                { description: 'Goal written & students repeat it ("I can add...").' }
            ])
        },
        {
            id: "drill_practice",
            title: "Drill & Practice",
            scores: getScores([
                { description: "No repetition. Teacher speaks once." },
                { description: "Boring or monotone repetition." },
                { description: "Some choral repetition used." },
                { description: "Active drilling with volume modulation." },
                { description: "Creative drills (Clap & Speak, Rhythm). High energy retention." }
            ])
        },
        {
            id: "blackboard_work",
            title: "Blackboard (Line Discipline)",
            scores: getScores([
                { description: "Messy. Ignores 4-rule/2-rule lines." },
                { description: "Handwriting poor. Lines not followed strictly." },
                { description: "Neat. Follows lines mostly." },
                { description: "Very neat. Good size and spacing." },
                { description: "Perfect handwriting model. Uses color for emphasis." }
            ])
        },
        {
            id: "fln_focus",
            title: "FLN Focus (Read/Count)",
            scores: getScores([
                { description: "No reading or counting practice." },
                { description: "Reading/counting done by teacher only." },
                { description: "Dedicated time for reading text/numbers." },
                { description: "Students read in groups or pairs." },
                { description: "Every child reads a sentence/number. Strong Phonics focus." }
            ])
        },
        {
            id: "student_engagement",
            title: "Student Engagement",
            scores: getScores([
                { description: "Passive listening. Students bored." },
                { description: "Only front row engaged." },
                { description: "Students doing worksheet or writing." },
                { description: "Students answering and writing actively." },
                { description: "Active Learning. Moving, sorting, or discussing." }
            ])
        },
        {
            id: "tone_patience",
            title: "Tone & Patience",
            scores: getScores([
                { description: "Harsh/Shouting. Scaring students." },
                { description: "Irritated tone. Negative words used." },
                { description: "Calm and controlled." },
                { description: "Encouraging. Smiles often." },
                { description: "Nurturing. Uses \"Stars\" and praise effectively." }
            ])
        },
        {
            id: "notebook_checking",
            title: "Live Notebook Checking",
            scores: getScores([
                { description: "Teacher sits at desk while students write." },
                { description: "Teacher stands but does not check books." },
                { description: "Teacher walks around. Checks a few books." },
                { description: "Teacher corrects many students actively." },
                { description: "Teacher corrects grip/posture instantly. Signs books while walking." }
            ])
        },
        {
            id: "fun_closure",
            title: "Fun Closure",
            scores: getScores([
                { description: "Bell rings. Class stops abruptly." },
                { description: "Teacher stops mid-sentence." },
                { description: "Quick verbal summary." },
                { description: "Proper summary of main points." },
                { description: "Fun closure activity (Game/Rhyme) to seal the memory." }
            ])
        }
    ]
}

export const LTO_PRE_PRIMARY_MODULE: ModuleDefinition = {
    id: "module_learning_tools_optimization_pre_primary",
    title: "Learning Tools Optimization (Pre Primary)",
    criteria: [
        {
            id: "syllabus_completion",
            title: "Syllabus Completion as per Assessments",
            scores: getScores([
                { description: "Significantly behind schedule (> 2 weeks). No plan to catch up." },
                { description: "Behind schedule (1-2 weeks). Rushed teaching." },
                { description: "On track with the timeline." },
                { description: "On track. Revision started." },
                { description: "Completed ahead of time. Thorough revision and practice done." }
            ])
        },
        {
            id: "activity_book_completion",
            title: "Activity Book Completion",
            scores: getScores([
                { description: "Many pages incomplete. No corrections." },
                { description: "Partially complete. Corrections are messy or missing." },
                { description: "Completed but some corrections pending." },
                { description: "Completed neatly. Corrections up to date." },
                { description: "All pages completed neatly. All corrections done and signed." }
            ])
        },
        {
            id: "practice_book_completion",
            title: "Practice Book Completion",
            scores: getScores([
                { description: "Rarely used. Many blank pages." },
                { description: "Inconsistent usage. Handwriting is poor." },
                { description: "Regular usage. Handwriting is average." },
                { description: "Completed regularly. Good handwriting." },
                { description: "Completed daily with excellent handwriting. Teacher feedback is evident." }
            ])
        },
        {
            id: "lesson_plan_usage",
            title: "Effective Usage of Lesson Plans",
            scores: getScores([
                { description: "No lesson plan used. Teaching is random." },
                { description: "Lesson plan exists but not followed." },
                { description: "Follows lesson plan loosely." },
                { description: "Follows lesson plan well. Adapts pacing." },
                { description: "Masterful execution of lesson plan. Objectives met perfectly." }
            ])
        },
        {
            id: "ianimations_ibooks",
            title: "Usage of i-Animations & i-Books",
            scores: getScores([
                { description: "Digital tools not used." },
                { description: "Used rarely or effectively." },
                { description: "Used occasionally for demonstration." },
                { description: "Interactive usage. Students actively watching." },
                { description: "Seamless integration. Kids interact with the screen/content." }
            ])
        },
        {
            id: "iactivities",
            title: "Playing i-Activities in class",
            scores: getScores([
                { description: "Activities never played." },
                { description: "Played rarely. Low student interest." },
                { description: "Played occasionally." },
                { description: "Conducted as per schedule. Good engagement." },
                { description: "High energy. All students participating and enjoying." }
            ])
        },
        {
            id: "artzone_projects",
            title: "Usage & Completion of ArtZone & Projects",
            scores: getScores([
                { description: "ArtZone/Projects ignored." },
                { description: "Incomplete or rushed." },
                { description: "Completed but quality is average." },
                { description: "Completed as per syllabus. Good quality." },
                { description: "High creativity. Beautifully executed and displayed." }
            ])
        },
        {
            id: "teacher_diary",
            title: "Teacher Diary Maintenance",
            scores: getScores([
                { description: "Diary not verified or missing." },
                { description: "Irregular entries. Incomplete logs." },
                { description: "Updated weekly but lacks detail." },
                { description: "Updated daily. Clear lesson logs." },
                { description: "Meticulous daily logs. Reflection and planning evident." }
            ])
        },
        {
            id: "student_diary",
            title: "Student Diary Maintenance",
            scores: getScores([
                { description: "Diaries blank or lost." },
                { description: "Notes sent irregularly. Signatures missing." },
                { description: "Regular notes. Some signatures missing." },
                { description: "Regular notes. Neat communication." },
                { description: "Daily communication. Parents acknowledge regularly. Very neat." }
            ])
        },
        {
            id: "report_files",
            title: "Students Report Files Maintenance",
            scores: getScores([
                { description: "Files missing or empty." },
                { description: "Disorganized papers. Loosely kept." },
                { description: "Papers filed but not chronologically." },
                { description: "Organized chronologically." },
                { description: "Perfectly organized. Portfolio approach showcasing growth." }
            ])
        }
    ]
}

export const LTO_FOUNDATIONAL_AND_PRIMARY_MODULE: ModuleDefinition = {
    id: "module_learning_tools_optimization_foundational_primary",
    title: "Learning Tools Optimization (Foundational & Primary)",
    criteria: [
        {
            id: "syllabus_completion",
            title: "Syllabus Completion as per Assessments",
            scores: getScores([
                { description: "Significantly behind schedule." },
                { description: "Behind schedule. Rushing to finish." },
                { description: "On track. Matches assessment dates." },
                { description: "Completed comfortably with revision." },
                { description: "Completed early. Value-added revision conducted." }
            ])
        },
        {
            id: "activity_book_completion",
            title: "Activity Book Completion",
            scores: getScores([
                { description: "Not done." },
                { description: "Partially done. Many blanks." },
                { description: "Completed and checked." },
                { description: "Neat completion. Corrections done." },
                { description: "High standard of work. Creative components added." }
            ])
        },
        {
            id: "work_book_completion",
            title: "Work Book Completion",
            scores: getScores([
                { description: "Major backlog." },
                { description: "Inconsistent completion." },
                { description: "Regular completion. Standard checking." },
                { description: "Thorough completion. Mistakes corrected." },
                { description: "Meticulous. Used as a primary practice tool." }
            ])
        },
        {
            id: "lesson_plan_usage",
            title: "Effective Usage of Lesson Plans",
            scores: getScores([
                { description: "Teaching without plan." },
                { description: "Plan available but ignored." },
                { description: "Adheres to the lesson plan flow." },
                { description: "Effective delivery based on plan." },
                { description: "Innovative execution. Improves upon the plan" }
            ])
        },
        {
            id: "ianimations_ibooks",
            title: "Usage of i-Animations & i-Books",
            scores: getScores([
                { description: "Projector off. Tools unused." },
                { description: "Passive viewing only." },
                { description: "Used to explain concepts visually." },
                { description: "Interactive use (Pause/Ask/Explain)." },
                { description: "Blended learning. Digital content drives inquiry." }
            ])
        },
        {
            id: "iactivities",
            title: "Playing i-Activities in class",
            scores: getScores([
                { description: "Skipped entirely." },
                { description: "Played mechanically." },
                { description: "Conducted for practice." },
                { description: "Students actively engaged in quizzes." },
                { description: "Competitive and fun. Data used to check gaps." }
            ])
        },
        {
            id: "artzone_projects",
            title: "Usage & Completion of ArtZone & Projects",
            scores: getScores([
                { description: "Projects not done." },
                { description: "Done poorly or late." },
                { description: "Completed on time." },
                { description: "Good quality. Follows guidelines." },
                { description: "Outstanding creativity. Projects displayed in class." }
            ])
        },
        {
            id: "teacher_diary",
            title: "Teacher Diary Maintenance",
            scores: getScores([
                { description: "Not maintained." },
                { description: "Gaps in entries." },
                { description: "Regular entries. Signed by HOD." },
                { description: "Detailed daily logs." },
                { description: "Reflective practice recorded. Future planning visible." }
            ])
        },
        {
            id: "student_diary",
            title: "Student Diary Maintenance",
            scores: getScores([
                { description: "HW not written." },
                { description: "Irregular/Messy entries." },
                { description: "HW written daily. Signed." },
                { description: "Neat, clear, and consistent." },
                { description: "Specific remarks given. Parent communication loop active." }
            ])
        },
        {
            id: "report_files",
            title: "Students Report Files Maintenance",
            scores: getScores([
                { description: "No files." },
                { description: "Disorganized papers." },
                { description: "Papers filed properly." },
                { description: "Systematic arrangement." },
                { description: "Comprehensive record of student journey." }
            ])
        }
    ]
}

export const LTO_HIGH_SCHOOL_MODULE: ModuleDefinition = {
    id: "module_learning_tools_optimization_high_school",
    title: "Learning Tools Optimization (High School)",
    criteria: [
        {
            id: "syllabus_completion",
            title: "Syllabus Completion as per Assessments",
            scores: getScores([
                { description: "Major lag. Topics skipped." },
                { description: "Behind schedule. Topics rushed." },
                { description: "On schedule. Topics covered well." },
                { description: "Completed with time for revision." },
                { description: "Syllabus mastery. Strategic revision for exams." }
            ])
        },
        {
            id: "study_material_notebook",
            title: "Study Material & Note Book Completion",
            scores: getScores([
                { description: "Notes missing/incomplete." },
                { description: "Inconsistent notes. Not checked." },
                { description: "Notes complete. Indices maintained." },
                { description: "High quality notes. Regular correction." },
                { description: "Model notes. Useful for exam preparation." }
            ])
        },
        {
            id: "digital_resources",
            title: "Effective Usage of Digital Resources",
            scores: getScores([
                { description: "Smart board unused." },
                { description: "Minimal/Passive usage." },
                { description: "Visuals used to explain concepts." },
                { description: "Interactive tools (Simulations) used." },
                { description: "Power User. Digital tools simplify complex topics." }
            ])
        },
        {
            id: "projects_records",
            title: "Projects & Records Tasks",
            scores: getScores([
                { description: "Not done/submitted." },
                { description: "Low quality/Copy-paste work." },
                { description: "Completed as per standards." },
                { description: "High quality. Original work." },
                { description: "Research-based projects. Excellence in presentation." }
            ])
        },
        {
            id: "digital_assessments",
            title: "Digital Assessments Teacher Average",
            scores: getScores([
                { description: "< 50% Class Average." },
                { description: "50-60% Average. Concepts weak." },
                { description: "60-75% Average. Satisfactory." },
                { description: "75-90% Average. Good understanding." },
                { description: "> 90% Class Average. High mastery." }
            ])
        },
        {
            id: "formative_summative",
            title: "Formative & Summative Assessments Teacher Average",
            scores: getScores([
                { description: "Low performance. Many failures." },
                { description: "Below average performance." },
                { description: "Average results. Meets targets." },
                { description: "High performance. Good pass %" },
                { description: "Top-tier results. High distinctions." }
            ])
        },
        {
            id: "student_feedback",
            title: "Students Feedback Average",
            scores: getScores([
                { description: "Negative feedback. Dissatisfaction." },
                { description: "Mixed feedback. Some complaints." },
                { description: "Positive feedback. Students happy." },
                { description: "Very positive. Students engaged." },
                { description: "Excellent feedback. Teacher is highly respected/loved." }
            ])
        },
        {
            id: "teacher_diary",
            title: "How Effectively Teacher is Following Teacher's Diary",
            scores: getScores([
                { description: "Diary not used." },
                { description: "Updates are sporadic." },
                { description: "Diary followed. Plans recorded." },
                { description: "Diary drives the day. Detailed logs." },
                { description: "Strategic tool. Reflects planning and execution depth." }
            ])
        },
        {
            id: "student_diary",
            title: "Student Diary Maintenance",
            scores: getScores([
                { description: "Not checked." },
                { description: "Irregular checking." },
                { description: "Checked daily." },
                { description: "Checked with specific remarks." },
                { description: "Communication tool. Ensures parent alignment." }
            ])
        },
        {
            id: "report_files",
            title: "Students Report Files Maintenance",
            scores: getScores([
                { description: "Disorganized/Missing." },
                { description: "Papers loose." },
                { description: "Files maintained." },
                { description: "Neat and chronological." },
                { description: "Professional portfolio. Data-driven growth record." }
            ])
        }
    ]
}

export const PIE_PRE_PRIMARY_AND_FOUNDATIONAL_MODULE: ModuleDefinition = {
    id: "module_professional_integrity_excellence_pre_primary_foundational",
    title: "Professional Integrity & Excellence (Pre Primary & Foundational)",
    criteria: [
        {
            id: "punctuality_attendance",
            title: "Punctuality & Attendance",
            scores: getScores([
                { description: "Frequently late. Leaves class unsupervised. High absenteeism." },
                { description: "Occasionally late to school/pickup duty. Leaves exhausted early." },
                { description: "On time for school and dispersal duties. Follows leave protocol." },
                { description: "Always early. Sets up class before kids arrive." },
                { description: "Role model. Never leaves class unattended. First to arrive, last to leave." }
            ])
        },
        {
            id: "personal_hygiene_grooming",
            title: "Personal Hygiene & Grooming",
            scores: getScores([
                { description: "Unkempt appearance. Ignored personal hygiene (bad breath/odor)." },
                { description: "Casual dressing. Inconsistent grooming standards." },
                { description: "Neat professional attire. Good hygiene maintained." },
                { description: "Sharp presentation. Follows dress code strictly." },
                { description: "Immaculate grooming. Inspires students to be neat." }
            ])
        },
        {
            id: "patience_emotional_control",
            title: "Patience & Emotional Control",
            scores: getScores([
                { description: "Loses temper. Shouts at children. Visibly frustrated." },
                { description: "Gets irritated easily. Tone becomes harsh under stress." },
                { description: "Calm and patient with crying/stubborn children." },
                { description: "Very patient. Uses distraction techniques instead of anger." },
                { description: "Saint-like patience. Remains smiling even during meltdown." }
            ])
        },
        {
            id: "communication_parents",
            title: "Communication with Parents",
            scores: getScores([
                { description: "Rude or ignores parents. Complains about child constantly." },
                { description: "Communication is sparse or only negative." },
                { description: "Updates parents on apps/diary. Professional tone." },
                { description: "Proactive updates. Shares \"Happy Moments\" with parents." },
                { description: "Builds trust. Partners with parents. De-escalates anxiety effectively." }
            ])
        },
        {
            id: "safety_vigilance",
            title: "Safety & Vigilance",
            scores: getScores([
                { description: "Careless. Leaves dangerous items around. Ignores child safety." },
                { description: "Distracted (on phone) while supervising play." },
                { description: "Vigilant during play/dispersal. Follows safety rules." },
                { description: "Proactive. Identifies hazards before accidents happen." },
                { description: "\"Hawk-eye\" supervision. Teaches safety habits to children." }
            ])
        },
        {
            id: "teamwork",
            title: "Teamwork (Co-Teachers/Ayammas)",
            scores: getScores([
                { description: "Treats support staff (Ayammas) badly. Isolates self." },
                { description: "Conflicts with co-teachers. Poor coordination." },
                { description: "Respectful to support staff. Works well with co-teachers." },
                { description: "Supports co-teachers. Guides Ayammas on hygiene tasks." },
                { description: "Uplifts the wing. Mentors new teachers. Treats Ayammas as partners." }
            ])
        },
        {
            id: "response_feedback",
            title: "Response to Feedback",
            scores: getScores([
                { description: "Defensive/Argumentative. Repeats mistakes." },
                { description: "Listens but changes nothing. Excuses given." },
                { description: "Accepts feedback. Shows effort to improve." },
                { description: "Asks clarifying questions. Implements changes quickly." },
                { description: "Seeks feedback proactively. Implements and tracks progress." }
            ])
        },
        {
            id: "event_participation",
            title: "Event Participation",
            scores: getScores([
                { description: "Hides/Avoids work during events." },
                { description: "Participates reluctantly. Does minimum." },
                { description: "Participates active in assigned role (props/dance)." },
                { description: "Takes initiative. Leads sub-committees for events." },
                { description: "The \"Energy\" of the event. Manages crises smoothly." }
            ])
        },
        {
            id: "adherence_policies",
            title: "Adherence to School Policies",
            scores: getScores([
                { description: "Violates policies (Phone use in class/Gossiping)." },
                { description: "Follows rules only when watched." },
                { description: "Follows all school rulebook policies." },
                { description: "Champions policies. Reminds others to follow." },
                { description: "Guardian of values. Integrity beyond reproach." }
            ])
        },
        {
            id: "positive_attitude",
            title: "Positive Attitude",
            scores: getScores([
                { description: "Toxic/Negative. Complains about school/children." },
                { description: "Neutral. Just does the job." },
                { description: "Positive presence. Smiles at children." },
                { description: "Solution-oriented. Adds energy to the staff room." },
                { description: "Radiates positivity. Turns problems into opportunities." }
            ])
        }
    ]
}

export const PIE_PRIMARY_AND_HIGH_SCHOOL_MODULE: ModuleDefinition = {
    id: "module_professional_integrity_excellence_primary_high_school",
    title: "Professional Integrity & Excellence (Primary & High School)",
    criteria: [
        {
            id: "punctuality_discipline",
            title: "Punctuality & Professional Discipline",
            scores: getScores([
                { description: "Frequently late to school/class. Absent without notice. Leaves class unsupervised." },
                { description: "Occasionally late. Takes leave without prior planning. Needs reminders on discipline." },
                { description: "Generally on time. Follows leave procedures. Maintains basic professional decorum." },
                { description: "Always early to class/school. Zeros unapproved leaves. Uses transition time effectively." },
                { description: "Role model for punctuality. First to arrive, last to leave. Respects time of others perfectly." }
            ])
        },
        {
            id: "responsibility_ownership",
            title: "Responsibility & Ownership of Work",
            scores: getScores([
                { description: "\"Not my job\" attitude. Blames students, parents, or management for failures." },
                { description: "Does the minimum required. Needs constant monitoring to complete tasks." },
                { description: "Completes assigned tasks on time. Reliable. Accepts responsibility when asked." },
                { description: "Takes ownership of student outcomes. Anticipates needs and acts without reminders." },
                { description: "Proactive leader. Takes full ownership of the school's vision. Volunteers for tasks beyond job description." }
            ])
        },
        {
            id: "communication_management",
            title: "Communication with Management & Colleagues",
            scores: getScores([
                { description: "Rude/Disrespectful tone. Ignores circulars or messages. Spreads misinformation." },
                { description: "Slow to respond. Tone sometimes unprofessional or unclear." },
                { description: "Professional tone. Responds within reasonable time. Follows communication channels." },
                { description: "Clear, prompt, and constructive. Keeps stakeholders informed proactively." },
                { description: "Excellent communicator. De-escalates conflicts. Proactively updates management on potential issues." }
            ])
        },
        {
            id: "teamwork_collaboration",
            title: "Teamwork & Collaboration",
            scores: getScores([
                { description: "Isolates self. Gossips or creates conflict in the staffroom. Refuses to share resources." },
                { description: "Passive in meetings. Collaborates only when forced." },
                { description: "Works well within the department. Attends meetings and coordinates with peers." },
                { description: "Supportive colleague. Shares resources and best practices. Helps others when asked." },
                { description: "Culture builder. Mentors junior teachers. Uplifts the morale of the entire staffroom." }
            ])
        },
        {
            id: "response_feedback",
            title: "Response to Feedback & Corrective Suggestions",
            scores: getScores([
                { description: "Defensive, argumentative, or in denial. Repeats the same mistakes despite warnings." },
                { description: "Listens but makes minimal effort to change. Gives excuses rather than solutions." },
                { description: "Accepts feedback constructively. Shows visible effort to improve in the next cycle." },
                { description: "Asks clarifying questions on how to improve. Implements changes quickly." },
                { description: "Growth mindset. Proactively seeks feedback. Implements immediately and requests a re-evaluation." }
            ])
        },
        {
            id: "professional_behaviour",
            title: "Professional Behaviour with Students",
            scores: getScores([
                { description: "Harsh/Abusive language or too casual/friendly (lacks boundaries)." },
                { description: "Inconsistent boundaries (shows favoritism). Mood affects behavior with students." },
                { description: "Professional. Polite. Maintains appropriate teacher-student distance." },
                { description: "Empathetic and firm. Approachable but respected. Students know the limits." },
                { description: "Inspiring role model. High EQ. Students feel safe, respected, and motivated to emulate the teacher." }
            ])
        },
        {
            id: "consistency_reliability",
            title: "Consistency & Reliability in Work",
            scores: getScores([
                { description: "Performance fluctuates wildly. Unpredictable output." },
                { description: "Good days and bad days. Quality drops when not supervised." },
                { description: "Generally consistent. Delivers standard output regularly." },
                { description: "Reliable high performance. Delivers quality work regardless of external stress." },
                { description: "Rock-solid consistency. Excellence is a habit. Trusted blindly for critical tasks." }
            ])
        },
        {
            id: "participation_activities",
            title: "Participation in School Activities & Events",
            scores: getScores([
                { description: "Hides during events. Avoids duties. Leaves early." },
                { description: "Participates reluctantly. Does only the assigned duty and nothing more." },
                { description: "Participates actively in assigned role. Cooperates with event coordinators." },
                { description: "Takes initiative. Leads sub-committees. Manages students effectively during events." },
                { description: "The \"Spirit\" of the event. Energizes others. Handles crises during events smoothly." }
            ])
        },
        {
            id: "positive_contribution",
            title: "Positive Contribution to Work Environment",
            scores: getScores([
                { description: "Toxic influence. Complains constantly. Demotivates others." },
                { description: "Neutral presence. Neither adds nor subtracts from the culture." },
                { description: "Positive presence. Gets along with everyone. polite." },
                { description: "Solution-oriented. Adds positive energy to discussions. Avoids gossip." },
                { description: "Radiates positivity. Turns problems into opportunities. Lifts the school spirit." }
            ])
        },
        {
            id: "work_ethics",
            title: "Work Ethics & Adherence to School Policies",
            scores: getScores([
                { description: "Violates policies (Phone usage, Dress code). Unethical behavior." },
                { description: "Follows rules only when watched. Occasional lapses in protocol." },
                { description: "Follows school rulebook and policies (TTRMS). Respects hierarchy." },
                { description: "Champions policies. Reminds others to follow. Explains the \"Why\" behind rules." },
                { description: "Guardian of values. Integrity beyond reproach. Represents the school's ethos perfectly." }
            ])
        }
    ]
}
