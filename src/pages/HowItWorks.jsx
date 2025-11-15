import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700">
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              How It Works
            </h1>
            <p className="text-xl text-white/80">
              Powered by cutting-edge AI and machine learning technology
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-slideIn">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Data Collection</h2>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Students complete a comprehensive questionnaire covering academic performance
                    (SSC, HSSC percentages), preferred degree programs, university type preferences,
                    location preferences, budget constraints, scholarship needs, academic interests,
                    career goals, and extra-curricular activities. This multi-dimensional data
                    provides a holistic view of each student's profile.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-slideIn">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">AI Processing</h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
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

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-slideIn">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Algorithm Analysis</h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
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

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-slideIn">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Personalized Recommendations</h2>
                  <p className="text-white/90 text-lg leading-relaxed">
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
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-slideIn">
            <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Machine Learning</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• PyTorch / TensorFlow for deep learning</li>
                  <li>• Scikit-learn for traditional ML algorithms</li>
                  <li>• Transformers library for NLP tasks</li>
                  <li>• XGBoost for gradient boosting</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Data Processing</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Pandas for data manipulation</li>
                  <li>• NumPy for numerical computations</li>
                  <li>• Real-time data pipelines</li>
                  <li>• Automated feature extraction</li>
                </ul>
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

export default HowItWorks;

