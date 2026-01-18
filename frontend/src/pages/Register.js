import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    try {
      setIsLoading(true);
      await API.post("/auth/register", { name, email, password });
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed. Email may already exist.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyEvent = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Create Account 🌱</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyEvent}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyEvent}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyEvent}
        />

        <button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <a href="/" style={{ fontSize: "0.9em" }}>← Back to Home</a>
        </p>
      </div>
    </div>
  );
}
