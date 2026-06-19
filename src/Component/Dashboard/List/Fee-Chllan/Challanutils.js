// ============================================
//  Challanutils.js
//  Storage + Helper functions for BTN Challan
// ============================================

const CHALLANS_KEY = "btn_challans";
const COUNT_KEY    = "btn_chl_count";

// ── Auto Challan Number ──────────────────────
export function getNextChallanNo() {
  let count = parseInt(localStorage.getItem(COUNT_KEY) || "0");
  count++;
  localStorage.setItem(COUNT_KEY, count);
  const year = new Date().getFullYear();
  return `BTN-${year}${String(count).padStart(6, "0")}`;
}

// ── Date Format: DD-MM-YYYY ──────────────────
export function formatDate(date) {
  const d = new Date(date);
  return (
    String(d.getDate()).padStart(2, "0") + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    d.getFullYear()
  );
}

// ── Expiry Date Calculate ────────────────────
export function getExpiryDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + parseInt(days));
  return d;
}

// ── Amount to Words ──────────────────────────
export function numToWords(n) {
  n = parseInt(n);
  if (isNaN(n)) return "";
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
    "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (n === 0)    return "Zero";
  if (n < 20)     return ones[n];
  if (n < 100)    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  if (n < 1000)   return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
  if (n < 100000) return numToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numToWords(n % 1000) : "");
  return n.toString();
}

// ── Load All Challans ────────────────────────
export function loadChallans() {
  try {
    return JSON.parse(localStorage.getItem(CHALLANS_KEY) || "[]");
  } catch { return []; }
}

// ── Save One Challan ─────────────────────────
export function saveChallan(data) {
  const list = loadChallans();
  list.unshift(data);
  localStorage.setItem(CHALLANS_KEY, JSON.stringify(list));
}

// ── Delete One Challan ───────────────────────
export function deleteChallan(index) {
  const list = loadChallans();
  list.splice(index, 1);
  localStorage.setItem(CHALLANS_KEY, JSON.stringify(list));
}

// ── Clear All Challans ───────────────────────
export function clearAllChallans() {
  localStorage.removeItem(CHALLANS_KEY);
  localStorage.removeItem(COUNT_KEY);
}

// ── PDF Download (student naam se) ──────────
export function downloadChallanPDF(data) {
  const words = numToWords(data.amount);

  const copyHTML = (title, footerText) => `
    <div class="copy">
      <div class="hdr">${title}</div>
      <div class="org-row">
        <div>
          <div class="org-name">BTN</div>
          <div class="org-sub">Better Training Network</div>
        </div>
        <div class="bank-right">${data.bankName}</div>
      </div>
      <div class="acct">
        <b>Account No:</b> ${data.accountNo}<br/>
        <b>Account Title:</b> ${data.accountTitle}
      </div>
      <div class="lbl">Challan No</div><div class="val">${data.challanNo}</div>
      <div class="lbl">Date</div><div class="val">${data.date}</div>
      <div class="lbl">Expiry Date</div><div class="val">${data.expiry}</div>
      <div class="lbl">Name</div><div class="val">${data.name}</div>
      <div class="lbl">CNIC</div><div class="val">${data.cnic}</div>
      <div class="lbl">Course</div><div class="val">${data.course}</div>
      <div class="lbl">Category</div><div class="val">${data.category}</div>
      <table>
        <thead><tr><th>Fee Type</th><th>Amount</th></tr></thead>
        <tbody><tr>
          <td>${data.feeType}</td>
          <td>Rs. ${parseInt(data.amount).toLocaleString()}</td>
        </tr></tbody>
      </table>
      <div class="foot">${footerText}</div>
    </div>`;

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<title>BTN Challan - ${data.challanNo}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:monospace;font-size:11px}
  .wrap{display:flex;gap:8px;padding:12px}
  .copy{flex:1;border:1px solid #333;padding:10px;min-width:170px}
  .hdr{background:#e0e0e0;text-align:center;font-weight:bold;padding:5px;margin-bottom:8px;font-size:12px}
  .org-row{display:flex;justify-content:space-between;margin-bottom:6px}
  .org-name{font-weight:900;color:#1a3a8f;font-size:14px}
  .org-sub{font-size:10px;color:#1a3a8f}
  .bank-right{font-size:10px;font-weight:bold;text-align:right}
  .acct{font-size:10px;border-bottom:1px solid #ccc;padding-bottom:5px;margin-bottom:4px;line-height:1.7}
  .lbl{background:#d0d0d0;padding:2px 4px;font-weight:bold;font-size:10px;margin-top:4px}
  .val{padding:2px 4px;font-size:11px}
  table{width:100%;border-collapse:collapse;margin-top:6px;font-size:10px}
  th,td{border:1px solid #999;padding:3px 5px}
  th{background:#d0d0d0;font-weight:bold}
  .foot{font-size:10px;color:#555;margin-top:6px;font-style:italic}
  @media print{body{margin:0}@page{margin:5mm}}
</style></head>
<body>
<div class="wrap">
  ${copyHTML("Bank Copy", `Amount in Words: ${words} Only`)}
  ${copyHTML("BTN Office Copy", "Office Copy")}
  ${copyHTML("Student Copy", "Keep for record")}
</div>
<script>window.onload=()=>{window.print()}<\/script>
</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  // File naam: StudentName-ChallanNo.html
  const safeName = data.name.replace(/\s+/g, "-");
  a.download = `${safeName}-${data.challanNo}.html`;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Gmail Link (clean text, no fake data) ───
export function buildGmailLink(d) {
  const sub = encodeURIComponent(`BTN Fee Challan - ${d.challanNo} - ${d.name}`);
  const body = encodeURIComponent(
`Dear ${d.name},

Assalam o Alaikum!

Aapka BTN Fee Challan tayar ho gaya hai. Details neeche hain:

━━━━━━━━━━━━━━━━━━━━━━━━━━
  CHALLAN DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━
Challan No    : ${d.challanNo}
Date          : ${d.date}
Expiry Date   : ${d.expiry}
━━━━━━━━━━━━━━━━━━━━━━━━━━
  STUDENT INFO
━━━━━━━━━━━━━━━━━━━━━━━━━━
Name          : ${d.name}
CNIC          : ${d.cnic}
Course        : ${d.course}
Category      : ${d.category}
━━━━━━━━━━━━━━━━━━━━━━━━━━
  PAYMENT INFO
━━━━━━━━━━━━━━━━━━━━━━━━━━
Fee Type      : ${d.feeType}
Amount        : Rs. ${parseInt(d.amount).toLocaleString()}
Bank          : ${d.bankName}
Account No    : ${d.accountNo}
Account Title : ${d.accountTitle}
━━━━━━━━━━━━━━━━━━━━━━━━━━

Expiry date se pehle payment zaroor karein.

Note: Challan PDF alag se download karke attach kar dein.

Regards,
BTN Better Training Network`
  );
  return `https://mail.google.com/mail/?view=cm&su=${sub}&body=${body}`;
}