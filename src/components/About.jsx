import React from "react"; 
import "./About.css"; 
 
const About = () => {
  return ( 
    <section id="about" className="section about-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">About Me</h2>
        <div className="about-content" data-animate data-animate-delay="2">
          <div className="about-text"> 
            <h3>Hello, I'm STUART</h3> 
            <p> 
              I'm a passionate student leader running for Guild President to make 
              our university a better place for everyone. With experience in student 
              government and campus organizations, I have the skills and vision to 
              represent your interests effectively. 
            </p> 
            <div className="about-details"> 
              <div className="detail-card" data-animate data-animate-delay="3"> 
                <h4>?? Education</h4> 
                <p>Computer Science Major</p> 
                <p>Third Year Student</p> 
              </div> 
              <div className="detail-card" data-animate data-animate-delay="4"> 
                <h4>??? Experience</h4> 
                <p>Student Council Member</p> 
                <p>Tech Club President</p> 
              </div> 
              <div className="detail-card" data-animate data-animate-delay="5"> 
                <h4>?? Mission</h4> 
                <p>Create inclusive campus</p> 
                <p>Improve student services</p> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </section> 
  ); 
}; 
 
export default About; 
