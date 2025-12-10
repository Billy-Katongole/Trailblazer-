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
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Your Voice, Our Future</h1>
            <h2 className="hero-subtitle">STUART for University Guild President</h2>
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
          <div className="hero-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <span>Your Photo Here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;