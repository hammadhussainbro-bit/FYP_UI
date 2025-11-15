import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Statistics = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalQuestionnaires: 0,
    averageSSC: 0,
    averageHSSC: 0,
    topDegree: '',
    topCity: '',
    topCareer: '',
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    try {
      const questionnaires = JSON.parse(localStorage.getItem('questionnaires') || '[]');
      const userEmail = localStorage.getItem('userEmail');
      const userQuestionnaires = questionnaires.filter(q => q.userEmail === userEmail);

      if (userQuestionnaires.length === 0) return;

      const sscScores = userQuestionnaires
        .map(q => parseFloat(q.sscPercentage) || 0)
        .filter(s => s > 0);
      const hsscScores = userQuestionnaires
        .map(q => parseFloat(q.hsscPercentage) || 0)
        .filter(s => s > 0);

      const degrees = userQuestionnaires.map(q => q.preferredDegree).filter(Boolean);
      const cities = userQuestionnaires.flatMap(q => q.preferredCities || []).filter(Boolean);
      const careers = userQuestionnaires.map(q => q.careerPreference).filter(Boolean);

      const degreeCount = {};
      degrees.forEach(d => { degreeCount[d] = (degreeCount[d] || 0) + 1; });
      const cityCount = {};
      cities.forEach(c => { cityCount[c] = (cityCount[c] || 0) + 1; });
      const careerCount = {};
      careers.forEach(c => { careerCount[c] = (careerCount[c] || 0) + 1; });

      setStats({
        totalQuestionnaires: userQuestionnaires.length,
        averageSSC: sscScores.length > 0 ? (sscScores.reduce((a, b) => a + b, 0) / sscScores.length).toFixed(1) : 0,
        averageHSSC: hsscScores.length > 0 ? (hsscScores.reduce((a, b) => a + b, 0) / hsscScores.length).toFixed(1) : 0,
        topDegree: Object.keys(degreeCount).sort((a, b) => degreeCount[b] - degreeCount[a])[0] || 'N/A',
        topCity: Object.keys(cityCount).sort((a, b) => cityCount[b] - cityCount[a])[0] || 'N/A',
        topCareer: Object.keys(careerCount).sort((a, b) => careerCount[b] - careerCount[a])[0] || 'N/A',
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const degreeData = {
    labels: ['Computer Science', 'Engineering', 'Business', 'Other'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(251, 191, 36, 0.8)',
      ],
    }],
  };

  const cityData = {
    labels: ['Karachi', 'Lahore', 'Islamabad', 'Other'],
    datasets: [{
      label: 'Preferences',
      data: [35, 30, 25, 10],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
    }],
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
            My Statistics
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Questionnaires
              </p>
              <p className={`text-3xl font-bold mt-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {stats.totalQuestionnaires}
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Average SSC %
              </p>
              <p className={`text-3xl font-bold mt-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {stats.averageSSC}%
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Average HSSC %
              </p>
              <p className={`text-3xl font-bold mt-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {stats.averageHSSC}%
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Top Preference
              </p>
              <p className={`text-lg font-bold mt-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {stats.topDegree}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Preferred Degree Programs
              </h3>
              <Pie data={degreeData} />
            </div>
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Preferred Cities
              </h3>
              <Bar data={cityData} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Statistics;

