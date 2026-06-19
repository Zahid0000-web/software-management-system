import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import DashboardNavbar from "./Navbar/Navbar";
import DashboardHome from "./Pages/Home";
import Users from "./Pages/Users";
import Settings from "../Auth/Settings";
import Addblog from "./Component/Add-Blog/Addblog";
import Teacherapplication from "../Teacher-Application/Teacherapplication";
import StudentApplication from "../Studentapplication/Studetnapplication";
import Teacherlist from "./List/Teacherlist/Teacherlist";
import StudentsList from "./List/Studentslist/Studentslist";
import FeeChallan from "../Dashboard/List/Fee-Chllan/FeeChallan";
import Feereport from "../Dashboard/List/Studentslist/Feereport";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto mt-20">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="application/teachers-applications" element={<Teacherapplication />} />
            <Route path="application/students-applications" element={<StudentApplication />} />
            <Route path="add/student" element={<Addblog />} />
            <Route path="add/blog" element={<Addblog />} />
            <Route path="Teacherlist" element={<Teacherlist />} />
            <Route path="StudentsList" element={<StudentsList />} />
            <Route path="fee-challan" element={<FeeChallan />} />
            <Route path="fee-report" element={<Feereport />} />

            {/* ✅ Wildcard hamesha sabse neeche */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;