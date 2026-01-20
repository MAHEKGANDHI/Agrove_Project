import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🌾</span>
          <span className="logo-text">Agrove</span>
        </Link>

        {isLoggedIn && (
          <>
            {/* Mobile menu button */}
            <button
              className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Navigation links */}
            <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
              <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
                Dashboard
              </Link>
              <Link to="/farms" className="nav-link" onClick={closeMenu}>
                Fields
              </Link>
              <Link to="/activities" className="nav-link" onClick={closeMenu}>
                Activities
              </Link>
              <Link to="/advisory" className="nav-link" onClick={closeMenu}>
                Advisory
              </Link>
              <Link to="/analytics" className="nav-link" onClick={closeMenu}>
                Analytics
              </Link>
              <Link to="/export" className="nav-link" onClick={closeMenu}>
                Export
              </Link>
              <Link to="/profile" className="nav-link" onClick={closeMenu}>
                Profile
              </Link>
            </div>

            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
