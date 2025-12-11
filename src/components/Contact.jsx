import React from "react"; 
import "./Contact.css"; 
 
const Contact = () => {
  return ( 
    <section id="contact" className="section contact-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">Contact</h2>
        <div className="contact-content" data-animate data-animate-delay="2">
          <div className="contact-info">
            <h3 data-animate data-animate-delay="3">Get in Touch</h3>
            <div className="contact-item"> 
              <h4>?? Email</h4> 
              <p>stuart@university.edu</p> 
            </div> 
            <div className="contact-item"> 
              <h4>?? Phone</h4> 
              <p>(123) 456-7890</p> 
            </div> 
            <div className="contact-item"> 
              <h4>?? Office</h4> 
              <p>Student Union Building</p> 
            </div> 
          </div> 
        </div> 
      </div> 
    </section> 
  ); 
}; 
 
export default Contact; 


