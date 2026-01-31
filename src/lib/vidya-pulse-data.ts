export type RubricLevel = 1 | 2 | 3 | 4 | 5;

export interface AssessmentQuestion {
    id: string;
    question: string;
    rubrics: Record<RubricLevel, string>;
}

export interface AssessmentCategory {
    id: string;
    title: string;
    questions: AssessmentQuestion[];
}

export const VIDYA_PULSE_DATA_3_6: AssessmentCategory[] = [
    {
        id: "emotional_regulation",
        title: "Emotional Regulation",
        questions: [
            {
                id: "er_1",
                question: "How does the child react when a fun activity must end?",
                rubrics: {
                    1: "Screams uncontrollably, throws objects, or becomes aggressive.",
                    2: "Refuses to move, cries loudly, or requires physical assistance.",
                    3: "Whines, pouts, or complains for several minutes before complying.",
                    4: "Looks disappointed or asks for 'one more minute' but complies.",
                    5: "Stops immediately, helps clean up, and moves to the next activity."
                }
            },
            {
                id: "er_2",
                question: "How does the child handle frustration (e.g., a tower falls)?",
                rubrics: {
                    1: "Destroys the activity, throws materials, or hits others.",
                    2: "Cries loudly, gives up immediately, and refuses to try again.",
                    3: "Sighs or looks sad, but tries again if an adult helps heavily.",
                    4: "Looks frustrated but tries again with verbal encouragement.",
                    5: "Laughs or says 'Uh oh,' and starts rebuilding independently."
                }
            },
            {
                id: "er_3",
                question: "Can the child self-soothe when upset?",
                rubrics: {
                    1: "Hyperventilates or panics; cannot calm down without leaving the room.",
                    2: "Continues sobbing for more than 20 minutes despite comfort.",
                    3: "Needs significant distraction or holding to stop crying.",
                    4: "Needs a quick hug or reassurance, then settles down.",
                    5: "Takes deep breaths, finds a quiet spot, or calms down independently."
                }
            },
            {
                id: "er_4",
                question: "How intense are the child's mood swings?",
                rubrics: {
                    1: "Explosive, unpredictable anger or inconsolable crying for no clear reason.",
                    2: "Frequent crying spells or anger lasting more than 15 minutes.",
                    3: "Gets upset easily and takes 5-10 minutes to recover.",
                    4: "Normal ups and downs, but recovers quickly from small upsets.",
                    5: "Generally happy and stable mood throughout the day."
                }
            },
            {
                id: "er_5",
                question: "How does the child express needs?",
                rubrics: {
                    1: "Screams, grunts, or physically pulls adults without using words.",
                    2: "Whines or cries until the adult guesses what they need.",
                    3: "Uses one or two words but relies mostly on pointing/crying.",
                    4: "Uses simple sentences to ask but may whine if delayed.",
                    5: "Uses clear words/sentences to ask for help or needs."
                }
            }
        ]
    },
    {
        id: "separation_anxiety",
        title: "Separation Anxiety",
        questions: [
            {
                id: "sa_1",
                question: "Reaction to morning drop-off?",
                rubrics: {
                    1: "Physically clings to parent, screams, requires force to separate.",
                    2: "Cries loudly for >20 minutes after parent leaves.",
                    3: "Cries when parent leaves but settles within 5-10 minutes.",
                    4: "Looks hesitant or clings briefly, but enters after reassurance.",
                    5: "Waves goodbye happily and runs to friends/class."
                }
            },
            {
                id: "sa_2",
                question: "Does the child ask for parents during the day?",
                rubrics: {
                    1: "Inconsolably asks for 'Mummy/Daddy' repeatedly; cannot function.",
                    2: "Cries and asks for parent periodically throughout the day.",
                    3: "Asks 'When is mummy coming?' repeatedly during transitions.",
                    4: "Mentions parent occasionally but is easily distracted.",
                    5: "Rarely mentions parents or talks about them happily."
                }
            },
            {
                id: "sa_3",
                question: "How the child reacts to nap/quiet time?",
                rubrics: {
                    1: "Becomes terrified, screams, or has a panic attack.",
                    2: "Resists rest; cries or tries to get out of bed repeatedly.",
                    3: "Needs back-patting or a specific toy to settle down.",
                    4: "Wiggles a bit but eventually rests quietly.",
                    5: "Settles down easily and rests or sleeps independently."
                }
            },
            {
                id: "sa_4",
                question: "Does the child participate in group activities?",
                rubrics: {
                    1: "Sits in a corner, refuses to move, or tries to leave the room.",
                    2: "Watches from a distance and refuses to join even if invited.",
                    3: "Plays parallel (side-by-side) but rarely interacts.",
                    4: "Waits near the group hoping to be invited in.",
                    5: "Participates eagerly and follows the group."
                }
            },
            {
                id: "sa_5",
                question: "How is child's pickup time reaction?",
                rubrics: {
                    1: "Ignores parent, looks angry, runs away, or refuses to leave.",
                    2: "Cries upon seeing parent (release of tension) or ignores them.",
                    3: "Looks tired or neutral; slow to greet parent.",
                    4: "Smiles but continues playing until called.",
                    5: "Runs to parent happily to greet them."
                }
            }
        ]
    },
    {
        id: "social_skills",
        title: "Social Skills",
        questions: [
            {
                id: "ss_1",
                question: "How does the child respond when expected to share toys?",
                rubrics: {
                    1: "Screams or hits when asked to share any item.",
                    2: "Snatches toys from others or refuses to give them up.",
                    3: "Reluctant to share; hoards toys in their lap.",
                    4: "Shares only when prompted by a teacher/adult.",
                    5: "Shares willingly and understands turn-taking."
                }
            },
            {
                id: "ss_2",
                question: "How does the child handle conflict?",
                rubrics: {
                    1: "Immediately hits, bites, or throws objects at others.",
                    2: "Snatches the toy back aggressively or pushes the other child.",
                    3: "Holds the toy tighter and cries, but does not hit.",
                    4: "Looks for an adult/teacher to help resolve the situation.",
                    5: "Uses words to negotiate or trades for another toy."
                }
            },
            {
                id: "ss_3",
                question: "Response to a peer crying?",
                rubrics: {
                    1: "Laughs at the other child's pain or distress.",
                    2: "Looks confused or annoyed by the noise of crying.",
                    3: "Ignores the crying child completely.",
                    4: "Watches with concern but does not approach.",
                    5: "Approaches to comfort the peer or calls an adult."
                }
            },
            {
                id: "ss_4",
                question: "Initiating interaction with peers?",
                rubrics: {
                    1: "Aggressively disrupts play or hits others to get attention.",
                    2: "Interrupts play clumsily or annoys others.",
                    3: "Plays alone and resists invitations from others.",
                    4: "Approaches peers but waits for them to lead.",
                    5: "Approaches peers easily and suggests a game."
                }
            },
            {
                id: "ss_5",
                question: "Patience during turn-taking?",
                rubrics: {
                    1: "Has a meltdown if they cannot go first or immediately.",
                    2: "Pushes in line or cheats to get a turn.",
                    3: "Needs physical restraint/holding to wait for their turn.",
                    4: "Verbally impatient ('My turn yet?') but waits.",
                    5: "Waits patiently for their turn."
                }
            }
        ]
    },
    {
        id: "attention_span",
        title: "Attention Span",
        questions: [
            {
                id: "as_1",
                question: "Ability to maintain focus during Circle Time (15 mins)?",
                rubrics: {
                    1: "Wanders away from the circle or disrupts constantly.",
                    2: "Frequently disrupts, talks out of turn, or lies down.",
                    3: "Needs verbal reminders to sit still.",
                    4: "Sits quietly but occasionally daydreams.",
                    5: "Sits attentively, listens, and participates relevantly."
                }
            },
            {
                id: "as_2",
                question: "Follows multi-step verbal instructions?",
                rubrics: {
                    1: "Does the opposite of what is asked or runs away.",
                    2: "Ignores instruction or looks confused/blank.",
                    3: "Needs the instruction broken down one step at a time.",
                    4: "Completes one step, then needs a reminder for the second.",
                    5: "Follows multi-step instructions perfectly."
                }
            },
            {
                id: "as_3",
                question: "Completes specific tasks before moving on?",
                rubrics: {
                    1: "Refuses to start tasks or scatters materials immediately.",
                    2: "Rarely finishes anything; jumps between activities rapidly.",
                    3: "Frequently leaves tasks half-done to start new ones.",
                    4: "Mostly finishes, sometimes leaves if bored.",
                    5: "Always finishes the current task before moving on."
                }
            },
            {
                id: "as_4",
                question: "Engagement during story reading?",
                rubrics: {
                    1: "Runs around the room or makes loud noises.",
                    2: "Interrupts constantly or tries to leave.",
                    3: "Fidgets significantly and loses focus halfway.",
                    4: "Listens but needs to hold a fidget toy to focus.",
                    5: "Engaged, makes eye contact, and answers questions."
                }
            },
            {
                id: "as_5",
                question: "Distractibility during focused work?",
                rubrics: {
                    1: "Cannot start any task due to immediate distraction.",
                    2: "Stops working every time a door opens or someone moves.",
                    3: "Works for 2-3 minutes then looks around.",
                    4: "Needs a reminder to return to work occasionally.",
                    5: "Remains focused even with minor background noise."
                }
            }
        ]
    }
];

