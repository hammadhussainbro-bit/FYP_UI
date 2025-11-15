import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [students, setStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [editingQuestionnaire, setEditingQuestionnaire] = useState(null);
  const [questionnaireQuestions, setQuestionnaireQuestions] = useState([]);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Check if fake data should be generated (only if no data exists)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingQuestionnaires = JSON.parse(localStorage.getItem('questionnaires') || '[]');
    
    // Load existing data only; sample data should be pre-seeded elsewhere
    setStudents(existingUsers);
    setQuestionnaires(existingQuestionnaires);

    // Load questionnaire questions
    const savedQuestions = JSON.parse(localStorage.getItem('questionnaireQuestions') || '[]');
    if (savedQuestions.length > 0) {
      setQuestionnaireQuestions(savedQuestions);
    } else {
      // Initialize with default questions
      const defaultQuestions = [
        {
          id: 1,
          step: 1,
          question: 'What is your SSC (Matric) percentage?',
          type: 'number',
          field: 'sscPercentage',
          required: true,
          placeholder: 'Enter percentage (e.g., 85)',
          min: 0,
          max: 100,
        },
        {
          id: 2,
          step: 2,
          question: 'What is your HSSC (Intermediate) percentage?',
          type: 'number',
          field: 'hsscPercentage',
          required: true,
          placeholder: 'Enter percentage (e.g., 80)',
          min: 0,
          max: 100,
        },
        {
          id: 3,
          step: 3,
          question: 'What is your preferred degree program?',
          type: 'select',
          field: 'preferredDegree',
          required: true,
          options: ['BSc Computer Science', 'BSc Software Engineering', 'BSc Information Technology', 'BSc Electrical Engineering', 'BSc Mechanical Engineering', 'BSc Civil Engineering', 'BSc Chemical Engineering', 'BSc Electronics Engineering', 'BSc Physics / Applied Physics', 'BSc Mathematics / Statistics', 'BSc Biotechnology / Bioinformatics', 'BSc Environmental Science', 'BSc Chemistry / Biochemistry', 'BBA Business Administration', 'BCom', 'BEc', 'BA Social Sciences', 'BA Humanities', 'BA Political Science', 'BA English / Literature', 'MBBS', 'BDS', 'BPharm', 'LLB'],
        },
        {
          id: 4,
          step: 4,
          question: 'What is your preferred university type?',
          type: 'radio',
          field: 'preferredUniversityType',
          required: true,
          options: ['Public', 'Private', 'Both'],
        },
        {
          id: 5,
          step: 5,
          question: 'Which cities do you prefer? (Select multiple)',
          type: 'checkbox',
          field: 'preferredCities',
          required: true,
          options: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'],
        },
        {
          id: 6,
          step: 6,
          question: 'What is your budget per semester?',
          type: 'radio',
          field: 'budgetPerSemester',
          required: true,
          options: ['Under PKR 25,000/semester', 'PKR 25,000 - 50,000/semester', 'PKR 50,000 - 100,000/semester', 'PKR 100,000 - 200,000/semester', 'PKR 200,000 - 500,000/semester', 'Above PKR 500,000/semester'],
        },
        {
          id: 7,
          step: 7,
          question: 'What is your scholarship preference?',
          type: 'radio',
          field: 'scholarshipPreference',
          required: true,
          options: ['Need-based scholarship', 'Merit-based scholarship', 'Sports scholarship', 'Both need and merit-based', 'No scholarship needed'],
        },
        {
          id: 8,
          step: 8,
          question: 'What are your academic interests? (Select multiple)',
          type: 'checkbox',
          field: 'academicInterests',
          required: true,
          options: ['Research', 'Practical Skills', 'Theoretical Knowledge', 'Industry Collaboration', 'International Exposure', 'Entrepreneurship'],
        },
        {
          id: 9,
          step: 9,
          question: 'What is your career preference?',
          type: 'radio',
          field: 'careerPreference',
          required: true,
          options: ['Software Development', 'Data Science', 'Business Management', 'Research & Academia', 'Healthcare', 'Engineering', 'Law & Policy', 'Creative Arts'],
        },
        {
          id: 10,
          step: 10,
          question: 'Are you willing to relocate for your studies?',
          type: 'radio',
          field: 'willingToRelocate',
          required: true,
          options: ['Yes', 'No', 'Maybe'],
        },
        {
          id: 11,
          step: 11,
          question: 'What are your extra-curricular interests? (Select multiple)',
          type: 'checkbox',
          field: 'extraCurricularInterests',
          required: true,
          options: ['Sports', 'Debate & Public Speaking', 'Music & Arts', 'Volunteer Work', 'Student Government', 'Clubs & Societies', 'Competitions & Hackathons', 'Cultural Activities'],
        },
      ];
      setQuestionnaireQuestions(defaultQuestions);
      localStorage.setItem('questionnaireQuestions', JSON.stringify(defaultQuestions));
    }

    // Load universities (with comprehensive data)
    const savedUniversities = JSON.parse(localStorage.getItem('universities') || '[]');
    if (savedUniversities.length > 0) {
      setUniversities(savedUniversities);
    } else {
      // Initialize with comprehensive university data
      const initialUniversities = [
        {
          id: 1,
          name: 'NUST - National University of Sciences and Technology',
          location: 'Islamabad',
          type: 'Public',
          tuitionFee: 150000,
          ranking: 1,
          programs: ['BSc Computer Science', 'BSc Software Engineering', 'BSc Electrical Engineering', 'BSc Mechanical Engineering', 'BSc Civil Engineering', 'BBA', 'BSc Mathematics'],
          entryTest: 'NET',
          website: 'https://www.nust.edu.pk',
        },
        {
          id: 2,
          name: 'LUMS - Lahore University of Management Sciences',
          location: 'Lahore',
          type: 'Private',
          tuitionFee: 800000,
          ranking: 2,
          programs: ['BSc Computer Science', 'BBA', 'BSc Economics', 'BSc Mathematics', 'BA Social Sciences'],
          entryTest: 'LCAT',
          website: 'https://www.lums.edu.pk',
        },
        {
          id: 3,
          name: 'FAST - National University of Computer and Emerging Sciences',
          location: 'Karachi',
          type: 'Private',
          tuitionFee: 200000,
          ranking: 3,
          programs: ['BSc Computer Science', 'BSc Software Engineering', 'BSc Information Technology', 'BSc Electrical Engineering'],
          entryTest: 'NTS',
          website: 'https://www.nu.edu.pk',
        },
        {
          id: 4,
          name: 'UET - University of Engineering and Technology',
          location: 'Lahore',
          type: 'Public',
          tuitionFee: 80000,
          ranking: 5,
          programs: ['BSc Electrical Engineering', 'BSc Mechanical Engineering', 'BSc Civil Engineering', 'BSc Chemical Engineering', 'BSc Computer Engineering'],
          entryTest: 'ECAT',
          website: 'https://www.uet.edu.pk',
        },
        {
          id: 5,
          name: 'KU - University of Karachi',
          location: 'Karachi',
          type: 'Public',
          tuitionFee: 50000,
          ranking: 8,
          programs: ['BSc Computer Science', 'BSc Mathematics', 'BSc Physics', 'BSc Chemistry', 'BBA', 'BCom', 'LLB'],
          entryTest: 'KU Entry Test',
          website: 'https://www.uok.edu.pk',
        },
        {
          id: 6,
          name: 'GIKI - Ghulam Ishaq Khan Institute',
          location: 'Topi, KPK',
          type: 'Private',
          tuitionFee: 300000,
          ranking: 4,
          programs: ['BSc Computer Science', 'BSc Electrical Engineering', 'BSc Mechanical Engineering', 'BSc Chemical Engineering'],
          entryTest: 'GIKI Test',
          website: 'https://www.giki.edu.pk',
        },
        {
          id: 7,
          name: 'IBA - Institute of Business Administration',
          location: 'Karachi',
          type: 'Public',
          tuitionFee: 400000,
          ranking: 6,
          programs: ['BBA', 'BSc Computer Science', 'BSc Economics', 'BSc Mathematics', 'BSc Data Science'],
          entryTest: 'IBA Test',
          website: 'https://www.iba.edu.pk',
        },
        {
          id: 8,
          name: 'COMSATS University',
          location: 'Islamabad',
          type: 'Public',
          tuitionFee: 120000,
          ranking: 7,
          programs: ['BSc Computer Science', 'BSc Software Engineering', 'BSc Electrical Engineering', 'BBA', 'BSc Mathematics'],
          entryTest: 'NTS',
          website: 'https://www.comsats.edu.pk',
        },
      ];
      setUniversities(initialUniversities);
      localStorage.setItem('universities', JSON.stringify(initialUniversities));
    }
  };

  // Calculate comprehensive statistics
  const getStats = () => {
    const genderStats = students.reduce((acc, student) => {
      acc[student.gender] = (acc[student.gender] || 0) + 1;
      return acc;
    }, {});

    const degreeStats = questionnaires.reduce((acc, q) => {
      const degree = q.preferredDegree || 'Not Specified';
      acc[degree] = (acc[degree] || 0) + 1;
      return acc;
    }, {});

    const feeRanges = universities.reduce((acc, uni) => {
      let range = '';
      if (uni.tuitionFee < 100000) range = 'Under 100K';
      else if (uni.tuitionFee < 200000) range = '100K - 200K';
      else if (uni.tuitionFee < 500000) range = '200K - 500K';
      else range = 'Above 500K';
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});

    const universityTypeStats = questionnaires.reduce((acc, q) => {
      const type = q.preferredUniversityType || 'Not Specified';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const cityStats = questionnaires.reduce((acc, q) => {
      const cities = q.preferredCities || [];
      cities.forEach(city => {
        acc[city] = (acc[city] || 0) + 1;
      });
      return acc;
    }, {});

    const careerStats = questionnaires.reduce((acc, q) => {
      const career = q.careerPreference || 'Not Specified';
      acc[career] = (acc[career] || 0) + 1;
      return acc;
    }, {});

    const scholarshipStats = questionnaires.reduce((acc, q) => {
      const scholarship = q.scholarshipPreference || 'Not Specified';
      acc[scholarship] = (acc[scholarship] || 0) + 1;
      return acc;
    }, {});

    const relocateStats = questionnaires.reduce((acc, q) => {
      const relocate = q.willingToRelocate || 'Not Specified';
      acc[relocate] = (acc[relocate] || 0) + 1;
      return acc;
    }, {});

    const academicInterestsStats = questionnaires.reduce((acc, q) => {
      const interests = q.academicInterests || [];
      interests.forEach(interest => {
        acc[interest] = (acc[interest] || 0) + 1;
      });
      return acc;
    }, {});

    const universityTypeDistribution = universities.reduce((acc, uni) => {
      acc[uni.type] = (acc[uni.type] || 0) + 1;
      return acc;
    }, {});

    // Calculate average percentages
    const avgSSC = questionnaires.reduce((sum, q) => sum + (parseFloat(q.sscPercentage) || 0), 0) / (questionnaires.length || 1);
    const avgHSSC = questionnaires.reduce((sum, q) => sum + (parseFloat(q.hsscPercentage) || 0), 0) / (questionnaires.length || 1);

    // Calculate age statistics
    const ageStats = students.reduce((acc, student) => {
      if (student.dob) {
        const birthDate = new Date(student.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        let ageGroup = '';
        if (age < 18) ageGroup = 'Under 18';
        else if (age < 20) ageGroup = '18-19';
        else if (age < 22) ageGroup = '20-21';
        else if (age < 24) ageGroup = '22-23';
        else if (age < 26) ageGroup = '24-25';
        else ageGroup = '26+';
        
        acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      }
      return acc;
    }, {});

    // Calculate average age
    const ages = students
      .filter(s => s.dob)
      .map(s => {
        const birthDate = new Date(s.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      });
    const avgAge = ages.length > 0 ? (ages.reduce((sum, age) => sum + age, 0) / ages.length).toFixed(1) : 0;

    return {
      genderStats,
      degreeStats,
      feeRanges,
      universityTypeStats,
      cityStats,
      careerStats,
      scholarshipStats,
      relocateStats,
      academicInterestsStats,
      universityTypeDistribution,
      ageStats,
      avgSSC,
      avgHSSC,
      avgAge,
    };
  };

  const stats = getStats();

  // Enhanced Pie Chart with animations
  const AnimatedPieChart = ({ data, title, size = 200 }) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
      return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/60 text-center py-8">No data available</p>
        </div>
      );
    }

    let currentAngle = -90;
    const colors = [
      '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899',
      '#06B6D4', '#F97316', '#84CC16', '#A855F7', '#14B8A6', '#F43F5E'
    ];
    const radius = size / 2 - 20;
    const center = size / 2;

    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all animate-fadeIn">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 mr-3 rounded"></span>
          {title}
        </h3>
        <div className="flex flex-col items-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {Object.entries(data).map(([key, value], index) => {
              const percentage = (value / total) * 100;
              const angle = (value / total) * 360;
              const startAngle = currentAngle;
              currentAngle += angle;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (currentAngle * Math.PI) / 180;
              const x1 = center + radius * Math.cos(startRad);
              const y1 = center + radius * Math.sin(startRad);
              const x2 = center + radius * Math.cos(endRad);
              const y2 = center + radius * Math.sin(endRad);
              const largeArc = angle > 180 ? 1 : 0;

              return (
                <path
                  key={key}
                  d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[index % colors.length]}
                  className="transition-all duration-500 hover:opacity-80 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              );
            })}
            <circle cx={center} cy={center} r={radius * 0.4} fill="rgba(255,255,255,0.1)" />
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-bold text-lg"
              transform={`rotate(90 ${center} ${center})`}
            >
              {total}
            </text>
          </svg>
          <div className="mt-6 w-full space-y-2 max-h-48 overflow-y-auto">
            {Object.entries(data)
              .sort(([, a], [, b]) => b - a)
              .map(([key, value], index) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all animate-slideIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center flex-1">
                    <div
                      className="w-4 h-4 rounded-full mr-3 shadow-lg"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-white/90 text-sm flex-1">{key}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{value}</span>
                    <span className="text-white/60 text-xs">({((value / total) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Bar Chart
  const AnimatedBarChart = ({ data, title, color = 'blue' }) => {
    const maxValue = Math.max(...Object.values(data), 1);
    const colorSchemes = {
      blue: ['from-blue-400', 'to-cyan-500'],
      purple: ['from-purple-400', 'to-pink-500'],
      green: ['from-green-400', 'to-emerald-500'],
      yellow: ['from-yellow-400', 'to-orange-500'],
      red: ['from-red-400', 'to-rose-500'],
    };
    const [from, to] = colorSchemes[color] || colorSchemes.blue;

    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all animate-fadeIn">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 mr-3 rounded"></span>
          {title}
        </h3>
        <div className="space-y-4">
          {Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .map(([key, value], index) => (
              <div key={key} className="animate-slideIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-between text-white/90 mb-2">
                  <span className="text-sm font-medium">{key}</span>
                  <span className="text-sm font-bold">{value}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-8 overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${from} ${to} transition-all duration-1000 ease-out flex items-center justify-end pr-3 shadow-lg`}
                    style={{ width: `${(value / maxValue) * 100}%` }}
                  >
                    <span className="text-white text-xs font-bold">{value}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  // Info Card Component
  const InfoCard = ({ icon, title, value, subtitle, gradient, delay = 0 }) => {
    const gradients = {
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-pink-500',
      green: 'from-green-500 to-emerald-500',
      yellow: 'from-yellow-500 to-orange-500',
    };

    return (
      <div
        className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-xl animate-fadeIn`}
        style={{ animationDelay: `${delay}s` }}
      >
        <div className={`w-12 h-12 bg-gradient-to-br ${gradients[gradient]} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
          {icon}
        </div>
        <h4 className="text-white/70 text-sm mb-1">{title}</h4>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        {subtitle && <p className="text-white/60 text-xs">{subtitle}</p>}
      </div>
    );
  };

  const handleDeleteStudent = (email) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updated = users.filter((u) => u.email !== email);
      localStorage.setItem('users', JSON.stringify(updated));
      setStudents(updated);
    }
  };

  const handleAddUniversity = () => {
    const name = prompt('Enter university name:');
    if (name) {
      const newUni = {
        id: universities.length + 1,
        name,
        location: prompt('Enter location:') || '',
        type: prompt('Enter type (Public/Private):') || 'Public',
        tuitionFee: parseInt(prompt('Enter tuition fee:') || '0'),
        ranking: parseInt(prompt('Enter ranking:') || '0'),
        programs: [],
        entryTest: prompt('Enter entry test:') || '',
        website: prompt('Enter website:') || '',
      };
      const updated = [...universities, newUni];
      setUniversities(updated);
      localStorage.setItem('universities', JSON.stringify(updated));
    }
  };

  const handleAddProgram = (uniId) => {
    const program = prompt('Enter program name:');
    if (program) {
      const updated = universities.map((uni) =>
        uni.id === uniId
          ? { ...uni, programs: [...uni.programs, program] }
          : uni
      );
      setUniversities(updated);
      localStorage.setItem('universities', JSON.stringify(updated));
    }
  };

  const handleEditQuestionnaire = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setEditingQuestionnaire({ ...questionnaire });
    setIsEditModalOpen(true);
  };

  const handleAddQuestionnaire = () => {
    setEditingQuestionnaire({
      sscPercentage: '',
      hsscPercentage: '',
      preferredDegree: '',
      preferredUniversityType: '',
      preferredCities: [],
      budgetPerSemester: '',
      scholarshipPreference: '',
      academicInterests: [],
      careerPreference: '',
      willingToRelocate: '',
      extraCurricularInterests: [],
      userEmail: '',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveQuestionnaire = () => {
    if (!editingQuestionnaire) return;

    const updated = [...questionnaires];
    if (selectedQuestionnaire) {
      // Edit existing
      const index = updated.findIndex((q, idx) => 
        q.userEmail === selectedQuestionnaire.userEmail && 
        q.completedAt === selectedQuestionnaire.completedAt
      );
      if (index !== -1) {
        updated[index] = { ...editingQuestionnaire, completedAt: selectedQuestionnaire.completedAt || new Date().toISOString() };
      }
    } else {
      // Add new
      updated.push({
        ...editingQuestionnaire,
        completedAt: new Date().toISOString(),
      });
    }

    setQuestionnaires(updated);
    localStorage.setItem('questionnaires', JSON.stringify(updated));
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedQuestionnaire(null);
    setEditingQuestionnaire(null);
  };

  const handleDeleteQuestionnaire = (questionnaire) => {
    if (confirm('Are you sure you want to delete this questionnaire?')) {
      const updated = questionnaires.filter((q, idx) => 
        !(q.userEmail === questionnaire.userEmail && 
          q.completedAt === questionnaire.completedAt)
      );
      setQuestionnaires(updated);
      localStorage.setItem('questionnaires', JSON.stringify(updated));
    }
  };

  const handleFieldChange = (field, value) => {
    setEditingQuestionnaire({
      ...editingQuestionnaire,
      [field]: value,
    });
  };

  const handleArrayFieldChange = (field, value, isChecked) => {
    const currentArray = editingQuestionnaire[field] || [];
    const updated = isChecked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    handleFieldChange(field, updated);
  };

  // Question Management Functions
  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      step: questionnaireQuestions.length + 1,
      question: '',
      type: 'text',
      field: '',
      required: true,
      options: [],
    };
    setEditingQuestion(newQuestion);
    setSelectedQuestionIndex(null);
    setIsQuestionModalOpen(true);
  };

  const handleEditQuestion = (question, index) => {
    setEditingQuestion({ ...question });
    setSelectedQuestionIndex(index);
    setIsQuestionModalOpen(true);
  };

  const handleDeleteQuestion = (index) => {
    if (confirm('Are you sure you want to delete this question?')) {
      const updated = questionnaireQuestions.filter((_, i) => i !== index);
      // Reorder steps
      const reordered = updated.map((q, i) => ({ ...q, step: i + 1 }));
      setQuestionnaireQuestions(reordered);
      localStorage.setItem('questionnaireQuestions', JSON.stringify(reordered));
    }
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion || !editingQuestion.question || !editingQuestion.field) {
      alert('Please fill in question text and field name');
      return;
    }

    const updated = [...questionnaireQuestions];
    if (selectedQuestionIndex !== null) {
      // Edit existing
      updated[selectedQuestionIndex] = editingQuestion;
    } else {
      // Add new
      updated.push({ ...editingQuestion, step: updated.length + 1 });
    }

    setQuestionnaireQuestions(updated);
    localStorage.setItem('questionnaireQuestions', JSON.stringify(updated));
    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
    setSelectedQuestionIndex(null);
  };

  const handleQuestionFieldChange = (field, value) => {
    setEditingQuestion({
      ...editingQuestion,
      [field]: value,
    });
  };

  const handleQuestionOptionChange = (index, value) => {
    const options = [...(editingQuestion.options || [])];
    options[index] = value;
    setEditingQuestion({
      ...editingQuestion,
      options,
    });
  };

  const handleAddOption = () => {
    const options = [...(editingQuestion.options || []), ''];
    setEditingQuestion({
      ...editingQuestion,
      options,
    });
  };

  const handleRemoveOption = (index) => {
    const options = editingQuestion.options.filter((_, i) => i !== index);
    setEditingQuestion({
      ...editingQuestion,
      options,
    });
  };

  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700">
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/80 mb-4">Manage students, universities, and view analytics</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-white/70 text-sm mb-1">Total Students</div>
              <div className="text-3xl font-bold text-white">{students.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-white/70 text-sm mb-1">Total Universities</div>
              <div className="text-3xl font-bold text-white">{universities.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-white/70 text-sm mb-1">Questionnaires</div>
              <div className="text-3xl font-bold text-white">{questionnaires.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-white/70 text-sm mb-1">Completion Rate</div>
              <div className="text-3xl font-bold text-white">
                {students.length > 0 ? ((questionnaires.length / students.length) * 100).toFixed(0) : 0}%
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'stats'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Statistics & Charts
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'students'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Students ({students.length})
            </button>
            <button
              onClick={() => setActiveTab('universities')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'universities'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Universities ({universities.length})
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'questions'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Manage Questions ({questionnaireQuestions.length})
            </button>
          </div>

          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-slideIn">
              {/* Key Metrics Cards - Single Row of 4 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <InfoCard
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                  title="Total Students"
                  value={students.length}
                  subtitle="Registered users"
                  gradient="blue"
                  delay={0}
                />
                <InfoCard
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                  title="Universities"
                  value={universities.length}
                  subtitle="In database"
                  gradient="green"
                  delay={0.2}
                />
                <InfoCard
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                  title="Avg Scores"
                  value={`${stats.avgSSC.toFixed(0)}% / ${stats.avgHSSC.toFixed(0)}%`}
                  subtitle="SSC / HSSC"
                  gradient="yellow"
                  delay={0.3}
                />
                <InfoCard
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                  title="Average Age"
                  value={`${stats.avgAge} years`}
                  subtitle="Student demographics"
                  gradient="purple"
                  delay={0.4}
                />
              </div>

              {/* Pie Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatedPieChart data={stats.genderStats} title="Gender Distribution" size={220} />
                <AnimatedPieChart data={stats.ageStats} title="Age Distribution" size={220} />
                <AnimatedPieChart data={stats.universityTypeStats} title="Preferred University Type" size={220} />
              </div>

              {/* Additional Pie Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatedPieChart data={stats.relocateStats} title="Willingness to Relocate" size={220} />
                <AnimatedPieChart data={stats.scholarshipStats} title="Scholarship Preferences" size={220} />
                <AnimatedPieChart data={stats.universityTypeDistribution} title="University Type Distribution" size={220} />
              </div>

              {/* Top Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedBarChart
                  data={Object.fromEntries(
                    Object.entries(stats.degreeStats)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 8)
                  )}
                  title="Top Preferred Degrees"
                  color="blue"
                />
                <AnimatedBarChart
                  data={Object.fromEntries(
                    Object.entries(stats.careerStats)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 8)
                  )}
                  title="Career Preferences"
                  color="purple"
                />
              </div>

              {/* City and Scholarship Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedBarChart
                  data={Object.fromEntries(
                    Object.entries(stats.cityStats)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 8)
                  )}
                  title="Preferred Cities"
                  color="green"
                />
                <AnimatedBarChart
                  data={stats.scholarshipStats}
                  title="Scholarship Preferences"
                  color="yellow"
                />
              </div>

              {/* Academic Interests */}
              <AnimatedBarChart
                data={Object.fromEntries(
                  Object.entries(stats.academicInterestsStats)
                    .sort(([, a], [, b]) => b - a)
                )}
                title="Academic Interests"
                color="red"
              />

              {/* Fee Distribution */}
              <AnimatedBarChart
                data={stats.feeRanges}
                title="University Fee Range Distribution"
                color="green"
              />

              {/* Additional Insights */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Key Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm mb-2">Most Popular Degree</p>
                    <p className="text-white font-bold text-lg">
                      {Object.entries(stats.degreeStats).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm mb-2">Most Preferred City</p>
                    <p className="text-white font-bold text-lg">
                      {Object.entries(stats.cityStats).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm mb-2">Top Career Choice</p>
                    <p className="text-white font-bold text-lg">
                      {Object.entries(stats.careerStats).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-white/80 text-sm mb-2">Most Common Scholarship Need</p>
                    <p className="text-white font-bold text-lg">
                      {Object.entries(stats.scholarshipStats).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">All Students</h2>
                <div className="text-white/80">
                  Total: {students.length} students
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="pb-3 text-white font-semibold">Name</th>
                      <th className="pb-3 text-white font-semibold">Email</th>
                      <th className="pb-3 text-white font-semibold">Phone</th>
                      <th className="pb-3 text-white font-semibold">Gender</th>
                      <th className="pb-3 text-white font-semibold">Age</th>
                      <th className="pb-3 text-white font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => {
                      let age = 'N/A';
                      if (student.dob) {
                        const birthDate = new Date(student.dob);
                        const today = new Date();
                        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff = today.getMonth() - birthDate.getMonth();
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                          calculatedAge--;
                        }
                        age = calculatedAge;
                      }
                      return (
                        <tr key={index} className="border-b border-white/10">
                          <td className="py-3 text-white/90">{student.name}</td>
                          <td className="py-3 text-white/90">{student.email}</td>
                          <td className="py-3 text-white/90">{student.phone || 'N/A'}</td>
                          <td className="py-3 text-white/90">{student.gender || 'N/A'}</td>
                          <td className="py-3 text-white/90">{age}</td>
                          <td className="py-3">
                            <button
                              onClick={() => handleDeleteStudent(student.email)}
                              className="px-3 py-1 bg-red-500/80 hover:bg-red-600 text-white rounded text-sm transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {students.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-white/60">
                          No students registered yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Universities Tab */}
          {activeTab === 'universities' && (
            <div className="space-y-6 animate-slideIn">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Universities & Programs</h2>
                  <button
                    onClick={handleAddUniversity}
                    className="px-4 py-2 bg-green-500/80 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    + Add University
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {universities.map((uni) => (
                    <div
                      key={uni.id}
                      className="bg-white/5 rounded-lg p-6 border border-white/10"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{uni.name}</h3>
                          <p className="text-white/70 text-sm mb-2">{uni.location}</p>
                          <div className="flex gap-2 mb-2">
                            <span className="inline-block px-2 py-1 bg-blue-500/30 text-blue-200 rounded text-xs">
                              {uni.type}
                            </span>
                            <span className="inline-block px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">
                              Rank #{uni.ranking}
                            </span>
                            <span className="inline-block px-2 py-1 bg-green-500/30 text-green-200 rounded text-xs">
                              PKR {uni.tuitionFee?.toLocaleString()}/year
                            </span>
                          </div>
                          {uni.entryTest && (
                            <p className="text-white/60 text-xs mb-2">Entry Test: {uni.entryTest}</p>
                          )}
                          {uni.website && (
                            <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 text-xs hover:underline">
                              Visit Website
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddProgram(uni.id)}
                          className="px-3 py-1 bg-blue-500/80 hover:bg-blue-600 text-white rounded text-sm transition-colors ml-2"
                        >
                          + Program
                        </button>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Programs ({uni.programs.length}):</h4>
                        <div className="flex flex-wrap gap-2">
                          {uni.programs.map((program, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-white/10 text-white/90 rounded text-sm"
                            >
                              {program}
                            </span>
                          ))}
                          {uni.programs.length === 0 && (
                            <span className="text-white/50 text-sm">No programs added</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Questions Management Tab */}
          {activeTab === 'questions' && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Questionnaire Questions</h2>
                <button
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-green-500/80 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  + Add Question
                </button>
              </div>
              <div className="space-y-4">
                {questionnaireQuestions.length > 0 ? (
                  questionnaireQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className="bg-white/5 rounded-lg p-6 border border-white/10"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded text-sm font-semibold">
                              Step {q.step}
                            </span>
                            <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded text-sm">
                              {q.type}
                            </span>
                            {q.required && (
                              <span className="px-3 py-1 bg-red-500/30 text-red-200 rounded text-sm">
                                Required
                              </span>
                            )}
                          </div>
                          <h3 className="text-white font-semibold text-lg mb-2">{q.question}</h3>
                          <p className="text-white/70 text-sm mb-2">
                            <strong>Field:</strong> {q.field}
                          </p>
                          {q.options && q.options.length > 0 && (
                            <div className="mt-2">
                              <p className="text-white/70 text-sm mb-1"><strong>Options:</strong></p>
                              <div className="flex flex-wrap gap-2">
                                {q.options.map((opt, optIdx) => (
                                  <span
                                    key={optIdx}
                                    className="px-2 py-1 bg-white/10 text-white/90 rounded text-xs"
                                  >
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {q.placeholder && (
                            <p className="text-white/60 text-xs mt-2">
                              Placeholder: {q.placeholder}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditQuestion(q, index)}
                            className="px-3 py-1 bg-blue-500/80 hover:bg-blue-600 text-white rounded text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(index)}
                            className="px-3 py-1 bg-red-500/80 hover:bg-red-600 text-white rounded text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-white/60">
                    No questions added yet. Click "Add Question" to get started.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Edit/Add Questionnaire Modal */}
          {(isEditModalOpen || isAddModalOpen) && editingQuestionnaire && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {isAddModalOpen ? 'Add New Questionnaire' : 'Edit Questionnaire'}
                    </h2>
                    <button
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setIsAddModalOpen(false);
                        setSelectedQuestionnaire(null);
                        setEditingQuestionnaire(null);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">User Email</label>
                      <input
                        type="email"
                        value={editingQuestionnaire.userEmail || ''}
                        onChange={(e) => handleFieldChange('userEmail', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="user@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">SSC Percentage</label>
                      <input
                        type="number"
                        value={editingQuestionnaire.sscPercentage || ''}
                        onChange={(e) => handleFieldChange('sscPercentage', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">HSSC Percentage</label>
                      <input
                        type="number"
                        value={editingQuestionnaire.hsscPercentage || ''}
                        onChange={(e) => handleFieldChange('hsscPercentage', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="80"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Preferred Degree</label>
                      <input
                        type="text"
                        value={editingQuestionnaire.preferredDegree || ''}
                        onChange={(e) => handleFieldChange('preferredDegree', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="BSc Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">University Type</label>
                      <select
                        value={editingQuestionnaire.preferredUniversityType || ''}
                        onChange={(e) => handleFieldChange('preferredUniversityType', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Type</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Budget per Semester</label>
                      <input
                        type="text"
                        value={editingQuestionnaire.budgetPerSemester || ''}
                        onChange={(e) => handleFieldChange('budgetPerSemester', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="PKR 50,000 - 100,000/semester"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Scholarship Preference</label>
                      <input
                        type="text"
                        value={editingQuestionnaire.scholarshipPreference || ''}
                        onChange={(e) => handleFieldChange('scholarshipPreference', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Merit-based scholarship"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Career Preference</label>
                      <input
                        type="text"
                        value={editingQuestionnaire.careerPreference || ''}
                        onChange={(e) => handleFieldChange('careerPreference', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Software Development"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Willing to Relocate</label>
                      <select
                        value={editingQuestionnaire.willingToRelocate || ''}
                        onChange={(e) => handleFieldChange('willingToRelocate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Maybe">Maybe</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Preferred Cities (comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingQuestionnaire.preferredCities) ? editingQuestionnaire.preferredCities.join(', ') : ''}
                      onChange={(e) => handleFieldChange('preferredCities', e.target.value.split(',').map(c => c.trim()).filter(c => c))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Karachi, Lahore, Islamabad"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Academic Interests (comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingQuestionnaire.academicInterests) ? editingQuestionnaire.academicInterests.join(', ') : ''}
                      onChange={(e) => handleFieldChange('academicInterests', e.target.value.split(',').map(c => c.trim()).filter(c => c))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Research, Practical Skills, Industry Collaboration"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Extra-Curricular Interests (comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingQuestionnaire.extraCurricularInterests) ? editingQuestionnaire.extraCurricularInterests.join(', ') : ''}
                      onChange={(e) => handleFieldChange('extraCurricularInterests', e.target.value.split(',').map(c => c.trim()).filter(c => c))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Sports, Debate, Music, Volunteer Work"
                    />
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setIsAddModalOpen(false);
                      setSelectedQuestionnaire(null);
                      setEditingQuestionnaire(null);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveQuestionnaire}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                  >
                    {isAddModalOpen ? 'Add Questionnaire' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Question Edit/Add Modal */}
          {isQuestionModalOpen && editingQuestion && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedQuestionIndex !== null ? 'Edit Question' : 'Add New Question'}
                    </h2>
                    <button
                      onClick={() => {
                        setIsQuestionModalOpen(false);
                        setEditingQuestion(null);
                        setSelectedQuestionIndex(null);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Question Text *</label>
                    <input
                      type="text"
                      value={editingQuestion.question || ''}
                      onChange={(e) => handleQuestionFieldChange('question', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter question text"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Field Name *</label>
                      <input
                        type="text"
                        value={editingQuestion.field || ''}
                        onChange={(e) => handleQuestionFieldChange('field', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., sscPercentage"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Question Type *</label>
                      <select
                        value={editingQuestion.type || 'text'}
                        onChange={(e) => handleQuestionFieldChange('type', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="select">Select (Dropdown)</option>
                        <option value="radio">Radio Buttons</option>
                        <option value="checkbox">Checkboxes</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Step Number</label>
                      <input
                        type="number"
                        value={editingQuestion.step || ''}
                        onChange={(e) => handleQuestionFieldChange('step', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingQuestion.required || false}
                          onChange={(e) => handleQuestionFieldChange('required', e.target.checked)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Required</span>
                      </label>
                    </div>
                  </div>

                  {(editingQuestion.type === 'number') && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Min Value</label>
                        <input
                          type="number"
                          value={editingQuestion.min || ''}
                          onChange={(e) => handleQuestionFieldChange('min', e.target.value ? parseInt(e.target.value) : '')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Max Value</label>
                        <input
                          type="number"
                          value={editingQuestion.max || ''}
                          onChange={(e) => handleQuestionFieldChange('max', e.target.value ? parseInt(e.target.value) : '')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {(editingQuestion.type === 'text' || editingQuestion.type === 'number') && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Placeholder</label>
                      <input
                        type="text"
                        value={editingQuestion.placeholder || ''}
                        onChange={(e) => handleQuestionFieldChange('placeholder', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter placeholder text"
                      />
                    </div>
                  )}

                  {(editingQuestion.type === 'select' || editingQuestion.type === 'radio' || editingQuestion.type === 'checkbox') && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 font-medium">Options *</label>
                        <button
                          type="button"
                          onClick={handleAddOption}
                          className="px-3 py-1 bg-green-500/80 hover:bg-green-600 text-white rounded text-sm transition-colors"
                        >
                          + Add Option
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(editingQuestion.options || []).map((option, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleQuestionOptionChange(index, e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Option ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(index)}
                              className="px-3 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        {(!editingQuestion.options || editingQuestion.options.length === 0) && (
                          <p className="text-gray-500 text-sm">No options added. Click "Add Option" to add options.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsQuestionModalOpen(false);
                      setEditingQuestion(null);
                      setSelectedQuestionIndex(null);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveQuestion}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                  >
                    {selectedQuestionIndex !== null ? 'Save Changes' : 'Add Question'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(-90deg);
          }
          to {
            transform: rotate(270deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
