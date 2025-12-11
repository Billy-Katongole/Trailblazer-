import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/animations.css';
import initAnimateOnScroll from './utils/animateOnScroll';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize animations after the app mounts
if (typeof window !== 'undefined'){
  // Delay initialization slightly so that components are mounted
  window.requestAnimationFrame(() => initAnimateOnScroll());
}