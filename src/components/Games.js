import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Target,
  Grid,
  Scale,
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Games = () => {
  const { gameProgress } = useUser();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // All available games
  const allGames = [
    {
      id: 'quiz',
      title: 'Interactive Quiz',
      description: 'Test your knowledge with adaptive questions about the Indian Constitution and legal concepts',
      icon: HelpCircle,
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      path: '/quiz',
      stats: {
        level: gameProgress.quiz?.level || 1,
        bestScore: gameProgress.quiz?.bestScore || 0,
        totalPlayed: gameProgress.quiz?.totalPlayed || 0
      }
    },
    {
      id: 'spin-wheel',
      title: 'Knowledge Wheel',
      description: 'Spin the wheel for surprise legal challenges and facts about the Constitution',
      icon: RotateCcw,
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      path: '/spin',
      stats: {
        level: gameProgress.spinWheel?.level || 1,
        bestScore: gameProgress.spinWheel?.bestScore || 0,
        totalPlayed: gameProgress.spinWheel?.totalPlayed || 0
      }
    },
    {
      id: 'card-match',
      title: 'Memory Match',
      description: 'Match legal terms with their definitions in this memory card game',
      icon: Target,
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      path: '/card-match',
      stats: {
        level: gameProgress['card-match']?.level || 1,
        bestScore: gameProgress['card-match']?.bestScore || 0,
        totalPlayed: gameProgress['card-match']?.totalPlayed || 0
      }
    },
    {
      id: 'crossword',
      title: 'Constitutional Crossword',
      description: 'Solve crossword puzzles with legal terms and constitutional concepts',
      icon: Grid,
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      path: '/crossword',
      stats: {
        level: gameProgress.crossword?.level || 1,
        bestScore: gameProgress.crossword?.bestScore || 0,
        totalPlayed: gameProgress.crossword?.totalPlayed || 0
      }
    },
    {
      id: 'situation-game',
      title: 'Constitution Scenarios',
      description: 'Engage with decision-based legal scenarios and learn about constitutional applications',
      icon: Scale,
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      path: '/situation-game',
      stats: {
        level: gameProgress['situation-game']?.level || 1,
        bestScore: gameProgress['situation-game']?.bestScore || 0,
        totalPlayed: gameProgress['situation-game']?.totalPlayed || 0
      }
    },
    {
      id: 'situation-game-with-lives',
      title: 'Constitutional Challenge',
      description: 'Test your knowledge of Indian Constitution with real-life scenarios! You have 3 lives to make the right choices.',
      icon: Scale,
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      path: '/situation-game-with-lives',
      stats: {
        level: gameProgress['situationGame']?.level || 1,
        bestScore: gameProgress['situationGame']?.bestScore || 0,
        totalPlayed: gameProgress['situationGame']?.totalPlayed || 0
      }
    }
  ];

  // Number of cards to display at once
  const displayCount = 3;
  
  // Function to handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= allGames.length ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? allGames.length - 1 : prevIndex - 1
    );
  };

  // Calculate visible games based on current index
  const getVisibleGames = () => {
    const result = [];
    for (let i = 0; i < displayCount; i++) {
      const index = (currentIndex + i) % allGames.length;
      result.push(allGames[index]);
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Games</h1>
          <p className="text-lg text-stone-700 max-w-2xl mx-auto">
            Explore our collection of interactive games designed to make learning about law, the Indian Constitution, and legal concepts fun and engaging.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative px-12 mb-16">
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Game Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleGames().map((game, index) => (
              <motion.div
                key={`${game.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => navigate(game.path)}
              >
                <div className="h-32 bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
                  <game.icon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{game.title}</h3>
                  <p className="text-stone-600 mb-4">{game.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-stone-800">Lvl {game.stats.level}</div>
                      <div className="text-xs text-stone-500">Current Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-stone-800">{game.stats.bestScore}%</div>
                      <div className="text-xs text-stone-500">Best Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-stone-800">{game.stats.totalPlayed}</div>
                      <div className="text-xs text-stone-500">Times Played</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;