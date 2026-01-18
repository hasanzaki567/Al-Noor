import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section brand-section">
            <div className="footer-brand">
              <img src="./public/logoWeb.webp" alt="Al Noor Academy" className="footer-logo" />
              <h3>Al Noor Academy</h3>
            </div>
            <p>Bridging Islamic Knowledge and Modern Education. Your journey to enlightenment starts here.</p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/quran">Quran</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/scheduler">Schedule</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section newsletter-section">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates and courses.</p>
            <div className="newsletter">
              <input type="email" placeholder="Your email address" />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            &copy; {currentYear} Al Noor Academy. All rights reserved.
          </p>
          <button className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} aria-label="Back to top">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
