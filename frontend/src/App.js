import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddFarm from "./pages/AddFarm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import FieldManagement from "./components/FieldManagement";
import ActivityLog from "./components/ActivityLog";
import AdvisoryHub from "./components/AdvisoryHub";
import Analytics from "./components/Analytics";
import DataExport from "./components/DataExport";
import Profile from "./components/Profile";

function App() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-farm" element={<AddFarm />} />
        <Route path="/farms" element={<FieldManagement />} />
        <Route path="/activities" element={<ActivityLog />} />
        <Route path="/advisory" element={<AdvisoryHub />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/export" element={<DataExport />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
