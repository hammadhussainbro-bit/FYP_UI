import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecommendationCard from '../components/RecommendationCard';
import { useTheme } from '../context/ThemeContext';
import { getFavorites, removeFromFavorites } from '../utils/storage';
import LoadingSpinner from '../components/LoadingSpinner';
import { SkeletonList } from '../components/SkeletonLoader';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const Favorites = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('matchScore');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useScrollAnimation();
  const cardsRef = useScrollAnimation();

  useEffect(() => {
    const loadFavorites = async () => {
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
        setTimeout(() => setLoading(false), 300);
      }
    };
    loadFavorites();
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
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      {loading && <LoadingSpinner fullScreen size="xl" />}
      
      {/* Animated Background Blobs - More blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden" style={{ mixBlendMode: 'screen' }}>
        <div 
          className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-fuchsia-500 rounded-full blur-3xl absolute -top-20 -left-20" 
          style={{
            animation: 'blobMove1 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div 
          className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] bg-indigo-500 rounded-full blur-3xl absolute bottom-20 right-20" 
          style={{
            animation: 'blobMove2 18s ease-in-out infinite',
            animationDelay: '3s',
            willChange: 'transform',
          }}
        />
        <div 
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-purple-500 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          style={{
            animation: 'blobMove1 20s ease-in-out infinite',
            animationDelay: '6s',
            willChange: 'transform',
          }}
        />
        <div 
          className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-pink-500 rounded-full blur-3xl absolute top-1/4 right-1/4" 
          style={{
            animation: 'blobMove2 22s ease-in-out infinite',
            animationDelay: '9s',
            willChange: 'transform',
          }}
        />
      </div>

      <Navbar />
      
      <div className={`flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 relative z-10 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef.ref} className={`text-center mb-6 sm:mb-8 md:mb-12 px-2 transition-all duration-700 ease-out ${
            heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight">
              My Favorites
            </h1>
            <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-light px-2">
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


          {/* Filters and Sort */}
          {!loading && (
            <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 w-full">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`flex-1 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base min-h-[44px] glass-premium border border-white/20 text-white backdrop-blur-xl transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50'
                      : 'bg-white/10'
                  }`}
                >
                  <option value="all">All Favorites</option>
                  <option value="top">Top Matches (90%+)</option>
                  <option value="backup">Backup Options</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`flex-1 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base min-h-[44px] glass-premium border border-white/20 text-white backdrop-blur-xl transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50'
                      : 'bg-white/10'
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
            <div ref={heroRef.ref} className={`text-center py-8 sm:py-12 rounded-xl sm:rounded-2xl glass-premium scroll-reveal transition-all duration-700 ease-out ${
              heroRef.isVisible ? 'revealed' : ''
            }`}>
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-pink-400 animate-pulse"
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
              <p className={`text-base sm:text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-white'
              }`}>No favorites yet</p>
              <p className={`text-xs sm:text-sm px-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-white/80'
              }`}>Start saving universities from your recommendations!</p>
              <button
                onClick={() => navigate('/recommendations')}
                className="mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-indigo-700 transition-all shadow-xl hover:scale-105 hover:shadow-2xl"
              >
                View Recommendations
              </button>
            </div>
          ) : !loading && filteredAndSorted.length > 0 ? (
            <div ref={cardsRef.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 scroll-reveal transition-all duration-700 ease-out ${
              cardsRef.isVisible ? 'revealed' : ''
            }`}>
              {filteredAndSorted.map((university, index) => {
                if (!university || !university.name) return null;
                return (
                  <div key={`${university.name}-${index}`} className="relative group animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <RecommendationCard university={university} />
                    <button
                      onClick={() => handleRemove(university)}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 sm:p-2.5 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all shadow-xl z-10 hover:scale-110 group-hover:opacity-100 opacity-0"
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

