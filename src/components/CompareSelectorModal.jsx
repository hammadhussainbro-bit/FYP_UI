import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CompareSelectorModal = ({ university, allUniversities, onSelect, onClose }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out the current university and filter by search term
  const availableUniversities = allUniversities.filter(
    uni => uni.name !== university.name &&
    (uni.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     uni.location?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${
        theme === 'dark' ? 'bg-gray-900/95' : 'bg-black/60'
      } backdrop-blur-xl`}
      onClick={onClose}
    >
      <div 
        className={`glass-premium rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col relative ${
          theme === 'dark' 
            ? 'bg-gray-800/90 border border-white/10' 
            : 'bg-white/10 border border-white/20'
        }`}
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: theme === 'dark'
            ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
        <div className="p-4 sm:p-6 border-b border-white/10 pr-14 sm:pr-20">
          <div className="mb-4">
            <h2 className={`text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent ${
              theme === 'dark' ? '' : 'drop-shadow-lg'
            }`}>
              Compare with Another University
            </h2>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-white/80'}`}>
            Select a university to compare with <span className="font-semibold text-purple-300">{university.name}</span>
          </p>
        </div>

        {/* Search */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl glass-premium border border-white/20 text-white placeholder-white/50 backdrop-blur-xl transition-all focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          />
        </div>

        {/* University List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 custom-scrollbar">
          {availableUniversities.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-white/70'}`}>
                No universities found
              </p>
            </div>
          ) : (
            availableUniversities.map((uni, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(uni);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-xl glass-premium border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 group ${
                  theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-700/70' : 'bg-white/10 hover:bg-white/20'
                }`}
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold mb-1 truncate group-hover:text-purple-300 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-white'
                    }`}>
                      {uni.name}
                    </h3>
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-white/70'}`}>
                      {uni.location}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs font-semibold backdrop-blur-sm">
                        Match: {uni.matchScore || 'N/A'}%
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-semibold backdrop-blur-sm">
                        {uni.program}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-lg">
                      {uni.name?.charAt(0) || '?'}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareSelectorModal;

