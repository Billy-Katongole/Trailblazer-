import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Platform from './components/Platform';
import Manifesto from './components/Manifesto';
import Video from './components/Video';
import Events from './components/Events';
import Volunteer from './components/Volunteer';
import Contact from './components/Contact';
import VotingInfo from './components/VotingInfo';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero setActiveSection={setActiveSection} />
      <About />
      <Platform />
      <Manifesto />
      <Video />
      <Events />
      <Volunteer />
      <Contact />
      <VotingInfo />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;