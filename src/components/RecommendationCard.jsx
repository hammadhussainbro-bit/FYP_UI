import { useTheme } from '../context/ThemeContext';
import FavoriteButton from './FavoriteButton';

const RecommendationCard = ({ university, onCompare, onViewDetails }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`glass-premium rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-5 md:p-6 border border-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col`} style={{ 
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
      boxShadow: theme === 'dark' 
        ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
        : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    }}>
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold break-words flex-1 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {university.name}
            </h3>
            <FavoriteButton university={university} />
          </div>
          <p className={`text-xs sm:text-sm mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{university.location || 'Location not specified'}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold whitespace-nowrap">
              Match: {university.matchScore || 'N/A'}%
            </span>
            {university.rank && (
              <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold whitespace-nowrap">
                {university.rank}
              </span>
            )}
          </div>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl flex-shrink-0">
          {university.name ? university.name.charAt(0).toUpperCase() : '?'}
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <h4 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}>Program Offered:</h4>
        <p className={`text-sm sm:text-base break-words ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>{university.program || 'Program not specified'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Tuition Fee</p>
          <p className={`font-semibold text-sm sm:text-base break-words ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>{university.tuitionFee || 'Not specified'}</p>
        </div>
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Entry Test Required</p>
          <p className={`font-semibold text-sm sm:text-base break-words ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {university.entryTestRequired || 'Not specified'}
          </p>
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <h4 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}>Why This University:</h4>
        <ul className={`list-disc list-inside text-xs sm:text-sm space-y-1 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {university.highlights && Array.isArray(university.highlights) && university.highlights.length > 0 ? (
            university.highlights.map((highlight, index) => (
              <li key={index} className="break-words">{highlight}</li>
            ))
          ) : (
            <li className="break-words">No highlights available</li>
          )}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 mt-auto pt-3 sm:pt-4">
        {onCompare && (
          <button
            onClick={() => onCompare(university)}
            className="group relative w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 font-semibold text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-2">
              Compare
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        )}
        <button
          onClick={() => onViewDetails && onViewDetails(university)}
          className={`group relative ${onCompare ? 'w-full sm:flex-1' : 'w-full'} px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5`}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10 flex items-center gap-2">
            View Details
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;



