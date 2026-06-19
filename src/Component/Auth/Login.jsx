import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg({ text: "Email aur password zaruri hain", type: "error" });
      return;
    }
    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        localStorage.setItem("user", JSON.stringify({ email: res.data.admin.email, role: "admin" }));
        setMsg({ text: "Login ho gaya! Redirect ho raha hai...", type: "success" });
        navigate("/dashboard", { replace: true });
      } else {
        setMsg({ text: res.data.message, type: "error" });
      }
    } catch {
      setMsg({ text: "Server error, dobara try karein", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 w-full max-w-sm shadow-sm">
        
        {/* Logo */}
        <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-5 h-5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-center text-slate-800 mb-1">Welcome back</h2>
        <p className="text-sm text-slate-500 text-center mb-6">Admin panel mein login karein</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-10 px-3 pr-10 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-5 h-10 bg-slate-900 hover:bg-slate-700 text-blue-50 text-sm font-medium rounded-lg transition-colors"
        >
          Login karein
        </button>

        {msg.text && (
          <p className={`text-sm text-center mt-3 p-2 rounded-lg ${
            msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
          }`}>
            {msg.text}
          </p>
        )}

       
      </div>
    </div>
  );
}