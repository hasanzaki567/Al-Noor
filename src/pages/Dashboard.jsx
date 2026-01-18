import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import usePageTitle from "../hooks/usePageTitle";
import './Dashboard.css';

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
    { id: 'password', label: 'Change Password', icon: 'fas fa-lock' },
    { id: 'subscription', label: 'Subscription', icon: 'fas fa-credit-card' },
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

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <div className="tab-content">
                <ChangePasswordSection />
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="tab-content">
                <SubscriptionSection />
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

// Subscription Section Component
function SubscriptionSection() {
  return (
    <>
      <div className="content-card">
        <div className="card-header">
          <i className="fas fa-crown"></i>
          <h2>Current Plan</h2>
        </div>
        <div className="subscription-info">
          <div className="plan-badge free">
            <i className="fas fa-user"></i>
            Free Plan
          </div>
          <p className="plan-description">You're currently on the free plan. Upgrade to access premium features!</p>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <i className="fas fa-gem"></i>
          <h2>Available Plans</h2>
        </div>
        <div className="plans-grid">
          <div className="plan-card">
            <div className="plan-header">
              <h3>Basic</h3>
              <div className="plan-price">
                <span className="price">$9.99</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="plan-features">
              <li><i className="fas fa-check"></i>Access to recorded classes</li>
              <li><i className="fas fa-check"></i>Basic Quran learning</li>
              <li><i className="fas fa-check"></i>Community support</li>
              <li><i className="fas fa-times"></i>Live classes</li>
              <li><i className="fas fa-times"></i>One-on-one sessions</li>
            </ul>
            <button className="btn-outline">Choose Basic</button>
          </div>

          <div className="plan-card featured">
            <div className="plan-badge-popular">Most Popular</div>
            <div className="plan-header">
              <h3>Premium</h3>
              <div className="plan-price">
                <span className="price">$24.99</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="plan-features">
              <li><i className="fas fa-check"></i>All Basic features</li>
              <li><i className="fas fa-check"></i>Unlimited live classes</li>
              <li><i className="fas fa-check"></i>2 One-on-one sessions/month</li>
              <li><i className="fas fa-check"></i>Priority support</li>
              <li><i className="fas fa-check"></i>Certificates</li>
            </ul>
            <button className="btn-primary">Choose Premium</button>
          </div>

          <div className="plan-card">
            <div className="plan-header">
              <h3>Family</h3>
              <div className="plan-price">
                <span className="price">$49.99</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="plan-features">
              <li><i className="fas fa-check"></i>All Premium features</li>
              <li><i className="fas fa-check"></i>Up to 5 family members</li>
              <li><i className="fas fa-check"></i>5 One-on-one sessions/month</li>
              <li><i className="fas fa-check"></i>Dedicated teacher</li>
              <li><i className="fas fa-check"></i>Progress reports</li>
            </ul>
            <button className="btn-outline">Choose Family</button>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <i className="fas fa-history"></i>
          <h2>Payment History</h2>
        </div>
        <div className="empty-state small">
          <p>No payment history found.</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
