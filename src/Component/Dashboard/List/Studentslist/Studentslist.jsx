// Studentslist.jsx
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { getFeeData } from "./Feestorage";

const API_URL = "http://localhost:5001";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openStudentId, setOpenStudentId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notifiedStudents, setNotifiedStudents] = useState(() => {
    const saved = localStorage.getItem("notifiedStudents");
    return saved ? JSON.parse(saved) : {};
  });

  const [feeData, setFeeData] = useState(() => getFeeData());

  // ✅ FIXED: Full student object pass ho raha hai, Gmail compose URL use ho raha hai
  const handleNotify = (e, student) => {
    e.stopPropagation();

    const subject = encodeURIComponent(`🎉 Application Approved!`);
    const body = encodeURIComponent(
      `Dear ${student.name},\n\nYour application has been approved.\nCategory: ${getCategoryLabel(student.course)}\nStatus: Approved ✅\n\nWelcome aboard!\n\nBest Regards,\nAdmin Team`
    );

    // Gmail direct compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${student.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");

    // Count update
    const current = notifiedStudents[student._id] || 0;
    const updated = { ...notifiedStudents, [student._id]: current + 1 };
    setNotifiedStudents(updated);
    localStorage.setItem("notifiedStudents", JSON.stringify(updated));
  };

  useEffect(() => {
    fetchApprovedStudents();
  }, []);

  const fetchApprovedStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/students`);
      const data = await res.json();
      if (data.success) {
        const approvedOnly = data.students.filter(
          (student) => student.status === "Approved"
        );
        setStudents(approvedOnly);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (value) => {
    const labels = {
      web_development: "Web Development",
      web_app: "Web App Development",
      mobile_app: "Mobile App Development",
      uiux: "UI / UX Design",
      graphic_design: "Graphic Design",
      database: "Database Management",
      python: "Python Programming",
    };
    return labels[value] || value;
  };

  const availableCategories = [
    ...new Set(students.map((s) => s.course)),
  ].filter(Boolean);

  const groupedStudents = students.reduce((acc, student) => {
    const category = student.course || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(student);
    return acc;
  }, {});

  const currentCategoryStudents = selectedCategory
    ? groupedStudents[selectedCategory] || []
    : [];

  const toggleStudent = (id) => {
    setOpenStudentId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Approved Students
        </h1>
        <p className="text-white/40 text-sm">
          Total: {students.length} approved student
          {students.length !== 1 ? "s" : ""} | {availableCategories.length} Categories
        </p>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <p className="text-white/40 text-center py-8">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-white/30 text-center py-16">
          No approved students found
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
                const count = groupedStudents[category]?.length || 0;
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenStudentId(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-600 text-white border border-violet-500"
                        : "bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {getCategoryLabel(category)}
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        isActive ? "bg-white/20" : "bg-white/10"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SELECTED CATEGORY STUDENTS */}
          {selectedCategory && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {getCategoryLabel(selectedCategory)}
                </h2>
                <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-sm">
                  {currentCategoryStudents.length} Student
                  {currentCategoryStudents.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {currentCategoryStudents.map((student, index) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    index={index}
                    isOpen={openStudentId === student._id}
                    toggleStudent={toggleStudent}
                    notifiedStudents={notifiedStudents}
                    handleNotify={handleNotify}
                    feeData={feeData}
                    setFeeData={setFeeData}
                    getCategoryLabel={getCategoryLabel}
                  />
                ))}
              </div>
            </div>
          )}

          {/* NO CATEGORY SELECTED */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableCategories.map((category) => {
                const count = groupedStudents[category]?.length || 0;
                return (
                  <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-violet-500/40 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold text-lg">
                        {getCategoryLabel(category)}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center text-lg font-bold">
                        {count}
                      </div>
                    </div>
                    <p className="text-white/50 text-sm">
                      {count} approved student{count !== 1 ? "s" : ""} in this category
                    </p>
                    <p className="text-violet-400 text-xs mt-3">
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

export default StudentsList;