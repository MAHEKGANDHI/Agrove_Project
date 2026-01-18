import { useState } from "react";
import API from "../services/api";
import "../App.css";

export default function AddFarm() {
  const [fieldName, setFieldName] = useState("");
  const [area, setArea] = useState("");
  const [crop, setCrop] = useState("");
  const [soilType, setSoilType] = useState("");

  const handleAddFarm = async () => {
    try {
      await API.post("/farms", {
        fieldName,
        area,
        crop,
        soilType
      });
      alert("Farm added successfully 🌱");
      window.location = "/dashboard";
    } catch (err) {
      alert("Failed to add farm");
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Add Farm 🌾</h2>

        <input placeholder="Field Name" onChange={(e) => setFieldName(e.target.value)} />
        <input placeholder="Area (hectares)" onChange={(e) => setArea(e.target.value)} />
        <input placeholder="Crop Type" onChange={(e) => setCrop(e.target.value)} />
        <input placeholder="Soil Type" onChange={(e) => setSoilType(e.target.value)} />

        <button onClick={handleAddFarm}>Add Farm</button>
      </div>
    </div>
  );
}
