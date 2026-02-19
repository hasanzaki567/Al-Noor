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
  const displayName = userData.name ? 
    userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : 'Student';

  // Leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Ahmad Khan', course: 'Hifz - Level 2', xp: 1350, avatar: '/student1.webp' },
    { rank: 2, name: 'Maryam Amin', course: 'Hifz - Beginner', xp: 980, avatar: '/student2.webp' },
    { rank: 3, name: 'Yousuf Ali', course: 'Hifz - Level 2', xp: 850, avatar: '/student3.webp' },
    { rank: 4, name: 'Abeer Fatima', course: 'Bilal Hassan', xp: 720, avatar: '/student4.webp' },
    { rank: 5, name: 'Bilal Hassan', course: 'Bilal Hassan', xp: 680, avatar: '/student5.webp' },
    { rank: 6, name: 'Ayesha Rahman', course: 'Saad Sheikh', xp: 680, avatar: '/student6.webp' },
    { rank: 7, name: 'Imran Malik', course: 'Saad Ahmed', xp: 640, avatar: '/student7.webp' },
  ];

  // Weekly challenges
  const weeklyChallenges = [
    { id: 1, title: 'Perfect Tajweed Recitation', desc: 'Practice with correct pronunciation', xp: 100, completed: true },
    { id: 2, title: 'Review Juz Amma', desc: 'Revision all Surahs in Juz Amma', xp: 200, completed: true },
  ];

  // Motivation items
  const motivationItems = [
    { id: 1, icon: 'fas fa-fire', title: 'Continue the Streak', desc: 'Straine bor hangegor ger for busa XP points', color: '#C9A961' },
    { id: 2, icon: 'fas fa-trophy', title: 'Challenges for XP', desc: 'Complete challenges for extra XP points', color: '#1A9B8E' },
    { id: 3, icon: 'fas fa-coins', title: 'Coins for Duas', desc: 'Earn points from rewards for duas and learning', color: '#C9A961' },
    { id: 4, icon: 'fas fa-medal', title: 'Monthly Top Performer', desc: 'Memcom earb rewards intogirenta and msants', color: '#1A9B8E' },
  ];

  // Achievement badges
  const achievementBadges = [
    { id: 1, name: 'Memorization Master', icon: 'fas fa-trophy', color: '#C9A961', earned: true },
    { id: 2, name: 'Tajweed Pro', icon: 'fas fa-award', color: '#1A9B8E', earned: true },
    { id: 3, name: 'Consistent Learner', icon: 'fas fa-star', color: '#1A9B8E', earned: true },
    { id: 4, name: 'Quran Explorer', icon: 'fas fa-book-open', color: '#C9A961', earned: false, xp: 700 },
  ];

  return (
    <div className="gamification-section">
      {/* Hero Banner with Background Image */}
      <div className="gf-hero-banner">
        <div className="gf-hero-overlay">
          <div className="gf-hero-header">
            <span className="gf-label">✦ Gamification</span>
            <h2 className="gf-hero-title">Encouraging Quran Learning<br/>Through Gamification</h2>
          </div>
        </div>
      </div>

      {/* Bottom Grid - Two Column Layout */}
      <div className="gf-bottom-grid">
        {/* Left Column */}
        <div className="gf-left-column">
          {/* Achievement Badges Card */}
          <div className="gf-card gf-badges-card">
            <div className="gf-card-header">
              <h3>Achievement Badges</h3>
              <a href="#" className="gf-view-link">View All</a>
            </div>
            <div className="gf-badges-grid">
              {achievementBadges.map((badge) => (
                <div key={badge.id} className={`gf-badge-item ${badge.earned ? 'earned' : 'locked'}`}>
                  <div className="gf-badge-icon" style={{ background: badge.earned ? badge.color : '#e0e0e0' }}>
                    <i className={badge.icon}></i>
                  </div>
                  <span className="gf-badge-name">{badge.name}</span>
                  {!badge.earned && badge.xp && (
                    <span className="gf-badge-xp">{badge.xp} XP</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="gf-card gf-leaderboard-card">
            <div className="gf-card-header">
              <h3>Leaderboard</h3>
            </div>
            <div className="gf-leaderboard-list">
              {leaderboardData.slice(0, 5).map((item, index) => (
                <div key={item.rank} className={`gf-leaderboard-item ${index === 0 ? 'top-rank' : ''}`}>
                  <div className="gf-leader-avatar">
                    <img 
                      src={item.avatar} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=1A9B8E&color=fff`;
                      }}
                    />
                    {index === 0 && <span className="gf-top-badge">⭐</span>}
                  </div>
                  <div className="gf-leader-info">
                    <h5>{item.name}</h5>
                    <p>{item.course}</p>
                  </div>
                  <div className="gf-leader-xp">
                    {index === 0 ? (
                      <span className="gf-xp-badge highlight">★ ••• {item.xp} XP ★</span>
                    ) : (
                      <>
                        <span className="gf-xp-badge">{item.xp} XP</span>
                        <i className="fas fa-chevron-right"></i>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="gf-view-all-btn">
              View Full Leaderboard
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="gf-right-column">
          {/* Challenges Card */}
          <div className="gf-card gf-challenges-card">
            <div className="gf-card-header">
              <h3>Challenges</h3>
              <a href="#" className="gf-view-link">View All</a>
            </div>

            {/* Daily Challenge */}
            <div className="gf-daily-challenge">
              <h4 className="gf-section-subtitle">Daily Challenge</h4>
              <div className="gf-challenge-item daily">
                <div className="gf-challenge-info">
                  <h5>Memorize 5 Ayahs from Surah Al-Mulk</h5>
                  <p>O hequite gwa in prateont Level otled</p>
                </div>
                <button className="gf-assign-btn">Assign</button>
              </div>
            </div>

            {/* Completed Challenges */}
            <div className="gf-completed-challenges">
              {weeklyChallenges.map((challenge) => (
                <div key={challenge.id} className="gf-challenge-item completed">
                  <div className="gf-challenge-info">
                    <h5>{challenge.title}</h5>
                    <p>{challenge.desc}</p>
                  </div>
                  <div className="gf-challenge-reward">
                    <span className="gf-challenge-xp">
                      <i className="fas fa-check-circle"></i> {challenge.xp} XP
                    </span>
                    <button className="gf-completed-btn">Completed</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivation & Rewards */}
          <div className="gf-card gf-motivation-card">
            <div className="gf-motivation-header">
              <h3>Motivation & Rewards</h3>
              <button className="gf-reward-students-btn">Reward Students</button>
            </div>
            <div className="gf-motivation-grid">
              <div className="gf-motivation-item">
                <div className="gf-motivation-icon-img">
                  <i className="fas fa-trophy" style={{ color: '#C9A961' }}></i>
                </div>
                <div className="gf-motivation-info">
                  <h5>Challenges for XP</h5>
                  <p>Complete challenges for extra XP points</p>
                </div>
                <div className="gf-motivation-reward">
                  <i className="fas fa-gift" style={{ color: '#1A9B8E' }}></i>
                </div>
              </div>
              <div className="gf-motivation-item">
                <div className="gf-motivation-icon-img">
                  <i className="fas fa-coins" style={{ color: '#C9A961' }}></i>
                </div>
                <div className="gf-motivation-info">
                  <h5>7 day SYP</h5>
                  <p>Galamity neginets resurect insegelzions</p>
                </div>
                <div className="gf-motivation-reward">
                  <i className="fas fa-medal" style={{ color: '#C9A961' }}></i>
                </div>
              </div>
              <div className="gf-motivation-item">
                <div className="gf-motivation-icon-img">
                  <i className="fas fa-medal" style={{ color: '#1A9B8E' }}></i>
                </div>
                <div className="gf-motivation-info">
                  <h5>1n1 for top</h5>
                  <p>Top stats Insect aninett fty revarnes</p>
                </div>
                <div className="gf-motivation-reward">
                  <i className="fas fa-trophy" style={{ color: '#C9A961' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
