import React from "react"; 
import "./Events.css"; 
 
const Events = () => {
  const events = [ 
    { date: "April 15", title: "Town Hall Meeting", location: "Student Union" }, 
    { date: "April 18", title: "Campus Rally", location: "Main Quad" }, 
    { date: "April 22", title: "Policy Discussion", location: "Library" }, 
    { date: "April 25", title: "Debate Night", location: "Auditorium" } 
  ]; 
 
  return ( 
    <section id="events" className="section events-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">Campaign Events</h2>
        <div className="events-grid" data-animate data-animate-delay="2">
          {events.map((event, index) => (
            <div key={index} className="event-card" data-animate data-animate-delay="3"> 
              <div className="event-date">{event.date}</div> 
              <div className="event-content"> 
                <h3>{event.title}</h3> 
                <p>📍 {event.location}</p> 
                <button className="btn btn-small">RSVP</button> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
    </section> 
  ); 
}; 
 
export default Events;