import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateLoginForm, validateEmail } from '../services/validation';
import '../styles/shared.css';  /* Shared styles: .form-group, .error-message, .btn-primary */
import './Auth.css';             /* Page-specific: .auth-page, .auth-left, .auth-right, .auth-form */
import './Pages.css';            /* Additional dashboard/premium header styles */

function Login() {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const serverBase = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

  const handleGoogleSignIn = () => {
    window.location.href = `${serverBase}/api/auth/google`;
  };

  const handleAppleSignIn = () => {
    window.location.href = `${serverBase}/api/auth/apple`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    if (name === 'email' && value) {
      const result = validateEmail(value);
      if (!result.isValid) {
        setFieldErrors(prev => ({ ...prev, email: result.error }));
      }
    } else if (name === 'password' && !value) {
      setFieldErrors(prev => ({ ...prev, password: 'Password is required' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Validate form
    const validation = validateLoginForm(formData);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setTouched({ email: true, password: true });
      setLoading(false);
      return;
    }

    try {
      const response = await login(formData.email, formData.password, userType);
      // Redirect teachers to the teacher portal
      if (userType === 'teacher' || response?.user?.userType === 'teacher') {
        navigate('/teacher-portal');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page modern">
        {/* Left Panel - Branding */}
        <div className="auth-left">
          <div className="auth-left-content">
            <div className="auth-branding">
              <div className="auths-logo">
                <img src="/logoWeb.webp" alt="Al Noor Academy Logo" className='auths-logo-img' />
              </div>
              <h1>Al Noor Academy</h1>
              <p className="tagline">Illuminating Minds, Nurturing Souls</p>
            </div>
            
            <div className="auth-features">
              <div className="feature">
                <div className="feature-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <div className="feature-text">
                  <h4>Access All Courses</h4>
                  <p>Explore our comprehensive Islamic curriculum</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="feature-text">
                  <h4>Track Your Progress</h4>
                  <p>Monitor your learning journey with detailed insights</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <i className="fas fa-video"></i>
                </div>
                <div className="feature-text">
                  <h4>Live Classes</h4>
                  <p>Join interactive sessions with expert teachers</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <div className="feature-text">
                  <h4>Earn Certificates</h4>
                  <p>Get recognized for your achievements</p>
                </div>
              </div>
            </div>

            <div className="auth-testimonial">
              <p>"Al Noor Academy transformed my understanding of the Quran. The teachers are exceptional!"</p>
              <span>— Sarah M., Student</span>
            </div>
          </div>
          
          <div className="auth-left-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-header">
              <div className="welcome-back">
                <span className="wave-emoji">👋</span>
                <span>Welcome back!</span>
              </div>
              <h2>Sign in to your account</h2>
              <p>Continue your learning journey with us</p>
            </div>

            {/* User Type Selection */}
            <div className="user-type-tabs">
              <button
                className={`tab ${userType === 'student' ? 'active' : ''}`}
                onClick={() => setUserType('student')}
                type="button"
              >
                <span className="tab-icon">👨‍🎓</span>
                <span className="tab-text">
                  <strong>Student</strong>
                  <small>Access courses & materials</small>
                </span>
              </button>
              <button
                className={`tab ${userType === 'teacher' ? 'active' : ''}`}
                onClick={() => setUserType('teacher')}
                type="button"
              >
                <span className="tab-icon">👨‍🏫</span>
                <span className="tab-text">
                  <strong>Teacher</strong>
                  <small>Manage classes & students</small>
                </span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-alert">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className={`form-group ${fieldErrors.email && touched.email ? 'has-error' : ''}`}>
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i>
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your.email@example.com"
                    disabled={loading}
                    autoComplete="email"
                    className={fieldErrors.email && touched.email ? 'input-error' : ''}
                  />
                </div>
                {fieldErrors.email && touched.email && (
                  <span className="field-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              <div className={`form-group ${fieldErrors.password && touched.password ? 'has-error' : ''}`}>
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  Password
                </label>
                <div className="input-wrapper password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    disabled={loading}
                    autoComplete="current-password"
                    className={fieldErrors.password && touched.password ? 'input-error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {fieldErrors.password && touched.password && (
                  <span className="field-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {fieldErrors.password}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" disabled={loading} />
                  <span className="checkmark"></span>
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <button type="button" className="social-btn google" onClick={handleGoogleSignIn} disabled={loading}>
                <i className="fab fa-google"></i>
                Google
              </button>
              <button type="button" className="social-btn apple" onClick={handleAppleSignIn} disabled={loading}>
                <i className="fab fa-apple"></i>
                Apple
              </button>
            </div>

            {/* Footer */}
            <div className="auth-footer-text">
              <p>Don't have an account? <Link to="/signup" className="link">Create one</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

