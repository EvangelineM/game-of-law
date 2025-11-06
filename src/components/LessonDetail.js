import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { contentModules } from '../data/contentData';
import { useUser } from '../contexts/UserContext'; // ✅ Import context

const LessonDetail = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { addXP, updateModuleProgress } = useUser(); // ✅ Get XP and progress updaters

  const [completedLessons, setCompletedLessons] = useState(() =>
    JSON.parse(localStorage.getItem('completedLessons') || '{}')
  );
  const [completedModules, setCompletedModules] = useState(() =>
    JSON.parse(localStorage.getItem('completedModules') || '[]')
  );

  const allModules = Object.values(contentModules).flatMap(group => group.modules);
  const module = allModules.find(m => m.id === moduleId);
  const lessons = module?.lessons || [];
  const currentLessonIndex = lessons.findIndex(l => l.id === lessonId);
  const lesson = lessons[currentLessonIndex];

  if (!module) return <div className="p-6 text-center">Module not found.</div>;
  if (!lesson) return <div className="p-6 text-center">Lesson not found.</div>;

  const isCompleted = completedLessons[moduleId]?.includes(lessonId);
  const progress = ((completedLessons[moduleId]?.length || 0) / lessons.length) * 100;

  // ✅ Adjust this value to control XP per lesson
  const XP_PER_LESSON = 20;

  const markLessonComplete = () => {
    const updated = { ...completedLessons };
    if (!updated[moduleId]) updated[moduleId] = [];

    if (!updated[moduleId].includes(lessonId)) {
      updated[moduleId].push(lessonId);
      setCompletedLessons(updated);
      localStorage.setItem('completedLessons', JSON.stringify(updated));

      // ✅ Award XP once per new completion
      addXP(XP_PER_LESSON);

      // ✅ Optionally update module progress in context
      updateModuleProgress(moduleId, {
        progress: ((updated[moduleId].length / lessons.length) * 100).toFixed(1),
      });
    }

    // Check if module is now fully complete
    const allDone = lessons.every(l => updated[moduleId].includes(l.id));
    if (allDone && !completedModules.includes(moduleId)) {
      const updatedModules = [...completedModules, moduleId];
      setCompletedModules(updatedModules);
      localStorage.setItem('completedModules', JSON.stringify(updatedModules));
    }
  };

  const nextLesson = () => {
    markLessonComplete();

    if (currentLessonIndex < lessons.length - 1) {
      navigate(`/modules/${moduleId}/lesson/${lessons[currentLessonIndex + 1].id}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      navigate(`/modules/${moduleId}/lesson/${lessons[currentLessonIndex - 1].id}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(`/modules/${moduleId}`)}
          className="flex items-center text-amber-700 font-medium mb-6 hover:underline"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Back to Module
        </button>

        {/* Lesson */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-2xl shadow-lg p-8 mb-8 border ${
            isCompleted ? 'border-green-500' : 'border-stone-200'
          }`}
        >
          <h1 className="text-3xl font-bold text-stone-800 mb-2">{lesson.title}</h1>
          {isCompleted && <span className="text-green-700 font-semibold mb-4 block">✅ Completed</span>}
          <p className="text-stone-700 leading-relaxed whitespace-pre-line">{lesson.content}</p>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevLesson}
            className="flex items-center bg-stone-200 hover:bg-stone-300 text-stone-800 px-4 py-2 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </button>

          <div className="flex-1 mx-4">
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-stone-600 mt-1">
              {Math.round(progress)}% Complete
            </p>
          </div>

          <button
            onClick={nextLesson}
            className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
          >
            {currentLessonIndex < lessons.length - 1 ? 'Next' : 'Finish'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
