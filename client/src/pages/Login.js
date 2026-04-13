import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, send to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      // store token
      localStorage.setItem("token", res.data.token);

      setLoading(false);

      // redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setLoading(false);

      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP LINK */}
        <p style={{ marginTop: "12px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#007bff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;