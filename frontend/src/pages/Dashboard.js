import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

export default function Dashboard() {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    API.get("/farms")
      .then((res) => setFarms(res.data))
      .catch(() => {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location = "/";
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
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

          <button
            onClick={() => (window.location = "/add-farm")}
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
            ➕ Add Farm
          </button>
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
