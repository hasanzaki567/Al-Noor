import '../styles/shared.css';  /* Shared styles: .form-group, .success-message, .social-links */
import './Contact.css';          /* Page-specific: .contact-page, .contact-hero, .contact-form, .contact-info */
import { useState } from 'react';
import usePageTitle from "../hooks/usePageTitle";
import { validateContactForm, validateEmail, validateName, validateRequired, validateMessage } from '../services/validation';

function Contact() {
  usePageTitle("Contact Us");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

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
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    let result;
    switch (name) {
      case 'name':
        result = validateName(value);
        break;
      case 'email':
        result = validateEmail(value);
        break;
      case 'subject':
        result = validateRequired(value, 'Subject', { minLength: 3, maxLength: 100 });
        break;
      case 'message':
        result = validateMessage(value);
        break;
      default:
        result = { isValid: true, error: null };
    }
    
    if (!result.isValid) {
      setFieldErrors(prev => ({ ...prev, [name]: result.error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }
    
    setIsSubmitting(true);
    setFieldErrors({});
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
        </div>
        <div className="hero-decoration">
          <div className="mosque-silhouette"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        <div className="contact-container">
          <h2 className="section-heading">Let's Start a Conversation</h2>

          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              {submitted && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className={`form-group ${fieldErrors.name && touched.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="em@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldErrors.email && touched.email ? 'input-error' : ''}
                  />
                  {fieldErrors.email && touched.email && (
                    <span className="field-error">
                      <i className="fas fa-exclamation-circle"></i>
                      {fieldErrors.email}
                    </span>
                  )}
                </div>

                <div className={`form-group ${fieldErrors.subject && touched.subject ? 'has-error' : ''}`}>
                  <label htmlFor="subject">
                    Subject <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldErrors.subject && touched.subject ? 'input-error' : ''}
                  />
                  {fieldErrors.subject && touched.subject && (
                    <span className="field-error">
                      <i className="fas fa-exclamation-circle"></i>
                      {fieldErrors.subject}
                    </span>
                  )}
                </div>

                <div className={`form-group ${fieldErrors.message && touched.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Message (minimum 10 characters)"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldErrors.message && touched.message ? 'input-error' : ''}
                  ></textarea>
                  {fieldErrors.message && touched.message && (
                    <span className="field-error">
                      <i className="fas fa-exclamation-circle"></i>
                      {fieldErrors.message}
                    </span>
                  )}
                  <span className="char-count">{formData.message.length}/2000</span>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-item">
                <h3>Address</h3>
                <p>123 Islamic Education Street<br/>Knowledge City, KC 12345</p>
              </div>

              <div className="info-item">
                <h3>Email</h3>
                <p>info@alnooracademy.com</p>
              </div>

              <div className="info-item">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>

              <div className="info-item">
                <h3>Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>
                Saturday: 10:00 AM - 4:00 PM<br/>
                Sunday: Closed</p>
              </div>

              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
