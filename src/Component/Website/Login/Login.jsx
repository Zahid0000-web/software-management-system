import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Global State/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    // ------------- ROLE ASSIGN -------------
    let role = "";
    if (email === "admin@gmail.com") role = "admin";
    else if (email === "user@gmail.com") role = "user";
    else if (email === "manager@gmail.com") role = "manager";
    else role = "user"; // default

    // SAVE ROLE + LOGIN (pass a user object so `user.role` exists)
    const userObj = { name: email.split("@")[0], email, role };
    login(userObj);

    // REDIRECT AFTER LOGIN
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-gray-50 p-8 rounded-lg">
        <h2 className="text-[26px] font-bold mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 my-1.5 bg-gray-200 border-none rounded-lg focus:outline-none"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 my-1.5 bg-gray-200 border-none rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
