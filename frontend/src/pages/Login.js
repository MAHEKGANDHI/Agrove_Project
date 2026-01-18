import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      setIsLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyEvent = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Agrove Login 🌱</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyEvent}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyEvent}
        />

        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New user? <a href="/register">Register here</a>
        </p>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <a href="/" style={{ fontSize: "0.9em" }}>← Back to Home</a>
        </p>

      </div>
    </div>
  );
}
