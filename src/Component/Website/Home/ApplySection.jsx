import React from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ApplySection = () => {
  const navigate = useNavigate();

  const features = [
    "Expert Instructors",
    "Flexible Learning Schedule",
    "Certificate of Completion",
    "Lifetime Access to Materials",
  ];

  const stats = [
    { number: "10K+", label: "Students" },
    { number: "500+", label: "Courses" },
    { number: "50+", label: "Instructors" },
    { number: "100%", label: "Satisfaction" },
  ];

  return (
    <section className="relative bg-slate-900 py-24 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent hidden md:block pointer-events-none" />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        {/* ── Left: Text ── */}
        <div className="md:w-1/2">
          {/* badge */}
          <span className="inline-flex items-center gap-2 border border-amber-400/40 text-amber-300 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-sm mb-6 bg-amber-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Now Enrolling
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
            Ready to Start Your{" "}
            <span className="text-amber-400 italic font-light">Learning</span>{" "}
            Journey?
          </h2>

          <div className="w-14 h-0.5 bg-amber-400 mb-6" />

          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-8 max-w-md">
            Join thousands of students already learning on our platform. Apply
            now and get access to expert-led courses.
          </p>

          {/* Feature list */}
          <ul className="space-y-3 mb-10">
            {features.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                  <FaCheck size={9} className="text-amber-400" />
                </span>
                <span className="text-slate-300 text-sm font-light">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/apply")}
            className="group flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm tracking-wide px-8 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20"
          >
            Apply Now
            <FaArrowRight
              className="group-hover:translate-x-1 transition-transform duration-200"
              size={13}
            />
          </button>
        </div>

        {/* ── Right: Stats ── */}
        <div className="md:w-5/12 grid grid-cols-2 gap-4 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 text-center overflow-hidden transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-400/5"
            >
              {/* top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1 tracking-tight">
                {stat.number}
              </div>
              <div className="text-[10px] tracking-[0.18em] uppercase font-semibold text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
