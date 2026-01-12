import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
          >
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
          >
            <i className="fas fa-user"></i>
            Profile
          </NavLink>
          <NavLink 
            to="/courses" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
          >
            <i className="fas fa-book"></i>
            Courses
          </NavLink>
          <NavLink 
            to="/scheduler" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
          >
            <i className="fas fa-calendar"></i>
            Scheduler
          </NavLink>
          <NavLink 
            to="/quran" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
          >
            <i className="fas fa-quran"></i>
            Quran
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
          >
            <i className="fas fa-envelope"></i>
            Contact
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
          >
            <i className="fas fa-info-circle"></i>
            About
          </NavLink>
          
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </nav>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
