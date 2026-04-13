import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/signup", {
        name,
        email,
        password,
      });

      setLoading(false);

      // after signup → go to login
      navigate("/");

    } catch (err) {
      setLoading(false);

      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}{" "}
            {/* LOGIN LINK NEXT TO ERROR */}
            {error.toLowerCase().includes("email") && (
              <span
                onClick={() => navigate("/")}
                style={{
                  color: "blue",
                  marginLeft: "10px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                Login instead
              </span>
            )}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;