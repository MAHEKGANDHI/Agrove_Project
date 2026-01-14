import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    API.get("/farms")
      .then(res => setFarms(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      {farms.map(farm => (
        <div key={farm._id}>
          🌾 {farm.fieldName} - {farm.crop}
        </div>
      ))}
    </div>
  );
}
