import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const ApplyHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent hidden md:block pointer-events-none" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent hidden md:block pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 border border-amber-400/40 text-amber-300 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-sm mb-6 bg-amber-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Join Our Community
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
            Choose Your{" "}
            <span className="text-amber-400 italic font-light">Path.</span>
          </h1>

          <div className="w-14 h-0.5 bg-amber-400 mx-auto mb-5" />

          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
            Select how you want to join our learning community and take the next
            step forward.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Card */}
          <div
            onClick={() => navigate("/apply/student")}
            className="group relative bg-slate-800/50 border border-slate-700/60 rounded-2xl p-10 cursor-pointer transition-all duration-300 hover:border-amber-400/50 hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-400/5 overflow-hidden"
          >
            {/* hover top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            {/* icon */}
            <div className="w-16 h-16 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-8 group-hover:bg-amber-400/20 transition-colors duration-300">
              <FaUserGraduate className="text-2xl text-amber-400" />
            </div>

            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-slate-500">
                For Learners
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
              Apply as Student
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Learn from expert instructors, build real-world skills, and
              accelerate your career.
            </p>

            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => navigate("/apply/teacher")}
            className="group relative bg-slate-800/50 border border-slate-700/60 rounded-2xl p-10 cursor-pointer transition-all duration-300 hover:border-amber-400/50 hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-400/5 overflow-hidden"
          >
            {/* hover top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            {/* icon */}
            <div className="w-16 h-16 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-8 group-hover:bg-amber-400/20 transition-colors duration-300">
              <FaChalkboardTeacher className="text-2xl text-amber-400" />
            </div>

            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-slate-500">
                For Educators
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
              Apply as Teacher
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Share your expertise, inspire thousands of students, and make a
              lasting impact.
            </p>

            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
              Start Teaching
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-600 text-xs tracking-wide mt-10">
          Need help?{" "}
          <span className="text-amber-400/70 cursor-pointer hover:text-amber-400 transition-colors">
            Contact our support team
          </span>
        </p>
      </div>
    </div>
  );
};

export default ApplyHome;
