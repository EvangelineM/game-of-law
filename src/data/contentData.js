// Age-appropriate content modules based on Indian Constitution
export const contentModules = {
  child: { // Ages 8-12
    modules: [
      {
        id: 'my-constitution-book',
        title: 'My Constitution Book',
        description: 'Learn about the big rule book that helps everyone in India',
        icon: '�',
        color: 'bg-blue-100',
        level: 1,
        lessons: [
          {
            id: 'what-is-constitution',
            title: 'What is the Constitution?',
            content: 'The Constitution is like a big rule book for our whole country! It tells everyone - from kids to grown-ups to the government - how to be fair and kind to each other.',
            type: 'story',
            duration: 5,
            xp: 10
          },
          {
            id: 'preamble-for-kids',
            title: 'Our Promise to Each Other',
            content: 'Long ago, smart people wrote a special promise. They said "We, the People of India" promise to be fair, equal, and help each other. This promise is called the Preamble!',
            type: 'interactive',
            duration: 7,
            xp: 15
          }
        ]
      },
      {
        id: 'my-rights-as-child',
        title: 'My Special Rights',
        description: 'Every child in India has special protections and rights',
        icon: '🛡️',
        color: 'bg-green-100',
        level: 1,
        lessons: [
          {
            id: 'right-to-be-treated-equally',
            title: 'Everyone is Equal',
            content: 'No one should treat you badly because of your name, where you come from, or what you look like. Everyone deserves to be treated with kindness!',
            type: 'story',
            duration: 6,
            xp: 12
          },
          {
            id: 'right-to-education',
            title: 'Right to Learn',
            content: 'Every child has the right to go to school and learn new things. Article 21A says the government must help you get education for free!',
            type: 'interactive',
            duration: 8,
            xp: 16
          },
          {
            id: 'protection-from-harm',
            title: 'Safe from Bad Work',
            content: 'Children should play and learn, not work in dangerous places. Article 24 says children under 14 cannot work in factories or dangerous jobs.',
            type: 'story',
            duration: 6,
            xp: 12
          }
        ]
      },
      {
        id: 'our-country-promises',
        title: 'Our Country\'s Promises',
        description: 'Learn about the special promises India made to all its people',
        icon: '🇮🇳',
        color: 'bg-orange-100',
        level: 2,
        lessons: [
          {
            id: 'unity-in-diversity',
            title: 'Different but Together',
            content: 'India has people who speak different languages, follow different religions, and have different traditions. But we all live together as one big family!',
            type: 'interactive',
            duration: 10,
            xp: 20
          }
        ]
      }
    ]
  },
  teen: { // Ages 13-17
    modules: [
      {
        id: 'constitution-foundation',
        title: 'Constitution Foundation',
        description: 'Understanding the backbone of Indian democracy',
        icon: '📜',
        color: 'bg-amber-100',
        level: 1,
        lessons: [
          {
            id: 'preamble-deep-dive',
            title: 'The Preamble: Our National Promise',
            content: 'The Preamble begins with "We, the People of India" and declares India as Sovereign, Socialist, Secular, Democratic Republic. It was amended in 1976 to add "Socialist" and "Secular".',
            type: 'reading',
            duration: 12,
            xp: 25
          },
          {
            id: 'making-of-constitution',
            title: 'How Our Constitution Was Made',
            content: 'Around 300 people in the Constituent Assembly worked for 3 years (1946-1949) to write our Constitution. It was adopted on November 26, 1949, and came into effect on January 26, 1950.',
            type: 'interactive',
            duration: 15,
            xp: 30
          },
          {
            id: 'key-features',
            title: 'Key Features of Our Constitution',
            content: 'Federal structure, Parliamentary government, Independent judiciary, Fundamental Rights, Directive Principles, and Universal Adult Suffrage make our Constitution unique.',
            type: 'reading',
            duration: 18,
            xp: 35
          }
        ]
      },
      {
        id: 'fundamental-rights-detailed',
        title: 'Fundamental Rights',
        description: 'Your rights as an Indian citizen',
        icon: '⚖️',
        color: 'bg-blue-100',
        level: 1,
        lessons: [
          {
            id: 'right-to-equality',
            title: 'Right to Equality (Articles 14-18)',
            content: 'Article 14 ensures equality before law. Article 15 prohibits discrimination based on religion, race, caste, sex, or place of birth. Article 17 abolishes untouchability.',
            type: 'reading',
            duration: 15,
            xp: 30
          },
          {
            id: 'right-to-freedom',
            title: 'Right to Freedom (Articles 19-22)',
            content: 'Six freedoms including speech, assembly, movement, residence, and profession. Article 21 protects life and personal liberty with due process.',
            type: 'interactive',
            duration: 20,
            xp: 40
          },
          {
            id: 'other-rights',
            title: 'Rights Against Exploitation & Religious Freedom',
            content: 'Articles 23-24 prohibit human trafficking and child labor. Articles 25-28 ensure freedom of religion and conscience.',
            type: 'reading',
            duration: 12,
            xp: 25
          },
          {
            id: 'constitutional-remedies',
            title: 'Right to Constitutional Remedies (Article 32)',
            content: 'Dr. Ambedkar called it the "heart and soul" of the Constitution. Courts can issue writs: Habeas Corpus, Mandamus, Certiorari, Prohibition, and Quo-Warranto.',
            type: 'case-study',
            duration: 25,
            xp: 50
          }
        ]
      },
      {
        id: 'government-structure',
        title: 'How Our Government Works',
        description: 'Federal structure and separation of powers',
        icon: '🏛️',
        color: 'bg-green-100',
        level: 2,
        lessons: [
          {
            id: 'federalism-explained',
            title: 'Federal Structure',
            content: 'Three lists: Union List (99 subjects like defense), State List (66 subjects like police), and Concurrent List (52 subjects like education).',
            type: 'interactive',
            duration: 18,
            xp: 35
          },
          {
            id: 'separation-of-powers',
            title: 'Three Organs of State',
            content: 'Legislature (makes laws), Executive (implements laws), and Judiciary (interprets laws). This separation prevents misuse of power.',
            type: 'reading',
            duration: 15,
            xp: 30
          }
        ]
      },
      {
        id: 'dpsp-and-duties',
        title: 'Directive Principles & Fundamental Duties',
        description: 'Guidelines for government and citizens',
        icon: '📋',
        color: 'bg-purple-100',
        level: 2,
        lessons: [
          {
            id: 'directive-principles',
            title: 'Directive Principles of State Policy',
            content: 'Non-justiciable guidelines for government to ensure social and economic welfare. They aim to establish a welfare state.',
            type: 'reading',
            duration: 12,
            xp: 25
          },
          {
            id: 'fundamental-duties',
            title: 'Fundamental Duties',
            content: 'Added by 42nd Amendment (1976). Citizens\' duties include respecting the Constitution, national flag, and promoting harmony.',
            type: 'interactive',
            duration: 10,
            xp: 20
          }
        ]
      }
    ]
  },
  adult: { // Ages 18+
    modules: [
      {
        id: 'constitutional-interpretation',
        title: 'Constitutional Interpretation & Amendments',
        description: 'Advanced concepts in constitutional law',
        icon: '🏛️',
        color: 'bg-red-100',
        level: 1,
        lessons: [
          {
            id: 'basic-structure-doctrine',
            title: 'Basic Structure Doctrine',
            content: 'Kesavananda Bharati case (1973) established that certain features of the Constitution form its "basic structure" and cannot be amended. The Preamble is part of this basic structure.',
            type: 'case-study',
            duration: 25,
            xp: 50
          },
          {
            id: 'judicial-review-evolution',
            title: 'Evolution of Judicial Review',
            content: 'From Golaknath to Kesavananda Bharati to Minerva Mills - how judicial review evolved. Articles 31A, 31B, and 31C and their constitutional validity.',
            type: 'case-study',
            duration: 30,
            xp: 60
          },
          {
            id: 'significant-amendments',
            title: 'Major Constitutional Amendments',
            content: '42nd Amendment (Mini Constitution), 44th Amendment (removed Right to Property), 73rd & 74th (Panchayati Raj), 101st (GST), 103rd (EWS reservation).',
            type: 'reading',
            duration: 20,
            xp: 40
          }
        ]
      },
      {
        id: 'fundamental-rights-jurisprudence',
        title: 'Fundamental Rights Jurisprudence',
        description: 'Advanced understanding of constitutional rights',
        icon: '⚖️',
        color: 'bg-blue-100',
        level: 1,
        lessons: [
          {
            id: 'article-21-expansion',
            title: 'Expansion of Article 21',
            content: 'From Gopalan to Maneka Gandhi - how Article 21 expanded to include due process, right to privacy, education, health, and livelihood.',
            type: 'case-study',
            duration: 25,
            xp: 50
          },
          {
            id: 'writs-in-detail',
            title: 'Writ Jurisdiction Deep Dive',
            content: 'Detailed analysis of all five writs: Habeas Corpus, Mandamus, Certiorari, Prohibition, and Quo-Warranto with landmark cases.',
            type: 'case-study',
            duration: 30,
            xp: 60
          },
          {
            id: 'reasonable-restrictions',
            title: 'Reasonable Restrictions Doctrine',
            content: 'Article 19 freedoms and their reasonable restrictions. Balancing individual liberty with public order, morality, and security.',
            type: 'reading',
            duration: 20,
            xp: 40
          }
        ]
      },
      {
        id: 'constitutional-framework',
        title: 'Constitutional Framework & Governance',
        description: 'Federal structure and institutional mechanisms',
        icon: '🏢',
        color: 'bg-green-100',
        level: 2,
        lessons: [
          {
            id: 'centre-state-relations',
            title: 'Centre-State Relations',
            content: 'Union, State, and Concurrent Lists. Article 356 (President\'s Rule), Inter-state disputes, and cooperative federalism.',
            type: 'reading',
            duration: 22,
            xp: 45
          },
          {
            id: 'emergency-provisions',
            title: 'Emergency Provisions',
            content: 'National Emergency (Article 352), President\'s Rule (Article 356), and Financial Emergency (Article 360). Safeguards and judicial review.',
            type: 'case-study',
            duration: 25,
            xp: 50
          },
          {
            id: 'constitutional-bodies',
            title: 'Constitutional Bodies',
            content: 'Election Commission, CAG, UPSC, and other constitutional bodies. Their independence and role in governance.',
            type: 'reading',
            duration: 18,
            xp: 35
          }
        ]
      },
      {
        id: 'contemporary-issues',
        title: 'Contemporary Constitutional Issues',
        description: 'Modern challenges and constitutional responses',
        icon: '🔍',
        color: 'bg-purple-100',
        level: 3,
        lessons: [
          {
            id: 'digital-rights',
            title: 'Digital Rights and Privacy',
            content: 'Right to Privacy as fundamental right (Puttaswamy case), data protection, and digital governance challenges.',
            type: 'case-study',
            duration: 20,
            xp: 40
          },
          {
            id: 'environmental-jurisprudence',
            title: 'Environmental Constitutionalism',
            content: 'Article 21 and environmental protection, Article 48A and 51A(g), sustainable development as constitutional principle.',
            type: 'reading',
            duration: 18,
            xp: 35
          }
        ]
      }
    ]
  }
};

