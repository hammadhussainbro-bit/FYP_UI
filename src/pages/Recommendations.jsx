import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecommendationCard from '../components/RecommendationCard';
import BackupCard from '../components/BackupCard';
import AlternativeProgramCard from '../components/AlternativeProgramCard';
import UniversityComparison from '../components/UniversityComparison';
import { useFormContext } from '../context/FormContext';
import { useTheme } from '../context/ThemeContext';
import { saveRecommendationHistory, updateProgress } from '../utils/storage';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock data for recommendations - moved outside component for stability
const topUniversities = [
  {
    name: 'NUST - National University of Sciences and Technology',
    location: 'Islamabad',
    program: 'BS Computer Science',
    matchScore: 95,
    rank: 'Rank #1',
    tuitionFee: 'PKR 150,000/year',
    entryTestRequired: 'Yes (NET)',
    highlights: [
      'Top-ranked university in Pakistan',
      'Excellent industry connections',
      'Strong research programs',
      'Modern campus facilities',
    ],
  },
  {
    name: 'LUMS - Lahore University of Management Sciences',
    location: 'Lahore',
    program: 'BS Computer Science',
    matchScore: 92,
    rank: 'Rank #2',
    tuitionFee: 'PKR 800,000/year',
    entryTestRequired: 'Yes (LCAT)',
    highlights: [
      'Premier business and tech university',
      'International faculty',
      'Strong alumni network',
      'Excellent placement opportunities',
    ],
  },
  {
    name: 'FAST - National University of Computer and Emerging Sciences',
    location: 'Karachi',
    program: 'BS Computer Science',
    matchScore: 90,
    rank: 'Rank #3',
    tuitionFee: 'PKR 200,000/year',
    entryTestRequired: 'Yes (NTS)',
    highlights: [
      'Specialized in computer sciences',
      'Industry-focused curriculum',
      'Strong programming culture',
      'High job placement rate',
    ],
  },
];

const backupUniversities = [
  {
    name: 'UET - University of Engineering and Technology',
    location: 'Lahore',
    program: 'BS Computer Engineering',
    matchScore: 85,
    rank: 'Rank #5',
    tuitionFee: 'PKR 80,000/year',
    entryTestRequired: 'Yes (ECAT)',
  },
  {
    name: 'KU - University of Karachi',
    location: 'Karachi',
    program: 'BS Computer Science',
    matchScore: 82,
    rank: 'Rank #8',
    tuitionFee: 'PKR 50,000/year',
    entryTestRequired: 'Yes (KU Entry Test)',
  },
  {
    name: 'GIKI - Ghulam Ishaq Khan Institute',
    location: 'Topi, KPK',
    program: 'BS Computer Science',
    matchScore: 88,
    rank: 'Rank #4',
    tuitionFee: 'PKR 300,000/year',
    entryTestRequired: 'Yes (GIKI Test)',
  },
];

const alternativePrograms = [
  {
    programName: 'BS Software Engineering',
    university: 'COMSATS University',
    description: 'Focus on software development lifecycle, project management, and modern development practices.',
    duration: '4 Years',
    tuitionFee: 'PKR 120,000/year',
    careerPath: 'Software Engineer, DevOps',
    skills: ['Java', 'Python', 'Agile', 'DevOps', 'Database Design'],
  },
  {
    programName: 'BS Data Science',
    university: 'IBA Karachi',
    description: 'Combine statistics, programming, and domain expertise to extract insights from data.',
    duration: '4 Years',
    tuitionFee: 'PKR 400,000/year',
    careerPath: 'Data Scientist, Analyst',
    skills: ['Python', 'R', 'Machine Learning', 'Statistics', 'SQL'],
  },
  {
    programName: 'BS Information Technology',
    university: 'SZABIST',
    description: 'Focus on IT infrastructure, networking, and system administration.',
    duration: '4 Years',
    tuitionFee: 'PKR 180,000/year',
    careerPath: 'IT Manager, Network Admin',
    skills: ['Networking', 'System Admin', 'Cloud Computing', 'Security'],
  },
];

