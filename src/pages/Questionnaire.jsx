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
      className={`inline-flex items-center justify-center px-3 py-2 rounded-full text-sm sm:text-base font-medium transition-all select-none w-full text-center break-words ${
        active
          ? theme === 'dark'
            ? 'bg-purple-600 text-white shadow'
            : 'bg-purple-200/80 text-purple-900 shadow-lg border border-purple-300 backdrop-blur-sm'
          : theme === 'dark'
          ? 'bg-gray-700/50 text-gray-200 border border-gray-600 hover:bg-gray-700'
          : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
      }`}
      style={theme !== 'dark' && !active ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}
    >
      {children}
    </span>
  );
};

// Card wrapper with fixed background
const CardWrap = ({ children, accent = 'from-indigo-500 to-fuchsia-500' }) => {
  const { theme } = useTheme();
  return (
    <div className="relative overflow-visible rounded-xl sm:rounded-2xl w-full mb-0">
      <div className={`absolute inset-0 bg-gradient-to-r ${
        theme === 'dark' ? 'from-gray-800 to-gray-700' : accent
      } opacity-70 blur`}></div>
      <div className={`relative rounded-xl sm:rounded-2xl backdrop-blur-md border p-4 sm:p-5 md:p-6 w-full overflow-visible ${
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
    className={`relative w-full will-change-transform will-change-opacity ${
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
      return `flex items-center justify-center p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all border text-sm sm:text-base ${
        active 
          ? 'bg-purple-600 text-white border-purple-500' 
          : 'bg-gray-700/50 text-gray-200 border-gray-600 active:bg-gray-700'
      }`;
    }
    const baseClass = `flex items-center justify-center p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all border ${
      theme === 'dark' 
        ? 'border-gray-600 bg-gray-700/50 text-gray-200 active:bg-gray-700'
        : active
        ? 'border-purple-300 bg-purple-200/80 text-purple-900 shadow-lg backdrop-blur-sm'
        : 'border-white/30 bg-white/20 text-white hover:bg-white/30 active:bg-white/40 backdrop-blur-sm'
    } text-sm sm:text-base ${
      active && theme === 'dark' ? 'bg-purple-600 text-white border-purple-500' : ''
    }`;
    return baseClass;
  };

  // Render steps - memoize steps array at component level
  const labelCls = theme === 'dark' ? 'text-gray-200 font-medium text-sm sm:text-base break-words' : 'text-white font-medium text-sm sm:text-base break-words drop-shadow-sm';
  const radioBase = 'sr-only';
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
                      : 'bg-white/30 backdrop-blur-sm focus:bg-white/40 border-white/40 text-white placeholder-white/70'
                  }`}
                  style={theme !== 'dark' ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}
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
                      : 'bg-white/30 backdrop-blur-sm focus:bg-white/40 border-white/40 text-white placeholder-white/70'
                  }`}
                  style={theme !== 'dark' ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}
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
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {['Public', 'Private', 'Both'].map((type) => (
              <label key={type} className={`${optionClass(formData.preferredUniversityType === type)} min-h-[48px] touch-manipulation`} style={theme !== 'dark' && formData.preferredUniversityType !== type ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 w-full">
            {cities.map((city) => (
              <button key={city} type="button" onClick={() => handleCityToggle(city)} className={`${optionClass(formData.preferredCities?.includes(city))} min-h-[48px] touch-manipulation w-full break-words`} style={theme !== 'dark' && !formData.preferredCities?.includes(city) ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
                {city}
              </button>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 6
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your budget per semester?" required>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full overflow-visible">
            {budgetRanges.map((range) => (
              <label key={range} className={`${optionClass(formData.budgetPerSemester === range)} min-h-[48px] touch-manipulation w-full break-words`} style={theme !== 'dark' && formData.budgetPerSemester !== range ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
                <input
                  type="radio"
                  name="budget"
                  value={range}
                  checked={formData.budgetPerSemester === range}
                  onChange={(e) => updateFormData('budgetPerSemester', e.target.value)}
                  className={radioBase}
                />
                <span className={`${labelCls} break-words text-center sm:text-left`}>{range}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 7
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your scholarship preference?" required>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full overflow-visible">
            {scholarshipOptions.map((option) => (
              <label key={option} className={`${optionClass(formData.scholarshipPreference === option)} min-h-[48px] touch-manipulation w-full break-words`} style={theme !== 'dark' && formData.scholarshipPreference !== option ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
                <input
                  type="radio"
                  name="scholarship"
                  value={option}
                  checked={formData.scholarshipPreference === option}
                  onChange={(e) => updateFormData('scholarshipPreference', e.target.value)}
                  className={radioBase}
                />
                <span className={`${labelCls} break-words text-center sm:text-left`}>{option}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 8
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What are your academic interests? (Select multiple)" required>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full overflow-visible">
            {academicInterests.map((interest) => (
              <button key={interest} type="button" onClick={() => handleInterestToggle(interest)} className={`${optionClass(formData.academicInterests?.includes(interest))} min-h-[48px] touch-manipulation w-full`} style={theme !== 'dark' && !formData.academicInterests?.includes(interest) ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
                <Chip active={formData.academicInterests?.includes(interest)}>{interest}</Chip>
              </button>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 9
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What is your career preference?" required>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full overflow-visible">
            {careerPreferences.map((career) => (
              <label key={career} className={`${optionClass(formData.careerPreference === career)} min-h-[48px] touch-manipulation w-full break-words`} style={theme !== 'dark' && formData.careerPreference !== career ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
                <input
                  type="radio"
                  name="career"
                  value={career}
                  checked={formData.careerPreference === career}
                  onChange={(e) => updateFormData('careerPreference', e.target.value)}
                  className={radioBase}
                />
                <span className={`${labelCls} break-words text-center sm:text-left`}>{career}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 10
      <CardWrap accent={cardAccent}>
        <QuestionCard question="Are you willing to relocate for your studies?" required>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
            {['Yes', 'No', 'Maybe'].map((option) => (
              <label key={option} className={`${optionClass(formData.willingToRelocate === option)} min-h-[48px] touch-manipulation w-full`} style={theme !== 'dark' && formData.willingToRelocate !== option ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
                <input
                  type="radio"
                  name="relocate"
                  value={option}
                  checked={formData.willingToRelocate === option}
                  onChange={(e) => updateFormData('willingToRelocate', e.target.value)}
                  className="sr-only"
                />
                <span className="font-semibold text-sm sm:text-base">{option}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      </CardWrap>,
      // Step 11
      <CardWrap accent={cardAccent}>
        <QuestionCard question="What are your extra-curricular interests? (Select multiple)" required>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 w-full overflow-visible">
            {extraCurricularOptions.map((activity) => (
              <button key={activity} type="button" onClick={() => handleExtraCurricularToggle(activity)} className={`${optionClass(formData.extraCurricularInterests?.includes(activity))} min-h-[48px] touch-manipulation w-full`} style={theme !== 'dark' && !formData.extraCurricularInterests?.includes(activity) ? { textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } : {}}>
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
    <div className={`min-h-screen flex flex-col overflow-x-hidden w-full relative ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-indigo-700 via-violet-700 to-fuchsia-700'
    }`}>
      {/* Animated Blobs - Premium Matching Hero */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden" style={{ mixBlendMode: 'screen', zIndex: 0 }}>
        <div 
          id="blob-purple-questionnaire"
          className="w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[900px] bg-fuchsia-500 rounded-full blur-3xl absolute -top-20 -left-20" 
          style={{
            animation: 'blobMove1 15s ease-in-out infinite',
            willChange: 'transform',
            transformOrigin: 'center center'
          }}
        />
        <div 
          id="blob-blue-questionnaire"
          className="w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] md:w-[750px] md:h-[750px] lg:w-[850px] lg:h-[850px] bg-indigo-500 rounded-full blur-3xl absolute top-40 right-0" 
          style={{
            animation: 'blobMove2 15s ease-in-out infinite',
            animationDelay: '2s',
            willChange: 'transform',
            transformOrigin: 'center center'
          }}
        />
      </div>
      <Navbar />

      <div className="sticky top-[56px] sm:top-[60px] md:top-[64px] z-30 bg-gradient-to-b from-indigo-900/70 to-violet-900/30 backdrop-blur-xl supports-[backdrop-filter]:bg-indigo-900/40 border-b border-white/10 w-full" style={{ 
        boxShadow: '0 2px 0 0 rgba(139, 92, 246, 0.3)'
      }}>
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between w-full">
          <div className="text-white/90 font-semibold text-xs sm:text-sm md:text-base truncate drop-shadow-sm">Questionnaire</div>
        </div>
      </div>

      <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10 w-full overflow-x-hidden relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-4 sm:mb-6 md:mb-8 animate-fadeIn px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">Tell us about yourself</h1>
            <p className="text-white/80 mt-1 text-xs sm:text-sm md:text-base">We'll personalize your university recommendations.</p>
          </div>

          <QuestionStepper currentStep={currentStep} totalSteps={totalSteps} />

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-3 sm:mt-4 questionnaire-error bg-red-500/20 border border-red-500/50 text-red-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm animate-fadeIn w-full">
              {errorMessage}
            </div>
          )}

          <div className="mt-3 sm:mt-4 md:mt-6 w-full overflow-visible questionnaire-step-container">
            <AnimatedStep isAnimating={isAnimating} direction={direction} stepKey={currentStep}>
              {renderStep()}
            </AnimatedStep>
          </div>

          <div className="mt-8 sm:mt-10 mb-4 sm:mb-6 flex flex-row items-center justify-between gap-3 sm:gap-4 w-full relative z-10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`group relative flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-2xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 touch-manipulation min-h-[48px] sm:min-h-[52px] overflow-hidden ${
                currentStep === 1
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/15 hover:border-white/50 active:bg-white/20 hover:scale-[1.02] hover:-translate-y-0.5'
              }`}
              style={currentStep !== 1 ? { boxShadow: '0 8px 30px rgba(255, 255, 255, 0.1), 0 0 15px rgba(255, 255, 255, 0.1)' } : {}}
            >
              {currentStep !== 1 && (
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              )}
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Back</span>
              </span>
            </button>
            <button
              onClick={nextStep}
              className="group relative flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-2xl font-semibold text-xs sm:text-sm md:text-base text-indigo-700 bg-gradient-to-r from-white via-gray-50 to-white shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300 touch-manipulation min-h-[48px] sm:min-h-[52px] overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5"
              style={{ boxShadow: '0 10px 40px rgba(255, 255, 255, 0.2), 0 0 20px rgba(139, 92, 246, 0.3)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-sm md:text-base">{currentStep === totalSteps ? 'Get Recommendations' : 'Next'}</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
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
        @keyframes blobMove1 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(300px, -200px) scale(1.2);
          }
          50% {
            transform: translate(-250px, 250px) scale(0.8);
          }
          75% {
            transform: translate(200px, -150px) scale(1.1);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes blobMove2 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(-250px, 200px) scale(0.8);
          }
          50% {
            transform: translate(300px, -250px) scale(1.2);
          }
          75% {
            transform: translate(-200px, -150px) scale(1.1);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        #blob-purple-questionnaire {
          animation: blobMove1 15s ease-in-out infinite;
          will-change: transform;
        }
        
        #blob-blue-questionnaire {
          animation: blobMove2 15s ease-in-out infinite;
          animation-delay: 2s;
          will-change: transform;
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
