import { useTheme } from '../context/ThemeContext';

const AlternativeProgramCard = ({ program }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`glass-premium rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-5 md:p-6 border border-white/10 hover:border-white/20 h-full flex flex-col`} style={{ 
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
      boxShadow: theme === 'dark' 
        ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
        : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-2 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {program.programName}
          </h3>
          <p className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{program.university}</p>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
              Alternative
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
              {program.duration}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
          {program.programName.charAt(0)}
        </div>
      </div>

      <div className="mb-4">
        <h4 className={`font-semibold mb-2 ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}>Description:</h4>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>{program.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Tuition Fee</p>
          <p className={`font-semibold text-sm ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {program.tuitionFee}
          </p>
        </div>
        <div>
          <p className={`text-xs mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Career Path</p>
          <p className={`font-semibold text-sm ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {program.careerPath}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className={`font-semibold mb-2 text-sm ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}>Skills Gained:</h4>
        <div className="flex flex-wrap gap-2">
          {program.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full mt-auto pt-4 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg sm:rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all font-semibold text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5">
        Explore Program
      </button>
    </div>
  );
};

export default AlternativeProgramCard;



