 
import React from 'react';
import './Manifesto.css';

const Manifesto = () => {
  // This would be your actual PDF file in the public folder
  const manifestoFile = '/manifesto.pdf';
  
  const manifestoPoints = [
    {
      title: "Academic Reform",
      points: [
        "24/7 library access during exam periods",
        "Expansion of free tutoring programs",
        "Mental health days for students",
        "Improved academic advising system"
      ]
    },
    {
      title: "Campus Infrastructure",
      points: [
        "Renovation of student union building",
        "Campus-wide Wi-Fi improvement",
        "Accessibility upgrades across campus",
        "Sustainable energy initiatives"
      ]
    },
    {
      title: "Student Support",
      points: [
        "Increased counseling services",
        "Emergency financial aid fund",
        "Career development workshops",
        "International student support program"
      ]
    },
    {
      title: "Campus Life",
      points: [
        "More funding for student clubs",
        "Regular campus events and festivals",
        "Improved sports facilities",
        "Student-run cafe initiative"
      ]
    }
  ];

  return (
    <section id="manifesto" className="section manifesto-section">
      <div className="container">
        <h2 className="section-title">My Manifesto</h2>
        <div className="manifesto-header">
          <div className="manifesto-intro">
            <h3>Comprehensive Plan for Student Success</h3>
            <p>
              This detailed manifesto outlines my vision, policies, and actionable plans 
              for improving our university. It represents months of research, conversations 
              with students, and careful planning.
            </p>
          </div>
          
          <div className="manifesto-download-card">
            <div className="download-icon">📄</div>
            <h4>Download Full Manifesto</h4>
            <p>15-page detailed document with implementation plans, timelines, and budget proposals.</p>
            <a 
              href={manifestoFile} 
              className="btn btn-primary download-btn"
              download="STUART_Campaign_Manifesto_2024.pdf"
              onClick={(e) => {
                if (!manifestoFile.includes('.pdf')) {
                  e.preventDefault();
                  alert('Manifesto PDF will be available soon! For now, please read the summary below.');
                }
              }}
            >
              📥 Download PDF (2.1 MB)
            </a>
            <div className="file-info">
              <span>Updated: March 2024</span>
              <span>•</span>
              <span>15 pages</span>
              <span>•</span>
              <span>PDF Format</span>
            </div>
          </div>
        </div>

        <div className="manifesto-summary">
          <h3>Key Policy Summary</h3>
          
          <div className="manifesto-grid">
            {manifestoPoints.map((section, index) => (
              <div key={index} className="manifesto-card">
                <div className="card-header">
                  <div className="card-number">{index + 1}</div>
                  <h4>{section.title}</h4>
                </div>
                <ul>
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="manifesto-timeline">
          <h3>Implementation Timeline</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">First 30 Days</div>
              <div className="timeline-content">
                <h5>Immediate Actions</h5>
                <p>Establish student advisory committees • Begin 24/7 library pilot program</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">First Semester</div>
              <div className="timeline-content">
                <h5>Short-term Goals</h5>
                <p>Launch expanded tutoring program • Begin campus Wi-Fi upgrades</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Full Academic Year</div>
              <div className="timeline-content">
                <h5>Long-term Vision</h5>
                <p>Complete infrastructure projects • Establish all support programs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="manifesto-footer">
          <p>
            <strong>Note:</strong> This is a summary. For detailed budget breakdowns, 
            research data, and complete implementation plans, please download the full manifesto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;