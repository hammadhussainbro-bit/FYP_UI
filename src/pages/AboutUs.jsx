import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const AboutUs = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const heroRef = useScrollAnimation();
  const missionRef = useScrollAnimation();
  const visionRef = useScrollAnimation();
  const whatWeDoRef = useScrollAnimation();
  const teamRef = useScrollAnimation();

  useEffect(() => {
    // Simulate loading - shorter delay
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      {loading && <LoadingSpinner fullScreen size="xl" />}
      
      {/* Animated Background Blobs - More blobs for visual interest */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden" style={{ mixBlendMode: 'screen' }}>
        <div 
          className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-fuchsia-500 rounded-full blur-3xl absolute -top-20 -left-20" 
          style={{
            animation: 'blobMove1 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div 
          className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] bg-indigo-500 rounded-full blur-3xl absolute bottom-20 right-20" 
          style={{
            animation: 'blobMove2 18s ease-in-out infinite',
            animationDelay: '3s',
            willChange: 'transform',
          }}
        />
        <div 
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-purple-500 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          style={{
            animation: 'blobMove1 20s ease-in-out infinite',
            animationDelay: '6s',
            willChange: 'transform',
          }}
        />
        <div 
          className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-pink-500 rounded-full blur-3xl absolute top-1/4 right-1/4" 
          style={{
            animation: 'blobMove2 22s ease-in-out infinite',
            animationDelay: '9s',
            willChange: 'transform',
          }}
        />
      </div>

      <Navbar />
      
      <div className={`flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-4xl mx-auto">
          <div ref={heroRef.ref} className={`text-center mb-6 sm:mb-8 md:mb-12 px-2 transition-all duration-700 ease-out ${
            heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight">
              About MeritVoyage
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-light px-2">
              Empowering students to make informed decisions about their future
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Mission Section */}
            <div ref={missionRef.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out hover:scale-[1.01] hover:-translate-y-0.5 scroll-reveal ${
              missionRef.isVisible ? 'revealed' : ''
            }`}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3">
                <span className="w-0.5 sm:w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></span>
                Our Mission
              </h2>
              <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                MeritVoyage is dedicated to revolutionizing the way students discover and
                select universities. We leverage cutting-edge artificial intelligence
                and machine learning technologies to provide personalized, data-driven
                recommendations that align with each student's unique academic profile,
                preferences, and career aspirations.
              </p>
            </div>

            {/* Vision Section */}
            <div ref={visionRef.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out hover:scale-[1.01] hover:-translate-y-0.5 scroll-reveal ${
              visionRef.isVisible ? 'revealed' : ''
            }`}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3">
                <span className="w-0.5 sm:w-1 h-6 sm:h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></span>
                Our Vision
              </h2>
              <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                We envision a future where every student has access to comprehensive,
                unbiased, and intelligent guidance for their higher education journey.
                By combining advanced AI algorithms with extensive university databases,
                we aim to bridge the gap between students' potential and their ideal
                academic institutions.
              </p>
            </div>

            {/* What We Do Section */}
            <div ref={whatWeDoRef.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out scroll-reveal ${
              whatWeDoRef.isVisible ? 'revealed' : ''
            }`}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <span className="w-0.5 sm:w-1 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></span>
                What We Do
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-6">
                {[
                  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-blue-400 to-cyan-400', title: 'Smart Matching', desc: 'Our AI analyzes your academic performance, preferences, and goals to match you with the best-fit universities.' },
                  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', gradient: 'from-purple-400 to-pink-400', title: 'Comprehensive Data', desc: 'Access detailed information about programs, fees, rankings, admission requirements, and more.' },
                  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', gradient: 'from-yellow-400 to-orange-400', title: 'Fast & Easy', desc: 'Complete a simple questionnaire and receive instant, personalized recommendations.' },
                  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-green-400 to-emerald-400', title: 'Always Updated', desc: 'Our database is continuously updated with the latest university information and admission criteria.' }
                ].map((item, idx) => (
                  <div key={idx} className="glass-premium rounded-xl p-4 sm:p-5 md:p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl group">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div ref={teamRef.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out scroll-reveal ${
              teamRef.isVisible ? 'revealed' : ''
            }`}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 text-center">Our Team</h2>
              <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 text-center px-2">
                MeritVoyage is developed by a passionate team of engineers, data scientists,
                and education experts committed to making higher education accessible
                and transparent.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {[
                  { initials: 'HH', name: 'Hammad Hussain', gradient: 'from-blue-400 to-indigo-500' },
                  { initials: 'HU', name: 'Haseeb Ullah', gradient: 'from-purple-400 to-pink-500' },
                  { initials: 'FK', name: 'Faisal Khan', gradient: 'from-amber-400 to-orange-500', span: 'sm:col-span-2 lg:col-span-1' }
                ].map((member, idx) => (
                  <div key={idx} className={`glass-premium rounded-xl p-4 sm:p-5 md:p-6 border border-white/10 hover:scale-105 hover:shadow-xl transition-all duration-300 text-center group animate-fadeInUp ${member.span || ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {member.initials}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">{member.name}</h3>
                    <p className="text-white/70 text-xs sm:text-sm md:text-base">Team Member</p>
                  </div>
                ))}
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

