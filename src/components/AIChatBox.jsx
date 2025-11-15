import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI assistant for MeritVoyage. I can help you with university information, admission requirements, program details, and more. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsThinking(true);

    // Add thinking delay to make it look natural (1-2 seconds)
    const thinkingDelay = Math.random() * 1000 + 1000; // 1-2 seconds

    try {
      // Wait for thinking delay
      await new Promise(resolve => setTimeout(resolve, thinkingDelay));
      setIsThinking(false);
      // Using Google Gemini API (free tier)
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY') {
        // Use fallback if no API key
        const fallbackResponse = generateFallbackResponse(userMessage);
        // Add small delay even for fallback
        await new Promise(resolve => setTimeout(resolve, 500));
        setMessages((prev) => [...prev, { role: 'assistant', content: fallbackResponse }]);
        setIsLoading(false);
        setIsThinking(false);
        return;
      }

      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

      const systemPrompt = `You are a helpful AI assistant for MeritVoyage, a university recommendation system in Pakistan. 
      Help students with:
      - University information and rankings (NUST, LUMS, FAST, UET, GIKI, etc.)
      - Admission requirements and entry tests (NET, ECAT, LCAT, NTS, etc.)
      - Program details and career paths
      - Scholarship information
      - Application deadlines
      - Campus life and facilities
      - Tuition fees and financial aid
      
      Be friendly, informative, and focus on Pakistani universities. Provide accurate, helpful information. If you don't know something, say so politely.`;

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
                  text: `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`,
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
      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm having trouble processing that. Could you rephrase your question?";

      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setIsThinking(false);
      // Fallback response if API fails
      const fallbackResponse = generateFallbackResponse(userMessage);
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages((prev) => [...prev, { role: 'assistant', content: fallbackResponse }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const generateFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('nust') || lowerMessage.includes('national university')) {
      return "NUST (National University of Sciences and Technology) is one of Pakistan's top universities, located in Islamabad. It offers excellent programs in engineering, computer science, and sciences. Entry requires NET (NUST Entry Test) with high merit (typically 80%+). The university has strong industry connections, modern facilities, and excellent placement rates. Tuition ranges from PKR 150,000-200,000/year.";
    }
    if (lowerMessage.includes('lums') || lowerMessage.includes('lahore university')) {
      return "LUMS (Lahore University of Management Sciences) is a premier private university in Lahore, known for business, computer science, and social sciences. It requires LCAT (LUMS Common Admission Test) and has a competitive admission process. The university offers excellent placement opportunities, international faculty, and strong alumni network. Tuition is around PKR 800,000/year, but they offer generous financial aid.";
    }
    if (lowerMessage.includes('fast') || lowerMessage.includes('nucs')) {
      return "FAST (National University of Computer and Emerging Sciences) is specialized in computer sciences with campuses in Karachi, Lahore, Islamabad, and Peshawar. It requires NTS test and has a strong programming culture. Known for high job placement rates and industry-focused curriculum. Tuition ranges from PKR 200,000-300,000/year.";
    }
    if (lowerMessage.includes('admission') || lowerMessage.includes('apply') || lowerMessage.includes('requirement')) {
      return "For university admissions in Pakistan, you typically need:\n\n1. Completed SSC and HSSC with good grades (usually 70%+)\n2. Entry test scores (NET for NUST, ECAT for UET, LCAT for LUMS, NTS for many others)\n3. Application forms submitted before deadlines\n4. Required documents (certificates, photos, etc.)\n\nEach university has specific requirements, so check their official websites for details. Deadlines are usually in May-July for fall admissions.";
    }
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid')) {
      return "Many Pakistani universities offer scholarships:\n\n• Merit-based: For high academic achievers\n• Need-based: For students with financial constraints\n• Sports scholarships: For talented athletes\n• Special programs: Various universities have specific scholarship programs\n\nTop universities like NUST, LUMS, FAST, and GIKI have generous scholarship programs. Check each university's financial aid office for specific requirements and deadlines. Apply early!";
    }
    if (lowerMessage.includes('computer science') || lowerMessage.includes('cs') || lowerMessage.includes('software')) {
      return "Computer Science is a highly popular field in Pakistan with excellent career prospects. Top universities include:\n\n• NUST - Strong in research and industry connections\n• FAST - Specialized in CS, strong programming culture\n• LUMS - Excellent for business-tech combination\n• GIKI - Strong engineering focus\n• COMSATS - Good value and quality\n\nPrograms typically require strong math and physics background. Entry tests focus on these subjects. Career prospects include software development, data science, AI, cybersecurity, and more. Starting salaries range from PKR 50,000-150,000/month for fresh graduates.";
    }
    if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('tuition') || lowerMessage.includes('price')) {
      return "University fees in Pakistan vary significantly:\n\n• Public universities (NUST, UET, KU): PKR 50,000-200,000/year\n• Private universities (LUMS, FAST, GIKI): PKR 200,000-800,000/year\n• Some specialized programs may cost more\n\nMany universities offer scholarships and financial aid. Consider:\n1. Your budget\n2. Scholarship opportunities\n3. Financial aid options\n4. Part-time work possibilities\n\nUse MeritVoyage's budget filter to find universities within your range!";
    }
    if (lowerMessage.includes('entry test') || lowerMessage.includes('test') || lowerMessage.includes('exam')) {
      return "Entry tests in Pakistan vary by university:\n\n• NET: NUST Entry Test (for NUST)\n• ECAT: Engineering College Admission Test (for UET, GIKI)\n• LCAT: LUMS Common Admission Test (for LUMS)\n• NTS: National Testing Service (for many universities)\n• SAT: Some universities accept SAT scores\n\nPreparation tips:\n1. Start early (3-6 months before test)\n2. Focus on math, physics, and English\n3. Practice past papers\n4. Consider coaching if needed\n5. Take mock tests regularly\n\nTest dates are usually in May-July. Register early!";
    }
    if (lowerMessage.includes('ranking') || lowerMessage.includes('best') || lowerMessage.includes('top')) {
      return "Top universities in Pakistan (general ranking):\n\n1. NUST - Top for engineering and sciences\n2. LUMS - Premier for business and social sciences\n3. UET - Excellent for engineering\n4. FAST - Specialized in computer sciences\n5. GIKI - Strong engineering programs\n6. IBA - Top for business\n7. COMSATS - Good value and quality\n8. KU - Large public university\n\nRankings vary by field. For computer science: NUST, FAST, LUMS are top. For business: LUMS, IBA lead. Use MeritVoyage to find the best match for your specific interests!";
    }
    if (lowerMessage.includes('program') || lowerMessage.includes('degree') || lowerMessage.includes('course')) {
      return "Pakistani universities offer various programs:\n\n• Engineering: Computer, Electrical, Mechanical, Civil, Chemical\n• Business: BBA, MBA, Accounting, Finance\n• Sciences: Physics, Chemistry, Mathematics, Biology\n• Medical: MBBS, BDS, Pharmacy\n• Social Sciences: Economics, Political Science, Psychology\n• Arts: English, Literature, History\n\nMost programs are 4 years (BS/BSc) or 5 years (MBBS). Entry requirements vary. Use MeritVoyage's questionnaire to find programs that match your interests and qualifications!";
    }
    
    return `I understand you're asking about: "${userMessage}". 

For detailed information about Pakistani universities, I can help with:
• University rankings and information
• Admission requirements and entry tests
• Program details and career paths
• Scholarship information
• Tuition fees and financial aid
• Application deadlines

You can also use MeritVoyage's recommendation system to find universities that match your profile! Try asking about specific universities like NUST, LUMS, or FAST, or ask about admission requirements, scholarships, or programs.`;
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
          }`}
          aria-label="Open AI Chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] rounded-xl shadow-2xl flex flex-col ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          {/* Chat Header */}
          <div
            className={`flex items-center justify-between p-4 rounded-t-xl ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <p className="text-white/80 text-xs">MeritVoyage Helper</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close Chat"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white'
                        : 'bg-indigo-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {(isLoading || isThinking) && (
              <div className="flex justify-start">
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  {isThinking ? (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A10.549 10.549 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Thinking...
                      </span>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-gray-300 dark:border-gray-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about universities, admissions, programs..."
                className={`flex-1 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isLoading || !input.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Powered by AI • Ask about universities, admissions, programs, and more
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBox;

