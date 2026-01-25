import React from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from "../hooks/usePageTitle";
import './About.css';
import boy from '../assets/boy.jpg';
import femaleteacher from '../assets/femaleteacher.png';
import ustadh from '../assets/ustadh.png';

function About() {
  usePageTitle("About Us - Al Noor Academy");

  // Our Huffaz (those who memorized the Quran)
  const huffazData = [
    {
      id: 1,
      name: 'Sheikh Zaid',
      title: 'Head of Hifz Department',
      memorizedAge: 15,
      yearsTeaching: 15,
      students: 500,
      image: ustadh,
      quote: 'The Quran is a light that never dims.'
    },
    {
      id: 2,
      name: 'Ustadh Suleiman',
      title: 'Senior Quran Instructor',
      memorizedAge: 14,
      yearsTeaching: 12,
      students: 350,
      image: ustadh,
      quote: 'Every verse memorized is a seed of paradise planted.'
    },
    {
      id: 3,
      name: 'Hafiz Omar Abdullah',
      title: 'Tajweed Specialist',
      memorizedAge: 10,
      yearsTeaching: 18,
      students: 620,
      image: ustadh,
      quote: 'Teaching Quran is the noblest of professions.'
    },
    {
      id: 4,
      name: 'Sheikh Ibrahim Hassan',
      title: 'Ijazah Certified Teacher',
      memorizedAge: 11,
      yearsTeaching: 20,
      students: 800,
      image: ustadh,
      quote: 'The best among you are those who learn and teach the Quran.'
    },
    {
      id: 5,
      name: 'Ustadha Mujahidha',
      title: 'Female Instructor Lead',
      memorizedAge: 13,
      yearsTeaching: 10,
      students: 400,
      image: femaleteacher,
      quote: 'Empowering sisters through the light of Quran.'
    },
    {
      id: 6,
      name: 'Hafiz Bilal Ahmed',
      title: 'Youth Program Director',
      memorizedAge: 9,
      yearsTeaching: 8,
      students: 280,
      image: ustadh,
      quote: 'Young hearts are the purest vessels for divine words.'
    }
  ];

  // Core values
  const coreValues = [
    {
      icon: 'fas fa-book-quran',
      title: 'Authentic Teaching',
      description: 'Our curriculum is based on traditional Islamic scholarship, ensuring authentic transmission of Quranic knowledge.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Nurturing Hearts',
      description: 'We believe in touching hearts before minds, creating a love for the Quran that lasts a lifetime.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community',
      description: 'Building a global community of learners united by their love for the Holy Quran.'
    },
    {
      icon: 'fas fa-award',
      title: 'Excellence',
      description: 'Striving for excellence in every recitation, every lesson, and every interaction.'
    }
  ];

  // Timeline milestones
  const milestones = [
    { year: '2015', title: 'Foundation', description: 'Al-Noor Academy was established with a vision to spread Quranic education globally.' },
    { year: '2017', title: 'First 1000 Students', description: 'Reached our first milestone of teaching 1000 students from 20+ countries.' },
    { year: '2019', title: 'Ijazah Program', description: 'Launched our prestigious Ijazah certification program with certified scholars.' },
    { year: '2021', title: 'Global Expansion', description: 'Expanded to serve students in over 50 countries with 100+ qualified teachers.' },
    { year: '2024', title: '50,000+ Students', description: 'Celebrated teaching over 50,000 students worldwide, Alhamdulillah.' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1600&fit=crop&q=80" alt="Mosque Background" />
        </div>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <div className="hero-badge">
            <i className="fas fa-star"></i>
            <span>Enlightening Hearts Since 2015</span>
          </div>
          <h1 className="about-hero-title">
            <span className="title-arabic">النور</span>
            <span className="title-main">Al-Noor Academy</span>
            <span className="title-tagline">Where Light Meets Learning</span>
          </h1>
          <p className="about-hero-subtitle">
            "Al-Noor" — The Light — illuminating hearts and minds through the blessed words of the Holy Quran. 
            We are dedicated to spreading the divine light of Quranic knowledge to every corner of the world.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">Students Worldwide</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Certified Teachers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries Reached</span>
            </div>
          </div>
          <div className="hero-cta">
            <Link to="/signup" className="btn-primary-about">
              <i className="fas fa-rocket"></i>
              Begin Your Journey
            </Link>
            <Link to="/courses" className="btn-secondary-about">
              <i className="fas fa-play-circle"></i>
              Explore Courses
            </Link>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="lantern lantern-1">🏮</div>
          <div className="lantern lantern-2">🏮</div>
          <div className="star star-1">✨</div>
          <div className="star star-2">✨</div>
          <div className="star star-3">✨</div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section">
        <div className="about-container">
          <div className="mission-grid">
            <div className="mission-content">
              <span className="section-badge">Our Purpose</span>
              <h2 className="section-title">Illuminating the Path to Divine Knowledge</h2>
              <p className="mission-text">
                At Al-Noor Academy, we believe that the Quran is the ultimate source of light (Noor) 
                that guides humanity. Our mission is to make this divine light accessible to every 
                Muslim, regardless of their location, age, or background.
              </p>
              <p className="mission-text">
                Founded on the principles of authentic Islamic scholarship, we combine traditional 
                teaching methods with modern technology to deliver an unparalleled Quranic education 
                experience.
              </p>
              <div className="mission-features">
                <div className="mission-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>One-on-one personalized sessions</span>
                </div>
                <div className="mission-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Ijazah-certified instructors</span>
                </div>
                <div className="mission-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Flexible scheduling for all time zones</span>
                </div>
                <div className="mission-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Progress tracking & assessments</span>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-frame">
                <img 
                  src={boy}
                  alt="Quran Learning" 
                />
                <div className="image-accent"></div>
              </div>
              <div className="floating-card">
                <div className="floating-icon">
                  <i className="fas fa-mosque"></i>
                </div>
                <div className="floating-text">
                  <span className="floating-number">9+</span>
                  <span className="floating-label">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quran Quote Section */}
      <section className="quote-section-about">
        <div className="about-container">
          <div className="quote-card-about">
            <div className="quote-decoration left">❝</div>
            <div className="quote-content-about">
              <p className="arabic-quote">
                اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ
              </p>
              <p className="quote-translation">
                "Allah is the Light of the heavens and the earth."
              </p>
              <p className="quote-reference">— Surah An-Nur (24:35)</p>
            </div>
            <div className="quote-decoration right">❞</div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <div className="about-container">
          <div className="section-header">
            <span className="section-badge">Our Foundation</span>
            <h2 className="section-title">Core Values That Guide Us</h2>
            <p className="section-subtitle">
              Every aspect of Al-Noor Academy is built upon these fundamental principles
            </p>
          </div>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Huffaz Section */}
      <section className="huffaz-section">
        <div className="about-container">
          <div className="section-header">
            <span className="section-badge">Our Pride</span>
            <h2 className="section-title">Meet Our Esteemed Huffaz</h2>
            <p className="section-subtitle">
              Our teachers are not just instructors — they are bearers of divine light, 
              having memorized the entire Holy Quran and dedicated their lives to teaching it.
            </p>
          </div>
          <div className="huffaz-grid">
            {huffazData.map((hafiz) => (
              <div className="hafiz-card" key={hafiz.id}>
                <div className="hafiz-image-wrapper">
                  <img src={hafiz.image} alt={hafiz.name} />
                  <div className="hafiz-badge">
                    <i className="fas fa-star"></i>
                    <span>Hafiz</span>
                  </div>
                </div>
                <div className="hafiz-info">
                  <h3>{hafiz.name}</h3>
                  <p className="hafiz-title">{hafiz.title}</p>
                  <p className="hafiz-quote">"{hafiz.quote}"</p>
                  <div className="hafiz-stats">
                    <div className="hafiz-stat">
                      <i className="fas fa-book-open"></i>
                      <span>Memorized at age {hafiz.memorizedAge}</span>
                    </div>
                    <div className="hafiz-stat">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>{hafiz.yearsTeaching} years teaching</span>
                    </div>
                    <div className="hafiz-stat">
                      <i className="fas fa-user-graduate"></i>
                      <span>{hafiz.students}+ students taught</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="timeline-section">
        <div className="about-container">
          <div className="section-header">
            <span className="section-badge">Our Story</span>
            <h2 className="section-title">The Journey of Light</h2>
            <p className="section-subtitle">
              From humble beginnings to a global institution — our path of spreading Quranic knowledge
            </p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
                <div className="timeline-marker">
                  <i className="fas fa-star"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section">
        <div className="about-container">
          <div className="why-grid">
            <div className="why-content">
              <span className="section-badge">Why Al-Noor?</span>
              <h2 className="section-title">The Light That Makes a Difference</h2>
              <div className="why-list">
                <div className="why-item">
                  <div className="why-icon">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <div className="why-text">
                    <h4>Ijazah Certified Teachers</h4>
                    <p>All our instructors hold authentic chains of transmission (Ijazah) back to the Prophet ﷺ</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="why-text">
                    <h4>Global Accessibility</h4>
                    <p>Learn from anywhere in the world with our flexible online platform</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-icon">
                    <i className="fas fa-child"></i>
                  </div>
                  <div className="why-text">
                    <h4>All Ages Welcome</h4>
                    <p>Specialized programs for children, teens, adults, and seniors</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-icon">
                    <i className="fas fa-venus-mars"></i>
                  </div>
                  <div className="why-text">
                    <h4>Male & Female Teachers</h4>
                    <p>Choose your preferred instructor gender for comfortable learning</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-image">
              <img 
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&fit=crop&q=80" 
                alt="Quran Study" 
              />
              <div className="experience-badge">
                <span className="exp-number">98%</span>
                <span className="exp-text">Student Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="about-container">
          <div className="section-header light">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title">Voices of Our Students</h2>
            <p className="section-subtitle">
              Hear from those whose lives have been transformed by the light of Quran
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "Al-Noor Academy has been a blessing for our family. My children have memorized 
                5 Juz in just one year, and their love for Quran has grown immensely."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80" 
                  alt="Sarah Ahmed" 
                />
                <div>
                  <h4>Sarah Ahmed</h4>
                  <p>Parent from USA</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card featured">
              <div className="testimonial-quote">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "I completed my Hifz with Al-Noor Academy at the age of 45. The teachers were 
                patient, encouraging, and truly dedicated. It's never too late to start!"
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80" 
                  alt="Abdullah Khan" 
                />
                <div>
                  <h4>Abdullah Khan</h4>
                  <p>Student from UK</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "The Tajweed course transformed my recitation completely. The instructors are 
                incredibly knowledgeable and the personalized attention is unmatched."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80" 
                  alt="Amina Hassan" 
                />
                <div>
                  <h4>Amina Hassan</h4>
                  <p>Student from Canada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-about">
        <div className="cta-bg-about">
          <img src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&fit=crop&q=80" alt="CTA Background" />
        </div>
        <div className="cta-overlay-about"></div>
        <div className="about-container">
          <div className="cta-content-about">
            <h2>Begin Your Journey with the Light of Quran</h2>
            <p>
              Join thousands of students worldwide who have transformed their lives through 
              the blessed words of Allah. Your first step towards illumination starts here.
            </p>
            <div className="cta-buttons-about">
              <Link to="/signup" className="btn-cta-primary">
                <i className="fas fa-graduation-cap"></i>
                Start Free Trial
              </Link>
              <Link to="/contact" className="btn-cta-secondary">
                <i className="fas fa-phone-alt"></i>
                Contact Us
              </Link>
            </div>
            <div className="cta-features-about">
              <span><i className="fas fa-check"></i> No Credit Card Required</span>
              <span><i className="fas fa-check"></i> 7-Day Free Trial</span>
              <span><i className="fas fa-check"></i> Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
