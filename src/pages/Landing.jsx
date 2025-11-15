import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useRevealOnScroll from '../utils/useRevealOnScroll';

const Stat = ({ label, value }) => (
  <div className="glass rounded-xl p-5 text-center reveal-init" >
    <div className="text-3xl md:text-4xl font-extrabold text-white">{value}</div>
    <div className="text-white/70 text-sm mt-1">{label}</div>
  </div>
);

const TestimonialCard = ({ quote, name, title }) => {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref} className="glass rounded-2xl p-6 md:p-8 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-pink-500" />
        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-white/70 text-sm">{title}</div>
        </div>
      </div>
      <p className="text-white/90 text-lg leading-relaxed">“{quote}”</p>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon, gradient }) => {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref} className="glass rounded-2xl p-6 hover:bg-white/20 transition-colors">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${gradient}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{desc}</p>
    </div>
  );
};

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';
    setIsLoggedIn(loggedIn);
    setUserName(name);
  }, []);

  const heroRef = useRevealOnScroll();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-700 via-violet-700 to-fuchsia-700">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-3xl absolute -top-20 -left-20 floaty" />
          <div className="w-[500px] h-[500px] bg-indigo-500 rounded-full blur-3xl absolute top-40 right-0 floaty" style={{ animationDelay: '1.2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col items-center">
          <div ref={heroRef} className="reveal-init text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Smart University Recommendations
            </div>
            {userName && (
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 via-amber-300 to-white bg-clip-text text-transparent leading-[1.1] tracking-tight mb-2">
                Hello {userName}
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Find your perfect <span className="gradient-text">University Match</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mt-4">
              Personalized, data-driven guidance to help you decide with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              {isLoggedIn ? (
                <>
                  <Link to="/questionnaire" className="px-7 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-md hover:bg-gray-50 transform-gpu will-change-transform scale-100 hover:scale-[1.05]">
                    Continue Questionnaire
                  </Link>
                  <Link to="/recommendations" className="px-7 py-3 bg-white/10 text-white border border-white/20 font-semibold rounded-xl hover:bg-white/20 transform-gpu will-change-transform scale-100 hover:scale-[1.05]">
                    View Recommendations
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="px-7 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition">
                    Get Started
                  </Link>
                  <Link to="/login" className="px-7 py-3 bg-white/10 text-white border border-white/20 font-semibold rounded-xl hover:bg-white/20 transition">
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              <Stat label="Programs" value="2,500+" />
              <Stat label="Universities" value="350+" />
              <Stat label="Countries" value="25" />
              <Stat label="Avg. Match Score" value="92%" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">Why Choose MeritVoyage?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Smart Matching"
              desc="AI-driven matching aligns your academic profile, preferences, and goals with the right programs."
              gradient="bg-gradient-to-br from-blue-400 to-cyan-400"
              icon={
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Comprehensive Data"
              desc="Explore fees, rankings, admission requirements, and more in one place."
              gradient="bg-gradient-to-br from-purple-400 to-pink-400"
              icon={
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <FeatureCard
              title="Quick & Easy"
              desc="Finish the questionnaire in minutes and get instant, ranked recommendations."
              gradient="bg-gradient-to-br from-amber-400 to-orange-400"
              icon={
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">What students say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Ayesha Khan"
              title="BSc Computer Science, Class of 2027"
              quote="I was overwhelmed with choices. The recommendations helped me shortlist confidently in one evening."
            />
            <TestimonialCard
              name="Omar Farooq"
              title="MBA Candidate"
              quote="The matching felt spot-on. I discovered programs I hadn't even considered, with better scholarships."
            />
            <TestimonialCard
              name="Sara Ahmed"
              title="Data Science Aspirant"
              quote="Clean interface, fast questionnaire, and useful insights. Landed an admit that fits my goals."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass rounded-2xl p-8 text-center reveal-init">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to explore your best-fit universities?</h3>
          <p className="text-white/80 mt-2">Start your journey now. It takes just a few minutes.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={isLoggedIn ? '/questionnaire' : '/signup'} className="px-7 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition">
              {isLoggedIn ? 'Continue' : 'Get Started for Free'}
            </Link>
            {!isLoggedIn && (
              <Link to="/login" className="px-7 py-3 bg-white/10 text-white border border-white/20 font-semibold rounded-xl hover:bg-white/20 transition">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

