import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    dob: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Load user DOB from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentEmail = localStorage.getItem('userEmail');
    const user = users.find((u) => u.email === currentEmail);
    if (user && user.dob) {
      setFormData(prev => ({ ...prev, dob: user.dob }));
    }
  }, []);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentEmail = localStorage.getItem('userEmail');
    const userIndex = users.findIndex((u) => u.email === currentEmail);

    if (userIndex === -1) {
      setError('User not found');
      return;
    }

    // Check if email is being changed and if it already exists
    if (formData.email !== currentEmail) {
      const emailExists = users.find((u) => u.email === formData.email && u.email !== currentEmail);
      if (emailExists) {
        setError('Email already in use');
        return;
      }
    }

    // Update password if provided
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
        setError('All password fields are required to change password');
        return;
      }

      if (users[userIndex].password !== formData.currentPassword) {
        setError('Current password is incorrect');
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      users[userIndex].password = formData.newPassword;
    }

    // Update user data
    users[userIndex].name = formData.name;
    users[userIndex].email = formData.email;
    if (formData.dob) {
      users[userIndex].dob = formData.dob;
    }
    localStorage.setItem('users', JSON.stringify(users));

    // Update localStorage
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);

    setSuccess('Profile updated successfully!');
    
    // Clear password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    setTimeout(() => {
      navigate('/questionnaire');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Update Profile</h2>
              <p className="text-white/80">Manage your account information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-shake">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">
                  {success}
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
                  required
                />
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
                />
              </div>

              <div className="border-t border-white/20 pt-6">
                <h3 className="text-white font-semibold mb-4">Change Password (Optional)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-white font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-white font-medium mb-2">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Update Profile
              </button>
            </form>
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

export default UpdateProfile;

