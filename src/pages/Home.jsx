import './Home.css';
import { useEffect, useRef, useState } from 'react';
import usePageTitle from "../hooks/usePageTitle";
import './QuranLearning.css';
import childImage from '../assets/Screenshot__70_-removebg-preview.png';
import verticalUs from "../assets/verticalUs.png";
import sheikhZaid from "../assets/sheikhzaid.png";
import image2 from "../assets/image2.jpg";
import { FaRegEdit, FaClock, FaBookOpen } from "react-icons/fa";
import boy from "../assets/boy.jpg";
import sahada from "../assets/sahada.png";
import mosqueboy from "../assets/mosqueboy.jpg";
import mosqueboy2 from "../assets/mosqueboy2.jpg";


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
  // const slides = [
  //   {
  //     id: 1,
  //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500',
  //     title: 'Master Islamic Knowledge',
  //     description: 'Learn authentic teachings with certified instructors'
  //   },
  //   {
  //     id: 2,
  //     image: 'https://images.unsplash.com/photo-1516321318423-f06f70259471?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500',
  //     title: 'Transform Your Quranic Journey',
  //     description: 'Study Quran with proven methods that stick'
  //   },
  //   {
  //     id: 3,
  //     image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500',
  //     title: 'Learn from Expert Scholars',
  //     description: 'Get guidance from experienced Islamic educators'
  //   }
  // ];

  // const features = [
  //   {
  //     id: 1,
  //     icon: (
  //       <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <rect x="4" y="8" width="28" height="20" rx="4" fill="#1A9B8E" />
  //         <rect x="8" y="12" width="20" height="12" rx="2" fill="#F5F0E2" />
  //         <rect x="12" y="16" width="12" height="4" rx="1" fill="#C9A961" />
  //       </svg>
  //     ),
  //     title: 'Comprehensive Courses',
  //     description: 'In-depth courses covering Islamic studies, Quran, and Hadith'
  //   },
  //   {
  //     id: 2,
  //     icon: (
  //       <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <circle cx="18" cy="18" r="16" fill="#1A9B8E" />
  //         <rect x="10" y="22" width="16" height="4" rx="2" fill="#F5F0E2" />
  //         <rect x="14" y="10" width="8" height="8" rx="4" fill="#C9A961" />
  //       </svg>
  //     ),
  //     title: 'Live Classes',
  //     description: 'Interactive live sessions with qualified instructors'
  //   },
  //   {
  //     id: 3,
  //     icon: (
  //       <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <rect x="6" y="10" width="24" height="16" rx="4" fill="#1A9B8E" />
  //         <rect x="10" y="14" width="16" height="8" rx="2" fill="#F5F0E2" />
  //         <circle cx="18" cy="18" r="2" fill="#C9A961" />
  //       </svg>
  //     ),
  //     title: 'Flexible Schedule',
  //     description: 'Learn at your own pace with flexible scheduling options'
  //   },
  //   {
  //     id: 4,
  //     icon: (
  //       <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <circle cx="18" cy="18" r="16" fill="#C9A961" />
  //         <path d="M18 10L21.09 15.26L27 16.27L22.5 20.14L23.82 26.02L18 23.27L12.18 26.02L13.5 20.14L9 16.27L14.91 15.26L18 10Z" fill="#fff" />
  //       </svg>
  //     ),
  //     title: 'Certificates',
  //     description: 'Earn recognized certificates upon course completion'
  //   },
  //   {
  //     id: 5,
  //     icon: (
  //       <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <rect x="8" y="12" width="20" height="12" rx="4" fill="#1A9B8E" />
  //         <rect x="12" y="16" width="12" height="4" rx="2" fill="#F5F0E2" />
  //         <circle cx="18" cy="18" r="2" fill="#C9A961" />
  //       </svg>
  //     ),
  //     title: '24/7 Support',
  //     description: 'Round-the-clock support from our dedicated team'
  //   },
  //   {
  //     id: 6,
  //     icon: (
  //       <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <circle cx="18" cy="18" r="16" fill="#1A9B8E" />
  //         <rect x="10" y="14" width="16" height="8" rx="2" fill="#F5F0E2" />
  //         <rect x="14" y="18" width="8" height="4" rx="2" fill="#C9A961" />
  //       </svg>
  //     ),
  //     title: 'Community',
  //     description: 'Connect with students and scholars worldwide'
  //   }
  // ];

  // const trustBadges = [
  //   {
  //     id: 1,
  //     icon: '👥',
  //     label: '50K+ Students',
  //     description: 'Trusted by learners across 25+ countries',
  //     counter: 'students',
  //     target: 50000
  //   },
  //   {
  //     id: 2,
  //     icon: '�',
  //     label: '150+ Courses',
  //     description: 'Comprehensive Islamic education curriculum',
  //     counter: 'courses',
  //     target: 150
  //   },
  //   {
  //     id: 3,
  //     icon: '⏰',
  //     label: '15+ Years',
  //     description: 'Established leader in Islamic online education',
  //     counter: 'years',
  //     target: 15
  //   },
  //   {
  //     id: 4,
  //     icon: '⭐',
  //     label: '4.9★ Rating',
  //     description: 'Consistently rated excellent by students',
  //     counter: 'rating',
  //     target: 49
  //   }
  // ];

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: 'Fatima Al-Rashid',
  //     role: 'Medical Student',
  //     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
  //     rating: 5,
  //     quote: 'Al Noor Academy has transformed my understanding of Islamic principles. The instructors are knowledgeable and the community is incredibly supportive.'
  //   },
  //   {
  //     id: 2,
  //     name: 'Ahmed Hassan',
  //     role: 'Software Engineer',
  //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
  //     rating: 5,
  //     quote: 'Finally found a platform where I can learn Quran at my own pace without compromising quality. Highly recommended!'
  //   },
  //   {
  //     id: 3,
  //     name: 'Zainab Mohamed',
  //     role: 'Teacher',
  //     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
  //     rating: 5,
  //     quote: 'The structured courses and live sessions have helped me strengthen my Islamic knowledge. Worth every penny!'
  //   }
  // ];

  // const faqs = [
  //   {
  //     id: 1,
  //     question: 'How do I enroll in a course?',
  //     answer: 'Simply browse our courses, select the one you\'re interested in, and click "Enroll Now". You\'ll create an account and get instant access to course materials.'
  //   },
  //   {
  //     id: 2,
  //     question: 'Do you offer a free trial?',
  //     answer: 'Yes! We offer a 7-day free trial for most courses. You can explore the course structure and lessons before committing to enrollment.'
  //   },
  //   {
  //     id: 3,
  //     question: 'What is the schedule for live classes?',
  //     answer: 'Live classes are scheduled throughout the week at various times to accommodate different timezones. You can view the full schedule when you enroll.'
  //   },
  //   {
  //     id: 4,
  //     question: 'Will I receive a certificate?',
  //     answer: 'Yes, upon successful completion of any course, you\'ll receive a digital certificate that you can share with others.'
  //   },
  //   {
  //     id: 5,
  //     question: 'Is there support if I have questions?',
  //     answer: 'Absolutely! Our support team is available 24/7 via email and chat. You\'ll also have access to instructor office hours.'
  //   }
  // ];

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


      {/* pricing section */}

      <section className="pricing-section">
        <div className="pricing-header">
          <h2>Your Quran Journey<br />Starts here</h2>
        </div>

        <div className="pricing-grid">
          {/* Beginner */}
          <div className="price-card beginner">
            <h4>Beginner Basic</h4>
            <h3 className="rupya">$30 <span>/month</span></h3>
            <div className="price-inner">

              <ul>
                <li>2 Classes Per Week</li>
                <li>Personalized 1-on-1 Sessions</li>
                <li>Learn Quran Reading Basics</li>
                <li>Intro to Tajweed Rules</li>
                <li>Progress Tracking</li>
              </ul>
              <button>Enroll Now</button>
            </div>
          </div>

          {/* Intermediate */}
          <div className="price-card intermediate">
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

          {/* Tajweed */}
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
          </div>

          {/* Daily */}
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
      </section>

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

      {/* Simple Slider
      <div className="hero-section">
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide" style={{ animationDelay: `${index * 7.5}s` }}>
              <img src={slide.image} alt={slide.title} className="slide-image" />
              <div className="slide-content">
                <div className="slide-glass">
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                  <button className="hero-cta-button">Start Your Free Trial</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span key={index} className="dot"></span>
          ))}
        </div>
        <div className="scroll-indicator" aria-hidden="true">
          <span className="scroll-arrow"></span>
        </div>
      </div> */}

      {/* Featured Features Section */}
      {/* <section className="features-section" ref={featuresRef}>
        <div className="container">
          <h2 className="section-title">Why Al Noor Academy?</h2>
          <p className="section-subtitle">Everything you need to grow spiritually and intellectually</p>

          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <div className="section-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,90 L0,90 Z" fill="#F5F0E2" />
        </svg>
      </div> */}

      {/* Trust & Social Proof Section */}
      {/* <section className="trust-section" ref={trustRef}>
        <div className="container">
          <h2 className="trust-title">Why Trust Al Noor Academy?</h2>
          <div className="trust-grid">
            {trustBadges.map((badge) => (
              <div
                key={badge.id}
                className="trust-badge"
                data-counter={badge.counter}
                data-target={badge.target}
              >
                <div className="badge-icon">{badge.icon}</div>
                <h3 className="badge-label">
                  <span className="counter-value">0</span>{badge.counter === 'rating' ? '★' : badge.counter === 'students' ? 'K+' : badge.counter === 'courses' ? '+' : ''}
                </h3>
                <p className="badge-description">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider section-divider--small" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#F5F0E2" />
        </svg>
      </div> */}

      {/* <div className="section-divider" aria-hidden="true"></div> */}

      {/* Testimonials Section */}
      {/* <section className="testimonials-section" ref={testimonialRef}>
        <div className="container">
          <h2 className="section-title">Student Success Stories</h2>
          <p className="section-subtitle">Join thousands of satisfied learners from around the world</p>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.id} className="testimonial-card" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="testimonial-header">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <span className="verified-badge" title="Verified Student">✔ Verified Student</span>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <div className="testimonial-stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <div className="section-divider section-divider--small" aria-hidden="true"></div> */}

      {/* FAQ Section */}
      {/* <section className="faq-section" ref={faqRef}>
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions about enrollment and our courses</p>

          <div className="faq-container">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-question ${activeFaq === faq.id ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  aria-expanded={activeFaq === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="faq-icon-svg" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="11" fill="#1A9B8E" />
                      <path d="M11 6v10M6 11h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="faq-title">{faq.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                {activeFaq === faq.id && (
                  <div className="faq-answer" id={`faq-answer-${faq.id}`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider section-divider--small" aria-hidden="true"></div> */}

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
