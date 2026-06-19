// ============================================
//  Studentdb.jsx
//  Saved challans list (local database view)
// ============================================

import { FiList, FiTrash2, FiTrash, FiAlertCircle, FiBook, FiLayers, FiTag } from "react-icons/fi";

export default function Studentdb({ savedList, onDelete, onClearAll }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FiList className="text-blue-500" />
          Saved Challans
          <span className="text-xs bg-blue-50 text-blue-500 border border-blue-100 px-2 py-0.5 rounded-full font-semibold ml-1">
            {savedList.length}
          </span>
        </h2>
        {savedList.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
          >
            <FiTrash /> Sab Clear
          </button>
        )}
      </div>

      {/* ── Empty State ── */}
      {savedList.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <FiAlertCircle className="mx-auto mb-2 text-2xl" />
          <p className="text-sm">Abhi koi challan save nahi hai</p>
        </div>
      ) : (
        <div className="space-y-2">
          {savedList.map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-start bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
            >
              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-800">{c.name}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <FiBook size={10} /> {c.course}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <FiLayers size={10} /> {c.feeType}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <FiTag size={10} /> {c.category}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {c.challanNo} &middot; Rs. {parseInt(c.amount).toLocaleString()} &middot; Expiry: {c.expiry}
                </p>
              </div>

              {/* Badge + Delete */}
              <div className="flex items-center gap-2 ml-3">
                <span className="text-[10px] bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                  Saved
                </span>
                <button
                  onClick={() => onDelete(i)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}