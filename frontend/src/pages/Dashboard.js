import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

export default function Dashboard() {
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/farms")
      .then((res) => setFarms(res.data.fields || []))
      .catch(() => {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <h2>🌱 Agrove Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>🌾 My Farms</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/farms")}
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ➕ Manage Fields
            </button>
            <button
              onClick={() => navigate("/activities")}
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              📋 Log Activities
            </button>
            <button
              onClick={() => navigate("/analytics")}
              style={{
                backgroundColor: "#f57c00",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              📊 View Analytics
            </button>
            <button
              onClick={() => navigate("/advisory")}
              style={{
                backgroundColor: "#7b1fa2",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              💡 Advisory Hub
            </button>
            <button
              onClick={() => navigate("/export")}
              style={{
                backgroundColor: "#0097a7",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              📥 Export Data
            </button>
            <button
              onClick={() => navigate("/profile")}
              style={{
                backgroundColor: "#c2185b",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              👤 My Profile
            </button>
          </div>
        </div>

        {/* Empty State */}
        {farms.length === 0 && (
          <p style={{ color: "#777", marginTop: "30px" }}>
            🌱 No farms added yet. Click <b>Add Farm</b> to get started.
          </p>
        )}

        {/* Farm Cards */}
        {farms.map((farm) => (
          <div className="farm-card" key={farm._id}>
            <h3>{farm.fieldName}</h3>
            <p><strong>🌱 Crop:</strong> {farm.crop}</p>
            <p><strong>📏 Area:</strong> {farm.area} hectares</p>
            <p><strong>🪨 Soil:</strong> {farm.soilType}</p>
          </div>
        ))}
      </div>
    </>
  );
}
