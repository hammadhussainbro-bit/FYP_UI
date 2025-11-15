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
  const mobileMenuRef = useRef(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName') || 'User';
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const menuButton = event.target.closest('button[aria-label="Toggle menu"]');
        if (!menuButton) {
          setIsMenuOpen(false);
        }
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        clearUserMenuTimeout();
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Clear timeout helper
  const clearUserMenuTimeout = () => {
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current);
      userMenuTimeoutRef.current = null;
    }
  };

  // Handle mouse enter - open immediately and clear any pending close (desktop only)
  const handleUserMenuEnter = () => {
    if (!isMobile) {
      clearUserMenuTimeout();
      setIsUserMenuOpen(true);
    }
  };

  // Handle mouse leave - close after delay (desktop only)
  const handleUserMenuLeave = () => {
    if (!isMobile) {
      clearUserMenuTimeout();
      userMenuTimeoutRef.current = setTimeout(() => {
        setIsUserMenuOpen(false);
      }, 200);
    }
  };

  // Handle click for mobile
  const handleUserMenuClick = () => {
    if (isMobile) {
      setIsUserMenuOpen(!isUserMenuOpen);
    }
  };

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
    } sticky top-0 z-50 transition-colors safe-area-top`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-[60px] sm:min-h-[64px] h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="MeritVoyage Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className={`font-bold text-sm sm:text-base md:text-lg lg:text-xl ${
              theme === 'dark' ? 'text-white' : 'text-white'
            } whitespace-nowrap`}>MeritVoyage</span>
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
                  onClick={handleUserMenuClick}
                  onMouseEnter={handleUserMenuEnter}
                  onMouseLeave={handleUserMenuLeave}
                  className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all touch-manipulation"
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className={`font-medium text-xs sm:text-sm md:text-base truncate max-w-[100px] sm:max-w-none ${
                    theme === 'dark' ? 'text-gray-200' : 'text-white'
                  }`}>{userName}</span>
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${
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
                    className={`absolute right-0 mt-2 w-56 sm:w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden animate-fadeIn z-50 ${
                      isMobile ? 'max-h-[calc(100vh-80px)] overflow-y-auto' : ''
                    }`}
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
          <div className="md:hidden flex items-center space-x-1.5 sm:space-x-2" ref={mobileMenuRef}>
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-lg transition-all touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gray-800 text-yellow-400'
                  : 'text-white'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 sm:p-2.5 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
                theme === 'dark' ? 'text-gray-200' : 'text-white'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7"
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
          <div className={`md:hidden py-3 sm:py-4 space-y-2 sm:space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain ${
            theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-white/20'
          }`}>
                    {location.pathname !== '/' && (
                      <Link
                        to="/"
                        className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                          theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                    )}
            <Link
              to="/about"
              className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/how-it-works"
              className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/explore-universities"
              className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Universities
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/questionnaire"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Questionnaires
                </Link>
                <Link
                  to="/documents"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Documents
                </Link>
                <Link
                  to="/recommendations"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recommendations
                </Link>
                <Link
                  to="/favorites"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  to="/deadlines"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deadlines
                </Link>
                <Link
                  to="/update-profile"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Update Profile
                </Link>
                <Link
                  to="/history"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                <Link
                  to="/statistics"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Statistics
                </Link>
                <Link
                  to="/progress"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Progress
                </Link>
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors touch-manipulation text-sm sm:text-base ${
                    theme === 'dark'
                      ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white'
                      : 'bg-red-500/80 hover:bg-red-600 active:bg-red-700 text-white'
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors touch-manipulation ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white active:bg-gray-800' : 'text-white/90 hover:text-white active:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-center touch-manipulation text-sm sm:text-base ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
                      : 'bg-blue-500/80 hover:bg-blue-600 active:bg-blue-700 text-white'
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
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        @supports (padding: max(0px)) {
          .safe-area-top {
            padding-top: max(env(safe-area-inset-top), 0px);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