// Game difficulty configurations
export const difficultyLevels = {
  easy: {
    timeLimit: 60, // seconds per question
    hintsAllowed: 3,
    skipAllowed: 2,
    xpMultiplier: 1
  },
  medium: {
    timeLimit: 45,
    hintsAllowed: 2,
    skipAllowed: 1,
    xpMultiplier: 1.2
  },
  hard: {
    timeLimit: 30,
    hintsAllowed: 1,
    skipAllowed: 0,
    xpMultiplier: 1.5
  }
};

// Achievements system
export const achievements = [
  {
    id: 'first-quiz',
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🌟',
    xp: 50
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: '💯',
    xp: 100
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Complete 5 modules',
    icon: '📚',
    xp: 150
  },
  {
    id: 'law-master',
    title: 'Law Master',
    description: 'Reach level 10',
    icon: '👑',
    xp: 500
  },
  {
    id: 'streak-master',
    title: 'Consistency King',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    xp: 200
  }
];

// Extended question database with age-appropriate categorization
export const questionDatabase = {
  child: [
    {
      question: "What is the Constitution of India?",
      options: ["A story book", "The rule book for our country", "A math book", "A recipe book"],
      correct: 1,
      category: "constitution-basics",
      difficulty: "easy",
      explanation: "The Constitution is like a big rule book that tells everyone in India how to be fair and kind!",
      xp: 10
    },
    {
      question: "The promise that starts with 'We, the People of India' is called:",
      options: ["The Story", "The Preamble", "The Song", "The Game"],
      correct: 1,
      category: "preamble",
      difficulty: "easy",
      explanation: "The Preamble is our special promise to be fair, equal, and help each other!",
      xp: 10
    },
    {
      question: "Every child has the right to go to school. This is called:",
      options: ["Right to play", "Right to education", "Right to food", "Right to sleep"],
      correct: 1,
      category: "fundamental-rights",
      difficulty: "easy",
      explanation: "Article 21A says every child can go to school for free!",
      xp: 10
    },
    {
      question: "Children under 14 years should NOT work in:",
      options: ["School projects", "Art class", "Dangerous factories", "Sports"],
      correct: 2,
      category: "child-protection",
      difficulty: "easy",
      explanation: "Article 24 protects children from dangerous work. Children should play and learn!",
      xp: 10
    },
    {
      question: "What does 'Everyone is equal' mean?",
      options: ["Only rich people matter", "All people should be treated fairly", "Only adults matter", "Only boys matter"],
      correct: 1,
      category: "equality",
      difficulty: "easy",
      explanation: "The Constitution says everyone deserves to be treated with kindness, no matter who they are!",
      xp: 10
    },
    {
      question: "India has people with different languages and religions. This is called:",
      options: ["Problems", "Unity in Diversity", "Confusion", "Trouble"],
      correct: 1,
      category: "diversity",
      difficulty: "easy",
      explanation: "Unity in Diversity means we are different but live together as one big family!",
      xp: 10
    }
  ],
  teen: [
    {
      question: "The Preamble of the Indian Constitution begins with which words?",
      options: ["We, the Government of India", "We, the People of India", "We, the Leaders of India", "We, the States of India"],
      correct: 1,
      category: "preamble",
      difficulty: "medium",
      explanation: "The Preamble begins with 'We, the People of India' showing that power comes from the people.",
      xp: 20
    },
    {
      question: "Which words were added to the Preamble by the 42nd Amendment in 1976?",
      options: ["Democratic and Republic", "Socialist and Secular", "Sovereign and Democratic", "Justice and Liberty"],
      correct: 1,
      category: "amendments",
      difficulty: "medium",
      explanation: "The 42nd Amendment added 'Socialist' and 'Secular' to the Preamble during the Emergency.",
      xp: 20
    },
    {
      question: "Which article guarantees the Right to Equality?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      correct: 0,
      category: "fundamental-rights",
      difficulty: "medium",
      explanation: "Article 14 ensures equality before law and equal protection of laws for all persons.",
      xp: 20
    },
    {
      question: "How many fundamental rights are currently guaranteed by the Constitution?",
      options: ["5", "6", "7", "8"],
      correct: 1,
      category: "fundamental-rights",
      difficulty: "medium",
      explanation: "There are 6 fundamental rights after the Right to Property was removed in 1978.",
      xp: 20
    },
    {
      question: "Article 21 protects the right to:",
      options: ["Education only", "Life and Personal Liberty", "Property", "Work"],
      correct: 1,
      category: "fundamental-rights",
      difficulty: "medium",
      explanation: "Article 21 is the most important right protecting life and personal liberty with due process.",
      xp: 20
    },
    {
      question: "Dr. B.R. Ambedkar called which article the 'heart and soul' of the Constitution?",
      options: ["Article 14", "Article 21", "Article 32", "Article 356"],
      correct: 2,
      category: "constitutional-remedies",
      difficulty: "medium",
      explanation: "Article 32 (Right to Constitutional Remedies) allows citizens to approach courts directly.",
      xp: 20
    },
    {
      question: "The Union List contains how many subjects?",
      options: ["66", "99", "52", "89"],
      correct: 1,
      category: "federalism",
      difficulty: "medium",
      explanation: "The Union List has 99 subjects including defense, foreign affairs, and banking.",
      xp: 20
    },
    {
      question: "Which list includes subjects like police and local government?",
      options: ["Union List", "State List", "Concurrent List", "Residuary List"],
      correct: 1,
      category: "federalism",
      difficulty: "medium",
      explanation: "The State List (66 subjects) includes police, local government, and agriculture.",
      xp: 20
    },
    {
      question: "The writ that means 'to have the body' is:",
      options: ["Mandamus", "Certiorari", "Habeas Corpus", "Quo-Warranto"],
      correct: 2,
      category: "writs",
      difficulty: "medium",
      explanation: "Habeas Corpus protects against illegal detention by requiring the person to be produced in court.",
      xp: 20
    },
    {
      question: "Fundamental Duties were added by which amendment?",
      options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"],
      correct: 0,
      category: "amendments",
      difficulty: "medium",
      explanation: "The 42nd Amendment (1976) added Fundamental Duties to the Constitution.",
      xp: 20
    },
    {
      question: "Article 17 abolishes:",
      options: ["Child labor", "Untouchability", "Discrimination", "Titles"],
      correct: 1,
      category: "equality",
      difficulty: "medium",
      explanation: "Article 17 completely abolishes untouchability and makes its practice a punishable offense.",
      xp: 20
    },
    {
      question: "The Constitution came into effect on:",
      options: ["August 15, 1947", "January 26, 1950", "November 26, 1949", "December 31, 1949"],
      correct: 1,
      category: "history",
      difficulty: "medium",
      explanation: "The Constitution came into effect on January 26, 1950, which we celebrate as Republic Day.",
      xp: 20
    }
  ],
  adult: [
    {
      question: "The Basic Structure Doctrine was established in which landmark case?",
      options: ["Golaknath v. State of Punjab", "Kesavananda Bharati v. State of Kerala", "Minerva Mills v. Union of India", "Maneka Gandhi v. Union of India"],
      correct: 1,
      category: "constitutional-interpretation",
      difficulty: "hard",
      explanation: "Kesavananda Bharati (1973) established that certain features form the Constitution's 'basic structure' and cannot be amended.",
      xp: 30
    },
    {
      question: "In which case did the Supreme Court expand Article 21 to include due process?",
      options: ["A.K. Gopalan case", "Maneka Gandhi case", "Minerva Mills case", "Kesavananda Bharati case"],
      correct: 1,
      category: "fundamental-rights-jurisprudence",
      difficulty: "hard",
      explanation: "Maneka Gandhi v. Union of India (1978) expanded Article 21 from mere procedure to due process of law.",
      xp: 30
    },
    {
      question: "Article 31A provides protection to laws related to:",
      options: ["Emergency provisions", "Fundamental Duties", "Acquisition of estates and property", "Directive Principles"],
      correct: 2,
      category: "constitutional-exceptions",
      difficulty: "hard",
      explanation: "Article 31A protects laws related to acquisition of estates from being challenged on grounds of Articles 14 and 19.",
      xp: 30
    },
    {
      question: "The 9th Schedule was introduced by which amendment?",
      options: ["1st Amendment", "4th Amendment", "25th Amendment", "42nd Amendment"],
      correct: 0,
      category: "amendments",
      difficulty: "hard",
      explanation: "The 9th Schedule was introduced by the 1st Amendment (1951) to protect certain laws from judicial review.",
      xp: 30
    },
    {
      question: "Which article defines 'State' for the purpose of Fundamental Rights?",
      options: ["Article 11", "Article 12", "Article 13", "Article 14"],
      correct: 1,
      category: "fundamental-rights-jurisprudence",
      difficulty: "hard",
      explanation: "Article 12 defines 'State' to include government, parliament, legislatures, local authorities, and other statutory bodies.",
      xp: 30
    },
    {
      question: "The doctrine of 'Colorable Legislation' is related to:",
      options: ["Fundamental Rights", "Federal structure", "Judicial Review", "Emergency provisions"],
      correct: 1,
      category: "constitutional-interpretation",
      difficulty: "hard",
      explanation: "Colorable Legislation doctrine prevents legislatures from indirectly doing what they cannot do directly under federal structure.",
      xp: 30
    },
    {
      question: "Right to Privacy was declared a fundamental right in which case?",
      options: ["Maneka Gandhi case", "Vishaka case", "Justice K.S. Puttaswamy case", "Shreya Singhal case"],
      correct: 2,
      category: "contemporary-issues",
      difficulty: "hard",
      explanation: "Justice K.S. Puttaswamy v. Union of India (2017) declared Right to Privacy as a fundamental right under Article 21.",
      xp: 30
    },
    {
      question: "Article 356 (President's Rule) can be imposed for a maximum period of:",
      options: ["6 months", "1 year", "3 years", "Indefinitely"],
      correct: 2,
      category: "emergency-provisions",
      difficulty: "hard",
      explanation: "President's Rule can be imposed for 3 years maximum, but requires parliamentary approval every 6 months.",
      xp: 30
    },
    {
      question: "The 'Creamy Layer' concept is related to:",
      options: ["SC/ST reservation", "OBC reservation", "EWS reservation", "Women's reservation"],
      correct: 1,
      category: "equality-jurisprudence",
      difficulty: "hard",
      explanation: "The 'Creamy Layer' excludes the economically advanced among OBCs from reservation benefits.",
      xp: 30
    },
    {
      question: "Which amendment is known as the 'Mini Constitution'?",
      options: ["44th Amendment", "42nd Amendment", "73rd Amendment", "101st Amendment"],
      correct: 1,
      category: "amendments",
      difficulty: "hard",
      explanation: "The 42nd Amendment (1976) made extensive changes and is called the 'Mini Constitution'.",
      xp: 30
    },
    {
      question: "The concept of 'Judicial Review' in India is borrowed from:",
      options: ["British Constitution", "American Constitution", "Canadian Constitution", "Australian Constitution"],
      correct: 1,
      category: "constitutional-features",
      difficulty: "hard", 
      explanation: "Judicial Review is borrowed from the American Constitution, allowing courts to review legislative and executive actions.",
      xp: 30
    },
    {
      question: "Article 131 provides for:",
      options: ["Advisory jurisdiction of Supreme Court", "Original jurisdiction of Supreme Court", "Appellate jurisdiction of Supreme Court", "Writ jurisdiction of Supreme Court"],
      correct: 1,
      category: "judiciary",
      difficulty: "hard",
      explanation: "Article 131 gives the Supreme Court original jurisdiction in disputes between the Centre and States.",
      xp: 30
    }
  ]
};