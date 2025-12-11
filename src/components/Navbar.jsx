 
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} data-animate data-animate-once>
      <div className="container">
        <div className="nav-content">
          <div className="logo" data-animate data-animate-delay="1">
            <h2>Campaign<span>2026</span></h2>
          </div>
          
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;