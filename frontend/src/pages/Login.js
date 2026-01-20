import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import NavbarNew from "../components/NavbarNew";
import API from "../services/api";
import { showError, showSuccess } from "../services/toast";

export default function Login({ isDarkMode, setIsDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }
    try {
      setIsLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      localStorage.setItem("userId", res.data.userId);
      showSuccess("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      showError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarNew isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="min-h-screen bg-gradient-to-br from-agro-light to-agro-green dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md card">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-agro-green dark:text-agro-light mb-2">🌱 Agrove</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Login to manage your farm</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <FiLogIn size={20} />
              <span>{isLoading ? "Logging in..." : "Login"}</span>
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-agro-green dark:text-agro-light font-semibold hover:underline"
              >
                Register here
              </button>
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-agro-green dark:hover:text-agro-light"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
