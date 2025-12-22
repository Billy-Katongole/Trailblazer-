import React from "react"; 
import "./About.css"; 
 
const About = () => {
  return ( 
    <section id="about" className="section about-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">About Me</h2>
        <div className="about-content" data-animate data-animate-delay="2">
          <div className="about-text"> 
            <h3>Hello, I'm BILLY KATONGOLE ASIIMWE</h3> 
            <p> 
A Ugandan with passion of making the world a better place for it starts with me and you!!!
I’m a student of Ndejje University pursuing a Bachelor’s degree in Land Survey and Geomatics in my third year.I completed my primary level from Mbarara Municipal School, Mbarara High School (CHAAPA) for my secondary level (both O and A level) 
I can proudly say it’s been quite a good journey, full of memories the world can never take of my memory and all sorts of experiences. Most of these being in the ‘kraal’, Mbarara High School where real men are groomed… 
Besides my education journey, I’m driven by passion and desire to make the world a better place. The world is filled with people with different interests, capabilities, skills, different mindsets, talents, dreams and I strongly believe that if we could combine all this the world would be a better place.. Reminds of the words of the former President of the United States, H.E Barrack Obama, “YES WE CAN”.  
It's on this noble cause that I advocate for togetherness, inclusiveness, innovativeness and effectiveness, “The ultimate measure of a leader is not the titles they hold, but the lives they touch and inspire”
            </p> 
            <div className="about-details"> 
              <div className="detail-card" data-animate data-animate-delay="3"> 
                <h4> Education</h4> 
                <p>Bachelors of Land Surveying and Geomatics</p> 
                <p>Third Year Student</p> 
              </div> 
              <div className="detail-card" data-animate data-animate-delay="4"> 
                <h4> Experience</h4> 
                <p>Student Council Member</p> 
                <p>Tech Club President</p> 
              </div> 
              <div className="detail-card" data-animate data-animate-delay="5"> 
                <h4> Mission</h4> 
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
