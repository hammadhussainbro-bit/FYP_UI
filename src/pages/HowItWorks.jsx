import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const HowItWorks = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const heroRef = useScrollAnimation();
  const step1Ref = useScrollAnimation();
  const step2Ref = useScrollAnimation();
  const step3Ref = useScrollAnimation();
  const step4Ref = useScrollAnimation();
  const techRef = useScrollAnimation();

  useEffect(() => {
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
      
      {/* Animated Background Blobs - More blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden" style={{ mixBlendMode: 'screen' }}>
        <div 
          className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-fuchsia-500 rounded-full blur-3xl absolute top-20 left-20" 
          style={{
            animation: 'blobMove1 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div 
          className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] bg-indigo-500 rounded-full blur-3xl absolute bottom-20 -right-20" 
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
        <div className="max-w-5xl mx-auto">
          <div ref={heroRef.ref} className={`text-center mb-6 sm:mb-8 md:mb-12 px-2 transition-all duration-700 ease-out ${
            heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight">
              How It Works
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-light px-2">
              Powered by cutting-edge AI and machine learning technology
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-12">
            <div ref={step1Ref.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out hover:scale-[1.01] hover:-translate-y-0.5 scroll-reveal ${
              step1Ref.isVisible ? 'revealed' : ''
            }`}>
              <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Data Collection</h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    Students complete a comprehensive questionnaire covering academic performance
                    (SSC, HSSC percentages), preferred degree programs, university type preferences,
                    location preferences, budget constraints, scholarship needs, academic interests,
                    career goals, and extra-curricular activities. This multi-dimensional data
                    provides a holistic view of each student's profile.
                  </p>
                </div>
              </div>
            </div>

            <div ref={step2Ref.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out hover:scale-[1.01] hover:-translate-y-0.5 scroll-reveal ${
              step2Ref.isVisible ? 'revealed' : ''
            }`}>
              <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">AI Processing</h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4">
                    Our system leverages state-of-the-art machine learning models, including:
                  </p>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Transformer-based Models:</strong> Utilizing architectures similar to GPT and BERT for understanding complex patterns in student preferences and university characteristics.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Collaborative Filtering:</strong> Analyzing patterns from thousands of successful student-university matches to identify similar profiles.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Neural Networks:</strong> Deep learning models that process multiple features simultaneously to calculate match scores with high accuracy.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Natural Language Processing (NLP):</strong> Advanced NLP techniques to understand and match program descriptions, career goals, and academic interests.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div ref={step3Ref.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out hover:scale-[1.01] hover:-translate-y-0.5 scroll-reveal ${
              step3Ref.isVisible ? 'revealed' : ''
            }`}>
              <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Algorithm Analysis</h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4">
                    The AI system employs sophisticated algorithms:
                  </p>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Multi-Criteria Decision Analysis (MCDA):</strong> Evaluates universities across multiple weighted criteria including academic fit, financial feasibility, location preference, and career alignment.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Ranking Algorithms:</strong> Uses advanced ranking models to sort recommendations by relevance and match probability.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Feature Engineering:</strong> Automatically extracts and weights important features from student profiles and university data to improve prediction accuracy.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Real-time Learning:</strong> Continuously improves recommendations based on user feedback and successful admission outcomes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div ref={step4Ref.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out hover:scale-[1.01] hover:-translate-y-0.5 scroll-reveal ${
              step4Ref.isVisible ? 'revealed' : ''
            }`}>
              <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">4</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Personalized Recommendations</h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    The system generates three categories of recommendations:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Top Matches</h4>
                      <p className="text-white/80 text-sm">
                        Universities with the highest compatibility scores (90%+ match)
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Backup Options</h4>
                      <p className="text-white/80 text-sm">
                        Solid alternatives with good match scores (75-90%)
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Alternative Programs</h4>
                      <p className="text-white/80 text-sm">
                        Related programs that align with career goals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div ref={techRef.ref} className={`glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-700 ease-out hover:scale-[1.01] scroll-reveal ${
            techRef.isVisible ? 'revealed' : ''
          }`}>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <span className="w-0.5 sm:w-1 h-6 sm:h-8 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full"></span>
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {[
                { title: 'Machine Learning', items: ['PyTorch / TensorFlow for deep learning', 'Scikit-learn for traditional ML algorithms', 'Transformers library for NLP tasks', 'XGBoost for gradient boosting'] },
                { title: 'Data Processing', items: ['Pandas for data manipulation', 'NumPy for numerical computations', 'Real-time data pipelines', 'Automated feature extraction'] }
              ].map((tech, idx) => (
                <div key={idx} className="glass-premium rounded-xl p-4 sm:p-5 md:p-6 hover:scale-105 transition-all duration-300">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3">{tech.title}</h3>
                  <ul className="space-y-1.5 sm:space-y-2 text-white/90">
                    {tech.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm md:text-base">
                        <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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

export default HowItWorks;



