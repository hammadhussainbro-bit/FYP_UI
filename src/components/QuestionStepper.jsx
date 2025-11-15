const QuestionStepper = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step <= currentStep
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step < currentStep ? (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 transition-all ${
                  step < currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                    : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-white/80 text-sm">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default QuestionStepper;

