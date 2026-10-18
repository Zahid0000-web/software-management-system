import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api";

const StudentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    cnic: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    qualification: "",
    institute: "",
    marks: "",
    passingYear: "",
    course: "",
    duration: "",
    mode: "",
    timing: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(apiUrl("/api/students"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Application submitted successfully!");
        navigate("/");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      alert("Network error (backend not running or URL issue)");
    }

    setIsLoading(false);
  };

  const inputClass =
    "w-full bg-slate-800/60 border border-slate-600/50 text-slate-100 placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-slate-800 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200";

  const selectClass =
    "w-full bg-slate-800/60 border border-slate-600/50 text-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-slate-800 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200 appearance-none cursor-pointer";

  const SectionHeader = ({ number, title }) => (
    <div className="flex items-center gap-4 mb-7">
      <div className="w-8 h-8 rounded bg-amber-400 flex items-center justify-center">
        <span className="text-slate-900 font-bold text-sm">{number}</span>
      </div>
      <h2 className="text-white font-semibold text-base">{title}</h2>
      <div className="flex-1 h-px bg-slate-700" />
    </div>
  );

  const SelectWrapper = ({ children }) => (
    <div className="relative">
      {children}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
        ▾
      </span>
    </div>
  );

  return (
    <>
      {/* HERO */}
      <section
        className="relative w-full min-h-[58vh] bg-cover pt-15 bg-center flex items-end"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />

        <div className="relative z-10 px-8 pb-16 max-w-3xl">
          <span className="text-amber-300 text-xs uppercase tracking-widest">
            Enrollments Open
          </span>

          <h1 className="text-4xl font-bold text-white mt-3">
            Start Your Learning Journey
          </h1>

          <p className="text-slate-300 mt-3">
            Apply now to join our courses and upgrade your skills.
          </p>
        </div>
      </section>

      {/* FORM */}
      <div className="bg-slate-900 min-h-screen py-16 px-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl"
        >
          <div className="p-8 md:p-12">
            <SectionHeader number="1" title="Personal Information" />

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className={inputClass}
                required
              />

              <input
                name="fatherName"
                placeholder="Father Name"
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className={inputClass}
              />

              <select
                name="gender"
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                name="cnic"
                placeholder="CNIC"
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <SectionHeader number="2" title="Contact Details" />

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className={inputClass}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className={inputClass}
                required
              />

              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <SectionHeader number="3" title="Education" />

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="qualification"
                placeholder="Qualification"
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="institute"
                placeholder="Institute"
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="marks"
                placeholder="Marks"
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="passingYear"
                placeholder="Passing Year"
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <SectionHeader number="4" title="Course Preference" />

            <div className="grid md:grid-cols-2 gap-5">
              <select
                name="course"
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

              <input
                name="duration"
                placeholder="Duration"
                onChange={handleChange}
                className={inputClass}
              />

              <select
                name="mode"
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select mode</option>
                <option value="physical">Physical</option>
              </select>

              <select
                name="timing"
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select timing</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </div>

          <div className="p-8 border-t border-slate-700">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-amber-400 text-black px-6 py-3 rounded-lg font-bold"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentForm;
