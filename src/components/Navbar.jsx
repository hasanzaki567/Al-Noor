import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
           <img className="nav-logo-img" src="/public/Al-noor-filled-no-bg-.webp" alt="Al Noor Academy Logo" />
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
            <NavLink to="/dashboard" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setIsOpen(false)}>
              Dashboard
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
      </div>
    </nav>
  );
}

export default Navbar;

