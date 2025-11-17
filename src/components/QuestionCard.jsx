import { useTheme } from '../context/ThemeContext';

const QuestionCard = ({ question, children, required = false }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${
      theme === 'dark' 
        ? 'bg-gray-800/90 backdrop-blur-sm border border-gray-700' 
        : 'bg-indigo-500/30 backdrop-blur-xl border border-indigo-400/30'
    } rounded-xl shadow-lg p-3 sm:p-4 md:p-5 lg:p-6 w-full`} style={theme !== 'dark' ? {
      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2), 0 0 0 1px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.35) 100%)'
    } : {}}>
      <div className="mb-2 sm:mb-3 md:mb-4">
        <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-tight ${
          theme === 'dark' ? 'text-gray-100' : 'text-white drop-shadow-lg'
        }`} style={theme !== 'dark' ? { textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' } : {}}>
          {question}
          {required && <span className="text-red-300 ml-1 drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>*</span>}
        </h3>
      </div>
      <div className="w-full overflow-visible">{children}</div>
    </div>
  );
};

export default QuestionCard;



