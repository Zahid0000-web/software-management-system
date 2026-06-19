// ============================================
//  ChallanForm.jsx
//  Student data entry + challan settings
// ============================================

import { useState } from "react";
import {
  FiUser, FiBook, FiCreditCard, FiDollarSign,
  FiFileText, FiMail, FiSave, FiDownload, FiTag, FiLayers
} from "react-icons/fi";
import { getNextChallanNo, formatDate, getExpiryDate } from "./Challanutils";

const INPUT = "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400";
const LABEL = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

// Fee categories
const FEE_CATEGORIES = [
  "Registration Fee",
  "Monthly Fee",
  "Certificate Fee",
  "Admission Fee",
  "Exam Fee",
];

const DEFAULT = {
  name:         "",
  cnic:         "",
  course:       "",
  category:     "",
  feeType:      "Monthly Fee",
  amount:       "",
  bankName:     "Meezan Bank",
  accountNo:    "22050111612492",
  accountTitle: "BTN Better Training Network",
  expiryDays:   "2",
};

export default function ChallanForm({ onGenerate, onSave, onGmail, onDownload }) {
  const [form, setForm] = useState(DEFAULT);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleGenerate = () => {
    if (!form.name || !form.cnic || !form.course || !form.category || !form.amount) {
      alert("Sab required (*) fields fill karo!");
      return;
    }
    const today  = new Date();
    const expiry = getExpiryDate(form.expiryDays);
    const challan = {
      ...form,
      challanNo: getNextChallanNo(),
      date:   formatDate(today),
      expiry: formatDate(expiry),
    };
    onGenerate(challan);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
        <FiFileText className="text-blue-500" />
        Student Information
      </h2>

      {/* ── Student Fields ── */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className={LABEL}><FiUser className="inline mr-1" />Student Name *</label>
          <input className={INPUT} placeholder="Muhammad Ali" value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label className={LABEL}><FiCreditCard className="inline mr-1" />CNIC *</label>
          <input className={INPUT} placeholder="35202-1234567-1" value={form.cnic} onChange={set("cnic")} />
        </div>

        {/* Course Name */}
        <div className="col-span-2">
          <label className={LABEL}><FiBook className="inline mr-1" />Course Name *</label>
          <input
            className={INPUT}
            placeholder="Frontend Development (React) / Python / etc."
            value={form.course}
            onChange={set("course")}
          />
        </div>

        {/* Fee Category dropdown */}
        <div>
          <label className={LABEL}><FiLayers className="inline mr-1" />Fee Category *</label>
          <select className={INPUT} value={form.feeType} onChange={set("feeType")}>
            {FEE_CATEGORIES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Custom Category text */}
        <div>
          <label className={LABEL}><FiTag className="inline mr-1" />Category (Custom) *</label>
          <input
            className={INPUT}
            placeholder="e.g. Morning Batch / Jan-2026 / Online"
            value={form.category}
            onChange={set("category")}
          />
        </div>

        {/* Amount */}
        <div className="col-span-2">
          <label className={LABEL}><FiDollarSign className="inline mr-1" />Amount (Rs.) *</label>
          <input className={INPUT} type="number" placeholder="2000" value={form.amount} onChange={set("amount")} />
        </div>
      </div>

      {/* ── Bank Settings ── */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Bank Settings</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={LABEL}>Bank Name</label>
            <input className={INPUT} value={form.bankName} onChange={set("bankName")} />
          </div>
          <div>
            <label className={LABEL}>Account No</label>
            <input className={INPUT} value={form.accountNo} onChange={set("accountNo")} />
          </div>
          <div>
            <label className={LABEL}>Account Title</label>
            <input className={INPUT} value={form.accountTitle} onChange={set("accountTitle")} />
          </div>
        </div>
      </div>

      {/* ── Expiry ── */}
      <div className="mb-5">
        <label className={LABEL}>Expiry Duration</label>
        <div className="flex gap-3">
          {["2", "4"].map((d) => (
            <button
              key={d}
              onClick={() => setForm({ ...form, expiryDays: d })}
              className={`px-6 py-2 rounded-xl text-sm font-semibold border transition-all ${
                form.expiryDays === d
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {d} Din
            </button>
          ))}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleGenerate}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <FiFileText /> Generate Karo
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <FiDownload /> PDF Download
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <FiSave /> Save Karo
        </button>
        <button
          onClick={onGmail}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <FiMail /> Gmail Bhejo
        </button>
      </div>
    </div>
  );
}