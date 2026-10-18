import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api";

const TeacherForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    experience: "",
    skills: "",
    teachingExperience: "",
    courses: "",
    availability: "",
    timing: "",
    portfolio: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cleanedData = {
        ...formData,
        experience: formData.experience ? Number(formData.experience) : 0,
      };

      const res = await fetch(apiUrl("/api/teachers"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Teacher Application Submitted Successfully!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Network Error");
    }

    setIsLoading(false);
  };

  const inputClass =
    "w-full bg-slate-800/60 border border-slate-600/50 text-slate-100 placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-slate-800 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200";

  const selectClass =
    "w-full bg-slate-800/60 border border-slate-600/50 text-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-slate-800 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200 appearance-none cursor-pointer";

  const labelClass =
    "block text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-2";

  const SectionHeader = ({ number, title }) => (
    <div className="flex items-center gap-4 mb-7">
      <div className="flex-shrink-0 w-8 h-8 rounded bg-amber-400 flex items-center justify-center">
        <span className="text-slate-900 font-bold text-sm">{number}</span>
      </div>
      <h2 className="text-white font-semibold text-base tracking-wide">
        {title}
      </h2>
      <div className="flex-1 h-px bg-slate-700" />
    </div>
  );

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[58vh] bg-cover bg-center pt-15 flex items-end"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />

        {/* decorative vertical line */}
        <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/30 to-transparent hidden md:block" />

        <div className="relative z-10 px-8 md:px-16 pb-16 max-w-3xl">
          {/* badge */}
          <span className="inline-flex items-center gap-2 border border-amber-400/40 text-amber-300 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-sm mb-6 bg-amber-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Accepting Applications
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 tracking-tight">
            Share Your{" "}
            <span className="text-amber-400 italic font-light">Expertise</span>
            <br />
            with the World.
          </h1>

          <div className="w-14 h-0.5 bg-amber-400 mb-5" />

          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-md">
            Join our instructor community and teach real-world skills to
            students who are ready to grow.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <div className="bg-slate-900 min-h-screen py-16 px-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto bg-slate-800/50 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
        >
          <div className="p-8 md:p-12">
            {/* ─ Personal Info ─ */}
            <SectionHeader number="1" title="Personal Information" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  name="name"
                  placeholder="e.g. Ayesha Khan"
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  Phone Number <span className="text-amber-400">*</span>
                </label>
                <input
                  name="phone"
                  placeholder="+92 300 0000000"
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Full Address</label>
                <input
                  name="address"
                  placeholder="City, Country"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* divider */}
            <div className="border-t border-slate-700/60 mb-10" />

            {/* ─ Professional Info ─ */}
            <SectionHeader number="2" title="Professional Background" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div>
                <label className={labelClass}>Qualification</label>
                <input
                  name="qualification"
                  placeholder="e.g. B.Sc Computer Science"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Experience (Years)</label>
                <input
                  name="experience"
                  placeholder="e.g. 5"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Skills</label>
                <input
                  name="skills"
                  placeholder="e.g. React, Node.js, Figma"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Teaching Experience</label>
                <input
                  name="teachingExperience"
                  placeholder="e.g. 2 years online tutoring"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* divider */}
            <div className="border-t border-slate-700/60 mb-10" />

            {/* ─ Course & Availability ─ */}
            <SectionHeader number="3" title="Course & Availability" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Course to Teach</label>
                <div className="relative">
                  <select
                    name="courses"
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Select a course</option>
                    <option value="web_development">Web Development</option>
                    <option value="web_app">Web App Development</option>
                    <option value="mobile_app">Mobile App Development</option>
                      {/* Design */}
                    <option value="uiux">UI / UX Design</option>
                    <option value="graphic_design">Graphic Design</option>
                     {/* Other Tech */}
                    <option value="database">Database Management</option>

                   {/* Programming */}
                  <option value="python">Python Programming</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                    ▾
                  </span>
                </div>
              </div>
              <div>
                <label className={labelClass}>Availability</label>
                <div className="relative">
                  <select
                    name="availability"
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Select availability</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                    ▾
                  </span>
                </div>
              </div>
              <div>
                <label className={labelClass}>Preferred Timing</label>
                <input
                  name="timing"
                  placeholder="e.g. Mon–Fri, 5 PM – 8 PM"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Portfolio Link</label>
                <input
                  name="portfolio"
                  placeholder="https://yourportfolio.com"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* ─ Submit Footer ─ */}
          <div className="bg-slate-900/70 border-t border-slate-700/60 px-8 md:px-12 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              Applications are reviewed within{" "}
              <span className="text-slate-300">3–5 business days</span>. By
              submitting you agree to our instructor terms.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold text-sm tracking-wide px-8 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
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
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TeacherForm;
