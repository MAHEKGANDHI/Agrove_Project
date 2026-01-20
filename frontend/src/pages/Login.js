import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import API from "../services/api";
import { showError, showSuccess } from "../services/toast";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      showSuccess("Login successful");
      navigate("/dashboard");
    } catch (err) {
      showError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>🌱 Agrove</h1>
        <p>
          Smart Farm Management <br />
          for Modern Farmers
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to manage your farm</p>

          <div className="input-group">
            <FiMail />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FiLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            <FiLogIn /> {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>

          <p className="link back" onClick={() => navigate("/")}>
            ← Back to Home
          </p>
        </form>
      </div>
    </div>
  );
}
