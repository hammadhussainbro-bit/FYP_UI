import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { createPortal } from 'react-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0, left: 'auto', width: 224 });
  
  // Declare all refs and state variables BEFORE using them in useEffect
  const userMenuRef = useRef(null);
  const userMenuTimeoutRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuContentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  
  // Get user info safely
  const isLoggedIn = typeof window !== 'undefined' ? (localStorage.getItem('isLoggedIn') === 'true') : false;
  const userName = typeof window !== 'undefined' ? (localStorage.getItem('userName') || 'User') : 'User';
  
  // Declare all functions BEFORE using them in useEffect hooks
  // Clear timeout helper - memoized to prevent unnecessary re-renders
  const clearUserMenuTimeout = useCallback(() => {
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current);
      userMenuTimeoutRef.current = null;
    }
  }, []);

  // Handle mouse enter - open immediately and clear any pending close
  const handleUserMenuEnter = () => {
    clearUserMenuTimeout();
    // Always open on hover - works on both desktop and mobile
    setIsUserMenuOpen(true);
  };
  
  // Handle mouse leave - close after delay
  const handleUserMenuLeave = () => {
    clearUserMenuTimeout();
    // Close after delay to allow moving mouse to dropdown
    userMenuTimeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200);
  };

  // Handle click - toggle menu
  const handleUserMenuClick = (e) => {
    e?.stopPropagation();
    // Toggle on click for both mobile and desktop
    setIsUserMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
    }
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };
  
  // Safety check for theme
  if (!theme) {
    return (
      <nav className="bg-gray-900/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-white">Loading...</div>
        </div>
      </nav>
    );
  }
  
  // Calculate dropdown position - handle portrait/landscape orientation
  useEffect(() => {
    if (isUserMenuOpen && userMenuRef.current && typeof window !== 'undefined') {
      const updatePosition = () => {
        if (!userMenuRef.current) return;
        
        try {
          requestAnimationFrame(() => {
            if (!userMenuRef.current) return;
            
            const rect = userMenuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY || window.pageYOffset;
            const isPortraitMode = viewportHeight > viewportWidth;
            const isMobileDevice = viewportWidth < 768;
            
            // For mobile portrait, use full width minus padding
            const dropdownWidth = (isMobileDevice && isPortraitMode) 
              ? Math.min(viewportWidth - 16, 280) 
              : 224;
            
            const estimatedDropdownHeight = (isMobileDevice && isPortraitMode) ? 400 : 500;
            const spacing = isMobileDevice ? 8 : 8;
            const safeAreaTop = parseInt(
              getComputedStyle(document.documentElement).getPropertyValue('padding-top') || 
              window.getComputedStyle(document.documentElement).paddingTop || 
              '0', 
              10
            ) || 0;
            
            // For mobile portrait, center the dropdown or align to left with padding
            let right, left;
            if (isMobileDevice && isPortraitMode) {
              // Center horizontally or align to left edge with padding
              left = 8;
              right = 'auto';
            } else {
              // Desktop/landscape: align to right
              right = viewportWidth - rect.right;
              if (right < spacing) {
                right = spacing;
              } else if (right + dropdownWidth > viewportWidth - spacing) {
                right = Math.max(spacing, viewportWidth - dropdownWidth - spacing);
              }
              left = 'auto';
            }
            
            // Calculate top position
            let top = rect.bottom + scrollY + spacing;
            
            // Check available space below and above
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top - safeAreaTop;
            
            // For mobile portrait, always show below with better spacing
            if (isMobileDevice && isPortraitMode) {
              top = rect.bottom + scrollY + spacing;
              // Ensure it doesn't go off screen
              const maxHeight = viewportHeight - rect.bottom - spacing - 20;
              if (maxHeight < 200) {
                // Not enough space below, show above
                top = rect.top + scrollY - Math.min(estimatedDropdownHeight, spaceAbove - spacing);
              }
            } else {
              // Desktop/landscape logic
              if (spaceBelow < estimatedDropdownHeight && spaceAbove > estimatedDropdownHeight) {
                top = rect.top + scrollY - estimatedDropdownHeight - spacing;
              } else if (spaceBelow < estimatedDropdownHeight) {
                top = rect.bottom + scrollY + spacing;
              }
            }
            
            // Ensure dropdown doesn't go off top of viewport
            const minTop = scrollY + safeAreaTop + spacing;
            if (top < minTop) {
              top = minTop;
            }
            
            // Ensure dropdown doesn't go off bottom of viewport
            const maxTop = scrollY + viewportHeight - spacing;
            if (top + estimatedDropdownHeight > maxTop) {
              top = Math.max(minTop, maxTop - estimatedDropdownHeight);
            }
            
            setDropdownPosition({ top, right, left, width: dropdownWidth });
          });
        } catch (err) {
          console.error('Error updating dropdown position:', err);
        }
      };
      
      // Initial position calculation with delay for mobile
      const timeoutId = setTimeout(updatePosition, isMobile ? 50 : 10);
      
      // Update on resize and orientation change
      const handleResize = () => {
        updatePosition();
      };
      
      const handleOrientationChange = () => {
        setTimeout(() => {
          updatePosition();
        }, 200);
      };
      
      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('scroll', updatePosition, { passive: true });
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isUserMenuOpen, isMobile, isPortrait]);

  // Detect mobile device and orientation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobileAndOrientation = () => {
      try {
        const width = window.innerWidth || 1024;
        const height = window.innerHeight || 768;
        const isMobileDevice = width < 768 || (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent || ''));
        const isPortraitMode = height > width;
        
        setIsMobile(isMobileDevice);
        setIsPortrait(isPortraitMode);
      } catch (err) {
        console.error('Error checking mobile/orientation:', err);
        setIsMobile(false);
        setIsPortrait(false);
      }
    };
    
    // Initial check
    checkMobileAndOrientation();
    
    // Set up listeners
    window.addEventListener('resize', checkMobileAndOrientation);
    const orientationHandler = () => {
      setTimeout(checkMobileAndOrientation, 100);
    };
    window.addEventListener('orientationchange', orientationHandler);
    
    return () => {
      window.removeEventListener('resize', checkMobileAndOrientation);
      window.removeEventListener('orientationchange', orientationHandler);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMenuOpen) return;
      
      // Check if click is outside mobile menu
      const isMenuButton = event.target.closest('button[aria-label="Toggle menu"]');
      const isThemeButton = event.target.closest('button[aria-label="Toggle theme"]');
      const isInsideMenu = mobileMenuContentRef.current && mobileMenuContentRef.current.contains(event.target);
      const isInsideMenuButton = mobileMenuRef.current && mobileMenuRef.current.contains(event.target);
      
      if (!isMenuButton && !isThemeButton && !isInsideMenu && !isInsideMenuButton) {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
      }
      // Check if click is outside user menu (but allow clicks on dropdown links)
      if (isUserMenuOpen) {
        const clickedElement = event.target;
        const isDropdownLink = clickedElement.closest('a[href]') || clickedElement.closest('button');
        const isUserButton = clickedElement.closest('button[aria-label="User menu"]');
        const isInsideDropdown = clickedElement.closest('[style*="zIndex: 99999"]') || clickedElement.closest('[style*="z-index: 99999"]');
        
        // Only close if click is outside dropdown and not on user button or dropdown links
        if (!isInsideDropdown && !isUserButton) {
          // Allow navigation for links before closing
          if (isDropdownLink && clickedElement.tagName === 'A') {
            // Let the link navigate, then close dropdown
            setTimeout(() => setIsUserMenuOpen(false), 100);
          } else if (!isDropdownLink) {
            clearUserMenuTimeout();
            setIsUserMenuOpen(false);
          }
        }
      }
    };

    if (isMenuOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [isMenuOpen, isUserMenuOpen, clearUserMenuTimeout]);

  return (
    <nav className={`${
      theme === 'dark' 
        ? 'backdrop-blur-xl border-b border-gray-700/10' 
        : 'backdrop-blur-xl border-b border-white/8'
    } sticky top-0 z-50 transition-all duration-300 safe-area-top w-full relative`} style={{ 
      width: '100%', 
      maxWidth: '100vw', 
      overflowX: 'hidden',
      backgroundColor: theme === 'dark' 
        ? 'rgba(17, 24, 39, 0.15)' 
        : 'rgba(255, 255, 255, 0.02)',
      boxShadow: theme === 'dark' 
        ? '0 4px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.015), 0 2px 0 0 rgba(139, 92, 246, 0.15)'
        : '0 4px 24px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(255, 255, 255, 0.03), 0 2px 0 0 rgba(139, 92, 246, 0.25)',
      WebkitBackdropFilter: 'blur(20px)',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full" style={{ width: '100%', maxWidth: '100%' }}>
        <div className="flex justify-between items-center min-h-[64px] sm:min-h-[68px] md:min-h-[72px] h-16 sm:h-17 md:h-18 w-full" style={{ overflowX: 'hidden' }}>
          <Link to="/" className="group flex items-center space-x-2 sm:space-x-2.5 flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <div className="relative">
              <img 
                src="/logo.svg" 
                alt="MeritVoyage Logo" 
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-110"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className={`font-bold text-base sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r ${
              theme === 'dark' 
                ? 'from-white via-gray-100 to-white' 
                : 'from-white via-blue-50 to-white'
            } bg-clip-text text-transparent whitespace-nowrap drop-shadow-sm`} style={{ 
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              letterSpacing: '-0.02em'
            }}>MeritVoyage</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3 sm:space-x-4" style={{ position: 'relative', zIndex: 1 }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`group relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                theme === 'dark'
                  ? 'bg-gray-800/80 backdrop-blur-sm text-yellow-400 hover:bg-gray-700/90 border border-gray-700/50'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10'
              }`}
              style={{ 
                boxShadow: theme === 'dark' 
                  ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  : '0 4px 12px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="relative z-10">
              {theme === 'dark' ? (
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              </span>
            </button>
            
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {location.pathname !== '/' && (
                        <Link
                          to="/"
                          className={`group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                            theme === 'dark' 
                              ? 'text-gray-300 hover:text-white' 
                              : 'text-white/80 hover:text-white'
                          } hover:bg-white/5`}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative z-10">Home</span>
                        </Link>
                      )}
              <Link
                to="/about"
                className={`group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-white/80 hover:text-white'
                } hover:bg-white/5`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">About Us</span>
              </Link>
              <Link
                to="/how-it-works"
                className={`group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-white/80 hover:text-white'
                } hover:bg-white/5`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">How It Works</span>
              </Link>
            {isLoggedIn ? (
              <div 
                className="relative" 
                ref={userMenuRef} 
                style={{ zIndex: 99999, position: 'relative' }}
                onMouseEnter={() => {
                  handleUserMenuEnter();
                }}
                onMouseLeave={handleUserMenuLeave}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsUserMenuOpen(prev => !prev);
                  }}
                  onMouseEnter={() => {
                    handleUserMenuEnter();
                  }}
                  className={`group relative flex items-center space-x-2 sm:space-x-2.5 px-3 sm:px-4 py-2 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all duration-300 touch-manipulation min-h-[44px] ${(isMobile && isPortrait) ? 'min-w-[44px]' : ''} border border-transparent hover:border-white/10`}
                  style={{ 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                  type="button"
                >
                  <div className={`relative ${isMobile && isPortrait ? 'w-9 h-9' : 'w-8 h-8 sm:w-9 sm:h-9'} rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`} style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
                  }}>
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}&backgroundColor=b6e3ff,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                      alt={userName}
                      className="w-full h-full rounded-full object-cover ring-2 ring-white/30"
                      onError={(e) => {
                        // Fallback to gradient avatar if image fails to load
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className={`avatar-fallback absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-white/20 shadow-lg hidden`}>
                      <span className={`text-white font-semibold ${isMobile && isPortrait ? 'text-sm' : 'text-xs sm:text-sm'}`}>
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {(!isMobile || !isPortrait) && (
                    <span className={`font-semibold text-xs sm:text-sm md:text-base truncate max-w-[100px] sm:max-w-none ${
                      theme === 'dark' ? 'text-gray-100' : 'text-white'
                    } drop-shadow-sm`}>{userName}</span>
                  )}
                  <svg
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 flex-shrink-0 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-white'
                    } ${isUserMenuOpen ? 'rotate-180' : ''} group-hover:translate-y-0.5`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && typeof document !== 'undefined' && createPortal(
                  <div
                    onMouseEnter={handleUserMenuEnter}
                    onMouseLeave={handleUserMenuLeave}
                    onClick={(e) => {
                      // Prevent closing when clicking inside dropdown on mobile
                      if (isMobile) {
                        e.stopPropagation();
                      }
                    }}
                    className={`rounded-xl shadow-2xl overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    } ${(isMobile && isPortrait) ? 'w-[calc(100vw-16px)] max-w-[280px]' : ''}`}
                    style={{ 
                      zIndex: 99999,
                      position: 'fixed',
                      top: `${dropdownPosition.top}px`,
                      right: dropdownPosition.right !== undefined ? `${dropdownPosition.right}px` : 'auto',
                      left: dropdownPosition.left !== undefined ? (typeof dropdownPosition.left === 'string' ? dropdownPosition.left : `${dropdownPosition.left}px`) : 'auto',
                      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                      border: theme === 'dark' ? '2px solid #374151' : '2px solid #3b82f6',
                      boxShadow: theme === 'dark' 
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      minWidth: (isMobile && isPortrait) ? 'auto' : '224px',
                      width: dropdownPosition.width ? `${dropdownPosition.width}px` : ((isMobile && isPortrait) ? 'calc(100vw - 16px)' : '224px'),
                      maxWidth: (isMobile && isPortrait) ? '280px' : 'calc(100vw - 16px)',
                      maxHeight: (isMobile && isPortrait) ? 'calc(100vh - 120px)' : 'calc(100vh - 100px)',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      opacity: 1,
                      visibility: 'visible',
                      display: 'block',
                      pointerEvents: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      transform: 'translateZ(0)', // Force hardware acceleration
                      willChange: 'transform'
                    }}
                  >
                    <div className={`py-2 ${isMobile && isPortrait ? 'py-1' : ''}`}>
                      <Link
                        to="/questionnaire"
                        className={`flex items-center px-4 ${isMobile && isPortrait ? 'py-2.5' : 'py-3'} transition-colors cursor-pointer touch-manipulation min-h-[44px] ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' 
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
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
                        className={`flex items-center px-4 ${isMobile && isPortrait ? 'py-2.5' : 'py-3'} transition-colors cursor-pointer touch-manipulation min-h-[44px] ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' 
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
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
                        className={`flex items-center px-4 ${isMobile && isPortrait ? 'py-2.5' : 'py-3'} transition-colors cursor-pointer touch-manipulation min-h-[44px] ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' 
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
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
                        className={`flex items-center px-4 ${isMobile && isPortrait ? 'py-2.5' : 'py-3'} transition-colors cursor-pointer touch-manipulation min-h-[44px] ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' 
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
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
                        className={`flex items-center px-4 ${isMobile && isPortrait ? 'py-2.5' : 'py-3'} transition-colors cursor-pointer touch-manipulation min-h-[44px] ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' 
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
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
                        className={`flex items-center px-4 ${isMobile && isPortrait ? 'py-2.5' : 'py-3'} transition-colors cursor-pointer touch-manipulation min-h-[44px] ${
                          theme === 'dark' 
                            ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' 
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
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
                      <div className={`border-t my-1 ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}></div>
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center px-4 ${isMobile && isPortrait ? 'py-2.5' : 'py-3'} transition-colors touch-manipulation min-h-[44px] ${
                          theme === 'dark' 
                            ? 'text-red-400 hover:bg-gray-700 active:bg-gray-600' 
                            : 'text-red-600 hover:bg-red-50 active:bg-red-100'
                        }`}
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
                  </div>,
                  document.body
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-white/80 hover:text-white'
                  } hover:bg-white/5`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className={`group relative px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white'
                      : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white'
                  }`}
                  style={{ 
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-1.5">
                    Sign Up
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
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
              className={`group relative p-2.5 sm:p-3 rounded-xl transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gray-800/80 backdrop-blur-sm text-yellow-400 border border-gray-700/50'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/10'
              } hover:scale-110`}
              style={{ 
                boxShadow: theme === 'dark' 
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 4px 12px rgba(255, 255, 255, 0.1)'
              }}
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="relative z-10">
              {theme === 'dark' ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Hamburger clicked, current state:', isMenuOpen);
                const newState = !isMenuOpen;
                console.log('Setting menu to:', newState);
                setIsMenuOpen(newState);
              }}
              className={`group relative p-2.5 sm:p-3 rounded-xl touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center relative z-[10000] transition-all duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-200 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/70' 
                  : 'text-white bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20'
              }`}
              style={{ 
                boxShadow: theme === 'dark' 
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 4px 12px rgba(255, 255, 255, 0.1)'
              }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="relative z-10">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Using Portal for Reliability */}
      {isMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsMenuOpen(false);
              setIsUserMenuOpen(false);
            }}
            style={{ 
              top: '64px',
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
              position: 'fixed'
            }}
          />
          
          {/* Menu Content */}
          <div 
            ref={mobileMenuContentRef}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`md:hidden fixed w-full backdrop-blur-xl ${
              theme === 'dark' 
                ? 'bg-gray-900/95 border-b border-gray-700/50' 
                : 'bg-indigo-700/95 border-b border-white/20'
            }`} 
            style={{ 
              top: '64px',
              left: 0,
              right: 0,
              width: '100vw',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              transform: 'translateZ(0)',
              position: 'fixed',
              zIndex: 9999,
              pointerEvents: 'auto',
              boxShadow: theme === 'dark' 
                ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-1.5">
              {!isLoggedIn ? (
                <>
                  {/* Not Logged In - Show About Us and How It Works */}
                  <Link
                    to="/about"
                    className={`group block px-4 py-3.5 text-base font-medium transition-all duration-300 touch-manipulation rounded-xl ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800/80 active:bg-gray-700 border border-transparent hover:border-gray-700/50' 
                        : 'text-white hover:bg-white/10 active:bg-white/20 border border-transparent hover:border-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span>About Us</span>
                    </span>
                  </Link>
                  <Link
                    to="/how-it-works"
                    className={`group block px-4 py-3.5 text-base font-medium transition-all duration-300 touch-manipulation rounded-xl ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800/80 active:bg-gray-700 border border-transparent hover:border-gray-700/50' 
                        : 'text-white hover:bg-white/10 active:bg-white/20 border border-transparent hover:border-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span>How It Works</span>
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  {/* Logged In - Show User Menu Items */}
                  <Link
                    to="/questionnaire"
                    className={`group flex items-center px-4 py-3.5 text-base font-medium transition-all duration-300 touch-manipulation rounded-xl min-h-[48px] ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800/80 active:bg-gray-700 border border-transparent hover:border-gray-700/50' 
                        : 'text-white hover:bg-white/10 active:bg-white/20 border border-transparent hover:border-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-blue-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Questionnaires
                  </Link>
                  <Link
                    to="/documents"
                    className={`flex items-center px-4 py-3 text-base transition-colors touch-manipulation rounded-lg min-h-[48px] ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800 active:bg-gray-700' 
                        : 'text-white hover:bg-white/10 active:bg-white/20'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Documents
                  </Link>
                  <Link
                    to="/recommendations"
                    className={`flex items-center px-4 py-3 text-base transition-colors touch-manipulation rounded-lg min-h-[48px] ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800 active:bg-gray-700' 
                        : 'text-white hover:bg-white/10 active:bg-white/20'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Recommendations
                  </Link>
                  <Link
                    to="/favorites"
                    className={`flex items-center px-4 py-3 text-base transition-colors touch-manipulation rounded-lg min-h-[48px] ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800 active:bg-gray-700' 
                        : 'text-white hover:bg-white/10 active:bg-white/20'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Favorites
                  </Link>
                  <Link
                    to="/deadlines"
                    className={`flex items-center px-4 py-3 text-base transition-colors touch-manipulation rounded-lg min-h-[48px] ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800 active:bg-gray-700' 
                        : 'text-white hover:bg-white/10 active:bg-white/20'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Deadlines
                  </Link>
                  <Link
                    to="/update-profile"
                    className={`flex items-center px-4 py-3 text-base transition-colors touch-manipulation rounded-lg min-h-[48px] ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-gray-800 active:bg-gray-700' 
                        : 'text-white hover:bg-white/10 active:bg-white/20'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Update Profile
                  </Link>
                  <div className={`border-t my-2 ${theme === 'dark' ? 'border-gray-700' : 'border-white/20'}`}></div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className={`w-full flex items-center px-4 py-3 text-base transition-colors touch-manipulation rounded-lg min-h-[48px] ${
                      theme === 'dark'
                        ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white'
                        : 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </>,
        document.body
      )}

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
