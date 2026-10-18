// StudentCard.jsx
import React from "react";
import FeeSection from "./Feesection";

const StudentCard = ({
  student,
  index,
  isOpen,
  toggleStudent,
  notifiedStudents,
  handleNotify,
  feeData,
  setFeeData,
  getCategoryLabel,
}) => {
  const serialNumber = index + 1;

  return (
    <div
      className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-violet-500/40 bg-white/10"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* STUDENT ROW - CLICK TO EXPAND */}
      <div
        onClick={() => toggleStudent(student._id)}
        className="flex items-center justify-between p-4 cursor-pointer"
      >
        <div className="flex items-center gap-4 w-full">
          {/* SERIAL NUMBER */}
          <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center text-lg font-bold flex-shrink-0">
            {serialNumber}
          </div>

          {/* NAME & INFO */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">{student.name}</h3>
            <p className="text-white/50 text-sm">{student.email}</p>

            {/* ACTION ROW */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">

              {/* ✅ FIXED: Button with Gmail compose URL */}
              <button
                onClick={(e) => handleNotify(e, student)}
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

              {/* Notification Count Badge */}
              {notifiedStudents[student._id] > 0 && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                    notifiedStudents[student._id] >= 3
                      ? "bg-red-500/20 border-red-500/30 text-red-400"
                      : notifiedStudents[student._id] === 2
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
                  {notifiedStudents[student._id] === 1 && "Sent 1 time"}
                  {notifiedStudents[student._id] === 2 && "⚠ Sent 2 times"}
                  {notifiedStudents[student._id] >= 3 &&
                    `🚨 Sent ${notifiedStudents[student._id]} times!`}
                </span>
              )}
            </div>

            {/* FEE SECTION */}
            <div onClick={(e) => e.stopPropagation()}>
              <FeeSection
                studentId={student._id}
                feeData={feeData}
                setFeeData={setFeeData}
              />
            </div>
          </div>
        </div>

        {/* ARROW ICON */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
            isOpen
              ? "bg-violet-500/20 border-violet-400/40 rotate-180"
              : "bg-white/10 border-white/10"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* EXPANDED DETAILS */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/20 p-5">
          {/* Personal Info */}
          <p className="text-xs uppercase tracking-widest text-violet-400/70 mb-3 font-semibold">
            Personal Information
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
            {[
              { label: "Phone", value: student.phone },
              { label: "CNIC", value: student.cnic },
              { label: "Gender", value: student.gender },
              { label: "Father Name", value: student.fatherName },
              { label: "City", value: student.city },
              { label: "Address", value: student.address },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3"
              >
                <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">
                  {label}
                </p>
                <p className="text-[13px] font-medium text-white/85">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>

          {/* Academic Info */}
          <p className="text-xs uppercase tracking-widest text-blue-400/70 mb-3 font-semibold">
            Academic Information
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Course", value: getCategoryLabel(student.course) },
              { label: "Qualification", value: student.qualification },
              { label: "Institute", value: student.institute },
              { label: "Marks/Grade", value: student.marks },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3"
              >
                <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">
                  {label}
                </p>
                <p className="text-[13px] font-medium text-white/85">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>

          {/* Fee Summary in expanded view */}
          {feeData[student._id] && Object.keys(feeData[student._id]).length > 0 && (
            <div className="mt-5">
              <p className="text-xs uppercase tracking-widest text-emerald-400/70 mb-3 font-semibold">
                Fee Summary
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(feeData[student._id])
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([monthKey, fee]) => {
                    const [year, month] = monthKey.split("-");
                    const label = new Date(year, parseInt(month) - 1).toLocaleString("en-US", { month: "short", year: "numeric" });
                    return (
                      <div
                        key={monthKey}
                        className={`bg-white/[0.04] border rounded-xl px-3.5 py-3 ${
                          fee.paid ? "border-emerald-500/20" : "border-red-500/20"
                        }`}
                      >
                        <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">
                          {label}
                        </p>
                        <p className="text-[13px] font-medium text-white/85">
                          PKR {fee.amount ? Number(fee.amount).toLocaleString() : "—"}
                        </p>
                        <p className={`text-[11px] mt-0.5 ${fee.paid ? "text-emerald-400" : "text-red-400"}`}>
                          {fee.paid ? "✅ Paid" : "❌ Unpaid"}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCard;