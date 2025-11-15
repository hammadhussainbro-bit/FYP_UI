import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const UniversityComparison = ({ universities, onClose }) => {
  const { theme } = useTheme();
  const [selectedUnis, setSelectedUnis] = useState(universities || []);

  const addUniversity = (uni) => {
    if (selectedUnis.length < 3 && !selectedUnis.find(u => u.name === uni.name)) {
      setSelectedUnis([...selectedUnis, uni]);
    }
  };

  const removeUniversity = (index) => {
    setSelectedUnis(selectedUnis.filter((_, i) => i !== index));
  };

  const getComparisonData = (field) => {
    return selectedUnis.map(uni => {
      if (field === 'tuitionFee') {
        const match = uni.tuitionFee?.match(/(\d[\d,]*)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 0;
      }
      if (field === 'matchScore') {
        return uni.matchScore || 0;
      }
      return uni[field] || 'N/A';
    });
  };

  if (selectedUnis.length === 0) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/50'
      } backdrop-blur-sm`}>
        <div className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-2xl p-6 max-w-md w-full mx-4`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>Compare Universities</h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-gray-200 ${
                theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Select universities to compare</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${
      theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/50'
    } backdrop-blur-sm p-4`}>
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-xl shadow-2xl max-w-7xl mx-auto my-8`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>University Comparison</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-200 ${
              theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[600px] sm:min-w-0">
            <thead>
              <tr className={`${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <th className={`px-4 py-3 text-left font-semibold ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>Criteria</th>
                {selectedUnis.map((uni, index) => (
                  <th key={index} className={`px-4 py-3 text-left font-semibold ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span>{uni.name}</span>
                      <button
                        onClick={() => removeUniversity(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <td className={`px-4 py-3 font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Location</td>
                {selectedUnis.map((uni, index) => (
                  <td key={index} className={`px-4 py-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{uni.location}</td>
                ))}
              </tr>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <td className={`px-4 py-3 font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Program</td>
                {selectedUnis.map((uni, index) => (
                  <td key={index} className={`px-4 py-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{uni.program}</td>
                ))}
              </tr>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <td className={`px-4 py-3 font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Match Score</td>
                {selectedUnis.map((uni, index) => (
                  <td key={index} className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={`w-24 h-2 rounded-full mr-2 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${uni.matchScore || 0}%` }}
                        />
                      </div>
                      <span className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{uni.matchScore}%</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <td className={`px-4 py-3 font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Ranking</td>
                {selectedUnis.map((uni, index) => (
                  <td key={index} className={`px-4 py-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{uni.rank}</td>
                ))}
              </tr>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <td className={`px-4 py-3 font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Tuition Fee</td>
                {selectedUnis.map((uni, index) => (
                  <td key={index} className={`px-4 py-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{uni.tuitionFee}</td>
                ))}
              </tr>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <td className={`px-4 py-3 font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Entry Test</td>
                {selectedUnis.map((uni, index) => (
                  <td key={index} className={`px-4 py-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{uni.entryTestRequired}</td>
                ))}
              </tr>
              {selectedUnis[0]?.highlights && (
                <tr>
                  <td className={`px-4 py-3 font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Highlights</td>
                  {selectedUnis.map((uni, index) => (
                    <td key={index} className="px-4 py-3">
                      <ul className={`list-disc list-inside space-y-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {(uni.highlights || []).slice(0, 3).map((h, i) => (
                          <li key={i} className="text-sm">{h}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UniversityComparison;

