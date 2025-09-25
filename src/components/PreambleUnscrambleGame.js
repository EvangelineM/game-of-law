import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shuffle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Star,
  Lightbulb,
  Award,
  Clock,
  Target,
  BookOpen
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

// Preamble words with hints and constitutional context
const preambleWords = [
  {
    word: 'WE',
    scrambled: 'EW',
    hint: 'First word - shows that power comes from the people, not rulers',
    explanation: 'The Preamble starts with "WE" to show that the Constitution is made by the people of India.',
    difficulty: 'easy',
    position: 1
  },
  {
    word: 'THE',
    scrambled: 'HET',
    hint: 'Article word - comes before "PEOPLE"',
    explanation: 'Simple article word that introduces "PEOPLE OF INDIA".',
    difficulty: 'easy',
    position: 2
  },
  {
    word: 'PEOPLE',
    scrambled: 'ELPOEP',
    hint: 'All citizens of India - the real source of power in democracy',
    explanation: 'Shows that in democracy, ultimate power rests with the PEOPLE, not with kings or dictators.',
    difficulty: 'easy',
    position: 3
  },
  {
    word: 'OF',
    scrambled: 'FO',
    hint: 'Preposition - belonging to',
    explanation: 'Simple preposition connecting "PEOPLE" with "INDIA".',
    difficulty: 'easy',
    position: 4
  },
  {
    word: 'INDIA',
    scrambled: 'AIDNI',
    hint: 'Our beloved motherland - the country this Constitution governs',
    explanation: 'Our country name - the nation for which this Constitution was written.',
    difficulty: 'easy',
    position: 5
  },
  {
    word: 'HAVING',
    scrambled: 'GNIVAH',
    hint: 'Present participle - describes an ongoing action or state',
    explanation: 'Indicates that the people possessed something when making the Constitution.',
    difficulty: 'medium',
    position: 6
  },
  {
    word: 'SOLEMNLY',
    scrambled: 'YLLMNEOS',
    hint: 'With great seriousness and respect - how we made our constitutional promise',
    explanation: 'Shows the Constitution was made with deep seriousness and respect, not casually.',
    difficulty: 'medium',
    position: 7
  },
  {
    word: 'RESOLVED',
    scrambled: 'DEVLOSER',
    hint: 'Decided firmly - what the Constitution makers did',
    explanation: 'The people firmly decided to create a new form of government.',
    difficulty: 'medium',
    position: 8
  },
  {
    word: 'TO',
    scrambled: 'OT',
    hint: 'Preposition indicating purpose or direction',
    explanation: 'Shows the purpose of the resolution.',
    difficulty: 'easy',
    position: 9
  },
  {
    word: 'CONSTITUTE',
    scrambled: 'ETUTITSNOC',
    hint: 'To establish or create - what we did to form our nation',
    explanation: 'To establish India as a specific type of nation with defined characteristics.',
    difficulty: 'hard',
    position: 10
  },
  {
    word: 'INDIA',
    scrambled: 'AIDNI',
    hint: 'Our country name appears twice in the Preamble',
    explanation: 'Repeated to emphasize that we are establishing this specific nation.',
    difficulty: 'easy',
    position: 11
  },
  {
    word: 'INTO',
    scrambled: 'OTNI',
    hint: 'Preposition showing transformation',
    explanation: 'Shows the transformation of India into a new form of state.',
    difficulty: 'easy',
    position: 12
  },
  {
    word: 'A',
    scrambled: 'A',
    hint: 'Article - India becomes "a" certain type of nation',
    explanation: 'Article introducing the type of nation India was to become.',
    difficulty: 'easy',
    position: 13
  },
  {
    word: 'SOVEREIGN',
    scrambled: 'NGIERREVOS',
    hint: 'Independent and free - no external power controls India',
    explanation: 'India is free from external control and can make its own decisions.',
    difficulty: 'hard',
    position: 14
  },
  {
    word: 'SOCIALIST',
    scrambled: 'TSILAICOS',
    hint: 'Added in 1976 - believes in social and economic equality',
    explanation: 'Added by 42nd Amendment - promotes social and economic equality for all.',
    difficulty: 'hard',
    position: 15
  },
  {
    word: 'SECULAR',
    scrambled: 'RALUCES',
    hint: 'Added in 1976 - treats all religions equally',
    explanation: 'Added by 42nd Amendment - state treats all religions equally, favors none.',
    difficulty: 'hard',
    position: 16
  },
  {
    word: 'DEMOCRATIC',
    scrambled: 'CITARCOMD',
    hint: 'Government by the people - citizens choose their leaders',
    explanation: 'Government is chosen by the people through elections.',
    difficulty: 'medium',
    position: 17
  },
  {
    word: 'REPUBLIC',
    scrambled: 'CILBUPER',
    hint: 'Head of state is elected, not born - opposite of monarchy',
    explanation: 'The head of state (President) is elected, not a hereditary monarch.',
    difficulty: 'medium',
    position: 18
  },
  {
    word: 'AND',
    scrambled: 'DNA',
    hint: 'Conjunction connecting the goals we want to achieve',
    explanation: 'Connects the type of nation with the goals to be achieved.',
    difficulty: 'easy',
    position: 19
  },
  {
    word: 'TO',
    scrambled: 'OT',
    hint: 'Infinitive marker - introduces our goals',
    explanation: 'Introduces the purposes for which the Constitution was made.',
    difficulty: 'easy',
    position: 20
  },
  {
    word: 'SECURE',
    scrambled: 'ERUCSE',
    hint: 'To protect and guarantee - what we want to do for all citizens',
    explanation: 'To protect and guarantee certain things for all citizens.',
    difficulty: 'medium',
    position: 21
  },
  {
    word: 'TO',
    scrambled: 'OT',
    hint: 'Another "to" - part of listing our goals',
    explanation: 'Part of the structure listing the objectives.',
    difficulty: 'easy',
    position: 22
  },
  {
    word: 'ALL',
    scrambled: 'LLA',
    hint: 'Everyone - no one is left out',
    explanation: 'The Constitution\'s promises apply to every citizen without exception.',
    difficulty: 'easy',
    position: 23
  },
  {
    word: 'ITS',
    scrambled: 'STI',
    hint: 'Possessive pronoun referring to India',
    explanation: 'Refers to India\'s citizens.',
    difficulty: 'easy',
    position: 24
  },
  {
    word: 'CITIZENS',
    scrambled: 'SNEZITIC',
    hint: 'All people who belong to India - you and me!',
    explanation: 'Every person who is a member of the Indian nation.',
    difficulty: 'medium',
    position: 25
  },
  {
    word: 'JUSTICE',
    scrambled: 'ECITSUJ',
    hint: 'Fairness in all forms - social, economic, and political',
    explanation: 'Fair treatment in society, economy, and politics for everyone.',
    difficulty: 'medium',
    position: 26
  },
  {
    word: 'LIBERTY',
    scrambled: 'YTREBIL',
    hint: 'Freedom to think, speak, and act within reasonable limits',
    explanation: 'Freedom of thought, expression, belief, faith, and worship.',
    difficulty: 'medium',
    position: 27
  },
  {
    word: 'EQUALITY',
    scrambled: 'YTILAUQE',
    hint: 'Same treatment and opportunities for all people',
    explanation: 'Equal status and opportunities for all citizens regardless of background.',
    difficulty: 'medium',
    position: 28
  },
  {
    word: 'AND',
    scrambled: 'DNA',
    hint: 'Conjunction before the final goal',
    explanation: 'Connects the previous goals with the final one.',
    difficulty: 'easy',
    position: 29
  },
  {
    word: 'FRATERNITY',
    scrambled: 'YTINRETARF',
    hint: 'Brotherhood and unity among all people',
    explanation: 'Sense of brotherhood among all Indians, promoting unity and dignity.',
    difficulty: 'hard',
    position: 30
  }
];

