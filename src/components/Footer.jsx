import React from "react"; 
import "./Footer.css"; 
 
const Footer = () => {
  return ( 
    <footer className="footer"> 
      <div className="container"> 
        <div className="footer-content"> 
          <div className="footer-section"> 
            <h3>Campaign 2024</h3> 
            <p>STUART for Guild President</p> 
          </div> 
          <div className="footer-section"> 
            <h4>Quick Links</h4> 
            <a href="#platform">Platform</a> 
            <a href="#events">Events</a> 
            <a href="#contact">Contact</a> 
          </div> 
          <div className="footer-section"> 
            <h4>Vote</h4> 
            <p>May 1-3, 2024</p> 
            <p>Your voice matters!</p> 
          </div> 
        </div> 
        <div className="footer-bottom"> 
          <p>c 2024 STUART Campaign. All rights reserved.</p> 
        </div> 
      </div> 
    </footer> 
  ); 
}; 
 
export default Footer; 


