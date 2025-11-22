import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import useRevealOnScroll from '../utils/useRevealOnScroll';

const Stat = ({ label, value }) => (
  <div className="glass rounded-xl p-4 sm:p-5 md:p-6 text-center reveal-init w-full flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 hover:shadow-xl" style={{ 
    backdropFilter: 'blur(16px)', 
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.08)'
  }}>
    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>{value}</div>
    <div className="text-white/70 text-xs sm:text-sm whitespace-nowrap font-medium">{label}</div>
  </div>
);

const TestimonialCard = ({ quote, name, title }) => {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref} className="glass rounded-2xl p-5 sm:p-6 md:p-8 h-full w-full hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex-shrink-0 shadow-lg ring-2 ring-white/20" />
        <div className="min-w-0 flex-1">
          <div className="text-white font-semibold text-sm sm:text-base drop-shadow-sm">{name}</div>
          <div className="text-white/70 text-xs sm:text-sm truncate">{title}</div>
        </div>
      </div>
      <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed break-words drop-shadow-sm">"{quote}"</p>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon, gradient }) => {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref} className="glass rounded-2xl p-4 sm:p-5 md:p-6 active:bg-white/20 transition-all duration-300 w-full h-auto hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1" style={{ backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)' }}>
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0 ${gradient} shadow-lg hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 break-words drop-shadow-md">{title}</h3>
      <p className="text-white/80 text-sm sm:text-base break-words leading-relaxed">{desc}</p>
    </div>
  );
};

