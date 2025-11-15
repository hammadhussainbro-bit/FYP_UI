const QuestionCard = ({ question, children, required = false }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {question}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default QuestionCard;

