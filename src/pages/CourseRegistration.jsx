import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { courseAPI } from '../services/api';
import { validateEmail, validateName, validateRequired } from '../services/validation';
import usePageTitle from '../hooks/usePageTitle';
import '../styles/shared.css';
import './CourseRegistration.css';

const courses = [
  {
    id: 'pearls-of-juz-amma',
    title: 'Pearls of Juz Amma',
    description: 'Learn Quran memorization starting from the 30th Juz with expert teachers.',
    price: 450,
    originalPrice: 480,
  },
  {
    id: 'young-quranic-gems',
    title: 'Young Quranic Gems',
    description: 'Interactive Tajweed and Surah memorization course for young kids aged 5.5 to 8 years.',
    price: 750,
    originalPrice: 780,
  },
  {
    id: 'quranic-blossoms',
    title: 'Quranic Blossoms',
    description: 'Online Tajweed and memorization classes for females aged 16–35+, with flexible timings.',
    price: 350,
    originalPrice: 380,
  },
  {
    id: 'quranic-guardians',
    title: 'Quranic Guardians',
    description: 'Quran recitation and memorization course with Tajweed for males aged 19–35+, conducted online.',
    price: 230,
    originalPrice: 280,
  },
];

function CourseRegistration() {
  usePageTitle('Course Registration');
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course');
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    courseId: preselectedCourse || '',
    hifzParasCompleted: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');

    // Clear field error
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    let result;
    switch (name) {
      case 'name':
        result = validateName(value, 'Name');
        break;
      case 'email':
        result = validateEmail(value);
        break;
      case 'age':
        const ageNum = parseInt(value);
        if (!value) {
          result = { isValid: false, error: 'Age is required' };
        } else if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
          result = { isValid: false, error: 'Age must be between 5 and 100' };
        } else {
          result = { isValid: true, error: null };
        }
        break;
      case 'courseId':
        result = validateRequired(value, 'Course selection');
        break;
      default:
        result = { isValid: true, error: null };
    }

    if (!result.isValid) {
      setFieldErrors(prev => ({ ...prev, [name]: result.error }));
    }
  };

  const validateForm = () => {
    const errors = {};

    const nameResult = validateName(formData.name, 'Name');
    if (!nameResult.isValid) errors.name = nameResult.error;

    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) errors.email = emailResult.error;

    const ageNum = parseInt(formData.age);
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
      errors.age = 'Age must be between 5 and 100';
    }

    if (!formData.courseId) {
      errors.courseId = 'Please select a course';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    const validation = validateForm();

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setTouched({
        name: true,
        email: true,
        age: true,
        courseId: true
      });
      setLoading(false);
      return;
    }

    try {
      const response = await courseAPI.register({
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        courseId: formData.courseId,
        hifzParasCompleted: formData.hifzParasCompleted ? parseInt(formData.hifzParasCompleted) : 0,
        userId: user?._id || null
      });

      setSuccess(true);
      setRegistrationData(response.registration);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCourse = courses.find(c => c.id === formData.courseId);

  if (success && registrationData) {
    return (
      <div className="registration-page">
        <div className="registration-success">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Registration Successful!</h1>
          <p>Thank you for registering for <strong>{registrationData.courseName}</strong></p>
          
          <div className="success-details">
            <div className="detail-row">
              <span className="label">Name:</span>
              <span className="value">{registrationData.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{registrationData.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Course Fee:</span>
              <span className="value">${registrationData.amount}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="value status-badge">{registrationData.status}</span>
            </div>
          </div>

          <p className="success-message">
            We will contact you shortly with payment details and course access information.
          </p>

          <div className="success-actions">
            <button className="btn-primary" onClick={() => navigate('/courses')}>
              Browse More Courses
            </button>
            <button className="btn-secondary" onClick={() => navigate('/')}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <div className="registration-container">
        {/* Header */}
        <div className="registration-header">
          <h1>Course Registration</h1>
          <p>Register for your preferred Quran learning course</p>
        </div>

        <div className="registration-content">
          {/* Course Selection */}
          <div className="course-selection">
            <h2>Select Your Course</h2>
            <div className="course-options">
              {courses.map(course => (
                <label
                  key={course.id}
                  className={`course-option ${formData.courseId === course.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="courseId"
                    value={course.id}
                    checked={formData.courseId === course.id}
                    onChange={handleChange}
                  />
                  <div className="course-option-content">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className="course-price">
                      <span className="price">${course.price}</span>
                      <span className="original-price">${course.originalPrice}</span>
                    </div>
                  </div>
                  <div className="course-check">
                    <i className="fas fa-check-circle"></i>
                  </div>
                </label>
              ))}
            </div>
            {fieldErrors.courseId && touched.courseId && (
              <span className="field-error">
                <i className="fas fa-exclamation-circle"></i>
                {fieldErrors.courseId}
              </span>
            )}
          </div>

          {/* Registration Form */}
          <div className="registration-form-section">
            <h2>Your Information</h2>

            {error && (
              <div className="error-alert">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="registration-form">
              <div className={`form-group ${fieldErrors.name && touched.name ? 'has-error' : ''}`}>
                <label htmlFor="name">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
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

              <div className={`form-group ${fieldErrors.email && touched.email ? 'has-error' : ''}`}>
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
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

              <div className={`form-group ${fieldErrors.age && touched.age ? 'has-error' : ''}`}>
                <label htmlFor="age">
                  Age <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your age"
                  min="5"
                  max="100"
                  disabled={loading}
                  className={fieldErrors.age && touched.age ? 'input-error' : ''}
                />
                {fieldErrors.age && touched.age && (
                  <span className="field-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {fieldErrors.age}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="hifzParasCompleted">
                  Hifz Progress (Optional)
                </label>
                <select
                  id="hifzParasCompleted"
                  name="hifzParasCompleted"
                  value={formData.hifzParasCompleted}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">How many Paras have you memorized?</option>
                  <option value="0">None / Just starting</option>
                  <option value="1">1 Para</option>
                  <option value="2">2 Paras</option>
                  <option value="3">3 Paras</option>
                  <option value="4">4 Paras</option>
                  <option value="5">5 Paras</option>
                  <option value="6">6-10 Paras</option>
                  <option value="11">11-15 Paras</option>
                  <option value="16">16-20 Paras</option>
                  <option value="21">21-25 Paras</option>
                  <option value="26">26-29 Paras</option>
                  <option value="30">Complete Quran (30 Paras)</option>
                </select>
                <span className="form-hint">This helps us understand your current level</span>
              </div>

              {/* Order Summary */}
              {selectedCourse && (
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Course:</span>
                    <span>{selectedCourse.title}</span>
                  </div>
                  <div className="summary-row">
                    <span>Original Price:</span>
                    <span className="strike">${selectedCourse.originalPrice}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span className="price">${selectedCourse.price}</span>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading || !formData.courseId}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-shopping-cart"></i>
                    Purchase & Register
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
