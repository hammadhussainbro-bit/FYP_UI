import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuestionCard from '../components/QuestionCard';
import QuestionStepper from '../components/QuestionStepper';
import SearchableDegreeSelect from '../components/SearchableDegreeSelect';
import { updateProgress } from '../utils/storage';

// Chip component
const Chip = ({ active, children }) => {
  const { theme } = useTheme();
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all select-none ${
        active
          ? theme === 'dark'
            ? 'bg-purple-600 text-white shadow'
            : 'bg-white text-indigo-700 shadow'
          : theme === 'dark'
          ? 'bg-gray-700/50 text-gray-200 border border-gray-600 hover:bg-gray-700'
          : 'bg-white/10 text-black border border-white/20 hover:bg-white/20'
      }`}
    >
      {children}
    </span>
  );
};

// Card wrapper with fixed background
const CardWrap = ({ children, accent = 'from-indigo-500 to-fuchsia-500' }) => {
  const { theme } = useTheme();
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className={`absolute inset-0 bg-gradient-to-r ${
        theme === 'dark' ? 'from-gray-800 to-gray-700' : accent
      } opacity-70 blur`}></div>
      <div className={`relative rounded-2xl backdrop-blur-md border p-6 ${
        theme === 'dark' 
          ? 'bg-gray-800/40 border-gray-700/50' 
          : 'bg-white/30 border-white/20'
      }`}>{children}</div>
    </div>
  );
};

// Animation wrapper
const AnimatedStep = ({ isAnimating, direction, children, stepKey }) => (
  <div
    key={stepKey}
    className={`absolute inset-0 w-full will-change-transform will-change-opacity ${
      isAnimating
        ? direction === 'next'
          ? 'animate-slideOutLeft'
          : 'animate-slideOutRight'
        : direction === 'next'
        ? 'animate-slideInRight'
        : 'animate-slideInLeft'
    }`}
  >
    {children}
  </div>
);

const Questionnaire = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { formData, updateFormData } = useFormContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [errorMessage, setErrorMessage] = useState('');
  const totalSteps = 11;

  // Safety check - ensure formData exists
  if (!formData) {
    return (
      <div className={`min-h-screen flex flex-col ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-indigo-700 via-violet-700 to-fuchsia-700'
      }`}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const degrees = [
    'BSc Computer Science', 'BSc Software Engineering', 'BSc Information Technology',
    'BSc Electrical Engineering', 'BSc Mechanical Engineering', 'BSc Civil Engineering',
    'BSc Chemical Engineering', 'BSc Electronics Engineering', 'BSc Physics / Applied Physics',
    'BSc Mathematics / Statistics', 'BSc Biotechnology / Bioinformatics', 'BSc Environmental Science',
    'BSc Chemistry / Biochemistry', 'BBA Business Administration', 'BCom', 'BEc',
    'BA Social Sciences', 'BA Humanities', 'BA Political Science', 'BA English / Literature',
    'MBBS', 'BDS', 'BPharm', 'LLB',
  ];

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];

  const budgetRanges = [
    'Under PKR 25,000/semester', 'PKR 25,000 - 50,000/semester', 'PKR 50,000 - 100,000/semester',
    'PKR 100,000 - 200,000/semester', 'PKR 200,000 - 500,000/semester', 'Above PKR 500,000/semester',
  ];

  const scholarshipOptions = ['Need-based scholarship', 'Merit-based scholarship', 'Sports scholarship', 'Both need and merit-based', 'No scholarship needed'];

  const academicInterests = ['Research', 'Practical Skills', 'Theoretical Knowledge', 'Industry Collaboration', 'International Exposure', 'Entrepreneurship'];

  const careerPreferences = ['Software Development', 'Data Science', 'Business Management', 'Research & Academia', 'Healthcare', 'Engineering', 'Law & Policy', 'Creative Arts'];

  const extraCurricularOptions = ['Sports', 'Debate & Public Speaking', 'Music & Arts', 'Volunteer Work', 'Student Government', 'Clubs & Societies', 'Competitions & Hackathons', 'Cultural Activities'];

  // Validate current step
  const validateStep = useCallback((step) => {
    if (!formData) return false;
    
    setErrorMessage('');
    try {
      switch (step) {
        case 1:
          const sscVal = formData.sscPercentage || '';
          if (!sscVal || String(sscVal).trim() === '') {
            setErrorMessage('Please enter your SSC percentage');
            return false;
          }
          const ssc = parseFloat(sscVal);
          if (isNaN(ssc) || ssc < 0 || ssc > 100) {
            setErrorMessage('Please enter a valid percentage between 0 and 100');
            return false;
          }
          return true;
        case 2:
          const hsscVal = formData.hsscPercentage || '';
          if (!hsscVal || String(hsscVal).trim() === '') {
            setErrorMessage('Please enter your HSSC percentage');
            return false;
          }
          const hssc = parseFloat(hsscVal);
          if (isNaN(hssc) || hssc < 0 || hssc > 100) {
            setErrorMessage('Please enter a valid percentage between 0 and 100');
            return false;
          }
          return true;
        case 3:
          const degree = formData.preferredDegree || '';
          if (!degree || String(degree).trim() === '') {
            setErrorMessage('Please select a preferred degree program');
            return false;
          }
          return true;
        case 4:
          const uniType = formData.preferredUniversityType || '';
          if (!uniType || String(uniType).trim() === '') {
            setErrorMessage('Please select a preferred university type');
            return false;
          }
          return true;
        case 5:
          if (!formData.preferredCities || !Array.isArray(formData.preferredCities) || formData.preferredCities.length === 0) {
            setErrorMessage('Please select at least one preferred city');
            return false;
          }
          return true;
        case 6:
          const budget = formData.budgetPerSemester || '';
          if (!budget || String(budget).trim() === '') {
            setErrorMessage('Please select a budget range');
            return false;
          }
          return true;
        case 7:
          const scholarship = formData.scholarshipPreference || '';
          if (!scholarship || String(scholarship).trim() === '') {
            setErrorMessage('Please select a scholarship preference');
            return false;
          }
          return true;
        case 8:
          if (!formData.academicInterests || !Array.isArray(formData.academicInterests) || formData.academicInterests.length === 0) {
            setErrorMessage('Please select at least one academic interest');
            return false;
          }
          return true;
        case 9:
          const career = formData.careerPreference || '';
          if (!career || String(career).trim() === '') {
            setErrorMessage('Please select a career preference');
            return false;
          }
          return true;
        case 10:
          const relocate = formData.willingToRelocate || '';
          if (!relocate || String(relocate).trim() === '') {
            setErrorMessage('Please select whether you are willing to relocate');
            return false;
          }
          return true;
        case 11:
          if (!formData.extraCurricularInterests || !Array.isArray(formData.extraCurricularInterests) || formData.extraCurricularInterests.length === 0) {
            setErrorMessage('Please select at least one extra-curricular interest');
            return false;
          }
          return true;
        default:
          return true;
      }
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }, [formData]);

  // Next / Prev steps
  const nextStep = useCallback(() => {
    if (isAnimating) return;
    
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
      // Show error with animation
      setTimeout(() => {
        const errorElement = document.querySelector('.questionnaire-error');
        if (errorElement) {
          errorElement.classList.add('animate-shake');
          setTimeout(() => errorElement.classList.remove('animate-shake'), 500);
        }
      }, 0);
      return;
    }

    if (currentStep < totalSteps) {
      setIsAnimating(true);
      setDirection('next');
      setErrorMessage(''); // Clear error on successful validation
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
        setIsAnimating(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else {
      // Final validation before submitting
      if (!validateStep(currentStep)) {
        return;
      }
      const userEmail = localStorage.getItem('userEmail');
              const saved = JSON.parse(localStorage.getItem('questionnaires') || '[]');
              saved.push({ ...formData, userEmail, completedAt: new Date().toISOString() });
              localStorage.setItem('questionnaires', JSON.stringify(saved));
              updateProgress('questionnaire_complete');
              navigate('/recommendations');
    }
  }, [isAnimating, currentStep, totalSteps, formData, navigate, validateStep]);

  const prevStep = () => {
    if (isAnimating || currentStep === 1) return;
    setIsAnimating(true);
    setDirection('prev');
    setTimeout(() => {
      setCurrentStep((s) => s - 1);
      setIsAnimating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  // Keypress for Enter
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isAnimating) {
        nextStep(); // Use nextStep which now includes validation
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnimating, nextStep]);

  // Auto-focus text inputs when step changes and clear error
  useEffect(() => {
    setErrorMessage(''); // Clear error when step changes
    if (!isAnimating) {
      // Small delay to ensure the input is rendered after animation
      const timer = setTimeout(() => {
        // Find the first input field in the current step
        const stepContainer = document.querySelector('.questionnaire-step-container');
        if (stepContainer) {
          const input = stepContainer.querySelector('input[type="number"], input[type="text"]');
          if (input) {
            input.focus();
            input.select(); // Select text if any
          }
        }
      }, 300); // Wait for animation to complete
      return () => clearTimeout(timer);
    }
  }, [currentStep, isAnimating]);

  // Toggle handlers
  const handleCityToggle = useCallback((city) => {
    const current = formData.preferredCities || [];
    updateFormData('preferredCities', current.includes(city) ? current.filter((c) => c !== city) : [...current, city]);
  }, [formData.preferredCities, updateFormData]);

  const handleInterestToggle = useCallback((interest) => {
    const current = formData.academicInterests || [];
    updateFormData('academicInterests', current.includes(interest) ? current.filter((i) => i !== interest) : [...current, interest]);
  }, [formData.academicInterests, updateFormData]);

  const handleExtraCurricularToggle = useCallback((activity) => {
    const current = formData.extraCurricularInterests || [];
    updateFormData('extraCurricularInterests', current.includes(activity) ? current.filter((a) => a !== activity) : [...current, activity]);
  }, [formData.extraCurricularInterests, updateFormData]);

  // Unified option class
  const optionClass = (active) => {
    if (theme === 'dark') {
      return `flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border ${
        active 
          ? 'bg-purple-600 text-white border-purple-500' 
          : 'bg-gray-700/50 text-gray-200 border-gray-600 hover:bg-gray-700'
      }`;
    }
    return `flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border border-white/20 bg-white/10 text-black hover:purple-200 ${
      active ? 'bg-purple-200 text-indigo-700 border-purple' : ''
    }`;
  };

  // Render steps - memoize steps array at component level
  const labelCls = theme === 'dark' ? 'ml-3 text-gray-200 font-medium' : 'ml-3 text-black font-medium';
  const radioBase = 'w-4 h-4 text-indigo-500 focus:ring-fuchsia-500';
  const cardAccent = 'from-indigo-500 to-fuchsia-500';

  const steps = useMemo(() => [
      // Step 1
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your SSC (Matric) percentage?" required>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.sscPercentage}
                  onChange={(e) => updateFormData('sscPercentage', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-fuchsia-400 shadow-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700/90 focus:bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white/90 focus:bg-white border-white/30 text-gray-900'
                  }`}
                  placeholder="Enter percentage (e.g., 85)"
                />
        </QuestionCard>
      </CardWrap>,
      // Step 2
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your HSSC (Intermediate) percentage?" required>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.hsscPercentage}
                  onChange={(e) => updateFormData('hsscPercentage', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-fuchsia-400 shadow-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700/90 focus:bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white/90 focus:bg-white border-white/30 text-gray-900'
                  }`}
                  placeholder="Enter percentage (e.g., 80)"
                />
        </QuestionCard>
      </CardWrap>,
      // Step 3
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your preferred degree program?" required>
          <SearchableDegreeSelect
            value={formData.preferredDegree}
            onChange={(value) => updateFormData('preferredDegree', value)}
            degrees={degrees}
          />
        </QuestionCard>
      </CardWrap>,
      // Step 4
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your preferred university type?" required>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['Public', 'Private', 'Both'].map((type) => (
              <label key={type} className={optionClass(formData.preferredUniversityType === type)}>
                <input
                  type="radio"
                  name="universityType"
                  value={type}
                  checked={formData.preferredUniversityType === type}
                  onChange={(e) => updateFormData('preferredUniversityType', e.target.value)}
                  className={radioBase}
                />
                <span className={labelCls}>{type}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 5
      <CardWrap accent={cardAccent}>
        <QuestionCard question="Which cities do you prefer? (Select multiple)" required>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cities.map((city) => (
              <button key={city} type="button" onClick={() => handleCityToggle(city)} className={optionClass(formData.preferredCities?.includes(city))}>
                {city}
              </button>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 6
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your budget per semester?" required>
          <div className="flex flex-wrap gap-2">
            {budgetRanges.map((range) => (
              <label key={range} className={optionClass(formData.budgetPerSemester === range)}>
                <input
                  type="radio"
                  name="budget"
                  value={range}
                  checked={formData.budgetPerSemester === range}
                  onChange={(e) => updateFormData('budgetPerSemester', e.target.value)}
                  className={radioBase}
                />
                <span className={labelCls}>{range}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 7
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your scholarship preference?" required>
          <div className="flex flex-wrap gap-2">
            {scholarshipOptions.map((option) => (
              <label key={option} className={optionClass(formData.scholarshipPreference === option)}>
                <input
                  type="radio"
                  name="scholarship"
                  value={option}
                  checked={formData.scholarshipPreference === option}
                  onChange={(e) => updateFormData('scholarshipPreference', e.target.value)}
                  className={radioBase}
                />
                <span className={labelCls}>{option}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 8
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What are your academic interests? (Select multiple)" required>
          <div className="flex flex-wrap gap-2">
            {academicInterests.map((interest) => (
              <button key={interest} type="button" onClick={() => handleInterestToggle(interest)} className={optionClass(formData.academicInterests?.includes(interest))}>
                <Chip active={formData.academicInterests?.includes(interest)}>{interest}</Chip>
              </button>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 9
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your career preference?" required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {careerPreferences.map((career) => (
              <label key={career} className={optionClass(formData.careerPreference === career)}>
                <input
                  type="radio"
                  name="career"
                  value={career}
                  checked={formData.careerPreference === career}
                  onChange={(e) => updateFormData('careerPreference', e.target.value)}
                  className={radioBase}
                />
                <span className={labelCls}>{career}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 10
      <CardWrap accent={cardAccent}>
        <QuestionCard question="Are you willing to relocate for your studies?" required>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Yes', 'No', 'Maybe'].map((option) => (
              <label key={option} className={optionClass(formData.willingToRelocate === option)}>
                <input
                  type="radio"
                  name="relocate"
                  value={option}
                  checked={formData.willingToRelocate === option}
                  onChange={(e) => updateFormData('willingToRelocate', e.target.value)}
                  className="sr-only"
                />
                <span className="font-semibold">{option}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 11
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What are your extra-curricular interests? (Select multiple)" required>
          <div className="flex flex-wrap gap-2">
            {extraCurricularOptions.map((activity) => (
              <button key={activity} type="button" onClick={() => handleExtraCurricularToggle(activity)} className={optionClass(formData.extraCurricularInterests?.includes(activity))}>
                <Chip active={formData.extraCurricularInterests?.includes(activity)}>{activity}</Chip>
              </button>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>
    ], [formData, updateFormData, degrees, cities, budgetRanges, scholarshipOptions, academicInterests, careerPreferences, extraCurricularOptions, optionClass, labelCls, radioBase, cardAccent, handleCityToggle, handleInterestToggle, handleExtraCurricularToggle]);

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return steps[0];
      case 2:
        return steps[1];
      case 3:
        return steps[2];
      case 4:
        return steps[3];
      case 5:
        return steps[4];
      case 6:
        return steps[5];
      case 7:
        return steps[6];
      case 8:
        return steps[7];
      case 9:
        return steps[8];
      case 10:
        return steps[9];
      case 11:
        return steps[10];
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-indigo-700 via-violet-700 to-fuchsia-700'
    }`}>
      <Navbar />

      <div className="sticky top-0 z-30 bg-gradient-to-b from-indigo-900/70 to-violet-900/30 backdrop-blur supports-[backdrop-filter]:bg-indigo-900/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between">
          <div className="text-white/90 font-semibold text-sm sm:text-base">Questionnaire</div>
          <div className="text-white/80 text-xs sm:text-sm">Step {currentStep} of {totalSteps}</div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 animate-fadeIn px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">Tell us about yourself</h1>
            <p className="text-white/80 mt-1 text-sm sm:text-base">We'll personalize your university recommendations.</p>
          </div>

          <QuestionStepper currentStep={currentStep} totalSteps={totalSteps} />

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 questionnaire-error bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-fadeIn">
              {errorMessage}
            </div>
          )}

          <div className="mt-4 sm:mt-6 relative min-h-[300px] sm:min-h-[380px] md:min-h-[420px] w-full overflow-hidden questionnaire-step-container">
            <AnimatedStep isAnimating={isAnimating} direction={direction} stepKey={currentStep}>
              {renderStep()}
            </AnimatedStep>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                currentStep === 1
                  ? 'bg-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:-translate-y-0.5'
              }`}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base text-indigo-700 bg-white shadow hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              {currentStep === totalSteps ? 'Get Recommendations' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px) scale(0.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px) scale(0.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to { opacity: 0; transform: translateX(-100px) scale(0.96); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to { opacity: 0; transform: translateX(100px) scale(0.96); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out forwards; }
        .animate-slideOutLeft { animation: slideOutLeft 0.3s ease-out forwards; }
        .animate-slideOutRight { animation: slideOutRight 0.3s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Questionnaire;
