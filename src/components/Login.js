import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setUserProfile } = useUser();
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    // Check for minimum 8 characters
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    
    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    
    // Check for number
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    
    // Check for special character
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return "Password must contain at least one special character";
    }
    
    return ""; // Valid password
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset all errors
    setError('');
    setEmailError('');
    setPasswordError('');
    
    // Check if fields are filled
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Validate password
    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult) {
      setPasswordError(passwordValidationResult);
      return;
    }
    
    // For demo purposes, accept any credentials that pass validation
    // In a real application, this would validate against a backend
    
    // Update user context with logged in state
    setUserProfile({ isLoggedIn: true });
    
    // Navigate to age selection page
    navigate('/age-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full mx-auto flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-amber-800">Welcome to Game of Law</h2>
          <p className="text-stone-600 mt-2">Sign in to continue your legal learning journey</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-stone-700 mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-stone-400" />
              </div>
              <input
                id="email"
                type="email"
                className={`bg-stone-50 border ${emailError ? 'border-red-500' : 'border-stone-300'} text-stone-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-3`}
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
              />
            </div>
            {emailError && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{emailError}</span>
              </div>
            )}
          </div>
          
          <div className="mb-5">
            <label className="block text-stone-700 mb-2 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-stone-400" />
              </div>
              <input
                id="password"
                type="password"
                className={`bg-stone-50 border ${passwordError ? 'border-red-500' : 'border-stone-300'} text-stone-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-3`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
              />
            </div>
            {passwordError && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{passwordError}</span>
              </div>
            )}
            <div className="mt-2 text-xs text-stone-500">
              Password must contain at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character.
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <span>Sign In</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
        </form>
      </motion.div>
    </div>
  );
};

export default Login;