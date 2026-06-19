import { useEffect, useState } from "react";
import axios from "axios";

export default function Settings() {
  const [admin, setAdmin] = useState(null);

  // Profile
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileMsg, setProfileMsg] = useState({ text: "", ok: true });
  const [profileLoading, setProfileLoading] = useState(false);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passMsg, setPassMsg] = useState({ text: "", ok: true });
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("admin"));
    if (data) {
      setAdmin(data);
      setUsername(data.username);
      setEmail(data.email);
    }
  }, []);

  // ================= UPDATE PROFILE =================
  const updateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ text: "", ok: true });
    setProfileLoading(true);

    try {
      const res = await axios.put("http://localhost:5001/api/admin/update-profile", {
        adminId: admin._id,
        username,
        email,
      });

      if (res.data.success) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        setAdmin(res.data.admin);
        setProfileMsg({ text: "Profile updated successfully ✓", ok: true });
      } else {
        setProfileMsg({ text: res.data.message, ok: false });
      }
    } catch {
      setProfileMsg({ text: "Server Error", ok: false });
    } finally {
      setProfileLoading(false);
    }
  };

  // ================= CHANGE PASSWORD =================
  const changePassword = async (e) => {
    e.preventDefault();
    setPassMsg({ text: "", ok: true });

    if (newPassword !== confirmPassword) {
      setPassMsg({ text: "New passwords do not match", ok: false });
      return;
    }
    if (newPassword.length < 6) {
      setPassMsg({ text: "Password must be at least 6 characters", ok: false });
      return;
    }

    setPassLoading(true);

    try {
      const res = await axios.put("http://localhost:5001/api/admin/change-password", {
        adminId: admin._id,
        currentPassword,
        newPassword,
      });

      if (res.data.success) {
        setPassMsg({ text: "Password changed successfully ✓", ok: true });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPassMsg({ text: res.data.message, ok: false });
      }
    } catch {
      setPassMsg({ text: "Server Error", ok: false });
    } finally {
      setPassLoading(false);
    }
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account</p>
        </div>

        {/* Avatar + Name Banner */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {username?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{username}</p>
            <p className="text-slate-400 text-sm">{email}</p>
          </div>
        </div>

        {/* ===== UPDATE PROFILE ===== */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            Update Profile
          </h2>

          {profileMsg.text && (
            <div className={`mb-4 text-sm rounded-xl px-4 py-3 border ${profileMsg.ok
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
              {profileMsg.text}
            </div>
          )}

          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={profileLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl py-3 text-sm transition flex items-center justify-center gap-2"
            >
              {profileLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : "Save Changes"}
            </button>
          </form>
        </div>

        {/* ===== CHANGE PASSWORD ===== */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            Change Password
          </h2>

          {passMsg.text && (
            <div className={`mb-4 text-sm rounded-xl px-4 py-3 border ${passMsg.ok
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
              {passMsg.text}
            </div>
          )}

          <form onSubmit={changePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={passLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-xl py-3 text-sm transition flex items-center justify-center gap-2"
            >
              {passLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Updating...
                </>
              ) : "Change Password"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}