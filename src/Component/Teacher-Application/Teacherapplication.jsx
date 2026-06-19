import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5001";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#7c3aed,#a78bfa)",
  "linear-gradient(135deg,#0369a1,#60a5fa)",
  "linear-gradient(135deg,#0f766e,#34d399)",
  "linear-gradient(135deg,#b45309,#fbbf24)",
  "linear-gradient(135deg,#be123c,#f87171)",
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TABS = ["Pending", "Approved", "Rejected"];

// ─── localStorage helpers ───────────────────────────────────────────────────
const SEEN_KEY = "seenTeacherIds";

const getSeenIds = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

const saveSeenIds = (set) => {
  localStorage.setItem(SEEN_KEY, JSON.stringify([...set]));
};
// ────────────────────────────────────────────────────────────────────────────

const Teacherapplication = () => {
  const [teachers, setTeachers]   = useState([]);
  const [openId, setOpenId]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");
  const [seenIds, setSeenIds]     = useState(getSeenIds);   // ← NEW

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* ================= FETCH ================= */

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res  = await fetch(`${API_URL}/api/teachers`);
      const data = await res.json();
      if (data.success) setTeachers(data.teachers);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (e, id, status) => {
    e.stopPropagation();
    try {
      await fetch(`${API_URL}/api/teachers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOpenId(null);
      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= DELETE ================= */

  const deleteTeacher = async (e, id) => {
    e.stopPropagation();
    try {
      await fetch(`${API_URL}/api/teachers/${id}`, { method: "DELETE" });
      setOpenId(null);
      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= TOGGLE + MARK SEEN ================= */

  const toggleCard = (id) => {
    if (openId !== id) {
      // Mark as seen when card is opened
      const updated = new Set(seenIds);
      updated.add(id);
      setSeenIds(updated);
      saveSeenIds(updated);
    }
    setOpenId(openId === id ? null : id);
  };

  /* ================= HELPERS ================= */

  // A card is "new/unseen" if it's Pending AND not in seenIds
  const isUnseen = (teacher) =>
    (teacher.status || "Pending") === "Pending" && !seenIds.has(teacher._id);

  // Count unseen Pending applications for tab badge
  const unseenCount = teachers.filter(isUnseen).length;

  /* ================= FILTERED LIST ================= */

  const filteredTeachers = teachers.filter(
    (t) => (t.status || "Pending") === activeTab
  );

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Teacher Applications
      </h1>

      {/* ===== TABS ===== */}
      <div className="flex gap-2 mb-6">
        {TABS.map((tab) => {
          const count = teachers.filter(
            (t) => (t.status || "Pending") === tab
          ).length;

          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenId(null);
              }}
              className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? tab === "Approved"
                    ? "bg-emerald-500 text-white"
                    : tab === "Rejected"
                    ? "bg-red-500 text-white"
                    : "bg-violet-600 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {tab}
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>

              {/* 🔔 Red notification bubble on Pending tab when there are unseen apps */}
              {tab === "Pending" && unseenCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 flex items-center justify-center
                             bg-red-500 text-white text-[10px] font-bold rounded-full
                             shadow-lg shadow-red-500/50 animate-pulse"
                >
                  {unseenCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ===== LIST ===== */}
      {filteredTeachers.length === 0 ? (
        <div className="text-white/40 mt-10 text-center">
          Koi application nahi mili — {activeTab}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredTeachers.map((teacher, index) => {
            const cardUnseen = isUnseen(teacher);

            return (
              <div
                key={teacher._id}
                className={`relative border rounded-2xl overflow-hidden transition-all ${
                  cardUnseen
                    ? "bg-violet-500/10 border-violet-500/40 shadow-md shadow-violet-500/10"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {/* 🔴 Unseen dot on card */}
                {cardUnseen && (
                  <span
                    className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500
                               shadow-sm shadow-red-400 animate-pulse z-10"
                  />
                )}

                {/* HEADER */}
                <div
                  onClick={() => toggleCard(teacher._id)}
                  className="flex items-center justify-between p-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar with optional ring for unseen */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
                        cardUnseen ? "ring-2 ring-red-500/60 ring-offset-2 ring-offset-[#0f172a]" : ""
                      }`}
                      style={{
                        background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
                      }}
                    >
                      {getInitials(teacher.name)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-white font-semibold">{teacher.name}</h2>
                        {/* "NEW" label */}
                        {cardUnseen && (
                          <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-white/50 text-sm">{teacher.courses}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      teacher.status === "Approved"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : teacher.status === "Rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-violet-500/20 text-violet-400"
                    }`}
                  >
                    {teacher.status || "Pending"}
                  </span>
                </div>

                {/* BODY */}
                {openId === teacher._id && (
                  <div className="border-t border-white/10 p-5 text-white/80">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/40 text-sm">Email</p>
                        <p>{teacher.email}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm">Phone</p>
                        <p>{teacher.phone}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm">Qualification</p>
                        <p>{teacher.qualification}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm">Experience</p>
                        <p>{teacher.experience} Years</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm">Skills</p>
                        <p>{teacher.skills}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-sm">Availability</p>
                        <p>{teacher.availability}</p>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {activeTab !== "Approved" && (
                        <button
                          onClick={(e) => updateStatus(e, teacher._id, "Approved")}
                          className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl text-white"
                        >
                          Approve
                        </button>
                      )}

                      {activeTab !== "Rejected" && (
                        <button
                          onClick={(e) => updateStatus(e, teacher._id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white"
                        >
                          Reject
                        </button>
                      )}

                      {activeTab !== "Pending" && (
                        <button
                          onClick={(e) => updateStatus(e, teacher._id, "Pending")}
                          className="bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-xl text-white"
                        >
                          Pending Mein Bhejo
                        </button>
                      )}

                      <button
                        onClick={(e) => deleteTeacher(e, teacher._id)}
                        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-white"
                      >
                        Delete
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

export default Teacherapplication;