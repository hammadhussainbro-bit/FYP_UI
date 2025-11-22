import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Generate PDF report from recommendation history entry
export const generateHistoryPDF = (historyEntry) => {
  try {
    const doc = new jsPDF();
    const { recommendations, createdAt } = historyEntry;

    // Header branding
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('MeritVoyage - University Recommendations Report', 10, 16);

    // Report date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date(createdAt).toLocaleDateString()}`, 10, 22);

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
    doc.text(`Extra Curricular Interests: ${student.extraCurricularInterests}`, 10, y); y += 6;
    doc.text(`Questionnaire Completed: ${student.completedAt}`, 10, y); y += 8;

    // Top Recommendations
    if (recommendations?.top && recommendations.top.length > 0) {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Top Recommendations', 10, y);
      y += 4;
      
      autoTable(doc, {
        startY: y,
        head: [['University', 'Location', 'Program', 'Match Score', 'Ranking', 'Tuition Fee', 'Entry Test']],
        body: recommendations.top.map(uni => [
          uni.name || 'N/A',
          uni.location || 'N/A',
          uni.program || 'N/A',
          `${uni.matchScore || 0}%`,
          uni.rank || 'N/A',
          uni.tuitionFee || 'N/A',
          uni.entryTestRequired || 'N/A',
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [37, 99, 235] },
        margin: { top: 10 },
      });
      y = doc.lastAutoTable.finalY + 10;
    }

    // Backup Options
    if (recommendations?.backup && recommendations.backup.length > 0) {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Backup Options', 10, y);
      y += 4;
      
      autoTable(doc, {
        startY: y,
        head: [['University', 'Location', 'Program', 'Match Score', 'Ranking', 'Tuition Fee', 'Entry Test']],
        body: recommendations.backup.map(uni => [
          uni.name || 'N/A',
          uni.location || 'N/A',
          uni.program || 'N/A',
          `${uni.matchScore || 0}%`,
          uni.rank || 'N/A',
          uni.tuitionFee || 'N/A',
          uni.entryTestRequired || 'N/A',
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [139, 92, 246] },
        margin: { top: 10 },
      });
      y = doc.lastAutoTable.finalY + 10;
    }

    // Alternative Programs
    if (recommendations?.alternative && recommendations.alternative.length > 0) {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Alternative Programs', 10, y);
      y += 4;
      
      autoTable(doc, {
        startY: y,
        head: [['Program', 'University', 'Duration', 'Tuition', 'Career Path', 'Key Skills']],
        body: recommendations.alternative.map(p => [
          p.programName || 'N/A',
          p.university || 'N/A',
          p.duration || 'N/A',
          p.tuitionFee || 'N/A',
          p.careerPath || 'N/A',
          Array.isArray(p.skills) ? p.skills.join(', ') : 'N/A',
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [251, 191, 36] },
        margin: { top: 10 },
      });
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${pageCount}`, 200, 285, { align: 'right' });
      doc.text('MeritVoyage - University Recommendation System', 10, 285);
    }

    // Generate filename
    const dateStr = new Date(createdAt).toISOString().split('T')[0];
    const filename = `MeritVoyage_Recommendations_${dateStr}.pdf`;
    
    // Save PDF
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

