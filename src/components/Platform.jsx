import React from "react";
import "./Platform.css";

const Platform = () => {
  const platformPoints = [
    { title: "Academic Excellence", points: ["24/7 library access", "Free tutoring programs", "Mental health support"] },
    { title: "Student Life", points: ["More campus events", "Club funding increase", "Sports facilities upgrade"] },
    { title: "Sustainability", points: ["Campus recycling program", "Solar energy initiative", "Green transportation"] },
    { title: "Career Development", points: ["Internship opportunities", "Career fairs", "Alumni mentorship"] }
  ];

  return (
    <section id="platform" className="section platform-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">My Platform</h2>
        <p data-animate data-animate-delay="2" style={{textAlign: "center", marginBottom: "40px", fontSize: "1.1rem"}}>
          Real solutions for real student issues
        </p>
        <div className="platform-grid" data-animate data-animate-delay="3">
          {platformPoints.map((item, index) => (
            <div key={index} className="platform-card" data-animate data-animate-delay="4">
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platform;