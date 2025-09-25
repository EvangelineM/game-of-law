import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, GraduationCap, Briefcase } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const AgeGroupSelection = ({ onComplete }) => {
  const [selectedAge, setSelectedAge] = useState(null);
  const [name, setName] = useState('');
  const { setUserProfile } = useUser();
  const navigate = useNavigate();

  const ageGroups = [
    {
      id: 'child',
      title: 'Young Learner',
      subtitle: 'Ages 8-12',
      description: 'Fun and simple introduction to rights and rules',
      icon: Users,
      color: 'from-amber-500 to-amber-600',
    },
    {
      id: 'teen',
      title: 'Student Explorer',
      subtitle: 'Ages 13-17',
      description: 'Discover constitutional principles and legal basics',
      icon: GraduationCap,
      color: 'from-amber-500 to-amber-600',
    },
    {
      id: 'adult',
      title: 'Legal Scholar',
      subtitle: 'Ages 18+',
      description: 'Deep dive into advanced legal concepts and precedents',
      icon: Briefcase,
      color: 'from-amber-500 to-amber-600',
    }
  ];

  const handleStart = () => {
    if (selectedAge && name.trim()) {
      setUserProfile({
        name: name.trim(),
        ageGroup: selectedAge,
        lastLoginDate: new Date().toISOString()
      });
      if (onComplete) {
        onComplete();
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-amber-800"
          >
            Choose Your Age Group
          </motion.h1>
        </div>

        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="max-w-sm mx-auto">
            <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 placeholder-stone-400"
              maxLength={50}
            />
          </div>
        </motion.div>

        {/* Age Group Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {ageGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border ${
                selectedAge === group.id
                  ? 'bg-amber-50 border-amber-500 shadow-md'
                  : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow'
              }`}
              onClick={() => setSelectedAge(group.id)}
            >
              <div className="p-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${group.color} flex items-center justify-center mb-3`}>
                  <group.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-amber-800 mb-1">
                    {group.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-600 mb-2">
                    {group.subtitle}
                  </p>
                  <p className="text-stone-700 text-sm">
                    {group.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {selectedAge === group.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <button
            onClick={handleStart}
            disabled={!selectedAge || !name.trim()}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 ${
              selectedAge && name.trim()
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          {(!selectedAge || !name.trim()) && (
            <p className="text-sm text-stone-500 mt-3">
              Please enter your name and select your age group to continue
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AgeGroupSelection;
