const BackupCard = ({ university }) => {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {university.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{university.location}</p>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
              Match: {university.matchScore}%
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
              {university.rank}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
          {university.name.charAt(0)}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Program:</h4>
        <p className="text-gray-700 text-sm">{university.program}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-xs mb-1">Tuition Fee</p>
          <p className="text-gray-800 font-semibold text-sm">
            {university.tuitionFee}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Entry Test</p>
          <p className="text-gray-800 font-semibold text-sm">
            {university.entryTestRequired}
          </p>
        </div>
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-semibold text-sm">
        View Details
      </button>
    </div>
  );
};

export default BackupCard;

