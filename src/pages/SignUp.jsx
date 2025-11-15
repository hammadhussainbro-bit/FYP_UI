import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const SignUp = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.gender || !formData.dob || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Check if email already exists (mock check)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find((user) => user.email === formData.email)) {
      setError('Email already registered. Please login instead.');
      return;
    }

    // Store user data
    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      password: formData.password, // In real app, this would be hashed
      createdAt: new Date().toISOString(),
    };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Auto login after signup
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', formData.name);

    // Navigate to landing page
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex flex-col ${
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
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-white/80 text-sm sm:text-base">Sign up to get started with MeritVoyage</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-shake">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="+92 300 1234567"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-white font-medium mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  required
                >
                  <option value="" className="text-gray-800">Select Gender</option>
                  <option value="Male" className="text-gray-800">Male</option>
                  <option value="Female" className="text-gray-800">Female</option>
                  <option value="Other" className="text-gray-800">Other</option>
                  <option value="Prefer not to say" className="text-gray-800">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="dob" className="block text-white font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all [color-scheme:dark]"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-white font-semibold hover:underline"
                >
                  Sign in here
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

export default SignUp;

