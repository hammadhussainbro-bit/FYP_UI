import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuestionCard from '../components/QuestionCard';
import QuestionStepper from '../components/QuestionStepper';
import SearchableDegreeSelect from '../components/SearchableDegreeSelect';

// Chip component
const Chip = ({ active, children }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all select-none ${
      active
        ? 'bg-white text-indigo-700 shadow'
        : 'bg-white/10 text-black border border-white/20 hover:bg-white/20'
    }`}
  >
    {children}
  </span>
);

// Card wrapper with fixed background
const CardWrap = ({ children, accent = 'from-indigo-500 to-fuchsia-500' }) => (
  <div className="relative overflow-hidden rounded-2xl">
    <div className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-70 blur`}></div>
    <div className="relative rounded-2xl bg-white/30 backdrop-blur-md border border-white/20 p-6">{children}</div>
  </div>
);

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
  const { formData, updateFormData } = useFormContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const totalSteps = 11;

  // Keypress for Enter
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isAnimating) {
        if (currentStep < totalSteps) {
          nextStep();
        } else {
          navigate('/recommendations');
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, isAnimating, totalSteps, navigate]);

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

  // Next / Prev steps
  const nextStep = () => {
    if (isAnimating) return;
    if (currentStep < totalSteps) {
      setIsAnimating(true);
      setDirection('next');
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
        setIsAnimating(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else {
      const userEmail = localStorage.getItem('userEmail');
      const saved = JSON.parse(localStorage.getItem('questionnaires') || '[]');
      saved.push({ ...formData, userEmail, completedAt: new Date().toISOString() });
      localStorage.setItem('questionnaires', JSON.stringify(saved));
      navigate('/recommendations');
    }
  };

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

  // Toggle handlers
  const handleCityToggle = (city) => {
    const current = formData.preferredCities || [];
    updateFormData('preferredCities', current.includes(city) ? current.filter((c) => c !== city) : [...current, city]);
  };
  const handleInterestToggle = (interest) => {
    const current = formData.academicInterests || [];
    updateFormData('academicInterests', current.includes(interest) ? current.filter((i) => i !== interest) : [...current, interest]);
  };
  const handleExtraCurricularToggle = (activity) => {
    const current = formData.extraCurricularInterests || [];
    updateFormData('extraCurricularInterests', current.includes(activity) ? current.filter((a) => a !== activity) : [...current, activity]);
  };

  // Unified option class
  const optionClass = (active) =>
    `flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border border-white/20 bg-white/10 text-black hover:purple-200 ${
      active ? 'bg-purple-200 text-indigo-700 border-purple' : ''
    }`;

  // Render steps
  const renderStep = () => {
    const labelCls = 'ml-3 text-black font-medium';
    const radioBase = 'w-4 h-4 text-indigo-500 focus:ring-fuchsia-500';
    const cardAccent = 'from-indigo-500 to-fuchsia-500';

    switch (currentStep) {
      case 1:
        return (
          <CardWrap accent={cardAccent}>
            <QuestionCard question="What is your SSC (Matric) percentage?" required>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.sscPercentage}
                onChange={(e) => updateFormData('sscPercentage', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-gray-900 shadow-sm"
                placeholder="Enter percentage (e.g., 85)"
              />
            </QuestionCard>
          </CardWrap>
        );
      case 2:
        return (
          <CardWrap accent={cardAccent}>
            <QuestionCard question="What is your HSSC (Intermediate) percentage?" required>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.hsscPercentage}
                onChange={(e) => updateFormData('hsscPercentage', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-gray-900 shadow-sm"
                placeholder="Enter percentage (e.g., 80)"
              />
            </QuestionCard>
          </CardWrap>
        );
      case 3:
        return (
          <CardWrap accent={cardAccent}>
            <QuestionCard question="What is your preferred degree program?" required>
              <SearchableDegreeSelect
                value={formData.preferredDegree}
                onChange={(value) => updateFormData('preferredDegree', value)}
                degrees={degrees}
              />
            </QuestionCard>
          </CardWrap>
        );
      case 4:
        return (
          <CardWrap accent={cardAccent}>
            <QuestionCard question="What is your preferred university type?" required>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
          </CardWrap>
        );
      case 5:
        return (
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
          </CardWrap>
        );
      case 6:
        return (
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
          </CardWrap>
        );
      case 7:
        return (
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
          </CardWrap>
        );
      case 8:
        return (
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
          </CardWrap>
        );
      case 9:
        return (
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
          </CardWrap>
        );
      case 10:
        return (
          <CardWrap accent={cardAccent}>
            <QuestionCard question="Are you willing to relocate for your studies?" required>
              <div className="grid grid-cols-3 gap-3">
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
          </CardWrap>
        );
      case 11:
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-700 via-violet-700 to-fuchsia-700">
      <Navbar />

      <div className="sticky top-0 z-30 bg-gradient-to-b from-indigo-900/70 to-violet-900/30 backdrop-blur supports-[backdrop-filter]:bg-indigo-900/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="text-white/90 font-semibold">Questionnaire</div>
          <div className="text-white/80 text-sm">Step {currentStep} of {totalSteps}</div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-4xl font-black text-white tracking-tight">Tell us about yourself</h1>
            <p className="text-white/80 mt-1">We’ll personalize your university recommendations.</p>
          </div>

          <QuestionStepper currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mt-6 relative min-h-[420px] w-full overflow-hidden">
            <AnimatedStep isAnimating={isAnimating} direction={direction} stepKey={currentStep}>
              {renderStep()}
            </AnimatedStep>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                currentStep === 1
                  ? 'bg-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:-translate-y-0.5'
              }`}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-3 rounded-xl font-semibold text-indigo-700 bg-white shadow hover:shadow-lg hover:-translate-y-0.5 transition"
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
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out forwards; }
        .animate-slideOutLeft { animation: slideOutLeft 0.3s ease-out forwards; }
        .animate-slideOutRight { animation: slideOutRight 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Questionnaire;
