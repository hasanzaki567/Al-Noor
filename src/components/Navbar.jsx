import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Don't show navbar for logged in users (they'll use sidebar)
  if (isLoggedIn) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          {/* Use an image logo for retina if available, fallback to emoji */}
          {/* <img src="/logo192.png" alt="Al Noor Academy Logo" /> */}
          🕌 Al Noor Academy
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
            <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

