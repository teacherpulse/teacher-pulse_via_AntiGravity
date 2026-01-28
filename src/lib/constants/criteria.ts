export type Criterion = {
    id: string
    label: string
    max_score: number
    description?: string
}

export type ModuleCriteria = {
    variants?: {
        [key: string]: Criterion[]
    }
    common?: Criterion[]
}

export const CRITERIA: { [key: string]: ModuleCriteria } = {
    // Module 1: Classroom Teaching Mastery (CTM)
    module_classroom_teaching_mastery: {
        variants: {
            pre_primary: [
                { id: 'ctm_pp_1', label: '1. Warm-Up & Settling Routine', max_score: 5, description: 'Entry routine, greetings, emotional readiness.' },
                { id: 'ctm_pp_2', label: '2. Classroom Readiness', max_score: 5, description: 'Material organization, station setup.' },
                { id: 'ctm_pp_3', label: '3. Play-Based Instruction', max_score: 5, description: 'Hands-on resources, learning corners, "invisible" learning.' },
                { id: 'ctm_pp_4', label: '4. Storytelling / Rhymes', max_score: 5, description: 'Voice modulation, actions, props, phonics.' },
                { id: 'ctm_pp_5', label: '5. Concept Intro (Concrete Objects)', max_score: 5, description: 'Use of real-life concrete objects (TLM) for tactile learning.' },
                { id: 'ctm_pp_6', label: '6. Student Interaction', max_score: 5, description: 'Active response vs passive sitting.' },
                { id: 'ctm_pp_7', label: '7. Positive Behavior Guidance', max_score: 5, description: 'Tone, gentle reminders, positive reinforcement.' },
                { id: 'ctm_pp_8', label: '8. Classroom & Time Management', max_score: 5, description: 'Pacing, transitions between active/quiet time.' },
                { id: 'ctm_pp_9', label: '9. Inclusive Approach', max_score: 5, description: 'Addressing diverse needs, peer support.' },
                { id: 'ctm_pp_10', label: '10. Recap & Reflection', max_score: 5, description: 'Action-based recall, exit routines.' },
            ],
            grade_1_2: [
                { id: 'ctm_g12_1', label: '1. Settling Routine & Energy', max_score: 5, description: 'Transition speed, routine knowledge (Sit/Open books).' },
                { id: 'ctm_g12_2', label: '2. Introduction via Activity', max_score: 5, description: 'Use of objects, games, or story to start topic.' },
                { id: 'ctm_g12_3', label: '3. Explicit Goal Explanation', max_score: 5, description: 'Goal written clearly, students repeat it.' },
                { id: 'ctm_g12_4', label: '4. Drill & Practice', max_score: 5, description: 'Choral repetition, volume modulation, creative drills.' },
                { id: 'ctm_g12_5', label: '5. Blackboard (Line Discipline)', max_score: 5, description: 'Handwriting model, use of 4-rule/2-rule lines.' },
                { id: 'ctm_g12_6', label: '6. FLN Focus (Read/Count)', max_score: 5, description: 'Every child reads/counts, strong phonics focus.' },
                { id: 'ctm_g12_7', label: '7. Student Engagement', max_score: 5, description: 'Active learning, sorting, discussing vs passive listening.' },
                { id: 'ctm_g12_8', label: '8. Tone & Patience', max_score: 5, description: 'Nurturing tone, use of praise/stars.' },
                { id: 'ctm_g12_9', label: '9. Live Notebook Checking', max_score: 5, description: 'Correcting grip/posture instantly, signing while moving.' },
                { id: 'ctm_g12_10', label: '10. Fun Closure', max_score: 5, description: 'Game/Rhyme to seal the memory.' },
            ],
            grade_3_10: [
                { id: 'ctm_g310_1', label: '1. Initiation of Learning', max_score: 5, description: 'Cognitive curiosity, "hook" question/story.' },
                { id: 'ctm_g310_2', label: '2. Explanation of Objectives', max_score: 5, description: 'Objectives written, explained, rephrased by students.' },
                { id: 'ctm_g310_3', label: '3. Blackboard Management', max_score: 5, description: 'Visual masterpiece (Mind Map), student-led aids.' },
                { id: 'ctm_g310_4', label: '4. Interaction with Students', max_score: 5, description: 'Participation techniques (Think-Pair-Share), Cold Call.' },
                { id: 'ctm_g310_5', label: '5. Vocabulary & Presentation', max_score: 5, description: 'High-level terminology, energetic delivery.' },
                { id: 'ctm_g310_6', label: '6. Following Management Instructions (TTRMS)', max_score: 5, description: 'Adherence to standard operational protocols.' },
                { id: 'ctm_g310_7', label: '7. Student Involvement', max_score: 5, description: 'Students take ownership, lead discussions.' },
                { id: 'ctm_g310_8', label: '8. Classroom & Time Mgmt', max_score: 5, description: 'Invisible discipline, seamless transitions.' },
                { id: 'ctm_g310_9', label: '9. Inclusive Education', max_score: 5, description: 'Differentiated tasks, remedial support integrated.' },
                { id: 'ctm_g310_10', label: '10. Recapitulation', max_score: 5, description: 'Comprehensive review, Exit Ticket, link to next lesson.' },
            ]
        }
    },

    // Module 2: Correction Quality Index (CQI)
    module_correction_quality_index: {
        common: [
            { id: 'cqi_1', label: '1. Regularity & Timeliness', max_score: 5, description: 'Corrections done within 24-48 hours. No backlog.' },
            { id: 'cqi_2', label: '2. Completeness', max_score: 5, description: 'All exercises checked. Index signed.' },
            { id: 'cqi_3', label: '3. Accuracy of Checking', max_score: 5, description: 'Accurate checking. Mistakes identified and coded.' },
            { id: 'cqi_4', label: '4. Feedback Quality', max_score: 5, description: 'Constructive, specific, and actionable feedback.' },
            { id: 'cqi_5', label: '5. Signature & Date', max_score: 5, description: 'Signed and dated consistently with correct ink.' },
            { id: 'cqi_6', label: '6. Presentation/Neatness', max_score: 5, description: 'High standards of neatness. Index maintained.' },
            { id: 'cqi_7', label: '7. Homework Quality', max_score: 5, description: 'Relevant/Purposeful HW. Defaulters followed up.' },
            { id: 'cqi_8', label: '8. Support to Weak Students', max_score: 5, description: 'Detailed clues, re-teaching via comments.' },
            { id: 'cqi_9', label: '9. Marking Standards', max_score: 5, description: 'Standard symbols (ticks/crosses/circles) used correctly.' },
            { id: 'cqi_10', label: '10. Accountability', max_score: 5, description: 'No loss of books. Detailed tracker maintained.' },
        ]
    },

    // Module 3: Learning Tools Optimization (LTO)
    module_learning_tools_optimization: {
        variants: {
            pre_primary: [
                { id: 'lto_pp_1', label: '1. Syllabus Completion as per Assessments', max_score: 5, description: 'On track with timeline / Revision done.' },
                { id: 'lto_pp_2', label: '2. Activity Book Completion', max_score: 5, description: 'All pages completed neatly and checked.' },
                { id: 'lto_pp_3', label: '3. Practice Book Completion', max_score: 5, description: 'Regular completion with neat handwriting.' },
                { id: 'lto_pp_4', label: '4. Effective Usage of Lesson Plans', max_score: 5, description: 'Follows plan well, adapts pacing.' },
                { id: 'lto_pp_5', label: '5. Usage of i-Animations & i-Books', max_score: 5, description: 'Interactive usage, kids interact with screen.' },
                { id: 'lto_pp_6', label: '6. Playing i-Activities in class', max_score: 5, description: 'Conducted schedule, high engagement.' },
                { id: 'lto_pp_7', label: '7. Usage & Completion of ArtZone & Projects', max_score: 5, description: 'Completed as per syllabus, creative guidance.' },
                { id: 'lto_pp_8', label: '8. Teacher Diary Maintenance', max_score: 5, description: 'Updated daily, clear lesson logs.' },
                { id: 'lto_pp_9', label: '9. Student Diary Maintenance', max_score: 5, description: 'Regular notes, neat communication.' },
                { id: 'lto_pp_10', label: '10. Students Report Files Maintenance', max_score: 5, description: 'Organized chronologically, portfolio approach.' },
            ],
            grade_1_5: [
                { id: 'lto_g15_1', label: '1. Syllabus Completion as per Assessments', max_score: 5, description: 'On track / Completed with revision.' },
                { id: 'lto_g15_2', label: '2. Activity Book Completion', max_score: 5, description: 'Neat completion. Corrections done.' },
                { id: 'lto_g15_3', label: '3. Work Book Completion', max_score: 5, description: 'Thorough completion, mistakes corrected.' },
                { id: 'lto_g15_4', label: '4. Effective Usage of Lesson Plans', max_score: 5, description: 'Adheres to flow, valid delivery based on plan.' },
                { id: 'lto_g15_5', label: '5. Usage of i-Animations & i-Books', max_score: 5, description: 'Interactive use (Pause/Ask/Explain).' },
                { id: 'lto_g15_6', label: '6. Playing i-Activities in class', max_score: 5, description: 'ACTIVE engagement in quizzes, competitive.' },
                { id: 'lto_g15_7', label: '7. Usage & Completion of ArtZone & Projects', max_score: 5, description: 'Good quality, follows guidelines, displayed.' },
                { id: 'lto_g15_8', label: '8. Teacher Diary Maintenance', max_score: 5, description: 'Regular entries, detailed logs.' },
                { id: 'lto_g15_9', label: '9. Student Diary Maintenance', max_score: 5, description: 'HW written daily, signed, neat.' },
                { id: 'lto_g15_10', label: '10. Students Report Files Maintenance', max_score: 5, description: 'Systematic arrangement.' },
            ],
            grade_6_10: [
                { id: 'lto_g610_1', label: '1. Syllabus Completion as per Assessments', max_score: 5, description: 'Completed with time for revision / Mastery.' },
                { id: 'lto_g610_2', label: '2. Study Material & Note Book Completion', max_score: 5, description: 'High quality notes, regular correction, indices.' },
                { id: 'lto_g610_3', label: '3. Effective Usage of Digital Resources', max_score: 5, description: 'Interactive tools/simulations used.' },
                { id: 'lto_g610_4', label: '4. Projects & Records Tasks', max_score: 5, description: 'High quality, original work.' },
                { id: 'lto_g610_5', label: '5. Digital Assessments Teacher Average', max_score: 5, description: '75-90% Average or higher.' },
                { id: 'lto_g610_6', label: '6. Formative & Summative Assessments Avg', max_score: 5, description: 'High pass percentage / Top-tier results.' },
                { id: 'lto_g610_7', label: '7. Students Feedback Average', max_score: 5, description: 'Very positive, students engaged.' },
                { id: 'lto_g610_8', label: '8. How Effectively Teacher is Following Diary', max_score: 5, description: 'Diary drives the day. Detailed logs.' },
                { id: 'lto_g610_9', label: '9. Student Diary Maintenance', max_score: 5, description: 'Checked with specific remarks.' },
                { id: 'lto_g610_10', label: '10. Students Report Files Maintenance', max_score: 5, description: 'Neat, chronological, portfolio.' },
            ]
        }
    },

    // Module 4: Professional Integrity & Excellence (PIE)
    module_professional_integrity_excellence: {
        // Note: Assuming generic PIE for now based on "Nursery to Grade-2" image if broadly applicable,
        // or we can add variants if user provides them. Using this set for 'default' or 'pre_primary'.
        variants: {
            pre_primary: [
                { id: 'pie_1', label: '1. Punctuality & Attendance', max_score: 5, description: 'On time, follows protocol, never leaves class unattended.' },
                { id: 'pie_2', label: '2. Personal Hygiene & Grooming', max_score: 5, description: 'Sharp presentation, professional attire.' },
                { id: 'pie_3', label: '3. Patience & Emotional Control', max_score: 5, description: 'Calm, patient, uses distraction vs anger.' },
                { id: 'pie_4', label: '4. Communication with Parents', max_score: 5, description: 'Proactive updates, professional tone.' },
                { id: 'pie_5', label: '5. Safety & Vigilance', max_score: 5, description: 'Vigilant, identifies hazards proactively.' },
                { id: 'pie_6', label: '6. Teamwork (Co-Teachers/Ayammas)', max_score: 5, description: 'Supportive, respectful, mentors others.' },
                { id: 'pie_7', label: '7. Response to Feedback', max_score: 5, description: 'Implements changes quickly, asks clarifying questions.' },
                { id: 'pie_8', label: '8. Event Participation', max_score: 5, description: 'Takes initiative, leads sub-committees.' },
                { id: 'pie_9', label: '9. Adherence to School Policies', max_score: 5, description: 'Follows all rules, champions policies.' },
                { id: 'pie_10', label: '10. Positive Attitude', max_score: 5, description: 'Solution-oriented, adds energy.' },
            ],
            // Fallback/Duplicate for others until specified
            grade_3_10: [
                { id: 'pie_g310_1', label: '1. Punctuality & Professional Discipline', max_score: 5, description: 'Role model for punctuality. First to arrive, last to leave.' },
                { id: 'pie_g310_2', label: '2. Responsibility & Ownership of Work', max_score: 5, description: 'Proactive leader. Takes full ownership of vision.' },
                { id: 'pie_g310_3', label: '3. Communication with Management & Colleagues', max_score: 5, description: 'Excellent communicator. De-escalates conflicts.' },
                { id: 'pie_g310_4', label: '4. Teamwork & Collaboration', max_score: 5, description: 'Culture builder. Mentors junior teachers.' },
                { id: 'pie_g310_5', label: '5. Response to Feedback & Corrective Suggestions', max_score: 5, description: 'Growth mindset. Proactively seeks feedback.' },
                { id: 'pie_g310_6', label: '6. Professional Behaviour with Students', max_score: 5, description: 'Inspiring role model. High EQ. Students feel safe.' },
                { id: 'pie_g310_7', label: '7. Consistency & Reliability in Work', max_score: 5, description: 'Rock-solid consistency. Trusted blindly for critical tasks.' },
                { id: 'pie_g310_8', label: '8. Participation in School Activities & Events', max_score: 5, description: 'Energizes others. Handles crises smoothly.' },
                { id: 'pie_g310_9', label: '9. Positive Contribution to Work Environment', max_score: 5, description: 'Radiates positivity. Turns problems into opportunities.' },
                { id: 'pie_g310_10', label: '10. Work Ethics & Adherence to School Policies', max_score: 5, description: 'Guardian of values. Integrity beyond reproach.' },
            ],
            common: [
                { id: 'pie_1', label: '1. Punctuality & Attendance', max_score: 5, description: 'On time, follows protocol.' },
                { id: 'pie_2', label: '2. Personal Hygiene & Grooming', max_score: 5, description: 'Professional attire and grooming.' },
                { id: 'pie_3', label: '3. Patience & Emotional Control', max_score: 5, description: 'Calm and professional interactions.' },
                { id: 'pie_4', label: '4. Communication with Parents', max_score: 5, description: 'Effective and timely communication.' },
                { id: 'pie_5', label: '5. Safety & Vigilance', max_score: 5, description: 'Ensures student safety.' },
                { id: 'pie_6', label: '6. Teamwork', max_score: 5, description: 'Effective collaboration with colleagues.' },
                { id: 'pie_7', label: '7. Response to Feedback', max_score: 5, description: 'Accepts and acts on feedback.' },
                { id: 'pie_8', label: '8. Event Participation', max_score: 5, description: 'Active engagement in school events.' },
                { id: 'pie_9', label: '9. Adherence to School Policies', max_score: 5, description: 'Strict adherence to all policies.' },
                { id: 'pie_10', label: '10. Positive Attitude', max_score: 5, description: 'Constructive and optimistic outlook.' },
            ]
        }
    },

    // Module 5 (ALMF): Academic Leadership Mastery Framework (HODs)
    module_almf: {
        common: [
            {
                id: 'almf_1',
                label: '1. Instructional Supervision (IS)',
                max_score: 5,
                description: 'Quality, frequency, and impact of teacher observations and mentoring. From Absentee Leader (1) to Transformational Leader (5).'
            },
            {
                id: 'almf_2',
                label: '2. Operational Rigor (OR)',
                max_score: 5,
                description: 'Accuracy of audits (Diaries, Corrections), syllabus tracking, and resource management. From Negligent (1) to Standard Setter (5).'
            },
            {
                id: 'almf_3',
                label: '3. Data-Driven Strategy (DDS)',
                max_score: 5,
                description: 'Analysis of student performance, remedial planning, availability/analysis of results. From Data Avoider (1) to Result Architect (5).'
            },
            {
                id: 'almf_4',
                label: '4. Team Culture & Integrity (TCI)',
                max_score: 5,
                description: 'Conflict resolution, alignment with management, ethics. From Divider (1) to Institutional Pillar (5).'
            },
        ]
    },
        ]
    },

