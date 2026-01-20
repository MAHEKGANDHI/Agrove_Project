import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiMoon, FiSun, FiUser } from "react-icons/fi";

export default function NavbarNew({ isDarkMode, setIsDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard", requireLogin: true },
    { path: "/farms", label: "Farms", requireLogin: true },
    { path: "/activities", label: "Activities", requireLogin: true },
    { path: "/advisory", label: "Advisory", requireLogin: true },
    { path: "/analytics", label: "Analytics", requireLogin: true },
  ];

  return (
    <nav className="bg-agro-green dark:bg-agro-dark shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate("/")}>
              🌱 Agrove
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                if (link.requireLogin && !isLoggedIn) return null;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive(link.path)
                        ? "bg-agro-dark text-white"
                        : "text-white hover:bg-agro-light"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
                  title="Profile"
                >
                  <FiUser size={20} />
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-white text-agro-green rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-agro-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              if (link.requireLogin && !isLoggedIn) return null;
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-agro-light text-white"
                      : "text-white hover:bg-agro-light"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            {isLoggedIn && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
