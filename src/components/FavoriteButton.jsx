import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { saveToFavorites, removeFromFavorites, isFavorited, saveDeadline } from '../utils/storage';

const FavoriteButton = ({ university }) => {
  const { theme } = useTheme();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorited(university));
  }, [university]);

  const handleToggle = async (e) => {
    e.stopPropagation();
    if (favorited) {
      removeFromFavorites(university);
      setFavorited(false);
    } else {
      saveToFavorites(university);
      setFavorited(true);
      
      // Automatically create a deadline entry for the favorited university
      // Default deadline: 3 months from now (typical admission cycle)
      const defaultDeadline = new Date();
      defaultDeadline.setMonth(defaultDeadline.getMonth() + 3);
      
      const deadlineData = {
        university: university.name || university,
        program: university.program || 'General Admission',
        deadline: defaultDeadline.toISOString().split('T')[0],
        type: 'application',
        notes: `Auto-added from favorites. Please verify the actual deadline.`,
        autoAdded: true,
      };
      
      saveDeadline(deadlineData);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg transition-all hover:scale-110 ${
        favorited
          ? 'text-red-500'
          : theme === 'dark'
          ? 'text-gray-400 hover:text-red-500'
          : 'text-gray-400 hover:text-red-500'
      }`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="w-5 h-5"
        fill={favorited ? 'currentColor' : 'none'}
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
    </button>
  );
};

export default FavoriteButton;

