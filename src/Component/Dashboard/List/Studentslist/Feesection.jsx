// FeeSection.jsx
import React, { useState } from "react";
import {
  getMonthLabel,
  getCurrentMonthKey,
  updateStudentFee,
  addNewMonth,
  removeMonth,
} from "./Feestorage";

const FeeSection = ({ studentId, feeData, setFeeData }) => {
  const [showAddMonth, setShowAddMonth] = useState(false);
  const [newMonthInput, setNewMonthInput] = useState(getCurrentMonthKey());

  const studentFees = feeData[studentId] || {};
  const months = Object.keys(studentFees).sort().reverse(); // latest first

  const handleAmountChange = (e, monthKey) => {
    const updated = updateStudentFee(feeData, studentId, monthKey, "amount", e.target.value);
    setFeeData(updated);
  };

  const handlePaidToggle = (e, monthKey) => {
    const updated = updateStudentFee(feeData, studentId, monthKey, "paid", e.target.checked);
    setFeeData(updated);
  };

  const handleAddMonth = (e) => {
    e.stopPropagation();
    if (!newMonthInput) return;
    const updated = addNewMonth(feeData, studentId, newMonthInput);
    setFeeData(updated);
    setShowAddMonth(false);
    setNewMonthInput(getCurrentMonthKey());
  };

  const handleRemoveMonth = (e, monthKey) => {
    e.stopPropagation();
    const updated = removeMonth(feeData, studentId, monthKey);
    setFeeData(updated);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mt-2 w-full"
    >
      {/* Month Rows */}
      {months.length > 0 && (
        <div className="flex flex-col gap-2 mb-2">
          {months.map((monthKey) => {
            const fee = studentFees[monthKey];
            return (
              <div
                key={monthKey}
                className="flex items-center gap-2 flex-wrap bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2"
              >
                {/* Month Label */}
                <span className="text-[11px] font-medium text-violet-300 whitespace-nowrap min-w-[90px]">
                  {getMonthLabel(monthKey)}
                </span>

                {/* Amount Input */}
                <div className="flex items-center gap-1">
                  <span className="text-white/30 text-[10px]">PKR</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={fee.amount || ""}
                    onChange={(e) => handleAmountChange(e, monthKey)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 bg-white/10 border border-white/15 rounded-lg text-white text-xs px-2 py-1 outline-none focus:border-violet-400/60 transition-colors"
                  />
                </div>

                {/* Paid Checkbox */}
                <label
                  className="flex items-center gap-1.5 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={fee.paid || false}
                    onChange={(e) => handlePaidToggle(e, monthKey)}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 ${
                      fee.paid
                        ? "bg-violet-600 border-violet-500"
                        : "bg-white/10 border-white/20"
                    }`}
                  >
                    {fee.paid && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium whitespace-nowrap ${
                      fee.paid ? "text-emerald-400" : "text-white/40"
                    }`}
                  >
                    {fee.paid ? "Paid ✓" : "Unpaid"}
                  </span>
                </label>

                {/* Remove Month Button */}
                <button
                  onClick={(e) => handleRemoveMonth(e, monthKey)}
                  className="ml-auto w-5 h-5 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                  title="Remove month"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Month */}
      {showAddMonth ? (
        <div className="flex items-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
          <input
            type="month"
            value={newMonthInput}
            onChange={(e) => setNewMonthInput(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 border border-white/15 rounded-lg text-white text-xs px-2 py-1 outline-none focus:border-violet-400/60"
          />
          <button
            onClick={handleAddMonth}
            className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-lg transition-all"
          >
            Add
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowAddMonth(false); }}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/60 text-xs rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => { e.stopPropagation(); setShowAddMonth(true); }}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-dashed border-white/15 hover:border-violet-400/40 text-white/40 hover:text-violet-300 rounded-lg text-xs transition-all duration-200 mt-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Month
        </button>
      )}
    </div>
  );
};

export default FeeSection;