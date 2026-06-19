import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/admin/signup",
        { username, email, password }
      );

      if (res.data.success) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSignup}>
        <h1 style={styles.title}>Admin Signup</h1>

        {error && (
          <div style={{ ...styles.input, background: "#fee2e2", color: "#991b1b", padding: "10px" }}>
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.btn} disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p style={styles.text}>
          Already have account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  card: {
    width: "350px",
    padding: "30px",
    background: "#1e293b",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    color: "white",
    textAlign: "center",
  },

  input: {
    height: "40px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
  },

  btn: {
    height: "40px",
    border: "none",
    background: "#16a34a",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },

  text: {
    color: "white",
    textAlign: "center",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
  },
};