export const VIDYA_PULSE_DATA_6_10: AssessmentCategory[] = [
    {
        id: "academic_habits",
        title: "Academic Habits",
        questions: [
            {
                id: "ah_1",
                question: "How consistently does the child complete assigned homework and classwork?",
                rubrics: {
                    1: "Refuses to do homework entirely; tears paper, hides books, or has meltdowns.",
                    2: "Frequently leaves work incomplete; requires constant shouting or coercion.",
                    3: "Procrastinates until the last minute; produces rushed or careless work.",
                    4: "Needs reminders to start and stay focused, but eventually completes task.",
                    5: "Completes homework independently, accurately, and submits it on time."
                }
            },
            {
                id: "ah_2",
                question: "How well does the child organize their school bag, desk, and learning materials?",
                rubrics: {
                    1: "Consistently has an empty bag or loses expensive items and textbooks.",
                    2: "Bag is a disaster zone; papers are crumpled, old food is rotting.",
                    3: "Frequently forgets specific books, stationery, or permission slips.",
                    4: "Bag is messy or cluttered, but they can find what they need with effort.",
                    5: "Bag and desk are always neat; child knows exactly where every item is."
                }
            },
            {
                id: "ah_3",
                question: "How does the child respond to academic errors or constructive feedback?",
                rubrics: {
                    1: "Tears the paper, throws the book, or refuses to continue working.",
                    2: "Cries uncontrollably, shuts down completely, or calls themselves 'stupid'.",
                    3: "Gets frustrated, grumpy, or sulks, but continues working after a break.",
                    4: "Sighs heavily or erases aggressively, but eventually fixes the mistake.",
                    5: "Corrects the mistake calmly; exhibits a growth mindset ('I can fix this')."
                }
            },
            {
                id: "ah_4",
                question: "What is the quality and legibility of the child's handwriting?",
                rubrics: {
                    1: "Refuses to write; complains of painful grip or exhibits hand tremors.",
                    2: "Handwriting is illegible, struggles significantly with fine motor control.",
                    3: "Handwriting is messy, difficult to read, with poor spacing between words.",
                    4: "Handwriting is readable but has inconsistent letter sizing or spacing.",
                    5: "Handwriting is neat, legible, well-spaced, and follows the page margins."
                }
            },
            {
                id: "ah_5",
                question: "What are the child's reading habits and attitude toward reading tasks?",
                rubrics: {
                    1: "Refuses to read, throws the book or guesses every word wildly.",
                    2: "Struggles to decode simple words; avoids reading tasks at all costs.",
                    3: "Reads only when forced by an adult; lacks fluency and sounds robotic.",
                    4: "Reads required texts for school but lacks enjoyment or enthusiasm.",
                    5: "Reads for pleasure voluntarily, demonstrates good fluency and comprehension."
                }
            }
        ]
    },
    {
        id: "defiance_behavior",
        title: "Defiance & Behavior",
        questions: [
            {
                id: "db_1",
                question: "How does the child respond when a teacher or adult corrects their behavior?",
                rubrics: {
                    1: "Explodes in uncontrollable anger, shouts back, or runs away from situation.",
                    2: "Denies the behavior entirely ('I didn't do it') or blames others.",
                    3: "Argues back, tries to justify the behavior, or refuses to accept responsibility.",
                    4: "Looks sullen, rolls eyes, or stays quiet, but complies eventually.",
                    5: "Accepts the correction calmly, apologizes, and tries to improve behavior."
                }
            },
            {
                id: "db_2",
                question: "What tone of voice does the child habitually use when speaking to adults?",
                rubrics: {
                    1: "Uses abusive language, swearing, screaming, or shouting at adults.",
                    2: "Uses a rude, sarcastic, or disrespectful tone; talks back frequently.",
                    3: "Uses a whiny, complaining, or grumbling tone when asked to do tasks.",
                    4: "Uses a casual or overly informal tone, but is not intentionally rude.",
                    5: "Uses a polite, respectful, and calm tone appropriate for the situation."
                }
            },
            {
                id: "db_3",
                question: "How honest is the child regarding homework, marks, or behavioral incidents?",
                rubrics: {
                    1: "Engages in compulsive lying even when caught with clear evidence.",
                    2: "Lies frequently to avoid trouble, consequences, or embarrassment.",
                    3: "Exaggerates stories to impress others or makes up small lies to avoid work.",
                    4: "Is mostly honest, but might sugar-coat details to look better.",
                    5: "Is always trustworthy; admits mistakes and tells the truth even when hard."
                }
            },
            {
                id: "db_4",
                question: "Does the child follow classroom and household rules consistently?",
                rubrics: {
                    1: "Openly defiant; breaks rules intentionally to provoke a reaction.",
                    2: "Frequently ignores rules unless threatened with severe punishment.",
                    3: "Tests limits constantly to see what they can get away with before stopping.",
                    4: "Follows rules mostly, but needs occasional reminders or prompts.",
                    5: "Follows rules consistently without needing reminders or supervision."
                }
            },
            {
                id: "db_5",
                question: "Does the child exhibit physical aggression toward peers or property?",
                rubrics: {
                    1: "Frequently hits, kicks, bites, or destroys property when angry.",
                    2: "Pushes, shoves, or uses physical intimidation when frustrated.",
                    3: "Is verbally aggressive (shouting/threats) but not physically violent.",
                    4: "Gets too rough during play (wrestling/tag) but stops when told.",
                    5: "Keeps hands to self; resolves conflict verbally without physical contact."
                }
            }
        ]
    },
    {
        id: "digital_focus",
        title: "Digital Focus",
        questions: [
            {
                id: "df_1",
                question: "Does the child show signs of dependency or addiction to digital devices?",
                rubrics: {
                    1: "Reacts with violent outbursts or destruction if device is taken away.",
                    2: "Obsessively talks about games or videos; difficult to redirect.",
                    3: "Talks about games frequently and excitedly; prioritizes screens over play.",
                    4: "Mentions games occasionally but can switch topics and interests easily.",
                    5: "Rarely mentions screens; has active interests in sports, art, or reading."
                }
            },
            {
                id: "df_2",
                question: "What is the child's attention span during non-digital, offline activities?",
                rubrics: {
                    1: "Cannot sit still for 5 minutes without constant stimulation.",
                    2: "Is distracted constantly; needs 1-on-1 attention to complete any task.",
                    3: "Focuses for 10-15 minutes, then becomes fidgety and distracted.",
                    4: "Focuses for >20 minutes on tasks but may daydream occasionally.",
                    5: "Focuses deeply on independent tasks (Lego, drawing) for >30 minutes."
                }
            },
            {
                id: "df_3",
                question: "How does the child react when asked to stop screen time (transition)?",
                rubrics: {
                    1: "Has a full meltdown, screaming, crying, or physical aggression occurs.",
                    2: "Bargains extensively, cries, or refuses to hand over the device.",
                    3: "Becomes grumpy, irritable, or lethargic for 30 minutes after stopping.",
                    4: "Asks for '5 more minutes' or sighs, but stops using the device.",
                    5: "Turns off the device voluntarily or immediately when the time is up."
                }
            },
            {
                id: "df_4",
                question: "Is the child's sleep quality or quantity affected by digital device usage?",
                rubrics: {
                    1: "Falls asleep in class; stays up all night gaming or watching videos.",
                    2: "Looks tired/pale; admits to sneaking devices into bed at night.",
                    3: "Is hard to wake up; appears groggy and irritable in the morning.",
                    4: "Is occasionally tired but generally functions well during the day.",
                    5: "Is alert, active, and energetic; maintains good sleep hygiene."
                }
            },
            {
                id: "df_5",
                question: "What type of digital content does the child primarily consume?",
                rubrics: {
                    1: "Seeks out violent, explicit, or age-inappropriate content intentionally.",
                    2: "Watches whatever the algorithm plays next (mindless, passive consumption).",
                    3: "Watches gaming streamers or 'unboxing' videos predominantly.",
                    4: "Watches cartoons, educational shows, or games suitable for their age.",
                    5: "Uses devices for creativity (coding, art, music) or active learning."
                }
            }
        ]
    },
    {
        id: "peer_dynamics",
        title: "Peer Dynamics",
        questions: [
            {
                id: "pd_1",
                question: "How does the child interact with peers during unstructured time (recess)?",
                rubrics: {
                    1: "Bullies others, uses physical force, or is aggressively dominant.",
                    2: "Complains 'nobody likes me'; wanders alone or hides during break.",
                    3: "Drifts between groups aimlessly; often plays alone or on periphery.",
                    4: "Has 1-2 friends; plays quietly or follows others rather than leading.",
                    5: "Has a large or steady group of friends; is inclusive and social."
                }
            },
            {
                id: "pd_2",
                question: "How does the child handle disagreements or conflicts with friends?",
                rubrics: {
                    1: "Physically fights, bites, or spreads malicious rumors to hurt others.",
                    2: "Holds grudges for days; refuses to forgive or apologize.",
                    3: "Tattles constantly to adults on small, insignificant issues.",
                    4: "Argues with friends but resolves the issue with some adult help.",
                    5: "Resolves issues independently using words and moves on quickly."
                }
            },
            {
                id: "pd_3",
                question: "What role does the child typically take during collaborative group work?",
                rubrics: {
                    1: "Sabotages the group's effort or refuses to participate entirely.",
                    2: "Bosses everyone around, ignores ideas, and refuses to listen.",
                    3: "Withdraws completely and lets others do all the work.",
                    4: "Participates in the group but prefers to follow instructions.",
                    5: "Leads effectively, listens to others, and cooperates willingly."
                }
            },
            {
                id: "pd_4",
                question: "How does the child react to teasing or negative social interactions?",
                rubrics: {
                    1: "Reacts with extreme rage, physical violence, or screaming.",
                    2: "Cries immediately, withdraws, and wants to go home.",
                    3: "Gets angry, shouts back, or tries to retaliate verbally.",
                    4: "Ignores the teasing but looks visibly upset or hurt.",
                    5: "Brushes it off confidently, uses humor, or ignores it effectively."
                }
            },
            {
                id: "pd_5",
                question: "Does the child demonstrate empathy and understanding of others' feelings?",
                rubrics: {
                    1: "Encourages others to bully peers or laughs when someone is in pain.",
                    2: "Is indifferent or ignores peers who are upset or crying.",
                    3: "Seems confused by others' emotions or doesn't know how to react.",
                    4: "Is kind and well-meaning but needs prompting to offer help.",
                    5: "Notices others' feelings naturally and offers help or comfort."
                }
            }
        ]
    },
    {
        id: "self_esteem",
        title: "Self-Esteem",
        questions: [
            {
                id: "se_1",
                question: "How willing is the child to attempt new or challenging tasks?",
                rubrics: {
                    1: "Refuses due to paralyzing fear; says 'I can't' before even looking.",
                    2: "Tries only if guaranteed to succeed; avoids any risk of failure.",
                    3: "Is hesitant; needs significant coaxing and reassurance to start.",
                    4: "Is nervous or cautious but tries with some encouragement.",
                    5: "Is eager to try; demonstrates an 'I can do this!' attitude."
                }
            },
            {
                id: "se_2",
                question: "How does the child receive and react to praise or compliments?",
                rubrics: {
                    1: "Gets angry, destroys the work being praised, or suspects sarcasm.",
                    2: "Denies the praise ('No I'm not', 'It's ugly') or looks suspicious.",
                    3: "Doesn't seem to care; reaction is neutral or indifferent.",
                    4: "Smiles shyly or modestly; accepts praise quietly.",
                    5: "Beams, smiles broadly, and genuinely feels proud of themselves."
                }
            },
            {
                id: "se_3",
                question: "What does the child's general body language and posture communicate?",
                rubrics: {
                    1: "Hides under a hood or desk; refuses to make any eye contact.",
                    2: "Has slumped shoulders, head down; avoids eye contact consistently.",
                    3: "Is fidgety, bites nails, or holds a nervous/tense posture.",
                    4: "Is relaxed generally, though may be shy in new situations.",
                    5: "Holds head up, makes good eye contact, and has an open posture."
                }
            },
            {
                id: "se_4",
                question: "What kind of language does the child use when describing themselves?",
                rubrics: {
                    1: "Says disturbing things like 'I hate myself' or 'I want to die'.",
                    2: "Says negative things like 'I am stupid', 'I am the worst', or 'I am ugly'.",
                    3: "Says 'I'm not good at this' or 'I always mess up'.",
                    4: "Occasionally doubts self but generally speaks neutrally.",
                    5: "Speaks positively about their abilities and personality."
                }
            },
            {
                id: "se_5",
                question: "How independent is the child in managing daily tasks appropriate for their age?",
                rubrics: {
                    1: "Needs an adult present to do almost anything (learned helplessness).",
                    2: "Is clingy; asks for help immediately before trying to solve the problem.",
                    3: "Tries briefly for a few seconds, then gives up and asks for help.",
                    4: "Is independent in familiar tasks but needs help with new ones.",
                    5: "Takes initiative, manages own belongings, and solves problems alone."
                }
            }
        ]
    }
];

