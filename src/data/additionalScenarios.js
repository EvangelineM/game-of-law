// Additional constitutional scenarios with real-life examples for the Game of Law
// These scenarios will add depth and variety to the existing scenarios

export const additionalScenarios = {
  child: [
    {
      id: "c1",
      title: "The Birthday Party Invitation",
      character: { name: "Ravi", age: 11, avatar: "👦", personality: "friendly and thoughtful" },
      setting: { location: "Neighborhood Park", time: "Saturday morning", mood: "excited" },
      story: "Ravi is planning his birthday party and wants to invite his friends from school. He's so excited to share his special day!",
      situation: "Ravi's mom says he can invite 10 friends. He wants to invite everyone, but notices some kids are excluding Sara because she uses a wheelchair. His mom suggests inviting only the 'popular kids' to avoid 'complications'.",
      challenge: "What should Ravi do about his party invitations?",
      choices: [
        {
          id: 'a',
          text: "🎉 Invite everyone including Sara, and make sure the party space is accessible",
          explanation: "Great choice! Our Constitution guarantees equality and protects against discrimination based on disability. Everyone deserves to be included!",
          isCorrect: true,
          outcome: "Sara has a wonderful time at the party, and all the kids learn that inclusion makes celebrations more fun for everyone!",
          xpGain: 20,
          badge: "Inclusion Champion"
        },
        {
          id: 'b',
          text: "👥 Only invite the popular kids like mom suggested",
          explanation: "Our Constitution promotes equality for all people. Excluding someone because of a disability goes against the right to equality in Article 14.",
          isCorrect: false,
          outcome: "Sara feels left out and sad, and Ravi feels guilty knowing he didn't do the right thing.",
          lesson: "Equality means making sure everyone has the same opportunities to participate!"
        },
        {
          id: 'c',
          text: "🤔 Invite Sara but plan activities she can't participate in",
          explanation: "Just inviting someone isn't enough - true inclusion means making sure everyone can participate equally in activities.",
          isCorrect: false,
          outcome: "Sara comes to the party but feels isolated when she can't join most activities. She leaves early feeling sad.",
          lesson: "Equality includes making reasonable accommodations so everyone can participate!"
        }
      ],
      constitutional_concept: "Right to Equality & Non-discrimination",
      fun_fact: "🌈 India's Constitution was one of the first in the world to include protections against discrimination!"
    },
    {
      id: "c2",
      title: "The Classroom Prayer Debate",
      character: { name: "Amir", age: 12, avatar: "👦", personality: "quiet and respectful" },
      setting: { location: "Village School", time: "Morning Assembly", mood: "nervous" },
      story: "Amir's new school starts each day with a prayer from one specific religion. Amir belongs to a different religion and feels uncomfortable.",
      situation: "When Amir politely asks his teacher if he can quietly sit out the prayer, the teacher says all students must participate regardless of their religion. Some classmates start teasing Amir.",
      challenge: "What should Amir do about the morning prayer situation?",
      choices: [
        {
          id: 'a',
          text: "🙏 Respectfully explain that India is secular and schools should respect all religions",
          explanation: "Excellent! India's Constitution makes it a secular country where all religions are treated equally. Article 28 protects students from being forced to participate in religious instruction they don't want.",
          isCorrect: true,
          outcome: "The principal agrees with Amir and creates a new policy allowing students to respectfully observe their own religious practices while respecting others.",
          xpGain: 20,
          badge: "Religious Freedom Defender"
        },
        {
          id: 'b',
          text: "😔 Just participate in the prayer even though it makes him uncomfortable",
          explanation: "The Constitution protects freedom of religion, which includes the right not to be forced to participate in religious activities against your wishes.",
          isCorrect: false,
          outcome: "Amir feels his identity isn't respected, and other students from minority religions continue feeling excluded.",
          lesson: "Standing up respectfully for your rights helps create a more inclusive environment for everyone!"
        },
        {
          id: 'c',
          text: "😡 Refuse loudly and disrupt the prayer session",
          explanation: "While Amir has the right not to participate, being disruptive isn't respectful of others' right to practice their religion peacefully.",
          isCorrect: false,
          outcome: "Amir gets in trouble for disrupting class, and the real issue about religious freedom isn't properly addressed.",
          lesson: "You can stand up for your rights while still being respectful of others!"
        }
      ],
      constitutional_concept: "Freedom of Religion & Secularism",
      fun_fact: "🕊️ India's Constitution gives every person the freedom to practice and promote their religion peacefully!"
    },
    {
      id: "c3",
      title: "The Library Book Challenge",
      character: { name: "Meera", age: 10, avatar: "👧", personality: "bookish and brave" },
      setting: { location: "Community Library", time: "After School", mood: "determined" },
      story: "Meera loves reading and visits the local library every week. She notices that some parents are trying to remove certain storybooks about different kinds of families.",
      situation: "The parents say these books are 'inappropriate' and should be banned. The librarian looks worried but doesn't know what to do. Meera's favorite book is one of those they want to remove.",
      challenge: "How should Meera respond to this situation?",
      choices: [
        {
          id: 'a',
          text: "📚 Organize a peaceful student reading group to show why diverse books matter",
          explanation: "Great job! Article 19 of our Constitution protects freedom of expression and the right to access information. Book banning limits these important freedoms!",
          isCorrect: true,
          outcome: "Meera's reading group shows the community why diverse books help everyone learn. The library keeps the books and starts a community discussion program.",
          xpGain: 20,
          badge: "Freedom Fighter"
        },
        {
          id: 'b',
          text: "🤐 Say nothing and just find different books to read instead",
          explanation: "Freedom of expression is a fundamental right that needs people to stand up for it, especially when books representing diverse perspectives are at risk.",
          isCorrect: false,
          outcome: "The books are removed, and many children lose the chance to learn about different kinds of people and families.",
          lesson: "Sometimes staying silent means losing important freedoms that our Constitution protects!"
        },
        {
          id: 'c',
          text: "😤 Secretly take the books home so they won't be removed",
          explanation: "While Meera wants to protect the books, taking them without permission isn't the right approach to defend freedom of expression.",
          isCorrect: false,
          outcome: "The books are marked as lost, Meera gets in trouble, and the library doesn't address the real issue about freedom to read.",
          lesson: "There are better ways to stand up for your rights than breaking rules!"
        }
      ],
      constitutional_concept: "Freedom of Expression & Access to Information",
      fun_fact: "📖 Our Constitution protects your right to read, learn, and share ideas freely!"
    },
    {
      id: "c4",
      title: "The School Lunch Mystery",
      character: { name: "Dev", age: 10, avatar: "👦", personality: "observant and caring" },
      setting: { location: "Government School", time: "Lunchtime", mood: "concerned" },
      story: "Dev notices that some of his classmates never bring lunch and always look hungry. He learns their families can't afford enough food.",
      situation: "The school is supposed to provide midday meals for all students, but some teachers are taking the food supplies home instead. Dev's friends are going hungry, but they're afraid to speak up.",
      challenge: "What should Dev do about the missing school lunches?",
      choices: [
        {
          id: 'a',
          text: "🍲 Report the issue to the principal or district education officer",
          explanation: "Excellent choice! The Right to Food is part of Article 21 (Right to Life). The Midday Meal Scheme is legally protected to ensure children don't go hungry at school.",
          isCorrect: true,
          outcome: "The authorities investigate and fix the problem. All children start receiving nutritious meals, helping them stay healthy and focus better in school.",
          xpGain: 20,
          badge: "Child Rights Defender"
        },
        {
          id: 'b',
          text: "🤫 Ignore it because it's not Dev's problem",
          explanation: "The right to food is connected to the right to life under Article 21. When someone's basic rights are being violated, being a responsible citizen means speaking up.",
          isCorrect: false,
          outcome: "The children continue to go hungry, affecting their health and ability to learn. The problem could have been solved if someone had spoken up.",
          lesson: "Sometimes helping others protect their rights is as important as protecting your own!"
        },
        {
          id: 'c',
          text: "👊 Confront the teachers directly with accusations",
          explanation: "While it's important to address the problem, directly confronting teachers could create conflict rather than solving the issue effectively.",
          isCorrect: false,
          outcome: "The teachers deny everything and Dev gets in trouble. The problem continues because he didn't report it through proper channels.",
          lesson: "There are effective ways to report problems that protect everyone's rights!"
        }
      ],
      constitutional_concept: "Right to Food & Child Welfare",
      fun_fact: "🍎 India's Supreme Court has recognized the right to food as part of the fundamental right to life!"
    }
  ],
  teen: [
    {
      id: "t1",
      title: "The School Surveillance Dilemma",
      character: { name: "Vikram", age: 16, avatar: "🧑", personality: "tech-savvy and principled" },
      setting: { location: "Urban High School", time: "New Semester", mood: "concerned" },
      story: "Vikram's school has installed facial recognition cameras in classrooms to track student attendance and behavior without informing students or parents.",
      situation: "The principal says it's for 'safety' but the system also records students' expressions and activities. Some data is being shared with external companies. Many students feel uncomfortable being constantly watched.",
      challenge: "What should Vikram do about this surveillance system?",
      choices: [
        {
          id: 'a',
          text: "📝 Start a petition requesting transparency and consent for data collection",
          explanation: "Excellent! The right to privacy is part of Article 21 (Right to Life). The Supreme Court has ruled that individuals have the right to control their personal data.",
          isCorrect: true,
          outcome: "The school board agrees to create a privacy policy, get proper consent, and limit data collection to what's necessary. Students' privacy is better protected.",
          xpGain: 30,
          badge: "Privacy Defender"
        },
        {
          id: 'b',
          text: "🤐 Accept it because schools have the right to monitor students",
          explanation: "While schools can implement safety measures, they must respect fundamental rights. The right to privacy requires informed consent and reasonable data collection.",
          isCorrect: false,
          outcome: "The invasive surveillance continues expanding, with more student data being collected and shared without consent or proper safeguards.",
          lesson: "Privacy is a fundamental right that needs protection, especially in the digital age!"
        },
        {
          id: 'c',
          text: "💻 Hack into the system to disable the cameras",
          explanation: "Taking illegal actions isn't the right way to address privacy concerns. Constitutional rights should be defended through legal and democratic means.",
          isCorrect: false,
          outcome: "Vikram faces serious legal consequences, and the real privacy issues remain unaddressed. His actions actually lead to even stricter surveillance.",
          lesson: "There are effective legal ways to protect constitutional rights without breaking laws!"
        }
      ],
      constitutional_concept: "Right to Privacy & Data Protection",
      fun_fact: "🔐 In 2017, India's Supreme Court recognized privacy as a fundamental right in the digital age!"
    },
    {
      id: "t2",
      title: "The Environmental Protest Challenge",
      character: { name: "Zara", age: 17, avatar: "👩", personality: "environmentally conscious and organized" },
      setting: { location: "Local Park", time: "Weekend", mood: "determined" },
      story: "Zara discovers that a nearby protected forest is being illegally cut down for a shopping complex, threatening wildlife and water sources for several villages.",
      situation: "When Zara tries to organize a peaceful protest, local authorities deny permission, saying 'students shouldn't get involved in such matters.' The deforestation is accelerating.",
      challenge: "How should Zara continue her environmental advocacy?",
      choices: [
        {
          id: 'a',
          text: "📋 File a Public Interest Litigation (PIL) with evidence of environmental violations",
          explanation: "Perfect choice! Article 21 includes the right to a clean environment. Citizens can file PILs for environmental protection, and many landmark environmental cases were started by students!",
          isCorrect: true,
          outcome: "The court orders an immediate stop to the deforestation while investigating. Zara's evidence helps protect the forest and the affected communities.",
          xpGain: 30,
          badge: "Environmental Justice Warrior"
        },
        {
          id: 'b',
          text: "👋 Give up because students can't make a difference anyway",
          explanation: "Everyone, including students, has the constitutional right to peacefully advocate for environmental protection. The Constitution gives all citizens the responsibility to protect nature.",
          isCorrect: false,
          outcome: "The forest is destroyed, affecting wildlife and causing water shortages in nearby villages. An opportunity for environmental justice is lost.",
          lesson: "Young citizens have both rights and responsibilities toward environmental protection!"
        },
        {
          id: 'c',
          text: "🔥 Organize a road blockade to force authorities to listen",
          explanation: "While environmental protection is important, illegal or potentially dangerous protests can undermine the cause. Constitutional rights include peaceful and legal advocacy.",
          isCorrect: false,
          outcome: "The protest turns chaotic, several students are detained, and the environmental issue gets overshadowed by the controversy about the blockade.",
          lesson: "Effective environmental advocacy works within legal boundaries while being persistent!"
        }
      ],
      constitutional_concept: "Environmental Rights & Citizen Responsibility",
      fun_fact: "🌳 Article 51A(g) makes it every citizen's duty to protect and improve the natural environment!"
    },
    {
      id: "t3",
      title: "The Online Bullying Crisis",
      character: { name: "Arjun", age: 15, avatar: "🧑", personality: "creative and sensitive" },
      setting: { location: "Social Media", time: "After posting art online", mood: "distressed" },
      story: "Arjun loves creating digital art and sharing it online. After posting artwork that supports gender equality, he becomes the target of intense online bullying and threats.",
      situation: "The bullies are mostly anonymous accounts, but Arjun recognizes some as classmates. School officials say they can't help because it's happening 'outside school.' The harassment is affecting Arjun's mental health.",
      challenge: "How should Arjun address this cyberbullying situation?",
      choices: [
        {
          id: 'a',
          text: "🛡️ Report to cyber cell and gather evidence while seeking school counselor support",
          explanation: "Great decision! Online harassment violates dignity and safety. The IT Act and cyberbullying laws protect against online threats, and schools have a responsibility to address student behavior.",
          isCorrect: true,
          outcome: "With proper reporting and support, the harassment stops. The school implements an anti-bullying program, and Arjun's mental health improves.",
          xpGain: 30,
          badge: "Digital Dignity Defender"
        },
        {
          id: 'b',
          text: "🤐 Delete all his art and stay offline to avoid bullying",
          explanation: "Freedom of expression is protected under Article 19. Retreating due to harassment means losing your constitutional right to express yourself.",
          isCorrect: false,
          outcome: "Arjun gives up his passion for art and feels even worse. The bullies move on to target someone else, continuing the cycle of harassment.",
          lesson: "Everyone deserves to express themselves without facing harassment or threats!"
        },
        {
          id: 'c',
          text: "🔥 Create fake accounts to bully the bullies back",
          explanation: "Retaliating with similar harassment doesn't solve the problem and could lead to legal consequences for Arjun as well.",
          isCorrect: false,
          outcome: "The situation escalates into a toxic cycle of online attacks. Arjun's reputation is damaged, and the original issue isn't resolved.",
          lesson: "There are effective legal ways to address cyberbullying without becoming a bully yourself!"
        }
      ],
      constitutional_concept: "Digital Rights & Dignity",
      fun_fact: "📱 The Constitution's protections for dignity and expression extend to online spaces too!"
    },
    {
      id: "t4",
      title: "The College Admission Controversy",
      character: { name: "Ananya", age: 17, avatar: "👩", personality: "hardworking and fair-minded" },
      setting: { location: "College Admission Office", time: "Application Season", mood: "shocked" },
      story: "Ananya discovers that her college is giving admission preference to students who pay large 'donations' rather than based on merit or reservation policies.",
      situation: "When Ananya questions this, an administrator suggests her family should also pay a 'donation' to secure her place. Many qualified students from disadvantaged backgrounds are being denied admission.",
      challenge: "How should Ananya respond to this corruption in the admission process?",
      choices: [
        {
          id: 'a',
          text: "📝 Document evidence and report to education authorities and anti-corruption helpline",
          explanation: "Perfect choice! Article 14 guarantees equality before law. Admission based on illegal payments violates the right to equality in education and transparency laws.",
          isCorrect: true,
          outcome: "An investigation leads to reform of the admission process. The college implements a transparent system based on merit and proper reservation policies.",
          xpGain: 30,
          badge: "Education Rights Champion"
        },
        {
          id: 'b',
          text: "💰 Have her family pay the donation to secure her own admission",
          explanation: "Participating in corrupt practices perpetuates inequality and injustice. The Constitution guarantees equal educational opportunities, not based on ability to pay bribes.",
          isCorrect: false,
          outcome: "The corrupt system continues, denying opportunities to many deserving students. The quality of education suffers as admissions are based on money rather than merit.",
          lesson: "Fighting corruption helps protect equal rights and opportunities for everyone!"
        },
        {
          id: 'c',
          text: "🤐 Stay quiet and apply to a different college instead",
          explanation: "While avoiding corruption is good, allowing corrupt practices to continue harms society and violates the constitutional rights of many students.",
          isCorrect: false,
          outcome: "The corrupt admissions continue for years, denying opportunities to hundreds of deserving students who can't afford to pay or go elsewhere.",
          lesson: "Sometimes protecting constitutional rights requires taking a stand against corruption!"
        }
      ],
      constitutional_concept: "Right to Equality in Education & Anti-Corruption",
      fun_fact: "📚 The Right to Education is a fundamental right that should be accessible without corruption or discrimination!"
    }
  ],
  adult: [
    {
      id: "a1",
      title: "The Rural Land Rights Dispute",
      character: { name: "Rajiv", age: 32, avatar: "👨‍🌾", personality: "determined and community-oriented" },
      setting: { location: "Remote Village", time: "Farming Season", mood: "concerned" },
      story: "Rajiv, a farmer, discovers that a large corporation has obtained rights to village common land through manipulated documents, threatening the livelihoods of 200 families.",
      situation: "Local officials seem to be cooperating with the corporation. When villagers protest, they face intimidation. The company plans to start construction within weeks.",
      challenge: "What legal recourse does Rajiv have to protect community land rights?",
      choices: [
        {
          id: 'a',
          text: "⚖️ Organize villagers to file a collective PIL with evidence of document fraud",
          explanation: "Excellent strategy! The Constitution under Article 21 protects livelihood rights. The Forest Rights Act and land protection laws give communities legal standing to challenge fraudulent land acquisition.",
          isCorrect: true,
          outcome: "The court issues a stay order and investigates the fraud. The village common lands are protected, and the officials involved face inquiry.",
          xpGain: 40,
          badge: "Land Rights Defender"
        },
        {
          id: 'b',
          text: "💰 Negotiate for monetary compensation and accept the land transfer",
          explanation: "Community land rights often extend beyond monetary value. The Constitution and laws protect traditional rights that can't simply be bought out through potentially exploitative deals.",
          isCorrect: false,
          outcome: "The compensation is inadequate, most families struggle after losing their livelihoods, and the community's sustainable farming practices are lost.",
          lesson: "Constitutional and traditional rights sometimes need to be defended rather than compromised!"
        },
        {
          id: 'c',
          text: "⚔️ Physically block construction equipment from entering village lands",
          explanation: "While protecting land rights is important, direct confrontation could lead to violence and legal consequences without resolving the underlying legal issue.",
          isCorrect: false,
          outcome: "The confrontation leads to arrests and gives the corporation justification to bring in security forces. The legal aspects remain unaddressed.",
          lesson: "Legal strategies are often more effective for protecting constitutional rights than direct confrontation!"
        }
      ],
      constitutional_concept: "Land Rights & Access to Justice",
      fun_fact: "🌾 India's legal framework recognizes community forest rights and traditional land use patterns!"
    },
    {
      id: "a2",
      title: "The Whistleblower's Dilemma",
      character: { name: "Dr. Mehra", age: 45, avatar: "👩‍⚕️", personality: "ethical and courageous" },
      setting: { location: "Government Hospital", time: "During audit", mood: "conflicted" },
      story: "Dr. Mehra discovers that substandard medicines are being purchased due to corruption, resulting in treatment failures and patient harm.",
      situation: "When she raises concerns internally, her superiors threaten to transfer her to a remote location. The procurement official offers to 'include her' in the scheme for a share of profits.",
      challenge: "How should Dr. Mehra address this corruption affecting patient care?",
      choices: [
        {
          id: 'a',
          text: "🔍 Document evidence and report to anti-corruption bureau and medical council",
          explanation: "Exactly right! The Right to Life includes the right to proper healthcare. The Whistleblowers Protection Act is designed to protect those who expose corruption affecting public interest.",
          isCorrect: true,
          outcome: "An investigation leads to the removal of corrupt officials and improved procurement practices. Patient outcomes improve significantly with quality medicine.",
          xpGain: 40,
          badge: "Integrity Champion"
        },
        {
          id: 'b',
          text: "🤐 Request transfer to another department and stay silent",
          explanation: "Healthcare corruption directly threatens patients' right to life. Medical ethics and constitutional duties require addressing such serious threats to public health.",
          isCorrect: false,
          outcome: "The corruption continues, more patients suffer from ineffective treatments, and the problem spreads to other departments.",
          lesson: "Protecting constitutional rights sometimes requires moral courage to expose wrongdoing!"
        },
        {
          id: 'c',
          text: "🗣️ Leak the story anonymously to media without proper evidence",
          explanation: "While exposing corruption is important, unverified media leaks might not lead to proper investigation and could compromise Dr. Mehra's credibility and protection.",
          isCorrect: false,
          outcome: "The story creates temporary outrage but fades without action. Without proper evidence collection, the corrupt practices quickly resume.",
          lesson: "Effective whistleblowing requires proper documentation and following appropriate channels!"
        }
      ],
      constitutional_concept: "Right to Health & Anti-Corruption",
      fun_fact: "💉 The Supreme Court has recognized quality healthcare as part of the fundamental right to life!"
    },
    {
      id: "a3",
      title: "The Interfaith Marriage Challenge",
      character: { name: "Priya and Omar", age: 28, avatar: "👩👨", personality: "loving and determined" },
      setting: { location: "Suburban Town", time: "Wedding preparations", mood: "anxious" },
      story: "Priya (Hindu) and Omar (Muslim) have been in love for years and decide to get married. Both are adults with stable jobs who have their parents' blessings.",
      situation: "Local political groups threaten to stop their marriage, claiming 'love jihad.' The couple receives threats, and the marriage registrar seems reluctant to proceed despite all documents being in order.",
      challenge: "How should the couple proceed with their constitutional right to marry?",
      choices: [
        {
          id: 'a',
          text: "⚖️ Apply for court protection while filing marriage under Special Marriage Act",
          explanation: "Perfect strategy! The right to marry is protected under Article 21. The Special Marriage Act specifically allows interfaith marriages, and courts have repeatedly upheld the right of adults to choose their partners.",
          isCorrect: true,
          outcome: "The court provides protection, their marriage is registered legally, and the case helps strengthen precedent protecting interfaith marriages.",
          xpGain: 40,
          badge: "Personal Liberty Defender"
        },
        {
          id: 'b',
          text: "🥺 Cancel their wedding plans to avoid controversy",
          explanation: "The right to marry a person of one's choice has been recognized as a fundamental right under Article 21. Giving up this right due to pressure undermines constitutional freedoms.",
          isCorrect: false,
          outcome: "The couple lives in regret, and similar intimidation continues against other couples, further eroding constitutional rights to personal choice.",
          lesson: "Constitutional rights to personal liberty should be defended against social pressure and intimidation!"
        },
        {
          id: 'c',
          text: "😞 Have one partner convert to the other's religion to appease protesters",
          explanation: "Forced or pressured religious conversion goes against freedom of religion. The Special Marriage Act specifically allows marriage without religious conversion.",
          isCorrect: false,
          outcome: "The conversion under pressure creates resentment. Their fundamental right to marry while maintaining their individual religious identities is compromised.",
          lesson: "The Constitution protects both religious freedom and the right to marry - you shouldn't have to sacrifice one for the other!"
        }
      ],
      constitutional_concept: "Right to Personal Liberty & Freedom of Religion",
      fun_fact: "💍 India's Special Marriage Act of 1954 specifically enables marriages between people of different religions!"
    },
    {
      id: "a4",
      title: "The Free Press Investigation",
      character: { name: "Kavita", age: 35, avatar: "👩‍💻", personality: "investigative and principled" },
      setting: { location: "News Office", time: "Breaking story deadline", mood: "pressured" },
      story: "Journalist Kavita uncovers evidence that a powerful politician is involved in illegal mining operations causing environmental damage and displacing tribal communities.",
      situation: "As she prepares to publish, she receives threats and her editor faces pressure from advertisers to drop the story. Government officials hint at regulatory action against the publication.",
      challenge: "How should Kavita proceed with this important but risky story?",
      choices: [
        {
          id: 'a',
          text: "📊 Ensure impeccable fact-checking and publish with strong legal review",
          explanation: "Excellent choice! Freedom of press is essential for democracy. Article 19(1)(a) protects press freedom, and the courts have upheld the media's role in exposing matters of public interest.",
          isCorrect: true,
          outcome: "The well-researched story withstands legal scrutiny, leads to official investigations, and environmental protections for the affected areas.",
          xpGain: 40,
          badge: "Press Freedom Champion"
        },
        {
          id: 'b',
          text: "🔄 Water down the story to remove direct references to the politician",
          explanation: "Self-censorship undermines press freedom and the public's right to information about matters of public interest, which are protected by the Constitution.",
          isCorrect: false,
          outcome: "The diluted story fails to create accountability. The illegal mining continues, causing more environmental damage and community displacement.",
          lesson: "Press freedom requires courage to publish well-verified stories that serve the public interest!"
        },
        {
          id: 'c',
          text: "📱 Publish unverified allegations on social media instead",
          explanation: "While exposing wrongdoing is important, responsible journalism requires proper verification. Publishing unverified information could lead to legal liability.",
          isCorrect: false,
          outcome: "The hastily published claims contain inaccuracies that damage credibility. The story is dismissed as fake news, and the real issues remain unaddressed.",
          lesson: "Freedom of press comes with responsibility for accuracy and fairness!"
        }
      ],
      constitutional_concept: "Freedom of Press & Public Interest",
      fun_fact: "📰 India's Supreme Court has called the free press the 'Ark of the Covenant of Democracy'!"
    }
  ]
};