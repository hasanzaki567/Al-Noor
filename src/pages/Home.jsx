import './Home.css';

function Home() {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500',
      title: 'Learn Islamic Knowledge',
      description: 'Discover authentic Islamic teachings'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70259471?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500',
      title: 'Master the Quran',
      description: 'Read, learn, and understand the Holy Quran'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500',
      title: 'Expert Teachers',
      description: 'Learn from experienced Islamic scholars'
    }
  ];

  const features = [
    {
      id: 1,
      icon: '📚',
      title: 'Comprehensive Courses',
      description: 'In-depth courses covering Islamic studies, Quran, and Hadith'
    },
    {
      id: 2,
      icon: '👨‍🏫',
      title: 'Live Classes',
      description: 'Interactive live sessions with qualified instructors'
    },
    {
      id: 3,
      icon: '📅',
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with flexible scheduling options'
    },
    {
      id: 4,
      icon: '🏆',
      title: 'Certificates',
      description: 'Earn recognized certificates upon course completion'
    },
    {
      id: 5,
      icon: '💬',
      title: '24/7 Support',
      description: 'Round-the-clock support from our dedicated team'
    },
    {
      id: 6,
      icon: '🌍',
      title: 'Community',
      description: 'Connect with students and scholars worldwide'
    }
  ];

  return (
    <div className="home">
      {/* Simple Slider */}
      <div className="hero-section">
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide" style={{animationDelay: `${index * 7.5}s`}}>
              <img src={slide.image} alt={slide.title} className="slide-image" />
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span key={index} className="dot"></span>
          ))}
        </div>
      </div>

      {/* Featured Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Al Noor Academy?</h2>
          <p className="section-subtitle">We offer comprehensive Islamic education with modern learning methods</p>
          
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
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Begin Your Islamic Learning Journey?</h2>
          <p>Join thousands of students learning Islamic knowledge with us</p>
          <button className="cta-button">Enroll Now</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
