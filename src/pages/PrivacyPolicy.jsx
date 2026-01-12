import './Pages.css';

function PrivacyPolicy() {
  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">🔒</div>
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F"/>
          </svg>
        </div>
      </header>

      <div className="page-content">
        <div className="policy-container">
          <section className="policy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Al Noor Academy ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our educational services.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, phone number, educational background, and preferences</li>
              <li><strong>Payment Information:</strong> Billing address, payment method, and transaction history</li>
              <li><strong>Account Information:</strong> Username, password, profile picture, and learning progress</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, and usage data</li>
              <li><strong>Cookies:</strong> Information stored on your device to enhance user experience</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Deliver course content and educational services</li>
              <li>Improve and personalize your learning experience</li>
              <li>Process your transactions and send related information</li>
              <li>Email regarding course updates, new features, or other information</li>
              <li>Fulfill and manage your course enrollments</li>
              <li>Generate a personal profile about you so that future visits to our site will be personalized</li>
              <li>Increase the efficiency and operation of our site</li>
              <li>Monitor and analyze usage and trends to improve your experience</li>
              <li>Notify you of updates to our site</li>
              <li>Conduct research and analytics about user behavior</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Disclosure of Your Information</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>By Law or to Protect Rights:</strong> If required by law or if we believe in good faith that disclosure is necessary</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with vendors, consultants, and service providers who assist us in operating our website</li>
              <li><strong>Business Transfers:</strong> If Al Noor Academy is involved in a merger, acquisition, or asset sale</li>
              <li><strong>Your Consent:</strong> We may disclose your information with your explicit consent for any purpose</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Al Noor Academy</strong><br/>
              Email: privacy@alnooracademy.com<br/>
              Address: [Your Physical Address]<br/>
              Phone: [Your Phone Number]
            </p>
          </section>

          <section className="policy-section">
            <h2>7. Changes to This Policy</h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Changes and clarifications will take effect immediately upon their posting to the website. If we make material changes to this policy, we will notify you here that it has been updated.
            </p>
          </section>

          <section className="policy-section">
            <p style={{ marginTop: '40px', fontSize: '0.9rem', color: '#6B7280' }}>
              Last Updated: January 12, 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
