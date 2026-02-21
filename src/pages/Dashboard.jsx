import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import usePageTitle from "../hooks/usePageTitle";
import '../styles/shared.css';  /* Shared styles: .breadcrumb, .tabs, .content-card, .empty-state, .btn-primary */
import './Dashboard.css';        /* Page-specific: .dashboard-page, .dashboard-hero, .dashboard-tabs, .classes-section */
 import game from '../assets/game.png';
 

function Dashboard() {
  usePageTitle("My Dashboard");
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'classes');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // Get user data
  const userData = JSON.parse(localStorage.getItem('user')) || { 
    name: 'User', 
    email: 'user@email.com',
    type: 'student'
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    { id: 'classes', label: 'Classes', icon: 'fas fa-chalkboard' },
    { id: 'events', label: 'Events', icon: 'fas fa-calendar-alt' },
    { id: 'one-on-one', label: 'One-on-One', icon: 'fas fa-user-friends' },
    { id: 'profile', label: 'My Profile', icon: 'fas fa-user' },
    { id: 'gamification', label: 'Gamification', icon: 'fas fa-trophy' },
  ];

  // Demo data for classes
  const classesData = {
    recorded: [],
    onlineLive: [],
    onsiteLive: [],
    reserveOnline: [],
    reserveOnsite: []
  };

  return (
    <div className="dashboard-page">
      {/* Breadcrumb Hero */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              <i className="fas fa-home"></i>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">My Dashboard</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">{tabs.find(t => t.id === activeTab)?.label}</span>
          </nav>
          <h1 className="dashboard-title">My Dashboard</h1>
        </div>
        <div className="dashboard-hero-decoration">
          <div className="hero-circle circle-1"></div>
          <div className="hero-circle circle-2"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-container">
          {/* Tabs Navigation */}
          <div className="dashboard-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="dashboard-content">
            {/* Classes Tab */}
            {activeTab === 'classes' && (
              <div className="tab-content">
                <ClassesSection title="Recorded Classes" data={classesData.recorded} icon="fas fa-video" />
                <ClassesSection title="Online Live Classes" data={classesData.onlineLive} icon="fas fa-broadcast-tower" />
                <ClassesSection title="Onsite Live Classes" data={classesData.onsiteLive} icon="fas fa-school" />
                <ClassesSection title="Reserve Online Live Classes" data={classesData.reserveOnline} icon="fas fa-calendar-check" isBooking />
                <ClassesSection title="Reserve Onsite Live Classes" data={classesData.reserveOnsite} icon="fas fa-calendar-plus" isBooking />
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="tab-content">
                <div className="content-card">
                  <div className="card-header">
                    <i className="fas fa-calendar-alt"></i>
                    <h2>Upcoming Events</h2>
                  </div>
                  <div className="empty-state">
                    <div className="empty-icon">
                      <i className="fas fa-calendar-times"></i>
                    </div>
                    <h3>No Upcoming Events</h3>
                    <p>You don't have any scheduled events at the moment.</p>
                    <Link to="/scheduler" className="btn-primary">
                      <i className="fas fa-plus"></i>
                      Browse Schedule
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* One-on-One Tab */}
            {activeTab === 'one-on-one' && (
              <div className="tab-content">
                <div className="content-card">
                  <div className="card-header">
                    <i className="fas fa-user-friends"></i>
                    <h2>One-on-One Sessions</h2>
                  </div>
                  <div className="empty-state">
                    <div className="empty-icon">
                      <i className="fas fa-comments"></i>
                    </div>
                    <h3>No Sessions Booked</h3>
                    <p>Book a personal session with our qualified teachers for personalized learning.</p>
                    <button className="btn-primary">
                      <i className="fas fa-plus"></i>
                      Book a Session
                    </button>
                  </div>
                </div>

                <div className="content-card">
                  <div className="card-header">
                    <i className="fas fa-history"></i>
                    <h2>Past Sessions</h2>
                  </div>
                  <div className="empty-state small">
                    <p>No past sessions found.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <ProfileSection userData={userData} />
              </div>
            )}

            {/* Gamification Tab */}
            {activeTab === 'gamification' && (
              <div className="tab-content">
                <GamificationSection userData={userData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Classes Section Component
function ClassesSection({ title, data, icon, isBooking = false }) {
  return (
    <div className="classes-section">
      <h2 className="section-title">
        <i className={icon}></i>
        {title}
      </h2>
      {data.length > 0 ? (
        <div className="classes-grid">
          {data.map((item, index) => (
            <div key={index} className="class-card">
              {/* Class content */}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">{isBooking ? 'No booking found' : 'No data found'}</p>
      )}
    </div>
  );
}

// Profile Section Component
function ProfileSection({ userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setIsEditing(false);
  };

  return (
    <div className="content-card">
      <div className="card-header">
        <i className="fas fa-user"></i>
        <h2>Personal Information</h2>
        {!isEditing && (
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            <i className="fas fa-pen"></i>
            Edit
          </button>
        )}
      </div>

      <div className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            ) : (
              <p className="form-value">{userData.name}</p>
            )}
          </div>
          <div className="form-group">
            <label>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            ) : (
              <p className="form-value">{userData.email}</p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Account Type</label>
            <p className="form-value badge">
              <i className={userData.type === 'teacher' ? 'fas fa-chalkboard-teacher' : 'fas fa-user-graduate'}></i>
              {userData.type === 'teacher' ? 'Teacher' : 'Student'}
            </p>
          </div>
          <div className="form-group">
            <label>Institution</label>
            {isEditing ? (
              <input
                type="text"
                name="institution"
                value={formData.institution || ''}
                onChange={handleChange}
                placeholder="Your institution"
              />
            ) : (
              <p className="form-value">{userData.institution || 'Al Noor Academy'}</p>
            )}
          </div>
        </div>

        {userData.type === 'teacher' && (
          <div className="form-row">
            <div className="form-group">
              <label>Specialization</label>
              {isEditing ? (
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization || ''}
                  onChange={handleChange}
                  placeholder="Your specialization"
                />
              ) : (
                <p className="form-value">{userData.specialization || 'Not specified'}</p>
              )}
            </div>
          </div>
        )}

        {isEditing && (
          <div className="form-actions">
            <button className="btn-save" onClick={handleSave}>
              <i className="fas fa-check"></i>
              Save Changes
            </button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              <i className="fas fa-times"></i>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Change Password Section Component
function ChangePasswordSection() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    // Simulate password change
    setMessage({ type: 'success', text: 'Password changed successfully!' });
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="content-card">
      <div className="card-header">
        <i className="fas fa-lock"></i>
        <h2>Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="password-form">
        {message.text && (
          <div className={`message ${message.type}`}>
            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {message.text}
          </div>
        )}

        <div className="form-group">
          <label>Current Password</label>
          <div className="password-input">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
            >
              <i className={`fas ${showPasswords.current ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>New Password</label>
          <div className="password-input">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
            >
              <i className={`fas ${showPasswords.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <div className="password-input">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
            >
              <i className={`fas ${showPasswords.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary">
          <i className="fas fa-key"></i>
          Update Password
        </button>
      </form>
    </div>
  );
}

// Gamification Section Component
function GamificationSection({ userData }) {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardType, setLeaderboardType] = useState('weekly');
  const [weeklyContest, setWeeklyContest] = useState(null);
  const [bestStudent, setBestStudent] = useState(null);
  const [showAllBadges, setShowAllBadges] = useState(false);

  useEffect(() => {
    fetchGamificationData();
  }, []);

  useEffect(() => {
    fetchLeaderboard(leaderboardType);
  }, [leaderboardType]);

  const fetchGamificationData = async () => {
    try {
      setLoading(true);
      const [dashRes, contestRes, bestRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/gamification/dashboard`, { credentials: 'include' }),
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/gamification/weekly-contest`),
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/gamification/best-student`)
      ]);

      if (dashRes.ok) {
        const data = await dashRes.json();
        setDashboardData(data);
      }
      if (contestRes.ok) {
        const data = await contestRes.json();
        setWeeklyContest(data);
      }
      if (bestRes.ok) {
        const data = await bestRes.json();
        setBestStudent(data.award);
      }
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async (type) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/gamification/leaderboard?type=${type}&limit=10`
      );
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const progress = dashboardData?.progress || {};
  const badges = dashboardData?.badges || [];
  const challenges = dashboardData?.challenges || [];

  if (loading) {
    return (
      <div className="gamification-loading">
        <div className="loading-spinner"></div>
        <p>Loading gamification data...</p>
      </div>
    );
  }

  return (
    <div className="gamification-section">
      {/* Stats Overview Cards */}
      <div className="gf-stats-overview">
        <div className="gf-stat-card xp">
          <div className="gf-stat-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="gf-stat-content">
            <span className="gf-stat-value">{progress.totalXP?.toLocaleString() || 0}</span>
            <span className="gf-stat-label">Total XP</span>
          </div>
          <div className="gf-stat-badge">+{progress.weeklyXP || 0} this week</div>
        </div>
        
        <div className="gf-stat-card streak">
          <div className="gf-stat-icon">
            <i className="fas fa-fire"></i>
          </div>
          <div className="gf-stat-content">
            <span className="gf-stat-value">{progress.currentStreak || 0}</span>
            <span className="gf-stat-label">Day Streak</span>
          </div>
          <div className="gf-stat-badge">Best: {progress.longestStreak || 0} days</div>
        </div>
        
        <div className="gf-stat-card paras">
          <div className="gf-stat-icon">
            <i className="fas fa-book-quran"></i>
          </div>
          <div className="gf-stat-content">
            <span className="gf-stat-value">{progress.parasCompleted || 0}/30</span>
            <span className="gf-stat-label">Paras Complete</span>
          </div>
          <div className="gf-stat-progress">
            <div className="progress-fill" style={{ width: `${((progress.parasCompleted || 0) / 30) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="gf-stat-card coins">
          <div className="gf-stat-icon">
            <i className="fas fa-coins"></i>
          </div>
          <div className="gf-stat-content">
            <span className="gf-stat-value">{progress.coins?.toLocaleString() || 0}</span>
            <span className="gf-stat-label">Coins Earned</span>
          </div>
        </div>
      </div>

      {/* Best Student of the Month */}
      {bestStudent?.winner && (
        <div className="gf-best-student-section">
          <div className="gf-section-header">
            <i className="fas fa-medal"></i>
            <h3>Best Student of the Month</h3>
          </div>
          <div className="gf-best-student-card">
            <div className="gf-crown-badge">
              <i className="fas fa-crown"></i>
            </div>
            <div className="gf-winner-spotlight">
              <div className="gf-winner-avatar">
                <img 
                  src={bestStudent.winner.avatar} 
                  alt={bestStudent.winner.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bestStudent.winner.name)}&background=C9A961&color=fff&size=128`;
                  }}
                />
              </div>
              <div className="gf-winner-info">
                <h4>{bestStudent.winner.name}</h4>
                <div className="gf-winner-stats">
                  <span><i className="fas fa-bolt"></i> {bestStudent.winner.totalXP} XP</span>
                  <span><i className="fas fa-book"></i> {bestStudent.winner.parasCompleted} Paras</span>
                  <span><i className="fas fa-fire"></i> {bestStudent.winner.streak} Day Streak</span>
                  <span><i className="fas fa-award"></i> {bestStudent.winner.badgesEarned} Badges</span>
                </div>
              </div>
            </div>
            {bestStudent.runnerUps?.length > 0 && (
              <div className="gf-runner-ups">
                {bestStudent.runnerUps.map((runner, idx) => (
                  <div key={idx} className="gf-runner-up-item">
                    <span className="gf-runner-rank">{runner.rank}</span>
                    <img 
                      src={runner.avatar} 
                      alt={runner.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(runner.name)}&background=1A9B8E&color=fff`;
                      }}
                    />
                    <span className="gf-runner-name">{runner.name}</span>
                    <span className="gf-runner-xp">{runner.totalXP} XP</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Weekly Contest Section */}
      {weeklyContest?.contest && (
        <div className="gf-weekly-contest-section">
          <div className="gf-section-header">
            <i className="fas fa-trophy"></i>
            <h3>Weekly Contest</h3>
            {weeklyContest.timeRemaining && (
              <div className="gf-contest-timer">
                <i className="fas fa-clock"></i>
                <span>{weeklyContest.timeRemaining.days}d {weeklyContest.timeRemaining.hours}h remaining</span>
              </div>
            )}
          </div>
          <div className="gf-contest-content">
            <div className="gf-contest-prizes">
              <h4>Prizes</h4>
              {weeklyContest.contest.prizes?.map((prize, idx) => (
                <div key={idx} className={`gf-prize-item rank-${prize.rank}`}>
                  <span className="gf-prize-rank">
                    {prize.rank === 1 ? '🥇' : prize.rank === 2 ? '🥈' : '🥉'}
                  </span>
                  <span className="gf-prize-text">{prize.prize}</span>
                </div>
              ))}
            </div>
            <div className="gf-contest-leaderboard">
              <h4>Top Contestants</h4>
              <div className="gf-contest-list">
                {weeklyContest.contest.participants?.slice(0, 5).map((p, idx) => (
                  <div key={idx} className={`gf-contest-participant ${idx < 3 ? 'top-3' : ''}`}>
                    <span className="gf-participant-rank">{p.rank}</span>
                    <img 
                      src={p.avatar} 
                      alt={p.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1A9B8E&color=fff`;
                      }}
                    />
                    <div className="gf-participant-info">
                      <span className="gf-participant-name">{p.name}</span>
                      <span className="gf-participant-challenges">{p.challengesCompleted} challenges</span>
                    </div>
                    <span className="gf-participant-points">{p.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="gf-main-grid">
        {/* Leaderboard Section */}
        <div className="gf-card gf-leaderboard-section">
          <div className="gf-card-header">
            <h3><i className="fas fa-ranking-star"></i> Leaderboard</h3>
            <div className="gf-leaderboard-tabs">
              {['weekly', 'monthly', 'alltime'].map(type => (
                <button
                  key={type}
                  className={`gf-lb-tab ${leaderboardType === type ? 'active' : ''}`}
                  onClick={() => setLeaderboardType(type)}
                >
                  {type === 'alltime' ? 'All Time' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="gf-leaderboard-list">
            {leaderboard.length > 0 ? (
              leaderboard.map((student, index) => (
                <div key={index} className={`gf-leaderboard-item rank-${student.rank}`}>
                  <div className="gf-lb-rank">
                    {student.rank === 1 ? (
                      <span className="gf-rank-badge gold">🥇</span>
                    ) : student.rank === 2 ? (
                      <span className="gf-rank-badge silver">🥈</span>
                    ) : student.rank === 3 ? (
                      <span className="gf-rank-badge bronze">🥉</span>
                    ) : (
                      <span className="gf-rank-num">{student.rank}</span>
                    )}
                  </div>
                  <div className="gf-lb-avatar">
                    <img 
                      src={student.avatar} 
                      alt={student.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1A9B8E&color=fff`;
                      }}
                    />
                  </div>
                  <div className="gf-lb-info">
                    <span className="gf-lb-name">{student.name}</span>
                    <span className="gf-lb-meta">
                      {student.parasCompleted} Paras • {student.currentStreak || 0} day streak
                    </span>
                  </div>
                  <div className="gf-lb-xp">
                    <i className="fas fa-bolt"></i>
                    {student.xp?.toLocaleString()} XP
                  </div>
                </div>
              ))
            ) : (
              <div className="gf-empty-state">
                <i className="fas fa-users"></i>
                <p>No leaderboard data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Badges Section */}
        <div className="gf-card gf-badges-section">
          <div className="gf-card-header">
            <h3><i className="fas fa-award"></i> Achievement Badges</h3>
            <button className="gf-view-all-btn" onClick={() => setShowAllBadges(!showAllBadges)}>
              {showAllBadges ? 'Show Less' : 'View All'}
            </button>
          </div>
          <div className="gf-badges-grid">
            {(showAllBadges ? badges : badges.slice(0, 8)).map((badge, idx) => (
              <div key={idx} className={`gf-badge-card ${badge.earned ? 'earned' : 'locked'}`}>
                <div className="gf-badge-icon" style={{ backgroundColor: badge.earned ? badge.color : '#ddd' }}>
                  <i className={badge.icon}></i>
                </div>
                <div className="gf-badge-info">
                  <span className="gf-badge-name">{badge.name}</span>
                  <span className="gf-badge-desc">{badge.description}</span>
                </div>
                {!badge.earned && (
                  <div className="gf-badge-lock">
                    <i className="fas fa-lock"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Challenges Section */}
        <div className="gf-card gf-challenges-section">
          <div className="gf-card-header">
            <h3><i className="fas fa-tasks"></i> Challenges</h3>
          </div>
          <div className="gf-challenges-list">
            {challenges.length > 0 ? (
              challenges.map((challenge, idx) => (
                <div key={idx} className={`gf-challenge-card ${challenge.type}`}>
                  <div className="gf-challenge-type">
                    {challenge.type === 'daily' ? '📅 Daily' : '📆 Weekly'}
                  </div>
                  <div className="gf-challenge-content">
                    <h5>{challenge.title}</h5>
                    <p>{challenge.description}</p>
                  </div>
                  <div className="gf-challenge-rewards">
                    <span className="gf-reward xp"><i className="fas fa-bolt"></i> {challenge.xpReward} XP</span>
                    <span className="gf-reward coins"><i className="fas fa-coins"></i> {challenge.coinReward}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="gf-empty-state">
                <i className="fas fa-clipboard-list"></i>
                <p>No active challenges</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quran Progress Section */}
      <div className="gf-quran-progress-section">
        <div className="gf-section-header">
          <i className="fas fa-book-quran"></i>
          <h3>Quran Learning Progress</h3>
        </div>
        <div className="gf-para-grid">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(para => {
            const isCompleted = para <= (progress.parasCompleted || 0);
            const isCurrent = para === (progress.currentPara || 1);
            return (
              <div 
                key={para} 
                className={`gf-para-card ${isCompleted ? 'completed' : isCurrent ? 'current' : 'locked'}`}
              >
                <span className="gf-para-num">Para {para}</span>
                {isCompleted && <i className="fas fa-check-circle"></i>}
                {isCurrent && <i className="fas fa-book-open"></i>}
                {!isCompleted && !isCurrent && <i className="fas fa-lock"></i>}
              </div>
            );
          })}
        </div>
        <div className="gf-progress-summary">
          <div className="gf-progress-bar">
            <div 
              className="gf-progress-fill" 
              style={{ width: `${((progress.parasCompleted || 0) / 30) * 100}%` }}
            ></div>
          </div>
          <span className="gf-progress-text">
            {progress.parasCompleted || 0} of 30 Paras completed ({Math.round(((progress.parasCompleted || 0) / 30) * 100)}%)
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
