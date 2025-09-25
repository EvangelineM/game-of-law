import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Star,
  BookOpen,
  Scale,
  Award,
  ChevronLeft
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

// Situation-based scenarios with constitutional decisions
const scenarios = {
  child: [
    {
      id: 'school-discrimination',
      title: 'The New Student',
      setting: 'Your school playground',
      description: 'A new student, Priya, joins your class. She speaks a different language and follows a different religion. Some students say she can\'t play with them.',
      character: '🧒',
      situation: 'You see Priya sitting alone during lunch break. Other students are avoiding her because she\'s "different". What should you do?',
      options: [
        {
          text: 'Ignore her like everyone else',
          consequence: 'Priya feels sad and excluded. This goes against the idea that everyone should be treated equally.',
          isCorrect: false,
          explanation: 'The Constitution says everyone deserves equal treatment regardless of religion or language.'
        },
        {
          text: 'Go sit with her and be her friend',
          consequence: 'Priya smiles and you both have a great time! You learn about her culture and she learns about yours.',
          isCorrect: true,
          explanation: 'Perfect! You showed Unity in Diversity - accepting differences while being united as friends.'
        },
        {
          text: 'Tell the teacher about the other students',
          consequence: 'Good thinking! The teacher talks to the class about treating everyone fairly and kindly.',
          isCorrect: true,
          explanation: 'Excellent! You helped ensure everyone gets equal treatment, just like Article 14 says.'
        },
        {
          text: 'Ask her to change her ways to fit in',
          consequence: 'This makes Priya feel bad about who she is. Everyone should be proud of their identity.',
          isCorrect: false,
          explanation: 'The Constitution protects the right to maintain one\'s culture and religion (Articles 25-30).'
        }
      ]
    },
    {
      id: 'child-labor',
      title: 'The Working Child',
      setting: 'Near your neighborhood shop',
      description: 'You see a child your age working at a tea stall instead of going to school. The shop owner says the child needs to work to help his family.',
      character: '👦',
      situation: 'The child tells you he wants to go to school but has to work all day. What should you do?',
      options: [
        {
          text: 'Think it\'s okay because he\'s helping his family',
          consequence: 'The child misses out on education and a better future. All children deserve to learn.',
          isCorrect: false,
          explanation: 'Article 24 says children under 14 should not work, and Article 21A guarantees free education.'
        },
        {
          text: 'Tell your parents or teacher about this',
          consequence: 'Adults help contact authorities who ensure the child gets to go to school while the family gets proper support.',
          isCorrect: true,
          explanation: 'Great! You helped protect a child\'s right to education and freedom from harmful work.'
        },
        {
          text: 'Give him your school books',
          consequence: 'Kind gesture, but he still can\'t attend school regularly. The real problem needs to be solved.',
          isCorrect: false,
          explanation: 'While kind, this doesn\'t solve the root problem. Authorities need to ensure his rights are protected.'
        },
        {
          text: 'Ignore the situation',
          consequence: 'The child continues to miss school and work in conditions that aren\'t safe for children.',
          isCorrect: false,
          explanation: 'We all have a duty to protect children\'s rights when we see them being violated.'
        }
      ]
    }
  ],
  teen: [
    {
      id: 'free-speech-limits',
      title: 'The School Newspaper Dilemma',
      setting: 'Your school editorial office',
      description: 'You\'re the editor of your school newspaper. A student wants to publish an article criticizing the school administration, but some content might disturb peace in school.',
      character: '📰',
      situation: 'The article contains valid concerns but also some harsh personal attacks on teachers. The principal warns you not to publish it. What do you do?',
      options: [
        {
          text: 'Publish the article as written',
          consequence: 'The article creates unnecessary conflict and personal attacks on teachers. Free speech has reasonable limits.',
          isCorrect: false,
          explanation: 'Article 19(1)(a) guarantees free speech, but Article 19(2) allows reasonable restrictions for public order.'
        },
        {
          text: 'Refuse to publish anything critical',
          consequence: 'You give up your right entirely. Valid concerns remain unaddressed.',
          isCorrect: false,
          explanation: 'Complete censorship violates free speech rights. Constructive criticism is protected.'
        },
        {
          text: 'Edit to keep valid concerns, remove personal attacks',
          consequence: 'You publish meaningful criticism while maintaining respect. Issues get addressed constructively.',
          isCorrect: true,
          explanation: 'Perfect balance! You exercised free speech responsibly while respecting reasonable restrictions.'
        },
        {
          text: 'Let the student publish it elsewhere',
          consequence: 'You avoid the decision but don\'t help balance rights and responsibilities.',
          isCorrect: false,
          explanation: 'As an editor, you have the responsibility to balance free speech with its reasonable limits.'
        }
      ]
    },
    {
      id: 'religious-freedom',
      title: 'The Prayer Assembly Conflict',
      setting: 'Your school assembly hall',
      description: 'Your school wants to start daily prayers, but students follow different religions. Some parents object while others support it.',
      character: '🙏',
      situation: 'As student council president, you need to find a solution that respects everyone\'s religious freedom. What do you propose?',
      options: [
        {
          text: 'Have prayers from the majority religion only',
          consequence: 'Students from minority religions feel excluded and discriminated against.',
          isCorrect: false,
          explanation: 'This violates Article 25 (freedom of religion) and Article 14 (equality). All religions must be treated equally.'
        },
        {
          text: 'Ban all religious activities in school',
          consequence: 'This goes too far and stops those who want to practice their faith.',
          isCorrect: false,
          explanation: 'Article 25 protects the right to practice religion. Complete ban isn\'t necessary for secularism.'
        },
        {
          text: 'Rotate prayers from different religions weekly',
          consequence: 'Everyone gets represented, but some might still feel forced to participate in others\' prayers.',
          isCorrect: false,
          explanation: 'While inclusive, it might still compel participation in others\' religious practices.'
        },
        {
          text: 'Make prayer time optional with a secular alternative',
          consequence: 'Students can choose to pray according to their faith or participate in secular reflection time.',
          isCorrect: true,
          explanation: 'Excellent! This respects both freedom of religion (Article 25) and freedom from religion (Article 28).'
        }
      ]
    },
    {
      id: 'equality-reservation',
      title: 'The College Admission Debate',
      setting: 'Career counseling session',
      description: 'Two friends with similar grades apply to the same college. One gets in through general category, another through reservation. This creates tension.',
      character: '🎓',
      situation: 'Your friend is upset about reservations, saying "it\'s not fair that people get advantages based on their caste." How do you explain the constitutional perspective?',
      options: [
        {
          text: 'Agree that reservations are unfair',
          consequence: 'This ignores historical injustices and the need for corrective measures.',
          isCorrect: false,
          explanation: 'Article 15(4) and 16(4) allow special provisions for socially and educationally backward classes.'
        },
        {
          text: 'Say reservations should be abolished',
          consequence: 'This would ignore the constitutional mandate to ensure substantive equality.',
          isCorrect: false,
          explanation: 'The Constitution requires affirmative action to achieve real equality, not just formal equality.'
        },
        {
          text: 'Explain reservations as temporary measures for historical justice',
          consequence: 'Your friend understands that true equality sometimes requires different treatment to level the playing field.',
          isCorrect: true,
          explanation: 'Perfect! You explained that equality means equal opportunity, which sometimes requires corrective measures.'
        },
        {
          text: 'Avoid the topic to prevent arguments',
          consequence: 'The misunderstanding continues, and your friend remains uninformed about constitutional principles.',
          isCorrect: false,
          explanation: 'As informed citizens, we should help others understand constitutional principles and social justice.'
        }
      ]
    }
  ],
  adult: [
    {
      id: 'emergency-powers-dilemma',
      title: 'The Emergency Decision',
      setting: 'Government crisis meeting',
      description: 'You\'re a senior advisor during a national crisis. There are widespread protests, and the government is considering declaring emergency to maintain order.',
      character: '🏛️',
      situation: 'The Prime Minister asks your advice on declaring National Emergency under Article 352. The situation is serious but not an external threat. What do you advise?',
      options: [
        {
          text: 'Declare emergency immediately to restore order',
          consequence: 'Fundamental rights get suspended unnecessarily. The cure becomes worse than the disease.',
          isCorrect: false,
          explanation: 'Emergency can only be declared on grounds of war, external aggression, or armed rebellion, not internal protests.'
        },
        {
          text: 'Use normal law and order machinery',
          consequence: 'You uphold constitutional governance while addressing the crisis through existing legal mechanisms.',
          isCorrect: true,
          explanation: 'Correct! Emergency should be the last resort. Normal protests don\'t justify suspending the Constitution.'
        },
        {
          text: 'Declare President\'s Rule in affected states',
          consequence: 'This could be constitutional if state machinery breaks down, but needs careful justification.',
          isCorrect: false,
          explanation: 'Article 356 requires breakdown of constitutional machinery, not just law and order problems.'
        },
        {
          text: 'Recommend banning all protests',
          consequence: 'This violates fundamental rights without proper constitutional procedure.',
          isCorrect: false,
          explanation: 'Right to peaceful assembly (Article 19) can only be restricted through reasonable limitations, not total bans.'
        }
      ]
    },
    {
      id: 'judicial-independence',
      title: 'The Judicial Transfer Controversy',
      setting: 'Supreme Court collegium meeting',
      description: 'As a Supreme Court judge, you\'re part of the collegium. The government wants to transfer a High Court judge who gave unfavorable verdicts.',
      character: '⚖️',
      situation: 'The government pressures the collegium to transfer the judge to a "less important" High Court. The judge has been fair but ruled against government policies. What do you do?',
      options: [
        {
          text: 'Agree to the transfer to maintain government relations',
          consequence: 'Judicial independence gets compromised. Future judges might fear taking independent decisions.',
          isCorrect: false,
          explanation: 'This would violate the basic structure doctrine. Judicial independence is non-negotiable.'
        },
        {
          text: 'Refuse the transfer and make it public',
          consequence: 'You protect judicial independence but might create a constitutional crisis.',
          isCorrect: false,
          explanation: 'While protecting independence is right, public confrontation might not be the best initial approach.'
        },
        {
          text: 'Refuse the transfer based on merit and seniority',
          consequence: 'You uphold judicial independence while following established constitutional procedures.',
          isCorrect: true,
          explanation: 'Perfect! You protected judicial independence using established constitutional principles and procedures.'
        },
        {
          text: 'Ask the judge to be more government-friendly',
          consequence: 'This compromises judicial independence and the rule of law.',
          isCorrect: false,
          explanation: 'Judges must decide based on law and constitution, not government preferences. This violates judicial independence.'
        }
      ]
    },
    {
      id: 'privacy-vs-security',
      title: 'The Digital Surveillance Dilemma',
      setting: 'Parliamentary committee on technology',
      description: 'After a terrorist attack, the government proposes mass surveillance of all digital communications to prevent future attacks.',
      character: '📱',
      situation: 'As a constitutional expert advising the committee, you must balance national security with the right to privacy established in Puttaswamy case. What do you recommend?',
      options: [
        {
          text: 'Allow unrestricted surveillance for security',
          consequence: 'Citizens\' privacy rights get violated without proper safeguards, creating a surveillance state.',
          isCorrect: false,
          explanation: 'Puttaswamy case established that privacy restrictions must be necessary, proportionate, and have procedural safeguards.'
        },
        {
          text: 'Completely reject all surveillance proposals',
          consequence: 'Security needs are ignored entirely, which might not be practical in modern times.',
          isCorrect: false,
          explanation: 'Rights can have reasonable restrictions for security, but they must meet constitutional tests.'
        },
        {
          text: 'Propose targeted surveillance with judicial oversight',
          consequence: 'You balance security needs with privacy rights through constitutional safeguards.',
          isCorrect: true,
          explanation: 'Excellent! This meets the Puttaswamy tests: necessity, proportionality, and procedural safeguards.'
        },
        {
          text: 'Leave the decision to executive discretion',
          consequence: 'This removes constitutional checks and balances, potentially leading to abuse of power.',
          isCorrect: false,
          explanation: 'Constitutional rights need judicial oversight, not just executive discretion, to prevent abuse.'
        }
      ]
    }
  ]
};

