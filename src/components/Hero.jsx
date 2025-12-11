import React from 'react';
import './Hero.css';

const Hero = ({ setActiveSection }) => {
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="hero" data-animate data-animate-once>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text" data-animate data-animate-delay="1">
            <h1 className="hero-title">Your Voice, Our Future</h1>
            <h2 className="hero-subtitle">Billy Katongole for University Guild President</h2>
            <p className="hero-description">
              A leader who listens, a vision that inspires, and a plan that delivers real change for our university community.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('platform')}
              >
                View My Platform
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('volunteer')}
              >
                Join Our Campaign
              </button>
            </div>
          </div>
          <div className="hero-image" data-animate data-animate-delay="2">
            <img
              src={`${process.env.PUBLIC_URL}/images/hero.jpg`}
              alt="Billy Katongole — campaign photo"
              className="hero-img animate-float"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;