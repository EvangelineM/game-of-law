import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  TrendingUp,
  Award,
  ChevronRight,
  Gamepad2,
  BookOpen,
  PieChart,
  Medal,
  Clock,
  Brain
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Leaderboard from './Leaderboard';

const Dashboard = ({ onNavigate }) => {
  const { user } = useUser();
  
  // Quick action cards
  const quickActions = [
    {
      id: 'quiz',
      title: 'Quick Quiz',
      description: 'Test your knowledge about law and the Constitution',
      icon: Brain,
      color: 'from-amber-600 to-amber-700',
      path: '/quiz'
    },
    {
      id: 'games',
      title: 'Play Games',
      description: 'Explore interactive games about law and the Constitution',
      icon: Gamepad2,
      color: 'from-amber-600 to-amber-700',
      path: '/games'
    },
    {
      id: 'modules',
      title: 'Learning Modules',
      description: 'Dive into educational content and lessons',
      icon: BookOpen,
      color: 'from-amber-600 to-amber-700',
      path: '/modules'
    },
  ];

  const quickStats = [
    {
      label: 'Current Level',
      value: user.currentLevel,
      icon: TrendingUp,
      color: 'text-amber-600'
    },
    {
      label: 'Total XP',
      value: user.totalXP,
      icon: Star,
      color: 'text-amber-600'
    },
    {
      label: 'Achievements',
      value: user.achievements?.length || 0,
      icon: Award,
      color: 'text-amber-600'
    },
    {
      label: 'Streak Days',
      value: user.streakDays || 0,
      icon: PieChart,
      color: 'text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl shadow-lg border border-stone-200 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-stone-800 mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-stone-600">
                  Ready to continue your legal learning journey?
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.currentLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-2xl font-bold text-stone-800">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-stone-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center">
                <Gamepad2 className="w-6 h-6 mr-3 text-amber-600" />
                Quick Actions
              </h2>
              
              <div className="grid gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => onNavigate(action.path)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-stone-800 mb-1">
                              {action.title}
                            </h3>
                            <p className="text-stone-600">{action.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-stone-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6"
            >
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Your Progress
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-stone-600">Level Progress</span>
                    <span className="text-stone-800 font-semibold">
                      {user.totalXP % 100}/100 XP
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(user.totalXP % 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="pt-2 border-t border-stone-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-stone-800">
                      {user.currentLevel}
                    </div>
                    <div className="text-sm text-stone-500">Current Level</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6"
            >
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                Achievements
              </h3>
              
              {user.achievements.length > 0 ? (
                <div className="space-y-3">
                  {user.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg">🏆</div>
                      <div>
                        <div className="font-semibold text-stone-800 text-sm">
                          {achievement}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {user.achievements.length > 3 && (
                    <button className="w-full text-sm text-amber-600 hover:text-amber-700 font-medium">
                      View All ({user.achievements.length})
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-stone-600 text-sm">
                    Complete games to earn achievements!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6"
            >
              <h3 className="text-lg font-bold text-stone-800 mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('/leaderboard')}
                  className="w-full flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-amber-600" />
                    <span className="text-stone-700">Leaderboard</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-stone-700">Daily Challenge</span>
                  </div>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    Coming Soon
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;