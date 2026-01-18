import { useState } from "react";
import API from "../services/api";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Agrove Login 🌱</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New user? <a href="/register">Register here</a>
        </p>

      </div>
    </div>
  );
}
