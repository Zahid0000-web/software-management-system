import { useState } from "react";
import axios from "axios";

export default function Settings() {
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const [activeTab, setActiveTab] = useState("profile");
  const [firstName, setFirstName] = useState(admin.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(admin.name?.split(" ")[1] || "");
  const [email, setEmail] = useState(admin.email || "");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [profileMsg, setProfileMsg] = useState({ text: "", type: "" });
  const [passMsg, setPassMsg] = useState({ text: "", type: "" });

  const showMsg = (setter, text, type) => {
    setter({ text, type });
    setTimeout(() => setter({ text: "", type: "" }), 3000);
  };

  const saveProfile = async () => {
    if (!firstName || !email) {
      showMsg(setProfileMsg, "Naam aur email zaruri hain", "error"); return;
    }
    try {
      const res = await axios.put("http://localhost:5001/api/update-profile", {
        id: admin._id,
        name: `${firstName} ${lastName}`,
        email,
      });
      const updated = { ...admin, name: `${firstName} ${lastName}`, email };
      localStorage.setItem("admin", JSON.stringify(updated));
      showMsg(setProfileMsg, "Profile update ho gaya!", "success");
    } catch {
      showMsg(setProfileMsg, "Server error", "error");
    }
  };

  const savePassword = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      showMsg(setPassMsg, "Tamam fields bharein", "error"); return;
    }
    if (newPass !== confirmPass) {
      showMsg(setPassMsg, "Passwords match nahi kar rahe", "error"); return;
    }
    if (newPass.length < 6) {
      showMsg(setPassMsg, "Password 6 characters se zyada hona chahiye", "error"); return;
    }
    try {
      const res = await axios.put("http://localhost:5001/api/change-password", {
        id: admin._id, oldPassword: oldPass, newPassword: newPass,
      });
      showMsg(setPassMsg, res.data.message, "success");
      setOldPass(""); setNewPass(""); setConfirmPass("");
    } catch (err) {
      showMsg(setPassMsg, err.response?.data?.message || "Server error", "error");
    }
  };

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "AD";

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "password", label: "Password", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-52 bg-white border-r border-slate-200 p-4 shrink-0">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 px-2">Settings</p>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm mb-1 text-left transition-colors ${
              activeTab === t.id
                ? "bg-slate-100 font-medium text-slate-800 border-l-2 border-blue-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-2xl">

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Profile Settings</h2>
            <p className="text-sm text-slate-500 mb-6">Apna naam aur email update karein</p>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-blue-200 text-xl font-semibold">
                  {initials}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{firstName} {lastName}</p>
                  <p className="text-sm text-slate-500">{email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Pehla naam</label>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Aakhri naam</label>
                  <input value={lastName} onChange={e => setLastName(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button className="h-9 px-4 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
                <button onClick={saveProfile} className="h-9 px-4 bg-slate-900 text-blue-100 rounded-lg text-sm hover:bg-slate-700">Save karein</button>
              </div>
              {profileMsg.text && (
                <p className={`text-sm mt-3 p-2 rounded-lg text-center ${
                  profileMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                  {profileMsg.text}
                </p>
              )}
            </div>
          </div>
        )}

        {/* PASSWORD TAB */}
        {activeTab === "password" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Password Change karein</h2>
            <p className="text-sm text-slate-500 mb-6">Apna password secure rakhein</p>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Purana password</label>
                <input type="password" value={oldPass} onChange={e => setOldPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <hr className="border-slate-100" />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Naya password</label>
                <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Confirm password</label>
                <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => { setOldPass(""); setNewPass(""); setConfirmPass(""); }}
                  className="h-9 px-4 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
                <button onClick={savePassword}
                  className="h-9 px-4 bg-slate-900 text-blue-100 rounded-lg text-sm hover:bg-slate-700">Update karein</button>
              </div>
              {passMsg.text && (
                <p className={`text-sm p-2 rounded-lg text-center ${
                  passMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                  {passMsg.text}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}