export const VIDYA_PULSE_DATA_11_16: AssessmentCategory[] = [
    {
        id: "academic_pressure",
        title: "Academic Pressure",
        questions: [
            {
                id: "ap_1",
                question: "How does the student react to grades, exams, and high-stakes academic pressure?",
                rubrics: {
                    1: "Suffers panic attacks, physical vomiting, or threatens self-harm due to stress.",
                    2: "Experiences crying spells, loss of appetite, or extreme insomnia before exams.",
                    3: "Shows high anxiety, visible stress, and engages in negative self-talk.",
                    4: "Is nervous or worried but manages the stress with reassurance.",
                    5: "Shows healthy concern; focuses on preparation and effort rather than worry."
                }
            },
            {
                id: "ap_2",
                question: "Does the student show signs of academic burnout or apathy toward schoolwork?",
                rubrics: {
                    1: "Displays complete apathy; refuses to attend school, get out of bed, or work.",
                    2: "Procrastinates severely leading to missed deadlines, then lies to cover it up.",
                    3: "Works constantly with no breaks to the point of exhaustion (overworking).",
                    4: "Procrastinates occasionally but manages to submit work at the last minute.",
                    5: "Balances a rigorous study schedule with necessary breaks effectively."
                }
            },
            {
                id: "ap_3",
                question: "How does the student handle academic integrity (cheating, plagiarism, AI)?",
                rubrics: {
                    1: "Buys papers online, uses AI to write entire essays, or cheats openly on exams.",
                    2: "Copies homework frequently from peers or smuggles notes into tests.",
                    3: "Asks to see others' work 'for reference' but borders on copying.",
                    4: "Is tempted to take shortcuts but ultimately does their own work.",
                    5: "Values integrity highly; accepts a lower grade rather than cheating."
                }
            },
            {
                id: "ap_4",
                question: "What is the student's outlook on their future career and life path?",
                rubrics: {
                    1: "Says 'There is no point,' 'I am a failure,' or expresses total hopelessness.",
                    2: "Is obsessed with one specific path; believes 'If I fail this, my life is over'.",
                    3: "Is highly anxious and paralyzed by college or career choices.",
                    4: "Is unsure about the future but is open to exploring different options.",
                    5: "Is excited and optimistic about future possibilities and paths."
                }
            },
            {
                id: "ap_5",
                question: "How well does the student balance sleep, rest, and study time?",
                rubrics: {
                    1: "Pulls 'all-nighters' regularly to study/game; falls asleep in class.",
                    2: "Sleeps less than 5 hours; relies heavily on caffeine or energy drinks.",
                    3: "Has irregular sleep patterns; frequently sacrifices sleep to finish studying.",
                    4: "Is tired during exam weeks but usually gets enough rest.",
                    5: "Prioritizes 8 hours of sleep; studies effectively during waking hours."
                }
            }
        ]
    },
    {
        id: "cyber_safety",
        title: "Cyber-Safety",
        questions: [
            {
                id: "cs_1",
                question: "How much does the student rely on social media validation for self-worth?",
                rubrics: {
                    1: "Becomes depressed, angry, or suicidal if a post receives low likes.",
                    2: "Deletes posts immediately if not popular; obsessed with a perfect image.",
                    3: "Checks likes constantly; mood is visibly affected by negative feedback.",
                    4: "Enjoys likes and engagement but doesn't define their worth by them.",
                    5: "Uses social media for genuine connection, not for validation or numbers."
                }
            },
            {
                id: "cs_2",
                question: "What is the student's involvement in cyberbullying or online harassment?",
                rubrics: {
                    1: "Is a known perpetrator of harassment or a victim of severe threats.",
                    2: "Joins in 'roasting,' excluding, or mocking others in group chats/online.",
                    3: "Has witnessed bullying online but remained silent and did nothing.",
                    4: "Reports bullying to an adult or platform if they see it happening.",
                    5: "Is an 'Upstander', actively defends others and promotes positivity online."
                }
            },
            {
                id: "cs_3",
                question: "How effectively does the student manage online privacy and personal data?",
                rubrics: {
                    1: "Has completely public profiles; shares live location and personal data.",
                    2: "Accepts all friend requests indiscriminately to boost follower numbers.",
                    3: "Has a private account but adds 'friends of friends' they don't actually know.",
                    4: "Has a private account and is generally careful with personal info.",
                    5: "Maintains strict privacy settings; only adds people they know in real life."
                }
            },
            {
                id: "cs_4",
                question: "How dependant is the student on their smartphone during daily life?",
                rubrics: {
                    1: "Becomes aggressive, violent, or destructive if phone is removed.",
                    2: "Experiences panic or extreme anxiety if the phone is not physically in hand.",
                    3: "Checks phone every few minutes even during face-to-face conversations.",
                    4: "Checks phone frequently when bored or during downtime.",
                    5: "Can leave the phone away for hours without stress; is present in the moment."
                }
            },
            {
                id: "cs_5",
                question: "What is the nature of the student's online relationships?",
                rubrics: {
                    1: "Meets strangers from the internet offline; sends explicit images (sexting).",
                    2: "'Dates' people they have never met; emotionally dependent on online strangers.",
                    3: "Chats frequently with strangers in open gaming lobbies or forums.",
                    4: "Only chats or games with people they know from school or real life.",
                    5: "Maintains a healthy balance of online communication and offline social life."
                }
            }
        ]
    },
    {
        id: "risk_taking",
        title: "Risk-Taking",
        questions: [
            {
                id: "rt_1",
                question: "Is there evidence or suspicion of substance use (drugs, alcohol, vaping)?",
                rubrics: {
                    1: "Uses drugs/alcohol regularly; hides paraphernalia; attends school intoxicated.",
                    2: "Is experimenting with vaping or alcohol at parties/social gatherings.",
                    3: "Is curious; asks friends about substances or shows interest in trying.",
                    4: "Avoids situations or parties where drugs/alcohol are present.",
                    5: "Is strongly anti-drug; influences friends positively to stay healthy."
                }
            },
            {
                id: "rt_2",
                question: "Does the student change their personality or values to fit in with a group?",
                rubrics: {
                    1: "Changes personality, dress, and values completely to match a negative crowd.",
                    2: "Does things they dislike or disagree with just to please the group.",
                    3: "Stays silent when the group does something wrong or risky.",
                    4: "Politely declines risky activities but remains in the group.",
                    5: "Confidently stands up for their own values against pear pressure."
                }
            },
            {
                id: "rt_3",
                question: "Does the student engage in reckless or dangerous behavior?",
                rubrics: {
                    1: "Engages in criminal acts, dangerous driving, theft, or physical fighting.",
                    2: "Skips school, participates in minor vandalism, or lies about location.",
                    3: "Accepts 'dares' or engages in mild risk-taking to impress others.",
                    4: "Is cautious; thinks before acting but may make minor errors.",
                    5: "Is responsible; assesses risk with maturity before acting."
                }
            },
            {
                id: "rt_4",
                question: "What kind of influence does the student's primary friend group have?",
                rubrics: {
                    1: "Friends are known delinquents, involved in gangs, or suspended students.",
                    2: "Friends encourage rule-breaking, disrespect, or risky behavior.",
                    3: "Friends are neutral; they have no strong positive or negative influence.",
                    4: "Friends are generally good kids who follow school rules.",
                    5: "Friends are high-achievers and form a positive support system."
                }
            },
            {
                id: "rt_5",
                question: "How open is the student with parents regarding their social circle?",
                rubrics: {
                    1: "Is secretive; parents do not know who friends are or where they hang out.",
                    2: "Lies about who they are hanging out with to hide their activities.",
                    3: "Gives vague answers like 'Just some guys' or 'You don't know them'.",
                    4: "Mentions names of friends but doesn't share details of activities.",
                    5: "Openly talks about friends, brings them home, and shares plans."
                }
            }
        ]
    },
    {
        id: "mental_health",
        title: "Mental Health",
        questions: [
            {
                id: "mh_1",
                question: "How stable is the student's mood and emotional regulation day-to-day?",
                rubrics: {
                    1: "Exhibits rapid cycling (manic to depressed); engages in self-harm.",
                    2: "Withdraws completely; stays in room for days; appears emotionally numb.",
                    3: "Is moody, irritable, and snaps at family members frequently.",
                    4: "Shows occasional 'teen angst', grumpiness, or moodiness.",
                    5: "Is generally stable; handles stress and disappointment well."
                }
            },
            {
                id: "mh_2",
                question: "What mechanisms does the student use to cope with stress or sadness?",
                rubrics: {
                    1: "Uses self-harm (cutting), starvation, or substance abuse to cope.",
                    2: "Isolates self, sleeps all day to escape, or over-eats significantly.",
                    3: "Uses distraction (gaming/TV) excessively to avoid feeling emotions.",
                    4: "Talks to friends, listens to music, or sleeps to reset.",
                    5: "Talks to adults, journals, exercises, or practices mindfulness."
                }
            },
            {
                id: "mh_3",
                question: "How does the student perceive their physical appearance and body image?",
                rubrics: {
                    1: "Shows symptoms of eating disorders; expresses hatred of body.",
                    2: "Is obsessed with filtering photos, extreme dieting, or appearance.",
                    3: "Is self-conscious about appearance; seeks constant reassurance.",
                    4: "Has normal teen insecurities (e.g., about acne or clothes).",
                    5: "Is confident and accepting of their body and appearance."
                }
            },
            {
                id: "mh_4",
                question: "Does the student exhibit physical or behavioral signs of severe anxiety?",
                rubrics: {
                    1: "Suffers panic attacks; refuses to leave the house or enter school.",
                    2: "Has physical symptoms (headaches/stomach aches) before social events.",
                    3: "Bites nails, fidgets constantly, or overthinks social interactions.",
                    4: "Is nervous before big events (exams) but copes.",
                    5: "Is calm, composed, and manages nervousness effectively."
                }
            },
            {
                id: "mh_5",
                question: "How willing is the student to ask for help when emotionally overwhelmed?",
                rubrics: {
                    1: "Hides struggles aggressively until reaching a crisis point (suicide attempt).",
                    2: "Hints at problems or posts vaguely online but refuses professional help.",
                    3: "Tells friends about problems but swears them to secrecy.",
                    4: "Will talk about feelings if asked directly by a trusted adult.",
                    5: "Proactively seeks support from parents or counselors when overwhelmed."
                }
            }
        ]
    },
    {
        id: "defiance",
        title: "Defiance",
        questions: [
            {
                id: "def_1",
                question: "How does the student respond to school rules, laws, and boundaries?",
                rubrics: {
                    1: "Runs away, engages in criminal activity, or is in total rebellion.",
                    2: "Sneaks out at night; habitually breaks curfew and house rules.",
                    3: "Argues about every rule; negotiates constantly to wear parents down.",
                    4: "Rolls eyes or complains but ultimately follows the rules.",
                    5: "Respects boundaries; negotiates rules respectfully and logically."
                }
            },
            {
                id: "def_2",
                question: "How does the student communicate with parents or guardians at home?",
                rubrics: {
                    1: "Engages in complete stonewalling; refuses to speak to parents at all.",
                    2: "Only speaks to parents to argue, shout, or demand money.",
                    3: "Gives one-word answers ('Fine', 'Okay') to attempts at connection.",
                    4: "Chats occasionally about interests but prefers privacy.",
                    5: "Maintains open, honest, and frequent communication with parents."
                }
            },
            {
                id: "def_3",
                question: "Is the student secretive or deceptive about their life (double life)?",
                rubrics: {
                    1: "Has a secret phone or social media accounts; lives a complete double life.",
                    2: "Lies consistently about location, spending, and activities.",
                    3: "Omits details intentionally; acts 'forgetful' to avoid telling the full truth.",
                    4: "Is private about text messages but honest about location/plans.",
                    5: "Is transparent; feels they have nothing to hide from parents."
                }
            },
            {
                id: "def_4",
                question: "What is the student's attitude and behavior toward teachers and staff?",
                rubrics: {
                    1: "Has been suspended or expelled for disrespect or aggression toward staff.",
                    2: "Is rude, disruptive, or sleeps in class intentionally to show defiance.",
                    3: "Is disengaged; ignores teachers or does the bare minimum.",
                    4: "Is polite but passive; doesn't actively engage.",
                    5: "Is respectful, engaged, helpful, and viewed positively by staff."
                }
            },
            {
                id: "def_5",
                question: "Does the student take responsibility for their own actions and mistakes?",
                rubrics: {
                    1: "Blames everyone else (parents/teachers) for all problems (Victim mentality).",
                    2: "Makes excuses constantly; takes minimal accountability for errors.",
                    3: "Admits fault only when cornered with irrefutable evidence.",
                    4: "Admits mistakes but may sulk or be grumpy about the consequence.",
                    5: "Takes full ownership of actions and accepts consequences maturely."
                }
            }
        ]
    }
];

export const getAssessmentData = (ageGroup?: string) => {
    switch (ageGroup) {
        case "6-10":
            return VIDYA_PULSE_DATA_6_10;
        case "11-16":
            return VIDYA_PULSE_DATA_11_16;
        case "3-6":
        default:
            return VIDYA_PULSE_DATA_3_6;
    }
};

export const VIDYA_PULSE_DATA = VIDYA_PULSE_DATA_3_6; // Fallback export for backward compatibility if needed
