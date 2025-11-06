import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronLeft,
  Heart,
  HeartCrack,
  Trophy,
  Home,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { additionalScenarios } from '../data/additionalScenarios';
import { constitutionalScenarios } from '../data/constitutionalScenarios';

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
          consequence: 'The article causes significant disruption in school. Some students use it to disrespect teachers.',
          isCorrect: false,
          explanation: 'While freedom of speech is important, it comes with reasonable restrictions to prevent harm and maintain order.'
        },
        {
          text: 'Edit out personal attacks but keep the valid concerns',
          consequence: 'The article is published with constructive criticism that leads to positive changes in school.',
          isCorrect: true,
          explanation: 'Well done! Free speech (Article 19) has reasonable restrictions. Constructive criticism is protected, personal attacks aren\'t.'
        }
      ]
    }
  ],
  adult: [
    {
      id: 'workplace-discrimination',
      title: 'The Job Interview',
      setting: 'A corporate office',
      description: 'You\'re interviewing for your dream job. During the interview, they ask personal questions about your plans to have children and your marital status.',
      character: '💼',
      situation: 'The interviewer says they prefer candidates without "family distractions." How do you respond?',
      options: [
        {
          text: 'Answer all personal questions to improve chances of getting hired',
          consequence: 'You get the job but the company continues discriminatory practices against others.',
          isCorrect: false,
          explanation: 'These questions represent gender discrimination prohibited under Article 15 of the Constitution.'
        },
        {
          text: 'Politely explain that these questions are not relevant to your professional qualifications',
          consequence: 'You respectfully assert your rights and steer the conversation back to your skills.',
          isCorrect: true,
          explanation: 'Excellent! You upheld the constitutional principle of equality and non-discrimination in the workplace.'
        }
      ]
    }
  ]
};

// Fisher-Yates shuffle algorithm for randomizing scenarios
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

// Combine scenarios from original, additional, and constitutional sources
const combineScenarios = () => {
  const combined = {
    child: [...scenarios.child],
    teen: [...scenarios.teen],
    adult: [...scenarios.adult]
  };
  
  // Add additional scenarios if they exist
  if (additionalScenarios) {
    if (additionalScenarios.child) combined.child = [...combined.child, ...additionalScenarios.child];
    if (additionalScenarios.teen) combined.teen = [...combined.teen, ...additionalScenarios.teen];
    if (additionalScenarios.adult) combined.adult = [...combined.adult, ...additionalScenarios.adult];
  }
  
  // Add constitutional scenarios if they exist
  if (constitutionalScenarios) {
    if (constitutionalScenarios.child) combined.child = [...combined.child, ...constitutionalScenarios.child];
    if (constitutionalScenarios.teen) combined.teen = [...combined.teen, ...constitutionalScenarios.teen];
    if (constitutionalScenarios.adult) combined.adult = [...combined.adult, ...constitutionalScenarios.adult];
  }
  
  return combined;
};

