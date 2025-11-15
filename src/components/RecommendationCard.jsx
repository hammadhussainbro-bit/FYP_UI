const RecommendationCard = ({ university }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-blue-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {university.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{university.location}</p>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
              Match: {university.matchScore}%
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
              {university.rank}
            </span>
          </div>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          {university.name.charAt(0)}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Program Offered:</h4>
        <p className="text-gray-700">{university.program}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-xs mb-1">Tuition Fee</p>
          <p className="text-gray-800 font-semibold">{university.tuitionFee}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Entry Test Required</p>
          <p className="text-gray-800 font-semibold">
            {university.entryTestRequired}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Why This University:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {university.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold">
        View Details
      </button>
    </div>
  );
};

export default RecommendationCard;

