import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Scale, User, Trophy, Gamepad2, BookOpen, Home } from "lucide-react";
import { useUser } from "../contexts/UserContext";

export default function Navbar() {
  const { user } = useUser();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/games", label: "Games", icon: Gamepad2 },
    { path: "/modules", label: "Modules", icon: BookOpen },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-amber-800/95 backdrop-blur-sm border-b border-amber-900 sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
              Game of Law
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-amber-700 text-white"
                    : "text-white hover:text-white hover:bg-amber-700/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            {/* XP Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-amber-700/50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
              <span className="text-sm font-semibold text-white">
                {user.totalXP} XP
              </span>
            </div>

            {/* Level Badge */}
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {user.currentLevel}
              </span>
            </div>

            {/* User Name */}
            <div className="hidden md:flex items-center space-x-2">
              <User className="w-4 h-4 text-amber-200" />
              <span className="text-sm font-medium text-white">
                {user.name || "Guest"}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-3 flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-amber-700 text-white"
                  : "text-white hover:text-white hover:bg-amber-700/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
