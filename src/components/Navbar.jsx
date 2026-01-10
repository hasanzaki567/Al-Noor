import { Link } from 'react-router-dom';
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
          🕌 Al Noor Academy
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link" onClick={() => setIsOpen(false)}>
              Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/scheduler" className="nav-link" onClick={() => setIsOpen(false)}>
              Scheduler
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quran" className="nav-link" onClick={() => setIsOpen(false)}>
              Quran
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
              Contact & Help
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

