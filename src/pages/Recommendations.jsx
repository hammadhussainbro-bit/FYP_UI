import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecommendationCard from '../components/RecommendationCard';
import BackupCard from '../components/BackupCard';
import AlternativeProgramCard from '../components/AlternativeProgramCard';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Recommendations = () => {
  // Mock data for recommendations
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
      description:
        'Focus on software development lifecycle, project management, and modern development practices.',
      duration: '4 Years',
      tuitionFee: 'PKR 120,000/year',
      careerPath: 'Software Engineer, DevOps',
      skills: ['Java', 'Python', 'Agile', 'DevOps', 'Database Design'],
    },
    {
      programName: 'BS Data Science',
      university: 'IBA Karachi',
      description:
        'Combine statistics, programming, and domain expertise to extract insights from data.',
      duration: '4 Years',
      tuitionFee: 'PKR 400,000/year',
      careerPath: 'Data Scientist, Analyst',
      skills: ['Python', 'R', 'Machine Learning', 'Statistics', 'SQL'],
    },
    {
      programName: 'BS Information Technology',
      university: 'SZABIST',
      description:
        'Focus on IT infrastructure, networking, and system administration.',
      duration: '4 Years',
      tuitionFee: 'PKR 180,000/year',
      careerPath: 'IT Manager, Network Admin',
      skills: ['Networking', 'System Admin', 'Cloud Computing', 'Security'],
    },
  ];

  const handleDownload = () => {
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

    // Retrieve user profile
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user')) || null;
    } catch (e) {
      user = null;
    }

    // Retrieve latest questionnaire entry
    let latestQuestionnaire = null;
    try {
      const qArr = JSON.parse(localStorage.getItem('questionnaires'));
      if (Array.isArray(qArr) && qArr.length > 0) {
        latestQuestionnaire = qArr[qArr.length - 1];
      }
    } catch (e) {
      latestQuestionnaire = null;
    }

    const student = {
      name: user?.name || user?.fullName || user?.username || '—',
      email: user?.email || '—',
      programInterest: latestQuestionnaire?.selectedDegree || latestQuestionnaire?.programInterest || '—',
      locationPreference: latestQuestionnaire?.preferredLocation || latestQuestionnaire?.locationPreference || '—',
      selectedUniversity: latestQuestionnaire?.selectedUniversity || '—',
      createdBy: 'MeritVoyage',
      date: new Date().toLocaleDateString(),
    };

    let y = 35;
    doc.text('Student Details', 10, y);
    y += 6;
    doc.text(`Name: ${student.name}`, 10, y); y += 6;
    doc.text(`Email: ${student.email}`, 10, y); y += 6;
    if (student.selectedUniversity && student.selectedUniversity !== '—') { doc.text(`Selected University: ${student.selectedUniversity}`, 10, y); y += 6; }
    if (student.programInterest && student.programInterest !== '—') { doc.text(`Preferred Degree/Program: ${student.programInterest}`, 10, y); y += 6; }
    if (student.locationPreference && student.locationPreference !== '—') { doc.text(`Location Preference: ${student.locationPreference}`, 10, y); y += 6; }
    y += 4;

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
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Generated by ${student.createdBy} on ${student.date}`, 10, pageHeight - 10);

    doc.save('MeritVoyage_Recommendations.pdf');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700">
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your University Recommendations
            </h1>
            <p className="text-white/80 text-lg">
              Based on your profile and preferences
            </p>
          </div>

          {/* Top Universities Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-yellow-400 mr-3 rounded"></span>
              Top Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topUniversities.map((university, index) => (
                <RecommendationCard key={index} university={university} />
              ))}
            </div>
          </section>

          {/* Backup Universities Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-purple-400 mr-3 rounded"></span>
              Backup Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backupUniversities.map((university, index) => (
                <BackupCard key={index} university={university} />
              ))}
            </div>
          </section>

          {/* Alternative Programs Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-amber-400 mr-3 rounded"></span>
              Alternative Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alternativePrograms.map((program, index) => (
                <AlternativeProgramCard key={index} program={program} />
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button onClick={handleDownload} className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
              Download Report
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30">
              Retake Questionnaire
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Recommendations;

