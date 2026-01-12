import './Pages.css';

function TermsOfService() {
  return (
    <div className="page-container">
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">📋</div>
        <h1>Terms of Service</h1>
        <p>Please read our terms carefully</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F"/>
          </svg>
        </div>
      </header>

      <div className="page-content">
        <div className="policy-container">
          <section className="policy-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using the Al Noor Academy website and services, you accept and agree to be bound by and comply with these Terms and Conditions. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Al Noor Academy's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on Al Noor Academy's website</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Violating any applicable laws or regulations related to access to or use of the website</li>
              <li>Accessing or searching the website by any means other than Al Noor Academy's publicly supported interfaces</li>
              <li>Harvesting or scraping content from the website without permission</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Disclaimer</h2>
            <p>
              The materials on Al Noor Academy's website are provided on an 'as is' basis. Al Noor Academy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, Al Noor Academy does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this website.
            </p>
          </section>

          <section className="policy-section">
            <h2>4. Limitations</h2>
            <p>
              In no event shall Al Noor Academy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Al Noor Academy's website, even if Al Noor Academy or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="policy-section">
            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Al Noor Academy's website could include technical, typographical, or photographic errors. Al Noor Academy does not warrant that any of the materials on its website are accurate, complete, or current. Al Noor Academy may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Materials and Content</h2>
            <p>
              Al Noor Academy has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Al Noor Academy of the site. Use of any such linked website is at the user's own risk.
            </p>
            <p>
              All course materials, including but not limited to text, graphics, logos, images, audio clips, and software are the property of Al Noor Academy or its content suppliers and are protected by international copyright laws.
            </p>
          </section>

          <section className="policy-section">
            <h2>7. Modifications</h2>
            <p>
              Al Noor Academy may revise these terms and conditions for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.
            </p>
          </section>

          <section className="policy-section">
            <h2>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction], and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="policy-section">
            <h2>9. User Accounts</h2>
            <p>
              If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="policy-section">
            <h2>10. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any applicable law or regulation</li>
              <li>Infringe on any intellectual property rights</li>
              <li>Harass, threaten, defame, or abuse anyone</li>
              <li>Transmit obscene or offensive content</li>
              <li>Disrupt the normal flow of dialogue in our platform</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p>
              <strong>Al Noor Academy</strong><br/>
              Email: support@alnooracademy.com<br/>
              Address: [Your Physical Address]<br/>
              Phone: [Your Phone Number]
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

export default TermsOfService;
