// ============================================
//  FeeChallan.jsx  ← MAIN FILE
//  Sab components yahan import hain
// ============================================

import { useState, useEffect } from "react";
import { FiPrinter } from "react-icons/fi";

import ChallanForm from "./ChallanForm";
import Studentdb   from "./Studentdb";
import {
  saveChallan,
  loadChallans,
  deleteChallan,
  clearAllChallans,
  buildGmailLink,
  downloadChallanPDF,
  numToWords,
} from "./Challanutils";

const COPIES = [
  { title: "Bank Copy",       note: (w) => `Amount in Words: ${w} Only` },
  { title: "BTN Office Copy", note: ()  => "Office Copy"                },
  { title: "Student Copy",    note: ()  => "Keep for record"            },
];

// ── Single Copy ──────────────────────────────
function ChallanCopy({ title, note, data }) {
  const words = numToWords(data.amount);
  return (
    <div className="flex-1 border border-gray-400 p-3 text-xs font-mono bg-white text-gray-900 min-w-[180px]">
      <div className="bg-gray-200 text-center font-bold text-sm py-1 mb-2">{title}</div>
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-extrabold text-blue-900 text-sm">BTN</p>
          <p className="text-[10px] text-blue-800">Better Training Network</p>
        </div>
        <p className="font-bold text-[10px] text-right">{data.bankName}</p>
      </div>
      <div className="text-[10px] mb-2 border-b border-gray-300 pb-2 leading-relaxed">
        <b>Account No:</b> {data.accountNo}<br />
        <b>Account Title:</b> {data.accountTitle}
      </div>
      {[
        ["Challan No",  data.challanNo],
        ["Date",        data.date     ],
        ["Expiry Date", data.expiry   ],
        ["Name",        data.name     ],
        ["CNIC",        data.cnic     ],
        ["Course",      data.course   ],
        ["Category",    data.category ],
      ].map(([label, value]) => (
        <div key={label}>
          <div className="bg-gray-200 px-1 py-0.5 font-bold text-[10px] mt-1">{label}</div>
          <div className="px-1 py-0.5 text-[11px]">{value}</div>
        </div>
      ))}
      <table className="w-full border-collapse mt-2 text-[10px]">
        <thead>
          <tr>
            <th className="bg-gray-200 border border-gray-400 px-1 py-0.5 text-left">Fee Type</th>
            <th className="bg-gray-200 border border-gray-400 px-1 py-0.5 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-1 py-0.5">{data.feeType}</td>
            <td className="border border-gray-400 px-1 py-0.5">Rs. {parseInt(data.amount).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-[10px] text-gray-600 mt-2 italic">{note(words)}</p>
    </div>
  );
}

// ── Preview Section ──────────────────────────
function ChallanPreview({ data }) {
  const handlePrint = () => {
    const content = document.getElementById("challan-print-area").innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"/>
    <title>BTN Challan - ${data.challanNo}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:monospace;font-size:11px}
      .wrap{display:flex;gap:8px;padding:12px}
      .copy{flex:1;border:1px solid #333;padding:10px;min-width:170px}
      .hdr{background:#e0e0e0;text-align:center;font-weight:bold;padding:5px;margin-bottom:8px;font-size:12px}
      .org-name{font-weight:900;color:#1a3a8f;font-size:14px}
      .org-sub{font-size:10px;color:#1a3a8f}
      .acct{font-size:10px;border-bottom:1px solid #ccc;padding-bottom:5px;margin-bottom:4px;line-height:1.7}
      .lbl{background:#d0d0d0;padding:2px 4px;font-weight:bold;font-size:10px;margin-top:4px}
      .val{padding:2px 4px;font-size:11px}
      table{width:100%;border-collapse:collapse;margin-top:6px;font-size:10px}
      th,td{border:1px solid #999;padding:3px 5px}
      th{background:#d0d0d0;font-weight:bold}
      .foot{font-size:10px;color:#555;margin-top:6px;font-style:italic}
      @media print{@page{margin:5mm}}
    </style></head><body>
    <div class="wrap">${COPIES.map(({ title, note }) => `
      <div class="copy">
        <div class="hdr">${title}</div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <div><div class="org-name">BTN</div><div class="org-sub">Better Training Network</div></div>
          <div style="font-size:10px;font-weight:bold;text-align:right">${data.bankName}</div>
        </div>
        <div class="acct"><b>Account No:</b> ${data.accountNo}<br><b>Account Title:</b> ${data.accountTitle}</div>
        <div class="lbl">Challan No</div><div class="val">${data.challanNo}</div>
        <div class="lbl">Date</div><div class="val">${data.date}</div>
        <div class="lbl">Expiry Date</div><div class="val">${data.expiry}</div>
        <div class="lbl">Name</div><div class="val">${data.name}</div>
        <div class="lbl">CNIC</div><div class="val">${data.cnic}</div>
        <div class="lbl">Course</div><div class="val">${data.course}</div>
        <div class="lbl">Category</div><div class="val">${data.category}</div>
        <table><thead><tr><th>Fee Type</th><th>Amount</th></tr></thead>
        <tbody><tr><td>${data.feeType}</td><td>Rs. ${parseInt(data.amount).toLocaleString()}</td></tr></tbody></table>
        <div class="foot">${note(numToWords(data.amount))}</div>
      </div>`).join("")}
    </div></body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">Generated Challan</h2>
          <p className="text-xs text-gray-400">
            {data.challanNo} · {data.course} · {data.feeType} · {data.category} · Expiry: {data.expiry}
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        >
          <FiPrinter /> Print
        </button>
      </div>
      <div id="challan-print-area" className="flex gap-2 overflow-x-auto">
        {COPIES.map((c) => (
          <ChallanCopy key={c.title} title={c.title} note={c.note} data={data} />
        ))}
      </div>
    </div>
  );
}

// ── MAIN EXPORT ──────────────────────────────
export default function FeeChallan() {
  const [currentChallan, setCurrentChallan] = useState(null);
  const [savedList,      setSavedList]      = useState([]);

  useEffect(() => { setSavedList(loadChallans()); }, []);

  const handleGenerate = (data) => setCurrentChallan(data);

  const handleDownload = () => {
    if (!currentChallan) { alert("Pehle challan generate karo!"); return; }
    downloadChallanPDF(currentChallan);
  };

  const handleSave = () => {
    if (!currentChallan) { alert("Pehle challan generate karo!"); return; }
    saveChallan(currentChallan);
    setSavedList(loadChallans());
    alert("✅ Challan save ho gaya!");
  };

  const handleGmail = () => {
    if (!currentChallan) { alert("Pehle challan generate karo!"); return; }
    // Pehle PDF download karo, phir Gmail khulo
    downloadChallanPDF(currentChallan);
    setTimeout(() => {
      window.open(buildGmailLink(currentChallan), "_blank");
    }, 800);
  };

  const handleDelete = (i) => { deleteChallan(i); setSavedList(loadChallans()); };

  const handleClearAll = () => {
    if (window.confirm("Sab challans delete ho jayenge. Sure hain?")) {
      clearAllChallans();
      setSavedList([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">BTN</h1>
          <p className="text-xs text-gray-400 -mt-0.5">Better Training Network · Fee Challan System</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-full border border-blue-100">
          {savedList.length} Challans Saved
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        <ChallanForm
          onGenerate={handleGenerate}
          onDownload={handleDownload}
          onSave={handleSave}
          onGmail={handleGmail}
        />
        {currentChallan && <ChallanPreview data={currentChallan} />}
        <Studentdb
          savedList={savedList}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      </div>
    </div>
  );
}