import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.svg" 
                alt="MeritVoyage Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-white font-bold text-lg">MeritVoyage</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your intelligent university recommendation system. Find the perfect
              match for your academic journey.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Login
                </a>
              </li>
              <li>
                <a href="/questionnaire" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Questionnaire
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: support@meritvoyage.com</li>
              <li>Phone: +92 300 1234567</li>
              <li>Address: Karachi, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} MeritVoyage. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all text-sm font-semibold hover:scale-105"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

