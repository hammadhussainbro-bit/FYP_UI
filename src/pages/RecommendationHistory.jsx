import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { getRecommendationHistory } from '../utils/storage';
import RecommendationCard from '../components/RecommendationCard';
import BackupCard from '../components/BackupCard';

const RecommendationHistory = () => {
  const { theme } = useTheme();
  const [history, setHistory] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    setHistory(getRecommendationHistory());
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
            Recommendation History
          </h1>

          {history.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-white/80'}`}>
                No recommendation history yet
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`p-6 rounded-xl border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white/90 border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base sm:text-lg font-bold break-words ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      }`}>
                        Recommendations from {new Date(entry.createdAt).toLocaleDateString()}
                      </h3>
                      <p className={`text-xs sm:text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {new Date(entry.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedEntry(selectedEntry === index ? null : index)}
                      className={`px-4 py-2.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm touch-manipulation min-h-[44px] sm:min-h-[36px] flex items-center justify-center ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {selectedEntry === index ? 'Hide' : 'View Details'}
                    </button>
                  </div>

                  {selectedEntry === index && entry.recommendations && (
                    <div className="mt-4 space-y-6">
                      {entry.recommendations.top && entry.recommendations.top.length > 0 && (
                        <div>
                          <h4 className={`font-semibold mb-3 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Top Recommendations</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {entry.recommendations.top.map((uni, i) => (
                              <RecommendationCard key={i} university={uni} />
                            ))}
                          </div>
                        </div>
                      )}
                      {entry.recommendations.backup && entry.recommendations.backup.length > 0 && (
                        <div>
                          <h4 className={`font-semibold mb-3 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Backup Options</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {entry.recommendations.backup.map((uni, i) => (
                              <BackupCard key={i} university={uni} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecommendationHistory;

