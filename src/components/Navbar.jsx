import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img className="nav-logo-img" src="./public/logoWeb.webp" alt="Al Noor Academy Logo" />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)} end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/courses" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/scheduler" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              Scheduler
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/quran" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              Quran
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              Contact & Help
            </NavLink>
          </li>
        </ul>
         <div className="nav-auth">
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-login-btn">
                Log in
              </Link>
              <Link to="/signup" className="nav-signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}

export default Navbar;

