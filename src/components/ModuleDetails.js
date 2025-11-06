import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { contentModules } from '../data/contentData';

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState({});
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const load = () => {
      setCompletedLessons(JSON.parse(localStorage.getItem('completedLessons') || '{}'));
      setCompletedModules(JSON.parse(localStorage.getItem('completedModules') || '[]'));
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const allModules = Object.values(contentModules).flatMap(group => group.modules);
  const module = allModules.find(m => m.id === moduleId);

  if (!module) return <div className="p-6 text-center">Module not found.</div>;

  const lessons = module.lessons;
  const completed = completedLessons[moduleId] || [];
  const isModuleComplete = completedModules.includes(moduleId);

  const progress = Math.round((completed.length / lessons.length) * 100);

  // sort: incomplete first, completed after
  const orderedLessons = [
    ...lessons.filter(l => !completed.includes(l.id)),
    ...lessons.filter(l => completed.includes(l.id))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/modules')}
          className="text-amber-700 font-medium mb-6 hover:underline"
        >
          ← Back to Modules
        </button>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-stone-800">{module.title}</h1>
          {isModuleComplete && (
            <span className="text-green-700 font-semibold">🏁 Module Completed</span>
          )}
        </div>

        <p className="text-stone-600 mb-6">Progress: {progress}% complete</p>

        <div className="w-full bg-stone-200 rounded-full h-2 mb-6">
          <div
            className="bg-amber-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="grid gap-4">
          {orderedLessons.map((lesson) => {
            const done = completed.includes(lesson.id);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-xl shadow-md cursor-pointer border transition ${
                  done
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'bg-white border-stone-200 hover:bg-amber-50'
                }`}
                onClick={() => navigate(`/modules/${moduleId}/lesson/${lesson.id}`)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">{lesson.title}</span>
                  {done && <span className="text-green-600 font-semibold">✅ Completed</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
