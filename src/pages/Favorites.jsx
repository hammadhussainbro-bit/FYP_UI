import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecommendationCard from '../components/RecommendationCard';
import { useTheme } from '../context/ThemeContext';
import { getFavorites, removeFromFavorites } from '../utils/storage';

const Favorites = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('matchScore');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const favs = getFavorites();
      // Ensure favorites is an array and filter out any invalid entries
      const validFavorites = Array.isArray(favs) 
        ? favs.filter(fav => fav && fav.name && fav.program)
        : [];
      setFavorites(validFavorites);
      setError(null);
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Failed to load favorites. Please try refreshing the page.');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = (university) => {
    try {
      removeFromFavorites(university);
      const favs = getFavorites();
      const validFavorites = Array.isArray(favs) 
        ? favs.filter(fav => fav && fav.name && fav.program)
        : [];
      setFavorites(validFavorites);
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove favorite. Please try again.');
    }
  };

  // Safely filter and sort favorites
  const filteredAndSorted = (() => {
    try {
      return (favorites || [])
        .filter(fav => {
          if (!fav || !fav.name) return false;
          if (filter === 'all') return true;
          if (filter === 'top') return (fav.matchScore || 0) >= 90;
          if (filter === 'backup') return (fav.matchScore || 0) < 90;
          return true;
        })
        .sort((a, b) => {
          try {
            if (sortBy === 'matchScore') {
              return (b.matchScore || 0) - (a.matchScore || 0);
            }
            if (sortBy === 'name') {
              return (a.name || '').localeCompare(b.name || '');
            }
            if (sortBy === 'fee') {
              const getFee = (str) => {
                if (!str) return 0;
                const match = String(str).match(/(\d[\d,]*)/);
                return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
              };
              return getFee(a.tuitionFee) - getFee(b.tuitionFee);
            }
            return 0;
          } catch (err) {
            console.error('Error sorting favorites:', err);
            return 0;
          }
        });
    } catch (err) {
      console.error('Error filtering/sorting favorites:', err);
      return [];
    }
  })();


  // Safety check for theme
  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              My Favorites
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg">
              Your saved universities and programs
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-fadeIn">
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-4 text-red-300 hover:text-red-100 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-white/80 mt-4">Loading favorites...</p>
            </div>
          )}

          {/* Filters and Sort - Only show if not loading */}
          {!loading && (
            <div className="mb-6 flex flex-col gap-4 w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`flex-1 w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base min-h-[44px] ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-200 border border-gray-700'
                      : 'bg-white/90 text-gray-800 border border-white/30'
                  }`}
                >
                  <option value="all">All Favorites</option>
                  <option value="top">Top Matches (90%+)</option>
                  <option value="backup">Backup Options</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`flex-1 w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base min-h-[44px] ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-200 border border-gray-700'
                      : 'bg-white/90 text-gray-800 border border-white/30'
                  }`}
                >
                  <option value="matchScore">Sort by Match Score</option>
                  <option value="name">Sort by Name</option>
                  <option value="fee">Sort by Fee</option>
                </select>
              </div>
            </div>
          )}

          {!loading && filteredAndSorted.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-white'
              }`}>No favorites yet</p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-white/80'
              }`}>Start saving universities from your recommendations!</p>
              <button
                onClick={() => navigate('/recommendations')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                View Recommendations
              </button>
            </div>
          ) : !loading && filteredAndSorted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSorted.map((university, index) => {
                if (!university || !university.name) return null;
                return (
                  <div key={`${university.name}-${index}`} className="relative">
                    <RecommendationCard university={university} />
                    <button
                      onClick={() => handleRemove(university)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg z-10"
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;

