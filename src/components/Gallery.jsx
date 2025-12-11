 
import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const galleryItems = [
    { id: 1, category: 'events', title: 'Campus Rally', description: 'Energy at our first rally' },
    { id: 2, category: 'team', title: 'Campaign Team', description: 'Our amazing volunteers' },
    { id: 3, category: 'events', title: 'Town Hall', description: 'Listening to student concerns' },
    { id: 4, category: 'campus', title: 'Campus Life', description: 'Engaging with students' },
    { id: 5, category: 'team', title: 'Strategy Meeting', description: 'Planning our campaign' },
    { id: 6, category: 'events', title: 'Policy Discussion', description: 'Deep dive on issues' },
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'events', label: 'Campaign Events' },
    { id: 'team', label: 'Team Photos' },
    { id: 'campus', label: 'Campus Life' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="section gallery-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">Campaign Gallery</h2>
        <p className="section-subtitle" data-animate data-animate-delay="2">Moments from our campaign journey</p>
        
        <div className="gallery-controls" data-animate data-animate-delay="3">
          {categories.map(category => (
            <button
              key={category.id}
              className={`gallery-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="gallery-grid" data-animate data-animate-delay="4">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-item" data-animate data-animate-delay="5">
              <div className="gallery-image">
                <div className="image-placeholder">
                  <span className="image-label">📸 Image Placeholder</span>
                  <p>Add your photos here</p>
                </div>
              </div>
              <div className="gallery-info">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="gallery-instagram">
          <h3>📱 Follow Our Instagram for Live Updates!</h3>
          <p>See behind-the-scenes content and real-time campaign coverage</p>
          <a href="#" className="btn btn-primary" onClick={(e) => {
            e.preventDefault();
            alert('Instagram link would open here. Add your actual Instagram URL!');
          }}>
            View Instagram Stories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;