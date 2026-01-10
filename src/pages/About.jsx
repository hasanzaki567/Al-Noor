import './Pages.css';

function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About Al Noor Academy</h1>
        <p>Bridging Islamic Knowledge and Modern Education</p>
      </div>

      <div className="page-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Al Noor Academy is dedicated to providing accessible, high-quality Islamic education 
            to students around the world. We believe in combining authentic Islamic teachings with 
            modern learning methodologies to create an engaging and effective educational experience.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul className="about-list">
            <li>Comprehensive Islamic studies programs</li>
            <li>Expert instructors with years of experience</li>
            <li>Interactive live classes and recorded sessions</li>
            <li>Flexible learning schedules for all time zones</li>
            <li>Recognized certificates upon completion</li>
            <li>24/7 support and community forum</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Authenticity</h3>
              <p>Grounded in authentic Islamic teachings and scholarly sources</p>
            </div>
            <div className="value-card">
              <h3>Accessibility</h3>
              <p>Making Islamic education available to everyone, everywhere</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>Committed to delivering the highest quality education</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>Building a supportive global community of learners</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Journey</h2>
          <p>
            Founded in 2020, Al Noor Academy has grown from a small initiative to a thriving 
            online Islamic education platform with thousands of students across 50+ countries. 
            Our commitment remains unchanged: to inspire, educate, and empower through Islamic knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
