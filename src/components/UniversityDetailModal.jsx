import { useTheme } from '../context/ThemeContext';
import FavoriteButton from './FavoriteButton';

const UniversityDetailModal = ({ university, onClose }) => {
  const { theme } = useTheme();

  if (!university) return null;

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900/95' : 'bg-black/70'
      } backdrop-blur-xl p-3 sm:p-4 overflow-y-auto`}
      onClick={onClose}
    >
      <div 
        className="glass-premium rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] my-4 sm:my-8 relative flex flex-col overflow-hidden"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          boxShadow: theme === 'dark'
            ? '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            : '0 25px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="group absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
          style={{
            background: theme === 'dark' 
              ? 'rgba(239, 68, 68, 0.9)' 
              : 'rgba(239, 68, 68, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
          title="Close"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 border-b border-white/10 pr-14 sm:pr-20">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent break-words ${
                theme === 'dark' ? '' : 'drop-shadow-lg'
              }`}>
                {university.name}
              </h2>
              <FavoriteButton university={university} />
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-white/70'}`}>
                {university.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
            style={{
              background: theme === 'dark' 
                ? 'rgba(239, 68, 68, 0.9)' 
                : 'rgba(239, 68, 68, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
            title="Close"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="glass-premium rounded-xl p-3 sm:p-4 border border-white/10">
              <p className={`text-xs sm:text-sm mb-1 sm:mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-white/60'}`}>
                Match Score
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    style={{ width: `${university.matchScore || 0}%` }}
                  />
                </div>
                <p className={`text-lg sm:text-xl md:text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  {university.matchScore}%
                </p>
              </div>
            </div>
            <div className="glass-premium rounded-xl p-3 sm:p-4 border border-white/10">
              <p className={`text-xs sm:text-sm mb-1 sm:mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-white/60'}`}>
                Ranking
              </p>
              <p className={`text-lg sm:text-xl md:text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                {university.rank || 'N/A'}
              </p>
            </div>
            <div className="glass-premium rounded-xl p-3 sm:p-4 border border-white/10">
              <p className={`text-xs sm:text-sm mb-1 sm:mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-white/60'}`}>
                Tuition Fee
              </p>
              <p className={`text-sm sm:text-base md:text-lg font-bold break-words ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                {university.tuitionFee || 'Not specified'}
              </p>
            </div>
            <div className="glass-premium rounded-xl p-3 sm:p-4 border border-white/10">
              <p className={`text-xs sm:text-sm mb-1 sm:mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-white/60'}`}>
                Entry Test
              </p>
              <p className={`text-sm sm:text-base md:text-lg font-bold break-words ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                {university.entryTestRequired || 'Not specified'}
              </p>
            </div>
          </div>

          {/* Program Details */}
          <div className="glass-premium rounded-xl p-4 sm:p-5 border border-white/10">
            <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}>
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Program Offered
            </h3>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-white/90'}`}>
              {university.program || 'Not specified'}
            </p>
          </div>

          {/* Highlights */}
          {university.highlights && university.highlights.length > 0 && (
            <div className="glass-premium rounded-xl p-4 sm:p-5 border border-white/10">
              <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-white'
              }`}>
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why This University?
              </h3>
              <ul className={`space-y-2 sm:space-y-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-white/90'
              }`}>
                {university.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                    <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Information */}
          <div className="glass-premium rounded-xl p-4 sm:p-5 border border-white/10">
            <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}>
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Additional Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              <div>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-white/60'} mb-1`}>Application Deadline</p>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-white'}`}>Varies by program</p>
              </div>
              <div>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-white/60'} mb-1`}>Scholarship Available</p>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-white'}`}>Yes, merit-based</p>
              </div>
              <div>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-white/60'} mb-1`}>Campus Facilities</p>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-white'}`}>Modern & well-equipped</p>
              </div>
              <div>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-white/60'} mb-1`}>Student Support</p>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-white'}`}>Comprehensive services</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              className="group relative w-full sm:flex-1 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 touch-manipulation min-h-[48px] flex items-center justify-center overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                Apply Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button
              className="group relative w-full sm:flex-1 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:from-purple-600 hover:to-pink-700 transition-all duration-300 touch-manipulation min-h-[48px] flex items-center justify-center overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                Visit Website
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailModal;

