import './Pages.css';

function Dashboard() {
  const stats = [
    { label: 'Courses Enrolled', value: 5, icon: '📚' },
    { label: 'Hours Completed', value: 42, icon: '⏱️' },
    { label: 'Certificates Earned', value: 3, icon: '🏆' },
    { label: 'Quran Progress', value: '45%', icon: '📖' }
  ];

  const progress = [
    { course: 'Quranic Arabic', percentage: 75 },
    { course: 'Islamic History', percentage: 60 },
    { course: 'Hadith Sciences', percentage: 45 },
    { course: 'Islamic Jurisprudence', percentage: 80 }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Student Dashboard</h1>
        <p>Track your learning progress and achievements</p>
      </div>

      <div className="page-content">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="progress-section">
          <h2>Course Progress</h2>
          {progress.map((item, index) => (
            <div key={index} className="progress-item">
              <div className="progress-label">
                <span>{item.course}</span>
                <span>{item.percentage}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${item.percentage}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
