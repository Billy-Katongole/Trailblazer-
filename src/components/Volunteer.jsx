import React, { useState } from "react";
import "./Volunteer.css";

const Volunteer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll contact you at ${formData.email}`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="volunteer" className="section volunteer-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">Get Involved</h2>
        <div className="volunteer-content" data-animate data-animate-delay="2">
          <div className="volunteer-info" data-animate data-animate-delay="3">
            <h3>Join Our Team!</h3>
            <p>We need volunteers for:</p>
            <ul>
              <li>📢 Campus Outreach</li>
              <li>📱 Social Media</li>
              <li>🎉 Event Planning</li>
              <li>📝 Content Creation</li>
            </ul>
          </div>
          <div className="volunteer-form">
            <form onSubmit={handleSubmit}>
              <h3>Sign Up to Volunteer</h3>
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                />
              </div>
              <button type="submit" className="btn btn-primary">Join Now</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;