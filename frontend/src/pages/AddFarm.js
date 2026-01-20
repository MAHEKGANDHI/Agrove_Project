import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddFarm.css";

export default function AddFarm() {
  const [fieldName, setFieldName] = useState("");
  const [area, setArea] = useState("");
  const [crop, setCrop] = useState("");
  const [soilType, setSoilType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddFarm = async () => {
    if (!fieldName || !area || !crop || !soilType) {
      alert("Please fill all fields 🌱");
      return;
    }

    try {
      setLoading(true);
      await API.post("/farms", {
        fieldName,
        area,
        crop,
        soilType
      });

      alert("Farm added successfully 🌾");
      navigate("/dashboard"); // dashboard fetches farms again
    } catch (err) {
      alert("Failed to add farm");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addfarm-container">
      <div className="addfarm-card">
        <h2>🌾 Add New Farm</h2>

        <label>
          Field Name
          <input
            type="text"
            placeholder="e.g. North Field"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          />
        </label>

        <label>
          Area (hectares)
          <input
            type="number"
            placeholder="e.g. 5.5"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>

        <label>
          Crop Type
          <input
            type="text"
            placeholder="e.g. Wheat"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          />
        </label>

        <label>
          Soil Type
          <input
            type="text"
            placeholder="e.g. Loamy"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          />
        </label>

        <button onClick={handleAddFarm} disabled={loading}>
          {loading ? "Adding..." : "Add Farm 🌱"}
        </button>
      </div>
    </div>
  );
}
