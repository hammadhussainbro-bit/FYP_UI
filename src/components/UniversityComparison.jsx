import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const UniversityComparison = ({ universities, onClose }) => {
  const { theme } = useTheme();
  const [selectedUnis, setSelectedUnis] = useState(universities || []);

  const removeUniversity = (index) => {
    const newUnis = selectedUnis.filter((_, i) => i !== index);
    setSelectedUnis(newUnis);
    if (newUnis.length === 0) {
      onClose();
    }
  };

  if (selectedUnis.length === 0) {
    return null;
  }

  const comparisonFields = [
    { label: 'Location', key: 'location' },
    { label: 'Program', key: 'program' },
    { label: 'Match Score', key: 'matchScore', type: 'progress' },
    { label: 'Ranking', key: 'rank' },
    { label: 'Tuition Fee', key: 'tuitionFee' },
    { label: 'Entry Test Required', key: 'entryTestRequired' },
    { label: 'Highlights', key: 'highlights', type: 'list' },
  ];

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
              University Comparison
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-white/70'}`}>
              Side-by-side comparison of selected universities
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          <div className={`grid grid-cols-1 ${selectedUnis.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 sm:gap-6`}>
            {selectedUnis.map((uni, uniIndex) => (
              <div 
                key={uniIndex}
                className="glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] relative group"
                style={{
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeUniversity(uniIndex)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* University Header */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0 shadow-lg">
                      {uni.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-1 break-words ${
                        theme === 'dark' ? 'text-white' : 'text-white'
                      }`}>
                        {uni.name}
                      </h3>
                      <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-white/70'}`}>
                        {uni.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comparison Details */}
                <div className="space-y-3 sm:space-y-4">
                  {comparisonFields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="border-b border-white/5 pb-3 last:border-0">
                      <p className={`text-xs sm:text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-white/60'}`}>
                        {field.label}
                      </p>
                      {field.type === 'progress' ? (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: `${uni[field.key] || 0}%` }}
                            />
                          </div>
                          <span className={`text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                            {uni[field.key] || 0}%
                          </span>
                        </div>
                      ) : field.type === 'list' ? (
                        <ul className={`list-disc list-inside space-y-1 text-xs sm:text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-white/80'
                        }`}>
                          {(uni[field.key] || []).slice(0, 3).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className={`text-sm sm:text-base break-words ${
                          theme === 'dark' ? 'text-white' : 'text-white'
                        }`}>
                          {uni[field.key] || 'N/A'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityComparison;

