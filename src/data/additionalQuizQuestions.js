// Additional quiz questions for the Game of Law application
// These questions will be imported and merged with the existing questions in contentData.js

export const additionalQuestions = {
  child: [
    // Child level questions (ages 8-12)
    {
      question: "What do we call the person who leads our country as the head of government?",
      options: ["President", "Prime Minister", "Governor", "Mayor"],
      correct: 1,
      category: "governance",
      difficulty: "easy",
      explanation: "The Prime Minister is the leader of our government who makes important decisions for our country!",
      xp: 10
    },
    {
      question: "How many colors are in the Indian flag?",
      options: ["Two", "Three", "Four", "Five"],
      correct: 2,
      category: "national-symbols",
      difficulty: "easy",
      explanation: "Our flag has saffron (orange), white, green, and the blue Ashoka Chakra - that's four colors!",
      xp: 10
    },
    {
      question: "Which animal is in the middle of our national emblem?",
      options: ["Tiger", "Lion", "Elephant", "Peacock"],
      correct: 1,
      category: "national-symbols",
      difficulty: "easy",
      explanation: "The Lion Capital from Sarnath forms our national emblem with four lions standing back-to-back!",
      xp: 10
    },
    {
      question: "The right to go to school for free until age 14 is called:",
      options: ["Right to Play", "Right to Education", "Right to Food", "Right to Sleep"],
      correct: 1,
      category: "fundamental-rights",
      difficulty: "easy",
      explanation: "The Right to Education means every child gets to learn and go to school until they're 14!",
      xp: 10
    },
    {
      question: "What do we call the group of people we elect to make laws for our country?",
      options: ["Supreme Court", "Parliament", "Police", "School Board"],
      correct: 1,
      category: "governance",
      difficulty: "easy",
      explanation: "Parliament is where elected representatives make laws to help run our country!",
      xp: 10
    },
    {
      question: "Which day do we celebrate as Republic Day?",
      options: ["August 15", "January 26", "October 2", "November 14"],
      correct: 1,
      category: "constitution-history",
      difficulty: "easy",
      explanation: "On January 26, 1950, our Constitution came into effect, making India a republic!",
      xp: 10
    }
  ],
  teen: [
    // Teen level questions (ages 13-17)
    {
      question: "Which of these is NOT a Fundamental Right?",
      options: ["Right to Equality", "Right to Freedom", "Right to Privacy", "Right to Property"],
      correct: 3,
      category: "fundamental-rights",
      difficulty: "medium",
      explanation: "Right to Property was removed as a Fundamental Right by the 44th Amendment in 1978.",
      xp: 20
    },
    {
      question: "What is the maximum strength (number of members) of the Lok Sabha?",
      options: ["500", "543", "552", "600"],
      correct: 2,
      category: "parliament",
      difficulty: "medium",
      explanation: "The maximum strength of the Lok Sabha is 552, with 530 members representing states, 20 representing Union Territories, and 2 Anglo-Indians nominated by the President.",
      xp: 20
    },
    {
      question: "Which constitutional amendment reduced the voting age from 21 to 18?",
      options: ["42nd Amendment", "61st Amendment", "73rd Amendment", "86th Amendment"],
      correct: 1,
      category: "amendments",
      difficulty: "medium",
      explanation: "The 61st Amendment Act, 1988 reduced the voting age from 21 to 18 years.",
      xp: 20
    },
    {
      question: "Which of these is NOT a Directive Principle of State Policy?",
      options: ["Uniform Civil Code", "Equal pay for equal work", "Protection of monuments", "Right to constitutional remedies"],
      correct: 3,
      category: "dpsp",
      difficulty: "medium",
      explanation: "Right to constitutional remedies is a Fundamental Right under Article 32, not a Directive Principle.",
      xp: 20
    },
    {
      question: "The idea of a 'Welfare State' is embodied in which part of the Indian Constitution?",
      options: ["Fundamental Rights", "Directive Principles of State Policy", "Preamble", "Fundamental Duties"],
      correct: 1,
      category: "dpsp",
      difficulty: "medium",
      explanation: "The Directive Principles of State Policy contain principles for creating a welfare state with social and economic justice.",
      xp: 20
    },
    {
      question: "Which amendment added Fundamental Duties to the Indian Constitution?",
      options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"],
      correct: 0,
      category: "amendments",
      difficulty: "medium",
      explanation: "The 42nd Amendment in 1976 added Fundamental Duties under Article 51A.",
      xp: 20
    }
  ],
  adult: [
    // Adult level questions (ages 18+)
    {
      question: "In the case of I.R. Coelho v. State of Tamil Nadu (2007), the Supreme Court held that:",
      options: ["Article 21 includes right to privacy", "Laws in the Ninth Schedule are subject to judicial review", "Sedition law is unconstitutional", "Preamble is not part of the Constitution"],
      correct: 1,
      category: "landmark-cases",
      difficulty: "hard",
      explanation: "The court ruled that laws placed in the Ninth Schedule after April 24, 1973 are subject to judicial review if they violate fundamental rights or the basic structure.",
      xp: 30
    },
    {
      question: "Which Article of the Constitution empowers the President to consult the Supreme Court on questions of law or fact?",
      options: ["Article 72", "Article 123", "Article 143", "Article 356"],
      correct: 2,
      category: "constitutional-provisions",
      difficulty: "hard",
      explanation: "Article 143 empowers the President to consult the Supreme Court for its advisory opinion on questions of law or fact.",
      xp: 30
    },
    {
      question: "The 'doctrine of eclipse' in constitutional law refers to:",
      options: ["Suspension of certain rights during emergency", "Pre-constitutional laws becoming void after Constitution", "Laws becoming temporarily unenforceable due to fundamental rights violation", "Power of judicial review"],
      correct: 2,
      category: "constitutional-doctrines",
      difficulty: "hard",
      explanation: "The doctrine holds that laws inconsistent with fundamental rights are not invalid but merely unenforceable ('eclipsed') until the inconsistency is removed.",
      xp: 30
    },
    {
      question: "What was the subject matter of the landmark case Vishaka v. State of Rajasthan?",
      options: ["Right to Education", "Sexual harassment at workplace", "Environmental protection", "Death penalty"],
      correct: 1,
      category: "landmark-cases",
      difficulty: "hard",
      explanation: "This case led to the formulation of Vishaka Guidelines concerning sexual harassment at workplace until legislation was enacted in 2013.",
      xp: 30
    },
    {
      question: "Which of these is an example of 'residuary powers' under the Indian Constitution?",
      options: ["Defense", "Railways", "Foreign affairs", "Cyber laws"],
      correct: 3,
      category: "federalism",
      difficulty: "hard",
      explanation: "Cyber laws fall under residuary powers of the Union (Article 248) as they were not specifically mentioned in any of the three lists when the Constitution was framed.",
      xp: 30
    },
    {
      question: "The 'Collegium System' for appointment of judges was established through:",
      options: ["Constitutional amendment", "Parliamentary legislation", "Supreme Court judgment", "Presidential order"],
      correct: 2,
      category: "judiciary",
      difficulty: "hard",
      explanation: "The Collegium System was established through the Three Judges Cases, a series of Supreme Court judgments between 1981 and 1998.",
      xp: 30
    }
  ]
};