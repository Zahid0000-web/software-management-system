import React, { useEffect, useState } from "react";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#7c3aed,#a78bfa)",
  "linear-gradient(135deg,#0369a1,#60a5fa)",
  "linear-gradient(135deg,#0f766e,#34d399)",
  "linear-gradient(135deg,#b45309,#fbbf24)",
  "linear-gradient(135deg,#be123c,#f87171)",
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const StudentApplication = () => {
  const [students, setStudents] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  // ── 1) NOTIFICATION STATE ──
  const [notifications, setNotifications] = useState([]);

  // localStorage سے already-read IDs لو (reload کے بعد بھی یاد رہیں)
  const getLocalReadIds = () => {
    try {
      return JSON.parse(localStorage.getItem("readStudentIds") || "[]");
    } catch {
      return [];
    }
  };

  const API_URL = "http://localhost:5001";

  useEffect(() => {
    fetchStudents();
  }, []);

  // ── 2) DETECT NEW (unread) APPLICATIONS ──
  // backend کا isRead نہیں، localStorage کا use کرو
  useEffect(() => {
    const readIds = getLocalReadIds();
    const newApps = students.filter((s) => !readIds.includes(s._id));

    setNotifications(
      newApps.map((s) => ({
        id: s._id,
        name: s.name,
      }))
    );
  }, [students]);

  /* ================= FETCH STUDENTS ================= */
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`);
      const data = await res.json();
      if (data.success && data.students) {
        setStudents(data.students);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStudents([]);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    setLoadingId(id + status);
    try {
      const res = await fetch(`${API_URL}/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setStudents((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status } : s))
        );
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= DELETE APPLICATION ================= */
  const deleteStudent = async (id) => {
    setLoadingId(id + "delete");
    try {
      const res = await fetch(`${API_URL}/api/students/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
        if (openId === id) setOpenId(null);
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  // ── 3) TOGGLE: open/close + localStorage میں read save + notification remove ──
  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));

    // localStorage میں is ID کو read mark کرو (reload کے بعد بھی یاد رہے)
    const readIds = getLocalReadIds();
    if (!readIds.includes(id)) {
      localStorage.setItem("readStudentIds", JSON.stringify([...readIds, id]));
    }

    // Remove from notifications list
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  /* ================= COUNTS ================= */
  const approvedCount = students.filter((s) => s.status === "Approved").length;
  const pendingCount  = students.filter((s) => s.status === "Pending").length;
  const rejectedCount = students.filter((s) => s.status === "Rejected").length;

  /* ================= FILTERED LIST ================= */
  const filteredStudents =
    activeTab === "all"
      ? students
      : students.filter((s) => s.status === activeTab);

  const TABS = [
    { key: "all",      label: "All",      count: students.length },
    { key: "Approved", label: "Approved", count: approvedCount },
    { key: "Pending",  label: "Pending",  count: pendingCount },
    { key: "Rejected", label: "Rejected", count: rejectedCount },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 font-sans">

      {/* ── HEADER ── */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-1">
            Student Applications
          </h1>
          <p className="text-sm text-white/40">
            {students.length} application{students.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* ── NOTIFICATION BELL (shows only when there are unread) ── */}
        {notifications.length > 0 && (
          <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm">
            {/* Bell icon */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-violet-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* Red dot badge */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#302b63]" />
            </div>
            <span className="text-xs font-semibold text-white/70">
              {notifications.length} new
            </span>
          </div>
        )}
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">{students.length}</p>
          <p className="text-[11px] uppercase tracking-widest text-white/40 mt-1">Total</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <p className="text-2xl font-bold text-emerald-400">{approvedCount}</p>
          <p className="text-[11px] uppercase tracking-widest text-white/40 mt-1">Approved</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
          <p className="text-[11px] uppercase tracking-widest text-white/40 mt-1">Pending</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <p className="text-2xl font-bold text-red-400">{rejectedCount}</p>
          <p className="text-[11px] uppercase tracking-widest text-white/40 mt-1">Rejected</p>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent mb-6" />

      {/* ── TABS ── */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setOpenId(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border
              ${
                activeTab === tab.key
                  ? tab.key === "Approved"
                    ? "bg-emerald-500 text-white border-emerald-400"
                    : tab.key === "Pending"
                    ? "bg-amber-500 text-white border-amber-400"
                    : tab.key === "Rejected"
                    ? "bg-red-500 text-white border-red-400"
                    : "bg-violet-600 text-white border-violet-500"
                  : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/80"
              }`}
          >
            {tab.label} <span className="opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* ── STUDENT CARDS ── */}
      {filteredStudents.length === 0 ? (
        <p className="text-center text-white/30 py-16 text-sm">
          {activeTab === "all"
            ? "No applications found."
            : `No ${activeTab} applications found.`}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredStudents.map((student, i) => {
            const isOpen = openId === student._id;

            const statusCls =
              student.status === "Approved"
                ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/25"
                : student.status === "Rejected"
                ? "text-red-400 bg-red-400/10 border border-red-400/25"
                : "text-amber-400 bg-amber-400/10 border border-amber-400/25";

            return (
              <div
                key={student._id}
                className={`rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 shadow-lg bg-white/5
                  ${
                    isOpen
                      ? "border-violet-500/40 shadow-blue-500/10 shadow-2xl"
                      : "border-white/10 shadow-black/30"
                  }`}
              >
                {/* ── CARD HEADER ── */}
                <div
                  onClick={() => toggle(student._id)}
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md flex-shrink-0"
                      style={{
                        background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                      }}
                    >
                      {getInitials(student.name)}
                    </div>
                    <div>
                      {/* Name + NEW badge */}
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-[15px] leading-tight">
                          {student.name}
                        </p>
                        {/* ── 4) NEW BADGE (localStorage سے check، reload-proof) ── */}
                        {!getLocalReadIds().includes(student._id) && (
                          <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full leading-none">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-xs mt-0.5">
                        {student.course} &nbsp;·&nbsp; {student.city}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${statusCls}`}>
                      {student.status}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
                        ${
                          isOpen
                            ? "bg-violet-500/20 border-violet-400/40 text-violet-300 rotate-180"
                            : "bg-white/5 border-white/10 text-white/50"
                        }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ── DETAIL BODY ── */}
                {isOpen && (
                  <div className="border-t border-white/10 bg-black/20 px-5 py-5">

                    {/* Personal Info */}
                    <p className="text-[10px] uppercase tracking-widest text-violet-400/70 mb-3 font-semibold">
                      Personal Info
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        { label: "Email",       value: student.email },
                        { label: "Phone",       value: student.phone },
                        { label: "CNIC",        value: student.cnic },
                        { label: "Gender",      value: student.gender },
                        { label: "Father Name", value: student.fatherName || "—" },
                        { label: "City",        value: student.city },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3"
                        >
                          <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">
                            {item.label}
                          </p>
                          <p className="text-[13px] font-medium text-white/85">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Academic Info */}
                    <p className="text-[10px] uppercase tracking-widest text-blue-400/70 mb-3 font-semibold">
                      Academic Info
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        { label: "Course",        value: student.course },
                        { label: "Qualification", value: student.qualification },
                        { label: "Institute",     value: student.institute || "—" },
                        { label: "Marks",         value: student.marks },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3"
                        >
                          <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">
                            {item.label}
                          </p>
                          <p className="text-[13px] font-medium text-white/85">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Address */}
                    {student.address && (
                      <>
                        <p className="text-[10px] uppercase tracking-widest text-emerald-400/70 mb-3 font-semibold">
                          Address
                        </p>
                        <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3 mb-5">
                          <p className="text-[13px] font-medium text-white/85">{student.address}</p>
                        </div>
                      </>
                    )}

                    {/* ── ACTION BUTTONS ── */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.07]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(student._id, "Approved");
                        }}
                        disabled={loadingId === student._id + "Approved"}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white
                          bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/30
                          hover:opacity-85 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {loadingId === student._id + "Approved" ? "..." : "✓ Approve"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(student._id, "Rejected");
                        }}
                        disabled={loadingId === student._id + "Rejected"}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white
                          bg-gradient-to-r from-red-600 to-red-400 shadow-lg shadow-red-500/30
                          hover:opacity-85 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {loadingId === student._id + "Rejected" ? "..." : "✕ Reject"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(student._id, "Pending");
                        }}
                        disabled={loadingId === student._id + "Pending"}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white
                          bg-gradient-to-r from-amber-600 to-amber-400 shadow-lg shadow-amber-500/30
                          hover:opacity-85 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {loadingId === student._id + "Pending" ? "..." : "⏳ Pending"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteStudent(student._id);
                        }}
                        disabled={loadingId === student._id + "delete"}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                          text-white/50 bg-white/[0.08] border border-white/10
                          hover:bg-white/[0.12] active:scale-95 transition-all disabled:opacity-50"
                      >
                        {loadingId === student._id + "delete" ? "..." : "🗑 Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentApplication;