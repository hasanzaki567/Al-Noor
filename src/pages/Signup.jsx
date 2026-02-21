import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateSignupForm, validateEmail, validatePassword, validateName, validateConfirmPassword } from '../services/validation';
import '../styles/shared.css';  /* Shared styles: .form-group, .error-message, .btn-primary */
import './Auth.css';             /* Page-specific: .signup-page, .signup-left, .signup-right, .signup-form */

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

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
    let result;
    switch (name) {
      case 'name':
        result = validateName(value, 'Full name');
        break;
      case 'email':
        result = validateEmail(value);
        break;
      case 'password':
        result = validatePassword(value);
        break;
      case 'confirmPassword':
        result = validateConfirmPassword(formData.password, value);
        break;
      case 'specialization':
        if (userType === 'teacher' && !value.trim()) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Validate form
    const validation = validateSignupForm({ ...formData, userType });
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        specialization: true
      });
      setLoading(false);
      return;
    }

    try {
      const response = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: userType,
        specialization: formData.specialization || '',
        institution: formData.institution || 'Al Noor Academy',
        country: formData.country || ''
      });
      // Redirect to proper dashboard after signup
      if (userType === 'teacher' || response?.user?.userType === 'teacher') {
        navigate('/teacher-portal');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <div className={`signup-field ${fieldErrors.name && touched.name ? 'has-error' : ''}`}>
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Name"
                  disabled={loading}
                  className={fieldErrors.name && touched.name ? 'input-error' : ''}
                />
                {fieldErrors.name && touched.name && (
                  <span className="field-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {fieldErrors.name}
                  </span>
                )}
              </div>

              <div className="signup-field">
                <label htmlFor="country">Country</label>
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

              <div className={`signup-field ${fieldErrors.email && touched.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Email"
                  disabled={loading}
                  className={fieldErrors.email && touched.email ? 'input-error' : ''}
                />
                {fieldErrors.email && touched.email && (
                  <span className="field-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              {userType === 'teacher' && (
                <div className={`signup-field ${fieldErrors.specialization && touched.specialization ? 'has-error' : ''}`}>
                  <label htmlFor="specialization">Specialization <span className="required">*</span></label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Quranic Studies, Arabic"
                    disabled={loading}
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

              <div className={`signup-field ${fieldErrors.password && touched.password ? 'has-error' : ''}`}>
                <label htmlFor="password">Password <span className="required">*</span></label>
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Password (min 6 characters)"
                    disabled={loading}
                    className={fieldErrors.password && touched.password ? 'input-error' : ''}
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
                {fieldErrors.password && touched.password && (
                  <span className="field-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {fieldErrors.password}
                  </span>
                )}
              </div>

              <div className={`signup-field ${fieldErrors.confirmPassword && touched.confirmPassword ? 'has-error' : ''}`}>
                <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                <div className="password-field">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Confirm Password"
                    disabled={loading}
                    className={fieldErrors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
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
                {fieldErrors.confirmPassword && touched.confirmPassword && (
                  <span className="field-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {fieldErrors.confirmPassword}
                  </span>
                )}
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

