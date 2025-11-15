import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const userMenuTimeoutRef = useRef(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName') || 'User';

  // Clear timeout helper
  const clearUserMenuTimeout = () => {
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current);
      userMenuTimeoutRef.current = null;
    }
  };

  // Handle mouse enter - open immediately and clear any pending close
  const handleUserMenuEnter = () => {
    clearUserMenuTimeout();
    setIsUserMenuOpen(true);
  };

  // Handle mouse leave - close after delay
  const handleUserMenuLeave = () => {
    clearUserMenuTimeout();
    userMenuTimeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200); // 200ms delay - enough time to move mouse to dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        clearUserMenuTimeout();
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearUserMenuTimeout();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className={`${
      theme === 'dark' 
        ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-700' 
        : 'bg-white/10 backdrop-blur-md border-b border-white/20'
    } sticky top-0 z-50 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="MeritVoyage Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className={`font-bold text-base sm:text-lg md:text-xl ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}>MeritVoyage</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
                    <div className="flex items-center space-x-6">
                      {location.pathname !== '/' && (
                        <Link
                          to="/"
                          className={`${
                            theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                          } transition-colors`}
                        >
                          Home
                        </Link>
                      )}
              <Link
                to="/about"
                className={`${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                About Us
              </Link>
              <Link
                to="/how-it-works"
                className={`${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                How It Works
              </Link>
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onMouseEnter={handleUserMenuEnter}
                  onMouseLeave={handleUserMenuLeave}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-white'
                  }`}>{userName}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      theme === 'dark' ? 'text-gray-200' : 'text-white'
                    } ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    onMouseEnter={handleUserMenuEnter}
                    onMouseLeave={handleUserMenuLeave}
                    className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden animate-fadeIn"
                  >
                    <div className="py-2">
                      <Link
                        to="/questionnaire"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Questionnaires
                      </Link>
                      <Link
                        to="/documents"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Documents
                      </Link>
                      <Link
                        to="/recommendations"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        Recommendations
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Favorites
                      </Link>
                      <Link
                        to="/deadlines"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Deadlines
                      </Link>
                      <Link
                        to="/update-profile"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Update Profile
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  } transition-colors`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-lg transition-colors hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500/80 hover:bg-blue-600 text-white'
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-gray-800 text-yellow-400'
                  : 'text-white'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-white'
              }`}
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
                  <div className={`md:hidden py-4 space-y-3 ${
                    theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-white/20'
                  }`}>
                    {location.pathname !== '/' && (
                      <Link
                        to="/"
                        className={`block transition-colors ${
                          theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                    )}
            <Link
              to="/about"
              className={`block transition-colors ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/how-it-works"
              className={`block transition-colors ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/questionnaire"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Questionnaires
                </Link>
                <Link
                  to="/documents"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Documents
                </Link>
                <Link
                  to="/recommendations"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recommendations
                </Link>
                <Link
                  to="/favorites"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  to="/deadlines"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deadlines
                </Link>
                <Link
                  to="/update-profile"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Update Profile
                </Link>
                <Link
                  to="/history"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                <Link
                  to="/statistics"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Statistics
                </Link>
                <Link
                  to="/progress"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Progress
                </Link>
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-red-500/80 hover:bg-red-600 text-white'
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`block px-4 py-2 rounded-lg transition-colors text-center ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500/80 hover:bg-blue-600 text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
