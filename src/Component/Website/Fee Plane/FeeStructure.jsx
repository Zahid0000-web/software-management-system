import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function FeeStructure() {
  const navigate = useNavigate();
  const facilities = [
    "Certification",
    "High Speed Internet",
    "CCTV Surveillance",
    "Printing Facilities",
    "Solar / Generator Backup",
    "Fully Maintained Facility",
    "WiFi & Network",
    "Food & Beverage",
    "Parking Available",
    "24/7 Security",
    "Collaborative Spaces",
    "24/7 Support",
  ];

  return (
    <header className="bg-gradient-to-b from-teal-800 via-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-0">

        {/* Hero text */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-300 bg-teal-900/50 border border-teal-700/50 px-4 py-1.5 rounded-full mb-5">
            Professional Development
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Training Programs
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
            Professional courses to accelerate your tech career
          </p>
        </div>

        {/* White card */}
        <div className="bg-white rounded-t-3xl overflow-hidden -mx-6 sm:-mx-8 shadow-2xl">
          {/* Top gradient border */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #0d9488, #84cc16)",
            }}
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Left content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md transition-colors duration-200">
                  ALL COURSES
                </button>
                <span className="text-sm text-slate-400 font-medium">
                  12 Facilities Included
                </span>
              </div>

              <p className="text-slate-600 text-base leading-relaxed max-w-lg">
                Get access to any of our professional training programs. Each
                course is designed with industry-standard curriculum and
                hands-on projects to prepare you for real-world challenges.
              </p>

              {/* Facilities list */}
              <div className="mt-8">
                <h3 className="text-slate-800 font-semibold text-sm uppercase tracking-wider mb-4">
                  Facilities & Services
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {facilities.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 rounded-xl px-4 py-2.5 transition-colors duration-200"
                    >
                      <FaCheckCircle className="text-teal-500 text-base flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Price card */}
            <aside className="lg:col-span-1">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                {/* Price */}
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                  Per Course Fee
                </p>
                <div className="flex items-end gap-1.5 mb-4">
                  <span className="text-base font-semibold text-slate-400 mb-1">
                    PKR
                  </span>
                  <span className="text-5xl font-extrabold text-teal-700 leading-none">
                    20,000
                  </span>
                </div>

                <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                  3 Months Duration
                </span>

                {/* Divider */}
                <div className="border-t border-slate-200 mb-6" />

                {/* Form */}
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => navigate("/apply")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-teal-200"
                  >
                    Enroll Now →
                  </button>
                </div>

                <p className="text-xs text-slate-400 text-center mt-4">
                  No hidden charges. Installments available.
                </p>
              </div>
            </aside>
          </div>

          {/* Bottom tags strip */}
        </div>
      </div>
    </header>
  );
}

export default FeeStructure;