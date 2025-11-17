import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check if user exists (mock authentication)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Successful login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', user.name);
      
      // Navigate to questionnaire
      navigate('/questionnaire');
    } else {
      // Check if email exists
      const emailExists = users.find((u) => u.email === email);
      if (emailExists) {
        setError('Incorrect password');
      } else {
        setError('Email not found. Please sign up first.');
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden w-full ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 animate-fadeIn">
            <div className="text-center mb-8">
              <img 
                src="/logo.svg" 
                alt="MeritVoyage Logo" 
                className="w-16 h-16 object-contain mx-auto mb-4"
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/80 text-sm sm:text-base">Sign in to continue to MeritVoyage</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-shake">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white/80 text-sm">Remember me</span>
                </label>
                <Link
                  to="#"
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

                      <button
                        type="submit"
                        className="group relative w-full py-3.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98] touch-manipulation min-h-[52px] overflow-hidden"
                        style={{ boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.3)' }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Sign In
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-white font-semibold hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;

