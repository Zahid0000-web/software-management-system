// feeStorage.js
// Structure: { studentId: { "2025-01": { amount: 5000, paid: true }, "2025-02": { amount: 5000, paid: false } } }

export const getFeeData = () => {
  const saved = localStorage.getItem("feeData_v2");
  return saved ? JSON.parse(saved) : {};
};

export const saveFeeData = (data) => {
  localStorage.setItem("feeData_v2", JSON.stringify(data));
};

export const updateStudentFee = (feeData, studentId, monthKey, field, value) => {
  const updated = {
    ...feeData,
    [studentId]: {
      ...feeData[studentId],
      [monthKey]: {
        ...(feeData[studentId]?.[monthKey] || {}),
        [field]: value,
      },
    },
  };
  saveFeeData(updated);
  return updated;
};

export const addNewMonth = (feeData, studentId, monthKey) => {
  if (feeData[studentId]?.[monthKey]) return feeData; // already exists
  const updated = {
    ...feeData,
    [studentId]: {
      ...feeData[studentId],
      [monthKey]: { amount: "", paid: false },
    },
  };
  saveFeeData(updated);
  return updated;
};

export const removeMonth = (feeData, studentId, monthKey) => {
  const studentFees = { ...feeData[studentId] };
  delete studentFees[monthKey];
  const updated = { ...feeData, [studentId]: studentFees };
  saveFeeData(updated);
  return updated;
};

export const getMonthLabel = (monthKey) => {
  // monthKey = "2025-01"
  const [year, month] = monthKey.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};

export const getCurrentMonthKey = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};