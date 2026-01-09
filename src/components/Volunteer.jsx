import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import "./Volunteer.css";

const Volunteer = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [reminderTime, setReminderTime] = useState("");
  const [reminderSet, setReminderSet] = useState(false);
  const [reminderMethod, setReminderMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // ====== EMAILJS CONFIGURATION ======
  // ⚠️ REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS.COM
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_0vccx3l',    // ← PASTE SERVICE ID HERE
    TEMPLATE_ID: 'template_l9q8sok', // ← PASTE TEMPLATE ID HERE
    PUBLIC_KEY: 'WbDvAVy7LqbqR9iFU'        // ← PASTE PUBLIC KEY HERE
  };

  // ====== FORM SUBMISSION WITH EMAILJS ======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message || "No additional message provided.",
          date: new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          reply_to: formData.email,
          to_email: "atuhuriirestuart@gmail.com", // Your email to receive applications
          subject: `🎯 Trailblazer Volunteer: ${formData.name}`
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log("✅ EmailJS Success:", result.text);
      
      // Show success message
      setSubmitMessage(`success:Thank you ${formData.name}! We've received your application and will contact you at ${formData.email} within 24 hours.`);
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("❌ EmailJS Error:", error);
      
      // Show error message
      setSubmitMessage(`error:Sorry, there was an error submitting your application. Please email us directly at: atuhuriirestuart@gmail.com`);
      
    } finally {
      setIsSubmitting(false);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("");
      }, 5000);
    }
  };

  // Create and download calendar file
  const downloadCalendarFile = () => {
    if (!reminderTime) {
      alert("Please select a reminder date and time!");
      return;
    }

    if (!formData.name || !formData.email) {
      alert("Please fill in your name and email above before setting a reminder!");
      return;
    }

    const startTime = new Date(reminderTime);
    const endTime = new Date(startTime.getTime() + 3600000); // 1 hour later
    
    // Format dates for iCal
    const formatDate = (date) => {
      return date.toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/g, '');
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "CALSCALE:GREGORIAN",
      "PRODID:-//Trailblazer//VolunteerReminder//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@trailblazer`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startTime)}`,
      `DTEND:${formatDate(endTime)}`,
      `SUMMARY:Trailblazer Volunteer Meeting with ${formData.name}`,
      `DESCRIPTION:Reminder for your Trailblazer volunteer application.\\nContact email: ${formData.email}\\n\\nAdditional notes: ${formData.message || "None provided"}`,
      `LOCATION:Online/Phone Meeting`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M", // 15 minutes before
      "ACTION:DISPLAY",
      "DESCRIPTION:Trailblazer Volunteer Meeting Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join('\r\n');

    // Create download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trailblazer-volunteer-reminder.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setReminderSet(true);
    setReminderMethod("calendar");
  };

  // Set browser notification
  const setBrowserNotification = () => {
    if (!reminderTime) {
      alert("Please select a reminder date and time!");
      return;
    }

    // Check if browser supports notifications
    if (!("Notification" in window)) {
      alert("Your browser doesn't support notifications. Please use the calendar download option.");
      return;
    }

    const reminderDate = new Date(reminderTime);
    const now = new Date();
    const timeUntilReminder = reminderDate.getTime() - now.getTime();

    if (timeUntilReminder <= 0) {
      alert("Please select a future date and time!");
      return;
    }

    // Request permission
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          scheduleNotification(reminderDate, timeUntilReminder);
        } else {
          alert("Notification permission denied. Please use the calendar download option.");
        }
      });
    } else if (Notification.permission === "granted") {
      scheduleNotification(reminderDate, timeUntilReminder);
    } else {
      alert("Notifications are blocked. Please use the calendar download option.");
    }
  };

  const scheduleNotification = (reminderDate, timeUntilReminder) => {
    setTimeout(() => {
      new Notification("Trailblazer Volunteer Reminder ⏰", {
        body: `Time for your Trailblazer volunteer meeting!${formData.name ? `\nName: ${formData.name}` : ''}`,
        icon: "https://img.icons8.com/color/96/000000/calendar--v1.png",
        tag: "trailblazer-volunteer-reminder"
      });
    }, timeUntilReminder);

    setReminderSet(true);
    setReminderMethod("browser");
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'reminder-success-float';
    successMsg.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
      ">
        <strong>✅ Trailblazer Reminder Set!</strong>
        <div style="font-size: 14px; margin-top: 5px;">
          You'll be notified at ${reminderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      if (document.body.contains(successMsg)) {
        document.body.removeChild(successMsg);
      }
    }, 3000);
  };

  return (
   <section id="volunteer" className="section volunteer-section" data-animate>
  <div className="container">
    <h2 className="section-title" data-animate data-animate-delay="1">Join Trailblazer Volunteers</h2>
    
    {/* Success/Error Message Display - FIXED VERSION */}
    {submitMessage && (
      <div className={`submit-message ${submitMessage.startsWith('success') ? 'success' : 'error'}`}>
        {submitMessage.includes(':') ? submitMessage.substring(submitMessage.indexOf(':') + 1) : submitMessage}
      </div>
    )}
    
    <div className="volunteer-content" data-animate data-animate-delay="2">
          {/* Left Column: Volunteer Info & Reminder */}
          <div className="volunteer-info" data-animate data-animate-delay="3">
            <h3>Join the Trailblazer Volunteer Team!</h3>
            <p>Make a difference in your community by joining our team of dedicated volunteers at Ndejje University.</p>
            
            <div className="opportunities">
              <h4>🚀 Trailblazer Volunteer Opportunities:</h4>
              <ul>
                <li>
                  <span className="icon">📢</span>
                  <span className="text"><strong>Campus Outreach Ambassadors</strong><br/>Spread the word about Trailblazer across campus</span>
                </li>
                <li>
                  <span className="icon">📱</span>
                  <span className="text"><strong>Social Media Management</strong><br/>Help manage our Instagram, Twitter, and Facebook</span>
                </li>
                <li>
                  <span className="icon">🎉</span>
                  <span className="text"><strong>Event Planning & Coordination</strong><br/>Organize campaign events and rallies</span>
                </li>
                <li>
                  <span className="icon">📝</span>
                  <span className="text"><strong>Content Creation & Writing</strong><br/>Write blog posts, speeches, and campaign materials</span>
                </li>
                <li>
                  <span className="icon">🎨</span>
                  <span className="text"><strong>Graphic Design & Marketing</strong><br/>Design posters, flyers, and digital content</span>
                </li>
                <li>
                  <span className="icon">🤝</span>
                  <span className="text"><strong>Community Engagement Leaders</strong><br/>Connect with student groups and organizations</span>
                </li>
              </ul>
            </div>

            {/* Reminder Section */}
            <div className="reminder-box">
              <h4><span className="icon">⏰</span> Set a Meeting Reminder</h4>
              <p className="reminder-description">
                Don't forget to follow up! Set a reminder to discuss your Trailblazer volunteer application.
              </p>
              
              <div className="form-group">
                <label>Reminder Date & Time *</label>
                <input 
                  type="datetime-local" 
                  required 
                  value={reminderTime}
                  onChange={(e) => {
                    setReminderTime(e.target.value);
                    setReminderSet(false);
                  }}
                  min={new Date().toISOString().slice(0, 16)}
                  className="datetime-input"
                />
              </div>
              
              <div className="reminder-buttons">
                <button 
                  onClick={downloadCalendarFile}
                  className="reminder-btn calendar-btn"
                  disabled={!reminderTime || !formData.name || !formData.email || isSubmitting}
                >
                  <span className="btn-icon">📅</span>
                  <span className="btn-text">Add to Calendar</span>
                </button>
                
                <button 
                  onClick={setBrowserNotification}
                  className="reminder-btn notification-btn"
                  disabled={!reminderTime || isSubmitting}
                >
                  <span className="btn-icon">🔔</span>
                  <span className="btn-text">Browser Notification</span>
                </button>
              </div>
              
              {reminderSet && (
                <div className={`reminder-success ${reminderMethod}`}>
                  <div className="success-icon">
                    {reminderMethod === "calendar" ? "📅" : "🔔"}
                  </div>
                  <div className="success-content">
                    <h5>{reminderMethod === "calendar" ? "Calendar Reminder Set!" : "Browser Notification Set!"}</h5>
                    <p>
                      {reminderMethod === "calendar" 
                        ? "Import the downloaded .ics file into your calendar app."
                        : "You'll receive a notification at the selected time."}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="reminder-notes">
                <p><strong>💡 Tip:</strong> Calendar files work with Google Calendar, Apple Calendar, Outlook, etc.</p>
                <p><strong>⚠️ Note:</strong> Browser notifications require permission from your browser.</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Volunteer Form */}
          <div className="volunteer-form" data-animate data-animate-delay="4">
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>✍️ Sign Up to Volunteer</h3>
                <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  id="name"
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  id="email"
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Interests & Availability</label>
                <textarea 
                  id="message"
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us which volunteer roles interest you, your skills, and when you're typically available..."
                  rows="6"
                  disabled={isSubmitting}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-icon">⏳</span>
                    <span className="btn-text">Sending Application...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    <span className="btn-text">Submit Volunteer Application</span>
                  </>
                )}
              </button>
              
              <div className="form-footer">
                <p className="form-note">
                  <span className="icon">📧</span>
                  <span>Your application will be sent directly to the Trailblazer campaign team via email.</span>
                </p>
                <p className="form-tip">
                  <span className="icon">💡</span>
                  <span>After submitting, set a reminder above to follow up on your application!</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;