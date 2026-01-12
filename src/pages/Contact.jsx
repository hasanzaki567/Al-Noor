import './Pages.css';
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      question: 'What are the prerequisites for courses?',
      answer: 'Most courses are open to all levels. Check individual course descriptions for specific requirements.'
    },
    {
      question: 'How can I get in touch with instructors?',
      answer: 'You can contact instructors through the course forum or schedule office hours.'
    },
    {
      question: 'Are certificates recognized?',
      answer: 'Yes, our certificates are recognized in Islamic education circles worldwide.'
    },
    {
      question: 'What is the refund policy?',
      answer: 'We offer a 30-day money-back guarantee if you\'re not satisfied with the course.'
    }
  ];

  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">✉️</div>
        <h1>Contact Us & Help</h1>
        <p>Get in touch with us for support and questions</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F"/>
          </svg>
        </div>
      </header>

      <div className="page-content">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <div className="info-card">
              <h3>Email</h3>
              <p>info@alnooracademy.com</p>
            </div>
            <div className="info-card">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-card">
              <h3>Address</h3>
              <p>123 Islamic Education Street<br/>Knowledge City, KC 12345</p>
            </div>
            <div className="info-card">
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
