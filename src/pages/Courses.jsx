// import './Pages.css';
import { useState } from 'react';
import usePageTitle from "../hooks/usePageTitle";
import "./course.css";
import boy from '../assets/boy.jpg';
import './QuranLearning.css';
import lady from '../assets/femaleteacher.png';



function Courses() {
  usePageTitle("Courses");
  const coursesList = [
    {
      id: 1,
      title: 'Quranic Arabic',
      instructor: 'Sheikh Ahmed',
      level: 'Beginner',
      duration: '8 weeks',
      students: 245,
      price: 79
    },
    {
      id: 2,
      title: 'Islamic History',
      instructor: 'Dr. Hassan',
      level: 'Intermediate',
      duration: '12 weeks',
      students: 189,
      price: 99
    },
    {
      id: 3,
      title: 'Hadith Sciences',
      instructor: 'Sheikh Muhammad',
      level: 'Advanced',
      duration: '16 weeks',
      students: 156,
      price: 119
    },
    {
      id: 4,
      title: 'Islamic Jurisprudence',
      instructor: 'Dr. Ali',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 203,
      price: 89
    }
  ];

  const sampleCurriculums = {
    1: [
      'Introduction to Quranic Arabic',
      'Basic Grammar & Vocabulary',
      'Reading Practice',
      'Simple Sentences',
      'Final Assessment'
    ],
    2: [
      'Early Islamic History',
      'The Caliphate Era',
      'Golden Age of Islam',
      'Modern Developments',
      'Project & Review'
    ],
    3: [
      'Introduction to Hadith',
      'Major Collections',
      'Science of Narration',
      'Critical Analysis',
      'Research Project'
    ],
    4: [
      'Principles of Jurisprudence',
      'Schools of Thought',
      'Case Studies',
      'Contemporary Issues',
      'Final Exam'
    ]
  };

  // Sample reviews for each course
  const sampleReviews = {
    1: [
      { name: 'Fatima S.', rating: 5, text: 'This course made Quranic Arabic so easy to understand! Highly recommended.' },
      { name: 'Omar R.', rating: 4, text: 'Great instructor and clear materials.' }
    ],
    2: [
      { name: 'Aisha K.', rating: 5, text: 'Loved the historical insights and engaging lessons.' },
      { name: 'Bilal M.', rating: 4, text: 'Very informative and well-structured.' }
    ],
    3: [
      { name: 'Zainab L.', rating: 5, text: 'Deep dive into Hadith sciences, exceeded my expectations.' },
      { name: 'Yusuf H.', rating: 4, text: 'Challenging but rewarding.' }
    ],
    4: [
      { name: 'Maryam T.', rating: 5, text: 'Clear explanations of complex topics.' },
      { name: 'Imran S.', rating: 4, text: 'Practical and relevant examples.' }
    ]
  };
  const [openCurriculum, setOpenCurriculum] = useState(null);

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

      {/* COURSES */}
      <section className="courses-list">
        <h2>Popular Quran Courses</h2>

        <div className="course-grid">


          <div className="course-cards">
            <div className="headcard green">
              <h3>Beginner Quran Reading</h3>
            </div>
            <p className="price">$30 / mo</p>
            <ul>
              <li>Basic Quran reading</li>
              <li>Arabic letters</li>
              <li>Correct pronunciation</li>
            </ul>
            <button>View Details</button>
          </div>


          <div className="course-cards">
            <div className="headcard purple">
              <h3>Tajweed Ul Quran</h3>
            </div>
            <p className="price">$45 / mo</p>
            <ul>
              <li>Master Tajweed rules</li>
              <li>Improve recitation</li>
              <li>1-on-1 feedback</li>
            </ul>
            <button>View Details</button>
          </div>

          <div className="course-cards">
            <div className="tag">Female teachers</div>
            <div className="headcard yellow">
              <h3>Kids Quran Learning</h3>
            </div>
            <p className="price">$50 / mo</p>
            <ul>
              <li>Fun & engaging</li>
              <li>Recitation & memorization</li>
              <li>Ages 5-12</li>
            </ul>
            <button>View Details</button>
          </div>


          <div className="course-cards">
            <div className="headcard blue">
              <h3>Arabic Grammar</h3>
            </div>
            <p className="price">$60 / mo</p>
            <ul>
              <li>Quranic Arabic</li>
              <li>Understand meanings</li>
              <li>Speak & write</li>
            </ul>
            <button>View Details</button>
          </div>


        </div>
      </section >

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

      {/* 
      <header className="page-header premium-header">
        <div className="header-icon" aria-hidden="true">📚</div>
        <h1>Our Courses</h1>
        <p>Explore world-class Islamic education for every learner</p>
        <div className="header-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#23272F" />
          </svg>
        </div>
      </header>

      <div className="page-content">
        <div className="courses-grid">
          {coursesList.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h2>{course.title}</h2>
                <span className={`level ${course.level.toLowerCase()}`}>{course.level}</span>
              </div>
              <div className="course-instructor">
                <img className="instructor-avatar" src={`https://randomuser.me/api/portraits/men/${course.id + 10}.jpg`} alt={course.instructor} />
                <div className="instructor-info">
                  <span className="instructor-name">{course.instructor}</span>
                  <span className="instructor-badge">✔ Verified Instructor</span>
                  <span className="instructor-cred">PhD, Islamic Studies</span>
                </div>
              </div>
              <div className="course-details">
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Students:</strong> {course.students} enrolled</p>
              </div>
              <ul className="included-list">
                <li>Lifetime access to all materials</li>
                <li>Downloadable resources & notes</li>
                <li>Interactive quizzes & assignments</li>
                <li>Certificate upon completion</li>
                <li>Access to student community</li>
              </ul>
              <div className="course-pricing-row">
                <span className="course-price">${course.price} <span className="course-currency">USD</span></span>
                <button className="enroll-btn premium">Enroll Now</button>
              </div>
              <button
                className="curriculum-toggle"
                onClick={() => setOpenCurriculum(openCurriculum === course.id ? null : course.id)}
                aria-expanded={openCurriculum === course.id}
                aria-controls={`curriculum-${course.id}`}
              >
                {openCurriculum === course.id ? 'Hide Curriculum' : 'View Curriculum'}
              </button>
              {openCurriculum === course.id && (
                <ul className="curriculum-list" id={`curriculum-${course.id}`}>
                  {sampleCurriculums[course.id].map((module, idx) => (
                    <li key={idx}><span className="curriculum-dot"></span>{module}</li>
                  ))}
                </ul>
              )} */}

      {/* Student Reviews Section */}
      {/* <div className="reviews-section">
                <h4 className="reviews-title">Student Reviews</h4>
                <ul className="reviews-list">
                  {sampleReviews[course.id].map((review, idx) => (
                    <li key={idx} className="review-item">
                      <div className="review-header">
                        <span className="reviewer-name">{review.name}</span>
                        <span className="review-rating">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? 'star filled' : 'star'}>★</span>
                          ))}
                        </span>
                      </div>
                      <div className="review-text">{review.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* FAQ Section */}
      {/* <section className="faq-section">
    <h2 className="faq-title">Frequently Asked Questions</h2>
    <ul className="faq-list">
      <li>
        <button className="faq-question" aria-expanded="false">
          How do I enroll in a course?
        </button>
        <div className="faq-answer">Click the “Enroll Now” button on your chosen course card and follow the secure checkout process.</div>
      </li>
      <li>
        <button className="faq-question" aria-expanded="false">
          Are the courses self-paced?
        </button>
        <div className="faq-answer">Yes, you can learn at your own pace and revisit materials anytime with lifetime access.</div>
      </li>
      <li>
        <button className="faq-question" aria-expanded="false">
          Do I get a certificate?
        </button>
        <div className="faq-answer">All courses include a certificate of completion, which you can download and share.</div>
      </li>
      <li>
        <button className="faq-question" aria-expanded="false">
          Can I contact the instructor?
        </button>
        <div className="faq-answer">Yes, you can message instructors directly through the student portal for guidance and support.</div>
      </li>
    </ul>
  </section> */}

      {/* Sticky CTA */}
      {/* <div className="sticky-cta">
        <span>Ready to start your learning journey?</span>
        <button className="enroll-btn premium">Browse All Courses</button>
      </div> */}
    </div >
  );
}

export default Courses;
