// Enhanced constitutional scenarios focusing on Indian constitutional principles
// These scenarios will be used in the SituationGameWithLives component

export const constitutionalScenarios = {
  child: [
    {
      id: "ic-child-1",
      title: "The School Uniform Debate",
      character: { name: "Meena", age: 10, avatar: "👧", personality: "curious and thoughtful" },
      setting: { location: "School Assembly", time: "Monday morning", mood: "thoughtful" },
      story: "Meena's school is discussing whether students should be allowed to wear religious symbols with their school uniforms.",
      situation: "Some students want to wear small religious items like a sacred thread, cross, or hijab. The principal says it might cause division and everyone should look exactly the same.",
      challenge: "What do you think should happen?",
      choices: [
        {
          id: 'a',
          text: "📚 Allow students to wear small religious symbols that don't interfere with school activities",
          explanation: "Great choice! Article 25 of our Constitution gives everyone the right to freely practice their religion. Small religious symbols can be part of practicing one's faith.",
          isCorrect: true,
          outcome: "The school allows small religious symbols, and students learn to respect different faiths while still following uniform rules.",
          xpGain: 20,
          badge: "Religious Freedom Supporter"
        },
        {
          id: 'b',
          text: "👕 Ban all religious symbols completely for uniformity",
          explanation: "Our Constitution protects the right to religious freedom. A complete ban on all religious symbols might violate Article 25 which protects religious practices.",
          isCorrect: false,
          outcome: "Some students feel their identity is being suppressed, and parents complain about their children's religious rights being violated.",
          lesson: "Religious freedom is an important part of India's constitutional values!"
        }
      ],
      constitutional_concept: "Right to Freedom of Religion (Article 25)",
      fun_fact: "🌟 The Indian Constitution has special provisions to protect the cultural and educational rights of religious and linguistic minorities!"
    },
    {
      id: "ic-child-2",
      title: "The School Election",
      character: { name: "Rahul", age: 12, avatar: "👦", personality: "outspoken and fair" },
      setting: { location: "School Classroom", time: "Tuesday afternoon", mood: "excited" },
      story: "Rahul's class is electing a class monitor. Everyone gets to vote for who they think would do the best job.",
      situation: "Some students suggest that only those who get good grades should be allowed to vote. Others think every student should get an equal vote.",
      challenge: "What do you think is the right way to hold the election?",
      choices: [
        {
          id: 'a',
          text: "🗳️ Let every student vote equally, regardless of grades",
          explanation: "Excellent! You've applied the principle of Universal Adult Suffrage from our Constitution. In a democracy, each person's vote has equal value regardless of education or status.",
          isCorrect: true,
          outcome: "The class holds a fair election where everyone participates equally, learning an important lesson about democracy.",
          xpGain: 20,
          badge: "Democracy Champion"
        },
        {
          id: 'b',
          text: "📝 Only let students with good grades vote",
          explanation: "This goes against the democratic principle of equality. In India's Constitution, all adults get equal voting rights regardless of education or status.",
          isCorrect: false,
          outcome: "Many students feel left out and unfairly treated. The election doesn't represent what the whole class wants.",
          lesson: "Democracy means giving everyone an equal voice in decision-making!"
        }
      ],
      constitutional_concept: "Democratic Elections & Universal Adult Suffrage",
      fun_fact: "🗳️ India is the world's largest democracy with over 900 million eligible voters!"
    },
    {
      id: "ic-child-3",
      title: "The School Newspaper",
      character: { name: "Anika", age: 11, avatar: "👧", personality: "creative and bold" },
      setting: { location: "School Library", time: "Friday afternoon", mood: "determined" },
      story: "Anika wants to start a school newspaper to write about student issues and school events.",
      situation: "The principal says Anika can only publish stories that make the school look good, not articles about problems in the school that need fixing.",
      challenge: "What should Anika do?",
      choices: [
        {
          id: 'a',
          text: "📰 Politely explain that a newspaper should report both positive stories and problems that need solutions",
          explanation: "Good choice! Article 19 of our Constitution gives citizens the freedom of speech and expression. A balanced newspaper reporting both positive and constructive criticism helps improve the school.",
          isCorrect: true,
          outcome: "The principal agrees to a balanced newspaper that reports fairly. The newspaper helps solve real problems at school!",
          xpGain: 20,
          badge: "Free Press Advocate"
        },
        {
          id: 'b',
          text: "📝 Only publish positive stories as the principal suggested",
          explanation: "Freedom of speech and expression is an important right in our Constitution. A newspaper that only shows one side isn't truly informative.",
          isCorrect: false,
          outcome: "The newspaper becomes boring and students stop reading it because it doesn't address their real concerns.",
          lesson: "Freedom of speech and expression helps us improve our communities by discussing real issues!"
        }
      ],
      constitutional_concept: "Right to Freedom of Speech and Expression (Article 19)",
      fun_fact: "📢 Article 19 of our Constitution protects not just speaking, but also publishing, broadcasting and other forms of expression!"
    },
    {
      id: "ic-child-4",
      title: "The Mid-day Meal",
      character: { name: "Rohan", age: 9, avatar: "👦", personality: "kind and observant" },
      setting: { location: "School Canteen", time: "Lunch time", mood: "concerned" },
      story: "Rohan notices that some children from poorer families sometimes don't get enough to eat during lunch break.",
      situation: "The school provides mid-day meals, but sometimes there's not enough for everyone. Some bigger students take extra portions, leaving less for others.",
      challenge: "What should Rohan suggest to his teacher?",
      choices: [
        {
          id: 'a',
          text: "🍲 Everyone should get an equal serving before anyone gets seconds",
          explanation: "Excellent choice! Article 21 of our Constitution includes the right to food as part of right to life. The mid-day meal scheme helps ensure children have proper nutrition for education.",
          isCorrect: true,
          outcome: "The teacher implements a fair distribution system ensuring all children get proper nutrition, regardless of their background.",
          xpGain: 20,
          badge: "Equality Champion"
        },
        {
          id: 'b',
          text: "🥪 Let students who can afford it bring their own food instead",
          explanation: "This would create inequality. The mid-day meal program is based on constitutional principles of equality and right to nutrition for all children.",
          isCorrect: false,
          outcome: "This creates division between students and some children go hungry, affecting their health and ability to learn.",
          lesson: "The right to food is considered part of the fundamental right to life in our Constitution!"
        }
      ],
      constitutional_concept: "Right to Life including Right to Food (Article 21)",
      fun_fact: "🍚 India's mid-day meal scheme is the largest school lunch program in the world, feeding over 120 million children every day!"
    },
    {
      id: "ic-child-5",
      title: "The Class Project",
      character: { name: "Sanya", age: 10, avatar: "👧", personality: "creative and inclusive" },
      setting: { location: "Art Class", time: "Wednesday morning", mood: "excited" },
      story: "Sanya's class is doing an art project about 'My Culture' where students share something about their family traditions.",
      situation: "Vikram, who comes from a different state and speaks a different language, is worried because his cultural practices are very different from most students in class.",
      challenge: "How should the class handle this project?",
      choices: [
        {
          id: 'a',
          text: "🎨 Celebrate all cultures equally and learn from each other's traditions",
          explanation: "Perfect choice! Articles 29 and 30 of our Constitution protect cultural and linguistic diversity. India's strength lies in 'Unity in Diversity'.",
          isCorrect: true,
          outcome: "The class learns about many different traditions from across India, creating a beautiful display showcasing India's rich cultural diversity.",
          xpGain: 20,
          badge: "Cultural Diversity Advocate"
        },
        {
          id: 'b',
          text: "🖼️ Focus only on the majority culture to keep things simple",
          explanation: "This goes against the constitutional protection of cultural diversity. Articles 29 and 30 specifically protect minority cultures and languages.",
          isCorrect: false,
          outcome: "Vikram and other students feel left out and their unique cultural heritage isn't valued or recognized.",
          lesson: "The Constitution of India celebrates and protects our diversity of cultures and languages!"
        }
      ],
      constitutional_concept: "Protection of Cultural and Linguistic Diversity (Articles 29-30)",
      fun_fact: "🗣️ India recognizes 22 official languages in its Constitution's 8th Schedule, making it one of the most linguistically diverse countries in the world!"
    },
    {
      id: "ic-child-6",
      title: "The School Playground",
      character: { name: "Zara", age: 8, avatar: "👧", personality: "athletic and fair-minded" },
      setting: { location: "School Playground", time: "Recess", mood: "thoughtful" },
      story: "Zara notices that boys always get to use the main playground for cricket while girls have to play in a small corner.",
      situation: "When Zara asks to join the cricket game, some boys say 'Girls don't play cricket' and don't let her or other girls use the main playground area.",
      challenge: "What should happen with the playground rules?",
      choices: [
        {
          id: 'a',
          text: "🏏 Create a fair schedule so everyone gets equal time to use all areas regardless of gender",
          explanation: "Excellent choice! Article 15 of our Constitution prohibits discrimination based on gender. Boys and girls should have equal access to school facilities.",
          isCorrect: true,
          outcome: "The school creates a rotation system where all students get fair turns using different play areas, and mixed teams start playing together.",
          xpGain: 20,
          badge: "Gender Equality Champion"
        },
        {
          id: 'b',
          text: "🏐 Keep separate play areas for boys and girls with different sports",
          explanation: "This perpetuates gender discrimination. Our Constitution guarantees equality regardless of gender under Article 15.",
          isCorrect: false,
          outcome: "The gender divide grows stronger and girls miss out on playing sports they might enjoy and excel at.",
          lesson: "Equal treatment regardless of gender is a fundamental constitutional principle!"
        }
      ],
      constitutional_concept: "Right to Equality and Non-discrimination (Article 15)",
      fun_fact: "⚖️ India's Constitution was very progressive for its time, guaranteeing equal rights to women when many countries still didn't allow women to vote!"
    },
    {
      id: "ic-child-7",
      title: "The Computer Lab",
      character: { name: "Deepak", age: 11, avatar: "👦", personality: "tech-savvy and helpful" },
      setting: { location: "School Computer Lab", time: "Thursday afternoon", mood: "concerned" },
      story: "Deepak's school has a new computer lab, but he notices that students with disabilities find it difficult to use the computers.",
      situation: "A classmate who uses a wheelchair can't reach the computer desk, and another student with vision problems can't see the screen well.",
      challenge: "What should Deepak suggest to the teacher?",
      choices: [
        {
          id: 'a',
          text: "🖥️ Modify the computer lab to be accessible for all students with different needs",
          explanation: "Great choice! The right to equality under Article 14 includes making reasonable accommodations for persons with disabilities. Everyone deserves equal access to education.",
          isCorrect: true,
          outcome: "The school installs adjustable desks, screen readers, and other accessibility tools so all students can participate equally in computer class.",
          xpGain: 20,
          badge: "Accessibility Advocate"
        },
        {
          id: 'b',
          text: "📝 Suggest that students with disabilities do alternative assignments instead",
          explanation: "This creates unequal treatment. Our Constitution's principle of equality means making facilities accessible rather than excluding people.",
          isCorrect: false,
          outcome: "Students with disabilities miss out on important digital skills and feel excluded from regular activities.",
          lesson: "Equal access and reasonable accommodation are important parts of the constitutional right to equality!"
        }
      ],
      constitutional_concept: "Right to Equality and Inclusion (Article 14)",
      fun_fact: "♿ The Rights of Persons with Disabilities Act, based on constitutional principles of equality, requires all public facilities to be accessible!"
    }
  ],
  teen: [
    {
      id: "ic-teen-1",
      title: "The Community Welfare Project",
      character: { name: "Vikram", age: 16, avatar: "👦", personality: "responsible and community-minded" },
      setting: { location: "Town Hall", time: "Saturday morning", mood: "determined" },
      story: "Vikram's town council is planning to build either a shopping mall or a hospital on vacant government land.",
      situation: "Most wealthy people want a shopping mall because it will be more profitable and create some jobs. But many poor families need affordable healthcare which a government hospital would provide.",
      challenge: "What development project should Vikram support at the town meeting?",
      choices: [
        {
          id: 'a',
          text: "🏥 Support building the hospital to provide healthcare to all citizens",
          explanation: "Excellent choice! You've applied the Directive Principles of State Policy from our Constitution, which guide governments to ensure welfare of citizens, reduce inequalities, and provide essential services like healthcare.",
          isCorrect: true,
          outcome: "The hospital is built and provides affordable healthcare to many families who couldn't access it before.",
          xpGain: 20,
          badge: "Social Justice Advocate"
        },
        {
          id: 'b',
          text: "🛍️ Support the shopping mall for economic growth",
          explanation: "While economic growth is important, our Constitution's Directive Principles emphasize reducing inequality and ensuring welfare for all citizens, especially the disadvantaged.",
          isCorrect: false,
          outcome: "The mall is built, but many families still struggle to access basic healthcare and have to travel far for medical emergencies.",
          lesson: "The Directive Principles in our Constitution guide policies toward social and economic justice!"
        }
      ],
      constitutional_concept: "Directive Principles of State Policy (Part IV of Constitution)",
      fun_fact: "⚖️ The Directive Principles of State Policy were inspired by the Irish Constitution and aim to create a welfare state in India!"
    },
    {
      id: "ic-teen-2",
      title: "The Social Media Post",
      character: { name: "Priya", age: 15, avatar: "👧", personality: "outspoken and passionate" },
      setting: { location: "Home", time: "Evening", mood: "frustrated" },
      story: "Priya sees a post on social media calling for a protest against a government policy she disagrees with.",
      situation: "The post invites everyone to a peaceful protest, but some comments suggest blocking roads and disrupting public services to get attention. Priya wants to express her views.",
      challenge: "How should Priya participate in expressing her disagreement?",
      choices: [
        {
          id: 'a',
          text: "✊ Join the peaceful protest but avoid activities that disrupt essential services",
          explanation: "Well done! Article 19 gives citizens the right to peaceful assembly and protest, but with reasonable restrictions to maintain public order and protect others' rights. Peaceful protest is a democratic right.",
          isCorrect: true,
          outcome: "The peaceful protest gains attention and starts a constructive dialogue about the policy without causing harm.",
          xpGain: 20,
          badge: "Democratic Protester"
        },
        {
          id: 'b',
          text: "🔊 Join efforts to block roads and disrupt services for maximum impact",
          explanation: "While the right to protest is protected by our Constitution, it comes with reasonable restrictions. Disrupting essential services can harm others and may not be a protected form of protest.",
          isCorrect: false,
          outcome: "The protest turns chaotic, emergency services can't reach those in need, and the message of the protest gets lost in the controversy about the methods used.",
          lesson: "Constitutional freedoms come with responsibilities toward fellow citizens!"
        }
      ],
      constitutional_concept: "Right to Peaceful Assembly with Reasonable Restrictions (Article 19)",
      fun_fact: "🔍 Our Constitution balances individual freedoms with social responsibility through 'reasonable restrictions' on fundamental rights!"
    },
    {
      id: "ic-teen-3",
      title: "The Local Language Debate",
      character: { name: "Arjun", age: 17, avatar: "👦", personality: "thoughtful and proud of heritage" },
      setting: { location: "School Board Meeting", time: "Wednesday evening", mood: "concerned" },
      story: "Arjun's state is considering making one regional language the only medium of instruction in all schools.",
      situation: "Many families in Arjun's town speak different languages at home. Some parents are worried their children won't be able to learn in an unfamiliar language.",
      challenge: "What position should Arjun take at the school board meeting?",
      choices: [
        {
          id: 'a',
          text: "🗣️ Support teaching in multiple languages to accommodate linguistic diversity",
          explanation: "Perfect choice! Articles 29 and 30 of our Constitution protect the rights of linguistic minorities to conserve their language and establish educational institutions. India's strength lies in its diversity.",
          isCorrect: true,
          outcome: "The board decides to offer education in multiple languages, helping all students learn effectively while preserving linguistic diversity.",
          xpGain: 20,
          badge: "Cultural Diversity Protector"
        },
        {
          id: 'b',
          text: "📚 Support having only one language for unity and simplicity",
          explanation: "This approach might violate Articles 29 and 30 which protect linguistic minorities' rights to preserve their language and culture. Linguistic diversity is protected by our Constitution.",
          isCorrect: false,
          outcome: "Many students struggle to learn in an unfamiliar language, and some families feel their cultural identity is being erased.",
          lesson: "India's Constitution protects linguistic diversity as part of our national heritage!"
        }
      ],
      constitutional_concept: "Protection of Language and Cultural Rights (Articles 29-30)",
      fun_fact: "🌏 The Indian Constitution recognizes 22 official languages, making it one of the most linguistically diverse constitutions in the world!"
    },
    {
      id: "ic-teen-4",
      title: "The School Prayer Controversy",
      character: { name: "Noor", age: 16, avatar: "👧", personality: "principled and respectful" },
      setting: { location: "School Assembly", time: "Morning Prayer", mood: "uncomfortable" },
      story: "Noor's school has a morning prayer that reflects one particular religion, but the school has students from many different faiths.",
      situation: "Some students have asked for either a more inclusive, non-denominational prayer or the option to respectfully sit out during the religious prayer.",
      challenge: "As student council president, what position should Noor take on this issue?",
      choices: [
        {
          id: 'a',
          text: "🙏 Support a secular approach with either a non-religious reflection or respect for multiple faith practices",
          explanation: "Excellent choice! Articles 25-28 protect freedom of religion, while Article 28(1) specifically states that no religious instruction shall be provided in wholly state-funded educational institutions.",
          isCorrect: true,
          outcome: "The school adopts a moment of silent reflection where students can pray according to their own faith or simply meditate, respecting everyone's beliefs.",
          xpGain: 20,
          badge: "Secular Principles Defender"
        },
        {
          id: 'b',
          text: "📜 Keep the existing prayer since it's been a tradition for many years",
          explanation: "This approach doesn't respect the constitutional principle of secularism. India's Constitution declares it a secular country where all religions must be treated equally.",
          isCorrect: false,
          outcome: "Students from minority faiths feel excluded and their constitutional right to freedom of religion isn't respected in the educational environment.",
          lesson: "Secularism means the state treats all religions equally and favors none!"
        }
      ],
      constitutional_concept: "Secularism and Freedom of Religion (Articles 25-28)",
      fun_fact: "🕊️ The word 'Secular' was added to the Preamble of the Indian Constitution by the 42nd Amendment in 1976!"
    },
    {
      id: "ic-teen-5",
      title: "The Online Privacy Case",
      character: { name: "Vikram", age: 15, avatar: "👦", personality: "tech-savvy and privacy-conscious" },
      setting: { location: "Computer Lab", time: "Digital Citizenship Class", mood: "concerned" },
      story: "Vikram's school wants to install monitoring software that can access students' personal social media accounts to check for cyberbullying.",
      situation: "While preventing cyberbullying is important, Vikram is worried about students' privacy rights being violated by this extensive monitoring.",
      challenge: "What position should Vikram present in the class debate?",
      choices: [
        {
          id: 'a',
          text: "🔒 Argue that preventing cyberbullying can be done through education and more targeted measures that respect privacy",
          explanation: "Well done! The Supreme Court has recognized the right to privacy as a fundamental right under Article 21. Monitoring must be balanced with privacy rights.",
          isCorrect: true,
          outcome: "The school adopts a balanced approach focusing on digital citizenship education while implementing more privacy-respecting monitoring only for school accounts.",
          xpGain: 20,
          badge: "Privacy Rights Advocate"
        },
        {
          id: 'b',
          text: "👁️ Support complete monitoring since students' safety is more important than privacy",
          explanation: "This violates the fundamental right to privacy recognized under Article 21. Even safety measures must be proportional and respect basic rights.",
          isCorrect: false,
          outcome: "Students feel their privacy is invaded, leading to distrust and finding ways to hide legitimate communications from view.",
          lesson: "The right to privacy is a fundamental right recognized by the Supreme Court of India!"
        }
      ],
      constitutional_concept: "Right to Privacy (Article 21 as interpreted by Supreme Court)",
      fun_fact: "🔐 In a landmark 2017 judgment (Justice K.S. Puttaswamy case), the Supreme Court unanimously declared right to privacy as a fundamental right protected under the Constitution!"
    },
    {
      id: "ic-teen-6",
      title: "The Student Council Election",
      character: { name: "Aditya", age: 16, avatar: "👦", personality: "democratic and fair-minded" },
      setting: { location: "School Auditorium", time: "Student Council Elections", mood: "thoughtful" },
      story: "Aditya is helping organize the student council elections at his school. There's debate about the election process.",
      situation: "Some students want to restrict voting eligibility based on grades or extracurricular activities, while others want all students to vote regardless of academic standing.",
      challenge: "What election system should Aditya recommend to the principal?",
      choices: [
        {
          id: 'a',
          text: "🗳️ Universal voting rights for all students with a secret ballot system",
          explanation: "Perfect! This reflects India's constitutional principle of universal adult suffrage where every citizen gets an equal vote regardless of their background or status.",
          isCorrect: true,
          outcome: "The school implements a democratic election with equal voting rights, teaching students about fair democratic processes.",
          xpGain: 20,
          badge: "Democracy Advocate"
        },
        {
          id: 'b',
          text: "📋 Restrict voting to students with good grades who 'make better decisions'",
          explanation: "This contradicts the constitutional principle of universal adult suffrage, where every citizen gets an equal vote regardless of education or other qualifications.",
          isCorrect: false,
          outcome: "Many students feel disenfranchised and the student council doesn't truly represent the interests of all students.",
          lesson: "Democracy means everyone's voice counts equally in elections!"
        }
      ],
      constitutional_concept: "Universal Adult Suffrage (Articles 325-326)",
      fun_fact: "🗳️ India has the world's largest democratic electorate with over 900 million eligible voters—more than the combined population of USA and the EU!"
    },
    {
      id: "ic-teen-7",
      title: "The Environmental Project",
      character: { name: "Divya", age: 17, avatar: "👧", personality: "environmentally conscious and determined" },
      setting: { location: "City Council Meeting", time: "Saturday morning", mood: "concerned" },
      story: "A factory near Divya's school is releasing untreated waste into the local river, affecting the community's health and the environment.",
      situation: "The factory provides jobs to many local families, but its pollution is clearly illegal. The local authorities haven't taken action despite complaints.",
      challenge: "What action should Divya and her classmates take to address this environmental violation?",
      choices: [
        {
          id: 'a',
          text: "📜 File a Public Interest Litigation (PIL) with evidence of the pollution and its health impacts",
          explanation: "Excellent choice! The Supreme Court has interpreted Article 21 to include the right to a clean environment. PILs allow citizens to enforce environmental laws.",
          isCorrect: true,
          outcome: "The court orders the factory to install proper waste treatment systems and compensate affected residents for health issues.",
          xpGain: 20,
          badge: "Environmental Rights Defender"
        },
        {
          id: 'b',
          text: "🤐 Focus on asking for healthcare facilities rather than stopping the pollution",
          explanation: "This doesn't address the constitutional right to a clean environment under Article 21. The source of pollution must be addressed, not just its symptoms.",
          isCorrect: false,
          outcome: "The pollution continues to worsen, affecting more residents over time and damaging the ecosystem.",
          lesson: "The right to life includes the right to live in a pollution-free environment according to the Supreme Court!"
        }
      ],
      constitutional_concept: "Right to Clean Environment (Article 21 as interpreted by courts)",
      fun_fact: "🌱 India is one of the few countries whose courts have developed extensive environmental jurisprudence based on constitutional principles!"
    }
  ],
  adult: [
    {
      id: "ic-adult-1",
      title: "The Land Acquisition Case",
      character: { name: "Rajesh", age: 35, avatar: "👨", personality: "determined and principled" },
      setting: { location: "Small Village", time: "Monday morning", mood: "concerned" },
      story: "Rajesh's farming community received notices that their land will be acquired for a private company's factory with minimal compensation.",
      situation: "The government claims the factory will create jobs and boost the economy, justifying the acquisition under 'public purpose'. But the compensation is far below market value.",
      challenge: "What action should Rajesh take?",
      choices: [
        {
          id: 'a',
          text: "⚖️ File a case challenging the inadequate compensation and questioning if a private factory qualifies as 'public purpose'",
          explanation: "Excellent decision! The Right to Property, though no longer a fundamental right, is still a constitutional right under Article 300A. Land acquisition requires both legitimate public purpose and fair compensation.",
          isCorrect: true,
          outcome: "The court orders a reassessment of compensation at market rates and requires the company to provide employment to affected families.",
          xpGain: 20,
          badge: "Constitutional Rights Defender"
        },
        {
          id: 'b',
          text: "💰 Accept the compensation offered and relocate without challenging the decision",
          explanation: "While the government can acquire land for public purposes, our Constitution and the Land Acquisition Act require fair compensation and proper justification for 'public purpose'.",
          isCorrect: false,
          outcome: "The community loses their ancestral land for inadequate compensation, and many families struggle to rebuild their livelihoods elsewhere.",
          lesson: "Constitutional remedies exist to ensure fair treatment in land acquisition cases!"
        }
      ],
      constitutional_concept: "Right to Property (Article 300A) and Constitutional Remedies",
      fun_fact: "📜 The Right to Property was originally a Fundamental Right but was moved to become a Constitutional Right through the 44th Amendment in 1978!"
    },
    {
      id: "ic-adult-2",
      title: "The Workplace Discrimination",
      character: { name: "Sunita", age: 28, avatar: "👩", personality: "hardworking and principled" },
      setting: { location: "Corporate Office", time: "Performance Review Meeting", mood: "disappointed" },
      story: "Sunita discovers she's being paid less than her male colleagues with similar qualifications and performance.",
      situation: "When she raises the issue, her manager says the company traditionally pays men more because they are 'family breadwinners' and women are 'secondary earners'.",
      challenge: "What should Sunita do?",
      choices: [
        {
          id: 'a',
          text: "📋 File a complaint citing constitutional protections against gender discrimination",
          explanation: "Absolutely right! Articles 14, 15, and 16 of our Constitution guarantee equality before law and prohibit discrimination based on sex. The Equal Remuneration Act further reinforces equal pay for equal work.",
          isCorrect: true,
          outcome: "The company reviews its pay practices, adjusts Sunita's salary, and implements a fair compensation policy for all employees.",
          xpGain: 20,
          badge: "Gender Equality Champion"
        },
        {
          id: 'b',
          text: "🤝 Accept the explanation and continue working without challenging the pay disparity",
          explanation: "This situation involves gender discrimination which is prohibited by Articles 14, 15, and 16 of our Constitution. Equal pay for equal work is a constitutional principle.",
          isCorrect: false,
          outcome: "The pay disparity continues, affecting not just Sunita but all female employees in the company.",
          lesson: "Constitutional equality includes workplace gender equality and equal pay for equal work!"
        }
      ],
      constitutional_concept: "Right to Equality and Non-discrimination (Articles 14-16)",
      fun_fact: "⚖️ India was one of the first countries to constitutionally guarantee equality regardless of gender, even before many Western democracies!"
    },
    {
      id: "ic-adult-3",
      title: "The Environmental Dilemma",
      character: { name: "Amit", age: 40, avatar: "👨", personality: "environmentally conscious and civic-minded" },
      setting: { location: "Community Meeting", time: "Saturday evening", mood: "concerned" },
      story: "Amit's neighborhood is facing severe pollution from a nearby factory that's dumping untreated waste into the local river.",
      situation: "The factory provides jobs to many local residents, but the pollution is causing health problems and contaminating water sources. Government officials haven't responded to complaints.",
      challenge: "What course of action should Amit pursue?",
      choices: [
        {
          id: 'a',
          text: "🌿 File a Public Interest Litigation (PIL) to enforce environmental regulations",
          explanation: "Excellent choice! Article 21's Right to Life includes the right to a clean environment as established by Supreme Court judgments. PILs allow citizens to seek judicial intervention for environmental protection.",
          isCorrect: true,
          outcome: "The court orders the factory to install proper waste treatment facilities and compensate affected residents for health issues.",
          xpGain: 20,
          badge: "Environmental Rights Advocate"
        },
        {
          id: 'b',
          text: "🏭 Focus only on requesting better healthcare facilities to deal with the health problems",
          explanation: "While healthcare is important, Article 21 (Right to Life) has been interpreted by courts to include the right to a clean environment. The source of pollution needs to be addressed.",
          isCorrect: false,
          outcome: "Health problems continue to worsen as the pollution remains unaddressed, affecting more residents over time.",
          lesson: "The Right to Life includes the right to live in a pollution-free environment according to our Constitution's judicial interpretation!"
        }
      ],
      constitutional_concept: "Right to Life including Environmental Rights (Article 21)",
      fun_fact: "🌍 India's Supreme Court has been a global pioneer in developing environmental jurisprudence based on constitutional principles!"
    },
    {
      id: "ic-adult-4",
      title: "The Free Speech Controversy",
      character: { name: "Vikram", age: 32, avatar: "👨", personality: "outspoken and politically active" },
      setting: { location: "Social Media", time: "Election Season", mood: "frustrated" },
      story: "Vikram posts strong criticism of government policies on social media. He receives an official notice claiming his posts 'threaten national security'.",
      situation: "The notice demands removal of his posts and threatens legal action. Vikram's posts are critical but contain no calls for violence or unrest.",
      challenge: "What should Vikram do about the notice?",
      choices: [
        {
          id: 'a',
          text: "🗣️ Contest the notice as an infringement on constitutional free speech rights",
          explanation: "Correct! Article 19(1)(a) protects the freedom of speech and expression. While there are reasonable restrictions, peaceful criticism of government policies is protected speech.",
          isCorrect: true,
          outcome: "With legal assistance, Vikram successfully challenges the notice. The court affirms that legitimate criticism of policies is protected speech.",
          xpGain: 20,
          badge: "Free Speech Defender"
        },
        {
          id: 'b',
          text: "🤐 Remove the posts and avoid posting political opinions in future",
          explanation: "This surrenders your fundamental right to freedom of speech under Article 19(1)(a). While there are reasonable restrictions, they don't prohibit peaceful criticism of government policies.",
          isCorrect: false,
          outcome: "You and others become afraid to voice legitimate criticism, weakening democratic discourse and accountability.",
          lesson: "Freedom of speech is essential to democracy and is protected by our Constitution!"
        }
      ],
      constitutional_concept: "Freedom of Speech and Expression (Article 19(1)(a))",
      fun_fact: "📢 India's Constitution protects free speech while also including specific 'reasonable restrictions' - a unique balance not found in many other constitutions!"
    },
    {
      id: "ic-adult-5",
      title: "The Religious Practice Dispute",
      character: { name: "Meera", age: 45, avatar: "👩", personality: "devout and traditional" },
      setting: { location: "Housing Society", time: "Festival Season", mood: "determined" },
      story: "Meera's housing society creates a new rule banning all religious ceremonies in common areas, affecting her community's traditional festival celebrations.",
      situation: "The society claims the ban is to maintain communal harmony. Meera's religious community has peacefully conducted these ceremonies for decades.",
      challenge: "How should Meera respond to this ban?",
      choices: [
        {
          id: 'a',
          text: "⚖️ Challenge the ban as a violation of religious freedom under the Constitution",
          explanation: "Correct approach! Articles 25-28 guarantee the freedom to practice religion. Any restriction must be for genuine public order or health reasons, not blanket bans.",
          isCorrect: true,
          outcome: "After mediation, the society revises its rules to accommodate religious ceremonies with reasonable time and noise restrictions.",
          xpGain: 20,
          badge: "Religious Freedom Defender"
        },
        {
          id: 'b',
          text: "🏠 Move all ceremonies to private homes despite space limitations",
          explanation: "This unnecessarily compromises your constitutional right to religious freedom. The right to practice religion is protected under Articles 25-28, subject only to public order and health.",
          isCorrect: false,
          outcome: "Traditional communal celebrations diminish over time, losing cultural heritage while setting a precedent for further restrictions.",
          lesson: "Our Constitution balances religious freedom with communal harmony, allowing reasonable expressions of faith!"
        }
      ],
      constitutional_concept: "Freedom of Religion (Articles 25-28)",
      fun_fact: "🕊️ India's Constitution created one of the world's most comprehensive frameworks for religious freedom in a pluralistic society!"
    },
    {
      id: "ic-adult-6",
      title: "The Privacy Dilemma",
      character: { name: "Rahul", age: 38, avatar: "👨", personality: "privacy-conscious and digital rights advocate" },
      setting: { location: "Smartphone Notification", time: "Monday morning", mood: "concerned" },
      story: "Rahul discovers that a popular government app he's using collects and shares his personal data, including location and contact list, with third parties without clear consent.",
      situation: "The app is increasingly necessary for accessing essential government services, but has no opt-out for extensive data collection.",
      challenge: "What action should Rahul take regarding this privacy concern?",
      choices: [
        {
          id: 'a',
          text: "🔐 File a case challenging the mandatory data collection as a privacy violation",
          explanation: "Excellent choice! The Supreme Court has recognized the Right to Privacy as a fundamental right under Article 21. Government data collection must be proportional and necessary.",
          isCorrect: true,
          outcome: "The court orders the government to implement data minimization and opt-out options while maintaining essential service access.",
          xpGain: 20,
          badge: "Digital Rights Defender"
        },
        {
          id: 'b',
          text: "📱 Accept the data collection as necessary for digital governance",
          explanation: "This overlooks your fundamental Right to Privacy under Article 21. Government data collection must follow principles of necessity and proportionality.",
          isCorrect: false,
          outcome: "Unchecked data collection expands to more services, creating surveillance concerns and potential for data misuse.",
          lesson: "The Right to Privacy is a fundamental right that applies to digital spaces and government services too!"
        }
      ],
      constitutional_concept: "Right to Privacy (Article 21, as interpreted by the Supreme Court)",
      fun_fact: "🔏 In the landmark Puttaswamy case (2017), India's Supreme Court unanimously recognized privacy as a fundamental right!"
    },
    {
      id: "ic-adult-7",
      title: "The Reservation Policy Debate",
      character: { name: "Ananya", age: 42, avatar: "👩", personality: "policy analyst and social justice advocate" },
      setting: { location: "University Discussion Panel", time: "Admission Season", mood: "thoughtful" },
      story: "Ananya is moderating a heated debate on reservation policies in higher education and government jobs for historically disadvantaged communities.",
      situation: "Some argue reservations should end as they're 'unfair' to general category candidates, while others say they remain essential for addressing historical injustice.",
      challenge: "What constitutional perspective should Ananya present on this issue?",
      choices: [
        {
          id: 'a',
          text: "⚖️ Explain how reservations are constitutionally supported for promoting substantive equality",
          explanation: "Correct! Articles 15(4) and 16(4) specifically permit special provisions for advancement of socially and educationally backward classes. The Constitution recognizes substantive equality, not just formal equality.",
          isCorrect: true,
          outcome: "The discussion becomes more informed about constitutional principles, focusing on implementation improvements rather than questioning the fundamental policy.",
          xpGain: 20,
          badge: "Constitutional Scholar"
        },
        {
          id: 'b',
          text: "🔄 Argue that all reservations violate the right to equality and merit principles",
          explanation: "This misinterprets the Constitution. Articles 15(4) and 16(4) specifically permit special provisions for advancement of disadvantaged groups to achieve substantive equality.",
          isCorrect: false,
          outcome: "The debate continues based on misconceptions rather than constitutional principles, preventing constructive policy discussion.",
          lesson: "Our Constitution recognizes that true equality may require special provisions for historically disadvantaged groups!"
        }
      ],
      constitutional_concept: "Substantive Equality and Affirmative Action (Articles 15(4) and 16(4))",
      fun_fact: "🎯 India's Constitution was one of the first in the world to explicitly provide for affirmative action measures to address historical inequalities!"
    },
    {
      id: "ic-adult-8",
      title: "The Language Rights Case",
      character: { name: "Aditya", age: 36, avatar: "👨", personality: "multilingual educator and cultural preservationist" },
      setting: { location: "State Education Department", time: "Policy Meeting", mood: "determined" },
      story: "Aditya, who runs a school in a linguistically diverse region, faces a new state policy mandating a single language as medium of instruction.",
      situation: "The policy will force minority language speakers to study exclusively in the state's official language, potentially affecting their educational outcomes.",
      challenge: "How should Aditya respond to this policy?",
      choices: [
        {
          id: 'a',
          text: "🗣️ Challenge the policy citing constitutional protection for linguistic minorities",
          explanation: "Correct approach! Articles 29 and 350A protect linguistic minorities' right to conserve their distinct language and provide for primary education in mother tongue when possible.",
          isCorrect: true,
          outcome: "The court directs the state to modify its policy, allowing minority language instruction while promoting the official language as a subject.",
          xpGain: 20,
          badge: "Linguistic Rights Defender"
        },
        {
          id: 'b',
          text: "📝 Comply with the policy for administrative simplicity and uniformity",
          explanation: "This overlooks important constitutional protections. Articles 29 and 350A specifically protect linguistic minorities' rights to preserve their language and culture.",
          isCorrect: false,
          outcome: "Students from linguistic minorities struggle academically, and their cultural heritage and language face accelerated decline.",
          lesson: "Our Constitution protects India's linguistic diversity through specific rights for linguistic minorities!"
        }
      ],
      constitutional_concept: "Rights of Linguistic Minorities (Articles 29, 30, and 350A)",
      fun_fact: "🔤 India's Constitution recognizes 22 official languages in the Eighth Schedule - one of the highest numbers of officially recognized languages in any constitution worldwide!"
    },
    {
      id: "ic-adult-9",
      title: "The Digital Censorship Challenge",
      character: { name: "Priya", age: 29, avatar: "👩", personality: "digital journalist and transparency advocate" },
      setting: { location: "Online News Portal Office", time: "Breaking News Situation", mood: "conflicted" },
      story: "Priya's news portal receives a government order to remove an investigative article about alleged corruption, claiming it threatens 'economic security'.",
      situation: "The article is based on verified documents and interviews. Compliance means suppressing important public interest information.",
      challenge: "What should Priya and her editorial team do?",
      choices: [
        {
          id: 'a',
          text: "📰 Challenge the takedown order legally while publishing a notice about the censorship attempt",
          explanation: "Excellent decision! Article 19(1)(a) protects press freedom, and the Supreme Court has held that public has the right to know about matters of public importance.",
          isCorrect: true,
          outcome: "The court reviews the order and rules that verified reporting on corruption serves public interest and doesn't threaten economic security.",
          xpGain: 20,
          badge: "Press Freedom Defender"
        },
        {
          id: 'b',
          text: "⚠️ Comply with the order to avoid legal complications and potential shutdown",
          explanation: "This concedes important press freedom guarantees under Article 19(1)(a). Courts have repeatedly upheld the public's right to information on matters of public importance.",
          isCorrect: false,
          outcome: "The issue remains unexposed, similar takedown orders increase, and press freedom gradually erodes.",
          lesson: "Freedom of the press is essential to democracy and protected as part of free speech under our Constitution!"
        }
      ],
      constitutional_concept: "Freedom of Press (Article 19(1)(a))",
      fun_fact: "📱 While India's Constitution doesn't explicitly mention 'press freedom,' courts have interpreted it as an essential part of the freedom of expression under Article 19(1)(a)!"
    },
    {
      id: "ic-adult-10",
      title: "The Judicial Review Dilemma",
      character: { name: "Kiran", age: 44, avatar: "👩", personality: "constitutional lawyer and governance expert" },
      setting: { location: "Law Office", time: "After Parliamentary Session", mood: "concerned" },
      story: "A constitutional amendment is passed that attempts to limit the Supreme Court's power to review amendments for violation of the Constitution's basic structure.",
      situation: "The amendment claims Parliament has unlimited power to amend any part of the Constitution, including fundamental rights and the judiciary's independence.",
      challenge: "As a constitutional lawyer, what position should Kiran take?",
      choices: [
        {
          id: 'a',
          text: "⚖️ Challenge the amendment as violating the basic structure doctrine",
          explanation: "Correct! In Kesavananda Bharati (1973), the Supreme Court established that Parliament cannot amend the 'basic structure' of the Constitution, including judicial review and fundamental rights.",
          isCorrect: true,
          outcome: "The Supreme Court strikes down the amendment, reaffirming that even amendment powers have limitations to protect democracy's core principles.",
          xpGain: 20,
          badge: "Constitutional Guardian"
        },
        {
          id: 'b',
          text: "📜 Accept parliamentary supremacy in all constitutional amendments",
          explanation: "This contradicts established constitutional law. The Basic Structure Doctrine (Kesavananda Bharati, 1973) holds that Parliament cannot alter the Constitution's essential features.",
          isCorrect: false,
          outcome: "Without judicial check on amendment powers, fundamental rights and democratic safeguards face potential erosion over time.",
          lesson: "Our Constitution's interpretation includes limits on amendment powers to protect its core democratic values!"
        }
      ],
      constitutional_concept: "Basic Structure Doctrine and Judicial Review",
      fun_fact: "⚖️ The Basic Structure Doctrine is a unique Indian judicial innovation that has influenced constitutional interpretation in many other countries!"
    }
  ]
};