import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const AboutUs = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fadeIn px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
              About MeritVoyage
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80">
              Empowering students to make informed decisions about their future
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Mission Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 animate-slideIn">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                MeritVoyage is dedicated to revolutionizing the way students discover and
                select universities. We leverage cutting-edge artificial intelligence
                and machine learning technologies to provide personalized, data-driven
                recommendations that align with each student's unique academic profile,
                preferences, and career aspirations.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 animate-slideIn">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Our Vision</h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                We envision a future where every student has access to comprehensive,
                unbiased, and intelligent guidance for their higher education journey.
                By combining advanced AI algorithms with extensive university databases,
                we aim to bridge the gap between students' potential and their ideal
                academic institutions.
              </p>
            </div>

            {/* What We Do Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 animate-slideIn">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Matching</h3>
                  <p className="text-white/80">
                    Our AI analyzes your academic performance, preferences, and goals to match you with the best-fit universities.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Data</h3>
                  <p className="text-white/80">
                    Access detailed information about programs, fees, rankings, admission requirements, and more.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Fast & Easy</h3>
                  <p className="text-white/80">
                    Complete a simple questionnaire and receive instant, personalized recommendations.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Always Updated</h3>
                  <p className="text-white/80">
                    Our database is continuously updated with the latest university information and admission criteria.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 animate-slideIn">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 text-center">Our Team</h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 text-center">
                MeritVoyage is developed by a passionate team of engineers, data scientists,
                and education experts committed to making higher education accessible
                and transparent.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Team Member 1 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl sm:text-3xl md:text-4xl">
                    HH
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Hammad Hussain</h3>
                  <p className="text-white/70 text-sm sm:text-base">Team Member</p>
                </div>

                {/* Team Member 2 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl sm:text-3xl md:text-4xl">
                    HU
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Haseeb Ullah</h3>
                  <p className="text-white/70 text-sm sm:text-base">Team Member</p>
                </div>

                {/* Team Member 3 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 hover:bg-white/10 transition-all text-center sm:col-span-2 lg:col-span-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl sm:text-3xl md:text-4xl">
                    FK
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Faisal Khan</h3>
                  <p className="text-white/70 text-sm sm:text-base">Team Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;

