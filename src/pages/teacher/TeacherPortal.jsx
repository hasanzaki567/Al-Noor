import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './TeacherPortal.css';

function TeacherPortal() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : 'Teacher';

  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="tp-layout">
      {/* Sidebar */}
      <aside className={`tp-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Logo */}
        <div className="tp-sidebar-logo">
          <div className="tp-logo-icon">
            <i className="fas fa-mosque"></i>
          </div>
          {!sidebarCollapsed && (
            <div className="tp-logo-text">
              <h2>ALNOOR</h2>
              <span>Attendance</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="tp-sidebar-nav">
          <NavLink
            to="/teacher-portal"
            end
            className={({ isActive }) => `tp-nav-item ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-th-large"></i>
            {!sidebarCollapsed && <span>Dashboard</span>}
            {!sidebarCollapsed && <i className="fas fa-chevron-right tp-nav-arrow"></i>}
          </NavLink>

          <NavLink
            to="/teacher-portal/students"
            className={({ isActive }) => `tp-nav-item ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-users"></i>
            {!sidebarCollapsed && <span>Students</span>}
          </NavLink>

          <NavLink
            to="/teacher-portal/attendance"
            className={({ isActive }) => `tp-nav-item ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-calendar-check"></i>
            {!sidebarCollapsed && <span>Attendance</span>}
          </NavLink>

          <NavLink
            to="/teacher-portal/reports"
            className={({ isActive }) => `tp-nav-item ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-chart-bar"></i>
            {!sidebarCollapsed && <span>Reports</span>}
          </NavLink>

          <NavLink
            to="/teacher-portal/schedule"
            className={({ isActive }) => `tp-nav-item ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-clock"></i>
            {!sidebarCollapsed && <span>Schedule</span>}
          </NavLink>
        </nav>

        {/* User Info at bottom */}
        <div className="tp-sidebar-footer">
          <div className="tp-user-info">
            <div className="tp-user-avatar">{initial}</div>
            {!sidebarCollapsed && (
              <div className="tp-user-details">
                <span className="tp-user-name">{displayName}</span>
                <span className="tp-user-email">{user?.email || ''}</span>
              </div>
            )}
            <button className="tp-logout-btn" onClick={handleLogout} title="Logout">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </aside>

        {/* Main Content */}
        <main className="tp-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default TeacherPortal;
