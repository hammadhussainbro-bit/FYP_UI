import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import FavoriteButton from './FavoriteButton';
import UniversityDetailModal from './UniversityDetailModal';

const RecommendationCard = ({ university, onCompare }) => {
  const { theme } = useTheme();
  const [showDetail, setShowDetail] = useState(false);
  
  return (
    <div className={`${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700'
        : 'bg-gradient-to-br from-gray-50 to-blue-50/50 border-blue-200/50'
    } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-5 md:p-6 border`}>
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
          }`}>{university.location}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold whitespace-nowrap">
              Match: {university.matchScore}%
            </span>
            <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold whitespace-nowrap">
              {university.rank}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl flex-shrink-0">
          {university.name.charAt(0)}
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <h4 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}>Program Offered:</h4>
        <p className={`text-sm sm:text-base break-words ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>{university.program}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Tuition Fee</p>
          <p className={`font-semibold text-sm sm:text-base break-words ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>{university.tuitionFee}</p>
        </div>
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Entry Test Required</p>
          <p className={`font-semibold text-sm sm:text-base break-words ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {university.entryTestRequired}
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
          {university.highlights.map((highlight, index) => (
            <li key={index} className="break-words">{highlight}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 mt-3 sm:mt-4">
        {onCompare && (
          <button
            onClick={() => onCompare(university)}
            className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-semibold text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center"
          >
            Compare
          </button>
        )}
        <button
          onClick={() => setShowDetail(true)}
          className={`${onCompare ? 'w-full sm:flex-1' : 'w-full'} px-3 sm:px-4 py-2.5 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center`}
        >
          View Details
        </button>
      </div>

      {showDetail && (
        <UniversityDetailModal
          university={university}
          onClose={() => setShowDetail(false)}
        />
      )}
    </div>
  );
};

export default RecommendationCard;