const Recommendations = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { resetFormData } = useFormContext();
  const [comparisonUnis, setComparisonUnis] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('matchScore');
  const [error, setError] = useState(null);

  // Filter and sort functions - using useMemo to avoid recreation
  const filteredTop = useMemo(() => {
    try {
      if (!topUniversities || !Array.isArray(topUniversities)) return [];
      
      let filtered = topUniversities.filter(uni => {
        if (!uni) return false;
        const matchesSearch = !searchTerm || 
          (uni.name && uni.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (uni.location && uni.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (uni.program && uni.program.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (filterType === 'all') return matchesSearch;
        if (filterType === 'top') return matchesSearch && (uni.matchScore || 0) >= 90;
        if (filterType === 'backup') return matchesSearch && (uni.matchScore || 0) < 90;
        return matchesSearch;
      });

      // Sort
      filtered.sort((a, b) => {
        if (sortBy === 'matchScore') return (b.matchScore || 0) - (a.matchScore || 0);
        if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
        if (sortBy === 'fee') {
          const getFee = (str) => {
            if (!str) return 0;
            const match = str.match(/(\d[\d,]*)/);
            return match ? parseInt(match[1].replace(/,/g, '')) : 0;
          };
          return getFee(a.tuitionFee) - getFee(b.tuitionFee);
        }
        return 0;
      });

      return filtered;
    } catch (error) {
      console.error('Error filtering top universities:', error);
      return topUniversities || [];
    }
  }, [searchTerm, filterType, sortBy]);

  const filteredBackup = useMemo(() => {
    try {
      if (!backupUniversities || !Array.isArray(backupUniversities)) return [];
      
      let filtered = backupUniversities.filter(uni => {
        if (!uni) return false;
        const matchesSearch = !searchTerm || 
          (uni.name && uni.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (uni.location && uni.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (uni.program && uni.program.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (filterType === 'all') return matchesSearch;
        if (filterType === 'top') return matchesSearch && (uni.matchScore || 0) >= 90;
        if (filterType === 'backup') return matchesSearch && (uni.matchScore || 0) < 90;
        return matchesSearch;
      });

      // Sort
      filtered.sort((a, b) => {
        if (sortBy === 'matchScore') return (b.matchScore || 0) - (a.matchScore || 0);
        if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
        if (sortBy === 'fee') {
          const getFee = (str) => {
            if (!str) return 0;
            const match = str.match(/(\d[\d,]*)/);
            return match ? parseInt(match[1].replace(/,/g, '')) : 0;
          };
          return getFee(a.tuitionFee) - getFee(b.tuitionFee);
        }
        return 0;
      });

      return filtered;
    } catch (error) {
      console.error('Error filtering backup universities:', error);
      return backupUniversities || [];
    }
  }, [searchTerm, filterType, sortBy]);

  const handleCompare = (university) => {
    if (comparisonUnis.length < 3) {
      if (!comparisonUnis.find(u => u.name === university.name)) {
        setComparisonUnis([...comparisonUnis, university]);
        setShowComparison(true);
      }
    }
  };

  // Save recommendation history on mount
  useEffect(() => {
    try {
      const allRecommendations = {
        top: topUniversities,
        backup: backupUniversities,
        alternative: alternativePrograms,
      };
      saveRecommendationHistory(allRecommendations);
      updateProgress('recommendations_viewed');
    } catch (err) {
      console.error('Error saving recommendation history:', err);
      setError(err.message);
    }
  }, []);

  const handleDownload = () => {
    try {
      const doc = new jsPDF();

      // Header branding
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, 210, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('MeritVoyage - University Recommendations Report', 10, 16);

      // Student info from real data sources
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);

      // Retrieve current user email and name
      const userEmail = localStorage.getItem('userEmail') || '';
      const userName = localStorage.getItem('userName') || '';

      // Retrieve user profile from users array
      let user = null;
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        user = users.find(u => u.email === userEmail) || null;
      } catch (e) {
        user = null;
      }

      // Retrieve latest questionnaire entry for current user
      let latestQuestionnaire = null;
      try {
        const qArr = JSON.parse(localStorage.getItem('questionnaires') || '[]');
        const userQuestionnaires = qArr.filter(q => q.userEmail === userEmail);
        if (userQuestionnaires.length > 0) {
          latestQuestionnaire = userQuestionnaires[userQuestionnaires.length - 1];
        }
      } catch (e) {
        latestQuestionnaire = null;
      }

      // Build student data object
      const student = {
        name: userName || user?.name || 'Not Provided',
        email: userEmail || user?.email || 'Not Provided',
        phone: user?.phone || 'Not Provided',
        gender: user?.gender || 'Not Provided',
        dob: user?.dob || 'Not Provided',
        sscPercentage: latestQuestionnaire?.sscPercentage || 'Not Provided',
        hsscPercentage: latestQuestionnaire?.hsscPercentage || 'Not Provided',
        preferredDegree: latestQuestionnaire?.preferredDegree || 'Not Provided',
        preferredUniversityType: latestQuestionnaire?.preferredUniversityType || 'Not Provided',
        preferredCities: Array.isArray(latestQuestionnaire?.preferredCities) 
          ? latestQuestionnaire.preferredCities.join(', ') 
          : 'Not Provided',
        budgetPerSemester: latestQuestionnaire?.budgetPerSemester || 'Not Provided',
        scholarshipPreference: latestQuestionnaire?.scholarshipPreference || 'Not Provided',
        academicInterests: Array.isArray(latestQuestionnaire?.academicInterests)
          ? latestQuestionnaire.academicInterests.join(', ')
          : 'Not Provided',
        careerPreference: latestQuestionnaire?.careerPreference || 'Not Provided',
        willingToRelocate: latestQuestionnaire?.willingToRelocate || 'Not Provided',
        extraCurricularInterests: Array.isArray(latestQuestionnaire?.extraCurricularInterests)
          ? latestQuestionnaire.extraCurricularInterests.join(', ')
          : 'Not Provided',
        completedAt: latestQuestionnaire?.completedAt 
          ? new Date(latestQuestionnaire.completedAt).toLocaleDateString() 
          : 'Not Available',
      };

      let y = 35;
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Student Information', 10, y);
      y += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Name: ${student.name}`, 10, y); y += 6;
      doc.text(`Email: ${student.email}`, 10, y); y += 6;
      if (student.phone && student.phone !== 'Not Provided') {
        doc.text(`Phone: ${student.phone}`, 10, y); y += 6;
      }
      if (student.gender && student.gender !== 'Not Provided') {
        doc.text(`Gender: ${student.gender}`, 10, y); y += 6;
      }
      if (student.dob && student.dob !== 'Not Provided') {
        doc.text(`Date of Birth: ${student.dob}`, 10, y); y += 6;
      }
      y += 4;

      // Questionnaire Responses Section
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Questionnaire Responses', 10, y);
      y += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`SSC Percentage: ${student.sscPercentage}%`, 10, y); y += 6;
      doc.text(`HSSC Percentage: ${student.hsscPercentage}%`, 10, y); y += 6;
      doc.text(`Preferred Degree: ${student.preferredDegree}`, 10, y); y += 6;
      doc.text(`Preferred University Type: ${student.preferredUniversityType}`, 10, y); y += 6;
      doc.text(`Preferred Cities: ${student.preferredCities}`, 10, y); y += 6;
      doc.text(`Budget per Semester: ${student.budgetPerSemester}`, 10, y); y += 6;
      doc.text(`Scholarship Preference: ${student.scholarshipPreference}`, 10, y); y += 6;
      doc.text(`Academic Interests: ${student.academicInterests}`, 10, y); y += 6;
      doc.text(`Career Preference: ${student.careerPreference}`, 10, y); y += 6;
      doc.text(`Willing to Relocate: ${student.willingToRelocate}`, 10, y); y += 6;
      doc.text(`Extra-Curricular Interests: ${student.extraCurricularInterests}`, 10, y); y += 6;
      doc.text(`Questionnaire Completed: ${student.completedAt}`, 10, y); y += 8;

      // Top recommendations table
      doc.setFontSize(13);
      doc.text('Top Recommendations', 10, y);
      y += 4;
      autoTable(doc, {
        startY: y,
        head: [['University', 'Location', 'Program', 'Match %', 'Rank', 'Tuition', 'Entry Test']],
        body: topUniversities.map(u => [
          u.name,
          u.location,
          u.program,
          `${u.matchScore}%`,
          u.rank,
          u.tuitionFee,
          u.entryTestRequired,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [37, 99, 235] },
        columnStyles: { 0: { cellWidth: 55 } },
        margin: { left: 10, right: 10 },
      });

      y = (doc.lastAutoTable.finalY || y) + 10;

      // Backup options table
      doc.text('Backup Options', 10, y);
      y += 4;
      autoTable(doc, {
        startY: y,
        head: [['University', 'Location', 'Program', 'Match %', 'Rank', 'Tuition', 'Entry Test']],
        body: backupUniversities.map(u => [
          u.name,
          u.location,
          u.program,
          `${u.matchScore}%`,
          u.rank,
          u.tuitionFee,
          u.entryTestRequired,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [99, 102, 241] },
        columnStyles: { 0: { cellWidth: 55 } },
        margin: { left: 10, right: 10 },
      });

      y = (doc.lastAutoTable.finalY || y) + 10;

      // Alternative programs
      doc.text('Alternative Programs', 10, y);
      y += 4;
      autoTable(doc, {
        startY: y,
        head: [['Program', 'University', 'Duration', 'Tuition', 'Career Path', 'Key Skills']],
        body: alternativePrograms.map(p => [
          p.programName,
          p.university,
          p.duration,
          p.tuitionFee,
          p.careerPath,
          p.skills.join(', '),
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [147, 51, 234] },
        columnStyles: { 0: { cellWidth: 40 }, 5: { cellWidth: 60 } },
        margin: { left: 10, right: 10 },
      });

      // Footer branding
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFontSize(9);
      doc.setTextColor(120);
      const generatedDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      doc.text(`Generated by MeritVoyage on ${generatedDate}`, 10, pageHeight - 10);
      doc.text(`Report for: ${student.name} (${student.email})`, 10, pageHeight - 5);

      // Generate filename with student name
      const filename = `MeritVoyage_Recommendations_${student.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Safety check for contexts - after all hooks
  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading theme...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex flex-col ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
      }`}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg">
            <p className="font-semibold">Error loading recommendations</p>
            <p className="text-sm mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden w-full ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Your University Recommendations
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg">
              Based on your profile and preferences
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between w-full">
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 w-full sm:max-w-md px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-base min-h-[44px] ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-200 border border-gray-700'
                  : 'bg-white/90 text-gray-800 border border-white/30'
              }`}
            />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base min-h-[44px] ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 border border-gray-700'
                    : 'bg-white/90 text-gray-800 border border-white/30'
                }`}
              >
                <option value="all">All</option>
                <option value="top">Top Matches</option>
                <option value="backup">Backup Options</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base min-h-[44px] ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 border border-gray-700'
                    : 'bg-white/90 text-gray-800 border border-white/30'
                }`}
              >
                <option value="matchScore">Sort by Match</option>
                <option value="name">Sort by Name</option>
                <option value="fee">Sort by Fee</option>
              </select>
            </div>
          </div>

          {/* Top Universities Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center px-2">
              <span className="w-1 h-6 sm:h-8 bg-yellow-400 mr-2 sm:mr-3 rounded"></span>
              Top Recommendations
            </h2>
            {filteredTop.length === 0 ? (
              <p className={`text-center py-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-white/80'
              }`}>No universities match your search criteria</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTop.map((university, index) => (
                  <RecommendationCard key={index} university={university} onCompare={handleCompare} />
                ))}
              </div>
            )}
          </section>

          {/* Backup Universities Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center px-2">
              <span className="w-1 h-6 sm:h-8 bg-purple-400 mr-2 sm:mr-3 rounded"></span>
              Backup Options
            </h2>
            {filteredBackup.length === 0 ? (
              <p className={`text-center py-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-white/80'
              }`}>No backup options match your search criteria</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBackup.map((university, index) => (
                  <BackupCard key={index} university={university} onCompare={handleCompare} />
                ))}
              </div>
            )}
          </section>

          {/* Alternative Programs Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center px-2">
              <span className="w-1 h-6 sm:h-8 bg-amber-400 mr-2 sm:mr-3 rounded"></span>
              Alternative Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alternativePrograms.map((program, index) => (
                <AlternativeProgramCard key={index} program={program} />
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-stretch sm:items-center mt-8 sm:mt-12 px-2 sm:px-4">
            <button onClick={handleDownload} className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 bg-gradient-to-r from-white via-gray-50 to-white text-blue-600 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-xl hover:shadow-2xl touch-manipulation min-h-[52px] flex items-center justify-center overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5" style={{ boxShadow: '0 10px 40px rgba(255, 255, 255, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)' }}>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="relative z-10 flex items-center gap-2">
                Download Report
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </button>
            <button 
              onClick={() => {
                if (resetFormData) {
                  resetFormData();
                }
                navigate('/questionnaire');
              }}
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 bg-white/5 backdrop-blur-md text-white border-2 border-white/30 rounded-2xl font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 touch-manipulation min-h-[52px] flex items-center justify-center overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5" style={{ boxShadow: '0 8px 30px rgba(255, 255, 255, 0.1), 0 0 15px rgba(255, 255, 255, 0.1)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Retake Questionnaire</span>
            </button>
            {comparisonUnis.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white rounded-2xl font-semibold text-sm sm:text-base hover:from-purple-600 hover:via-pink-600 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl touch-manipulation min-h-[52px] flex items-center justify-center overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5" style={{ boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4), 0 0 20px rgba(236, 72, 153, 0.3)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Compare ({comparisonUnis.length})
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showComparison && (
        <UniversityComparison
          universities={comparisonUnis}
          onClose={() => {
            setShowComparison(false);
            setComparisonUnis([]);
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Recommendations;
