import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const { theme } = useTheme();
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-xl" style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)' 
          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)'
      }}>
        {/* Animated blobs in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="w-[300px] h-[300px] bg-fuchsia-500 rounded-full blur-3xl absolute top-1/4 left-1/4 opacity-40"
            style={{
              animation: 'blobMove1 8s ease-in-out infinite',
            }}
          />
          <div 
            className="w-[250px] h-[250px] bg-indigo-500 rounded-full blur-3xl absolute bottom-1/4 right-1/4 opacity-40"
            style={{
              animation: 'blobMove2 8s ease-in-out infinite',
              animationDelay: '2s',
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Triple ring spinner */}
          <div className="relative">
            <div className={`${sizeClasses[size]} border-4 ${theme === 'dark' ? 'border-gray-700/50' : 'border-white/10'} border-t-purple-500 rounded-full animate-spin`} style={{ animationDuration: '1s' }}></div>
            <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-pink-500 rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
            <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-b-blue-500 rounded-full animate-spin`} style={{ animationDuration: '1.5s' }}></div>
          </div>
          {/* Pulsing glow */}
          <div className={`absolute inset-0 ${sizeClasses[size]} bg-purple-500 rounded-full blur-xl opacity-50 animate-pulse`}></div>
        </div>
        
        <p className={`mt-8 text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-white'} animate-pulse`}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 ${theme === 'dark' ? 'border-gray-700' : 'border-white/20'} border-t-purple-500 rounded-full animate-spin`}></div>
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-pink-500 rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

