import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenSquare, LogOut, LogIn, Menu, X, Sun, Moon } from 'lucide-react';

const { Link, useLocation } = ReactRouterDOM;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const isActive = (path: string) => 
    location.pathname === path 
      ? 'text-blue-600 dark:text-blue-400 font-semibold' 
      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">MERN<span className="text-gray-800 dark:text-white">Blog</span></span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/about" className={isActive('/about')}>About</Link>
              
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {user ? (
                <>
                  <Link to="/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors">
                    <PenSquare className="w-4 h-4 mr-2" />
                    Write Post
                  </Link>
                  <div className="flex items-center space-x-3 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                    <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.username}</span>
                    <button onClick={logout} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <Link to="/login" className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:bg-transparent dark:text-blue-400 dark:border-blue-500 dark:hover:bg-gray-800 transition-colors">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 sm:hidden">
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400"
              >
                {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <Link to="/" className="block py-2 text-base font-medium text-gray-700 dark:text-gray-200">Home</Link>
              <Link to="/about" className="block py-2 text-base font-medium text-gray-700 dark:text-gray-200">About</Link>
              {user ? (
                <>
                  <Link to="/create" className="block py-2 text-base font-medium text-blue-600 dark:text-blue-400">Write Post</Link>
                  <button onClick={logout} className="block w-full text-left py-2 text-base font-medium text-red-600 dark:text-red-400">Sign Out</button>
                </>
              ) : (
                <Link to="/login" className="block py-2 text-base font-medium text-blue-600 dark:text-blue-400">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-200">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">© 2024 MERN Blog Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};