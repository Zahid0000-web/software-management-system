// Sidebar/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FiMenu, FiX, FiChevronDown, FiHome, FiUsers, FiFileText, 
  FiSettings, FiLogOut, FiBook, FiGrid, FiChevronRight,
  FiDollarSign
} from "react-icons/fi";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FiHome size={20} /> },
  { path: "/dashboard/StudentsList", label: "Students", icon: <FiUsers size={20} /> },
  { path: "/dashboard/Teacherlist", label: "Teachers", icon: <FiUsers size={20} /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const applicationItems = [
    { path: "/dashboard/application/teachers-applications", label: "Teacher Applications" },
    { path: "/dashboard/application/students-applications", label: "Student Applications" },
  ];

  const blogItems = [
    { path: "/dashboard/add/blog", label: "Add Blog" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 left-3 z-50 p-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-slate-900 text-white z-40 transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
          <Link to="/dashboard" className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <FiGrid size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">Admin</h1>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest -mt-0.5">Panel</p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-10rem)]">
          
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2 px-4 pt-2">Main Menu</p>
          
          {/* Main Menu Items */}
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                isActive(item.path) 
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${isActive(item.path) ? 'translate-x-0' : ''}`}></div>
              <span className={`relative z-10 transition-transform duration-200 ${hoveredItem === item.path && !isActive(item.path) ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span className="relative z-10 font-medium text-sm">{item.label}</span>
              <FiChevronRight className={`ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-emerald-400 ${isActive(item.path) ? 'opacity-100' : ''}`} />
            </Link>
          ))}

          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2 px-4 pt-4">Management</p>

          {/* Applications Dropdown */}
          <div>
            <button
              onClick={() => setAppsOpen(!appsOpen)}
              onMouseEnter={() => setHoveredItem('apps')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                appsOpen || location.pathname.includes('application')
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FiFileText size={20} />
              <span className="font-medium text-sm">Applications</span>
              <FiChevronDown className={`ml-auto transition-transform duration-200 ${appsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {appsOpen && (
              <div className="ml-3 mt-1 space-y-1 animate-slide-down overflow-hidden">
                {applicationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 pl-11 pr-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                      isActive(item.path)
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive(item.path) ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Blog Dropdown */}
          <div>
            <button
              onClick={() => setBlogOpen(!blogOpen)}
              onMouseEnter={() => setHoveredItem('blog')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                blogOpen || location.pathname.includes('blog')
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FiBook size={20} />
              <span className="font-medium text-sm">Blog</span>
              <FiChevronDown className={`ml-auto transition-transform duration-200 ${blogOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {blogOpen && (
              <div className="ml-3 mt-1 space-y-1 animate-slide-down overflow-hidden">
                {blogItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 pl-11 pr-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                      isActive(item.path)
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive(item.path) ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Fee Report — path fix: /dashboard/fee-report */}
          <Link
            to="/dashboard/fee-report"
            onClick={() => setIsOpen(false)}
            onMouseEnter={() => setHoveredItem('feereport')}
            onMouseLeave={() => setHoveredItem(null)}
            className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/dashboard/fee-report')
                ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FiDollarSign size={20} />
            <span className="font-medium text-sm">Fee Report</span>
          </Link>
          <Link
            to="/dashboard/fee-challan"
            onClick={() => setIsOpen(false)}
            onMouseEnter={() => setHoveredItem('fee-challan')}
            onMouseLeave={() => setHoveredItem(null)}
            className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/dashboard/fee-challan')
                ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FiDollarSign size={20} />
            <span className="font-medium text-sm">Fee Challan</span>
          </Link>

        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <FiLogOut size={20} />
            </div>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>

      </aside>

      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-down { animation: slide-down 0.2s ease-out; }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </>
  );
};

export default Sidebar;