// Utility to generate fake data for presentation

export const generateFakeStudents = () => {
  const pakistaniNames = [
    { first: 'Ahmed', last: 'Ali', gender: 'Male' },
    { first: 'Fatima', last: 'Khan', gender: 'Female' },
    { first: 'Hassan', last: 'Ahmed', gender: 'Male' },
    { first: 'Ayesha', last: 'Malik', gender: 'Female' },
    { first: 'Usman', last: 'Raza', gender: 'Male' },
    { first: 'Zainab', last: 'Hussain', gender: 'Female' },
    { first: 'Bilal', last: 'Iqbal', gender: 'Male' },
    { first: 'Sana', last: 'Sheikh', gender: 'Female' },
    { first: 'Hamza', last: 'Butt', gender: 'Male' },
    { first: 'Maryam', last: 'Rashid', gender: 'Female' },
    { first: 'Omar', last: 'Yousuf', gender: 'Male' },
    { first: 'Hira', last: 'Nadeem', gender: 'Female' },
    { first: 'Zain', last: 'Abbas', gender: 'Male' },
    { first: 'Amina', last: 'Tariq', gender: 'Female' },
    { first: 'Saad', last: 'Farooq', gender: 'Male' },
    { first: 'Rabia', last: 'Zahid', gender: 'Female' },
    { first: 'Taha', last: 'Siddiqui', gender: 'Male' },
    { first: 'Hafsa', last: 'Qureshi', gender: 'Female' },
    { first: 'Rayyan', last: 'Mirza', gender: 'Male' },
    { first: 'Alishba', last: 'Baig', gender: 'Female' },
    { first: 'Haris', last: 'Chaudhry', gender: 'Male' },
    { first: 'Mariam', last: 'Hashmi', gender: 'Female' },
    { first: 'Daniyal', last: 'Rizvi', gender: 'Male' },
    { first: 'Sara', last: 'Javed', gender: 'Female' },
    { first: 'Arham', last: 'Saleem', gender: 'Male' },
    { first: 'Laiba', last: 'Akram', gender: 'Female' },
    { first: 'Zohaib', last: 'Nawaz', gender: 'Male' },
    { first: 'Areeba', last: 'Waseem', gender: 'Female' },
    { first: 'Fahad', last: 'Kamran', gender: 'Male' },
    { first: 'Maham', last: 'Shahid', gender: 'Female' },
    { first: 'Waleed', last: 'Aslam', gender: 'Male' },
    { first: 'Nimra', last: 'Bashir', gender: 'Female' },
    { first: 'Shahzeb', last: 'Rafique', gender: 'Male' },
    { first: 'Aiman', last: 'Sohail', gender: 'Female' },
    { first: 'Moiz', last: 'Tahir', gender: 'Male' },
    { first: 'Zara', last: 'Imran', gender: 'Female' },
    { first: 'Ayan', last: 'Naeem', gender: 'Male' },
    { first: 'Hania', last: 'Faisal', gender: 'Female' },
    { first: 'Rayan', last: 'Zaman', gender: 'Male' },
    { first: 'Anaya', last: 'Saeed', gender: 'Female' },
    { first: 'Zeeshan', last: 'Hameed', gender: 'Male' },
    { first: 'Iqra', last: 'Majeed', gender: 'Female' },
    { first: 'Adeel', last: 'Khalid', gender: 'Male' },
    { first: 'Mahnoor', last: 'Rauf', gender: 'Female' },
    { first: 'Shayan', last: 'Aziz', gender: 'Male' },
    { first: 'Alisha', last: 'Hassan', gender: 'Female' },
    { first: 'Huzaifa', last: 'Qadir', gender: 'Male' },
    { first: 'Zunaira', last: 'Mansoor', gender: 'Female' },
    { first: 'Areeb', last: 'Shakeel', gender: 'Male' },
    { first: 'Hoorain', last: 'Yasin', gender: 'Female' },
  ];

  const degrees = [
    'BSc Computer Science', 'BSc Software Engineering', 'BSc Information Technology',
    'BSc Electrical Engineering', 'BSc Mechanical Engineering', 'BSc Civil Engineering',
    'BBA Business Administration', 'BSc Mathematics', 'MBBS', 'BDS', 'LLB'
  ];

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];
  const budgets = [
    'Under PKR 25,000/semester', 'PKR 25,000 - 50,000/semester', 'PKR 50,000 - 100,000/semester',
    'PKR 100,000 - 200,000/semester', 'PKR 200,000 - 500,000/semester', 'Above PKR 500,000/semester'
  ];
  const scholarships = [
    'Need-based scholarship', 'Merit-based scholarship', 'Sports scholarship',
    'Both need and merit-based', 'No scholarship needed'
  ];
  const careers = [
    'Software Development', 'Data Science', 'Business Management', 'Research & Academia',
    'Healthcare', 'Engineering', 'Law & Policy', 'Creative Arts'
  ];
  const interests = ['Research', 'Practical Skills', 'Theoretical Knowledge', 'Industry Collaboration', 'International Exposure', 'Entrepreneurship'];
  const extraCurricular = ['Sports', 'Debate & Public Speaking', 'Music & Arts', 'Volunteer Work', 'Student Government', 'Clubs & Societies'];
  const universityTypes = ['Public', 'Private', 'Both'];
  const relocateOptions = ['Yes', 'No', 'Maybe'];

  const students = [];
  const questionnaires = [];

  for (let i = 0; i < 50; i++) {
    const nameData = pakistaniNames[i % pakistaniNames.length];
    const firstName = nameData.first;
    const lastName = nameData.last;
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`;
    const phone = `+92 3${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 1000000).toString().padStart(7, '0')}`;
    const gender = nameData.gender;
    
    // Generate DOB between 2000 and 2006 (ages 18-24)
    const year = 2000 + Math.floor(Math.random() * 7);
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const dob = `${year}-${month}-${day}`;

    const student = {
      name: fullName,
      email: email,
      phone: phone,
      gender: gender,
      dob: dob,
      password: 'password123',
      createdAt: new Date(2024, 0, 1 + i).toISOString(),
    };
    students.push(student);

    // Generate questionnaire for most students (80% completion rate)
    if (Math.random() > 0.2) {
      const ssc = 70 + Math.floor(Math.random() * 25);
      const hssc = 65 + Math.floor(Math.random() * 30);
      const selectedCities = cities.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
      const selectedInterests = interests.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
      const selectedExtra = extraCurricular.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

      const questionnaire = {
        userEmail: email,
        sscPercentage: ssc.toString(),
        hsscPercentage: hssc.toString(),
        preferredDegree: degrees[Math.floor(Math.random() * degrees.length)],
        preferredUniversityType: universityTypes[Math.floor(Math.random() * universityTypes.length)],
        preferredCities: selectedCities,
        budgetPerSemester: budgets[Math.floor(Math.random() * budgets.length)],
        scholarshipPreference: scholarships[Math.floor(Math.random() * scholarships.length)],
        academicInterests: selectedInterests,
        careerPreference: careers[Math.floor(Math.random() * careers.length)],
        willingToRelocate: relocateOptions[Math.floor(Math.random() * relocateOptions.length)],
        extraCurricularInterests: selectedExtra,
        completedAt: new Date(2024, 0, 1 + i, 10 + Math.floor(Math.random() * 8)).toISOString(),
      };
      questionnaires.push(questionnaire);
    }
  }

  return { students, questionnaires };
};



