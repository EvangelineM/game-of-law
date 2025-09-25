import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
import AgeGroupSelection from "./components/AgeGroupSelection";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Quiz from "./components/EnhancedQuiz";
import Leaderboard from "./components/Leaderboard";
import SpinWheel from "./components/SpinWheel";
import LearningModules from "./components/LearningModules";
import CardMatchingGame from "./components/CardMatchingGame";
import SituationBasedGame from "./components/SituationBasedGame";
import SituationGameWithLives from "./components/SituationGameWithLives";
import ConstitutionalCrossword from "./components/ConstitutionalCrossword";
import Games from "./components/Games";
import Modules from "./components/Modules";

function AppContent() {
    const { user } = useUser();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    // Protect routes that require login and age selection
    const ProtectedRoute = ({ children }) => {
        if (!user.isLoggedIn) {
            return <Navigate to="/login" replace />;
        }
        
        if (!user.ageGroup || !user.name) {
            return <Navigate to="/age-selection" replace />;
        }
        
        return children;
    };

    return (
        <>
            {user.isLoggedIn && user.name && user.ageGroup && <Navbar />}
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/age-selection" element={<AgeGroupSelection onComplete={() => navigate('/dashboard')} />} />
                    
                    {/* Protected routes - require login and age selection */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard onNavigate={handleNavigate} />
                        </ProtectedRoute>
                    } />
                    <Route path="/quiz" element={
                        <ProtectedRoute>
                            <Quiz />
                        </ProtectedRoute>
                    } />
                    <Route path="/leaderboard" element={
                        <ProtectedRoute>
                            <Leaderboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/spin" element={
                        <ProtectedRoute>
                            <SpinWheel />
                        </ProtectedRoute>
                    } />
                    <Route path="/modules" element={
                        <ProtectedRoute>
                            <Modules />
                        </ProtectedRoute>
                    } />
                    <Route path="/games" element={
                        <ProtectedRoute>
                            <Games />
                        </ProtectedRoute>
                    } />
                    <Route path="/modules-detail" element={
                        <ProtectedRoute>
                            <LearningModules />
                        </ProtectedRoute>
                    } />
                    <Route path="/card-match" element={
                        <ProtectedRoute>
                            <CardMatchingGame />
                        </ProtectedRoute>
                    } />
                    <Route path="/situation-game" element={
                        <ProtectedRoute>
                            <SituationBasedGame />
                        </ProtectedRoute>
                    } />
                    <Route path="/crossword" element={
                        <ProtectedRoute>
                            <ConstitutionalCrossword />
                        </ProtectedRoute>
                    } />
                    <Route path="/situation-game-with-lives" element={
                        <ProtectedRoute>
                            <SituationGameWithLives />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
            {/* {user.isLoggedIn && user.name && user.ageGroup && <Footer />} */}
        </>
    );
}

function App() {
    return (
        <UserProvider>
            <Router>
                <AppContent />
            </Router>
        </UserProvider>
    );
}

export default App;
