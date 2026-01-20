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
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-agro-green/90 dark:bg-agro-dark/90 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-white cursor-pointer tracking-wide"
          >
            🌱 Agrove
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              if (link.requireLogin && !isLoggedIn) return null;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative px-2 py-1 text-sm font-medium text-white transition-all
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all
                    ${isActive(link.path) ? "after:w-full" : "after:w-0 hover:after:w-full"}
                  `}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-3">

            {/* Dark Mode */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                >
                  <FiUser size={20} />
                </button>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-white text-agro-green rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white/20 text-white"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/20 text-white"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-agro-dark`}
      >
        <div className="px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            if (link.requireLogin && !isLoggedIn) return null;
            return (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-agro-light transition"
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
              className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
