import React from "react";
import "./VotingInfo.css";

const VotingInfo = () => {
  return (
    <section id="voting" className="section voting-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">Voting Information</h2>
        <div className="voting-alert" data-animate data-animate-delay="2">
          <p>🗳️ <strong>Voting Dates:</strong> May 1-3, 2024</p>
          <p>🕒 <strong>Time:</strong> 9:00 AM - 6:00 PM</p>
        </div>
        <div className="voting-content" data-animate data-animate-delay="3">
          <div className="voting-card" data-animate data-animate-delay="4">
            <h3>📍 Voting Locations</h3>
            <ul>
              <li>Student Union Building</li>
              <li>Main Library Entrance</li>
              <li>Science Building Lobby</li>
              <li>Cafeteria Entrance</li>
            </ul>
          </div>
          <div className="voting-card" data-animate data-animate-delay="5">
            <h3>✅ What to Bring</h3>
            <ul>
              <li>Student ID Card</li>
              <li>University Email</li>
            </ul>
          </div>
        </div>
        <div style={{textAlign: "center", marginTop: "40px"}} data-animate data-animate-delay="6">
          <button className="btn btn-primary" onClick={() => alert("Voting reminder set!")}>
            Set Reminder
          </button>
        </div>
      </div>
    </section>
  );
};

export default VotingInfo;