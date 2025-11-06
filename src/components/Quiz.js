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
  Award
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { questionDatabase, difficultyLevels } from "../data/contentData";

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
  
  const indianLawQuestions = [
    {
      question: "Which article of the Indian Constitution guarantees the Right to Equality?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      correct: 0
    },
    {
      question: "What is the maximum strength of Lok Sabha as per the Constitution?",
      options: ["545", "550", "552", "560"],
      correct: 1
    },
    {
      question: "Which article deals with the Right to Constitutional Remedies?",
      options: ["Article 30", "Article 31", "Article 32", "Article 33"],
      correct: 2
    },
    {
      question: "The Indian Penal Code was enacted in which year?",
      options: ["1858", "1860", "1862", "1865"],
      correct: 1
    },
    {
      question: "Which section of IPC deals with murder?",
      options: ["Section 300", "Section 302", "Section 304", "Section 306"],
      correct: 1
    },
    {
      question: "The Consumer Protection Act was first enacted in which year?",
      options: ["1984", "1986", "1988", "1990"],
      correct: 1
    },
    {
      question: "Which article provides for freedom of speech and expression?",
      options: ["Article 19(1)(a)", "Article 19(1)(b)", "Article 19(1)(c)", "Article 21"],
      correct: 0
    },
    {
      question: "The concept of 'Basic Structure' was established in which case?",
      options: ["Golaknath case", "Kesavananda Bharati case", "Minerva Mills case", "Maneka Gandhi case"],
      correct: 1
    },
    {
      question: "Which amendment is known as the 'Mini Constitution'?",
      options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "73rd Amendment"],
      correct: 0
    },
    {
      question: "The age of majority in India is:",
      options: ["18 years", "21 years", "16 years", "20 years"],
      correct: 0
    },
    {
      question: "Which court has the power of judicial review in India?",
      options: ["High Court only", "Supreme Court only", "Both Supreme Court and High Court", "District Court"],
      correct: 2
    },
    {
      question: "The Right to Information Act was passed in:",
      options: ["2003", "2005", "2007", "2009"],
      correct: 1
    },
    {
      question: "Which article deals with the protection of life and personal liberty?",
      options: ["Article 20", "Article 21", "Article 22", "Article 23"],
      correct: 1
    },
    {
      question: "The Indian Evidence Act was enacted in:",
      options: ["1872", "1860", "1882", "1890"],
      correct: 0
    },
    {
      question: "Which section of CrPC deals with cognizable offenses?",
      options: ["Section 154", "Section 156", "Section 161", "Section 164"],
      correct: 0
    },
    {
      question: "The Dowry Prohibition Act was passed in:",
      options: ["1959", "1961", "1963", "1965"],
      correct: 1
    },
    {
      question: "Which article provides for prohibition of discrimination?",
      options: ["Article 14", "Article 15", "Article 16", "Article 17"],
      correct: 1
    },
    {
      question: "The Indian Contract Act was enacted in:",
      options: ["1870", "1872", "1875", "1878"],
      correct: 1
    },
    {
      question: "Which section of IPC deals with culpable homicide?",
      options: ["Section 299", "Section 300", "Section 301", "Section 302"],
      correct: 0
    },
    {
      question: "The National Human Rights Commission was established in:",
      options: ["1991", "1993", "1995", "1997"],
      correct: 1
    },
    {
      question: "Which article abolishes untouchability?",
      options: ["Article 16", "Article 17", "Article 18", "Article 19"],
      correct: 1
    },
    {
      question: "The Goods and Services Tax Act was implemented in:",
      options: ["2016", "2017", "2018", "2019"],
      correct: 1
    },
    {
      question: "Which section of CPC deals with res judicata?",
      options: ["Section 10", "Section 11", "Section 12", "Section 13"],
      correct: 1
    },
    {
      question: "The Indian Succession Act was passed in:",
      options: ["1925", "1930", "1935", "1940"],
      correct: 0
    },
    {
      question: "Which article deals with the Right to Education?",
      options: ["Article 21", "Article 21A", "Article 22", "Article 23"],
      correct: 1
    },
    {
      question: "The Negotiable Instruments Act was enacted in:",
      options: ["1881", "1882", "1883", "1884"],
      correct: 0
    },
    {
      question: "Which commission recommended the three-tier Panchayati Raj system?",
      options: ["Balwant Rai Mehta Committee", "Ashok Mehta Committee", "G.V.K. Rao Committee", "Sarkaria Commission"],
      correct: 0
    },
    {
      question: "The Sexual Harassment of Women at Workplace Act was passed in:",
      options: ["2011", "2012", "2013", "2014"],
      correct: 2
    },
    {
      question: "Which article provides for the establishment of Finance Commission?",
      options: ["Article 280", "Article 281", "Article 282", "Article 283"],
      correct: 0
    },
    {
      question: "The Indian Partnership Act was enacted in:",
      options: ["1930", "1932", "1934", "1936"],
      correct: 1
    },
    {
      question: "Which section of IPC deals with defamation?",
      options: ["Section 499", "Section 500", "Section 501", "Section 502"],
      correct: 0
    },
    {
      question: "The Maternity Benefit Act was first passed in:",
      options: ["1959", "1961", "1963", "1965"],
      correct: 1
    },
    {
      question: "Which article deals with the procedure for amendment of the Constitution?",
      options: ["Article 368", "Article 370", "Article 371", "Article 372"],
      correct: 0
    },
    {
      question: "The Indian Divorce Act was enacted in:",
      options: ["1869", "1871", "1873", "1875"],
      correct: 0
    },
    {
      question: "Which section of CrPC deals with arrest without warrant?",
      options: ["Section 41", "Section 42", "Section 43", "Section 44"],
      correct: 0
    },
    {
      question: "The Minimum Wages Act was passed in:",
      options: ["1946", "1948", "1950", "1952"],
      correct: 1
    },
    {
      question: "Which article provides for reservation in promotions?",
      options: ["Article 16(4)", "Article 16(4A)", "Article 16(4B)", "Article 335"],
      correct: 1
    },
    {
      question: "The Indian Forest Act was enacted in:",
      options: ["1925", "1927", "1929", "1931"],
      correct: 1
    },
    {
      question: "Which section of IPC deals with kidnapping?",
      options: ["Section 359", "Section 360", "Section 361", "Section 362"],
      correct: 2
    },
    {
      question: "The Central Vigilance Commission was established in:",
      options: ["1962", "1964", "1966", "1968"],
      correct: 1
    },
    {
      question: "Which article deals with the composition of Parliament?",
      options: ["Article 79", "Article 80", "Article 81", "Article 82"],
      correct: 0
    },
    {
      question: "The Prevention of Money Laundering Act was passed in:",
      options: ["2000", "2002", "2004", "2006"],
      correct: 1
    },
    {
      question: "Which section of CPC deals with summary procedure?",
      options: ["Order 37", "Order 38", "Order 39", "Order 40"],
      correct: 0
    },
    {
      question: "The Indian Lunacy Act was replaced by:",
      options: ["Mental Health Act 1987", "Mental Health Act 1990", "Mental Health Act 1993", "Mental Health Act 1995"],
      correct: 0
    },
    {
      question: "Which article provides for protection against double jeopardy?",
      options: ["Article 20(1)", "Article 20(2)", "Article 20(3)", "Article 21"],
      correct: 1
    },
    {
      question: "The Companies Act 2013 replaced which act?",
      options: ["Companies Act 1945", "Companies Act 1950", "Companies Act 1956", "Companies Act 1960"],
      correct: 2
    },
    {
      question: "Which section of IPC deals with criminal breach of trust?",
      options: ["Section 405", "Section 406", "Section 407", "Section 408"],
      correct: 0
    },
    {
      question: "The Juvenile Justice Act was first passed in:",
      options: ["1986", "1988", "1990", "1992"],
      correct: 0
    },
    {
      question: "Which article deals with the Council of Ministers?",
      options: ["Article 74", "Article 75", "Article 76", "Article 77"],
      correct: 1
    },
    {
      question: "The Information Technology Act was enacted in:",
      options: ["1998", "2000", "2002", "2004"],
      correct: 1
    },
    {
      question: "Which section of CrPC deals with charge sheet?",
      options: ["Section 169", "Section 170", "Section 171", "Section 173"],
      correct: 3
    },
    {
      question: "The Protection of Women from Domestic Violence Act was passed in:",
      options: ["2003", "2005", "2007", "2009"],
      correct: 1
    },
    {
      question: "Which article provides for the establishment of Election Commission?",
      options: ["Article 324", "Article 325", "Article 326", "Article 327"],
      correct: 0
    },
    {
      question: "The Indian Arbitration Act was replaced by:",
      options: ["Arbitration Act 1996", "Arbitration Act 1995", "Arbitration Act 1994", "Arbitration Act 1997"],
      correct: 0
    },
    {
      question: "Which section of IPC deals with cheating?",
      options: ["Section 415", "Section 416", "Section 417", "Section 418"],
      correct: 0
    },
    {
      question: "The Lokpal and Lokayuktas Act was passed in:",
      options: ["2011", "2013", "2015", "2017"],
      correct: 1
    },
    {
      question: "Which article deals with the powers and functions of the President?",
      options: ["Article 52", "Article 53", "Article 54", "Article 55"],
      correct: 1
    },
    {
      question: "The Indian Trademark Act was enacted in:",
      options: ["1995", "1997", "1999", "2001"],
      correct: 2
    }
  ];

  const wheelSegments = [
    { color: "#8B4513", darkColor: "#654321", label: "Legal Questions" },
    { color: "#A0522D", darkColor: "#8B4513", label: "Constitutional Law" },
    { color: "#CD853F", darkColor: "#A0522D", label: "Criminal Law" },
    { color: "#D2B48C", darkColor: "#CD853F", label: "Civil Law" },
    { color: "#F4E4BC", darkColor: "#D2B48C", label: "Corporate Law" },
    { color: "#DEB887", darkColor: "#CD853F", label: "Family Law" },
    { color: "#BC9A6A", darkColor: "#A0522D", label: "Labor Law" },
    { color: "#9A7B4F", darkColor: "#8B4513", label: "Property Law" }
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResults(false);
    
    // Generate random rotation for smooth continuous animation
    const spins = 6 + Math.random() * 6; // 6-12 full rotations
    const finalAngle = Math.random() * 360;
    const newRotation = rotation + (spins * 360) + finalAngle;
    
    setRotation(newRotation);
    
    setTimeout(() => {
      // Select a completely random question from the pool
      const randomQuestionIndex = Math.floor(Math.random() * indianLawQuestions.length);
      setCurrentQuestion(indianLawQuestions[randomQuestionIndex]);
      setIsSpinning(false);
    }, 5000);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResults(true);
    setTotalQuestions(totalQuestions + 1);
    
    // Only increment score if the answer is correct
    if (answerIndex === currentQuestion.correct) {
      setScore(score + 1);
    }
    // Score remains the same for wrong answers
  };

  const resetGame = () => {
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResults(false);
  };

  const resetAllGame = () => {
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResults(false);
    setScore(0);
    setTotalQuestions(0);
    setRotation(0);
  };

  const getAnswerStyle = (index) => {
    if (!showResults) {
      return "bg-white hover:bg-amber-50 border border-amber-200 text-black hover:border-amber-300 hover:shadow-md";
    }
    
    if (index === currentQuestion.correct) {
      return "bg-green-600 text-white border border-green-700 shadow-lg";
    } else if (index === selectedAnswer && index !== currentQuestion.correct) {
      return "bg-red-600 text-white border border-red-700 shadow-lg";
    } else {
      return "bg-gray-200 text-gray-600 border border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 p-8">
      <div className="bg-gradient-to-b from-amber-100 to-stone-200 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-amber-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-200 to-stone-300 rounded-t-3xl p-8 border-b border-amber-300">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-2 tracking-wide">Indian Law Knowledge Wheel</h1>
            <p className="text-black/80 text-lg font-medium">Master Indian Legal System - 58 Questions Database</p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="inline-flex items-center bg-white/50 px-6 py-2 rounded-full border border-amber-300">
                <span className="text-black font-semibold text-lg">Score: {score}</span>
              </div>
              <div className="inline-flex items-center bg-white/50 px-6 py-2 rounded-full border border-amber-300">
                <span className="text-black font-semibold text-lg">Questions: {totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Wheel Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Wheel Container with Shadow */}
              <div className="relative drop-shadow-2xl">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
                  <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-black drop-shadow-lg"></div>
                </div>
                
                {/* Outer Ring */}
                <div className="absolute inset-0 w-96 h-96 rounded-full bg-gradient-to-br from-amber-800 to-stone-900 shadow-2xl"></div>
                
                {/* Wheel with smooth CSS animation */}
                <div 
                  className="w-96 h-96 rounded-full relative overflow-hidden border-8 border-amber-900 shadow-inner"
                  style={{ 
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                    background: 'conic-gradient(from 0deg, #8B4513, #A0522D, #CD853F, #D2B48C, #F4E4BC, #DEB887, #BC9A6A, #9A7B4F, #8B4513)'
                  }}
                >
                  {/* Segments */}
                  {wheelSegments.map((segment, index) => {
                    const angle = (360 / wheelSegments.length) * index;
                    const nextAngle = angle + (360 / wheelSegments.length);
                    
                    return (
                      <div
                        key={index}
                        className="absolute inset-0"
                        style={{
                          background: `conic-gradient(from ${angle}deg, ${segment.color} 0deg, ${segment.darkColor} ${360/wheelSegments.length/2}deg, ${segment.color} ${360/wheelSegments.length}deg, transparent ${360/wheelSegments.length}deg)`,
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
                        }}
                      >
                        {/* Divider Lines */}
                        <div 
                          className="absolute w-full h-px bg-amber-900/50 top-1/2 origin-left"
                          style={{ transform: `rotate(${angle}deg)` }}
                        />
                        
                        {/* Text Labels */}
                        <div 
                          className="absolute text-black font-bold text-xs whitespace-nowrap px-1"
                          style={{
                            top: '20%',
                            left: '75%',
                            transform: `rotate(${angle + 22.5}deg) translateX(-50%)`,
                            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                            maxWidth: '80px',
                            textAlign: 'center'
                          }}
                        >
                          {segment.label}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Center Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-amber-800 to-stone-900 rounded-full border-4 border-amber-100 shadow-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-stone-300 rounded-full border-2 border-amber-800 shadow-inner flex items-center justify-center">
                      <div className="w-6 h-6 bg-black rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Spin Button */}
              {!currentQuestion && (
                <div className="mt-8 text-center">
                  <button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className={`px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-all border-2 ${
                      isSpinning 
                        ? 'bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-amber-700 to-stone-800 hover:from-amber-800 hover:to-stone-900 text-white border-amber-800 hover:shadow-xl transform hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
                  </button>
                  <p className="text-black/60 text-sm mt-2">Ultimate test to know Indian Laws</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Question Section */}
          {currentQuestion && (
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-100 to-stone-200 p-6 border-b border-amber-200">
                <h3 className="text-2xl font-bold text-black text-center">
                  {currentQuestion.question}
                </h3>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResults}
                      className={`p-4 rounded-xl font-semibold text-left transition-all transform hover:scale-102 ${getAnswerStyle(index)} ${
                        !showResults ? 'cursor-pointer active:scale-98' : 'cursor-default'
                      }`}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
                
                {showResults && (
                  <div className="text-center bg-gradient-to-r from-amber-50 to-stone-100 p-6 rounded-xl border border-amber-200">
                    <p className={`text-xl font-bold mb-4 ${
                      selectedAnswer === currentQuestion.correct ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {selectedAnswer === currentQuestion.correct ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={resetGame}
                        className="bg-gradient-to-r from-amber-700 to-stone-800 hover:from-amber-800 hover:to-stone-900 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg border-2 border-amber-800"
                      >
                        Spin Again
                      </button>
                      <button
                        onClick={resetAllGame}
                        className="bg-gradient-to-r from-stone-600 to-stone-700 hover:from-stone-700 hover:to-stone-800 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg border-2 border-stone-700"
                      >
                        Reset Game
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}