const SituationGameWithLives = () => {
  const { user, addXP, updateGameProgress, addAchievement } = useUser();
  const ageGroup = user?.ageGroup || 'teen';
  
  // Game state
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameScenarios, setGameScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  
  // Hearts/lives system
  const [lives, setLives] = useState(3);
  
  // Stats
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  // Initialize game
  useEffect(() => {
    // Combine and shuffle scenarios
    const allScenarios = combineScenarios();
    let scenariosForGame = allScenarios[ageGroup] || [];
    
    // Shuffle the scenarios
    scenariosForGame = shuffleArray([...scenariosForGame]);
    
    // Limit to 10 scenarios or less if not enough are available
    scenariosForGame = scenariosForGame.slice(0, Math.min(10, scenariosForGame.length));
    
    setGameScenarios(scenariosForGame);
    setTotalQuestions(scenariosForGame.length);
    setLoading(false);
  }, [ageGroup]);

  // Helper function to get standardized options from any scenario format
  const getScenarioOptions = (scenario) => {
    // If the scenario has "options" property (from original scenarios format)
    if (scenario.options) {
      return scenario.options;
    }
    // If the scenario has "choices" property (from new constitutional scenarios format)
    else if (scenario.choices) {
      return scenario.choices.map(choice => ({
        text: choice.text,
        consequence: choice.outcome || choice.lesson || '',
        isCorrect: choice.isCorrect,
        explanation: choice.explanation
      }));
    }
    // Fallback empty array if no options found
    return [];
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowExplanation(true);
    
    // Calculate XP gain - for new format scenarios that specify xpGain
    let xpGained = 10; // Default XP gain
    if (option.isCorrect && option.xpGain) {
      xpGained = option.xpGain;
    }
    
    if (option.isCorrect) {
      setScore(score + xpGained);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      // Lose a heart for incorrect answer
      setLives(lives - 1);
      
      // Check if game over due to losing all lives
      if (lives <= 1) {
        // Will be 0 after state update, ending the game
        setTimeout(() => handleGameOver(), 1500);
      }
    }
  };

  // Move to next scenario
  const nextScenario = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    // Check if this was the last scenario
    if (currentScenarioIndex >= gameScenarios.length - 1) {
      handleGameOver();
    } else {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    }
  };

  // Handle game over
  const handleGameOver = () => {
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update game progress in user context
    updateGameProgress('situationGame', {
      score: finalScore,
      correctAnswers,
      totalQuestions,
      xpGained: score
    });
    
    // Add XP gained during the game
    addXP(score);
    
    // Award achievements based on performance
    if (finalScore === 100) {
      addAchievement('constitutional-expert');
    } else if (finalScore >= 80) {
      addAchievement('rights-defender');
    }
    
    // Set game over state to show final screen
    setGameOver(true);
  };

  // Restart the game
  const restartGame = () => {
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setLives(3);
    setCorrectAnswers(0);
    setGameOver(false);
    
    // Reshuffle scenarios
    const allScenarios = combineScenarios();
    let scenariosForGame = allScenarios[ageGroup] || [];
    scenariosForGame = shuffleArray([...scenariosForGame]);
    scenariosForGame = scenariosForGame.slice(0, Math.min(10, scenariosForGame.length));
    setGameScenarios(scenariosForGame);
    setTotalQuestions(scenariosForGame.length);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-amber-50">
        <div className="w-16 h-16 border-t-4 border-amber-600 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-amber-800">Loading constitutional scenarios...</p>
      </div>
    );
  }

  if (gameOver) {
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    let performanceMessage = "";
    let performanceColor = "";
    
    if (finalScore === 100) {
      performanceMessage = "Constitutional Expert! Perfect score!";
      performanceColor = "text-yellow-700";
    } else if (finalScore >= 80) {
      performanceMessage = "Rights Defender! Great understanding of constitutional principles!";
      performanceColor = "text-blue-700";
    } else if (finalScore >= 60) {
      performanceMessage = "Legal Learner! You're on your way to understanding the Constitution!";
      performanceColor = "text-green-700";
    } else {
      performanceMessage = "Constitution Novice. Keep learning about your rights!";
      performanceColor = "text-amber-700";
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-4 bg-amber-50"
      >
        <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg">
          <h1 className="flex items-center justify-center mb-2 text-3xl font-bold text-amber-800">
            <Trophy className="mr-2 text-amber-600" />
            Game Complete!
          </h1>
          
          <p className={`text-center mb-6 ${performanceColor} font-medium`}>
            {performanceMessage}
          </p>
          
          <div className="p-4 mb-6 bg-amber-100 rounded-lg">
            <h2 className="mb-4 text-xl font-semibold text-center text-amber-800">Constitutional Challenge Results</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                <p className="text-sm text-amber-600">Final Score</p>
                <p className="text-3xl font-bold text-amber-800">{finalScore}%</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                <p className="text-sm text-amber-600">XP Earned</p>
                <p className="text-3xl font-bold text-amber-800">{score}</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                <p className="text-sm text-amber-600">Correct Answers</p>
                <p className="text-3xl font-bold text-amber-800">{correctAnswers}/{totalQuestions}</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                <p className="text-sm text-amber-600">Hearts Remaining</p>
                <div className="flex">
                  {[...Array(lives)].map((_, i) => (
                    <Heart key={i} className="w-6 h-6 text-red-500" fill="#ef4444" />
                  ))}
                  {[...Array(3 - lives)].map((_, i) => (
                    <HeartCrack key={i} className="w-6 h-6 text-gray-400" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-center text-amber-600 font-semibold">
                Constitutional Learning Progress
              </p>
              <div className="w-full bg-amber-200 rounded-full h-4 mt-2">
                <div 
                  className="bg-amber-600 h-4 rounded-full" 
                  style={{ width: `${finalScore}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {finalScore === 100 && (
            <div className="p-4 mb-6 text-center bg-yellow-100 rounded-lg">
              <Award className="inline-block w-8 h-8 mb-2 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-800">Achievement Unlocked!</h3>
              <p className="text-yellow-700">Constitutional Expert</p>
            </div>
          )}
          
          {finalScore >= 80 && finalScore < 100 && (
            <div className="p-4 mb-6 text-center bg-blue-100 rounded-lg">
              <Award className="inline-block w-8 h-8 mb-2 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Achievement Unlocked!</h3>
              <p className="text-blue-700">Rights Defender</p>
            </div>
          )}
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={restartGame}
              className="flex items-center px-6 py-2 text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </button>
            
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center px-6 py-2 text-white transition-colors rounded-lg bg-stone-600 hover:bg-stone-700"
            >
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentScenario = gameScenarios[currentScenarioIndex];

  if (!currentScenario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-amber-50">
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <AlertCircle className="w-16 h-16 mx-auto text-amber-600" />
          <h1 className="mt-4 text-2xl font-bold text-center text-amber-800">No Scenarios Found</h1>
          <p className="mt-2 text-center text-amber-600">
            We couldn't find any scenarios for your age group. Please try again later.
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center px-6 py-2 text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-amber-50"
    >
      {/* Top navigation bar with back button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => window.location.href = '/games'}
          className="flex items-center px-3 py-1 text-white bg-stone-700 rounded-full hover:bg-stone-800"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </div>
      
      {/* Game stats display */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {/* Score display */}
        <div className="px-3 py-1 flex items-center bg-amber-600 text-white rounded-full">
          <Trophy className="w-5 h-5 mr-1" />
          <span className="font-semibold">{score} points</span>
        </div>
        
        {/* Hearts/Lives display */}
        <div className="flex items-center">
          {[...Array(lives)].map((_, i) => (
            <Heart key={i} className="w-6 h-6 mr-1 text-red-500" fill="#ef4444" />
          ))}
          {[...Array(3 - lives)].map((_, i) => (
            <HeartCrack key={i} className="w-6 h-6 mr-1 text-gray-400" />
          ))}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute top-16 right-4 flex items-center gap-2">
        <span className="px-3 py-1 text-sm text-white bg-amber-700 rounded-full">
          Scenario {currentScenarioIndex + 1}/{gameScenarios.length}
        </span>
        
        <span className="px-3 py-1 text-sm text-white bg-green-700 rounded-full">
          Correct: {correctAnswers}/{currentScenarioIndex + (selectedOption && selectedOption.isCorrect ? 1 : 0)}
        </span>
      </div>

      <div className="w-full max-w-4xl p-6 mt-16 bg-white rounded-xl shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-amber-800">
          {currentScenario.title}
        </h2>

        <div className="p-4 mb-6 bg-amber-50 rounded-lg">
          <p className="mb-2 text-sm text-amber-700">
            <span className="mr-2 font-medium">Setting:</span>
            {typeof currentScenario.setting === 'string' 
              ? currentScenario.setting 
              : currentScenario.setting?.location || ''}
            {currentScenario.setting?.time && 
              <span className="ml-2">• {currentScenario.setting.time}</span>}
          </p>
          
          {/* Character info */}
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 mr-3 text-2xl">
              {typeof currentScenario.character === 'string'
                ? currentScenario.character
                : currentScenario.character?.avatar || '👤'}
            </div>
            <div className="flex-1">
              {currentScenario.character?.name && (
                <p className="font-medium text-amber-800">
                  {currentScenario.character.name}, {currentScenario.character.age} years old
                </p>
              )}
              {currentScenario.character?.personality && (
                <p className="text-sm italic text-amber-700">{currentScenario.character.personality}</p>
              )}
            </div>
          </div>
          
          {/* Story or Description */}
          <p className="mb-4 text-amber-900">
            {currentScenario.story || currentScenario.description}
          </p>
          
          {/* Situation */}
          <div className="p-3 bg-amber-100 rounded-lg mb-4">
            <p className="text-amber-800">
              {currentScenario.situation}
            </p>
          </div>
          
          {/* Challenge question if available */}
          {currentScenario.challenge && (
            <div className="p-3 bg-amber-200 rounded-lg">
              <p className="font-medium text-amber-900">
                {currentScenario.challenge}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {/* Support both scenario formats - options from original format and choices from constitutional format */}
          {getScenarioOptions(currentScenario).map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !selectedOption && handleOptionClick(option)}
              className={`w-full p-4 text-left rounded-lg transition-colors border ${
                selectedOption === option
                  ? option.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : selectedOption
                  ? 'border-stone-300 bg-stone-50 opacity-70'
                  : 'border-amber-300 bg-amber-50 hover:bg-amber-100'
              }`}
              whileHover={!selectedOption ? { scale: 1.01 } : {}}
              whileTap={!selectedOption ? { scale: 0.99 } : {}}
              disabled={!!selectedOption}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {selectedOption === option && (
                    option.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )
                  )}
                </div>
                <div>
                  <p className="font-medium">{option.text}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showExplanation && selectedOption && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-6 p-4 rounded-lg ${
                selectedOption.isCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {selectedOption.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${
                    selectedOption.isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedOption.consequence}
                  </p>
                  <p className={`mt-2 ${
                    selectedOption.isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {selectedOption.explanation}
                  </p>
                  {selectedOption.isCorrect && (
                    <div className="flex items-center mt-2 text-amber-700">
                      <Star className="w-5 h-5 mr-1 text-yellow-500" />
                      <span>+{selectedOption.xpGain || 10} XP gained!</span>
                    </div>
                  )}
                  
                  {/* Show constitutional concept if available */}
                  {currentScenario.constitutional_concept && selectedOption.isCorrect && (
                    <div className="flex items-start mt-3 p-2 bg-blue-50 rounded-lg">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-700 mt-1" />
                      <div>
                        <p className="text-blue-800 font-medium">Constitutional Learning:</p>
                        <p className="text-blue-700">{currentScenario.constitutional_concept}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={nextScenario}
                  className="flex items-center px-4 py-2 text-white transition-colors rounded-md bg-amber-600 hover:bg-amber-700"
                >
                  {currentScenarioIndex >= gameScenarios.length - 1 ? 'See Results' : 'Next Scenario'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SituationGameWithLives;