import { useTheme } from '../context/ThemeContext';
import FavoriteButton from './FavoriteButton';

const BackupCard = ({ university, onCompare }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700'
        : 'bg-gradient-to-br from-gray-50 to-purple-50/50 border-purple-200/50'
    } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`text-xl font-bold flex-1 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {university.name}
            </h3>
            <FavoriteButton university={university} />
          </div>
          <p className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{university.location}</p>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
              Match: {university.matchScore}%
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
              {university.rank}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
          {university.name.charAt(0)}
        </div>
      </div>

      <div className="mb-4">
        <h4 className={`font-semibold mb-2 ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}>Program:</h4>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>{university.program}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Tuition Fee</p>
          <p className={`font-semibold text-sm ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {university.tuitionFee}
          </p>
        </div>
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Entry Test</p>
          <p className={`font-semibold text-sm ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {university.entryTestRequired}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {onCompare && (
          <button
            onClick={() => onCompare(university)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold text-sm"
          >
            Compare
          </button>
        )}
        <button className={`${onCompare ? 'flex-1' : 'w-full'} px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-semibold text-sm`}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default BackupCard;



