import React from 'react';
import './Video.css';

const Video = () => {
  // Your campaign video
  const videoId = 'O1SfDBlHfc0';
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section id="video" className="section video-section" data-animate>
      <div className="container">
        <h2 className="section-title" data-animate data-animate-delay="1">
          Campaign Video
        </h2>
        <p className="section-subtitle" data-animate data-animate-delay="2">
          Watch our campaign message
        </p>

        <div className="video-content" data-animate data-animate-delay="3">
          <div className="video-player">
            <iframe
              width="100%"
              height="600"
              src={embedUrl}
              title="Campaign Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          
          <div className="video-info" data-animate data-animate-delay="4">
            <h3>Join the Movement</h3>
            <p>
              Watch our latest campaign video to learn more about our vision for the university 
              and why you should vote for real change.
            </p>
            <div className="video-actions">
              <a 
                href={videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                🎥 Watch on YouTube
              </a>
              <a 
                href={videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                📤 Share
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
