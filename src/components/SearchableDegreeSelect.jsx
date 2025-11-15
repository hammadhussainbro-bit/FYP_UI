import { useState, useRef, useEffect } from 'react';

const SearchableDegreeSelect = ({ value, onChange, degrees }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDegrees = degrees.filter((degree) =>
    degree.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDegree = degrees.find((d) => d === value);

  const handleSelect = (degree) => {
    onChange(degree);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white cursor-pointer flex items-center justify-between hover:border-blue-400 transition-all"
      >
        <span className={selectedDegree ? 'text-gray-800' : 'text-gray-400'}>
          {selectedDegree || 'Search or select a degree program...'}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-hidden animate-fadeIn">
          <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search degree programs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredDegrees.length > 0 ? (
              filteredDegrees.map((degree, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(degree)}
                  className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                    value === degree ? 'bg-blue-100 font-semibold' : ''
                  }`}
                >
                  {degree}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                No degree programs found
              </div>
            )}
          </div>
        </div>
      )}

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
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchableDegreeSelect;

