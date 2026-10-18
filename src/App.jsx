import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./Component/Auth/Login";
import AdminRegister from "./Component/Auth/Signup";
import DashboardLayout from "./Component/Dashboard/DashboardLayout";
import ProtectedRoute from "./Component/Dashboard/ProtectedRoute/ProtectedRoute";
import Navbar from "./Component/Website/Navbar/Navbar";
import Home from "./Component/Website/Home";
import WebsiteLogin from "./Component/Website/Login/Login";
import WebsiteRegister from "./Component/Website/Login/Signup";
import ContactUs from "./Component/Website/Contact/Contact";
import AboutUs from "./Component/Website/About-Us/About-us";
import Facilities from "./Component/Website/Facilities/Facilities";
import Training from "./Component/Website/Traning-program/Traning";
import FeePlans from "./Component/Website/Fee Plane/Fee";
import Blog from "./Component/Website/Blog/Blog";
import ApplyHome from "./Component/Website/Apply/ApplyHome";
import StudentForm from "./Component/Website/Apply/StudentForm";
import TeacherForm from "./Component/Website/Apply/TeacherForm";

const App = () => {
  const { pathname } = useLocation();
  const isAdminRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/signup" ||
    pathname === "/not-authorized" ||
    pathname.startsWith("/dashboard");
  const hideWebsiteNavbar =
    pathname === "/site/login" ||
    pathname === "/site/register" ||
    pathname === "/apply" ||
    pathname.startsWith("/apply/");

  return (
    <>
      {!isAdminRoute && !hideWebsiteNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/traninig" element={<Training />} />
        <Route path="/fee" element={<FeePlans />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/apply" element={<ApplyHome />} />
        <Route path="/apply/student" element={<StudentForm />} />
        <Route path="/apply/teacher" element={<TeacherForm />} />
        <Route path="/site/login" element={<WebsiteLogin />} />
        <Route path="/site/register" element={<WebsiteRegister />} />

        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminRegister />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowed={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/not-authorized"
          element={
            <div className="p-8 text-center text-xl text-red-600">
              You are not authorized to view this page.
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;