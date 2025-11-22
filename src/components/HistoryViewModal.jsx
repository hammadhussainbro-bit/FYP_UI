import { useTheme } from '../context/ThemeContext';
import RecommendationCard from './RecommendationCard';
import BackupCard from './BackupCard';
import AlternativeProgramCard from './AlternativeProgramCard';

const HistoryViewModal = ({ historyEntry, onClose }) => {
  const { theme } = useTheme();

  if (!historyEntry || !historyEntry.recommendations) return null;

  const { recommendations, createdAt } = historyEntry;

  return (
    <div 
      className={`fixed inset-0 z-[60] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-900/95' : 'bg-black/70'
      } backdrop-blur-xl p-3 sm:p-4 md:p-6`}
      onClick={onClose}
    >
      <div 
        className="glass-premium rounded-2xl sm:rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] mx-auto my-4 sm:my-8 relative flex flex-col overflow-hidden"
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
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
              Recommendation History
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-white/70'}`}>
              Generated on {new Date(createdAt).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 custom-scrollbar">
          {/* Top Recommendations */}
          {recommendations?.top && recommendations.top.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="w-0.5 sm:w-1 h-5 sm:h-6 md:h-8 bg-gradient-to-b from-yellow-400 to-orange-400 mr-2 sm:mr-3 rounded"></span>
                Top Recommendations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
                {recommendations.top.map((university, index) => (
                  <div key={index} className="h-full flex animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <RecommendationCard university={university} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Backup Options */}
          {recommendations?.backup && recommendations.backup.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="w-0.5 sm:w-1 h-5 sm:h-6 md:h-8 bg-gradient-to-b from-purple-400 to-pink-400 mr-2 sm:mr-3 rounded"></span>
                Backup Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
                {recommendations.backup.map((university, index) => (
                  <div key={index} className="h-full flex animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <BackupCard university={university} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Alternative Programs */}
          {recommendations?.alternative && recommendations.alternative.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="w-0.5 sm:w-1 h-5 sm:h-6 md:h-8 bg-gradient-to-b from-blue-400 to-cyan-400 mr-2 sm:mr-3 rounded"></span>
                Alternative Programs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
                {recommendations.alternative.map((program, index) => (
                  <div key={index} className="h-full flex animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <AlternativeProgramCard program={program} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryViewModal;

