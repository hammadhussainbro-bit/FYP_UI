import { useTheme } from '../context/ThemeContext';

const SkeletonCard = ({ className = '' }) => {
  const { theme } = useTheme();
  return (
    <div className={`${className} ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'} rounded-xl animate-pulse`}>
      <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white/20'} rounded w-3/4 mb-3`}></div>
      <div className={`h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white/20'} rounded w-full mb-2`}></div>
      <div className={`h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white/20'} rounded w-5/6`}></div>
    </div>
  );
};

const SkeletonList = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} className="p-4" />
      ))}
    </div>
  );
};

export { SkeletonCard, SkeletonList };
export default SkeletonCard;

