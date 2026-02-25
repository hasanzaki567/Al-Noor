import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPortal.css';

function AdminPortal() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchOverview(); }, []);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/admin/overview', { credentials: 'include' });
      if (res.status === 401) { navigate('/admin/login'); return; }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unauthorized');
      setOverview(data);
    } catch (err) {
      navigate('/admin/login');
    } finally { setLoading(false); }
  };

  const handleLogout = async () => {
    await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/admin/logout', { method: 'POST', credentials: 'include' });
    navigate('/admin/login');
  };

  return (
    <div className="admin-portal clean">
      <div className="admin-content">
        {loading && <div className="admin-loading">Loading overview...</div>}

        {!loading && overview && (
          <>
            <div className="topbar">
              <button className="home-icon" onClick={() => window.location.href = '/'}>🏠</button>
              <h1>Management</h1>
              <div style={{ flex: 1 }} />
              <button className="logout" onClick={handleLogout}>Logout</button>
            </div>

            <section className="cards grid">
              <div className="card kpi">
                <div className="kpi-title">Students</div>
                <div className="kpi-value">{overview.studentsCount ?? overview.totalStudents ?? 0}</div>
              </div>
              <div className="card kpi">
                <div className="kpi-title">Teachers</div>
                <div className="kpi-value">{overview.teachersCount ?? overview.totalTeachers ?? 0}</div>
              </div>
              <div className="card kpi">
                <div className="kpi-title">Courses</div>
                <div className="kpi-value">{overview.coursesCount ?? 0}</div>
              </div>
              <div className="card kpi">
                <div className="kpi-title">Recent Attendance</div>
                <div className="kpi-value">{overview.recentAttendanceCount ?? (overview.recentAttendance?.length ?? 0)}</div>
              </div>
            </section>

            <section className="recent">
              <div className="card wide">
                <h3>Recent Registrations</h3>
                <ul>
                  {(overview.recentRegistrations || []).map(r => (
                    <li key={r._id || r.id}>{r.studentName || r.name || r.email} - {r.courseTitle || r.course || ''}</li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPortal;
