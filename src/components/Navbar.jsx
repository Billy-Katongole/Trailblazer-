import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or resizing to desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && 
          !event.target.closest('.mobile-nav') && 
          !event.target.closest('.mobile-menu-toggle')) {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "platform", label: "Platform" },
    { id: "manifesto", label: "Manifesto" },
    { id: "video", label: "Video" },
    { id: "events", label: "Events" },
    { id: "volunteer", label: "Volunteer" },
    { id: "contact", label: "Contact" },
    { id: "voting", label: "Vote" },
    { id: "gallery", label: "Gallery" }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`} data-animate data-animate-once>
      <div className="container">
        <div className="nav-content">
          {/* Logo */}
          <div className="logo" data-animate data-animate-delay="1">
            <h2>Campaign<span>2026</span></h2>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links" data-animate data-animate-delay="2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <h3>Campaign Menu</h3>
            <button 
              className="mobile-nav-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          
          <div className="mobile-nav-items">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
                {activeSection === item.id && <span className="active-indicator">●</span>}
              </a>
            ))}
          </div>
          
          <div className="mobile-nav-footer">
            <p>Your Voice, Our Future</p>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={closeMobileMenu}
      />
    </nav>
  );
};

export default Navbar;