const Landing = () => {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || '';
      const userEmail = localStorage.getItem('userEmail') || '';
      
      setIsLoggedIn(loggedIn);
      setUserName(name);

      // Check if user has completed questionnaire
      if (loggedIn && userEmail) {
        try {
          const questionnaires = JSON.parse(localStorage.getItem('questionnaires') || '[]');
          const userQuestionnaires = questionnaires.filter(q => q.userEmail === userEmail);
          setHasCompletedQuestionnaire(userQuestionnaires.length > 0);
        } catch (e) {
          console.error('Error checking questionnaire:', e);
          setHasCompletedQuestionnaire(false);
        }
      } else {
        setHasCompletedQuestionnaire(false);
      }
    } catch (err) {
      console.error('Error in Landing useEffect:', err);
      setError('Failed to load page data');
    }
  }, []);

  // Safety check for theme
  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const heroRef = useRevealOnScroll();

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden w-full ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-indigo-700 via-violet-700 to-fuchsia-700'
    }`}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden" style={{ mixBlendMode: 'screen' }}>
          <div 
            id="blob-purple"
            className="w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[900px] bg-fuchsia-500 rounded-full blur-3xl absolute -top-20 -left-20" 
            style={{
              animation: 'blobMove1 15s ease-in-out infinite',
              willChange: 'transform',
              transformOrigin: 'center center'
            }}
          />
          <div 
            id="blob-blue"
            className="w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] md:w-[750px] md:h-[750px] lg:w-[850px] lg:h-[850px] bg-indigo-500 rounded-full blur-3xl absolute top-40 right-0" 
            style={{
              animation: 'blobMove2 15s ease-in-out infinite',
              animationDelay: '2s',
              willChange: 'transform',
              transformOrigin: 'center center'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-24 md:py-32 lg:py-36 flex flex-col items-center justify-center min-h-[70vh]">
          <div ref={heroRef} className="reveal-init text-center w-full max-w-3xl mx-auto">
            {userName && (
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-400 via-amber-300 to-white bg-clip-text text-transparent leading-[1.1] tracking-tight mb-4 sm:mb-5 px-2 drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
                Hello {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight px-2 drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
              Find your perfect <span className="gradient-text">University Match</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mt-6 sm:mt-8 md:mt-10 px-2 drop-shadow-md" style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)' }}>
              Personalized, data-driven guidance to help you decide with confidence.
            </p>
            <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-2 w-full sm:w-auto">
              {isLoggedIn ? (
                hasCompletedQuestionnaire ? (
                  <>
                    <Link to="/questionnaire" className="group relative px-8 sm:px-10 py-4 sm:py-4.5 bg-gradient-to-r from-white via-gray-50 to-white text-indigo-700 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform-gpu will-change-transform transition-all duration-300 touch-manipulation min-h-[52px] w-full sm:w-auto sm:min-w-[220px] text-center flex items-center justify-center overflow-hidden button-glow-primary">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </Link>
                    <Link to="/explore-universities" className="group relative px-8 sm:px-10 py-4 sm:py-4.5 bg-white/5 backdrop-blur-md text-white border-2 border-white/30 font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transform-gpu will-change-transform transition-all duration-300 touch-manipulation min-h-[52px] w-full sm:w-auto sm:min-w-[220px] text-center flex items-center justify-center overflow-hidden button-glow-secondary">
                      <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10">Explore Universities</span>
                    </Link>
                  </>
                ) : (
                  <Link to="/questionnaire" className="group relative px-8 sm:px-10 py-4 sm:py-4.5 bg-gradient-to-r from-white via-gray-50 to-white text-indigo-700 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform-gpu will-change-transform transition-all duration-300 touch-manipulation min-h-[52px] w-full sm:w-auto sm:min-w-[220px] text-center flex items-center justify-center overflow-hidden button-glow-primary">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                )
              ) : (
                <>
                  <Link to="/signup" className="group relative px-8 sm:px-10 py-4 sm:py-4.5 bg-gradient-to-r from-white via-gray-50 to-white text-indigo-700 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform-gpu will-change-transform transition-all duration-300 touch-manipulation min-h-[52px] w-full sm:w-auto sm:min-w-[220px] text-center flex items-center justify-center overflow-hidden button-glow-primary">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  <Link to="/login" className="group relative px-8 sm:px-10 py-4 sm:py-4.5 bg-white/5 backdrop-blur-md text-white border-2 border-white/30 font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transform-gpu will-change-transform transition-all duration-300 touch-manipulation min-h-[52px] w-full sm:w-auto sm:min-w-[220px] text-center flex items-center justify-center overflow-hidden button-glow-secondary">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Sign In</span>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 md:mt-20 lg:mt-24 w-full max-w-2xl mx-auto">
              <Stat label="Programs" value="2,500+" />
              <Stat label="Universities" value="350+" />
              <Stat label="Countries" value="25" />
              <Stat label="Avg. Match Score" value="92%" />
            </div>
          </div>
        </div>
      </section>

              {/* Features */}
              <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 w-full overflow-x-hidden">
                <div className="max-w-7xl mx-auto w-full">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-6 sm:mb-8 md:mb-10 px-2">Why Choose MeritVoyage?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            <FeatureCard
              title="Smart Matching"
              desc="AI-driven matching aligns your academic profile, preferences, and goals with the right programs."
              gradient="bg-gradient-to-br from-blue-400 to-cyan-400"
              icon={
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Comprehensive Data"
              desc="Explore fees, rankings, admission requirements, and more in one place."
              gradient="bg-gradient-to-br from-purple-400 to-pink-400"
              icon={
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <FeatureCard
              title="Quick & Easy"
              desc="Finish the questionnaire in minutes and get instant, ranked recommendations."
              gradient="bg-gradient-to-br from-amber-400 to-orange-400"
              icon={
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

              {/* Testimonials */}
              <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 w-full overflow-x-hidden">
                <div className="max-w-7xl mx-auto w-full">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-6 sm:mb-8 md:mb-10 px-2">What students say</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            <TestimonialCard
              name="Ayesha Khan"
              title="BSc Computer Science, Class of 2027"
              quote="I was overwhelmed with choices. The recommendations helped me shortlist confidently in one evening."
            />
            <TestimonialCard
              name="Omar Farooq"
              title="MBA Candidate"
              quote="The matching felt spot-on. I discovered programs I hadn't even considered, with better scholarships."
            />
            <TestimonialCard
              name="Sara Ahmed"
              title="Data Science Aspirant"
              quote="Clean interface, fast questionnaire, and useful insights. Landed an admit that fits my goals."
            />
          </div>
        </div>
      </section>


      <Footer />
      
      <style>{`
        @keyframes blobMove1 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(300px, -200px) scale(1.2);
          }
          50% {
            transform: translate(-250px, 250px) scale(0.8);
          }
          75% {
            transform: translate(200px, -150px) scale(1.1);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes blobMove2 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(-250px, 200px) scale(0.8);
          }
          50% {
            transform: translate(300px, -250px) scale(1.2);
          }
          75% {
            transform: translate(-200px, -150px) scale(1.1);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes buttonPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 6px 30px rgba(0, 0, 0, 0.15);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        #blob-purple {
          animation: blobMove1 15s ease-in-out infinite;
          will-change: transform;
        }
        
        #blob-blue {
          animation: blobMove2 15s ease-in-out infinite;
          animation-delay: 2s;
          will-change: transform;
        }
        
        .button-glow-primary {
          position: relative;
          box-shadow: 0 10px 40px rgba(255, 255, 255, 0.2), 0 0 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }
        
        .button-glow-primary:hover {
          box-shadow: 0 15px 50px rgba(255, 255, 255, 0.3), 0 0 30px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }
        
        .button-glow-primary:active {
          transform: translateY(0px) scale(0.98);
        }
        
        .button-glow-secondary {
          position: relative;
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.1), 0 0 15px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .button-glow-secondary:hover {
          box-shadow: 0 12px 40px rgba(255, 255, 255, 0.15), 0 0 25px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        
        .button-glow-secondary:active {
          transform: translateY(0px) scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default Landing;

