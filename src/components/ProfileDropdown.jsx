import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./ProfileDropdown.css";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user')) || { name: 'User', email: 'user@email.com' };

  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <div
      className="profile-wrapper"
      ref={ref}
    >
      <div 
        className="profile-avatar-btn" 
        onClick={() => setOpen(!open)}
      >
        <div className="avatar-circle">
          {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <i className={`fas fa-chevron-down dropdown-arrow ${open ? 'rotate' : ''}`}></i>
      </div>

      {open && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="header-avatar">
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="header-info">
              <p className="header-name">{userData.name || 'User'}</p>
              <p className="header-email">{userData.email || 'user@email.com'}</p>
            </div>
          </div>

          <ul className="dropdown-menu">
            <li>
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <i className="fas fa-th-large"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard?tab=profile" onClick={() => setOpen(false)}>
                <i className="fas fa-user"></i>
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard?tab=classes" onClick={() => setOpen(false)}>
                <i className="fas fa-book-open"></i>
                My Learning
              </Link>
            </li>
            <li>
              <Link to="/dashboard?tab=subscription" onClick={() => setOpen(false)}>
                <i className="fas fa-credit-card"></i>
                Subscription
              </Link>
            </li>
          </ul>

          <div className="dropdown-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
