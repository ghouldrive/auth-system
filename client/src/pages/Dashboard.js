import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    // Decode token payload (simple frontend decode, CV-friendly)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="center">
      <div className="card" style={{ width: "400px" }}>
        <h2>Dashboard</h2>

        {user ? (
          <>
            <p><strong>User ID:</strong> {user.id}</p>
            <p>Welcome back 🎉</p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;