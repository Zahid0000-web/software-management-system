import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5001";

const Teacherlist = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openTeacherId, setOpenTeacherId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Notification handler with localStorage persistence
  const [notifiedTeachers, setNotifiedTeachers] = useState(() => {
    const saved = localStorage.getItem("notifiedTeachers");
    return saved ? JSON.parse(saved) : {};
  });

  // ✅ FIXED: Gmail compose URL instead of mailto
  const handleNotify = (e, teacher) => {
    e.stopPropagation();

    const subject = encodeURIComponent(`🎉 Application Approved!`);
    const body = encodeURIComponent(
      `Dear ${teacher.name},\n\nYour application has been approved.\nCategory: ${getCategoryLabel(teacher.courses)}\nStatus: Approved ✅\n\nWelcome aboard!\n\nBest Regards,\nAdmin Team`
    );

    // Gmail direct compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${teacher.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");

    // Count update
    const current = notifiedTeachers[teacher._id] || 0;
    const updated = { ...notifiedTeachers, [teacher._id]: current + 1 };
    setNotifiedTeachers(updated);
    localStorage.setItem("notifiedTeachers", JSON.stringify(updated));
  };

  useEffect(() => {
    fetchApprovedTeachers();
  }, []);

  const fetchApprovedTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/teachers`);
      const data = await res.json();

      if (data.success) {
        const approvedOnly = data.teachers.filter(
          (teacher) => teacher.status === "Approved"
        );
        setTeachers(approvedOnly);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const availableCategories = [...new Set(teachers.map((t) => t.courses))].filter(Boolean);

  const getCategoryLabel = (value) => {
    const labels = {
      "web_development": "Web Development",
      "web_app": "Web App Development",
      "mobile_app": "Mobile App Development",
      "uiux": "UI / UX Design",
      "graphic_design": "Graphic Design",
      "database": "Database Management",
      "python": "Python Programming",
    };
    return labels[value] || value;
  };

  const groupedTeachers = teachers.reduce((acc, teacher) => {
    const category = teacher.courses || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(teacher);
    return acc;
  }, {});

  const currentCategoryTeachers = selectedCategory
    ? groupedTeachers[selectedCategory] || []
    : [];

  const toggleTeacher = (id) => {
    setOpenTeacherId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Teacher List
        </h1>
        <p className="text-white/40 text-sm">
          Total: {teachers.length} teachers | {availableCategories.length} Categories
        </p>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      ) : teachers.length === 0 ? (
        <p className="text-white/30 text-center py-16">
          No teachers found
        </p>
      ) : (
        <>
          {/* CATEGORY BUTTONS */}
          <div className="mb-8">
            <label className="text-white/50 text-xs uppercase tracking-widest mb-3 block">
              Select Category:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => {
                const count = groupedTeachers[category]?.length || 0;
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenTeacherId(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-emerald-600 text-white border border-emerald-500"
                          : "bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white"
                      }`}
                  >
                    {getCategoryLabel(category)}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? "bg-white/20" : "bg-white/10"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SELECTED CATEGORY TEACHERS */}
          {selectedCategory && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {getCategoryLabel(selectedCategory)}
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                  {currentCategoryTeachers.length} Teacher{currentCategoryTeachers.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* TEACHERS LIST */}
              <div className="flex flex-col gap-3">
                {currentCategoryTeachers.map((teacher, index) => {
                  const isOpen = openTeacherId === teacher._id;
                  const serialNumber = index + 1;

                  return (
                    <div
                      key={teacher._id}
                      className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300
                        ${
                          isOpen
                            ? "border-emerald-500/40 bg-white/10"
                            : "border-white/10 hover:border-white/20"
                        }`}
                    >
                      {/* TEACHER ROW */}
                      <div
                        onClick={() => toggleTeacher(teacher._id)}
                        className="flex items-center justify-between p-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300
                            flex items-center justify-center text-lg font-bold flex-shrink-0">
                            {serialNumber}
                          </div>

                          <div>
                            <h3 className="text-white font-semibold text-lg">
                              {teacher.name}
                            </h3>

                            <p className="text-white/50 text-sm">
                              {teacher.email}
                            </p>

                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">

                              {/* ✅ FIXED: Button instead of <a>, passes full teacher object */}
                              <button
                                onClick={(e) => handleNotify(e, teacher)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-400 hover:text-emerald-300 rounded-lg text-xs font-medium transition-all duration-200"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                                </svg>
                                Send Notification
                              </button>

                              {/* Count Badge */}
                              {notifiedTeachers[teacher._id] > 0 && (
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border
                                  ${
                                    notifiedTeachers[teacher._id] >= 3
                                      ? "bg-red-500/20 border-red-500/30 text-red-400"
                                      : notifiedTeachers[teacher._id] === 2
                                      ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                                      : "bg-white/5 border-white/10 text-white/40"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"
                                    />
                                  </svg>

                                  {notifiedTeachers[teacher._id] === 1 && "Sent 1 time"}
                                  {notifiedTeachers[teacher._id] === 2 && "⚠ Sent 2 times"}
                                  {notifiedTeachers[teacher._id] >= 3 &&
                                    `🚨 Sent ${notifiedTeachers[teacher._id]} times!`}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border
                          transition-all duration-300 ${
                            isOpen
                              ? "bg-emerald-500/20 border-emerald-400/40 rotate-180"
                              : "bg-white/10 border-white/10"
                          }`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-white/70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* EXPANDED DETAILS */}
                      {isOpen && (
                        <div className="border-t border-white/10 bg-black/20 p-5">
                          {/* Contact Information */}
                          <p className="text-xs uppercase tracking-widest text-emerald-400/70 mb-3 font-semibold">
                            Contact Information
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Phone</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.phone || "—"}</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Email</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.email}</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3 col-span-2 md:col-span-1">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Address</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.address || "—"}</p>
                            </div>
                          </div>

                          {/* Professional Information */}
                          <p className="text-xs uppercase tracking-widest text-blue-400/70 mb-3 font-semibold">
                            Professional Information
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Qualification</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.qualification || "—"}</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Experience</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.experience ? `${teacher.experience} Years` : "—"}</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3 col-span-2 md:col-span-1">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Teaching Experience</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.teachingExperience || "—"}</p>
                            </div>
                          </div>

                          {/* Skills & Expertise */}
                          <p className="text-xs uppercase tracking-widest text-purple-400/70 mb-3 font-semibold">
                            Skills & Expertise
                          </p>
                          <div className="mb-5">
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3">
                              <p className="text-[13px] font-medium text-white/85 whitespace-pre-wrap">{teacher.skills || "—"}</p>
                            </div>
                          </div>

                          {/* Teaching Details */}
                          <p className="text-xs uppercase tracking-widest text-orange-400/70 mb-3 font-semibold">
                            Teaching Details
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Category</p>
                              <p className="text-[13px] font-medium text-white/85">{getCategoryLabel(teacher.courses)}</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Availability</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.availability || "—"}</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3 col-span-2 md:col-span-1">
                              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Timing</p>
                              <p className="text-[13px] font-medium text-white/85">{teacher.timing || "—"}</p>
                            </div>
                          </div>

                          {/* Portfolio */}
                          {teacher.portfolio && (
                            <>
                              <p className="text-xs uppercase tracking-widest text-pink-400/70 mb-3 font-semibold">
                                Portfolio
                              </p>
                              <div className="mb-5">
                                <a
                                  href={teacher.portfolio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.07]
                                    rounded-xl px-3.5 py-3 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40
                                    transition-all duration-200"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  <span className="text-[13px] font-medium">View Portfolio</span>
                                </a>
                              </div>
                            </>
                          )}

                          {/* Status Badge */}
                          <div className="flex items-center gap-2 pt-2">
                            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                              {teacher.status || "Approved"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ALL CATEGORIES VIEW */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableCategories.map((category) => {
                const count = groupedTeachers[category]?.length || 0;

                return (
                  <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer
                      hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold text-lg">
                        {getCategoryLabel(category)}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300
                        flex items-center justify-center text-lg font-bold">
                        {count}
                      </div>
                    </div>
                    <p className="text-white/50 text-sm">
                      {count} approved teacher{count !== 1 ? "s" : ""} in this category
                    </p>
                    <p className="text-emerald-400 text-xs mt-3">
                      Click to view details →
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Teacherlist;