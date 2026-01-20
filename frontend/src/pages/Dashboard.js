import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";
import "./Dashboard.css";

export default function Dashboard() {
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/farms")
      .then((res) => {
        // ✅ HANDLE BOTH API RESPONSE TYPES
        if (Array.isArray(res.data)) {
          setFarms(res.data);
        } else if (Array.isArray(res.data.fields)) {
          setFarms(res.data.fields);
        } else {
          setFarms([]);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Failed to load farms");
          console.error(err);
        }
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <h2>🌱 Agrove Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="dashboard">
        <div className="dashboard-header">
          <h2>🌾 My Farms</h2>

          <div className="dashboard-actions">
            <button onClick={() => navigate("/farms")}>➕ Manage Fields</button>
            <button onClick={() => navigate("/activities")}>📋 Log Activities</button>
            <button onClick={() => navigate("/analytics")}>📊 View Analytics</button>
            <button onClick={() => navigate("/advisory")}>💡 Advisory Hub</button>
            <button onClick={() => navigate("/export")}>📥 Export Data</button>
            <button onClick={() => navigate("/profile")}>👤 My Profile</button>
          </div>
        </div>

        {farms.length === 0 && (
          <p className="empty-text">
            🌱 No farms added yet. Click <b>Manage Fields</b> to add your first farm.
          </p>
        )}

        <div className="farm-grid">
          {farms.map((farm) => (
            <div className="farm-card" key={farm._id}>
              <h3>{farm.fieldName}</h3>
              <p><strong>🌱 Crop:</strong> {farm.crop}</p>
              <p><strong>📏 Area:</strong> {farm.area} hectares</p>
              <p><strong>🪨 Soil:</strong> {farm.soilType}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
