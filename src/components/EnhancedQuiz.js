import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Star, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy,
  Lightbulb,
  Target,
  Award,
  ChevronLeft
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { questionDatabase, difficultyLevels } from "../data/contentData";
import { additionalQuestions } from "../data/additionalQuizQuestions";
import { additionalConstitutionalQuestions } from "../data/additionalConstitutionalQuestions";

export default function Quiz() {
  const { user, gameProgress, updateGameProgress, addXP, addAchievement } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions] = useState(10);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState(user.settings?.difficulty || 'medium');
  const [quizHistory, setQuizHistory] = useState([]);

  // Combine existing questions with additional questions
  const getAllQuestions = () => {
    const ageGroup = user.ageGroup || 'teen';
    // Merge the original questions with additional questions and constitutional questions for the current age group
    const allQuestions = [
      ...(questionDatabase[ageGroup] || questionDatabase.teen),
      ...(additionalQuestions[ageGroup] || []),
      ...(additionalConstitutionalQuestions[ageGroup] || [])
    ];
    
    return allQuestions;
  };

  // Get age-appropriate questions
  const getQuestions = () => {
    const allQuestions = getAllQuestions();
    
    // Track which questions have been used in past quizzes to avoid repetition
    const filteredQuestions = allQuestions.filter(q => !quizHistory.includes(q.question));
    
    // If we've used most questions already, reset history to avoid running out of questions
    const questionsToUse = filteredQuestions.length >= totalQuestions 
      ? filteredQuestions 
      : getAllQuestions();
    
    // Shuffle and pick the first 10 questions
    return questionsToUse.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(getQuestions());
  }, [user.ageGroup]);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameStarted && !showResults) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, showResults]);

  const startGame = () => {
    const gameQuestions = getQuestions();
    setQuestions(gameQuestions);
    setCurrentQuestion(gameQuestions[0]);
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setHintsUsed(0);
    setGameStarted(true);
    setGameComplete(false);
    setTimeLeft(difficultyLevels[difficulty].timeLimit);
    
    // Add these questions to history to prevent repetition
    setQuizHistory(prev => [
      ...prev, 
      ...gameQuestions.map(q => q.question)
    ].slice(-30)); // Keep track of last 30 questions
  };

  const handleTimeout = () => {
    setShowResults(true);
    // Treat as wrong answer
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResults) return;
    
    setSelectedAnswer(answerIndex);
    setShowResults(true);
    
    const isCorrect = answerIndex === currentQuestion.correct;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      
      // Award XP based on difficulty and performance
      let xpEarned = currentQuestion.xp || 20;
      xpEarned *= difficultyLevels[difficulty].xpMultiplier;
      if (streak >= 3) xpEarned *= 1.2; // Streak bonus
      
      addXP(Math.round(xpEarned));
    } else {
      setStreak(0);
    }

    // Auto-advance after showing result
    setTimeout(() => {
      nextQuestion();
    }, 2500);
  };

  const nextQuestion = () => {
    setShowResults(false);
    setSelectedAnswer(null);
    setShowHint(false);
    
    if (questionIndex + 1 < questions.length) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setTimeLeft(difficultyLevels[difficulty].timeLimit);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameComplete(true);
    setGameStarted(false);
    
    const finalScore = Math.round((score / totalQuestions) * 100);
    const currentBest = gameProgress.quiz.bestScore || 0;
    
    // Update game progress
    updateGameProgress('quiz', {
      level: gameProgress.quiz.level,
      score: finalScore,
      totalPlayed: (gameProgress.quiz.totalPlayed || 0) + 1,
      bestScore: Math.max(currentBest, finalScore)
    });

    // Check for achievements
    if (finalScore === 100) {
      addAchievement('perfect-score');
    }
    if ((gameProgress.quiz.totalPlayed || 0) === 0) {
      addAchievement('first-quiz');
    }
  };

  const resetGame = () => {
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResults(false);
    setScore(0);
    setQuestionIndex(0);
    setTimeLeft(0);
    setGameStarted(false);
    setGameComplete(false);
    setStreak(0);
    setHintsUsed(0);
    setShowHint(false);
  };

  const useHint = () => {
    if (hintsUsed < difficultyLevels[difficulty].hintsAllowed && !showResults) {
      setShowHint(true);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const getAnswerStyle = (index) => {
    if (!showResults) {
      return selectedAnswer === index
        ? "bg-amber-200 border-amber-400 scale-95"
        : "bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 hover:scale-105";
    }

    if (index === currentQuestion.correct) {
      return "bg-green-100 border-green-400 text-green-800";
    }
    if (selectedAnswer === index && index !== currentQuestion.correct) {
      return "bg-red-100 border-red-400 text-red-800";
    }
    return "bg-stone-100 border-stone-200 text-stone-600";
  };

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Start Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Target className="w-10 h-10" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">Constitutional Quiz</h1>
              <p className="text-white/80">Test your knowledge about the Indian Constitution!</p>
            </div>

            {/* Quiz info */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Time Limit</h3>
                    <p className="text-sm text-stone-500">{difficultyLevels[difficulty].timeLimit} seconds per question</p>
                  </div>
                </div>
                
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Questions</h3>
                    <p className="text-sm text-stone-500">{totalQuestions} questions</p>
                  </div>
                </div>
                
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hints</h3>
                    <p className="text-sm text-stone-500">Up to {difficultyLevels[difficulty].hintsAllowed} available</p>
                  </div>
                </div>
              </div>

              {/* Difficulty setting */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Select Difficulty:</h3>
                <div className="flex gap-4">
                  {Object.keys(difficultyLevels).map((level) => (
                    <button
                      key={level}
                      className={`px-4 py-2 rounded-lg border transition ${
                        difficulty === level
                          ? "bg-amber-500 text-white border-amber-600"
                          : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                      }`}
                      onClick={() => setDifficulty(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Best score */}
              {gameProgress.quiz.bestScore !== undefined && (
                <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h3 className="font-semibold text-stone-800">Your Best Score</h3>
                  </div>
                  <div className="text-2xl font-bold text-amber-700">{gameProgress.quiz.bestScore}%</div>
                  <p className="text-sm text-stone-600 mt-1">
                    You've played this quiz {gameProgress.quiz.totalPlayed || 0} {gameProgress.quiz.totalPlayed === 1 ? 'time' : 'times'}.
                  </p>
                </div>
              )}

              {/* Start button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                onClick={startGame}
              >
                Start Quiz <ArrowRight className="w-5 h-5" />
              </motion.button>

              <button 
                className="mt-4 w-full py-2 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl flex items-center justify-center gap-2"
                onClick={() => window.history.back()}
              >
                <ChevronLeft className="w-4 h-4" /> Back to Games
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-10 h-10" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
              <p className="text-white/80">Here's how you did</p>
            </div>

            {/* Results */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 text-center">
                  <h3 className="text-lg text-stone-700 mb-2">Final Score</h3>
                  <div className="text-4xl font-bold text-amber-700">{Math.round((score / totalQuestions) * 100)}%</div>
                  <p className="mt-2 text-amber-800">
                    {score} correct out of {totalQuestions} questions
                  </p>
                </div>
                
                <div className="p-6 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="text-lg text-stone-700 mb-3">Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Best Streak:</span>
                      <span className="font-semibold">{streak}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Hints Used:</span>
                      <span className="font-semibold">{hintsUsed} of {difficultyLevels[difficulty].hintsAllowed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Difficulty:</span>
                      <span className="font-semibold capitalize">{difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">What you've learned:</h3>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                  <ul className="space-y-2">
                    {questions.map((q, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {score > index ? (
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <span className="text-stone-700">{q.question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Achievements */}
              {score === totalQuestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-stone-800">Perfect Score!</h3>
                  </div>
                  <p className="text-sm text-stone-600">
                    You've answered every question correctly. That's amazing!
                  </p>
                </motion.div>
              )}

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                  onClick={startGame}
                >
                  <RotateCcw className="w-5 h-5" /> Play Again
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-300 flex items-center justify-center gap-2"
                  onClick={() => window.history.back()}
                >
                  <ChevronLeft className="w-5 h-5" /> Back to Games
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Game in progress
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Game Screen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
        >
          {/* Progress bar */}
          <div className="h-2 bg-stone-100">
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${(questionIndex / questions.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Question {questionIndex + 1}/{questions.length}</h2>
                <p className="text-sm text-stone-500">
                  Category: {currentQuestion?.category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-2 items-center mr-6">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold">{score}</span>
                </div>
                <div className="px-4 py-2 bg-stone-100 rounded-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-stone-500" />
                  <span className={`font-mono font-medium ${timeLeft < 5 ? 'text-red-600' : 'text-stone-700'}`}>
                    {String(timeLeft).padStart(2, '0')}s
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Question content */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-stone-800 mb-4">
                {currentQuestion?.question}
              </h3>
              {showHint && currentQuestion?.explanation && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Lightbulb className="w-4 h-4" />
                    <p className="text-sm">Hint: {currentQuestion.explanation.split('.')[0]}.</p>
                  </div>
                </div>
              )}
              {!showHint && !showResults && hintsUsed < difficultyLevels[difficulty].hintsAllowed && (
                <button 
                  onClick={useHint}
                  className="mb-4 text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Lightbulb className="w-4 h-4" />
                  Use a hint ({difficultyLevels[difficulty].hintsAllowed - hintsUsed} left)
                </button>
              )}
            </div>
            
            {/* Answer options */}
            <div className="space-y-4">
              {currentQuestion?.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={!showResults ? { scale: 1.01 } : {}}
                  whileTap={!showResults ? { scale: 0.98 } : {}}
                  className={`w-full p-4 text-left rounded-xl border transition-all ${getAnswerStyle(index)}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResults}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-sm mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    
                    {showResults && index === currentQuestion.correct && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {showResults && selectedAnswer === index && index !== currentQuestion.correct && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            {showResults && currentQuestion?.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-stone-50 border border-stone-200 rounded-xl"
              >
                <h3 className="font-semibold text-stone-800 mb-2">Explanation:</h3>
                <p className="text-stone-700">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}