// Module 6: Vidya Pulse (Student Diagnostics)
module_vidya_pulse: {
    variants: {
        // Age 3-6: Foundational Years
        age_3_6: [
            { id: 'vp_36_1', label: '1. Emotional Regulation', max_score: 5, description: 'Reacts to fun/frustration, soothes self, mood stability.' },
            { id: 'vp_36_2', label: '2. Separation Anxiety', max_score: 5, description: 'Drop-off reaction, asking for parents, nap time behavior.' },
            { id: 'vp_36_3', label: '3. Social Skills', max_score: 5, description: 'Sharing, conflict resolution, initiating interaction.' },
            { id: 'vp_36_4', label: '4. Attention Span', max_score: 5, description: 'Circle time focus, following multi-step instructions.' },
        ],
            // Age 6-10: Formative Primary Years
            age_6_10: [
                { id: 'vp_610_1', label: '1. Academic Habits', max_score: 5, description: 'Homework completion, bag organization, handwriting.' },
                { id: 'vp_610_2', label: '2. Defiance & Behavior', max_score: 5, description: 'Response to correction, language used, aggression.' },
                { id: 'vp_610_3', label: '3. Digital Focus', max_score: 5, description: 'Screen dependency, attention span without screens.' },
                { id: 'vp_610_4', label: '4. Peer Dynamics', max_score: 5, description: 'Conflict resolution, empathy, response to teasing.' },
                { id: 'vp_610_5', label: '5. Self-Esteem', max_score: 5, description: 'Reaction to praise/failure, body language, "I can" attitude.' },
            ],
                // Age 11-16: Adolescence & Identity
                age_11_16: [
                    { id: 'vp_1116_1', label: '1. Academic Pressure', max_score: 5, description: 'Exam stress, integrity (AI/Plagiarism), future outlook.' },
                    { id: 'vp_1116_2', label: '2. Cyber-Safety', max_score: 5, description: 'Online conflict, privacy settings, screen balance.' },
                    { id: 'vp_1116_3', label: '3. Risk-Taking', max_score: 5, description: 'Substance suspicion, reckless behavior, peer influence.' },
                    { id: 'vp_1116_4', label: '4. Mental Health', max_score: 5, description: 'Mood swings, coping mechanisms, body image.' },
                    { id: 'vp_1116_5', label: '5. Defiance & Authority', max_score: 5, description: 'Response to rules, communication with adults, accountability.' },
                ]
            ]
    }
},

