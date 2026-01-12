import './Pages.css';
import { useState } from 'react';

function Dashboard() {
  // Demo user data
  const user = {
    name: 'Ayaan',
    avatar: 'https://ui-avatars.com/api/?name=Ayaan&background=23272F&color=C9A961&size=128',
    level: 5,
    xp: 1240,
    coins: 320,
    streak: 12,
    certificates: 3,
    badges: ['Top Performer', 'Quran Star', 'Attendance Pro'],
    quote: 'Knowledge is light. – Imam Al-Shafi’i',
  };

  const stats = [
    { label: 'Courses Enrolled', value: 5, icon: '📚' },
    { label: 'Hours Completed', value: 42, icon: '⏱️' },
    { label: 'Certificates Earned', value: user.certificates, icon: '🏆' },
    { label: 'Quran Progress', value: '45%', icon: '📖' }
  ];

  const progress = [
    { course: 'Quranic Arabic', percentage: 75 },
    { course: 'Islamic History', percentage: 60 },
    { course: 'Hadith Sciences', percentage: 45 },
    { course: 'Islamic Jurisprudence', percentage: 80 }
  ];

  const leaderboard = [
    { name: 'Ayaan', avatar: user.avatar, points: 1240 },
    { name: 'Fatima', avatar: 'https://ui-avatars.com/api/?name=Fatima&background=23272F&color=1A9B8E&size=128', points: 1200 },
    { name: 'Zaid', avatar: 'https://ui-avatars.com/api/?name=Zaid&background=23272F&color=C9A961&size=128', points: 1150 },
  ];

  const challenges = [
    { title: 'Attend 5 Classes This Week', reward: '+50 XP', completed: false },
    { title: 'Complete Quranic Arabic Module', reward: '+100 XP', completed: true },
    { title: 'Perfect Attendance', reward: '+30 Coins', completed: false },
  ];

  // Parent view demo
  const parentView = {
    childName: 'Ayaan',
    attendance: '98%',
    feedback: 'Excellent participation and steady progress!',
    teacherMessages: [
      { from: 'Sheikh Ahmed', message: 'Ayaan is doing great in Quranic Arabic.' },
      { from: 'Dr. Hassan', message: 'Keep up the good work in History.' },
    ],
  };

  // Notification/reminder demo
  const notifications = [
    { type: 'reminder', text: 'Quranic Arabic class at 3:00 PM today.' },
    { type: 'achievement', text: 'You earned the "Attendance Pro" badge!' },
    { type: 'reminder', text: 'Assignment due: Islamic History Essay.' },
  ];

  const [showParent, setShowParent] = useState(false);

  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">🏆</div>
        <h1>Dashboard</h1>
        <p>Track your learning journey and achievements</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F"/>
          </svg>
        </div>
      </header>
      <div className="page-content">
        {/* Personalized Welcome */}
        <div className="dashboard-welcome">
          <img src={user.avatar} alt="avatar" className="dashboard-avatar" />
          <div>
            <h2>Welcome, {user.name}!</h2>
            <div className="dashboard-quickstats">
              <span>Level {user.level}</span>
              <span>{user.xp} XP</span>
              <span>{user.coins} Coins</span>
              <span>🔥 {user.streak} day streak</span>
            </div>
            <div className="dashboard-quote">“{user.quote}”</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="dashboard-achievements">
          <h3>Achievements</h3>
          <div className="dashboard-badges">
            {user.badges.map((badge, i) => (
              <span key={i} className="dashboard-badge">{badge}</span>
            ))}
            <span className="dashboard-badge dashboard-badge-certificate">{user.certificates} Certificates</span>
          </div>
        </div>

        {/* Progress Bars */}
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

        {/* Leaderboard */}
        <div className="dashboard-leaderboard">
          <h3>Leaderboard</h3>
          <div className="leaderboard-list">
            {leaderboard.map((entry, i) => (
              <div key={i} className="leaderboard-entry">
                <img src={entry.avatar} alt={entry.name} className="leaderboard-avatar" />
                <span className="leaderboard-name">{entry.name}</span>
                <span className="leaderboard-points">{entry.points} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="dashboard-challenges">
          <h3>Daily & Weekly Challenges</h3>
          <ul>
            {challenges.map((ch, i) => (
              <li key={i} className={ch.completed ? 'challenge-completed' : ''}>
                {ch.title} <span className="challenge-reward">{ch.reward}</span>
                {ch.completed && <span className="challenge-check">✔</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Parent/Student Toggle */}
        <div className="dashboard-toggle">
          <button onClick={() => setShowParent(false)} className={!showParent ? 'active' : ''}>Student View</button>
          <button onClick={() => setShowParent(true)} className={showParent ? 'active' : ''}>Parent View</button>
        </div>
        {showParent && (
          <div className="dashboard-parent-view">
            <h3>Parent Dashboard</h3>
            <div><strong>Child:</strong> {parentView.childName}</div>
            <div><strong>Attendance:</strong> {parentView.attendance}</div>
            <div><strong>Feedback:</strong> {parentView.feedback}</div>
            <div className="parent-messages">
              <strong>Teacher Messages:</strong>
              <ul>
                {parentView.teacherMessages.map((msg, i) => (
                  <li key={i}><strong>{msg.from}:</strong> {msg.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Notifications & Reminders */}
        <div className="dashboard-notifications">
          <h3>Notifications & Reminders</h3>
          <ul>
            {notifications.map((n, i) => (
              <li key={i} className={`notification-${n.type}`}>{n.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
