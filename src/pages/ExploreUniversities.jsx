import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

// Comprehensive university data for Pakistan
const universitiesData = [
  {
    id: 1,
    name: 'NUST - National University of Sciences and Technology',
    location: 'Islamabad',
    established: 1991,
    type: 'Public',
    programs: ['Computer Science', 'Engineering', 'Business', 'Sciences', 'Medicine'],
    ranking: 'Rank #1',
    tuitionFee: 'PKR 150,000 - 200,000/year',
    entryTest: 'NET (NUST Entry Test)',
    website: 'https://www.nust.edu.pk',
    history: 'Established in 1991, NUST is Pakistan\'s premier science and technology university. It was formed by merging several military engineering colleges and has grown to become the top-ranked university in Pakistan.',
    goodPoints: [
      'Top-ranked university in Pakistan',
      'Excellent industry connections and placement rates',
      'Strong research programs and modern facilities',
      'Highly qualified faculty',
      'Strong alumni network',
      'Excellent campus infrastructure',
      'International collaborations',
    ],
    badPoints: [
      'Highly competitive admission process',
      'Rigorous academic workload',
      'Limited seats in popular programs',
      'Strict discipline policies',
    ],
    image: '🏛️',
  },
  {
    id: 2,
    name: 'LUMS - Lahore University of Management Sciences',
    location: 'Lahore',
    established: 1985,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Economics', 'Social Sciences', 'Law'],
    ranking: 'Rank #2',
    tuitionFee: 'PKR 800,000 - 1,200,000/year',
    entryTest: 'LCAT (LUMS Common Admission Test)',
    website: 'https://www.lums.edu.pk',
    history: 'Founded in 1985, LUMS is a premier private research university known for its business and management programs. It has established itself as one of the leading universities in South Asia.',
    goodPoints: [
      'Premier business and management programs',
      'International faculty and global perspective',
      'Strong alumni network in corporate sector',
      'Excellent placement opportunities',
      'Modern campus with world-class facilities',
      'Generous financial aid programs',
      'Strong focus on research and innovation',
    ],
    badPoints: [
      'Very high tuition fees',
      'Competitive admission process',
      'Limited engineering programs',
      'Located only in Lahore',
    ],
    image: '🎓',
  },
  {
    id: 3,
    name: 'FAST - National University of Computer and Emerging Sciences',
    location: 'Karachi, Lahore, Islamabad, Peshawar',
    established: 2000,
    type: 'Private',
    programs: ['Computer Science', 'Software Engineering', 'Data Science', 'Cybersecurity'],
    ranking: 'Rank #3',
    tuitionFee: 'PKR 200,000 - 300,000/year',
    entryTest: 'NTS',
    website: 'https://www.nu.edu.pk',
    history: 'FAST was established in 2000 and specializes in computer sciences. It has multiple campuses across Pakistan and is known for producing top software engineers.',
    goodPoints: [
      'Specialized in computer sciences',
      'Strong programming culture and competitions',
      'High job placement rates',
      'Industry-focused curriculum',
      'Multiple campuses across Pakistan',
      'Strong alumni in tech industry',
      'Modern computer labs and facilities',
    ],
    badPoints: [
      'Limited to computer science programs',
      'Rigorous academic schedule',
      'Less focus on other disciplines',
      'Competitive environment',
    ],
    image: '💻',
  },
  {
    id: 4,
    name: 'UET - University of Engineering and Technology',
    location: 'Lahore',
    established: 1921,
    type: 'Public',
    programs: ['Engineering', 'Architecture', 'Computer Science', 'Electrical Engineering'],
    ranking: 'Rank #5',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uet.edu.pk',
    history: 'Established in 1921, UET Lahore is one of the oldest engineering universities in Pakistan. It has a rich history and tradition of producing excellent engineers.',
    goodPoints: [
      'Affordable tuition fees',
      'Strong engineering programs',
      'Rich history and tradition',
      'Good industry connections',
      'Large alumni network',
      'Good placement opportunities',
    ],
    badPoints: [
      'Large class sizes',
      'Older infrastructure in some areas',
      'Limited modern facilities',
      'Competitive admission',
    ],
    image: '🔧',
  },
  {
    id: 5,
    name: 'GIKI - Ghulam Ishaq Khan Institute',
    location: 'Topi, KPK',
    established: 1993,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Materials Science', 'Management Sciences'],
    ranking: 'Rank #4',
    tuitionFee: 'PKR 300,000 - 400,000/year',
    entryTest: 'GIKI Test',
    website: 'https://www.giki.edu.pk',
    history: 'Founded in 1993, GIKI is a private engineering university known for its rigorous academic programs and beautiful campus in Topi, KPK.',
    goodPoints: [
      'Excellent engineering programs',
      'Beautiful campus location',
      'Strong focus on research',
      'Good faculty-student ratio',
      'Modern facilities',
      'Strong industry partnerships',
    ],
    badPoints: [
      'Remote location',
      'High tuition fees',
      'Limited social activities',
      'Strict academic environment',
    ],
    image: '🏔️',
  },
  {
    id: 6,
    name: 'IBA - Institute of Business Administration',
    location: 'Karachi',
    established: 1955,
    type: 'Public',
    programs: ['Business', 'Economics', 'Computer Science', 'Mathematics', 'Social Sciences'],
    ranking: 'Rank #6',
    tuitionFee: 'PKR 400,000 - 600,000/year',
    entryTest: 'IBA Test',
    website: 'https://www.iba.edu.pk',
    history: 'Established in 1955, IBA is Pakistan\'s oldest business school and is known for producing top business leaders and entrepreneurs.',
    goodPoints: [
      'Premier business school',
      'Strong alumni network in business',
      'Excellent placement in corporate sector',
      'Good faculty',
      'Central location in Karachi',
    ],
    badPoints: [
      'High tuition fees',
      'Competitive admission',
      'Limited engineering programs',
      'Focus mainly on business',
    ],
    image: '💼',
  },
  {
    id: 7,
    name: 'COMSATS University',
    location: 'Islamabad, Lahore, Karachi, Abbottabad, Vehari, Attock',
    established: 1998,
    type: 'Public',
    programs: ['Computer Science', 'Engineering', 'Business', 'Sciences', 'Mathematics'],
    ranking: 'Rank #7',
    tuitionFee: 'PKR 120,000 - 180,000/year',
    entryTest: 'NTS',
    website: 'https://www.comsats.edu.pk',
    history: 'Established in 1998, COMSATS has multiple campuses across Pakistan and offers quality education at affordable prices.',
    goodPoints: [
      'Multiple campuses',
      'Affordable fees',
      'Good quality education',
      'Diverse programs',
      'Growing reputation',
    ],
    badPoints: [
      'Newer university',
      'Less established reputation',
      'Varying quality across campuses',
    ],
    image: '🌐',
  },
  {
    id: 8,
    name: 'KU - University of Karachi',
    location: 'Karachi',
    established: 1951,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Law', 'Medicine', 'Engineering'],
    ranking: 'Rank #8',
    tuitionFee: 'PKR 50,000 - 100,000/year',
    entryTest: 'KU Entry Test',
    website: 'https://www.uok.edu.pk',
    history: 'Established in 1951, KU is one of the largest public universities in Pakistan, offering a wide range of programs.',
    goodPoints: [
      'Very affordable',
      'Wide range of programs',
      'Large university',
      'Central location',
    ],
    badPoints: [
      'Large class sizes',
      'Older infrastructure',
      'Administrative challenges',
      'Limited modern facilities',
    ],
    image: '📚',
  },
  {
    id: 9,
    name: 'PU - University of the Punjab',
    location: 'Lahore',
    established: 1882,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Law', 'Medicine', 'Engineering'],
    ranking: 'Rank #9',
    tuitionFee: 'PKR 40,000 - 80,000/year',
    entryTest: 'PU Entry Test',
    website: 'https://www.pu.edu.pk',
    history: 'Established in 1882, PU is one of the oldest universities in Pakistan with a rich history and tradition.',
    goodPoints: [
      'Very affordable',
      'Rich history',
      'Wide range of programs',
      'Large alumni network',
    ],
    badPoints: [
      'Very large class sizes',
      'Older infrastructure',
      'Administrative issues',
      'Limited modern facilities',
    ],
    image: '🏛️',
  },
  {
    id: 10,
    name: 'SZABIST - Shaheed Zulfikar Ali Bhutto Institute',
    location: 'Karachi, Islamabad, Hyderabad, Larkana',
    established: 1995,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Media Sciences', 'Social Sciences'],
    ranking: 'Rank #10',
    tuitionFee: 'PKR 180,000 - 250,000/year',
    entryTest: 'SZABIST Test',
    website: 'https://www.szabist.edu.pk',
    history: 'Established in 1995, SZABIST is a private university with multiple campuses offering business and technology programs.',
    goodPoints: [
      'Good business programs',
      'Multiple campuses',
      'Modern facilities',
      'Good placement rates',
    ],
    badPoints: [
      'Limited engineering programs',
      'High fees',
      'Newer reputation',
    ],
    image: '📊',
  },
  {
    id: 11,
    name: 'NED University',
    location: 'Karachi',
    established: 1921,
    type: 'Public',
    programs: ['Engineering', 'Architecture', 'Computer Science'],
    ranking: 'Rank #11',
    tuitionFee: 'PKR 70,000 - 100,000/year',
    entryTest: 'NED Entry Test',
    website: 'https://www.neduet.edu.pk',
    history: 'Established in 1921, NED is one of the oldest engineering universities in Pakistan, located in Karachi.',
    goodPoints: [
      'Affordable fees',
      'Strong engineering tradition',
      'Good industry connections',
      'Established reputation',
    ],
    badPoints: [
      'Older infrastructure',
      'Limited modern facilities',
      'Large class sizes',
    ],
    image: '⚙️',
  },
  {
    id: 12,
    name: 'Aga Khan University',
    location: 'Karachi',
    established: 1983,
    type: 'Private',
    programs: ['Medicine', 'Nursing', 'Education', 'Media'],
    ranking: 'Rank #12',
    tuitionFee: 'PKR 1,500,000 - 2,500,000/year',
    entryTest: 'AKU Test',
    website: 'https://www.aku.edu',
    history: 'Established in 1983, AKU is a private university known for its medical and health sciences programs.',
    goodPoints: [
      'Excellent medical programs',
      'World-class facilities',
      'International recognition',
      'Strong research',
    ],
    badPoints: [
      'Very high fees',
      'Limited to health sciences',
      'Very competitive admission',
    ],
    image: '🏥',
  },
  {
    id: 13,
    name: 'Bahria University',
    location: 'Islamabad, Karachi, Lahore',
    established: 2000,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Business', 'Law', 'Psychology', 'Media Sciences'],
    ranking: 'Rank #13',
    tuitionFee: 'PKR 250,000 - 400,000/year',
    entryTest: 'BU Test / NTS',
    website: 'https://www.bahria.edu.pk',
    history: 'Established in 2000, Bahria University is a private university with multiple campuses offering diverse programs in engineering, business, and social sciences.',
    goodPoints: [
      'Multiple campuses across Pakistan',
      'Good engineering and business programs',
      'Modern facilities',
      'Strong industry connections',
      'Good placement rates',
      'Diverse program offerings',
    ],
    badPoints: [
      'High tuition fees',
      'Newer reputation',
      'Varying quality across campuses',
    ],
    image: '🌊',
  },
  {
    id: 14,
    name: 'Iqra University',
    location: 'Karachi, Islamabad, Lahore, Peshawar, Quetta',
    established: 1998,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Media Sciences', 'Education', 'Social Sciences'],
    ranking: 'Rank #14',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'IU Test / NTS',
    website: 'https://www.iqra.edu.pk',
    history: 'Established in 1998, Iqra University has expanded to multiple campuses across Pakistan, offering quality education in business, technology, and social sciences.',
    goodPoints: [
      'Multiple campuses nationwide',
      'Affordable private education',
      'Good business programs',
      'Growing reputation',
      'Modern facilities',
      'Flexible programs',
    ],
    badPoints: [
      'Newer university',
      'Less established reputation',
      'Varying quality across campuses',
    ],
    image: '📖',
  },
  {
    id: 15,
    name: 'Jinnah University',
    location: 'Karachi',
    established: 1998,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Media Sciences', 'Law'],
    ranking: 'Rank #15',
    tuitionFee: 'PKR 180,000 - 300,000/year',
    entryTest: 'JU Test / NTS',
    website: 'https://www.jinnah.edu',
    history: 'Established in 1998, Jinnah University is a private institution in Karachi offering programs in business, technology, and media sciences.',
    goodPoints: [
      'Good business programs',
      'Affordable fees',
      'Central location in Karachi',
      'Modern facilities',
      'Good placement in corporate sector',
    ],
    badPoints: [
      'Limited to Karachi',
      'Newer reputation',
      'Less established than older universities',
    ],
    image: '🎯',
  },
  {
    id: 16,
    name: 'PIEAS - Pakistan Institute of Engineering and Applied Sciences',
    location: 'Islamabad',
    established: 1967,
    type: 'Public',
    programs: ['Engineering', 'Nuclear Engineering', 'Computer Science', 'Physics', 'Mathematics'],
    ranking: 'Rank #16',
    tuitionFee: 'PKR 100,000 - 150,000/year',
    entryTest: 'PIEAS Test',
    website: 'https://www.pieas.edu.pk',
    history: 'Established in 1967, PIEAS is a specialized public university focused on engineering and applied sciences, particularly nuclear engineering.',
    goodPoints: [
      'Specialized in engineering',
      'Strong nuclear engineering program',
      'Affordable fees',
      'Excellent faculty',
      'Strong research focus',
    ],
    badPoints: [
      'Limited program diversity',
      'Very competitive admission',
      'Smaller university',
    ],
    image: '⚛️',
  },
  {
    id: 17,
    name: 'QAU - Quaid-i-Azam University',
    location: 'Islamabad',
    established: 1967,
    type: 'Public',
    programs: ['Sciences', 'Social Sciences', 'Economics', 'Mathematics', 'Physics', 'Chemistry'],
    ranking: 'Rank #17',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'QAU Test',
    website: 'https://www.qau.edu.pk',
    history: 'Established in 1967, QAU is a public research university in Islamabad known for its strong programs in natural and social sciences.',
    goodPoints: [
      'Affordable fees',
      'Strong research programs',
      'Excellent science programs',
      'Good faculty',
      'Beautiful campus',
    ],
    badPoints: [
      'Limited engineering programs',
      'Older infrastructure',
      'Large class sizes',
    ],
    image: '🔬',
  },
  {
    id: 18,
    name: 'IIU - International Islamic University',
    location: 'Islamabad',
    established: 1980,
    type: 'Public',
    programs: ['Islamic Studies', 'Law', 'Business', 'Engineering', 'Social Sciences', 'Languages'],
    ranking: 'Rank #18',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'IIU Test',
    website: 'https://www.iiu.edu.pk',
    history: 'Established in 1980, IIU is a public university offering programs that combine modern education with Islamic values.',
    goodPoints: [
      'Affordable fees',
      'Unique Islamic perspective',
      'Good law and business programs',
      'Diverse programs',
      'International recognition',
    ],
    badPoints: [
      'Strict Islamic environment',
      'Limited social activities',
      'Older facilities',
    ],
    image: '🕌',
  },
  {
    id: 19,
    name: 'UCP - University of Central Punjab',
    location: 'Lahore',
    established: 2002,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences'],
    ranking: 'Rank #19',
    tuitionFee: 'PKR 200,000 - 300,000/year',
    entryTest: 'UCP Test / NTS',
    website: 'https://www.ucp.edu.pk',
    history: 'Established in 2002, UCP is a private university in Lahore offering programs in business, technology, and law.',
    goodPoints: [
      'Good business programs',
      'Modern facilities',
      'Central location',
      'Growing reputation',
    ],
    badPoints: [
      'Newer university',
      'High fees',
      'Limited to Lahore',
    ],
    image: '🏛️',
  },
  {
    id: 20,
    name: 'UMT - University of Management and Technology',
    location: 'Lahore',
    established: 1990,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences', 'Social Sciences'],
    ranking: 'Rank #20',
    tuitionFee: 'PKR 250,000 - 400,000/year',
    entryTest: 'UMT Test / NTS',
    website: 'https://www.umt.edu.pk',
    history: 'Established in 1990, UMT is a private university in Lahore known for its business and management programs.',
    goodPoints: [
      'Excellent business programs',
      'Modern campus',
      'Good placement rates',
      'Strong industry connections',
      'Diverse programs',
    ],
    badPoints: [
      'High tuition fees',
      'Limited to Lahore',
      'Competitive admission',
    ],
    image: '💼',
  },
  {
    id: 21,
    name: 'LSE - Lahore School of Economics',
    location: 'Lahore',
    established: 1993,
    type: 'Private',
    programs: ['Economics', 'Business', 'Finance', 'Accounting', 'Mathematics'],
    ranking: 'Rank #21',
    tuitionFee: 'PKR 300,000 - 500,000/year',
    entryTest: 'LSE Test',
    website: 'https://www.lahoreschoolofeconomics.edu.pk',
    history: 'Established in 1993, LSE is a specialized private institution focused on economics and business education.',
    goodPoints: [
      'Specialized in economics',
      'Excellent faculty',
      'Strong research',
      'Good placement in finance sector',
    ],
    badPoints: [
      'Very high fees',
      'Limited program diversity',
      'Very competitive admission',
    ],
    image: '📈',
  },
  {
    id: 22,
    name: 'NED University',
    location: 'Karachi',
    established: 1921,
    type: 'Public',
    programs: ['Engineering', 'Architecture', 'Computer Science', 'Industrial Engineering'],
    ranking: 'Rank #11',
    tuitionFee: 'PKR 70,000 - 100,000/year',
    entryTest: 'NED Entry Test',
    website: 'https://www.neduet.edu.pk',
    history: 'Established in 1921, NED is one of the oldest engineering universities in Pakistan, located in Karachi.',
    goodPoints: [
      'Affordable fees',
      'Strong engineering tradition',
      'Good industry connections',
      'Established reputation',
    ],
    badPoints: [
      'Older infrastructure',
      'Limited modern facilities',
      'Large class sizes',
    ],
    image: '⚙️',
  },
  {
    id: 23,
    name: 'Sukkur IBA',
    location: 'Sukkur',
    established: 1994,
    type: 'Public',
    programs: ['Business', 'Computer Science', 'Economics', 'Mathematics'],
    ranking: 'Rank #22',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'Sukkur IBA Test',
    website: 'https://www.iba-suk.edu.pk',
    history: 'Established in 1994, Sukkur IBA is a public business school offering quality business and technology education.',
    goodPoints: [
      'Affordable quality education',
      'Good business programs',
      'Growing reputation',
      'Modern facilities',
    ],
    badPoints: [
      'Remote location',
      'Limited program diversity',
      'Newer reputation',
    ],
    image: '📊',
  },
  {
    id: 24,
    name: 'CIIT - COMSATS Institute of Information Technology',
    location: 'Islamabad, Lahore, Karachi, Abbottabad, Vehari, Attock',
    established: 1998,
    type: 'Public',
    programs: ['Computer Science', 'Engineering', 'Business', 'Sciences', 'Mathematics'],
    ranking: 'Rank #7',
    tuitionFee: 'PKR 120,000 - 180,000/year',
    entryTest: 'NTS',
    website: 'https://www.comsats.edu.pk',
    history: 'Established in 1998, COMSATS has multiple campuses across Pakistan and offers quality education at affordable prices.',
    goodPoints: [
      'Multiple campuses',
      'Affordable fees',
      'Good quality education',
      'Diverse programs',
      'Growing reputation',
    ],
    badPoints: [
      'Newer university',
      'Less established reputation',
      'Varying quality across campuses',
    ],
    image: '🌐',
  },
  {
    id: 25,
    name: 'NCA - National College of Arts',
    location: 'Lahore, Rawalpindi',
    established: 1875,
    type: 'Public',
    programs: ['Fine Arts', 'Architecture', 'Design', 'Music', 'Film & TV', 'Textile Design'],
    ranking: 'Rank #23',
    tuitionFee: 'PKR 80,000 - 150,000/year',
    entryTest: 'NCA Test',
    website: 'https://www.nca.edu.pk',
    history: 'Established in 1875, NCA is Pakistan\'s premier arts institution, offering programs in fine arts, architecture, and design. It has campuses in Lahore and Rawalpindi.',
    goodPoints: [
      'Premier arts institution',
      'Rich history and tradition',
      'Excellent faculty',
      'Strong alumni network',
      'Affordable fees',
      'Unique programs',
    ],
    badPoints: [
      'Limited to arts and design',
      'Competitive admission',
      'Older infrastructure',
    ],
    image: '🎨',
  },
  {
    id: 26,
    name: 'AIOU - Allama Iqbal Open University',
    location: 'Islamabad',
    established: 1974,
    type: 'Public',
    programs: ['Education', 'Business', 'Sciences', 'Social Sciences', 'Languages', 'IT'],
    ranking: 'Rank #24',
    tuitionFee: 'PKR 20,000 - 50,000/year',
    entryTest: 'AIOU Test',
    website: 'https://www.aiou.edu.pk',
    history: 'Established in 1974, AIOU is Pakistan\'s largest distance learning university, making education accessible to students across the country.',
    goodPoints: [
      'Very affordable',
      'Distance learning option',
      'Accessible to all',
      'Wide range of programs',
      'Flexible schedules',
    ],
    badPoints: [
      'Distance learning limitations',
      'Less interactive',
      'Self-study required',
    ],
    image: '📺',
  },
  {
    id: 27,
    name: 'PMAS-AAUR - Pir Mehr Ali Shah Arid Agriculture University',
    location: 'Rawalpindi',
    established: 1994,
    type: 'Public',
    programs: ['Agriculture', 'Veterinary Sciences', 'Food Sciences', 'Environmental Sciences'],
    ranking: 'Rank #25',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'PMAS Test',
    website: 'https://www.uaar.edu.pk',
    history: 'Established in 1994, PMAS-AAUR specializes in agriculture and related sciences, focusing on arid agriculture research.',
    goodPoints: [
      'Specialized in agriculture',
      'Affordable fees',
      'Good research programs',
      'Unique focus area',
    ],
    badPoints: [
      'Limited program diversity',
      'Specialized focus',
      'Smaller university',
    ],
    image: '🌾',
  },
  {
    id: 28,
    name: 'UAF - University of Agriculture Faisalabad',
    location: 'Faisalabad',
    established: 1906,
    type: 'Public',
    programs: ['Agriculture', 'Veterinary Sciences', 'Food Sciences', 'Engineering', 'Business'],
    ranking: 'Rank #26',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UAF Test',
    website: 'https://www.uaf.edu.pk',
    history: 'Established in 1906, UAF is one of the oldest agricultural universities in Pakistan, known for its strong programs in agriculture and veterinary sciences.',
    goodPoints: [
      'Oldest agricultural university',
      'Affordable fees',
      'Strong agriculture programs',
      'Established reputation',
    ],
    badPoints: [
      'Limited to agriculture focus',
      'Older infrastructure',
      'Location in Faisalabad',
    ],
    image: '🚜',
  },
  {
    id: 29,
    name: 'UVAS - University of Veterinary and Animal Sciences',
    location: 'Lahore',
    established: 1882,
    type: 'Public',
    programs: ['Veterinary Sciences', 'Animal Sciences', 'Food Sciences', 'Biotechnology'],
    ranking: 'Rank #27',
    tuitionFee: 'PKR 70,000 - 120,000/year',
    entryTest: 'UVAS Test',
    website: 'https://www.uvas.edu.pk',
    history: 'Established in 1882, UVAS is Pakistan\'s premier veterinary and animal sciences university.',
    goodPoints: [
      'Premier veterinary institution',
      'Affordable fees',
      'Specialized programs',
      'Strong research',
    ],
    badPoints: [
      'Very specialized',
      'Limited program diversity',
    ],
    image: '🐄',
  },
  {
    id: 30,
    name: 'BZU - Bahauddin Zakariya University',
    location: 'Multan',
    established: 1975,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering', 'Law', 'Medicine'],
    ranking: 'Rank #28',
    tuitionFee: 'PKR 50,000 - 100,000/year',
    entryTest: 'BZU Test',
    website: 'https://www.bzu.edu.pk',
    history: 'Established in 1975, BZU is a large public university in Multan offering diverse programs.',
    goodPoints: [
      'Affordable fees',
      'Wide range of programs',
      'Large university',
    ],
    badPoints: [
      'Large class sizes',
      'Older infrastructure',
      'Location in Multan',
    ],
    image: '🏛️',
  },
  {
    id: 31,
    name: 'GCU - Government College University',
    location: 'Lahore',
    established: 1864,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Mathematics', 'Physics', 'Chemistry', 'English'],
    ranking: 'Rank #29',
    tuitionFee: 'PKR 40,000 - 80,000/year',
    entryTest: 'GCU Test',
    website: 'https://www.gcu.edu.pk',
    history: 'Established in 1864, GCU is one of the oldest educational institutions in Pakistan, known for its strong programs in arts and sciences.',
    goodPoints: [
      'Very affordable',
      'Rich history',
      'Strong arts and sciences',
      'Historic campus',
    ],
    badPoints: [
      'Older infrastructure',
      'Limited modern facilities',
      'Large class sizes',
    ],
    image: '📚',
  },
  {
    id: 32,
    name: 'FC College University',
    location: 'Lahore',
    established: 1864,
    type: 'Private',
    programs: ['Arts', 'Sciences', 'Business', 'Social Sciences', 'Mathematics'],
    ranking: 'Rank #30',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'FCC Test',
    website: 'https://www.fccollege.edu.pk',
    history: 'Established in 1864, FC College is a historic private institution known for quality education in arts and sciences.',
    goodPoints: [
      'Rich history',
      'Good quality education',
      'Historic campus',
      'Strong programs',
    ],
    badPoints: [
      'High fees',
      'Limited engineering programs',
    ],
    image: '🏫',
  },
  {
    id: 33,
    name: 'KU - Kinnaird College',
    location: 'Lahore',
    established: 1913,
    type: 'Private',
    programs: ['Arts', 'Sciences', 'Business', 'Social Sciences', 'Education'],
    ranking: 'Rank #31',
    tuitionFee: 'PKR 120,000 - 200,000/year',
    entryTest: 'KC Test',
    website: 'https://www.kinnaird.edu.pk',
    history: 'Established in 1913, Kinnaird College is a historic women\'s college offering quality education.',
    goodPoints: [
      'Historic institution',
      'Good quality education',
      'Women-focused',
      'Strong programs',
    ],
    badPoints: [
      'Women only',
      'Limited program diversity',
    ],
    image: '👩‍🎓',
  },
  {
    id: 34,
    name: 'LU - Lahore University',
    location: 'Lahore',
    established: 1999,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences'],
    ranking: 'Rank #32',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'LU Test / NTS',
    website: 'https://www.lu.edu.pk',
    history: 'Established in 1999, Lahore University is a private institution offering modern programs.',
    goodPoints: [
      'Modern programs',
      'Good facilities',
      'Growing reputation',
    ],
    badPoints: [
      'Newer university',
      'High fees',
    ],
    image: '🏢',
  },
  {
    id: 35,
    name: 'SZABIST - Shaheed Zulfikar Ali Bhutto Institute',
    location: 'Karachi, Islamabad, Hyderabad, Larkana',
    established: 1995,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Media Sciences', 'Social Sciences', 'Law'],
    ranking: 'Rank #10',
    tuitionFee: 'PKR 180,000 - 250,000/year',
    entryTest: 'SZABIST Test',
    website: 'https://www.szabist.edu.pk',
    history: 'Established in 1995, SZABIST is a private university with multiple campuses offering business and technology programs.',
    goodPoints: [
      'Good business programs',
      'Multiple campuses',
      'Modern facilities',
      'Good placement rates',
    ],
    badPoints: [
      'Limited engineering programs',
      'High fees',
      'Newer reputation',
    ],
    image: '📊',
  },
  {
    id: 36,
    name: 'IST - Institute of Space Technology',
    location: 'Islamabad',
    established: 2002,
    type: 'Public',
    programs: ['Aerospace Engineering', 'Avionics', 'Space Sciences', 'Computer Science'],
    ranking: 'Rank #33',
    tuitionFee: 'PKR 100,000 - 150,000/year',
    entryTest: 'IST Test',
    website: 'https://www.ist.edu.pk',
    history: 'Established in 2002, IST is a specialized public university focused on aerospace and space technology.',
    goodPoints: [
      'Unique aerospace programs',
      'Affordable fees',
      'Specialized focus',
      'Modern facilities',
    ],
    badPoints: [
      'Very specialized',
      'Limited program diversity',
      'Smaller university',
    ],
    image: '🚀',
  },
  {
    id: 37,
    name: 'MAJU - Mohammad Ali Jinnah University',
    location: 'Karachi',
    established: 1998,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences'],
    ranking: 'Rank #34',
    tuitionFee: 'PKR 200,000 - 300,000/year',
    entryTest: 'MAJU Test / NTS',
    website: 'https://www.jinnah.edu',
    history: 'Established in 1998, MAJU is a private university in Karachi offering programs in business, technology, and law.',
    goodPoints: [
      'Good business programs',
      'Modern facilities',
      'Central location',
      'Growing reputation',
    ],
    badPoints: [
      'Newer university',
      'High fees',
      'Limited to Karachi',
    ],
    image: '🎯',
  },
  {
    id: 38,
    name: 'CUST - Capital University of Science and Technology',
    location: 'Islamabad',
    established: 1998,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Business', 'Management Sciences'],
    ranking: 'Rank #35',
    tuitionFee: 'PKR 250,000 - 400,000/year',
    entryTest: 'CUST Test / NTS',
    website: 'https://www.cust.edu.pk',
    history: 'Established in 1998, CUST is a private university in Islamabad focusing on science and technology.',
    goodPoints: [
      'Good engineering programs',
      'Modern facilities',
      'Central location',
      'Growing reputation',
    ],
    badPoints: [
      'High fees',
      'Newer university',
      'Limited to Islamabad',
    ],
    image: '🔬',
  },
  {
    id: 39,
    name: 'RIPHAH - Riphah International University',
    location: 'Islamabad, Lahore, Faisalabad',
    established: 2002,
    type: 'Private',
    programs: ['Medicine', 'Pharmacy', 'Business', 'Engineering', 'Law', 'Social Sciences'],
    ranking: 'Rank #36',
    tuitionFee: 'PKR 300,000 - 600,000/year',
    entryTest: 'RIPHAH Test',
    website: 'https://www.riphah.edu.pk',
    history: 'Established in 2002, Riphah is a private university with multiple campuses offering diverse programs including medicine.',
    goodPoints: [
      'Multiple campuses',
      'Good medical programs',
      'Diverse programs',
      'Modern facilities',
    ],
    badPoints: [
      'High fees',
      'Newer university',
      'Varying quality across campuses',
    ],
    image: '🏥',
  },
  {
    id: 40,
    name: 'DUHS - Dow University of Health Sciences',
    location: 'Karachi',
    established: 2003,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Public Health'],
    ranking: 'Rank #37',
    tuitionFee: 'PKR 200,000 - 400,000/year',
    entryTest: 'DUHS Test',
    website: 'https://www.duhs.edu.pk',
    history: 'Established in 2003, DUHS is a public university in Karachi specializing in health sciences.',
    goodPoints: [
      'Affordable health sciences',
      'Good medical programs',
      'Public university',
      'Strong programs',
    ],
    badPoints: [
      'Limited to health sciences',
      'Competitive admission',
      'Large class sizes',
    ],
    image: '⚕️',
  },
  {
    id: 41,
    name: 'JSMU - Jinnah Sindh Medical University',
    location: 'Karachi',
    established: 2012,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Allied Health'],
    ranking: 'Rank #38',
    tuitionFee: 'PKR 150,000 - 300,000/year',
    entryTest: 'JSMU Test',
    website: 'https://www.jsmuh.edu.pk',
    history: 'Established in 2012, JSMU is a public medical university in Karachi.',
    goodPoints: [
      'Affordable medical education',
      'Public university',
      'Good programs',
    ],
    badPoints: [
      'Newer university',
      'Limited to health sciences',
    ],
    image: '🏥',
  },
  {
    id: 42,
    name: 'KMU - Khyber Medical University',
    location: 'Peshawar',
    established: 2006,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Public Health'],
    ranking: 'Rank #39',
    tuitionFee: 'PKR 100,000 - 200,000/year',
    entryTest: 'KMU Test',
    website: 'https://www.kmu.edu.pk',
    history: 'Established in 2006, KMU is a public medical university in Peshawar.',
    goodPoints: [
      'Affordable medical education',
      'Public university',
      'Good programs',
    ],
    badPoints: [
      'Limited to health sciences',
      'Location in Peshawar',
    ],
    image: '⚕️',
  },
  {
    id: 43,
    name: 'UET Taxila',
    location: 'Taxila',
    established: 1975,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
    ranking: 'Rank #40',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uettaxila.edu.pk',
    history: 'Established in 1975, UET Taxila is a public engineering university.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
      'Established reputation',
    ],
    badPoints: [
      'Location in Taxila',
      'Older infrastructure',
    ],
    image: '🔧',
  },
  {
    id: 44,
    name: 'MUET - Mehran University of Engineering and Technology',
    location: 'Jamshoro',
    established: 1976,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Electrical Engineering', 'Civil Engineering'],
    ranking: 'Rank #41',
    tuitionFee: 'PKR 70,000 - 110,000/year',
    entryTest: 'ECAT',
    website: 'https://www.muet.edu.pk',
    history: 'Established in 1976, MUET is a public engineering university in Jamshoro.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
      'Established reputation',
    ],
    badPoints: [
      'Location in Jamshoro',
      'Older infrastructure',
    ],
    image: '⚙️',
  },
  {
    id: 45,
    name: 'BUITEMS - Balochistan University of IT, Engineering and Management Sciences',
    location: 'Quetta',
    established: 2002,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Business', 'IT', 'Management Sciences'],
    ranking: 'Rank #42',
    tuitionFee: 'PKR 80,000 - 130,000/year',
    entryTest: 'BUITEMS Test',
    website: 'https://www.buitms.edu.pk',
    history: 'Established in 2002, BUITEMS is a public university in Quetta focusing on IT and engineering.',
    goodPoints: [
      'Affordable fees',
      'Good IT programs',
      'Modern focus',
    ],
    badPoints: [
      'Location in Quetta',
      'Newer university',
    ],
    image: '💻',
  },
  {
    id: 46,
    name: 'IMS - Institute of Management Sciences',
    location: 'Peshawar',
    established: 2005,
    type: 'Public',
    programs: ['Business', 'Management Sciences', 'Computer Science', 'Economics'],
    ranking: 'Rank #43',
    tuitionFee: 'PKR 100,000 - 180,000/year',
    entryTest: 'IMS Test',
    website: 'https://www.imsciences.edu.pk',
    history: 'Established in 2005, IMS is a public business school in Peshawar.',
    goodPoints: [
      'Affordable business education',
      'Good programs',
      'Public university',
    ],
    badPoints: [
      'Limited to business focus',
      'Location in Peshawar',
    ],
    image: '📊',
  },
  {
    id: 47,
    name: 'CECOS - CECOS University',
    location: 'Peshawar',
    established: 1986,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Business', 'Pharmacy'],
    ranking: 'Rank #44',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'CECOS Test / NTS',
    website: 'https://www.cecos.edu.pk',
    history: 'Established in 1986, CECOS is a private university in Peshawar.',
    goodPoints: [
      'Good engineering programs',
      'Modern facilities',
      'Established reputation',
    ],
    badPoints: [
      'High fees',
      'Location in Peshawar',
    ],
    image: '🏛️',
  },
  {
    id: 48,
    name: 'Gomal University',
    location: 'Dera Ismail Khan',
    established: 1974,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering', 'Agriculture', 'Medicine'],
    ranking: 'Rank #45',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'Gomal Test',
    website: 'https://www.gu.edu.pk',
    history: 'Established in 1974, Gomal University is a public university in Dera Ismail Khan.',
    goodPoints: [
      'Very affordable',
      'Wide range of programs',
      'Large university',
    ],
    badPoints: [
      'Remote location',
      'Older infrastructure',
    ],
    image: '🏛️',
  },
  {
    id: 49,
    name: 'HITEC University',
    location: 'Taxila',
    established: 2007,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Business', 'Management Sciences'],
    ranking: 'Rank #46',
    tuitionFee: 'PKR 250,000 - 400,000/year',
    entryTest: 'HITEC Test / NTS',
    website: 'https://www.hitecuni.edu.pk',
    history: 'Established in 2007, HITEC is a private engineering university in Taxila.',
    goodPoints: [
      'Good engineering programs',
      'Modern facilities',
      'Growing reputation',
    ],
    badPoints: [
      'High fees',
      'Newer university',
      'Location in Taxila',
    ],
    image: '🔧',
  },
  {
    id: 50,
    name: 'SSUET - Sir Syed University of Engineering and Technology',
    location: 'Karachi',
    established: 1993,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Business', 'Architecture'],
    ranking: 'Rank #47',
    tuitionFee: 'PKR 180,000 - 300,000/year',
    entryTest: 'SSUET Test / NTS',
    website: 'https://www.ssuet.edu.pk',
    history: 'Established in 1993, SSUET is a private engineering university in Karachi.',
    goodPoints: [
      'Good engineering programs',
      'Established reputation',
      'Central location',
    ],
    badPoints: [
      'High fees',
      'Limited program diversity',
    ],
    image: '🏗️',
  },
  {
    id: 51,
    name: 'ISRA University',
    location: 'Hyderabad, Islamabad',
    established: 1997,
    type: 'Private',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Business', 'Engineering', 'Law'],
    ranking: 'Rank #48',
    tuitionFee: 'PKR 300,000 - 500,000/year',
    entryTest: 'ISRA Test',
    website: 'https://www.isra.edu.pk',
    history: 'Established in 1997, ISRA is a private university with campuses in Hyderabad and Islamabad.',
    goodPoints: [
      'Good medical programs',
      'Multiple campuses',
      'Diverse programs',
    ],
    badPoints: [
      'High fees',
      'Newer reputation',
    ],
    image: '🏥',
  },
  {
    id: 52,
    name: 'LUMHS - Liaquat University of Medical and Health Sciences',
    location: 'Jamshoro',
    established: 2001,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Public Health'],
    ranking: 'Rank #49',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'LUMHS Test',
    website: 'https://www.lumhs.edu.pk',
    history: 'Established in 2001, LUMHS is a public medical university in Jamshoro.',
    goodPoints: [
      'Affordable medical education',
      'Public university',
      'Good programs',
    ],
    badPoints: [
      'Limited to health sciences',
      'Location in Jamshoro',
    ],
    image: '⚕️',
  },
  {
    id: 53,
    name: 'IMCB - Institute of Management and Computer Sciences',
    location: 'Karachi',
    established: 1995,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Management Sciences'],
    ranking: 'Rank #50',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'IMCB Test / NTS',
    website: 'https://www.imcb.edu.pk',
    history: 'Established in 1995, IMCB is a private institution in Karachi focusing on business and computer sciences.',
    goodPoints: [
      'Good business programs',
      'Affordable private education',
      'Central location',
    ],
    badPoints: [
      'Limited program diversity',
      'Newer reputation',
    ],
    image: '💼',
  },
  {
    id: 54,
    name: 'HIT - Hamdard Institute of Technology',
    location: 'Karachi',
    established: 1991,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Business', 'Pharmacy'],
    ranking: 'Rank #51',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'HIT Test / NTS',
    website: 'https://www.hamdard.edu.pk',
    history: 'Established in 1991, HIT is part of Hamdard University offering engineering and technology programs.',
    goodPoints: [
      'Good engineering programs',
      'Established reputation',
      'Part of larger university system',
    ],
    badPoints: [
      'High fees',
      'Limited to Karachi',
    ],
    image: '🔬',
  },
  {
    id: 55,
    name: 'SAU - Sindh Agriculture University',
    location: 'Tandojam',
    established: 1977,
    type: 'Public',
    programs: ['Agriculture', 'Veterinary Sciences', 'Food Sciences', 'Engineering'],
    ranking: 'Rank #52',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'SAU Test',
    website: 'https://www.sau.edu.pk',
    history: 'Established in 1977, SAU is a public agricultural university in Tandojam.',
    goodPoints: [
      'Affordable fees',
      'Specialized in agriculture',
      'Good programs',
    ],
    badPoints: [
      'Limited to agriculture focus',
      'Remote location',
    ],
    image: '🌾',
  },
  {
    id: 56,
    name: 'SAUT - Shah Abdul Latif University',
    location: 'Khairpur',
    established: 1987,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Social Sciences', 'Education'],
    ranking: 'Rank #53',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'SAUT Test',
    website: 'https://www.salu.edu.pk',
    history: 'Established in 1987, SAUT is a public university in Khairpur.',
    goodPoints: [
      'Very affordable',
      'Wide range of programs',
    ],
    badPoints: [
      'Remote location',
      'Older infrastructure',
    ],
    image: '🏛️',
  },
  {
    id: 57,
    name: 'UOS - University of Sargodha',
    location: 'Sargodha',
    established: 2002,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering', 'Law', 'Medicine'],
    ranking: 'Rank #54',
    tuitionFee: 'PKR 50,000 - 100,000/year',
    entryTest: 'UOS Test',
    website: 'https://www.uos.edu.pk',
    history: 'Established in 2002, UOS is a public university in Sargodha.',
    goodPoints: [
      'Affordable fees',
      'Wide range of programs',
      'Large university',
    ],
    badPoints: [
      'Location in Sargodha',
      'Newer university',
    ],
    image: '🏛️',
  },
  {
    id: 58,
    name: 'UOG - University of Gujrat',
    location: 'Gujrat',
    established: 2004,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering', 'Law'],
    ranking: 'Rank #55',
    tuitionFee: 'PKR 60,000 - 110,000/year',
    entryTest: 'UOG Test',
    website: 'https://www.uog.edu.pk',
    history: 'Established in 2004, UOG is a public university in Gujrat.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
      'Modern facilities',
    ],
    badPoints: [
      'Newer university',
      'Location in Gujrat',
    ],
    image: '🏛️',
  },
  {
    id: 59,
    name: 'UET Peshawar',
    location: 'Peshawar',
    established: 1980,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Architecture'],
    ranking: 'Rank #56',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uetpeshawar.edu.pk',
    history: 'Established in 1980, UET Peshawar is a public engineering university.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
      'Established reputation',
    ],
    badPoints: [
      'Location in Peshawar',
      'Older infrastructure',
    ],
    image: '🔧',
  },
  {
    id: 60,
    name: 'UET Mardan',
    location: 'Mardan',
    established: 2002,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #57',
    tuitionFee: 'PKR 70,000 - 110,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uetmardan.edu.pk',
    history: 'Established in 2002, UET Mardan is a public engineering university.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
    ],
    badPoints: [
      'Newer university',
      'Location in Mardan',
      'Limited programs',
    ],
    image: '⚙️',
  },
  {
    id: 61,
    name: 'NFC IET - NFC Institute of Engineering and Technology',
    location: 'Multan',
    established: 2003,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Business'],
    ranking: 'Rank #58',
    tuitionFee: 'PKR 100,000 - 150,000/year',
    entryTest: 'NFC Test',
    website: 'https://www.nfciet.edu.pk',
    history: 'Established in 2003, NFC IET is a public engineering university in Multan.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
      'Modern focus',
    ],
    badPoints: [
      'Newer university',
      'Location in Multan',
    ],
    image: '🔧',
  },
  {
    id: 62,
    name: 'UET New Campus',
    location: 'Kala Shah Kaku',
    established: 2008,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #59',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uet.edu.pk',
    history: 'Established in 2008, UET New Campus is an extension of UET Lahore.',
    goodPoints: [
      'Affordable fees',
      'Part of UET system',
      'Good engineering programs',
    ],
    badPoints: [
      'Newer campus',
      'Remote location',
      'Limited programs',
    ],
    image: '🏗️',
  },
  {
    id: 63,
    name: 'IMSciences - Institute of Management Sciences',
    location: 'Peshawar',
    established: 2005,
    type: 'Public',
    programs: ['Business', 'Management Sciences', 'Computer Science', 'Economics'],
    ranking: 'Rank #43',
    tuitionFee: 'PKR 100,000 - 180,000/year',
    entryTest: 'IMS Test',
    website: 'https://www.imsciences.edu.pk',
    history: 'Established in 2005, IMSciences is a public business school in Peshawar.',
    goodPoints: [
      'Affordable business education',
      'Good programs',
      'Public university',
    ],
    badPoints: [
      'Limited to business focus',
      'Location in Peshawar',
    ],
    image: '📊',
  },
  {
    id: 64,
    name: 'BU - Balochistan University',
    location: 'Quetta',
    established: 1970,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Law', 'Medicine'],
    ranking: 'Rank #60',
    tuitionFee: 'PKR 40,000 - 80,000/year',
    entryTest: 'BU Test',
    website: 'https://www.uob.edu.pk',
    history: 'Established in 1970, BU is a public university in Quetta.',
    goodPoints: [
      'Very affordable',
      'Wide range of programs',
    ],
    badPoints: [
      'Location in Quetta',
      'Older infrastructure',
    ],
    image: '🏛️',
  },
  {
    id: 65,
    name: 'UOM - University of Malakand',
    location: 'Malakand',
    established: 2001,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #61',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOM Test',
    website: 'https://www.uom.edu.pk',
    history: 'Established in 2001, UOM is a public university in Malakand.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Remote location',
      'Newer university',
    ],
    image: '🏛️',
  },
  {
    id: 66,
    name: 'AWKUM - Abdul Wali Khan University',
    location: 'Mardan',
    established: 2009,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering', 'Law'],
    ranking: 'Rank #62',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'AWKUM Test',
    website: 'https://www.awkum.edu.pk',
    history: 'Established in 2009, AWKUM is a public university in Mardan.',
    goodPoints: [
      'Affordable fees',
      'Wide range of programs',
      'Modern facilities',
    ],
    badPoints: [
      'Newer university',
      'Location in Mardan',
    ],
    image: '🏛️',
  },
  {
    id: 67,
    name: 'UET KSK - UET Kala Shah Kaku',
    location: 'Kala Shah Kaku',
    established: 2008,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #63',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uet.edu.pk',
    history: 'Established in 2008, UET KSK is an extension campus of UET Lahore.',
    goodPoints: [
      'Affordable fees',
      'Part of UET system',
    ],
    badPoints: [
      'Remote location',
      'Limited programs',
    ],
    image: '🔧',
  },
  {
    id: 68,
    name: 'UET Narowal',
    location: 'Narowal',
    established: 2012,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #64',
    tuitionFee: 'PKR 70,000 - 110,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uet.edu.pk',
    history: 'Established in 2012, UET Narowal is a newer engineering campus.',
    goodPoints: [
      'Affordable fees',
      'Modern facilities',
    ],
    badPoints: [
      'Very new',
      'Remote location',
      'Limited programs',
    ],
    image: '⚙️',
  },
  {
    id: 69,
    name: 'UET Faisalabad',
    location: 'Faisalabad',
    established: 2003,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #65',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uetf.edu.pk',
    history: 'Established in 2003, UET Faisalabad is a public engineering university.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
    ],
    badPoints: [
      'Location in Faisalabad',
      'Limited programs',
    ],
    image: '🔧',
  },
  {
    id: 70,
    name: 'UET Bannu',
    location: 'Bannu',
    established: 2014,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #66',
    tuitionFee: 'PKR 70,000 - 110,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uet.edu.pk',
    history: 'Established in 2014, UET Bannu is a newer engineering campus.',
    goodPoints: [
      'Affordable fees',
      'Modern facilities',
    ],
    badPoints: [
      'Very new',
      'Remote location',
      'Limited programs',
    ],
    image: '⚙️',
  },
  {
    id: 71,
    name: 'UET Jalozai',
    location: 'Jalozai',
    established: 2010,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #67',
    tuitionFee: 'PKR 75,000 - 115,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uet.edu.pk',
    history: 'Established in 2010, UET Jalozai is an engineering campus.',
    goodPoints: [
      'Affordable fees',
      'Part of UET system',
    ],
    badPoints: [
      'Remote location',
      'Limited programs',
    ],
    image: '🔧',
  },
  {
    id: 72,
    name: 'UET Khuzdar',
    location: 'Khuzdar',
    established: 2013,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #68',
    tuitionFee: 'PKR 70,000 - 110,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uet.edu.pk',
    history: 'Established in 2013, UET Khuzdar is a newer engineering campus.',
    goodPoints: [
      'Affordable fees',
      'Modern facilities',
    ],
    badPoints: [
      'Very new',
      'Remote location',
      'Limited programs',
    ],
    image: '⚙️',
  },
  {
    id: 73,
    name: 'NED City Campus',
    location: 'Karachi',
    established: 2010,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Business'],
    ranking: 'Rank #69',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'NED Test',
    website: 'https://www.neduet.edu.pk',
    history: 'Established in 2010, NED City Campus is an extension of NED University.',
    goodPoints: [
      'Affordable fees',
      'Part of NED system',
      'Central location',
    ],
    badPoints: [
      'Limited programs',
      'Newer campus',
    ],
    image: '🏗️',
  },
  {
    id: 74,
    name: 'SZABIST Larkana',
    location: 'Larkana',
    established: 2004,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Media Sciences'],
    ranking: 'Rank #70',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'SZABIST Test',
    website: 'https://www.szabist.edu.pk',
    history: 'Established in 2004, SZABIST Larkana is a campus of SZABIST.',
    goodPoints: [
      'Part of SZABIST system',
      'Good programs',
    ],
    badPoints: [
      'High fees',
      'Location in Larkana',
    ],
    image: '📊',
  },
  {
    id: 75,
    name: 'SZABIST Hyderabad',
    location: 'Hyderabad',
    established: 2003,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Media Sciences'],
    ranking: 'Rank #71',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'SZABIST Test',
    website: 'https://www.szabist.edu.pk',
    history: 'Established in 2003, SZABIST Hyderabad is a campus of SZABIST.',
    goodPoints: [
      'Part of SZABIST system',
      'Good programs',
    ],
    badPoints: [
      'High fees',
      'Location in Hyderabad',
    ],
    image: '📊',
  },
  {
    id: 76,
    name: 'Iqra National University',
    location: 'Peshawar',
    established: 2012,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law'],
    ranking: 'Rank #72',
    tuitionFee: 'PKR 180,000 - 300,000/year',
    entryTest: 'INU Test / NTS',
    website: 'https://www.inu.edu.pk',
    history: 'Established in 2012, INU is a private university in Peshawar.',
    goodPoints: [
      'Modern programs',
      'Growing reputation',
    ],
    badPoints: [
      'Very new',
      'High fees',
    ],
    image: '📖',
  },
  {
    id: 77,
    name: 'Abasyn University',
    location: 'Peshawar, Islamabad',
    established: 2007,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Pharmacy'],
    ranking: 'Rank #73',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'Abasyn Test / NTS',
    website: 'https://www.abasyn.edu.pk',
    history: 'Established in 2007, Abasyn is a private university with campuses in Peshawar and Islamabad.',
    goodPoints: [
      'Multiple campuses',
      'Good programs',
      'Modern facilities',
    ],
    badPoints: [
      'High fees',
      'Newer university',
    ],
    image: '🏛️',
  },
  {
    id: 78,
    name: 'Qarshi University',
    location: 'Lahore',
    established: 2011,
    type: 'Private',
    programs: ['Pharmacy', 'Business', 'Computer Science', 'Social Sciences'],
    ranking: 'Rank #74',
    tuitionFee: 'PKR 180,000 - 300,000/year',
    entryTest: 'Qarshi Test / NTS',
    website: 'https://www.qarshi.edu.pk',
    history: 'Established in 2011, Qarshi University is a private institution in Lahore.',
    goodPoints: [
      'Good pharmacy programs',
      'Modern facilities',
    ],
    badPoints: [
      'Very new',
      'High fees',
    ],
    image: '💊',
  },
  {
    id: 79,
    name: 'Superior University',
    location: 'Lahore',
    established: 2000,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences'],
    ranking: 'Rank #75',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'Superior Test / NTS',
    website: 'https://www.superior.edu.pk',
    history: 'Established in 2000, Superior University is a private institution in Lahore.',
    goodPoints: [
      'Good business programs',
      'Modern facilities',
      'Growing reputation',
    ],
    badPoints: [
      'High fees',
      'Limited to Lahore',
    ],
    image: '🏢',
  },
  {
    id: 80,
    name: 'UCP - University of Central Punjab',
    location: 'Lahore',
    established: 2002,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences'],
    ranking: 'Rank #19',
    tuitionFee: 'PKR 200,000 - 300,000/year',
    entryTest: 'UCP Test / NTS',
    website: 'https://www.ucp.edu.pk',
    history: 'Established in 2002, UCP is a private university in Lahore offering programs in business, technology, and law.',
    goodPoints: [
      'Good business programs',
      'Modern facilities',
      'Central location',
      'Growing reputation',
    ],
    badPoints: [
      'Newer university',
      'High fees',
      'Limited to Lahore',
    ],
    image: '🏛️',
  },
  {
    id: 81,
    name: 'Virtual University of Pakistan',
    location: 'Lahore (Virtual)',
    established: 2002,
    type: 'Public',
    programs: ['Computer Science', 'Business', 'Mathematics', 'Education', 'IT'],
    ranking: 'Rank #76',
    tuitionFee: 'PKR 15,000 - 40,000/year',
    entryTest: 'VU Test',
    website: 'https://www.vu.edu.pk',
    history: 'Established in 2002, Virtual University is Pakistan\'s first online university, making education accessible nationwide.',
    goodPoints: [
      'Very affordable',
      'Online learning',
      'Accessible nationwide',
      'Flexible schedules',
    ],
    badPoints: [
      'Online only',
      'Less interactive',
      'Self-discipline required',
    ],
    image: '💻',
  },
  {
    id: 82,
    name: 'Greenwich University',
    location: 'Karachi',
    established: 1998,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law'],
    ranking: 'Rank #77',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'Greenwich Test / NTS',
    website: 'https://www.greenwich.edu.pk',
    history: 'Established in 1998, Greenwich University is a private institution in Karachi.',
    goodPoints: [
      'Good programs',
      'Modern facilities',
    ],
    badPoints: [
      'High fees',
      'Limited to Karachi',
    ],
    image: '🌿',
  },
  {
    id: 83,
    name: 'Ziauddin University',
    location: 'Karachi',
    established: 1995,
    type: 'Private',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Business'],
    ranking: 'Rank #78',
    tuitionFee: 'PKR 400,000 - 800,000/year',
    entryTest: 'Ziauddin Test',
    website: 'https://www.zu.edu.pk',
    history: 'Established in 1995, Ziauddin University is a private medical university in Karachi.',
    goodPoints: [
      'Good medical programs',
      'Modern facilities',
      'Strong programs',
    ],
    badPoints: [
      'Very high fees',
      'Limited to health sciences',
    ],
    image: '🏥',
  },
  {
    id: 84,
    name: 'DHA Suffa University',
    location: 'Karachi',
    established: 2012,
    type: 'Private',
    programs: ['Engineering', 'Computer Science', 'Business', 'Management Sciences'],
    ranking: 'Rank #79',
    tuitionFee: 'PKR 250,000 - 400,000/year',
    entryTest: 'DSU Test / NTS',
    website: 'https://www.dsu.edu.pk',
    history: 'Established in 2012, DHA Suffa University is a private institution in Karachi.',
    goodPoints: [
      'Modern facilities',
      'Good engineering programs',
      'Growing reputation',
    ],
    badPoints: [
      'Very new',
      'High fees',
    ],
    image: '🏗️',
  },
  {
    id: 85,
    name: 'Indus University',
    location: 'Karachi',
    established: 2004,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law'],
    ranking: 'Rank #80',
    tuitionFee: 'PKR 180,000 - 300,000/year',
    entryTest: 'Indus Test / NTS',
    website: 'https://www.indus.edu.pk',
    history: 'Established in 2004, Indus University is a private institution in Karachi.',
    goodPoints: [
      'Good programs',
      'Modern facilities',
    ],
    badPoints: [
      'High fees',
      'Limited to Karachi',
    ],
    image: '🏛️',
  },
  {
    id: 86,
    name: 'Hamdard University',
    location: 'Karachi',
    established: 1991,
    type: 'Private',
    programs: ['Medicine', 'Pharmacy', 'Engineering', 'Business', 'Law'],
    ranking: 'Rank #81',
    tuitionFee: 'PKR 300,000 - 600,000/year',
    entryTest: 'Hamdard Test',
    website: 'https://www.hamdard.edu.pk',
    history: 'Established in 1991, Hamdard University is a private institution in Karachi offering diverse programs.',
    goodPoints: [
      'Good medical programs',
      'Diverse programs',
      'Established reputation',
    ],
    badPoints: [
      'High fees',
      'Limited to Karachi',
    ],
    image: '🌿',
  },
  {
    id: 87,
    name: 'Textile Institute of Pakistan',
    location: 'Karachi',
    established: 1994,
    type: 'Private',
    programs: ['Textile Engineering', 'Fashion Design', 'Business', 'Textile Sciences'],
    ranking: 'Rank #82',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'TIP Test / NTS',
    website: 'https://www.tip.edu.pk',
    history: 'Established in 1994, TIP is a specialized institution focusing on textile engineering and fashion.',
    goodPoints: [
      'Specialized in textiles',
      'Unique programs',
      'Good industry connections',
    ],
    badPoints: [
      'Very specialized',
      'Limited program diversity',
    ],
    image: '🧵',
  },
  {
    id: 88,
    name: 'Preston University',
    location: 'Karachi, Islamabad, Peshawar',
    established: 1984,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Social Sciences'],
    ranking: 'Rank #83',
    tuitionFee: 'PKR 150,000 - 300,000/year',
    entryTest: 'Preston Test / NTS',
    website: 'https://www.preston.edu.pk',
    history: 'Established in 1984, Preston University has multiple campuses across Pakistan.',
    goodPoints: [
      'Multiple campuses',
      'Established reputation',
      'Diverse programs',
    ],
    badPoints: [
      'Varying quality across campuses',
      'High fees',
    ],
    image: '🏛️',
  },
  {
    id: 89,
    name: 'Mohammad Ali Jinnah University',
    location: 'Karachi',
    established: 1998,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences'],
    ranking: 'Rank #34',
    tuitionFee: 'PKR 200,000 - 300,000/year',
    entryTest: 'MAJU Test / NTS',
    website: 'https://www.jinnah.edu',
    history: 'Established in 1998, MAJU is a private university in Karachi offering programs in business, technology, and law.',
    goodPoints: [
      'Good business programs',
      'Modern facilities',
      'Central location',
      'Growing reputation',
    ],
    badPoints: [
      'Newer university',
      'High fees',
      'Limited to Karachi',
    ],
    image: '🎯',
  },
  {
    id: 90,
    name: 'Karachi University',
    location: 'Karachi',
    established: 1951,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Law', 'Medicine', 'Engineering'],
    ranking: 'Rank #8',
    tuitionFee: 'PKR 50,000 - 100,000/year',
    entryTest: 'KU Entry Test',
    website: 'https://www.uok.edu.pk',
    history: 'Established in 1951, KU is one of the largest public universities in Pakistan, offering a wide range of programs.',
    goodPoints: [
      'Very affordable',
      'Wide range of programs',
      'Large university',
      'Central location',
    ],
    badPoints: [
      'Large class sizes',
      'Older infrastructure',
      'Administrative challenges',
      'Limited modern facilities',
    ],
    image: '📚',
  },
  {
    id: 91,
    name: 'University of Haripur',
    location: 'Haripur',
    established: 2012,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #84',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'UOH Test',
    website: 'https://www.uoh.edu.pk',
    history: 'Established in 2012, UOH is a public university in Haripur.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 92,
    name: 'University of Swat',
    location: 'Swat',
    established: 2010,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #85',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOS Test',
    website: 'https://www.uswat.edu.pk',
    history: 'Established in 2010, University of Swat is a public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Newer university',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 93,
    name: 'University of Swabi',
    location: 'Swabi',
    established: 2012,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #86',
    tuitionFee: 'PKR 55,000 - 95,000/year',
    entryTest: 'UOS Test',
    website: 'https://www.uoswabi.edu.pk',
    history: 'Established in 2012, University of Swabi is a public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 94,
    name: 'University of Chitral',
    location: 'Chitral',
    established: 2019,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #87',
    tuitionFee: 'PKR 40,000 - 80,000/year',
    entryTest: 'UOC Test',
    website: 'https://www.uoch.edu.pk',
    history: 'Established in 2019, University of Chitral is a newer public university.',
    goodPoints: [
      'Very affordable',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Very remote location',
    ],
    image: '🏛️',
  },
  {
    id: 95,
    name: 'University of Turbat',
    location: 'Turbat',
    established: 2019,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #88',
    tuitionFee: 'PKR 40,000 - 80,000/year',
    entryTest: 'UOT Test',
    website: 'https://www.uot.edu.pk',
    history: 'Established in 2019, University of Turbat is a newer public university in Balochistan.',
    goodPoints: [
      'Very affordable',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Very remote location',
    ],
    image: '🏛️',
  },
  {
    id: 96,
    name: 'Lasbela University',
    location: 'Lasbela',
    established: 2017,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #89',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'LU Test',
    website: 'https://www.lu.edu.pk',
    history: 'Established in 2017, Lasbela University is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 97,
    name: 'University of Loralai',
    location: 'Loralai',
    established: 2016,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #90',
    tuitionFee: 'PKR 45,000 - 85,000/year',
    entryTest: 'UOL Test',
    website: 'https://www.uol.edu.pk',
    history: 'Established in 2016, University of Loralai is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 98,
    name: 'University of Sahiwal',
    location: 'Sahiwal',
    established: 2015,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #91',
    tuitionFee: 'PKR 55,000 - 95,000/year',
    entryTest: 'UOS Test',
    website: 'https://www.uosahiwal.edu.pk',
    history: 'Established in 2015, University of Sahiwal is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Sahiwal',
    ],
    image: '🏛️',
  },
  {
    id: 99,
    name: 'University of Okara',
    location: 'Okara',
    established: 2018,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #92',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOO Test',
    website: 'https://www.uokara.edu.pk',
    history: 'Established in 2018, University of Okara is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Okara',
    ],
    image: '🏛️',
  },
  {
    id: 100,
    name: 'University of Narowal',
    location: 'Narowal',
    established: 2019,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #93',
    tuitionFee: 'PKR 45,000 - 85,000/year',
    entryTest: 'UON Test',
    website: 'https://www.uon.edu.pk',
    history: 'Established in 2019, University of Narowal is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Narowal',
    ],
    image: '🏛️',
  },
  {
    id: 101,
    name: 'University of Kotli',
    location: 'Kotli, AJK',
    established: 2014,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #94',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOK Test',
    website: 'https://www.uok.edu.pk',
    history: 'Established in 2014, University of Kotli is a public university in Azad Kashmir.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Newer university',
      'Location in AJK',
    ],
    image: '🏛️',
  },
  {
    id: 102,
    name: 'Mirpur University of Science and Technology',
    location: 'Mirpur, AJK',
    established: 2009,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Business', 'Sciences'],
    ranking: 'Rank #95',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'MUST Test',
    website: 'https://www.must.edu.pk',
    history: 'Established in 2009, MUST is a public university in Azad Kashmir.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
    ],
    badPoints: [
      'Location in AJK',
      'Newer university',
    ],
    image: '🔧',
  },
  {
    id: 103,
    name: 'University of Azad Jammu and Kashmir',
    location: 'Muzaffarabad, AJK',
    established: 1980,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering', 'Law'],
    ranking: 'Rank #96',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UAJK Test',
    website: 'https://www.uajk.edu.pk',
    history: 'Established in 1980, UAJK is a public university in Azad Kashmir.',
    goodPoints: [
      'Affordable fees',
      'Wide range of programs',
    ],
    badPoints: [
      'Location in AJK',
      'Older infrastructure',
    ],
    image: '🏛️',
  },
  {
    id: 104,
    name: 'Karakuram International University',
    location: 'Gilgit',
    established: 2002,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering', 'Education'],
    ranking: 'Rank #97',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'KIU Test',
    website: 'https://www.kiu.edu.pk',
    history: 'Established in 2002, KIU is a public university in Gilgit-Baltistan.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
      'Beautiful location',
    ],
    badPoints: [
      'Remote location',
      'Newer university',
    ],
    image: '🏔️',
  },
  {
    id: 105,
    name: 'University of Baltistan',
    location: 'Skardu',
    established: 2017,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #98',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOB Test',
    website: 'https://www.uob.edu.pk',
    history: 'Established in 2017, University of Baltistan is a newer public university in Skardu.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
      'Beautiful location',
    ],
    badPoints: [
      'Very new',
      'Very remote location',
    ],
    image: '🏔️',
  },
  {
    id: 106,
    name: 'University of Faisalabad',
    location: 'Faisalabad',
    established: 2002,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Pharmacy'],
    ranking: 'Rank #99',
    tuitionFee: 'PKR 180,000 - 300,000/year',
    entryTest: 'UOF Test / NTS',
    website: 'https://www.uof.edu.pk',
    history: 'Established in 2002, University of Faisalabad is a private institution.',
    goodPoints: [
      'Good programs',
      'Modern facilities',
    ],
    badPoints: [
      'High fees',
      'Location in Faisalabad',
    ],
    image: '🏛️',
  },
  {
    id: 107,
    name: 'University of South Asia',
    location: 'Lahore',
    established: 2003,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law'],
    ranking: 'Rank #100',
    tuitionFee: 'PKR 200,000 - 350,000/year',
    entryTest: 'USA Test / NTS',
    website: 'https://www.usa.edu.pk',
    history: 'Established in 2003, University of South Asia is a private institution in Lahore.',
    goodPoints: [
      'Good programs',
      'Modern facilities',
    ],
    badPoints: [
      'High fees',
      'Limited to Lahore',
    ],
    image: '🌏',
  },
  {
    id: 108,
    name: 'University of Management and Technology',
    location: 'Lahore',
    established: 1990,
    type: 'Private',
    programs: ['Business', 'Computer Science', 'Engineering', 'Law', 'Media Sciences', 'Social Sciences'],
    ranking: 'Rank #20',
    tuitionFee: 'PKR 250,000 - 400,000/year',
    entryTest: 'UMT Test / NTS',
    website: 'https://www.umt.edu.pk',
    history: 'Established in 1990, UMT is a private university in Lahore known for its business and management programs.',
    goodPoints: [
      'Excellent business programs',
      'Modern campus',
      'Good placement rates',
      'Strong industry connections',
      'Diverse programs',
    ],
    badPoints: [
      'High tuition fees',
      'Limited to Lahore',
      'Competitive admission',
    ],
    image: '💼',
  },
  {
    id: 109,
    name: 'University of Wah',
    location: 'Wah',
    established: 2011,
    type: 'Public',
    programs: ['Engineering', 'Computer Science', 'Business'],
    ranking: 'Rank #101',
    tuitionFee: 'PKR 80,000 - 120,000/year',
    entryTest: 'UOW Test',
    website: 'https://www.uow.edu.pk',
    history: 'Established in 2011, University of Wah is a public engineering university.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
    ],
    badPoints: [
      'Newer university',
      'Location in Wah',
      'Limited programs',
    ],
    image: '🔧',
  },
  {
    id: 110,
    name: 'University of Engineering and Technology Mardan',
    location: 'Mardan',
    established: 2002,
    type: 'Public',
    programs: ['Engineering', 'Computer Science'],
    ranking: 'Rank #57',
    tuitionFee: 'PKR 70,000 - 110,000/year',
    entryTest: 'ECAT',
    website: 'https://www.uetmardan.edu.pk',
    history: 'Established in 2002, UET Mardan is a public engineering university.',
    goodPoints: [
      'Affordable fees',
      'Good engineering programs',
    ],
    badPoints: [
      'Newer university',
      'Location in Mardan',
      'Limited programs',
    ],
    image: '⚙️',
  },
  {
    id: 111,
    name: 'University of Sialkot',
    location: 'Sialkot',
    established: 2013,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #102',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'UOS Test',
    website: 'https://www.uos.edu.pk',
    history: 'Established in 2013, University of Sialkot is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Sialkot',
    ],
    image: '🏛️',
  },
  {
    id: 112,
    name: 'University of Jhang',
    location: 'Jhang',
    established: 2012,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #103',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOJ Test',
    website: 'https://www.uoj.edu.pk',
    history: 'Established in 2012, University of Jhang is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Jhang',
    ],
    image: '🏛️',
  },
  {
    id: 113,
    name: 'University of Chakwal',
    location: 'Chakwal',
    established: 2017,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #104',
    tuitionFee: 'PKR 55,000 - 95,000/year',
    entryTest: 'UOC Test',
    website: 'https://www.uoc.edu.pk',
    history: 'Established in 2017, University of Chakwal is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Chakwal',
    ],
    image: '🏛️',
  },
  {
    id: 114,
    name: 'University of Layyah',
    location: 'Layyah',
    established: 2016,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #105',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOL Test',
    website: 'https://www.uol.edu.pk',
    history: 'Established in 2016, University of Layyah is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Layyah',
    ],
    image: '🏛️',
  },
  {
    id: 115,
    name: 'University of Vehari',
    location: 'Vehari',
    established: 2018,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #106',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOV Test',
    website: 'https://www.uov.edu.pk',
    history: 'Established in 2018, University of Vehari is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Vehari',
    ],
    image: '🏛️',
  },
  {
    id: 116,
    name: 'University of Mianwali',
    location: 'Mianwali',
    established: 2019,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #107',
    tuitionFee: 'PKR 45,000 - 85,000/year',
    entryTest: 'UOM Test',
    website: 'https://www.uom.edu.pk',
    history: 'Established in 2019, University of Mianwali is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in Mianwali',
    ],
    image: '🏛️',
  },
  {
    id: 117,
    name: 'University of Buner',
    location: 'Buner',
    established: 2016,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #108',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOB Test',
    website: 'https://www.uob.edu.pk',
    history: 'Established in 2016, University of Buner is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 118,
    name: 'University of Lakki Marwat',
    location: 'Lakki Marwat',
    established: 2017,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #109',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'UOLM Test',
    website: 'https://www.uolm.edu.pk',
    history: 'Established in 2017, University of Lakki Marwat is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 119,
    name: 'University of Kohat',
    location: 'Kohat',
    established: 2010,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #110',
    tuitionFee: 'PKR 60,000 - 100,000/year',
    entryTest: 'UOK Test',
    website: 'https://www.uok.edu.pk',
    history: 'Established in 2010, University of Kohat is a public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Newer university',
      'Location in Kohat',
    ],
    image: '🏛️',
  },
  {
    id: 120,
    name: 'University of Dera Ghazi Khan',
    location: 'Dera Ghazi Khan',
    established: 2012,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Engineering'],
    ranking: 'Rank #111',
    tuitionFee: 'PKR 55,000 - 95,000/year',
    entryTest: 'UDGK Test',
    website: 'https://www.udgk.edu.pk',
    history: 'Established in 2012, University of Dera Ghazi Khan is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Location in DG Khan',
    ],
    image: '🏛️',
  },
  {
    id: 121,
    name: 'University of Rahim Yar Khan',
    location: 'Rahim Yar Khan',
    established: 2014,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #112',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'URYK Test',
    website: 'https://www.uryk.edu.pk',
    history: 'Established in 2014, University of Rahim Yar Khan is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Newer university',
      'Location in RYK',
    ],
    image: '🏛️',
  },
  {
    id: 122,
    name: 'University of Sindh',
    location: 'Jamshoro',
    established: 1947,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Law', 'Medicine', 'Engineering'],
    ranking: 'Rank #113',
    tuitionFee: 'PKR 40,000 - 80,000/year',
    entryTest: 'US Test',
    website: 'https://www.usindh.edu.pk',
    history: 'Established in 1947, University of Sindh is one of the oldest universities in Pakistan.',
    goodPoints: [
      'Very affordable',
      'Wide range of programs',
      'Rich history',
      'Large university',
    ],
    badPoints: [
      'Older infrastructure',
      'Large class sizes',
      'Administrative challenges',
    ],
    image: '📚',
  },
  {
    id: 123,
    name: 'Shah Abdul Latif University',
    location: 'Khairpur',
    established: 1987,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Social Sciences', 'Education'],
    ranking: 'Rank #53',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'SAUT Test',
    website: 'https://www.salu.edu.pk',
    history: 'Established in 1987, SAUT is a public university in Khairpur.',
    goodPoints: [
      'Very affordable',
      'Wide range of programs',
    ],
    badPoints: [
      'Remote location',
      'Older infrastructure',
    ],
    image: '🏛️',
  },
  {
    id: 124,
    name: 'Liaquat University of Medical and Health Sciences',
    location: 'Jamshoro',
    established: 2001,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Public Health'],
    ranking: 'Rank #49',
    tuitionFee: 'PKR 150,000 - 250,000/year',
    entryTest: 'LUMHS Test',
    website: 'https://www.lumhs.edu.pk',
    history: 'Established in 2001, LUMHS is a public medical university in Jamshoro.',
    goodPoints: [
      'Affordable medical education',
      'Public university',
      'Good programs',
    ],
    badPoints: [
      'Limited to health sciences',
      'Location in Jamshoro',
    ],
    image: '⚕️',
  },
  {
    id: 125,
    name: 'Dow University of Health Sciences',
    location: 'Karachi',
    established: 2003,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Public Health'],
    ranking: 'Rank #37',
    tuitionFee: 'PKR 200,000 - 400,000/year',
    entryTest: 'DUHS Test',
    website: 'https://www.duhs.edu.pk',
    history: 'Established in 2003, DUHS is a public university in Karachi specializing in health sciences.',
    goodPoints: [
      'Affordable health sciences',
      'Good medical programs',
      'Public university',
      'Strong programs',
    ],
    badPoints: [
      'Limited to health sciences',
      'Competitive admission',
      'Large class sizes',
    ],
    image: '⚕️',
  },
  {
    id: 126,
    name: 'Jinnah Sindh Medical University',
    location: 'Karachi',
    established: 2012,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Allied Health'],
    ranking: 'Rank #38',
    tuitionFee: 'PKR 150,000 - 300,000/year',
    entryTest: 'JSMU Test',
    website: 'https://www.jsmuh.edu.pk',
    history: 'Established in 2012, JSMU is a public medical university in Karachi.',
    goodPoints: [
      'Affordable medical education',
      'Public university',
      'Good programs',
    ],
    badPoints: [
      'Newer university',
      'Limited to health sciences',
    ],
    image: '🏥',
  },
  {
    id: 127,
    name: 'Khyber Medical University',
    location: 'Peshawar',
    established: 2006,
    type: 'Public',
    programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Public Health'],
    ranking: 'Rank #39',
    tuitionFee: 'PKR 100,000 - 200,000/year',
    entryTest: 'KMU Test',
    website: 'https://www.kmu.edu.pk',
    history: 'Established in 2006, KMU is a public medical university in Peshawar.',
    goodPoints: [
      'Affordable medical education',
      'Public university',
      'Good programs',
    ],
    badPoints: [
      'Limited to health sciences',
      'Location in Peshawar',
    ],
    image: '⚕️',
  },
  {
    id: 128,
    name: 'Shaheed Benazir Bhutto University',
    location: 'Sheringal',
    established: 2012,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #114',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'SBBU Test',
    website: 'https://www.sbbu.edu.pk',
    history: 'Established in 2012, SBBU is a newer public university.',
    goodPoints: [
      'Affordable fees',
      'Diverse programs',
    ],
    badPoints: [
      'Very new',
      'Remote location',
    ],
    image: '🏛️',
  },
  {
    id: 129,
    name: 'Women University Swabi',
    location: 'Swabi',
    established: 2013,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #115',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'WUS Test',
    website: 'https://www.wus.edu.pk',
    history: 'Established in 2013, Women University Swabi is a public women\'s university.',
    goodPoints: [
      'Affordable fees',
      'Women-focused',
      'Diverse programs',
    ],
    badPoints: [
      'Women only',
      'Very new',
      'Location in Swabi',
    ],
    image: '👩‍🎓',
  },
  {
    id: 130,
    name: 'Women University Azad Jammu and Kashmir',
    location: 'Bagh, AJK',
    established: 2013,
    type: 'Public',
    programs: ['Arts', 'Sciences', 'Business', 'Education'],
    ranking: 'Rank #116',
    tuitionFee: 'PKR 50,000 - 90,000/year',
    entryTest: 'WUAJK Test',
    website: 'https://www.wuajk.edu.pk',
    history: 'Established in 2013, WUAJK is a public women\'s university in Azad Kashmir.',
    goodPoints: [
      'Affordable fees',
      'Women-focused',
      'Diverse programs',
    ],
    badPoints: [
      'Women only',
      'Very new',
      'Location in AJK',
    ],
    image: '👩‍🎓',
  },
];