// Module 7: Parent Pulse (Parent Engagement)
module_parent_pulse: {
    variants: {
        // Age Group 1: Pre-Primary (Nursery, LKG, UKG)
        // Source: PREPRIMARY PARENT PULSE image
        pp: [
            { id: 'pp_parent_1', label: '1. Independence', max_score: 5, description: 'Self-Help Skills: Encourage child to eat/toilet independently.' },
            { id: 'pp_parent_2', label: '2. Habits', max_score: 5, description: 'Sleep & Routine: Is the child well-rested and settled?' },
            { id: 'pp_parent_3', label: '3. Motor Skills', max_score: 5, description: 'Home Practice: Scribbling/activities at home.' },
            { id: 'pp_parent_4', label: '4. Separation', max_score: 5, description: 'Drop-off Behavior: Handling separation anxiety.' },
            { id: 'pp_parent_5', label: '5. Speech', max_score: 5, description: 'Oral/Speech Development: Interactions at home.' },
        ],
            // Age Group 2: Foundational (Grade 1-2)
            // Source: FOUNDATIONAL PRIMARY PARENT PULSE image
            foundational: [
                { id: 'found_parent_1', label: '1. Academics', max_score: 5, description: 'Reading Habits: Reading fluency support at home.' },
                { id: 'found_parent_2', label: '2. Responsibility', max_score: 5, description: 'Bag & Belongings: Who packs the bag?' },
                { id: 'found_parent_3', label: '3. Writing', max_score: 5, description: 'Handwriting & Motor Skills: Focus on legibility.' },
                { id: 'found_parent_4', label: '4. Math', max_score: 5, description: 'Basic Numeracy: Real-world math usage.' },
                { id: 'found_parent_5', label: '5. Discipline', max_score: 5, description: 'Morning Routine: Punctuality and readiness.' },
            ],
                // Age Group 3: Primary (Grade 3-5)
                // Source: PRIMARY PARENT PULSE image
                primary: [
                    { id: 'prim_parent_1', label: '1. Academics', max_score: 5, description: 'Concept vs Rote: Focus on understanding.' },
                    { id: 'prim_parent_2', label: '2. Social', max_score: 5, description: 'Peer Awareness: Knowledge of friends/conflicts.' },
                    { id: 'prim_parent_3', label: '3. Habits', max_score: 5, description: 'Screen Time & Focus: Digital discipline.' },
                    { id: 'prim_parent_4', label: '4. Organization', max_score: 5, description: 'Project Work: Support vs Doing it for them.' },
                    { id: 'prim_parent_5', label: '5. Values', max_score: 5, description: 'Honesty & Ownership: Reaction to mistakes.' },
                ],
                    // Age Group 4: Upper Primary (Grade 6-8)
                    // Source: UPPER PRIMARY PARENT PULSE image
                    upper_primary: [
                        { id: 'up_parent_1', label: '1. Behavior', max_score: 5, description: 'Respect & Attitude: Handling backtalk/puberty.' },
                        { id: 'up_parent_2', label: '2. Digital', max_score: 5, description: 'Cyber Safety/Social Media: Monitoring online life.' },
                        { id: 'up_parent_3', label: '3. Academics', max_score: 5, description: 'Self-Study Habits: Move from homework to study.' },
                        { id: 'up_parent_4', label: '4. Grooming', max_score: 5, description: 'Hygiene & Presentation: Personal care.' },
                        { id: 'up_parent_5', label: '5. Language', max_score: 5, description: 'Communication Skills: Language used at home.' },
                    ],
                        // Age Group 5: High School (Grade 9-12)
                        // Source: HIGH SCHOOL PARENT PULSE image
                        high_school: [
                            { id: 'hs_parent_1', label: '1. Data', max_score: 5, description: 'Marksheet Awareness: Knowledge of specific data.' },
                            { id: 'hs_parent_2', label: '2. Stress', max_score: 5, description: 'Emotional Resilience: Handling exam pressure.' },
                            { id: 'hs_parent_3', label: '3. Remedial', max_score: 5, description: 'Response to Gaps: Action on weak subjects.' },
                            { id: 'hs_parent_4', label: '4. Distraction', max_score: 5, description: 'Relationships & Focus: Managing teenage distractions.' },
                            { id: 'hs_parent_5', label: '5. Career', max_score: 5, description: 'Future Orientation: Clarity on next steps.' },
                        ]
    }
}
}
}
