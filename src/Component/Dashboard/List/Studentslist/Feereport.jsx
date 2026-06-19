// FeeReport.jsx
import React, { useEffect, useState } from "react";
import { getFeeData, getMonthLabel } from "./feeStorage";

const API_URL = "http://localhost:5001";

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
  return labels[value] || value || "—";
};

const FeeReport = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feeData] = useState(() => getFeeData());
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState({});

  useEffect(() => {
    fetchApprovedStudents();
  }, []);

  const fetchApprovedStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/students`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.students.filter((s) => s.status === "Approved"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ─── 1 row per student — sirf paid data ──────────────────────────
  const studentRows = students.map((student) => {
    const studentFees = feeData[student._id] || {};
    const months = Object.keys(studentFees);

    // Sirf jinhe fee add ki gai hai (paid entries)
    const paidEntries = months.filter((m) => studentFees[m].paid);

    const totalCollected = paidEntries.reduce(
      (sum, m) => sum + (Number(studentFees[m].amount) || 0),
      0
    );

    return {
      studentId: student._id,
      name: student.name,
      email: student.email,
      course: student.course,
      hasEntry: paidEntries.length > 0,
      totalMonths: paidEntries.length,
      totalCollected,
      monthsDetail: paidEntries.map((m) => ({
        monthKey: m,
        monthLabel: getMonthLabel(m),
        amount: Number(studentFees[m].amount) || 0,
      })),
    };
  });

  // ─── Summary Stats ────────────────────────────────────────────────
  const grandTotal = studentRows.reduce((sum, r) => sum + r.totalCollected, 0);
  const totalPaidMonths = studentRows.reduce((sum, r) => sum + r.totalMonths, 0);
  const studentsWithFee = studentRows.filter((r) => r.hasEntry).length;
  const studentsNoEntry = studentRows.filter((r) => !r.hasEntry).length;

  // ─── Available categories ─────────────────────────────────────────
  const availableCategories = [...new Set(students.map((s) => s.course))].filter(Boolean);

  // ─── Filter ───────────────────────────────────────────────────────
  const filteredRows = studentRows.filter((row) => {
    const matchCategory =
      filterCategory === "all" ? true : row.course === filterCategory;
    const matchSearch =
      searchQuery === ""
        ? true
        : row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Fee Report</h1>
        <p className="text-white/40 text-sm">
          All approved students — row click karo month detail dekhne ke liye
        </p>
      </div>

      {loading ? (
        <p className="text-white/40 text-center py-16">Loading...</p>
      ) : (
        <>
          {/* ── SUMMARY CARDS ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            {/* Total Collected */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-widest text-emerald-400/70 mb-2">
                Total Collected
              </p>
              <p className="text-2xl font-bold text-emerald-400">
                PKR {grandTotal.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-400/50 mt-1">
                {totalPaidMonths} month payments
              </p>
            </div>

            {/* Total Students */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-widest text-violet-400/70 mb-2">
                Total Students
              </p>
              <p className="text-2xl font-bold text-violet-400">
                {students.length}
              </p>
              <p className="text-xs text-violet-400/50 mt-1">approved</p>
            </div>

            {/* Fee Submitted */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-widest text-blue-400/70 mb-2">
                Fee Submitted
              </p>
              <p className="text-2xl font-bold text-blue-400">
                {studentsWithFee}
              </p>
              <p className="text-xs text-blue-400/50 mt-1">students</p>
            </div>

            {/* No Entry */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
                No Entry Yet
              </p>
              <p className="text-2xl font-bold text-white/60">
                {studentsNoEntry}
              </p>
              <p className="text-xs text-white/30 mt-1">students</p>
            </div>

          </div>

          {/* ── FILTERS ── */}
          <div className="flex flex-wrap gap-3 mb-6">
            {/* Search */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white text-sm outline-none w-full placeholder:text-white/25"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/70 text-sm outline-none"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((c) => (
                <option key={c} value={c}>{getCategoryLabel(c)}</option>
              ))}
            </select>
          </div>

          {/* ── TABLE ── */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest text-white/35 font-semibold">#</th>
                    <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest text-white/35 font-semibold">Student</th>
                    <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest text-white/35 font-semibold">Course</th>
                    <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest text-white/35 font-semibold">Months Paid</th>
                    <th className="text-right px-5 py-3 text-[11px] uppercase tracking-widest text-white/35 font-semibold">Total Collected</th>
                    <th className="text-center px-5 py-3 text-[11px] uppercase tracking-widest text-white/35 font-semibold">Status</th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-white/25 text-sm">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, i) => {
                      const isOpen = expandedIds[row.studentId];

                      return (
                        <React.Fragment key={row.studentId}>
                          {/* ── MAIN ROW ── */}
                          <tr
                            onClick={() => row.hasEntry && toggleExpand(row.studentId)}
                            className={`border-b border-white/[0.05] transition-colors ${
                              row.hasEntry
                                ? "cursor-pointer hover:bg-white/[0.04]"
                                : "opacity-60"
                            } ${isOpen ? "bg-white/[0.05]" : ""}`}
                          >
                            {/* # */}
                            <td className="px-5 py-4 text-white/30 text-sm">{i + 1}</td>

                            {/* Student */}
                            <td className="px-5 py-4">
                              <p className="text-white font-medium text-sm">{row.name}</p>
                              <p className="text-white/35 text-xs">{row.email}</p>
                            </td>

                            {/* Course */}
                            <td className="px-5 py-4">
                              <span className="text-violet-300 text-xs bg-violet-500/10 px-2 py-1 rounded-lg">
                                {getCategoryLabel(row.course)}
                              </span>
                            </td>

                            {/* Months paid count */}
                            <td className="px-5 py-4">
                              {row.hasEntry ? (
                                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
                                  {row.totalMonths} month{row.totalMonths !== 1 ? "s" : ""}
                                </span>
                              ) : (
                                <span className="text-white/25 text-sm">—</span>
                              )}
                            </td>

                            {/* Total Collected */}
                            <td className="px-5 py-4 text-right">
                              {row.hasEntry ? (
                                <span className="text-emerald-400 font-semibold text-sm">
                                  PKR {row.totalCollected.toLocaleString()}
                                </span>
                              ) : (
                                <span className="text-white/25 text-sm">—</span>
                              )}
                            </td>

                            {/* Status */}
                            <td className="px-5 py-4 text-center">
                              {row.hasEntry ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-emerald-500/20 border-emerald-500/30 text-emerald-400">
                                  ✓ Fee Added
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-white/5 border-white/10 text-white/30">
                                  No Entry
                                </span>
                              )}
                            </td>

                            {/* Expand arrow */}
                            <td className="px-3 py-4 text-center">
                              {row.hasEntry && (
                                <span className={`text-white/30 text-xs inline-block transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                                  ▼
                                </span>
                              )}
                            </td>
                          </tr>

                          {/* ── EXPANDED MONTHS DETAIL ── */}
                          {isOpen && (
                            <tr className="border-b border-white/[0.05]">
                              <td colSpan={7} className="px-5 pb-5 pt-2 bg-white/[0.02]">
                                <div className="ml-8">
                                  <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3 font-semibold">
                                    Month-wise Breakdown
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {row.monthsDetail.map((m) => (
                                      <div
                                        key={m.monthKey}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border bg-emerald-500/10 border-emerald-500/20"
                                      >
                                        <span className="text-emerald-300 font-medium text-sm">
                                          {m.monthLabel}
                                        </span>
                                        <span className="text-white/40 text-xs">|</span>
                                        <span className="text-white font-semibold text-sm">
                                          PKR {m.amount.toLocaleString()}
                                        </span>
                                        <span className="text-emerald-400 text-xs">✓ Paid</span>
                                      </div>
                                    ))}
                                  </div>
                                  <p className="text-xs text-white/30 mt-3">
                                    Total Collected:{" "}
                                    <span className="text-emerald-400 font-semibold">
                                      PKR {row.totalCollected.toLocaleString()}
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>

                {/* FOOTER TOTAL */}
                {filteredRows.length > 0 && (
                  <tfoot>
                    <tr className="border-t border-white/15 bg-white/[0.02]">
                      <td colSpan={4} className="px-5 py-3.5 text-white/50 text-sm font-semibold">
                        {filteredRows.length} student{filteredRows.length !== 1 ? "s" : ""}
                      </td>
                      <td className="px-5 py-3.5 text-right text-emerald-400 font-bold text-sm">
                        PKR {filteredRows.reduce((s, r) => s + r.totalCollected, 0).toLocaleString()}
                      </td>
                      <td colSpan={2} className="px-5 py-3.5 text-center text-white/30 text-xs">
                        Grand Total
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeeReport;