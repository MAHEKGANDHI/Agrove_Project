import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">🌾</span>
          <span className="logo-text">Agrove</span>
        </Link>

        {isLoggedIn ? (
          <>
            <div className="nav-links">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/farms" className="nav-link">
                Fields
              </Link>
              <Link to="/activities" className="nav-link">
                Activities
              </Link>
              <Link to="/advisory" className="nav-link">
                Advisory
              </Link>
              <Link to="/analytics" className="nav-link">
                Analytics
              </Link>
              <Link to="/export" className="nav-link">
                Export
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </div>

            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