const ExploreUniversities = () => {
  const { theme } = useTheme();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Get all unique programs
  const allPrograms = useMemo(() => {
    const programs = new Set();
    universitiesData.forEach(uni => {
      uni.programs.forEach(prog => programs.add(prog));
    });
    return Array.from(programs).sort();
  }, []);

  // Get all unique locations
  const allLocations = useMemo(() => {
    const locations = new Set();
    universitiesData.forEach(uni => {
      const locs = uni.location.split(',').map(l => l.trim());
      locs.forEach(loc => locations.add(loc));
    });
    return Array.from(locations).sort();
  }, []);

  // Filter universities
  const filteredUniversities = useMemo(() => {
    return universitiesData.filter(uni => {
      // Search filter
      const matchesSearch = !searchTerm || 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Program filter
      const matchesProgram = selectedProgram === 'all' || 
        uni.programs.some(p => p.toLowerCase().includes(selectedProgram.toLowerCase()));

      // Location filter
      const matchesLocation = selectedLocation === 'all' ||
        uni.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Type filter
      const matchesType = selectedType === 'all' || uni.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesProgram && matchesLocation && matchesType;
    });
  }, [searchTerm, selectedProgram, selectedLocation, selectedType]);

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700'
    }`}>
      <Navbar />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Explore Universities in Pakistan
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg">
              Discover comprehensive information about universities across Pakistan
            </p>
          </div>

          {/* Filters */}
          <div className={`mb-8 p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Search */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Search</label>
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>

              {/* Program Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Program</label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option value="all">All Programs</option>
                  {allPrograms.map(prog => (
                    <option key={prog} value={prog}>{prog}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option value="all">All Locations</option>
                  {allLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredUniversities.length} of {universitiesData.length} universities
            </div>
          </div>

          {/* Universities List */}
          {filteredUniversities.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-white/80'}`}>
                No universities found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((university) => (
                <div
                  key={university.id}
                  onClick={() => setSelectedUniversity(university)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all hover:shadow-xl ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                      : 'bg-white/90 border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{university.image}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      university.type === 'Public' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {university.type}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>{university.name}</h3>
                  <p className={`text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>📍 {university.location}</p>
                  <p className={`text-sm mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>📅 Established: {university.established}</p>
                  <div className="mb-3">
                    <p className={`text-xs mb-1 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>Programs Offered:</p>
                    <div className="flex flex-wrap gap-1">
                      {university.programs.slice(0, 3).map((prog, idx) => (
                        <span key={idx} className={`px-2 py-1 rounded text-xs ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {prog}
                        </span>
                      ))}
                      {university.programs.length > 3 && (
                        <span className={`px-2 py-1 rounded text-xs ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          +{university.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>{university.ranking}</span>
                    <button className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm touch-manipulation min-h-[44px] ${
                      theme === 'dark'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* University Detail Modal */}
      {selectedUniversity && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/50'
        } backdrop-blur-sm p-4 overflow-y-auto`}>
          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto`}>
            {/* Header */}
            <div className="sticky top-0 flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{selectedUniversity.image}</span>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>{selectedUniversity.name}</h2>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      📍 {selectedUniversity.location}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUniversity(null)}
                className={`p-2 rounded-lg hover:bg-gray-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Established
                  </p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {selectedUniversity.established}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Type
                  </p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {selectedUniversity.type}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ranking
                  </p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {selectedUniversity.ranking}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Entry Test
                  </p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {selectedUniversity.entryTest}
                  </p>
                </div>
              </div>

              {/* History */}
              <div>
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>History</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedUniversity.history}
                </p>
              </div>

              {/* Programs */}
              <div>
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>Programs Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUniversity.programs.map((prog, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {prog}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tuition Fee */}
              <div>
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>Tuition Fee</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedUniversity.tuitionFee}
                </p>
              </div>

              {/* Good Points */}
              <div>
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>✅ Strengths</h3>
                <ul className={`list-disc list-inside space-y-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {selectedUniversity.goodPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Bad Points */}
              <div>
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>⚠️ Considerations</h3>
                <ul className={`list-disc list-inside space-y-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {selectedUniversity.badPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Website */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href={selectedUniversity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all text-center touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  Visit Official Website
                </a>
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ExploreUniversities;

