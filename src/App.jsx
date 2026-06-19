import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Component/Auth/Login";
import Register from "./Component/Auth/Signup";
import DashboardLayout from "./Component/Dashboard/DashboardLayout";
import ProtectedRoute from "./Component/Dashboard/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/register" element={<Register />} />

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

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;