export default function PreambleUnscrambleGame() {
  const { user, addXP, addAchievement } = useUser();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameMode, setGameMode] = useState('practice'); // practice, timed, challenge
  
  const currentWord = preambleWords[currentWordIndex];
  const totalWords = preambleWords.length;

  // Timer effect for timed mode
  useEffect(() => {
    let timer;
    if (gameStarted && gameMode === 'timed' && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameMode === 'timed') {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameMode, showResult]);

  const startGame = (mode = 'practice') => {
    setGameMode(mode);
    setCurrentWordIndex(0);
    setUserInput('');
    setShowHint(false);
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
    setGameStarted(true);
    setGameComplete(false);
    setHintsUsed(0);
    setTimeLeft(mode === 'timed' ? 60 : 0);
  };

  const handleTimeout = () => {
    setShowResult(true);
    setIsCorrect(false);
    setTimeout(() => {
      nextWord();
    }, 2000);
  };

  const checkAnswer = () => {
    if (showResult) return;
    
    const correct = userInput.toUpperCase().trim() === currentWord.word;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      let xpEarned = 10;
      if (currentWord.difficulty === 'medium') xpEarned = 15;
      if (currentWord.difficulty === 'hard') xpEarned = 20;
      if (!showHint) xpEarned *= 1.5; // Bonus for not using hint
      addXP(Math.round(xpEarned));
    }

    setTimeout(() => {
      nextWord();
    }, 3000);
  };

  const nextWord = () => {
    if (currentWordIndex + 1 < totalWords) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setShowHint(false);
      setShowResult(false);
      setIsCorrect(false);
      if (gameMode === 'timed') setTimeLeft(60);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameComplete(true);
    setGameStarted(false);
    
    const percentage = (score / totalWords) * 100;
    if (percentage === 100) {
      addAchievement('preamble-master');
    }
    if (percentage >= 80) {
      addAchievement('constitution-scholar');
    }
    if (hintsUsed === 0 && score > totalWords * 0.7) {
      addAchievement('no-hints-needed');
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setShowHint(false);
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
    setGameStarted(false);
    setGameComplete(false);
    setHintsUsed(0);
    setTimeLeft(60);
  };

  const useHint = () => {
    if (!showHint && !showResult) {
      setShowHint(true);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const scrambleWord = (word) => {
    return word.split('').map((char, index) => (
      <span 
        key={index} 
        className="inline-block w-8 h-8 bg-amber-100 border-2 border-amber-300 rounded m-1 text-center leading-6 font-bold text-amber-800"
      >
        {char}
      </span>
    ));
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
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <BookOpen className="w-10 h-10" />
              </motion.div>
              
              <h1 className="text-3xl font-bold mb-2">Preamble Unscramble</h1>
              <p className="text-amber-100 text-lg">
                Unscramble the words of India's Constitutional Promise
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-stone-800 mb-4">
                  Learn the Preamble Word by Word
                </h2>
                <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  The Preamble is our national promise. Unscramble each word and learn what it means 
                  for our Constitution and democracy.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-stone-800 mb-2">Practice Mode</h3>
                  <p className="text-sm text-stone-600">Take your time, use hints, learn each word</p>
                  <button
                    onClick={() => startGame('practice')}
                    className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Start Practice
                  </button>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-bold text-stone-800 mb-2">Timed Mode</h3>
                  <p className="text-sm text-stone-600">60 seconds per word, test your speed</p>
                  <button
                    onClick={() => startGame('timed')}
                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Start Timed
                  </button>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-bold text-stone-800 mb-2">Challenge Mode</h3>
                  <p className="text-sm text-stone-600">Random order, no hints, for experts</p>
                  <button
                    onClick={() => startGame('challenge')}
                    className="mt-3 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Start Challenge
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3">🇮🇳 Did You Know?</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  The Preamble was amended only once - in 1976, during the Emergency, when the words 
                  "Socialist" and "Secular" were added. It represents the hopes and aspirations of the 
                  people who wrote our Constitution.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const percentage = Math.round((score / totalWords) * 100);
    
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
              percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
              percentage >= 70 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
              percentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-red-500 to-red-600'
            }`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <BookOpen className="w-12 h-12" />
              </motion.div>
              
              <h1 className="text-3xl font-bold mb-2">Preamble Challenge Complete!</h1>
              <p className="text-lg opacity-90">
                {percentage >= 90 ? 'Outstanding! You\'ve mastered the Preamble!' :
                 percentage >= 70 ? 'Great work on learning our Constitutional promise!' :
                 percentage >= 50 ? 'Good effort! Keep practicing the Preamble!' :
                 'Practice more to better understand our Constitution!'}
              </p>
            </div>

            {/* Results Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-stone-800 mb-2">
                  {percentage}%
                </div>
                <div className="text-lg text-stone-600">
                  {score} out of {totalWords} words correct
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{score * 15}</div>
                  <div className="text-sm text-stone-600">XP Earned</div>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Lightbulb className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{hintsUsed}</div>
                  <div className="text-sm text-stone-600">Hints Used</div>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{gameMode}</div>
                  <div className="text-sm text-stone-600">Game Mode</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
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
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-stone-600">
                Word {currentWordIndex + 1} of {totalWords}
              </span>
              <div className="flex items-center space-x-4">
                {gameMode === 'timed' && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-stone-700'}`}>
                      {timeLeft}s
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-stone-700">{score}</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentWordIndex + 1) / totalWords) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Game Card */}
        <motion.div
          key={currentWordIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
        >
          {/* Word Display */}
          <div className="bg-gradient-to-r from-stone-100 to-stone-200 p-8 text-center border-b border-stone-200">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              Unscramble this word from the Preamble:
            </h2>
            
            <div className="flex justify-center items-center mb-6">
              {scrambleWord(currentWord.scrambled)}
            </div>

            <div className="flex justify-center space-x-2 mb-4">
              <span className="text-sm text-stone-600">
                Difficulty: 
              </span>
              <span className={`text-sm font-semibold ${
                currentWord.difficulty === 'easy' ? 'text-green-600' :
                currentWord.difficulty === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {currentWord.difficulty.toUpperCase()}
              </span>
            </div>

            {gameMode !== 'challenge' && (
              <button
                onClick={useHint}
                disabled={showHint || showResult}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 mx-auto transition-colors ${
                  showHint || showResult
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHint ? 'Hint Used' : 'Get Hint'}</span>
              </button>
            )}
          </div>

          {/* Hint Section */}
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-yellow-50 border-b border-yellow-200 p-6"
            >
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Hint:</h3>
                  <p className="text-yellow-700">{currentWord.hint}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Input Section */}
          <div className="p-8">
            <div className="text-center mb-6">
              <label className="block text-lg font-semibold text-stone-800 mb-4">
                Your Answer:
              </label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                disabled={showResult}
                className="w-full max-w-md mx-auto px-4 py-3 text-xl font-bold text-center border-2 border-stone-300 rounded-lg focus:ring-4 focus:ring-amber-500 focus:border-amber-500 text-stone-800 placeholder-stone-400 disabled:bg-stone-100"
                placeholder="Type the unscrambled word..."
                autoFocus
              />
            </div>

            {!showResult ? (
              <div className="text-center">
                <button
                  onClick={checkAnswer}
                  disabled={!userInput.trim()}
                  className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                    userInput.trim()
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-6 rounded-xl ${
                  isCorrect 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                  <span className={`text-2xl font-bold ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isCorrect ? 'Correct!' : `Incorrect! The answer is: ${currentWord.word}`}
                  </span>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <p className={`font-semibold mb-2 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    Constitutional Context:
                  </p>
                  <p className={`text-sm ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {currentWord.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}