import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  // login can accept an optional user object: { name, role }
  const login = (userObj) => {
    setIsLoggedIn(true);
    if (userObj) setUser(userObj);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const addApplication = (app) => {
    setApplications((prev) => [...prev, { ...app, status: "Pending" }]);
  };

  const updateApplicationStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        applications,
        addApplication,
        updateApplicationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
