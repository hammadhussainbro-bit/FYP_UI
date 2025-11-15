import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { getDeadlines, saveDeadline, deleteDeadline, getFavorites } from '../utils/storage';

const DeadlineTracker = () => {
  const { theme } = useTheme();
  const [deadlines, setDeadlines] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddUniversityModal, setShowAddUniversityModal] = useState(false);
  const [searchingDeadlines, setSearchingDeadlines] = useState(false);
  const [foundDeadlines, setFoundDeadlines] = useState([]);
  const [universitySearch, setUniversitySearch] = useState('');
  const [formData, setFormData] = useState({
    university: '',
    program: '',
    deadline: '',
    type: 'application',
    notes: '',
  });

  useEffect(() => {
    setDeadlines(getDeadlines());
  }, []);

  // Function to search for deadlines using Gemini API
  const searchDeadlinesWithAI = async (universityName) => {
    setSearchingDeadlines(true);
    setFoundDeadlines([]);
    
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY') {
        // Fallback response if no API key
        const fallbackDeadlines = generateFallbackDeadlines(universityName);
        setFoundDeadlines(fallbackDeadlines);
        setSearchingDeadlines(false);
        return;
      }

      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

      const prompt = `Search for admission deadlines for ${universityName} in Pakistan. 
      Provide the information in the following JSON format:
      {
        "deadlines": [
          {
            "type": "application" or "entry_test" or "scholarship",
            "deadline": "YYYY-MM-DD",
            "description": "Brief description",
            "program": "Program name if specific, otherwise 'General Admission'"
          }
        ]
      }
      
      If you find multiple deadlines (like fall admission, spring admission, entry test dates), include all of them.
      Use current year or next year dates. If exact dates are not available, provide approximate dates based on typical admission cycles in Pakistan.
      Return ONLY valid JSON, no other text.`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Try to parse JSON from response
      let parsedDeadlines = [];
      try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || aiResponse.match(/\{[\s\S]*\}/);
        const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : aiResponse;
        const parsed = JSON.parse(jsonText);
        parsedDeadlines = parsed.deadlines || [];
      } catch (parseError) {
        // If parsing fails, use fallback
        parsedDeadlines = generateFallbackDeadlines(universityName);
      }

      setFoundDeadlines(parsedDeadlines);
    } catch (error) {
      console.error('Error searching deadlines:', error);
      // Use fallback deadlines
      setFoundDeadlines(generateFallbackDeadlines(universityName));
    } finally {
      setSearchingDeadlines(false);
    }
  };

  const generateFallbackDeadlines = (universityName) => {
    // Fallback deadlines based on common Pakistani university admission cycles
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    
    // Typical admission cycles in Pakistan
    return [
      {
        type: 'application',
        deadline: `${nextYear}-05-31`,
        description: 'Fall Admission Deadline (Typical)',
        program: 'General Admission',
      },
      {
        type: 'entry_test',
        deadline: `${nextYear}-04-15`,
        description: 'Entry Test Date (Typical)',
        program: 'General Admission',
      },
      {
        type: 'scholarship',
        deadline: `${nextYear}-06-15`,
        description: 'Scholarship Application Deadline (Typical)',
        program: 'General Admission',
      },
    ];
  };

  const handleAddFoundDeadline = (deadlineInfo) => {
    const deadlineData = {
      university: universitySearch,
      program: deadlineInfo.program || 'General Admission',
      deadline: deadlineInfo.deadline,
      type: deadlineInfo.type === 'entry_test' ? 'test' : deadlineInfo.type === 'scholarship' ? 'scholarship' : 'application',
      notes: deadlineInfo.description || 'Found via AI search. Please verify.',
      aiFound: true,
    };
    
    if (saveDeadline(deadlineData)) {
      setDeadlines(getDeadlines());
      // Remove the added deadline from found list
      setFoundDeadlines(foundDeadlines.filter((d, idx) => 
        d.deadline !== deadlineInfo.deadline || d.type !== deadlineInfo.type
      ));
    }
  };

  const handleSearchUniversity = () => {
    if (universitySearch.trim()) {
      searchDeadlinesWithAI(universitySearch.trim());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (saveDeadline(formData)) {
      setDeadlines(getDeadlines());
      setFormData({ university: '', program: '', deadline: '', type: 'application', notes: '' });
      setShowAddModal(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this deadline?')) {
      deleteDeadline(id);
      setDeadlines(getDeadlines());
    }
  };

  const getDaysUntil = (deadlineDate) => {
    const today = new Date();
    const deadline = new Date(deadlineDate);
    const diff = deadline - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const upcomingDeadlines = deadlines
    .filter(d => getDaysUntil(d.deadline) >= 0)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const pastDeadlines = deadlines
    .filter(d => getDaysUntil(d.deadline) < 0)
    .sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                Application Deadline Tracker
              </h1>
              <p className="text-white/80 text-sm sm:text-base">
                Never miss an important deadline
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
              <button
                onClick={() => setShowAddUniversityModal(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg touch-manipulation min-h-[44px] flex items-center justify-center text-sm sm:text-base"
              >
                🔍 Search University Deadlines
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg touch-manipulation min-h-[44px] flex items-center justify-center text-sm sm:text-base"
              >
                + Add Deadline Manually
              </button>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Upcoming Deadlines</h2>
            {upcomingDeadlines.length === 0 ? (
              <div className={`text-center py-8 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'
              }`}>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-white/80'}`}>
                  No upcoming deadlines
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingDeadlines.map((deadline) => {
                  const days = getDaysUntil(deadline.deadline);
                  return (
                    <div
                      key={deadline.id}
                      className={`p-4 rounded-xl border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white/90 border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className={`font-bold text-lg ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                          }`}>{deadline.university}</h3>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>{deadline.program}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(deadline.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className={`mt-3 p-2 rounded-lg ${
                        days <= 7
                          ? 'bg-red-100 text-red-800'
                          : days <= 30
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        <p className="text-sm font-semibold">
                          {days === 0
                            ? 'Due Today!'
                            : days === 1
                            ? 'Due Tomorrow'
                            : `${days} days remaining`}
                        </p>
                        <p className="text-xs mt-1">
                          {new Date(deadline.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      {deadline.notes && (
                        <p className={`text-xs mt-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{deadline.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Past Deadlines */}
          {pastDeadlines.length > 0 && (
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Past Deadlines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastDeadlines.map((deadline) => {
                  const days = Math.abs(getDaysUntil(deadline.deadline));
                  return (
                    <div
                      key={deadline.id}
                      className={`p-4 rounded-xl border opacity-60 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white/90 border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className={`font-bold text-lg ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                          }`}>{deadline.university}</h3>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>{deadline.program}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(deadline.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Passed {days} day{days !== 1 ? 's' : ''} ago
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Add University Search Modal */}
      {showAddUniversityModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/50'
        } backdrop-blur-sm p-4`}>
          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Search University Deadlines</h2>
              <button
                onClick={() => {
                  setShowAddUniversityModal(false);
                  setUniversitySearch('');
                  setFoundDeadlines([]);
                  setSearchingDeadlines(false);
                }}
                className={`p-2 rounded-lg hover:bg-gray-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>University Name</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={universitySearch}
                    onChange={(e) => setUniversitySearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchUniversity()}
                    placeholder="e.g., NUST, LUMS, FAST"
                    className={`flex-1 w-full px-4 py-2.5 sm:py-2 rounded-lg border text-sm sm:text-base min-h-[44px] ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  />
                  <button
                    onClick={handleSearchUniversity}
                    disabled={!universitySearch.trim() || searchingDeadlines}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[44px] flex items-center justify-center text-sm sm:text-base"
                  >
                    {searchingDeadlines ? 'Searching...' : 'Search'}
                  </button>
                </div>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  We'll search the web for admission deadlines using AI
                </p>
              </div>

              {searchingDeadlines && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Searching for deadlines...
                  </p>
                </div>
              )}

              {foundDeadlines.length > 0 && (
                <div>
                  <h3 className={`font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>Found Deadlines:</h3>
                  <div className="space-y-2">
                    {foundDeadlines.map((deadline, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                deadline.type === 'entry_test'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : deadline.type === 'scholarship'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {deadline.type === 'entry_test' ? 'Entry Test' : 
                                 deadline.type === 'scholarship' ? 'Scholarship' : 'Application'}
                              </span>
                            </div>
                            <p className={`font-medium text-sm sm:text-base ${
                              theme === 'dark' ? 'text-white' : 'text-gray-800'
                            }`}>
                              {deadline.program}
                            </p>
                            <p className={`text-xs sm:text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {deadline.description}
                            </p>
                            <p className={`text-xs sm:text-sm font-semibold mt-1 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Deadline: {new Date(deadline.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleAddFoundDeadline(deadline)}
                            className="w-full sm:w-auto sm:ml-4 px-4 py-2.5 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all touch-manipulation min-h-[44px] flex items-center justify-center flex-shrink-0"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!searchingDeadlines && foundDeadlines.length === 0 && universitySearch && (
                <div className={`text-center py-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No deadlines found. Try searching with the full university name.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Deadline Modal */}
      {showAddModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/50'
        } backdrop-blur-sm p-4`}>
          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-xl shadow-2xl p-6 max-w-md w-full`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Add Deadline</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className={`p-2 rounded-lg hover:bg-gray-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>University</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Program</label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Deadline Date</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option value="application">Application</option>
                  <option value="test">Entry Test</option>
                  <option value="scholarship">Scholarship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`flex-1 px-4 py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  Add Deadline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DeadlineTracker;

