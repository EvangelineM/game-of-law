import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  CheckCircle, 
  Lock,
  ChevronRight,
  Award,
  Target,
  Lightbulb
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { contentModules } from '../data/contentData';

const LearningModules = () => {
  const { user, gameProgress, updateModuleProgress, addXP } = useUser();
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const ageGroup = user.ageGroup || 'teen';
  const modules = contentModules[ageGroup]?.modules || [];

  const getModuleProgress = (moduleId) => {
    return gameProgress.modules[moduleId] || { completed: false, progress: 0, quiz_scores: [] };
  };

  const isModuleUnlocked = (module) => {
    if (module.level === 1) return true;
    // Check if previous level modules are completed
    const prevLevelModules = modules.filter(m => m.level === module.level - 1);
    return prevLevelModules.every(m => getModuleProgress(m.id).completed);
  };

  const startLesson = (module, lesson) => {
    setSelectedModule(module);
    setCurrentLesson(lesson);
  };

  const completeLesson = (lesson) => {
    const moduleProgress = getModuleProgress(selectedModule.id);
    const completedLessons = moduleProgress.completedLessons || [];
    
    if (!completedLessons.includes(lesson.id)) {
      addXP(lesson.xp);
      updateModuleProgress(selectedModule.id, {
        ...moduleProgress,
        completedLessons: [...completedLessons, lesson.id],
        progress: Math.min(100, moduleProgress.progress + (100 / selectedModule.lessons.length))
      });
    }
    
    setCurrentLesson(null);
  };

  if (currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-stone-800 mb-2">
                  {currentLesson.title}
                </h1>
                <p className="text-stone-600">
                  {selectedModule.title} • {currentLesson.duration} min read
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-stone-700">{currentLesson.xp} XP</span>
                </div>
                <button
                  onClick={() => setCurrentLesson(null)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  ← Back
                </button>
              </div>
            </div>
          </motion.div>

          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden"
          >
            <div className="p-8">
              <div className="prose max-w-none">
                <div className="text-lg leading-relaxed text-stone-700 mb-8">
                  {currentLesson.content}
                </div>

                {/* Interactive Elements based on lesson type */}
                {currentLesson.type === 'interactive' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Lightbulb className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-800">Interactive Element</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-stone-800 mb-2">Scenario</h4>
                        <p className="text-sm text-stone-600">
                          Imagine you're faced with a legal situation related to this topic...
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-stone-800 mb-2">Think About</h4>
                        <p className="text-sm text-stone-600">
                          How would you apply what you've learned? What steps would you take?
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentLesson.type === 'case-study' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="w-6 h-6 text-amber-600" />
                      <h3 className="text-lg font-semibold text-amber-800">Case Study</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-amber-200">
                      <h4 className="font-semibold text-stone-800 mb-2">Legal Precedent</h4>
                      <p className="text-sm text-stone-600">
                        This landmark case established important principles that are still relevant today...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center pt-8 border-t border-stone-200">
                <button
                  onClick={() => completeLesson(currentLesson)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Complete Lesson (+{currentLesson.xp} XP)
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Learning Modules</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Structured learning paths designed for your age group with interactive lessons and practical examples.
          </p>
        </motion.div>

        {/* User Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {modules.filter(m => getModuleProgress(m.id).completed).length}
              </div>
              <div className="text-sm text-stone-600">Modules Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {modules.reduce((acc, m) => acc + (getModuleProgress(m.id).completedLessons?.length || 0), 0)}
              </div>
              <div className="text-sm text-stone-600">Lessons Finished</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {user.currentLevel}
              </div>
              <div className="text-sm text-stone-600">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {user.totalXP}
              </div>
              <div className="text-sm text-stone-600">Total XP</div>
            </div>
          </div>
        </motion.div>

        {/* Learning Path */}
        <div className="space-y-8">
          {[1, 2, 3].map(level => {
            const levelModules = modules.filter(m => m.level === level);
            if (levelModules.length === 0) return null;

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + level * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {level}
                  </div>
                  Level {level} Modules
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {levelModules.map((module, index) => {
                    const progress = getModuleProgress(module.id);
                    const isUnlocked = isModuleUnlocked(module);
                    
                    return (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={`relative ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                      >
                        <div className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 overflow-hidden ${
                          isUnlocked 
                            ? 'border-stone-200 hover:shadow-xl hover:scale-105' 
                            : 'border-stone-300'
                        }`}>
                          {/* Module Header */}
                          <div className={`${module.color} p-6 relative`}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-3xl">{module.icon}</div>
                              {!isUnlocked && (
                                <Lock className="w-6 h-6 text-stone-400" />
                              )}
                              {progress.completed && (
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-stone-800 mb-2">
                              {module.title}
                            </h3>
                            <p className="text-stone-700 text-sm">
                              {module.description}
                            </p>
                          </div>

                          {/* Module Content */}
                          {isUnlocked && (
                            <div className="p-6">
                              {/* Progress Bar */}
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-stone-600">Progress</span>
                                  <span className="text-stone-800 font-semibold">{Math.round(progress.progress)}%</span>
                                </div>
                                <div className="w-full bg-stone-200 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress.progress}%` }}
                                  />
                                </div>
                              </div>

                              {/* Lessons */}
                              <div className="space-y-2 mb-4">
                                {module.lessons.slice(0, 3).map((lesson, lessonIndex) => {
                                  const completed = progress.completedLessons?.includes(lesson.id);
                                  
                                  return (
                                    <button
                                      key={lesson.id}
                                      onClick={() => startLesson(module, lesson)}
                                      className="w-full flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors text-left"
                                    >
                                      <div className="flex items-center space-x-3">
                                        {completed ? (
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                        ) : (
                                          <Play className="w-4 h-4 text-stone-400" />
                                        )}
                                        <span className="text-sm font-medium text-stone-700">
                                          {lesson.title}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Clock className="w-3 h-3 text-stone-400" />
                                        <span className="text-xs text-stone-500">{lesson.duration}m</span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Module Stats */}
                              <div className="flex justify-between text-xs text-stone-500 pt-4 border-t border-stone-100">
                                <span>{module.lessons.length} lessons</span>
                                <span>{progress.completedLessons?.length || 0} completed</span>
                              </div>
                            </div>
                          )}

                          {!isUnlocked && (
                            <div className="p-6 text-center">
                              <Lock className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                              <p className="text-sm text-stone-500">
                                Complete Level {level - 1} modules to unlock
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningModules;