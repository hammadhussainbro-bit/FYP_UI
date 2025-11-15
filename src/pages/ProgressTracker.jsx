import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { getProgress } from '../utils/storage';

const ProgressTracker = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState({ milestones: [], achievements: [], points: 0 });

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const achievements = [
    { id: 'first_questionnaire', name: 'First Steps', desc: 'Complete your first questionnaire', icon: '🎯' },
    { id: 'profile_complete', name: 'Profile Complete', desc: 'Fill out your complete profile', icon: '✅' },
    { id: 'recommendations', name: 'Explorer', desc: 'View your first recommendations', icon: '🔍' },
    { id: 'favorites', name: 'Collector', desc: 'Save 5 universities to favorites', icon: '⭐' },
    { id: 'deadlines', name: 'Organized', desc: 'Set up 3 application deadlines', icon: '📅' },
  ];

  const milestones = [
    { id: 'questionnaire_complete', name: 'Questionnaire Completed', progress: progress.milestones.includes('questionnaire_complete') ? 100 : 0 },
    { id: 'recommendations_viewed', name: 'Recommendations Viewed', progress: progress.milestones.includes('recommendations_viewed') ? 100 : 0 },
    { id: 'favorites_saved', name: 'Favorites Saved', progress: progress.milestones.includes('favorites_saved') ? 100 : 0 },
  ];

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
            My Progress
          </h1>

          {/* Points Card */}
          <div className={`mb-8 p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Points
                </p>
                <p className={`text-4xl font-bold mt-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {progress.points}
                </p>
              </div>
              <div className="text-6xl">🏆</div>
            </div>
          </div>

          {/* Milestones */}
          <section className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}>Milestones</h2>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white/90'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>{milestone.name}</span>
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{milestone.progress}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}>Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const unlocked = progress.achievements.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border transition-all ${
                      unlocked
                        ? theme === 'dark'
                          ? 'bg-gray-800 border-yellow-500'
                          : 'bg-white/90 border-yellow-400'
                        : theme === 'dark'
                        ? 'bg-gray-800/50 border-gray-700 opacity-50'
                        : 'bg-white/50 border-gray-300 opacity-50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className={`font-bold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>{achievement.name}</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{achievement.desc}</p>
                    {unlocked && (
                      <span className="inline-block mt-2 text-xs text-yellow-600 font-semibold">
                        ✓ Unlocked
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProgressTracker;

