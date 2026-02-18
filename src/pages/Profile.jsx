import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateProfileForm, validateEmail, validateName } from '../services/validation';
import '../styles/shared.css';  /* Shared styles: .loading-spinner, .tabs, .content-card, .form-group */
import './Profile.css';          /* Page-specific: .profile-page, .profile-hero, .profile-tabs, .stats-section */

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saveError, setSaveError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || !storedUser) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData(userData);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
    setSaveError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    let result;
    switch (name) {
      case 'name':
        result = validateName(value, 'Full name');
        break;
      case 'email':
        result = validateEmail(value);
        break;
      case 'specialization':
        if (user?.type === 'teacher' && !value.trim()) {
          result = { isValid: false, error: 'Specialization is required for teachers' };
        } else {
          result = { isValid: true, error: null };
        }
        break;
      default:
        result = { isValid: true, error: null };
    }
    
    if (!result.isValid) {
      setFieldErrors(prev => ({ ...prev, [name]: result.error }));
    }
  };

  const handleSave = () => {
    // Validate form
    const validation = validateProfileForm(formData, user?.type);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setTouched({ name: true, email: true, specialization: true });
      return;
    }
    
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    setFieldErrors({});
    setTouched({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(user);
    setFieldErrors({});
    setTouched({});
  };

  const handleLogout = () => {
    logout(); // Use auth context logout function
    navigate('/');
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="profile-hero-bg">
          <div className="hero-pattern"></div>
        </div>
        <div className="profile-hero-content">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-large">
              {user.type === 'teacher' ? '👨‍🏫' : '👨‍🎓'}
            </div>
            <div className="avatar-badge">
              <i className="fas fa-check"></i>
            </div>
          </div>
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-role">
            <span className="role-badge">
              {user.type === 'teacher' ? (
                <>
                  <i className="fas fa-chalkboard-teacher"></i>
                  Teacher Account
                </>
              ) : (
                <>
                  <i className="fas fa-user-graduate"></i>
                  Student Account
                </>
              )}
            </span>
          </p>
          <p className="profile-email">
            <i className="fas fa-envelope"></i>
            {user.email}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-main">
        <div className="profile-container">
          {/* Navigation Tabs */}
          <div className="profile-tabs">
            <button 
              className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-home"></i>
              Overview
            </button>
            <button 
              className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="fas fa-cog"></i>
              Settings
            </button>
            <button 
              className={`profile-tab ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <i className="fas fa-chart-line"></i>
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="profile-content">
            {activeTab === 'overview' && (
              <>
                {/* Stats Section */}
                <div className="stats-section">
                  <h2 className="section-heading">
                    <i className="fas fa-chart-bar"></i>
                    {user.type === 'teacher' ? 'Teaching Overview' : 'Learning Progress'}
                  </h2>
                  <div className="stats-grid">
                    {user.type === 'teacher' ? (
                      <>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-book"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Courses Created</span>
                          </div>
                        </div>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-users"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Active Students</span>
                          </div>
                        </div>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-chalkboard"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Classes Taught</span>
                          </div>
                        </div>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-star"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0.0</span>
                            <span className="stat-label">Average Rating</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-graduation-cap"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Courses Enrolled</span>
                          </div>
                        </div>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-certificate"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Certificates</span>
                          </div>
                        </div>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-clock"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0h</span>
                            <span className="stat-label">Study Hours</span>
                          </div>
                        </div>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="fas fa-tasks"></i>
                          </div>
                          <div className="stat-info">
                            <span className="stat-number">0%</span>
                            <span className="stat-label">Completion</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions-section">
                  <h2 className="section-heading">
                    <i className="fas fa-bolt"></i>
                    Quick Actions
                  </h2>
                  <div className="quick-actions-grid">
                    <button className="quick-action-card" onClick={() => navigate('/courses')}>
                      <div className="action-icon">
                        <i className="fas fa-book-open"></i>
                      </div>
                      <span>Browse Courses</span>
                    </button>
                    <button className="quick-action-card" onClick={() => navigate('/scheduler')}>
                      <div className="action-icon">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <span>My Schedule</span>
                    </button>
                    <button className="quick-action-card" onClick={() => navigate('/quran')}>
                      <div className="action-icon">
                        <i className="fas fa-quran"></i>
                      </div>
                      <span>Quran Learning</span>
                    </button>
                    <button className="quick-action-card" onClick={() => navigate('/dashboard')}>
                      <div className="action-icon">
                        <i className="fas fa-tachometer-alt"></i>
                      </div>
                      <span>Dashboard</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <h2 className="section-heading">
                  <i className="fas fa-user-edit"></i>
                  Account Information
                </h2>
                
                {isEditing ? (
                  <div className="edit-form-card">
                    {saveError && (
                      <div className="error-alert">
                        <i className="fas fa-exclamation-circle"></i>
                        <span>{saveError}</span>
                      </div>
                    )}
                    <div className="form-grid">
                      <div className={`form-group ${fieldErrors.name && touched.name ? 'has-error' : ''}`}>
                        <label htmlFor="name">
                          <i className="fas fa-user"></i>
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your full name"
                          className={fieldErrors.name && touched.name ? 'input-error' : ''}
                        />
                        {fieldErrors.name && touched.name && (
                          <span className="field-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {fieldErrors.name}
                          </span>
                        )}
                      </div>

                      <div className={`form-group ${fieldErrors.email && touched.email ? 'has-error' : ''}`}>
                        <label htmlFor="email">
                          <i className="fas fa-envelope"></i>
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your email"
                          className={fieldErrors.email && touched.email ? 'input-error' : ''}
                        />
                        {fieldErrors.email && touched.email && (
                          <span className="field-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {fieldErrors.email}
                          </span>
                        )}
                      </div>

                      {user.type === 'teacher' && (
                        <div className={`form-group ${fieldErrors.specialization && touched.specialization ? 'has-error' : ''}`}>
                          <label htmlFor="specialization">
                            <i className="fas fa-graduation-cap"></i>
                            Specialization
                          </label>
                          <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Your area of expertise"
                            className={fieldErrors.specialization && touched.specialization ? 'input-error' : ''}
                          />
                          {fieldErrors.specialization && touched.specialization && (
                            <span className="field-error">
                              <i className="fas fa-exclamation-circle"></i>
                              {fieldErrors.specialization}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="form-group">
                        <label htmlFor="institution">
                          <i className="fas fa-building"></i>
                          Institution
                        </label>
                        <input
                          type="text"
                          id="institution"
                          name="institution"
                          value={formData.institution || ''}
                          onChange={handleChange}
                          placeholder="Your institution name"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button className="btn-save" onClick={handleSave}>
                        <i className="fas fa-check"></i>
                        Save Changes
                      </button>
                      <button className="btn-cancel" onClick={handleCancelEdit}>
                        <i className="fas fa-times"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-card">
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-icon">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="info-content">
                          <span className="info-label">Full Name</span>
                          <span className="info-value">{user.name}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <div className="info-icon">
                          <i className="fas fa-envelope"></i>
                        </div>
                        <div className="info-content">
                          <span className="info-label">Email Address</span>
                          <span className="info-value">{user.email}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <div className="info-icon">
                          <i className="fas fa-id-badge"></i>
                        </div>
                        <div className="info-content">
                          <span className="info-label">Account Type</span>
                          <span className="info-value">{user.type === 'teacher' ? 'Teacher' : 'Student'}</span>
                        </div>
                      </div>
                      {user.specialization && (
                        <div className="info-item">
                          <div className="info-icon">
                            <i className="fas fa-graduation-cap"></i>
                          </div>
                          <div className="info-content">
                            <span className="info-label">Specialization</span>
                            <span className="info-value">{user.specialization}</span>
                          </div>
                        </div>
                      )}
                      {user.institution && (
                        <div className="info-item">
                          <div className="info-icon">
                            <i className="fas fa-building"></i>
                          </div>
                          <div className="info-content">
                            <span className="info-label">Institution</span>
                            <span className="info-value">{user.institution}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-pen"></i>
                      Edit Profile
                    </button>
                  </div>
                )}

                {/* Danger Zone */}
                <div className="danger-zone">
                  <h3>
                    <i className="fas fa-exclamation-triangle"></i>
                    Account Actions
                  </h3>
                  <button className="btn-logout" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-section">
                <h2 className="section-heading">
                  <i className="fas fa-history"></i>
                  Recent Activity
                </h2>
                <div className="activity-empty">
                  <div className="empty-icon">
                    <i className="fas fa-clipboard-list"></i>
                  </div>
                  <h3>No Recent Activity</h3>
                  <p>Your recent learning activities will appear here once you start exploring courses.</p>
                  <button className="btn-primary" onClick={() => navigate('/courses')}>
                    Explore Courses
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
