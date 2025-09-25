import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  Star, 
  Trophy, 
  Clock,
  Target,
  Award
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const CardMatchingGame = () => {
  const { user, addXP, addAchievement } = useUser();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(0);

  // Age-appropriate card content
  const getCardPairs = () => {
    const ageGroup = user.ageGroup || 'teen';
    
    const cardData = {
      child: [
        { id: 1, text: 'Right to Education', match: 'Every child can go to school' },
        { id: 2, text: 'Right to Safety', match: 'Being protected from harm' },
        { id: 3, text: 'Freedom of Speech', match: 'Expressing your thoughts freely' },
        { id: 4, text: 'Right to Play', match: 'Having time for games and fun' },
        { id: 5, text: 'Fair Treatment', match: 'Being treated equally by everyone' },
        { id: 6, text: 'Privacy', match: 'Having personal space and secrets' }
      ],
      teen: [
        { id: 1, text: 'Article 14', match: 'Right to Equality' },
        { id: 2, text: 'Article 19', match: 'Freedom of Speech and Expression' },
        { id: 3, text: 'Article 21', match: 'Right to Life and Personal Liberty' },
        { id: 4, text: 'Article 32', match: 'Right to Constitutional Remedies' },
        { id: 5, text: 'Fundamental Duties', match: 'Citizens\' responsibilities to the nation' },
        { id: 6, text: 'Directive Principles', match: 'Guidelines for government policy' }
      ],
      adult: [
        { id: 1, text: 'Kesavananda Bharati Case', match: 'Basic Structure Doctrine' },
        { id: 2, text: 'Maneka Gandhi Case', match: 'Expanded interpretation of Article 21' },
        { id: 3, text: 'Minerva Mills Case', match: 'Balance between Fundamental Rights and DPSP' },
        { id: 4, text: 'Section 302 IPC', match: 'Punishment for Murder' },
        { id: 5, text: 'Habeas Corpus', match: 'Writ for illegal detention' },
        { id: 6, text: 'Judicial Review', match: 'Court\'s power to review laws' }
      ]
    };

    return cardData[ageGroup] || cardData.teen;
  };

  const initializeGame = () => {
    const pairs = getCardPairs();
    const gameCards = [];
    
    // Create cards for each pair
    pairs.forEach(pair => {
      gameCards.push(
        { id: `${pair.id}-a`, content: pair.text, pairId: pair.id, type: 'question' },
        { id: `${pair.id}-b`, content: pair.match, pairId: pair.id, type: 'answer' }
      );
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards.map(card => ({ ...card, isFlipped: false, isMatched: false })));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(true);
    setGameComplete(false);
    setScore(0);
  };

  useEffect(() => {
    let timer;
    if (gameStarted && !gameComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameComplete]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameComplete(true);
      setGameStarted(false);
      
      // Calculate score based on moves and time
      const baseScore = 1000;
      const timeBonus = Math.max(0, 300 - timeElapsed);
      const moveBonus = Math.max(0, 200 - moves * 10);
      const finalScore = baseScore + timeBonus + moveBonus;
      
      setScore(finalScore);
      addXP(Math.round(finalScore / 10));

      // Check for achievements
      if (moves <= cards.length / 2 + 2) {
        addAchievement('perfect-match');
      }
    }
  }, [matchedCards, cards.length]);

  const handleCardClick = (clickedCard) => {
    if (
      !gameStarted ||
      clickedCard.isMatched ||
      clickedCard.isFlipped ||
      flippedCards.length === 2
    ) {
      return;
    }

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      // Check for match
      if (newFlippedCards[0].pairId === newFlippedCards[1].pairId) {
        // Match found
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.pairId === newFlippedCards[0].pairId
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )
          );
          setMatchedCards(prev => [...prev, newFlippedCards[0].id, newFlippedCards[1].id]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              newFlippedCards.some(fc => fc.id === card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameComplete(false);
    setScore(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Target className="w-10 h-10" />
              </motion.div>
              
              <h1 className="text-3xl font-bold mb-2">Legal Memory Match</h1>
              <p className="text-purple-100 text-lg">
                Match legal terms with their meanings
              </p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-stone-800 mb-4">How to Play</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-2">Flip Cards</h3>
                    <p className="text-sm text-stone-600">Click cards to reveal their content</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-2">Find Matches</h3>
                    <p className="text-sm text-stone-600">Match legal terms with definitions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-2">Earn Points</h3>
                    <p className="text-sm text-stone-600">Faster matches = higher scores</p>
                  </div>
                </div>

                <button
                  onClick={initializeGame}
                  className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Game
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-12 h-12" />
              </motion.div>
              
              <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
              <p className="text-lg opacity-90">You matched all the pairs!</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-stone-800 mb-2">
                  {score.toLocaleString()}
                </div>
                <div className="text-lg text-stone-600">Final Score</div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-stone-600">Time</div>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{moves}</div>
                  <div className="text-sm text-stone-600">Moves</div>
                </div>
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{Math.round(score / 10)}</div>
                  <div className="text-sm text-stone-600">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
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
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-stone-200 p-4 mb-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-stone-800">Legal Memory Match</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-stone-700">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-stone-700">{moves} moves</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-stone-700">{matchedCards.length / 2} / {cards.length / 2}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 md:grid-cols-4 gap-4"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-square"
            >
              <div
                onClick={() => handleCardClick(card)}
                className={`w-full h-full relative cursor-pointer transition-all duration-300 ${
                  card.isFlipped || card.isMatched ? 'transform-none' : 'transform hover:scale-105'
                }`}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="w-full h-full relative"
                  initial={false}
                  animate={{ 
                    rotateY: card.isFlipped || card.isMatched ? 180 : 0 
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Back */}
                  <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl shadow-lg flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-white text-4xl">⚖️</div>
                  </motion.div>

                  {/* Card Front */}
                  <motion.div
                    className={`absolute inset-0 w-full h-full rounded-xl shadow-lg flex items-center justify-center p-4 text-center ${
                      card.isMatched 
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' 
                        : 'bg-white border border-amber-200 text-stone-800'
                    }`}
                    style={{ 
                      backfaceVisibility: 'hidden',
                      rotateY: 180,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="text-sm font-semibold leading-tight">
                      {card.content}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reset Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <button
            onClick={resetGame}
            className="bg-stone-600 hover:bg-stone-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Game</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CardMatchingGame;