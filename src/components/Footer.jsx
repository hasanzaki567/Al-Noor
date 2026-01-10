import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Al Noor Academy</h3>
            <p>Bridging Islamic Knowledge and Modern Education</p>
            <div className="social-links">
              <a href="#" className="social-icon" title="Facebook">f</a>
              <a href="#" className="social-icon" title="Twitter">𝕏</a>
              <a href="#" className="social-icon" title="Instagram">📷</a>
              <a href="#" className="social-icon" title="YouTube">▶</a>
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

          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter for updates</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Al Noor Academy. All rights reserved.</p>
          <p>Dedicated to Islamic Education and Knowledge</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
