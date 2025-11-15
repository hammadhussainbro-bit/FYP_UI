import { useTheme } from '../context/ThemeContext';

const QuestionCard = ({ question, children, required = false }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${
      theme === 'dark' 
        ? 'bg-gray-800/90 backdrop-blur-sm border border-gray-700' 
        : 'bg-white/90 backdrop-blur-sm'
    } rounded-xl shadow-lg p-4 sm:p-5 md:p-6 w-full`}>
      <div className="mb-3 sm:mb-4">
        <h3 className={`text-base sm:text-lg md:text-xl font-semibold leading-tight ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}>
          {question}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default QuestionCard;



