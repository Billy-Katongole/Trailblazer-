import React, { useState } from "react";
import "./VotingInfo.css";

const VotingInfo = () => {
  const [customReminderTime, setCustomReminderTime] = useState("");
  const [reminderSet, setReminderSet] = useState(false);
  const [reminderMethod, setReminderMethod] = useState("");

  // Create and download calendar file for voting reminder
  const downloadVotingCalendarFile = (votingType = "general") => {
    const votingDates = {
      general: {
        start: "2024-05-01T09:00:00",
        end: "2024-05-03T18:00:00",
        summary: "Campus Elections - Voting Days",
        description: "Don't forget to vote in the campus elections! Voting is open for 3 days.",
        locations: ["Student Union Building", "Main Library Entrance", "Science Building Lobby", "Cafeteria Entrance"]
      },
      early: {
        start: "2024-04-29T09:00:00",
        end: "2024-04-30T18:00:00",
        summary: "Campus Elections - Early Voting",
        description: "Early voting period for campus elections",
        locations: ["Student Union Building"]
      }
    };

    const votingInfo = votingDates[votingType] || votingDates.general;
    const startTime = new Date(votingInfo.start);
    const endTime = new Date(votingInfo.end);
    
    // Format dates for iCal
    const formatDate = (date) => {
      return date.toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/g, '');
    };

    const locationString = votingInfo.locations.join(', ');
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "CALSCALE:GREGORIAN",
      "PRODID:-//CampusElections//VotingReminder//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@campuselections`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startTime)}`,
      `DTEND:${formatDate(endTime)}`,
      `SUMMARY:${votingInfo.summary}`,
      `DESCRIPTION:${votingInfo.description}\\n\\nVoting Locations: ${locationString}\\n\\nRequired: Student ID Card & University Email`,
      `LOCATION:${votingInfo.locations[0]}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-P1D", // 1 day before
      "ACTION:DISPLAY",
      "DESCRIPTION:Voting starts tomorrow!",
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-PT1H", // 1 hour before
      "ACTION:DISPLAY",
      "DESCRIPTION:Voting starts in 1 hour!",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join('\r\n');

    // Create download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `voting-reminder-${votingType}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setReminderSet(true);
    setReminderMethod("calendar");
    
    showSuccessMessage(`📅 ${votingType === "early" ? "Early " : ""}Voting calendar file downloaded! Import it into your calendar app.`);
  };

  // Set browser notification for voting
  const setVotingBrowserNotification = (votingType = "general") => {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
      alert("Your browser doesn't support notifications. Please use the calendar download option.");
      return;
    }

    const votingDates = {
      general: {
        date: new Date("2024-05-01T09:00:00"),
        title: "🗳️ Voting Day Today!",
        message: "Campus elections are happening today! Voting open 9 AM - 6 PM."
      },
      early: {
        date: new Date("2024-04-29T09:00:00"),
        title: "🗳️ Early Voting Starts Today!",
        message: "Early voting for campus elections begins today! 9 AM - 6 PM."
      }
    };

    const votingInfo = votingDates[votingType] || votingDates.general;
    const now = new Date();
    const timeUntilVoting = votingInfo.date.getTime() - now.getTime();

    if (timeUntilVoting <= 0) {
      alert("Voting has already started or passed. Set a reminder for next time!");
      return;
    }

    // Request permission
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          scheduleVotingNotification(votingInfo, timeUntilVoting, votingType);
        } else {
          alert("Notification permission denied. Please use the calendar download option.");
        }
      });
    } else if (Notification.permission === "granted") {
      scheduleVotingNotification(votingInfo, timeUntilVoting, votingType);
    } else {
      alert("Notifications are blocked. Please use the calendar download option.");
    }
  };

  const scheduleVotingNotification = (votingInfo, timeUntilVoting, votingType) => {
    // Set notification for voting day
    setTimeout(() => {
      new Notification(votingInfo.title, {
        body: votingInfo.message + "\n\nLocations: Student Union, Library, Science Building, Cafeteria",
        icon: "https://img.icons8.com/color/96/000000/elections.png",
        tag: "voting-reminder",
        requireInteraction: true
      });
    }, timeUntilVoting);

    // Set additional reminder 1 hour before
    if (timeUntilVoting > 3600000) { // More than 1 hour
      setTimeout(() => {
        new Notification("⏰ Voting Starts in 1 Hour!", {
          body: "Campus elections voting begins in 1 hour. Don't forget your Student ID!",
          icon: "https://img.icons8.com/color/96/000000/alarm-clock.png"
        });
      }, timeUntilVoting - 3600000);
    }

    // Set reminder 24 hours before
    if (timeUntilVoting > 86400000) { // More than 24 hours
      setTimeout(() => {
        new Notification("🗳️ Voting Tomorrow!", {
          body: "Campus elections voting starts tomorrow. Remember to bring your Student ID and University email!",
          icon: "https://img.icons8.com/color/96/000000/calendar.png"
        });
      }, timeUntilVoting - 86400000);
    }

    setReminderSet(true);
    setReminderMethod("browser");
    
    const votingDate = votingInfo.date;
    const dateStr = votingDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    showSuccessMessage(`🔔 Reminder set! You'll receive notifications for ${votingType === "early" ? "early " : ""}voting.`);
  };

  // Custom reminder for specific date
  const handleCustomReminder = () => {
    if (!customReminderTime) {
      alert("Please select a date and time for your reminder!");
      return;
    }

    const reminderDate = new Date(customReminderTime);
    const now = new Date();
    const timeUntilReminder = reminderDate.getTime() - now.getTime();

    if (timeUntilReminder <= 0) {
      alert("Please select a future date and time!");
      return;
    }

    // Ask user which type of reminder they want
    const reminderType = prompt("Choose reminder type:\n1. Calendar file download 📅\n2. Browser notification 🔔\n\nEnter 1 or 2:");
    
    if (reminderType === "1") {
      downloadCustomReminderCalendar(reminderDate);
    } else if (reminderType === "2") {
      if (!("Notification" in window)) {
        alert("Browser doesn't support notifications. Downloading calendar file instead.");
        downloadCustomReminderCalendar(reminderDate);
        return;
      }
      
      if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            scheduleCustomNotification(reminderDate, timeUntilReminder);
          } else {
            alert("Notification permission denied. Downloading calendar file instead.");
            downloadCustomReminderCalendar(reminderDate);
          }
        });
      } else if (Notification.permission === "granted") {
        scheduleCustomNotification(reminderDate, timeUntilReminder);
      } else {
        alert("Notifications blocked. Downloading calendar file instead.");
        downloadCustomReminderCalendar(reminderDate);
      }
    } else {
      alert("Invalid choice. Please try again.");
    }
  };

  const scheduleCustomNotification = (reminderDate, timeUntilReminder) => {
    setTimeout(() => {
      new Notification("🗳️ Voting Reminder", {
        body: "Time to vote in the campus elections! Voting locations: Student Union, Library, Science Building, Cafeteria",
        icon: "https://img.icons8.com/color/96/000000/elections.png",
        requireInteraction: true
      });
    }, timeUntilReminder);

    setReminderSet(true);
    setReminderMethod("browser");
    showSuccessMessage(`✅ Custom reminder set for ${reminderDate.toLocaleString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`);
  };

  const downloadCustomReminderCalendar = (reminderDate) => {
    const endTime = new Date(reminderDate.getTime() + 3600000); // 1 hour reminder
    
    const formatDate = (date) => {
      return date.toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/g, '');
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${formatDate(reminderDate)}`,
      `DTEND:${formatDate(endTime)}`,
      "SUMMARY:Voting Reminder - Campus Elections",
      "DESCRIPTION:Reminder to vote in campus elections.\\n\\nVoting Dates: May 1-3, 2024\\nTime: 9:00 AM - 6:00 PM\\nLocations: Student Union Building, Main Library, Science Building, Cafeteria\\nRequired: Student ID & University Email",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Voting Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom-voting-reminder.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setReminderSet(true);
    setReminderMethod("calendar");
    showSuccessMessage("📅 Custom voting reminder calendar file downloaded!");
  };

  const showSuccessMessage = (message) => {
    const successMsg = document.createElement('div');
    successMsg.className = 'voting-success-message';
    successMsg.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        border-left: 4px solid #2ecc71;
        font-size: 14px;
      ">
        <strong>${message}</strong>
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
    <section id="voting" className="section voting-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">Voting Information</h2>
        
        <div className="voting-alert" data-animate data-animate-delay="2">
          <div className="alert-content">
            <h3>🗳️ Important Voting Information</h3>
            <p><strong>📅 Voting Dates:</strong> May 1-3, 2024</p>
            <p><strong>🕒 Time:</strong> 9:00 AM - 6:00 PM Daily</p>
            <p><strong>📍 Early Voting:</strong> April 29-30, 2024</p>
          </div>
        </div>
        
        <div className="voting-content" data-animate data-animate-delay="3">
          <div className="voting-card" data-animate data-animate-delay="4">
            <h3>📍 Voting Locations</h3>
            <ul>
              <li>🏢 Student Union Building</li>
              <li>📚 Main Library Entrance</li>
              <li>🔬 Science Building Lobby</li>
              <li>🍽️ Cafeteria Entrance</li>
            </ul>
          </div>
          
          <div className="voting-card" data-animate data-animate-delay="5">
            <h3>✅ What to Bring</h3>
            <ul>
              <li>🎫 Student ID Card</li>
              <li>📧 University Email</li>
              <li>📱 Phone (optional for digital ballot)</li>
              <li>🖊️ Pen (optional)</li>
            </ul>
          </div>
        </div>

        {/* Reminder Section */}
        <div className="voting-reminder-section" data-animate data-animate-delay="6">
          <h3>⏰ Set Voting Reminders</h3>
          <p className="reminder-subtitle">Don't miss your chance to vote! Choose from the options below:</p>
          
          <div className="reminder-options">
            <div className="reminder-option">
              <h4>🗳️ General Election Days</h4>
              <p>May 1-3, 2024 • 9:00 AM - 6:00 PM</p>
              <div className="reminder-buttons">
                <button 
                  onClick={() => downloadVotingCalendarFile("general")}
                  className="reminder-btn calendar-btn"
                >
                  📅 Add to Calendar
                </button>
                <button 
                  onClick={() => setVotingBrowserNotification("general")}
                  className="reminder-btn notification-btn"
                >
                  🔔 Browser Notification
                </button>
              </div>
            </div>
            
            <div className="reminder-option">
              <h4>⏱️ Early Voting</h4>
              <p>April 29-30, 2024 • 9:00 AM - 6:00 PM</p>
              <div className="reminder-buttons">
                <button 
                  onClick={() => downloadVotingCalendarFile("early")}
                  className="reminder-btn calendar-btn"
                >
                  📅 Add to Calendar
                </button>
                <button 
                  onClick={() => setVotingBrowserNotification("early")}
                  className="reminder-btn notification-btn"
                >
                  🔔 Browser Notification
                </button>
              </div>
            </div>
            
            <div className="reminder-option custom-reminder">
              <h4>📅 Custom Reminder</h4>
              <p>Set a reminder for a specific date and time:</p>
              <div className="custom-reminder-input">
                <input 
                  type="datetime-local" 
                  value={customReminderTime}
                  onChange={(e) => {
                    setCustomReminderTime(e.target.value);
                    setReminderSet(false);
                  }}
                  min={new Date().toISOString().slice(0, 16)}
                  className="datetime-input"
                  placeholder="Select date and time"
                />
                <button 
                  onClick={handleCustomReminder}
                  className="reminder-btn custom-btn"
                  disabled={!customReminderTime}
                >
                  ⏰ Set Reminder
                </button>
              </div>
            </div>
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
                    ? "Import the downloaded file into your calendar app."
                    : "You'll receive notifications before voting begins."}
                </p>
              </div>
            </div>
          )}
          
          <div className="reminder-info">
            <p><strong>💡 Tip:</strong> Calendar files work with Google Calendar, Apple Calendar, Outlook, etc. Browser notifications require permission.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VotingInfo;