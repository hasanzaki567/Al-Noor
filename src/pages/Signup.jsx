import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';
import './Pages.css';

function Signup() {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    institution: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (userType === 'teacher' && !formData.specialization) {
      setError('Teachers must specify their specialization');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const user = {
        name: formData.name,
        email: formData.email,
        type: userType,
        specialization: formData.specialization || 'Student',
        institution: formData.institution || 'Al Noor Academy',
        joinDate: new Date().toLocaleDateString()
      };

      login(user); // Use AuthContext login
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">📝</div>
        <h1>Sign Up</h1>
        <p>Join our learning community</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F"/>
          </svg>
        </div>
      </header>
      <div className="page-content">
        <div className="auth-page">
          <div className="auth-left">
            <div className="auth-branding">
              <div className="auth-logo">🕌</div>
              <h1>Al Noor Academy</h1>
              <p>Start your Islamic learning journey today</p>
            </div>
            <div className="auth-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Learn from expert instructors</p>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Flexible learning schedule</p>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Interactive live classes</p>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Earn certificates</p>
              </div>
            </div>
          </div>

          <div className="auth-right">
            <div className="auth-form-container">
              <div className="auth-header">
                <h2>Create Account</h2>
                <p>Join our learning community</p>
              </div>

              <div className="user-type-tabs">
                <button
                  className={`tab ${userType === 'student' ? 'active' : ''}`}
                  onClick={() => setUserType('student')}
                >
                  <span className="tab-icon">👨‍🎓</span>
                  Student
                </button>
                <button
                  className={`tab ${userType === 'teacher' ? 'active' : ''}`}
                  onClick={() => setUserType('teacher')}
                >
                  <span className="tab-icon">👨‍🏫</span>
                  Teacher
                </button>
              </div>

              {error && <div className="error-alert">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>

                {userType === 'teacher' && (
                  <div className="form-group">
                    <label htmlFor="specialization">Specialization *</label>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder="e.g., Quranic Studies"
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="institution">Institution (Optional)</label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Your organization"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                </div>

                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" disabled={loading} required />
                  <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                </div>

                <button type="submit" className="signup-btn" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <div className="auth-footer-text">
                <p>Already have an account? <Link to="/login" className="link">Sign in</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

