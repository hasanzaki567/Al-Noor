import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

function Signup() {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    institution: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        country: formData.country || '',
        joinDate: new Date().toLocaleDateString()
      };

      login(user);
      setLoading(false);
      navigate('/profile');
    }, 600);
  };

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 
    'Pakistan', 'Bangladesh', 'Saudi Arabia', 'UAE', 'Egypt', 
    'Malaysia', 'Indonesia', 'Turkey', 'South Africa', 'Nigeria',
    'Germany', 'France', 'Other'
  ];

  return (
    <div className="signup-page-wrapper">
      <div className="signup-page">
        {/* Left Panel - Image */}
        <div className="signup-left">
          <div className="signup-image-overlay"></div>
          <div className="signup-branding">
            <img src="/logoWeb.webp" alt="Al Noor Academy" className="signup-logo" />
            <h1>Al Noor Academy</h1>
            <p className="signup-tagline">Begin Your Journey of Islamic Knowledge</p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="signup-right">
          <div className="signup-form-container">
            <h2 className="signup-title">Sign Up</h2>

            {/* User Type Selection */}
            <div className="signup-type-toggle">
              <button
                type="button"
                className={`type-btn ${userType === 'student' ? 'active' : ''}`}
                onClick={() => setUserType('student')}
              >
                <i className="fas fa-user-graduate"></i>
                Student
              </button>
              <button
                type="button"
                className={`type-btn ${userType === 'teacher' ? 'active' : ''}`}
                onClick={() => setUserType('teacher')}
              >
                <i className="fas fa-chalkboard-teacher"></i>
                Teacher
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="signup-error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="signup-field">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  disabled={loading}
                />
              </div>

              <div className="signup-field">
                <label htmlFor="country">Country <span className="required">*</span></label>
                <div className="select-wrapper">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">--- Select a country ---</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down select-icon"></i>
                </div>
              </div>

              <div className="signup-field">
                <label htmlFor="email">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  disabled={loading}
                />
              </div>

              {userType === 'teacher' && (
                <div className="signup-field">
                  <label htmlFor="specialization">Specialization <span className="required">*</span></label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g., Quranic Studies, Arabic"
                    disabled={loading}
                  />
                </div>
              )}

              <div className="signup-field">
                <label htmlFor="institution">Institution</label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Your organization (optional)"
                  disabled={loading}
                />
              </div>

              <div className="signup-field">
                <label htmlFor="password">Password <span className="required">*</span></label>
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="signup-field">
                <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                <div className="password-field">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter Confirm Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="signup-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <div className="signup-footer">
              <p>Already have an account? <Link to="/login" className="signup-link">Log In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

