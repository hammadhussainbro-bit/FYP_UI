import { useTheme } from '../context/ThemeContext';
import FavoriteButton from './FavoriteButton';

const UniversityDetailModal = ({ university, onClose }) => {
  const { theme } = useTheme();

  if (!university) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/50'
    } backdrop-blur-sm p-4 overflow-y-auto`}>
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-xl shadow-2xl max-w-4xl w-full my-8`}>
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>{university.name}</h2>
              <FavoriteButton university={university} />
            </div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {university.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-200 ${
              theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Match Score
              </p>
              <p className={`text-2xl font-bold mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {university.matchScore}%
              </p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Ranking
              </p>
              <p className={`text-xl font-bold mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {university.rank}
              </p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Tuition Fee
              </p>
              <p className={`text-lg font-bold mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {university.tuitionFee}
              </p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Entry Test
              </p>
              <p className={`text-lg font-bold mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {university.entryTestRequired}
              </p>
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>Program Offered</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {university.program}
            </p>
          </div>

          {university.highlights && (
            <div>
              <h3 className={`text-lg font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Why This University?</h3>
              <ul className={`list-disc list-inside space-y-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {university.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Apply Now
            </button>
            <button
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              Visit Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailModal;

