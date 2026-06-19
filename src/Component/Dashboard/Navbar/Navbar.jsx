// Navbar/Navbar.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch, FiBell, FiGrid, FiSettings,
  FiLogOut, FiUser, FiCheck, FiClock,
  FiUserPlus, FiBookOpen
} from "react-icons/fi";
import { AuthContext } from "../../Global State/Ctx";

const API_URL = "http://localhost:5001";

const DashboardNavbar = () => {
  const [notifications, setNotifications]   = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen]       = useState(false);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const navigate   = useNavigate();
  const { logout } = useContext(AuthContext);

  /* ── Fetch on mount + every 30s ── */
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  /* ── Click outside close ── */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res  = await fetch(`${API_URL}/api/notifications`);
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    } catch (err) {
      console.log("Fetch notifications error:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_URL}/api/notifications/${id}/read`, { method: "PUT" });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setNotificationOpen(false); // ✅ dropdown band
    } catch (err) {
      console.log(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${API_URL}/api/notifications/read-all`, { method: "PUT" });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "student": return <FiUserPlus size={16} />;
      case "teacher": return <FiUserPlus size={16} />;
      case "blog":    return <FiBookOpen size={16} />;
      default:        return <FiClock size={16} />;
    }
  };

  const formatTime = (date) => {
    const diff    = Date.now() - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours   = Math.floor(diff / 3600000);
    const days    = Math.floor(diff / 86400000);
    if (minutes < 1)  return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24)   return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  /* ── Badge label ── */
  const badgeLabel =
    unreadCount > 99 ? "99+" : unreadCount > 9 ? "9+" : unreadCount;

  return (
    <nav className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-slate-900/95 backdrop-blur-md border-b border-white/10 flex items-center justify-end px-4 md:px-6 z-30">

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* Quick Add */}
        <button
          onClick={() => navigate("/dashboard/add/student")}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-emerald-500/20"
        >
          <FiGrid size={16} />
          <span>New</span>
        </button>

        {/* ── Notifications ── */}
       

        {/* ── Profile ── */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationOpen(false);
            }}
            className="flex items-center gap-3 pl-3 border-l border-white/10 hover:bg-white/5 rounded-xl transition-all"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-dropdown">
              <div className="p-4 border-b border-white/10">
                <p className="font-semibold text-white">Admin User</p>
                <p className="text-xs text-slate-400">admin@example.com</p>
              </div>
              <div className="p-2">
                <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                  <FiUser size={18} />
                  <span className="text-sm">Profile</span>
                </Link>
                <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                  <FiSettings size={18} />
                  <span className="text-sm">Settings</span>
                </Link>
              </div>
              <div className="p-2 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <FiLogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown { animation: dropdown 0.2s ease-out; }
      `}</style>
    </nav>
  );
};

export default DashboardNavbar;