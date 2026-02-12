import '../styles/shared.css';  /* Shared styles: .container, .section-title, .btn-primary */
import './Home.css';             /* Page-specific: .home, .hero-section, .features-section, .feature-card */
import { useEffect, useRef, useState } from 'react';
import usePageTitle from "../hooks/usePageTitle";
import './QuranLearning.css';    /* CTA section styles */
import childImage from '../assets/Screenshot__70_-removebg-preview.png';
import verticalUs from "../assets/verticalUs.png";
import sheikhZaid from "../assets/sheikhzaid.png";
import image2 from "../assets/image2.jpg";
import { FaRegEdit, FaClock, FaBookOpen } from "react-icons/fa";
import boy from "../assets/boy.jpg";
import sahada from "../assets/sahada.png";
import mosqueboy from "../assets/mosqueboy.jpg";
import mosqueboy2 from "../assets/mosqueboy2.jpg";
import CourseShowcase from "../components/CourseShowcase";


function Home() {
  usePageTitle("Home");
  const featuresRef = useRef(null);
  const trustRef = useRef(null);
  const testimonialRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const [counters, setCounters] = useState({ students: 0, years: 0, courses: 0, rating: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    // Counter animation function
    const animateCounter = (element) => {
      const counterType = element.dataset.counter;
      const target = parseInt(element.dataset.target, 10);
      let current = 0;
      const increment = Math.ceil(target / 60); // Animate over ~1 second (60 frames)
      const counterElement = element.querySelector('.counter-value');

      if (!counterElement) return;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        counterElement.textContent = current.toLocaleString();
      }, 16); // ~60fps
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Trigger counter animation if it's a trust badge
          if (entry.target.classList.contains('trust-badge')) {
            animateCounter(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe feature cards
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll('.feature-card');
      cards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
        observer.observe(card);

        // Add tilt/parallax interaction on pointer: fine devices
        if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
          const handlers = {};
          let ticking = false;
          const maxDeg = 6; // max rotation degrees

          handlers.mousemove = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            if (!ticking) {
              window.requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const relX = clientX - (rect.left + rect.width / 2);
                const relY = clientY - (rect.top + rect.height / 2);
                const rotateY = (relX / (rect.width / 2)) * maxDeg;
                const rotateX = -(relY / (rect.height / 2)) * maxDeg;
                card.style.setProperty('--card-rotateX', `${rotateX}deg`);
                card.style.setProperty('--card-rotateY', `${rotateY}deg`);
                card.style.setProperty('--card-scale', '1.02');
                ticking = false;
              });
              ticking = true;
            }
          };

          handlers.mouseleave = () => {
            card.style.setProperty('--card-rotateX', `0deg`);
            card.style.setProperty('--card-rotateY', `0deg`);
            card.style.setProperty('--card-scale', `1`);
          };

          card.addEventListener('mousemove', handlers.mousemove);
          card.addEventListener('mouseleave', handlers.mouseleave);

          // Save handlers for cleanup later
          card.__tiltHandlers = handlers;
        }
      });
    }

    // Observe Trust section
    if (trustRef.current) {
      const badges = trustRef.current.querySelectorAll('.trust-badge');
      badges.forEach((badge, index) => {
        badge.style.setProperty('--badge-delay', `${index * 0.15}s`);
        observer.observe(badge);
      });
    }

    // Observe Testimonials section
    if (testimonialRef.current) {
      const cards = testimonialRef.current.querySelectorAll('.testimonial-card');
      cards.forEach((card, index) => {
        card.style.setProperty('--badge-delay', `${index * 0.15}s`);
        observer.observe(card);
      });
    }

    // Observe CTA section
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      // cleanup observer and event listeners
      observer.disconnect();
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        cards.forEach((card) => {
          if (card.__tiltHandlers) {
            card.removeEventListener('mousemove', card.__tiltHandlers.mousemove);
            card.removeEventListener('mouseleave', card.__tiltHandlers.mouseleave);
            delete card.__tiltHandlers;
          }
        });
      }
    };
  }, []);

  return (
    <div className="home">
      {/* // Quran Learning Section */}
      <div className='header'>
        QURAN LEARNING
      </div>
      <div className="quran-section">
        <div className="content-wrapper">
          {/* Main content div */}
          <div className="content-box">
            <div className="left-content">

              <div className="description">
                <p>
                  Master Quran reading and recitation with structured online lessons taught
                  by certified instructors. Whether for kids or adults, our easy learning path
                  makes studying the Quran simple, flexible, and effective.
                </p>

                <div className="cta-buttons">
                  <button className="btn-primary">Register Now</button>
                  <button className="btn-secondary">Get Free Trial</button>
                </div>
              </div>
            </div>

            {/* Child image on the right */}
            <div className="right-content">
              <img
                src={childImage}
                alt="Child learning Quran"
                className="child-image"
              />
            </div>

            {/* Course tags at bottom right */}
            <div className="course-tags">
              <span className="tag tag-dark">Tajweed</span>
              <span className="tag tag-light">Quran Reading</span>
              <span className="tag tag-light">Tafseer</span>
              <span className="tag tag-dark">Quran Recitation</span>
              <span className="tag tag-light">Noorani Qaida</span>
              <span className="tag tag-light">Arabic Basics</span>
              <span className="tag tag-dark">Hifz (Memorization)</span>
            </div>
          </div>
        </div>
      </div>

      {/* hadith section */}
      <section className="hadith-wrapper">
        <div className="hadith-box">
          <p className="hadith-text">
            “Recite the Quran, for on the Day of Resurrection it will come as an
            intercessor for its reciters.”
          </p>

          <span className="hadith-source">(Sahih Muslim)</span>
        </div>
      </section>
      

      {/* TLW Hero Section */}

      <section className="tlwHero__wrapper">
        <div className="tlwHero__container">

          {/* Left Content */}
          <div className="tlwHero__content">
            <h1 className="tlwHero__title">
              Dedicated to Teaching <br /> the Words of Allah
            </h1>

            <p className="tlwHero__description">
              Learn the Holy Quran with expert teachers using authentic
              methods of Tajweed and Tilawah. Join thousands of students
              learning online from anywhere in the world.
            </p>

            <button className="tlwHero__button">
              Get Started
            </button>
          </div>

          {/* Right Images */}
          <div className="tlwHero__images">
            <div className="tlwHero__imageLarge">
              <img src={verticalUs} alt="Quran Teaching" />
            </div>

            <div className="tlwHero__imageStack">
              <img src={sheikhZaid} alt="Online Quran Class" />
              <img src={image2} alt="Quran Recitation" />
            </div>
          </div>

        </div>
      </section>

      {/* tilawah section */}

      <section className="info-section">
        <div className="info-container">
          <div className="info-left">
            <h2>
              Learn Quran the Right Way
              <br />
              with Tilawah Quran
            </h2>

            <p>
              With a focus on Tajweed, proper pronunciation, and Quran recitation,
              our experienced teachers will guide you at your own pace. Experience
              personalized, one-on-one online Quran lessons that help you learn to
              recite beautifully and accurately.
            </p>

            <button className="info-btn">Get Started</button>
          </div>

          <div className="info-right">
            <div className="tilawah-card f98">
              <h3>98%</h3>
              <p>Student Satisfaction Rate</p>
            </div>

            <div className="tilawah-card f50000">
              <h3>50,000+</h3>
              <p>Students Taught</p>
            </div>

            <div className="tilawah-card f5plusYears wide">
              <h3>5+ Years</h3>
              <p>
                Qualified & Experienced Instructors of Excellence in Online Quran
                Education
              </p>
            </div>
          </div>
        </div>
      </section>


      <CourseShowcase />


      {/* pricing section

      <section className="pricing-section">
        <div className="pricing-header">
          <h2>Your Quran Journey<br />Starts here</h2>
        </div>

        <div className="pricing-grid">
          {/* Beginner */}  {/*
          <div className="price-card beginner">
            <h4>Beginner Basic</h4>
            <h3 className="rupya">$30 <span>/month</span></h3>
            <div className="price-inner"> */}

              {/* <ul>
                <li>2 Classes Per Week</li>
                <li>Personalized 1-on-1 Sessions</li>
                <li>Learn Quran Reading Basics</li>
                <li>Intro to Tajweed Rules</li>
                <li>Progress Tracking</li>
              </ul>
              <button>Enroll Now</button>
            </div>
          </div> */}

          {/* Intermediate */}
          {/* <div className="price-card intermediate">
            <h4>Intermediate Pro</h4>
            <h3 className='rupya'>$45 <span>/month</span></h3>
            <div className="price-inner">

              <ul>
                <li>3 Classes Per Week</li>
                <li>Experienced Quran Instructors</li>
                <li>In-depth Tajweed Lessons</li>
                <li>Tajweed Practice & Recitation</li>
                <li>Continuous Progress Monitoring</li>
              </ul>
              <button>Enroll Now</button>
            </div>
          </div>

          {/* Tajweed */}  {/*
          <div className="price-card advanced">
            <h4>Tajweed Master</h4>
            <h3 className="rupya">$60 <span>/month</span></h3>
            <div className="price-inner">

              <ul>
                <li>4 Classes Per Week</li>
                <li>Advanced Tajweed Techniques</li>
                <li>Correction in Recitation</li>
                <li>Focused Memorization Guidance</li>
                <li>Weekly Practice & Revisions</li>
              </ul>
              <button>Enroll Now</button>
            </div>
          </div> */}

          {/* Daily */} {/*
          <div className="price-card daily">
            <h4>Daily Class</h4>
            <h3 className="rupya">$75 <span>/month</span></h3>
            <div className="price-inner">

              <ul>
                <li>Daily Quran Classes</li>
                <li>Dedicated Personal Instructor</li>
                <li>Advanced Tajweed & Fluency</li>
                <li>Regular Revision & Assessment</li>
                <li>Complete Learning Guidance</li>
              </ul>
              <button>Enroll Now</button>
            </div>
          </div>
        </div>
      </section> */}

      {/* 3 Steps Section */}
      <section className="journey-section">
        <h2 className="journey-title">
          Start Your Quran Journey in 3 Easy Steps
        </h2>

        <div className="journey-cards">
          {/* Step 1 */}
          <div className="journey-card">
            <div className="icon-wrapper">
              <FaRegEdit />
            </div>
            <h3>Fill The Contact Form</h3>
            <p>
              Let us know your learning goals and preferred schedule by filling
              out our simple contact form.
            </p>
            <button className="journey-btn">Enroll Now</button>
          </div>

          {/* Step 2 */}
          <div className="journey-card">
            <div className="icon-wrapper">
              <FaClock />
            </div>
            <h3>Pick a Time for Free Trial</h3>
            <p>
              Choose a convenient time for your free trial class and get matched
              with a qualified Quran instructor.
            </p>
            <button className="journey-btn">Enroll Now</button>
          </div>

          {/* Step 3 */}
          <div className="journey-card">
            <div className="icon-wrapper">
              <FaBookOpen />
            </div>
            <h3>Begin with the Quran Today</h3>
            <p>
              Start your Quran learning journey with expert instructors and
              structured lessons from day one.
            </p>
            <button className="journey-btn">Enroll Now</button>
          </div>
        </div>
      </section>


      {/* big card cta section */}
      <section className="cta-section">
        <div className="cta-box" style={{ backgroundImage: `url(${boy})` }} ref={ctaRef}>
          <div className="cta-text">
            <span className="cta-badge">ONLINE QURAN CLASSES</span>

            <h2>
              Learn Quran Online <br />
              With Qualified Teachers
            </h2>

            <p>
              Start your Quran learning journey with experienced tutors,
              flexible schedules, and a structured curriculum designed for
              children and adults.
            </p>

            <div className="cta-actions">
              <button className="primary-btn">Book Free Trial</button>
              <button className="secondary-btn">Contact Us</button>
            </div>
          </div>
        </div>
      </section>


      {/* Articles Section */}
       <section className="articles-section">
      <h2 className="articles-title">
         Guidance and Reflections
      </h2>

      <div className="articles-grid">
        {/* Card 1 */}
        <div className="article-card">
          <img src={sahada} alt="Shahadah" />
          <div className="article-content">
            <h3>First Pillar of Islam: Shahadah</h3>
            <p>
              Explore the importance of the Shahadah, its meaning, and
              its significance in the life of every Muslim.
            </p>
            <button className="read-btn">Read More</button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="article-card">
          <img src={mosqueboy} alt="Learning Quran" />
          <div className="article-content">
            <h3>Best Age to Start Learning Quran</h3>
            <p>
              Discover the convenient time for your child to begin
              Quran learning with effective guidance.
            </p>
            <button className="read-btn">Read More</button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="article-card">
          <img src={mosqueboy2} alt="Norani Qaida" />
          <div className="article-content">
            <h3>How to Teach Norani Qaida</h3>
            <p>
              Learn simple teaching methods to help children read the
              Quran fluently and with confidence.
            </p>
            <button className="read-btn">Read More</button>
          </div>
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-content">
          <h2>Ready to Start Your Islamic Learning Path?</h2>
          <p>Join thousands of students transforming their faith and knowledge every month</p>
          <button className=" btn-primary cta-button">Start Your Free Trial</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
