import { useTheme } from '../context/ThemeContext';

const AlternativeProgramCard = ({ program }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700'
        : 'bg-gradient-to-br from-gray-50 to-amber-50/50 border-amber-200/50'
    } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border`}>
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

      <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all font-semibold text-sm">
        Explore Program
      </button>
    </div>
  );
};

export default AlternativeProgramCard;



