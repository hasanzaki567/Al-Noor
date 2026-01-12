import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';
import './Pages.css';

function Login() {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const user = {
        email: formData.email,
        type: userType,
        name: formData.email.split('@')[0]
      };
      
      login(user); // Use AuthContext login
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">🔑</div>
        <h1>Login</h1>
        <p>Access your account and start learning</p>
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
              <p>Welcome back to your learning journey</p>
            </div>
            <div className="auth-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Access all your courses</p>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Track your progress</p>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Join live classes</p>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <p>Get certificates</p>
              </div>
            </div>
          </div>

          <div className="auth-right">
            <div className="auth-form-container">
              <div className="auth-header">
                <h2>Login</h2>
                <p>Sign in to your account</p>
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

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" disabled={loading} />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="auth-footer-text">
                <p>Don't have an account? <Link to="/signup" className="link">Create one</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

