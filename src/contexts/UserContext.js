import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  user: {
    isLoggedIn: false,
    name: '',
    ageGroup: null, // 'child' (8-12), 'teen' (13-17), 'adult' (18+)
    currentLevel: 1,
    totalXP: 0,
    completedLevels: [],
    achievements: [],
    streakDays: 0,
    lastLoginDate: null,
  },
  gameProgress: {
    quiz: { level: 1, score: 0, totalPlayed: 0, bestScore: 0 },
    spinWheel: { level: 1, score: 0, totalPlayed: 0, bestScore: 0 },
    modules: {}, // moduleId: { completed: boolean, progress: number, quiz_scores: [] }
  },
  settings: {
    soundEnabled: true,
    animationsEnabled: true,
    difficulty: 'medium', // easy, medium, hard
  }
};

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case 'UPDATE_GAME_PROGRESS':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          [action.payload.game]: {
            ...state.gameProgress[action.payload.game],
            ...action.payload.data
          }
        }
      };
    
    case 'ADD_XP':
      const newXP = state.user.totalXP + action.payload;
      const newLevel = Math.floor(newXP / 100) + 1; // 100 XP per level
      return {
        ...state,
        user: {
          ...state.user,
          totalXP: newXP,
          currentLevel: newLevel
        }
      };
    
    case 'COMPLETE_LEVEL':
      return {
        ...state,
        user: {
          ...state.user,
          completedLevels: [...state.user.completedLevels, action.payload]
        }
      };
    
    case 'ADD_ACHIEVEMENT':
      if (!state.user.achievements.includes(action.payload)) {
        return {
          ...state,
          user: {
            ...state.user,
            achievements: [...state.user.achievements, action.payload]
          }
        };
      }
      return state;
    
    case 'UPDATE_MODULE_PROGRESS':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          modules: {
            ...state.gameProgress.modules,
            [action.payload.moduleId]: {
              ...state.gameProgress.modules[action.payload.moduleId],
              ...action.payload.data
            }
          }
        }
      };
    
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('gameOfLawUserData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData });
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gameOfLawUserData', JSON.stringify(state));
  }, [state]);

  const setUserProfile = (profileData) => {
    dispatch({ type: 'SET_USER_PROFILE', payload: profileData });
  };

  const updateGameProgress = (game, data) => {
    dispatch({ type: 'UPDATE_GAME_PROGRESS', payload: { game, data } });
  };

  const addXP = (amount) => {
    dispatch({ type: 'ADD_XP', payload: amount });
  };

  const completeLevel = (level) => {
    dispatch({ type: 'COMPLETE_LEVEL', payload: level });
  };

  const addAchievement = (achievement) => {
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement });
  };

  const updateModuleProgress = (moduleId, data) => {
    dispatch({ type: 'UPDATE_MODULE_PROGRESS', payload: { moduleId, data } });
  };

  const value = {
    ...state,
    setUserProfile,
    updateGameProgress,
    addXP,
    completeLevel,
    addAchievement,
    updateModuleProgress,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};