import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../context/ThemeContext';

const SearchableDegreeSelect = ({ value, onChange, degrees }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Memoize filtered degrees to avoid recalculation
  const filteredDegrees = useMemo(() => {
    if (!degrees || !Array.isArray(degrees)) {
      console.warn('SearchableDegreeSelect: degrees prop is not an array', degrees);
      return [];
    }
    if (!searchTerm) return degrees;
    const lowerSearch = searchTerm.toLowerCase();
    return degrees.filter((degree) => degree.toLowerCase().includes(lowerSearch));
  }, [degrees, searchTerm]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setIsOpen(true);
    setSearchTerm(value || '');
  }, [value]);

  const handleSelect = useCallback((degree) => {
    onChange(degree);
    setIsOpen(false);
    setSearchTerm('');
  }, [onChange]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input/Button */}
      <div
        onClick={handleOpen}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 cursor-pointer flex items-center justify-between transition-all ${
          theme === 'dark'
            ? 'bg-gray-700/90 border-gray-600 text-gray-100 hover:border-purple-500'
            : 'border-white/40 bg-white/30 backdrop-blur-sm text-white hover:border-white/60'
        }`}
        style={theme !== 'dark' ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}
      >
        <span className={value ? (theme === 'dark' ? 'text-gray-100' : 'text-white') : (theme === 'dark' ? 'text-gray-400' : 'text-white/70')}>
          {value || 'Search or select a degree program...'}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-white/80'
          } ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown - Using Portal to escape overflow containers */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          className={`fixed z-[9999] border-2 rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-600'
              : 'bg-indigo-500/40 border-indigo-400/40'
          }`}
          style={theme !== 'dark' ? {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.45) 100%)',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${Math.max(dropdownPosition.width, 280)}px`,
            maxWidth: 'calc(100vw - 16px)',
            maxHeight: 'calc(100vh - 120px)',
          } : {
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${Math.max(dropdownPosition.width, 280)}px`,
            maxWidth: 'calc(100vw - 16px)',
            maxHeight: 'calc(100vh - 120px)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className={`p-3 border-b-2 sticky top-0 z-10 backdrop-blur-sm ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-600'
              : 'bg-indigo-500/30 border-indigo-400/30'
          }`}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search degree programs..."
              className={`w-full px-4 py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 min-h-[44px] ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                  : 'border-white/40 bg-white/30 text-white placeholder-white/70 backdrop-blur-sm'
              }`}
              style={theme !== 'dark' ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className={`overflow-y-auto overflow-x-hidden backdrop-blur-sm ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-500/30'
          }`}
          style={theme !== 'dark' ? {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.35) 100%)',
            maxHeight: 'calc(100vh - 200px)',
            WebkitOverflowScrolling: 'touch'
          } : {
            maxHeight: 'calc(100vh - 200px)',
            WebkitOverflowScrolling: 'touch'
          }}>
            {filteredDegrees && filteredDegrees.length > 0 ? (
              filteredDegrees.map((degree, i) => (
                <div
                  key={`${degree}-${i}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(degree);
                  }}
                  className={`px-4 py-3 cursor-pointer transition-colors select-none text-sm sm:text-base min-h-[44px] flex items-center break-words ${
                    value === degree
                      ? theme === 'dark'
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'bg-purple-200/80 text-purple-900 font-semibold backdrop-blur-sm'
                      : theme === 'dark'
                      ? 'hover:bg-gray-700 bg-gray-800 text-gray-100'
                      : 'hover:bg-white/30 bg-transparent text-white'
                  }`}
                  style={theme !== 'dark' && value !== degree ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}
                >
                  {degree}
                </div>
              ))
            ) : (
              <div className={`px-4 py-3 text-center ${
                theme === 'dark'
                  ? 'text-gray-400 bg-gray-800'
                  : 'text-white/70 bg-transparent'
              }`} style={theme !== 'dark' ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>No degree programs found</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default SearchableDegreeSelect;