export default function SituationBasedGame() {
  const { user, addXP, addAchievement } = useUser();
  const [currentScenario, setCurrentScenario] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const ageGroup = user.ageGroup || 'teen';
  const availableScenarios = scenarios[ageGroup] || scenarios.teen;

  const startGame = () => {
    setCurrentScenario(availableScenarios[0]);
    setScenarioIndex(0);
    setScore(0);
    setGameStarted(true);
    setGameComplete(false);
  };

  const selectOption = (optionIndex) => {
    if (showResult) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    const option = currentScenario.options[optionIndex];
    if (option.isCorrect) {
      setScore(score + 1);
      addXP(25);
    }
  };

  const nextScenario = () => {
    if (scenarioIndex + 1 < availableScenarios.length) {
      const nextIndex = scenarioIndex + 1;
      setScenarioIndex(nextIndex);
      setCurrentScenario(availableScenarios[nextIndex]);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameComplete(true);
    setGameStarted(false);
    
    if (score === availableScenarios.length) {
      addAchievement('constitutional-expert');
    }
    if (score >= Math.ceil(availableScenarios.length * 0.8)) {
      addAchievement('justice-seeker');
    }
  };

  const resetGame = () => {
    setCurrentScenario(null);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setScenarioIndex(0);
    setGameStarted(false);
    setGameComplete(false);
  };

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Scale className="w-10 h-10" />
              </motion.div>
              
              <h1 className="text-3xl font-bold mb-2">Constitutional Scenarios</h1>
              <p className="text-indigo-100 text-lg">
                Make decisions based on Constitutional principles
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-stone-800 mb-4">
                  Experience Real-Life Constitutional Dilemmas
                </h2>
                <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  Face realistic scenarios where you'll apply constitutional principles to make important decisions. 
                  Learn how the Constitution guides us in complex situations.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-bold text-stone-800 mb-2">Real Scenarios</h3>
                  <p className="text-sm text-stone-600">Face situations based on actual constitutional challenges</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-stone-800 mb-2">Learn by Doing</h3>
                  <p className="text-sm text-stone-600">Understand how constitutional principles work in practice</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-bold text-stone-800 mb-2">Gain Insights</h3>
                  <p className="text-sm text-stone-600">Get detailed explanations for each decision</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-stone-600 mb-6">
                  Ready to test your constitutional knowledge with {availableScenarios.length} scenarios?
                </p>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <span>Start Scenarios</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const percentage = Math.round((score / availableScenarios.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
          >
            {/* Results Header */}
            <div className={`p-8 text-white text-center ${
              percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
              percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-red-500 to-red-600'
            }`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Scale className="w-12 h-12" />
              </motion.div>
              
              <h1 className="text-3xl font-bold mb-2">Scenarios Complete!</h1>
              <p className="text-lg opacity-90">
                {percentage >= 80 ? 'Excellent constitutional understanding!' :
                 percentage >= 60 ? 'Good grasp of constitutional principles!' : 
                 'Keep learning about constitutional values!'}
              </p>
            </div>

            {/* Results Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-stone-800 mb-2">
                  {percentage}%
                </div>
                <div className="text-lg text-stone-600">
                  {score} out of {availableScenarios.length} scenarios handled correctly
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{score * 25}</div>
                  <div className="text-sm text-stone-600">XP Earned</div>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{availableScenarios.length}</div>
                  <div className="text-sm text-stone-600">Scenarios Completed</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
                >
                  Play Again
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 px-8 py-3 rounded-full font-bold transition-all duration-300"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-stone-600">
                Scenario {scenarioIndex + 1} of {availableScenarios.length}
              </span>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-stone-700">{score}</span>
              </div>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((scenarioIndex + 1) / availableScenarios.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Scenario Card */}
        <motion.div
          key={scenarioIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
        >
          {/* Scenario Header */}
          <div className="bg-gradient-to-r from-stone-100 to-stone-200 p-6 border-b border-stone-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{currentScenario.character}</div>
              <div>
                <h2 className="text-2xl font-bold text-stone-800">{currentScenario.title}</h2>
                <p className="text-stone-600">{currentScenario.setting}</p>
              </div>
            </div>
            <p className="text-stone-700 leading-relaxed">{currentScenario.description}</p>
          </div>

          {/* Situation */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-stone-200">
            <h3 className="font-bold text-stone-800 mb-2">The Situation:</h3>
            <p className="text-stone-700 leading-relaxed">{currentScenario.situation}</p>
          </div>

          {/* Options */}
          <div className="p-6">
            <h3 className="font-bold text-stone-800 mb-4">What would you do?</h3>
            <div className="grid gap-4">
              {currentScenario.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectOption(index)}
                  disabled={showResult}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    !showResult 
                      ? 'border-stone-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transform hover:scale-[1.02]'
                      : selectedOption === index
                        ? option.isCorrect 
                          ? 'border-green-400 bg-green-50 text-green-800'
                          : 'border-red-400 bg-red-50 text-red-800'
                        : option.isCorrect && showResult
                          ? 'border-green-400 bg-green-50 text-green-800'
                          : 'border-stone-200 bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 font-bold mt-1">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-2">{option.text}</p>
                      {showResult && (
                        <div className="space-y-2">
                          <p className="text-sm italic">{option.consequence}</p>
                          <p className="text-sm font-medium">{option.explanation}</p>
                        </div>
                      )}
                    </div>
                    {showResult && (
                      <div className="mt-1">
                        {selectedOption === index ? (
                          option.isCorrect ? 
                            <CheckCircle className="w-6 h-6 text-green-600" /> :
                            <XCircle className="w-6 h-6 text-red-600" />
                        ) : option.isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={nextScenario}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <span>{scenarioIndex + 1 < availableScenarios.length ? 'Next Scenario' : 'Complete'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}