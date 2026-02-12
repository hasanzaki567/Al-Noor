import '../styles/shared.css';  /* Shared styles: .page-container, .btn-primary, .btn-secondary */
import "./course.css";           /* Page-specific: .courses-page, .courses-hero, .course-grid, .course-cards */
import usePageTitle from "../hooks/usePageTitle";
// import './Pages.css';         /* Removed - using shared.css instead */
import boy from '../assets/boy.jpg';
import './QuranLearning.css';    /* CTA section styles: .cta-section, .cta-box */
import lady from '../assets/femaleteacher.png';
import CourseShowcase from '../components/CourseShowcase';



function Courses() {
  usePageTitle("Courses");

  return (
    <div className="page-container">

      {/* HERO */}
      <section className="cta-section">
        <div className="cta-box" style={{ backgroundImage: `url(${boy})` }}>
          <div className="cta-text">

            <h2>
              Explore our  <br />
              Quran courses
            </h2>

            <p>
              Learn the Quran online with expert teachers through structured
              courses designed for all ages and levels.
            </p>

            <div className="cta-actions">
              <button className="primary-btn">View All courses</button>
              <button className="secondary-btn">start free trial</button>
            </div>
          </div>
        </div>
      </section>

      {/* FEMALE TEACHERS SECTION */}
      <section className="female-section">
        <div className="female-card">
          <div className="female-icon">
            <img src={lady} alt="Female teacher" />
          </div>

          <div className="female-content">
            <h2>Female Students, Taught by Female Teachers</h2>
            <p>
              Female students can learn comfortably with qualified female Quran
              teachers in a respectful and private learning environment.
            </p>

            <div className="female-features">
              <span>Qualified Female Instructors</span>
              <span>Comfort & Privacy</span>
              <span>One-to-One Classes</span>
            </div>
          </div>

          <div className="female-badge">Female teachers available</div>
        </div>
      </section>

      <CourseShowcase heading="Popular Quran Courses" ctaLabel="View All Courses" />

      {/* STATS */}
      < section className="stats-section" >
        <div className="stat">
          <h3>98%</h3>
          <p>Success Rate</p>
        </div>
        <div className="stat">
          <h3>50,000+</h3>
          <p>Happy Students</p>
        </div>
        <div className="stat">
          <h3>5+ Years</h3>
          <p>Experience</p>
        </div>
      </section >

      {/* CTA */}
      < section className="courses-cta" >
        <h2>Start Your Quran Learning Journey Today</h2>
        <p>
          Sign up for a free trial and experience high-quality Quran education
          online.
        </p>
        <button className="btn-primary">Start Your Free Trial</button>
      </section >
      
    </div >
  );
}

export default Courses;
