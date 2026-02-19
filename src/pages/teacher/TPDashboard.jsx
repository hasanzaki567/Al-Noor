import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { teacherAPI } from '../../services/api';
import './TPDashboard.css';

function TPDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : 'Teacher';

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await teacherAPI.getDashboard();
      if (res.success) {
        setDashboard(res.dashboard);
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="tpd-loading">
        <div className="tpd-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="tpd-page">
      {/* Hero Banner */}
      <div className="tpd-hero">
        <div className="tpd-hero-content">
          <div className="tpd-hero-left">
            <p className="tpd-salam">Assalamu Alaikum,</p>
            <h1 className="tpd-name">{displayName}</h1>
            <p className="tpd-subtitle">ALNOOR QURAN ACADEMY ATTENDANCE</p>
          </div>
          <div className="tpd-hero-right">
            <div className="tpd-date-badge">
              <i className="far fa-clock"></i>
              <div>
                <span className="tpd-day">{dayName}</span>
                <span className="tpd-date">{dateStr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards inside hero */}
        <div className="tpd-stats-row">
          <div className="tpd-stat-card">
            <span className="tpd-stat-label">Total Students</span>
            <span className="tpd-stat-value">{dashboard?.totalStudents || 0}</span>
          </div>
          <div className="tpd-stat-card">
            <span className="tpd-stat-label">Today's Date</span>
            <span className="tpd-stat-value">{today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="tpd-section">
        <h2 className="tpd-section-title">Quick Actions</h2>
        <div className="tpd-quick-actions">
          <div
            className="tpd-action-card"
            onClick={() => navigate('/teacher-portal/attendance')}
          >
            <div className="tpd-action-icon" style={{ background: '#e0f7f5' }}>
              <i className="fas fa-calendar-check" style={{ color: '#14B8A6' }}></i>
            </div>
            <div className="tpd-action-info">
              <h4>Mark Attendance</h4>
              <p>Take today's attendance</p>
            </div>
            <i className="fas fa-chevron-right tpd-action-arrow"></i>
          </div>

          <div
            className="tpd-action-card"
            onClick={() => navigate('/teacher-portal/students')}
          >
            <div className="tpd-action-icon" style={{ background: '#e0f7f5' }}>
              <i className="fas fa-users" style={{ color: '#14B8A6' }}></i>
            </div>
            <div className="tpd-action-info">
              <h4>Manage Students</h4>
              <p>Add or edit students</p>
            </div>
            <i className="fas fa-chevron-right tpd-action-arrow"></i>
          </div>

          <div
            className="tpd-action-card"
            onClick={() => navigate('/teacher-portal/reports')}
          >
            <div className="tpd-action-icon" style={{ background: '#e0f7f5' }}>
              <i className="fas fa-chart-bar" style={{ color: '#14B8A6' }}></i>
            </div>
            <div className="tpd-action-info">
              <h4>View Reports</h4>
              <p>Monthly summaries</p>
            </div>
            <i className="fas fa-chevron-right tpd-action-arrow"></i>
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="tpd-section">
        <div className="tpd-section-header">
          <h2 className="tpd-section-title">Recent Students</h2>
          <button
            className="tpd-add-btn"
            onClick={() => navigate('/teacher-portal/students', { state: { openAdd: true } })}
          >
            <i className="fas fa-plus"></i> Add Student
          </button>
        </div>

        <div className="tpd-students-list">
          {dashboard?.recentStudents && dashboard.recentStudents.length > 0 ? (
            dashboard.recentStudents.map((student) => (
              <div key={student._id} className="tpd-student-row">
                <div className="tpd-student-avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <div className="tpd-student-info">
                  <span className="tpd-student-name">{student.name}</span>
                  <span className="tpd-student-course">{student.course} - {student.level}</span>
                </div>
                <span className={`tpd-payment-badge ${student.paymentStatus}`}>
                  {student.paymentStatus}
                </span>
              </div>
            ))
          ) : (
            <div className="tpd-empty">
              <i className="fas fa-users"></i>
              <p>No students yet. Add your first student!</p>
            </div>
          )}
        </div>
      </div>

      {/* Today's Classes */}
      {dashboard?.todaysClasses && dashboard.todaysClasses.length > 0 && (
        <div className="tpd-section">
          <h2 className="tpd-section-title">Today's Classes</h2>
          <div className="tpd-classes-list">
            {dashboard.todaysClasses.map((cls) => (
              <div key={cls._id} className="tpd-class-card">
                <div className="tpd-class-time">
                  <i className="far fa-clock"></i>
                  {cls.startTime} - {cls.endTime}
                </div>
                <div className="tpd-class-info">
                  <h4>{cls.title}</h4>
                  <p>{cls.courseType} • {cls.sessionType}</p>
                  {cls.studentId && <span className="tpd-class-student">{cls.studentId.name}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TPDashboard;
