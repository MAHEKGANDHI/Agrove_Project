import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddFarm from "./pages/AddFarm";
import Home from "./components/Home";
import FieldManagement from "./components/FieldManagement";
import ActivityLog from "./components/ActivityLog";
import AdvisoryHub from "./components/AdvisoryHub";
import Analytics from "./components/Analytics";
import DataExport from "./components/DataExport";
import Profile from "./components/Profile";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/login" element={<Login isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/register" element={<Register isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/add-farm" element={<AddFarm isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/farms" element={<FieldManagement isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/activities" element={<ActivityLog isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/advisory" element={<AdvisoryHub isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/analytics" element={<Analytics isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/export" element={<DataExport isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/profile" element={<Profile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
