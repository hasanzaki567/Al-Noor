import React from 'react';
import usePageTitle from "../hooks/usePageTitle";

function About() {
  usePageTitle("About Us - Al Noor Academy");

  return (
    <div className="about-redesign-container">
      <style>
        {`
          /* --- Internal Scoped Styles for About Page Re-design --- */
          .about-redesign-container {
            font-family: 'Poppins', sans-serif;
            color: #333;
            background-color: #FFFBF5;
            overflow-x: hidden;
            width: 100%;
          }

          /* General Resets for this container */
          .about-redesign-container h1, 
          .about-redesign-container h2, 
          .about-redesign-container h3, 
          .about-redesign-container p, 
          .about-redesign-container ul, 
          .about-redesign-container li {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .about-section-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* --- Hero Section --- */
          .hero-section {
            background-color: #FFFBF5;
            padding: 60px 0;
            text-align: center;
          }

          .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            color: #4A1D1F;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .hero-content {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: #F4D0D2;
            border-radius: 30px;
            padding: 40px;
            margin-top: 40px;
            min-height: 400px;
            overflow: hidden;
          }

          .hero-image-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
          }
           
          .hero-girl-img {
             max-height: 450px;
             object-fit: contain;
          }

          .hero-left-text {
             position: absolute;
             left: 50px;
             top: 50%;
             transform: translateY(-50%);
             max-width: 250px;
             text-align: left;
             z-index: 20;
          }

          .hero-tags {
             position: absolute;
             right: 50px;
             top: 50%;
             transform: translateY(-50%);
             display: flex;
             flex-direction: column;
             gap: 15px;
             z-index: 20;
          }

          .tag-pill {
            background: white;
            padding: 10px 25px;
            border-radius: 50px;
            font-weight: 600;
            color: #333;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            text-align: center;
          }
          
          .tag-pill.dark {
            background: #2D3748;
            color: white;
          }
          
          .register-btn {
            background: #111827;
            color: white;
            padding: 12px 30px;
            border-radius: 8px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            margin-top: 20px;
          }

          /* --- Quote Section --- */
          .quote-section {
             text-align: center;
             padding: 80px 20px;
             background: white;
          }
          
          .quote-text {
            font-size: 1.4rem;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
            font-style: italic;
          }
          
          .quote-author {
             margin-top: 15px;
             font-size: 0.9rem;
             color: #666;
          }

          /* --- Dedicated Section --- */
          .dedicated-section {
            padding: 60px 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
          }

          .dedicated-content h2 {
            font-size: 2.5rem;
            color: #1F2937;
            margin-bottom: 20px;
            font-weight: 800;
            line-height: 1.2;
          }

          .dedicated-content p {
            font-size: 1rem;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.7;
          }

          .dedicated-images {
             display: grid;
             grid-template-columns: 1.2fr 0.8fr;
             grid-template-rows: 1fr 1fr;
             gap: 15px;
             height: 400px;
          }

          .d-img {
            border-radius: 20px;
            overflow: hidden;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .d-img-1 { grid-row: 1 / -1; } /* Tall image */
          
          .get-started-btn {
             background: #2DD4BF;
             color: white;
             padding: 12px 35px;
             border-radius: 6px;
             border: none;
             font-weight: 700;
             cursor: pointer;
          }

          /* --- Stats Section --- */
          .stats-section {
            padding: 60px 0;
            background: #FFFBF5;
          }
          
          .stats-grid-container {
             display: grid;
             grid-template-columns: 1fr 1.5fr;
             gap: 30px;
          }

          .left-stat-box {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }

          .stat-card-custom {
             padding: 40px;
             border-radius: 20px;
             position: relative;
          }

          .stat-card-purple {
            background-color: #A78BFA;
            color: white;
          }
          
          .stat-card-beige {
            background-color: #FDE68A;
            color: #333;
          }

          .stat-percent {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 5px;
          }
          
          .right-promo-box {
            background: #EADBC0;
            border-radius: 20px;
            padding: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .promo-title {
             font-size: 2.2rem;
             font-weight: 800;
             margin-bottom: 20px;
             line-height: 1.3;
             color: #1F2937;
          }
          
          .promo-btn {
             background: #111827;
             color: white;
             width: fit-content;
             padding: 12px 30px;
             border-radius: 6px;
             font-weight: 600;
             cursor: pointer;
          }

          /* --- Pricing Section --- */
          .pricing-section {
             padding: 80px 0;
             text-align: center;
          }
          
          .pricing-title {
             font-size: 2.5rem;
             color: #1F2937;
             font-weight: 800;
             margin-bottom: 50px;
          }

          .pricing-grid {
             display: grid;
             grid-template-columns: repeat(4, 1fr);
             gap: 20px;
             text-align: left;
          }

          .price-card {
             padding: 30px;
             border-radius: 20px;
             position: relative;
          }

          .price-card.purple-light { background: #E9D5FF; }
          .price-card.orange-light { background: #FFEDD5; }
          .price-card.purple-dark { background: #DDD6FE; }
          .price-card.green-light { background: #D1FAE5; }

          .price-header {
             display: flex;
             justify-content: space-between;
             align-items: baseline;
             margin-bottom: 20px;
          }

          .plan-name { font-weight: 700; font-size: 1.1rem; color: #333; }
          .plan-price { font-size: 1.8rem; font-weight: 800; color: #1F2937;}
          .plan-period { font-size: 0.8rem; color: #666; }

          .plan-features {
             margin-bottom: 25px;
          }
          
          .plan-features li {
             font-size: 0.9rem;
             margin-bottom: 12px;
             position: relative;
             padding-left: 20px;
             color: #4B5563;
          }
          
          .plan-features li:before {
             content: "✓";
             position: absolute;
             left: 0;
             color: #333;
             font-weight: bold;
          }

          .enroll-card-btn {
             width: 100%;
             padding: 12px;
             border-radius: 8px;
             border: none;
             font-weight: 700;
             cursor: pointer;
             background: #1F2937;
             color: white;
             text-align: center;
          }

          /* --- Steps Section --- */
          .steps-section {
             padding: 60px 0;
             text-align: center;
          }

          .steps-title {
             font-size: 2rem;
             font-weight: 800;
             margin-bottom: 50px;
             color: #1F2937;
          }

          .steps-grid {
             display: grid;
             grid-template-columns: repeat(3, 1fr);
             gap: 30px;
          }

          .step-card {
             background: white;
             padding: 40px 20px;
             border-radius: 15px;
             box-shadow: 0 10px 30px rgba(0,0,0,0.05);
             display: flex;
             flex-direction: column;
             align-items: center;
          }

          .step-icon-circle {
             width: 60px;
             height: 60px;
             background: #FDF2F8; /* Pink/purple tint */
             border-radius: 12px;
             display: flex;
             align-items: center;
             justify-content: center;
             font-size: 1.5rem;
             margin-bottom: 20px;
             color: #DB2777;
          }

          .step-card h3 {
             font-size: 1.2rem;
             margin-bottom: 10px;
             font-weight: 700;
             color: #1F2937;
          }
          
          .step-card p {
             font-size: 0.9rem;
             color: #6B7280;
             line-height: 1.5;
          }
          
          .step-action-btn {
             margin-top: 20px;
             background: #1F2937;
             color: white; /* was black in image but better contrast */
             padding: 8px 25px;
             border-radius: 6px;
             font-size: 0.85rem;
             font-weight: 600;
             border: none;
             cursor: pointer;
          }

          /* --- Bottom CTA --- */
          .bottom-cta-section {
             position: relative;
             height: 400px;
             margin: 60px 0;
             border-radius: 20px;
             overflow: hidden;
             display: flex;
             align-items: center;
             padding: 0 60px;
          }
          
          .cta-bg-image {
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             object-fit: cover;
             z-index: 1;
             filter: brightness(0.4);
          }
          
          .cta-content {
             position: relative;
             z-index: 2;
             color: white;
             max-width: 600px;
          }

          .cta-content h2 {
             font-size: 3rem;
             font-weight: 800;
             margin-bottom: 15px;
             line-height: 1.1;
          }

          .cta-content p {
             font-size: 1.1rem;
             margin-bottom: 30px;
             opacity: 0.9;
          }

          .cta-buttons {
             display: flex;
             gap: 15px;
          }

          .btn-white {
             background: white;
             color: #333;
             padding: 12px 30px;
             border-radius: 6px;
             font-weight: 700;
             border: none;
             cursor: pointer;
          }
           
           .btn-outline {
             border: 2px solid white;
             color: white;
             background: transparent;
             padding: 12px 30px;
             border-radius: 6px;
             font-weight: 700;
             cursor: pointer;
           }

          /* --- Blog Section --- */
          .blog-section {
             padding: 60px 0;
             background: white;
             text-align: center;
          }

          .blog-title {
             font-size: 2rem;
             margin-bottom: 40px;
             font-weight: 800;
             color: #1F2937;
          }

          .blog-grid {
             display: grid;
             grid-template-columns: repeat(3, 1fr);
             gap: 30px;
          }

          .blog-card {
             background: white;
             border-radius: 15px;
             overflow: hidden;
             box-shadow: 0 4px 20px rgba(0,0,0,0.06);
             text-align: left;
             border: 1px solid #f0f0f0;
          }

          .blog-img {
             width: 100%;
             height: 200px;
             object-fit: cover;
          }

          .blog-info {
             padding: 20px;
          }

          .blog-info h3 {
             font-size: 1.1rem;
             margin-bottom: 10px;
             font-weight: 700;
             color: #1F2937;
          }
          
          .blog-info p {
             font-size: 0.9rem;
             color: #6B7280;
             margin-bottom: 15px;
          }

          .read-more-btn {
             background: #1F2937;
             color: white;
             border: none;
             padding: 8px 20px;
             border-radius: 4px;
             font-size: 0.8rem;
             font-weight: 600;
             cursor: pointer;
          }

          /* Responsive adjustments */
          @media (max-width: 900px) {
            .hero-content { flex-direction: column; height: auto; text-align: center;}
            .hero-left-text, .hero-tags { position: relative; left: auto; right: auto; top: auto; transform: none; margin: 20px 0; }
            .hero-image-container { position: relative; left: auto; transform: none; }
            .dedicated-section { grid-template-columns: 1fr; }
            .stats-grid-container { grid-template-columns: 1fr; }
            .pricing-grid { grid-template-columns: 1fr 1fr; }
            .steps-grid { grid-template-columns: 1fr; }
            .blog-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="about-section-wrapper">
          <h1 className="hero-title">QURAN LEARNING</h1>

          <div className="hero-content">
            <div className="hero-left-text">
              <p>Master Quran reading, tajweed, and memorization with our expert guidance.</p>
              <button className="register-btn">Register Now</button>
            </div>

            <div className="hero-image-container">
              {/* 
                  Using a placeholder image that resembles a child/student.
                  In production, replacing this with the actual asset is recommended.
               */}
              <img
                src="https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=600&auto=format&fit=crop"
                alt="Student learning Quran"
                className="hero-girl-img"
              />
            </div>

            <div className="hero-tags">
              <div className="tag-pill dark">Tajweed</div>
              <div className="tag-pill">Quran Reading</div>
              <div className="tag-pill">Tafseer</div>
              <div className="tag-pill dark">Learn Arabic</div>
              <div className="tag-pill">Islamic Studies</div>
              <div className="tag-pill dark">Memorization</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="about-section-wrapper">
          <p className="quote-text">
            “Recite the Quran, for on the Day of Resurrection it will come as an intercessor for its reciters.”
          </p>
          <div className="quote-author">- Sahih Muslim</div>
        </div>
      </section>

      {/* Dedicated Section */}
      <section className="about-section-wrapper dedicated-section">
        <div className="dedicated-content">
          <h2>Dedicated to Teaching the Words of Allah</h2>
          <p>Join the best online Quran classes for kids and adults. We provide expert tutors and a flexible schedule to help you master the Holy Quran.</p>
          <button className="get-started-btn">Get Started</button>
        </div>
        <div className="dedicated-images">
          <img src="https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=400&auto=format&fit=crop" className="d-img d-img-1" alt="Islamic Teacher" />
          <img src="https://images.unsplash.com/photo-1599549321305-64906f236087?q=80&w=400&auto=format&fit=crop" className="d-img" alt="Students" />
          <img src="https://images.unsplash.com/photo-1555617758-c02055f2d01a?q=80&w=400&auto=format&fit=crop" className="d-img" alt="Quran Class" />
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="stats-section">
        <div className="about-section-wrapper stats-grid-container">
          <div className="left-stat-box">
            <div className="stat-card-custom stat-card-purple">
              <div className="stat-percent">98%</div>
              <p>Satisfaction rate from our students</p>
            </div>
            <div className="stat-card-custom stat-card-beige">
              <div className="stat-percent">30,000+</div>
              <p>Enrolled Students</p>
            </div>
          </div>

          <div className="right-promo-box">
            <h3 className="promo-title">Learn Quran the Right Way with Tilawah Quran</h3>
            <p style={{ marginBottom: '20px', color: '#555' }}>
              With over 5+ Years of experience, we provide the best platform for online Quran education.
            </p>
            <div className="stat-percent" style={{ fontSize: '2rem', marginBottom: '20px' }}>5+ Years</div>
            <div style={{ fontWeight: 'bold', marginBottom: '20px', color: '#444' }}>Of excellence in teaching worldwide</div>
            <button className="promo-btn">Our Mission</button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="about-section-wrapper pricing-section">
        <div className="pricing-title">Your Quran Journey Starts Here</div>

        <div className="pricing-grid">
          {/* Beginner */}
          <div className="price-card purple-light">
            <div className="price-header">
              <span className="plan-name">Beginner Basic</span>
              <span className="plan-price">$38</span>
            </div>
            <ul className="plan-features">
              <li>2 Classes Per Week</li>
              <li>Personalized Live Sessions</li>
              <li>Male/Female Teacher Option</li>
              <li>Free Trial Included</li>
              <li>Progress Tracking</li>
            </ul>
            <button className="enroll-card-btn">Enroll Now</button>
          </div>

          {/* Intermediate */}
          <div className="price-card orange-light">
            <div className="price-header">
              <span className="plan-name">Intermediate Pro</span>
              <span className="plan-price">$45</span>
            </div>
            <ul className="plan-features">
              <li>3 Classes Per Week</li>
              <li>Tajweed Rules In-Depth</li>
              <li>Hifz & Qiraat Basics</li>
              <li>Monthly Progress Report</li>
              <li>Flexible Rescheduling</li>
            </ul>
            <button className="enroll-card-btn">Enroll Now</button>
          </div>

          {/* Advanced */}
          <div className="price-card purple-dark">
            <div className="price-header">
              <span className="plan-name">Advanced Master</span>
              <span className="plan-price">$68</span>
            </div>
            <ul className="plan-features">
              <li>4 Classes Per Week</li>
              <li>Advanced Tajweed Rules</li>
              <li>Ijazah Certification</li>
              <li>Personal Mentoring Session</li>
              <li>Family Student Discount</li>
            </ul>
            <button className="enroll-card-btn">Enroll Now</button>
          </div>

          {/* Hifz */}
          <div className="price-card green-light">
            <div className="price-header">
              <span className="plan-name">Hifz / Memorization</span>
              <span className="plan-price">$75</span>
            </div>
            <ul className="plan-features">
              <li>Daily Classes (5/week)</li>
              <li>Dedicated Revision Plan</li>
              <li>Intensive Tajweed Training</li>
              <li>Regular Assessment</li>
              <li>Completion Certificate</li>
            </ul>
            <button className="enroll-card-btn">Enroll Now</button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="about-section-wrapper steps-section">
        <h2 className="steps-title">Start Your Quran Journey in 3 Easy Steps</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon-circle">📝</div>
            <h3>Fill The Contact Form</h3>
            <p>Let us know your learning goals and preference to match you with the perfect teacher.</p>
            <button className="step-action-btn">REGISTER</button>
          </div>

          <div className="step-card">
            <div className="step-icon-circle">📅</div>
            <h3>Pick a Time for Free Trial</h3>
            <p>Choose a convenient time for your free demo class. No credit card needed.</p>
            <button className="step-action-btn">PICK TIME</button>
          </div>

          <div className="step-card">
            <div className="step-icon-circle">💻</div>
            <h3>Begin with the Bismillah</h3>
            <p>Start your chosen course comfortably from your home.</p>
            <button className="step-action-btn">START NOW</button>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="about-section-wrapper">
        <div className="bottom-cta-section">
          <img src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop" className="cta-bg-image" alt="Reading Quran Background" />
          <div className="cta-content">
            <h2>Learn Quran Online With Qualified Teachers</h2>
            <p>Join thousands of students worldwide mastering Quran reading and memorization.</p>
            <div className="cta-buttons">
              <button className="btn-white">Book Free Trial</button>
              <button className="btn-outline">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Guidance Section */}
      <section className="about-section-wrapper blog-section">
        <h2 className="blog-title">Guidance and Reflections</h2>
        <div className="blog-grid">
          <div className="blog-card">
            <img src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=400&fit=crop" className="blog-img" alt="Blog 1" />
            <div className="blog-info">
              <h3>Five Pillars of Islam: Explained</h3>
              <p>Learn the importance and practical meaning of the five pillars in daily life.</p>
              <button className="read-more-btn">READ MORE</button>
            </div>
          </div>

          <div className="blog-card">
            <img src="https://images.unsplash.com/photo-1585036156171-40b3861fb25a?q=80&w=400&fit=crop" className="blog-img" alt="Blog 2" />
            <div className="blog-info">
              <h3>Best Age to Start Learning?</h3>
              <p>Discover the optimal age for children to begin Quran memorization effectively.</p>
              <button className="read-more-btn">READ MORE</button>
            </div>
          </div>

          <div className="blog-card">
            <img src="https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?q=80&w=400&fit=crop" className="blog-img" alt="Blog 3" />
            <div className="blog-info">
              <h3>How to Read Quran Daily</h3>
              <p>Practical tips to build a consistent habit of Quran recitation.</p>
              <button className="read-more-btn">READ MORE</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
