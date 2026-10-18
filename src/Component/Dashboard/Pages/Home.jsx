import { useState, useEffect } from "react";
import { getFeeData } from "../List/Studentslist/Feestorage";

const API_URL = "http://localhost:5001";

const COURSES = {
  web_development: { label: "Web Development", color: "#185FA5" },
  web_app:         { label: "Web App Dev",      color: "#534AB7" },
  mobile_app:      { label: "Mobile App Dev",   color: "#0F6E56" },
  uiux:            { label: "UI / UX Design",   color: "#854F0B" },
  graphic_design:  { label: "Graphic Design",   color: "#993556" },
  database:        { label: "Database Mgmt",    color: "#3B6D11" },
  python:          { label: "Python",           color: "#A32D2D" },
};

const AVATAR_COLORS = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#EEEDFE", color: "#534AB7" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#FBEAF0", color: "#993556" },
];

const getCategoryLabel = (v) => COURSES[v]?.label || v || "—";

export default function DashboardHome() {
  const [students, setStudents]   = useState([]);
  const [teachers, setTeachers]   = useState([]);
  const [blogs, setBlogs]         = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [sRes, tRes, bRes] = await Promise.all([
          fetch(`${API_URL}/api/students`),
          fetch(`${API_URL}/api/teachers`),
          fetch(`${API_URL}/api/blogs`),
        ]);
        const sData = await sRes.json();
        const tData = await tRes.json();
        const bData = await bRes.json();
        if (sData.success) setStudents(sData.students.filter((s) => s.status === "Approved"));
        if (tData.success) setTeachers(tData.teachers.filter((t) => t.status === "Approved"));
        const blogsArr = Array.isArray(bData) ? bData : bData.data || bData.blogs || [];
        setBlogs(blogsArr);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  // ── Fee ──────────────────────────────────────────────────────────
  const feeData = getFeeData();
  const allFeeEntries = students.flatMap((s) => Object.values(feeData[s._id] || {}));
  const totalCollected = allFeeEntries.filter((f) => f.paid).reduce((sum, f) => sum + (Number(f.amount) || 0), 0);
  const paidCount = allFeeEntries.filter((f) => f.paid).length;

  // ── Course counts ────────────────────────────────────────────────
  const courseCounts = students.reduce((acc, s) => {
    if (s.course) acc[s.course] = (acc[s.course] || 0) + 1;
    return acc;
  }, {});
  const maxCourseCount = Math.max(...Object.values(courseCounts), 1);

  // ── Recent students ──────────────────────────────────────────────
  const recentStudents = [...students].slice(-5).reverse();

  // ── Helpers ──────────────────────────────────────────────────────
  const S = (style) => style; // passthrough for inline style objects

  const StatCard = ({ icon, iconBg, iconColor, badge, badgeBg, badgeColor, value, label }) => (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 8, background: iconBg, color: iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          {icon}
        </div>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: badgeBg, color: badgeColor, fontWeight: 500 }}>
          {badge}
        </span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, color: "#0F172A", marginBottom: 3 }}>
        {loading ? "..." : value}
      </div>
      <div style={{ fontSize: 12, color: "#64748B" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: 28, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Banner ── */}
      <div style={{ background: "linear-gradient(135deg,#1E293B,#0F172A)", borderRadius: 14, padding: "24px 28px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ color: "#94A3B8", fontSize: 12, marginBottom: 4 }}>Welcome back</div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Good morning, Admin 👋</div>
          <div style={{ color: "#CBD5E1", fontSize: 13 }}>Manage your institute from one place</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "Students",      val: loading ? "..." : students.length },
            { label: "Teachers",      val: loading ? "..." : teachers.length },
            { label: "Fee Collected", val: loading ? "..." : `PKR ${totalCollected >= 1000 ? (totalCollected / 1000).toFixed(0) + "k" : totalCollected}` },
            { label: "Blogs",         val: loading ? "..." : blogs.length },
          ].map((item) => (
            <div key={item.label} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 10, padding: "10px 16px", textAlign: "center", minWidth: 100 }}>
              <div style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>{item.val}</div>
              <div style={{ color: "#94A3B8", fontSize: 11, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 20 }}>
        <StatCard icon="👨‍🎓" iconBg="#E6F1FB" iconColor="#185FA5" badge="approved" badgeBg="#EAF3DE" badgeColor="#3B6D11" value={students.length} label="Total Students" />
        <StatCard icon="👩‍🏫" iconBg="#EEEDFE" iconColor="#534AB7" badge="approved" badgeBg="#EAF3DE" badgeColor="#3B6D11" value={teachers.length} label="Total Teachers" />
        <StatCard icon="💰" iconBg="#EAF3DE" iconColor="#3B6D11" badge={`${paidCount} payments`} badgeBg="#EAF3DE" badgeColor="#3B6D11" value={`PKR ${totalCollected.toLocaleString()}`} label="Fee Collected" />
        <StatCard icon="📚" iconBg="#FAEEDA" iconColor="#854F0B" badge="7 courses" badgeBg="#FAEEDA" badgeColor="#854F0B" value={7} label="Total Courses" />
        <StatCard icon="✍️" iconBg="#FBEAF0" iconColor="#993556" badge="published" badgeBg="#FBEAF0" badgeColor="#993556" value={blogs.length} label="Total Blogs" />
      </div>

      {/* ── Bottom ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>

        {/* Recent Students */}
  {/* Recent Students */}
        {/* Recent Students */}
<div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>Recent Students</span>
    <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 99, background: "#F1F5F9", color: "#64748B" }}>
      last {recentStudents.length}
    </span>
  </div>

  {loading ? (
    <p style={{ color: "#94A3B8", textAlign: "center", padding: "24px 0" }}>Loading...</p>
  ) : recentStudents.length === 0 ? (
    <p style={{ color: "#CBD5E1", textAlign: "center", padding: "24px 0" }}>No approved students yet</p>
  ) : (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {["Student", "Course"].map((h) => (
            <th key={h} style={{ textAlign: "left", fontSize: 11, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", paddingBottom: 10, borderBottom: "1px solid #F1F5F9", fontWeight: 600 }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recentStudents.map((s, i) => {
          const ac = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const initials = (s.name || "??").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
          return (
            <tr key={s._id}>
              <td style={{ padding: "10px 0", borderBottom: "1px solid #F8FAFC" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: ac.bg, color: ac.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1E293B" }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{s.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: "10px 0", fontSize: 12, color: "#64748B", borderBottom: "1px solid #F8FAFC" }}>
                {getCategoryLabel(s.course)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Courses Panel */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", marginBottom: 14 }}>Courses</div>
            {Object.entries(COURSES).map(([key, { label, color }]) => {
              const count = courseCounts[key] || 0;
              const pct = Math.round((count / maxCourseCount) * 100);
              return (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #F8FAFC" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: 12, color: "#1E293B" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginRight: 6 }}>{loading ? "..." : count}</div>
                  <div style={{ width: 56, height: 4, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99 }} />
                  </div>
                </div>
              );
            })}
          </div>         
        </div>
      </div>
    </div>
  );
}