import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import './Pages.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">👤</div>
        <h1>Profile</h1>
        <p>Manage your account and personal information</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F"/>
          </svg>
        </div>
      </header>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.type === 'teacher' ? '👨‍🏫' : '👨‍🎓'}
            </div>
            <div className="profile-info">
              <h1>{user.name}</h1>
              <p className="user-type">
                {user.type === 'teacher' ? 'Teacher' : 'Student'} Account
              </p>
            </div>
          </div>

          <div className="profile-content">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {user.type === 'teacher' && (
                  <div className="form-group">
                    <label htmlFor="specialization">Specialization</label>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="institution">Institution</label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-actions">
                  <button className="save-btn" onClick={handleSave}>Save Changes</button>
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="profile-details">
                <div className="detail-section">
                  <h3>Account Information</h3>
                  <div className="detail-item">
                    <label>Email:</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>Account Type:</label>
                    <p>{user.type === 'teacher' ? 'Teacher' : 'Student'}</p>
                  </div>
                  {user.specialization && (
                    <div className="detail-item">
                      <label>Specialization:</label>
                      <p>{user.specialization}</p>
                    </div>
                  )}
                  <div className="detail-item">
                    <label>Institution:</label>
                    <p>{user.institution}</p>
                  </div>
                  {user.joinDate && (
                    <div className="detail-item">
                      <label>Join Date:</label>
                      <p>{user.joinDate}</p>
                    </div>
                  )}
                </div>

                {user.type === 'teacher' && (
                  <div className="detail-section">
                    <h3>Teacher Dashboard</h3>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-number">0</div>
                        <div className="stat-label">Courses Created</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">0</div>
                        <div className="stat-label">Active Students</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">0</div>
                        <div className="stat-label">Classes Taught</div>
                      </div>
                    </div>
                  </div>
                )}

                {user.type === 'student' && (
                  <div className="detail-section">
                    <h3>Learning Progress</h3>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-number">0</div>
                        <div className="stat-label">Courses Enrolled</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">0</div>
                        <div className="stat-label">Certificates Earned</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">0h</div>
                        <div className="stat-label">Study Hours</div>
                      </div>
                    </div>
                  </div>
                )}

                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              </div>
            )}
          </div>

          <div className="profile-footer">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
